# ![z](https://raw.githubusercontent.com/leonardiwagner/z/master/z-logo.png) Native pattern matching for Javascript (ES5 Legacy Version).

[![Build Status](https://travis-ci.org/z-pattern-matching/z.svg?branch=master)](https://travis-ci.org/z-pattern-matching/z)
[![Coverage Status](https://coveralls.io/repos/github/z-pattern-matching/z/badge.svg?branch=master)](https://coveralls.io/github/z-pattern-matching/z?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/z-pattern-matching/z.svg)](https://gemnasium.com/github.com/z-pattern-matching/z)
[![NPM version](https://img.shields.io/npm/v/z.svg)](https://www.npmjs.com/package/z)

This is a legacy version of [z](https://github.com/z-pattern-matching/z) to Javascript versions which don't support ES6 / EcmaScript2015 default parameters.
**Important:** If you are able to run on browser versions > 2015 year, or Node.js > 6.0.0, [please use the official version](https://github.com/z-pattern-matching/z)

### Usage
- install via npm: `npm install z`
- require **z** library in your code

```javascript
var matches = require('z')

var myReverse = function(list) {
  return matches(list)(
      function() { return [] },                                     // match list ending
      function(head, tail) { return  myReverse(tail).concat(head) } // creates a reversed list recursively
  )
}

myReverse([1, 2, 3, 4, 5]) //[5, 4, 3, 2, 1])
```

Due legacy version, you can also use as embedded `.matches` function in Array, String and Number prototype.

```javascript
var myReverse = function(list) {
  return list.matches (
    function()           { return [] },
    function(head, tail) { return myReverse(tail).concat(head) }
  )
}
```

The pattern matching "trick" in **z** is: each match is a function, where function parameters describes the pattern. Simple and powerful, eh? 
### Available Patterns

- `() => {}` matches empty (array or string) eg.: `[]`, `''`
- `(x) => {}` matches an array with a single element eg.: `[1]`, `[[1, 2, 3]]` (array with a single array), matches single character eg.: `'x'` or matches a single number eg.:`1`
- `(x, xs) => {}` matches array with more than one element. First parameter is the first element (head), second is others (tail)
- `(x, y, xs) => {}` matches array with more than two elements. First parameter is the first element (head), second parameter is the second element, third are others (tail). You can specify more than 2 items eg.: `(x, y, z, xs)`, `(a, b, c, d, e, f, g, tail)`, etc...
- `function otherwise(){ }` matches everything else.

Rule of thumb: when the match has more than one parameter, the last parameter will be always the end of the array (tail).