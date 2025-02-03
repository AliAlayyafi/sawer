const express = require('express');
const session  = require('express-session');
const router = express.Router()
const bodyParser = require('body-parser');


const sql = require("../db/db.js");

router.use(bodyParser.urlencoded({ extended: false }));




router.get('/', (req, res) => {
    if(req.session.ID != undefined)
            return res.redirect("/main");
    return res.render("../views/login/login.ejs")
});

router.post('/',async (req, res) => {
    const {username,password} = req.body;
    let db = new sql();
    let find = await db.login(username,password);
    if(!find.length){
        db.end();
        return res.redirect("/login")
    }
    req.session.ID = find[0].ID;
    return res.redirect("/main")
});



module.exports = router