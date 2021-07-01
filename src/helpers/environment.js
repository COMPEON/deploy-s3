/**
 * Build an environment object from a parameter object
 * using a whitelist of allowed keys and an optional
 * key transformation function.
 * 
 * @param {object} params Input parameters
 * @param {string[]} allowedKeys Whitelisted env keys
 * @param {function} transformKey Key transformation function
 * @returns {object} The environment object
 */
function makeEnvironment(params, allowedKeys, transformKey) {
    const filteredKeyValuePairs = Object.entries(params)
        .filter(([key,]) => allowedKeys.includes(key))
    const transformedKeyValuePairs = transformKey !== undefined
        ? filteredKeyValuePairs.map(([key, value]) => [transformKey(key), value])
        : filteredKeyValuePairs
    return Object.fromEntries(transformedKeyValuePairs)
}

module.exports = makeEnvironment
