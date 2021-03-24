const controller = require('./controllers');
const router  = require('express').Router();


router.get('/test',controller.test.Get)

module.exports = router