const express = require("express");
const bodyparser = require("body-parser");
const appRoute = require("./routes/route");

const app = express();

app.use(express.static("pulic"));
app.use(bodyparser.urlencoded({encoding:false}));
app.use(bodyparser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();  
})

app.use('/', appRoute);

app.set('views' , './view');

app.set('view engine', 'ejs');

app.use(function (req, res, next){
    res.send("Oops somehting wrong in url");
    next();
})

const port = process.env.PORT || 1234;

app.listen(port , ()=> {
    console.log("---connection open---");
    console.log("server start at 1234");
});


