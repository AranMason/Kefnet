var express = require('express');
var router = express.Router();
var cors = require('cors');

var Deck = require('../models/decks');
var handler = require('../middleware/session-handler');
const {validFormats} = require('../models/constraints');

router.options('*', cors())

function validateDeckSubmission(req, res, next){
    if(!req.body.name && !req.body.format && !req.body.colour_identity){
        res.status(400).send("Missing arguments for deck submission")
    }
    else if(!/^(W?U?B?R?G?)$/.test(req.body.colour_identity)){
        res.status.send("Invalid Colour Identity");
    }
    else if(!validFormats.indexOf(req.body.format) > -1){
        res.status(400).send("Not a valid deck format, found " + req.body.format);
    }
    else {
        next()
    }
}

function retrieveProviderMetaData(url){
    return {
        name: "MTG Goldfish",
        provider_id: "1"
    };
}

router.post('/add', handler.validateCookie, handler.isLoggedIn, validateDeckSubmission, (req, res) => {

    var userId = req.session.user.id,
        name = req.body.name || `${req.session.user.username}'s Deck`,
        format = req.body.format;

    const meta = retrieveProviderMetaData(req.body.url);

    Deck.create({
        userId,
        name,
        url: req.body.url,
        provider: meta.name,
        provider_id: meta.provider_id,
        format
    }).then(res => {
        res.status(200).send("Created deck " + name);
    }).catch(err => {
        res.status(400).send("Failed to create deck: " + err);
    })

});

router.get('/users', handler.validateCookie, handler.isLoggedIn, (req, res) => {

    Deck.findAll({
        where: {
            userId: req.session.user.id
        }
    }).then(res => {
        console.log(res);

        res.json(res);
    })

})

router.get('/:deck_id', (req, res) => {

    Deck.findOne({
        where: {
            id: req.params.deck_id
        }
    })

})

module.exports = router;