# Developer environment notes (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

ఈ పేజీ OmniRouteను అభివృద్ధి చేస్తున్నప్పుడు ప్రాజెక్ట్ యొక్క స్థానిక `.env` ప్రవర్తనను, అలాగే పర్యావరణ ఫైళ్లు మరియు రహస్యాలను ఎలా నిర్వహించాలో వివరిస్తుంది.

## .env postinstall ప్రవర్తన

డెవలపర్ సౌలభ్యం కోసం ప్రాజెక్ట్ `npm install` / `postinstall` సమయంలో స్థానిక `.env` ఫైల్ను రూపొందించవచ్చు. ఈ ఫైల్ స్థానిక అభివృద్ధి మరియు పరీక్షల కోసం మాత్రమే ఉద్దేశించబడింది; దీన్ని ఎట్టి పరిస్థితుల్లోనూ వెర్షన్ నియంత్రణకు కమిట్ చేయకూడదు.

ముఖ్యాంశాలు:

- రిపోజిటరీ యొక్క `.gitignore` ఇప్పటికే `.env*` ఫైళ్లను విస్మరిస్తుంది (`.gitignore` ఎంట్రీని చూడండి). ఒక నిర్దిష్ట ఉదాహరణ ఫైల్ను కమిట్ చేయాలని మీరు ఉద్దేశపూర్వకంగా నిర్ణయించుకుని, దాని కోసం డాక్యుమెంట్ చేసిన ప్రక్రియను కలిగి ఉంటే తప్ప, ఆ నియమాన్ని తొలగించవద్దు లేదా మార్చవద్దు.
- నిజమైన రహస్యం పొరపాటున రిపోకు కమిట్ చేయబడితే, ఆ క్రెడెన్షియల్ను వెంటనే రొటేట్ చేయండి/ఉపసంహరించండి మరియు రిపోజిటరీ చరిత్ర నుండి దాన్ని తొలగించండి (ఉదాహరణకు, `git filter-repo` లేదా సమానమైన పరిష్కార వర్క్ఫ్లోను ఉపయోగించి). మీకు సహాయం అవసరమైతే భద్రత/సంప్రదింపు బాధ్యుడిని సంప్రదించండి.
- CI మరియు ప్రొడక్షన్ కోసం, రహస్యాలను ఫైళ్లకు కమిట్ చేయడానికి బదులుగా CI రహస్యాలు లేదా సీక్రెట్స్ మేనేజర్ను (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault మొదలైనవి) ఉపయోగించండి.

## సిఫార్సు చేయబడిన స్థానిక వర్క్ఫ్లో

- `.env`ను మీ స్థానిక వర్క్స్పేస్లో మాత్రమే ఉంచండి. అవసరమైన వేరియబుల్స్ మరియు ఆమోదయోగ్యమైన ఉదాహరణ విలువలను డాక్యుమెంట్ చేయడానికి `.env.example`ను (ఇప్పటికే ట్రాక్ చేయబడుతోంది) ఉపయోగించండి.
- రహస్యాలలాంటి విలువలు అవసరమయ్యే పరీక్షలను స్థానికంగా అమలు చేస్తున్నప్పుడు, నిజమైన క్రెడెన్షియల్స్కు బదులుగా సింథటిక్ ప్లేస్హోల్డర్లు లేదా రన్టైమ్లో రూపొందించిన తాత్కాలిక కీలను ఉపయోగించడం ఉత్తమం.
- ప్లేస్హోల్డర్లను ఉపయోగించే పరీక్షల్లో చిన్న వ్యాఖ్యను జోడించండి, తద్వారా ఆ ఫిక్చర్ సింథటిక్ అని సమీక్షకులు అర్థం చేసుకోగలరు.

## స్కానర్ గమనికలు

- కొన్ని కంపైల్ చేసిన లేదా బైనరీ అసెట్లు (ఉదా., పొందుపరిచిన base64 WASM బ్లాబ్లు) క్రెడెన్షియల్స్లా కనిపించే ASCII ఉపస్ట్రింగ్లను కలిగి ఉండవచ్చు మరియు టెక్స్ట్-ఆధారిత సీక్రెట్ స్కానర్లను ప్రేరేపించవచ్చు. ఈ అసెట్లు చెల్లుబాటు అయ్యేవైతే, వాటిని స్కానర్ అనుమతి జాబితాలో గుర్తించండి లేదా స్కానర్ కాన్ఫిగరేషన్లో ఆ డైరెక్టరీలను మినహాయించండి.

## లీక్ను కనుగొంటే

1. కీని వెంటనే రొటేట్ చేయండి/ఉపసంహరించండి.
2. చరిత్ర నుండి రహస్యాన్ని తొలగించి, అవసరమైతే శుభ్రపరిచిన బ్రాంచ్ను ఫోర్స్-పుష్ చేయండి.
3. నిర్వహకులకు తెలియజేసి, మీ సంస్థ యొక్క సంఘటన ప్రతిస్పందన చెక్లిస్ట్ను అనుసరించండి.
