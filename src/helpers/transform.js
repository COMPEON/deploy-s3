/**
 * Convert lisp-case to UPPER_SNAKE_CASE
 * 
 * @param {string} str 
 * @returns {string} The converted string.
 */
function lispToUpperSnakeCase(str) {
    return str.toUpperCase().replace(/-/g, '_')
}

/**
 * Convert lisp-case to camelCase
 * 
 * @param {string} str
 * @returns {string} The converted string.
 */
function lispToCamelCase(str) {
    return str
        .split('-')
        .map((s, i) => i === 0 ? s : `${s[0].toUpperCase()}${s.slice(1)}`)
        .join('')
}

module.exports = {
    lispToUpperSnakeCase,
    lispToCamelCase,
}
