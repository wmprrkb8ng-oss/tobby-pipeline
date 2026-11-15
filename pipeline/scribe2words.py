"""Usage: python3 scribe2words.py scribe.json  -> words_all.json (un temps de début par mot du script, mêmes mots que align.words_of)
scribe.json = réponse Scribe (liste ou {'words':[{text,start,end,type}]}). Gère chiffres/mots fusionnés par alignement difflib + interpolation."""
import json,sys,re,unicodedata,difflib,importlib.util
sp=importlib.util.spec_from_file_location('al','align.py');al=importlib.util.module_from_spec(sp);sp.loader.exec_module(al)
raw=json.load(open(sys.argv[1]));W=raw['words'] if isinstance(raw,dict) else raw
R=[w for w in W if w.get('type','word')=='word' and re.search(r'\w',w['text'])]
nm=lambda s:re.sub(r"[^a-z0-9]","",unicodedata.normalize('NFD',s.lower()).encode('ascii','ignore').decode())
S=[w for T in al.TEXT for w in al.words_of(T)];Sn=[nm(w) for w in S];Rn=[nm(w['text']) for w in R]
t=[None]*len(S);m=difflib.SequenceMatcher(None,Sn,Rn,autojunk=False)
for op,i1,i2,j1,j2 in m.get_opcodes():
    if op=='equal':
        for q in range(i2-i1):t[i1+q]=R[j1+q]['start']
    elif op=='replace' and j2>j1:
        a=R[j1]['start'];b=R[j2-1]['end'];ln=[max(1,len(x)) for x in Sn[i1:i2]];tot=sum(ln);acc=0
        for q in range(i2-i1):t[i1+q]=a+(b-a)*acc/tot;acc+=ln[q]
# interpolation des trous
idx=[i for i,x in enumerate(t) if x is not None]
for i in range(len(t)):
    if t[i] is None:
        p=max([j for j in idx if j<i],default=None);n=min([j for j in idx if j>i],default=None)
        if p is None:t[i]=t[n]-.15*(n-i)
        elif n is None:t[i]=t[p]+.2*(i-p)
        else:t[i]=t[p]+(t[n]-t[p])*(i-p)/(n-p)
        idx.append(i);idx.sort()
for i in range(1,len(t)):t[i]=max(t[i],t[i-1]+.03)
json.dump([round(x,3) for x in t],open('words_all.json','w'))
print(len(S),'mots script,',len(R),'mots Scribe, non appariés:',sum(1 for o in m.get_opcodes() if o[0]!='equal'))
