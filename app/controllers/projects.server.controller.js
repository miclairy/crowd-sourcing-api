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
    Project.insert(project_data, function (result) {
        res.json(result);
    })
};

exports.details = function (req, res){
    Project.getDetails(req.params.id, function (result) {
        res.json(result);
    });
};

exports.update = function (req, res){
    let Project_data = {
        "Projectname": req.body.Projectname,
        "Project_id": req.params.ProjectId
    };
    Project.alter(Project_data, function (result) {
        res.json(result);
    })
};

exports.delete = function (req, res){
    Project.remove([req.params.ProjectId.toString()], function (result) {
        res.json(result);
    })
};

exports.image = function (req, res){
    return null;
};

exports.updateImage = function (req, res){
    return null;
};

exports.pledge = function (req, res){
    return null;
};

