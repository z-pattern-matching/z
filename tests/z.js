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

  it('should match single item with value comparison', () => {
    const result = z(1)(
      (x = 2) => false,
      (x = 1) => true,
      (x = 3) => false
    )

    result.should.equal(true)
  })

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
      // (x = Boolean) => false,
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

  it('should match tail array with comparsion at tail argument', () => {
    const result = z([1, 2, 3])(
      (x, xs = [1, 2]) => false,
      (x, xs = [2, 3]) => true,
      (x, xs) => false
    )
    result.should.equal(true)
  })

  it('should match head array with comparsion at head argument', () => {
    const result = z([1, 2, 3])(
      (x, y = 1, xs) => false,
      (x, y = 2, xs) => true,
      (x, y, xs) => false
    )

    result.should.equal(true)
  })

  it('should match if even with match has more arguments than subject', () => {
    const result = z([1])(
      (x, y, xs) => false,
      (x) => x
    )

    result.should.deep.equal([1])
  })

  it('should extract array from head when has tail argument', () => {
    const result = z([1])(
      (x, y, xs) => false,
      (x, xs = []) => x
    )

    result.should.equal(1)
  })

  it('should extract head value of array', () => {
    const result = z([1, 2])(
      (x = 1, xs) => x
    )

    result.should.equal(1)
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

  it('should match array of array on head', () => {
    const result = z([[1], [2]])(
      (x = Array, xs) => xs
    )

    result.should.deep.equal([[2]])
  })

  it('should match array of array on tail', () => {
    const result = z([[1], [2]])(
      (x, xs = Array) => xs
    )

    result.should.deep.equal([[2]])
  })

  it('should match empty array of on head', () => {
    const result = z([[], [2]])(
      (x = [], xs) => xs
    )

    result.should.deep.equal([[2]])
  })

  it('should match empty array of on tail', () => {
    const result = z([1, []])(
      (x, xs = [[]]) => xs
    )

    result.should.deep.equal([[]])
  })
})
