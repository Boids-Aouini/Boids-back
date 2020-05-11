let { Router } = require('express');
let router = Router();
let Con = require('../db/connectToDB/connectToDB');
let verify = require('./verifyUser');

router.get('/getChannels', verify, async (req, res) => {
    let { id } = req.user;

    // Con.query
})


module.exports = router;