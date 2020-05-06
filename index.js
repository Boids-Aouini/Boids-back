let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
require('dotenv').config()

let Con = require('./db/connectToDB/connectToDB'); // retreive connected db

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./routes/authRoutes')(app, Con); // setup authRoutes in the server
require('./routes/serverRoutes')(app, Con); // setup server routes in the server

let PORT = process.env.PORT = 4404;

app.listen(PORT, () => console.log('server runing on ' + PORT));
