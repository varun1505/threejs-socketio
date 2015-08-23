var express = require("express");
var app = express();
var port = 3700;

app.use(express.static(__dirname + '/public'));

var client = function(){
    return {
        'user': '',
        'socket': {}
    }    
}

var clients = [];

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    console.info('New client connected (id=' + socket.id + ').');
    socket.on('send', function (data) {
        console.log('DATA:');
        console.log(data);
        io.emit('notif', data);
    });

    socket.on('watch', function(data) {
        console.log('Mobile Data:');
        console.log(data);
        io.emit('notif', JSON.parse(data));
    });
});

console.log("Listening on port " + port);