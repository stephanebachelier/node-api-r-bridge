const R = require('r-script')

module.exports = {
  foo: (name = 'hello world', times = 20) =>
    R('r/sync.R')
      .data(name, times)
      .callSync(),

  bar: (name = 'hello world', times = 20) => {
    return new Promise((resolve, reject) => {
      R('r/sync.R')
        .data(name, times)
        .call((err, data) => {
          if (err) {
            return reject(err)
          }

          resolve(data)
        })
    })
  }
}
