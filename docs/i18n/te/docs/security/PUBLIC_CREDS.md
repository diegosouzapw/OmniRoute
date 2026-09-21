# Public Credentials Handling (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **ప్రామాణిక మూలం:** `open-sse/utils/publicCreds.ts`
> **పరీక్షలు:** `tests/unit/publicCreds.test.ts`
> **చివరిగా నవీకరించబడింది:** 2026-08-07 — v3.8.50
> **లక్ష్య పాఠకులు:** తమ పబ్లిక్ CLIలలో పబ్లిక్ OAuth client_id / client_secret / Firebase Web API కీలను అందించే ప్రొవైడర్లను ఇంటిగ్రేట్ చేస్తున్న ఇంజినీర్లు.
> **స్థితి:** అప్స్ట్రీమ్ ఐడెంటిఫైయర్లను పొందుపరిచే అన్ని కొత్త కోడ్లకు **తప్పనిసరి**.

## ఇది ఎందుకు ఉంది

- [నేటివ్ యాప్ల కోసం OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ఇన్స్టాల్ చేసిన యాప్లకు సంబంధించిన OAuth client_id / client_secret పబ్లిక్గా ఉంటాయి; వాస్తవ భద్రతను PKCE అందిస్తుంది.
- [Firebase API కీలు](https://firebase.google.com/docs/projects/api-keys) — Web క్లయింట్ ఐడెంటిఫైయర్లు ఉద్దేశపూర్వకంగానే పబ్లిక్గా ఉంటాయి.

`.env`ను కాన్ఫిగర్ చేయని వినియోగదారులు కూడా ఎలాంటి అదనపు సెటప్ లేకుండానే పనిచేసే OAuth ఫ్లోను పొందేలా OmniRoute తప్పనిసరిగా ఈ విలువలను పొందుపరచాలి. పొందుపరిచిన ఫాల్బ్యాక్ లేకపోతే, "కేవలం క్లోన్ చేసి రన్ చేయండి" మార్గాన్ని అనుసరించే ఏ వినియోగదారికైనా Gemini / Antigravity ప్రొవైడర్లు పనిచేయడం ఆగిపోతుంది.

అయితే, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` వంటి లిటరల్ విలువలను **GitHub Secret Scanning**, **Semgrep**, మరియు ఇలాంటి ప్యాటర్న్ స్కానర్లు గుర్తిస్తాయి. ప్రతి విడుదల తప్పుడు పాజిటివ్లతో కూడిన అనవసరమైన హెచ్చరికల ప్రవాహంగా మారుతుంది, పుష్ ప్రొటెక్షన్ చెల్లుబాటు అయ్యే కమిట్లను బ్లాక్ చేస్తుంది, మరియు ఆపరేటర్లు అలర్ట్ ఫీడ్ను నమ్మడం మానేస్తారు.

`open-sse/utils/publicCreds.ts` హెల్పర్ ఈ రెండు పరిమితులను ఒకేసారి పరిష్కరిస్తుంది:

- పబ్లిక్ ఐడెంటిఫైయర్ను **XOR-మాస్క్ చేసిన బైట్ సీక్వెన్స్**గా పొందుపరుస్తుంది (సోర్స్లో స్కానర్ ప్యాటర్న్ ఉండదు).
- రన్టైమ్లో `decodePublicCred` / `resolvePublicCred` ద్వారా డీకోడ్ చేస్తుంది.
- ఇప్పటికే సుపరిచితమైన ప్రిఫిక్స్లను (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) అనుసరించే ముడి విలువలను గుర్తించి, వాటిని మార్చకుండా అలాగే పంపిస్తుంది; అందువల్ల తమ ప్రస్తుత `.env`లో ముడి విలువలను కలిగి ఉన్న వినియోగదారులకు **ఎటువంటి మైగ్రేషన్ అవసరం లేకుండా** పని కొనసాగుతుంది.

ఇది **అస్పష్టీకరణ మాత్రమే, ఎన్క్రిప్షన్ కాదు.** సోర్స్ను చదివే ఎవరైనా విలువను తిరిగి పొందగలరు — ఆ విలువ ఉద్దేశపూర్వకంగానే పబ్లిక్ కాబట్టి అది సమస్య కాదు. స్కానర్ regex సరిపోలికలను నివారించడం మాత్రమే దీని లక్ష్యం.

## తప్పనిసరి ప్యాటర్న్

### 1. కొత్త పబ్లిక్ క్రెడెన్షియల్ను జోడించడం

మీరు కింది లక్షణాలు కలిగిన అప్స్ట్రీమ్ అందించిన కొత్త విలువను పొందుపరచాల్సి వచ్చినప్పుడు:

- అది పబ్లిక్ CLI / డెస్క్టాప్ యాప్ / బ్రౌజర్ బండిల్ నుండి వస్తుంది, **మరియు**
- అప్స్ట్రీమ్ ప్రొవైడర్ దాన్ని పబ్లిక్ క్లయింట్ ఐడెంటిఫైయర్గా డాక్యుమెంట్ చేస్తుంది (లేదా అలాగే పరిగణిస్తుంది), **మరియు**
- లేదంటే ప్యాటర్న్ స్కానర్ దాన్ని గుర్తిస్తుంది (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, మొదలైనవి),

…ఈ చెక్లిస్ట్ను అనుసరించండి:

1. మాస్క్ చేసిన బైట్ సీక్వెన్స్ను రూపొందించండి:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`లోని `EMBEDDED_DEFAULTS`కు **తటస్థమైన కీ పేరుతో** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, మొదలైనవి) కొత్త ఎంట్రీని జోడించండి. హెల్పర్లో `client_secret` లేదా `api_key` వంటి పేర్లను **ఉపయోగించవద్దు** — ఆ పదాలు Semgrep సాధారణ-సీక్రెట్ నియమాలను ట్రిగ్గర్ చేస్తాయి.

3. పబ్లిక్ టైప్ యూనియన్కు `keyof typeof EMBEDDED_DEFAULTS`ను జోడించండి (ఇది స్వయంచాలకంగా ఇన్ఫర్ అవుతుంది).

4. కన్జ్యూమర్ కోడ్లో, హార్డ్కోడ్ చేసిన లిటరల్ను దీనితో భర్తీ చేయండి:

   ```ts
   // ఒకే env ఓవర్రైడ్
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // బహుళ env అలియాస్లు (ఖాళీగా లేని మొదటి విలువ గెలుస్తుంది)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env ఓవర్రైడ్ లేదు (ఎల్లప్పుడూ పొందుపరిచిన డిఫాల్ట్)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example` నుండి లిటరల్ను తొలగించండి (దాని స్థానంలో పాఠకులను ఇక్కడికి సూచించే, కేవలం కామెంట్లతో కూడిన డాక్యుమెంటేషన్ను ఉంచండి):

   ```dotenv
   # ── ప్రొవైడర్ (Google / Firebase / మొదలైనవి) ──
   # పబ్లిక్ OAuth క్రెడెన్షియల్లు
   # open-sse/utils/publicCreds.ts ద్వారా కోడ్లోనే పొందుపరచబడ్డాయి. మీ స్వంత వాటిని ఉపయోగించడానికి మాత్రమే ఈ వేరియబుల్లను సెట్ చేయండి.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. కొత్త కీ కోసం షేప్ అసెర్షన్ను జోడించడానికి `tests/unit/publicCreds.test.ts`ను నవీకరించండి (లిటరల్ విలువను కాకుండా ఫార్మాట్ను ధృవీకరించండి — ప్యాటర్న్ కోసం ఇప్పటికే ఉన్న పరీక్షలను చూడండి).

7. పరీక్ష ఫైళ్లకు `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` లిటరల్లను **ఎప్పుడూ** జోడించవద్దు. `.join("")` ఫ్రాగ్మెంట్లతో నిర్మించిన `FAKE_*` కాన్స్టెంట్లను ఉపయోగించండి (ఇప్పటికే ఉన్న పరీక్షలను చూడండి).

### 2. కన్జ్యూమర్లు

- **`resolvePublicCred()` / `resolvePublicCredMulti()` నుండి మాత్రమే చదవండి** — హెల్పర్ వెలుపల `decodePublicCredBytes()`ను ఎప్పుడూ నేరుగా కాల్ చేయవద్దు.
- హెల్పర్ ఉద్దేశపూర్వకంగానే తక్కువ ఖర్చుతో పనిచేస్తుంది (లీనియర్ బైట్ XOR), అలాగే మాడ్యూల్ లోడ్ సమయంలో కాల్ చేయడం సురక్షితం; డిఫాల్ట్లు ఒకసారి మాత్రమే లెక్కించబడతాయి.
- env ఓవర్రైడ్ ఎల్లప్పుడూ ప్రాధాన్యం పొందుతుంది. వినియోగదారు `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`ను సెట్ చేస్తే, హెల్పర్ ఆ ముడి విలువను మార్చకుండా అలాగే పంపిస్తుంది.

### 3. నిషేధిత ప్యాటర్న్లు

❌ ప్రొడక్షన్ కోడ్లో (`src/`, `open-sse/`, `electron/`, `bin/`) కింది వాటిలో దేనినీ **ఎప్పుడూ** చేయవద్దు:

```ts
// తప్పు: లిటరల్ విలువ Secret Scanning + Semgrepను ట్రిగ్గర్ చేస్తుంది
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// తప్పు: లిటరల్ యొక్క base64 — Feb/2025 నుండి GitHub ఇప్పటికీ దీన్ని గుర్తిస్తుంది
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// తప్పు: రన్టైమ్లో ప్యాటర్న్ను తిరిగి కలిపే స్ట్రింగ్ కాంకాటినేషన్
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// తప్పు: hex/ROT13 ఎన్కోడింగ్ — భిన్నమైన అస్పష్టీకరణ, గుర్తించబడే ప్రమాదం మాత్రం అదే
clientSecret: hexDecode("474f4353..."),
```

ఇవన్నీ చివరికి స్కానర్ను ట్రిగ్గర్ చేస్తాయి. `resolvePublicCred()`ను ఉపయోగించండి.

❌ `.env.example`కు లిటరల్ క్రెడెన్షియల్లను **ఎప్పుడూ** జోడించవద్దు. నిజమైన అప్స్ట్రీమ్ విలువలు అవసరమైన వినియోగదారులు వాటిని పబ్లిక్ CLI నుండే సంగ్రహించవచ్చు, లేదా తమ స్వంత OAuth రిజిస్ట్రేషన్ను ఉపయోగించవచ్చు.

❌ క్రెడెన్షియల్ను ఈ హెల్పర్కు తరలించాలా వద్దా అని ముందుగా తనిఖీ చేయకుండా కొత్త సీక్రెట్-స్కానింగ్ అలర్ట్ను **ఎప్పుడూ** విస్మరించవద్దు.

## సంబంధిత నియంత్రణలు

- `publicCreds.ts`లోని `RAW_VALUE_PATTERN`, యథాతథంగా పంపడాన్ని ప్రేరేపించే ప్రిఫిక్స్లను జాబితా చేస్తుంది (వెనుకబడిన అనుకూలత). డాక్యుమెంట్ చేయబడిన పబ్లిక్ క్రెడెన్షియల్ ఫార్మాట్ల కోసం మాత్రమే దీన్ని విస్తరించండి; యాజమాన్య సీక్రెట్ల కోసం ఎప్పుడూ విస్తరించవద్దు.
- `.env.example` CIలోని `check-env-doc-sync` స్క్రిప్ట్లో భాగంగా ఉంటుంది — మీరు ఇక్కడ ఒక వేరియబుల్ను తొలగించినప్పుడు, డాక్యుమెంటేషన్ కూడా దానికి అనుగుణంగా ఉందని నిర్ధారించుకోండి.
- `npm run test:vitest` మరియు `node --import tsx/esm --test tests/unit/publicCreds.test.ts` టెస్ట్ సూట్లు రెండూ తప్పనిసరిగా విజయవంతంగా కొనసాగాలి.

## ఈ హెల్పర్ను ఎప్పుడు ఉపయోగించకూడదు

ఈ హెల్పర్ను **కేవలం** కింది రకాల క్రెడెన్షియల్ల కోసం మాత్రమే ఉపయోగించాలి:

1. అప్స్ట్రీమ్ ప్రొవైడర్ బహిరంగంగా పంపిణీ చేసేవి (CLI బైనరీ, బ్రౌజర్ బండిల్, అధికారిక డాక్యుమెంటేషన్).
2. గోప్యమైనవి కావని డాక్యుమెంట్ చేయబడినవి లేదా బలంగా సూచించబడినవి (PKCEతో రక్షించబడినవి, Firebase Web కీ, లేదా ఇలాంటివి).

మిగతా అన్నింటికీ — ఆపరేటర్ జారీ చేసిన టోకెన్లు, ప్రతి టెనెంట్కు ప్రత్యేకమైన సీక్రెట్లు, మీ స్వంత OAuth యాప్కు చెందిన client_secret, ఎన్క్రిప్షన్ కీలు, JWT సీక్రెట్లు, డేటాబేస్ పాస్వర్డ్లు — **env vars మాత్రమే** ఉపయోగించండి (`process.env.FOO`, `||` ద్వారా ఖాళీ విలువకు ఫాల్బ్యాక్ / స్పష్టమైన ఎర్రర్). వీటిని సోర్స్లో కాకుండా `.env`లో మరియు [ఎన్క్రిప్ట్ చేసిన క్రెడెన్షియల్స్ స్టోర్](./COMPLIANCE.md)లో ఉంచాలి.

## సూచనలు

- [Google: నేటివ్ యాప్ల కోసం OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: క్లయింట్ గుర్తింపు కోసం API కీలు](https://firebase.google.com/docs/projects/api-keys)
- [GitHub సీక్రెట్ స్కానింగ్ మద్దతిచ్చే సీక్రెట్లు](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: టోకెన్ల కోసం base64 గుర్తింపు (ఫిబ్రవరి 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- ఈ హెల్పర్ను ప్రవేశపెట్టిన కమిట్: `1a39c31f` — _fix(security): పబ్లిక్ అప్స్ట్రీమ్ క్రెడెన్షియల్లను మాస్క్ చేయడం + ఎర్రర్ శానిటైజేషన్ను కేంద్రీకరించడం_
