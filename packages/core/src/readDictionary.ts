import YAML from 'yaml'
import { isAfter } from 'date-fns'

import { MutableTimeSeries } from './TimeSeries'
import { FeedDictionary, FeedDictionaryYaml, fromYaml } from './FeedDictionary'
import { DICTIONARY_FOLDER } from './feedStorageKeys'
import { Snapshot } from './Snapshot'

export async function readDictionary<T> (
  fromSnapshot: Snapshot,
  mutatingTimeSeries: MutableTimeSeries<T>
): Promise<FeedDictionary | null> {
  const publishedBlobKey = findLastDictionaryKey(fromSnapshot, mutatingTimeSeries.dictionary.validFrom)
  if (publishedBlobKey === null) {
    // TODO: logger.debug('No dictionary found')
    return null
  }

  // TODO: logger.info(`Reading dictionary: ${publishedBlobKey}`)
  const publishedBlob = await fromSnapshot.getObject(publishedBlobKey)
  const newDictionary = fromYaml(YAML.parse(publishedBlob) as FeedDictionaryYaml)
  if (!isValidDictionary(newDictionary, mutatingTimeSeries.dictionary.topicId)) {
    // TODO: logger.debug('Invalid dictionary')
    return null
  }

  mutatingTimeSeries.updateSubscriberDictionary(newDictionary)
  return newDictionary
}

function findLastDictionaryKey (fromSnapshot: Snapshot, afterDate: Date | null): string | null {
  let objects = fromSnapshot.listObjects(DICTIONARY_FOLDER)
  if (objects.length === 0) {
    // TODO: logger.debug(`No dictionaries in ${fromSnapshot.uri ?? ''}`)
    return null
  }
  if (objects.length === 1) {
    return objects[0].key
  }
  if (afterDate !== null) {
    objects = objects.filter((object) => isAfter(object.lastModified, afterDate))
  }
  if (objects.length === 0) return null
  const lastDictionary = objects.reduce((a, b) => isAfter(a.lastModified, b.lastModified) ? a : b)
  return lastDictionary.key
}

function isValidDictionary (dictionary: FeedDictionary, expectedTopic: string): boolean {
  if (dictionary.reporterId.length === 0) return false
  if (dictionary.elements.length === 0) return false
  if (dictionary.namespaces.length === 0) return false
  if (dictionary.topicId !== expectedTopic) return false
  return true
}
