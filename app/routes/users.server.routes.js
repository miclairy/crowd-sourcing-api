/**
 * Created by cba62 on 7/08/17.
 */

const base = '/api/v1';
const users = require('../controllers/users.server.controller');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


const checkToken = (req, res, next) => {

  jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
    if (!err){
      req.authId = decoded.user_id;
      next()
    } else {
        res.status(401);
        res.statusMessage = "Unauthorized - not logged in";
        res.json(err);
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
      .get(users.getUser)
      .put(checkToken, users.update)
      .delete(checkToken, users.delete);

};