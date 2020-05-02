# Files

## connectToDB.js

*makes connection and export connected db server*

### Usage

```javascript
    let con = require('./connectToDB.js'); // retreive exported connection

    con.query('SELECT * FROM Users', (err, results)=>{ // retreive all data from Users table and run callback
        if (err) throw err; // throw error i case there is one
        console.log(results); // console the retreived data
    })
```