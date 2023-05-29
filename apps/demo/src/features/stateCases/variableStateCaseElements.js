function generateQuestion(name, namespace, section, displayName) {
  return {
    name: name,
    type: 'string',
    namespace: namespace,
    tags: [],
    descriptions: [{
      isoCultureCode: 'en-us',
      displayName: displayName,
      section: section,
      details: 'A good question'
    }]
  }
}

export const caQuestion1 = generateQuestion('us_caQuestion1', 'us_ca', 'subject', 'CA Question 1')
export const caQuestion2 = generateQuestion('us_caQuestion2', 'us_ca', 'subject', 'CA Question 2')
export const caQuestion3 = generateQuestion('us_caQuestion3', 'us_ca', 'subject', 'CA Question 3')
export const cdcQuestion1 = generateQuestion('cdcQuestion1', 'cdc', 'subject', 'CDC Question 1')
export const cdcQuestion2 = generateQuestion('cdcQuestion2', 'cdc', 'subject', 'CDC Question 2')
export const cdcQuestion3 = generateQuestion('cdcQuestion3', 'cdc', 'subject', 'CDC Question 3')
export const azQuestion1 = generateQuestion('us_azQuestion1', 'us_az', 'subject', 'AZ Question 1')
export const azQuestion2 = generateQuestion('us_azQuestion2', 'us_az', 'subject', 'AZ Question 2')
export const azQuestion3 = generateQuestion('us_azQuestion3', 'us_az', 'subject', 'AZ Question 3')

export const variableStateCaseElements = [
  caQuestion1,
  caQuestion2,
  caQuestion3,
  cdcQuestion1,
  cdcQuestion2,
  cdcQuestion3,
  azQuestion1,
  azQuestion2,
  azQuestion3
]
