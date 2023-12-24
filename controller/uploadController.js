const multer = require("multer");
const path = require("path");
const logger = require("../utils/logger");
const utils = require("../utils/utils");

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/`);
        },
        filename: function (req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb( new Error('Please upload a valid image file'))
            }

            fileName = file.originalname;
            cb(null, fileName);
        },
    }),
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb( new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
});


const uploadImage = (req, res) => {
    try {
        utils.getUserByToken(req).then(async user => {
            if (user) {
                upload.single('image')(req, res, (err) => {
                    if(err) {
                        return res.status(400).json({
                            status: "error",
                            message: err.message,
                            code: "invalid_file"
                        });
                    } else {
                        return res.status(200).json({
                            status: "success",
                            message: "Image uploaded successfully",
                            code: "image_uploaded",
                            fileName: req.file.filename,
                            imageUrl: `${process.env.BASE_URL}/uploads/${req.file.filename}`
                        });
                    }
                });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Unauthorized",
                    code: "unauthorized"
                });
            }
        }).catch(error => {
            return res.status(401).json(error);
        });
    } catch (e) {
        logger.log.error(e);
        return res.status(500).json({
            status: "error",
            message: "Server error",
            code: "server_error"
        });
    }
}

module.exports = {
    uploadImage
}
