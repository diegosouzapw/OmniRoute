# Error Message Sanitization (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **ప్రామాణిక మూలం:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, మరియు `open-sse/utils/error.ts`లోని పబ్లిక్ బిల్డర్లు
> **పరీక్షలు:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **చివరిగా నవీకరించబడింది:** 2026-09-02 — v3.8.51
> **లక్ష్య పాఠకులు:** ఎర్రర్ ప్రతిస్పందనలను నిర్వహించే ఏ ఇంజినీర్ అయినా (HTTP రూట్లు, SSE స్ట్రీమ్లు, ఎగ్జిక్యూటర్లు, MCP హ్యాండ్లర్లు).
> **స్థితి:** క్లయింట్కు ఎర్రర్ సందేశాన్ని తిరిగి పంపే ప్రతి కోడ్ పాత్కు **తప్పనిసరి**.

## ఇది ఎందుకు ఉంది

CodeQL నియమం `js/stack-trace-exposure` (CWE-209), రన్టైమ్ ఎక్సెప్షన్ నుంచి ఉద్భవించిన ఎర్రర్ సందేశం శానిటైజ్ చేయబడకుండా HTTP / SSE ప్రతిస్పందనకు చేరే ఏ కోడ్ పాత్నైనా ఫ్లాగ్ చేస్తుంది. ప్రొడక్షన్ ప్రతిస్పందనల్లోని స్టాక్ ట్రేస్లు మరియు సంపూర్ణ ఫైల్ పాత్లు దాడి చేసేవారికి వీటిని అందిస్తాయి:

- అంతర్గత డైరెక్టరీ నిర్మాణం (`/srv/app/src/lib/...`) → తదుపరి దాడుల కోసం ముందస్తు సమాచారం సేకరణ.
- స్టాక్ ఫ్రేమ్ల నుంచి ఊహించిన లైబ్రరీ / ఫ్రేమ్వర్క్ వెర్షన్లు → లక్ష్యిత ఎక్స్ప్లాయిట్ ఎంపిక.
- ఎర్రర్లలో స్ట్రింగ్-ఇంటర్పొలేట్ చేయబడగల సున్నితమైన రన్టైమ్ విలువలు (DB క్వెరీలు, కాన్ఫిగరేషన్ విలువలు).

`open-sse/utils/error.ts` ద్వారా ఎక్స్పోర్ట్ చేయబడిన `sanitizeErrorMessage` సహాయక ఫంక్షన్ ఈ రకాల
సమాచార లీకేజీని తొలగిస్తుంది:

1. భౌతికంగా ఉన్నవి, సీరియలైజ్ చేయబడినవి, మరియు సందేహానికి తావులేని ఇన్లైన్ JavaScript స్టాక్-ఫ్రేమ్ టెయిల్లు.
2. సురక్షితమైన HTTPS URLలను మరియు స్పష్టంగా గుర్తించబడిన API రూట్లను అలాగే ఉంచుతూ, సంపూర్ణ POSIX, Windows, UNC, మరియు `file://` ఫైల్సిస్టమ్ పాత్లు.
3. క్రెడెన్షియల్ అసైన్మెంట్లు, సాధారణ ప్రొవైడర్ టోకెన్ ఫార్మాట్లు, ప్రైవేట్-కీ PEM బ్లాక్లు, మరియు base64 డేటా
   URLలు.

శానిటైజర్ ఇన్పుట్ పొడవును పరిమితం చేస్తుంది మరియు త్రో చేయబడిన విలువను స్ట్రింగ్గా మార్చడం విఫలమైతే సురక్షితంగా నిరాకరిస్తుంది.
పునరావృత అప్స్ట్రీమ్ JSON శానిటైజేషన్ కూడా ప్రతిస్పందన సీరియలైజ్ చేయబడే ముందు అసురక్షిత క్రెడెన్షియల్/పాత్ కీలు, సెషన్ మారుపేర్లు, మరియు
ప్రోటోటైప్-నియంత్రణ కీలను తొలగిస్తుంది.

## తప్పనిసరి నమూనా

### 1. ఎర్రర్ ప్రతిస్పందనను నిర్మించడం (HTTP / API రూట్లు)

`buildErrorBody()`ని ఉపయోగించండి — శానిటైజేషన్ అంతర్నిర్మితంగా ఉంటుంది:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... హ్యాండ్లర్ లాజిక్ ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

లేదా, అదే మాడ్యూల్లోని సౌలభ్య ర్యాపర్ల కోసం:

```ts
import {
  errorResponse, // ఒకే దశలో Response ఆబ్జెక్ట్
  writeStreamError, // SSE రైటర్
  createErrorResult, // { success: false, status, response, ... } ఆకృతి
  unavailableResponse, // Retry-Afterను జోడిస్తుంది
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ఇవన్నీ ప్రామాణిక పబ్లిక్-ఎర్రర్ సరిహద్దును వర్తింపజేస్తాయి. `errorResponse`, `writeStreamError`, మరియు
`createErrorResult`లు `buildErrorBody` ద్వారా రూట్ అవుతాయి; ప్రత్యేకీకరించిన మూడు రీట్రై/సర్క్యూట్ సహాయక ఫంక్షన్లు
తమ పబ్లిక్ సందర్భాన్ని నేరుగా ప్రొజెక్ట్ చేసి శానిటైజ్ చేస్తాయి. ఈ సహాయక ఫంక్షన్లను ఉపయోగిస్తున్నప్పుడు **మీరు
`sanitizeErrorMessage`ను ఎప్పటికీ మాన్యువల్గా కాల్ చేయాల్సిన అవసరం లేదు**.

### 2. అనుకూల ఎర్రర్ ఎన్వలప్లు (అరుదుగా)

పై సహాయక ఫంక్షన్లను ఉపయోగించలేనప్పుడు (ఉదా. ప్రతిస్పందన ఆకృతిని Connect-RPC వంటి అప్స్ట్రీమ్ ప్రోటోకాల్ నిర్దేశించినప్పుడు), `sanitizeErrorMessage`ను నేరుగా ఇంపోర్ట్ చేయండి:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

అనుకూల ఎర్రర్ బాడీని నిర్మించడానికి అనుమతించబడిన ఏకైక విధానం ఇదే. ప్రామాణిక అమలు కోసం `open-sse/executors/cursor.ts::buildErrorResponse`ను చూడండి.

### 3. లాగింగ్ మరియు ప్రతిస్పందించడం

విశ్వసనీయ అంతర్గత ఎక్సెప్షన్లు వాటి పూర్తి సందేశాన్ని మరియు స్టాక్ను ఉంచుకోవచ్చు, తద్వారా ఆపరేటర్లు డీబగ్ చేయగలరు. ప్రొవైడర్, వాలిడేషన్, బ్రౌజర్-సెషన్, లేదా క్రెడెన్షియల్కు సమీపమైన సరిహద్దుల వద్ద ఉద్భవించే విలువలు
కన్సోల్ అవుట్పుట్, ఆడిట్ మెటాడేటా, లేదా శాశ్వత కాల్ లాగ్లలోకి ప్రవేశించే ముందు తప్పనిసరిగా
శానిటైజ్ చేయబడాలి. నమూనా:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // విశ్వసనీయ అంతర్గత ఎక్సెప్షన్ మాత్రమే
  return errorResponse(500, getErrorMessage(err)); // శానిటైజ్ చేయబడింది — క్లయింట్కు పంపబడుతుంది
}
```

ప్రొవైడర్ నియంత్రిత వైఫల్యాల కోసం, లాగ్ చేయబడిన విలువను కూడా ప్రొజెక్ట్ చేయండి:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. నిషేధించబడిన నమూనాలు

❌ **ఎప్పటికీ** ముడి ఎక్సెప్షన్ అవుట్పుట్ను Response బాడీలో ఉంచవద్దు:

```ts
// తప్పు: స్టాక్ ట్రేస్ + ఫైల్ పాత్లు క్లయింట్కు చేరతాయి
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **ఎప్పటికీ** మీ సొంత మొదటి-లైన్ స్ప్లిటర్ను రూపొందించవద్దు:

```ts
// తప్పు: సంపూర్ణ పాత్లను తొలగించడం మరిచిపోతుంది, ప్రామాణిక సహాయక ఫంక్షన్ నుంచి భిన్నంగా మారవచ్చు
const safe = String(err).split("\n")[0];
```

❌ రూట్లో శానిటైజ్ చేసి, SSE పాత్ను **ఎప్పటికీ** మరిచిపోవద్దు. స్ట్రీమ్కు వ్రాసే ప్రతిదీ `writeStreamError` (లేదా దాని అంతర్లీన `buildErrorBody`) ద్వారా వెళ్తుంది.

❌ `process.cwd()`, `__filename`, `__dirname`, లేదా env నుంచి ఉద్భవించిన పాత్లను ఎర్రర్ సందేశాల్లో ఉద్దేశపూర్వకంగా **ఎప్పటికీ** చేర్చవద్దు. లోతైన రక్షణగా శానిటైజర్ సంపూర్ణ పాత్లను కవర్ చేస్తుంది, కానీ కాలర్లు మొదటినుంచే టోపాలజీని వెల్లడించే సందేశాలను నిర్మించకూడదు.

## CIలో కవరేజ్

`tests/unit/error-message-sanitization.test.ts` కింది వాటిని అమలు చేస్తుంది:

- `/api/model-combo-mappings/*` కింద ఉన్న ప్రతి రూట్ 4xx/5xx సందర్భాల్లో శుద్ధీకరించిన బాడీలను తిరిగి ఇస్తుంది.
- `sanitizeErrorMessage` బహుళ-లైన్ స్టాక్ ట్రేస్లను తొలగిస్తుంది.
- `sanitizeErrorMessage` POSIX మరియు Windows సంపూర్ణ పాత్లను `<path>`తో భర్తీ చేస్తుంది.
- `sanitizeErrorMessage`, `null`/`undefined`/`Error` ఇన్స్టెన్స్ ఇన్పుట్లను సురక్షితంగా నిర్వహిస్తుంది.
- `buildErrorBody` తన `message` ఫీల్డ్లో స్టాక్ ట్రేస్లను ఎప్పటికీ బహిర్గతం చేయదు.

కొత్త రూట్ లేదా ఎగ్జిక్యూటర్ను జోడిస్తున్నప్పుడు, ఈ ఫైల్లోని అసర్షన్ నమూనాను కాపీ చేయండి. కవరేజ్ గేట్ (`npm run test:coverage`) ≥60% స్టేట్మెంట్లు/లైన్లు/ఫంక్షన్లు/బ్రాంచ్లను అమలు చేస్తుంది — ఎర్రర్ పాత్లు తప్పనిసరిగా కవర్ చేయబడాలి.

## సంబంధిత నియంత్రణలు

- `.github/security`లోని `js/stack-trace-exposure` CodeQL అలర్ట్లు ఎల్లప్పుడూ **ఈ హెల్పర్ల ద్వారా పరిష్కరించబడాలి** లేదా **ఈ డాక్యుమెంట్ను ఉదహరించే వ్యాఖ్యతో విస్మరించబడాలి**.
- `pino` రిడాక్షన్ కాన్ఫిగ్ (`src/shared/utils/logRedaction.ts`) విశ్వసనీయ స్ట్రక్చర్డ్ లాగ్లను
  విడిగా నిర్వహిస్తుంది. ఈ డాక్యుమెంట్ పబ్లిక్ రెస్పాన్స్ సందేశాలు మరియు స్థిరమైన కాల్/ప్రాక్సీ-లాగ్ సరిహద్దులను
  దాటే ప్రొవైడర్-నియంత్రిత విలువలను వివరిస్తుంది.
- అప్స్ట్రీమ్-హెడర్ డినైలిస్ట్ (`src/shared/constants/upstreamHeaders.ts`) హెడర్ లీకేజీని కవర్ చేస్తుంది — కొత్త ఎక్స్ఫిల్ట్రేషన్ సమస్యను జోడించేటప్పుడు రెండు ఫైల్లను సమలేఖనంలో ఉంచండి.

## అప్స్ట్రీమ్ వివరాల పాస్త్రూ

`buildErrorBody`, ఐచ్ఛిక మూడవ ఆర్గ్యుమెంట్ `upstreamDetails`ను (అప్స్ట్రీమ్
ప్రొవైడర్ నుండి వచ్చిన ముడి పార్స్ చేసిన బాడీ) స్వీకరిస్తుంది. దీన్ని అందించినప్పుడు, రెస్పాన్స్లో
`upstream_details`గా చేర్చడానికి ముందు `sanitizeUpstreamDetails` ద్వారా శుద్ధీకరించబడుతుంది.

ఐచ్ఛిక నాల్గవ ఆర్గ్యుమెంట్ `classification`
(`{ type?: string; code?: string; reason?: string }`) స్పష్టమైన పబ్లిక్ వర్గీకరణను స్వీకరిస్తుంది.
ప్రతి ఫీల్డ్ పరిమిత పబ్లిక్-ఐడెంటిఫయర్ పదజాలానికి ప్రొజెక్ట్ చేయబడుతుంది. అసురక్షితమైన, క్రెడెన్షియల్ను పోలిన,
కంట్రోల్-క్యారెక్టర్ కలిగిన లేదా మరీ పొడవైన విలువలు స్టేటస్ నుండి ఉత్పన్నమైన టైప్/కోడ్కు ఫాల్బ్యాక్ అవుతాయి; అసురక్షితమైన ఐచ్ఛిక
రీజన్ విస్మరించబడుతుంది. మూడు అంకెల HTTP స్టేటస్ ఐడెంటిఫయర్లు (`100` నుండి `599` వరకు), సంఖ్యాత్మక అప్స్ట్రీమ్ స్టేటస్ను మెషిన్-రీడబుల్ కోడ్గా బహిర్గతం చేసే
ప్రొవైడర్ కాంట్రాక్ట్లకు చెల్లుబాటులోనే ఉంటాయి. స్థానికంగా రూపొందించిన HTTP-స్టేటస్ ప్లేస్హోల్డర్ రూపంలోనూ అదే
పరిమిత శ్రేణి ఆమోదించబడుతుంది; ఏకపక్ష ప్రొవైడర్ సంఖ్యలు మరియు పేర్లు పదజాలానికి వెలుపలే ఉంటాయి.

ప్రతి స్పష్టమైన వర్గీకరణను ఆ నాల్గవ ఆర్గ్యుమెంట్లో పంపండి. `buildErrorBody()` తిరిగి వచ్చిన తర్వాత
`body.error.code`, `body.error.type`, లేదా `body.error.reason`ను ఎప్పటికీ ఓవర్రైట్ చేయవద్దు;
బిల్డర్ అనంతర మ్యూటేషన్ పబ్లిక్ ప్రొజెక్షన్ను దాటవేస్తుంది.

`upstreamDetails`కు వర్తించే శుద్ధీకరణ నియమాలు:

1. స్ట్రింగ్ లీఫ్లు: `sanitizeErrorMessage` ద్వారా పంపండి (స్టాక్లు + సంపూర్ణ పాత్లను తొలగిస్తుంది).
2. అసురక్షిత పాత్, క్రెడెన్షియల్, సెషన్-అలియాస్ మరియు ప్రోటోటైప్-కంట్రోల్ కీలు తొలగించబడతాయి.
3. డెప్త్ పరిమితి: 4 స్థాయిలకు మించిన నెస్టింగ్ `"[truncated]"` స్ట్రింగ్తో భర్తీ చేయబడుతుంది.
4. అరేలు 32 ఎలిమెంట్లకు పరిమితం చేయబడతాయి.

పార్స్ చేసిన ప్రొవైడర్ ఎర్రర్ బాడీ ఉన్న కాల్ సైట్లు మాత్రమే `upstreamDetails`ను పంపాలి. అంతర్గత OmniRoute
ఎర్రర్లు (SSE పార్స్ వైఫల్యాలు, ఖాళీ కంటెంట్, గార్డ్రైల్ బ్లాక్లు) దాన్ని చేర్చకూడదు.

ముడి `err.stack`, `err.message`, లేదా రన్టైమ్ ఎక్సెప్షన్ నుండి వచ్చిన ఏ స్ట్రింగ్నైనా
`upstreamDetails`కు పంపవద్దు. అవి అప్స్ట్రీమ్ బాడీ లేకుండా ఇప్పటికీ
`errorResponse` / `buildErrorBody(code, msg)` ద్వారా వెళ్లాలి.

ఎంపిక చేసిన అప్స్ట్రీమ్ 4xx పాస్త్రూ, క్లయింట్ ఆటో-రికవరీకి అవసరమైన ప్రొవైడర్ యొక్క సురక్షిత JSON ఆకృతిని మరియు పదప్రయోగాన్ని సంరక్షిస్తుంది,
కానీ అది బైట్-ఫర్-బైట్ పాస్త్రూ కాదు: సీరియలైజేషన్కు ముందు రికర్సివ్ శుద్ధీకరణ ఎల్లప్పుడూ అమలవుతుంది.
సైక్లిక్, BigInt కలిగిన, లేదా హానికరమైన `toJSON()` బాడీలు సురక్షితంగా విఫలమవుతాయి మరియు
పాస్త్రూకు అర్హం కావు. OCR మరియు మోడరేషన్ కూడా ఇదే నియమాన్ని వర్తింపజేస్తాయి; JSON కాని, ఖాళీగా ఉన్న, లేదా తప్పుగా
లేబుల్ చేసిన అప్స్ట్రీమ్ బాడీలు ప్రామాణిక OmniRoute JSON ఎర్రర్ ఎన్వలప్గా మార్చబడతాయి.

## తెలిసిన CodeQL పరిమితి: అనుకూల శానిటైజర్లు గుర్తించబడవు

CodeQL క్వెరీ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) శానిటైజర్ నమూనాల స్థిర అనుమతి జాబితాను ఉపయోగిస్తుంది (ఉదా. ఇన్లైన్ `.split("\n")[0]`, నిర్దిష్ట regex ఆకృతులతో `String#replace`, `Error` పై `.message` యాక్సెస్). ఇది మా `sanitizeErrorMessage()` వంటి అనుకూల సహాయకం ద్వారా జరిగే పరోక్ష ప్రాసెసింగ్ను గుర్తించదు.

దీని అర్థం, ఈ మాడ్యూల్ ద్వారా సందేశాన్ని శానిటైజ్ చేస్తున్నట్లు స్పష్టంగా నిరూపించగల కాల్సైట్లు — ఉదాహరణకు `open-sse/utils/error.ts::errorResponse` మరియు `open-sse/executors/cursor.ts::buildErrorResponse` — కోడ్ క్రియాత్మకంగా సురక్షితమైనప్పటికీ అలర్ట్ను చూపించడం కొనసాగించవచ్చు. గత డిస్మిసల్లు: `#224`, `#231` (మే 2026); సాంకేతిక సమర్థనతో రెండూ `false positive`గా గుర్తించబడ్డాయి.

**కొత్త సందర్భాన్ని ఎలా నిర్వహించాలి:**

1. కాల్సైట్ నిజంగానే సందేశాన్ని `sanitizeErrorMessage` / `buildErrorBody` / పైన డాక్యుమెంట్ చేసిన ర్యాపర్లలో ఒకదాని ద్వారా పంపుతుందని నిర్ధారించండి (కాల్ చైన్ను మొదటి నుంచి చివరి వరకు చదవండి — వ్యాఖ్యను గుడ్డిగా నమ్మవద్దు).
2. `tests/unit/error-message-sanitization.test.ts` ఆ మార్గాన్ని పరీక్షిస్తుందని నిర్ధారించండి (లేదా కవరేజ్ను జోడించండి).
3. ఈ డాక్యుమెంట్ను ప్రస్తావిస్తూ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ద్వారా అలర్ట్ను డిస్మిస్ చేయండి.
4. ప్రతిచోటా `.split("\n")[0]`ను ఇన్లైన్ చేయడం ద్వారా "పరిష్కరించవద్దు" — ఈ సహాయకమే ఏకైక ప్రామాణిక మూలం; స్కానర్ను సంతృప్తిపరిచినట్లు కనిపించడం కోసం నమూనాను నకలు చేయడం శానిటైజర్ను బలహీనపరుస్తుంది (పాత్ స్క్రబ్బింగ్, పొడవు పరిమితి, టైప్ కోర్షన్ను కోల్పోతుంది).

CodeQL యొక్క [`@codeql/javascript-models` అనుకూల శానిటైజర్ కాన్ఫిగరేషన్](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) వంటి ఆప్ట్-ఇన్ ఫీచర్లను స్వీకరించడం దీర్ఘకాలిక పరిష్కారం; అది ఈ డాక్యుమెంట్ పరిధికి వెలుపల ఉంటుంది.

## సూచనలు

- [CWE-209: ఎర్రర్ సందేశం ద్వారా సమాచార బహిర్గతం](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: ఎర్రర్ నిర్వహణ చీట్ షీట్](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- సహాయకాన్ని కేంద్రీకరించిన కమిట్: `1a39c31f` — _fix(security): పబ్లిక్ అప్స్ట్రీమ్ క్రెడెన్షియల్లను మాస్క్ చేసి + ఎర్రర్ శానిటైజేషన్ను కేంద్రీకరించండి_
