
// HTTP header security.
const helmet = require('helmet');
const hpp = require('hpp');

// Limit client requests.
const rateLimit = require('express-rate-limit');

// Servers.
var http = require('http');
var https = require('https');

// Read TLS certificates.
const fs = require('fs');
//var privateKey  = fs.readFileSync('sslcert/server.pem', 'utf8');
//var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

// Express JS.
var subdomain = require('express-subdomain');
const express = require('express');
var credentials = {key: privateKey, cert: certificate};

// ENV file.
require('dotenv').config();
const path = require('path');



var routerBlog = express.Router();


routerBlog.get('/', (req, res, next) =>
{
    return res.send("success");
});







const app = express();
app.use(subdomain('blog', routerBlog));

app.set('view engine', 'ejs');
//app.use(helmet());
//app.use(hpp());
const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);












// Resources

app.get('/img/bananapie.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/bananapie.jpg');
});

app.get('/img/cats-lotsofcats.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/cats-lotsofcats.jpg');
});

app.get('/img/email.png', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/email.png');
});

app.get('/img/esp32hal.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/esp32hal.jpg');
});

app.get('/img/favicon.png', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/favicon.png');
});

app.get('/img/github-logo.png', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/github-logo.png');
});

app.get('/img/linkedin-logo.png', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/linkedin-logo.png');
});

app.get('/img/me.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/me.jpg');
});

app.get('/img/multidnsresolver.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/multidnsresolver.jpg');
});

app.get('/img/python.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/python.jpg');
});

app.get('/img/Resume.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/Resume.jpg');
});

app.get('/img/RoomMate.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/RoomMate.jpg');
});

app.get('/img/Socialsteam.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/Socialsteam.jpg');
});

app.get('/img/thiswebsite.jpg', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/img/thiswebsite.jpg');
});















// Main Pages

app.get('/', (req, res, next) =>
{
    return res.render('pages/index.ejs', {});
});

app.get('/projects', (req, res, next) =>
{
    return res.render('pages/projects.ejs', {});
});

app.get('/resume', (req, res, next) =>
{
    return res.render('pages/resume.ejs', {});
});

























if (process.env.SERVER_TYPE == 'production')
{
    var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
    var certificate = fs.readFileSync('sslcert/fullchain.pem', 'utf8');
    var caBundle = fs.readFileSync('sslcert/ca.bundle', 'utf8');
    var credentials = {key: privateKey, cert: certificate, ca: caBundle};
    var httpsPort = 443;

    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort);
    console.log(`Server is listening on port ${httpsPort}`);
}
else if (process.env.SERVER_TYPE == 'development')
{
    var httpPort = 80;

    var httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    console.log(`Server is listening on port ${httpPort}`);
}