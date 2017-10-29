/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  connection: 'db',
	attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string'
    },
    displayName: {
      type: 'string',
      required: true,
      unique: true
    },
    gems: {
      type: 'integer'
    }
  },
  register: (name, password, displayName) => {
    return new Promise( async (resolve, reject) => {
      try {
        sails.log('Hashing...');
        const hash = await bcrypt.hash(password, 15);
        sails.log('Done! Creating user...');
        await User.create({
          name,
          password: hash,
          displayName,
          gems: 0,
          role: 'user'
        });
        sails.log('Done!');
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }
};

