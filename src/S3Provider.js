const execa = require('execa')

const { validateInputs, makeEnvironment } = require('./helpers')

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

const validateParams = () => validateInputs(PARAMS_REQUIRED, PARAMS_OPTIONAL)

class S3Provider {
  constructor () {
    this.params = validateParams()
    this.env = makeEnvironment(this.params.$raw, ENV_KEYS)
  }

  async deploy () {
    this._syncToS3()
    this._invalidateCloudfrontPaths()
  }

  async _syncToS3 () {
    const { bucket, source } = this.params
    const bucketUri = `s3://${bucket}`

    const awsOutput = await execa('aws', ['s3', 'sync', source, bucketUri], {
      preferLocal: true,
      extendEnv: true,
      all: true,
      env: this.env
    })

    console.log(awsOutput.all)
  }

  async _invalidateCloudfrontPaths () {
    const { cloudfrontDistribution, cloudfrontInvalidatePaths } = this.params

    if (!cloudfrontDistribution || !cloudfrontInvalidatePaths) {
      return
    }

    const awsArgs = [
      'cloudfront',
      'create-invalidation',
      '--distribution-id',
      cloudfrontDistribution,
      '--paths',
      cloudfrontInvalidatePaths
    ]

    const awsOutput = await execa('aws', awsArgs, {
      preferLocal: true,
      extendEnv: true,
      all: true,
      env: this.env
    })

    console.log(awsOutput.all)
  }
}

module.exports = S3Provider
