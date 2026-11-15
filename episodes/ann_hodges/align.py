import sys, os, re, json, subprocess as sp
import numpy as np
from scipy import signal
SR = 16000
SLOTS = []
TEXT = ["Et si une pierre tombait du ciel, en pleine sieste ? C'est arrivé à une vraie femme : Ann Hodges.", "Le trente novembre mille neuf cent cinquante quatre, Ann dort sur son canapé, en Alabama.", "Soudain, un gros caillou traverse le toit ! Il rebondit sur la radio, puis il touche Ann à la hanche.", "C'est une météorite de presque quatre kilos, venue de l'espace ! Ann a un énorme bleu, mais elle va bien.", "Des militaires emportent la pierre pour l'étudier. Verdict : c'est bien une météorite !", "Mais la propriétaire de la maison dit : cette pierre est à moi ! Elle va même au tribunal.", "Finalement, elles trouvent un accord, et Ann garde sa pierre. Elle devient célèbre, jusque dans le magazine Life !", "Mais personne ne veut acheter la pierre. Alors la famille s'en sert pour tenir sa porte ouverte, avant de l'offrir à un musée.", "Aujourd'hui, elle est exposée dans un musée. Ann reste la seule personne connue touchée par une météorite.", "Et toi, tu oserais encore faire la sieste sur ton canapé ?"]
CAPS = [["ET SI UNE [PIERRE]", "TOMBAIT DU [CIEL,]", "EN PLEINE [SIESTE] ?", "C'EST ARRIVÉ", "À UNE [VRAIE FEMME] :", "[ANN HODGES.]"], ["LE [TRENTE NOVEMBRE]", "[MILLE NEUF CENT]", "[CINQUANTE QUATRE,]", "ANN DORT SUR", "SON [CANAPÉ,]", "EN [ALABAMA.]"], ["[SOUDAIN,]", "UN GROS [CAILLOU]", "TRAVERSE LE [TOIT] !", "IL REBONDIT", "SUR LA [RADIO,]", "PUIS IL TOUCHE", "ANN À LA [HANCHE.]"], ["C'EST UNE [MÉTÉORITE]", "DE PRESQUE", "[QUATRE KILOS,]", "VENUE DE [L'ESPACE] !", "ANN A UN", "[ÉNORME BLEU,]", "MAIS ELLE [VA BIEN.]"], ["DES [MILITAIRES]", "EMPORTENT LA [PIERRE]", "POUR [L'ÉTUDIER.]", "[VERDICT] :", "C'EST BIEN UNE", "[MÉTÉORITE] !"], ["MAIS LA", "[PROPRIÉTAIRE]", "DE LA MAISON DIT :", "[CETTE PIERRE]", "EST À [MOI] !", "ELLE VA MÊME", "AU [TRIBUNAL.]"], ["[FINALEMENT,]", "ELLES TROUVENT", "UN [ACCORD,]", "ET ANN [GARDE]", "SA [PIERRE.]", "ELLE DEVIENT", "[CÉLÈBRE,]", "JUSQUE DANS", "LE MAGAZINE", "[LIFE] !"], ["MAIS [PERSONNE]", "NE VEUT [ACHETER]", "LA [PIERRE.]", "ALORS LA FAMILLE", "S'EN SERT POUR", "TENIR SA [PORTE]", "[OUVERTE,]", "AVANT DE", "L'OFFRIR À UN", "[MUSÉE.]"], ["[AUJOURD'HUI,]", "ELLE EST [EXPOSÉE]", "DANS UN [MUSÉE.]", "ANN RESTE LA", "[SEULE PERSONNE]", "CONNUE [TOUCHÉE]", "PAR UNE [MÉTÉORITE.]"], ["ET [TOI,]", "TU [OSERAIS]", "ENCORE FAIRE", "LA [SIESTE]", "SUR TON [CANAPÉ] ?"]]

FX = "highpass=f=80,equalizer=f=3000:t=q:w=1:g=1.5,acompressor=threshold=-24dB:ratio=2.5:attack=5:release=100:makeup=3,aecho=0.8:0.5:60:0.12"
TRIM = "areverse,silenceremove=start_periods=1:start_threshold=-45dB:detection=peak,areverse,silenceremove=start_periods=1:start_threshold=-45dB:detection=peak"
V = "aàâäeéèêëiîïoôöuùûüyœæ"


def words_of(txt): return [w for w in txt.split() if re.search(r'[A-Za-zÀ-ÿœŒ]', w)]


def syl(w):
    w = w.lower(); w = re.sub(r"^[a-z]'", '', w); w = re.sub(r'[^a-zà-ÿœæ]', ' ', w)
    n = 0
    for part in w.split():
        g = len(re.findall('[' + V + ']+', part))
        if g > 1 and re.search(r'(e|es|ent)$', part) and not part.endswith('é'): g -= 1
        n += max(1, g)
    return max(1, n)


def load(path, extra=[]):
    raw = sp.check_output(['ffmpeg', '-v', 'error', '-i', path, *extra, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'])
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def dur(path): return float(sp.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path]))


def segments(x, thr_db=-40, min_gap=1.2):
    hop = int(.01 * SR); e = np.sqrt(np.convolve(x ** 2, np.ones(hop) / hop, 'same')[::hop] + 1e-12); db = 20 * np.log10(e + 1e-9)
    on = db > thr_db; segs = []; i = 0; n = len(on)
    while i < n:
        if on[i]:
            j = i
            while True:
                k = j
                while k < n and on[k]: k += 1
                g = k
                while g < n and not on[g]: g += 1
                if g < n and (g - k) * .01 < min_gap: j = g; continue
                segs.append((i * .01, k * .01)); i = g; break
        else: i += 1
    return segs


def analyse(x):
    """speech islands and syllable nuclei (seconds) of a dry, tempo-adjusted segment"""
    b, a = signal.butter(2, [250 / (SR / 2), 3200 / (SR / 2)], 'band'); y = signal.lfilter(b, a, x)
    hop = int(.005 * SR); e = np.sqrt(np.convolve(y ** 2, np.ones(4 * hop) / (4 * hop), 'same')[::hop] + 1e-12)
    db = 20 * np.log10(e + 1e-9); mx = np.percentile(db, 98)
    on = db > mx - 30; isl = []; i = 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and on[j]: j += 1
            isl.append([i * .005, j * .005]); i = j
        else: i += 1
    merged = []
    for s in isl:
        if merged and s[0] - merged[-1][1] < .11: merged[-1][1] = s[1]
        else: merged.append(s)
    isl = [s + [float(db[int(s[0] / .005):int(s[1] / .005) + 1].max())] for s in merged if s[1] - s[0] > .06]
    for s in isl: s[2] = s[2] - mx
    sm = np.convolve(db, np.ones(5) / 5, 'same')
    pk, _ = signal.find_peaks(sm, prominence=2.5, distance=16, height=mx - 22)
    nuc = [p * .005 for p in pk]
    return isl, nuc


def phrases(txt):
    out = []; cur = []
    for tok in txt.split():
        if re.search(r'[A-Za-zÀ-ÿœŒ]', tok): cur.append(tok)
        if re.search(r'[.,:;!?…]$', tok) or tok == ':':
            if cur: out.append(cur); cur = []
    if cur: out.append(cur)
    return out


def word_times(txt, isl, nuc):
    ph = phrases(txt); W = [w for p in ph for w in p]
    def spread(words, t0, t1):
        s = [syl(w) for w in words]; S = sum(s); out = []; acc = 0
        ns = [n - .04 for n in nuc if t0 - .02 <= n <= t1]
        for si in s:
            t = t0 + (t1 - t0) * acc / S
            if out:
                near = [n for n in ns if abs(n - t) < .09 and n > out[-1] + .05]
                if near: t = min(near, key=lambda n: abs(n - t))
                t = max(t, out[-1] + .06)
            out.append(t); acc += si
        return out
    isl = [list(x) for x in isl if x[2] > -15 or (x[1] - x[0]) > .2]
    ps = [sum(syl(w) for w in p) for p in ph]
    speech = sum(b - a for a, b, _ in isl); rate = speech / sum(ps)
    nP, nI = len(ph), len(isl); INF = 1e9
    best = [[INF] * (nI + 1) for _ in range(nP + 1)]; bk = [[None] * (nI + 1) for _ in range(nP + 1)]; best[0][0] = 0
    for i in range(nP):
        for j in range(nI):
            if best[i][j] >= INF: continue
            for di in range(1, 4):
                for dj in range(1, 5):
                    if i + di > nP or j + dj > nI: continue
                    sy = sum(ps[i:i + di]); d = isl[j + dj - 1][1] - isl[j][0]
                    c = (np.log(max(d, .05) / (sy * rate))) ** 2 * 4 + .35 * (di - 1) + .35 * (dj - 1)
                    if di > 1 and not all(ph[i + q][-1].endswith(',') or ph[i + q][-1].endswith(':') for q in range(di - 1)): c += .4
                    if best[i][j] + c < best[i + di][j + dj]: best[i + di][j + dj] = best[i][j] + c; bk[i + di][j + dj] = (i, j)
    i, j = nP, nI; groups = []
    while (i, j) != (0, 0):
        pi, pj = bk[i][j]; groups.append((pi, i, pj, j)); i, j = pi, pj
    groups.reverse(); T = []
    for pi, i2, pj, j2 in groups:
        words = [w for p in ph[pi:i2] for w in p]
        if i2 - pi == 1 or j2 - pj == 1 and i2 - pi == 1: T += spread(words, isl[pj][0], isl[j2 - 1][1]); continue
        # several phrases in a run of islands: share islands by syllables
        if j2 - pj >= i2 - pi:
            k = pj
            for q in range(pi, i2):
                rem = i2 - q - 1; take = 1 if q < i2 - 1 else (j2 - k)
                if q < i2 - 1:
                    tot = sum(ps[q:i2]); acc = 0; take = 1
                    while k + take < j2 - rem and (isl[k + take - 1][1] - isl[k][0]) < ps[q] * rate * .8: take += 1
                T += spread(ph[q], isl[k][0], isl[k + take - 1][1]); k += take
        else: T += spread(words, isl[pj][0], isl[j2 - 1][1])
    return W, T, 'dp'


def main():
    src, od = sys.argv[1], sys.argv[2]; os.makedirs(od, exist_ok=True)
    full = load(src); segs = json.load(open(os.environ['SEGS'])) if os.environ.get('SEGS') else segments(full)
    print('segments found', len(segs), [(round(a, 2), round(b, 2)) for a, b in segs])
    assert len(segs) == len(TEXT), 'segment count mismatch'
    plan = []; caps = []; prev = 0
    for k, ((a, b), txt, ch) in enumerate(zip(segs, TEXT, CAPS)):
        s0 = SLOTS[k]; s1 = SLOTS[k + 1] if k + 1 < len(SLOTS) else 56.18
        raw = f'{od}/r{k:02d}.wav'
        sp.check_call(['ffmpeg', '-v', 'error', '-y', '-ss', str(max(0, a - .05)), '-to', str(b + .25), '-i', src, '-af', TRIM, '-ar', '44100', '-ac', '1', raw])
        d0 = dur(raw); st = max(s0 + (.15 if k == 0 else .1), prev + .15); avail = s1 - st - .08 + (.45 if k == 0 else 0)
        tempo = min(1.3 if k == len(TEXT) - 1 else 1.2, max(1.0, d0 / avail))
        dry = f'{od}/d{k:02d}.wav'; out = f'{od}/s{k:02d}.wav'
        sp.check_call(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', f'atempo={tempo:.3f}', '-ar', '44100', '-ac', '1', dry])
        sp.check_call(['ffmpeg', '-v', 'error', '-y', '-i', dry, '-af', FX, '-ar', '44100', '-ac', '2', out])
        d = dur(dry); plan.append((out, st, d)); prev = st + d
        isl, nuc = analyse(load(dry)); W, T, mode = word_times(txt, isl, nuc)
        # captions
        i = 0; nxt = SLOTS[k + 1] - .05 if k + 1 < len(SLOTS) else 60
        cw = [[w for w in c.split() if re.search(r'[A-Za-zÀ-ÿ]', w)] for c in ch]
        assert sum(map(len, cw)) == len(W), (k, sum(map(len, cw)), len(W), W)
        starts = []
        for words in cw: starts.append([st + T[i + j] - .03 for j in range(len(words))]); i += len(words)
        for j, c in enumerate(ch):
            a2 = starts[j][0]; b2 = starts[j + 1][0] if j + 1 < len(ch) else min(nxt, st + d + .6)
            caps.append([round(a2, 3), round(b2, 3), c, [round(x, 3) for x in starts[j]]])
        caps[-1][1] = round(st + d + .5, 3)
        print(k, mode, 'start', round(st, 2), 'dur', round(d, 2), 'tempo', round(tempo, 2), 'islands', len(isl), 'phrases', len(phrases(txt)), 'nuclei', len(nuc), 'syl', sum(syl(w) for w in W))
    json.dump(plan, open(f'{od}/plan.json', 'w')); json.dump(caps, open(f'{od}/caps.json', 'w'), ensure_ascii=False)


if __name__ == '__main__': main()
