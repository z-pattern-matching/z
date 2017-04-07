var expect = require('chai').expect
require('chai').should()
require('./../src/z')

describe('tests with ES5', function () {
  it('should reach tail', function () {
    var reachedTail = false;
    (['a', 'b', 'c', 'd', 'e']).matches(
      function (_) { reachedTail = false },
      function (_, __) { reachedTail = true }
    )

    reachedTail.should.equal(true)
  })

  it("should throw error when don't match anything", function () {
    var list = ['a', 'b', 'c', 'd', 'e']
    expect(function () {
      list.matches(
        function () { }
      )
    }).to.throw("Match error: can't match anything for: " + list)
  })

  it("should reach otherwise function when don't match anything", function () {
    var reachedOtherwise = false;

    (['a', 'b', 'c', 'd', 'e']).matches(
      function (_) { reachedOtherwise = false },
      function otherwise () { reachedOtherwise = true }
    )

    reachedOtherwise.should.equal(true)
  })
})
