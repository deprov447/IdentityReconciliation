const dotenv = require('dotenv')
const { Sequelize } = require('sequelize');
const mysql = require("mysql2/promise")

dotenv.config()

const sequelize = new Sequelize('IdentityReconciliation', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

async function init() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS IdentityReconciliation;`);
        await sequelize.authenticate();
        console.log('DB connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, init }