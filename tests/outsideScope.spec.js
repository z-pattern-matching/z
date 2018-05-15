require('chai').should()
const { matches } = require('src/z')

describe('outside scope matching', () => {
  it('should match variable outside scope', () => {
    const FILTERS = {
      CATEGORY: 'CATEGORY',
      PRICE: 'PRICE',
      COLOR: 'COLOR',
      ONLY_NEW: 'ONLY_NEW',
      ONLY_IN_DISCOUNT: 'ONLY_IN_DISCOUNT'
    }

    this.FILTERS = FILTERS
    const someValue = FILTERS.COLOR

    const result = matches(someValue).call(this,
      (x = FILTERS.CATEGORY) => false,
      (x = FILTERS.COLOR) => true,
      (x = FILTERS.ONLY_NEW) => false
    )

    result.should.equal(true)
  })

  it('should match variable outside scope 2', () => {
    const innerObject = {
      FILTERS: {
        CATEGORY: 'CATEGORY',
        PRICE: 'PRICE',
        COLOR: 'COLOR',
        ONLY_NEW: 'ONLY_NEW',
        ONLY_IN_DISCOUNT: 'ONLY_IN_DISCOUNT'
      }
    }

    const someValue = innerObject.FILTERS.COLOR

    const result = matches(someValue).call({ innerObject },
      (x = innerObject.FILTERS.CATEGORY) => false,
      (x = innerObject.FILTERS.COLOR) => true,
      (x = innerObject.FILTERS.ONLY_NEW) => false
    )

    result.should.equal(true)
  })
})
