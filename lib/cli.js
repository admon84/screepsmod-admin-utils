module.exports = (config) => {
  config.cli.on('cliSandbox', function (sandbox) {
    sandbox.utils = config.utils
  })
}
