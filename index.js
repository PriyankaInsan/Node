// var http = require('http');
// var url = require('url');

// // http.createServer(function (req, res) {
// //   res.writeHead(200, {'Content-Type': 'text/html'});
// //   res.write(req.url);
// //   res.end('Hello World! PK 123');
// // }).listen(8080);


// http.createServer((req,res)=>{
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   res.end(txt);
// }).listen(4040);

const fs= require('fs');
fs.writeFile('output.txt',"first file write", (err)=>{console.log('err',err)})