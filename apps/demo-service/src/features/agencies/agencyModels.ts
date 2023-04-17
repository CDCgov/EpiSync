import { FeedDictionary, FeedSummary, requiredElements } from 'episync-core'

export const commonTopic = 'cases'
export const commonTopicFullName = 'Demonstration cases'

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
export const mmgCaseDictionary: FeedDictionary = {
  topicId: commonTopic,
  reporterId: 'cdc.gov',
  validFrom: new Date(), // dummy value
  imports: [],
  elements: requiredElements.concat([
    {
      name: 'cdcOnsetOfSymptoms',
      namespace: 'cdc',
      type: 'date',
      tags: [],
      descriptions: [{
        isoCultureCode: 'en-us',
        displayName: 'Onset of Symptoms'
      }]
    },
    {
      name: 'cdcHospitalized',
      namespace: 'cdc',
      type: 'code',
      codeSet: 'PHVS_YesNoUnknown_CDC',
      tags: [],
      descriptions: [{
        isoCultureCode: 'en-us',
        displayName: 'Hospitalized'
      }]
    },
    {
      name: 'cdcSubjectDied',
      namespace: 'cdc',
      type: 'code',
      codeSet: 'PHVS_YesNoUnknown_CDC',
      tags: [],
      descriptions: [{
        isoCultureCode: 'en-us',
        displayName: 'Subject Died'
      }]
    },
    // person elements
    {
      name: 'uscdiPatientDateOfBirth',
      namespace: 'uscdi',
      type: 'date',
      tags: [],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Date of Birth'
      }]
    },
    {
      name: 'uscdiPatientRaceCategory',
      namespace: 'uscdi',
      type: 'code',
      tags: [],
      codeSet: 'PHVS_RaceCategory_CDC',
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Race'
      }]
    },
    {
      name: 'uscdiPatientEthnicityGroup',
      namespace: 'uscdi',
      type: 'code',
      tags: [],
      codeSet: 'PHVS_EthnicityGroup_CDC',
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Ethnicity'
      }]
    },
    {
      name: 'uscdiPatientSexAtBirth',
      namespace: 'uscdi',
      type: 'code',
      tags: [],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Sex at Birth'
      }]
    },
    {
      name: 'uscdiPatientState',
      namespace: 'uscdi',
      type: 'string',
      tags: [],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'State'
      }]
    },
    {
      name: 'uscdiPatientPostalCode',
      namespace: 'uscdi',
      type: 'string',
      tags: [],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Postal Code'
      }]
    }
  ])
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
  elements: mmgCaseDictionary.elements.concat([
    {
      name: 'uscdiPatientFirstName',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'First Name'
      }]
    },
    {
      name: 'uscdiPatientLastName',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Last Name'
      }]
    },
    {
      name: 'uscdiPatientAddress',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Address'
      }]
    },
    {
      name: 'uscdiPatientCity',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'City'
      }]
    },
    {
      name: 'uscdiPatientPhone',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Telephone'
      }]
    },
    {
      name: 'uscdiPatientEmail',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Email'
      }]
    }
  ])
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
  elements: mmgCaseDictionary.elements.concat([
    {
      name: 'uscdiPatientFirstName',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'First Name'
      }]
    },
    {
      name: 'uscdiPatientLastName',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Last Name'
      }]
    },
    {
      name: 'uscdiPatientAddress',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Address'
      }]
    },
    {
      name: 'uscdiPatientCity',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'City'
      }]
    },
    {
      name: 'uscdiPatientPhone',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Telephone'
      }]
    },
    {
      name: 'uscdiPatientEmail',
      namespace: 'uscdi',
      type: 'string',
      tags: ['pii'],
      descriptions: [{
        isoCultureCode: 'en-us',
        section: 'patient',
        displayName: 'Email'
      }]
    }
  ])
}

export const variableDictionaryElementNames = [
  'us_caQuestion1', 'us_caQuestion2', 'us_caQuestion3',
  'us_azQuestion1', 'us_azQuestion2', 'us_azQuestion3',
  'cdcQuestion1', 'cdcQuestion2', 'cdcQuestion3'
]
