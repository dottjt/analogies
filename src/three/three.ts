import * as THREE from 'three';

export const createCube = (name: string) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    400 / 250, // inner width, inner height
    0.1,
    1000
  );
  camera.position.z = 40;
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff );
  renderer.setSize( 400, 250 );
  
  const domElement: Element | null = document.querySelector(`#${name}`);
  if (domElement) {
    domElement.appendChild( renderer.domElement );
  }
  
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  for (let i = 0, l = geometry.vertices.length; i < l; i++) {
      geometry.vertices[i].x += -10 + Math.random() * 10;
      geometry.vertices[i].y += -10 + Math.random() * 10;
  }
  
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.x = 0.15;
  cube.rotation.y = -0.25;
        // cube.position.x = -20;
  
  const light = new THREE.PointLight(0xFFFF00);
  light.position.set(10, 0, 25);
  
  const scene = new THREE.Scene();
  scene.add(cube);
  scene.add(light);
  
  const render = () => {
    requestAnimationFrame( render );
  
    cube.rotation.x += 0.02;
    cube.rotation.y += -0.02;
    
    camera.updateProjectionMatrix();
  
    renderer.render(scene, camera);
  };

  render();
}

export const createCrazyCube = (name: string) => {
  const camera = new THREE.PerspectiveCamera(
    75, 
    400 / 250, // inner width, inner height 
    0.1, 
    1000
  );
  camera.position.z = 40;
  
  const scene = new THREE.Scene();
      
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff );
  renderer.setSize( 400, 250 );
    
  const domElement = document.querySelector(`#${name}`);
  if (domElement) {
    domElement.appendChild( renderer.domElement );
  }
  
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  for (let i = 0, l = geometry.vertices.length; i < l; i++) {
      geometry.vertices[i].x += -10 + Math.random() * 10;
      geometry.vertices[i].y += -10 + Math.random() * 10;
  }
  
  const material = new THREE.MeshNormalMaterial();

  for (let i = 0; i < 4; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = 1 * Math.random();
    cube.rotation.y = -1 * Math.random();
    cube.position.x = 12 * Math.random();
    scene.add(cube);
  }

  const light = new THREE.PointLight(0xFFFF00);
  light.position.set(10, 0, 25 * Math.random());
  scene.add(light);

  const render = () => {
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
