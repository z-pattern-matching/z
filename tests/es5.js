var should = require('chai').should()

require('./../z');

describe('tests with ES5', function () {
  it('should pass on tail', function () {
    var wasOnTail = false;
    (['a', 'b', 'c', 'd', 'e']).$match(
      function(x) { console.log(1); wasOnTail = false},
      function(x, xs) { console.log(2); wasOnTail = true }
    )

    wasOnTail.should.equal(true)



  });


});
