# Error Message Sanitization (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Pinagmumulan ng katotohanan:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, at ang mga pampublikong builder sa `open-sse/utils/error.ts`
> **Mga test:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Huling na-update:** 2026-09-02 — v3.8.51
> **Para kanino:** Sinumang engineer na humahawak ng mga tugon sa error (mga HTTP route, SSE stream, executor, MCP handler).
> **Katayuan:** **SAPILITAN** para sa bawat code path na nagbabalik ng mensahe ng error sa isang client.

## Bakit ito umiiral

Tina-flag ng CodeQL rule na `js/stack-trace-exposure` (CWE-209) ang anumang code path kung saan ang mensahe ng error na nagmula sa isang runtime exception ay nakararating sa isang HTTP / SSE response nang hindi na-sanitize. Ang mga stack trace at absolute file path sa mga production response ay nagbibigay sa mga attacker ng:

- Panloob na ayos ng directory (`/srv/app/src/lib/...`) → reconnaissance para sa mga susunod na pag-atake.
- Mga bersyon ng library / framework na mahihinuha mula sa mga stack frame → pagpili ng naka-target na exploit.
- Mga sensitibong runtime value na maaaring na-string-interpolate sa mga error (mga DB query, config value).

Inaalis ng helper na `sanitizeErrorMessage` na ine-export ng `open-sse/utils/error.ts` ang mga sumusunod na uri ng
pagtagas:

1. Mga pisikal, serialized, at hindi malabong inline na JavaScript stack-frame tail.
2. Mga absolute POSIX, Windows, UNC, at `file://` filesystem path, habang pinapanatili ang mga ligtas na HTTPS URL
   at tahasang minarkahang API route.
3. Mga pagtatalaga ng credential, karaniwang format ng provider token, mga private-key PEM block, at base64 data
   URL.

Nililimitahan ng sanitizer ang haba ng input at ligtas na nabibigo kapag tinanggihan ng isang thrown value ang string coercion.
Inaalis din ng recursive upstream JSON sanitization ang mga hindi ligtas na credential/path key, session alias, at
prototype-control key bago i-serialize ang isang response.

## Ang sapilitang pattern

### 1. Pagbuo ng tugon sa error (mga HTTP / API route)

Gamitin ang `buildErrorBody()` — built-in ang sanitization:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... lohika ng handler ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

O, para sa mga convenience wrapper sa parehong module:

```ts
import {
  errorResponse, // one-shot na Response object
  writeStreamError, // SSE writer
  createErrorResult, // hugis na { success: false, status, response, ... }
  unavailableResponse, // nagdaragdag ng Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Inilalapat ng lahat ng ito ang canonical public-error boundary. Dumaraan ang `errorResponse`, `writeStreamError`, at
`createErrorResult` sa `buildErrorBody`; direktang pine-project at sine-sanitize ng tatlong specialized retry/circuit helper
ang kanilang pampublikong context. **Hindi mo kailangang tawagin nang manu-mano ang
`sanitizeErrorMessage`** kapag ginagamit ang mga helper na ito.

### 2. Mga custom na error envelope (bihira)

Kapag hindi mo magamit ang mga helper sa itaas (hal. idinidikta ng upstream protocol gaya ng Connect-RPC ang hugis ng response), direktang i-import ang `sanitizeErrorMessage`:

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

Ito lamang ang pinahihintulutang paraan upang bumuo ng custom na error body. Tingnan ang `open-sse/executors/cursor.ts::buildErrorResponse` para sa reference implementation.

### 3. Pag-log kumpara sa pagtugon

Maaaring panatilihin ng mga pinagkakatiwalaang internal exception ang kanilang buong mensahe at stack upang makapag-debug ang mga operator. Ang mga value
na nagmumula sa provider, validation, browser-session, o mga boundary na malapit sa credential ay dapat
i-sanitize bago mapasama ang mga ito sa console output, audit metadata, o persistent call log. Pattern:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "nabigo ang handler"); // pinagkakatiwalaang internal exception lamang
  return errorResponse(500, getErrorMessage(err)); // na-sanitize — ipinadala sa client
}
```

Para sa mga failure na kontrolado ng provider, i-project din ang naka-log na value:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Nabigo ang request sa provider",
});
```

### 4. Mga ipinagbabawal na pattern

❌ **Huwag kailanman** maglagay ng raw na exception output sa isang Response body:

```ts
// MALI: nakararating sa client ang stack trace + mga file path
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Huwag kailanman** gumawa ng sarili mong first-line splitter:

```ts
// MALI: nakakalimutang alisin ang mga absolute path, maaaring lumihis sa canonical helper
const safe = String(err).split("\n")[0];
```

❌ **Huwag kailanman** mag-sanitize sa route ngunit kalimutan ang SSE path. Anumang nagsusulat sa isang stream ay dumaraan sa `writeStreamError` (o sa underlying na `buildErrorBody` nito).

❌ **Huwag kailanman** sadyang isama ang `process.cwd()`, `__filename`, `__dirname`, o mga path na nagmula sa env
sa mga mensahe ng error. Sinasaklaw ng sanitizer ang mga absolute path bilang defense in depth, ngunit hindi dapat
bumuo ang mga caller ng mga mensaheng naglalantad ng topology sa simula pa lamang.

## Saklaw sa CI

Ipinapatupad ng `tests/unit/error-message-sanitization.test.ts` ang sumusunod:

- Ang bawat route sa ilalim ng `/api/model-combo-mappings/*` ay nagbabalik ng mga na-sanitize na body sa 4xx/5xx.
- Tinatanggal ng `sanitizeErrorMessage` ang mga multi-line stack trace.
- Pinapalitan ng `sanitizeErrorMessage` ang mga absolute path ng POSIX at Windows ng `<path>`.
- Ligtas na pinoproseso ng `sanitizeErrorMessage` ang mga input na `null`/`undefined`/instance ng `Error`.
- Hindi kailanman inilalantad ng `buildErrorBody` ang mga stack trace sa field nitong `message`.

Kapag nagdaragdag ng bagong route o executor, kopyahin ang pattern ng assertion mula sa file na ito. Ipinapatupad ng coverage gate (`npm run test:coverage`) ang ≥60% statements/lines/functions/branches — dapat masaklaw ang mga error path.

## Mga kaugnay na kontrol

- Ang mga alertong `js/stack-trace-exposure` ng CodeQL sa `.github/security` ay dapat palaging **alinman sa** ayusin gamit ang mga helper na ito **o** i-dismiss na may komentong tumutukoy sa dokumentong ito.
- Hiwalay na pinangangasiwaan ng configuration ng redaction ng `pino` (`src/shared/utils/logRedaction.ts`) ang mga pinagkakatiwalaang structured log. Sinasaklaw ng dokumentong ito ang mga pampublikong mensahe ng response at mga value na kontrolado ng provider na tumatawid sa mga persistent na hangganan ng call/proxy-log.
- Sinasaklaw ng upstream-header denylist (`src/shared/constants/upstreamHeaders.ts`) ang pagtagas ng header — panatilihing magkatugma ang dalawang file kapag nagdaragdag ng bagong alalahanin sa exfiltration.

## Pagpapasa ng mga detalye mula sa upstream

Tumatanggap ang `buildErrorBody` ng opsyonal na ikatlong argument na `upstreamDetails` (raw na na-parse na body mula sa upstream provider). Kapag ibinigay, sina-sanitize ito ng `sanitizeUpstreamDetails` bago isama sa response bilang `upstream_details`.

Tumatanggap ang opsyonal na ikaapat na argument na `classification`
(`{ type?: string; code?: string; reason?: string }`) ng tahasang pampublikong klasipikasyon.
Ang bawat field ay ipinoproyekto sa limitadong bokabularyo ng mga pampublikong identifier. Ang mga value na hindi ligtas, kahawig ng credential, may control character, o sobrang haba ay bumabalik sa type/code na hinango mula sa status; ang hindi ligtas na opsyonal na reason ay inaalis. Nananatiling valid ang tatlong-digit na HTTP status identifier (`100` hanggang `599`) para sa mga kontrata ng provider na inilalantad ang numerikong upstream status bilang machine-readable na code. Tinatanggap din ang parehong limitadong range sa lokal na binubuong anyo ng HTTP-status placeholder; nananatiling wala sa bokabularyo ang mga arbitraryong numero at pangalan ng provider.

Ipasa ang bawat tahasang klasipikasyon sa ikaapat na argument na iyon. Huwag kailanman i-overwrite ang
`body.error.code`, `body.error.type`, o `body.error.reason` pagkatapos mag-return ang `buildErrorBody()`;
nilalampasan ng mutation pagkatapos ng builder ang pampublikong projection.

Mga panuntunan sa sanitization na inilalapat sa `upstreamDetails`:

1. Mga string leaf: iproseso sa `sanitizeErrorMessage` (tinatanggal ang mga stack at absolute path).
2. Inaalis ang mga hindi ligtas na key para sa path, credential, session alias, at prototype control.
3. Limitasyon sa depth: ang nesting na lampas sa 4 na level ay pinapalitan ng string na `"[truncated]"`.
4. Nililimitahan ang mga array sa 32 elemento.

Ang mga call site lamang na may na-parse na error body ng provider ang dapat magpasa ng `upstreamDetails`. Hindi ito dapat isama ng mga internal na error ng OmniRoute (mga pagkabigo sa pag-parse ng SSE, walang laman na content, mga pag-block ng guardrail).

Huwag ipasa ang raw na `err.stack`, `err.message`, o anumang string mula sa runtime exception sa
`upstreamDetails`. Dapat pa ring dumaan ang mga iyon sa `errorResponse` / `buildErrorBody(code, msg)`
nang walang upstream body.

Pinapanatili ng selective na upstream 4xx passthrough ang ligtas na JSON shape at pananalita ng provider na kinakailangan ng awtomatikong pag-recover ng client, ngunit hindi ito byte-for-byte na passthrough: palaging tumatakbo ang recursive sanitizer bago ang serialization. Ang mga body na cyclic, may BigInt, o may mapaminsalang `toJSON()` ay awtomatikong itinatanggi at hindi kwalipikado para sa passthrough. Inilalapat ng OCR at moderation ang parehong panuntunan; ang mga upstream body na hindi JSON, blangko, o may maling label ay kino-convert sa canonical na JSON error envelope ng OmniRoute.

## Kilalang limitasyon ng CodeQL: hindi nakikilala ang mga custom sanitizer

Gumagamit ang CodeQL query na [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ng nakapirming allowlist ng mga pattern ng sanitizer (hal. inline na `.split("\n")[0]`, `String#replace` na may mga partikular na anyo ng regex, at pag-access sa `.message` ng `Error`). **Hindi** nito nakikilala ang indirection sa pamamagitan ng custom helper tulad ng ating `sanitizeErrorMessage()`.

Nangangahulugan ito na ang mga callsite na mapatutunayang nagsa-sanitize sa pamamagitan ng module na ito — halimbawa, `open-sse/utils/error.ts::errorResponse` at `open-sse/executors/cursor.ts::buildErrorResponse` — ay maaari pa ring maglabas ng alert kahit functionally safe ang code. Mga naunang dismissal: `#224`, `#231` (Mayo 2026), na parehong minarkahang `false positive` na may teknikal na katwiran.

**Paano pangasiwaan ang bagong paglitaw:**

1. Kumpirmahing talagang ipinapadaan ng callsite ang mensahe sa `sanitizeErrorMessage` / `buildErrorBody` / isa sa mga wrapper na nakadokumento sa itaas (basahin ang call chain mula simula hanggang dulo — huwag magtiwala sa isang comment).
2. Kumpirmahing sinusubukan ng `tests/unit/error-message-sanitization.test.ts` ang path (o magdagdag ng coverage).
3. I-dismiss ang alert sa pamamagitan ng `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` habang binabanggit ang doc na ito.
4. **Huwag** itong "ayusin" sa pamamagitan ng pag-inline ng `.split("\n")[0]` sa lahat ng lugar — ang helper ang nag-iisang source of truth; pinahihina ng pagdodoble sa pattern ang sanitizer (nawawala ang path scrubbing, limitasyon sa haba, at type coercion) para lamang magmukhang napapayapa ang scanner.

Ang paggamit ng mga opt-in feature tulad ng custom sanitizer config na [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ng CodeQL ang pangmatagalang solusyon; wala ito sa saklaw ng doc na ito.

## Mga Sanggunian

- [CWE-209: Paglalantad ng Impormasyon sa Pamamagitan ng Mensahe ng Error](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Cheat Sheet sa Pangangasiwa ng Error](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit na nagsentralisa sa helper: `1a39c31f` — _fix(security): itago ang mga pampublikong upstream credential + isentralisa ang error sanitization_
