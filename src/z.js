const getMatchDetails = require('./getMatchDetails')
const resolveMatchWithSingleArguments = require('./resolveMatchWithSingleArguments')

const resolveMatchFunctions = (subjectToMatch, functions) => {
  for (let i = 0; i < functions.length; i++) {
    const currentMatch = getMatchDetails(functions[i])

    const matchHasSingleArgument = currentMatch.args.length === 1
    // const matchHasMultipleArguments = currentMatch.args.length > 1

    if (matchHasSingleArgument) {
      const singleValueResolve = resolveMatchWithSingleArguments(currentMatch, subjectToMatch)
      if (singleValueResolve) {
        return singleValueResolve
      }
    }

    /*
    if(isMoreThanSingleItem){

    } */
  }
}

module.exports = (subjectToMatch) => function () {
  const functions = Object.keys(arguments).map((key) => arguments[key])

  return resolveMatchFunctions(subjectToMatch, functions)
}
