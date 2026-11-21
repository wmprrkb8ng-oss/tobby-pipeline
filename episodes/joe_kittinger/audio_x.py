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
# nappe : monte avec l'altitude
for k in range(1,nb):out+=bp(noise,400,4000)*env(B[k]-.12,.3,.15,.12)*.15
def ding(t0,f=1047,a=.1):
    global out;out+=(np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*f*2.01*t))*env(t0,.7,.003,.25)*a
def thump(t0,a=.35):
    global out;out+=np.sin(2*np.pi*70*t)*env(t0,.4,.005,.1)*a
def boing(t0,a=.2):
    global out;out+=np.sin(2*np.pi*(300+200*np.exp(-(t-t0)*18).clip(0,1))*t)*env(t0,.3,.003,.1)*a
for x in[w1("L'ESPACE",0,1.6),w1('KITTINGER',0,4.6),w1('AOÛT',1,1.2),w1('GANT',2,1.1),w1('TRENTE',3,1.5),w1('PLAQUE',3,6),w1('HAUTE',3,7.8),w1('QUATRE',5,.9),w1('TROIS',7,2.6),w1('CINQUANTE',8,2.4)]:boing(x,.15)
# vent de chute
tp=w1('PAS',4,1.2);tq=w1('PARACHUTE',6,1.6)
wind=lp(noise,1800)*np.clip((t-tp)/2.5,0,1)*np.clip((tq-t)/.6,0,1)*.18
out+=wind
thump(w1('VIDE',4,1.6),.3)
# ouverture du parachute
thump(tq,.35);out+=bp(noise,300,2500)*env(tq,.5,.01,.2)*.2
# atterrissage + records
tl=w1('POSE',7,.5);thump(tl+.4,.2)
trc=w1('RECORDS',7,3)
for i,f in enumerate([523,659,784,1047]):out+=np.sin(2*np.pi*f*t)*env(trc+i*.09,.6,.003,.22)*.1
tT=w1('OSERAIS',9,.8);ding(tT,880,.07)
out+=np.sin(2*np.pi*55*t)*env(TOT-1.9,1.7,.01,.5)*.25
out=out/np.max(np.abs(out))*.7;wavfile.write('audio_h.wav',SR,(np.stack([out,np.roll(out,40)],1)*32767).astype(np.int16));print('audio ok')
