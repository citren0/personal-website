
// HTTP header security.
const helmet = require('helmet');
const hpp = require('hpp');

// Limit client requests.
const rateLimit = require('express-rate-limit');

// Servers.
var http = require('http');

// Express JS.
var subdomain = require('express-subdomain');
const express = require('express');

// ENV file.
require('dotenv').config();
const path = require('path');




// ----------- BLOG -----------
// Router must be declared before app so it takes higher precedence.
var routerBlog = express.Router();

routerBlog.use(express.static(__dirname + '/views/blog/img'));

routerBlog.get('/style.css', (req, res, next) =>
{
    return res.sendFile(__dirname + '/views/blog/style.css');
});

routerBlog.get('/', (req, res, next) =>
{
    return res.render('blog/pages/index.ejs', {});
});

routerBlog.get('/posts', (req, res, next) =>
{
    return res.render('blog/pages/posts.ejs', {});
});


// Posts

routerBlog.get('/graphics', (req, res, next) =>
{
    return res.render('blog/pages/posts/graphics.ejs', {});
});

routerBlog.get('/popcount', (req, res, next) =>
{
    return res.render('blog/pages/posts/popcount.ejs', {});
});

routerBlog.get('/openclgentoo', (req, res, next) =>
{
    return res.render('blog/pages/posts/openclgentoo.ejs', {});
});




// Express Server Definition.
const app = express();
app.use(subdomain('blog', routerBlog));


// Middleware.
app.set('view engine', 'ejs');
const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);




// ----------- PERSONAL WEBSITE -----------
// Resources
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




var httpPort = 80;
var httpServer = http.createServer(app);
httpServer.listen(httpPort);
console.log(`Server is listening on port ${httpPort}`);