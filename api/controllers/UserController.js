/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  register: (req, res) => {
    User.register(req.body.name, req.body.password).then(() => {
      res.json({message: 'user registered'})
    }, (err) => {
      res.err(err);
    });
  }
}

