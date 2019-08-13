// middleware function to check for logged-in users
var validateCookie = (req, res, next) => {

    if(!req.cookie){
        res.status(403).send("No valid session found")
    }
    else if (req.cookie.user_sid !== req.session.user_sid){
        res.status(403).send("Invalid authentication");
    }
    else {
        next();
    }

    
};

var loginAttempt = (req, res, next) => {

    req.session.loginAttempt = (req.session.loginAttempt || 0) + 1;



    if(req.session.loginAttempt > 5){
        res.status(401).send("Too many login attempts")
    } else {
        next()
    }
}

var validateSignup = (req, res, next) => {

    var validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(req.body);

    var {
        username,
        email,
        password
    } = req.body;

    if(username.length < 6 && username.length > 32){
        res.status(400).send("Invalid Username");
    }
    else if(!validateEmail.test(email)){
        res.status(400).send("Invalid Email");
    }
    else if(password.length < 8){
        res.status(400).send("Invalid password");
    }
    else {
        next();
    }
}

module.exports = {
    validateCookie,
    loginAttempt,
    validateSignup
}