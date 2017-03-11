var mysql = require('mysql');
var db = require('../config/database');
var Const = require('../const');
var responseData = require('../models/responseData');
var conn;
var rooms;

var ChatHandle = function () {};

ChatHandle.prototype.attach = function (io, socket) {
    var self = this;

    socket.on('chat-history', function (data) {
        conn = mysql.createConnection(db);
        conn.connect();

        conn.query('call getHistory(?, ?)', [data.room_id, data.page], function (err, result) {
            if (err) {
                console.log(err);
                socket.emit('chat-history', responseData.create(Const.successFalse, Const.msgError, Const.resError));
            } else {
                result = JSON.parse(JSON.stringify(result[0]));
                var resData = responseData.create(Const.successFalse, Const.msgError, Const.resError);
                resData.data.history = result;
                socket.emit('chat-history', resData);
            }
            conn.end()
        })
    })

};

module['exports'] = new ChatHandle();
