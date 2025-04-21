const http = require("http");
const handler = require('./form');
const server= http.createServer(handler);

server.listen(3000, () => {
  console.log("server started on 3000");
});
