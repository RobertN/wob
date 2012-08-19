var	scene,
	renderer,
	levelBaseURL = 'loadLevel.php';

function init() {

	camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
	camera.position.z = 1000;

	scene = new THREE.Scene();

	var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

	//
	// Create a ball
	//
	var sphere = new THREE.SphereGeometry(60, 20, 20);
	var sphereMesh = new THREE.Mesh(sphere, material);
	createGameObject({ 'id': 'ball', 'isBall': true }, sphereMesh);

	//
	// Create a mesh
	//
	var cube = new THREE.CubeGeometry(200, 200, 200);
	var cubeMesh = new THREE.Mesh(cube, material);
	createGameObject({ 'id': 'box' }, cubeMesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

}

function animate() {

	requestAnimationFrame(animate);
	renderer.render(scene, camera);

}

function loadLevel(levelID) {
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

function createGameObject(o, meshObject) {

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
		'willCollideAt': false
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
	if (typeof gameObjects == 'undefined') {
		gameObjects = [];
	}
	gameObjects[gameObjects.length] = gameObject;

	//
	// Add mesh object to scene
	//
	scene.add(gameObjects[gameObjects.length-1].mesh);

}

function getGameObjectById(id) {
	for (var i = 0; i < gameObjects.length; i++) {
		if (gameObjects[i].id == id) {
			return gameObjects[i];
		}
	}
}

window.onload = function() {
	init();
	animate();
}

document.addEventListener('keydown', function(e) {
	var cube = getGameObjectById('box');
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