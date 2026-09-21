# Error Message Sanitization (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Orísun òtítọ́:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, àti àwọn olùkọ́lé gbogbogbòó inú `open-sse/utils/error.ts`
> **Àwọn ìdánwò:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Ìmúdójúìwọ̀n tó kẹ́yìn:** 2026-09-02 — v3.8.51
> **Àwọn olùkà:** Ẹlẹ́rọ̀ èyíkéyìí tó bá ń ṣiṣẹ́ lórí àwọn ìdáhùn àṣìṣe (àwọn ipa-ọ̀nà HTTP, àwọn ìṣàn SSE, àwọn olùṣàmúlò, àwọn olùdarí MCP).
> **Ipò:** **ÀÌGBỌ́DỌ̀MÁṢE** fún gbogbo ipa kóòdù tó ń dá ìfiránṣẹ́ àṣìṣe padà sí oníbàárà.

## Ìdí tí èyí fi wà

Òfin CodeQL `js/stack-trace-exposure` (CWE-209) máa ń ṣàmì sí ipa kóòdù èyíkéyìí níbi tí ìfiránṣẹ́ àṣìṣe kan tó pilẹ̀ láti inú àfikún àṣìṣe ní àsìkò ìṣiṣẹ́ ti dé inú ìdáhùn HTTP / SSE láìjẹ́ pé a ti sọ ọ́ di àìléwu. Àwọn àtẹ̀lé stack àti àwọn ipa fáìlì pípé nínú àwọn ìdáhùn production máa ń fún àwọn olùkọlù ní:

- Ìṣètò inú àwọn àkójọpọ̀ fáìlì (`/srv/app/src/lib/...`) → ìṣàwárí fún àwọn ìkọlù míì.
- Àwọn ẹ̀yà library / framework tí a lè mọ̀ láti inú àwọn stack frame → yíyan ọ̀nà ìkọlù tó bá wọn mu.
- Àwọn iye àsìkò ìṣiṣẹ́ tó ní ìkọ̀kọ̀ tí ó ṣeé ṣe kí a fi ọ̀rọ̀ sínú wọn nínú àwọn àṣìṣe (àwọn ìbéèrè DB, àwọn iye àtúnṣe).

Olùrànlọ́wọ́ `sanitizeErrorMessage` tí `open-sse/utils/error.ts` ń kó jáde máa ń yọ àwọn ẹ̀ka
jòjòló wọ̀nyí kúrò:

1. Àwọn ìrù stack-frame JavaScript tó jẹ́ ti ara, tí a ti sọ di serialized, àti tó hàn gbangba pé ó wà lórí ìlà kan náà.
2. Àwọn ipa filesystem POSIX, Windows, UNC, àti `file://` pípé, nígbà tó ń pa àwọn URL HTTPS tó léwu mọ́
   àti àwọn ipa-ọ̀nà API tí a ti samisi ní kedere.
3. Àwọn ìpín credential, àwọn fọ́ọ̀mù token olupèsè tó wọ́pọ̀, àwọn bulọ́ọ̀kì PEM private-key, àti àwọn URL data
   base64.

Olùsọ̀di-àìléwu náà máa ń fi òpin sí gígùn input, ó sì máa ń kuna ní ọ̀nà títì pa bí iye tí a ju jáde bá kọ̀ láti yí padà sí ọ̀rọ̀.
Ìsọ̀di-àìléwu JSON láti ọ̀dọ̀ upstream ní ọ̀nà recursive tún máa ń yọ àwọn key credential/path tí kò léwu, àwọn orúkọ mìíràn fún session, àti
àwọn key ìṣàkóso prototype kúrò kí a tó sọ ìdáhùn di serialized.

## Àpẹẹrẹ tó jẹ́ àìgbọ́dọ̀máṣe

### 1. Kíkọ́ ìdáhùn àṣìṣe (HTTP / àwọn ipa-ọ̀nà API)

Lo `buildErrorBody()` — ìsọ̀di-àìléwu ti wà nínú rẹ̀:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... ìlànà olùdarí ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Tàbí, fún àwọn wrapper ìrọ̀rùn tó wà nínú module kan náà:

```ts
import {
  errorResponse, // ohun Response ìgbà-kan
  writeStreamError, // olùkọ̀wé SSE
  createErrorResult, // ìrísí { success: false, status, response, ... }
  unavailableResponse, // ó fi Retry-After kún un
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Gbogbo ìwọ̀nyí máa ń lo ààlà àṣìṣe-gbogbogbòó àkọ́kọ́. `errorResponse`, `writeStreamError`, àti
`createErrorResult` máa ń gba inú `buildErrorBody` kọjá; àwọn olùrànlọ́wọ́ retry/circuit mẹ́ta pàtó náà
máa ń yọ àyíká gbogbogbòó wọn jáde, wọ́n sì máa ń sọ ọ́ di àìléwu ní tààrà. **O kò nílò láti pe
`sanitizeErrorMessage` fúnra rẹ rárá** nígbà tí o bá ń lo àwọn olùrànlọ́wọ́ wọ̀nyí.

### 2. Àwọn àpò ìdáhùn àṣìṣe àdáni (kì í sábà ṣẹlẹ̀)

Nígbà tí o kò bá lè lo àwọn olùrànlọ́wọ́ tó wà lókè (fún àpẹẹrẹ, bí protocol upstream bí Connect-RPC bá ti pàṣẹ ìrísí ìdáhùn náà), import `sanitizeErrorMessage` ní tààrà:

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

Èyí nìkan ni ọ̀nà tí a fọwọ́ sí láti kọ́ body àṣìṣe àdáni. Wo `open-sse/executors/cursor.ts::buildErrorResponse` fún ìmúṣẹ àpẹẹrẹ.

### 3. Gígbé log sílẹ̀ sí dídáhùn padà

Àwọn àfikún àṣìṣe abẹ́nú tí a fọkàn tán lè pa gbogbo ìfiránṣẹ́ wọn àti stack mọ́ kí àwọn olùṣàkóso lè ṣàwárí àṣìṣe. Àwọn iye
tó ti ọ̀dọ̀ olupèsè, ìfọwọ́sí, session aṣàwákiri, tàbí àwọn ààlà tó sún mọ́ credential wá gbọ́dọ̀ jẹ́
títọ́ di àìléwu kí wọ́n tó wọ inú console output, metadata àyẹ̀wò, tàbí àwọn log ìpè tó wà pẹ́. Àpẹẹrẹ:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // àfikún àṣìṣe abẹ́nú tí a fọkàn tán nìkan
  return errorResponse(500, getErrorMessage(err)); // a ti sọ di àìléwu — a fi ránṣẹ́ sí oníbàárà
}
```

Fún àwọn ìkùnà tí olupèsè ń ṣàkóso, yọ iye tí a ń gbé sínú log náà jáde pẹ̀lú:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Àwọn àpẹẹrẹ tí a fòfin de

❌ **Má ṣe láé** fi output àfikún àṣìṣe aise sínú body Response:

```ts
// KÒ DÁRA: stack trace + àwọn ipa fáìlì dé ọ̀dọ̀ oníbàárà
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Má ṣe láé** dá first-line splitter tìrẹ sílẹ̀:

```ts
// KÒ DÁRA: ó gbàgbé láti yọ àwọn ipa pípé kúrò, ó sì lè yà kúrò lọ́dọ̀ olùrànlọ́wọ́ àkọ́kọ́
const safe = String(err).split("\n")[0];
```

❌ **Má ṣe láé** sọ ipa-ọ̀nà náà di àìléwu kí o sì gbàgbé ipa-ọ̀nà SSE. Ohunkóhun tó bá ń kọ sínú ìṣàn kan gbọ́dọ̀ gba inú `writeStreamError` kọjá (tàbí `buildErrorBody` tó wà lábẹ́ rẹ̀).

❌ **Má ṣe láé** mọ̀ọ́mọ̀ fi `process.cwd()`, `__filename`, `__dirname`, tàbí àwọn ipa tí a mú jáde láti env
sínú àwọn ìfiránṣẹ́ àṣìṣe. Olùsọ̀di-àìléwu náà bo àwọn ipa pípé gẹ́gẹ́ bí ààbò ìpele-jinlẹ̀, ṣùgbọ́n àwọn olùpè kò gbọ́dọ̀
kọ́ àwọn ìfiránṣẹ́ tó ń ṣàfihàn topology láti ìbẹ̀rẹ̀.

## Ìbòrí nínú CI

`tests/unit/error-message-sanitization.test.ts` ń mú àwọn nǹkan wọ̀nyí ṣẹ:

- Gbogbo route lábẹ́ `/api/model-combo-mappings/*` ń dá àwọn body tí a ti sọ di àìléwu padà lórí 4xx/5xx.
- `sanitizeErrorMessage` ń yọ àwọn stack trace onílà-púpọ̀ kúrò.
- `sanitizeErrorMessage` ń fi `<path>` rópò àwọn absolute path POSIX àti Windows.
- `sanitizeErrorMessage` ń bójú tó àwọn input instance `null`/`undefined`/`Error` láìléwu.
- `buildErrorBody` kì í ṣí stack trace payá nínú field `message` rẹ̀.

Nígbà tí o bá ń ṣàfikún route tàbí executor tuntun, ṣe àdàkọ pattern assertion láti inú file yìí. Ẹnu-ọ̀nà coverage (`npm run test:coverage`) ń fipá mú ≥60% statements/lines/functions/branches — ó gbọ́dọ̀ jẹ́ pé a ṣe coverage àwọn error path.

## Àwọn ìṣàkóso tó ní í ṣe pẹ̀lú rẹ̀

- Ó yẹ kí àwọn alert CodeQL `js/stack-trace-exposure` nínú `.github/security` jẹ́ **yálà** àtúnṣe nípasẹ̀ àwọn helper wọ̀nyí **tàbí** kí a kọ̀ wọ́n sílẹ̀ pẹ̀lú comment tó tọ́ka sí doc yìí.
- Config redaction `pino` (`src/shared/utils/logRedaction.ts`) ń bójú tó àwọn structured log tí a fọkàn tán
  lọ́tọ̀. Document yìí bo àwọn message response gbogbogbò àti àwọn value tí provider ń ṣàkóso, tí wọ́n
  ń kọjá ààlà persistent call/proxy-log.
- Denylist upstream-header (`src/shared/constants/upstreamHeaders.ts`) bo jìjó header jáde — jẹ́ kí àwọn file méjèèjì bá ara wọn mu nígbà tí o bá ń ṣàfikún ìṣòro exfiltration tuntun.

## Fífi àwọn àlàyé upstream kọjá

`buildErrorBody` gba argument kẹta àṣàyàn kan, `upstreamDetails` (body raw
tí a ti parse láti ọ̀dọ̀ upstream provider). Nígbà tí a bá pèsè rẹ̀, a máa sọ ọ́ di àìléwu nípasẹ̀
`sanitizeUpstreamDetails` kí a tó fi í sínú response gẹ́gẹ́ bí `upstream_details`.

Argument kẹrin àṣàyàn kan, `classification`
(`{ type?: string; code?: string; reason?: string }`), gba classification gbogbogbò tó ṣe kedere.
A máa ṣe projection gbogbo field sí orí vocabulary public-identifier tó ní ààlà. Àwọn value tí kò léwu, tí ó dà bí credential,
tí ó ní control-character, tàbí tí ó gùn jù máa padà sí type/code tí status pinnu; a ó sì yọ reason àṣàyàn
tí kò léwu kúrò. Àwọn identifier HTTP status oni-digit-mẹ́ta (`100` sí `599`) ṣì wúlò fún
àwọn contract provider tí ń ṣí numeric upstream status payá gẹ́gẹ́ bí code tí ẹ̀rọ lè kà. A tún gba
ààlà kan náà nínú fọ́ọ̀mù placeholder HTTP-status tí a ṣẹ̀dá locally; àwọn nọ́ńbà àti orúkọ provider
tí kò ní ààlà ṣì wà níta vocabulary náà.

Fi gbogbo classification tó ṣe kedere ránṣẹ́ nínú argument kẹrin yẹn. Má ṣe overwrite
`body.error.code`, `body.error.type`, tàbí `body.error.reason` lẹ́yìn tí `buildErrorBody()` bá padà;
mutation lẹ́yìn builder máa ń rékọjá public projection náà.

Àwọn ìlànà sanitization tí a lò sí `upstreamDetails`:

1. Àwọn leaf tó jẹ́ string: mú wọn gba `sanitizeErrorMessage` kọjá (ó ń yọ stack àti absolute path kúrò).
2. A máa yọ àwọn key path tí kò léwu, credential, session-alias, àti prototype-control kúrò.
3. Òpin depth: nesting tó kọjá level 4 ni a máa fi string `"[truncated]"` rópò.
4. A fi òpin element 32 sí àwọn array.

Àwọn call site tó ní body error provider tí a ti parse nìkan ló yẹ kí wọ́n fi `upstreamDetails` ránṣẹ́. Àwọn error OmniRoute
inú (ìkùnà parse SSE, content òfìfo, block guardrail) kò gbọ́dọ̀ ní i nínú.

Má ṣe fi raw `err.stack`, `err.message`, tàbí string èyíkéyìí láti inú runtime exception ránṣẹ́ sí
`upstreamDetails`. Wọ́n ṣì gbọ́dọ̀ gba inú `errorResponse` / `buildErrorBody(code, msg)` kọjá
láìsí body upstream.

Fífi upstream 4xx àṣàyàn kọjá ń pa shape JSON àìléwu àti wording provider tí
client auto-recovery nílò mọ́, ṣùgbọ́n kì í ṣe fífi kọjá byte-fún-byte: recursive sanitizer máa ń ṣiṣẹ́ ní gbogbo ìgbà
kí serialization tó ṣẹlẹ̀. Àwọn body tó ní cycle, tó ní BigInt, tàbí tó ní `toJSON()` tó léwu máa ń kùnà ní ọ̀nà títì-pa, wọn kò sì
ní ẹ̀tọ́ sí passthrough. OCR àti moderation ń lo ìlànà kan náà; àwọn body upstream tí kì í ṣe JSON, tí ó ṣófo, tàbí
tí a fi label tí kò tọ́ sí ni a máa yí padà sí canonical JSON error envelope OmniRoute.

## Ààlà CodeQL tí a mọ̀: kò dá àwọn sanitizer àdáni mọ̀

Ìbéèrè CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ń lo àkójọ ìfàyègbà tí a ti ṣètò fún àwọn àpẹẹrẹ sanitizer (fún àpẹẹrẹ, `.split("\n")[0]` inú ìlà, `String#replace` pẹ̀lú àwọn ìrísí regex kan pàtó, àti wíwọlé sí `.message` lórí `Error`). Kò **dá** ìtọ́kasí alákòóso mọ̀ nípasẹ̀ olùrànlọ́wọ́ àdáni bí `sanitizeErrorMessage()` tiwa.

Èyí túmọ̀ sí pé àwọn ibi ìpè tí ó hàn gbangba pé wọ́n ń ṣe ìsọdimímọ́ nípasẹ̀ modulu yìí — fún àpẹẹrẹ `open-sse/utils/error.ts::errorResponse` àti `open-sse/executors/cursor.ts::buildErrorResponse` — lè tẹ̀síwájú láti gbé ìkìlọ̀ náà jáde, bí ó tilẹ̀ jẹ́ pé kóòdù náà láìléwu ní ti iṣẹ́ rẹ̀. Àwọn ìkọ̀sílẹ̀ àpẹẹrẹ tẹ́lẹ̀: `#224`, `#231` (Oṣù Karùn-ún 2026), àwọn méjèèjì ni a sàmì sí `false positive` pẹ̀lú ìdáláre ìmọ̀ ẹ̀rọ.

**Bí a ṣe lè bójú tó ìṣẹ̀lẹ̀ tuntun:**

1. Jẹ́rìí sí i pé ibi ìpè náà ń darí ìfiránṣẹ́ náà nípasẹ̀ `sanitizeErrorMessage` / `buildErrorBody` / ọ̀kan lára àwọn wrapper tí a ṣàkọsílẹ̀ lókè (ka gbogbo ọ̀nà ìpè náà láti ìbẹ̀rẹ̀ dé òpin — má ṣe gbẹ́kẹ̀ lé àlàyé inú kóòdù).
2. Jẹ́rìí sí i pé `tests/unit/error-message-sanitization.test.ts` ń dán ọ̀nà náà wò (tàbí ṣàfikún àbò ìdánwò).
3. Kọ ìkìlọ̀ náà sílẹ̀ nípasẹ̀ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, kí o sì tọ́ka sí ìwé yìí.
4. **Má ṣe** “ṣe àtúnṣe” nípa fífi `.split("\n")[0]` sínú gbogbo ibi ní tààràtà — olùrànlọ́wọ́ náà ni orísun òtítọ́ kan ṣoṣo; ṣíṣe àdàkọ àpẹẹrẹ náà ń sọ sanitizer náà di aláìlágbára (ó ń pàdánù ìparẹ́ path, ààlà gígùn, àti ìyípadà irú) nítorí ìfẹ́ láti mú kí scanner náà dà bí ẹni pé ó tẹ́lọ́rùn.

Gbigba àwọn ẹ̀ya opt-in bíi àtòpọ̀ sanitizer àdáni [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ti CodeQL ni ojútùú ọlọ́jọ́-pípẹ́; ó wà níta ìwé yìí.

## Àwọn ìtọ́kasí

- [CWE-209: Ìṣípayá Ìwífún Nípasẹ̀ Ìfiránṣẹ́ Àṣìṣe](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Ìwé Ìtọ́nisọ́nà Kúkúrú fún Ìṣàkóso Àṣìṣe](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit tó kó olùrànlọ́wọ́ náà sí ibi kan: `1a39c31f` — _fix(security): bo àwọn creds upstream gbogbogbò mọ́lẹ̀ + kó ìsọdimímọ́ àṣìṣe sí ibi kan_
