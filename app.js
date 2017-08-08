/**
 * Created by cba62 on 6/08/17.
 */

const db = require("./config/db"),
    express = require('./config/express');

const app = express();

// Connect to MySql on start
db.connect(function (err) {
    if (err){
        console.log('Unable to connect to mysql');
        process.exit(1);
    } else {
        app.listen(8080, function () {
            console.log('Listening on port: ' + 8080);
        });
    }
});