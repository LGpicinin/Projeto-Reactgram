const express = require('express')
const router = express.Router()
const path = require('path')


// routes
router.use("/api/users", require('./UserRoutes'))
router.use("/api/photos", require('./PhotoRoutes'))

// image routes
router.get("/uploads/users/:id", (req, res) => {
    let options = {
        root: path.join(__dirname, '../uploads')
    }
    const p = "/users/" + req.params.id
    res.sendFile(p, options)
})
router.get("/uploads/photos/:id", (req, res) => {
    let options = {
        root: path.join(__dirname, '../uploads')
    }
    const p = "/photos/" + req.params.id
    res.sendFile(p, options)
})


// test route
router.get("/", (req, res) => {
    res.send("API Working!")
})

module.exports = router