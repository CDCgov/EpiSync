import { AppState } from '../../server/AppState'
import { getLogger } from '../../server/loggers'
import { Router } from 'express'
import { Feature } from '../../server/Feature'
import systemRoutes from './systemRoutes'

export const logger = getLogger('RESET_SYSTEM')

export class SystemFeature implements Feature {
  otherFeatures: Feature[]
  name = 'system'
  collectionsUsed = []

  constructor (otherFeatures: Feature[]) {
    this.otherFeatures = otherFeatures
  }

  getRoutes (): [string, Router] {
    return [this.name, systemRoutes]
  }

  async start (): Promise<void> {
  }

  async stop (): Promise<void> {
  }

  async initializeStores (): Promise<void> {
  }

  async clearStores (): Promise<void> {
  }

  async reset (appState: AppState): Promise<void> {
    await appState.feedStorage.clearAll()
    for (const feature of this.otherFeatures) {
      logger.info(`Resetting: ${feature.name}`)
      await feature.clearStores(appState)
      await feature.initializeStores(appState)
    }
  }
}
