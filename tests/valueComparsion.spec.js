require('chai').should()
const z = require('src/z')

describe('value comparsion', () => {
  it('should match single item with value comparison', () => {
    const result = z(1)((x = 2) => false, (x = 1) => true, (x = 3) => false)

    result.should.equal(true)
  })
})
