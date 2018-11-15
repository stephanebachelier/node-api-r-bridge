const R = require('r-script')
const fs = require('mz/fs')

const asyncRcall = fn => {
  return new Promise((resolve, reject) => {
    fn().call((err, data) => {
      if (err) {
        // here export String from Buffer due to R code in `throw.R`
        return reject(new Error(err.toString()))
      }

      resolve(data)
    })
  })
}

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
  },

  baz: (name = 'hello world', times = 20) =>
    asyncRcall(() => R('r/sync.R').data(name, times)),

  bad: () =>
    // will throw
    new Promise((resolve, reject) => {
      R('r/throw.R').callSync()
    }),

  json: async keyword => {
    const data = await fs.readFile(`r/${keyword}.json`, 'utf8')
    var attitude = JSON.parse(data)

    return asyncRcall(() =>
      R('r/async.R')
        .data({
          df: attitude,
          nGroups: 3,
          fxn: 'mean'
        })
    )
  }
}
