let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
require('dotenv').config()

let Con = require('./db/connectToDB/connectToDB'); // retreive connected db

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/auth', require('./routes/authRoutes')); // setup authRoutes in the server
app.use('/api/boidsServers', require('./routes/serverRoutes')); // setup boids servers routes in the server
app.use('/api/memberships', require('./routes/memberShipRoutes')) // setup membership routes in the server

let PORT = process.env.PORT = 4404;

app.listen(PORT, () => console.log('server runing on ' + PORT));

