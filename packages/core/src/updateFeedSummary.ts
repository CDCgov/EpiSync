import { TimeSeriesMetadata } from './TimeSeries'
import { FeedSummary } from './FeedSummary'
import { upsert } from './upsert'

export interface SummaryUpdates {
  metadata?: TimeSeriesMetadata | null
  snapshotUri?: string
  sourceFeed?: FeedSummary
}

export function updateFeedSummary(
  initial: FeedSummary,
  updates: SummaryUpdates
): FeedSummary {
  const result = { ...initial }
  if (updates.metadata !== null && updates.metadata !== undefined) {
    result.eventCount = updates.metadata.count
    result.firstEventAt = updates.metadata.firstEventAt.toISOString()
    result.lastEventAt = updates.metadata.lastEventAt.toISOString()
    result.updatedAt = updates.metadata.updatedAt.toISOString()
  }
  if (updates.snapshotUri !== undefined) {
    result.sourceUri = updates.snapshotUri
  }
  if (updates.sourceFeed !== undefined) {
    if (result.sourceFeeds === undefined) {
      result.sourceFeeds = []
    }
    const sourceFeed: FeedSummary = updates.sourceFeed
    upsert(result.sourceFeeds, sourceFeed, isSummaryMatch)
  }
  return result
}

function isSummaryMatch(a: FeedSummary, b: FeedSummary): boolean {
  return a.topicId === b.topicId && a.reporterId === b.reporterId
}
