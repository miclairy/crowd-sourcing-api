/**
 * Created by cba62 on 7/08/17.
 */

const base = '/api/v1';
const users = require('../controllers/users.server.controller');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

function isValidToken(x) {
  x = "000";
    if (x == "000"){
      return true;
    }
    return false;
}

const checkToken = (req, res, next) => {

  jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
    if (!err){
      next()
    } else {
        res.statusMessage = "Unauthorized - already logged out";
        res.sendStatus(401);
    }
  });
};

module.exports = function (app) {
  app.route(base + '/users')
      .post(users.create);

  app.route(base + '/users/login')
      .post(users.loginUser);

  app.route(base + '/users/logout')
        .post(checkToken, users.logoutUser);

  app.route(base + '/users/:id')
      .get(users.getUser);

};