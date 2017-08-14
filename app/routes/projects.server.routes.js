/**
 * Created by cba62 on 7/08/17.
 */

const base = '/api/v1';
const projects = require('../controllers/projects.server.controller');

module.exports = function (app) {
  app.route(base + '/projects')
      .get(projects.list)
      .post(projects.create);

  app.route(base + '/projects/:id')
      .get(projects.details)
      .put(projects.update);

  app.route(base + '/projects/:id/image')
      .get(projects.image)
      .put(projects.updateImage);

  app.route(base + '/projects/:id/pledge')
      .post(projects.pledge);
};