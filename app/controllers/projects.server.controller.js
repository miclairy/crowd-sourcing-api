/**
 * Created by cba62 on 7/08/17.
 */

const Project =  require('../models/projects.server.model');

exports.list = function (req, res){
    Project.getAll(function (result) {
        res.json(result);
    });
};

exports.create = function (req, res){
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
        "rewards" : rewards,
        "creators" : creators
    };
    Project.insert(project_data, function (result, status) {
        res.status(status);
        if (status == 400){
            res.statusMessage = "Malformed project data"
        } else if (status == 401){
            res.statusMessage = "Unauthorized - create account to create project"
        }
        res.json(result);
    })
};

exports.details = function (req, res){
    Project.getDetails(req.params.id, function (result) {
        res.json(result);
    });
};

exports.update = function (req, res){
    let project_data = {
        "project_id": req.params.id,
        "open": req.body.opened
    };
    Project.update(project_data, function (result, status) {
        res.status(status);
        if (status == 400){
            res.statusMessage = "Malformed request"
        } else if (status == 401){
            res.statusMessage = "Unauthorized - create account to update project"
        } else if (status == 403){
            res.statusMessage = "Forbidden - unable to update a project you do not own"
        }
        res.json(result);
    })
};

exports.updateImage = function (req, res){

    let data = {
        "imageFile": req.body.,
        "id": req.params.id
    };
    Project.setImage(data, function (result, status) {
        res.status(status);
        if (status == 400){
            res.statusMessage = "Malformed request"
        } else if (status == 401){
            res.statusMessage = "Unauthorized - create account to update project"
        } else if (status == 403){
            res.statusMessage = "Forbidden - unable to update a project you do not own"
        }
        res.json(result);
    })
};

exports.image = function (req, res){
    Project.getImage(req.params.id, function (result, status) {
        res.json(result)
    })
};

exports.pledge = function (req, res){
    return null;
};

