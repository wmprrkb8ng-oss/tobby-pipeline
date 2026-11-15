import json,numpy as np
from scipy import signal
from scipy.io import wavfile
TOT=json.load(open('tot.json'));B=json.load(open('bounds.json'));caps=json.load(open('vo/caps.json'))
SR=44100;N=int(SR*TOT);t=np.arange(N)/SR;rng=np.random.default_rng(4);noise=rng.standard_normal(N)
def wts(w,t0=0):return [c[3][i] for c in caps for i,x in enumerate(c[2].split()) if x.strip('[].,?:!…')==w and c[3][i]>=t0]
def w1(w,k,d):
    r=wts(w,B[k]);return r[0] if r else d
def env(t0,dur,a=.004,r=.15):
    e=np.zeros(N);i0=int(max(t0,0)*SR);n=min(int(dur*SR),N-i0)
    if n>0:x=np.arange(n)/SR;e[i0:i0+n]=np.minimum(x/a,1)*np.exp(-x/r)
    return e
def bp(x,lo,hi):b,a=signal.butter(2,[lo/(SR/2),hi/(SR/2)],'band');return signal.lfilter(b,a,x)
def lp(x,f):b,a=signal.butter(2,f/(SR/2),'low');return signal.lfilter(b,a,x)
nb=len(B)-1
# nappe sombre + pouls léger
out=(np.sin(2*np.pi*98*t)+.6*np.sin(2*np.pi*147*t)+.4*np.sin(2*np.pi*196*t))*.016*(.8+.2*np.sin(t*.35))
tt=.3
while tt<TOT-1:out+=np.sin(2*np.pi*62*t)*env(tt,.18,.004,.06)*.05;tt+=.5
# pluie continue
out+=bp(noise,3000,9000)*.012*(.7+.3*np.sin(t*.7))
# whoosh à chaque changement de scène
for k in range(1,nb):out+=bp(noise,400,4000)*env(B[k]-.12,.3,.15,.12)*.16
def thunder(t0,amp=1.):
    global out
    out+=bp(noise,2000,9000)*env(t0,.2,.002,.05)*.55*amp+lp(noise,500)*env(t0+.03,2.2,.02,.7)*1.6*amp+np.sin(2*np.pi*52*t)*env(t0+.02,1.2,.01,.45)*.5*amp
def crackle(a,b,amp=.25):
    global out
    for x in np.arange(a,b,.045):
        if rng.random()<.55:out+=bp(noise,1200,6000)*env(x+rng.random()*.04,.05,.001,.02)*amp*(.4+rng.random())
tF=w1('FOUDRE',1,B[1]+5);tFEU=w1('FEU',1,B[1]+6.3);tE=w1('ÉCLAIR',2,B[2]+2.3);tFR=w1('FRAPPE',3,B[3]+3);tJ=w1('JARDIN',4,B[4]+2.2);tC=w1('CHEVEUX',4,B[4]+4.2)
tB=w1('BRÛLENT',5,B[5]+1.2);tAL=w1('ALORS',5,B[5]+2.4);tCH=w1('CHEVILLE',7,B[7]+2.6);tS=w1('SEPTIÈME',7,B[7]+6.2);tR=w1('RECORDS',8,B[8]+3.2)
thunder(1.4,.6)
for x,a in[(tF,1),(tE,1),(tFR,1),(tFR+.15,.7),(tJ,1),(tC-.15,.9),(tB,1),(tCH,1),(tS,1.2)]:thunder(x,a)
crackle(tFEU,B[3],.3);crackle(tC,tC+2.2,.3);crackle(tB,tAL,.3)
out+=bp(noise,500,3000)*env(tAL,.5,.03,.18)*.4   # eau
for i,f in enumerate([523,659,784,1047]):out+=np.sin(2*np.pi*f*t)*env(tR+i*.09,.6,.003,.22)*.08   # record
tT=w1('TOI',9,B[9]+.3);out+=np.sin(2*np.pi*880*t)*env(tT,.5,.003,.2)*.06
out+=np.sin(2*np.pi*55*t)*env(TOT-1.9,1.7,.01,.5)*.3
out=out/np.max(np.abs(out))*.7;wavfile.write('audio_h.wav',SR,(np.stack([out,np.roll(out,40)],1)*32767).astype(np.int16));print('audio ok')
