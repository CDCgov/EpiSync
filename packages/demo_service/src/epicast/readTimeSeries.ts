import { isAfter, min, parseISO } from 'date-fns'
import { parse } from 'csv-string'
import { strict as assert } from 'node:assert'

import { StorageObject } from './FeedStorage'
import { formDeletedKeyFromTimeSeriesKey, TIMESERIES_FOLDER } from './feedStorageKeys'
import { getLogger } from '../server/loggers'
import { MutableTimeSeries, TimeSeriesDeletedEvent } from './TimeSeries'
import { FeedElement } from './FeedElement'
import { FeedDictionary } from './FeedDictionary'
import { Snapshot } from './Snapshot'

const logger = getLogger('READ_TIME_SERIES_CONTROLLER')

export async function readTimeSeries<T> (
  fromSnapshot: Snapshot,
  fromReporterId: string,
  toTimeSeries: MutableTimeSeries<T>
): Promise<Date | undefined> {
  const reader = new TimeSeriesReader(fromSnapshot, fromReporterId, toTimeSeries)
  return await reader.read()
}

class TimeSeriesReader<T> {
  snapshot: Snapshot
  timeSeries: MutableTimeSeries<T>
  reporterId: string

  constructor (fromSnapshot: Snapshot, fromReporterId: string, toTimeSeries: MutableTimeSeries<T>) {
    this.snapshot = fromSnapshot
    this.reporterId = fromReporterId
    this.timeSeries = toTimeSeries
  }

  async read (): Promise<Date | undefined> {
    const snapshotVersion = this.snapshot.version?.toString() ?? 'empty'
    logger.info(`Reading: ${this.snapshot.uri ?? 'never'}; snapshot version: ${snapshotVersion} `)
    let publishedObjects = await this.snapshot.listObjects(TIMESERIES_FOLDER)
    if (publishedObjects.length === 0) return
    const lastPublished = this.lastModifiedOf(publishedObjects)
    const lastEvent = await this.timeSeries.fetchOneEvent({ reporterId: this.reporterId, for: 'updateAt', order: 'last' })
    if (lastEvent !== null) {
      publishedObjects = publishedObjects.filter((object) => isAfter(object.lastModified, lastEvent.eventUpdatedAt))
    }
    logger.debug(`Snapshot ${snapshotVersion} has ${publishedObjects.length} files to read`)

    const events = await this.fetchEvents(publishedObjects)
    await this.timeSeries.upsertEvents(events)

    const deletedEvents = await this.fetchDeletedEvents(publishedObjects)
    await this.timeSeries.deleteEvents(deletedEvents)

    return lastPublished
  }

  async fetchEvents (publishedObjects: StorageObject[]): Promise<T[]> {
    const promises = publishedObjects.map(async (publishedObject) => await this.fetchOnePartition(publishedObject))
    const events = (await Promise.all(promises)).flatMap((partition) => partition)
    return events
  }

  async fetchOnePartition (publishedObject: StorageObject): Promise<T[]> {
    function matchElements (header: string[], dictionary: FeedDictionary): FeedElement[] {
      const elements: FeedElement[] = []
      for (let col = 0; col < header.length; col++) {
        const name = header[col]
        const matchedElement = dictionary.elements.find(element => element.name === name)
        if (matchedElement !== undefined) {
          elements.push(matchedElement)
        }
      }
      assert(header.length === elements.length)
      return elements
    }

    const csv = await this.snapshot.getObject(publishedObject.key)
    const rows = parse(csv)
    if (rows.length === 0) throw new Error('invalid object')

    const elements = matchElements(rows[0], this.timeSeries.dictionary)
    return rows.slice(1).map((row) => this.readEvent(row, elements))
  }

  readEvent (row: string[], elements: FeedElement[]): T {
    assert(row.length === elements.length)
    const values = row.map((column, index) => {
      switch (elements[index].type) {
        case 'date': return parseISO(column)
        case 'number': return Number.parseFloat(column)
        default: return column
      }
    })
    const names = elements.map(element => element.name)
    const eventValues: any = {}
    for (let i = 0; i < names.length; i++) {
      eventValues[names[i]] = values[i]
    }
    return this.timeSeries.createEvent(eventValues)
  }

  async fetchDeletedEvents (publishedObjects: StorageObject[]): Promise<TimeSeriesDeletedEvent[]> {
    const promises = publishedObjects.map(async (publishedObject) => await this.fetchOneDeletedPartition(publishedObject))
    const events = (await Promise.all(promises)).flatMap((partition) => partition)
    return events
  }

  async fetchOneDeletedPartition (publishedObject: StorageObject): Promise<TimeSeriesDeletedEvent[]> {
    const deletedKey = formDeletedKeyFromTimeSeriesKey(publishedObject.key)
    if (!this.snapshot.doesObjectExist(deletedKey)) return []
    const csv = await this.snapshot.getObject(deletedKey)
    const rows = parse(csv)
    if (rows.length === 0) throw new Error('invalid object')

    return rows.slice(1).map((row) => {
      return { eventId: row[0], replaceBy: row[1].length > 0 ? row[1] : undefined }
    })
  }

  lastModifiedOf (objects: StorageObject[]): Date {
    return min(objects.map((o) => o.lastModified))
  }
}
