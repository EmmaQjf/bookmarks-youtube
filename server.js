require('dotenv').config()
require('./config/database.js')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use((req, res, next) => {
    res.locals.data = {},
    next()
})

app.use(logger('combined'));

app.use(favicon(path.join(__dirname, 'build','favicon.ico' )))

app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/users', require('./routes/api/userRoute.js'))
app.use('/api/bookmarks', require('./routes/api/bookmarkRoute.js'))

//READ THIS PART
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build','index.html'))
})

app.listen(PORT, () => {
    console.log(`I am listening on Port: ${PORT}`)
})