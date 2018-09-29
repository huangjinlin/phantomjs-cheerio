<!-- not to html -->
# phantomjs-cheerio

## install
```
npm install -S phantomjs-cheerio
```

## use
1.request
``` javascript
  const pc = require('phantomjs-cheerio')
  pc.request({ url: 'http://m.ashvsash.com/category/%E7%94%B5%E5%BD%B1' }).then(($) => {
    console.log('4', moment().format("HH:mm:ss"))
    const href = $('div.pagination a.extend').attr('href')
    const r = parseInt(href.substr(href.lastIndexOf('/') + 1))
    console.log('totalPage', r)
  })
```
2.queue
```  javascript
  pc.queue().then(value => {
  })
```

## tip
publish
``` bash
npm publish
```
