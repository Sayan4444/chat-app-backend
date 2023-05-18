const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    return res
        .status(err.statusCode)
        .json({
            success: false,
            error: err.message
        })
}

module.exports = errorHandler;