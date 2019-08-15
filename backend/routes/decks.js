var express = require('express');
var router = express.Router();
var cors = require('cors');

var Deck = require('../models/decks');
var handler = require('../middleware/session-handler');
const { validFormats, validProviders } = require('../models/constraints');

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

function getProviderHostName(url){

    switch(url.hostname){
        case 'mtggoldfish.com':
            return validProviders.MTG_GOLDFISH;

        case 'archidekt.com':
            return validProviders.ARCHIDEKT;

        case 'tappedout.net':
            return validProviders.TAPPEDOUT;

        default:
            return null;           
    }
}

function getProviderId(name, path){
    //Name is not used currently, but passed for future usage if more cases need to be addressed.
    return path.split('/')[2];
}

function retrieveProviderMetaData(data_url){

    const url = new URL(data_url);

    const name = getProviderHostName(url);
    const provider_id = getProviderId(name, url.pathname);

    if(!name || !provider_id)
        return null;

    return {
        name,
        provider_id
    };
}

router.post('/add', handler.validateCookie, handler.isLoggedIn, validateDeckSubmission, (req, res) => {

    var userId = req.session.user.id,
        name = req.body.name || `${req.session.user.username}'s Deck`,
        format = req.body.format;

    const meta = retrieveProviderMetaData(req.body.url);

    if(!meta){
        res.status(403).send("Unsupported deck provider")
    }
    else {
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
    }
});

router.get('/users', handler.validateCookie, handler.isLoggedIn, (req, res) => {

    Deck.findAll({
        where: {
            userId: req.session.user.id
        }
    }).then(res => {
        console.log(res);

        res.json(res);
    }).catch(err => {
        res.status(500).send(err);
    })

})

router.get('/formats', handler.validateCookie, (req, res) => {
    res.json({
        formats: validFormats
    })
})

router.route('/:deck_id')
    .get(handler.validateCookie, handler.isLoggedIn, (req, res) => {

        Deck.findOne({
            where: {
                id: req.params.deck_id
            }
        }).then(res => {

        }).catch(err => {
            res.status(500).send(err);
        })

    })
    .post(handler.validateCookie, handler.isLoggedIn, validateDeckSubmission, (req, res) => {
        Deck.update(req.body, {
            where: {
                id: req.params.deck_id,
                userId: req.session.id
            }
        }).then(res => {
            res.status(200).send("Deck Updated");
        }).catch(err => {
            res.status(500).send(err);
        })
    })
    .delete(handler.validateCookie, handler.isLoggedIn, (req, res) => {
        Deck.destroy({
            where: {
                id: req.params.deck_id,
                userId: req.session.user.id
            }
        }).then(res => {
            res.status(200).send(`${res.name} succesfully deleted!`);
        }).catch(err => {
            res.status(500).send(err);
        })
    })

module.exports = router;