const multer = require("multer");
const path = require("path");
const fs = require("fs");
const destinationDirectory = path.join(__dirname, "../images/temp");

if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destinationDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.fieldname === "Image") {
            cb(null, true);
        } else {
            cb(new Error('Unexpected Field'));
        }
    }
});

module.exports = upload;
