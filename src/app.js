#!/usr/bin/env node
const database = require('./services/database');
const routing = require('./services/routing');

database.sync().then(() => {
    return routing.listen();
}).then(() => {

});
