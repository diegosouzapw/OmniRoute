# Resilience Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute għandu tliet mekkaniżmi distinti iżda relatati ta’ reżiljenza. Kull wieħed għandu ambitu u skop differenti. Żommhom separati meta tkun qed tiddibaggja l-imġiba tar-routing.

![Mudell ta’ reżiljenza bi 3 saffi](../diagrams/exported/resilience-3layers.svg)

> Sors: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker tal-Fornitur

**Ambitu:** il-fornitur kollu (eż., `glm`, `openai`, `anthropic`).

**Skop:** iwaqqaf it-traffiku milli jintbagħat lil fornitur li qed ifalli ripetutament fil-livell upstream/tas-servizz.

**Implimentazzjoni:**

- Klassi ewlenija: `src/shared/utils/circuitBreaker.ts`
- Konnessjoni: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API tal-istatus: `GET /api/monitoring/health`
- API tar-reset: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabella tad-DB: `domain_circuit_breakers`

**Stati:**

- `CLOSED` — traffiku normali permess
- `DEGRADED` — it-traffiku għadu permess, iżda qed jiġu ssorveljati aktar fallimenti tal-fornitur
- `OPEN` — il-fornitur huwa temporanjament imblukkat; il-combo routing jaqbżu
- `HALF_OPEN` — għadda l-ħin ta’ stennija tar-reset; talba ta’ prova hija permessa

**Valuri predefiniti konfigurabbli (`open-sse/config/constants.ts`, esposti f’Dashboard → Settings → Resilience):**

| Klassi      | Degradat wara | Jinfetaħ wara   | Ħin ta’ stennija tar-reset |
| ----------- | ------------- | --------------- | -------------------------- |
| OAuth       | 5 fallimenti  | 8 fallimenti    | 60s                        |
| Ċavetta API | 7 fallimenti  | 12-il falliment | 30s                        |
| Lokali      | derivat       | 2 fallimenti    | 15s                        |

`degradationThreshold` jikkontrolla meta fornitur jidħol fl-istat `DEGRADED`; `failureThreshold` jikkontrolla meta jinfetaħ u jinqabeż. Il-profili tal-fornituri lokali għadhom mhumiex esposti fil-paġna tas-settings tar-Reżiljenza.

**Kodiċijiet li jattivawh:** l-istatuses fil-livell tal-fornitur `[408, 500, 502, 503, 504]` biss. Tattivahx għal żbalji fil-livell tal-kont (il-biċċa l-kbira tal-401/403/429 — dawn jappartjenu għall-cooldown jew il-lockout).

**Irkupru għażżien:** meta jiskadi `OPEN`, `getStatus()`, `canExecute()`, `getRetryAfterMs()` jaġġornaw l-istat għal `HALF_OPEN`. Mhu meħtieġ ebda tajmer fl-isfond.

---

### Cooldown globali fakultattiv tal-Fornitur (kontroll tat-tieqa)

Ir-raba’ saff, **fakultattiv** (`PROVIDER_COOLDOWN_ENABLED`, **mitfi** b’mod predefinit), iżomm
memorja bejn it-talbiet tal-fornituri li qed ifallu fi
`open-sse/services/providerCooldownTracker.ts`, li tiġi kkonsultata mir-riżoluzzjoni tal-miri
combo sabiex talbiet combo konsekuttivi jieqfu jerġgħu jgħaddu minn fornitur li jkun għadu
kemm falla. L-entrati fil-livell tal-fornitur jirrispettaw il-kontroll tat-tieqa `PROVIDER_PROFILES`:

| Profil      | jattiva wara (`providerFailureThreshold`) | fi żmien (`providerFailureWindowMs`) | jibqa’ f’cooldown għal (`providerCooldownMs`) |
| ----------- | ----------------------------------------: | -----------------------------------: | --------------------------------------------: |
| OAuth       |                                      `10` |                              `15min` |                                        `5min` |
| Ċavetta API |                                      `15` |                              `30min` |                                       `10min` |

Taħt il-limitu, il-fornitur **ma jitqiesx** li jinsab f’cooldown; suċċess ineħħi
t-tieqa. L-entrati fil-livell tal-konnessjoni (`provider:connectionId`) minflok iżommu
l-backoff esponenzjali `minRetryCooldownMs → maxRetryCooldownMs`. Sovrastrutturi:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Kontroll kontra rigressjonijiet: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Perjodu ta' Stennija tal-Konnessjoni

**Ambitu:** konnessjoni/kont/ċavetta waħda tal-fornitur.

**Għan:** taqbeż ċavetta waħda problematika filwaqt li konnessjonijiet oħra għall-istess fornitur jibqgħu jipprovdu s-servizz.

**Implimentazzjoni:**

- Immarkar bħala mhux disponibbli: `src/sse/services/auth.ts::markAccountUnavailable()`
- Għażla: `getProviderCredentials*` fl-istess fajl
- Kalkolu tal-perjodu ta' stennija: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

**Oqsma għal kull konnessjoni:**

- `rateLimitedUntil` — timestamp sa meta jiskadi l-perjodu ta' stennija
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — kontatur ta' backoff esponenzjali

**Perjodi ta' stennija predefiniti:**

- Bażi OAuth: 5s
- Bażi API-key: 3s
- API-key 429: jippreferi l-headers upstream `Retry-After`/reset/test tar-reset li jista' jiġi pparsjat
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Protezzjoni kontra thundering herd:** tipprevjeni fallimenti konkorrenti milli jestendu żżejjed il-perjodu ta' stennija jew iżidu `backoffLevel` darbtejn.

**Waqfiet fil-kontenut tal-stream ma jpoġġux il-kont f'perjodu ta' stennija.** Meta l-watchdog tal-waqfien tal-kontenut
(`open-sse/utils/streamHandler.ts`) jaqta' qalbu minn stream li ma jkun bagħat ebda output tal-mudell
fil-ħin, `markAccountUnavailable()` jirreġistra l-iżball fuq il-konnessjoni iżda ma jistabbilixxi ebda
perjodu ta' stennija: il-waqfien jappartjeni għal dik it-talba, u ħafna drabi jkun turn twil ta' reasoning mingħajr
output s'issa. L-operaturi jistgħu jerġgħu jattivaw din l-imġiba permezz ta' `resilienceSettings.streamStallCooldown.enabled`
(predefinit `false`).

**Il-frames tar-reasoning jerġgħu jibdew il-baġit tal-waqfien tal-kontenut.** Mudell tar-reasoning jista' jaħseb għal
minuti qabel l-ewwel token viżibbli tiegħu: Claude jixxandar frames `thinking_delta` li t-test
tar-reasoning tagħhom jista' jkun vojt, u l-Responses API jixxandar element ta' reasoning wara
ieħor. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) jagħraf
dawn il-frames, u l-watchdog jerġa' jibda l-baġit tiegħu ma' kull wieħed minnhom minflok jikkanċella t-
turn. Xorta waħda mhumiex output tal-mudell, għalhekk turn li jintemm b'reasoning biss xorta jiġi
rrappurtat bħala vojt, u turn li jieqaf jirraġuna u jibgħat biss heartbeats xorta jattiva
l-watchdog.

Il-frames binarji `reasoningContentEvent` ta' Kiro b'firma mhux vojta jippreservaw din
l-attività ta' reasoning permezz tal-executor bħala delta `reasoning_content` vojta. Il-firma ma
tiġix mgħoddija. Il-metadata, il-frames mhux kompluti u l-firem vojta ma jerġgħux jibdew il-
baġit tal-kontenut; it-timeout indipendenti tal-stream attiv u l-kanċellazzjoni mill-klijent xorta
japplikaw (`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali (MHUX perjodi ta' stennija):**

- `banned` — stabbilit mid-detezzjoni ta' keyword ta' projbizzjoni / projbizzjoni tal-kont (ara [BAN_DETECTION](../security/BAN_DETECTION.md)), u minn tliet rifjuti upstream konsekuttivi għal kull talba (`request_rejected`, eż. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); rifjut wieħed ipoġġi biss il-konnessjoni f'perjodu ta' stennija
- `expired` (jgħaddi għal stat terminali wara għadd limitat ta' tentattivi mill-ġdid — `EXPIRED_RETRY_MAX = 3` b'backoff esponenzjali — sabiex żbalji OAuth temporanji jkunu jistgħu jirkupraw waħedhom qabel ma l-kont jiġi diżattivat b'mod permanenti)
- `credits_exhausted`

Dawn jippersistu sakemm il-kredenzjali jinbidlu jew operatur jirrisettjahom. Tissostitwixxix stati terminali bi stat temporanju ta' perjodu ta' stennija.

**Irkupru għażżien:** meta `rateLimitedUntil` ikun għadda, il-konnessjoni terġa' ssir eliġibbli. Wara użu b'suċċess, `clearAccountError()` ineħħi l-oqsma kollha tal-iżbalji.

### Limitu tal-użu ta' Claude OAuth: kanal bi prijorità aktar baxxa + reset tal-limitu tas-sessjoni

**Ambitu:** konnessjoni waħda ta' abbonament Claude (OAuth). Iż-żewġ funzjonalitajiet huma **opt-in għal kull
konnessjoni** (Editja l-konnessjoni → sezzjoni Claude → `lowPriorityMode` / `autoLimitReset` fi
`providerSpecificData`, it-tnejn diżattivati b'mod predefinit) u jirriflettu l-kmandi `/low-priority` u
`/limit-reset` ta' Claude Code (il-kuntratt tal-wire maqbud minn Claude Code 2.1.263).

**Implimentazzjoni:**

- Magna tal-istati + klassifikazzjoni tar-rispons: `open-sse/services/claudeLowPriority.ts`
- Klijent tal-istatus/talba tar-reset: `open-sse/services/claudeLimitReset.ts`
- Hook tal-executor (injezzjoni tal-header + tentattiv mill-ġdid bl-istess kont): `open-sse/executors/base.ts::execute()`
- Persistenza tal-opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Attivatur:** il-limitu tal-użu ta' 5 sigħat — `429` li l-headers tiegħu jkollhom
`anthropic-ratelimit-unified-status: rejected` u, meta l-kont ikun eliġibbli,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ma jintbagħat xejn qabel dak l-ewwel
429 tal-limitu; burst 429 mingħajr headers unifikati jgħaddi mill-fluss normali tal-perjodu ta' stennija.

**Kanal bi prijorità aktar baxxa** (`lowPriorityMode`):

- Meta jintlaħaq il-limitu u jirritorna 429, l-eżekutur jaċċetta l-offerta u immedjatament jerġa’ jipprova bl-**istess**
  kont b’`anthropic-usage-limit: slow`; il-korsija tibqa’ attiva sal-ħin imħabbar f’
  `anthropic-ratelimit-unified-reset` (+60s ta’ marġni) u kull talba f’dak il-perjodu jkollha
  l-header. Il-429 interċettat qatt ma jasal għand `handleChatCore`, għalhekk il-konnessjoni
  **ma** titqiegħedx f’cooldown u ma tinbidilx ma’ oħra.
- `anthropic-ratelimit-unified-slow-status` fuq tweġibiet sussegwenti: `active` / `not_needed`
  jżommu l-korsija; `slot_busy` (429) jew `529` jistennew għal
  `anthropic-ratelimit-unified-slow-retry-after` tas-server (20s b’mod awtomatiku, limitat għal
  5–600s, b’jitter ta’ ±30%) u jerġgħu jippruvaw, sal-limitu ta’
  `anthropic-ratelimit-unified-slow-max-wait` (20 min b’mod awtomatiku, limitat għal
  1 min–6 h) — wara dan il-korsija tintemm u perjodu ta’ mistrieħ ta’ 10 minuti jimblokka
  l-aċċettazzjoni mill-ġdid. Barra minn hekk, l-istennija hija limitata għal dak li jkun fadal
  mit-timeout upstream-start tat-talba nnifisha (`resolveFetchStartTimeout`, 10 min b’mod
  awtomatiku) nieqes marġni ta’ 5 s: mingħajr dak il-limitu, il-max-wait predefinit ta’
  20 minuta jdum aktar mit-talba u l-istennija tiġi abortita waqt li tkun għaddejja,
  u b’hekk jidher `TimeoutError` minflok tmiem gradwali b’`max_wait` + perjodu ta’ mistrieħ.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, bidla għal ċiklu ġdid tat-tieqa
  ta’ 5h, jew `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (li jtemmha
  bħala `extra_usage` bi kwalunkwe status, peress li l-użu żejjed bi ħlas issa jkopri l-limitu)
  itemmu l-korsija; imbagħad it-tweġiba tgħaddi għall-fluss normali tal-cooldown.
  `budget_exhausted` jinżamm fil-memorja sal-ħin imħabbar għar-reset tal-baġit (≤ 8 ijiem).
- Il-verifika tal-limitu ssir wara t-tentattivi mill-ġdid interni tal-eżekutur fl-istess tentattiv
  ikkawżati minn 400 (editjar tal-kuntest, limiti fuq thinking/effort, tagħlim awtomatiku
  tal-parametri), għalhekk 429 tal-limitu li jidher biss f’wieħed minn dawk it-tentattivi
  mill-ġdid xorta jiġi interċettat minflok ma jasal fil-fluss tal-cooldown.
- L-istat jinżamm fil-memorja għal kull konnessjoni (restart jiswa 429 tal-limitu ieħor biex
  jerġa’ jiġi aċċettat).

**Reset tal-limitu tas-sessjoni** (`autoLimitReset`, ippruvat qabel il-korsija meta t-tnejn ikunu attivi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blokka `juniper_tide`;
  meta `arm: "reset"` u `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` b’
  `{ "program": "juniper_tide" }` (l-UUID tal-organizzazzjoni minn
  `providerSpecificData.organizationUUID`, b’fallback tal-bootstrap).
- `result: reset|not_limited` → it-talba terġa’ tiġi ppruvata b’veloċità sħiħa (mingħajr l-header
  slow). `already_used` / `not_offered` iżommu `next_available_at` fil-memorja (ġimgħa b’mod
  awtomatiku); kwalunkwe falliment jattiva backoff ta’ 15-il minuta. Ir-reset isir darba
  fil-ġimgħa u xorta jgħodd mal-limitu ta’ kull ġimgħa.

Kontrolli kontra r-rigressjonijiet: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità tas-sessjoni (#7274)

**Ambitu:** sessjoni waħda tal-klijent (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) marbuta ma’ konnessjoni waħda, għal **kwalunkwe** fornitur.

**Għan:** li aġent b’diversi interazzjonijiet (Claude Code, aider, aġenti personalizzati) jinżamm fuq l-istess kont bejn it-talbiet, biex jitnaqqsu t-telf tal-kuntest bejn kontijiet u l-429s ripetuti ta’ cold-start fuq fornituri bi stat tas-sessjoni għal kull kont.

**Implimentazzjoni:**

- Riżoluzzjoni tat-TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Għażla/ħolqien tal-pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazzjoni tal-header (ġenerika, għal kwalunkwe fornitur): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella persistenti tal-pins: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (TTL globali f’ms, `0` jiddiżattivah) — `src/lib/db/settings.ts`. Ingħata isem ġdid mill-`codexSessionAffinityTtlMs`, li kien għal Codex biss, permezz tal-migrazzjoni `124_generic_session_affinity_ttl.sql`, li tittrasferixxi kwalunkwe TTL ta’ Codex ikkonfigurat qabel bħala l-valur predefinit il-ġdid.

Qabel #7274, `resolveSessionAffinityTtlMs()` kien immedjatament jirritorna `0` għal kull fornitur ħlief `codex`, għalhekk is-setting tat-TTL (u l-headers tas-sessjoni) ma kellhom ebda effett imkien ieħor minkejja li l-mekkaniżmu tal-pinning u l-estrazzjoni tal-header kienu diġà indipendenti mill-fornitur. It-tiswija neħħiet dak ir-ritorn bikri; issa t-TTL japplika b’mod uniformi għal kull fornitur ladarba jiġi ssettjat globalment għal aktar minn `0`.

It-tliet headers tal-affinità tas-sessjoni qatt ma jintbagħtu upstream — l-eżekuturi jibnu l-headers upstream tagħhom mill-bidu minflok jgħaddu l-headers tal-klijent, għalhekk dan jibqa’ biss id ta’ korrelazzjoni interna.

### Leases esklużivi ta’ konnessjonijiet għal sessjonijiet ġestiti

**Ambitu:** klijent/sessjoni HTTP ġestita u attiva waħda jkollha konnessjoni OmniRoute eliġibbli waħda.

**Għan:** li jipprovdi sjieda esklużiva u persistenti ta’ konnessjoni għal klijenti li jeħtieġu
konfini stretti tar-routing bejn it-talbiet. Dan huwa differenti mill-affinità tas-sessjoni, li hija
preferenza flessibbli għall-kontinwità: lease esklużiv jippersisti l-istat taċ-ċiklu tal-ħajja
f’SQLite, jinforza l-uniċità globali tas-sid attiv u tal-konnessjoni attiva, u jirrifjuta
ġenerazzjoni skaduta qabel id-dispatch lejn il-fornitur.

Il-karatteristika hija opt-in għal kull API key. Key ġestita jrid ikollha l-iskop `lease:exclusive`
u lista `allowedConnections` espliċita u mhux vojta. Kwalunkwe klijent HTTP jista’ juża l-endpoint
taċ-ċiklu tal-ħajja; mhu meħtieġ ebda isem tal-klijent, user-agent, fornitur, metodu OAuth, jew
mudell. Il-lease jkollu konnessjoni, mhux mudell, għalhekk bidla fil-mudell iżżomm ir-rabta sakemm
il-konnessjoni tibqa’ eliġibbli skont ir-regoli normali. Ir-regoli normali tal-mudell, tal-kwota,
tas-saħħa, tal-cooldown u tal-allowlist jibqgħu awtorevoli u jistgħu jittrasferixxu l-istess
ġenerazzjoni għal konnessjoni eliġibbli u ħielsa oħra.

Iċ-ċiklu tal-ħajja huwa `POST /api/v1/session-leases` b’azzjonijiet JSON `acquire`, `renew`, u `release`.
It-talbiet ta’ inferenza ġestiti jippreżentaw il-valur opak `X-OmniRoute-Lease-Owner` u l-valur eżatt
`X-OmniRoute-Lease-Generation`. Is-sid juża `vlo_` segwit minn 43 karattru base64url; jinħażen biss
il-hash SHA-256 tiegħu. Kull ċint finali tad-dispaċċ jorbot ukoll l-ID taċ-ċavetta API awtentikata u
l-ID tal-konnessjoni attiva. L-headers tal-kontroll tal-kiri jitneħħew mil-logs, mill-istampi istantanji miżmuma tat-talbiet, u
mill-headers tal-eżekutur upstream.

Jekk ir-routing ordinarju jkollu kandidati ġestiti eliġibbli iżda kull kandidat liberu jkun okkupat minn
kiri attiv barrani, OmniRoute jirritorna HTTP `429`, il-kodiċi lease-capacity-unavailable, stat ta’
stennija għall-kapaċità, u `Retry-After` limitat derivat mill-aktar skadenza rilevanti bikrija.
Nuqqas ordinarju ta’ eliġibbiltà mhuwiex kontenzjoni għall-kiri u jżomm is-semantika eżistenti tal-iżbalji tar-routing.

Il-mekkaniżmi relatati jibqgħu separati:

- L-okkupanza tas-sessjoni OAuth hija distribuzzjoni ratba lokali għall-proċess għall-kontijiet OAuth.
- Is-semafori tal-kontijiet jagħtu permessi għall-konkorrenza tat-talbiet u jintemmu meta titlesta talba.
- Il-kirjiet esklussivi ta’ sessjonijiet ġestiti huma sjieda durabbli taċ-ċiklu tal-ħajja b’ċint tal-ġenerazzjoni.

---

## 3. Imblukkar tal-Mudell

**Ambitu:** it-tripla fornitur + konnessjoni + mudell.

**Ambitu taċ-ċavetta skont l-istatus:** l-istatus li jfalli jiddeċiedi f’liema ċavetta jinkiteb imblukkar
(`resolveLockoutScope()` f’`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinjal ta’ kwota jew intitolament — jimblukkaw il-**familja tal-kwota**:
  għal codex, l-ambitu kollu `codex` / `spark` (kull mudell `gpt-5*` tal-
  konnessjoni), u għal fornituri oħra `getQuotaScopedModelForProvider()`.
- `404` jimblokka l-mudell bażiku (`getModelLockKey()` jirrestrinġi `not_found`).
- Kwalunkwe status ieħor — fallimenti tat-trasport/server `5xx` u l-
  `502` sintetizzat minn OmniRoute stess mill-validazzjoni tal-kwalità — jimblokka biss it-tliet elementi
  eżatti fornitur/konnessjoni/mudell. Stream ħażin fuq mudell wieħed mhuwiex evidenza
  dwar il-kwota tal-kont; qabel din ir-regola, rispons vojt wieħed fuq
  `codex/gpt-5.6-luna` kien ineħħi kull mudell `gpt-5*` ta’ dik il-konnessjoni mir-
  routing għal 2–30 minuta (b’eskalazzjoni), filwaqt li l-kwota tagħha kienet tibqa’ mhux mittiefsa.
- L-għażla espliċita `scope` ta’ min jagħmel is-sejħa dejjem tieħu preċedenza (Antigravity jgħaddi `"exact"`).

**Għan:** jiġi evitat li konnessjoni sħiħa tiġi diżattivata meta mudell wieħed biss ma jkunx disponibbli jew ikun limitat mill-kwota.

**Eżempji:**

- Fornituri bi kwota għal kull mudell li jirritornaw 429
- Fornituri lokali li jirritornaw 404 għal mudell nieqes wieħed
- Fallimenti ta’ permessi speċifiċi għall-fornitur għall-modalità/mudell (eż., modalitajiet Grok)

**Implimentazzjoni:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard tal-Perjodi ta’ Stennija tal-Mudelli (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Jelenka l-imblukkar attiv flimkien ma’: fornitur, konnessjoni, mudell, raġuni, expiresAt. L-operaturi jistgħu jerġgħu jattivaw mudell manwalment mill-kard.

**API REST:**

- `GET /api/resilience/model-cooldowns` — jelenka l-imblukkar attiv
- `DELETE /api/resilience/model-cooldowns` — riattivazzjoni manwali. Korp: `{provider, connection, model}`. Awtorizzazzjoni: management.

### Maniġer tal-Perjodi ta’ Stennija

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Paġna waħda għal kull konnessjoni li tkun barra mir-routing għal raġuni temporanja, minflok
ma tinfetaħ il-paġna ta’ kull fornitur. Din telenka l-perjodi ta’ stennija tal-konnessjonijiet, l-imblukkar tal-mudelli u l-
istati terminali, tneħħihom għal kull konnessjoni, għal għażla, jew għall-konnessjonijiet kollha ta’ fornitur,
u teditja r-regoli tal-perjodi ta’ stennija li jiġu rfinati l-aktar: `streamStallCooldown.enabled` u l-
perjodu ta’ stennija bażi `connectionCooldown` għal OAuth / API-key u l-għadd massimu ta’ passi ta’ backoff (issejvjati permezz ta’
`PATCH /api/resilience`). L-istati terminali (`banned`, `expired`, `credits_exhausted`) huma
elenkati iżda qatt ma jitneħħew minn hawn.

**API REST** (`src/lib/resilience/cooldownManager.ts`, awtorizzazzjoni: management):

- `GET /api/resilience/cooldowns[?provider=]` — konnessjonijiet bl-istatus, il-perjodu ta’ stennija li jifdal,
  il-livell ta’ backoff, l-aħħar tip ta’ żball u l-imblukkar tal-mudelli (mingħajr kredenzjali)
- `POST /api/resilience/cooldowns` — korp `{connectionIds: string[]}` jew
  `{all: true, provider?}`; jirritorna `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI tas-settings tal-imblukkar + irkupru bi tnaqqis wara suċċess (v3.8.23)

L-imblukkar tal-mudelli nbidel minn imġiba hardcoded dejjem attiva għal karatteristika kompletament konfigurabbli,
li trid tiġi attivata b’mod espliċitu, bil-kard tas-settings tagħha stess u b’mekkaniżmu ta’ rkupru awtokorrettiv.

**Kard tas-settings:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Din hija **distinta** mill-`ModelCooldownsCard` li tinqara biss imsemmija hawn fuq (li
_telenka_ biss l-imblukkar attiv) — il-kard il-ġdida _tikkonfigura l-parametri_. Il-valuri
predefiniti jinsabu f’`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Valur predefinit                 | Tifsira                                                                        |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Swiċċ ewlieni — l-imblukkar tal-mudelli huwa **mitfi b’mod predefinit**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream li jgħoddu bħala falliment fl-ambitu tal-mudell.               |
| `baseCooldownMs`        | `120_000` (120 s)                | Tul inizjali tal-imblukkar għall-ewwel falliment.                              |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limitu massimu għall-perjodu ta’ stennija eskalat.                             |
| `maxBackoffSteps`       | `10`                             | Għadd massimu ta’ passi ta’ eskalazzjoni ta’ backoff esponenzjali.             |
| `useExponentialBackoff` | `true`                           | Jekk fallimenti ripetuti jeskalawx il-perjodu ta’ stennija b’mod esponenzjali. |

Is-settings jippersistu permezz tal-ħażna normali tas-settings u jiġu vvalidati permezz tal-
iskema tas-settings tar-reżiljenza; il-kard tillimita `baseCooldownMs`/`maxCooldownMs`
(b’`maxCooldownMs ≥ baseCooldownMs`) u `maxBackoffSteps`.

**Irkupru bi tnaqqis wara suċċess:** l-irkupru **mhuwiex** ibbażat biss fuq l-iskadenza tat-tajmer. Rispons
tajjeb inaqqas progressivament l-għadd ta’ fallimenti tal-mudell sabiex mudell li jkun irkupra
f’nofs il-perjodu jieqaf jeskala (u jitneħħielu l-imblukkar) qabel ma jintemm it-tajmer tiegħu. Meta destinazzjoni
combo tirnexxi, `open-sse/services/combo.ts` issejjaħ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), li **jnaqqas bin-nofs** il-
`failureCount` maħżun (`Math.floor(failureCount / 2)`); meta jilħaq `0`, l-entrata tal-imblukkar
titħassar kompletament. Il-funzjoni korrispondenti `recordModelLockoutFailure()`
iżżid l-għadd (u teskala l-perjodu ta’ stennija) għal fallimenti fil-perjodu
ta’ eskalazzjoni. Dan it-tnaqqis wara suċċess jiżdied mal-iskadenza normali tat-tajmer —
kwalunkwe wieħed miż-żewġ mekkaniżmi jista’ jerġa’ jattiva mudell.

**Stat:** l-imblukkar jinżamm **fil-memorja** (`Map`s għal kull proċess ta’
`ModelLockoutEntry` indikati minn `provider:connectionId:model`, u imblukkar b’ambitu eżatt minn
`provider:connectionId:exact:model`), u ma jippersistix fid-
DB — jintilef meta jerġa’ jinbeda l-proċess. Is-_settings_ jippersistu; l-_istat_ tal-imblukkar attiv huwa temporanju.

---

## 4. Kontroll tal-Konkurrenza għal Quota-Share (v3.8.36)

Il-kontijiet b'abbonament (GLM, MiniMax, eċċ.) spiss jaċċettaw biss ~1–3 talbiet konkorrenti; jekk jinqabeż dan il-limitu, jiġu attivati żbalji 429 u perjodi ta' cooldown. Dan huwa partikolarment serju f'kombinazzjonijiet ta' **quota-share** (`qtSd/…`), fejn diversi API keys jaqsmu kont upstream wieħed. Tliet saffi jipprevjenu kont kondiviż milli jiġi mgħarraq bit-talbiet.

### Limitu tal-konkurrenza għal kull konnessjoni (`max_concurrent`)

Kull konnessjoni ta' provider tista' tiddikjara limitu massimu `max_concurrent`
(`provider_connections.max_concurrent`, issettjat fil-modal tal-konnessjoni / API / DB).
Ħallih vojt biex ma jkun hemm l-ebda limitu. Dan huwa l-kontroll uniku li jmexxi s-saff ta' serjalizzazzjoni
hawn taħt — issettjah skont il-konkurrenza reali tal-kont (eż. GLM ~1, MiniMax ~2).

### Limiti tal-konkurrenza għal kull mudell (`modelConcurrency`)

Konnessjoni tista' wkoll tiddikjara limiti massimi eżatti tal-konkurrenza għal kull mudell
fil-mappa `rateLimitOverrides` tagħha:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Issettjah fil-modal tal-konnessjoni (**Sovrasrizzjonijiet tal-limitu tar-rata → Limiti tal-konkurrenza
għal kull mudell**, `model=cap` wieħed għal kull linja) jew permezz ta'
`PATCH /api/providers/[id]` bl-istess struttura JSON. Semantika ewlenija:

- **Għall-konnessjoni kollha kontra speċifiku għall-mudell:** `maxConcurrent` jibqa' l-limitu kondiviż
  għall-konnessjoni kollha. Meta japplikaw it-tnejn, iż-żewġ gates jinkisbu
  atomikament fl-istess gate kompost
  (`global → provider → account → model`); l-imġiba effettiva tkun dik tal-limitu
  applikabbli l-aktar strett.
- **Tqabbil eżatt taċ-ċavetta tal-mudell:** iċ-ċavetta hija s-sekwenza tal-mudell mgħoddija lill-
  executor wara r-riżoluzzjoni tar-routing — normalment l-id bażiku tal-mudell upstream
  (`glm-5`), mhux alias `provider/model` min-naħa tal-klijent (`zai/glm-5` ma
  jaqbilx ma' `glm-5`). Il-valuri huma limiti ta' numri sħaħ pożittivi għal talbiet konkorrenti.
- **Kju lokali, mingħajr skoperta:** it-talbiet żejda jidħlu fi kju lokalment bis-
  semantika eżistenti tal-kju/timeout (żbalji ta' ammissjoni ttajpjati `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute ma jiskoprix u ma
  jiddeduċix il-politika upstream — jinforza l-limiti eżatti li jkun
  ikkonfigura l-operatur. Gate ta' mudell saturat qatt ma jiddiżattiva l-provider u qatt ma
  joħloq lockout permanenti tal-mudell; l-imġiba upstream għal 429/cooldown/fallback
  tibqa' l-aħħar linja ta' difiża kontra l-iżbalji.
- **Ambitu għal kull konnessjoni u għal kull proċess:** il-limiti japplikaw għal kull konnessjoni tad-database
  u jinżammu fil-memorja, għalhekk żewġ konnessjonijiet li jerġgħu jużaw l-istess API key upstream
  ma jikkoordinawx bejniethom.
- **Mhux ikkonfigurat ifisser li ma jinbidel xejn:** jekk il-mappa titħalla barra (jew il-
  field tad-dashboard jitħalla vojt), ma jiżdied l-ebda gate tal-mudell. Eżempju ta' konfigurazzjoni mingħajr
  ma jiġi ddikjarat xi limitu universali tal-provider:

```text
glm-5=1
glm-4.7=3
```

### Serjalizzazzjoni tat-talbiet ta' quota-share

Meta dispatch ta' quota-share jimmira konnessjoni li tiddikjara
`max_concurrent` pożittiv, it-talbiet konkorrenti lejn dak il-**kont** jiġu sserjalizzati permezz ta'
semaphore għal kull konnessjoni (ċavetta `qsconn:<connectionId>`): it-talbiet żejda **jistennew fil-
kju** minflok jgħarrqu l-kont. Dan huwa **fail-open** — kju saturat
jew timeout jipproċedi mingħajr slot minflok qatt ma jirrifjuta talba li tista'
tiġi ddispaċċjata. Aqilbu minn **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, attiv
b'mod awtomatiku). Mingħajr limitu `max_concurrent`, l-imġiba ma tinbidilx.

> Il-gate tar-routing ta' quota-share (`selectQuotaShareTarget`, DRR + P2C) huwa nnifsu
> fail-open u sempliċement _inaqqas il-prijorità_ ta' konnessjoni li tkun laħqet il-limitu — b'
> pool ta' konnessjoni waħda ma jistax jinforza limitu strett, għalhekk dan is-semaphore huwa dak li effettivament
> iżomm l-għargħar taħt kontroll.

### Tentattiv mill-ġdid konxju tal-cooldown għal combos

Għal kull strateġija ta' combo (meta tkun attivata), talba li kieku tikkristallizza żball 429
għal cooldown temporanju QASIR tistenna li jintemm u terġa' tiġi ddispaċċjata minflok
ma tirritorna l-429 — dan ikopri twieqi TPM/RPM tal-klassi Gemini (~60s retry-after)
fuq combos b'diversi mudelli, eż. meta ż-żewġ targets ta' combo b'2 mudelli jilħqu limitu tar-rata
għal kull mudell. Dan huwa limitat minn `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) f'**Settings → Resilience**. Qatt ma jistenna għal `quota_exhausted`
(imsakkar sa nofsillejl) jew għal raġunijiet ta' awtentikazzjoni/ma nstabx.

---

## 5. Kontroll tad-Dħul fil-Kju tat-Talbiet (v3.8.49 · ħarġa #6593)

**Ambitu**: il-kju lokali tar-rata massima għal kull fornitur+konnessjoni (`open-sse/services/rateLimitManager.ts`,
ibbażat fuq Bottleneck), saff wieħed taħt it-tliet mekkaniżmi ta’ hawn fuq.

**`maxWaitMs` jillimita l-istennija fil-kju; `executionMaxWaitMs` jillimita l-eżekuzzjoni.**
It-tnejn huma separati apposta, u l-ebda wieħed minnhom ma jaffettwa lill-ieħor.

`resilienceSettings.requestQueue.maxWaitMs` huwa l-**baġit tal-istennija fil-kju**:
ikopri l-istennija għal post għand il-fornitur u mbagħad iż-żmien mgħoddi fi stat QUEUED, u t-tajmer tiegħu
jitneħħa fil-mument li l-kompitu joħroġ minn QUEUED u jibda jiġi eżegwit
(`rateLimitManager.ts`, `wrappedFn`). Talba li taqbeż dan il-limitu qatt ma tasal
għand is-servizz upstream. Il-valur predefinit huwa 30000ms, ipprovdut minn `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
f’`src/lib/resilience/settings.ts` u ffissat minn
`tests/unit/ratelimit-admission-control-6593.test.ts`, sabiex bidla fih tagħmel
dak it-test aħmar minflok ma tħalli dan il-paragrafu jsir skadut mingħajr avviż.

`resilienceSettings.requestQueue.executionMaxWaitMs` huwa dak li Bottleneck
jirċievi bħala l-`expiration` tal-kompitu, li t-tajmer tiegħu jibda biss wara d-dispaċċ. Dan huwa
mekkaniżmu ta’ protezzjoni għal eżekuturi li m’għandhomx timeout upstream tagħhom stess, u
jiżdied sal-timeout tal-bidu tal-fetch tal-eżekutur meta dak ikun itwal, sabiex
ma jkunx jista’ jwaqqaf rispons b’saħħtu li jkun għadu għaddej. Il-valur predefinit huwa 600000ms (10 minuti).

L-għoti tal-baġit tal-kju lil `expiration` kien dak li qabel kien iwaqqaf gateways mhux inkrementali
f’nofs l-eżekuzzjoni — dawn leġittimament idumu għaddejjin għal minuti qabel jaslu l-ewwel bytes —
u għalhekk skadenza tintwera bħala `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), filwaqt li l-baġit tal-kju juża l-kodiċi
tat-timeout tal-kju. Ibdel kwalunkwe wieħed minnhom permezz ta’ `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) jew mid-dashboard
(**Settings → Resilience**). It-tnejn jiġu limitati għal 1ms–24h waqt in-normalizzazzjoni.

**Preċedenza, għat-tnejn:** il-varjabbli env tipprovdi biss il-valur _predefinit_. Valur
ippersistit f’`resilienceSettings.requestQueue` (dashboard / patch tal-API, maħżun
f’`key_value`) jieħu preċedenza fuqu, u
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` għal kull konnessjoni jieħu preċedenza fuq dak. Għalhekk,
l-issettjar tal-varjabbli env fuq deployment li diġà għandu valur ippersistit
ma jibdel xejn — minflok, neħħi jew aġġorna l-issettjar ippersistit.

Iż-żmien fil-kju huwa limitat minn `maxWaitMs`; `maxQueueDepth` hawn taħt jillimita kemm
utenti li jagħmlu talbiet jistgħu jkunu fil-kju fl-istess ħin.

**`maxQueueDepth` — limitu tad-dħul fakultattiv (ġdid).** `resilienceSettings.requestQueue.maxQueueDepth`
jillimita kemm-il talba tista’ tibqa’ fil-kju (għadha ma ġietx iddispaċċjata) għal
fornitur+konnessjoni waħda fl-istess ħin. Meta l-kju diġà jkun fih `maxQueueDepth`
talbiet, talba ġdida tiġi rrifjutata immedjatament bi żball ittajpjat
`code: "RATE_LIMIT_QUEUE_FULL"` **qabel** ma tasal qatt għand `limiter.schedule()`
— għalhekk ir-rifjut huwa rħis u jseħħ qabel kwalunkwe xogħol downstream
ta’ kompressjoni / traduzzjoni tal-prompt għal dik it-talba. Il-valur predefinit `0` =
diżattivat, u jippreserva l-imġiba eżistenti ta’ kju mingħajr limitu; limitat għal 0–100000.
Ibdel dan permezz ta’ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) jew
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch tal-API).

Il-verifika tad-dħul innifisha hija funzjoni pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), sabiex
tkun tista’ tiġi ttestjata b’testijiet unitarji mingħajr limiter Bottleneck reali.

> L-RFC li fetaħ #6593 ippropona wkoll flag `bypassCompressionOnRateLimit`.
> Il-pipeline `open-sse/services/compression/` ta’ dan ir-repo huwa
> kompressjoni tal-prompt/kuntest fuq it-talba LLM ħierġa (`chatCore.ts`,
> madwar il-blokka `resolveCompressionSettings`/`selectCompressionStrategy`),
> mhux kompressjoni tar-rispons HTTP fuq bodies 429 iġġenerati — ma hemm l-ebda
> mogħdija tal-kodiċi korrispondenti għal flag letterali ta’ bypass. Dak il-pass tal-kompressjoni tal-prompt
> bħalissa jitħaddem ukoll _qabel_ `withRateLimit()` fil-pipeline tat-talba, għalhekk
> il-bidla fl-ordni biex dan jinqabeż meta talba tiġi rrifjutata minħabba kju mimli hija bidla separata u akbar
> mill-ambitu ta’ din il-ħarġa; intenzjonalment **ma ġietx** implimentata
> hawn u tħalliet għal xogħol sussegwenti jekk il-benefiċċju tal-iffrankar tas-CPU jkun jiswa
> r-riskju tal-bidla fl-ordni.

---

## 6. Monitoraġġ tal-fluss ta’ data għal flussi bil-mod (#9709)

Il-mekkaniżmu protettiv fakultattiv `resilienceSettings.streamRecovery.throughputWatchdog` jidentifika
sors upstream li għadu qed jibgħat biċċiet tad-data iżda qed jipproduċi output tal-assistent taħt
ir-rata kkonfigurata ta’ output utli. Dan huwa deliberatament distint mit-timeout tal-inattività:
il-heartbeats u l-metadata la jirrisettjaw xi wieħed mit-tajmers u lanqas ma jgħoddu bħala progress. Huwa wkoll
distint mill-iskadenza assoluta tal-attentat (#9153), li tibqa’ limitu assolut ta’
sikurezza irrispettivament mill-kwalità tal-output.

Il-monitoraġġ jeħtieġ perjodu ta’ tisħin segwit minn tieqa kontinwa sħiħa qabel
ma jkun jista’ jwaqqaf l-operazzjoni. Huwa jgħodd id-deltas tat-test mill-avvenimenti tal-output ta’ Chat Completions u Responses API
(prokura konservattiva għall-bytes UTF-8), jinjora avvenimenti li jkun fihom biss informazzjoni dwar l-użu jew li jkunu vojta, u
jissospendi l-valutazzjoni waqt li jkunu għaddejjin avvenimenti ta’ sejħiet tal-għodod jew ta’ raġunament. Huwa diżattivat
b’mod awtomatiku u jista’ jiġi attivat permezz ta’ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; it-
tieqa, il-perjodu ta’ tisħin, ir-rata minima, u l-output minimu li jista’ jitkejjel huma limitati mis-
saff normali ta’ normalizzazzjoni tas-settings tar-reżiljenza.

Meta jkun attivat, waqfien mill-monitoraġġ jiġi applikat biss għall-attentat upstream attiv. Qabel
ma xi bytes ikunu viżibbli għall-klijent, il-mogħdija eżistenti ta’ rkupru bikri fl-istess kont tista’ terġa’ tiftaħ
l-attentat. Wara l-commit, il-fluss qatt ma jerġa’ jintlagħab bl-addoċċ; huwa biss il-kuntratt eżistenti
ta’ kontinwazzjoni sikura f’nofs il-fluss li jista’ jgħaqqad suffiss. Il-finalizzazzjoni tibqa’
sseħħ darba biss, għalhekk il-kontabbiltà tal-użu u r-rilaxx tas-semaforu ma jiġux duplikati.

---

## 7. Dikjarazzjoni mill-ġdid tal-Istatus Upstream (żbalji tal-kwota bi status ħażin)

**Ambitu:** gateway upstream wieħed li jirrapporta eżawriment temporanju tal-kwota bl-istatus HTTP żbaljat.

**Għan:** jiġi kkoreġut status qarrieqi QABEL il-klassifikazzjoni, sabiex il-konsumaturi downstream (il-magna tal-fallback, l-aggregazzjoni combo, ir-rispons li jintwera lill-klijent) jaraw in-natura reali tal-falliment li jista’ jerġa’ jiġi ppruvat.

Xi gateways jindikaw eżawriment TEMPORANJU tal-kwota bi status HTTP
li ma jistax jerġa’ jiġi ppruvat. `agentrouter.org` jirritorna `403` (xi drabi `400`) b’korp biċ-Ċiniż
(`用户额度不足` / `额度不足`) minflok l-istandard `429`. Klijenti bħal Claude
Code jittrattaw `403` bħala permanenti u jwaqqfu s-sessjoni, u mingħajr korrezzjoni
l-magna tal-fallback tikklassifikah bħala `AUTH_ERROR` minflok bħala avveniment
tal-kwota.

**Implimentazzjoni:**

- Reġistru + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  ta’ regoli għal kull fornitur (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), imqabbla permezz ta’ `applyStatusRestatement()`.
- Post tas-sejħa: il-blokk `providerFailure:` f’`open-sse/handlers/chatCore.ts`
  (madwar il-linja 3654), eżatt wara li `parseUpstreamError()` janalizza rispons
  upstream bi status HTTP ta’ żball (`!providerResponse.ok`), u qabel ma titwettaq
  kwalunkwe klassifikazzjoni, sabiex kull konsumatur downstream jara l-
  istatus ikkoreġut. Żbalji inkorporati fi fluss SSE `200` isegwu mogħdija separata
  u sussegwenti ta’ analiżi tal-fluss u **mhumiex** koperti minn dan il-hook bħalissa — din hija
  limitazzjoni magħrufa, li għadha mhix meħtieġa għall-istatus ħażin ta’ agentrouter (li
  jidher bħala status HTTP ta’ żball).
- Eliġibbiltà għal prova mill-ġdid: `429` jinsab f’`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), għalhekk żball bi status iddikjarat mill-ġdid
  iġorr tieqa reali għal prova mill-ġdid minflok ma jidher bħala `403` mejjet.
- Il-valur sintetiku `60s` ta’ `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  huwa biss dak li r-rispons bid-dikjarazzjoni mill-ġdid jgħid lill-**klijent**; mhuwiex fih innifsu
  t-tul intern tal-cooldown/lockout tal-konnessjoni — dan huwa rregolat
  separatament minn kwalunkwe mekkaniżmu li fil-fatt jittratta l-iżball bid-dikjarazzjoni mill-ġdid
  (il-backoff eskalanti ta’ Connection Cooldown, §2, b’bażi ta’ `3s` għal fornituri
  b’API key; jew Model Lockout, §3, għal fornituri bi kwota għal kull mudell bħal
  agentrouter). Ir-router jista’ jerġa’ jsir eliġibbli biex jipprova internament qabel
  it-tieqa ta’ 60s li jirreklama lill-klijent — marġni intenzjonat,
  mhux bug.

Żbalji permanenti (`无权访问模型` ta’ agentrouter — l-ebda aċċess għal dan il-mudell) QATT ma
jiġu ddikjarati mill-ġdid: `excludeMarkers` jimblokka r-regola anki meta `textMarkers` jaqbel,
għalhekk l-iżball iżomm l-istatus oriġinali tiegħu u xejn ma jibqa’ jipprovah għal dejjem. Ir-
regola korrispondenti ta’ klassifikazzjoni tal-fornitur
(`agentrouter-model-access-denied` f’`open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown bażi ddikjarat ta’ `6h`) tiġi
kkonsultata minn `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_qabel_ ir-ritorn bikri ġeneriku `FORBIDDEN` tal-kategorija apikey, soġġetta għal
`honorsRuleLockScope(provider)` (#10334 — bħalissa esklussiv għal agentrouter permezz
tal-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` f’
`providerErrorRules.ts`). Il-cooldown iddikjarat ta’ 6h tar-regola jgħaddi bħala
`fallbackResult.baseCooldownMs`, iżda xorta jidħol fil-mogħdija eżistenti minn qabel
tal-lockout tal-kwota għal kull mudell (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, mhux mibdula minn #10334 ħlief għas-sors tal-cooldown):
dan jitnaqqas sal-limitu massimu tal-operatur `mlSettings.maxCooldownMs`
(default `1_800_000ms` / 30min), bħal kull lockout ieħor ta’ mudell, u r-
_raġuni tal-lockout ippersistita_ tibqa’ l-valur eżistenti kkodifikat direttament `"forbidden"`,
mhux il-valur `"auth_error"` tar-regola — huwa biss it-tul tal-cooldown li jiġi rispettat
minn tarf sa tarf, mhux l-istring tar-raġuni. Il-konnessjoni nnifisha tibqa’ attiva;
mudelli oħra fuq l-istess konnessjoni ma jiġux affettwati.

Żbalji ta' kwota mfissra mill-ġdid (`额度不足`) jilħqu regola tal-fornitur fil-produzzjoni
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, mingħajr perjodu ta' stennija ddikjarat għalihom stess — japplika l-valur
predefinit tal-backoff skalat tas-saff tal-persistenza). Minn #10334, `scope` fuq
`ProviderErrorRuleMatch` JIĠI kkunsmat minn tarf sa tarf, iżda **biss** għall-fornituri fil-
lista ta' permessi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
illum `"agentrouter"` biss, ikkontrollat permezz ta' `honorsRuleLockScope()`). Għal kull
fornitur ieħor, `scope` jibqa' informattiv, eżattament bħal qabel #10334.
`checkFallbackError` jesponi l-ambitu tar-regola li tqabblet bħala
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) huwa l-kontroll kondiviż li jikkonferma li
`ruleScope` huwa ġenwinament sikur biex jiġi rrispettat bħala sinjal għall-konnessjoni
kollha li jirkupra waħdu (ambitu `"connection"`, raġuni `quota_exhausted`, qatt
`permanent`, qatt `creditsExhausted` — difiża kontra regola futura li tgħaqqad l-ambitu
`"connection"` ma' stat permanenti tal-kont). Żewġ konsumaturi jsejħulu:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  minflok ma jaqa' fil-fergħa ta' mblukkar **għal kull mudell** tal-fornitur passthrough
  (agentrouter għandu `passthroughModels: true` → `hasPerModelQuota()`
  jirritorna `true`), japplika **perjodu ta' stennija temporanju għall-konnessjoni** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, qatt stat terminali
  (`credits_exhausted`/`banned`/`expired`) — sabiex il-konnessjoni tirkupra
  waħedha ladarba jintemm il-perjodu ta' stennija minflok ma tkun meħtieġa
  reimpostazzjoni manwali tal-kredenzjali. Dan jinqabeż għal konnessjonijiet b'
  `disableCooling: true` (#2997): dik l-għażla ta' esklużjoni minflok tgħaddi
  għall-imblukkar għal kull mudell (kompromess iddokumentat —
  ara l-kumment fil-kodiċi fuq il-fergħa).
- **Rotot kombinati fl-istess talba** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): l-istess kontroll jimmarka l-
  konnessjoni fis-set fil-memorja `exhaustedConnections`, b'ċavetta
  `${provider}:${connectionId}`. Dan jaqbeż biss mira li jkun fadal FL-ISTESS TALBA
  li _hija stess diġà ġġorr eżattament dak il-`connectionId`_ fuq l-oġġett tal-mira
  tagħha stess (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` qabel it-tiftixa f'`exhaustedConnections`) — kombinazzjoni sempliċi
  ta' lista ta' mudelli, fejn il-miri relatati ma jġorru ebda `connectionId` ippinjat
  tagħhom stess u wieħed jiġi riżolt biss għal kull dispaċċ mill-header
  `X-OmniRoute-Selected-Connection-Id` tar-rispons, qatt ma tilħaq dak it-tqabbil
  taċ-ċavetta. Għal dak il-każ komuni, il-protezzjoni reali kontra li parti li jkun
  fadal terġa' tuża l-kont li għadu kemm ġie eżawrit MHIX dan is-Set — hija s-saff
  tal-persistenza ta' hawn fuq (il-`rateLimitedUntil` tal-konnessjoni issa jinsab
  fil-futur) flimkien ma' dan l-istess kontroll li jrażżan
  `transientRateLimitedProviders` għall-falliment (ara "Disinn f'żewġ stadji" u
  l-kumment fil-kodiċi dwar il-fergħa `isAgentrouterConnectionQuotaScope`
  f'`targetExhaustion.ts`): jekk dak is-Set jibqa' mhux immarkat, l-awtorizzazzjoni
  sfurzata `allowRateLimitedConnection` ta' `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) MA tidħolx fis-seħħ
  għall-partijiet li jkun fadal tal-fornitur, għalhekk il-filtru `rateLimitedUntil`
  tal-għażla tal-kredenzjali (`src/sse/services/auth.ts:1238`) jiġi rrispettat
  b'mod normali u parti li jkun fadal jew tagħżel konnessjoni agentrouter differenti
  li għadha eliġibbli, jew tfalli għax ma jkunx hemm kredenzjali disponibbli — ma
  tisforzax triqitha lura lejn il-konnessjoni li din il-fergħa għadha kemm poġġiet
  f'perjodu ta' stennija.

### Disinn f'żewġ stadji: tifsir mill-ġdid tal-istatus, imbagħad klassifikazzjoni

It-tifsir mill-ġdid tal-istatus (`upstreamStatusRestatement.ts`) u r-regoli ta'
klassifikazzjoni tal-fornitur (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) huma reġistri separati li t-tnejn jużaw bħala ċavetta l-id
tal-fornitur u markaturi tat-test, iżda jaħdmu f'postijiet differenti u jaqdu
skopijiet differenti: it-tifsir mill-ġdid jerġa' jikteb l-istatus HTTP kmieni
f'`chatCore.ts`; ir-regoli ta' klassifikazzjoni jagħżlu r-`reason` ta' fallback
u l-`scope` tal-illokkjar (`model` / `provider` / `connection`) ġewwa
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Ir-regoli ta' klassifikazzjoni jaraw it-**test** sħiħ tal-iżball biss (meħtieġ
biex iqabblu markaturi fil-body bħal `额度不足`) għall-fornituri elenkati fil-lista
ta' permessi `FULL_TEXT_RULE_PROVIDERS` f'`providerErrorRules.ts` — bħalissa
`"agentrouter"` biss. Għal kull fornitur ieħor tal-**katalogu integrat**,
`checkFallbackError` jgħaddi lil `getProviderErrorRuleMatch` biss l-iżball
strutturat (`{code, type}`), li huwa biżżejjed għal regoli bbażati fuq
header/status/code iżda ma jistax jara markaturi fit-test tal-body.
Il-helper `resolveRuleMatchBody()` iwettaq din l-għażla: it-test sħiħ tal-iżball
għall-fornituri fil-lista ta' permessi, u l-iżball strutturat għall-oħrajn.
Iż-żieda ta' fornitur **integrat** ma' `FULL_TEXT_RULE_PROVIDERS` hija għażla
espliċita għal kull fornitur — teżisti sabiex il-fluss predefinit għal kull
fornitur li mhuwiex fil-lista jibqa' mhux mibdul byte b'byte.

L-`scope` ta' regola (`model` / `provider` / `connection`) huwa għażla separata
minn `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jesponih biss bħala
`fallbackResult.ruleScope`, u l-konsumaturi downstream jirrispettawh bħala xi
ħaġa oħra għajr tikketta informattiva biss għall-fornituri fil-lista ta'
permessi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl (`ikkontrollat permezz
ta' honorsRuleLockScope()` — illum `"agentrouter"` biss). Ara "Żbalji ta' kwota
mfissra mill-ġdid" hawn fuq għal dak li tqabbil ma' `scope: "connection"`
effettivament jagħmel ladarba fornitur ikun f'dik il-lista ta' permessi.

**#11104 — ir-regoli ddikjarati mill-operatur jaqbżu ż-żewġ listi ta’ permessi.** Operatur jista’
jiddikjara regola għal kull fornitur waqt l-eżekuzzjoni permezz ta’ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mingħajr ma jeditja dan il-fajl. Jekk regola tal-operatur titqiegħed wara
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listi ta’
permessi maħsuba biex jipproteġu l-imġiba **predefinita** tar-regoli tal-katalgu
inkorporati — il-mekkaniżmu tas-settings isir inattiv għal kull fornitur ħlief
dawk diġà elenkati hemmhekk, peress li d-dikjarazzjoni tar-regola hija fiha
nnifisha l-aċċettazzjoni espliċita tal-operatur. `resolveRuleMatchBody()` u
`honorsRuleLockScope()` it-tnejn l-ewwel jiċċekkjaw
`hasOperatorRuleForProvider()`: fornitur b’regola tal-operatur jirċievi
t-test mhux ipproċessat tal-iżball u l-`scope` iddikjarat tiegħu jiġi rispettat,
irrispettivament minn jekk jidhirx ukoll f’xi waħda mil-listi ta’ permessi.

**Lakuna magħrufa — `providerRuleRegistry` qatt ma jiġi kkonsultat għal HTTP 400.**
Il-fergħa `BAD_REQUEST` ta’ `checkFallbackError` tikklassifika l-istatus 400
kompletament permezz tal-arrays tal-patterns tagħha stess
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, eċċ.
f’`accountFallback.ts`) u tirritorna qabel ma tintlaħaq il-fergħa
`configuredRule`/`getProviderErrorRuleMatch` ta’ fuqha. Regola tal-katalgu
inkorporata (jew regola tal-operatur) b’`status: 400` hija sintattikament valida,
iżda qatt mhi se tiġi attivata. Illum l-ebda regola eżistenti ma timmira 400,
għalhekk xejn fil-produzzjoni mhu affettwat — iżda regola futura għal 400 teħtieġ
li din il-fergħa tinbidel l-ewwel, bidla akbar milli sempliċement iżżid regola
(din tikklassifika mill-ġdid 400 għal kull fornitur li diġà jiddependi fuq
l-imġiba tal-array tal-patterns) u tinsab barra mill-ambitu ta’ żieda ta’ regola
għal fornitur wieħed.

### Żieda ta’ gateway ġdid li jirrapporta ħażin il-kwota

1. Irreġistra array wieħed ta’ regoli f’`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Żomm `textMarkers`
   speċifiċi għall-fornitur; qatt terġa’ tuża frażijiet ġeneriċi bl-Ingliż li
   jaħbtu ma’ `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. B’mod fakultattiv, irreġistra regoli ta’ klassifikazzjoni f’
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) biex tagħżel
   l-ambitu korrett tal-lock (`connection` għal kwota tal-kont kollu, `model`
   għal żbalji għal kull mudell). Dan il-pass jidħol fis-seħħ fil-produzzjoni
   biss għal fornituri li r-regoli tagħhom jeħtieġu t-test sħiħ tal-iżball
   (markers fil-body): żid l-id tal-fornitur ma’
   `FULL_TEXT_RULE_PROVIDERS` fl-istess fajl — inkella `checkFallbackError`
   dejjem jgħaddi lir-regola biss l-iżball strutturat `{code, type}` u regola
   ibbażata fuq it-test tal-body qatt ma taqbel mat-traffiku reali.
   Regoli li jaqblu purament fuq `status`/`headers` (bħal dawk ta’ Opencode jew
   Minimax) ma jeħtiġux din l-aċċettazzjoni. Separatament, jekk ir-regola
   tiddikjara `scope: "connection"` u l-intenzjoni hija perjodu ta’ stennija
   reali għall-konnessjoni kollha flimkien ma’ qbiż tal-combo fl-istess talba
   (mhux sempliċement tikketta informattiva), żid l-id tal-fornitur ma’
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl — dan huwa dak li
   jikkontrolla l-konsum tat-tip `isAgentrouterConnectionQuotaScope()` f’
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) u
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); mingħajru, `scope`
   xorta jgħaddi minn `fallbackResult.ruleScope`, iżda xejn ma jaġixxi fuqu.
3. Żid testijiet tal-unità li jirriflettu
   `tests/unit/upstream-status-restatement.test.ts` u
   `tests/unit/agentrouter-error-rules.test.ts` (inklużi l-kontrolli
   not-permanent / not-creditsExhausted, u — jekk il-fornitur jeħtieġ il-lista
   ta’ permessi — test li jasserixxi li `resolveRuleMatchBody()` jirritorna
   t-test sħiħ għal dak il-fornitur biss).

Ma huma meħtieġa ebda bidliet f’`chatCore.ts`, `classifyError`, jew combo.

#### Lock maqsum skont l-egress (#10880)

Il-fornituri f’`EGRESS_BUCKETED_LOCK_PROVIDERS` (il-familja opencode) jiġu
ttrattati bħala upstream maqsum f’buckets skont l-IP (il-livell bla ħlas ta’
opencode huwa maqsum skont l-IP, mhux skont il-kont — ara #9611): status-429
ikklassifikat bħala `quota_exhausted` **jew** `rate_limit_exceeded` ipoġġi
f’perjodu ta’ stennija kull konnessjoni fil-familja permessa li l-aħħar IP
tal-egress magħruf tagħha jaqbel ma’ dak tal-konnessjoni li falliet, qabel ma
r-rotazzjoni tkun tista’ tipprovahom
— biex jiġu evitati N-1 sejħiet upstream li żgur ifallu (l-istess struttura bħal
#10460/#10525). `rate_limit_exceeded` huwa inkluż apposta: fil-perkors
`markAccountUnavailable`, ir-regoli speċifiċi għal opencode qatt ma jaqblu
(l-ebda headers/body ma jingħata lil `checkFallbackError`, u opencode mhuwiex
f’`FULL_TEXT_RULE_PROVIDERS`), għalhekk 429 li l-body tiegħu jkun fih it-test
tal-kwota tal-abbonament ("monthly usage limit reached") jiġi kklassifikat
bħala `quota_exhausted` mill-fallback tat-test tal-kwota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; perjodu ta’ stennija
ta’ siegħa) qabel ma qatt tintlaħaq ir-regola `status_429` — filwaqt li 429
mingħajr test tal-kwota (sempliċement limitazzjoni tar-rata) jiġi kklassifikat
permezz tar-regola `status_429` bħala `rate_limit_exceeded` u xorta jqiegħed
lill-familja tal-IP f’perjodu ta’ stennija. Għal fornitur fil-lista ta’
permessi, limitu tar-rata maqsum skont l-IP huwa l-istess sinjal bħal kwota
eżawrita. Limiti realistiċi:

- **Bl-aħjar sforz possibbli**: l-imblukkar isib l-aħħar `egress_ip` magħruf tal-konnessjoni
  minn `proxy_logs` (tieqa ta' 24 siegħa, sinkronu, mingħajr cache). Cache kiesħa (l-IP
  tal-ħruġ qatt ma ġie ttestjat) jew ebda ringiela → il-konnessjoni li qed tfalli xorta titqiegħed
  f'perjodu ta' stennija mill-fergħa (irreġistrat bħal-lum), iżda ma tiġi mblukkata ebda konnessjoni oħt.
- **Qatt terminali**: il-perjodu ta' stennija huwa tieqa ta' kwota li tiġġedded
  (`testStatus: "unavailable"`); stat permanenti qatt ma jiġi derivat minn
  sinjal fil-livell tal-IP. Il-konnessjonijiet `disableCooling` jaqbżu l-fergħa għalkollox.
- **Il-granularità tal-imblukkar tinbidel għall-familja fil-lista permessa**: din hija bidla
  fl-ambitu, mhux biss ottimizzazzjoni tal-konnessjonijiet oħt. opencode huwa fornitur
  `passthroughModels`, għalhekk qabel din il-fergħa 429 kien jipproduċi mblukkar għal kull MUDELL; issa
  jipproduċi perjodu ta' stennija għall-konnessjoni — inkluż għal operatur li jkun qed juża konnessjoni
  waħda mingħajr ebda konnessjoni oħt. Dik hija l-granularità li t-tabella tar-regoli ta' opencode
  diġà tiddikjara bħala korretta (`scope: "connection"`,
  `providerErrorRules.ts`), iżda li s'issa qatt ma ġiet irrispettata għax opencode mhuwiex f'
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il-fergħa tikteb hija stess il-perjodu ta' stennija
  tal-konnessjoni li qed tfalli + `backoffLevel`, b'mod li jirrifletti l-fergħa ta'
  agentrouter b'ambitu ta' konnessjoni, u tirritorna — il-blokka għal kull mudell u
  l-fluss ġeneriku ta' hawn taħt qatt ma jintlaħqu.
- **Combo inkluż**: bħall-fergħa ta' agentrouter, l-ambitu deliberatament
  jinjora t-tnaqqis fil-grad `persistUnavailableState`/`isCombo` li min iċempel bħala combo
  japplika għal 429. Imblukkar għal kull mudell mhuwiex forma aktar dgħajfa ta' dan l-ambitu, iżda
  huwa l-unità żbaljata: ma jgħid xejn dwar l-IP eżawrit, għalhekk ir-rotazzjoni tal-combo
  tibqa' taħli sejħa waħda garantita li tfalli għal kull konnessjoni oħt.
- **Sikurezza tal-konnessjonijiet oħt**: konnessjoni oħt li diġà tinsab fi stat terminali (banned/credits_exhausted)
  jew li diġà tinsab f'perjodu ta' stennija itwal qatt ma tinkiteb fuqha.
- **Lista permessa esklussiva**: it-twessigħ ta' `EGRESS_BUCKETED_LOCK_PROVIDERS` huwa
  deċiżjoni espliċita tas-sid; ebda konnessjoni ġenerika (mudell #10334/#10419). Il-
  mistoqsija għall-konnessjonijiet oħt torbot dik l-istess lista permessa minflok tirrepetiha bħala litteral
  SQL, għalhekk it-twessigħ tagħha jibqa' bidla ta' linja waħda.
- **Rotazzjoni tal-IP tal-ħruġ, fiż-żewġ direzzjonijiet**: it-tieqa tat-tiftix (24 siegħa) hija ferm
  usa' mit-TTL tal-cache tal-IP tal-ħruġ (5 min), għalhekk "l-aħħar IP magħruf" huwa storja,
  mhux l-istat attwali. Jekk il-proxy ta' konnessjoni jkun inbidel fit-tieqa, l-
  imblukkar jista' **ma jaqbadx** IP ġenwinament kondiviż (l-IP irreġistrat ikun il-ġdid,
  mhux eżawrit) — u b'mod simetriku jista' **jqiegħed f'perjodu ta' stennija konnessjoni oħt li minn dak iż-żmien
  inbidlet** mill-IP eżawrit. It-tieni każ jiswa lil dik il-konnessjoni oħt tieqa waħda ta'
  stennija; it-tnejn huma limiti aċċettati tal-aħjar sforz possibbli għal tiftix ibbażat fuq
  l-istorja.
- **Kost**: żewġ skans limitati ta' `proxy_logs` (iffiltrati skont it-tieqa permezz ta'
  `idx_pl_timestamp`), biss bil-frekwenza ta' 429. Ebda indiċi ġdid (migrazzjoni 134
  YAGNI). Imkejjel fuq kopja ta' DB bi traffiku reali ta' daqs moderat; istanza
  bi fluss għoli żżomm proporzjonalment aktar ringieli fl-istess tieqa.

---

## Karatteristiċi Oħra ta’ Reżiljenza

- **19-il strateġija ta’ routing** (prijorità, ponderat, round-robin, context-relay, fill-first, p2c, każwali, l-inqas użat, ottimizzat għall-ispiża, konxju mir-reset, tieqa tar-reset, marġni disponibbli, każwali strett, awtomatiku, lkgp, ottimizzat għall-kuntest, ottimizzat għall-cache, fużjoni, pipeline) — ara [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing konxju mir-reset** (v3.8.0) — jagħti prijorità lill-konnessjonijiet skont il-ħin tar-reset tal-kwota.
- **Degradazzjoni tal-modalità fl-isfond** — Responses API `background: true` tiġi degradata għal sync bi twissija.
- **Sejbien dinamiku tal-limitu tal-għodod** — inaqqas l-użu tal-fornituri meta jintlaħqu l-limiti tal-għadd tal-għodod.
- **Fallback ta’ emerġenza** — ikkontrollat minn `OMNIROUTE_EMERGENCY_FALLBACK`; l-operaturi jistgħu jissovrascrivuh mill-paġna Feature Flags mingħajr ma jerġgħu jibdew is-sistema.

---

## Debugging

- Combo ppeżat jirrispondi b’`503 all_targets_cooling_down` (`Retry-After` issettjat, u `diagnostics.excluded` jelenka kull mira b’`model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → il-pool huwa kkonfigurat u konness, iżda kull mira hija eskluża minn timer ta’ reżiljenza; it-twissija `[COMBO] Weighted selection: every target excluded before dispatch — …` tindika r-raġunijiet u s-sekondi li fadal. `404 no_executable_targets` mill-istess combo jfisser li ma kien involut l-ebda timer ta’ reżiljenza (m’hemm xejn x’jitħaddem, jew kull kont falla fit-test tad-disponibbiltà). Dan huwa inkorporat f’`open-sse/services/combo/pinRecovery.ts` mill-esklużjonijiet miġbura f’`targetResolution.ts`.
- Iċ-ċwievet kollha għal fornitur inqabżu → iċċekkja kemm l-istat tal-interruttur taċ-ċirkwit KIF UKOLL il-`rateLimitedUntil`/`testStatus` ta’ kull konnessjoni.
- Fornitur eskluż b’mod permanenti wara t-tieqa tar-risettjar → il-kodiċi qed jaqra direttament `state` minflok `getStatus()`/`canExecute()`.
- Ċavetta waħda tfalli, iżda l-oħrajn għandhom jaħdmu → ippreferi l-perjodu ta’ stennija tal-konnessjoni fuq l-interruttur taċ-ċirkwit.
- Mudell wieħed biss ifalli → ippreferi l-imblukkar tal-mudell fuq il-perjodu ta’ stennija tal-konnessjoni.
- L-istat għandu jirkupra waħdu iżda ma jagħmilx hekk → iċċekkja għal timestamp futur flimkien ma’ mogħdija tal-qari li taġġorna l-istat skadut. L-istatus permanenti jeħtieġu bidliet manwali.

---

## Fingerprinting u Stealth tat-TLS

L-istealth speċifiku għall-fornitur (JA3/JA4, CCH, obfuscation) huwa ddokumentat separatament — ara `docs/security/STEALTH_GUIDE.md` (git; mhux ikkompilat f’`/docs`).

---

## Ittestjar tar-reżiljenza (Fażi 8 · Blokka C)

Lil hinn mit-testijiet tal-unità għal-loġika tar-reżiljenza, tliet testijiet jeżerċitaw ir-runtime taħt
kundizzjonijiet reali ta’ stress/falliment (kollha ta’ integrazzjoni/ta’ billejl — l-ebda wieħed ma jimblokka l-PRs):

| Test             | X’jagħmel                                                                                                                                                                                        | Eżekuzzjoni                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| Chaos            | Node upstream falz jinjetta latenza/reset/timeout/503 reali; jivvalida li s-circuit breaker jinfetaħ/jirkupra u li `checkFallbackError` jikklassifika 503 bħala fallback li jista’ jiġi rkuprat. | `RUN_CHAOS_INT=1 npm run test:chaos`         |
| Tkabbir tal-heap | ~500 stream għal kull `createSSEStream` taħt `--expose-gc`; ifalli jekk il-heap jikber lil hinn mil-limitu massimu (protezzjoni kontra OOM #3069).                                               | `npm run test:heap`                          |
| Soak ta’ k6      | Tagħbija sostnuta kontra `/api/monitoring/health`; limiti ta’ p95/żbalji.                                                                                                                        | `k6 run tests/load/k6-soak.js` (ta’ billejl) |

Orkestrat minn `.github/workflows/nightly-resilience.yml` (cron + dispatch). Fil-
`test:integration` predefinit, it-testijiet chaos u heap jaqbżu lilhom infushom (mingħajr `RUN_CHAOS_INT`/`--expose-gc`).

---

## Ara Wkoll

- [Gwida tal-Arkitettura](./ARCHITECTURE.md) — Arkitettura tas-sistema u l-mekkaniżmi interni
- [Gwida għall-Utent](../guides/USER_GUIDE.md) — Fornituri, kombinazzjonijiet, integrazzjoni mas-CLI
- [Magna tal-Kombinazzjonijiet Awtomatiċi](../routing/AUTO-COMBO.md) — Punteġġ ibbażat fuq 16-il fattur, pakketti tal-modalità
