import { TimeSeries } from './TimeSeries'
import { FeedStorage } from './FeedStorage'
import { publishDictionary } from './publishDictionary'
import { publishTimeseries } from './publishTimeSeries'
import { publishAggregates } from './publishAggregates'
import { publishSummary } from './publishSummary'
import { SnapshotWriter } from './Snapshot'
import { formFolder } from './feedStorageKeys'

export interface PublishFeedOptions {
  excludePII?: boolean
}

export async function publishFeed (
  toStorage: FeedStorage,
  timeSeries: TimeSeries,
  publishOptions: PublishFeedOptions
): Promise<void> {
  const toSnapshot = new SnapshotWriter(toStorage, formFolder(timeSeries.summary))
  await toSnapshot.initialize()
  await publishDictionary(toSnapshot, timeSeries.dictionary, publishOptions)
  const objectsPublished = await publishTimeseries(toSnapshot, timeSeries, publishOptions)
  if (objectsPublished > 0) {
    await publishAggregates(toSnapshot, timeSeries)
    await publishSummary(toSnapshot, timeSeries)
    // other stuff defined later goes here
  }
  // Dev Note: publish will not create a new snapshot if there haven't been any changes
  await toSnapshot.publish()
}
