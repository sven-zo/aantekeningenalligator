module.exports = async function(req, res, next) {
  // Verify JSON web token
  let token;
  try {
    token = await AuthService.verifyToken({
      cookie: req.cookies.AantekeningenAlligator_e4RYHTNIe3wG5PohI7xq
    });
  } catch (err) {
    return res.view('auth/login', err);
  }
  // Verify moderator role
  let roleSuccess;
  if (! req.session.role) {
    roleSuccess = false;
    return res.view('auth/login', err);
  } else if (req.session.role === 'admin') {
    roleSuccess = true;
  } else {
    roleSuccess = false;
    return res.forbidden();
  }
  sails.log('User %s authenticated as role ADMIN \n Status information: token = %s | session = %s', req.session.username, token.success, req.session.authenticated);
  if (! req.session.authenticated) {
    // Token is correct, but session is gone.
    return res.view('auth/login', {success: false, message: `Please confirm your identity as ${req.session.username} by logging in again.`});
  }
  if (token.success && roleSuccess && req.session.authenticated) return next();
}
