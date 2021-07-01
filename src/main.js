const core = require('@actions/core')

const S3Provider = require('./S3Provider')

async function main() {
    const provider = new S3Provider()
    await provider.deploy()
}

try {
    (async () => await main())()
} catch (err) {
    core.setFailed(err.message)
}
