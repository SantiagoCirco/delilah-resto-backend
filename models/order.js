const { DataTypes } = require("sequelize");
const db = require("../services/database");
const PayMethod = require("./payMethod");
const User = require('./user');

const Order = db.define(
    "order",
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(["canceled", "delivering", "preparing", "accepted", "placed", "delivered"]),
            allowNull: true,
            defaultValue: "placed",
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: User,
                key: "id",
            },
        },
        paymethodId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PayMethod,
                key: "id",
            },
        }
    },
    {
        tableName: "order",
        timestamps: false,
        underscored: true,
    }
);
module.exports = Order;