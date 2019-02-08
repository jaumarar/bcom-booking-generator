'use strict';
const restify = require('restify');
const repos = require('./repos');

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

        if (typeof req.query.absolutePath === 'undefined' || req.query.absolutePath === '') {
            res.send({e: 1, m: 'An abolute path is required'});
            next();
        }

        repos.scanRepositories(req.query.absolutePath)
            .then((repositories) => {
                res.send({e: 0, m: '', d: repositories});
                next();
            }).catch((error) => {
                console.log(error);
            res.send({e: 1, m: 'En error has ocurred', d: error});
            next();
        })
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