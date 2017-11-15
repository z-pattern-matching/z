require('chai').should()
const {
  getFlattenedKeysFromArgs,
  objectAndArgsDestructureMatches
} = require('../src/matchObject')

// declared as a single string for readability here
// but the reflection lib will hand it over as the
// string split on commas and trimmed
const args = '{a,b:{c,d,e:{f},g}}'
const parsedArgs = args.split(',')

describe('matchObject', () => {
  describe('#getFlattenedKeysFromArgs', () => {
    it('should get a list of required paths', () => {
      getFlattenedKeysFromArgs(parsedArgs).should.deep.equal([
        'a',
        'b.c',
        'b.d',
        'b.e.f',
        'b.g'
      ])
    })
  })

  describe('#objectAndArgsDestructureMatches', () => {
    it('should match an object with extra keys to a spec with less', () => {
      objectAndArgsDestructureMatches(parsedArgs, {
        a: 1,
        b: { c: 1, d: 1, e: { f: 1 }, g: 1 }
      }).should.equal(true)
    })

    it('should not match an object with missing keys', () => {
      objectAndArgsDestructureMatches(parsedArgs, { a: 1 }).should.equal(false)
    })
  })
})
