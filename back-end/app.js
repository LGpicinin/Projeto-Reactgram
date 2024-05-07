require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./routes/Router.js')

const port = process.env.PORT

const app = express()

// config JSON and form-data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use(router)

// upload images
app.use('./uploads', express.static(path.join(__dirname, './uploads')))

// solve cors
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

// db connection
require('./config/db.js')

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})