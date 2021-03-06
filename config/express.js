/**
 * Created by cba62 on 6/08/17.
 */

const express = require('express'),
    bodyParser = require('body-parser');

module.exports = function(){
    const app = express();

    app.use(bodyParser.json({
        extended: true
        }
    ));
    require('../app/routes/projects.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);

    return app;
};