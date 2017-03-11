var RoomHandle = function () {};
var mysql = require('mysql');
var db = require('../config/database');
var Const = require('../const');
var responseData = require('../models/responseData');
var chatMessage = require('../models/chat_message');
var fs = require('fs');
var conn;
var rooms;

RoomHandle.prototype.attach = function (io, socket) {
    var self = this;

    socket.on('send-message', function (data, callback) {
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
    				callback(true);
    				var temp = responseData.create(Const.successTrue, Const.msgSendMessage, Const.resNoErrorCode);
    				temp.data = {
    					room_id: data.room_id,
    					from: data.user_id,
    					time: item.create_at,
    					message: data.message
    				}
    				socket.to(data.room_id).emit('send-message', temp);
    			}
    		});
    	}

    	if(data.image) { //image
    		fs.writeFile(getAvatarName(data.user_id), data.image, function(err) {
				if(err) {
					console.log(err);
					callback(false);
				} else {
					chatMessage.create(item, function(err) {
		    			if (err) {
		    				console.log(err);
		    				callback(false);
		    			} else {
		    				callback(true);
			    			var temp = responseData.create(Const.successTrue, Const.msgSendMessage, Const.resNoErrorCode);
		    				temp.data = {
		    					room_id: data.room_id,
		    					from: data.user_id,
		    					time: item.create_at,
		    					image: data.image
		    				}
		    				socket.to(data.room_id).emit('send-message', temp);
		    			}
		    		});
				}
    		});
    	}

    	if(data.call_video) {//call
    		
    	}

    })

	function getAvatarName(id) {
		var name = new Date().getTime() + id + ".png";

		return "./public/image/user/" + name;
	} 

};

module['exports'] = new RoomHandle();
