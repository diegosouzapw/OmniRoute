# Router Backends & Embedded Services — architecture contract (ADR) (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **ሁኔታ:** ተቀባይነት ያገኘ · **ዐውድ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **ውል:** `domain/routing/routerBackends.ts`
> (በዓይነት የተወሰነ መዝገብ — ኮዱ ከ[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ጋር ይገባል)

ይህ ADR `ts` (ቤተኛ)፣ `bifrost`፣ `cliproxy`፣ `9router` እና
ከVibeProxy ጋር ተኳሃኝ የሆኑ ሞተሮች እርስ በርስ እንዴት እንደሚዛመዱ በግልጽ ይወስናል፤ በዚህም አስተዋጽዖ አድራጊዎች በአርክቴክቸር ደረጃ የተለዩ ሁለት ነገሮችን ማደባለቃቸውን ያቆማሉ። በrouter-backend-registry ሥራ የተዋወቀውን በዓይነት የተወሰነ
መዝገብ ለዚያ ሞዴል ብቸኛው የእውነት ምንጭ አድርጎ ይመዘግባል።

## ዋናው ልዩነት — ሁለት እርስ በርስ ነጻ የሆኑ ዘንጎች

የአንድ ሞተር ሚና በመዝገቡ `RouterBackendDefinition` ውስጥ አብረው በተቀመጡ **ሁለት ነጻ ዘንጎች** ይገለጻል፦

1. **የሕይወት ዑደት** (`RouterBackendLifecycle`) — _ሞተሩ እንዴት እንደሚሠራ_፦
   - `in-process` — በOmniRoute Node ሂደት ውስጥ ይሠራል (ቤተኛው TS የማቀናበሪያ መስመር)።
   - `supervised` — OmniRoute በ`ServiceSupervisor` በኩል የሚጭነው/የሚጀምረው/የሚያቆመው/ጤንነቱን የሚፈትሸው፣ ከዚያም እንደ አቅራቢ ግንኙነት የሚጠቀምበት አካባቢያዊ ልጅ ሂደት።
   - `external` — OmniRoute ጥያቄዎችን የሚልክለት ነገር ግን **የማያስተዳድረው**
     የHTTP መዳረሻ (በenv መሠረታዊ URL የሚዋቀር)።
   - `disabled` — የተመዘገበ ነገር ግን ሊመረጥ የማይችል።
2. **የምርጫ ዘንግ** (የrelay ማዞሪያ backend) — _relay ጥያቄዎችን ወደ እሱ ይልክ እንደሆነ_፦
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` በ
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` ውስጥ።

መወገድ ያለበት ስህተት፦ "የተካተተ አገልግሎት" እና "የማዞሪያ backend" እንደ አንድ
ዝርዝር መቁጠር። አንድ አይደሉም። `supervised` ሞተር (9router/cliproxy) **በቤተኛው የማቀናበሪያ መስመር ጥቅም ላይ የሚውል የአቅራቢ
ግንኙነት** እንጂ አማራጭ የrelay መላኪያ
backend አይደለም። `bifrost` ደግሞ ተቃራኒው ነው — (በታሪካዊ ሁኔታ)
`external`-ብቻ የነበረ የrelay መላኪያ backend ነው።

## መዝገቡ — ብቸኛው የእውነት ምንጭ

የ`domain/routing/routerBackends.ts` ውል (ኮዱ ከ
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ጋር ይገባል) እያንዳንዱን ሞተር ከሕይወት ዑደቱ፣ ችሎታዎቹ፣ የአገልግሎት ማንነቱ፣ ነባሪ ወደቡ፣ የጤንነት ውቅሩ እና
የቴሌሜትሪ ድጋፉ ጋር አንድ ጊዜ ያውጃል። ተጠቃሚዎች ለእያንዳንዱ sidecar ልዩ ሁኔታ ከመጻፍ ይልቅ፣ ሞተሮችን በ`getRouterBackend(id)`፣
`listRouterBackends()` እና `listRouterBackendsByCapability(cap)` በኩል ይፈልጋሉ።

| Backend     | የሕይወት ዑደት    | አገልግሎት (ዘንግ A) | Relay backend (ዘንግ B) | ጤንነት          | ነባሪ ወደብ |
| ----------- | ------------ | -------------- | --------------------- | ------------- | ------- |
| `ts`        | `in-process` | —              | `ts` (ቤተኛ)            | —             | —       |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`    | `/health`     | —       |
| `cliproxy`  | `supervised` | `cliproxy`     | — (አቅራቢ)              | `/v1/models`  | 8317    |
| `9router`   | `supervised` | `9router`      | — (አቅራቢ)              | `/api/health` | 20130   |
| `vibeproxy` | `external`   | —              | — (የአቅራቢ አስማሚ)        | `/v1/models`  | —       |

¹ Bifrost ወደ `supervised` የተካተተ አገልግሎት (ከ`/api/services/bifrost/` ሊጫን/ሊጀመር የሚችል) እንዲያድግ የሚደረገው ሥራ በ
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) ይከታተላል፤ እስኪዋሃድ ድረስ፣
Bifrost `external`-ብቻ ነው (በ`BIFROST_BASE_URL` በኩል ብቻ ተደራሽ ነው)።

`capabilities` (`chat`፣ `responses`፣ `streaming`፣ `tools`፣ `vision`፣
`oauth-backed`፣ `dashboard-embed`፣ `model-sync`፣ `native-hot-path`) ጠሪዎች ለእያንዳንዱ id የተለየ ቅርንጫፍ በቋሚነት ከመጻፍ ይልቅ፣ አንድ ሞተር በእርግጥ ማድረግ በሚችለው መሠረት እንዲያጣሩ ያስችላቸዋል።

## ዘንግ A — የተካተቱ አገልግሎቶች (ቁጥጥር የሚደረግበት የፕሮሰስ ወገን)

- **ቁጥጥር የሚደረግባቸው ፕሮሰሶች መዝገብ:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (በአሁኑ ጊዜ፦ `9router`፣ `cliproxy`)።
- **የሕይወት ዑደት ባለቤት:** `src/lib/services/ServiceSupervisor.ts` — `start()` ልጅ
  ፕሮሰሱን ይፈጥራል፣ በ`waitForHealthy()` ላይ ያግዳል፣ stdout/stderrን ወደ ring buffer
  ያስገባል፤ `stop()` SIGTERM→SIGKILL፤ ሁሉም በlock ሥር በተከታታይ ይከናወናሉ።
- **የሁኔታ union** (`src/lib/services/types.ts`)፦
  `not_installed | stopped | starting | running | stopping | error`፣ እንዲሁም ከእነዚህ
  ነጻ የሆነ `HealthState = healthy | unhealthy | unknown`።
- **ለምን የተለየ ፕሮሰስ (in-proc SDK ሳይሆን)?** የፕሮሰስ ማግለል ነው ለእያንዳንዱ
  sidecar install/start/stop/health/logsን በተናጠል ለመቆጣጠር የሚያስችለው፣ እንዲሁም
  የloopback spawn-guard ተግባራዊ እንዲሆን የሚያደርገው። የin-proc adapter ሞዴል ማድረግ
  የወደፊት ሥራ ነው — ይህ የሚገለጸው በ`native-hot-path` capability flag ነው።

### የሕይወት ዑደት route ውል (`/api/services/<tool>/…`)

የሁኔታ ኮዶች **ሆን ተብሎ ለstate/verb/path የተለዩ ናቸው** — ይህ ውሉ ነው፣
ወጥነት ማጣት አይደለም፦

| ጥሪ                           | ሁኔታ                            | የሁኔታ ኮድ                              |
| ---------------------------- | ------------------------------ | ------------------------------------ |
| `POST .../start`             | አገልግሎቱ `not_installed` ነው      | **409** (ቅድመ ሁኔታ)                    |
| `POST .../stop`              | አስቀድሞ ቆሟል                      | **200** (ተደጋጋሚ ጥሪ ምንም አያደርግም)        |
| `GET .../status`             | ችግር የለም                        | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | የspawn አለመሳካት                  | **503** (ጊዜያዊ)                       |
| `GET .../status`, `.../stop` | ያልተያዘ ስህተት                     | **500**                              |
| `GET /api/services/<x>/logs` | ያልታወቀ tool `<x>`               | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` የለም    | **403** (ለ9router ብቻ)                |
| **ማንኛውም** `/api/services/*`  | ጠሪው loopback/private-LAN አይደለም | **403 LOCAL_ONLY**                   |

ሁሉም የስህተት bodyዎች በ`createErrorResponse()` →
`{ error: { message, type }, requestId }` ቅርጽ ይዘጋጃሉ፤ እዚህ `type` ከሁኔታ ኮዱ
የሚመነጭ ሲሆን (`500→server_error`፣ `404→not_found`፣ `409→conflict`፣ ካልሆነ
`invalid_request`) በማሽን ሊተገበርበት የሚችል መለያ ነው። መልዕክቶች አስቀድመው
ይጸዳሉ (`sanitizeErrorMessage()`፣ ጥብቅ ደንብ #12)።

**የloopback guard** በብዛት `403` የሚያስከትለው ምክንያት ነው፦ `/api/services/`
በ`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ውስጥ ይገኛል፣ እና
`src/server/authz/policies/management.ts` ማንኛውንም loopback / private-LAN ያልሆነ
ጠሪ **ከauth በፊት** ውድቅ ያደርጋል፤ ምክንያቱም እነዚህ routes ልጅ ፕሮሰሶችን
ይፈጥራሉ (ጥብቅ ደንቦች 15 እና 17)። በpublic tunnel በኩል እነሱን መድረስ
ሆን ተብሎ `403` እንዲሆን ተደርጓል።

## ዘንግ B — የrelay routing backend (የdispatch ወገን)

dispatch backendን የሚመርጠው የrelay proxy path `/api/v1/relay/chat/completions` ብቻ ነው፤
ዋናው `/api/v1/chat/completions` surface ፈጽሞ `routingBackend.ts`ን አያማክርም።

- **ምርጫ** (`resolveRelayRoutingBackend`)፦ አንድ አጠቃላይ env toggle —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}።
  ካልተዋቀረ፣ Bifrost configured+enabled ከሆነ `auto`፣ ካልሆነ `ts` ይሆናል።
- **ባህሪ፦**
  - `bifrost` (በግድ)፦ የBifrost አለመሳካት → ቀጥተኛ `502`፣ fallback የለም።
  - `auto`፦ Bifrostን ይሞክራል፤ ሲከሽፍ/cooldown ላይ ሲሆን ያለማሳወቅ ወደ native ይሻገራል።
  - `ts` / ከfallback በኋላ፦ native `open-sse` translator/executor pipeline።
- **Cooldown፦** በ`bifrostCooldown.ts` ውስጥ ለእያንዳንዱ `baseUrl` የአለመሳካት cooldown።

በአሁኑ ጊዜ ምርጫው በrelay ደረጃ **ሙሉ በሙሉ ወይም ምንም** ነው — በ`release/v3.8.43`
ላይ ለእያንዳንዱ provider ወይም request የengine ቅያሬ የለም። የእያንዳንዱ request gate
በsidecar-manifest ሥራ እየታከለ ነው
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`)፣
ይህም `auto` በmanifest ብቁ የሆኑ providersን ብቻ በBifrost በኩል route እንዲያደርግ ያስችለዋል።

## የዳሽቦርድ ውህደት

የአገልግሎቶች ዳሽቦርድ በየ5 ሰከንዱ `GET /api/services/<tool>/status`ን በ
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
በኩል ይጠይቃል፤ `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`ን ይመልሳል። የጋራ የተገኝነት-አውድ አቅራቢ የለም —
እያንዳንዱ ኮምፖነንት ለእያንዳንዱ መሣሪያ hookን ይጠራል። `!res.ok` ሲሆን hook በአሁኑ ጊዜ
ተጨማሪ መረጃ የሌለውን `HTTP <status>` ያሳያል፤ የ`error.type` መስክን ከሰው ሊረዳው ከሚችል ማብራሪያ ጋር ማዛመድ
ክትትል የሚደረግበት የUX ማሻሻያ እንጂ የውል ለውጥ አይደለም።

## ውጤቶች

- አዳዲስ ኤንጂኖች በ`ROUTER_BACKENDS` ውስጥ አንድ ጊዜ ይመዘገባሉ፤ ተጠቃሚዎች አዳዲስ በid የተለዩ የሁኔታ ቅርንጫፎችን
  ሳያስፈልጋቸው በችሎታ መጠይቆች በኩል ያገኟቸዋል።
- "ይህ አገልግሎት ነው ወይስ የራውቲንግ ባክኤንድ?" የሚለው ጥያቄ የሚመለሰው በ`lifecycle` መስክ እንጂ
  አንድ id በአጋጣሚ በታየበት ዝርዝር አይደለም።
- የBifrost ቁጥጥር (#5817) እና ወደ ኔቲቭ ፈጣን መንገድ የማዛወር ሥራ (#5670) እያንዳንዱን
  sidecar ለየብቻ ከማስተናገድ ይልቅ በዚህ የጋራ ውል ላይ ይገነባሉ።
