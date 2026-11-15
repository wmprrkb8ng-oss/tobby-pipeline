# Usage: bash build_after_voice.sh NOM_FICHIER.mp4   (dans /home/claude/chaise, avec voix.mp3, scribe.json, align.py, text.json, scenes_x.js, audio_x.py)
set -e; cd /home/claude/chaise; mkdir -p vo
python3 -I scribe2words.py scribe.json
python3 -I - <<'PY'
import json,re
raw=json.load(open('scribe.json'));raw=raw['words'] if isinstance(raw,dict) else raw
R=[w for w in raw if w.get('type','word')=='word' and re.search(r'\w',w['text'])]
T=json.load(open('text.json'));wl=lambda s:[w for w in s.split() if re.search(r'[A-Za-zÀ-ÿœŒ]',w)]
o=0;segs=[]
for t in T:
    n=len(wl(t));segs.append([R[o]['start'],R[o+n-1]['end']]);o+=n
assert o==len(R),'mots Scribe != mots script';json.dump(segs,open('segs.json','w'))
PY
python3 -I sync4.py 2>&1 | grep -v "^?" | tail -3
python3 -I - <<'PY'
import json
c=json.load(open('vo/caps.json'));TOT=json.load(open('tot.json'))
for i in range(len(c)-1):c[i][1]=c[i+1][0]
c[-1][1]=round(TOT-1.2,3)
json.dump(c,open('vo/caps.json','w'),ensure_ascii=False);open('caps.js','w').write('window.CAPS='+json.dumps(c,ensure_ascii=False)+';');print('TOT',TOT)
PY
python3 -I audio_x.py && python3 -I mixv.py vo && bash mk.sh; [ -n "$NORENDER" ] && exit 0
TOT=$(python3 -c "import json;print(json.load(open('tot.json')))");NF=$(python3 -c "print(int($TOT*30))");H=$((NF/2))
rm -rf fr;(node renderf.js 0 $H & node renderf.js $H $NF & wait) 2>&1 | grep -v "proxy\|accounts.google\|Allowed\|For details" | head -5 || true
N=$(ls fr|wc -l);echo "images $N / $NF";[ "$N" -eq "$NF" ] || { echo "ERREUR: images manquantes"; exit 1; }
ffmpeg -y -loglevel error -framerate 30 -i fr/f_%05d.jpg -i vo/mix.m4a -t $TOT -c:v libx264 -pix_fmt yuv420p -crf 19 -c:a aac -b:a 192k "$1";ls -la "$1"
