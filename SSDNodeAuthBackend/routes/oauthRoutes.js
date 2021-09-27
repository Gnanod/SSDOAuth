const express = require('express');
const router = express.Router();

router.post('/checkRoute', (req, res) => {
    res.send("Router Correct");
});

module.exports = router;