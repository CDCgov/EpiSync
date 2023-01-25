import YAML from 'yaml'

import { MutableTimeSeries } from './TimeSeries'
import { FeedSummary } from './FeedSummary'
import { SUMMARY_KEY } from './feedStorageKeys'
import { Snapshot } from './Snapshot'


export async function readSummary<T> (
  fromSnapshot: Snapshot,
  toTimeSeries: MutableTimeSeries<T>
): Promise<FeedSummary | undefined> {
  if (!fromSnapshot.doesObjectExist(SUMMARY_KEY)) return
  const publishedBlob = await fromSnapshot.getObject(SUMMARY_KEY)
  const newSummary = YAML.parse(publishedBlob) as FeedSummary
  toTimeSeries.updateSubscriberSummary(newSummary)
  // TODO logger.info(`Successful read of ${newSummary.reporterId} summary`)
  return newSummary
}
