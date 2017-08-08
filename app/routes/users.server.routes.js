/**
 * Created by cba62 on 7/08/17.
 */

const users = require('../controllers/user.server.controller');

module.exports = function (app) {
  app.route('/api/users')
      .get(users.list)
      .post(users.create);

  app.route('/api/users/:userId')
      .get(users.read)
      .put(users.update)
      .delete(users.delete);

  app.route('/api/conversations')
      .get(converstations.list)
      .post(converstations.create);

  app.route('/api/conversations/:id')
      .get(converstations.read)
      .put(converstations.edit)
      .delete(converstations.delete);

  app.route('/api/conversations/:id/messages')
      .get(messages.list)
      .post(messages.create);

  app.route('/api/conversations/:id/messages/:id')
      .get(messages.read);
};