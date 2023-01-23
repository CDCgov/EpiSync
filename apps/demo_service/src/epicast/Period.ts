import { formatISO, parseISO, compareAsc, addDays, addMonths, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns'
import { Frequency } from './Frequency'

export class Period {
  readonly start: Date
  readonly end: Date
  readonly frequency: Frequency
  readonly interval: Interval

  constructor (start: Date, frequency: Frequency) {
    this.frequency = frequency
    switch (this.frequency) {
      case Frequency.MONTHLY: {
        this.start = startOfMonth(start)
        this.end = endOfMonth(start)
        this.interval = { start: this.start, end: this.end }
        break
      }
      case Frequency.DAILY: {
        this.start = startOfDay(start)
        this.end = endOfDay(start)
        this.interval = { start: this.start, end: this.end }
        break
      }
    }
  }

  previousPeriod (): Period {
    return new Period(this.previousStart(), this.frequency)
  }

  previousStart (): Date {
    switch (this.frequency) {
      case Frequency.DAILY: return addDays(this.start, -1)
      case Frequency.MONTHLY: return addMonths(this.start, -1)
    }
  }

  nextPeriod (): Period {
    return new Period(this.nextStart(), this.frequency)
  }

  nextStart (): Date {
    switch (this.frequency) {
      case Frequency.DAILY: return addDays(this.start, 1)
      case Frequency.MONTHLY: return addMonths(this.start, 1)
    }
  }

  static compareAsc (onePeriod: Period, anotherPeriod: Period): number {
    return compareAsc(onePeriod.start, anotherPeriod.start)
  }

  static parse (text: string): Period {
    // For real code, do some input checking here
    const [startPart, periodPart] = text.split('--', 2)
    if (startPart === undefined || periodPart === undefined) throw Error(`Unable to parse: ${text}`)
    const start = parseISO(startPart)
    const frequency = periodPart as Frequency
    return new Period(start, frequency)
  }

  toString (): string {
    const startPart = formatISO(this.start, { format: 'basic', representation: 'complete' })
    return `${startPart}--${this.frequency}`
  }
}
