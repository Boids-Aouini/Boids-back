let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');

let Con = require('./db/connectToDB/connectToDB');

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let PORT = process.env.PORT = 4404;

app.listen(PORT, () => console.log('server runing on ' + PORT));
