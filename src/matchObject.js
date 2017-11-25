const flatten = require('flat')
const { checkArray, compose, containsAll, isChar } = require('./utils')

// This is just an approach for deriving an actual js object
// from the punned syntax of object destructuring in the
// function argument reflection, that object can then
// be used to check the keys of the subjectToMatch
const buildSpecFromReflectedArgs = str =>
  [...str].reduce((res, curr, i) => {
    switch (true) {
      // add a dummy value when a key without a value is found
      case /(,|})/.test(curr) && isChar(str.charAt(i - 1)):
        return res.concat('":1').concat(curr)

      // add a opening quote to keynames that are missing them
      case isChar(curr) && !isChar(str.charAt(i - 1)):
      // add a closing quote to keynames that are missing them
      /* falls through */
      case curr === ':' && str.charAt(i - 1) !== '"':
        return res.concat('"').concat(curr)

      default:
        return res.concat(curr)
    }
  }, '')

// derive a flattened list of keys|paths from an object
const getFlattenedKeys = compose(Object.keys, flatten)

const getFlattenedKeysFromArgs = compose(
  getFlattenedKeys,
  JSON.parse,
  // add dummy values so an object can be parsed from the args
  buildSpecFromReflectedArgs,
  // join the args back into original string
  xs => xs.join(','),
  // throw an error if passed a non array
  checkArray
)

const objectAndArgsDestructureMatches = (reflectedArgs, subjectToMatch) =>
  containsAll(
    getFlattenedKeysFromArgs(reflectedArgs),
    getFlattenedKeys(subjectToMatch)
  )

module.exports = {
  getFlattenedKeysFromArgs,
  objectAndArgsDestructureMatches
}
