const { DataTypes } = require("sequelize");
const db = require("../services/database");
const Order = require("./order");
const Product = require("./product");

const OrderHasProduct = db.define(
    "order_has_product",
    {
        amount: {
            type: DataTypes.NUMBER,
            alloNull: false,
        },
        order_id: {
            field: "order_id",
            type: DataTypes.NUMBER,
            alloNull: false,
            references: {
                model: Order,
                key: "id",
            },
        },
        product_id: {
            field: "product_id",
            type: DataTypes.NUMBER,
            alloNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
    },
    {
        tableName: "order_has_product",
        timestamps: false, 
        underscored: true,
    }
);
module.exports = OrderHasProduct;