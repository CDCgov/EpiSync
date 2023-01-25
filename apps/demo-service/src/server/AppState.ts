import { SystemFeature } from '../features/system/SystemFeature'
import { FeedsFeature } from '../features/feeds/FeedsFeature'
import { AgenciesFeature } from '../features/agencies/AgenciesFeature'
import { Db } from 'mongodb'
import { FeedStorage } from 'episync-core'


// The application state is put into every request to share with the request
export interface AppState {
  db: Db
  feedStorage: FeedStorage
  systemFeature: SystemFeature
  feedsFeature: FeedsFeature
  agenciesFeature: AgenciesFeature
}
