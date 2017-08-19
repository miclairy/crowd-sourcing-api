/**
 * Created by cba62 on 7/08/17.
 */

const base = '/api/v1';
const projects = require('../controllers/projects.server.controller');

function isValidToken(x) {
  x = "000";
    if (x == "000"){
      return true;
    }
    return false;
}


const checkToken = (req, res, next) => {
  if (isValidToken(req.get('X-Authorization'))){
    next();
  } else {
    res.statusMessage = "Unauthorized - create account to create project";
    res.sendStatus(401);
  }
};

module.exports = function (app) {
  app.route(base + '/projects')
      .get(projects.list)
      .post(checkToken, projects.create);

  app.route(base + '/projects/:id')
      .get(projects.details)
      .put(projects.update);

  app.route(base + '/projects/:id/pledge')
      .post(projects.pledge);

    app.route(base + '/projects/:id/image')
        .get(projects.image)
};