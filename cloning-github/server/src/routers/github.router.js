const router = require('express').Router();

const githubController = require('../controllers/github.controller');

router.get('/:code', githubController.getToken);

module.exports=router;