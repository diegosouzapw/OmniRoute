# Error Message Sanitization (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Sors awtorevoli:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, u l-builders pubbliċi f’`open-sse/utils/error.ts`
> **Testijiet:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Aġġornat l-aħħar:** 2026-09-02 — v3.8.51
> **Udjenza:** Kwalunkwe inġinier li jaħdem fuq risposti ta’ żbalji (rotot HTTP, streams SSE, executors, handlers MCP).
> **Status:** **OBBLIGATORJU** għal kull mogħdija tal-kodiċi li tirritorna messaġġ ta’ żball lil klijent.

## Għaliex jeżisti dan

Ir-regola `js/stack-trace-exposure` (CWE-209) ta’ CodeQL timmarka kwalunkwe mogħdija tal-kodiċi fejn messaġġ ta’ żball li joriġina minn eċċezzjoni waqt l-eżekuzzjoni jasal f’risposta HTTP / SSE mingħajr ma jiġi sanitizzat. Stack traces u mogħdijiet assoluti tal-fajls fir-risposti tal-produzzjoni jagħtu lill-attakkanti:

- L-istruttura interna tad-direttorji (`/srv/app/src/lib/...`) → rikonoxximent għal aktar attakki.
- Verżjonijiet ta’ libreriji / frameworks dedotti minn stack frames → għażla mmirata ta’ exploits.
- Valuri sensittivi waqt l-eżekuzzjoni li jistgħu jiġu interpolati bħala strings fi żbalji (queries tad-DB, valuri tal-konfigurazzjoni).

Il-helper `sanitizeErrorMessage` esportat minn `open-sse/utils/error.ts` ineħħi dawn il-klassijiet ta’
tnixxija:

1. Tmiem ta’ stack frames ta’ JavaScript fiżiċi, serjalizzati, u inline li huma mingħajr ambigwità.
2. Mogħdijiet assoluti tas-sistema tal-fajls POSIX, Windows, UNC, u `file://`, filwaqt li jippreserva URLs HTTPS sikuri
   u rotot API mmarkati b’mod espliċitu.
3. Assenjazzjonijiet ta’ kredenzjali, formati komuni ta’ tokens ta’ providers, blokki PEM ta’ ċwievet privati, u URLs
   tad-data base64.

Is-sanitizzatur jillimita t-tul tal-input u jirrifjuta b’mod sikur meta valur mitfugħ jirrifjuta l-konverżjoni għal string.
Is-sanitizzazzjoni rikorsiva tal-JSON upstream tneħħi wkoll keys mhux sikuri ta’ kredenzjali/mogħdijiet, aliases tas-sessjoni, u
keys li jikkontrollaw il-prototip qabel ma risposta tiġi serjalizzata.

## Il-mudell obbligatorju

### 1. Il-bini ta’ risposta ta’ żball (rotot HTTP / API)

Uża `buildErrorBody()` — is-sanitizzazzjoni hija inkorporata:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... loġika tal-handler ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Jew, għall-wrappers ta’ konvenjenza fl-istess modulu:

```ts
import {
  errorResponse, // oġġett Response ta’ darba
  writeStreamError, // writer SSE
  createErrorResult, // forma { success: false, status, response, ... }
  unavailableResponse, // iżid Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Dawn kollha japplikaw il-konfini kanoniku tal-iżbalji pubbliċi. `errorResponse`, `writeStreamError`, u
`createErrorResult` jgħaddu minn `buildErrorBody`; it-tliet helpers speċjalizzati għar-retry/circuit
jipproġettaw u jissanitizzaw il-kuntest pubbliku tagħhom direttament. **Qatt ma għandek bżonn issejjaħ
`sanitizeErrorMessage` manwalment** meta tuża dawn il-helpers.

### 2. Envelopes personalizzati tal-iżbalji (rari)

Meta ma tkunx tista’ tuża l-helpers ta’ hawn fuq (eż. il-forma tar-risposta tkun imposta minn protokoll upstream bħal Connect-RPC), importa `sanitizeErrorMessage` direttament:

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

Dan huwa l-uniku mod approvat biex jinbena body personalizzat ta’ żball. Ara `open-sse/executors/cursor.ts::buildErrorResponse` għall-implimentazzjoni ta’ referenza.

### 3. Logging vs. rispons

Eċċezzjonijiet interni fdati jistgħu jżommu l-messaġġ u l-stack sħaħ tagħhom sabiex l-operaturi jkunu jistgħu jiddebuggjaw. Valuri
li joriġinaw fil-konfini ta’ provider, validazzjoni, sessjoni tal-browser, jew qrib il-kredenzjali għandhom jiġu
sanitizzati qabel jidħlu fl-output tal-console, metadata tal-awditjar, jew logs persistenti tas-sejħiet. Mudell:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // eċċezzjoni interna fdata biss
  return errorResponse(500, getErrorMessage(err)); // sanitizzat — mibgħut lill-klijent
}
```

Għal fallimenti kkontrollati minn provider, ipproġetta wkoll il-valur illoggjat:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Mudelli pprojbiti

❌ **Qatt** tpoġġi output mhux ipproċessat ta’ eċċezzjoni f’body ta’ Response:

```ts
// ĦAŻIN: stack trace + mogħdijiet tal-fajls jaslu għand il-klijent
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Qatt** toħloq splitter tal-ewwel linja tiegħek stess:

```ts
// ĦAŻIN: jinsa jneħħi mogħdijiet assoluti, jista’ jiddevja mill-helper kanoniku
const safe = String(err).split("\n")[0];
```

❌ **Qatt** tissanitizza fir-rotta u tinsa l-mogħdija SSE. Kull ħaġa li tikteb fi stream tgħaddi minn `writeStreamError` (jew il-`buildErrorBody` sottostanti tiegħu).

❌ **Qatt** tinkludi intenzjonalment `process.cwd()`, `__filename`, `__dirname`, jew mogħdijiet derivati mill-env
f’messaġġi ta’ żball. Is-sanitizzatur ikopri mogħdijiet assoluti bħala difiża f’diversi saffi, iżda min isejjaħ m’għandux
joħloq messaġġi li jiżvelaw it-topoloġija mill-bidu nett.

## Kopertura fis-CI

`tests/unit/error-message-sanitization.test.ts` jiżgura li:

- Kull route taħt `/api/model-combo-mappings/*` tirritorna bodies sanitizzati għal 4xx/5xx.
- `sanitizeErrorMessage` ineħħi stack traces b’diversi linji.
- `sanitizeErrorMessage` jissostitwixxi paths assoluti ta’ POSIX u Windows b’`<path>`.
- `sanitizeErrorMessage` jimmaniġġja b’mod sikur inputs ta’ istanzi `null`/`undefined`/`Error`.
- `buildErrorBody` qatt ma jikxef stack traces fil-field `message` tiegħu.

Meta żżid route jew executor ġdid, ikkopja l-mudell tal-assertions minn dan il-file. Il-limitu tal-kopertura (`npm run test:coverage`) jimponi ≥60% għal statements/lines/functions/branches — il-flussi tal-iżbalji jridu jkunu koperti.

## Kontrolli relatati

- L-alerts CodeQL `js/stack-trace-exposure` f’`.github/security` għandhom dejjem ikunu **jew** irranġati permezz ta’ dawn il-helpers **jew** miċħuda b’kumment li jirreferi għal dan id-dokument.
- Il-konfigurazzjoni tar-redaction ta’ `pino` (`src/shared/utils/logRedaction.ts`) timmaniġġja separatament il-logs strutturati fdati. Dan id-dokument ikopri l-messaġġi tar-rispons pubbliku u l-valuri kkontrollati mill-provider li jaqsmu l-konfini persistenti ta’ call/proxy-log.
- Id-denylist tal-headers upstream (`src/shared/constants/upstreamHeaders.ts`) tkopri t-tnixxija tal-headers — żomm iż-żewġ files allinjati meta żżid tħassib ġdid dwar l-esfiltrazzjoni.

## Passaġġ tad-dettalji upstream

`buildErrorBody` jaċċetta t-tielet argument fakultattiv `upstreamDetails` (il-body mhux ipproċessat u pparsjat mill-provider upstream). Meta jiġi pprovdut, jiġi sanitizzat minn `sanitizeUpstreamDetails` qabel ma jiġi inkluż fir-rispons bħala `upstream_details`.

Ir-raba’ argument fakultattiv `classification`
(`{ type?: string; code?: string; reason?: string }`) jaċċetta klassifikazzjoni pubblika espliċita.
Kull field jiġi pproġettat fuq il-vokabularju limitat tal-identifikaturi pubbliċi. Valuri mhux sikuri, li għandhom forma ta’ kredenzjali, li fihom control characters, jew li huma twal iżżejjed jerġgħu jaqgħu lura għat-type/code derivat mill-istatus; reason fakultattiv mhux sikur jitħalla barra. Identifikaturi tal-istatus HTTP bi tliet ċifri (`100` sa `599`) jibqgħu validi għal kuntratti ta’ providers li jesponu l-istatus upstream numeriku bħala code li jista’ jinqara minn magna. L-istess medda limitata hija aċċettata fil-forma ta’ placeholder tal-istatus HTTP iġġenerat lokalment; numri u ismijiet arbitrarji tal-provider jibqgħu barra mill-vokabularju.

Għaddi kull klassifikazzjoni espliċita f’dak ir-raba’ argument. Qatt tissostitwixxi
`body.error.code`, `body.error.type`, jew `body.error.reason` wara li jirritorna `buildErrorBody()`;
modifika wara l-builder tevita l-projezzjoni pubblika.

Regoli ta’ sanitizzazzjoni applikati għal `upstreamDetails`:

1. Valuri terminali ta’ string: għaddihom minn `sanitizeErrorMessage` (ineħħi stacks + paths assoluti).
2. Keys mhux sikuri relatati ma’ paths, kredenzjali, aliases ta’ sessions, u kontroll tal-prototype jitneħħew.
3. Limitu tal-fond: nesting lil hinn minn 4 livelli jiġi sostitwit bl-string `"[truncated]"`.
4. Arrays huma limitati għal 32 element.

Call sites b’body ta’ żball tal-provider ipparsjat biss għandhom jgħaddu `upstreamDetails`. Żbalji interni ta’ OmniRoute
(fallimenti tal-parsing SSE, kontenut vojt, imblukkar mill-guardrails) ma għandhomx jinkluduh.

Tgħaddix `err.stack`, `err.message` mhux ipproċessati, jew kwalunkwe string minn runtime exception lil
`upstreamDetails`. Dawn xorta jridu jgħaddu minn `errorResponse` / `buildErrorBody(code, msg)`
mingħajr body upstream.

Il-passaġġ selettiv ta’ 4xx upstream jippreserva l-forma JSON sikura u l-kliem tal-provider meħtieġa
għall-irkupru awtomatiku tal-client, iżda mhuwiex passaġġ byte-for-byte: is-sanitizer rikursiv dejjem jitħaddem
qabel is-serialization. Bodies ċikliċi, li fihom BigInt, jew li għandhom `toJSON()` ostili jingħalqu b’mod sikur u ma jkunux
eliġibbli għall-passaġġ. OCR u moderation japplikaw l-istess regola; bodies upstream li mhumiex JSON, huma vojta, jew
għandhom tikketta skorretta jiġu kkonvertiti għall-envelope tal-iżball JSON kanoniku ta’ OmniRoute.

## Limitazzjoni magħrufa ta’ CodeQL: sanitizzaturi personalizzati ma jiġux rikonoxxuti

Il-query ta’ CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) tuża lista fissa ta’ mudelli ta’ sanitizzaturi permessi (eż. `.split("\n")[0]` inline, `String#replace` b’forom speċifiċi ta’ regex, aċċess għal `.message` fuq `Error`). Din **ma** tirrikonoxxix indirezzjoni permezz ta’ helper personalizzat bħal `sanitizeErrorMessage()` tagħna.

Dan ifisser li punti tas-sejħa li b’mod dimostrabbli jwettqu sanitizzazzjoni permezz ta’ dan il-modulu — pereżempju `open-sse/utils/error.ts::errorResponse` u `open-sse/executors/cursor.ts::buildErrorResponse` — jistgħu jkomplu jqajmu t-twissija minkejja li l-kodiċi huwa funzjonalment sikur. Preċedenti ta’ twissijiet miċħuda: `#224`, `#231` (Mejju 2026), it-tnejn immarkati bħala `false positive` b’ġustifikazzjoni teknika.

**Kif għandek tittratta okkorrenza ġdida:**

1. Ikkonferma li l-punt tas-sejħa fil-fatt jgħaddi l-messaġġ minn `sanitizeErrorMessage` / `buildErrorBody` / wieħed mill-wrappers dokumentati hawn fuq (aqra l-katina tas-sejħiet mill-bidu sal-aħħar — toqgħodx fuq kumment).
2. Ikkonferma li `tests/unit/error-message-sanitization.test.ts` jittestja din il-mogħdija (jew żid kopertura).
3. Iċħad it-twissija permezz ta’ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` billi tirreferi għal dan id-dokument.
4. **Tippruvax** “tirranġa” billi ddaħħal `.split("\n")[0]` inline kullimkien — il-helper huwa s-sors uniku tal-verità; id-duplikazzjoni tal-mudell iddgħajjef is-sanitizzatur (jitilfu t-tneħħija tal-paths, il-limitu tat-tul u l-konverżjoni tat-tip) sempliċement biex jidher li l-iskaner ġie ssodisfat.

L-adozzjoni ta’ karatteristiċi fakultattivi bħall-konfigurazzjoni tas-sanitizzatur personalizzat [`@codeql/javascript-models` ta’ CodeQL](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) hija s-soluzzjoni fit-tul; din tinsab barra l-ambitu ta’ dan id-dokument.

## Referenzi

- [CWE-209: Espożizzjoni ta’ Informazzjoni Permezz ta’ Messaġġ ta’ Żball](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Gwida ta’ Referenza għall-Immaniġġjar tal-Iżbalji](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit li jiċċentralizza l-helper: `1a39c31f` — _fix(security): aħbi l-kredenzjali pubbliċi upstream + iċċentralizza s-sanitizzazzjoni tal-iżbalji_
