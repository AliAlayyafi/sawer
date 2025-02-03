const express = require('express');
const session  = require('express-session');
const bodyParser = require('body-parser');
const uid = require("uid");


const sql = require("../db/db.js");


const router = express.Router()



router.use(bodyParser.urlencoded({ extended: false }));




router.get('/', (req, res) => {
    if(req.session.ID == undefined){
        return res.redirect("/login")
    }
    return res.render("../views/main/main.ejs")
});


router.post('/', async (req, res) => {

    if(req.session.ID == undefined){
        return res.redirect("/login")
    }

    let link = uid.uid(30);
    let user = req.session.ID || 0;

    let db = new sql();

    let result = await db.addHistory(user,link);
    // check the result TRUE | FALSE
    db.end();

    return res.redirect("/history")

});





module.exports = router