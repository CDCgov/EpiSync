import { max } from 'date-fns'
import { FeedDictionary } from './FeedDictionary'
import { MutableFeedDictionary } from './MutableFeedDictionary'

export function mergeDictionaries(reporter: string, dictionaries: FeedDictionary[]): FeedDictionary {
  if (dictionaries.length === 0) throw Error('expected to merge at least one dictionary')

  const result = new MutableFeedDictionary(dictionaries[0])
  for (const otherDictionary of dictionaries.slice(1)) {
    for (const element of otherDictionary.elements) {
      result.addElement(element)
    }
    for (const namespace of otherDictionary.imports) {
      result.addNamespace(namespace)
    }
  }
  result.reporterId = reporter
  result.validFrom = max(dictionaries.map(d => d.validFrom))
  return result
}
