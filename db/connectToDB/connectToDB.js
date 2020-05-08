let mysql = require('mysql');

let database = 'Boids',
    host = 'localhost',
    password = '123456789',
    user = 'root'

if (process.env.NODE_ENV === 'test') { database = 'Test_Boids' }


var connection = mysql.createConnection({ // make connection and provide db information on mysql server
    host,
    user,
    password,
    database
});

connection.connect(function (err) { // connect to db
    if (err) throw err; // throw error in case there is one
    console.log("DB Connected!"); // run this line in case every thing went well 
});

module.exports = connection; // export connected mysql server