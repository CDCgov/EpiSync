import { describe, test, beforeAll, afterAll } from '@jest/globals'
import { spec } from 'pactum'
import { app } from '../../server/app'

const caAgency = 'azphs.gov'
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
  })

  test('add random case test', async () => {
    await spec()
      .post(`${baseUrl}/agencies/${caAgency}/random`)
      .expectStatus(200)
      .stores('returnedId', 'eventId')

    await spec()
      .get(`${baseUrl}/agencies/${caAgency}/$S{returnedId}`)
      .expectStatus(200)

    await spec()
      .get(`${baseUrl}/agencies/${caAgency}/xxx`)
      .expectStatus(404)
  })

  test('publish a random case test', async () => {
    await spec()
      .get(`${baseUrl}/agencies/${caAgency}`)
      .expectStatus(200)
      .expectJsonLength(1)

    await spec()
      .post(`${baseUrl}/agencies/${caAgency}/publish`)
      .expectStatus(200)

    await spec()
      .get(`${baseUrl}/feeds/content?file=${caAgency}/cases/summary.yaml`)
      .expectStatus(200)
      .expectBodyContains('eventCount: 1')
      .expectBodyContains('topicId: cases')
      .expectBodyContains(`reporterId: ${caAgency}`)
  })

  test('check that all the files have been published', async () => {
    await spec()
      .get(`${baseUrl}/feeds/content?file=${caAgency}/cases/summary.yaml`)
      .expectStatus(200)
      .expectBodyContains('eventCount: 1')
      .expectBodyContains('topicId: cases')
      .expectBodyContains(`reporterId: ${caAgency}`)

    await spec()
      .get(`${baseUrl}/feeds/files?prefix=${caAgency}/cases/`)
      .expectStatus(200)
      .expectJsonLength(5)
  })
})
