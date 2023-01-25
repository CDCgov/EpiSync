export function upsert<T> (array: T[], value: T, match: (a: T, b: T) => boolean): void {
  const index = array.findIndex(v => match(v, value))
  if (index !== -1) {
    array[index] = value
  } else {
    array.push(value)
  }
}
