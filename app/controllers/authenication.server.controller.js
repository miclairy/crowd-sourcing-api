/**
 * Created by cba62 on 20/08/17.
 */
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const db = require('../../config/db.js');

function checkActive(id, res, next){
    db.get().query("SELECT active FROM Users WHERE user_id = ?", id, function (err, rows) {
        if (!rows[0].active){
            res.status(401);
            res.statusMessage = "Unauthorized - not logged in";
            return res.json(rows);
        }
        next()
    })
}


exports.checkUserToken = (req, res, next) => {

    jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
        if (!err){
            req.authId = decoded.user_id;
            checkActive(decoded.user_id, res, function () {
                next()
            })
        } else {
            res.status(401);
            res.statusMessage = "Unauthorized - not logged in";
            res.json(err);
        }
    });
};

exports.checkUpdateToken = (req, res, next) => {

    jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
        if (!err){
            req.authId = decoded.user_id;
            checkActive(decoded.user_id, res, function () {
                next()
            })
        } else {
            res.status(401);
            res.statusMessage = "Unauthorized - create account to update project";
            res.json(err);
        }
    });
};

exports.checkCreateToken = (req, res, next) => {

    jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
        if (!err){
            req.authId = decoded.user_id;
            checkActive(decoded.user_id, res, function () {
                next()
            })
        } else {
            res.status(401);
            res.statusMessage = "Unauthorized - create account to create project";
            res.json(err);
        }
    });
};

exports.checkPledgeToken = (req, res, next) => {

    jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
        if (!err){
            req.authId = decoded.user_id;
            checkActive(decoded.user_id, res, function () {
                next()
            })
        } else {
            res.status(401);
            res.statusMessage = "Unauthorized - create account to pledge to a project";
            res.json(err);
        }
    });
};