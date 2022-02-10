const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = db;