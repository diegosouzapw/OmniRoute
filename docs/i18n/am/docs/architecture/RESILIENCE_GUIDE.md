# Resilience Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ሦስት የተለያዩ ግን ተዛማጅ የመቋቋም ዘዴዎች አሉት። እያንዳንዳቸው የተለየ ወሰንና ዓላማ አላቸው። የማዞሪያ ባህሪን ሲያርሙ እነዚህን ለያይተው ይያዙ።

![ባለ 3-ንብርብር የመቋቋም ሞዴል](../diagrams/exported/resilience-3layers.svg)

> ምንጭ፦ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. የአቅራቢ ሰርኪት መቋረጫ

**ወሰን፦** ሙሉው አቅራቢ (ለምሳሌ፣ `glm`፣ `openai`፣ `anthropic`)።

**ዓላማ፦** በላይኛው ዥረት/አገልግሎት ደረጃ በተደጋጋሚ ውድቀት ለሚያጋጥመው አቅራቢ ትራፊክ መላክን ማቆም።

**አተገባበር፦**

- ዋና ክፍል፦ `src/shared/utils/circuitBreaker.ts`
- ማገናኘት፦ `src/sse/handlers/chatHelpers.ts`፣ `src/sse/handlers/chat.ts`
- የሁኔታ API፦ `GET /api/monitoring/health`
- የዳግም ማስጀመሪያ API፦ `POST /api/resilience/reset`
- መጠቅለያዎች፦ `open-sse/services/accountFallback.ts`
- የውሂብ ጎታ ሰንጠረዥ፦ `domain_circuit_breakers`

**ሁኔታዎች፦**

- `CLOSED` — መደበኛ ትራፊክ ተፈቅዷል
- `DEGRADED` — ትራፊክ አሁንም ተፈቅዷል፣ ነገር ግን የጨመሩ የአቅራቢ ውድቀቶች ክትትል ይደረግባቸዋል
- `OPEN` — አቅራቢው ለጊዜው ታግዷል፤ የጥምር ማዞሪያው ይዘለዋል
- `HALF_OPEN` — የዳግም ማስጀመሪያ የጊዜ ገደቡ አልፏል፤ የመፈተሻ ጥያቄ ተፈቅዷል

**ሊዋቀሩ የሚችሉ ነባሪዎች (`open-sse/config/constants.ts`፣ በDashboard → Settings → Resilience ላይ የሚታዩ)፦**

| ክፍል     | ወደ የተዳከመ ሁኔታ የሚገባው | የሚከፈተው   | የዳግም ማስጀመሪያ የጊዜ ገደብ |
| ------- | ------------------ | -------- | ------------------- |
| OAuth   | 5 ውድቀቶች            | 8 ውድቀቶች  | 60s                 |
| API ቁልፍ | 7 ውድቀቶች            | 12 ውድቀቶች | 30s                 |
| አካባቢያዊ  | የሚሰላ               | 2 ውድቀቶች  | 15s                 |

`degradationThreshold` አንድ አቅራቢ መቼ ወደ `DEGRADED` እንደሚገባ ይቆጣጠራል፤ `failureThreshold` ደግሞ መቼ እንደሚከፈትና እንደሚዘለል ይቆጣጠራል። የአካባቢያዊ አቅራቢ መገለጫዎች እስካሁን በResilience ቅንብሮች ገጽ ላይ አይታዩም።

**የማቋረጫ ኮዶች፦** የአቅራቢ ደረጃ ሁኔታዎችን `[408, 500, 502, 503, 504]` ብቻ። በመለያ ደረጃ ለሚከሰቱ ስህተቶች (አብዛኞቹ 401/403/429 — እነዚህ በማቀዝቀዣ ጊዜ ወይም በመቆለፍ ሥር ይካተታሉ) ማቋረጫውን አያስነሱ።

**በፍላጎት ጊዜ መልሶ ማግኘት፦** `OPEN` ሲያበቃ፣ `getStatus()`፣ `canExecute()`፣ `getRetryAfterMs()` ሁኔታውን ወደ `HALF_OPEN` ያድሳሉ። የበስተጀርባ ሰዓት ቆጣሪ አያስፈልግም።

---

### በምርጫ የሚነቃ ዓለም አቀፍ የአቅራቢ ማቀዝቀዣ ጊዜ (የጊዜ መስኮት መግቢያ)

አራተኛው፣ **በምርጫ የሚነቃ** ንብርብር (`PROVIDER_COOLDOWN_ENABLED`፣ በነባሪ **የጠፋ**) ውድቀት
ያጋጠማቸውን አቅራቢዎች በጥያቄዎች መካከል የሚቆይ ማህደረ ትውስታ በ
`open-sse/services/providerCooldownTracker.ts` ውስጥ ይይዛል፤ ይህም በጥምር ዒላማ
ማግኛ ሂደት ይመከርበታል፣ ስለዚህ ተከታታይ የጥምር ጥያቄዎች በቅርቡ
ውድቀት ያጋጠመውን አቅራቢ እንደገና ማሰስ ያቆማሉ። የአቅራቢ ደረጃ ግቤቶች የ`PROVIDER_PROFILES` የጊዜ መስኮት መግቢያን ያከብራሉ፦

| መገለጫ    | የሚነሳው ከ (`providerFailureThreshold`) በኋላ | በ (`providerFailureWindowMs`) ውስጥ | ለ (`providerCooldownMs`) ይቀዘቅዛል |
| ------- | ---------------------------------------: | --------------------------------: | ------------------------------: |
| OAuth   |                                     `10` |                           `15min` |                          `5min` |
| API ቁልፍ |                                     `15` |                           `30min` |                         `10min` |

ከገደቡ በታች አቅራቢው በማቀዝቀዝ ላይ እንዳለ **አይቆጠርም**፤ ስኬታማ ምላሽ
የጊዜ መስኮቱን ያጸዳል። የግንኙነት ደረጃ ግቤቶች (`provider:connectionId`) በምትኩ
እየጨመረ የሚሄደውን `minRetryCooldownMs → maxRetryCooldownMs` የድጋሚ ሙከራ መዘግየት ይጠብቃሉ። ማሻሻያዎች፦
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`።
የድግግሞሽ ስህተት መከላከያ፦ `tests/unit/provider-cooldown-window-gate.test.ts`።

## 2. የግንኙነት ማቀዝቀዣ ጊዜ

**ወሰን:** አንድ የአቅራቢ ግንኙነት/መለያ/ቁልፍ።

**ዓላማ:** ለተመሳሳይ አቅራቢ ያሉ ሌሎች ግንኙነቶች አገልግሎት መስጠታቸውን እንዲቀጥሉ አንድ ችግር ያለበትን ቁልፍ መዝለል።

**አተገባበር:**

- እንደማይገኝ ምልክት ማድረግ፦ `src/sse/services/auth.ts::markAccountUnavailable()`
- ምርጫ፦ በተመሳሳይ ፋይል ውስጥ `getProviderCredentials*`
- የማቀዝቀዣ ጊዜ ስሌት፦ `open-sse/services/accountFallback.ts::checkFallbackError()`
- ቅንብሮች፦ `src/lib/resilience/settings.ts`

**በእያንዳንዱ ግንኙነት ያሉ መስኮች:**

- `rateLimitedUntil` — የማቀዝቀዣ ጊዜው እስኪያበቃ ድረስ ያለው የጊዜ ማህተም
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ኤክስፖነንሻል የመጠባበቂያ ቆጣሪ

**ነባሪ የማቀዝቀዣ ጊዜያት:**

- የOAuth መነሻ፦ 5s
- የAPI-key መነሻ፦ 3s
- API-key 429፦ ከውጫዊው አገልግሎት የሚመጡ `Retry-After`/ዳግም ማስጀመሪያ ራስጌዎችን/ሊተነተን የሚችል የዳግም ማስጀመሪያ ጽሑፍን ይመርጣል
- መጠባበቂያ፦ `baseCooldownMs * 2 ** failureIndex`

**የተመሳሳይ ጊዜ ጫና መከላከያ:** በአንድ ጊዜ የሚከሰቱ አለመሳካቶች የማቀዝቀዣ ጊዜውን ከመጠን በላይ እንዳያራዝሙ ወይም `backoffLevel`ን ሁለት ጊዜ እንዳይጨምሩ ይከላከላል።

**የመጨረሻ ሁኔታዎች (የማቀዝቀዣ ጊዜያት አይደሉም):**

- `banned` — የታገደ ቁልፍ ቃል / የመለያ እገዳ ሲገኝ ይዘጋጃል ([BAN_DETECTION](../security/BAN_DETECTION.md)ን ይመልከቱ)፤ እንዲሁም በሦስት ተከታታይ ከውጫዊው አገልግሎት በእያንዳንዱ ጥያቄ ላይ በሚደርሱ እምቢታዎች (`request_rejected`፣ ለምሳሌ Anthropic OAuth 403 "ጥያቄው አልተፈቀደም" — `open-sse/services/requestRejectedStreak.ts`)፤ አንድ እምቢታ ብቻ ግንኙነቱን ለማቀዝቀዣ ጊዜ ብቻ ያስገባል
- `expired` (ከተወሰነ የድጋሚ ሙከራ ብዛት በኋላ ወደ የመጨረሻ ሁኔታ ይሸጋገራል — `EXPIRED_RETRY_MAX = 3` ከኤክስፖነንሻል መጠባበቂያ ጋር — ስለዚህ ጊዜያዊ የOAuth ስህተቶች መለያው በቋሚነት ከመሰናከሉ በፊት ራሳቸውን ማስተካከል ይችላሉ)
- `credits_exhausted`

እነዚህ የመግቢያ ማረጋገጫዎቹ እስኪለወጡ ወይም ኦፕሬተር ዳግም እስኪያስጀምራቸው ድረስ ይቆያሉ። የመጨረሻ ሁኔታዎችን በጊዜያዊ የማቀዝቀዣ ሁኔታ አይተኩ።

**ሰነፍ ማገገም:** `rateLimitedUntil` ካለፈ በኋላ ግንኙነቱ እንደገና ለምርጫ ብቁ ይሆናል። በተሳካ ሁኔታ ሥራ ላይ ሲውል `clearAccountError()` ሁሉንም የስህተት መስኮች ያጸዳል።

### የClaude OAuth የአጠቃቀም ገደብ፦ ዝቅተኛ ቅድሚያ መስመር + የክፍለ ጊዜ ገደብ ዳግም ማስጀመር

**ወሰን:** አንድ የClaude የደንበኝነት ምዝገባ (OAuth) ግንኙነት። ሁለቱም ባህሪያት **በእያንዳንዱ ግንኙነት በፈቃድ የሚነቁ**
ናቸው (ግንኙነትን አርትዕ → Claude ክፍል → በ`providerSpecificData` ውስጥ `lowPriorityMode` / `autoLimitReset`፣
ሁለቱም በነባሪ ጠፍተዋል) እና የClaude Code `/low-priority` እና
`/limit-reset` ትዕዛዞችን ያንጸባርቃሉ (የግንኙነት ውሉ ከClaude Code 2.1.263 የተመዘገበ ነው)።

**አተገባበር:**

- የሁኔታ ማሽን + የምላሽ ምደባ፦ `open-sse/services/claudeLowPriority.ts`
- የዳግም ማስጀመሪያ ሁኔታ/ጥያቄ ደንበኛ፦ `open-sse/services/claudeLimitReset.ts`
- የአስፈጻሚ ማያያዣ (ራስጌ ማስገባት + በተመሳሳይ መለያ ዳግም መሞከር)፦ `open-sse/executors/base.ts::execute()`
- የፈቃድ ማንቃት ቋሚ ማከማቻ፦ `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ቀስቃሽ:** የ5-ሰዓት የአጠቃቀም ገደብ — ራስጌዎቹ
`anthropic-ratelimit-unified-status: rejected`ን የያዙ እና፣ መለያው ብቁ ሲሆን፣
`anthropic-ratelimit-unified-slow-offer: treatment`ን የያዙ `429`። ያ የመጀመሪያ የገደብ
429 ከመድረሱ በፊት ምንም ነገር አይላክም፤ ወጥ የሆኑ ራስጌዎች የሌሉት ድንገተኛ 429 በመደበኛው የማቀዝቀዣ መንገድ ያልፋል።

**ዝቅተኛ ቅድሚያ መስመር** (`lowPriorityMode`):

- የገደብ 429 ሲከሰት አስፈጻሚው ቅናሹን ተቀብሎ `anthropic-usage-limit: slow`ን በመጠቀም **ተመሳሳዩን**
  መለያ ወዲያውኑ እንደገና ይሞክራል፤ መስመሩ እስከታወጀው
  `anthropic-ratelimit-unified-reset` (+60s የእፎይታ ጊዜ) ድረስ ንቁ ሆኖ ይቆያል፣ እና በዚያ መስኮት ውስጥ ያለ እያንዳንዱ ጥያቄ
  ራስጌውን ይይዛል። የተያዘው 429 በፍጹም `handleChatCore` ላይ አይደርስም፣ ስለዚህ ግንኙነቱ
  ወደ ማቀዝቀዣ ጊዜ **አይገባም** እና ወደ ሌላ አይቀየርም።
- በኋላ በሚመጡ ምላሾች ላይ `anthropic-ratelimit-unified-slow-status`፦ `active` / `not_needed`
  መስመሩን ያስቀጥላሉ፤ `slot_busy` (429) ወይም `529` በአገልጋዩ
  `anthropic-ratelimit-unified-slow-retry-after` መሠረት ይጠብቃሉ (ነባሪ 20s፣ ገደብ 5–600s፣ ±30% የዘፈቀደ ልዩነት)
  እና እንደገና ይሞክራሉ፤ ይህም በ`anthropic-ratelimit-unified-slow-max-wait` የተገደበ ነው (ነባሪ 20 min፣ ገደብ
  1 min–6 h) — ከዚያ በኋላ መስመሩ ያበቃል እና የ10 ደቂቃ የእፎይታ ጊዜ ዳግም መቀበልን ይከለክላል።
  የመጠበቂያ ጊዜው በጥያቄው የራሱ የውጫዊ አገልግሎት ማስጀመሪያ ጊዜ ማብቂያ
  (`resolveFetchStartTimeout`፣ በነባሪ 10 min) ከ5 s ህዳግ በኋላ በሚቀረው ጊዜም ይገደባል፦ ያለዚህ ገደብ
  የ20-ደቂቃው ነባሪ ከፍተኛ መጠበቂያ ጥያቄው ካበቃ በኋላም ይቀጥላል፣ እና እንቅልፉ
  በመጠበቅ መካከል ይቋረጣል፤ ይህም ከሰላማዊው `max_wait` መጨረሻ + የእፎይታ ጊዜ ይልቅ `TimeoutError`ን ያሳያል።
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`፣ የ5h-መስኮት መቀየር፣ ወይም
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (የተከፈለበት ትርፍ አጠቃቀም አሁን ገደቡን ስለሚሸፍን፣
  በማንኛውም ሁኔታ እንደ `extra_usage` ያበቃዋል) መስመሩን ያበቃሉ፤ ከዚያም
  ምላሹ ወደ መደበኛው የማቀዝቀዣ መንገድ ይፈሳል። `budget_exhausted` እስከታወጀው የበጀት ዳግም ማስጀመሪያ
  (≤ 8 days) ድረስ ይታወሳል።
- የገደብ ፍተሻው የሚካሄደው በ400 ከሚነሱት የአስፈጻሚው በሙከራ ውስጥ ያሉ ድጋሚ ሙከራዎች (የአውድ
  አርትዖት፣ የአስተሳሰብ/ጥረት ገደቦች፣ የመለኪያ ራስ-ሰር መማር) በኋላ ነው፣ ስለዚህ ከእነዚያ ድጋሚ ሙከራዎች
  በአንዱ ላይ ብቻ የሚታይ የገደብ 429 ወደ ማቀዝቀዣ መንገድ ከመድረሱ ይልቅ አሁንም ይያዛል።
- ሁኔታው በእያንዳንዱ ግንኙነት በማህደረ ትውስታ ውስጥ ይገኛል (ዳግም ማስጀመር እንደገና ለመቀበል አንድ ተጨማሪ የገደብ 429 ያስፈልገዋል)።

**የክፍለ ጊዜ ገደብ ዳግም ማስጀመር** (`autoLimitReset`፣ ሁለቱም ሲነቁ ከመስመሩ በፊት ይሞከራል):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ብሎክ፤ `arm: "reset"` እና `available: true` ሲሆኑ፣
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ከ
  `{ "program": "juniper_tide" }` ጋር (የድርጅቱ UUID ከ
  `providerSpecificData.organizationUUID`፣ የመነሻ አማራጭ)።
- `result: reset|not_limited` → ጥያቄው በሙሉ ፍጥነት እንደገና ይሞከራል (የዝግታ ራስጌ የለም)።
  `already_used` / `not_offered` `next_available_at`ን ያስታውሳሉ (ነባሪ አንድ ሳምንት)፤ ማንኛውም
  አለመሳካት ለ15 ደቂቃ መጠባበቂያ ያደርጋል። ዳግም ማስጀመሩ በሳምንት አንድ ጊዜ ሲሆን አሁንም በሳምንታዊ ገደቡ ውስጥ ይቆጠራል።

የኋሊት ማፈግፈግ መከላከያዎች፦ `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`።

### የክፍለ ጊዜ ቁርኝት (#7274)

**ወሰን:** አንድ የደንበኛ ክፍለ ጊዜ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ራስጌ) ለ**ማንኛውም** አቅራቢ ወደ አንድ ግንኙነት የተቸከለ።

**ዓላማ፦** ባለብዙ ዙር ወኪልን (Claude Code, aider, custom agents) በጥያቄዎች መካከል በተመሳሳይ መለያ ላይ ማቆየት፣ በመለያዎች መካከል የአውድ መጥፋትን እና በየመለያው የክፍለ-ጊዜ ሁኔታ ባላቸው አቅራቢዎች ላይ የሚከሰቱ ተደጋጋሚ የቀዝቃዛ-ጅምር 429 ስህተቶችን መቀነስ።

**አተገባበር፦**

- የ-TTL መወሰን፦ `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ፒን መምረጥ/መፍጠር፦ `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ራስጌን ማውጣት (አጠቃላይ፣ ለማንኛውም አቅራቢ)፦ `src/sse/services/auth.ts::extractSessionAffinityKey()`
- የማይጠፋ የፒን ሰንጠረዥ፦ `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ቅንብር፦ `sessionAffinityTtlMs` (ዓለም አቀፍ TTL በms፣ `0` ያሰናክላል) — `src/lib/db/settings.ts`። ከCodex ብቻ ከነበረው `codexSessionAffinityTtlMs` በፍልሰት `124_generic_session_affinity_ttl.sql` እንደገና ተሰይሟል፤ ይህም ቀደም ሲል የተዋቀረ ማንኛውንም የCodex TTL እንደ አዲሱ ነባሪ ያስተላልፋል።

ከ#7274 በፊት፣ `resolveSessionAffinityTtlMs()` ከ`codex` በስተቀር ለሁሉም አቅራቢዎች ወዲያውኑ `0` በመመለስ ይወጣ ነበር፤ ስለዚህ የፒን ማድረጊያው ስልት እና የራስጌ ማውጣቱ ቀድሞውኑ ከአቅራቢ ነጻ ቢሆኑም፣ የ-TTL ቅንብሩ (እና የክፍለ-ጊዜ ራስጌዎቹ) በሌላ ቦታ ምንም ውጤት አልነበራቸውም። ማስተካከያው ያንን የቀድሞ መውጫ አስወግዷል፤ አሁን TTL በዓለም አቀፍ ደረጃ ከ`0` በላይ ከተቀናበረ በኋላ ለሁሉም አቅራቢዎች በአንድነት ይተገበራል።

ሦስቱ የክፍለ-ጊዜ ቅርርብ ራስጌዎች ወደ ላይኛው አገልግሎት ፈጽሞ አይተላለፉም — አስፈጻሚዎች የደንበኛ ራስጌዎችን እንዳሉ ከማስተላለፍ ይልቅ የራሳቸውን የላይኛው አገልግሎት ራስጌዎች ከባዶ ይገነባሉ፤ ስለዚህ ይህ የውስጥ ተዛማጅነት መለያ ብቻ ሆኖ ይቆያል።

### ልዩ የሚተዳደሩ የክፍለ-ጊዜ ግንኙነት ኪራዮች

**ወሰን፦** አንድ ንቁ የሚተዳደር HTTP ደንበኛ/ክፍለ-ጊዜ አንድ ብቁ የOmniRoute ግንኙነትን ይይዛል።

**ዓላማ፦** በጥያቄዎች መካከል ጥብቅ የማስተላለፊያ ወሰን ለሚያስፈልጋቸው ደንበኞች ዘላቂ እና ልዩ የግንኙነት ባለቤትነትን ማቅረብ። ይህ ለስላሳ የቀጣይነት ምርጫ ከሆነው የክፍለ-ጊዜ ቅርርብ የተለየ ነው፦
ልዩ ኪራይ የሕይወት ዑደት ሁኔታን በSQLite ውስጥ በዘላቂነት ያከማቻል፣ የዓለም አቀፍ ንቁ-ባለቤትና
ንቁ-ግንኙነት ልዩነትን ያስገድዳል፣ እና ወደ አቅራቢው ከመላኩ በፊት ጊዜ ያለፈበትን ትውልድ ውድቅ ያደርጋል።

ባህሪው ለእያንዳንዱ API ቁልፍ በምርጫ የሚነቃ ነው። የሚተዳደር ቁልፍ የ`lease:exclusive` ወሰን እና በግልጽ የተገለጸ ባዶ ያልሆነ የ`allowedConnections` ዝርዝር ሊኖረው ይገባል። ማንኛውም HTTP ደንበኛ የሕይወት ዑደት መጨረሻ ነጥቡን መጠቀም ይችላል፤ የደንበኛ ስም፣ user-agent፣ አቅራቢ፣ OAuth ዘዴ ወይም ሞዴል አያስፈልግም። ኪራዩ የግንኙነት እንጂ የሞዴል ባለቤት አይደለም፤ ስለዚህ ግንኙነቱ በተለመደው ሁኔታ ብቁ ሆኖ እስከቆየ ድረስ የሞዴል ለውጥ ትስስሩን ይዞ ይቆያል። የተለመዱ የሞዴል፣ የኮታ፣ የጤና፣ የማቀዝቀዣ ጊዜ እና የፈቃድ ዝርዝር ደንቦች አሁንም ዋና ስልጣን ያላቸው ሲሆን፣ ተመሳሳዩን ትውልድ ወደ ሌላ ነጻ እና ብቁ ግንኙነት ሊያሸጋግሩት ይችላሉ።

የሕይወት ዑደቱ `POST /api/v1/session-leases` ሲሆን፣ የJSON ድርጊቶቹ `acquire`፣ `renew` እና `release` ናቸው። የሚተዳደሩ የግምት ጥያቄዎች ግልጽ ያልሆነውን `X-OmniRoute-Lease-Owner` እሴት እና ትክክለኛውን `X-OmniRoute-Lease-Generation` ያቀርባሉ። ባለቤቱ `vlo_`ን ተከትለው የሚመጡ 43 base64url ቁምፊዎችን ይጠቀማል፤ የሚከማቸው የእሱ SHA-256 hash ብቻ ነው። እያንዳንዱ የመጨረሻ መላኪያ ወሰን የተረጋገጠውን API ቁልፍ ID እና ንቁውን የግንኙነት ID ጭምር ያስተሳስራል። የኪራይ መቆጣጠሪያ ራስጌዎች ከመዝገቦች፣ ከተያዙ የጥያቄ ቅጽበተ-ሁኔታዎች እና ከላይኛው አገልግሎት አስፈጻሚ ራስጌዎች ይወገዳሉ።

የተለመደው ማስተላለፍ ብቁ የሚተዳደሩ እጩዎች እያሉት እያንዳንዱ ነጻ እጩ በሌላ ንቁ ኪራይ የተያዘ ከሆነ፣ OmniRoute HTTP `429`፣ lease-capacity-unavailable ኮድ፣ አቅምን-የመጠበቅ ሁኔታ እና ከመጀመሪያው ተዛማጅ የማብቂያ ጊዜ የተገኘ የተገደበ `Retry-After` ይመልሳል። በተለመደው ሁኔታ ምንም ብቁ እጩ አለመኖሩ የኪራይ ፉክክር አይደለም፣ እና ያሉትን የማስተላለፍ ስህተት ትርጉሞች እንዳሉ ያቆያል።

ተዛማጅ ስልቶች እርስ በርሳቸው የተለዩ ሆነው ይቆያሉ፦

- የOAuth ክፍለ-ጊዜ ይዞታ ለOAuth መለያዎች በሂደት ውስጥ ብቻ የሚሰራ ለስላሳ ስርጭት ነው።
- የመለያ ሴማፎሮች የጥያቄ-ትይዩነት ፈቃዶችን ይሰጣሉ፣ እና ጥያቄው ሲጠናቀቅ ያበቃሉ።
- ልዩ የሚተዳደሩ የክፍለ-ጊዜ ኪራዮች ከትውልድ ወሰን ጋር የሚሰራ ዘላቂ የሕይወት ዑደት ባለቤትነት ናቸው።

---

## 3. የሞዴል መቆለፊያ

**ወሰን:** አቅራቢ + ግንኙነት + ሞዴል ሦስትዮሽ።

**የቁልፍ ወሰን በሁኔታ ኮድ:** የመቆለፊያ ሁኔታው መቆለፊያው በየትኛው ቁልፍ ላይ
እንደሚጻፍ ይወስናል (`resolveLockoutScope()` በ `open-sse/services/accountFallback/exactModelLock.ts` ውስጥ):

- `429` / `403` / `402` — የኮታ ወይም የመብት ምልክት — **የኮታ ቤተሰቡን** ይቆልፋሉ:
  ለ codex ሙሉውን `codex` / `spark` ወሰን (የግንኙነቱን እያንዳንዱን
  `gpt-5*` ሞዴል)፣ ለሌሎች አቅራቢዎች `getQuotaScopedModelForProvider()`።
- `404` መሠረታዊውን ሞዴል ይቆልፋል (`getModelLockKey()` `not_found`ን ያጠባል)።
- ማንኛውም ሌላ ሁኔታ — የ`5xx` ማጓጓዣ/አገልጋይ ውድቀቶች እና OmniRoute ራሱ
  ከጥራት ማረጋገጫ የሚያመነጨው `502` — ትክክለኛውን
  የአቅራቢ/ግንኙነት/ሞዴል ጥምረት ብቻ ይቆልፋል። በአንድ ሞዴል ላይ ያለ መጥፎ ዥረት
  ስለ መለያው ኮታ ማስረጃ አይደለም፤ ከዚህ ደንብ በፊት በ
  `codex/gpt-5.6-luna` ላይ ያለ አንድ ባዶ ምላሽ የዚያን ግንኙነት እያንዳንዱን `gpt-5*` ሞዴል
  ከማዘዋወር ለ2–30 ደቂቃ (እየጨመረ) ያስወግድ ነበር፣ ኮታው ግን ሳይነካ ይቀር ነበር።
- የጠሪው ግልጽ `scope` አማራጭ ሁልጊዜ ቅድሚያ ያገኛል (Antigravity `"exact"`ን ያስተላልፋል)።

**ዓላማ:** አንድ ሞዴል ብቻ በማይገኝበት ወይም ኮታው በተገደበበት ጊዜ ሙሉ ግንኙነትን ከማሰናከል መቆጠብ።

**ምሳሌዎች:**

- የ429 ምላሽ የሚመልሱ በየሞዴሉ ኮታ ያላቸው አቅራቢዎች
- ላልተገኘ አንድ ሞዴል 404 የሚመልሱ አካባቢያዊ አቅራቢዎች
- ለአቅራቢው የተለዩ የሁነታ/ሞዴል ፈቃድ ውድቀቶች (ለምሳሌ፣ Grok ሁነታዎች)

**ትግበራ:** `open-sse/services/accountFallback.ts` — `lockModel()`፣ `clearModelLock()`፣ `getAllModelLockouts()`።

### የሞዴል ማቀዝቀዣዎች ዳሽቦርድ (v3.8.0)

የተጠቃሚ በይነገጽ: ቅንብሮች → የሞዴል ማቀዝቀዣዎች (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ንቁ መቆለፊያዎችን ከሚከተሉት ጋር ይዘረዝራል: አቅራቢ፣ ግንኙነት፣ ሞዴል፣ ምክንያት፣ expiresAt። ኦፕሬተሮች ከካርዱ ላይ ሞዴልን በእጅ ዳግም ማንቃት ይችላሉ።

**REST API:**

- `GET /api/resilience/model-cooldowns` — ንቁ መቆለፊያዎችን ይዘረዝራል
- `DELETE /api/resilience/model-cooldowns` — በእጅ ዳግም ማንቃት። የጥያቄ ይዘት: `{provider, connection, model}`። ማረጋገጫ: አስተዳደር።

### የመቆለፊያ ቅንብሮች የተጠቃሚ በይነገጽ + በስኬት-መቀነስ የሚደረግ መልሶ ማገገም (v3.8.23)

የሞዴል መቆለፊያ ሁልጊዜ ከሚሠራ በኮድ ውስጥ በቀጥታ ከተቀመጠ ባህሪ ወደ ሙሉ በሙሉ ሊዋቀር የሚችል፣
በምርጫ የሚነቃ ባህሪ፣ የራሱ የቅንብሮች ካርድ እና ራሱን የሚያስተካክል የመልሶ ማገገሚያ መንገድ ወዳለው ተቀይሯል።

**የቅንብሮች ካርድ:** ቅንብሮች → የሞዴል መቆለፊያ
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)።
ይህ ከላይ ካለው ለንባብ ብቻ ከሆነው `ModelCooldownsCard` (**ንቁ መቆለፊያዎችን
_ብቻ ከሚዘረዝር_) የተለየ ነው — አዲሱ ካርድ _መለኪያዎቹን ያዋቅራል_። ነባሪዎቹ
በ `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ውስጥ ይገኛሉ:

| ቅንብር                    | ነባሪ                              | ትርጉም                                              |
| ----------------------- | -------------------------------- | ------------------------------------------------- |
| `enabled`               | `false`                          | ዋና ማብሪያ/ማጥፊያ — የሞዴል መቆለፊያ **በነባሪ ጠፍቷል**።          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | በሞዴል ወሰን ውስጥ እንደ ውድቀት የሚቆጠሩ የላይኛው ምንጭ ሁኔታዎች።      |
| `baseCooldownMs`        | `120_000` (120 ሰከንድ)             | ለመጀመሪያው ውድቀት የመነሻ መቆለፊያ ቆይታ።                      |
| `maxCooldownMs`         | `1_800_000` (30 ደቂቃ)             | እየጨመረ በሚሄደው የማቀዝቀዣ ጊዜ ላይ የተቀመጠ ከፍተኛ ገደብ።          |
| `maxBackoffSteps`       | `10`                             | ከፍተኛው የኤክስፖነንሻል-መዘግየት መጨመሪያ ደረጃዎች ብዛት።            |
| `useExponentialBackoff` | `true`                           | ተደጋጋሚ ውድቀቶች የማቀዝቀዣ ጊዜውን በኤክስፖነንሻል ሁኔታ ያሳድጉ እንደሆነ። |

ቅንብሮች በመደበኛው የቅንብሮች ማከማቻ በኩል በቋሚነት ይቀመጣሉ እና በ
የጽናት ቅንብሮች ንድፍ በኩል ይረጋገጣሉ፤ ካርዱ `baseCooldownMs`/`maxCooldownMs`ን
(`maxCooldownMs ≥ baseCooldownMs` በሆነ መልኩ) እና `maxBackoffSteps`ን በወሰን ውስጥ ያደርጋል።

**በስኬት-መቀነስ የሚደረግ መልሶ ማገገም:** መልሶ ማገገም የሰዓት ቆጣሪው በማለቁ **ብቻ** አይደለም። ጤናማ
ምላሽ የሞዴሉን የውድቀት ብዛት ቀስ በቀስ ወደ ታች ይመልሰዋል፣ በዚህም በጊዜ መስኮቱ መካከል ያገገመ ሞዴል
የሰዓት ቆጣሪው ከማለቁ በፊት መጨመሩን ያቆማል (እና ይጸዳል)። በተሳካ የጥምረት
ዒላማ ላይ፣ `open-sse/services/combo.ts` `decayModelFailureCount()`ን
(`open-sse/services/accountFallback.ts`) ይጠራል፤ ይህም የተከማቸውን
`failureCount` **በግማሽ ይቀንሳል** (`Math.floor(failureCount / 2)`)፤ ወደ `0` ሲደርስ የመቆለፊያ
መዝገቡ ሙሉ በሙሉ ይሰረዛል። ተጓዳኙ `recordModelLockoutFailure()`
በመጨመሪያ ጊዜ መስኮቱ ውስጥ ውድቀቶች ሲከሰቱ ብዛቱን ይጨምራል (እና የማቀዝቀዣ ጊዜውን ያሳድጋል)።
ይህ በስኬት-መቀነስ የሚደረግ መልሶ ማገገም ከመደበኛው የሰዓት ቆጣሪ ማብቃት በተጨማሪ ነው —
ከሁለቱ ማንኛውም መንገድ ሞዴልን ዳግም ማንቃት ይችላል።

**ሁኔታ:** መቆለፊያዎች **በማህደረ ትውስታ ውስጥ** ይያዛሉ (በእያንዳንዱ ሂደት `Map`ዎች፣
በ `provider:connectionId:model` የተቆለፉ `ModelLockoutEntry`፣ ትክክለኛ-ወሰን መቆለፊያዎች በ
`provider:connectionId:exact:model` የተቆለፉ)፣ በ
DB ውስጥ በቋሚነት አይቀመጡም — ዳግም ሲነሳ ይጠፋሉ። _ቅንብሮቹ_ በቋሚነት ይቀመጣሉ፤ ንቁው
የመቆለፊያ _ሁኔታ_ ጊዜያዊ ነው።

---

## 4. የኮታ-መጋራት ተመሳሳይ-ጊዜ መቆጣጠሪያ (v3.8.36)

የደንበኝነት ምዝገባ መለያዎች (GLM፣ MiniMax፣ ወዘተ.) ብዙውን ጊዜ በተመሳሳይ ጊዜ ~1–3 ጥያቄዎችን ብቻ ይቀበላሉ፤ ይህን ማለፍ 429 ስህተቶችን እና የማቀዝቀዣ ጊዜዎችን ያስነሳል። ይህ በተለይ
በ**quota-share** (`qtSd/…`) ጥምረቶች ሥር ከባድ ነው፤ በዚያም በርካታ API ቁልፎች አንድ upstream
መለያ ይጋራሉ። ሦስት ንብርብሮች የጋራ መለያው በጥያቄዎች እንዳይጥለቀለቅ ያደርጋሉ።

### የእያንዳንዱ ግንኙነት ተመሳሳይ-ጊዜ ገደብ (`max_concurrent`)

እያንዳንዱ የአቅራቢ ግንኙነት የ`max_concurrent` ጣሪያ ሊያውጅ ይችላል
(`provider_connections.max_concurrent`፣ በግንኙነት modal / API / DB ውስጥ የሚዋቀር)።
ገደብ እንዳይኖር ባዶውን ይተዉት። ይህ ከታች ያለውን የተከታታይ አፈጻጸም
ንብርብር የሚቆጣጠረው ብቸኛ ቅንብር ነው — ወደ መለያው ትክክለኛ የተመሳሳይ-ጊዜ አቅም ያዋቅሩት (ለምሳሌ GLM ~1፣ MiniMax ~2)።

### የኮታ-መጋራት ጥያቄዎችን በተከታታይ ማስኬድ

የquota-share ማሰራጨት አዎንታዊ `max_concurrent` ያወጀ ግንኙነትን ሲያነጣጥር፣ ወደዚያ **መለያ** የሚላኩ ተመሳሳይ-ጊዜ ጥያቄዎች በየግንኙነቱ semaphore (ቁልፍ `qsconn:<connectionId>`) በኩል በተከታታይ ይሰራሉ፦ ትርፍ ጥያቄዎች መለያውን ከማጥለቅለቅ ይልቅ **በወረፋው ውስጥ ይጠብቃሉ**። ይህ **fail-open** ነው — የተሞላ ወረፋ ወይም timeout ሊሰራጭ የሚችልን ጥያቄ ከመከልከል ይልቅ ያለ slot እንዲቀጥል ያደርጋል። በ**Settings → Resilience → Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`፣ በነባሪ በርቷል) ውስጥ ያብሩት ወይም ያጥፉት። ያለ `max_concurrent` ገደብ ባህሪው አይለወጥም።

> የquota-share ማስተላለፊያ በር (`selectQuotaShareTarget`፣ DRR + P2C) ራሱ
> fail-open ሲሆን፣ ገደቡ ላይ ያለን ግንኙነት _ቅድሚያውን ብቻ ይቀንሳል_ — አንድ ግንኙነት ብቻ ባለው pool ውስጥ ጥብቅ ገደብ ማድረግ አይችልም፤ ስለዚህ ጎርፉን በተግባር የሚቆጣጠረው ይህ semaphore ነው።

### የCombo cooldown ንቁ ዳግም ሙከራ

ለእያንዳንዱ combo ስትራቴጂ (ሲነቃ)፣ ለአጭር ጊዜያዊ cooldown የ429 ስህተትን የሚያረጋግጥ ጥያቄ 429ን ከመመለስ ይልቅ የcooldown ጊዜው እስኪያልፍ ይጠብቅና እንደገና ይሰራጫል — ይህ በባለብዙ-model combos ላይ ያሉ Gemini-class TPM/RPM መስኮቶችን (~60s retry-after) ይሸፍናል፤ ለምሳሌ የ2-model combo ሁለቱም ዒላማዎች በእያንዳንዱ model የፍጥነት ገደብ ላይ ሲደርሱ። ይህ በ**Settings → Resilience** ውስጥ ባለው `comboCooldownWait` (`enabled`፣ `maxWaitMs`፣ `maxAttempts`፣ `budgetMs`) የተገደበ ነው። ለ`quota_exhausted` (እስከ እኩለ ሌሊት የተቆለፈ) ወይም ከauth/not-found ጋር የተያያዙ ምክንያቶች ፈጽሞ አይጠብቅም።

---

## 5. የጥያቄ ወረፋ መግቢያ ቁጥጥር (v3.8.49 · issue #6593)

**ወሰን**፦ የአካባቢው፣ ለእያንዳንዱ provider+connection የተለየ የፍጥነት-ገደብ ወረፋ (`open-sse/services/rateLimitManager.ts`፣
በBottleneck የሚደገፍ)፤ ከላይ ካሉት ሦስት ዘዴዎች አንድ ደረጃ በታች።

**`maxWaitMs` የወረፋ ጥበቃን ይገድባል፤ `executionMaxWaitMs` ደግሞ አፈጻጸምን ይገድባል።**
ሁለቱ ሆን ተብለው የተለያዩ ናቸው፣ አንዳቸውም ለሌላው ግብዓት አይሆንም።

`resilienceSettings.requestQueue.maxWaitMs` **የወረፋ-ጥበቃ በጀት** ነው፦
የprovider ቦታ እስኪገኝ መጠበቅን እና ከዚያ QUEUED ሁኔታ ውስጥ መቆየትን ያካትታል፤ ሥራው
ከQUEUED ወጥቶ መፈጸም በጀመረበት ቅጽበት የጊዜ ቆጣሪው ይሰረዛል
(`rateLimitManager.ts`፣ `wrappedFn`)። ይህን ጊዜ ያለፈ ጥያቄ
ወደ upstream ፈጽሞ አይደርስም። ነባሪው 30000ms ሲሆን፣
በ`src/lib/resilience/settings.ts` ውስጥ ባለው `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ይቀርባል እና በ`tests/unit/ratelimit-admission-control-6593.test.ts`
ተወስኖ ተቀምጧል፤ ስለዚህ በእሱ ላይ የሚደረግ ለውጥ ይህ አንቀጽ ሳይታወቅ ጊዜ ያለፈበት ሆኖ እንዲቀር ከማድረግ ይልቅ
ያንን ሙከራ ያሳክታል።

`resilienceSettings.requestQueue.executionMaxWaitMs` Bottleneck
እንደ ሥራ `expiration` የሚቀበለው ሲሆን፣ የጊዜ ቆጣሪው መላክ ከተከናወነ በኋላ ብቻ ይጀምራል። የራሳቸው
upstream timeout ለሌላቸው executors የመጨረሻ መከላከያ ነው፤ የexecutor የራሱ fetch-start timeout ከዚህ የሚረዝም ከሆነም
ወደዚያ ጊዜ ይጨመራል፣ ስለዚህ ጤናማ እና በሂደት ላይ ያለ ምላሽን ሊያቋርጥ አይችልም። ነባሪው 600000ms (10 ደቂቃ) ነው።

የወረፋውን በጀት ወደ `expiration` ማስገባት ቀደም ሲል non-incremental
gatewaysን በሥራ መካከል ይገድል የነበረው ነው — የመጀመሪያዎቹ ባይቶች ከመምጣታቸው በፊት ለደቂቃዎች መሥራታቸው ትክክለኛ ነው —
እናም expiration እንደ `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) የሚቀርበው፣ የወረፋው በጀት ደግሞ
የqueue-timeout codeን የሚይዘው በዚህ ምክንያት ነው። አንዳቸውንም በ`RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ወይም በdashboard
(**Settings → Resilience**) በኩል ይቀይሩ። ሁለቱም መደበኛ ሲደረጉ በ1ms–24h መካከል ይገደባሉ።

**ለሁለቱም የቅድሚያ ቅደም ተከተል፦** env var የሚያቀርበው _ነባሪውን_ ብቻ ነው።
በ`resilienceSettings.requestQueue` ውስጥ በቋሚነት የተቀመጠ እሴት (dashboard / API patch፣
በ`key_value` ውስጥ የተከማቸ) ከእሱ ቅድሚያ ያገኛል፤ እና ለእያንዳንዱ connection የተወሰነ
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ከዚያም ቅድሚያ ያገኛል። ስለዚህ
አስቀድሞ በቋሚነት የተቀመጠ እሴት ባለው deployment ላይ env varን ማቀናበር
ምንም ነገር አይቀይርም — በምትኩ በቋሚነት የተቀመጠውን ቅንብር ያጽዱ ወይም ያዘምኑ።

በወረፋ ውስጥ የመቆያ ጊዜ በ`maxWaitMs` ይገደባል፤ ከታች ያለው `maxQueueDepth` ደግሞ
በአንድ ጊዜ ስንት ጠሪዎች በወረፋ ሊቆዩ እንደሚችሉ ይገድባል።

**`maxQueueDepth` — በምርጫ የሚነቃ የመግቢያ ገደብ (አዲስ)።** `resilienceSettings.requestQueue.maxQueueDepth`
ለአንድ provider+connection በአንድ ጊዜ ስንት ጥያቄዎች በወረፋ ሊቆዩ (ገና ሳይላኩ) እንደሚችሉ
ይገድባል። ወረፋው አስቀድሞ `maxQueueDepth`
ጥያቄዎችን ይዞ ሲገኝ፣ አዲስ ጥያቄ እስከ `limiter.schedule()` ከመድረሱ **በፊት**
typed `code: "RATE_LIMIT_QUEUE_FULL"` error በመስጠት ወዲያውኑ ውድቅ ይደረጋል —
ስለዚህ ውድቅ ማድረጉ አነስተኛ ወጪ ያለው ሲሆን፣ ለዚያ ጥያቄ ማንኛውም downstream
prompt-compression / translation ሥራ ከመከናወኑ በፊት ይፈጸማል። ነባሪው `0` =
የተሰናከለ ሲሆን፣ ነባሩን ገደብ-የለሽ የወረፋ ባህሪ ይጠብቃል፤ በ0–100000 መካከል ይገደባል።
በ`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ወይም
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) በኩል ይቀይሩ።

የመግቢያ ፍተሻው ራሱ pure function ነው
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`)፣ ስለዚህ
እውነተኛ Bottleneck limiter ሳያስፈልግ በunit test መፈተሽ ይቻላል።

> #6593ን የከፈተው RFC የ`bypassCompressionOnRateLimit`
> flagንም አቅርቦ ነበር። የዚህ repo `open-sse/services/compression/` pipeline
> በወጪው LLM ጥያቄ ላይ የሚከናወን prompt/context compression ነው (`chatCore.ts`፣
> በ`resolveCompressionSettings`/`selectCompressionStrategy` block አካባቢ)፤
> በተፈጠሩ 429 bodies ላይ የሚከናወን HTTP response compression አይደለም — ለቀጥተኛ bypass flag
> የሚዛመድ code path የለም። ያ የprompt-compression ደረጃም
> በአሁኑ ጊዜ በጥያቄ pipeline ውስጥ ከ`withRateLimit()` _በፊት_ ይሠራል፤ ስለዚህ
> queue-full በሚል ውድቅ ሲደረግ እሱን ለመዝለል ቅደም ተከተሉን መቀየር፣ ከዚህ issue ወሰን የተለየና ትልቅ
> ለውጥ ነው፤ ሆን ተብሎ **እዚህ አልተተገበረም**፣ እና የCPU ቁጠባው ጥቅም
> የቅደም ተከተል መቀየሩን ስጋት የሚያዋጣ ከሆነ እንደ follow-up ተትቷል።

---

## 6. የዝግተኛ ዥረት የውጤት መጠን ተቆጣጣሪ (#9709)

አማራጭ የሆነው `resilienceSettings.streamRecovery.throughputWatchdog` ጥበቃ፣
አሁንም chunks እየላከ ነገር ግን ከተዋቀረው ጠቃሚ የውጤት መጠን በታች የረዳት ውጤት
እያመነጨ ያለ upstream ይለያል። ይህ ሆን ተብሎ ከidle timeout የተለየ ነው፦
heartbeats እና metadata የትኛውንም timer ዳግም አያስጀምሩም፣ እንደ እድገትም
አይቆጠሩም። የውጤት ጥራት ምንም ይሁን ምን ፍጹም የደህንነት ጣሪያ ሆኖ
ከሚቆየው hard attempt deadline (#9153) ጋርም የተለየ ነው።

watchdog ማቋረጥ ከመቻሉ በፊት የማሟሟቂያ ጊዜ እና ከዚያ በኋላ ሙሉ rolling window
ያስፈልገዋል። ከChat Completions እና Responses API የውጤት ክስተቶች የሚመጡ
የጽሑፍ deltas ይቆጥራል (ጥንቃቄ የተደረገበት የUTF-8 byte ግምታዊ መለኪያ)፣
usage-only እና ባዶ ክስተቶችን ችላ ይላል፣ እንዲሁም tool-call ወይም reasoning
ክስተቶች በሂደት ላይ ሳሉ ግምገማውን ያቆማል። በነባሪነት ተሰናክሏል እና
በ`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ማንቃት ይቻላል፤ window፣
warm-up፣ ዝቅተኛው rate እና ሊለካ የሚችለው ዝቅተኛ ውጤት በመደበኛው
resilience-settings normalization layer ገደብ ውስጥ ይቀመጣሉ።

ሲነቃ፣ የwatchdog ማቋረጥ ተግባራዊ የሚሆነው ንቁ በሆነው upstream attempt ላይ
ብቻ ነው። ማንኛውም client-visible bytes ከመላካቸው በፊት፣ ነባሩ
same-account early-recovery path attemptን እንደገና ሊከፍት ይችላል። commit ከተደረገ
በኋላ ዥረቱ ያለጥንቃቄ በድጋሚ አይጫወትም፤ suffixን ማገናኘት የሚችለው ነባሩ
ደህንነቱ የተጠበቀ mid-stream continuation contract ብቻ ነው። Finalization
አንድ ጊዜ ብቻ የሚከናወን ሆኖ ይቀጥላል፣ ስለዚህ usage accounting እና semaphore
release አይደጋገሙም።

---

## 7. የUpstream ሁኔታ ዳግም መግለጫ (በስህተት የተገለጹ የኮታ ስህተቶች)

**ወሰን፦** ጊዜያዊ የኮታ መሟጠጥን በተሳሳተ HTTP status የሚዘግብ አንድ upstream gateway።

**ዓላማ፦** downstream ተጠቃሚዎች (fallback engine፣ combo aggregation፣ ለclient የሚታየው response) የውድቀቱን እውነተኛ እንደገና ሊሞከር የሚችል ባህሪ እንዲያዩ፣ ከclassification በፊት አሳሳች statusን ማረም።

አንዳንድ gateways ጊዜያዊ የኮታ መሟጠጥን እንደገና ሊሞከር በማይችል HTTP
status ያመለክታሉ። `agentrouter.org` ከመደበኛው `429` ይልቅ `403` (አንዳንድ ጊዜ
`400`) ከቻይንኛ body (`用户额度不足` / `额度不足`) ጋር ይመልሳል። እንደ Claude
Code ያሉ clients `403`ን እንደ ቋሚ ውድቀት በመቁጠር sessionን ያቋርጣሉ፣ እና
እርማት ከሌለ fallback engine እንደ የኮታ ክስተት ሳይሆን እንደ `AUTH_ERROR`
ይመድበዋል።

**አተገባበር፦**

- Registry + matcher፦ `open-sse/config/upstreamStatusRestatement.ts` — ለእያንዳንዱ
  provider የሚዘጋጅ የሕጎች ዝርዝር (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)፣ በ`applyStatusRestatement()` በኩል የሚዛመድ።
- የጥሪ ቦታ፦ በ`open-sse/handlers/chatCore.ts` ውስጥ ያለው `providerFailure:` block
  (በመስመር 3654 አካባቢ)፣ `parseUpstreamError()` የerror HTTP status ያለውን upstream
  response (`!providerResponse.ok`) ከተነተነ ወዲያውኑ እና ማንኛውም
  classification ከመካሄዱ በፊት፣ ይህም እያንዳንዱ downstream ተጠቃሚ የታረመውን
  status እንዲያይ ያደርጋል። በ`200` SSE stream ውስጥ የተካተቱ ስህተቶች የተለየ፣
  በኋላ የሚከናወን stream-parsing pathን ይከተላሉ እና በአሁኑ ጊዜ በዚህ hook
  **አይሸፈኑም** — ይህ የታወቀ ገደብ ነው፣ ነገር ግን እንደ error HTTP status
  ለሚታየው የagentrouter misstatus እስካሁን አላስፈለገም።
- እንደገና የመሞከር ብቁነት፦ `429` በ`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) ውስጥ ስላለ፣ እንደገና የተገለጸ
  error እንደ የማይሰራ `403` ከመታየት ይልቅ እውነተኛ የretry window ይይዛል።
- ሰው ሠራሹ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  እንደገና የተገለጸው response ለ**client** የሚነግረው ብቻ ነው፤ ይህ ራሱ
  የconnectionው ውስጣዊ cooldown/lockout ጊዜ አይደለም — ያንን የሚወስነው
  እንደገና የተገለጸውን error በተግባር የሚያስተናግደው የተለየ mechanism ነው
  (የConnection Cooldown እየጨመረ የሚሄድ backoff፣ §2፣ ለAPI-key providers
  መሠረታዊ `3s`፤ ወይም እንደ agentrouter ላሉ per-model-quota providers የModel
  Lockout፣ §3)። router ለclient ከሚያሳውቀው የ60s window ቀደም ብሎ በውስጥ
  እንደገና ለመሞከር ብቁ ሊሆን ይችላል — ይህ ሆን ተብሎ የተቀመጠ headroom ነው
  እንጂ bug አይደለም።

ቋሚ ስህተቶች (የagentrouter `无权访问模型` — ይህን ሞዴል የመድረስ ፈቃድ የለም)
በፍጹም እንደገና አይገለጹም፦ `textMarkers` ቢዛመዱም `excludeMarkers` ሕጉን
ውድቅ ያደርገዋል፣ ስለዚህ error የመጀመሪያ statusን ይዞ ይቆያል እና ምንም ነገር
ለዘላለም እንደገና አይሞክረውም። የሚዛመደው provider classification rule
(`agentrouter-model-access-denied` በ`open-sse/config/providerErrorRules.ts` ውስጥ፦
`reason: "auth_error"`፣ `scope: "model"`፣ የታወጀ `6h` base cooldown)
በ`checkFallbackError` (`open-sse/services/accountFallback.ts`) የሚፈተሸው
ከአጠቃላይ apikey-category `FORBIDDEN` early-return _በፊት_ ሲሆን፣
በ`honorsRuleLockScope(provider)` የተገደበ ነው (#10334 — በአሁኑ ጊዜ
በ`providerErrorRules.ts` ውስጥ ባለው `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist
አማካኝነት ለagentrouter ብቻ የተወሰነ)። ሕጉ ያወጀው የ6h cooldown
እንደ `fallbackResult.baseCooldownMs` ሙሉ በሙሉ ይተላለፋል፣ ነገር ግን አሁንም
ቀድሞ የነበረውን per-model-quota lockout path (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`፣ ከcooldown source በስተቀር በ#10334 ያልተለወጠ)
ይጠቀማል፦ እንደ ማንኛውም ሌላ model lockout ወደ operatorው
`mlSettings.maxCooldownMs` (ነባሪ `1_800_000ms` / 30min) ዝቅ ተደርጎ ይገደባል፣
እና _የሚቀመጠው lockout reason_ የሕጉ `"auth_error"` ሳይሆን ቀድሞ የነበረው
hardcoded `"forbidden"` ሆኖ ይቆያል — ከጫፍ እስከ ጫፍ የሚከበረው የcooldown
ቆይታ ብቻ ነው፣ reason string አይደለም። connectionው ራሱ ንቁ ሆኖ ይቆያል፤
በተመሳሳይ connection ላይ ያሉ sibling models አይጎዱም።

በድጋሚ የተገለጹ የኮታ ስህተቶች (`额度不足`) በምርት አካባቢ የአቅራቢ ደንብ ላይ ይደርሳሉ
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`፣ የራሱ የሆነ የተገለጸ የማቀዝቀዣ ጊዜ የለውም — የማከማቻ ንብርብሩ
ተመጣጣኝ የbackoff ነባሪ ቅንብር ተግባራዊ ይሆናል)። ከ#10334 ጀምሮ፣ በ
`ProviderErrorRuleMatch` ላይ ያለው `scope` ከጫፍ እስከ ጫፍ ጥቅም ላይ ይውላል፣ ነገር ግን **በ**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ፈቃድ ዝርዝር ውስጥ ላሉ አቅራቢዎች ብቻ ነው
(`providerErrorRules.ts` — በአሁኑ ጊዜ `"agentrouter"` ብቻ፣ በ
`honorsRuleLockScope()` የተገደበ)። ለሌሎች አቅራቢዎች በሙሉ
`scope` ልክ ከ#10334 በፊት እንደነበረው መረጃ ሰጪ ብቻ ሆኖ ይቀራል።
`checkFallbackError` የተዛመደውን ደንብ ወሰን እንደ
`fallbackResult.ruleScope` ያቀርባል፤ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) አንድ `ruleScope` በእውነት በግንኙነት ደረጃ
ተፈጻሚ እና ራሱን የሚያገግም ምልክት እንደሆነ ማክበር ደህንነቱ የተጠበቀ
መሆኑን የሚያረጋግጥ የጋራ guard ነው (`scope` `"connection"`፣ reason
`quota_exhausted`፣ ፈጽሞ `permanent` ያልሆነ፣ ፈጽሞ `creditsExhausted`
ያልሆነ — ወደፊት አንድ ደንብ `scope` `"connection"`ን ከቋሚ የመለያ ሁኔታ
ጋር እንዳያጣምር መከላከያ ነው)። ሁለት ተጠቃሚዎች ይጠሩታል፦

- **ማከማቻ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`)፦
  ወደ passthrough-provider **በእያንዳንዱ ሞዴል** የመቆለፊያ
  ቅርንጫፍ ከመውደቅ ይልቅ (agentrouter `passthroughModels: true` ነው → `hasPerModelQuota()`
  `true` ይመልሳል)፣ **ጊዜያዊ የግንኙነት ማቀዝቀዣ ጊዜ** ተግባራዊ ያደርጋል —
  `testStatus: "unavailable"` + `rateLimitedUntil`፣ ፈጽሞ የመጨረሻ ሁኔታ
  (`credits_exhausted`/`banned`/`expired`) አይደለም — ስለዚህ ግንኙነቱ
  በእጅ የማረጋገጫ መረጃ ዳግም እንዲቀናበር ሳያስፈልገው የማቀዝቀዣው ጊዜ
  ሲያበቃ በራሱ ያገግማል። `disableCooling: true` ላላቸው ግንኙነቶች
  ይዘለላል (#2997)፦ ያ የመርጦ መውጣት በምትኩ ወደ በእያንዳንዱ ሞዴል
  መቆለፊያ ይወርዳል (በሰነድ የተገለጸ የጥቅምና ጉዳት ሚዛን ነው —
  ከቅርንጫፉ በላይ ያለውን የኮድ አስተያየት ይመልከቱ)።
- **በተመሳሳይ ጥያቄ ውስጥ የcombo ማስተላለፊያ** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`)፦ ያው guard ግንኙነቱን
  `${provider}:${connectionId}` ቁልፍ ተጠቅሞ በማህደረ ትውስታ ውስጥ ባለው
  `exhaustedConnections` set ላይ ምልክት ያደርግበታል። ይህ የሚዘለው ቀሪ
  የተመሳሳይ-ጥያቄ ዒላማ፣ _ዒላማው ራሱ ያንኑ `connectionId` በራሱ_
  የዒላማ ነገር ላይ አስቀድሞ የያዘ ከሆነ ብቻ ነው (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`፣ ከ`exhaustedConnections`
  lookup በፊት `if (provider &&
connectionId)`) — የተለመደ የሞዴል-ዝርዝር combo፣ ወንድም ዒላማዎቹ የራሳቸው የተሰካ
  `connectionId` የሌላቸውበት እና አንዱ ከምላሹ
  `X-OmniRoute-Selected-Connection-Id` header በእያንዳንዱ dispatch ወቅት ብቻ
  የሚወሰንበት፣ ያንን የቁልፍ መዛመድ ፈጽሞ አያገኝም። ለዚያ የተለመደ
  ሁኔታ፣ አንድ ቀሪ leg አሁን ያለቀበትን መለያ እንዳይጠቀም የሚያደርገው
  እውነተኛ ጥበቃ ይህ Set **አይደለም** — ከላይ ያለው የማከማቻ ንብርብር
  (የግንኙነቱ `rateLimitedUntil` አሁን ወደፊት ላይ ነው) ከዚሁ guard ጋር
  ተጣምሮ ለውድቀቱ `transientRateLimitedProviders`ን መጨቆኑ ነው
  ("ባለሁለት-ደረጃ ንድፍ" እና በ`targetExhaustion.ts` ውስጥ ባለው
  `isAgentrouterConnectionQuotaScope` ቅርንጫፍ ላይ ያለውን የኮድ አስተያየት
  ይመልከቱ)፦ ያ Set ምልክት ሳይደረግበት ሲቀር፣ የ`combo.ts`
  `allowRateLimitedConnection` የግዳጅ-ፍቀድ (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`) ለቀሪዎቹ የአቅራቢው legs **አይ**ነሳም፣ ስለዚህ የማረጋገጫ
  መረጃ ምርጫው `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`)
  በተለመደው ሁኔታ ይከበራል፣ እና ቀሪው leg የተለየ፣ አሁንም ብቁ የሆነ
  agentrouter ግንኙነት ይመርጣል ወይም ምንም የማረጋገጫ መረጃ ሳይገኝ
  ይወድቃል — ይህ ቅርንጫፍ አሁን ወደ አቀዘቀዘው ግንኙነት በግድ
  ተመልሶ አይገባም።

### ባለሁለት-ደረጃ ንድፍ፦ የሁኔታ ዳግም መግለጫ፣ ከዚያም ምደባ

የሁኔታ ዳግም መግለጫ (`upstreamStatusRestatement.ts`) እና የአቅራቢ
ምደባ ደንቦች (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ሁለቱም በአቅራቢ id እና በጽሑፍ ምልክቶች ቁልፍ
የሚያደርጉ የተለያዩ registries ናቸው፣ ነገር ግን በተለያዩ ቦታዎች
ይሰራሉ እና የተለያዩ ዓላማዎችን ያገለግላሉ፦ restatement በ`chatCore.ts`
ውስጥ ቀደም ብሎ የHTTP ሁኔታውን እንደገና ይጽፋል፤ የምደባ ደንቦች
ደግሞ በ`checkFallbackError()` ውስጥ የfallback `reason`ን እና የመቆለፊያ
`scope`ን (`model` / `provider` / `connection`) ይመርጣሉ
(`open-sse/services/accountFallback.ts`)።

የምደባ ደንቦች ሙሉ የስህተት **ጽሑፍ**ን (እንደ `额度不足` ያሉ
የbody ምልክቶችን ለማዛመድ የሚያስፈልገው) የሚያዩት በ
`providerErrorRules.ts` ውስጥ ባለው `FULL_TEXT_RULE_PROVIDERS`
ፈቃድ ዝርዝር ውስጥ ላሉ አቅራቢዎች ብቻ ነው — በአሁኑ ጊዜ
`"agentrouter"` ብቻ። ለሁሉም ሌሎች **አብሮገነብ ካታሎግ** አቅራቢዎች፣
`checkFallbackError` ለ`getProviderErrorRuleMatch` የሚያስተላልፈው
የተዋቀረውን ስህተት (`{code, type}`) ብቻ ነው፣ ይህም በ
header/status/code ላይ ለተመሰረቱ ደንቦች በቂ ቢሆንም የbody-ጽሑፍ
ምልክቶችን ማየት አይችልም። `resolveRuleMatchBody()` helper ይህን ምርጫ
ያከናውናል፦ በፈቃድ ዝርዝሩ ውስጥ ላሉ አቅራቢዎች ሙሉ የስህተት
ጽሑፍ፣ ካልሆነ የተዋቀረው ስህተት። አንድ **አብሮገነብ** አቅራቢን ወደ
`FULL_TEXT_RULE_PROVIDERS` ማከል ግልጽ የበእያንዳንዱ-አቅራቢ opt-in
ነው — ይህ የሚኖረው በዝርዝሩ ላይ ላልሆነ እያንዳንዱ አቅራቢ
ነባሪው መንገድ ባይት-በ-ባይት ሳይቀየር እንዲቆይ ነው።

የአንድ ደንብ `scope` (`model` / `provider` / `connection`) ከ
`FULL_TEXT_RULE_PROVIDERS` የተለየ opt-in ነው፦ `checkFallbackError`
ይህን እንደ `fallbackResult.ruleScope` ብቻ ያቀርበዋል፣ እና downstream
ተጠቃሚዎች በዚሁ ፋይል ውስጥ ባለው
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ፈቃድ ዝርዝር ውስጥ ላሉ አቅራቢዎች
ብቻ፣ ከመረጃ ሰጪ መለያ የተለየ ነገር እንደሆነ ያከብሩታል (`በ
honorsRuleLockScope()` የተገደበ — በአሁኑ ጊዜ `"agentrouter"` ብቻ)።
አንድ አቅራቢ በዚያ ፈቃድ ዝርዝር ላይ ከገባ በኋላ የ
`scope: "connection"` መዛመድ በትክክል ምን እንደሚያደርግ ለማየት
ከላይ ያለውን "በድጋሚ የተገለጹ የኮታ ስህተቶች" ይመልከቱ።

**#11104 — በኦፕሬተር የታወጁ ደንቦች ሁለቱንም የፍቃድ ዝርዝሮች ያልፋሉ።** አንድ ኦፕሬተር
ይህን ፋይል ሳያርትዕ በሩጫ ጊዜ በ`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
አማካኝነት ለእያንዳንዱ አቅራቢ ደንብ ማወጅ ይችላል። የኦፕሬተር ደንብን በ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — አብሮ የተሰሩ
የካታሎግ ደንቦችን **ነባሪ** ባህሪ ለመጠበቅ በታሰቡ የፍቃድ ዝርዝሮች —
ጀርባ መገደብ፣ ደንቡን ማወጅ ራሱ የኦፕሬተሩ ግልጽ የመርጦ መግባት
ውሳኔ ስለሆነ፣ ቀድሞውኑ በዚያ ከተዘረዘሩት በስተቀር ለሁሉም
አቅራቢዎች የቅንብሮቹን ስልት የማይሰራ ያደርገዋል። `resolveRuleMatchBody()`
እና `honorsRuleLockScope()` ሁለቱም መጀመሪያ
`hasOperatorRuleForProvider()`ን ይፈትሻሉ፦ የኦፕሬተር ደንብ ያለው
አቅራቢ፣ በሁለቱ የፍቃድ ዝርዝሮች ውስጥ ቢኖርም ባይኖርም፣
ጥሬውን የስህተት ጽሑፍ ያገኛል እና ያወጀው `scope` ይከበርለታል።

**የሚታወቅ ክፍተት — `providerRuleRegistry` ለHTTP 400 ፈጽሞ አይመከርም።**
የ`checkFallbackError` `BAD_REQUEST` ቅርንጫፍ ሁኔታ 400ን ሙሉ በሙሉ
በራሱ የስርዓተ-ጥለት ድርድሮች (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`፣ ወዘተ በ`accountFallback.ts`) ይመድባል፣ እና
ከእሱ በላይ ያለው የ`configuredRule`/`getProviderErrorRuleMatch` ቅርንጫፍ
ከመድረሱ በፊት ይመለሳል። `status: 400` ያለው አብሮ የተሰራ የካታሎግ
ደንብ (ወይም የኦፕሬተር ደንብ) በአገባብ ትክክለኛ ቢሆንም ፈጽሞ
አይተገበርም። በአሁኑ ጊዜ 400ን የሚያነጣጥር ነባር ደንብ የለም፣
ስለዚህ በምርት አካባቢ ምንም ነገር አልተጎዳም — ነገር ግን ወደፊት
የሚጨመር የ400 ደንብ በመጀመሪያ ይህ ቅርንጫፍ እንዲሻሻል ይፈልጋል፤
ይህም ደንብ ከመጨመር የሚበልጥ ለውጥ ነው (ቀድሞውኑ በስርዓተ-ጥለት
ድርድር ባህሪ ላይ ለሚመረኮዝ እያንዳንዱ አቅራቢ 400ን እንደገና
ይመድባል)፣ እና ለአንድ አቅራቢ ብቻ የደንብ ጭማሪ ከተወሰነው ወሰን
ውጭ ነው።

### ኮታን በተሳሳተ መንገድ የሚገልጽ አዲስ መግቢያ በር ማከል

1. በ`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ውስጥ አንድ የደንብ ድርድር
   ይመዝግቡ። `textMarkers`ን ለአቅራቢው የተለየ አድርገው ያቆዩ፤
   ከ`CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) ጋር
   የሚጋጩ አጠቃላይ የእንግሊዝኛ ሐረጎችን ፈጽሞ ዳግም አይጠቀሙ።
2. ትክክለኛውን የመቆለፊያ ወሰን (`connection` ለመለያው በሙሉ የሚመለከት
   ኮታ፣ `model` ደግሞ ለእያንዳንዱ ሞዴል ስህተቶች) ለመምረጥ፣ እንደ
   አማራጭ በ`open-sse/config/providerErrorRules.ts`
   (`providerRuleRegistry`) ውስጥ የምደባ ደንቦችን ይመዝግቡ። ይህ ደረጃ
   ሙሉውን የስህተት ጽሑፍ (የይዘት ምልክቶች) ለሚፈልጉ ደንቦች በምርት
   አካባቢ ተግባራዊ የሚሆነው ለተወሰኑ አቅራቢዎች ብቻ ነው፦ የአቅራቢውን
   id በዚያው ፋይል ወደ `FULL_TEXT_RULE_PROVIDERS` ያክሉ — ካልሆነ
   `checkFallbackError` ለደንቡ የሚያስተላልፈው የተዋቀረውን
   `{code, type}` ስህተት ብቻ ስለሆነ፣ የይዘት-ጽሑፍ ደንብ ከቀጥታ
   ትራፊክ ጋር ፈጽሞ አይዛመድም። በ`status`/`headers` ላይ ብቻ የሚዛመዱ
   ደንቦች (እንደ Opencode ወይም Minimax) ይህን መርጦ መግባት
   አያስፈልጋቸውም። በተናጠል፣ ደንቡ `scope: "connection"` ካወጀ እና
   የታሰበው እውነተኛ የግንኙነት-አቀፍ ማቀዝቀዣ ከተመሳሳይ ጥያቄ
   የጥምር መዝለል ጋር ከሆነ (የመረጃ መለያ ብቻ ካልሆነ)፣ የአቅራቢውን
   id በዚያው ፋይል ውስጥ ወደ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ያክሉ —
   ይህ በ`markAccountUnavailable()` (`src/sse/services/auth.ts`) እና
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ውስጥ እንደ
   `isAgentrouterConnectionQuotaScope()` ያለ ፍጆታን የሚገድበው ነው፤
   ያለዚህ `scope` አሁንም በ`fallbackResult.ruleScope` በኩል ይተላለፋል፣
   ነገር ግን ምንም ነገር በእሱ መሠረት አይሰራም።
3. `tests/unit/upstream-status-restatement.test.ts` እና
   `tests/unit/agentrouter-error-rules.test.ts`ን የሚያንጸባርቁ የክፍል
   ሙከራዎችን ያክሉ (የnot-permanent / not-creditsExhausted መከላከያዎችን
   ጨምሮ፣ እና — አቅራቢው የፍቃድ ዝርዝሩን ከፈለገ — `resolveRuleMatchBody()`
   ሙሉውን ጽሑፍ ለዚያ አቅራቢ ብቻ እንደሚመልስ የሚያረጋግጥ ሙከራ)።

በ`chatCore.ts`፣ `classifyError` ወይም combo ላይ ምንም ለውጥ አያስፈልግም።

#### በወጪ ትራፊክ ባልዲ የተከፋፈለ መቆለፊያ (#10880)

በ`EGRESS_BUCKETED_LOCK_PROVIDERS` (የopencode ቤተሰብ) ውስጥ ያሉ
አቅራቢዎች በIP የተከፋፈለ የላይኛው ስርዓት ተደርገው ይወሰዳሉ
(የopencode ነጻ ደረጃ በIP የተከፋፈለ እንጂ በመለያ የተከፋፈለ
አይደለም — #9611ን ይመልከቱ)፦ `quota_exhausted` **ወይም**
`rate_limit_exceeded` ተብሎ የተመደበ ሁኔታ-429፣ ማዞሪያው ሊሞክራቸው
ከመቻሉ በፊት፣ የመጨረሻ የታወቀ የወጪ ትራፊክ IP አድራሻቸው
ከከሸፈው ግንኙነት ጋር የሚዛመድ እያንዳንዱን በፍቃድ ዝርዝር
የተካተተ የቤተሰቡ ግንኙነት ያቀዘቅዛል
— ይህም N-1 መክሸፋቸው አይቀሬ የሆኑ የላይኛው ስርዓት ጥሪዎችን
ይከላከላል (ከ#10460/#10525 ጋር ተመሳሳይ ቅርጽ)።
`rate_limit_exceeded` ሆን ተብሎ ተካቷል፦ በ`markAccountUnavailable`
መንገድ ላይ ለopencode የተለዩት ደንቦች ፈጽሞ አይዛመዱም (ምንም
headers/body ወደ `checkFallbackError` አይተላለፍም፣ opencode በ
`FULL_TEXT_RULE_PROVIDERS` ውስጥ የለም)፣ ስለዚህ bodyው የደንበኝነት
ምዝገባ ኮታ ጽሑፍን ("monthly usage limit reached") የያዘ 429፣
የ`status_429` ደንብ ከመድረሱ በፊት በኮታ-ጽሑፍ ምትክ
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h ማቀዝቀዣ)
እንደ `quota_exhausted` ይመደባል — ከኮታ-ጽሑፍ ነጻ የሆነ 429
(ተራ የፍጥነት ገደብ) ግን በ`status_429` ደንብ አማካኝነት እንደ
`rate_limit_exceeded` ይመደባል፣ እና አሁንም የIP ቤተሰቡን ያቀዘቅዛል።
በፍቃድ ዝርዝሩ ለተካተተ አቅራቢ፣ በIP የተከፋፈለ የፍጥነት ገደብ
ከተሟጠጠ ኮታ ጋር ተመሳሳይ ምልክት ነው። ግልጽ ገደቦች፦

- **በተቻለ መጠን**: መቆለፊያው የግንኙነቱን የመጨረሻ የታወቀ `egress_ip`
  ከ`proxy_logs` ይፈታል (የ24h መስኮት፣ የተመሳሰለ፣ ያለ መሸጎጫ)። ቀዝቃዛ መሸጎጫ (የወጪ
  IP ፈጽሞ ካልተፈተሸ) ወይም ረድፍ ከሌለ → ያልተሳካው ግንኙነት አሁንም በቅርንጫፉ
  ይቀዘቅዛል (እንደ አሁኑ ይመዘገባል)፣ የሚቆለፍ ተመሳሳይ ግንኙነት ብቻ አይኖርም።
- **ፈጽሞ ቋሚ አይደለም**: የማቀዝቀዣ ጊዜው የሚታደስ የኮታ መስኮት ነው
  (`testStatus: "unavailable"`)፤ ቋሚ ሁኔታ ከIP-ደረጃ ምልክት ፈጽሞ አይወሰድም።
  `disableCooling` ያላቸው ግንኙነቶች ቅርንጫፉን ሙሉ በሙሉ ያልፋሉ።
- **ለተፈቀደለት ቤተሰብ የመቆለፊያ ጥራጥሬነት ይለወጣል**: ይህ የወሰን
  ለውጥ እንጂ የተመሳሳይ ግንኙነት ማመቻቸት ብቻ አይደለም። opencode የ
  `passthroughModels` አቅራቢ ነው፣ ስለዚህ ከዚህ ቅርንጫፍ በፊት 429 በእያንዳንዱ-MODEL
  ደረጃ መቆለፍን ያስከትል ነበር፤ አሁን ግን የግንኙነት ማቀዝቀዣን ያስከትላል —
  ምንም ተመሳሳይ ግንኙነት ሳይኖረው አንድ ግንኙነት ብቻ ለሚያስኬድ ኦፕሬተርም ጭምር።
  የopencode ደንብ ሰንጠረዥ ትክክለኛ እንደሆነ አስቀድሞ የሚገልጸው ጥራጥሬነት ይህ ነው
  (`scope: "connection"`፣ `providerErrorRules.ts`)፤ opencode በ
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ውስጥ ስለሌለ እስካሁን ፈጽሞ አልተከበረም።
  ቅርንጫፉ በግንኙነት-ወሰን ያለውን የagentrouter ቅርንጫፍ በመኮረጅ ያልተሳካውን
  የግንኙነት ማቀዝቀዣ + `backoffLevel` ራሱ ይጽፋል፣ ከዚያም ይመለሳል —
  በእያንዳንዱ-ሞዴል ያለው እገዳና ከታች ያለው አጠቃላይ መንገድ ፈጽሞ አይደረስባቸውም።
- **Combo ተካትቷል**: እንደ agentrouter ቅርንጫፍ፣ ወሰኑ አንድ combo ጠሪ
  በ429 ላይ የሚተገብረውን የ`persistUnavailableState`/`isCombo` ደረጃ ቅናሽ ሆን ብሎ
  ችላ ይላል። በእያንዳንዱ-ሞዴል የሚደረግ መቆለፍ የዚህ ወሰን ደካማ ቅርጽ አይደለም፤
  የተሳሳተ አሃድ ነው፤ ስለተሟጠጠው IP ምንም አይናገርም፣ ስለዚህ የcombo
  ማዞሪያው በእያንዳንዱ ተመሳሳይ ግንኙነት አንድ መሳካቱ የማይቀር ጥሪን ማባከኑን ይቀጥላል።
- **የተመሳሳይ ግንኙነት ደህንነት**: አስቀድሞ ቋሚ ሁኔታ ላይ ያለ ተመሳሳይ ግንኙነት
  (banned/credits_exhausted) ወይም አስቀድሞ ረዘም ያለ የማቀዝቀዣ ጊዜ ያለው
  ፈጽሞ አይተካም።
- **የተወሰነ የፍቃድ ዝርዝር**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ን ማስፋት
  ግልጽ የባለቤት ውሳኔ ነው፤ አጠቃላይ ሽቦ ማገናኘት የለም (pattern #10334/#10419)።
  የተመሳሳይ ግንኙነት መጠይቁ ያንኑ የፍቃድ ዝርዝር እንደ SQL
  ቃል-በቃል ከመድገም ይልቅ ያስራል፣ ስለዚህ ማስፋቱ የአንድ-መስመር ለውጥ ሆኖ ይቆያል።
- **የወጪ IP ማዞር፣ በሁለቱም አቅጣጫዎች**: የፍለጋ መስኮቱ (24h) ከወጪ-IP
  መሸጎጫ TTL (5 min) እጅግ የሰፋ ነው፣ ስለዚህ "የመጨረሻ የታወቀ IP" ታሪክ እንጂ
  የአሁን ሁኔታ አይደለም። የአንድ ግንኙነት proxy በመስኮቱ ውስጥ ከተዘዋወረ
  መቆለፊያው በእውነት የሚጋራ IPን **ሊያመልጠው** ይችላል (የተመዘገበው IP አዲሱ፣
  ያልተሟጠጠው ነው) — በተመሳሳይም ሁኔታ ከተሟጠጠው IP ርቆ የተዘዋወረን
  **ተመሳሳይ ግንኙነት ሊያቀዘቅዝ** ይችላል። ሁለተኛው ሁኔታ ያንን ተመሳሳይ ግንኙነት
  አንድ የማቀዝቀዣ መስኮት ያስከፍለዋል፤ ሁለቱም በታሪክ ላይ የተመሠረተ ፍለጋ
  የሚያስከትላቸው ተቀባይነት ያላቸው የበተቻለ መጠን ገደቦች ናቸው።
- **ወጪ**: ሁለት የተገደቡ የ`proxy_logs` ቅኝቶች (በ
  `idx_pl_timestamp` በኩል በመስኮቱ የተጣሩ)፣ በ429 ድግግሞሽ ጊዜ ብቻ። አዲስ
  index የለም (migration 134 YAGNI)። መካከለኛ መጠን ባለው የእውነተኛ-ትራፊክ DB
  ቅጂ ላይ ተለክቷል፤ ከፍተኛ-የውሂብ-ፍሰት instance በተመሳሳይ መስኮት ውስጥ
  በተመጣጣኝ ሁኔታ ተጨማሪ ረድፎችን ይይዛል።

---

## ሌሎች የጽናት ባህሪያት

- **19 የማዘዋወሪያ ስልቶች** (ቅድሚያ፣ ክብደት ያለው፣ ተራ-በተራ፣ የዐውድ ማስተላለፊያ፣ መጀመሪያ-ሙላ፣ p2c፣ የዘፈቀደ፣ በትንሹ-ጥቅም-ላይ-የዋለ፣ ወጪ-የተመቻቸ፣ ዳግም-ማስጀመርን-የሚያውቅ፣ የዳግም-ማስጀመሪያ-ጊዜ-መስኮት፣ ትርፍ-አቅም፣ ጥብቅ-የዘፈቀደ፣ ራስ-ሰር፣ lkgp፣ ዐውድ-የተመቻቸ፣ መሸጎጫ-የተመቻቸ፣ ውህደት፣ ቧንቧ-መስመር) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)ን ይመልከቱ።
- **ዳግም ማስጀመርን የሚያውቅ ማዘዋወር** (v3.8.0) — ግንኙነቶችን በኮታ ዳግም ማስጀመሪያ ጊዜ መሠረት ቅድሚያ ይሰጣል።
- **የበስተጀርባ ሁነታ ማውረድ** — Responses API `background: true` ከማስጠንቀቂያ ጋር ወደ የተመሳሰለ ሁነታ ዝቅ ይደረጋል።
- **ተለዋዋጭ የመሣሪያ ገደብ ማወቂያ** — የመሣሪያ ብዛት ገደቦች ሲደረሱ አቅራቢዎችን ወደ ኋላ ያፈገፍጋል።
- **የድንገተኛ ጊዜ አማራጭ** — በ`OMNIROUTE_EMERGENCY_FALLBACK` ይቆጣጠራል፤ ኦፕሬተሮች ዳግም ሳያስጀምሩ ከባህሪ ጥቆማዎች ገጽ ሊተኩት ይችላሉ።

---

## ማረም

- ክብደት ያለው combo `503 all_targets_cooling_down` ምላሽ ከሰጠ (`Retry-After` ተቀናብሯል፣ `diagnostics.excluded` ደግሞ እያንዳንዱን ዒላማ ከ`model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ጋር ይዘረዝራል) → pool-ው ተዋቅሯል እና ተገናኝቷል፤ እያንዳንዱ ዒላማ በresilience timer ምክንያት ብቻ ተገልሏል። የ`[COMBO] Weighted selection: every target excluded before dispatch — …` ማስጠንቀቂያ ምክንያቶቹን እና የቀሩትን ሰከንዶች ይጠቅሳል። ከተመሳሳዩ combo የሚመጣ `404 no_executable_targets` ማለት ምንም resilience timer አልተሳተፈም ማለት ነው (የሚሰራ ምንም ነገር የለም፣ ወይም ሁሉም መለያዎች የavailability probe-ውን አላለፉም)። ይህም በ`targetResolution.ts` ውስጥ ከተሰበሰቡት ማግለሎች በ`open-sse/services/combo/pinRecovery.ts` ውስጥ ተገንብቷል።
- የአንድ provider ሁሉም keys ከታለፉ → የcircuit breaker ሁኔታን እና የእያንዳንዱ connection `rateLimitedUntil`/`testStatus`ን ሁለቱንም ያረጋግጡ።
- ከreset window በኋላ provider በቋሚነት ከተገለለ → ኮዱ `getStatus()`/`canExecute()`ን ከመጠቀም ይልቅ ጥሬ `state`ን እያነበበ ነው።
- አንድ key ከወደቀ፣ ሌሎቹ መስራት አለባቸው → ከcircuit breaker ይልቅ connection cooldownን ይምረጡ።
- አንድ model ብቻ ከወደቀ → ከconnection cooldown ይልቅ model lockoutን ይምረጡ።
- State ራሱን መልሶ ማገገም ሲገባው ካላገገመ → የወደፊት timestamp መኖሩን እና ጊዜው ያለፈበትን state የሚያድስ read path መኖሩን ያረጋግጡ። ቋሚ statuses በእጅ ለውጦችን ይፈልጋሉ።

---

## TLS የጣት አሻራ መለየት እና ስውርነት

ለአቅራቢ የተወሰነ ስውርነት (JA3/JA4፣ CCH፣ ማደበዝ) በተናጠል ተመዝግቧል — `docs/security/STEALTH_GUIDE.md`ን ይመልከቱ (git፤ ወደ `/docs` አልተቀናበረም)።

---

## የጽናት ሙከራ (ደረጃ 8 · ክፍል C)

ከጽናት አመክንዮ የአሃድ ሙከራዎች በተጨማሪ፣ ሦስት ሙከራዎች በእውነተኛ
የጭንቀት/ውድቀት ሁኔታዎች የአሂድ ጊዜውን ይፈትሻሉ (ሁሉም ውህደት/የምሽት ናቸው — PRsን የሚያግድ የለም)፦

| ሙከራ            | ምን                                                                                                                                               | ማስኬጃ                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| ትርምስ           | አስመሳይ የላይኛው ዥረት ኖድ እውነተኛ መዘግየት/ዳግም ማስጀመር/የጊዜ ማብቂያ/503ን ያስገባል፤ የወረዳ ቆራጩ መከፈቱን/መመለሱን እና `checkFallbackError` 503ን እንደ ሊመለስ የሚችል አማራጭ መመደቡን ያረጋግጣል። | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| የሂፕ-እድገት       | በ`--expose-gc` ስር ለእያንዳንዱ `createSSEStream` ~500 ዥረቶች፤ ሂፑ ከጣሪያው በላይ ካደገ ይወድቃል (የOOM መከላከያ #3069)።                                                | `npm run test:heap`                   |
| k6 የረጅም ጊዜ ጭነት | በ`/api/monitoring/health` ላይ ዘላቂ ጭነት፤ የp95/ስህተት ገደቦች።                                                                                            | `k6 run tests/load/k6-soak.js` (በምሽት) |

በ`.github/workflows/nightly-resilience.yml` (cron + dispatch) ይቀናበራል። በነባሪው
`test:integration` ውስጥ፣ የትርምስ እና የሂፕ ሙከራዎች ራሳቸውን ይዘላሉ (`RUN_CHAOS_INT`/`--expose-gc` ከሌለ)።

---

## ተጨማሪ ይመልከቱ

- [የሥነ ሕንፃ መመሪያ](./ARCHITECTURE.md) — የስርዓት ሥነ ሕንፃ እና ውስጣዊ አሠራሮች
- [የተጠቃሚ መመሪያ](../guides/USER_GUIDE.md) — አቅራቢዎች፣ ጥምረቶች፣ የCLI ውህደት
- [ራስ-ሰር ጥምረት ሞተር](../routing/AUTO-COMBO.md) — ባለ16-ምክንያት ውጤት አሰጣጥ፣ የሁነታ ጥቅሎች
