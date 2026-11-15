/* ---- instants-clés (mots de la vraie voix) ---- */
const tANN0=WT('HODGES',0,B[0]+5),tSIESTE0=WT('SIESTE',0,B[0]+3),
 tNOV=WT('NOVEMBRE',1,B[1]+.8),tCANAPE=WT('CANAPÉ',1,B[1]+4.2),tALAB=WT('ALABAMA',1,B[1]+5.2),
 tTRAV=WT('TRAVERSE',2,B[2]+1.6),tREB=WT('REBONDIT',2,B[2]+3.4),tRADIO=WT('RADIO',2,B[2]+4.2),tTOUCHE=WT('TOUCHE',2,B[2]+5.6),tHANCHE=WT('HANCHE',2,B[2]+7),
 tMETEO=WT('MÉTÉORITE',3,B[3]+.4),tKILOS=WT('KILOS',3,B[3]+2.4),tESPACE=WT("L'ESPACE",3,B[3]+3.6),tANN3=WT('ANN',3,B[3]+4.4),tBLEU=WT('BLEU',3,B[3]+5.6),tBIEN=WT('BIEN',3,B[3]+7),
 tMIL=WT('MILITAIRES',4,B[4]+.4),tPIERRE4=WT('PIERRE',4,B[4]+1.6),tVERD=WT('VERDICT',4,B[4]+3.4),tMET4=WT('MÉTÉORITE',4,B[4]+4.8),
 tPROP=WT('PROPRIÉTAIRE',5,B[5]+.6),tMOI=WT('MOI',5,B[5]+4),tTRIB=WT('TRIBUNAL',5,B[5]+5.8),
 tACC=WT('ACCORD',6,B[6]+1.4),tGARDE=WT('GARDE',6,B[6]+2.6),tCELEB=WT('CÉLÈBRE',6,B[6]+4.6),tLIFE=WT('LIFE',6,B[6]+7),
 tPERS=WT('PERSONNE',7,B[7]+.4),tACH=WT('ACHETER',7,B[7]+1.2),tFAM=WT('FAMILLE',7,B[7]+3.2),tPORTE=WT('PORTE',7,B[7]+5.2),tMUSEE=WT('MUSÉE',7,B[7]+8),
 tAUJ=WT("AUJOURD'HUI",8,B[8]+.3),tEXPO=WT('EXPOSÉE',8,B[8]+1.4),tSEULE=WT('SEULE',8,B[8]+4.2),tMET8=WT('MÉTÉORITE',8,B[8]+7),tTOI=WT('TOI',9,B[9]+.3);
const ST=[tTRAV+.2,tTOUCHE+.15,tMIL,tPROP,tLIFE,tMUSEE];
/* ---- HUD : compteur d'étapes de la pierre (sous la barre TikTok) ---- */
function rockIco(x,y,s,on,k=0){ctx.save();ctx.translate(x,y);ctx.scale(s*(1+.5*k),s*(1+.5*k));ctx.beginPath();ctx.moveTo(-9,-2);ctx.lineTo(-5,-9);ctx.lineTo(3,-10);ctx.lineTo(9,-4);ctx.lineTo(8,5);ctx.lineTo(2,9);ctx.lineTo(-6,8);ctx.closePath();fs(on?ORG:'#2c3160',true,2);ctx.restore()}
function hudA(t){const n=ST.filter(x=>t>=x).length;ctx.save();ctx.textBaseline='middle';ctx.textAlign='left';
  rr(30,84,294,42,12);fs('rgba(12,16,40,.9)',true,3);ctx.strokeStyle=n>=6?YEL:ORG;ctx.lineWidth=3;ctx.stroke();ctx.font='700 8px P';ctx.fillStyle='#ffd9b0';ctx.fillText('VOYAGE DE LA PIERRE',40,96);
  for(let i=0;i<6;i++){const k=i<n?pk(t,ST[i],.35):0;rockIco(52+i*30,114,.95,i<n,k)}
  ctx.font='700 21px P';ctx.textAlign='right';ctx.fillStyle=n>=6?YEL:'#fff';ctx.fillText(n+' / 6',314,108);ctx.restore()}
/* ---- éléments de décor propres à l'épisode ---- */
function rock(x,y,s=1,rot=0,hot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);if(hot>0)cglow(0,0,60,`rgba(255,150,40,${.6*hot})`,'rgba(255,150,40,0)');
  ctx.beginPath();[[-22,-6],[-14,-20],[4,-24],[20,-14],[24,4],[12,20],[-8,22],[-22,10]].forEach(([a,b],i)=>i?ctx.lineTo(a,b):ctx.moveTo(a,b));ctx.closePath();fs('#4b4350',true,3.5);
  ctx.fillStyle='#6d6475';ctx.beginPath();ctx.ellipse(-6,-10,9,5,-.4,0,7);ctx.fill();ctx.fillStyle='#352f3b';for(const [a,b,r] of[[8,4,5],[-10,9,3.5],[10,-8,3]]){ctx.beginPath();ctx.arc(a,b,r,0,7);ctx.fill()}
  if(hot>0){ctx.strokeStyle=`rgba(255,170,50,${hot})`;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-14,-20);ctx.lineTo(4,-24);ctx.lineTo(20,-14);ctx.stroke()}ctx.restore()}
function trail(x,y,dx,dy,len,t){ctx.save();for(let i=9;i>=0;i--){const q=i/9,px=x-dx*len*q,py=y-dy*len*q,r=(24-18*q)*(1+.1*Math.sin(t*20+i));ctx.globalAlpha=(1-q)*.85;ctx.fillStyle=i<3?'#ffe27a':i<6?'#ff9a2a':'#e8501a';ctx.beginPath();ctx.arc(px,py,r,0,7);ctx.fill()}ctx.restore()}
function annH(c='#7a4a2a',bun=true,bow=true){ctx.beginPath();ctx.moveTo(-24,-22);ctx.quadraticCurveTo(-31,-62,0,-61);ctx.quadraticCurveTo(31,-62,24,-22);ctx.quadraticCurveTo(22,-37,10,-38);ctx.quadraticCurveTo(0,-31,-10,-38);ctx.quadraticCurveTo(-22,-37,-24,-22);ctx.closePath();fs(c,true,3);
  if(bun){ctx.beginPath();ctx.arc(0,-64,9,0,7);fs(c,true,3)}
  if(bow){ctx.beginPath();ctx.moveTo(10,-58);ctx.lineTo(24,-66);ctx.lineTo(24,-50);ctx.closePath();fs('#e2243a',true,2.5);ctx.beginPath();ctx.arc(10,-58,3.2,0,7);fs('#e2243a',true,2)}}
function ann(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s*(o.flip||1),s);mini(0,0,1,o);
  if(o.sleep){for(const sx of[-1,1]){ctx.beginPath();ctx.arc(sx*9,-20,9.5,0,7);ctx.fillStyle=PSK;ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();ctx.arc(sx*9,-21,5,.2*Math.PI,.8*Math.PI);ctx.stroke()}}
  annH(o.hair||'#7a4a2a',o.bun!==false,o.bow!==false);if(o.cap)milCap();ctx.restore()}
function milCap(){ctx.beginPath();ctx.roundRect(-23,-56,46,22,[12,12,3,3]);fs('#6b7a4a',true,3);ctx.beginPath();ctx.roundRect(-27,-38,54,7,3);fs('#55633a',true,2.5);ctx.fillStyle=YEL;ctx.beginPath();for(let k=0;k<10;k++){const a=k*Math.PI/5-Math.PI/2,r=k%2?2.2:5;ctx.lineTo(Math.cos(a)*r,-46+Math.sin(a)*r)}ctx.fill()}
function soldier(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s*(o.flip||1),s);mini(0,0,1,o);ctx.beginPath();ctx.arc(0,-20,0,0,0);milCap();ctx.restore()}
function lady(x,y,s,o={}){ann(x,y,s,{...o,hair:'#b9b9c8',bow:false})}
function roomCut(t,o={}){bg('#8ed0ff','#e3f4ff');cloud(60,190,.8);cloud(300,250,.7);
  ground(440,'#5fb36a','#4a9a58');ctx.fillStyle='#4a9a58';ctx.fillRect(0,440,W,200);
  /* toit */
  ctx.beginPath();ctx.moveTo(6,228);ctx.lineTo(180,126);ctx.lineTo(354,228);ctx.closePath();fs('#b5523b',true,4);
  ctx.save();ctx.beginPath();ctx.moveTo(6,228);ctx.lineTo(180,126);ctx.lineTo(354,228);ctx.closePath();ctx.clip();ctx.strokeStyle='rgba(60,20,10,.35)';ctx.lineWidth=2;for(let y=140;y<230;y+=14){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}ctx.restore();
  /* pièce */
  rr(24,224,312,216,3);fs('#f5e2bd',true,4);ctx.save();rr(24,224,312,216,3);ctx.clip();ctx.fillStyle='#ecd0a0';for(let x=34;x<336;x+=30)ctx.fillRect(x,224,12,216);ctx.restore();
  ctx.fillStyle='#a8703c';ctx.fillRect(24,420,312,20);ctx.fillStyle='#8a5a2c';ctx.fillRect(24,420,312,4);
  /* trou dans le toit */
  if(o.hole>0){const h=o.hole;ctx.beginPath();ctx.ellipse(250,172,14*h,8*h,.5,0,7);fs('#2a1a14',true,3);ctx.fillStyle='#ffe27a';ctx.fillRect(236,226,28*h,0)}
  /* fenêtre */
  rr(54,250,56,60,3);fs('#bfe4ff',true,3.5);ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(82,250);ctx.lineTo(82,310);ctx.moveTo(54,280);ctx.lineTo(110,280);ctx.stroke();ctx.fillStyle=YEL;ctx.beginPath();ctx.arc(96,262,6,0,7);ctx.fill()}
function couch(x,y,w=150){rr(x-w/2,y-72,w,60,14);fs('#c14a42',true,3.5);rr(x-w/2-14,y-54,30,52,12);fs('#a63b35',true,3.5);rr(x+w/2-16,y-54,30,52,12);fs('#a63b35',true,3.5);ctx.fillStyle='#8a5a2c';ctx.fillRect(x-w/2-4,y-4,10,6);ctx.fillRect(x+w/2-6,y-4,10,6)}
function couchFront(x,y,w=150){rr(x-w/2+10,y-28,w-20,26,9);fs('#e06d62',true,3.5)}
function radioC(x,y,k=0,hit=0){ctx.save();ctx.translate(x+(hit>0?Math.sin(k*60)*3*hit:0),y);rr(-36,-76,72,76,6);fs('#8a5a3a',true,3.5);rr(-28,-66,56,32,4);fs('#e0c487',true,3);ctx.strokeStyle='rgba(60,30,10,.5)';ctx.lineWidth=2;for(let i=-20;i<=20;i+=8){ctx.beginPath();ctx.moveTo(i,-62);ctx.lineTo(i,-38);ctx.stroke()}
  for(const dx of[-16,16]){ctx.beginPath();ctx.arc(dx,-18,7,0,7);fs('#f2e6c8',true,2.5)}ctx.fillStyle=INK;ctx.fillRect(-30,-2,8,6);ctx.fillRect(22,-2,8,6);
  if(k>0){ctx.strokeStyle=INK;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-6,-66);ctx.lineTo(0,-52);ctx.lineTo(-8,-44);ctx.lineTo(2,-34);ctx.stroke()}ctx.restore()}
function stamp(txt,x,y,k,rot,c=GRN){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(rot);const s=1+.7*(1-cl(k))*(1-cl(k));ctx.scale(s,s);ctx.globalAlpha=cl(k*2);ctx.font='700 18px P';ctx.textAlign='center';ctx.textBaseline='middle';const w=ctx.measureText(txt).width+26;rr(-w/2,-20,w,40,8);ctx.lineWidth=5;ctx.strokeStyle=c;ctx.stroke();ctx.fillStyle=c;ctx.fillText(txt,0,2);ctx.restore()}
function zzz(x,y,t){ctx.save();ctx.font='700 22px P';ctx.textAlign='center';for(let i=0;i<3;i++){const q=(t*.7+i/3)%1;ctx.globalAlpha=Math.sin(q*Math.PI);ctx.fillStyle='#fff';ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.lineJoin='round';const px=x+q*30+i*4,py=y-q*60;ctx.font='700 '+(16+i*5)+'px P';ctx.strokeText('Z',px,py);ctx.fillText('Z',px,py)}ctx.restore()}
function bruise(x,y,s=1,k=1){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);ctx.beginPath();ctx.ellipse(0,0,13,9,.5,0,7);fs('#7a3a9a',true,2.5);ctx.fillStyle='#a45ac4';ctx.beginPath();ctx.ellipse(-2,-1,7,4,.5,0,7);ctx.fill();ctx.restore()}
function calendar(x,y,k){ctx.save();ctx.translate(x,y);ctx.scale(k,k);rr(-28,-34,56,68,5);fs('#fff',true,3);ctx.fillStyle=RED;ctx.fillRect(-28,-34,56,18);ctx.fillStyle='#fff';ctx.font='700 11px P';ctx.textAlign='center';ctx.fillText('NOV 1954',0,-21);ctx.fillStyle=INK;ctx.font='700 30px P';ctx.fillText('30',0,17);ctx.restore()}
function sparkles(x,y,t0,t,n=8,R=60){const v=t-t0;if(v<0||v>.6)return;ctx.save();ctx.strokeStyle=YEL;ctx.lineWidth=4;ctx.lineCap='round';for(let i=0;i<n;i++){const a=i/n*6.283,r1=10+v*R,r2=r1+14;ctx.globalAlpha=1-v/.6;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1);ctx.lineTo(x+Math.cos(a)*r2,y+Math.sin(a)*r2);ctx.stroke()}ctx.restore()}
function earthBelow(){ctx.beginPath();ctx.arc(180,760,330,0,7);fs('#2a7ad0',true,4);ctx.fillStyle='#3fae5a';ctx.beginPath();ctx.ellipse(120,470,60,16,.2,0,7);ctx.ellipse(250,455,46,12,-.2,0,7);ctx.fill();ctx.strokeStyle='rgba(150,210,255,.5)';ctx.lineWidth=8;ctx.beginPath();ctx.arc(180,760,338,Math.PI*1.12,Math.PI*1.88);ctx.stroke()}
function door(x,y,open,k=0){ /* porte dans un mur, ouverte à angle */
  rr(x-34,y-110,68,112,3);fs('#2a1a14',true,4);ctx.beginPath();ctx.moveTo(x-30,y-106);ctx.lineTo(x+30,y-106);ctx.lineTo(x+30,y-2);ctx.lineTo(x-30,y-2);ctx.closePath();ctx.fillStyle='#ffe9b8';ctx.fill();
  const w=60*(1-.75*open);ctx.beginPath();ctx.moveTo(x-30,y-106);ctx.lineTo(x-30+w,y-96+open*6);ctx.lineTo(x-30+w,y-8-open*6);ctx.lineTo(x-30,y-2);ctx.closePath();fs('#8a4a2a',true,3.5);ctx.fillStyle='#e0b04a';ctx.beginPath();ctx.arc(x-30+w-8,y-54,3,0,7);ctx.fill()}
function museumFront(x,y,k=1){ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.beginPath();ctx.moveTo(-120,-130);ctx.lineTo(0,-190);ctx.lineTo(120,-130);ctx.closePath();fs('#e8dcc0',true,4);rr(-120,-130,240,16,2);fs('#d4c6a4',true,3.5);
  for(let i=-3;i<=3;i++){rr(i*34-9,-114,18,104,3);fs('#f4ead0',true,3)}rr(-130,-10,260,14,2);fs('#d4c6a4',true,3.5);rr(-150,4,300,12,2);fs('#c0b290',true,3.5);
  rr(-54,-168,108,24,6);fs('#2a3a6a',true,3);ctx.fillStyle='#fff';ctx.font='700 14px P';ctx.textAlign='center';ctx.fillText('MUSÉE',0,-151);ctx.restore()}
function gavel(x,y,k){ctx.save();ctx.translate(x,y);rr(-46,24,92,16,5);fs('#8a5a3a',true,3.5);ctx.rotate(-.7+1.1*k);ctx.fillStyle='#8a5a3a';rr(-6,-70,12,76,4);fs('#a8703c',true,3.5);rr(-26,-86,52,26,8);fs('#6a3a1c',true,3.5);ctx.restore()}
function scales(x,y,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-4,-90,8,92,2);fs('#d9b24a',true,3);rr(-24,0,48,10,3);fs('#d9b24a',true,3);ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-50,-84);ctx.lineTo(50,-84);ctx.stroke();ctx.strokeStyle='#d9b24a';ctx.lineWidth=3;ctx.stroke();
  for(const sx of[-1,1]){ctx.strokeStyle=INK;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(sx*50,-84);ctx.lineTo(sx*66,-44);ctx.moveTo(sx*50,-84);ctx.lineTo(sx*34,-44);ctx.stroke();ctx.beginPath();ctx.ellipse(sx*50,-42,22,7,0,0,Math.PI);fs('#d9b24a',true,2.5)}ctx.restore()}
function shake(x,y,s,t){ctx.save();ctx.translate(x,y+Math.sin(t*14)*2);ctx.scale(s,s);for(const sx of[-1,1]){ctx.lineCap='round';ctx.strokeStyle=INK;ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(sx*80,24);ctx.lineTo(sx*20,0);ctx.stroke();ctx.strokeStyle='#8892a8';ctx.lineWidth=20;ctx.stroke()}ctx.beginPath();ctx.ellipse(0,0,30,24,0,0,7);fs(PSK,true,4);ctx.restore()}
/* ================= SCÈNES ================= */
function K0(t,u,d){bg('#2a1f6a','#ffb27a');stars(26,200,3);ground(450,'#3a8a5a','#2f7a4a');
  const q=(u%1.6)/1.6;trail(60+q*240,-20+q*330,.6,.8,160,t);rock(60+q*240,-20+q*330,.9,u*3,1);
  ann(190,332,1.7,{open:true,ar:.8});
  pill(180,150,278,'UNE PIERRE TOMBE DU CIEL ?!',RED,'#fff',15,38);
  pop(t,tANN0,k=>{ctx.translate(180,198);ctx.scale(k,k);pill(0,0,190,'ANN HODGES',YEL,INK,16,32)});
  ctx.save();ctx.translate(74,330);ctx.rotate(-.14);pill(0,0,112,'HISTOIRE VRAIE','#fff',INK,10,24);ctx.restore()}
function annLie(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(-Math.PI/2);ctx.scale(s,s);mini(0,0,1,o);
  if(o.sleep){for(const sx of[-1,1]){ctx.beginPath();ctx.arc(sx*9,-20,9.5,0,7);ctx.fillStyle=PSK;ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();ctx.arc(sx*9,-21,5,.2*Math.PI,.8*Math.PI);ctx.stroke()}}
  annH();ctx.restore()}
/* K1 corrigée : Ann allongée sur le canapé */
function K1b(t,u,d){roomCut(t);couch(140,424,170);annLie(140,372,1.1,{sleep:true,ar:.25});couchFront(140,424,170);
  radioC(262,424,0,0);zzz(70,344,t);pop(t,tNOV,k=>calendar(292,278,k));
  const lab=t<tNOV?'UNE SIESTE…':t<tCANAPE?'30 NOVEMBRE 1954':'ALABAMA • USA';pill(180,150,t<tNOV?170:236,lab,t<tNOV?GRN:ORG,'#fff',14,32)}
function K2(t,u,d){const tH=tTRAV+.15,hole=t<tH?0:seg(t,tH,tH+.2);roomCut(t,{hole});
  const hurt=t>=tTOUCHE+.1,vh=t-(tTOUCHE+.1);couch(140,424,170);
  if(!hurt)annLie(140,372,1.1,{sleep:true,ar:.25});else annLie(140,372-Math.max(0,Math.sin(vh*5))*14*(vh<.6),1.1,{open:true,ar:.9});
  couchFront(140,424,170);
  const rh=t>=tREB?(t-tREB<.5?1:0):0;radioC(262,424,t>=tREB?1:0,rh);
  /* trajectoire de la pierre */
  let px,py,rot=t*8,hot=0;
  if(t<tH){const q=cl((t-(tH-.8))/.8);px=lerp(268,250,q);py=lerp(-30,172,q*q);hot=1}
  else if(t<tREB){const q=cl((t-tH)/(tREB-tH));px=lerp(250,262,q);py=lerp(172,356,q*q);hot=1-q*.7}
  else if(t<tTOUCHE-.45){px=262;py=356-Math.abs(Math.sin((t-tREB)*5))*14;rot=Math.sin(t*9)*.3}
  else if(t<tTOUCHE+.1){const q=cl((t-(tTOUCHE-.45))/.55);px=lerp(262,162,q);py=lerp(356,392,q)-Math.sin(q*Math.PI)*90;rot=q*9}
  else{px=162;py=392;rot=.5}
  if(t<tREB&&t>tH-.8)trail(px,py,.1,1,70,t);
  rock(px,py,.85,rot,hot);
  if(t>=tH&&t<tH+.9)big('CRAC !',224,196,32,YEL,.08,1-(t-tH)/.9);
  if(t>=tREB&&t<tREB+.7)big('BOING !',250,300,28,YEL,-.08,1-(t-tREB)/.7);
  sparkles(162,392,tTOUCHE+.1,t,8,50);if(hurt&&vh<.9)big('AÏE !',110,300,40,RED,-.1,1-vh/.9);
  pill(180,150,t<tH?200:t<tREB?214:t<tTOUCHE?196:210,t<tH?'ÇA TOMBE !':t<tREB?'DANS LE TOIT !':t<tTOUCHE?'SUR LA RADIO !':'ELLE EST TOUCHÉE',t<tH?ORG:t<tTOUCHE?ORG:RED,'#fff',15,32)}
function K3(t,u,d){if(t<tANN3-.15){bg('#06082a','#1a1f5a');stars(50,640,9);earthBelow();const k=seg(u,0,.5),fall=cl((t-tMETEO)/1.5);const rx=180,ry=lerp(170,330,sm(fall));trail(rx,ry,0,1,110,t);rock(rx,ry,1.5*k,t*2,1);
    pop(t,tKILOS,k2=>{ctx.translate(180,436);ctx.scale(k2,k2);pill(0,0,176,'≈ 4 KILOS',YEL,INK,20,40)});
    pill(180,150,t<tESPACE?226:236,t<tESPACE?'UNE MÉTÉORITE !':"VENUE DE L'ESPACE",t<tESPACE?RED:BLU,'#fff',15,32)}
  else{roomCut(t);couch(150,424,190);ann(170,340,1.5,{open:t<tBLEU,ar:.1});const bk=t<tBLEU?0:seg(t,tBLEU,tBLEU+.25);bruise(185,358,1.35,bk);
    if(t>=tBLEU&&t<tBIEN){big('ÉNORME BLEU',180,292,28,RED,-.05,1)}
    if(t>=tBIEN){const k=seg(t,tBIEN,tBIEN+.3);ctx.save();ctx.translate(250,320);ctx.scale(k,k);ctx.beginPath();ctx.arc(0,0,26,0,7);fs(GRN,true,4);ctx.strokeStyle='#fff';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-11,1);ctx.lineTo(-3,10);ctx.lineTo(12,-9);ctx.stroke();ctx.restore()}
    pill(180,150,t<tBLEU?150:t<tBIEN?176:196,t<tBLEU?'ANN':t<tBIEN?'UN GROS BLEU':'ELLE VA BIEN',t<tBLEU?'#fff':t<tBIEN?'#a45ac4':GRN,t<tBLEU?INK:'#fff',15,32)}}
function K4(t,u,d){bg('#cfe0a8','#8aa868');rr(0,420,W,220);fs('#a9b78a',true,3);
  rr(60,346,240,16,4);fs('#8a5a3a',true,3.5);rr(80,362,12,46,2);fs('#6a4a2a',true,3);rr(268,362,12,46,2);fs('#6a4a2a',true,3);
  const mv=t<tPIERRE4?lerp(-60,70,sm(cl((t-B[4])/(tPIERRE4-B[4]+.5)))):70;
  soldier(mv,336,1.5,{ar:.3,step:t<tPIERRE4+.5});soldier(296,336,1.5,{flip:-1,ar:.3});
  rock(184,324,1.3,0,0);
  if(t>=tPIERRE4){const q=(t-tPIERRE4)%2;ctx.save();ctx.translate(226,292);ctx.rotate(-.7);ctx.strokeStyle=INK;ctx.lineWidth=9;ctx.beginPath();ctx.arc(0,0,22,0,7);ctx.stroke();ctx.strokeStyle='#9fd0ff';ctx.lineWidth=4;ctx.stroke();ctx.strokeStyle=INK;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(54,0);ctx.stroke();ctx.restore()}
  stamp('VRAIE MÉTÉORITE',172,214,t<tVERD?0:seg(t,tVERD,tVERD+.25),-.08);
  pill(180,150,t<tVERD?236:216,t<tVERD?"ARMÉE DE L'AIR":'VERDICT : OUI !',t<tVERD?GRN:ORG,'#fff',14,32)}
function K5(t,u,d){if(t<tTRIB-.2){bg('#f2d9b0','#e8b96a');rr(20,230,320,210,6);fs('#f5e2bd',true,4);rr(0,400,W,240);fs('#a8703c',true,4);
    const mad=t>=tPROP;lady(110,338,1.5,{open:mad,ar:mad?.95:.2,spread:mad&&(u%.6<.3)?10:0});ann(260,338,1.4,{flip:-1,ar:.1});
    pop(t,tMOI,k=>{ctx.translate(122,250);ctx.scale(k,k);ctx.rotate(-.06);rr(-62,-28,124,56,18);fs('#fff',true,3.5);ctx.fillStyle=RED;ctx.font='700 26px P';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('À MOI !',0,2)});
    pill(180,150,t<tPROP?232:244,t<tPROP?'LA MAISON D’ANN':'LA PROPRIÉTAIRE !',t<tPROP?'#fff':RED,t<tPROP?INK:'#fff',14,32)}
  else{const k=seg(t,tTRIB-.2,tTRIB+.2);bg('#2b3566','#5a68a8');rays(180,300,'#fff',16,u,.07);ctx.save();ctx.translate(0,0);scales(130,420,1.5);const hit=t-tTRIB;gavel(250,380,hit<0?0:Math.min(1,Math.max(0,1-Math.abs(((u*1.1)%1)-.1)*6)));ctx.restore();
    pill(180,150,196,'AU TRIBUNAL !',ORG,'#fff',16,34)}}
function K6(t,u,d){if(t<tGARDE-.4){bg('#ffe9b8','#ffc978');dots('#fff',.25,0,H,26,4);rays(180,300,'#fff',16,u,.1);
    lady(78,340,1.4,{ar:.5});ann(268,340,1.4,{flip:-1,ar:.5});shake(173,300,.62,t);
    pop(t,tACC,k=>{ctx.translate(180,236);ctx.scale(k,k);pill(0,0,160,'ACCORD ✔',GRN,'#fff',18,38)});
    pill(180,150,t<tACC?236:210,t<tACC?'ELLES SE METTENT D’ACCORD':'ANN GARDE LA PIERRE',t<tACC?'#fff':GRN,t<tACC?INK:'#fff',13,32)}
  else{bg('#ffd9a0','#ff9a6a');rays(180,300,'#fff',20,u,.12);dots('#fff',.2,0,H,26,4);
    ann(106,340,1.4,{ar:.9,open:true});rock(66,262,.7,u,0);
    const k=seg(t,tCELEB,tCELEB+.3);ctx.save();ctx.translate(236,300);ctx.scale(.4+.6*k,.4+.6*k);ctx.rotate(.06);rr(-60,-86,120,172,6);fs('#fff3cf',true,4);rr(-52,-78,104,26,4);fs(RED,false,0);ctx.fillStyle='#fff';ctx.font='700 14px P';ctx.textAlign='center';ctx.fillText('MAGAZINE',0,-60);
    ctx.beginPath();ctx.arc(0,-8,28,0,7);fs('#8ed0ff',true,3);rock(0,-6,.8,0,0);ctx.fillStyle=INK;ctx.font='700 9px P';ctx.fillText('UNE VRAIE',0,40);ctx.fillText('MÉTÉORITE !',0,54);ctx.fillStyle=RED;ctx.fillRect(-44,62,88,6);ctx.restore();
    for(let i=0;i<8;i++){const q=(u*.5+i/8)%1;ctx.fillStyle=[RED,YEL,BLU,GRN][i%4];ctx.fillRect(30+(i*41)%300,190+q*240,6,6)}
    pill(180,150,t<tCELEB?206:246,t<tCELEB?'ELLE DEVIENT CÉLÈBRE':t<tLIFE?'ELLE EST CÉLÈBRE !':'DANS LE MAGAZINE LIFE',ORG,'#fff',14,32)}}
function K7(t,u,d){if(t<tFAM-.3){bg('#d8d2c4','#a8a290');rr(0,420,W,220);fs('#8a7a5a',true,3);
    const q=seg(t,tPERS,tPERS+.4);ctx.save();ctx.translate(180,330);ctx.scale(.5+.5*q,.5+.5*q);rock(-70,50,1.6,0,0);rr(-6,-70,12,120,3);fs('#8a5a3a',true,3);rr(-70,-110,140,54,8);fs('#fff',true,4);ctx.fillStyle=RED;ctx.font='700 22px P';ctx.textAlign='center';ctx.fillText('À VENDRE',0,-74);ctx.restore();
    if(t>=tACH){const k=seg(t,tACH,tACH+.25);ctx.save();ctx.translate(250,300);ctx.scale(k,k);ctx.strokeStyle=INK;ctx.lineWidth=18;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-30,-30);ctx.lineTo(30,30);ctx.moveTo(30,-30);ctx.lineTo(-30,30);ctx.stroke();ctx.strokeStyle=RED;ctx.lineWidth=11;ctx.stroke();ctx.restore()}
    ann(74,344,1.25,{ar:.1});pill(180,150,t<tACH?236:220,t<tACH?'PERSONNE NE VEUT…':'PAS D’ACHETEUR !',RED,'#fff',14,32)}
  else if(t<tMUSEE-.35){bg('#ffe9b8','#ffc978');dots('#fff',.25,0,H,26,4);rr(0,430,W,210);fs('#a8703c',true,3);ctx.fillStyle='#f5e2bd';ctx.fillRect(0,0,W,430);
    door(150,430,seg(t,tFAM,tFAM+.6),0);rock(118+0,414,.8,0,0);
    const w=Math.sin(u*3);ctx.strokeStyle='rgba(120,180,230,.7)';ctx.lineWidth=3;ctx.lineCap='round';for(let i=0;i<3;i++){const x=196+((u*60+i*40)%110);ctx.beginPath();ctx.moveTo(x,300+i*34);ctx.lineTo(x+30,300+i*34);ctx.stroke()}
    ann(274,346,1.3,{flip:-1,ar:.1});pill(180,150,t<tPORTE?210:228,t<tPORTE?'UNE CALE-PORTE !':'PORTE OUVERTE !',GRN,'#fff',15,32)}
  else{bg('#8ed0ff','#e3f4ff');cloud(70,210,.9);ground(430,'#5fb36a','#4a9a58');museumFront(180,430,1.15);const wx=lerp(30,120,cl((t-(tMUSEE-.35))/1.6));ann(wx,404,1.2,{step:true,ar:.6});rock(wx+22,376,.5,0,0);
    pill(180,150,170,'AU MUSÉE !',ORG,'#fff',16,34)}}
function K8(t,u,d){bg('#1a1f3a','#3a3f6a');rr(0,420,W,220);fs('#2a2f4a',true,3);
  ctx.beginPath();ctx.moveTo(110,0);ctx.lineTo(250,0);ctx.lineTo(300,430);ctx.lineTo(60,430);ctx.closePath();ctx.fillStyle='rgba(255,240,170,.16)';ctx.fill();
  rr(110,340,140,100,6);fs('#e8dcc0',true,4);rr(92,322,176,24,5);fs('#c9b98a',true,4);rr(120,250,120,92,8);ctx.fillStyle='rgba(190,230,255,.35)';ctx.fill();ctx.strokeStyle='#bfe4ff';ctx.lineWidth=4;ctx.stroke();rock(180,314,1.5,Math.sin(u*1.5)*.15,0);
  sparkles(180,300,tEXPO,t,10,70);sparkles(180,300,tEXPO+.6,t,10,70);
  ann(70,352,1.5,{ar:.9,open:false});
  pill(180,150,t<tSEULE?176:268,t<tSEULE?'AUJOURD’HUI':'SEULE PERSONNE CONNUE',t<tSEULE?'#fff':YEL,INK,15,34);
  pop(t,tSEULE,k=>{ctx.translate(270,250);ctx.scale(k,k);ctx.rotate(.08);rr(-46,-34,92,68,12);fs(YEL,true,4);ctx.fillStyle=INK;ctx.font='700 11px P';ctx.textAlign='center';ctx.fillText('TOUCHÉE PAR',0,-14);ctx.font='700 11px P';ctx.fillText('UNE MÉTÉORITE',0,0);ctx.font='700 20px P';ctx.fillStyle=RED;ctx.fillText('1 SEULE',0,24)})}
function K9(t,u,d){bg('#7a3af0','#2a0f6a');rays(180,300,'#fff',20,u,.1);const q=(u%1.6)/1.6;trail(40+q*300,-20+q*300,.7,.7,110,t);rock(40+q*300,-20+q*300,.7,u*4,1);
  face(t,{cx:186,cy:346,s:.5+.1*seg(u,0,.5),eye:1.2,look:[0,0],mouth:'open',brow:8});big('ET TOI ?',180,206,48,YEL,-.04);pill(180,262,190,'UNE SIESTE ?',ORG,'#fff',16,32)}
const KS=[K0,K1b,K2,K3,K4,K5,K6,K7,K8,K9];
window.frame=function(i){const t=i/30;ctx.setTransform(3,0,0,3,0,0);ctx.clearRect(0,0,W,H);const k=sceneOf(t);seed=i*13+1;let lc=0;for(const c of CUTS)if(c<=t)lc=c;const kk=cl((t-lc)/.3),zs=1+.06*(1-kk)*(1-kk),sh=(1-kk)*5;T=t;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(zs,zs);ctx.translate(-W/2+(rnd()-.5)*sh,-H/2+(rnd()-.5)*sh);KS[k](t,t-B[k],DUR(k));ctx.restore();
  grade(t,false);hudA(t);capS(t,520);if(window.SAFE){ctx.fillStyle='rgba(255,0,0,.3)';ctx.fillRect(0,0,W,75);ctx.fillRect(300,327,60,252);ctx.fillRect(0,579,W,61);ctx.fillRect(0,75,17,504);ctx.fillRect(343,75,17,252)}
  const f=Math.max(1-t/.2,(t-(TOT-.4))/.4);if(f>0){ctx.fillStyle=`rgba(0,0,0,${cl(f)})`;ctx.fillRect(0,0,W,H)}return i};
document.fonts.load('700 38px P').then(()=>{window.READY=1});
</script></body></html>
