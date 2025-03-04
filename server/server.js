 const express = require('express');
 const path = require('path');
 const mongooseConnection = require('./config/connection')
 const routes = require('./controllers')


const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())

// app.use(routes)

mongooseConnection.once('connected', () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
})