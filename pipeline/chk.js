const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});
const p=await br.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///home/claude/chaise/ep.html');await p.waitForFunction(()=>window.READY);console.log('captions à problème:',JSON.stringify(await p.evaluate(()=>window.capCheck())));await br.close()})();
