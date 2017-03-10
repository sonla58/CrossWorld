var RoomHandle = function () {

};

RoomHandle.prototype.attach = function (io, socket) {
    var self = this;

    socket.on('all-room', function (data) {

    })

};

module['exports'] = new RoomHandle();
