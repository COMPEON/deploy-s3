const proxyquire = require('proxyquire')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const core = require('@actions/core')

const execaStub = sinon.spy()
const S3Provider = proxyquire('../src/S3Provider', {
  execa: execaStub
})

chai.use(sinonChai)

describe('S3Provider', function () {
  describe('#new', function () {
    let getInputStub

    beforeEach(function () {
      getInputStub = sinon.stub(core, 'getInput')
    })

    afterEach(function () {
      getInputStub.restore()
    })

    it('should setup the params and environment', function () {
      // given
      getInputStub.withArgs('bucket', { required: true }).returns('testbucket-staging')
      getInputStub.withArgs('source', { required: true }).returns('build')
      getInputStub.withArgs('aws-access-key-id', { required: false }).returns('abcdef123')
      getInputStub.withArgs('aws-secret-access-key', { required: false }).returns('***********')
      getInputStub.withArgs('aws-default-region', { required: false }).returns('eu-central-1')
      // when
      const provider = new S3Provider()
      // then
      expect(provider.params).to.deep.equal({
        $raw: {
          bucket: 'testbucket-staging',
          source: 'build',
          'aws-access-key-id': 'abcdef123',
          'aws-secret-access-key': '***********',
          'aws-default-region': 'eu-central-1'
        },
        bucket: 'testbucket-staging',
        source: 'build',
        awsAccessKeyId: 'abcdef123',
        awsSecretAccessKey: '***********',
        awsDefaultRegion: 'eu-central-1'
      })
      expect(provider.env).to.deep.equal({
        AWS_ACCESS_KEY_ID: 'abcdef123',
        AWS_SECRET_ACCESS_KEY: '***********',
        AWS_DEFAULT_REGION: 'eu-central-1'
      })
    })
  })

  describe('#deploy', function () {
    let getInputStub

    beforeEach(function () {
      getInputStub = sinon.stub(core, 'getInput')
    })

    afterEach(function () {
      getInputStub.restore()
    })

    it('should call aws s3 with the right arguments', function () {
      // given
      getInputStub.withArgs('bucket', { required: true }).returns('testbucket-staging')
      getInputStub.withArgs('source', { required: true }).returns('build')
      getInputStub.withArgs('aws-default-region', { required: false }).returns('us-east-1')
      const expectedArgs = [
        'aws', ['s3', 'sync', 'build', 's3://testbucket-staging'],
        {
          preferLocal: true,
          extendEnv: true,
          all: true,
          env: {
            AWS_DEFAULT_REGION: 'us-east-1'
          }
        }
      ]
      // when
      new S3Provider().deploy()
      // then
      expect(execaStub).to.have.been.calledOnceWithExactly(...expectedArgs)
    })

    it('should call aws cloudfront with the right arguments', function () {
      // given
      getInputStub.withArgs('bucket', { required: true }).returns('testbucket-staging')
      getInputStub.withArgs('source', { required: true }).returns('build')
      getInputStub.withArgs('cloudfront-distribution', { required: false }).returns('abcdef')
      getInputStub.withArgs('cloudfront-invalidate-paths', { required: false }).returns('/index.html')
      const expectedArgs = [
        'aws', [
          'cloudfront',
          'create-invalidation',
          '--distribution-id',
          'abcdef',
          '--paths',
          '/index.html'
        ],
        {
          preferLocal: true,
          extendEnv: true,
          all: true,
          env: {}
        }
      ]
      // when
      new S3Provider().deploy()
      // then
      expect(execaStub).to.have.been.calledWithExactly(...expectedArgs)
    })
  })
})
