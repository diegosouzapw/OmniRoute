# Resilience Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute yana da hanyoyin juriya guda uku mabambanta amma masu alaƙa. Kowannensu yana da iyaka da manufa daban. A ware su yayin binciken matsalolin halayen routing.

![Samfurin juriya mai matakai 3](../diagrams/exported/resilience-3layers.svg)

> Tushe: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker na Provider

**Iyaka:** provider gaba ɗaya (misali, `glm`, `openai`, `anthropic`).

**Manufa:** dakatar da aika traffic zuwa provider da ke yawan samun gazawa a matakin upstream/service.

**Aiwatarwa:**

- Babban class: `src/shared/utils/circuitBreaker.ts`
- Haɗawa: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API na matsayi: `GET /api/monitoring/health`
- API na sake saiti: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Teburin DB: `domain_circuit_breakers`

**Yanayi:**

- `CLOSED` — an yarda da traffic na yau da kullum
- `DEGRADED` — har yanzu an yarda da traffic, amma ana sa ido kan ƙaruwar gazawar provider
- `OPEN` — an toshe provider na ɗan lokaci; combo routing yana tsallake shi
- `HALF_OPEN` — lokacin jiran sake saiti ya ƙare; an yarda da buƙatar gwaji

**Tsoffin ƙimomin da za a iya daidaitawa (`open-sse/config/constants.ts`, ana nuna su a Dashboard → Settings → Resilience):**

| Nau'i   | Yana zama degraded bayan | Yana buɗewa bayan | Lokacin jiran sake saiti |
| ------- | ------------------------ | ----------------- | ------------------------ |
| OAuth   | gazawa 5                 | gazawa 8          | 60s                      |
| API-key | gazawa 7                 | gazawa 12         | 30s                      |
| Local   | ana ƙididdige shi        | gazawa 2          | 15s                      |

`degradationThreshold` yana sarrafa lokacin da provider zai shiga `DEGRADED`; `failureThreshold` yana sarrafa lokacin da zai buɗe kuma a tsallake shi. Har yanzu ba a nuna bayanan saitunan Local provider a shafin saitunan Resilience ba.

**Lambobin kunnawa:** matsayin matakin provider kawai `[408, 500, 502, 503, 504]`. Kada a kunna shi saboda kurakuran matakin account (mafi yawan 401/403/429 — waɗannan na cooldown ko lockout ne).

**Farfadowa ta lazy:** idan lokacin `OPEN` ya ƙare, `getStatus()`, `canExecute()`, `getRetryAfterMs()` suna sabunta yanayin zuwa `HALF_OPEN`. Ba a buƙatar timer da ke aiki a bango.

---

### Provider Cooldown na gama-gari mai buƙatar kunnawa (ƙofar window)

Wani mataki na huɗu, wanda **dole ne a zaɓi kunna shi** (`PROVIDER_COOLDOWN_ENABLED`, a tsohuwa yana **kashe**), yana adana
tarihin providers masu gazawa tsakanin buƙatu a cikin
`open-sse/services/providerCooldownTracker.ts`, wanda combo target
resolution ke dubawa domin buƙatun combo masu biyo juna su daina sake bi ta provider da ya
gaza kwanan nan. Bayanan matakin provider suna bin ƙofar window ta `PROVIDER_PROFILES`:

| Profile | yana kunnawa bayan (`providerFailureThreshold`) | a cikin (`providerFailureWindowMs`) | yana hucewa na tsawon (`providerCooldownMs`) |
| ------- | ----------------------------------------------: | ----------------------------------: | -------------------------------------------: |
| OAuth   |                                            `10` |                             `15min` |                                       `5min` |
| API key |                                            `15` |                             `30min` |                                      `10min` |

Idan bai kai threshold ba, ba a ɗaukar provider a matsayin yana cikin **cooldown**; nasara tana share
window ɗin. Bayanan matakin connection (`provider:connectionId`) suna ci gaba da amfani da
exponential backoff na `minRetryCooldownMs → maxRetryCooldownMs`. Sauye-sauyen ƙima:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Kariyar regression: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Lokacin Jiran Sake Haɗawa

**Iyaka:** haɗin mai samarwa/asusu/maɓalli guda ɗaya.

**Manufa:** tsallake maɓalli mara kyau guda ɗaya yayin da sauran haɗin mai samarwa ɗaya ke ci gaba da bayar da sabis.

**Aiwatarwa:**

- Sanya a matsayin mara samuwa: `src/sse/services/auth.ts::markAccountUnavailable()`
- Zaɓi: `getProviderCredentials*` a cikin fayil ɗaya
- Lissafin lokacin jira: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Saituna: `src/lib/resilience/settings.ts`

**Filaye na kowane haɗi:**

- `rateLimitedUntil` — hatimin lokaci har lokacin jira ya ƙare
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ƙididdigar jinkirin baya mai ƙaruwa ninki-ninki

**Tsoffin lokutan jira:**

- Tushen OAuth: 5s
- Tushen API-key: 3s
- API-key 429: yana fifita `Retry-After`/taken sake saiti na uwar garke/rubutun sake saiti da za a iya fassarawa
- Jinkirin baya: `baseCooldownMs * 2 ** failureIndex`

**Kariyar hana turmutsitsin buƙatu:** tana hana gazawa masu faruwa lokaci guda tsawaita lokacin jira fiye da kima ko ƙara `backoffLevel` sau biyu.

**Halayen ƙarshe (BA lokutan jira BA):**

- `banned` — ana saita shi ta hanyar gano kalmar da aka haramta / haramta asusu (duba [BAN_DETECTION](../security/BAN_DETECTION.md)), da kuma ƙin buƙata sau uku a jere daga uwar garke (`request_rejected`, misali Anthropic OAuth 403 "Ba a yarda da buƙatar ba" — `open-sse/services/requestRejectedStreak.ts`); ƙin guda ɗaya kawai yana sanya haɗin cikin lokacin jira
- `expired` (yana komawa yanayin ƙarshe bayan iyakantattun sake gwadawa — `EXPIRED_RETRY_MAX = 3` tare da jinkirin baya mai ƙaruwa ninki-ninki — domin kurakuran OAuth na wucin gadi su iya gyara kansu kafin a kashe asusun na dindindin)
- `credits_exhausted`

Waɗannan suna ci gaba da kasancewa har sai bayanan shaida sun canza ko mai gudanarwa ya sake saita su. Kada a maye gurbin halayen ƙarshe da yanayin jiran wucin gadi.

**Farfadowa ta kasala:** idan lokacin `rateLimitedUntil` ya wuce, haɗin zai sake cancantar amfani. Bayan amfani mai nasara, `clearAccountError()` yana share dukkan filayen kuskure.

### Katangar amfani ta Claude OAuth: layin ƙaramar fifiko + sake saita iyakar zama

**Iyaka:** haɗin biyan kuɗin Claude (OAuth) guda ɗaya. Dukkan fasalolin biyu **ana kunna su ne bisa zaɓi ga kowane
haɗi** (Gyara haɗi → sashen Claude → `lowPriorityMode` / `autoLimitReset` a cikin
`providerSpecificData`, dukansu a kashe ta tsohuwa) kuma suna kwaikwayon umarnin `/low-priority` da
`/limit-reset` na Claude Code (an ɗauki ƙa'idar sadarwa daga Claude Code 2.1.263).

**Aiwatarwa:**

- Na'urar yanayi + rarraba martani: `open-sse/services/claudeLowPriority.ts`
- Abokin hulɗar matsayin sake saiti/karɓa: `open-sse/services/claudeLimitReset.ts`
- Maƙallin mai aiwatarwa (saka kanun bayanai + sake gwadawa da asusu ɗaya): `open-sse/executors/base.ts::execute()`
- Adana zaɓin kunnawa: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Mai kunnawa:** katangar amfani ta awa 5 — `429` wanda kanun bayanansa ke ɗauke da
`anthropic-ratelimit-unified-status: rejected` kuma, idan asusun ya cancanta,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ba a aika komai kafin wannan 429 na katanga
na farko; 429 na turmutsitsi ba tare da haɗaɗɗun kanun bayanai ba yana bi ta hanyar lokacin jira ta yau da kullum.

**Layin ƙaramar fifiko** (`lowPriorityMode`):

- A 429 na katanga, mai aiwatarwa yana karɓar tayin kuma nan take ya sake gwada **asusu ɗaya**
  tare da `anthropic-usage-limit: slow`; layin yana ci gaba da aiki har zuwa lokacin
  `anthropic-ratelimit-unified-reset` da aka sanar (+60s na sassauci), kuma kowace buƙata a wannan
  taga tana ɗauke da kanun bayanan. 429 da aka tare ba ya isa `handleChatCore`, don haka **ba**
  a sanya haɗin cikin lokacin jira kuma ba a sauya shi zuwa wani haɗi.
- `anthropic-ratelimit-unified-slow-status` a martanin baya: `active` / `not_needed`
  suna ci gaba da riƙe layin; `slot_busy` (429) ko `529` suna jira na tsawon
  `anthropic-ratelimit-unified-slow-retry-after` na uwar garke (tsoho 20s, iyaka 5–600s, ±30% bazuwar jinkiri)
  sannan su sake gwadawa, cikin iyakar `anthropic-ratelimit-unified-slow-max-wait` (tsoho minti 20, iyaka
  minti 1–awa 6) — bayan wannan layin yana ƙarewa kuma lokacin hucewa na minti 10 yana hana sake karɓa. Ana
  kuma iyakance jiran da abin da ya rage na lokacin ƙarewar fara haɗin uwar garke na buƙatar kanta
  (`resolveFetchStartTimeout`, minti 10 ta tsohuwa) ban da tazarar 5 s: ba tare da wannan iyaka ba,
  tsohuwar iyakar jira ta minti 20 za ta wuce tsawon rayuwar buƙatar kuma za a katse barcin
  a tsakiyar jira, wanda zai fito da `TimeoutError` maimakon ƙarewar `max_wait` cikin sauƙi + hucewa.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, sauyawar taga ta 5h, ko
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wanda ke ƙare shi a matsayin
  `extra_usage` a kowane yanayi, saboda ƙarin amfani na biya yanzu yana rufe katangar) suna ƙare layin;
  daga nan martanin yana bi ta hanyar lokacin jira ta yau da kullum. Ana tuna `budget_exhausted` har
  zuwa lokacin sake saita kasafin da aka sanar (≤ kwanaki 8).
- Binciken katangar yana gudana bayan sake gwadawa cikin yunƙuri da mai aiwatarwar kansa ke yi sakamakon 400 (gyaran
  mahallin, iyakance tunani/ƙoƙari, koyon siga ta atomatik), don haka 429 na katanga da ke bayyana kawai a
  ɗaya daga cikin waɗannan sake gwadawar har yanzu za a tare shi maimakon ya isa hanyar lokacin jira.
- Yanayin yana cikin ƙwaƙwalwa ga kowane haɗi (sake farawa yana jawo ƙarin 429 na katanga guda ɗaya kafin sake karɓa).

**Sake saita iyakar zama** (`autoLimitReset`, ana gwada shi kafin layin idan dukansu suna kunne):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → tubalin `juniper_tide`;
  idan `arm: "reset"` da `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` tare da
  `{ "program": "juniper_tide" }` (UUID na ƙungiya daga
  `providerSpecificData.organizationUUID`, tare da madadin farawa).
- `result: reset|not_limited` → ana sake gwada buƙatar da cikakken sauri (ba tare da kanun jinkiri ba).
  `already_used` / `not_offered` suna haddace `next_available_at` (tsoho mako ɗaya); kowace
  gazawa tana haifar da jinkirin minti 15. Sake saitin sau ɗaya ne a mako kuma har yanzu yana shiga
  cikin iyakar mako-mako.

Kariyar hana komawar matsala: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Daure zama da haɗi (#7274)

**Iyaka:** zaman abokin ciniki guda ɗaya (kanun `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) da aka daure da haɗi guda ɗaya, ga **kowane** mai samarwa.

**Manufa:** kiyaye wakili mai mu’amaloli da yawa (Claude Code, aider, wakilai na musamman) a kan asusu ɗaya a duk buƙatu, domin rage asarar mahalli sakamakon sauya asusu da maimaitattun kurakuran farawa-sabo na 429 a masu samarwa waɗanda ke da yanayin zama na kowane asusu.

**Aiwatarwa:**

- Tantance TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Zaɓi/ƙirƙirar liƙewa: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ciro kanun bayanai (na gama-gari, kowane mai samarwa): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Teburin liƙewa da aka adana: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Saiti: `sessionAffinityTtlMs` (TTL na gama-gari a cikin ms, `0` yana kashewa) — `src/lib/db/settings.ts`. An sake masa suna daga `codexSessionAffinityTtlMs` da ya keɓanta ga Codex ta hanyar ƙaura `124_generic_session_affinity_ttl.sql`, wadda ke ɗauko duk wani Codex TTL da aka saita a baya a matsayin sabon tsoho.

Kafin #7274, `resolveSessionAffinityTtlMs()` yana katsewa kai tsaye zuwa `0` ga kowane mai samarwa ban da `codex`, saboda haka saitin TTL (da kanun zaman) ba su da tasiri a ko’ina dabam duk da cewa tsarin liƙewa da ciro kanun bayanai sun riga sun kasance masu zaman kansu daga mai samarwa. Gyaran ya cire wannan dawowa da wuri; yanzu TTL yana aiki iri ɗaya ga kowane mai samarwa da zarar an saita shi a duniya sama da `0`.

Ba a taɓa tura kanun bayanan alaƙar zama guda uku zuwa sama ba — masu aiwatarwa suna gina nasu kanun bayanan na sama daga tushe maimakon miƙa kanun bayanan abokin ciniki kai tsaye, don haka wannan ya kasance ID na daidaitawa na cikin gida kawai.

### Keɓantattun hayar haɗin zaman da ake gudanarwa

**Iyaka:** abokin cinikin HTTP/zama guda ɗaya mai aiki da ake gudanarwa yana mallakar haɗin OmniRoute guda ɗaya da ya cancanta.

**Manufa:** samar da mallakar haɗi ta keɓance mai ɗorewa ga abokan ciniki waɗanda ke buƙatar shingen tuƙa zirga-zirga mai tsauri
a tsakanin buƙatu. Wannan ya bambanta da alaƙar zama, wadda fifikon ci gaba ne mai sassauci:
haya ta keɓance tana adana yanayin zagayowar rayuwa a SQLite, tana tilasta keɓancewar mai mallaka mai aiki da
haɗi mai aiki a duniya, kuma tana ƙin tsohuwar tsara kafin aikawa zuwa mai samarwa.

Ana kunna fasalin ne bisa zaɓi ga kowane maɓallin API. Dole ne maɓallin da ake gudanarwa ya kasance da iyakar `lease:exclusive` da
jerin `allowedConnections` bayyananne wanda ba fanko ba. Duk wani abokin cinikin HTTP zai iya amfani da maƙurar zagayowar rayuwa; ba a
buƙatar sunan abokin ciniki, user-agent, mai samarwa, hanyar OAuth, ko model. Hayar tana mallakar haɗi,
ba model ba, don haka sauya model yana riƙe ɗaurin muddin haɗin yana ci gaba da
cancanta bisa ƙa’ida. Dokokin model, quota, lafiya, cooldown, da allowlist na yau da kullum suna ci gaba da zama
masu iko kuma suna iya sauya wannan tsara zuwa wani haɗi kyauta da ya cancanta.

Zagayowar rayuwar ita ce `POST /api/v1/session-leases` tare da ayyukan JSON `acquire`, `renew`, da `release`.
Buƙatun inference da ake gudanarwa suna gabatar da ƙimar `X-OmniRoute-Lease-Owner` marar bayyanar ma’ana da kuma
ainihin `X-OmniRoute-Lease-Generation`. Mai mallakar yana amfani da `vlo_` sannan haruffan base64url guda 43; hash na
SHA-256 kaɗai ake adanawa. Kowane shingen aikawa na ƙarshe kuma yana ɗaure ID na maɓallin API da aka tantance da
ID na haɗi mai aiki. Ana cire kanun sarrafa haya daga rajistan ayyuka, hotunan buƙatu da aka adana, da
kanun masu aiwatarwa na sama.

Idan tuƙa zirga-zirga na yau da kullum yana da ’yan takara da ake gudanarwa waɗanda suka cancanta amma kowane ɗan takara kyauta yana ƙarƙashin
haya mai aiki ta wani, OmniRoute yana mayar da HTTP `429`, lambar lease-capacity-unavailable, yanayin
jiran samun sarari, da `Retry-After` mai iyaka wanda aka samo daga lokacin ƙarewa mafi kusa da ya dace.
Rashin cancanta na yau da kullum ba takaddamar haya ba ce kuma yana riƙe da ma’anonin kuskuren tuƙa zirga-zirga da suke akwai.

Hanyoyin da ke da alaƙa suna ci gaba da kasancewa dabam:

- Mamayar zaman OAuth rarrabawa ce mai sassauci ta cikin tsari ga asusun OAuth.
- Semaphores na asusu suna ba da izinin haɗa buƙatu a lokaci guda kuma suna ƙarewa idan buƙata ta kammala.
- Keɓantattun hayar haɗin zaman da ake gudanarwa mallakar zagayowar rayuwa ce mai ɗorewa tare da shingen tsara.

---

## 3. Kulle Samfuri

**Iyaka:** haɗin provider + connection + model.

**Iyakokin maɓalli bisa status:** status ɗin da ya gaza ne yake tantance maɓallin da za a rubuta kullewa
a kai (`resolveLockoutScope()` a cikin `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — alamar ƙayyadadden quota ko izinin amfani — suna kulle **rukunin quota**:
  ga codex, dukkan iyakar `codex` / `spark` (kowane samfurin `gpt-5*` na
  connection ɗin), ga sauran providers kuma `getQuotaScopedModelForProvider()`.
- `404` yana kulle ainihin samfurin (`getModelLockKey()` yana taƙaita `not_found`).
- Duk wani status daban — gazawar jigilar bayanai/server ta `5xx` da kuma
  `502` da OmniRoute da kansa ya ƙirƙira daga tantance inganci — yana kulle **ainihin**
  haɗin provider/connection/model kawai. Mummunan stream a kan samfurin guda ɗaya ba hujja ba ce
  game da quota na account ɗin; kafin wannan ƙa’ida, amsa marar komai guda ɗaya a
  `codex/gpt-5.6-luna` tana cire kowane samfurin `gpt-5*` na wannan connection daga
  routing na minti 2–30 (yana ƙaruwa), alhali quota ɗinsa bai taɓu ba.
- Zaɓin `scope` da mai kira ya bayyana kai tsaye koyaushe shi ne ke da rinjaye (Antigravity yana aika `"exact"`).

**Manufa:** kauce wa kashe connection gaba ɗaya yayin da samfurin guda ɗaya ne kawai babu shi ko quota ya iyakance shi.

**Misalai:**

- Providers masu quota na kowane samfurin da suke mayar da 429
- Providers na gida da suke mayar da 404 saboda samfurin guda ɗaya da babu
- Gazawar izinin mode/model da ta keɓanta ga provider (misali, modes na Grok)

**Aiwatarwa:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard na Lokutan Jiran Samfuri (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Yana jera kulle-kullen da suke aiki tare da: provider, connection, model, reason, expiresAt. Masu gudanarwa za su iya sake kunna samfurin da hannu daga katin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — jera kulle-kullen da suke aiki
- `DELETE /api/resilience/model-cooldowns` — sake kunnawa da hannu. Body: `{provider, connection, model}`. Auth: management.

### UI na saitunan kullewa + farfaɗowa ta rage gazawa bayan nasara (v3.8.23)

Kulle samfurin ya sauya daga ɗabi’ar da aka hardcode mai aiki koyaushe zuwa wata fasali mai cikakken daidaitawa,
wanda dole ne a zaɓi kunna shi, tare da katin saitunansa da hanyar farfaɗowa mai gyara kanta.

**Katin saituna:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Wannan **ya bambanta** da `ModelCooldownsCard` na karantawa kawai da ke sama (wanda kawai
_yake jera_ kulle-kullen da suke aiki) — sabon katin _yana daidaita sigogin_. Ƙimomin tsoho
suna cikin `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Saiti                   | Tsoho                            | Ma’ana                                                               |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Babban maɓallin kunnawa — kulle samfurin yana **kashe ta tsohuwa**.  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status na upstream da ake ƙirga a matsayin gazawa mai iyakar samfur. |
| `baseCooldownMs`        | `120_000` (120 s)                | Tsawon lokacin kullewa na farko bayan gazawa ta farko.               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Iyakar lokacin jiran da aka ƙara.                                    |
| `maxBackoffSteps`       | `10`                             | Matsakaicin matakan ƙarin jinkiri na exponential-backoff.            |
| `useExponentialBackoff` | `true`                           | Ko maimaita gazawa za ta ƙara lokacin jira a tsarin exponential.     |

Ana adana saituna ta hanyar ma’ajiyar saituna ta yau da kullum, kuma ana tantance su ta
resilience settings schema; katin yana iyakance `baseCooldownMs`/`maxCooldownMs`
(tare da `maxCooldownMs ≥ baseCooldownMs`) da `maxBackoffSteps`.

**Farfaɗowa ta rage gazawa bayan nasara:** farfaɗowa **ba** ta dogara kawai da ƙarewar timer ba. Amsa mai lafiya
tana rage adadin gazawar samfurin, saboda samfurin da ya farfaɗo
a tsakiyar window ya daina ƙara tsawon jira (kuma a share kullensa) kafin timer ɗinsa ya ƙare. Bayan nasarar
combo target, `open-sse/services/combo.ts` yana kiran `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), wanda yake **raba** adadin da aka adana na
`failureCount` zuwa rabi (`Math.floor(failureCount / 2)`); idan ya kai `0`, ana share
lockout entry ɗin gaba ɗaya. Takwaransa `recordModelLockoutFailure()`
yana ƙara adadin (kuma yana ƙara tsawon lokacin jira) idan gazawa ta faru a cikin
escalation window. Wannan rage gazawa bayan nasara ƙari ne ga ƙarewar timer kawai —
kowace hanya na iya sake kunna samfuri.

**State:** ana riƙe kulle-kullen **a cikin memory** (`Map`s na kowane process na
`ModelLockoutEntry` waɗanda `provider:connectionId:model` ke zama maɓallinsu, sannan exact-scope locks kuma
`provider:connectionId:exact:model` ke zama maɓallinsu), ba a adana su a
DB — suna ɓacewa idan an restart. Ana adana _settings_; amma _state_ na kullewar
da ke aiki na wucin gadi ne.

---

## 4. Sarrafa Aiwatarwa Lokaci Guda na Quota-Share (v3.8.36)

Asusun biyan kuɗi (GLM, MiniMax, da sauransu) sau da yawa suna karɓar buƙatu masu
gudana lokaci guda kusan ~1–3 kawai; wuce wannan yana jawo 429 da lokutan dakatawa.
Wannan matsalar ta fi tsanani a ƙarƙashin haɗaɗɗun **quota-share** (`qtSd/…`), inda
maɓallan API da yawa suke amfani da asusun upstream guda ɗaya. Matakai uku ne ke
hana a cika asusun da ake amfani da shi tare da buƙatu masu yawa.

### Iyakar aiwatarwa lokaci guda ga kowace haɗuwa (`max_concurrent`)

Kowace haɗin mai samarwa na iya ayyana iyakar `max_concurrent`
(`provider_connections.max_concurrent`, ana saita shi a cikin taga haɗi / API / DB).
A bar shi babu komai idan ba a son iyaka. Wannan shi ne babban saitin da ke sarrafa
matakin jera aiwatarwa da ke ƙasa — saita shi zuwa ainihin adadin aiwatarwa lokaci
guda na asusun (misali GLM ~1, MiniMax ~2).

### Jera buƙatun quota-share

Lokacin da aikawar quota-share ta nufi wani haɗi da ya ayyana tabbataccen
`max_concurrent`, ana jera buƙatun da ke gudana lokaci guda zuwa wannan **asusun**
ta hanyar semaphore na kowace haɗuwa (maɓalli `qsconn:<connectionId>`): buƙatun da
suka wuce iyaka suna **jira a jerin gwano** maimakon cika asusun. Yana aiki da
tsarin **fail-open** — idan jerin gwano ya cika ko lokaci ya ƙare, za a ci gaba ba
tare da gurbi ba maimakon a taɓa ƙin buƙatar da za a iya aikawa. Ana kunna ko kashe
shi a **Settings → Resilience → Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, yana kunne ta asali).
Idan babu iyakar `max_concurrent`, halayen ba sa canzawa.

> Ƙofar zaɓin hanya ta quota-share (`selectQuotaShareTarget`, DRR + P2C) ita ma
> tana aiki da tsarin fail-open kuma kawai tana _rage fifikon_ haɗin da ya kai
> iyaka — idan tafkin yana da haɗi guda ɗaya ba za ta iya tilasta iyaka kai tsaye
> ba, don haka wannan semaphore ne a zahiri yake hana ambaliyar buƙatu.

### Sake gwadawa bisa la’akari da lokacin dakatawar combo

Ga kowace dabarar combo (idan an kunna), buƙatar da za ta tabbatar da 429 saboda
TAKAITACCEN lokacin dakatawa na wucin gadi za ta jira lokacin ya ƙare sannan a sake
aikawa maimakon mayar da 429 — wannan yana rufe tagogin TPM/RPM na ajin Gemini
(~60s retry-after) a haɗaɗɗun combo na samfura da yawa, misali idan dukkan
manufofin combo mai samfura 2 suka ci karo da iyakar ƙimar kowane samfuri. Ana
iyakance shi da `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) a cikin **Settings → Resilience**. Ba ya taɓa jira kan
`quota_exhausted` (an kulle har tsakar dare) ko dalilan tantancewa/rashin samu.

---

## 5. Sarrafa Karɓar Buƙatu Zuwa Jerin Gwano (v3.8.49 · issue #6593)

**Iyaka**: jerin gwano na ƙayyade ƙimar gida ga kowane mai samarwa+haɗi
(`open-sse/services/rateLimitManager.ts`, wanda Bottleneck ke tallafawa), mataki
ɗaya a ƙasa da hanyoyi uku da ke sama.

**`maxWaitMs` yana iyakance jiran jerin gwano; `executionMaxWaitMs` yana iyakance aiwatarwa.**
An raba su biyu da gangan, kuma babu ɗayansu da ke ciyar da ɗayan.

`resilienceSettings.requestQueue.maxWaitMs` shi ne **kasafin jiran jerin gwano**:
yana rufe jiran gurbin mai samarwa sannan da zama a matsayin QUEUED, kuma ana share
agogon lokacinsa da zarar aikin ya bar QUEUED ya fara gudana
(`rateLimitManager.ts`, `wrappedFn`). Buƙatar da ta wuce shi ba za ta taɓa isa
upstream ba. Tsohon ƙima ita ce 30000ms, wanda
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ke bayarwa a cikin
`src/lib/resilience/settings.ts` kuma
`tests/unit/ratelimit-admission-control-6593.test.ts` ke tabbatarwa, don haka
canza shi zai sa wannan gwajin ya gaza maimakon a bar wannan sakin layi ya zama
tsohon bayani ba tare da an lura ba.

`resilienceSettings.requestQueue.executionMaxWaitMs` shi ne abin da Bottleneck
ke karɓa a matsayin `expiration` na aikin, wanda agogon lokacinsa ke farawa ne
kawai bayan aikawa. Kariyar ƙarshe ce ga masu aiwatarwa da ba su da nasu iyakar
lokacin upstream, kuma ana ɗaga ta zuwa iyakar lokacin fara fetch ta mai
aiwatarwar idan wannan ya fi tsawo, don haka ba za ta katse amsar da ke gudana
lafiya ba. Tsohon ƙima ita ce 600000ms (minti 10).

Ciyar da kasafin jerin gwano zuwa `expiration` shi ne abin da a baya yake kashe
gateway marasa incremental a tsakiyar aiki — bisa ƙa’ida suna iya yin aiki na
mintuna kafin bytes na farko su iso — kuma shi ya sa ake bayyana ƙarewar lokaci
a matsayin `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), yayin da kasafin
jerin gwano ke ɗauke da lambar ƙarewar lokacin jerin gwano. Sauya kowane ɗayansu
ta hanyar `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ko
dashboard (**Settings → Resilience**). Ana takaita dukansu zuwa 1ms–24h lokacin
da ake daidaita su.

**Tsarin fifiko, ga dukansu:** env var yana samar da _tsohuwar ƙima_ ne kawai.
Ƙimar da aka adana a `resilienceSettings.requestQueue` (dashboard / gyaran API,
wanda aka adana a `key_value`) tana rinjayarsa, kuma
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` na kowace haɗuwa yana
rinjayar wancan. Saboda haka, saita env var a kan turawar da tuni take da ƙimar
da aka adana ba zai canza komai ba — a maimakon haka, share ko sabunta saitin da
aka adana.

Ana iyakance zaman cikin jerin gwano da `maxWaitMs`; `maxQueueDepth` da ke ƙasa
yana iyakance yawan masu kira da za su iya kasancewa a jerin gwano lokaci guda.

**`maxQueueDepth` — iyakar karɓa ta zaɓi (sabuwa).** `resilienceSettings.requestQueue.maxQueueDepth`
yana iyakance yawan buƙatun da za su iya zama a jerin gwano (waɗanda ba a riga an
aika ba) ga mai samarwa+haɗi guda ɗaya lokaci guda. Idan jerin gwano ya riga ya
ƙunshi buƙatu `maxQueueDepth`, za a ƙi sabuwar buƙata nan take tare da kuskure
mai nau’in `code: "RATE_LIMIT_QUEUE_FULL"` **kafin** ta taɓa isa
`limiter.schedule()` — saboda haka ƙin buƙatar ba ya cin albarkatu sosai kuma
yana faruwa kafin duk wani aikin matsa prompt / fassara na downstream na wannan
buƙatar. Tsohon ƙima `0` = a kashe, wanda ke kiyaye halin jerin gwano mara iyaka
da ake da shi; ana iyakance shi zuwa 0–100000. Sauya shi ta hanyar
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ko
`resilienceSettings.requestQueue.maxQueueDepth` (gyaran dashboard/API).

Binciken karɓar kansa pure function ne
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) don haka
ana iya yi masa unit test ba tare da ainihin Bottleneck limiter ba.

> RFC ɗin da ya buɗe #6593 ya kuma gabatar da tutar `bypassCompressionOnRateLimit`.
> Bututun `open-sse/services/compression/` na wannan repo yana yin
> matse prompt/context ne a kan buƙatar LLM mai fita (`chatCore.ts`,
> a kusa da ɓangaren `resolveCompressionSettings`/`selectCompressionStrategy`),
> ba matse martanin HTTP a kan jikin 429 da aka samar ba — babu hanyar lamba
> da ta dace da tutar bypass kai tsaye. Wannan matakin matse prompt ɗin
> a halin yanzu kuma yana gudana ne _kafin_ `withRateLimit()` a cikin bututun buƙata,
> don haka sake tsara jeri domin tsallake shi idan aka ƙi buƙata saboda layin jira ya cika
> wani sauyi ne daban kuma mafi girma fiye da iyakar wannan matsala; da gangan
> **ba a** aiwatar da shi a nan ba, kuma an bar shi a matsayin abin da za a biyo baya idan
> ribar rage amfani da CPU ta cancanci haɗarin sake tsara jerin matakan.

---

## 6. Mai sa ido kan yawan fitarwa na rafin da ke tafiya a hankali (#9709)

Kariyar zaɓi ta `resilienceSettings.streamRecovery.throughputWatchdog` tana gano
tushen sama wanda har yanzu yake aika gutsattsarin bayanai amma yake samar da amsar mataimaki ƙasa da
ƙimar fitarwa mai amfani da aka saita. An ware ta da gangan daga wa'adin rashin aiki:
bugun-zuciya da metadata ba sa sake saita kowane mai ƙidayar lokaci kuma ba a ɗauke su a matsayin ci gaba. Haka kuma
ta bambanta da wa'adin ƙarshe na yunƙuri (#9153), wanda ya kasance cikakken iyakar
tsaro ba tare da la'akari da ingancin fitarwa ba.

Mai sa idon yana buƙatar lokacin fara aiki, sannan cikakkiyar taga mai motsi kafin
ya iya katsewa. Yana ƙirga bambance-bambancen rubutu daga abubuwan fitarwa na Chat Completions da Responses API
(a matsayin kimantawa mai taka-tsantsan ta bytes na UTF-8), yana yin watsi da abubuwan da ke ɗauke da bayanan amfani kawai da kuma marasa komai, sannan yana
dakatar da yanke hukunci yayin da abubuwan kiran kayan aiki ko na tunani ke gudana. A kashe yake
ta tsohuwa kuma ana iya kunna shi da `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; ana iyakance
tagar, lokacin fara aiki, mafi ƙarancin ƙima, da mafi ƙarancin fitarwar da za a iya aunawa ta
matakin daidaita saitunan juriyar matsala na yau da kullum.

Idan an kunna shi, katsewar mai sa ido tana shafar yunƙurin tushe na sama da ke aiki ne kawai. Kafin
a aika duk wani byte da abokin ciniki zai iya gani, hanyar dawo da aiki da wuri ta asusu ɗaya da ake da ita na iya sake buɗe
yunƙurin. Bayan tabbatar da aikawa, ba a taɓa maimaita rafin kai-tsaye ba; yarjejeniyar
ci gaba mai aminci a tsakiyar rafi da ake da ita ce kaɗai za ta iya haɗa ƙarin ƙarshen. Kammalawa ta ci gaba da kasancewa
sau ɗaya kacal, don haka ba a maimaita lissafin amfani da sakin semaphore.

---

## 7. Sake Bayyana Matsayin Tushen Sama (kurakuran ƙayyadadden amfani da aka bayyana ba daidai ba)

**Iyakar aiki:** ƙofar tushen sama guda ɗaya da ke bayar da rahoton ƙarewar ƙayyadadden amfani na ɗan lokaci da matsayin HTTP mara daidai.

**Manufa:** gyara matsayi mai ruɗarwa KAFIN rarrabawa, domin masu amfani na ƙasa (injin fallback, tara combo, amsar da ake nuna wa abokin ciniki) su ga ainihin yanayin gazawar da za a iya sake gwadawa.

Wasu ƙofofi suna nuna ƙarewar ƙayyadadden amfani na ƊAN LOKACI da matsayin HTTP
wanda ba za a sake gwadawa ba. `agentrouter.org` yana mayar da `403` (wani lokaci `400`) tare da jikin saƙo
na Sinanci (`用户额度不足` / `额度不足`) maimakon daidaitaccen `429`. Abokan ciniki kamar Claude
Code suna ɗaukar `403` a matsayin na dindindin kuma su katse zaman, kuma idan ba a gyara ba
injin fallback zai rarraba shi a matsayin `AUTH_ERROR` maimakon lamarin
ƙayyadadden amfani.

**Aiwatarwa:**

- Rijista + mai daidaitawa: `open-sse/config/upstreamStatusRestatement.ts` — jerin
  ƙa'idoji na kowane mai samarwa (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), waɗanda ake daidaitawa ta `applyStatusRestatement()`.
- Wurin kira: ɓangaren `providerFailure:` a cikin `open-sse/handlers/chatCore.ts`
  (kusa da layi na 3654), nan da nan bayan `parseUpstreamError()` ya fassara amsar tushen
  sama mai matsayin kuskuren HTTP (`!providerResponse.ok`), kuma kafin duk wata
  rarrabawa ta gudana, domin kowane mai amfani na ƙasa ya ga matsayin da aka
  gyara. Kurakuran da aka saka a cikin rafin SSE na `200` suna bin wata hanya ta daban
  ta fassara rafi daga baya kuma **ba** su ƙarƙashin wannan hook a yau — wannan
  sananniyar gazawa ce, kuma har yanzu ba a buƙace ta don kuskuren matsayin agentrouter ba (wanda
  ke bayyana a matsayin matsayin kuskuren HTTP).
- Cancantar sake gwadawa: `429` yana cikin `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), don haka kuskuren da aka sake bayyana
  yana ɗauke da ainihin tagar sake gwadawa maimakon bayyana a matsayin mataccen `403`.
- `60s` na ƙirƙira na `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  shi ne kawai abin da amsar da aka sake bayyana ke gaya wa **abokin ciniki**; ba shi ne
  tsawon lokacin sanyaya/kulle haɗin na ciki ba — wannan yana ƙarƙashin
  kulawar wata dabara dabam da ke sarrafa kuskuren da aka sake bayyana
  (jinkirin baya mai ƙaruwa na Connection Cooldown, §2, tushen `3s` ga masu samarwa
  na API-key; ko Model Lockout, §3, ga masu samarwa masu ƙayyadadden amfani na kowane model kamar
  agentrouter). Router na iya sake cancantar yin yunƙuri a ciki kafin
  tagar 60s da yake sanar da abokin ciniki — wannan sarari ne na ganganci,
  ba bug ba.

Kurakurai na dindindin (`无权访问模型` na agentrouter — babu izinin shiga wannan model) BA A
TAƁA sake bayyana su ba: `excludeMarkers` yana soke ƙa'idar ko da `textMarkers` ya dace,
don haka kuskuren yana riƙe matsayinsa na asali kuma babu abin da zai ci gaba da sake gwada shi har abada. Ƙa'idar
rarraba mai samarwa da ta dace
(`agentrouter-model-access-denied` a cikin `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, tushen lokacin sanyaya na `6h` da aka bayyana) ana
duba ta ta `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_kafin_ dawowar-wuri ta gama-gari ta rukunin apikey mai `FORBIDDEN`, bisa sharadin
`honorsRuleLockScope(provider)` (#10334 — a halin yanzu agentrouter kaɗai ne ta hanyar
jerin izinin `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a cikin
`providerErrorRules.ts`). Lokacin sanyaya na 6h da ƙa'idar ta bayyana yana wucewa a matsayin
`fallbackResult.baseCooldownMs`, amma har yanzu yana shiga hanyar kullewa ta
ƙayyadadden amfani na kowane model da ta riga ta kasance (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, wanda #10334 bai canza ba sai dai tushen lokacin sanyaya):
ana rage shi zuwa `mlSettings.maxCooldownMs` na mai gudanarwa
(tsoho `1_800_000ms` / 30min), kamar kowane kullen model, kuma
_dalilin kullen da aka adana_ yana ci gaba da kasancewa tsohon ƙayyadadden `"forbidden"`,
ba `"auth_error"` na ƙa'idar ba — tsawon lokacin sanyaya ne kawai ake mutuntawa
daga farko zuwa ƙarshe, ba zaren dalilin ba. Haɗin kansa yana ci gaba da aiki;
sauran model da ke kan wannan haɗin ba su shafu ba.

Kurakuran ƙa’ida da aka sake bayyana (`额度不足`) suna kaiwa ga ƙa’idar mai bayarwa a production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ba tare da bayyana wani lokacin jira na kansa ba — tsohon saitin
scaled backoff na persistence layer ne yake aiki). Tun daga #10334, ana amfani da
`scope` da ke kan `ProviderErrorRuleMatch` daga farko har ƙarshe, amma **kawai** ga
masu bayarwa da ke cikin allowlist na `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — a yau `"agentrouter"` kaɗai, wanda ake sarrafawa ta
`honorsRuleLockScope()`). Ga kowane mai bayarwa dabam, `scope` yana ci gaba da zama
na bayani kawai, daidai kamar yadda yake kafin #10334.
`checkFallbackError` yana fito da scope na ƙa’idar da ta dace a matsayin
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) shi ne shared guard da ke tabbatar da cewa wani
`ruleScope` yana da aminci da gaske a ɗauke shi a matsayin sigina mai shafar
connection gaba ɗaya kuma mai murmurewa da kansa (scope `"connection"`, reason
`quota_exhausted`, ba zai taɓa zama `permanent` ba, kuma ba zai taɓa zama
`creditsExhausted` ba — kariya ce daga wata ƙa’ida ta gaba da za ta haɗa scope
`"connection"` da halin account na dindindin). Consumers guda biyu suna kiransa:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  maimakon shiga reshen lockout na **kowane model** na passthrough-provider
  (agentrouter yana da `passthroughModels: true` → `hasPerModelQuota()`
  yana mayar da `true`), yana sanya **cooldown na connection na wucin gadi** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ba tare da sanya terminal status
  (`credits_exhausted`/`banned`/`expired`) ba — don haka connection ɗin zai murmure
  da kansa bayan cooldown ya ƙare maimakon buƙatar sake saita credential da hannu.
  Ana tsallake wannan ga connections masu `disableCooling: true` (#2997): wannan
  opt-out ɗin yana faɗawa cikin lockout na kowane model maimakon haka (wani
  trade-off da aka rubuta — duba code comment da ke sama da reshen).
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): wannan guard ɗin yana sanya
  connection ɗin cikin in-memory `exhaustedConnections` set, mai key na
  `${provider}:${connectionId}`. Wannan yana tsallake remaining SAME-REQUEST
  target ne kawai idan _shi kansa ya riga ya ƙunshi ainihin wannan `connectionId`_
  a kan target object ɗinsa (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` kafin binciken `exhaustedConnections`) — plain
  model-list combo, inda sibling targets ba su ɗauke da pinned `connectionId` na
  kansu kuma ake resolve ɗaya ne kawai a kowane dispatch daga header na response
  `X-OmniRoute-Selected-Connection-Id`, ba ya taɓa samun daidaituwar wannan key.
  Ga wannan yanayin da aka fi samu, ainihin kariyar da ke hana remaining leg sake
  amfani da account ɗin da quota ɗinsa ya ƙare BA wannan Set ba ne — persistence
  layer da ke sama ne (yanzu `rateLimitedUntil` na connection ɗin yana nan gaba)
  haɗe da wannan guard ɗin da ke hana `transientRateLimitedProviders` ga wannan
  failure (duba "Tsarin matakai biyu" da code comment da ke kan reshen
  `isAgentrouterConnectionQuotaScope` a cikin `targetExhaustion.ts`): idan aka bar
  wannan Set ba tare da marking ba, `allowRateLimitedConnection` force-allow na
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) BA ya fara
  aiki ga remaining legs na mai bayarwar, don haka ana bin filter na
  `rateLimitedUntil` na credential selection (`src/sse/services/auth.ts:1238`)
  yadda aka saba, kuma remaining leg ko dai ya zaɓi wani agentrouter connection
  dabam wanda har yanzu ya cancanta, ko ya gaza saboda babu credentials da ake
  da su — ba ya tilasta komawa kan connection ɗin da wannan reshen ya saka a
  cooldown.

### Tsarin matakai biyu: sake bayyana status, sannan classification

Sake bayyana status (`upstreamStatusRestatement.ts`) da classification rules na
mai bayarwa (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) registries ne daban-daban waɗanda duka suke amfani da
provider id da text markers a matsayin key, amma suna gudana a wurare daban-daban
kuma suna da manufofi daban-daban: restatement yana sake rubuta HTTP status tun
da wuri a cikin `chatCore.ts`; classification rules suna zaɓar fallback `reason`
da lock `scope` (`model` / `provider` / `connection`) a cikin
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Classification rules suna ganin cikakken error **text** ne kawai (wanda ake buƙata
domin daidaitawa da body markers kamar `额度不足`) ga masu bayarwa da ke cikin
allowlist na `FULL_TEXT_RULE_PROVIDERS` a cikin `providerErrorRules.ts` — a halin
yanzu `"agentrouter"` kaɗai. Ga kowane sauran mai bayarwa na **built-in catalog**,
`checkFallbackError` yana miƙa wa `getProviderErrorRuleMatch` structured error
kawai (`{code, type}`), wanda ya isa ga rules masu dogaro da header/status/code
amma ba ya iya ganin body-text markers. Helper ɗin `resolveRuleMatchBody()` ne
yake yin wannan zaɓin: cikakken error text ga masu bayarwa da ke cikin allowlist,
structured error kuma ga sauran. Ƙara wani **built-in** provider zuwa
`FULL_TEXT_RULE_PROVIDERS` wani bayyanannen opt-in ne na kowane provider — an yi
shi ne domin default path na kowane provider da ba ya cikin jerin ya ci gaba da
zama iri ɗaya byte-for-byte ba tare da wani canji ba.

`scope` na ƙa’ida (`model` / `provider` / `connection`) opt-in ne daban da
`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` yana fito da shi ne kawai a
matsayin `fallbackResult.ruleScope`, sannan downstream consumers ba sa ɗaukar sa
a matsayin wani abu fiye da informational label sai ga masu bayarwa da ke cikin
allowlist na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a wannan file ɗin (`gated via
honorsRuleLockScope()` — a yau `"agentrouter"` kaɗai). Duba "Kurakuran ƙa’ida
da aka sake bayyana" da ke sama don ganin abin da matching na
`scope: "connection"` yake yi a zahiri bayan an saka provider cikin wannan
allowlist.

**#11104 — ƙa’idojin da mai gudanarwa ya ayyana suna tsallake dukkan jerin izini biyu.** Mai gudanarwa zai iya
ayyana ƙa’ida ta kowane mai samarwa a lokacin aiki ta hanyar `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ba tare da gyara wannan fayil ba. Sanya ƙa’idar mai gudanarwa a bayan
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — jerin izini
da aka tsara don kare halayen **tsoho** na ƙa’idojin katalog da aka gina ciki — zai
sa tsarin saitunan ya zama marar aiki ga kowane mai samarwa sai waɗanda aka riga aka
jera a wurin, domin ayyana ƙa’idar da kansa ya riga ya zama amincewar mai gudanarwa
kai tsaye. `resolveRuleMatchBody()` da `honorsRuleLockScope()` dukansu suna fara duba
`hasOperatorRuleForProvider()`: mai samarwa da ke da ƙa’idar mai gudanarwa yana samun
asalin rubutun kuskure kuma ana mutunta `scope` da ya ayyana, ba tare da la’akari da
ko yana cikin ɗaya daga cikin jerin izinin ba.

**Gurbin da aka sani — ba a taɓa tuntubar `providerRuleRegistry` don HTTP 400.**
Reshen `BAD_REQUEST` na `checkFallbackError` yana rarraba matsayi 400 gaba ɗaya
ta hanyar jerukan tsarin kalmominsa (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, da sauransu a cikin `accountFallback.ts`) sannan ya dawo kafin
a kai ga reshen `configuredRule`/`getProviderErrorRuleMatch` da ke samansa.
Ƙa’idar katalog da aka gina ciki (ko ƙa’idar mai gudanarwa) mai `status: 400`
tana da ingantaccen tsarin rubutu amma ba za ta taɓa aiki ba. Babu wata ƙa’ida da ke nufin 400 a yau,
don haka babu abin da abin ya shafa a tsarin samarwa — amma duk wata ƙa’idar 400 ta gaba tana buƙatar
a fara taɓa wannan reshe, wanda ya fi ƙara ƙa’ida girman canji (yana
sake rarraba 400 ga kowane mai samarwa da ya riga ya dogara da halayen jerin
tsarin kalmomi) kuma ya wuce iyakar ƙarin ƙa’ida ga mai samarwa guda.

### Ƙara sabuwar ƙofar da ke bayyana adadin ƙayyadadden amfani ba daidai ba

1. Yi rajistar jerin ƙa’ida guda ɗaya a cikin `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Ka sa `textMarkers`
   su kasance na musamman ga mai samarwa; kada ka sake amfani da jimlolin Turanci na gama-gari da ke karo da
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Idan ana so, yi rajistar ƙa’idojin rarrabawa a cikin
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) don zaɓar
   madaidaicin iyakar kullewa (`connection` don ƙayyadadden amfani na dukkan asusu, `model` don
   kurakurai na kowane samfuri). Wannan matakin yana aiki ne kawai a tsarin samarwa ga
   masu samarwa waɗanda ƙa’idojinsu ke buƙatar cikakken rubutun kuskure (alamomin jiki): ƙara
   id ɗin mai samarwa zuwa `FULL_TEXT_RULE_PROVIDERS` a cikin fayil ɗin nan — in ba haka ba
   `checkFallbackError` zai miƙa wa ƙa’idar kuskuren da aka tsara kawai
   `{code, type}`, kuma ƙa’idar rubutun jiki ba za ta taɓa dacewa da zirga-zirgar kai tsaye ba.
   Ƙa’idojin da ke dacewa kawai bisa `status`/`headers` (kamar na Opencode ko
   Minimax) ba sa buƙatar wannan amincewar. A gefe guda, idan ƙa’idar ta ayyana
   `scope: "connection"` kuma manufar ita ce ainihin lokacin sanyaya na duk haɗin
   tare da tsallake haɗin zaɓuɓɓuka a buƙata ɗaya (ba wai lakabin bayani kawai ba), ƙara
   id ɗin mai samarwa zuwa `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a cikin fayil ɗin nan — wannan
   ne ke ba da izinin amfani irin na `isAgentrouterConnectionQuotaScope()` a cikin
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) da
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); ba tare da shi ba, `scope`
   har yanzu yana bi ta cikin `fallbackResult.ruleScope` amma babu abin da ke aiki da shi.
3. Ƙara gwaje-gwajen raka’a masu kwaikwayon `tests/unit/upstream-status-restatement.test.ts`
   da `tests/unit/agentrouter-error-rules.test.ts` (ciki har da
   kariyar not-permanent / not-creditsExhausted, kuma — idan mai samarwar yana buƙatar
   jerin izinin — gwajin da ke tabbatar da cewa `resolveRuleMatchBody()` yana dawo da
   cikakken rubutu ga wannan mai samarwar kawai).

Ba a buƙatar canje-canje ga `chatCore.ts`, `classifyError`, ko combo.

#### Kulle bisa rukunin egress (#10880)

Masu samarwa da ke cikin `EGRESS_BUCKETED_LOCK_PROVIDERS` (dangin opencode) ana ɗaukar su
a matsayin upstream da aka rarraba bisa IP (matakin kyauta na opencode an rarraba shi bisa IP ne, ba
bisa asusu ba — duba #9611): matsayi-429 da aka rarraba a matsayin `quota_exhausted`
**ko** `rate_limit_exceeded` yana sanyaya duk haɗin dangin da ke cikin jerin izini
waɗanda adireshin egress IP da aka sani na ƙarshe ya dace da na haɗin da ya gaza, kafin
juyawa ya gwada su
— don kauce wa kiran upstream N-1 waɗanda tabbas za su gaza (tsari iri ɗaya da #10460/#10525).
An haɗa `rate_limit_exceeded` da gangan: a kan hanyar `markAccountUnavailable`
ƙa’idojin musamman na opencode ba sa dacewa (ba a miƙa headers/body ga
`checkFallbackError`, kuma opencode ba ya cikin `FULL_TEXT_RULE_PROVIDERS`), saboda haka 429
wanda jikinsa ke ɗauke da rubutun ƙayyadadden amfani na rajista ("monthly usage limit
reached") ana rarraba shi a matsayin `quota_exhausted` ta hanyar fallback na rubutun ƙayyadadden amfani
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; lokacin sanyaya na awa 1) kafin
a kai ga ƙa’idar `status_429` — yayin da 429 marar rubutun ƙayyadadden amfani (ƙayyade
yawan buƙatu kawai) ake rarraba shi ta hanyar ƙa’idar `status_429` a matsayin `rate_limit_exceeded`
kuma har yanzu yana sanyaya dangin IP ɗin. Ga mai samarwa da ke cikin jerin izini, ƙayyade yawan buƙatu
bisa rukunin IP alama ɗaya ce da ƙayyadadden amfani da ya ƙare. Iyakoki na gaskiya:

- **Iyakar ƙoƙari**: makullin yana gano `egress_ip` na ƙarshe da aka sani na haɗin
  daga `proxy_logs` (tazarar 24h, aiki kai tsaye, babu cache). Idan cache babu komai (ba a
  taɓa gwada egress IP ba) ko babu layi → har yanzu reshen yana sanya haɗin da ya gaza
  cikin lokacin jira (ana rubuta shi kamar yadda ake yi a yau), sai dai ba a kulle ɗan'uwansa ba.
- **Ba ya taɓa zama na ƙarshe**: lokacin jira taga ce ta ƙayyadadden adadi da ake sabuntawa
  (`testStatus: "unavailable"`); ba a taɓa fitar da matsayi na dindindin daga
  siginar matakin IP ba. Haɗin `disableCooling` suna tsallake reshen gaba ɗaya.
- **Matsayin girman makulli ya canza ga dangin da ke cikin jerin izini**: wannan canjin
  fage ne, ba kawai inganta 'yan'uwa ba. opencode mai samar da `passthroughModels`
  ne, don haka kafin wannan reshen, 429 yana haifar da kullewa ga kowane MODEL; yanzu
  yana haifar da lokacin jiran haɗi — har ma ga ma'aikacin da ke gudanar da haɗi guda
  ɗaya ba tare da wani ɗan'uwa ba. Wannan shi ne girman da teburin dokokin opencode
  ya riga ya ayyana a matsayin daidai (`scope: "connection"`,
  `providerErrorRules.ts`), amma ba a taɓa mutunta shi ba zuwa yanzu saboda opencode ba ya cikin
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Reshen da kansa yana rubuta lokacin jiran haɗin
  da ya gaza + `backoffLevel`, yana kwaikwayon reshen agentrouter mai fagen haɗi,
  sannan ya dawo — ba a taɓa kaiwa ga toshewar kowane model da hanyar gama-gari
  da ke ƙasa ba.
- **An haɗa combo**: kamar reshen agentrouter, fagen da gangan yake
  watsi da rage matsayin `persistUnavailableState`/`isCombo` da mai kiran combo
  yake amfani da shi ga 429. Kullewar kowane model ba wani nau'i mafi rauni na wannan fage ba ne,
  raka'ar da ba daidai ba ce: ba ta faɗi komai game da IP ɗin da ya ƙare ba, don haka
  jujjuyawar combo za ta ci gaba da ɓata kira guda da tabbas zai gaza ga kowane ɗan'uwa.
- **Kariyar 'yan'uwa**: ba a taɓa maye gurbin ɗan'uwan da ya riga ya kai matsayi na ƙarshe
  (banned/credits_exhausted) ko wanda ya riga yake cikin lokacin jira mafi tsawo ba.
- **Keɓantaccen jerin izini**: faɗaɗa `EGRESS_BUCKETED_LOCK_PROVIDERS`
  shawara ce bayyananniya ta mai shi; babu haɗawa ta gama-gari (tsarin #10334/#10419). Query na
  'yan'uwa yana ɗaure wannan jerin izinin ɗaya maimakon maimaita shi a matsayin SQL
  literal, don haka faɗaɗa shi zai ci gaba da zama canjin layi guda.
- **Jujjuyawar egress IP, ta ɓangarorin biyu**: tazarar nema (24h) ta fi
  TTL na cache ɗin egress-IP (5 min) faɗi sosai, don haka "IP na ƙarshe da aka sani" tarihi ne,
  ba halin yanzu ba. Idan proxy na wani haɗi ya juya a cikin wannan tazara,
  makullin na iya **rasa** IP da ake rabawa da gaske (IP ɗin da aka rubuta shi ne sabon wanda
  bai ƙare ba) — haka kuma yana iya **sanya ɗan'uwan da tun daga lokacin ya
  juya daga** IP ɗin da ya ƙare cikin lokacin jira. Lamari na biyu yana sa wannan ɗan'uwan ya rasa
  taga ɗaya ta lokacin jira; an amince da duka biyun a matsayin iyakokin iyakar ƙoƙari na
  bincike mai dogaro da tarihi.
- **Kuɗin aiki**: bincike biyu masu iyaka a cikin `proxy_logs` (an tace tazara ta hanyar
  `idx_pl_timestamp`), a mitar 429 kawai. Babu sabon index (migration 134
  YAGNI). An auna a kan kwafin DB na zirga-zirgar gaske mai matsakaicin girma;
  tsarin da ke sarrafa zirga-zirga mai yawa yana riƙe da layuka masu yawa daidai gwargwado
  a cikin wannan tazara.

---

## Sauran Fasalolin Juriya

- **Dabarun routing guda 19** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — duba [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing mai la'akari da reset** (v3.8.0) — yana fifita haɗe-haɗe bisa lokacin sake saita quota.
- **Raguwar yanayin background** — Responses API `background: true` yana komawa sync tare da gargadi.
- **Gano iyakar kayan aiki ta atomatik** — yana rage matsin amfani da providers idan an kai iyakar adadin kayan aiki.
- **Fallback na gaggawa** — `OMNIROUTE_EMERGENCY_FALLBACK` ne ke sarrafa shi; masu gudanarwa za su iya sauya shi daga shafin Feature Flags ba tare da restart ba.

---

## Debugging

- Weighted combo yana amsa da `503 all_targets_cooling_down` (an saita `Retry-After`, sannan `diagnostics.excluded` yana jera kowace manufa tare da `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → an saita pool ɗin kuma an haɗa shi, sai dai kowace manufa an cire ta ne saboda ma'aunin lokacin juriya; gargadin `[COMBO] Weighted selection: every target excluded before dispatch — …` yana bayyana dalilan da daƙiƙun da suka rage. `404 no_executable_targets` daga combo ɗin nan yana nufin babu ma'aunin lokacin juriya da ya shiga tsakani (babu abin da za a gudanar, ko kuma kowane account ya gaza gwajin availability). An gina shi a cikin `open-sse/services/combo/pinRecovery.ts` daga abubuwan da aka cire da aka tattara a `targetResolution.ts`.
- An tsallake dukkan keys na provider → bincika duka matsayin circuit breaker DA `rateLimitedUntil`/`testStatus` na kowane connection.
- An cire provider har abada bayan reset window → code yana karanta raw `state` maimakon `getStatus()`/`canExecute()`.
- Key ɗaya ya gaza, ya kamata sauran su yi aiki → fi son connection cooldown maimakon circuit breaker.
- Model ɗaya kaɗai ya gaza → fi son model lockout maimakon connection cooldown.
- Ya kamata state ya farfaɗo da kansa amma bai yi ba → bincika timestamp na gaba + hanyar karantawa da ke sabunta state da ya ƙare. Permanent statuses suna buƙatar sauye-sauye da hannu.

---

## TLS Fingerprinting & Stealth

An rubuta takaddun stealth na musamman ga provider (JA3/JA4, CCH, obfuscation) daban — duba `docs/security/STEALTH_GUIDE.md` (git; ba a haɗa shi cikin `/docs` ba).

---

## Gwajin juriya (Phase 8 · Block C)

Baya ga unit tests na dabarun juriya, gwaje-gwaje guda uku suna gwada runtime a ƙarƙashin
yanayin matsin lamba/gazawa na gaske (duk integration/nightly ne — babu wanda ke hana PRs):

| Gwaji       | Abin da yake yi                                                                                                                                                                                                                       | Yadda ake gudanarwa                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node yana shigar da latency/reset/timeout/503 na gaske; yana tabbatar da cewa circuit breaker yana buɗewa/farfadowa kuma `checkFallbackError` yana rarraba 503 a matsayin fallback da za a iya farfaɗowa daga gare shi. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams ga kowane `createSSEStream` ƙarƙashin `--expose-gc`; yana gazawa idan heap ya girma fiye da iyakar da aka saita (kariyar OOM #3069).                                                                                     | `npm run test:heap`                      |
| k6 soak     | Ci gaba da load a kan `/api/monitoring/health`; iyakokin p95/error.                                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` ne ke tsara su (cron + dispatch). A cikin
`test:integration` na asali, chaos da heap suna tsallake kansu (idan babu `RUN_CHAOS_INT`/`--expose-gc`).

---

## Duba Kuma

- [Jagorar Tsarin Gine-gine](./ARCHITECTURE.md) — Tsarin gine-ginen tsarin da abubuwan cikinsa
- [Jagorar Mai Amfani](../guides/USER_GUIDE.md) — Masu samarwa, haɗe-haɗe, haɗin CLI
- [Injin Haɗe-haɗe ta Atomatik](../routing/AUTO-COMBO.md) — Ƙididdiga mai dalilai 16, fakitin yanayi
