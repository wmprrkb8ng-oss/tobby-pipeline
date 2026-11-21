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
def bubbles(t0,n=5):
    global out
    for i in range(n):pop(t0+i*.09,900+i*140,.12)
for k,w in [(0,'TARÉ'),(1,'QUEUE'),(2,'OSSEUX'),(3,'CERVEAU'),(3,'NOIX,'),(4,'MÉDUSES.'),(5,'RIEN'),(7,'FROID'),(7,'CRÊPE.'),(8,'PARASITES'),(9,'ABRUTI.'),(10,'FEMELLE'),(11,'USINE'),(12,'FORT,'),(13,'CRÊPE')]:pop(w1(w.strip('.,'),k,1.5))
thud(w1('TONNES',2,1.2)+.3,1.2)
for i in range(6):chomp(w1('BOUFFE',6,.7)+i*.5)
for i in range(7):chomp(w1('BOUFFER',12,1.5)+i*.45)
bubbles(w1('FEMELLE',10,1.8)+.3,8)
pop(w1('BORDEL',11,1.9),300,.3)
pop(w1("N'IMPORTE",14,1.3),260,.3)
out+=np.sin(2*np.pi*65*t)*env(TOT-1.8,1.6,.01,.5)*.2
out=out/np.max(np.abs(out))*.7;wavfile.write('audio_h.wav',SR,(np.stack([out,np.roll(out,40)],1)*32767).astype(np.int16));print('audio ok')
