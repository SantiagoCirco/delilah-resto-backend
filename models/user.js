const { DataTypes }= require("sequelize");
const db = require("../services/database");

const User = db.define(
    "user",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.BOOLEAN,
            default: false,
        },
        deleted:{
            type:DataTypes.BOOLEAN,
            default:false,
        }
    },
    {
        tableName: "user",
        timestamps: false,
    }
);
module.exports = User;