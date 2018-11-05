require('chai').should()
const { matches } = require('src/z')

describe('types', () => {
  it('should match exaclty string', () => {
    const result = matches('string')(
      (x = 'stringo') => false,
      (x = 'string') => true,
      (x = 'stringi') => false
    )

    result.should.equal(true)
  })

  it('should match string type', () => {
    const result = matches('string')(
      (x = String) => true
    )

    result.should.equal(true)
  })

  it('should match bool type', () => {
    const result = matches(true)(
      (x = Boolean) => true
    )

    result.should.equal(true)
  })

  it('should match number type', () => {
    const result = matches(1)(
      (x = Boolean) => false,
      (x = Number) => true,
      (x = Number) => false
    )

    result.should.equal(true)
  })

  it('should match object type', () => {
    const result = matches({ a: 1 })(
      (x = Object) => true,
      (x = Object) => false
    )

    result.should.equal(true)
  })

  it('should match instance', () => {
    const result = matches(new Date())(
      (x = Date) => true
    )

    result.should.equal(true)
  })

  it('should match single item array', () => {
    const result = matches([1])(
      (x = [1]) => x
    )

    result.should.deep.equal([1])
  })

  it('should match array', () => {
    const result = matches([1])(
      (x = Array) => x
    )

    result.should.deep.equal([1])
  })

  it('should match null', () => {
    const result = matches(null)(
      (x = undefined) => false,
      (x = null) => true,
      (x = undefined) => false
    )

    result.should.equal(true)
  })

  it('should match undefined', () => {
    const result = matches(undefined)(
      (x = null) => false,
      (x = undefined) => true,
      (x = null) => false
    )

    result.should.equal(true)
  })

  it('should match object', () => {
    const result = matches({ x: 3 })(
      (x = String) => `${x} is a String`,
      (x = Object) => 'Object'
    )

    result.should.equal('Object')
  })
})
