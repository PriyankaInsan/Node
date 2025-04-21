const http = require('http');
const calculator=require('./calculator');
const server= http.createServer(calculator);
server.listen(3000,()=>{console.log('server started of calculator')})