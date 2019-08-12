// middleware function to check for logged-in users
var isLoggedIn = (req, res, next) => {

    // req.session.reload((err) => {

        console.log("Session Id: ", req.sessionID);
        console.log("Session: ", req.session);
        console.log("Cookie: ", req.cookies);

        // if(err){
        //     console.log("Error: ", err)
        // }

        next();
    // })   
};

module.exports = {
    isLoggedIn
}