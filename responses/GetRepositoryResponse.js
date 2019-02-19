'use strict';

module.exports.File = {

};

class GetRepositoryResponse {}

GetRepositoryResponse.File = {
    path: '',
        working_dir: ''
};

GetRepositoryResponse.Repository = {
        id: 0,
        path: '',
        branch: '',
        commits: {
            ahead: 0,
            behind: 0
        },
        files: {
            added: 0,
            not_added: 0,
            conflicted: 0,
            created: 0,
            deleted: 0,
            modified: 0,
            renamed: 0
        },
        /**
         * @type {Array.<GetRepositoryResponse.File>}
         */
        filesList: []
};

Object.freeze(GetRepositoryResponse);

module.exports = GetRepositoryResponse;
