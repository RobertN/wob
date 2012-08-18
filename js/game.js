var camera,
	scene,
	renderer,
	box,
	sphere,
	material,
	boxMesh,
	sphereMesh;

function init() {

	camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);
	camera.position.z = 1000;

	scene = new THREE.Scene();

	box = new THREE.CubeGeometry(200, 200, 200);
	sphere = new THREE.SphereGeometry(60, 20, 20);
	material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

	boxMesh = new THREE.Mesh(box, material);
	boxMesh.position.x = 150;
	boxMesh.position.y = -400;
	sphereMesh = new THREE.Mesh(sphere, material);
	scene.add(boxMesh);
	scene.add(sphereMesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

}

function animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(animate);

	boxMesh.position.x -= 1.11;

	renderer.render(scene, camera);

}

window.onload = function() {
	init();
	animate();
}