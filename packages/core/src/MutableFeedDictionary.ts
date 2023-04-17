import { FeedElement } from './FeedElement'
import { FeedDictionary, FeedImports } from './FeedDictionary'

export class MutableFeedDictionary implements FeedDictionary {
  topicId: string
  reporterId: string
  validFrom: Date
  imports: FeedImports[]
  elements: FeedElement[]

  constructor(initDictionary: FeedDictionary) {
    this.topicId = initDictionary.topicId
    this.reporterId = initDictionary.reporterId
    this.validFrom = initDictionary.validFrom
    this.imports = initDictionary.imports
    this.elements = initDictionary.elements.concat([])
    this.sortElements()
  }

  addElement(element: FeedElement): boolean {
    const index = this.elements.findIndex(e => e.name === element.name)
    if (index !== -1) { return false }

    this.validFrom = new Date()
    this.elements.push(element)
    this.sortElements()
    return true
  }

  deleteElement(name: string): boolean {
    const index = this.elements.findIndex(e => e.name === name)
    if (index === -1) { return false }

    const copy = [...this.elements]
    copy.splice(index, 1)
    this.elements = copy
    this.validFrom = new Date()
    this.sortElements()
    return true
  }

  addNamespace(adding: FeedImports): boolean {
    const index = this.imports.findIndex(n => n.name === adding.name)
    if (index !== -1) { return false }

    this.validFrom = new Date()
    this.imports.push(adding)
    return true
  }

  deleteNamespace(namespace: string): boolean {
    const index = this.imports.findIndex(n => n.name === namespace)
    if (index === -1) { return false }

    this.validFrom = new Date()
    const copy = [...this.imports]
    copy.splice(index, 1)
    this.imports = copy
    return true
  }

  private sortElements(): void {
    this.elements.sort((a, b) => {
      const sectionA = a.descriptions[0].section ?? 'zzz'
      const sectionB = b.descriptions[0].section ?? 'zzz'
      if (sectionA === sectionB) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      }
      if (sectionA === 'event') return -1
      if (sectionA < sectionB) return -1
      if (sectionA > sectionB) return 1
      return 0
    })
  }
}
