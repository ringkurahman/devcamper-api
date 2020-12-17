const express = require('express')
const dotenv = require('dotenv')
// Import Route files
const bootcamps = require('./routes/bootcamps')

// Import env vars
dotenv.config({ path: './config/config.env' })

const app = express()

// Mount router
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen( 
    PORT, console.log(`Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
