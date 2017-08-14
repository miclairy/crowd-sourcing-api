/**
 * Created by cba62 on 6/08/17.
 */

const express = require('express'),
    bodyParser = require('body-parser');

module.exports = function(){
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: true
        }
    ));

    require('../app/routes/projects.server.routes.js')(app);

    return app;
};