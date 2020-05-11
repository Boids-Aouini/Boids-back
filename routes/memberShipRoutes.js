let { Router } = require('express');
router = Router(),
    verify = require('./verifyUser'),
    Con = require('../db/connectToDB/connectToDB'),
    nodemailer = require('nodemailer');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, server_name, newMemberEmail, message, role } = req.body;
    Con.query('SELECT Users.id, Users.firstname, Users.lastname, Servers.leader_id, Servers.name FROM Users INNER JOIN Servers ON Servers.leader_id = (?) AND Users.email = (?) AND Servers.name = (?)', [server_id, newMemberEmail, server_name], (err, result) => {
        // retreive data needed from users and servers tables
        if (err) { return res.status(400).send(err).end() } // send error in case there is one
        if (!result[0]) { return res.status(404).send('server is not found').end() } // send server not found in case it's not found
        let { leader_id, firstname, lastname, name, id } = result[0];
        if (leader_id !== res.user.id) { return res.status(400).send('only leader can add new members') } // send only leader can add new members if sender is 

        Con.query('INSERT INTO Servers_Memberships (server_id, user_id, role) VALUES (?, ?, ?)', [server_id, id, role],
            // insert new membership in server_memeberships table    
            (err, result) => {
                if (err) { return res.status(400).send(err).end() }// send error in case there is one

                const transporter = nodemailer.createTransport({ // make transporter
                    service: 'gmail',
                    auth: {
                        user: process.env.BOIDS_MAIL,
                        pass: process.env.BOIDS_PASS // naturally, replace both with your real credentials or an application-specific password
                    },
                    tls: { // run locally
                        rejectUnauthorized: false
                    }
                });

                const mailOptions = { // make mail options
                    from: process.env.BOIDS_MAIL,
                    to: newMemberEmail,
                    subject: 'New ' + name + ' member in ' + server_name,
                    html: `
                        <p>${message}</p>
                    `
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(400).send(error).end();
                    }

                    res.status(201).send({
                        results: {
                            response: 'New member has been added'
                        }
                    }).end();
                });


            })


    })


})

module.exports = router;