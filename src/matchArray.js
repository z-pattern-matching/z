const deepEqual = require('deep-equal')
const option = require('./option')

module.exports = (currentMatch, subjectToMatch) => {
  const matchArgs = currentMatch.args.map((x, index) => Array.isArray(x) ? { key: x[0], value: x[1], index } : { key: x, index })

  if(subjectToMatch.length < matchArgs.length) {
    if(deepEqual(matchArgs[matchArgs.length - 1].value, [])){
      return option.some(subjectToMatch[0])
    }

    return option.none
  }

  const heads = Array.from(Array(matchArgs.length - 1), (x, y) => subjectToMatch[y])
  const tail = subjectToMatch.slice(matchArgs.length - 1)

  // CAUTION: it gets the tail arg and removes from matchArgs (due splice function)
  const [tailArg] = matchArgs.splice(matchArgs.length - 1, 1)
  if(tailArg.value) {
    if(!deepEqual(tailArg.value, tail)){
      return option.none
    }
  }

  const headsWithArgs = matchArgs.filter(x => x.value)
  for(let i = 0; i < headsWithArgs.length; i++){
    if(heads[headsWithArgs[i].index] !== headsWithArgs[i].value) {
      return option.none
    }
  }

  return option.some(heads.concat([tail]))
}
