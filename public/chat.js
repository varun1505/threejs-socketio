$(document).ready(function(){
    var socket = io.connect('http://1.1.1.6:3700');    
    var data = {};
    $('#block').draggable({
        drag: function(event, ui){
            data.x = ui.position.left;
            data.y = ui.position.top;
            socket.emit('send', data);
        }
    });

    var socket = io.connect('http://1.1.1.6:3700');
    
    socket.on('notif', function(data){
        console.log(data);
        console.log("X: " + data.x + "  --  Y: " + data.y);
        $('#block').css('left', data.x + 'px');
        $('#block').css('top', data.y + 'px');
    });
});