let verify = require('./verifyUser');
let express = require('express');
let router = express.Router();
let Con = require('../db/connectToDB/connectToDB')

router.post('/createServer', verify, (req, res) => {
    let user_id = req.user.id; // retreive user id from verify middleware
    let { name, createdAt } = req.body;

    let newServer = [user_id, name, createdAt]; // set new server data for query
    Con.query('INSERT INTO Servers (leader_id, name, createdAt) VALUES (?, ?, ?)', newServer, // make insertion query
        (err, serverResult) => { // callback once done with query
            if (err) { res.status(400).send('Server\'s name is used already').end() } // send error in case there is one
            let server_id = serverResult.insertId;

            let newChannel = [server_id, 'Announcement', createdAt];
            Con.query('INSERT INTO Channels (server_id, name, createdAt) VALUES (?, ?, ?)', newChannel,
                // add new channel to new server
                (err, resultChannel) => {
                    if (err) {
                        console.log(err)
                        res.status(400).send('there is an error creating channel to the new Server').end();
                    } // send error in case there is one
                    res.status(201).send({ // send successful response
                        results: {
                            response: "Handeled create new server request",
                            server: { server_id, name }
                        }
                    }).end();
                })
        })
})
