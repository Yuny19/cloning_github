const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.github.com/'
});

class githubCloneController {
    static getToken(req, res) {

        axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: req.params.code
        })
            .then((data) => {
                res.status(data.status).json(
                    data.data
                )
            })
            .catch((err) => {
                res.status(404).json({
                    message: err.message
                })
            })
    }

    static getUser(req, res) {
        instance.get('user', {
            headers: { 'Authorization': `token ${req.headers.token}` }
        })
            .then(({ data }) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(err.status).json({
                    message: err.message

                })
            })
    }

    static getRepository(req, res) {
        instance.get('user/repos', {
            headers: { 'Authorization': `token ${req.headers.token}` }
        })
            .then(({ data }) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log(err)
                res.status(err.status).json({
                    message: err.message

                })
            })
    }

    static newRepository(req, res) {
        instance.post('user/repos', {
            name: req.body.name,
            description: req.body.description,
            private: req.body.private,
            auto_init: req.body.auto_init
        }, {
            headers: { 'Authorization': `token ${req.headers.token}` }
        })
            .then(({ data }) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(err.status).json({
                    message: err.message

                })
            })
    }

    static deleteRepository(req, res) {
        instance.delete(`repos/${req.params.owner}/${req.params.repo}`, {
            headers: { 'Authorization': `token ${req.headers.token}` }
        })
            .then()
            .catch((err) => {
                res.status(403).json({
                    message: err.message
                })
            })
    }
}

module.exports = githubCloneController;