'use strict';
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
//const config    = require(__dirname + '/../config/config.js')[env];
const db        = {models: {}};

/*if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}*/

var sequelize = new Sequelize('database', 'username', 'password', {host: 'localhost',dialect: 'sqlite',
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

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, file));
        db.models[model.name] = model;
    });

Object.keys(db.models).forEach(modelName => {
    if (typeof db.models[modelName].associate === 'function') {
        db.models[modelName].associate(db);
    }
});

db.sync = function() {
    return sequelize.sync({force: true});
}

module.exports = db;
