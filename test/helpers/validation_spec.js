const expect = require('chai').expect
const sinon = require('sinon')

const { validateInputs } = require('../../src/helpers')

const core = require('@actions/core')

describe('helpers/validation', () => {
    describe('#makeValidator', () => {
        let getInputStub

        beforeEach(() => {
            getInputStub = sinon.stub(core, 'getInput')
        })

        afterEach(() => {
            getInputStub.restore()
        })

        it('should validate required parameters', () => {
            // given
            const requiredInputs = ['pg-login', 'pg-pass']
            const optionalInputs = []
            getInputStub.withArgs('pg-login').returns('admin')
            getInputStub.withArgs('pg-pass').returns('supersecret')
            // when
            const params = validateInputs(requiredInputs, optionalInputs)
            // then
            expect(params).to.deep.equal({
                $raw: {
                    'pg-login': 'admin',
                    'pg-pass': 'supersecret',
                },
                pgLogin: 'admin',
                pgPass: 'supersecret',
            })
        })

        it('should throw on non-existing required parameters', () => {
            // given
            const requiredInputs = ['pg-login', 'pg-pass']
            const optionalInputs = []
            getInputStub.withArgs('pg-login').returns('admin')
            getInputStub.withArgs('pg-pass').throws()
            // when
            const fn = () => makeValidator(requiredInputs, optionalInputs)
            // then
            expect(fn).to.throw()
        })

        it('should validate existing optional parameters', () => {
            // given
            const requiredInputs = []
            const optionalInputs = ['pg-schema']
            getInputStub.withArgs('pg-schema').returns('unicorns')
            // when
            const params = validateInputs(requiredInputs, optionalInputs)
            // then
            expect(params).to.deep.equal({
                $raw: {
                    'pg-schema': 'unicorns',
                },
                pgSchema: 'unicorns',
            })
        })

        it('should validate non-existing optional parameters', () => {
            // given
            const requiredInputs = []
            const optionalInputs = []
            getInputStub.withArgs('pg-schema').returns('unicorns')
            // when
            const params = validateInputs(requiredInputs, optionalInputs)
            // then
            expect(params).to.deep.equal({$raw: {}})
        })
    })
})
