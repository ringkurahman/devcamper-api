const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models
const Bootcamp = require('./models/Bootcamp')

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})

// Read JSON files from data folder
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

// Import All data into database
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

// Delete All data from database
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log('Data Destroyed...'.red.inverse)
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

// Check Import(-i) or Destroy(-d) when run command
if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}