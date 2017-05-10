# ![z](https://raw.githubusercontent.com/leonardiwagner/z/master/z-logo.png) Native pattern matching for Javascript.

[![Build Status](https://travis-ci.org/z-pattern-matching/z.svg?branch=master)](https://travis-ci.org/z-pattern-matching/z)
[![Coverage Status](https://coveralls.io/repos/github/z-pattern-matching/z/badge.svg?branch=master)](https://coveralls.io/github/z-pattern-matching/z?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/z-pattern-matching/z.svg)](https://gemnasium.com/github.com/z-pattern-matching/z)
[![NPM version](https://img.shields.io/npm/v/z.svg)](https://www.npmjs.com/package/z)

### Usage
- install via npm: `npm install z`
- require `z` in your code, and name the match function as you want!
```javascript
const matches = require('z')
```

- you can match by comparing values
```javascript
const person = { name: 'Johna' }
matches(person)(
  (x = { name: 'John' }) => console.log('John you are not welcome!'),
  (x)                    => console.log(`Hey ${x.name}, you are welcome!`)
)
```

- you can match by comparing types or instances
```javascript
matches(1)(
  (x = 2)      => console.log(`number 2 is the best!!!`),
  (x = Number) => console.log(`number ${x} is not that good`),
  (x = Date) => console.log(`blaa.. strings are awful!`)
)
```

- on arrays, you can split head and tail, so you can do awesome recurring functions! , without manipulating arrays or changing state. Yes true functional programming in JavaScript!

```javascript
const reverse = (list) => matches(list)(
  (head, tail = [])    => [head], // stopping condition
  (head, tail)         => reverse(tail).concat(head)
)


reverse([1, 2, 3, 4])) // returns [4, 3, 2, 1]
```

### Available Patterns

- Matches by value: `(x = 1) =>`, `(x = null) =>`, `(x = 'true') =>`
- Matches by `object` and `array`: `(x = {a: 1}) =>`, `(x = [1, 2]) =>`
- Matches by `type`: `(x = String) =>`, `(x = Boolean) =>`
- Matches by `instance`: `(x = Date) =>`, `(x = Person) =>`
- Matches spiting array into head and tail `(head, tail) =>`, it can be multiple heads, eg.: `(x, y, z, xs)`, `(a, b, c, d, e, f, g, tail)`, etc...

### This is amazing! Why nobody did this before on JavaScript?

[He did](https://github.com/natefaubion), years ago! But [his first and greater Javascript pattern match library](https://github.com/natefaubion/matches.js) create matches with strings, and this is ugly! (sorry). Maybe he thought this is ugly too and [he did a new pattern matching library](https://github.com/natefaubion/sparkler) without strings, but need to install some macro stuff.. and well, I don't think that's nice either.

Why **z** was created? Because *IT'S B E A U T I F U L*: No need to install nothing but the actual **z** library, the matches are real native javascript code, the patterns are written naturally, pure :heart:.

### The project is new and growing!

Suggestions, bug reports and pull requests are welcomed!
