let { Router } = require('express');
let router = Router();
let Con = require('../db/connectToDB/connectToDB');
let verify = require('./verifyUser');

router.post('/makeChannel', verify, async (req, res) => {
    let { id } = req.user;
    let { server_id, createdAt, name } = req.body
    Con.query('SELECT leader_id FROM Servers WHERE id = (?)', [server_id], (err, result) => {
        // retreive leader_id where the id of server equals server_id
        if (err) { return res.status(400).send(err).end() } // send error in case there is one
        let { leader_id } = result[0];
        if (id !== leader_id) { return res.status(401).send('Only server\'s leaders can create channels') }
        // if leader_id doesn't equal to the loged in user send error response

        Con.query('INSERT INTO Channels (server_id, name, createdAt) VALUES (?, ?, ?)', [server_id, name, createdAt],
            // insert new channel
            (err, result) => {
                if (err) { return res.status(400).send('there is a problem in creating a new channel !') } // send error incase there is one
                res.status(201).send({ // send successful response
                    results: {
                        response: 'Handeled make new channel request',
                        newChannel: {
                            name,
                            id: result.insertId
                        }
                    }
                })
            })
    })

})

router.get('/getChannels/:server_id', verify, async (req, res) => {
    let { server_id } = req.params; // retrieve server id from params

    Con.query('SELECT id, name FROM Channels WHERE server_id = (?)', [server_id], (err, channels) => {
        // retreive id and name from channels table where server_id equals to server_id that is retrieve from params
        if (err) { return res.status(400).send('There is a problem on retreiving channels from db').end() } // send error in case there is one

        res.status(200).send({ // send successful response if every thing went well
            results: {
                response: 'Handeled get server\'s channels request',
                channels,
                server_id

            }
        })
    })
})

router.post('/send', verify, async (req, res) => {
    let user_id = req.user.id,
        { channel_id, message, createdAt } = req.body;

    Con.query('INSERT INTO Channels_Posts (user_id, channel_id, post, isHidden, createdAt) VALUES (?, ?, ?, ?, ?)', [user_id, channel_id, message, false, createdAt],
        (err, result) => {
            if (err) { return res.status(400).send({ message: 'there is a problem sending the message', error: err }).end() }
            Con.query('SELECT Users.firstname, Users.lastname, Channels_Posts.isHidden, Channels_Posts.post FROM Channels_Posts INNER JOIN Users ON Channels_Posts.id = (?)', [result.insertId],
                (err, result) => {
                    if (err) { return res.status(400).send({ message: 'there is problem retreiving the inserted message', error: err }) }
                    let { firstname, lastname, isHidden, post } = result[0];

                    res.status(201).send({
                        results: {
                            newMessage: {
                                id: result.insertId,
                                firstname,
                                lastname,
                                isHidden,
                                post
                            }
                        }
                    })
                })
        })
})

router.get('/getPosts/:server_id/:channel_id', verify, async (req, res) => {
    let { channel_id, server_id } = req.params;
    Con.query('SELECT Channels_Posts.id, Channels_Posts.user_id, Channels_Posts.post, Channels_Posts.isHidden, Users.firstname, Users.lastname FROM Channels_Posts INNER JOIN Users ON Channels_Posts.channel_id = (?) AND Channels_Posts.user_id = Users.id', [channel_id],
        (error, posts) => {
            if (error) { return res.status(400).send({ message: 'there is a problem retreiving posts from db', error }) }
            return res.status(200).send({
                results: {

                    response: 'Handeled get posts request',
                    posts
                }
            })
        })
})


module.exports = router;