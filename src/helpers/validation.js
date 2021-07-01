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
function makeValidator(requiredInputs, optionalInputs) {
    const required = requiredInputs.map(input => [
        lispToCamelCase(input),
        core.getInput(input, {required: true})
    ])
    const optional = optionalInputs.map(input => [
        lispToCamelCase(input),
        core.getInput(input, {required: false})
    ])
    const result = {}
    for ([key, value] of [...required, ...optional]) {
        result[key] = value
    }
    return result
}

module.exports = makeValidator
