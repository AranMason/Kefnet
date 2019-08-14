var express = require('express');
var router = express.Router();
var cors = require('cors');

var Match = require('../models/match');
var MatchParticipants = require('../models/match_participants');

var handler = require('../middleware/session-handler');
const {validFormats} = require('../models/constraints');

router.options('*', cors())

module.exports = router;