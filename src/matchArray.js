module.exports = (currentMatch, subjectToMatch) => {
  const matchArgs = currentMatch.args.map((x) => Array.isArray(x) ? { key: x[0], value: x[1] } : { key: x })
  if(subjectToMatch.length >= matchArgs.length) {
    const heads = Array.from(Array(matchArgs.length - 1), (x, y) => subjectToMatch[y])
    const tail = subjectToMatch.slice(matchArgs.length - 1)

    return heads.concat([tail])
  }
}
