//why? cuz user may match null, undefined, empty list, and go one... I hope that no one matches this...
var PATTERN_WITHOUT_VALUE = '1T$ R34LLY N0 V4LU3'

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
    result = [];
  return result;
}

function getParametersWithDefaultValues(f){
  var splitedArguments = getParamNames(f)
  var argumentsByValues = {
    'function': f,
    'arguments': []
  }

  for(var i = 0; i <= splitedArguments.length; i++){
    if(i > 0){
      var prePreviousArgument = splitedArguments[i - 2]
      var previousArgument = splitedArguments[i - 1]
      var currentArgument = splitedArguments[i]
      var nextArgument = splitedArguments[i + 1]

      if(currentArgument == '=')
        argumentsByValues.arguments.push({'argument': previousArgument, 'value': nextArgument.replace(/["']/g,'').replace(/"/g,'')})
      else if(previousArgument != '=' && prePreviousArgument != '=')
        argumentsByValues.arguments.push({'argument': previousArgument, 'value': PATTERN_WITHOUT_VALUE})
    }
  }

  return argumentsByValues
}


String.prototype.$match = function() {
  return this.split('').$match.apply(this, arguments)
}

Number.prototype.$match = function() {
  var arrayOfNumber = [].concat(this.valueOf())
  return arrayOfNumber.$match.apply(arrayOfNumber, arguments)
}

Array.prototype.$match = function () {
  var list = this;
  for (var i = 0; i < arguments.length && arguments[i]; i++) {
    var currentPattern = getParametersWithDefaultValues(arguments[i])

    if (currentPattern.arguments.length == 0 && list.length === 0) {
      return currentPattern.function()
    }
    if (currentPattern.arguments.length == 1 && list.length === 1){
      if(currentPattern.arguments[0].value == PATTERN_WITHOUT_VALUE || list[0] == currentPattern.arguments[0].value)
        return currentPattern.function(list[0])
    }
    if (currentPattern.arguments.length >  1 && (list.length + 1 >= currentPattern.arguments.length)) {
      var patterns = [];
      for (j = 0; j < (currentPattern.arguments.length - 1); j++) {
        patterns.push(list[j])
      }

      var tail = [];
      if (list.length + 1 >= currentPattern.arguments.length - 1) {
        for (j = currentPattern.arguments.length - 1; j <= list.length - 1; j++) {
          tail.push(list[j])
        }
      }

      var lastArgument = currentPattern.arguments[currentPattern.arguments.length - 1]
      if(lastArgument.value == PATTERN_WITHOUT_VALUE || tail == lastArgument.value){
        patterns.push(tail);
        return currentPattern.function.apply(null, patterns)
      }
    }


  }
};

Array.prototype.head = function () {
  return this.$match(
    (x, xs) =>  x
  )
};

Array.prototype.tail = function () {
  return this.$match(
    (x, xs) => xs
  )
};

Array.prototype.last = function () {
  return this.$match(
    (x, xs) => !xs.length ? x : xs.last()
  )
};

Array.prototype.init = function () {
  return this.$match(
    (x)     => [],
    (x, xs) => [x].concat(xs.init())
  )
};


module.exports = Array;