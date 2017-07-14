function Sprite(){
  this.g = 0;
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 32;
  this.height = 32;
  this.angle = 0;
  this.vang = 0;
  this.color = "blue";
  this.cooldown = 0;
  this.velxrandom =0;
  this.velyrandom = 0;
}

Sprite.prototype.desenhar = function (ctx, img) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(-this.width/2, this.height/2);
  ctx.lineTo(-this.width/2, -this.height/2);
  ctx.lineTo(+this.width/2,- this.height/2);
  ctx.lineTo(+this.width/2, this.height/2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.strokeStyle = "grey";
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    ctx.drawImage(img,0,0,img.width,img.height,-this.width/2,-this.height/1.9,this.width,this.height);
  ctx.restore();
};
Sprite.prototype.desenharMira = function (ctx){
    ctx.save();
     ctx.beginPath();
      ctx.arc(this.x,this.y,15,0,Math.PI*2,true); // Outer circle
      ctx.lineTo(this.x-15,this.y);
      ctx.moveTo(this.x, this.y-15);
      ctx.lineTo(this.x,this.y+15);
      ctx.strokeStyle = "red";
      ctx.stroke();
        ctx.restore();
}
Sprite.prototype.desenharImg = function (ctx, img) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.rotate(Math.PI/2);
  ctx.fillStyle = this.color;
  ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    ctx.strokeStyle = "grey";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Sprite.prototype.mover = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  this.angle = this.angle + this.vang*dt;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};

Sprite.prototype.moverY = function (dt) {
  this.y += this.velyrandom;
  this.x += this.velxrandom;
};


Sprite.prototype.moverAng = function (dt) {
  this.angle = this.angle + this.vang;
  this.ax = this.am*Math.cos(Math.PI*this.angle/180);
  this.ay = this.am*Math.sin(Math.PI*this.angle/180);
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};


Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x+this.width < alvo.x) return false;
  if(this.x > alvo.x+this.width) return false;
  if(this.y+this.height < alvo.y) return false;
  if(this.y > alvo.y+this.height) return false;
  return true;
};

Sprite.prototype.perseguir = function (alvo, dt) {
  this.ax = 10*dt*(alvo.x - this.x) - 0.05*this.vx;
  this.ay = 10*dt*(alvo.y - this.y) - 0.05*this.vy;
};

Sprite.prototype.perseguirAng = function (alvo, dt) {
  var dX = -alvo.x + this.x;
  var dY = -alvo.y + this.y;
  var dist = Math.sqrt(dX*dX+dY*dY);
  var dA = 180*Math.acos(dX/dist)/Math.PI;
  this.vang = 100*(dA - this.angle+180)*dt;
};








//
