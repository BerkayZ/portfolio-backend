const dotenv = require('dotenv');
const db = require("../utils/database");
const logger = require("../utils/logger");
const utils = require("../utils/utils");
dotenv.config();


const saveContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = await db.contacts.create({
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        return res.status(200).json({
            status: "success",
            contact: contact
        });
    } catch (err) {
        logger.log.error(err);
        return res.status(500).json({
            status: "error",
            message: "Server error",
            code: "server_error"
        });
    }
}

const getContacts = async (req, res) => {
    try {
        utils.getUserByToken(req).then(async user => {
            const page = (parseInt(req.query.page) - 1) || 0;
            const items_per_page = req.query.items_per_page || 20;

            const { limit, offset } = utils.getPagination(page, items_per_page);


           db.contacts.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'DESC']
                ]
            }).then(contacts => {
               const pagingData = utils.getPagingData(contacts, page, limit);
               return res.status(200).json({
                   status: "success",
                   data: contacts.rows,
                   pagingData
               });
           }).catch(error => {
                return res.status(401).json(error);
           });
        }).catch(error => {
            return res.status(401).json(error);
        });
    } catch (err) {
        logger.log.error(err);
        return res.status(500).json({
            status: "error",
            message: "Server error",
            code: "server_error"
        });
    }
}

const setReadContact = async (req, res) => {
    try {
        utils.getUserByToken(req).then(async user => {
            const { id } = req.params;

            const contact = await db.contacts.findOne({
                where: {
                    id: id
                }
            });

            if (contact) {
                contact.isRead = true;
                contact.save();

                return res.status(200).json({
                    status: "success",
                    contact: contact
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    message: "Contact not found",
                    code: "contact_not_found"
                });
            }
        }).catch(error => {
            return res.status(401).json(error);
        });
    } catch (err) {
        logger.log.error(err);
        return res.status(500).json({
            status: "error",
            message: "Server error",
            code: "server_error"
        });
    }
}

module.exports = {
    saveContact,
    getContacts,
    setReadContact
}
