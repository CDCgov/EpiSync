import { describe, test, beforeAll, afterAll } from '@jest/globals'
import { spec } from 'pactum'
import { app } from '../../server/app'

const azAgency = 'azphs.gov'
const cdcAgency = 'cdc.gov'
const baseUrl = 'http://localhost:4001/api'

beforeAll(async () => {
  await app.start()
  await app.listen()
})

afterAll(async () => {
  await app.close()
  await app.stop()
})

describe('agency tests', () => {
  beforeAll(async () => {
    await app.clearStores()
    // all counts should be 0
  })

  test('add random case test', async () => {
    await spec()
      .get(`${baseUrl}/agencies/${azAgency}`)
      .expectStatus(200)
      .expectJsonLength(0)

    await spec()
      .post(`${baseUrl}/agencies/${azAgency}/random`)
      .expectStatus(200)
      .stores('returnedId', 'eventId')

    await spec()
      .get(`${baseUrl}/agencies/${azAgency}`)
      .expectStatus(200)
      .expectJsonLength(1)

    await spec()
      .get(`${baseUrl}/agencies/${azAgency}/$S{returnedId}`)
      .expectStatus(200)

    await spec()
      .get(`${baseUrl}/agencies/${azAgency}/xxx`)
      .expectStatus(404)
  })

  test('publish a random case test', async () => {
    await spec()
      .get(`${baseUrl}/agencies/${azAgency}`)
      .expectStatus(200)
      .expectJsonLength(1)

    await spec()
      .post(`${baseUrl}/agencies/${azAgency}/publish`)
      .expectStatus(200)

    await spec()
      .get(`${baseUrl}/feeds/content?file=${azAgency}/cases/summary.yaml`)
      .expectStatus(200)
      .expectBodyContains('eventCount: 1')
      .expectBodyContains('topicId: cases')
      .expectBodyContains(`reporterId: ${azAgency}`)
  })

  test('check that all the files have been published', async () => {
    await spec()
      .get(`${baseUrl}/feeds/content?file=${azAgency}/cases/summary.yaml`)
      .expectStatus(200)
      .expectBodyContains('eventCount: 1')
      .expectBodyContains('topicId: cases')
      .expectBodyContains(`reporterId: ${azAgency}`)

    await spec()
      .get(`${baseUrl}/feeds/files?prefix=${azAgency}/cases/`)
      .expectStatus(200)
      .expectJsonLength(5)
  })

  test('read the previously published feed at the suscriber', async () => {
    await spec()
      .get(`${baseUrl}/agencies/${cdcAgency}`)
      .expectStatus(200)
      .expectJsonLength(0)

    await spec()
      .post(`${baseUrl}/agencies/${cdcAgency}/subscribers/cases.${azAgency}/read`)
      .expectStatus(200)

    await spec()
      .get(`${baseUrl}/agencies/${cdcAgency}`)
      .expectStatus(200)
      .expectJsonLength(1)
  })
})
