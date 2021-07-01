/**
 * Convert lisp-case to UPPER_SNAKE_CASE
 * 
 * @param {string} str 
 * @returns {string} The converted string.
 */
function lispToUpperSnakeCase(str) {
    return str.toUpperCase().replace(/-/g, '_')
}

module.exports = {
    lispToUpperSnakeCase
}
