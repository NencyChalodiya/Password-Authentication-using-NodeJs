const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//User model
const User = require('../models/User');


//login page
router.get('/login', (req, res) => {
    res.render("login");

});

//Registration page
router.get('/register', (req, res) => {
    res.render("register");

});

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];


    //Check require fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }
    //password not equal
    if (password !== password2) {
        errors.push({ msg: "Password not match" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" });
    }

    if (errors.length > 0) {
        // console.log(errors);
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2

        })
    } else {
        // res.send('Send successful');
        //validation pass
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: "Email is already registered " });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    console.log(newUser);
                    res.send("Hello");

                }
            })


    }
})
module.exports = router;