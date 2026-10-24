# Resilience Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute tana da makanikan juriya guda uku masu bambanta amma masu alaƙa. Kowannensu yana da fanni da manufa daban. Riƙe su daban lokacin da kake gano kura-kurai (debugging) na halayen tsara hanya (routing).

![Tsarin juriya na matakai uku](../diagrams/exported/resilience-3layers.svg)

> Tushe: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker na Mai Ba da Sabis

**Fanni:** dukkan mai ba da sabis (misali, `glm`, `openai`, `anthropic`).

**Manufa:** dakatar da aika zirga-zirga zuwa ga mai ba da sabis da yake gazawa akai-akai a matakin upstream/sabis.

**Aiwatarwa:**

- Babban class: `src/shared/utils/circuitBreaker.ts`
- Haɗi (wiring): `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API na matsayi: `GET /api/monitoring/health`
- API na sake saita: `POST /api/resilience/reset`
- Masu rufi (wrappers): `open-sse/services/accountFallback.ts`
- Teburin DB: `domain_circuit_breakers`

**Matsayoyi:**

- `CLOSED` — ana ƙyale zirga-zirga ta al'ada
- `DEGRADED` — har yanzu ana ƙyale zirga-zirga, amma ana bin diddigin gazawar mai ba da sabis da ta ƙaru; yana komawa `CLOSED` idan nasarori sun isa, ko bayan gwajin haɗi mai inganci, ko bayan mafi tsawon riƙon `OPEN` na irin gazawar ƙarshe (ƙimar `cooldownByKind` nasa, in ba haka ba `resetTimeout`, × `maxBackoffMultiplier`, aƙalla sanyaya ɗaya) ba tare da sabuwar gazawa ba
- `OPEN` — an toshe mai ba da sabis na ɗan lokaci; tsara hanyar combo na ƙetare shi
- `HALF_OPEN` — lokacin sake saita ya ƙare; ana ƙyale buƙatar bincike (probe)

**Tsaftacewar asali mai iya daidaitawa (`open-sse/config/constants.ts`, an fallasa su a Dashboard → Settings → Resilience):**

| Aji     | Ya lalace a | Ya buɗe a | Lokacin sake saita |
| ------- | ----------- | --------- | ------------------ |
| OAuth   | gazawa 5    | gazawa 8  | 60s                |
| API-key | gazawa 7    | gazawa 12 | 30s                |
| Na gida | an samar    | gazawa 2  | 15s                |

`degradationThreshold` na sarrafa lokacin da mai ba da sabis zai shiga `DEGRADED`; `failureThreshold` na sarrafa lokacin da zai buɗe kuma a ƙetare shi. Har yanzu ba a fallasa bayanan martaba (profiles) na masu ba da sabis na gida a shafin saitunan Resilience ba tukuna.

**Lambobin kunna (trip codes):** matsayoyi na matakin mai ba da sabis kawai `[408, 500, 502, 503, 504]`. KADA a kunna saboda kurakuran matakin asusu (mafi yawancin 401/403/429 — waɗancan na cooldown ko kullewa (lockout) ne).

**Farfaɗowa mai jinkiri (lazy recovery):** lokacin da `OPEN` ya ƙare, `getStatus()`, `canExecute()`, `getRetryAfterMs()` suna sabunta matsayi zuwa `HALF_OPEN`. Irin waɗannan karatun (da kuma gazawar ta gaba) suna raguzza `DEGRADED` da ya shafe lokacinsa zuwa `CLOSED`. Ba a buƙatar mai ƙidayar lokaci na bayan gida (background timer).

---

### Cooldown na Mai Ba da Sabis na Duniya, ta Zaɓi (ƙofar taga)

Wani mataki na huɗu, mai **zaɓi** (`PROVIDER_COOLDOWN_ENABLED`, asali a **kashe**), yana riƙe ƙwaƙwalwar ajiya ta masu ba da sabis masu gazawa tsakanin buƙatu a cikin `open-sse/services/providerCooldownTracker.ts`, wanda ƙudurin manufar combo yana tuntuba domin buƙatun combo da ke jere su daina sake tafiyarwa mai ba da sabis da ya yi gazawa kwanan nan. Shigarwar matakin mai ba da sabis suna mutunta ƙofar tagar `PROVIDER_PROFILES`:

| Bayani  | Kunna bayan (`providerFailureThreshold`) | A cikin (`providerFailureWindowMs`) | Sanyaya na (`providerCooldownMs`) |
| ------- | ---------------------------------------: | ----------------------------------: | --------------------------------: |
| OAuth   |                                     `10` |                             `15min` |                            `5min` |
| API key |                                     `15` |                             `30min` |                           `10min` |

A ƙasan wannan ƙofa, **ba** a ɗaukar mai ba da sabis a sanyaya (cooling); nasara ɗaya tana share tagar. Shigarwar matakin haɗi (`provider:connectionId`) kuma suna ci gaba da amfani da jinkirin ƙaruwa (exponential backoff) na `minRetryCooldownMs → maxRetryCooldownMs` maimakon haka. Abubuwan maye gurbi (overrides): `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Mai kare koma baya (regression guard): `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Lokacin Hutu na Haɗin Kai (Connection Cooldown)

**Iyaka:** haɗin kai/asusu/mabuɗi ɗaya na mai ba da sabis.

**Manufa:** tsallake ɗaya mabuɗi mara kyau yayin da sauran haɗin kai na wannan mai ba da sabis ke ci gaba da ba da sabis.

**Aiwatarwa:**

- Ɗaura alamar rashin samuwa: `src/sse/services/auth.ts::markAccountUnavailable()`
- Zaɓi: `getProviderCredentials*` a cikin wannan fayil ɗin
- Lissafin lokacin hutu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Saituna: `src/lib/resilience/settings.ts`

**Filaye ga kowane haɗin kai:**

- `rateLimitedUntil` — alamar lokaci har lokacin da hutu ke ƙarewa
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — mai ƙidaya exponential backoff

**Lokutan hutu na asali:**

- Tushen OAuth: 5s
- Tushen API-key: 3s
- API-key 429: yana fi son headers na `Retry-After`/sake saita/rubutun sake saita mai fassarawa na saman
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Mai tsaron anti-thundering-herd:** yana hana gazawu da suka faru lokaci guda daga tsawaita hutu fiye da kima ko ƙara `backoffLevel` ninki biyu.

**429 na iyakar aiki lokaci guda ba sa hawa tsarin backoff.** `429` wanda jikinsa ya ba da rahoton iyakar aiki lokaci guda ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) yana nufin asusun yana lafiya amma yana cikin aiki.
`checkFallbackError()` yana mayar da dalili `concurrency_limited`: koma zuwa haɗin kai na gaba nan da nan, sanya wannan a hutu na `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ko alamar sake gwadawa ta saman, bar `backoffLevel` ba a canza ba, kuma saita `skipProviderBreaker`.
Jikin quota na bayyanannu har yanzu shi ke cin nasara, don haka jiki wanda kuma ya dace da tsarin quota yana ci gaba da zama hukuncin
quota. Gano: `looksLikeConcurrencyLimit()` a cikin `src/shared/utils/classify429.ts`;
hukunci: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` na breaker) bai canza ba kuma har yanzu yana karanta `rate_limit` ga waɗannan jikuna.

**Tsayayyar abun ciki na stream ba ta sa asusu a hutu.** Lokacin da mai sa ido kan tsayayyar abun ciki
(`open-sse/utils/streamHandler.ts`) ya yanke ƙauna daga stream da bai aika fitarwar samfuri a
lokaci ba, `markAccountUnavailable()` yana rubuta kuskuren a haɗin kai amma ba ya saita
hutu: tsayayyar na wannan buƙata ce, galibi doguwar zagayen tunani (reasoning) da ba a
fitar da komai ba tukuna. Masu sarrafawa na iya sake shiga ciki da `resilienceSettings.streamStallCooldown.enabled`
(asali `false`).

**Framukan reasoning suna sake fara kasafin tsayayyar abun ciki.** Samfurin reasoning na iya tunani na
mintuna kafin farkon token da ake gani: Claude yana stream framukan `thinking_delta` waɗanda
rubutun tunaninsu na iya zama fanko, kuma Responses API yana stream ɗaya abun reasoning bayan
ɗayan. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) yana gane
waɗannan framuka, kuma mai sa idon yana sake fara kasafinsa a kowannensu maimakon soke
zagayen. Har yanzu ba su fitarwar samfuri ba ne, don haka zagaye da ya ƙare da reasoning kawai har yanzu ana
ba da rahotonsa a matsayin fanko, kuma zagaye da ya daina reasoning kuma ya aika heartbeats kawai har yanzu yana
tada mai sa idon.

Framukan binary `reasoningContentEvent` na Kiro tare da sa hannu marar fanko suna kiyaye wannan
aikin reasoning ta cikin mai aiwatarwa a matsayin fanko `reasoning_content` delta. Ba a tura sa hannun nan. Metadata, framukan da ba su cika ba da sa hannu fanko ba sa sake fara
kasafin abun ciki; lokacin ƙarewa na stream mai aiki mai zaman kansa da soke abokin ciniki har yanzu
suna aiki (`open-sse/executors/kiro/reasoning.ts`).

**Matsayoyin ƙarshe (BA lokutan hutu ba):**

- `banned` — ana saita shi ta hanyar gano mabuɗan kalma haramtattu / hana asusu (dubi [BAN_DETECTION](../security/BAN_DETECTION.md)), kuma ta hanyar ƙin buƙata guda uku a jere daga saman ga kowace buƙata (`request_rejected`, misali Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ƙin buƙata ɗaya kawai yana sa haɗin kai a hutu
- `expired` (yana koma matsayin ƙarshe bayan sake gwadawa da iyaka — `EXPIRED_RETRY_MAX = 3` tare da exponential backoff — domin kurakuran OAuth na wucin gadi su iya warakewa da kansu kafin a kashe asusun har abada)
- `credits_exhausted`

Waɗannan suna ci gaba har sai an canza takardun shaida ko mai sarrafawa ya sake saita su. Kada a rubuta a kan matsayoyin ƙarshe da matsayin hutu na wucin gadi.

**Dawowa ta sannu a hankali:** lokacin da `rateLimitedUntil` ya wuce, haɗin kai yana sake cancanta. A kan amfani da nasara, `clearAccountError()` yana share duk filayen kuskure.

### Bangon amfani na Claude OAuth: hanyar ƙarancin fifiko + sake saita iyakar zama

**Iyaka:** haɗin kai ɗaya na biyan kuɗi na Claude (OAuth). Dukkan fasalulluka guda biyu suna
**shiga da zaɓi ga kowane haɗin kai** (Gyara haɗin kai → sashen Claude → `lowPriorityMode` / `autoLimitReset` a cikin
`providerSpecificData`, dukansu a kashe a asali) kuma suna kwatanta umarnan `/low-priority` da
`/limit-reset` na Claude Code (kwangilar sadarwa (wire contract) da aka kama daga Claude Code 2.1.263).

**Aiwatarwa:**

- Injin matsayi + rarraba amsoshi: `open-sse/services/claudeLowPriority.ts`
- Abokin ciniki na matsayin sake saita/claim: `open-sse/services/claudeLimitReset.ts`
- Ƙugiyar mai aiwatarwa (shigar da header + sake gwadawa da asusu guda): `open-sse/executors/base.ts::execute()`
- Dawwamar shiga da zaɓi: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Abin farawa:** bangon amfani na awanni 5 — `429` wanda headers ɗinsa ke ɗauke da
`anthropic-ratelimit-unified-status: rejected` kuma, lokacin da asusun ya cancanta,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ba a aika komai kafin wannan farkon
429 na bangon; 429 da ya zo a taro ba tare da unified headers ba yana bi ta hanyar hutu ta al'ada.

**Hanyar ƙarancin fifiko** (`lowPriorityMode`):

- A kan 429 na iyaka, mai aiwatarwa yana karɓar tayin kuma nan take ya sake gwada **asusun guda ɗaya**
  tare da `anthropic-usage-limit: slow`; layin yana ci gaba da aiki har zuwa lokacin
  `anthropic-ratelimit-unified-reset` da aka sanar (+jinkirin kariya na daƙiƙa 60), kuma kowace buƙata a cikin wannan taga tana ɗauke da
  taken. 429 ɗin da aka katse ba ya taɓa isa `handleChatCore`, don haka ba a sanya haɗin cikin
  **lokacin hucewa** kuma ba a juya shi zuwa wani haɗin.
- `anthropic-ratelimit-unified-slow-status` a kan martani na gaba: `active` / `not_needed`
  suna ci gaba da riƙe layin; `slot_busy` (429) ko `529` suna jira na tsawon lokacin
  `anthropic-ratelimit-unified-slow-retry-after` na sabar (tsoho daƙiƙa 20, an iyakance zuwa daƙiƙa 5–600, bazuwar ±30%)
  sannan su sake gwadawa, ƙarƙashin iyakar `anthropic-ratelimit-unified-slow-max-wait` (tsoho minti 20, an iyakance zuwa
  minti 1–awa 6) — bayan wannan layin yana ƙarewa kuma lokacin hucewa na minti 10 yana hana sake karɓa. Haka kuma,
  ana iyakance lokacin jiran da abin da ya rage na lokacin ƙarewar fara-upstream na buƙatar kanta
  (`resolveFetchStartTimeout`, minti 10 ta tsohuwa) bayan an cire tazarar daƙiƙa 5: ba tare da wannan iyaka ba,
  tsohuwar iyakar jira ta minti 20 za ta wuce rayuwar buƙatar, sannan a katse barcin
  a tsakiyar jira, abin da zai fito da `TimeoutError` maimakon kyakkyawan ƙarshen `max_wait` + lokacin hucewa.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, juyawar taga ta awa 5, ko
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wanda ke ƙare shi a matsayin
  `extra_usage` a kowane matsayi, domin ƙarin amfani mai biyan kuɗi yanzu yana rufe iyakar) suna ƙare layin; daga nan
  martanin yana bi ta hanyar hucewa ta yau da kullum. Ana tuna `budget_exhausted` har zuwa
  lokacin sake saita kasafin kuɗi da aka sanar (≤ kwanaki 8).
- Ana gudanar da duba iyakar bayan sake-gwada-cikin-ƙoƙari da kuskuren 400 ya haifar na mai aiwatarwar (gyaran
  mahallin, ƙuntata tunani/ƙoƙari, koyon-siga ta atomatik), don haka 429 na iyaka da yake bayyana kawai a
  ɗaya daga cikin waɗannan sake-gwada har yanzu ana katse shi maimakon ya isa hanyar hucewa.
- Matsayi yana cikin ƙwaƙwalwa ga kowane haɗi (sake farawa yana jawo ƙarin 429 na iyaka guda ɗaya domin sake karɓa).

**Sake saitin iyakar zama** (`autoLimitReset`, ana gwada shi kafin layin idan dukansu suna kunne):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → tubalin `juniper_tide`;
  idan `arm: "reset"` da `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` tare da
  `{ "program": "juniper_tide" }` (UUID na ƙungiya daga
  `providerSpecificData.organizationUUID`, tare da komawa ga bootstrap idan ya gaza).
- `result: reset|not_limited` → ana sake gwada buƙatar da cikakken gudu (babu taken jinkiri).
  `already_used` / `not_offered` suna adana `next_available_at` a ƙwaƙwalwa (tsoho mako guda); kowace
  gazawa tana jira minti 15 kafin sake gwadawa. Sake saitin sau ɗaya ne a mako kuma har yanzu yana cikin
  lissafin iyakar mako-mako.

Masu gadin hana koma-baya: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Alaƙar zama (#7274)

**Iyaka:** zaman abokin ciniki guda ɗaya (taken `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) da aka ɗaure zuwa haɗi guda ɗaya, ga **kowane** mai samarwa.

**Manufa:** riƙe wakili mai zagaye da yawa (Claude Code, aider, wakilai na musamman) a kan asusu guda ɗaya a duk buƙatu, domin rage asarar mahalli tsakanin asusu da maimaitattun 429 na fara-sanyi a kan masu samarwa masu matsayin zama na kowane asusu.

**Aiwatarwa:**

- Tantance TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Zaɓi/ƙirƙirar ɗauri: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ciro take (na gama-gari, kowane mai samarwa): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Teburin ɗauri da aka adana: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Saiti: `sessionAffinityTtlMs` (TTL na gama-gari a ms, `0` yana kashe shi) — `src/lib/db/settings.ts`. An sauya sunansa daga `codexSessionAffinityTtlMs` na Codex kaɗai ta ƙaura `124_generic_session_affinity_ttl.sql`, wadda ke ɗaukar duk wani TTL na Codex da aka saita a baya a matsayin sabon tsoho.

Kafin #7274, `resolveSessionAffinityTtlMs()` yana fita nan take da `0` ga kowane mai samarwa ban da `codex`, don haka saitin TTL (da taken zama) ba su da tasiri a ko'ina ba duk da cewa tsarin ɗauri da ciro take sun riga sun kasance masu zaman kansu daga mai samarwa. Gyaran ya cire wannan fitowar da wuri; yanzu TTL yana aiki iri ɗaya ga kowane mai samarwa da zarar an saita shi gaba ɗaya sama da `0`.

Ba a taɓa tura taken alaƙar zama guda uku zuwa upstream — masu aiwatarwa suna gina nasu taken upstream daga tushe maimakon isar da taken abokin ciniki kai tsaye, don haka wannan yana ci gaba da kasancewa ID na daidaitawa na ciki kawai.

### Hayar haɗin zama da ake sarrafawa ta keɓance

**Iyaka:** abokin cinikin/zaman HTTP guda ɗaya mai aiki da ake sarrafawa ne yake mallakar haɗin OmniRoute guda ɗaya da ya cancanta.

**Manufa:** samar da mallakar haɗi ta keɓance mai ɗorewa ga abokan ciniki da ke buƙatar tsayayyen
shingen sarrafa hanya a tsakanin buƙatu. Wannan ya bambanta da alaƙar zama, wadda fifikon ci gaba ne mai sassauci:
haya ta keɓance tana adana matsayin zagayowar rayuwa a cikin SQLite, tana tilasta keɓancewar mai-mallaka-mai-aiki da
haɗi-mai-aiki a matakin gama-gari, sannan ta ƙi karɓar tsohon ƙarni kafin aika shi zuwa mai samarwa.

Ana kunna fasalin ne bisa zaɓi ga kowane maɓallin API. Dole ne maɓallin da ake sarrafawa ya kasance da iyakar izini ta `lease:exclusive` da
bayyanannen jerin `allowedConnections` marar komai. Kowane abokin cinikin HTTP zai iya amfani da ƙarshen-zagayowar-rayuwa; ba a buƙatar
sunan abokin ciniki, user-agent, mai samarwa, hanyar OAuth, ko samfuri. Hayar tana mallakar haɗi ne,
ba samfuri ba, don haka sauya samfuri yana ci gaba da riƙe ɗaurin muddin haɗin yana ci gaba da kasancewa
mai cancanta a yanayi na yau da kullum. Ka'idojin samfuri, ƙima, lafiya, lokacin hucewa, da jerin izini na yau da kullum suna ci gaba da
kasancewa masu iko kuma suna iya sauya wannan ƙarni zuwa wani haɗi mai 'yanci da ya cancanta.

Tsarin rayuwa shi ne `POST /api/v1/session-leases` tare da ayyukan JSON `acquire`, `renew`, da `release`.
Buƙatun inference da aka sarrafa suna gabatar da ƙimar `X-OmniRoute-Lease-Owner` marar bayyani da kuma
`X-OmniRoute-Lease-Generation` daidai. Mai shi yana amfani da `vlo_` wanda haruffa 43 na base64url ke bi;
kawai ana adana hash ɗin SHA-256 nasa. Kowace katangar tura-aiki ta ƙarshe kuma tana ɗaure ID na maɓallin
API da aka tabbatar da shi da kuma ID na haɗi mai aiki. Ana cire kanun (headers) sarrafa lease daga log ɗin,
hotunan buƙatu da aka riƙe, da kuma kanun mai aiwatarwa na upstream.

Idan tsarin tsara hanya na yau da kullum yana da ƴan takara da aka sarrafa waɗanda suka cancanta amma kowane
ɗan takara da ke talla wani lease mai aiki na waje ya kwashe shi, OmniRoute tana mayar da HTTP `429`, lambar
lease-capacity-unavailable, yanayin waiting-for-capacity, da kuma `Retry-After` mai iyaka wanda aka samo daga
ƙarewar farko da ta dace. Rashin samun wanda ya cancanta na yau da kullum ba gardama ta lease ba ne kuma yana
riƙe ma'anar kurakuran tsara hanya da yake da su a halin yanzu.

Abubuwan da suka shafi juna suna ci gaba da kasancewa daban-daban:

- Zama a session na OAuth wani rarrabawa mai laushi ne na cikin tsari (process) guda ga asusun OAuth.
- Semaphore na asusu suna ba da izinin aiwatar da buƙatu a lokaci guda kuma suna ƙarewa idan buƙata ta cika.
- Lease na session na musamman da aka sarrafa su ne mallakar tsarin rayuwa mai dorewa tare da katangar zamani (generation fence).

---

## 3. Kullewun Samfur

**Fanni:** hadadden guda uku na mai samarwa + haɗi + samfur.

**Fannin maɓalli bisa matsayi:** matsayin gazawar ne ke yanke shawarar wane maɓalli kullewa za ta rubuta a gare shi (`resolveLockoutScope()` a cikin `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sigina na kima ko na 'yanci — kulle **iyalin kima**: ga codex duka fannin `codex` / `spark` (kowane samfur `gpt-5*` na wannan haɗin), ga sauran masu samarwa `getQuotaScopedModelForProvider()`.
- `404` yana kulle samfur kaɗai (`getModelLockKey()` yana ƙuntata `not_found`).
- Kowane wani matsayi — gazawar watsawa/uwar garken `5xx` da kuma `502` da OmniRoute kanta ta ƙirƙira daga tantance inganci — yana kulle **ainihin** ƙungiyar mai samarwa/haɗi/samfur kawai. Mummunan stream a kan samfur ɗaya ba shaida ba ce game da kimar asusun; kafin wannan ƙa'ida amsa ɗaya mara komai a kan `codex/gpt-5.6-luna` ta cire kowane samfur `gpt-5*` na wannan haɗin daga tsarin jagora na minti 2–30 (yana ƙaruwa) yayin da ba a taɓa kimarsa ba.
- Zaɓin `scope` da mai kira ya bayyana a fili koyaushe yana cin nasara (Antigravity yana miƙa `"exact"`).

**Manufa:** gujewa kashe haɗi gaba ɗaya lokacin da samfur ɗaya kawai ba ya samuwa ko kuma an takaita shi bisa kima.

**Misalai:**

- Masu samarwa na kima ta kowane samfur da ke mayar da 429
- Masu samarwa na gida da ke mayar da 404 saboda samfur ɗaya da ya ɓace
- Gazawar izinin yanayi/samfur na musamman mai samarwa (misali, yanayoyin Grok)

**Aiwatarwa:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Allon Sanyaya Samfur (v3.8.0)

UI: Saituna → Sanyaya Samfur (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Yana lissafa kullewa masu aiki tare da: mai samarwa, haɗi, samfur, dalili, expiresAt. Masu aiki za su iya sake kunna samfur da hannu daga katin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — lissafa kullewa masu aiki
- `DELETE /api/resilience/model-cooldowns` — sake kunna da hannu. Jiki: `{provider, connection, model}`. Tantancewa: gudanarwa.

### Manajan Sanyaya

UI: Sa ido → Manajan Sanyaya (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Shafi ɗaya ga kowane haɗi da ya fita daga tsarin jagora saboda dalili na wucin gadi, maimakon
buɗe kowane shafin mai samarwa. Yana lissafa sanyayar haɗi, kullewun samfur da yanayoyin
ƙarshe, yana share su ga kowane haɗi, ga wani zaɓi, ko ga duk haɗin wani mai samarwa,
kuma yana gyara ƙa'idodin sanyaya da aka fi daidaitawa: `streamStallCooldown.enabled` da OAuth / API-key
`connectionCooldown` sanyayar tushe da matsakaicin matakan ɗagawar ja baya (ana ajiye su ta
`PATCH /api/resilience`). Ana lissafa yanayoyin ƙarshe (`banned`, `expired`, `credits_exhausted`) amma ba a taɓa share su a nan.

**REST API** (`src/lib/resilience/cooldownManager.ts`, tantancewa: gudanarwa):

- `GET /api/resilience/cooldowns[?provider=]` — haɗi tare da matsayi, sanyaya da ta rage,
  matakin ja baya, nau'in kuskuren ƙarshe da kullewun samfur (babu takardun shaida)
- `POST /api/resilience/cooldowns` — jiki `{connectionIds: string[]}` ko
  `{all: true, provider?}`; yana mayar da `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI na saitunan kullewa + farfadowa ta ragewar nasara (v3.8.23)

Kullewun samfur ta koma daga halaye na girmka (hardcoded) da ke aiki koyaushe zuwa fasali mai cikakken daidaitawa, ta zaɓi (opt-in) tare da katinta na saituna da hanyar farfadowa ta kai-kai.

**Katin saituna:** Saituna → Kullewun Samfur
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Wannan **dabam** ne daga `ModelCooldownsCard` na karantawa-kawai a sama (wanda kawai
yana _lissafa_ kullewa masu aiki) — sabon katin yana _saita sigogin_. Tsofaffi suna cikin `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Saiti                   | Tsoho                            | Ma'ana                                                             |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | Babban maɓalli — kullewun samfur **a kashe take ta tsoho**.        |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Matsayoyin upstream da ke ƙidaya a matsayin gazawar fannin samfur. |
| `baseCooldownMs`        | `120_000` (120 s)                | Tsawon kullewa na farko ga gazawar farko.                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Kan iyaka a kan sanyayar da aka ɗaga.                              |
| `maxBackoffSteps`       | `10`                             | Matsakaicin matakan ɗagawar ja baya exponential.                   |
| `useExponentialBackoff` | `true`                           | Ko gazawa da yawa na ɗaga sanyayar ta exponential.                 |

Saitunan suna cikawa ta kantin ajiye na saituna na al'ada kuma ana tantance su ta tsarin
(schema) saitunan juriya; katin yana ƙuntata `baseCooldownMs`/`maxCooldownMs`
(tare da `maxCooldownMs ≥ baseCooldownMs`) da `maxBackoffSteps`.

**Farfadowa ta ragewar nasara:** farfadowa **ba** kawai ƙarewar agogon lokaci ba ce. Amsa mai
lafiya tana sake ƙara raguwa ga ƙidayar gazawar samfur don samfur da ya farfado
a tsakiyar tagar lokaci ya daina ɗagawa (kuma ya share) kafin agogonsa ya yi. A kan
haɗin combo da ya yi nasara, `open-sse/services/combo.ts` yana kiran `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), wanda ke **rabin** `failureCount` da aka ajiye
(`Math.floor(failureCount / 2)`); sa'ad da ya kai `0` ana share shigarwar kullewa
gaba ɗaya. Abokin aikinsa `recordModelLockoutFailure()` yana ƙara ƙidayar (kuma yana ɗaga
sanyayar) a kan gazawa a cikin tagar ɗagawa. Wannan ragewar nasara ƙari ne ga
ƙarewar agogo ta yau da kullum — kowace hanya za ta iya sake kunna samfur.

**Yanayi:** ana riƙe kullewa **a cikin ƙwaƙwalwar ajiya (in-memory)** (`Map`s na kowane tsari na
`ModelLockoutEntry` da aka maɓalla da `provider:connectionId:model`, kullewa na ainihin-fannin da
`provider:connectionId:exact:model`), ba a ajiye su zuwa
DB — suna ɓacewa a sake farawa. Ana ajiye _saitunan_; _yanayin_ kullewa mai aiki na ɗan lokaci ne.

---

## 4. Sarrafa Yawan Buƙatun Lokaci Guda na Quota-Share (v3.8.36)

Asusun biyan kuɗi (GLM, MiniMax, da sauransu) galibi suna karɓar buƙatu ~1–3 kacal a lokaci guda; ƙetare hakan yana haifar da 429s da cooldowns. Wannan matsala tana da tsanani musamman ƙarƙashin hadewar **quota-share** (`qtSd/…`), inda maɓallan API da yawa ke raba asusu guda na sama. Matakan uku suna kare asusun da aka raba daga ambaliya.

### Iyakar yawan aiki lokaci guda na kowace haɗi (`max_concurrent`)

Kowace haɗin mai samarwa na iya ayyana iyakar `max_concurrent` (`provider_connections.max_concurrent`, ana saita ta a cikin modal ɗin haɗi / API / DB). Bar ta babu komai idan ba a son iyaka. Wannan shi ne kaɗai mabuɗin da ke tūkara matakin tsarawa da ke ƙasa — saita shi zuwa ainihin yawan aikin lokaci guda na asusun (misali GLM ~1, MiniMax ~2).

### Iyakokin yawan aiki lokaci guda na kowace samfuri (`modelConcurrency`)

Haɗi na iya ƙara ayyana ainihin iyakokin yawan aiki lokaci guda na kowace samfuri a cikin taswirar `rateLimitOverrides` ɗinta:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Saita shi a cikin modal ɗin haɗi (**Ƙetare iyakar sauri → Iyakokin yawan aiki lokaci guda na kowace samfuri**, `model=cap` ɗaya a kowace layi) ko ta `PATCH /api/providers/[id]` da wannan tsarin JSON ɗin. Ma'anomin maɓallai:

- **Na haɗi gaba ɗaya vs na takamaiman samfuri:** `maxConcurrent` yana ci gaba da kasancewa iyakar haɗi gaba ɗaya da aka raba. Idan dukkansu biyu sun shafi aiki, ana samun ƙofofin biyu tare a ɗan lokaci a cikin wannan ƙofar hadaka (`global → provider → account → model`); halin da ke aiki shi ne iyakar da ta fi tsaurara a cikin waɗanda suka dace.
- **Daidaituwar maɓallin samfuri daidai:** maɓallin shi ne rubutun samfurin da aka miƙa wa mai aiwatarwa bayan warware jagora — yawanci ainihin ID ɗin samfurin sama marar ƙari (`glm-5`), ba laƙabin `provider/model` na gefen abokin ciniki ba (`zai/glm-5` bai dace da `glm-5` ba). Ƙimomin su ne iyakokin buƙatun lokaci guda na cikakkiyar lamba mai kyau.
- **Jerin gida, babu bincike:** buƙatun da suka wuce suna yin jerin gwano a gida da ma'anar jeri/timeout da yake akwai (kurakuran shiga na `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ba ya gano ko fahimtar manufar sama da kansa — yana tilasta ainihin iyakokin da mai aiki ya saita. Ƙofar samfuri da ta cika ba ta kashe mai samarwa kuma ba ta ƙirƙirar kulle samfuri na dindindin; halin 429/cooldown/fallback na sama ya kasance matsayin ƙarshe na kuskure.
- **Fannin kowace haɗi, kowace tsari (process):** iyakokin su ne na kowace haɗin bayanai (database) kuma ana riƙe su a cikin ƙwaƙwalwa, don haka haɗi biyu da ke sake amfani da maɓallin API ɗaya na sama ba sa haɗin kai da juna.
- **Rashin saita yana nufin babu canji:** barin taswirar (ko barin filin dashboard babu komai) ba ya ƙara ƙofar samfuri. Misalin saiti ba tare da ayyana wata iyaka ta duniya ta mai samarwa ba:

```text
glm-5=1
glm-4.7=3
```

### Tsara buƙatun quota-share

Idan aikewar quota-share ta nufa haɗi da ke ayyana `max_concurrent` mai kyau, ana tsara buƙatun lokaci guda zuwa wannan **asusun** ta semaphore na kowace haɗi (maɓalli `qsconn:<connectionId>`): buƙatun da suka wuce **suna jira a jerin gwano** maimakon ambaliyar asusun. Yana **fail-open** — jerin da ya cika ko timeout yana ci gaba ba tare da wuri ba maimakon taƙaita buƙata da za a iya aikawa. Canza shi a **Saituna → Juriya → Yawan aiki lokaci guda na kowace haɗi na quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, asali kunne). Ba tare da iyakar `max_concurrent` ba halin ba ya canzawa.

> Ƙofar jagorar quota-share (`selectQuotaShareTarget`, DRR + P2C) ita kanta fail-open ce kuma tana _rage mahimmanci_ kawai ga haɗi da ta cika — da tafkin haɗi ɗaya ba za ta iya takaita da ƙarfi ba, don haka wannan semaphore shi ne ainihin abin da ke ɗauke da ambaliyar.

### Sake gwadawa mai fahimtar cooldown na combo

Ga kowace dabarar combo (idan an kunna), buƙata da za ta kafa 429 saboda GAJEREN cooldown na wucin gadi tana jira shi ya wuce kuma ta sake aikawa maimakon mayar da 429 — wannan ya rufe tagogin TPM/RPM na irin Gemini (~60s retry-after) a kan combos na samfuri da yawa, misali dukkanin manufofi biyu na combo na samfuri 2 suna buga iyakar sauri na kowace samfuri. Yana da iyaka da `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) a **Saituna → Juriya**. Ba ya jira a kan `quota_exhausted` (an kulle har tsakar dare) ko dalilan auth/not-found.

Wannan ƙofar ma tana rufe yanayin kafin aikawa (#16319): idan an tsallake kowace manufa ta combo kafin a yi wani gwaji saboda samfurinta yana cikin kulle na wucin gadi na gajere, hanyar marar gwaji tana jira kulle ya wuce ƙarƙashin wannan iyakoki kuma tana sake aikawa, maimakon amsa `503 ALL_TARGETS_SKIPPED` marar-bayanin kula. Idan ba a yarda da jira ba (iyaka, gwaji ko kasafin kuɗi ya ƙare, ko fasalin ya kashe), amsar ƙarshe tana haɓakawa zuwa `429 rate_limit_error` tana ɗauke da `retry_after` / `reset_at` daga mafi farkon ƙarewar kulle na wucin gadi; kulle na quota, auth da not-found suna riƙe da 503 marar-bayanin kula.

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

## 5. Sarrafa Karɓar Jerin Jiran Buƙatu (v3.8.49 · issue #6593)

**Fanni**: jerin jiran takaita yawan kira na gida ga kowace mai samarwa+haɗi (`open-sse/services/rateLimitManager.ts`, wanda aka gina shi bisa Bottleneck), mataki ɗaya ƙarƙashin hanyoyin uku da ke sama.

**`maxWaitMs` yana sa iyaka kan jiran jerin gwiwa; `executionMaxWaitMs` yana sa iyaka kan aiwatarwa.**
An raba su biyun gangan, kuma ɗayan ba ya ciyar da ɗayan.

`resilienceSettings.requestQueue.maxWaitMs` shine **kasafin jiran jerin gwiwa**: ya ƙunshi jiran samun wuri a wajen mai samarwa sannan zama a cikin QUEUED, kuma ana share mai ƙidaya lokutansa da zarar aikin ya bar QUEUED ya fara aiwatarwa (`rateLimitManager.ts`, `wrappedFn`). Buƙata da ta wuce shi ba ta taba isa ga upstream. Tsohuwar dabi'a 30000ms, wadda `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ke samarwa a `src/lib/resilience/settings.ts` kuma `tests/unit/ratelimit-admission-control-6593.test.ts` ya kulle ta, don haka canja ta zai jayar da wannan gwajin maimakon barin wannan sakin layin ya zama tsoho a shiru.

`resilienceSettings.requestQueue.executionMaxWaitMs` shine abin da Bottleneck ke karɓa a matsayin `expiration` na aikin, wanda mai ƙidaya lokutansa yana farawa ne kawai bayan tura aiki. Shi tsaron baya ne ga masu aiwatarwa waɗanda ba su da ƙarewar lokacin upstream nasu, kuma ana ɗaga shi zuwa ƙarewar lokacin fara-fetch na mai aiwatarwar idan wancan ya fi tsawo, don haka ba zai iya yanke amsa mai lafiya da ke kan hanya ba. Tsohuwar dabi'a 600000ms (minti 10).

Ciyar da kasafin jerin gwiwa cikin `expiration` shi ne ke kashe ƙofofin da ba su da ci gaba (non-incremental) a tsakiyar aiki a da — suna gudana na mintuna bisa doka gabanin farkon bytes — kuma shi ne dalilin da yasa expiration ke bayyana a matsayin `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) yayin da kasafin jerin gwiwa ke ɗauke da lambar ƙarewar lokacin jerin gwiwa. Za a iya maye gurbin ɗayan ta `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ko dashboard (**Settings → Resilience**). Ana matsa dukansu zuwa 1ms–24h lokacin daidaitawa.

**Fifiko, ga dukansu:** canjin muhalli (env var) yana samar da _tsohuwar dabi'a_ kawai. Ƙimar da aka adana a `resilienceSettings.requestQueue` (dashboard / API patch, an adana ta a `key_value`) tana rinɗaya shi, kuma `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` na kowane haɗi yana rinɗaya wancan. Don haka saita canjin muhalli a kan tura (deployment) wanda ya riga ya da ƙima da aka adana ba ya canza komai — a maimakon haka, a share ko a sabunta saitin da aka adana.

Ana iyakance zama a jerin gwiwa da `maxWaitMs`; `maxQueueDepth` da ke ƙasa yana iyakance yawan masu kira da za a iya sanya a jerin gwiwa a lokaci guda.

**Maimaitawa da jikin amsa ya bayyana: saita bugawa vs kullewa.** Jikin 429 na iya ambaton jiransa kansa (Gemini `RetryInfo.retryDelay`, rubutun "retry after Ns"), wanda `updateFromResponseBody` ke karantawa. Jira da ta dace da `maxWaitMs` na haɗin ita ce saita bugawa: mai takaitawa yana fasa tafkinsa na tsawon wannan lokaci kuma ana tura kiran da ke jerin gwiwa idan ya sake cika. Jira da ta fi `maxWaitMs` ba abu ce da jerin gwiwa zai iya jimrewa ba — Gemini yana amsa kuota ta yau da kullum da ta ƙare da `retryDelay: "86399s"`. `Retry-After` da aka watsa a kan 429 ɗin da aka sake gina (#16528) ya riga ya sa injin fallback ya kulle samfurin na wannan taga lokaci, amma dakatar da mai takaitawa saboda shi ma zai har yanzu dakatar da duk wata kira da ta kai wa maɓallin da wuri (bayan sake saita resilience, misali) na dukan `maxWaitMs`. Idan irin wannan jira ta zo daga cikakken bayanin Google `RetryInfo` mai nau'i (asalin `google_rpc_retry_info`) kuma an riga an ƙuntata mai takaita maɓallin zuwa samfurin (duba `getLimiterKey`), 429 ɗin ya zama kullewar samfuri a kan wannan haɗin a maimakon haka (`lockModelForLongBodyRetry` a `open-sse/services/rateLimitManager/bodyRetryPause.ts`, an sanya mata iyakar awa 24), kuma ana barin mai takaitawa ba a dakatar da shi ba. Zaɓin asusu yana tsallakewa saboda wannan kullewar ta `isModelLocked()`, haka ma ƙofar combo kafin tura aiki take yi ga manufofin da aka ɗaura wa haɗin. A antigravity, wanda mai takaitawarsa ke ne ga kowane iyalin kuota, kullewar tana kan ainihin samfurin, kamar sauran kullewar kuotarsa. Ana kulle sunan da abokin ciniki ya nema ma idan laƙabi (alias) ya warware shi zuwa wannan samfurin, domin waɗancan binciken suna amfani da sunan da aka nema; ana kulle shi daidai (`lockExactModel`), don haka laƙabin da ya ƙetare iyalin kuota na antigravity ko fannin codex ba ya taba kulle nasa. Alama a rubuce kawai, `retryDelay` mara nau'i, ko mai takaitawa da dukan haɗin ke raba tare suna kiyaye dakatarwar. Idan mai takaitawa da hanyar 429 ta sake gina kawai ya dakatar, ana mayar da mai kira wanda sauran lokacinsa na jerin gwiwa ke ƙarewa kafin dakatarwar nan take da lambar ƙarewar lokacin jerin gwiwa (`checkLimiterPause`) maimakon jiran wannan lokaci ya ƙare; an tabbatar da ƙarewar da aka rubuta kafin a gina mai takaitawa, inda Bottleneck ke fara agogon wartsakewarsa, kuma duk wani canji na gaba ga tafkin yana mantawa da ita. `tests/unit/rate-limit-long-body-retry-lockout.test.ts` da `tests/unit/rate-limit-body-retry-pause.test.ts` ne ke rufe wannan.

**`maxQueueDepth` — iyakar karɓa ta zaɓi (sabuwa).** `resilienceSettings.requestQueue.maxQueueDepth`
yana iyakance yawan buƙatun da za su iya zama a jerin gwiwa (ba a tura su ba tukuna) ga mai samarwa+haɗi ɗaya a lokaci guda. Idan jerin gwiwa ya riga ya ɗauke da buƙatu `maxQueueDepth`, ana ƙin sabuwar buƙata cikin sauri da kuskure mai nau'i
`code: "RATE_LIMIT_QUEUE_FULL"` **kafin** ta taɓa isa `limiter.schedule()`
— don haka ƙin karɓar tana da rahusa kuma tana faruwa gabanin duk wani aikin matsa prompt / fassara na gaba don wannan buƙata. Tsohuwar dabi'a `0` =
an kashe, wanda ke kiyaye halin jerin gwiwa mara iyaka na yanzu; iyaka 0–100000.
A maye gurbinsa ta `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ko
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Binciken karɓar kanta aiki ne mai tsafta (pure function)
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) don
haka ana iya gwada shi ta unit test ba tare da ainihin mai takaitawa na Bottleneck ba.

> RFC da ya buɗe #6593 ya kuma gabatar da tutar `bypassCompressionOnRateLimit`.
> Pipeline na `open-sse/services/compression/` na wannan repo shi ne matse
> prompt/context akan buƙatar LLM mai fita (`chatCore.ts`, kusa da toshewar
> `resolveCompressionSettings`/`selectCompressionStrategy`), ba matse amsar
> HTTP akan jikin 429 da aka gina ba — babu hanyar code da ta dace da tutar
> bypass ta zahiri. Wannan matakin matse-prompt kuma a yanzu yana gudana
> _kafin_ `withRateLimit()` a cikin pipeline na buƙata, don haka sake tsarawa
> don tsallake shi a lokacin ƙin buƙata saboda layi ya cika canji ne dabam,
> mafi girma fiye da fagen wannan batu; an yi da gangan **kada** a aiwatar da
> shi a nan kuma an bar shi azaman aikin da za a bi (follow-up) idan fa'idar
> rage amfani da CPU ta cancanci haɗarin sake tsarawa.

### Kariyar Tsaro ta Kai-Aiwatar (Auto-Enable) ta Rate-Limit & Kariyar Haɗi (`rateLimitProtection`)

**Kariyar tsaro ta kai-aiwatar** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, tsohuwa `true`):
A matsayin tsohuwa, OmniRoute yana aiwatar da kariyar layi na rate-limit kai tsaye ga duk haɗin masu samar da API-key masu aiki (`getProviderCategory(provider) === "apikey"`). Wannan yana tabbatar da cewa buƙatun da ke shiga ga maɓallan API na upstream masu sensitiwa ga rate ana sanya su a layi kuma ana takaita su ta Bottleneck maimakon su fashe zuwa kurakuran 429 na upstream. Ana iya yiwa kariyar tsaron watsi (override) ta hanyar canjin muhalli `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` yana kashewa, `true`/`1`/`on` yana tilasta kunna), wanda yana fi karfin saitin dashboard da aka ajiye (**Saituna → Juriya** / `PATCH /api/resilience`).

**Ma'anar `rateLimitProtection` na kowane haɗi:**
Ana bin diddigar kariyar rate-limit na kowane haɗi ta hanyar filin boolean `rateLimitProtection` akan haɗin masu samarwa (ana ajiye shi azaman `rate_limit_protection` a cikin SQLite):

- **Kunna sarari (`rateLimitProtection === true`)**: An kunna kariyar rate-limit sarari ga wannan haɗin, ba tare da la'akari da nau'in mai samarwa ba ko ko an kunna kariyar tsaro ta kai-aiwatar.
- **Kashe sarari (`rateLimitProtection === false`)**: Yana kashe kariyar sarari, amma **ba** ya fitar da haɗin API-key mai aiki daga kariyar tsaro ta kai-aiwatar ta duniya. A cikin `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` da `undefined` suna daidai: kawai ana ɗaukar `rateLimitProtection === true` azaman override na sarari. Idan `rateLimitProtection` `false` ne (ko ba a saita shi ba), haɗin API-key mai aiki har yanzu yana dacewa da shararren kai-aiwatar kuma yana ci gaba da kasancewa a ƙarƙashin kariyar rate-limit.
- **Babu ficewa ta kowane haɗi**: Mai aiki ba zai iya nuna a yanzu ba cewa "wannan guda ɗaya haɗin API-key mai aiki dole ya gudana ba tare da kariyar layi na rate-limit" yayin da yake riƙe da kai-aiwatar aiki ga wasu. Don gudanar da haɗin API-key gaba ɗaya ba tare da layin rate-limit ba, dole ne a kashe kariyar tsaron gaba ɗaya (`RATE_LIMIT_AUTO_ENABLE=false` ko `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Hanyoyin rubutu da ake goyon baya:**

- **`POST /api/rate-limits`**: Hanyar rubutu ta gudanarwa da ake goyon baya don canza `rateLimitProtection` na haɗi (`{ connectionId: string, enabled: boolean }`). Kiran wannan da `enabled: true` yana kunna kariyar sarari; kiran wannan da `enabled: false` yana cire kariyar sarari (ko da yake haɗin API-key masu aiki suna ci gaba da kasancewa a ƙarƙashin kariyar tsaro ta duniya idan kai-aiwatar yana kunne).
- **`PUT /api/providers/[id]`**: Da gangan **ba** ya karɓa ko juya `rateLimitProtection` (#11278). Sabunta metadata na haɗin mai samarwa ta `PUT /api/providers/[id]` ba zai taba canza yanayin kariyar rate-limit da aka ajiye ba.

---

## 6. Mai sa ido kan ƙarfin fitarwar stream mai hankali (#9709)

Kariyar da ba wajaba ba `resilienceSettings.streamRecovery.throughputWatchdog` tana gano
wani upstream da ke ci gaba da aika chunks amma yana fitar da sakamakon mataimaki a ƙasa da
matsayin fitarwa mai amfani da aka saita. An niyya ta daban da ƙarewar lokacin zama banza
(idle timeout): heartbeats da metadata ba sa sake saita ko ɗayan masu ƙidayar lokacin kuma
ba sa ƙidaya azaman ci gaba. Hakanan tana bambanta da ƙarshen wa'adin ƙoƙari mai ƙarfi
(#9153), wanda ya kasance bene na kariya na dindindin duk da ingancin fitarwa.

Mai sa idon yana buƙatar lokacin dumamawa (warm-up) sannan cikakkiyar tagar rolling kafin
ya iya yanke aiki. Yana ƙidaya text deltas daga abubuwan fitarwa na Chat Completions da
Responses API (wani wakilin byte na UTF-8 mai tsaro), yana watsi da abubuwan da suka shafi
usage kawai da waɗanda babu komai a cikinsu, kuma yana dakatar da hukunci yayin da abubuwan
kiran kayan aiki ko reasoning suke a gudana. An kashe shi ta tashi (default) kuma ana iya
kunna shi da `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; tagar, dumamawar, ƙarancin ƙimar,
da ƙarancin fitarwar da za a iya aunawa an ƙuntata su ta matakin daidaitawa na saitunan
resilience na al'ada.

Idan an kunna, yanke aikin mai sa ido ana amfani da shi kawai ga ƙoƙarin upstream da ke aiki.
Kafin kowane bytes da abokin ciniki zai gani, hanyar dawowa da wuri ta wannan asusu ɗin da
take akwai na iya sake buɗe ƙoƙarin. Bayan commit, ba a taɗa maimaita stream ɗin da duka;
kwangilar ci gaba ta tsakiyar stream mai lafiya da take akwai kawai za ta iya ɗinka suffix.
Kammalawa tana kasance har ɗaya kawai (single-shot), don haka ba a maimaita ƙidayar usage
da sakin semaphore.

---

## 7. Sake Bayyana Matsayin Upstream (kurakuran quota da aka bayyana ba daidai ba)

**Iyaka:** ƙofa ɗaya ta upstream da ke ba da rahoton ƙarewar quota na wucin gadi da matsayin HTTP da ba daidai ba.

**Manufa:** gyara matsayi mai yaudara KAFIN rarrabewa, don masu amfani na gaba (injin fallback, tattarawar combo, amsar da aka fuskanta wa abokin ciniki) su ga ainihin yanayin gazawar da za a iya sake gwadawa.

Wasu ƙofofi suna nuna ƙarewar quota NA WUCIN GADI da matsayin HTTP da ba za a iya sake
gwadawa ba. `agentrouter.org` yana dawo da `403` (wani lokacin `400`) tare da jiki na
Sinanci (`用户额度不足` / `额度不足`) maimako daidaitaccen `429`. Abokan ciniki kamar Claude
Code suna ɗaukar `403` azaman na dindindin kuma suna yanke zaman, kuma ba tare da gyara ba
injin fallback zai rarraba shi azaman `AUTH_ERROR` maimako abin quota.

**Aiwatarwa:**

- Rajista + mai daidaitawa: `open-sse/config/upstreamStatusRestatement.ts` — jerin
  dokoki na kowane mai samarwa (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), an daidaita su ta `applyStatusRestatement()`.
- Wurin kira: toshe ɗin `providerFailure:` a cikin `open-sse/handlers/chatCore.ts`
  (kusan layi 3654), daidai bayan da `parseUpstreamError()` ya parse amsar upstream
  mai ɗauke da matsayin kuskuren HTTP (`!providerResponse.ok`), kuma kafin kowace
  rarrabewa ta gudana, don kowane mai amfani na gaba ya ga matsayin da aka gyara.
  Kurakuran da aka saka a cikin stream na SSE na `200` suna bin wata hanyar parse ta
  stream daban, ta baya, kuma wannan hook **bai** rufe su ba a yau — wata iyaka da aka
  sani, da ba a buƙata har yanzu ga kuskuren matsayi na agentrouter (wanda ke bayyana
  azaman matsayin kuskuren HTTP).
- Cancancin sake gwadawa: `429` yana cikin `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), don haka kuskuren da aka sake
  bayyana yana ɗaukar tagar sake gwadawa ta gaske maimako ya bayyana azaman `403` da
  ya mutu.
- `defaultRetryAfterMs` na sifili na `60s` (`upstreamStatusRestatement.ts`) abin da
  amsar da aka sake bayyana take gaya wa **abokin ciniki** kawai ne; ba shi da kansa
  zama tsawon lokacin cooldown/lockout na ciki na haɗin — wancan ana sarrafa shi daban
  ta duk wata hanya da ake ainihin sarrafa kuskuren da aka sake bayyana (escalating
  backoff na Connection Cooldown, §2, tushe `3s` ga masu samar da API-key; ko Model
  Lockout, §3, ga masu samar da per-model-quota kamar agentrouter). Mai jagora (router)
  na iya samun cancanta a sake gwadawa a ciki kafin tagar 60s da yake sanar wa abokin
  ciniki — fili na gangan, ba kuskure (bug) ba.

Kurakuran dindindin (`无权访问模型` na agentrouter — babu damar wannan samfurin) BA A TAƊA
sake bayyana su: `excludeMarkers` yana hana dokar ko da `textMarkers` sun jitu, don haka
kuskuren yana riƙe matsayinsa na asali kuma babu abin da zai sake gwada shi har abada.
Dokar rarrabewa ta mai samarwa da ta dace (`agentrouter-model-access-denied` a cikin
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`, da
cooldown na tushe da aka bayyana na `6h`) `checkFallbackError`
(`open-sse/services/accountFallback.ts`) yana neman shawararta _kafin_ dawowa da wuri na
`FORBIDDEN` na kungiyar apikey ta gabaɗaya, a ƙarƙashin ƙofar
`honorsRuleLockScope(provider)` (#10334 — a halin yanzu na agentrouter kawai ta jerin
izini `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a cikin `providerErrorRules.ts`). Cooldown ɗin
6h da dokar ta bayyana yana gudana azaman `fallbackResult.baseCooldownMs`, amma har
yanzu yana ciyar da hanyar lockout ta per-model-quota da aka riga aka sani
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, da #10334 bai canza ba
sai tushen cooldown): an danƙare shi zuwa `mlSettings.maxCooldownMs` na mai sarrafawa
(tashi `1_800_000ms` / minti 30), kamar kowane lockout na samfuri, kuma _dalilin lockout
da aka adana_ ya kasance `"forbidden"` na hardcoded da aka riga aka sani, ba
`"auth_error"` na dokar ba — tsawon cooldown kawai ne ake mutunta daga farko zuwa
ƙarshe, ba jimlar dalilin ba. Haɗin kanta yana kasance a aiki; samfuran 'yan'uwa a kan
wannan haɗin ba su shafe ba.

Kurakuran ƙayyadadden amfani da aka sake bayyana (`额度不足`) suna kaiwa ga wata ƙa'idar mai bayarwa a yanayin samarwa
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ba ta ayyana nata lokacin jira ba — ana amfani da tsohon
scaled backoff na persistence layer). Tun daga #10334, ana amfani da `scope` da ke kan
`ProviderErrorRuleMatch` daga farko har ƙarshe, amma **kawai** ga masu bayarwa da ke cikin
allowlist na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
a yau `"agentrouter"` kaɗai, ana sarrafa shi ta `honorsRuleLockScope()`). Ga kowane
mai bayarwa daban, `scope` yana ci gaba da kasancewa na bayani kawai, daidai yadda yake kafin #10334.
`checkFallbackError` yana fitar da scope na ƙa'idar da ta dace a matsayin
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) shi ne shared guard da ke tabbatar da cewa
`ruleScope` yana da aminci a mutunta shi a matsayin sigina mai shafar duk connection kuma mai murmurewa da kansa
(scope `"connection"`, reason `quota_exhausted`, ba `permanent` ba,
kuma ba `creditsExhausted` ba — kariya ce daga wata ƙa'ida ta gaba da za ta haɗa scope
`"connection"` da yanayin account na dindindin). Masu amfani biyu ne ke kiransa:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  maimakon faɗawa cikin reshen lockout na **kowane model** na passthrough-provider
  (agentrouter yana da `passthroughModels: true` → `hasPerModelQuota()`
  yana mayar da `true`), yana amfani da **cooldown na connection na ɗan lokaci** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ba tare da amfani da terminal status ba
  (`credits_exhausted`/`banned`/`expired`) — don haka connection ɗin zai murmure
  da kansa da zarar cooldown ya ƙare maimakon buƙatar a sake saita credential da hannu.
  Ana tsallake wannan ga connections masu `disableCooling: true` (#2997): wannan opt-out
  yana wucewa zuwa lockout na kowane model maimakon haka (trade-off da aka rubuta —
  duba sharhin code da ke sama da reshen).
- **Combo routing na request ɗaya** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): guard ɗin nan ɗin yana sanya
  connection cikin in-memory Set na `exhaustedConnections`, tare da key
  `${provider}:${connectionId}`. Wannan yana tsallake target da ya rage a REQUEST ƊAYA
  ne kawai idan _shi kansa ya riga ya ƙunshi ainihin `connectionId` ɗin_ a nasa
  target object (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` kafin lookup na `exhaustedConnections`) — combo na
  model-list na yau da kullum, inda sibling targets ba sa ɗauke da pinned `connectionId`
  nasu kuma ana warware ɗaya ne kawai a kowane dispatch daga header na response
  `X-OmniRoute-Selected-Connection-Id`, ba zai taɓa dacewa da wannan key ba. A irin
  wannan yanayin da aka fi samu, ainihin kariya daga sake amfani da account ɗin da ya
  ƙare a leg da ya rage BA wannan Set ba ce — persistence layer da ke sama ce
  (`rateLimitedUntil` na connection ɗin yanzu yana gaba) haɗe da
  wannan guard ɗin da ke hana `transientRateLimitedProviders` saboda
  gazawar (duba "Tsarin matakai biyu" da sharhin code a reshen
  `isAgentrouterConnectionQuotaScope` da ke cikin `targetExhaustion.ts`): idan
  ba a yi wa wannan Set alama ba, force-allow na `allowRateLimitedConnection` a `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) BA zai fara aiki ba ga
  legs ɗin mai bayarwar da suka rage, don haka ana mutunta filter na `rateLimitedUntil`
  na zaɓin credential (`src/sse/services/auth.ts:1238`) kamar yadda aka saba, kuma
  leg da ya rage ko dai ya zaɓi wani agentrouter connection daban da har yanzu ya cancanta,
  ko kuma ya gaza saboda babu credentials — ba zai tilasta komawa
  connection ɗin da wannan reshen ya sa cikin cooldown ba.

### Tsarin matakai biyu: sake bayyana status, sannan classification

Sake bayyana status (`upstreamStatusRestatement.ts`) da ƙa'idojin
classification na mai bayarwa (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) registries ne daban-daban waɗanda dukkansu ke amfani da provider id
da text markers a matsayin key, amma suna gudana a wurare daban-daban kuma suna da
manufofi daban-daban: restatement yana sake rubuta HTTP status da wuri a cikin `chatCore.ts`;
ƙa'idojin classification suna zaɓar fallback `reason` da lock `scope`
(`model` / `provider` / `connection`) a cikin `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Ƙa'idojin classification suna ganin cikakken **text** na error ne kawai (wanda ake buƙata
don daidaita body markers kamar `额度不足`) ga masu bayarwa da aka jera a allowlist na
`FULL_TEXT_RULE_PROVIDERS` da ke cikin `providerErrorRules.ts` — a halin yanzu
`"agentrouter"` kaɗai. Ga duk wani mai bayarwa na **built-in catalog** daban,
`checkFallbackError` yana miƙa wa `getProviderErrorRuleMatch` structured error kawai
(`{code, type}`), wanda ya isa ga ƙa'idojin da suka dogara da header/status/code amma
ba ya iya ganin body-text markers. Helper na `resolveRuleMatchBody()` ne ke yin wannan
zaɓin: cikakken error text ga masu bayarwa da ke cikin allowlist, structured error
ga sauran. Ƙara wani mai bayarwa na **built-in** zuwa `FULL_TEXT_RULE_PROVIDERS`
opt-in ne na musamman ga kowane mai bayarwa — an samar da shi ne domin hanyar tsoho
ga duk mai bayarwar da ba ya cikin jerin ta ci gaba da kasancewa iri ɗaya byte-for-byte.

`scope` na wata ƙa'ida (`model` / `provider` / `connection`) opt-in ne daban
da `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` yana fitar da shi ne kawai a matsayin
`fallbackResult.ruleScope`, kuma downstream consumers ba sa mutunta shi a matsayin
wani abu fiye da label na bayani, sai ga masu bayarwa da ke cikin allowlist na
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` a wannan file ɗin (ana sarrafa shi ta `honorsRuleLockScope()` — a yau `"agentrouter"` kaɗai). Duba "Kurakuran ƙayyadadden amfani da aka sake bayyana"
da ke sama domin ganin abin da daidaituwar `scope: "connection"` ke yi a zahiri da zarar
mai bayarwa yana cikin wannan allowlist.

**#11104 — dokokin da operator ya bayyana suna wuce dukkan allowlist biyu.** Operator na iya
bayyana dokar kowane mai samarwa a lokacin aiki ta `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ba tare da gyara wannan fayil ba. Sanya dokar operator a ƙarƙashin
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
da aka yi nufin kare halin **tsoho** na dokokin catalog da aka gina — zai
sa tsarin saituna ya zama maras aiki ga kowane mai samarwa sai waɗanda aka riga
aka jera a can, tun da bayyana dokar tuni ita ce zaɓin shiga na operator da gangan.
`resolveRuleMatchBody()` da `honorsRuleLockScope()` duk biyu suna duba
`hasOperatorRuleForProvider()` da farko: mai samarwa mai dokar operator yana
samun rubutun kuskure na ainihi kuma ana mutunta `scope` da ya bayyana, ko kuwa
ya kuma bayyana a ɗayan allowlist ko a'a.

**Gibi da aka sani — ba a taɓa tuntubar `providerRuleRegistry` don HTTP 400 ba.**
Reshen `BAD_REQUEST` na `checkFallbackError` yana rarraba matsalar 400 gaba ɗaya
ta hanyar jerin pattern nasa (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, da sauransu a `accountFallback.ts`) kuma yana dawowa
kafin a isa reshen `configuredRule`/`getProviderErrorRuleMatch` da ke sama da shi.
Dokar catalog da aka gina (ko dokar operator) mai `status: 400` tana da inganci
a fannin syntax amma ba za ta taɓa yin aiki ba. Babu wata doka da ke yanzu da ke
nufa 400 a yau, don haka babu abu a production da hakan ya shafa — amma dokar 400
ta nan gaba na buƙatar a fara taɓa wannan reshe, wanda canji ne mafi girma fiye da
ƙara doka (yana sake rarraba 400 ga kowane mai samarwa da ya riga ya dogara kan
halayyar jerin pattern) kuma yana wajen iyakar ƙarin doka na mai samarwa ɗaya.

### Ƙara sabon gateway da ke ba da ƙidayar quota ba daidai ba

1. Yi rajistar jerin dokoki ɗaya a `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Kiyaye `textMarkers`
   na takamaiman mai samarwa; kada a sake amfani da kalmomin Turanci na gama-gari
   da suke karo da `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Idan ana so, yi rajistar dokokin rarrabawa a
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) don zaɓar
   scope na kulle daidai (`connection` don quota na asusu gaba ɗaya, `model` don
   kurakuran kowane model). Wannan mataki yana aiki ne kawai a production ga
   masu samarwa waɗanda dokokinsu ke buƙatar cikakken rubutun kuskure (alamomin
   jiki): ƙara id na mai samarwa a `FULL_TEXT_RULE_PROVIDERS` a fayil ɗin nan —
   in ba haka ba, `checkFallbackError` kawai zai ba dokar kuskuren `{code, type}`
   da aka tsara kuma dokar rubutun jiki ba za ta taɓa dace da zirga-zirga kai
   tsaye ba. Dokokin da suke dacewa kawai bisa `status`/`headers` (kamar na
   Opencode ko na Minimax) ba sa buƙatar wannan zaɓin shiga. Da dabam, idan dokar
   ta bayyana `scope: "connection"` kuma nufin shi ne ainihin cooldown na haɗi
   gaba ɗaya tare da tsallake combo a buƙata ɗaya (ba kawai alamar bayani ba),
   ƙara id na mai samarwa a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a fayil ɗin nan —
   wannan shi ne ke sarrafa amfani irin na `isAgentrouterConnectionQuotaScope()` a
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) da
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); ba tare da shi ba, `scope`
   har yanzu yana gudana ta `fallbackResult.ruleScope` amma babu abin da ke aiki a kansa.
3. Ƙara gwaje-gwajen unit masu kwaikwayon `tests/unit/upstream-status-restatement.test.ts`
   da `tests/unit/agentrouter-error-rules.test.ts` (ciki har da kariyar
   not-permanent / not-creditsExhausted, da — idan mai samarwa yana buƙatar
   allowlist — gwajin da ke tabbatar cewa `resolveRuleMatchBody()` yana mayar da
   cikakken rubutu kawai ga wannan mai samarwa).

Babu buƙatar canje-canje ga `chatCore.ts`, `classifyError`, ko combo.

#### Kulle mai rarraba egress ta bucket (#10880)

Ana ɗaukar masu samarwa a `EGRESS_BUCKETED_LOCK_PROVIDERS` (iyalin opencode) a
matsayin upstream da aka rarraba ta IP (matakin kyauta na opencode an rarraba
shi ta IP, ba ta asusu ba — duba #9611): matsala-429 da aka rarraba
`quota_exhausted` **ko** `rate_limit_exceeded` tana sanyaya kowane haɗi na iyali
a allowlist wanda IP na egress na ƙarshe da aka sani ya dace da na haɗin da ya
gaza, kafin juyawa ya iya gwada su
— guje wa kiran upstream N-1 da aka tabbatar za su gaza (kwatankwacin siffar #10460/#10525).
An haɗa `rate_limit_exceeded` da gangan: a hanyar `markAccountUnavailable`
dokokin opencode ba sa taɓa dacewa (babu headers/body da aka miƙa wa
`checkFallbackError`, opencode kuwa ba ya cikin `FULL_TEXT_RULE_PROVIDERS`), don
haka 429 wanda jikinsa ke ɗauke da rubutun quota na biya ("an kai ga iyakar
amfani na wata-wata") ana rarraba shi `quota_exhausted` ta fallback na rubutun
quota (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown na awa 1)
kafin a taɓa isa dokar `status_429` — yayin da 429 mara rubutun quota (rate
limiting na yau da kullum) yana rarrabuwa ta dokar `status_429` a matsayin
`rate_limit_exceeded` kuma har yanzu yana sanyaya iyalin IP. Ga mai samarwa a
allowlist, iyakar rate da aka rarraba ta IP sigina ɗaya ce da quota da ya ƙare.
Iyakoki na gaskiya:

- **Mafi kyawun yunƙuri**: kulle yana warware `egress_ip` na ƙarshe da
  aka sani na haɗin daga `proxy_logs` (tagar sa'a 24, daidaitacce, babu
  cache). Cache mai sanyi (ba a taɓa tantance IP na egress ba) ko babu wani
  jere → reshen har yanzu yana sanyaya haɗin da ya gaza (ana rubuta shi kamar
  yau), sai dai ba a kulle wani dan'uwa ba.
- **Ba ya zama na ƙarshe ba**: sanyayar wata tagar raba ce mai sabuntawa
  (`testStatus: "unavailable"`); ba a taɓa samun yanayi na dindindin daga
  sigina na matakin IP ba. Haɗin `disableCooling` suna tsallake reshen gaba
  ɗaya.
- **Girin kullewa ya canza ga dangin da ke cikin jerin yarda**: wannan
  canjin yanki ne, ba kawai ingantar da dan'uwa ba. opencode mai samar da
  `passthroughModels` ne, don haka kafin wannan reshe 429 yana haifar da
  toshe kowane MODEL; yanzu yana haifar da sanyaya haɗi — har ma ga mai
  gudanarwa da ke aiki da haɗi ɗaya ba tare da wani dan'uwa ba ko kaɗan.
  Wannan shine girin da teburin dokokin opencode ya riga ya ayyana daidai
  (`scope: "connection"`, `providerErrorRules.ts`), ba a taɓa bin shi ba har
  yanzu saboda opencode ba ya cikin `HONORS_RULE_LOCK_SCOPE_PROVIDERS`.
  Reshen yana rubuta sanyaya haɗin da ya gaza + `backoffLevel` da kansa,
  yana kwaɗayin reshen agentrouter mai yankin haɗi, kuma yana dawowa — ba a
  taɓa isa toshe kowane model da hanyar gama-gari da ke ƙasa ba.
- **An haɗa Combo**: kamar reshen agentrouter, yankin yana ƙyale saukar da
  mataki na `persistUnavailableState`/`isCombo` da mai kiran combo yana
  aiwatarwa ga 429 da gangan. Toshe kowane model ba nau'i mai rauni ba ne na
  wannan yanki, aikatau ne marar daidaito: ba ya faɗar komai game da IP da ya
  ƙare, don haka juyawar combo za ta ci gaba da ƙone kira ɗaya da ya tabbata
  gaza ga kowane dan'uwa.
- **Tsaron dan'uwa**: ba a taɓa rubuta a kan dan'uwa da ya riga ya kai
  ƙarshe (banned/credits_exhausted) ko da ke cikin sanyaya mai tsawo ba.
- **Jerin yarda na musamman**: faɗaɗa `EGRESS_BUCKETED_LOCK_PROVIDERS`
  shawara ce bayyananna ta mai shi; babu haɗin gama-gari (pattern
  #10334/#10419). Tambayar dan'uwa tana ɗaure wannan jerin yarda ɗin maimako
  maimaita shi azaman literal na SQL, don haka faɗaɗa shi yana kasance canji
  na layi ɗaya.
- **Juyawar IP na egress, a bangarori biyu**: tagar bincike (sa'a 24) tana
  da faɗi sosai fiye da TTL na cache na egress-IP (minti 5), don haka "IP na
  ƙarshe da aka sani" tarihi ne, ba yanayin yanzu ba. Idan proxy na haɗi ya
  juya a cikin tagar kulle na iya **rasa** IP da ake raba da gaske (IP da aka
  rubuta shi ne sabon, wanda bai ƙare ba) — kuma daidai wannan yana iya
  **sanyaya dan'uwa da tun da ya juya** daga IP da ya ƙare. Yanayin na biyu
  yana sa dan'uwa ɗin ya biya kuɗin tagar sanyaya ɗaya; an yarda da dukansu
  biyu azaman iyakokin mafi kyawun yunƙuri na bincike da ke dogara da tarihi.
- **Kuɗi**: bincike biyu masu iyaka na `proxy_logs` (tacewa ta taga ta
  hanyar `idx_pl_timestamp`), kawai a mitar 429. Babu sabon index (migration
  134 YAGNI). An auna shi a kan kwafin DB na zirga-zirga na gaske mai
  matsakaicin girma; wani misali mai yawan zirga-zirga yana riƙe da jere mafi
  yawa a daidai a cikin wannan tagar.

---

## Sauran Fasalolin Juriya

- **Dabarun tsara hanya 21** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — duba [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Tsara hanya mai lura da reset** (v3.8.0) — tana fifita haɗi bisa lokacin sake saitan quota.
- **Raguwar yanayin background** — an rage `background: true` na Responses API zuwa sync tare da gargaɗi.
- **Gano iyakar kayan aiki ta ƙarfi** — yana janye providers idan an kai wa iyakokin adadin kayan aiki.
- **Madadin gaggawa** — `OMNIROUTE_EMERGENCY_FALLBACK` ne ke sarrafa shi; masu gudanarwa na iya tilasta shi daga shafin Feature Flags ba tare da sake kunna ba.

---

## Warware Kurakurai

- Combo mai nauyi (weighted) tana amsa da `503 all_targets_cooling_down` (an saita `Retry-After`, `diagnostics.excluded` yana lissafa kowace target tare da `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → an saita pool kuma an haɗa ta, kawai an keɓe kowace target saboda mai ƙidayar lokacin juriya; gargaɗin `[COMBO] Weighted selection: every target excluded before dispatch — …` yana ambaton dalilai da sakan da suka rage. `404 no_executable_targets` daga wannan combo yana nufin babu mai ƙidayar lokacin juriya da ya shiga (babu abin aiki, ko kowace account ta kasa binciken samuwa). An gina shi a `open-sse/services/combo/pinRecovery.ts` daga keɓewar da aka tattara a `targetResolution.ts`.
- An tsallake duk maɓallan provider ɗaya → duba duka yanayin mai yanke da'ira KUMA `rateLimitedUntil`/`testStatus` na kowace haɗi.
- An keɓe provider har abada bayan tagar reset → lamba tana karanta `state` kai tsaye maimakon `getStatus()`/`canExecute()`.
- Maɓalli ɗaya ya kasa, sauran ya kamata su yi aiki → fi amfani da cooldown na haɗi maimakon mai yanke da'ira.
- Model ɗaya kawai ya kasa → fi amfani da lockout na model maimakon cooldown na haɗi.
- Yanayin ya kamata ya warke da kansa amma bai yi ba → duba ko akwai timestamp na nan gaba + hanyar karantawa da ke sabunta yanayin da ya ƙare. Yanayin dindindin yana buƙatar canji da hannu.

---

## Yanayin runtime — taƙaitaccen bayani ga agent

> An motsa shi kamar yadda yake daga `AGENTS.md` → "Resilience Runtime State" (PR #12743) domin jagorar agent
> ta kasance ƙasa da kasafin context na 40k. Wannan shi ne ra'ayin da aka taƙaita wa agent na
> sassan da ke sama; sassan da aka lamba su ne cikakken bayani.

OmniRoute yana da hanyoyi uku masu alaƙa amma daban-daban na magance gazawar wucin gadi. Riƙe
fagen kowanne a daban lokacin warware halin tsara hanya. Duba
[zane-zanen juriya na matakai 3](../diagrams/exported/resilience-3layers.svg)
(tushe: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
don taswira da za a fahimta da wuri.

### Mai Yanke Da'ira na Provider (Provider Circuit Breaker)

**Fage**: dukan provider, misali `glm`, `openai`, `anthropic`.

**Manufa**: dakatar da aika zirga-zirga zuwa provider da ke ci gaba da gazawa a matakin
upstream/sabis, domin provider ɗaya mara lafiya kada ya jinkirtar da kowace buƙata.

**Aiwatarwa**:

- Babban class: `src/shared/utils/circuitBreaker.ts`
- Haɗin ƙofa/aiwatarwa na chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API na yanayin runtime: `src/app/api/monitoring/health/route.ts`
- Abubuwan rufewa da ake amfani da su tare: `open-sse/services/accountFallback.ts`
- Teburin yanayin da aka adana: `domain_circuit_breakers`

**Yanayi** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ana ƙyale zirga-zirga na yau da kullum.
- `DEGRADED`: yankin gargaɗi na farko — gazawu sun wuce matakin raguwa amma ba su kai
  matakin mai yanke da'ira ba tukuna; zirga-zirga na ci gaba da gudana, dashboards na nuna
  gargaɗin. Gwajin haɗi da ya yi nasara ko tagar shiru ba tare da sabuwar gazawa ba zai
  mayar da shi `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` yana da tagar).
- `OPEN`: an toshe provider na wucin gadi; masu kira na samun amsar provider-circuit-open
  ko kuma tsara hanyar combo tana tsallakawa zuwa wani target.
- `HALF_OPEN`: lokacin jira na reset ya wuce; ƙyale buƙatar bincike. Nasara tana rufe
  mai yanke da'ira, gazawa tana buɗe shi kuma.

**Asali** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, ana amfani da shi ta
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` a `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` a `src/sse/handlers/chatHelpers.ts`). Mai yanke da'irar
dukan provider yana aiki bisa `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profile      | yana raguwa a | yana buɗewa a (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------------ | ------------: | ----------------------------------------: | ----------------------------: |
| OAuth        |           `5` |                                       `8` |                         `60s` |
| Maɓallin API |           `7` |                                      `12` |                         `30s` |
| Na gida      |    (an fitar) |                                       `2` |                         `15s` |

`PROVIDER_PROFILES` kuma yana ayyana `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (minti 15/30/5) da `providerCooldownMs` (minti 5/10/1): waɗannan su ne ke
tafiyar da **ƙofar tagar Provider Cooldown ta duniya wadda ake zaɓi (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`, a asali
a kashe) — ana ƙidaya shigar matakin provider a `open-sse/services/providerCooldownTracker.ts` a matsayin
tana sanyaya ne kawai bayan gazawu `providerFailureThreshold` a cikin `providerFailureWindowMs`, sannan
tana sanyaya har na `providerCooldownMs`. Waɗannan BA ƙimomin mai yanke da'ira mai rai ba
ne — kada ka daidaita su kana sa ran halin mai yanke da'ira. Ana iya tilasta kowane asali ta
masu canjin muhalli `OMNIROUTE_PROVIDER_BREAKER_*` da `OMNIROUTE_CIRCUIT_BREAKER_*`;
teburin bayanin da ya dace da runtime yana cikin `docs/architecture/RESILIENCE_GUIDE.md`.

Yanayin gazawa na matakin provider kawai ya kamata ya kunna mai yanke da'irar provider:

```ts
(408, 500, 502, 503, 504);
```

Kada a kunna mai yanke da'irar dukan provider saboda kurakuran account/maɓalli/model na yau da kullum kamar yawancin
lokutan `401`, `403`, ko `429`. Waɗancan yawanci na cooldown na haɗi ko lockout na model
ne. `403` na provider na maɓallin API na gaba ɗaya ya kamata ya iya dawowa sai dai idan an rarraba
shi a matsayin kuskuren provider/account na ƙarshe.

Mai katsewa yana amfani da murmurewar banɗakewa, ba mai ƙidayar lokaci na bango ba. Idan `OPEN` ya ƙare, karatun kamar `getStatus()`, `canExecute()`, da `getRetryAfterMs()` suna sabunta matsayin zuwa `HALF_OPEN`, don haka dashboards da masu gina zaɓaɓɓun haɗe-haɗen combo ba za su ci gaba da fitar da mai samarwa da ya ƙare har abada ba.

### Lokacin Hutawar Haɗin Gwiwa

**Yanki**: haɗin gwiwa/asusu/maƙallin mai samarwa guda ɗaya.

**Dalili**: tsallake maƙalli/asusu mara kyau ɗaya na wucin gadi yayin da ake barin sauran haɗin gwiwa na wannan mai samarwa su ci gaba da bauta wa buƙatun.

**Aiwatarwa**:

- Hanyar rubutawa/sabuntawa: `src/sse/services/auth.ts::markAccountUnavailable()`
- Zaɓen asusu/tacewa: `src/sse/services/auth.ts::getProviderCredentials...`
- Lissafin hutawa: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Saitunan: `src/lib/resilience/settings.ts`

Manyan filayen a kan haɗin gwiwar masu samarwa:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Lokacin zaɓen asusu, ana tsallake haɗin gwiwa yayin:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Hutawa ma na banɗakewa ne: idan `rateLimitedUntil` ya wuce, haɗin gwiwa yana sake samun cancanta. Bayan amfani mai nasara, `clearAccountError()` yana share `testStatus`, `rateLimitedUntil`, filayen kuskure, da `backoffLevel`.

Halin hutawar haɗin gwiwa na tsoho:

- Hutawar tushe ta OAuth: `5s`.
- Hutawar tushe ta API-key: `3s`.
- API-key `429` ya kamata ya fi amfani da alamun sake gwadawa daga sama (`Retry-After`, kanun bayanai na sake saitawa, ko rubutun sake saitawa da za a iya karanta shi) idan suna akwai.
- Maimaitawar gazawuwar da za a iya murmurewa tana amfani da jinkiri mai ƙaruwa ta nuni (exponential backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

Kariyar anti-thundering-herd tana hana gazawuwar lokaci guda a kan wannan haɗin gwiwa daga maimaita tsawaita hutawa ko ƙara `backoffLevel` har sau biyu.

Matsayoyin ƙarshe ba hutawa ba ne. `banned`, `expired` (wanda ke zama na ƙarshe ne kawai bayan sake gwadawa N da aka iyakance ta `EXPIRED_RETRY_MAX`), da `credits_exhausted` ana shirin su kasance ba a samun su ba sai an canza bayanan shiga/saitunan ko mai gudanarwa ya sake saita su. Kada a rubuta matsayoyin ƙarshe da matsayin hutawa na wucin gadi.

### Kullewar Samfuri

**Yanki**: mai samarwa + haɗin gwiwa + samfuri.

**Dalili**: guji kashe duka haɗin gwiwa lokacin da samfuri guda ɗaya ne kawai ba a samu ko aka iyakance masa rabo a wannan haɗin gwiwa.

Misalai:

- Masu samar da rabo na kowane-samfuri da ke mayar da `429`.
- Masu samarwa na gida da ke mayar da `404` domin samfuri ɗaya da ba a samu ba.
- Gazawar izinin yanayi/samfuri na wani takamaiman mai samarwa kamar zaɓaɓɓun yanayin Grok.

Kullewar samfuri tana cikin `open-sse/services/accountFallback.ts` kuma tana barin wannan haɗin gwiwa ya ci gaba da bauta wa sauran samfuran.

### Jagorar Gano Kura-kurai

- Idan an tsallake duk maƙallan wani mai samarwa, duba duka matsayin mai katsewar mai samarwa da `rateLimitedUntil`/`testStatus` na kowane haɗin gwiwa.
- Idan wani mai samarwa ya bayyana an fitar da shi har abada bayan tagar sake saitawa, duba ko lambar tana karanta `state` kai tsaye maimakon amfani da `getStatus()`/`canExecute()`.
- Idan maƙallin mai samarwa ɗaya ya gaza amma sauran ya kamata su yi aiki, fi son hutawar haɗin gwiwa a kan mai katsewar mai samarwa.
- Idan samfuri ɗaya ne kawai ya gaza, fi son kullewar samfuri a kan hutawar haɗin gwiwa.
- Idan wani matsayi ya kamata ya murmure da kansa, ya kamata ya kasance da tambarin lokaci na gaba/lokacin sake saitawa da hanyar karantawa da ke sabunta matsayin da ya ƙare. Matsayoyin dindindin suna buƙatar canje-canjen bayanan shiga ko saituna da hannu.

---

## Gane Yatsun TLS & Boye-boye

An rubuta boye-boyen musamman na kowace mai samarwa (JA3/JA4, CCH, ɓoyewa) a daban — duba `docs/security/STEALTH_GUIDE.md` (git; ba a haɗa shi cikin `/docs` ba).

---

## Gwajin juriya (Phase 8 · Block C)

Bayan gwaje-gwajen gida na manufofin juriya, gwaje-gwaje uku suna gwada lokacin gudanarwa a ƙarƙashin ainihin yanayin matsin lamba/gazawa (duka haɗin kai/dare — babu ɗaya da ke toshe PRs):

| Gwaji       | Abin da yake yi                                                                                                                                                                                                                  | Gudu                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Chaos       | Node na fake-upstream yana shigar da ainihin jinkiri/sake saiti/cikar lokaci/503; yana tabbatar da cewa mai yanke zagaye yana buɗewa/murmurewa kuma `checkFallbackError` yana rarraba 503 a matsayin fallback mai iya murmurewa. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| Heap-growth | Streams kusan 500 ga kowane `createSSEStream` a ƙarƙashin `--expose-gc`; yana gaza idan heap ya girma bisa iyakar (kariyar OOM #3069).                                                                                           | `npm run test:heap`                   |
| k6 soak     | Nauyi mai ɗorewa a kan `/api/monitoring/health`; ƙimar ƙarshe na p95/kuskure.                                                                                                                                                    | `k6 run tests/load/k6-soak.js` (dare) |

Wanda `.github/workflows/nightly-resilience.yml` ke tsarawa (cron + dispatch). A cikin tsohon `test:integration`, chaos da heap suna tsallake kansu (ba tare da `RUN_CHAOS_INT`/`--expose-gc` ba).

---

## Duba Ma

- [Jagorar Gine-gine](./ARCHITECTURE.md) — Tsarin gine-ginen tsari da na ciki
- [Jagorar Mai Amfani](../guides/USER_GUIDE.md) — Masu samarwa, haɗe-haɗe, haɗin CLI
- [Injin Auto-Combo](../routing/AUTO-COMBO.md) — Ƙimar abubuwa 16, fakitin yanayi
