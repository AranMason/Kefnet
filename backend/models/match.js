var Sequelize = require('sequelize');
const uuid = require('uuid/v4')

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize(process.env.DATABASE_URL);

var { validFormats } = require('./constraints');

// setup User model and its fields.
var Match = sequelize.define('match', {
    id: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuid()
    },
    format: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            in: validFormats
        }
    }
    // TODO: Add League
}, {
    hooks: {

    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('matches table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = Match;