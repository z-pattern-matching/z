const deepEqual = require('deep-equal')
const option = require('./option')
const match = require('./match')

module.exports = (currentMatch, subjectToMatch) => {
  const matchArgs = currentMatch.args.map(
    (x, index) =>
      Array.isArray(x) ? { key: x[0], value: x[1], index } : { key: x, index }
  )

  if (subjectToMatch.length < matchArgs.length) {
    const matchOnSubArg = (arg, toMatch) => 'value' in arg
      ? deepEqual(arg.value, toMatch)
      : true

    const matchAllSubArgs = matchArgs
      .slice(0, matchArgs.length - 1)
      .every((arg, index) => matchOnSubArg(arg, subjectToMatch[index]))

    if (matchAllSubArgs && deepEqual(matchArgs[matchArgs.length - 1].value, [])) {
      return option.Some(subjectToMatch[0])
    }

    return option.None
  }

  const heads = Array.from(
    Array(matchArgs.length - 1),
    (x, y) => subjectToMatch[y]
  )
  const tail = subjectToMatch.slice(matchArgs.length - 1)

  // CAUTION: it gets the tail arg and removes from matchArgs (due splice function)
  const [tailArg] = matchArgs.splice(matchArgs.length - 1, 1)
  if (tailArg.value) {
    const matchObject = { args: [[undefined, tailArg.value]] }
    const matchResult = match(matchObject, tail)
    if (matchResult === option.None) {
      return option.None
    }
  }

  const headsWithArgs = matchArgs.filter(x => x.value)
  for (let i = 0; i < headsWithArgs.length; i++) {
    const matchObject = {
      args: [[headsWithArgs[i].key, headsWithArgs[i].value]]
    }

    const matchResult = match(matchObject, heads[headsWithArgs[i].index])
    if (matchResult === option.None) {
      return option.None
    }
  }

  return option.Some(heads.concat([tail]))
}
