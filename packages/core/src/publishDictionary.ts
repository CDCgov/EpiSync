import { readFileSync } from 'fs'
import { formatISO } from 'date-fns'
import { compile } from 'handlebars'
import path from 'node:path'

import { formDictionaryKey } from './feedStorageKeys'
import { FeedDictionary } from './FeedDictionary'
import { filterElements } from './FeedElement'
import { MutableSnapshot } from './Snapshot'
import { PublishFeedOptions } from './publishFeed'

const DICTIONARY_TEMPLATE_PATH = '../statics/dictionary.handlebars'

export async function publishDictionary(
  toSnapshot: MutableSnapshot,
  dictionary: FeedDictionary,
  publishOptions: PublishFeedOptions
): Promise<void> {
  const dictionaryKey = formDictionaryKey(dictionary.topicId, dictionary.validFrom)
  if (!toSnapshot.doesObjectExist(dictionaryKey)) {
    // TODO logger.info('publishing data dictionary')
    const dictionaryTemplate = readFileSync(path.resolve(__dirname, DICTIONARY_TEMPLATE_PATH), { encoding: 'utf8' })
    const compiledDictionaryTemplate = compile(dictionaryTemplate)
    const templateContext = formTemplateContext(dictionary, publishOptions)
    const rawDictionary = compiledDictionaryTemplate(templateContext)
    await toSnapshot.putObject(dictionaryKey, rawDictionary)
  }
}

function formTemplateContext(dictionary: FeedDictionary, publishOptions: PublishFeedOptions): any {
  const publishedElements = publishOptions.excludePII ?? false
    ? filterElements(dictionary.elements, 'pii')
    : dictionary.elements
  // format stuff in the way that the YAML file wants
  return {
    topicId: dictionary.topicId,
    reporterId: dictionary.reporterId,
    validFrom: formatISO(dictionary.validFrom),
    imports: dictionary.imports,
    elements: publishedElements
  }
}
