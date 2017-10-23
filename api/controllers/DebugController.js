module.exports = {
  login: async function (req, res) {
    try {
      const debug = await AuthService.checkPasswordOfUser({
        username: 'Sven',
        password: 'test'
      });
      return res.send(debug);
    } catch (err) {
      return res.send(err);
    }
  },
  token: async function (req, res) {
    try {
      const debug = await AuthService.signToken({
        username: 'Sven'
      });
      return res.send(debug);
    } catch (err) {
      return res.send(err);
    }
  },
  adminRole: function(req, res) {
    return res.send('This is a controller action only admins can access.');
  },
  modRole: function(req, res) {
    return res.send('This is a controller action only moderators or admins can access.');
  },
  userRole: function(req, res) {
    return res.send('This is a controller action only logged in users can access.');
  }
}
