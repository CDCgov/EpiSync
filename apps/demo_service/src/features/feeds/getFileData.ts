
import { FileData, FileArray } from './FileArray'
import path from 'path/posix'
import { FeedStorage } from '@/epicast/FeedStorage'

export async function getFileData (storage: FeedStorage, prefix: string): Promise<FileArray> {
  const chonkyFiles: FileArray = []
  const fixedUpPrefix = prefix === '/' ? '' : prefix

  const s3Objects = await storage.listObjects(fixedUpPrefix, true)
  chonkyFiles.push(
    ...s3Objects.map(
      (object): FileData => ({
        id: object.key ?? '',
        name: path.basename(object.key ?? ''),
        modDate: object.lastModified,
        size: object.size
      })
    )
  )

  const s3Prefixes = await storage.listFolders(fixedUpPrefix)
  chonkyFiles.push(
    ...s3Prefixes.map(
      (prefix) => ({
        id: prefix,
        name: path.basename(prefix),
        isDir: true
      })
    )
  )

  return chonkyFiles
}
