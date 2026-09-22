# CORS Configuration & Security (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute የትኞቹ **የአሳሽ origins** ከአንድ ማዕከላዊ የፈቃድ ዝርዝር ተሻጋሪ-origin ምላሾችን ማንበብ እንደሚችሉ ይቆጣጠራል። ሞዴሉ **በነባሪነት ዝግ-ውድቀት ያለው ነው**፦ በግልጽ እስካልፈቀዱት ድረስ ምንም origin አይፈቀድም። ይህ ገጽ የፈቃድ ዝርዝሩ እንዴት እንደሚፈታ፣ `CORS_ALLOW_ALL=true` በትክክል ምን እንደሚያጋልጥ (እና ከሁሉም በላይ ምን **እንደማያጋልጥ**)፣ የልማት እና የምርት አካባቢዎችን በደህንነት እንዴት ማዋቀር እንደሚቻል፣ እንዲሁም wildcard ንቁ ሲሆን ዳሽቦርዱ የሚያሳየውን የሩጫ-ጊዜ ማስጠንቀቂያ ይመዘግባል።

**የእውነት ምንጭ፦** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)። የፈቃድ ዝርዝሩ አንድ ጊዜ ብቻ፣ በmiddleware
(`src/server/authz/pipeline.ts`) ውስጥ ይተገበራል — የእያንዳንዱ route handlers
`Access-Control-Allow-Origin`ን በራሳቸው አያዘጋጁም።

## Origin እንዴት እንደሚፈታ

ለእያንዳንዱ ጥያቄ middleware የ`Access-Control-Allow-Origin` እሴትን
በዚህ ቅደም ተከተል ያሰላል፦

1. **`CORS_ALLOW_ALL=true`** (ወይም የቀድሞው `CORS_ORIGIN=*`) → የጠሪውን
   `Origin` መልሶ ያንጸባርቃል (`Origin` header ከሌለ `*`)፣ caches ትክክለኛ
   ሆነው እንዲቆዩ `Vary: Origin`ን ያክላል። ያው `applyCorsHeaders()`
   chokepoint በtoken ማረጋገጫ በተጠበቀው `/v1*`/`/v1beta*` surface ላይ
   body ላለው እያንዳንዱ 2xx ምላሽ `Vary: Accept-Encoding`ንም ያክላል
   (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737)፣ በዚህም downstream/shared
   caches የታመቁ እና ያልታመቁ ልዩነቶችን በትክክል እንዲለዩ ያስችላል።
2. ያለበለዚያ፣ የጥያቄው `Origin` normalized ይደረጋል (ወደ ትንሽ ፊደላት
   ይቀየራል፣ በመጨረሻ ያለው slash ይወገዳል) እና ከ**ተዋሃደው የፈቃድ
   ዝርዝር** ጋር ይመሳሰላል፦
   - env **`CORS_ALLOWED_ORIGINS`** — በነጠላ ሰረዝ የተለየ ዝርዝር፣ እና
   - የሩጫ-ጊዜ **`corsOrigins`** ቅንብር (Dashboard → Security → _CORS Allowed
     Origins_)፣ ከ`src/lib/config/runtimeSettings.ts` በ`setRuntimeAllowedOrigins()`
     በኩል የሚገባ።
3. ምንም ተዛማጅ ካልተገኘ → **ምንም `Access-Control-Allow-Origin` header
   አይላክም**። አሳሹ የተሻጋሪ-origin ንባቡን ያግዳል። ይህ በዓላማ
   የተዘጋጀው የነባሪ ዝግ-ውድቀት ባህሪ ነው።

| Env var                | ትርጉም                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ለመፍቀድ የትክክለኛ origins CSV (የሚመከር)።                                    |
| `CORS_ALLOW_ALL`       | `true`/`1` → ማንኛውንም origin መልሶ ያንጸባርቃል (wildcard)። ለልማት ብቻ።          |
| `CORS_ORIGIN`          | የቀድሞ አማራጭ። `*` እንደ `CORS_ALLOW_ALL` ይሠራል፤ አንድ እሴት ወደ ፈቃድ ዝርዝሩ ይጨመራል። |

## የስጋት ሞዴል — `CORS_ALLOW_ALL=true` በትክክል ምን ያጋልጣል

አጠቃላዩን የOWASP ማስጠንቀቂያ ("wildcard CORS = ማንኛውም ጣቢያ APIዎን
መጥራት ይችላል") በቁም ነገር መውሰድ ተገቢ ነው፣ ነገር ግን በአንድ ግልጽ
የአተገባበር እውነታ ምክንያት የOmniRoute ተጋላጭነት **ከአጠቃላዩ ሁኔታ
ይበልጥ የተገደበ ነው**፦

> **ማዕከላዊው `applyCorsHeaders()` በፍጹም
> `Access-Control-Allow-Credentials`ን አይልክም።** አገልጋዩ
> `Access-Control-Allow-Credentials: true`ን ካልላከ በስተቀር አሳሽ
> _ማረጋገጫ ያለው_ (cookie የያዘ) ተሻጋሪ-origin ምላሽን አያጋልጥም።
> የOmniRoute የጋራ CORS መንገድ ይህን በፍጹም አያደርግም።

ይህ በእያንዳንዱ surface ላይ፣ `CORS_ALLOW_ALL=true` ቢሆንም፣ የሚከተለውን
ማለት ነው፦

| Surface                         | የማረጋገጫ ዘዴ                   | የwildcard CORS ውጤት                                                                                                                                                           |
| ------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*` | Cookie session              | Origin መልሶ ይንጸባረቃል፣ ነገር ግን **`Allow-Credentials` ስለሌለ** አሳሹ **ማረጋገጫ ያለውን ንባብ ያግዳል**። ጎጂ ተሻጋሪ-origin ጣቢያ ማረጋገጫ ያላቸውን የዳሽቦርድ ምላሾችዎን **ማንበብ አይችልም**፣ እና session cookieው አይጋለጥም። |
| Client API `/v1/*`, `/v1beta/*` | Bearer / `x-api-key` header | ቀድሞውኑ **በንድፍ ምክንያት** ፈቃደኛ ነው (`relaxForTokenAuth`)፦ አሳሾች `Authorization`/`x-api-key`ን በራስ-ሰር አያያይዙም፣ ስለዚህ የአጥቂ ገጽ ቁልፍዎን ማቅረብ አይችልም። `CORS_ALLOW_ALL` ይህን አያሰፋውም።             |
| ይፋዊ ለንባብ-ብቻ (`/api/health`, …)  | ምንም                         | ስሱ ያልሆነ፤ wildcard ጉዳት የለውም።                                                                                                                                                  |

ስለዚህ የ`CORS_ALLOW_ALL=true` **ቀሪ** ተጋላጭነት በሚከተሉት ብቻ የተገደበ ነው፦
(a) ቀድሞውኑ ማረጋገጫ የማይፈልግ ውሂብን ማረጋገጫ የሌለው ተሻጋሪ-origin
**ማንበብ**፣ እና (b) በmanagement routes ላይ CORS **preflight እንዲያልፍ**
መፍቀድ — እነዚህ routes አሁንም ተሻጋሪ-origin ገጽ ሊያቀርበው የማይችለውን
ማረጋገጫ ይፈልጋሉ። ይህ በጋራው CORS መንገድ ላይ የsession ጠለፋ ወይም
የማረጋገጫ መረጃ ስርቆት መንገድ **አይደለም**።

### አንድ እውነተኛ ልዩ ሁኔታ — `/api/v1/agents/`

የCloud-Agent routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)
**የራሳቸውን** CORS headers
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ያዘጋጃሉ እና
`Access-Control-Allow-Origin: <origin>|*`ን ከ
`Access-Control-Allow-Credentials: true` ጋር **በእርግጥ ይልካሉ**። ይህ
origin መልሶ ማንጸባረቅ እና credentials አብረው የሚኖሩበት ብቸኛው surface
ነው፣ እና ከ`CORS_ALLOW_ALL` **ነፃ ነው**። እነዚህ routes በmanagement
ማረጋገጫ የተጠበቁ ናቸው (`requireManagementAuth`)፤ ዳሽቦርዱን ከhost ውጭ
የሚያጋልጡ operators በምላሽ headers የተሻጋሪ-origin ማረጋገጫ ያለው ንባብ
የሚፈቀድበት ብቸኛው ቦታ ይህ መሆኑን ማወቅ አለባቸው። ይህን ወደ ግልጽ
የፈቃድ ዝርዝር ማጥበቅ ከዚህ CORS መመሪያ ተለይቶ ክትትል እየተደረገበት
ነው።

## የምርት አካባቢ ማረጋገጫ ዝርዝር

- **በምርት አካባቢ `CORS_ALLOW_ALL=true`ን ፈጽሞ አያዘጋጁ።** ሳይዘጋጅ ይተዉት።
- **በግልጽ የተገለጸ** የመነሻዎች ዝርዝር ያዘጋጁ — የአካባቢ ተለዋዋጩን ወይም በSecurity ትር ውስጥ ያለውን መስክ ይጠቀሙ፦

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ከreverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) ጀርባ የሚሰራ ከሆነ፣ CORS **ብቸኛው** መቆጣጠሪያዎ አይደለም — የloopback route
  guard አሁንም spawn ማድረግ የሚችሉ routesን ይከላከላል ([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)ን
  ይመልከቱ)። 403ን «ለማስተካከል»
  `X-Forwarded-For: 127.0.0.1`ን አይፍጠሩ፤ ይህ route guard የዘጋውን የRCE ምድብ እንደገና
  ይከፍታል።
- የruntime ሁኔታውን ያረጋግጡ፦ `CORS_ALLOW_ALL=true` ንቁ በሆነ ጊዜ dashboardው
  በDashboard → Security → Authorization Inventory ስር **ቋሚ የአምበር ቀለም ባነር**
  ያሳያል፤ እንዲሁም `/api/settings/authz-inventory` የክትትል መሣሪያዎች በየጊዜው
  ሊጠይቁት የሚችሉትን `cors: { allowAll, allowedOrigins }` envelope ይመልሳል።

## የልማት ምቹነት — የተወሰኑ አካባቢያዊ መነሻዎችን መፍቀድ

በልማት አካባቢም እንኳ በአብዛኛው wildcard አያስፈልግዎትም። የሚጠቀሙባቸውን የdev servers ብቻ ይፍቀዱ፦

```bash
# አካባቢያዊ OmniRouteን የሚጠሩ Vite (5173) + Next.js (3000) dev servers
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

መነሻዎች የፊደል አቢይነትን ሳይለዩ እና የመጨረሻውን slash ችላ በማለት ይዛመዳሉ፤ ስለዚህ
`http://localhost:3000` እና `http://localhost:3000/` ተመጣጣኝ ናቸው። ይኸው CSV
ዳግም ማስጀመር ሳያስፈልግ በruntime ጊዜ በ**Dashboard → Security → CORS Allowed Origins**
ውስጥ ሊዘጋጅ ይችላል።

## API keys እና cookie sessions

- **Bearer / `x-api-key` (የ`/v1/*` inference ገጽታ)፦** browsers እነዚህን በራስ-ሰር
  ፈጽሞ አያያይዙም። እዚህ CORS ትርጉም ያለው መከላከያ አይደለም — API key ነው
  መከላከያው — ለዚህም ነው ያ ገጽታ browser እና Electron clients ቀድሞውኑ
  የማንበብ ፈቃድ ያላቸውን responses ማንበብ እንዲችሉ ሆን ተብሎ permissive የተደረገው።
- **Cookie session (dashboardው)፦** በfail-closed ነባሪው **እና**
  በጋራው path ላይ `Access-Control-Allow-Credentials` ባለመኖሩ የተጠበቀ ነው።
  የmanagement/dashboard መነሻዎችን ከማንኛውም permissive config ውጭ ያድርጉ፤ በትክክል
  fail-closed ሆነው መቆየት አለባቸው።

## ምሳሌ፦ ከOmniRoute ፊት ያለ reverse proxy

CORS በOmniRoute ራሱ የሚተገበር ስለሆነ፣ proxyው በአጠቃላይ `Access-Control-*` headersን
**ማከል** ወይም እንደገና መጻፍ የለበትም (ድርብ headers browsersን ያበላሻሉ)። TLSን
ያቋርጡና ወደፊት ያስተላልፉ — OmniRoute ለpreflight ምላሽ እንዲሰጥ ይተዉት፦

```nginx
# nginx — ወደ OmniRoute ወደፊት ያስተላልፉ፤ እዚህ Access-Control-*ን አያስገቡ
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-Forን ወደ 127.0.0.1 አያዘጋጁ — ይህ የloopback route guardን ያሰናክላል።
}
```

የተፈቀዱትን የbrowser መነሻዎች በproxyው ውስጥ ሳይሆን በOmniRoute
(`CORS_ALLOWED_ORIGINS` ወይም Security ትር) ውስጥ ያዘጋጁ።

## የምንጭ ፋይሎች

| ጉዳይ                                 | ፋይል                                                                  |
| ----------------------------------- | -------------------------------------------------------------------- |
| የAllowlist ማጣራት + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| የMiddleware ትግበራ (ብቸኛ የእውነት ምንጭ)    | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime መነሻ ማስገባት        | `src/lib/config/runtimeSettings.ts`                                  |
| ለdashboardው የruntime ሁኔታ            | `src/app/api/settings/authz-inventory/route.ts`                      |
| የDashboard ማስጠንቀቂያ ባነር              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| የCORS Allowed Origins መስክ           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| የCloud-Agent በየroute CORS (ልዩ ሁኔታው) | `src/lib/cloudAgent/api.ts`                                          |

## ተጨማሪ ይመልከቱ

- [የመንገድ ጥበቃ ደረጃዎች](./ROUTE_GUARD_TIERS.md) — spawn ማድረግ ለሚችሉ መንገዶች የloopback ማስገደጃ (የተለየ፣ አጋዥ ቁጥጥር)።
- [የፈቃድ መመሪያ](../architecture/AUTHZ_GUIDE.md) — ሙሉው የauth ቧንቧ መስመር።
