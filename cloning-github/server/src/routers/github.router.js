const router = require('express').Router();

const githubController = require('../controllers/github.controller');

router.get('/user', githubController.getUser);

router.get('/getRepo', githubController.getAllRepository);

router.get('/repos/:owner/:repo', githubController.getRepository)

router.get('/:code', githubController.getToken);

router.post('/', githubController.newRepository);

router.delete('/:owner/:repo', githubController.deleteRepository);


module.exports=router;