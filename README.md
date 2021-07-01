# COMPEON Deployment Action for S3

This action can be used to deploy code to Amazon S3.

## Inputs

### `bucket`

**Required** The name of the S3 bucket.

### `source`

**Required** The directory containing the code to be deployed.

### aws-access-key-id

**Optional** The AWS Access Key ID

### aws-secret-access-key

**Optional** The AWS Secret Access Key

### aws-default-region

**Optional** The default region

## Outputs

## Usage

```yaml
- uses: compeon/deploy-s3
  with:
    bucket: my-s3-bucket
    source: dist
```
