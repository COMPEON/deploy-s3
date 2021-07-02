module.exports = {
  validateInputs: require('./validation'),
  makeEnvironment: require('./environment'),
  ...require('./transform')
}
