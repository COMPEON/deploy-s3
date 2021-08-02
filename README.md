# COMPEON Deployment Action for S3

This action can be used to deploy code to Amazon S3.<br>
It also supports post-deploy CloudFront path invalidation.

## Inputs

### `bucket`
> **Required** The name of the S3 bucket.

### `source`
> **Required** The directory containing the code to be deployed.

### `aws-access-key-id`
> **Optional** The AWS access key ID.

### `aws-secret-access-key`
> **Optional** The AWS secret access key.

### `aws-default-region`
> **Optional** The AWS default region.

### `cloudfront-distribution`
> **Optional** The CloudFront distribution ID.

### `cloudfront-invalidate-paths`
> **Optional** The paths to be invalidated on CloudFront.

If this is left empty, no paths will be invalidated.

## Outputs

No outputs.

## Example Usage

```yaml
- uses: compeon/deploy-s3
  with:
    bucket: my-s3-bucket
    source: dist
    cloudfront-distribution: ABC123DEF456
    cloudfront-invalidate-paths: /index.html
```

## Development

Use `yarn version` to increment the version number.

| Command | Description |
| ------- | ----------- |
| `yarn version --patch` | Patch release |
| `yarn version --minor` | Minor release |
| `yarn version --major` | Major release |

A build will be created, tagged and pushed in the process.
