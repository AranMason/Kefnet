var Sequelize = require('sequelize');
const uuid = require('uuid/v4')

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize(process.env.DATABASE_URL);

const User = require('./user');

var { validFormats, validProvidersList } = require('./constraints');

// setup User model and its fields.
var Deck = sequelize.define('decks', {
    id: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuid()
    },
    name: { //Deck Name
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [4, 255]
        }
    },
    public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    url:{
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    provider: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isProvider: (val) => {
                if(!(!val || validProvidersList.indexOf(val) > -1)){
                    throw new Error("Not a valid provider, if there is no provider, please use Null")
                }
            } // Validating provider using 
        }
    },
    provider_id: {
        type: Sequelize.STRING
    },
    format: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [validFormats]
        }
    },
    colour_identity: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
            is: /^(W?U?B?R?G?)$/
        }
    }
}, {
    hooks: {

    }
});

User.hasMany(Deck);
Deck.belongsTo(User);

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('decks table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = Deck;