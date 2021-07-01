const core = require('@actions/core')

function makeValidator(requiredInputs, optionalInputs) {
    const required = requiredInputs.map(input => [input, core.getInput(input, {required: true})])
    const optional = optionalInputs.map(input => [input, core.getInput(input, {required: false})])
    const result = {}
    for ([key, value] of [...required, ...optional]) {
        result[key] = value
    }
    return result
}

module.exports = makeValidator
