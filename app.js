// REQUIRE STATEMENTS
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.listen(port, console.log(`Web server is listening at port ${port}`));
