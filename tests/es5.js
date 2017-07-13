var expect = require('chai').expect
require('chai').should()
var matches = require('./../src/z')

describe('tests with ES5', function () {
  it('should reach tail', function () {
    var reachedTail = false;
    matches(['a', 'b', 'c', 'd', 'e'])(
      function (_) { reachedTail = false },
      function (_, __) { reachedTail = true }
    )

    reachedTail.should.equal(true)
  })

  it("should throw error when don't match anything", function () {
    var list = ['a', 'b', 'c', 'd', 'e']
    expect(function () {
      matches(list)(
        function () { }
      )
    }).to.throw("Match error: can't match anything for: " + list)
  })

  it("should reach otherwise function when don't match anything", function () {
    var reachedOtherwise = false;

    matches(['a', 'b', 'c', 'd', 'e'])(
      function (_) { reachedOtherwise = false },
      function otherwise () { reachedOtherwise = true }
    )

    reachedOtherwise.should.equal(true)
  })

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

  it('should use 3 positions of pattern matching', function () {
    var compress = function(numbers)  {
      return numbers.matches(
          function(x){ return [x] },
          function(x, y, xs){ return (x === y) ? compress([x].concat(xs)) : [x].concat(compress([y].concat(xs))) }
      )
    }

    compress([1, 1, 2, 3, 3, 3]).should.eql([1, 2, 3])
  })



  it('should map a constant 3', function () {
    var factorial = function (number) {
      return number.matches(
          function (x) { return (x === 0) ? 1 : x * factorial(x - 1) }
      )
    }
  })

  it('should reverse a list', function () {
    var myReverse = function(list) {
      return matches(list)(
          function() { return [] },                          // match list ending
          function(head, tail) { return  myReverse(tail).concat(head) } // creates a reversed list recursively
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



  it('should match a number', function () {
    (1).matches(
        function(x) { return true }
    ).should.equal(true)
  })


})
