# Resilience Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

Ang OmniRoute ay may tatlong magkakaiba ngunit magkakaugnay na mekanismo ng resilience. Magkakaiba ang saklaw at layunin ng bawat isa. Panatilihing magkakahiwalay ang mga ito kapag nagde-debug ng gawi ng routing.

![Modelo ng resilience na may 3 layer](../diagrams/exported/resilience-3layers.svg)

> Pinagmulan: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**Saklaw:** buong provider (hal., `glm`, `openai`, `anthropic`).

**Layunin:** ihinto ang pagpapadala ng traffic sa isang provider na paulit-ulit na nabibigo sa antas ng upstream/serbisyo.

**Implementasyon:**

- Pangunahing class: `src/shared/utils/circuitBreaker.ts`
- Wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API: `GET /api/monitoring/health`
- Reset API: `POST /api/resilience/reset`
- Mga wrapper: `open-sse/services/accountFallback.ts`
- Talahanayan sa DB: `domain_circuit_breakers`

**Mga estado:**

- `CLOSED` — pinapayagan ang normal na traffic
- `DEGRADED` — pinapayagan pa rin ang traffic, ngunit sinusubaybayan ang tumataas na bilang ng mga pagkabigo ng provider
- `OPEN` — pansamantalang naka-block ang provider; nilalaktawan ito ng combo routing
- `HALF_OPEN` — lumipas na ang reset timeout; pinapayagan ang probe request

**Mga nako-configure na default (`open-sse/config/constants.ts`, makikita sa Dashboard → Settings → Resilience):**

| Klase   | Magiging degraded sa | Magbubukas sa | Reset timeout |
| ------- | -------------------- | ------------- | ------------- |
| OAuth   | 5 pagkabigo          | 8 pagkabigo   | 60s           |
| API key | 7 pagkabigo          | 12 pagkabigo  | 30s           |
| Lokal   | kinukuha mula sa iba | 2 pagkabigo   | 15s           |

Kinokontrol ng `degradationThreshold` kung kailan papasok ang isang provider sa `DEGRADED`; kinokontrol ng `failureThreshold` kung kailan ito magbubukas at lalaktawan. Hindi pa makikita sa pahina ng mga setting ng Resilience ang mga profile ng lokal na provider.

**Mga trip code:** mga provider-level status na `[408, 500, 502, 503, 504]` lamang. HUWAG mag-trip para sa mga account-level error (karamihan ng 401/403/429 — kabilang ang mga iyon sa cooldown o lockout).

**Lazy recovery:** kapag nag-expire ang `OPEN`, nire-refresh ng `getStatus()`, `canExecute()`, `getRetryAfterMs()` ang estado patungong `HALF_OPEN`. Hindi kailangan ng background timer.

---

### Opsyonal na pandaigdigang Provider Cooldown (window gate)

Ang ikaapat na **opsyonal** na layer (`PROVIDER_COOLDOWN_ENABLED`, naka-**off** bilang default) ay nagpapanatili ng
cross-request memory ng mga nabibigong provider sa
`open-sse/services/providerCooldownTracker.ts`, na kinokonsulta ng combo target
resolution upang hindi paulit-ulit na daanan ng magkakasunod na combo request ang isang provider na kabibigo
lamang. Sinusunod ng mga provider-level entry ang window gate ng `PROVIDER_PROFILES`:

| Profile | magti-trip pagkatapos ng (`providerFailureThreshold`) | sa loob ng (`providerFailureWindowMs`) | magko-cooldown nang (`providerCooldownMs`) |
| ------- | ----------------------------------------------------: | -------------------------------------: | -----------------------------------------: |
| OAuth   |                                                  `10` |                                `15min` |                                     `5min` |
| API key |                                                  `15` |                                `30min` |                                    `10min` |

Kapag mas mababa sa threshold, **hindi** itinuturing na nasa cooldown ang provider; nililinis
ng isang tagumpay ang window. Pinananatili naman ng mga connection-level entry (`provider:connectionId`) ang
exponential na `minRetryCooldownMs → maxRetryCooldownMs` backoff. Mga override:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regression guard: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown ng Koneksyon

**Saklaw:** iisang koneksyon/account/key ng provider.

**Layunin:** laktawan ang isang problemadong key habang patuloy na nagsisilbi ang iba pang koneksyon para sa parehong provider.

**Implementasyon:**

- Markahang hindi available: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pagpili: `getProviderCredentials*` sa parehong file
- Pagkalkula ng cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mga setting: `src/lib/resilience/settings.ts`

**Mga field sa bawat koneksyon:**

- `rateLimitedUntil` — timestamp kung kailan matatapos ang cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — counter ng exponential backoff

**Mga default na cooldown:**

- OAuth base: 5s
- API-key base: 3s
- API-key 429: inuuna ang upstream na `Retry-After`/mga reset header/tekstong reset na maaaring i-parse
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Proteksyon laban sa thundering herd:** pinipigilan ang magkakasabay na failure na labis na pahabain ang cooldown o dobleng dagdagan ang `backoffLevel`.

**Mga terminal state (HINDI mga cooldown):**

- `banned` — itinatakda ng pagtukoy sa banned na keyword / account ban (tingnan ang [BAN_DETECTION](../security/BAN_DETECTION.md)), at ng tatlong magkakasunod na upstream na pagtanggi sa bawat request (`request_rejected`, hal. Anthropic OAuth 403 "Hindi pinapayagan ang request" — `open-sse/services/requestRejectedStreak.ts`); ang isang pagtanggi lamang ay maglalagay lang sa koneksyon sa cooldown
- `expired` (lumilipat sa terminal pagkatapos ng limitadong bilang ng retry — `EXPIRED_RETRY_MAX = 3` na may exponential backoff — upang makarekober nang kusa ang mga pansamantalang OAuth error bago permanenteng i-deactivate ang account)
- `credits_exhausted`

Nananatili ang mga ito hanggang sa magbago ang mga credential o i-reset ang mga ito ng operator. Huwag palitan ang mga terminal state ng pansamantalang cooldown state.

**Lazy recovery:** kapag lumipas na ang `rateLimitedUntil`, magiging eligible muli ang koneksyon. Kapag matagumpay itong nagamit, nililinis ng `clearAccountError()` ang lahat ng error field.

### Session affinity (#7274)

**Saklaw:** isang client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) na naka-pin sa isang koneksyon, para sa **anumang** provider.

**Layunin:** panatilihin ang isang multi-turn agent (Claude Code, aider, mga custom agent) sa parehong account sa iba't ibang request, upang mabawasan ang pagkawala ng konteksto sa pagitan ng mga account at ang paulit-ulit na cold-start 429 sa mga provider na may per-account session state.

**Implementasyon:**

- Pagresolba ng TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pagpili/paggawa ng pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Pagkuha ng header (generic, anumang provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Naka-persist na pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (pangkalahatang TTL sa ms, idi-disable ng `0`) — `src/lib/db/settings.ts`. Pinalitan ang pangalan mula sa Codex-only na `codexSessionAffinityTtlMs` sa pamamagitan ng migration na `124_generic_session_affinity_ttl.sql`, na inililipat ang anumang dating na-configure na Codex TTL bilang bagong default.

Bago ang #7274, kaagad na nagbabalik ng `0` ang `resolveSessionAffinityTtlMs()` para sa bawat provider maliban sa `codex`, kaya walang epekto ang setting ng TTL (at ang mga session header) saanman sa ibang lugar kahit na provider-agnostic na ang mekanismo ng pag-pin at pagkuha ng header. Inalis ng pag-aayos ang maagang pagbabalik na iyon; pantay nang nalalapat ang TTL sa bawat provider kapag naitakda na ito sa pangkalahatan nang higit sa `0`.

Hindi kailanman ipinapasa upstream ang tatlong session-affinity header — bumubuo ang mga executor ng sarili nilang upstream header mula sa simula sa halip na ipasa ang mga client header, kaya nananatili lamang itong panloob na correlation id.

### Mga eksklusibong lease ng koneksyon para sa managed session

**Saklaw:** isang aktibong managed HTTP client/session ang nagmamay-ari ng isang eligible na koneksyon sa OmniRoute.

**Layunin:** magbigay ng matibay at eksklusibong pagmamay-ari ng koneksyon para sa mga client na nangangailangan ng mahigpit na routing
fence sa iba't ibang request. Naiiba ito sa session affinity, na isang maluwag na kagustuhan para sa pagpapatuloy:
inipe-persist ng eksklusibong lease ang lifecycle state sa SQLite, ipinapatupad ang global na uniqueness ng aktibong owner at
aktibong koneksyon, at tinatanggihan ang stale na generation bago ang dispatch sa provider.

Opt-in ang feature sa bawat API key. Dapat may scope na `lease:exclusive` at tahasang hindi bakanteng
listahan ng `allowedConnections` ang isang managed key. Maaaring gamitin ng anumang HTTP client ang lifecycle endpoint; walang
kinakailangang pangalan ng client, user-agent, provider, OAuth method, o model. Koneksyon ang pagmamay-ari ng lease,
hindi model, kaya pinananatili ng pagbabago ng model ang binding habang nananatiling karaniwang
eligible ang koneksyon. Nananatiling makapangyarihan ang normal na mga panuntunan sa model, quota, health, cooldown, at allowlist at maaaring
ilipat ang parehong generation sa isa pang libre at eligible na koneksyon.

Ang lifecycle ay `POST /api/v1/session-leases` na may mga JSON action na `acquire`, `renew`, at `release`.
Inilalahad ng mga managed inference request ang opaque na value ng `X-OmniRoute-Lease-Owner` at eksaktong
`X-OmniRoute-Lease-Generation`. Gumagamit ang owner ng `vlo_` na sinusundan ng 43 base64url character; tanging
ang SHA-256 hash nito ang iniimbak. Ibinibigkis din ng bawat huling dispatch fence ang authenticated na API key ID at
aktibong connection ID. Inaalis ang mga lease control header mula sa mga log, pinanatiling request snapshot, at
upstream executor header.

Kung may mga eligible na managed candidate ang ordinaryong routing ngunit okupado ng
aktibong lease ng ibang owner ang bawat libreng candidate, nagbabalik ang OmniRoute ng HTTP `429`, lease-capacity-unavailable code, isang
waiting-for-capacity state, at limitadong `Retry-After` na hinango mula sa pinakamaagang nauugnay na expiry.
Ang karaniwang kawalan ng eligibility ay hindi lease contention at pinananatili nito ang kasalukuyang routing error semantics.

Nananatiling magkakahiwalay ang mga kaugnay na mekanismo:

- Ang OAuth session occupancy ay process-local na maluwag na distribution para sa mga OAuth account.
- Nagbibigay ang mga account semaphore ng mga permit para sa request concurrency at nagtatapos kapag nakumpleto ang isang request.
- Ang mga eksklusibong lease ng managed session ay matibay na lifecycle ownership na may generation fence.

---

## 3. Pag-lockout ng Modelo

**Saklaw:** provider + koneksyon + modelo na triple.

**Saklaw ng key ayon sa status:** ang bumabagsak na status ang nagpapasya kung saang key
magsusulat ang lockout (`resolveLockoutScope()` sa `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — isang senyales ng quota o karapatan — i-lock ang **pamilya ng quota**:
  para sa codex, ang buong saklaw na `codex` / `spark` (bawat `gpt-5*` na modelo ng
  koneksyon), para sa ibang provider, `getQuotaScopedModelForProvider()`.
- Ini-lock ng `404` ang mismong modelo (`getModelLockKey()` ang nagpapakitid sa `not_found`).
- Anumang ibang status — mga kabiguan sa transport/server na `5xx` at ang sariling
  binuong `502` ng OmniRoute mula sa pagpapatunay ng kalidad — ay nagla-lock lamang sa
  **eksaktong** tuple ng provider/koneksyon/modelo. Ang sirang stream sa isang modelo ay hindi ebidensya
  tungkol sa quota ng account; bago ang panuntunang ito, isang walang-lamang tugon sa
  `codex/gpt-5.6-luna` ang nag-aalis sa bawat `gpt-5*` na modelo ng koneksyong iyon mula sa
  pagruruta sa loob ng 2–30 min (na tumitindi) kahit hindi nagalaw ang quota nito.
- Palaging nangingibabaw ang tahasang `scope` na opsyon ng tumatawag (ipinapasa ng Antigravity ang `"exact"`).

**Layunin:** iwasang i-disable ang isang buong koneksyon kapag isang modelo lamang ang hindi available o nalilimitahan ng quota.

**Mga halimbawa:**

- Mga provider na may quota bawat modelo na nagbabalik ng 429
- Mga lokal na provider na nagbabalik ng 404 para sa isang nawawalang modelo
- Mga kabiguan sa pahintulot para sa mode/modelo na partikular sa provider (hal., mga mode ng Grok)

**Implementasyon:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard ng mga Cooldown ng Modelo (v3.8.0)

UI: Mga Setting → Mga Cooldown ng Modelo (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Inililista ang mga aktibong lockout kasama ang: provider, koneksyon, modelo, dahilan, expiresAt. Maaaring manual na muling i-enable ng mga operator ang isang modelo mula sa card.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ilista ang mga aktibong lockout
- `DELETE /api/resilience/model-cooldowns` — manual na muling pag-enable. Body: `{provider, connection, model}`. Auth: pamamahala.

### UI ng mga setting ng lockout + pagbawi sa pamamagitan ng success-decay (v3.8.23)

Mula sa palaging naka-enable at hardcoded na gawi, naging ganap na nako-configure
at opt-in na feature ang pag-lockout ng modelo, na may sarili nitong settings card at landas ng pagbawi na kusang nag-aayos.

**Settings card:** Mga Setting → Pag-lockout ng Modelo
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
**Hiwalay** ito sa read-only na `ModelCooldownsCard` sa itaas (na
_naglilista_ lamang ng mga aktibong lockout) — _kino-configure ng mga parameter_ ng bagong card. Ang mga default
ay nasa `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setting                 | Default                          | Kahulugan                                                                       |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Pangunahing toggle — **naka-off bilang default** ang pag-lockout ng modelo.     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Mga upstream status na itinuturing na kabiguang saklaw sa modelo.               |
| `baseCooldownMs`        | `120_000` (120 s)                | Paunang tagal ng lockout para sa unang kabiguan.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Pinakamataas na limitasyon ng tumitinding cooldown.                             |
| `maxBackoffSteps`       | `10`                             | Pinakamaraming hakbang sa pagtaas ng exponential backoff.                       |
| `useExponentialBackoff` | `true`                           | Kung patitindihin nang exponential ng mga paulit-ulit na kabiguan ang cooldown. |

Pinapanatili ang mga setting sa pamamagitan ng karaniwang settings store at pinapatunayan gamit ang
schema ng mga setting ng resilience; nililimitahan ng card ang `baseCooldownMs`/`maxCooldownMs`
(na may `maxCooldownMs ≥ baseCooldownMs`) at `maxBackoffSteps`.

**Pagbawi sa pamamagitan ng success-decay:** ang pagbawi ay **hindi** lang simpleng pag-expire ng timer. Ang isang maayos
na tugon ay unti-unting nagpapababa sa bilang ng kabiguan ng modelo upang ang modelong nakabawi
sa kalagitnaan ng window ay tumigil sa pagtindi (at ma-clear) bago pa ang timer nito. Sa isang matagumpay
na combo target, tinatawag ng `open-sse/services/combo.ts` ang `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), na **hinahati sa dalawa** ang nakaimbak na
`failureCount` (`Math.floor(failureCount / 2)`); kapag umabot ito sa `0`, ganap na
binubura ang entry ng lockout. Ang katapat na `recordModelLockoutFailure()`
ay nagdaragdag sa bilang (at nagpapatindi sa cooldown) kapag may mga kabiguan sa loob ng
escalation window. Karagdagan ang success-decay na ito sa karaniwang pag-expire ng timer —
maaaring muling i-enable ng alinmang landas ang isang modelo.

**State:** pinananatili ang mga lockout **sa memory** (mga `Map` bawat proseso ng
`ModelLockoutEntry` na may key na `provider:connectionId:model`, at mga exact-scope lock na may key na
`provider:connectionId:exact:model`), at hindi pinapanatili sa
DB — nawawala ang mga ito kapag nag-restart. Pinapanatili ang mga _setting_; pansamantala ang aktibong
_state_ ng lockout.

---

## 4. Pagkontrol sa Concurrency ng Quota-Share (v3.8.36)

Ang mga subscription account (GLM, MiniMax, atbp.) ay kadalasang tumatanggap lamang ng ~1–3 sabay-sabay na
request; kapag lumampas dito, nagti-trigger ito ng mga 429 at cooldown. Mas matindi ito sa ilalim ng
mga **quota-share** (`qtSd/…`) combo, kung saan maraming API key ang nagbabahagi ng iisang upstream
account. Tatlong layer ang pumipigil sa pagdagsa ng mga request sa isang nakabahaging account.

### Limitasyon sa concurrency bawat koneksyon (`max_concurrent`)

Maaaring magtakda ang bawat koneksyon ng provider ng maximum na `max_concurrent`
(`provider_connections.max_concurrent`, itinatakda sa modal ng koneksyon / API / DB).
Iwanan itong walang laman kung walang limitasyon. Ito ang nag-iisang setting na kumokontrol sa serialization
layer sa ibaba — itakda ito sa aktuwal na concurrency ng account (hal. GLM ~1, MiniMax ~2).

### Serialization ng mga quota-share request

Kapag ang isang quota-share dispatch ay nakatuon sa koneksyong nagdedeklara ng positibong
`max_concurrent`, ang mga sabay-sabay na request sa **account** na iyon ay ise-serialize sa pamamagitan ng
isang semaphore bawat koneksyon (key na `qsconn:<connectionId>`): ang mga labis na request ay **maghihintay sa
queue** sa halip na dagsain ang account. Ito ay **fail-open** — kapag puno ang
queue o nag-timeout, magpapatuloy ito nang walang slot sa halip na tanggihan ang isang request na
maaaring i-dispatch. I-toggle ito sa **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, naka-on bilang default).
Kung walang limitasyong `max_concurrent`, hindi nagbabago ang gawi.

> Ang quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) ay
> fail-open din at _binabawasan lamang ang priyoridad_ ng isang koneksyong umabot na sa limitasyon — sa
> isang pool na may iisang koneksyon, hindi ito makapagpapatupad ng mahigpit na limitasyon, kaya ang semaphore na ito ang aktuwal na
> kumokontrol sa pagdagsa.

### Retry na isinasaalang-alang ang cooldown ng combo

Para sa bawat diskarte ng combo (kapag naka-enable), ang isang request na magreresulta sana sa isang 429
dahil sa MAIKLING pansamantalang cooldown ay maghihintay hanggang matapos ito at muling idi-dispatch sa halip na
ibalik ang 429 — saklaw nito ang mga TPM/RPM window na tulad ng sa Gemini (~60s retry-after)
sa mga multi-model combo, hal. kapag ang parehong target ng isang 2-model combo ay tumama sa rate limit
ng bawat modelo. Nililimitahan ito ng `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) sa **Settings → Resilience**. Hindi ito kailanman naghihintay para sa `quota_exhausted`
(naka-lock hanggang hatinggabi) o sa mga dahilang nauugnay sa auth/not-found.

---

## 5. Pagkontrol sa Pagpasok sa Request Queue (v3.8.49 · issue #6593)

**Saklaw**: ang lokal na rate-limit queue bawat provider+koneksyon (`open-sse/services/rateLimitManager.ts`,
na sinusuportahan ng Bottleneck), isang layer sa ibaba ng tatlong mekanismo sa itaas.

**Ang `maxWaitMs` ay isang legacy na naka-persist na pangalan para sa pag-expire ng execution.**
Ipinapasa ang `resilienceSettings.requestQueue.maxWaitMs` sa Bottleneck bilang `expiration`
ng isang job, na ang timer ay nagsisimula lamang pagkatapos ng dispatch. Samakatuwid, nililimitahan nito ang
execution na pinamamahalaan ng limiter, hindi ang oras na ginugugol sa lokal na queue. Ang expiration ay
inilalabas bilang pinagkakatiwalaang lokal na `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504);
tinatanggap lamang ang dating pangalan ng queue-timeout code para sa pinagkakatiwalaang internal na
backward compatibility. Ang default ay 15000ms; i-override sa pamamagitan ng
`RATE_LIMIT_MAX_WAIT_MS` (env) o ng dashboard (**Settings → Resilience**,
1–30000ms na maximum sa UI). Walang deadline sa oras ng pananatili sa queue; gamitin ang
`maxQueueDepth` sa ibaba upang limitahan ang mga caller na nasa queue.

**`maxQueueDepth` — opsyonal na limitasyon sa pagpasok (bago).** Nililimitahan ng `resilienceSettings.requestQueue.maxQueueDepth`
kung ilang request ang maaaring manatili sa queue (hindi pa naidi-dispatch) para sa iisang
provider+koneksyon nang sabay-sabay. Kapag mayroon nang `maxQueueDepth` na
request ang queue, mabilis na tinatanggihan ang isang bagong request gamit ang typed na
`code: "RATE_LIMIT_QUEUE_FULL"` error **bago** pa man ito makarating sa `limiter.schedule()`
— kaya mababa ang gastos ng pagtanggi at nangyayari ito bago ang anumang downstream na
prompt-compression / translation na gawain para sa request na iyon. Default na `0` =
naka-disable, kaya napapanatili ang umiiral na gawi ng queue na walang limitasyon; limitado sa 0–100000.
I-override sa pamamagitan ng `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) o
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Ang admission check mismo ay isang pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) kaya
maaari itong i-unit test nang walang aktuwal na Bottleneck limiter.

> Ang RFC na nagbukas ng #6593 ay nagmungkahi rin ng isang `bypassCompressionOnRateLimit`
> flag. Ang pipeline na `open-sse/services/compression/` ng repo na ito ay para sa
> prompt/context compression sa papalabas na LLM request (`chatCore.ts`,
> sa bandang block na `resolveCompressionSettings`/`selectCompressionStrategy`),
> hindi para sa HTTP response compression sa mga nabuong 429 body — walang
> katugmang code path para sa isang literal na bypass flag. Ang hakbang na iyon ng prompt-compression
> ay kasalukuyan ding tumatakbo _bago_ ang `withRateLimit()` sa request pipeline, kaya
> ang muling pagsasaayos upang laktawan ito kapag may queue-full na pagtanggi ay isang hiwalay at mas malaking
> pagbabago kaysa sa saklaw ng issue na ito; sinadya itong **hindi** ipatupad
> dito at iniwan bilang follow-up kung sulit ang matitipid sa CPU kumpara sa
> panganib ng muling pagsasaayos.

---

## 6. Watchdog sa throughput ng mabagal na stream (#9709)

Tinutukoy ng opsyonal na guard na `resilienceSettings.streamRecovery.throughputWatchdog`
ang isang upstream na nagpapadala pa rin ng mga chunk ngunit gumagawa ng output ng assistant na mas mababa sa
naka-configure na rate ng kapaki-pakinabang na output. Sadyang naiiba ito sa idle timeout:
hindi nire-reset ng mga heartbeat at metadata ang alinmang timer at hindi itinuturing na progreso. Naiiba rin ito
sa hard attempt deadline (#9153), na nananatiling ganap na limitasyong pangkaligtasan
anuman ang kalidad ng output.

Nangangailangan ang watchdog ng panahon ng warm-up na sinusundan ng isang kumpletong rolling window bago
ito makapag-abort. Binibilang nito ang mga text delta mula sa mga event ng output ng Chat Completions at Responses API
(isang konserbatibong proxy ng byte ng UTF-8), binabalewala ang mga event na usage-only at walang laman, at
sinususpinde ang pagsusuri habang kasalukuyang pinoproseso ang mga event ng tool-call o reasoning. Naka-disable
ito bilang default at maaaring i-enable gamit ang `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; ang
window, warm-up, minimum na rate, at minimum na nasusukat na output ay nililimitahan ng
karaniwang normalization layer ng resilience-settings.

Kapag naka-enable, inilalapat lamang ang pag-abort ng watchdog sa aktibong upstream attempt. Bago
magkaroon ng anumang byte na nakikita ng client, maaaring muling buksan ng umiiral na same-account early-recovery path
ang attempt. Pagkatapos ng commit, hindi kailanman basta-basta nire-replay ang stream; tanging ang umiiral na
ligtas na kontrata ng pagpapatuloy sa gitna ng stream ang maaaring magdugtong ng suffix. Nananatiling
single-shot ang finalization, kaya hindi nadodoble ang usage accounting at pag-release ng semaphore.

---

## 7. Muling Pagtatakda ng Upstream Status (mga maling pagkakasaad na quota error)

**Saklaw:** isang upstream gateway na nag-uulat ng pansamantalang pagkaubos ng quota gamit ang maling HTTP status.

**Layunin:** iwasto ang mapanlinlang na status BAGO ang classification, upang makita ng mga downstream consumer (fallback engine, combo aggregation, at response na nakikita ng client) ang tunay na retryable na katangian ng failure.

Ipinahihiwatig ng ilang gateway ang PANSAMANTALANG pagkaubos ng quota gamit ang isang non-retryable na HTTP
status. Nagbabalik ang `agentrouter.org` ng `403` (minsan ay `400`) na may Chinese na body
(`用户额度不足` / `额度不足`) sa halip na karaniwang `429`. Itinuturing ng mga client gaya ng Claude
Code ang `403` bilang permanente at ina-abort ang session, at kung walang pagwawasto,
ika-classify ito ng fallback engine bilang `AUTH_ERROR` sa halip na isang quota
event.

**Implementasyon:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — isang
  listahan ng mga rule kada provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), na itinutugma sa pamamagitan ng `applyStatusRestatement()`.
- Call site: ang `providerFailure:` block sa `open-sse/handlers/chatCore.ts`
  (bandang line 3654), kaagad pagkatapos i-parse ng `parseUpstreamError()` ang isang upstream
  response na may error na HTTP status (`!providerResponse.ok`), at bago patakbuhin ang anumang
  classification, upang makita ng bawat downstream consumer ang naiwastong
  status. Ang mga error na naka-embed sa loob ng isang `200` SSE stream ay dumaraan sa hiwalay at
  mas huling stream-parsing path at **hindi** saklaw ng hook na ito sa kasalukuyan — isang
  kilalang limitasyon na hindi pa kinakailangan para sa maling status ng agentrouter (na
  lumilitaw bilang isang error na HTTP status).
- Pagiging kwalipikado para sa retry: kabilang ang `429` sa `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), kaya ang isang error na muling itinakda
  ay may tunay na retry window sa halip na lumitaw bilang isang hindi na magagamit na `403`.
- Ang synthetic na `60s` na `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ay ang ipinababatid lamang ng muling itinakdang response sa **client**; hindi ito mismo
  ang internal na tagal ng cooldown/lockout ng koneksyon — hiwalay itong pinamamahalaan
  ng anumang mekanismong aktuwal na humahawak sa muling itinakdang error
  (ang tumataas na backoff ng Connection Cooldown, §2, na may base na `3s` para sa mga
  provider na gumagamit ng API key; o Model Lockout, §3, para sa mga provider ng per-model-quota gaya ng
  agentrouter). Maaaring maging kwalipikado ang router na muling sumubok internally nang mas maaga
  kaysa sa 60s na window na ipinababatid nito sa client — sinasadyang allowance ito,
  hindi isang bug.

Ang mga permanenteng error (`无权访问模型` ng agentrouter — walang access sa model na ito) ay
HINDI KAILANMAN muling itinatakda: bina-veto ng `excludeMarkers` ang rule kahit tumugma ang `textMarkers`,
kaya napapanatili ng error ang orihinal nitong status at walang patuloy na sumusubok dito nang walang hanggan. Ang
katugmang provider classification rule
(`agentrouter-model-access-denied` sa `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, isang idineklarang base cooldown na `6h`) ay
sinusuri ng `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_bago_ ang generic na apikey-category na `FORBIDDEN` early-return, na nakadepende sa
`honorsRuleLockScope(provider)` (#10334 — kasalukuyang eksklusibo sa agentrouter sa pamamagitan ng
allowlist na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa
`providerErrorRules.ts`). Dumadaloy ang idineklarang 6h cooldown ng rule bilang
`fallbackResult.baseCooldownMs`, ngunit ipinapasa pa rin ito sa dati nang umiiral na
per-model-quota lockout path (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, na hindi binago ng #10334 maliban sa pinagmulan ng cooldown):
nililimitahan ito pababa sa `mlSettings.maxCooldownMs` ng operator
(default na `1_800_000ms` / 30min), tulad ng bawat iba pang model lockout, at ang
_persisted na dahilan ng lockout_ ay nananatiling ang dati nang naka-hardcode na `"forbidden"`,
hindi ang `"auth_error"` ng rule — ang tagal lamang ng cooldown ang sinusunod
end-to-end, hindi ang reason string. Nananatiling aktibo ang mismong koneksyon;
hindi naaapektuhan ang mga sibling model sa parehong koneksyon.

Ang mga muling itinakdang quota error (`额度不足`) ay tumutugma sa isang provider rule sa production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, walang sariling idineklarang cooldown — nalalapat ang
scaled backoff default ng persistence layer). Mula noong #10334, ang `scope` sa
`ProviderErrorRuleMatch` AY ginagamit nang end-to-end, ngunit **para lamang** sa mga provider na nasa
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist (`providerErrorRules.ts` —
sa kasalukuyan, `"agentrouter"` lamang, na ginagamitan ng gate sa pamamagitan ng `honorsRuleLockScope()`). Para sa lahat ng
iba pang provider, nananatiling pang-impormasyon lamang ang `scope`, gaya mismo noong bago ang #10334.
Inilalantad ng `checkFallbackError` ang scope ng tumugmang rule bilang
`fallbackResult.ruleScope`; ang `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ang pinagsasaluhang guard na kumukumpirmang
ang isang `ruleScope` ay tunay na ligtas kilalanin bilang isang signal na sumasaklaw sa buong connection at kusang bumabawi
(scope na `"connection"`, reason na `quota_exhausted`, hindi kailanman `permanent`,
at hindi kailanman `creditsExhausted` — isang depensa laban sa isang rule sa hinaharap na maaaring magpares ng scope na
`"connection"` sa isang permanenteng account state). Dalawang consumer ang tumatawag dito:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  sa halip na mapunta sa **per-model** lockout branch ng passthrough-provider
  (ang agentrouter ay `passthroughModels: true` → nagbabalik ang `hasPerModelQuota()` ng
  `true`), naglalapat ito ng **pansamantalang connection cooldown** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, at hindi kailanman ng terminal status
  (`credits_exhausted`/`banned`/`expired`) — upang kusang makabawi ang connection
  kapag lumipas na ang cooldown sa halip na mangailangan ng manu-manong credential reset.
  Nilalaktawan ito para sa mga connection na may `disableCooling: true` (#2997): ang opt-out na iyon
  ay hahantong sa per-model lockout sa halip (isang nakadokumentong trade-off —
  tingnan ang code comment sa itaas ng branch).
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): minamarkahan ng parehong guard ang
  connection sa in-memory na `exhaustedConnections` set, na may key na
  `${provider}:${connectionId}`. Nilalaktawan lamang nito ang isang natitirang SAME-REQUEST
  target na _mismong mayroon nang eksaktong `connectionId` na iyon_ sa sarili nitong
  target object (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` bago ang `exhaustedConnections` lookup) — ang isang simpleng
  model-list combo, kung saan walang sariling naka-pin na `connectionId` ang mga sibling target
  at nalulutas lamang ang isa sa bawat dispatch mula sa
  `X-OmniRoute-Selected-Connection-Id` header ng response, ay hindi kailanman tumutugma sa key na iyon. Para sa
  karaniwang kasong iyon, ang tunay na proteksyon laban sa muling paggamit ng isang natitirang leg sa
  account na ngayon lang naubusan ay HINDI ang Set na ito — ito ay ang persistence layer sa itaas
  (nasa hinaharap na ngayon ang `rateLimitedUntil` ng connection) kasama ang
  parehong guard na ito na pumipigil sa `transientRateLimitedProviders` para sa
  failure (tingnan ang "Dalawang-yugtong disenyo" at ang code comment sa
  `isAgentrouterConnectionQuotaScope` branch sa `targetExhaustion.ts`): dahil
  hindi namarkahan ang Set na iyon, HINDI umaandar ang `allowRateLimitedConnection` force-allow
  ng `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) para sa
  mga natitirang leg ng provider, kaya normal na sinusunod ang `rateLimitedUntil`
  filter ng credential selection (`src/sse/services/auth.ts:1238`) at ang isang
  natitirang leg ay pipili ng ibang agentrouter connection na maaari pa ring gamitin
  o mabibigo dahil walang available na credential — hindi nito sapilitang
  muling gagamitin ang connection na pinalamig ng branch na ito.

### Dalawang-yugtong disenyo: muling pagtatakda ng status, pagkatapos ay classification

Ang muling pagtatakda ng status (`upstreamStatusRestatement.ts`) at ang mga provider
classification rule (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ay magkahiwalay na registry na parehong gumagamit ng provider id
at mga text marker bilang key, ngunit tumatakbo ang mga ito sa magkaibang lugar at nagsisilbi sa magkaibang
layunin: maagang isinusulat muli ng restatement ang HTTP status sa `chatCore.ts`;
pinipili naman ng mga classification rule ang fallback na `reason` at lock na `scope`
(`model` / `provider` / `connection`) sa loob ng `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Nakikita lamang ng mga classification rule ang buong **text** ng error (na kinakailangan upang tumugma sa mga body
marker gaya ng `额度不足`) para sa mga provider na nakalista sa `FULL_TEXT_RULE_PROVIDERS`
allowlist sa `providerErrorRules.ts` — sa kasalukuyan, `"agentrouter"` lamang. Para sa
lahat ng iba pang provider sa **built-in catalog**, ipinapasa ng `checkFallbackError` sa
`getProviderErrorRuleMatch` ang structured error lamang (`{code, type}`), na
sapat para sa mga rule na nakabatay sa header/status/code ngunit hindi nakakakita ng mga body-text marker.
Isinasagawa ng helper na `resolveRuleMatchBody()` ang pagpiling ito: buong error text
para sa mga allowlisted na provider, at ang structured error para sa iba. Ang pagdaragdag ng isang
**built-in** provider sa `FULL_TEXT_RULE_PROVIDERS` ay isang tahasang per-provider
opt-in — umiiral ito upang manatiling eksaktong hindi nagbabago, byte-for-byte, ang default path
para sa bawat provider na wala sa listahan.

Ang `scope` ng isang rule (`model` / `provider` / `connection`) ay hiwalay na opt-in
mula sa `FULL_TEXT_RULE_PROVIDERS`: inilalantad lamang ito ng `checkFallbackError` bilang
`fallbackResult.ruleScope`, at kinikilala lamang ito ng mga downstream consumer bilang
higit pa sa isang pang-impormasyong label para sa mga provider na nasa
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist sa parehong file (`gated via
honorsRuleLockScope()` — sa kasalukuyan, `"agentrouter"` lamang). Tingnan ang "Mga muling itinakdang quota
error" sa itaas para sa aktuwal na ginagawa ng isang tugmang may `scope: "connection"` kapag ang isang
provider ay nasa allowlist na iyon.

**#11104 — nilalampasan ng mga panuntunang idineklara ng operator ang parehong allowlist.** Maaaring
magdeklara ang isang operator ng panuntunan para sa bawat provider sa runtime sa pamamagitan ng `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
nang hindi ine-edit ang file na ito. Kung ilalagay ang isang panuntunan ng operator sa likod ng
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — mga allowlist
na nilalayong protektahan ang **default** na gawi ng mga built-in na panuntunan sa catalog — magiging
walang bisa ang mekanismo ng settings para sa bawat provider maliban sa mga nakalista na
roon, dahil ang pagdedeklara ng panuntunan ay tahasang opt-in na ng operator.
Parehong sinusuri muna ng `resolveRuleMatchBody()` at `honorsRuleLockScope()` ang
`hasOperatorRuleForProvider()`: nakukuha ng provider na may panuntunan ng operator
ang raw na teksto ng error at iginagalang ang idineklara nitong `scope`, lumilitaw man
din ito sa alinmang allowlist o hindi.

**Kilalang kakulangan — hindi kailanman kinokonsulta ang `providerRuleRegistry` para sa HTTP 400.**
Ganap na inuuri ng `BAD_REQUEST` branch ng `checkFallbackError` ang status 400
sa pamamagitan ng sarili nitong mga pattern array (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, atbp. sa `accountFallback.ts`) at nagbabalik bago
maabot ang `configuredRule`/`getProviderErrorRuleMatch` branch sa itaas nito.
Ang built-in na panuntunan sa catalog (o panuntunan ng operator) na may `status: 400` ay
wasto ayon sa syntax ngunit hindi kailanman gagana. Walang umiiral na panuntunang tumutukoy sa 400 ngayon,
kaya walang naaapektuhan sa production — ngunit para sa isang panuntunan sa 400 sa hinaharap, kailangan
munang baguhin ang branch na ito, na mas malaking pagbabago kaysa sa pagdaragdag ng isang panuntunan (muli
nitong inuuri ang 400 para sa bawat provider na umaasa na sa gawi ng pattern array)
at wala ito sa saklaw ng pagdaragdag ng panuntunan para sa iisang provider.

### Pagdaragdag ng bagong gateway na maling nagsasaad ng quota

1. Magrehistro ng isang rule array sa `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Panatilihing partikular sa
   provider ang `textMarkers`; huwag kailanman muling gumamit ng mga generic na pariralang Ingles na sumasalungat sa
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opsyonal na magrehistro ng mga panuntunan sa pag-uuri sa
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) upang piliin
   ang tamang lock scope (`connection` para sa quota ng buong account, `model` para sa
   mga error ng bawat model). Magkakabisa lamang ang hakbang na ito sa production para sa
   mga provider na ang mga panuntunan ay nangangailangan ng buong teksto ng error (mga marker sa body): idagdag ang
   provider id sa `FULL_TEXT_RULE_PROVIDERS` sa parehong file — kung hindi,
   ang ibinibigay lamang ng `checkFallbackError` sa panuntunan ay ang structured na
   `{code, type}` error at hindi kailanman tutugma sa live traffic ang isang panuntunan para sa body text.
   Hindi kailangan ng opt-in na ito ang mga panuntunang tumutugma lamang batay sa `status`/`headers` (tulad ng sa Opencode o
   Minimax). Bukod dito, kung nagdedeklara ang panuntunan ng
   `scope: "connection"` at ang layunin ay isang aktuwal na cooldown para sa buong connection
   kasama ang paglaktaw sa combo para sa parehong request (hindi lamang isang label na nagbibigay-impormasyon), idagdag ang
   provider id sa `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa parehong file — ito
   ang kumokontrol sa paggamit na katulad ng `isAgentrouterConnectionQuotaScope()` sa
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) at
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); kung wala ito, patuloy pa ring
   dumadaloy ang `scope` sa `fallbackResult.ruleScope` ngunit walang kumikilos batay rito.
3. Magdagdag ng mga unit test na ginagaya ang `tests/unit/upstream-status-restatement.test.ts`
   at `tests/unit/agentrouter-error-rules.test.ts` (kabilang ang mga guard na
   not-permanent / not-creditsExhausted, at — kung kailangan ng provider ang
   allowlist — isang test na nagpapatunay na ibinabalik ng `resolveRuleMatchBody()` ang
   buong teksto para lamang sa provider na iyon).

Walang kailangang baguhin sa `chatCore.ts`, `classifyError`, o combo.

#### Lock na nakabatay sa egress bucket (#10880)

Ang mga provider sa `EGRESS_BUCKETED_LOCK_PROVIDERS` (pamilya ng opencode) ay itinuturing
na upstream na nakabatay sa IP bucket (nakabatay sa IP ang libreng tier ng opencode, hindi
sa account — tingnan ang #9611): ang status-429 na inuri bilang `quota_exhausted`
**o** `rate_limit_exceeded` ay naglalagay sa cooldown ng bawat connection sa pamilyang nasa allowlist
na ang huling nalalamang egress IP ay tumutugma sa sa pumalyang connection, bago
masubukan ang mga ito ng rotation
— upang maiwasan ang N-1 upstream call na tiyak na mabibigo (kaparehong anyo ng #10460/#10525).
Sinadyang isama ang `rate_limit_exceeded`: sa path na `markAccountUnavailable`,
hindi kailanman tumutugma ang mga panuntunang partikular sa opencode (walang headers/body na ipinapasa sa
`checkFallbackError`, wala ang opencode sa `FULL_TEXT_RULE_PROVIDERS`), kaya ang isang 429
na ang body ay naglalaman ng teksto ng subscription quota ("monthly usage limit
reached") ay inuuri bilang `quota_exhausted` ng fallback para sa teksto ng quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) bago pa
maabot ang panuntunang `status_429` — samantalang ang isang 429 na walang teksto ng quota (karaniwang
rate limiting) ay inuuri sa pamamagitan ng panuntunang `status_429` bilang `rate_limit_exceeded`
at inilalagay pa rin sa cooldown ang pamilya ng IP. Para sa isang provider na nasa allowlist, ang rate limit na
nakabatay sa IP bucket ay kaparehong signal ng naubos na quota. Mga tapat na limitasyon:

- **Pinakamahusay na pagsisikap**: nire-resolve ng lock ang huling nalalamang `egress_ip`
  ng koneksyon mula sa `proxy_logs` (24h na window, synchronous, walang cache).
  Kapag cold cache (hindi kailanman na-probe ang egress IP) o walang row → iko-cool
  pa rin ng branch ang pumalyang koneksyon (itatala gaya ng ginagawa ngayon),
  ngunit walang sibling na ila-lock.
- **Hindi kailanman terminal**: ang cooldown ay isang nagre-renew na quota window
  (`testStatus: "unavailable"`); hindi kailanman nagmumula ang permanenteng state
  sa isang IP-level na signal. Ganap na nilalaktawan ng mga koneksyong
  `disableCooling` ang branch.
- **Nagbabago ang granularity ng lock para sa allowlisted family**: pagbabago ito
  sa scope, hindi lamang isang sibling optimization. Ang opencode ay isang
  `passthroughModels` provider, kaya bago ang branch na ito, ang 429 ay
  nagdudulot ng per-MODEL na lockout; ngayon ay nagdudulot na ito ng cooldown
  ng koneksyon — kabilang ang para sa operator na nagpapatakbo ng iisang
  koneksyon na wala ni isang sibling. Iyon ang granularity na idinedeklara nang
  tama ng talahanayan ng mga panuntunan ng opencode (`scope: "connection"`,
  `providerErrorRules.ts`), na hindi pa kailanman nasunod dahil wala ang
  opencode sa `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Isinusulat mismo ng branch
  ang cooldown + `backoffLevel` ng pumalyang koneksyon, na ginagaya ang
  connection-scoped na agentrouter branch, at pagkatapos ay nagre-return —
  hindi kailanman naaabot ang per-model na block at ang generic na path sa
  ibaba.
- **Kasama ang combo**: tulad ng agentrouter branch, sadyang binabalewala ng
  scope ang `persistUnavailableState`/`isCombo` downgrade na inilalapat ng
  combo caller sa isang 429. Ang per-model na lockout ay hindi mas mahinang
  anyo ng scope na ito; maling unit ito: wala itong sinasabi tungkol sa
  naubos na IP, kaya patuloy na magsasayang ang combo rotation ng isang
  tiyak na papalyang tawag sa bawat sibling.
- **Kaligtasan ng sibling**: hindi kailanman ino-overwrite ang sibling na
  terminal na (banned/credits_exhausted) o nasa mas mahabang cooldown na.
- **Eksklusibong allowlist**: ang pagpapalawak sa
  `EGRESS_BUCKETED_LOCK_PROVIDERS` ay isang tahasang pasya ng owner; walang
  generic na wiring (pattern #10334/#10419). Ginagamit ng sibling query ang
  mismong allowlist na iyon sa halip na ulitin ito bilang SQL literal, kaya
  nananatiling isang linyang pagbabago ang pagpapalawak dito.
- **Pag-rotate ng egress IP, sa parehong direksyon**: higit na mas malawak ang
  lookup window (24h) kaysa sa TTL ng egress-IP cache (5 min), kaya history,
  hindi kasalukuyang state, ang "huling nalalamang IP". Kung nag-rotate ang
  proxy ng isang koneksyon sa loob ng window, maaaring **hindi matamaan** ng
  lock ang isang tunay na shared IP (ang naka-record na IP ay ang bago at
  hindi pa ubos na IP) — at sa kabaligtaran, maaari nitong **i-cool ang isang
  sibling na mula noon ay nag-rotate na palayo** sa naubos na IP. Isang
  cooldown window ang magiging kapalit ng ikalawang kaso para sa sibling na
  iyon; tinatanggap ang dalawang ito bilang mga best-effort na limitasyon ng
  history-based na lookup.
- **Gastos**: dalawang bounded scan ng `proxy_logs` (sinala ayon sa window sa
  pamamagitan ng `idx_pl_timestamp`), sa dalas lamang ng 429. Walang bagong
  index (migration 134 YAGNI). Sinukat sa isang kopya ng real-traffic DB na
  may katamtamang laki; ang isang high-throughput na instance ay may
  proporsyonal na mas maraming row sa parehong window.

---

## Iba Pang Feature ng Katatagan

- **19 na estratehiya sa pagruruta** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — tingnan ang [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Pagrurutang reset-aware** (v3.8.0) — inuuna ang mga koneksyon batay sa oras ng pag-reset ng quota.
- **Pagde-degrade ng background mode** — Ang Responses API `background: true` ay ginagawang sync na may babala.
- **Dinamikong pagtukoy sa limitasyon ng tool** — umaatras muna sa mga provider kapag naabot ang mga limitasyon sa bilang ng tool.
- **Pang-emergency na fallback** — kinokontrol ng `OMNIROUTE_EMERGENCY_FALLBACK`; maaaring i-override ito ng mga operator mula sa pahina ng Feature Flags nang hindi nagre-restart.

---

## Pag-debug

- Tumutugon ang weighted combo ng `503 all_targets_cooling_down` (nakatakda ang `Retry-After`, at inililista ng `diagnostics.excluded` ang bawat target na may `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → naka-configure at nakakonekta ang pool, ngunit hindi lang isinasama ang bawat target dahil sa resilience timer; tinutukoy ng babalang `[COMBO] Weighted selection: every target excluded before dispatch — …` ang mga dahilan at natitirang mga segundo. Ang `404 no_executable_targets` mula sa parehong combo ay nangangahulugang walang resilience timer na kasangkot (walang mapapatakbo, o nabigo ang availability probe para sa bawat account). Naka-built in sa `open-sse/services/combo/pinRecovery.ts` mula sa mga exclusion na nakolekta sa `targetResolution.ts`.
- Nilaktawan ang lahat ng key para sa isang provider → suriin ang parehong estado ng circuit breaker AT ang `rateLimitedUntil`/`testStatus` ng bawat koneksyon.
- Permanenteng hindi isinama ang provider pagkatapos ng reset window → binabasa ng code ang raw na `state` sa halip na `getStatus()`/`canExecute()`.
- Nabigo ang isang key, ngunit dapat gumana ang iba → mas piliin ang cooldown ng koneksyon kaysa sa circuit breaker.
- Isang model lang ang nabigo → mas piliin ang model lockout kaysa sa cooldown ng koneksyon.
- Dapat kusang makabawi ang estado ngunit hindi ito nangyayari → tingnan kung may timestamp sa hinaharap + read path na nagre-refresh sa nag-expire na estado. Nangangailangan ng mga manu-manong pagbabago ang mga permanenteng status.

---

## TLS Fingerprinting at Stealth

Hiwalay na nakadokumento ang stealth na partikular sa provider (JA3/JA4, CCH, obfuscation) — tingnan ang `docs/security/STEALTH_GUIDE.md` (git; hindi kino-compile sa `/docs`).

---

## Pagsubok sa Katatagan (Phase 8 · Block C)

Bukod sa mga unit test para sa lohika ng katatagan, sinusubok ng tatlong test ang runtime sa ilalim ng
mga tunay na kondisyon ng stress/pagkabigo (lahat ay integration/nightly — walang humaharang sa mga PR):

| Test        | Ano                                                                                                                                                                                                               | Pagpapatakbo                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Nag-i-inject ang fake-upstream node ng tunay na latency/reset/timeout/503; pinapatunayang nagbubukas/nakakabawi ang circuit breaker at inuuri ng `checkFallbackError` ang 503 bilang fallback na maaaring mabawi. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 stream bawat `createSSEStream` sa ilalim ng `--expose-gc`; nabibigo kung lumaki ang heap nang lampas sa hangganan (OOM guard #3069).                                                                         | `npm run test:heap`                      |
| k6 soak     | Tuloy-tuloy na load laban sa `/api/monitoring/health`; mga threshold ng p95/error.                                                                                                                                | `k6 run tests/load/k6-soak.js` (nightly) |

Inoorkestra ng `.github/workflows/nightly-resilience.yml` (cron + dispatch). Sa
default na `test:integration`, kusang nilalaktawan ang chaos at heap (kung walang `RUN_CHAOS_INT`/`--expose-gc`).

---

## Tingnan Din

- [Gabay sa Arkitektura](./ARCHITECTURE.md) — Arkitektura ng system at mga internal
- [Gabay ng User](../guides/USER_GUIDE.md) — Mga provider, combo, at integrasyon ng CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — 16-factor na pagmamarka at mga mode pack
