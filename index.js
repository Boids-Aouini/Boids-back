require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let socketIO = require('socket.io');
let http = require('http');
let Con = require('./db/connectToDB/connectToDB'); // retreive connected db
let jwt = require('jsonwebtoken');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/auth', require('./routes/authRoutes')); // setup authRoutes in the server
app.use('/api/boidsServers', require('./routes/serverRoutes')); // setup boids servers routes in the server
app.use('/api/memberships', require('./routes/memberShipRoutes')) // setup membership routes in the server
app.use('/api/channels', require('./routes/channelRoutes')); // set up channels routes
let PORT = process.env.PORT = 4404;
let server = app.listen(PORT, () => console.log('server runing on ' + PORT));
let io = socketIO(server);
io.on('connection', socket => {
    console.log('New Client is connected', socket.id);
    socket.on('sendPost', (newMessage) => {
        let { token } = newMessage;
        let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        if (verifiedUser) {
            let user_id = verifiedUser.id,
                { channel_id, message, createdAt, server_id } = newMessage;

            Con.query('INSERT INTO Channels_Posts (user_id, channel_id, post, isHidden, createdAt) VALUES (?, ?, ?, ?, ?)', [user_id, channel_id, message, false, createdAt],
                (err, result) => {
                    if (err) { throw err }
                    Con.query('SELECT Users.firstname, Users.lastname, Channels_Posts.isHidden, Channels_Posts.user_id, Channels_Posts.post FROM Channels_Posts INNER JOIN Users ON Channels_Posts.id = (?) AND Channels_Posts.user_id = Users.id', [result.insertId],
                        (err, result) => {
                            if (err) { throw err }
                            let { firstname, lastname, isHidden, post, user_id } = result[0];

                            io.sockets.emit('sendPost', {
                                id: result.insertId,
                                user_id,
                                firstname,
                                channel_id,
                                server_id,
                                lastname,
                                isHidden,
                                post


                            })
                        })
                })
        }

    })
    socket.on('deletePost', (postData) => {
        Con.query('DELETE FROM Channels_Posts WHERE id = (?)', [postData.post_id], (err, result) => {
            if (err) throw err;
            io.sockets.emit('deletePost', postData)
        })
    })
    socket.on('updatePost', post => {
        Con.query('UPDATE Channels_Posts SET post = (?) WHERE id = (?)', [post.updatedPost, post.post_id], (err, result) => {
            if (err) throw err;
            io.sockets.emit('updatePost', post)
        })
    })
    socket.on('disconnect', () => {
        console.log(`Client disconnected ${socket.id}`)
    })
})

