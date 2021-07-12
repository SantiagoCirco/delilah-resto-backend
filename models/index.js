const PayMethod = require("./payMethod");
const Order = require("./order");
const OrderHasProduct = require("./order-has-product");
const Product = require("./product");
const User = require("./user");


User.hasMany(Order, {
    foreignKey: "user_id",
});

Order.belongsTo(PayMethod, {
    foreignKey: "paymethod_id",
});

Order.belongsTo(User, {
    foreignKey: "user_id",
});

Order.belongsToMany(Product, {
    through: OrderHasProduct,
});

module.exports = {
    PayMethod,
    Order,
    OrderHasProduct,
    Product,
    User,
};