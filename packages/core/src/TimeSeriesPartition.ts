import { Frequency } from './Frequency'
import { Period } from './Period'
import { isAfter, isWithinInterval } from 'date-fns'
import { TimeSeriesEvent } from './TimeSeries'

export class TimeSeriesPartition {
  period: Period
  events: TimeSeriesEvent[]

  constructor (period: Period, events: TimeSeriesEvent[]) {
    this.period = period
    this.events = events
  }
}

export function makeCasePartions (events: TimeSeriesEvent[], frequency: Frequency, optionalStartDate?: Date, optionalEndDate?: Date): TimeSeriesPartition[] {
  if (events.length === 0) return []
  const partions: TimeSeriesPartition[] = []
  const startDate = optionalStartDate !== undefined ? optionalStartDate : events[0].eventAt
  const endDate = optionalEndDate !== undefined ? optionalEndDate : events[events.length - 1].eventAt
  let partitionPeriod = new Period(startDate, frequency)
  while (!isAfter(partitionPeriod.start, endDate)) {
    const partitionCases = findCasesForPeriod(events, partitionPeriod)
    partions.push(new TimeSeriesPartition(partitionPeriod, partitionCases))
    partitionPeriod = partitionPeriod.nextPeriod()
  }
  return partions
}

function findCasesForPeriod (events: TimeSeriesEvent[], period: Period): TimeSeriesEvent[] {
  return events.filter((event) => { return isWithinInterval(event.eventAt, period.interval) })
}
