const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Contact = sequelize.define(
    'Contact',
    {
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        linkedId: DataTypes.UUID,
        linkPrecedence: {
            type: DataTypes.STRING,
            defaultValue: 'primary',
        },
        deletedAt: DataTypes.DATE
    }
);

module.exports = { Contact }