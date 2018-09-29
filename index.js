const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const serverUrl = 'https://mxavtj-3000-gchfab.studio.ide.live/request'
let interval = 1
let requestTime = moment()
function setOptions(options) {
  if (options && options.interval) {
    interval = options.interval
  }
}
function queue(options) {
  setOptions(options)
  return new Promise((resolve, reject) => {
    const now = moment()
    if (now.isBefore(requestTime)) {
      const milliseconds = requestTime.valueOf() - now.valueOf()
      setTimeout(() => {
        resolve()
      }, milliseconds)
    } else {
      requestTime = now
      resolve()
    }
    requestTime.add(interval, 's')
  })
}
function requestPage(options) {
  setOptions(options)
  return new Promise((resolve, reject) => {
    queue().then(() => {
      request
        .post(serverUrl, { form: { url: options.url } }, (err, response, body) => {
          if (err) {
            // console.log('err', err)
            reject(err)
          } else {
            body = JSON.parse(body)
            // console.log('content', body.content)
            const $ = cheerio.load(body.content)
            resolve($)
          }
        })
    })
  })
}
const obj = {
  queue: queue,
  request: requestPage
}
module.exports = obj;
