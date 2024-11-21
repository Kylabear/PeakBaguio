module.exports = pool;

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'yourpassword',
    database: 'peak_baguio'
});

module.exports = pool;

