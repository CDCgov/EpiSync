import { FeedElement } from './FeedElement'

export const requiredElements: FeedElement[] = [
  {
    name: 'eventId',
    namespace: 'event',
    type: 'string',
    tags: [],
    descriptions: [{
      isoCultureCode: 'en-us',
      section: 'event',
      displayName: 'Event Id'
    }]
  },
  {
    name: 'eventAt',
    namespace: 'event',
    type: 'date',
    tags: [],
    descriptions: [{
      isoCultureCode: 'en-us',
      section: 'event',
      displayName: 'Event Time'
    }]
  },
  {
    name: 'eventReporterId',
    namespace: 'event',
    type: 'string',
    tags: [],
    descriptions: [{
      isoCultureCode: 'en-us',
      section: 'event',
      displayName: 'Event Reporter'
    }]
  },
  {
    name: 'eventTopicId',
    namespace: 'event',
    type: 'string',
    tags: [],
    descriptions: [{
      isoCultureCode: 'en-us',
      section: 'event',
      displayName: 'Event Topic'
    }]
  },
  {
    name: 'eventUpdatedAt',
    namespace: 'event',
    type: 'date',
    tags: [],
    descriptions: [{
      isoCultureCode: 'en-us',
      section: 'event',
      displayName: 'Event Updated Time'
    }]
  }
]
