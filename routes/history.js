const express = require('express');
const session  = require('express-session');
const router = express.Router()

const sql = require("../db/db.js");

router.get('/', async (req, res) => {
    if(req.session.ID == undefined){
        return res.redirect("/login")
    }
    let data = await getList(req.session.ID);

    return res.render("history/history.ejs",object = data)

});

router.get('/:link', async (req, res) => {
 
    let user = req.session.ID;
    if(user == undefined){
        return res.redirect("/login")
    }
    let link = req.params.link;
    let info = await getData(link);


    if((info.length == 0) || (info[0].USER != user)){
        return res.redirect("/history")
    }

    let history = JSON.parse(info[0].HISTORY);

    return res.render("details/details.ejs",object=history)


});

async function getList(user){

    const db = new sql();

    let result = await db.getHestories(user)

    db.end();
    return result;

}

async function getData(link){
    const db = new sql();

    let result = await db.checkLink(link)
    
    db.end();
    return result;
}




module.exports = router