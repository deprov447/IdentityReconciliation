const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

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