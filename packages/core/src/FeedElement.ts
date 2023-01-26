/**
 * A FeedElement describes the data element for machines and humans
 */
export interface FeedElement {
  /**
   * The name of the element. Must be globally unique. Corresponds to the name of the CSV column
   */
  name: string

  /**
   * The namespace used to define the element. The element name must start with the namespace.
   * Namespaces are handed out globally at EpiSync centeral.
   */
  namespace: string

  /**
   * The type of the element.
   */
  type: FeedElementType

  /**
   * Tags are lists of attributes
   */
  tags: FeedElementTag[]

  /**
   * Elements may be repeated or multi-valued. Patient email is an example of something that often has multiple values.
   */
  repeated?: boolean

  /**
   * Human readable descriptions. At least one description is required.
   */
  descriptions: [FeedElementDescription, ...FeedElementDescription[]]

  /**
   * If type is 'code', a description of the code set used.
   */
  codeSet?: string

  /**
   * Validation language to be defined.
   */
  validation?: string
}

export interface FeedElementDescription {
  /**
   * ISO culture code. 'en' is a good default or 'en-us' are good defaults.
   */
  isoCultureCode: string

  /**
   * A human readable name for the element. Example "Email Address"
   */
  displayName: string

  /**
   * A natural grouping of elements together. Example, "Patient".
   */
  section?: string

  /**
   * Detail description of the element and what is expected. Like display name, this should be used to communicate to people filling out a form.
   */
  details?: string

  /**
   * In addition to details about the element from the creators of the element.
   * May contain information about the purpose and value of the element
   */
  authorComments?: string
}

export type FeedElementType = 'string' | 'number' | 'date' | 'code'
export type FeedElementTag = 'pii'

export function filterElements (elements: FeedElement[], excludeTag: FeedElementTag): FeedElement[] {
  return elements.filter((elem) => !elem.tags.includes(excludeTag))
}
