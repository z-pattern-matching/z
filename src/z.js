const functionReflector = require('js-function-reflector')

const resolveFunctions = (subjectToMatch, functions) => {
  for(let i = 0; i < functions.length; i++){
    const currentMatch = functionReflector(functions[i])

    const isSingleItem = currentMatch.args.length === 1
    if (isSingleItem){
      const hasMatchValue = currentMatch.args[0].length >= 2
      if(!hasMatchValue){
        if(Array.isArray(subjectToMatch)){
          return functions[i](subjectToMatch[0])
        }

        return functions[i](subjectToMatch)
      }

      const matchValue = currentMatch.args[0][1]
      if(Array.isArray(subjectToMatch)){
        const head = subjectToMatch[0]
        if(head === matchValue){
          return head
        }
      }

      if(matchValue === String && typeof subjectToMatch === 'string'){
        return functions[i](subjectToMatch)
      }

      if(subjectToMatch === matchValue){
        return functions[i](subjectToMatch)
      }
    }

    const isMoreThanSingleItem = currentMatch.args.length > 1
    if(isMoreThanSingleItem){

    }

  }
}

module.exports = (subjectToMatch) => function() {
  const functions = Object.keys(arguments).map((key) => arguments[key])

  const result = resolveFunctions(subjectToMatch, functions)

  return result



}
