const { DataTypes} = require("sequelize");
const db = require("../services/database");

const Product = db.define(
    "product",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "product",
        timestamps: false,
    }
);

module.exports = Product;