const functionReflector = require('js-function-reflector')

module.exports = func => {
  const reflectedFunction = functionReflector(func)

  return {
    args: reflectedFunction.args,
    func,
  }
}
