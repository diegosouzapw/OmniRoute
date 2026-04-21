# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

ఈ గైడ్**OmniRoute**ని రక్షించడానికి మరియు**ఏ పోర్ట్‌లను తెరవకుండానే మీ అప్లికేషన్‌ను ఇంటర్నెట్‌కి సురక్షితంగా బహిర్గతం చేయడానికి నెట్‌వర్క్ మౌలిక సదుపాయాల బంగారు ప్రమాణాన్ని డాక్యుమెంట్ చేస్తుంది (జీరో ఇన్‌బౌండ్)**.## What was done on your VM?

మేము PM2 ద్వారా**స్ప్లిట్-పోర్ట్**మోడ్‌లో OmniRouteని ప్రారంభించాము:

-**పోర్ట్ `20128`:\*\***మాత్రమే API**`/v1`ని అమలు చేస్తుంది. -**పోర్ట్ `20129`:\***\*అడ్మినిస్ట్రేటివ్ డ్యాష్‌బోర్డ్**మాత్రమే నడుస్తుంది.

ఇంకా, అంతర్గత సేవకు `REQUIRE_API_KEY=true` అవసరం, అంటే డాష్‌బోర్డ్ API కీస్ ట్యాబ్‌లో రూపొందించబడిన చట్టబద్ధమైన "బేరర్ టోకెన్"ని పంపకుండా ఏ ఏజెంట్ కూడా API ముగింపు పాయింట్‌లను వినియోగించలేరు.

ఇది రెండు పూర్తిగా స్వతంత్ర నెట్‌వర్క్ నియమాలను రూపొందించడానికి అనుమతిస్తుంది. ఇక్కడే**క్లౌడ్‌ఫ్లేర్ టన్నెల్ (క్లౌడ్‌ఫ్లేర్డ్)**వస్తుంది.---

## 1. How to Create the Tunnel in Cloudflare

మీ మెషీన్‌లో `క్లౌడ్‌ఫ్లేర్డ్` యుటిలిటీ ఇప్పటికే ఇన్‌స్టాల్ చేయబడింది. క్లౌడ్‌లో ఈ దశలను అనుసరించండి:

1. మీ**క్లౌడ్‌ఫ్లేర్ జీరో ట్రస్ట్**డాష్‌బోర్డ్‌ను (one.dash.cloudflare.com) యాక్సెస్ చేయండి.
2. ఎడమవైపు మెనులో,**నెట్‌వర్క్‌లు > టన్నెల్స్**కి వెళ్లండి. 3.**యాడ్ ఎ టన్నెల్**పై క్లిక్ చేసి,**క్లౌడ్‌ఫ్లేర్డ్**ని ఎంచుకుని, దానికి `ఓమ్నీరూట్-VM` అని పేరు పెట్టండి.
3. ఇది స్క్రీన్‌పై "కనెక్టర్‌ను ఇన్‌స్టాల్ చేసి రన్ చేయి" అనే కమాండ్‌ను ఉత్పత్తి చేస్తుంది.**మీరు టోకెన్‌ను మాత్రమే కాపీ చేయాలి (`--టోకెన్` తర్వాత పొడవైన స్ట్రింగ్)**.
4. SSH ద్వారా మీ వర్చువల్ మెషీన్ (లేదా Proxmox టెర్మినల్)కి లాగిన్ చేసి, అమలు చేయండి: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

ఇప్పటికీ కొత్తగా సృష్టించబడిన టన్నెల్ స్క్రీన్‌పై,**పబ్లిక్ హోస్ట్ పేర్లు**ట్యాబ్‌కి వెళ్లి, మేము చేసిన విభజన ప్రయోజనాన్ని పొందుతూ**రెండు**మార్గాలను జోడించండి:### Route 1: Secure API (Limited)

-**సబ్‌డొమైన్:**`api` -**డొమైన్:**`yourglobal.com` (మీ నిజమైన డొమైన్‌ని ఎంచుకోండి) -**సేవా రకం:**`HTTP` -**URL:**`127.0.0.1:20128` _(అంతర్గత API పోర్ట్)_### Route 2: Zero Trust Dashboard (Closed)

-**సబ్‌డొమైన్:**`ఓమ్నిరౌట్` లేదా `ప్యానెల్` -**డొమైన్:**`yourglobal.com` -**సేవా రకం:**`HTTP` -**URL:**`127.0.0.1:20129` _(అంతర్గత యాప్/విజువల్ పోర్ట్)_

ఈ సమయంలో, "భౌతిక" కనెక్టివిటీ పరిష్కరించబడుతుంది. ఇప్పుడు దానిని నిజంగా రక్షిద్దాం.---

## 3. Shielding the Dashboard with Zero Trust (Access)

ఓపెన్ ఇంటర్నెట్ నుండి యాక్సెస్‌ని పూర్తిగా తీసివేయడం కంటే మీ డాష్‌బోర్డ్‌ను ఏ స్థానిక పాస్‌వర్డ్ కూడా మెరుగ్గా రక్షించదు.

1. జీరో ట్రస్ట్ డ్యాష్‌బోర్డ్‌లో,**యాక్సెస్ > అప్లికేషన్స్ > యాడ్ యాన్ అప్లికేషన్**కి వెళ్లండి. 2.**స్వీయ-హోస్ట్**ని ఎంచుకోండి. 3.**అప్లికేషన్ పేరు**లో, `OmniRoute Panel`ని నమోదు చేయండి. 4.**అప్లికేషన్ డొమైన్**లో, `omniroute.yourglobal.com` (మీరు "రూట్ 2"లో ఉపయోగించినది) ఎంటర్ చేయండి. 5.**తదుపరి**క్లిక్ చేయండి. 6.**రూల్ యాక్షన్**లో, `అనుమతించు` ఎంచుకోండి. నియమం పేరు కోసం, `అడ్మిన్ మాత్రమే` నమోదు చేయండి. 7.**చేర్చండి**లో, "సెలెక్టర్" డ్రాప్‌డౌన్ కింద, `ఇమెయిల్స్`ని ఎంచుకుని, మీ ఇమెయిల్‌ని టైప్ చేయండి, ఉదాహరణకు `admin@spgeo.com.br`.
2. సేవ్ చేయండి (`అప్లికేషన్‌ను జోడించు`).

> **ఇది ఏమి చేసింది:**మీరు `omniroute.yourglobal.com`ని తెరవడానికి ప్రయత్నిస్తే, అది ఇకపై మీ OmniRoute అప్లికేషన్‌లో ల్యాండ్ చేయబడదు! ఇది మీ ఇమెయిల్‌ను నమోదు చేయమని కోరుతూ సొగసైన క్లౌడ్‌ఫ్లేర్ స్క్రీన్‌పైకి వస్తుంది. మీరు (లేదా మీరు నమోదు చేసిన ఇమెయిల్) అక్కడ టైప్ చేసినట్లయితే, మీరు Outlook/Gmailలో తాత్కాలికంగా 6-అంకెల కోడ్‌ని అందుకుంటారు, అది టన్నెల్‌ను పోర్ట్ `20129`కి అన్‌లాక్ చేస్తుంది.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

జీరో ట్రస్ట్ డాష్‌బోర్డ్ API మార్గానికి (`api.yourglobal.com`) వర్తించదు, ఎందుకంటే ఇది బ్రౌజర్ లేకుండా ఆటోమేటెడ్ టూల్స్ (ఏజెంట్‌లు) ద్వారా ప్రోగ్రామాటిక్ యాక్సెస్. దీని కోసం, మేము Cloudflare యొక్క ప్రధాన ఫైర్‌వాల్ (WAF)ని ఉపయోగిస్తాము.

1.**సాధారణ క్లౌడ్‌ఫ్లేర్ డాష్‌బోర్డ్**(dash.cloudflare.com)ని యాక్సెస్ చేసి, మీ డొమైన్‌కి వెళ్లండి. 2. ఎడమవైపు మెనులో,**సెక్యూరిటీ > WAF > రేట్ లిమిటింగ్ రూల్స్**కి వెళ్లండి. 3.**రూల్‌ని సృష్టించు**పై క్లిక్ చేయండి. 4.**పేరు:**`OmniRoute API యాంటీ దుర్వినియోగం` 5.**ఇన్‌కమింగ్ అభ్యర్థనలు సరిపోలితే...**

- ఫీల్డ్‌ని ఎంచుకోండి: `హోస్ట్‌నేమ్`
- ఆపరేటర్: `సమానం`
- విలువ: `api.yourglobal.com`

6. కింద**అదే లక్షణాలతో:**`IP`ని ఉంచండి.
7. పరిమితుల కోసం (పరిమితి): -**అభ్యర్థనలు మించినప్పుడు:**`50` -**వ్యవధి:**`1 నిమిషం`
8. చివరలో,**యాక్షన్**కింద: `బ్లాక్` మరియు బ్లాక్ 1 నిమిషం లేదా 1 గంట పాటు కొనసాగుతుందో లేదో నిర్ణయించండి. 9.**నియోగించు**.

> **ఇది ఏమి చేసింది:**మీ API URLకి 60 సెకన్ల వ్యవధిలో ఎవరూ 50 కంటే ఎక్కువ అభ్యర్థనలను పంపలేరు. మీరు బహుళ ఏజెంట్‌లను నడుపుతున్నారు మరియు వాటి వెనుక వినియోగం ఇప్పటికే రేట్ పరిమితులను తాకింది మరియు టోకెన్‌లను ట్రాక్ చేస్తుంది కాబట్టి, ఇది ఇంటర్నెట్ ఎడ్జ్ లేయర్‌లో ఒక కొలమానం, ఇది ట్రాఫిక్ టన్నెల్‌లోకి వెళ్లే ముందు ఉష్ణ ఒత్తిడి కారణంగా మీ ఆన్-ప్రిమిసెస్ ఇన్‌స్టాన్స్‌ను రక్షిస్తుంది.---

## Finalization

1. `/etc/ufw`లో మీ VM**బహిర్గతమైన పోర్ట్‌లు ఏవీ లేవు**.
2. OmniRoute HTTPS అవుట్‌బౌండ్ (`క్లౌడ్‌ఫ్లార్డ్`) గురించి మాత్రమే మాట్లాడుతుంది మరియు ప్రపంచం నుండి ప్రత్యక్ష TCPని అందుకోదు.
3. OpenAIకి మీ అభ్యర్థనలు అస్పష్టంగా ఉన్నాయి, ఎందుకంటే మేము వాటిని SOCKS5 ప్రాక్సీ గుండా వెళ్ళడానికి ప్రపంచవ్యాప్తంగా కాన్ఫిగర్ చేసాము (క్లౌడ్ SOCKS5 గురించి పట్టించుకోదు ఎందుకంటే ఇది ఇన్‌బౌండ్ అవుతుంది).
4. మీ వెబ్ డ్యాష్‌బోర్డ్ ఇమెయిల్‌తో 2-ఫాక్టర్ ప్రమాణీకరణను కలిగి ఉంది.
5. మీ API Cloudflare ద్వారా అంచు వద్ద రేట్-పరిమితం చేయబడింది మరియు బేరర్ టోకెన్‌లను మాత్రమే ట్రాఫిక్ చేస్తుంది.
