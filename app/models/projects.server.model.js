/**
 * Created by cba62 on 7/08/17.
 */

const db = require('../../config/db.js');

exports.getAll = function (done) {
    db.get().query('SELECT id, title, subtitle, imageUri FROM Project', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});
        return done(rows);
    })
};

exports.getDetails = function (project_id, done) {
    db.get().query('SELECT * FROM Project WHERE id = ?', project_id, function (err, rows) {
        if (err) return done(err);
        return done(rows);
    })
};

exports.insert = function (project, done) {
    let rewards = "";

    let values = [project.title, project.subtitle, project.description, project.imageUri, project.target, 5];
    db.get().query("INSERT INTO Project (title, subtitle, description, imageUri, target, imageId) VALUES (?, ?, ?, ?, ?, ?)", values, function (err, rows) {
        if (err) return done(err);
        done(rows)
    });

    // for (let i = 0; i < project.rewards.length; i++) {
    //     let values = [project.rewards[i].rewardsId, project.rewards[i].amount, project.rewards[i].rewardDescription, rows.];
    //     db.get().query("INSERT INTO Reward (reward_id, amount, description) VALUES (?, ?, ?)", values, function (err, result) {
    //         if (err) {
    //             return done(err);
    //         }
    //         rewards += result;
    //     });
    // }


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