"""Usage: python3 -I set_script.py script.json   (dans /home/claude/chaise)
script.json = {"TEXT":[paragraphes...], "CAPS":[[sous-titres du paragraphe 1...],...]}  (mots clés en rouge entre [crochets], fermés dans le même sous-titre)
Écrit align.py (lignes TEXT/CAPS), text.json, texte_voix.txt. Vérifie que les mots de CAPS == mots de TEXT."""
import json,re,sys
d=json.load(open(sys.argv[1]));T=d['TEXT'];C=d['CAPS'];assert len(T)==len(C),'paragraphes != CAPS'
wl=lambda s:[w for w in s.split() if re.search(r'[A-Za-zÀ-ÿœŒ]',w)];ok=True
for k,(t,c) in enumerate(zip(T,C)):
    a=[w.upper() for w in wl(t)];b=[w.replace('[','').replace(']','') for x in c for w in x.split() if re.search(r'[A-Za-zÀ-ÿ]',w)]
    if a!=b:ok=False;print('MISMATCH para',k,[(x,y) for x,y in zip(a,b) if x!=y][:3],len(a),len(b))
    for x in c:
        if x.count('[')!=x.count(']'):ok=False;print('CROCHETS',x)
assert ok,'corrige TEXT/CAPS'
src=open('align.py').read().split('\n')
for i,l in enumerate(src):
    if l.startswith('TEXT = '):src[i]='TEXT = '+json.dumps(T,ensure_ascii=False)
    if l.startswith('CAPS = '):src[i]='CAPS = '+json.dumps(C,ensure_ascii=False)
open('align.py','w').write('\n'.join(src));json.dump(T,open('text.json','w'),ensure_ascii=False);open('texte_voix.txt','w').write('\n\n'.join(T)+'\n')
j='\n\n'.join(T);print('OK',len(j),'caractères',len(j.split()),'mots',len(T),'paragraphes')
