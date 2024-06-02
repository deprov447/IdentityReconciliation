const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
const express = require('express');
const { identifyHandler } = require('./identifyHandler');
const app = express()

dotenv.config()

const sequelize = new Sequelize('mysql', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('DB Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

app.post('/identify', identifyHandler)

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API server started successfully on ${PORT}`)
})