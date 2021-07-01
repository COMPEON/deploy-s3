const expect = require('chai').expect

const { lispToUpperSnakeCase } = require('../../src/helpers')

describe('helpers/transform', () => {
    describe('#lispToUpperSnakeCase', () => {
        it('should convert lisp-case to UPPER_SNAKE_CASE', () => {
            // given
            const input = 'this-is-a-test'
            const expected = 'THIS_IS_A_TEST'
            // when
            const actual = lispToUpperSnakeCase(input)
            // then
            expect(actual).to.equal(expected)
        })
    })
})
