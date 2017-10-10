/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  authenticate: async function (req, res) {
    const username = req.body.name;
    const password = req.body.password;
    try {
      const passwordCheck = await AuthService.checkPasswordOfUser({
        username, password
      });
      const token = await AuthService.signToken({
        username
      });
      res.cookie('AantekeningenAlligator_e4RYHTNIe3wG5PohI7xq', token.token, {httpOnly: true});
      req.session.authenticated = true;
      return res.view('auth/loginSucces');
    } catch (err) {
      sails.log.error(new Error(err));
      if (err.server) {
        return res.serverError(err.server);
      } else {
        return res.view('auth/login', {success: false, message: 'Username or password incorrect'});
      }
    }
  }
};
