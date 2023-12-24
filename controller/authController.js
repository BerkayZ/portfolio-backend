const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
const db = require("../utils/database");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.users.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                code: "user_not_found"
            });
        }

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                if (user.active) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        surname: user.surname,
                    }, process.env.SECRET_KEY, {
                        expiresIn: "180d"
                    });

                    return res.status(200).json({
                        status: "success",
                        token: token,
                    });
                } else {
                    return res.status(401).json({
                        status: "error",
                        message: "User is not active",
                        code: "user_not_active"
                    });
                }
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Auth Failed",
                    code: "auth_failed"
                });
            }
        } else {
            return res.status(401).json({
                status: "error",
                message: "Auth Failed",
                code: "auth_failed"
            });
        }

    } catch (error) {
        logger.log.error("Error at login > " + error);
        console.error("Error at login > " + error);
    }
}

module.exports = {
    login
}
