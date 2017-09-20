/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const SECRET = require('../../config/env/secret');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

module.exports = {
  authenticate: (req, res) => {
    User.findOne({
      name: req.body.name
    }).exec((err, user) => {
      if (err) return res.serverError(err);

      if (!user) {
        return res.view('login', {success: false, message: 'Username or password incorrect'})
      } else if (user) {

        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) return res.serverError(err);
          if (!result) {
            return res.view('login', {success: false, message: 'Username or password incorrect'})
            } else {
              const token = jwt.sign({user: req.body.name}, SECRET, {
                expiresIn: '1 days'
              });
              return res.json({
                success: true,
                token: token
              });
            }
        })
      }
    })
  }
};

