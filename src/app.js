#!/usr/bin/env node
var restify = require('restify');
var glob = require('glob');
var simpleGit = require('simple-git');

var server = restify.createServer({
    name: 'Test App',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get(
    '/test/:userId',
    function onRequest(req, res, next) {
        console.log(req.url, '1');
        next();
    },
    function onRequest(req, res, next) {
        console.log(req.url, '2');
        res.send({ hello: 'world' });
        next();
    }
);

server.get(
    "/*",
    restify.plugins.serveStatic({
        directory: __dirname + '/public',
        default: 'index.html'
    })
);

server.listen(9898, function () {
    console.log('%s listening at %s', server.name, server.url);
});
