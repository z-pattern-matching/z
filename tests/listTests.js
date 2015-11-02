var should = require('chai').should()

var z = require('./../z');

describe('lists tests', function () {
  it('should match head of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).head().should.equal('a')
  });

  it('should match tail of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).tail().should.eql(['b', 'c', 'd', 'e'])
  });

  it('should match last of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).last().should.equal('e')
  });

  it('should match init of an array', function () {
    (['a', 'b', 'c', 'd', 'e']).init().should.eql(['a', 'b', 'c', 'd'])
  });

  it('should map an array', function () {
    ([1, 2, 3, 4, 5]).map(number => number * 2).should.eql([2, 4, 6 , 8, 10])
  });

  it('should use 3 positions of pattern matching', function(){
    var numbers = Array(1,2, 2, 3, 3)

    var compress = (numbers) => {
      return numbers.match(
        (x) => [x],
        (x, y, xs) => (x == y) ? compress([x].$$$(xs)) : [x].$$$(compress([y].$$$(xs)))
      )
    }

    compress(numbers).should.eql([1, 2, 3])
  })

});
