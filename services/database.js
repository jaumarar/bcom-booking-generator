'use strict';
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
//const config    = require(__dirname + '/../config/config.js')[env];

let sequelize = new Sequelize('database', 'username', 'password', {host: 'localhost',dialect: 'sqlite',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // SQLite only
    storage: __dirname + '/database.sqlite',
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

const database = {
    models: {
        Workspaces: {
            'name': Sequelize.STRING
        },
        Repositories: {
            'path': Sequelize.STRING
        },
        WorkspaceRepositories: {

        }
    },
    'sequelize': {}
};


for (let i in database.models) {
    database.models[i] = sequelize.define(i, database.models[i]);
}

database.models.Workspaces.belongsToMany(database.models.Repositories, { through: database.models.WorkspaceRepositories });
database.models.Repositories.belongsToMany(database.models.Workspaces, { through: database.models.WorkspaceRepositories });

database.sync = function() {
    // {force: true}
    return sequelize.sync();
}

module.exports = database;

/*if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}*/