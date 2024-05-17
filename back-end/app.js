require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./routes/Router.js')

const port = process.env.PORT

const app = express()

// solve cors
app.use(cors({origin: "http://localhost:5173"}))

// config JSON and form-data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use(router)

// upload images
app.use('./uploads', express.static(path.join(__dirname, './uploads')))


// db connection
require('./config/db.js')

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})