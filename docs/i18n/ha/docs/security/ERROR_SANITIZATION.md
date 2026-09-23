# Error Message Sanitization (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Tushen gaskiya:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, da masu gina bayanan jama'a a cikin `open-sse/utils/error.ts`
> **Gwaje-gwaje:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Sabuntawa ta ƙarshe:** 2026-09-02 — v3.8.51
> **Masu karatu:** Duk wani injiniya da ke aiki da martanin kurakurai (hanyoyin HTTP, rafukan SSE, masu aiwatarwa, masu sarrafa MCP).
> **Matsayi:** **WAJIBI** ga kowace hanyar lamba da ke mayar da saƙon kuskure ga abokin ciniki.

## Dalilin samuwar wannan

Dokar CodeQL `js/stack-trace-exposure` (CWE-209) tana yi wa duk wata hanyar lamba alama idan saƙon kuskure da ya samo asali daga keɓantacciyar matsalar lokacin aiki ya isa martanin HTTP / SSE ba tare da an tsabtace shi ba. Alamomin tari da cikakkun hanyoyin fayil a martanin samarwa suna bai wa maharan:

- Tsarin kundin adireshi na ciki (`/srv/app/src/lib/...`) → tattara bayanai don ƙarin hare-hare.
- Nau'ikan ɗakin karatu / tsarin aiki da za a iya gane su daga firamomin tari → zaɓen hanyar kai hari da aka keɓance.
- Muhimman ƙimomin lokacin aiki waɗanda ƙila a saka su cikin kirtani a saƙonnin kuskure (tambayoyin DB, ƙimomin saituna).

Mai taimakawa `sanitizeErrorMessage` da `open-sse/utils/error.ts` ke fitarwa yana cire waɗannan nau'ikan
bayyanar bayanai:

1. Ƙarshen firamomin tari na JavaScript na zahiri, waɗanda aka jera, da waɗanda babu shakka suna cikin layi.
2. Cikakkun hanyoyin tsarin fayil na POSIX, Windows, UNC, da `file://`, tare da kiyaye amintattun URL na HTTPS
   da hanyoyin API da aka yi wa alama a sarari.
3. Sanya bayanan shaidar shiga, sanannun tsarin token na masu samarwa, tubalan PEM na maɓallin sirri, da URL na bayanan base64.

Mai tsabtacewa yana iyakance tsawon shigarwa kuma yana rufewa cikin aminci idan ƙimar da aka jefa ta ƙi sauyawa zuwa kirtani.
Tsabtace JSON na sama mai maimaitawa kuma yana zubar da maɓallan bayanan shaida/hanya marasa aminci, sunayen zaman madadin, da
maɓallan sarrafa prototype kafin a jera martani.

## Tsarin da ya zama wajibi

### 1. Gina martanin kuskure (hanyoyin HTTP / API)

Yi amfani da `buildErrorBody()` — an haɗa tsabtacewa a ciki:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... dabarun mai sarrafawa ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ko kuma, don masu sauƙaƙawa a wannan module ɗin:

```ts
import {
  errorResponse, // abin Response na amfani sau ɗaya
  writeStreamError, // marubucin SSE
  createErrorResult, // siffar { success: false, status, response, ... }
  unavailableResponse, // yana ƙara Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Duk waɗannan suna amfani da ƙa'idar iyakar kuskuren jama'a. `errorResponse`, `writeStreamError`, da
`createErrorResult` suna bi ta `buildErrorBody`; keɓaɓɓun mataimakan sake-gwadawa/da'ira guda uku
suna tsara tare da tsabtace mahallinsu na jama'a kai tsaye. **Ba ka taɓa buƙatar kiran
`sanitizeErrorMessage` da hannu ba** yayin amfani da waɗannan mataimaka.

### 2. Keɓaɓɓun ambulan kuskure (ba safai ba)

Lokacin da ba za ka iya amfani da mataimakan da ke sama ba (misali, idan wata yarjejeniyar sama kamar Connect-RPC ce ta ƙayyade siffar martanin), shigo da `sanitizeErrorMessage` kai tsaye:

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

Wannan ita ce kaɗai hanyar da aka amince da ita don haɗa keɓaɓɓen jikin kuskure. Duba `open-sse/executors/cursor.ts::buildErrorResponse` don aiwatarwar tunani.

### 3. Yin rajista da mayar da martani

Keɓantattun matsalolin ciki da aka amince da su za su iya riƙe cikakken saƙonsu da tarinsu domin masu gudanarwa su iya gano matsala. Ƙimomin
da suka samo asali daga iyakokin mai samarwa, tabbatarwa, zaman burauza, ko wuraren da ke kusa da bayanan shaida dole ne a
tsabtace su kafin su shiga fitarwar console, metadata na bincike, ko rajistan kira na dindindin. Tsari:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // keɓantacciyar matsalar ciki da aka amince da ita kawai
  return errorResponse(500, getErrorMessage(err)); // an tsabtace — an aika wa abokin ciniki
}
```

Don matsalolin da mai samarwa ke sarrafawa, tsara ƙimar da aka yi wa rajista ita ma:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Tsarukan da aka hana

❌ **Kada taɓa** sanya ɗanyen fitarwar keɓantacciyar matsala a cikin jikin Response:

```ts
// MUMMUNA: alamar tari + hanyoyin fayil suna isa ga abokin ciniki
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Kada taɓa** ƙirƙirar naka mai raba layin farko:

```ts
// MUMMUNA: yana manta cire cikakkun hanyoyi, kuma yana iya kaucewa daga daidaitaccen mataimaki
const safe = String(err).split("\n")[0];
```

❌ **Kada taɓa** tsabtacewa a cikin hanyar ka manta da hanyar SSE. Duk abin da ke rubutawa zuwa rafi yana bi ta `writeStreamError` (ko `buildErrorBody` da ke ƙarƙashinsa).

❌ **Kada taɓa** haɗa `process.cwd()`, `__filename`, `__dirname`, ko hanyoyin da aka samo daga env da gangan
a cikin saƙonnin kuskure. Mai tsabtacewa yana rufe cikakkun hanyoyi a matsayin ƙarin matakin kariya, amma masu kira ba dole su
ƙirƙiri saƙonnin da ke bayyana tsarin muhalli tun da farko ba.

## Rufewa a CI

`tests/unit/error-message-sanitization.test.ts` yana tabbatar da cewa:

- Kowace hanya ƙarƙashin `/api/model-combo-mappings/*` tana mayar da jikin amsa da aka tsabtace a kan 4xx/5xx.
- `sanitizeErrorMessage` yana cire bayanan bin diddigin stack masu layuka da yawa.
- `sanitizeErrorMessage` yana maye gurbin cikakkun hanyoyin POSIX da Windows da `<path>`.
- `sanitizeErrorMessage` yana sarrafa shigarwar `null`/`undefined`/misalin `Error` cikin aminci.
- `buildErrorBody` ba ya taɓa bayyana bayanan bin diddigin stack a filin `message` nasa.

Lokacin ƙara sabuwar hanya ko executor, kwafi tsarin assertion daga wannan fayil. Ƙofar rufewa (`npm run test:coverage`) tana tilasta ≥60% na statements/lines/functions/branches — dole ne a rufe hanyoyin kuskure.

## Matakan sarrafawa masu alaƙa

- Ya kamata faɗakarwar CodeQL ta `js/stack-trace-exposure` a cikin `.github/security` koyaushe a **ko dai** gyara ta amfani da waɗannan helpers **ko kuma** a yi watsi da ita tare da sharhin da ke ambaton wannan takarda.
- Saitin redaction na `pino` (`src/shared/utils/logRedaction.ts`) yana sarrafa amintattun structured logs
  daban. Wannan takarda tana magana ne kan saƙonnin amsa na jama'a da ƙimomin da provider ke sarrafawa waɗanda
  ke ƙetare iyakokin persistent call/proxy-log.
- Denylist na upstream-header (`src/shared/constants/upstreamHeaders.ts`) yana hana fallasar header — a daidaita fayilolin biyu lokacin ƙara sabuwar damuwar fitar da bayanai.

## Wucewar cikakkun bayanan upstream

`buildErrorBody` yana karɓar hujja ta uku ta zaɓi, `upstreamDetails` (ɗanyen
jikin da aka parse daga upstream provider). Idan an bayar da shi, ana tsabtace shi ta
`sanitizeUpstreamDetails` kafin a saka shi cikin amsar a matsayin `upstream_details`.

Hujja ta huɗu ta zaɓi, `classification`
(`{ type?: string; code?: string; reason?: string }`), tana karɓar bayyanannen public classification.
Ana karkatar da kowane fili zuwa ƙayyadaddun kalmomin public-identifier. Ƙimomin da ba su da aminci, masu
siffar credential, masu control-character, ko masu tsayi fiye da kima suna komawa ga type/code da aka samo
daga status; ana barin optional reason mara aminci. Masu gano HTTP status masu lambobi uku (`100` zuwa
`599`) suna ci gaba da zama ingantattu ga provider contracts waɗanda ke bayyana numeric upstream status
a matsayin machine-readable code. Haka kuma ana karɓar wannan ƙayyadadden kewayo a cikin locally generated
HTTP-status placeholder form; sauran provider numbers da names na son rai ba sa cikin kalmomin da aka yarda da su.

Aika kowane explicit classification a cikin wannan hujja ta huɗu. Kada a taɓa sake rubuta
`body.error.code`, `body.error.type`, ko `body.error.reason` bayan `buildErrorBody()` ya dawo;
gyara bayan builder yana tsallake public projection.

Dokokin tsabtacewa da ake amfani da su ga `upstreamDetails`:

1. Ƙimomin string na ƙarshe: a bi da su ta `sanitizeErrorMessage` (yana cire stacks + absolute paths).
2. Ana cire unsafe path, credential, session-alias, da prototype-control keys.
3. Iyakar zurfi: ana maye gurbin nesting da ya wuce matakai 4 da string `"[truncated]"`.
4. Ana iyakance arrays zuwa elements 32.

Call sites masu parsed provider error body ne kawai ya kamata su aika `upstreamDetails`. Kurakuran OmniRoute
na ciki (gazawar SSE parse, empty content, guardrail blocks) ba dole su haɗa shi ba.

KADA a aika ɗanyen `err.stack`, `err.message`, ko kowane string daga runtime exception zuwa
`upstreamDetails`. Har yanzu dole ne waɗannan su bi ta `errorResponse` / `buildErrorBody(code, msg)`
ba tare da upstream body ba.

Zaɓaɓɓen upstream 4xx passthrough yana kiyaye safe JSON shape da wording na provider da ake buƙata don
client auto-recovery, amma ba byte-for-byte passthrough ba ne: recursive sanitizer yana gudana koyaushe
kafin serialization. Jikunan da ke da cyclic, BigInt, ko hostile `toJSON()` suna gazawa cikin aminci kuma
ba su cancanci passthrough ba. OCR da moderation suna amfani da wannan doka ɗaya; ana sauya upstream bodies
marasa JSON, marasa komai, ko waɗanda aka yi wa label ba daidai ba zuwa canonical OmniRoute JSON error envelope.

## Sananniyar iyakancewar CodeQL: ba a gane masu tsabtace bayanai na musamman

Tambayar CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) tana amfani da tsayayyen jerin amintattun tsarin masu tsabtace bayanai (misali `.split("\n")[0]` da aka rubuta kai tsaye, `String#replace` tare da takamaiman tsarin regex, da samun damar `.message` a kan `Error`). Ba ta gane amfani da wani mai taimako na musamman ta hanyar matsakaici kamar `sanitizeErrorMessage()` namu ba.

Wannan yana nufin wuraren kira da za a iya tabbatar da cewa suna tsabtace bayanai ta wannan module — misali `open-sse/utils/error.ts::errorResponse` da `open-sse/executors/cursor.ts::buildErrorResponse` — za su iya ci gaba da tayar da faɗakarwar duk da cewa lambar tana da aminci a aikace. Misalan watsi da faɗakarwa da suka gabata: `#224`, `#231` (Mayu 2026), dukkansu an yi musu alamar `false positive` tare da hujjar fasaha.

**Yadda za a sarrafa sabon aukuwar matsalar:**

1. Tabbatar cewa wurin kiran yana tura saƙon ta `sanitizeErrorMessage` / `buildErrorBody` / ɗaya daga cikin wrappers da aka bayyana a sama (karanta jerin kiran daga farko har ƙarshe — kada a amince da comment kawai).
2. Tabbatar cewa `tests/unit/error-message-sanitization.test.ts` yana gwada wannan hanyar (ko a ƙara gwajin da zai rufe ta).
3. Yi watsi da faɗakarwar ta hanyar `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` tare da ambaton wannan daftarin.
4. Kada a yi ƙoƙarin “gyarawa” ta hanyar rubuta `.split("\n")[0]` kai tsaye a ko’ina — helper ɗin shi ne tushen gaskiya guda ɗaya; maimaita tsarin yana raunana sanitizer ɗin (yana rasa goge hanyoyin fayil, iyakar tsawo, da sauya nau’i) don kawai ya yi kama da an gamsar da scanner.

Amfani da fasalolin da sai an zaɓa kamar saitin sanitizer na musamman na CodeQL na [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) shi ne mafita ta dogon lokaci; wannan yana wajen wannan daftarin.

## Manazarta

- [CWE-209: Bayyanar Bayanai Ta Hanyar Saƙon Kuskure](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Takardar Taƙaitaccen Bayani Kan Sarrafa Kurakurai](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit da ya tattara helper ɗin wuri guda: `1a39c31f` — _fix(security): ɓoye bayanan shaidar upstream na jama'a + tattara tsabtace saƙon kuskure wuri guda_
