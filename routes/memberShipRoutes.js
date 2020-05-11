let { Router } = require('express');
let router = Router();
let verify = require('./verifyUser');

router.post('/createMembership', verify, (req, res) => {

})

module.exports = router;