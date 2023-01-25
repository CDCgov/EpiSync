import { DeleteObjectCommand, GetObjectCommand, HeadBucketCommand, HeadObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getLogger } from './loggers'
import { FeedStorage, StorageObject } from 'episync-core'
import { ReadStream } from 'fs'
import { Readable } from 'stream'
import { parseISO } from 'date-fns'
import { fromIni } from '@aws-sdk/credential-providers'

const logger = getLogger('STORAGE')

export class S3FeedStorage implements FeedStorage {
  private readonly s3Client: S3Client
  readonly bucket: string
  readonly uri: string

  constructor (bucketName: string) {
    if (bucketName.length === 0) throw Error('Invalid bucket name')
    this.bucket = bucketName
    this.s3Client = S3FeedStorage.getS3Client()
    this.uri = `s3://${this.bucket}`
  }

  private async handleError (description: string): Promise<never> {
    logger.error(description)
    return await Promise.reject(new Error(description))
  }

  async checkConnection (): Promise<void> {
    logger.debug('about to connect to s3')
    const headResponse = await this.s3Client.send(new HeadBucketCommand({ Bucket: this.bucket }))
    if (headResponse.$metadata.httpStatusCode === 200) {
      logger.info(`Connected to: ${this.bucket}`)
    } else {
      return await this.handleError(`Cannot connect to: ${this.bucket}`)
    }
  }

  async listObjects (prefix: string, onlyOneLevel?: boolean): Promise<StorageObject[]> {
    const listResponse = await this.s3Client.send(new ListObjectsCommand({
      Bucket: this.bucket,
      Prefix: prefix,
      Delimiter: onlyOneLevel === true ? '/' : undefined
    }))
    if (listResponse.$metadata.httpStatusCode === 200) {
      return listResponse.Contents?.map(obj => {
        const lastModified = (obj.LastModified != null) ? parseISO(obj.LastModified.toISOString()) : new Date()
        const key = obj.Key ?? ''
        return { key, lastModified, size: obj.Size ?? 0 }
      }) ?? []
    } else {
      return await this.handleError(`List objects for: ${prefix}, ${listResponse.$metadata.httpStatusCode ?? 0}`)
    }
  }

  async listFolders (prefix: string): Promise<string[]> {
    const listResponse = await this.s3Client.send(new ListObjectsCommand({
      Bucket: this.bucket,
      Prefix: prefix,
      Delimiter: '/'
    }))
    if (listResponse.$metadata.httpStatusCode === 200) {
      return listResponse.CommonPrefixes?.map(prefix => prefix.Prefix ?? '') ?? []
    } else {
      return await this.handleError(`list folders for: ${prefix}, ${listResponse.$metadata.httpStatusCode ?? 0}`)
    }
  }

  async putObject (name: string, body: string | ReadStream): Promise<StorageObject> {
    logger.debug(`put object: ${name}`)
    const putResponse = await this.s3Client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: name,
      Body: body
    }))
    if (putResponse.$metadata.httpStatusCode !== 200) {
      return await this.handleError(`put error: ${name}, ${putResponse.$metadata.httpStatusCode ?? 0}`)
    }
    return { key: name, versionId: putResponse.VersionId, lastModified: new Date() }
  }

  async getObject (key: string, versionId?: string): Promise<string> {
    const getResponse = await this.s3Client.send(new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
      VersionId: versionId
    }))
    if (getResponse.$metadata.httpStatusCode === 200) {
      const readableStream = getResponse.Body as Readable
      let result = ''
      for await (const chunk of readableStream) {
        result = result.concat(chunk.toString())
      }
      return result
    } else {
      return await this.handleError(`get error: ${key}, ${getResponse.$metadata.httpStatusCode ?? 0}`)
    }
  }

  async doesObjectExist (key: string): Promise<boolean> {
    try {
      const headResponse = await this.s3Client.send(new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key
      }))
      return headResponse.$metadata.httpStatusCode === 200
    } catch (error) {
      return false
    }
  }

  async deleteObject (key: string): Promise<void> {
    logger.debug(`delete object: ${key}`)
    const deleteResponse = await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    }))
    if (deleteResponse.$metadata.httpStatusCode !== 204) {
      return await this.handleError(`delete error: ${key}, ${deleteResponse.$metadata.httpStatusCode ?? 0}`)
    }
  }

  async clearAll (): Promise<void> {
    const storageObjects = await this.listObjects('')
    for (const storageObject of storageObjects) {
      await this.deleteObject(storageObject.key)
    }
  }

  static getS3Client (): S3Client {
    if (process.env.S3_REGION === undefined) throw new Error('Missing S3_REGION .env variable')
    if (process.env.S3_CREDS_PROFILE === undefined) throw new Error('Missing S3_CREDS_PROFILE .env variable')
    return new S3Client({
      region: process.env.S3_REGION,
      credentials: fromIni({ profile: process.env.S3_CREDS_PROFILE })
    })
  }
}
