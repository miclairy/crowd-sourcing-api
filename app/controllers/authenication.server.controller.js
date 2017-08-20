/**
 * Created by cba62 on 20/08/17.
 */
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


exports.checkUpdateToken = (req, res, next) => {

    jwt.verify(req.headers.authorization, 'RESTFULAPIs', function (err, decoded) {
        if (!err){
            req.authId = decoded.user_id;
            next()
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
            next()
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
            next()
        } else {
            res.status(401);
            res.statusMessage = "Unauthorized - create account to pledge to a project";
            res.json(err);
        }
    });
};