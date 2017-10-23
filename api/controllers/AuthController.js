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
      // Set redirect cookie if redirect is present
      sails.log('Redirect status: \n session = %s \n flag = %s', req.session.redirect);
      req.cookies.AantekeningenAlligator_redirect = req.session.redirect;
      // Set role of user
      const user = await User.findOne({name: username});
      req.session.role = user.role;
      sails.log('Role set: \n role = %s', req.session.role);
      // Send to succes page
      return res.view('auth/loginSucces', {redirect: req.session.redirect});
    } catch (err) {
      sails.log.error(new Error(err));
      if (err.server) {
        return res.serverError(err.server);
      } else {
        return res.view('auth/login', {success: false, message: 'Username or password incorrect'});
      }
    }
  },
  logout: function (req, res) {
    // Remove token
    res.cookie('AantekeningenAlligator_e4RYHTNIe3wG5PohI7xq', '', {httpOnly: true});
    // Remove authenticated status
    req.session.authenticated = false;
    // TODO: show pretty page
    return res.send('You are logged out');
  }
};
