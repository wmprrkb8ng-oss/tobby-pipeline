import json
T=[
"Et si tu restais éveillé onze jours de suite ? C'est arrivé à un vrai lycéen : Randy Gardner.",
"Californie, décembre mille neuf cent soixante trois. Randy a dix sept ans, et un défi fou : battre le record du monde de veille.",
"Le record est de deux cent soixante heures. Alors Randy ne dort plus. Ses deux amis restent près de lui, pour le garder éveillé.",
"Dès le troisième jour, il a la nausée. Il oublie tout, et se fâche pour un rien.",
"Un chercheur du sommeil vient de l'université de Stanford pour le surveiller. Ils jouent au basket, et au flipper, pour tenir.",
"Le dixième jour, Randy bat le chercheur au flipper !",
"Le onzième jour, on lui demande de retirer sept, en partant de cent. Arrivé à soixante cinq, il s'arrête : il a oublié ce qu'il faisait.",
"Mais il tient : deux cent soixante quatre heures, onze jours entiers. C'est un nouveau record du monde !",
"Alors il dort enfin : quatorze heures d'affilée. Au réveil, les médecins le trouvent en bonne santé.",
"Et son record a été battu la même année.",
"Et toi, tu tiendrais combien d'heures sans dormir ?"]
C=[
["ET SI TU RESTAIS","[ÉVEILLÉ]","[ONZE JOURS]","DE SUITE ?","C'EST ARRIVÉ","À UN [VRAI LYCÉEN] :","[RANDY GARDNER.]"],
["[CALIFORNIE,]","[DÉCEMBRE]","[MILLE NEUF CENT]","[SOIXANTE TROIS.]","RANDY A","[DIX SEPT ANS,]","ET UN [DÉFI FOU] :","BATTRE LE [RECORD]","DU MONDE","DE [VEILLE.]"],
["LE [RECORD]","EST DE","[DEUX CENT SOIXANTE]","[HEURES.]","ALORS RANDY","NE [DORT] PLUS.","SES DEUX [AMIS]","RESTENT PRÈS","DE LUI,","POUR LE GARDER","[ÉVEILLÉ.]"],
["DÈS LE","[TROISIÈME JOUR,]","IL A LA [NAUSÉE.]","IL [OUBLIE] TOUT,","ET SE [FÂCHE]","POUR UN RIEN."],
["UN [CHERCHEUR]","DU [SOMMEIL]","VIENT DE","L'UNIVERSITÉ","DE [STANFORD]","POUR LE","[SURVEILLER.]","ILS JOUENT","AU [BASKET,]","ET AU [FLIPPER,]","POUR TENIR."],
["LE [DIXIÈME JOUR,]","RANDY [BAT]","LE CHERCHEUR","AU [FLIPPER] !"],
["LE [ONZIÈME JOUR,]","ON LUI DEMANDE","DE [RETIRER SEPT,]","EN PARTANT","DE [CENT.]","ARRIVÉ À","[SOIXANTE CINQ,]","IL S'ARRÊTE :","IL A [OUBLIÉ]","CE QU'IL FAISAIT."],
["MAIS IL [TIENT] :","[DEUX CENT]","[SOIXANTE QUATRE]","[HEURES,]","[ONZE JOURS]","ENTIERS.","C'EST UN NOUVEAU","[RECORD]","DU [MONDE] !"],
["ALORS IL","[DORT] ENFIN :","[QUATORZE HEURES]","D'AFFILÉE.","AU RÉVEIL,","LES [MÉDECINS]","LE TROUVENT","EN [BONNE SANTÉ.]"],
["ET SON [RECORD]","A ÉTÉ [BATTU]","LA MÊME [ANNÉE.]"],
["ET [TOI,]","TU TIENDRAIS","[COMBIEN]","[D'HEURES]","SANS [DORMIR] ?"]]
json.dump({"TEXT":T,"CAPS":C},open('script.json','w'),ensure_ascii=False)
