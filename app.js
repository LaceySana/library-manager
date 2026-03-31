// REQUIRE STATEMENTS
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.listen(port, console.log(`Web server is listening at port ${port}`));
