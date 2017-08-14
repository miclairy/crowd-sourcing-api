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
    console.log(req.body);
    let project_data = {
        "title": req.body.title,
        "subtitle": req.body.subtitle,
        "description": req.body.description,
        "imageUri": req.body.imageUri,
        "target": req.body.target,
        "creators": req.body.creators,
        "rewardsId": req.body.rewards.id,
        "amount": req.body.rewards.amount,
        "rewardDescription": req.body.rewards.description
    };

    Project.insert(project_data, function (result) {
        res.json(result);
    })
};

exports.read = function (req, res){
    Project.getOne(req.params.ProjectId, function (result) {
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

exports.details = function (req, res){
    return null;
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

