# CORS Configuration & Security (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute એક જ, કેન્દ્રીયકૃત મંજૂરીસૂચિમાંથી કયા **બ્રાઉઝર ઓરિજિન** ક્રોસ-ઓરિજિન પ્રતિસાદો વાંચી શકે છે તેનું નિયંત્રણ કરે છે. આ મોડેલ **ડિફૉલ્ટ રૂપે fail-closed** છે:
જ્યાં સુધી તમે કોઈ ઓરિજિનને સ્પષ્ટપણે મંજૂરી ન આપો ત્યાં સુધી કોઈ ઓરિજિનને મંજૂરી મળતી નથી. આ પૃષ્ઠ સમજાવે છે કે મંજૂરીસૂચિ કેવી રીતે રિઝૉલ્વ થાય છે, `CORS_ALLOW_ALL=true` વાસ્તવમાં શું ખુલ્લું મૂકે છે (અને, મહત્ત્વપૂર્ણ રીતે, શું **નથી** મૂકતું), ડેવલપમેન્ટ અને પ્રોડક્શનને સુરક્ષિત રીતે કેવી રીતે કૉન્ફિગર કરવાં, તેમજ વાઇલ્ડકાર્ડ સક્રિય હોય ત્યારે ડૅશબોર્ડ કઈ રનટાઇમ ચેતવણી બતાવે છે.

**અધિકૃત સ્રોત:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). મંજૂરીસૂચિ મિડલવેરમાં (`src/server/authz/pipeline.ts`) માત્ર એક જ વાર લાગુ કરવામાં આવે છે — દરેક રૂટના હેન્ડલર પોતે
`Access-Control-Allow-Origin` સેટ કરતા નથી.

## ઓરિજિન કેવી રીતે રિઝૉલ્વ થાય છે

દરેક વિનંતી માટે મિડલવેર નીચેના ક્રમમાં `Access-Control-Allow-Origin` મૂલ્યની ગણતરી કરે છે:

1. **`CORS_ALLOW_ALL=true`** (અથવા જૂનું `CORS_ORIGIN=*`) → કૉલરના
   `Origin`ને પ્રતિસાદમાં પાછું મોકલે છે (અથવા `Origin` હેડર ન હોય ત્યારે `*`), અને કૅશને યોગ્ય રાખવા માટે `Vary: Origin` ઉમેરે છે. એ જ `applyCorsHeaders()` ચૉકપોઇન્ટ ટોકન-પ્રમાણિત
   `/v1*`/`/v1beta*` સપાટી પર બૉડી ધરાવતા દરેક 2xx પ્રતિસાદમાં
   `Vary: Accept-Encoding` પણ ઉમેરે છે (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), જેથી
   ડાઉનસ્ટ્રીમ/શેર કરેલા કૅશ સંકુચિત અને અસંકુચિત વેરિઅન્ટ વચ્ચે યોગ્ય રીતે તફાવત કરી શકે.
2. અન્યથા, વિનંતીના `Origin`ને સામાન્યકૃત કરવામાં આવે છે (લોઅરકેસમાં ફેરવીને, અંતિમ સ્લૅશ દૂર કરીને) અને **મર્જ કરેલી મંજૂરીસૂચિ** સાથે મેળવવામાં આવે છે:
   - env **`CORS_ALLOWED_ORIGINS`** — અલ્પવિરામથી અલગ કરેલી સૂચિ, અને
   - રનટાઇમ **`corsOrigins`** સેટિંગ (Dashboard → Security → _CORS Allowed
     Origins_), જેને `src/lib/config/runtimeSettings.ts`માંથી
     `setRuntimeAllowedOrigins()` દ્વારા ઇન્જેક્ટ કરવામાં આવે છે.
3. કોઈ મેળ ન મળે → **કોઈ `Access-Control-Allow-Origin` હેડર મોકલવામાં આવતું નથી**. બ્રાઉઝર
   ક્રોસ-ઓરિજિન વાંચનને અવરોધે છે. આ ઇચ્છિત fail-closed ડિફૉલ્ટ છે.

| Env var                | અર્થ                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | મંજૂરી આપવા માટે ચોક્કસ ઓરિજિનની CSV સૂચિ (ભલામણ કરેલ).                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → કોઈપણ ઓરિજિનને પાછું મોકલો (વાઇલ્ડકાર્ડ). માત્ર ડેવલપમેન્ટ માટે.          |
| `CORS_ORIGIN`          | જૂનું. `*` એ `CORS_ALLOW_ALL`ની જેમ વર્તે છે; એક મૂલ્ય મંજૂરીસૂચિમાં ઉમેરવામાં આવે છે. |

## જોખમ મોડેલ — `CORS_ALLOW_ALL=true` વાસ્તવમાં શું ખુલ્લું મૂકે છે

OWASPની સામાન્ય ચેતવણી ("વાઇલ્ડકાર્ડ CORS = કોઈપણ સાઇટ તમારા APIને કૉલ કરી શકે છે")ને ગંભીરતાથી લેવી યોગ્ય છે, પરંતુ OmniRouteનું એક્સપોઝર **સામાન્ય પરિસ્થિતિ કરતાં વધુ મર્યાદિત** છે, કારણ કે અમલીકરણ સંબંધિત એક ચોક્કસ હકીકત છે:

> **કેન્દ્રીય `applyCorsHeaders()` ક્યારેય
> `Access-Control-Allow-Credentials` મોકલતું નથી.** સર્વર
> `Access-Control-Allow-Credentials: true` ન મોકલે ત્યાં સુધી બ્રાઉઝર _ક્રેડેન્શિયલ ધરાવતો_
> (કૂકી ધરાવતો) ક્રોસ-ઓરિજિન પ્રતિસાદ ઉપલબ્ધ કરાવશે નહીં. OmniRouteનો શેર કરેલો CORS પાથ આવું ક્યારેય
> કરતો નથી.

`CORS_ALLOW_ALL=true` સાથે પણ દરેક સપાટી માટે તેનો અર્થ આ છે:

| સપાટી                                | પ્રમાણીકરણ પદ્ધતિ         | વાઇલ્ડકાર્ડ CORSની અસર                                                                                                                                                                                                     |
| ------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`      | કૂકી સેશન                 | ઓરિજિન પાછું મોકલાય છે, પરંતુ **`Allow-Credentials` વિના** બ્રાઉઝર ક્રેડેન્શિયલ ધરાવતા વાંચનને **અવરોધે છે**. દૂષિત ક્રોસ-ઓરિજિન સાઇટ તમારા પ્રમાણિત ડૅશબોર્ડ પ્રતિસાદો **વાંચી શકતી નથી**, અને સેશન કૂકી ખુલ્લી પડતી નથી. |
| Client API `/v1/*`, `/v1beta/*`      | Bearer / `x-api-key` હેડર | પહેલેથી જ **ડિઝાઇન મુજબ** ઉદાર (`relaxForTokenAuth`): બ્રાઉઝર ક્યારેય `Authorization`/`x-api-key` આપમેળે જોડતા નથી, તેથી હુમલાખોરનું પૃષ્ઠ તમારી કી આપી શકતું નથી. `CORS_ALLOW_ALL` આને વધુ વ્યાપક બનાવતું નથી.            |
| જાહેર માત્ર-વાંચન (`/api/health`, …) | કોઈ નહીં                  | સંવેદનશીલ નથી; વાઇલ્ડકાર્ડ હાનિરહિત છે.                                                                                                                                                                                    |

તેથી `CORS_ALLOW_ALL=true`નું **બાકી રહેલું** એક્સપોઝર આટલા પૂરતું મર્યાદિત છે: (a)
પહેલેથી જ બિન-પ્રમાણિત ડેટાનું ક્રેડેન્શિયલ વિનાનું ક્રોસ-ઓરિજિન **વાંચન**, અને (b)
મેનેજમેન્ટ રૂટ્સ પર CORS **પ્રી-ફ્લાઇટને પસાર થવા દેવું** — જેને હજુ પણ એવા પ્રમાણીકરણની જરૂર પડે છે
જે ક્રોસ-ઓરિજિન પૃષ્ઠ આપી શકતું નથી. શેર કરેલા CORS પાથ પર તે સેશન હાઇજૅકિંગ અથવા
ક્રેડેન્શિયલ ચોરીનું માધ્યમ **નથી**.

### એક વાસ્તવિક અપવાદ — `/api/v1/agents/`

Cloud-Agent રૂટ્સ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) તેમના
**પોતાના** CORS હેડર્સ સેટ કરે છે
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) અને
`Access-Control-Allow-Origin: <origin>|*` સાથે
`Access-Control-Allow-Credentials: true` પણ **મોકલે છે**. આ એકમાત્ર એવી સપાટી છે જ્યાં
ઓરિજિન-ઇકો અને ક્રેડેન્શિયલ્સ એકસાથે અસ્તિત્વ ધરાવે છે, અને તે
`CORS_ALLOW_ALL`થી **સ્વતંત્ર** છે. આ રૂટ્સ મેનેજમેન્ટ-પ્રમાણિત છે
(`requireManagementAuth`); જે ઑપરેટર્સ ડૅશબોર્ડને હોસ્ટની બહાર ઉપલબ્ધ કરાવે છે તેમણે
ધ્યાન રાખવું જોઈએ કે પ્રતિસાદ હેડર્સ દ્વારા ક્રોસ-ઓરિજિન ક્રેડેન્શિયલ ધરાવતા વાંચનની મંજૂરી મળતી હોય તેવું આ એકમાત્ર સ્થાન છે. તેને સ્પષ્ટ મંજૂરીસૂચિ સુધી મર્યાદિત કરવાનું કાર્ય
આ CORS માર્ગદર્શનથી અલગ રીતે ટ્રૅક કરવામાં આવે છે.

## પ્રોડક્શન ચેકલિસ્ટ

- **પ્રોડક્શનમાં ક્યારેય `CORS_ALLOW_ALL=true` સેટ કરશો નહીં.** તેને અનસેટ રાખો.
- ઑરિજિનની **સ્પષ્ટ** સૂચિ સેટ કરો — env var અથવા Security ટૅબના ફીલ્ડમાંથી કોઈ એક દ્વારા:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- જો OmniRoute રિવર્સ પ્રોક્સી / ટનલ (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) પાછળ ચાલતું હોય, તો CORS તમારું **એકમાત્ર** નિયંત્રણ નથી — લૂપબૅક રૂટ
  ગાર્ડ હજુ પણ પ્રોસેસ શરૂ કરી શકતા રૂટ્સને સુરક્ષિત રાખે છે (જુઓ
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). 403ને "ઠીક" કરવા માટે
  `X-Forwarded-For: 127.0.0.1` બનાવટી રીતે સેટ કરશો નહીં; આમ કરવાથી રૂટ ગાર્ડ જે
  RCE વર્ગને બંધ કરે છે તે ફરી ખુલ્લો થઈ જાય છે.
- રનટાઇમ સ્થિતિની પુષ્ટિ કરો: જ્યારે પણ
  `CORS_ALLOW_ALL=true` સક્રિય હોય ત્યારે ડૅશબોર્ડ, Dashboard → Security → Authorization Inventory હેઠળ
  **કાયમી એમ્બર બૅનર** બતાવે છે, અને `/api/settings/authz-inventory` એવું
  `cors: { allowAll, allowedOrigins }` એન્વલપ પરત કરે છે જેને મોનિટરિંગ ટૂલ્સ પોલ કરી શકે છે.

## ડેવલપમેન્ટની સગવડ — ચોક્કસ લોકલ ઑરિજિન્સને મંજૂરી આપો

ડેવલપમેન્ટમાં પણ તમને ભાગ્યે જ વાઇલ્ડકાર્ડની જરૂર પડે છે. તમે ઉપયોગ કરતા હો તેવા માત્ર dev સર્વર્સને મંજૂરી આપો:

```bash
# લોકલ OmniRouteને કૉલ કરતા Vite (5173) + Next.js (3000) dev સર્વર્સ
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ઑરિજિન્સને કેસ-ઇન્સેન્સિટિવ રીતે મેળવામાં આવે છે અને અંતિમ સ્લૅશ અવગણવામાં આવે છે, તેથી
`http://localhost:3000` અને `http://localhost:3000/` સમકક્ષ છે. એ જ CSVને
રિસ્ટાર્ટ કર્યા વિના રનટાઇમ દરમિયાન **Dashboard → Security → CORS Allowed Origins**માં
સેટ કરી શકાય છે.

## API કીઝ વિરુદ્ધ કુકી સેશન્સ

- **Bearer / `x-api-key` (`/v1/*` ઇન્ફરન્સ સપાટી):** બ્રાઉઝર્સ આને ક્યારેય
  આપમેળે જોડતા નથી. અહીં CORS કોઈ અર્થપૂર્ણ અવરોધ નથી — API કી જ
  અવરોધ છે — તેથી આ સપાટીને ઇરાદાપૂર્વક પરવાનગીયુક્ત રાખવામાં આવી છે, જેથી બ્રાઉઝર અને
  Electron ક્લાયન્ટ્સ એવા પ્રતિસાદો વાંચી શકે જેના માટે તેઓ પહેલેથી જ અધિકૃત છે.
- **કુકી સેશન (ડૅશબોર્ડ):** સુરક્ષિત-ડિફૉલ્ટ **અને**
  શેર કરેલા પાથ પર `Access-Control-Allow-Credentials`ની ગેરહાજરી દ્વારા સુરક્ષિત છે. કોઈપણ
  પરવાનગીયુક્ત કૉન્ફિગમાંથી મેનેજમેન્ટ/ડૅશબોર્ડ ઑરિજિન્સને બહાર રાખો; તેઓ ચોક્કસપણે
  સુરક્ષિત-બંધ જ રહેવા જોઈએ.

## ઉદાહરણ: OmniRouteની આગળ રિવર્સ પ્રોક્સી

CORSને OmniRoute પોતે જ અમલમાં મૂકે છે, તેથી પ્રોક્સીએ સામાન્ય રીતે
`Access-Control-*` હેડર્સ ઉમેરવા કે ફરીથી લખવા **ન જોઈએ** (ડબલ હેડર્સ બ્રાઉઝર્સમાં ખામી સર્જે છે). TLS
ટર્મિનેટ કરીને ફૉર્વર્ડ કરો — પ્રીફ્લાઇટનો જવાબ OmniRouteને આપવા દો:

```nginx
# nginx — OmniRoute પર ફૉર્વર્ડ કરો; અહીં Access-Control-* ઇન્જેક્ટ કરશો નહીં
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-Forને 127.0.0.1 પર સેટ કરશો નહીં — તે લૂપબૅક રૂટ ગાર્ડને નિષ્ફળ બનાવે છે.
}
```

મંજૂર બ્રાઉઝર ઑરિજિન્સને પ્રોક્સીમાં નહીં, પરંતુ OmniRouteમાં (`CORS_ALLOWED_ORIGINS` અથવા
Security ટૅબમાં) સેટ કરો.

## સોર્સ ફાઇલો

| વિષય                                     | ફાઇલ                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------- |
| અલાઉલિસ્ટ રિઝોલ્યુશન + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| મિડલવેરનો અમલ (સત્યનો એકમાત્ર સ્રોત)     | `src/server/authz/pipeline.ts`                                       |
| સેટિંગ્સ → રનટાઇમ ઑરિજિન ઇન્જેક્શન       | `src/lib/config/runtimeSettings.ts`                                  |
| ડૅશબોર્ડ માટે રનટાઇમ સ્થિતિ              | `src/app/api/settings/authz-inventory/route.ts`                      |
| ડૅશબોર્ડ ચેતવણી બૅનર                     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ફીલ્ડ               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent પ્રતિ-રૂટ CORS (અપવાદ)       | `src/lib/cloudAgent/api.ts`                                          |

## આ પણ જુઓ

- [રૂટ ગાર્ડ સ્તરો](./ROUTE_GUARD_TIERS.md) — spawn-સક્ષમ રૂટ્સ માટે loopback અમલીકરણ
  (એક અલગ, પૂરક નિયંત્રણ).
- [અધિકૃતતા માર્ગદર્શિકા](../architecture/AUTHZ_GUIDE.md) — સંપૂર્ણ auth પાઇપલાઇન.
