require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let socketIO = require('socket.io');
let http = require('http');
let Con = require('./db/connectToDB/connectToDB'); // retreive connected db

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/auth', require('./routes/authRoutes')); // setup authRoutes in the server
app.use('/api/boidsServers', require('./routes/serverRoutes')); // setup boids servers routes in the server
app.use('/api/memberships', require('./routes/memberShipRoutes')) // setup membership routes in the server
app.use('/api/channels', require('./routes/channelRoutes')); // set up channels routes
let PORT = process.env.PORT = 4404;
let server = http.createServer(app);
let io = socketIO(server);
io.on('connection', socket => {
    console.log('New Client is connected', socket.id);
    socket.on('sendPost', (newMessage) => {
        console.log(newMessage)
        let { token } = newMessage;
        let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    })
    socket.on('disconnect', () => {
        console.log(`Client disconnected ${socket.id}`)
    })
})
server.listen(PORT, () => console.log('server runing on ' + PORT));

