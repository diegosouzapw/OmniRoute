# Resilience Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute හි වෙනස් නමුත් අන්යෝන්යව සම්බන්ධ resilience යාන්ත්රණ තුනක් ඇත. සෑම එකක්ම වෙනස් විෂය පථයක් සහ අරමුණක් ඇත. Routing හැසිරීම debug කරන විට ඒවා වෙන වෙනම තබා ගන්න.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> මූලාශ්රය: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**විෂය පථය:** සම්පූර්ණ provider එක (උදා., `glm`, `openai`, `anthropic`).

**අරමුණ:** upstream/service මට්ටමින් නැවත නැවත අසාර්ථක වන provider කෙනෙකු වෙත යානා යැවීම නවත්වා දැමීම.

**ක්රියාත්මක කිරීම:**

- ප්රධාන class එක: `src/shared/utils/circuitBreaker.ts`
- සම්බන්ධ කිරීම: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- තත්ත්ව API එක: `GET /api/monitoring/health`
- Reset API එක: `POST /api/resilience/reset`
- Wrapper ඒවා: `open-sse/services/accountFallback.ts`
- DB වගුව: `domain_circuit_breakers`

**තත්ත්ව:**

- `CLOSED` — සාමාන්ය යානා වලට අවසර ඇත
- `DEGRADED` — යානා තවමත් වලට අවසර ඇත, නමුත් ඉහළ ගිය provider අසාර්ථකතා නිරීක්ෂණය කරමින් සිටී; ප්රමාණවත් සාර්ථකත්වයන් මත, වලංගු සම්බන්ධතා පරීක්ෂණයක් මත, හෝ අවසාන අසාර්ථක වර්ගය සඳහා දිගම `OPEN` රඳවා තැබීමෙන් පසු (එහි `cooldownByKind` අගය, නැතිනම් `resetTimeout`, × `maxBackoffMultiplier`, අවම වශයෙන් එක් cooldown එකක්) අලුත් අසාර්ථකත්වයක් නොමැතිව `CLOSED` වෙත ආපසු යයි
- `OPEN` — provider තාවකාලිකව අවහිර කර ඇත; combo routing එය මඟහරියි
- `HALF_OPEN` — reset කාලසීමාව ගෙවී ගොස් ඇත; probe ඉල්ලීමට අවසර ඇත

**වින්යාසගත කළ හැකි පෙරනිමි (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience හි නිරාවරණය වේ):**

| පන්තිය  | Degraded වන්නේ | විවෘත වන්නේ  | Reset කාලසීමාව |
| ------- | -------------- | ------------ | -------------- |
| OAuth   | අසාර්ථකතා 5    | අසාර්ථකතා 8  | 60s            |
| API-key | අසාර්ථකතා 7    | අසාර්ථකතා 12 | 30s            |
| Local   | ව්යුත්පන්න     | අසාර්ථකතා 2  | 15s            |

`degradationThreshold` මඟින් provider කෙනෙක් `DEGRADED` වෙත ඇතුළු වන අවස්ථාව පාලනය කරයි; `failureThreshold` මඟින් එය විවෘත වී මඟහරින අවස්ථාව පාලනය කරයි. Local provider profile ඒවා තවම Resilience settings පිටුවේ නිරාවරණය නොවේ.

**Trip කේත:** provider මට්ටමේ තත්ත්ව `[408, 500, 502, 503, 504]` පමණි. Account මට්ටමේ දෝෂ සඳහා trip නොවන්න (බොහෝ 401/403/429 — ඒවා cooldown හෝ lockout වෙත අයත් වේ).

**කම්මැලි ප්රතිසාධනය:** `OPEN` එක කල් ඉකුත් වූ විට, `getStatus()`, `canExecute()`, `getRetryAfterMs()` මඟින් තත්ත්වය `HALF_OPEN` වෙත නැවුම් කරයි. එම කියවීම්ම (සහ ඊළඟ අසාර්ථකත්වය) කල් ඉකුත් වූ `DEGRADED` එකක් `CLOSED` වෙත හීන කරයි. පසුබිම් timer එකක් අවශ්ය නොවේ.

---

### තේරීම්-පාදක ගෝලීය Provider Cooldown (කවුළු දොරටුව)

සිව්වන, **තේරීම්-පාදක** ස්ථරයක් (`PROVIDER_COOLDOWN_ENABLED`, පෙරනිමිය **අක්රිය**) අසාර්ථක වන provider ඒවා පිළිබඳ ඉල්ලීම්-හරහා මතකයක්
`open-sse/services/providerCooldownTracker.ts` හි තබා ගනී, එය combo target
නිරාකරණය විසින් සලකා බැලෙන අතර, එමඟින් අඛණ්ඩ combo ඉල්ලීම් මඳ වේලාවකට පෙර අසාර්ථක වූ
provider එකක් නැවත ගමන් කිරීම නවත්වයි. Provider මට්ටමේ ඇතුළත් කිරීම්
`PROVIDER_PROFILES` කවුළු දොරටුවට ගරු කරයි:

| Profile | ඉන් පසු trip වේ (`providerFailureThreshold`) | තුළ (`providerFailureWindowMs`) | cooldown වන්නේ (`providerCooldownMs`) |
| ------- | -------------------------------------------: | ------------------------------: | ------------------------------------: |
| OAuth   |                                         `10` |                         `15min` |                                `5min` |
| API key |                                         `15` |                         `30min` |                               `10min` |

සීමාවට වඩා අඩුවෙන් provider එක cooling ලෙස සැලකෙන්නේ **නැත**; සාර්ථකත්වයක්
කවුළුව මකා දමයි. සම්බන්ධතා මට්ටමේ ඇතුළත් කිරීම් (`provider:connectionId`) ඒ වෙනුවට
ඝාතීය `minRetryCooldownMs → maxRetryCooldownMs` backoff එක තබා ගනී. අභිබවා යාම්:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regression ආරක්ෂකය: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. සම්බන්ධතා සිසිල්නය (Cooldown)

**විෂය පථය:** තනි provider සම්බන්ධතාවයක්/ගිණුමක්/යතුරක්.

**අරමුණ:** එකම provider සඳහා ඇති අනෙක් සම්බන්ධතා සේවය කරමින් සිටියදී, දෝෂයට පත් එක් යතුරක් මඟහැරීම.

**ක්රියාත්මක කිරීම:**

- ලබාගත නොහැකි බව සලකුණු කිරීම: `src/sse/services/auth.ts::markAccountUnavailable()`
- තේරීම: එම ගොනුවේම `getProviderCredentials*`
- සිසිල්න ගණනය: `open-sse/services/accountFallback.ts::checkFallbackError()`
- සැකසුම්: `src/lib/resilience/settings.ts`

**සම්බන්ධතාවයකට අදාල ක්ෂේත්ර:**

- `rateLimitedUntil` — සිසිල්නය අවසන් වන තෙක් කාලමුහුණ (timestamp)
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ඝාතීය backoff ගණිකය

**පෙරනිමි සිසිල්න කාල:**

- OAuth මූලික: 5s
- API-යතුර මූලික: 3s
- API-යතුර 429: upstream `Retry-After`/reset headers/විග්රහ කළ හැකි reset පෙළ වලට ප්රමුඛතාව දෙයි
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Thundering-herd-විරෝධී ආරක්ෂාව:** එකවර සිදුවන අසාර්ථක වීම් නිසා සිසිල්නය අධික ලෙස දීර්ඝ වීම හෝ `backoffLevel` දෙවරක් ඉහළ යාම වළක්වයි.

**Concurrency-limit 429 දෝෂ backoff පඩිපෙළ ඉහළ නොයයි.** සමවර්තීතා සීමාවක් වාර්තා කරන body එකක්
සහිත `429` එකක් ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) යනු ගිණුම සෞඛ්ය සම්පන්න නමුත් කාර්යබහුල බවයි.
`checkFallbackError()` `concurrency_limited` යන හේතුව ලබා දෙයි: දැන්ම ඊළඟ
සම්බන්ධතාවයට fail over කරන්න, මෙම සම්බන්ධතාවය ස්ථාවර `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s)
කාලයක් හෝ upstream retry ඉඟිය තරම් කාලයක් සිසිල් කරන්න, `backoffLevel` වෙනස් නොකර
තබන්න, සහ `skipProviderBreaker` සකසන්න.
පැහැදිලි quota body එකක් තවමත් ජය ගනී, එබැවින් quota රටාවකටද ගැළපෙන body එකක් quota
තීන්දුවක් ලෙසම රැඳේ. හඳුනාගැනීම: `src/shared/utils/classify429.ts` හි
`looksLikeConcurrencyLimit()`; තීන්දුව: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (breaker එකේ `FailureKind`) වෙනස් නොවන අතර මෙම body සඳහා තවමත්
`rate_limit` ලෙස කියවයි.

**Stream අන්තර්ගත ඇනහිටීම් ගිණුම සිසිල් නොකරයි.** අන්තර්ගත-ඇනහිටීමේ watchdog එක
(`open-sse/utils/streamHandler.ts`) නියමිත වේලාවට model ප්රතිදානයක් එවූ නොමැති stream එකක්
අත්හැරිය විට, `markAccountUnavailable()` සම්බන්ධතාවය මත දෝෂය සටහන් කරයි නමුත් කිසිදු
සිසිල්නයක් සකසන්නේ නැත: ඇනහිටීම එම request එකටම අයත් වේ, බොහෝ විට එය තවම ප්රතිදානයක්
නොමැති දිගු reasoning වටයකි. Operators ට `resilienceSettings.streamStallCooldown.enabled`
(පෙරනිමිය `false`) මඟින් නැවත එය සක්රිය කරගත හැක.

**Reasoning frames අන්තර්ගත-ඇනහිටීමේ කාල වට්ටුව නැවත ආරම්භ කරයි.** reasoning model එකක්
සිය පළමු දෘශ්ය token එකට පෙර මිනිත්තු ගණනක් සිතිය හැක: Claude, thinking පෙළ හිස් විය හැකි
`thinking_delta` frames stream කරයි, සහ Responses API එක reasoning අයිතම එකින් එක
stream කරයි. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) මෙම frames
හඳුනා ගනී, සහ watchdog එක වටය අවලංගු කිරීම වෙනුවට එක් එක frame එකේදී තම කාල වට්ටුව
නැවත ආරම්භ කරයි. ඒවා තවමත් model ප්රතිදානය නොවන බැවින්, reasoning පමණින් අවසන් වන වටයක්
තවමත් හිස් ලෙස වාර්තා වේ, සහ reasoning නවත්වා heartbeats පමණක් යවන වටයක් තවමත්
watchdog එක ක්රියාත්මක කරවයි.

හිස් නොවන signature එකක් ඇති Kiro හි binary `reasoningContentEvent` frames, මෙම reasoning
ක්රියාකාරීත්වය executor එක හරහා හිස් `reasoning_content` delta එකක් ලෙස රැක ගනී. signature
එක ඉදිරියට යවනු නොලැබේ. metadata, අසම්පූර්ණ frames සහ හිස් signatures අන්තර්ගත කාල
වට්ටුව නැවත ආරම්භ නොකරයි; ස්වාධීන active-stream timeout එක සහ client අවලංගු කිරීම තවමත්
අදාල වේ (`open-sse/executors/kiro/reasoning.ts`).

**අවසන් තත්ත්ව (සිසිල්න නොවේ):**

- `banned` — banned-keyword / ගිණුම-තහනම හඳුනාගැනීමෙන් සකසනු ලැබේ (බලන්න [BAN_DETECTION](../security/BAN_DETECTION.md)), සහ අඛණ්ඩ upstream per-request ප්රතික්ෂේප තුනකින් (`request_rejected`, උදා. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); තනි ප්රතික්ෂේපයක් සම්බන්ධතාවය සිසිල් කරයි පමණි
- `expired` (සීමා සහිත නැවත උත්සාහවලින් පසු අවසන් තත්ත්වයට මාරු වේ — `EXPIRED_RETRY_MAX = 3` ඝාතීය backoff සමඟ — එබැවින් ගිණුම ස්ථිරවම අක්රිය වීමට පෙර තාවකාලික OAuth දෝෂ ස්වයංව සුව විය හැක)
- `credits_exhausted`

මේවා credentials වෙනස් වන තෙක් හෝ operator කෙනෙකු ඒවා reset කරන තෙක් පවතී. අවසන් තත්ත්ව තාවකාලික සිසිල්න තත්ත්වයකින් උඩින් ලියන්න එපා.

**කම්මැලි ප්රතිසාධනය (lazy recovery):** `rateLimitedUntil` පසු වූ පසු, සම්බන්ධතාවය නැවත සුදුසුකම් ලබයි. සාර්ථක භාවිතයකදී, `clearAccountError()` සියලු දෝෂ ක්ෂේත්ර හිස් කරයි.

### Claude OAuth භාවිත බිත්තිය: පහළ-ප්රමුඛතා මාර්ගය + session-සීමා reset

**විෂය පථය:** එක් Claude දායකත්ව (OAuth) සම්බන්ධතාවයක්. විශේෂාංග දෙකම **සම්බන්ධතාවයකට
opt-in** වේ (සම්බන්ධතාවය සංස්කරණය → Claude කොටස → `providerSpecificData` තුළ
`lowPriorityMode` / `autoLimitReset`, දෙකම පෙරනිමියෙන් අක්රිය) සහ Claude Code හි
`/low-priority` සහ `/limit-reset` විධානවල කැඩපතක් වේ (wire contract එක Claude Code
2.1.263 වෙතින් ගත්තකි).

**ක්රියාත්මක කිරීම:**

- State machine + ප්රතිචාර වර්ගීකරණය: `open-sse/services/claudeLowPriority.ts`
- Reset තත්ත්ව/claim client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header එන්නත් කිරීම + එකම-ගිණුම නැවත උත්සාහය): `open-sse/executors/base.ts::execute()`
- Opt-in ස්ථායී ගබඩා කිරීම: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ප්රේරකය (trigger):** පැය-5 භාවිත බිත්තිය — headers හි
`anthropic-ratelimit-unified-status: rejected` සහ, ගිණුම සුදුසු වූ විට,
`anthropic-ratelimit-unified-slow-offer: treatment` දරන `429` එකක්. එම පළමු බිත්ති 429
එකට පෙර කිසිවක් යවනු නොලැබේ; unified headers නොමැති burst 429 එකක් සාමාන්ය සිසිල්න
මාර්ගය හරහා යයි.

**පහළ-ප්රමුඛතා මාර්ගය** (`lowPriorityMode`):

- බිත්තියේ 429 එකේදී, executor එක offer එක පිළිගෙන වහාම **එකම** ගිණුම `anthropic-usage-limit: slow` සමඟ නැවත උත්සාහ කරයි; ප්රකාශිත `anthropic-ratelimit-unified-reset` (+තත්පර 60ක සුළු සහන කාලය) දක්වා lane එක සක්රීයව පවතින අතර එම කාල සීමාව තුළ සිදුවන සෑම ඉල්ලීමක්ම එම header එක දරයි. අතරමැදිව ලැබුණු 429 කිසිදා `handleChatCore` වෙත ළඟා නොවන බැවින්, සම්බන්ධතාවය cooldown තත්ත්වයට **නො** පත්වන අතර ඉවත් කර භ්රමණය නොකෙරේ.
- පසුව එන ප්රතිචාරවල `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` යන අගයන් lane එක රඳවා ගනී; `slot_busy` (429) හෝ `529` යන අගයන් සේවාදායකයේ `anthropic-ratelimit-unified-slow-retry-after` (පෙරනිමිය තත්පර 20, සීමාව තත්පර 5–600, ±30% jitter) රැඳී නැවත උත්සාහ කරන අතර, `anthropic-ratelimit-unified-slow-max-wait` (පෙරනිමිය මිනිත්තු 20, සීමාව මිනිත්තු 1–පැය 6) මගින් සීමා වේ — එය ඉක්මවා ගිය පසු lane එක අවසන් වන අතර මිනිත්තු 10ක cool-off කාලයක් නැවත පිළිගැනීම අවහිර කරයි. මෙම රැඳීම අමතරව, ඉල්ලීමේම upstream-start timeout එකෙන් (`resolveFetchStartTimeout`, පෙරනිමියෙන් මිනිත්තු 10) ඉතිරිව ඇති කාලයෙන් තත්පර 5ක ආන්තිකයක් අඩු කළ ප්රමාණයෙන් සීමා වේ: එම සීමාව නොමැතිව නම්, පෙරනිමි මිනිත්තු 20ක max-wait එක ඉල්ලීමට වඩා දිගු වන අතර sleep එක මැදින් අත්හිටුවනු ලබන බැවින්, සුමට `max_wait` අවසානය + cool-off වෙනුවට `TimeoutError` එකක් මතු වේ.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, පැය 5ක window rollover එකක්, හෝ `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ගෙවන ලද overage දැන් බිත්තිය ආවරණය කරන බැවින්, මෙය ඕනෑම තත්ත්වයකදී `extra_usage` ලෙස lane එක අවසන් කරයි) මගින් lane එක අවසන් වේ; ඉන්පසු ප්රතිචාරය සාමාන්ය cooldown මාර්ගයට ගලා යයි. `budget_exhausted` ප්රකාශිත budget reset (දින 8ක් හෝ ඊට අඩු) දක්වා මතක තබා ගැනීම සිදු වේ.
- බිත්ති පරීක්ෂාව executor හිම 400 මගින් මෙහෙයවන intra-attempt නැවත උත්සාහ (context editing, thinking/effort clamps, param auto-learn) වලින් පසුව ක්රියාත්මක වන බැවින්, එම නැවත උත්සාහවලින් එකකදී පමණක් මතුවන බිත්ති 429 එකක් වුවද cooldown මාර්ගයට ළඟා නොවී තවමත් අතරමැදිව ග්රහණය කර ගැනේ.
- තත්ත්වය සම්බන්ධතාවයකට අදාළව in-memory වේ (restart එකක් සඳහා නැවත පිළිගැනීමට අමතර බිත්ති 429 එකක් වැය වේ).

**Session-limit reset** (`autoLimitReset`, දෙකම සක්රීය නම් lane එකට පෙර උත්සාහ කෙරේ):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` block; `arm: "reset"` සහ `available: true` වන විට, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` වෙත `{ "program": "juniper_tide" }` සමඟ යවන්න (`providerSpecificData.organizationUUID` වෙතින් ලබාගත් organization UUID, bootstrap fallback).
- `result: reset|not_limited` → ඉල්ලීම සම්පූර්ණ වේගයෙන් නැවත උත්සාහ කෙරේ (slow header නැත). `already_used` / `not_offered` මගින් `next_available_at` (පෙරනිමියෙන් සතියක්) memoise කරයි; ඕනෑම අසාර්ථකත්වයක් මිනිත්තු 15ක් පසුබසී. reset එක සතියකට වරක් වන අතර තවමත් සතිපතා සීමාවට ගණන් ගැනේ.

Regression ආරක්ෂකයන්: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Session affinity (#7274)

**විෂය පථය:** එක් client session එකක් (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) එක් සම්බන්ධතාවයකට pin කිරීම, **ඕනෑම** provider එකක් සඳහා.

**අරමුණ:** multi-turn agent එකක් (Claude Code, aider, custom agents) ඉල්ලීම් හරහා එකම ගිණුමේ තබා ගැනීම, ගිණුම් අතර context නැතිවීම සහ per-account session තත්ත්වය ඇති provider වල නැවත නැවත සිදුවන cold-start 429 අඩු කිරීම.

**ක්රියාත්මක කිරීම:**

- TTL විභේදනය: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin තේරීම/නිර්මාණය: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header උපුටා ගැනීම (සාමාන්ය, ඕනෑම provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persist කළ pin වගුව: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (ගෝලීය TTL ms වලින්, `0` අක්රීය කරයි) — `src/lib/db/settings.ts`. migration `124_generic_session_affinity_ttl.sql` මගින් Codex-only `codexSessionAffinityTtlMs` ලෙසින් නම වෙනස් කරන ලද අතර, එය කලින් වින්යාස කළ ඕනෑම Codex TTL එකක් නව පෙරනිමිය ලෙස රැගෙන යයි.

#7274 ට පෙර, `resolveSessionAffinityTtlMs()` සෑම provider එකකටම `codex` හැර `0` වෙත දැඩි ලෙස bail වූ බැවින්, pinning ක්රියාවලිය සහ header උපුටා ගැනීම දැනටමත් provider-agnostic වුවද TTL setting එකට (සහ session headers වලට) වෙනත් කිසිම තැනක බලපෑමක් නොවීය. එම fix එක මගින් එම මුල් ඉවත්වීම ඉවත් කරන ලදි; ගෝලීයව `0` ට වඩා ඉහළින් සකසා ඇති පසු TTL එක දැන් සෑම provider එකකටම ඒකාකාරව අදාළ වේ.

Session-affinity header තුන කිසිදා upstream වෙත යවනු නොලැබේ — executors client headers පසුකර යැවීම වෙනුවට ඔවුන්ගේම upstream headers මුල සිට ගොඩනඟන බැවින්, මෙය අභ්යන්තර correlation id එකක් ලෙස පමණක් පවතී.

### සුවිශේෂී කළමනාකරණය කළ session සම්බන්ධතා leases

**විෂය පථය:** එක් සක්රීය කළමනාකරණය කළ HTTP client/session එකක් සුදුසුකම් ලත් OmniRoute සම්බන්ධතාවයක් හිමිකර ගනී.

**අරමුණ:** ඉල්ලීම් හරහා දැඩි routing fence එකක් අවශ්ය වන client සඳහා කල් පවතින සුවිශේෂී සම්බන්ධතා හිමිකාරිත්වය සැපයීම. මෙය soft continuity මනාපයක් වන session affinity වෙනස් වේ:
සුවිශේෂී lease එකක් SQLite තුළ lifecycle තත්ත්වය persist කරයි, ගෝලීය සක්රීය-හිමිකරු සහ සක්රීය-සම්බන්ධතා අනන්යතාව බලාත්මක කරයි, සහ provider dispatch ට පෙර කල් ඉකුත් වූ generation එකක් ප්රතික්ෂේප කරයි.

මෙම විශේෂාංගය API key එකකට වෙන් වශයෙන් opt-in වේ. කළමනාකරණය කළ key එකකට `lease:exclusive` scope එක සහ පැහැදිලි හිස් නොවන `allowedConnections` ලැයිස්තුවක් තිබිය යුතුය. ඕනෑම HTTP client එකකට lifecycle endpoint එක භාවිතා කළ හැක; client name, user-agent, provider, OAuth method හෝ model අවශ්ය නොවේ. lease එක හිමිකර ගන්නේ model එකක් නොව සම්බන්ධතාවයක් බැවින්, සම්බන්ධතාවය සාමාන්ය ලෙස සුදුසුකම් ලබන තාක්කල් model වෙනස් කිරීමක් බන්ධනය රඳවා ගනී. සාමාන්ය model, quota, health, cooldown, සහ allowlist නීති බලධාරීව පවතින අතර, එකම generation එක තවත් නිදහස් සුදුසුකම් ලත් සම්බන්ධතාවයකට මාරු කළ හැක.

ජීවන චක්රය `POST /api/v1/session-leases` වන අතර JSON ක්රියා `acquire`, `renew`, සහ `release` වේ.
කළමනාකරණය කරන ලද inference ඉල්ලීම් අපාරදෘශ්ය `X-OmniRoute-Lease-Owner` අගය සහ නිවැරදි
`X-OmniRoute-Lease-Generation` ඉදිරිපත් කරයි. හිමිකරු `vlo_` වලින් ආරම්භ වී පසුව base64url අක්ෂර 43ක් භාවිත කරයි; ගබඩා කර ඇත්තේ
එහි SHA-256 hash අගය පමණි. සෑම අවසාන dispatch fence එකක්ම සත්යාපිත API යතුරු ID සහ
සක්රීය සම්බන්ධතා ID එක ද බැඳ තබයි. Lease පාලන ශීර්ෂක ල logs වලින්, රඳවා ගත් ඉල්ලීම් snapshots වලින්, සහ
upstream executor ශීර්ෂක වලින් ඉවත් කරනු ලැබේ.

සාමාන්ය රවුටින් තුළ සුදුසුකම් ලත් කළමනාකරණය කරන ලද අපේක්ෂකයන් සිටියද, සෑම නිදහස් අපේක්ෂකයෙක්ම
විදේශීය සක්රීය lease එකකින් අත්පත් කරගෙන තිබේ නම්, OmniRoute HTTP `429`, lease-capacity-unavailable කේතයක්,
capacity එකක් සඳහා රඳී සිටින තත්ත්වයක්, සහ අදාළ වැඩිම ඉක්මන් කල් ඉකුත්වීමෙන් ලබාගත් සීමිත `Retry-After` අගයක් ලබා දෙයි.
සාමාන්ය හිස් සුදුසුකම යනු lease තරඟකාරීත්වය නොවන අතර එහි පවතින රවුටින් දෝෂ අර්ථ නිරූපණය එලෙසම පවතී.

ආශ්රිත යාන්ත්රණ වෙන වෙනම පවතී:

- OAuth සැසි අත්පත් කරගැනීම යනු OAuth ගිණුම් සඳහා ක්රියාවලිය-දේශීය මෘදු බෙදාහැරීමකි.
- ගිණුම් semaphores ඉල්ලීම්-සමවර්තීතා අවසර ලබා දෙන අතර ඉල්ලීමක් සම්පූර්ණ වන විට අවසන් වේ.
- සුවිශේෂී කළමනාකරණය කරන ලද සැසි leases යනු generation fence එකක් සහිත ස්ථිර ජීවන චක්ර හිමිකාරිත්වයකි.

---

## 3. ආකෘති අගුළු දැමීම

**විෂය පථය:** සපයන්නා + සම්බන්ධතාව + ආකෘති තුන් ගණන.

**තත්ත්වය අනුව ප්රධාන විෂය පථය:** අසාර්ථක තත්ත්වය තීරණය කරන්නේ අගුළු දැමීමක් ලියන ප්රධාන යතුර කුමක්ද යන්නයි
(`open-sse/services/accountFallback/exactModelLock.ts` හි `resolveLockoutScope()`):

- `429` / `403` / `402` — කෝටා හෝ හිමිකම් සංඥාවක් — **කෝටා පවුල** අගුළු දමයි:
  codex සඳහා සම්පූර්ණ `codex` / `spark` විෂය පථය (සම්බන්ධතාවයේ සෑම `gpt-5*`
  ආකෘතියක්ම), වෙනත් සපයන්නන් සඳහා `getQuotaScopedModelForProvider()`.
- `404` නිරුපද්රිත ආකෘතිය අගුළු දමයි (`getModelLockKey()` `not_found` පටු කරයි).
- වෙනත් ඕනෑම තත්ත්වයක් — `5xx` ප්රවාහන/සේවාදායක අසාර්ථකතා සහ ගුණාත්මකභාවය
  වලංගු කිරීමෙන් OmniRoute විසින්ම සංශ්ලේෂණය කරන ලද `502` — අගුළු දමන්නේ
  **හරියටම** සපයන්නා/සම්බන්ධතාවය/ආකෘතිය තුන් ගණන පමණි. එක් ආකෘතියක ඇති නරක
  ප්රවාහයක් ගිණුමේ කෝටාව ගැන සාක්ෂියක් නොවේ; මෙම නීතියට පෙර
  `codex/gpt-5.6-luna` මත එක් හිස් ප්රතිචාරයක් එම සම්බන්ධතාවයේ සෑම `gpt-5*`
  ආකෘතියක්ම මිනිත්තු 2–30 (වැඩි වෙමින්) සඳහා මාර්ගගත කිරීමෙන් ඉවත් කළේ එහි
  කෝටාව ස්පර්ශ නොවී තිබියදීය.
- ඇමතුම්කරුවෙකුගේ පැහැදිලි `scope` විකල්පය සැමවිටම ජය ගනී (Antigravity `"exact"` ලබා දෙයි).

**අරමුණ:** එක් ආකෘතියක් පමණක් නොමැති විට හෝ කෝටා-සීමිත විට සම්පූර්ණ සම්බන්ධතාවයක් අබල කිරීම වළක්වා ගැනීම.

**උදාහරණ:**

- ආකෘතිය අනුව කෝටා සපයන්නන් 429 ලබා දීම
- දේශීය සපයන්නන් එක් අතුරුදහන් ආකෘතියක් සඳහා 404 ලබා දීම
- සපයන්නාට විශේෂිත මාදිලිය/ආකෘති අවසර අසාර්ථකතා (උදා: Grok මාදිලි)

**ක්රියාත්මක කිරීම:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### ආකෘති කූල්ඩවුන් උපකරණ පුවරුව (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ක්රියාකාරී අගුළු දැමීම් ලැයිස්තුගත කරයි: සපයන්නා, සම්බන්ධතාවය, ආකෘතිය, හේතුව, expiresAt. ක්රියාකරුවන්ට කාඩ්පතෙන් ආකෘතියක් අතින් නැවත සක්රීය කළ හැක.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ක්රියාකාරී අගුළු දැමීම් ලැයිස්තුගත කරයි
- `DELETE /api/resilience/model-cooldowns` — අතින් නැවත සක්රීය කිරීම. Body: `{provider, connection, model}`. Auth: management.

### කූල්ඩවුන් කළමනාකරු

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

සෑම සපයන්නාගේ පිටුවම විවෘත කරනවා වෙනුවට, තාවකාලික හේතුවක් නිසා මාර්ගගත
කිරීමෙන් බැහැරව ඇති සෑම සම්බන්ධතාවයක් සඳහාම එක් පිටුවක්. එය සම්බන්ධතා
කූල්ඩවුන්, ආකෘති අගුළු දැමීම් සහ අවසාන තත්ත්ව ලැයිස්තුගත කරයි, ඒවා සම්බන්ධතාවය
අනුව, තේරීමක් සඳහා, හෝ සපයන්නෙකුගේ සියලුම සම්බන්ධතා සඳහා හිස් කරයි, සහ වඩාත්ම
සකසන ලද කූල්ඩවුන් නීති සංස්කරණය කරයි: `streamStallCooldown.enabled` සහ OAuth /
API-key `connectionCooldown` මූලික කූල්ඩවුන් සහ උපරිම පසුබැසීම් පියවර (සුරකින්නේ
`PATCH /api/resilience` හරහා). අවසාන තත්ත්ව (`banned`, `expired`, `credits_exhausted`)
ලැයිස්තුගත කරන නමුත් මෙහි කිසි විටෙකත් හිස් නොකෙරේ.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — තත්ත්වය, ඉතිරි කූල්ඩවුන්,
  පසුබැසීම් මට්ටම, අවසාන දෝෂ වර්ගය සහ ආකෘති අගුළු දැමීම් සහිත සම්බන්ධතා
  (අක්තපත්ර නොමැතිව)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` හෝ
  `{all: true, provider?}`; ලබා දෙන්නේ `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### අගුළු දැමීම් සැකසුම් UI + සාර්ථකත්ව-ක්ෂය යථා තත්ත්වයට පත් කිරීම (v3.8.23)

ආකෘති අගුළු දැමීම සැමවිටම-සක්රීය තද කේතගත හැසිරීමේ සිට තමන්ගේම සැකසුම්
කාඩ්පතක් සහ ස්වයං-සුවපත් කිරීමේ යථා තත්ත්වයට පත් කිරීමේ මාර්ගයක් සහිත සම්පූර්ණයෙන්ම
වින්යාසගත කළ හැකි, තෝරාගැනීම්-ආශ්රිත විශේෂාංගයක් බවට පත් විය.

**සැකසුම් කාඩ්පත:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
මෙය ඉහත කියවීමට-පමණක් වන `ModelCooldownsCard` ට **වෙනස්** එකකි (එය කරන්නේ
ක්රියාකාරී අගුළු දැමීම් _ලැයිස්තුගත කිරීම_ පමණි) — නව කාඩ්පත _පරාමිති
වින්යාසගත කරයි_. පෙරනිමි `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) හි පවතී:

| සැකසුම                  | පෙරනිමිය                         | අර්ථය                                                    |
| ----------------------- | -------------------------------- | -------------------------------------------------------- |
| `enabled`               | `false`                          | ප්රධාන ටොගලය — ආකෘති අගුළු දැමීම **පෙරනිමියෙන් වසා ඇත**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | ආකෘති-විෂය පථ අසාර්ථකතාවක් ලෙස ගණන් ගැනෙන උඩුගං තත්ත්ව.  |
| `baseCooldownMs`        | `120_000` (120 s)                | පළමු අසාර්ථකතාව සඳහා ආරම්භක අගුළු දැමීමේ කාලය.           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | වැඩි කරන ලද කූල්ඩවුන් සඳහා උපරිමය.                       |
| `maxBackoffSteps`       | `10`                             | උපරිම ඝාතීය-පසුබැසීම් වැඩි කිරීමේ පියවර.                 |
| `useExponentialBackoff` | `true`                           | නැවත නැවත අසාර්ථකතා කූල්ඩවුන් ඝාතීයව වැඩි කරන්නේද යන්න.  |

සැකසුම් සාමාන්ය සැකසුම් ගබඩාව හරහා පවතින අතර resilience සැකසුම් ක්රමය හරහා
වලංගු කරයි; කාඩ්පත `baseCooldownMs`/`maxCooldownMs` (`maxCooldownMs ≥ baseCooldownMs`
සමඟ) සහ `maxBackoffSteps` සීමා කරයි.

**සාර්ථකත්ව-ක්ෂය යථා තත්ත්වයට පත් කිරීම:** යථා තත්ත්වයට පත් කිරීම **නොවේ**
හුදෙක් කාල සීමාව ඉකුත් වීමක් පමණක්. සෞඛ්ය සම්පන්න ප්රතිචාරයක් ආකෘතියේ
අසාර්ථකතා ගණන නැවත පහළට ගෙන යයි, එබැවින් කවුළුව මැදදී යථා තත්ත්වයට පත් වූ
ආකෘතියක් එහි කාල සීමාවට පෙර වැඩි කිරීම නවත්වයි (සහ හිස් කරයි). සාර්ථක combo
ඉලක්කයකදී, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) අමතයි, එය ගබඩා කළ `failureCount`
**අඩකින් අඩු කරයි** (`Math.floor(failureCount / 2)`); එය `0` ට ළඟා වූ විට අගුළු
දැමීමේ සටහන සම්පූර්ණයෙන්ම මකා දමයි. ඊට සමාන `recordModelLockoutFailure()` වැඩි
කිරීමේ කවුළුව තුළ අසාර්ථකතා මත ගණන වැඩි කරයි (සහ කූල්ඩවුන් වැඩි කරයි). මෙම
සාර්ථකත්ව-ක්ෂය සාමාන්ය කාල සීමාව ඉකුත් වීමට අමතරව එකතු වේ — ඕනෑම මාර්ගයකට
ආකෘතියක් නැවත සක්රීය කළ හැක.

**තත්ත්වය:** අගුළු දැමීම් **මතකයේ** රඳවා ගනී (`ModelLockoutEntry` හි ක්රියාවලියට
අනුව `Map`s, `provider:connectionId:model` මගින් යතුරු කර ඇත, හරියටම-විෂය පථ අගුළු
`provider:connectionId:exact:model` මගින්), DB ට නොපවතී — නැවත ආරම්භ කිරීමේදී ඒවා
නැති වේ. _සැකසුම්_ පවතී; ක්රියාකාරී අගුළු දැමීමේ _තත්ත්වය_ තාවකාලිකය.

---

## 4. කෝටා-බෙදාගැනීමේ සමගාමීතා පාලනය (v3.8.36)

Subscription ගිණුම් (GLM, MiniMax ආදිය) සාමාන්යයෙන් එකවර ~1–3
ඉල්ලීම් පමණක් පිළිගනී; එය ඉක්මවා ගිය විට 429s සහ cooldowns ඇති වේ. මෙය
**quota-share** (`qtSd/…`) සංයෝජන යටතේ වඩාත් තීව්ර වේ, එහිදී API keys කිහිපයක්
එකම upstream ගිණුමක් බෙදාගනී. බෙදාගත් ගිණුමක් අධික ලෙස පිරී යාම වැළැක්වීමට
ස්තර තුනක් භාවිත වේ.

### සම්බන්ධතාවයකට අදාළ සමගාමීතා සීමාව (`max_concurrent`)

සෑම provider සම්බන්ධතාවයකටම `max_concurrent` උපරිම සීමාවක් ප්රකාශ කළ හැක
(`provider_connections.max_concurrent`, connection modal / API / DB තුළ සකසනු ලැබේ).
සීමාවක් අවශ්ය නොවේ නම් එය හිස්ව තබන්න. පහත serialization ස්තරය පාලනය කරන
ප්රධාන සැකසුම මෙයයි — එය ගිණුමේ සැබෑ සමගාමීතා අගයට සකසන්න (උදා. GLM ~1,
MiniMax ~2).

### මාදිලියකට අදාළ සමගාමීතා සීමා (`modelConcurrency`)

සම්බන්ධතාවයකට එහි `rateLimitOverrides` map එක තුළ මාදිලියකට නිශ්චිත
සමගාමීතා උපරිම සීමා අමතරව ප්රකාශ කළ හැක:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

එය connection modal තුළ (**Rate limit overrides → Per-model
concurrency caps**, එක් පේළියකට එක් `model=cap`) හෝ එම JSON හැඩතලය සමඟ
`PATCH /api/providers/[id]` හරහා සකසන්න. ප්රධාන අර්ථකථන:

- **සම්බන්ධතාවය පුරාද, මාදිලියට විශේෂිතද:** `maxConcurrent` සම්බන්ධතාවය පුරා
  බෙදාගන්නා උපරිම සීමාව ලෙස පවතී. දෙකම අදාළ වන විට, gate දෙකම එකම composite gate
  (`global → provider → account → model`) තුළ පරමාණුකව ලබාගනී; ක්රියාකාරී
  හැසිරීම අදාළ වන වඩාත් දැඩි සීමාව අනුගමනය කරයි.
- **නිශ්චිත මාදිලි-යතුරු ගැළපීම:** යතුර යනු routing resolution එකෙන් පසු executor
  වෙත යවන model string එකයි — සාමාන්යයෙන් bare upstream model id
  (`glm-5`) වේ, client-side `provider/model` alias එකක් නොවේ
  (`zai/glm-5` යන්න `glm-5` සමඟ නොගැළපේ). අගයන් ධනාත්මක පූර්ණ-සංඛ්යා
  සමගාමී-ඉල්ලීම් සීමා වේ.
- **දේශීය පෝලිම් කිරීම, සොයාගැනීමක් නොමැත:** අතිරේක ඉල්ලීම් පවතින
  queue/timeout semantics සමඟ දේශීයව පෝලිම් වේ (වර්ගීකෘත
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` admission errors). OmniRoute
  upstream policy සොයාගැනීමක් හෝ අනුමාන කිරීමක් නොකරයි — operator විසින්
  සකසා ඇති නිශ්චිත සීමා පමණක් ක්රියාත්මක කරයි. සංතෘප්ත model gate එකක්
  provider අක්රිය නොකරන අතර ස්ථිර model lockout එකක්ද නිර්මාණය නොකරයි;
  upstream 429/cooldown/fallback හැසිරීම error backstop ලෙස දිගටම පවතී.
- **සම්බන්ධතාවයකට, process එකකට අදාළ පරාසය:** සීමා database connection එකකට
  අදාළ වන අතර memory තුළ තබා ගනී; එබැවින් එකම upstream API key නැවත භාවිත කරන
  connections දෙකක් එකිනෙකා සමඟ සම්බන්ධීකරණය නොකරයි.
- **සකසා නොමැති විට වෙනසක් නොමැත:** map එක අත්හැර දැමීම (හෝ dashboard
  field එක හිස්ව තැබීම) model gate එකක් එක් නොකරයි. කිසිදු universal provider
  සීමාවක් ප්රකාශ නොකරන උදාහරණ වින්යාසය:

```text
glm-5=1
glm-4.7=3
```

### Quota-share ඉල්ලීම් අනුක්රමණය

Quota-share dispatch එකක් ධනාත්මක `max_concurrent` අගයක් ප්රකාශ කර ඇති
connection එකක් ඉලක්ක කරන විට, එම **ගිණුමට** යොමු වන සමගාමී ඉල්ලීම්
connection එකකට අදාළ semaphore එකක් (`qsconn:<connectionId>`) හරහා
අනුක්රමණය කෙරේ: අතිරේක ඉල්ලීම් ගිණුම පිරී යාමට ඉඩ දීම වෙනුවට
**පෝලිමේ රැඳී සිටී**. මෙය **fail-open** වේ — සංතෘප්ත පෝලිමක් හෝ timeout එකක්
ඇති විට slot එකක් නොමැතිව ඉදිරියට යන අතර dispatch කළ හැකි ඉල්ලීමක් කිසිවිටෙක
ප්රතික්ෂේප නොකරයි. **Settings → Resilience → Quota-share per-connection
concurrency** තුළ toggle කරන්න
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, පෙරනිමියෙන් on).
`max_concurrent` සීමාවක් නොමැති විට හැසිරීම වෙනස් නොවේ.

> Quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) ද fail-open
> වන අතර උපරිම සීමාවට පැමිණි connection එකක ප්රමුඛතාවය පමණක්
> _අඩු කරයි_ — එක්-connection pool එකක් සමඟ එයට දැඩි සීමාවක් පැනවිය
> නොහැකි බැවින්, flood එක සැබවින්ම පාලනය කරන්නේ මෙම semaphore එකයි.

### Combo cooldown-aware retry

සෑම combo strategy එකක් සඳහාම (සක්රීය කළ විට), SHORT transient cooldown එකක්
සඳහා 429ක් ස්ථිර වීමට ඉඩ ඇති ඉල්ලීමක්, 429 ආපසු ලබා දීම වෙනුවට cooldown කාලය
ගත වන තෙක් රැඳී නැවත dispatch කරයි — මෙය multi-model combos මත Gemini-class
TPM/RPM windows (~60s retry-after) ආවරණය කරයි. උදාහරණයක් ලෙස, 2-model combo
එකක targets දෙකම per-model rate limit එකකට ලක් වූ විටය. මෙය
**Settings → Resilience** තුළ ඇති `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) මඟින් සීමා වේ. එය `quota_exhausted` (මධ්යම රාත්රිය
දක්වා locked) හෝ auth/not-found හේතු මත කිසිවිටෙක රැඳී නොසිටී.

එම gate එක pre-dispatch අවස්ථාවද ආවරණය කරයි (#16319): උත්සාහයක් කිරීමට පෙර
combo එකක සෑම target එකක්ම short transient lockout එකක ඇති model එකක් නිසා
skip වූ විට, zero-attempt path එක එම lockout කාලය සඳහා එකම සීමාවන් යටතේ රැඳී
නැවත dispatch කරයි; hint-රහිත `503 ALL_TARGETS_SKIPPED` එකක් ලබා දීම වෙනුවටය.
රැඳී සිටීමට අවසර නොමැති විට (ceiling, attempt හෝ budget අවසන් වූ විට, හෝ
feature එක off වූ විට), terminal response එක `429 rate_limit_error` වෙත
upgrade වන අතර, ආරම්භක transient lock expiry එකෙන් ලැබෙන
`retry_after` / `reset_at` දරයි; quota, auth සහ not-found locks hint-රහිත
503 තත්ත්වය පවත්වා ගනී.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. ඉල්ලීම් පෝලිමට ඇතුළත් කිරීමේ පාලනය (v3.8.49 · ගැටලුව #6593)

**විෂය පථය**: ඉහත යාන්ත්රණ තුනට එක් ස්තරයක් පහළින් ඇති, දේශීය provider+connection එකකට අදාළ අනුපාත-සීමා පෝලිම (`open-sse/services/rateLimitManager.ts`,
Bottleneck මඟින් සහාය දක්වයි).

**`maxWaitMs` පෝලිමේ රැඳී සිටීම සීමා කරයි; `executionMaxWaitMs` ක්රියාත්මක කිරීම සීමා කරයි.**
මේ දෙක හිතාමතාම වෙන් කර ඇති අතර, එකක් අනෙකට බලපාන්නේ නැත.

`resilienceSettings.requestQueue.maxWaitMs` යනු **පෝලිම්-රැඳී සිටීමේ කාල අයවැයයි**: එය
provider slot එකක් සඳහා රැඳී සිටීමත්, ඉන්පසු QUEUED තත්ත්වයේ සිටීමත් ආවරණය කරන අතර, කාර්යය
QUEUED තත්ත්වයෙන් ඉවත් වී ක්රියාත්මක වීම ඇරඹෙන මොහොතේම එහි timer එක
ඉවත් කෙරේ (`rateLimitManager.ts`, `wrappedFn`). එය ඉක්මවන ඉල්ලීමක් කිසිවිටෙකත්
upstream වෙත ළඟා නොවේ. පෙරනිමි අගය 30000ms වන අතර, එය
`src/lib/resilience/settings.ts` හි `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
මඟින් සපයනු ලබන අතර
`tests/unit/ratelimit-admission-control-6593.test.ts` මඟින් ස්ථිර කර ඇත; එබැවින් එය වෙනස් කළහොත්
මෙම ඡේදය නිහඬව යල්පැනීමට ඉඩ නොදී එම පරීක්ෂණය අසමත් වේ.

`resilienceSettings.requestQueue.executionMaxWaitMs` යනු Bottleneck වෙත
කාර්යයේ `expiration` ලෙස ලැබෙන අගය වන අතර, එහි timer එක ආරම්භ වන්නේ dispatch කිරීමෙන් පසුව පමණි. එය
තමන්ගේම upstream timeout එකක් නොමැති executors සඳහා අවසාන ආරක්ෂාවක් වන අතර,
executor එකේම fetch-start timeout එක වඩා දිගු නම් එම අගය දක්වා වැඩි කෙරේ; එබැවින්
හොඳින් ක්රියාත්මක වන in-flight ප්රතිචාරයක් අතරමඟ නතර කිරීමට එයට නොහැකිය. පෙරනිමි අගය 600000ms (මිනිත්තු 10) වේ.

පෝලිම් අයවැය `expiration` වෙත ලබා දීම නිසා පෙරදී වර්ධක නොවන
gateways අතරමඟ නතර විය — ඒවා පළමු bytes ලැබීමට පෙර නීත්යානුකූලව මිනිත්තු ගණනක් ක්රියාත්මක විය හැක —
එම නිසා expiration එකක් `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ලෙස පෙන්වන අතර, පෝලිම් අයවැය
පෝලිම්-timeout code එක දරයි. `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) හෝ dashboard එකේ
(**සැකසීම් → ප්රත්යස්ථතාව**) හරහා ඕනෑම එකක් අභිබවා සකසන්න. සාමාන්යකරණයේදී දෙකම 1ms–24h අතරට සීමා කෙරේ.

**දෙකටම ප්රමුඛතා අනුපිළිවෙළ:** env var එක සපයන්නේ _පෙරනිමි_ අගය පමණි.
`resilienceSettings.requestQueue` තුළ ස්ථිරව ගබඩා කළ අගයක් (dashboard / API patch එකක් හරහා,
`key_value` තුළ ගබඩා කළ) එයට වඩා ප්රමුඛ වන අතර, connection එකකට අදාළ
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` අගයක් ඒ දෙකටම වඩා ප්රමුඛ වේ. ඒ නිසා
දැනටමත් ස්ථිරව ගබඩා කළ අගයක් ඇති deployment එකක env var එක සැකසීමෙන්
කිසිවක් වෙනස් නොවේ — ඒ වෙනුවට ස්ථිරව ගබඩා කළ සැකසුම ඉවත් කරන්න හෝ යාවත්කාලීන කරන්න.

පෝලිමේ රැඳී සිටීම `maxWaitMs` මඟින් සීමා කෙරේ; පහත `maxQueueDepth` මඟින්
එකවර පෝලිම්ගතව සිටිය හැකි callers ගණන සීමා කෙරේ.

**Body එකේ සඳහන් retries: වේග පාලනය සහ lockout අතර වෙනස.** 429 body එකකට තමන්ගේම රැඳී සිටීමේ කාලය
(Gemini `RetryInfo.retryDelay`, "තත්පර Nකට පසු නැවත උත්සාහ කරන්න" යන පාඨය) සඳහන් කළ හැකි අතර,
`updateFromResponseBody` එය කියවයි. connection එකේ `maxWaitMs` තුළ ගැළපෙන රැඳී සිටීමක්
වේග පාලනයකි: limiter එක එම කාලයට එහි reservoir එක හිස් කරන අතර එය නැවත පිරුණු විට පෝලිම්ගත calls
dispatch කෙරේ. `maxWaitMs` ට වඩා දිගු රැඳී සිටීමක් පෝලිමට බලා සිට අවසන් කළ හැකි දෙයක් නොවේ —
Gemini අවසන් වූ දෛනික quota එකකට
`retryDelay: "86399s"` ලෙස පිළිතුරු දෙයි. නැවත ගොඩනැගූ 429 (#16528) මත relay කළ `Retry-After`
දැනටමත් fallback engine එක එම කාල කවුළුව සඳහා model එක lock කිරීමට සලස්වයි; නමුත් ඒ වෙනුවෙන්
limiter එකත් pause කිරීමෙන්, key එක වෙත කලින් ළඟා වන ඕනෑම call එකක්
(උදාහරණයක් ලෙස resilience reset එකකට පසුව) සම්පූර්ණ `maxWaitMs` කාලය පුරාම තවමත් අඩාල වේ.
එවැනි රැඳී සිටීමක් type සහිත Google `RetryInfo`
detail එකකින් (`google_rpc_retry_info` provenance එකෙන්) පැමිණෙන විට සහ key එකේ limiter එක
දැනටමත් model එකට සීමා කර ඇති විට (`getLimiterKey` බලන්න), 429 එක ඒ වෙනුවට එම connection එකේ model
lockout එකක් බවට පත්වේ (`open-sse/services/rateLimitManager/bodyRetryPause.ts` තුළ
`lockModelForLongBodyRetry`, 24h දක්වා සීමා කර ඇත), සහ limiter එක pause නොකර තබයි.
Account තේරීම එම lock එක `isModelLocked()` හරහා මඟහරින අතර, connection එකට pin කර ඇති targets සඳහා
combo pre-dispatch gate එකත් එසේ කරයි. limiter එක quota family එකකට අදාළ වන antigravity හිදී, එහි වෙනත්
quota locks මෙන්ම lock එකත් නිශ්චිත model එක මත වේ. alias එකක් client ඉල්ලා සිටි නම එම model එකට resolve
කළේ නම් එම නමත් lock කෙරේ, මන්ද එම පරීක්ෂා requested name එක භාවිත කරයි; එය නිශ්චිතවම lock කෙරේ
(`lockExactModel`), එබැවින් antigravity quota family එකක් හෝ codex scope එකක් හරහා යන alias එකක් කිසිවිටෙකත්
තමන්වම lock නොකරයි. සාමාන්ය පාඨමය ඉඟියක්, type රහිත `retryDelay` එකක්, හෝ
මුළු connection එකම බෙදාගන්නා limiter එකක් pause එක පවත්වා ගනී. 429 path එක දැන් නැවත ගොඩනැගූ limiter එක
pause වන විට, pause එක අවසන් වීමට පෙර caller කෙනෙකුගේ ඉතිරි පෝලිම් කාලය අවසන් වන්නේ නම්,
එම කාලය ගෙවෙන තෙක් රැඳී සිටීම වෙනුවට පෝලිම්-timeout code එක සමඟ වහාම ප්රතික්ෂේප කෙරේ
(`checkLimiterPause`); සටහන් කළ අවසානය limiter එක ගොඩනැගීමට පෙර ඇති කාලයට නැංගුරම් කර ඇත,
මන්ද Bottleneck එහි refresh clock එක ආරම්භ කරන්නේ එහිදී වන අතර, reservoir එකට පසුව සිදු කරන ඕනෑම
වෙනසක් එය අමතක කරවයි. මෙය
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` සහ
`tests/unit/rate-limit-body-retry-pause.test.ts` මඟින් ආවරණය කර ඇත.

**`maxQueueDepth` — කැමැත්තෙන් සක්රිය කළ හැකි ඇතුළත් කිරීමේ සීමාව (නව).** `resilienceSettings.requestQueue.maxQueueDepth`
එක් provider+connection එකක් සඳහා එකවර පෝලිම්ගතව සිටිය හැකි (තවමත් dispatch නොකළ) ඉල්ලීම් ගණන
සීමා කරයි. පෝලිමේ දැනටමත් `maxQueueDepth`
ඉල්ලීම් තිබේ නම්, නව ඉල්ලීමක් `limiter.schedule()` වෙත කිසිසේත් ළඟා වීමට **පෙර**
type සහිත `code: "RATE_LIMIT_QUEUE_FULL"` දෝෂයක් සමඟ වහාම ප්රතික්ෂේප කෙරේ
— එබැවින් ප්රතික්ෂේප කිරීම අඩු වියදම් වන අතර, එම ඉල්ලීම සඳහා වන ඕනෑම downstream
prompt-compression / translation කාර්යයකට පෙර සිදුවේ. පෙරනිමි `0` =
අක්රියයි; එමඟින් දැනට පවතින සීමා රහිත පෝලිම් හැසිරීම රැකේ; සීමාව 0–100000 වේ.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) හෝ
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) හරහා අභිබවා සකසන්න.

ඇතුළත් කිරීමේ පරීක්ෂාවම pure function එකකි
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), එබැවින්
සැබෑ Bottleneck limiter එකක් නොමැතිව එය unit-test කළ හැක.

> #6593 විවෘත කළ RFC එක ද `bypassCompressionOnRateLimit` ධජයක්
> යෝජනා කළේය. මෙම repo එකේ `open-sse/services/compression/` pipeline
> එක යනු සෑදූ 429 body මත HTTP ප්රතිචාර සම්පීඩනය නොව, පිටතට යන LLM
> ඉල්ලීම මත prompt/context සම්පීඩනයයි (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` block එක වටා)
> — වචනාර්ථයෙන් bypass ධජයක් සඳහා ගැලපෙන කේත මාර්ගයක් නොමැත. එම
> prompt-සම්පීඩන පියවර ද දැනට ඉල්ලීම් pipeline එකේ `withRateLimit()` ට
> _පෙර_ ක්රියාත්මක වන බැවින්, පෝලිම-පිරුණු ප්රතික්ෂේපයක් මත එය
> මඟහැරීමට නැවත සැකසීම මෙම issue එකේ විෂය පථයට වඩා වෙනම, විශාල වෙනසකි;
> CPU-ඉතිරිකිරීමේ ලාභය නැවත සැකසීමේ අවදානමට වටී නම්, එය හිතාමතාම මෙහි
> ක්රියාත්මක **නොකර** පසු-අනුගමනයක් ලෙස ඉතිරි කර ඇත.

### Rate-Limit ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලය සහ සම්බන්ධතා ආරක්ෂණය (`rateLimitProtection`)

**ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලය** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, පෙරනිමි `true`):
පෙරනිමියෙන්, OmniRoute සියලුම සක්රීය API-key provider සම්බන්ධතා සඳහා (`getProviderCategory(provider) === "apikey"`) rate-limit පෝලිම් ආරක්ෂණය ස්වයංක්රීයව සක්රීය කරයි. මෙය rate-සංවේදී upstream API keys වෙත එන ඉල්ලීම් upstream 429 දෝෂවලට කඩා නොවැටී Bottleneck හරහා පෝලිම්ගත කර throttle කරන බව සහතික කරයි. ආරක්ෂක ජාලය `RATE_LIMIT_AUTO_ENABLE` පරිසර විචල්යය හරහා අභිබවා යා හැක (`false`/`0`/`off` අක්රීය කරයි, `true`/`1`/`on` බලෙන් සක්රීය කරයි), එය ගබඩා කර ඇති dashboard සැකසුමට (**Settings → Resilience** / `PATCH /api/resilience`) වඩා ප්රමුඛතාවය ගනී.

**සෑම සම්බන්ධතාවකටම `rateLimitProtection` හි අර්ථකථනය:**
සෑම සම්බන්ධතාවකටම rate-limit ආරක්ෂණය provider සම්බන්ධතාවල `rateLimitProtection` boolean ක්ෂේත්රය හරහා නිරීක්ෂණය කරනු ලැබේ (SQLite හි `rate_limit_protection` ලෙස ගබඩා කර ඇත):

- **පැහැදිලි ලෙස සක්රීය (`rateLimitProtection === true`)**: Provider කාණ්ඩය හෝ ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලය සක්රීය කර තිබීම නොසලකා, මෙම සම්බන්ධතාව සඳහා rate-limit ආරක්ෂණය පැහැදිලි ලෙස සක්රීය කර ඇත.
- **පැහැදිලි ලෙස අක්රීය (`rateLimitProtection === false`)**: පැහැදිලි ආරක්ෂණය අක්රීය කරයි, නමුත් සක්රීය API-key සම්බන්ධතාවක් ගෝලීය ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලයෙන් **ඉවත් නොකරයි**. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) තුළ, `false` සහ `undefined` සමාන වේ: `rateLimitProtection === true` පමණක් පැහැදිලි අභිබවා යෑමක් ලෙස සලකනු ලැබේ. `rateLimitProtection` `false` (හෝ සකසා නොමැත) නම්, සක්රීය API-key සම්බන්ධතාවක් තවමත් ස්වයංක්රීය-සක්රීය කොන්දේසියට ගැළපෙන අතර rate-limit ආරක්ෂිතව පවතී.
- **සෑම සම්බන්ධතාවකටම ඉවත්වීමක් නොමැත**: අනෙක් ඒවා සඳහා ස්වයංක්රීය-සක්රීය ක්රියාත්මකව තබා ගනිමින්, "මෙම තනි සක්රීය API-key සම්බන්ධතාව rate-limit පෝලිම් ආරක්ෂණය නොමැතිව ක්රියාත්මක විය යුතුය" යනුවෙන් ක්රියාකරුවෙකුට දැනට ප්රකාශ කළ නොහැක. Rate-limit පෝලිම් නොමැතිව API-key සම්බන්ධතා සම්පූර්ණයෙන්ම ක්රියාත්මක කිරීමට, ආරක්ෂක ජාලය ගෝලීයව අක්රීය කළ යුතුය (`RATE_LIMIT_AUTO_ENABLE=false` හෝ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**සහාය දක්වන ලිවීමේ මාර්ග:**

- **`POST /api/rate-limits`**: සම්බන්ධතාවක් සඳහා `rateLimitProtection` මාරු කිරීමට සහාය දක්වන කළමනාකරණ ලිවීමේ මාර්ගය (`{ connectionId: string, enabled: boolean }`). මෙය `enabled: true` සමඟ කැඳවීම පැහැදිලි ආරක්ෂණය සක්රීය කරයි; `enabled: false` සමඟ කැඳවීම පැහැදිලි ආරක්ෂණය ඉවත් කරයි (ස්වයංක්රීය-සක්රීය සක්රීයව තිබේ නම් සක්රීය API-key සම්බන්ධතා ගෝලීය ආරක්ෂක ජාලය යටතේ ආවරණය වී පවතී).
- **`PUT /api/providers/[id]`**: හිතාමතාම `rateLimitProtection` භාර නොගනී හෝ මාරු **නොකරයි** (#11278). `PUT /api/providers/[id]` හරහා provider සම්බන්ධතා metadata යාවත්කාලීන කිරීම කිසි විටෙක ගබඩා කර ඇති rate-limit ආරක්ෂණ තත්ත්වය වෙනස් නොකරයි.

---

## 6. මන්දගාමී-ප්රවාහ throughput watchdog (#9709)

විකල්ප `resilienceSettings.streamRecovery.throughputWatchdog` ආරක්ෂකය, තවමත් chunks යවමින් සිටින නමුත් වින්යාසගත කළ ප්රයෝජනවත්-ප්රතිදාන අනුපාතයට වඩා අඩුවෙන් assistant ප්රතිදානය ජනනය කරන upstream එකක් හඳුනා ගනී. එය idle timeout එකෙන් හිතාමතාම වෙන් කර ඇත: heartbeats සහ metadata කිසිම timer එකක් reset නොකරන අතර ප්රගතියක් ලෙස ද ගණන් නොගැනේ. එය දෘඪ attempt deadline (#9153) වෙතින් ද වෙනස් වේ — එය ප්රතිදාන ගුණාත්මකභාවය කුමක් වුවත් නිරපේක්ෂ ආරක්ෂක උපරිමයක් ලෙස පවතී.

අත්හිටුවීමට හැකි වීමට පෙර watchdog එකට warm-up කාලයක් සහ ඉන්පසු සම්පූර්ණ rolling window එකක් අවශ්ය වේ. එය Chat Completions සහ Responses API ප්රතිදාන events වලින් text deltas ගණන් කරයි (ප්රවේශම් සහිත UTF-8 byte ප්රොක්සියක්), usage-only සහ හිස් events නොසලකා හරින අතර, tool-call හෝ reasoning events ක්රියාත්මක වෙමින් පවතින අතරතුර තීරණය අත්හිටුවයි. එය පෙරනිමියෙන් අක්රීය කර ඇති අතර `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` මගින් සක්රීය කළ හැක; window, warm-up, අවම අනුපාතය සහ අවම මැනිය හැකි ප්රතිදානය සාමාන්ය resilience-settings normalization ස්ථරය මගින් සීමා කෙරේ.

සක්රීය කළ විට, watchdog අත්හිටුවීමක් යොදනු ලැබෙන්නේ ක්රියාත්මක upstream attempt එකට පමණි. client-දෘශ්ය bytes කිසිවකට පෙර, පවතින same-account early-recovery මාවතට attempt එක නැවත විවෘත කළ හැක. commit එකකට පසු, stream එක කිසිවිටෙක අන්ධ ලෙස නැවත ධාවනය නොකෙරේ; පවතින ආරක්ෂිත mid-stream continuation කොන්ත්රාත්තුවට පමණක් suffix එකක් එකතු කළ හැක. Finalization එක single-shot ලෙස පවතින බැවින්, usage ගිණුම්කරණය සහ semaphore මුදාහැරීම අනුපිටපත් නොවේ.

---

## 7. Upstream තත්ත්වය නැවත ප්රකාශ කිරීම (වැරදි ලෙස ප්රකාශිත quota දෝෂ)

**විෂය පථය:** තාවකාලික quota අවසන් වීම වැරදි HTTP තත්ත්වයක් සමඟ වාර්තා කරන එක් upstream gateway එකක්.

**අරමුණ:** classification කිරීමට පෙර නොමඟ යවන තත්ත්වයක් නිවැරදි කිරීම, එවිට downstream පාරිභෝගිකයන්ට (fallback engine, combo aggregation, client වෙත යොමු කරන ප්රතිචාරය) අසාර්ථකත්වයේ සැබෑ, නැවත උත්සාහ කළ හැකි ස්වභාවය පෙනේ.

සමහර gateways තාවකාලික quota අවසන් වීම නැවත උත්සාහ කළ නොහැකි HTTP
තත්ත්වයක් මඟින් සංඥා කරයි. `agentrouter.org` සම්මත `429` වෙනුවට චීන body
එකක් (`用户额度不足` / `额度不足`) සමඟ `403` (සමහර විට `400`) ආපසු ලබා දෙයි.
Claude Code වැනි clients `403` ස්ථිර දෝෂයක් ලෙස සලකා session එක නවත්වන අතර,
නිවැරදි කිරීමක් නොමැතිව fallback engine එක එය quota event එකක් වෙනුවට
`AUTH_ERROR` ලෙස වර්ගීකරණය කරනු ඇත.

**ක්රියාත්මක කිරීම:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — එක් එක්
  provider සඳහා වූ rules ලැයිස්තුවක් (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` හරහා ගැළපේ.
- Call site: `open-sse/handlers/chatCore.ts` හි `providerFailure:` block එක
  (3654 පේළිය ආසන්නයේ), `parseUpstreamError()` මඟින් error HTTP status එකක්
  (`!providerResponse.ok`) සහිත upstream response එකක් parse කළ වහාම සහ
  කිසිදු classification එකක් ක්රියාත්මක වීමට පෙර, එවිට සෑම downstream
  පාරිභෝගිකයෙකුටම නිවැරදි කළ status එක පෙනේ. `200` SSE stream එකක් තුළ
  embedded වූ errors වෙනම, පසුව සිදු වන stream-parsing path එකක් අනුගමනය
  කරන අතර ඒවා අද මෙම hook එකෙන් **ආවරණය නොවේ** — මෙය දන්නා සීමාවක් වන
  නමුත් agentrouter හි misstatus සඳහා තවමත් අවශ්ය නොවේ (එය error HTTP
  status එකක් ලෙස මතු වේ).
- නැවත උත්සාහ කිරීමේ සුදුසුකම: `429` යනු `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) තුළ ඇති බැවින්, නැවත
  ප්රකාශිත error එකක් ක්රියා විරහිත `403` එකක් ලෙස මතු වීම වෙනුවට සැබෑ
  retry window එකක් රැගෙන යයි.
- කෘත්රිම `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) යනු
  නැවත ප්රකාශිත response එක **client** වෙත පවසන දෙය පමණි; එය connection
  එකේ අභ්යන්තර cooldown/lockout කාලසීමාව නොවේ — එය නැවත ප්රකාශිත error
  එක සැබවින්ම හසුරුවන mechanism එක මඟින් වෙනම පාලනය වේ (Connection
  Cooldown හි ක්රමයෙන් වැඩි වන backoff, §2, API-key providers සඳහා මූලික
  අගය `3s`; හෝ agentrouter වැනි per-model-quota providers සඳහා Model
  Lockout, §3). Router එක client වෙත ප්රකාශ කරන 60s window එකට වඩා කලින්
  අභ්යන්තරව නැවත උත්සාහ කිරීමට සුදුසු විය හැක — මෙය චේතනාන්විත headroom
  එකක් මිස bug එකක් නොවේ.

ස්ථිර errors (agentrouter හි `无权访问模型` — මෙම model එකට ප්රවේශය නොමැත)
කිසිවිටෙකත් නැවත ප්රකාශ නොකෙරේ: `textMarkers` ගැළපුණද `excludeMarkers` rule
එක නිෂේධනය කරයි, එබැවින් error එක එහි මුල් status එක තබා ගන්නා අතර කිසිවක්
එය සදහටම නැවත උත්සාහ නොකරයි. ඊට ගැළපෙන provider classification rule එක
(`open-sse/config/providerErrorRules.ts` හි `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, ප්රකාශිත මූලික cooldown එක `6h`)
generic apikey-category `FORBIDDEN` early-return එකට _පෙර_
`checkFallbackError` (`open-sse/services/accountFallback.ts`) මඟින් සලකා
බලනු ලබන අතර, එය `honorsRuleLockScope(provider)` මත gate කර ඇත (#10334 —
දැනට `providerErrorRules.ts` හි `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist
එක හරහා agentrouter සඳහා පමණි). Rule එකේ ප්රකාශිත 6h cooldown එක
`fallbackResult.baseCooldownMs` ලෙස ඉදිරියට ගලා යන නමුත්, එය තවමත් කලින්
සිට පැවති per-model-quota lockout path එකට
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, cooldown source
එක හැර #10334 මඟින් වෙනස් නොකළ) යොමු වේ: අනෙකුත් සෑම model lockout එකක්
මෙන්ම එය operator ගේ `mlSettings.maxCooldownMs` (පෙරනිමිය
`1_800_000ms` / 30min) දක්වා පහළට සීමා කෙරෙන අතර, _persist කරන ලද lockout
reason එක_ rule එකේ `"auth_error"` නොව කලින් සිට පැවති hardcoded
`"forbidden"` ලෙසම පවතී — end-to-end ලෙස ගරු කරනු ලබන්නේ cooldown කාලසීමාවට
පමණක් මිස reason string එකට නොවේ. Connection එකම active ලෙස පවතී; එම
connection එකේ sibling models වලට බලපෑමක් සිදු නොවේ.

නැවත ප්රකාශිත quota errors (`额度不足`) production තුළ provider rule එකකට
ළඟා වේ (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, එයටම අයත් ප්රකාශිත cooldown එකක් නොමැත —
persistence layer එකේ scaled backoff පෙරනිමිය අදාළ වේ). #10334 සිට,
`ProviderErrorRuleMatch` හි `scope` end-to-end ලෙස භාවිත කෙරෙන නමුත්,
**එය අදාළ වන්නේ** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist එකේ ඇති
providers සඳහා පමණි (`providerErrorRules.ts` — අද `"agentrouter"` පමණක්,
`honorsRuleLockScope()` හරහා gate කර ඇත). අනෙකුත් සෑම provider එකක් සඳහාම
`scope`, #10334 ට පෙර මෙන්ම, informational ලෙස පවතී. `checkFallbackError`
මඟින් ගැළපුණු rule එකේ scope එක `fallbackResult.ruleScope` ලෙස මතු කරයි;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) යනු
`ruleScope` එකක් connection-wide, ස්වයං-ප්රතිසාධනය වන signal එකක් ලෙස ගරු
කිරීමට සැබවින්ම ආරක්ෂිත බව තහවුරු කරන shared guard එකයි (scope
`"connection"`, reason `quota_exhausted`, කිසිවිටෙක `permanent` නොවේ,
කිසිවිටෙක `creditsExhausted` නොවේ — අනාගත rule එකක් scope `"connection"`
ස්ථිර account state එකක් සමඟ යුගල කිරීමෙන් ආරක්ෂා වීම සඳහා). Consumers
දෙකක් එය අමතයි:

- **ස්ථායිකරණය** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough සපයන්නාගේ **මාදිලියකට-වෙන්වූ** අගුලු දැමීමේ
  ශාඛාවට වැටීම වෙනුවට (agentrouter හි `passthroughModels: true` බැවින් → `hasPerModelQuota()`
  මඟින් `true` ලබා දෙයි), මෙය **තාවකාලික සම්බන්ධතා සිසිලන කාලයක්** යොදයි —
  `testStatus: "unavailable"` + `rateLimitedUntil`, කිසි විටෙක අවසාන තත්ත්වයක්
  (`credits_exhausted`/`banned`/`expired`) නොවේ — එබැවින් අක්තපත්ර අතින් යළි සැකසීමක්
  අවශ්ය වීම වෙනුවට, සිසිලන කාලය අවසන් වූ පසු සම්බන්ධතාව ස්වයංක්රීයව යථා තත්ත්වයට පත් වේ.
  `disableCooling: true` සහිත සම්බන්ධතා සඳහා මෙය මඟ හරිනු ලැබේ (#2997): එම ඉවත් වීමේ
  විකල්පය වෙනුවට මාදිලියකට-වෙන්වූ අගුලු දැමීම වෙත වැටේ (ලේඛනගත සම්මුතියකි —
  ශාඛාවට ඉහළින් ඇති කේත සටහන බලන්න).
- **එකම-ඉල්ලීමේ combo මාර්ගගත කිරීම** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): එම ආරක්ෂක පරීක්ෂාවම, යතුර ලෙස
  `${provider}:${connectionId}` භාවිත කරමින්, සම්බන්ධතාව මතකයේ ඇති
  `exhaustedConnections` කට්ටලයට සලකුණු කරයි. මෙය මඟ හරින්නේ, තමන්ගේම
  ඉලක්ක වස්තුව මත හරියටම එම `connectionId` දැනටමත් අඩංගු වන ඉතිරි
  එකම-ඉල්ලීමේ ඉලක්කයක් පමණි (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` යන්න `exhaustedConnections` සෙවීමට පෙර) — සහෝදර ඉලක්කවලට
  තමන්ටම ස්ථිර කළ `connectionId` නොමැති සහ ප්රතිචාරයේ
  `X-OmniRoute-Selected-Connection-Id` ශීර්ෂකයෙන් එක් එක් යැවීමේදී පමණක්
  එකක් නිරාකරණය කරන සාමාන්ය මාදිලි-ලැයිස්තු combo එකක් කිසි විටෙක එම
  යතුරු ගැළපීමට ළඟා නොවේ. එම පොදු අවස්ථාවේදී, ඉතිරි අදියරක් විසින් දැන්
  අවසන් වූ ගිණුම යළි භාවිත කිරීමෙන් ලැබෙන සැබෑ ආරක්ෂාව මෙම Set එක නොවේ —
  එය ඉහත ස්ථායිකරණ ස්තරය (සම්බන්ධතාවේ `rateLimitedUntil` දැන් අනාගතයේ ඇත)
  සහ අසමත් වීම සඳහා `transientRateLimitedProviders` යටපත් කරන මෙම
  ආරක්ෂක පරීක්ෂාවම ඒකාබද්ධ වීමයි ("අදියර දෙකේ සැලසුම" සහ
  `targetExhaustion.ts` හි `isAgentrouterConnectionQuotaScope` ශාඛාව පිළිබඳ
  කේත සටහන බලන්න): එම Set එක සලකුණු නොකර තැබූ විට, `combo.ts` හි
  `allowRateLimitedConnection` බලහත්කාර-අවසරය
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) සපයන්නාගේ ඉතිරි
  අදියර සඳහා ක්රියාත්මක නොවන බැවින්, අක්තපත්ර තේරීමේ `rateLimitedUntil`
  පෙරහන (`src/sse/services/auth.ts:1238`) සාමාන්ය පරිදි ගරු කරනු ලබන අතර,
  ඉතිරි අදියරක් වෙනත්, තවමත් සුදුසු agentrouter සම්බන්ධතාවක් තෝරා ගනී
  නැතහොත් ලබා ගත හැකි අක්තපත්ර නොමැතිව අසමත් වේ — මෙම ශාඛාව විසින් දැන්
  සිසිල් කළ සම්බන්ධතාව වෙත බලහත්කාරයෙන් ආපසු නොයයි.

### අදියර දෙකේ සැලසුම: තත්ත්වය නැවත ප්රකාශ කිරීම, ඉන්පසු වර්ගීකරණය

තත්ත්වය නැවත ප්රකාශ කිරීම (`upstreamStatusRestatement.ts`) සහ සපයන්නා
වර්ගීකරණ නීති (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) යනු සපයන්නාගේ හැඳුනුම්කාරකය සහ පෙළ සලකුණු යන දෙකම
යතුරු ලෙස භාවිත කරන වෙනම ලේඛනගාර දෙකකි, නමුත් ඒවා විවිධ ස්ථානවල ක්රියාත්මක
වන අතර වෙනස් අරමුණු ඉටු කරයි: නැවත ප්රකාශ කිරීම `chatCore.ts` තුළ HTTP
තත්ත්වය කලින්ම නැවත ලියයි; වර්ගීකරණ නීති `checkFallbackError()` තුළ
(`open-sse/services/accountFallback.ts`) පසුබැසීමේ `reason` සහ අගුලු දැමීමේ
`scope` (`model` / `provider` / `connection`) තෝරයි.

වර්ගීකරණ නීතිවලට සම්පූර්ණ දෝෂ **පෙළ** පෙනෙන්නේ (`额度不足` වැනි body
සලකුණු ගැළපීමට එය අවශ්ය වේ) `providerErrorRules.ts` හි
`FULL_TEXT_RULE_PROVIDERS` අවසර ලැයිස්තුවේ ඇති සපයන්නන් සඳහා පමණි — දැනට
`"agentrouter"` පමණි. අනෙකුත් සෑම **අන්තර්නිර්මිත නාමාවලි** සපයන්නෙකු
සඳහාම, `checkFallbackError` විසින් `getProviderErrorRuleMatch` වෙත ලබා දෙන්නේ
ව්යුහගත දෝෂය (`{code, type}`) පමණක් වන අතර, එය ශීර්ෂක/තත්ත්ව/කේත-මත පදනම් වූ
නීති සඳහා ප්රමාණවත් නමුත් body-පෙළ සලකුණු නොපෙනේ. `resolveRuleMatchBody()`
සහායකය මෙම තේරීම සිදු කරයි: අවසර ලැයිස්තුවේ සපයන්නන් සඳහා සම්පූර්ණ දෝෂ
පෙළත්, අනෙක් අය සඳහා ව්යුහගත දෝෂයත් ලබා දෙයි. **අන්තර්නිර්මිත** සපයන්නෙකු
`FULL_TEXT_RULE_PROVIDERS` වෙත එක් කිරීම පැහැදිලි සපයන්නා-විශේෂ ඉල්ලීමකි —
එය පවතින්නේ ලැයිස්තුවේ නොමැති සෑම සපයන්නෙකුගේම පෙරනිමි මාර්ගය
byte-for-byte ලෙස නොවෙනස්ව තබා ගැනීමටය.

නීතියක `scope` (`model` / `provider` / `connection`) යනු
`FULL_TEXT_RULE_PROVIDERS` වෙතින් වෙනම වූ ඉල්ලීමකි: `checkFallbackError` එය
`fallbackResult.ruleScope` ලෙස පමණක් හෙළිදරව් කරන අතර, පහළ ධාරාවේ පාරිභෝගිකයන්
එය තොරතුරුමය ලේබලයකට වඩා වෙනත් යමක් ලෙස ගරු කරන්නේ එකම ගොනුවේ ඇති
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` අවසර ලැයිස්තුවේ සපයන්නන් සඳහා පමණි
(`honorsRuleLockScope()` හරහා පාලනය වේ — අද `"agentrouter"` පමණි). සපයන්නෙකු
එම අවසර ලැයිස්තුවට ඇතුළත් වූ පසු `scope: "connection"` ගැළපීමක් සැබවින්ම
කරන්නේ කුමක්දැයි දැන ගැනීමට ඉහත "නැවත ප්රකාශ කළ කෝටා දෝෂ" බලන්න.

**#11104 — ක්රියාකරු විසින් ප්රකාශ කළ නීති අවසර ලැයිස්තු දෙකම මඟ හරියි.**
ක්රියාකරුවෙකුට මෙම ගොනුව සංස්කරණය නොකර
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
හරහා ධාවන වේලාවේදී සපයන්නා-විශේෂ නීතියක් ප්රකාශ කළ හැක. ක්රියාකරු නීතියක්
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` පිටුපසින් පාලනය
කිරීම — **පෙරනිමි** අන්තර්නිර්මිත නාමාවලි නීතිවල හැසිරීම ආරක්ෂා කිරීමට අදහස්
කළ අවසර ලැයිස්තු — දැනටමත් එහි ලැයිස්තුගත කර ඇති සපයන්නන් හැර අනෙක් සෑම
සපයන්නෙකු සඳහාම සැකසුම් යාන්ත්රණය අක්රිය කරනු ඇත, මන්ද නීතිය ප්රකාශ කිරීමම
ක්රියාකරුගේ පැහැදිලි ඉල්ලීම වන බැවිනි. `resolveRuleMatchBody()` සහ
`honorsRuleLockScope()` යන දෙකම පළමුව `hasOperatorRuleForProvider()` පරීක්ෂා
කරයි: ක්රියාකරු නීතියක් ඇති සපයන්නෙකුට, ඔහු අවසර ලැයිස්තු දෙකෙන් එකක ද
ඇතුළත්ද යන්න නොසලකා, අමු දෝෂ පෙළ ලැබෙන අතර ඔහු ප්රකාශ කළ `scope` වෙත ගරු
කරනු ලැබේ.

**දන්නා හිඩැස — HTTP 400 සඳහා `providerRuleRegistry` කිසි විටෙක විමසනු
නොලැබේ.** `checkFallbackError` හි `BAD_REQUEST` ශාඛාව, තත්ත්ව 400 සම්පූර්ණයෙන්ම
තමන්ගේම රටා අරාවන් (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, ආදිය `accountFallback.ts` තුළ) හරහා වර්ගීකරණය
කරන අතර, ඊට ඉහළින් ඇති `configuredRule`/`getProviderErrorRuleMatch` ශාඛාවට
ළඟා වීමට පෙර ආපසු පැමිණේ. `status: 400` සහිත අන්තර්නිර්මිත නාමාවලි නීතියක්
(හෝ ක්රියාකරු නීතියක්) වාක්යරීතිමය වශයෙන් වලංගු වුවද කිසි විටෙක ක්රියාත්මක
නොවේ. අද පවතින කිසිදු නීතියක් 400 ඉලක්ක නොකරන බැවින් නිෂ්පාදන පරිසරයේ
කිසිවකට බලපෑමක් නැත — නමුත් අනාගත 400 නීතියක් සඳහා පළමුව මෙම ශාඛාව වෙනස්
කළ යුතු අතර, එය නීතියක් එක් කිරීමට වඩා විශාල වෙනසකි (එය දැනටමත්
රටා-අරා හැසිරීම මත රඳා පවතින සෑම සපයන්නෙකු සඳහාම 400 නැවත වර්ගීකරණය කරයි)
සහ තනි-සපයන්නා නීති එකතු කිරීමක විෂය පථයෙන් පිටතය.

### කෝටා වැරදි ලෙස දක්වන නව gateway එකක් එකතු කිරීම

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) හි rule array එකක් ලියාපදිංචි කරන්න. `textMarkers`
   provider-විශේෂිතව තබන්න; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) සමඟ ගැටෙන සාමාන්ය ඉංග්රීසි වාක්ය
   ඛණ්ඩ කිසි විටෙකත් නැවත භාවිතා නොකරන්න.
2. නිවැරදි lock scope එක තෝරා ගැනීමට (ගිණුම-පුරා කෝටා සඳහා `connection`,
   එක් එක් model එකට අදාළ දෝෂ සඳහා `model`) අවශ්ය නම්
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) හි
   වර්ගීකරණ නීති ලියාපදිංචි කරන්න. මෙම පියවර production හිදී ක්රියාත්මක වන්නේ
   සම්පූර්ණ දෝෂ පාඨය (body markers) අවශ්ය වන නීති ඇති providers සඳහා පමණි:
   provider id එක එම ගොනුවේම `FULL_TEXT_RULE_PROVIDERS` වෙත එකතු කරන්න —
   එසේ නොමැතිනම් `checkFallbackError` නීතියට ලබා දෙන්නේ ව්යුහගත
   `{code, type}` දෝෂය පමණක් වන අතර body-text නීතියක් සජීවී traffic සමඟ
   කිසි විටෙකත් ගැලපෙන්නේ නැත. පිරිසිදුවම `status`/`headers` මත ගැලපෙන නීති
   (Opencode හෝ Minimax වැනි) මෙම opt-in එක අවශ්ය නොවේ. වෙනම ලෙස, නීතිය
   `scope: "connection"` ලෙස ප්රකාශ කර ඇති අතර අභිප්රාය සැබෑ
   connection-පුරා cooldown එකක් සහ එම-request එකේම combo skip එකක්
   (තොරතුරු ලේබලයක් පමණක් නොව) නම්, provider id එක එම ගොනුවේම
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` වෙත එකතු කරන්න — මෙය
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) සහ
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) තුළ
   `isAgentrouterConnectionQuotaScope()`-ශෛලියේ පරිභෝජනය පාලනය කරන දෙයයි;
   එය නොමැතිව, `scope` තවමත් `fallbackResult.ruleScope` හරහා ගලා යන
   නමුත් කිසිවක් ඒ මත ක්රියා නොකරයි.
3. `tests/unit/upstream-status-restatement.test.ts` සහ
   `tests/unit/agentrouter-error-rules.test.ts` අනුරූප කරන unit tests එකතු
   කරන්න (not-permanent / not-creditsExhausted guards ඇතුළුව, සහ — provider ට
   allowlist එක අවශ්ය නම් — `resolveRuleMatchBody()` සම්පූර්ණ පාඨය
   ආපසු දෙන්නේ එම provider සඳහා පමණක් බව තහවුරු කරන test එකක්).

`chatCore.ts`, `classifyError`, හෝ combo වල කිසිදු වෙනසක් අවශ්ය නොවේ.

#### Egress-බාල්දිගත lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` හි ඇති providers (opencode පවුල)
IP-බාල්දිගත upstream ලෙස සලකනු ලැබේ (opencode free tier එක IP-බාල්දිගත
වන අතර ගිණුම-බාල්දිගත නොවේ — #9611 බලන්න): status-429 ලෙස වර්ගීකරණය කරන
ලද `quota_exhausted` **හෝ** `rate_limit_exceeded` එකක්, rotation එකට ඒවා
උත්සාහ කිරීමට පෙර, අසාර්ථක වූ connection එකේ අවසන් වරට දන්නා egress IP
එකට ගැලපෙන allowlist-පවුලේ සෑම connection එකක්ම cool down කරයි
— සහතිකවම අසාර්ථක වන upstream ඇමතුම් N-1 ක් වළක්වා ගනිමින්
(#10460/#10525 හා සමාන ආකාරයකි).
`rate_limit_exceeded` හිතාමතාම ඇතුළත් කර ඇත: `markAccountUnavailable`
මාවතේ opencode-විශේෂිත නීති කිසි විටෙකත් ගැලපෙන්නේ නැත
(`checkFallbackError` වෙත headers/body ලබා නොදේ, opencode
`FULL_TEXT_RULE_PROVIDERS` හි නොමැත), එබැවින් body එකේ
subscription-කෝටා පාඨය ("monthly usage limit
reached") ඇති 429 ක්, `status_429` නීතියට කවර විටෙක හෝ ළඟා වීමට පෙර,
කෝටා-පාඨ fallback එක (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1h cooldown) මඟින් `quota_exhausted` ලෙස
වර්ගීකරණය වේ — අතරම කෝටා-පාඨයක් නොමැති 429 ක් (සරල rate limiting)
`status_429` නීතිය හරහා `rate_limit_exceeded` ලෙස වර්ගීකරණය වන අතර
තවමත් IP පවුල cool down කරයි. allowlist කළ provider කෙනෙකු සඳහා
IP-බාල්දිගත rate limit එකක් ඉවර වූ කෝටාවක් හා සමාන signal එකකි.
අවංක සීමාවන්:

- **හොඳම-උත්සාහය (best-effort)**: අගුල සම්බන්ධතාවයේ අවසන් වරට දන්නා `egress_ip`
  `proxy_logs` වෙතින් විසඳයි (පැය 24 කවුළුව, සමකාලීන, cache නැත). සීතල cache
  (egress IP කවදාවත් probe කර නොමැත) හෝ පේළියක් නොමැත → අසාර්ථක වන සම්බන්ධතාවය
  තවමත් ශාඛාව මගින් සිසිල් කෙරේ (අද මෙන් සටහන් කෙරේ), ලොක් කරන ලද සහෝදරයෙක්
  නොමැති වීම පමණි.
- **කවදාවත් අවසාන නොවේ**: සිසිලනය යනු අලුත් වන කෝටා කවුළුවකි
  (`testStatus: "unavailable"`); IP-මට්ටමේ සංකේතයකින් ස්ථිර තත්ත්වයක් කවදාවත්
  ගොඩනගනු නොලැබේ. `disableCooling` සම්බන්ධතා ශාඛාව සම්පූර්ණයෙන්ම මඟහරයි.
- **Allowlist කරන ලද පවුල සඳහා අගුළු ග්රැනියුලරිටි වෙනස් වේ**: මෙය සහෝදර
  ප්රශස්තිකරණයක් පමණක් නොව, විෂය පථ වෙනසකි. opencode යනු `passthroughModels`
  සැපයුම්කරුවෙකු බැවින්, මෙම ශාඛාවට පෙර 429 ක් ආකෘති-වාරී (per-MODEL) අගුළු
  දැමීමක් ඇති කළේය; එය දැන් සම්බන්ධතා සිසිලනයක් ඇති කරයි — කිසිදු සහෝදරයෙක්
  නොමැති තනි සම්බන්ධතාවයක් ක්රියාත්මක කරන මෙහෙයවුම්කරුවෙකු සඳහා පවුමි. එය
  opencode නීති වගුව දැනටමත් නිවැරදි යැයි ප්රකාශ කරන ග්රැනියුලරිටි ය
  (`scope: "connection"`, `providerErrorRules.ts`), opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` තුළ නොමැති නිසා මෙතෙක් කවදාවත් අනුගමනය
  කර නොමැත. ශාඛාව, සම්බන්ධතා-විෂය පථ agentrouter ශාඛාව පිළිබිඹු කරමින්,
  අසාර්ථක සම්බන්ධතාවයේ සිසිලනය + `backoffLevel` එයම ලියන අතර ආපසු එයි —
  ආකෘති-වාරී අවහිරය සහ පහත සාමාන්ය මාවත කිසිවිටෙක ළඟා නොවේ.
- **Combo ඇතුළත්**: agentrouter ශාඛාව මෙන්, විෂය පථය combo අමතන්නෙක් 429 ක්
  කෙරෙහි යොදන `persistUnavailableState`/`isCombo` අවපාතය හිතාමතාම නොසලකා
  හරියි. ආකෘති-වාරී අගුළු දැමීමක් මෙම විෂය පථයේ දුර්වල ආකාරයක් නොවේ, එය වැරදි
  ඒකකයයි: එය හිස් වූ IP එක ගැන කිසිවක් නොකියයි, එබැවින් combo භ්රමණය සහෝදරයෙකු
  කෙරෙහි සහතික-අසාර්ථක ඇමතුමක් දවා දැමීම දිගටම කරගෙන යනු ඇත.
- **සහෝදර ආරක්ෂාව**: දැනටමත් අවසාන තත්ත්වයක (banned/credits_exhausted) හෝ දැනටමත්
  දීර්ඝ සිසිලනයක සිටින සහෝදරයෙක් කවදාවත් නැවත ලියනු නොලැබේ.
- **සුවිශේෂී allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` පුළුල් කිරීම පැහැදිලි
  හිමිකරු තීරණයකි; සාමාන්ය wiring නැත (රටාව #10334/#10419). සහෝදර විමසුම එය
  SQL literal ලෙස නැවතීම වෙනුවට එම allowlist එකම බැඳ තබයි, එබැවින් එය පුළුල්
  කිරීම එක්-පේළි වෙනසක් ලෙසම පවතී.
- **Egress IP භ්රමණය, දිශා දෙකටම**: සොයාබැලීමේ කවුළුව (පැය 24) egress-IP cache
  TTL (විනාඩි 5) ට වඩා බොහෝ පුළුල් බැවින්, "අවසන් වරට දන්නා IP" යනු වත්මන්
  තත්ත්වය නොව ඉතිහාසයයි. සම්බන්ධතාවයක proxy එක කවුළුව තුළ භ්රමණය වී ඇත්නම්,
  අගුල සැබවින්ම බෙදාගත් IP එකක් **මඟහරවා ගත හැක** (සටහන් කර ඇති IP එක අලුත්,
  හිස් නොවූ එකයි) — සහ සමමිතිකව එය හිස් වූ IP එකෙන් ඉන්පසු භ්රමණය වී ඉවත් වූ
  සහෝදරයෙකු **සිසිල් කළ හැක**. දෙවන අවස්ථාව එම සහෝදරයාට සිසිලන කවුළුවක පිරිවැයක්
  දරයි; දෙකම ඉතිහාස-පාදක සොයාබැලීමක පිළිගත් හොඳම-උත්සාහ සීමාවන් වේ.
- **පිරිවැය**: `proxy_logs` හි සීමිත ස්කෑන් දෙකක් (`idx_pl_timestamp` හරහා
  කවුළුවෙන් පෙරහන් කරන ලද), 429 සංඛ්යාතයේදී පමණි. නව දර්ශකයක් නැත (සංක්රමණය
  134 YAGNI). මධ්යම ප්රමාණයේ සැබෑ-ගමනාගමන DB පිටපතක මනින ලදී; ඉහළ-throughput
  අවස්ථාවක් එම කවුළුවේම සමානුපාතිකව වැඩි පේළි ප්රමාණයක් දරයි.

---

## අනෙකුත් ඔරොත්තු දැක්වීමේ විශේෂාංග

- **මාර්ග උපාය 21ක්** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) බලන්න.
- **යළි සැකසුම-දැනුවත් මාර්ගය** (v3.8.0) — කෝටා යළි සැකසුම් වේලාව අනුව සම්බන්ධතාවලට ප්රමුඛතා දෙයි.
- **පසුබිම් මාදිලි පහත වැටීම** — Responses API `background: true` අවවාදයක් සමඟ සමමුහුර්ත වෙත පහත වැටේ.
- **ගතික මෙවලම් සීමා අනාවරණය** — මෙවලම් ගණන සීමාවන්ට ළඟා වූ විට සැපයුම්කරුවන්ගෙන් පසුබසී.
- **හදිසි පසුබැසීම** — `OMNIROUTE_EMERGENCY_FALLBACK` මඟින් පාලනය වේ; ක්රියාකරුවන්ට යළි ආරම්භයකින් තොරව Feature Flags පිටුවෙන් එය අභිබවා යා හැක.

---

## නිදොස්කරණය

- Weighted combo එක `503 all_targets_cooling_down` ලෙස පිළිතුරු දේ (`Retry-After` සකසා ඇත, `diagnostics.excluded` සෑම ඉලක්කයක්ම `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` සමඟ ලැයිස්තුගත කරයි) → පොල එක වින්යාසගත කර සම්බන්ධ කර ඇත, සෑම ඉලක්කයක්ම ඔරොත්තු දැක්වීමේ ටයිමරයකින් බැහැර කර ඇති බවක් පමණි; `[COMBO] Weighted selection: every target excluded before dispatch — …` අවවාදය හේතු සහ ඉතිරි තත්පර සඳහන් කරයි. එම combo එකෙන්ම ලැබෙන `404 no_executable_targets` යනු කිසිදු ඔරොත්තු ටයිමරයක් සම්බන්ධ නොවූ බවයි (ධාවනය කිරීමට දෙයක් නැත, නැතහොත් සෑම ගිණුමක්ම ලබා ගත හැකි බව පරීක්ෂා කිරීමෙන් අසාර්ථක විය). `targetResolution.ts` හි එකතු කරන ලද බැහැර කිරීම් වලින් `open-sse/services/combo/pinRecovery.ts` හි ඉදිකර ඇත.
- සැපයුම්කරුවෙකුගේ සියලුම යතුරු මඟහරින ලදි → circuit breaker තත්ත්වය සහ සෑම සම්බන්ධතාවයකම `rateLimitedUntil`/`testStatus` යන දෙකම පරීක්ෂා කරන්න.
- යළි සැකසුම් කවුළුවෙන් පසු සැපයුම්කරු ස්ථිරවම බැහැර කර ඇත → `getStatus()`/`canExecute()` වෙනුවට අමු `state` කියවන කේතයක්.
- එක් යතුරක් අසාර්ථක වන නමුත් අනෙකුත් යතුරු වැඩ කළ යුතුය → circuit breaker වෙනුවට connection cooldown එකට මුල් තැන දෙන්න.
- එක් ආකෘතියක් පමණක් අසාර්ථක වේ → connection cooldown වෙනුවට model lockout එකට මුල් තැන දෙන්න.
- තත්ත්වය ස්වයං-ප්රතිසාධනය විය යුතු නමුත් වන්නේ නැත → අනාගත කාලරාමුවක් සහ කල් ඉකුත් වූ තත්ත්වය නැවුම් කරන කියවීමේ මාර්ගයක් තිබේදැයි පරීක්ෂා කරන්න. ස්ථිර තත්ත්ව සඳහා අතින් වෙනස්කම් අවශ්ය වේ.

---

## ධාවන කාලීන තත්ත්වය — නියෝජිත ඉක්මන් සඳහන

> නියෝජිත මාර්ගෝපදේශය 40k සන්දර්භ අයවැය යටතේ රැඳී සිටීම සඳහා `AGENTS.md` → "ඔරොත්තු දැක්වීමේ ධාවන කාලීන තත්ත්වය" වෙතින් වචනානුසාරයෙන් ගෙන එන ලදි (PR #12743). එය ඉහත කොටස්වල සංක්ෂිප්ත, නියෝජිතයා-මුහුණුවර දර්ශනයයි; අංකිත කොටස් සම්පූර්ණ සඳහන ලෙස පවතී.

OmniRoute හි සම්බන්ධ නමුත් වෙනස් තාවකාලික-අසාර්ථකත්ව යාන්ත්රණ තුනක් ඇත. මාර්ග හැසිරීම නිදොස්කරණය කරන විට ඒවායේ විෂය පථය වෙන වෙනම තබන්න. එක බැල්මක සිතියමක් සඳහා
[ස්ථර-3 ඔරොත්තු දැක්වීමේ රූපසටහන](../diagrams/exported/resilience-3layers.svg)
(මූලාශ්රය: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
බලන්න.

### සැපයුම්කරු පරිපථ විච්ඡේදකය

**විෂය පථය**: සම්පූර්ණ සැපයුම්කරු, උදා. `glm`, `openai`, `anthropic`.

**අරමුණ**: ඉහළ ගලායාම/සේවා මට්ටමින් නැවත නැවත අසාර්ථක වන සැපයුම්කරුවෙකු වෙත ගමනාගමනය යැවීම නැවැත්වීම, එවිට එක් අසෞඛ්ය සම්පන්න සැපයුම්කරුවෙකු සෑම ඉල්ලීමක්ම මන්දගාමී නොකරයි.

**ක්රියාත්මක කිරීම**:

- මූලික පංතිය: `src/shared/utils/circuitBreaker.ts`
- Chat දොරටු/ක්රියාත්මක වයරින්: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ධාවන කාලීන තත්ත්ව API: `src/app/api/monitoring/health/route.ts`
- බෙදාගත් ආවරණ: `open-sse/services/accountFallback.ts`
- ස්ථාවර තත්ත්ව වගුව: `domain_circuit_breakers`

**තත්ත්ව** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: සාමාන්ය ගමනාගමනයට අවසර ඇත.
- `DEGRADED`: මුල් අවවාද කලාපය — අසාර්ථකත්ව පහත වැටීමේ සීමාව පසු කළ නමුත් බ්රේකර් සීමාව තවම නොවේ; ගමනාගමනය තවමත් ගලා යයි, උපකරණ පුවරු අවවාදය පෙන්වයි. වලංගු සම්බන්ධතා පරීක්ෂණයක් හෝ නව අසාර්ථකත්වයක් නොමැති නිශ්ශබ්ද කවුළුවක් එය `CLOSED` වෙත ආපසු ගෙන එයි
  (`docs/architecture/RESILIENCE_GUIDE.md` හි කවුළුව ඇත).
- `OPEN`: සැපයුම්කරු තාවකාලිකව අවහිර කර ඇත; අමතන්නන්ට provider-circuit-open පිළිතුරක් ලැබේ
  නැතහොත් combo මාර්ගය වෙනත් ඉලක්කයකට මඟ හරියි.
- `HALF_OPEN`: යළි සැකසුම් කාලය ඉකුත් වී ඇත; පරීක්ෂණ ඉල්ලීමකට අවසර දෙන්න. සාර්ථකත්වය බ්රේකරය වසා දමයි, අසාර්ථකත්වය එය නැවත විවෘත කරයි.

**පෙරනිමි** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` හි `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` හරහා පරිභෝජනය වේ →
`src/sse/handlers/chatHelpers.ts` හි `getCircuitBreaker(provider, …)`). සම්පූර්ණ-සැපයුම්කරු
බ්රේකරය `circuitBreakerThreshold` / `circuitBreakerReset` මත ක්රියාත්මක වේ:

| පැතිකඩය | පහත වැටෙන්නේ | විවෘත වන්නේ (`circuitBreakerThreshold`) | යළි සැකසීම (`circuitBreakerReset`) |
| ------- | -----------: | --------------------------------------: | ---------------------------------: |
| OAuth   |          `5` |                                     `8` |                              `60s` |
| API key |          `7` |                                    `12` |                              `30s` |
| Local   | (ව්යුත්පන්න) |                                     `2` |                              `15s` |

`PROVIDER_PROFILES` තවද `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) සහ `providerCooldownMs` (5/10/1 min) අර්ථ දක්වයි: මේවා
**විකල්ප ලෙස තෝරාගත හැකි ගෝලීය Provider Cooldown එකේ කවුළු දොරටුව** බලගන්වයි (`PROVIDER_COOLDOWN_ENABLED`, පෙරනිමිය වසා ඇත)
— `open-sse/services/providerCooldownTracker.ts` හි සැපයුම්කරු-මට්ටමින් ඇතුළත් කිරීමක්, `providerFailureWindowMs` තුළ `providerFailureThreshold` අසාර්ථකත්වයන්ට පසුව පමණක්
සිසිලනය ලෙස ගණනය වේ, පසුව `providerCooldownMs` තරම කාලයක් සිසිල වේ. මේවා සජීවී බ්රේකරයේ සීමාවන්
නොවේ — බ්රේකර් හැසිරීම අපේක්ෂා කරමින් ඒවා සකස් නොකරන්න. සෑම පෙරනිමියක්ම
`OMNIROUTE_PROVIDER_BREAKER_*` සහ `OMNIROUTE_CIRCUIT_BREAKER_*` පරිසර විචල්යයන් හරහා අභිබවා යා හැක;
ධාවන-නිවැරදි සඳහන් වගුව `docs/architecture/RESILIENCE_GUIDE.md` හි පවතී.

සැපයුම්කරු-මට්ටමින් අසාර්ථකත්ව තත්ත්ව පමණක් සැපයුම්කරු බ්රේකරය ක්රියාත්මක කළ යුතුය:

```ts
(408, 500, 502, 503, 504);
```

බොහෝ `401`, `403`, හෝ `429` අවස්ථා වැනි සාමාන්ය ගිණුම්/යතුරු/ආකෘති දෝෂ සඳහා සම්පූර්ණ-සැපයුම්කරු
බ්රේකරය ක්රියාත්මක නොකරන්න. ඒවා සාමාන්යයෙන් connection cooldown හෝ model
lockout වලට අයත් වේ. සාමාන්ය API-යතුරු සැපයුම්කරුවෙකුගේ `403` එකක්, අවසාන සැපයුම්කරු/ගිණුම්
දෝෂයක් ලෙස වර්ගීකරණය කර නොමැති නම්, ප්රතිසාධනය කළ හැකි එකක් විය යුතුය.

Breaker එක background timer එකක් නොව, lazy recovery භාවිතා කරයි. `OPEN` කල් ඉකුත් වූ විට, `getStatus()`, `canExecute()`, සහ `getRetryAfterMs()` වැනි reads state එක `HALF_OPEN` ලෙස refresh කරයි, එබැවින් dashboards සහ combo candidate builders කල් ඉකුත් වූ provider කෙනෙකු සදහටම බැහැර කර නොතබයි.

### සම්බන්ධතා Cooldown

**විෂය පථය**: එක් provider සම්බන්ධතාවයක්/ගිණුමක්/key එකක්.

**අරමුණ**: එකම provider සඳහා වෙනත් සම්බන්ධතා ඉල්ලීම් සැපයීම දිගටම කරගෙන යාමට ඉඩ දෙන අතරතුර, දෝෂ සහිත එක් key/ගිණුමක් තාවකාලිකව මඟ හැරීම.

**ක්රියාත්මක කිරීම**:

- ලිවීමේ/යාවත්කාලීන කිරීමේ මාර්ගය: `src/sse/services/auth.ts::markAccountUnavailable()`
- ගිණුම් තේරීම/පෙරීම: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown ගණනය කිරීම: `open-sse/services/accountFallback.ts::checkFallbackError()`
- සැකසුම්: `src/lib/resilience/settings.ts`

Provider සම්බන්ධතා මත ඇති වැදගත් ක්ෂේත්ර:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ගිණුම් තේරීමේදී, පහත කොන්දේසිය සත්ය වන අතරතුර සම්බන්ධතාවයක් මඟ හරිනු ලැබේ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns ද lazy වේ: `rateLimitedUntil` අතීතයේ ඇති විට, සම්බන්ධතාවය නැවත සුදුසුකම් ලබයි. සාර්ථක භාවිතයකදී, `clearAccountError()` විසින් `testStatus`, `rateLimitedUntil`, දෝෂ ක්ෂේත්ර, සහ `backoffLevel` ඉවත් කරයි.

පෙරනිමි සම්බන්ධතා cooldown හැසිරීම:

- OAuth මූලික cooldown: `5s`.
- API-key මූලික cooldown: `3s`.
- API-key `429` සඳහා ලබා ගත හැකි විට upstream retry ඉඟි (`Retry-After`, reset headers, හෝ parse කළ හැකි reset text) ප්රමුඛත්වය දිය යුතුය.
- නැවත නැවත ඇති වන නැවත ලබා ගත හැකි අසාර්ථකත්වයන් exponential backoff භාවිතා කරයි:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd ආරක්ෂකය, එකම සම්බන්ධතාවයක සමවිරිත (concurrent) අසාර්ථකත්වයන් cooldown එක නැවත නැවත දීර්ඝ කිරීමෙන් හෝ `backoffLevel` දෙවරක් වැඩි කිරීමෙන් වළක්වයි.

අවසාන (terminal) තත්ත්වයන් cooldowns නොවේ. `banned`, `expired` (`EXPIRED_RETRY_MAX` හරහා N සීමිත නැවත උත්සාහයන්ට පසුව පමණක් අවසාන වේ), සහ `credits_exhausted` යනු credentials/සැකසුම් වෙනස් වන තෙක් හෝ operator කෙනෙකු ඒවා reset කරන තෙක් නොලැබෙන ලෙස රැඳී සිටීමට අදහස් කර ඇත. අවසාන තත්ත්වයන් තාවකාලික cooldown තත්ත්වයකින් නැවත ලියන්න එපා.

### ආකෘති Lockout

**විෂය පථය**: provider + සම්බන්ධතාවය + ආකෘතිය.

**අරමුණ**: එම සම්බන්ධතාවය සඳහා එක් ආකෘතියක් පමණක් නොලැබෙන හෝ quota-සීමිත වූ විට, මුළු සම්බන්ධතාවයම අක්රීය කිරීම වළක්වා ගැනීම.

උදාහරණ:

- `429` ලබා දෙන ආකෘති-එකක quota providers.
- අස්ථානගත වූ එක් ආකෘතියක් සඳහා `404` ලබා දෙන දේශීය providers.
- තෝරාගත් Grok modes වැනි provider-විශේෂිත mode/model අවසර අසාර්ථකත්වයන්.

Model lockout `open-sse/services/accountFallback.ts` හි පිහිටා ඇති අතර, එකම සම්බන්ධතාවයට වෙනත් ආකෘතීන් සැපයීම දිගටම කරගෙන යාමට ඉඩ දෙයි.

### Debugging මඟ පෙන්වීම

- Provider කෙනෙකුගේ සියලුම keys මඟ හැර ඇත්නම්, provider breaker state එක සහ එක් එක් සම්බන්ධතාවයේ `rateLimitedUntil`/`testStatus` යන දෙකම පරීක්ෂා කරන්න.
- Reset window එකෙන් පසුව provider කෙනෙකු ස්ථිරවම බැහැර කර ඇති බව පෙනේ නම්, කේතය `getStatus()`/`canExecute()` භාවිතා කිරීම වෙනුවට අමු `state` කියවනවාදැයි බලන්න.
- එක් provider key එකක් අසාර්ථක වුවත් අනෙක් ඒවා ක්රියාත්මක විය යුතු නම්, provider breaker වලට වඩා සම්බන්ධතා cooldown එකට ප්රමුඛත්වය දෙන්න.
- එක් ආකෘතියක් පමණක් අසාර්ථක වුවහොත්, සම්බන්ධතා cooldown වලට වඩා model lockout එකට ප්රමුඛත්වය දෙන්න.
- තත්ත්වයක් ස්වයං-ප්රත්යාරෝපණය විය යුතු නම්, එයට අනාගත timestamp/reset timeout එකක් සහ කල් ඉකුත් වූ තත්ත්වය refresh කරන read path එකක් තිබිය යුතුය. ස්ථිර තත්ත්වයන්ට අතින් credential හෝ config වෙනස් කිරීම් අවශ්ය වේ.

---

## TLS Fingerprinting සහ Stealth

Provider-විශේෂිත stealth (JA3/JA4, CCH, obfuscation) වෙනම ලේඛනගත කර ඇත — `docs/security/STEALTH_GUIDE.md` බලන්න (git; `/docs` වෙත compile කර නොමැත).

---

## Resilience පරීක්ෂණ (Phase 8 · Block C)

Resilience තර්කනය සඳහා unit පරීක්ෂණවලින් ඔබ්බට, පරීක්ෂණ තුනක් සැබෑ stress/අසාර්ථකතා තත්ත්වයන් යටතේ runtime එක ක්රියාත්මක කරයි (සියල්ල integration/nightly — කිසිවක් PRs අවහිර නොකරයි):

| පරීක්ෂණය    | කුමක්ද                                                                                                                                                                                                   | ධාවනය                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node එක සැබෑ latency/reset/timeout/503 එනේක්ෂණය කරයි; circuit breaker එක විවෘත වී/ප්රතිසාධනය වන බවත් `checkFallbackError` 503 නැවත ලබාගත හැකි fallback ලෙස වර්ගීකරණය කරන බවත් තහවුරු කරයි. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` යටතේ `createSSEStream` එකකට streams ~500ක්; heap එක සීමාව ඉක්මවා වර්ධනය වුවහොත් අසාර්ථක වේ (OOM guard #3069).                                                                              | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` වෙත අඛණ්ඩ load එක; p95/error සීමා.                                                                                                                                              | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) මගින් සම්බන්ධීකරණය කර ඇත. පෙරනිමි `test:integration` තුළ, chaos සහ heap ස්වයං-මඟහැරේ (`RUN_CHAOS_INT`/`--expose-gc` නොමැතිව).

---

## මෙයත් බලන්න

- [ගෘහ නිර්මාණ ශිල්ප මාර්ගෝපදේශය](./ARCHITECTURE.md) — පද්ධති ගෘහ නිර්මාණ ශිල්පය සහ අභ්යන්තර කරුණු
- [පරිශීලක මාර්ගෝපදේශය](../guides/USER_GUIDE.md) — Providers, combos, CLI ඒකාබද්ධ කිරීම
- [Auto-Combo එන්ජිම](../routing/AUTO-COMBO.md) — සාධක-16 ලකුණු කිරීම, mode packs
