let { Router } = require('express');
router = Router(),
    verify = require('./verifyUser'),
    Con = require('../db/connectToDB/connectToDB'),
    transporter = require('./mailTransporter'),
    nodemailer = require('nodemailer');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, email, message, role } = req.body;
    console.log(email, process.env.BOIDS_EMAIL)
    Con.query('SELECT Users.id, Users.firstname, Users.lastname, Servers.leader_id, Servers.name FROM Users INNER JOIN Servers ON Servers.leader_id = (?) AND Users.email = (?) AND Servers.id = (?)', [req.user.id, email, server_id], (err, result) => {
        // retreive data needed from users and servers tables
        if (err) { return res.status(400).send(err).end() } // send error in case there is one
        if (!result[0]) { return res.status(401).send('data is not found').end() } // send server not found in case it's not found
        let { leader_id,
            firstname,
            lastname,
            name,
            id } = result[0];

        if (leader_id !== req.user.id) { return res.status(400).send('only leader can add new members') } // send only leader can add new members if sender is 

        Con.query('INSERT INTO Servers_Memberships (server_id, user_id, role) VALUES (?, ?, ?)', [server_id, id, role],
            // insert new membership in server_memeberships table    
            (err, result) => {
                if (err) { return res.status(400).send(err).end() }// send error in case there is one

                res.status(201).send({ // send successful request
                    results: {
                        response: 'New member has been added'
                    }
                }).end();

            })
    })



})

module.exports = router;