var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var cors = require('cors');

// console.log(process.env)

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    // console.log("Loading Dev .env")
    var dotenv = require('dotenv');
    dotenv.config();
}



var Session = require('./middleware/session-handler')


// invoke an instance of express application.
var app = express();

// set our application port
app.set('port', 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // path: '/',
        // sameSite: false,
        // secure: true,
        expires: 1800000 // 30 Min
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

var login = require('./routes/login');
var index = require('./routes');
var deck = require('./routes/decks');
var match = require('./routes/match');

app.use('/', index);
app.use('/login', login);
app.use('/deck', deck);
app.use('/match', match);

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`))

module.exports = app; 