/* ===== POISSON-LUNE — animation à plat (titre en haut, sous-titres en bas) ===== */
const X=(w,k,d)=>{const v=wt(w,B[k]);return v!=null&&v<B[k+1]?v:B[k]+d};
const talk=t=>CAPS.some(c=>t>=c[0]&&t<c[1])?(.35+.65*Math.abs(Math.sin(t*15))):0;
const tEP=X('TARÉ',0,3.4),tTAB=X('PUTAIN',0,2),tTETE=X('TÊTE',1,.8),tQUE=X('QUEUE',1,2.2),tFIN=X('FINIR',1,4),
 tTON=X('TONNES',2,1.2),tCAL=X('PUTAIN',2,2.2),tOSS=X('OSSEUX',2,4.2),tCERV=X('CERVEAU',3,1.6),tNOIX=X('NOIX',3,3.2),tOST=X('CONNARD',3,4),
 tGEN=X('GÉNIE',4,1.4),tMED=X('MÉDUSES',4,2.4),tMED5=X('MÉDUSES',5,.1),tEAU=X("L'EAU",5,2.4),tRIEN=X('RIEN',5,3.4),
 tBOUF=X('BOUFFE',6,.7),tCAVE=X('CON',6,2.8),tFROID=X('FROID',7,1.4),tCOTE=X('CÔTÉ',7,3),tCREPE=X('CRÊPE',7,5),
 tSOL=X('SOLEIL',8,.9),tOIS=X('OISEAUX',8,2.2),tPARA=X('PARASITES',8,3.6),tLAISSE=X('LAISSE',9,.8),tNAIF=X('ABRUTI',9,2.3),
 tFEM=X('FEMELLE',10,1.8),tTROIS=X('TROIS',10,3.2),tMILL=X('MILLIONS',10,4),tCALV=X('BORDEL',11,1.9),tUSINE=X('USINE',11,3.2),tBEBE=X('BÉBÉS',11,4),
 tBOUFFER=X('BOUFFER',12,1.5),tFORT=X('FORT',12,3.2),tAVEN=X("D'AVENIR",12,4.4),tN13=X('NOIX',13,3),tCREP13=X('CRÊPE',13,5.2),tNAT=X('NATURE',14,.2),tIMP=X("N'IMPORTE",14,1.3);
const SK='#a9bccd',SKL='#d3dee8',SKF='#8da3b8',SKD='#97aec3';
function F(c){ctx.fillStyle=c;ctx.fill()}
function E(x,y,rx,ry,c,rot=0){ctx.beginPath();ctx.ellipse(x,y,rx,ry,rot,0,7);F(c)}
function R(x,y,w,h,r,c){ctx.beginPath();ctx.roundRect(x,y,w,h,r);F(c)}
function sea(u,a='#33a3e6',b='#0a3a7c'){bg(a,b);ctx.save();ctx.globalAlpha=.07;for(let i=0;i<4;i++){ctx.beginPath();const x0=40+i*90+Math.sin(u*.5+i)*14;ctx.moveTo(x0,0);ctx.lineTo(x0+40,0);ctx.lineTo(x0+140,H);ctx.lineTo(x0+60,H);ctx.closePath();F('#fff')}ctx.restore();
  ctx.fillStyle='rgba(255,255,255,.25)';seed=11;for(let i=0;i<16;i++){const x=rnd()*W,sp=.04+rnd()*.06,y=((1-((u*sp*4+rnd())%1))*H),r=1.5+rnd()*3;ctx.beginPath();ctx.arc(x+Math.sin(u+i)*5,y,r,0,7);ctx.fill()}
  ctx.fillStyle='#d9c58f';ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=20)ctx.lineTo(x,596+Math.sin(x*.03)*8);ctx.lineTo(W,H);F('#d9c58f')}
function sunfish(x,y,s,o={}){const t=o.t||0,fl=o.flip?-1:1,bob=Math.sin(t*3)*3,sw=Math.sin(t*5);
 ctx.save();ctx.translate(x,y+bob);ctx.scale(s*fl,s*(o.sq||1));ctx.rotate(o.rot||0);
 for(const sg of[-1,1]){ctx.beginPath();ctx.moveTo(-34,sg*44);ctx.quadraticCurveTo(-64+sw*4,sg*86,-58+sw*6,sg*(124+sw*3));ctx.quadraticCurveTo(-24,sg*92,2,sg*54);ctx.closePath();F(SKF)}
 E(0,0,72,58,SK);E(6,20,60,32,SKL);E(-72,0,17,50,SKD);ctx.fillStyle=SKD;for(let q=-3;q<=3;q++){ctx.beginPath();ctx.arc(-86,q*14,8,0,7);ctx.fill()}
 ctx.fillStyle='rgba(60,90,120,.28)';for(const [dx,dy] of[[-30,-20],[-10,-34],[-44,6],[-18,10],[-34,30],[-6,-10]]){ctx.beginPath();ctx.arc(dx,dy,3.4,0,7);ctx.fill()}
 if(o.para){ctx.fillStyle='#4a3a2e';for(let i=0;i<o.para;i++){const a=i*2.3,r=18+(i%4)*9;ctx.beginPath();ctx.arc(-14+Math.cos(a)*r,-6+Math.sin(a)*r*.8,2.8,0,7);ctx.fill()}}
 E(18,14,19,7,SKF,-.5+sw*.25);
 E(46,-14,9,9.5,'#fff');const lk=o.look||0;E(48.5+lk,-13,4.6,5,'#14101a');E(50+lk,-15,1.5,1.5,'#fff');
 if(o.happy){ctx.strokeStyle='#14101a';ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(46,-12,7,3.5,6);ctx.stroke()}
 if(o.brow){ctx.strokeStyle='#33465a';ctx.lineWidth=2.6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(36,-28+o.brow);ctx.lineTo(56,-24);ctx.stroke()}
 const m=o.mouth||0;E(70,8,9,7,SKL);if(m>.05)E(74,8,5.5,2+6*m,'#5a2230');else{ctx.strokeStyle='#33465a';ctx.lineWidth=2.2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(70,10);ctx.lineTo(79,9);ctx.stroke()}
 ctx.restore()}
function jelly(x,y,s,u,c='rgba(255,150,215,.9)'){ctx.save();ctx.translate(x,y+Math.sin(u*2)*5);ctx.scale(s,s*(1+.07*Math.sin(u*4)));ctx.strokeStyle='rgba(255,190,230,.8)';ctx.lineWidth=3;ctx.lineCap='round';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*8,6);for(let k=1;k<=5;k++)ctx.lineTo(i*8+Math.sin(u*3+i+k)*4,6+k*9);ctx.stroke()}
 ctx.beginPath();ctx.moveTo(-28,8);ctx.quadraticCurveTo(-30,-34,0,-34);ctx.quadraticCurveTo(30,-34,28,8);ctx.closePath();F(c);ctx.beginPath();ctx.ellipse(-8,-18,7,4,-.6,0,7);ctx.fillStyle='rgba(255,255,255,.4)';ctx.fill();ctx.restore()}
function walnut(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);E(0,0,26,22,'#b98a54');ctx.strokeStyle='#7d5a32';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(0,-22);ctx.quadraticCurveTo(5,0,0,22);ctx.stroke();ctx.beginPath();ctx.arc(-13,0,10,-1.2,1.2);ctx.stroke();ctx.beginPath();ctx.arc(13,0,10,1.9,4.3);ctx.stroke();ctx.restore()}
function pancake(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(let i=0;i<3;i++){E(0,-i*9,34,10,'#e3a84f');E(0,-i*9-3,30,7,'#f1c777')}R(-8,-36,16,7,3,'#ffe27a');E(0,-39,6,2.5,'#ffd24a');ctx.restore()}
function crown(x,y,s,k){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);ctx.beginPath();ctx.moveTo(-26,0);ctx.lineTo(-30,-30);ctx.lineTo(-14,-14);ctx.lineTo(0,-36);ctx.lineTo(14,-14);ctx.lineTo(30,-30);ctx.lineTo(26,0);ctx.closePath();F('#ffc92e');E(0,-8,4,4,'#e24a4a');ctx.restore()}
function bird(x,y,s,u){ctx.save();ctx.translate(x,y);ctx.scale(s,s);E(0,0,16,10,'#fff');E(14,-4,7,6,'#fff');ctx.beginPath();ctx.moveTo(20,-4);ctx.lineTo(30,-2);ctx.lineTo(20,0);ctx.closePath();F('#ff9a2e');E(16,-6,1.8,1.8,'#14101a');const w=Math.sin(u*14)*14;ctx.beginPath();ctx.moveTo(-6,-4);ctx.lineTo(-18,-18-w);ctx.lineTo(4,-6);ctx.closePath();F('#dfe6ee');ctx.restore()}
function HD(t,t0,txt){const k=seg(t,t0,t0+.2);if(k<=0)return;ctx.save();ctx.font='700 25px P';ctx.textAlign='left';ctx.textBaseline='alphabetic';txt.split('\n').forEach((ln,li)=>{const ws=parse(ln),sp=ctx.measureText(' ').width,wd=w=>ctx.measureText(w).width,tot=ws.reduce((s,[w])=>s+wd(w),0)+sp*(ws.length-1);
  ctx.save();ctx.translate(170,108+li*31);ctx.scale(.7+.3*k,.7+.3*k);ctx.globalAlpha=k;let x=-tot/2;for(const [w,r] of ws){ctx.lineWidth=6;ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineJoin='round';ctx.strokeText(w,x,0);ctx.fillStyle=r?'#ffd24a':'#fff';ctx.fillText(w,x,0);x+=wd(w)+sp}ctx.restore()});ctx.restore()}
function tagS(t,t0,x,y,txt,c='#ffd24a',tc='#14101a',rot=0,fz=15){if(t<t0)return;const k=seg(t,t0,t0+.2);ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(k,k);ctx.font='700 '+fz+'px P';const w=ctx.measureText(txt).width+26;R(-w/2,-16,w,32,16,c);ctx.fillStyle=tc;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,0,1);ctx.restore()}
function nope(x,y,r,t0,t){if(t<t0)return;const k=seg(t,t0,t0+.2);ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.strokeStyle='#ff3b3b';ctx.lineWidth=9;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.moveTo(-r*.7,-r*.7);ctx.lineTo(r*.7,r*.7);ctx.stroke();ctx.restore()}
function infoBg(u){bg('#162244','#22346a');dots('#fff',.06,0,H,26,3)}
function surface(u,sy=360){bg('#7fd0ff','#ffe8c0');E(290,170,40,40,'#fff4b8');ctx.save();ctx.globalAlpha=.25;for(let i=0;i<8;i++){const a=i/8*6.28+u*.2;ctx.beginPath();ctx.moveTo(290,170);ctx.lineTo(290+Math.cos(a)*90,170+Math.sin(a)*90);ctx.lineTo(290+Math.cos(a+.15)*90,170+Math.sin(a+.15)*90);ctx.closePath();F('#fff')}ctx.restore();
  ctx.beginPath();ctx.moveTo(0,sy);for(let x=0;x<=W;x+=10)ctx.lineTo(x,sy+Math.sin(x*.05+u*2)*4);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();const g=ctx.createLinearGradient(0,sy,0,H);g.addColorStop(0,'#2fa5ea');g.addColorStop(1,'#0b4a8c');ctx.fillStyle=g;ctx.fill()}
/* ================= SCÈNES ================= */
function K0(t,u,d){sea(u);const x=lerp(-120,175,sm(cl(u/1.3)));sunfish(x,340,1.05,{t,mouth:talk(t),brow:u>2?2:0});HD(t,B[0]+.05,'LE [POISSON-LUNE]\nTOTALEMENT TARÉ');tagS(t,tEP,280,250,'TARÉ ?!','#ff5a5a','#fff',.1,20)}
function K1(t,u,d){sea(u);sunfish(190,340,1.05,{t,mouth:talk(t)});ctx.save();ctx.setLineDash([7,6]);ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(190-96,340,36,60,0,0,7);ctx.stroke();ctx.restore();
  nope(94,340,40,tQUE,t);tagS(t,tQUE,100,260,'PAS DE QUEUE','#ff5a5a','#fff',-.08,19);HD(t,B[1]+.05,'UNE [TÊTE] QUI NAGE\nZÉRO QUEUE')}
function K2(t,u,d){sea(u);const k=seg(t,tTON,tTON+.35),sq=1-.22*Math.max(0,Math.sin(Math.min(1,(t-tTON-.35)*4)*3.14))*(t>tTON+.3?1:0);sunfish(180,350,1.2,{t,mouth:talk(t),sq});
  if(t>=tTON){const v=t-tTON,y=lerp(-80,205,sm(cl(v/.3)));ctx.save();ctx.translate(180,y);ctx.beginPath();ctx.arc(0,-30,16,3.14,6.28);ctx.lineWidth=7;ctx.strokeStyle='#33363e';ctx.stroke();ctx.beginPath();ctx.moveTo(-30,0);ctx.lineTo(30,0);ctx.lineTo(44,-24);ctx.lineTo(-44,-24);ctx.closePath();F('#4b4f5a');R(-48,0,96,42,10,'#33363e');ctx.fillStyle='#fff';ctx.font='700 24px P';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('2 T',0,21);ctx.restore();if(v>.3&&v<.8)big('BOUM !',250,300,30,'#ffd24a',.1,1-(v-.3)/.5)}
  if(t>=tOSS)crown(180,190,1.4,seg(t,tOSS,tOSS+.25));tagS(t,tOSS,180,500,'LE PLUS GROS DU MONDE','#ffd24a','#14101a',0,16);HD(t,B[2]+.05,'[2 TONNES]\nPOISSON [OSSEUX]')}
function K3(t,u,d){infoBg(u);sunfish(150,350,1.15,{t,mouth:talk(t),look:0});const k=seg(t,tCERV,tCERV+.25);ctx.save();ctx.globalAlpha=k;ctx.strokeStyle='#ffd24a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(150+46*1.15,350-14*1.15,16,0,7);ctx.stroke();ctx.restore();
  if(t>=tNOIX){const kk=seg(t,tNOIX,tNOIX+.3);ctx.save();ctx.translate(262,226);ctx.scale(kk,kk);ctx.beginPath();ctx.arc(0,0,58,0,7);F('rgba(255,255,255,.1)');ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.stroke();walnut(0,0,1.7);ctx.restore();ctx.strokeStyle='#ffd24a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(150+62,350-26);ctx.lineTo(225,262);ctx.stroke()}
  tagS(t,tCERV,110,470,'CERVEAU','#ff9aa8','#14101a',-.05,19);tagS(t,tNOIX,262,306,'= UNE NOIX','#ffd24a','#14101a',.05,19);HD(t,B[3]+.05,'CERVEAU = [NOIX]')}
function K4(t,u,d){sea(u,'#2a7fd0','#08306a');sunfish(100,350,.95,{t,mouth:t>=tMED?.9:talk(t),look:3});[[250,260,1.3,0],[300,360,1.1,1],[220,430,1,2],[290,470,1.2,3]].forEach(([x,y,s,i])=>jelly(x+Math.sin(u+i)*8,y,s,u+i));
  tagS(t,tGEN,196,190,'LE GÉNIE ?','#ffd24a','#14101a',-.06,20);tagS(t,tMED,262,556,'MÉDUSES','#ff9ad6','#14101a',.05,18);HD(t,B[4]+.05,'IL MANGE QUOI ?\nDES [MÉDUSES]')}
function K5(t,u,d){infoBg(u);jelly(180,300,3.1,u);R(40,470,280,34,17,'#fff');const k=seg(t,tEAU-.3,tEAU+.5);R(40,470,Math.max(0,264*.97*k)+10,34,17,'#3aa6f0');if(k>.05){ctx.fillStyle='#fff';ctx.font='700 17px P';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('EAU',40+Math.max(60,264*.97*k/2),487)}
  R(40+264*.97*k+4,470,Math.max(0,282-264*.97*k-8)*1,34,17,k>.9?'#ff9ad6':'rgba(0,0,0,0)');nope(180,300,70,tRIEN,t);tagS(t,tRIEN,180,396,'RIEN À BOUFFER','#ff5a5a','#fff',0,19);HD(t,B[5]+.05,'PRESQUE JUSTE\nDE L\'[EAU]')}
function K6(t,u,d){sea(u);const per=.9;sunfish(95,370,.95,{t,mouth:Math.abs(Math.sin(u*6))>.5?.9:0,flip:false});
  for(let i=0;i<6;i++){const q=((u/per)+i/6*2)%2,x=lerp(380,146,cl(q/1.2));if(q<1.25){jelly(x,360+Math.sin(i*2)*60,.8,u+i)}else if(q<1.5)big('MIAM',170+(i%2)*40,330-(i%3)*30,20,'#fff',.1,1-(q-1.25)*4)}
  ctx.save();ctx.translate(300,210);ctx.rotate(u*1.4);for(let i=0;i<8;i++){ctx.rotate(.785);R(-3,-34,6,12,3,'#ffd24a')}E(0,0,18,18,'#ffd24a');ctx.restore();
  tagS(t,tBOUF,300,262,'TOUTE LA JOURNÉE','#ffd24a','#14101a',0,15);tagS(t,tCAVE,110,500,'LE GROS CON','#ff5a5a','#fff',-.05,19);HD(t,B[6]+.05,'IL EN [BOUFFE]\nTOUTE LA JOURNÉE')}
function K7(t,u,d){surface(u);const flat=seg(t,tCOTE,tCOTE+.5);const sh=t>=tFROID&&t<tCOTE?Math.sin(u*40)*2:0;
  sunfish(180+sh,lerp(440,372,flat),1.05,{t,mouth:talk(t),sq:lerp(1,.32,flat),rot:lerp(0,-.04,flat)});
  ctx.fillStyle='rgba(20,100,180,.45)';ctx.fillRect(0,372,W,H);if(t>=tFROID&&t<tCOTE+.4){ctx.fillStyle='#bfe8ff';ctx.font='700 22px P';ctx.textAlign='center';ctx.fillText('BRR...',120,320+Math.sin(u*10)*3)}
  if(t>=tCREPE){const k=seg(t,tCREPE,tCREPE+.25);ctx.save();ctx.translate(290,330);ctx.scale(k,k);pancake(0,0,1.3);ctx.restore()}
  tagS(t,tFROID,100,230,'IL A FROID','#6ec3ff','#14101a',-.05,18);tagS(t,tCREPE,180,520,'COMME UNE CRÊPE','#ffd24a','#14101a',0,20);HD(t,B[7]+.05,'IL SE COUCHE\nCOMME UNE [CRÊPE]')}
function K8(t,u,d){surface(u);sunfish(180,372,1.05,{t,sq:.32,para:t>=tPARA?12:12,happy:true});ctx.fillStyle='rgba(20,100,180,.45)';ctx.fillRect(0,372,W,H);
  [[tOIS,90,0],[tOIS+.5,210,1],[tOIS+1,290,2]].forEach(([tt,x,i])=>{if(t>=tt){const v=(t-tt)*1.2,y=lerp(120,312,sm(cl(v/.6)))+(v>.6?-Math.abs(Math.sin(u*8+i))*14:0);bird(x,y,1.4,u+i)}});
  for(let i=0;i<8;i++){const tt=tPARA+.15*i;if(t>=tt){const v=t-tt;ctx.fillStyle='#4a3a2e';ctx.globalAlpha=Math.max(0,1-v);ctx.fillRect(110+i*14+v*30,340-v*70,5,5);ctx.globalAlpha=1}}
  tagS(t,tPARA,200,270,'PARASITES','#ff5a5a','#fff',.05,19);if(t>=tSOL)tagS(t,tSOL,290,230,'BRONZAGE','#ffd24a','#14101a',-.05,15);HD(t,B[8]+.05,'LES [OISEAUX]\nMANGENT SES PARASITES')}
function K9(t,u,d){surface(u);sunfish(180,372,1.05,{t,sq:.32,happy:true,para:t<tLAISSE+.8?12:5});ctx.fillStyle='rgba(20,100,180,.45)';ctx.fillRect(0,372,W,H);
  [[90,0],[230,1]].forEach(([x,i])=>bird(x,312-Math.abs(Math.sin(u*8+i))*14,1.4,u+i));tagS(t,tLAISSE,110,250,'IL SE LAISSE FAIRE','#ffd24a','#14101a',-.04,17);tagS(t,tNAIF,230,500,'GROS ABRUTI','#ff5a5a','#fff',.05,22);HD(t,B[9]+.05,'IL SE [LAISSE FAIRE]\nLE GROS ABRUTI')}
function K10(t,u,d){sea(u,'#1a5ea8','#07224d');sunfish(80,380,.8,{t,mouth:talk(t),flip:false});const n=Math.floor(cl((t-B[10]-1.2)/(d-2))*170);seed=21;
  for(let i=0;i<n;i++){const a=seg(t,B[10]+1.2+i*(d-2)/170,B[10]+1.2+i*(d-2)/170+.15),x=120+rnd()*240,y=150+rnd()*420;E(x+Math.sin(u*2+i)*3,y,5,5,'rgba(255,225,150,'+(.9*a)+')')}
  const cnt=Math.floor(300*cl((t-tTROIS)/(tMILL+.4-tTROIS)));if(t>=tTROIS){big(cnt+' 000 000',230,300,30,'#fff',0,1);tagS(t,tFEM,90,210,'LA FEMELLE','#ff9ad6','#14101a',-.05,18)}HD(t,B[10]+.05,'[300 MILLIONS]\nD\'ŒUFS D\'UN COUP')}
function K11(t,u,d){bg('#17394a','#0b1f2b');dots('#fff',.04,0,H,26,3);R(14,270,120,170,6,'#3a5568');R(96,200,28,80,4,'#4b6a80');for(let i=0;i<3;i++){E(110+Math.sin(u*2+i)*10,182-i*26-((u*40)%26),12+i*3,10+i*2,'rgba(200,220,235,.35)')}for(const wy of[290,330,370])R(30,wy,34,22,3,'#ffd24a');
  R(0,470,W,18,4,'#2a3a46');ctx.fillStyle='#1b2630';for(let i=0;i<18;i++)ctx.fillRect(((i*22+u*80)%(W+22))-11,470,10,18);
  for(let i=0;i<5;i++){const x=((u*70+i*80)%400)-20,y=456;if(x<190)E(x,y,8,10,'#ffe2a0');else{E(x,y-4,9,7,'#f28a3a');ctx.beginPath();ctx.moveTo(x-9,y-4);ctx.lineTo(x-17,y-10);ctx.lineTo(x-17,y+2);ctx.closePath();F('#f28a3a')}}
  if(t>=tCALV)big('BORDEL !',200,330,34,'#ffd24a',-.05,Math.min(1,1.6-(t-tCALV)/1.2));tagS(t,tUSINE,230,250,'USINE À BÉBÉS','#ff9ad6','#14101a',.04,20);HD(t,B[11]+.05,'UNE [USINE]\nÀ BÉBÉS')}
function K12(t,u,d){sea(u,'#1f6bb0','#08285a');const alive=Math.max(2,Math.floor(24-cl((t-tBOUFFER)/(tFORT-tBOUFFER+1.2))*22));seed=33;for(let i=0;i<24;i++){const x=lerp(380,150,((u*.18+i*.043)%1)),y=190+rnd()*320;if(i<alive){ctx.save();ctx.translate(x,y+Math.sin(u*5+i)*4);E(0,0,9,6,'#f28a3a');ctx.beginPath();ctx.moveTo(8,0);ctx.lineTo(15,-5);ctx.lineTo(15,5);ctx.closePath();F('#f28a3a');E(-4,-1,1.4,1.4,'#14101a');ctx.restore()}}
  const bt=Math.abs(Math.sin(u*5));ctx.save();ctx.translate(80,370);E(0,0,70,48,'#25364a');ctx.beginPath();ctx.moveTo(-60,-10);ctx.lineTo(-96,-40);ctx.lineTo(-96,30);ctx.closePath();F('#25364a');E(26,-16,9,9,'#fff');E(28,-15,4,4,'#14101a');ctx.beginPath();ctx.moveTo(40,8);ctx.lineTo(118,10+bt*18);ctx.lineTo(118,-6-bt*8);ctx.lineTo(40,-8);ctx.closePath();F('#5a2230');ctx.fillStyle='#fff';for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(58+i*10,-3);ctx.lineTo(62+i*10,6);ctx.lineTo(66+i*10,-3);ctx.closePath();ctx.fill()}ctx.restore();
  if(t>=tBOUFFER)big(['CHOMP','CROC'][Math.floor(u*3)%2],230,300,26,'#fff',-.1,1);tagS(t,tFORT,230,540,'PAS FORT, COMME PLAN','#ffd24a','#14101a',0,17);tagS(t,tBOUFFER,250,215,'SURVIVANTS : '+alive,'#ff5a5a','#fff',.04,16);HD(t,B[12]+.05,'PRESQUE TOUS\nSE FONT [BOUFFER]')}
function K13(t,u,d){sea(u);const flat=seg(t,tCREP13-.2,tCREP13+.4);sunfish(180,lerp(400,420,flat),1.05,{t,mouth:talk(t),sq:lerp(1,.32,flat)});
  if(t>=tN13){const k=seg(t,tN13,tN13+.25);ctx.save();ctx.translate(90,250);ctx.scale(k,k);ctx.beginPath();ctx.arc(0,0,44,0,7);F('rgba(255,255,255,.9)');E(30,40,8,8,'rgba(255,255,255,.9)');E(48,58,4,4,'rgba(255,255,255,.9)');walnut(0,0,1.15);ctx.restore()}
  if(t>=tCREP13){const k=seg(t,tCREP13,tCREP13+.25);ctx.save();ctx.translate(290,330);ctx.scale(k,k);pancake(0,0,1.2);ctx.restore()}HD(t,B[13]+.05,'2 TONNES · [NOIX]\nET [CRÊPE]')}
function K14(t,u,d){bg('#8a3af0','#3a1a8a');rays(180,330,'#fff',18,u,.12);const sh=t>=tNAT+.6?Math.sin(u*6)*.05:0;ctx.save();ctx.translate(180,360);ctx.rotate(sh);sunfish(0,0,1.15,{t,mouth:talk(t),brow:-3});ctx.restore();
  big('N\'IMPORTE QUOI',180,520,30,'#ffd24a',-.05,seg(t,tIMP,tIMP+.2));HD(t,B[14]+.05,'LA NATURE\nEST [TARÉE]')}
const KS=[K0,K1,K2,K3,K4,K5,K6,K7,K8,K9,K10,K11,K12,K13,K14];
function soft(){const v=ctx.createRadialGradient(W/2,H*.5,H*.3,W/2,H*.5,H*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.28)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)}
window.frame=function(i){const t=i/30;ctx.setTransform(3,0,0,3,0,0);ctx.clearRect(0,0,W,H);const k=sceneOf(t);seed=i*13+1;let lc=0;for(const c of CUTS)if(c<=t)lc=c;const kk=cl((t-lc)/.25),zs=1+.045*(1-kk)*(1-kk);T=t;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(zs,zs);ctx.translate(-W/2,-H/2);KS[k](t,t-B[k],DUR(k));ctx.restore();
  soft();capS(t,520);if(window.SAFE){ctx.fillStyle='rgba(255,0,0,.3)';ctx.fillRect(0,0,W,75);ctx.fillRect(300,327,60,252);ctx.fillRect(0,579,W,61);ctx.fillRect(0,75,17,504);ctx.fillRect(343,75,17,252)}
  const f=Math.max(1-t/.2,(t-(TOT-.4))/.4);if(f>0){ctx.fillStyle=`rgba(0,0,0,${cl(f)})`;ctx.fillRect(0,0,W,H)}return i};
document.fonts.load('700 38px P').then(()=>{window.READY=1});
</script></body></html>
