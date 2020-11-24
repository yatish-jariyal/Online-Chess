const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post("/register", (req, res) => {
    const {name, email, password} = req.body

    const newUser = new User({
        name, email, password
    })

    newUser.save()
    .then(user => req.json(user))
    .catch(err => console.log(err))

})

module.exports = router