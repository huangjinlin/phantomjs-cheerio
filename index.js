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
function queue() {
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
            let $
            // console.log('body', body)
            if (body.indexOf('<title>504 Gateway Time-out</title>')>-1) {
              /*
              <html>
              <head><title>504 Gateway Time-out</title></head>
              <body bgcolor="white">
              <center><h1>504 Gateway Time-out</h1></center>
              <hr><center>openresty/1.11.2.2</center>
              </body>
              </html>
              */
              reject({code: 504, message: 'time-out'})
            }  else if (body.indexOf('<title>502 Bad Gateway</title>')>-1) {
              reject({code: 502, message: 'bad gateway'})
            }
            else {
              body = JSON.parse(body)
              // console.log('content', body.content)
              $ = cheerio.load(body.content)
              resolve($)
            }
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
