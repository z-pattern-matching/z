require('chai').should()
const { matches } = require('src/z')

describe('matches', () => {
  it('should match tail array with comparsion at tail argument', () => {
    const result = matches([1, 2, 3])(
      (x, xs = [1, 2]) => false,
      (x, xs = [2, 3]) => true,
      (x, xs) => false
    )
    result.should.equal(true)
  })

  it('should match head array with comparsion at head argument', () => {
    const result = matches([1, 2, 3])(
      (x, y = 1, xs) => false,
      (x, y = 2, xs) => true,
      (x, y, xs) => false
    )

    result.should.equal(true)
  })

  it('should match single item', () => {
    const result = matches(1)(x => true, () => false)

    result.should.equal(true)
  })

  it('should match single item even when correct match is after wrong match', () => {
    const result = matches('test')(
      () => false,
      (x) => true,
      (x) => false
    )

    result.should.equal(true)
  })

  it('should execute function when matches occurs', () => {
    const result = matches(1)(
      (x) => 1 + x
    )

    result.should.equal(2)
  })
})
