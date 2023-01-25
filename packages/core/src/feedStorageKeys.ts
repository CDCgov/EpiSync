import { Period } from './Period'
import { formatISO } from 'date-fns'
import pathPosix from 'node:path/posix'
import { FeedStorage } from './FeedStorage'
import { FeedSummary } from './FeedSummary'

//
// Define where to put objects and how to name them in a feed's storage
//

export const formFolder = (feedSummary: FeedSummary): string => {
  return pathPosix.join(feedSummary.reporterId.toLowerCase(), feedSummary.topicId.toLowerCase())
}

export const SUMMARY_FOLDER = ''
export const SUMMARY_EXTENSION = 'yaml'
export const SUMMARY_KEY = 'summary.yaml'

export const LOG_FOLDER = 'logs'
export const LOG_EXTENSION = 'log'
export const formLogKey = (forDay?: Date): string => {
  const day = forDay ?? new Date()
  const dayText = formatISO(day, { format: 'basic', representation: 'date' })
  return `${LOG_FOLDER}/${dayText}.${LOG_EXTENSION}`
}

export const TIMESERIES_FOLDER = 'time_series'
export const TIMESERIES_EXT = 'csv'
export const formTimeSeriesKey = (forPeriod: Period): string => {
  const fileName = forPeriod.toString()
  return `${TIMESERIES_FOLDER}/${fileName}.${TIMESERIES_EXT}`
}
export const periodFromTimeSeriesKey = (key: string): Period => {
  const periodPart = pathPosix.parse(key).name
  return Period.parse(periodPart)
}

export const DELETED_FOLDER = 'deleted'
export const DELETED_EXT = 'csv'
export const formDeletedKey = (forPeriod: Period): string => {
  const fileName = forPeriod.toString()
  return `${DELETED_FOLDER}/${fileName}.${DELETED_EXT}`
}
export const formDeletedKeyFromTimeSeriesKey = (key: string): string => {
  const period = periodFromTimeSeriesKey(key)
  return formDeletedKey(period)
}
export const periodFromDeletedKey = (key: string): Period => {
  const periodPart = pathPosix.parse(key).name
  return Period.parse(periodPart)
}

export const DICTIONARY_FOLDER = 'data_dictionary'
export const DICTIONARY_EXTENSION = 'yaml'
export const formDictionaryKey = (topic: string, validFrom: Date): string => {
  return `${DICTIONARY_FOLDER}/${[topic, formatISO(validFrom)].join(FILE_NAME_SEPERATOR)}.${DICTIONARY_EXTENSION}`
}
export const splitDictionaryKey = (key: string): [string, string] => {
  const fileName = pathPosix.parse(key).name
  const index = fileName.indexOf(FILE_NAME_SEPERATOR)
  return [fileName.substring(0, index), fileName.substring(index + 1)]
}

export const FILE_NAME_SEPERATOR = '-'
export const formFeedName = (reporterId: string, topicId: string): string => {
  return [reporterId, topicId].join(FILE_NAME_SEPERATOR)
}

export const SNAPSHOT_FOLDER = 'snapshots'
export const SNAPSHOT_EXTENSION = 'csv'
export const formSnapshotKey = (version: number): string => {
  return `${SNAPSHOT_FOLDER}/${version}.${SNAPSHOT_EXTENSION}`
}
export const versionFromSnapshotKey = (key: string): number => {
  const fileName = pathPosix.parse(key).name
  return parseInt(fileName)
}
export const formSnaphotUri = (storage: FeedStorage, folder: string, version: number): string => {
  return `${storage.uri}/${folder}/${formSnapshotKey(version)}`
}

export const AGGREGATES_FOLDER = 'aggregates'
export const AGGREGATES_EXTENSION = 'csv'
export const formAggregatesKey = (reporterId: string, feedId: string, year: number): string => {
  return `${AGGREGATES_FOLDER}/${reporterId}-${feedId}-${year}.${AGGREGATES_EXTENSION}`
}
