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
  }
}
