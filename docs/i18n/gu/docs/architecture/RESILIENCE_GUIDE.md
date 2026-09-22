# Resilience Guide (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute પાસે ત્રણ અલગ પરંતુ પરસ્પર સંબંધિત સ્થિતિસ્થાપકતા મિકેનિઝમ છે. દરેકનો વ્યાપ અને હેતુ અલગ છે. રૂટિંગના વર્તનને ડિબગ કરતી વખતે તેમને અલગ રાખો.

![3-સ્તરીય સ્થિતિસ્થાપકતા મોડેલ](../diagrams/exported/resilience-3layers.svg)

> સ્રોત: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. પ્રોવાઇડર સર્કિટ બ્રેકર

**વ્યાપ:** સમગ્ર પ્રોવાઇડર (દા.ત., `glm`, `openai`, `anthropic`).

**હેતુ:** અપસ્ટ્રીમ/સેવા સ્તરે વારંવાર નિષ્ફળ જતા પ્રોવાઇડરને ટ્રાફિક મોકલવાનું બંધ કરવું.

**અમલીકરણ:**

- મુખ્ય ક્લાસ: `src/shared/utils/circuitBreaker.ts`
- વાયરિંગ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- સ્થિતિ API: `GET /api/monitoring/health`
- રીસેટ API: `POST /api/resilience/reset`
- રૅપર્સ: `open-sse/services/accountFallback.ts`
- DB ટેબલ: `domain_circuit_breakers`

**સ્થિતિઓ:**

- `CLOSED` — સામાન્ય ટ્રાફિકને મંજૂરી છે
- `DEGRADED` — ટ્રાફિકને હજુ પણ મંજૂરી છે, પરંતુ પ્રોવાઇડરની વધેલી નિષ્ફળતાઓને ટ્રૅક કરવામાં આવી રહી છે
- `OPEN` — પ્રોવાઇડર અસ્થાયી રીતે અવરોધિત છે; કૉમ્બો રૂટિંગ તેને છોડી દે છે
- `HALF_OPEN` — રીસેટ સમયસમાપ્તિ વીતી ગઈ છે; પ્રોબ વિનંતીને મંજૂરી છે

**રૂપરેખાંકિત કરી શકાય તેવા ડિફૉલ્ટ્સ (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience માં ઉપલબ્ધ):**

| ક્લાસ   | ડિગ્રેડ થવાનો બિંદુ | ઓપન થવાનો બિંદુ | રીસેટ સમયસમાપ્તિ |
| ------- | ------------------- | --------------- | ---------------- |
| OAuth   | 5 નિષ્ફળતાઓ         | 8 નિષ્ફળતાઓ     | 60s              |
| API-key | 7 નિષ્ફળતાઓ         | 12 નિષ્ફળતાઓ    | 30s              |
| સ્થાનિક | વ્યુત્પન્ન          | 2 નિષ્ફળતાઓ     | 15s              |

`degradationThreshold` એ નિયંત્રિત કરે છે કે પ્રોવાઇડર ક્યારે `DEGRADED` સ્થિતિમાં પ્રવેશે છે; `failureThreshold` એ નિયંત્રિત કરે છે કે તે ક્યારે ઓપન થાય છે અને તેને છોડી દેવામાં આવે છે. સ્થાનિક પ્રોવાઇડર પ્રોફાઇલ્સ હજી Resilience સેટિંગ્સ પેજ પર ઉપલબ્ધ નથી.

**ટ્રિપ કોડ્સ:** માત્ર પ્રોવાઇડર-સ્તરની સ્થિતિઓ `[408, 500, 502, 503, 504]`. અકાઉન્ટ-સ્તરની ભૂલો માટે ટ્રિપ કરશો નહીં (મોટાભાગની 401/403/429 — તે કૂલડાઉન અથવા લૉકઆઉટ હેઠળ આવે છે).

**લેઝી પુનઃપ્રાપ્તિ:** જ્યારે `OPEN` સમાપ્ત થાય છે, ત્યારે `getStatus()`, `canExecute()`, `getRetryAfterMs()` સ્થિતિને `HALF_OPEN` તરીકે રિફ્રેશ કરે છે. કોઈ બૅકગ્રાઉન્ડ ટાઇમરની જરૂર નથી.

---

### ઑપ્ટ-ઇન વૈશ્વિક પ્રોવાઇડર કૂલડાઉન (વિન્ડો ગેટ)

ચોથું, **ઑપ્ટ-ઇન** સ્તર (`PROVIDER_COOLDOWN_ENABLED`, ડિફૉલ્ટ રૂપે **બંધ**) નિષ્ફળ જતા પ્રોવાઇડર્સની
ક્રોસ-રિક્વેસ્ટ મેમરી
`open-sse/services/providerCooldownTracker.ts` માં રાખે છે, જેનો ઉપયોગ કૉમ્બો ટાર્ગેટ
રિઝોલ્યુશન દ્વારા કરવામાં આવે છે જેથી સળંગ કૉમ્બો વિનંતીઓ હમણાં જ
નિષ્ફળ ગયેલા પ્રોવાઇડરને ફરીથી તપાસતી ન રહે. પ્રોવાઇડર-સ્તરની એન્ટ્રીઓ `PROVIDER_PROFILES` વિન્ડો ગેટનું પાલન કરે છે:

| પ્રોફાઇલ | આટલી સંખ્યા પછી ટ્રિપ થાય છે (`providerFailureThreshold`) | આ સમયગાળાની અંદર (`providerFailureWindowMs`) | આટલા સમય માટે કૂલ રહે છે (`providerCooldownMs`) |
| -------- | --------------------------------------------------------: | -------------------------------------------: | ----------------------------------------------: |
| OAuth    |                                                      `10` |                                      `15min` |                                          `5min` |
| API key  |                                                      `15` |                                      `30min` |                                         `10min` |

થ્રેશોલ્ડથી નીચે પ્રોવાઇડરને **કૂલિંગમાં** ગણવામાં આવતો નથી; સફળતા
વિન્ડોને સાફ કરે છે. કનેક્શન-સ્તરની એન્ટ્રીઓ (`provider:connectionId`) તેના બદલે
એક્સ્પોનેન્શિયલ `minRetryCooldownMs → maxRetryCooldownMs` બૅકઑફ જાળવી રાખે છે. ઓવરરાઇડ્સ:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
રિગ્રેશન ગાર્ડ: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. કનેક્શન કૂલડાઉન

**વ્યાપ:** એક પ્રોવાઇડર કનેક્શન/એકાઉન્ટ/કી.

**હેતુ:** સમાન પ્રોવાઇડરનાં અન્ય કનેક્શન્સ સેવા આપવાનું ચાલુ રાખે ત્યારે એક ખરાબ કીને અવગણવી.

**અમલીકરણ:**

- અનુપલબ્ધ તરીકે ચિહ્નિત કરવું: `src/sse/services/auth.ts::markAccountUnavailable()`
- પસંદગી: સમાન ફાઇલમાં `getProviderCredentials*`
- કૂલડાઉન ગણતરી: `open-sse/services/accountFallback.ts::checkFallbackError()`
- સેટિંગ્સ: `src/lib/resilience/settings.ts`

**કનેક્શન દીઠ ફીલ્ડ્સ:**

- `rateLimitedUntil` — કૂલડાઉન સમાપ્ત થાય ત્યાં સુધીનો ટાઇમસ્ટેમ્પ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — એક્સ્પોનેન્શિયલ બેકઑફ કાઉન્ટર

**ડિફૉલ્ટ કૂલડાઉન્સ:**

- OAuth આધાર: 5s
- API-key આધાર: 3s
- API-key 429: અપસ્ટ્રીમ `Retry-After`/રીસેટ હેડર્સ/પાર્સ કરી શકાય તેવા રીસેટ ટેક્સ્ટને પ્રાથમિકતા આપે છે
- બેકઑફ: `baseCooldownMs * 2 ** failureIndex`

**થન્ડરિંગ-હર્ડ વિરોધી સુરક્ષા:** સમકાલીન નિષ્ફળતાઓને કૂલડાઉન વધુ પડતું લંબાવતાં અથવા `backoffLevel`ને બે વાર વધારતાં અટકાવે છે.

**ટર્મિનલ સ્થિતિઓ (કૂલડાઉન્સ નથી):**

- `banned` — પ્રતિબંધિત-કીવર્ડ / એકાઉન્ટ-પ્રતિબંધ શોધ દ્વારા સેટ થાય છે ([BAN_DETECTION](../security/BAN_DETECTION.md) જુઓ), અને સતત ત્રણ અપસ્ટ્રીમ પ્રતિ-રિક્વેસ્ટ અસ્વીકૃતિઓ (`request_rejected`, ઉદાહરણ તરીકે Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) દ્વારા પણ; એક માત્ર અસ્વીકૃતિ ફક્ત કનેક્શનને કૂલડાઉનમાં મૂકે છે
- `expired` (મર્યાદિત પુનઃપ્રયાસો પછી ટર્મિનલ સ્થિતિમાં પરિવર્તિત થાય છે — એક્સ્પોનેન્શિયલ બેકઑફ સાથે `EXPIRED_RETRY_MAX = 3` — જેથી ક્ષણિક OAuth ભૂલો એકાઉન્ટ કાયમી રીતે નિષ્ક્રિય થાય તે પહેલાં આપમેળે સુધરી શકે)
- `credits_exhausted`

ક્રેડેન્શિયલ્સ બદલાય અથવા ઑપરેટર તેમને રીસેટ કરે ત્યાં સુધી આ સ્થિતિઓ યથાવત્ રહે છે. ટર્મિનલ સ્થિતિઓને ક્ષણિક કૂલડાઉન સ્થિતિથી ઓવરરાઇટ કરશો નહીં.

**લેઝી રિકવરી:** જ્યારે `rateLimitedUntil` વીતી જાય, ત્યારે કનેક્શન ફરીથી પાત્ર બને છે. સફળ ઉપયોગ પર, `clearAccountError()` તમામ એરર ફીલ્ડ્સ સાફ કરે છે.

### Claude OAuth ઉપયોગ મર્યાદા: નીચી-પ્રાથમિકતાવાળી લેન + સેશન-લિમિટ રીસેટ

**વ્યાપ:** એક Claude સબ્સ્ક્રિપ્શન (OAuth) કનેક્શન. બંને સુવિધાઓ **કનેક્શન દીઠ ઑપ્ટ-ઇન
છે** (કનેક્શન સંપાદિત કરો → Claude વિભાગ → `providerSpecificData`માં `lowPriorityMode` /
`autoLimitReset`, બંને ડિફૉલ્ટ રીતે બંધ) અને Claude Codeના `/low-priority` અને
`/limit-reset` કમાન્ડ્સને પ્રતિબિંબિત કરે છે (Claude Code 2.1.263માંથી મેળવાયેલ વાયર કૉન્ટ્રાક્ટ).

**અમલીકરણ:**

- સ્ટેટ મશીન + રિસ્પોન્સ વર્ગીકરણ: `open-sse/services/claudeLowPriority.ts`
- રીસેટ સ્થિતિ/ક્લેમ ક્લાયન્ટ: `open-sse/services/claudeLimitReset.ts`
- એક્ઝિક્યુટર હૂક (હેડર ઇન્જેક્શન + સમાન-એકાઉન્ટ પુનઃપ્રયાસ): `open-sse/executors/base.ts::execute()`
- ઑપ્ટ-ઇન પર્સિસ્ટન્સ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ટ્રિગર:** 5-કલાકની ઉપયોગ મર્યાદા — એવો `429` જેના હેડર્સમાં
`anthropic-ratelimit-unified-status: rejected` હોય અને, જ્યારે એકાઉન્ટ પાત્ર હોય ત્યારે,
`anthropic-ratelimit-unified-slow-offer: treatment` હોય. તે પ્રથમ મર્યાદા
429 પહેલાં કંઈ મોકલવામાં આવતું નથી; યુનિફાઇડ હેડર્સ વિનાનું બર્સ્ટ 429 સામાન્ય કૂલડાઉન પાથમાંથી પસાર થાય છે.

**નીચી-પ્રાથમિકતાવાળી લેન** (`lowPriorityMode`):

- મર્યાદાવાળા 429 પર એક્ઝિક્યુટર ઑફર સ્વીકારે છે અને તરત જ **સમાન**
  એકાઉન્ટનો `anthropic-usage-limit: slow` સાથે પુનઃપ્રયાસ કરે છે; જાહેર કરાયેલ
  `anthropic-ratelimit-unified-reset` (+60s ગ્રેસ) સુધી લેન સક્રિય રહે છે અને તે સમયગાળાની દરેક રિક્વેસ્ટમાં
  હેડર સામેલ હોય છે. ઇન્ટરસેપ્ટ કરાયેલ 429 ક્યારેય `handleChatCore` સુધી પહોંચતું નથી, તેથી કનેક્શન
  કૂલડાઉનમાં **મૂકાતું નથી** અને તેનાથી દૂર રોટેટ થતું નથી.
- પછીના રિસ્પોન્સ પર `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  લેનને જાળવી રાખે છે; `slot_busy` (429) અથવા `529`, સર્વરના
  `anthropic-ratelimit-unified-slow-retry-after` સુધી રાહ જુએ છે (ડિફૉલ્ટ 20s, 5–600s સુધી ક્લૅમ્પ, ±30% જિટર)
  અને `anthropic-ratelimit-unified-slow-max-wait` દ્વારા મર્યાદિત રહીને પુનઃપ્રયાસ કરે છે (ડિફૉલ્ટ 20 min, ક્લૅમ્પ
  1 min–6 h) — તેનાથી આગળ લેન સમાપ્ત થાય છે અને 10-મિનિટનો કૂલ-ઑફ ફરી સ્વીકારવાનું અવરોધે છે.
  રાહ જોવાનો સમય રિક્વેસ્ટના પોતાના અપસ્ટ્રીમ-સ્ટાર્ટ ટાઇમઆઉટમાં બાકી રહેલા સમય
  (`resolveFetchStartTimeout`, ડિફૉલ્ટ રીતે 10 min)માંથી 5 s માર્જિન બાદ કરીને વધારામાં મર્યાદિત કરવામાં આવે છે: તે મર્યાદા વિના
  20-મિનિટનો ડિફૉલ્ટ મહત્તમ રાહ જોવાનો સમય રિક્વેસ્ટ કરતાં વધુ ચાલશે અને સ્લીપ રાહ જોવાની વચ્ચે જ રદ થઈ જશે,
  પરિણામે સુગમ `max_wait` સમાપ્તિ + કૂલ-ઑફને બદલે `TimeoutError` દેખાશે.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-વિન્ડો રોલઓવર, અથવા
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (જે કોઈપણ સ્થિતિમાં તેને
  `extra_usage` તરીકે સમાપ્ત કરે છે, કારણ કે પેઇડ ઓવરેજ હવે મર્યાદાને આવરી લે છે) લેનને સમાપ્ત કરે છે; ત્યારબાદ
  રિસ્પોન્સ સામાન્ય કૂલડાઉન પાથમાં જાય છે. `budget_exhausted` જાહેર કરાયેલા બજેટ રીસેટ સુધી
  (≤ 8 days) યાદ રાખવામાં આવે છે.
- મર્યાદાની તપાસ એક્ઝિક્યુટરના પોતાના 400-પ્રેરિત ઇન્ટ્રા-અટેમ્પ પુનઃપ્રયાસો (કૉન્ટેક્સ્ટ
  એડિટિંગ, થિંકિંગ/એફર્ટ ક્લૅમ્પ્સ, પેરામ ઑટો-લર્ન) પછી ચાલે છે, તેથી તે પુનઃપ્રયાસોમાંથી માત્ર
  એક પર દેખાતો મર્યાદાવાળો 429 પણ કૂલડાઉન પાથ સુધી પહોંચવાને બદલે ઇન્ટરસેપ્ટ થાય છે.
- સ્થિતિ કનેક્શન દીઠ ઇન-મેમરી હોય છે (રીસ્ટાર્ટને ફરી સ્વીકારવા માટે એક વધારાનો મર્યાદાવાળો 429 લાગે છે).

**સેશન-લિમિટ રીસેટ** (`autoLimitReset`, બંને ચાલુ હોય ત્યારે લેન પહેલાં અજમાવવામાં આવે છે):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  બ્લૉક; જ્યારે `arm: "reset"` અને `available: true` હોય ત્યારે,
  `{ "program": "juniper_tide" }` સાથે
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (`providerSpecificData.organizationUUID`માંથી સંસ્થાનો UUID, બૂટસ્ટ્રૅપ ફૉલબૅક).
- `result: reset|not_limited` → રિક્વેસ્ટનો સંપૂર્ણ ઝડપે પુનઃપ્રયાસ થાય છે (કોઈ સ્લો હેડર નહીં).
  `already_used` / `not_offered`, `next_available_at`ને મેમોઇઝ કરે છે (ડિફૉલ્ટ એક સપ્તાહ);
  કોઈપણ નિષ્ફળતા 15 મિનિટ માટે બેકઑફ કરે છે. રીસેટ અઠવાડિયામાં એક વાર થાય છે અને હજી પણ
  સાપ્તાહિક મર્યાદામાં ગણાય છે.

રિગ્રેશન સુરક્ષાઓ: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### સેશન અફિનિટી (#7274)

**વ્યાપ:** એક કનેક્શન સાથે પિન કરાયેલ એક ક્લાયન્ટ સેશન (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` હેડર), **કોઈપણ** પ્રોવાઇડર માટે.

**હેતુ:** બહુ-ટર્ન એજન્ટ (Claude Code, aider, કસ્ટમ એજન્ટ્સ) ને વિનંતીઓ દરમિયાન એક જ એકાઉન્ટ પર જાળવી રાખવો, જેથી પ્રતિ-એકાઉન્ટ સત્ર સ્થિતિ ધરાવતા પ્રદાતાઓ પર ક્રોસ-એકાઉન્ટ સંદર્ભની ખોટ અને વારંવાર થતા કોલ્ડ-સ્ટાર્ટ 429 ઘટે.

**અમલીકરણ:**

- TTL નિર્ધારણ: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- પિન પસંદગી/બનાવટ: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- હેડર નિષ્કર્ષણ (સામાન્ય, કોઈપણ પ્રદાતા): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- સંગ્રહિત પિન ટેબલ: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- સેટિંગ: `sessionAffinityTtlMs` (ms માં વૈશ્વિક TTL, `0` તેને અક્ષમ કરે છે) — `src/lib/db/settings.ts`. માત્ર Codex માટેના `codexSessionAffinityTtlMs` માંથી માઇગ્રેશન `124_generic_session_affinity_ttl.sql` દ્વારા નામ બદલવામાં આવ્યું છે, જે અગાઉ ગોઠવાયેલ કોઈપણ Codex TTL ને નવા ડિફૉલ્ટ તરીકે સ્થાનાંતરિત કરે છે.

#7274 પહેલાં, `resolveSessionAffinityTtlMs()` એ `codex` સિવાયના દરેક પ્રદાતા માટે તરત જ `0` પર નિવૃત્તિ લીધી હતી, તેથી પિનિંગ મિકેનિઝમ અને હેડર નિષ્કર્ષણ પહેલેથી જ પ્રદાતા-અનિર્ભર હોવા છતાં TTL સેટિંગ (અને સત્ર હેડર્સ) ની અન્ય ક્યાંય કોઈ અસર થતી નહોતી. સુધારાએ તે વહેલી નિવૃત્તિ દૂર કરી છે; હવે TTL ને વૈશ્વિક રીતે `0` કરતાં વધુ પર સેટ કર્યા પછી તે દરેક પ્રદાતા પર એકસરખી રીતે લાગુ પડે છે.

ત્રણેય સત્ર-એફિનિટી હેડર્સ ક્યારેય અપસ્ટ્રીમ ફૉર્વર્ડ થતા નથી — એક્ઝિક્યુટર્સ ક્લાયન્ટ હેડર્સને આગળ મોકલવાને બદલે શરૂઆતથી પોતાના અપસ્ટ્રીમ હેડર્સ બનાવે છે, તેથી આ માત્ર આંતરિક સહસંબંધ ID તરીકે જ રહે છે.

### વિશિષ્ટ સંચાલિત સત્ર કનેક્શન લીઝ

**વ્યાપ:** એક સક્રિય સંચાલિત HTTP ક્લાયન્ટ/સત્ર એક પાત્ર OmniRoute કનેક્શનની માલિકી ધરાવે છે.

**હેતુ:** વિનંતીઓ દરમિયાન કડક રાઉટિંગ સીમાની જરૂર ધરાવતા ક્લાયન્ટ્સ માટે ટકાઉ અને વિશિષ્ટ કનેક્શન માલિકી પૂરી પાડવી. આ સત્ર એફિનિટીથી અલગ છે, જે સાતત્ય માટેની નરમ પસંદગી છે: વિશિષ્ટ લીઝ SQLite માં જીવનચક્ર સ્થિતિ જાળવી રાખે છે, વૈશ્વિક સક્રિય-માલિક અને સક્રિય-કનેક્શન વિશિષ્ટતા લાગુ કરે છે, અને પ્રદાતા ડિસ્પૅચ પહેલાં જૂની જનરેશનને નકારે છે.

આ સુવિધા પ્રતિ API કી ઑપ્ટ-ઇન છે. સંચાલિત કી પાસે `lease:exclusive` સ્કોપ અને સ્પષ્ટ, ખાલી ન હોય તેવી `allowedConnections` સૂચિ હોવી આવશ્યક છે. કોઈપણ HTTP ક્લાયન્ટ જીવનચક્ર એન્ડપૉઇન્ટનો ઉપયોગ કરી શકે છે; કોઈ ક્લાયન્ટ નામ, user-agent, પ્રદાતા, OAuth પદ્ધતિ અથવા મોડેલ જરૂરી નથી. લીઝ કનેક્શનની માલિકી ધરાવે છે, મોડેલની નહીં, તેથી કનેક્શન સામાન્ય રીતે પાત્ર રહે ત્યાં સુધી મોડેલમાં ફેરફાર થવા છતાં બાઇન્ડિંગ જળવાઈ રહે છે. સામાન્ય મોડેલ, ક્વોટા, હેલ્થ, કૂલડાઉન અને અલાઉલિસ્ટ નિયમો અધિકૃત રહે છે અને એ જ જનરેશનને બીજા મુક્ત પાત્ર કનેક્શન પર સ્થાનાંતરિત કરી શકે છે.

જીવનચક્ર `POST /api/v1/session-leases` છે, જેમાં JSON ક્રિયાઓ `acquire`, `renew`, અને `release` છે. સંચાલિત ઇન્ફરન્સ વિનંતીઓ અપારદર્શક `X-OmniRoute-Lease-Owner` મૂલ્ય અને ચોક્કસ `X-OmniRoute-Lease-Generation` રજૂ કરે છે. માલિક માટે `vlo_` પછી 43 base64url અક્ષરો વપરાય છે; માત્ર તેનો SHA-256 હૅશ સંગ્રહિત થાય છે. દરેક અંતિમ ડિસ્પૅચ સીમા પ્રમાણિત API કી ID અને સક્રિય કનેક્શન ID ને પણ બાઇન્ડ કરે છે. લીઝ નિયંત્રણ હેડર્સ લૉગ્સ, જાળવી રાખેલા વિનંતી સ્નૅપશૉટ્સ અને અપસ્ટ્રીમ એક્ઝિક્યુટર હેડર્સમાંથી દૂર કરવામાં આવે છે.

જો સામાન્ય રાઉટિંગ પાસે પાત્ર સંચાલિત ઉમેદવારો હોય પરંતુ દરેક મુક્ત ઉમેદવાર પર કોઈ અન્ય સક્રિય લીઝનો કબજો હોય, તો OmniRoute HTTP `429`, lease-capacity-unavailable કોડ, ક્ષમતાની રાહ જોવાની સ્થિતિ અને સૌથી વહેલા સંબંધિત સમાપ્તિ સમય પરથી મેળવેલ મર્યાદિત `Retry-After` પરત કરે છે. સામાન્ય ખાલી પાત્રતા લીઝ વિવાદ નથી અને તે પોતાની હાલની રાઉટિંગ ભૂલની અર્થવ્યવસ્થા જાળવી રાખે છે.

સંબંધિત મિકેનિઝમ્સ અલગ જ રહે છે:

- OAuth સત્ર કબજો OAuth એકાઉન્ટ્સ માટે પ્રક્રિયા-સ્થાનિક નરમ વિતરણ છે.
- એકાઉન્ટ સેમાફોર્સ વિનંતી-સમકાલીનતાની પરવાનગીઓ આપે છે અને વિનંતી પૂર્ણ થાય ત્યારે સમાપ્ત થાય છે.
- વિશિષ્ટ સંચાલિત સત્ર લીઝ જનરેશન સીમા સાથેની ટકાઉ જીવનચક્ર માલિકી છે.

---

## 3. મોડેલ લોકઆઉટ

**વ્યાપ:** provider + connection + model ત્રિપુટી.

**સ્થિતિ અનુસાર કીનો વ્યાપ:** નિષ્ફળતાની સ્થિતિ નક્કી કરે છે કે લોકઆઉટ કઈ કીમાં લખાય છે
(`open-sse/services/accountFallback/exactModelLock.ts` માં `resolveLockoutScope()`):

- `429` / `403` / `402` — quota અથવા entitlement સંકેત — **quota family** ને લૉક કરે છે:
  codex માટે સંપૂર્ણ `codex` / `spark` વ્યાપ (connection ના દરેક `gpt-5*` model),
  અન્ય providers માટે `getQuotaScopedModelForProvider()`.
- `404` મૂળ model ને લૉક કરે છે (`getModelLockKey()` `not_found` ને સંકુચિત કરે છે).
- અન્ય કોઈપણ સ્થિતિ — `5xx` transport/server નિષ્ફળતાઓ અને ગુણવત્તા માન્યતામાંથી
  OmniRoute દ્વારા પોતે બનાવાયેલ `502` — ફક્ત **ચોક્કસ**
  provider/connection/model ત્રિપુટીને લૉક કરે છે. એક model પર ખરાબ stream એ
  account ના quota વિશેનો પુરાવો નથી; આ નિયમ પહેલાં
  `codex/gpt-5.6-luna` પરના એક ખાલી પ્રતિસાદથી તે connection ના દરેક `gpt-5*`
  model ને routing માંથી 2–30 મિનિટ માટે દૂર કરવામાં આવતાં હતાં (ક્રમશઃ વધતા),
  જ્યારે તેનો quota અસ્પર્શિત રહેતો હતો.
- caller નો સ્પષ્ટ `scope` વિકલ્પ હંમેશાં અગ્રતા મેળવે છે (Antigravity `"exact"` પસાર કરે છે).

**હેતુ:** જ્યારે ફક્ત એક model અનુપલબ્ધ હોય અથવા quota-મર્યાદિત હોય ત્યારે સંપૂર્ણ connection ને અક્ષમ કરવાનું ટાળવું.

**ઉદાહરણો:**

- 429 પરત કરતા પ્રતિ-model quota providers
- એક ખૂટતા model માટે 404 પરત કરતા સ્થાનિક providers
- provider-વિશિષ્ટ mode/model પરવાનગી નિષ્ફળતાઓ (દા.ત., Grok modes)

**અમલીકરણ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### મોડેલ કૂલડાઉન્સ ડૅશબોર્ડ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

નીચેની વિગતો સાથે સક્રિય lockouts ની સૂચિ આપે છે: provider, connection, model, કારણ, expiresAt. Operators કાર્ડમાંથી model ને મેન્યુઅલી ફરી સક્ષમ કરી શકે છે.

**REST API:**

- `GET /api/resilience/model-cooldowns` — સક્રિય lockouts ની સૂચિ મેળવો
- `DELETE /api/resilience/model-cooldowns` — મેન્યુઅલી ફરી સક્ષમ કરો. Body: `{provider, connection, model}`. Auth: management.

### લોકઆઉટ સેટિંગ્સ UI + સફળતા-ક્ષય પુનઃપ્રાપ્તિ (v3.8.23)

Model lockout હંમેશાં ચાલુ રહેતી હાર્ડકોડ કરેલી વર્તણૂકમાંથી સંપૂર્ણપણે રૂપરેખાંકિત કરી શકાય તેવી,
વૈકલ્પિક સુવિધામાં ફેરવાયું છે, જેમાં તેનું પોતાનું settings card અને સ્વયં-પુનઃસ્થાપિત થતો recovery path છે.

**સેટિંગ્સ કાર્ડ:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
આ ઉપરના ફક્ત વાંચી શકાય તેવા `ModelCooldownsCard` થી **અલગ** છે (જે માત્ર
સક્રિય lockouts ની _સૂચિ_ આપે છે) — નવું card _પરિમાણોને રૂપરેખાંકિત કરે છે_. Defaults
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) માં છે:

| સેટિંગ                  | ડિફૉલ્ટ                          | અર્થ                                                                 |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | મુખ્ય toggle — model lockout **ડિફૉલ્ટ રૂપે બંધ** છે.                |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | model-વ્યાપી નિષ્ફળતા તરીકે ગણાતી upstream સ્થિતિઓ.                  |
| `baseCooldownMs`        | `120_000` (120 s)                | પ્રથમ નિષ્ફળતા માટે lockout નો પ્રારંભિક સમયગાળો.                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | વધતા cooldown માટેની મહત્તમ મર્યાદા.                                 |
| `maxBackoffSteps`       | `10`                             | મહત્તમ exponential-backoff વૃદ્ધિ પગલાં.                             |
| `useExponentialBackoff` | `true`                           | પુનરાવર્તિત નિષ્ફળતાઓ cooldown ને exponential રીતે વધારે છે કે નહીં. |

Settings સામાન્ય settings store મારફતે જળવાઈ રહે છે અને
resilience settings schema દ્વારા માન્ય થાય છે; card `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` સાથે) અને `maxBackoffSteps` ને મર્યાદામાં રાખે છે.

**સફળતા-ક્ષય પુનઃપ્રાપ્તિ:** recovery ફક્ત timer સમાપ્ત થવા પર આધારિત **નથી**. સ્વસ્થ
response model ની failure count ને ઘટાડે છે, જેથી window ની વચ્ચે recover થયેલું model
તેનો timer સમાપ્ત થાય તે પહેલાં વૃદ્ધિ કરવાનું બંધ કરે (અને clear થાય). સફળ
combo target પર, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ને call કરે છે, જે સંગ્રહિત
`failureCount` ને **અડધું** કરે છે (`Math.floor(failureCount / 2)`); જ્યારે તે `0` સુધી
પહોંચે છે ત્યારે lockout entry સંપૂર્ણપણે delete થઈ જાય છે. તેનો સમકક્ષ `recordModelLockoutFailure()`
escalation window માં થતી નિષ્ફળતાઓ પર count વધારે છે (અને cooldown ને વધારે છે).
આ success-decay સાદા timer expiry ઉપરાંત છે —
બંનેમાંથી કોઈપણ માર્ગ model ને ફરી સક્ષમ કરી શકે છે.

**સ્થિતિ:** lockouts DB માં જાળવવામાં આવતા નથી, પરંતુ **in-memory** રાખવામાં આવે છે (દર-process `Map`s,
જેમાં `ModelLockoutEntry` ની કી `provider:connectionId:model` હોય છે અને exact-scope locks ની કી
`provider:connectionId:exact:model` હોય છે) —
restart થવા પર તે ગુમ થઈ જાય છે. _Settings_ જાળવવામાં આવે છે; સક્રિય
lockout _state_ ક્ષણિક છે.

---

## 4. ક્વોટા-શેર સમકાલીનતા નિયંત્રણ (v3.8.36)

સબ્સ્ક્રિપ્શન એકાઉન્ટ્સ (GLM, MiniMax વગેરે) સામાન્ય રીતે ફક્ત ~1–3 સમકાલીન
વિનંતીઓ સ્વીકારે છે; આ મર્યાદા વટાવવાથી 429 અને કૂલડાઉન ટ્રિગર થાય છે. આ સમસ્યા
**quota-share** (`qtSd/…`) કોમ્બોમાં વધુ તીવ્ર બને છે, જ્યાં ઘણી API કી એક જ અપસ્ટ્રીમ
એકાઉન્ટ શેર કરે છે. ત્રણ સ્તરો શેર કરેલા એકાઉન્ટને વિનંતીઓથી છલકાતું અટકાવે છે.

### પ્રતિ-કનેક્શન સમકાલીનતા મર્યાદા (`max_concurrent`)

દરેક પ્રોવાઇડર કનેક્શન `max_concurrent`ની મહત્તમ મર્યાદા જાહેર કરી શકે છે
(`provider_connections.max_concurrent`, જેને કનેક્શન મોડલ / API / DBમાં સેટ કરવામાં આવે છે).
કોઈ મર્યાદા ન રાખવા માટે તેને ખાલી છોડો. આ જ એકમાત્ર સેટિંગ છે જે નીચેના સિરિયલાઇઝેશન
સ્તરને નિયંત્રિત કરે છે — તેને એકાઉન્ટની વાસ્તવિક સમકાલીનતા પર સેટ કરો (દા.ત. GLM ~1, MiniMax ~2).

### ક્વોટા-શેર વિનંતી સિરિયલાઇઝેશન

જ્યારે ક્વોટા-શેર ડિસ્પેચ સકારાત્મક `max_concurrent` જાહેર કરતા કનેક્શનને લક્ષિત કરે છે,
ત્યારે તે **એકાઉન્ટ** માટેની સમકાલીન વિનંતીઓને પ્રતિ-કનેક્શન સેમાફોર
(કી `qsconn:<connectionId>`) મારફતે ક્રમબદ્ધ કરવામાં આવે છે: વધારાની વિનંતીઓ એકાઉન્ટને
છલકાવવાને બદલે **કતારમાં રાહ જુએ છે**. તે **fail-open** છે — સંતૃપ્ત કતાર અથવા
ટાઇમઆઉટ હોય ત્યારે, ડિસ્પેચ કરી શકાય તેવી વિનંતીને ક્યારેય નકારવાને બદલે સ્લોટ વિના
પ્રક્રિયા આગળ વધે છે. તેને **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ડિફૉલ્ટ રૂપે
ચાલુ)માં ટૉગલ કરો. `max_concurrent` મર્યાદા વિના વર્તન બદલાતું નથી.

> ક્વોટા-શેર રાઉટિંગ ગેટ (`selectQuotaShareTarget`, DRR + P2C) પોતે પણ
> fail-open છે અને મર્યાદા પર પહોંચેલા કનેક્શનને માત્ર _ઓછી પ્રાથમિકતા આપે છે_ —
> એક-કનેક્શન પૂલમાં તે કડક મર્યાદા લાગુ કરી શકતું નથી, તેથી આ સેમાફોર જ વાસ્તવમાં
> વિનંતીઓના ધસારાને નિયંત્રિત કરે છે.

### કોમ્બો કૂલડાઉન-અવેર પુનઃપ્રયાસ

દરેક કોમ્બો વ્યૂહરચના માટે (જ્યારે સક્ષમ હોય), SHORT ક્ષણિક કૂલડાઉન માટે 429ને
નિશ્ચિત કરી દે તેવી વિનંતી, 429 પરત કરવાને બદલે તે કૂલડાઉન સમાપ્ત થવાની રાહ જુએ છે
અને ફરીથી ડિસ્પેચ થાય છે — આ મલ્ટિ-મોડલ કોમ્બો પરના Gemini-શ્રેણીના TPM/RPM
વિન્ડો (~60s retry-after)ને આવરી લે છે, દા.ત. 2-મોડલ કોમ્બોના બંને લક્ષ્યો
પ્રતિ-મોડલ દર મર્યાદા સુધી પહોંચે ત્યારે. **Settings → Resilience**માં
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) દ્વારા
આ મર્યાદિત થાય છે. તે `quota_exhausted` (મધરાત સુધી લૉક થયેલું) અથવા
પ્રમાણીકરણ/ન મળવાનાં કારણો માટે ક્યારેય રાહ જોતું નથી.

---

## 5. વિનંતી કતાર પ્રવેશ નિયંત્રણ (v3.8.49 · issue #6593)

**વ્યાપ**: સ્થાનિક પ્રતિ-પ્રોવાઇડર+કનેક્શન દર-મર્યાદા કતાર
(`open-sse/services/rateLimitManager.ts`, Bottleneck દ્વારા સમર્થિત), ઉપરની ત્રણ
મિકેનિઝમથી એક સ્તર નીચે.

**`maxWaitMs` કતારમાં રાહ જોવાનો સમય મર્યાદિત કરે છે; `executionMaxWaitMs` અમલીકરણને મર્યાદિત કરે છે.**
બંનેને ઇરાદાપૂર્વક અલગ રાખવામાં આવ્યા છે અને કોઈ એક બીજાને પ્રભાવિત કરતું નથી.

`resilienceSettings.requestQueue.maxWaitMs` એ **કતાર-પ્રતીક્ષા બજેટ** છે: તે
પ્રોવાઇડર સ્લોટની રાહ જોવા અને ત્યારબાદ QUEUED સ્થિતિમાં રહેવાના સમયને આવરી લે છે,
અને જોબ QUEUED સ્થિતિ છોડીને અમલીકરણ શરૂ કરે તે જ ક્ષણે તેનું ટાઇમર સાફ કરવામાં
આવે છે (`rateLimitManager.ts`, `wrappedFn`). આ મર્યાદા વટાવતી વિનંતી ક્યારેય
અપસ્ટ્રીમ સુધી પહોંચતી નથી. ડિફૉલ્ટ 30000ms છે, જે
`src/lib/resilience/settings.ts`માં `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` દ્વારા
પૂરું પાડવામાં આવે છે અને `tests/unit/ratelimit-admission-control-6593.test.ts`
દ્વારા નિશ્ચિત કરવામાં આવ્યું છે, જેથી તેમાં ફેરફાર કરવાથી આ ફકરો ચૂપચાપ જૂનો
રહી જવાને બદલે તે ટેસ્ટ નિષ્ફળ થાય છે.

Bottleneckને જોબના `expiration` તરીકે `resilienceSettings.requestQueue.executionMaxWaitMs`
મળે છે, જેનું ટાઇમર ડિસ્પેચ પછી જ શરૂ થાય છે. પોતાના અપસ્ટ્રીમ ટાઇમઆઉટ વગરના
એક્ઝિક્યુટર્સ માટે તે બેકસ્ટોપ છે, અને જ્યારે એક્ઝિક્યુટરનો પોતાનો fetch-start
ટાઇમઆઉટ વધુ લાંબો હોય ત્યારે તેને તે સમય સુધી વધારવામાં આવે છે, જેથી તે કાર્યરત
ઇન-ફ્લાઇટ પ્રતિસાદને અધવચ્ચે બંધ ન કરી શકે. ડિફૉલ્ટ 600000ms (10 મિનિટ) છે.

કતાર બજેટને `expiration`માં આપવાને કારણે અગાઉ નોન-ઇન્ક્રિમેન્ટલ ગેટવે મધ્ય-પ્રક્રિયામાં
બંધ થઈ જતા હતા — પ્રથમ બાઇટ્સ આવે તે પહેલાં તેઓ વાજબી રીતે ઘણી મિનિટ સુધી ચાલે છે —
અને આ જ કારણ છે કે expirationને `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) તરીકે દર્શાવવામાં આવે છે, જ્યારે કતાર
બજેટ કતાર-ટાઇમઆઉટ કોડ ધરાવે છે. `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) અથવા ડૅશબોર્ડ
(**Settings → Resilience**) દ્વારા કોઈપણને ઓવરરાઇડ કરો. નોર્મલાઇઝ કરતી વખતે બંનેને
1ms–24hની મર્યાદામાં રાખવામાં આવે છે.

**બંને માટે અગ્રતા:** env var માત્ર _ડિફૉલ્ટ_ પૂરો પાડે છે.
`resilienceSettings.requestQueue`માં કાયમી સંગ્રહાયેલ મૂલ્ય (ડૅશબોર્ડ / API પૅચ,
`key_value`માં સંગ્રહાયેલ) તેના પર અગ્રતા ધરાવે છે, અને પ્રતિ-કનેક્શન
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` તેના પર અગ્રતા ધરાવે છે.
તેથી જે ડિપ્લોયમેન્ટમાં પહેલેથી કાયમી સંગ્રહાયેલ મૂલ્ય છે તેમાં env var સેટ કરવાથી
કંઈ બદલાતું નથી — તેના બદલે કાયમી સંગ્રહાયેલ સેટિંગ સાફ અથવા અપડેટ કરો.

કતારમાં રહેવાનો સમય `maxWaitMs` દ્વારા મર્યાદિત થાય છે; નીચેનું `maxQueueDepth`
એક જ સમયે કેટલા કૉલર્સ કતારમાં રહી શકે છે તે મર્યાદિત કરે છે.

**`maxQueueDepth` — વૈકલ્પિક પ્રવેશ મર્યાદા (નવી).** `resilienceSettings.requestQueue.maxQueueDepth`
એક પ્રોવાઇડર+કનેક્શન માટે એક જ સમયે કેટલી વિનંતીઓ કતારમાં (હજુ ડિસ્પેચ ન થયેલી)
રહી શકે છે તે મર્યાદિત કરે છે. જ્યારે કતારમાં પહેલેથી `maxQueueDepth` વિનંતીઓ હોય,
ત્યારે નવી વિનંતીને `limiter.schedule()` સુધી પહોંચે તે **પહેલાં** જ ટાઇપ કરેલી
`code: "RATE_LIMIT_QUEUE_FULL"` ભૂલ સાથે તરત નકારવામાં આવે છે — તેથી નકારવું
ઓછા ખર્ચે થાય છે અને તે વિનંતી માટેની કોઈપણ ડાઉનસ્ટ્રીમ પ્રોમ્પ્ટ-કમ્પ્રેશન /
અનુવાદ પ્રક્રિયા પહેલાં જ થાય છે. ડિફૉલ્ટ `0` = અક્ષમ, જે હાલનું અમર્યાદિત-કતાર
વર્તન જાળવી રાખે છે; મર્યાદા 0–100000. `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) અથવા
`resilienceSettings.requestQueue.maxQueueDepth` (ડૅશબોર્ડ/API પૅચ) દ્વારા ઓવરરાઇડ કરો.

પ્રવેશ તપાસ પોતે એક શુદ્ધ ફંક્શન છે
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), જેથી
વાસ્તવિક Bottleneck લિમિટર વિના તેનું યુનિટ-ટેસ્ટિંગ કરી શકાય છે.

> #6593 ખોલનાર RFCએ `bypassCompressionOnRateLimit`
> ફ્લૅગ પણ પ્રસ્તાવિત કર્યો હતો. આ રેપોની `open-sse/services/compression/` પાઇપલાઇન
> આઉટબાઉન્ડ LLM વિનંતી (`chatCore.ts`માં,
> `resolveCompressionSettings`/`selectCompressionStrategy` બ્લૉકની આસપાસ) પરનું
> પ્રૉમ્પ્ટ/કૉન્ટેક્સ્ટ કમ્પ્રેશન છે, સંશ્લેષિત 429 બૉડી પરનું HTTP પ્રતિસાદ કમ્પ્રેશન
> નથી — તેથી શાબ્દિક બાયપાસ ફ્લૅગ માટે કોઈ મેળ ખાતો કોડ પાથ નથી. તે
> પ્રૉમ્પ્ટ-કમ્પ્રેશન પગલું પણ હાલમાં વિનંતી પાઇપલાઇનમાં `withRateLimit()`ની
> _પહેલાં_ ચાલે છે, તેથી કતાર ભરેલી હોવાને કારણે થતી અસ્વીકૃતિ પર તેને છોડવા માટેનો
> ક્રમફેરફાર આ ઇશ્યૂના વ્યાપ કરતાં અલગ અને વધુ મોટો ફેરફાર છે; અહીં તેનો અમલ
> ઇરાદાપૂર્વક **કરવામાં આવ્યો નથી** અને જો CPUની બચતનો લાભ ક્રમફેરફારના જોખમને
> યોગ્ય ઠેરવે તો તેને અનુગામી કાર્ય તરીકે છોડવામાં આવ્યો છે.

---

## 6. ધીમા-સ્ટ્રીમ થ્રુપુટ વૉચડૉગ (#9709)

વૈકલ્પિક `resilienceSettings.streamRecovery.throughputWatchdog` ગાર્ડ એવા અપસ્ટ્રીમને શોધે છે જે હજી પણ ચંક્સ મોકલી રહ્યું હોય પરંતુ કૉન્ફિગર કરેલા ઉપયોગી-આઉટપુટ દર કરતાં ઓછું આસિસ્ટન્ટ આઉટપુટ ઉત્પન્ન કરતું હોય. તેને ઇરાદાપૂર્વક નિષ્ક્રિયતા સમયસમાપ્તિથી અલગ રાખવામાં આવ્યું છે: હાર્ટબીટ્સ અને મેટાડેટા કોઈપણ ટાઇમરને રીસેટ કરતા નથી અને પ્રગતિ તરીકે ગણાતા નથી. તે હાર્ડ પ્રયાસ સમયમર્યાદા (#9153)થી પણ અલગ છે, જે આઉટપુટની ગુણવત્તાને ધ્યાનમાં લીધા વિના સંપૂર્ણ સલામતી મર્યાદા તરીકે યથાવત્ રહે છે.

વૉચડૉગ એબોર્ટ કરી શકે તે પહેલાં તેને વૉર્મ-અપ અવધિ અને ત્યારબાદ એક સંપૂર્ણ રોલિંગ વિન્ડોની જરૂર પડે છે. તે Chat Completions અને Responses API આઉટપુટ ઇવેન્ટ્સમાંથી ટેક્સ્ટ ડેલ્ટાની ગણતરી કરે છે (UTF-8 બાઇટ્સ માટેના સાવચેતીભર્યા પ્રૉક્સી તરીકે), માત્ર વપરાશ ધરાવતી અને ખાલી ઇવેન્ટ્સને અવગણે છે, અને ટૂલ-કૉલ અથવા રીઝનિંગ ઇવેન્ટ્સ પ્રક્રિયામાં હોય ત્યારે મૂલ્યાંકન સ્થગિત રાખે છે. તે ડિફૉલ્ટ રૂપે અક્ષમ હોય છે અને `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` વડે સક્ષમ કરી શકાય છે; વિન્ડો, વૉર્મ-અપ, ન્યૂનતમ દર અને માપી શકાય તેવા ન્યૂનતમ આઉટપુટને સામાન્ય રેઝિલિયન્સ-સેટિંગ્સ નોર્મલાઇઝેશન લેયર દ્વારા મર્યાદિત કરવામાં આવે છે.

સક્ષમ હોય ત્યારે, વૉચડૉગ એબોર્ટ માત્ર સક્રિય અપસ્ટ્રીમ પ્રયાસ પર જ લાગુ કરવામાં આવે છે. ક્લાયન્ટને દેખાય એવા કોઈપણ બાઇટ્સ મોકલાતા પહેલાં, હાલનો સમાન-એકાઉન્ટ અર્લી-રિકવરી પાથ પ્રયાસને ફરી ખોલી શકે છે. કમિટ થયા પછી, સ્ટ્રીમને ક્યારેય આંધળાપણે ફરી ચલાવવામાં આવતું નથી; ફક્ત હાલનો સુરક્ષિત મિડ-સ્ટ્રીમ કન્ટિન્યુએશન કરાર જ સફિક્સને જોડી શકે છે. ફાઇનલાઇઝેશન એક જ વખત થાય છે, તેથી વપરાશનું એકાઉન્ટિંગ અને સેમાફોર રિલીઝ ડુપ્લિકેટ થતા નથી.

---

## 7. અપસ્ટ્રીમ સ્ટેટસનું પુનઃનિવેદન (ખોટી રીતે દર્શાવેલી ક્વોટા ભૂલો)

**વ્યાપ:** એક અપસ્ટ્રીમ ગેટવે જે અસ્થાયી ક્વોટા સમાપ્તિને ખોટા HTTP સ્ટેટસ સાથે રિપોર્ટ કરે છે.

**હેતુ:** વર્ગીકરણ પહેલાં ગેરમાર્ગે દોરતા સ્ટેટસને સુધારવું, જેથી ડાઉનસ્ટ્રીમ ઉપભોક્તાઓ (ફૉલબૅક એન્જિન, કૉમ્બો એગ્રીગેશન, ક્લાયન્ટને આપવામાં આવતો પ્રતિસાદ) નિષ્ફળતાનું સાચું, ફરી પ્રયાસ કરી શકાય તેવું સ્વરૂપ જોઈ શકે.

કેટલાક ગેટવે TEMPORARY ક્વોટા સમાપ્તિને ફરી પ્રયાસ ન કરી શકાય તેવા HTTP સ્ટેટસ વડે દર્શાવે છે. `agentrouter.org` માનક `429`ને બદલે ચાઇનીઝ બૉડી (`用户额度不足` / `额度不足`) સાથે `403` (ક્યારેક `400`) પરત કરે છે. Claude Code જેવા ક્લાયન્ટ્સ `403`ને કાયમી માને છે અને સેશન એબોર્ટ કરે છે, તેમજ સુધારા વિના ફૉલબૅક એન્જિન તેને ક્વોટા ઇવેન્ટને બદલે `AUTH_ERROR` તરીકે વર્ગીકૃત કરશે.

**અમલીકરણ:**

- રજિસ્ટ્રી + મૅચર: `open-sse/config/upstreamStatusRestatement.ts` — પ્રત્યેક પ્રોવાઇડર માટેના નિયમોની યાદી (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), જે `applyStatusRestatement()` દ્વારા મૅચ કરવામાં આવે છે.
- કૉલ સાઇટ: `open-sse/handlers/chatCore.ts`માં આવેલ `providerFailure:` બ્લૉક (લાઇન 3654ની આસપાસ), `parseUpstreamError()` દ્વારા ભૂલભર્યા HTTP સ્ટેટસ (`!providerResponse.ok`) સાથેના અપસ્ટ્રીમ પ્રતિસાદને પાર્સ કર્યા પછી તરત અને કોઈપણ વર્ગીકરણ ચાલે તે પહેલાં, જેથી દરેક ડાઉનસ્ટ્રીમ ઉપભોક્તા સુધારેલ સ્ટેટસ જોઈ શકે. `200` SSE સ્ટ્રીમની અંદર એમ્બેડ થયેલી ભૂલો અલગ, પાછળથી આવતો સ્ટ્રીમ-પાર્સિંગ પાથ અનુસરે છે અને આજે આ હૂક દ્વારા **આવરી લેવામાં આવતી નથી** — આ એક જાણીતી મર્યાદા છે, જે agentrouterના ખોટા સ્ટેટસ માટે હજી જરૂરી નથી (કારણ કે તે ભૂલભર્યા HTTP સ્ટેટસ તરીકે દેખાય છે).
- ફરી પ્રયાસ માટેની પાત્રતા: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`માં છે (`open-sse/services/combo/unavailableRetryGate.ts`), તેથી પુનઃનિવેદિત ભૂલ નિષ્ક્રિય `403` તરીકે દેખાવાને બદલે વાસ્તવિક ફરી-પ્રયાસ વિન્ડો ધરાવે છે.
- સિન્થેટિક `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) માત્ર એટલું જ છે જેટલું પુનઃનિવેદિત પ્રતિસાદ **ક્લાયન્ટને** જણાવે છે; તે પોતે કનેક્શનની આંતરિક કૂલડાઉન/લૉકઆઉટ અવધિ નથી — તેનું સંચાલન પુનઃનિવેદિત ભૂલને ખરેખર હેન્ડલ કરતી પદ્ધતિ દ્વારા અલગથી થાય છે (Connection Cooldownનું વધતું બૅકઑફ, §2, API-કી પ્રોવાઇડર્સ માટે મૂળ `3s`; અથવા agentrouter જેવા પ્રતિ-મૉડલ-ક્વોટા પ્રોવાઇડર્સ માટે Model Lockout, §3). ક્લાયન્ટને જણાવવામાં આવેલી 60s વિન્ડો કરતાં આંતરિક રીતે રાઉટર ફરી પ્રયાસ કરવા માટે વહેલું પાત્ર બની શકે છે — આ ઇરાદાપૂર્વક રાખેલો અવકાશ છે, બગ નહીં.

કાયમી ભૂલો (agentrouterનું `无权访问模型` — આ મૉડલની ઍક્સેસ નથી) ક્યારેય પુનઃનિવેદિત થતી નથી: `textMarkers` મૅચ થાય ત્યારે પણ `excludeMarkers` નિયમને વીટો કરે છે, તેથી ભૂલ પોતાનો મૂળ સ્ટેટસ જાળવી રાખે છે અને કોઈ વસ્તુ તેના માટે અનંતકાળ સુધી ફરી પ્રયાસ કરતી નથી. મૅચ થતો પ્રોવાઇડર વર્ગીકરણ નિયમ (`open-sse/config/providerErrorRules.ts`માં `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, જાહેર કરાયેલ `6h` મૂળ કૂલડાઉન) `checkFallbackError` (`open-sse/services/accountFallback.ts`) દ્વારા સામાન્ય apikey-કૅટેગરી `FORBIDDEN` અર્લી-રિટર્ન _પહેલાં_ જોવામાં આવે છે, જે `honorsRuleLockScope(provider)` પર ગેટેડ છે (#10334 — હાલમાં `providerErrorRules.ts`માં `HONORS_RULE_LOCK_SCOPE_PROVIDERS` અલાઉલિસ્ટ મારફતે ફક્ત agentrouter માટે). નિયમનો જાહેર કરાયેલ 6h કૂલડાઉન `fallbackResult.baseCooldownMs` તરીકે આગળ વહે છે, પરંતુ તે હજી પણ અગાઉથી અસ્તિત્વમાં રહેલા પ્રતિ-મૉડલ-ક્વોટા લૉકઆઉટ પાથ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, કૂલડાઉન સ્રોત સિવાય #10334 દ્વારા અપરિવર્તિત)માં જ જાય છે: દરેક અન્ય મૉડલ લૉકઆઉટની જેમ તેને ઑપરેટરના `mlSettings.maxCooldownMs` (ડિફૉલ્ટ `1_800_000ms` / 30min) સુધી નીચે મર્યાદિત કરવામાં આવે છે, અને _સંગ્રહિત લૉકઆઉટ કારણ_ નિયમના `"auth_error"`ને બદલે અગાઉથી અસ્તિત્વમાં રહેલું હાર્ડકોડ કરેલું `"forbidden"` જ રહે છે — એન્ડ-ટુ-એન્ડ માત્ર કૂલડાઉન અવધિ જ માન્ય રાખવામાં આવે છે, કારણ સ્ટ્રિંગ નહીં. કનેક્શન પોતે સક્રિય રહે છે; સમાન કનેક્શન પરનાં સિબ્લિંગ મૉડલ્સ પર કોઈ અસર થતી નથી.

પુનઃવ્યક્ત કરેલી ક્વોટા ભૂલો (`额度不足`) પ્રોડક્શનમાં પ્રદાતા નિયમ સુધી પહોંચે છે
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, તેનો પોતાનો કોઈ જાહેર કરાયેલ cooldown નથી — persistence layerનું
scaled backoff default લાગુ પડે છે). #10334થી, `ProviderErrorRuleMatch` પરનો
`scope` શરૂઆતથી અંત સુધી વપરાય છે, પરંતુ **ફક્ત** `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
allowlistમાં રહેલા પ્રદાતાઓ માટે (`providerErrorRules.ts` —
હાલમાં માત્ર `"agentrouter"`, `honorsRuleLockScope()` દ્વારા gated). અન્ય દરેક
પ્રદાતા માટે `scope` માત્ર માહિતીપ્રદ જ રહે છે, બિલકુલ #10334 પહેલાંની જેમ.
`checkFallbackError` મેળ ખાતા નિયમના scopeને
`fallbackResult.ruleScope` તરીકે પ્રદર્શિત કરે છે; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) એ shared guard છે જે ખાતરી કરે છે કે
`ruleScope`ને connection-wide, self-recovering signal તરીકે માન આપવું ખરેખર સુરક્ષિત છે
(scope `"connection"`, reason `quota_exhausted`, ક્યારેય `permanent` નહીં,
ક્યારેય `creditsExhausted` નહીં — ભવિષ્યના કોઈ નિયમ દ્વારા scope
`"connection"`ને permanent account state સાથે જોડવા સામેનું રક્ષણ). બે consumers તેને કૉલ કરે છે:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-providerની **per-model** lockout
  branchમાં જવાને બદલે (agentrouterમાં `passthroughModels: true` છે → `hasPerModelQuota()`
  `true` પરત કરે છે), તે **temporary connection cooldown** લાગુ કરે છે —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ક્યારેય terminal status નહીં
  (`credits_exhausted`/`banned`/`expired`) — જેથી cooldown સમાપ્ત થયા પછી connection
  પોતે recover થાય છે અને manual credential resetની જરૂર પડતી નથી.
  `disableCooling: true` ધરાવતા connections માટે આ છોડવામાં આવે છે (#2997): તે opt-out
  તેના બદલે per-model lockout તરફ જાય છે (એક દસ્તાવેજિત trade-off —
  branchની ઉપરની code comment જુઓ).
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): એ જ guard connectionને
  in-memory `exhaustedConnections` setમાં mark કરે છે, જેની key
  `${provider}:${connectionId}` છે. આ ફક્ત એવા બાકી રહેલા SAME-REQUEST
  targetને જ છોડે છે જે _પોતાના target object પર પહેલેથી જ એ જ ચોક્કસ `connectionId` ધરાવે છે_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` `exhaustedConnections` lookup પહેલાં) — plain
  model-list comboમાં, જ્યાં sibling targets પાસે પોતાનો pinned `connectionId` હોતો નથી
  અને responseના `X-OmniRoute-Selected-Connection-Id` headerમાંથી દરેક dispatch વખતે જ એક
  resolve થાય છે, ત્યાં એ key ક્યારેય match થતી નથી. એ સામાન્ય
  કિસ્સામાં, બાકી રહેલો leg હમણાં જ exhausted થયેલા accountનો ફરી ઉપયોગ ન કરે તે માટેનું
  વાસ્તવિક રક્ષણ આ Set નથી — તે ઉપરોક્ત persistence layer
  (connectionનું `rateLimitedUntil` હવે ભવિષ્યમાં છે) અને
  failure માટે `transientRateLimitedProviders`ને suppress કરતા આ જ guardનું સંયોજન છે
  ("Two-stage design" અને
  `targetExhaustion.ts`માં `isAgentrouterConnectionQuotaScope` branch પરની code comment જુઓ): જ્યારે
  તે Set unmarked રહે છે, ત્યારે `combo.ts`નું `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) પ્રદાતાના બાકી રહેલા legs માટે
  સક્રિય થતું નથી, તેથી credential selectionનું `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) સામાન્ય રીતે માનવામાં આવે છે અને
  બાકી રહેલો leg કાં તો અલગ, હજી પણ eligible agentrouter
  connection પસંદ કરે છે અથવા credentials ઉપલબ્ધ ન હોવાથી નિષ્ફળ જાય છે — તે આ branchએ હમણાં જ
  cooldown કરેલા connection પર બળજબરીથી પાછો જતો નથી.

### Two-stage design: statusનું પુનઃવક્તવ્ય, પછી classification

Status restatement (`upstreamStatusRestatement.ts`) અને provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) અલગ registries છે, જે બંને provider id
અને text markers પર key કરે છે, પરંતુ તેઓ અલગ જગ્યાએ ચાલે છે અને અલગ
હેતુઓ પૂરા કરે છે: restatement `chatCore.ts`માં HTTP statusને વહેલો rewrite કરે છે;
classification rules `checkFallbackError()`ની અંદર fallback `reason` અને lock `scope`
(`model` / `provider` / `connection`) પસંદ કરે છે
(`open-sse/services/accountFallback.ts`).

Classification rules ફક્ત `providerErrorRules.ts`ની `FULL_TEXT_RULE_PROVIDERS`
allowlistમાં સૂચિબદ્ધ પ્રદાતાઓ માટે જ સંપૂર્ણ error **text** જુએ છે (જે
`额度不足` જેવા body markers match કરવા જરૂરી છે) — હાલમાં માત્ર `"agentrouter"`.
અન્ય દરેક **built-in catalog** provider માટે, `checkFallbackError`
`getProviderErrorRuleMatch`ને ફક્ત structured error (`{code, type}`) આપે છે, જે
header/status/code આધારિત rules માટે પૂરતું છે, પરંતુ body-text markers જોઈ શકતું નથી.
`resolveRuleMatchBody()` helper આ પસંદગી કરે છે: allowlisted providers માટે સંપૂર્ણ error text,
અન્યથા structured error. કોઈ **built-in** providerને
`FULL_TEXT_RULE_PROVIDERS`માં ઉમેરવું એ સ્પષ્ટ per-provider opt-in છે — તેનો હેતુ
listમાં ન હોય તેવા દરેક provider માટેનો default path byte-for-byte અપરિવર્તિત
રાખવાનો છે.

કોઈ ruleનો `scope` (`model` / `provider` / `connection`) એ
`FULL_TEXT_RULE_PROVIDERS`થી અલગ opt-in છે: `checkFallbackError` તેને માત્ર
`fallbackResult.ruleScope` તરીકે પ્રદર્શિત કરે છે, અને downstream consumers તેને
માહિતીપ્રદ label સિવાય અન્ય કોઈ રીતે ફક્ત એ જ providers માટે માન આપે છે જે
આ જ fileની `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistમાં હોય (`gated via
honorsRuleLockScope()` — હાલમાં માત્ર `"agentrouter"`). જ્યારે કોઈ provider
તે allowlistમાં હોય ત્યારે `scope: "connection"` match વાસ્તવમાં શું કરે છે તે માટે ઉપરનું
"Restated quota errors" જુઓ.

**#11104 — ઑપરેટર દ્વારા જાહેર કરાયેલા નિયમો બંને allowlist ને બાયપાસ કરે છે.** ઑપરેટર
આ ફાઇલમાં ફેરફાર કર્યા વિના `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
દ્વારા રનટાઇમ પર પ્રતિ-provider નિયમ જાહેર કરી શકે છે. ઑપરેટર નિયમને
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` પાછળ ગેટ કરવાથી — આ allowlist
બિલ્ટ-ઇન કૅટલૉગ નિયમોની **ડિફૉલ્ટ** વર્તણૂકને સુરક્ષિત રાખવા માટે છે —
ત્યાં પહેલેથી સૂચિબદ્ધ providers સિવાય દરેક provider માટે settings મિકેનિઝમ
નિષ્ક્રિય થઈ જશે, કારણ કે નિયમ જાહેર કરવો એ પોતે જ ઑપરેટરની સ્પષ્ટ
opt-in છે. `resolveRuleMatchBody()` અને `honorsRuleLockScope()` બંને પહેલાં
`hasOperatorRuleForProvider()` તપાસે છે: ઑપરેટર નિયમ ધરાવતા provider ને
કાચું error text મળે છે અને તેના જાહેર કરેલા `scope` નું પાલન થાય છે, પછી ભલે
તે કોઈ એક allowlist માં પણ દેખાતું હોય કે ન હોય.

**જાણીતી ખામી — HTTP 400 માટે `providerRuleRegistry` ક્યારેય તપાસવામાં આવતું નથી.**
`checkFallbackError` ની `BAD_REQUEST` શાખા status 400 ને સંપૂર્ણપણે
પોતાની pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, વગેરે `accountFallback.ts` માં) દ્વારા વર્ગીકૃત કરે છે અને
તેની ઉપરની `configuredRule`/`getProviderErrorRuleMatch` શાખા સુધી પહોંચતા પહેલાં
return કરે છે. `status: 400` ધરાવતો બિલ્ટ-ઇન કૅટલૉગ નિયમ (અથવા ઑપરેટર નિયમ)
વાક્યરચનાની દૃષ્ટિએ માન્ય છે, પરંતુ ક્યારેય ટ્રિગર થશે નહીં. આજે કોઈ વર્તમાન નિયમ 400 ને લક્ષ્ય બનાવતો
નથી, તેથી production માં કંઈ અસર થતી નથી — પરંતુ ભાવિ 400 નિયમ માટે પહેલાં આ
શાખામાં ફેરફાર કરવો પડશે, જે નિયમ ઉમેરવા કરતાં મોટો ફેરફાર છે (તે
pattern-array વર્તણૂક પર પહેલેથી આધાર રાખતા દરેક provider માટે 400 નું ફરીથી વર્ગીકરણ
કરે છે) અને એક જ provider માટે નિયમ ઉમેરવાના કાર્યક્ષેત્રની બહાર છે.

### quota ને ખોટી રીતે રજૂ કરતું નવું gateway ઉમેરવું

1. `statusRestatementRegistry` માં એક rule array રજીસ્ટર કરો
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` ને
   provider-વિશિષ્ટ રાખો; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) સાથે ટકરાતા સામાન્ય અંગ્રેજી શબ્દસમૂહોનો ક્યારેય પુનઃઉપયોગ કરશો નહીં.
2. યોગ્ય lock scope પસંદ કરવા માટે વૈકલ્પિક રીતે
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) માં classification rules રજીસ્ટર કરો
   (સમગ્ર account માટેના quota માટે `connection`, પ્રતિ-model errors માટે `model`).
   આ પગલું production માં માત્ર એવા providers માટે અસરકારક બને છે જેમના નિયમોને સંપૂર્ણ
   error text (body markers) જરૂરી હોય: એ જ ફાઇલમાં provider id ને
   `FULL_TEXT_RULE_PROVIDERS` માં ઉમેરો — અન્યથા `checkFallbackError` નિયમને માત્ર
   structured `{code, type}` error જ આપે છે અને body-text rule live traffic સાથે
   ક્યારેય match નહીં થાય. માત્ર `status`/`headers` પર match થતા નિયમો (જેમ કે Opencode ના અથવા
   Minimax ના) માટે આ opt-in જરૂરી નથી. અલગથી, જો નિયમ
   `scope: "connection"` જાહેર કરે અને હેતુ માત્ર માહિતીપ્રદ label ને બદલે વાસ્તવિક
   connection-wide cooldown તથા same-request combo skip હોય, તો એ જ ફાઇલમાં
   provider id ને `HONORS_RULE_LOCK_SCOPE_PROVIDERS` માં ઉમેરો — આ
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) અને
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) માં
   `isAgentrouterConnectionQuotaScope()`-શૈલીના consumption ને ગેટ કરે છે; તેના વિના `scope`
   હજી પણ `fallbackResult.ruleScope` મારફતે આગળ વહે છે, પરંતુ તેના પર કોઈ ક્રિયા થતી નથી.
3. `tests/unit/upstream-status-restatement.test.ts`
   અને `tests/unit/agentrouter-error-rules.test.ts` ને અનુરૂપ unit tests ઉમેરો (`not-permanent` /
   `not-creditsExhausted` guards સહિત, અને — જો provider ને
   allowlist જરૂરી હોય — માત્ર તે provider માટે `resolveRuleMatchBody()` સંપૂર્ણ text
   return કરે છે તે ચકાસતો test પણ ઉમેરો).

`chatCore.ts`, `classifyError`, અથવા combo માં કોઈ ફેરફાર જરૂરી નથી.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` માંના providers (opencode family) ને
IP-bucketed upstream તરીકે ગણવામાં આવે છે (opencode free tier IP-bucketed છે,
account-bucketed નહીં — #9611 જુઓ): `quota_exhausted`
**અથવા** `rate_limit_exceeded` તરીકે વર્ગીકૃત status-429, rotation તેમને અજમાવી શકે તે પહેલાં,
એવા દરેક allowlisted-family connection ને cooldown કરે છે જેનો છેલ્લો જાણીતો egress IP
નિષ્ફળ ગયેલા connection ના IP સાથે match થાય છે
— જેથી N-1 નિશ્ચિતપણે નિષ્ફળ થનારા upstream calls ટાળી શકાય (#10460/#10525 જેવો જ આકાર).
`rate_limit_exceeded` ને ઇરાદાપૂર્વક સામેલ કરવામાં આવ્યું છે: `markAccountUnavailable`
path પર opencode-વિશિષ્ટ નિયમો ક્યારેય match થતા નથી (કોઈ headers/body
`checkFallbackError` ને આપવામાં આવતાં નથી, opencode `FULL_TEXT_RULE_PROVIDERS` માં નથી), તેથી એવો 429
જેના body માં subscription-quota text ("monthly usage limit
reached") હોય તે `status_429` rule સુધી પહોંચે તે પહેલાં quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) દ્વારા
`quota_exhausted` તરીકે વર્ગીકૃત થાય છે — જ્યારે quota-text વિનાનો 429 (સામાન્ય
rate limiting) `status_429` rule દ્વારા `rate_limit_exceeded` તરીકે વર્ગીકૃત થાય છે
અને હજી પણ IP family ને cooldown કરે છે. allowlisted provider માટે IP-bucketed
rate limit એ exhausted quota જેટલો જ સંકેત છે. વાસ્તવિક મર્યાદાઓ:

- **શ્રેષ્ઠ પ્રયાસ**: લૉક `proxy_logs`માંથી કનેક્શનનું છેલ્લે જાણીતું `egress_ip`
  મેળવે છે (24 કલાકની વિન્ડો, synchronous, કોઈ cache નહીં). Cold cache (egress
  IP ક્યારેય probe કરવામાં આવ્યો ન હોય) અથવા કોઈ row ન હોય → નિષ્ફળ કનેક્શનને
  branch દ્વારા હજી પણ cooldown કરવામાં આવે છે (આજની જેમ જ નોંધવામાં આવે છે), ફક્ત કોઈ sibling લૉક થતું નથી.
- **ક્યારેય terminal નહીં**: cooldown એ નવીકરણ થતી quota window છે
  (`testStatus: "unavailable"`); IP-સ્તરના signal પરથી ક્યારેય permanent state
  મેળવવામાં આવતી નથી. `disableCooling` કનેક્શન્સ branchને સંપૂર્ણપણે અવગણે છે.
- **Allowlisted family માટે લૉકની granularity બદલાય છે**: આ scope
  ફેરફાર છે, માત્ર sibling optimization નથી. opencode એક `passthroughModels`
  provider છે, તેથી આ branch પહેલાં 429ના કારણે પ્રતિ-MODEL lockout થતું હતું; હવે તે
  connection cooldown સર્જે છે — જેમાં કોઈ sibling વિનાનું એકમાત્ર
  connection ચલાવતો operator પણ સામેલ છે. opencode rule
  tableમાં પહેલેથી જ આ granularityને યોગ્ય જાહેર કરવામાં આવી છે (`scope: "connection"`,
  `providerErrorRules.ts`), પરંતુ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`માં ન હોવાથી અત્યાર સુધી તેનું પાલન થયું નહોતું. આ branch,
  connection-scoped agentrouter branchને અનુરૂપ રીતે, નિષ્ફળ
  connectionનું cooldown + `backoffLevel` જાતે લખે છે અને return થાય છે — નીચેનો per-model block અને
  generic path ક્યારેય પહોંચતા નથી.
- **Combo સામેલ છે**: agentrouter branchની જેમ, scope ઈરાદાપૂર્વક
  combo caller દ્વારા 429 પર લાગુ કરવામાં આવતા `persistUnavailableState`/`isCombo` downgradeને
  અવગણે છે. Per-model lockout આ scopeનું નબળું સ્વરૂપ નથી,
  તે ખોટું unit છે: તે exhausted IP વિશે કંઈ જણાવતું નથી, તેથી combo
  rotation દરેક sibling દીઠ એક નિષ્ફળ થવાની ખાતરીવાળો call કરવાનું ચાલુ રાખશે.
- **Sibling સુરક્ષા**: પહેલેથી terminal (banned/credits_exhausted)
  અથવા પહેલેથી વધુ લાંબા cooldownમાં રહેલા siblingને ક્યારેય overwrite કરવામાં આવતું નથી.
- **વિશિષ્ટ allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ને વિસ્તૃત કરવું એ
  સ્પષ્ટ owner નિર્ણય છે; કોઈ generic wiring નથી (pattern #10334/#10419). આ
  sibling query તેને SQL
  literal તરીકે ફરી લખવાને બદલે એ જ allowlistને bind કરે છે, જેથી તેને વિસ્તૃત કરવું એક-line ફેરફાર જ રહે છે.
- **Egress IP rotation, બંને દિશામાં**: lookup window (24h), egress-IP cache TTL (5 min) કરતાં ઘણી
  વિશાળ છે, તેથી "છેલ્લે જાણીતું IP" history છે,
  current state નહીં. જો કોઈ connectionનો proxy આ windowની અંદર rotate થયો હોય, તો
  લૉક ખરેખર shared IPને **ચૂકી** શકે છે (નોંધાયેલ IP નવું,
  unexhausted IP છે) — અને તે જ રીતે તે exhausted IPથી હવે
  દૂર rotate થઈ ગયેલા siblingને **cooldown કરી શકે છે**. બીજા કિસ્સામાં તે siblingને એક
  cooldown window જેટલો ખર્ચ થાય છે; બંનેને history-based
  lookupની સ્વીકાર્ય best-effort મર્યાદાઓ ગણવામાં આવે છે.
- **ખર્ચ**: `proxy_logs`ના બે bounded scans (`idx_pl_timestamp` મારફતે
  window-filtered), ફક્ત 429ની આવર્તન પર. કોઈ નવો index નહીં (migration 134
  YAGNI). મધ્યમ કદની real-traffic DB copy પર માપવામાં આવ્યું છે; વધુ
  throughput ધરાવતું instance એ જ windowમાં પ્રમાણસર વધુ rows રાખે છે.

---

## અન્ય સ્થિતિસ્થાપકતા સુવિધાઓ

- **19 રૂટિંગ વ્યૂહરચનાઓ** (પ્રાથમિકતા, ભારિત, રાઉન્ડ-રોબિન, કોન્ટેક્સ્ટ-રિલે, પહેલાં-ભરો, p2c, રેન્ડમ, સૌથી-ઓછું-વપરાયેલ, ખર્ચ-ઑપ્ટિમાઇઝ્ડ, રીસેટ-અવેર, રીસેટ-વિન્ડો, હેડરૂમ, સ્ટ્રિક્ટ-રેન્ડમ, ઑટો, lkgp, કોન્ટેક્સ્ટ-ઑપ્ટિમાઇઝ્ડ, કૅશ-ઑપ્ટિમાઇઝ્ડ, ફ્યુઝન, પાઇપલાઇન) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) જુઓ.
- **રીસેટ-અવેર રૂટિંગ** (v3.8.0) — ક્વોટા રીસેટ સમયના આધારે કનેક્શન્સને પ્રાથમિકતા આપે છે.
- **બૅકગ્રાઉન્ડ મોડ ડિગ્રેડેશન** — ચેતવણી સાથે Responses API `background: true` ને સિંક મોડમાં ડિગ્રેડ કરવામાં આવે છે.
- **ડાયનેમિક ટૂલ મર્યાદા શોધ** — ટૂલની સંખ્યા મર્યાદા સુધી પહોંચે ત્યારે પ્રદાતાઓ પરથી પાછું હટે છે.
- **કટોકટી ફૉલબૅક** — `OMNIROUTE_EMERGENCY_FALLBACK` દ્વારા નિયંત્રિત; ઑપરેટર્સ રીસ્ટાર્ટ કર્યા વિના Feature Flags પેજ પરથી તેને ઓવરરાઇડ કરી શકે છે.

---

## ડિબગિંગ

- ભારિત કૉમ્બો `503 all_targets_cooling_down` જવાબ આપે (`Retry-After` સેટ હોય અને `diagnostics.excluded` દરેક ટાર્ગેટને `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` સાથે સૂચિબદ્ધ કરે) → પૂલ કૉન્ફિગર અને કનેક્ટ થયેલો છે, પરંતુ દરેક ટાર્ગેટ સ્થિતિસ્થાપકતા ટાઇમર દ્વારા બાકાત કરાયેલો છે; `[COMBO] Weighted selection: every target excluded before dispatch — …` ચેતવણી કારણો અને બાકી રહેલી સેકન્ડ્સ દર્શાવે છે. એ જ કૉમ્બોમાંથી મળતા `404 no_executable_targets` નો અર્થ છે કે કોઈ સ્થિતિસ્થાપકતા ટાઇમર સામેલ નહોતો (ચલાવવા માટે કશું નહોતું અથવા દરેક એકાઉન્ટ ઉપલબ્ધતા પ્રોબમાં નિષ્ફળ ગયું). `targetResolution.ts` માં એકત્રિત કરાયેલા અપવર્જનોમાંથી `open-sse/services/combo/pinRecovery.ts` માં બનાવવામાં આવ્યું છે.
- પ્રદાતા માટેની બધી કીઝ સ્કિપ થાય → સર્કિટ બ્રેકરની સ્થિતિ અને દરેક કનેક્શનનું `rateLimitedUntil`/`testStatus`, બંને તપાસો.
- રીસેટ વિન્ડો પછી પ્રદાતા કાયમ માટે બાકાત થાય → કોડ `getStatus()`/`canExecute()` ને બદલે કાચી `state` વાંચી રહ્યો છે.
- એક કી નિષ્ફળ જાય, પણ અન્ય કીઝે કામ કરવું જોઈએ → સર્કિટ બ્રેકર કરતાં કનેક્શન કૂલડાઉનને પ્રાધાન્ય આપો.
- માત્ર એક મૉડલ નિષ્ફળ જાય → કનેક્શન કૂલડાઉન કરતાં મૉડલ લૉકઆઉટને પ્રાધાન્ય આપો.
- સ્થિતિએ આપમેળે પુનઃપ્રાપ્ત થવું જોઈએ, પરંતુ થતી નથી → ભવિષ્યનો ટાઇમસ્ટૅમ્પ અને સમાપ્ત થયેલી સ્થિતિને રિફ્રેશ કરતો રીડ પાથ તપાસો. કાયમી સ્ટેટસ માટે મૅન્યુઅલ ફેરફારો જરૂરી છે.

---

## TLS ફિંગરપ્રિન્ટિંગ અને સ્ટેલ્થ

પ્રદાતા-વિશિષ્ટ સ્ટેલ્થ (JA3/JA4, CCH, ઑબ્ફસ્કેશન) અલગથી દસ્તાવેજીકૃત છે — `docs/security/STEALTH_GUIDE.md` જુઓ (git; `/docs` માં કમ્પાઇલ કરેલું નથી).

---

## સ્થિતિસ્થાપકતા પરીક્ષણ (તબક્કો 8 · બ્લૉક C)

સ્થિતિસ્થાપકતા લૉજિક માટેના યુનિટ ટેસ્ટ ઉપરાંત, ત્રણ ટેસ્ટ વાસ્તવિક તણાવ/નિષ્ફળતા પરિસ્થિતિઓ હેઠળ
રનટાઇમનું પરીક્ષણ કરે છે (બધા ઇન્ટિગ્રેશન/નાઇટલી — કોઈપણ PR ને બ્લૉક કરતા નથી):

| ટેસ્ટ      | શું                                                                                                                                                                                                                 | ચલાવવું                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| કેઓસ       | નકલી-અપસ્ટ્રીમ નોડ વાસ્તવિક લેટન્સી/રીસેટ/ટાઇમઆઉટ/503 દાખલ કરે છે; સર્કિટ બ્રેકર ખુલે/પુનઃપ્રાપ્ત થાય છે અને `checkFallbackError` 503 ને પુનઃપ્રાપ્ત કરી શકાય તેવા ફૉલબૅક તરીકે વર્ગીકૃત કરે છે તેની ચકાસણી કરે છે. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| હીપ-વૃદ્ધિ | `--expose-gc` હેઠળ પ્રત્યેક `createSSEStream` માટે ~500 સ્ટ્રીમ્સ; હીપ મર્યાદાથી વધુ વધે તો નિષ્ફળ થાય છે (OOM ગાર્ડ #3069).                                                                                        | `npm run test:heap`                     |
| k6 સોક     | `/api/monitoring/health` પર સતત લોડ; p95/ભૂલ થ્રેશોલ્ડ્સ.                                                                                                                                                           | `k6 run tests/load/k6-soak.js` (નાઇટલી) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) દ્વારા ઑર્કેસ્ટ્રેટ કરેલું છે. ડિફૉલ્ટ
`test:integration` માં, કેઓસ અને હીપ પોતાને સ્કિપ કરે છે (`RUN_CHAOS_INT`/`--expose-gc` વિના).

---

## આ પણ જુઓ

- [આર્કિટેક્ચર માર્ગદર્શિકા](./ARCHITECTURE.md) — સિસ્ટમ આર્કિટેક્ચર અને આંતરિક રચના
- [વપરાશકર્તા માર્ગદર્શિકા](../guides/USER_GUIDE.md) — પ્રદાતાઓ, કોમ્બોઝ, CLI એકીકરણ
- [ઑટો-કોમ્બો એન્જિન](../routing/AUTO-COMBO.md) — 16-પરિબળ સ્કોરિંગ, મોડ પૅક્સ
