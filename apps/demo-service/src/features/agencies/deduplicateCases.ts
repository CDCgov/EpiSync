import { TimeSeriesDeletedEvent } from 'episync-core'
import { getLogger } from 'log4js'
import { MongoTimeSeries, MongoTimeSeriesEvent } from './MongoTimeSeries'

const logger = getLogger('DEDUPLICATE_CASES')

export async function deduplicateCases (timeSeries: MongoTimeSeries): Promise<void> {
  function isDuplicate (a: MongoTimeSeriesEvent, b: MongoTimeSeriesEvent): boolean {
    return a.uscdiPatientFirstName === b.uscdiPatientFirstName &&
      a.uscdiPatientLastName === b.uscdiPatientLastName &&
      a.uscdiPatientEmail === b.uscdiPatientEmail
  }

  async function findDuplicates (cases: MongoTimeSeriesEvent[]): Promise<TimeSeriesDeletedEvent[]> {
    // This algorithm only works if duplicates are consecutive as is the case for our code
    const deletedEvents: TimeSeriesDeletedEvent[] = []
    for (let i = 0; i < cases.length; i++) {
      for (let j = i + 1; j < cases.length; j++) {
        if (isDuplicate(cases[i], cases[j])) {
          deletedEvents.push({ eventId: cases[j].eventId, replaceBy: cases[i].eventId })
        } else {
          i = j - 1 // increment will make this i = j on next loop
          break
        }
      }
    }
    return deletedEvents
  }

  logger.info('Deduplicating state cases')
  const events = await timeSeries.fetchAllEvents()
  const duplicates = await findDuplicates(events)
  await timeSeries.deleteEvents(duplicates)
  logger.debug(`Found duplicates: ${duplicates.length}`)
}
