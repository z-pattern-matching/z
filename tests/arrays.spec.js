require('chai').should()
const z = require('src/z')

describe('arrays', () => {
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

  it('should match if even with match has more arguments than subject', () => {
    const result = z([1])(
      (x, y, xs) => false,
      x => x
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
