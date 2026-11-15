# assemble ep.html à partir de base.html + helpers + lib_x.js + scenes_x.js (épisode) ; vérifie les sous-titres
cd /home/claude/chaise && { sed -n 1,5p base.html; echo '<script src="bounds.js"></script>'; sed -n 6,\$p base.html; cat helpers.js pixel.js stars_line.js sweat.js rd.js head.js; echo 'const B=window.BOUNDS;'; cat lib_x.js scenes_x.js; } > ep.html && node chk.js
