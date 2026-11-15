import json,numpy as np
from scipy import signal
from scipy.io import wavfile
TOT=json.load(open('tot.json'));B=json.load(open('bounds.json'));caps=json.load(open('vo/caps.json'))
SR=44100;N=int(SR*TOT);t=np.arange(N)/SR;rng=np.random.default_rng(4);noise=rng.standard_normal(N)
def wts(w,t0=0):return [c[3][i] for c in caps for i,x in enumerate(c[2].split()) if x.strip('[].,?:!…')==w and c[3][i]>=t0]
def w1(w,k,d):
    r=wts(w,B[k]);return r[0] if r and r[0]<B[k+1] else B[k]+d
def env(t0,dur,a=.004,r=.15):
    e=np.zeros(N);i0=int(max(t0,0)*SR);n=min(int(dur*SR),N-i0)
    if n>0:x=np.arange(n)/SR;e[i0:i0+n]=np.minimum(x/a,1)*np.exp(-x/r)
    return e
def bp(x,lo,hi):b,a=signal.butter(2,[lo/(SR/2),hi/(SR/2)],'band');return signal.lfilter(b,a,x)
def lp(x,f):b,a=signal.butter(2,f/(SR/2),'low');return signal.lfilter(b,a,x)
nb=len(B)-1
out=np.zeros(N)
# musique légère : basse + arpège enjoué
notes=[130.8,164.8,196.0,164.8,146.8,174.6,220.0,174.6]
for i,tt in enumerate(np.arange(0,TOT,.4)):
    f=notes[(i//2)%8]*(1 if i%2==0 else 2);out+=np.sin(2*np.pi*f*t)*env(tt,.3,.005,.12)*.035
for tt in np.arange(0,TOT,.8):out+=np.sin(2*np.pi*70*t)*env(tt,.2,.004,.07)*.08
out+=bp(noise,5000,9000)*.004*(.6+.4*np.sin(t*.9))
for k in range(1,nb):out+=bp(noise,500,4500)*env(B[k]-.1,.25,.12,.1)*.13
def pop(t0,f=520,a=.22):
    global out
    out+=np.sin(2*np.pi*(f+f*.8*np.where(t>=t0,np.exp(-np.clip(t-t0,0,5)*40),0))*t)*env(t0,.14,.002,.05)*a
def thud(t0,a=.9):
    global out
    out+=np.sin(2*np.pi*55*t)*env(t0,.6,.003,.2)*a*.5+lp(noise,300)*env(t0,.3,.002,.08)*a
def chomp(t0):
    global out
    out+=bp(noise,800,3500)*env(t0,.1,.002,.04)*.3
def buzz(t0):
    global out
    out+=(np.sin(2*np.pi*220*t)+np.sin(2*np.pi*233*t))*env(t0,.5,.01,.18)*.05
for k,w in [(1,'CUBES'),(1,'PUTAIN'),(3,'BOULES'),(3,'SAUCISSES'),(9,'ROCHERS'),(9,'TRONCS'),(0,'TARÉ'),(5,'ÉLASTIQUE'),(5,'RIGIDE'),(11,'CARTILAGE'),(11,'GRAISSE'),(11,'PEAU'),(15,'CRÂNES'),(15,'RENARDS'),(16,'BLINDÉ')]:pop(w1(w,k,1.5))
pop(w1('TARÉ',0,2.6),300);buzz(w1('BOULES',3,2)+.15);buzz(w1('SAUCISSES',3,3)+.15)
for i in range(4):pop(w1('QUATRE',11,.2)+.25+i*.35,700+i*100)
for i in range(5):chomp(w1('MORDRE',13,.6)+i*.7)
thud(w1('BOUCHE',12,3.6)+.2);thud(w1('CUL',12,5),.6)
te=w1('ÉCRASE',14,1)+.25;thud(te,1.2);out+=bp(noise,1500,6000)*env(te,.15,.002,.05)*.4
pop(w1('FORTERESSE',10,3.2),400,.3)
pop(w1("N'IMPORTE",17,1.3),260,.3)
out+=np.sin(2*np.pi*65*t)*env(TOT-1.8,1.6,.01,.5)*.2
out=out/np.max(np.abs(out))*.7;wavfile.write('audio_h.wav',SR,(np.stack([out,np.roll(out,40)],1)*32767).astype(np.int16));print('audio ok')
