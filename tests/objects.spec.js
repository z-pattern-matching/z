require('chai').should()
const matches = require('src/z')

describe('destructured object matching', () => {
  const defaultVal = 'default'
  const common = [([a, b]) => false, x => defaultVal]
  const arg = { x: 1, y: 1 }

  it('should match on presence of keys in an object', () => {
    const result = matches(arg)(
      ({ x }) => true,
      ...common
    )

    result.should.equal(true)
  })

  it('should not match an object with missing keys', () => {
    const result = matches(arg)(
      ({ x, z }) => x + z,
      ...common
    )

    result.should.equal(defaultVal)
  })

  it('should pass object keys through to match function', () => {
    const result = matches(arg)(
      ({ x, y }) => x + y,
      ...common
    )

    result.should.equal(2)
  })
})
