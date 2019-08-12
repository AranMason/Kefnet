// middleware function to check for logged-in users
var isLoggedIn = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.status(403);
        res.send("Not logged in");
    }    
};

module.exports = {
    isLoggedIn
}