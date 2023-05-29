/**
 * A FeedElement describes the data element.
 */
export interface FeedElement {
  /**
   * The name of the CSV column. This name is used even if the element is defined in an import.
   * Must unique in the data dictionary.
   */
  name: string

  /**
   * A import_name#element_name pair that refers to an imported element or blank/null
   */
  useImport?: string

  /**
   * A logical grouping of data elements:
   */
  section: string

  /**
   * Tags are lists of attributes
   */
  tags: FeedElementTag[]

  /**
   * Elements may be repeated or multi-valued. Patient email is an example of something that often has multiple values.
   */
  isRepeated: boolean

  /**
   * boolean to specify if the element is required. true or false
   */
  isRequired: boolean

  /**
   * Human readable descriptions. At least one description is required.
   */
  description: string

  /**
   * The type of the element.
   */
  type: FeedElementType

  /**
   * If type is 'code', a description of the value set used.
   */
  valueSet?: FeedElementValueSet
}

/**
 * Describes the valueset being used
 */
export interface FeedElementValueSet {
  /**
   * The terminology system being used. PHINVADS is expected
   */
  system: string

  /**
   * The name of the value set
   */
  name: string

  /**
   * URL to the value set
   */
  url: string
}

export type FeedElementType = 'string' | 'integer' | 'decimal' | 'date' | 'datetime' | 'code'
export type FeedElementTag = 'pii' | 'eventId' | 'eventAt' | 'eventUpdatedAt' | 'eventTopicId' | 'eventReporterId'

export function filterElements (elements: FeedElement[], excludeTag: FeedElementTag): FeedElement[] {
  return elements.filter((elem) => !elem.tags.includes(excludeTag))
}
