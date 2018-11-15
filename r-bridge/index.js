const R = require('r-script')

module.exports = {
  foo: (name = 'hello world', times = 20) =>
    R('r/sync.R')
      .data(name, times)
      .callSync()
}
