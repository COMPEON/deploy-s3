function makeEnvironment(params, allowedKeys, transformKey) {
    const filteredKeyValuePairs = Object.entries(params)
        .filter(([key,]) => allowedKeys.includes(key))
    const transformedKeyValuePairs = transformKey !== undefined
        ? filteredKeyValuePairs.map(([key, value]) => [transformKey(key), value])
        : filteredKeyValuePairs
    return Object.fromEntries(transformedKeyValuePairs)
}

module.exports = makeEnvironment
