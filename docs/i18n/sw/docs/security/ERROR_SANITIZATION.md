# Error Message Sanitization (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Chanzo cha ukweli:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, na wajenzi wa umma katika `open-sse/utils/error.ts`
> **Majaribio:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Ilisasishwa mara ya mwisho:** 2026-09-02 — v3.8.51
> **Hadhira:** Mhandisi yeyote anayeshughulikia majibu ya hitilafu (njia za HTTP, mitiririko ya SSE, vitekelezaji, vishughulikiaji vya MCP).
> **Hali:** **LAZIMA** kwa kila njia ya msimbo inayorudisha ujumbe wa hitilafu kwa mteja.

## Kwa nini hii ipo

Kanuni ya CodeQL `js/stack-trace-exposure` (CWE-209) huashiria njia yoyote ya msimbo ambapo ujumbe wa hitilafu unaotokana na hitilafu ya wakati wa utekelezaji unafikia jibu la HTTP / SSE bila kutakaswa. Mifuatano ya rafu na njia kamili za faili katika majibu ya uzalishaji huwapa washambuliaji:

- Mpangilio wa saraka za ndani (`/srv/app/src/lib/...`) → uchunguzi kwa ajili ya mashambulizi zaidi.
- Matoleo ya maktaba / mfumo yanayobainishwa kutokana na fremu za rafu → uteuzi wa shambulizi linalolenga udhaifu mahususi.
- Thamani nyeti za wakati wa utekelezaji ambazo huenda zimepachikwa kama mifuatano ndani ya hitilafu (hoja za DB, thamani za usanidi).

Kisaidizi cha `sanitizeErrorMessage` kinachosafirishwa na `open-sse/utils/error.ts` huondoa aina hizi za
uvujaji:

1. Mikia ya fremu za rafu ya JavaScript ya kimwili, iliyosawazishwa, na iliyo wazi bila utata ndani ya mstari.
2. Njia kamili za mifumo ya faili ya POSIX, Windows, UNC, na `file://`, huku kikihifadhi URL salama za HTTPS
   na njia za API zilizowekwa alama wazi.
3. Ugawaji wa taarifa za uthibitishaji, miundo ya kawaida ya tokeni za watoa huduma, vitalu vya PEM vya funguo binafsi, na URL za data za base64.

Kitakasaji huweka kikomo cha urefu wa ingizo na hufunga kwa usalama wakati thamani iliyotupwa inakataa ugeuzaji kuwa mfuatano.
Utakaso wa JSON wa rekursia kutoka chanzo cha juu pia huondoa funguo zisizo salama za taarifa za uthibitishaji/njia, lakabu za vipindi, na
funguo za kudhibiti prototipu kabla ya jibu kusawazishwa.

## Muundo wa lazima

### 1. Kuunda jibu la hitilafu (njia za HTTP / API)

Tumia `buildErrorBody()` — utakaso umejengewa ndani:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... mantiki ya kishughulikiaji ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Au, kwa vifungashio vya urahisi vilivyo katika moduli hiyo hiyo:

```ts
import {
  errorResponse, // kipengee cha Response cha matumizi ya mara moja
  writeStreamError, // mwandishi wa SSE
  createErrorResult, // muundo wa { success: false, status, response, ... }
  unavailableResponse, // huongeza Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Vyote hivi hutumia mpaka sanifu wa hitilafu za umma. `errorResponse`, `writeStreamError`, na
`createErrorResult` hupitishwa kupitia `buildErrorBody`; visaidizi vitatu maalum vya kujaribu tena/saketi
huchuja na kutakasa muktadha wake wa umma moja kwa moja. **Kamwe huhitaji kuita
`sanitizeErrorMessage` wewe mwenyewe** unapotumia visaidizi hivi.

### 2. Bahasha maalum za hitilafu (mara chache)

Wakati huwezi kutumia visaidizi vilivyo hapo juu (k.m. muundo wa jibu umeamuliwa na itifaki ya chanzo cha juu kama Connect-RPC), ingiza `sanitizeErrorMessage` moja kwa moja:

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

Hii ndiyo njia pekee iliyoidhinishwa ya kuunda kiini maalum cha hitilafu. Tazama `open-sse/executors/cursor.ts::buildErrorResponse` kwa utekelezaji wa marejeleo.

### 3. Kuweka kumbukumbu dhidi ya kujibu

Hitilafu za ndani zinazoaminika zinaweza kuhifadhi ujumbe na mfuatano wake kamili ili waendeshaji waweze kutatua matatizo. Thamani
zinazotoka kwenye mipaka ya mtoa huduma, uthibitishaji, kipindi cha kivinjari, au iliyo karibu na taarifa za uthibitishaji lazima
zitakaswe kabla ya kuingia kwenye matokeo ya dashibodi, metadata ya ukaguzi, au kumbukumbu endelevu za miito. Muundo:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // hitilafu ya ndani inayoaminika pekee
  return errorResponse(500, getErrorMessage(err)); // imetakaswa — imetumwa kwa mteja
}
```

Kwa hitilafu zinazodhibitiwa na mtoa huduma, chuja pia thamani inayowekwa kwenye kumbukumbu:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Miundo iliyokatazwa

❌ **Kamwe** usiweke matokeo ghafi ya hitilafu katika kiini cha Response:

```ts
// MBAYA: mfuatano wa rafu + njia za faili humfikia mteja
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Kamwe** usitengeneze kigawanyaji chako mwenyewe cha mstari wa kwanza:

```ts
// MBAYA: husahau kuondoa njia kamili, huenda ikapotoka kutoka kwenye kisaidizi sanifu
const safe = String(err).split("\n")[0];
```

❌ **Kamwe** usitakase katika njia na kusahau njia ya SSE. Chochote kinachoandika kwenye mtiririko hupitia `writeStreamError` (au `buildErrorBody` yake ya msingi).

❌ **Kamwe** usijumuishe kwa makusudi `process.cwd()`, `__filename`, `__dirname`, au njia zinazotokana na env
katika jumbe za hitilafu. Kitakasaji hushughulikia njia kamili kama ulinzi wa kina, lakini waitaji hawapaswi
kutengeneza jumbe zinazofichua topolojia tangu mwanzo.

## Ufunikaji katika CI

`tests/unit/error-message-sanitization.test.ts` huhakikisha:

- Kila route iliyo chini ya `/api/model-combo-mappings/*` hurejesha body zilizosafishwa kwa 4xx/5xx.
- `sanitizeErrorMessage` huondoa stack trace za mistari mingi.
- `sanitizeErrorMessage` hubadilisha path kamili za POSIX na Windows kuwa `<path>`.
- `sanitizeErrorMessage` hushughulikia input za instance za `null`/`undefined`/`Error` kwa usalama.
- `buildErrorBody` kamwe haifichui stack trace katika field yake ya `message`.

Unapoongeza route au executor mpya, nakili muundo wa assertion kutoka kwenye faili hii. Kizuizi cha ufunikaji (`npm run test:coverage`) huhakikisha ≥60% ya statements/lines/functions/branches — error path lazima zifunikwe.

## Vidhibiti vinavyohusiana

- Alert za CodeQL za `js/stack-trace-exposure` katika `.github/security` zinapaswa kila wakati **ama** kurekebishwa kupitia helper hizi **au** kuondolewa kwa comment inayorejelea hati hii.
- Config ya redaction ya `pino` (`src/shared/utils/logRedaction.ts`) hushughulikia log za muundo zinazoaminika
  kivyake. Hati hii inahusu ujumbe wa response wa umma na thamani zinazodhibitiwa na provider ambazo
  huvuka mipaka endelevu ya call/proxy-log.
- Denylist ya upstream-header (`src/shared/constants/upstreamHeaders.ts`) hushughulikia uvujaji wa header — weka faili zote mbili zikiwa zimeoanishwa unapoongeza suala jipya la utoaji data usioidhinishwa.

## Upitishaji wa maelezo ya upstream

`buildErrorBody` hukubali argument ya tatu ya hiari `upstreamDetails` (body ghafi
iliyochanganuliwa kutoka kwa upstream provider). Inapotolewa, husafishwa na
`sanitizeUpstreamDetails` kabla ya kujumuishwa katika response kama `upstream_details`.

Argument ya nne ya hiari `classification`
(`{ type?: string; code?: string; reason?: string }`) hukubali uainishaji bayana wa umma.
Kila field huwekwa kwenye msamiati wenye mipaka wa kitambulishi cha umma. Thamani zisizo salama, zenye
muundo wa credential, zenye control-character, au ndefu kupita kiasi hurudi kwenye type/code inayotokana na status; reason ya hiari
isiyo salama huachwa. Vitambulishi vya HTTP status vya tarakimu tatu (`100` hadi `599`) hubaki halali kwa
mikataba ya provider inayofichua status ya upstream ya nambari kama code inayosomeka na mashine. Masafa hayo hayo
yenye mipaka yanakubaliwa katika muundo wa placeholder ya HTTP-status unaozalishwa ndani; nambari
na majina holela ya provider hubaki nje ya msamiati.

Pitisha kila uainishaji bayana katika argument hiyo ya nne. Kamwe usibadilishe
`body.error.code`, `body.error.type`, au `body.error.reason` baada ya `buildErrorBody()` kurejesha;
mabadiliko baada ya builder hupita kando ya makadirio ya umma.

Kanuni za usafishaji zinazotumika kwa `upstreamDetails`:

1. Majani ya string: yapitishe kupitia `sanitizeErrorMessage` (huondoa stack na path kamili).
2. Key zisizo salama za path, credential, session-alias, na prototype-control huondolewa.
3. Kikomo cha kina: nesting inayozidi viwango 4 hubadilishwa na string `"[truncated]"`.
4. Array huwekewa kikomo cha element 32.

Call site zilizo na body ya error ya provider iliyochanganuliwa pekee ndizo zinapaswa kupitisha `upstreamDetails`. Error za ndani za OmniRoute
(kushindwa kuchanganua SSE, content tupu, vizuizi vya guardrail) hazipaswi kuijumuisha.

USIPITISHE `err.stack`, `err.message` ghafi, wala string yoyote kutoka kwa runtime exception kwenda
`upstreamDetails`. Hizo bado lazima zipitie `errorResponse` / `buildErrorBody(code, msg)`
bila body ya upstream.

Upitishaji teule wa upstream 4xx huhifadhi muundo salama wa JSON wa provider na maneno yanayohitajika na
urejeshaji wa kiotomatiki wa client, lakini si upitishaji wa byte kwa byte: sanitizer ya kujirudia hutekelezwa kila wakati
kabla ya serialization. Body zenye mzunguko, zenye BigInt, au zenye `toJSON()` hasidi hufeli kwa usalama na
hazistahiki kupitishwa. OCR na moderation hutumia kanuni hiyo hiyo; body za upstream zisizo JSON, tupu, au
zilizowekewa lebo isiyo sahihi hubadilishwa kuwa envelope rasmi ya error ya JSON ya OmniRoute.

## Kizuizi kinachojulikana cha CodeQL: visafishaji maalum havitambuliwi

Hoja ya CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) hutumia orodha isiyobadilika ya ruwaza zinazoruhusiwa za visafishaji (k.m. `.split("\n")[0]` iliyo ndani ya mstari, `String#replace` yenye miundo mahususi ya regex, ufikiaji wa `.message` kwenye `Error`). **Haitambui** uelekezaji usio wa moja kwa moja kupitia kisaidizi maalum kama `sanitizeErrorMessage()` yetu.

Hii inamaanisha kuwa sehemu za mwito ambazo kwa uthibitisho husafisha kupitia moduli hii — kwa mfano `open-sse/utils/error.ts::errorResponse` na `open-sse/executors/cursor.ts::buildErrorResponse` — zinaweza kuendelea kutoa tahadhari ingawa msimbo ni salama kiutendaji. Mifano ya awali ya kufutwa kwa tahadhari: `#224`, `#231` (Mei 2026), zote zikiwa zimewekewa alama `false positive` pamoja na uhalalishaji wa kiufundi.

**Jinsi ya kushughulikia tukio jipya:**

1. Thibitisha kuwa sehemu ya mwito kwa kweli hupitisha ujumbe kupitia `sanitizeErrorMessage` / `buildErrorBody` / mojawapo ya vifungashio vilivyoandikwa hapo juu (soma mnyororo wa miito kutoka mwanzo hadi mwisho — usiamini maoni pekee).
2. Thibitisha kuwa `tests/unit/error-message-sanitization.test.ts` hujaribu njia hiyo (au ongeza ufunikaji wa majaribio).
3. Futa tahadhari kupitia `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ukirejelea hati hii.
4. **Usirekebishe** kwa kuweka `.split("\n")[0]` moja kwa moja kila mahali — kisaidizi ndicho chanzo kimoja cha ukweli; kunakili ruwaza hiyo hudhoofisha kisafishaji (huondoa ufichaji wa njia, kikomo cha urefu, ubadilishaji wa aina) kwa lengo la kuonekana kana kwamba kichanganuzi kimetulizwa.

Kukubali vipengele vya hiari kama usanidi maalum wa kisafishaji wa CodeQL wa [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ndiyo suluhisho la muda mrefu; hili liko nje ya hati hii.

## Marejeleo

- [CWE-209: Ufichuaji wa Taarifa Kupitia Ujumbe wa Hitilafu](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Muhtasari wa Kushughulikia Hitilafu](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit iliyoweka kisaidizi mahali pamoja: `1a39c31f` — _fix(security): ficha vitambulisho vya umma vya upstream + weka usafishaji wa hitilafu mahali pamoja_
