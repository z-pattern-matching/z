require('chai').should()
const { matches } = require('src/z')

describe('value comparsion', () => {
  it('should match single item with value comparison', () => {
    const result = matches(1)((x = 2) => false, (x = 1) => true, (x = 3) => false)

    result.should.equal(true)
  })
})
