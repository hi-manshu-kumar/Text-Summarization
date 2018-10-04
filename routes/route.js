const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    // console.log(__dirname + '..\public\index.html');
    // res.sendFile(path.join(__dirname + '../public/index.html'));
    res.sendFile(__dirname + '/../public/index.html');
});

module.exports = router;