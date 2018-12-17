const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const pdf = require('pdf-parse');

router.get("/", (req, res, next)=> {
    res.render("index");
    next();
})

router.post("/" , (req, res, next) => {
    console.log(req.body.article);
    let y = req.body.article
    res.send("article recieved");
    fs.writeFile( __dirname + "/../json/output.json", y, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    
    next();
});

router.post("/snd", (req, res, next) => {

    console.log("/post handled");
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/../uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);

        let dataBuffer = fs.readFileSync(file.path);

        pdf(dataBuffer).then(function(data) {
            
            console.log(data.info.Author);
            let article = {
                author: data.info.Author,
                article: data.text
            };

            let y = JSON.stringify(article);

            fs.writeFile( __dirname + "/../json/output.json", y, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        });
    });
    res.redirect("/");
    next();
});


module.exports = router;