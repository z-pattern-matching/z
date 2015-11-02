# z
Native pattern matching for Javascript. 


### Usage
- Install via NPM: `npm install z`
- Require z library in your code
- z will implement `$match` function on Arrays, Strings and Numbers for pattern matching. Example on ES6:

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

you can use traditional javascript as well.. just isn't pretty as ES6, but works like a charm!

```javascript
var myReverse = function(list) {
  return list.$match(
    function()           { return [] },
    function(head, tail) { return myReverse(tail).concat(head) }
  )
}
```

### Literal Pattern Values Check

You can make patterns checking values. Example, let's create our map function `myMap` , we'll create 2 pattern matching head:tail (x:xs) , the only difference it that first one will check if tail is empty ```(x:xs = [])```. Check it out:

```javascript
var myMap = (list, f) => {
  return list.$match(
    (x, xs = []) => [],
    (x, xs)      => [f(x)].concat(xs.map(f))
  )
}

myMap([1, 2, 3, 4, 5], number => number * 2) //[2, 4, 6 , 8, 10]
```


Nice, you can also check for other values besides empty lists, such as numbers, strings, null, undefined, etc.. Check this other example

```javascript  
var factorial = number => {
  return number.$match(
    (x = 0) => 1,
    (x)     => x * factorial (x - 1)
  )
}

factorial(6) //720
```

**IMPORTANT:** This value check is only possible due [ES6's Default Parameter Values](http://tc39wiki.calculist.org/es6/default-parameter-values/) which is only avaiable in ES6 (obviously). Currently you need to put the flag `--harmony_default_parameters` in your Node.js app to make it work. Don't be afraid, at some next Node.js version it'll come by default.


### Can't use ES6 Default Parameter?

Just place the value check in your expression:

```javascript
var factorial = number => {
  return number.$match(
    (x) => (x == 0) ? 1 : x * factorial (x - 1)
  )
}
```
### Can't use ES6 at all?

Just for the habit, the same code in traditional Javascript:

```javascript
var factorial = function(number) {
  return number.$match(
    function(x){ return (x == 0) ? 1 : x * factorial (x - 1) }
  )
}
```
