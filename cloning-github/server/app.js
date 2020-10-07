const express = require('express');
const ENV = require('dotenv');

ENV.config();

const app = express();
const cors = require('cors');
const port = process.env.port;
const github = require('../server/src/routers/github.router');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', github);

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

app.listen(port, () => {
    console.log(`server run in here ${port}`)
})

