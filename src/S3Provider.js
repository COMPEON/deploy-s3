const execa = require('execa')

const { makeValidator, makeEnvironment } = require('./helpers')

const ENV_KEYS = [
    'aws-access-key-id',
    'aws-secret-access-key',
    'aws-default-region'
]

const PARAMS_REQUIRED = ['bucket', 'source']
const PARAMS_OPTIONAL = [...ENV_KEYS]

const validate = () => makeValidator(PARAMS_REQUIRED, PARAMS_OPTIONAL)

class S3Provider {
    constructor() {
        this.params = validate()
    }

    async deploy() {
        const env = makeEnvironment(this.params, ENV_KEYS)
        
        const { bucket, source } = this.params
        const bucketUri = `s3://${bucket}`

        await execa('aws', ['s3', 'sync', source, bucketUri], {
            preferLocal: true,
            env
        })
    }
}

module.exports = S3Provider
