require('chai').should()
require('./../src/z')

describe('tests with ES6', function () {
  it('should match head of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).head().should.equal('a')
  })

  it('should match tail of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).tail().should.eql(['b', 'c', 'd', 'e'])
  })

  it('should match last of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).last().should.equal('e')
  })

  it('should match init of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).init().should.eql(['a', 'b', 'c', 'd'])
  })

  it('should map an array', function () {
    var $map = (numbers, f) => {
      return numbers.matches(
        (_, xs = []) => [],
        (x, xs) => [f(x)].concat(xs.map(f))
      )
    }

    $map([1, 2, 3, 4, 5], number => number * 2).should.eql([2, 4, 6, 8, 10])
  })

  it('should use 3 positions of pattern matching', function () {
    var compress = (numbers) => {
      return numbers.matches(
        (x) => [x],
        (x, y, xs) => (x === y) ? compress([x].concat(xs)) : [x].concat(compress([y].concat(xs)))
      )
    }

    compress([1, 1, 2, 3, 3, 3]).should.eql([1, 2, 3])
  })

  it('should map a constant', function () {
    'h'.matches(
      (x = 'h') => true,
      (x) => false
    ).should.equal(true)
  })

  it('should map a constant 2', function () {
    'a'.matches(
      (x = 'h') => true,
      (x) => false
    ).should.equal(false)
  })

  it('should map a constant 3', function () {
    var factorial = function (number) {
      return number.matches(
        function (x) { return (x === 0) ? 1 : x * factorial(x - 1) }
      )
    }
  })

  it('should reverse a list', function () {
    var myReverse = (list) => {
      return list.matches(
        () => [],                          // match list ending
        (head, tail) => myReverse(tail).concat(head) // creates a reversed list recursively
      )
    }

    myReverse([1, 2, 3, 4, 5]).should.eql([5, 4, 3, 2, 1])
  })

  it('should reverse a list2', function () {
    var myReverse = function (list) {
      return list.matches(
        function () { return [] },
        function (head, tail) { return myReverse(tail).concat(head) }
      )
    }

    myReverse([1, 2, 3, 4, 5]).should.eql([5, 4, 3, 2, 1])
  })

  it.skip('should match array of arrays', function(){
    var matched = false;

    [1, 2, [3]].matches(
        (x = Array) => {matched = true},
        (x) => {console.log("here", x)}
    );

    matched.should.eql(true);

  });

  it('should match a string', function () {
    'test'.matches(
      (x = 'testa') => false,
      (x = 'test') => true,
      (x = 'testo') => false,
      function otherwise(){ return false }
    ).should.equal(true)
  })
})
