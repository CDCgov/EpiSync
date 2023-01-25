import { FeedStorage } from './FeedStorage'
import { SnapshotReader } from './Snapshot'
import { MutableTimeSeries } from './TimeSeries'
import { readDictionary } from './readDictionary'
import { readSummary } from './readSummary'
import { readTimeSeries } from './readTimeSeries'

export async function readFeed<T> (
  fromStorage: FeedStorage,
  folder: string,
  timeSeries: MutableTimeSeries<T>
): Promise<Date | undefined> {
  const fromSnapshot = new SnapshotReader(fromStorage, folder)
  await fromSnapshot.load()
  if (fromSnapshot.feedVersion === undefined) return
  const summary = await readSummary(fromSnapshot, timeSeries)
  if (summary === undefined) return

  const dictionary = await readDictionary(fromSnapshot, timeSeries)
  if (dictionary === null) return

  return await readTimeSeries(fromSnapshot, summary.reporterId, timeSeries)
}
