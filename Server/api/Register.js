var express = require('express');
var router = express.Router();
var user = require('../models/user');
var responseData = require('../models/responseData');
var random = require('randomstring');

var Const = require('../const.js');
var bcrypt = require('bcrypt-nodejs');

var Register = function () {
};

Register.prototype.attach = function (router) {
    var self = this;

    router.post('/', function (req, res) {
        console.log('Register');
        user.connect();

        var data = {
            user_id: random.generate(10),
            phone_number: req.body.phone_number,
            user_name: req.body.user_name,
            password: req.body.password,
            full_name: req.body.full_name,
            birthday: req.body.birthday || null,
            facebook_id: req.body.facebook_id || null,
            country_id: req.body.country_id,
            language_id: req.body.language_id
        };

        console.log(data);
        if(data.password) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(data.password, salt, null, function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.json(responseData.create(Const.successFalse, Const.msgRegisterFail, Const.resError));
                    } else {
                        data.password = hash;
                        user.create(data, function (err) {
                            if (err) {
                                console.log(err);
                                res.json(responseData.create(Const.successFalse, Const.msgRegisterFail, Const.resError));
                            } else {
                                console.log('Register success');
                                res.json(responseData.create(Const.successTrue, Const.msgRegisterSuccess, Const.resNoErrorCode));
                            }
                        })
                    }
                })
            });
        }
    });
};

new Register().attach(router);
module['exports'] = router;