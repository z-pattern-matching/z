require('chai').should()
const z = require('src/z')

describe('types', () => {
  it('should match exaclty string', () => {
    const result = z('string')(
      (x = 'stringo') => false,
      (x = 'string') => true,
      (x = 'stringi') => false
    )

    result.should.equal(true)
  })

  it('should match string type', () => {
    const result = z('string')(
      (x = String) => true
    )

    result.should.equal(true)
  })

  it('should match bool type', () => {
    const result = z(true)(
      (x = Boolean) => true
    )

    result.should.equal(true)
  })

  it('should match number type', () => {
    const result = z(1)(
      (x = Boolean) => false,
      (x = Number) => true,
      (x = Number) => false
    )

    result.should.equal(true)
  })

  it('should match object type', () => {
    const result = z({ a: 1 })(
      (x = Object) => true,
      (x = Object) => false
    )

    result.should.equal(true)
  })

  it('should match instance', () => {
    const result = z(new Date())(
      (x = Date) => true
    )

    result.should.equal(true)
  })

  it('should match single item array', () => {
    const result = z([1])(
      (x = [1]) => x
    )

    result.should.deep.equal([1])
  })

  it('should match array', () => {
    const result = z([1])(
      (x = Array) => x
    )

    result.should.deep.equal([1])
  })

  it('should match null', () => {
    const result = z(null)(
      (x = undefined) => false,
      (x = null) => true,
      (x = undefined) => false
    )

    result.should.equal(true)
  })

  it('should match undefined', () => {
    const result = z(undefined)(
      (x = null) => false,
      (x = undefined) => true,
      (x = null) => false
    )

    result.should.equal(true)
  })
})
