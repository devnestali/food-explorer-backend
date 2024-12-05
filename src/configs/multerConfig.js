const multer = require('multer');
const path = require('path');

const UPLOAD_FOLDER = path.resolve(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const fileExtension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${fileExtension}-${uniqueFilename}`)
    }
});

const upload = multer({
    storage,
    limits: {
        fieldSize: 2 * 1024 * 1024,
    },
});

module.exports = upload;