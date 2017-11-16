require('chai').should()
const { matches } = require('src/z')

describe('old tests', function () {
  it('should map an array', function () {
    var $map = (numbers, f) => {
      return matches(numbers)(
        (_, xs = []) => [],
        (x, xs) => [f(x)].concat(xs.map(f))
      )
    }

    $map([1, 2, 3, 4, 5], number => number * 2).should.eql([2, 4, 6, 8, 10])
  })

  it('should use 3 positions of pattern matching', function () {
    var compress = numbers =>
      matches(numbers)(
        (x, y, xs) => x === y ? compress([x].concat(xs)) : [x].concat(compress([y].concat(xs))),
        (x, xs) => x // stopping condition
      )

    compress([1, 1, 2, 3, 3, 3]).should.eql([1, 2, 3])
  })

  it('should map a constant', function () {
    matches('h')(
      (x = 'h') => true,
      (x) => false
    ).should.equal(true)
  })

  it('should map a constant 2', function () {
    matches('a')(
      (x = 'h') => true,
      (x) => false
    ).should.equal(false)
  })

  it('should map a constant 3', function () {
    var factorial = function (number) {
      return matches(number)(
        function (x) {
          return (x === 0) ? 1 : x * factorial(x - 1)
        }
      )
    }
  })

  it('should reverse a list', function () {
    const myReverse = list =>
      matches(list)(
        (head, tail = []) => [head],
        (head, tail) => myReverse(tail).concat(head)
      )

    myReverse([1, 2, 3, 4, 5]).should.eql([5, 4, 3, 2, 1])
  })

  it('should reverse a list with function', function () {
    const myReverse = list =>
      matches(list)(
        function (head, tail = []) { return [head] },
        function (head, tail) { return myReverse(tail).concat(head) }
      )

    myReverse([1, 2, 3, 4, 5]).should.eql([5, 4, 3, 2, 1])
  })

  it('should match array of arrays', function () {
    var matched = false

    matches([1, 2, [3]])(
      (x = Array) => {
        (matched = true)
      },
      (x) => {
        console.log('here', x)
      }
    )

    matched.should.eql(true)
  })

  it('should match a number', function () {
    matches(1)(
      (x) => true
    ).should.equal(true)
  })

  it('should match a string', function () {
    matches('test')(
      (x = 'testa') => false,
      (x = 'test') => true,
      (x = 'testo') => false,
      function otherwise () {
        return false
      }
    ).should.equal(true)
  })
})
