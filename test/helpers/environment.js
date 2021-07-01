const expect = require('chai').expect

const { makeEnvironment, lispToUpperSnakeCase } = require('../../src/helpers')

describe('helpers/environment', () => {
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
        it('should apply the specified transform to all keys', () => {
            // given
            const params = {
                'pg-login': 'admin',
                'pg-pass': 'admin',
                'pg-schema': 'secretstuff',
            }
            const allowedKeys = [
                'pg-login', 'pg-pass', 'pg-schema'
            ]
            // when
            const result = makeEnvironment(params, allowedKeys, lispToUpperSnakeCase)
            // then
            expect(Object.keys(result)).to.have.lengthOf(3)
            expect(result).to.have.property('PG_LOGIN', 'admin')
            expect(result).to.have.property('PG_PASS', 'admin')
            expect(result).to.have.property('PG_SCHEMA', 'secretstuff')
        })
    })    
})
