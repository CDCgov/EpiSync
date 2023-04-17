import { parseISO } from 'date-fns'
import { FeedElement } from './FeedElement'

export interface FeedDictionary {
  readonly topicId: string
  readonly reporterId: string
  readonly validFrom: Date
  readonly imports: FeedImports[]
  readonly elements: FeedElement[]
}

// Needed because of validFrom is a string in YAML
export interface FeedDictionaryYaml {
  readonly topicId: string
  readonly reporterId: string
  readonly validFrom: string
  readonly imports: FeedImports[]
  readonly elements: FeedElement[]
}

export function fromYaml(yaml: FeedDictionaryYaml): FeedDictionary {
  const validFrom = yaml.validFrom
  return { ...yaml, validFrom: parseISO(validFrom) }
}

export interface FeedImports {
  readonly name: string
  readonly description?: string
  readonly sourceUri?: string
  // More to be defined later
}
