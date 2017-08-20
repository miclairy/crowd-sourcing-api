/**
 * Created by cba62 on 7/08/17.
 */

const base = '/api/v1';
const projects = require('../controllers/projects.server.controller');
const authentication = require('../controllers/authenication.server.controller');

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function (app) {
  app.route(base + '/projects')
      .get(projects.list)
      .post(authentication.checkCreateToken, projects.create);

  app.route(base + '/projects/:id')
      .get(projects.details)
      .put(authentication.checkUpdateToken, projects.update);

  app.route(base + '/projects/:id/pledge')
      .post(authentication.checkPledgeToken, projects.pledge);

  app.route(base + '/projects/:id/image')
        .get(projects.image)
        .put(authentication.checkUpdateToken, upload.single("image"), projects.updateImage);

  app.route(base + '/projects/:id/rewards')
      .get(projects.rewards)
      .put(authentication.checkUpdateToken, projects.updateRewards);
};