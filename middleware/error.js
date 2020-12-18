const ErrorResponse = require('../utils/errorResponse')


const errorHandler = (err, req, res, next) => {
    const error = { ...err }
    error.message = err.message

    // Log to console for Dev
    console.log(err.stack.red)

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
}

module.exports = errorHandler