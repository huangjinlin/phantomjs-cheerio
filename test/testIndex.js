const pc = require('../index.js')
const moment = require('moment');
function testRequest() {
  pc.request({ url: 'http://m.ashvsash.com/category/%E7%94%B5%E5%BD%B1' }).then(($) => {
    console.log('4', moment().format("HH:mm:ss"))
    const href = $('div.pagination a.extend').attr('href')
    const r = parseInt(href.substr(href.lastIndexOf('/') + 1))
    console.log('totalPage', r)
  })
}
function testQueue() {
  pc.queue().then(value => {
    console.log('1', moment().format("HH:mm:ss"))
  })
  pc.queue().then(value => {
    console.log('2', moment().format("HH:mm:ss"))
  })
  pc.queue().then(value => {
    console.log('3', moment().format("HH:mm:ss"))
  })
}

testQueue()
testRequest()
