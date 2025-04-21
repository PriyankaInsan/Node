const addition = (req,res)=>{
    if(req.url==='/sum'){
        const data=[];
        req.on('data',chunk=>{
            data.push(chunk);
        })
        req.on('end',()=>{
            const body= Buffer.concat(data).toString();
            const params= new URLSearchParams(body);
            const obj=Object.fromEntries(params);
            const result= obj.firstNumber + obj.secondNumber;
            res.write(`<h1>Sum is: ${result}</h1>`);
        })
    }
}
module.exports= addition;