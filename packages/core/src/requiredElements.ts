import { FeedElement } from './FeedElement'

export const requiredElements: FeedElement[] = [
  {
    name: 'eventId',
    type: 'string',
    isRepeated: false,
    isRequired: true,
    section: 'event',
    description: 'Event Id',
    tags: ['eventId'],
  },
  {
    name: 'eventAt',
    type: 'date',
    isRepeated: false,
    isRequired: true,
    section: 'event',
    description: 'Event At',
    tags: ['eventAt'],
  },
  {
    name: 'eventUpdatedAt',
    type: 'date',
    isRepeated: false,
    isRequired: true,
    section: 'event',
    description: 'Updated At',
    tags: ['eventUpdatedAt'],
  },
  {
    name: 'eventReporterId',
    type: 'string',
    isRepeated: false,
    isRequired: true,
    section: 'event',
    description: 'Reporter Id',
    tags: ['eventReporterId'],
  },
  {
    name: 'eventTopicId',
    type: 'string',
    isRepeated: false,
    isRequired: true,
    section: 'event',
    description: 'Topic Id',
    tags: ['eventTopicId'],
  }
]
