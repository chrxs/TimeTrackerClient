export default function transformKeysRecursive (fn, obj) {
  const recurse = obj => transformKeysRecursive(fn, obj)

  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(recurse)
  }

  return Object.keys(obj).reduce((acc, key) => {
    acc[fn(key)] = recurse(obj[key])
    return acc
  }, {})
}
