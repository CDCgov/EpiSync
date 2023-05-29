import { Router } from 'express'
import { Feature } from '../../server/Feature'
import { AppState } from '../../server/AppState'
import feedRouter from './feedRoutes'

export class FeedsFeature implements Feature {
  name = 'feeds'
  collectionsUsed = []

  getRoutes (): [string, Router] {
    return [this.name, feedRouter]
  }

  async start (state: AppState): Promise<void> {
  }

  async stop (): Promise<void> {
  }

  async initializeStores (): Promise<void> {
  }

  async clearStores (): Promise<void> {
  }
}
