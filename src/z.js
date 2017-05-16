const getMatchDetails = require('./getMatchDetails')
const match = require('./match')
const matchArray = require('./matchArray')

const resolveMatchFunctions = (subjectToMatch, functions) => {
  for (let i = 0; i < functions.length; i++) {
    const currentMatch = getMatchDetails(functions[i])

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
      if (multipleItemResolve.hasValue && Array.isArray(multipleItemResolve.value)) {
        return currentMatch.func.apply(null, multipleItemResolve.value)
      }

      if (multipleItemResolve.hasValue) {
        return currentMatch.func(multipleItemResolve.value)
      }
    }
  }
}

module.exports = (subjectToMatch) => function () {
  const functions = Object.keys(arguments).map((key) => arguments[key])

  return resolveMatchFunctions(subjectToMatch, functions)
}
