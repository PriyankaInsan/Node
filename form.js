const fs = require("fs");

const requestHandler=(req, res) => {
    if (req.url === "/home") {
      res.write("<h1>Welcome Home</h1>");
      return res.end();
    }
    if (req.url === "/about") {
      res.write("<h1>Welcome About</h1>");
      return res.end();
    }
    if (req.url === "/contact") {
      res.write("<h1>Welcome Contact</h1>");
      return res.end();
    }
    if(req.url==='/submit' && req.method==='POST'){
  const dataArr=[];
      req.on('data', chunk=>{
          console.log("chunk",chunk);
          dataArr.push(chunk);
      })
      req.on('end',()=>{
          const data= Buffer.concat(dataArr).toString();
          console.log(data);
          const params= new URLSearchParams(data);
          const body = Object.fromEntries(params);
          console.log(body);
          fs.writeFileSync('form.txt',JSON.stringify(body));
      });
      res.statusCode=301;
      // res.setHeader('Content-Type','application/json');
      res.write(`
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <title>First Node HTML</title>
          </head>
          <body>
              <nav>
                  <ul>
                      <li><a href="/home">Home</a></li>
                      <li><a href="/about">About</a></li>
                      <li><a href="/contact">Contact</a></li>
                  </ul>
              </nav>
              <form action="/submit" method="post">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Enter Name" autocomplete="off"/>
          <br>
          <label for="age">Age</label>
          <input id="age" name="age" type="text" placeholder="Enter Age" autocomplete="off"/>
          <br>
          <button type="submit">Submit</button>
      </form>
          </body>
      </html>
  `);
      return res.end();
    }
    res.write(`
      <html lang="en">
          <head>
              <title>First Node HTML</title>
          </head>
          <body>
              <nav>
                  <ul>
                      <li><a href="/home">Home</a></li>
                      <li><a href="/about">About</a></li>
                      <li><a href="/contact">Contact</a></li>
                  </ul>
              </nav>
              <form action="/submit" method="post">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Enter Name" autocomplete="off"/>
          <br>
          <label for="age">Age</label>
          <input id="age" name="age" type="text" placeholder="Enter Age" autocomplete="off"/>
          <br>
          <button type="submit">Submit</button>
      </form>
          </body>
      </html>
  `);
    return res.end();
  };

  module.exports= requestHandler;