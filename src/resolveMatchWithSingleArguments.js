module.exports = (match, subjectToMatch) => {
  const hasMatchValue = match.args[0].length >= 2
  if(!hasMatchValue){
    if(Array.isArray(subjectToMatch)){
      return match.func(subjectToMatch[0])
    }

    return match.func(subjectToMatch)
  }

  const matchValue = match.args[0][1]
  if(Array.isArray(subjectToMatch)){
    const head = subjectToMatch[0]
    if(head === matchValue){
      return head
    }
  }

  //if is instance check, check instance
  if(typeof matchValue === "function" && subjectToMatch instanceof matchValue){
    return match.func(subjectToMatch)
  }

  //if is a type check, check type
  if(matchValue === Boolean && typeof subjectToMatch === 'boolean') return match.func(subjectToMatch)
  //TODO check these!
  //if(matchValue === Null && typeof subjectToMatch === 'string') return match.func(subjectToMatch)
  //if(matchValue === Undefined && typeof subjectToMatch === 'string') return match.func(subjectToMatch)
  if(matchValue === Number && typeof subjectToMatch === 'number') return match.func(subjectToMatch)
  if(matchValue === String && typeof subjectToMatch === 'string') return match.func(subjectToMatch)
  //TODO check it!
  //if(matchValue === Symbol && typeof subjectToMatch === 'string') return match.func(subjectToMatch)
  if(matchValue === Object && typeof subjectToMatch === 'object') return match.func(subjectToMatch)


  //if is value check, check value
  if(subjectToMatch === matchValue){
    return match.func(subjectToMatch)
  }

  return undefined
}
