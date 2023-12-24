const {Sequelize, DataTypes} = require('sequelize')
const logger = require('./logger.js');
const { Op } = require("sequelize");
require('dotenv').config();

const db_user = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT
const db_name = process.env.DB_NAME

const sequelize = new Sequelize(
    `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`, {
        dialect: "postgres",
    }
)

sequelize.authenticate().then(() => {
    console.log("Database connected");
    logger.log.info("Database connected");
}).catch((err) => {
    console.error(err);
    logger.log.error("Database connection error > " + err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user') (sequelize, DataTypes);
db.projects = require('../models/project') (sequelize, DataTypes);
db.contacts = require('../models/contact') (sequelize, DataTypes);


module.exports = db;
