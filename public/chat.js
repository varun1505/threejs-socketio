$(document).ready(function(){
	var data = {};
	$('#block').draggable({
		drag: function(event, ui){
			data.x = ui.position.left;
			data.y = ui.position.top;
			data.z = 0;
			socket.emit('send', data);
		}
	});

	var socket = io.connect('http://1.1.1.23:3700');

	socket.on('notif', function(data){		
		console.log(data);
		console.log("X: " + data.x + "  --  Y: " + data.y);
		$('#block').css('left', parseInt(data.y + 1000) + 'px');
		$('#block').css('top', data.x + 'px');
		$('#block').rotate(data.z);
	});


	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', function(eventData){

		// gamma is the left-to-right tilt in degrees, where right is positive
		var tiltLR = eventData.gamma;

		// beta is the front-to-back tilt in degrees, where front is positive
		var tiltFB = eventData.beta;

		// alpha is the compass direction the device is facing in degrees
		var dir = eventData.alpha;

		data.x = (tiltFB*10) + 200;
		data.y = tiltLR + 200;
		data.z = dir;
		socket.emit('send', data);

		document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
		document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
		document.getElementById("doDirection").innerHTML = Math.round(dir);

		/*document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
		document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
		document.getElementById("doDirection").innerHTML = Math.round(dir);*/



		}, false);
	}

});

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};
