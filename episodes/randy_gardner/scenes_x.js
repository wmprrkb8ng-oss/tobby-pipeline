/* ---- instants-clés (mots de la vraie voix) ---- */
const w=(x,k,d)=>WT(x,k,B[k]+d);
const tEVEIL=w('ÉVEILLÉ',0,.7),tONZE=w('ONZE',0,1.4),tLYC=w('LYCÉEN',0,3.9),tRANDY=w('RANDY',0,4.7),
 tDEC=w('DÉCEMBRE',1,1),tDIXS=w('DIX',1,3.1),tDEFI=w('DÉFI',1,4.6),tBATT=w('BATTRE',1,5.6),
 tREC2=w('RECORD',2,.1),tDEUX2=w('DEUX',2,1),tALORS=w('ALORS',2,2.4),tDORT=w('DORT',2,3.4),tSES=w('SES',2,4.3),tAMIS=w('AMIS',2,4.5),
 tTROIS=w('TROISIÈME',3,.3),tNAUS=w('NAUSÉE',3,1.5),tOUBL=w('OUBLIE',3,2.3),tFACHE=w('FÂCHE',3,3.2),
 tCHERCH=w('CHERCHEUR',4,.2),tSTAN=w('STANFORD',4,2.1),tJOUENT=w('JOUENT',4,3.8),tBASK=w('BASKET',4,4),tFLIP=w('FLIPPER',4,4.9),
 tDIX=w('DIXIÈME',5,.1),tBAT=w('BAT',5,1.6),tFLIP5=w('FLIPPER',5,2.4),
 tONZ=w('ONZIÈME',6,.1),tRETIR=w('RETIRER',6,1.6),tCENT=w('CENT',6,3.1),tS65=w('SOIXANTE',6,4.2),tCINQ=w('CINQ',6,4.6),tARRET=w('S\'ARRÊTE',6,5.2),tOUBL6=w('OUBLIÉ',6,6.1),
 tMAIS=w('MAIS',7,.1),tTIENT=w('TIENT',7,.3),tDEUX7=w('DEUX',7,1),tHEU7=w('HEURES',7,2),tONZE7=w('ONZE',7,2.5),tREC7=w('RECORD',7,4.5),
 tALORS8=w('ALORS',8,.1),tDORT8=w('DORT',8,.7),tQUAT=w('QUATORZE',8,1.7),tMED=w('MÉDECINS',8,3.5),tSANTE=w('SANTÉ',8,4.9),
 tREC9=w('RECORD',9,.4),tBATTU=w('BATTU',9,1.1),tANN=w('ANNÉE',9,1.8),
 tTOI=w('TOI',10,.2),tCOMB=w('COMBIEN',10,1.2),tHEU10=w('HEURES',10,1.7),tDORM=w('DORMIR',10,2.3);
/* ---- HUD : compteur d'heures sans dormir (sous la barre TikTok) ---- */
const HK=[[0,0],[tDORT,0],[tTROIS,72],[tDIX,216],[tONZ,240],[tHEU7,264]];
function hours(t){if(t<=HK[0][0])return 0;for(let i=1;i<HK.length;i++)if(t<HK[i][0]){const a=HK[i-1],b=HK[i];return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0])}return 264}
function hudG(t){const n=Math.floor(hours(t)),z=t>=tDORT8,full=n>=264;ctx.save();ctx.textBaseline='middle';ctx.textAlign='left';
  rr(30,84,294,42,12);fs('rgba(12,16,40,.9)',true,3);ctx.strokeStyle=z?GRN:full?YEL:BLU;ctx.lineWidth=3;ctx.stroke();ctx.font='700 8px P';ctx.fillStyle='#cfe8ff';ctx.fillText(z?'ENFIN LE SOMMEIL':'HEURES SANS DORMIR',40,96);
  rr(40,108,170,9,4.5);ctx.fillStyle='#2c3160';ctx.fill();const f=Math.min(1,n/264);if(f>0){rr(40,108,Math.max(9,170*f),9,4.5);ctx.fillStyle=full?YEL:BLU;ctx.fill()}
  ctx.fillStyle='#fff';ctx.fillRect(40+170*260/264-1,105,2,15);
  ctx.font='700 21px P';ctx.textAlign='right';ctx.fillStyle=z?GRN:full?YEL:'#fff';ctx.fillText(z?'ZZZ':n+' h',314,108);ctx.restore()}
/* ---- accessoires et décors ---- */
function tob(x,y,s,o={},fx={}){mini(x,y,s,o);ctx.save();ctx.translate(x,y);ctx.scale(s*(o.flip||1),s);
  if(fx.coat){rr(-18,4,36,36,10);fs('#f4f6ff',true,3);ctx.beginPath();ctx.moveTo(-6,4);ctx.lineTo(0,18);ctx.lineTo(6,4);ctx.strokeStyle=INK;ctx.lineWidth=2;ctx.stroke()}
  if(fx.green){ctx.fillStyle='rgba(120,200,70,.5)';ctx.beginPath();ctx.roundRect(-23,-38,46,44,19);ctx.fill()}
  if(fx.bags){ctx.fillStyle=`rgba(90,60,130,${.55*fx.bags})`;for(const sx of[-1,1]){ctx.beginPath();ctx.ellipse(sx*9,-12,7,2.6,0,0,7);ctx.fill()}}
  if(fx.glasses){ctx.strokeStyle=INK;ctx.lineWidth=2;for(const sx of[-1,1]){ctx.beginPath();ctx.arc(sx*9,-20,9.5,0,7);ctx.stroke()}ctx.beginPath();ctx.moveTo(-2,-20);ctx.lineTo(2,-20);ctx.stroke()}
  if(fx.angry){ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.lineCap='round';for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*17,-33);ctx.lineTo(sx*3,-27);ctx.stroke()}}
  if(fx.sleep){for(const sx of[-1,1]){ctx.beginPath();ctx.arc(sx*9,-20,8.6,0,7);ctx.fillStyle=PSK;ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=2.2;ctx.beginPath();ctx.arc(sx*9,-21,5,.15*Math.PI,.85*Math.PI);ctx.stroke()}}
  if(fx.tie){ctx.beginPath();ctx.moveTo(-3,6);ctx.lineTo(3,6);ctx.lineTo(4,22);ctx.lineTo(0,27);ctx.lineTo(-4,22);ctx.closePath();fs(fx.tie,true,1.8)}
  ctx.restore()}
function qm(x,y,s,t,c='#fff'){ctx.save();ctx.translate(x,y+Math.sin(t*5)*3);ctx.scale(s,s);ctx.font='700 28px P';ctx.textAlign='center';ctx.lineWidth=7;ctx.strokeStyle=INK;ctx.lineJoin='round';ctx.strokeText('?',0,0);ctx.fillStyle=c;ctx.fillText('?',0,0);ctx.restore()}
function zzz(x,y,t){for(let i=0;i<3;i++){const q=(t*.7+i/3)%1;ctx.save();ctx.globalAlpha=Math.sin(q*3.14);ctx.translate(x+q*34,y-q*60);ctx.font=`700 ${16+i*7}px P`;ctx.textAlign='center';ctx.lineWidth=5;ctx.strokeStyle=INK;ctx.lineJoin='round';ctx.strokeText('Z',0,0);ctx.fillStyle='#cfe8ff';ctx.fillText('Z',0,0);ctx.restore()}}
function room(night,t){if(night){bg('#1c2048','#3a3f78');stars(14,150,5)}else bg('#9ad0ff','#e6f4ff');
  ctx.fillStyle=night?'#2a2f5e':'#f0dcc0';ctx.fillRect(0,170,W,290);ctx.fillStyle=night?'#4a3a52':'#a87a55';ctx.fillRect(0,440,W,200);ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(0,440,W,5);
  rr(40,205,92,100,4);fs(night?'#0c1030':'#bfe6ff',true,4);if(night){moon(88,240,13)}ctx.strokeStyle=INK;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(86,205);ctx.lineTo(86,305);ctx.moveTo(40,255);ctx.lineTo(132,255);ctx.stroke()}
function wclock(x,y,r,a,col='#fff'){ctx.beginPath();ctx.arc(x,y,r,0,7);fs(col,true,4);ctx.strokeStyle=INK;ctx.lineWidth=2;for(let i=0;i<12;i++){const q=i*Math.PI/6;ctx.beginPath();ctx.moveTo(x+Math.sin(q)*r*.82,y-Math.cos(q)*r*.82);ctx.lineTo(x+Math.sin(q)*r*.94,y-Math.cos(q)*r*.94);ctx.stroke()}
  ctx.lineCap='round';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.sin(a/12)*r*.5,y-Math.cos(a/12)*r*.5);ctx.stroke();ctx.lineWidth=3;ctx.strokeStyle=RED;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.sin(a)*r*.78,y-Math.cos(a)*r*.78);ctx.stroke()}
function bed(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(!o.post){rr(-100,-10,200,30,6);fs('#8a5a3a',true,4);rr(-100,-40,200,36,8);fs('#e9ecf7',true,4);rr(-100,-52,50,24,10);fs('#fff',true,3.5);rr(-96,18,12,28,3);fs('#6a4a2a',true,3);rr(84,18,12,28,3);fs('#6a4a2a',true,3)}
  if(o.blanket){rr(-45,-52,145,30,8);fs('#4a8ae0',true,4);ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=3;for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(-30+i*35,-48);ctx.lineTo(-30+i*35,-26);ctx.stroke()}}
  ctx.restore()}
function trophy(x,y,s,k=1,col='#ffd24a'){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);rr(-26,62,52,16,4);fs('#8a5a3a',true,4);rr(-8,36,16,28,2);fs(col,true,4);
  for(const sx of[-1,1]){ctx.beginPath();ctx.ellipse(sx*42,-34,15,20,0,0,7);ctx.strokeStyle=INK;ctx.lineWidth=9;ctx.stroke();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke()}
  ctx.beginPath();ctx.moveTo(-40,-60);ctx.lineTo(40,-60);ctx.quadraticCurveTo(40,28,0,38);ctx.quadraticCurveTo(-40,28,-40,-60);ctx.closePath();fs(col,true,4.5);
  ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(-20,-30,5,22,.1,0,7);ctx.fill();ctx.restore()}
function confetti(u,n=26){for(let i=0;i<n;i++){const q=(u*.45+i/n)%1;ctx.fillStyle=[RED,YEL,BLU,GRN,ORG][i%5];ctx.save();ctx.translate((i*47)%340+10+Math.sin(u*3+i)*8,110+q*430);ctx.rotate(u*4+i);ctx.fillRect(-4,-2,8,4);ctx.restore()}}
function palm(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle=INK;ctx.lineWidth=14;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(8,-60,-4,-120);ctx.stroke();ctx.strokeStyle='#a87a4a';ctx.lineWidth=8;ctx.stroke();
  for(let i=0;i<6;i++){const a=-Math.PI/2+(i-2.5)*.55;ctx.save();ctx.translate(-4,-120);ctx.rotate(a);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(26,-16,60,8);ctx.quadraticCurveTo(26,-4,0,0);fs('#3dbb6a',true,3);ctx.restore()}ctx.restore()}
function school(x,y,s,txt){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-110,-120,220,120,4);fs('#d9855a',true,4);ctx.fillStyle='#b9633f';ctx.fillRect(-110,-120,220,10);for(let i=0;i<4;i++)for(let j=0;j<2;j++){rr(-96+i*50,-98+j*44,34,28,3);fs('#bfe6ff',true,3)}rr(-16,-48,32,48,3);fs('#6a4a2a',true,3.5);
  rr(-60,-146,120,24,6);fs('#fff',true,3.5);ctx.fillStyle=INK;ctx.font='700 12px P';ctx.textAlign='center';ctx.fillText(txt,0,-129);ctx.restore()}
function stanford(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-120,-12,240,14,3);fs('#c9bfae',true,4);rr(-110,-100,220,88,3);fs('#e8dcc2',true,4);for(let i=0;i<6;i++){rr(-96+i*36,-96,16,80,3);fs('#f7efe0',true,3)}
  ctx.beginPath();ctx.moveTo(-124,-100);ctx.lineTo(0,-150);ctx.lineTo(124,-100);ctx.closePath();fs('#b84a3a',true,4);rr(-66,-114,132,24,6);fs('#8c1d2c',true,3.5);ctx.fillStyle='#fff';ctx.font='700 14px P';ctx.textAlign='center';ctx.fillText('STANFORD',0,-96);ctx.restore()}
function hoop(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-4,-10,8,150,2);fs('#8892a8',true,3.5);rr(-44,-90,88,64,4);fs('#fff',true,4);rr(-18,-68,36,26,2);ctx.strokeStyle=RED;ctx.lineWidth=3.5;ctx.stroke();
  ctx.strokeStyle=INK;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(0,-14,24,6,0,0,7);ctx.stroke();ctx.strokeStyle=ORG;ctx.lineWidth=3.5;ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=2;for(let i=-3;i<=3;i++){ctx.beginPath();ctx.moveTo(i*7,-12);ctx.lineTo(i*4,16);ctx.stroke()}ctx.restore()}
function ball(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,7);fs('#f08a3a',true,3);ctx.strokeStyle=INK;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-r,y);ctx.lineTo(x+r,y);ctx.moveTo(x,y-r);ctx.lineTo(x,y+r);ctx.stroke()}
function pinball(x,y,s,t,sc){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-64,-110,128,200,14);fs('#7a3af0',true,4.5);rr(-52,-96,104,150,8);fs('#1b1550',true,3.5);
  for(const [bx,by,c] of[[-26,-60,RED],[24,-66,YEL],[0,-30,GRN],[-30,0,BLU],[30,-4,ORG]]){const k=Math.sin(t*9+bx)>.6?1.25:1;ctx.beginPath();ctx.arc(bx,by,9*k,0,7);fs(c,true,3)}
  const bx=Math.sin(t*4.3)*34,by=-20+Math.abs(Math.sin(t*3.1))*60;ctx.beginPath();ctx.arc(bx,by,5.5,0,7);fs('#e9ecf7',true,2.5);
  ctx.beginPath();ctx.moveTo(-30,46);ctx.lineTo(-8,52);ctx.lineTo(-30,56);ctx.closePath();fs(YEL,true,2.5);ctx.beginPath();ctx.moveTo(30,46);ctx.lineTo(8,52);ctx.lineTo(30,56);ctx.closePath();fs(YEL,true,2.5);
  rr(-48,64,96,18,5);fs('#000',true,3);ctx.fillStyle=GRN;ctx.font='700 13px P';ctx.textAlign='center';ctx.fillText(sc,0,77.5);ctx.restore()}
function board(x,y,w,h,lines,hl=-1){rr(x,y,w,h,8);fs('#2e5a46',true,4.5);rr(x+6,y+6,w-12,h-12,5);ctx.strokeStyle='#8a5a3a';ctx.lineWidth=3;ctx.stroke();ctx.textAlign='center';lines.forEach((ln,i)=>{ctx.font='700 '+(ln.sz||20)+'px P';ctx.fillStyle=ln.c||'#fff';ctx.fillText(ln.t,x+w/2,y+(ln.y||34+i*30))})}
function cal(x,y,s,top,big,c=RED,k=1){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);rr(-52,-60,104,120,10);fs('#fff',true,4.5);rr(-52,-60,104,30,10);fs(c,true,4.5);ctx.fillStyle='#fff';ctx.font='700 14px P';ctx.textAlign='center';ctx.fillText(top,0,-39);ctx.fillStyle=INK;ctx.font='700 '+(big.length>3?30:50)+'px P';ctx.fillText(big,0,26);for(const sx of[-28,28]){rr(sx-4,-70,8,18,3);fs('#8892a8',true,2.5)}ctx.restore()}
function tag(t,u,txt,x,y,rot=-.12,c='#fff'){ctx.save();ctx.translate(x,y);ctx.rotate(rot);pill(0,0,txt.length*9+24,txt,c,INK,10,24);ctx.restore()}
function floor_(c1='#a87a55'){ctx.fillStyle=c1;ctx.fillRect(0,440,W,200);ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(0,440,W,5)}
/* ================= SCÈNES ================= */
function S0a(t,u){room(true,t);bed(250,440,.9);
  const bl=Math.sin(u*2)>-.95;tob(150,372,1.6,{open:Math.sin(u*5)>0,ar:.6},{bags:.2});
  wclock(280,230,32,u*3);pill(180,150,262,'ET SI TU RESTAIS ÉVEILLÉ ?',RED,'#fff',13,34);
  pop(t,tONZE,k=>{ctx.translate(180,205);ctx.scale(k,k);pill(0,0,170,'11 JOURS !',YEL,INK,20,38)})}
function S0b(t,u){bg('#8fd3ff','#e9f6ff');cloud(70,210,.9);cloud(280,240,.8);ctx.fillStyle='#6fb36a';ctx.fillRect(0,440,W,200);school(180,440,1.2,'LYCÉE');
  tob(70,370,1.4,{ar:.2});const k=t<tRANDY?0:seg(t,tRANDY,tRANDY+.3);
  pill(180,150,t<tLYC?200:236,t<tLYC?'HISTOIRE VRAIE':'UN VRAI LYCÉEN',t<tLYC?GRN:ORG,'#fff',15,34);
  if(k>0){ctx.save();ctx.translate(190,350);ctx.scale(k,k);pill(0,0,196,'RANDY GARDNER',YEL,INK,17,36);ctx.restore()}}
function S1a(t,u){bg('#ffb36a','#ffe9b8');cglow(280,230,120,'rgba(255,240,170,.8)');ctx.beginPath();ctx.arc(280,230,36,0,7);fs('#ffd24a',true,3.5);ctx.fillStyle='#4aa8e8';ctx.fillRect(0,430,W,210);ctx.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<6;i++)ctx.fillRect(20+((i*61+u*20)%300),450+i*20,36,3);
  palm(60,440,1.2);palm(250,450,.9);tob(170,380,1.3,{ar:.3});pill(180,150,t<tDEC?236:236,'CALIFORNIE • 1963',ORG,'#fff',14,34);
  pop(t,tDEC,k=>cal(110,290,.8,'DÉCEMBRE','1963',RED,k))}
function S1b(t,u){bg('#7a3af0','#2a0f6a');rays(180,320,'#fff',20,u,.1);dots('#fff',.08,0,H,26,4);const k=seg(u,0,.3);tob(180,380,1.7,{ar:.5+.3*Math.sin(u*6)});
  ctx.save();ctx.translate(180,236);ctx.scale(k,k);pill(0,0,190,'17 ANS',YEL,INK,36,70);ctx.restore();pill(180,150,236,'UN LYCÉEN',GRN,'#fff',15,34)}
function S1c(t,u){bg('#1c2048','#4a3f86');stars(26,300,3);cglow(180,300,160,'rgba(255,220,120,.35)');trophy(180,320,1.2,1+.04*Math.sin(u*5));
  pill(180,150,262,'BATTRE LE RECORD DU MONDE',RED,'#fff',12,34);pop(t,tBATT,k=>{ctx.translate(60,250);ctx.scale(k,k);tag(0,0,'DÉFI FOU',0,0,-.14,YEL)});tob(70,400,.9,{ar:.7,open:true})}
function S2a(t,u){bg('#1c2048','#3a3f78');dots('#fff',.06,0,H,26,4);cal(180,290,1.5,'RECORD','260 h',ORG,1+.03*Math.sin(u*6));pill(180,150,236,'LE RECORD EXISTANT',ORG,'#fff',14,34);
  pop(t,tDEUX2,k=>{ctx.translate(180,420);ctx.scale(k,k);pill(0,0,170,'260 HEURES',YEL,INK,18,36)})}
function S2b(t,u){room(true,t);bed(210,440,1);const k=seg(t,tALORS,tALORS+.4);
  tob(110,372,1.6,{open:Math.sin(u*6)>0,ar:.8},{bags:.6});ctx.save();ctx.translate(210,356);ctx.scale(k,k);ctx.rotate(-.2);ctx.fillStyle=RED;ctx.font='700 70px P';ctx.textAlign='center';ctx.lineWidth=8;ctx.strokeStyle=INK;ctx.lineJoin='round';ctx.strokeText('✕',0,0);ctx.fillText('✕',0,0);ctx.restore();
  pill(180,150,236,'RANDY NE DORT PLUS',RED,'#fff',14,34)}
function S2c(t,u){room(true,t);const sh=Math.sin(u*14)*2;tob(180,372,1.5,{ar:.3},{bags:.8});tob(70+sh,382,1.35,{ar:.9,step:true});tob(290-sh,382,1.35,{flip:-1,ar:.9,step:true});
  pill(180,150,200,'SES 2 AMIS',GRN,'#fff',16,34);if(t>=tAMIS)big('RÉVEILLE-TOI !',180,290,26,YEL,-.04,1)}
function S3a(t,u){bg('#3a4a3a','#8aa08a');cal(180,262,1.25,'JOUR','3',RED,1+.04*Math.sin(u*8));tob(180,398,1.3,{},{green:1,bags:.8});pill(180,150,236,'3E JOUR • NAUSÉE',RED,'#fff',14,34);
  if(t>=tNAUS){sweat(128,372,u%1,1.2);sweat(232,368,(u+.5)%1,1.2)}}
function S3b(t,u){room(true,t);const a=t>=tFACHE;tob(180,372,1.6,{open:a,ar:a?.8:.1},{bags:.9,angry:a});
  if(!a){qm(110,290,1.3,t);qm(250,270,1.1,t+1);qm(180,240,1.6,t+2);pill(180,150,236,'IL OUBLIE TOUT',BLU,'#fff',14,34)}
  else{pill(180,150,236,'IL SE FÂCHE !',RED,'#fff',14,34);big('GRRR !',180,260,34,YEL,-.04,1)}}
function S4a(t,u){bg('#8fd3ff','#e6f4ff');cloud(70,200,.8);ctx.fillStyle='#6fb36a';ctx.fillRect(0,420,W,220);stanford(180,420,1.1);
  tob(120,408,1.15,{ar:.2},{bags:.9});tob(240,408,1.15,{flip:-1,ar:.7},{coat:1,glasses:1});
  pill(180,150,t<tSTAN?236:200,t<tSTAN?'UN CHERCHEUR DU SOMMEIL':'STANFORD',t<tSTAN?BLU:'#8c1d2c','#fff',t<tSTAN?12:16,34)}
function S4b(t,u){const bk=t<tFLIP;if(bk){bg('#ffd9a0','#ffefd0');floor_('#c88a55');hoop(250,250,1.1);
    const q=(u*1.2)%1;ball(lerp(90,248,q),392-Math.sin(q*3.14)*150-40*(1-q),12);tob(80,382,1.4,{ar:.9,step:true},{bags:.9});tob(230,420,.9,{flip:-1,ar:.7},{coat:1,glasses:1});pill(180,150,200,'AU BASKET',ORG,'#fff',16,34)}
  else{bg('#7a3af0','#2a0f6a');dots('#fff',.08,0,H,26,4);pinball(250,330,1.1,t,String(Math.floor((t*3417)%99999)).padStart(5,'0'));tob(90,380,1.5,{ar:.8,step:false},{bags:.9});pill(180,150,200,'AU FLIPPER',ORG,'#fff',16,34)}}
function S5(t,u){bg('#7a3af0','#2a0f6a');rays(180,330,'#fff',20,u,.08);const w_=t>=tBAT;pinball(240,330,1.1,t,w_?'RANDY':'000');
  tob(70,392,1.4,{ar:w_?1:.4,open:w_},{bags:1});tob(150,430,.9,{flip:1,ar:.2},{coat:1,glasses:1});
  pill(180,150,200,'10E JOUR',RED,'#fff',16,34);if(w_)big('BATTU !',150,262,38,YEL,-.06,Math.min(1,1))}
function S6a(t,u){bg('#3a4a3a','#8aa08a');board(24,190,270,150,[{t:'JOUR 11',sz:14,c:YEL},{t:'100 − 7 = ?',sz:30,y:80},{t:'(ET ON RECOMMENCE)',sz:11,y:112}]);
  tob(70,420,1.1,{ar:.3},{bags:1});tob(230,430,1,{flip:-1,ar:.7},{coat:1,glasses:1});pill(180,150,236,'LE TEST DE CALCUL',BLU,'#fff',14,34)}
function S6b(t,u){bg('#3a4a3a','#8aa08a');const L=[100,93,86,79,72,65];const n=Math.min(L.length,1+Math.floor(Math.max(0,t-tRETIR)/((tS65-tRETIR)/4.5)));
  board(24,180,270,170,[{t:'100  93  86  79',sz:24,y:62},{t:t>=tS65?'72   65':'72',sz:24,y:100,c:t>=tS65?YEL:'#fff'},{t:t>=tCINQ?'…':'',sz:30,y:138}]);
  tob(70,430,1.1,{ar:.3},{bags:1});pill(180,150,236,t>=tS65?'ARRIVÉ À 65':'100 − 7 − 7 − 7…',t>=tS65?RED:BLU,'#fff',14,34)}
function S6c(t,u){bg('#3a4a3a','#8aa08a');board(24,190,270,130,[{t:'65 … ?',sz:36,y:80,c:YEL}]);tob(170,430,1.2,{ar:.1},{bags:1});qm(110,330,1.4,t);qm(240,340,1.2,t+1);pill(180,150,236,'IL A TOUT OUBLIÉ',RED,'#fff',14,34)}
function S7a(t,u){bg('#ffe9b8','#ffc978');dots('#fff',.25,0,H,26,4);rays(180,300,'#fff',16,u,.1);cal(180,290,1.5,'TOTAL','264 h',GRN,1+.03*Math.sin(u*6));pill(180,150,236,'MAIS IL TIENT !',GRN,'#fff',16,34);
  pop(t,tONZE7,k=>{ctx.translate(180,430);ctx.scale(k,k);pill(0,0,190,'11 JOURS ENTIERS',YEL,INK,15,34)});tob(60,420,.9,{ar:1,open:true},{bags:1})}
function S7b(t,u){bg('#7a3af0','#2a0f6a');rays(180,300,'#fff',20,u,.12);confetti(u);trophy(180,310,1.3,seg(u,0,.4)*(1+.03*Math.sin(u*6)));pill(180,150,262,'NOUVEAU RECORD DU MONDE',YEL,INK,12,34);tob(60,420,1,{ar:1,open:true},{bags:1})}
function S8a(t,u){room(true,t);bed(180,440,1.4,{});ctx.save();ctx.translate(96,392);ctx.rotate(-Math.PI/2);tob(0,0,1.15,{},{bags:.6,sleep:1});ctx.restore();bed(180,440,1.4,{blanket:true,post:true});zzz(100,340,u);
  pill(180,150,236,'IL DORT ENFIN',BLU,'#fff',16,34);const k=seg(t,tQUAT,tQUAT+.3);if(t>=tQUAT){ctx.save();ctx.translate(180,235);ctx.scale(k,k);pill(0,0,150,'14 HEURES',YEL,INK,18,38);ctx.restore()}}
function S8b(t,u){bg('#bfe6ff','#eefaff');floor_('#d8e4ee');rr(30,230,100,150,6);fs('#fff',true,4);ctx.fillStyle=GRN;ctx.font='700 70px P';ctx.textAlign='center';ctx.fillText('✓',80,330);
  tob(200,400,1.5,{ar:.6},{bags:.2});tob(270,420,1,{flip:-1,ar:.3},{coat:1,glasses:1,tie:RED});pill(180,150,t<tSANTE?236:236,t<tSANTE?'LES MÉDECINS':'EN BONNE SANTÉ',t<tSANTE?BLU:GRN,'#fff',15,34)}
function S9(t,u){bg('#2a2f5a','#9a7ab0');stars(20,260,3);cglow(180,320,150,'rgba(255,220,120,.3)');trophy(180,320,1.2,1);const k=seg(t,tBATTU,tBATTU+.25);
  pill(180,150,236,'LA MÊME ANNÉE • 1964',ORG,'#fff',14,34);ctx.save();ctx.translate(180,320);ctx.rotate(-.3);ctx.scale(.5+.5*k,.5+.5*k);ctx.globalAlpha=k;ctx.font='700 58px P';ctx.textAlign='center';ctx.lineWidth=12;ctx.strokeStyle=INK;ctx.lineJoin='round';ctx.strokeText('BATTU !',0,0);ctx.fillStyle=RED;ctx.fillText('BATTU !',0,0);ctx.restore()}
function S10(t,u){bg('#7a3af0','#2a0f6a');rays(180,300,'#fff',20,u,.1);const k=seg(u,0,.35);face(t,{cx:186,cy:350,s:.5+.1*seg(u,0,.5),eye:1.2,look:[0,0],mouth:'open',brow:8});
  wclock(270,230,30,u*4);big('ET TOI ?',180,214,48,YEL,-.04)}
/* ---- enchaînement : plusieurs plans par paragraphe (changement toutes les 2–3 s) ---- */
const PLAN=[[B[0],S0a],[tLYC-.35,S0b],[B[1],S1a],[tDIXS-.1,S1b],[tDEFI-.3,S1c],[B[2],S2a],[tALORS-.15,S2b],[tSES-.1,S2c],[B[3],S3a],[tOUBL-.1,S3b],[B[4],S4a],[tJOUENT-.15,S4b],[B[5],S5],[B[6],S6a],[tRETIR-.2,S6b],[tARRET-.3,S6c],[B[7],S7a],[tREC7-.9,S7b],[B[8],S8a],[tMED-.4,S8b],[tREC9-.25,S9],[B[10],S10]];
CUTS=PLAN.map(p=>p[0]);
const planOf=t=>{let k=0;for(let i=0;i<PLAN.length;i++)if(t>=PLAN[i][0])k=i;return k};
window.frame=function(i){const t=i/30;ctx.setTransform(3,0,0,3,0,0);ctx.clearRect(0,0,W,H);const k=planOf(t);seed=i*13+1;const lc=PLAN[k][0];const kk=cl((t-lc)/.3),zs=1+.06*(1-kk)*(1-kk),sh=(1-kk)*5;T=t;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(zs,zs);ctx.translate(-W/2+(rnd()-.5)*sh,-H/2+(rnd()-.5)*sh);PLAN[k][1](t,t-lc);ctx.restore();
  hudG(t);capS(t,520);if(window.SAFE){ctx.fillStyle='rgba(255,0,0,.3)';ctx.fillRect(0,0,W,75);ctx.fillRect(300,327,60,252);ctx.fillRect(0,579,W,61);ctx.fillRect(0,75,17,504);ctx.fillRect(343,75,17,252)}
  const f=Math.max(1-t/.2,(t-(TOT-.4))/.4);if(f>0){ctx.fillStyle=`rgba(0,0,0,${cl(f)})`;ctx.fillRect(0,0,W,H)}return i};
document.fonts.load('700 38px P').then(()=>{window.READY=1});
</script></body></html>
