import sys
from PIL import Image
out=sys.argv[1];ts=sys.argv[2:];w,h=240,427;c=6;r=(len(ts)+c-1)//c
s=Image.new('RGB',(w*c,h*r))
for i,t in enumerate(ts):s.paste(Image.open(f'/home/claude/chaise/p_{float(t):g}.jpg').resize((w,h)),((i%c)*w,(i//c)*h))
s.save(out,quality=80)
