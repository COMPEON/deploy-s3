const assert = require('assert')
const expect = require('chai').expect

const { makeEnvironment } = require('../../src/helpers')

describe('helpers', () => {
    describe('#makeEnvironment', () => {
        it('should filter parameters according to allowed keys', () => {
            // given
            const params = {
                foo: 123,
                bar: 234,
                baz: 345,
                bax: 456,
            }
            const allowedKeys = [
                'foo', 'baz'
            ]
            // when
            const result = makeEnvironment(params, allowedKeys)
            // then
            expect(Object.keys(result)).to.have.lengthOf(2)
            expect(result).to.have.property('foo', 123)
            expect(result).to.have.property('baz', 345)
        })
        it('should ignore allowed keys with no matching parameter', () => {
            // given
            const params = {
                foo: 123,
                baz: 345,
            }
            const allowedKeys = [
                'foo', 'bar', 'baz'
            ]
            // when
            const result = makeEnvironment(params, allowedKeys)
            // then
            expect(Object.keys(result)).to.have.lengthOf(2)
            expect(result).to.have.property('foo', 123)
            expect(result).to.have.property('baz', 345)
        })
    })    
})
