//Dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const session = require('express-session');
const bcrypt = require('bcrypt');

//Create a new user
router.get('/new', (req,res) =>{
    res.render('sessions/new.ejs')
})

router.post('/', (req,res)=>{
    console.log(req.sessionID)
    
    User.find({"username": req.body.username}, (error, foundUser)=>{

        console.log(req.sessionID)
        const result = bcrypt.compareSync(`${req.body.password}`,`${foundUser[0].password}`)
        if (result) {
           
                req.session.currentUser = foundUser;
                return res.redirect('/room')
                
        } else {
            res.redirect('/sessions/new')
        }
        console.log(req.sessionID)
    })
    //     console.log(foundUser[0].password, req.body.password,)
    //     if (req.body.password === User.password){
    //         console.log(req.session)
    //         res.redirect('/room')
    //     }
    //     else{
    //         res.redirect('/')
    //         console.log('not a match')
    //     }
    // })
})

router.get('/logout', (req, res)=>{
    req.session.destroy( (err) =>{
        if (err){
            console.log("could not log out")
        } else{
            console.log(req.session, req.sessionID)
            console.log("Log out successful")
            res.redirect('/')
        }
    })
})

//export
module.exports = router;