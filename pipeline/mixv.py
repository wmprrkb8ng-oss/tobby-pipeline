import subprocess as sp, json, sys
TOT=json.load(open('tot.json'))
od = sys.argv[1]; plan = json.load(open(f'{od}/plan.json'))
ins = []; fl = []
for k, (f, st, d) in enumerate(plan):
    ins += ['-i', f]; ms = int(st * 1000); fl.append(f'[{k}:a]adelay={ms}|{ms}[v{k}]')
n = len(plan)
fl.append(''.join(f'[v{k}]' for k in range(n)) + f'amix=inputs={n}:normalize=0:duration=longest,loudnorm=I=-15:TP=-1.5:LRA=7,aresample=44100,apad=whole_dur={TOT},atrim=0:{TOT}[vo]')
fl.append('[vo]asplit[vk][vm]'); fl.append(f'[{n}:a]volume=0.8[amb]')
fl.append('[amb][vk]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=400[duck]')
fl.append(f'[duck][vm]amix=inputs=2:normalize=0:duration=longest,alimiter=limit=0.89,apad=whole_dur={TOT},atrim=0:{TOT}[mix]')
sp.check_call(['ffmpeg', '-v', 'error', '-y', *ins, '-i', '/home/claude/chaise/audio_h.wav', '-filter_complex', ';'.join(fl), '-map', '[mix]', '-ar', '44100', '-c:a', 'aac', '-b:a', '192k', f'{od}/mix.m4a'])
print('ok')
