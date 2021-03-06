/**
 * Created by cba62 on 7/08/17.
 */

const Project =  require('../models/projects.server.model');
const fs = require("fs");

exports.list = function (req, res){

    Project.getAll(req.query.startIndex, req.query.count, function (result) {
        res.json(result);
    });
};

exports.create = function (req, res){
    try {
        let rewards = [];
        for (let i = 0; i < req.body.rewards.length; i++) {
            let reward_data = {
                "rewardsId": req.body.rewards[i].id,
                "amount": req.body.rewards[i].amount,
                "rewardDescription": req.body.rewards[i].description
            };
            rewards.push(reward_data);
        }
        let creators = [];
        for (let i = 0; i < req.body.creators.length; i++) {
            let creator_data = {
                "id": req.body.creators[i].id,
                "name": req.body.creators[i].name,
            };
            creators.push(creator_data);
        }
        let project_data = {
            "title": req.body.title,
            "subtitle": req.body.subtitle,
            "description": req.body.description,
            "imageUri": req.body.imageUri,
            "target": req.body.target,
            "rewards": rewards,
            "creators": creators
        };

        Project.insert(project_data, function (result, status) {
            res.status(status);
            if (status == 400) {
                res.statusMessage = "Malformed project data"
            } else if (status == 401) {
                res.statusMessage = "Unauthorized - create account to create project"
            }
            res.end(result.toString());
        })
    } catch (err) {
        res.statusMessage = "Malformed project data";
        res.sendStatus(400);
    }

};

exports.details = function (req, res){
    Project.getDetails(req.params.id, function (result) {
        res.json(result);
    });
};

exports.update = function (req, res){
    try {
        let project_data = {
            "id": req.params.id,
            "open": req.body.open
        };
        Project.update(project_data, req.authId, function (result, status) {
            res.status(status);
            if (status == 400) {
                res.statusMessage = "Malformed request"
            } else if (status == 403) {
                res.statusMessage = "Forbidden - unable to update a project you do not own"
            } else if (status == 201) {
                res.statusMessage = "OK"
            }
            res.json(result);
        });
    } catch (err) {
        res.statusMessage = "Malformed project data";
        res.sendStatus(400);
    }

};

exports.updateImage = function (req, res){
    let ext = req.file.originalname.split('.').pop();
    if (ext != 'png' && ext != 'jpg' && ext != 'gif' && ext != 'jpeg') {
        res.statusMessage = "Malformed project data";
        return res.sendStatus(400);
    }
    try {
        let data = {
            "imageFilePath": req.file.path,
            "project_id": req.params.id,
            "authId" : req.authId
        };
        Project.setImage(data, function (result, status) {
            res.status(status);
            if (status == 400){
                res.statusMessage = "Malformed request"
            } else if (status == 403){
                res.statusMessage = "Forbidden - unable to update a project you do not own"
            } else if (status == 201){
                res.statusMessage = "OK"
            }
            res.json(result);
        })
    } catch (err) {
        res.statusMessage = "Malformed project data";
        res.sendStatus(400);
    }
};

exports.image = function (req, res){
    Project.getImage(req.params.id, function (uri, status) {
        res.status(status);
        fs.readFile(uri, (err, data) => {
            res.set({'Content-Type': 'image/png'});
            res.send(data);
        });
    })
};

exports.pledge = function (req, res){
    if (req.authId != req.body.id){
        res.statusMessage = "Unauthorized - create account to pledge to a project";
        return res.sendStatus(401)
    }
    try {
        let pledge_data = {
            "user_id": req.body.id,
            "amount": req.body.amount,
            "anonymous": req.body.anonymous,
            "cardToken": req.body.card.authToken,
            "project_id": req.params.id
        };

        Project.addPledge(req.authId, pledge_data, function (result, status) {
            res.status(status);
            if (status == 400) {
                res.statusMessage = "bad user, project, or pledge details";
            }
            if (status == 403) {
                res.statusMessage = "Forbidden - cannot pledge to own project - this is fraud!";
            }
            res.json(result);
        })
    } catch (err) {
        res.statusMessage = "Malformed project data";
        res.sendStatus(400);
    }
};

exports.rewards = function (req, res) {
  Project.getRewards(req.params.id, function (result, status) {
      res.json(result);
  })  
};

exports.updateRewards = function(req, res){
    try {
        rewards_data = [];
        for (let i = 0; i < req.body.length; i++) {
            reward = {
                "id": req.body[i].id,
                "amount": req.body[i].amount,
                "description": req.body[i].description
            };
            rewards_data.push(reward);
        }

        Project.updateRewards(req.authId, rewards_data, req.params.id, function (result, status) {
            res.status(status);
            if (status == 400) {
                res.statusMessage = "Malformed request";
            }
            if (status == 403) {
                res.statusMessage = "Forbidden - unable to update a project you do not own";
            }
            if (status == 201) {
                res.statusMessage = "OK"
            }
            res.json(result);
        })
    } catch (err){
        res.statusMessage = "Malformed project data";
        res.sendStatus(400);
    }
};

