export function groupBy<T, K extends keyof any> (list: T[], getKey: (item: T) => K): Map<K, T[]> {
  return list.reduce<Map<K, T[]>>((previous, currentItem) => {
    const group = getKey(currentItem)
    if (!previous.has(group)) {
      previous.set(group, [])
    }
    previous.get(group)?.push(currentItem)
    return previous
  }, new Map<K, T[]>())
}
