const http = require('http');
const extras = require('./extras');
const hostname = '127.0.0.1';
const port = 3000;
const articles = require("./controllers/articles");
const comments = require("./controllers/comments");
const home = require("./controllers/home");

const handlers = {
    '/api/articles/readall': articles.readAll,
    '/api/articles/read':    articles.read,
    '/api/articles/create':  articles.create,
    '/api/articles/update':  articles.update,
    '/api/articles/delete':  articles.delete,
    '/api/comments/create':  comments.create,
    '/api/comments/delete':  comments.delete,
    '/api/logs'            : extras.logSend,
    '/'                    : home.index,
    '/index.html'          : home.index,
    '/app.js'              : home.app,
    '/site.css'            : home.css,
    '/form.html'           : home.form,
    '/form.js'             : home.formjs
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result) => {
            if (err) {
                res.writeHead(err.code, {'Content-Type' : 'application/json'});
                res.end( JSON.stringify(err) );
                return;
            }
            res.writeHead(200, {'Content-Type': result.contentType});
            switch (result.contentType) {
                case extras.contentTypes["json"] : {
                    res.end( JSON.stringify(result.body, null, "\t") );
                    break;
                }
                case extras.contentTypes["html"] : {
                    res.end(result.body);
                    break;
                }
                case extras.contentTypes["js"] : {
                    res.end(result.body);
                    break;
                }
                case extras.contentTypes["css"] : {
                    res.end(result.body);
                }
            }
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
    return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        extras.logRequest(req.url, body, new Date().toISOString());
        console.log("body : " +body);
        if (body !== "") {
            params = JSON.parse(body);
            cb(null, params);
        }
        else {
            cb(null, null);
        }
    });
}