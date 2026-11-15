const ORG='#ff8a1e',GRN='#3ddc84',RED='#ff3b3b',YEL='#ffd24a',BLU='#4aa8e8';
const N=B.length-1,TOT=B[N];let CUTS=[];for(let k=0;k<N;k++)CUTS.push(B[k],B[k]+(B[k+1]-B[k])*.5);
const sceneOf=t=>{for(let k=N-1;k>=0;k--)if(t>=B[k])return k;return 0};
const DUR=k=>B[k+1]-B[k],WT=(w,k,def)=>wt(w,B[k])??def;
const mixc=(a,b,k)=>{const p=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));const A=p(a),C=p(b);return '#'+A.map((v,i)=>Math.round(v+(C[i]-v)*cl(k)).toString(16).padStart(2,'0')).join('')};
const pk=(t,t0,d=.45)=>t<t0||t>t0+d?0:1-(t-t0)/d;
function pill(x,y,w,txt,c='#fff',tc=INK,fz=15,h=34){rr(x-w/2,y-h/2,w,h,h/2);fs(c,true,3.5);ctx.fillStyle=tc;ctx.font='700 '+fz+'px P';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,x,y+1);ctx.textBaseline='alphabetic'}
function big(txt,x,y,sz,c=YEL,rot=0,a=1){ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.translate(x,y);ctx.rotate(rot);ctx.font='700 '+sz+'px P';ctx.textAlign='center';ctx.lineWidth=sz*.22;ctx.strokeStyle=INK;ctx.lineJoin='round';ctx.strokeText(txt,0,0);ctx.fillStyle=c;ctx.fillText(txt,0,0);ctx.restore()}
function pop(t,t0,fn,d=.25){if(t<t0)return;const k=seg(t,t0,t0+d);ctx.save();fn(k);ctx.restore()}
/* ---- sous-titres mot par mot ---- */
function capS(t,y0){let cur=null;for(let i=0;i<CAPS.length;i++){const c=CAPS[i],nx=CAPS[i+1],end=Math.min(c[1]+.25,nx?nx[0]:99);if(t>=c[0]&&t<end){cur=c;break}}if(!cur)return;const ws=parse(cur[2]);ctx.save();ctx.font='700 32px P';const sp=ctx.measureText(' ').width+5,wd=w=>ctx.measureText(w).width,CX=166;
  let lines=[[]],cw=0;for(const it of ws){const w=wd(it[0]);if(cw+w>250&&lines[lines.length-1].length&&/[A-Za-zÀ-ÿ0-9]/.test(it[0])){lines.push([]);cw=0}lines[lines.length-1].push(it);cw+=w+sp}
  let idx=0,ptw=cur[0];const by=y0-(lines.length-1)*40;lines.forEach((ln,li)=>{const tot=ln.reduce((s,[w])=>s+wd(w),0)+sp*(ln.length-1);let x=CX-tot/2;const y=by+li*40;
    for(const [w,r] of ln){let tw=ptw;if(/[A-Za-zÀ-ÿ]/.test(w)){tw=cur[3][idx]??cur[0];idx++;ptw=tw}const w_=wd(w);
      if(t>=tw){const k=cl((t-tw)/.12),s=1+.28*(1-k)*(1-k);ctx.save();ctx.translate(x+w_/2,y-11);ctx.scale(s,s);ctx.lineWidth=8;ctx.strokeStyle='#000';ctx.lineJoin='round';ctx.textAlign='center';ctx.strokeText(w,0,11);ctx.fillStyle=r?'#ff3b3b':'#fff';ctx.fillText(w,0,11);ctx.restore()}x+=w_+sp}});ctx.restore()}
window.capCheck=()=>{ctx.save();ctx.font='700 32px P';const sp=ctx.measureText(' ').width+5,o=[];for(const c of CAPS){let n=1,cw=0,mx=0,any=false;for(const [w] of parse(c[2])){const wd=ctx.measureText(w).width;if(cw+wd>250&&any&&/[A-Za-zÀ-ÿ0-9]/.test(w)){n++;cw=0}any=true;cw+=wd+sp;mx=Math.max(mx,cw-sp)}if(n>2||mx>262)o.push([c[2],n,Math.round(mx)])}ctx.restore();return o};
/* ---- éléments de décor et effets ---- */
function hat(x,y,s,fl=1){ctx.save();ctx.translate(x,y);ctx.scale(s*fl,s);ctx.beginPath();ctx.ellipse(0,-40,32,7,0,0,7);fs('#a98650',true,3);rr(-16,-64,32,26,9);fs('#b8975a',true,3);ctx.fillStyle='#4f7a3a';ctx.fillRect(-15,-48,30,6);ctx.restore()}
function rgr(x,y,s,o={}){mini(x,y,s,o);if(!o.nohat)hat(x,y,s,o.flip||1)}
function flame(x,y,sz,t,ph=0){ctx.save();ctx.translate(x,y);ctx.scale(sz*(1+.1*Math.sin(t*11+ph)),sz*(1+.18*Math.sin(t*14+ph)));ctx.beginPath();ctx.moveTo(0,-30);ctx.quadraticCurveTo(16,-8,12,6);ctx.quadraticCurveTo(0,16,-12,6);ctx.quadraticCurveTo(-16,-8,0,-30);ctx.closePath();fs('#ff7a1a',true,3);ctx.beginPath();ctx.moveTo(0,-16);ctx.quadraticCurveTo(8,-2,5,6);ctx.quadraticCurveTo(0,11,-5,6);ctx.quadraticCurveTo(-8,-2,0,-16);ctx.fillStyle='#ffd24a';ctx.fill();ctx.restore()}
function hairFire(x,y,s,t,k=1){for(const [dx,sz,ph] of[[-13,.5,0],[0,.7,1.7],[13,.5,3.1]])flame(x+dx*s,y-50*s,sz*s*k,t,ph)}
function cloud(x,y,s=1){ctx.save();ctx.globalAlpha=.92;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,y,34*s,16*s,0,0,7);ctx.ellipse(x-22*s,y+6*s,22*s,12*s,0,0,7);ctx.ellipse(x+24*s,y+5*s,24*s,13*s,0,0,7);ctx.ellipse(x+4*s,y-10*s,20*s,14*s,0,0,7);ctx.fill();ctx.restore()}
function dcloud(x,y,s=1,c='#3b4070'){ctx.save();ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,38*s,18*s,0,0,7);ctx.ellipse(x-24*s,y+7*s,24*s,13*s,0,0,7);ctx.ellipse(x+26*s,y+6*s,26*s,14*s,0,0,7);ctx.ellipse(x+4*s,y-11*s,22*s,15*s,0,0,7);ctx.fill();ctx.restore()}
function bolt(x0,y0,x1,y1,sd,w=7,a=1){const s0=seed;seed=sd*7+3;const n=7,P=[[x0,y0]];for(let i=1;i<n;i++){const q=i/n;P.push([lerp(x0,x1,q)+(rnd()-.5)*38*(1-q*.4),lerp(y0,y1,q)+(rnd()-.5)*12])}P.push([x1,y1]);seed=s0;
  ctx.save();ctx.globalAlpha=a;ctx.lineJoin='round';ctx.lineCap='round';const path=()=>{ctx.beginPath();P.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y))};
  path();ctx.strokeStyle='rgba(255,246,170,.35)';ctx.lineWidth=w*3.2;ctx.stroke();path();ctx.strokeStyle=INK;ctx.lineWidth=w+5;ctx.stroke();path();ctx.strokeStyle='#ffe45a';ctx.lineWidth=w;ctx.stroke();path();ctx.strokeStyle='#fff';ctx.lineWidth=w*.4;ctx.stroke();ctx.restore()}
function strike(t,t0,x0,y0,x1,y1,sd,w=7){const v=t-t0;if(v<0||v>.5)return;if(v<.3)bolt(x0,y0,x1,y1,sd,w,Math.floor(v*30)%2?1:.65);const f=pk(t,t0,.4);if(f>0){ctx.save();ctx.fillStyle=`rgba(255,255,235,${cl(f)*.8})`;ctx.fillRect(0,0,W,H);ctx.restore()}}
function rain(u,a=.45){ctx.save();ctx.strokeStyle=`rgba(190,215,255,${a})`;ctx.lineWidth=2;for(let i=0;i<26;i++){const x=(i*53)%380-10,y=((u*700+i*97)%720)-40;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y+22);ctx.stroke()}ctx.restore()}
function mnts(c1,c2,yb=450){ctx.fillStyle=c1;ctx.beginPath();ctx.moveTo(0,yb);ctx.lineTo(0,350);ctx.lineTo(60,300);ctx.lineTo(120,345);ctx.lineTo(200,280);ctx.lineTo(275,340);ctx.lineTo(360,295);ctx.lineTo(360,yb);ctx.closePath();ctx.fill();ctx.fillStyle=c2;ctx.beginPath();ctx.moveTo(0,yb);ctx.lineTo(0,395);ctx.lineTo(90,360);ctx.lineTo(170,400);ctx.lineTo(250,365);ctx.lineTo(360,405);ctx.lineTo(360,yb);ctx.closePath();ctx.fill()}
function pine(x,y,s,c='#1f5a3a'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-5,-14,10,16,2);fs('#6a4a2a',true,3);for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(-26+i*4,-14-i*26);ctx.lineTo(0,-52-i*26);ctx.lineTo(26-i*4,-14-i*26);ctx.closePath();fs(c,true,3)}ctx.restore()}
function ground(y,c1='#2f6b4a',c2='#245a3c'){ctx.fillStyle=c1;ctx.fillRect(0,y,W,H-y);ctx.fillStyle=c2;ctx.fillRect(0,y,W,5)}
function tower(x,y,s,t,fire){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  for(const [c,w] of[[INK,9],['#8a5a3a',5]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*36,0);ctx.lineTo(sx*20,-150);ctx.stroke()}ctx.beginPath();ctx.moveTo(-30,-40);ctx.lineTo(25,-105);ctx.moveTo(30,-40);ctx.lineTo(-25,-105);ctx.stroke()}
  rr(-40,-156,80,8,2);fs('#6a4a2a',true,3);rr(-30,-196,60,42,3);fs('#b0703c',true,4);rr(-18,-186,36,20,2);fs('#ffe27a',true,3);ctx.beginPath();ctx.moveTo(-40,-196);ctx.lineTo(0,-230);ctx.lineTo(40,-196);ctx.closePath();fs('#5a3a2a',true,4);
  if(fire>0)for(let i=0;i<5;i++)flame(-26+i*13,-190-(i%2)*8,1.3*fire,t,i*1.3);ctx.restore()}
function carR(x,y,s,o={}){ctx.save();ctx.translate(x,y+(o.bob?Math.sin(T*18)*1.2:0));ctx.scale(s,s);
  rr(-30,-72,60,38,9);fs('#bfe4ff',true,4);
  if(o.lie){ctx.save();ctx.translate(-8,-53);ctx.rotate(Math.PI/2);mini(0,0,.42,{});hat(0,0,.42);ctx.restore()}else{ctx.save();ctx.beginPath();ctx.rect(-60,-90,120,84);ctx.clip();mini(-2,-20,.55,{open:o.open,ar:.1});ctx.restore();if(!o.fire)hat(-2,-20,.55)}
  if(o.fire)hairFire(-2,-20,.55,T);
  rr(-52,-40,104,32,8);fs('#4f8a4a',true,4);ctx.fillStyle='#ffe27a';ctx.beginPath();ctx.arc(46,-26,4,0,7);ctx.fill();
  for(const wx of[-30,30]){ctx.beginPath();ctx.arc(wx,-8,13,0,7);fs('#22252f',true,3.5);ctx.beginPath();ctx.arc(wx,-8,5,0,7);fs('#c9d2e8',true,2)}ctx.restore()}
function jerry(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-34,-46,68,84,10);fs('#3a8ae0',true,4);rr(-8,-62,26,20,5);fs('#2a6ac0',true,3.5);rr(-24,-38,24,12,4);fs('#9fd0ff',true,2.5);ctx.fillStyle='#fff';ctx.font='700 20px P';ctx.textAlign='center';ctx.fillText('EAU',0,18);for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-40+i*4,-8+i*20,3,0,7);ctx.fillStyle='#9fd0ff';ctx.fill()}ctx.restore()}
function card(x,y,k,draw,lab){ctx.save();ctx.translate(x,y);ctx.scale(k,k);rr(-43,-48,86,96,12);fs('#fff',true,4);draw();ctx.fillStyle=INK;ctx.font='700 9px P';ctx.textAlign='center';ctx.fillText(lab,0,38);ctx.restore()}
function stormSky(u,a='#141a40',b='#5a3f86'){bg(a,b);stars(30,260,5);dcloud(60,190,1.3);dcloud(290,210,1.2);dcloud(180,165,1.5,'#2f3463')}
function house(x,y,s=1,lit=true){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-50,-60,100,60,3);fs('#f2d9b0',true,3.5);ctx.beginPath();ctx.moveTo(-60,-58);ctx.lineTo(0,-104);ctx.lineTo(60,-58);ctx.closePath();fs('#c0503a',true,3.5);rr(-10,-34,20,34,2);fs('#8a5a3a',true,3);for(const wx of[-38,22]){rr(wx,-46,18,18,2);fs(lit?'#ffe27a':'#2a2f45',true,3)}ctx.restore()}
function yardS(){bg('#3a4670','#8a96b8');dcloud(80,200,1);dcloud(270,230,.9);ctx.fillStyle='#4a7a5a';ctx.fillRect(0,440,W,200);ctx.fillStyle='#3a6a4a';for(let i=0;i<8;i++)ctx.fillRect(0,462+i*26,W,4);for(let x=176;x<350;x+=22){rr(x,398,16,44,3);fs('#fff',true,3)}house(92,442,1.25,true)}
