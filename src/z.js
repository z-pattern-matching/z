const getMatchDetails = require('./getMatchDetails')
const match = require('./match')
const matchArray = require('./matchArray')
const { hasDestructuredObjectArguments } = require('./utils')
const { objectAndArgsDestructureMatches } = require('./matchObject')

const resolveMatchFunctions = (subjectToMatch, functions, scope) => {
  for (let i = 0; i < functions.length; i++) {
    const currentMatch = getMatchDetails.call(scope, functions[i])

    const matchHasSingleArgument = currentMatch.args.length === 1
    if (matchHasSingleArgument) {
      const singleValueResolve = match(currentMatch, subjectToMatch)
      if (singleValueResolve.hasValue) {
        return currentMatch.func(singleValueResolve.value)
      }
    }

    const matchHasMultipleArguments = currentMatch.args.length > 1
    if (matchHasMultipleArguments && Array.isArray(subjectToMatch)) {
      const multipleItemResolve = matchArray(currentMatch, subjectToMatch)
      if (
        multipleItemResolve.hasValue &&
        Array.isArray(multipleItemResolve.value)
      ) {
        return currentMatch.func.apply(null, multipleItemResolve.value)
      }

      if (multipleItemResolve.hasValue) {
        return currentMatch.func(multipleItemResolve.value)
      }
    }

    if (
      hasDestructuredObjectArguments(currentMatch.args) &&
      objectAndArgsDestructureMatches(currentMatch.args, subjectToMatch)
    ) {
      return currentMatch.func(subjectToMatch)
    }
  }
}

const matches = (subjectToMatch) => function (...functions) {
  return resolveMatchFunctions(subjectToMatch, functions, this)
}

module.exports = { matches }
