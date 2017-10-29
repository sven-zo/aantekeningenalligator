module.exports = function(req, res, next) {
    if (req.session.gems > 5) {
      return next();
    } else {
      return res.send('You need to have more than 5 gems to do this! Good luck :)')
    }
};
