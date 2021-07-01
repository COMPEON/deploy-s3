const execa = require('execa')

const { makeValidator, makeEnvironment, lispToUpperSnakeCase } = require('./helpers')

const ENV_KEYS = [
    'aws-access-key-id',
    'aws-secret-access-key',
    'aws-default-region'
]

const PARAMS_REQUIRED = ['bucket', 'source']
const PARAMS_OPTIONAL = [
    ...ENV_KEYS,
    'cloudfront-distribution',
    'cloudfront-invalidate-paths'
]

const validateParams = () => makeValidator(PARAMS_REQUIRED, PARAMS_OPTIONAL)

class S3Provider {
    constructor() {
        this.params = validateParams()
    }

    async deploy() {
        const env = makeEnvironment(this.params, ENV_KEYS, lispToUpperSnakeCase)
        
        const { bucket, source } = this.params
        const bucketUri = `s3://${bucket}`

        const awsSyncOutput = await execa('aws', ['s3', 'sync', source, bucketUri], {
            preferLocal: true,
            extendEnv: true,
            all: true,
            env
        })

        console.log(awsSyncOutput.all)
    }
}

module.exports = S3Provider
