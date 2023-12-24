const dotenv = require('dotenv');
const db = require("../utils/database");
const logger = require("../utils/logger");
const utils = require("../utils/utils");
dotenv.config();

const getAllProjects = async (req, res) => {
    try {
        utils.getUserByToken(req).then(async user => {
            const projects = await db.projects.findAll();

            return res.status(200).json({
                status: "success",
                projects: projects
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

const getProjects = async (req, res) => {
    try {
        const projects = await db.projects.findAll({
            attributes: ['id', 'slug', 'title', 'description', 'image', 'createdAt', 'updatedAt'],
            where: {
                active: true
            }
        });

        return res.status(200).json({
            status: "success",
            projects: projects
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


const addProject = async (req, res) => {
    try {
        utils.getUserByToken(req).then(async user => {
            const {
                active,
                slug,
                title,
                description,
                image,
                content,
            } = req.body;

            if (!active || !slug || !title || !description || !image || !content) {
                return res.status(400).json({
                    status: "error",
                    message: "Please provide all fields",
                    code: "provide_all_fields"
                });
            }

            const project = await db.projects.create({
                active,
                slug,
                title,
                description,
                image,
                content,
            });

            return res.status(200).json({
                status: "success",
                project: project
            });
        }).catch(err => {
            return res.status(401).json(err);
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


const updateProject = async (req, res) => {
    try {
        utils.getUserByToken(req).then(async user => {
            try {
                const {
                    active,
                    slug,
                    title,
                    description,
                    image,
                    content,
                } = req.body;

                if (!slug || !title || !description || !image || !content) {
                    return res.status(400).json({
                        status: "error",
                        message: "Please provide all fields",
                        code: "provide_all_fields"
                    });
                }

                const project = await db.projects.update({
                    active,
                    slug,
                    title,
                    description,
                    image,
                    content,
                }, {
                    where: {
                        id: req.params.id
                    }
                });

                return res.status(200).json({
                    status: "success"
                });
            } catch (err) {
                logger.log.error(err);
                return res.status(500).json({
                    status: "error",
                    message: "Server error",
                    code: "server_error"
                });
            }
        }).catch(err => {
            return res.status(401).json(err);
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

const getProjectBySlug = async (req, res) => {
    try {
        const project = await db.projects.findOne({
            where: {
                slug: req.params.slug
            }
        });

        if (!project) {
            return res.status(404).json({
                status: "error",
                message: "Project not found",
                code: "project_not_found"
            });
        }

        return res.status(200).json({
            status: "success",
            project: project
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
    getProjects,
    addProject,
    updateProject,
    getProjectBySlug,
    getAllProjects
}
