let { Router } = require('express');
router = Router(),
    verify = require('./verifyUser'),
    Con = require('../db/connectToDB/connectToDB'),
    nodemailer = require('nodemailer');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, server_name, newMemberEmail, message, role } = req.body;
    Con.query('SELECT Users.id, Users.firstname, Users.lastname, Servers.leader_id, Servers.name FROM Users INNER JOIN Servers ON Servers.leader_id = (?) AND Users.email = (?) AND Servers.name = (?)', [server_id, newMemberEmail, server_name], (err, result) => {
        if (err) { return res.status(400).send(err).end() }
        if (!result[0]) { return res.status(404).send('server is not found').end() }
        let { leader_id, firstname, lastname, name, id } = result[0];
        if (leader_id !== res.user.id) { return res.status(400).send('only leader can add new members') }

        Con.query('INSERT INTO Servers_Memberships (server_id, user_id, role) VALUES (?, ?, ?)', [server_id, leader_id, role],
            (err, result) => {
                if (err) { return res.status(400).send(err).end() }
            })


    })


})

module.exports = router;