const multer = require('multer');
const path = require('path');

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
    
        filename: (req, file, cb) => {
            const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const fileExtension = path.extname(file.originalname);
            const fileName = `${uniqueFilename}-${file.fieldname}${fileExtension}`;
            
            return cb(null, fileName)
        },
    }),
};

module.exports = {
    MULTER,
    UPLOAD_FOLDER,
    TMP_FOLDER,
};