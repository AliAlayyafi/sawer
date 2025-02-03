const express = require('express');
const session  = require('express-session');
const router = express.Router()



router.post('/', (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
});


module.exports = router