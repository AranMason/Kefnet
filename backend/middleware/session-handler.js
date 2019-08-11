// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/login/dashboard');
    } else {
        next();
    }    
};

module.exports = {
    sessionChecker
}