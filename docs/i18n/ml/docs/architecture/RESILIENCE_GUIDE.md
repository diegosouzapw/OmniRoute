# Resilience Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute-ന് വ്യത്യസ്തവും എന്നാൽ പരസ്പരം ബന്ധപ്പെട്ടതുമായ മൂന്ന് പ്രതിരോധശേഷി സംവിധാനങ്ങളുണ്ട്. ഓരോന്നിനും വ്യത്യസ്തമായ വ്യാപ്തിയും ലക്ഷ്യവുമാണുള്ളത്. റൂട്ടിംഗ് പെരുമാറ്റത്തിലെ പ്രശ്നങ്ങൾ കണ്ടെത്തുമ്പോൾ അവയെ വേർതിരിച്ച് പരിഗണിക്കുക.

![3-തല പ്രതിരോധശേഷി മോഡൽ](../diagrams/exported/resilience-3layers.svg)

> ഉറവിടം: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. പ്രൊവൈഡർ സർക്യൂട്ട് ബ്രേക്കർ

**വ്യാപ്തി:** മുഴുവൻ പ്രൊവൈഡറും (ഉദാ., `glm`, `openai`, `anthropic`).

**ലക്ഷ്യം:** അപ്സ്ട്രീം/സേവന തലത്തിൽ ആവർത്തിച്ച് പരാജയപ്പെടുന്ന ഒരു പ്രൊവൈഡറിലേക്ക് ട്രാഫിക് അയയ്ക്കുന്നത് നിർത്തുക.

**നടപ്പാക്കൽ:**

- കോർ ക്ലാസ്: `src/shared/utils/circuitBreaker.ts`
- വയറിംഗ്: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- സ്റ്റാറ്റസ് API: `GET /api/monitoring/health`
- റീസെറ്റ് API: `POST /api/resilience/reset`
- റാപ്പറുകൾ: `open-sse/services/accountFallback.ts`
- DB പട്ടിക: `domain_circuit_breakers`

**അവസ്ഥകൾ:**

- `CLOSED` — സാധാരണ ട്രാഫിക് അനുവദിച്ചിരിക്കുന്നു
- `DEGRADED` — ട്രാഫിക് ഇപ്പോഴും അനുവദിച്ചിരിക്കുന്നു, എന്നാൽ വർധിച്ച പ്രൊവൈഡർ പരാജയങ്ങൾ നിരീക്ഷിക്കുന്നു
- `OPEN` — പ്രൊവൈഡർ താൽക്കാലികമായി തടഞ്ഞിരിക്കുന്നു; കോംബോ റൂട്ടിംഗ് അതിനെ ഒഴിവാക്കുന്നു
- `HALF_OPEN` — റീസെറ്റ് സമയപരിധി കഴിഞ്ഞു; പ്രോബ് അഭ്യർത്ഥന അനുവദിച്ചിരിക്കുന്നു

**ക്രമീകരിക്കാവുന്ന ഡിഫോൾട്ടുകൾ (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience എന്നതിൽ ലഭ്യമാണ്):**

| ക്ലാസ്  | ഡീഗ്രേഡ് ആകുന്നത് | ഓപ്പൺ ആകുന്നത് | റീസെറ്റ് സമയപരിധി |
| ------- | ----------------- | -------------- | ----------------- |
| OAuth   | 5 പരാജയങ്ങൾ       | 8 പരാജയങ്ങൾ    | 60s               |
| API-key | 7 പരാജയങ്ങൾ       | 12 പരാജയങ്ങൾ   | 30s               |
| ലോക്കൽ  | കണക്കാക്കിയത്     | 2 പരാജയങ്ങൾ    | 15s               |

ഒരു പ്രൊവൈഡർ എപ്പോൾ `DEGRADED` അവസ്ഥയിലേക്ക് പ്രവേശിക്കണമെന്ന് `degradationThreshold` നിയന്ത്രിക്കുന്നു; അത് എപ്പോൾ ഓപ്പൺ ആകണമെന്നും ഒഴിവാക്കപ്പെടണമെന്നും `failureThreshold` നിയന്ത്രിക്കുന്നു. ലോക്കൽ പ്രൊവൈഡർ പ്രൊഫൈലുകൾ ഇതുവരെ Resilience ക്രമീകരണ പേജിൽ ലഭ്യമാക്കിയിട്ടില്ല.

**ട്രിപ്പ് കോഡുകൾ:** പ്രൊവൈഡർ-തല സ്റ്റാറ്റസുകളായ `[408, 500, 502, 503, 504]` മാത്രം. അക്കൗണ്ട്-തല പിശകുകൾക്കായി ട്രിപ്പ് ചെയ്യരുത് (മിക്ക 401/403/429 പിശകുകളും — അവ കൂൾഡൗണിലോ ലോക്കൗട്ടിലോ ഉൾപ്പെടുന്നു).

**ലേസി റിക്കവറി:** `OPEN` കാലഹരണപ്പെടുമ്പോൾ, `getStatus()`, `canExecute()`, `getRetryAfterMs()` എന്നിവ അവസ്ഥയെ `HALF_OPEN` ആയി പുതുക്കുന്നു. പശ്ചാത്തല ടൈമർ ആവശ്യമില്ല.

---

### ഓപ്റ്റ്-ഇൻ ഗ്ലോബൽ പ്രൊവൈഡർ കൂൾഡൗൺ (വിൻഡോ ഗേറ്റ്)

നാലാമത്തെ, **ഓപ്റ്റ്-ഇൻ** ലെയർ (`PROVIDER_COOLDOWN_ENABLED`, ഡിഫോൾട്ടായി **ഓഫ്**) പരാജയപ്പെടുന്ന പ്രൊവൈഡർമാരുടെ
ക്രോസ്-റിക്വസ്റ്റ് മെമ്മറി
`open-sse/services/providerCooldownTracker.ts` എന്നതിൽ സൂക്ഷിക്കുന്നു. തുടർച്ചയായ കോംബോ അഭ്യർത്ഥനകൾ ഇപ്പോൾ മാത്രം
പരാജയപ്പെട്ട ഒരു പ്രൊവൈഡറിലൂടെ വീണ്ടും കടന്നുപോകുന്നത് നിർത്തുന്നതിനായി കോംബോ ടാർഗറ്റ്
റെസല്യൂഷൻ ഇത് പരിശോധിക്കുന്നു. പ്രൊവൈഡർ-തല എൻട്രികൾ `PROVIDER_PROFILES` വിൻഡോ ഗേറ്റ് പാലിക്കുന്നു:

| പ്രൊഫൈൽ | ഇതിന് ശേഷം ട്രിപ്പ് ചെയ്യും (`providerFailureThreshold`) | ഇതിനുള്ളിൽ (`providerFailureWindowMs`) | ഇത്ര സമയം കൂൾഡൗൺ (`providerCooldownMs`) |
| ------- | -------------------------------------------------------: | -------------------------------------: | --------------------------------------: |
| OAuth   |                                                     `10` |                                `15min` |                                  `5min` |
| API കീ  |                                                     `15` |                                `30min` |                                 `10min` |

ത്രെഷോൾഡിന് താഴെയാണെങ്കിൽ പ്രൊവൈഡർ **കൂൾഡൗണിലാണെന്ന്** കണക്കാക്കില്ല; ഒരു വിജയം
വിൻഡോ മായ്ക്കുന്നു. കണക്ഷൻ-തല എൻട്രികൾ (`provider:connectionId`) പകരം
എക്സ്പോണൻഷ്യൽ `minRetryCooldownMs → maxRetryCooldownMs` ബാക്ക്ഓഫ് നിലനിർത്തുന്നു. ഓവർറൈഡുകൾ:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
റിഗ്രഷൻ ഗാർഡ്: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. കണക്ഷൻ കൂൾഡൗൺ

**വ്യാപ്തി:** ഒരൊറ്റ പ്രൊവൈഡർ കണക്ഷൻ/അക്കൗണ്ട്/കീ.

**ഉദ്ദേശ്യം:** അതേ പ്രൊവൈഡറിനായുള്ള മറ്റ് കണക്ഷനുകൾ സേവനം നൽകുന്നത് തുടരുമ്പോൾ പ്രശ്നമുള്ള ഒരു കീ ഒഴിവാക്കുക.

**നടപ്പാക്കൽ:**

- ലഭ്യമല്ലെന്ന് അടയാളപ്പെടുത്തൽ: `src/sse/services/auth.ts::markAccountUnavailable()`
- തിരഞ്ഞെടുപ്പ്: അതേ ഫയലിലെ `getProviderCredentials*`
- കൂൾഡൗൺ കണക്കുകൂട്ടൽ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ക്രമീകരണങ്ങൾ: `src/lib/resilience/settings.ts`

**ഓരോ കണക്ഷനിലുമുള്ള ഫീൽഡുകൾ:**

- `rateLimitedUntil` — കൂൾഡൗൺ അവസാനിക്കുന്നതുവരെയുള്ള ടൈംസ്റ്റാമ്പ്
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — എക്സ്പോണൻഷ്യൽ ബാക്ക്ഓഫ് കൗണ്ടർ

**ഡിഫോൾട്ട് കൂൾഡൗണുകൾ:**

- OAuth അടിസ്ഥാനം: 5s
- API-key അടിസ്ഥാനം: 3s
- API-key 429: അപ്സ്ട്രീമിൽനിന്നുള്ള `Retry-After`/റീസെറ്റ് ഹെഡറുകൾ/പാഴ്സ് ചെയ്യാവുന്ന റീസെറ്റ് ടെക്സ്റ്റ് എന്നിവയ്ക്ക് മുൻഗണന നൽകുന്നു
- ബാക്ക്ഓഫ്: `baseCooldownMs * 2 ** failureIndex`

**തണ്ടറിങ്-ഹെർഡ് പ്രതിരോധ ഗാർഡ്:** ഒരേസമയം സംഭവിക്കുന്ന പരാജയങ്ങൾ കൂൾഡൗൺ അമിതമായി നീട്ടുന്നതോ `backoffLevel` രണ്ടുതവണ വർധിപ്പിക്കുന്നതോ തടയുന്നു.

**ടെർമിനൽ നിലകൾ (കൂൾഡൗണുകൾ അല്ല):**

- `banned` — നിരോധിത-കീവേഡ് / അക്കൗണ്ട്-ബാൻ കണ്ടെത്തൽ വഴി സജ്ജമാക്കുന്നു ([BAN_DETECTION](../security/BAN_DETECTION.md) കാണുക); കൂടാതെ, തുടർച്ചയായി മൂന്ന് അപ്സ്ട്രീം ഓരോ-അഭ്യർത്ഥന നിരസിക്കലുകൾ (`request_rejected`, ഉദാ. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) വഴിയും സജ്ജമാക്കുന്നു; ഒരൊറ്റ നിരസിക്കൽ കണക്ഷനെ കൂൾഡൗണിലാക്കുക മാത്രമാണ് ചെയ്യുന്നത്
- `expired` (പരിമിതമായ പുനഃശ്രമങ്ങൾക്കുശേഷം ടെർമിനൽ നിലയിലേക്ക് മാറുന്നു — എക്സ്പോണൻഷ്യൽ ബാക്ക്ഓഫോടുകൂടിയ `EXPIRED_RETRY_MAX = 3` — അതിനാൽ താൽക്കാലിക OAuth പിശകുകൾ അക്കൗണ്ട് ശാശ്വതമായി നിർജ്ജീവമാക്കുന്നതിന് മുമ്പ് സ്വയം പരിഹരിക്കപ്പെടാം)
- `credits_exhausted`

ക്രെഡൻഷ്യലുകൾ മാറുകയോ ഒരു ഓപ്പറേറ്റർ അവ റീസെറ്റ് ചെയ്യുകയോ ചെയ്യുന്നതുവരെ ഇവ നിലനിൽക്കും. താൽക്കാലിക കൂൾഡൗൺ നില ഉപയോഗിച്ച് ടെർമിനൽ നിലകളെ ഓവർറൈറ്റ് ചെയ്യരുത്.

**ലേസി റിക്കവറി:** `rateLimitedUntil` കഴിഞ്ഞാൽ കണക്ഷൻ വീണ്ടും യോഗ്യമാകും. വിജയകരമായി ഉപയോഗിക്കുമ്പോൾ, `clearAccountError()` എല്ലാ പിശക് ഫീൽഡുകളും മായ്ക്കുന്നു.

### സെഷൻ അഫിനിറ്റി (#7274)

**വ്യാപ്തി:** **ഏത്** പ്രൊവൈഡറിനും, ഒരു കണക്ഷനിലേക്ക് പിൻ ചെയ്തിരിക്കുന്ന ഒരൊറ്റ ക്ലയന്റ് സെഷൻ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ഹെഡർ).

**ഉദ്ദേശ്യം:** ഒന്നിലധികം ടേണുകളുള്ള ഒരു ഏജന്റിനെ (Claude Code, aider, ഇഷ്ടാനുസൃത ഏജന്റുകൾ) അഭ്യർത്ഥനകളിലുടനീളം അതേ അക്കൗണ്ടിൽ നിലനിർത്തുക; ഇതിലൂടെ ക്രോസ്-അക്കൗണ്ട് കോൺടെക്സ്റ്റ് നഷ്ടവും ഓരോ അക്കൗണ്ടിനും പ്രത്യേകം സെഷൻ നിലയുള്ള പ്രൊവൈഡറുകളിൽ ആവർത്തിച്ചുള്ള കോൾഡ്-സ്റ്റാർട്ട് 429-കളും കുറയ്ക്കാം.

**നടപ്പാക്കൽ:**

- TTL നിർണയം: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- പിൻ തിരഞ്ഞെടുക്കൽ/സൃഷ്ടിക്കൽ: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ഹെഡർ എക്സ്ട്രാക്ഷൻ (പൊതുവായത്, ഏത് പ്രൊവൈഡറിനും): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- നിലനിർത്തുന്ന പിൻ പട്ടിക: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ക്രമീകരണം: `sessionAffinityTtlMs` (ms-ലുള്ള ഗ്ലോബൽ TTL, `0` പ്രവർത്തനരഹിതമാക്കുന്നു) — `src/lib/db/settings.ts`. `124_generic_session_affinity_ttl.sql` മൈഗ്രേഷൻ വഴി Codex-ന് മാത്രമായിരുന്ന `codexSessionAffinityTtlMs` എന്നതിൽനിന്ന് പുനർനാമകരണം ചെയ്തു; മുമ്പ് കോൺഫിഗർ ചെയ്തിട്ടുള്ള ഏതൊരു Codex TTL-ഉം ഇത് പുതിയ ഡിഫോൾട്ടായി കൈമാറുന്നു.

#7274-ന് മുമ്പ്, `codex` ഒഴികെയുള്ള ഓരോ പ്രൊവൈഡറിനും `resolveSessionAffinityTtlMs()` നേരിട്ട് `0` നൽകി പുറത്തുകടന്നിരുന്നു; അതിനാൽ പിന്നിങ് സംവിധാനവും ഹെഡർ എക്സ്ട്രാക്ഷനും ഇതിനകം പ്രൊവൈഡർ-അജ്ഞേയമായിരുന്നെങ്കിലും TTL ക്രമീകരണത്തിനും സെഷൻ ഹെഡറുകൾക്കും മറ്റൊരിടത്തും പ്രഭാവമുണ്ടായിരുന്നില്ല. ഈ പരിഹാരം ആ നേരത്തെയുള്ള റിട്ടേൺ നീക്കം ചെയ്തു; TTL ആഗോളമായി `0`-ന് മുകളിൽ സജ്ജമാക്കിയാൽ ഇപ്പോൾ എല്ലാ പ്രൊവൈഡറുകൾക്കും ഒരേ രീതിയിൽ ബാധകമാണ്.

മൂന്ന് സെഷൻ-അഫിനിറ്റി ഹെഡറുകളും ഒരിക്കലും അപ്സ്ട്രീമിലേക്ക് ഫോർവേഡ് ചെയ്യപ്പെടുന്നില്ല — ക്ലയന്റ് ഹെഡറുകൾ കടത്തിവിടുന്നതിനുപകരം എക്സിക്യൂട്ടറുകൾ സ്വന്തം അപ്സ്ട്രീം ഹെഡറുകൾ ആദ്യംമുതൽ നിർമ്മിക്കുന്നു; അതിനാൽ ഇത് ഒരു ആന്തരിക കോറിലേഷൻ ഐഡി മാത്രമായി തുടരുന്നു.

### എക്സ്ക്ലൂസീവ് മാനേജ്ഡ് സെഷൻ കണക്ഷൻ ലീസുകൾ

**വ്യാപ്തി:** സജീവമായ ഒരു മാനേജ്ഡ് HTTP ക്ലയന്റ്/സെഷൻ, യോഗ്യമായ ഒരു OmniRoute കണക്ഷന്റെ ഉടമസ്ഥത വഹിക്കുന്നു.

**ഉദ്ദേശ്യം:** അഭ്യർത്ഥനകളിലുടനീളം കർശനമായ റൂട്ടിങ് പരിധി ആവശ്യമായ ക്ലയന്റുകൾക്ക് ദീർഘകാലം നിലനിൽക്കുന്ന എക്സ്ക്ലൂസീവ് കണക്ഷൻ ഉടമസ്ഥത നൽകുക. സോഫ്റ്റ് കണ്ടിന്യൂയിറ്റി മുൻഗണനയായ സെഷൻ അഫിനിറ്റിയിൽനിന്ന് ഇത് വ്യത്യസ്തമാണ്: ഒരു എക്സ്ക്ലൂസീവ് ലീസ് SQLite-ൽ ലൈഫ്സൈക്കിൾ നില നിലനിർത്തുകയും, ഗ്ലോബൽ സജീവ-ഉടമ, സജീവ-കണക്ഷൻ ഏകത്വം നിർബന്ധമാക്കുകയും, പ്രൊവൈഡർ ഡിസ്പാച്ചിന് മുമ്പ് കാലഹരണപ്പെട്ട ഒരു ജനറേഷൻ നിരസിക്കുകയും ചെയ്യുന്നു.

ഓരോ API കീയ്ക്കും പ്രത്യേകം തിരഞ്ഞെടുക്കാവുന്ന ഫീച്ചറാണിത്. ഒരു മാനേജ്ഡ് കീയ്ക്ക് `lease:exclusive` സ്കോപ്പും വ്യക്തമായി നൽകിയ ശൂന്യമല്ലാത്ത `allowedConnections` ലിസ്റ്റും ഉണ്ടായിരിക്കണം. ഏതൊരു HTTP ക്ലയന്റിനും ലൈഫ്സൈക്കിൾ എൻഡ്പോയിന്റ് ഉപയോഗിക്കാം; ക്ലയന്റ് പേര്, യൂസർ-ഏജന്റ്, പ്രൊവൈഡർ, OAuth രീതി, അല്ലെങ്കിൽ മോഡൽ എന്നിവയൊന്നും ആവശ്യമില്ല. ലീസ് ഒരു കണക്ഷന്റെ ഉടമസ്ഥതയാണ് വഹിക്കുന്നത്, മോഡലിന്റേതല്ല; അതിനാൽ കണക്ഷൻ സാധാരണ രീതിയിൽ യോഗ്യമായി തുടരുന്നിടത്തോളം മോഡൽ മാറിയാലും ബൈൻഡിങ് നിലനിൽക്കും. സാധാരണ മോഡൽ, ക്വോട്ട, ഹെൽത്ത്, കൂൾഡൗൺ, അലൗലിസ്റ്റ് നിയമങ്ങൾക്കാണ് തുടർന്നും ആധികാരികത; അവ അതേ ജനറേഷനെ സ്വതന്ത്രവും യോഗ്യവുമായ മറ്റൊരു കണക്ഷനിലേക്ക് മാറ്റിയേക്കാം.

JSON ആക്ഷനുകളായ `acquire`, `renew`, `release` എന്നിവയോടുകൂടിയ `POST /api/v1/session-leases` ആണ് ലൈഫ്സൈക്കിൾ. മാനേജ്ഡ് ഇൻഫറൻസ് അഭ്യർത്ഥനകൾ ഒപേക്ക് `X-OmniRoute-Lease-Owner` മൂല്യവും കൃത്യമായ `X-OmniRoute-Lease-Generation`-ഉം നൽകുന്നു. ഉടമ `vlo_`-നും പിന്നാലെ 43 base64url പ്രതീകങ്ങളും ഉപയോഗിക്കുന്നു; അതിന്റെ SHA-256 ഹാഷ് മാത്രമാണ് സംഭരിക്കുന്നത്. ഓരോ അന്തിമ ഡിസ്പാച്ച് പരിധിയും ഓതന്റിക്കേറ്റ് ചെയ്ത API കീ ഐഡിയെയും സജീവ കണക്ഷൻ ഐഡിയെയും ബന്ധിപ്പിക്കുന്നു. ലീസ് നിയന്ത്രണ ഹെഡറുകൾ ലോഗുകൾ, നിലനിർത്തിയ അഭ്യർത്ഥന സ്നാപ്പ്ഷോട്ടുകൾ, അപ്സ്ട്രീം എക്സിക്യൂട്ടർ ഹെഡറുകൾ എന്നിവയിൽനിന്ന് നീക്കം ചെയ്യപ്പെടുന്നു.

സാധാരണ റൂട്ടിങ്ങിൽ യോഗ്യമായ മാനേജ്ഡ് കാൻഡിഡേറ്റുകൾ ഉണ്ടായിട്ടും എല്ലാ സ്വതന്ത്ര കാൻഡിഡേറ്റുകളും മറ്റൊരു സജീവ ലീസിന്റെ അധീനതയിലാണെങ്കിൽ, OmniRoute HTTP `429`, ലീസ്-കപ്പാസിറ്റി-ലഭ്യമല്ല കോഡ്, കപ്പാസിറ്റിക്കായി കാത്തിരിക്കുന്ന നില, പ്രസക്തമായ ഏറ്റവും നേരത്തെയുള്ള കാലാവധിയിൽനിന്ന് നിർണയിക്കുന്ന പരിധിയുള്ള `Retry-After` എന്നിവ നൽകുന്നു. സാധാരണ രീതിയിലുള്ള ശൂന്യമായ യോഗ്യത ലീസ് മത്സരമല്ല; അത് നിലവിലുള്ള റൂട്ടിങ് പിശക് സെമാന്റിക്സ് നിലനിർത്തുന്നു.

അനുബന്ധ സംവിധാനങ്ങൾ വേറിട്ടുതന്നെ തുടരുന്നു:

- OAuth സെഷൻ ഒക്ക്യുപൻസി എന്നത് OAuth അക്കൗണ്ടുകൾക്കായുള്ള പ്രോസസ്-ലോക്കൽ സോഫ്റ്റ് ഡിസ്ട്രിബ്യൂഷനാണ്.
- അക്കൗണ്ട് സെമഫോറുകൾ അഭ്യർത്ഥന-കൺകറൻസി പെർമിറ്റുകൾ അനുവദിക്കുകയും ഒരു അഭ്യർത്ഥന പൂർത്തിയാകുമ്പോൾ അവസാനിക്കുകയും ചെയ്യുന്നു.
- എക്സ്ക്ലൂസീവ് മാനേജ്ഡ് സെഷൻ ലീസുകൾ എന്നത് ജനറേഷൻ പരിധിയോടുകൂടിയ, ദീർഘകാലം നിലനിൽക്കുന്ന ലൈഫ്സൈക്കിൾ ഉടമസ്ഥതയാണ്.

---

## 3. മോഡൽ ലോക്കൗട്ട്

**പരിധി:** പ്രൊവൈഡർ + കണക്ഷൻ + മോഡൽ ട്രിപ്പിൾ.

**സ്റ്റാറ്റസ് അനുസരിച്ചുള്ള കീ പരിധി:** ഒരു ലോക്കൗട്ട് ഏത് കീയിലേക്കാണ് എഴുതേണ്ടതെന്ന് പരാജയപ്പെടുന്ന സ്റ്റാറ്റസ് തീരുമാനിക്കുന്നു
(`open-sse/services/accountFallback/exactModelLock.ts`-ലെ `resolveLockoutScope()`):

- `429` / `403` / `402` — ക്വോട്ട അല്ലെങ്കിൽ എൻടൈറ്റിൽമെന്റ് സിഗ്നൽ — **ക്വോട്ട ഫാമിലി** ലോക്ക് ചെയ്യുന്നു:
  codex-നായി മുഴുവൻ `codex` / `spark` പരിധിയും (കണക്ഷനിലെ എല്ലാ `gpt-5*` മോഡലുകളും), മറ്റ് പ്രൊവൈഡർമാർക്കായി `getQuotaScopedModelForProvider()`.
- `404` അടിസ്ഥാന മോഡലിനെ ലോക്ക് ചെയ്യുന്നു (`getModelLockKey()` `not_found`-ന്റെ പരിധി ചുരുക്കുന്നു).
- മറ്റേതൊരു സ്റ്റാറ്റസും — `5xx` ട്രാൻസ്പോർട്ട്/സെർവർ പരാജയങ്ങളും ഗുണനിലവാര വാലിഡേഷനിൽനിന്ന് OmniRoute തന്നെ സൃഷ്ടിക്കുന്ന `502`-ഉം — കൃത്യമായ
  പ്രൊവൈഡർ/കണക്ഷൻ/മോഡൽ ട്യൂപ്പിൾ മാത്രം ലോക്ക് ചെയ്യുന്നു. ഒരു മോഡലിലെ മോശം സ്ട്രീം അക്കൗണ്ടിന്റെ ക്വോട്ടയെക്കുറിച്ചുള്ള തെളിവല്ല;
  ഈ നിയമത്തിന് മുമ്പ് `codex/gpt-5.6-luna`-യിലെ ഒരു ശൂന്യ പ്രതികരണം, ആ കണക്ഷനിലെ എല്ലാ `gpt-5*` മോഡലുകളെയും അവയുടെ ക്വോട്ടയിൽ മാറ്റമൊന്നുമില്ലാതിരിക്കെ
  2–30 മിനിറ്റേക്ക് (ക്രമേണ വർധിക്കുന്ന രീതിയിൽ) റൂട്ടിംഗിൽനിന്ന് നീക്കിയിരുന്നു.
- കോളർ വ്യക്തമായി നൽകുന്ന `scope` ഓപ്ഷനാണ് എല്ലായ്പ്പോഴും പ്രാബല്യത്തിൽ വരുന്നത് (Antigravity `"exact"` കൈമാറുന്നു).

**ഉദ്ദേശ്യം:** ഒരു മോഡൽ മാത്രം ലഭ്യമല്ലാത്തപ്പോഴോ ക്വോട്ട-പരിമിതമായിരിക്കുമ്പോഴോ ഒരു മുഴുവൻ കണക്ഷനും പ്രവർത്തനരഹിതമാക്കുന്നത് ഒഴിവാക്കുക.

**ഉദാഹരണങ്ങൾ:**

- ഓരോ മോഡലിനും പ്രത്യേകം ക്വോട്ടയുള്ള പ്രൊവൈഡർമാർ `429` മടക്കുന്നത്
- ലഭ്യമല്ലാത്ത ഒരു മോഡലിനായി ലോക്കൽ പ്രൊവൈഡർമാർ `404` മടക്കുന്നത്
- പ്രൊവൈഡർ-നിർദ്ദിഷ്ട മോഡ്/മോഡൽ അനുമതി പരാജയങ്ങൾ (ഉദാ., Grok മോഡുകൾ)

**ഇംപ്ലിമെന്റേഷൻ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### മോഡൽ കൂൾഡൗൺസ് ഡാഷ്ബോർഡ് (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

സജീവ ലോക്കൗട്ടുകളെ ഇവ സഹിതം പട്ടികപ്പെടുത്തുന്നു: പ്രൊവൈഡർ, കണക്ഷൻ, മോഡൽ, കാരണം, expiresAt. ഓപ്പറേറ്റർമാർക്ക് കാർഡിൽനിന്ന് ഒരു മോഡൽ മാനുവലായി വീണ്ടും പ്രവർത്തനക്ഷമമാക്കാം.

**REST API:**

- `GET /api/resilience/model-cooldowns` — സജീവ ലോക്കൗട്ടുകൾ പട്ടികപ്പെടുത്തുക
- `DELETE /api/resilience/model-cooldowns` — മാനുവലായി വീണ്ടും പ്രവർത്തനക്ഷമമാക്കുക. ബോഡി: `{provider, connection, model}`. ഓത്: മാനേജ്മെന്റ്.

### ലോക്കൗട്ട് ക്രമീകരണ UI + വിജയ-ക്ഷയ റിക്കവറി (v3.8.23)

എപ്പോഴും പ്രവർത്തിക്കുന്ന ഹാർഡ്കോഡ് ചെയ്ത പെരുമാറ്റമായിരുന്ന മോഡൽ ലോക്കൗട്ട്, അതിന്റേതായ ക്രമീകരണ കാർഡും സ്വയം സുഖപ്പെടുന്ന റിക്കവറി പാതയുമുള്ള, പൂർണമായി ക്രമീകരിക്കാവുന്ന ഓപ്റ്റ്-ഇൻ ഫീച്ചറായി മാറി.

**ക്രമീകരണ കാർഡ്:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ഇത് മുകളിലെ വായിക്കാൻ മാത്രം കഴിയുന്ന `ModelCooldownsCard`-ൽനിന്ന് **വ്യത്യസ്തമാണ്** (അത് സജീവ ലോക്കൗട്ടുകളെ _പട്ടികപ്പെടുത്തുക_ മാത്രമാണ് ചെയ്യുന്നത്) — പുതിയ കാർഡ് _പാരാമീറ്ററുകൾ ക്രമീകരിക്കുന്നു_. ഡിഫോൾട്ടുകൾ
`DEFAULT_MODEL_LOCKOUT_SETTINGS`-ൽ ലഭ്യമാണ്
(`src/lib/resilience/modelLockoutSettings.ts`):

| ക്രമീകരണം               | ഡിഫോൾട്ട്                        | അർത്ഥം                                                                  |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | മാസ്റ്റർ ടോഗിൾ — മോഡൽ ലോക്കൗട്ട് **ഡിഫോൾട്ടായി ഓഫാണ്**.                 |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | മോഡൽ-പരിധിയിലുള്ള പരാജയമായി കണക്കാക്കുന്ന അപ്സ്ട്രീം സ്റ്റാറ്റസുകൾ.     |
| `baseCooldownMs`        | `120_000` (120 സെ)               | ആദ്യ പരാജയത്തിനുള്ള പ്രാരംഭ ലോക്കൗട്ട് ദൈർഘ്യം.                         |
| `maxCooldownMs`         | `1_800_000` (30 മിനിറ്റ്)        | ക്രമേണ വർധിപ്പിച്ച കൂൾഡൗണിന്റെ പരമാവധി പരിധി.                           |
| `maxBackoffSteps`       | `10`                             | പരമാവധി എക്സ്പോണൻഷ്യൽ-ബാക്ക്ഓഫ് വർധന ഘട്ടങ്ങൾ.                          |
| `useExponentialBackoff` | `true`                           | ആവർത്തിച്ചുള്ള പരാജയങ്ങൾ കൂൾഡൗൺ എക്സ്പോണൻഷ്യലായി വർധിപ്പിക്കണമോ എന്നത്. |

ക്രമീകരണങ്ങൾ സാധാരണ settings store വഴി നിലനിർത്തുകയും resilience settings schema വഴി സാധൂകരിക്കുകയും ചെയ്യുന്നു; കാർഡ് `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` എന്ന നിബന്ധനയോടെ), `maxBackoffSteps` എന്നിവ പരിധിക്കുള്ളിൽ നിർത്തുന്നു.

**വിജയ-ക്ഷയ റിക്കവറി:** റിക്കവറി വെറും ടൈമർ കാലഹരണപ്പെടലിനെ മാത്രം ആശ്രയിക്കുന്നതല്ല. ആരോഗ്യകരമായ ഒരു പ്രതികരണം മോഡലിന്റെ പരാജയ എണ്ണം ക്രമേണ കുറയ്ക്കുന്നു; അതിനാൽ ഇടവേളയ്ക്കിടെ വീണ്ടെടുത്ത മോഡലിന്റെ വർധന നിൽക്കുകയും ടൈമർ അനുവദിക്കുന്നതിനുമുമ്പ് ലോക്കൗട്ട് മായുകയും ചെയ്യുന്നു. ഒരു കോംബോ ടാർഗറ്റ് വിജയിക്കുമ്പോൾ, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) വിളിക്കുന്നു; ഇത് സംഭരിച്ച
`failureCount`-നെ **പകുതിയാക്കുന്നു** (`Math.floor(failureCount / 2)`); അത് `0`-ൽ എത്തുമ്പോൾ ലോക്കൗട്ട് എൻട്രി പൂർണമായും ഇല്ലാതാക്കുന്നു. ഇതിന്റെ പ്രതിരൂപമായ `recordModelLockoutFailure()`, വർധന വിൻഡോയ്ക്കുള്ളിലെ പരാജയങ്ങളിൽ എണ്ണം വർധിപ്പിക്കുകയും കൂൾഡൗൺ ഉയർത്തുകയും ചെയ്യുന്നു. ഈ വിജയ-ക്ഷയം സാധാരണ ടൈമർ കാലഹരണപ്പെടലിന് പുറമേയാണ് —
രണ്ട് പാതകളിൽ ഏതിലൂടെയും ഒരു മോഡൽ വീണ്ടും പ്രവർത്തനക്ഷമമാക്കാം.

**സ്റ്റേറ്റ്:** ലോക്കൗട്ടുകൾ DB-യിൽ നിലനിർത്താതെ **ഇൻ-മെമ്മറിയിൽ** സൂക്ഷിക്കുന്നു (`provider:connectionId:model` കീ ഉപയോഗിക്കുന്ന, ഓരോ പ്രോസസിനുമുള്ള `ModelLockoutEntry` `Map`-കൾ; exact-scope ലോക്കുകൾക്ക്
`provider:connectionId:exact:model`); അതിനാൽ റീസ്റ്റാർട്ട് ചെയ്യുമ്പോൾ അവ നഷ്ടപ്പെടുന്നു. _ക്രമീകരണങ്ങൾ_ നിലനിർത്തുന്നു; സജീവ ലോക്കൗട്ട് _സ്റ്റേറ്റ്_ താൽക്കാലികമാണ്.

---

## 4. Quota-Share സമകാലികതാ നിയന്ത്രണം (v3.8.36)

സബ്സ്ക്രിപ്ഷൻ അക്കൗണ്ടുകൾ (GLM, MiniMax മുതലായവ) സാധാരണയായി ഒരേസമയം ~1–3 അഭ്യർത്ഥനകൾ മാത്രമേ സ്വീകരിക്കൂ; ഇത് കവിഞ്ഞാൽ 429 പിശകുകളും കൂൾഡൗണുകളും ഉണ്ടാകും. നിരവധി API കീകൾ ഒരേ അപ്സ്ട്രീം അക്കൗണ്ട് പങ്കിടുന്ന **quota-share** (`qtSd/…`) കോംബോകളിൽ ഇത് പ്രത്യേകിച്ച് രൂക്ഷമാണ്. ഒരു പങ്കിട്ട അക്കൗണ്ടിലേക്ക് അഭ്യർത്ഥനകൾ അമിതമായി എത്തുന്നത് മൂന്ന് പാളികൾ തടയുന്നു.

### ഓരോ കണക്ഷനിലുമുള്ള സമകാലികതാ പരിധി (`max_concurrent`)

ഓരോ പ്രൊവൈഡർ കണക്ഷനും ഒരു `max_concurrent` പരമാവധി പരിധി പ്രഖ്യാപിക്കാം (`provider_connections.max_concurrent`, കണക്ഷൻ മോഡൽ / API / DB എന്നിവയിൽ സജ്ജീകരിക്കുന്നത്). പരിധി ആവശ്യമില്ലെങ്കിൽ ഇത് ശൂന്യമായി വിടുക. താഴെയുള്ള സീരിയലൈസേഷൻ പാളിയെ നിയന്ത്രിക്കുന്ന ഏക ക്രമീകരണമാണിത് — അക്കൗണ്ടിന്റെ യഥാർഥ സമകാലികതാ പരിധിയായി ഇത് സജ്ജീകരിക്കുക (ഉദാ. GLM ~1, MiniMax ~2).

### Quota-share അഭ്യർത്ഥന സീരിയലൈസേഷൻ

ഒരു quota-share ഡിസ്പാച്ച് പോസിറ്റീവ് `max_concurrent` പ്രഖ്യാപിച്ചിട്ടുള്ള കണക്ഷനെ ലക്ഷ്യമിടുമ്പോൾ, ആ **അക്കൗണ്ടിലേക്കുള്ള** സമകാലിക അഭ്യർത്ഥനകൾ ഓരോ കണക്ഷനുമുള്ള സെമഫോർ (കീ `qsconn:<connectionId>`) വഴി സീരിയലൈസ് ചെയ്യപ്പെടുന്നു: അധിക അഭ്യർത്ഥനകൾ അക്കൗണ്ടിലേക്ക് ഒരുമിച്ച് ഒഴുകുന്നതിനുപകരം **ക്യൂവിൽ കാത്തിരിക്കും**. ഇത് **fail-open** ആണ് — നിറഞ്ഞ ക്യൂവോ ടൈംഔട്ടോ ഉണ്ടായാൽ, ഡിസ്പാച്ച് ചെയ്യാനാകുന്ന ഒരു അഭ്യർത്ഥന നിരസിക്കുന്നതിനുപകരം സ്ലോട്ട് ഇല്ലാതെ തന്നെ അത് തുടരുന്നു. **Settings → Resilience → Quota-share per-connection concurrency** എന്നതിൽ ടോഗിൾ ചെയ്യുക (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ഡിഫോൾട്ടായി ഓൺ). `max_concurrent` പരിധിയില്ലെങ്കിൽ നിലവിലെ പ്രവർത്തനരീതിയിൽ മാറ്റമുണ്ടാകില്ല.

> Quota-share റൂട്ടിംഗ് ഗേറ്റ് (`selectQuotaShareTarget`, DRR + P2C) സ്വയം
> fail-open ആണ്; പരിധിയിലെത്തിയ കണക്ഷന് അത് _കുറഞ്ഞ മുൻഗണന_ നൽകുക മാത്രമാണ് ചെയ്യുന്നത് —
> ഒറ്റ കണക്ഷൻ മാത്രമുള്ള പൂളിൽ അതിന് കർശനമായി പരിധി ഏർപ്പെടുത്താനാകില്ല. അതിനാൽ ഈ സെമഫോറാണ്
> യഥാർഥത്തിൽ അഭ്യർത്ഥനാ പ്രവാഹത്തെ നിയന്ത്രിക്കുന്നത്.

### കൂൾഡൗൺ പരിഗണിക്കുന്ന കോംബോ പുനഃശ്രമം

പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ, എല്ലാ കോംബോ തന്ത്രങ്ങളിലും SHORT താൽക്കാലിക കൂൾഡൗൺ കാരണം 429 പിശക് ഉറപ്പാകുമായിരുന്ന ഒരു അഭ്യർത്ഥന, 429 തിരികെ നൽകുന്നതിനുപകരം കൂൾഡൗൺ തീരുന്നതുവരെ കാത്തിരുന്ന് വീണ്ടും ഡിസ്പാച്ച് ചെയ്യപ്പെടുന്നു — ഉദാഹരണത്തിന്, 2-മോഡൽ കോംബോയിലെ രണ്ട് ലക്ഷ്യങ്ങളും ഓരോ മോഡലിനുമുള്ള നിരക്ക് പരിധിയിലെത്തുന്നത് പോലുള്ള, മൾട്ടി-മോഡൽ കോംബോകളിലെ Gemini-വിഭാഗത്തിലുള്ള TPM/RPM വിൻഡോകളെ (~60s retry-after) ഇത് ഉൾക്കൊള്ളുന്നു. **Settings → Resilience** എന്നതിലെ `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ഇതിനെ പരിമിതപ്പെടുത്തുന്നു. `quota_exhausted` (അർധരാത്രിവരെ ലോക്ക് ചെയ്തിരിക്കുന്നത്) അല്ലെങ്കിൽ auth/not-found കാരണങ്ങൾക്ക് ഇത് ഒരിക്കലും കാത്തിരിക്കില്ല.

---

## 5. അഭ്യർത്ഥനാ ക്യൂ പ്രവേശന നിയന്ത്രണം (v3.8.49 · issue #6593)

**പരിധി**: മുകളിലുള്ള മൂന്ന് സംവിധാനങ്ങൾക്കു തൊട്ടുതാഴെയുള്ള, പ്രാദേശികമായി ഓരോ provider+connection-നുമുള്ള നിരക്ക്-പരിധി ക്യൂ (`open-sse/services/rateLimitManager.ts`, Bottleneck അടിസ്ഥാനമാക്കിയത്).

**`maxWaitMs` എന്നത് എക്സിക്യൂഷൻ കാലഹരണപ്പെടലിനായി നിലനിർത്തിയിരിക്കുന്ന ഒരു പഴയ പേരാണ്.**
`resilienceSettings.requestQueue.maxWaitMs`, Bottleneck-ലേക്ക് ജോബ് `expiration` ആയി കൈമാറുന്നു; അതിന്റെ ടൈമർ ഡിസ്പാച്ചിനുശേഷം മാത്രമാണ് ആരംഭിക്കുന്നത്. അതിനാൽ ഇത് പ്രാദേശിക ക്യൂവിൽ ചെലവഴിക്കുന്ന സമയത്തെയല്ല, ലിമിറ്റർ നിയന്ത്രിക്കുന്ന എക്സിക്യൂഷനെയാണ് പരിമിതപ്പെടുത്തുന്നത്. കാലഹരണപ്പെടൽ വിശ്വസനീയമായ പ്രാദേശിക `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ആയി റിപ്പോർട്ട് ചെയ്യപ്പെടുന്നു; പഴയ ക്യൂ-ടൈംഔട്ട് കോഡ് പേര്, വിശ്വസനീയമായ ആന്തരിക ബാക്ക്വേഡ് കോംപാറ്റിബിലിറ്റിക്കായി മാത്രമേ സ്വീകരിക്കൂ. ഡിഫോൾട്ട് 15000ms ആണ്; `RATE_LIMIT_MAX_WAIT_MS` (env) വഴിയോ ഡാഷ്ബോർഡിലൂടെയോ (**Settings → Resilience**, 1–30000ms UI പരമാവധി) ഇത് മാറ്റിയെഴുതാം. ക്യൂവിൽ തുടരുന്ന സമയത്തിന് സമയപരിധിയില്ല; ക്യൂവിലുള്ള കോളർമാരുടെ എണ്ണം പരിമിതപ്പെടുത്താൻ താഴെയുള്ള `maxQueueDepth` ഉപയോഗിക്കുക.

**`maxQueueDepth` — തിരഞ്ഞെടുക്കാവുന്ന പ്രവേശന പരിധി (പുതിയത്).** ഒരേസമയം ഒരു provider+connection-നായി ക്യൂവിൽ (ഇതുവരെ ഡിസ്പാച്ച് ചെയ്യാത്തവയായി) എത്ര അഭ്യർത്ഥനകൾ ഇരിക്കാമെന്ന് `resilienceSettings.requestQueue.maxQueueDepth` പരിമിതപ്പെടുത്തുന്നു. ക്യൂവിൽ ഇതിനകം `maxQueueDepth` അഭ്യർത്ഥനകളുണ്ടെങ്കിൽ, ഒരു പുതിയ അഭ്യർത്ഥന `limiter.schedule()`-ൽ എത്തുന്നതിന് **മുമ്പുതന്നെ** ടൈപ്പ് ചെയ്ത `code: "RATE_LIMIT_QUEUE_FULL"` പിശകോടെ ഉടനടി നിരസിക്കപ്പെടുന്നു — അതിനാൽ നിരസിക്കൽ ചെലവുകുറഞ്ഞതാണ്, കൂടാതെ ആ അഭ്യർത്ഥനയ്ക്കായുള്ള ഏതെങ്കിലും ഡൗൺസ്ട്രീം പ്രോംപ്റ്റ്-കംപ്രഷൻ / വിവർത്തന പ്രവർത്തനങ്ങൾക്ക് മുമ്പുതന്നെ ഇത് സംഭവിക്കുന്നു. ഡിഫോൾട്ട് `0` = പ്രവർത്തനരഹിതം; ഇത് നിലവിലെ പരിധിയില്ലാത്ത ക്യൂ പ്രവർത്തനരീതി നിലനിർത്തുന്നു; അനുവദനീയമായ പരിധി 0–100000. `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) വഴിയോ `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) വഴിയോ ഇത് മാറ്റിയെഴുതാം.

പ്രവേശന പരിശോധന തന്നെ ഒരു പ്യൂർ ഫങ്ഷനാണ് (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), അതിനാൽ യഥാർഥ Bottleneck ലിമിറ്റർ ഇല്ലാതെയും ഇതിന് യൂണിറ്റ് ടെസ്റ്റ് നടത്താം.

> #6593 ആരംഭിച്ച RFC ഒരു `bypassCompressionOnRateLimit`
> ഫ്ലാഗും നിർദേശിച്ചിരുന്നു. ഈ റിപ്പോയിലെ `open-sse/services/compression/` പൈപ്പ്ലൈൻ,
> ഔട്ട്ബൗണ്ട് LLM അഭ്യർത്ഥനയിലെ (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ബ്ലോക്കിന് സമീപമുള്ള)
> പ്രോംപ്റ്റ്/കോൺടെക്സ്റ്റ് കംപ്രഷനാണ്; സൃഷ്ടിച്ച 429 ബോഡികളിലെ HTTP പ്രതികരണ
> കംപ്രഷനല്ല — ഒരു ലിറ്ററൽ bypass ഫ്ലാഗിന് അനുയോജ്യമായ കോഡ് പാത ഇവിടെ ഇല്ല.
> ആ പ്രോംപ്റ്റ്-കംപ്രഷൻ ഘട്ടം നിലവിൽ അഭ്യർത്ഥനാ പൈപ്പ്ലൈനിൽ `withRateLimit()`-ന്
> _മുമ്പും_ പ്രവർത്തിക്കുന്നു. അതിനാൽ queue-full നിരസിക്കലിൽ അത് ഒഴിവാക്കാൻ
> ക്രമം മാറ്റുന്നത് ഈ issue-ന്റെ പരിധിയേക്കാൾ വേറിട്ടതും വലുതുമായ ഒരു മാറ്റമാണ്;
> അത് ഇവിടെ മനഃപൂർവം നടപ്പാക്കിയിട്ടില്ല. CPU ലാഭം ക്രമം മാറ്റുന്നതിന്റെ
> അപകടസാധ്യതയ്ക്കു തക്കതാണെങ്കിൽ, ഒരു തുടർനടപടിയായി അത് ശേഷിപ്പിച്ചിരിക്കുന്നു.

---

## 6. സ്ലോ-സ്ട്രീം ത്രൂപുട്ട് വാച്ച്ഡോഗ് (#9709)

ഓപ്ഷണലായ `resilienceSettings.streamRecovery.throughputWatchdog` ഗാർഡ്, ചങ്കുകൾ അയയ്ക്കുന്നത് തുടരുന്നുണ്ടെങ്കിലും ക്രമീകരിച്ച ഉപയോഗപ്രദമായ ഔട്ട്പുട്ട് നിരക്കിൽ താഴെ മാത്രം അസിസ്റ്റന്റ് ഔട്ട്പുട്ട് സൃഷ്ടിക്കുന്ന ഒരു അപ്സ്ട്രീമിനെ കണ്ടെത്തുന്നു. ഇത് മനഃപൂർവം ഐഡിൽ ടൈംഔട്ടിൽനിന്ന് വ്യത്യസ്തമാണ്: ഹാർട്ട്ബീറ്റുകളും മെറ്റാഡാറ്റയും ഒരു ടൈമറും റീസെറ്റ് ചെയ്യുന്നില്ല, അവ പുരോഗതിയായി കണക്കാക്കപ്പെടുകയും ചെയ്യുന്നില്ല. ഔട്ട്പുട്ടിന്റെ ഗുണനിലവാരം പരിഗണിക്കാതെതന്നെ കേവലമായ സുരക്ഷാ പരിധിയായി തുടരുന്ന ഹാർഡ് അറ്റംപ്റ്റ് ഡെഡ്ലൈനിൽനിന്നും (#9153) ഇതിന് വ്യത്യാസമുണ്ട്.

വാച്ച്ഡോഗിന് അബോർട്ട് ചെയ്യാനാകുന്നതിന് മുമ്പ് ഒരു വാം-അപ്പ് കാലയളവും തുടർന്ന് ഒരു പൂർണ്ണ റോളിങ് വിൻഡോയും ആവശ്യമാണ്. ഇത് Chat Completions, Responses API ഔട്ട്പുട്ട് ഇവന്റുകളിൽനിന്നുള്ള ടെക്സ്റ്റ് ഡെൽറ്റകൾ കണക്കാക്കുന്നു (ഒരു യാഥാസ്ഥിതിക UTF-8 ബൈറ്റ് പ്രോക്സി), ഉപയോഗവിവരം മാത്രമുള്ളതും ശൂന്യവുമായ ഇവന്റുകൾ അവഗണിക്കുന്നു, കൂടാതെ ടൂൾ-കോൾ അല്ലെങ്കിൽ റീസണിങ് ഇവന്റുകൾ പുരോഗമിക്കുമ്പോൾ വിലയിരുത്തൽ താൽക്കാലികമായി നിർത്തുന്നു. ഡിഫോൾട്ടായി ഇത് പ്രവർത്തനരഹിതമാണ്; `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ഉപയോഗിച്ച് പ്രവർത്തനക്ഷമമാക്കാം. വിൻഡോ, വാം-അപ്പ്, കുറഞ്ഞ നിരക്ക്, അളക്കാനാകുന്ന ഏറ്റവും കുറഞ്ഞ ഔട്ട്പുട്ട് എന്നിവ സാധാരണ resilience-settings നോർമലൈസേഷൻ ലെയർ വഴി പരിധിപ്പെടുത്തപ്പെടുന്നു.

പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ, ഒരു വാച്ച്ഡോഗ് അബോർട്ട് സജീവമായ അപ്സ്ട്രീം അറ്റംപ്റ്റിന് മാത്രമേ ബാധകമാകൂ. ക്ലയന്റിന് ദൃശ്യമാകുന്ന ഏതെങ്കിലും ബൈറ്റുകൾ അയയ്ക്കുന്നതിന് മുമ്പ്, നിലവിലുള്ള same-account early-recovery പാത്തിന് അറ്റംപ്റ്റ് വീണ്ടും തുറക്കാം. കമ്മിറ്റിന് ശേഷം സ്ട്രീം അന്ധമായി ഒരിക്കലും റീപ്ലേ ചെയ്യില്ല; നിലവിലുള്ള സുരക്ഷിതമായ mid-stream continuation കരാറിന് മാത്രമേ ഒരു സഫിക്സ് കൂട്ടിച്ചേർക്കാനാകൂ. ഫൈനലൈസേഷൻ single-shot ആയി തുടരുന്നതിനാൽ, ഉപയോഗ അക്കൗണ്ടിങ്ങും സെമഫോർ റിലീസും ഡ്യൂപ്ലിക്കേറ്റ് ചെയ്യപ്പെടുന്നില്ല.

---

## 7. അപ്സ്ട്രീം സ്റ്റാറ്റസ് പുനഃപ്രസ്താവിക്കൽ (തെറ്റായി സൂചിപ്പിച്ച ക്വോട്ട പിശകുകൾ)

**പരിധി:** താൽക്കാലിക ക്വോട്ട തീർന്നത് തെറ്റായ HTTP സ്റ്റാറ്റസോടെ റിപ്പോർട്ട് ചെയ്യുന്ന ഒരു അപ്സ്ട്രീം ഗേറ്റ്വേ.

**ഉദ്ദേശ്യം:** ക്ലാസിഫിക്കേഷന് മുമ്പ് തെറ്റിദ്ധരിപ്പിക്കുന്ന സ്റ്റാറ്റസ് തിരുത്തുക, അതുവഴി ഡൗൺസ്ട്രീം ഉപഭോക്താക്കൾക്ക് (ഫോൾബാക്ക് എൻജിൻ, കോംബോ അഗ്രിഗേഷൻ, ക്ലയന്റിനെ അഭിമുഖീകരിക്കുന്ന റെസ്പോൺസ്) പരാജയം യഥാർത്ഥത്തിൽ വീണ്ടും ശ്രമിക്കാവുന്നതാണെന്ന് തിരിച്ചറിയാൻ കഴിയുന്നു.

ചില ഗേറ്റ്വേകൾ താൽക്കാലികമായ ക്വോട്ട തീർന്നത് വീണ്ടും ശ്രമിക്കാനാവാത്ത HTTP സ്റ്റാറ്റസ് ഉപയോഗിച്ച് സൂചിപ്പിക്കുന്നു. സ്റ്റാൻഡേർഡ് `429`-ന് പകരം ഒരു ചൈനീസ് ബോഡിയോടുകൂടി (`用户额度不足` / `额度不足`) `agentrouter.org` `403` (ചിലപ്പോൾ `400`) തിരികെ നൽകുന്നു. Claude Code പോലുള്ള ക്ലയന്റുകൾ `403`-നെ സ്ഥിരമായ പിശകായി കണക്കാക്കി സെഷൻ അബോർട്ട് ചെയ്യുന്നു; തിരുത്തൽ ഇല്ലെങ്കിൽ ഫോൾബാക്ക് എൻജിൻ അതിനെ ക്വോട്ട ഇവന്റിന് പകരം `AUTH_ERROR` ആയി ക്ലാസിഫൈ ചെയ്യും.

**നടപ്പാക്കൽ:**

- രജിസ്ട്രി + മാച്ചർ: `open-sse/config/upstreamStatusRestatement.ts` — ഓരോ പ്രൊവൈഡർക്കുമുള്ള നിയമങ്ങളുടെ പട്ടിക (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` വഴി മാച്ച് ചെയ്യുന്നു.
- കോൾ സൈറ്റ്: `open-sse/handlers/chatCore.ts`-ലെ `providerFailure:` ബ്ലോക്ക് (ഏകദേശം 3654-ാം വരിയിൽ), ഒരു പിശക് HTTP സ്റ്റാറ്റസുള്ള (`!providerResponse.ok`) അപ്സ്ട്രീം റെസ്പോൺസ് `parseUpstreamError()` പാർസ് ചെയ്തതിന് തൊട്ടുപിന്നാലെയും ഏതെങ്കിലും ക്ലാസിഫിക്കേഷൻ പ്രവർത്തിക്കുന്നതിന് മുമ്പുമായി; അതുവഴി എല്ലാ ഡൗൺസ്ട്രീം ഉപഭോക്താക്കൾക്കും തിരുത്തിയ സ്റ്റാറ്റസ് ലഭിക്കുന്നു. ഒരു `200` SSE സ്ട്രീമിനുള്ളിൽ ഉൾച്ചേർത്ത പിശകുകൾ വേറിട്ട, പിന്നീടുള്ള സ്ട്രീം-പാർസിങ് പാത്താണ് പിന്തുടരുന്നത്; അവ ഇന്ന് ഈ ഹുക്കിന്റെ പരിധിയിൽ **ഉൾപ്പെടുന്നില്ല** — ഇത് അറിയപ്പെടുന്ന ഒരു പരിമിതിയാണ്, എന്നാൽ agentrouter-ന്റെ തെറ്റായ സ്റ്റാറ്റസിന് ഇതുവരെ ഇത് ആവശ്യമില്ല (കാരണം അത് ഒരു പിശക് HTTP സ്റ്റാറ്റസായാണ് പ്രത്യക്ഷപ്പെടുന്നത്).
- റീട്രൈ യോഗ്യത: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`-ൽ ഉൾപ്പെട്ടിരിക്കുന്നു (`open-sse/services/combo/unavailableRetryGate.ts`), അതിനാൽ പുനഃപ്രസ്താവിച്ച ഒരു പിശക് പ്രവർത്തനരഹിതമായ `403` ആയി പ്രത്യക്ഷപ്പെടുന്നതിന് പകരം യഥാർത്ഥ റീട്രൈ വിൻഡോ ഉൾക്കൊള്ളുന്നു.
- സിന്തറ്റിക് `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) എന്നത് പുനഃപ്രസ്താവിച്ച റെസ്പോൺസ് **ക്ലയന്റിനോട്** പറയുന്ന സമയം മാത്രമാണ്; അത് കണക്ഷന്റെ ആന്തരിക cooldown/lockout ദൈർഘ്യമല്ല — പുനഃപ്രസ്താവിച്ച പിശക് യഥാർത്ഥത്തിൽ കൈകാര്യം ചെയ്യുന്ന സംവിധാനം ഏതാണോ അതാണ് അത് വെവ്വേറെ നിയന്ത്രിക്കുന്നത് (Connection Cooldown-ന്റെ ക്രമാനുഗതമായി വർധിക്കുന്ന ബാക്ക്ഓഫ്, §2, API-key പ്രൊവൈഡർമാർക്ക് അടിസ്ഥാനമായി `3s`; അല്ലെങ്കിൽ agentrouter പോലുള്ള per-model-quota പ്രൊവൈഡർമാർക്ക് Model Lockout, §3). ക്ലയന്റിനോട് പരസ്യപ്പെടുത്തുന്ന 60s വിൻഡോയ്ക്ക് മുമ്പുതന്നെ റൗട്ടർ ആന്തരികമായി വീണ്ടും ശ്രമിക്കാൻ യോഗ്യമായേക്കാം — ഇത് മനഃപൂർവമായ ഹെഡ്റൂമാണ്, ബഗ് അല്ല.

സ്ഥിരമായ പിശകുകൾ (agentrouter-ന്റെ `无权访问模型` — ഈ മോഡലിലേക്കുള്ള ആക്സസ് ഇല്ല) ഒരിക്കലും പുനഃപ്രസ്താവിക്കില്ല: `textMarkers` മാച്ച് ചെയ്താലും `excludeMarkers` നിയമം വീറ്റോ ചെയ്യുന്നു, അതിനാൽ പിശക് അതിന്റെ യഥാർത്ഥ സ്റ്റാറ്റസ് നിലനിർത്തുകയും ഒന്നും അതിനെ അനന്തമായി വീണ്ടും ശ്രമിക്കാതിരിക്കുകയും ചെയ്യുന്നു. അനുബന്ധ പ്രൊവൈഡർ ക്ലാസിഫിക്കേഷൻ നിയമം (`open-sse/config/providerErrorRules.ts`-ലെ `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, പ്രഖ്യാപിച്ച `6h` അടിസ്ഥാന cooldown) പൊതുവായ apikey-category `FORBIDDEN` early-return-ന് _മുമ്പ്_ `checkFallbackError` (`open-sse/services/accountFallback.ts`) പരിശോധിക്കുന്നു; ഇത് `honorsRuleLockScope(provider)` മുഖേന ഗേറ്റ് ചെയ്യപ്പെട്ടിരിക്കുന്നു (#10334 — നിലവിൽ `providerErrorRules.ts`-ലെ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` അനുവദനീയ പട്ടിക വഴി agentrouter-ന് മാത്രമായി). നിയമം പ്രഖ്യാപിച്ച 6h cooldown, `fallbackResult.baseCooldownMs` ആയി കൈമാറപ്പെടുന്നു; എന്നാൽ അത് നിലവിലുള്ള per-model-quota lockout പാത്തിലേക്കുതന്നെയാണ് (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, cooldown ഉറവിടം ഒഴികെ #10334 മാറ്റം വരുത്തിയിട്ടില്ല) നൽകപ്പെടുന്നത്: മറ്റെല്ലാ model lockout-കളെയും പോലെ, ഓപ്പറേറ്ററുടെ `mlSettings.maxCooldownMs`-ലേക്ക് (ഡിഫോൾട്ട് `1_800_000ms` / 30min) ഇത് കുറച്ച് പരിധിപ്പെടുത്തപ്പെടുന്നു; കൂടാതെ _സ്ഥിരമായി സൂക്ഷിക്കുന്ന lockout കാരണം_ നിയമത്തിലെ `"auth_error"` അല്ല, മുമ്പേ ഉണ്ടായിരുന്ന ഹാർഡ്കോഡ് ചെയ്ത `"forbidden"` തന്നെയായി തുടരുന്നു — കാരണം സൂചിപ്പിക്കുന്ന സ്ട്രിങ് അല്ല, cooldown ദൈർഘ്യം മാത്രമാണ് തുടക്കംമുതൽ അവസാനംവരെ മാനിക്കപ്പെടുന്നത്. കണക്ഷൻ തന്നെ സജീവമായി തുടരുന്നു; അതേ കണക്ഷനിലുള്ള സമാന്തര മോഡലുകളെ ഇത് ബാധിക്കില്ല.

പുനർവ്യാഖ്യാനിച്ച ക്വോട്ട പിശകുകൾ (`额度不足`) പ്രൊഡക്ഷനിൽ ഒരു പ്രൊവൈഡർ റൂളിലേക്ക് എത്തുന്നു
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, സ്വന്തമായി പ്രഖ്യാപിച്ച cooldown ഇല്ല — persistence ലെയറിന്റെ
scaled backoff ഡിഫോൾട്ട് ബാധകമാകുന്നു). #10334 മുതൽ,
`ProviderErrorRuleMatch`-ലെ `scope` end-to-end ആയി ഉപയോഗിക്കപ്പെടുന്നു, എന്നാൽ
**`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ലുള്ള പ്രൊവൈഡറുകൾക്ക് മാത്രം**
(`providerErrorRules.ts` — നിലവിൽ `"agentrouter"` മാത്രം,
`honorsRuleLockScope()` വഴി നിയന്ത്രിച്ചിരിക്കുന്നു). മറ്റെല്ലാ
പ്രൊവൈഡറുകൾക്കും `scope`, #10334-ന് മുമ്പുണ്ടായിരുന്നതുപോലെ തന്നെ, വിവരസൂചകം
മാത്രമായി തുടരുന്നു. `checkFallbackError`, പൊരുത്തപ്പെട്ട റൂളിന്റെ scope
`fallbackResult.ruleScope` ആയി പുറത്തുകൊണ്ടുവരുന്നു;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) എന്ന പങ്കിട്ട guard, ഒരു `ruleScope`-നെ
connection-wide ആയതും സ്വയം വീണ്ടെടുക്കുന്നതുമായ signal ആയി മാനിക്കുന്നത്
യഥാർത്ഥത്തിൽ സുരക്ഷിതമാണെന്ന് സ്ഥിരീകരിക്കുന്നു (scope `"connection"`,
reason `quota_exhausted`, ഒരിക്കലും `permanent` അല്ല, ഒരിക്കലും
`creditsExhausted` അല്ല — ഭാവിയിലെ ഒരു റൂൾ scope `"connection"`-നെ സ്ഥിരമായ
account state-നൊപ്പം ജോടിയാക്കുന്നതിനെതിരായ പ്രതിരോധം). രണ്ട് consumers ഇത്
വിളിക്കുന്നു:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider-ന്റെ **per-model** lockout branch-ലേക്ക് വീഴുന്നതിനുപകരം
  (agentrouter-ന് `passthroughModels: true` ആണ് → `hasPerModelQuota()`
  `true` തിരികെ നൽകുന്നു), ഇത് ഒരു **താൽക്കാലിക connection cooldown**
  പ്രയോഗിക്കുന്നു — `testStatus: "unavailable"` + `rateLimitedUntil`, ഒരിക്കലും
  terminal status (`credits_exhausted`/`banned`/`expired`) അല്ല — അതിനാൽ
  cooldown കാലാവധി കഴിഞ്ഞാൽ manual credential reset ആവശ്യപ്പെടാതെ connection
  സ്വയം വീണ്ടെടുക്കുന്നു. `disableCooling: true` ഉള്ള connections-ക്ക് ഇത്
  ഒഴിവാക്കുന്നു (#2997): പകരം ആ opt-out per-model lockout-ലേക്ക് കടക്കുന്നു
  (രേഖപ്പെടുത്തിയിട്ടുള്ള ഒരു trade-off — branch-ന് മുകളിലുള്ള code comment
  കാണുക).
- **അതേ-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): അതേ guard connection-നെ
  `${provider}:${connectionId}` എന്ന key ഉപയോഗിച്ച് in-memory
  `exhaustedConnections` set-ൽ അടയാളപ്പെടുത്തുന്നു. സ്വന്തം target object-ൽ
  _അതേ കൃത്യമായ `connectionId` ഇതിനകം ഉൾക്കൊള്ളുന്ന_ ശേഷിക്കുന്ന SAME-REQUEST
  target മാത്രമേ ഇത് ഒഴിവാക്കൂ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` എന്നത് `exhaustedConnections` lookup-ന് മുമ്പ്) — sibling
  targets-ന് സ്വന്തമായി pinned `connectionId` ഇല്ലാത്തതും response-ന്റെ
  `X-OmniRoute-Selected-Connection-Id` header-ൽ നിന്ന് ഓരോ dispatch-ലും
  ഒന്ന് resolve ചെയ്യപ്പെടുന്നതുമായ ഒരു സാധാരണ model-list combo ഒരിക്കലും ആ
  key match-ൽ എത്തില്ല. ആ സാധാരണ സാഹചര്യത്തിൽ, ശേഷിക്കുന്ന ഒരു leg ഇപ്പോൾ
  exhausted ആയ account വീണ്ടും ഉപയോഗിക്കുന്നതിനെതിരായ യഥാർത്ഥ സംരക്ഷണം ഈ
  Set അല്ല — മുകളിലുള്ള persistence ലെയറും (connection-ന്റെ
  `rateLimitedUntil` ഇപ്പോൾ ഭാവിയിലാണ്) failure-നായി
  `transientRateLimitedProviders` suppress ചെയ്യുന്ന ഇതേ guard-ഉം ചേർന്നതാണ്
  (താഴെയുള്ള "Two-stage design" എന്നതും `targetExhaustion.ts`-ലെ
  `isAgentrouterConnectionQuotaScope` branch-ിലുള്ള code comment-ഉം കാണുക):
  ആ Set അടയാളപ്പെടുത്താതെ വിടുമ്പോൾ, provider-ന്റെ ശേഷിക്കുന്ന legs-നായി
  `combo.ts`-ന്റെ `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) സജീവമാകില്ല; അതിനാൽ
  credential selection-ന്റെ `rateLimitedUntil` filter
  (`src/sse/services/auth.ts:1238`) സാധാരണ രീതിയിൽ മാനിക്കപ്പെടുകയും
  ശേഷിക്കുന്ന ഒരു leg ഒന്നുകിൽ വ്യത്യസ്തവും ഇപ്പോഴും eligible-ഉമായ
  agentrouter connection തിരഞ്ഞെടുക്കുകയോ, അല്ലെങ്കിൽ credentials ലഭ്യമല്ലെന്ന്
  പറഞ്ഞ് പരാജയപ്പെടുകയോ ചെയ്യും — ഈ branch ഇപ്പോൾ cooldown ചെയ്ത connection-ലേക്ക്
  അത് നിർബന്ധിച്ച് വീണ്ടും പ്രവേശിക്കില്ല.

### രണ്ട്-ഘട്ട രൂപകൽപ്പന: status പുനർവ്യാഖ്യാനം, തുടർന്ന് classification

Status പുനർവ്യാഖ്യാനവും (`upstreamStatusRestatement.ts`) provider
classification റൂളുകളും (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) provider id-യും text markers-ഉം അടിസ്ഥാനമാക്കിയുള്ള
വ്യത്യസ്ത registries ആണ്, എന്നാൽ അവ വ്യത്യസ്ത സ്ഥലങ്ങളിൽ പ്രവർത്തിക്കുകയും
വ്യത്യസ്ത ആവശ്യങ്ങൾ നിറവേറ്റുകയും ചെയ്യുന്നു: restatement `chatCore.ts`-ൽ
HTTP status നേരത്തേ rewrite ചെയ്യുന്നു; classification റൂളുകൾ
`checkFallbackError()`-നുള്ളിൽ (`open-sse/services/accountFallback.ts`)
fallback `reason`-ഉം lock `scope`-ഉം
(`model` / `provider` / `connection`) തിരഞ്ഞെടുക്കുന്നു.

`providerErrorRules.ts`-ലെ `FULL_TEXT_RULE_PROVIDERS` allowlist-ൽ ഉൾപ്പെട്ട
പ്രൊവൈഡറുകൾക്ക് മാത്രമാണ് classification റൂളുകൾക്ക് പൂർണ്ണ error **text**
(`额度不足` പോലുള്ള body markers പൊരുത്തപ്പെടുത്താൻ ഇത് ആവശ്യമാണ്) കാണാൻ
കഴിയുന്നത് — നിലവിൽ `"agentrouter"` മാത്രം. മറ്റെല്ലാ **built-in catalog**
പ്രൊവൈഡറുകൾക്കും `checkFallbackError`, `getProviderErrorRuleMatch`-ന്
structured error (`{code, type}`) മാത്രം കൈമാറുന്നു; ഇത്
header/status/code-അധിഷ്ഠിത റൂളുകൾക്ക് മതിയെങ്കിലും body-text markers കാണാൻ
കഴിയില്ല. `resolveRuleMatchBody()` helper ആണ് ഈ തിരഞ്ഞെടുപ്പ് നടത്തുന്നത്:
allowlist-ലുള്ള പ്രൊവൈഡറുകൾക്ക് പൂർണ്ണ error text, അല്ലാത്തവർക്ക് structured
error. ഒരു **built-in** provider-നെ `FULL_TEXT_RULE_PROVIDERS`-ലേക്ക് ചേർക്കുന്നത്
വ്യക്തമായ per-provider opt-in ആണ് — list-ൽ ഇല്ലാത്ത എല്ലാ പ്രൊവൈഡറുകൾക്കുമുള്ള
ഡിഫോൾട്ട് path byte-for-byte മാറ്റമില്ലാതെ തുടരാനാണ് ഇത് നിലവിലുള്ളത്.

ഒരു റൂളിന്റെ `scope` (`model` / `provider` / `connection`) എന്നത്
`FULL_TEXT_RULE_PROVIDERS`-ൽ നിന്ന് വേറിട്ട opt-in ആണ്: `checkFallbackError`
അതിനെ `fallbackResult.ruleScope` ആയി മാത്രമേ പുറത്തുകൊണ്ടുവരൂ; അതേ ഫയലിലെ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ലുള്ള പ്രൊവൈഡറുകൾക്ക് മാത്രമാണ്
downstream consumers അതിനെ വിവരസൂചക label എന്നതിലുപരി മറ്റെന്തെങ്കിലും ആയി
മാനിക്കുന്നത് (`honorsRuleLockScope()` വഴി നിയന്ത്രിച്ചിരിക്കുന്നു — നിലവിൽ
`"agentrouter"` മാത്രം). ഒരു provider ആ allowlist-ൽ ഉൾപ്പെട്ടുകഴിഞ്ഞാൽ
`scope: "connection"` match യഥാർത്ഥത്തിൽ എന്താണ് ചെയ്യുന്നതെന്ന് അറിയാൻ
മുകളിലുള്ള "Restated quota errors" കാണുക.

**#11104 — ഓപ്പറേറ്റർ പ്രഖ്യാപിച്ച നിയമങ്ങൾ രണ്ട് allowlist-ുകളെയും മറികടക്കുന്നു.** ഒരു ഓപ്പറേറ്റർക്ക്
ഈ ഫയൽ എഡിറ്റ് ചെയ്യാതെ തന്നെ `settings.providerErrorRules` വഴി runtime-ൽ
ഓരോ provider-നും പ്രത്യേകം ഒരു നിയമം പ്രഖ്യാപിക്കാം
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`).
Built-in catalog നിയമങ്ങളുടെ **default** പെരുമാറ്റം സംരക്ഷിക്കാൻ ഉദ്ദേശിച്ചിട്ടുള്ള
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ുകൾക്ക്
പിന്നിൽ ഒരു ഓപ്പറേറ്റർ നിയമത്തെ gate ചെയ്യുന്നത്, ഇതിനകം അവിടെ ലിസ്റ്റ് ചെയ്തിട്ടുള്ള
provider-കൾ ഒഴികെയുള്ള എല്ലാറ്റിനും settings സംവിധാനം പ്രവർത്തനരഹിതമാക്കും;
കാരണം നിയമം പ്രഖ്യാപിക്കുന്നത് തന്നെ ഓപ്പറേറ്ററുടെ വ്യക്തമായ opt-in ആണ്.
`resolveRuleMatchBody()`-യും `honorsRuleLockScope()`-യും ആദ്യം
`hasOperatorRuleForProvider()` പരിശോധിക്കുന്നു: ഒരു ഓപ്പറേറ്റർ നിയമമുള്ള provider-ന്
raw error text ലഭിക്കുകയും, ഏതെങ്കിലും allowlist-ൽ അതും ഉൾപ്പെട്ടിട്ടുണ്ടോ എന്നത്
പരിഗണിക്കാതെ, അതിൽ പ്രഖ്യാപിച്ച `scope` മാനിക്കപ്പെടുകയും ചെയ്യും.

**അറിയപ്പെടുന്ന വിടവ് — HTTP 400-നായി `providerRuleRegistry` ഒരിക്കലും പരിശോധിക്കപ്പെടുന്നില്ല.**
`checkFallbackError`-ലെ `BAD_REQUEST` branch, status 400-നെ പൂർണ്ണമായും
സ്വന്തം pattern array-ുകൾ വഴിയാണ് classify ചെയ്യുന്നത്
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` തുടങ്ങിയവ
`accountFallback.ts`-ൽ), കൂടാതെ അതിന് മുകളിലുള്ള
`configuredRule`/`getProviderErrorRuleMatch` branch-ൽ എത്തുന്നതിന് മുമ്പ് return
ചെയ്യുന്നു. `status: 400` ഉള്ള ഒരു built-in catalog നിയമം (അല്ലെങ്കിൽ ഓപ്പറേറ്റർ നിയമം)
syntax അനുസരിച്ച് സാധുവാണ്, എന്നാൽ അത് ഒരിക്കലും പ്രവർത്തിക്കില്ല. നിലവിൽ ഒരു നിയമവും
400-നെ ലക്ഷ്യമിടുന്നില്ല, അതിനാൽ production-ൽ ഒന്നിനെയും ഇത് ബാധിക്കുന്നില്ല —
എന്നാൽ ഭാവിയിലെ ഒരു 400 നിയമത്തിന് ആദ്യം ഈ branch മാറ്റേണ്ടിവരും. ഇത് ഒരു നിയമം
ചേർക്കുന്നതിനെക്കാൾ വലിയ മാറ്റമാണ് (pattern-array പെരുമാറ്റത്തെ ഇതിനകം ആശ്രയിക്കുന്ന
എല്ലാ provider-കൾക്കുമായി ഇത് 400-നെ വീണ്ടും classify ചെയ്യും), അതിനാൽ
ഒറ്റ-provider നിയമം ചേർക്കുന്നതിന്റെ scope-ിന് പുറത്താണ്.

### quota തെറ്റായി പ്രസ്താവിക്കുന്ന പുതിയ gateway ചേർക്കൽ

1. `statusRestatementRegistry`-ൽ ഒരു rule array രജിസ്റ്റർ ചെയ്യുക
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   provider-specific ആയി നിലനിർത്തുക; `CREDITS_EXHAUSTED_SIGNALS`-മായി
   കൂട്ടിയിടിക്കുന്ന പൊതുവായ English phrase-ുകൾ ഒരിക്കലും വീണ്ടും ഉപയോഗിക്കരുത്
   (`open-sse/services/accountFallback.ts`).
2. ശരിയായ lock scope തിരഞ്ഞെടുക്കുന്നതിന് (`connection` എന്നത് account-wide
   quota-യ്ക്കും, `model` എന്നത് per-model error-ുകൾക്കും) ഐച്ഛികമായി
   `open-sse/config/providerErrorRules.ts`-ൽ (`providerRuleRegistry`)
   classification നിയമങ്ങൾ രജിസ്റ്റർ ചെയ്യുക. full error text (body marker-ുകൾ)
   ആവശ്യമായ നിയമങ്ങളുള്ള provider-കൾക്കായി മാത്രമേ ഈ ഘട്ടം production-ൽ
   പ്രാബല്യത്തിൽ വരൂ: അതേ ഫയലിലെ `FULL_TEXT_RULE_PROVIDERS`-ലേക്ക് provider id
   ചേർക്കുക — അല്ലാത്തപക്ഷം `checkFallbackError`, structured ആയ
   `{code, type}` error മാത്രമേ നിയമത്തിന് കൈമാറുകയുള്ളൂ; body-text നിയമം live
   traffic-ുമായി ഒരിക്കലും match ചെയ്യില്ല. Opencode-ന്റെയോ Minimax-ന്റെയോ
   നിയമങ്ങൾ പോലെ, `status`/`headers` മാത്രം അടിസ്ഥാനമാക്കി match ചെയ്യുന്ന
   നിയമങ്ങൾക്ക് ഈ opt-in ആവശ്യമില്ല. ഇതിൽ നിന്ന് വേറെയായി, നിയമം
   `scope: "connection"` പ്രഖ്യാപിക്കുകയും, ഉദ്ദേശ്യം ഒരു വിവരദായക label മാത്രമല്ലാതെ
   യഥാർത്ഥ connection-wide cooldown-ഉം same-request combo skip-ഉം ആണെങ്കിൽ,
   അതേ ഫയലിലെ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ലേക്ക് provider id ചേർക്കുക —
   `markAccountUnavailable()`-ലും (`src/sse/services/auth.ts`)
   `applyComboTargetExhaustion()`-ലും
   (`open-sse/services/combo/targetExhaustion.ts`) ഉള്ള
   `isAgentrouterConnectionQuotaScope()`-ശൈലിയിലുള്ള consumption-നെ gate ചെയ്യുന്നത്
   ഇതാണ്; ഇത് ഇല്ലെങ്കിൽ `scope`, `fallbackResult.ruleScope` വഴി തുടർന്നും
   ഒഴുകുമെങ്കിലും അതിന്റെ അടിസ്ഥാനത്തിൽ ഒന്നും പ്രവർത്തിക്കില്ല.
3. `tests/unit/upstream-status-restatement.test.ts`,
   `tests/unit/agentrouter-error-rules.test.ts` എന്നിവയെ മാതൃകയാക്കി unit test-ുകൾ
   ചേർക്കുക (not-permanent / not-creditsExhausted guard-ുകൾ ഉൾപ്പെടെ; കൂടാതെ —
   provider-ന് allowlist ആവശ്യമുണ്ടെങ്കിൽ — ആ provider-നായി മാത്രം
   `resolveRuleMatchBody()` full text return ചെയ്യുന്നു എന്ന് ഉറപ്പാക്കുന്ന ഒരു
   test-ും ചേർക്കുക).

`chatCore.ts`, `classifyError`, അല്ലെങ്കിൽ combo എന്നിവയിൽ മാറ്റങ്ങളൊന്നും ആവശ്യമില്ല.

#### Egress അടിസ്ഥാനത്തിൽ bucket ചെയ്ത lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-ലുള്ള provider-കളെ (opencode family),
IP-bucketed upstream ആയി കണക്കാക്കുന്നു (opencode free tier account-bucketed അല്ല,
IP-bucketed ആണ് — #9611 കാണുക): `quota_exhausted` **അല്ലെങ്കിൽ**
`rate_limit_exceeded` ആയി classify ചെയ്ത status-429, rotation അവയെ പരീക്ഷിക്കുന്നതിന്
മുമ്പ്, പരാജയപ്പെട്ട connection-ന്റെ അവസാനമായി അറിയപ്പെട്ട egress IP-യുമായി
പൊരുത്തപ്പെടുന്ന എല്ലാ allowlisted-family connection-കളെയും cool down ചെയ്യുന്നു
— ഇതിലൂടെ ഉറപ്പായും പരാജയപ്പെടുന്ന N-1 upstream call-ുകൾ ഒഴിവാക്കുന്നു
(#10460/#10525-ന്റെ അതേ രൂപം). `rate_limit_exceeded` മനഃപൂർവം ഉൾപ്പെടുത്തിയതാണ്:
`markAccountUnavailable` path-ൽ opencode-specific നിയമങ്ങൾ ഒരിക്കലും match
ചെയ്യുന്നില്ല (`checkFallbackError`-ന് headers/body കൈമാറുന്നില്ല, കൂടാതെ opencode
`FULL_TEXT_RULE_PROVIDERS`-ൽ ഇല്ല), അതിനാൽ body-യിൽ subscription-quota text
("monthly usage limit reached") ഉള്ള ഒരു 429, `status_429` നിയമത്തിലേക്ക് എത്തുന്നതിന്
മുമ്പ് quota-text fallback (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1h cooldown) വഴി `quota_exhausted` ആയി classify
ചെയ്യപ്പെടുന്നു — അതേസമയം quota text ഇല്ലാത്ത ഒരു 429 (സാധാരണ rate limiting),
`status_429` നിയമം വഴി `rate_limit_exceeded` ആയി classify ചെയ്യപ്പെടുകയും
തുടർന്നും IP family-യെ cool down ചെയ്യുകയും ചെയ്യുന്നു. allowlisted provider-ന്
IP-bucketed rate limit എന്നത് exhausted quota-യുടെ അതേ signal ആണ്. യഥാർത്ഥ
പരിധികൾ:

- **പരമാവധി ശ്രമം**: ലോക്ക്, `proxy_logs`-ൽ നിന്ന് കണക്ഷന്റെ അവസാനം അറിയപ്പെട്ട
  `egress_ip` കണ്ടെത്തുന്നു (24h വിൻഡോ, synchronous, cache ഇല്ല). Cold cache (egress
  IP ഒരിക്കലും probe ചെയ്തിട്ടില്ല) അല്ലെങ്കിൽ row ഇല്ല → പരാജയപ്പെടുന്ന കണക്ഷൻ branch വഴി
  തുടർന്നും cooldown ചെയ്യപ്പെടും (ഇന്നത്തേതുപോലെ രേഖപ്പെടുത്തും), എന്നാൽ sibling ഒന്നും ലോക്ക് ചെയ്യപ്പെടില്ല.
- **ഒരിക്കലും terminal അല്ല**: cooldown എന്നത് പുതുക്കപ്പെടുന്ന quota window ആണ്
  (`testStatus: "unavailable"`); IP-level signal-ൽ നിന്ന് permanent state ഒരിക്കലും
  നിർണ്ണയിക്കില്ല. `disableCooling` കണക്ഷനുകൾ branch പൂർണ്ണമായും ഒഴിവാക്കുന്നു.
- **Allowlist ചെയ്ത family-ക്കുള്ള lock granularity മാറുന്നു**: ഇത് ഒരു scope
  മാറ്റമാണ്, sibling optimization മാത്രമല്ല. opencode ഒരു `passthroughModels`
  provider ആണ്, അതിനാൽ ഈ branch-ന് മുമ്പ് ഒരു 429 ഓരോ MODEL-നുമുള്ള lockout സൃഷ്ടിച്ചിരുന്നു; ഇപ്പോൾ അത്
  ഒരു connection cooldown സൃഷ്ടിക്കുന്നു — sibling ഒന്നുപോലും ഇല്ലാതെ ഒരൊറ്റ
  connection പ്രവർത്തിപ്പിക്കുന്ന operator-ക്കും ഇത് ബാധകമാണ്. opencode rule
  table ഇതിനകം ശരിയെന്ന് പ്രഖ്യാപിച്ചിട്ടുള്ള granularity അതാണ് (`scope: "connection"`,
  `providerErrorRules.ts`), എന്നാൽ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ൽ ഇല്ലാത്തതിനാൽ ഇതുവരെ അത് പാലിക്കപ്പെട്ടിട്ടില്ല. connection-scoped
  agentrouter branch-നെ അനുകരിച്ച്, പരാജയപ്പെടുന്ന connection-ന്റെ
  cooldown + `backoffLevel` ഈ branch തന്നെ എഴുതുകയും return ചെയ്യുകയും ചെയ്യുന്നു — ഓരോ model-നുമുള്ള block-ലേക്കോ
  താഴെയുള്ള generic path-ലേക്കോ ഒരിക്കലും എത്തില്ല.
- **Combo ഉൾപ്പെടുത്തിയിരിക്കുന്നു**: agentrouter branch പോലെ, combo caller
  ഒരു 429-ന് ബാധകമാക്കുന്ന `persistUnavailableState`/`isCombo` downgrade-നെ scope മനഃപൂർവം
  അവഗണിക്കുന്നു. ഓരോ model-നുമുള്ള lockout ഈ scope-ന്റെ ദുർബലമായൊരു രൂപമല്ല,
  അത് തെറ്റായ unit ആണ്: exhausted IP-യെക്കുറിച്ച് അത് ഒന്നും പറയുന്നില്ല, അതിനാൽ combo
  rotation ഓരോ sibling-നും ഉറപ്പായും പരാജയപ്പെടുന്ന ഓരോ call വീതം തുടർന്നും പാഴാക്കും.
- **Sibling സുരക്ഷ**: ഇതിനകം terminal ആയ (banned/credits_exhausted)
  അല്ലെങ്കിൽ ഇതിനകം കൂടുതൽ ദൈർഘ്യമുള്ള cooldown-ലുള്ള sibling ഒരിക്കലും overwrite ചെയ്യപ്പെടില്ല.
- **Exclusive allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` വിപുലീകരിക്കുന്നത്
  വ്യക്തമായ owner തീരുമാനമാണ്; generic wiring ഇല്ല (pattern #10334/#10419).
  Sibling query, അതേ allowlist-നെ SQL
  literal ആയി ആവർത്തിക്കുന്നതിന് പകരം bind ചെയ്യുന്നു, അതിനാൽ അത് വിപുലീകരിക്കുന്നത് one-line change ആയി തുടരും.
- **രണ്ട് ദിശകളിലുമുള്ള Egress IP rotation**: lookup window (24h),
  egress-IP cache TTL-നേക്കാൾ (5 min) വളരെ വലുതാണ്, അതിനാൽ "last known IP" എന്നത് history ആണ്,
  current state അല്ല. വിൻഡോയ്ക്കുള്ളിൽ ഒരു connection-ന്റെ proxy rotate ചെയ്തിട്ടുണ്ടെങ്കിൽ,
  യഥാർത്ഥത്തിൽ പങ്കിടുന്ന IP-യെ lock **നഷ്ടപ്പെടുത്തിയേക്കാം** (രേഖപ്പെടുത്തിയ IP പുതിയതും,
  exhausted അല്ലാത്തതുമാണ്) — അതുപോലെ, exhausted IP-യിൽ നിന്ന് പിന്നീട്
  rotate ചെയ്ത് മാറിയ sibling-നെ ഇത് **cooldown ചെയ്തേക്കാം**. രണ്ടാമത്തെ സാഹചര്യത്തിൽ ആ sibling-ന് ഒരു
  cooldown window നഷ്ടമാകും; history-based lookup-ന്റെ അംഗീകരിച്ച best-effort
  പരിമിതികളാണ് ഇവ രണ്ടും.
- **ചെലവ്**: `proxy_logs`-ന്റെ രണ്ട് bounded scan-കൾ (`idx_pl_timestamp` വഴി
  window-filtered), 429 ഉണ്ടാകുന്ന ആവൃത്തിയിൽ മാത്രം. പുതിയ index ഇല്ല (migration 134
  YAGNI). മിതമായ വലുപ്പമുള്ള real-traffic DB copy-യിൽ അളന്നത്; ഒരു
  high-throughput instance അതേ window-ൽ ആനുപാതികമായി കൂടുതൽ row-കൾ സൂക്ഷിക്കും.

---

## മറ്റ് പ്രതിരോധശേഷി സവിശേഷതകൾ

- **19 റൂട്ടിംഗ് തന്ത്രങ്ങൾ** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) കാണുക.
- **റീസെറ്റ്-അവബോധമുള്ള റൂട്ടിംഗ്** (v3.8.0) — ക്വോട്ട റീസെറ്റ് സമയത്തിന്റെ അടിസ്ഥാനത്തിൽ കണക്ഷനുകൾക്ക് മുൻഗണന നൽകുന്നു.
- **പശ്ചാത്തല മോഡിന്റെ നിലവാരത്തകർച്ച** — Responses API `background: true`, മുന്നറിയിപ്പോടെ സമന്വയ മോഡിലേക്ക് താഴ്ത്തപ്പെടുന്നു.
- **ഡൈനാമിക് ടൂൾ പരിധി കണ്ടെത്തൽ** — ടൂളുകളുടെ എണ്ണപരിധി എത്തിയാൽ പ്രൊവൈഡറുകളിൽ നിന്ന് പിൻവാങ്ങുന്നു.
- **അടിയന്തര ഫാൾബാക്ക്** — `OMNIROUTE_EMERGENCY_FALLBACK` നിയന്ത്രിക്കുന്നു; പുനരാരംഭിക്കാതെ തന്നെ Feature Flags പേജിൽ നിന്ന് ഓപ്പറേറ്റർമാർക്ക് ഇത് അസാധുവാക്കാനാകും.

---

## ഡീബഗ്ഗിംഗ്

- വെയ്റ്റഡ് കോംബോ `503 all_targets_cooling_down` എന്ന് മറുപടി നൽകുന്നു (`Retry-After` സജ്ജീകരിച്ചിരിക്കുന്നു, കൂടാതെ `diagnostics.excluded` എല്ലാ ടാർഗറ്റുകളെയും `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` എന്നിങ്ങനെ പട്ടികപ്പെടുത്തുന്നു) → പൂൾ കോൺഫിഗർ ചെയ്ത് കണക്റ്റ് ചെയ്തിട്ടുണ്ട്; ഓരോ ടാർഗറ്റും ഒരു റെസിലിയൻസ് ടൈമർ കാരണം ഒഴിവാക്കപ്പെട്ടിരിക്കുകയാണ്; `[COMBO] Weighted selection: every target excluded before dispatch — …` മുന്നറിയിപ്പ് കാരണങ്ങളും ശേഷിക്കുന്ന സെക്കൻഡുകളും വ്യക്തമാക്കുന്നു. അതേ കോംബോയിൽ നിന്നുള്ള `404 no_executable_targets` എന്നത് ഒരു റെസിലിയൻസ് ടൈമറും ഉൾപ്പെട്ടിരുന്നില്ലെന്ന് അർത്ഥമാക്കുന്നു (പ്രവർത്തിപ്പിക്കാൻ ഒന്നുമില്ല, അല്ലെങ്കിൽ ഓരോ അക്കൗണ്ടും ലഭ്യതാ പരിശോധനയിൽ പരാജയപ്പെട്ടു). `targetResolution.ts`-ൽ ശേഖരിച്ച ഒഴിവാക്കലുകളിൽ നിന്ന് `open-sse/services/combo/pinRecovery.ts`-ൽ നിർമ്മിച്ചിരിക്കുന്നു.
- ഒരു പ്രൊവൈഡറിനുള്ള എല്ലാ കീകളും ഒഴിവാക്കപ്പെടുന്നു → സർക്യൂട്ട് ബ്രേക്കറിന്റെ നിലയും ഓരോ കണക്ഷന്റെയും `rateLimitedUntil`/`testStatus`-ഉം പരിശോധിക്കുക.
- റീസെറ്റ് വിൻഡോയ്ക്കുശേഷവും പ്രൊവൈഡർ സ്ഥിരമായി ഒഴിവാക്കപ്പെടുന്നു → കോഡ് `getStatus()`/`canExecute()` എന്നതിന് പകരം റോ `state` വായിക്കുന്നു.
- ഒരു കീ പരാജയപ്പെടുന്നു, മറ്റുള്ളവ പ്രവർത്തിക്കണം → സർക്യൂട്ട് ബ്രേക്കറിനേക്കാൾ കണക്ഷൻ കൂൾഡൗണിന് മുൻഗണന നൽകുക.
- ഒരു മോഡൽ മാത്രം പരാജയപ്പെടുന്നു → കണക്ഷൻ കൂൾഡൗണിനേക്കാൾ മോഡൽ ലോക്കൗട്ടിന് മുൻഗണന നൽകുക.
- സ്റ്റേറ്റ് സ്വയം വീണ്ടെടുക്കേണ്ടതാണെങ്കിലും അങ്ങനെ സംഭവിക്കുന്നില്ല → ഭാവിയിലെ ടൈംസ്റ്റാമ്പും കാലഹരണപ്പെട്ട സ്റ്റേറ്റ് പുതുക്കുന്ന റീഡ് പാത്തും പരിശോധിക്കുക. സ്ഥിരമായ സ്റ്റാറ്റസുകൾക്ക് മാനുവൽ മാറ്റങ്ങൾ ആവശ്യമാണ്.

---

## TLS ഫിംഗർപ്രിന്റിംഗും സ്റ്റെൽത്തും

പ്രൊവൈഡർ-നിർദ്ദിഷ്ട സ്റ്റെൽത്ത് (JA3/JA4, CCH, ഒബ്ഫസ്കേഷൻ) പ്രത്യേകം രേഖപ്പെടുത്തിയിരിക്കുന്നു — `docs/security/STEALTH_GUIDE.md` കാണുക (git; `/docs`-ലേക്ക് കംപൈൽ ചെയ്തിട്ടില്ല).

---

## പ്രതിരോധശേഷി പരിശോധന (ഘട്ടം 8 · ബ്ലോക്ക് C)

പ്രതിരോധശേഷി ലോജിക്കിനായുള്ള യൂണിറ്റ് ടെസ്റ്റുകൾക്കപ്പുറം, യഥാർഥ സമ്മർദ/പരാജയ സാഹചര്യങ്ങളിൽ
മൂന്ന് ടെസ്റ്റുകൾ റൺടൈമിനെ പരിശോധിക്കുന്നു (എല്ലാം ഇന്റഗ്രേഷൻ/നൈറ്റ്ലി — ഒന്നും PR-കൾ തടയുന്നില്ല):

| ടെസ്റ്റ്      | പരിശോധിക്കുന്നത്                                                                                                                                                                                                                                       | പ്രവർത്തിപ്പിക്കൽ                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| കെയോസ്        | ഫേക്ക്-അപ്സ്ട്രീം നോഡ് യഥാർഥ ലേറ്റൻസി/റീസെറ്റ്/ടൈംഔട്ട്/503 ഇൻജക്റ്റ് ചെയ്യുന്നു; സർക്യൂട്ട് ബ്രേക്കർ തുറക്കുകയും പുനഃസ്ഥാപിക്കപ്പെടുകയും ചെയ്യുന്നതും `checkFallbackError`, 503-നെ വീണ്ടെടുക്കാവുന്ന ഫാൾബാക്കായി വർഗ്ഗീകരിക്കുന്നതും സാധൂകരിക്കുന്നു. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| ഹീപ്പ് വളർച്ച | `--expose-gc`-ന് കീഴിൽ ഓരോ `createSSEStream`-നും ~500 സ്ട്രീമുകൾ; പരിധിക്കപ്പുറം ഹീപ്പ് വളർന്നാൽ പരാജയപ്പെടുന്നു (OOM ഗാർഡ് #3069).                                                                                                                    | `npm run test:heap`                       |
| k6 സോക്ക്     | `/api/monitoring/health`-നെതിരായ തുടർച്ചയായ ലോഡ്; p95/പിശക് ത്രെഷോൾഡുകൾ.                                                                                                                                                                               | `k6 run tests/load/k6-soak.js` (നൈറ്റ്ലി) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) ആണ് ഇത് ഓർക്കസ്ട്രേറ്റ് ചെയ്യുന്നത്. ഡിഫോൾട്ട്
`test:integration`-ൽ, കെയോസ്, ഹീപ്പ് ടെസ്റ്റുകൾ സ്വയം ഒഴിവാക്കപ്പെടുന്നു (`RUN_CHAOS_INT`/`--expose-gc` ഇല്ലാതെ).

---

## ഇതും കാണുക

- [ആർക്കിടെക്ചർ ഗൈഡ്](./ARCHITECTURE.md) — സിസ്റ്റം ആർക്കിടെക്ചറും ആന്തരിക ഘടകങ്ങളും
- [ഉപയോക്തൃ ഗൈഡ്](../guides/USER_GUIDE.md) — പ്രൊവൈഡറുകൾ, കോംബോകൾ, CLI സംയോജനം
- [ഓട്ടോ-കോംബോ എഞ്ചിൻ](../routing/AUTO-COMBO.md) — 16-ഘടക സ്കോറിംഗ്, മോഡ് പാക്കുകൾ
