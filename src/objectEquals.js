const deepEqual = require('deep-equal')

function getPropByString (obj, propString) {
  if (!propString) {
    return obj
  }

  let i
  let iLen
  let prop
  let props = propString.split('.')

  for (i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i]

    const candidate = obj[prop]
    if (candidate !== undefined) {
      obj = candidate
    } else {
      break
    }
  }
  return obj[props[i]]
}

module.exports = (a, b) => {
  const objectEquals = (objectA, nestedKeys = []) => {
    if (objectA.constructor === Object) {
      const keys = Object.keys(objectA)

      for (var i in keys) {
        const key = keys[i]
        const nestedClone = nestedKeys.slice(0)
        nestedClone.push(key)

        const valueA = getPropByString(a, nestedClone.join('.'))
        const valueB = getPropByString(b, nestedClone.join('.'))

        if (
          !(valueA instanceof Object) &&
          !(valueB instanceof Object) &&
          valueA !== valueB
        ) {
          return false
        }

        if (
          (valueA instanceof Array) &&
          (valueB instanceof Array) &&
          !deepEqual(valueA, valueB)
        ) {
          return false
        }

        const partialResult = objectEquals(objectA[key], nestedClone)
        if (partialResult === false) {
          return false
        }
      }
    }

    return true
  }

  return objectEquals(a)
}
