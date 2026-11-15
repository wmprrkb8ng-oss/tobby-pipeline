/* ---- instants-clés (mots de la vraie voix) ---- */
const tROY=WT('ROY',0,DUR(0)*.8),
 tGARDE=WT('GARDE',1,B[1]+.5),tVIRG=WT('VIRGINIE',1,B[1]+1.8),tTOUR=WT('TOUR',1,B[1]+3.6),tFOUDRE=WT('FOUDRE',1,B[1]+5),tFEU=WT('FEU',1,B[1]+6.3),
 tECL=WT('ÉCLAIR',2,B[2]+2.3),tONGLE=WT("L'ONGLE",2,B[2]+4),
 tFRAP=WT('FRAPPE',3,B[3]+3),tSOURC=WT('SOURCILS',3,B[3]+4.8),
 tJARD=WT('JARDIN',4,B[4]+2.2),tDOUZE=WT('DOUZE',4,B[4]+3.8),tCHEV=WT('CHEVEUX',4,B[4]+4.2),
 tBRUL=WT('BRÛLENT',5,B[5]+1.2),tALORS=WT('ALORS',5,B[5]+2.4),
 tNUAGE=WT('NUAGE',6,B[6]+1.6),tALL=WT("S'ALLONGE",6,B[6]+3.4),
 tCHEVI=WT('CHEVILLE',7,B[7]+2.6),tPECHE=WT('PÊCHE',7,B[7]+4.6),tSEPTI=WT('SEPTIÈME',7,B[7]+6.2),
 tSURV=WT('SURVÉCU',8,B[8]+.8),tREC=WT('RECORDS',8,B[8]+3.2),tTOI=WT('TOI',9,B[9]+.3);
const ST=[tECL,tFRAP,tJARD,tCHEV,tBRUL,tCHEVI,tSEPTI];
/* ---- HUD : compteur d'éclairs (sous la barre TikTok) ---- */
function icoB(x,y,s,on,k=0){ctx.save();ctx.translate(x,y);ctx.scale(s*(1+.5*k),s*(1+.5*k));ctx.beginPath();ctx.moveTo(2,-10);ctx.lineTo(-6,1);ctx.lineTo(-1,1);ctx.lineTo(-4,10);ctx.lineTo(6,-2);ctx.lineTo(1,-2);ctx.lineTo(4,-10);ctx.closePath();fs(on?YEL:'#2c3160',true,2);ctx.restore()}
function hudR(t){const n=ST.filter(x=>t>=x).length;ctx.save();ctx.textBaseline='middle';ctx.textAlign='left';
  rr(30,84,294,42,12);fs('rgba(12,16,40,.9)',true,3);ctx.strokeStyle=n>=7?YEL:BLU;ctx.lineWidth=3;ctx.stroke();ctx.font='700 8px P';ctx.fillStyle='#cfe8ff';ctx.fillText('FOUDROYÉ',40,96);
  for(let i=0;i<7;i++){const k=i<n?pk(t,ST[i],.35):0;icoB(52+i*25,114,.85,i<n,k)}
  ctx.font='700 21px P';ctx.textAlign='right';ctx.fillStyle=n>=7?YEL:'#fff';ctx.fillText(n+' / 7',314,108);ctx.restore()}
/* ================= SCÈNES ================= */
function K0(t,u,d){stormSky(u);ground(440,'#1f4a3a','#173a2c');const sc=pk(u%1.5,0,.25)>0;
  if(sc)bolt(290,200,278,440,1,8,Math.floor(u*30)%2?1:.7);
  rgr(210,332,1.7,{open:true,ar:.9});
  pill(180,150,278,'FOUDROYÉ 7 FOIS ?!',RED,'#fff',17,38);
  pop(t,tROY,k=>{ctx.translate(180,198);ctx.scale(k,k);pill(0,0,190,'ROY SULLIVAN',YEL,INK,16,32)});
  ctx.save();ctx.translate(74,330);ctx.rotate(-.14);pill(0,0,112,'HISTOIRE VRAIE','#fff',INK,10,24);ctx.restore()}
function K1(t,u,d){bg('#2a2f5a','#9a7ab0');mnts('#3a3f78','#2c2f5c');ground(446,'#244a3a','#1b3a2c');
  const fire=cl((t-tFEU)/1.2),hit=t>=tFOUDRE;tower(262,446,1.05,t,fire);pine(60,446,.9);pine(110,450,.7);
  const wx=t<tTOUR?lerp(30,190,cl(u/(tTOUR-B[1]))):190;rgr(wx,380,1.15,{step:t<tTOUR,ar:.15});
  if(hit&&t<tFOUDRE+3)rain(u,.35);else if(t>=tTOUR)rain(u,.25);
  const lab=t<tVIRG?'GARDE FORESTIER':t<tTOUR?'VIRGINIE • 1942':'TOUR DE GUET',cc=t<tVIRG?GRN:t<tTOUR?'#fff':ORG,tc=t<tVIRG?'#fff':t<tTOUR?INK:'#fff';pill(180,150,t<tVIRG?236:t<tTOUR?236:200,lab,cc,tc,14,32);
  strike(t,tFOUDRE,236,170,262,236,1,8);if(hit&&t<tFOUDRE+.8)big('BOUM !',130,300,40,YEL,-.1,1-(t-tFOUDRE)/.8)}
function K2(t,u,d){bg('#1c2048','#6a4a7a');mnts('#2a2f5c','#20244a');ground(446,'#1e3e30','#163026');tower(300,446,.8,t,1);rain(u,.4);
  const hit=t>=tECL,v=t-tECL,x=hit?200:lerp(30,200,sm(cl((t-B[2])/(tECL-B[2]))));
  if(!hit)rgr(x,372,1.5,{step:true,ar:.7,open:true});else{rgr(x,372-Math.max(0,Math.sin(v*5))*18*(v<.6),1.5,{ar:.95,open:true,spread:v<.5?18:0})}
  pill(180,150,hit?210:176,hit?'1ER ÉCLAIR !':'IL COURT !',hit?RED:ORG,'#fff',15,32);
  pop(t,tONGLE,k=>card(84,300,.7+.3*k,()=>{ctx.beginPath();ctx.ellipse(0,-6,22,26,0,0,7);fs('#f2b98a',true,3.5);rr(-9,-26,18,14,5);fs('#fff',true,2.5)},'ONGLE PERDU'));
  strike(t,tECL,214,170,204,430,2,8);if(hit&&v<.9)big('AÏE !',264,260,42,YEL,.1,1-v/.9)}
function K3(t,u,d){bg('#34386a','#c98a7a');ground(440,'#3a4a3a','#2a3a2c');ctx.fillStyle='#5a5f75';ctx.fillRect(0,440,W,200);ctx.fillStyle='#e8e8ef';for(let x=-((u*160)%70);x<W;x+=70)ctx.fillRect(x,520,34,5);
  pine(40,440,1.3);pine(320,440,1.3);pine(90,440,.9);pine(280,440,.9);
  const hit=t>=tFRAP;carR(170,470,1.55,{bob:true,open:hit&&t<tSOURC+.5,fire:false});
  if(!hit)pill(180,150,236,'27 ANS PLUS TARD','#fff',INK,14,32);else pill(180,150,t<tSOURC?236:260,t<tSOURC?'1969 • AU VOLANT':'PLUS DE SOURCILS !',t<tSOURC?ORG:RED,'#fff',14,32);
  strike(t,tFRAP,60,170,40,370,3,7);strike(t,tFRAP+.15,300,170,320,370,4,7);if(hit&&t-tFRAP<.8)big('ZAP !',180,300,44,YEL,-.06,1-(t-tFRAP)/.8)}
function K4(t,u,d){if(t<tDOUZE){yardS();rain(u,.3);const hit=t>=tJARD,v=t-tJARD;rgr(230,376,1.6,{ar:hit?.95:.1,open:hit,spread:hit&&v<.5?14:0});pill(180,150,236,hit?'1970 • DANS SON JARDIN':'UN AN APRÈS…',hit?RED:'#fff',hit?INK:INK,13,32);strike(t,tJARD,250,170,236,360,5,8);if(hit&&v<.8)big('ZAP !',130,300,42,YEL,-.08,1-v/.8)}
  else{bg('#2b2f4a','#3a3f60');rr(190,190,130,150,8);fs('#16193a',true,5);rain(u*1.3,.3);ctx.save();ctx.beginPath();ctx.rect(194,194,122,142);ctx.clip();rain(u*1.4,.5);dcloud(250,220,1,'#2a2f55');ctx.restore();ctx.strokeStyle=INK;ctx.lineWidth=4;ctx.strokeRect(190,190,130,150);
    rr(0,420,W,220);fs('#6a4a2a',true,4);rr(40,372,150,18,4);fs('#8a5a3a',true,3.5);rr(52,390,10,50,2);fs('#6a4a2a',true,3);rr(168,390,10,50,2);fs('#6a4a2a',true,3);
    const f=t>=tCHEV;rgr(116,324,1.35,{open:f,ar:f?.9:.2,nohat:f});if(f)hairFire(116,324,1.35,t,cl((t-tCHEV)/.4));
    pill(180,150,236,f?'1972 • EN PLEIN BUREAU':'1972 • AU BUREAU',f?RED:ORG,'#fff',13,32);strike(t,tCHEV-.15,250,170,206,300,6,8);if(f&&t-tCHEV<.9)big('AU FEU !',150,236,36,YEL,-.05,1-(t-tCHEV)/.9)}}
function K5(t,u,d){bg('#34386a','#c98a7a');ground(440,'#3a4a3a','#2a3a2c');ctx.fillStyle='#5a5f75';ctx.fillRect(0,440,W,200);ctx.fillStyle='#e8e8ef';for(let x=-((u*160)%70);x<W;x+=70)ctx.fillRect(x,520,34,5);pine(40,440,1.3);pine(320,440,1.3);
  if(t<tALORS){const hit=t>=tBRUL;carR(170,470,1.55,{bob:true,open:true,fire:hit});pill(180,150,hit?250:220,hit?'1973 • ENCORE !':'L'+"'ANNÉE D'APRÈS",hit?RED:'#fff',hit?'#fff':INK,14,32);strike(t,tBRUL,210,170,190,340,7,7);if(hit&&t-tBRUL<.8)big('ZAP !',90,290,40,YEL,-.08,1-(t-tBRUL)/.8)}
  else{const k=seg(t,tALORS,tALORS+.3);bg('#ffe9b8','#ffc978');dots('#fff',.25,0,H,26,4);rays(180,310,'#fff',16,u,.1);ctx.save();ctx.translate(236,360);ctx.scale(k,k);jerry(0,0,1.45);ctx.restore();rgr(104,372,1.55,{ar:.7,open:Math.sin(u*8)>0});pill(180,150,220,"BIDON D'EAU",BLU,'#fff',16,34)}}
function K6(t,u,d){bg('#2a2f5a','#9a7ab0');mnts('#3a3f78','#2c2f5c');ground(446,'#2a4a3a','#1f3a2c');ctx.fillStyle='#5a5f75';ctx.fillRect(0,446,W,200);ctx.fillStyle='#e8e8ef';for(let x=-((u*140)%70);t<tALL&&x<W;x+=70)ctx.fillRect(x,524,34,5);
  const lie=t>=tALL;const cx=lie?190:lerp(110,240,sm(cl(u/DUR(6))));carR(lie?190:cx,478,1.5,{bob:!lie,lie,open:!lie});
  const cxx=lie?190:cx-22+Math.sin(u*2)*10;dcloud(cxx,230,1.5,'#26294f');dcloud(cxx+30,246,1,'#3b4070');rain(u,.4);if(t>=tNUAGE||lie){if(Math.floor(u*5)%3===0)bolt(cxx,252,cxx+(lie?0:8),360,8,5,.9)}
  pill(180,150,lie?236:252,lie?"IL S'ALLONGE":'UN NUAGE LE SUIT ?!',lie?GRN:RED,'#fff',14,32)}
function K7(t,u,d){if(t<tPECHE){bg('#3a4670','#c98a7a');ground(440,'#3a4a3a','#2a3a2c');ctx.fillStyle='#8a7a5a';ctx.beginPath();ctx.moveTo(130,440);ctx.lineTo(230,440);ctx.lineTo(330,640);ctx.lineTo(10,640);ctx.closePath();ctx.fill();pine(40,440,1.4);pine(320,440,1.4);pine(90,430,.9);pine(280,430,.9);
    const hit=t>=tCHEVI,v=t-tCHEVI;rgr(hit?190:lerp(60,190,sm(cl((t-B[7])/(tCHEVI-B[7])))),372,1.5,{step:!hit,ar:hit?.9:.2,open:hit});
    pill(180,150,hit?236:210,hit?'1976 • LA CHEVILLE':'1976',hit?RED:'#fff',hit?'#fff':INK,14,32);strike(t,tCHEVI,160,170,196,440,9,7);if(hit&&v<.8)big('AÏE !',280,300,40,YEL,.08,1-v/.8)}
  else{bg('#6ab0f0','#cfe8ff');cloud(70,210,.9);dcloud(270,200,1.1,'#4a5080');ground(430,'#6ab0f0','#4a90d0');ctx.fillStyle='#4a90d0';ctx.fillRect(0,430,W,210);ctx.fillStyle='rgba(255,255,255,.25)';for(let i=0;i<6;i++)ctx.fillRect(20+((i*61+u*20)%300),450+i*22,40,3);rr(20,418,200,14,3);fs('#8a5a3a',true,3.5);
    rgr(110,356,1.45,{ar:.5});ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(130,330);ctx.quadraticCurveTo(210,280,250,360);ctx.stroke();
    const hit=t>=tSEPTI;pill(180,150,hit?250:236,hit?'1977 • LA 7e FOIS !':'1977 • À LA PÊCHE',hit?YEL:GRN,hit?INK:'#fff',14,32);strike(t,tSEPTI,250,170,118,320,10,8);if(hit&&t-tSEPTI<.9)big('7 !',270,300,54,RED,.08,1-(t-tSEPTI)/.9)}}
function K8(t,u,d){bg('#ffe9b8','#ffc978');dots('#fff',.25,0,H,26,4);rays(180,300,'#fff',20,u,.12);const k=t<tREC?0:seg(t,tREC,tREC+.3);
  pill(180,150,t<tREC?210:244,t<tREC?'IL A SURVÉCU !':'LIVRE DES RECORDS',t<tREC?GRN:ORG,'#fff',16,34);
  ctx.save();ctx.translate(222,320);ctx.scale(.4+.6*k,.4+.6*k);rr(-80,-100,160,200,10);fs('#c0262a',true,5);rr(-66,-86,132,172,6);fs('#fff3cf',true,3.5);ctx.fillStyle=INK;ctx.font='700 13px P';ctx.textAlign='center';ctx.fillText('RECORD',0,-58);ctx.font='700 64px P';ctx.fillStyle=RED;ctx.fillText('7',0,10);ctx.fillStyle=INK;ctx.font='700 12px P';ctx.fillText('FOUDROIEMENTS',0,40);for(let i=0;i<7;i++)icoB(-54+i*18,68,.75,true);ctx.restore();
  rgr(90,376,1.5,{ar:.95,open:true});for(let i=0;i<8;i++){const q=(u*.5+i/8)%1;ctx.fillStyle=[RED,YEL,BLU,GRN][i%4];ctx.fillRect(30+(i*41)%300,200+q*240,6,6)}}
function K9(t,u,d){bg('#7a3af0','#2a0f6a');rays(180,300,'#fff',20,u,.1);const f=Math.floor(u*2.2)%2===0;if(f)bolt(290,190,262,360,11,6,.8);const k=seg(u,0,.35);face(t,{cx:186,cy:336,s:.5+.1*seg(u,0,.5),eye:1.2,look:[0,0],mouth:'open',brow:8});
  ctx.save();ctx.translate(186,246);ctx.scale(.5*k,.5*k);ctx.restore();big('ET TOI ?',180,206,48,YEL,-.04)}
const KS=[K0,K1,K2,K3,K4,K5,K6,K7,K8,K9];
window.frame=function(i){const t=i/30;ctx.setTransform(3,0,0,3,0,0);ctx.clearRect(0,0,W,H);const k=sceneOf(t);seed=i*13+1;let lc=0;for(const c of CUTS)if(c<=t)lc=c;const kk=cl((t-lc)/.3),zs=1+.06*(1-kk)*(1-kk),sh=(1-kk)*5;T=t;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(zs,zs);ctx.translate(-W/2+(rnd()-.5)*sh,-H/2+(rnd()-.5)*sh);KS[k](t,t-B[k],DUR(k));ctx.restore();
  grade(t,false);hudR(t);capS(t,520);if(window.SAFE){ctx.fillStyle='rgba(255,0,0,.3)';ctx.fillRect(0,0,W,75);ctx.fillRect(300,327,60,252);ctx.fillRect(0,579,W,61);ctx.fillRect(0,75,17,504);ctx.fillRect(343,75,17,252)}
  const f=Math.max(1-t/.2,(t-(TOT-.4))/.4);if(f>0){ctx.fillStyle=`rgba(0,0,0,${cl(f)})`;ctx.fillRect(0,0,W,H)}return i};
document.fonts.load('700 38px P').then(()=>{window.READY=1});
</script></body></html>
