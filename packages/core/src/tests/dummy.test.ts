import { test, expect } from '@jest/globals'
import { hello } from '../dummy'

test('dummy', () => {
  expect(hello()).toBe("hello")
})