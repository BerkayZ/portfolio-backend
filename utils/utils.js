const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const db = require("../utils/database");
const axios = require('axios');
dotenv.config();

const checkUserToken = (req) => {
    return new Promise((resolve, reject) => {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
            reject({
                status: "error",
                code: "provide_token",
                message: "Please provide the token",
            });
        }

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                reject({
                    status: "error",
                    code: "token_invalid",
                    message: err,
                });
            }
            resolve(decoded.id);
        });
    });
}

const getUserByToken = (req) => {
    return new Promise((resolve, reject) => {
        checkUserToken(req).then(async id => {
            db.users.findOne({
                where: {
                    id: id
                },
            }).then(user => {
                if (user && user.active) {
                    resolve(user);
                } else {
                    reject({
                        status: "error",
                        code: "user_error",
                        message: "User error",
                    });
                }
            });
        }).catch(err => {
            reject(err);
        });
    });
}

const getPagination = (page, size) => {
    try {
        const limit = size ? + size : 3;
        const offset = page ? page * limit : 0;

        return { limit, offset };
    } catch (e) {
        console.error("Error at getPagination > " + e);
        logger.log.error("Error at getPagination > " + e);
    }
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages, currentPage };
};



module.exports = {
    checkUserToken,
    getUserByToken,
    getPagination,
    getPagingData
}
