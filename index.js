import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";

let startmessage = 0;
let Timer = 45;
const eq0 = (element) => element == 0;

window.addEventListener("DOMContentLoaded", init);

function init() {
  const width = 1400;
  const height = 700;

  class Playing {
    constructor(startx, hpnum) {
      this.mainbody;
      this.atari = new THREE.Box3();
      this.mesh;
      this.groupmesh = new THREE.Group();
      this.x = startx;
      this.y = 30;
      this.z = 300;
      this.appear;
      this.count = 0;
      this.toplayer;
      this.angle = 0;
      this.angle2 = 0;
      this.speed = 0;
      this.atspeed = 0;
      this.sig = 0;
      this.atsw = 0;
      this.loi = 0;
      this.interval = 300;
      this.hp = hpnum;
      this.basehp = hpnum;
      this.cooltime = 400;
      this.atcooltime = 200;
      this.hit = 0;
      this.downCount = 0;
      this.pgauge1 = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      this.pgauge2 = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({ color: 0x3c14dc })
      );
      this.pgauge = new THREE.Group();
      this.twocount = 0;
      this.ten = {
        max: {
          x: 0,
          y: 0,
          z: 0,
        },
        min: {
          x: 0,
          y: 0,
          z: 0,
        },
      };
    }

    set mulch(hp) {
      this.mesh = [];
      this.appear = new Array(16).fill(0);
      this.atari = new Array(16).fill(new THREE.Box3());
      this.x = new Array(16).fill(600);
      this.y = new Array(16).fill(600);
      this.z = new Array(16).fill(600);
      this.angle = new Array(16).fill(0);
      this.toplayer = new Array(16).fill(0);
      this.hp = new Array(16).fill(hp);
      this.hit = new Array(16).fill(0);
      this.pgauge1 = [];
      this.pgauge2 = [];
      this.pgauge = [];
      this.ten = {
        max: {
          x: new Array(16).fill(0),
          y: new Array(16).fill(0),
          z: new Array(16).fill(0),
        },
        min: {
          x: new Array(16).fill(0),
          y: new Array(16).fill(0),
          z: new Array(16).fill(0),
        },
      };
    }

    prepare() {
      this.pgauge.add(this.pgauge1);
      this.pgauge.add(this.pgauge2);
      this.pgauge1.scale.y = 0.06;
      this.pgauge1.scale.x = 0.5;
      this.pgauge2.scale.y = 0.06;
      this.pgauge2.scale.x = 0.5;
      this.pgauge2.position.z = -0.08;
      scene.add(this.pgauge);
    }

    tickdo(info) {
      // ゲージの設定
      this.pgauge.position.set(this.x, this.y - 15, this.z + 20);
      this.pgauge1.scale.x = 0.5 * (this.hp / this.basehp);
      this.pgauge1.position.x = ((this.hp / this.basehp) * 100 - 100) / 4;
      // 敵に対する当たり判定
      if (this.cooltime == 400) {
        for (let i = 0; i < enemies.appear.findIndex(eq0); i += 1) {
          if (hantei(this, i)) {
            this.hp -= 20;
            this.cooltime = 0;
          } else {
            this.hit = 0;
          }
        }
      }
      if (this.cooltime < 400) {
        this.cooltime += 1;
      }
      // アングル設定
      this.angle = (-1 * (info.ang / (Math.PI / 180)) + 360 + 90) % 360;
      // キャラ動き
      this.groupmesh.position.set(this.x, this.y, this.z);
      this.groupmesh.rotation.y = this.angle * (Math.PI / 180);
      if (info.pul > 0) {
        if (this.speed < 1) {
          this.speed += 0.4;
        }
        this.x += -1 * seigen(this.angle, this.speed);
        this.z += -1 * seigen(90 - this.angle, this.speed);
      } else {
        if (this.speed > 0) {
          this.speed = 0.01;
        }
      }
      // 攻撃モーション
      if(this.groupmesh.visible){
      if (info.tap == 1) {
        if (this.twocount == 0) {
          if (info.num == playerinfo.ar.num) {
            p1act();
          } else if (info.num == playerinfo.at.num) {
            p2act();
          } else if (info.num == playerinfo.ta.num) {
            p3act();
          } else if (info.num == playerinfo.he.num) {
            p4act();
          }
          this.twocount = 1;
        } else {
          this.twocount = 0;
        }
      }
    }
      if(this.hp <= 0){
        this.groupmesh.visible = false
        this.pgauge.visible = false
        this.x = null;
        this.y = null;
        this.z = null;

      }
    }

    enemyprepare(i) {
      this.pgauge1[i] = new THREE.Mesh(geometry, material1);
      this.pgauge2[i] = new THREE.Mesh(geometry, material2);
      this.pgauge[i] = new THREE.Group();

      this.pgauge[i].add(this.pgauge1[i]);
      this.pgauge[i].add(this.pgauge2[i]);
      scene.add(this.pgauge[i]);

      this.pgauge1[i].scale.y = 0.06;
      this.pgauge1[i].scale.x = 0.5;
      this.pgauge2[i].scale.y = 0.06;
      this.pgauge2[i].scale.x = 0.5;
      this.pgauge2[i].position.z = -0.08;
    }

    enemytick(i) {
      
      this.pgauge[i].position.set(this.x[i], this.y[i] - 15, this.z[i] + 20);

      this.pgauge1[i].scale.x = (this.hp[i] * 2) / 200;
      this.pgauge1[i].position.x = (this.hp[i] * 2 - 100) / 4;

      if (this.hp[i] <= 0) {
        this.appear[i] = 0;
      }
      if (this.appear[i] == 1) {
        addtens(this.mesh[i], this.atari[i], this, i);

        this.mesh[i].visible = true;
        this.pgauge[i].visible = true;
        const mincheck = new Array(16).fill([]);

        mincheck[i][0] = abs(this.x[i] - play1.x);
        mincheck[i][1] = abs(this.x[i] - play2.x);
        mincheck[i][2] = abs(this.x[i] - play3.x);
        mincheck[i][3] = abs(this.x[i] - play4.x);

        if (mincheck[i].indexOf(Math.min(...mincheck[i])) == 0 && play1.groupmesh.visible) {
          this.toplayer[i] = play1;
        }else{
        }
        
        if (mincheck[i].indexOf(Math.min(...mincheck[i])) == 1 && play2.groupmesh.visible) {
          this.toplayer[i] = play2;
        } else {

        }
        if (mincheck[i].indexOf(Math.min(...mincheck[i])) == 2 && play3.groupmesh.visible) {
          this.toplayer[i] = play3;
        } else {

        }
        if (mincheck[i].indexOf(Math.min(...mincheck[i])) == 3 && play4.groupmesh.visible) {
          this.toplayer[i] = play4;
        }else{

        }

        this.angle[i] = yogen(
          this.z[i] - this.toplayer[i].z,
          this.x[i] - this.toplayer[i].x
        );
        if(play1.groupmesh.visible){
          if (hantei(play1, i)) {
          this.hit[i] = 1;
          this.x[i] += seigen(this.angle[i], 1.2);
          this.z[i] += seigen(90 - this.angle[i], 1.2);
        } else {
          this.hit[i] = 0;
        }
      }else{
      }
      if(play2.groupmesh.visible){
        if (hantei(play2, i)) {
          this.hit[i] = 1;
          this.x[i] += seigen(this.angle[i], 1.2);
          this.z[i] += seigen(90 - this.angle[i], 1.2);
        } else {
          this.hit[i] = 0;
        }
      }
      if(play3.groupmesh.visible){
        if (hantei(play3, i)) {
          this.hit[i] = 1;
          this.x[i] += seigen(this.angle[i], 1.2);
          this.z[i] += seigen(90 - this.angle[i], 1.2);
        } else {
          this.hit[i] = 0;
        }
      }
      if(play4.groupmesh.visible){
        if (hantei(play4, i)) {
          this.hit[i] = 1;
          this.x[i] += seigen(this.angle[i], 1.2);
          this.z[i] += seigen(90 - this.angle[i], 1.2);
        } else {
          this.hit[i] = 0;
        }
      }

        if (this.hit[i] == 0) {
          this.x[i] += -1 * seigen(this.angle[i], 0.8);
          this.z[i] += -1 * seigen(90 - this.angle[i], 0.8);
        }
      } else if (this.appear[i] == 0) {
        this.mesh[i].visible = false;
        this.pgauge[i].visible = false;
      }
      this.mesh[i].position.set(this.x[i], this.y[i], this.z[i]);
    }
  }

  const loader = new GLTFLoader();

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x404040);
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

  const listener = new THREE.AudioListener();
  camera.add( listener );
  const audioLoader = new THREE.AudioLoader();

  const ar_sound = new THREE.Audio( listener );
  const at_sound = new THREE.Audio( listener );
  const ta_sound = new THREE.Audio( listener );
  const he_sound = new THREE.Audio( listener );
  const tdeath = new THREE.Audio( listener )
  const mainTheme = new THREE.Audio( listener );
  const nowPlaying = new THREE.Audio( listener );

  document.getElementById('par').addEventListener('click',() =>{
    mainTheme.play();
  })

  audioLoader.load( 'sound/ar.mp3', function( buffer ) {
    ar_sound.setBuffer( buffer );
    ar_sound.setLoop( false );
    ar_sound.setVolume( 0.1 );
  });
  audioLoader.load( 'sound/at.mp3', function( buffer ) {
    at_sound.setBuffer( buffer );
    at_sound.setLoop( false );
    at_sound.setVolume( 0.1 );
  });
  audioLoader.load( 'sound/ta.mp3', function( buffer ) {
    ta_sound.setBuffer( buffer );
    ta_sound.setLoop( false );
    ta_sound.setVolume( 0.1);
  });
  audioLoader.load( 'sound/he.mp3', function( buffer ) {
    he_sound.setBuffer( buffer );
    he_sound.setLoop( false );
    he_sound.setVolume( 0.1);
  });
  audioLoader.load( 'sound/Main-theme.wav', function( buffer ) {
    mainTheme.setBuffer( buffer );
    mainTheme.setLoop( true );
    mainTheme.setVolume( 0.5 );
  });
  audioLoader.load( 'sound/playing.wav', function( buffer ) {
    nowPlaying.setBuffer( buffer );
    nowPlaying.setLoop( true );
    nowPlaying.setVolume( 0.5 );
  });
  

  var jimen =  new THREE.Mesh(                                      
    new THREE.PlaneGeometry(900, 900, 1, 1),
     new THREE.MeshLambertMaterial({ 
       color: 0x333333
       }));             
  jimen.rotation.x = 270 *(Math.PI/180) 
  jimen.receiveShadow = true;

scene.add(jimen);

  const effectAll = new THREE.Group()
    let effectmove = []
    let scaley = 0;
    var effGeo = new Array(8).fill(new THREE.PlaneGeometry(100, 100));
var effMes = []
for(let i = 0; i< 8; i += 1){
effMes[i] =  new THREE.Mesh( effGeo[i] )
effMes[i].scale.set(0.04,0.3,0.04)
effMes[i].position.y = 45
effectmove[i] = new THREE.Group()
effectmove[i].add( effMes[i] );

effectmove[i].rotation.z = 45*i*(Math.PI/180)
effectAll.add(effectmove[i])
}
effectAll.scale.set(0.2, 0.2, 0.2)
scene.add(effectAll)

  camera.position.x = 0;
  camera.position.y = 250;
  camera.position.z = 720;
  camera.rotation.x = -0.42;

  var geometry = new THREE.PlaneGeometry(100, 100);
  var material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var material2 = new THREE.MeshBasicMaterial({ color: 0x3c14dc });

  let play1 = new Playing(-150, 100);
  let play2 = new Playing(-50, 150);
  let play2_ken = new Playing();
  let play3 = new Playing(50, 250);
  let play4 = new Playing(150, 100);

  let play1_gun = new Playing();
  play1_gun.mulch = 0;
  let play4_gun = new Playing();
  play4_gun.mulch = 0;
  let enemies = new Playing();
  enemies.mulch = 50;

  loader.load("model/farchara.glb", function (gltf) {
    play1.mesh = gltf.scene;
    play1.mesh.scale.x = 20;
    play1.mesh.scale.y = 20;
    play1.mesh.scale.z = 20;
    play1.groupmesh.add(play1.mesh);
    scene.add(play1.groupmesh);
  });
  loader.load("model/attacker.glb", function (gltf) {
    play2.mesh = [gltf.scene.children[0], gltf.scene.children[1]];
    play2.groupmesh.scale.x = 20;
    play2.groupmesh.scale.y = 20;
    play2.groupmesh.scale.z = 20;
    play2.groupmesh.add(play2.mesh[0]);
    play2.groupmesh.add(play2.mesh[1]);
    scene.add(play2.groupmesh);
  });

  loader.load("model/tankbody.glb", function (gltf) {
    play3.mesh = [gltf.scene, 0];
    play3.mesh[0].scale.x = 20;
    play3.mesh[0].scale.y = 20;
    play3.mesh[0].scale.z = 20;
    play3.groupmesh.add(play3.mesh[0]);
  });

  loader.load("model/tanktate.glb", function (gltf) {
    play3.mesh[1] = gltf.scene;

    play3.mesh[1].scale.x = 20;
    play3.mesh[1].scale.y = 20;
    play3.mesh[1].scale.z = 20;
    play3.mesh[1].rotation.y = 90 * (Math.PI / 180);

    play3.groupmesh.add(play3.mesh[1]);
    scene.add(play3.groupmesh);
  });

  loader.load("model/heal.glb", function (gltf) {
    play4.mesh = gltf.scene;

    play4.mesh.scale.x = 20;
    play4.mesh.scale.y = 20;
    play4.mesh.scale.z = 20;
    play4.mesh.rotation.x = 180 * (Math.PI / 180);

    play4.groupmesh.add(play4.mesh);

    scene.add(play4.groupmesh);
  });

var jujika =[]

  for (let i = 0; i < 16; i += 1) {

    audioLoader.load( 'sound/敵death.mp3', function( buffer ) {
      tdeath.setBuffer( buffer );
      tdeath.setLoop( false );
      tdeath.setVolume( 0.4);
    });
    loader.load(
      "model/juji.glb",
      function (gltf) {
        // glfファイル読み込み
        jujika[i] = gltf.scene;
        jujika[i].scale.x = 10;
        jujika[i].scale.y = 10;
        jujika[i].scale.z = 10;
        jujika[i].position.y = 10
        jujika[i].rotation.y = 90*(Math.PI/180)
        
        scene.add(jujika[i]);
        jujika[i].visible = false
      })
  

    enemies.enemyprepare(i);
    loader.load("model/farchara-gun.glb", function (gltf) {
      play1_gun.mesh[i] = gltf.scene;
      play1_gun.mesh[i].scale.x = 50;
      play1_gun.mesh[i].scale.y = 50;
      play1_gun.mesh[i].scale.z = 50;
      play1_gun.mesh[i].position.x = 500;
      scene.add(play1_gun.mesh[i]);
    });
    loader.load("model/healgun.glb", function (gltf) {
      play4_gun.mesh[i] = gltf.scene;

      play4_gun.mesh[i].scale.x = 20;
      play4_gun.mesh[i].scale.y = 20;
      play4_gun.mesh[i].scale.z = 20;

      scene.add(play4_gun.mesh[i]);
    });
    loader.load("model/enemy.glb", function (gltf) {
      enemies.mesh[i] = gltf.scene;

      enemies.mesh[i].scale.x = 20;
      enemies.mesh[i].scale.y = 20;
      enemies.mesh[i].scale.z = 20;

      scene.add(enemies.mesh[i]);
    });
  }

  // var gridHelper = new THREE.GridHelper(900, 10);
  // scene.add(gridHelper);

  const light2 = new THREE.AmbientLight(0xffffff, 1);
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2;
  light.position.set(1, 1, 1);

  scene.add(light);
  scene.add(light2);

  play1.prepare();
  play2.prepare();
  play3.prepare();
  play4.prepare();
  
  play1.groupmesh.castShadow = true

play1.groupmesh.receiveShadow = true

  tick();
  function tick() {
    requestAnimationFrame(tick);

    if (playstart == 1) {
      for(let i = 0; i < chara.length; i += 1){
        if(chara[i] == 'アーチャー'){
          play1.hp = 0
        }else if(chara[i] == 'アタッカー'){
          play2.hp = 0
        }else if(chara[i] == 'タンク'){
          play3.hp = 0
        }else if(chara[i] == 'ヒーラー'){
          play4.hp = 0
        }
      }
      startmessage += 1;
      play1.groupmesh.receiveShadow = true;
      play2.atari = new Array(2).fill(new THREE.Box3());

      addten(play1.groupmesh, play1.atari, play1);
      addten(play2.mesh[1], play2.atari[0], play2);
      addten(play2.mesh[0], play2.atari[1], play2_ken);
      addten(play3.groupmesh, play3.atari, play3);
      addten(play4.groupmesh, play1.atari, play4);

      play1.tickdo(playerinfo.ar);
      play2.tickdo(playerinfo.at);
      play3.tickdo(playerinfo.ta);
      play4.tickdo(playerinfo.he);
      for (let i = 0; i < 16; i += 1) {
        enemies.enemytick(i);
        
        addtens(play1_gun.mesh[i], play1_gun.atari[i], play1_gun, i);
        addtens(play4_gun.mesh[i], play4_gun.atari[i], play4_gun, i);
        if (play2.atcooltime >= 200) {
          if (hantei(play2_ken, i)) {
            if (play2.atsw == 1&& enemies.appear[i]) {
              enemies.hp[i] -= 14;
              effectAll.position.set(enemies.x[i],enemies.y[i],enemies.z[i]+20)
              scaley = 3
              play2.atcooltime = 0;
              play2.downCount += 20
              if(enemies.hp[i] <= 0){
                juu(i)
              }
            }
          }
        } else {
          play2.atcooltime += 1;
        }

        if (play3.atcooltime >= 200) {
          if (play3.sig == 1&& enemies.appear[i]) {
            if (hantei(play3, i)) {
              enemies.hp[i] -= 2;
              effectAll.position.set(enemies.x[i],enemies.y[i],enemies.z[i]+20)
              scaley = 3
              play3.atcooltime = 0;
              play3.downCount += 2
              if(enemies.hp[i] <= 0){
                juu(i)
              }
            }
          }
        } else {
          play3.atcooltime += 1;
        }

        play1_gun.mesh[i].position.x = play1_gun.x[i];
        play1_gun.mesh[i].position.y = play1_gun.y[i];
        play1_gun.mesh[i].position.z = play1_gun.z[i];

        play1_gun.x[i] += -1 * seigen(play1_gun.angle[i], 6);
        play1_gun.z[i] += -1 * seigen(90 - play1_gun.angle[i], 6);

        if (
          play1_gun.x[i] > 450 ||
          play1_gun.x[i] < -450 ||
          play1_gun.z[i] > 450 ||
          play1_gun.z[i] < -450
        ) {
          play1_gun.mesh[i].visible = false;
        } else {
          play1_gun.mesh[i].visible = true;
        }

        play1_gun.mesh[i].rotation.x += 0.1;
        play1_gun.mesh[i].rotation.z += 0.1;

        play4_gun.mesh[i].position.x = play4_gun.x[i];
        play4_gun.mesh[i].position.y = play4_gun.y[i];
        play4_gun.mesh[i].position.z = play4_gun.z[i];

        play4_gun.x[i] += -1 * seigen(play4_gun.angle[i], 6);
        play4_gun.z[i] += -1 * seigen(90 - play4_gun.angle[i], 6);

        if (play4_gun.x[i] > 500) {
          play4_gun.x[i] == 600;
        }
        play4_gun.mesh[i].rotation.x += 0.1;
        play4_gun.mesh[i].rotation.z += 0.1;

        if (
          play4_gun.x[i] > 450 ||
          play4_gun.x[i] < -450 ||
          play4_gun.z[i] > 450 ||
          play4_gun.z[i] < -450
        ) {
          play4_gun.mesh[i].visible = false;
        } else {
          play4_gun.mesh[i].visible = true;
        }

            for (let i2 = 0; i2 < 16; i2 += 1) {
              if (play1_gun.mesh[i].visible&& enemies.appear[i2]) {
              if (
                play1_gun.ten.max.x[i] > enemies.ten.min.x[i2] &&
                play1_gun.ten.min.x[i] < enemies.ten.max.x[i2] &&
                play1_gun.ten.max.y[i] > enemies.ten.min.y[i2] &&
                play1_gun.ten.min.y[i] < enemies.ten.max.y[i2] &&
                play1_gun.ten.max.z[i] > enemies.ten.min.z[i2] &&
                play1_gun.ten.min.z[i] < enemies.ten.max.z[i2]
              ) {
                enemies.hp[i2] -= 15;
                effectAll.position.set(enemies.x[i2],enemies.y[i2],enemies.z[i2]+20)
                  scaley = 3
                play1_gun.angle[i] = 0;
                play1_gun.x[i] = 500;
                play1.downCount += 15
                if(enemies.hp[i2] <= 0){
                  juu(i2)
                }
              }
            }
        }
               if (play4_gun.mesh[i].visible ) {
              if (
                play4_gun.ten.max.x[i] > play1.ten.min.x&&
                play4_gun.ten.min.x[i] < play1.ten.max.x &&
                play4_gun.ten.max.y[i] > play1.ten.min.y &&
                play4_gun.ten.min.y[i] < play1.ten.max.y &&
                play4_gun.ten.max.z[i] > play1.ten.min.z &&
                play4_gun.ten.min.z[i] < play1.ten.max.z
              ) {
                play1.hp += 2
                play4.downCount += 2
                if(play1.hp > play1.basehp){
                  play1.hp = play1.basehp
                }
                play4_gun.angle[i] = 0;
                play4_gun.x[i] = 500;
            }else if(
                play4_gun.ten.max.x[i] > play2.ten.min.x&&
                play4_gun.ten.min.x[i] < play2.ten.max.x &&
                play4_gun.ten.max.y[i] > play2.ten.min.y &&
                play4_gun.ten.min.y[i] < play2.ten.max.y &&
                play4_gun.ten.max.z[i] > play2.ten.min.z &&
                play4_gun.ten.min.z[i] < play2.ten.max.z
            ){
              play2.hp += 2
              play4.downCount += 2
                if(play2.hp > play2.basehp){
                  play2.hp = play2.basehp
                }
                play4_gun.angle[i] = 0;
                play4_gun.x[i] = 500;
            }else if(
              play4_gun.ten.max.x[i] > play3.ten.min.x&&
              play4_gun.ten.min.x[i] < play3.ten.max.x &&
              play4_gun.ten.max.y[i] > play3.ten.min.y &&
              play4_gun.ten.min.y[i] < play3.ten.max.y &&
              play4_gun.ten.max.z[i] > play3.ten.min.z &&
              play4_gun.ten.min.z[i] < play3.ten.max.z
          ){
            play3.hp += 2
            play4.downCount += 2
              if(play3.hp > play3.basehp){
                play3.hp = play3.basehp
              }
              play4_gun.angle[i] = 0;
              play4_gun.x[i] = 500;
          }
        }
      }

      play1.mesh.rotation.x -= play1.speed / 30;

      if (play2.atsw == 0) {
        play2.groupmesh.rotation.y = (play2.angle + 90) * (Math.PI / 180);
      } else {
        if (play2.loi < 360) {
          play2.loi += 10;
          play2.angle2 += 10;
        } else {
          play2.atsw = 0;
        }
        play2.groupmesh.rotation.y = (play2.angle2 + 90) * (Math.PI / 180);
      }

      if (play3.sig == 1) {
        if (play3.atspeed < 15) {
          play3.atspeed += 1.5;
        } else {
          play3.sig = 0;
        }
      }
      if (play3.sig == 0) {
        if (play3.atspeed > 0) {
          play3.atspeed -= 1.5;
        }
      }
      play3.mesh[1].position.z = -1 * play3.atspeed;

      if (startmessage == 1) {
        mainTheme.stop()
        nowPlaying.play()
        eapear();
        setInterval(eapear, 2000 / (playerrole.length + 1 ));
        setInterval(setTimer, 1000);
      }
          if(scaley > 0){
      scaley -= 0.1
    }
    for(let i = 0;i < 8; i += 1){
      effectmove[i].scale.y = scaley
      }

      if(play1.hp <= 0 && play2.hp <= 0 && play3.hp <= 0 && play4.hp <= 0){
        nowPlaying.stop()
        document.getElementById('gameover').style.display = 'block'
        document.getElementById('gamepar').style.display = 'none'
        playstart = 0
      }
      document.getElementById('ar_num').textContent = `アーチャー与えたHP：${play1.downCount}`;
      document.getElementById('at_num').textContent = `アタッカー与えたHP：${play2.downCount}`;
      document.getElementById('ta_num').textContent = `タンク与えたHP：${play3.downCount}`;
      document.getElementById('he_num').textContent = `ヒーラー回復HP：${play4.downCount}`;

      document.addEventListener("keypress", keypress_ivent);
      renderer.render(scene, camera);
    }
  }

  // キーイベント

  function keypress_ivent(e) {
    if (e.key == "o") {
      p1act();
    }
    if (e.key == "i") {
      p2act();
    }

    if (e.key == "p") {
      p3act();
    }

    if (e.key == "l") {
      p4act();
    }
  }
  function seigen(ang, speed) {
    return (
      (Math.sin((ang * Math.PI) / 180) * speed) / Math.sin((90 * Math.PI) / 180)
    );
  }

  function p1act() {
    if (play1.interval >= 200) {
      play1.interval = 0;
      if (play1_gun.count < 15) {
        play1_gun.count += 1;
      } else {
        play1_gun.count = 0;
      }
      play1_gun.angle[play1_gun.count] = play1.angle;
      playSound(ar_sound)
      play1_gun.x[play1_gun.count] = play1.x;
      play1_gun.y[play1_gun.count] = play1.y;
      play1_gun.z[play1_gun.count] = play1.z;
      renderer.render(scene, camera);
    }else{
      while(play1.interval<200){
        play1.interval += 1
      }
    }
  }
  function p2act() {
    if (play2.interval >= 200) {
      playSound(at_sound)
      play2.interval = 0;
      play2.loi = 0;
      play2.atsw = 1;
      play2.angle2 = play2.angle;
    }else{
      while(play2.interval<200){
        play2.interval += 1
      }
    }
  }
  function p3act() {
    if (play3.interval >= 200) {
      playSound(ta_sound)
      play3.interval = 0;
      play3.sig = 1;
    } else {
      play3.sig = 0;
      while(play3.interval < 200){
        play3.interval += 1
      }
    }
  }
  function p4act() {
    if (play4.interval >= 200) {
      play4.interval = 0;
      if (play4_gun.count < 15) {
        play4_gun.count += 1;
      } else {
        play4_gun.count = 0;
      }
      play4_gun.angle[play4_gun.count] = play4.angle;
      playSound(he_sound)
      play4_gun.x[play4_gun.count] = play4.x;
      play4_gun.y[play4_gun.count] = play4.y;
      play4_gun.z[play4_gun.count] = play4.z;
      renderer.render(scene, camera);
    }else{
      while(play4.interval < 200){
        play4.interval += 1
      }
    }
  }
  // Boundingboxを追加
  function addten(base, baseH, addto) {
    baseH.setFromObject(base);
    addto.ten.max.x = baseH.max.x;
    addto.ten.max.y = baseH.max.y;
    addto.ten.max.z = baseH.max.z;

    addto.ten.min.x = baseH.min.x;
    addto.ten.min.y = baseH.min.y;
    addto.ten.min.z = baseH.min.z;
  }
  function addtens(base, baseH, addto, num) {
    baseH.setFromObject(base);
    addto.ten.max.x[num] = baseH.max.x;
    addto.ten.max.y[num] = baseH.max.y;
    addto.ten.max.z[num] = baseH.max.z;

    addto.ten.min.x[num] = baseH.min.x;
    addto.ten.min.y[num] = baseH.min.y;
    addto.ten.min.z[num] = baseH.min.z;
  }
  function eapear() {
    let findcount = enemies.appear.findIndex(eq0);
    if (findcount != -1) {
      enemies.x[findcount] = Math.floor(Math.random() * (450 + 450) - 450);
      enemies.z[findcount] = -350;
      enemies.y[findcount] = 30;
      enemies.hp[findcount] = 50;
      enemies.appear[findcount] = 1;
    }
  }
  // 敵[i]に対するfromの当たり判定
  function hantei(from, i) {
    return (
      from.ten.max.x > enemies.ten.min.x[i] &&
      from.ten.min.x < enemies.ten.max.x[i] &&
      from.ten.max.y > enemies.ten.min.y[i] &&
      from.ten.min.y < enemies.ten.max.y[i] &&
      from.ten.max.z > enemies.ten.min.z[i] &&
      from.ten.min.z < enemies.ten.max.z[i]
    );
  }
  function setTimer(){
    if(Timer > 0){
    Timer -= 1
    document.getElementById('timer').textContent = Timer
    }else{
      Timer -= 1
      playstart = 0
      document.getElementById('timer').textContent = 0
      document.getElementById('finish').style.opacity = 1
      nowPlaying.stop()
    }
    if(Timer <= -3){
      document.getElementById('gamepar').style.display = 'none';
      document.getElementById('clear').style.display = 'block';
    }
  }
  function playSound(sound) {
    if (sound.isPlaying) {
      sound.stop();
    }
    sound.play();
  }
  function juu(i){
    playSound(tdeath)
    jujika[i].visible = true
    jujika[i].position.set(enemies.x[i],enemies.y[i],enemies.z[i])
    setTimeout(() =>{jujika[i].visible = false}, 2000)
  }

}
