# ![z](https://raw.githubusercontent.com/leonardiwagner/z/master/z-logo.png) [![Build Status](https://travis-ci.org/leonardiwagner/z.svg?branch=master)](https://travis-ci.org/leonardiwagner/z)
Native pattern matching for Javascript. 


### Usage
- install via npm: `npm install z`
- require **z** library in your code
- **z** will implement `$match` function on Arrays, Strings and Numbers for pattern matching, example:

```javascript
require('z')

var myReverse = (list) => {
  return list.$match(
    ()           => [],                          //match empty list (to check list ending)
    (head, tail) => myReverse(tail).concat(head) //match list head/tail to create reversed list recusively
  )
}

myReverse([1, 2, 3, 4, 5]) //[5, 4, 3, 2, 1])
```

The example above is using Javascript ECMAScript 6 (ES6), but you can use **z** with traditional Javascript as well, just isn't that pretty:

```javascript
var myReverse = function(list) {
  return list.$match(
    function()           { return [] },
    function(head, tail) { return myReverse(tail).concat(head) }
  )
}
```

As you can see, the pattern matching "trick" in **z** is just functions where patterns are described by parameters. Amazing, simple and powerful, eh? 

### Available Patterns

- `() =>` match empty (array, string or number)
- `(x) =>` match array with only one element.
- `(x, xs)` => match array with more than one element. First parameter is the first element (head), second is others (tail)
- `(x, y, xs)` => match array with more than two elements. First parameter is the first element (head), second parameter is the second element, third are others (tail). You can use extend this patterns for more elements, eg.: - `(x, y, z, xs)`, `(a, b, c, d, e, f, g, tail)`, etc...

You can give any name for parameters, such as `head, tail` instead `x,xs` . If the matching has more than one parameter, the last parameter will be always the end of the array (tail).

### Patterns with value comparsion (only on ES6 with default parameters)

- `(x = 'some value')` match if the element has the specified value. The value can be anything, such as array, number, string, null, undefined, etc...
- `(x, xs = [])` same match above with tail. It can match any value as well.

With value comparsion we can make powerful patterns, eg.:

```javascript  
var factorial = number => {
  return number.$match(
    (x = 0) => 1,
    (x)     => x * factorial (x - 1)
  )
}

factorial(6) //720
```

These patters are only supported due ES6 default parameters. Currently you need to give `--harmony_default_parameters` to make Node.js enable this feature. Don't be afraid, Node.js will enable this features by default in the next versions.

### Won't use ES6 with default parameters?

It's OK, you only need to put value comparsion inside your matches, eg.:

```javascript
var factorial = number => {
  return number.$match(
    (x) => (x == 0) ? 1 : x * factorial (x - 1)
  )
}
```

### Won't use ES6 at all?

We too love the ol' JavaScript, just for the habit the same function written in traditional Javascript:

```javascript
var factorial = function(number) {
  return number.$match(
    function(x){ return (x == 0) ? 1 : x * factorial (x - 1) }
  )
}
```

### This is AMAZING, why nobody did this before on JavaScript?

[He did](https://github.com/natefaubion), years ago! But [his first and greater Javascript pattern match library](https://github.com/natefaubion/matches.js) matches with strings, and this is ugly, sorry. Maybe he though this is ugly too and [he did a new pattern matching library](https://github.com/natefaubion/sparkler) without strings.. buuut need to use some macro stuff.. and well, this isn't pretty!

Why *z* was created so? Because *IT'S BEAUTIFUL*, did you see? no need to install anything but the actual *z* library, the matches are real native javascript, the patterns are written naturally. Of course it isn't powerful as the mentioned libraries, that matches a lot of other patterns due JavaScript limitations, but it answer the most used patterns for the major problem solving, check some examples:

### Quick Examples
- get all elements but last:
```javascript
var init = list => {
  return list.$match(
    (x)     => [],
    (x, xs) => [x].concat(xs.init())
  )
}
init([1, 2, 3, 4, 5]) //[1, 2, 3, 4]
```

- remove repeated elements from a array:
```javascript
var compress = list => {
  return list.$match(
    (x) => [x],
    (x, y, xs) => (x == y) ? compress([x].concat(xs)) : [x].concat(compress([y].concat(xs)))
  )
}
compress([1, 2, 2, 3, 4, 4, 4, 5]) //[1, 2, 3, 4, 5]
```

- map implementation
```javascript
var myMap = (list, f) => {
  return list.$match(
    (x, xs = []) => [],
    (x, xs)      => [f(x)].concat(xs.map(f))
  )
}

myMap([1, 2, 3, 4, 5], number => number * 2) //[2, 4, 6 , 8, 10]
```

### The project is new and growing!

I expect some help for new ideas, bug report, meet new friends and accept some pull requests. Don't be afraid, I'm not expert on functional programming so I really need help, so feel free to open and issue, PRs and contact me.
