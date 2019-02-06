'use strict';
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('Repositories', {
        'path': DataTypes.STRING
    });
};
