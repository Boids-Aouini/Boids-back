let mysql = require('mysql');

var connection = mysql.createConnection({ // make connection and provide db information on mysql server
    host: "localhost",
    user: "root",
    password: "123456789",
    database: 'Boids'
});

connection.connect(function (err) { // connect to db
    if (err) throw err; // throw error in case there is one
    console.log("DB Connected!"); // run this line in case every thing went well 
});

module.exports = connection; // export connected mysql server