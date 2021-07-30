const expect = require('chai').expect

const { lispToUpperSnakeCase, lispToCamelCase } = require('../../src/helpers')

describe('helpers/transform', function () {
  describe('#lispToUpperSnakeCase', function () {
    it('should convert lisp-case to UPPER_SNAKE_CASE', function () {
      // given
      const input = 'this-is-a-test'
      const expected = 'THIS_IS_A_TEST'
      // when
      const actual = lispToUpperSnakeCase(input)
      // then
      expect(actual).to.equal(expected)
    })
  })
  describe('#lispToCamelCase', function () {
    it('should convert lisp-case to camelCase', function () {
      // given
      const input = 'aws-access-key-id'
      const expected = 'awsAccessKeyId'
      // when
      const actual = lispToCamelCase(input)
      // then
      expect(actual).to.equal(expected)
    })
    it('should not touch strings without hyphens', function () {
      // given
      const input = ['', 'abc', 'awsAccessKeyId']
      // when
      const actual = input.map(x => lispToCamelCase(x))
      // then
      expect(actual).to.deep.equal(input)
    })
  })
})
