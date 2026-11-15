# PROCÉDURE QUOTIDIENNE — Tobby / "Et si… ?" (compte TikTok you_tube_repost)

Exécutée chaque jour par une tâche planifiée (session vierge). Objectif : 1 vidéo TikTok 9:16 par jour, publiée à 18h00 (Europe/Paris) via Metricool, 100 % autonome.

## Règles de l'utilisateur (priorité absolue)
- RÈGLE 1 : respecter exactement le type déjà demandé : format « Et si… ? » = histoire VRAIE d'une personne réelle, racontée avec son histoire, 50–60 s, mascotte Tobby (tête ronde, gros yeux, pas de nez, sweat gris), 9:16, compteur en haut SOUS la barre TikTok (y ≈ 84–126 px sur 360x640), scènes qui changent toutes les 2–3 s, sous-titres mot à mot calés sur la voix (mots clés en rouge), voix ElevenLabs « Hugo » (3Tp5mYhT9wrfnry9pzvV, modèle eleven_v4). Ne pas inventer un autre type de contenu. Optimiser qualité et potentiel TikTok DANS ce type.
- Texte loin des boutons à droite et de la description en bas. Pas de longs blancs entre phrases.
- Sujets : faits réels vérifiables (WebSearch), non violents / non sensibles (pas de suicide, mort graphique, politique, religion ; éviter les mots qui déclenchent la modération). Voir HISTORIQUE.md : ne jamais répéter une histoire.
- RÈGLE 2 : problème temporaire → réessayer ; corrigeable → corriger ; persistant → essayer d'autres solutions raisonnables. Si impossible après plusieurs tentatives sérieuses : ARRÊTER, ne jamais publier une vidéo défectueuse ni dégrader la qualité, garder tous les fichiers, puis envoyer à l'utilisateur (SendUserMessage, en français) : problème précis, solutions essayées, pourquoi ça bloque, ce qu'il faut pour continuer. Ne pas boucler à l'infini.
- Autonomie 100 % : ne contacter l'utilisateur que pour un blocage réel.
- Communication : français, concise.
- Le jour d'une publication réussie : commit des fichiers + mise à jour de HISTORIQUE.md.

## Étapes
1. `bash /home/claude/tobby-pipeline/setup.sh` (copie pipeline/ dans /home/claude/chaise). Les chemins sont codés en dur sur /home/claude/chaise.
2. Choisir une histoire vraie nouvelle (WebSearch, 2 sources). Écrire le script : 8–11 paragraphes, ~1000–1100 caractères, ~190–200 mots, phrases courtes, accroche forte à la première phrase, fin ouverte/boucle. Éviter les mots isolés très longs (>~13 lettres) dans un même sous-titre (chk.js les rejette).
3. Créer script.json {"TEXT":[...], "CAPS":[[...]]} (mots clés rouges entre [crochets]) puis `python3 -I set_script.py script.json` (dans /home/claude/chaise) : valide mots TEXT == mots CAPS.
4. Crédits ElevenLabs : `account_get_usage`. Il faut ≥ ~1100 caractères restants. Sinon → RÈGLE 2 (stop + message : plan gratuit 10 000 car./mois, reset ~25 du mois ; besoin d'un plan payant ou d'une autre voix). Ne pas utiliser une autre voix sans accord.
5. Voix : creative_create_flow + creative_generate_speech (voix Hugo, eleven_v4, generations_count=1, texte = texte_voix.txt) ; creative_get_generations → full_res_url → télécharger en /home/claude/chaise/voix.mp3 (curl avec le proxy, domaine elevenlabsusercontent.com OK). Si « busy » : attendre et réessayer plus tard (non facturé).
6. Transcription : creative_transcribe_audio (eleven_scribe_v1, connect_from le node de la voix) → creative_get_flow_run_status → télécharger le JSON mots → /home/claude/chaise/scribe.json.
7. Scènes : écrire scenes_x.js (épisode) en s'inspirant de episodes/roy_sullivan/scenes_x.js : utilise lib_x.js (ciel, nuages, foudre, voiture, maison, pins, etc.), compteur/HUD en haut, 1 scène par paragraphe (DUR/WT/sceneOf), window.frame(i), READY. Écrire audio_x.py (ambiances/sons) en s'inspirant de l'épisode Roy. Tobby : gros yeux, sans nez, sweat gris ; ne pas laisser de personnage sous un véhicule (déjà corrigé dans lib_x.js carR).
8. `bash build_after_voice.sh NomEpisode.mp4` (timing depuis Scribe, audio, ep.html + chk.js, rendu 2 processus, ffmpeg). Doit afficher « captions à problème: [] » et toutes les images.
9. Contrôle qualité OBLIGATOIRE : durée 50–62 s ; extraire ~12 images (ffmpeg) et les regarder (Read) : compteur visible, sous-titres sans débordement, personnages corrects ; niveau audio (ffmpeg volumedetect, max < -0.3 dB) ; sous-titres calés. Défaut → corriger + re-rendre ; irréparable → RÈGLE 2.
10. Publication : copier la vidéo dans le dépôt `videos/AAAA-MM-JJ_nom.mp4`, `git add/commit/push` sur main (attribution en fin de commit), vérifier l'URL `https://raw.githubusercontent.com/wmprrkb8ng-oss/tobby-pipeline/main/videos/<fichier>` (curl -I → 200, content-type video). Puis Metricool `createScheduledPost` : blogId 7582881, réseau tiktok, publicationDate = aujourd'hui 18:00 Europe/Paris, media = URL ci-dessus, text = TITRE + hashtags (titre accrocheur « Et si… ? » + 4–6 hashtags : #etsi #histoirevraie #faitsreels #incroyable #apprendresurtiktok + 1–2 spécifiques), firstCommentText = commentaire à épingler (question d'engagement), tiktokData : privacyOption PUBLIC_TO_EVERYONE, isAigc true (voix synthétique), autoPublish true. Vérifier avec getScheduledPosts que le post est bien programmé à 18:00.
11. HISTORIQUE.md : ajouter date, histoire, titre, hashtags, caractères ElevenLabs utilisés, id Metricool. Commit + push.
12. Message final à l'utilisateur via SendUserMessage : 3–4 lignes (histoire, heure de publication, titre/hashtags dans UN bloc à copier).

## Rapport de 10h
Tâche séparée : lire HISTORIQUE.md (dernière entrée) + Metricool (getAnalyticsAvailableMetrics puis getAnalyticsDataByMetrics, réseau tiktok, « posts », vues/likes/commentaires/partages de la vidéo de la veille et tendance), vérifier getScheduledPosts (publié ? erreur ?). Envoyer un compte rendu concis en français via SendUserMessage : titre, statut de publication, chiffres, ce qui marche/ne marche pas, crédits ElevenLabs restants, une suggestion DANS le même format (jamais de nouveau type).
