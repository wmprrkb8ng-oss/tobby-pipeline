import json,numpy as np
from scipy import signal
from scipy.io import wavfile
TOT=json.load(open('tot.json'));B=json.load(open('bounds.json'));caps=json.load(open('vo/caps.json'))
SR=44100;N=int(SR*TOT);t=np.arange(N)/SR;rng=np.random.default_rng(7);noise=rng.standard_normal(N)
def wts(w,t0=0):return [c[3][i] for c in caps for i,x in enumerate(c[2].split()) if x.strip('[].,?:!…')==w and c[3][i]>=t0]
def w1(w,k,d):
    r=wts(w,B[k]);return r[0] if r else B[k]+d
def env(t0,dur,a=.004,r=.15):
    e=np.zeros(N);i0=int(max(t0,0)*SR);n=min(int(dur*SR),N-i0)
    if n>0:x=np.arange(n)/SR;e[i0:i0+n]=np.minimum(x/a,1)*np.exp(-x/r)
    return e
def bp(x,lo,hi):b,a=signal.butter(2,[lo/(SR/2),hi/(SR/2)],'band');return signal.lfilter(b,a,x)
def lp(x,f):b,a=signal.butter(2,f/(SR/2),'low');return signal.lfilter(b,a,x)
nb=len(B)-1
# nappe douce de nuit
out=(np.sin(2*np.pi*110*t)+.5*np.sin(2*np.pi*165*t)+.3*np.sin(2*np.pi*220*t))*.014*(.8+.2*np.sin(t*.3))
# tic-tac d'horloge (qui s'accélère vers la fin du défi)
tt=.5
while tt<TOT-1:
    out+=bp(noise,1500,4500)*env(tt,.05,.001,.02)*(.07 if int(tt*2)%2==0 else .05);tt+=.5
# whoosh à chaque changement de scène
for k in range(1,nb):out+=bp(noise,400,4000)*env(B[k]-.12,.3,.15,.12)*.15
def ding(t0,f=1047,a=.1):
    global out;out+=(np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*f*2.01*t))*env(t0,.7,.003,.25)*a
def thump(t0,a=.35):
    global out;out+=np.sin(2*np.pi*70*t)*env(t0,.4,.005,.1)*a
def boing(t0,a=.2):
    global out;out+=np.sin(2*np.pi*(300+200*np.exp(-(t-t0)*18).clip(0,1))*t)*env(t0,.3,.003,.1)*a
# pop sur les temps forts
for x in[w1('ONZE',0,1.4),w1('RANDY',0,4.7),w1('DÉCEMBRE',1,1),w1('DÉFI',1,4.6),w1('DEUX',2,1),w1('TROISIÈME',3,.3),w1('STANFORD',4,2.1),w1('DIXIÈME',5,.1),w1('ONZIÈME',6,.1)]:boing(x,.15)
# flipper : sonneries
tf=w1('FLIPPER',4,4.9)
for i in range(6):ding(tf+i*.28,[784,988,1175,880,1319,1047][i],.05)
for i in range(8):ding(B[5]+.3+i*.33,[1047,1319,1568,1175][i%4],.05)
# calcul : tic à chaque nombre, puis bzz
tr=w1('RETIRER',6,1.6);ta=w1('S\'ARRÊTE',6,5.2)
for x in np.arange(tr,ta-.2,.55):thump(x,.18)
out+=bp(noise,200,600)*env(ta,.5,.01,.2)*.15
# record
trc=w1('RECORD',7,4.5)
for i,f in enumerate([523,659,784,1047]):out+=np.sin(2*np.pi*f*t)*env(trc+i*.09,.6,.003,.22)*.1
# sommeil : nappe grave douce
td=w1('DORT',8,.7);out+=np.sin(2*np.pi*80*t)*env(td,2.5,.4,1.2)*.05
# santé : ding doux
ding(w1('SANTÉ',8,4.9),1319,.08)
# battu : petit descendant
tb=w1('BATTU',9,1.1);out+=np.sin(2*np.pi*(440-120*np.clip((t-tb)*3,0,1))*t)*env(tb,.5,.005,.2)*.08
tT=w1('TOI',10,.2);ding(tT,880,.07)
out+=np.sin(2*np.pi*55*t)*env(TOT-1.9,1.7,.01,.5)*.25
out=out/np.max(np.abs(out))*.7;wavfile.write('audio_h.wav',SR,(np.stack([out,np.roll(out,40)],1)*32767).astype(np.int16));print('audio ok')
