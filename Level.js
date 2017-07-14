function Level (){
  this.sprites = [];
  this.shots = [];
  this.inimigos = 3;
  this.predios = [];
  this.cooldown = 1;
  this.pontos =0;
}

Level.prototype.init = function () {
  for (var i = 0; i < this.inimigos; i++) {
    var inimigo = new Sprite();
    inimigo.x = 120+20*i;
    inimigo.y = 10;
    inimigo.width = 32;
    inimigo.height = 32;
    inimigo.vy = 300*i;
    inimigo.am = 00;
    inimigo.imgkey = "enemy";


    this.sprites.push(inimigo);
  }

};
Level.prototype.randomicEnemy = function (dt) {
 this.cooldown -=dt;

//  alert(this.cooldown);
  if(this.cooldown <0){
  var y = Math.floor((Math.random() * 10) + 6);
  var y = y/10;
  var x = 1.5 - y;
  var sinalX = Math.floor((Math.random() * 10) );
  if(sinalX>5)
  {
    x= x*-1;
  }
  var inimigo = new Sprite();
  inimigo.x = Math.floor((Math.random() * 590) + 10);
  inimigo.y = -10;
  inimigo.width = 32;
  inimigo.height =  32;;
  inimigo.imgkey = "enemy";
  inimigo.velxrandom = x;
  inimigo.velyrandom = y;
  this.sprites.push(inimigo);
  this.cooldown = 1;
}

  };



Level.prototype.desenhaPredios = function(ctx)
{
  for (var i = 0;i<6; i++){
  var inimigo = new Sprite();
  inimigo.x = 25 + (i*110);
  inimigo.y = 430 - 75;
  inimigo.width = 50;
  inimigo.height = 50;
  inimigo.vy = 3;
  inimigo.imgkey = "predio";
  this.predios.push(inimigo);
}
}

Level.prototype.mover = function (dt) {
    for (var i = this.shots.length-1;i>=0; i--) {
      this.shots[i].mover(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }

};
Level.prototype.moverEnemy = function (dt){
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].moverY(dt);
}
};

Level.prototype.moverAng = function (dt) {

    for (var i = this.shots.length-1; i >= 0; i--) {
      this.shots[i].moverAng(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
};

Level.prototype.desenhar = function (ctx) {
  for (var i = 0; i < this.predios.length; i++) {
    this.predios[i].desenhar(ctx , this.imageLib.images[this.predios[i].imgkey]);
  }

};
Level.prototype.desenharImg = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenharImg(ctx, this.imageLib.images[this.sprites[i].imgkey]);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenharImg(ctx, this.imageLib.images[this.shots[i].imgkey]);
    }
};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Level.prototype.perseguir = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguir(alvo,dt);
  }
};
Level.prototype.perseguirAng = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguirAng(alvo,dt);
  }
};

Level.prototype.fire = function (alvo, audiolib, key, vol){
  if(alvo.cooldown>0) return;
  var tiro = new Sprite();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.angle = alvo.angle;
  tiro.am = 500;
  tiro.width = 8;
  tiro.height = 16;
  tiro.imgkey = "shot";
  this.shots.push(tiro);
  alvo.cooldown = 1;
  if(audiolib && key) audiolib.play(key,vol);
}

Level.prototype.VerificaGameOver = function()
{
  if(this.predios.length >0)
  {return true;
  }
  else{
    return false;
  }
}
Level.prototype.colidiuComPrediosAux = function (alvo, resolveColisao) {
    for (var i = 0; i < this.predios.length; i++) {
      if(this.predios[i].colidiuCom(alvo)){
        resolveColisao(this.predios[i], alvo);
      }
    }
};


Level.prototype.colidiuComPredios = function(al, key){
  for(var i = this.sprites.length-1; i>=0; i--){

    this.colidiuComPrediosAux(this.sprites[i],
      (
        function(that)
        {
           return function(alvo){
            alvo.color = "green";
            that.sprites.splice(i,1);
            x = that.predios.indexOf(alvo);
            that.predios.splice(x, 1);
            if(al&&key) al.play(key);
          }
        }
      )(this));
  }
};


Level.prototype.colidiuComTiros = function(al, key, level){
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],
      (
        function(that)
        {
          return function(alvo){
            alvo.color = "green";
            that.shots.splice(i,1);
            x = that.sprites.indexOf(alvo);
            that.sprites.splice(x, 1);
            level.pontos +=10;
            if(al&&key) al.play(key);
          }
        }
      )(this));
  }
}


//
