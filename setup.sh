# Prépare l'espace de travail /home/claude/chaise à partir du dépôt (à lancer au début de chaque exécution)
set -e; R=/home/claude/tobby-pipeline; mkdir -p /home/claude/chaise; cp -r $R/pipeline/. /home/claude/chaise/; echo "espace prêt"
