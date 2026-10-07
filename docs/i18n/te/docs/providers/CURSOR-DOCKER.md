# Cursor Provider in Docker Environments (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute Docker లో రన్ అవుతున్నప్పుడు, కంటైనర్కు హోస్ట్లోని Cursor
ఇన్స్టాలేషన్ కనిపించదు కాబట్టి పాత **Cursor IDE నుండి దిగుమతి** /
`cursor-agent` ప్రవాహాలు విఫలమవుతాయి. బదులుగా **Cursorతో లాగిన్ చేయండి**
(deep-control PKCE).

## Dockerలో IDE / CLI దిగుమతి ఎందుకు విఫలమవుతుంది

1. **ఫైల్సిస్టమ్ వేరుచేయడం** — ఆటో-ఇంపోర్ట్ కంటైనర్ _లోపల_
   `~/.config/Cursor/User/globalStorage/state.vscdb` వంటి Linux పాత్ల కోసం
   వెతుకుతుంది. macOS కోసం Docker Desktopలో హోస్ట్ IDE DB డిఫాల్ట్గా మౌంట్
   చేయబడదు. అంతేకాకుండా, హోస్ట్ Darwin అయినప్పటికీ కంటైనర్ OS Linuxగానే ఉంటుంది.
2. **`cursor-agent` బైనరీ లేదు** — అధికారిక OmniRoute ఇమేజ్లలో
   `cursor-agent` ఉండదు. గతంలో అందుబాటులో ఉన్న మోడళ్ల కోసం
   `cursor-agent --list-models` అమలు చేసి, అది విఫలమైతే స్థిరమైన కేటలాగ్కు
   ఫాల్బ్యాక్ అయ్యేది.
3. **తప్పు బైనరీ** — macOS `cursor-agent`ను Linux కంటైనర్లోకి
   bind-mount **చేయవద్దు**. అది అమలు కాదు.

## సిఫార్సు చేయబడింది: Cursorతో లాగిన్ చేయండి

1. **డ్యాష్బోర్డ్ → ప్రొవైడర్లు → Cursor** తెరవండి.
2. **Cursorతో లాగిన్ చేయండి** ట్యాబ్ను ఎంచుకోండి.
3. **Cursorతో లాగిన్ చేయండి** క్లిక్ చేయండి — OmniRoute మీ **హోస్ట్**
   బ్రౌజర్లో `https://cursor.com/loginDeepControl?…`ను తెరుస్తుంది.
4. బ్రౌజర్లో లాగిన్ను ఆమోదించి, ఆపై డ్యాష్బోర్డ్కు తిరిగి వెళ్లండి.
   టోకెన్లు అందేవరకు OmniRoute `api2.cursor.sh/auth/poll`ను పోల్ చేస్తుంది.
5. OmniRoute **యాక్సెస్ + రిఫ్రెష్** టోకెన్లను నిల్వ చేసి, వాటిని
   `https://api2.cursor.sh/auth/exchange_user_api_key` ద్వారా రిఫ్రెష్ చేస్తుంది.

ఈ పద్ధతికి కంటైనర్ లోపల Cursor IDE లేదా `cursor-agent` అవసరం లేదు.

## మోడల్ అన్వేషణ

లాగిన్ చేసిన కనెక్షన్ ఉన్నప్పుడు, **అందుబాటులో ఉన్న మోడళ్లు / ఆటో-సింక్**
కనెక్షన్ bearer టోకెన్ను ఉపయోగించి Cursor యొక్క HTTP
`AiService/AvailableModels` కేటలాగ్కు ప్రాధాన్యం ఇస్తుంది. అది విఫలమైతే,
OmniRoute ఇప్పటికీ హోస్ట్లోని `cursor-agent`ను (అందుబాటులో ఉన్నప్పుడు)
ప్రయత్నించి, ఆపై స్థిరమైన రిజిస్ట్రీ సీడ్కు ఫాల్బ్యాక్ అవుతుంది.

OmniRoute కేటలాగ్లో ఎల్లప్పుడూ **`auto`**ను (ప్రదర్శన పేరు “Auto”), అలాగే
OpenCodex-శైలి రౌటర్ మోడ్లు **`auto-cost`**, **`auto-balance`**, మరియు
**`auto-intelligence`**ను అందుబాటులో ఉంచుతుంది. వైర్పై ఇవి Cursor యొక్క
`default` మోడల్కు మ్యాప్ అవుతాయి (మూడు వేరియంట్లకు `optimization`
ModelParameterతో). ప్రీమియం మోడళ్ల వినియోగ పరిమితి అయిపోయినప్పుడు
`cu/auto`కు ప్రాధాన్యం ఇవ్వండి — Autoలో తరచుగా ఇంకా బడ్జెట్ ఉంటుంది.

### సింక్ చేసినప్పుడు లైవ్ కేటలాగ్ మాత్రమే ఉపయోగించబడుతుంది

Cursor మోడల్ సింక్ విజయవంతమైన తర్వాత (`cursor-agent --list-models` →
నిల్వ చేయబడిన సింక్ కేటలాగ్, లేదా పైన పేర్కొన్న bearer-ప్రమాణీకరించిన
`AvailableModels` ఫెచ్), **డ్యాష్బోర్డ్**, **`/v1/models`**, మరియు
**అన్నింటినీ పరీక్షించండి** వీటిని జాబితా చేస్తాయి:

1. లైవ్ సింక్ తిరిగి ఇచ్చిన మోడళ్లు
2. చేర్చబడిన ఆటో-రౌటర్ idలు: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ఆపరేటర్ **కస్టమ్** మోడళ్లు (దిగుమతి / మాన్యువల్) — సింక్ ద్వారా ఎన్నడూ తొలగించబడవు

`open-sse/config/providers/registry/cursor/` కింద ఉన్న పెద్ద స్థిరమైన రిజిస్ట్రీ
**ఆఫ్లైన్ ఫాల్బ్యాక్ కోసం మాత్రమే**. సింక్ ఖాళీగా ఉన్నప్పుడు (లేదా అన్వేషణ
విఫలమైనప్పుడు), జాబితా ఆ రిజిస్ట్రీకి ఫాల్బ్యాక్ అవుతుంది.

ఎఫర్ట్-సఫిక్స్ ఉన్న idలను (ఉదాహరణకు `claude-4.6-sonnet-high`) రన్టైమ్లో
ఇప్పటికీ **అభ్యర్థించవచ్చు**: `resolveRequestedModel` సఫిక్స్ను తీసివేసి,
దానిని వైర్ `ModelParameter`గా మారుస్తుంది. ప్రత్యేక జాబితా ఆ స్థిరమైన
వేరియంట్లను అన్నింటినీ పరీక్షించండి నుండి ఉద్దేశపూర్వకంగా దాచుతుంది, తద్వారా
ప్రోబ్లు Cursor వాస్తవంగా అందుబాటులో ఉన్నట్లు తిరిగి ఇచ్చే వాటికి సరిపోతాయి.

### సహాయకాలు

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — డ్యాష్బోర్డ్ విలీనం
- `ensureCursorAutoCatalogEntry` — అన్వేషణ + జాబితా సమయంలో auto* చేర్పు
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` స్థిరమైన లూప్

## ప్రొవైడర్ పరిమితులు (కోటా)

PKCE లేదా టోకెన్ దిగుమతి తర్వాత Cursor కోసం **వినియోగం → ప్రొవైడర్ పరిమితులు**
`api2.cursor.sh`లోని Bearer APIలను (`GetCurrentPeriodUsage` → వినియోగ సారాంశం
→ auth/usage) ఉపయోగిస్తుంది. పాత IDE-దిగుమతి సెషన్ల కోసం లెగసీ
cookie/`cursor.com` డ్యాష్బోర్డ్ పద్ధతి చివరి ఫాల్బ్యాక్గా కొనసాగుతుంది.

విండోల్లో సాధారణంగా **మొత్తం**, **Auto + Composer**, మరియు **API** ఉంటాయి.
పరిమితులు ఖాళీగా కనిపిస్తే, **Cursorతో లాగిన్ చేయండి**ను మళ్లీ అమలు చేయండి
లేదా టోకెన్లను మళ్లీ దిగుమతి చేయండి (ఇకపై IDE దిగుమతి మాత్రమే అవసరం లేదు).

## ఖాళీ టర్న్లు / వినియోగ పరిమితి ముగియడం

Cursor ఒక Runను ఆమోదించినప్పటికీ అసిస్టెంట్ టెక్స్ట్ను తిరిగి ఇవ్వనప్పుడు
(ప్రీమియం వినియోగం ముగిసినప్పుడు ఇది సాధారణం), OmniRoute చర్య తీసుకోగల
**429** (కోటా సూచనలు) లేదా మార్గదర్శకంతో కూడిన **502**ను చూపిస్తుంది —
కేవలం “ప్రొవైడర్ ఖాళీ కంటెంట్ను తిరిగి ఇచ్చింది” అని మాత్రమే చూపించదు.
`not_found: AI Model Not Found` (వినియోగ విండో ముగిసింది) వంటి స్ట్రీమింగ్
వైఫల్యాలు **Cursor రేట్ పరిమితి / వినియోగం మించిపోయింది**గా వర్గీకరించబడి,
SSE పైప్లైన్ అంతటా ఆ సందేశాన్ని అలాగే ఉంచుతాయి (షేర్డ్ ఖాళీ-స్ట్రీమ్ గార్డ్
ఇప్పటికే విడుదలైన లోపాన్ని ఓవర్రైట్ చేయదు). ప్రొవైడర్ పరిమితులను తనిఖీ చేసి,
**`auto`** మోడల్ను ప్రయత్నించండి లేదా Cursor ప్లాన్ పరిమితులను పెంచండి.

## క్లయింట్ వెర్షన్ (హెడ్లెస్)

స్థానిక `cursor-agent` ఇన్స్టాలేషన్ లేకపోతే, OmniRoute
`x-cursor-client-version`ను మొదట env `CURSOR_AGENT_CLI_VERSION` ద్వారా,
ఆపై Cursor ఇన్స్టాలర్ స్క్రిప్ట్ యొక్క డిస్క్లో కాష్ చేసిన స్క్రేప్ ద్వారా,
చివరగా పిన్ చేసిన build id ద్వారా పరిష్కరిస్తుంది. అవసరమైనప్పుడు
`CURSOR_AGENT_CLI_VERSION`తో ఓవర్రైడ్ చేయండి.

## ఫాల్బ్యాక్: మాన్యువల్ టోకెన్ దిగుమతి

మీరు బ్రౌజర్ లాగిన్ను పూర్తి చేయలేకపోతే:

1. హోస్ట్లో, Cursor యొక్క `state.vscdb` నుండి టోకెన్లను వెలికితీయండి:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor ప్రమాణీకరణ మోడల్లో **టోకెన్ను దిగుమతి చేయండి** తెరవండి.
3. **యాక్సెస్ టోకెన్**ను, అలాగే అందుబాటులో ఉంటే **రిఫ్రెష్ టోకెన్**ను
   అతికించండి (ఆటోమేటిక్ రిఫ్రెష్కు ఇది అవసరం). Machine ID ఐచ్ఛికం.

యాక్సెస్-టోకెన్-మాత్రమే ఉన్న దిగుమతులు ఇప్పటికీ పని చేస్తాయి, కానీ రిఫ్రెష్
టోకెన్ లేకుండా వాటి గడువు ముగుస్తుంది — చాట్ ప్రమాణీకరణ లోపాలను తిరిగి
ఇచ్చినప్పుడు మళ్లీ దిగుమతి చేయండి.

## సంబంధితవి

- Zed Docker మార్గదర్శకం: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor లాగిన్ సూచన (బాహ్య):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
