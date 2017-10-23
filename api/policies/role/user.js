module.exports = async function(req, res, next) {
  let token;
  // Verify JSON web token
  try {
    token = await AuthService.verifyToken({
      cookie: req.cookies.AantekeningenAlligator_e4RYHTNIe3wG5PohI7xq
    });
  } catch (err) {
    return res.view('auth/login', err);
  }
  sails.log('User %s authenticated as role USER /n Status information: token = %s | session = %s', req.session.username, token.success, req.session.authenticated);
  if (! req.session.authenticated) {
    // Token is correct, but session is gone.
    return res.view('auth/login', {success: false, message: `Please confirm your identity as ${req.session.username} by logging in again.`, prefill: req.session.username});
  }
  if (token.success && req.session.authenticated) return next();
}
