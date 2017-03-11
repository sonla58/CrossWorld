var RoomHandle = function () {};
var mysql = require('mysql');
var db = require('../config/database');
var Const = require('../const');
var responseData = require('../models/responseData');
var chatMessage = require('../models/chat_message');
var fs = require('fs');
var conn;
var rooms;
var imageURL = require('../config/imageURL');

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


	function getAvatarName(id) {
		var name = new Date().getTime() + id + ".png";

		return name;
	}

};

module['exports'] = new RoomHandle();
