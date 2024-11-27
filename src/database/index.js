const knexConfig = require('../../knexfile');

const knex = require('knex');

const dbConnection = knex(knexConfig.development);

module.exports = dbConnection;