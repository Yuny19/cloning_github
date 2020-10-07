const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://github.com/'
});


class githubCloneController {
    static getToken(req, res) {

        instance.post('login/oauth/access_token', null,{params:{
            client_id : process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: req.params.code
        }})
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err)=>{
                res.status(404).json({
                    message: err.message
                })
            })
    }
}

module.exports=githubCloneController;