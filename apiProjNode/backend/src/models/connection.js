const mysql = require('mysql2/promise');

require('dotenv').config();
console.log(process.env.MYSQL_HOST)
console.log(process.env.MYSQL_USER)
console.log(process.env.MYSQL_PASSWORD)
console.log(process.env.MYSQL_DB)  

const connection = mysql.createPool({   //fila de conecções, nome autoexplicativo
    host: process.env.MYSQL_HOST, // pega do .env( descobrir como não colocar ele no git)
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DB
});                

module.exports = connection;