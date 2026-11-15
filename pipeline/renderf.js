const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
(async()=>{const [a,b]=process.argv.slice(2).map(Number);
const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});
const p=await br.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///home/claude/chaise/ep.html');await p.waitForFunction(()=>window.READY);fs.mkdirSync('/home/claude/chaise/fr',{recursive:true});
for(let i=a;i<b;i++){await p.evaluate(i=>window.frame(i),i);await p.screenshot({type:'jpeg',quality:88,path:`/home/claude/chaise/fr/f_${String(i).padStart(5,'0')}.jpg`})}
await br.close()})();
