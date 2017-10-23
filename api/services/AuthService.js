const SECRET = require('../../config/env/secret');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: function (options) {
    const cookie = options.cookie;
    return new Promise((resolve, reject) => {
      jwt.verify(cookie, SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject({
              success: false,
              message: 'Your login session has expired. Please log in again.'
            });
          } else if (err.name === 'JsonWebTokenError') {
            reject({
              success: false,
              message:
                "It seems like you're not logged in, please try logging in."
            });
          } else {
            reject({
              success: false,
              message:
                "It seems like you're not logged in, please try logging in."
            });
          }
        } else {
          resolve({
            success: true
          })
        }
      });
    })
  },
  // checkRole: function (options) {
  //   return new Promise((resolve, reject) => {
  //     if (options.req.session.role === options.role) {
  //       resolve({
  //         success: true
  //       });
  //     } else {
  //       reject({
  //         success: false,
  //         message: "No permission!"
  //       });
  //     }
  //   });
  // },
  checkPasswordOfUser: function (options) {
    const username = options.username;
    const password = options.password;
    return new Promise( async (resolve, reject) => {
      try {
        const user = await User.findOne({name: username});
        if (!user) reject({success: false, server: false, errCode: 1});
        else {
          const result = await bcrypt.compare(password, user.password);
          if (!result) reject({success: false, server: false, errCode: 2});
          else {
            resolve({success: true, server: false});
          }
        }
      } catch (err) {
        sails.log.error(new Error(err));
        reject({success: false, server: true, errCode: 3});
      }
    });
  },
  signToken: function (options) {
    const username = options.username;
    return new Promise( async (resolve, reject) => {
      try {
        const token = await jwt.sign({user: username}, SECRET, {expiresIn: '1 days'});
        resolve({success: true, server: false, token});
      } catch (err) {
        sails.log.error(new Error(err));
        reject({success: false, server: true, errCode: 4});
      }
    });
  }
}
