const { lispToUpperSnakeCase } = require('./transform')

/**
 * Build an environment object from a parameter object
 * using a whitelist of allowed keys.
 *
 * @param {object} params Input parameters
 * @param {string[]} allowedKeys Whitelisted env keys
 * @returns {object} The environment object
 */
function makeEnvironment (params, allowedKeys) {
  const env = Object.entries(params)
    .filter(([key]) => allowedKeys.includes(key))
    .map(([key, value]) => [lispToUpperSnakeCase(key), value])
  return Object.fromEntries(env)
}

module.exports = makeEnvironment
