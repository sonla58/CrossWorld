var mysql = require('mysql');
var db = require('../config/database');
var Const = require('../const');
var responseData = require('../models/responseData');
var conn;
var rooms;

var NewUser = function () {
};

NewUser.prototype.attach = function (io, socket) {
    var self = this;

    socket.on('new-user', function (data, callback) {
        conn = mysql.createConnection(db);
        conn.connect();

        conn.query('SELECT room_id FROM chat WHERE (native_user || foreign_user) = ?', [data.user_id], function (err, result) {
            if (err) {
                console.log(err);
                socket.emit('new-user', responseData.create(Const.successFalse, Const.msgError, Const.resError));
            } else {
                while (Object.keys(io.sockets.adapter.sids[socket.id]).length-1 !== result.length) {
                    for (var i = 0; i < result.length; i++) {
                        socket.join(result[i].room_id);
                    }
                }
                if (callback) callback(1);
            }
            conn.end()
        })
    })

};

module['exports'] = new NewUser();
