const functionReflector = require('js-function-reflector')

module.exports = function (matchFunction) {
  const reflectedFunction = functionReflector.call(this, matchFunction)

  return {
    args: reflectedFunction.args,
    func: matchFunction
  }
}
