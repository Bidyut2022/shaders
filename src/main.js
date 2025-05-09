import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

// scene
const scene = new THREE.Scene();
const canvas = document.querySelector("canvas");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
// camera
camera.position.z = 10;
const light = new THREE.AmbientLight("white", 1);
scene.add(light);
const geometry = new THREE.PlaneGeometry(5, 8, 120, 120);
const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    uTime: { value: 0.0 },
  },
});

const planeMesh = new THREE.Mesh(geometry, material);

scene.add(planeMesh);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
function animate() {
  window.requestAnimationFrame(animate);
  material.uniforms.uTime.value += 0.1;
  controls.update();
  renderer.render(scene, camera);
}

animate();
