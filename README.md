# ![z](https://raw.githubusercontent.com/leonardiwagner/z/master/z-logo.png) Native pattern matching for Javascript.

[![Build Status](https://travis-ci.org/z-pattern-matching/z.svg?branch=master)](https://travis-ci.org/z-pattern-matching/z)
[![Coverage Status](https://coveralls.io/repos/github/z-pattern-matching/z/badge.svg?branch=master)](https://coveralls.io/github/z-pattern-matching/z?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/z-pattern-matching/z.svg)](https://gemnasium.com/github.com/z-pattern-matching/z)
[![NPM version](https://img.shields.io/npm/v/z.svg)](https://www.npmjs.com/package/z)

### Usage
- Install via npm: `npm install z`
- Require z in your code and use the matches function: `const { matches } = require('z')`

### Avaiable Patterns

- Matches by value: `(x = 1) =>, (x = null) =>, (x = 'true') =>`
- Matches by object or array: `(x = {a: 1}) =>, (x = [1, 2]) =>`
- Matches by type: `(x = String) =>, (x = Boolean) =>`
- Matches by instance: `(x = Date) =>, (x = Person) =>`
- Matches by splitting array into elements and tail `(head, tail) =>` , `(a, b, c, tail) =>`, etc…


### Examples
- **Example:** Matches by Object property
```javascript
const { matches } = require('z')

const person = { name: 'Maria' }
matches(person)(
  (x = { name: 'John' }) => console.log('John you are not welcome!'),
  (x)                    => console.log(`Hey ${x.name}, you are welcome!`)
)

//output: `Hey Maria, you are welcome!`
```

- **Example:** Matches by type or instances
```javascript
const { matches } = require('z')

const result = matches(1)(
  (x = 2)      => 'number 2 is the best!!!',
  (x = Number) => `number ${x} is not that good`,
  (x = Date)   => 'blaa.. dates are awful!'
)

console.log(result) // output: number 1 is not that good
```

- **Example:** matches Array content

> To match array content you need create multiple arguments for the match function, such as (a, b, c, tail) => {} , then each variable match each item from array. Note: last variable contains all remaining array items, formally named tail. Examples:
```javascript
const { matches } = require('z')

matches([1, 2, 3, 4, 5])(
  (a, b, c, tail) => 'a = 1, b = 2, c = 3, tail = [4, 5]'  
)

matches([1, 2])(
  (a, tail) => 'a = 1, b = [2]'  
)

matches([1])(
  (a, b,  tail)       => 'Will not match here',
  (a = 2, tail = [])  => 'Will not match here',
  (a = 1, tail = [])  => 'Will match here, tail = []'
)
```

- **Example:** Powerful recursive code which will remove sequential repeated items from Array.

> Can be mind blowing if it’s the first time you meet pattern matching, but you are gonna understand it!
```javascript
const { matches } = require('z')

const compress = (numbers) => {
  return matches(numbers)(
    (x, y, xs) => x === y
      ? compress([x].concat(xs))
      : [x].concat(compress([y].concat(xs))),
    (x, xs) => x // stopping condition
  )
}

compress([1, 1, 2, 3, 4, 4, 4]) //output: [1, 2, 3]
```

### License

[Apache 2.0][apache-license]

[apache-license]:./LICENSE
