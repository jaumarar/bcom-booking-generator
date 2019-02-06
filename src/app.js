#!/usr/bin/env node
const database = require('./services/database');
const routing = require('./services/routing');
const glob = require('glob');
const fs = require('fs');
const git = require('simple-git/promise');

function getRepositoryPaths(absolutePath) {
    return new Promise((resolve, reject) => {
        // Remove trail slash
        absolutePath = absolutePath.replace(/\/$/g, '');

        fs.exists(absolutePath, (exists) => {
            if (!exists) {
                reject();
                return;
            }
            let globber = new glob.Glob(absolutePath + "\/**\/!(node_modules)\/\.git", {
                silent: true,
                absolute: true,
                strict: false
            });
            globber.on('error', function(repositoryAbsolutePath) {
                //console.log(repositoryAbsolutePath);
            });
            globber.on('end', (matches) => {

                for (let i in matches) {
                    matches[i] = matches[i].replace(/\/\.git$/g, '');
                }

                resolve(matches);
            });
        });
    });
}

function insertOrSelectRepositories(database, repositoryPaths) {
    return new Promise(async (resolve, reject) => {

        let results = [];
        let repo = {};

        for (let i = 0; i < repositoryPaths.length; i++) {
            repo = database.models.Repositories.findOrCreate({
                where: {
                    path: repositoryPaths[i]
                }
            });

            repo = await repo;

            results.push(repo[0]);
            break;
        }

        resolve(results);
    });
}

function gitInfo(repositories) {
    return new Promise(async (resolve, reject) => {
        for (let i in repositories) {
            let st = git(repositories[i].path).status();

            repositories[i]._info = await st;
        }

        resolve(repositories);
    });
}

function scanRepositories(path) {
    return new Promise((resolve) => {
        getRepositoryPaths(path)
            .then((repositoryPaths) => {
                return insertOrSelectRepositories(database, repositoryPaths)
            })
            .then((repositories) => {
                return gitInfo(repositories);
            })
            .then((repos) => {
                resolve(repos);
            })
            .catch((e) => {

            });
    });
}

database.sync().then(() => {
    return routing.listen();
}).then(() => {

    scanRepositories('/home/jaume/Desarrollo/DesarrolloDev')
        .then((repositories) => {
            console.log(repositories);
        });
});
