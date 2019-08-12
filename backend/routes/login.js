var express = require('express');
var router = express.Router();
var cors = require('cors');

var User = require('../models/user');

router.options('*', cors())

router.post('/', (req, res) => {
    var username = req.body.username,
        password = req.body.password;

    User.findOne({ where: { username: username } }).then(function (user) {

        if (!user || !user.validPassword(password)) {
            res.json({
                success: false
            });
        }  else {
            req.session.user = user.dataValues;
            res.json({
                success: true,
                user: user.dataValues
            });
        }
    });
});

router.get('/status', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.json({
            isLoggedIn: true,
            user: req.session.user
        })
    } else {
        res.json({
            isLoggedIn: false,
            user: {}
        })
        
    }
})

router.post('/signup', (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            // res.redirect('/login/dashboard');
        })
        .catch(error => {
            // res.redirect('/login/signup');
        });
    });


module.exports = router;