const SECRET = require('../../config/env/secret');
const jwt = require('jsonwebtoken');

// TODO: Also check for session (because only JWT isn't the way to go?)
module.exports = function(req, res, next) {
  jwt.verify(
    req.cookies.AantekeningenAlligator_e4RYHTNIe3wG5PohI7xq,
    SECRET,
    function(err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.view('auth/login', {
            success: false,
            message: 'Your login session has expired. Please log in again.'
          });
        } else if (err.name === 'JsonWebTokenError') {
          return res.view('auth/login', {
            success: false,
            message:
              "It seems like you're not logged in, please try logging in."
          });
        } else {
          return res.view('auth/login', {
            success: false,
            message:
              "It seems like you're not logged in, please try logging in."
          });
        }
      } else {
        return next();
      }
    }
  );
};
