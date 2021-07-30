const expect = require('chai').expect

const { makeEnvironment } = require('../../src/helpers')

describe('helpers/environment', function () {
  describe('#makeEnvironment', function () {
    it('should filter parameters according to allowed keys', function () {
      // given
      const params = {
        'pg-login': 'admin',
        'pg-pass': 'admin',
        'pg-schema': 'secretstuff'
      }
      const allowedKeys = [
        'pg-login', 'pg-pass', 'pg-schema'
      ]
      // when
      const result = makeEnvironment(params, allowedKeys)
      // then
      expect(result).to.deep.equal({
        PG_LOGIN: 'admin',
        PG_PASS: 'admin',
        PG_SCHEMA: 'secretstuff'
      })
    })

    it('should ignore allowed keys with no matching parameter', function () {
      // given
      const params = {
        foo: 123,
        baz: 345
      }
      const allowedKeys = [
        'foo', 'bar', 'baz'
      ]
      // when
      const result = makeEnvironment(params, allowedKeys)
      // then
      expect(result).to.deep.equal({
        FOO: 123,
        BAZ: 345
      })
    })
  })
})
