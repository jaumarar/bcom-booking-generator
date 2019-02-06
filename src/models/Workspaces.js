'use strict';
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('Workspaces', {
        'name': DataTypes.STRING
    });
};
