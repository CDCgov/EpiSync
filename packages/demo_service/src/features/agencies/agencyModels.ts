import { FeedDictionary } from '../../epicast/FeedDictionary'
import { FeedSummary } from '../../epicast/FeedSummary'
import { requiredElements } from '../../epicast/requiredElements'

export const commonTopic = 'cases'
export const commonTopicFullName = 'Demonstration cases'

// Initial summary for the feeds
//
export const initialCASummary: FeedSummary = {
  epicastVersion: '0.1',
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

export const initialAZSummary: FeedSummary = {
  epicastVersion: '0.1',
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

export const initialCDCSummary: FeedSummary = {
  epicastVersion: '0.1',
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
export const initialCommonCaseDictionary: FeedDictionary = {
  topicId: commonTopic,
  reporterId: 'varies', // dummy data
  validFrom: new Date(), // dummy value
  namespaces: [
    {
      namespace: 'cdc',
      description: 'Elements from the state'
    },
    {
      namespace: 'uscdi',
      description: 'Element defined in the uscdi'
    },
    {
      namespace: 'us_ca',
      description: 'Main state elements'
    },
    {
      namespace: 'us_az',
      description: 'Neighbor state elements'
    },
    {
      namespace: 'event',
      description: 'Core EpiCast elements'
    }
  ],
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

export const initialStateDictionary = {
  ...initialCommonCaseDictionary,
  elements: initialCommonCaseDictionary.elements.concat([
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
