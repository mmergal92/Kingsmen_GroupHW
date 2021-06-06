//ROUTES FOR USERS/NEW TO CREATE NEW USER

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//CREATE NEW USER
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
  });

router.post('/', (req, res) => {
    User.create(req.body, (error, createdUser) => {
        res.redirect('/')
    })
})

module.exports = router; 