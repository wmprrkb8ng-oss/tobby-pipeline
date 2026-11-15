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
# nappe douce + pouls léger
out=(np.sin(2*np.pi*131*t)+.5*np.sin(2*np.pi*196*t)+.35*np.sin(2*np.pi*262*t))*.014*(.8+.2*np.sin(t*.4))
tt=.3
while tt<TOT-1:out+=np.sin(2*np.pi*70*t)*env(tt,.16,.004,.05)*.035;tt+=.5
for k in range(1,nb):out+=bp(noise,400,4000)*env(B[k]-.12,.3,.15,.12)*.15   # whoosh de coupure
def thump(t0,amp=1.):
    global out
    out+=lp(noise,400)*env(t0,.5,.003,.12)*1.2*amp+np.sin(2*np.pi*70*t)*env(t0,.5,.003,.14)*.5*amp
def crash(t0,amp=1.):
    global out
    out+=bp(noise,1500,8000)*env(t0,.25,.002,.06)*.5*amp+lp(noise,700)*env(t0+.02,.9,.01,.25)*1.1*amp
def ding(t0,f=1047,amp=.08):
    global out
    out+=np.sin(2*np.pi*f*t)*env(t0,.7,.003,.25)*amp+np.sin(2*np.pi*f*2*t)*env(t0,.4,.003,.1)*amp*.3
def whistle(t0,t1):
    global out
    a=int(t0*SR);b=int(t1*SR);n=b-a
    if n<=0:return
    f=np.linspace(2600,500,n);ph=2*np.pi*np.cumsum(f)/SR;s=np.zeros(N);s[a:b]=np.sin(ph)*np.linspace(.02,.14,n);out+=s
tK=w1('TRAVERSE',2,B[2]+1.6);tRB=w1('REBONDIT',2,B[2]+3.4);tTc=w1('TOUCHE',2,B[2]+5.6)
whistle(tK-.7,tK+.2);crash(tK+.15,1.1);thump(tRB+.1,.9);ding(tRB+.1,330,.05);thump(tTc+.12,1.3)
tM=w1('MÉTÉORITE',3,B[3]+.4);whistle(tM-.2,tM+.5)
tBL=w1('BLEU',3,B[3]+5.6);thump(tBL,.5);tBI=w1('BIEN',3,B[3]+7);ding(tBI,784,.09);ding(tBI+.1,1047,.08)
tV=w1('VERDICT',4,B[4]+3.4);thump(tV+.05,1.2);ding(tV+.1,880,.07)
tMO=w1('MOI',5,B[5]+4);thump(tMO,.5)
tTR=w1('TRIBUNAL',5,B[5]+5.8)
n=0
while B[5]+(n+.1)/1.1<B[6]-.1:
    x=B[5]+(n+.1)/1.1
    if x>=tTR-.2:thump(x,1.0)
    n+=1
tAC=w1('ACCORD',6,B[6]+1.4);ding(tAC,659,.08);ding(tAC+.12,880,.08)
tLF=w1('LIFE',6,B[6]+7)
for i,f in enumerate([523,659,784,1047]):out+=np.sin(2*np.pi*f*t)*env(tLF+i*.09,.6,.003,.22)*.08
tMS=w1('MUSÉE',7,B[7]+8);ding(tMS,784,.08)
tEX=w1('EXPOSÉE',8,B[8]+1.4);ding(tEX,1319,.07);ding(tEX+.6,1568,.06)
tSE=w1('SEULE',8,B[8]+4.2);ding(tSE,880,.09);thump(tSE,.4)
tT=w1('TOI',9,B[9]+.3);out+=np.sin(2*np.pi*880*t)*env(tT,.5,.003,.2)*.06
out+=np.sin(2*np.pi*55*t)*env(TOT-1.9,1.7,.01,.5)*.3
out=out/np.max(np.abs(out))*.7;wavfile.write('audio_h.wav',SR,(np.stack([out,np.roll(out,40)],1)*32767).astype(np.int16));print('audio ok')
