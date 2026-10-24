# Resilience Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute មានយន្តការភាពធន់ (resilience) បីយ៉ាងដែលខុសគ្នា ប៉ុន្តែពាក់ព័ន្ធគ្នា។ នីមួយៗមានវិសាលភាព និងគោលបំណងផ្សេងគ្នា។ រក្សាពួកវាឱ្យដាច់ដោយឡែកពីគ្នា នៅពេល debug អាកប្បកិរិយា routing ។

![ម៉ូដែលភាពធន់ 3 ស្រទាប់](../diagrams/exported/resilience-3layers.svg)

> ប្រភព: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker កម្រិត Provider

**វិសាលភាព:** ទាំងមូល provider (ឧ. `glm`, `openai`, `anthropic`)។

**គោលបំណង:** បញ្ឈប់ការផ្ញើ traffic ទៅកាន់ provider ដែលបរាជ័យជាប់ៗគ្នានៅកម្រិត upstream/service ។

**ការអនុវត្ត:**

- ថ្នាក់សំខាន់: `src/shared/utils/circuitBreaker.ts`
- ការភ្ជាប់ (wiring): `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ស្ថានភាព: `GET /api/monitoring/health`
- API កំណត់ឡើងវិញ: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- តារាង DB: `domain_circuit_breakers`

**ស្ថានភាព:**

- `CLOSED` — អនុញ្ញាត traffic ធម្មតា
- `DEGRADED` — នៅតែអនុញ្ញាត traffic ប៉ុន្តែកំពុងតាមដានការបរាជ័យរបស់ provider ដែលកើនឡើង; ត្រឡប់ទៅ `CLOSED` នៅពេលមានការជោគជ័យគ្រប់គ្រាន់ នៅពេល connection test ត្រឹមត្រូវ ឬក្រោយពីការរង់ចាំ `OPEN` យូរបំផុតសម្រាប់ប្រភេទបរាជ័យចុងក្រោយ (តម្លៃ `cooldownByKind` របស់វា បើមិនមាន `resetTimeout` × `maxBackoffMultiplier` យ៉ាងតិចមួយ cooldown) ដោយគ្មានការបរាជ័យថ្មី
- `OPEN` — provider ត្រូវបានបិទជាបណ្តោះអាសន្ន; combo routing រំលងវា
- `HALF_OPEN` — reset timeout ផុតកំណត់ហើយ; អនុញ្ញាតសំណើ probe

**តម្លៃលំនាំដើមដែលកំណត់បាន (`open-sse/config/constants.ts`, បង្ហាញក្នុង Dashboard → Settings → Resilience):**

| ថ្នាក់  | ចូល DEGRADED នៅ | ចូល OPEN នៅ  | Reset timeout |
| ------- | --------------- | ------------ | ------------- |
| OAuth   | បរាជ័យ 5 ដង     | បរាជ័យ 8 ដង  | 60s           |
| API-key | បរាជ័យ 7 ដង     | បរាជ័យ 12 ដង | 30s           |
| Local   | គណនាតាម         | បរាជ័យ 2 ដង  | 15s           |

`degradationThreshold` គ្រប់គ្រងពេលដែល provider ចូល `DEGRADED`; `failureThreshold` គ្រប់គ្រងពេលដែលវា open ហើយត្រូវបានរំលង។ Profile របស់ Local provider មិនទាន់បានបង្ហាញនៅលើទំព័រការកំណត់ Resilience នៅឡើយទេ។

**កូដ trip:** តែ status កម្រិត provider `[408, 500, 502, 503, 504]` ប៉ុណ្ណោះ។ កុំ trip ចំពោះកំហុសកម្រិតគណនី (ភាគច្រើន 401/403/429 — ពួកនោះស្ថិតក្រោម cooldown ឬ lockout)។

**ការស្តារឡើងវិញបែប lazy:** នៅពេល `OPEN` ផុតកំណត់ `getStatus()`, `canExecute()`, `getRetryAfterMs()` refresh ស្ថានភាពទៅ `HALF_OPEN` ។ ការអានដដែលទាំងនេះ (និងការបរាជ័យបន្ទាប់) បន្សាប `DEGRADED` ដែល stale ឱ្យត្រឡប់ទៅ `CLOSED` វិញ។ មិនត្រូវការ background timer ទេ។

---

### Provider Cooldown សកលជាជម្រើស opt-in (window gate)

ស្រទាប់ទីបួន ជា **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, លំនាំដើម **បិទ**) រក្សាទុកអង្គចងចាំឆ្លងសំណើ (cross-request) នៃ provider ដែលបរាជ័យ ក្នុង
`open-sse/services/providerCooldownTracker.ts` ដែលការកំណត់គោលដៅ combo (combo target resolution) យកមកពិគ្រោះ ដូច្នេះសំណើ combo ជាប់ៗគ្នាឈប់ walk ឡើងវិញលើ provider ដែលទើបតែបរាជ័យ។ ធាតុកម្រិត provider គោរពតាម window gate របស់ `PROVIDER_PROFILES`:

| Profile | trip ក្រោយពេល (`providerFailureThreshold`) | ក្នុងរយៈពេល (`providerFailureWindowMs`) | cool រយៈពេល (`providerCooldownMs`) |
| ------- | -----------------------------------------: | --------------------------------------: | ---------------------------------: |
| OAuth   |                                       `10` |                                 `15min` |                             `5min` |
| API key |                                       `15` |                                 `30min` |                            `10min` |

ក្រោម threshold នេះ provider **មិន** ត្រូវបានចាត់ទុកថាកំពុងស្ថិតក្នុង cooldown ទេ; ការជោគជ័យមួយសម្អាត window ។ ធាតុកម្រិត connection (`provider:connectionId`) រក្សា backoff អិចស្បូណង់ស្យែល `minRetryCooldownMs → maxRetryCooldownMs` ជំនួសវិញ។ ការ override:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}` ។
ការការពារ regression: `tests/unit/provider-cooldown-window-gate.test.ts` ។

## ២. Connection Cooldown

**វិសាលភាព (Scope):** ការតភ្ជាប់/គណនី/key របស់ provider តែមួយ។

**គោលបំណង:** រំលង key ដែលមានបញ្ហាមួយ ខណៈដែលការតភ្ជាប់ផ្សេងទៀតសម្រាប់ provider ដដែលនៅតែបន្តបម្រើសេវា។

**ការអនុវត្ត (Implementation):**

- សម្គាល់ថាមិនអាចប្រើបាន: `src/sse/services/auth.ts::markAccountUnavailable()`
- ការជ្រើសរើស: `getProviderCredentials*` នៅក្នុងឯកសារដដែល
- ការគណនា cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ការកំណត់: `src/lib/resilience/settings.ts`

**Fields សម្រាប់ការតភ្ជាប់នីមួយៗ:**

- `rateLimitedUntil` — timestamp ដែល cooldown ផុតកំណត់
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ចំនួនរាប់ exponential backoff

**Cooldowns លំនាំដើម:**

- OAuth base: 5s
- API-key base: 3s
- API-key 429: ផ្តល់អាទិភាពដល់ `Retry-After`/reset headers/reset text ដែលអាច parse បានពី upstream
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**ការការពារ anti-thundering-herd:** ការពារកុំឱ្យ failures ដែលកើតឡើងក្នុងពេលដំណាលគ្នា ពង្រីក cooldown លើសកំណត់ ឬបង្កើន `backoffLevel` ទ្វេដង។

**Concurrency-limit 429s មិនឡើងតាម backoff ladder ទេ។** `429` ដែល body របស់វារាយការណ៍ពី
concurrency limit ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) មានន័យថាគណនីនៅមានសុខភាពល្អ ប៉ុន្តែកំពុងរវល់។
`checkFallbackError()` ត្រឡប់ហេតុផល `concurrency_limited`: fail over ទៅការតភ្ជាប់បន្ទាប់ភ្លាមៗ ដាក់
cooldown ការតភ្ជាប់នេះជាមួយ `CONCURRENCY_LIMIT_COOLDOWN_MS` ថេរ (1s) ឬ
upstream retry hint រក្សា `backoffLevel` ឱ្យនៅដដែល ហើយកំណត់ `skipProviderBreaker`។
Quota body ដែលច្បាស់លាស់នៅតែឈ្នះ ដូច្នេះ body ដែលក៏ត្រូវនឹង quota pattern ផងដែរ នៅតែជា quota
verdict។ ការរកឃើញ: `looksLikeConcurrencyLimit()` នៅក្នុង `src/shared/utils/classify429.ts`។
verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`។ `classify429()` (`FailureKind` របស់
breaker) មិនផ្លាស់ប្តូរ ហើយនៅតែអាន `rate_limit` សម្រាប់ body ទាំងនេះ។

**Stream content stalls មិនដាក់ cooldown គណនីទេ។** នៅពេលដែល content-stall watchdog
(`open-sse/utils/streamHandler.ts`) បោះបង់ stream ដែលមិនបានផ្ញើ model output ណាមួយក្នុង
ពេលវេលាកំណត់ `markAccountUnavailable()` កត់ត្រា error នៅលើការតភ្ជាប់ ប៉ុន្តែមិនកំណត់
cooldown ទេ: stall នោះជារបស់ request នោះតែម្តង ជារឿយៗជា reasoning turn វែងដែលមិនទាន់មាន
output នៅឡើយ។ អ្នកប្រតិបត្តិការអាចជ្រើសរើសបើកវិញជាមួយ `resilienceSettings.streamStallCooldown.enabled`
(លំនាំដើម `false`)។

**Reasoning frames ចាប់ផ្តើម content-stall budget ឡើងវិញ។** ម៉ូដែល reasoning អាចគិតជា
នាទីមុនពេល token ដំបូងដែលអាចមើលឃើញ: Claude ផ្ញើ stream `thinking_delta` frames ដែល
thinking text អាចទទេ ហើយ Responses API ផ្ញើ stream reasoning item មួយបន្ទាប់ពី
មួយទៀត។ `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ស្គាល់
frames ទាំងនេះ ហើយ watchdog ចាប់ផ្តើម budget របស់វាឡើងវិញនៅលើ frame នីមួយៗ ជំនួសឱ្យការបោះបង់
turn នោះ។ ពួកវានៅតែមិនមែនជា model output ដូច្នេះ turn ដែលបញ្ចប់ដោយមានតែ reasoning នៅតែ
ត្រូវបានរាយការណ៍ថាទទេ ហើយ turn ដែលឈប់ reasoning ហើយផ្ញើតែ heartbeats នៅតែបង្កឱ្យ
watchdog ធ្វើការ។

Binary `reasoningContentEvent` frames របស់ Kiro ដែលមាន signature មិនទទេ រក្សា
សកម្មភាព reasoning នេះឆ្លងកាត់ executor ជា `reasoning_content` delta ទទេ។ Signature នោះ
មិនត្រូវបាន forward ទេ។ Metadata, frames មិនពេញលេញ និង signatures ទទេ មិនចាប់ផ្តើម
content budget ឡើងវិញទេ។ active-stream timeout ឯករាជ្យ និង client cancellation នៅតែ
មានអនុភាព (`open-sse/executors/kiro/reasoning.ts`)។

**ស្ថានភាពចុងក្រោយ (Terminal states — មិនមែនជា cooldowns):**

- `banned` — កំណត់ដោយការរកឃើញ banned-keyword / account-ban (សូមមើល [BAN_DETECTION](../security/BAN_DETECTION.md)) និងដោយការបដិសេធ per-request ពី upstream បីដងជាប់គ្នា (`request_rejected` ឧ. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ការបដិសេធតែម្តងគ្រាន់តែដាក់ cooldown ការតភ្ជាប់ប៉ុណ្ណោះ
- `expired` (ប្តូរទៅជាស្ថានភាពចុងក្រោយបន្ទាប់ពីការព្យាយាមម្តងទៀតដែលមានដែនកំណត់ — `EXPIRED_RETRY_MAX = 3` ជាមួយ exponential backoff — ដូច្នេះ OAuth errors បណ្តោះអាសន្នអាចជាដោយខ្លួនឯងបាន មុនពេលគណនីត្រូវបានបិទជាអចិន្ត្រៃយ៍)
- `credits_exhausted`

ស្ថានភាពទាំងនេះនៅរហូតដល់ credentials ផ្លាស់ប្តូរ ឬអ្នកប្រតិបត្តិការ reset ពួកវា។ កុំសរសេរជាន់ស្ថានភាពចុងក្រោយដោយស្ថានភាព cooldown បណ្តោះអាសន្ន។

**Lazy recovery:** នៅពេលដែល `rateLimitedUntil` កន្លងផុតទៅ ការតភ្ជាប់ក្លាយជាមានសិទ្ធិឡើងវិញ។ នៅពេលប្រើប្រាស់ដោយជោគជ័យ `clearAccountError()` សម្អាត error fields ទាំងអស់។

### Claude OAuth usage wall: lower-priority lane + session-limit reset

**វិសាលភាព:** ការតភ្ជាប់ Claude subscription (OAuth) មួយ។ លក្ខណៈពិសេសទាំងពីរគឺ **opt-in ក្នុង
ការតភ្ជាប់នីមួយៗ** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` នៅក្នុង
`providerSpecificData` ទាំងពីរមានលំនាំដើមបិទ) ហើយឆ្លុះបញ្ចាំងពី commands `/low-priority` និង
`/limit-reset` របស់ Claude Code (wire contract ដែលបានចាប់យកពី Claude Code 2.1.263)។

**ការអនុវត្ត:**

- State machine + response classification: `open-sse/services/claudeLowPriority.ts`
- Reset status/claim client: `open-sse/services/claudeLimitReset.ts`
- Executor hook (header injection + same-account retry): `open-sse/executors/base.ts::execute()`
- Opt-in persistence: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** 5-hour usage wall — `429` ដែល headers របស់វាមាន
`anthropic-ratelimit-unified-status: rejected` ហើយនៅពេលគណនីមានសិទ្ធិ
`anthropic-ratelimit-unified-slow-offer: treatment`។ គ្មានអ្វីត្រូវបានផ្ញើមុនពេល wall
429 ដំបូងនោះទេ។ burst 429 ដែលគ្មាន unified headers ឆ្លងកាត់ផ្លូវ cooldown ធម្មតា។

**Lower-priority lane** (`lowPriorityMode`):

- នៅពេលជួប wall 429 executor ទទួលយកការផ្តល់ជូន ហើយព្យាយាមម្តងទៀតភ្លាមៗជាមួយគណនី**ដដែល** ដោយប្រើ `anthropic-usage-limit: slow`; lane នៅតែសកម្មរហូតដល់ `anthropic-ratelimit-unified-reset` ដែលបានប្រកាស (+60s grace) ហើយរាល់សំណើនៅក្នុងរយៈពេលនោះសុទ្ធតែមាន header នោះ។ 429 ដែលត្រូវបានចាប់យកមិនដែលទៅដល់ `handleChatCore` ទេ ដូច្នេហការតភ្ជាប់ **មិន** ត្រូវបានដាក់ក្នុង cooldown ហើយក៏មិនត្រូវបានបង្វែរចេញដែរ។
- `anthropic-ratelimit-unified-slow-status` នៅលើការឆ្លើយតបពេលក្រោយៗ៖ `active` / `not_needed` រក្សា lane ទុក; `slot_busy` (429) ឬ `529` រង់ចាំតាម `anthropic-ratelimit-unified-slow-retry-after` របស់ server (លំនាំដើម 20s, clamp 5–600s, ±30% jitter) រួចព្យាយាមម្តងទៀត ដោយមានដែនកំណត់ពី `anthropic-ratelimit-unified-slow-max-wait` (លំនាំដើម 20 នាទី, clamp 1 នាទី–6 ម៉ោង) — លើសពីនោះ lane បញ្ចប់ ហើយ cool-off រយៈពេល 10 នាទីរារាំងការទទួលយកឡើងវិញ។ ការរង់ចាំក៏ត្រូវបានកំណត់បន្ថែមដោយពេលវេលាដែលនៅសល់នៃ timeout ចាប់ផ្តើម upstream ផ្ទាល់របស់សំណើ (`resolveFetchStartTimeout`, 10 នាទីជាលំនាំដើម) ដកនឹង margin 5 វិនាទី៖ បើគ្មានការកំណត់នោះទេ max-wait លំនាំដើម 20 នាទីនឹងរស់នៅលើសអាយុកាលរបស់សំណើ ហើយការ sleep នឹងត្រូវបានបោះបង់កណ្តាលការរង់ចាំ បង្ហាញ `TimeoutError` ជំនួសឱ្យការបញ្ចប់ `max_wait` យ៉ាងស្រួលបួល + cool-off។
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ការ rollover របស់ 5h-window ឬ `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ដែលបញ្ចប់វាជា `extra_usage` លើស្ថានភាពណាមួយ ព្រោះ overage ដែលបង់ប្រាក់ឥឡូវនេះគ្របដណ្តប់ wall) បញ្ចប់ lane; បន្ទាប់មកការឆ្លើយតបហូរទៅផ្លូវ cooldown ធម្មតា។ `budget_exhausted` ត្រូវបានចងចាំរហូតដល់ការ reset ថវិកាដែលបានប្រកាស (≤ 8 ថ្ងៃ)។
- ការពិនិត្យ wall ដំណើរការបន្ទាប់ពីការព្យាយាមម្តងទៀត intra-attempt ដែលដឹកនាំដោយ 400 របស់ executor ផ្ទាល់ (ការកែសម្រួល context, thinking/effort clamps, param auto-learn) ដូច្នេហ wall 429 ដែលបង្ហាញខ្លួនតែនៅលើការព្យាយាមម្តងទៀតមួយក្នុងចំណោមទាំងនោះនៅតែត្រូវបានចាប់យក ជំនួសឱ្យការទៅដល់ផ្លូវ cooldown។
- ស្ថានភាពគឺនៅក្នុង memory ក្នុងមួយការតភ្ជាប់ (ការ restart មានតម្លៃ wall 429 បន្ថែមមួយដើម្បីទទួលយកឡើងវិញ)។

**Session-limit reset** (`autoLimitReset`, ត្រូវបានសាកល្បងមុន lane នៅពេលទាំងពីរបើក):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → block `juniper_tide`; នៅពេល `arm: "reset"` និង `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ជាមួយ `{ "program": "juniper_tide" }` (organization UUID ពី `providerSpecificData.organizationUUID`, bootstrap fallback)។
- `result: reset|not_limited` → សំណើត្រូវបានព្យាយាមម្តងទៀតនៅល្បឿនពេញលេញ (គ្មាន slow header)។ `already_used` / `not_offered` ចងចាំ `next_available_at` (លំនាំដើមមួយសប្តាហ៍); ការបរាជ័យណាមួយ back off 15 នាទី។ ការ reset គឺម្តងក្នុងមួយសប្តាហ៍ ហើយនៅតែរាប់បញ្ចូលក្នុងដែនកំណត់ប្រចាំសប្តាហ៍។

ការការពារ regression៖ `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`។

### Session affinity (#7274)

**វិសាលភាព៖** client session មួយ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) ជាប់ជាមួយការតភ្ជាប់មួយ សម្រាប់ provider **ណាមួយ**។

**គោលបំណង៖** រក្សា agent ពហុជុំ (Claude Code, aider, custom agents) ឱ្យនៅលើគណនីដដែលនៅទូទាំងសំណើ ដើម្បីកាត់បន្ថយការបាត់បង់ context ឆ្លងគណនី និង cold-start 429 ដែលកើតម្តងហើយម្តងទៀតនៅលើ provider ដែលមានស្ថានភាព session ក្នុងមួយគណនី។

**ការអនុវត្ត៖**

- ការដោះស្រាយ TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ការជ្រើសរើស/បង្កើត pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ការទាញយក header (ទូទៅ សម្រាប់ provider ណាមួយ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- តារាង pin ដែលបានរក្សាទុក: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ការកំណត់៖ `sessionAffinityTtlMs` (TTL សកលគិតជា ms, `0` បិទ) — `src/lib/db/settings.ts`។ បានប្តូរឈ្មោះពី `codexSessionAffinityTtlMs` ដែលសម្រាប់តែ Codex ដោយ migration `124_generic_session_affinity_ttl.sql` ដែលផ្ទេរ Codex TTL ដែលបានកំណត់ពីមុនណាមួយទៅជាលំនាំដើមថ្មី។

មុន #7274 `resolveSessionAffinityTtlMs()` បានចេញដោយផ្ទាល់ទៅ `0` សម្រាប់រាល់ provider លើកលែងតែ `codex` ដូច្នេហការកំណត់ TTL (និង session headers) មិនមានឥទ្ធិពលនៅកន្លែងណាផ្សេងទៀតទេ ទោះបីជាយន្តការ pinning និងការទាញយក header មិនអាស្រ័យលើ provider រួចហើយក្តី។ ការជួសជុលបានដក early-return នោះចេញ; TTL ឥឡូវនេះអនុវត្តស្មើៗគ្នាចំពោះរាល់ provider នៅពេលត្រូវបានកំណត់ជាសកលឱ្យលើសពី `0`។

header session-affinity ទាំងបីមិនដែលត្រូវបានបញ្ជូនទៅ upstream ទេ — executor បង្កើត upstream headers របស់ខ្លួនឯងពីសូន្យ ជំនួសឱ្យការបញ្ជូន client headers តាមផ្ទាល់ ដូច្នេហវានៅតែជា correlation id ខាងក្នុងប៉ុណ្ណោះ។

### Exclusive managed session connection leases

**វិសាលភាព៖** client/session HTTP ដែលគ្រប់គ្រងសកម្មមួយជាម្ចាស់ការតភ្ជាប់ OmniRoute ដែលមានសិទ្ធិមួយ។

**គោលបំណង៖** ផ្តល់ការកាន់កាប់ការតភ្ជាប់ដោយផ្តាច់មុខយ៉ាងធន់សម្រាប់ client ដែលត្រូវការរបាំង routing រឹងនៅទូទាំងសំណើ។ នេះខុសពី session affinity ដែលជាចំណូលចិត្តបន្តភាពបែបទន់៖ lease ផ្តាច់មុខរក្សាទុកស្ថានភាពវដ្តជីវិតនៅក្នុង SQLite អនុវត្តភាពតែមួយគត់របស់ម្ចាស់សកម្មសកល និងការតភ្ជាប់សកម្ម ហើយបដិសេធ generation ដែលហួសសម័យមុនការបញ្ជូនទៅ provider។

មុខងារនេះគឺ opt-in ក្នុងមួយ API key។ key ដែលគ្រប់គ្រងត្រូវតែមាន scope `lease:exclusive` និងបញ្ជី `allowedConnections` ដែលច្បាស់លាស់មិនទទេ។ HTTP client ណាមួយក៏អាចប្រើ lifecycle endpoint បាន; មិនត្រូវការឈ្មោះ client, user-agent, provider, OAuth method ឬ model ទេ។ lease កាន់កាប់ការតភ្ជាប់ មិនមែន model ទេ ដូច្នេហការផ្លាស់ប្តូរ model រក្សាទុកការចងភ្ជាប់ ខណៈពេលដែលការតភ្ជាប់នៅតែមានសិទ្ធិធម្មតា។ ច្បាប់ model, quota, health, cooldown និង allowlist ធម្មតានៅតែមានអំណាចជាចុងក្រោយ ហើយអាចផ្លាស់ប្តូរ generation ដដែលទៅការតភ្ជាប់ដែលមានសិទ្ធិទំនេរផ្សេងទៀត។

វដ្តជីវិត (lifecycle) គឺ `POST /api/v1/session-leases` ដែលមានសកម្មភាព JSON `acquire`, `renew` និង `release`។ សំណើ inference ដែលត្រូវបានគ្រប់គ្រង (managed) បង្ហាញតម្លៃមិនស្រដាក់ (opaque) `X-OmniRoute-Lease-Owner` និង `X-OmniRoute-Lease-Generation` ដែលត្រឹមត្រូវជាក់លាក់។ ម្ចាស់ (owner) ប្រើ `vlo_` តាមដោយតួអក្សរ base64url ចំនួន 43 តួ; មានតែ hash SHA-256 របស់វាទេដែលត្រូវបានរក្សាទុក។ រាល់ dispatch fence ចុងក្រោយទាំងអស់ក៏ចង (bind) នូវ API key ID ដែលបានផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ និង connection ID ដែលសកម្មផងដែរ។ Header គ្រប់គ្រង lease ត្រូវបានដកចេញពី log ពី snapshot សំណើដែលត្រូវបានរក្សាទុក និង header របស់ upstream executor។

បើ routing ធម្មតាមាន candidate ដែលត្រូវបានគ្រប់គ្រង និងមានសិទ្ធិ ប៉ុន្តែ candidate ទំនេរទាំងអស់ត្រូវបានកាន់កាប់ដោយ active lease របស់អ្នកដទៃ (foreign) OmniRoute ត្រឡប់ HTTP `429` កូដ lease-capacity-unavailable ស្ថានភាព waiting-for-capacity និង `Retry-After` ដែលមានព្រំដែន ដែលបានបង្កើតចេញពីការផុតកំណត់ដែលពាក់ព័ន្ធឆាប់បំផុត។ ការគ្មានសិទ្ធិជ្រើសរើសធម្មតា (empty eligibility) មិនមែនជា lease contention ទេ ហើយនៅតែរក្សាអត្ថន័យ error របស់ routing ដែលមានស្រាប់។

យន្តការពាក់ព័ន្ធនៅតែដាច់ដោយឡែកពីគ្នា៖

- OAuth session occupancy គឺជា soft distribution ក្នុង process (process-local) សម្រាប់គណនី OAuth។
- Account semaphore ផ្តល់ permit សម្រាប់ request concurrency ហើយបញ្ចប់នៅពេលសំណើបញ្ចប់។
- Exclusive managed session lease គឺជាភាពជាម្ចាស់លើជីវចលដែលធន់ (durable) ជាមួយនឹង generation fence។

---

## 3. ការចាក់សោម៉ូដែល (Model Lockout)

**វិសាលភាព៖** បីជំពូក provider + connection + model ។

**វិសាលភាព key តាម status៖** status ដែលបរាជ័យជាអ្នកសម្រេចថា lockout សរសេរទៅ key ណា
(`resolveLockoutScope()` ក្នុង `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — សញ្ញាបញ្ជាក់ពី quota ឬសិទ្ធិប្រើប្រាស់ — ចាក់សោ **គ្រួសារ quota**:
  សម្រាប់ codex គឺទាំងមូលនៃ scope `codex` / `spark` (គ្រប់ម៉ូដែល `gpt-5*` របស់
  connection នោះ) ចំពោះ provider ផ្សេងទៀតប្រើ `getQuotaScopedModelForProvider()` ។
- `404` ចាក់សោម៉ូដែលដាច់ដោយឡែក (`getModelLockKey()` បង្រួម `not_found`) ។
- status ផ្សេងទៀតទាំងអស់ — បរាជ័យ transport/server `5xx` និង `502`
  ដែល OmniRoute បង្កើតឡើងដោយខ្លួនឯងពី quality validation — ចាក់សោតែ
  tuple provider/connection/model **ច្បាស់លាស់** ប៉ុណ្ណោះ។ stream មិនល្អលើម៉ូដែលមួយ
  មិនមែនជាភស្តុតាងអំពី quota របស់ account ទេ; មុនច្បាប់នេះ response ទទេមួយលើ
  `codex/gpt-5.6-luna` បានដកម៉ូដែល `gpt-5*` ទាំងអស់នៃ connection នោះចេញពី
  routing រយៈពេល 2–30 នាទី (កើនឡើងជាជំហាន) ខណៈដែល quota របស់វានៅគ្មានប៉ះពាល់។
- ជម្រើស `scope` ច្បាស់លាស់របស់ caller ឈ្នះជានិច្ច (Antigravity បញ្ជូន `"exact"`) ។

**គោលបំណង៖** ជៀសវាងការបិទ connection ទាំងមូល នៅពេលមានតែម៉ូដែលមួយប៉ុណ្ណោះមិនអាចប្រើបាន ឬកំណត់ quota ។

**ឧទាហរណ៍៖**

- Per-model quota provider ដែលត្រឡប់ 429
- Local provider ដែលត្រឡប់ 404 សម្រាប់ម៉ូដែលមួយដែលបាត់
- បរាជ័យសិទ្ធិ mode/model ជាក់លាក់របស់ provider (ឧ. Grok modes)

**ការអនុវត្ត៖** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()` ។

### Model Cooldowns Dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

រាយបញ្ជី lockout ដែលកំពុងសកម្មជាមួយ៖ provider, connection, model, reason, expiresAt ។ អ្នកប្រតិបត្តិការអាចបើកម៉ូដែលឡើងវិញដោយដៃពី card នេះ។

**REST API:**

- `GET /api/resilience/model-cooldowns` — រាយបញ្ជី lockout ដែលកំពុងសកម្ម
- `DELETE /api/resilience/model-cooldowns` — បើកឡើងវិញដោយដៃ។ Body: `{provider, connection, model}` ។ Auth: management ។

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`) ។

ទំព័រមួយសម្រាប់គ្រប់ connection ដែលចេញពី routing ដោយហេតុផលបណ្តោះអាសន្ន ជំនួសការ
បើកទំព័រ provider នីមួយៗ។ វារាយបញ្ជី connection cooldowns, model lockouts និង terminal
states សម្អាតវាតាម connection នីមួយៗ សម្រាប់ការជ្រើសរើស ឬសម្រាប់ connection ទាំងអស់របស់ provider មួយ
ហើយកែសម្រួលច្បាប់ cooldown ដែលត្រូវបាន tune ច្រើនបំផុត៖ `streamStallCooldown.enabled` និង
base cooldown របស់ `connectionCooldown` សម្រាប់ OAuth / API-key
ព្រមទាំងជំហាន backoff អតិបរមា (រក្សាទុកតាមរយៈ
`PATCH /api/resilience`) ។ Terminal states (`banned`, `expired`, `credits_exhausted`) ត្រូវបាន
រាយបញ្ជី ប៉ុន្តែមិនត្រូវបានសម្អាតនៅទីនេះទេ។

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connection ជាមួយ status, cooldown ដែលនៅសល់,
  កម្រិត backoff, ប្រភេទ error ចុងក្រោយ និង model lockouts (គ្មាន credentials)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` ឬ
  `{all: true, provider?}`; ត្រឡប់ `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI ការកំណត់ Lockout + ការស្តារដោយ success-decay (v3.8.23)

Model lockout បានផ្លាស់ប្តូរពីអាកប្បកិរិយា hardcoded ដែលបើកជានិច្ច ទៅជាមុខងារ
opt-in ដែលកំណត់រចនាសម្ព័ន្ធបានពេញលេញ ជាមួយ settings card ផ្ទាល់ខ្លួន និងផ្លូវស្តារខ្លួនឯង។

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`) ។
នេះគឺ **ខុសគ្នា** ពី `ModelCooldownsCard` ដែល read-only ខាងលើ (ដែលគ្រាន់តែ
_រាយបញ្ជី_ lockout សកម្ម) — card ថ្មីនេះ _កំណត់រចនាសម្ព័ន្ធប៉ារាម៉ែត្រ_។ តម្លៃលំនាំដើម
ស្ថិតក្នុង `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| ការកំណត់                | លំនាំដើម                         | អត្ថន័យ                                                   |
| ----------------------- | -------------------------------- | --------------------------------------------------------- |
| `enabled`               | `false`                          | ប្តូរទូទៅ — model lockout **បិទជាលំនាំដើម**។              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream status ដែលរាប់ជាបរាជ័យកម្រិតម៉ូដែល។              |
| `baseCooldownMs`        | `120_000` (120 s)                | រយៈពេល lockout ដំបូងសម្រាប់បរាជ័យដំបូង។                   |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ដែនកំណត់លើ cooldown ដែលកើនឡើង។                            |
| `maxBackoffSteps`       | `10`                             | ជំហានកើនឡើង exponential-backoff អតិបរមា។                  |
| `useExponentialBackoff` | `true`                           | តើបរាជ័យជាប់គ្នាដើម្បីកើន cooldown ជា exponential ដែរឬទេ។ |

ការកំណត់រក្សាទុកតាម settings store ធម្មតា ហើយ validate តាម
resilience settings schema; card នេះ clamp `baseCooldownMs`/`maxCooldownMs`
(ដោយ `maxCooldownMs ≥ baseCooldownMs`) និង `maxBackoffSteps` ។

**ការស្តារដោយ success-decay:** ការស្តារ **មិនមែន** គ្រាន់តែជាការផុតកំណត់ timer ទេ។ Response
ដែលមានសុខភាពល្អនឹងបណ្តាក់ឲ្យចំនួនបរាជ័យរបស់ម៉ូដែលថយចុះ ដូច្នេះម៉ូដែលដែលស្តារខ្លួន
ក្នុងពេល window ឈប់កើនឡើង (ហើយត្រូវបានសម្អាត) មុនពេល timer របស់វាផុត។ នៅពេល
combo target ជោគជ័យ `open-sse/services/combo.ts` ហៅ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ដែល **កាត់ពាក់កណ្តាល**
`failureCount` ដែលបានរក្សាទុក (`Math.floor(failureCount / 2)`); នៅពេលវាឈានដល់ `0` entry
lockout ត្រូវបានលុបទាំងស្រុង។ មិត្តភាពផ្ទុយគ្នា `recordModelLockoutFailure()`
បង្កើនចំនួន (ហើយកើន cooldown) នៅពេលបរាជ័យក្នុង
escalation window ។ Success-decay នេះគឺបន្ថែមលើការផុតកំណត់ timer ធម្មតា —
ផ្លូវណាមួយក៏អាចបើកម៉ូដែលឡើងវិញបាន។

**State:** lockouts ត្រូវបានរក្សាទុក **ក្នុង memory** (`Map` កម្រិត process នៃ
`ModelLockoutEntry` key ដោយ `provider:connectionId:model`, lock កម្រិត exact key ដោយ
`provider:connectionId:exact:model`) មិនបាន persist ទៅ
DB ទេ — វាបាត់នៅពេល restart ។ _ការកំណត់_ ត្រូវបាន persist; lockout _state_
សកម្មគឺជាបណ្តោះអាសន្ន។

---

## 4. ការគ្រប់គ្រង Concurrency របស់ Quota-Share (v3.8.36)

គណនីកម្រិតជាវ (GLM, MiniMax ជាដើម) ភាគច្រើនទទួលបានតែសំណើ concurrent ប្រហែល ~1–3 ប៉ុណ្ណោះ បើលើសពីនេះនឹងបង្កឲ្យមាន 429 និង cooldown។ បញ្ហានេះកាន់តែធ្ងន់ធ្ងរនៅក្រោម combo **quota-share** (`qtSd/…`) ដែលគ្លី API ជាច្រើនចែករំលែកគណនី upstream តែមួយ។ ស្រទាប់ទាំងបីខាងក្រោមជួយការពារមិនឲ្យគណនីដែលចែករំលែកគ្នាត្រូវលិចលង់។

### ដែនកំណត់ Concurrency ក្នុងមួយ Connection (`max_concurrent`)

Connection របស់ provider នីមួយៗអាចប្រកាសដែនកំណត់ `max_concurrent` (`provider_connections.max_concurrent` កំណត់នៅក្នុង connection modal / API / DB)។ ទុកឲ្យវាទទេ ប្រសិនបើមិនចង់មានដែនកំណត់។ នេះជាប៊ូតុងតែមួយគត់ដែលបញ្ជាស្រទាប់ serialization ខាងក្រោម — កំណត់វាទៅតាម concurrency ពិតប្រាកដរបស់គណនី (ឧ. GLM ~1, MiniMax ~2)។

### ដែនកំណត់ Concurrency ក្នុងមួយ Model (`modelConcurrency`)

Connection ក៏អាចប្រកាសដែនកំណត់ concurrency ច្បាស់លាស់ក្នុងមួយ model បន្ថែមទៀត នៅក្នុង map `rateLimitOverrides` របស់វា៖

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

កំណត់វានៅក្នុង connection modal (**Rate limit overrides → ដែនកំណត់ concurrency ក្នុងមួយ model**, មួយ `model=cap` ក្នុងមួយបន្ទាត់) ឬតាម `PATCH /api/providers/[id]` ដោយប្រើរូបរាង JSON ដូចគ្នា។ ន័យសំខាន់ៗ៖

- **ទូទាំង connection បញ្ជៀបនឹង ជាក់លាក់តាម model:** `maxConcurrent` នៅតែជាដែនកំណត់រួមទូទាំង connection។ នៅពេលទាំងពីរមានប្រសិទ្ធភាព gate ទាំងពីរត្រូវបានចាប់យកជាមួយគ្នាបែប atomic នៅក្នុង composite gate ដូចគ្នា (`global → provider → account → model`); អាកប្បកិរិយាពិតប្រាកដគឺជាដែនកំណត់ដែលតឹងរ៉ឹងជាងគេ។
- **ការផ្គូផ្គង model-key ច្បាស់លាស់:** key គឺជា string របស់ model ដែលត្រូវបានបញ្ជូនទៅ executor បន្ទាប់ពីការដោះស្រាយ routing — ធម្មតាជា id របស់ model upstream សុទ្ធ (`glm-5`) មិនមែនជា alias `provider/model` ពីខាង client ទេ (`zai/glm-5` មិនផ្គូផ្គងនឹង `glm-5`)។ តម្លៃគឺជាដែនកំណត់ចំនួនសំណើ concurrent ជាចំនួនគត់វិជ្ជមាន។
- **តម្រង់ជួរនៅមូលដ្ឋាន គ្មានការស្វែងរក:** សំណើដែលលើសត្រូវបានតម្រង់ជួរនៅមូលដ្ឋាន ដោយប្រើន័យ queue/timeout ដែលមានស្រាប់ (កំហុស admission ដែលមានប្រភេទ `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`)។ OmniRoute មិនស្វែងរក ឬសន្និដ្ឋាន policy របស់ upstream ទេ — វាគ្រាន់តែអនុវត្តដែនកំណត់ច្បាស់លាស់ដែល operator បានកំណត់ប៉ុណ្ណោះ។ gate របស់ model ដែលពេញមិនដែលបិទ provider និងមិនដែលបង្កើតការចាក់សោ model ជាអចិន្ត្រៃយ៍ទេ; អាកប្បកិរិយា 429/cooldown/fallback របស់ upstream នៅតែជា error backstop។
- **វិសាលភាពក្នុងមួយ connection ក្នុងមួយ process:** ដែនកំណត់គឺក្នុងមួយ connection របស់ database ហើយត្រូវបានរក្សាទុកក្នុង memory ដូច្នេះ connection ពីរដែលប្រើគ្លី API upstream ដូចគ្នានឹងមិនសម្របសម្រួលជាមួយគ្នាទេ។
- **មិនបានកំណត់ មានន័យថា គ្មានការផ្លាស់ប្តូរ:** ការមិនដាក់ map (ឬទុកឲ្យវាល dashboard ទទេ) មិនបន្ថែម model gate ណាមួយទេ។ ឧទាហរណ៍ការកំណត់ដោយមិនបានប្រកាសដែនកំណត់ជាសកលរបស់ provider ណាមួយ៖

```text
glm-5=1
glm-4.7=3
```

### ការធ្វើ Serialization សំណើ Quota-Share

នៅពេល dispatch របស់ quota-share គោលដៅទៅលើ connection ដែលប្រកាស `max_concurrent` ជាវិជ្ជមាន សំណើ concurrent ទៅកាន់ **គណនី** នោះត្រូវបានធ្វើ serialization តាម semaphore ក្នុងមួយ connection (key `qsconn:<connectionId>`): សំណើដែលលើស **រង់ចាំនៅក្នុងជួរ** ជំនួសឲ្យការលិចលង់គណនី។ វាជា **fail-open** — ជួរដែលពេញ ឬ timeout នឹងបន្តទៅមុខដោយគ្មាន slot ជាជាងបដិសេធសំណើដែលអាច dispatch បាន។ បិទ/បើកនៅ **Settings → Resilience → Concurrency ក្នុងមួយ connection របស់ quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, លំនាំដើមបើក)។ បើគ្មានដែនកំណត់ `max_concurrent` ទេ អាកប្បកិរិយានៅដដែល។

> gate routing របស់ quota-share (`selectQuotaShareTarget`, DRR + P2C) ខ្លួនវាផ្ទាល់គឺ fail-open ហើយគ្រាន់តែ _បញ្ចុះអាទិភាព_ connection ដែលដល់ដែនកំណត់ប៉ុណ្ណោះ — ជាមួយ pool ដែលមាន connection តែមួយ វាមិនអាចកំណត់ដាច់ខាតបានទេ ដូច្នេះ semaphore នេះទើបជាអ្វីដែលទប់ទឹកជំនន់ពិតប្រាកដ។

### ការព្យាយាមម្តងទៀតដែលយល់ពី Cooldown របស់ Combo

សម្រាប់យុទ្ធសាស្ត្រ combo ទាំងអស់ (នៅពេលបើក) សំណើដែលនឹងបង្កើត 429 សម្រាប់ cooldown បណ្តោះអាសន្នខ្លី នឹងរង់ចាំរហូតអស់ រួច dispatch ម្តងទៀត ជំនួសឲ្យការត្រឡប់ 429 — នេះគ្របដណ្តប់បង្អួច TPM/RPM ប្រភេទ Gemini (~60s retry-after) នៅលើ combo ពហុ model ឧ. គោលដៅទាំងពីរនៃ combo 2-model ជាប់ rate limit ក្នុងមួយ model។ វាត្រូវបានកំណត់ដោយ `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) នៅ **Settings → Resilience**។ វាមិនដែលរង់ចាំលើ `quota_exhausted` (ចាក់សោរហូតដល់ពាក់កណ្តាលយប់) ឬមូលហេតុ auth/not-found ទេ។

gate ដូចគ្នានេះក៏គ្របដណ្តប់ករណី pre-dispatch ផងដែរ (#16319): នៅពេលគោលដៅទាំងអស់នៃ combo ត្រូវបានរំលងមុនពេលមានការព្យាយាមណាមួយ ដោយសារ model របស់វាស្ថិតក្នុងការចាក់សោបណ្តោះអាសន្នខ្លី path ដែលគ្មានការព្យាយាមនឹងរង់ចាំសោឲ្យអស់ក្រោមដែនកំណត់ដូចគ្នា រួច dispatch ម្តងទៀត ជំនួសឲ្យការឆ្លើយតបដោយ `503 ALL_TARGETS_SKIPPED` ដែលគ្មាន hint។ នៅពេលមិនអនុញ្ញាតឲ្យរង់ចាំ (ដែនកំណត់ ចំនួនការព្យាយាម ឬថវិកាអស់ ឬមុខងារត្រូវបានបិទ) ចម្លើយចុងក្រោយត្រូវបានបង្កើនកម្រិតទៅជា `429 rate_limit_error` ដែលផ្ទុក `retry_after` / `reset_at` ពីការផុតកំណត់នៃសោបណ្តោះអាសន្នដំបូងបង្អស់; សោ quota, auth និង not-found រក្សា 503 ដែលគ្មាន hint នៅដដែល។

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

## 5. ការគ្រប់គ្រងការទទួលយកជួររងសំណើ (v3.8.49 · issue #6593)

**វិសាលភាព**: ជួររងលីមីតប្រាក់ប្រចាំអ្នកផ្គត់ផ្គង់+ការតភ្ជាប់ក្នុងស្រុក (`open-sse/services/rateLimitManager.ts`, ដែលបានគាំទ្រដោយ Bottleneck) ជាមួយជាន់មួយក្រោមម៉ាស៊ីនចំណាត់ថ្នាក់បីខាងលើ។

**`maxWaitMs` កំណត់ព្រំកំណត់ការរង; `executionMaxWaitMs` កំណត់ព្រំកំណត់ការអនុវត្ត។**  
ទាំងពីរនេះត្រូវបានបំបែកយ៉ាងច្បាស់ ហើយមួយក៏មិនផ្គត់ផ្គង់ទៅលើមួយទៀតឡើយ។

`resilienceSettings.requestQueue.maxWaitMs` គឺជា **ថវិកាការរងជួរ**: វាគ្របដណ្ដប់ការរងសម្រាប់ស្លុតអ្នកផ្គត់ផ្គង់ម្នាក់ និងបន្ទាប់មកអង្គុយនៅក្នុង QUEUED, ហើយ Timer របស់វាត្រូវបានលុបចោលភ្លាមៗនៅពេលដែលការងារចេញពី QUEUED និងចាប់ផ្តើមអនុវត្ត (`rateLimitManager.ts`, `wrappedFn`)។ ការស្នើរសុំដែលលើសពីវា មិនដែលឈានដល់ upstream ទេ។ តម្លៃលំនាំដើម 30000ms, ផ្តល់ដោយ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` នៅក្នុង `src/lib/resilience/settings.ts` និងត្រូវបានផ្អូញផ្អើលដោយ `tests/unit/ratelimit-admission-control-6593.test.ts`, ដូច្នេះ ការផ្លាស់ប្តូរវានឹងធ្វើឲ្យតេស្តនោះបង្ហាញជាពណ៌ក្រហម ជាជម្រើសផ្ទុយពីការធ្វើអត្ថបទនេះឲ្យក្លាយជាការមិនប្រើប្រាស់។

`resilienceSettings.requestQueue.executionMaxWaitMs` គឺជាអ្វីដែល Bottleneck ទទួលជាការបញ្ចប់ការងារ `expiration`, ដែល Timer របស់វាចាប់ផ្តើមតែបន្ទាប់ពីការបញ្ជូន។ វាជាការពារសម្រាប់ executors ដែលគ្មាន upstream timeout ផ្ទាល់ខ្លួន ហើយវាត្រូវបានលើកឡើងទៅ fetch-start timeout ផ្ទាល់ខ្លួនរបស់ executor នៅពេលវាខ្លាំងជាង ដូច្នេះវាមិនអាចផ្តាច់ការឆ្លើយតបដែលសុខភាពនៅក្នុងដំណើរការ។ តម្លៃលំនាំដើម 600000ms (10 នាទី)។

ការផ្ទុកថវិកាជួររងទៅក្នុង `expiration` គឺជាអ្វីដែលអស់កល្បជាមុន សម្រាប់ gateways មិនអាចបន្ថែមបាននៅពេលដំណើរការ — ពួកវាអាចដំណើរការបានជាក់ស្ដែងជាច្រើននាទីមុន bytes ដំបូង — ហើយវាជាការបង្ហាញរបស់ expiration ជាមួយ `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ខណៈដែលថវិកាជួររងកាន់កូដ queue-timeout។ អាចការលើសកំណត់ដោយ `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ឬតាមផ្ទាំងគ្រប់គ្រង (**Settings → Resilience**)។ តម្លៃទាំងពីរត្រូវបានប៉ុនប៉ងកំណត់នៅ 1ms–24h នៅពេលនោះត្រូវបានធម្មតា។

**លំដាប់អាទិភាព សម្រាប់ទាំងពីរ**: env var ផ្តល់តែ _default_ ប៉ុណ្ណោះ។ តម្លៃដែលបានរក្សាទុកនៅក្នុង `resilienceSettings.requestQueue` (ផ្ទាំងគ្រប់គ្រង / API patch, ដែលបានទុកក្នុង `key_value`) មានអាទិភាពលើវា ហើយការកំណត់តាមការតភ្ជាប់មួយ `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` មានអាទិភាពលើវា។ ការកំណត់ env var នៅលើ deployment ដែលស្រាប់មានតម្លៃដែលបានរក្សាទុកមិនបំលែងអ្វីទេ — សូមលុបចោលឬធ្វើបច្ចុប្បន្នភាពការកំណត់ដែលបានរក្សាទុកជាជម្រើស។

ការរស់នៅក្នុងជួររងត្រូវបានកំណត់ដោយ `maxWaitMs`; `maxQueueDepth` ខាងក្រោមកំណត់ចំនួនអ្នកអំពាវនាវដែលអាចរង់ចាំក្នុងជួរបាននៅពេលតែមួយ។

**ការស្នើរសុំបន្តរបស់រាងកាយ: ការរំកិលប្រកបដោយចំណាយពេល vs ការចាក់ចោល។**  
រាងកាយ 429 អាចបញ្ជាក់រយៈពេលរងរបស់ខ្លួន (Gemini `RetryInfo.retryDelay`, អត្ថបទ "retry after Ns"), ដែល `updateFromResponseBody` អាន។ ការរងដែលសមនឹង `maxWaitMs` នៃការតភ្ជាប់ គឺជាការរំកិលប្រកបដោយចំណាយពេល៖ limiter នឹងទទួលសម្រួលធុងរបស់វាក្នុងរយៈពេលនោះ ហើយការអំពាវនាវដែលបានដាក់ក្នុងជួរនឹងត្រូវបញ្ចូននៅពេលធុងនេះបានស្ដារឡើងវិញ។ ការរងដែលលើសពី `maxWaitMs` មិនមែនជារឿងដែលជួររងអាចរង់ចាំបានទេ — Gemini ឆ្លើយតបនឹង Quota ប្រចាំថ្ងៃដែលបានប្រើប្រាស់ exhausted ជាមួយ `retryDelay: "86399s"`។ `Retry-After` ដែលបានផ្ទេរឡើងវិញនៅលើ 429 ដែលបានសាងសង់ឡើងវិញ (#16528) បានធ្វើឲ្យ fallback engine ចាក់ចោលម៉ូដែលសម្រាប់វិនាទីនោះរួចហើយ ប៉ុន្តែក្នុងករណីលើក limiter សម្រាប់វាបង្កើតឲ្យរារាំងការអំពាវនាវណាមួយដែលឆ្លោះគន្លងឆាប់ (បន្ទាប់ពីការកំណត់សមរម្យ resilience, ឧទាហរណ៍) សម្រាប់ពេញមួយ `maxWaitMs`។ នៅពេលដែលការរងបែបនេះមកពីព័ត៌មានលម្អិតប្រភេទ Google `RetryInfo` (ដែលមានប្រភព `google_rpc_retry_info`) ហើយ limiter នៃ key បានកំណត់រួចទៅលើម៉ូដែល (សូមមើល `getLimiterKey`), 429 នេះក្លាយជាការចាក់ចោលម៉ូដែលលើការតភ្ជាប់នោះ (`lockModelForLongBodyRetry` នៅក្នុង `open-sse/services/rateLimitManager/bodyRetryPause.ts`, មានកំណត់សម្រាប់ 24h) ហើយ limiter ត្រូវបានទុកឲ្យមិនបានផ្អាក។ ការជ្រើសរើសគណនីនឹងរំលងការចាក់ចោលនេះតាមរយៈ `isModelLocked()`, ហើយ gate ជាមុនការបញ្ជូនសម្រាប់គោលដៅដែលត្រូវបានចងជាមួយការតភ្ជាប់ក៏ដូចជាការនោះផងដែរ។ នៅលើ antigravity ដែល limiter របស់វាត្រូវបានកំណត់តាមក្រុម quota, ការចាក់ចោលនឹងចាក់លើម៉ូដែលត្រឹមត្រូវ ដូចជាការចាក់លេខ quota ផ្សេងទៀតរបស់វា។ ឈ្មោះដែល client បានស្នើសុំត្រូវបានចាក់បិទផងនៅពេលដែល alias បានដោះស្រាយវាទៅម៉ូដែលនោះ ពីព្រោះការពិនិត្យនោះប្រើឈ្មោះដែលបានស្នើសុំ; វាត្រូវបានចាក់បិទដោយត្រឹមត្រូវ (`lockExactModel`), ដូច្នេះ alias ដែលឆ្លងកាត់ antigravity quota family ឬ codex scope មិនដែលចាក់បិទលើរបស់ខ្លួនឡើយ។ សេចក្តីគ្រប់គ្រងដោយអក្សរពិពណ៌, `retryDelay` ដែលមិនបានបញ្ជាក់ប្រភេទ, ឬ limiter ដែលចែករំលែកដោយការតភ្ជាប់ទាំងមូល នឹងរក្សាការផ្អាក។ នៅពេលដែល limiter របស់ផ្លូវ 429 ដែលទើបសាងសង់ឡើងវិញផ្អាក, អ្នកអំពាវនាវដែលពេលវេលាជួររងនៅសល់របស់គាត់ផុតទៅមុនការផ្អាក ត្រូវបានបដិសេធភ្លាមៗជាមួយកូដ queue-timeout (`checkLimiterPause`) ជំនួសការរងពេលនោះ; ចំណុចបញ្ចប់ដែលបានកត់ត្រាត្រូវបានដាក់ចិញ្ចើមនៅមុនការសាងសង់ឡើង limiter ដែល Bottleneck ចាប់ផ្តើមនាឡិកាស្ដារឡើងវិញ ហើយការផ្លាស់ប្តូរណាមួយក្រោយពេលក្នុងធុង (reservoir) នឹងភ្លេចវា។ (បានគ្របដណ្តប់ដោយ `tests/unit/rate-limit-long-body-retry-lockout.test.ts` និង `tests/unit/rate-limit-body-retry-pause.test.ts`)

**`maxQueueDepth` — កម្រិតទទួលការអនុម័តជាជម្រើស (ថ្មី)**  
`resilienceSettings.requestQueue.maxQueueDepth` កំណត់ចំនួនសំណើដែលអាចអង្គុយរង (មិនទាន់បានបញ្ជូន) សម្រាប់ provider+connection មួយនៅពេលតែមួយ។ នៅពេលដែលជួររងមានសំណើដល់ `maxQueueDepth` រួចហើយ, សំណើថ្មីនឹងត្រូវបានបដិសេធយ៉ាងរហ័សជាមួយកូដដែលមានព័ត៍មានប្រភេទ `code: "RATE_LIMIT_QUEUE_FULL"` **មុន**ដែលវានឹងឈានដល់ `limiter.schedule()` — ដូច្នេះការបដិសេធនេះមានថ្លៃថោក និងកើតឡើងជាមុននូវកិច្ចការបង្រ្កាប/ការប្រែសម្រួលណាមួយសម្រាប់សំណើនោះ។ តម្លៃលំនាំដើម `0` = បានបិទ, រក្សាទុកអាកប្បកិរិយាជួររងមិនមានព្រំកំណត់; តម្លៃអាចកំណត់បានពី 0–100000។ អាចផ្លាស់ប្តូរបានតាមរយៈ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ឬ `resilienceSettings.requestQueue.maxQueueDepth` (ផ្ទាំងគ្រប់គ្រង/API patch)។

ការត្រួតពិនិត្យការទទួលយកដោយខ្លួនឯងគឺជាអនុគមន៍ស្អាត (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ដូច្នេះវាអាចធ្វើតេស្តជាមួយ unit-test ដោយមិនត្រូវការប្រើប្រាស់ Bottleneck limiter ពិតៗទេ។

> RFC ដែលបានបើក #6593 ក៏បានស្នើនូវ flag `bypassCompressionOnRateLimit` ផងដែរ។ ប៉ាយឡាញ `open-sse/services/compression/` របស់ repo នេះ គឺជា prompt/context compression លើសំណើ LLM ចេញ (`chatCore.ts` ជុំវិញប្លុក `resolveCompressionSettings`/`selectCompressionStrategy`) មិនមែនជា HTTP response compression លើ 429 bodies ដែលបានបង្កើតឡើងទេ — មិនមាន code path ដែលត្រូវគ្នាសម្រាប់ bypass flag ពិតប្រាកដទេ។ ជំហាន prompt-compression នោះក៏ដំណើរការនៅ _មុន_ `withRateLimit()` ក្នុង request pipeline បច្ចុប្បន្នដែរ ដូច្នេះការរៀបចំលំដាប់ឡើងវិញដើម្បីរំលងវានៅពេល queue-full rejection គឺជាការផ្លាស់ប្តូរដាច់ដោយឡែក និងធំជាងវិសាលភាពរបស់ issue នេះ; វាត្រូវបានគេចេតនា **មិន** អនុវត្តនៅទីនេះ ហើយទុកជា follow-up ប្រសិនបើផលប្រយោជន៍នៃការសន្សំ CPU មានតម្លៃជាងហានិភ័យនៃការរៀបចំលំដាប់ឡើងវិញ។

### សំណាញ់សុវត្ថិភាពបើកដោយស្វ័យប្រវត្តិនៃ Rate-Limit និងការការពារការភ្ជាប់ (`rateLimitProtection`)

**សំណាញ់សុវត្ថិភាពបើកដោយស្វ័យប្រវត្តិ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, លំនាំដើម `true`):
តាមលំនាំដើម OmniRoute បើកការការពារ rate-limit queue ដោយស្វ័យប្រវត្តិសម្រាប់ការភ្ជាប់ API-key provider សកម្មទាំងអស់ (`getProviderCategory(provider) === "apikey"`)។ នេះធានាថាសំណើចូលទៅកាន់ upstream API keys ដែលងាយរងផលប៉ះពាល់ពី rate ត្រូវបានដាក់ជួរ និងគ្រប់គ្រងល្បឿនតាមរយៈ Bottleneck ជំនួសឱ្យការផ្ទុះចូលទៅក្នុងកំហុស upstream 429 ។ សំណាញ់សុវត្ថិភាពនេះអាចត្រូវបាន override តាមរយៈអថេរបរិស្ថាន `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` បិទ, `true`/`1`/`on` បង្ខំបើក) ដែលមានអាទិភាពលើការកំណត់ dashboard ដែលបានរក្សាទុក (**Settings → Resilience** / `PATCH /api/resilience`)។

**អត្ថន័យនៃ `rateLimitProtection` ក្នុងមួយការភ្ជាប់:**
ការការពារ rate-limit ក្នុងមួយការភ្ជាប់ត្រូវបានតាមដានតាមរយៈ field boolean `rateLimitProtection` លើការភ្ជាប់ provider (រក្សាទុកជា `rate_limit_protection` ក្នុង SQLite):

- **បើកច្បាស់លាស់ (`rateLimitProtection === true`)**: ការការពារ rate-limit ត្រូវបានបើកយ៉ាងច្បាស់សម្រាប់ការភ្ជាប់នេះ មិនថាប្រភេទ provider ឬថាតើសំណាញ់សុវត្ថិភាព auto-enable ត្រូវបានបើកឬអត់នោះទេ។
- **បិទច្បាស់លាស់ (`rateLimitProtection === false`)**: បិទការការពារច្បាស់លាស់ ប៉ុន្តែ **មិន** ដកការភ្ជាប់ API-key សកម្មចេញពីសំណាញ់សុវត្ថិភាព auto-enable សកលទេ។ ក្នុង `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` និង `undefined` គឺសមមូលគ្នា: មានតែ `rateLimitProtection === true` ប៉ុណ្ណោះដែលត្រូវបានចាត់ទុកជា override ច្បាស់លាស់។ ប្រសិនបើ `rateLimitProtection` គឺ `false` (ឬមិនបានកំណត់) ការភ្ជាប់ API-key សកម្មនៅតែត្រូវនឹងលក្ខខណ្ឌ auto-enable ហើយនៅតែត្រូវបានការពារ rate-limit។
- **គ្មានការដកខ្លួនក្នុងមួយការភ្ជាប់**: អ្នកប្រតិបត្តិមិនអាចបង្ហាញថា "ការភ្ជាប់ API-key សកម្មតែមួយនេះត្រូវដំណើរការដោយគ្មានការការពារ rate-limit queue" ខណៈពេលដែលរក្សា auto-enable សកម្មសម្រាប់ការភ្ជាប់ផ្សេងទៀតនៅឡើយទេ។ ដើម្បីដំណើរការការភ្ជាប់ API-key ដោយគ្មាន rate-limit queues ទាំងស្រុង សំណាញ់សុវត្ថិភាពត្រូវតែបិទជាសកល (`RATE_LIMIT_AUTO_ENABLE=false` ឬ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)។

**ផ្លូវសរសេរដែលគាំទ្រ:**

- **`POST /api/rate-limits`**: ផ្លូវសរសេរគ្រប់គ្រងដែលគាំទ្រដើម្បីប្តូរ `rateLimitProtection` សម្រាប់ការភ្ជាប់ (`{ connectionId: string, enabled: boolean }`)។ ការហៅជាមួយ `enabled: true` បើកការការពារច្បាស់លាស់; ការហៅជាមួយ `enabled: false` ដកការការពារច្បាស់លាស់ចេញ (ទោះបីជាការភ្ជាប់ API-key សកម្មនៅតែត្រូវបានគ្របដណ្តប់ក្រោមសំណាញ់សុវត្ថិភាពសកល ប្រសិនបើ auto-enable កំពុងបើកក៏ដោយ)។
- **`PUT /api/providers/[id]`**: ដោយចេតនា **មិន** ទទួល ឬប្តូរ `rateLimitProtection` (#11278)។ ការធ្វើបច្ចុប្បន្នភាព metadata ការភ្ជាប់ provider តាមរយៈ `PUT /api/providers/[id]` នឹងមិនផ្លាស់ប្តូរស្ថានភាពការពារ rate-limit ដែលបានរក្សាទុកឡើយ។

---

## 6. Watchdog តាមដាន throughput ស្ទ្រីមយឺត (#9709)

ការការពារ `resilienceSettings.streamRecovery.throughputWatchdog` ដែលជាជម្រើស រកឃើញ upstream ដែលនៅតែផ្ញើ chunks ប៉ុន្តែបង្កើតលទ្ធផល assistant ក្រោមអត្រាលទ្ធផលមានប្រយោជន៍ដែលបានកំណត់។ វាត្រូវបានធ្វើឱ្យខុសពី idle timeout ដោយចេតនា៖ heartbeats និង metadata មិនកំណត់ឡើងវិញឧបករណ៍រាប់ពេលណាមួយទេ ហើយមិនត្រូវបានរាប់ថាជាវឌ្ឍនភាពទេ។ វាក៏ខុសពី hard attempt deadline (#9153) ដែរ ដែលនៅតែជាព្រលឹងសុវត្ថិភាពដាច់ខាត ដោយមិនគិតពីគុណភាពលទ្ធផល។

Watchdog ទាមទាររយៈពេល warm-up តាមដោយ rolling window ពេញលេញ មុនពេលវាអាចបោះបង់ (abort) បាន។ វារាប់ text deltas ពីព្រឹត្តិការណ៍លទ្ធផល Chat Completions និង Responses API (proxy បៃបី UTF-8 ដោយប្រុងប្រយ័ត្ន) មិនអើពើនឹងព្រឹត្តិការណ៍ដែលមានតែ usage និងព្រឹត្តិការណ៍ទទេ ហើយផ្អាកការវិនិច្ឆ័យ ខណៈពេលដែលព្រឹត្តិការណ៍ tool-call ឬ reasoning កំពុងដំណើរការ។ វាត្រូវបានបិទជាលំនាំដើម ហើយអាចបើកបានដោយ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; window, warm-up, អត្រាអប្បបរមា និងលទ្ធផលដែលអាចវាស់វែងបានអប្បបរមា ត្រូវបានកំណត់ព្រំដោយស្រទាប់ normalization នៃការកំណត់ resilience ធម្មតា។

នៅពេលបើក ការបោះបង់របស់ watchdog ត្រូវបានអនុវត្តតែលើការព្យាយាម upstream ដែលសកម្មប៉ុណ្ណោះ។ មុនពេលមានបៃណាមួយដែលអាចមើលឃើញដោយ client ផ្លូវ early-recovery គណនីដូចគ្នាដែលមានស្រាប់ អាចបើកការព្យាយាមឡើងវិញបាន។ បន្ទាប់ពី commit ស្ទ្រីមមិនត្រូវបាន replay ដោយងងឹតងងុលទេ; មានតែកិច្ចសន្យាបន្តកណ្តាលស្ទ្រីមដោយសុវត្ថិភាពដែលមានស្រាប់ប៉ុណ្ណោះ ដែលអាចប៉ះ (stitch) suffix បាន។ Finalization នៅតែជា single-shot ដូច្នេះការគណនា usage និងការដោះលែង semaphore មិនត្រូវបានស្ទួនទេ។

---

## 7. ការកំណត់ស្ថានភាព Upstream ឡើងវិញ (កំហុស quota ដែលរាយការណ៍ខុស)

**វិសាលភាព៖** gateway upstream មួយដែលរាយការណ៍ការអស់ quota បណ្ដោះអាសន្ន ដោយប្រើ HTTP status ខុស។

**គោលបំណង៖** កែតម្រូវ status ដែលបញ្ឆោត មុនពេលធ្វើ classification ដើម្បីឱ្យ downstream consumers (fallback engine, combo aggregation, response ដែលផ្ញើទៅ client) ឃើញលក្ខណៈ retryable ពិតប្រាកដនៃបរាជ័យនោះ។

Gateways ខ្លះសម្គាល់ការអស់ quota បណ្ដោះអាសន្ន ដោយប្រើ HTTP status ដែលមិនអាច
retry បាន។ `agentrouter.org` ត្រឡប់មកវិញនូវ `403` (ពេលខ្លះ `400`) ជាមួយ body
ជាភាសាចិន (`用户额度不足` / `额度不足`) ជំនួសឱ្យ `429` ស្ដង់ដារ។ Clients ដូចជា
Claude Code ចាត់ទុក `403` ជាអចិន្ត្រៃយ៍ ហើយបញ្ឈប់ session ហើយបើគ្មានការកែតម្រូវទេ
fallback engine នឹងចាត់ថ្នាក់វាជា `AUTH_ERROR` ជំនួសឱ្យព្រឹត្តិការណ៍ quota។

**ការអនុវត្ត៖**

- Registry + matcher៖ `open-sse/config/upstreamStatusRestatement.ts` — បញ្ជី
  rules តាម provider នីមួយៗ (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) ដែលផ្គូផ្គងតាមរយៈ `applyStatusRestatement()`។
- ទីតាំងហៅ (call site)៖ block `providerFailure:` ក្នុង `open-sse/handlers/chatCore.ts`
  (ប្រហែលជួរទី 3654) ភ្លាមៗបន្ទាប់ពី `parseUpstreamError()` ញែក response
  ពី upstream ដែលមាន error HTTP status (`!providerResponse.ok`) និងមុនពេល
  classification ណាមួយដំណើរការ ដើម្បីឱ្យ downstream consumer ទាំងអស់ឃើញ
  status ដែលបានកែតម្រូវ។ កំហុសដែលបញ្ចូលក្នុង SSE stream `200` ធ្វើតាមផ្លូវ
  stream-parsing ដាច់ដោយឡែក និងក្រោយជាង ហើយ **មិន** ត្រូវបានគ្របដណ្ដប់ដោយ
  hook នេះនាពេលបច្ចុប្បន្នទេ — ជាដែនកំណត់ដែលស្គាល់ មិនទាន់ចាំបាច់សម្រាប់
  misstatus របស់ agentrouter (ដែលបង្ហាញខ្លួនជា error HTTP status)។
- សិទ្ធិ retry៖ `429` ស្ថិតក្នុង `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) ដូច្នេះកំហុសដែលបាន
  restate មាន retry window ពិតប្រាកដ ជំនួសឱ្យការបង្ហាញជា `403` ដែលគ្មានសង្ឃឹម។
- `defaultRetryAfterMs` សម្រាយ `60s` (`upstreamStatusRestatement.ts`)
  គ្រាន់តែជាអ្វីដែល response ដែលបាន restate ប្រាប់ **client** ប៉ុណ្ណោះ វាមិនមែន
  ជារយៈពេល cooldown/lockout ខាងក្នុងរបស់ connection ទេ — រឿងនោះត្រូវបាន
  គ្រប់គ្រងដាច់ដោយឡែកដោយ mechanism ណាដែលពិតជាដោះស្រាយកំហុសដែលបាន restate
  (escalating backoff របស់ Connection Cooldown, §2, មូលដ្ឋាន `3s` សម្រាប់
  API-key providers; ឬ Model Lockout, §3, សម្រាប់ per-model-quota providers
  ដូចជា agentrouter)។ Router អាចមានសិទ្ធិ retry ខាងក្នុង មុនពេលដល់
  window 60s ដែលវាផ្សព្វផ្សាយទៅ client — ជា headroom ដែលមានចេតនា
  មិនមែនជា bug ទេ។

កំហុសអចិន្ត្រៃយ៍ (`无权访问模型` របស់ agentrouter — គ្មានសិទ្ធិចូលប្រើ model នេះ)
មិនដែលត្រូវបាន restate ទាល់តែសោះ៖ `excludeMarkers` បដិសេធ rule ទោះបីជា
`textMarkers` ផ្គូផ្គងក៏ដោយ ដូច្នេះកំហុសរក្សា status ដើមរបស់វា ហើយគ្មានអ្វី
retry វាជារៀងរហូតទេ។ Rule classification របស់ provider ដែលផ្គូផ្គង
(`agentrouter-model-access-denied` ក្នុង `open-sse/config/providerErrorRules.ts`៖
`reason: "auth_error"`, `scope: "model"`, base cooldown ដែលប្រកាស `6h`)
ត្រូវបានពិគ្រោះដោយ `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_មុន_ generic apikey-category `FORBIDDEN` early-return ដោយមានការគ្រប់គ្រងលើ
`honorsRuleLockScope(provider)` (#10334 — បច្ចុប្បន្នផ្តាច់មុខសម្រាប់
agentrouter តាមរយៈ allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ក្នុង
`providerErrorRules.ts`)។ Cooldown 6h ដែលប្រកាសរបស់ rule ហូរទៅជា
`fallbackResult.baseCooldownMs` ប៉ុន្តែវានៅតែបញ្ចូលទៅក្នុងផ្លូវ
per-model-quota lockout ដែលមានស្រាប់ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()` ដែលមិនបានផ្លាស់ប្ដូរដោយ #10334 លើកលែងតែប្រភព
cooldown)៖ វាត្រូវបាន clamp ចុះទៅ `mlSettings.maxCooldownMs` របស់ operator
(លំនាំដើម `1_800_000ms` / 30 នាទី) ដូច model lockout ផ្សេងទៀតទាំងអស់ ហើយ
_lockout reason ដែលបានរក្សាទុក_ នៅតែជា `"forbidden"` ដែល hardcode មកស្រាប់
មិនមែន `"auth_error"` របស់ rule ទេ — មានតែរយៈពេល cooldown ប៉ុណ្ណោះដែលត្រូវបាន
គោរពពីដើមដល់ចប់ មិនមែន reason string ទេ។ Connection ខ្លួនឯងនៅតែសកម្ម៖
models បងប្អូននៅលើ connection ដូចគ្នាមិនរងផលប៉ះពាល់ទេ។

កំហុស quota ដែលបាន restate (`额度不足`) ទៅដល់ provider rule មួយក្នុង production
(`agentrouter-user-quota-exhausted`៖ `reason: "quota_exhausted"`, `scope:
"connection"` គ្មាន cooldown ដែលប្រកាសផ្ទាល់ខ្លួនទេ — scaled backoff លំនាំដើម
របស់ persistence layer ត្រូវបានអនុវត្ត)។ ចាប់តាំងពី #10334 មក `scope` លើ
`ProviderErrorRuleMatch` ត្រូវបានប្រើប្រាស់ពីដើមដល់ចប់ ប៉ុន្តែ **តែ** សម្រាប់
providers ក្នុង allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — ថ្ងៃនេះមានតែ `"agentrouter"` ប៉ុណ្ណោះ គ្រប់គ្រងតាមរយៈ
`honorsRuleLockScope()`)។ សម្រាប់ provider ផ្សេងទៀតទាំងអស់ `scope` នៅតែជា
ព័ត៌មានសុខៗ ដូចមុន #10334 ដែរ។
`checkFallbackError` បង្ហាញ scope របស់ rule ដែលផ្គូផ្គងជា
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) គឺជា guard រួមដែលបញ្ជាក់ថា `ruleScope` មួយ
ពិតជាមានសុវត្ថិភាពដើម្បីគោរពជា signal ដែលជាសះស្បើយដោយខ្លួនឯង និងគ្របដណ្ដប់
ទូទាំង connection (scope `"connection"`, reason `quota_exhausted`, មិនដែល
`permanent`, មិនដែល `creditsExhausted` — ជាការការពារប្រឆាំងនឹង rule នាពេល
អនាគតដែលផ្គូផ្គង scope `"connection"` ជាមួយស្ថានភាពគណនីអចិន្ត្រៃយ៍)។
Consumers ពីរហៅវា៖

- **ការរក្សាទុក** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  ជំនួសឱ្យការធ្លាក់ទៅក្នុងសាខាចាក់សោ **តាមម៉ូដែលនីមួយៗ** របស់អ្នកផ្តល់សេវាបញ្ជូនបន្ត
  (agentrouter គឺ `passthroughModels: true` → `hasPerModelQuota()`
  ត្រឡប់ `true`) វាអនុវត្ត **រយៈពេលផ្អាកការតភ្ជាប់ជាបណ្ដោះអាសន្ន** —
  `testStatus: "unavailable"` + `rateLimitedUntil` ដោយមិនប្រើស្ថានភាពបញ្ចប់
  (`credits_exhausted`/`banned`/`expired`) ឡើយ — ដូច្នេះការតភ្ជាប់នឹងស្ដារឡើងវិញ
  ដោយខ្លួនឯង នៅពេលរយៈពេលផ្អាកផុតកំណត់ ជំនួសឱ្យតម្រូវឱ្យកំណត់ព័ត៌មានសម្ងាត់ឡើងវិញដោយដៃ។
  វាត្រូវបានរំលងសម្រាប់ការតភ្ជាប់ដែលមាន `disableCooling: true` (#2997)៖ ការដកខ្លួនចេញនេះ
  នឹងបន្តទៅសាខាចាក់សោតាមម៉ូដែលនីមួយៗជំនួសវិញ (ជាការដោះដូរដែលមានឯកសារពន្យល់ —
  សូមមើលមតិយោបល់ក្នុងកូដនៅខាងលើសាខានោះ)។
- **ការកំណត់ផ្លូវបន្សំក្នុងសំណើដូចគ្នា** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`)៖ លក្ខខណ្ឌការពារដូចគ្នានេះសម្គាល់
  ការតភ្ជាប់ទៅក្នុងសំណុំ `exhaustedConnections` ក្នុងអង្គចងចាំ ដោយប្រើ
  `${provider}:${connectionId}` ជាគន្លឹះ។ វារំលងតែគោលដៅ SAME-REQUEST ដែលនៅសល់
  ហើយ _គោលដៅនោះផ្ទាល់មាន `connectionId` ដូចគ្នាពិតប្រាកដនោះរួចហើយ_ នៅលើ
  វត្ថុគោលដៅរបស់ខ្លួន (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` មុនការស្វែងរកក្នុង `exhaustedConnections`) — បន្សំបញ្ជីម៉ូដែលធម្មតា
  ដែលគោលដៅរួមមិនមាន `connectionId` ដែលបានកំណត់ជាប់ផ្ទាល់ខ្លួន ហើយតម្លៃមួយត្រូវបាន
  ដោះស្រាយតែក្នុងការបញ្ជូននីមួយៗពី header `X-OmniRoute-Selected-Connection-Id`
  របស់ការឆ្លើយតប នឹងមិនត្រូវនឹងគន្លឹះនោះឡើយ។ សម្រាប់ករណីទូទៅនេះ ការការពារពិតប្រាកដ
  ប្រឆាំងនឹងជំហាននៅសល់ដែលប្រើគណនីទើបតែអស់កូតាឡើងវិញ មិនមែនជា Set នេះទេ —
  វាគឺជាស្រទាប់រក្សាទុកខាងលើ (`rateLimitedUntil` របស់ការតភ្ជាប់ឥឡូវស្ថិតនៅពេលអនាគត)
  រួមជាមួយលក្ខខណ្ឌការពារដូចគ្នានេះ ដែលទប់ស្កាត់ `transientRateLimitedProviders`
  សម្រាប់ការបរាជ័យ (សូមមើល "ការរចនាពីរដំណាក់កាល" និងមតិយោបល់ក្នុងកូដលើសាខា
  `isAgentrouterConnectionQuotaScope` ក្នុង `targetExhaustion.ts`)៖ ដោយទុក Set
  នោះឱ្យមិនបានសម្គាល់ ការអនុញ្ញាតដោយបង្ខំតាមរយៈ `allowRateLimitedConnection`
  របស់ `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  នឹងមិនដំណើរការសម្រាប់ជំហាននៅសល់របស់អ្នកផ្តល់សេវាទេ ដូច្នេះតម្រង
  `rateLimitedUntil` របស់ការជ្រើសរើសព័ត៌មានសម្ងាត់
  (`src/sse/services/auth.ts:1238`) ត្រូវបានគោរពតាមធម្មតា ហើយជំហាននៅសល់នឹង
  ជ្រើសរើសការតភ្ជាប់ agentrouter ផ្សេងដែលនៅតែអាចប្រើបាន ឬបរាជ័យដោយសារ
  គ្មានព័ត៌មានសម្ងាត់ដែលអាចប្រើបាន — វានឹងមិនបង្ខំខ្លួនឯងឱ្យត្រឡប់ទៅប្រើ
  ការតភ្ជាប់ដែលសាខានេះទើបតែផ្អាកនោះទេ។

### ការរចនាពីរដំណាក់កាល៖ កំណត់ស្ថានភាពឡើងវិញ បន្ទាប់មកធ្វើចំណាត់ថ្នាក់

ការកំណត់ស្ថានភាពឡើងវិញ (`upstreamStatusRestatement.ts`) និងច្បាប់ចំណាត់ថ្នាក់
អ្នកផ្តល់សេវា (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) គឺជាបញ្ជីចុះឈ្មោះដាច់ដោយឡែកពីគ្នា ដែលទាំងពីរប្រើ
លេខសម្គាល់អ្នកផ្តល់សេវា និងសញ្ញាសម្គាល់អត្ថបទជាគន្លឹះ ប៉ុន្តែពួកវាដំណើរការ
នៅកន្លែងផ្សេងគ្នា និងបម្រើគោលបំណងផ្សេងគ្នា៖ ការកំណត់ឡើងវិញសរសេរស្ថានភាព
HTTP ឡើងវិញនៅដំណាក់កាលដំបូងក្នុង `chatCore.ts`; ច្បាប់ចំណាត់ថ្នាក់ជ្រើសរើស
`reason` បម្រុង និង `scope` នៃការចាក់សោ
(`model` / `provider` / `connection`) នៅក្នុង `checkFallbackError()`
(`open-sse/services/accountFallback.ts`)។

ច្បាប់ចំណាត់ថ្នាក់អាចមើលឃើញតែ **អត្ថបទ** កំហុសពេញលេញប៉ុណ្ណោះ (ដែលចាំបាច់
ដើម្បីផ្គូផ្គងសញ្ញាសម្គាល់ក្នុង body ដូចជា `额度不足`) សម្រាប់អ្នកផ្តល់សេវា
ដែលបានរាយក្នុងបញ្ជីអនុញ្ញាត `FULL_TEXT_RULE_PROVIDERS` នៅក្នុង
`providerErrorRules.ts` — បច្ចុប្បន្នមានតែ `"agentrouter"` ប៉ុណ្ណោះ។ សម្រាប់
អ្នកផ្តល់សេវា **កាតាឡុកដែលភ្ជាប់មកស្រាប់** ផ្សេងទៀតទាំងអស់
`checkFallbackError` បញ្ជូនតែកំហុសមានរចនាសម្ព័ន្ធ (`{code, type}`) ទៅឱ្យ
`getProviderErrorRuleMatch` ដែលគ្រប់គ្រាន់សម្រាប់ច្បាប់ផ្អែកលើ
header/ស្ថានភាព/កូដ ប៉ុន្តែមិនអាចមើលឃើញសញ្ញាសម្គាល់អត្ថបទក្នុង body បានទេ។
អនុគមន៍ជំនួយ `resolveRuleMatchBody()` ធ្វើការជ្រើសរើសនេះ៖ អត្ថបទកំហុសពេញលេញ
សម្រាប់អ្នកផ្តល់សេវាក្នុងបញ្ជីអនុញ្ញាត និងកំហុសមានរចនាសម្ព័ន្ធសម្រាប់អ្នកផ្តល់
សេវាផ្សេងទៀត។ ការបន្ថែមអ្នកផ្តល់សេវា **ដែលភ្ជាប់មកស្រាប់** ទៅក្នុង
`FULL_TEXT_RULE_PROVIDERS` គឺជាការយល់ព្រមប្រើប្រាស់ជាក់លាក់សម្រាប់អ្នកផ្តល់
សេវានីមួយៗ — វាមានឡើងដើម្បីធានាថា ផ្លូវលំនាំដើមសម្រាប់អ្នកផ្តល់សេវាទាំងអស់
ដែលមិនមានក្នុងបញ្ជី នៅតែមិនផ្លាស់ប្តូរសូម្បីតែមួយ byte។

`scope` របស់ច្បាប់មួយ (`model` / `provider` / `connection`) គឺជាការយល់ព្រម
ប្រើប្រាស់ដាច់ដោយឡែកពី `FULL_TEXT_RULE_PROVIDERS`៖ `checkFallbackError`
គ្រាន់តែបង្ហាញវាជា `fallbackResult.ruleScope` ហើយអ្នកប្រើប្រាស់បន្តនៅខាងក្រោម
នឹងគោរពវាជាអ្វីលើសពីស្លាកផ្តល់ព័ត៌មាន តែសម្រាប់អ្នកផ្តល់សេវាក្នុងបញ្ជីអនុញ្ញាត
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` នៅក្នុងឯកសារដូចគ្នាប៉ុណ្ណោះ (គ្រប់គ្រងតាម
`honorsRuleLockScope()` — បច្ចុប្បន្នមានតែ `"agentrouter"`)។ សូមមើល
"កំហុសកូតាដែលបានកំណត់ស្ថានភាពឡើងវិញ" ខាងលើ សម្រាប់អ្វីដែលការផ្គូផ្គង
`scope: "connection"` ពិតជាធ្វើ បន្ទាប់ពីអ្នកផ្តល់សេវាមួយស្ថិតក្នុង
បញ្ជីអនុញ្ញាតនោះ។

**#11104 — ច្បាប់ដែលប្រតិបត្តិករបានប្រកាស ឆ្លងកាត់បញ្ជីអនុញ្ញាតទាំងពីរ។**
ប្រតិបត្តិករអាចប្រកាសច្បាប់តាមអ្នកផ្តល់សេវានីមួយៗនៅពេលដំណើរការ តាមរយៈ
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ដោយមិនចាំបាច់កែសម្រួលឯកសារនេះ។ ការដាក់ច្បាប់របស់ប្រតិបត្តិករនៅក្រោមការគ្រប់គ្រង
របស់ `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` —
ដែលជាបញ្ជីអនុញ្ញាតបង្កើតឡើងដើម្បីការពារឥរិយាបថ **លំនាំដើម** របស់ច្បាប់កាតាឡុក
ដែលភ្ជាប់មកស្រាប់ — នឹងធ្វើឱ្យយន្តការកំណត់នេះគ្មានប្រសិទ្ធភាពសម្រាប់អ្នកផ្តល់
សេវាទាំងអស់ លើកលែងតែអ្នកផ្តល់សេវាដែលមានក្នុងបញ្ជីនោះរួចហើយ ពីព្រោះការប្រកាស
ច្បាប់គឺជាការយល់ព្រមប្រើប្រាស់ជាក់លាក់របស់ប្រតិបត្តិកររួចទៅហើយ។
`resolveRuleMatchBody()` និង `honorsRuleLockScope()` ទាំងពីរពិនិត្យ
`hasOperatorRuleForProvider()` ជាមុន៖ អ្នកផ្តល់សេវាដែលមានច្បាប់របស់ប្រតិបត្តិករ
នឹងទទួលបានអត្ថបទកំហុសដើម និងអនុវត្តតាម `scope` ដែលបានប្រកាសរបស់វា
ដោយមិនគិតថាវាមានក្នុងបញ្ជីអនុញ្ញាតណាមួយឬអត់នោះទេ។

**ចន្លោះខ្វះខាតដែលបានដឹង — `providerRuleRegistry` មិនត្រូវបានពិគ្រោះសម្រាប់ HTTP 400 ឡើយ។**
សាខា `BAD_REQUEST` របស់ `checkFallbackError` ធ្វើចំណាត់ថ្នាក់ស្ថានភាព 400
ទាំងស្រុងតាមរយៈអារេលំនាំរបស់វាផ្ទាល់ (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` ជាដើម ក្នុង `accountFallback.ts`) ហើយត្រឡប់លទ្ធផល
មុនពេលឈានដល់សាខា `configuredRule`/`getProviderErrorRuleMatch` ដែលស្ថិតនៅខាងលើ។
ច្បាប់កាតាឡុកដែលភ្ជាប់មកស្រាប់ (ឬច្បាប់របស់ប្រតិបត្តិករ) ដែលមាន `status: 400`
ត្រឹមត្រូវតាមវាក្យសម្ព័ន្ធ ប៉ុន្តែនឹងមិនដំណើរការឡើយ។ បច្ចុប្បន្នគ្មានច្បាប់ដែលមាន
គោលដៅជា 400 ទេ ដូច្នេះគ្មានអ្វីក្នុង production ត្រូវបានប៉ះពាល់ឡើយ — ប៉ុន្តែ
ច្បាប់ 400 នាពេលអនាគតតម្រូវឱ្យកែសម្រួលសាខានេះជាមុន ដែលជាការផ្លាស់ប្តូរធំជាង
ការបន្ថែមច្បាប់មួយ (វាធ្វើចំណាត់ថ្នាក់ 400 ឡើងវិញសម្រាប់អ្នកផ្តល់សេវាទាំងអស់
ដែលកំពុងពឹងផ្អែកលើឥរិយាបថអារេលំនាំ) ហើយវាស្ថិតនៅក្រៅវិសាលភាពនៃការបន្ថែមច្បាប់
សម្រាប់អ្នកផ្តល់សេវាតែមួយ។

### ការបន្ថែម gateway ដែលរាយការណ៍ quota ខុសថ្មី

1. ចុះឈ្មោះ rule array មួយក្នុង `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`)។ រក្សា `textMarkers`
   ឱ្យជាក់លាក់តាម provider នីមួយៗ; កុំប្រើឃ្លាភាសាអង់គ្លេសទូទៅឡើងវិញ
   ដែលប៉ះទង្គិចជាមួយ `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`)។
2. ជាជម្រើស ចុះឈ្មោះ rule ចំណាត់ថ្នាក់ក្នុង
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ដើម្បីជ្រើសរើស
   lock scope ត្រឹមត្រូវ (`connection` សម្រាប់ quota ទូទាំងគណនី, `model` សម្រាប់
   កំហុសតាម model)។ ជំហាននេះមានប្រសិទ្ធភាពក្នុង production សម្រាប់តែ provider
   ដែល rule របស់ពួកគេត្រូវការអត្ថបទកំហុសពេញលេញ (body markers)៖ បន្ថែម
   provider id ទៅក្នុង `FULL_TEXT_RULE_PROVIDERS` ក្នុងឯកសារដូចគ្នា — បើមិនដូច្នោះទេ
   `checkFallbackError` ផ្តល់ឱ្យ rule តែកំហុសដែលមានរចនាសម្ព័ន្ធ
   `{code, type}` ប៉ុណ្ណោះ ហើយ rule ដែលផ្អែកលើអត្ថបទ body នឹងមិនដែល
   ត្រូវគ្នាជាមួយ traffic ពិតប្រាកដទេ។ Rule ដែលត្រូវគ្នាដោយសុទ្ធសាធ្យលើ
   `status`/`headers` (ដូចរបស់ Opencode ឬ Minimax) មិនចាំបាច់
   opt-in នេះទេ។ ដោយឡែក ប្រសិនបើ rule ប្រកាស
   `scope: "connection"` ហើយចេតនាគឺ cooldown ទូទាំង connection ពិតប្រាកដ
   បូកនឹង combo skip ក្នុងសំណើដូចគ្នា (មិនមែនគ្រាន់តែស្លាកព័ត៌មានទេ) សូមបន្ថែម
   provider id ទៅក្នុង `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ក្នុងឯកសារដូចគ្នា —
   នេះជាអ្វីដែលគ្រប់គ្រងការប្រើប្រាស់បែប `isAgentrouterConnectionQuotaScope()`
   ក្នុង `markAccountUnavailable()` (`src/sse/services/auth.ts`) និង
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); បើគ្មានវា `scope`
   នៅតែហូរតាម `fallbackResult.ruleScope` ប៉ុន្តែគ្មានអ្វីធ្វើសកម្មភាពលើវាទេ។
3. បន្ថែម unit test ដែលធ្វើតាម `tests/unit/upstream-status-restatement.test.ts`
   និង `tests/unit/agentrouter-error-rules.test.ts` (រួមទាំង guard
   not-permanent / not-creditsExhausted និង — ប្រសិនបើ provider ត្រូវការ
   allowlist — test ដែលអះអាងថា `resolveRuleMatchBody()` ត្រឡប់អត្ថបទពេញលេញ
   សម្រាប់តែ provider នោះប៉ុណ្ណោះ)។

មិនចាំបាច់ផ្លាស់ប្តូរ `chatCore.ts`, `classifyError` ឬ combo ទេ។

#### Lock តាម egress bucket (#10880)

Provider ក្នុង `EGRESS_BUCKETED_LOCK_PROVIDERS` (ក្រុម opencode) ត្រូវបាន
ចាត់ទុកថាជា upstream ដែល bucket តាម IP (free tier របស់ opencode គឺ bucket តាម
IP មិនមែនតាមគណនីទេ — សូមមើល #9611)៖ status-429 ដែលត្រូវបានចំណាត់ថ្នាក់ជា
`quota_exhausted` **ឬ** `rate_limit_exceeded` ធ្វើ cooldown connection ទាំងអស់
ក្នុងក្រុមដែលស្ថិតក្នុង allowlist ដែល egress IP ចុងក្រោយដែលស្គាល់ត្រូវនឹងរបស់
connection ដែលបរាជ័យ មុនពេល rotation អាចសាកល្បងពួកវា
— ជៀសវាងការហៅ upstream ដែលប្រាកដជាបរាជ័យ N-1 ដង (ទម្រង់ដូចគ្នានឹង
#10460/#10525)។
`rate_limit_exceeded` ត្រូវបានរួមបញ្ចូលដោយចេតនា៖ នៅលើផ្លូវ `markAccountUnavailable`
rule ជាក់លាក់របស់ opencode មិនដែលត្រូវគ្នាទេ (គ្មាន headers/body ផ្តល់ឱ្យ
`checkFallbackError`, opencode មិនស្ថិតក្នុង `FULL_TEXT_RULE_PROVIDERS`) ដូច្នេះ 429
ដែល body របស់វាមានអត្ថបទ quota ជាវប្រចាំ ("monthly usage limit
reached") ត្រូវបានចំណាត់ថ្នាក់ជា `quota_exhausted` ដោយ quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown ១ ម៉ោង) មុនពេល
rule `status_429` ត្រូវបានឈានដល់ — ខណៈដែល 429 ដែលគ្មានអត្ថបទ quota
(rate limiting ធម្មតា) ចំណាត់ថ្នាក់តាម rule `status_429` ជា `rate_limit_exceeded`
ហើយនៅតែធ្វើ cooldown ក្រុម IP។ សម្រាប់ provider ដែលស្ថិតក្នុង allowlist
rate limit ដែល bucket តាម IP គឺជាសញ្ញាដូចគ្នានឹង quota ដែលអស់។ ដែនកំណត់ដោយស្មោះត្រង់៖

- **ការខិតខំអស់ពីសមត្ថភាព (best-effort)**: lock នេះដោះស្រាយ `egress_ip`
  ចុងក្រោយបង្អស់ដែលបានស្គាល់របស់ connection ពី `proxy_logs` (បង្អួច 24 ម៉ោង,
  synchronous, គ្មាន cache)។ cache ត្រជាក់ (egress IP មិនធ្លាប់ត្រូវបាន probe)
  ឬគ្មាន row → connection ដែលបរាជ័យនៅតែត្រូវបានដាក់ cooldown ដោយ branch
  (កត់ត្រាដូចសព្វថ្ងៃដដែល) គ្រាន់តែគ្មាន sibling ណាមួយត្រូវបាន lock ប៉ុណ្ណោះ។
- **មិនដែលជា terminal**: cooldown គឺជា quota window ដែលបន្តថ្មីដោយខ្លួនឯង
  (`testStatus: "unavailable"`); ស្ថានភាពអចិន្ត្រៃយ៍មិនដែលត្រូវបានសន្និដ្ឋានពី
  សញ្ញាកម្រិត IP ឡើយ។ connection ដែលមាន `disableCooling` រំលង branch នេះទាំងស្រុង។
- **Granularity នៃ lock ផ្លាស់ប្តូរសម្រាប់ក្រុមដែលស្ថិតក្នុង allowlist**: នេះគឺជា
  ការផ្លាស់ប្តូរ scope មិនមែនគ្រាន់តែជាការបង្កើនប្រសិទ្ធភាពកម្រិត sibling ទេ។
  opencode គឺជា provider ប្រភេទ `passthroughModels` ដូច្នេះមុនពេលមាន branch នេះ
  429 មួយបានបង្កើតជា lockout កម្រិតម៉ូដែលនីមួយៗ; ឥឡូវវាបង្កើតជា connection
  cooldown — រួមទាំងសម្រាប់ operator ដែលដំណើរការ connection តែមួយដោយគ្មាន
  sibling ទាល់តែសោះផង។ នោះគឺជា granularity ដែលតារាង rule របស់ opencode បាន
  ប្រកាសរួចហើយថាត្រឹមត្រូវ (`scope: "connection"`, `providerErrorRules.ts`)
  តែមិនធ្លាប់ត្រូវបានអនុវត្តតាមមកទល់ពេលនេះ ពីព្រោះ opencode មិនស្ថិតក្នុង
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`។ branch នេះសរសេរ cooldown + `backoffLevel`
  របស់ connection ដែលបរាជ័យដោយខ្លួនឯង ដោយធ្វើត្រាប់តាម branch របស់ agentrouter
  ដែលមាន scope កម្រិត connection ហើយបន្ទាប់មក return — ការ block កម្រិតម៉ូដែល
  និង path ទូទៅខាងក្រោមមិនដែលត្រូវបានទៅដល់ឡើយ។
- **រួមបញ្ចូល combo ផងដែរ**: ដូច branch របស់ agentrouter ដែរ scope នេះដោយចេតនា
  មិនខ្វល់នឹងការ downgrade `persistUnavailableState`/`isCombo` ដែល combo caller
  អនុវត្តលើ 429 ទេ។ lockout កម្រិតម៉ូដែលនីមួយៗមិនមែនជាទម្រង់ដែលខ្សោយជាងនៃ scope
  នេះទេ វាគឺជាឯកតាដែលខុស: វាមិនប្រាប់អ្វីអំពី IP ដែលអស់សមត្ថភាពឡើយ ដូច្នេះ
  combo rotation នឹងបន្តខ្ជះខ្ជាយការហៅមួយដែលប្រាកដជាបរាជ័យក្នុងមួយ sibling ៗ។
- **សុវត្ថិភាព sibling**: sibling ដែលស្ថិតក្នុងស្ថានភាព terminal រួចហើយ
  (banned/credits_exhausted) ឬកំពុងស្ថិតក្នុង cooldown ដែលវែងជាងរួចហើយ
  មិនដែលត្រូវបានសរសេរជាន់ឡើយ។
- **Allowlist ផ្តាច់មុខ**: ការពង្រីក `EGRESS_BUCKETED_LOCK_PROVIDERS` គឺជា
  ការសម្រេចចិត្តដោយច្បាស់លាស់របស់ម្ចាស់; គ្មាន wiring ទូទៅ
  (pattern #10334/#10419) ឡើយ។ query សម្រាប់ sibling បង្ភ្ជាប់ allowlist ដដែលនោះ
  ជំនួសឱ្យការសរសេរវាដដែលៗជា SQL literal ដូច្នេះការពង្រីកវានៅតែជាការផ្លាស់ប្តូរ
  តែមួយបន្ទាត់ប៉ុណ្ណោះ។
- **ការប្តូរវេន egress IP ទាំងពីរទិស**: បង្អួច lookup (24 ម៉ោង) ធំទូលាយជាង
  TTL នៃ cache egress-IP (5 នាទី) ច្រើន ដូច្នេះ "IP ចុងក្រោយដែលបានស្គាល់" គឺជា
  ប្រវត្តិសាស្ត្រ មិនមែនស្ថានភាពបច្ចុប្បន្នទេ។ បើ proxy របស់ connection មួយបាន
  ប្តូរវេនក្នុងបង្អួចនោះ lock អាច **ខាន** IP ដែលចែករំលែកគ្នាពិតប្រាកដមួយ
  (IP ដែលបានកត់ត្រាគឺជា IP ថ្មីដែលមិនទាន់អស់សមត្ថភាព) — ហើយតាមលក្ខណៈស៊ីមែទ្រី
  វាក៏អាច **ដាក់ cooldown លើ sibling មួយដែលបានប្តូរវេនចេញពី** IP ដែលអស់
  សមត្ថភាពរួចហើយដែរ។ ករណីទីពីរធ្វើឱ្យ sibling នោះខាតបង់មួយបង្អួច cooldown;
  ទាំងពីរករណីត្រូវបានទទួលយកជាដែនកំណត់ best-effort នៃ lookup ដែលផ្អែកលើប្រវត្តិ។
- **តម្លៃ**: ការ scan ដែលមានដែនកំណត់ពីរលើ `proxy_logs` (ត្រងតាមបង្អួចដោយប្រើ
  `idx_pl_timestamp`) តែក្នុងប្រេកង់ 429 ប៉ុណ្ណោះ។ គ្មាន index ថ្មីទេ
  (migration 134 YAGNI)។ បានវាស់វែងលើច្បាប់ចម្លង DB ដែលមាន traffic ពិតប្រាកដ
  ទំហំមធ្យម; instance ដែលមាន throughput ខ្ពស់កាន់ row ច្រើនជាងតាមសមាមាត្រ
  ក្នុងបង្អួចដដែល។

---

## លក្ខណៈពិសេស Resilience ផ្សេងៗទៀត

- **យុទ្ធសាស្ត្រ routing ចំនួន 21** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — សូមមើល [AUTO-COMBO.md](../routing/AUTO-COMBO.md)។
- **Reset-aware routing** (v3.8.0) — ផ្តល់អាទិភាព connection តាមពេលវេលា reset quota។
- **Background mode degradation** — Responses API `background: true` ត្រូវបានបន្ថយកម្រិតទៅជា sync ជាមួយការព្រមាន។
- **Dynamic tool limit detection** — ថយក្រោយ (back off) provider នៅពេលដែនកំណត់ចំនួន tool ត្រូវបានឈានដល់។
- **Emergency fallback** — ត្រូវបានគ្រប់គ្រងដោយ `OMNIROUTE_EMERGENCY_FALLBACK`; អ្នកប្រតិបត្តិអាច override វាបានពីទំព័រ Feature Flags ដោយមិនចាំបាច់ restart។

---

## ការ Debug

- Weighted combo ឆ្លើយតប `503 all_targets_cooling_down` (`Retry-After` ត្រូវបានកំណត់, `diagnostics.excluded` រាយគ្រប់ target ជាមួយ `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool ត្រូវបានកំណត់រចនាសម្ព័ន្ធ និងភ្ជាប់រួចរាល់ គ្រាន់តែគ្រប់ target សុទ្ធតែត្រូវបានដកចេញដោយ resilience timer ប៉ុណ្ណោះ; ការព្រមាន `[COMBO] Weighted selection: every target excluded before dispatch — …` បញ្ជាក់ពីមូលហេតុ និងចំនួនវិនាទីដែលនៅសល់។ `404 no_executable_targets` ពី combo ដដែលមានន័យថា គ្មាន resilience timer ណាមួយពាក់ព័ន្ធទេ (គ្មានអ្វីត្រូវដំណើរការ ឬគ្រប់ account បានបរាជ័យក្នុង availability probe)។ សាងសង់នៅក្នុង `open-sse/services/combo/pinRecovery.ts` ពីការដកចេញដែលប្រមូលបានក្នុង `targetResolution.ts`។
- គ្រប់ key សម្រាប់ provider មួយត្រូវបានរំលង → ពិនិត្យទាំង state របស់ circuit breaker និង `rateLimitedUntil`/`testStatus` របស់ connection នីមួយៗ។
- Provider ត្រូវបានដកចេញជាអចិន្ត្រៃយ៍បន្ទាប់ពី reset window → code កំពុងអាន `state` ដោយផ្ទាល់ ជំនួសឱ្យការប្រើ `getStatus()`/`canExecute()`។
- Key មួយបរាជ័យ ប៉ុន្តែ key ផ្សេងទៀតគួរតែដំណើរការ → ពិចារណា connection cooldown ជាង circuit breaker។
- មានតែ model មួយប៉ុណ្ណោះដែលបរាជ័យ → ពិចារណា model lockout ជាង connection cooldown។
- State គួរតែស្តារខ្លួនឯងបាន ប៉ុន្តែមិនស្តារ → ពិនិត្យមើល timestamp នាពេលអនាគត + read path ដែល refresh state ដែលផុតកំណត់។ Status អចិន្ត្រៃយ៍ត្រូវការការកែប្រែដោយដៃ។

---

## State នៅ runtime — ឯកសារយោងរហ័សសម្រាប់ agent

> ផ្ទេរមកដោយរក្សាពាក្យដដែលពី `AGENTS.md` → "Resilience Runtime State" (PR #12743) ដើម្បីឱ្យមគ្គុទ្ទេសក៍
> agent នៅក្រោមថវិកា context 40k។ នេះជាទិដ្ឋភាពសង្ខេបសម្រាប់ agent នៃ
> ផ្នែកខាងលើ; ផ្នែកដែលមានលេខរៀងនៅតែជាឯកសារយោងពេញលេញ។

OmniRoute មានយន្តការបរាជ័យបណ្តោះអាសន្នបី ដែលទាក់ទងគ្នាប៉ុន្តែខុសគ្នា។ រក្សា
scope របស់ពួកវាឱ្យដាច់ពីគ្នា នៅពេល debug អាកប្បកិរិយា routing។ សូមមើល
[គំនូសតាង resilience 3 ជាន់](../diagrams/exported/resilience-3layers.svg)
(ប្រភព: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
សម្រាប់ផែនទីសង្ខេបមើលភ្លាមៗ។

### Provider Circuit Breaker

**វិសាលភាព**: គ្រប់ provider ទាំងមូល ឧ. `glm`, `openai`, `anthropic`។

**គោលបំណង**: បញ្ឈប់ការផ្ញើ traffic ទៅកាន់ provider ដែលកំពុងបរាជ័យដដែលៗនៅកម្រិត
upstream/service ដើម្បីកុំឱ្យ provider មិនល្អមួយធ្វើឱ្យរាល់ request យឺត។

**ការអនុវត្ត**:

- ថ្នាក់ស្នូល: `src/shared/utils/circuitBreaker.ts`
- ការភ្ជាប់ gate/execution របស់ chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ស្ថានភាព runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper រួម: `open-sse/services/accountFallback.ts`
- តារាង state ដែលបានរក្សាទុក: `domain_circuit_breakers`

**State** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: អនុញ្ញាត traffic ធម្មតា។
- `DEGRADED`: តំបន់ព្រមានលឿន — ការបរាជ័យបានឆ្លងកាត់ degradation threshold ប៉ុន្តែមិនទាន់ដល់
  breaker threshold នៅឡើយ; traffic នៅតែហូរ ហើយ dashboard បង្ហាញការព្រមាន។ ការធ្វើតេស្ត connection
  ដែលត្រឹមត្រូវ ឬ window ស្ងប់ស្ងាត់ដោយគ្មានការបរាជ័យថ្មី នឹងបង្វិលវាទៅ `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` មាន window នោះ)។
- `OPEN`: provider ត្រូវបានរារាំងបណ្តោះអាសន្ន; caller ទទួលបាន response ប្រភេទ
  provider-circuit-open ឬ combo routing រំលងទៅ target ផ្សេង។
- `HALF_OPEN`: reset timeout បានកន្លងផុតទៅ; អនុញ្ញាត probe request មួយ។ ជោគជ័យបិទ
  breaker បរាជ័យបើកវាម្តងទៀត។

**តម្លៃលំនាំដើម** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES` ប្រើប្រាស់តាម
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` ក្នុង `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` ក្នុង `src/sse/handlers/chatHelpers.ts`)។ Breaker
ថ្នាក់ provider ទាំងមូលដំណើរការលើ `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profile |   ថយចុះនៅ | បើកនៅ (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | --------: | --------------------------------: | ----------------------------: |
| OAuth   |       `5` |                               `8` |                         `60s` |
| API key |       `7` |                              `12` |                         `30s` |
| Local   | (គណនាចេញ) |                               `2` |                         `15s` |

`PROVIDER_PROFILES` ក៏កំណត់ `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 នាទី) និង `providerCooldownMs` (5/10/1 នាទី) ផងដែរ: ទាំងនេះផ្តល់ថាមពលដល់
**window gate នៃ Provider Cooldown ជាជម្រើស opt-in ថ្នាក់សាកល** (`PROVIDER_COOLDOWN_ENABLED` លំនាំដើម
បិទ) — entry ថ្នាក់ provider ក្នុង `open-sse/services/providerCooldownTracker.ts` ចាត់ទុកថាកំពុង
cool បានក៏តែបន្ទាប់ពីការបរាជ័យចំនួន `providerFailureThreshold` ដងក្នុងរយៈពេល `providerFailureWindowMs` ហើយបន្ទាប់មក
cool រយៈពេល `providerCooldownMs`។ ពួកវាមិនមែនជា threshold របស់ breaker ដែលកំពុងដំណើរការទេ — កុំ tune ពួកវា
ដោយរំពឹងអាកប្បកិរិយារបស់ breaker។ តម្លៃលំនាំដើមទាំងអស់អាច override បានតាម
env var `OMNIROUTE_PROVIDER_BREAKER_*` និង `OMNIROUTE_CIRCUIT_BREAKER_*`;
តារាងយោងដែលត្រឹមត្រូវតាម runtime ស្ថិតនៅក្នុង `docs/architecture/RESILIENCE_GUIDE.md`។

មានតែ status បរាជ័យថ្នាក់ provider ប៉ុណ្ណោះដែលគួរ trip provider breaker:

```ts
(408, 500, 502, 503, 504);
```

កុំ trip breaker ថ្នាក់ provider ទាំងមូលសម្រាប់កំហុស account/key/model ធម្មតា ដូចជា
ករណី `401`, `403` ឬ `429` ភាគច្រើន។ ពួកនោះជាធម្មតាស្ថិតក្រោមការទទួលខុសត្រូវរបស់ connection cooldown ឬ model
lockout។ `403` របស់ API-key provider ទូទៅគួរតែអាចស្តារបាន លុះត្រាតែវាត្រូវបានចាត់ថ្នាក់
ជាកំហុស provider/account ប្រភេទ terminal។

breaker ប្រើការស្តារឡើងវិញបែប lazy មិនមែនប្រើ background timer ទេ។ នៅពេល `OPEN` ផុតកំណត់ ការអានដូចជា `getStatus()`, `canExecute()` និង `getRetryAfterMs()` នឹង refresh ស្ថានភាពទៅជា `HALF_OPEN` ដូច្នេះ dashboard និង combo candidate builder មិនបន្តដកចេញ provider ដែលផុតកំណត់ជាអចិន្ត្រៃយ៍ទេ។

### Cooldown តំណភ្ជាប់

**វិសាលភាព**: តំណភ្ជាប់/គណនី/key របស់ provider មួយ។

**គោលបំណង**: រំលង key/គណនីដែលមានបញ្ហាមួយជាបណ្តោះអាសន្ន ខណៈដែលអនុញ្ញាតឱ្យតំណភ្ជាប់ផ្សេងទៀតសម្រាប់ provider ដដែលបន្តបម្រើសំណើ។

**ការអនុវត្ត**:

- ផ្លូវសរសេរ/ធ្វើបច្ចុប្បន្នភាព: `src/sse/services/auth.ts::markAccountUnavailable()`
- ការជ្រើសរើស/តម្រងគណនី: `src/sse/services/auth.ts::getProviderCredentials...`
- ការគណនា cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ការកំណត់: `src/lib/resilience/settings.ts`

Field សំខាន់ៗលើតំណភ្ជាប់ provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ក្នុងអំឡុងការជ្រើសរើសគណនី តំណភ្ជាប់ត្រូវបានរំលង នៅពេល:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown ក៏ជាបែប lazy ដែរ៖ នៅពេល `rateLimitedUntil` កន្លងផុតទៅហើយ តំណភ្ជាប់នឹងមានសិទ្ធិឡើងវិញ។ នៅពេលប្រើប្រាស់បានជោគជ័យ `clearAccountError()` នឹងសម្អាត `testStatus`, `rateLimitedUntil`, field កំហុស និង `backoffLevel`។

អាកប្បកិរិយា cooldown តំណភ្ជាប់លំនាំដើម:

- Cooldown មូលដ្ឋាន OAuth: `5s`។
- Cooldown មូលដ្ឋាន API-key: `3s`។
- API-key `429` គួរផ្តល់អាទិភាពលើ retry hint ពី upstream (`Retry-After`, reset header ឬអត្ថបទ reset ដែលអាច parse បាន) នៅពេលមាន។
- ការបរាជ័យដែលអាចស្តារបាន ដែលកើតឡើងដដែលៗ ប្រើ exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

ការការពារ anti-thundering-herd បង្ការការបរាជ័យ concurrent លើតំណភ្ជាប់ដដែល មិនឱ្យពង្រីក cooldown ដដែលៗ ឬបង្កើន `backoffLevel` ទ្វេដង។

ស្ថានភាព terminal មិនមែនជា cooldown ទេ។ `banned`, `expired` (ដែលក្លាយជា terminal បន្ទាប់ពីការព្យាយាមឡើងវិញដែលមានដែនកំណត់ N ដងតាមរយៈ `EXPIRED_RETRY_MAX`) និង `credits_exhausted` មានគោលបំណងឱ្យនៅមិនអាចប្រើបាន រហូតដល់ credential/ការកំណត់ផ្លាស់ប្តូរ ឬ operator កំណត់ឡើងវិញ។ កុំសរសេរជាន់ស្ថានភាព terminal ដោយស្ថានភាព cooldown បណ្តោះអាសន្ន។

### Model Lockout

**វិសាលភាព**: provider + តំណភ្ជាប់ + model។

**គោលបំណង**: ជៀសវាងការបិទតំណភ្ជាប់ទាំងមូល នៅពេលមានតែ model មួយប៉ុណ្ណោះដែលមិនអាចប្រើបាន ឬត្រូវបានកំណត់ quota សម្រាប់តំណភ្ជាប់នោះ។

ឧទាហរណ៍:

- Provider ដែលមាន quota តាម model នីមួយៗ ដែល return `429`។
- Provider ក្នុងស្រុក (local) ដែល return `404` សម្រាប់ model ដែលបាត់មួយ។
- ការបរាជ័យសិទ្ធិ mode/model ជាក់លាក់របស់ provider ដូចជា Grok mode ដែលបានជ្រើសរើស។

Model lockout ស្ថិតនៅក្នុង `open-sse/services/accountFallback.ts` ហើយអនុញ្ញាតឱ្យតំណភ្ជាប់ដដែលបន្តបម្រើ model ផ្សេងទៀត។

### ការណែនាំអំពីការ Debug

- ប្រសិនបើ key ទាំងអស់សម្រាប់ provider ត្រូវបានរំលង សូមពិនិត្យទាំងស្ថានភាព breaker របស់ provider និង `rateLimitedUntil`/`testStatus` របស់តំណភ្ជាប់នីមួយៗ។
- ប្រសិនបើ provider ហាក់ដូចជាត្រូវបានដកចេញជាអចិន្ត្រៃយ៍បន្ទាប់ពី reset window សូមពិនិត្យមើលថាតើ code កំពុងអាន `state` ដោយផ្ទាល់ ជំនួសឱ្យការប្រើ `getStatus()`/`canExecute()` ឬទេ។
- ប្រសិនបើ key របស់ provider មួយបរាជ័យ ប៉ុន្តែ key ផ្សេងទៀតគួរដំណើរការ សូមផ្តល់អាទិភាព connection cooldown ជាង provider breaker។
- ប្រសិនបើមានតែ model មួយប៉ុណ្ណោះដែលបរាជ័យ សូមផ្តល់អាទិភាព model lockout ជាង connection cooldown។
- ប្រសិនបើស្ថានភាពមួយគួរស្តារឡើងវិញដោយខ្លួនឯង វាគួរមាន timestamp/reset timeout នាពេលអនាគត និងផ្លូវអានដែល refresh ស្ថានភាពដែលផុតកំណត់។ ស្ថានភាពអចិន្ត្រៃយ៍ត្រូវការការផ្លាស់ប្តូរ credential ឬ config ដោយដៃ។

---

## ការកំណត់អត្តសញ្ញាណ TLS និងការលាក់ខ្លួន

ការលាក់ខ្លួនតាមអ្នកផ្តល់សេវា (JA3/JA4, CCH, ការបិទបាំង) ត្រូវបានរៀបរាប់ដោយឡែក — សូមមើល `docs/security/STEALTH_GUIDE.md` (git; មិនត្រូវបានចងក្រងទៅក្នុង `/docs`).

---

## ការធ្វើតេស្តភាពធន់ (ដំណាក់កាល 8 · ប្លុក C)

លើសពីការធ្វើតេស្តឯកតាសម្រាប់តក្កវិជ្ជាភាពធន់ មានការធ្វើតេស្តចំនួនបីដែលសាកល្បងពេលដំណើរការក្រោម
ស្ថានភាពស្ត្រេស/បរាជ័យពិតប្រាកដ (ទាំងអស់ជាការធ្វើតេស្តរួមបញ្ចូល/ប្រចាំយប់ — គ្មានណាមួយរារាំង PR ទេ):

| ការធ្វើតេស្ត | អ្វីដែលធ្វើ                                                                                                                                                                                            | ការដំណើរការ                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Chaos        | ថ្នាំង upstream ក្លែងក្លាយបញ្ចូលភាពយឺត/ការកំណត់ឡើងវិញ/ការផុតពេល/503 ពិតប្រាកដ; ផ្ទៀងផ្ទាត់ថា circuit breaker បើក/សង្គ្រោះឡើងវិញ ហើយ `checkFallbackError` ចាត់ថ្នាក់ 503 ជា fallback ដែលអាចសង្គ្រោះបាន។ | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-growth  | ស្ទ្រីមប្រហែល 500 ក្នុងមួយ `createSSEStream` ក្រោម `--expose-gc`; បរាជ័យប្រសិនបើ heap លូតលាស់លើសដែនកំណត់ (ការការពារ OOM #3069)។                                                                        | `npm run test:heap`                        |
| k6 soak      | បន្ទុកបន្តបន្ទាប់ទៅ `/api/monitoring/health`; កម្រិត p95/កំហុស។                                                                                                                                        | `k6 run tests/load/k6-soak.js` (ប្រចាំយប់) |

រៀបចំដោយ `.github/workflows/nightly-resilience.yml` (cron + dispatch). នៅក្នុង
`test:integration` លំនាំដើម chaos និង heap រំលងខ្លួនឯង (ដោយគ្មាន `RUN_CHAOS_INT`/`--expose-gc`).

---

## សូមមើលផងដែរ

- [មគ្គុទ្ទេសក៍ស្ថាបត្យកម្ម](./ARCHITECTURE.md) — ស្ថាបត្យកម្មប្រព័ន្ធ និងផ្នែកខាងក្នុង
- [មគ្គុទ្ទេសក៍អ្នកប្រើ](../guides/USER_GUIDE.md) — អ្នកផ្តល់សេវា, combos, ការរួមបញ្ចូល CLI
- [ម៉ាស៊ីន Auto-Combo](../routing/AUTO-COMBO.md) — ការផ្ដល់ពិន្ទុ 16 កត្តា, mode packs
