const SECRET = require('../../config/env/secret');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  jwt.verify(req.cookies.AantekeningenAlligator_e4RYHTNIe3wG5PohI7xq, SECRET, function(err, decoded) {
    if (err) { return res.view('login', { success: false, message: 'It seems like you\'re not logged in, please try logging in.' }) } else {
      return next();
    }
  });
}
