/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  register: (req, res) => {
    User.register(req.body.name, req.body.password).then(
      () => {
        return res.json({ message: 'user registered' });
      },
      err => {
        return res.serverError(err);
      }
    );
  }
};
