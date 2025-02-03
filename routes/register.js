const express = require('express');
const bodyParser = require('body-parser');


const sql = require("../db/db.js");


const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', (req, res) => {
    if(req.session.ID != undefined)
        return res.redirect("/main");
    return res.render("register/register.ejs");
});

router.post('/', async (req, res) => {
    const {username,password} = req.body;
    if(!username.length || !password.length){
        return res.redirect("/register");
    }
    let db = new sql();
    let find  = await db.findUser("USERNAME",username);
    if(find.length){
        db.end();
        return res.redirect("/register");
    }
    await db.addUser(username,password);
    db.end();
    return res.redirect("/login");
});


module.exports = router






