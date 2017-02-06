# ![z](https://raw.githubusercontent.com/leonardiwagner/z/master/z-logo.png) Native pattern matching for Javascript.

[![Build Status](https://travis-ci.org/z-pattern-matching/z.svg?branch=master)](https://travis-ci.org/leonardiwagner/z)
[![Coverage Status](https://coveralls.io/repos/github/z-pattern-matching/z/badge.svg?branch=master)](https://coveralls.io/github/z-pattern-matching/z?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/z-pattern-matching/z.svg)](https://gemnasium.com/github.com/z-pattern-matching/z)
[![NPM version](https://img.shields.io/npm/v/z.svg)](https://www.npmjs.com/package/z)

### Usage
- install via npm: `npm install z`
- require **z** library in your code
- **z** implements `matches` function in Arrays, Strings and Numbers for pattern matching, example:

```javascript
require('z')

var myReverse = list => {
  return list.matches (
    ()           => [],                          //match empty list (to check list ending)
    (head, tail) => myReverse(tail).concat(head) //match list head/tail to create reversed list recusively
  )
}

myReverse([1, 2, 3, 4, 5]) //[5, 4, 3, 2, 1])
```

The example above is using Javascript ECMAScript 6 (ES6), but you can use **z** with traditional JavaScript as well, just isn't that pretty:

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

### Patterns with value comparison
NOTE: This is only available on ES6 with default parameters.

- `(x = 'some value')` matches if the element has the specified value. The value can be anything, such as array, number, string, null, undefined, etc...
- `(x, xs = [])` same match above but with tail. It can match any value as well.

Value comparison in pattern matching is very powerful and makes the code cleaner, eg.:

```javascript  
var factorial = number => {
  return number.matches (
    (x = 0) => 1,
    (x)     => x * factorial (x - 1)
  )
}

factorial(6) //720
```

Currently you need to put the flag `--harmony_default_parameters` in your Node.js application to enable ES6 default parameters. Don't be afraid, this will be enabled by default at some new Node.js version.

### Not ready to use ES6 default parameters yet?

It's OK, just put the value comparison inside your matches, eg.:

```javascript
var factorial = number => {
  return number.matches (
    (x) => (x == 0) ? 1 : x * factorial (x - 1)
  )
}
```

### Not ready to use ES6 at all?

We all love the old JavaScript, the same pattern matching written in traditional JavaScript using **z**:

```javascript
var factorial = function(number) {
  return number.matches (
    function(x){ return (x == 0) ? 1 : x * factorial (x - 1) }
  )
}
```

### This is amazing! Why nobody did this before on JavaScript?

[He did](https://github.com/natefaubion), years ago! But [his first and greater Javascript pattern match library](https://github.com/natefaubion/matches.js) create matches with strings, and this is ugly! (sorry). Maybe he thought this is ugly too and [he did a new pattern matching library](https://github.com/natefaubion/sparkler) without strings, but need to install some macro stuff.. and well, I don't think that's nice either.

Why **z** was created? Because *IT'S BEAUTIFUL*: No need to install nothing but the actual **z** library, the matches are real native javascript code, the patterns are written naturally, pure :heart:. Of course it hasn't all the features on these mentioned libraries due JavaScript limitations, but it supports the most used patterns to work with arrays, enhancing recursion and immutability code writing.

### Quick Examples
- Get all elements but last:
```javascript
var init = list => {
  return list.matches (
    (x)     => [],
    (x, xs) => [x].concat(xs.init())
  )
}
init([1, 2, 3, 4, 5]) //[1, 2, 3, 4]
```

- Remove repeated elements from a array:
```javascript
var compress = list => {
  return list.matches (
    (x) => [x],
    (x, y, xs) => (x == y) ? compress([x].concat(xs)) : [x].concat(compress([y].concat(xs)))
  )
}
compress([1, 2, 2, 3, 4, 4, 4, 5]) //[1, 2, 3, 4, 5]
```

- Map implementation
```javascript
var myMap = (list, f) => {
  return list.matches (
    (x, xs) => [f(x)].concat(xs.map(f))
  )
}

myMap([1, 2, 3, 4, 5], number => number * 2) //[2, 4, 6 , 8, 10]
```

- More examples: [JS-99: Ninety-Nine JavaScript Problems](http://leonardiwagner.github.io/js-99/)

### Helper methods
Besides `matches`, **z** also provides 4 new methods in JavaScript Arrays to facilitate working with recursion and immutability
- `head` eg.: `[1, 2, 3, 4].head()` returns `1`
- `last` eg.: `[1, 2, 3, 4].last()` returns `4`
- `init` eg.: `[1, 2, 3, 4].init()` returns `[1, 2, 3]`
- `tail` eg.: `[1, 2, 3, 4].tail()` returns `[2, 3, 4]`

### The project is new and growing!

I expect some help for new ideas, bug report, pull requests, and making new friends :dancers::dancers:

Don't be afraid, I'm not expert on functional programming, so I really need help, feel free to contact me :thumbsup:
