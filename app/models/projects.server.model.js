/**
 * Created by cba62 on 7/08/17.
 */

const db = require('../../config/db.js');

exports.getAll = function (done) {
    db.get().query('SELECT project_id, title, subtitle, imageUri FROM Project', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});
        return done(rows);
    })
};

exports.getOne = function (userId, done) {
    db.get().query('SELECT * FROM USERS WHERE user_id = ?', userId, function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});
        return done(rows);
    })
};

exports.insert = function (project, done) {
    let values = [project.title, project.subtitle, project.description, project.imageUri, project.rewardsId];
    let results2 = "";
    db.get().query('INSERT INTO Reward (id, amount, description) VALUES ?', values, function (err, result) {
        if (err) {
            return done(err);
        }
        else {
            values = [project.rewardsId, project.amount, project.rewardDescription];
            result2 = db.get().query('INSERT INTO Project (title, subtitle, description, imageUri, target, reward) VALUES ?', values, function (err, result2) {
                if (err) return done(err);
                return result2;
            });
        }
        done(result + result2);
    });
};

exports.alter = function (user_data, done) {
    let values = [user_data.username, user_data.user_id];

    db.get().query("UPDATE USERS SET username= ? WHERE user_id = ?", values, function (err, result) {
        if (err) return done(err);
        done(result);
    });
};

exports.remove = function (user_id, done) {

    db.get().query("DELETE FROM USERS WHERE user_id = ?", user_id, function (err, result) {
        if (err) return done(err);
        done(result);
    });
};