// キャラクターの重複がないようにする設定→script.js
// 難易度は60秒にしてちょうどよさそう
// 効果音とBGM設定

let showstart = false;

setTimeout(() =>   showstart = true,1000);

let charaCount = 0;

let chara = [
  ['アーチャー'],
  ['アタッカー'],
  ['タンク'],
  ['ヒーラー']
]
let mychara;
let playerrole =[]

document.getElementById('par').addEventListener('click',()=>{
  document.getElementById('parent').style.display='flex';
  document.getElementById('pcor').style.display='none';
})
document.getElementById('chi').addEventListener('click',()=>{
  document.getElementById('container').style.display='block';
  document.getElementById('pcor').style.display='none';

})

document.getElementById('fa-left').addEventListener('click',()=>{
  if(charaCount <= 0){
    charaCount = chara.length
  }
  charaCount -= 1
  document.getElementById('roleLabel').textContent = chara[charaCount]
})
document.getElementById('fa-right').addEventListener('click',()=>{
  if(charaCount <= 0){
    charaCount = chara.length
  }
  charaCount -= 1
  document.getElementById('roleLabel').textContent = chara[charaCount]
})

document.getElementById('start').style.opacity = 0
const tien = () =>{
  document.getElementById('start').style.display = 'none'
}
setTimeout(tien, 1000)

const Peer = window.Peer;
let playstart = 0;

let playerinfo = {
  ar:{
    ang:0,
    pul:0,
    tap:0,
    num:0
  },
  at:{
    ang:0,
    pul:0,
    tap:0,
    num:1
  },
  ta:{
    ang:0,
    pul:0,
    tap:0,
    num:2
  },
  he:{
    ang:0,
    pul:0,
    tap:0,
    num:3
  },
}
var rec = 60;


var playchara = []


// playnameはプレイヤーの名前を保存


let dataConnection;

(async function main() {
  
  const localId = document.getElementById('js-local-id');
  const connectTrigger = document.getElementById('js-connect-trigger');
  const remoteId = document.getElementById('js-remote-id');

  const peer = (window.peer = new Peer(
    id = `ga${Math.ceil(Math.random()*100)}`,
    {
    key: 'f63f6646-dda3-4a24-9557-98bfa4b6fe01',
    debug: 3,
  }));

  // Register connecter handler
  connectTrigger.addEventListener('click', () => {
    
    document.getElementById('container').style.display = "none"
    document.getElementById('select').style.display = "block"

    
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }
    // username = window.prompt("ユーザー名は？")
    dataConnection = peer.connect(remoteId.value);

    dataConnection.once('open', async () => {

      const open = {
        selector:7,
      }
      dataConnection.send(open)
    

    document.getElementById('nametriger').addEventListener('click',() =>{
      const waitC = document.getElementById('wait')
      if(chara[charaCount] == 'アーチャー'){
        waitC.innerHTML =  '<p id = "tips">Tips</p><h2>アーチャー</h2><p id = "tips_about">アーチャーは長射程での遠距離攻撃ができ、<br>敵の攻撃の届かない場所から一方的に攻撃が可能。<br>だがその反面HPが低いという弱点があるため、<br>味方に隠れて攻撃するといいのかもしれない。</p>'
      }else if(chara[charaCount] == 'アタッカー'){
        waitC.innerHTML =  '<p id = "tips">Tips</p><h2>アタッカー</h2><p id = "tips_about">アタッカーは近距離での攻撃ができ、<br>平均的なHPと高い攻撃力での戦闘が可能<br>前線に出ざるを得ないことでHPは減りやすいから<br>ヒーラーの回復と組み合わせるといいのかもしれない</p>'
      }else if(chara[charaCount] == 'タンク'){
        waitC.innerHTML =  '<p id = "tips">Tips</p><h2>タンク</h2><p id = "tips_about">タンクは大きい体で敵の狙いを集めることができ、<br>高いHPを駆使して味方を守ることができる<br>ただ攻撃力はものすごく低いから<br>守ることに特化した立ち回りをするのがいいのかもしれない</p>'
      }else if(chara[charaCount] == 'ヒーラー'){
        waitC.innerHTML =  '<p id = "tips">Tips</p><h2>ヒーラー</h2><p id = "tips_about">ヒーラーは唯一回復弾を使うことができ<br>前線で戦う味方に当てて回復させることができる。<br>ただ本人のHPはものすごく低いため<br>見方に隠れて後ろからサポートするのがいいのかもしれない</p>'
      }
      waitC.style.display ='block'
      document.getElementById('select').style.display ='none'
      const open = {
        selector:1,
        chara:chara[charaCount],
        count:charaCount
}
dataConnection.send(open)
const open2 = {
  selector:10,
}
dataConnection.send(open2)
    })
    document.getElementById('fa-left').addEventListener('click',()=>{
      const open = {
        selector:7,
      }
      dataConnection.send(open)
    })
    document.getElementById('fa-right').addEventListener('click',()=>{
      const open = {
        selector:7,
      }
      dataConnection.send(open)
    })

    });
    

    dataConnection.on('data', data => {

  if(data.selector == 2){
        document.getElementById('defaultCanvas0').style.display ='block'
        document.getElementById('wait').style.display ='none'
        document.getElementById('select').style.display ='none'
        function loopsend(){
          const open = {
            selector:11,
            role:Myinfo.role,
            ang: anglebase,
            pul: pullbase,
            si:siz
    }
    dataConnection.send(open)

    requestAnimationFrame(loopsend);
  }
  loopsend();


      }else if(data.selector == 4){
        Myinfo = {
          role : data.chara,
        }
      }else if(data.selector == 13){
        chara = data.charanow
      }else if(data.selector == 8){
        chara = data.charas
      }
    });
  });
// 上は　子の受け取りと送る処理
// 下は　親と受け取りと送る処理
  peer.once('open', id => (localId.textContent = id));

  // Register connected peer handler
  peer.on('connection', dataConnection => {
    dataConnection.once('open', async () => {

      document.getElementById('gamestart').addEventListener('click',()=>{
        playstart = 1
        document.getElementById('gamepar').style.display ='block'
      document.getElementById('parent').style.display ='none'


      
      const open = {
        selector:2
}
dataConnection.send(open)

      })
    });

    dataConnection.on('data', (data) => {
      if(data.selector == 1){
        chara.splice(data.count, 1)
        playerrole.push(data.chara)
          const open = {
            selector:4,
            chara:data.chara,
    }
    dataConnection.send(open)

    document.getElementById('player').innerHTML = ' '

    for(let i = 0; i <playerrole.length; i += 1){
      var prole = document.createElement('li'); 
    prole.textContent = playerrole[i];
    document.getElementById('player').appendChild(prole); 
    }

      }else if(data.selector == 11){
        if(data.role == 'アーチャー'){
          playerinfo.ar.ang = data.ang
          playerinfo.ar.pul = data.pul
          if(data.si == 150){
            playerinfo.ar.tap = 1
          }else{
            playerinfo.ar.tap = 0
          }


        }else if(data.role == 'アタッカー'){
          playerinfo.at.ang = data.ang
          playerinfo.at.pul = data.pul
          if(data.si == 150){
            playerinfo.at.tap = 1
          }else{
            playerinfo.at.tap = 0
          }


        }else if(data.role == 'タンク'){
          playerinfo.ta.ang = data.ang
          playerinfo.ta.pul = data.pul
          if(data.si == 150){
            playerinfo.ta.tap = 1
          }else{
            playerinfo.ta.tap = 0
          }

        }else if(data.role == 'ヒーラー'){
          playerinfo.he.ang = data.ang
          playerinfo.he.pul = data.pul
          if(data.si == 150){
            playerinfo.he.tap = 1
          }else{
            playerinfo.he.tap = 0
          }

        }
      }else if(data.selector == 7){
        const op = {
          selector:8,
          charas :chara
        }
        dataConnection.send(op)
      }
    });



    // Register closing handler
  });


  peer.on('error', console.error);
})();
