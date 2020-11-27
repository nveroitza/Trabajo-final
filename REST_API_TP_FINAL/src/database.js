const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tp_final'
});

db.connect();

console.log("La conexion ha sido exitosa!");

module.exports = db;
