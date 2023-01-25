import { Router } from 'express'
import { Feature } from '../../server/Feature'
import agenciesRouter from './agencyRoutes'
import { MongoTimeSeries, MongoTimeSeriesEvent } from './MongoTimeSeries'
import { MutableTimeSeries } from 'episync-core'
import { FeedSubscriber } from './FeedSubscriber'
import { initialCASummary, initialAZSummary, initialCDCSummary, initialStateDictionary, initialCommonCaseDictionary } from './agencyModels'
import { AppState } from '../../server/AppState'
import { insertFakeCases } from './insertFakeCases'
import { publishFeed } from 'episync-core'

export interface AgencyModel {
  name: string
  timeSeries: MutableTimeSeries<MongoTimeSeriesEvent>
  subcribers: FeedSubscriber[]
}

export class AgenciesFeature implements Feature {
  name = 'agencies'
  collectionsUsed: string[]

  private readonly caTimeSeries = new MongoTimeSeries(initialCASummary, initialStateDictionary)
  private readonly azTimeSeries = new MongoTimeSeries(initialAZSummary, initialStateDictionary)
  private readonly cdcTimeSeries = new MongoTimeSeries(initialCDCSummary, initialCommonCaseDictionary)
  private azSubscriber?: FeedSubscriber
  private caSubscriber?: FeedSubscriber

  agencies: {
    [key: string]: {
      name: string
      timeSeries: MongoTimeSeries
      subscribers: FeedSubscriber[]
    }
  } = {
      [initialCDCSummary.reporterId]: {
        name: initialCDCSummary.reporterId,
        timeSeries: this.cdcTimeSeries,
        subscribers: []
      },
      [initialCASummary.reporterId]: {
        name: initialCASummary.reporterId,
        timeSeries: this.caTimeSeries,
        subscribers: []
      },
      [initialAZSummary.reporterId]: {
        name: initialAZSummary.reporterId,
        timeSeries: this.azTimeSeries,
        subscribers: []
      }
    }

  constructor () {
    this.collectionsUsed = [
      this.caTimeSeries.collectionName,
      this.azTimeSeries.collectionName,
      this.cdcTimeSeries.collectionName
    ]
  }

  getRoutes (): [string, Router] {
    return [this.name, agenciesRouter]
  }

  async start (state: AppState): Promise<void> {
    const storage = state.feedStorage
    this.caSubscriber = new FeedSubscriber(initialCASummary, storage, this.cdcTimeSeries)
    this.azSubscriber = new FeedSubscriber(initialAZSummary, storage, this.cdcTimeSeries)

    for (const agencyName in this.agencies) {
      const agency = this.agencies[agencyName]
      await agency.timeSeries.initialize(state.db)

      // Setup subscribers for the CDC
      if (agencyName === initialCDCSummary.reporterId) {
        agency.subscribers = [this.caSubscriber, this.azSubscriber]
      }
    }
  }

  async stop (): Promise<void> {
  }

  async initializeStores (state: AppState): Promise<void> {
    const storage = state.feedStorage
    await insertFakeCases(this.azTimeSeries, 1, 5)
    await publishFeed(storage, this.azTimeSeries, { excludePII: true })
    // this.azSubscriber?.startAutomatic()
  }

  async clearStores (): Promise<void> {
    for (const agencyName in this.agencies) {
      const agencyTimeSeries = this.agencies[agencyName].timeSeries
      await agencyTimeSeries.reset()
    }
  }
}
