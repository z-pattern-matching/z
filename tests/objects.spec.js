require('chai').should()
const { matches } = require('src/z')

describe('destructured object matching', () => {
  it('should match on presence of keys in an object', () => {
    const arg = { x: 1, y: 1 }
    const result = matches(arg)(
      ({ x }) => true,
      ([a, b]) => false, x => 'default'
    )

    result.should.equal(true)
  })

  it('should not match an object with missing keys', () => {
    const arg = { x: 1, y: 1 }
    const result = matches(arg)(
      ({ x, z }) => x + z,
      ([a, b]) => false, x => 'default'
    )

    result.should.equal('default')
  })

  it('should pass object keys through to match function', () => {
    const arg = { x: 1, y: 1 }
    const result = matches(arg)(
      ({ x, y }) => x + y,
      ([a, b]) => false, x => 'default'
    )

    result.should.equal(2)
  })

  it('should match exact object value', () => {
    const result = matches({ name: 'Maria' })(
      (x = { name: 'John' }) => false,
      (x = { name: 'Maria' }) => true,
      (x) => false
    )

    result.should.be.true
  })
})
