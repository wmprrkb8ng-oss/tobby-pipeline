const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});
const p=await br.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///home/claude/chaise/ep.html');await p.waitForFunction(()=>window.READY);if(process.env.SAFE)await p.evaluate(()=>{window.SAFE=1});
for(const t of process.argv.slice(2).map(Number)){await p.evaluate(i=>window.frame(i),Math.round(t*30));await p.screenshot({type:'jpeg',quality:85,path:`/home/claude/chaise/p_${t}.jpg`})}await br.close()})();
