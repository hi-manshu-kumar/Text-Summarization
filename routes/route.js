const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send("hey serrver working fine......enjoy");
});

module.exports = router;