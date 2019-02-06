'use strict';
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('WorkspaceRepositories', {},{
        classMethods: {
            associate: function(models) {
                models.Workspaces.belongsToMany(models.Repositories, { through: models.WorkspaceRepositories });
                models.Repositories.belongsToMany(models.Workspaces, { through: models.WorkspaceRepositories });
            }
        }
    });
};
