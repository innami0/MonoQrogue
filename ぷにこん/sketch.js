var by = 265;
var bxy = 28*2 ;
var pull = [];
var pullbase = 0;

var cX = 0;
var cY = 0;
var cX2 = 200;
var cY2 = 200;

var angle = [];
var anglebase = 0;

var Myinfo;

var minec;

var kaku = 0;

var adding = 0;

var opa = 255;

var siz = 100;

function disableScroll(event) {
  event.preventDefault();
}

// イベントと関数を紐付け
document.addEventListener('touchmove', disableScroll, { passive: false });


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function yogen(a,b){
  
  if(a == 0){
    a = 1
  }
  
  var c = sqrt(a*a + b*b)
  var cosmoto = (a*a + c*c - b*b ) / (2 * a * c)
  var res;
  if(b < 0){
    res = 180 + (180-acos(cosmoto) * 180/PI)
  }else{
    res = acos(cosmoto) * 180/PI
  }
  
  return res;
}
function draw() { 
  background(0, 0, 0);
noFill();
  // circle(0,0,100)
   stroke(255,255,255,opa);
  // bezier(-50-0,-50-by,50,by,50,0)
  // bezier(-50 - pullbase,0,-50-0+bxy,0-bxy,50,0,50)
  // bezier(-50 - pullbase,0,-50-0-bxy,0-bxy,-50-0,-50)
  
  var gunya = 0;
  if(pullbase * 0.5 < 90){
    gunya = pullbase * 0.5
  }else if(pullbase * 0.5 >= 90){
    gunya = 90
  }
  
  
  var gunyaelse = pullbase * 0.2;
  
  var jou = abs(mouseX - cX2)*abs(mouseX - cX2)+abs(mouseY - cY2)*abs(mouseY - cY2)
  adding = sqrt(jou);

  
  
  if (mouseIsPressed) {
          pullbase = adding
        opa = 255
    }else{
        if(opa > -100&&pullbase == 0){
            opa -= 18
        }
      if(pullbase > -100){
        pullbase -= 140
      }
      if(pullbase <= 0){
        pullbase = 0
      }
    }

    if(siz > 0){
      siz -= 10
      if(siz <= 100){

        siz = 100
      }
    }
  // 初期値の原点を中心にキャンバスを回転
    translate(cX2,cY2);
    if(pullbase > 30){
    anglebase = yogen((cX2-mouseX),(cY2-mouseY))*(PI/ 180)
    }
  rotate( anglebase);
  
  bezier(-1*siz-pullbase ,0,-1*siz-pullbase,0+bxy,0-bxy,+1*siz-gunya,0,+1*siz)
  bezier(-1*siz-pullbase ,0,-1*siz-pullbase,0-bxy,0-bxy,-1*siz+gunya,0,-1*siz)
  bezier(+1*siz,0,+1*siz,0-bxy,0+bxy,-1*siz - gunyaelse,0,-1*siz)
  bezier(+1*siz,0,+1*siz,0+bxy ,0+bxy ,+1*siz + gunyaelse,0,+1*siz)
stroke(255);
}

function mousePressed(){
  cX2 = mouseX
  cY2 = mouseY
  siz = 160

}
// -50 0 50 
// -100 0 100

