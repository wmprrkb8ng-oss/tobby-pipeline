/* ---- instants-clés (mots de la vraie voix) ---- */
const w=(x,k,d)=>WT(x,k,B[k]+d);
const tESP=w("L'ESPACE",0,1.6),tVRAI=w('VRAI',0,3.4),tKIT=w('KITTINGER',0,4.6),
 tAOUT=w('AOÛT',1,1.2),tCAPIT=w('CAPITAINE',1,3.4),tENO=w('ÉNORME',1,6),tNAC=w('NACELLE',1,7.2),
 tGANT=w('GANT',2,1.1),tMAIN=w('MAIN',2,2.7),tDEUX=w('DEUX',2,3.8),tMAIS=w('MAIS',2,5),
 tTRENTE=w('TRENTE',3,1.5),tCIEL=w('CIEL',3,3.5),tPLAQ=w('PLAQUE',3,6),tMARCHE=w('MARCHE',3,6.9),tHAUTE=w('HAUTE',3,7.8),
 tPAS=w('PAS',4,1.2),tVIDE=w('VIDE',4,1.6),
 tTOMBE=w('TOMBE',5,.2),tQUATRE=w('QUATRE',5,.9),tVIT=w('VITESSE',5,3.1),tNEUF=w('NEUF',5,3.9),
 tPARA=w('PARACHUTE',6,1.6),tDESC=w('DESCENTE',6,3.1),tTREIZE=w('TREIZE',6,4.5),
 tPOSE=w('POSE',7,.5),tTROIS=w('TROIS',7,2.6),tREC7=w('RECORDS',7,3),
 tCINQ=w('CINQUANTE',8,2.4),tOSER=w('OSERAIS',9,.8);
/* ---- HUD : altitude en km (sous la barre TikTok) ---- */
const AK=[[0,0],[tENO,.4],[tTRENTE,31.3],[tPAS,31.3],[tPARA,5],[tPOSE,0],[999,0]];
function alt(t){for(let i=1;i<AK.length;i++)if(t<AK[i][0]){const a=AK[i-1],b=AK[i];return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0])}return 0}
function hudG(t){if(t<B[1])return;const a=alt(t),dn=t>=tPAS&&t<tPOSE,top=a>=31.2&&t<tPAS;ctx.save();ctx.textBaseline='middle';ctx.textAlign='left';
  rr(30,84,294,42,12);fs('rgba(12,16,40,.9)',true,3);ctx.strokeStyle=top?YEL:dn?RED:BLU;ctx.lineWidth=3;ctx.stroke();ctx.font='700 8px P';ctx.fillStyle='#cfe8ff';ctx.fillText(dn?'ALTITUDE • EN CHUTE':'ALTITUDE',40,96);
  rr(40,108,170,9,4.5);ctx.fillStyle='#2c3160';ctx.fill();const f=Math.min(1,a/31.3);if(f>0){rr(40,108,Math.max(9,170*f),9,4.5);ctx.fillStyle=top?YEL:dn?RED:BLU;ctx.fill()}
  ctx.font='700 21px P';ctx.textAlign='right';ctx.fillStyle=top?YEL:'#fff';ctx.fillText(a<.05?'0 km':a.toFixed(1).replace('.',',')+' km',314,108);ctx.restore()}
/* ---- accessoires et décors ---- */
function tob(x,y,s,o={},fx={}){mini(x,y,s,o);ctx.save();ctx.translate(x,y);ctx.scale(s*(o.flip||1),s);
  if(fx.suit){rr(-18,4,36,36,10);fs('#f4f6ff',true,3);ctx.fillStyle=ORG;ctx.fillRect(-9,18,18,5)}
  if(fx.helmet){ctx.beginPath();ctx.arc(0,-18,32,0,7);ctx.fillStyle='rgba(190,230,255,.28)';ctx.fill();ctx.strokeStyle='#f4f6ff';ctx.lineWidth=5;ctx.stroke();ctx.strokeStyle=INK;ctx.lineWidth=1.6;ctx.stroke();ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(-16,-34,4,9,.6,0,7);ctx.fill()}
  if(fx.cap){ctx.beginPath();ctx.ellipse(0,-40,26,7,0,0,7);fs('#2b3a6a',true,3);ctx.beginPath();ctx.roundRect(-20,-52,40,16,7);fs('#2b3a6a',true,3);ctx.fillStyle=YEL;ctx.fillRect(-6,-46,12,5)}
  if(fx.angry){ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.lineCap='round';for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*17,-33);ctx.lineTo(sx*3,-27);ctx.stroke()}}
  ctx.restore()}
function earth(cy,r,u=0){ctx.save();cglow(180,cy,r+70,'rgba(120,200,255,.35)');ctx.beginPath();ctx.arc(180,cy,r,0,7);ctx.fillStyle='#2a74d6';ctx.fill();ctx.save();ctx.clip();ctx.fillStyle='#4cb06a';
  for(const [dx,dy,rx,ry] of[[-80,-r+30,70,16],[60,-r+22,50,12],[-10,-r+60,40,10],[130,-r+60,36,10]]){ctx.beginPath();ctx.ellipse(180+dx+(u*3%40),cy+dy,rx,ry,0,0,7);ctx.fill()}ctx.fillStyle='rgba(255,255,255,.7)';for(const [dx,dy,rx] of[[-40,-r+14,30],[90,-r+40,24],[-120,-r+44,26]]){ctx.beginPath();ctx.ellipse(180+dx,cy+dy,rx,6,0,0,7);ctx.fill()}ctx.restore();
  ctx.beginPath();ctx.arc(180,cy,r,0,7);ctx.strokeStyle='#8fdcff';ctx.lineWidth=5;ctx.stroke();ctx.restore()}
function balloon(x,y,s,k=1){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);ctx.strokeStyle=INK;ctx.lineWidth=2;for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*22,0);ctx.lineTo(sx*52,-84);ctx.stroke()}
  ctx.beginPath();ctx.ellipse(0,-150,66,86,0,0,7);fs('#f4f1e8',true,4);ctx.save();ctx.clip();ctx.fillStyle='#e9a23a';for(let i=-3;i<=3;i+=2)ctx.fillRect(i*17-8,-250,16,200);ctx.restore();ctx.beginPath();ctx.ellipse(0,-150,66,86,0,0,7);ctx.strokeStyle=INK;ctx.lineWidth=4;ctx.stroke();
  rr(-30,0,60,40,5);fs('#b9633f',true,4);rr(-30,0,60,8,3);fs('#8a4a2a',true,3);ctx.restore()}
function gondola(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-70,0,140,70,6);fs('#b9633f',true,4);rr(-70,0,140,12,4);fs('#8a4a2a',true,3.5);ctx.restore()}
function desert(u=0){bg('#8fd3ff','#ffe9b8');cloud(70,210,.8);ctx.fillStyle='#e8c07a';ctx.fillRect(0,440,W,200);ctx.fillStyle='#d9a95f';ctx.beginPath();ctx.moveTo(0,440);ctx.quadraticCurveTo(90,400,180,440);ctx.quadraticCurveTo(270,400,360,440);ctx.lineTo(360,450);ctx.lineTo(0,450);ctx.fill();ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(0,440,W,4)}
function cactus(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-9,-60,18,60,8);fs('#3dbb6a',true,3.5);rr(-28,-44,14,8,4);fs('#3dbb6a',true,3);rr(-28,-52,10,20,5);fs('#3dbb6a',true,3);rr(14,-34,14,8,4);fs('#3dbb6a',true,3);rr(18,-44,10,18,5);fs('#3dbb6a',true,3);ctx.restore()}
function hand(x,y,s,sw,c){ctx.save();ctx.translate(x,y);ctx.scale(s*sw,s*sw);rr(-22,-4,44,38,10);fs(c,true,3.5);for(let i=0;i<4;i++){rr(-22+i*11.5,-36+(i%3==1?-4:0),9,36,4.5);fs(c,true,3)}ctx.beginPath();ctx.ellipse(-26,10,18,8,-.7,0,7);fs(c,true,3);ctx.restore()}
function streaks(u,col='rgba(255,255,255,.7)',n=16){ctx.strokeStyle=col;ctx.lineWidth=2.5;ctx.lineCap='round';for(let i=0;i<n;i++){const x=(i*53+17)%360,y=((u*1100+i*97)%760)-60;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+70+(i%3)*20);ctx.stroke()}}
function chute(x,y,s,k=1){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);ctx.strokeStyle=INK;ctx.lineWidth=2;for(const sx of[-60,-30,30,60]){ctx.beginPath();ctx.moveTo(sx,-70);ctx.lineTo(0,0);ctx.stroke()}ctx.beginPath();ctx.moveTo(-80,-70);ctx.quadraticCurveTo(0,-190,80,-70);ctx.quadraticCurveTo(40,-82,0,-70);ctx.quadraticCurveTo(-40,-82,-80,-70);fs('#ffffff',true,4);ctx.save();ctx.clip();ctx.fillStyle=RED;ctx.fillRect(-45,-190,30,130);ctx.fillRect(15,-190,30,130);ctx.restore();ctx.restore()}
function trophy(x,y,s,k=1,col='#ffd24a'){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);rr(-26,62,52,16,4);fs('#8a5a3a',true,4);rr(-8,36,16,28,2);fs(col,true,4);
  for(const sx of[-1,1]){ctx.beginPath();ctx.ellipse(sx*42,-34,15,20,0,0,7);ctx.strokeStyle=INK;ctx.lineWidth=9;ctx.stroke();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke()}
  ctx.beginPath();ctx.moveTo(-40,-60);ctx.lineTo(40,-60);ctx.quadraticCurveTo(40,28,0,38);ctx.quadraticCurveTo(-40,28,-40,-60);ctx.closePath();fs(col,true,4.5);
  ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(-20,-30,5,22,.1,0,7);ctx.fill();ctx.restore()}
function confetti(u,n=26){for(let i=0;i<n;i++){const q=(u*.45+i/n)%1;ctx.fillStyle=[RED,YEL,BLU,GRN,ORG][i%5];ctx.save();ctx.translate((i*47)%340+10+Math.sin(u*3+i)*8,110+q*430);ctx.rotate(u*4+i);ctx.fillRect(-4,-2,8,4);ctx.restore()}}
function cal(x,y,s,top,big_,c=RED,k=1){ctx.save();ctx.translate(x,y);ctx.scale(s*k,s*k);rr(-52,-60,104,120,10);fs('#fff',true,4.5);rr(-52,-60,104,30,10);fs(c,true,4.5);ctx.fillStyle='#fff';ctx.font='700 14px P';ctx.textAlign='center';ctx.fillText(top,0,-39);ctx.fillStyle=INK;ctx.font='700 '+(big_.length>3?30:50)+'px P';ctx.fillText(big_,0,26);for(const sx of[-28,28]){rr(sx-4,-70,8,18,3);fs('#8892a8',true,2.5)}ctx.restore()}
function sp(){bg('#02030c','#0a1030');stars(40,420,9)}
/* ================= SCÈNES ================= */
function S0a(t,u){sp();earth(900,520,u);const j=Math.min(1,u/1.2);tob(180,330-30*Math.sin(u*3),1.6,{ar:.7,open:true},{suit:1,helmet:1});pill(180,150,262,'ET SI TU SAUTAIS ?',RED,'#fff',14,34)}
function S0b(t,u){sp();earth(860,480,u);const k=seg(t,tESP,tESP+.35);tob(100,380,1.2,{ar:.2},{suit:1,helmet:1});ctx.save();ctx.translate(230,300);ctx.scale(k,k);pill(0,0,190,"L'ESPACE",BLU,'#fff',22,50);ctx.restore();pill(180,150,262,'DEPUIS LE BORD',BLU,'#fff',14,34)}
function S0c(t,u){bg('#8fd3ff','#e9f6ff');cloud(70,210,.9);cloud(280,240,.8);ctx.fillStyle='#e8c07a';ctx.fillRect(0,470,W,170);tob(100,396,1.5,{ar:.2},{cap:1});const k=seg(t,tKIT,tKIT+.3);
  pill(180,150,236,'UN VRAI PILOTE',GRN,'#fff',15,34);if(k>0){ctx.save();ctx.translate(200,320);ctx.scale(k,k);pill(0,0,200,'JOE KITTINGER',YEL,INK,17,38);ctx.restore()}}
function S1a(t,u){desert(u);cactus(290,440,1);cactus(60,440,.8);tob(170,396,1.4,{ar:.3},{cap:1});pill(180,150,236,'DÉSERT AMÉRICAIN',ORG,'#fff',14,34);pop(t,tAOUT,k=>cal(110,300,.8,'AOÛT','1960',RED,k))}
function S1b(t,u){bg('#7a8ab0','#d0d8ee');ctx.fillStyle='#e8c07a';ctx.fillRect(0,470,W,170);tob(180,398,1.7,{ar:.3},{cap:1});pill(180,150,236,'CAPITAINE • ARMÉE DE L\'AIR',BLU,'#fff',11,34);big('★★★',180,290,30,YEL,0,1)}
function S1c(t,u){desert(u);const y=Math.max(150,440-(t-tENO)*40);balloon(180,y,1,1);gondola(180,Math.max(0,y)+0,0);tob(180,y+38,.55,{ar:.7},{suit:1,helmet:1});pill(180,150,236,'SOUS UN ÉNORME BALLON',ORG,'#fff',13,34)}
function S2a(t,u){bg('#ffd9a0','#fff0d0');const k=1-.5*Math.min(1,u/1.6);hand(180,330,2.2,1,'#e9ecf7');pill(180,150,236,'SON GANT SE DÉGONFLE',RED,'#fff',13,34);for(let i=0;i<5;i++){const q=(u*1.3+i/5)%1;ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.arc(120+i*30,300-q*120,6+q*4,0,7);ctx.fill()}}
function S2b(t,u){bg('#ffb3a0','#ffe3d6');const k=1+Math.min(1,(t-tMAIN)/1.2)*.5;hand(180,340,2.2,k,PSK);pill(180,150,236,'SA MAIN GONFLE',RED,'#fff',15,34);pop(t,tDEUX,q=>{ctx.translate(180,470);ctx.scale(q,q);pill(0,0,170,'DEUX FOIS PLUS',YEL,INK,17,38)})}
function S2c(t,u){bg('#8fd3ff','#e9f6ff');cloud(70,260,.8);balloon(180,420,.9,1);tob(180,380,.8,{ar:.9},{suit:1,helmet:1});pill(180,150,236,'IL CONTINUE QUAND MÊME',GRN,'#fff',13,34)}
function S3a(t,u){const y=cl((t-B[3])/(tCIEL-B[3]));bg(mixc('#8fd3ff','#0a1030',y),mixc('#e9f6ff','#2a3a7a',y));stars(Math.round(30*y),380,4);balloon(180,420-60*Math.sin(u*2)*0,.95,1);tob(180,420+38*.95,.5,{ar:.7},{suit:1,helmet:1});pill(180,150,236,'1H30 PLUS TARD',BLU,'#fff',15,34);pop(t,tTRENTE,k=>{ctx.translate(290,250);ctx.scale(k,k);pill(0,0,110,'31 KM !',YEL,INK,18,38)})}
function S3b(t,u){sp();earth(900,520,u);tob(180,360,1.5,{ar:.5},{suit:1,helmet:1});pill(180,150,236,'LE CIEL EST TOUT NOIR',BLU,'#fff',13,34);big('NOIR',270,250,40,YEL,-.06,seg(t,tCIEL+.4,tCIEL+.7))}
function S3c(t,u){sp();earth(940,520,u);gondola(180,370,1.5);rr(130,320,100,70,6);fs('#d7dbe8',true,3.5);ctx.fillStyle=INK;ctx.font='700 13px P';ctx.textAlign='center';ctx.fillText('LA MARCHE',180,350);ctx.fillText('LA PLUS HAUTE',180,368);ctx.fillText('DU MONDE',180,384);tob(250,300,.9,{ar:.4},{suit:1,helmet:1});pill(180,150,200,'UNE PLAQUE',ORG,'#fff',16,34)}
function S3d(t,u){sp();earth(780,430,u);const k=seg(t,tHAUTE,tHAUTE+.3);tob(180,290,1.5,{ar:.8,open:true},{suit:1,helmet:1});pill(180,150,262,'LA PLUS HAUTE DU MONDE',RED,'#fff',12,34);ctx.save();ctx.translate(180,470);ctx.scale(k,k);pill(0,0,210,'31 KM D\'ALTITUDE',YEL,INK,17,40);ctx.restore()}
function S4a(t,u){sp();earth(940,520,u);gondola(180,410,1.5);tob(220,350,1.4,{ar:.2},{suit:1,helmet:1});pill(180,150,236,'ALORS JOE...',YEL,INK,16,34)}
function S4b(t,u){sp();earth(900,500,u);const k=cl((t-tPAS)/.8);tob(190-20*k,350+90*k,1.5,{ar:.9,open:true,spread:10*k},{suit:1,helmet:1});pill(180,150,236,'UN PAS DANS LE VIDE',RED,'#fff',13,34);big('UN PAS !',260,250,36,YEL,-.08,seg(t,tPAS,tPAS+.2))}
function S5a(t,u){const y=cl((t-tTOMBE)/4);bg(mixc('#0a1030','#4aa0e8',y),mixc('#1b2a6a','#bfe6ff',y));stars(Math.round(26*(1-y)),360,3);streaks(u);tob(180+Math.sin(u*25)*3,380,1.6,{ar:.9,open:true,spread:14},{suit:1,helmet:1});pill(180,150,262,'IL TOMBE PENDANT',RED,'#fff',14,34);pop(t,tQUATRE,k=>{ctx.translate(180,225);ctx.scale(k,k);pill(0,0,230,'4 MIN 36 SEC',YEL,INK,22,48)})}
function S5b(t,u){bg('#4aa0e8','#bfe6ff');cloud(80,300+((u*300)%300),.8);streaks(u,'rgba(255,255,255,.8)',22);tob(180+Math.sin(u*28)*3,360,1.5,{ar:.9,open:true,spread:14},{suit:1,helmet:1});pill(180,150,236,'SA VITESSE',RED,'#fff',16,34);const k=seg(t,tNEUF,tNEUF+.35);ctx.save();ctx.translate(180,230);ctx.scale(k,k);pill(0,0,262,'988 KM/H',YEL,INK,34,60);ctx.restore()}
function S6a(t,u){bg('#4aa0e8','#d6efff');cloud(60,260,.8);cloud(300,380,.9);const k=seg(t,tPARA+.1,tPARA+.6);chute(180,330,1.1,Math.max(.01,k));tob(180,400,1.2,{ar:.9},{suit:1,helmet:1});pill(180,150,262,'À 5 000 MÈTRES',BLU,'#fff',14,34);if(t>=tPARA)big('OUF !',285,300,30,YEL,-.06,1)}
function S6b(t,u){bg('#8fd3ff','#eefaff');cloud(70,200,.8);ctx.fillStyle='#e8c07a';ctx.fillRect(0,500,W,140);chute(180,300+Math.min(1,u/3)*50,.9,1);tob(180,380+Math.min(1,u/3)*50,1,{ar:.9},{suit:1,helmet:1});pill(180,150,236,'DESCENTE COMPLÈTE',BLU,'#fff',13,34);pop(t,tTREIZE,k=>{ctx.translate(285,300);ctx.scale(k,k);pill(0,0,130,'13 MINUTES',YEL,INK,14,36)})}
function S7a(t,u){desert(u);cactus(290,440,1);const k=cl((t-tPOSE)/.7);tob(150,Math.min(396,300+96*k),1.5,{ar:.9,open:true},{suit:1,helmet:1});pill(180,150,236,'SAIN ET SAUF',GRN,'#fff',16,34);big('✓',270,300,60,GRN,0,seg(t,tPOSE+.8,tPOSE+1.1))}
function S7b(t,u){bg('#7a3af0','#2a0f6a');rays(180,300,'#fff',20,u,.12);confetti(u);trophy(180,310,1.3,seg(u,0,.4)*(1+.03*Math.sin(u*6)));pill(180,150,262,'3 RECORDS DU MONDE',YEL,INK,13,34);tob(60,405,.9,{ar:1,open:true},{suit:1,helmet:1})}
function S8a(t,u){bg('#1c2048','#4a3f86');stars(26,300,3);cglow(180,300,160,'rgba(255,220,120,.35)');cal(180,300,1.5,'RECORD','1960',ORG,1+.03*Math.sin(u*6));pill(180,150,262,'LE SAUT LE PLUS HAUT',ORG,'#fff',13,34);pop(t,tCINQ,k=>{ctx.translate(180,470);ctx.scale(k,k);pill(0,0,236,'+ DE 50 ANS !',YEL,INK,22,48)})}
function S9(t,u){bg('#7a3af0','#2a0f6a');rays(180,300,'#fff',20,u,.1);dots('#fff',.08,0,H,26,4);tob(180,375,1.5,{ar:.3+.2*Math.sin(u*4),open:true},{suit:1,helmet:1});big('ET TOI ?',180,230,48,YEL,-.04);pop(t,tOSER,k=>{ctx.translate(180,300);ctx.scale(k,k);pill(0,0,236,'TU OSERAIS ?',RED,'#fff',20,44)})}
/* ---- enchaînement : plusieurs plans par paragraphe ---- */
const PLAN=[[B[0],S0a],[tESP-.15,S0b],[tVRAI-.1,S0c],[B[1],S1a],[tCAPIT-.15,S1b],[tENO-.1,S1c],[B[2],S2a],[tMAIN-.1,S2b],[tMAIS-.1,S2c],[B[3],S3a],[tCIEL-.1,S3b],[tPLAQ-.5,S3c],[tHAUTE-.5,S3d],[B[4],S4a],[tPAS-.1,S4b],[B[5],S5a],[tVIT-.2,S5b],[B[6],S6a],[tDESC-.15,S6b],[B[7],S7a],[tTROIS-.2,S7b],[B[8],S8a],[B[9],S9]];
CUTS=PLAN.map(p=>p[0]);
const planOf=t=>{let k=0;for(let i=0;i<PLAN.length;i++)if(t>=PLAN[i][0])k=i;return k};
window.frame=function(i){const t=i/30;ctx.setTransform(3,0,0,3,0,0);ctx.clearRect(0,0,W,H);const k=planOf(t);seed=i*13+1;const lc=PLAN[k][0];const kk=cl((t-lc)/.3),zs=1+.06*(1-kk)*(1-kk),sh=(1-kk)*5;T=t;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(zs,zs);ctx.translate(-W/2+(rnd()-.5)*sh,-H/2+(rnd()-.5)*sh);PLAN[k][1](t,t-lc);ctx.restore();
  hudG(t);capS(t,520);if(window.SAFE){ctx.fillStyle='rgba(255,0,0,.3)';ctx.fillRect(0,0,W,75);ctx.fillRect(300,327,60,252);ctx.fillRect(0,579,W,61);ctx.fillRect(0,75,17,504);ctx.fillRect(343,75,17,252)}
  const f=Math.max(1-t/.2,(t-(TOT-.4))/.4);if(f>0){ctx.fillStyle=`rgba(0,0,0,${cl(f)})`;ctx.fillRect(0,0,W,H)}return i};
document.fonts.load('700 38px P').then(()=>{window.READY=1});
</script></body></html>
