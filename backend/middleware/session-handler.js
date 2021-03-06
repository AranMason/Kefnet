// middleware function to check for logged-in users
var validateCookie = (req, res, next) => {

    if(!req.cookies){
        res.status(403).send("No valid session found, please try logging in again");
    }
    // else if (req.cookies.user_sid !== req.session.user_sid){
    //     console.log(req.cookies, req.session);
    //     res.status(403).send("You do not appear to be logged in");
    // }
    else {
        next();
    }
};


var isLoggedIn = (req, res, next) => {
    if(!req.session.user){
        res.status(401).send("You need to be logged in");
    }
    else {
        next()
    }
}

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
    validateSignup,
    isLoggedIn
}