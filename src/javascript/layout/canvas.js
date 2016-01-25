/*----------  Javascript responsible for the canvas  ----------*/
var THREE = require('../vendor/three');

// Pollyfill for RequestAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

let renderer, camera, scene, width, height, directionalLight;
let canvas = (function() {
    let init = () => {
        initRenderer();
        initCamera();
        initScene();  
        initLight();
        initMesh();
        setInterval(logic, 1000/60);
    };
    let logic = () => {
        requestAnimationFrame(render);
    };
    let render = () => {
        renderer.render(scene, camera)
    };
    let initRenderer = () => {
        var container = document.querySelector('#animation');
        renderer = new THREE.WebGLRenderer(); 
        width = window.innerWidth, height = window.innerHeight;         
        renderer.setSize(width, height); 
        container.appendChild(renderer.domElement);        
    };
    let initCamera = () => {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 501); 
        camera.position.z = 500; 
    }; 
    let initScene = () => {
        scene = new THREE.Scene();
        scene.add(camera);
    };
    let initLight = () => {
        directionalLight = new THREE.DirectionalLight(); 
        directionalLight.position.z = 10; 
        scene.add(directionalLight);
    };
    let initMesh = () => {
        let radius = 100, segments = 50, rings = 50;
        let sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
        let sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
        scene.add(sphere);
    };
    let publicInterface = {
        init
    }
    return publicInterface;
})();

module.exports = canvas;