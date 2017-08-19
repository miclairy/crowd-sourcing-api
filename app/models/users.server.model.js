/**
 * Created by cba62 on 7/08/17.
 */

const db = require('../../config/db.js');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

exports.insert = function (user_data, done) {
    let values = [user_data.username, user_data.location, user_data.email, user_data.password];

    db.get().query("INSERT INTO Users (username, location, email, password) VALUES (?, ?, ?, ?)", values, function (err, rows) {
        if (err) return done(err, 400);
        done(rows, 200);
    });
};

exports.user = function (user_id, done) {
    db.get().query("SELECT * from Users WHERE user_id = ?", user_id, function (err, rows) {
        if (err) return done(err, 400);
        if (rows.length == 0){
            return done(rows, 404);
        }
        done(rows, 200);
    });
};

exports.login = function(username, password, done){
    db.get().query("SELECT * from Users WHERE username = ? AND password = ?", [username, password], function (err, rows) {
        if (err) return done(err, 500);
        if (rows.length == 0){
            return done(rows, 400);
        }
        let token = jwt.sign(rows[0], 'RESTFULAPIs');
        let result = {
            "id": rows[0].user_id,
            "token": token
        };
        done(result, 200);
    })
};


exports.logout = function(done){
    done('', 500);
};

