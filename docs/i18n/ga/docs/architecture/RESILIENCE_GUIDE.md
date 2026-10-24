# Resilience Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

Tá trí mheicníocht athléimneachta éagsúil ach gaolmhar ag OmniRoute. Tá raon feidhme agus cuspóir difriúil ag gach ceann acu. Coinnigh scartha iad agus iompar ródaithe á dhífhabhtú agat.

![Samhail athléimneachta 3 shraith](../diagrams/exported/resilience-3layers.svg)

> Foinse: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Bristeoir Cuarda an tSoláthraí

**Raon feidhme:** an soláthraí iomlán (m.sh., `glm`, `openai`, `anthropic`).

**Cuspóir:** stop a chur le trácht a sheoladh chuig soláthraí atá ag teip go minic ag leibhéal an tsrutha suas/seirbhíse.

**Feidhmiú:**

- Croí-aicme: `src/shared/utils/circuitBreaker.ts`
- Sreangú: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stádais: `GET /api/monitoring/health`
- API athshocraithe: `POST /api/resilience/reset`
- Filleoirí: `open-sse/services/accountFallback.ts`
- Tábla BS: `domain_circuit_breakers`

**Stáit:**

- `CLOSED` — ceadaítear gnáththrácht
- `DEGRADED` — ceadaítear trácht fós, ach tá teipeanna méadaithe an tsoláthraí á rianú; filleann sé ar `CLOSED` nuair a bhíonn go leor rathanna ann, ar thástáil nasc bhailí, nó tar éis na tréimhse `OPEN` is faide a coinníodh don chineál teipe deireanaí (a luach `cooldownByKind`, nó `resetTimeout` mura bhfuil sé ann, × `maxBackoffMultiplier`, ar a laghad tréimhse fuaraithe amháin) gan teip nua
- `OPEN` — soláthraí bacaithe go sealadach; scipeálann an ródú teaglama é
- `HALF_OPEN` — tá an t-am athshocraithe thart; ceadaítear iarratas tástála

**Réamhshocruithe in-chumraithe (`open-sse/config/constants.ts`, nochta faoi Painéal → Socruithe → Athléimneacht):**

| Aicme   | Díghrádaithe ag | Osclaíonn sé ag | Am athshocraithe |
| ------- | --------------- | --------------- | ---------------- |
| OAuth   | 5 theip         | 8 dteip         | 60s              |
| API-key | 7 dteip         | 12 theip        | 30s              |
| Áitiúil | díorthaithe     | 2 theip         | 15s              |

Rialaíonn `degradationThreshold` cathain a théann soláthraí isteach i `DEGRADED`; rialaíonn `failureThreshold` cathain a osclaíonn sé agus a scipeáiltear é. Níl próifílí soláthraí áitiúla nochta ar leathanach socruithe Athléimneachta go fóil.

**Cóid thuislithe:** stádais ar leibhéal soláthraí amháin `[408, 500, 502, 503, 504]`. NÁ tuisl ar earráidí ar leibhéal cuntais (formhór 401/403/429 — is le fuarú nó glasáil iad sin).

**Aisfháil leisciúil:** nuair a éagann `OPEN`, nuashonraíonn `getStatus()`, `canExecute()`, `getRetryAfterMs()` an staid go `HALF_OPEN`. Cuireann na léamha céanna (agus an chéad teip eile) `DEGRADED` ró-shean ar ais go `CLOSED` de réir a chéile. Ní gá lasc ama cúlra.

---

### Fuarú Domhanda Soláthraí Roghnach (geata fuinneoige)

Coinníonn ceathrú sraith **roghnach** (`PROVIDER_COOLDOWN_ENABLED`, réamhshocrú **múchta**) cuimhne thras-iarratais ar sholáthraithe teipthe in
`open-sse/services/providerCooldownTracker.ts`, ar a dtagraíonn réiteach spriocanna teaglama ionas go scoirfidh iarratais theaglama as a chéile de bheith ag athshiúl soláthraí ar theip air díreach roimhe. Urramaíonn iontrálacha ar leibhéal soláthraí geata fuinneoige `PROVIDER_PROFILES`:

| Próifíl     | tuislithe tar éis (`providerFailureThreshold`) | laistigh de (`providerFailureWindowMs`) | fuaraithe ar feadh (`providerCooldownMs`) |
| ----------- | ---------------------------------------------: | --------------------------------------: | ----------------------------------------: |
| OAuth       |                                           `10` |                                 `15min` |                                    `5min` |
| Eochair API |                                           `15` |                                 `30min` |                                   `10min` |

Faoi bhun an tairseach **ní** mheastar go bhfuil an soláthraí ag fuarú; glanann rath an fhuinneog. Coinníonn iontrálacha ar leibhéal naisc (`provider:connectionId`) an cúlú eachtrúil `minRetryCooldownMs → maxRetryCooldownMs` ina ionad sin. Sáruithe:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Garda cúlchéimnithe: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Fuarú Ceangail

**Scóip:** ceangal/cuntas/eochair soláthraí aonair.

**Cuspóir:** eochair lochtach amháin a scipeáil fad a leanann ceangail eile ón soláthraí céanna ag freastal.

**Cur i bhFeidhm:**

- Marcáil mar neamh-infhaighte: `src/sse/services/auth.ts::markAccountUnavailable()`
- Roghnú: `getProviderCredentials*` sa chomhad céanna
- Ríomhaire fuaraithe: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Socruithe: `src/lib/resilience/settings.ts`

**Réimsí in aghaidh an cheangail:**

- `rateLimitedUntil` — stampa ama go dtí go rachaidh an fuarú in éag
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — cuntar cúlaithe easpónantach

**Fuarúcháin réamhshocraithe:**

- Bun-OAuth: 5s
- Bun-eochair API: 3s
- Eochair API 429: tugtar tús áite do cheanntásca srutha suas `Retry-After`/reset nó téacs athshocraithe inléite
- Cúlú: `baseCooldownMs * 2 ** failureIndex`

**Cosaint frith-“thundering herd”:** cosnaíonn i gcoinne teipeanna comhuaineacha fuarú a leathnú an-iomarca nó `backoffLevel` a dhúbailt.

**Ní ardaíonn 429anna “concurrency-limit” an dréimire cúlaithe.** Ciallaíonn `429` a bhfuil a cholainn ag tuairisciú teorainn chomhuaineach ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) go bhfuil an cuntas sláintiúil ach gnóthach. Filleann `checkFallbackError()` cúis `concurrency_limited`: aistrigh anois go dtí an chéad cheangal eile, fuaraigh an ceann seo ar feadh `CONCURRENCY_LIMIT_COOLDOWN_MS` seasta (1s) nó leid athsheachadta an srutha suas, ná hathraigh `backoffLevel`, agus socraigh `skipProviderBreaker`. Má tá colainn shoiléir chuóta ann, bíonn sí i réim fós; mar sin má mheaitseálann colainn patrún chuóta, fanann sé mar bhreithiúnas chuóta. Brath: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`; breithiúnas: `open-sse/services/accountFallback/concurrencyLimit429.ts`. Ní athraíonn `classify429()` (`FailureKind` an bhristeora) agus léann sé fós `rate_limit` do na colainneacha seo.

**Ní fhuaraíonn moilleanna ábhair srutha an cuntas.** Nuair a éiríonn faireadóir moille-ábhair (`open-sse/utils/streamHandler.ts`) as ar shruth nach ndearna aon aschur samhail in am, taifeadann `markAccountUnavailable()` an earráid ar an gceangal ach ní socraíonn sé fuarú: baineann an mhoill leis an iarratas sin, go minic cas smaointeoireachta fhada gan aschur fós. Is féidir le hoibreoirí roghnú isteach arís le `resilienceSettings.streamStallCooldown.enabled` (réamhshocrú `false`).

**Tosaíonn frámaí réasúnaíochta buiséad moille-ábhair arís.** Féadfaidh samhail réasúnaíochta smaoineamh ar feadh nóiméad roimh a chéad chomhartha le feiceáil: craolann Claude frámaí `thinking_delta` lena dtéacs smaointeoireachta folamh, agus craolann API na bhFreagraí mír réasúnaíochta i ndiaidh a chéile. Aithníonn `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) na frámaí seo, agus atosaíonn an faireadóir a bhuiséad ar gach ceann díobh in ionad an casadh a chealú. Níl siad fós ina n-aschur samhail, mar sin tuairiscítear casadh a chríochnaíonn le réasúnaíocht amháin fós mar fholamh, agus tripálann casadh a stopann réasúnaíocht agus a sheolann croíbhuille amháin an faireadóir fós.

Coinníonn frámaí dénacha `reasoningContentEvent` Kiro le síniú neamh-fholamh an ghníomhaíocht réasúnaíochta seo tríd an fhorghníomhaitheoir mar dhelta folamh `reasoning_content`. Ní chuirtear an síniú ar aghaidh. Ní atosaíonn meiteashonraí, frámaí neamhiomlána ná sínithe folmha an buiséad ábhair; tá an teorainn ama srutha-gníomhach neamhspleách agus cealú cliant i bhfeidhm fós (`open-sse/executors/kiro/reasoning.ts`).

**Stáit chríochnacha (NÍ fuarúcháin):**

- `banned` — socraithe ag braiteadh eochairfhocail toirmiscthe / toirmeasc cuntais (féach [BAN_DETECTION](../security/BAN_DETECTION.md)), agus trí dhiúltú srutha suas in-a-ghcionn in aghaidh an iarratais (`request_rejected`, m.sh. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ní dhéanann diúltú aonair ach an ceangal a fhuarú
- `expired` (aistríonn go críoch tar éis líon teoranta athiarrachtaí — `EXPIRED_RETRY_MAX = 3` le cúlú easpónantach — ionas gur féidir le hearráidí sealadacha OAuth féin-leigheas sula ndíchoimisiúnaítear an cuntas go buan)
- `credits_exhausted`

Fanann siad seo go dtí go n-athraíonn dintiúir nó go ndéanann oibreoir iad a athshocrú. Ná scríobh thar stáit chríochnacha le stát fuaraithe sealadach.

**Aisghabháil leisciúil:** nuair atá `rateLimitedUntil` caite, éiríonn an ceangal incháilithe arís. Ar úsáid rathúil, glanann `clearAccountError()` gach réimse earráide.

### Balla úsáide Claude OAuth: lána tosaíochta níos ísle + athshocrú teorainn seisiúin

**Scóip:** ceangal síntiúis amháin Claude (OAuth). Tá an dá ghné **opt-in in aghaidh an cheangail** (Cuir ceangal in eagar → rannán Claude → `lowPriorityMode` / `autoLimitReset` i `providerSpecificData`, araon díchumasaithe de réir réamhshocraithe) agus léiríonn siad orduithe `/low-priority` agus `/limit-reset` Claude Code (conradh sreinge gafa ó Claude Code 2.1.263).

**Cur i bhFeidhm:**

- Meaisín stáit + aicmiú freagraí: `open-sse/services/claudeLowPriority.ts`
- Stádas athshocraithe/cliant éileamh: `open-sse/services/claudeLimitReset.ts`
- Crúca fhorghníomhaitheora (instealladh ceanntásc + athiarracht ceangail chéanna): `open-sse/executors/base.ts::execute()`
- Perseist opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Cúrsóir:** an balla úsáide 5-uair — `429` a bhfuil na ceanntásca `anthropic-ratelimit-unified-status: rejected` agus, nuair atá an cuntas incháilithe, `anthropic-ratelimit-unified-slow-offer: treatment`. Ní sheoltar tada roimh an chéad 429 balla sin; téann 429 bhorb gan cheanntásca aontaithe tríd an ngnáth-chosán fuaraithe.

**Lána tosaíochta níos ísle** (`lowPriorityMode`):

- Ag an mballa 429 glacann an feidhmitheoir leis an tairiscint agus baineann sé triail eile **láithreach** as an gcuntas céanna le `anthropic-usage-limit: slow`; fanann an lána gníomhach go dtí an `anthropic-ratelimit-unified-reset` fógartha (+60s de thréimhse mhaolaithe) agus bíonn an ceanntásc ar gach iarratas san fhuinneog sin. Ní shroicheann an 429 idircheaptha `handleChatCore` riamh, mar sin **ní** chuirtear an nasc i dtréimhse fuaraithe agus ní rothlaítear amach é.
- `anthropic-ratelimit-unified-slow-status` ar fhreagairtí níos déanaí: coinníonn `active` / `not_needed`
  an lána; fanann `slot_busy` (429) nó `529` ar feadh
  `anthropic-ratelimit-unified-slow-retry-after` an fhreastalaí (20s de réir réamhshocraithe, teorainn 5–600s, giodam ±30%)
  agus baineann siad triail eile as, faoi theorainn `anthropic-ratelimit-unified-slow-max-wait` (20 nóiméad de réir réamhshocraithe, teorainn
  1 nóiméad–6 h) — ina dhiaidh sin cuirtear deireadh leis an lána agus cuireann tréimhse fuaraithe 10 nóiméad bac ar athghlacadh. Ina theannta sin,
  cuirtear teorainn leis an bhfeitheamh de réir an ama atá fágtha de theorainn ama thús uas-srutha an iarratais féin
  (`resolveFetchStartTimeout`, 10 nóiméad de réir réamhshocraithe) lúide corrlach 5 s: gan an teorainn sin mhairfeadh
  an t-uasfheitheamh réamhshocraithe 20 nóiméad níos faide ná an t-iarratas agus chuirfí deireadh leis an gcodladh
  i lár an fheithimh, rud a thaispeánfadh `TimeoutError` in ionad an deiridh shéimh `max_wait` + fuarú.
- Cuireann `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, athchasadh fuinneoige 5h, nó
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (a chuireann deireadh leis mar
  `extra_usage` ar aon stádas, ós rud é go gclúdaíonn an farasbarr íoctha an balla anois) deireadh leis an lána; ansin
  téann an fhreagairt ar aghaidh chuig gnáthchonair an fhuaraithe. Coinnítear `budget_exhausted` i gcuimhne go dtí
  athshocrú fógartha an bhuiséid (≤ 8 lá).
- Ritheann seiceáil an bhalla tar éis atrialacha laistigh den iarracht, arna spreagadh ag 400, de chuid an fheidhmitheora féin (eagarthóireacht
  comhthéacs, teorainneacha smaointeoireachta/iarrachta, uathfhoghlaim paraiméadar), mar sin déantar 429 balla nach dtagann chun solais ach ar
  cheann de na hatrialacha sin a idircheapadh fós seachas ligean dó conair an fhuaraithe a bhaint amach.
- Coinnítear an staid sa chuimhne de réir naisc (cosnaíonn atosú 429 balla breise amháin chun athghlacadh).

**Athshocrú teorann seisiúin** (`autoLimitReset`, baintear triail as roimh an lána nuair atá an dá cheann ar siúl):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloc `juniper_tide`;
  nuair atá `arm: "reset"` agus `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` le
  `{ "program": "juniper_tide" }` (UUID na heagraíochta ó
  `providerSpecificData.organizationUUID`, cúltaca tosaithe).
- `result: reset|not_limited` → baintear triail eile as an iarratas ar lánluas (gan ceanntásc moille).
  Meamraíonn `already_used` / `not_offered` `next_available_at` (seachtain amháin de réir réamhshocraithe); tar éis
  teipe ar bith déantar cúlú 15 nóiméad. Déantar an t-athshocrú uair sa tseachtain agus áirítear é fós i dtreo na
  teorann seachtainiúla.

Cosaintí cúlchéimnithe: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Cleamhnas seisiúin (#7274)

**Raon feidhme:** seisiún cliaint amháin (ceanntásc `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) ceangailte le nasc amháin, le haghaidh soláthraí **ar bith**.

**Cuspóir:** gníomhaire ilbabhta (Claude Code, aider, gníomhairí saincheaptha) a choinneáil ar an gcuntas céanna thar iarratais, rud a laghdaíonn caillteanas comhthéacs idir cuntais agus 429anna tosaithe fhuair arís agus arís eile ar sholáthraithe a bhfuil staid seisiúin in aghaidh an chuntais acu.

**Cur chun feidhme:**

- Réiteach TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Roghnú/cruthú ceangail: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Asbhaint ceanntáisc (cineálach, soláthraí ar bith): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tábla ceangail marthanach: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Socrú: `sessionAffinityTtlMs` (TTL domhanda in ms, díchumasaíonn `0` é) — `src/lib/db/settings.ts`. Athainmníodh é ón `codexSessionAffinityTtlMs`, a bhain le Codex amháin, leis an ascnamh `124_generic_session_affinity_ttl.sql`, a thugann aon TTL Codex a cumraíodh roimhe seo ar aghaidh mar an réamhshocrú nua.

Roimh #7274, d'fhill `resolveSessionAffinityTtlMs()` láithreach le `0` i gcás gach soláthraí seachas `codex`, mar sin ní raibh éifeacht ag an socrú TTL (ná ag ceanntásca an tseisiúin) in aon áit eile, cé go raibh an sásra ceangail agus asbhaint na gceannteideal neamhspleách ar an soláthraí cheana féin. Baineadh an luathfhilleadh sin leis an gceartúchán; cuirtear an TTL i bhfeidhm go haonfhoirmeach anois ar gach soláthraí a luaithe a shocraítear go domhanda é os cionn `0`.

Ní chuirtear na trí cheanntásc cleamhnais seisiúin ar aghaidh chuig an uas-sruth riamh — tógann feidhmitheoirí a gceanntásca uas-srutha féin ón tús seachas ceanntásca cliaint a chur ar aghaidh, mar sin fanann sé seo ina aitheantas comhghaolmhaireachta inmheánach amháin.

### Léasanna eisiacha naisc seisiúin bhainistithe

**Raon feidhme:** is le cliant/seisiún HTTP bainistithe gníomhach amháin nasc incháilithe OmniRoute amháin.

**Cuspóir:** úinéireacht eisiach mharthanach naisc a sholáthar do chliaint a dteastaíonn
teorainn dhocht ródaithe uathu thar iarratais. Ní hionann é seo agus cleamhnas seisiúin, ar rogha bhog leanúnachais é:
coinníonn léas eisiach staid saolré in SQLite, forfheidhmíonn sé uathúlacht dhomhanda an úinéara ghníomhaigh agus
an naisc ghníomhaigh, agus diúltaíonn sé do ghlúin as dáta roimh sheoladh chuig an soláthraí.

Is gné roghnach í seo de réir eochair API. Ní mór raon feidhme `lease:exclusive` agus
liosta sainráite neamhfholamh `allowedConnections` a bheith ag eochair bhainistithe. Is féidir le cliant HTTP ar bith críochphointe na saolré a úsáid; ní
theastaíonn ainm cliaint, user-agent, soláthraí, modh OAuth ná samhail. Is le nasc an léas,
ní le samhail, mar sin coinnítear an ceangal nuair a athraítear an tsamhail fad a fhanann an nasc
incháilithe de ghnáth. Fanann na gnáthrialacha maidir le samhail, cuóta, sláinte, fuarú agus liosta ceadaithe i bhfeidhm agus féadfaidh siad
an ghlúin chéanna a aistriú chuig nasc eile atá saor agus incháilithe.

Is é an saolré ná `POST /api/v1/session-leases` le gníomhartha JSON `acquire`, `renew`, agus `release`.
Cuireann iarratais inference faoi bhainistiú an luach teimhneach `X-OmniRoute-Lease-Owner` agus
`X-OmniRoute-Lease-Generation` cruinn i láthair. Úsáideann an t-úinéir `vlo_` le 43 carachtar base64url
ina dhiaidh; ní stóráiltear ach a hais SHA-256. Ceanglaíonn gach fál seolta deiridh ID na heochrach API
fíoraithe agus ID an naisc ghníomhaigh freisin. Baintear ceanntásca rialúcháin léasa as logaí, as
léargais iarratais a choinnítear, agus as ceanntásca feidhmeora upstream.

Má tá iarrthóirí bainistithe incháilithe ag an ngnáthródú ach go bhfuil gach iarrthóir saor á áitiú ag
léas gníomhach eachtrach, tugann OmniRoute HTTP `429` ar ais, cód lease-capacity-unavailable, stát
waiting-for-capacity, agus `Retry-After` teoranta a dhíorthaítear ón éag is luaithe ábhartha. Ní
conspóid léasa í an ghnáth-incháilitheacht fholamh agus coinníonn sí a séimeantaic earráide ródúcháin
atá ann cheana féin.

Fanann meicníochtaí gaolmhara ar leithligh:

- Is dáileadh bog atá áitiúil don phróiseas é áitiú seisiúin OAuth do chuntais OAuth.
- Deonaíonn semafóirí cuntais ceadanna comhuaineachais iarratais agus tagann deireadh leo nuair a chuirtear iarratas i gcrích.
- Is úinéireacht saolré mharthanach iad léasa eisiacha seisiúin bhainistithe le fál glúine.

---

## 3. Frithdhúnadh Samhla

**Raon feidhme:** soláthraí + nasc + samhail.

**Raon feidhme na heochrach de réir stádais:** cinneann an stádas teipe cé acu eochair a scríobhann frithdhúnadh
chuici (`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — comhartha cuóta nó teidlíochta — cuirtear an **teaghlach cuóta** faoi ghlas:
  i gcás codex, raon iomlán `codex` / `spark` (gach samhail `gpt-5*` de chuid an
  naisc), agus i gcás soláthraithe eile `getQuotaScopedModelForProvider()`.
- Cuireann `404` an tsamhail lom faoi ghlas (`getModelLockKey()` a chúngaíonn `not_found`).
- Aon stádas eile — teipeanna iompair/freastalaí `5xx` agus `502` sintéisithe OmniRoute féin
  ó bhailíochtú cáilíochta — ní chuireann sé faoi ghlas ach an tuple **beacht**
  soláthraí/naisc/samhla. Ní fianaise é sruth lochtach ar shamhail amháin
  faoi chuóta an chuntais; roimh an riail seo, bhain freagra folamh amháin ar
  `codex/gpt-5.6-luna` gach samhail `gpt-5*` den nasc sin den ródú
  ar feadh 2–30 nóiméad (ag méadú de réir a chéile), cé nach raibh aon athrú ar a chuóta.
- Bíonn tosaíocht i gcónaí ag rogha shainráite `scope` ón nglaoiteoir (seolann Antigravity `"exact"`).

**Cuspóir:** seachain nasc iomlán a dhíchumasú nuair nach bhfuil ach samhail amháin ar fáil nó nuair atá sí srianta ag cuóta.

**Samplaí:**

- Soláthraithe cuóta in aghaidh na samhla a sheolann 429 ar ais
- Soláthraithe áitiúla a sheolann 404 ar ais i gcás samhail amháin atá ar iarraidh
- Teipeanna ceada a bhaineann go sonrach le mód/samhail soláthraí (m.sh., móid Grok)

**Cur chun feidhme:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Deais Tréimhsí Suaimhnithe Samhlacha (v3.8.0)

Comhéadan: Socruithe → Tréimhsí Suaimhnithe Samhlacha (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Liostaítear frithdhúnta gníomhacha mar aon le: soláthraí, nasc, samhail, cúis, expiresAt. Is féidir le hoibreoirí samhail a athchumasú de láimh ón gcárta.

**REST API:**

- `GET /api/resilience/model-cooldowns` — liostaigh frithdhúnta ghníomhacha
- `DELETE /api/resilience/model-cooldowns` — athchumasú de láimh. Corp: `{provider, connection, model}`. Fíordheimhniú: bainistíocht.

### Bainisteoir Tréimhsí Suaimhnithe

Comhéadan: Monatóireacht → Bainisteoir Tréimhsí Suaimhnithe (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Leathanach amháin do gach nasc atá bainte den ródú ar chúis shealadach, in ionad
gach leathanach soláthraí a oscailt. Liostaítear tréimhsí suaimhnithe nasc, frithdhúnta samhlacha agus staideanna
foirceanta, glantar iad de réir naisc, do rogha nasc, nó do naisc uile soláthraí,
agus cuirtear in eagar na rialacha tréimhse suaimhnithe is minice a mhionchoigeartaítear: `streamStallCooldown.enabled` agus
buntréimhse shuaimhnithe `connectionCooldown` OAuth / eochrach API, chomh maith le huaslíon na gcéimeanna cúlscoir (sábháiltear trí
`PATCH /api/resilience`). Liostaítear staideanna foirceanta (`banned`, `expired`, `credits_exhausted`) ach
ní ghlantar anseo riamh iad.

**REST API** (`src/lib/resilience/cooldownManager.ts`, fíordheimhniú: bainistíocht):

- `GET /api/resilience/cooldowns[?provider=]` — naisc lena stádas, an tréimhse shuaimhnithe atá fágtha,
  leibhéal cúlscoir, cineál na hearráide deireanaí agus frithdhúnta samhlacha (gan dintiúir)
- `POST /api/resilience/cooldowns` — corp `{connectionIds: string[]}` nó
  `{all: true, provider?}`; seoltar `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ar ais

### Comhéadan socruithe frithdhúnta + aisghabháil trí mheath ratha (v3.8.23)

Athraíodh frithdhúnadh samhla ó iompraíocht bhuanchumasaithe chrua-chódaithe go gné lán-inchumraithe,
roghnach lena cárta socruithe féin agus cosán aisghabhála féinleighis.

**Cárta socruithe:** Socruithe → Frithdhúnadh Samhla
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tá sé seo **éagsúil** ón `ModelCooldownsCard` inléite amháin thuas (nach ndéanann ach
frithdhúnta ghníomhacha a _liostú_) — déanann an cárta nua _na paraiméadair a chumrú_. Tá na réamhshocruithe
in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Socrú                   | Réamhshocrú                      | Brí                                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Máistirlasc — tá frithdhúnadh samhla **múchta de réir réamhshocraithe**.              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stádais réamhtheachtacha a áirítear mar theip atá teoranta don tsamhail.              |
| `baseCooldownMs`        | `120_000` (120 s)                | Fad tosaigh an fhrithdhúnta don chéad teip.                                           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Uasteorainn na tréimhse suaimhnithe méadaithe.                                        |
| `maxBackoffSteps`       | `10`                             | Uaslíon céimeanna méadaithe an chúlscoir easpónantúil.                                |
| `useExponentialBackoff` | `true`                           | An méadaíonn teipeanna arís agus arís eile an tréimhse shuaimhnithe go heaspónantúil. |

Coinnítear socruithe tríd an ngnáthstór socruithe agus déantar iad a bhailíochtú trí
scéimre na socruithe athléimneachta; cuireann an cárta teorainneacha ar `baseCooldownMs`/`maxCooldownMs`
(le `maxCooldownMs ≥ baseCooldownMs`) agus ar `maxBackoffSteps`.

**Aisghabháil trí mheath ratha:** ní hé dul in éag an amadóra amháin is cúis leis an aisghabháil. Laghdaíonn
freagra sláintiúil comhaireamh teipeanna na samhla de réir a chéile, ionas go stopann samhail a tháinig chuici féin
i lár na fuinneoige de bheith ag méadú (agus go nglantar í) sula ndéanfadh a hamadóir amhlaidh. I gcás sprice teaglama
rathúla, glaonn `open-sse/services/combo.ts` ar `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), rud a dhéanann an `failureCount` stóráilte a **leathú**
(`Math.floor(failureCount / 2)`); nuair a shroicheann sé `0`, scriostar an iontráil frithdhúnta
go hiomlán. Méadaíonn an mhacasamhail `recordModelLockoutFailure()`
an comhaireamh (agus méadaíonn sí an tréimhse shuaimhnithe) i gcás teipeanna laistigh den
fhuinneog mhéadaithe. Tá an meath ratha seo sa bhreis ar ghnáthdhul in éag an amadóra —
is féidir le ceachtar cosán samhail a athchumasú.

**Staid:** coinnítear frithdhúnta **sa chuimhne** (`Map`anna in aghaidh an phróisis d’iontrálacha
`ModelLockoutEntry` a bhfuil `provider:connectionId:model` mar eochair acu, agus glais raoin bheaicht ag
`provider:connectionId:exact:model`), agus ní choinnítear iad
sa DB — cailltear iad nuair a atosaítear an próiseas. Coinnítear na _socruithe_; tá _staid_
ghníomhach an fhrithdhúnta sealadach.

---

## 4. Rialú Comhthráthachta Quota-Share (v3.8.36)

Is minic nach nglacann cuntais shíntiúsacha (GLM, MiniMax, srl.) ach thart ar 1–3 iarratas comhthráthach; má sháraítear é sin, spreagtar 429anna agus tréimhsí fuaraithe. Bíonn sé seo géar go háirithe i gcás cumaisc **quota-share** (`qtSd/…`), ina roinneann roinnt eochracha API cuntas amháin suasrith. Coinníonn trí shraith cuntas roinnte ó bheith plódaithe.

### Uasteorainn comhthráthachta in aghaidh an nasctha (`max_concurrent`)

Is féidir le gach nasc soláthraí uasteorainn `max_concurrent` a dhearbhú (`provider_connections.max_concurrent`, a shocraítear sa mhodail nasctha / API / DB). Fág folamh é mura dteastaíonn teorainn. Is é seo an t-aon rialtán amháin a thiomáineann an tsraith srathúcháin thíos — socraigh é go comhthráthacht fíor an chuntais (m.sh. GLM ~1, MiniMax ~2).

### Uasteorainneacha comhthráthachta in aghaidh an mhunla (`modelConcurrency`)

Is féidir le nasc uasteorainneacha beachta comhthráthachta in aghaidh an mhunla a dhearbhú freisin laistigh dá léarscáil `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Socraigh é sa mhodail nasctha (**Sáruithe teorainne ráta → Uasteorainneacha comhthráthachta in aghaidh an mhunla**, `model=cap` amháin in aghaidh na líne) nó trí `PATCH /api/providers/[id]` leis an gcruth JSON céanna. Séimeantaic na n-eochracha:

- **Ar fud an nasctha vs sainiúil don mhúnla:** fanann `maxConcurrent` mar an uasteorainn roinnte ar fud an nasctha. Nuair is infheidhme an dá cheann, faightear an dá gheata go hatamach sa gheata cumaisc chéanna (`global → provider → account → model`); is é an t-iompar éifeachtach ná an teorainn is déine is infheidhme.
- **Meaitseáil bheacht ar eochair an mhúnla:** is í an eochair an teaghrán múnla a thugtar don fhorghníomhaire tar éis réitigh ródúcháin — de ghnáth id lom an mhúnla suasrith (`glm-5`), ní ailias `provider/model` ar thaobh an chliaint (ní mheaitseálann `zai/glm-5` le `glm-5`). Is uasteorainneacha iarratas comhthráthach de shlánuimhreacha dearfacha iad na luachanna.
- **Scuainiú áitiúil, gan fhionnachtain:** cuirtear iarratais bhreise ar scuaine go háitiúil leis an séimeantaic scuaine/teorainne ama atá ann cheana féin (earráidí iontrála clóscríofa `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). Ní dhéanann OmniRoute beartas suasrith a fhionnachtain ná a thuar — forchuireann sé na huasteorainneacha beachta a chumraigh an t-oibreoir. Ní dhíchumasaíonn geata múnla sáithithe an soláthraí riamh agus ní chruthaíonn sé glasáil mhunla bhuan; fanann iompar 429/fuaraithe/fallback suasrith mar chúltaca earráide.
- **Scóip in aghaidh an nasctha agus in aghaidh an phróisis:** is in aghaidh nasctha sa bhunachar sonraí atá na huasteorainneacha agus coinnítear i gcuimhne iad, mar sin ní chomhordaíonn dhá nasc a athúsáideann an eochair API suasrith chéanna lena chéile.
- **Ciallaíonn gan chumrú gan athrú:** má fhágtar an léarscáil ar lár (nó má fhágtar réimse an deais folamh) ní chuirtear aon gheata múnla leis. Cumraíocht shamplach gan aon teorainn sholáthraí uilíoch a dhearbhú:

```text
glm-5=1
glm-4.7=3
```

### Srathú iarratas quota-share

Nuair a dhíríonn seoladh quota-share ar nasc a dhearbhaíonn `max_concurrent` dearfach, srathúchánaítear iarratais chomhthráthacha chuig an **gcuntas** sin trí shéimeafór in aghaidh an nasctha (eochair `qsconn:<connectionId>`): **fanann iarratais bhreise sa scuaine** in ionad an cuntas a phlódú. Tá sé **oscailte ar theip** — leanann sé ar aghaidh gan sliotán fiú nuair a bhíonn an scuaine sáithithe nó nuair a sháraítear teorainn ama, seachas iarratas inseolta a dhiúltú riamh. Is féidir é a lascadh in **Socruithe → Athléimneacht → Comhthráthacht quota-share in aghaidh an nasctha** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ar siúl de réir réamhshocraithe). Gan uasteorainn `max_concurrent` fanann an t-iompar mar a bhí.

> Tá an geata ródúcháin quota-share (`selectQuotaShareTarget`, DRR + P2C) féin oscailte ar theip agus ní dhéanann sé ach nasc atá ag a uasteorainn a _ísliú tosaíochta_ — le linne aon-nasctha amháin ní féidir leis teorainn chrua a chur i bhfeidhm, mar sin is é an séimeafór seo a choinníonn an tuile faoi smacht i ndáiríre.

### Atrialach cumasc atá feasach ar an bhfuarú

Do gach straitéis chumaisc (nuair atá sí cumasaithe), má chruthódh iarratas 429 de bharr fuarú tráthach GEARR, fanann sé an fhuarú amach agus athsheolann sé in ionad an 429 a thabhairt ar ais — clúdaíonn sé seo fuinneoga TPM/RPM den chineál Gemini (~60s retry-after) ar chumaisc ilmhunla, m.sh. an dá sprioc de chumasc 2-mhúnla ag bualadh i gcoinne teorainne ráta in aghaidh an mhunla. Teoranta ag `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) in **Socruithe → Athléimneacht**. Ní fhanann sé riamh ar `quota_exhausted` (glasáilte go dtí meán oíche) ná ar chúiseanna údaraithe/gan aimsiú.

Clúdaíonn an geata céanna an cás réamhsheolta (#16319): nuair a léimtear gach sprioc de chumasc sula ndéantar iarracht ar bith mar go bhfuil a mhúnla faoi ghlasáil ghearr thráthach, fanann an chonair nialas-iarracht an glas amach faoi na huasteorainneacha céanna agus athsheolann sí, in ionad freagra gan leid `503 ALL_TARGETS_SKIPPED` a thabhairt. Nuair nach gceadaítear feitheamh ar bith (uasteorainn, iarrachtaí nó buiséad ídithe, nó an ghné múchta), uasghrádaítear an freagra críochfoirt go `429 rate_limit_error` agus `retry_after` / `reset_at` á n-iompar aige ó dhul in éag an ghlasála thráthaigh is luaithe; coinníonn glasanna cuóta, údaraithe agus gan aimsiú an 503 gan leid.

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

## 5. Rialú Iontrála Scuaine Iarratas (v3.8.49 · eagrán #6593)

**Raon feidhme**: an scuaine áitiúil teorannaithe ráta in aghaidh an tsoláthraí+an cheangail (`open-sse/services/rateLimitManager.ts`,
a bhfuil Bottleneck mar bhonn faoi), sraith amháin faoi bhun na dtrí mheicníocht thuas.

**Cuireann `maxWaitMs` teorainn leis an bhfeitheamh sa scuaine; cuireann `executionMaxWaitMs` teorainn leis an rith.**
Coinnítear an dá cheann scartha d'aon ghnó, agus ní úsáidtear ceachtar acu mar ionchur don cheann eile.

Is é `resilienceSettings.requestQueue.maxWaitMs` an **buiséad feithimh sa scuaine**: cumhdaíonn sé
fanacht le sliotán soláthraí agus ansin fanacht sa staid QUEUED, agus glantar a amadóir
a luaithe a fhágann an jab QUEUED agus a thosaíonn sé ag rith
(`rateLimitManager.ts`, `wrappedFn`). Ní shroicheann iarratas a sháraíonn é
an tseirbhís réamhtheachtach choíche. Is é 30000ms an réamhshocrú, arna sholáthar ag `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` agus arna dhaingniú ag
`tests/unit/ratelimit-admission-control-6593.test.ts`, ionas go dteipfidh ar an
tástáil sin má athraítear é, seachas ligean don alt seo dul as dáta go ciúin.

Is é `resilienceSettings.requestQueue.executionMaxWaitMs` an luach a fhaigheann Bottleneck
mar `expiration` an jab, agus ní thosaíonn a amadóir go dtí tar éis an tseolta. Is
cúlstop é do riteoirí nach bhfuil teorainn ama réamhtheachtach dá gcuid féin acu, agus
ardaítear é go teorainn ama thús-fetch an riteora féin nuair is faide í sin, ionas
nach féidir leis freagairt shláintiúil atá ar bun a ghearradh as. Is é 600000ms (10 nóiméad) an réamhshocrú.

Ba é buiséad na scuaine a chur isteach in `expiration` an rud a mharaíodh geataí
neamh-incriminteacha agus iad i mbun oibre — is dlisteanach dóibh rith ar feadh nóiméad sula dtagann na chéad bhearta —
agus sin é an fáth a gcuirtear dul in éag i láthair mar `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), agus cód theorainn ama na scuaine ag gabháil
le buiséad na scuaine. Sáraigh ceachtar acu trí `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (athróg timpeallachta) nó tríd an deais
(**Socruithe → Athléimneacht**). Cuirtear teorainn 1ms–24h leis an dá cheann nuair a normalaítear iad.

**Tosaíocht, don dá cheann:** ní sholáthraíonn an athróg timpeallachta ach an _réamhshocrú_. Bíonn tosaíocht ag luach
a coinníodh in `resilienceSettings.requestQueue` (paiste deaise / API, stóráilte
in `key_value`) air, agus bíonn tosaíocht ag
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` in aghaidh an cheangail air sin. Dá bhrí sin,
ní athraítear rud ar bith má shocraítear an athróg timpeallachta ar imscaradh a bhfuil luach coinnithe aige cheana —
glan nó nuashonraigh an socrú coinnithe ina ionad.

Cuireann `maxWaitMs` teorainn leis an tréimhse chónaithe sa scuaine; cuireann `maxQueueDepth` thíos teorainn leis an líon
glaoiteoirí a fhéadfar a chur sa scuaine ag aon am amháin.

**Atriailí a shonraítear sa chorp: rialáil luais vs frithdhúnadh.** Is féidir le corp 429 a thréimhse feithimh féin
a ainmniú (Gemini `RetryInfo.retryDelay`, téacs "retry after Ns"), rud a
léann `updateFromResponseBody`. Is rialáil luais é fanacht a luíonn laistigh de `maxWaitMs`
an cheangail: folmhaíonn an teorantóir a thaiscumar ar feadh na tréimhse sin agus seoltar glaonna sa scuaine
nuair a líontar arís é. Ní féidir leis an scuaine fanacht trí thréimhse níos faide ná `maxWaitMs` —
freagraíonn Gemini do chuóta laethúil ídithe le
`retryDelay: "86399s"`. Cuireann an `Retry-After` a athsheoltar ar an 429 atógtha (#16528)
faoi deara cheana féin don inneall cúltaca an tsamhail a ghlasáil don tréimhse sin, ach dá gcuirfí
an teorantóir ar sos di freisin, chuirfí moill fós ar aon ghlao a shroicheann an eochair go luath
(tar éis athshocrú athléimneachta, mar shampla) ar feadh `maxWaitMs` ar fad. Nuair a thagann fanacht den sórt sin ó mhionsonra clóscríofa Google `RetryInfo`
(an bhunáitíocht `google_rpc_retry_info`) agus nuair atá teorantóir na heochrach
scóipithe don tsamhail cheana féin (féach `getLimiterKey`), déantar frithdhúnadh samhla
ar an gceangal den 429 ina ionad (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, caipín 24h), agus fágtar an
teorantóir gan sos. Léimeann roghnú cuntais thar an nglas sin trí
`isModelLocked()`, agus déanann geata réamhsheolta an teaglaim amhlaidh freisin i gcás spriocanna atá ceangailte
leis an gceangal. Ar antigravity, a bhfuil a theorantóir in aghaidh an teaghlaigh chuóta, cuirtear an glas
ar an tsamhail bheacht, ar nós a ghlais chuóta eile. Cuirtear glas freisin ar an ainm a d'iarr an cliant
nuair a réitigh ailias é chuig an tsamhail sin, toisc go n-úsáideann na seiceálacha sin
an t-ainm iarrtha; glasáiltear go beacht é (`lockExactModel`), mar sin ní chuirtear glas riamh ar ailias dá chuid féin
a thrasnaíonn teaghlach cuóta antigravity nó scóip codex. Coinníonn
leid phróis, `retryDelay` neamhchlóscríofa, nó
teorantóir atá comhroinnte ag an gceangal iomlán an sos. Nuair a chuirtear an teorantóir a
d'atóg cosán 429 díreach anois ar sos, diúltaítear láithreach do ghlaoiteoir a dtiocfaidh deireadh lena thréimhse scuaine atá fágtha
sula dtiocfaidh deireadh leis an sos, le cód theorainn ama na scuaine
(`checkLimiterPause`), seachas fanacht go rachadh an tréimhse sin in éag; déantar an deireadh taifeadta a
ancaireacht sula dtógtar an teorantóir, san áit a dtosaíonn Bottleneck a chlog
athnuachana, agus déanann aon athrú níos déanaí ar an taiscumar dearmad air. Cumhdaítear é ag
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` agus
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — caipín iontrála roghnach (nua).** Cuireann `resilienceSettings.requestQueue.maxQueueDepth`
teorainn leis an líon iarratas a fhéadfaidh fanacht sa scuaine (gan a bheith seolta fós) le haghaidh aon
soláthraí+ceangail amháin ag aon am amháin. Nuair atá `maxQueueDepth`
iarratas sa scuaine cheana féin, diúltaítear go tapa d'iarratas nua le hearráid chlóscríofa
`code: "RATE_LIMIT_QUEUE_FULL"` **sula** sroicheann sé `limiter.schedule()` riamh
— mar sin tá an diúltú saor agus tarlaíonn sé roimh aon obair iartheachtach
chomhbhrúite / aistriúcháin leide don iarratas sin. Réamhshocrú `0` =
díchumasaithe, rud a chaomhnaíonn iompar reatha na scuaine gan teorainn; teorainn 0–100000.
Sáraigh trí `RATE_LIMIT_MAX_QUEUE_DEPTH` (athróg timpeallachta) nó
`resilienceSettings.requestQueue.maxQueueDepth` (paiste deaise/API).

Is feidhm íon í an tseiceáil iontrála féin
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), ionas
gur féidir í a thástáil le tástáil aonaid gan fíortheorantóir Bottleneck.

> Mhol an RFC a d'oscail #6593 bratach `bypassCompressionOnRateLimit`
> freisin. Is éard is píblíne `open-sse/services/compression/` sa stóras seo ná
> comhbhrú leide/comhthéacs ar an iarratas LLM amach (`chatCore.ts`,
> timpeall ar bhloc `resolveCompressionSettings`/`selectCompressionStrategy`),
> ní comhbhrú freagartha HTTP ar choirp 429 sintéisithe — níl aon
> chonair chóid mheaitseála ann do bhratach sheachanta litriúil. Ritheann an
> chéim chomhbhrú leide sin _roimh_ `withRateLimit()` i bpíblíne an iarratais
> faoi láthair freisin, mar sin is athrú ar leith, níos mó é athordú chun
> í a scipeáil ar dhiúltú scuaine-lána ná raon feidhme na saincheiste seo;
> níor cuireadh i bhfeidhm anseo é d'aon turas agus fágtar mar obair
> leantach é má fiú riosca an athordaithe an gnóthachan coigiltis CPU.

### Eangach Sábháilteachta Uathchumasaithe Ráta-Teorann & Cosaint Nasc (`rateLimitProtection`)

**Eangach sábháilteachta uathchumasaithe** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, réamhshocrú `true`):
De réir réamhshocraithe, cumasaíonn OmniRoute cosaint scuaine ráta-teorann go huathoibríoch do gach nasc gníomhach soláthraí eochair-API (`getProviderCategory(provider) === "apikey"`). Cinntíonn sé seo go gcuirtear iarratais isteach chuig eochracha API suasshrutha atá íogair maidir le rátaí ar scuaine agus go sriantar iad trí Bottleneck, seachas iad a phléascadh isteach in earráidí 429 suasshrutha. Is féidir an eangach sábháilteachta a shárú tríd an athróg timpeallachta `RATE_LIMIT_AUTO_ENABLE` (díchumasaíonn `false`/`0`/`off`, cuireann `true`/`1`/`on` i bhfeidhm go héigeantach), a bhfuil tosacht aige ar an socrú deais buanaithe (**Socruithe → Athléimneacht** / `PATCH /api/resilience`).

**Séimeantaic `rateLimitProtection` in aghaidh an nasc:**
Rianaítear cosaint ráta-teorann in aghaidh an nasc trí réimse Búlaíne `rateLimitProtection` ar naisc sholáthraithe (buanaítear mar `rate_limit_protection` in SQLite):

- **Casta air go sainráite (`rateLimitProtection === true`)**: Tá cosaint ráta-teorann cumasaithe go sainráite don nasc seo, beag beann ar chatagóir an tsoláthraí ná cibé an bhfuil an eangach sábháilteachta uathchumasaithe casta air.
- **Casta as go sainráite (`rateLimitProtection === false`)**: Díchumasaíonn sé an chosaint shainráite, ach **ní** roghnaíonn sé nasc gníomhach eochair-API amach as an eangach sábháilteachta uathchumasaithe dhomhanda. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), tá `false` agus `undefined` comhionann le chéile: ní mheastar ach `rateLimitProtection === true` mar shárú sainráite. Má tá `rateLimitProtection` `false` (nó gan socrú), chomhlíonann nasc gníomhach eochair-API an coinníoll uathchumasaithe i gcónaí agus fanann sé faoi chosaint ráta-teorann.
- **Gan roghnú amach in aghaidh an nasc**: Ní féidir le hoibreoir faoi láthair a lua go gcaithfidh "an nasc aonair gníomhach eochair-API seo rith gan chosaint scuaine ráta-teorann" agus uathchumasú á choinneáil gníomhach do naisc eile. Chun naisc eochair-API a rith go hiomlán gan scuaineanna ráta-teorann, ní mór an eangach sábháilteachta a chasadh as go domhanda (`RATE_LIMIT_AUTO_ENABLE=false` nó `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Conairí scríofa tacaithe:**

- **`POST /api/rate-limits`**: An chonair scríofa bainistíochta tacaithe chun `rateLimitProtection` a scoránú do nasc (`{ connectionId: string, enabled: boolean }`). Má ghlaoitear é seo le `enabled: true`, casfar an chosaint shainráite air; má ghlaoitear é seo le `enabled: false`, bainfear an chosaint shainráite (cé go bhfanann naisc ghníomhacha eochair-API clúdaithe faoin eangach sábháilteachta dhomhanda má tá uathchumasú casta air).
- **`PUT /api/providers/[id]`**: D'aon turas **ní** ghlacann sé le `rateLimitProtection` ná ní iompaíonn sé é (#11278). Ní athróidh nuashonrú meiteashonraí nasc soláthraí trí `PUT /api/providers/[id]` stát buanaithe na cosanta ráta-teorann riamh.

---

## 6. Faire faireacháin tréchuir do shruth mall (#9709)

Aimsíonn an chosaint roghnach `resilienceSettings.streamRecovery.throughputWatchdog`
réamhtheachtach atá fós ag seoladh smután ach atá ag táirgeadh aschur cúntóra faoi bhun
an ráta úsáideach aschuir atá cumraithe. Tá sí scartha d'aon ghnó ón teorainn ama
díomhaoin: ní athshocraíonn buillí croí ná meiteashonraí ceachtar amadóir agus ní áirítear
iad mar dhul chun cinn. Tá sí scartha freisin ón sprioc-am crua don iarracht (#9153),
a fhanann ina uasteorainn sábháilteachta absalóideach beag beann ar cháilíocht an aschuir.

Teastaíonn tréimhse téimh ón bhfaire faireacháin agus fuinneog rollach iomlán ina diaidh
sular féidir léi scor. Comhaireann sí deilte téacs ó theagmhais aschuir Chat Completions
agus Responses API (seachthomhas coimeádach beart UTF-8), déanann sí neamhaird de
theagmhais úsáide amháin agus de theagmhais fholmha, agus cuireann sí breithiúnas ar fionraí
fad atá teagmhais glao uirlise nó réasúnaithe ar siúl. Tá sí díchumasaithe de réir
réamhshocraithe agus is féidir í a chumasú le `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
cuireann gnáthshraith normalaithe na socruithe athléimneachta teorainn leis an bhfuinneog,
leis an téamh, leis an íosráta agus leis an íosmhéid aschuir intomhaiste.

Nuair a bhíonn sí cumasaithe, ní chuirtear scor ón bhfaire faireacháin i bhfeidhm ach ar an
iarracht réamhtheachtach ghníomhach. Sula mbíonn aon bheart infheicthe ag an gcliant, féadfaidh
an chonair athshlánaithe luath don chuntas céanna atá ann cheana an iarracht a athoscailt.
Tar éis tiomnaithe, ní athsheinntear an sruth go dall choíche; ní féidir ach leis an gconradh
sábháilte leanúnachais lár srutha atá ann cheana iarmhír a fhua. Fanann an tabhairt chun críche
aonuaire, mar sin ní dhéantar cuntasaíocht úsáide ná scaoileadh an tseamafóir a mhacasamhlú.

---

## 7. Athshonnú Stádais Uasghréasáin (earráidí cuóta míshonraithe)

**Scóip:** geata uasghréasáin amháin a thuairiscíonn díomáil cuóta shealadaigh leis an stádas HTTP mícheart.

**Cuspóir:** stádas míthreorach a cheartú SULA ndéantar aicmiú, ionas go bhfeiceann tomhaltóirí íosghréasáin (inneall fabhtcheilge, comhiomlánú teaglama, an freagra don chliant) fíornádúr in-atrialfach an teipe.

Comharthaíonn roinnt geataí díomáil cuóta SHEALADAIGH le stádas HTTP nach
bhfuil in-atrialfach. Filleann `agentrouter.org` `403` (uaireanta `400`) le
corp Síneach (`用户额度不足` / `额度不足`) in ionad an `429` chaighdeánaigh.
Déileálann cliaint ar nós Claude Code le `403` mar rud buan agus cuireann siad
deireadh tobann leis an seisiún, agus gan ceartú d'aicmeodh inneall an
fhabhtcheilge é mar `AUTH_ERROR` in ionad imeacht cuóta.

**Cur i bhfeidhm:**

- Clárlann + meaitseálaí: `open-sse/config/upstreamStatusRestatement.ts` — liosta
  rialacha in aghaidh an tsoláthraí (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), meaitseáilte trí `applyStatusRestatement()`.
- Suíomh glaonna: an bloc `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (thart ar líne 3654), díreach tar éis do `parseUpstreamError()` freagra
  uasghréasáin le stádas HTTP earráide (`!providerResponse.ok`) a pharsáil, agus
  sula ritheann aon aicmiú, ionas go bhfeiceann gach tomhaltóir íosghréasáin an
  stádas ceartaithe. Leanann earráidí leabaithe taobh istigh de shruth SSE `200`
  cosán ar leith parsála srutha níos déanaí agus **níl** siad clúdaithe ag an
  hook seo inniu — teorannú aitheanta, nach bhfuil de dhíth fós do mhí-stádas
  agentrouter (a thagann chun solais mar stádas HTTP earráide).
- Incháilitheacht atriala: tá `429` in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), mar sin iompraíonn earráid
  athshonraithe fíorfhuinneog atriala in ionad teacht chun solais mar `403` marbh.
- Níl sa `60s` sintéiseach `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ach an méid a insíonn an freagra athshonraithe don **chliant**; ní hé é féin
  fad fuaraithe/glasála inmheánach an chomhcheangail — rialaítear é sin ar leith
  ag cibé meicníocht a láimhseálann an earráid athshonraithe i ndáiríre
  (culghabháil éascach Connection Cooldown, §2, bun `3s` do sholáthraithe
  API-key; nó Model Lockout, §3, do sholáthraithe cuóta in aghaidh an mhúnla ar
  nós agentrouter). Is féidir leis an ródaire a bheith incháilithe le hatriail
  go hinmheánach níos luaithe ná an fhuinneog 60s a fhógairtear don chliant —
  corrlach d'aon ghnó, ní fabht.

Ní dhéantar earráidí buana (`无权访问模型` agentrouter — gan rochtain ar an múnla
seo) a athshonnú GO DEO: cuireann `excludeMarkers` véitó ar an riail fiú nuair a
aimsíonn `textMarkers`, ionas go gcoinníonn an earráid a stádas bunaidh agus
nach ndéanann aon rud í a atriail go deo. Déantar an riail aicmithe soláthraí
meaitseála (`agentrouter-model-access-denied` in
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, bunfhuarú dearbhaithe `6h`) a chomhairliú ag `checkFallbackError`
(`open-sse/services/accountFallback.ts`) _sula_ dtarlaíonn an luath-thuairisceán
ginearálta `FORBIDDEN` de chatagóir apikey, faoi gheata ag
`honorsRuleLockScope(provider)` (#10334 — eisiach do agentrouter faoi láthair
tríd an liosta ceadaithe `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). Sreabhann fuarú dearbhaithe 6h na rialach tríd mar
`fallbackResult.baseCooldownMs`, ach beathaíonn sé fós an cosán glasála cuóta in
aghaidh an mhúnla a bhí ann cheana (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, gan athrú ag #10334 ach amháin maidir le foinse
an fhuaraithe): clampáiltear síos é go dtí `mlSettings.maxCooldownMs` an
oibreora (réamhshocrú `1_800_000ms` / 30min), ar nós gach glasála múnla eile,
agus fanann an _fáth glasála seasmhaí_ mar an `"forbidden"` crua-chódaithe a bhí
ann cheana, ní `"auth_error"` na rialach — ní urramaítear ó thosach go deireadh
ach fad an fhuaraithe, ní teaghrán an fátha. Fanann an ceangal féin gníomhach;
ní chuirtear isteach ar mhúnlaí deartháireacha ar an gceangal céanna.

Sroicheann earráidí cuóta athshonraithe (`额度不足`) riail soláthraí i dtáirgeadh
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, gan fuarú dearbhaithe dá cuid féin — baineann réamhshocrú
culghabhála scálaithe an tsraithe sheasmhachta leis). Ó #10334, TÓGTAR `scope`
ar `ProviderErrorRuleMatch` ó thosach go deireadh, ach **amháin** do
sholáthraithe sa liosta ceadaithe `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — inniu `"agentrouter"` amháin, faoi gheata trí
`honorsRuleLockScope()`). Do gach soláthraí eile fanann `scope` faisnéiseach,
díreach mar a bhí roimh #10334. Tugann `checkFallbackError` scóip na rialach
meaitseáilte chun solais mar `fallbackResult.ruleScope`; is é
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) an garda
comhroinnte a dhearbhaíonn go bhfuil `ruleScope` fíor-shábháilte le honóráil mar
chomhartha ar fud an chomhcheangail, féin-aisghabhálach (scóip `"connection"`,
fáth `quota_exhausted`, gan `permanent` riamh, gan `creditsExhausted` riamh —
cosaint i gcoinne riail amach anseo a phéireálfeadh scóip `"connection"` le
staid chuntais bhuan). Glaonn dhá thomhaltóir air:

- **Marthanacht** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  in ionad titim isteach i mbrainse frithdhúnta **de réir samhla**
  an tsoláthraí pas-tríd (is é `passthroughModels: true` agentrouter →
  filleann `hasPerModelQuota()` `true`), cuireann sé **tréimhse fuaraithe
  shealadach don nasc** i bhfeidhm — `testStatus: "unavailable"` +
  `rateLimitedUntil`, agus ní stádas foirceanta riamh
  (`credits_exhausted`/`banned`/`expired`) — ionas go dtagann an nasc
  chuige féin nuair a théann an tréimhse fuaraithe in éag, seachas athshocrú
  láimhe dintiúr a bheith riachtanach. Déantar é seo a scipeáil i gcás nasc
  a bhfuil `disableCooling: true` aige (#2997): titeann an rogha diúltaithe
  sin tríd go dtí an frithdhúnadh de réir samhla ina ionad (comhréiteach
  doiciméadaithe — féach an nóta sa chód os cionn an bhrainse).
- **Ródú teaglama laistigh den iarratas céanna** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): marcálann an garda céanna
  an nasc sa tacar cuimhne `exhaustedConnections`, leis an eochair
  `${provider}:${connectionId}`. Ní dhéanann sé seo ach sprioc atá fágtha san
  IARRATAS CÉANNA a scipeáil nuair a _iompraíonn an sprioc sin féin an
  `connectionId` beacht sin cheana_ ar a réad sprice féin
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` roimh chuardach `exhaustedConnections`) — i ngnáth-theaglama
  liosta samhlacha, áit nach n-iompraíonn spriocanna comhchosúla aon
  `connectionId` pionnáilte dá gcuid féin agus nach réitítear ceann ach
  amháin in aghaidh gach seolta ó cheanntásc
  `X-OmniRoute-Selected-Connection-Id` an fhreagra, ní mheaitseáiltear an
  eochair sin choíche. Sa ghnáthchás sin, NÍ hé an Set seo an chosaint
  iarbhír ar chéim atá fágtha agus í ag athúsáid an chuntais atá díreach
  ídithe — is í an tsraith mharthanachta thuas í (`rateLimitedUntil` an naisc
  sa todhchaí anois), in éineacht leis an ngarda céanna seo a choisceann
  `transientRateLimitedProviders` don teip (féach "Dearadh dhá chéim" agus an
  nóta sa chód ar an mbrainse `isAgentrouterConnectionQuotaScope` in
  `targetExhaustion.ts`): agus an Set sin fágtha gan mharcáil, NÍ chuirtear
  iachall-cheadú `allowRateLimitedConnection` in `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) i bhfeidhm ar na
  céimeanna atá fágtha ag an soláthraí, mar sin cloítear de ghnáth le scagaire
  `rateLimitedUntil` roghnú na ndintiúr (`src/sse/services/auth.ts:1238`),
  agus roghnaíonn céim atá fágtha nasc agentrouter eile atá fós incháilithe,
  nó teipeann uirthi toisc nach bhfuil aon dintiúir ar fáil — ní chuireann sí
  iallach uirthi féin filleadh ar an nasc a chuir an brainse seo faoi
  fhuarú díreach anois.

### Dearadh dhá chéim: athshonrú stádais, ansin aicmiú

Is clárlanna ar leith iad athshonrú stádais
(`upstreamStatusRestatement.ts`) agus rialacha aicmithe soláthraí
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) a úsáideann
aitheantas an tsoláthraí agus marcóirí téacs mar eochracha, ach ritheann siad
in áiteanna éagsúla agus feidhmíonn siad cuspóirí éagsúla: athscríobhann an
t-athshonrú an stádas HTTP go luath in `chatCore.ts`; roghnaíonn na rialacha
aicmithe an `reason` cúltaca agus `scope` an ghlasála
(`model` / `provider` / `connection`) laistigh de `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Ní fheiceann rialacha aicmithe téacs iomlán na hearráide (atá riachtanach
chun marcóirí coirp amhail `额度不足` a mheaitseáil) ach amháin i gcás
soláthraithe atá liostaithe ar liosta ceadaithe `FULL_TEXT_RULE_PROVIDERS`
in `providerErrorRules.ts` — níl ach `"agentrouter"` air faoi láthair. I gcás
gach soláthraí **catalóige ionsuite** eile, ní thugann `checkFallbackError`
do `getProviderErrorRuleMatch` ach an earráid struchtúrtha (`{code, type}`),
rud ar leor é do rialacha bunaithe ar cheanntásc/stádas/cód ach nach bhfeiceann
marcóirí téacs sa chorp. Déanann an cúntóir `resolveRuleMatchBody()` an roghnú
seo: téacs iomlán na hearráide i gcás soláthraithe ar an liosta ceadaithe,
agus an earráid struchtúrtha i ngach cás eile. Is rogha shainráite
rogha-isteach de réir soláthraí é soláthraí **ionsuite** a chur le
`FULL_TEXT_RULE_PROVIDERS` — tá sé ann ionas go bhfanfaidh an chonair
réamhshocraithe do gach soláthraí nach bhfuil ar an liosta gan athrú, beart
ar bheart.

Is rogha isteach ar leith ó `FULL_TEXT_RULE_PROVIDERS` é `scope` rialach
(`model` / `provider` / `connection`): ní nochtann `checkFallbackError` é ach
mar `fallbackResult.ruleScope`, agus ní thugann tomhaltóirí iartheachtacha
éifeacht dó thar lipéad faisnéiseach ach amháin i gcás soláthraithe ar liosta
ceadaithe `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa chomhad céanna (faoi gheata
`honorsRuleLockScope()` — níl ach `"agentrouter"` ann inniu). Féach
"Earráidí cuóta athshonraithe" thuas chun a fháil amach cad a dhéanann
meaitseáil `scope: "connection"` i ndáiríre a luaithe a bhíonn soláthraí ar
an liosta ceadaithe sin.

**#11104 — seachnaíonn rialacha arna ndearbhú ag oibreoir an dá liosta
ceadaithe.** Is féidir le hoibreoir riail de réir soláthraí a dhearbhú ag am
rite trí `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) gan
an comhad seo a chur in eagar. Dá gcuirfí riail oibreora faoi gheata
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — liostaí
ceadaithe atá ceaptha chun iompar **réamhshocraithe** rialacha na catalóige
ionsuite a chosaint — d'fhágfaí meicníocht na socruithe neamhéifeachtach do
gach soláthraí seachas iad siúd atá liostaithe ann cheana, ós rud é gurb é
dearbhú na rialach féin rogha shainráite isteach an oibreora cheana féin.
Seiceálann `resolveRuleMatchBody()` agus `honorsRuleLockScope()`
`hasOperatorRuleForProvider()` ar dtús: faigheann soláthraí a bhfuil riail
oibreora aige téacs amh na hearráide agus tugtar éifeacht dá `scope`
dearbhaithe, beag beann ar cé acu atá sé ar cheachtar liosta ceadaithe
freisin nó nach bhfuil.

**Bearna aitheanta — ní théitear i gcomhairle le `providerRuleRegistry`
riamh i gcás HTTP 400.** Aicmíonn brainse `BAD_REQUEST` de
`checkFallbackError` stádas 400 go hiomlán trína eagair patrún féin
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, etc. in
`accountFallback.ts`) agus filleann sé sula sroichtear an brainse
`configuredRule`/`getProviderErrorRuleMatch` os a chionn. Tá riail catalóige
ionsuite (nó riail oibreora) le `status: 400` bailí ó thaobh comhréire de,
ach ní chuirfear i ngníomh í choíche. Níl aon riail atá ann faoi láthair
dírithe ar 400, mar sin ní dhéantar difear d'aon rud sa táirgeadh — ach ní
mór an brainse seo a athrú ar dtús do riail 400 amach anseo, ar athrú níos
mó é ná riail a chur leis (ath-aicmíonn sé 400 do gach soláthraí atá ag brath
cheana ar iompar na n-eagar patrún) agus tá sé lasmuigh de scóip riail a chur
leis do sholáthraí aonair.

### Geata nua a mhíshonraíonn cuóta a chur leis

1. Cláraigh eagar rialacha amháin i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Coinnigh `textMarkers`
   sonrach don tsoláthraí; ná hathúsáid frásaí ginearálta Béarla a
   imbhuaileann le `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Cláraigh rialacha aicmithe go roghnach in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) chun an
   scóip glais ceart a phiocadh (`connection` do chuóta ar fud an chuntais,
   `model` d'earráidí in aghaidh an mhúnla). Ní théann an chéim seo i bhfeidhm
   sa táirgeadh ach do sholáthraithe a dteastaíonn an téacs earráide iomlán
   óna gcuid rialacha (marcóirí coirp): cuir aitheantas an tsoláthraí le
   `FULL_TEXT_RULE_PROVIDERS` sa chomhad céanna — ar shlí eile ní thugann
   `checkFallbackError` don riail riamh ach an earráid struchtúrtha
   `{code, type}` agus ní mheaitseáilfidh riail atá bunaithe ar théacs an
   chorp an trácht beo choíche. Ní theastaíonn an rogha isteach seo ó
   rialacha a mheaitseálann go hiomlán ar `status`/`headers` (cosúil le
   rialacha Opencode nó Minimax). Ar leithligh, má dhearbhaíonn an riail
   `scope: "connection"` agus más é an rún fuarú fíor ar fud an nasc mór le
   scipeáil combo den iarratas céanna (ní lipéad faisnéiseach amháin), cuir
   aitheantas an tsoláthraí le `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa chomhad
   céanna — is é seo a gheataileann an tomhaltas ar nós
   `isAgentrouterConnectionQuotaScope()` in `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) agus in `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); gan é, sreabhann `scope`
   fós trí `fallbackResult.ruleScope` ach ní ghníomhaíonn aon rud air.
3. Cuir tástálacha aonaid leis a mhacasamhlaíonn
   `tests/unit/upstream-status-restatement.test.ts` agus
   `tests/unit/agentrouter-error-rules.test.ts` (lena n-áirítear na gardaí
   not-permanent / not-creditsExhausted, agus — má theastaíonn an liosta
   ceadaithe ón soláthraí — tástáil a dhearbhaíonn nach bhfilleann
   `resolveRuleMatchBody()` an téacs iomlán ach don soláthraí sin).

Níl aon athruithe ar `chatCore.ts`, `classifyError`, nó combo ag teastáil.

#### Glas buicéadaithe de réir IP eisrigh (#10880)

Déileáiltear le soláthraithe in `EGRESS_BUCKETED_LOCK_PROVIDERS` (teaghlach
opencode) mar shruthuas buicéadaithe de réir IP (tá leibhéal saor in aisce
opencode buicéadaithe de réir IP, ní buicéadaithe de réir cuntais — féach
#9611): fuaróidh earráid stádas-429 a aicmítear mar `quota_exhausted` **nó**
`rate_limit_exceeded` gach nasc de theaghlach na liosta ceadaithe a bhfuil a
IP eisrigh deireanach aitheanta mar an gcéanna le IP an nasc a theipeann air,
sular féidir leis an rothlú iad a thriail — agus N-1 glao suas shruth atá
ráthaithe go dteipfidh orthu á seachaint (an cruth céanna le
#10460/#10525). Tá `rate_limit_exceeded` san áireamh d'aon turas: ar chonair
`markAccountUnavailable` ní mheaitseálann na rialacha atá sonrach do opencode
riamh (ní thugtar ceanntásca ná corp do `checkFallbackError`, agus níl
opencode in `FULL_TEXT_RULE_PROVIDERS`), mar sin aicmítear 429 a bhfuil téacs
an chuóta síntiúis ina chorp ("monthly usage limit reached") mar
`quota_exhausted` ag an gcúlbhealach téacs cuóta
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; fuarú 1 uair an
chloig) sula sroictear riail `status_429` riamh — fad is go n-aicmítear 429
atá saor ó théacs cuóta (gnáth-theorannú ráta) trí riail `status_429` mar
`rate_limit_exceeded` agus fuaróidh sé an teaghlach IP i gcónaí. Do
sholáthraí ar an liosta ceadaithe, is é an comhartha céanna é teorainn ráta
buicéadaithe de réir IP agus cuóta atá ídithe. Teorainneacha macánta:

- **Dícheall is fearr**: réitíonn an glas an `egress_ip` is déanaí ar eolas
  den cheangal as `proxy_logs` (fuinneog 24 uair, sioncrónach, gan taisce).
  Taisce fuar (nár tástáladh an IP aschuir riamh) nó gan ró ar bith →
  fuarófar an ceangal teipthe fós ag an mbrainse (taifeadtar é mar a dhéantar
  inniu), ach ní ghlasálfar aon tsiblín.
- **Ní teirminithe riamh**: is fuinneog chuóta athnuacháin í an fhuarú
  (`testStatus: "unavailable"`); ní dhiorthaítear staid bhuan riamh ó
  chomhartha ar leibhéal IP. Seachnaíonn ceangail `disableCooling` an
  brainse ar fad.
- **Athraíonn gráinneacht an ghlas don teaghlach ceadliostathe**: is athrú
  raon feidhme é seo, ní barrfheabhsú siblíne amháin. Is soláthraí
  `passthroughModels` é opencode, mar sin roimh an mbrainse seo bhí glasáil
  in aghaidh an MHUNLA ag 429; anois is fuarú ceangail a tháirgtear — lena
  n-áirítear d'oibreoir a ritheann ceangal amháin gan siblín ar bith. Sin í
  an ghráinneacht a dhearbhaíonn tábla rialacha opencode cheana féin a bheith
  ceart (`scope: "connection"`, `providerErrorRules.ts`), nár urramaíodh go
  dtí seo toisc nach bhfuil opencode in `HONORS_RULE_LOCK_SCOPE_PROVIDERS`.
  Scríobhann an brainse fuarú an cheangail theipthe + `backoffLevel` leis
  féin, ag macasamhlú brainse agentrouter atá raon-ceilte ar an gceangal,
  agus filleann sé — ní shroictear riamh an bloc in aghaidh an mhúnla ná an
  chonair chineálach thíos.
- **Combo san áireamh**: cosúil le brainse agentrouter, déanann an raon
  feidhme neamhaird go d'aon ghnó den íosghrádú
  `persistUnavailableState`/`isCombo` a chuireann glaodóir combo i bhfeidhm
  ar 429. Ní foirm níos laige den raon feidhme seo í glasáil in aghaidh an
  mhúnla, is aonad mícheart í: ní deir sí aon rud faoin IP atá ídithe, mar
  sin leanfadh rothlú an combo ag dó glao amháin in aghaidh na siblíne atá
  cinnte go dteipfidh.
- **Sábháilteacht siblíne**: ní fhorscríobhtar riamh siblín atá teirminithe
  cheana féin (coiscthe/credits_exhausted) nó atá i bhfuarú níos faide cheana
  féin.
- **Ceadliosta eisiach**: is cinneadh sainráite ón úinéir é
  `EGRESS_BUCKETED_LOCK_PROVIDERS` a leathnú; gan sreangú cineálach ar bith
  (patrún #10334/#10419). Ceanglaíonn ceist na siblíne an ceadliosta céanna
  sin seachas é a athdhéanamh mar liteartha SQL, ionas go bhfanann a leathnú
  ina athrú aon líne amháin.
- **Rothlú an IP aschuir, an dá threo**: tá an fhuinneog chuardaigh (24 uair)
  i bhfad níos leithne ná TTL an taisce IP aschuir (5 nóim), mar sin is stair
  í "an IP is déanaí ar eolas", ní staid reatha. Má rothlaigh proksi ceangail
  laistigh den fhuinneog, d'fhéadfadh an glas **IP a roinntear go fíor a
  chailleadh** (is é an IP taifeadta an ceann nua, neamh-ídithe) — agus go
  siméadrach d'fhéadfadh sé **siblín a fhuarú a rothlaigh ó shin** ón IP
  ídithe. Sa dara cás, costaíonn sé fuinneog fhuaraithe amháin don tsiblín
  sin; glacadh leis an dá cheann mar theorainneacha dícheall-is-fearr de
  chuardach bunaithe ar stair.
- **Costas**: dhá scanadh teoranta ar `proxy_logs` (scagtha de réir
  fuinneoige trí `idx_pl_timestamp`), ag minicíocht 429 amháin. Gan innéacs
  nua (imirce 134 YAGNI). Tomhaiste ar chóip DB de thrácht fíor de mhéid
  measartha; coimeádann instans ardthráchtála níos mó rónna go comhréireach
  san fhuinneog chéanna.

---

## Gnéithe Athléimneachta Eile

- **21 straitéis ródaithe** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — féach [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Ródú feasach ar an athshocrú** (v3.8.0) — tugann sé tosaíocht do naisc de réir am athshocraithe an chuóta.
- **Díghrádú mód cúlra** — Responses API `background: true` díghrádaithe go sioncrónach le rabhadh.
- **Braite dinimiciúil teorann uirlisí** — cuireann sé soláthraithe ar chúlú nuair a shroictear teorainneacha líon uirlisí.
- **Teipfhreastal éigeandála** — á rialú ag `OMNIROUTE_EMERGENCY_FALLBACK`; is féidir le hoibreoirí é a shárú ó leathanach na mBratach Gnéithe gan atosú.

---

## Dífhabhtú

- Freagraíonn an teaglaim ualaithe le `503 all_targets_cooling_down` (`Retry-After` socraithe, liostaíonn `diagnostics.excluded` gach sprioc le `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → tá an linn cumraithe agus ceangailte, níl ach gach sprioc eisiata ag amadóir athléimneachta; ainmníonn an rabhadh `[COMBO] Weighted selection: every target excluded before dispatch — …` na cúiseanna agus na soicindí atá fágtha. Ciallaíonn `404 no_executable_targets` ón teaglaim chéanna nach raibh aon amadóir athléimneachta i gceist (faic le rith, nó theip ar gach cuntas tástálaí na hinfhaighteachta). Tógtha in `open-sse/services/combo/pinRecovery.ts` ó na heisiaimh a bailíodh in `targetResolution.ts`.
- Gach eochair le haghaidh soláthraí scáinte → seiceáil staid an chuardabhrisithe AGUS `rateLimitedUntil`/`testStatus` gach ceangail.
- Soláthraí eisiata go buan tar éis fhuinneog an athshocraithe → cód ag léamh `state` amh in ionad `getStatus()`/`canExecute()`.
- Theipeann ar eochair amháin, ba cheart go n-oibreodh cinn eile → bíodh togha ag fuarú ceangail seachas an cuardabristeoir.
- Mura dteipeann ach ar mhúnla amháin → bíodh togha ag glasáil múnla seachas fuarú ceangail.
- Ba cheart don staid féintéarnamh a dhéanamh ach ní dhéanann → seiceáil an bhfuil stampa ama sa todhchaí ann + conair léite a athnuachanann an staid éagtha. Éilíonn stádais bhuanacha athruithe láimhe.

---

## Staid am rite — tagairt thapa don ghníomhaire

> Bogadh focal ar fhocal ó `AGENTS.md` → "Resilience Runtime State" (PR #12743) ionas
> go bhfanann treoir an ghníomhaire faoi bhun an bhuicéid chomhthéacs 40k. Is é seo an
> tuairim chomhdhlúite, dírithe ar an ngníomhaire, ar na rannóga thuas; is iad na rannóga
> uimhrithe an tagairt iomlán fós.

Tá trí mheicníocht theipeanna sealadacha ag OmniRoute atá gaolmhar ach ar leithligh ó
chéile. Coinnigh a raon feidhme scartha agus iompar ródaithe á dhífhabhtú agat. Féach an
[léaráid athléimneachta 3 chiseal](../diagrams/exported/resilience-3layers.svg)
(foinse: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
le haghaidh forbhreathnaithe gasta.

### Cuardabristeoir an tSoláthraí

**Raon feidhme**: an soláthraí iomlán, m.sh. `glm`, `openai`, `anthropic`.

**Cuspóir**: stop a chur le trácht a sheoladh chuig soláthraí atá ag teip arís agus arís
eile ar leibhéal an tsrutha suas/seirbhíse, ionas nach gcuireann soláthraí amháin
míshláintiúil moill ar gach iarratas.

**Feidhmiú**:

- Croí-rang: `src/shared/utils/circuitBreaker.ts`
- Sreangú geata/forghníomhaithe an chomhrá: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stádais am rite: `src/app/api/monitoring/health/route.ts`
- Filleáin chomhroinnte: `open-sse/services/accountFallback.ts`
- Tábla stádais buanaithe: `domain_circuit_breakers`

**Stádais** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ceadaítear gnáth-thrácht.
- `DEGRADED`: banda luathrabhaidh — sháraigh teipeanna an tairseach díghrádaithe ach ní
  tairseach an bhrisithe go fóil; leanann trácht ar aghaidh, taispeánann na painéil an
  rabhadh. Filleann tástáil bhailí ceangail nó fuinneog chiúin gan teip nua é go `CLOSED`
  (tá an fhuinneog in `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: tá an soláthraí bacaithe go sealadach; faigheann glaonnaigh freagra
  «cuardach soláthraí oscailte» nó scipeann an ródú teaglama chuig sprioc eile.
- `HALF_OPEN`: tá teorainn ama an athshocraithe caite; ceadaigh iarratas tástála.
  Dúnann rath an bristeoir, osclaíonn teip arís é.

**Réamhshocruithe** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, á gcatheamh trí
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` in `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` in `src/sse/handlers/chatHelpers.ts`). Feidhmíonn
bristeoir an tsoláthraí iomláin ar `circuitBreakerThreshold` / `circuitBreakerReset`:

| Próifíl     | díghrádaíonn ag | osclaíonn ag (`circuitBreakerThreshold`) | athshocrú (`circuitBreakerReset`) |
| ----------- | --------------: | ---------------------------------------: | --------------------------------: |
| OAuth       |             `5` |                                      `8` |                             `60s` |
| Eochair API |             `7` |                                     `12` |                             `30s` |
| Áitiúil     |   (díorthaithe) |                                      `2` |                             `15s` |

Sainmhíníonn `PROVIDER_PROFILES` freisin `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 nóim) agus `providerCooldownMs` (5/10/1 nóim): is iad
seo a chumhachtaíonn **geata fuinneoige an Fhuaraithe Soláthraí dhomhanda le roghnú
isteach** (`PROVIDER_COOLDOWN_ENABLED`, múchta de réir réamhshocraithe) — ní áirítear
iontráil ar leibhéal soláthraí in `open-sse/services/providerCooldownTracker.ts` mar
fhuarú ach tar éis `providerFailureThreshold` teip laistigh de `providerFailureWindowMs`,
agus ansin fuaireann sí ar feadh `providerCooldownMs`. NÍ tairseacha an bhrisithe bheo
iad seo — ná déan iad a thiúnadh ag súil le hiompar an bhrisithe. Is féidir gach
réamhshocrú a shárú trí na hathróga comhshaoil `OMNIROUTE_PROVIDER_BREAKER_*` agus
`OMNIROUTE_CIRCUIT_BREAKER_*`; tá an tábla tagartha cruinn don am rite in
`docs/architecture/RESILIENCE_GUIDE.md`.

Níor cheart ach do stádais teipe ar leibhéal soláthraí bristeoir an tsoláthraí a scor:

```ts
(408, 500, 502, 503, 504);
```

Ná scor bristeoir an tsoláthraí iomláin le haghaidh gnáth-earráidí cuntais/eochair/mhúnla
cosúil le formhór na gcásanna `401`, `403`, nó `429`. Is le fuarú ceangail nó glasáil
múnla a bhaineann siad sin de ghnáth. Ba cheart go mbeadh `403` ó sholáthraí cineálach
eochair API in-athghabhála mura bhfuil sé aicmithe mar earráid chríochnaitheach
soláthraí/chuntais.

Úsáideann an bristeoir téarnamh leisciúil, seachas lasc ama cúlra. Nuair a éagann `OPEN`, déanann léamha ar nós `getStatus()`, `canExecute()`, agus `getRetryAfterMs()` an staid a athnuachan go `HALF_OPEN`, ionas nach leanann deais agus tógálaithe iarrthóirí teaglaim ag eisiamh soláthraí éagtha go deo.

### Fuarú Ceangail

**Scóip**: ceangal/cuntas/eochair sholáthraí amháin.

**Cuspóir**: eochair nó cuntas droch-chaighdeánach amháin a scipeáil go sealadach agus ceangail eile don soláthraí céanna á gceadú chun leanúint ag freastal ar iarratais.

**Feidhmiú**:

- Conair scríofa/nuashonraithe: `src/sse/services/auth.ts::markAccountUnavailable()`
- Roghnú/scagadh cuntais: `src/sse/services/auth.ts::getProviderCredentials...`
- Ríomh an fhuaraithe: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Socruithe: `src/lib/resilience/settings.ts`

Réimsí tábhachtacha ar cheangail sholáthraí:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Le linn roghnú cuntais, scipeáiltear ceangal fad is:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Is fuaruithe leisciúla iad freisin: nuair atá `rateLimitedUntil` san am atá caite, bíonn an ceangal incháilithe arís. Ar úsáid rathúil, glanann `clearAccountError()` `testStatus`, `rateLimitedUntil`, réimsí earráide, agus `backoffLevel`.

Iompar réamhshocraithe fuaraithe ceangail:

- Fuarú bonnlíne OAuth: `5s`.
- Fuarú bonnlíne eochair API: `3s`.
- Ba cheart do `429` eochair API tosaíocht a thabhairt do leideanna athraigh uasabhair (`Retry-After`, ceanntásca athshocraithe, nó téacs athshocraithe inpharsáilte) nuair atá siad ar fáil.
- Úsáideann teipeanna in-aisghabhála arís agus arís eile cúlcheadú easpónantúil:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Cuireann an garda frith-thundering-herd cosc ar theipeanna comhthráthacha ar an gceangal céanna an fuarú a leathnú arís agus arís eile nó `backoffLevel` a mhéadú faoi dhó.

Ní fuaruithe iad staideanna críochfoirt. Tá sé beartaithe go bhfanfaidh `banned`, `expired` (nach mbíonn críochfoirt ann ach tar éis N atriail theoranta trí `EXPIRED_RETRY_MAX`), agus `credits_exhausted` as láthair go dtí go n-athrófar dintiúir/socruithe nó go n-athshocróidh oibreoir iad. Ná forscríobh staideanna críochfoirt le staid fhuaraithe shealadaigh.

### Glasáil Múnlaí

**Scóip**: soláthraí + ceangal + múnla.

**Cuspóir**: ceangal iomlán a dhíchumasú a sheachaint nuair nach bhfuil ach múnla amháin as láthair nó teoranta do chuóta don cheangal sin.

Samplaí:

- Soláthraithe cuóta in aghaidh an mhúnla a fhilleann `429`.
- Soláthraithe áitiúla a fhilleann `404` do mhúnla amháin atá ar iarraidh.
- Teipeanna ceadanna mód/múnla atá sainiúil don soláthraí, ar nós móid roghnaithe Grok.

Tá glasáil múnlaí lonnaithe i `open-sse/services/accountFallback.ts` agus ligeann sí don cheangal céanna leanúint ag freastal ar mhúnlaí eile.

### Treoir Dífhabhtaithe

- Má scipeáiltear gach eochair do sholáthraí, scrúdaigh staid bhristeoir an tsoláthraí agus `rateLimitedUntil`/`testStatus` gach ceangail araon.
- Má bhíonn soláthraí eisithe go buan tar éis na fuinneoige athshocraithe, seiceáil an bhfuil an cód ag léamh `state` amh in ionad `getStatus()`/`canExecute()` a úsáid.
- Má theipeann ar eochair sholáthraí amháin ach ba cheart go n-oibreodh cinn eile, tabhair tosaíocht d'fhuarú ceangail seachas bristeoir soláthraí.
- Má theipeann ar mhúnla amháin, tabhair tosaíocht do ghlasáil múnlaí seachas fuarú ceangail.
- Má ba cheart go dtiocfadh staid chucu féin, ba cheart go mbeadh stampa ama amach anseo/teorainn ama athshocraithe aici agus conair léite a athnuachanann staid éagtha. Éilíonn stádais bhuan athruithe láimhe ar dhintiúir nó ar chumraíocht.

---

## Méarlorgú TLS & Rúndacht

Tá an rúndacht shonrach don tsoláthraí (JA3/JA4, CCH, doiléirú) doiciméadaithe ar leithligh — féach `docs/security/STEALTH_GUIDE.md` (git; ní chuirtear san áireamh i `/docs` é).

---

## Tástáil athléimneachta (Céim 8 · Bloc C)

Thar thástálacha aonaid ar loighic na hathléimneachta, cuireann tri thástáil an t-am rite faoi choinníollacha fíor struis/teipe (comhtháthú/oíche iad go léir — ní chuireann aon cheann bac ar PRanna):

| Tástáil       | Cad                                                                                                                                                                                                                            | Rith                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| Chaos         | Insteallann nód upstream bréige moill/athshocrú/am-amuigh/503 fíora; bailíochtaíonn sé go n-osclaíonn an briseoir ciorcaid agus go n-aisghabhann sé, agus go rangúiltear `checkFallbackError` 503 mar chúltaca in-aisghabhtha. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Fás an chairn | ~500 sruth in aghaidh `createSSEStream` faoi `--expose-gc`; teipeann sé má fhásann an carn thar an uasteorainn (garda OOM #3069).                                                                                              | `npm run test:heap`                    |
| k6 soak       | Ualach leanúnach i gcoinne `/api/monitoring/health`; tairseacha p95/earráide.                                                                                                                                                  | `k6 run tests/load/k6-soak.js` (oíche) |

Comhordaithe ag `.github/workflows/nightly-resilience.yml` (cron + seoladh láimhe). Sa `test:integration` réamhshocraithe, scipeálann an chaos agus an carn iad féin (gan `RUN_CHAOS_INT`/`--expose-gc`).

---

## Féach freisin

- [Treoir Ailtireachta](./ARCHITECTURE.md) — Ailtireacht agus inmheánaigh an chórais
- [Treoir Úsáideora](../guides/USER_GUIDE.md) — Soláthraithe, teaglama, comhtháthú CLI
- [Inneall Auto-Combo](../routing/AUTO-COMBO.md) — Scóráil 16-fachtóir, pacáistí mód
