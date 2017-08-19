/**
 * Created by cba62 on 7/08/17.
 */

const Users =  require('../models/users.server.model');


exports.create = function (req, res){
    console.log(req.body);
    let user_data = {
        "id" : req.body.user.id,
        "username" : req.body.user.username,
        "location": req.body.user.location,
        "email": req.body.user.email,
        "password": req.body.password
    };

    Users.insert(user_data, function (result, status) {
        res.status(status);
        res.json(result);
    })
};

exports.getUser = function (req, res) {

    Users.user(req.params.id, function (result, status) {
        res.status(status);
        if (status == 401){
            res.statusMessage = "Invalid id supplied";
        }
        if (status == 404){
            res.statusMessage = "User not found";
        }
        res.json(result);
    })

};

exports.loginUser = function (req, res) {

    Users.login(req.query.username, req.query.password, function (result, status) {
        res.status(status);
        if (status == 400){
            res.statusMessage = "Invalid username/password supplied";
        }
        res.json(result);
    })
};


exports.logoutUser = function (req, res) {

    Users.logout(req.authId, req.headers.authorization, function (result, status) {
        res.status(status);
        if (status == 401){
            res.statusMessage = "Unauthorized - already logged out";
        }
        res.json(result);
    })
};



