import * as THREE from 'three';

export const createCube = (name) => {
  let camera = new THREE.PerspectiveCamera(
    75, 
    400/250, // inner width, inner height 
    0.1, 
    1000
  );
      camera.position.z = 40;
  
  let renderer = new THREE.WebGLRenderer();
      renderer.setClearColor( 0xffffff );
      renderer.setSize( 400, 250 );
  
      document.querySelector(`#${name}`).appendChild( renderer.domElement );
  
  let geometry = new THREE.BoxGeometry(20, 20, 20);
  for (let i = 0, l = geometry.vertices.length; i<l; i++) {
      geometry.vertices[i].x += -10 + Math.random()*10;
      geometry.vertices[i].y += -10 + Math.random()*10;
  }
  
  let material = new THREE.MeshNormalMaterial({color: 0xfd59d7});
  let cube = new THREE.Mesh(geometry, material);
      cube.rotation.x = 0.15;
      cube.rotation.y = -0.25;
      // cube.position.x = -20;
  
  let light = new THREE.PointLight(0xFFFF00);
      light.position.set(10, 0, 25);
  
  let scene = new THREE.Scene();
      scene.add(cube);
      scene.add(light);
  
  const render = function () {
    requestAnimationFrame( render );
  
    cube.rotation.x += 0.02;
    cube.rotation.y += -0.02;
    
    camera.updateProjectionMatrix();
  
    renderer.render(scene, camera);
  };

  render();
}



export const createCrazyCube = (name) => {
  let camera = new THREE.PerspectiveCamera(
    75, 
    400/250, // inner width, inner height 
    0.1, 
    1000
  );
      camera.position.z = 40;
  
  let scene = new THREE.Scene();
      
  let renderer = new THREE.WebGLRenderer();
      renderer.setClearColor( 0xffffff );
      renderer.setSize( 400, 250 );
  
      document.querySelector(`#${name}`).appendChild( renderer.domElement );
  
  let geometry = new THREE.BoxGeometry(20, 20, 20);
  for (let i = 0, l = geometry.vertices.length; i<l; i++) {
      geometry.vertices[i].x += -10 + Math.random()*10;
      geometry.vertices[i].y += -10 + Math.random()*10;
  }
  
  let material = new THREE.MeshNormalMaterial({color: 0xfd59d7});

  for (let i = 0; i < 4; i++) {
    let cube = new THREE.Mesh(geometry, material);
        cube.rotation.x = 1 * Math.random();
        cube.rotation.y = -1 * Math.random();
        cube.position.x = 12 * Math.random();
    scene.add(cube);
  }

  let light = new THREE.PointLight(0xFFFF00);
      light.position.set(10, 0, 25 * Math.random());
  scene.add(light);


  
  const render = function () {
    requestAnimationFrame( render );
    
    for (let i = 0; i < 4; i++) {
      scene.children[i].rotation.x += 0.2 * Math.random();
      scene.children[i].rotation.y += -0.2 * Math.random();
    }
    
    camera.updateProjectionMatrix();
  
    renderer.render(scene, camera);
  };

  render();
}

