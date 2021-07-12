const { DataTypes } = require("sequelize");
const db = require("../services/database");

const PayMethod = db.define(
    "paymethod",
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: "paymethod",
        timestamps: false, 
    }
);
module.exports = PayMethod;