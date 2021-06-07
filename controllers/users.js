//ROUTES FOR USERS/NEW TO CREATE NEW USER

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//CREATE NEW USER
router.get('/new', (req, res) => {
    console.log(req.sessionID)
    if(req.sessionID){
        res.render('users/new.ejs')}
        else{
            console.log(req.sessionID)
            res.redirect('/')
        }
  });

  router.post('/', (req,res)=>{
    // User.create(req.body, (error, createdLog) => {
    //     res.redirect('/')
    // })
    const hash = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    const newUser = new User({
        username: req.body.username,
        password: hash,
        //password: req.body.password,
        messages: req.body.messages
    });
    newUser.save();
    console.log('new user:' + newUser);
    res.redirect('/')
})

module.exports = router; 