var PATTERN_WITHOUT_VALUE = '1T$ R34LLY N0 V4LU3' //why? cuz user may match null, undefined, empty list, etc..

//get parameters from match functions
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
    result = [];
  return result;
}

//normalize parameters when function has default values (ES6)
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

//create array from string for matching
String.prototype.matches = function() {
  return this.split('').matches.apply(this, arguments)
}

//create simple array from a number for matching
Number.prototype.matches = function() {
  var arrayOfNumber = [].concat(this.valueOf())
  return arrayOfNumber.matches.apply(arrayOfNumber, arguments)
}

//the great matching function!
Array.prototype.matches = function () {
  var list = this;
  //cycle through matches
  for (var i = 0; i < arguments.length && arguments[i]; i++) {
    var currentPattern = getParametersWithDefaultValues(arguments[i])
    //empty array
    if (currentPattern.arguments.length == 0 && list.length === 0) {
      return currentPattern.function()
    }
    //single item array
    if (currentPattern.arguments.length == 1 && list.length === 1){
      if(currentPattern.arguments[0].value == PATTERN_WITHOUT_VALUE || list[0] == currentPattern.arguments[0].value)
        return currentPattern.function(list[0])
    }
    //multiple items array
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

    //otherwise
    if(currentPattern.function.name == 'otherwise'){
      return currentPattern.function(list)
    }
  }

  throw new Error("Match error: can't match anything for: " + this);
};

//helper methods
Array.prototype.head = function () {
  return this.matches(
    function(x, _){ return x; }
  )
};

Array.prototype.tail = function () {
  return this.matches(
    function(_, xs){ return xs; }
  )
};

Array.prototype.last = function () {
  return this.matches(
    function(x, xs){ return !xs.length ? x : xs.last(); }
  )
};

Array.prototype.init = function () {
  return this.matches(
    function(_){ return []; },
    function(x, xs){ return [x].concat(xs.init()); }
  )
};

module.exports = Array;