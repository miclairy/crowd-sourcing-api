/**
 * Created by cba62 on 7/08/17.
 */

const base = '/api/v1';
const projects = require('../controllers/projects.server.controller');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


const checkToken = (req, res, next) => {

    jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
        if (!err){
            req.authId = decoded.user_id;
            next()
        } else {
            res.status(401);
            res.statusMessage = "Unauthorized - create account to update project";
            res.json(err);
        }
    });
};

module.exports = function (app) {
  app.route(base + '/projects')
      .get(projects.list)
      .post(checkToken, projects.create);

  app.route(base + '/projects/:id')
      .get(projects.details)
      .put(projects.update);

  app.route(base + '/projects/:id/pledge')
      .post(checkToken, projects.pledge);

  app.route(base + '/projects/:id/image')
        .get(projects.image)
        .put(upload.single("Image"), projects.updateImage);

  app.route(base + '/projects/:id/rewards')
      .get(projects.rewards)
      .put(checkToken, projects.updateRewards)
};