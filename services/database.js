const { Sequelize } = require('sequelize');
const db = require('../config').db;

module.exports = new Sequelize(
    db.database,
    db.user,
    db.password,
    {
        host: db.host,
        dialect: 'mysql',
    }
);

