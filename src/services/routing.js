'use strict';
const restify = require('restify');

const server = restify.createServer({
    name: 'Test App',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get(
    '/git/getRepositories',
    function onRequest(req, res, next) {
        console.log(req, res);
        next();
    }
);

server.get(
    "/*",
    restify.plugins.serveStatic({
        directory: __dirname + '/../public',
        default: 'index.html'
    })
);

module.exports = {
    'server': server,
    listen: () => {
        return new Promise((resolve) => {
            server.listen(9898, () => {
                resolve();
            });
        });
    }
};