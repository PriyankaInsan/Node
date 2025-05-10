const mysql = require("mysql2");

const pool= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Ddstha@7",
    database:"air_bnb",
})

module.exports= pool.promise();