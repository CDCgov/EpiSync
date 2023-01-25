import { AppState } from './AppState'
import { Router } from 'express'

export interface Feature {
  // name the feature for debug purposes
  name: string

  // Name the collections used by this feature
  collectionsUsed: string []

  // Get the router for this feature
  getRoutes: () => [string, Router]

  // Called first on app start. Called in tests and normal operation. Should not change persistent state.
  start: (state: AppState) => Promise<void>

  // Called last on app shutdown. Called in tests and normal operation
  stop: (state: AppState) => Promise<void>

  // Called to setup stores with demo state. Assume clearStores has been called before this.
  initializeStores: (state: AppState) => Promise<void>

  // Called to clear stores empty state. Called on normal startup, before tests, and on system reset.
  clearStores: (state: AppState) => Promise<void>
}
