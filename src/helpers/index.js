module.exports = {
    makeValidator: require('./validate'),
    makeEnvironment: require('./environment'),
    ...require('./transform'),
}
