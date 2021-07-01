function makeEnvironment(params, allowedKeys) {
    const filteredKeyValuePairs = Object.entries(params)
        .filter(([key,]) => allowedKeys.includes(key))
    return Object.fromEntries(filteredKeyValuePairs)
}

module.exports = makeEnvironment
