var mysql = require('mysql');
var db = require('../config/database');
var responseData = require('../models/responseData');
var Const = require('../const');
var chatMessage = require('../models/chat_message');
var fs = require('fs');
var imageURL = require('../config/imageURL');
var conn;
var rooms;

var ChatHandle = function () {};

ChatHandle.prototype.attach = function (io, socket) {
    var self = this;

    socket.on('chat-history', function (data) {
        console.log('chat-history')
        conn = mysql.createConnection(db);
        conn.connect();

        conn.query('call getHistory(?, ?)', [data.room_id, data.page], function (err, result) {
            if (err) {
                console.log(err);
                socket.emit('chat-history', responseData.create(Const.successFalse, Const.msgError, Const.resError));
            } else {
                result = JSON.parse(JSON.stringify(result[0]));
                var resData = responseData.create(Const.successTrue, Const.msgGetHistory, Const.resNoErrorCode);
                resData.data.history = result;
                socket.emit('chat-history', resData);
            }
            conn.end()
        })
    });

    socket.on('send-message', function (data, callback) {
        console.log('send-message')
        var item = {
            room_id: data.room_id,
            user_id: data.user_id,
            create_at: new Date()
        }
        chatMessage.connect();
        if(data.message) { //message
            item.message = data.message;
            chatMessage.create(item, function(err) {
                if (err) {
                    console.log(err);
                    callback(false);
                } else {
                    var temp = responseData.create(Const.successTrue, Const.msgSendMessage, Const.resNoErrorCode);
                    temp.data = {
                        room_id: data.room_id,
                        sender: data.user_id,
                        time: item.create_at.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                        message: data.message
                    }
                    console.log(temp);
                    socket.to(data.room_id).emit('send-message', temp);
                    callback(true);
                }
            });
        }

        if(data.image) { //image
            var name = getAvatarName(data.user_id);
            fs.writeFile("./public/image/user/" + name, data.image, function(err) {
                if(err) {
                    console.log(err);
                    callback(false);
                } else {
                    item.image = imageURL.user + name;
                    chatMessage.create(item, function(err) {
                        if (err) {
                            console.log(err);
                            callback(false);
                        } else {
                            var temp = responseData.create(Const.successTrue, Const.msgSendMessage, Const.resNoErrorCode);
                            temp.data = {
                                room_id: data.room_id,
                                sender: data.user_id,
                                time: item.create_at.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                                image: data.image
                            }
                            console.log(temp)
                            socket.to(data.room_id).emit('send-message', temp);
                            callback(true);
                        }
                    });
                }
            });
        }
    })

    socket.on('typing', function(data, callback) {
        socket.to(data.room_id).emit('typing', '');
    })

    socket.on('call', function (data) {
        console.log('call')
        var time_call = new Date();
        var index = -1;
        for(var i=0; i < clients.length; i++) {
            if(clients[i].user_id == data.other_user) {
                index = i;
                break;
            }
        }
        clients[index].emit('call', data, function(){

        });
        clients[index].on('answer', function(dataAnswer, cbAnswer) {
            if(cbAnswer) cbAnswer(1);
            if(dataAnswer.accept) {
                socket.emit('call', responseData.create(Const.successTrue, Const.msgAcceptCall, Const.resNoErrorCode));
            } else {
                socket.emit('call', responseData.create(Const.successFalse, Const.msgDelineCall, Const.resDeclineCall));
            }
            clearTimeout(time);
        })
        var time = setTimeout(function(){
            clients[index].removeListeners('answer');
            socket.emit('call', responseData.create(Const.successFalse, Const.msgTimeoutCall, Const.resTimeotCall));
        }, 20000);
    })


    function getAvatarName(id) {
        var name = new Date().getTime() + id + ".png";

        return name;
    }

};

module['exports'] = new ChatHandle();
