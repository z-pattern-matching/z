const getMatchDetails = require('./getMatchDetails')
const match = require('./match')
const matchArray = require('./matchArray')

const resolveMatchFunctions = (subjectToMatch, functions) => {
  for (let i = 0; i < functions.length; i++) {
    const currentMatch = getMatchDetails(functions[i])

    const matchHasSingleArgument = currentMatch.args.length === 1
    if (matchHasSingleArgument) {
      const singleValueResolve = match(currentMatch, subjectToMatch)
      if (singleValueResolve) {
        return currentMatch.func(singleValueResolve)
      }
    }

    const matchHasMultipleArguments = currentMatch.args.length > 1
    if (matchHasMultipleArguments && Array.isArray(subjectToMatch)) {
      const multipleItemResolve = matchArray(currentMatch, subjectToMatch)
      if (Array.isArray(multipleItemResolve)) {
        return currentMatch.func.apply(null, multipleItemResolve)
      }

      if(multipleItemResolve){
        return currentMatch.func(multipleItemResolve)
      }
    }
  }
}

module.exports = (subjectToMatch) => function () {
  const functions = Object.keys(arguments).map((key) => arguments[key])

  return resolveMatchFunctions(subjectToMatch, functions)
}
