# Resilience Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute සතුව එකිනෙකට වෙනස් නමුත් සම්බන්ධිත ප්රත්යස්ථතා යාන්ත්රණ තුනක් ඇත. ඒ සෑම එකකටම වෙනස් විෂය පථයක් සහ අරමුණක් ඇත. රවුටින් හැසිරීම නිදොස් කිරීමේදී ඒවා වෙන් වෙන්ව සලකන්න.

![ස්තර 3ක ප්රත්යස්ථතා ආකෘතිය](../diagrams/exported/resilience-3layers.svg)

> මූලාශ්රය: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. සැපයුම්කරුගේ Circuit Breaker

**විෂය පථය:** සම්පූර්ණ සැපයුම්කරු (උදා., `glm`, `openai`, `anthropic`).

**අරමුණ:** upstream/සේවා මට්ටමේදී නැවත නැවතත් අසාර්ථක වන සැපයුම්කරුවෙකු වෙත ගමනාගමනය යැවීම නැවැත්වීම.

**ක්රියාත්මක කිරීම:**

- මූලික class එක: `src/shared/utils/circuitBreaker.ts`
- සම්බන්ධ කිරීම: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- තත්ත්ව API එක: `GET /api/monitoring/health`
- යළි සැකසීමේ API එක: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- DB වගුව: `domain_circuit_breakers`

**තත්ත්ව:**

- `CLOSED` — සාමාන්ය ගමනාගමනයට අවසර ඇත
- `DEGRADED` — ගමනාගමනයට තවමත් අවසර ඇත, නමුත් ඉහළ ගොස් ඇති සැපයුම්කරු අසාර්ථකවීම් නිරීක්ෂණය කෙරේ
- `OPEN` — සැපයුම්කරු තාවකාලිකව අවහිර කර ඇත; combo රවුටින් එය මඟ හරියි
- `HALF_OPEN` — යළි සැකසීමේ කාලසීමාව ඉකුත් වී ඇත; පරීක්ෂණ ඉල්ලීමකට අවසර ඇත

**වින්යාස කළ හැකි පෙරනිමි (`open-sse/config/constants.ts`, උපකරණ පුවරුව → සැකසුම් → ප්රත්යස්ථතාව තුළ පෙන්වයි):**

| පන්තිය  | පිරිහෙන්නේ      | විවෘත වන්නේ      | යළි සැකසීමේ කාලසීමාව |
| ------- | --------------- | ---------------- | -------------------- |
| OAuth   | අසාර්ථකවීම් 5ක් | අසාර්ථකවීම් 8ක්  | 60s                  |
| API-key | අසාර්ථකවීම් 7ක් | අසාර්ථකවීම් 12ක් | 30s                  |
| Local   | ව්යුත්පන්න කළ   | අසාර්ථකවීම් 2ක්  | 15s                  |

`degradationThreshold` මඟින් සැපයුම්කරුවෙකු `DEGRADED` තත්ත්වයට ඇතුළු වන්නේ කවදාද යන්න පාලනය කරයි; `failureThreshold` මඟින් එය විවෘත වී මඟ හැරෙන්නේ කවදාද යන්න පාලනය කරයි. Local සැපයුම්කරු පැතිකඩ තවමත් ප්රත්යස්ථතා සැකසුම් පිටුවේ පෙන්වා නැත.

**ක්රියාත්මක වීමේ කේත:** සැපයුම්කරු මට්ටමේ `[408, 500, 502, 503, 504]` තත්ත්ව පමණි. ගිණුම් මට්ටමේ දෝෂ සඳහා (බොහෝ 401/403/429 — ඒවා cooldown හෝ lockout යටතට අයත් වේ) ක්රියාත්මක නොකරන්න.

**අලස ප්රතිසාධනය:** `OPEN` කල් ඉකුත් වූ විට, `getStatus()`, `canExecute()`, `getRetryAfterMs()` මඟින් තත්ත්වය `HALF_OPEN` ලෙස නැවුම් කරයි. පසුබිම් timer එකක් අවශ්ය නොවේ.

---

### තේරීමෙන් සක්රිය කළ හැකි ගෝලීය සැපයුම්කරු Cooldown එක (කාල කවුළු ද්වාරය)

සිව්වන, **තේරීමෙන් සක්රිය කළ හැකි** ස්තරයක් (`PROVIDER_COOLDOWN_ENABLED`, පෙරනිමියෙන් **අක්රියයි**) අසාර්ථක වන සැපයුම්කරුවන් පිළිබඳ ඉල්ලීම්-හරහා පවතින මතකයක්
`open-sse/services/providerCooldownTracker.ts` තුළ තබා ගන්නා අතර, අනුක්රමික combo ඉල්ලීම් මඟින් මෑතකදී
අසාර්ථක වූ සැපයුම්කරුවෙකු නැවත නැවත පිරික්සීම නැවැත්වීම සඳහා combo ඉලක්ක
විසඳීමේදී එය විමසනු ලැබේ. සැපයුම්කරු මට්ටමේ ඇතුළත් කිරීම් `PROVIDER_PROFILES` කාල කවුළු ද්වාරයට අනුකූල වේ:

| පැතිකඩ  | පසුව ක්රියාත්මක වේ (`providerFailureThreshold`) | ඇතුළත (`providerFailureWindowMs`) | cooldown පවතින්නේ (`providerCooldownMs`) |
| ------- | ----------------------------------------------: | --------------------------------: | ---------------------------------------: |
| OAuth   |                                            `10` |                           `15min` |                                   `5min` |
| API key |                                            `15` |                           `30min` |                                  `10min` |

සීමාවට පහළින් සැපයුම්කරු **cooldown තත්ත්වයේ** ඇතැයි නොසලකයි; සාර්ථක වීමකදී
කාල කවුළුව හිස් කෙරේ. සම්බන්ධතා මට්ටමේ ඇතුළත් කිරීම් (`provider:connectionId`) ඒ වෙනුවට
ඝාතීය `minRetryCooldownMs → maxRetryCooldownMs` පසුබැසීම පවත්වා ගනී. අතික්රමණ:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
ප්රතිගමන ආරක්ෂකය: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. සම්බන්ධතා සිසිලන කාලය

**විෂය පථය:** තනි සැපයුම්කරු සම්බන්ධතාවක්/ගිණුමක්/යතුරක්.

**අරමුණ:** එකම සැපයුම්කරු සඳහා ඇති අනෙකුත් සම්බන්ධතා දිගටම සේවය සපයන අතර එක් දෝෂ සහිත යතුරක් මඟහැරීම.

**ක්රියාත්මක කිරීම:**

- ලබාගත නොහැකි ලෙස සලකුණු කිරීම: `src/sse/services/auth.ts::markAccountUnavailable()`
- තේරීම: එම ගොනුවේ `getProviderCredentials*`
- සිසිලන කාල ගණනය: `open-sse/services/accountFallback.ts::checkFallbackError()`
- සැකසුම්: `src/lib/resilience/settings.ts`

**එක් සම්බන්ධතාවකට අදාළ ක්ෂේත්ර:**

- `rateLimitedUntil` — සිසිලන කාලය අවසන් වන තෙක් වූ කාල මුද්රාව
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ඝාතීය පසුබැසීමේ ගණකය

**පෙරනිමි සිසිලන කාල:**

- OAuth පදනම: තත්පර 5
- API-key පදනම: තත්පර 3
- API-key 429: upstream `Retry-After`/යළි පිහිටුවීමේ headers/විග්රහ කළ හැකි යළි පිහිටුවීමේ පෙළට ප්රමුඛත්වය දෙයි
- පසුබැසීම: `baseCooldownMs * 2 ** failureIndex`

**Anti-thundering-herd ආරක්ෂණය:** සමගාමී අසාර්ථක වීම් මඟින් සිසිලන කාලය අතිශයින් දිගු කිරීම හෝ `backoffLevel` දෙවරක් වැඩි කිරීම වළක්වයි.

**අවසන් තත්ත්ව (සිසිලන කාල නොවේ):**

- `banned` — තහනම් මූලපද / ගිණුම් තහනම් හඳුනාගැනීම මඟින් සකසනු ලැබේ ([BAN_DETECTION](../security/BAN_DETECTION.md) බලන්න), එමෙන්ම අඛණ්ඩ upstream එක්-ඉල්ලීමකට අදාළ ප්රතික්ෂේප කිරීම් තුනක් මඟින්ද (`request_rejected`, උදා. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); එක් ප්රතික්ෂේප කිරීමක් පමණක් සම්බන්ධතාව සිසිලන කාලයකට යොමු කරයි
- `expired` (සීමිත නැවත උත්සාහ කිරීම්වලින් පසු අවසන් තත්ත්වයකට මාරු වේ — ඝාතීය පසුබැසීම සමඟ `EXPIRED_RETRY_MAX = 3` — එබැවින් ගිණුම ස්ථිරව අක්රිය කිරීමට පෙර තාවකාලික OAuth දෝෂවලට ස්වයංක්රීයව යථා තත්ත්වයට පත් විය හැක)
- `credits_exhausted`

අක්තපත්ර වෙනස් වන තෙක් හෝ ක්රියාකරු ඒවා යළි පිහිටුවන තෙක් මේවා පවතී. තාවකාලික සිසිලන තත්ත්වයකින් අවසන් තත්ත්ව උඩින් ලිවීම නොකරන්න.

**ප්රමාදිත ප්රතිසාධනය:** `rateLimitedUntil` පසු වූ විට සම්බන්ධතාව නැවත සුදුසුකම් ලබයි. සාර්ථකව භාවිත කළ විට, `clearAccountError()` සියලු දෝෂ ක්ෂේත්ර ඉවත් කරයි.

### සැසි අනුබද්ධතාව (#7274)

**විෂය පථය:** **ඕනෑම** සැපයුම්කරුවකු සඳහා එක් සම්බන්ධතාවකට අමුණා ඇති එක් සේවාලාභී සැසියක් (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header).

**අරමුණ:** බහු-වාර නියෝජිතයකු (Claude Code, aider, අභිරුචි නියෝජිතයන්) ඉල්ලීම් හරහා එකම ගිණුමේ රඳවා තබා ගැනීමෙන්, ගිණුම් අතර සන්දර්භය අහිමි වීම සහ එක්-ගිණුමකට අදාළ සැසි තත්ත්වයක් ඇති සැපයුම්කරුවන් මත නැවත නැවත ඇති වන cold-start 429 දෝෂ අඩු කිරීම.

**ක්රියාත්මක කිරීම:**

- TTL නිරාකරණය: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ඇමුණුම තේරීම/නිර්මාණය: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header උකහා ගැනීම (සාමාන්ය, ඕනෑම සැපයුම්කරුවකු): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- පවත්වාගෙන යන ඇමුණුම් වගුව: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- සැකසුම: `sessionAffinityTtlMs` (ms වලින් ගෝලීය TTL, `0` අක්රිය කරයි) — `src/lib/db/settings.ts`. `124_generic_session_affinity_ttl.sql` සංක්රමණය මඟින් Codex සඳහා පමණක් වූ `codexSessionAffinityTtlMs` වෙතින් නම වෙනස් කර ඇති අතර, කලින් වින්යාස කළ Codex TTL අගයක් තිබේ නම් එය නව පෙරනිමිය ලෙස ගෙන යයි.

#7274 ට පෙර, `resolveSessionAffinityTtlMs()` විසින් `codex` හැර අනෙකුත් සෑම සැපයුම්කරුවකු සඳහාම වහාම `0` ලබා දුන් බැවින්, ඇමුණුම් යාන්ත්රණය සහ header උකහා ගැනීම ඒ වන විටත් සැපයුම්කරු-නිර්පේක්ෂ වුවද TTL සැකසුමට (සහ සැසි headers වලට) වෙනත් කිසි තැනක බලපෑමක් නොතිබුණි. නිවැරදි කිරීමෙන් එම පූර්ව ආපසු ලබාදීම ඉවත් කරන ලදී; දැන් TTL ගෝලීයව `0` ට වඩා වැඩි අගයකට සැකසූ පසු සෑම සැපයුම්කරුවකුටම ඒකාකාරව අදාළ වේ.

සැසි-අනුබද්ධතා headers තුන කිසිවිටෙකත් upstream වෙත යොමු නොකෙරේ — සේවාලාභී headers ඒ හරහා යැවීම වෙනුවට executors විසින් තමන්ගේම upstream headers මුල සිට ගොඩනඟන බැවින්, මෙය අභ්යන්තර සහසම්බන්ධතා හැඳුනුම්කාරකයක් ලෙස පමණක් පවතී.

### අනන්ය කළමනාකරණය කළ සැසි සම්බන්ධතා බදු

**විෂය පථය:** එක් සක්රිය කළමනාකරණය කළ HTTP සේවාලාභියකුට/සැසියකට එක් සුදුසුකම් ලත් OmniRoute සම්බන්ධතාවක් හිමි වේ.

**අරමුණ:** ඉල්ලීම් හරහා දැඩි routing
සීමාවක් අවශ්ය සේවාලාභීන් සඳහා කල්පවත්නා අනන්ය සම්බන්ධතා හිමිකාරිත්වයක් සැපයීම. මෙය මෘදු අඛණ්ඩතා ප්රමුඛතාවක් වන සැසි අනුබද්ධතාවෙන් වෙනස් වේ:
අනන්ය බද්දක් SQLite තුළ ජීවන චක්ර තත්ත්වය පවත්වාගෙන යයි, ගෝලීය සක්රිය-හිමිකරු සහ
සක්රිය-සම්බන්ධතා අනන්යතාව බලාත්මක කරයි, එමෙන්ම සැපයුම්කරු වෙත යැවීමට පෙර යල්පැන ගිය generation එකක් ප්රතික්ෂේප කරයි.

මෙම විශේෂාංගය එක් එක් API යතුර සඳහා තෝරා සක්රිය කළ යුතුය. කළමනාකරණය කළ යතුරකට `lease:exclusive` scope එක සහ
පැහැදිලිව දක්වා ඇති හිස් නොවන `allowedConnections` ලැයිස්තුවක් තිබිය යුතුය. ඕනෑම HTTP සේවාලාභියකුට ජීවන චක්ර endpoint එක භාවිත කළ හැක; කිසිදු
සේවාලාභී නාමයක්, user-agent එකක්, සැපයුම්කරුවකු, OAuth ක්රමයක් හෝ model එකක් අවශ්ය නොවේ. බද්දට හිමි වන්නේ සම්බන්ධතාවක් මිස
model එකක් නොවන බැවින්, සම්බන්ධතාව සාමාන්යයෙන්
සුදුසුකම් ලබන තාක් model වෙනසකදීත් බැඳීම රඳවා ගනී. සාමාන්ය model, quota, health, cooldown, සහ allowlist නීති තවදුරටත් තීරණාත්මක වන අතර
එම generation එකම වෙනත් නිදහස් සුදුසුකම් ලත් සම්බන්ධතාවකට මාරු කළ හැක.

ජීවන චක්රය JSON ක්රියා `acquire`, `renew`, සහ `release` සමඟ `POST /api/v1/session-leases` වේ.
කළමනාකරණය කළ inference ඉල්ලීම් අපැහැදිලි `X-OmniRoute-Lease-Owner` අගය සහ නිශ්චිත
`X-OmniRoute-Lease-Generation` ඉදිරිපත් කරයි. හිමිකරු `vlo_` ට පසුව base64url අක්ෂර 43ක් භාවිත කරයි; ගබඩා කරනු ලබන්නේ
එහි SHA-256 hash එක පමණි. සෑම අවසාන dispatch fence එකක්ම සත්යාපිත API key ID එක සහ
සක්රිය connection ID එක ද බැඳ තබයි. Lease control headers logs, රඳවාගත් request snapshots, සහ
upstream executor headers වෙතින් ඉවත් කරනු ලැබේ.

සාමාන්ය routing සඳහා සුදුසුකම් ලත් කළමනාකරණය කළ candidates තිබුණද සෑම නිදහස් candidate එකක්ම
වෙනත් සක්රිය බද්දක් මඟින් අත්පත් කරගෙන තිබේ නම්, OmniRoute විසින් HTTP `429`, lease-capacity-unavailable code එකක්,
ධාරිතාව සඳහා රැඳී සිටින තත්ත්වයක්, සහ අදාළ මුල්ම කල් ඉකුත්වීමෙන් ව්යුත්පන්න කළ සීමිත `Retry-After` එකක් ලබා දෙයි.
සාමාන්ය හිස් සුදුසුකම lease contention එකක් නොවන අතර එහි පවතින routing error semantics රඳවා ගනී.

අදාළ යාන්ත්රණ වෙන්ව පවතී:

- OAuth session occupancy යනු OAuth ගිණුම් සඳහා process-local මෘදු බෙදාහැරීමකි.
- Account semaphores විසින් request-concurrency permits ලබා දෙන අතර ඉල්ලීමක් අවසන් වූ විට ඒවා අවසන් වේ.
- අනන්ය කළමනාකරණය කළ සැසි බදු යනු generation fence එකක් සහිත කල්පවත්නා ජීවන චක්ර හිමිකාරිත්වයකි.

---

## 3. ආකෘති අගුලු දැමීම

**විෂය පථය:** සැපයුම්කරු + සම්බන්ධතාව + ආකෘතිය යන ත්රිත්වය.

**තත්ත්වය අනුව යතුරු විෂය පථය:** අසාර්ථක වන තත්ත්වය මඟින් අගුලු දැමීමක් ලියනු ලබන්නේ කුමන යතුරටද යන්න තීරණය කරයි
(`open-sse/services/accountFallback/exactModelLock.ts` තුළ `resolveLockoutScope()`):

- `429` / `403` / `402` — කෝටා හෝ හිමිකම් සංඥාවක් — **කෝටා පවුල** අගුලු දමයි:
  codex සඳහා සම්පූර්ණ `codex` / `spark` විෂය පථය (සම්බන්ධතාවයේ සෑම `gpt-5*` ආකෘතියක්ම), අනෙකුත් සැපයුම්කරුවන් සඳහා `getQuotaScopedModelForProvider()`.
- `404` මූලික ආකෘතිය අගුලු දමයි (`getModelLockKey()` මඟින් `not_found` පටු කරයි).
- වෙනත් ඕනෑම තත්ත්වයක් — `5xx` ප්රවාහන/සේවාදායක අසාර්ථකතා සහ ගුණාත්මකභාවය වලංගු කිරීමෙන් OmniRoute විසින්ම නිර්මාණය කරන ලද
  `502` — නිශ්චිත සැපයුම්කරු/සම්බන්ධතාව/ආකෘති ත්රිත්වය පමණක් අගුලු දමයි. එක් ආකෘතියක දෝෂ සහිත ප්රවාහයක් ගිණුමේ කෝටාව පිළිබඳ සාක්ෂියක් නොවේ;
  මෙම රීතියට පෙර `codex/gpt-5.6-luna` වෙතින් ලැබුණු එක් හිස් ප්රතිචාරයක්, එහි කෝටාවට බලපෑමක් නොවූවත්, එම සම්බන්ධතාවයේ සෑම `gpt-5*` ආකෘතියක්ම
  මිනිත්තු 2–30ක් සඳහා (ක්රමයෙන් වැඩි වන ලෙස) මාර්ගගත කිරීමෙන් ඉවත් කළේය.
- ඇමතුම්කරු විසින් පැහැදිලිව ලබා දෙන `scope` විකල්පයකට සැමවිටම ප්රමුඛත්වය හිමි වේ (Antigravity විසින් `"exact"` ලබා දෙයි).

**අරමුණ:** එක් ආකෘතියක් පමණක් නොමැති හෝ කෝටාවෙන් සීමා වී ඇති විට සම්පූර්ණ සම්බන්ධතාවක් අක්රිය කිරීම වැළැක්වීම.

**උදාහරණ:**

- 429 ආපසු ලබා දෙන එක් එක් ආකෘතියට වෙන් වූ කෝටා සහිත සැපයුම්කරුවන්
- නොමැති එක් ආකෘතියක් සඳහා 404 ආපසු ලබා දෙන දේශීය සැපයුම්කරුවන්
- සැපයුම්කරුට විශේෂිත මාදිලි/ආකෘති අවසර අසාර්ථකතා (උදා., Grok මාදිලි)

**ක්රියාත්මක කිරීම:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### ආකෘති විරාම කාල උපකරණ පුවරුව (v3.8.0)

UI: සැකසුම් → ආකෘති විරාම කාල (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

සක්රිය අගුලු දැමීම් පහත තොරතුරු සමඟ ලැයිස්තුගත කරයි: සැපයුම්කරු, සම්බන්ධතාව, ආකෘතිය, හේතුව, expiresAt. ක්රියාකරුවන්ට කාඩ්පතෙන් ආකෘතියක් අතින් නැවත සක්රිය කළ හැක.

**REST API:**

- `GET /api/resilience/model-cooldowns` — සක්රිය අගුලු දැමීම් ලැයිස්තුගත කරන්න
- `DELETE /api/resilience/model-cooldowns` — අතින් නැවත සක්රිය කිරීම. අන්තර්ගතය: `{provider, connection, model}`. සත්යාපනය: කළමනාකරණය.

### අගුලු දැමීමේ සැකසුම් UI + සාර්ථකත්ව-ක්ෂය ප්රතිසාධනය (v3.8.23)

ආකෘති අගුලු දැමීම සැමවිටම සක්රිය, ස්ථාවරව කේතගත කළ හැසිරීමක සිට, තමන්ගේම සැකසුම් කාඩ්පතක් සහ ස්වයං-සුව වීමේ ප්රතිසාධන මාර්ගයක් සහිත, සම්පූර්ණයෙන් වින්යාස කළ හැකි, කැමැත්තෙන් සක්රිය කළ යුතු විශේෂාංගයක් බවට පත් විය.

**සැකසුම් කාඩ්පත:** සැකසුම් → ආකෘති අගුලු දැමීම
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
මෙය ඉහත ඇති, සක්රිය අගුලු දැමීම් පමණක් _ලැයිස්තුගත කරන_, කියවීමට පමණක් ඇති `ModelCooldownsCard` වෙතින් **වෙනස්** වේ — නව කාඩ්පත _පරාමිති වින්යාස කරයි_. පෙරනිමි අගයන්
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) තුළ ඇත:

| සැකසුම                  | පෙරනිමිය                         | අර්ථය                                                           |
| ----------------------- | -------------------------------- | --------------------------------------------------------------- |
| `enabled`               | `false`                          | ප්රධාන ටොගලය — ආකෘති අගුලු දැමීම පෙරනිමියෙන් **අක්රියයි**.      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | ආකෘතියේ විෂය පථයට අදාළ අසාර්ථකතාවක් ලෙස සැලකෙන උඩුගං තත්ත්ව.    |
| `baseCooldownMs`        | `120_000` (තත්පර 120)            | පළමු අසාර්ථකතාව සඳහා ආරම්භක අගුලු දැමීමේ කාලය.                  |
| `maxCooldownMs`         | `1_800_000` (මිනිත්තු 30)        | වැඩි කරන ලද විරාම කාලයේ උපරිම සීමාව.                            |
| `maxBackoffSteps`       | `10`                             | ඝාතීය පසුබැසීම වැඩි කිරීමේ උපරිම පියවර ගණන.                     |
| `useExponentialBackoff` | `true`                           | නැවත නැවත සිදුවන අසාර්ථකතා විරාම කාලය ඝාතීයව වැඩි කරන්නේද යන්න. |

සැකසුම් සාමාන්ය සැකසුම් ගබඩාව හරහා ස්ථිරව පවත්වා ගන්නා අතර ප්රත්යස්ථතා සැකසුම් යෝජනා ක්රමය හරහා වලංගු කෙරේ; කාඩ්පත `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` සමඟ) සහ `maxBackoffSteps` සීමා කරයි.

**සාර්ථකත්ව-ක්ෂය ප්රතිසාධනය:** ප්රතිසාධනය සම්පූර්ණයෙන්ම කාලගණකය කල් ඉකුත් වීම මත රඳා **නොපවතී**. සෞඛ්ය සම්පන්න ප්රතිචාරයක් ආකෘතියේ අසාර්ථකතා ගණන ක්රමයෙන් අඩු කරන බැවින්, කාල පරාසය මැදදී ප්රතිසාධනය වූ ආකෘතියක් එහි කාලගණකය අවසන් වීමට පෙර වැඩි වීම නවතා (සහ අගුලු දැමීම ඉවත් කර) ගනී. සාර්ථක සංයුක්ත ඉලක්කයකදී, `open-sse/services/combo.ts` විසින් `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) කැඳවයි; එමඟින් ගබඩා කර ඇති
`failureCount` **අඩකින් අඩු කරයි** (`Math.floor(failureCount / 2)`); එය `0` වෙත ළඟා වූ විට අගුලු දැමීමේ ප්රවේශය සම්පූර්ණයෙන්ම මකා දමයි. අනුරූප `recordModelLockoutFailure()` විසින් වැඩි කිරීමේ කාල පරාසය තුළ ඇති අසාර්ථකතාවලදී ගණන වැඩි කරයි (සහ විරාම කාලය වැඩි කරයි). මෙම සාර්ථකත්ව-ක්ෂය සාමාන්ය කාලගණක කල් ඉකුත් වීමට අමතරව ක්රියා කරයි —
මාර්ග දෙකෙන් ඕනෑම එකකට ආකෘතියක් නැවත සක්රිය කළ හැක.

**තත්ත්වය:** අගුලු දැමීම් DB තුළ ස්ථිරව පවත්වා නොගෙන, **මතකය තුළ** තබා ගනී (`provider:connectionId:model` මඟින් යතුරුගත කළ `ModelLockoutEntry` හි එක් එක් ක්රියාවලියට වෙන් වූ `Map` සහ
`provider:connectionId:exact:model` මඟින් යතුරුගත කළ නිශ්චිත-විෂය පථ අගුලු) —
නැවත ආරම්භ කිරීමකදී ඒවා නැති වේ. _සැකසුම්_ ස්ථිරව පවත්වා ගනී; සක්රිය
අගුලු දැමීමේ _තත්ත්වය_ තාවකාලික වේ.

---

## 4. Quota-Share සමගාමීත්ව පාලනය (v3.8.36)

දායකත්ව ගිණුම් (GLM, MiniMax, ආදිය) බොහෝ විට එකවර ඉල්ලීම් ~1–3ක් පමණක් පිළිගනී;
එය ඉක්මවා යාමෙන් 429 ප්රතිචාර සහ cooldown කාල සීමා ඇති වේ. API යතුරු කිහිපයක් එක් upstream
ගිණුමක් බෙදාගන්නා **quota-share** (`qtSd/…`) සංයෝජන යටතේ මෙය විශේෂයෙන් තීව්ර වේ.
හවුල් ගිණුමකට අධික ඉල්ලීම් ගලා ඒම ස්ථර තුනක් මඟින් වළක්වයි.

### සම්බන්ධතාවකට අදාළ සමගාමීත්ව උපරිමය (`max_concurrent`)

සෑම සැපයුම්කරු සම්බන්ධතාවකටම `max_concurrent` උපරිම සීමාවක් ප්රකාශ කළ හැක
(`provider_connections.max_concurrent`, සම්බන්ධතා modal / API / DB තුළ සකසනු ලැබේ).
සීමාවක් නොමැතිව තැබීමට එය හිස්ව තබන්න. පහත serialization ස්ථරය මෙහෙයවන එකම සැකසුම
මෙයයි — එය ගිණුමේ සැබෑ සමගාමීත්වයට සකසන්න (උදා. GLM ~1, MiniMax ~2).

### Quota-share ඉල්ලීම් අනුක්රමිකකරණය

Quota-share යොමු කිරීමක් ධන `max_concurrent` අගයක් ප්රකාශ කරන සම්බන්ධතාවක් ඉලක්ක කරන විට,
එම **ගිණුමට** ලැබෙන සමගාමී ඉල්ලීම්, එක් සම්බන්ධතාවකට අදාළ semaphore එකක්
(යතුර `qsconn:<connectionId>`) හරහා අනුක්රමික කරනු ලැබේ: අතිරික්ත ඉල්ලීම් ගිණුමට ගලා ඒම
වෙනුවට **පෝලිමේ රැඳී සිටී**. මෙය **fail-open** ආකාරයෙන් ක්රියා කරයි — පිරී ඇති පෝලිමක් හෝ
කාල සීමාව ඉක්මවීමක් නිසා යොමු කළ හැකි ඉල්ලීමක් ප්රතික්ෂේප නොකර, slot එකක් නොමැතිව වුවද
ඉදිරියට යයි. **Settings → Resilience → Quota-share per-connection
concurrency** තුළ මාරු කරන්න (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, පෙරනිමියෙන්
සක්රියයි). `max_concurrent` උපරිමයක් නොමැති විට හැසිරීම වෙනස් නොවේ.

> Quota-share routing gate එක (`selectQuotaShareTarget`, DRR + P2C) ද
> fail-open වන අතර උපරිමයට ළඟා වූ සම්බන්ධතාවක් _අඩු ප්රමුඛතාවකට පත් කිරීම_ පමණක් සිදු කරයි —
> එක් සම්බන්ධතාවක් පමණක් ඇති pool එකකදී එයට දැඩි සීමාවක් යෙදිය නොහැකි බැවින්, ගලා ඒම
> සැබවින්ම පාලනය කරන්නේ මෙම semaphore එකයි.

### Combo cooldown පිළිබඳ දැනුවත් නැවත උත්සාහය

සෑම combo උපායමාර්ගයක් සඳහාම (සක්රිය කර ඇති විට), කෙටි තාවකාලික cooldown එකක් සඳහා 429ක්
ස්ථිර කරවන ඉල්ලීමක්, 429 ප්රතිචාරය ආපසු ලබා දීම වෙනුවට එය අවසන් වන තෙක් රැඳී සිට නැවත යොමු කරයි
— මෙය බහු-model combo තුළ Gemini පන්තියේ TPM/RPM කවුළු (~60s retry-after) ආවරණය කරයි,
උදාහරණයක් ලෙස model 2ක combo එකක ඉලක්ක දෙකම එක් model එකකට අදාළ වේග සීමාවකට ළඟා වීම.
මෙය **Settings → Resilience** තුළ ඇති `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) මඟින් සීමා කරයි. එය `quota_exhausted` (මධ්යම රාත්රිය තෙක් අගුළු දමා ඇත) හෝ
සත්යාපන/හමු-නොවූ හේතු මත කිසිවිටෙක රැඳී නොසිටී.

---

## 5. ඉල්ලීම් පෝලිම් ඇතුළත් කිරීමේ පාලනය (v3.8.49 · issue #6593)

**විෂය පථය**: ඉහත යාන්ත්රණ තුනට එක් ස්ථරයක් පහළින් ඇති, දේශීය එක් සැපයුම්කරුවකුට+සම්බන්ධතාවකට
අදාළ වේග-සීමා පෝලිම (`open-sse/services/rateLimitManager.ts`, Bottleneck මත පදනම් වේ).

**`maxWaitMs` යනු ක්රියාත්මක කිරීම කල් ඉකුත්වීම සඳහා පවත්වාගෙන එන පැරණි නාමයකි.**
`resilienceSettings.requestQueue.maxWaitMs`, job එකක `expiration` ලෙස Bottleneck වෙත
ලබා දෙන අතර, එහි timer එක ආරම්භ වන්නේ යොමු කිරීමෙන් පසුව පමණි. එබැවින් එය දේශීය පෝලිමේ ගත කරන
කාලය නොව, limiter මඟින් කළමනාකරණය කරන ක්රියාත්මක කිරීම සීමා කරයි. කල් ඉකුත්වීම විශ්වාසදායක
දේශීය `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ලෙස නිරාවරණය කෙරේ;
පැරණි පෝලිම්-timeout code නාමය පිළිගන්නේ විශ්වාසදායක අභ්යන්තර පසුගාමී අනුකූලතාව සඳහා පමණි.
පෙරනිමිය 15000ms වේ; `RATE_LIMIT_MAX_WAIT_MS` (env) හෝ dashboard එක
(**Settings → Resilience**, 1–30000ms UI උපරිමය) හරහා එය අතික්රමණය කරන්න.
පෝලිමේ රැඳී සිටීමට කාල සීමාවක් නොමැත; පෝලිම්ගත කැඳවුම්කරුවන් සීමා කිරීමට පහත
`maxQueueDepth` භාවිත කරන්න.

**`maxQueueDepth` — තෝරා සක්රිය කළ හැකි ඇතුළත් කිරීමේ උපරිමය (නව).**
`resilienceSettings.requestQueue.maxQueueDepth` මඟින් එක් provider+connection එකක් සඳහා
එකවර පෝලිමේ (තවමත් යොමු කර නොමැතිව) රැඳී සිටිය හැකි ඉල්ලීම් ගණන සීමා කරයි.
පෝලිමේ දැනටමත් `maxQueueDepth` ඉල්ලීම් තිබේ නම්, නව ඉල්ලීමක්
`limiter.schedule()` වෙත ළඟා වීමටත් **පෙර**, type කළ
`code: "RATE_LIMIT_QUEUE_FULL"` දෝෂයක් සමඟ වහාම ප්රතික්ෂේප කරනු ලැබේ
— එබැවින් එම ප්රතික්ෂේප කිරීම අඩු වියදම් සහිත වන අතර, එම ඉල්ලීම සඳහා සිදු වන ඕනෑම downstream
prompt-compression / පරිවර්තන කාර්යයකට පෙර සිදු වේ. පෙරනිමි `0` =
අක්රියයි; එමඟින් පවතින සීමා රහිත පෝලිම් හැසිරීම ආරක්ෂා වේ; සීමාව 0–100000 වේ.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) හෝ
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) හරහා අතික්රමණය කරන්න.

ඇතුළත් කිරීමේ පරීක්ෂාවම pure function එකකි
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), එබැවින්
සැබෑ Bottleneck limiter එකක් නොමැතිව එය unit-test කළ හැක.

> #6593 ආරම්භ කළ RFC එක `bypassCompressionOnRateLimit`
> flag එකක් ද යෝජනා කළේය. මෙම repo එකේ `open-sse/services/compression/` pipeline එක
> outbound LLM ඉල්ලීමේ prompt/context compression සඳහා වේ (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` block එක ආසන්නයේ),
> නිර්මාණය කළ 429 body සඳහා HTTP response compression එකක් නොවේ — සෘජු bypass flag එකකට
> ගැළපෙන code path එකක් නොමැත. එම prompt-compression පියවර දැනට ඉල්ලීම් pipeline එක තුළ
> `withRateLimit()` ට _පෙර_ ක්රියාත්මක වේ, එබැවින් queue-full ප්රතික්ෂේප කිරීමකදී එය මඟහැරීමට
> අනුපිළිවෙළ වෙනස් කිරීම මෙම issue එකේ විෂය පථයට වඩා වෙනම, විශාල වෙනසකි; එය මෙහි
> හිතාමතාම ක්රියාත්මක **නොකළ** අතර, CPU ඉතිරිය අනුපිළිවෙළ වෙනස් කිරීමේ අවදානමට වටී නම්
> පසුකාලීන කාර්යයක් ලෙස ඉතිරි කර ඇත.

---

## 6. මන්දගාමී ප්රවාහ ප්රතිදාන නිරීක්ෂකය (#9709)

විකල්ප `resilienceSettings.streamRecovery.throughputWatchdog` ආරක්ෂකය, තවමත් කොටස් යවමින් සිටියද වින්යාස කළ ප්රයෝජනවත්-ප්රතිදාන අනුපාතයට වඩා අඩුවෙන් සහායක ප්රතිදානය නිපදවන upstream එකක් හඳුනා ගනී. මෙය හිතාමතාම අක්රියතා කාලසීමා ඉක්මවීමෙන් වෙනස් වේ:
heartbeats සහ metadata මඟින් කිසිදු timer එකක් යළි සකසන්නේ නැති අතර ඒවා ප්රගතියක් ලෙසද ගණන් නොගනී. එමෙන්ම මෙය ප්රතිදාන ගුණාත්මකභාවය නොසලකා නිරපේක්ෂ ආරක්ෂක උපරිම සීමාවක් ලෙස පවතින දැඩි උත්සාහ කාලසීමා අවසානයෙන් (#9153) ද වෙනස් වේ.

අත්හිටුවීමට පෙර watchdog එකට උණුසුම් වීමේ කාලසීමාවක් සහ ඉන් පසුව සම්පූර්ණ පෙරළෙන කවුළුවක් අවශ්ය වේ. එය Chat Completions සහ Responses API ප්රතිදාන සිදුවීම්වලින් ලැබෙන පෙළ වෙනස්කම් ගණන් කරයි (සීමාකාරී UTF-8 byte ආසන්න අගයක් ලෙස), භාවිත තොරතුරු පමණක් ඇති සහ හිස් සිදුවීම් නොසලකා හරියි, සහ tool-call හෝ reasoning සිදුවීම් ක්රියාත්මක වෙමින් පවතින අතරතුර විනිශ්චය අත්හිටුවයි. එය පෙරනිමියෙන් අක්රිය කර ඇති අතර `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` මඟින් සක්රිය කළ හැක; කවුළුව, උණුසුම් වීමේ කාලය, අවම අනුපාතය සහ මැනිය හැකි අවම ප්රතිදානය සාමාන්ය resilience-settings සාමාන්යකරණ ස්තරය මඟින් සීමා කරයි.

සක්රිය කර ඇති විට, watchdog අත්හිටුවීමක් යොදන්නේ සක්රිය upstream උත්සාහයට පමණි. සේවාලාභියාට දෘශ්යමාන වන කිසිදු byte එකක් යැවීමට පෙර, පවතින එකම-ගිණුම් මුල්-ප්රතිසාධන මාර්ගයට උත්සාහය යළි විවෘත කළ හැක. commit කිරීමෙන් පසු, ප්රවාහය කිසිවිටෙකත් අන්ධ ලෙස යළි ධාවනය නොවේ; පවතින ආරක්ෂිත මැද-ප්රවාහ අඛණ්ඩතා ගිවිසුමට පමණක් suffix එකක් සම්බන්ධ කළ හැක. අවසන් කිරීම තනි-ක්රියාත්මක කිරීමක් ලෙස පවතින බැවින්, භාවිත ගිණුම්කරණය සහ semaphore මුදාහැරීම අනුපිටපත් නොවේ.

---

## 7. Upstream තත්ත්වය යළි ප්රකාශ කිරීම (වැරදි ලෙස ප්රකාශ කළ quota දෝෂ)

**විෂය පථය:** තාවකාලික quota අවසන් වීම වැරදි HTTP තත්ත්වයකින් වාර්තා කරන එක් upstream gateway එකක්.

**අරමුණ:** වර්ගීකරණයට පෙර නොමඟ යවන තත්ත්වයක් නිවැරදි කිරීම, එවිට downstream පරිභෝජකයන්ට (fallback engine, combo aggregation, සේවාලාභියාට මුහුණ දෙන ප්රතිචාරය) අසාර්ථකත්වයේ සැබෑ නැවත-උත්සාහ කළ හැකි ස්වභාවය දැකිය හැක.

සමහර gateways තාවකාලික quota අවසන් වීම නැවත-උත්සාහ කළ නොහැකි HTTP
තත්ත්වයකින් සංඥා කරයි. `agentrouter.org` සම්මත `429` වෙනුවට චීන අන්තර්ගතයක්
(`用户额度不足` / `额度不足`) සමඟ `403` (සමහරවිට `400`) ආපසු ලබා දෙයි. Claude
Code වැනි සේවාලාභීන් `403` ස්ථිර දෝෂයක් ලෙස සලකා සැසිය අත්හිටුවන අතර, නිවැරදි කිරීමකින් තොරව fallback engine එය quota සිදුවීමක් වෙනුවට `AUTH_ERROR` ලෙස වර්ගීකරණය කරයි.

**ක්රියාත්මක කිරීම:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — සැපයුම්කරු අනුව වෙන් වූ නීති ලැයිස්තුවක් (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` හරහා ගැළපේ.
- ඇමතුම් ස්ථානය: `open-sse/handlers/chatCore.ts` තුළ ඇති `providerFailure:` කොටස
  (3654 පේළිය ආසන්නයේ), `parseUpstreamError()` විසින් දෝෂ HTTP තත්ත්වයක් (`!providerResponse.ok`) සහිත upstream ප්රතිචාරයක් විග්රහ කළ වහාම සහ කිසිදු වර්ගීකරණයක් ක්රියාත්මක වීමට පෙර, එවිට සෑම downstream පරිභෝජකයෙකුටම නිවැරදි කළ තත්ත්වය පෙනේ. `200` SSE ප්රවාහයක් තුළ කාවැද්දූ දෝෂ වෙනම, පසුව සිදුවන ප්රවාහ-විග්රහ මාර්ගයක් අනුගමනය කරන අතර අද වන විට මෙම hook එකෙන් ඒවා **ආවරණය නොවේ** — මෙය දන්නා සීමාවකි, නමුත් agentrouter හි වැරදි තත්ත්වයට තවමත් අවශ්ය නොවේ (එය දෝෂ HTTP තත්ත්වයක් ලෙස මතු වේ).
- නැවත-උත්සාහ සුදුසුකම: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) තුළ ඇත, එබැවින් යළි ප්රකාශ කළ දෝෂයක් අක්රිය `403` එකක් ලෙස මතුවීම වෙනුවට සැබෑ නැවත-උත්සාහ කවුළුවක් රැගෙන යයි.
- කෘත්රිම `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  යනු යළි ප්රකාශ කළ ප්රතිචාරය **සේවාලාභියාට** දක්වන දෙය පමණි; එය සම්බන්ධතාවයේ අභ්යන්තර cooldown/lockout කාලසීමාව නොවේ — එය යළි ප්රකාශ කළ දෝෂය සැබවින්ම හසුරුවන යාන්ත්රණය අනුව වෙනම පාලනය වේ
  (Connection Cooldown හි වැඩිවන backoff, §2, API-key සැපයුම්කරුවන් සඳහා මූලික `3s`; හෝ agentrouter වැනි එක්-ආකෘති-quota සැපයුම්කරුවන් සඳහා Model Lockout, §3). සේවාලාභියාට ප්රචාරය කරන 60s කවුළුවට වඩා කලින් router එක අභ්යන්තරව නැවත උත්සාහ කිරීමට සුදුසු විය හැක — මෙය හිතාමතා ලබා දුන් අතිරේක ඉඩකි, දෝෂයක් නොවේ.

ස්ථිර දෝෂ (agentrouter හි `无权访问模型` — මෙම ආකෘතියට ප්රවේශය නැත) කිසිවිටෙකත් යළි ප්රකාශ **නොකෙරේ**: `textMarkers` ගැළපුණද `excludeMarkers` විසින් නීතිය නිෂේධ කරයි, එබැවින් දෝෂය එහි මුල් තත්ත්වය රඳවා ගන්නා අතර කිසිවක් එය සදහටම නැවත උත්සාහ නොකරයි. අනුරූප සැපයුම්කරු වර්ගීකරණ නීතිය
(`open-sse/config/providerErrorRules.ts` තුළ `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, ප්රකාශිත මූලික `6h` cooldown එකක්)
`checkFallbackError` (`open-sse/services/accountFallback.ts`) විසින් සාමාන්ය apikey-category `FORBIDDEN` මුල්-return එකට _පෙර_ පරීක්ෂා කරනු ලබන අතර,
`honorsRuleLockScope(provider)` මඟින් පාලනය වේ (#10334 — දැනට
`providerErrorRules.ts` තුළ ඇති `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist එක හරහා agentrouter සඳහා පමණි). නීතියේ ප්රකාශිත 6h cooldown එක
`fallbackResult.baseCooldownMs` ලෙස ඉදිරියට ගලා යන නමුත්, එය තවමත් පෙර සිට පවතින එක්-ආකෘති-quota lockout මාර්ගයට (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, cooldown මූලාශ්රය හැර #10334 මඟින් වෙනස් නොකළ) ලබා දෙයි: අනෙකුත් සෑම model lockout එකක් මෙන්ම එය operator ගේ `mlSettings.maxCooldownMs`
(පෙරනිමි `1_800_000ms` / 30min) දක්වා පහළට සීමා කෙරෙන අතර,
_සුරැකී පවතින lockout හේතුව_ නීතියේ `"auth_error"` නොව, පෙර සිට පවතින hardcoded `"forbidden"` ලෙසම පවතී — අන්තයේ සිට අන්තය දක්වා ගරු කරන්නේ cooldown කාලසීමාවට පමණි, හේතු string එකට නොවේ. සම්බන්ධතාවයම සක්රියව පවතී;
එම සම්බන්ධතාවයේ sibling models වලට බලපෑමක් නැත.

නැවත ප්රකාශිත quota දෝෂ (`额度不足`) production පරිසරයේ provider rule එකකට ළඟා වේ
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, එයටම අයත් ලෙස ප්රකාශිත cooldown එකක් නැත — persistence layer එකේ
scaled backoff default එක අදාළ වේ). #10334 සිට,
`ProviderErrorRuleMatch` හි `scope` අගය අන්තයේ සිට අන්තය දක්වා භාවිත කෙරේ, නමුත්
**එය සිදුවන්නේ** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist එකේ ඇති providers සඳහා
පමණි (`providerErrorRules.ts` — අද වන විට `"agentrouter"` පමණක්,
`honorsRuleLockScope()` හරහා සීමා කර ඇත). අනෙක් සෑම provider එකක් සඳහාම
`scope` යනු #10334 ට පෙර මෙන්ම තොරතුරුමය අගයක් පමණි.
`checkFallbackError` විසින් ගැළපුණු rule එකේ scope එක
`fallbackResult.ruleScope` ලෙස නිරාවරණය කරයි;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) යනු `ruleScope` එකක් connection එක පුරා බලපාන,
ස්වයංක්රීයව යථා තත්ත්වයට පත්වන signal එකක් ලෙස පිළිපැදීමට සැබවින්ම ආරක්ෂිත බව
තහවුරු කරන පොදු guard එකයි (scope `"connection"`, reason
`quota_exhausted`, කිසි විටෙක `permanent` නොවන, කිසි විටෙක
`creditsExhausted` නොවන — අනාගත rule එකක් scope `"connection"` යන්න
ස්ථිර account state එකක් සමඟ යුගල කිරීමෙන් ආරක්ෂා වීම සඳහා). consumers දෙදෙනෙක්
එය කැඳවති:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider හි **per-model** lockout branch එකට වැටීම වෙනුවට
  (agentrouter සඳහා `passthroughModels: true` වේ → `hasPerModelQuota()`
  විසින් `true` ලබා දෙයි), එය **තාවකාලික connection cooldown** එකක් යොදයි —
  `testStatus: "unavailable"` + `rateLimitedUntil`, කිසි විටෙක terminal status
  එකක් (`credits_exhausted`/`banned`/`expired`) නොවේ — එබැවින් cooldown එක
  අවසන් වූ පසු අතින් credential reset කිරීමක් අවශ්ය නොවී connection එක
  ස්වයංක්රීයව යථා තත්ත්වයට පත් වේ.
  `disableCooling: true` සහිත connections සඳහා මෙය මඟ හැරේ (#2997): ඒ opt-out
  එක වෙනුවට per-model lockout එකට වැටේ (ලේඛනගත trade-off එකකි —
  branch එකට ඉහළින් ඇති code comment එක බලන්න).
- **එම-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): එම guard එකම
  `${provider}:${connectionId}` යතුරෙන් හඳුනාගන්නා in-memory
  `exhaustedConnections` set එකට connection එක සලකුණු කරයි. මෙය මඟ හරින්නේ
  තමන්ගේම target object එකේ එම නිශ්චිත `connectionId` එක දැනටමත් රැගෙන යන
  ඉතිරි SAME-REQUEST target එකක් පමණි (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` යන්න `exhaustedConnections` lookup එකට පෙර) — sibling targets
  තමන්ගේම pinned `connectionId` එකක් නොරැගෙන යන සහ response එකේ
  `X-OmniRoute-Selected-Connection-Id` header එකෙන් එක් dispatch එකකට එකක්
  පමණක් resolve කරන සාමාන්ය model-list combo එකක් කිසි විටෙකත් එම key match
  එකට ළඟා නොවේ. එම සාමාන්ය අවස්ථාවේදී, ඉතිරි leg එකක් දැන් quota අවසන් වූ
  account එක නැවත භාවිත කිරීමෙන් වළක්වන සැබෑ ආරක්ෂාව මෙම Set එක **නොවේ** —
  එය ඉහත persistence layer එකයි (connection එකේ `rateLimitedUntil` දැන්
  අනාගතයේ ඇත), එමෙන්ම මෙම guard එක විසින්ම අසාර්ථකත්වය සඳහා
  `transientRateLimitedProviders` suppress කිරීම සමඟ එය ක්රියා කරයි
  ("Two-stage design" සහ `targetExhaustion.ts` හි
  `isAgentrouterConnectionQuotaScope` branch එකේ code comment එක බලන්න):
  එම Set එක සලකුණු නොකර තැබීමෙන්, `combo.ts` හි
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) එක provider එකේ
  ඉතිරි legs සඳහා සක්රිය **නොවේ**, එබැවින් credential selection හි
  `rateLimitedUntil` filter එක (`src/sse/services/auth.ts:1238`) සාමාන්ය
  පරිදි පිළිපදින අතර ඉතිරි leg එකක් වෙනත්, තවමත් සුදුසු agentrouter
  connection එකක් තෝරාගනී හෝ ලබාගත හැකි credentials නොමැති බැවින් අසාර්ථක වේ —
  මෙම branch එක දැන් cooldown කළ connection එක වෙත බලෙන් නැවත පිවිසෙන්නේ නැත.

### අදියර දෙකක සැලසුම: status නැවත ප්රකාශ කිරීම, ඉන්පසු වර්ගීකරණය

Status නැවත ප්රකාශ කිරීම (`upstreamStatusRestatement.ts`) සහ provider
වර්ගීකරණ rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) යනු provider id සහ text markers යන දෙකම key කරගන්නා
වෙන් වූ registries දෙකකි, නමුත් ඒවා විවිධ ස්ථානවල ක්රියාත්මක වන අතර විවිධ
අරමුණු ඉටු කරයි: restatement එක `chatCore.ts` තුළ මුල් අවධියේදී HTTP status
එක නැවත ලියයි; classification rules විසින් `checkFallbackError()` තුළ
fallback `reason` එක සහ lock `scope` එක
(`model` / `provider` / `connection`) තෝරයි
(`open-sse/services/accountFallback.ts`).

Classification rules වෙත සම්පූර්ණ error **text** එක පෙනෙන්නේ
`providerErrorRules.ts` හි `FULL_TEXT_RULE_PROVIDERS` allowlist එකේ ලැයිස්තුගත
providers සඳහා පමණි (`额度不足` වැනි body markers ගැළපීමට එය අවශ්ය වේ) —
දැනට `"agentrouter"` පමණි. අනෙක් සෑම **built-in catalog** provider එකක් සඳහාම,
`checkFallbackError` විසින් `getProviderErrorRuleMatch` වෙත ලබා දෙන්නේ
structured error එක (`{code, type}`) පමණි; එය header/status/code මත පදනම් වූ
rules සඳහා ප්රමාණවත් නමුත් body-text markers හඳුනාගත නොහැක.
`resolveRuleMatchBody()` helper එක මෙම තේරීම සිදු කරයි: allowlist එකේ ඇති
providers සඳහා සම්පූර්ණ error text එකත්, අනෙක්වා සඳහා structured error එකත්
භාවිත කරයි. **built-in** provider එකක් `FULL_TEXT_RULE_PROVIDERS` වෙත එක් කිරීම
යනු එක් එක් provider සඳහා සිදු කරන පැහැදිලි opt-in එකකි — list එකේ නොමැති
සෑම provider එකක් සඳහාම default path එක byte-for-byte නොවෙනස්ව තබා ගැනීමට
එය පවතී.

Rule එකක `scope` (`model` / `provider` / `connection`) යනු
`FULL_TEXT_RULE_PROVIDERS` වෙතින් වෙන් වූ opt-in එකකි:
`checkFallbackError` එය `fallbackResult.ruleScope` ලෙස පමණක් නිරාවරණය කරන අතර,
downstream consumers එය තොරතුරුමය label එකකට වඩා වැඩි දෙයක් ලෙස පිළිපදින්නේ
එම file එකේ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist එකේ ඇති providers
සඳහා පමණි (`honorsRuleLockScope()` හරහා සීමා කර ඇත — අද වන විට
`"agentrouter"` පමණි). Provider එකක් එම allowlist එකේ තිබූ විට
`scope: "connection"` ගැළපීමක් සැබවින්ම කරන දේ සඳහා ඉහත "නැවත ප්රකාශිත
quota දෝෂ" කොටස බලන්න.

**#11104 — operator විසින් ප්රකාශිත නීති allowlist දෙකම මඟ හරියි.** Operator කෙනෙකුට
මෙම ගොනුව සංස්කරණය නොකර `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) හරහා runtime අවස්ථාවේදී
එක් එක් provider සඳහා නීතියක් ප්රකාශ කළ හැක. Built-in catalog නීතිවල **default**
හැසිරීම ආරක්ෂා කිරීමට අදහස් කළ allowlist වන
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` පිටුපස operator නීතියක්
සීමා කිරීමෙන්, එම නීතිය ප්රකාශ කිරීමම operatorගේ පැහැදිලි opt-in එක වන බැවින්,
දැනටමත් එහි ලැයිස්තුගත කර ඇති provider හැර අනෙක් සියලු provider සඳහා settings
යාන්ත්රණය අක්රිය වනු ඇත. `resolveRuleMatchBody()` සහ `honorsRuleLockScope()` යන දෙකම
පළමුව `hasOperatorRuleForProvider()` පරීක්ෂා කරයි: operator නීතියක් ඇති provider එකකට,
එය allowlist එකක හෝ දෙකෙහිම තිබේද යන්න නොසලකා, අමු error text එක ලැබෙන අතර එහි
ප්රකාශිත `scope` එකට ගරු කරනු ලැබේ.

**දන්නා හිඩැස — HTTP 400 සඳහා `providerRuleRegistry` කිසි විටෙක පරිශීලනය නොකෙරේ.**
`checkFallbackError` හි `BAD_REQUEST` branch එක, තමන්ගේම pattern array
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, ආදිය
`accountFallback.ts` තුළ) මඟින් status 400 සම්පූර්ණයෙන්ම වර්ගීකරණය කර, ඊට ඉහළින් ඇති
`configuredRule`/`getProviderErrorRuleMatch` branch එකට ළඟා වීමට පෙර return කරයි.
`status: 400` සහිත built-in catalog නීතියක් (හෝ operator නීතියක්) වාක්ය-ව්යුහාත්මකව
වලංගු වුවද කිසි විටෙක ක්රියාත්මක නොවේ. අද පවතින කිසිදු නීතියක් 400 ඉලක්ක නොකරන නිසා
production තුළ කිසිවකට බලපෑමක් නැත — නමුත් අනාගත 400 නීතියක් සඳහා පළමුව මෙම branch එක
වෙනස් කළ යුතු අතර, එය නීතියක් එක් කිරීමට වඩා විශාල වෙනසකි (එය දැනටමත් pattern-array
හැසිරීම මත රඳා පවතින සෑම provider එකක් සඳහාම 400 නැවත වර්ගීකරණය කරයි) සහ තනි-provider
නීතියක් එක් කිරීමේ විෂය පථයෙන් පිටතය.

### quota එක වැරදි ලෙස ප්රකාශ කරන නව gateway එකක් එක් කිරීම

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) තුළ එක් rule array එකක් ලියාපදිංචි කරන්න.
   `textMarkers` provider-specific ලෙස තබා ගන්න; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) සමඟ ගැටෙන පොදු ඉංග්රීසි වාක්ය ඛණ්ඩ කිසිවිටෙක
   නැවත භාවිත නොකරන්න.
2. නිවැරදි lock scope එක තෝරා ගැනීම සඳහා අවශ්ය නම්
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) තුළ classification නීති
   ලියාපදිංචි කරන්න (`connection` account එක පුරාම බලපාන quota සඳහාද, `model` එක් model
   එකකට අදාළ errors සඳහාද භාවිත කරන්න). මෙම පියවර production තුළ බලපාන්නේ සම්පූර්ණ
   error text එක (body markers) අවශ්ය නීති ඇති provider සඳහා පමණි: එම provider id එක
   එම ගොනුවේම `FULL_TEXT_RULE_PROVIDERS` වෙත එක් කරන්න — එසේ නොකළහොත්
   `checkFallbackError` විසින් නීතියට ලබා දෙන්නේ structured `{code, type}` error එක පමණක්
   වන අතර body-text නීතියක් live traffic සමඟ කිසිවිටෙක match නොවනු ඇත.
   Opencode හෝ Minimax හි නීති මෙන්, සම්පූර්ණයෙන්ම `status`/`headers` මත match වන නීතිවලට
   මෙම opt-in එක අවශ්ය නොවේ. වෙනමම, නීතිය `scope: "connection"` ලෙස ප්රකාශ කරන්නේ නම්
   සහ අරමුණ හුදෙක් තොරතුරුමය label එකක් නොව සැබෑ connection-wide cooldown එකක් හා
   same-request combo skip එකක් නම්, එම ගොනුවේම `HONORS_RULE_LOCK_SCOPE_PROVIDERS` වෙත
   provider id එක එක් කරන්න — `markAccountUnavailable()` (`src/sse/services/auth.ts`) සහ
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) තුළ
   `isAgentrouterConnectionQuotaScope()` ආකාරයේ පරිභෝජනය පාලනය කරන්නේ මෙයයි; එය නොමැතිව
   `scope` තවමත් `fallbackResult.ruleScope` හරහා ගලා යන නමුත් කිසිවක් එය මත ක්රියා නොකරයි.
3. `tests/unit/upstream-status-restatement.test.ts` සහ
   `tests/unit/agentrouter-error-rules.test.ts` අනුකරණය කරමින් unit tests එක් කරන්න
   (not-permanent / not-creditsExhausted guards ඇතුළුව, සහ — provider එකට allowlist එක
   අවශ්ය නම් — `resolveRuleMatchBody()` එම provider සඳහා පමණක් සම්පූර්ණ text එක return
   කරන බව තහවුරු කරන test එකක්ද ඇතුළුව).

`chatCore.ts`, `classifyError`, හෝ combo වෙත කිසිදු වෙනසක් අවශ්ය නොවේ.

#### Egress අනුව bucket කළ lock එක (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` තුළ ඇති provider (opencode පවුල) IP-bucketed upstream
ලෙස සලකනු ලැබේ (opencode free tier එක account-bucketed නොව IP-bucketed වේ — #9611 බලන්න):
`quota_exhausted` **හෝ** `rate_limit_exceeded` ලෙස වර්ගීකරණය කළ status-429 එකක්,
rotation එකට ඒවා උත්සාහ කිරීමට පෙර, අසමත් වූ connection එකේ අවසන් වරට දන්නා egress IP
එක සමඟ ගැළපෙන සෑම allowlisted-family connection එකක්ම cooldown කරයි
— එමඟින් අනිවාර්යයෙන්ම අසමත් වන upstream call N-1ක් වළක්වයි (#10460/#10525 හා සමාන
ආකෘතියකි). `rate_limit_exceeded` හිතාමතාම ඇතුළත් කර ඇත: `markAccountUnavailable`
path එකේදී opencode-specific නීති කිසිවිටෙක match නොවේ (`checkFallbackError` වෙත
headers/body ලබා නොදේ, opencode `FULL_TEXT_RULE_PROVIDERS` තුළ නැත), එබැවින් body එකේ
subscription-quota text ("monthly usage limit reached") ඇති 429 එකක්, `status_429` නීතියට
ළඟා වීමට පෙර quota-text fallback එක (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; පැය 1ක cooldown) මඟින් `quota_exhausted` ලෙස වර්ගීකරණය වේ —
quota-text නොමැති 429 එකක් (සාමාන්ය rate limiting) `status_429` නීතිය හරහා
`rate_limit_exceeded` ලෙස වර්ගීකරණය වී තවමත් IP family එක cooldown කරයි. Allowlist කළ
provider එකක් සඳහා IP-bucketed rate limit එකක් යනු අවසන් වූ quota එකකට සමාන signal
එකකි. අවංක සීමා:

- **හැකි උපරිමයෙන්**: lock එක `proxy_logs` වෙතින් connection එකේ අවසන් වරට දැන සිටි `egress_ip`
  resolve කරයි (පැය 24ක කවුළුවක්, synchronous, cache කිරීමක් නැත). Cold cache එකක් (egress
  IP එක කිසිදා probe කර නොමැති වීම) හෝ row එකක් නොමැති වීම → අසාර්ථක වූ connection එක
  branch එක මඟින් තවමත් cooldown කරනු ලැබේ (දැනට කරන ආකාරයටම වාර්තා කරමින්), sibling එකක්
  පමණක් lock නොකෙරේ.
- **කිසිවිටෙක terminal නොවේ**: cooldown එක යළි අලුත් වන quota කවුළුවකි
  (`testStatus: "unavailable"`); IP-level signal එකකින් permanent state එකක් කිසිවිටෙක
  නිගමනය නොකෙරේ. `disableCooling` connections මෙම branch එක සම්පූර්ණයෙන්ම මඟහරියි.
- **Allowlist කළ family එක සඳහා lock granularity වෙනස් වේ**: මෙය sibling
  optimization එකක් පමණක් නොව scope වෙනසකි. opencode යනු `passthroughModels`
  provider එකක් බැවින්, මෙම branch එකට පෙර 429 එකක් මඟින් per-MODEL lockout එකක් ඇති
  විය; දැන් එය connection cooldown එකක් ඇති කරයි — sibling එකක් කිසිසේත්ම නොමැතිව
  තනි connection එකක් ධාවනය කරන operator කෙනෙකු සඳහාද මෙය අදාළ වේ. මෙය opencode rule
  table එක දැනටමත් නිවැරදි යැයි ප්රකාශ කරන granularity එකයි (`scope: "connection"`,
  `providerErrorRules.ts`); එහෙත් opencode එක `HONORS_RULE_LOCK_SCOPE_PROVIDERS` තුළ
  නොමැති බැවින් මෙතෙක් එය කිසිදා පිළිපැද නැත. මෙම branch එක connection-scoped
  agentrouter branch එක අනුකරණය කරමින්, අසාර්ථක වූ connection එකේ cooldown එක +
  `backoffLevel` එක තනිවම ලියා return කරයි — පහළ ඇති per-model block එක සහ generic
  path එක කිසිවිටෙක ළඟා නොවේ.
- **Combo ඇතුළත්ය**: agentrouter branch එක මෙන්ම, combo caller කෙනෙකු 429 එකකට
  යොදන `persistUnavailableState`/`isCombo` downgrade එක මෙම scope එක හිතාමතාම
  නොසලකා හරියි. Per-model lockout එකක් මෙම scope එකේ දුර්වල ආකාරයක් නොවේ; එය වැරදි
  ඒකකයයි: අවසන් වූ IP එක පිළිබඳ එයින් කිසිවක් නොකියන බැවින් combo rotation එක සෑම
  sibling එකකටම අනිවාර්යයෙන් අසාර්ථක වන call එක බැගින් දිගටම වැය කරනු ඇත.
- **Sibling ආරක්ෂාව**: දැනටමත් terminal (banned/credits_exhausted) වූ හෝ දැනටමත්
  වඩා දිගු cooldown එකක සිටින sibling එකක් කිසිවිටෙක overwrite නොකෙරේ.
- **සුවිශේෂී allowlist එක**: `EGRESS_BUCKETED_LOCK_PROVIDERS` පුළුල් කිරීම පැහැදිලි
  owner තීරණයකි; generic wiring නොමැත (pattern #10334/#10419). Sibling query එක එය
  SQL literal එකක් ලෙස නැවත සඳහන් කිරීම වෙනුවට එම allowlist එකම bind කරයි; එබැවින්
  එය පුළුල් කිරීම one-line change එකක් ලෙසම පවතී.
- **Egress IP rotation, දිශා දෙකෙන්ම**: lookup කවුළුව (පැය 24) egress-IP cache TTL
  එකට (මිනිත්තු 5) වඩා බොහෝ පුළුල් බැවින්, "අවසන් වරට දැන සිටි IP" යනු වත්මන් state
  එක නොව ඉතිහාසයයි. කවුළුව තුළ connection එකක proxy එක rotate වී ඇත්නම්, lock එකට
  සත්ය වශයෙන්ම හවුල් වූ IP එකක් **මඟහැරිය හැක** (වාර්තා කළ IP එක නව, අවසන් නොවූ
  එක වේ) — එමෙන්ම ප්රතිවිරුද්ධව, අවසන් වූ IP එකෙන් ඉවතට rotate වී ඇති sibling එකක්
  එය **cooldown කළ හැක**. දෙවන අවස්ථාවේදී එම sibling එකට එක් cooldown කවුළුවක් වැය
  වේ; මේ දෙකම history-based lookup එකක පිළිගත් හැකි-උපරිම සීමාවන්ය.
- **පිරිවැය**: `proxy_logs` හි සීමා කළ scans දෙකක් (`idx_pl_timestamp` හරහා
  window-filtered), 429 සංඛ්යාතයේදී පමණි. නව index එකක් නැත (migration 134
  YAGNI). මධ්යස්ථ ප්රමාණයේ සැබෑ traffic සහිත DB copy එකක් මත මනින ලදී;
  high-throughput instance එකක් එම කවුළුව තුළ සමානුපාතිකව වැඩි rows ගණනක් රඳවා ගනී.

---

## අනෙකුත් ප්රත්යස්ථතා විශේෂාංග

- **මාර්ගගත කිරීමේ උපායමාර්ග 19ක්** (ප්රමුඛතාව, බරිත, වට-මාරු, සන්දර්භ-රිලේ, පළමුව-පිරවීම, p2c, අහඹු, අවම-භාවිත, පිරිවැය-ප්රශස්ත, යළි-සැකසුම්-සැලකිලිමත්, යළි-සැකසුම්-කවුළුව, අතිරික්ත-ධාරිතාව, දැඩි-අහඹු, ස්වයංක්රීය, lkgp, සන්දර්භ-ප්රශස්ත, හැඹිලි-ප්රශස්ත, ඒකාබද්ධ, නලමාර්ග) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) බලන්න.
- **යළි-සැකසුම්-සැලකිලිමත් මාර්ගගත කිරීම** (v3.8.0) — කෝටා යළි-සැකසුම් වේලාව අනුව සම්බන්ධතාවලට ප්රමුඛතාව දෙයි.
- **පසුබිම් ප්රකාරයේ පහත හෙළීම** — Responses API `background: true` අනතුරු ඇඟවීමක් සමඟ සමමුහුර්ත ප්රකාරයට පහත හෙළනු ලැබේ.
- **ගතික මෙවලම් සීමා හඳුනාගැනීම** — මෙවලම් ගණනේ සීමාවලට ළඟා වූ විට සපයන්නන්ගෙන් පසුබසියි.
- **හදිසි විකල්පය** — `OMNIROUTE_EMERGENCY_FALLBACK` මඟින් පාලනය වේ; ක්රියාකරුවන්ට යළි ආරම්භ කිරීමකින් තොරව Feature Flags පිටුවෙන් එය අතික්රමණය කළ හැක.

---

## දෝෂ නිදොස් කිරීම

- බර තැබූ සංයෝජන පිළිතුරු ලෙස `503 all_targets_cooling_down` ලැබේ (`Retry-After` සකසා ඇති අතර, `diagnostics.excluded` තුළ සෑම ඉලක්කයක්ම `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` සමඟ ලැයිස්තුගත වේ) → සංචිතය වින්යාස කර සම්බන්ධ කර ඇත; සෑම ඉලක්කයක්ම ප්රතිරෝධක කාලමානයක් මඟින් බැහැර කර තිබීම පමණක් සිදුව ඇත. `[COMBO] Weighted selection: every target excluded before dispatch — …` අනතුරු ඇඟවීම හේතු සහ ඉතිරි තත්පර සඳහන් කරයි. එම සංයෝජනයෙන්ම ලැබෙන `404 no_executable_targets` යන්නෙන් අදහස් වන්නේ කිසිදු ප්රතිරෝධක කාලමානයක් සම්බන්ධ නොවූ බවයි (ක්රියාත්මක කිරීමට කිසිවක් නැත, හෝ සෑම ගිණුමක්ම ලබාගත හැකිදැයි පරීක්ෂා කිරීමේදී අසාර්ථක වී ඇත). මෙය `targetResolution.ts` තුළ එකතු කළ බැහැර කිරීම්වලින් `open-sse/services/combo/pinRecovery.ts` තුළ ගොඩනඟා ඇත.
- සැපයුම්කරුවෙකු සඳහා සියලු යතුරු මඟහැරේ → පරිපථ බිඳිනයේ තත්ත්වය සහ එක් එක් සම්බන්ධතාවයේ `rateLimitedUntil`/`testStatus` යන දෙකම පරීක්ෂා කරන්න.
- යළි සැකසීමේ කාල පරාසයෙන් පසුවත් සැපයුම්කරු ස්ථිරව බැහැර වී ඇත → කේතය `getStatus()`/`canExecute()` වෙනුවට අමු `state` කියවයි.
- එක් යතුරක් අසාර්ථක වුවත් අනෙක්වා ක්රියා කළ යුතුය → පරිපථ බිඳිනයට වඩා සම්බන්ධතා සිසිල්වීමේ කාලය භාවිත කිරීමට ප්රමුඛත්වය දෙන්න.
- එක් ආකෘතියක් පමණක් අසාර්ථක වේ → සම්බන්ධතා සිසිල්වීමේ කාලයට වඩා ආකෘති අගුලු දැමීමට ප්රමුඛත්වය දෙන්න.
- තත්ත්වය ස්වයංක්රීයව යථා තත්ත්වයට පත් විය යුතු නමුත් එසේ නොවේ → අනාගත කාලමුද්රාවක් සහ කල් ඉකුත් වූ තත්ත්වය නැවුම් කරන කියවීමේ මාර්ගයක් තිබේදැයි පරීක්ෂා කරන්න. ස්ථිර තත්ත්ව සඳහා අතින් වෙනස්කම් කිරීම අවශ්ය වේ.

---

## TLS ඇඟිලි සලකුණුකරණය සහ රහසිගතභාවය

සපයන්නා-විශේෂිත රහසිගතභාවය (JA3/JA4, CCH, අපැහැදිලි කිරීම) වෙනම ලේඛනගත කර ඇත — `docs/security/STEALTH_GUIDE.md` බලන්න (git; `/docs` වෙත සම්පාදනය කර නොමැත).

---

## ප්රත්යස්ථතා පරීක්ෂණ (අදියර 8 · කොටස C)

ප්රත්යස්ථතා තර්කනය සඳහා ඒකක පරීක්ෂණවලට අමතරව, පරීක්ෂණ තුනක් සැබෑ
ආතති/අසමත් වීමේ තත්ත්ව යටතේ ධාවන පරිසරය පරීක්ෂා කරයි (සියල්ල ඒකාබද්ධතා/රාත්රී පරීක්ෂණ වේ — කිසිවක් PR අවහිර නොකරයි):

| පරීක්ෂණය      | පරීක්ෂා කරන දේ                                                                                                                                                                                                       | ධාවනය කරන ආකාරය                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| ව්යාකූලතා     | ව්යාජ-upstream node එක සැබෑ ප්රමාදය/යළි-සැකසුම/කාලය ඉක්මවීම/503 ඇතුළු කරයි; පරිපථ බිඳිනය විවෘත වී/ප්රතිසාධනය වන බවත් `checkFallbackError` මඟින් 503 ප්රතිසාධනය කළ හැකි විකල්පයක් ලෙස වර්ගීකරණය කරන බවත් තහවුරු කරයි. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-වර්ධනය   | `--expose-gc` යටතේ එක් `createSSEStream` එකකට ප්රවාහ ~500ක්; heap එක උපරිම සීමාව ඉක්මවා වර්ධනය වුවහොත් අසමත් වේ (OOM ආරක්ෂණය #3069).                                                                                 | `npm run test:heap`                     |
| k6 දිගු-ධාවනය | `/api/monitoring/health` වෙත අඛණ්ඩ භාරය; p95/දෝෂ සීමා.                                                                                                                                                               | `k6 run tests/load/k6-soak.js` (රාත්රී) |

`.github/workflows/nightly-resilience.yml` මඟින් මෙහෙයවනු ලැබේ (cron + dispatch). පෙරනිමි
`test:integration` තුළ, chaos සහ heap ස්වයංක්රීයව මඟහැරේ (`RUN_CHAOS_INT`/`--expose-gc` නොමැතිව).

---

## මෙයද බලන්න

- [ගෘහනිර්මාණ මාර්ගෝපදේශය](./ARCHITECTURE.md) — පද්ධති ගෘහනිර්මාණය සහ අභ්යන්තර ක්රියාකාරීත්වය
- [පරිශීලක මාර්ගෝපදේශය](../guides/USER_GUIDE.md) — සැපයුම්කරුවන්, සංයෝජන, CLI ඒකාබද්ධ කිරීම
- [ස්වයංක්රීය සංයෝජන එන්ජිම](../routing/AUTO-COMBO.md) — සාධක 16ක ලකුණුකරණය, මාදිලි ඇසුරුම්
