const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
var http = require('http');
var https = require('https');

// Read TLS certificates.
const fs = require('fs');
//var privateKey  = fs.readFileSync('sslcert/server.pem', 'utf8');
//var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

const express = require('express');
var credentials = {key: privateKey, cert: certificate};

// Env file.
require('dotenv').config();
const path = require('path');


const app = express();


app.set('view engine', 'ejs');
app.use(helmet());
app.use(hpp());
const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);
















// Resources

app.use(express.static(__dirname + '/views/img'));

app.get('/style.css', (req, res, next) =>
{
    res.sendFile(__dirname + '/views/style.css');
});

















app.get('/', (req, res, next) =>
{
    res.render('pages/index.ejs');
});

app.get('/index', (req, res, next) =>
{
    res.render('pages/index.ejs');
});

app.get('/posts', (req, res, next) =>
{
    res.render('pages/posts.ejs');
});

app.get('/popcount', (req, res, next) =>
{
    res.render('pages/popcount.ejs');
});

app.get('/graphics', (req, res, next) =>
{
    res.render('pages/graphics.ejs');
});

















if (process.env.SERVER_TYPE == 'production')
{
    var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
    var certificate = fs.readFileSync('sslcert/fullchain.pem', 'utf8');
    var caBundle = fs.readFileSync('sslcert/ca.bundle', 'utf8');
    var credentials = {key: privateKey, cert: certificate, ca: caBundle};
    var httpsPort = 444;

    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort);
    console.log(`Server is listening on port ${httpsPort}`);
}
else if (process.env.SERVER_TYPE == 'development')
{
    var httpPort = 81;

    var httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    console.log(`Server is listening on port ${httpPort}`);
}