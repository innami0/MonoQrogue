import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";
window.addEventListener("DOMContentLoaded", init);


function init() {
  const width = window.innerWidth;
  const height = 400;

  const loader = new GLTFLoader();

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#showCanvas"),
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x404040);
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 160;


  // オブジェクト追加↓
  const tank = new THREE.Group();
  let ar;
  let at;
  let ta = []
  let he;

         loader.load(
    "model/farchara.glb",
    function (gltf) {
      ar = gltf.scene;
      ar.scale.x = 20;
      ar.scale.y = 20;
      ar.scale.z = 20;
      scene.add(ar)
    }
  )
  loader.load(
    "model/attacker.glb",
    function (gltf) {
      at = gltf.scene
      at.scale.x = 20;
      at.scale.y = 20;
      at.scale.z = 20;
      scene.add(at);
    }
  );

  loader.load(
    "model/tankbody.glb",
    function (gltf) {
      ta[0] = gltf.scene
      ta[0].scale.x = 20;
      ta[0].scale.y = 20;
      ta[0].scale.z = 20;
      tank.add(ta[0]);
    }
  );

  loader.load(
    "model/tanktate.glb",
    function (gltf) {
      ta[1] = gltf.scene;

      ta[1].scale.x = 20;
      ta[1].scale.y = 20;
      ta[1].scale.z = 20;
      tank.add(ta[1]);
      scene.add(tank);
    }
  );

  loader.load(
    "model/heal.glb",
    function (gltf) {
      he = gltf.scene;

      he.scale.x = 20;
      he.scale.y = 20;
      he.scale.z = 20;
      he.rotation.x = 180 * (Math.PI / 180);
      scene.add(he);
    }
  );

  const light2 = new THREE.AmbientLight(0xffffff, 1);
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2;
  light.position.set(1, 1, 1);
  light2.castShadow = true;

  scene.add(light);
  scene.add(light2);

  tick();

  function tick() {
    requestAnimationFrame(tick);
    if(showstart){
    ar.rotation.y += 0.01
    at.rotation.y += 0.01
    tank.rotation.y += 0.01
    he.rotation.y += 0.01

    if(chara[charaCount]== 'アーチャー'){
      ar.visible = true
      at.visible = false
      tank.visible = false
      he.visible = false
    }
    if(chara[charaCount]== 'アタッカー'){
      ar.visible = false
      at.visible = true
      tank.visible = false
      he.visible = false
    }
    if(chara[charaCount]== 'タンク'){
      ar.visible = false
      at.visible = false
      tank.visible = true
      he.visible = false
    }
    if(chara[charaCount]== 'ヒーラー'){
      ar.visible = false
      at.visible = false
      tank.visible = false
      he.visible = true
    }
    
      renderer.render(scene, camera);
    }
  }
  }