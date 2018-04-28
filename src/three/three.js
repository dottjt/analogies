import * as THREE from 'three';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth/window.innerHeight, 
  0.1, 
  1000
);

// place the camera at z of 100
camera.position.z = 100;



// add a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// add the renderer element to the DOM so it is in our page
document.body.appendChild( renderer.domElement );


/* we're creating a cube to put in our scene - don't worry
if you don't follow this part, we'll cover geometry and materials
in future posts */
var geometry = new THREE.BoxGeometry(20, 20, 20);

for (var i = 0, l = geometry.vertices.length; i<l; i++) {
  // we'll move the x & y position of each vertice by a random amount
  geometry.vertices[i].x += -10 + Math.random()*20;
  geometry.vertices[i].y += -10 + Math.random()*20;
}

var material = new THREE.MeshNormalMaterial({color: 0xfd59d7});
var cube = new THREE.Mesh(geometry, material);
// rotate cube
cube.rotation.x = 0.45;
cube.rotation.y = -0.25;

// shift cube on the x axis
// cube.position.x = -30;

scene.add(cube);

/* we need to add a light so we can see our cube - its almost
as if we're turning on a lightbulb within the room */
// var light = new THREE.PointLight(0xFFFF00);
// /* position the light so it shines on the cube (x, y, z) */
// light.position.set(10, 0, 25);
// scene.add(light);



var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.05;
  cube.rotation.y = -0.05;
  
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
};

render();





// var camera, scene, renderer1, renderer2;
// var cube, triangle;

// init();
// animate();

// function init() {
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color("red");
  
//   camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2)/(window.innerHeight / 2), 0.1, 10000);
//   camera.position.z = 5;
  
//   let geometry = new THREE.BoxGeometry(1, 1, 1);
//   let material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });

//   cube = new THREE.Mesh(geometry, material);
//   triangle = new THREE.Mesh(geometry, material);
//   triangle.position.set(1, -1, 3.2);
  
//   scene.add(cube);
//   scene.add(triangle);
  
//   renderer1 = new THREE.WebGLRenderer({ antialias: true});
//   renderer1.setSize(window.innerWidth / 2, window.innerHeight / 2);
  
//   renderer2 = new THREE.WebGLRenderer({ antialias: false });
//   renderer2.setSize(window.innerWidth, window.innerHeight / 2);

//   document.querySelector("#webgl").appendChild(renderer1.domElement);
//   // document.querySelector("#webgl").appendChild(renderer2.domElement);
// }

// function animate() {
//   requestAnimationFrame(animate);
  
//   triangle.rotation.x += 0.1;
  
//   cube.rotation.x += 0.05;
//   cube.rotation.y += 0.05;
  
//   renderer1.render(scene, camera);
//   renderer2.render(scene, camera);
// }


  