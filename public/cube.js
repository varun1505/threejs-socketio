$(document).ready(function(){

	var width = window.innerWidth;
	var height = window.innerHeight;

	console.log(width);

	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);
	 
	var scene = new THREE.Scene();

	var cubeGeometry = new THREE.BoxGeometry(100,100,100);
	var cubeMaterial = new THREE.MeshNormalMaterial({ color: 0x1ec876 });
	
	cubeGeometry.colorsNeedUpdate = true

	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	//cube.rotation.y = Math.PI * 45 / 180;

	scene.add(cube);

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)

	camera.position.y = 0;
	camera.position.z = 400;

	scene.add(camera);
	camera.lookAt(cube.position);

	var pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(0, 300, 200);
	
	scene.add(pointLight);

	var tiltLR = 0, tiltFB = 0, dir = 0;

	function render() {
		renderer.render(scene, camera);
		cube.rotation.x = tiltLR / 10;
		cube.rotation.y = tiltFB / 10;
		// cube.rotation.z = dir / 10;
		requestAnimationFrame(render);
	}

	render();

	

	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', function(eventData){

			// gamma is the left-to-right tilt in degrees, where right is positive
			tiltLR = eventData.gamma;

			// beta is the front-to-back tilt in degrees, where front is positive
			tiltFB = eventData.beta;

			// alpha is the compass direction the device is facing in degrees
			dir = eventData.alpha;

			data.x = tiltLR;
			data.y = tiltFB;
			data.z = dir;

			socket.emit('send', data);		


		}, false);
	}

	renderer.render(scene, camera);



	var data = {};
	
	var socket = io.connect('http://1.1.1.23:3700');
	socket.on('notif', function(data){		
		tiltLR = data.x;
		tiltFB = data.y;
		dir = data.z;
	});

});