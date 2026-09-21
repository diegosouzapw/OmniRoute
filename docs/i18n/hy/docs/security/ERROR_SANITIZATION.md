# Error Message Sanitization (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Ճշմարտության աղբյուր՝** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` և `open-sse/utils/error.ts`-ի հանրային կառուցիչները
> **Թեստեր՝** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Վերջին թարմացումը՝** 2026-09-02 — v3.8.51
> **Թիրախային լսարան՝** Սխալների պատասխանների հետ աշխատող ցանկացած ինժեներ (HTTP երթուղիներ, SSE հոսքեր, կատարիչներ, MCP մշակիչներ)։
> **Կարգավիճակ՝** **ՊԱՐՏԱԴԻՐ** յուրաքանչյուր կոդային ուղու համար, որը հաճախորդին սխալի հաղորդագրություն է վերադարձնում։

## Ինչու է սա անհրաժեշտ

CodeQL-ի `js/stack-trace-exposure` կանոնը (CWE-209) նշում է յուրաքանչյուր կոդային ուղի, որտեղ կատարման ժամանակ առաջացած բացառությունից ծագող սխալի հաղորդագրությունը հասնում է HTTP / SSE պատասխանին՝ առանց մաքրման։ Արտադրական միջավայրի պատասխաններում ստեկի հետքերը և ֆայլերի բացարձակ ուղիները հարձակվողներին տրամադրում են՝

- Ներքին պանակների կառուցվածքը (`/srv/app/src/lib/...`) → հետախուզական տեղեկություններ հետագա հարձակումների համար։
- Ստեկի ֆրեյմերից ենթադրվող գրադարանների / ֆրեյմվորքերի տարբերակները → նպատակային շահագործման եղանակի ընտրություն։
- Կատարման միջավայրի զգայուն արժեքներ, որոնք կարող են տողային ինտերպոլյացիայի միջոցով ներառվել սխալների մեջ (DB հարցումներ, կազմաձևման արժեքներ)։

`open-sse/utils/error.ts`-ից արտահանվող `sanitizeErrorMessage` օժանդակ ֆունկցիան հեռացնում է արտահոսքի հետևյալ տեսակները՝

1. Ֆիզիկական, սերիականացված և միանշանակ ներկառուցված JavaScript ստեկի ֆրեյմերի վերջնամասերը։
2. Բացարձակ POSIX, Windows, UNC և `file://` ֆայլային համակարգի ուղիները՝ միաժամանակ պահպանելով անվտանգ HTTPS URL-ները և բացահայտ նշված API երթուղիները։
3. Նույնականացման տվյալների վերագրումները, տարածված մատակարարների թոքենների ձևաչափերը, մասնավոր բանալիների PEM բլոկները և base64 տվյալների URL-ները։

Մաքրող ֆունկցիան սահմանափակում է մուտքային տվյալների երկարությունը և անվտանգ կերպով մերժում է այն դեպքերը, երբ նետված արժեքի տողի փոխակերպումը ձախողվում է։
Վերադաս JSON տվյալների ռեկուրսիվ մաքրումը նաև հեռացնում է նույնականացման տվյալների/ուղիների անապահով բանալիները, աշխատաշրջանի այլանունները և պրոտոտիպի կառավարման բանալիները՝ նախքան պատասխանի սերիականացումը։

## Պարտադիր ձևանմուշը

### 1. Սխալի պատասխանի կառուցում (HTTP / API երթուղիներ)

Օգտագործեք `buildErrorBody()`-ն․ մաքրումը ներկառուցված է՝

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... մշակիչի տրամաբանություն ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Կամ նույն մոդուլի հարմարավետ փաթաթիչների համար՝

```ts
import {
  errorResponse, // մեկ քայլով ստեղծվող Response օբյեկտ
  writeStreamError, // SSE գրիչ
  createErrorResult, // { success: false, status, response, ... } կառուցվածք
  unavailableResponse, // ավելացնում է Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Սրանցից բոլորը կիրառում են սխալների հանրային կանոնական սահմանը։ `errorResponse`, `writeStreamError` և
`createErrorResult` ֆունկցիաներն անցնում են `buildErrorBody`-ի միջով, իսկ կրկնափորձի/շղթայի երեք մասնագիտացված օժանդակ ֆունկցիաներն ուղղակիորեն պրոյեկտում և մաքրում են իրենց հանրային համատեքստը։ Այս օժանդակ ֆունկցիաներն օգտագործելիս **երբեք հարկավոր չէ ձեռքով կանչել
`sanitizeErrorMessage`**։

### 2. Սխալների հատուկ ծրարներ (հազվադեպ)

Երբ վերոնշյալ օժանդակ ֆունկցիաները չեք կարող օգտագործել (օրինակ՝ երբ պատասխանի կառուցվածքը թելադրվում է վերադաս արձանագրությամբ, ինչպիսին Connect-RPC-ն է), ուղղակիորեն ներմուծեք `sanitizeErrorMessage`-ը՝

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

Սա հատուկ սխալի մարմին կազմելու միակ թույլատրված եղանակն է։ Հղումային իրականացումը տեսեք `open-sse/executors/cursor.ts::buildErrorResponse`-ում։

### 3. Գրանցում և պատասխանում

Վստահելի ներքին բացառությունները կարող են պահպանել իրենց ամբողջական հաղորդագրությունն ու ստեկը, որպեսզի օպերատորները կարողանան վրիպազերծել։ Մատակարարի, վավերացման, զննարկչի աշխատաշրջանի կամ նույնականացման տվյալներին առնչվող սահմաններից ծագող արժեքները պետք է մաքրվեն՝ նախքան կոնսոլային արտածում, աուդիտի մետատվյալներ կամ կանչերի մշտական մատյաններ մուտք գործելը։ Ձևանմուշը՝

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // միայն վստահելի ներքին բացառության համար
  return errorResponse(500, getErrorMessage(err)); // մաքրված է՝ ուղարկվում է հաճախորդին
}
```

Մատակարարի կողմից վերահսկվող ձախողումների դեպքում պրոյեկտեք նաև գրանցվող արժեքը՝

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Արգելված ձևանմուշներ

❌ **Երբեք** մի տեղադրեք բացառության չմշակված արտածումը Response մարմնի մեջ՝

```ts
// ՎԱՏ Է․ ստեկի հետքը և ֆայլերի ուղիները հասնում են հաճախորդին
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Երբեք** մի ստեղծեք առաջին տողն առանձնացնող ձեր սեփական տարբերակը՝

```ts
// ՎԱՏ Է․ չի հեռացնում բացարձակ ուղիները և կարող է շեղվել կանոնական օժանդակ ֆունկցիայից
const safe = String(err).split("\n")[0];
```

❌ **Երբեք** մի մաքրեք միայն երթուղում՝ մոռանալով SSE ուղու մասին։ Հոսքում գրանցվող ցանկացած բան անցնում է `writeStreamError`-ի (կամ դրա հիմքում ընկած `buildErrorBody`-ի) միջով։

❌ **Երբեք** մի ներառեք `process.cwd()`, `__filename`, `__dirname` կամ միջավայրից ստացված ուղիները սխալի հաղորդագրություններում։ Մաքրող ֆունկցիան որպես բազմաշերտ պաշտպանություն մշակում է բացարձակ ուղիները, սակայն կանչողները հենց սկզբից չպետք է կառուցեն տոպոլոգիա բացահայտող հաղորդագրություններ։

## Ծածկույթը CI-ում

`tests/unit/error-message-sanitization.test.ts`-ը ապահովում է, որ՝

- `/api/model-combo-mappings/*`-ի ներքո գտնվող յուրաքանչյուր երթուղի 4xx/5xx-ի դեպքում վերադարձնում է մաքրված մարմիններ։
- `sanitizeErrorMessage`-ը հեռացնում է բազմատող stack trace-երը։
- `sanitizeErrorMessage`-ը POSIX և Windows բացարձակ ուղիները փոխարինում է `<path>`-ով։
- `sanitizeErrorMessage`-ը անվտանգ կերպով մշակում է `null`/`undefined`/`Error` նմուշ մուտքային արժեքները։
- `buildErrorBody`-ն երբեք չի բացահայտում stack trace-երը իր `message` դաշտում։

Նոր երթուղի կամ կատարիչ ավելացնելիս պատճենեք հաստատումների ձևանմուշն այս ֆայլից։ Ծածկույթի շեմը (`npm run test:coverage`) պահանջում է statements/lines/functions/branches-ի ≥60% ծածկույթ․ սխալի ուղիները պետք է ծածկված լինեն։

## Առնչվող վերահսկիչ միջոցներ

- `.github/security`-ում գտնվող `js/stack-trace-exposure` CodeQL ահազանգերը միշտ պետք է **կամ** շտկվեն այս օգնականների միջոցով, **կամ** մերժվեն այս փաստաթղթին հղում անող մեկնաբանությամբ։
- `pino`-ի խմբագրման կազմաձևը (`src/shared/utils/logRedaction.ts`) առանձին մշակում է վստահելի կառուցվածքային մատյանները։ Այս փաստաթուղթը վերաբերում է հանրային պատասխանի հաղորդագրություններին և մատակարարի կողմից վերահսկվող արժեքներին, որոնք անցնում են պահպանվող կանչերի/պրոքսի մատյանների սահմաններով։
- Վերին հոսքի վերնագրերի արգելացանկը (`src/shared/constants/upstreamHeaders.ts`) կանխում է վերնագրերի արտահոսքը․ արտահոսքի նոր մտահոգություն ավելացնելիս երկու ֆայլերն էլ պահեք համահունչ։

## Վերին հոսքի մանրամասների փոխանցում

`buildErrorBody`-ն ընդունում է ընտրովի երրորդ `upstreamDetails` արգումենտը (վերին հոսքի մատակարարից ստացված՝ վերլուծված չմշակված մարմինը)։ Տրամադրվելու դեպքում այն մաքրվում է `sanitizeUpstreamDetails`-ի միջոցով՝ նախքան պատասխանի մեջ որպես `upstream_details` ներառվելը։

Ընտրովի չորրորդ `classification` արգումենտը
(`{ type?: string; code?: string; reason?: string }`) ընդունում է բացահայտ հանրային դասակարգում։
Յուրաքանչյուր դաշտ արտապատկերվում է հանրային նույնացուցիչների սահմանափակ բառապաշարին։ Անվտանգ չհամարվող, հավատարմագրերի ձև ունեցող, կառավարման նիշեր պարունակող կամ չափազանց երկար արժեքների դեպքում կիրառվում է կարգավիճակից ածանցված type/code-ը, իսկ անվտանգ չհամարվող ընտրովի reason-ը բաց է թողնվում։ Եռանիշ HTTP կարգավիճակի նույնացուցիչները (`100`-ից մինչև `599`) մնում են վավեր այն մատակարարների պայմանագրերի համար, որոնք վերին հոսքի թվային կարգավիճակը ներկայացնում են որպես մեքենայաընթեռնելի կոդ։ Նույն սահմանափակ միջակայքն ընդունվում է նաև տեղում ստեղծվող HTTP կարգավիճակի տեղապահի ձևում․ մատակարարի կամայական թվերն ու անունները մնում են բառապաշարից դուրս։

Յուրաքանչյուր բացահայտ դասակարգում փոխանցեք այդ չորրորդ արգումենտով։ Երբեք մի վերագրեք
`body.error.code`, `body.error.type` կամ `body.error.reason` արժեքները `buildErrorBody()`-ի վերադարձից հետո․ կառուցիչից հետո կատարվող փոփոխությունը շրջանցում է հանրային արտապատկերումը։

`upstreamDetails`-ի նկատմամբ կիրառվող մաքրման կանոնները՝

1. Տողային տերևներ․ անցկացնել `sanitizeErrorMessage`-ով (հեռացնում է stack-երը և բացարձակ ուղիները)։
2. Անվտանգ չհամարվող ուղու, հավատարմագրերի, աշխատաշրջանի կեղծանվան և նախատիպի կառավարման բանալիները հեռացվում են։
3. Խորության սահմանաչափ․ 4 մակարդակից ավելի խորը ներդրումը փոխարինվում է `"[truncated]"` տողով։
4. Զանգվածները սահմանափակվում են առավելագույնը 32 տարրով։

Միայն մատակարարի վերլուծված սխալի մարմին ունեցող կանչի կետերը պետք է փոխանցեն `upstreamDetails`։ OmniRoute-ի ներքին սխալները (SSE վերլուծման ձախողումներ, դատարկ բովանդակություն, պաշտպանիչ սահմանափակումների արգելափակումներ) չպետք է ներառեն այն։

Մի՛ փոխանցեք չմշակված `err.stack`, `err.message` կամ կատարման ժամանակ առաջացած բացառության որևէ տող
`upstreamDetails`-ին։ Դրանք նախկինի պես պետք է անցնեն `errorResponse` / `buildErrorBody(code, msg)`-ի միջոցով՝ առանց վերին հոսքի մարմնի։

Վերին հոսքի 4xx պատասխանների ընտրովի փոխանցումը պահպանում է մատակարարի անվտանգ JSON կառուցվածքն ու ձևակերպումները, որոնք անհրաժեշտ են հաճախորդի ավտոմատ վերականգնման համար, սակայն դա բայթ առ բայթ փոխանցում չէ․ ռեկուրսիվ մաքրիչը միշտ գործարկվում է սերիականացումից առաջ։ Ցիկլային, BigInt պարունակող կամ չարամիտ `toJSON()` ունեցող մարմինները փակ եղանակով ձախողվում են և փոխանցման ենթակա չեն։ OCR-ը և բովանդակության չափավորումը կիրառում են նույն կանոնը․ ոչ JSON, դատարկ կամ սխալ պիտակավորված վերին հոսքի մարմինները փոխակերպվում են OmniRoute-ի կանոնական JSON սխալի ծրարի։

## CodeQL-ի հայտնի սահմանափակում․ հատուկ սանիտարիզատորները չեն ճանաչվում

CodeQL-ի [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) հարցումն օգտագործում է սանիտարիզատորի ձևանմուշների ֆիքսված թույլատրելի ցանկ (օրինակ՝ ներկառուցված `.split("\n")[0]`, որոշակի կանոնավոր արտահայտությունների կառուցվածքներով `String#replace`, `Error`-ի `.message` հատկությանը հասանելիություն)։ Այն **չի** ճանաչում անուղղակի կանչը մեր `sanitizeErrorMessage()`-ի նման հատուկ օժանդակ ֆունկցիայի միջոցով։

Սա նշանակում է, որ այս մոդուլի միջոցով ակնհայտորեն սանիտարիզացում կատարող կանչի վայրերը, օրինակ՝ `open-sse/utils/error.ts::errorResponse` և `open-sse/executors/cursor.ts::buildErrorResponse`, կարող են շարունակել առաջացնել ահազանգը, թեև կոդը գործառութապես անվտանգ է։ Նախադեպային մերժումներ՝ `#224`, `#231` (2026 թ. մայիս), երկուսն էլ նշված են որպես `false positive`՝ տեխնիկական հիմնավորմամբ։

**Ինչպես վարվել նոր դեպքի հետ․**

1. Համոզվեք, որ կանչի վայրն իրականում հաղորդագրությունն ուղղորդում է `sanitizeErrorMessage` / `buildErrorBody` / վերևում փաստաթղթավորված փաթաթիչներից մեկի միջոցով (կարդացեք կանչերի ամբողջ շղթան սկզբից մինչև վերջ․ մի՛ վստահեք մեկնաբանությանը)։
2. Համոզվեք, որ `tests/unit/error-message-sanitization.test.ts`-ը ստուգում է այդ ուղին (կամ ավելացրեք թեստային ծածկույթ)։
3. Մերժեք ահազանգը `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`-ի միջոցով՝ հղում կատարելով այս փաստաթղթին։
4. **Մի՛** «շտկեք»՝ ամենուր ներկառուցելով `.split("\n")[0]`․ օժանդակ ֆունկցիան ճշմարտության միակ աղբյուրն է, իսկ ձևանմուշի կրկնօրինակումը թուլացնում է սանիտարիզատորը (կորչում են ուղիների մաքրումը, երկարության սահմանափակումը և տիպերի փոխակերպումը)՝ միայն սկաները բավարարելու պատրանք ստեղծելու համար։

CodeQL-ի [`@codeql/javascript-models` հատուկ սանիտարիզատորի կազմաձևման](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) նման կամընտիր գործառույթների կիրառումը երկարաժամկետ լուծումն է․ այն այս փաստաթղթի շրջանակից դուրս է։

## Հղումներ

- [CWE-209․ Տեղեկատվության բացահայտում սխալի հաղորդագրության միջոցով](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP․ Սխալների մշակման հուշաթերթ](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Օժանդակ ֆունկցիան կենտրոնացնող commit-ը՝ `1a39c31f` — _fix(security): քողարկել հանրային upstream-ի հավատարմագրերը և կենտրոնացնել սխալների սանիտարիզացումը_
