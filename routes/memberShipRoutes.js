let { Router } = require('express');
router = Router(),
    verify = require('./verifyUser'),
    Con = require('../db/connectToDB/connectToDB'),
    nodemailer = require('nodemailer');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, newMemberEmail, message, role } = req.body;
    Con.query('SELECT Users.id, Users.firstname, Users.lastname, Servers.leader_id, Servers.name FROM Users INNER JOIN Servers ON Servers.leader_id = (?) AND Users.email = (?)', [server_id, newMemberEmail], (err, result) => {
        if (err) { return res.status(400).send(err).end() }
        if (!result[0]) { return res.status(404).send('server is not found').end() }
        let { leader_id, firstname, lastname, name } = result[0];
        if (leader_id !== res.user.id) { return res.status(400).send('only leader can add new members') }


        // Con.query('INSERT INTO Servers_Memberships (server_id, user_id, role) VALUES (?, ?, ?)', [])


    })


})

module.exports = router;