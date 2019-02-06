#!/usr/bin/env node
const database = require('./models');
const glob = require("glob");
const fs = require("fs");

function getRepositoryPaths(absolutePath) {
    return new Promise((resolve, reject) => {
        // Remove trail slash
        absolutePath = absolutePath.replace(/\/$/g, '');

        fs.exists(absolutePath, (exists) => {
            if (!exists) {
                reject();
                return;
            }
            let globber = new glob.Glob(absolutePath + "\/!(node_modules)\/\.git", {
                silent: true,
                absolute: true
            });
            globber.on('error', function(repositoryAbsolutePath) {
                console.log(repositoryAbsolutePath);
            });
            globber.on('end', (matches) => {
                resolve(matches);
            });
        });
    });
}

function insertOrSelectRepositories(database, repositoryPaths) {
    return new Promise((resolve, reject) => {

        let results = [];

        repositoryPaths.forEach(async (repositoryPath, index) => {
            let result = database.models.Repositories.findOrCreate({
                where: {
                    path: repositoryPath
                },
                defaults: { // set the default properties if it doesn't exist
                    path: repositoryPath
                }
            });
            results.push(await result);
            if(index >= repositoryPaths.length) {
                resolve(results);
            }
        });

    });
}

database.sync().then(() => {
    getRepositoryPaths('/repositories/')
        .then((repositoryPaths) => {
            console.log(1111);
            insertOrSelectRepositories(database, repositoryPaths).then((repositories) => {
                console.log(22222);
            });
            console.log(33333);
        })
        .catch(() => {
            // Only when folder/file doesnt exists
        });

});
return;
const restify = require('restify');
const git = require('simple-git/promise');



const sequelize = new Sequelize('database', 'username', 'password', {host: 'localhost',dialect: 'sqlite',
    // SQLite only
    storage: 'database.sqlite',
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

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
