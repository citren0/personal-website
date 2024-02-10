
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



// ----------- BLOG -----------

// Router must be declared before app so it takes higher precedence.
var routerBlog = express.Router();

routerBlog.use(express.static(__dirname + '/views/blog/img'));

routerBlog.get('/style.css', (req, res, next) =>
{
    return res.sendFile('blog/style.css');
});

routerBlog.get('/', (req, res, next) =>
{
    return res.render('blog/pages/index.ejs', {});
});

routerBlog.get('/posts', (req, res, next) =>
{
    return res.render('blog/pages/posts.ejs', {});
});

routerBlog.get('/graphics', (req, res, next) =>
{
    return res.render('blog/pages/graphics.ejs', {});
});

routerBlog.get('/popcount', (req, res, next) =>
{
    return res.render('blog/pages/popcount.ejs', {});
});





const app = express();
app.use(subdomain('blog', routerBlog));


app.set('view engine', 'ejs');
//app.use(helmet());
//app.use(hpp());
const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);





// ----------- PERSONAL WEBSITE -----------

// Resources
console.log(__dirname + '/views/personal-website/img');
app.use(express.static(__dirname + '/views/personal-website/img'));















// Main Pages

app.get('/', (req, res, next) =>
{
    return res.render('personal-website/pages/index.ejs', {});
});

app.get('/projects', (req, res, next) =>
{
    return res.render('personal-website/pages/projects.ejs', {});
});

app.get('/resume', (req, res, next) =>
{
    return res.render('personal-website/pages/resume.ejs', {});
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