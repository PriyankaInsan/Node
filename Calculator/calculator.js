const sum= require('./addition')
const calculator= (req, res)=>{
    if(req.url==='/'){
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calculator</title>
        </head>
        <body>
            <h1>Welcome <a href="/calculator">Click here</a> to proceed on calculator.</h1>
        </body>
        </html>`)
        return res.end()
    }else if(req.url==='/calculator'){
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calc</title>
        </head>
        <body>
            <form action="/sum" method="POST">
                <input type="number" name="firstNumber" placeholder="0" />
                <input type="number" name="secondNumber" placeholder="0" />
                <button type="submit">Sum</button>
            </form>
        </body>
        </html>`)
        res.end();
    }else if(req.url==='/sum' && req.method==='POST'){
        return sum(req, res);
    }
};
module.exports= calculator;