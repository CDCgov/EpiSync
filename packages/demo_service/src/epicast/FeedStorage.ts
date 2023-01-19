export interface FeedStorage {
  readonly uri: string
  checkConnection: () => Promise<void>
  listObjects: (prefix: string, onlyOneLevel?: boolean) => Promise<StorageObject[]>
  listFolders: (prefix: string) => Promise<string[]>
  putObject: (name: string, body: string) => Promise<StorageObject>
  doesObjectExist: (name: string) => Promise<boolean>
  getObject: (name: string, versionId?: string) => Promise<string>
  deleteObject: (name: string) => Promise<void>
  clearAll: () => Promise<void>
}

export interface StorageObject {
  key: string
  lastModified: Date
  size?: number
  versionId?: string
}
