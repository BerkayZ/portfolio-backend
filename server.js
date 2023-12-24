const dotenv = require('dotenv');
const express= require('express');
const cors = require('cors');
const {rateLimit}  = require('express-rate-limit');
const db = require("./utils/database.js");
const logger = require('./utils/logger.js');
const path = require("path");
const authRoutes = require('./route/authRoutes.js');
const projectRoutes = require('./route/projectRoutes.js');
const contactRoutes = require('./route/contactRoutes.js');
const uploadRoutes = require('./route/uploadRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

app.use(limiter);

if(process.env.SYNC_DATABASE === "true") {
    db.sequelize.sync({ force: true }).then(() => {
        console.warn("Database has been re-synced");
        logger.log.warning("Database has been re-synced");
    });
}

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/contacts', contactRoutes);
app.use('/upload', uploadRoutes);

app.listen(process.env.PORT,() => console.log('Server is running on port ' + process.env.PORT));
logger.log.info('Server is running on port ' + process.env.PORT);

module.exports = app;
