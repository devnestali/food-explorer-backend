require('express-async-errors');

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const path = require('path');
const multerConfig = require('./configs/multerConfig');

const AppError = require('./utils/AppError');

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static(multerConfig.UPLOAD_FOLDER));

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