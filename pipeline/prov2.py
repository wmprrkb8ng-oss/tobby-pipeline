# timings provisoires (sans voix) : débit en syllabes -> caps.js, bounds.js, tot.json, bounds.json
import json,re,importlib.util
sp=importlib.util.spec_from_file_location('al','align.py');al=importlib.util.module_from_spec(sp);sp.loader.exec_module(al)
R=0.185;t=.35;caps=[];pst=[];B=[0]
for k,T in enumerate(al.TEXT):
    ws=al.words_of(T);tm=[];x=t
    for w in ws:tm.append(x);x+=al.syl(w)*R+.02
    t=x+.3;o=0;g=[]
    for c in al.CAPS[k]:
        n=len([w for w in c.split() if re.search(r'[A-Za-zÀ-ÿ]',w)]);g.append(tm[o:o+n]);o+=n
    pst.append(g[0][0])
    for j,c in enumerate(al.CAPS[k]):
        nx=g[j+1][0] if j+1<len(g) else t
        caps.append([round(g[j][0],3),round(nx,3),c,[round(q,3) for q in g[j]]])
TOT=round(t+2.2,2);B=[0]+[round(pst[k]-.12,2) for k in range(1,len(al.TEXT))]+[TOT]
open('caps.js','w').write('window.CAPS='+json.dumps(caps,ensure_ascii=False)+';');open('bounds.js','w').write('window.BOUNDS=%s;'%json.dumps(B))
json.dump(TOT,open('tot.json','w'));json.dump(B,open('bounds.json','w'));print('TOT',TOT,B)
