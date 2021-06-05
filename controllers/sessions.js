//Dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const session = require('express-session');

//Create a new user
router.get('/new', (req,res) =>{
    res.render('sessions/new.ejs')
})

router.post('/', (req,res)=>{
    User.find({"name": req.body.name}, (error, foundUser)=>{
        const user = foundUser[0]
        console.log(user)
        if (req.body.password === user.password){
            console.log(req.session)
            res.redirect('/room')
        }
        else{
            res.redirect('/')
            console.log('not a match')
        }
    })
})

router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/')
})

//export
module.exports = router;