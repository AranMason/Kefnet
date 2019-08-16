var express = require('express');
var router = express.Router();
var cors = require('cors');

var Match = require('../models/match');
var MatchParticipants = require('../models/match_participants');

var handler = require('../middleware/session-handler');
const { validFormats } = require('../models/constraints');

router.options('*', cors())

// Create a new match
router.post('/add', handler.validateCookie, handler.isLoggedIn, validateMatch, validateParticipants, (req, res) => {

})

// Gets a match
router.get('/:match_id', handler.validateCookie, handler.isLoggedIn, (req, res) => {
	//Case where user is logged in
	Match.findAll({
		include: [{
			model: User,
			where: {
				id: req.session.user.id //TODO: Allow case where not logged in?
			}
		}],
		where: {
			id: req.params.match_id
		}
	}).then(res => {
		const value = res.map(item => {
			return item.dataValue
		})

		res.json({
			match: value
		})

	}).catch(err => {
		console.error(err);
		res.status(500).send(err);
	})
});

//Update a match
router.post('/update/:match_id', handler.validateCookie, handler.isLoggedIn, validateMatch, validateParticipants, (req, res) => {

})




function validateMatch(req, res, next){

	const data = req.body;

	if(!data.format){
		res.status(403).send("No format found")
	}
	// else if(!data.partcipants || data.partcipants.length < 2){
	// 	res.status(403).send("A match needs at least two participants")
	// }
	else {
		next()
	}
}

function validateParticipants(req, res, next){
	const partcipants = req.body.partcipants

	if(!partcipants || partcipants.length < 2){
		req.send(403).send("A match needs at least two participants");
		return;
	}

	let turns = [];

	for(var i = 0; i < partcipants.length; i++){
		const player = partcipants[i];

		if(!player.deckId){
			req.send(403).send(`${player.id} requires a deck ID`)
		}
		else if(!player.turn){

		}
	}

	next();
}

module.exports = router;