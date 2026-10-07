# Error Message Sanitization (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Isi mmalite eziokwu:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, na ndị nrụpụta ọhaneze dị na `open-sse/utils/error.ts`
> **Nnwale:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Emelitere ikpeazụ:** 2026-09-02 — v3.8.51
> **Ndị e zubere maka ya:** Injinia ọ bụla na-emetụta nzaghachi njehie (ụzọ HTTP, iyi SSE, ndị mmebe ọrụ, ndị njikwa MCP).
> **Ọnọdụ:** **Ọ BỤRỤRỤ IWU** maka ụzọ koodu ọ bụla na-eweghachiri onye ahịa ozi njehie.

## Ihe mere nke a ji dị

Iwu CodeQL `js/stack-trace-exposure` (CWE-209) na-akara ụzọ koodu ọ bụla ebe ozi njehie sitere na runtime exception rutere na nzaghachi HTTP / SSE n'emeghị ka ọ dị nchebe. Stack traces na absolute file paths dị na nzaghachi production na-enye ndị mwakpo:

- Nhazi ndekọ dị n'ime (`/srv/app/src/lib/...`) → nyocha iji kwadebe mwakpo ndị ọzọ.
- Ụdị library / framework ndị a pụrụ ịmata site na stack frames → ịhọrọ exploit ezubere iche.
- Uru runtime nwere mmetụta nzuzo nke enwere ike itinye n'ime njehie site na string interpolation (ajụjụ DB, uru nhazi).

Ihe enyemaka `sanitizeErrorMessage` nke `open-sse/utils/error.ts` na-ebupụ na-ewepụ ụdị
mwepụta ozi ndị a:

1. Ọdụ stack-frame JavaScript nke dị n'anụ ahụ, nke e mere serialized, na nke doro anya na ọ dị inline.
2. Absolute POSIX, Windows, UNC, na ụzọ filesystem `file://`, ebe ọ na-echekwa URL HTTPS ndị dị nchebe
   na ụzọ API e ji akara pụrụ iche.
3. Ntinye credential, ụdị token ndị provider a na-ahụkarị, ngọngọ PEM private-key, na URL data base64.

Sanitizer ahụ na-amachi ogologo input ma mechie n'ụzọ dị nchebe mgbe uru a tụbara jụrụ string coercion.
Recursive upstream JSON sanitization na-ewepụkwa credential/path keys ndị na-adịghị nchebe, session aliases, na
prototype-control keys tupu e mee response serialized.

## Usoro a ga-agbasorịrị

### 1. Ịrụpụta nzaghachi njehie (ụzọ HTTP / API)

Jiri `buildErrorBody()` — sanitization dị n'ime ya:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... mgbagha handler ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ma ọ bụ, maka convenience wrappers dị n'otu module ahụ:

```ts
import {
  errorResponse, // Ihe Response a na-eji otu ugboro
  writeStreamError, // Onye ode SSE
  createErrorResult, // ọdịdị { success: false, status, response, ... }
  unavailableResponse, // na-agbakwunye Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Ha niile na-etinye canonical public-error boundary. `errorResponse`, `writeStreamError`, na
`createErrorResult` na-agafe na `buildErrorBody`; specialized retry/circuit helpers atọ ahụ
na-ewepụta ma na-eme public context ha ka ọ dị nchebe ozugbo. **Ọ dịghị mgbe ị ga-eji aka gị kpọọ
`sanitizeErrorMessage`** mgbe ị na-eji helpers ndị a.

### 2. Custom error envelopes (ọ na-adị ụkọ)

Mgbe ị na-enweghị ike iji helpers ndị dị n'elu (dịka ọmụmaatụ, mgbe upstream protocol dịka Connect-RPC kpebiri ọdịdị response), bubata `sanitizeErrorMessage` ozugbo:

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

Nke a bụ naanị ụzọ akwadoro iji chịkọta custom error body. Lee `open-sse/executors/cursor.ts::buildErrorResponse` maka mmejuputa e ji atụnyere.

### 3. Ide log na izipu nzaghachi

Trusted internal exceptions nwere ike idowe ozi na stack ha niile ka ndị ọrụ nwee ike ịchọpụta nsogbu. A ghaghị ime ka uru
sitere na provider, validation, browser-session, ma ọ bụ ókè credential-adjacent
dị nchebe tupu ha abanye na console output, audit metadata, ma ọ bụ persistent call logs. Usoro:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // naanị trusted internal exception
  return errorResponse(500, getErrorMessage(err)); // emere ka ọ dị nchebe — ezigara onye ahịa
}
```

Maka ọdịda nke provider na-achịkwa, wepụtakwa uru e dere na log:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Usoro ndị amachibidoro

❌ **Etinyekwala mgbe ọ bụla** raw exception output n'ime Response body:

```ts
// ỌJỌỌ: stack trace + file paths rutere onye ahịa
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Emepụtala mgbe ọ bụla** first-line splitter nke gị:

```ts
// ỌJỌỌ: ọ na-echefu iwepụ absolute paths, ma nwee ike isi na canonical helper pụọ
const safe = String(err).split("\n")[0];
```

❌ **Emela mgbe ọ bụla** sanitization naanị n'ụzọ ahụ ma chefuo ụzọ SSE. Ihe ọ bụla na-ede n'ime iyi ga-agafe na `writeStreamError` (ma ọ bụ `buildErrorBody` dị n'okpuru ya).

❌ **Etinyela mgbe ọ bụla** `process.cwd()`, `__filename`, `__dirname`, ma ọ bụ ụzọ sitere na env
n'ime ozi njehie n'ebumnobi. Sanitizer ahụ na-ekpuchi absolute paths dịka nchebe gbakwunyere n'ígwé, mana ndị na-akpọ ya agaghị
arụpụta ozi na-ekpughe topology na mbụ.

## Mkpuchi ule na CI

`tests/unit/error-message-sanitization.test.ts` na-amanye ihe ndị a:

- Ụzọ ọ bụla dị n'okpuru `/api/model-combo-mappings/*` na-eweghachite body ndị e sachara maka 4xx/5xx.
- `sanitizeErrorMessage` na-ewepụ stack trace nwere ọtụtụ ahịrị.
- `sanitizeErrorMessage` na-eji `<path>` dochie absolute path nke POSIX na Windows.
- `sanitizeErrorMessage` na-ejikwa input instance nke `null`/`undefined`/`Error` n'enweghị nsogbu.
- `buildErrorBody` anaghị ekpughe stack trace n'ime field `message` ya.

Mgbe ị na-agbakwunye route ma ọ bụ executor ọhụrụ, detuo usoro assertion dị na faịlụ a. Ọnụ ụzọ mkpuchi ule (`npm run test:coverage`) na-amanye ≥60% nke statements/lines/functions/branches — a ga-etinyerịrị ụzọ njehie n'ule.

## Njikwa ndị metụtara ya

- E kwesịrị idozi CodeQL alert `js/stack-trace-exposure` dị na `.github/security` site n'iji helper ndị a **ma ọ bụ** jụ ha site na comment nke na-arụtụ aka na doc a.
- Nhazi redaction nke `pino` (`src/shared/utils/logRedaction.ts`) na-ahụ maka log ahaziri nke a tụkwasịrị obi
  iche. Akwụkwọ a na-ekpuchi ozi response ọha na uru ndị provider na-achịkwa nke
  na-agafe oke call/proxy-log na-adịgide adịgide.
- Denylist nke upstream-header (`src/shared/constants/upstreamHeaders.ts`) na-ekpuchi mpụta header — mee ka faịlụ abụọ ahụ kwekọọ mgbe ị na-agbakwunye ihe ọhụrụ gbasara exfiltration.

## Ibufe nkọwa upstream

`buildErrorBody` na-anabata argument nke atọ a na-ahọrọ, `upstreamDetails` (body raw
nke a parse-rịrị site n'aka upstream provider). Mgbe e nyere ya, a na-eji
`sanitizeUpstreamDetails` sachaa ya tupu etinye ya na response dị ka `upstream_details`.

Argument nke anọ a na-ahọrọ, `classification`
(`{ type?: string; code?: string; reason?: string }`), na-anabata nhazi ọkwa ọha akọwapụtara nke ọma.
A na-atụgharị field ọ bụla gaa na mkpụrụokwu public-identifier nwere oke. Uru ndị na-adịghị nchebe, ndị yiri
credential, ndị nwere control-character, ma ọ bụ ndị toro oke na-alaghachi na type/code e sitere na status nweta; a na-ewepụ
reason a na-ahọrọ ma ọ bụrụ na ọ naghị echebe. Ihe njirimara HTTP status nwere digit atọ (`100` ruo `599`) ka bụ nke ziri ezi maka
nkwekọrịta provider ndị na-ekpughe numeric upstream status dịka code nke igwe nwere ike ịgụ. A na-anabatakwa otu
oke ahụ na ụdị placeholder HTTP-status a na-emepụta n'ime sistemụ; number na name provider ndị ọzọ na-enweghị oke
anọgideghị n'ime mkpụrụokwu ahụ.

Nyefee classification ọ bụla akọwapụtara nke ọma n'ime argument nke anọ ahụ. Edegharịla
`body.error.code`, `body.error.type`, ma ọ bụ `body.error.reason` mgbe `buildErrorBody()` lọghachiri;
mgbanwe emere mgbe builder gachara na-agafe public projection ahụ.

Iwu nsacha ndị a na-emetụta `upstreamDetails`:

1. Akwụkwọ string ndị dị na nsọtụ: gafee ha na `sanitizeErrorMessage` (na-ewepụ stack na absolute path).
2. A na-ewepụ key ndị metụtara path na-adịghị nchebe, credential, session-alias, na prototype-control.
3. Oke omimi: a na-eji string `"[truncated]"` dochie nesting gafere level 4.
4. A na-amachi array na element 32.

Naanị call site nwere body njehie provider a parse-rịrị kwesịrị inyefe `upstreamDetails`. Njehie OmniRoute
nke ime sistemụ (ọdịda parse SSE, content efu, mgbochi guardrail) agaghị etinye ya.

Ebufela `err.stack`, `err.message`, ma ọ bụ string ọ bụla sitere na runtime exception gaa na
`upstreamDetails`. Ndị ahụ ka ga-agafe `errorResponse` / `buildErrorBody(code, msg)`
n'enweghị upstream body.

Ibufe ụfọdụ upstream 4xx na-echekwa ọdịdị JSON na okwu provider ndị dị nchebe nke
client auto-recovery chọrọ, mana ọ bụghị ibufe byte-for-byte: recursive sanitizer na-arụ ọrụ mgbe niile
tupu serialization. Body nwere cycle, nke nwere BigInt, ma ọ bụ nke nwere `toJSON()` ọjọọ na-ajụ onwe ya n'ụzọ nchebe, ya mere
ha erughị eru maka passthrough. OCR na moderation na-etinyekwa otu iwu ahụ; a na-atụgharị upstream body
na-abụghị JSON, nke tọgbọ chakoo, ma ọ bụ nke e nyere label na-ezighi ezi gaa na canonical OmniRoute JSON error envelope.

## Mmachi CodeQL a maara: anaghị amata ndị na-asachapụ omenala

Ajụjụ CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) na-eji ndepụta a kapịrị ọnụ nke ụkpụrụ ndị na-asachapụ enyere ikike (dịka inline `.split("\n")[0]`, `String#replace` nwere ụdị regex akọwapụtara, na ịnweta `.message` na `Error`). Ọ **naghị** amata ntụgharị site na enyemaka omenala dịka `sanitizeErrorMessage()` nke anyị.

Nke a pụtara na ebe a na-akpọ ọrụ ndị na-egosi n'ụzọ doro anya na ha na-asachapụ ozi site na modul a — dịka ọmụmaatụ `open-sse/utils/error.ts::errorResponse` na `open-sse/executors/cursor.ts::buildErrorResponse` — nwere ike ịga n'ihu na-ebute ọkwa ahụ n'agbanyeghị na koodu ahụ dị nchebe n'ọrụ. Ntụaka mkpochapụ ndị gara aga: `#224`, `#231` (Mee 2026), ha abụọ ka akara `false positive` tinyere nkọwa teknụzụ.

**Otu esi edozi ọnọdụ ọhụrụ:**

1. Gbaa mbọ hụ na ebe a na-akpọ ọrụ ahụ na-ebufe ozi ahụ n'ezie site na `sanitizeErrorMessage` / `buildErrorBody` / otu n'ime wrappers ndị edepụtara n'elu (gụpụta usoro oku ahụ site na mmalite ruo na njedebe — atụkwasịla obi na comment).
2. Gbaa mbọ hụ na `tests/unit/error-message-sanitization.test.ts` na-anwale ụzọ ahụ (ma ọ bụ tinye mkpuchi ule).
3. Jiri `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` kagbuo ọkwa ahụ, ma rụtụ aka na doc a.
4. **Edokwala** ya site n'itinye `.split("\n")[0]` ozugbo n'ebe niile — enyemaka ahụ bụ naanị isi iyi nke eziokwu; imepụtaghachi ụkpụrụ ahụ na-eme ka onye na-asachapụ ahụ ghara ịdị ike (ọ na-efunahụ nhichapụ path, oke ogologo, na type coercion) naanị ka ọ dị ka a na-eme scanner ahụ obi ụtọ.

Ịnabata atụmatụ ndị a na-ahọrọ iji, dịka nhazi sanitizer omenala nke CodeQL [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), bụ ndozi ogologo oge; ọ dịghị n'ime doc a.

## Ntụaka

- [CWE-209: Ikpughe Ozi Site na Ozi Njehie](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Akwụkwọ Nduzi Ngwa Ngwa Maka Ijikwa Njehie](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit nke mere ka enyemaka ahụ dị n'otu ebe: `1a39c31f` — _fix(security): kpuchie creds upstream ọha + mee ka nhichapụ njehie dị n'otu ebe_
