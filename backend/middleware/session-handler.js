// middleware function to check for logged-in users
var isLoggedIn = (req, res, next) => {

    // req.session.reload((err) => {

        // console.log("Session Id: ", req.sessionID);
        // console.log("Session: ", req.session);
        // console.log("Cookie: ", req.cookies);

        // if(err){
        //     console.log("Error: ", err)
        // }

        next();
    // })   
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
    isLoggedIn,
    loginAttempt,
    validateSignup
}