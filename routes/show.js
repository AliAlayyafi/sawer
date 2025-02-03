const express = require('express');
const bodyParser = require('body-parser');


const sql = require("../db/db.js");


const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));


router.get('/:link', async (req, res) => {
    let link = req.params.link;
    let result = await check(link);
    result = result.length;
    if(!result)
        return res.redirect("/error");

    return res.render("show/show.ejs",{link:link});
});

router.post('/:link', async (req, res) => { // check if the link is exist, because some people uses httprequests
    const {data} = req.body;
    const link = req.params.link;

    let info = await check(link);
    let histories = JSON.parse(info[0].HISTORY)
    histories.push(data);
    let upload = JSON.stringify(histories); // Upload it to the history

    let result = await update(link,upload);
 
    return res.redirect("https://www.youtube.com/watch?v=uwAHiRtEUCI");
});


async function update(link,history){

    const db = new sql();

    let result = await db.updateHistory(link,history);

    db.end();
    return result;

}
async function check(link){
    const db = new sql();

    let result = await db.checkLink(link);

    db.end();
    return result;

}




module.exports = router






