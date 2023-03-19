const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const  mongoose  = require('mongoose') ;

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const DB_HOST = "mongodb+srv://gortenzia1987:wUclAsFxkR8s2mUs@cluster0.gmqhz9g.mongodb.net/db-contacts?retryWrites=true&w=majority"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
   const { status = 500, message = 'Server error'} = err; // считываю error
  res.status(status).json({ message: err.message })
})

mongoose.connect(DB_HOST)
    .then(()=> console.log("Database connection successful"))
    .catch(error => console.log(error.message))

module.exports = app
