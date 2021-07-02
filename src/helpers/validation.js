const core = require('@actions/core')

const { lispToCamelCase } = require('./transform')

/**
 * Validate action inputs based on a whitelist of required
 * and optional parameter names and return an object of matching
 * inputs with their respective values.
 * 
 * @param {string[]} requiredInputs Whitelist of required input keys
 * @param {string[]} optionalInputs Whitelist of optional input keys
 * @returns {object} Matching inputs
 */
function validateInputs(requiredInputs, optionalInputs) {
    const required = requiredInputs.map(input => [
        input, core.getInput(input, {required: true})
    ])
    const optional = optionalInputs.map(input => [
        input, core.getInput(input, {required: false})
    ])
    const rawResult = {}
    for ([key, value] of [...required, ...optional]) {
        rawResult[key] = value
    }
    const result = Object.fromEntries(
        Object.entries(rawResult).map(([key, value]) => [
            lispToCamelCase(key), value
        ])
    )
    return {
        $raw: rawResult,
        ...result
    }
}

module.exports = validateInputs
