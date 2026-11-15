/* ===== WOMBAT — animation à plat (titre en haut, sous-titres en bas) ===== */
const X=(w,k,d)=>{const v=wt(w,B[k]);return v!=null&&v<B[k+1]?v:B[k]+d};
const talk=t=>CAPS.some(c=>t>=c[0]&&t<c[1])?(.35+.65*Math.abs(Math.sin(t*15))):0;
const tTARE=X('TARÉ',0,2.6),tC1=X('CUBES',1,1.9),tPUT=X('PUTAIN',1,3.2),tQV=X('QUATRE',2,.4),tCENT=X('CENT',2,1.6),
 tFILS=X('FILS',3,.8),tBOUL=X('BOULES',3,2),tSAUC=X('SAUCISSES',3,3.1),tSCI=X('SCIENTIFIQUES',4,.3),tDISS=X('DISSÉQUÉ',4,1.2),
 tELA=X('ÉLASTIQUE',5,1.4),tRIG=X('RIGIDE',5,3),tSCULP=X('SCULPTE',6,.9),tCUBE6=X('CUBE',6,2.3),tTROU=X('TROU',7,.4),tROND=X('ROND',7,2),
 tROULE=X('ROULE',8,2.2),tROCH=X('ROCHERS',9,.9),tTRONC=X('TRONCS',9,1.7),tTERR=X('TERRITOIRE',9,3),tFORT=X('FORTERESSE',10,3.2),
 tQP=X('QUATRE',11,.2),tCART=X('CARTILAGE',11,2),tGRAIS=X('GRAISSE',11,3),tPEAU=X('PEAU',11,3.8),
 tDINGO=X('DINGO',12,.2),tBOUCHE=X('BOUCHE',12,3.6),tCUL=X('CUL',12,5),tMORD=X('MORDRE',13,.6),tTUE=X('TUE',13,3),
 tECR=X('ÉCRASE',14,1),tPLAF=X('PLAFOND',14,3.3),tEXP=X('EXPERTS',15,.2),tSURS=X('SÛRS',15,1.8),tCRAN=X('CRÂNES',15,3.4),tREN=X('RENARDS',15,4.2),
 tCHIE=X('CHIE',16,1.2),tBLIND=X('BLINDÉ',16,3.2),tNAT=X('NATURE',17,.2),tIMP=X("N'IMPORTE",17,1.3);
const BR='#8a7766',BRD='#6b5a4b',BRL='#aa967f',CC=['#5b4033','#7d5c47','#46302a'],GOLD=['#e9b43c','#f2cb5c','#d79a26','#f7d977'];
function F(c){ctx.fillStyle=c;ctx.fill()}
function E(x,y,rx,ry,c,rot=0){ctx.beginPath();ctx.ellipse(x,y,rx,ry,rot,0,7);F(c)}
function R(x,y,w,h,r,c){ctx.beginPath();ctx.roundRect(x,y,w,h,r);F(c)}
function hills(y,c,amp,ph){ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=12)ctx.lineTo(x,y+Math.sin(x*.018+ph)*amp+Math.sin(x*.047+ph*2)*amp*.4);ctx.lineTo(W,H);ctx.closePath();F(c)}
function gum(x,y,s,c,u){ctx.save();ctx.translate(x,y);ctx.scale(s,s);R(-5,-120,10,120,3,'#d3ccb9');for(const [dx,dy,r] of[[0,-132,34],[-26,-112,26],[28,-116,28],[6,-152,24]])E(dx+Math.sin(u*1.2+dx)*1.5,dy,r,r*.75,c);ctx.restore()}
function rock(x,y,s,c='#8f8579'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();ctx.moveTo(-50,0);ctx.quadraticCurveTo(-48,-40,-14,-46);ctx.quadraticCurveTo(30,-54,50,-10);ctx.lineTo(54,0);ctx.closePath();F(c);ctx.beginPath();ctx.moveTo(-30,-10);ctx.quadraticCurveTo(-10,-30,20,-30);ctx.lineTo(10,-8);ctx.closePath();ctx.fillStyle='rgba(255,255,255,.14)';ctx.fill();ctx.restore()}
function grass(y,c1,c2){ctx.fillStyle=c1;ctx.fillRect(0,y,W,H-y);ctx.fillStyle=c2;ctx.fillRect(0,y,W,6);for(let i=0;i<18;i++){const x=(i*47)%W;ctx.beginPath();ctx.moveTo(x,y+4);ctx.lineTo(x+4,y-10);ctx.lineTo(x+8,y+4);ctx.closePath();F(c2)}}
function cube(x,y,s,rot=0,o=1){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.globalAlpha=o;
 ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(13,-5);ctx.lineTo(0,2);ctx.lineTo(-13,-5);ctx.closePath();F(CC[1]);
 ctx.beginPath();ctx.moveTo(-13,-5);ctx.lineTo(0,2);ctx.lineTo(0,17);ctx.lineTo(-13,10);ctx.closePath();F(CC[0]);
 ctx.beginPath();ctx.moveTo(13,-5);ctx.lineTo(0,2);ctx.lineTo(0,17);ctx.lineTo(13,10);ctx.closePath();F(CC[2]);ctx.restore()}
function wombat(x,y,s,o={}){const t=o.t||0,fl=o.flip?-1:1,walk=o.walk,bob=walk?Math.abs(Math.sin(t*9))*3:Math.sin(t*3)*1.2;
 ctx.save();ctx.translate(x,y-bob);ctx.scale(s*fl,s);
 E(0,bob+2,88,9,'rgba(0,0,0,.18)');
 for(const [lx,ph] of[[-46,0],[50,Math.PI]]){const sw=walk?Math.sin(t*9+ph)*7:0;R(lx-12+sw,-30,24,32,9,BRD);E(lx+sw+2,0,16,6,'#43342d')}
 E(0,-52,86,52,BR);E(0,-38,68,30,BRL);
 E(70,-56,38,32,BR);E(52,-84,9,12,BRD);E(78,-86,9,12,BRD);E(52,-84,4.5,7,'#b79a8a');E(100,-46,18,13,'#a58f7e');E(114,-52,10,7.5,'#3a2c27');E(111,-54,3,2,'rgba(255,255,255,.5)');
 const bl=o.blink===false?1:(Math.sin(t*2.3)>.97?.15:1),er=o.eye||1;
 for(const ex of[76,94]){ctx.save();ctx.translate(ex,-66);ctx.scale(1,bl);E(0,0,8*er,9*er,'#fff');E(1.5+(o.look||0),1,4*er,4.6*er,'#14101a');E(2.5+(o.look||0),-1,1.4,1.4,'#fff');ctx.restore()}
 if(o.brow){ctx.strokeStyle='#3a2c27';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(70,-78+o.brow);ctx.lineTo(84,-76);ctx.moveTo(90,-76);ctx.lineTo(102,-78+o.brow);ctx.stroke()}
 const m=o.mouth||0;ctx.strokeStyle='#3a2c27';ctx.lineWidth=2.4;ctx.lineCap='round';
 if(m>.05){ctx.beginPath();ctx.ellipse(104,-36,7,2+6*m,0,0,7);F('#5a2230')}else{ctx.beginPath();ctx.moveTo(96,-37);ctx.quadraticCurveTo(104,o.smile?-30:-34,112,-38);ctx.stroke()}
 ctx.restore()}
function rump(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);E(0,2,92,10,'rgba(0,0,0,.18)');E(-50,-4,20,8,'#43342d');E(50,-4,20,8,'#43342d');
 E(0,-120,42,28,BR);E(-30,-142,11,14,BRD);E(30,-142,11,14,BRD);E(0,-66,84,66,BR);
 const n=o.plates||0;if(n>0){const cx=0,cy=-64;for(let q=0;q<4;q++){const k=seg(o.pt??9,(o.p0||0)+q*(o.pd||.4),(o.p0||0)+q*(o.pd||.4)+.2);if(k<=0)continue;ctx.save();ctx.translate(cx,cy);ctx.scale(70,54);ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,.97*k,q*Math.PI/2+.04,(q+1)*Math.PI/2-.04);ctx.closePath();F(GOLD[q]);ctx.restore()}
  ctx.strokeStyle='#6b5a4b';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-70,-64);ctx.lineTo(70,-64);ctx.moveTo(0,-118);ctx.lineTo(0,-10);ctx.stroke()}
 if(o.castle){for(let i=0;i<5;i++)R(-62+i*26,-148,17,16,2,'#9aa0a8');R(-62,-136,124,20,3,'#b4bac2');R(-3,-176,6,40,2,'#6b5a4b');ctx.beginPath();ctx.moveTo(3,-176);ctx.lineTo(26,-168);ctx.lineTo(3,-160);ctx.closePath();F('#e24a4a')}
 ctx.restore()}
function dingo(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s*(o.sq||1));
 E(-84,-42,66,28,'#d9a35b');for(const lx of[-120,-62])R(lx-7,-30,14,30,5,'#c18a45');E(-142,-52,22,8,'#c18a45',-.5);
 E(0,-52,32,27,'#d9a35b');E(30,-44,24,14,'#e8bd7c');E(50,-47,7,5,'#2a1a14');E(-8,-78,8,15,'#b8803f',-.3);
 if(o.dead){ctx.strokeStyle='#1a1210';ctx.lineWidth=2.5;for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(12-5,-62-5*sx);ctx.lineTo(12+5,-62+5*sx);ctx.stroke()}}else E(14,-60,4.5,4.5,'#1a1210');
 if(o.open){ctx.beginPath();ctx.moveTo(34,-38);ctx.lineTo(56,-36);ctx.lineTo(48,-26);ctx.closePath();F('#5a2230');for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(38+i*6,-37);ctx.lineTo(41+i*6,-30);ctx.lineTo(44+i*6,-37);ctx.closePath();F('#fff')}}
 ctx.restore()}
function skull(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);E(0,0,16,15,'#f2efe6');R(-8,10,16,10,3,'#f2efe6');E(-6,-1,4.2,5,'#2a2a2a');E(6,-1,4.2,5,'#2a2a2a');ctx.beginPath();ctx.moveTo(0,5);ctx.lineTo(-2.5,10);ctx.lineTo(2.5,10);ctx.closePath();F('#2a2a2a');ctx.restore()}
function star5(x,y,r,c){ctx.beginPath();for(let k=0;k<10;k++){const a=k*Math.PI/5-Math.PI/2,rr_=k%2?r*.45:r;ctx.lineTo(x+Math.cos(a)*rr_,y+Math.sin(a)*rr_)}ctx.closePath();F(c)}
function nope(x,y,r,t0,t){if(t<t0)return;const k=seg(t,t0,t0+.2);ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.strokeStyle='#ff3b3b';ctx.lineWidth=9;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.moveTo(-r*.7,-r*.7);ctx.lineTo(r*.7,r*.7);ctx.stroke();ctx.restore()}
function tagS(t,t0,x,y,txt,c='#ffd24a',tc='#14101a',rot=0,fz=15){if(t<t0)return;const k=seg(t,t0,t0+.2);ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(k,k);ctx.font='700 '+fz+'px P';const w=ctx.measureText(txt).width+26;R(-w/2,-16,w,32,16,c);ctx.fillStyle=tc;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,0,1);ctx.restore()}
function HD(t,t0,txt){const k=seg(t,t0,t0+.2);if(k<=0)return;ctx.save();ctx.font='700 25px P';ctx.textAlign='left';ctx.textBaseline='alphabetic';txt.split('\n').forEach((ln,li)=>{const ws=parse(ln),sp=ctx.measureText(' ').width,wd=w=>ctx.measureText(w).width,tot=ws.reduce((s,[w])=>s+wd(w),0)+sp*(ws.length-1);
  ctx.save();ctx.translate(170,108+li*31);ctx.scale(.7+.3*k,.7+.3*k);ctx.globalAlpha=k;let x=-tot/2;for(const [w,r] of ws){ctx.lineWidth=6;ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineJoin='round';ctx.strokeText(w,x,0);ctx.fillStyle=r?'#ffd24a':'#fff';ctx.fillText(w,x,0);x+=wd(w)+sp}ctx.restore()});ctx.restore()}
function dayBg(u,sky1='#8fd0ff',sky2='#ffeccb',gy=440,g1='#7fb85a',g2='#639a43'){bg(sky1,sky2);E(290,200,34,34,'#fff4b8');hills(380,'#a9d28a',14,0);hills(405,'#8fc06c',10,2);gum(60,gy-4,.9,'#5f9a5a',u);gum(310,gy-8,.75,'#6aa85a',u+1);grass(gy,g1,g2)}
function nightBg(u,gy=440){bg('#16224a','#34457a');ctx.fillStyle='#fff';seed=9;for(let i=0;i<30;i++){ctx.globalAlpha=.4+.5*Math.sin(u*2+i);ctx.fillRect(rnd()*W,rnd()*300,2,2)}ctx.globalAlpha=1;E(290,190,28,28,'#f2f4ff');E(280,184,28,28,'#16224a');hills(390,'#2a3a66',12,1);gum(300,gy-6,.8,'#2f5a4a',u);grass(gy,'#2e5a46','#244a38')}
function infoBg(u){bg('#162244','#22346a');dots('#fff',.06,0,H,26,3)}
function soil(){bg('#8a5f3c','#5e3f27');for(let i=0;i<34;i++)E((i*53)%W,150+(i*97)%470,9+(i%4)*4,5,'rgba(0,0,0,.11)');R(-30,318,360,134,56,'#2b1b13');ctx.fillStyle='rgba(255,255,255,.05)';ctx.fillRect(0,446,W,6)}
function particles(t,t0,x,y,n=14,c='#e8c9a0',sp=140,d=.9){const v=t-t0;if(v<0||v>d)return;ctx.save();ctx.fillStyle=c;for(let i=0;i<n;i++){const a=i/n*6.283+i,r=sp*sm(v/d);ctx.globalAlpha=1-v/d;ctx.fillRect(x+Math.cos(a)*r,y+Math.sin(a)*r*.7+v*v*80,5,5)}ctx.restore()}
/* ================= SCÈNES ================= */
function K0(t,u,d){dayBg(u);const wx=lerp(-90,165,sm(cl(u/1.3)));wombat(wx,478,1.5,{t,walk:u<1.3,mouth:talk(t),eye:1.15});HD(t,B[0]+.05,'LE [WOMBAT]\nANIMAL AUSTRALIEN');tagS(t,tTARE,262,318,'TARÉ ?!','#ff5a5a','#fff',.12,19)}
function K1(t,u,d){dayBg(u);wombat(172,478,1.4,{t,mouth:talk(t),brow:2});HD(t,B[1]+.05,'IL FAIT CACA\nEN [CUBES]');
  for(const [tt,x,s] of[[tC1,48,1.7],[tC1+.5,22,1.5],[tPUT,70,1.8]]){const v=t-tt;if(v>=0){const y=lerp(380,470-Math.max(0,Math.sin(Math.min(v,.6)/.6*3.14))*50,sm(cl(v/.35)));cube(x,y,s,v<.5?v*5:0)}}
  if(t>=tPUT)big('PLOP !',60,330,30,'#ffd24a',-.1,1-(t-tPUT)/.9)}
function K2(t,u,d){nightBg(u);const n=Math.floor(cl((t-tQV)/(d-.5))*34);for(let i=0;i<n;i++){const row=Math.floor(i/9),col=i%9,x=34+col*36+(row%2)*14,y=470-row*17+(((i*7)%5)-2);const a=seg(t,tQV+i*(d-.5)/34,tQV+i*(d-.5)/34+.12);cube(x,y-14*(1-a),1.25,0,a)}
  HD(t,B[2]+.05,'[80 À 100] CUBES\nCHAQUE NUIT');tagS(t,tCENT-.4,180,300,'× 100 / NUIT','#ffd24a','#14101a',-.05,26)}
function K3(t,u,d){bg('#ffd9a0','#ffb870');rays(180,320,'#fff',16,u,.15);
  for(let i=0;i<9;i++){const ph=(u*.9+i*.37)%1.5,x=36+i*36,y=150+ph*330;cube(x,y,1.5,ph*4+i,1)}
  if(t>=tFILS)big('DES CUBES !',180,330,38,'#fff',-.04,1);
  if(t>=tBOUL&&t<tSAUC+1.2){ctx.save();ctx.globalAlpha=t<tSAUC?1:.0;ctx.restore();E(90,430,44,44,CC[1]);nope(90,430,52,tBOUL+.15,t)}
  if(t>=tSAUC){R(150,412,130,36,18,CC[1]);nope(215,430,52,tSAUC+.15,t)}
  HD(t,B[3]+.05,'DES [CUBES] !\nPAS DES BOULES')}
function K4(t,u,d){infoBg(u);const k=seg(t,B[4]+.1,B[4]+.5);ctx.save();ctx.translate(170,330+Math.sin(u*2)*4);ctx.scale(k,k);ctx.beginPath();ctx.arc(0,0,86,0,7);F('rgba(180,220,255,.18)');ctx.strokeStyle='#e8f2ff';ctx.lineWidth=12;ctx.stroke();ctx.save();ctx.rotate(.78);R(84,-9,92,18,9,'#e8f2ff');ctx.restore();cube(0,0,4.2,u*.4);ctx.restore();
  HD(t,B[4]+.05,'LES [SCIENTIFIQUES]\nENQUÊTENT');tagS(t,tDISS,170,468,'ÉTUDE SCIENTIFIQUE','#4aa8e8','#fff',0,17)}
function K5(t,u,d){infoBg(u);const pts=[];for(let i=0;i<=40;i++){const q=i/40;pts.push([14+q*332,330+Math.sin(q*9+u*1.2)*26])}
  const col=i=>(Math.floor(i/6)%2?'#7aa2ff':'#ff9aa8');ctx.lineCap='round';ctx.lineJoin='round';for(let i=0;i<40;i++){ctx.strokeStyle=col(i);ctx.lineWidth=40;ctx.beginPath();ctx.moveTo(...pts[i]);ctx.lineTo(...pts[i+1]);ctx.stroke()}
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=8;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]-8):ctx.moveTo(p[0],p[1]-8));ctx.stroke();
  for(let i=0;i<6;i++){const q=((u*.25+i/6)%1);const p=pts[Math.floor(q*40)];E(p[0],p[1],8,8,'#6b4a36')}
  HD(t,B[5]+.05,'INTESTIN :\n[ÉLASTIQUE] ET [RIGIDE]');tagS(t,tELA,90,416,'ÉLASTIQUE','#ff9aa8','#14101a',-.05,18);tagS(t,tRIG,262,250,'RIGIDE','#7aa2ff','#14101a',.05,18)}
function K6(t,u,d){infoBg(u);const sq=seg(t,tSCULP,tCUBE6);R(30,290,230,90,45,'#7aa2ff');R(40,300,210,70,35,'#6b4a36');
  const r=lerp(34,4,sq),w=lerp(60,64,sq),h=lerp(60,64,sq);R(250-w/2+30,330-h/2,w,h,r,'#7d5c47');
  for(let i=0;i<4;i++){const a=(u*3+i/4)%1;ctx.strokeStyle='#ffd24a';ctx.lineWidth=5;ctx.lineCap='round';const x=200+i*18;ctx.beginPath();ctx.moveTo(x,262+a*20);ctx.lineTo(x,282+a*20);ctx.moveTo(x,398-a*20);ctx.lineTo(x,378-a*20);ctx.stroke()}
  if(t>=tCUBE6)cube(300,330,2.4,0);HD(t,B[6]+.05,'ÇA [SCULPTE]\nLE CUBE');tagS(t,tSCULP,150,450,'PETIT À PETIT','#ffd24a','#14101a',-.04,17)}
function K7(t,u,d){infoBg(u);ctx.beginPath();ctx.arc(190,330,64,0,7);ctx.lineWidth=18;ctx.strokeStyle='#ff9aa8';ctx.stroke();E(190,330,50,50,'#2b1b13');
  const x=lerp(40,310,sm(cl(u/(d-.3))));cube(x,330+Math.sin(u*4)*4,2.2,Math.sin(u*3)*.1);
  if(t>=tROND)tagS(t,tROND,190,430,'TROU = ROND','#3ddc84','#14101a',-.03,20);if(t>=tTROU)tagS(t,tTROU,300,256,'??','#ff5a5a','#fff',.1,22);HD(t,B[7]+.05,'LE TROU\nRESTE [ROND]')}
function K8(t,u,d){bg('#ffe9b8','#ffc978');ctx.fillStyle='rgba(0,0,0,.07)';ctx.fillRect(0,330,W,3);
  ctx.beginPath();ctx.moveTo(0,250);ctx.lineTo(360,330);ctx.lineTo(360,330);ctx.lineTo(0,330);ctx.closePath();F('#a99a86');
  const q=(u*.45)%1,bx=lerp(20,340,q),by=lerp(222,310,q);ctx.save();ctx.translate(bx,by);ctx.rotate(q*14);E(0,0,22,22,CC[1]);ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(-2,-20,4,16);ctx.restore();
  R(0,330,W,310,0,'#d9b37a');ctx.fillStyle='#b8925a';ctx.fillRect(0,330,W,6);rock(180,500,2.1);cube(180,430+Math.sin(u*5)*(t<tROULE?0:1),3.2,0);
  tagS(t,tROULE,70,380,'ROULE','#ff5a5a','#fff',-.08,22);tagS(t,tROULE+.4,290,396,'RESTE LÀ','#3ddc84','#14101a',.06,22);HD(t,B[8]+.05,'UN CUBE\n[NE ROULE PAS]')}
function K9(t,u,d){dayBg(u,'#ffb27a','#ffe3b0',440,'#7a9a4a','#5f7f38');rock(80,440,1.4);ctx.save();ctx.translate(268,440);R(-60,-34,120,34,17,'#7b5a3a');E(-60,-17,9,17,'#6a4a2e');ctx.restore();
  for(let i=0;i<4;i++){if(t>=tROCH+i*.18)cube(54+i%2*22+(i>1?10:0),380-Math.floor(i/2)*22,1.3,0)}for(let i=0;i<4;i++){if(t>=tTRONC+i*.18)cube(236+i*20,396,1.3,0)}
  wombat(180,520,1.15,{t,mouth:talk(t),flip:true});tagS(t,tTERR,180,290,'MON TERRITOIRE','#ffd24a','#14101a',-.04,22);HD(t,B[9]+.05,'IL MARQUE\nSON [TERRITOIRE]')}
function K10(t,u,d){dayBg(u,'#9bd6ff','#fff0cf');const k=seg(t,B[10]+.2,tFORT);rump(180,520,1.5,{t,castle:t>=tFORT-.3});if(t>=tFORT)big('FORTERESSE',180,300,34,'#fff',-.05,1);
  if(t<tFORT-.3)big('?',250,330,60,'#ffd24a',.1,1);HD(t,B[10]+.05,'SON [DERRIÈRE]\nEST BLINDÉ')}
function K11(t,u,d){bg('#eaf3ff','#c8dcff');dots('#fff',.4,0,H,24,3);rump(170,520,1.55,{plates:4,pt:t,p0:tQP,pd:.35});
  [['1',90,330],['2',250,330],['3',90,420],['4',250,420]].forEach(([n,x,y],i)=>{if(t>=tQP+i*.35+.25){const k=seg(t,tQP+i*.35+.25,tQP+i*.35+.45);ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.beginPath();ctx.arc(0,0,17,0,7);F('#14101a');ctx.fillStyle='#fff';ctx.font='700 20px P';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(n,0,1);ctx.restore()}});
  tagS(t,tCART,284,196,'CARTILAGE','#ff9aa8','#14101a',.05,15);tagS(t,tGRAIS,284,228,'GRAISSE','#ffd24a','#14101a',-.04,15);tagS(t,tPEAU,284,260,'PEAU','#3ddc84','#14101a',.04,15);HD(t,B[11]+.05,'[4 PLAQUES] D\'OS\nSOUDÉES')}
function burrowBase(){soil();ctx.fillStyle='#4a3020';ctx.fillRect(0,448,W,4)}
function K12(t,u,d){burrowBase();let wx=u<1.3?lerp(-60,200,sm(u/1.3)):200;if(t>=tBOUCHE-.4)wx=lerp(200,126,sm(cl((t-tBOUCHE+.4)/.5)));
  let dx=t<tBOUCHE?lerp(-210,-40,sm(cl(u/1.7))):lerp(-40,-6,sm(cl((t-tBOUCHE)/.25)));if(t>=tDINGO)dingo(dx,447,.95,{open:t<tBOUCHE});
  wombat(wx,447,.95,{t,walk:u<1.3||(t>=tBOUCHE-.4&&t<tBOUCHE+.1),mouth:u<2?0:talk(t),eye:1.15,brow:t>=tBOUCHE?2:0});
  if(t>=tCUL)big('PLOP !',60,300,34,'#ffd24a',-.1,1-(t-tCUL)/1);HD(t,B[12]+.05,'TERRIER = [BOUCHÉ]\nPAR SON CUL')}
function K13(t,u,d){burrowBase();const bite=Math.max(0,Math.sin(u*9));wombat(126,447,.95,{t,mouth:0,smile:true,eye:.85,blink:false});dingo(-6+bite*7,447,.95,{open:true});
  for(let i=0;i<5;i++){const tt=tMORD+i*.7;if(t>=tt&&t<tt+.45)big(['CHOMP','CROC','GRR','MIAM','CHOMP'][i],70+(i%2)*30,372-(i%3)*14,22,'#fff',(i%2?.15:-.15),1-(t-tt)/.45)}
  if(t>=tTUE)tagS(t,tTUE,236,270,'PAS DU TOUT','#3ddc84','#14101a',.05,19);HD(t,B[13]+.05,'MORSURE = [RIEN]\nIL S\'EN FOUT')}
function K14(t,u,d){burrowBase();const hit=t>=tECR+.25;const a=t<tECR?0:t<tECR+.25?.5*sm((t-tECR)/.25):.5-(hit?Math.min(.06,(t-tECR-.25)*.2):0);
  const px=126+50*.95,py=447;ctx.save();ctx.translate(px,py);ctx.rotate(a);ctx.translate(-px,-py);wombat(126,447,.95,{t,mouth:0,smile:true,eye:.85,blink:false});ctx.restore();
  dingo(-6,447,.95,{open:t<tECR+.25,dead:hit,sq:hit?.7:1});if(hit){for(let i=0;i<3;i++)star5(10+i*18+Math.sin(u*10+i)*4,370-Math.abs(Math.sin(u*6+i))*10,7,'#ffd24a')}
  particles(t,tECR+.25,60,322,16,'#c9a47a',110,.8);if(t>=tECR+.25)big('CRAC !',120,290,40,'#ffd24a',-.08,Math.min(1,1.6-(t-tECR-.25)));HD(t,B[14]+.05,'ÉCRASER\nUN [CRÂNE] ?')}
function K15(t,u,d){dayBg(u,'#c9a4ff','#ffd9b8',440,'#8a9a52','#6f7f3c');E(220,440,64,30,'#3a2518');E(220,436,52,22,'#241409');rock(60,442,1.1);
  [[tCRAN,120,468],[tREN,160,500],[tREN+.7,70,500],[tCRAN+1.3,260,486]].forEach(([tt,x,y],i)=>{if(t>=tt){const k=seg(t,tt,tt+.2);ctx.save();ctx.translate(x,y);ctx.scale(k,k);skull(0,0,1.3);ctx.restore()}});
  if(t>=tEXP)big('?',66,330,70,'#fff',-.1,1);tagS(t,tSURS,260,330,'PAS SÛR','#ffd24a','#14101a',.08,22);HD(t,B[15]+.05,'LES [EXPERTS]\nDOUTENT')}
function K16(t,u,d){dayBg(u,'#9bd6ff','#fff0cf');wombat(170,478,1.4,{t,mouth:talk(t),smile:false});if(t>=tCHIE){const v=t-tCHIE;cube(60,300+Math.sin(v*4)*8,2.6,v*1.5)}
  if(t>=tBLIND){const k=seg(t,tBLIND,tBLIND+.25);ctx.save();ctx.translate(285,320);ctx.scale(k,k);ctx.beginPath();ctx.moveTo(-28,-34);ctx.lineTo(28,-34);ctx.lineTo(28,2);ctx.quadraticCurveTo(28,30,0,42);ctx.quadraticCurveTo(-28,30,-28,2);ctx.closePath();F('#e9b43c');ctx.lineWidth=4;ctx.strokeStyle='#8a5f1a';ctx.stroke();ctx.restore()}
  HD(t,B[16]+.05,'CHIE DES [CUBES]\nCUL [BLINDÉ]')}
function K17(t,u,d){bg('#8a3af0','#3a1a8a');rays(180,330,'#fff',18,u,.12);const sh=t>=tNAT+.6?Math.sin(u*6)*.04:0;ctx.save();ctx.translate(170,500);ctx.rotate(sh);wombat(0,0,1.4,{t,mouth:talk(t),eye:1.25,brow:-3});ctx.restore();
  big('N\'IMPORTE QUOI',180,310,31,'#ffd24a',-.05,seg(t,tIMP,tIMP+.2));HD(t,B[17]+.05,'LA NATURE\nEST [TARÉE]')}
const KS=[K0,K1,K2,K3,K4,K5,K6,K7,K8,K9,K10,K11,K12,K13,K14,K15,K16,K17];
function soft(){const v=ctx.createRadialGradient(W/2,H*.5,H*.3,W/2,H*.5,H*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.28)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)}
window.frame=function(i){const t=i/30;ctx.setTransform(3,0,0,3,0,0);ctx.clearRect(0,0,W,H);const k=sceneOf(t);seed=i*13+1;let lc=0;for(const c of CUTS)if(c<=t)lc=c;const kk=cl((t-lc)/.25),zs=1+.045*(1-kk)*(1-kk);T=t;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(zs,zs);ctx.translate(-W/2,-H/2);KS[k](t,t-B[k],DUR(k));ctx.restore();
  soft();capS(t,520);if(window.SAFE){ctx.fillStyle='rgba(255,0,0,.3)';ctx.fillRect(0,0,W,75);ctx.fillRect(300,327,60,252);ctx.fillRect(0,579,W,61);ctx.fillRect(0,75,17,504);ctx.fillRect(343,75,17,252)}
  const f=Math.max(1-t/.2,(t-(TOT-.4))/.4);if(f>0){ctx.fillStyle=`rgba(0,0,0,${cl(f)})`;ctx.fillRect(0,0,W,H)}return i};
document.fonts.load('700 38px P').then(()=>{window.READY=1});
</script></body></html>
