function Game() {
	this.scene = {};
	this.renderer = {};
	this.levelBaseURL = 'loadLevel.php';
	this.lastTime = 0;
	this.gameObjects = [];
}

Game.prototype.init = function() {
	camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
	camera.position.z = 1000;

	scene = new THREE.Scene();

	var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

	//
	// Create a ball
	//
	var sphere = new THREE.SphereGeometry(60, 20, 20);
	var sphereMesh = new THREE.Mesh(sphere, material);
	this.createGameObject({ 'id': 'ball', 'isBall': true }, sphereMesh);

	//
	// Create a mesh
	//
	var cube = new THREE.CubeGeometry(200, 200, 200);
	var cubeMesh = new THREE.Mesh(cube, material);
	cubeMesh.position.x = -200;
	this.createGameObject({ 'id': 'box' }, cubeMesh);

	var movableCubeMesh = new THREE.Mesh(cube, material);
	movableCubeMesh.position.x = 200;
	movableCubeMesh.position.y = 0;
	this.createGameObject({ 'id': 'movable_box', 'movable': true }, movableCubeMesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
}

Game.prototype.calculateTimeStep = function() {
	var timestep = 0;

	if (this.lastTime != 0) {
		var currentTime = new Date().getTime();
		timestep = (currentTime - this.lastTime) / 1000;
	} else {
		this.lastTime = new Date().getTime();
	}

	return timestep;
}

Game.prototype.mainLoop = function() {
	var timestep = this.calculateTimeStep();	

	for (var i = 0; i < this.gameObjects.length; i++) {
		if (this.gameObjects[i].movable) {
			this.gameObjects[i] = applyGravity(this.gameObjects[i], timestep);
		}

		this.gameObjects[i].mesh.position.x += this.gameObjects[i].velocity.x * timestep;
		this.gameObjects[i].mesh.position.y -= this.gameObjects[i].velocity.y * timestep;
	}

	renderer.render(scene, camera);
}

Game.prototype.loadLevel = function(levelID) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Fixa
			var level = JSON.parse(xhr.responseText);
			for (var i = 0; i < level.gameObjects.length; i++) {
				createGameObject(level.gameObjects[i]);
			}
		}
	}
	xhr.open('GET', levelBaseURL + '?levelID=' + levelID, true);
	xhr.send();
}

Game.prototype.createGameObject = function(o, meshObject) {

	//
	// Setup default object
	//
	var gameObject = {
		'id': 'defaultObject',
		'isBall': false,
		'mesh' :meshObject,
		'collision': true,
		'collisionCallback': null,
		'movable': false,
		'willCollideAt': false,
		'velocity': {'x': 0, 'y': 0}
	}

	//
	// Handle settings for the object
	//
	if (typeof o == 'object') {
		for (var p in o) {
			gameObject[p] = o[p];
		}
	}

	//
	// Add game object to the list of game objects
	//
	this.gameObjects[this.gameObjects.length] = gameObject;

	//
	// Add mesh object to scene
	//
	scene.add(this.gameObjects[this.gameObjects.length-1].mesh);

}

Game.prototype.getGameObjectById = function(id) {
	for (var i = 0; i < this.gameObjects.length; i++) {
		if (this.gameObjects[i].id == id) {
			return this.gameObjects[i];
		}
	}
}

function update() {
	window.game.mainLoop();
	requestAnimationFrame(update);
}

window.onload = function() {
	window.game = new Game();
	game.init();
	update();
}

document.addEventListener('keydown', function(e) {
	var cube = window.game.getGameObjectById('box');
	switch (e.keyCode) {
		// Up
		case 38:
			cube.mesh.position.y += 10;
			break;
		// Down
		case 40:
			cube.mesh.position.y -= 10;
			break;
		// Left
		case 37:
			cube.mesh.position.x -= 10;
			break;
		// Right
		case 39:
			cube.mesh.position.x += 10;
			break;
			
	}
}, false);
