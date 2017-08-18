/**
 * Created by cba62 on 6/08/17.
 */

const express = require('express'),
    bodyParser = require('body-parser');

const base = '/api/v1';
const projects = require('../app/controllers/projects.server.controller');

module.exports = function(){
    const app = express();

    app.route(base + '/projects/:id/image')
        .put(projects.updateImage);

    app.use(bodyParser.json({
        extended: true
        }
    ));

    require('../app/routes/projects.server.routes.js')(app);

    return app;
};