# Error Message Sanitization (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **સત્યનો સ્રોત:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, અને `open-sse/utils/error.ts` માંના સાર્વજનિક બિલ્ડર્સ
> **પરીક્ષણો:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **છેલ્લે અપડેટ કરેલું:** 2026-09-02 — v3.8.51
> **લક્ષિત વાચકો:** ભૂલ પ્રતિસાદોને સ્પર્શતો કોઈપણ એન્જિનિયર (HTTP રૂટ્સ, SSE સ્ટ્રીમ્સ, એક્ઝિક્યુટર્સ, MCP હેન્ડલર્સ).
> **સ્થિતિ:** ક્લાયન્ટને ભૂલ સંદેશ પરત કરતા દરેક કોડ પાથ માટે **ફરજિયાત**.

## આ શા માટે અસ્તિત્વમાં છે

CodeQL નિયમ `js/stack-trace-exposure` (CWE-209) એવા કોઈપણ કોડ પાથને ચિહ્નિત કરે છે જ્યાં રનટાઇમ એક્સેપ્શનમાંથી ઉદ્ભવેલો ભૂલ સંદેશ સેનિટાઇઝ કર્યા વિના HTTP / SSE પ્રતિસાદ સુધી પહોંચે છે. પ્રોડક્શન પ્રતિસાદોમાં સ્ટૅક ટ્રેસ અને ઍબ્સોલ્યુટ ફાઇલ પાથ હુમલાખોરોને આ માહિતી આપે છે:

- આંતરિક ડિરેક્ટરી માળખું (`/srv/app/src/lib/...`) → વધુ હુમલાઓ માટે ટોહ લેવાની માહિતી.
- સ્ટૅક ફ્રેમ્સમાંથી અનુમાનિત લાઇબ્રેરી / ફ્રેમવર્ક વર્ઝન્સ → લક્ષિત એક્સપ્લોઇટની પસંદગી.
- ભૂલોમાં સ્ટ્રિંગ-ઇન્ટરપોલેટ થઈ શકે તેવા સંવેદનશીલ રનટાઇમ મૂલ્યો (DB ક્વેરીઝ, કૉન્ફિગ મૂલ્યો).

`open-sse/utils/error.ts` દ્વારા એક્સપોર્ટ કરેલો `sanitizeErrorMessage` હેલ્પર આ પ્રકારના
માહિતી લીકને દૂર કરે છે:

1. ભૌતિક, સિરિયલાઇઝ્ડ અને નિઃસંદિગ્ધ રીતે ઇનલાઇન JavaScript સ્ટૅક-ફ્રેમ ટેઇલ્સ.
2. સુરક્ષિત HTTPS URLs અને સ્પષ્ટપણે ચિહ્નિત API રૂટ્સ જાળવી રાખીને ઍબ્સોલ્યુટ POSIX, Windows, UNC અને `file://` ફાઇલસિસ્ટમ પાથ્સ.
3. ક્રેડેન્શિયલ અસાઇનમેન્ટ્સ, સામાન્ય પ્રોવાઇડર ટોકન ફોર્મેટ્સ, પ્રાઇવેટ-કી PEM બ્લૉક્સ અને base64 ડેટા
   URLs.

સેનિટાઇઝર ઇનપુટની લંબાઈ મર્યાદિત કરે છે અને જો ફેંકાયેલું મૂલ્ય સ્ટ્રિંગમાં રૂપાંતરણને નકારે તો સુરક્ષિત રીતે નિષ્ફળ થાય છે.
રિકર્સિવ અપસ્ટ્રીમ JSON સેનિટાઇઝેશન પણ પ્રતિસાદ સિરિયલાઇઝ થાય તે પહેલાં અસુરક્ષિત ક્રેડેન્શિયલ/પાથ કીઝ, સેશન ઉપનામો અને
પ્રોટોટાઇપ-કંટ્રોલ કીઝ દૂર કરે છે.

## ફરજિયાત પેટર્ન

### 1. ભૂલ પ્રતિસાદ બનાવવો (HTTP / API રૂટ્સ)

`buildErrorBody()` વાપરો — સેનિટાઇઝેશન અંદરથી જ સામેલ છે:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... હેન્ડલર લોજિક ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

અથવા, એ જ મોડ્યુલમાંના સુવિધાજનક રૅપર્સ માટે:

```ts
import {
  errorResponse, // એક જ વારમાં બનતું Response ઑબ્જેક્ટ
  writeStreamError, // SSE રાઇટર
  createErrorResult, // { success: false, status, response, ... } આકાર
  unavailableResponse, // Retry-After ઉમેરે છે
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

આ બધા કૅનોનિકલ સાર્વજનિક-ભૂલ સીમા લાગુ કરે છે. `errorResponse`, `writeStreamError` અને
`createErrorResult`, `buildErrorBody` મારફતે જાય છે; ત્રણ વિશિષ્ટ રીટ્રાય/સર્કિટ હેલ્પર્સ
તેમના સાર્વજનિક સંદર્ભને સીધો પ્રોજેક્ટ અને સેનિટાઇઝ કરે છે. આ હેલ્પર્સ વાપરતી વખતે **તમારે ક્યારેય
`sanitizeErrorMessage` ને મેન્યુઅલી કૉલ કરવાની જરૂર નથી**.

### 2. કસ્ટમ ભૂલ એન્વલોપ્સ (દુર્લભ)

જ્યારે તમે ઉપરના હેલ્પર્સનો ઉપયોગ ન કરી શકો (દા.ત. પ્રતિસાદનું સ્વરૂપ Connect-RPC જેવા અપસ્ટ્રીમ પ્રોટોકોલ દ્વારા નિર્ધારિત હોય), ત્યારે `sanitizeErrorMessage` ને સીધું ઇમ્પોર્ટ કરો:

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

કસ્ટમ ભૂલ બોડી બનાવવાનો આ એકમાત્ર માન્ય માર્ગ છે. સંદર્ભ અમલીકરણ માટે `open-sse/executors/cursor.ts::buildErrorResponse` જુઓ.

### 3. લૉગિંગ વિરુદ્ધ પ્રતિસાદ આપવો

વિશ્વસનીય આંતરિક એક્સેપ્શન્સ તેમનો સંપૂર્ણ સંદેશ અને સ્ટૅક જાળવી શકે છે જેથી ઑપરેટર્સ ડિબગ કરી શકે. પ્રોવાઇડર, વૅલિડેશન, બ્રાઉઝર-સેશન અથવા ક્રેડેન્શિયલ-સંલગ્ન સીમાઓ પરથી ઉદ્ભવતા મૂલ્યોને
કન્સોલ આઉટપુટ, ઑડિટ મેટાડેટા અથવા કાયમી કૉલ લૉગ્સમાં પ્રવેશતા પહેલાં સેનિટાઇઝ કરવા આવશ્યક છે. પેટર્ન:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // ફક્ત વિશ્વસનીય આંતરિક એક્સેપ્શન
  return errorResponse(500, getErrorMessage(err)); // સેનિટાઇઝ કરેલું — ક્લાયન્ટને મોકલેલું
}
```

પ્રોવાઇડર-નિયંત્રિત નિષ્ફળતાઓ માટે, લૉગ કરેલા મૂલ્યને પણ પ્રોજેક્ટ કરો:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. પ્રતિબંધિત પેટર્ન્સ

❌ **ક્યારેય પણ** કાચું એક્સેપ્શન આઉટપુટ Response બોડીમાં મૂકશો નહીં:

```ts
// ખરાબ: સ્ટૅક ટ્રેસ + ફાઇલ પાથ્સ ક્લાયન્ટ સુધી પહોંચે છે
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **ક્યારેય પણ** પોતાનું પ્રથમ-લાઇન સ્પ્લિટર બનાવશો નહીં:

```ts
// ખરાબ: ઍબ્સોલ્યુટ પાથ્સ દૂર કરવાનું ચૂકી જાય છે, કૅનોનિકલ હેલ્પરથી અલગ પડી શકે છે
const safe = String(err).split("\n")[0];
```

❌ **ક્યારેય પણ** રૂટમાં સેનિટાઇઝ કરીને SSE પાથ ભૂલશો નહીં. સ્ટ્રીમમાં લખાતી દરેક વસ્તુ `writeStreamError` (અથવા તેના અંતર્ગત `buildErrorBody`) મારફતે જાય છે.

❌ **ક્યારેય પણ** ભૂલ સંદેશોમાં જાણીજોઈને `process.cwd()`, `__filename`, `__dirname` અથવા env-માંથી મેળવેલા પાથ્સ
સામેલ કરશો નહીં. સેનિટાઇઝર ઊંડાણપૂર્વકના સંરક્ષણ તરીકે ઍબ્સોલ્યુટ પાથ્સને આવરી લે છે, પરંતુ કૉલર્સે શરૂઆતથી જ
ટોપોલોજી દર્શાવતા સંદેશાઓ બનાવવા નહીં.

## CI માં કવરેજ

`tests/unit/error-message-sanitization.test.ts` નીચેની બાબતો લાગુ કરે છે:

- `/api/model-combo-mappings/*` હેઠળનો દરેક રૂટ 4xx/5xx પર સેનિટાઇઝ કરેલી બોડી પરત કરે છે.
- `sanitizeErrorMessage` બહુ-લાઇન સ્ટૅક ટ્રેસ દૂર કરે છે.
- `sanitizeErrorMessage` POSIX અને Windowsના ઍબ્સોલ્યુટ પાથને `<path>`થી બદલે છે.
- `sanitizeErrorMessage`, `null`/`undefined`/`Error` ઇન્સ્ટન્સ ઇનપુટને સુરક્ષિત રીતે હૅન્ડલ કરે છે.
- `buildErrorBody` તેની `message` ફીલ્ડમાં ક્યારેય સ્ટૅક ટ્રેસ જાહેર કરતું નથી.

નવો રૂટ અથવા એક્ઝિક્યુટર ઉમેરતી વખતે, આ ફાઇલમાંથી અસર્શન પેટર્ન કૉપી કરો. કવરેજ ગેટ (`npm run test:coverage`) ≥60% સ્ટેટમેન્ટ્સ/લાઇન્સ/ફંક્શન્સ/બ્રાન્ચિસ લાગુ કરે છે — એરર પાથ આવરી લેવા આવશ્યક છે.

## સંબંધિત નિયંત્રણો

- `.github/security`માંની `js/stack-trace-exposure` CodeQL ચેતવણીઓ હંમેશાં **કાં તો** આ હેલ્પર્સ વડે સુધારવી **અથવા** આ ડૉકનો ઉલ્લેખ કરતી ટિપ્પણી સાથે ડિસમિસ કરવી જોઈએ.
- `pino` રિડૅક્શન કૉન્ફિગ (`src/shared/utils/logRedaction.ts`) વિશ્વસનીય સ્ટ્રક્ચર્ડ લૉગ્સને અલગથી હૅન્ડલ કરે છે. આ દસ્તાવેજ જાહેર રિસ્પૉન્સ મેસેજ અને સતત કૉલ/પ્રૉક્સી-લૉગ સીમાઓ પાર કરતી પ્રોવાઇડર-નિયંત્રિત વૅલ્યૂઝને આવરે છે.
- અપસ્ટ્રીમ-હેડર ડિનાઇલિસ્ટ (`src/shared/constants/upstreamHeaders.ts`) હેડર લીકેજને આવરે છે — એક્સફિલ્ટ્રેશન સંબંધિત નવી ચિંતા ઉમેરતી વખતે બંને ફાઇલો સુસંગત રાખો.

## અપસ્ટ્રીમ વિગતોનું પાસથ્રૂ

`buildErrorBody` વૈકલ્પિક ત્રીજી આર્ગ્યુમેન્ટ `upstreamDetails` (અપસ્ટ્રીમ પ્રોવાઇડરમાંથી મળેલી રૉ પાર્સ કરેલી બોડી) સ્વીકારે છે. આપેલી હોય ત્યારે, રિસ્પૉન્સમાં `upstream_details` તરીકે સામેલ કરતાં પહેલાં તેને `sanitizeUpstreamDetails` દ્વારા સેનિટાઇઝ કરવામાં આવે છે.

વૈકલ્પિક ચોથી આર્ગ્યુમેન્ટ `classification`
(`{ type?: string; code?: string; reason?: string }`) સ્પષ્ટ જાહેર ક્લાસિફિકેશન સ્વીકારે છે.
દરેક ફીલ્ડને મર્યાદિત જાહેર-આઇડેન્ટિફાયર શબ્દભંડોળ પર પ્રોજેક્ટ કરવામાં આવે છે. અસુરક્ષિત, ક્રેડેન્શિયલ જેવા દેખાતા, કંટ્રોલ-કૅરેક્ટર ધરાવતા અથવા અતિશય લાંબા મૂલ્યો માટે સ્ટેટસમાંથી મેળવેલા ટાઇપ/કોડનો ઉપયોગ થાય છે; અસુરક્ષિત વૈકલ્પિક રીઝન કાઢી નાખવામાં આવે છે. ત્રણ અંકોના HTTP સ્ટેટસ આઇડેન્ટિફાયર્સ (`100`થી `599`) એવા પ્રોવાઇડર કૉન્ટ્રૅક્ટ્સ માટે માન્ય રહે છે, જે આંકડાકીય અપસ્ટ્રીમ સ્ટેટસને મશીન-રીડેબલ કોડ તરીકે જાહેર કરે છે. સ્થાનિક રીતે જનરેટ થતા HTTP-સ્ટેટસ પ્લેસહોલ્ડર સ્વરૂપમાં પણ આ જ મર્યાદિત રેન્જ સ્વીકારવામાં આવે છે; મનસ્વી પ્રોવાઇડર નંબરો અને નામો શબ્દભંડોળની બહાર રહે છે.

દરેક સ્પષ્ટ ક્લાસિફિકેશનને તે ચોથી આર્ગ્યુમેન્ટમાં પાસ કરો. `buildErrorBody()` પરત આવ્યા પછી ક્યારેય `body.error.code`, `body.error.type` અથવા `body.error.reason`ને ઓવરરાઇટ કરશો નહીં;
બિલ્ડર પછીનું મ્યુટેશન જાહેર પ્રોજેક્શનને બાયપાસ કરે છે.

`upstreamDetails` પર લાગુ થતા સેનિટાઇઝેશન નિયમો:

1. સ્ટ્રિંગ લીવ્ઝ: `sanitizeErrorMessage` દ્વારા પસાર કરો (સ્ટૅક્સ અને ઍબ્સોલ્યુટ પાથ દૂર કરે છે).
2. અસુરક્ષિત પાથ, ક્રેડેન્શિયલ, સેશન-એલિયાસ અને પ્રોટોટાઇપ-કંટ્રોલ કીઝ દૂર કરવામાં આવે છે.
3. ડેપ્થ કૅપ: 4 લેવલથી વધુ નેસ્ટિંગને `"[truncated]"` સ્ટ્રિંગથી બદલવામાં આવે છે.
4. ઍરેઝને 32 એલિમેન્ટ્સ સુધી મર્યાદિત કરવામાં આવે છે.

ફક્ત પાર્સ કરેલી પ્રોવાઇડર એરર બોડી ધરાવતી કૉલ સાઇટ્સે જ `upstreamDetails` પાસ કરવું જોઈએ. આંતરિક OmniRoute એરર્સ (SSE પાર્સ નિષ્ફળતાઓ, ખાલી કન્ટેન્ટ, ગાર્ડરેલ બ્લૉક્સ)માં તેને સામેલ કરવું જોઈએ નહીં.

રૉ `err.stack`, `err.message` અથવા રનટાઇમ એક્સેપ્શનમાંથી મળતી કોઈપણ સ્ટ્રિંગને `upstreamDetails`માં પાસ કરશો **નહીં**. તેમણે હજી પણ અપસ્ટ્રીમ બોડી વિના `errorResponse` / `buildErrorBody(code, msg)`માંથી પસાર થવું આવશ્યક છે.

પસંદગીયુક્ત અપસ્ટ્રીમ 4xx પાસથ્રૂ ક્લાયન્ટના ઑટો-રિકવરી માટે જરૂરી પ્રોવાઇડરની સુરક્ષિત JSON રચના અને શબ્દરચના જાળવે છે, પરંતુ તે બાઇટ-ફૉર-બાઇટ પાસથ્રૂ નથી: સીરિયલાઇઝેશન પહેલાં રિકર્સિવ સેનિટાઇઝર હંમેશાં ચાલે છે. સાઇક્લિક, BigInt ધરાવતી અથવા પ્રતિકૂળ `toJSON()` બોડીઝ સુરક્ષિત રીતે નિષ્ફળ જાય છે અને પાસથ્રૂ માટે પાત્ર નથી. OCR અને મોડરેશન પણ આ જ નિયમ લાગુ કરે છે; નૉન-JSON, ખાલી અથવા ખોટા લેબલવાળી અપસ્ટ્રીમ બોડીઝને કૅનોનિકલ OmniRoute JSON એરર એન્વલપમાં રૂપાંતરિત કરવામાં આવે છે.

## જાણીતી CodeQL મર્યાદા: કસ્ટમ સેનિટાઇઝર્સ ઓળખાતા નથી

CodeQL ક્વેરી [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) સેનિટાઇઝર પેટર્નની નિશ્ચિત મંજૂરીસૂચિનો ઉપયોગ કરે છે (દા.ત. ઇનલાઇન `.split("\n")[0]`, ચોક્કસ regex આકારો સાથે `String#replace`, `Error` પર `.message` ને ઍક્સેસ કરવું). તે અમારા `sanitizeErrorMessage()` જેવા કસ્ટમ હેલ્પર મારફતે થતા પરોક્ષ ઉપયોગને **ઓળખતું નથી**.

આનો અર્થ એ છે કે આ મોડ્યુલ મારફતે સ્પષ્ટપણે સેનિટાઇઝ કરતા કૉલસાઇટ્સ — ઉદાહરણ તરીકે `open-sse/utils/error.ts::errorResponse` અને `open-sse/executors/cursor.ts::buildErrorResponse` — કોડ કાર્યાત્મક રીતે સુરક્ષિત હોવા છતાં ચેતવણી દર્શાવવાનું ચાલુ રાખી શકે છે. અગાઉના ડિસમિસલ્સ: `#224`, `#231` (મે 2026), બંનેને ટેકનિકલ વાજબી કારણ સાથે `false positive` તરીકે ચિહ્નિત કરવામાં આવ્યા હતા.

**નવી ઘટનાને કેવી રીતે સંભાળવી:**

1. ખાતરી કરો કે કૉલસાઇટ ખરેખર સંદેશને `sanitizeErrorMessage` / `buildErrorBody` / ઉપર દસ્તાવેજીકૃત રૅપર્સ પૈકી કોઈ એક મારફતે પસાર કરે છે (કૉલ ચેઇનને શરૂઆતથી અંત સુધી વાંચો — કોઈ ટિપ્પણી પર વિશ્વાસ ન કરો).
2. ખાતરી કરો કે `tests/unit/error-message-sanitization.test.ts` તે પાથનું પરીક્ષણ કરે છે (અથવા કવરેજ ઉમેરો).
3. આ દસ્તાવેજનો સંદર્ભ આપીને `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` મારફતે ચેતવણીને ડિસમિસ કરો.
4. દરેક જગ્યાએ `.split("\n")[0]` ઇનલાઇન કરીને તેને "ઠીક" કરશો **નહીં** — હેલ્પર સત્યનો એકમાત્ર સ્રોત છે; સ્કૅનરને સંતુષ્ટ કર્યાનો દેખાવ ઊભો કરવા માટે પેટર્નની નકલ કરવાથી સેનિટાઇઝર નબળું પડે છે (પાથ સ્ક્રબિંગ, લંબાઈ મર્યાદા અને પ્રકાર રૂપાંતરણ ગુમાવે છે).

CodeQLના [`@codeql/javascript-models` કસ્ટમ સેનિટાઇઝર કૉન્ફિગ](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) જેવી ઑપ્ટ-ઇન સુવિધાઓ અપનાવવી એ લાંબા ગાળાનો ઉકેલ છે; તે આ દસ્તાવેજના કાર્યક્ષેત્રની બહાર છે.

## સંદર્ભો

- [CWE-209: ભૂલ સંદેશ મારફતે માહિતીનું પ્રગટીકરણ](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: ભૂલ સંચાલન ચીટ શીટ](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- હેલ્પરને કેન્દ્રીકૃત કરતો કમિટ: `1a39c31f` — _fix(security): સાર્વજનિક અપસ્ટ્રીમ ક્રેડેન્શિયલ્સને માસ્ક કરો + ભૂલ સેનિટાઇઝેશનને કેન્દ્રીકૃત કરો_
