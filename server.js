const path = require('path')
const express = require('express')
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/error')
const colors = require('colors')
const connectDB = require('./config/db')


// Connect Database
connectDB()

const app = express()

// Body Parser
app.use(express.json())

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File Upload
app.use(fileupload())

// Set static folder for image files
app.use(express.static(path.join(__dirname, 'public')))

// Mount router
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen( 
    PORT, console.log(`Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

// Handle unhandled rejection from database
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server and exit process
    server.close(() => process.exit(1))
})
