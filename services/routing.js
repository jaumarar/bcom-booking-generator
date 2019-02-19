'use strict';
const restify = require('restify');
const repos = require('./repos');
const GetRepositoryResponse = require('../responses/GetRepositoryResponse');

const server = restify.createServer({
    name: 'Test App',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

var r = {
    id: 0,
    path: '',

    branch: '',
    ahead: 0,
    behind: 0,
    files: []
};

var f = {
    type: '',
    path: ''
};

server.get(
    '/git/getRepositories',
    function onRequest(req, res, next) {

        if (typeof req.query.absolutePath === 'undefined' || req.query.absolutePath === '') {
            res.send({e: 1, m: 'An abolute path is required'});
            next();
        }

        repos.scanRepositories(req.query.absolutePath)
            .then((repositories) => {
                let response = [];

                GetRepositoryResponse.Repository.filesList.forEach(
                    /**
                     *
                     * @param {Response} e
                     */
                    function(e)  {
e.
                });
                repositories.forEach((repo, i) => {
                    let r1 = Object.assign({}, r);
                    r1.id = repo.id;
                    r1.path = repo.path;
                    r1.branch = repo._info.current;
                    r1.ahead = repo._info.ahead;
                    r1.behind = repo._info.behind;

                    repo._info.files.forEach((file, j) => {
                        console.log(file);
                        let f1 = Object.assign({}, f);
                        r1.files.push(f1);
                    });

                    response.push(r1);
                });

                res.send({e: 0, m: '', d: response});
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
