/* ===== PIXEL (perso n°6) ===== */
let PSK='#ffe6b8';const PBD='#8892a8';
function pixHair(){ctx.beginPath();ctx.moveTo(-14,-104);ctx.quadraticCurveTo(-20,-150,-4,-160);ctx.moveTo(6,-104);ctx.quadraticCurveTo(14,-146,32,-150);ctx.moveTo(-34,-102);ctx.quadraticCurveTo(-52,-134,-70,-134);ctx.lineWidth=8;ctx.strokeStyle=INK;ctx.lineCap='round';ctx.stroke()}
function face(t,o){const {cx,cy,s}=o;ctx.save();ctx.translate(cx,cy);ctx.scale(s,s);
  ctx.beginPath();ctx.moveTo(-190,330);ctx.quadraticCurveTo(-175,150,-85,128);ctx.lineTo(85,128);ctx.quadraticCurveTo(175,150,190,330);ctx.closePath();fs(PBD,true,4);
  ctx.beginPath();ctx.arc(0,150,34,0,Math.PI);fs('#6f7890',true,4);
  ctx.beginPath();ctx.roundRect(-112,-106,224,230,96);fs(PSK,true,5);pixHair();
  ctx.fillStyle='rgba(255,130,120,.45)';ctx.beginPath();ctx.ellipse(-74,66,22,13,0,0,7);ctx.ellipse(74,66,22,13,0,0,7);ctx.fill();
  const bl=o.blink?cl(1-Math.abs(Math.sin(t*2.1))**40,0.08,1):1,[lx,ly]=o.look||[0,0],er=o.eye||1;
  for(const sx of[-1,1]){ctx.save();ctx.translate(sx*46,6);ctx.scale(1,bl);ctx.beginPath();ctx.ellipse(0,0,38*er,44*er,0,0,7);fs('#fff',true,5);
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(lx*18+sx*2,ly*18+8,10*er,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(lx*18-2,ly*18+2,3.6,0,7);ctx.fill();ctx.restore();
    const b=o.brow||0;if(b){ctx.strokeStyle=INK;ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sx*76,-34-b*.3);ctx.lineTo(sx*22,-52-b);ctx.stroke()}}
  if(o.mouth==='open'){ctx.beginPath();ctx.ellipse(0,90,20,16+3*Math.sin(t*6),0,0,7);fs('#5a1218',true,4);ctx.fillStyle='#e8606a';ctx.beginPath();ctx.ellipse(0,98,12,6,0,0,7);ctx.fill()}
  else{ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-18,92);ctx.quadraticCurveTo(0,84,18,92);ctx.stroke()}
  ctx.restore()}
function mini(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s*(o.flip||1),s);
  const ar=o.ar??0;
  ctx.lineCap='round';for(const [c,w] of [[INK,14],['#3a3f55',9]]){ctx.strokeStyle=c;ctx.lineWidth=w;for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*8,34);ctx.lineTo(sx*(8+(o.spread||0)),66+(o.step?Math.sin(T*10+sx)*5:0));ctx.stroke()}}
  for(const [c,w] of [[INK,13],[PBD,8]]){ctx.strokeStyle=c;ctx.lineWidth=w;for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*17,12);ctx.lineTo(sx*(17+Math.sin(sx*(.4+ar))*26),12+(1-ar*1.2)*26-ar*30);ctx.stroke()}}
  rr(-18,4,36,36,10);fs(PBD,true,3);
  ctx.beginPath();ctx.roundRect(-23,-38,46,44,19);fs(PSK,true,3);
  ctx.strokeStyle=INK;ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(-3,-38);ctx.quadraticCurveTo(-4,-50,0,-53);ctx.moveTo(2,-38);ctx.quadraticCurveTo(5,-48,10,-49);ctx.moveTo(-9,-38);ctx.quadraticCurveTo(-14,-46,-19,-46);ctx.stroke();
  for(const sx of[-1,1]){ctx.beginPath();ctx.arc(sx*9,-20,8,0,7);fs('#fff',true,2);ctx.fillStyle=INK;ctx.beginPath();ctx.arc(sx*9+1.5,-18,2.8,0,7);ctx.fill()}
  if(o.open){ctx.beginPath();ctx.ellipse(0,-6,4.5,4,0,0,7);fs('#5a1218',true,1.8)}else{ctx.strokeStyle=INK;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-4,-6);ctx.lineTo(4,-6);ctx.stroke()}
  ctx.restore()}

function win(x,y,w,h,lit){ // fenêtre avec volets, cadre, croisillons, appui
  for(const sx of[-1,1]){rr(sx<0?x-14:x+w+2,y-2,12,h+4,2);fs('#2f6b6b',true,3);ctx.strokeStyle='rgba(0,0,0,.3)';ctx.lineWidth=1.5;for(let k=1;k<5;k++){ctx.beginPath();ctx.moveTo(sx<0?x-14:x+w+2,y+k*h/5);ctx.lineTo(sx<0?x-2:x+w+14,y+k*h/5);ctx.stroke()}}
  rr(x-4,y-4,w+8,h+8,3);fs('#d7dbe8',true,3.5);
  rr(x,y,w,h,2);fs('#080a16',true,3);
  if(lit>0){ctx.save();ctx.globalAlpha=lit;rr(x,y,w,h,2);ctx.fillStyle='#ffd86a';ctx.fill();ctx.restore();cglow(x+w/2,y+h/2,150,`rgba(255,210,100,${.5*lit})`);
    ctx.save();ctx.globalAlpha=lit;ctx.fillStyle='#b23a52';ctx.fillRect(x,y,9,h);ctx.fillRect(x+w-9,y,9,h);ctx.restore()}
  ctx.strokeStyle='#d7dbe8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+w/2,y);ctx.lineTo(x+w/2,y+h);ctx.moveTo(x,y+h/2);ctx.lineTo(x+w,y+h/2);ctx.stroke();
  rr(x-9,y+h+4,w+18,7,2);fs('#cfd3e6',true,3)}
function realHouse(fl){
  const x0=44,x1=316,y0=262,y1=458;
  // pelouse + chemin
  ctx.fillStyle='#143022';ctx.fillRect(0,y1-8,W,24);ctx.fillStyle='#1d4a32';ctx.fillRect(0,y1-8,W,5);
  ctx.beginPath();ctx.moveTo(158,y1);ctx.lineTo(202,y1);ctx.lineTo(226,484);ctx.lineTo(134,484);ctx.closePath();fs('#6b6f86',true,3);
  // cheminée (derrière le toit)
  rr(250,150,32,76,2);fs('#7a3a3a',true,4);ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=1.5;for(let y=162;y<226;y+=12){ctx.beginPath();ctx.moveTo(250,y);ctx.lineTo(282,y);ctx.stroke()}rr(246,144,40,10,2);fs('#4a2424',true,3);
  // murs en clins
  rr(x0,y0,x1-x0,y1-y0,2);fs('#48527a',true,4);
  ctx.save();rr(x0,y0,x1-x0,y1-y0,2);ctx.clip();ctx.strokeStyle='rgba(10,12,30,.38)';ctx.lineWidth=2;for(let y=y0+13;y<y1;y+=13){ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke()}ctx.restore();
  rr(x0,y0,9,y1-y0,1);fs('#d7dbe8',true,2.5);rr(x1-9,y0,9,y1-y0,1);fs('#d7dbe8',true,2.5);
  // toit à tuiles
  ctx.beginPath();ctx.moveTo(x0-22,y0+14);ctx.lineTo(180,128);ctx.lineTo(x1+22,y0+14);ctx.closePath();fs('#2c2540',true,4.5);
  ctx.save();ctx.beginPath();ctx.moveTo(x0-22,y0+14);ctx.lineTo(180,128);ctx.lineTo(x1+22,y0+14);ctx.closePath();ctx.clip();
  ctx.strokeStyle='rgba(8,6,20,.55)';ctx.lineWidth=2;let rowi=0;for(let y=y0+4;y>130;y-=13){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();for(let x=((rowi%2)?0:9);x<W;x+=18){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-13);ctx.stroke()}rowi++}ctx.restore();
  rr(x0-24,y0+9,x1-x0+48,10,2);fs('#1c1630',true,3);
  // lucarne ronde
  ctx.beginPath();ctx.arc(180,206,17,0,7);fs('#d7dbe8',true,3.5);ctx.beginPath();ctx.arc(180,206,12.5,0,7);fs('#080a16',true,2.5);ctx.strokeStyle='#d7dbe8';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(180,194);ctx.lineTo(180,218);ctx.moveTo(168,206);ctx.lineTo(192,206);ctx.stroke();
  // fenêtres : étage (celle de droite s'allume) + rez-de-chaussée
  win(86,296,50,58,0);win(224,296,50,58,fl);
  win(86,388,50,48,0);win(224,388,50,48,0);
  // porte + auvent + marches + lampe
  rr(150,380,60,80,3);fs('#d7dbe8',true,3.5);rr(156,386,48,74,2);fs('#6a3a2a',true,3.5);
  for(const [px,py,pw,ph] of[[162,408,15,18],[183,408,15,18],[162,432,15,22],[183,432,15,22]]){rr(px,py,pw,ph,2);ctx.strokeStyle='rgba(0,0,0,.4)';ctx.lineWidth=2;ctx.stroke()}
  rr(163,391,34,11,2);fs('#080a16',true,2.5);ctx.fillStyle='#e0b04a';ctx.beginPath();ctx.arc(196,432,3,0,7);ctx.fill();
  ctx.beginPath();ctx.moveTo(138,382);ctx.lineTo(180,358);ctx.lineTo(222,382);ctx.closePath();fs('#2c2540',true,3.5);
  rr(150,458,60,7,1);fs('#8a8fa8',true,2.5);rr(144,464,72,7,1);fs('#7a7f98',true,2.5);
  cglow(142,414,70,'rgba(255,215,120,.5)');rr(138,406,8,14,2);fs('#fff0b0',true,2);
  // buissons
  for(const [bx,by,br] of[[70,y1-4,30],[104,y1,22],[290,y1-4,30],[256,y1,22]]){ctx.beginPath();ctx.ellipse(bx,by,br,br*.7,0,0,7);fs('#1f5a3a',true,3);ctx.fillStyle='rgba(120,200,140,.2)';ctx.beginPath();ctx.ellipse(bx-br*.3,by-br*.25,br*.4,br*.25,0,0,7);ctx.fill()}
  // palissade
  for(let x=2;x<W;x+=19){if(x>140&&x<214)continue;ctx.beginPath();ctx.moveTo(x,y1+22);ctx.lineTo(x,y1+3);ctx.lineTo(x+7.5,y1-5);ctx.lineTo(x+15,y1+3);ctx.lineTo(x+15,y1+22);ctx.closePath();fs('#cfd3e6',true,2.5)}
  ctx.fillStyle='#b9bdd2';ctx.fillRect(0,y1+9,140,5);ctx.fillRect(214,y1+9,W-214,5)}
