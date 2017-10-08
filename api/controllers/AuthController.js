/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const SECRET = require('../../config/env/secret');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: async function (req, res) {
    const errorView = () => res.view('auth/login', {success: false, message: 'Username or password incorrect'});
    try {
      const username = req.body.name;
      const password = req.body.password;
      const user = await User.findOne({name: username});
      if (!user) return errorView();
      else {
        const dbpassword = user.password;
        const result = await bcrypt.compare(password, dbpassword);
        if (!result) return errorView();
        else {
          const token = jwt.sign({user: username}, SECRET, {expiresIn: '1 days'});
          res.cookie('AantekeningenAlligator_e4RYHTNIe3wG5PohI7xq', token, {httpOnly: true});
          return res.view('auth/loginSucces');
        }
      }
    } catch (err) {
      return res.negotiate(err);
    }
  }
};
