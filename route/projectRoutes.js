const {
    getProjects,
    getAllProjects,
    addProject,
    updateProject,
    getProjectBySlug,
} = require('../controller/projectController');
const express = require('express');
const path = require("path");
const multer = require("multer");
const router = express.Router();

router.get('/get', getProjects);
router.post('/add', addProject);
router.get('/getAll', getAllProjects);
router.post('/update/:id', updateProject);
router.get('/get/:slug', getProjectBySlug);

module.exports = router;
