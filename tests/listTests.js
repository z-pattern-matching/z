var should = require('chai').should()

var z = require('./../z')('Match');

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
    var $map = (numbers, f) => {
      return numbers.$match(
        (_, xs = []) => [],
        (x, xs)      => [f(x)].concat(xs.map(f))
      )
    };

    $map([1, 2, 3, 4, 5], number => number * 2).should.eql([2, 4, 6 , 8, 10])
  });

  it('should use 3 positions of pattern matching', function(){
    var compress = (numbers) => {
      return numbers.$match(
        (x) => [x],
        (x, y, xs) => (x == y) ? compress([x].concat(xs)) : [x].concat(compress([y].concat(xs)))
      )
    }

    compress([1, 1 , 2, 3, 3, 3]).should.eql([1, 2, 3])
  })

  it('should map a constant', function (){
    'h'.$match(
      (x = 'h') => true,
      (x)       => false
    ).should.equal(true);
  });

  it('should map a constant 2', function (){
    'a'.$match(
      (x = 'h') => true,
      (x)       => false
    ).should.equal(false);
  });

});
