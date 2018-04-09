require('chai').should()
const objectEquals = require('src/objectEquals')

describe('objectEquals', () => {
  it('should match nested objects A', () => {
    const objectA = {
      name: 'oi',
      data: {
        age: 17
      }
    }

    const objectB = {
      name: 'oi',
      data: {
        age: 18
      }
    }

    objectEquals(objectA, objectB).should.equal(false)
  })

  it('should match nested objects B', () => {
    const objectA = {
      data: {
        age: 18
      }
    }

    const objectB = {
      name: 'oi',
      data: {
        age: 18
      }
    }

    objectEquals(objectA, objectB).should.equal(true)
  })

  it('should match nested objects C', () => {
    const objectA = {
      data: {
        id: {
          security: '123'
        }
      }
    }

    const objectB = {
      name: 'oi',
      data: {
        age: 18,
        id: {
          security: '123'
        }
      }
    }

    objectEquals(objectA, objectB).should.equal(true)
  })

  it('should match nested objects D', () => {
    const objectA = {
      data: {
        id: {
          security: ['123', 3]
        }
      }
    }

    const objectB = {
      name: 'oi',
      data: {
        age: 18,
        id: {
          security: ['123', 2]
        }
      }
    }

    objectEquals(objectA, objectB).should.equal(false)
  })

  it('should match nested objects E', () => {
    const objectA = {
      data: {
        id: {
          security: ['123', 2]
        }
      }
    }

    const objectB = {
      name: 'oi',
      data: {
        age: 18,
        id: {
          security: ['123', 2]
        }
      }
    }

    objectEquals(objectA, objectB).should.equal(true)
  })
})
