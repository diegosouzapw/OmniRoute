# Resilience Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute għandu tliet mekkaniżmi ta' reżiljenza distinti iżda relatati. Kull wieħed għandu ambitu u għan differenti. Żomhom separati meta tkun qed tiddibagga l-imġieba tar-rottar.

![Mudell ta' reżiljenza bi 3 saffi](../diagrams/exported/resilience-3layers.svg)

> Sors: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker tal-Provider

**Ambitu:** il-provider kollu (eż., `glm`, `openai`, `anthropic`).

**Għan:** jieqaf jibgħat traffiku lil provider li qed ifalli ripetutament fil-livell upstream/tas-servizz.

**Implimentazzjoni:**

- Klassi ewlenija: `src/shared/utils/circuitBreaker.ts`
- Konnessjonijiet: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API tal-istatus: `GET /api/monitoring/health`
- API tar-reset: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabella tad-DB: `domain_circuit_breakers`

**Stati:**

- `CLOSED` — traffiku normali permess
- `DEGRADED` — it-traffiku għadu permess, iżda fallimenti elevati tal-provider qed jiġu ntraċċati; jirritorna għal `CLOSED` wara biżżejjed suċċessi, wara test tal-konnessjoni validu, jew wara l-itwal perjodu ta' żamma `OPEN` għall-aħħar tip ta' falliment (il-valur `cooldownByKind` tiegħu, inkella `resetTimeout`, × `maxBackoffMultiplier`, mill-inqas cooldown wieħed) mingħajr falliment ġdid
- `OPEN` — il-provider imblukkat temporanjament; il-combo routing jaqbeżu
- `HALF_OPEN` — il-reset timeout għadda; talba probe permessa

**Valuri default konfigurabbli (`open-sse/config/constants.ts`, esposti fi Dashboard → Settings → Resilience):**

| Klassi  | Jiddegrada wara | Jinfetaħ wara | Reset timeout |
| ------- | --------------- | ------------- | ------------- |
| OAuth   | 5 fallimenti    | 8 fallimenti  | 60s           |
| API-key | 7 fallimenti    | 12 fallimenti | 30s           |
| Lokali  | derivat         | 2 fallimenti  | 15s           |

`degradationThreshold` jikkontrolla meta provider jidħol fi `DEGRADED`; `failureThreshold` jikkontrolla meta jinfetaħ u jiġi mjaqbez. Il-profili tal-providers lokali għadhom ma humiex esposti fil-paġna tas-Settings tar-Resilience.

**Kodiċi ta' attivazzjoni (trip):** biss statusi fil-livell tal-provider `[408, 500, 502, 503, 504]`. MA jqajmux għal żbalji fil-livell tal-kont (il-biċċa l-kbira 401/403/429 — dawk jappartjenu għall-cooldown jew għall-lockout).

**Irkupru lazy:** meta `OPEN` jiskadi, `getStatus()`, `canExecute()`, `getRetryAfterMs()` jaġġornaw l-istat għal `HALF_OPEN`. L-istess qari (u l-falliment li jmiss) jġibu `DEGRADED` li jkun stale lura għal `CLOSED` b'mod gradwali. Mhu meħtieġ ebda timer fl-isfond.

---

### Provider Cooldown globali opt-in (window gate)

Saff raba', **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, default **mitfi**), iżomm memorja bejn it-talbiet (cross-request) tal-providers li qed ifallu f'`open-sse/services/providerCooldownTracker.ts`, kkonsultata mir-riżoluzzjoni tal-miri tal-combo sabiex talbiet konsekuttivi tal-combo jieqfu jergħu jgħaddu minn provider li għadu kif falla. L-entrati fil-livell tal-provider jirrispettaw il-window gate ta' `PROVIDER_PROFILES`:

| Profil  | jattiva wara (`providerFailureThreshold`) | fi ħdan (`providerFailureWindowMs`) | jkessaħ għal (`providerCooldownMs`) |
| ------- | ----------------------------------------: | ----------------------------------: | ----------------------------------: |
| OAuth   |                                      `10` |                             `15min` |                              `5min` |
| API key |                                      `15` |                             `30min` |                             `10min` |

Taħt il-limitu, il-provider **mhux** ikkunsidrat li qed jkessaħ; suċċess iħassar it-tieqa. L-entrati fil-livell tal-konnessjoni (`provider:connectionId`) iżommu minflok il-backoff esponenzjali `minRetryCooldownMs → maxRetryCooldownMs`. Sostituzzjonijiet: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Gwardja kontra r-regressjoni: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown tal-konnessjoni

**Ambitu:** konnessjoni/kont/ċavetta waħda tal-fornitur.

**Għan:** aqbeż ċavetta waħda ħażina filwaqt li konnessjonijiet oħra għall-istess fornitur jibqgħu jservu.

**Implimentazzjoni:**

- Immarka bħala mhux disponibbli: `src/sse/services/auth.ts::markAccountUnavailable()`
- Għażla: `getProviderCredentials*` fl-istess fajl
- Kalkolu tal-cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

**Oqsma għal kull konnessjoni:**

- `rateLimitedUntil` — timestamp sakemm jiskadi l-cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — kontatur ta' backoff esponenzjali

**Cooldowns default:**

- Bażi OAuth: 5s
- Bażi API-key: 3s
- API-key 429: jippreferi headers `Retry-After`/reset upstream / test ta' reset li jista' jiġi pparsjat
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Protezzjoni kontra t-thundering herd:** tipprevjeni fallimenti konkorrenzi milli jestendu żżejjed il-cooldown jew jinkrementaw darbtejn il-`backoffLevel`.

**429s ta' limitu ta' konkurrenza ma jitilgħux is-sellum tal-backoff.** `429` li l-body tiegħu jirrappurta limitu ta' konkurrenza ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) ifisser li l-kont huwa b'saħħtu iżda okkupat. `checkFallbackError()` jirritorna r-raġuni `concurrency_limited`: agħmel failover għall-konnessjoni li jmiss issa, kessaħ din għal `CONCURRENCY_LIMIT_COOLDOWN_MS` fiss (1s) jew il-hint ta' retry upstream, żomm il-`backoffLevel` mhux mibdul, u issettja `skipProviderBreaker`. Body ta' kwota espliċita xorta jirbaħ, allura body li jaqbel ukoll ma' pattern ta' kwota jibqa' verdett ta' kwota. Sejbien: `looksLikeConcurrencyLimit()` fi `src/shared/utils/classify429.ts`; verdett: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (il-`FailureKind` tal-breaker) ma nbidilx u għadu jaqra `rate_limit` għal dawn il-bodies.

**Stalli fil-kontenut tal-stream ma jkessħux il-kont.** Meta l-watchdog tal-istall tal-kontenut (`open-sse/utils/streamHandler.ts`) jaf b'stream li ma bagħat l-ebda output tal-mudell fil-ħin, `markAccountUnavailable()` jirreġistra l-iżball fuq il-konnessjoni iżda ma jissettja l-ebda cooldown: l-istall jappartjeni għal dik ir-request, ħafna drabi reasoning turn twil bla output għadu. L-operaturi jistgħu jattivaw din l-għażla mill-ġdid b'`resilienceSettings.streamStallCooldown.enabled` (default `false`).

**Frames ta' reasoning jerġgħu jibdew il-budget tal-istall tal-kontenut.** Mudell ta' reasoning jista' jaħseb għal minuti qabel l-ewwel token viżibbli tiegħu: Claude jixxandar frames `thinking_delta` li t-test tal-ħsieb tagħhom jista' jkun vojt, u l-Responses API tixxandar reasoning item wara l-ieħor. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) jagħraf dawn il-frames, u l-watchdog jerġa' jibda l-budget tiegħu fuq kull wieħed minflok ma jikkanċella t-turn. Dawn xorta mhumiex output tal-mudell, allura turn li jintemm b'reasoning biss xorta jiġi rrapurtat bħala vojt, u turn li jieqaf jagħmel reasoning u jibgħat biss heartbeats xorta jattiva l-watchdog.

Il-frames binarji `reasoningContentEvent` ta' Kiro b'sinjal mhux vojta jippreservaw din l-attività ta' reasoning tul l-executor bħala delta `reasoning_content` vojta. Is-sinjal ma jiġix mibgħut 'il quddiem. Metadata, frames mhux kompluti u sinjali vojta ma jerġgħux jibdew il-budget tal-kontenut; it-timeout indipendenti tal-stream attiv u l-kanċellazzjoni tal-klijent xorta japplikaw (`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali (MHUX cooldowns):**

- `banned` — issettjat mis-sejbien ta' keywords ipprojbiti / projbizzjoni tal-kont (ara [BAN_DETECTION](../security/BAN_DETECTION.md)), u minn tliet rifjuti konsekuttivi per-request upstream (`request_rejected`, eż. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); rifjut wieħed biss ikessaħ biss il-konnessjoni
- `expired` (jgħaddi għall-istat terminal wara retries limitati — `EXPIRED_RETRY_MAX = 3` b'backoff esponenzjali — sabiex żbalji transienti ta' OAuth jistgħu jfejqu lilhom infushom qabel ma l-kont jiġi diżattivat b'mod permanenti)
- `credits_exhausted`

Dawn jipersistu sakemm il-kredenzjali jinbiddlu jew operatur jerġa' jissettjahom. M'għandekx tissostitwixxi stati terminali b'istat transienti ta' cooldown.

**Irkupru lazy:** meta `rateLimitedUntil` ikun għadda, il-konnessjoni ssir eliġibbli mill-ġdid. Fuq użu b'suċċess, `clearAccountError()` iħassar l-oqsma kollha tal-iżball.

### Il-ħajt tal-użu ta' Claude OAuth: lane b'prijorità aktar baxxa + reset tal-limitu tas-sessjoni

**Ambitu:** konnessjoni waħda ta' abbonament Claude (OAuth). Iż-żewġ karatteristiċi huma **opt-in għal kull konnessjoni** (Editja l-konnessjoni → sezzjoni Claude → `lowPriorityMode` / `autoLimitReset` fi `providerSpecificData`, it-tnejn mitfija bħala default) u jirriflettu l-kmandi `/low-priority` u `/limit-reset` ta' Claude Code (wire contract maħud minn Claude Code 2.1.263).

**Implimentazzjoni:**

- Magni tal-istat + klassifikazzjoni tar-rispons: `open-sse/services/claudeLowPriority.ts`
- Klijent tal-istatus/claim tal-reset: `open-sse/services/claudeLimitReset.ts`
- Hook tal-executor (injezzjoni ta' header + retry bl-istess kont): `open-sse/executors/base.ts::execute()`
- Persistenza tal-opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** il-ħajt tal-użu tal-5 sigħat — `429` li l-headers tiegħu jġorru `anthropic-ratelimit-unified-status: rejected` u, meta l-kont ikun eliġibbli, `anthropic-ratelimit-unified-slow-offer: treatment`. Xejn ma jintbagħat qabel dak l-ewwel 429 tal-ħajt; 429 ta' burst mingħajr headers unified jgħaddi mill-mogħdija normali tal-cooldown.

**Lane b'prijorità aktar baxxa** (`lowPriorityMode`):

- Fuq il-429 tal-ħajt l-esekutur jaċċetta l-offerta u mill-ewwel jerġa' jipprova l-**istess**
  kont b'`anthropic-usage-limit: slow`; il-korsija tibqa' attiva sal-`anthropic-ratelimit-unified-reset`
  mħabbar (+60s grazzja) u kull talba f'dik it-tieqa ġġorr il-header. Il-429 interċettat qatt ma
  jasal għal `handleChatCore`, għalhekk il-konnessjoni **ma** titqiegħedx f'cooldown u ma titneħħax
  mir-rotazzjoni.
- `anthropic-ratelimit-unified-slow-status` fuq risposti sussegwenti: `active` / `not_needed`
  iżommu l-korsija; `slot_busy` (429) jew `529` jistennew skond il-`anthropic-ratelimit-unified-slow-retry-after`
  tas-server (default 20s, clamp 5–600s, ±30% jitter) u mbagħad jerġgħu jippruvaw, limitat
  mill-`anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp 1 min–6 sigħat) —
  wara dan il-korsija tispiċċa u cool-off ta' 10 minuti jimblokka l-akċettazzjoni mill-ġdid.
  L-attesa hija wkoll ikkappata minn dak li jifdal mit-timeout tal-bidu upstream tat-talba stess
  (`resolveFetchStartTimeout`, 10 minuti b'mod default) nieqes marġni ta' 5 s: mingħajr dak il-kap,
  il-max-wait default ta' 20 minuta jgħix itwal mit-talba u s-sleep jigi abortit f'nofs
  l-attesa, u jitla' `TimeoutError` minflok tmiem graċjuz ta' `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rollover tat-tieqa tal-5 sigħat,
  jew `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (li jispiċċaha bħala
  `extra_usage` fuq kwalunkwe status, peress li l-overage imħallas issa jkopri l-ħajt) jispiċċaw
  il-korsija; ir-rispons imbagħad jgħaddi għall-mogħdija normali tal-cooldown. `budget_exhausted`
  jibqa' memorizzat sal-budget reset mħabbar (≤ 8 ijiem).
- Iċ-ċekk tal-ħajt isir wara r-retries intra-attempt mmexxija mill-400 tal-esekutur stess
  (editjar tal-kontest, clamps ta' thinking/effort, auto-learn tal-parametri), għalhekk 429
  tal-ħajt li joħroġ biss f'waħda minn dawk ir-retries jibqa' jiġi interċettat minflok jasal
  għall-mogħdija tal-cooldown.
- L-istat huwa in-memory għal kull konnessjoni (restart jiswa 429 tal-ħajt żejjed biex terġa'
  tiġi aċċettata).

**Reset tal-limitu tas-sessjoni** (`autoLimitReset`, jiġi ppruvat qabel il-korsija meta it-tnejn ikunu attivi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blokk `juniper_tide`;
  meta `arm: "reset"` u `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` b'
  `{ "program": "juniper_tide" }` (UUID tal-organizzazzjoni minn
  `providerSpecificData.organizationUUID`, fallback ta' bootstrap).
- `result: reset|not_limited` → it-talba tiġi rrepetuta b'veloċità sħiħa (mingħajr il-header slow).
  `already_used` / `not_offered` jimmemoizzaw `next_available_at` (default ġimgħa); kwalunkwe
  falliment jagħmel backoff ta' 15-il minuta. Ir-reset huwa darba fil-ġimgħa u xorta waħda jgħodd
  lejn il-limitu ġimgħali.

Gwardji tar-regressjoni: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità tas-sessjoni (#7274)

**Ambitu:** sessjoni waħda tal-klijent (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) mwaħħla ma' konnessjoni waħda, għal **kwalunkwe** fornitur.

**Skop:** iżżomm aġent multi-turn (Claude Code, aider, aġenti apposta) fuq l-istess kont matul it-talbiet, u b'hekk inaqqas it-telf ta' kontest bejn il-kontijiet u 429s ripetuti ta' cold-start fuq fornituri b'istat ta' sessjoni għal kull kont.

**Implementazzjoni:**

- Riżoluzzjoni tat-TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Għażla/ħolqien tal-pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazzjoni tal-header (ġenerika, kwalunkwe fornitur): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella tal-pin ippersistita: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (TTL globali f'ms, `0` jiskornaha) — `src/lib/db/settings.ts`. Rinominata mill-`codexSessionAffinityTtlMs` li kienet biss għal Codex permezz tal-migrazzjoni `124_generic_session_affinity_ttl.sql`, li iġġorr 'il quddiem kwalunkwe TTL ta' Codex konfigurat qabel bħala d-default il-ġdid.

Qabel #7274, `resolveSessionAffinityTtlMs()` kienet tirritorna b'mod iebes `0` għal kull fornitur ħlief `codex`, għalhekk is-setting tat-TTL (u l-headers tas-sessjoni) ma kellhom l-ebda effett imkien ieħor, għalkemm il-mekkaniżmu tal-pinning u l-estrazzjoni tal-header kienu diġà agnostiċi għall-fornitur. Il-fiss neħħa dak l-early-return; it-TTL issa japplika b'mod uniformi għal kull fornitur ladarba jiġi stabbilit globalment 'il fuq minn `0`.

It-tliet headers tal-affinità tas-sessjoni qatt ma jintbagħtu lejn l-upstream — l-esekuturi jibnu l-headers upstream tagħhom stess mill-bidu nett minflok jgħaddu dawk tal-klijent, għalhekk dan jibqa' biss identifikatur ta' korrellazzjoni interna.

### Leases esklussivi ta' konnessjoni għal sessjonijiet mmaniġġjati

**Ambitu:** klijent/sessjoni HTTP mmaniġġjat attiv wieħed jippossjedi konnessjoni OmniRoute eliġibbli waħda.

**Skop:** jipprovdi pussess esklussiv u durabbli ta' konnessjoni għal klijenti li jeħtieġu
barriera iebsa ta' routing matul it-talbiet. Dan jiddifferi mill-affinità tas-sessjoni, li hija
preferenza artab għall-kontinwità: lease esklussiv jippersisti l-istat tal-lifecycle f'SQLite,
jinfurza uniċità globali tal-sid attiv u tal-konnessjoni attiva, u jirrifjuta ġenerazzjoni stale
qabel id-dispatch lejn il-fornitur.

Il-karatteristika hija opt-in għal kull API key. Ċavetta mmaniġġjata trid ikollha l-ambitu
`lease:exclusive` u lista `allowedConnections` espliċita u mhux vojta. Kwalunkwe klijent HTTP jista'
juża l-endpoint tal-lifecycle; ma hux meħtieġ ebda isem tal-klijent, user-agent, fornitur, metodu
OAuth, jew mudell. Il-lease jippossjedi konnessjoni, mhux mudell, għalhekk bidla fil-mudell iżżomm
il-binding sakemm il-konnessjoni tibqa' eliġibbli b'mod ordinarju. Ir-regoli normali tal-mudell,
tal-kwota, tas-saħħa, tal-cooldown u tal-allowlist jibqgħu awtoritattivi u jistgħu jċaqilqu
l-istess ġenerazzjoni lejn konnessjoni eliġibbli ħielsa oħra.

Iċ-ċiklu tal-ħajja huwa `POST /api/v1/session-leases` b'azzjonijiet JSON `acquire`, `renew`, u `release`.
It-talbiet ta' inferenza mmaniġġjata jippreżentaw il-valur opaku `X-OmniRoute-Lease-Owner` u l-`X-OmniRoute-Lease-Generation` eżatt. Is-sid juża `vlo_` segwit minn 43 karattru base64url; biss il-hash SHA-256 tiegħu jinħażen. Kull barriera finali ta' dispatch torbot ukoll l-ID tal-ċavetta API awtentikata u l-ID tal-konnessjoni attiva. Il-headers tal-kontroll tal-lease jitneħħew mill-logs, mis-snapshots miżmuma tat-talbiet, u mill-headers tal-eżekutor upstream.

Jekk ir-rottar ordinarju jkollu kandidati mmaniġġjati eliġibbli iżda kull kandidat ħieles ikun okkupat minn lease attiv barrani, OmniRoute tirritorna HTTP `429`, kodiċi ta' kapaċità-tal-lease-mhux-disponibbli, stat ta' stennija-għall-kapaċità, u `Retry-After` limitat derivat mill-eqdem skadenza rilevanti. L-eliġibilità vojta ordinarja mhijiex kontenzjoni tal-lease u żżomm is-semantika eżistenti tal-iżbalji tar-rottar tagħha.

Mekkaniżmi relatati jibqgħu separati:

- L-okkupazzjoni tas-sessjonijiet OAuth hija distribuzzjoni artab lokali għall-proċess għal kontijiet OAuth.
- Is-semafori tal-kont jagħtu permessi ta' konkurrenza tat-talbiet u jispiċċaw meta talba titlesta.
- Il-leases esklussivi tas-sessjonijiet mmaniġġjati huma sjieda durabbli taċ-ċiklu tal-ħajja b'barriera ta' ġenerazzjoni.

---

## 3. Lockout tal-Mudell

**Ambitu:** it-tripla fornitur + konnessjoni + mudell.

**Ambitu taċ-ċavetta skond l-istatus:** l-istatus li falla jiddeċiedi f'liema ċavetta jikteb lockout (`resolveLockoutScope()` f'`open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sinjal ta' kwota jew ta' dritt — issakkar il-**familja tal-kwota**: għal codex l-ambitu kollu `codex` / `spark` (kull mudell `gpt-5*` tal-konnessjoni), għal fornituri oħra `getQuotaScopedModelForProvider()`.
- `404` jissakkar il-mudell biss (`getModelLockKey()` jispeċifika `not_found`).
- Kwalunkwe status ieħor — fallimenti ta' trasport/server `5xx` u l-`502` sintetizzat minn OmniRoute nnifsu mill-validazzjoni tal-kwalità — jissakkar biss it-tuple **eżatta** fornitur/konnessjoni/mudell. Stream ħażina fuq mudell wieħed mhijiex prova dwar il-kwota tal-kont; qabel din ir-regola, risposta waħda vojta fuq `codex/gpt-5.6-luna` kienet tneħħi kull mudell `gpt-5*` ta' dik il-konnessjoni mill-rottar għal 2–30 min (b'eskalazzjoni) filwaqt li l-kwota tagħha ma kinitx immissa.
- L-għażla `scope` espliċita ta' min jagħmel is-sejħa dejjem tirbaħ (Antigravity jgħaddi `"exact"`).

**Skop:** tevita li tiġi diżattivata konnessjoni sħiħa meta mudell wieħed biss ma jkunx disponibbli jew ikun limitat mill-kwota.

**Eżempji:**

- Fornituri b'kwota għal kull mudell li jirritornaw 429
- Fornituri lokali li jirritornaw 404 għal mudell wieħed nieqes
- Fallimenti ta' permessi ta' mod/mudell speċifiċi għal fornitur (eż., il-modi ta' Grok)

**Implimentazzjoni:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard tal-Cooldowns tal-Mudell (v3.8.0)

UI: Settings → Cooldowns tal-Mudell (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Telenka l-lockouts attivi ma': provider, connection, model, reason, expiresAt. L-operaturi jistgħu jerġgħu jattivaw mudell manwalment mill-karta.

**REST API:**

- `GET /api/resilience/model-cooldowns` — jelenka l-lockouts attivi
- `DELETE /api/resilience/model-cooldowns` — riattivazzjoni manwali. Korpu: `{provider, connection, model}`. Awtentikazzjoni: management.

### Maniġer tal-Cooldowns

UI: Monitoraġġ → Maniġer tal-Cooldowns (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Paġna waħda għal kull konnessjoni li tkun barra mill-rottar għal raġuni temporanja, minflok ma tiftaħ il-paġna ta' kull fornitur. Telenka l-cooldowns tal-konnessjonijiet, il-lockouts tal-mudelli u l-istati terminali, tnaddafhom skond il-konnessjoni, għal għażla magħżula, jew għall-konnessjonijiet kollha ta' fornitur, u teditja r-regoli tal-cooldown l-aktar aġġustati: `streamStallCooldown.enabled` u l-cooldown bażi u l-passi massimi ta' backoff ta' `connectionCooldown` għal OAuth / API-key (insejvjati permezz ta' `PATCH /api/resilience`). L-istati terminali (`banned`, `expired`, `credits_exhausted`) jiġu elenkati iżda qatt ma jitnaddfu hawn.

**REST API** (`src/lib/resilience/cooldownManager.ts`, awtentikazzjoni: management):

- `GET /api/resilience/cooldowns[?provider=]` — konnessjonijiet bl-istatus, il-cooldown li jifdal, il-livell ta' backoff, it-tip tal-aħħar żball u l-lockouts tal-mudelli (mingħajr kredenzjali)
- `POST /api/resilience/cooldowns` — korpu `{connectionIds: string[]}` jew `{all: true, provider?}`; jirritorna `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI tal-issettjar tal-lockout + rkupru b'tnaqqis bis-suċċess (v3.8.23)

Il-lockout tal-mudell mar min imġieba hardcoded dejjem mixgħula għal karatteristika kompletament konfigurabbli u opt-in, bil-karta tal-issettjar tagħha stess u mogħdija ta' rkupru li tfejjaq lilha nnifisha.

**Karta tal-issettjar:** Settings → Lockout tal-Mudell (`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Din hija **distinta** mill-`ModelCooldownsCard` għal qari biss hawn fuq (li biss _telenka_ l-lockouts attivi) — il-karta l-ġdida _tikkonfigura l-parametri_. Il-defaults jinsabu f'`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Issettjar               | Default                          | Tifsira                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Swiċċ prinċipali — il-lockout tal-mudell huwa **mitfi b'mod default**.    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusijiet upstream li jiġu meqjusa bħala falliment b'ambitu tal-mudell. |
| `baseCooldownMs`        | `120_000` (120 s)                | It-tul inizjali tal-lockout għall-ewwel falliment.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limitu massimu fuq il-cooldown eskalat.                                   |
| `maxBackoffSteps`       | `10`                             | Passi massimi ta' eskalazzjoni ta' backoff esponenzjali.                  |
| `useExponentialBackoff` | `true`                           | Jekk fallimenti ripetuti jeskalawx il-cooldown b'mod esponenzjali.        |

L-issettjar jippersisti permezz tal-ħażna normali tal-issettjar u jiġi vvalidat permezz tal-iskema tal-issettjar tar-resilience; il-karta tillimita `baseCooldownMs`/`maxCooldownMs` (bi `maxCooldownMs ≥ baseCooldownMs`) u `maxBackoffSteps`.

**Rkupru b'tnaqqis bis-suċċess:** irkupru **mhux** biss skadenza tat-timer. Risposta b'saħħitha tnazżel il-għadd ta' fallimenti tal-mudell lura 'l isfel, sabiex mudell li rkupra f'nofs it-tieqa jieqaf jeskala (u jitnaddaf) qabel ma jiskadi t-timer tiegħu. Fuq mira ta' combo b'suċċess, `open-sse/services/combo.ts` issejjaħ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), li **tnaqqas bin-nofs** il-`failureCount` maħżun (`Math.floor(failureCount / 2)`); meta jasal għal `0` l-entratura tal-lockout titħassar għal kollox. Il-kontroparti `recordModelLockoutFailure()` iżżid il-għadd (u teskalah il-cooldown) f'każ ta' fallimenti fi ħdan it-tieqa tal-eskalazzjoni. Dan it-tnaqqis bis-suċċess huwa żjade fuq l-iskadenza sempliċi tat-timer — kull mogħdija tista' terġa' tattiva mudell.

**Stat:** il-lockouts jinżammu **fil-memorja** (`Map`s għal kull proċess ta' `ModelLockoutEntry` biċ-ċavetta `provider:connectionId:model`, il-locks b'ambitu eżatt bi `provider:connectionId:exact:model`), mhux ippersistjati fid-DB — jintilfu fuq restart. L-_issettjar_ huwa ppersistjat; l-_istat_ attiv tal-lockout huwa efiimeru.

---

## 4. Kontroll tal-Konkurrenza Quota-Share (v3.8.36)

Kontijiet ta' abbonament (GLM, MiniMax, eċċ.) spiss jaċċettaw biss madwar 1–3 talbiet konkurrenti; li tgħaddi minn dan jiskatta żbalji 429 u cooldowns. Dan huwa akut taħt combos **quota-share** (`qtSd/…`), fejn diversi API keys jaqsmu kont upstream wieħed. Tliet saffi jipprevjenu li kont kondiviż jiġi mgħerraq.

### Limitu tal-konkurrenza għal kull konnessjoni (`max_concurrent`)

Kull konnessjoni ta' provider tista' tiddikjara limitu massimu `max_concurrent`
(`provider_connections.max_concurrent`, issettjat fil-modal tal-konnessjoni / API / DB).
Ħallih vojt biex ma jkunx hemm limitu. Dan huwa l-uniku kontroll li jmexxi s-saff
tas-serjalizzazzjoni hawn taħt — issettjah skont il-konkurrenza reali tal-kont
(eż. GLM ~1, MiniMax ~2).

### Limiti tal-konkurrenza għal kull mudell (`modelConcurrency`)

Konnessjoni tista' wkoll tiddikjara limiti eżatti tal-konkurrenza għal kull mudell
ġol-mappa `rateLimitOverrides` tagħha:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Issettjah fil-modal tal-konnessjoni (**Rate limit overrides → Limiti tal-konkurrenza
għal kull mudell**, `model=cap` wieħed f'kull linja) jew permezz ta'
`PATCH /api/providers/[id]` bl-istess struttura JSON. Semantika tal-keys:

- **Fuq il-konnessjoni kollha vs speċifiku għal mudell:** `maxConcurrent` jibqa'
  l-limitu kondiviż fuq il-konnessjoni kollha. Meta jitkabbel it-tnejn, iż-żewġ
  gates jinkisbu b'mod atomiku fl-istess gate kompost
  (`global → provider → account → model`); l-imġieba effettiva hija l-limitu
  l-aktar strett applikabbli.
- **Korrispondenza eżatta tal-key tal-mudell:** il-key hija s-string tal-mudell
  li tgħaddi lill-executor wara r-riżoluzzjoni tar-rotta — normalment l-id
  sempliċi tal-mudell upstream (`glm-5`), mhux alias `provider/model` min-naħa
  tal-klijent (`zai/glm-5` ma jaqbilx ma' `glm-5`). Il-valuri huma limiti ta'
  talbiet konkurrenti espressi b'numri sħaħ pożittivi.
- **Kjuwi lokali, ebda discovery:** it-talbiet żejjed jidħlu fil-kju lokalment
  bis-semantika eżistenti tal-kju/timeout (żbalji ta' ammissjoni tat-tip
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ma jiskopri u lanqas
  jiddeżduċi l-politika upstream — jinfurza l-limiti eżatti li l-operatur ikun
  ikkonfigura. Gate ta' mudell saturat qatt ma jiddiżattiva l-provider u qatt ma
  joħloq lockout permanenti tal-mudell; l-imġieba upstream ta'
  429/cooldown/fallback tibqa' l-aħħar difiża għall-iżbalji.
- **Ambitu għal kull konnessjoni u għal kull proċess:** il-limiti huma għal kull
  konnessjoni fid-database u jinżammu fil-memorja, għalhekk żewġ konnessjonijiet
  li jużaw mill-ġdid l-istess API key upstream ma jikkoordinawx ma' xulxin.
- **Mhux ikkonfigurat ifisser l-ebda bidla:** li tiġi moħlika l-mappa (jew li
  l-kamp tad-dashboard jitħalla vojt) ma żżid l-ebda gate tal-mudell.
  Konfigurazzjoni ta' eżempju mingħajr ma tiġi asserita ebda limitu universali
  tal-provider:

```text
glm-5=1
glm-4.7=3
```

### Serjalizzazzjoni tat-talbiet quota-share

Meta dispatch quota-share jimmira lejn konnessjoni li tiddikjara `max_concurrent`
pożittiv, it-talbiet konkurrenti lejn dak il-**kont** jiġu serjalizzati permezz
ta' semaphore għal kull konnessjoni (key `qsconn:<connectionId>`): it-talbiet
żejjed **jistennnew fil-kju** minflok jegħrqu l-kont. Huwa **fail-open** — kju
saturat jew timeout jipproċedi mingħajr slot minflok li qatt jirrifjuta talba li
tista' tintbagħat. Ixgħel jew itfi minn **Settings → Resilience → Konkurrenza
quota-share għal kull konnessjoni** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
mixgħul b'mod default). Mingħajr limitu `max_concurrent`, l-imġieba ma tinbidelx.

> Il-gate tar-rotta quota-share (`selectQuotaShareTarget`, DRR + P2C) huwa nnifsu
> fail-open u biss _jbaxxi l-prijorità_ ta' konnessjoni li waslet fil-limitu
> tagħha — b'pool ta' konnessjoni waħda ma jistax jimponi limitu assolut,
> għalhekk dan is-semaphore huwa li fil-fatt jikkontieni l-għargħar.

### Retry konxju tal-cooldown għal combos

Għal kull strateġija combo (meta tkun attivata), talba li kienet se tikkristalizza
429 minħabba cooldown tranżitorju QASIR tistennieh jgħaddi u terġa' tibgħat
minflok tirritorna l-429 — dan jkopri twieqi TPM/RPM ta' klassi Gemini (~60s
retry-after) fuq combos ta' diversi mudelli, eż. meta ż-żewġ targets ta' combo
ta' 2 mudelli jitolbu limitu tar-rata għal kull mudell. Limitat minn
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) fi
**Settings → Resilience**. Qatt ma jistenna fuq `quota_exhausted` (imblukkat
sal-lejl) jew raġunijiet ta' awtentikazzjoni/mhux misjub.

L-istess gate jkopri l-każ ta' qabel id-dispatch (#16319): meta kull target ta'
combo jiġi mqabeż qabel ma jsir ebda tentattiv minħabba li l-mudell tiegħu jinsab
f'lockout tranżitorju qasir, il-mogħdija ta' żero tentattivi tistenna li jgħaddi
l-lockout taħt l-istess limiti u terġa' tibgħat, minflok twieġeb
`503 ALL_TARGETS_SKIPPED` mingħajr ebda ħjiel. Meta ma tkunx permessa ebda
stennija (limitu massimu, tentattivi jew baġit eżawriti, jew il-funzjonalità
mitfija), ir-risposta terminali tittejjeb għal `429 rate_limit_error` li ġġib
magħha `retry_after` / `reset_at` mill-eqdem skadenza ta' lock tranżitorju;
il-locks tal-kwota, awtentikazzjoni u mhux-misjub iżommu l-503 mingħajr ħjiel.

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

## 5. Kontroll tal-Ammissjoni tal-Kju tat-Talbiet (v3.8.49 · issue #6593)

**Skop**: il-kju lokali tal-limitu tar-rata għal kull provider+konnessjoni (`open-sse/services/rateLimitManager.ts`, mibbni fuq Bottleneck), saff wieħed taħt it-tliet mekkaniżmi ta' hawn fuq.

**`maxWaitMs` jillimita l-istennija fil-kju; `executionMaxWaitMs` jillimita l-eżekuzzjoni.**
It-tnejn huma deliberatament separati, u l-ebda wieħed minnhom ma jitma' lill-ieħor.

`resilienceSettings.requestQueue.maxWaitMs` huwa l-**baġit tal-istennija fil-kju**: jkopri l-istennija għal slot tal-provider u mbagħad il-qagħda QUEUED, u t-tajmer tiegħu jitneħħa fil-mument li x-xogħol joħroġ minn QUEUED u jibda jiġi eżegwit (`rateLimitManager.ts`, `wrappedFn`). Talba li taqbeżu qatt ma tasal fl-upstream. Default 30000ms, fornut minn `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` f'`src/lib/resilience/settings.ts` u ffissat minn `tests/unit/ratelimit-admission-control-6593.test.ts`, għalhekk bidla fih tagħmel dak it-test aħmar minflok ma tħalli dan il-paragrafu jiskadi bil-moda.

`resilienceSettings.requestQueue.executionMaxWaitMs` huwa dak li Bottleneck jirċievi bħala l-`expiration` tax-xogħol, li t-tajmer tiegħu jibda biss wara d-dispatch. Huwa salvagwardja għal eżekuturi mingħajr timeout tal-upstream tagħhom stess, u jitgħolla sat-timeout tal-bidu tal-fetch tal-eżekutur innifsu meta dak jkun itwal, sabiex ma jistax jaqta' rispons b'saħħtu li diġà għaddej. Default 600000ms (10 min).

Li ddahħal il-baġit tal-kju fl-`expiration` huwa dak li kien joqtol il-gateways mhux inkrementali f'nofs it-titjira — huma leġittimament jaħdmu għal minuti qabel l-ewwel bytes — u hu għalhekk li expiration titfaċċa bħala `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) filwaqt li l-baġit tal-kju jġorr il-kodiċi tat-timeout tal-kju. Jista' jiġi overridden kull wieħed minnhom permezz ta' `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) jew id-dashboard (**Settings → Resilience**). It-tnejn jiġu kklemjati għal 1ms–24h meta jiġu normalizzati.

**Preċedenza, għal it-tnejn:** il-varjabbli env tipprovdi biss id-_default_. Valur persistit f'`resilienceSettings.requestQueue` (dashboard / API patch, maħżun f'`key_value`) jirbaħ fuqu, u `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` għal kull konnessjoni jirbaħ fuq dak. L-issettjar tal-varjabbli env fuq deployment li diġà għandu valur persistit għalhekk ma jibdel xejn — neħħi jew aġġorna s-setting persistit minflok.

Il-żmien li talba tgħaddi fil-kju huwa limitat minn `maxWaitMs`; `maxQueueDepth` hawn taħt jillimita kemm sejħiet jistgħu jkunu kkewwati f'daqqa.

**Erġa' pprova ddikjarat fil-body: pacing vs lockout.** Body ta' 429 jista' jissemma l-istennija tiegħu stess (Gemini `RetryInfo.retryDelay`, test "retry after Ns"), li `updateFromResponseBody` jaqra. Stennija li taqbel fil-`maxWaitMs` tal-konnessjoni hija pacing: il-limiter joħtolli r-riżerva tiegħu għal dak iż-żmien u s-sejħiet kkewwati jitbagħtu meta terġa' timtle. Stennija itwal minn `maxWaitMs` mhijiex xi ħaġa li l-kju jista' jistenna sal-aħħar — Gemini tweġiba għal kwota ta' kuljum eżawrita bi `retryDelay: "86399s"`. Il-`Retry-After` trasmess fuq il-429 mibni mill-ġdid (#16528) diġà jagħmel lill-magna tal-fallback tagħlaq il-mudell għal dik it-tieqa, iżda li l-limiter jiġi ppawzat għaliha wkoll xorta jwaqqaf kwalunkwe sejħa li tasal għall-key bikri (wara reset tar-reżiljenza, per eżempju) għall-`maxWaitMs` kollu. Meta stennija bħal din tiġi minn dettal Google `RetryInfo` ttajpjat (il-provenjenza `google_rpc_retry_info`) u l-limiter tal-key diġà huwa skopjat għall-mudell (ara `getLimiterKey`), il-429 minflok isir lockout tal-mudell fuq dik il-konnessjoni (`lockModelForLongBodyRetry` f'`open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitat għal 24h), u l-limiter jitħalla mhux ppawzat. L-għażla tal-kont taqbeż fuq dak il-lock permezz ta' `isModelLocked()`, u hekk tagħmel ukoll il-gate tal-qabel id-dispatch tal-combo għal targets mwaħħlin mal-konnessjoni. Fuq antigravity, li l-limiter tiegħu huwa għal kull familja ta' kwota, il-lock huwa fuq il-mudell eżatt, bħall-locks l-oħra tal-kwota tiegħu. L-isem li l-klijent talab jiġi mblukkat ukoll meta alias jirriżolvih għal dak il-mudell, għax dawk il-kontrolli jużaw l-isem mitlub; jiġi mblukkat eżattament (`lockExactModel`), għalhekk alias li jaqbeż familja ta' kwota ta' antigravity jew skop ta' codex qatt ma jimblukka tiegħu stess. Ħjiel fit-test, `retryDelay` mhux ttajpjat, jew limiter maqsum mill-konnessjoni kollha iżommu l-pawza. Meta l-limiter li l-mogħdija tal-429 għadu kif bena tippawza, caller li l-ħin li fadal lu fil-kju jintemm qabel ma tispiċċa l-pawza jiġi mrefuġat minnufih bil-kodiċi tat-timeout tal-kju (`checkLimiterPause`) minflok ma jistenna dak iż-żmien sal-aħħar; it-tmiem irreġistrat huwa ankrat qabel ma jinbena l-limiter, fejn Bottleneck jibda l-arloġġ tar-refresh tiegħu, u kwalunkwe bidla aktar tard fir-riżerva tinsieh. Kopert minn `tests/unit/rate-limit-long-body-retry-lockout.test.ts` u `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limitu tal-ammissjoni opt-in (ġdid).** `resilienceSettings.requestQueue.maxQueueDepth` jillimita kemm talbiet jistgħu jibqgħu kkewwati (għadhom ma ġewx dispatched) għal provider+konnessjoni waħda f'daqqa. Meta l-kju diġà jkun fih `maxQueueDepth` talbiet, talba ġdida tiġi mrifużata malajr b'żball ttajpjat `code: "RATE_LIMIT_QUEUE_FULL"` **qabel** qatt ma tasal f'`limiter.schedule()` — allura r-rifjut huwa rħis u jiġri qabel kwalunkwe xogħol ta' kompressjoni tal-prompt / traduzzjoni downstream għal dik it-talba. Default `0` = diżabilitat, u b'hekk jippreżerva l-imġiba eżistenti ta' kju bla limitu; limitat 0–100000. Override permezz ta' `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) jew `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Il-kontroll tal-ammissjoni innifsu huwa funzjoni pura (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) sabiex ikun jista' jiġi ttestjat b'unit tests mingħajr limiter Bottleneck reali.

> L-RFC li fetaħ #6593 ppropona wkoll flag `bypassCompressionOnRateLimit`. Il-pipeline `open-sse/services/compression/` ta' dan ir-repo hija kompressjoni tal-prompt/kuntest fuq it-talba LLM li toħroġ (`chatCore.ts`, madwar il-blokka `resolveCompressionSettings`/`selectCompressionStrategy`), mhux kompressjoni ta' rispons HTTP fuq korpi 429 sinterizzati — m'hemm l-ebda mogħdija ta' kodiċi li tikkorrispondi ma' flag bypass letterali. Dak il-pass tal-kompressjoni tal-prompt bħalissa jaħdem wkoll _qabel_ `withRateLimit()` fil-pipeline tat-talba, għalhekk ir-riordnar biex jiġi msaħħab f'każ ta' rifjut minħabba kju mimli hija bidla separata u akbar mill-ambitu ta' din l-issue; apposta **ma** ġietx implimentata hawn u ġiet ħallata bħala follow-up jekk il-qligħ fl-iffrankar tal-CPU jiswa r-riskju tar-riordnar.

### Xibka ta' Sigurtà għall-Attivazzjoni Awtomatika tar-Rate-Limit u Protezzjoni tal-Konnessjoni (`rateLimitProtection`)

**Xibka ta' sigurtà għall-attivazzjoni awtomatika** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, default `true`):
B'mod default, OmniRoute jattiva awtomatikament il-protezzjoni tal-kju tar-rate-limit għall-konnessjonijiet kollha attivi tal-fornituri b'ċavetta API (`getProviderCategory(provider) === "apikey"`). Dan jiżgura li t-talbiet li jaslu lejn ċwievet API upstream sensittivi għar-rata jitqiegħdu f'kju u jiġu mrażżna permezz ta' Bottleneck minflok ma jisplodu fi żbalji 429 upstream. Ix-xibka ta' sigurtà tista' tiġi mbażżla permezz tal-varjabbli tal-ambjent `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` jiddiżattiva, `true`/`1`/`on` jisfurzaha mixgħula), li għandu preċedenza fuq l-issettjar persistenti fid-dashboard (**Settings → Resilienza** / `PATCH /api/resilience`).

**Semantika ta' `rateLimitProtection` għal kull konnessjoni:**
Il-protezzjoni tar-rate-limit għal kull konnessjoni tiġi rrakkjata permezz tal-kamp boolean `rateLimitProtection` fuq il-konnessjonijiet tal-fornituri (persistenti bħala `rate_limit_protection` f'SQLite):

- **Mixgħul esplicitament (`rateLimitProtection === true`)**: Il-protezzjoni tar-rate-limit hija attivata b'mod esplicitu għal din il-konnessjoni, irrispettivament mill-kategorija tal-fornitur jew jekk ix-xibka ta' sigurtà għall-attivazzjoni awtomatika hix mixgħula.
- **Mitfi esplicitament (`rateLimitProtection === false`)**: Jiddiżattiva l-protezzjoni esplicita, iżda **ma** joħroġx konnessjoni attiva b'ċavetta API minn taħt ix-xibka ta' sigurtà globali għall-attivazzjoni awtomatika. F'`reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` u `undefined` huma ekwivalenti: biss `rateLimitProtection === true` jiġi ttrattat bħala override esplicitu. Jekk `rateLimitProtection` ikun `false` (jew mhux issettjat), konnessjoni attiva b'ċavetta API xorta waħda tissodisfa l-kundizzjoni tal-attivazzjoni awtomatika u tibqa' protetta mir-rate-limit.
- **L-ebda opt-out għal konnessjoni waħedha**: Operatur bħalissa ma jistax jesprimi "din il-konnessjoni waħedha attiva b'ċavetta API għandha taħdem mingħajr protezzjoni tal-kju tar-rate-limit" filwaqt li jżomm l-attivazzjoni awtomatika attiva għall-oħrajn. Biex il-konnessjonijiet b'ċavetta API jimxu kompletament mingħajr kjus tar-rate-limit, ix-xibka ta' sigurtà trid tintefa' globalment (`RATE_LIMIT_AUTO_ENABLE=false` jew `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Mogħdijiet ta' kitba appoġġjati:**

- **`POST /api/rate-limits`**: Il-mogħdija appoġġjata ta' kitba għall-ġestjoni biex tbiddel `rateLimitProtection` għal konnessjoni (`{ connectionId: string, enabled: boolean }`). Meta tiġi msejħa b'`enabled: true`, tixgħel il-protezzjoni esplicita; meta tiġi msejħa b'`enabled: false`, tneħħi l-protezzjoni esplicita (għalkemm il-konnessjonijiet attivi b'ċavetta API jibqgħu koperti tax-xibka ta' sigurtà globali jekk l-attivazzjoni awtomatika tkun mixgħula).
- **`PUT /api/providers/[id]`**: Apposta **ma** jaċċettax u lanqas jibdel `rateLimitProtection` (#11278). L-aġġornament tal-metadata tal-konnessjoni tal-fornitur permezz ta' `PUT /api/providers/[id]` qatt ma jibdel l-istat persistenti tal-protezzjoni tar-rate-limit.

---

## 6. Watchdog tat-throughput ta' stream bil-mod (#9709)

Il-gwardja fakultattiva `resilienceSettings.streamRecovery.throughputWatchdog`
tiskopri upstream li għadu jibgħat chunks iżda qed jipproduċi output tal-assistent
taħt ir-rata konfigurata ta' output utli. Hija intenzjonalment distinta mit-timeout
ta' inattività (idle): il-heartbeats u l-metadata ma jirrisettjawx l-ebda timer u ma
jingħaddux bħala progress. Hija wkoll distinta mid-deadline iebsa tat-tentattiv
(#9153), li tibqa' limitu massimu ta' sigurtà assolut irrispettivament mill-kwalità
tal-output.

Il-watchdog teħtieġ perjodu ta' warm-up segwit minn tieqa rolling kompluta qabel ma
tista' tagħmel abort. Tgħodd id-deltas tat-test mill-avvenimenti tal-output ta' Chat
Completions u tar-Responses API (proxy konservattiv tal-bytes UTF-8), tinjora
avvenimenti li jirrappurtaw biss l-użu u avvenimenti vojta, u tissospendi l-ġudizzju
waqt li jkunu għaddejjin avvenimenti ta' tool-call jew ta' reasoning. Hija
diżattivata bil-default u tista' tiġi attivata b'
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; it-tieqa, il-warm-up, ir-rata minima, u
l-output minimu li jista' jiġi mkejjel huma delimitati mis-saff normali ta'
normalizzazzjoni tas-settings tar-reżiljenza.

Meta tkun attivata, abort tal-watchdog tiġi applikata biss għat-tentattiv upstream
attiv. Qabel kwalunkwe bytes viżibbli għall-klijent, il-mogħdija eżistenti ta'
rkupar bikri fuq l-istess kont tista' terga' tiftaħ it-tentattiv. Wara l-commit,
l-stream qatt ma jiġi rreprodott għażż; biss il-kuntratt eżistenti ta'
kontinwazzjoni sigura f'nofs l-stream jista' jgħaqqad suffiss. Il-finalizzazzjoni
tibqa' single-shot, sabiex il-kontabilità tal-użu u r-rilaxx tas-semaforu ma
jiġux duplikati.

---

## 7. Riformulazzjoni tal-Istatus Upstream (żbalji ta' kwota b'status ħażin)

**Ambitu:** gateway upstream wieħed li jirrapporta eżawriment temporanju tal-kwota bl-istatus HTTP ħażin.

**Għan:** ikkoreġi status qarrieqi QABEL il-klassifikazzjoni, sabiex il-konsumaturi downstream (il-magna tal-fallback, l-agreġazzjoni tal-combo, ir-risposta rivolta lejn il-klijent) jaraw in-natura verament riprovabbli tal-falliment.

Ċerti gateways jindikaw eżawriment TEMPORANJU tal-kwota b'status HTTP
mhux riprovabbli. `agentrouter.org` jirritorna `403` (xi drabi `400`) b'korp
bil-Ċiniż (`用户额度不足` / `额度不足`) minflok l-istandard `429`. Klijenti bħal
Claude Code jittrattaw `403` bħala permanenti u jieqfu s-sessjoni, u mingħajr
korrezzjoni l-magna tal-fallback tikklassifikah bħala `AUTH_ERROR` minflok
avveniment ta' kwota.

**Implimentazzjoni:**

- Reġistru + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  ta' regoli għal kull fornitur (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), imqabbla permezz ta'
  `applyStatusRestatement()`.
- Punt tal-ġajta: il-blokk `providerFailure:` f'`open-sse/handlers/chatCore.ts`
  (madwar il-linja 3654), eżatt wara li `parseUpstreamError()` janalizza
  risposta upstream b'status HTTP ta' żball (`!providerResponse.ok`), u qabel
  ma taħdem xi klassifikazzjoni, sabiex kull konsumatur downstream jara
  l-istatus ikkoreġut. Żbalji inkorporati ġewwa stream SSE `200` isegwu
  mogħdija separata u iktar tard ta' parsing tal-stream u **mhumiex** koperti
  minn dan il-hook illum — limitazzjoni magħrufa, għadha mhux meħtieġa għall-
  istatus żbaljat ta' agentrouter (li joħroġ bħala status HTTP ta' żball).
- Eliġibilità għal retry: `429` qiegħed f'`RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), allura żball riformulat
  iġorr tieqa reali ta' retry minflok ma joħroġ bħala `403` mejjet.
- Il-`60s` `defaultRetryAfterMs` sintetiku (`upstreamStatusRestatement.ts`)
  huwa biss dak li r-risposta riformulata tgħid lill-**klijent**; mhuwiex
  innifsu t-tul intern ta' cooldown/lockout tal-konnessjoni — dak huwa
  rregolat separatament minn kwalunkwe mekkaniżmu li fil-fatt jimmaniġġja
  l-iżball riformulat (il-backoff li jiżdied tal-Connection Cooldown, §2,
  bazi `3s` għal fornituri b'API-key; jew il-Model Lockout, §3, għal
  fornituri b'kwota għal kull mudell bħal agentrouter). Ir-router jista' jsir
  eliġibbli għal retry internament qabel mit-tieqa ta' 60s li jħabbar lill-
  klijent — marġni intenzjonali, mhux bug.

Żbalji permanenti (`无权访问模型` ta' agentrouter — l-ebda aċċess għal dan il-
mudell) QATT ma jiġu riformulati: `excludeMarkers` jagħti veto lir-regola anki
meta `textMarkers` jaqbtu, allura l-iżball iżomm l-istatus oriġinali tiegħu u
xejn ma jerġa' jipprovah għal dejjem. Ir-regola ta' klassifikazzjoni tal-
fornitur li taqbel (`agentrouter-model-access-denied` f'
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`,
`scope: "model"`, cooldown bażi ddikjarat ta' `6h`) tiġi kkonsultata minn
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _qabel_ l-
early-return ġeneriku `FORBIDDEN` tal-kategorija apikey, ikkontrollat minn
`honorsRuleLockScope(provider)` (#10334 — bħalissa esklussiv għal agentrouter
permezz tal-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` f'
`providerErrorRules.ts`). Il-cooldown ddikjarat ta' 6h tar-regola jgħaddi
bħala `fallbackResult.baseCooldownMs`, iżda xorta jibqa' jdaħħal fil-mogħdija
pre-eżistenti tal-lockout tal-kwota għal kull mudell
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, mhux mibdula
minn #10334 ħlief għas-sors tal-cooldown): jiġi mrazzan għall-
`mlSettings.maxCooldownMs` tal-operatur (default `1_800_000ms` / 30min), bħal
kull lockout ieħor ta' mudell, u r-_raġuni tal-lockout persistenti_ tibqa' l-
`"forbidden"` hardkodjat pre-eżistenti, mhux l-`"auth_error"` tar-regola —
biss it-tul tal-cooldown jiġi rispettat end-to-end, mhux il-string tar-raġuni.
Il-konnessjoni nnifisha tibqa' attiva; il-mudelli oħra fuq l-istess konnessjoni
ma jiġux affettwati.

Żbalji ta' kwota riformulati (`额度不足`) jilħqu regola tal-fornitur fil-
produzzjoni (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, mingħajr cooldown ddikjarat tagħha stess — japplika d-
default tal-backoff skalat tas-saff tal-persistenza). Minn #10334, `scope`
fuq `ProviderErrorRuleMatch` JIĠI kkonsmat end-to-end, iżda **biss** għal
fornituri fl-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — illum biss `"agentrouter"`, ikkontrollat permezz ta'
`honorsRuleLockScope()`). Għal kull fornitur ieħor `scope` jibqa' informattiv,
eżattament bħal qabel #10334. `checkFallbackError` joħroġ l-ambitu tar-regola
mqabbla bħala `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) huwa l-gwardjan kondiviż li jikkonferma li
`ruleScope` huwa verament sigur biex jiġi rispettat bħala sinjal li jkopri l-
konnessjoni kollha u li jirkupra waħdu (scope `"connection"`, raġuni
`quota_exhausted`, qatt `permanent`, qatt `creditsExhausted` — difiża kontra
regola futura li tgħaqqad scope `"connection"` ma' stat permanenti tal-kont).
Żewġ konsumaturi jsejħulu:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  minflok taqa’ fil-fergħa tal-imblukkar **għal kull mudell** tal-fornitur
  passthrough (agentrouter huwa `passthroughModels: true` → `hasPerModelQuota()`
  jirritorna `true`), tapplika **perjodu temporanju ta’ stennija għall-konnessjoni** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, u qatt status terminali
  (`credits_exhausted`/`banned`/`expired`) — sabiex il-konnessjoni tirkupra
  waħedha ladarba jintemm il-perjodu ta’ stennija, minflok ma teħtieġ
  reset manwali tal-kredenzjali. Dan jinqabeż għal konnessjonijiet bi
  `disableCooling: true` (#2997): minflok, dik l-għażla ta’ esklużjoni
  tgħaddi għall-imblukkar għal kull mudell (kompromess dokumentat —
  ara l-kumment fil-kodiċi fuq il-fergħa).
- **Routing ikkombinat fl-istess talba** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): l-istess guard jimmarka
  l-konnessjoni fis-set fil-memorja `exhaustedConnections`, keyed b’
  `${provider}:${connectionId}`. Dan jaqbeż biss target li jkun għad fadal
  fl-ISTESS TALBA u li _hu stess diġà jġorr eżattament dak il-`connectionId`_
  fl-oġġett target tiegħu stess (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` qabel il-lookup ta’ `exhaustedConnections`) — combo sempliċi
  ta’ lista ta’ mudelli, fejn it-targets aħwa ma jġorru ebda `connectionId`
  fiss tagħhom stess u wieħed jiġi riżolt biss għal kull dispatch mill-header
  `X-OmniRoute-Selected-Connection-Id` tar-rispons, qatt ma jaqbel ma’ dik
  il-key. Għal dak il-każ komuni, il-protezzjoni reali kontra leg li jkun
  għad fadal u jerġa’ juża l-kont li għadu kemm ġie eżawrit MHIX dan is-Set —
  hija s-saff tal-persistenza ta’ hawn fuq (il-`rateLimitedUntil`
  tal-konnessjoni issa jinsab fil-futur) flimkien mal-istess guard li
  jissopprimi `transientRateLimitedProviders` għall-falliment (ara
  "Disinn f’żewġ stadji" u l-kumment fil-kodiċi dwar il-fergħa
  `isAgentrouterConnectionQuotaScope` f’`targetExhaustion.ts`): meta dak
  is-Set jitħalla mhux immarkat, il-force-allow ta’
  `allowRateLimitedConnection` f’`combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) MA jidħolx fis-seħħ
  għal-legs li jkun għad fadal tal-fornitur, għalhekk il-filtru
  `rateLimitedUntil` tal-għażla tal-kredenzjali
  (`src/sse/services/auth.ts:1238`) jiġi rispettat b’mod normali u leg li
  jkun għad fadal jew jagħżel konnessjoni agentrouter differenti li tkun
  għadha eliġibbli, jew ifalli għax ma jkun hemm ebda kredenzjali disponibbli
  — ma jisfurzax ruħu lura fuq il-konnessjoni li din il-fergħa tkun għadha
  kemm poġġietilha perjodu ta’ stennija.

### Disinn f’żewġ stadji: dikjarazzjoni mill-ġdid tal-istatus, imbagħad klassifikazzjoni

Id-dikjarazzjoni mill-ġdid tal-istatus (`upstreamStatusRestatement.ts`) u
r-regoli tal-klassifikazzjoni tal-fornitur
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) huma
reġistri separati li t-tnejn jużaw l-id tal-fornitur u markers tat-test
bħala keys, iżda jaħdmu f’postijiet differenti u jaqdu skopijiet differenti:
id-dikjarazzjoni mill-ġdid tikteb mill-ġdid l-istatus HTTP kmieni
f’`chatCore.ts`; ir-regoli tal-klassifikazzjoni jagħżlu r-`reason` ta’
fallback u l-`scope` tal-lock (`model` / `provider` / `connection`) ġewwa
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Ir-regoli tal-klassifikazzjoni jaraw biss it-**test** sħiħ tal-iżball
(meħtieġ biex jaqblu ma’ markers fil-body bħal `额度不足`) għal fornituri
elenkati fl-allowlist `FULL_TEXT_RULE_PROVIDERS`
f’`providerErrorRules.ts` — bħalissa `"agentrouter"` biss. Għal kull fornitur
ieħor tal-**katalgu integrat**, `checkFallbackError` jgħaddi lil
`getProviderErrorRuleMatch` l-iżball strutturat biss (`{code, type}`), li
huwa biżżejjed għal regoli bbażati fuq headers/status/kodiċi iżda ma jarax
markers fit-test tal-body. Il-helper `resolveRuleMatchBody()` jagħmel din
l-għażla: it-test sħiħ tal-iżball għall-fornituri fl-allowlist, u l-iżball
strutturat għall-oħrajn. Iż-żieda ta’ fornitur **integrat** ma’
`FULL_TEXT_RULE_PROVIDERS` hija opt-in espliċitu għal kull fornitur — dan
jeżisti sabiex il-fluss default għal kull fornitur li mhuwiex fil-lista
jibqa’ identiku byte b’byte.

L-`scope` ta’ regola (`model` / `provider` / `connection`) huwa opt-in
separat minn `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jesponih biss
bħala `fallbackResult.ruleScope`, u l-konsumaturi downstream jirrispettawh
bħala xi ħaġa oħra għajr tikketta informattiva biss għal fornituri
fl-allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` fl-istess fajl (ikkontrollat
permezz ta’ `honorsRuleLockScope()` — illum `"agentrouter"` biss). Ara
"Żbalji tal-kwota ddikjarati mill-ġdid" hawn fuq għal dak li effettivament
tagħmel taqbila `scope: "connection"` ladarba fornitur ikun f’dik
l-allowlist.

**#11104 — ir-regoli ddikjarati mill-operatur jaqbżu ż-żewġ allowlists.**
Operatur jista’ jiddikjara regola għal kull fornitur waqt ir-runtime permezz
ta’ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mingħajr ma jeditja dan il-fajl. Li regola tal-operatur titqiegħed wara
l-gating ta’ `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` —
allowlists maħsuba biex jipproteġu l-imġiba **default** tar-regoli tal-katalgu
integrat — jagħmel il-mekkaniżmu tas-settings inattiv għal kull fornitur ħlief
dawk li diġà huma elenkati hemmhekk, peress li d-dikjarazzjoni tar-regola
hija diġà l-opt-in espliċitu tal-operatur. Kemm `resolveRuleMatchBody()` kif
ukoll `honorsRuleLockScope()` l-ewwel jiċċekkjaw
`hasOperatorRuleForProvider()`: fornitur b’regola tal-operatur jirċievi
t-test mhux ipproċessat tal-iżball u l-`scope` iddikjarat tiegħu jiġi
rispettat, irrispettivament minn jekk jidhirx ukoll f’xi waħda miż-żewġ
allowlists.

**Lakuna magħrufa — `providerRuleRegistry` qatt ma jiġi kkonsultat għal HTTP 400.**
Il-fergħa `BAD_REQUEST` ta’ `checkFallbackError` tikklassifika status 400
kompletament permezz tal-arrays tal-patterns tagħha stess
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, eċċ.
f’`accountFallback.ts`) u tirritorna qabel ma tintlaħaq il-fergħa
`configuredRule`/`getProviderErrorRuleMatch` ta’ fuqha. Regola tal-katalgu
integrat (jew regola tal-operatur) bi `status: 400` hija sintattikament valida
iżda qatt mhi se tiġi attivata. Illum, ebda regola eżistenti ma timmira 400,
għalhekk xejn fil-produzzjoni mhu affettwat — iżda regola futura għal 400
teħtieġ li l-ewwel tiġi modifikata din il-fergħa, li hija bidla akbar
milli sempliċement tiżdied regola (tikklassifika mill-ġdid 400 għal kull
fornitur li diġà jiddependi fuq l-imġiba tal-array tal-patterns) u hija barra
mill-ambitu ta’ żieda ta’ regola għal fornitur wieħed.

### Żieda ta' gateway ġdid li jirrapporta ħażin il-kwota

1. Irreġistra array waħda ta' regoli f'`statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Żomm il-`textMarkers`
   speċifiċi għall-provider; qatt tuża mill-ġdid frażijiet ġeneriċi bl-Ingliż
   li jikkonfliggu ma' `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. B'mod opzjonali, irreġistra regoli ta' klassifikazzjoni f'
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) biex
   tagħżel l-ambitu t-tajjeb tal-lock (`connection` għal kwota fuq il-kont
   kollu, `model` għal żbalji għal kull mudell). Dan il-pass jieħu effett
   fil-produzzjoni biss għal providers li r-regoli tagħhom jeħtieġu t-test
   sħiħ tal-iżball (markers tal-body): żid l-id tal-provider f'
   `FULL_TEXT_RULE_PROVIDERS` fl-istess fajl — inkella `checkFallbackError`
   dejjem jagħti r-regola biss l-iżball strutturat `{code, type}` u regola
   bbażata fuq it-test tal-body qatt ma taqbel mat-traffiku live. Regoli li
   jaqblu biss fuq `status`/`headers` (bħal dawk ta' Opencode jew Minimax)
   m'għandhomx bżonn dan l-opt-in. Separatament, jekk ir-regola tiddikjara
   `scope: "connection"` u l-intenzjoni hija cooldown veru fuq il-konnessjoni
   kollha flimkien ma' combo skip fl-istess talba (mhux biss tikketta
   informattiva), żid l-id tal-provider f'`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
   fl-istess fajl — dan huwa li jikkontrolla l-konsum ta' stil
   `isAgentrouterConnectionQuotaScope()` f'`markAccountUnavailable()`
   (`src/sse/services/auth.ts`) u `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); mingħajru, `scope` xorta
   jgħaddi minn `fallbackResult.ruleScope` imma xejn ma jaġixxi fuqu.
3. Żid unit tests li jirriflettu
   `tests/unit/upstream-status-restatement.test.ts` u
   `tests/unit/agentrouter-error-rules.test.ts` (inkluż il-guards
   not-permanent / not-creditsExhausted, u — jekk il-provider jeħtieġ
   l-allowlist — test li jivverifika li `resolveRuleMatchBody()` jirritorna
   t-test sħiħ biss għal dak il-provider).

M'hemmx bżonn ta' bidliet f'`chatCore.ts`, `classifyError`, jew combo.

#### Lock b'buckets tal-egress (#10880)

Il-providers f'`EGRESS_BUCKETED_LOCK_PROVIDERS` (il-familja opencode)
jittrattaw bħala upstream maqsum f'buckets skont l-IP (il-free tier ta'
opencode huwa maqsum f'buckets skont l-IP, mhux skont il-kont — ara #9611):
status-429 ikkklassifikat `quota_exhausted` **jew** `rate_limit_exceeded`
jagħmel cooldown lil kull konnessjoni tal-familja allowlisted li l-aħħar
egress IP magħruf tagħha jaqbel ma' dak tal-konnessjoni li falliet, qabel
ir-rotazzjoni tkun tista' tipprovahom
— u b'hekk jiġu evitati N-1 sejħiet upstream garantiti li jfallu (l-istess
forma ta' #10460/#10525). `rate_limit_exceeded` huwa inkluż apposta:
fil-mogħdija ta' `markAccountUnavailable` ir-regoli speċifiċi għal opencode
qatt ma jaqblu (l-ebda headers/body ma jintwasslu lil `checkFallbackError`,
opencode mhuwiex f'`FULL_TEXT_RULE_PROVIDERS`), għalhekk 429 li l-body tiegħu
jġorr it-test tal-kwota tas-sottoskrizzjoni ("monthly usage limit reached")
jikklassifika `quota_exhausted` permezz tal-fallback tat-test tal-kwota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown ta' siegħa)
qabel ma tintlaħaq qatt ir-regola `status_429` — filwaqt li 429 mingħajr test
tal-kwota (rate limiting sempliċi) jikklassifika permezz tar-regola
`status_429` bħala `rate_limit_exceeded` u xorta jagħmel cooldown
lill-familja tal-IP. Għal provider allowlisted, rate limit maqsum f'buckets
skont l-IP huwa l-istess sinjal bħal kwota eżawrita. Limiti onesti:

- **L-isforz l-aħjar**: il-lock jirrisolvi l-aħħar `egress_ip` magħruf
  tal-konnessjoni minn `proxy_logs` (tieqa ta' 24h, sinkronika, mingħajr
  cache). Cache kiesha (l-IP tal-egress qatt ma ġie sondat) jew l-ebda
  ringiela → il-konnessjoni li falliet xorta titpoġġa f'cooldown
  mill-fergħa (rrekordjata bħal-lum), biss l-ebda sibling ma jiġi ilokkajt.
- **Qatt terminali**: il-cooldown huwa tieqa ta' kwota li tiġġedded
  (`testStatus: "unavailable"`); stat permanenti qatt ma jkun derivat minn
  sinjal fil-livell tal-IP. Konnessjonijiet b'`disableCooling` jaqbeżu
  l-fergħa għal kollox.
- **Il-granularità tal-lock tinbidel għall-familja fil-allowlist**: din hija
  bidla fl-ambitu, mhux biss ottimizzazzjoni għas-siblings. opencode huwa
  provider `passthroughModels`, u għalhekk qabel din il-fergħa 429 kien
  jipproduċi lockout għal kull MUDELL; issa jipproduċi cooldown
  tal-konnessjoni — inkluż għal operatur li jħaddem konnessjoni waħda
  mingħajr ebda sibling. Dik hija l-granularità li t-tabella tar-regoli ta'
  opencode diġà tiddikjara bħala korretta (`scope: "connection"`,
  `providerErrorRules.ts`), qatt ma ġiet onorata s'issa għax opencode
  mhuwiex f'`HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il-fergħa tikteb hija
  nnifisha l-cooldown + `backoffLevel` tal-konnessjoni li falliet, bħall-
  fergħa ta' agentrouter li għandha l-ambitu tal-konnessjoni, u tirritorna —
  il-blokk għal kull mudell u l-mogħdija ġenerika hawn taħt qatt ma
  jintlaħqu.
- **Combo inkluża**: bħall-fergħa ta' agentrouter, l-ambitu deliberatament
  jinjora d-downgrade `persistUnavailableState`/`isCombo` li caller combo
  japplika fuq 429. Lockout għal kull mudell mhuwiex forma aktar dgħajfa ta'
  dan l-ambitu, huwa l-unità ħażina: ma jgħid xejn dwar l-IP eżawrit, u
  għalhekk ir-rotazzjoni tal-combo tkompli tħarreq sejħa waħda garantita li
  tfall għal kull sibling.
- **Sigurtà tas-sibling**: sibling li diġà huwa terminali
  (banned/credits_exhausted) jew diġà f'cooldown itwal qatt ma jiġi miktub
  fuqu.
- **Allowlist esklussiva**: il-ftuħ ta' `EGRESS_BUCKETED_LOCK_PROVIDERS`
  huwa deċiżjoni esplicita tas-sid; l-ebda wiring ġeneriku (mudell
  #10334/#10419). Il-mistoqsija tas-siblings torbot dik l-istess allowlist
  minflok ma tirrepetiha bħala litteral SQL, sabiex il-ftuħ tagħha jibqa'
  bidla ta' ringiela waħda.
- **Rotazzjoni tal-IP tal-egress, fiż-żewġ direzzjonijiet**: it-tieqa
  tal-lookup (24h) hija ferm iktar wiesgħa mit-TTL tal-cache tal-IP
  tal-egress (5 min), u għalhekk "l-aħħar IP magħruf" huwa storja, mhux stat
  kurrenti. Jekk il-proxy ta' konnessjoni irrotat fi ħdan it-tieqa, il-lock
  jista' **jitlef** IP verament kondiviż (l-IP rrekordjat huwa dak il-ġdid,
  li mhuwiex eżawrit) — u b'mod simetriku jista' **jpoġġi f'cooldown sibling
  li minn dak iż-żmien irrotat 'l bogħod** mill-IP eżawrit. It-tieni każ
  jiswa lil dak is-sibling tieqa waħda ta' cooldown; it-tnejn huma limiti
  aċċettati tal-isforz l-aħjar ta' lookup bbażat fuq l-istorja.
- **Spiża**: żewġ scans limitati ta' `proxy_logs` (ffiltrati skont it-tieqa
  permezz ta' `idx_pl_timestamp`), biss bil-frekwenza ta' 429. L-ebda indiċi
  ġdid (migrazzjoni 134 YAGNI). Imkejjel fuq kopja ta' DB b'traffiku reali
  ta' daqs moderat; istanza b'throughput għoli żżomm proporzjonalment aktar
  ringieli fl-istess tieqa.

---

## Karatteristiċi oħra tar-reżiljenza

- **21 strateġija ta' routing** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — ara [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing konxju tar-reset** (v3.8.0) — jagħti prijorità lill-konnessjonijiet skont il-ħin tar-reset tal-kwota.
- **Degradazzjoni tal-modalità background** — il-`background: true` tar-Responses API jiġi degradat għal sync b'twissija.
- **Sejbien dinamiku tal-limitu tal-għodod** — jagħmel backoff lill-providers meta jintlaħqu l-limiti tal-għadd ta' għodod.
- **Fallback ta' emerġenza** — ikkontrollat minn `OMNIROUTE_EMERGENCY_FALLBACK`; l-operaturi jistgħu jissopperġuh mill-paġna tal-Feature Flags mingħajr restart.

---

## Debugging

- Il-combo weighted jirrispondi `503 all_targets_cooling_down` (`Retry-After` issettjat, `diagnostics.excluded` jelenka kull target b'`model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → il-pool huwa kkonfigurat u konness, kull target huwa sempliċiment eskluż minn timer tar-reżiljenza; it-twissija `[COMBO] Weighted selection: every target excluded before dispatch — …` tissemma r-raġunijiet u s-sekondi li jifdal. `404 no_executable_targets` mill-istess combo tfisser li ma kien hemm l-ebda timer tar-reżiljenza involut (xejn x'inħaddem, jew kull kont falla l-probe tal-availabbiltà). Mibni f'`open-sse/services/combo/pinRecovery.ts` mill-esklużjonijiet miġburin f'`targetResolution.ts`.
- Il-keys kollha ta' provider jiġu skipjati → iċċekkja kemm l-istat tal-circuit breaker U kemm il-`rateLimitedUntil`/`testStatus` ta' kull konnessjoni.
- Provider eskluż b'mod permanenti wara t-tieqa tar-reset → kodiċi li jaqra l-`state` mhux ipproċessat minflok `getStatus()`/`canExecute()`.
- Key wieħed ifalli, l-oħrajn għandhom jaħdmu → ippreferi l-cooldown tal-konnessjoni fuq il-circuit breaker.
- Mudell wieħed biss ifalli → ippreferi l-lockout tal-mudell fuq il-cooldown tal-konnessjoni.
- L-istat għandu jirkupra waħdu iżda ma jagħmilx hekk → iċċekkja għal timestamp fil-futur + read path li jirrifreska stat skadut. L-istatusijiet permanenti jeħtieġu bidliet manwali.

---

## Stat tar-runtime — referenza mgħaġġla għall-aġent

> Imċaqlab kelma b'kelma minn `AGENTS.md` → "Resilience Runtime State" (PR #12743) sabiex il-gwida
> tal-aġent tibqa' taħt il-budget tal-kontest ta' 40k. Hija l-veduta kondensata, rivolta lejn
> l-aġent, tas-sezzjonijiet ta' hawn fuq; is-sezzjonijiet numerrati jibqgħu r-referenza sħiħa.

OmniRoute għandu tliet mekkaniżmi relatati iżda distinti ta' falliment temporanju. Żomm
l-ambitu tagħhom separat meta tkun qed tagħmel debugging tal-imġiba tar-routing. Ara d-
[diagramma tar-reżiljenza b'3 saffi](../diagrams/exported/resilience-3layers.svg)
(sors: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
għal mappa ta' ħarsa malajr.

### Circuit Breaker tal-Provider

**Ambitu**: il-provider kollu, eż. `glm`, `openai`, `anthropic`.

**Għan**: twaqqaf il-ħruġ ta' traffiku lejn provider li qed ifalli ripetutament fil-livell
upstream/servizz, sabiex provider wieħed mhux b'saħħtu ma jrattalx kull talba.

**Implimentazzjoni**:

- Klassi prinċipali: `src/shared/utils/circuitBreaker.ts`
- Wiring tal-gate/eżekuzzjoni tal-chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API tal-istat tar-runtime: `src/app/api/monitoring/health/route.ts`
- Wrappers kondiviżi: `open-sse/services/accountFallback.ts`
- Tabella tal-istat persistenti: `domain_circuit_breakers`

**Stati** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: it-traffiku normali huwa permess.
- `DEGRADED`: firxa ta' twissija bikrija — il-fallimenti qabżu l-limitu tad-degradazzjoni iżda
  għadhom ma qabżux il-limitu tal-breaker; it-traffiku jibqa' jgħaddi, id-dashboards juru
  t-twissija. Test validu tal-konnessjoni jew tieqa kwieta mingħajr falliment ġdid jirritornaha
  lura għal `CLOSED` (`docs/architecture/RESILIENCE_GUIDE.md` fih it-tieqa).
- `OPEN`: il-provider huwa mblukkat temporanjament; il-callers jirċievu tweġiba
  provider-circuit-open jew il-combo routing jaqbeż għal target ieħor.
- `HALF_OPEN`: il-timeout tar-reset għadda; tippermetti probe request. Suċċess jagħlaq
  il-breaker, falliment jiftħu mill-ġdid.

**Valuri predefiniti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, ikkunsmati permezz ta'
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` f'`src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` f'`src/sse/handlers/chatHelpers.ts`). Il-breaker tal-provider
kollu jopera fuq `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | jiddegrada f' | jiftaħ f' (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ------------: | ------------------------------------: | ----------------------------: |
| OAuth   |           `5` |                                   `8` |                         `60s` |
| API key |           `7` |                                  `12` |                         `30s` |
| Local   |     (derivat) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` jiddefinixxi wkoll `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) u `providerCooldownMs` (5/10/1 min): dawn iħaddmu
il-**gate tat-tieqa tal-Provider Cooldown globali opt-in** (`PROVIDER_COOLDOWN_ENABLED`,
awtomatikament mitfi) — entrata fil-livell tal-provider f'`open-sse/services/providerCooldownTracker.ts`
tqis biss bħala f'cooldown wara `providerFailureThreshold` fallimenti ġewwa
`providerFailureWindowMs`, u mbagħad tibqa' f'cooldown għal `providerCooldownMs`. DAWN mhumiex
il-limiti tal-breaker attiv — taġġustahomx jekk tistenna imġiba tal-breaker. Kull valur predefinit
jista' jiġi mbejjel permezz tal-env vars `OMNIROUTE_PROVIDER_BREAKER_*` u
`OMNIROUTE_CIRCUIT_BREAKER_*`; it-tabella tar-referenza preċiża għar-runtime tinsab f'
`docs/architecture/RESILIENCE_GUIDE.md`.

Biss statusijiet ta' falliment fil-livell tal-provider għandhom jiskattaw il-breaker tal-provider:

```ts
(408, 500, 502, 503, 504);
```

Tiskattax il-breaker tal-provider kollu għal żbalji normali ta' kont/key/mudell bħal ħafna
każijiet `401`, `403`, jew `429`. Dawn normalment jappartjenu għall-cooldown tal-konnessjoni
jew għall-lockout tal-mudell. `403` minn provider b'ċavetta API ġenerika għandu jkun
irkuprabbi sakemm ma jkunx ikklassifikat bħala żball terminali tal-provider/kont.

Il-breaker juża rkupru għażżien (lazy), mhux timer fl-isfond. Meta `OPEN` jiskadi,
qrijejt bħal `getStatus()`, `canExecute()`, u `getRetryAfterMs()` jerġgħu jġeddedu
l-istat għal `HALF_OPEN`, sabiex id-dashboards u l-bennejja tal-kandidati tal-combo
ma jibqgħux jeskludu għal dejjem fornitur li skada.

### Cooldown tal-Konnessjoni

**Ambitu**: konnessjoni/kont/ċavetta waħda tal-fornitur.

**Għan**: jaqbeż temporanjament ċavetta/kont wieħed difettuż filwaqt li jippermetti lil
konnessjonijiet oħra tal-istess fornitur jibqgħu jservu t-talbijiet.

**Implimentazzjoni**:

- Mogħdija tal-kitba/aġġornament: `src/sse/services/auth.ts::markAccountUnavailable()`
- Għażla/filtrazzjoni tal-kont: `src/sse/services/auth.ts::getProviderCredentials...`
- Kalkolu tal-cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Is-settings: `src/lib/resilience/settings.ts`

Oqsma importanti fuq il-konnessjonijiet tal-fornitur:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Waqt l-għażla tal-kont, konnessjoni tiġi mraqba sakemm:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Il-cooldowns huma wkoll għażżiena: meta `rateLimitedUntil` ikun fil-passat, il-konnessjoni
ssir eliġibbli mill-ġdid. F'użu b'suċċess, `clearAccountError()` tnaddaf `testStatus`,
`rateLimitedUntil`, l-oqsma tal-iżball, u `backoffLevel`.

Imġiba default tal-cooldown tal-konnessjoni:

- Cooldown bażiku ta' OAuth: `5s`.
- Cooldown bażiku tal-ċavetta API: `3s`.
- `429` tal-ċavetta API għandu jippreferi ħjiel ta' retry upstream (`Retry-After`, headers
  ta' reset, jew test ta' reset li jista' jiġi pparżjat) meta disponibbli.
- Fallimenti rkuprabbli ripetuti jużaw backoff esponenzjali:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Il-gwardja anti-thundering-herd tiprevjeni fallimenti konkurrenti fuq l-istess konnessjoni
milli jestendu ripetutament il-cooldown jew iżidu `backoffLevel` darbtejn.

L-istati terminali mhumiex cooldowns. `banned`, `expired` (li jsir terminali biss wara N
tentattivi limitati permezz ta' `EXPIRED_RETRY_MAX`), u `credits_exhausted` huma
maħsuba biex jibqgħu mhux disponibbli sakemm il-kredenzjali/is-settings jinbidlu jew
operatur jerġa' jissettjahom. Tiktibx fuq l-istati terminali b'istat ta' cooldown
transitorju.

### Lockout tal-Mudell

**Ambitu**: fornitur + konnessjoni + mudell.

**Għan**: tevita li titfi konnessjoni sħiħa meta mudell wieħed biss ikun mhux disponibbli
jew limitat mill-kwota għal dik il-konnessjoni.

Eżempji:

- Fornituri b'kwota għal kull mudell li jirritornaw `429`.
- Fornituri lokali li jirritornaw `404` għal mudell wieħed nieqes.
- Fallimenti ta' permessi ta' modalità/mudell speċifiċi għall-fornitur, bħal modalitajiet
  magħżula ta' Grok.

Il-lockout tal-mudell jinsab f'`open-sse/services/accountFallback.ts` u jħalli l-istess
konnessjoni tkompli sservi mudelli oħra.

### Gwida għad-Debugging

- Jekk il-ċwievet kollha ta' fornitur jiġu mraqba, spezzjona kemm l-istat tal-breaker
  tal-fornitur kif ukoll `rateLimitedUntil`/`testStatus` ta' kull konnessjoni.
- Jekk fornitur jidher eskluż b'mod permanenti wara l-tieqa tar-reset, iċċekkja jekk
  il-kodiċi qed jaqrawx `state` grezz minflok jużaw `getStatus()`/`canExecute()`.
- Jekk ċavetta waħda ta' fornitur tfalli iżda oħrajn għandhom jaħdmu, ippreferi l-cooldown
  tal-konnessjoni fuq il-breaker tal-fornitur.
- Jekk mudell wieħed biss ifalli, ippreferi l-lockout tal-mudell fuq il-cooldown
  tal-konnessjoni.
- Jekk stat għandu jirkupra waħdu, għandu jkollu timestamp futur/timeout ta' reset u
  mogħdija ta' qari li taġġorna stat skadut. L-istatusi permanenti jeħtieġu bidliet
  manwali fil-kredenzjali jew fil-konfigurazzjoni.

---

## TLS Fingerprinting u Stealth

L-istealth speċifiku għall-provider (JA3/JA4, CCH, obfuskazzjoni) huwa dokumentat separatament — ara `docs/security/STEALTH_GUIDE.md` (git; mhux ikkompilat f'`/docs`).

---

## Ittestjar tar-reżiljenza (Fażi 8 · Blokk C)

Minbarra t-testijiet tal-unità għall-loġika tar-reżiljenza, tlieta testijiet jeżerċitaw ir-runtime taħt kundizzjonijiet reali ta' stress/falliment (kollha ta' integrazzjoni/nightly — l-ebda wieħed minnhom ma jimblokka l-PRs):

| Test             | X'inhu                                                                                                                                                                                 | Eżekuzzjoni                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos            | Nodu fake-upstream jinjetta latency/reset/timeout/503 reali; jivvalida li l-circuit breaker jiftaħ/jirkupra u li `checkFallbackError` jikklassifika l-503 bħala fallback rikuperabbli. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Tkabbir tal-heap | ~500 stream għal kull `createSSEStream` taħt `--expose-gc`; ifalli jekk il-heap jikber lil hinn mil-limitu massimu (protezzjoni OOM #3069).                                            | `npm run test:heap`                      |
| k6 soak          | Tagħbija sostnuta kontra `/api/monitoring/health`; limiti ta' p95/iżbalji.                                                                                                             | `k6 run tests/load/k6-soak.js` (nightly) |

Orrkestrat minn `.github/workflows/nightly-resilience.yml` (cron + dispatch). Fil-`test:integration` default, it-testijiet chaos u heap jinqabżu awtomatikament (mingħajr `RUN_CHAOS_INT`/`--expose-gc`).

---

## Ara wkoll

- [Gwida tal-Arkitettura](./ARCHITECTURE.md) — Arkitettura tas-sistema u dettalji interni
- [Gwida tal-Utent](../guides/USER_GUIDE.md) — Providers, combos, integrazzjoni tal-CLI
- [Magna Auto-Combo](../routing/AUTO-COMBO.md) — Skorjar b'16-il fattur, pakketti tal-modi
