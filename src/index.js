const dotenv = require('dotenv')
const express = require('express');
const { identifyHandler } = require('./identifyHandler');
const { init: db_init } = require('./db');
const app = express()

dotenv.config()

db_init()

app.use(express.json());
app.post('/identify', identifyHandler)

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API server started successfully on ${PORT}`)
})