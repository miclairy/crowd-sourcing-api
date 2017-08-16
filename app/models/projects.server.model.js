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
    db.get().query('SELECT * FROM Project WHERE id = ?', project_id, function (err, projects) {
        if (err) return done(err);

        db.get().query('SELECT * FROM Reward WHERE project = ?', project_id, function (err, rewards) {
            if (err) return done(err);

            db.get().query('SELECT * FROM Creators WHERE project = ?', project_id, function (err, creators) {
                if (err) return done(err);

                db.get().query('SELECT * FROM Backers WHERE project_id = ?', project_id, function (err, backers) {
                    if (err) return done(err);
                    let result = {};
                    let project = {};
                    let data = {};
                    let progress = {};
                    for (let i = 0; i < projects.length; i++) {
                        project.id = projects[i].id;
                        project.creationDate = projects[i].creationDate;
                        data.title = projects[i].title;
                        data.subtitle = projects[i].subtitle;
                        data.descrpition = projects[i].description;
                        data.imageUri = projects[i].imageUri;
                        data.target = projects[i].target;
                        progress.target = projects[i].target;
                        progress.currentPledged = projects[i].currentPledged;
                        progress.numberOfBackers = projects[i].numberOfBackers;
                    }

                    data.creators = [];
                    for (let j = 0; j < creators.length; j++) {
                        let creator = {};
                        creator.id = creators[j].id;
                        creator.name = creators[j].name;
                        data.creators.push(creator);
                    }

                    data.rewards = [];
                    for (let j = 0; j < rewards.length; j++) {
                        let reward = {};
                        reward.id = rewards[j].reward_id;
                        reward.amount = rewards[j].amount;
                        reward.description = rewards[j].description;
                        data.rewards.push(reward);
                    }
                    project.data = data;
                    result.project = project;
                    result.progress = progress;

                    result.backers = [];
                    for (let j = 0; j < rewards.length; j++) {
                        let backer = {};
                        if (backer.anonymous == 0) {
                            backer.name = backers[j];
                            backer.amount = backers[j];
                        }
                    }
                    result.backers = backers;
                    done(result);
                });
            });
        });
    });


};

exports.insert = function (project_data, done) {
   // console.log(project);
    let project = project_data;
    let values = [project.title, project.subtitle, project.description, project.imageUri, project.target, 5];


    db.get().query("INSERT INTO Project (title, subtitle, description, imageUri, target, imageId) VALUES (?, ?, ?, ?, ?, ?)", values, function (err, rows) {
        let result = rows;
        if (err) return done(err);
        for (let i = 0; i < project.rewards.length; i++) {

            insertRewards(project, result, i, function (success) {
                result = success;
                if (i == project.rewards.length - 1){
                    for (let i = 0; i < project.creators.length; i++) {

                        insertCreators(project, result, i, function (success) {
                            result = success;

                        });
                    }
                    if (i == project.creators.length - 1){
                        done(result);
                    }
                }
            });
        }

    });


};

function insertRewards (project, rows, i, success){
    rows.rewards = [];
    let values2 = [project.rewards[i].rewardsId, project.rewards[i].amount, project.rewards[i].rewardDescription, rows.insertId];

    db.get().query("INSERT INTO Reward (reward_id, amount, description, project) VALUES (?, ?, ?, ?)", values2, function (err, rewardResult) {
        if (err) {
            return success(err);
        }
        rows.rewards.push(rewardResult);
        success(rows);
    });
}

function insertCreators (project, rows, i, success){
    rows.creators = [];

    let values2 = [project.creators[i].name, project.creators[i].id, rows.insertId];

    db.get().query("INSERT INTO Creators (name, user_id, project) VALUES (?, ?, ?, ?)", values2, function (err, rewardResult) {
        if (err) {
            return success(err);
        }
        rows.creators.push(rewardResult);
        success(rows);
    });
}


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