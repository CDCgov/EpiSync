import { groupBy } from '../groupBy'
import { test, expect } from '@jest/globals'

interface X {
  value: number
}

test('Group by exercise for number', () => {
  const array: X[] = [{ value: 1 }, { value: 2 }, { value: 2 }, { value: 3 }]
  const groupByMap = groupBy(array, x => x.value.toString())
  expect(groupByMap.get('1')).toEqual([{ value: 1 }])
  expect(groupByMap.get('2')).toEqual([{ value: 2 }, { value: 2 }])
})
