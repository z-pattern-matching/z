Array.prototype.$$$ = function (otherList) {
  return this.concat(otherList);
};

Array.prototype.match = function () {
  var list = this;
  console.log(list);

  for (var i = 0; i < list.length; i++) {
    var currentPattern = arguments[i];

    if (currentPattern.length == 0 && list.length === 0) return currentPattern()
    if (currentPattern.length == 1 && list.length === 1) return currentPattern(list[0])
    if (currentPattern.length >  1 && (list.length + 1 >= currentPattern.length)) {
      var patterns = [];
      for (i = 0; i < (currentPattern.length - 1); i++) {
        patterns.push(list[i])
      }

      var tail = [];
      if (list.length + 1 >= currentPattern.length - 1) {
        for (i = currentPattern.length - 1; i <= list.length - 1; i++) {
          tail.push(list[i])
        }
      }

      patterns.push(tail);
      return currentPattern.apply(null, patterns)
    }
  }
};

Array.prototype.head = function () {
  return this.match(
    (x, xs) =>  x
  )
};

Array.prototype.tail = function () {
  return this.match(
    (x, xs) => xs
  )
};

Array.prototype.last = function () {
  return this.match(
    (x, xs) => !xs.length ? x : xs.last()
  )
};

Array.prototype.init = function () {
  return this.match(
    (x) => [],
    (x, xs) => [x].$$$(xs.init())
  )
};

Array.prototype.map = function (f) {
  return this.match(
    (x) => [f(x)],
    (x, xs) => [f(x)].$$$(xs.map(f))
  )
};

module.exports = Array;