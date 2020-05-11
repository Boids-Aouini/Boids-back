let { Router } = require('express');
router = Router(),
    verify = require('./verifyUser'),
    Con = require('../db/connectToDB/connectToDB'),
    nodemailer = require('nodemailer');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, newMemberEmail, message } = req.body;
    Con.query('SELECT leader_id FROM Servers where id = (?)', [server_id], (err, result) => {
        if (err) { return res.status(400).send(err).end() }
        if (!result[0]) { return res.status(404).send('server is not found').end() }
        let { leader_id } = result[0];
        if (leader_id !== res.user.id) { return res.status(400).send('only leader can add new members') }
        Con.query('SELECT id, firstname, lastname FROM Users WHERE email = (?)', [newMemberEmail], (err, result) => {
            if (err) { return res.status(400).send(err).end() }
            if (!result[0]) { return res.status(404).send('users with this email doesn\'t have an account unfortunately').end() }
            let { firstname, lastname } = result[0];

            // Con.query('INSERT INTO Servers_Memberships (server_id, ')

        })
    })


})

module.exports = router;