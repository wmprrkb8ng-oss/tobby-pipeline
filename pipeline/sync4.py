import json,re,subprocess as sp,numpy as np,importlib.util
from scipy.io import wavfile
spec=importlib.util.spec_from_file_location('al','align.py');al=importlib.util.module_from_spec(spec);spec.loader.exec_module(al)
SR=44100
x=np.frombuffer(sp.check_output(['ffmpeg','-v','error','-i','voix.mp3','-f','s16le','-ac','1','-ar',str(SR),'-']),np.int16).astype(np.float32)/32768
hop=220;e=np.sqrt(np.convolve(x**2,np.ones(hop)/hop,'same')[::hop]+1e-12);db=20*np.log10(e+1e-9);on=db>-45;H=hop/SR
isl=[];i=0
while i<len(on):
    if on[i]:
        j=i
        while j<len(on) and on[j]:j+=1
        isl.append([i*H,j*H]);i=j
    else:i+=1
m=[isl[0]]
for a,b in isl[1:]:
    if a-m[-1][1]<.06:m[-1][1]=b
    else:m.append([a,b])
F=[s for s in m if s[1]-s[0]>.05]
segs=json.load(open('segs.json'));TEXT=json.load(open('text.json'));CAPS=al.CAPS
# --- audio compressé : on garde les îlots de parole, pauses courtes
ch=[list(F[0])]
for a,b in F[1:]:
    if a-ch[-1][1]<.2: ch[-1][1]=b
    else: ch.append([a,b])
mp=[];out=[];n=.15;prev_old=None;cur=int(n*SR);buf=[np.zeros(cur,np.float32)]
for k,(a,b) in enumerate(ch):
    s=max(a-.06,(ch[k-1][1]+.02) if k else 0);en=min(b+.12,(ch[k+1][0]-.02) if k+1<len(ch) else len(x)/SR)
    if k:
        g=.12 if a-ch[k-1][1]<.45 else .22
        buf.append(np.zeros(int(g*SR),np.float32));cur+=int(g*SR)
    seg=x[int(s*SR):int(en*SR)].copy();f=int(.006*SR);seg[:f]*=np.linspace(0,1,f);seg[-f:]*=np.linspace(1,0,f)
    mp.append((s,en,cur/SR));buf.append(seg);cur+=len(seg)
voice=np.concatenate(buf);vend=cur/SR
def o2n(t):
    for s,en,ns in mp:
        if s-.001<=t<=en+.001:return ns+(t-s)
    # dans une pause supprimée : coller au bloc suivant
    for s,en,ns in mp:
        if t<s:return ns
    return mp[-1][2]+mp[-1][1]-mp[-1][0]
# --- mots
caps=[];pstart=[];WA=json.load(open('words_all.json'));OFF=0
for k,(a,b) in enumerate(segs):
    nw=len(al.words_of(TEXT[k]));W=[o2n(t) for t in WA[OFF:OFF+nw]];OFF+=nw
    # sous-titres
    cw=[[w for w in c.split() if re.search(r'[A-Za-zÀ-ÿ]',w)] for c in CAPS[k]];assert sum(map(len,cw))==len(W)
    i=0;grp=[]
    for words in cw:grp.append([max(0,W[i+j]-.04) for j in range(len(words))]);i+=len(words)
    pstart.append(grp[0][0])
    for j,c in enumerate(CAPS[k]):
        nxt=grp[j+1][0] if j+1<len(grp) else o2n(b)+.25
        caps.append([round(grp[j][0],3),round(nxt,3),c,[round(t,3) for t in grp[j]]])
for q in range(len(caps)-1):
    if caps[q][1]>caps[q+1][0]:caps[q][1]=caps[q+1][0]
TOT=round(vend+2.2,2);Bd=lambda k:round(pstart[k]-.12,2)
B=[0]+[Bd(k) for k in range(1,len(TEXT))]+[TOT]
json.dump(caps,open('vo/caps.json','w'),ensure_ascii=False);open('caps.js','w').write('window.CAPS='+json.dumps(caps,ensure_ascii=False)+';')
json.dump(B,open('bounds.json','w'));open('bounds.js','w').write('window.BOUNDS=%s;'%json.dumps(B))
wavfile.write('vo/voice_raw.wav',SR,(voice*32767).astype(np.int16))
sp.check_call(['ffmpeg','-v','error','-y','-i','vo/voice_raw.wav','-af',al.FX,'-ar','44100','-ac','2','vo/voice_c.wav'])
json.dump([['vo/voice_c.wav',0,vend]],open('vo/plan.json','w'));json.dump(TOT,open('tot.json','w'))
print('voix',round(vend,1),'TOT',TOT,'B',B)
# contrôle : début de chaque légende vs îlot de parole le plus proche
nis=[[o2n(s),o2n(e)] for s,e in F];bad=0
for c in caps:
    d=min(abs(c[0]+.04-s) for s,e in nis)
    if d>.18:bad+=1;print('?',c[2],c[0])
print('légendes loin d\'un début de parole :',bad,'/',len(caps))
