const functionReflector = require('js-function-reflector')

module.exports = (matchFunction) => {
  const reflectedFunction = functionReflector(matchFunction)

  return {
    args: reflectedFunction.args,
    func: matchFunction
  }
}
