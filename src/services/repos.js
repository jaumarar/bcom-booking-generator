'use strict';
const database = require('./database');
const glob = require('glob');
const fs = require('fs');
const git = require('simple-git/promise');

const ex = {};

ex.getRepositoryPaths = function(absolutePath) {
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
};

ex.insertOrSelectRepositories = function(database, repositoryPaths) {
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
};

ex.gitInfo = function(repositories) {
    return new Promise(async (resolve, reject) => {
        for (let i in repositories) {
            let st = git(repositories[i].path).status();

            repositories[i]._info = await st;
        }

        resolve(repositories);
    });
};

ex.scanRepositories = function(path) {
    return new Promise((resolve, reject) => {
        ex.getRepositoryPaths(path)
            .then((repositoryPaths) => {
                return ex.insertOrSelectRepositories(database, repositoryPaths)
            })
            .then((repositories) => {
                return ex.gitInfo(repositories);
            })
            .then((repos) => {
                resolve(repos);
            })
            .catch((e) => {
                reject(e);
            });
    });
};

module.exports = ex;
