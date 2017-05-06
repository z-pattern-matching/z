require('chai').should()
const z = require('src/z')

describe('z', () => {
  it('should match single item', () => {
    const result = z(1)(
      (x) => true,
      () => false
    )

    result.should.equal(true)
  })

  it('should match single item even when correct match is after wrong match', () => {
    const result = z('test')(
      () => false,
      (x) => true,
      (x) => false
    )

    result.should.equal(true)
  })

  it('should execute function when matches occurs', () => {
    const result = z(1)(
      (x) => (1 + x)
    )

    result.should.equal(2)
  })

  it('should match single item with value comparsion', () => {
    const result = z(1)(
      (x = 2) => false,
      (x = 1) => true,
      (x = 3) => false
    )

    result.should.equal(true)
  })

  it('should match type', () => {
    const result = z('string')(
      (x = String) => true
    )

    result.should.equal(true)
  })

  it('should match any type', () => {
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

  it('should match single item array with comparsion', () => {
    const result = z([1])(
      (x = [2]) => false,
      (x = [1]) => x
    )

    result.should.deep.equal([1])
  })

  it('should match tail array', () => {
    const result = z([1, 2, 3, 4])(
      (x, y, xs) => [x].concat(xs)
    )

    result.should.deep.equal([1, 3, 4])
  })

  it('should match tail array with comparsion at first argument', () => {
    const result = z([1, 2, 3])(
      (x = 2, xs) => false,
      (x = 1, xs) => true,
      (x, xs) => false
    )

    result.should.equal(true)
  })
})
