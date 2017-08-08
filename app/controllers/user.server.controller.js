/**
 * Created by cba62 on 7/08/17.
 */

const User = require('../models/user.server.model');

exports.list = function (req, res){
    User.getAll(function (result) {
        res.json(result);
    });
};

exports.create = function (req, res){
    let user_data = {
        "username": req.body.username
    };
    console.log(req.body);
    let user = user_data['username'].toString();
    let values = [
        [user]
    ];

    User.insert(values, function (result) {
        res.json(result);
    })
};

exports.read = function (req, res){
    User.getOne(req.params.userId, function (result) {
        res.json(result);
    });
};

exports.update = function (req, res){
    let user_data = {
        "username": req.body.username,
        "user_id": req.params.userId
    };
    User.alter(user_data, function (result) {
        res.json(result);
    })
};

exports.delete = function (req, res){
    User.remove([req.params.userId.toString()], function (result) {
        res.json(result);
    })
};

exports.userById = function (req, res){
    return null;
};

