var express = require('express');
var router = express.Router();
var cors = require('cors');

var User = require('../models/user');

var handler = require('../middleware/session-handler');

router.options('*', cors())

function sanitiseUser(user){
    return {
        id: user.id,
        username: user.username,
        email: user.email
    }
}

router.post('/', handler.loginAttempt, (req, res) => {

    var username = req.body.username,
        password = req.body.password;

    User.findOne({ where: { username: username } }).then(function (user) {

        if (!user || !user.validPassword(password)) {
            res.json({
                success: false
            });
        }  else {
            
            req.session.user = sanitiseUser(user.dataValues);
            req.session.user_sid = req.cookies.user_sid //Associate Cookie for validation
            req.session.loginAttempts = 0; //If they have managed to login, we don't need to keep tracking

            console.log("Successful Login", req.session, req.sessionID)
            res.json({
                success: true,
                user: req.session.user
            });
        }
    });
});

router.get('/status', (req, res) => {

    res.json({
        success: req.session.user ? true : false,
        user: req.session.user || {}
    })
})

router.post('/signup', handler.validateSignup, (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.json({
                success: true,
                user: sanitiseUser(user.dataValues)
            })
        })
        .catch(error => {
            res.status(500).send("Error: ", error);
        });
    });


module.exports = router;