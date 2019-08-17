var Sequelize = require('sequelize');
const uuid = require('uuid/v4')

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize(process.env.DATABASE_URL);

const User = require('./user');
const Match = require('./match');
const Deck = require('./decks');

// setup User model and its fields.
var MatchParticipant = sequelize.define('match_participants', {
    turn_order: { //Deck Name
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          max: 20,
          min: 1,
          isInt: true
        }
    },
    won_match: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    hooks: {

    }
});

// MatchParticipant.belongsTo(Match);
Match.belongsToMany(User, {
	through: MatchParticipant
});

// MatchParticipant.belongsTo(User);
User.belongsToMany(Match, {
	through: MatchParticipant
});

MatchParticipant.hasOne(Deck);

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('match_participants table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = MatchParticipant;