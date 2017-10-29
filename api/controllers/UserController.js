/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const rp = require('request-promise-native');

module.exports = {
  register: async function(req, res) {
    try {
      if (! req.body.password === req.body.passwordRepeat) {
        const validationMsg = "Wachtwoorden komen niet overeen!";
        return res.view('auth/register', {validationMsg});
      }
      await User.register(req.body.name, req.body.password, req.body.displayName);
      return res.send('User created!');
    } catch (err) {
      sails.log(err);
      if (err.code === 'E_VALIDATION') {
        const validationMsg = "Alle velden zijn verplicht."
        return res.view('auth/register', {validationMsg});
      }
      return res.serverError(err);
    }
  },
  userPage: async function(req, res) {
    if (req.method === 'POST') {
      try {
        await User.update({ name: req.session.username }, {
          displayName: req.body.displayName
        });
        return res.send('Display name updated :)');
      } catch (err) {
        if (err.code === 'E_VALIDATION') {
          const validation = "Alle velden zijn verplicht.";
          return res.view('user/userPage', { validation });
        }
      }
    } else {
      try {
        const user = await User.findOne({name: req.session.username});
        return res.view('user/userPage', {user});
      } catch(err) {
        return res.negotiate(err);
      }
    }
  },
  adminPage: function(req, res) {
    return res.view('user/adminPage');
  }
};
