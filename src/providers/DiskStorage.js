const fs = require("fs");
const path = require("path");
const multerConfig = require("../configs/multerConfig");

class DiskStorage {
    async saveFile(file) {
        fs.promises.rename(
            path.resolve(multerConfig.TMP_FOLDER, file),
            path.resolve(multerConfig.UPLOAD_FOLDER, file)
        );

        return file;
    };

    async deleteFile(file) {
        const filePath = path.resolve(multerConfig.UPLOAD_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return 'Arquivo não existe';
        }

        await fs.promises.unlink(filePath);
    };
};

module.exports = DiskStorage;