const express = require('express');
const session  = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require("dotenv").config();

app.set("view-engine","ejs");
app.use(express.json())
app.use(express.static(__dirname + '/views'));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);




app.get('/', (req,res) => res.redirect('/login'));

app.use("/login",require('./routes/login.js'))
app.use("/logout",require('./routes/logout.js'))

app.use("/register",require("./routes/register.js"))


app.use("/main",require("./routes/main.js"))


app.use("/history",require("./routes/history.js"))

app.use("/show",require("./routes/show.js"))


app.use("/error",require("./routes/error.js"))


app.get("*",(req,res) => res.redirect("/error"))


app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})