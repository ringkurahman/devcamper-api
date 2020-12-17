const express = require('express')
const bootcamps = require('./routes/bootcamps')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const morgan = require('morgan')



const app = express()

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mount router
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen( 
    PORT, console.log(`Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
