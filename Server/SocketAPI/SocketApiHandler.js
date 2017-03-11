var SocketApiHandler = {
    io: null,
    nsp: null,
    init: function (io) {
        var self = this;
        this.io = io;
        this.nsp = io;

        this.nsp.sockets.on('connection', function (socket) {
            console.log('New connection');

            require('./SendMessage').attach(io, socket);
            require('./NewUser').attach(io, socket);
            require('./RoomHandle').attach(io, socket);
            require('./ChatHandle').attach(io, socket);

            socket.on('disconnect', function () {
                console.log('Disconnected')
            })
        })

    }
};

module['exports'] = SocketApiHandler;
