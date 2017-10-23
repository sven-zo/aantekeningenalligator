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
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      default: 'user'
    }
  },

  register: (name, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 15, (err, hash) => {
        if (err) reject (Error(err));
        User.create({
          name: name,
          password: hash
        }).exec((err, user) => {
          if (err) reject (Error(err));
          resolve();
        })
      })
    })
  }
};

