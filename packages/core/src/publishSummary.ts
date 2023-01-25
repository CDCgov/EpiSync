import { readFileSync } from 'fs'
import path from 'node:path'
import { compile } from 'handlebars'
import { SUMMARY_KEY } from './feedStorageKeys'
import { updateFeedSummary } from './updateFeedSummary'
import { MutableSnapshot } from './Snapshot'
import { TimeSeries } from './TimeSeries'

const SUMMARY_TEMPLATE_PATH = '../statics/summary.handlebars'

export async function publishSummary(
  toSnapshot: MutableSnapshot,
  timeSeries: TimeSeries
): Promise<void> {
  const timeSeriesMetadata = await timeSeries.fetchMetadata()
  const feedSummary = timeSeriesMetadata !== null
    ? updateFeedSummary(timeSeries.summary, { metadata: timeSeriesMetadata, snapshotUri: toSnapshot.uri })
    : timeSeries.summary
  const summaryTemplate = readFileSync(path.resolve(__dirname, SUMMARY_TEMPLATE_PATH), { encoding: 'utf8' })
  const compiledSummaryTemplate = compile(summaryTemplate)
  const rawSummary = compiledSummaryTemplate(feedSummary)
  await toSnapshot.putObject(SUMMARY_KEY, rawSummary)
  // TODO: logger.info(`Published feed summary for ${feedSummary.reporterId}`)
}
