const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'krotic22',
    database: 'node-project'
});

module.exports = pool.promise();