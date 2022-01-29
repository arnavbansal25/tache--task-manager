var express = require('express');

var router = express.Router();

router.get('/', async function (req, res, next) {
    res.send('Tache - Task Manager API running');
});

module.exports = router;
