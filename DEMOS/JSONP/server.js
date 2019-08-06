var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if(path === '/' || path==="index.html"){
    let amount=fs.readFileSync("amount.db").toString()
    console.log(amount)
    let indexpage=fs.readFileSync("index.html").toString()
    indexpage=indexpage.replace("&&&amount&&&",amount)
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(indexpage)
    response.end()
  }
  else if(path==='/pay'){
    let amount=parseFloat(fs.readFileSync("amount.db"))
    amount-=1;
    fs.writeFileSync("amount.db",amount)
    response.statusCode=200
    response.setHeader('Content-Type', 'application/javascript')
    response.write("")
    response.end()
  }
  else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('页面错误')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n 打开 http://localhost:' + port)


