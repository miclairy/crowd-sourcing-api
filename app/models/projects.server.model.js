/**
 * Created by cba62 on 7/08/17.
 */

const db = require('../../config/db.js');
const fs = require('fs');

exports.getAll = function (startIndex, count, done) {
    if (count > 0) {
        db.get().query('SELECT id, title, subtitle, imageUri FROM Project LIMIT ?, ?',
            [parseInt(startIndex), parseInt(count) + parseInt(startIndex)], function (err, rows) {
                if (err) return done({"ERROR": "Error selecting"});
                return done(rows, 200);
            })
    } else {
        return done([], 200);
    }
};

exports.getDetails = function (project_id, done) {
    db.get().query('SELECT * FROM Project WHERE id = ?', project_id, function (err, projects) {
        if (err) return done(err, 400);

        db.get().query('SELECT * FROM Reward WHERE project = ?', project_id, function (err, rewards) {
            if (err) return done(err, 400);

            db.get().query('SELECT * FROM Creators WHERE project = ?', project_id, function (err, creators) {
                if (err) return done(err, 400);

                db.get().query('SELECT * FROM Backers WHERE project_id = ?', project_id, function (err, backers) {
                    if (err) return done(err, 400);
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
                        creator.user_id = creators[j].id;
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
                    done(result, 200);
                });
            });
        });
    });


};

exports.insert = function (project_data, done) {
    let project = project_data;
    let values = [project.title, project.subtitle, project.description, project.target, project.imageUri];

    db.get().query("INSERT INTO Project (title, subtitle, description, target, imageUri) VALUES (?)", [values], function (err, rows) {
        let result = rows;
        let project_id = rows.insertId;
        if (err) return done(err, 500);
        for (let i = 0; i < project.rewards.length; i++) {

            insertRewards(project, result, i, function (success, status) {
                if (status == 500){
                    return done(success, 500);
                }
                result = success;
                if (i == project.rewards.length - 1){
                    for (let i = 0; i < project.creators.length; i++) {

                        insertCreators(project, result, i, function (success) {
                            result = success;
                            if (i == project.creators.length - 1){
                                done(project_id, 201);
                            }
                        });

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
            return success(err, 500);
        }
        rows.rewards.push(rewardResult);
        success(rows, 201);
    });
}

function insertCreators (project, rows, i, success){
    rows.creators = [];

    let values2 = [project.creators[i].name, project.creators[i].id, rows.insertId];

    db.get().query("INSERT INTO Creators (name, user_id, project) VALUES (?, ?, ?)", values2, function (err, rewardResult) {
        if (err) {
            return success(err, 500);
        }
        rows.creators.push(rewardResult);
        success(rows, 201);
    });
}


exports.update = function (project_data, authId, done) {
    db.get().query('SELECT * FROM Creators WHERE project = ? && user_id = ?', [project_data.id, authId], function (err, creators) {
        if (err) return done(err, 500);
        if (creators.length == 0) {
            return done(creators, 403);
        } else {
            db.get().query("UPDATE Project SET open= ? WHERE id = ?", [project_data.open, project_data.id], function (err, result) {
                if (err) return done(err, 400);
                done(result, 201);
            });
        }
    });
};


exports.setImage = function (data, done) {
    db.get().query('SELECT * FROM Creators WHERE project = ? && user_id = ?', [data.project_id, data.authId], function (err, creators) {
        if (err) return done(err, 500);
        if (creators.length == 0) {
            return done(creators, 403);
        } else {

            db.get().query("UPDATE Project SET imageUri = ? WHERE id = ?", [data.imageFilePath, data.id], function (err, result) {
                if (err) return done(err, 400);
                done(result, 201);

            });
        }
    });
};


exports.getImage = function (data, done) {

    db.get().query("SELECT imageUri FROM Project WHERE id = ?", [data], function (err, result) {
        if (err) return done(err, 400);
        done(result[0].imageUri, 200);
    });
};

exports.getRewards = function (project_id, done) {
    db.get().query('SELECT * FROM Reward WHERE project = ?', project_id, function (err, result) {
        if (err) return done(err, 500);
        done(result, 200)
    });
};

exports.updateRewards = function (user_id, rewards_data, project_id, done){
    let result = [];
    db.get().query('SELECT * FROM Creators WHERE project = ? && user_id = ?', [project_id, user_id], function (err, creators) {
        if (err) return done(err, 500);
        if (creators.length == 0){
            return done(creators, 403);
        } else {
            for (let i = 0; i < rewards_data.length; i++) {
                let values = [[rewards_data[i].amount, rewards_data[i].description, project_id, rewards_data[i].id],
                    rewards_data[i].amount, rewards_data[i].description, project_id, rewards_data[i].id];
                db.get().query('INSERT INTO Reward (amount, description, project, reward_id) VALUES (?) ' +
                    'ON DUPLICATE KEY UPDATE amount = ?, description = ?', values, function (err, rows) {
                    result.push(rows);
                    if (err) return done(err, 400);
                    if (i == rewards_data.length - 1){
                        done(result, 201);
                    }
                });
            }
        }
    });

};

exports.addPledge = function (authId, pledge_data, done) {
    let rows = [];
    db.get().query('SELECT * FROM Creators WHERE project = ? && user_id = ?', [pledge_data.project_id, pledge_data.user_id], function (err, creators) {
        if (err) return done(err, 500);
        if (creators.length == 0){
            let values = [pledge_data.user_id, pledge_data.amount, pledge_data.anonymous, pledge_data.project_id];
            db.get().query('INSERT INTO Backers (user_id, amount, anonymous, project_id) VALUES (?)', [values], function (err, result) {
                rows.push(result);
                if (err) return done(err, 400);
                db.get().query('UPDATE Project SET numberOfBackers = numberOfBackers + 1, ' +
                    'currentPledged = currentPledged + ? WHERE id = ?', [pledge_data.amount, pledge_data.project_id], function (err, result) {
                    if (err) return done(err, 400);
                    rows.push(result);
                    done(rows, 200);
                })
            })
        } else {
            return done(creators, 403)
        }
    });

};