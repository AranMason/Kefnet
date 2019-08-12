var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.statusCode(404);
  res.send("Could not find resource, check your URL")
});

// route for user logout
router.post('/logout', (req, res) => {
  res.clearCookie('user_sid');
  res.status(200).send("Successfully Logged Out");
});

module.exports = router;
