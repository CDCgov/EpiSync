import { compareDesc, parseISO, formatISO } from 'date-fns'
import { parse, stringify } from 'csv-string'
import { Mutex } from 'async-mutex'
import { join } from 'path'

import { StorageObject, FeedStorage } from './FeedStorage'
import { formSnaphotUri, formSnapshotKey, SNAPSHOT_FOLDER, versionFromSnapshotKey } from './feedStorageKeys'
import assert from 'assert'
import { upsert } from './upsert'

export interface Snapshot {
  readonly version?: number
  readonly createdAt?: Date
  readonly uri?: string
  listObjects: (prefix: string) => StorageObject[]
  doesObjectExist: (key: string) => boolean
  getObject: (key: string) => Promise<string>
}

export interface SnapshotMutator {
  putObject: (key: string, value: string) => Promise<void>
  deleteObject: (key: string) => Promise<void>
}

export type MutableSnapshot = Snapshot & SnapshotMutator

export class SnapshotReader implements Snapshot {
  storage: FeedStorage
  folder: string
  storageObjects: StorageObject[] = []
  createdAt?: Date
  feedVersion?: number
  loadCalled: boolean

  constructor (fromStorage: FeedStorage, feedFolder: string) {
    this.folder = feedFolder
    this.storage = fromStorage
    this.loadCalled = false
  }

  async load (): Promise<void> {
    const mutex = new Mutex()
    await mutex.runExclusive(async () => {
      if (this.loadCalled) throw Error('Read must not be called twice')
      this.loadCalled = true
      const snapshotObjects = await this.storage.listObjects(this.formKey(SNAPSHOT_FOLDER))
      if (snapshotObjects.length === 0) return
      const lastSnapshotObject = snapshotObjects.sort((a, b) => compareDesc(a.lastModified, b.lastModified))[0]
      this.feedVersion = versionFromSnapshotKey(lastSnapshotObject.key)
      this.createdAt = lastSnapshotObject.lastModified
      const snapshotRaw = await this.storage.getObject(lastSnapshotObject.key, lastSnapshotObject.versionId)
      const rows = parse(snapshotRaw)
      if (rows.length === 0) throw Error('empty snapshot')
      this.storageObjects = rows.map((row) => {
        return { key: row[0], versionId: row[1], lastModified: parseISO(row[2]) }
      })
    })
  }

  get version (): number | undefined {
    if (!this.loadCalled) throw Error('Read must be called before this method')
    return this.feedVersion
  }

  get uri (): string | undefined {
    if (!this.loadCalled) return
    return formSnaphotUri(this.storage, this.folder, this.feedVersion ?? 0)
  }

  listObjects (prefix: string): StorageObject[] {
    if (!this.loadCalled) throw Error('Read must be called before this method')
    // production code would work to make this search more efficient
    return this.storageObjects
      .filter(object => object.key.startsWith(prefix))
  }

  doesObjectExist (key: string): boolean {
    if (!this.loadCalled) throw Error('Read must be called before this method')
    return this.storageObjects.findIndex(object => object.key === key) !== -1
  }

  async getObject (key: string): Promise<string> {
    if (!this.loadCalled) throw Error('Read must be called before this method')
    const index = this.storageObjects.findIndex((object) => object.key === key)
    if (index === -1) throw Error('Object does not exist')
    const versionId = this.storageObjects[index].versionId
    if (versionId === undefined) throw Error('versioning is not enabled on storage or some other error')
    return await this.storage.getObject(this.formKey(key), versionId)
  }

  formKey (path: string): string {
    return join(this.folder, path)
  }
}

// Dev Note: Caller must ensure only one writer at a time.
export class SnapshotWriter extends SnapshotReader implements MutableSnapshot {
  initializedCalled = false
  isModified = false

  async initialize (): Promise<void> {
    await super.load()
    if (this.feedVersion !== undefined) {
      this.feedVersion = this.feedVersion + 1
    } else {
      this.feedVersion = 1
    }
    this.initializedCalled = true
    this.isModified = false
  }

  async putObject (key: string, value: string): Promise<void> {
    if (!this.initializedCalled) throw Error('Initialized must be called')
    // logger.info(`Put of object: ${key}`)
    const writtenObject = await this.storage.putObject(this.formKey(key), value)
    const snapshotKey = writtenObject.key.substring(this.folder.length + 1)
    const snapshotObject: StorageObject = { ...writtenObject, key: snapshotKey }
    upsert(this.storageObjects, snapshotObject, o => o.key === key)
    this.isModified = true
  }

  async deleteObject (key: string): Promise<void> {
    if (!this.initializedCalled) throw Error('Initialized must be called')
    // logger.info(`Delete of object: ${key}`)
    const index = this.storageObjects.findIndex((object) => object.key === key)
    if (index !== -1) {
      await this.storage.deleteObject(this.formKey(key))
      this.storageObjects.splice(index)
      this.isModified = true
    }
  }

  async publish (): Promise<void> {
    if (!this.isModified) return
    const csv = this.storageObjects.map(object => {
      assert(object.versionId !== undefined)
      const values = [object.key, object.versionId, formatISO(object.lastModified)]
      return stringify(values)
    })
    const raw = csv.join('')
    assert(this.feedVersion !== undefined)
    const key = this.formKey(formSnapshotKey(this.feedVersion))
    await this.storage.putObject(key, raw)
  }
}
