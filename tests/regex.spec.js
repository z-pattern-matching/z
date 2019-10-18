require('chai').should()
const { matches } = require('src/z')

describe('regex', () => {
  it('should match item if regex tests true', () => {
    const result = matches('HIPA')(
      (x = /[PA]/) => true,
      (x) => false
    )
    result.should.equal(true)
  })

  it('should not match item if regex tests false', () => {
    const result = matches('FOO')(
      (x = /[PA]/) => true,
      (x) => false
    )

    result.should.equal(false)
  })
})
