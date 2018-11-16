const express = require("express");
const router = express.Router();
const path = require('path');

router.get("/", (req, res)=> {
    res.render("index");
})

router.post("/" , (req, res) => {
    console.log(req.body.article);
    res.send("article recieved");
});

router.post("/send", (req, res) => {
    console.log(req.body.article);
    let x = req.body.arc;
    console.log(`Artcile is \n ${  x || "not found"}`);
    res.status(200).send(`Artcile is \n ${  x || "not found"}`);    
});


router.post("/snd", (req, res) => {

    console.log("/post handled");
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);

        let dataBuffer = fs.readFileSync(file.path);

        pdf(dataBuffer).then(function(data) {
            
            console.log(data.info.Author);
            var article = {
                author: data.info.Author,
                article: data.text
            };

            var y = JSON.stringify(article);

            fs.writeFile( __dirname + "/json/output.json", y, function (err) {
                if (err) throw err;
                console.log('Saved!');
            })
        });
    });
    res.render("index");
});


module.exports = router;