require('express-async-errors');

const express = require('express');
const routes = require('./routes');

const path = require('path');
const uploadConfig = require('./configs/multerConfig');

const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());

app.use(express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes);


app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    console.log(error);
    return response.status(500).json({
        status: "error",
        message: "Ocorreu um erro interno. Por favor, entre em contato com o responsável."
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})