
export interface FeedSummary {
  episyncVersion: string
  reporterId: string
  topicId: string
  sourceUri: string
  descriptions: FeedDescription[]
  contacts: FeedContact[]
  sourceFeeds?: FeedSummary[]
  eventCount?: number
  updatedAt?: string
  firstEventAt?: string
  lastEventAt?: string
}

export interface FeedDescription {
  isoCultureCode: string
  reporter: string
  topic: string
  subject: string
  details: string
}

export interface FeedContact {
  email?: string
  telephone?: string
}
