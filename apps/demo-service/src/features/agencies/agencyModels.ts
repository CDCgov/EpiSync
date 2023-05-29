import { FeedDictionary, FeedSummary, FeedElement, requiredElements } from 'episync-core'

export const commonTopic = 'cases'
export const commonTopicFullName = 'Demonstration cases'

const commonPatientElements: FeedElement[] = [
  {
    name: 'uscdiPatientFirstName',
    type: 'string',
    tags: ['pii'],
    section: 'subject',
    description: 'First Name',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientLastName',
    type: 'string',
    tags: ['pii'],
    section: 'subject',
    description: 'Last Name',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientAddress',
    type: 'string',
    tags: ['pii'],
    section: 'subject',
    description: 'Address',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientCity',
    type: 'string',
    tags: ['pii'],
    section: 'subject',
    description: 'City',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientPhone',
    type: 'string',
    tags: ['pii'],
    section: 'subject',
    description: 'Telephone',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientEmail',
    type: 'string',
    tags: ['pii'],
    section: 'subject',
    description: 'Email',
    isRequired: false,
    isRepeated: false,
  }
]

//
// CDC Case Definition
//

export const initialCDCSummary: FeedSummary = {
  episyncVersion: '0.1',
  reporterId: 'cdc.gov',
  topicId: commonTopic,
  sourceUri: '',
  sourceFeeds: [],
  descriptions: [{
    isoCultureCode: 'en-us',
    reporter: 'Centers for Disease Control and Prevention',
    topic: commonTopicFullName,
    subject: 'United States of America',
    details: 'This a fake feed for demonstration purposes'
  }],
  contacts: [{ email: 'fake@cdc.gov' }]
}

// An initial feed dictionary that is shared between all feeds.
// will be modified by individual feeds
//
const mmgCaseElements: FeedElement[] = [
  {
    name: 'cdcOnsetOfSymptoms',
    type: 'date',
    tags: [],
    section: 'case',
    description: 'Onset of Symptoms',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'cdcHospitalized',
    type: 'code',
    valueSet: {
      system: 'PHINVADS',
      name: 'PHVS_YesNoUnknown_CDC',
      url: ''
    },
    tags: [],
    section: 'case',
    description: 'Hospitalized',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'cdcSubjectDied',
    type: 'code',
    valueSet: {
      system: 'PHINVADS',
      name: 'PHVS_YesNoUnknown_CDC',
      url: ''
    },
    tags: [],
    section: 'case',
    description: 'Subject Died',
    isRequired: false,
    isRepeated: false,
  },
  // person elements
  {
    name: 'uscdiPatientDateOfBirth',
    type: 'date',
    tags: [],
    section: 'patient',
    description: 'Date of Birth',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientRaceCategory',
    type: 'code',
    tags: [],
    valueSet: {
      system: 'PHINVADS',
      name: 'PHVS_RaceCategory_CDC',
      url: ''
    },
    section: 'subject',
    description: 'Race',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientEthnicityGroup',
    type: 'code',
    tags: [],
    valueSet: {
      system: 'PHINVADS',
      name: 'PHVS_EthnicityGroup_CDC',
      url: ''
    },
    section: 'subject',
    description: 'Ethnicity',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientSexAtBirth',
    type: 'code',
    tags: [],
    section: 'subject',
    description: 'Sex at Birth',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientState',
    type: 'string',
    tags: [],
    section: 'subject',
    description: 'State',
    isRequired: false,
    isRepeated: false,
  },
  {
    name: 'uscdiPatientPostalCode',
    type: 'string',
    tags: [],
    section: 'subject',
    description: 'Postal Code',
    isRequired: false,
    isRepeated: false,
  }
]

export const mmgCaseDictionary: FeedDictionary = {
  topicId: commonTopic,
  reporterId: 'cdc.gov',
  validFrom: new Date(), // dummy value
  imports: [],
  elements: requiredElements.concat(mmgCaseElements)
}

//
// CA
//

// Initial summary for the feeds
//
export const initialCASummary: FeedSummary = {
  episyncVersion: '0.1',
  reporterId: 'cdph.ca.gov',
  topicId: commonTopic,
  sourceUri: '',
  sourceFeeds: [],
  descriptions: [{
    isoCultureCode: 'en-us',
    subject: 'California',
    reporter: 'California Public Health Department',
    topic: commonTopicFullName,
    details: 'This a fake feed for demonstration purposes'
  }],
  contacts: [{ email: 'fake@cdph.ca.gov' }]
}

export const caStateDictionary = {
  topicId: commonTopic,
  reporterId: 'cdph.ca.gov',
  validFrom: new Date(), // dummy value
  imports: [
    {
      name: 'mmg',
      description: 'Elements from CDC MMG'
    },
  ],
  elements: mmgCaseDictionary.elements.concat(commonPatientElements)
}

//
// AZ
//

// Initial summary for the feeds
//

export const initialAZSummary: FeedSummary = {
  episyncVersion: '0.1',
  reporterId: 'azphs.gov',
  topicId: commonTopic,
  sourceUri: '',
  sourceFeeds: [],
  descriptions: [{
    isoCultureCode: 'en-us',
    reporter: 'Arizona Public Health Service',
    topic: commonTopicFullName,
    subject: 'Arizona',
    details: 'This a fake feed for demonstration purposes'
  }],
  contacts: [{ email: 'fake@azphs.gov' }]
}

export const azStateDictionary = {
  topicId: commonTopic,
  reporterId: 'azphs.gov',
  validFrom: new Date(), // dummy value
  imports: [
    {
      name: 'mmg',
      description: 'Elements from CDC MMG'
    },
  ],
  elements: mmgCaseDictionary.elements.concat(commonPatientElements)
}

export const variableDictionaryElementNames = [
  'us_caQuestion1', 'us_caQuestion2', 'us_caQuestion3',
  'us_azQuestion1', 'us_azQuestion2', 'us_azQuestion3',
  'cdcQuestion1', 'cdcQuestion2', 'cdcQuestion3'
]
