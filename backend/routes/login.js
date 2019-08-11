var express = require('express');
var router = express.Router();
var cors = require('cors');

var User = require('../models/user');

var Session = require('../middleware/session-handler');

router.options('*', cors())

router.route('/')
.get(Session.sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})
.post((req, res) => {
    var username = req.body.username,
        password = req.body.password;

    console.log(req.body)

    User.findOne({ where: { username: username } }).then(function (user) {

        console.log(user);

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

router.route('/signup')
    .get(Session.sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/signup.html');
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/login/dashboard');
        })
        .catch(error => {
            res.redirect('/login/signup');
        });
    });


module.exports = router;