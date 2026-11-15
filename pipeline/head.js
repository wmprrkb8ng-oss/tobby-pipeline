let T=0;
const lerp=(a,b,k)=>a+(b-a)*k;
function wt(w,t0=0,d=null){for(const c of CAPS){const ws=c[2].split(' ');for(let i=0;i<ws.length;i++){if(ws[i].replace(/[\[\].,?:!]/g,'')===w&&c[3][i]>=t0)return c[3][i]}}return d}
