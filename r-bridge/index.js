const R = require('r-script')

const asyncRcall = fn => {
  return new Promise((resolve, reject) => {
    fn().call((err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data)
    })
  })
}

const rFile = path => `${process.cwd()}/${path}`

module.exports = {
  foo: (name = 'hello world', times = 20) =>
    R(rFile('r/sync.R'))
      .data(name, times)
      .callSync(),

  bar: (name = 'hello world', times = 20) => {
    return new Promise((resolve, reject) => {
      R(rFile('r/sync.R'))
        .data(name, times)
        .call((err, data) => {
          if (err) {
            return reject(err)
          }

          resolve(data)
        })
    })
  },

  baz: (name = 'hello world', times = 20) =>
    asyncRcall(() => R(rFile('r/sync.R')).data(name, times))
}
