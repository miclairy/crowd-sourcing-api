/**
 * Created by cba62 on 7/08/17.
 */

const base = '/api/v1';
const users = require('../controllers/users.server.controller');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const authentication = require('../controllers/authenication.server.controller');


module.exports = function (app) {
  app.route(base + '/users')
      .post(users.create);

  app.route(base + '/users/login')
      .post(users.loginUser);

  app.route(base + '/users/logout')
      .post(authentication.checkUserToken, users.logoutUser);

  app.route(base + '/users/:id')
      .get(users.getUser)
      .put(authentication.checkUserToken, users.update)
      .delete(authentication.checkUserToken, users.delete);

};