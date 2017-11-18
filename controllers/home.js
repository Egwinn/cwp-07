const home = exports;
const extras = require("../extras");
const fs = require('fs');

home.index = function (req, res, payload, cb) {
    fs.readFile("./public/index.html", (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        }
        else {
            cb(null, extras.getResponse(extras.contentTypes["html"], data));
        }
    })
};

home.app = function (req, res, payload, cb) {
    fs.readFile("./public/index.js", (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        }
        else {
            cb(null, extras.getResponse(extras.contentTypes["js"], data));
        }
    })
};

home.css = function (req, res, payload, cb) {
    fs.readFile("./public/site.css", (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        }
        else {
            cb(null, extras.getResponse(extras.contentTypes["css"], data));
        }
    })
};

home.form = function (req, res, payload, cb) {
    fs.readFile("./public/form.html", (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        }
        else {
            cb(null, extras.getResponse(extras.contentTypes["html"], data));
        }
    })
};

home.formjs = function (req, res, payload, cb) {
    fs.readFile("./public/form.js", (err, data) => {
        if (err) {
            cb({code: 404, message: 'Page not found'});
        }
        else {
            cb(null, extras.getResponse(extras.contentTypes["js"], data));
        }
    })
};