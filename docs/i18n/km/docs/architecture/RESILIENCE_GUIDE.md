# Resilience Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute មានយន្តការធន់ទ្រាំចំនួនបីដែលដាច់ដោយឡែកពីគ្នា ប៉ុន្តែមានទំនាក់ទំនងគ្នា។ យន្តការនីមួយៗមានវិសាលភាព និងគោលបំណងខុសគ្នា។ សូមរក្សាពួកវាឱ្យដាច់ដោយឡែកពីគ្នា នៅពេលបំបាត់កំហុសឥរិយាបថនៃការកំណត់ផ្លូវ។

![ម៉ូដែលធន់ទ្រាំ 3 ស្រទាប់](../diagrams/exported/resilience-3layers.svg)

> ប្រភព៖ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. ឧបករណ៍ផ្តាច់សៀគ្វីរបស់អ្នកផ្តល់សេវា

**វិសាលភាព៖** អ្នកផ្តល់សេវាទាំងមូល (ឧ. `glm`, `openai`, `anthropic`)។

**គោលបំណង៖** បញ្ឈប់ការបញ្ជូនចរាចរទៅកាន់អ្នកផ្តល់សេវាដែលបរាជ័យម្តងហើយម្តងទៀតនៅកម្រិត upstream/សេវាកម្ម។

**ការអនុវត្ត៖**

- ថ្នាក់ស្នូល៖ `src/shared/utils/circuitBreaker.ts`
- ការតភ្ជាប់៖ `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ស្ថានភាព៖ `GET /api/monitoring/health`
- API កំណត់ឡើងវិញ៖ `POST /api/resilience/reset`
- Wrappers៖ `open-sse/services/accountFallback.ts`
- តារាង DB៖ `domain_circuit_breakers`

**ស្ថានភាព៖**

- `CLOSED` — អនុញ្ញាតចរាចរធម្មតា
- `DEGRADED` — នៅតែអនុញ្ញាតចរាចរ ប៉ុន្តែកំពុងតាមដានការបរាជ័យរបស់អ្នកផ្តល់សេវាដែលកើនឡើង
- `OPEN` — អ្នកផ្តល់សេវាត្រូវបានរារាំងជាបណ្តោះអាសន្ន; ការកំណត់ផ្លូវបែប combo នឹងរំលងវា
- `HALF_OPEN` — រយៈពេលរង់ចាំកំណត់ឡើងវិញបានកន្លងផុត; អនុញ្ញាតសំណើសាកល្បង

**តម្លៃលំនាំដើមដែលអាចកំណត់រចនាសម្ព័ន្ធបាន (`open-sse/config/constants.ts`, បង្ហាញនៅក្នុង Dashboard → Settings → Resilience)៖**

| ប្រភេទ  | ចូលស្ថានភាពខ្សោយនៅ  | បើកនៅ        | រយៈពេលរង់ចាំកំណត់ឡើងវិញ |
| ------- | ------------------- | ------------ | ----------------------- |
| OAuth   | បរាជ័យ 5 ដង         | បរាជ័យ 8 ដង  | 60s                     |
| API-key | បរាជ័យ 7 ដង         | បរាជ័យ 12 ដង | 30s                     |
| Local   | គណនាចេញពីតម្លៃផ្សេង | បរាជ័យ 2 ដង  | 15s                     |

`degradationThreshold` គ្រប់គ្រងពេលដែលអ្នកផ្តល់សេវាចូលស្ថានភាព `DEGRADED`; `failureThreshold` គ្រប់គ្រងពេលដែលវាបើក និងត្រូវបានរំលង។ ទម្រង់អ្នកផ្តល់សេវា Local មិនទាន់ត្រូវបានបង្ហាញនៅលើទំព័រការកំណត់ Resilience នៅឡើយទេ។

**កូដដែលបង្កឱ្យសៀគ្វីដំណើរការ៖** មានតែស្ថានភាពកម្រិតអ្នកផ្តល់សេវា `[408, 500, 502, 503, 504]` ប៉ុណ្ណោះ។ កុំឱ្យសៀគ្វីដំណើរការសម្រាប់កំហុសកម្រិតគណនី (ភាគច្រើនគឺ 401/403/429 — កំហុសទាំងនោះស្ថិតក្រោម cooldown ឬ lockout)។

**ការស្ដារឡើងវិញបែបខ្ជិល៖** នៅពេល `OPEN` ផុតកំណត់ `getStatus()`, `canExecute()`, `getRetryAfterMs()` នឹងធ្វើឱ្យស្ថានភាពទៅជា `HALF_OPEN` ឡើងវិញ។ មិនត្រូវការកម្មវិធីកំណត់ពេលនៅផ្ទៃខាងក្រោយទេ។

---

### Cooldown សកលរបស់អ្នកផ្តល់សេវាដែលត្រូវជ្រើសបើក (របាំង window)

ស្រទាប់ទីបួនដែល**ត្រូវជ្រើសបើក** (`PROVIDER_COOLDOWN_ENABLED`, លំនាំដើមគឺ**បិទ**) រក្សាទុក
ការចងចាំឆ្លងសំណើអំពីអ្នកផ្តល់សេវាដែលបរាជ័យនៅក្នុង
`open-sse/services/providerCooldownTracker.ts` ដែលត្រូវបានពិនិត្យដោយការដោះស្រាយគោលដៅ combo
ដើម្បីឱ្យសំណើ combo ជាបន្តបន្ទាប់ឈប់សាកល្បងអ្នកផ្តល់សេវាដែលទើបតែ
បរាជ័យឡើងវិញ។ ធាតុកម្រិតអ្នកផ្តល់សេវាគោរពតាមរបាំង window របស់ `PROVIDER_PROFILES`៖

| ទម្រង់  | ដំណើរការបន្ទាប់ពី (`providerFailureThreshold`) | ក្នុងរយៈពេល (`providerFailureWindowMs`) | cooldown រយៈពេល (`providerCooldownMs`) |
| ------- | ---------------------------------------------: | --------------------------------------: | -------------------------------------: |
| OAuth   |                                           `10` |                                 `15min` |                                 `5min` |
| API key |                                           `15` |                                 `30min` |                                `10min` |

នៅក្រោមកម្រិតកំណត់ អ្នកផ្តល់សេវា**មិន**ត្រូវបានចាត់ទុកថាកំពុង cooldown ទេ; ការជោគជ័យមួយនឹងសម្អាត
window។ ធាតុកម្រិតការតភ្ជាប់ (`provider:connectionId`) នៅតែរក្សា
ការពន្យារពេលកើនឡើងជាលំដាប់ `minRetryCooldownMs → maxRetryCooldownMs` ជំនួសវិញ។ តម្លៃជំនួស៖
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`។
ការការពារប្រឆាំង regression៖ `tests/unit/provider-cooldown-window-gate.test.ts`។

## 2. រយៈពេលរង់ចាំនៃការតភ្ជាប់

**វិសាលភាព:** ការតភ្ជាប់/គណនី/សោតែមួយរបស់អ្នកផ្តល់សេវា។

**គោលបំណង:** រំលងសោដែលមានបញ្ហាមួយ ខណៈដែលការតភ្ជាប់ផ្សេងទៀតសម្រាប់អ្នកផ្តល់សេវាដូចគ្នានៅតែបន្តបម្រើសំណើ។

**ការអនុវត្ត:**

- សម្គាល់ថាមិនអាចប្រើបាន: `src/sse/services/auth.ts::markAccountUnavailable()`
- ការជ្រើសរើស: `getProviderCredentials*` នៅក្នុងឯកសារដូចគ្នា
- ការគណនារយៈពេលរង់ចាំ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ការកំណត់: `src/lib/resilience/settings.ts`

**វាលសម្រាប់ការតភ្ជាប់នីមួយៗ:**

- `rateLimitedUntil` — ត្រាពេលវេលារហូតដល់រយៈពេលរង់ចាំផុតកំណត់
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — កម្មវិធីរាប់ថយក្រោយបែបអ៊ិចស្ប៉ូណង់ស្យែល

**រយៈពេលរង់ចាំលំនាំដើម:**

- មូលដ្ឋាន OAuth: 5s
- មូលដ្ឋាន API-key: 3s
- API-key 429: ផ្តល់អាទិភាពដល់ `Retry-After`/បឋមកថាកំណត់ឡើងវិញ/អត្ថបទកំណត់ឡើងវិញដែលអាចញែកបានពីប្រភពខាងលើ
- ការរង់ចាំថយក្រោយ: `baseCooldownMs * 2 ** failureIndex`

**របាំងការពារការសម្រុកសំណើដំណាលគ្នា:** រារាំងកំហុសដែលកើតឡើងដំណាលគ្នាមិនឱ្យពន្យាររយៈពេលរង់ចាំលើសកម្រិត ឬបង្កើន `backoffLevel` ពីរដង។

**ស្ថានភាពបញ្ចប់ (មិនមែនជារយៈពេលរង់ចាំទេ):**

- `banned` — កំណត់ដោយការរកឃើញពាក្យគន្លឹះដែលត្រូវបានហាមឃាត់ / ការហាមឃាត់គណនី (សូមមើល [BAN_DETECTION](../security/BAN_DETECTION.md)) និងដោយការបដិសេធក្នុងមួយសំណើពីប្រភពខាងលើចំនួនបីដងជាប់គ្នា (`request_rejected` ឧ. Anthropic OAuth 403 "សំណើមិនត្រូវបានអនុញ្ញាត" — `open-sse/services/requestRejectedStreak.ts`); ការបដិសេធតែមួយលើកគ្រាន់តែដាក់ការតភ្ជាប់ឱ្យស្ថិតក្នុងរយៈពេលរង់ចាំប៉ុណ្ណោះ
- `expired` (ផ្លាស់ទៅជាស្ថានភាពបញ្ចប់បន្ទាប់ពីព្យាយាមឡើងវិញក្នុងចំនួនកំណត់ — `EXPIRED_RETRY_MAX = 3` ជាមួយការរង់ចាំថយក្រោយបែបអ៊ិចស្ប៉ូណង់ស្យែល — ដូច្នេះកំហុស OAuth បណ្តោះអាសន្នអាចស្ដារដោយខ្លួនឯង មុនពេលគណនីត្រូវបានបិទដំណើរការជាអចិន្ត្រៃយ៍)
- `credits_exhausted`

ស្ថានភាពទាំងនេះនៅតែបន្តរហូតដល់ព័ត៌មានសម្ងាត់ផ្លាស់ប្តូរ ឬប្រតិបត្តិករកំណត់ពួកវាឡើងវិញ។ កុំសរសេរជាន់លើស្ថានភាពបញ្ចប់ដោយស្ថានភាពរង់ចាំបណ្តោះអាសន្ន។

**ការស្ដារឡើងវិញបែបខ្ជិល:** នៅពេល `rateLimitedUntil` បានកន្លងផុត ការតភ្ជាប់អាចត្រូវបានជ្រើសរើសម្តងទៀត។ នៅពេលប្រើប្រាស់ដោយជោគជ័យ `clearAccountError()` នឹងសម្អាតវាលកំហុសទាំងអស់។

### របាំងការប្រើប្រាស់ Claude OAuth: គន្លងអាទិភាពទាប + ការកំណត់កម្រិតសម័យឡើងវិញ

**វិសាលភាព:** ការតភ្ជាប់ការជាវ Claude (OAuth) មួយ។ មុខងារទាំងពីរគឺត្រូវតែ **ជ្រើសបើកតាម
ការតភ្ជាប់នីមួយៗ** (កែសម្រួលការតភ្ជាប់ → ផ្នែក Claude → `lowPriorityMode` / `autoLimitReset` ក្នុង
`providerSpecificData` ដែលទាំងពីរបិទតាមលំនាំដើម) និងចម្លងឥរិយាបថពាក្យបញ្ជា `/low-priority` និង
`/limit-reset` របស់ Claude Code (កិច្ចសន្យាទំនាក់ទំនងដែលបានកត់ត្រាពី Claude Code 2.1.263)។

**ការអនុវត្ត:**

- ម៉ាស៊ីនស្ថានភាព + ការចាត់ថ្នាក់ការឆ្លើយតប: `open-sse/services/claudeLowPriority.ts`
- កម្មវិធីអតិថិជនសម្រាប់ស្ថានភាព/ការទាមទារកំណត់ឡើងវិញ: `open-sse/services/claudeLimitReset.ts`
- ចំណុចភ្ជាប់កម្មវិធីប្រតិបត្តិ (ការបញ្ចូលបឋមកថា + ការព្យាយាមឡើងវិញលើគណនីដដែល): `open-sse/executors/base.ts::execute()`
- ការរក្សាទុកការជ្រើសបើក: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**កត្តាបង្ក:** របាំងការប្រើប្រាស់រយៈពេល 5 ម៉ោង — `429` ដែលបឋមកថារបស់វាមាន
`anthropic-ratelimit-unified-status: rejected` ហើយនៅពេលគណនីមានសិទ្ធិ
`anthropic-ratelimit-unified-slow-offer: treatment`។ គ្មានអ្វីត្រូវបានផ្ញើមុនពេលជួបរបាំង
429 ដំបូងនោះទេ; 429 ជាបន្តបន្ទាប់ដោយគ្មានបឋមកថារួម នឹងឆ្លងកាត់ផ្លូវរយៈពេលរង់ចាំធម្មតា។

**គន្លងអាទិភាពទាប** (`lowPriorityMode`):

- នៅពេលជួបរបាំង 429 កម្មវិធីប្រតិបត្តិទទួលយកការផ្តល់ជូន ហើយព្យាយាមភ្លាមៗម្តងទៀតលើគណនី
  **ដដែល** ជាមួយ `anthropic-usage-limit: slow`; គន្លងនេះនៅតែសកម្មរហូតដល់
  `anthropic-ratelimit-unified-reset` ដែលបានប្រកាស (+រយៈពេលអនុគ្រោះ 60s) ហើយរាល់សំណើក្នុងអំឡុងពេលនោះមាន
  បឋមកថានេះ។ 429 ដែលត្រូវបានស្ទាក់មិនដែលទៅដល់ `handleChatCore` ទេ ដូច្នេះការតភ្ជាប់
  **មិន** ត្រូវបានដាក់ក្នុងរយៈពេលរង់ចាំ ហើយក៏មិនត្រូវបានប្ដូរចេញដែរ។
- `anthropic-ratelimit-unified-slow-status` នៅលើការឆ្លើយតបបន្ទាប់ៗ: `active` / `not_needed`
  រក្សាគន្លងនេះឱ្យនៅដដែល; `slot_busy` (429) ឬ `529` រង់ចាំតាម
  `anthropic-ratelimit-unified-slow-retry-after` របស់ម៉ាស៊ីនមេ (លំនាំដើម 20s កំណត់ចន្លោះ 5–600s បម្រែបម្រួលចៃដន្យ ±30%)
  ហើយព្យាយាមឡើងវិញ ដោយត្រូវបានកម្រិតដោយ `anthropic-ratelimit-unified-slow-max-wait` (លំនាំដើម 20 នាទី កំណត់ចន្លោះ
  1 នាទី–6 ម៉ោង) — បន្ទាប់ពីលើសរយៈពេលនោះ គន្លងនឹងបញ្ចប់ ហើយរយៈពេលសម្រាក 10 នាទីរារាំងការទទួលយកម្តងទៀត។ រយៈពេល
  រង់ចាំក៏ត្រូវបានកំណត់បន្ថែមដោយពេលវេលាដែលនៅសល់នៃអស់ពេលកំណត់សម្រាប់ការចាប់ផ្តើមប្រភពខាងលើរបស់សំណើផ្ទាល់
  (`resolveFetchStartTimeout` ដែលលំនាំដើមគឺ 10 នាទី) ដករឹម 5 s៖ បើគ្មានកម្រិតនេះទេ
  រយៈពេលរង់ចាំអតិបរមាលំនាំដើម 20 នាទីនឹងយូរជាងអាយុកាលសំណើ ហើយការដេករង់ចាំនឹងត្រូវបោះបង់
  នៅពាក់កណ្ដាលការរង់ចាំ ដោយបង្ហាញ `TimeoutError` ជំនួសឱ្យការបញ្ចប់ `max_wait` ដោយរលូន + រយៈពេលសម្រាក។
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible` ការប្ដូរវដ្តបង្អួច 5h ឬ
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ដែលបញ្ចប់វាជា
  `extra_usage` នៅគ្រប់ស្ថានភាពទាំងអស់ ព្រោះការប្រើលើសដែលបានបង់ប្រាក់ឥឡូវគ្របដណ្ដប់របាំងនេះ) នឹងបញ្ចប់គន្លង; បន្ទាប់មក
  ការឆ្លើយតបនឹងបន្តទៅកាន់ផ្លូវរយៈពេលរង់ចាំធម្មតា។ `budget_exhausted` ត្រូវបានចងចាំរហូតដល់
  ការកំណត់ថវិកាឡើងវិញដែលបានប្រកាស (≤ 8 ថ្ងៃ)។
- ការពិនិត្យរបាំងដំណើរការបន្ទាប់ពីការព្យាយាមឡើងវិញក្នុងជំហានដដែលដែលជំរុញដោយ 400 របស់កម្មវិធីប្រតិបត្តិ (ការកែសម្រួល
  បរិបទ ការកម្រិតការគិត/កិច្ចខិតខំប្រឹងប្រែង ការរៀនប៉ារ៉ាម៉ែត្រដោយស្វ័យប្រវត្តិ) ដូច្នេះរបាំង 429 ដែលទើបលេចឡើងនៅលើ
  ការព្យាយាមឡើងវិញណាមួយនោះ នៅតែត្រូវបានស្ទាក់ ជំនួសឱ្យការទៅដល់ផ្លូវរយៈពេលរង់ចាំ។
- ស្ថានភាពស្ថិតក្នុងអង្គចងចាំសម្រាប់ការតភ្ជាប់នីមួយៗ (ការចាប់ផ្តើមឡើងវិញធ្វើឱ្យត្រូវជួបរបាំង 429 បន្ថែមមួយដងដើម្បីទទួលយកឡើងវិញ)។

**ការកំណត់កម្រិតសម័យឡើងវិញ** (`autoLimitReset` ដែលត្រូវបានសាកល្បងមុនគន្លង នៅពេលទាំងពីរត្រូវបានបើក):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → ប្លុក `juniper_tide`;
  នៅពេល `arm: "reset"` និង `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ជាមួយ
  `{ "program": "juniper_tide" }` (UUID របស់អង្គការពី
  `providerSpecificData.organizationUUID` ជាមួយជម្រើសជំនួសពីការចាប់ផ្ដើមដំបូង)។
- `result: reset|not_limited` → សំណើត្រូវបានព្យាយាមឡើងវិញក្នុងល្បឿនពេញ (គ្មានបឋមកថាយឺត)។
  `already_used` / `not_offered` ចងចាំ `next_available_at` (លំនាំដើមមួយសប្ដាហ៍); រាល់
  កំហុសនឹងរង់ចាំថយក្រោយ 15 នាទី។ ការកំណត់ឡើងវិញកើតឡើងម្តងក្នុងមួយសប្ដាហ៍ ហើយនៅតែរាប់បញ្ចូលក្នុង
  កម្រិតប្រចាំសប្ដាហ៍។

របាំងការពារការថយគុណភាព: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`។

### ភាពជាប់ទាក់ទងនៃសម័យ (#7274)

**វិសាលភាព:** សម័យអតិថិជនមួយ (`X-Session-Id` / `x-codex-session-id` / បឋមកថា `x-omniroute-session`) ដែលត្រូវបានភ្ជាប់ថេរទៅការតភ្ជាប់មួយ សម្រាប់អ្នកផ្តល់សេវា **ណាមួយ**។

**គោលបំណង៖** រក្សាភ្នាក់ងារដែលមានអន្តរកម្មច្រើនវគ្គ (Claude Code, aider, ភ្នាក់ងារផ្ទាល់ខ្លួន) ឱ្យនៅលើគណនីដដែលនៅទូទាំងសំណើ ដើម្បីកាត់បន្ថយការបាត់បង់បរិបទឆ្លងគណនី និងកំហុស 429 ពីការចាប់ផ្ដើមត្រជាក់ដដែលៗនៅលើអ្នកផ្ដល់សេវាដែលមានស្ថានភាពសម័យតាមគណនី។

**ការអនុវត្ត៖**

- ការកំណត់ TTL៖ `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ការជ្រើសរើស/បង្កើតការខ្ទាស់៖ `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ការស្រង់បឋមកថា (ទូទៅ សម្រាប់អ្នកផ្ដល់សេវាណាមួយ)៖ `src/sse/services/auth.ts::extractSessionAffinityKey()`
- តារាងការខ្ទាស់ដែលបានរក្សាទុកជាអចិន្ត្រៃយ៍៖ `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ការកំណត់៖ `sessionAffinityTtlMs` (TTL សកលគិតជា ms, `0` បិទមុខងារ) — `src/lib/db/settings.ts`។ បានប្ដូរឈ្មោះពី `codexSessionAffinityTtlMs` ដែលប្រើសម្រាប់តែ Codex ដោយការធ្វើចំណាកស្រុក `124_generic_session_affinity_ttl.sql` ដែលផ្ទេរ Codex TTL ដែលបានកំណត់ពីមុនណាមួយទៅជាតម្លៃលំនាំដើមថ្មី។

មុន #7274, `resolveSessionAffinityTtlMs()` បានចាកចេញភ្លាមៗដោយត្រឡប់ `0` សម្រាប់អ្នកផ្ដល់សេវាទាំងអស់ លើកលែងតែ `codex` ដូច្នេះការកំណត់ TTL (និងបឋមកថាសម័យ) មិនមានប្រសិទ្ធភាពនៅកន្លែងផ្សេងទៀតទេ ទោះបីជាយន្តការខ្ទាស់ និងការស្រង់បឋមកថាមិនអាស្រ័យលើអ្នកផ្ដល់សេវារួចហើយក៏ដោយ។ ការកែតម្រូវបានលុបការត្រឡប់ចេញមុនពេលនោះចេញ; ឥឡូវនេះ TTL អនុវត្តស្មើៗគ្នាចំពោះអ្នកផ្ដល់សេវាទាំងអស់ នៅពេលកំណត់ជាសកលឱ្យលើស `0`។

បឋមកថាសម្ព័ន្ធភាពសម័យទាំងបីមិនដែលត្រូវបានបញ្ជូនបន្តទៅផ្នែកខាងលើទេ — កម្មវិធីប្រតិបត្តិបង្កើតបឋមកថាខាងលើរបស់ពួកវាឡើងវិញជំនួសឱ្យការបញ្ជូនបឋមកថារបស់ម៉ាស៊ីនភ្ញៀវបន្ត ដូច្នេះវានៅត្រឹមតែជាលេខសម្គាល់សម្រាប់ភ្ជាប់ទំនាក់ទំនងផ្ទៃក្នុងប៉ុណ្ណោះ។

### ការជួលការតភ្ជាប់សម័យដែលបានគ្រប់គ្រងផ្ដាច់មុខ

**វិសាលភាព៖** ម៉ាស៊ីនភ្ញៀវ/សម័យ HTTP ដែលបានគ្រប់គ្រង និងកំពុងសកម្មមួយ កាន់កាប់ការតភ្ជាប់ OmniRoute ដែលមានសិទ្ធិមួយ។

**គោលបំណង៖** ផ្ដល់ភាពជាម្ចាស់ការតភ្ជាប់ផ្ដាច់មុខដែលមានភាពធន់ សម្រាប់ម៉ាស៊ីនភ្ញៀវដែលត្រូវការរបាំងកំណត់ផ្លូវដ៏តឹងរ៉ឹងនៅទូទាំងសំណើ។ វាខុសពីសម្ព័ន្ធភាពសម័យ ដែលជាចំណូលចិត្តទន់សម្រាប់ការរក្សាភាពបន្ត៖ ការជួលផ្ដាច់មុខរក្សាស្ថានភាពវដ្ដជីវិតក្នុង SQLite, អនុវត្តភាពតែមួយគត់ជាសកលរបស់ម្ចាស់សកម្ម និងការតភ្ជាប់សកម្ម ហើយបដិសេធជំនាន់ហួសសុពលភាព មុនពេលបញ្ជូនទៅអ្នកផ្ដល់សេវា។

មុខងារនេះត្រូវបានជ្រើសបើកតាម API key នីមួយៗ។ សោដែលបានគ្រប់គ្រងត្រូវតែមានវិសាលភាព `lease:exclusive` និងបញ្ជី `allowedConnections` ដែលមិនទទេ និងត្រូវបានបញ្ជាក់យ៉ាងច្បាស់។ ម៉ាស៊ីនភ្ញៀវ HTTP ណាមួយអាចប្រើ endpoint វដ្ដជីវិតបាន; មិនតម្រូវឱ្យមានឈ្មោះម៉ាស៊ីនភ្ញៀវ, user-agent, អ្នកផ្ដល់សេវា, វិធីសាស្ត្រ OAuth ឬម៉ូដែលទេ។ ការជួលកាន់កាប់ការតភ្ជាប់ មិនមែនម៉ូដែលទេ ដូច្នេះការផ្លាស់ប្ដូរម៉ូដែលនៅតែរក្សាការចងភ្ជាប់ ខណៈដែលការតភ្ជាប់នៅតែមានសិទ្ធិតាមធម្មតា។ ច្បាប់ធម្មតាសម្រាប់ម៉ូដែល កូតា សុខភាព រយៈពេលសម្រាក និងបញ្ជីអនុញ្ញាត នៅតែមានអំណាច ហើយអាចផ្លាស់ប្ដូរជំនាន់ដដែលទៅការតភ្ជាប់ទំនេរដែលមានសិទ្ធិមួយផ្សេងទៀត។

វដ្ដជីវិតគឺ `POST /api/v1/session-leases` ជាមួយសកម្មភាព JSON `acquire`, `renew`, និង `release`។ សំណើ inference ដែលបានគ្រប់គ្រងបង្ហាញតម្លៃសម្ងាត់ `X-OmniRoute-Lease-Owner` និង `X-OmniRoute-Lease-Generation` ដែលត្រូវគ្នាពិតប្រាកដ។ ម្ចាស់ប្រើ `vlo_` បន្តដោយតួអក្សរ base64url ចំនួន 43; មានតែ hash SHA-256 របស់វាប៉ុណ្ណោះដែលត្រូវបានរក្សាទុក។ រាល់របាំងបញ្ជូនចុងក្រោយក៏ចងភ្ជាប់ API key ID ដែលបានផ្ទៀងផ្ទាត់ និង connection ID សកម្មផងដែរ។ បឋមកថាគ្រប់គ្រងការជួលត្រូវបានដកចេញពីកំណត់ហេតុ រូបថតចម្លងសំណើដែលបានរក្សាទុក និងបឋមកថារបស់កម្មវិធីប្រតិបត្តិខាងលើ។

ប្រសិនបើការកំណត់ផ្លូវធម្មតាមានបេក្ខជនដែលបានគ្រប់គ្រង និងមានសិទ្ធិ ប៉ុន្តែបេក្ខជនទំនេរទាំងអស់ត្រូវបានកាន់កាប់ដោយការជួលសកម្មពីម្ចាស់ផ្សេង OmniRoute ត្រឡប់ HTTP `429`, កូដ lease-capacity-unavailable, ស្ថានភាពរង់ចាំសមត្ថភាព និង `Retry-After` ដែលមានដែនកំណត់ និងកំណត់ចេញពីពេលផុតកំណត់ពាក់ព័ន្ធដែលឆាប់បំផុត។ ករណីធម្មតាដែលគ្មានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់ មិនមែនជាការប្រជែងការជួលទេ ហើយរក្សាទុកអត្ថន័យកំហុសកំណត់ផ្លូវដែលមានស្រាប់របស់វា។

យន្តការដែលពាក់ព័ន្ធនៅតែដាច់ដោយឡែកពីគ្នា៖

- ការកាន់កាប់សម័យ OAuth គឺជាការចែកចាយទន់ក្នុងដំណើរការមូលដ្ឋាន សម្រាប់គណនី OAuth។
- semaphore របស់គណនីផ្ដល់សិទ្ធិស្របគ្នានៃសំណើ ហើយបញ្ចប់នៅពេលសំណើបញ្ចប់។
- ការជួលការតភ្ជាប់សម័យដែលបានគ្រប់គ្រងផ្ដាច់មុខ គឺជាភាពជាម្ចាស់វដ្ដជីវិតដែលមានភាពធន់ ជាមួយរបាំងជំនាន់។

---

## 3. ការចាក់សោម៉ូដែល

**វិសាលភាព:** ត្រីធាតុ provider + connection + model។

**វិសាលភាព key តាម status:** status ដែលបរាជ័យកំណត់ថា ការចាក់សោត្រូវសរសេរទៅកាន់ key មួយណា
(`resolveLockoutScope()` ក្នុង `open-sse/services/accountFallback/exactModelLock.ts`)៖

- `429` / `403` / `402` — សញ្ញាអំពីកូតា ឬសិទ្ធិប្រើប្រាស់ — ចាក់សោ **គ្រួសារកូតា**៖
  សម្រាប់ codex គឺវិសាលភាព `codex` / `spark` ទាំងមូល (រាល់ម៉ូដែល `gpt-5*` របស់
  connection នោះ) ហើយសម្រាប់ provider ផ្សេងទៀតគឺ `getQuotaScopedModelForProvider()`។
- `404` ចាក់សោតែម៉ូដែលដើម (`getModelLockKey()` បង្រួមវិសាលភាព `not_found`)។
- status ផ្សេងទៀតណាមួយ — ការបរាជ័យផ្នែកដឹកជញ្ជូន/server ប្រភេទ `5xx` និង
  `502` ដែល OmniRoute បង្កើតដោយខ្លួនឯងពីការផ្ទៀងផ្ទាត់គុណភាព — ចាក់សោតែត្រីធាតុ
  provider/connection/model **ជាក់លាក់** ប៉ុណ្ណោះ។ stream មិនល្អលើម៉ូដែលមួយ
  មិនមែនជាភស្តុតាងអំពីកូតារបស់គណនីទេ។ មុនពេលមានច្បាប់នេះ response ទទេមួយនៅលើ
  `codex/gpt-5.6-luna` នឹងដករាល់ម៉ូដែល `gpt-5*` របស់ connection នោះចេញពី
  routing រយៈពេល 2–30 នាទី (កើនឡើងជាបន្តបន្ទាប់) ទោះបីកូតារបស់វាមិនបានប៉ះពាល់ក៏ដោយ។
- ជម្រើស `scope` ដែល caller បញ្ជាក់ច្បាស់លាស់ តែងតែមានអាទិភាព (Antigravity បញ្ជូន `"exact"`)។

**គោលបំណង:** ជៀសវាងការបិទ connection ទាំងមូល នៅពេលមានតែម៉ូដែលមួយប៉ុណ្ណោះដែលមិនអាចប្រើបាន ឬត្រូវបានកំណត់ដោយកូតា។

**ឧទាហរណ៍:**

- provider ដែលមានកូតាតាមម៉ូដែល ហើយត្រឡប់ 429
- provider មូលដ្ឋានដែលត្រឡប់ 404 សម្រាប់ម៉ូដែលដែលបាត់មួយ
- ការបរាជ័យសិទ្ធិប្រើប្រាស់ mode/model ជាក់លាក់របស់ provider (ឧ. mode របស់ Grok)

**ការអនុវត្ត:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`។

### ផ្ទាំងគ្រប់គ្រងរយៈពេលផ្អាកម៉ូដែល (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

រាយបញ្ជីការចាក់សោដែលកំពុងសកម្មជាមួយ៖ provider, connection, model, reason, expiresAt។ ប្រតិបត្តិករអាចបើកម៉ូដែលឡើងវិញដោយដៃពី card នេះ។

**REST API:**

- `GET /api/resilience/model-cooldowns` — រាយបញ្ជីការចាក់សោដែលកំពុងសកម្ម
- `DELETE /api/resilience/model-cooldowns` — បើកឡើងវិញដោយដៃ។ Body: `{provider, connection, model}`។ Auth: management។

### UI កំណត់ការចាក់សោ + ការស្ដារឡើងវិញតាមការថយចុះពេលជោគជ័យ (v3.8.23)

ការចាក់សោម៉ូដែលបានផ្លាស់ប្ដូរពីឥរិយាបថដែលបានកំណត់ជាប់ក្នុងកូដ និងបើកជានិច្ច
ទៅជាមុខងារដែលអាចកំណត់រចនាសម្ព័ន្ធបានពេញលេញ ត្រូវបើកប្រើដោយជម្រើស និងមាន
មធ្យោបាយស្ដារឡើងវិញដោយខ្លួនឯង។

**card ការកំណត់:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)។
វា **ខុសដាច់ដោយឡែក** ពី `ModelCooldownsCard` ដែលបានតែអានខាងលើ (ដែលគ្រាន់តែ
_រាយបញ្ជី_ ការចាក់សោសកម្មប៉ុណ្ណោះ) — card ថ្មីនេះ _កំណត់រចនាសម្ព័ន្ធប៉ារ៉ាម៉ែត្រ_។ តម្លៃលំនាំដើម
ស្ថិតនៅក្នុង `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)៖

| ការកំណត់                | លំនាំដើម                         | អត្ថន័យ                                                             |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `enabled`               | `false`                          | ប៊ូតុងបិទបើកមេ — ការចាក់សោម៉ូដែលគឺ **បិទតាមលំនាំដើម**។              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | status ពី upstream ដែលត្រូវរាប់ជាការបរាជ័យមានវិសាលភាពត្រឹមម៉ូដែល។   |
| `baseCooldownMs`        | `120_000` (120 វិនាទី)           | រយៈពេលចាក់សោដំបូងសម្រាប់ការបរាជ័យលើកទីមួយ។                          |
| `maxCooldownMs`         | `1_800_000` (30 នាទី)            | ដែនកំណត់អតិបរមាសម្រាប់រយៈពេលផ្អាកដែលបានបង្កើន។                      |
| `maxBackoffSteps`       | `10`                             | ចំនួនជំហានអតិបរមានៃការបង្កើន exponential-backoff។                   |
| `useExponentialBackoff` | `true`                           | ថាតើការបរាជ័យដដែលៗត្រូវបង្កើនរយៈពេលផ្អាកតាមបែបអិចស្ប៉ូណង់ស្យែលឬអត់។ |

ការកំណត់ត្រូវបានរក្សាទុកតាម settings store ធម្មតា និងផ្ទៀងផ្ទាត់តាម
resilience settings schema។ card នេះកំណត់ព្រំដែន `baseCooldownMs`/`maxCooldownMs`
(ដោយ `maxCooldownMs ≥ baseCooldownMs`) និង `maxBackoffSteps`។

**ការស្ដារឡើងវិញតាមការថយចុះពេលជោគជ័យ:** ការស្ដារឡើងវិញ **មិនមែន** អាស្រ័យតែលើ timer ផុតកំណត់ទេ។ response
ដែលមានសុខភាពល្អ នឹងបន្ថយចំនួនការបរាជ័យរបស់ម៉ូដែលជាបណ្ដើរៗ ដូច្នេះម៉ូដែលដែលបានស្ដារឡើងវិញ
នៅពាក់កណ្ដាលរយៈពេលនឹងឈប់កើនកម្រិត (ហើយត្រូវបានសម្អាត) មុនពេល timer របស់វាផុតកំណត់។ នៅពេល combo target
ជោគជ័យ `open-sse/services/combo.ts` ហៅ `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ដែល **ចែកពាក់កណ្ដាល** `failureCount`
ដែលបានរក្សាទុក (`Math.floor(failureCount / 2)`)។ នៅពេលវាឈានដល់ `0` entry នៃការចាក់សោ
ត្រូវបានលុបចេញទាំងស្រុង។ `recordModelLockoutFailure()` ដែលជាគូរបស់វា
បង្កើនចំនួន (និងបង្កើនរយៈពេលផ្អាក) នៅពេលមានការបរាជ័យក្នុងរយៈពេល
បង្កើនកម្រិត។ ការថយចុះពេលជោគជ័យនេះ គឺបន្ថែមលើ timer ផុតកំណត់ធម្មតា —
មធ្យោបាយណាមួយក៏អាចបើកម៉ូដែលឡើងវិញបានដែរ។

**ស្ថានភាព:** ការចាក់សោត្រូវបានរក្សាទុក **ក្នុង memory** (`Map` តាម process នីមួយៗនៃ
`ModelLockoutEntry` ដែលមាន key ជា `provider:connectionId:model` និងការចាក់សោ exact-scope មាន key ជា
`provider:connectionId:exact:model`) មិនត្រូវបានរក្សាទុកជាប់ក្នុង
DB ទេ — វានឹងបាត់បង់នៅពេល restart។ _ការកំណត់_ ត្រូវបានរក្សាទុកជាប់ ប៉ុន្តែ
_ស្ថានភាព_ ការចាក់សោសកម្មគឺបណ្ដោះអាសន្ន។

---

## 4. ការគ្រប់គ្រងសំណើស្របពេលគ្នាសម្រាប់ Quota-Share (v3.8.36)

គណនីដែលមានការជាវ (GLM, MiniMax ជាដើម) ជាញឹកញាប់ទទួលយកសំណើស្របពេលគ្នាបានត្រឹមតែ ~1–3 ប៉ុណ្ណោះ។ ការលើសចំនួននេះនឹងបង្កឱ្យមាន 429 និងរយៈពេលផ្អាក។ បញ្ហានេះមានលក្ខណៈធ្ងន់ធ្ងរជាពិសេសនៅក្រោមបន្សំ **quota-share** (`qtSd/…`) ដែល API key ជាច្រើនចែករំលែកគណនី upstream តែមួយ។ មានយន្តការបីស្រទាប់ដើម្បីការពារកុំឱ្យគណនីរួមមួយទទួលសំណើលើសលប់។

### កម្រិតសំណើស្របពេលគ្នាតាមការតភ្ជាប់ (`max_concurrent`)

ការតភ្ជាប់ provider នីមួយៗអាចកំណត់ពិដាន `max_concurrent`
(`provider_connections.max_concurrent` ដែលកំណត់ក្នុងម៉ូឌុលការតភ្ជាប់ / API / DB)។
ទុកវាឱ្យទទេ ប្រសិនបើមិនចង់កំណត់ដែនកំណត់។ នេះគឺជាការកំណត់តែមួយគត់ដែលគ្រប់គ្រងស្រទាប់រៀបសំណើជាលំដាប់ខាងក្រោម — កំណត់វាទៅតាមចំនួនសំណើស្របពេលគ្នាពិតប្រាកដរបស់គណនី (ឧ. GLM ~1, MiniMax ~2)។

### ការរៀបសំណើ quota-share ជាលំដាប់

នៅពេលការបញ្ជូន quota-share កំណត់គោលដៅទៅការតភ្ជាប់ដែលបានប្រកាសតម្លៃវិជ្ជមានសម្រាប់ `max_concurrent` សំណើស្របពេលគ្នាទៅកាន់ **គណនី** នោះនឹងត្រូវបានរៀបចំជាលំដាប់តាមរយៈ semaphore សម្រាប់ការតភ្ជាប់នីមួយៗ (key `qsconn:<connectionId>`)៖ សំណើដែលលើសនឹង **រង់ចាំក្នុងជួរ** ជំនួសឱ្យការបញ្ជូនសំណើលើសលប់ទៅគណនី។ វាជាប្រភេទ **fail-open** — ជួរដែលពេញ ឬការអស់ពេលកំណត់ នឹងបន្តដំណើរការដោយគ្មាន slot ជំនួសឱ្យការបដិសេធសំណើដែលអាចបញ្ជូនបាន។ បិទ/បើកវានៅក្នុង **Settings → Resilience → Quota-share per-connection concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled` ដែលបានបើកតាមលំនាំដើម)។ បើគ្មានពិដាន `max_concurrent` ឥរិយាបថនឹងមិនផ្លាស់ប្តូរទេ។

> ច្រកគ្រប់គ្រងការកំណត់ផ្លូវ quota-share (`selectQuotaShareTarget`, DRR + P2C) ខ្លួនវាក៏ជា
> fail-open ហើយគ្រាន់តែ _បន្ថយអាទិភាព_ នៃការតភ្ជាប់ដែលដល់ពិដានប៉ុណ្ណោះ — ជាមួយនឹង
> pool ដែលមានការតភ្ជាប់តែមួយ វាមិនអាចដាក់ដែនកំណត់តឹងរ៉ឹងបានទេ ដូច្នេះ semaphore នេះគឺជាអ្វីដែលពិតជាទប់ស្កាត់
> ការហូរចូលនៃសំណើលើសលប់។

### ការព្យាយាមឡើងវិញដោយគិតគូរពី cooldown របស់ combo

សម្រាប់យុទ្ធសាស្ត្រ combo ទាំងអស់ (នៅពេលបានបើក) សំណើដែលនឹងធ្វើឱ្យកើត 429 ដោយសារ cooldown បណ្ដោះអាសន្នរយៈពេលខ្លី នឹងរង់ចាំរហូតដល់វាផុត ហើយបញ្ជូនឡើងវិញ ជំនួសឱ្យការត្រឡប់ 429 — វាគ្របដណ្តប់លើចន្លោះពេល TPM/RPM ថ្នាក់ Gemini (~60s retry-after) នៅលើ combo ពហុម៉ូដែល ឧ. គោលដៅទាំងពីរនៃ combo ដែលមាន 2 ម៉ូដែល ប៉ះដែនកំណត់អត្រាសម្រាប់ម៉ូដែលនីមួយៗ។ វាត្រូវបានកំណត់ព្រំដែនដោយ `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) ក្នុង **Settings → Resilience**។ វាមិនរង់ចាំលើ `quota_exhausted`
(ចាក់សោរហូតដល់ពាក់កណ្ដាលអធ្រាត្រ) ឬមូលហេតុពាក់ព័ន្ធនឹងការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ/រកមិនឃើញទេ។

---

## 5. ការគ្រប់គ្រងការអនុញ្ញាតចូលជួរសំណើ (v3.8.49 · បញ្ហា #6593)

**វិសាលភាព**៖ ជួរកំណត់អត្រាមូលដ្ឋានតាម provider+connection (`open-sse/services/rateLimitManager.ts`,
ដែលគាំទ្រដោយ Bottleneck) ស្ថិតនៅមួយស្រទាប់ក្រោមយន្តការទាំងបីខាងលើ។

**`maxWaitMs` កំណត់ព្រំដែនពេលរង់ចាំក្នុងជួរ; `executionMaxWaitMs` កំណត់ព្រំដែនពេលប្រតិបត្តិ។**
ទាំងពីរនេះត្រូវបានបំបែកពីគ្នាដោយចេតនា ហើយមួយណាក៏មិនផ្តល់តម្លៃទៅមួយទៀតដែរ។

`resilienceSettings.requestQueue.maxWaitMs` គឺជា **ថវិកាពេលរង់ចាំក្នុងជួរ**៖ វា
គ្របដណ្តប់លើការរង់ចាំរន្ធទំនេររបស់ provider ហើយបន្ទាប់មកស្ថិតក្នុងស្ថានភាព QUEUED ហើយកម្មវិធីកំណត់ពេលរបស់វា
ត្រូវបានសម្អាតភ្លាមៗនៅពេលការងារចាកចេញពី QUEUED និងចាប់ផ្តើមប្រតិបត្តិ
(`rateLimitManager.ts`, `wrappedFn`)។ សំណើដែលលើសពេលកំណត់នេះនឹងមិនទៅដល់
upstream ឡើយ។ តម្លៃលំនាំដើមគឺ 30000ms ដែលផ្តល់ដោយ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ក្នុង `src/lib/resilience/settings.ts` និងត្រូវបានចងកំណត់ដោយ
`tests/unit/ratelimit-admission-control-6593.test.ts` ដូច្នេះ ការផ្លាស់ប្តូរវានឹងធ្វើឱ្យ
ការធ្វើតេស្តនោះបរាជ័យ ជំនួសឱ្យការទុកឱ្យកថាខណ្ឌនេះហួសសម័យដោយស្ងាត់ៗ។

`resilienceSettings.requestQueue.executionMaxWaitMs` គឺជាតម្លៃដែល Bottleneck
ទទួលជា `expiration` របស់ការងារ ដែលកម្មវិធីកំណត់ពេលរបស់វាចាប់ផ្តើមតែបន្ទាប់ពីការបញ្ជូនចេញប៉ុណ្ណោះ។ វាជា
វិធានការបម្រុងសម្រាប់ executors ដែលមិនមាន timeout របស់ upstream ផ្ទាល់ខ្លួន ហើយវា
ត្រូវបានបង្កើនឱ្យស្មើនឹង fetch-start timeout ផ្ទាល់ខ្លួនរបស់ executor នៅពេលតម្លៃនោះវែងជាង ដូច្នេះវា
មិនអាចផ្តាច់ការឆ្លើយតបដែលកំពុងដំណើរការដោយប្រក្រតីបានទេ។ តម្លៃលំនាំដើមគឺ 600000ms (10 នាទី)។

ការបញ្ចូលថវិកាជួរទៅក្នុង `expiration` គឺជាអ្វីដែលពីមុនធ្លាប់ធ្វើឱ្យ gateways ដែលមិនមែនជា incremental
ត្រូវបានបញ្ឈប់ពាក់កណ្តាលដំណើរការ — ពួកវាអាចដំណើរការដោយស្របច្បាប់រយៈពេលជាច្រើននាទី មុនពេលទទួលបាន bytes ដំបូង —
ហើយនេះជាមូលហេតុដែល expiration ត្រូវបានបង្ហាញជា `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ខណៈដែលថវិកាជួរប្រើ
កូដ timeout របស់ជួរ។ កំណត់ជាន់លើតម្លៃណាមួយតាមរយៈ `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ឬ dashboard
(**ការកំណត់ → ភាពធន់**)។ ទាំងពីរត្រូវបានកម្រិតទៅក្នុងចន្លោះ 1ms–24h នៅពេលធ្វើ normalization។

**លំដាប់អាទិភាព សម្រាប់ទាំងពីរ៖** env var ផ្តល់តែតម្លៃ _លំនាំដើម_ ប៉ុណ្ណោះ។ តម្លៃដែល
បានរក្សាទុកក្នុង `resilienceSettings.requestQueue` (dashboard / API patch ដែលរក្សាទុក
ក្នុង `key_value`) មានអាទិភាពលើវា ហើយ `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` សម្រាប់ connection នីមួយៗមានអាទិភាពលើតម្លៃនោះទៀត។ ដូច្នេះ ការកំណត់
env var លើ deployment ដែលមានតម្លៃបានរក្សាទុករួចហើយ នឹងមិនផ្លាស់ប្តូរអ្វីឡើយ —
ត្រូវសម្អាត ឬធ្វើបច្ចុប្បន្នភាពការកំណត់ដែលបានរក្សាទុកជំនួសវិញ។

រយៈពេលស្ថិតក្នុងជួរត្រូវបានកម្រិតដោយ `maxWaitMs`; `maxQueueDepth` ខាងក្រោមកំណត់ថា
អ្នកហៅប៉ុន្មាននាក់អាចត្រូវបានដាក់ក្នុងជួរនៅពេលតែមួយ។

**`maxQueueDepth` — កម្រិតអនុញ្ញាតចូលដែលត្រូវបើកប្រើដោយជ្រើសរើស (ថ្មី)។** `resilienceSettings.requestQueue.maxQueueDepth`
កំណត់ចំនួនសំណើដែលអាចស្ថិតក្នុងជួរ (មិនទាន់បានបញ្ជូនចេញ) ក្នុងពេលតែមួយ សម្រាប់
provider+connection មួយ។ នៅពេលជួរមានសំណើចំនួន `maxQueueDepth`
រួចហើយ សំណើថ្មីនឹងត្រូវបានបដិសេធភ្លាមៗជាមួយកំហុសដែលមានប្រភេទ
`code: "RATE_LIMIT_QUEUE_FULL"` **មុនពេល** វាទៅដល់ `limiter.schedule()`
— ដូច្នេះ ការបដិសេធនេះចំណាយធនធានតិច និងកើតឡើងមុនការងារ
បង្ហាប់ prompt / បកប្រែណាមួយនៅខ្សែដំណើរការខាងក្រោមសម្រាប់សំណើនោះ។ តម្លៃលំនាំដើម `0` =
បិទ ដោយរក្សាឥរិយាបថជួរគ្មានដែនកំណត់ដែលមានស្រាប់; កំណត់ក្នុងចន្លោះ 0–100000។
កំណត់ជាន់លើតាមរយៈ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ឬ
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch)។

ការត្រួតពិនិត្យការអនុញ្ញាតចូលនេះគឺជា pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ដូច្នេះ
វាអាចធ្វើ unit test បានដោយមិនត្រូវការ Bottleneck limiter ពិតប្រាកដ។

> RFC ដែលបានបើក #6593 ក៏បានស្នើ flag `bypassCompressionOnRateLimit`
> ផងដែរ។ pipeline `open-sse/services/compression/` របស់ repo នេះគឺជា
> ការបង្ហាប់ prompt/context លើសំណើ LLM ចេញក្រៅ (`chatCore.ts`,
> នៅជុំវិញ block `resolveCompressionSettings`/`selectCompressionStrategy`) មិនមែនជា
> ការបង្ហាប់ការឆ្លើយតប HTTP លើ body 429 ដែលបានបង្កើតឡើងទេ — មិនមាន
> code path ដែលត្រូវគ្នាសម្រាប់ flag bypass ដោយផ្ទាល់នោះឡើយ។ ជំហានបង្ហាប់ prompt នោះ
> បច្ចុប្បន្នក៏ដំណើរការ _មុន_ `withRateLimit()` ក្នុង pipeline សំណើផងដែរ ដូច្នេះ
> ការរៀបលំដាប់ឡើងវិញដើម្បីរំលងវា នៅពេលមានការបដិសេធដោយសារជួរពេញ គឺជាការផ្លាស់ប្តូរដាច់ដោយឡែក និងធំជាង
> វិសាលភាពនៃបញ្ហានេះ; វាត្រូវបានសម្រេចដោយចេតនាថា **មិន** អនុវត្ត
> នៅទីនេះទេ ហើយទុកជាការងារបន្ត ប្រសិនបើអត្ថប្រយោជន៍ពីការសន្សំ CPU មានតម្លៃសមនឹង
> ហានិភ័យនៃការរៀបលំដាប់ឡើងវិញ។

---

## 6. ឧបករណ៍ត្រួតពិនិត្យអត្រាបញ្ជូនរបស់ស្ទ្រីមយឺត (#9709)

របាំងការពារជាជម្រើស `resilienceSettings.streamRecovery.throughputWatchdog` រកឃើញ
upstream ដែលនៅតែបញ្ជូន chunk ប៉ុន្តែបង្កើតលទ្ធផល assistant ក្នុងអត្រាលទ្ធផលមានប្រយោជន៍
ទាបជាងអត្រាដែលបានកំណត់។ វាត្រូវបានបំបែកដោយចេតនាពី idle timeout៖
heartbeat និង metadata មិនកំណត់ timer ណាមួយឡើងវិញ ហើយក៏មិនត្រូវបានរាប់ថាជាវឌ្ឍនភាពដែរ។ វាក៏
ខុសពីថ្ងៃផុតកំណត់ដាច់ខាតរបស់ attempt (#9153) ដែលនៅតែជាដែនកំណត់សុវត្ថិភាព
អតិបរមាដាច់ខាត ដោយមិនគិតពីគុណភាពលទ្ធផល។

watchdog តម្រូវឱ្យមានរយៈពេល warm-up ហើយបន្ទាប់មកមាន rolling window ពេញលេញ មុនពេល
វាអាច abort បាន។ វារាប់ text delta ពី event លទ្ធផលរបស់ Chat Completions និង Responses API
(ជាតម្លៃប្រហាក់ប្រហែលបែបប្រុងប្រយ័ត្ននៃចំនួន byte UTF-8) មិនអើពើ event ដែលមានតែ usage និង event ទទេ ហើយ
ផ្អាកការវិនិច្ឆ័យ ខណៈពេលដែល event សម្រាប់ tool-call ឬ reasoning កំពុងដំណើរការ។ វាត្រូវបានបិទ
តាមលំនាំដើម ហើយអាចបើកដោយប្រើ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
window, warm-up, អត្រាអប្បបរមា និងលទ្ធផលដែលអាចវាស់វែងបានជាអប្បបរមា ត្រូវបានកម្រិតដោយ
ស្រទាប់ normalization ធម្មតារបស់ resilience-settings។

នៅពេលបើក ការ abort ដោយ watchdog ត្រូវបានអនុវត្តតែចំពោះ upstream attempt ដែលកំពុងសកម្មប៉ុណ្ណោះ។ មុនពេល
byte ណាមួយអាចមើលឃើញដោយ client ផ្លូវ early-recovery ក្នុង account ដូចគ្នាដែលមានស្រាប់ អាចបើក
attempt ឡើងវិញ។ បន្ទាប់ពី commit ស្ទ្រីមមិនត្រូវបាន replay ដោយខ្វះការប្រុងប្រយ័ត្នឡើយ; មានតែ
កិច្ចសន្យា continuation ពាក់កណ្តាលស្ទ្រីមដែលមានស្រាប់ និងមានសុវត្ថិភាពប៉ុណ្ណោះ ដែលអាចតភ្ជាប់ suffix បាន។ ការ finalize នៅតែ
ដំណើរការតែម្តង ដូច្នេះការគណនា usage និងការដោះលែង semaphore មិនត្រូវបានធ្វើស្ទួនទេ។

---

## 7. ការកែសម្រួលស្ថានភាព Upstream ឡើងវិញ (កំហុស quota ដែលបានបញ្ជាក់ស្ថានភាពខុស)

**វិសាលភាព៖** upstream gateway មួយដែលរាយការណ៍ពីការអស់ quota បណ្តោះអាសន្នដោយប្រើ HTTP status ខុស។

**គោលបំណង៖** កែ status ដែលបង្កឱ្យមានការយល់ច្រឡំ មុនពេល classification ដើម្បីឱ្យអ្នកប្រើប្រាស់ downstream (fallback engine, combo aggregation និង response ដែលបង្ហាញចំពោះ client) ឃើញពីលក្ខណៈពិតប្រាកដនៃ failure ដែលអាច retry បាន។

gateway មួយចំនួនផ្តល់សញ្ញាអំពីការអស់ quota បណ្ដោះអាសន្នដោយប្រើ HTTP
status ដែលមិនអាច retry បាន។ `agentrouter.org` ត្រឡប់ `403` (ពេលខ្លះ `400`) ជាមួយ body ជាភាសាចិន
(`用户额度不足` / `额度不足`) ជំនួសឱ្យ `429` ស្តង់ដារ។ Client ដូចជា Claude
Code ចាត់ទុក `403` ថាជាស្ថានភាពអចិន្ត្រៃយ៍ ហើយ abort session ហើយបើគ្មានការកែតម្រូវទេ
fallback engine នឹងចាត់ថ្នាក់វាជា `AUTH_ERROR` ជំនួសឱ្យ event ទាក់ទងនឹង quota។

**ការអនុវត្ត៖**

- Registry + matcher៖ `open-sse/config/upstreamStatusRestatement.ts` — បញ្ជី rule សម្រាប់ provider នីមួយៗ (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) ដែលផ្គូផ្គងតាមរយៈ `applyStatusRestatement()`។
- ទីតាំងហៅ៖ block `providerFailure:` នៅក្នុង `open-sse/handlers/chatCore.ts`
  (ប្រហែលបន្ទាត់ 3654) ភ្លាមៗបន្ទាប់ពី `parseUpstreamError()` parse upstream
  response ដែលមាន HTTP status កំហុស (`!providerResponse.ok`) និងមុនពេល
  classification ណាមួយដំណើរការ ដើម្បីឱ្យអ្នកប្រើប្រាស់ downstream ទាំងអស់ឃើញ
  status ដែលបានកែតម្រូវ។ កំហុសដែលបង្កប់នៅក្នុងស្ទ្រីម SSE `200` ប្រើផ្លូវ parse ស្ទ្រីម
  ដាច់ដោយឡែក និងនៅពេលក្រោយ ហើយបច្ចុប្បន្ន **មិន** ត្រូវបានគ្របដណ្តប់ដោយ hook នេះទេ — នេះជា
  ដែនកំណត់ដែលបានដឹងរួចហើយ ប៉ុន្តែមិនទាន់ចាំបាច់សម្រាប់ status ខុសរបស់ agentrouter ទេ (ដែល
  លេចឡើងជា HTTP status កំហុស)។
- សិទ្ធិអាច retry៖ `429` ស្ថិតក្នុង `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) ដូច្នេះកំហុសដែលបានកែ status ឡើងវិញ
  មាន retry window ពិតប្រាកដ ជំនួសឱ្យលេចឡើងជា `403` ដែលលែងអាចដំណើរការបាន។
- `defaultRetryAfterMs` សំយោគ `60s` (`upstreamStatusRestatement.ts`)
  គ្រាន់តែជាអ្វីដែល response ដែលបានកែ status ឡើងវិញប្រាប់ទៅ **client** ប៉ុណ្ណោះ; វាមិនមែនជា
  រយៈពេល cooldown/lockout ខាងក្នុងរបស់ connection ដោយខ្លួនវាទេ — រយៈពេលនោះត្រូវបានគ្រប់គ្រង
  ដោយឡែកពីគ្នា តាមរយៈយន្តការណាមួយដែលដោះស្រាយកំហុសដែលបានកែ status ឡើងវិញ
  (ការបង្កើន backoff របស់ Connection Cooldown, §2, ដែលមានមូលដ្ឋាន `3s` សម្រាប់ provider
  ដែលប្រើ API-key; ឬ Model Lockout, §3, សម្រាប់ provider ដែលមាន quota តាម model ដូចជា
  agentrouter)។ Router អាចមានសិទ្ធិ retry ខាងក្នុងឡើងវិញបានលឿនជាង
  window 60s ដែលវាប្រកាសទៅ client — នេះជាចន្លោះបម្រុងដែលកំណត់ដោយចេតនា
  មិនមែនជា bug ទេ។

កំហុសអចិន្ត្រៃយ៍ (`无权访问模型` របស់ agentrouter — គ្មានសិទ្ធិចូលប្រើ model នេះ) **មិនដែល** ត្រូវបាន
កែ status ឡើងវិញទេ៖ `excludeMarkers` បដិសេធ rule ទោះបីជា `textMarkers` ត្រូវគ្នាក៏ដោយ
ដូច្នេះកំហុសរក្សា status ដើមរបស់វា ហើយគ្មានអ្វី retry វាដោយគ្មានទីបញ្ចប់ឡើយ។ rule សម្រាប់
provider classification ដែលផ្គូផ្គង
(`agentrouter-model-access-denied` ក្នុង `open-sse/config/providerErrorRules.ts`៖
`reason: "auth_error"`, `scope: "model"`, cooldown មូលដ្ឋាន `6h` ដែលបានប្រកាស) ត្រូវបាន
ពិនិត្យដោយ `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_មុន_ generic apikey-category `FORBIDDEN` early-return ដោយមានលក្ខខណ្ឌផ្អែកលើ
`honorsRuleLockScope(provider)` (#10334 — បច្ចុប្បន្នមានតែ agentrouter ប៉ុណ្ណោះ តាមរយៈ
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ក្នុង
`providerErrorRules.ts`)។ cooldown 6h ដែលបានប្រកាសរបស់ rule ត្រូវបានបញ្ជូនបន្តជា
`fallbackResult.baseCooldownMs` ប៉ុន្តែវានៅតែបញ្ចូលទៅក្នុងផ្លូវ lockout
សម្រាប់ quota តាម model ដែលមានស្រាប់ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()` ដែលមិនបានផ្លាស់ប្តូរដោយ #10334 លើកលែងតែប្រភព cooldown)៖ វាត្រូវបានកាត់បន្ថយ
មកត្រឹម `mlSettings.maxCooldownMs` របស់ operator
(តាមលំនាំដើម `1_800_000ms` / 30min) ដូច model lockout ផ្សេងទៀតទាំងអស់ ហើយ
_persisted lockout reason_ នៅតែជា `"forbidden"` ដែលបាន hardcode រួចជាស្រេច
មិនមែន `"auth_error"` របស់ rule ទេ — មានតែរយៈពេល cooldown ប៉ុណ្ណោះដែលត្រូវបានគោរព
ពីដើមដល់ចប់ មិនមែន reason string ទេ។ connection ខ្លួនវានៅតែសកម្ម;
model ផ្សេងៗក្នុងក្រុមដូចគ្នានៅលើ connection ដដែលមិនរងផលប៉ះពាល់ទេ។

កំហុសកូតាដែលបានកំណត់ស្ថានភាពឡើងវិញ (`额度不足`) ឈានដល់វិធានរបស់ provider នៅក្នុង production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, មិនមាន cooldown ផ្ទាល់ខ្លួនដែលបានប្រកាសទេ — តម្លៃលំនាំដើម scaled backoff របស់ persistence layer
ត្រូវបានអនុវត្ត)។ ចាប់តាំងពី #10334 មក `scope` នៅលើ
`ProviderErrorRuleMatch` ត្រូវបានប្រើប្រាស់ពីដើមដល់ចប់ ប៉ុន្តែ **សម្រាប់តែ** provider ដែលស្ថិតនៅក្នុង
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ប៉ុណ្ណោះ (`providerErrorRules.ts` —
បច្ចុប្បន្នមានតែ `"agentrouter"` ដែលត្រូវបានគ្រប់គ្រងតាមរយៈ `honorsRuleLockScope()`)។ សម្រាប់
provider ផ្សេងទៀតទាំងអស់ `scope` នៅតែមានតួនាទីផ្តល់ព័ត៌មាន ដូចគ្នាទាំងស្រុងនឹងមុន #10334។
`checkFallbackError` បង្ហាញ scope របស់វិធានដែលត្រូវគ្នាជា
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) គឺជា guard រួមដែលបញ្ជាក់ថា
`ruleScope` ពិតជាមានសុវត្ថិភាពក្នុងការគោរពជាសញ្ញាទូទាំង connection ដែលអាចស្ដារឡើងវិញដោយខ្លួនឯង
(scope `"connection"`, reason `quota_exhausted`, មិនដែលជា `permanent`,
មិនដែលជា `creditsExhausted` — ជាការការពារប្រឆាំងនឹងវិធាននាពេលអនាគតដែលអាចផ្គូផ្គង scope
`"connection"` ជាមួយស្ថានភាព account អចិន្ត្រៃយ៍)។ Consumer ពីរហៅវា៖

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  ជំនួសឱ្យការធ្លាក់ទៅក្នុង branch lockout **តាម model នីមួយៗ** របស់ passthrough-provider
  (agentrouter គឺ `passthroughModels: true` → `hasPerModelQuota()`
  ត្រឡប់ `true`) វាអនុវត្ត **connection cooldown បណ្ដោះអាសន្ន** —
  `testStatus: "unavailable"` + `rateLimitedUntil` ហើយមិនដែលជាស្ថានភាពបញ្ចប់
  (`credits_exhausted`/`banned`/`expired`) ទេ — ដូច្នេះ connection អាចស្ដារឡើងវិញដោយខ្លួនឯង
  នៅពេល cooldown ផុតកំណត់ ជំនួសឱ្យការទាមទារឱ្យ reset credential ដោយដៃ។
  ត្រូវបានរំលងសម្រាប់ connection ដែលមាន `disableCooling: true` (#2997)៖ opt-out នោះ
  ធ្លាក់ទៅកាន់ per-model lockout ជំនួសវិញ (ជាការដោះដូរដែលបានកត់ត្រាទុក —
  សូមមើល comment ក្នុងកូដនៅខាងលើ branch នោះ)។
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`)៖ guard ដូចគ្នានេះសម្គាល់
  connection ទៅក្នុង set `exhaustedConnections` ក្នុង memory ដោយប្រើ key
  `${provider}:${connectionId}`។ វារំលងតែ target SAME-REQUEST ដែលនៅសល់
  ហើយ _target នោះផ្ទាល់មាន `connectionId` ដូចគ្នាបេះបិទរួចហើយ_ នៅលើ
  target object របស់ខ្លួន (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` មុនពេល lookup `exhaustedConnections`) — combo បញ្ជី
  model ធម្មតា ដែល sibling target មិនមាន `connectionId` ដែលបាន pin ផ្ទាល់ខ្លួន
  ហើយ connection មួយត្រូវបាន resolve តែក្នុងមួយ dispatch ពី header
  `X-OmniRoute-Selected-Connection-Id` របស់ response នោះ មិនដែលត្រូវនឹង key នេះទេ។ សម្រាប់
  ករណីទូទៅនេះ ការការពារពិតប្រាកដប្រឆាំងនឹង leg ដែលនៅសល់ប្រើ account ដែលទើប
  អស់កូតាឡើងវិញ គឺ **មិនមែន** Set នេះទេ — វាគឺជា persistence layer ខាងលើ
  (`rateLimitedUntil` របស់ connection ឥឡូវស្ថិតនៅពេលអនាគត) រួមជាមួយ
  guard ដូចគ្នានេះដែលទប់ស្កាត់ `transientRateLimitedProviders` សម្រាប់
  failure នោះ (សូមមើល "ការរចនាពីរដំណាក់កាល" និង comment ក្នុងកូដនៅលើ
  branch `isAgentrouterConnectionQuotaScope` ក្នុង `targetExhaustion.ts`)៖ ដោយ
  Set នោះមិនត្រូវបានសម្គាល់ force-allow `allowRateLimitedConnection` របស់ `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) **មិន** ដំណើរការ
  សម្រាប់ leg ដែលនៅសល់របស់ provider ទេ ដូច្នេះ filter `rateLimitedUntil`
  របស់ការជ្រើសរើស credential (`src/sse/services/auth.ts:1238`) ត្រូវបានគោរពជាធម្មតា ហើយ
  leg ដែលនៅសល់អាចជ្រើសរើស connection agentrouter ផ្សេងដែលនៅតែមានសិទ្ធិប្រើ
  ឬបរាជ័យដោយសារគ្មាន credential ដែលអាចប្រើបាន — វាមិនបង្ខំខ្លួនឯង
  ឱ្យត្រឡប់ទៅ connection ដែល branch នេះទើបបានដាក់ cooldown ទេ។

### ការរចនាពីរដំណាក់កាល៖ ការកំណត់ស្ថានភាពឡើងវិញ បន្ទាប់មកការចាត់ថ្នាក់

ការកំណត់ស្ថានភាពឡើងវិញ (`upstreamStatusRestatement.ts`) និងវិធាន
ចាត់ថ្នាក់ provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) គឺជា registry ដាច់ដោយឡែកពីគ្នា ដែលទាំងពីរប្រើ provider id
និង text marker ជា key ប៉ុន្តែពួកវាដំណើរការនៅកន្លែងផ្សេងគ្នា និងបម្រើ
គោលបំណងផ្សេងគ្នា៖ ការកំណត់ស្ថានភាពឡើងវិញសរសេរ HTTP status ឡើងវិញតាំងពីដំបូងក្នុង `chatCore.ts`;
វិធានចាត់ថ្នាក់ជ្រើស fallback `reason` និង lock `scope`
(`model` / `provider` / `connection`) នៅខាងក្នុង `checkFallbackError()`
(`open-sse/services/accountFallback.ts`)។

វិធានចាត់ថ្នាក់មើលឃើញតែ **អត្ថបទ** កំហុសពេញលេញប៉ុណ្ណោះ (ដែលចាំបាច់សម្រាប់ផ្គូផ្គង body
marker ដូចជា `额度不足`) សម្រាប់ provider ដែលបានរាយក្នុង allowlist `FULL_TEXT_RULE_PROVIDERS`
ក្នុង `providerErrorRules.ts` — បច្ចុប្បន្នមានតែ `"agentrouter"`។ សម្រាប់
provider **built-in catalog** ផ្សេងទៀតទាំងអស់ `checkFallbackError` បញ្ជូនទៅ
`getProviderErrorRuleMatch` តែ structured error (`{code, type}`) ប៉ុណ្ណោះ ដែល
គ្រប់គ្រាន់សម្រាប់វិធានដែលផ្អែកលើ header/status/code ប៉ុន្តែមិនអាចមើលឃើញ body-text marker ទេ។
Helper `resolveRuleMatchBody()` អនុវត្តការជ្រើសរើសនេះ៖ អត្ថបទកំហុសពេញលេញ
សម្រាប់ provider ក្នុង allowlist និង structured error សម្រាប់ provider ផ្សេងទៀត។ ការបន្ថែម
provider **built-in** ទៅ `FULL_TEXT_RULE_PROVIDERS` គឺជា opt-in ជាក់លាក់តាម provider
— វាមានឡើងដើម្បីឱ្យ path លំនាំដើមសម្រាប់ provider ទាំងអស់ដែលមិនស្ថិតក្នុង
បញ្ជីនៅតែមិនផ្លាស់ប្តូរសូម្បីតែមួយ byte។

`scope` របស់វិធានមួយ (`model` / `provider` / `connection`) គឺជា opt-in ដាច់ដោយឡែក
ពី `FULL_TEXT_RULE_PROVIDERS`៖ `checkFallbackError` បង្ហាញវាត្រឹមជា
`fallbackResult.ruleScope` ប៉ុណ្ណោះ ហើយ downstream consumer គោរពវាជាអ្វីមួយ
ក្រៅពី label ផ្តល់ព័ត៌មាន តែសម្រាប់ provider ដែលស្ថិតក្នុង
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ក្នុង file ដូចគ្នា (`ត្រូវបានគ្រប់គ្រងតាមរយៈ
honorsRuleLockScope()` — បច្ចុប្បន្នមានតែ `"agentrouter"`)។ សូមមើល "កំហុសកូតា
ដែលបានកំណត់ស្ថានភាពឡើងវិញ" ខាងលើ ដើម្បីដឹងថា match `scope: "connection"` ពិតជា
ធ្វើអ្វីខ្លះ នៅពេល provider មួយស្ថិតនៅក្នុង allowlist នោះ។

**#11104 — ច្បាប់ដែលប្រកាសដោយប្រតិបត្តិករ រំលង allowlist ទាំងពីរ។** ប្រតិបត្តិករអាច
ប្រកាសច្បាប់សម្រាប់ provider នីមួយៗនៅពេលដំណើរការតាមរយៈ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ដោយមិនចាំបាច់កែសម្រួលឯកសារនេះ។ ការដាក់ច្បាប់របស់ប្រតិបត្តិករឱ្យស្ថិតក្រោមការគ្រប់គ្រងរបស់
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — ដែលជា allowlist
សម្រាប់ការពារឥរិយាបថ **លំនាំដើម** របស់ច្បាប់ catalog ដែលភ្ជាប់មកជាមួយ — នឹងធ្វើឱ្យ
យន្តការ settings គ្មានប្រសិទ្ធភាពសម្រាប់ provider ទាំងអស់ លើកលែងតែ provider ដែលបាន
រាយនៅទីនោះរួចហើយ ព្រោះការប្រកាសច្បាប់នេះ គឺជា opt-in ជាក់លាក់របស់ប្រតិបត្តិកររួចទៅហើយ។
`resolveRuleMatchBody()` និង `honorsRuleLockScope()` ទាំងពីរពិនិត្យ
`hasOperatorRuleForProvider()` ជាមុន៖ provider ដែលមានច្បាប់របស់ប្រតិបត្តិករ នឹងទទួលបាន
អត្ថបទកំហុសដើម និងមាន `scope` ដែលបានប្រកាសរបស់វាត្រូវបានគោរព ដោយមិនគិតថា
វាក៏មានវត្តមាននៅក្នុង allowlist ណាមួយដែរឬអត់។

**ចន្លោះខ្វះខាតដែលបានដឹង — `providerRuleRegistry` មិនដែលត្រូវបានប្រើសម្រាប់ HTTP 400 ទេ។**
ផ្នែក `BAD_REQUEST` របស់ `checkFallbackError` ចាត់ថ្នាក់ status 400 ទាំងស្រុង
តាមរយៈ pattern array ផ្ទាល់ខ្លួនរបស់វា (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` ជាដើម នៅក្នុង `accountFallback.ts`) ហើយ return មុនពេល
ទៅដល់ផ្នែក `configuredRule`/`getProviderErrorRuleMatch` ដែលស្ថិតនៅខាងលើ។
ច្បាប់ catalog ដែលភ្ជាប់មកជាមួយ (ឬច្បាប់របស់ប្រតិបត្តិករ) ដែលមាន `status: 400`
មាន syntax ត្រឹមត្រូវ ប៉ុន្តែវានឹងមិនដែលត្រូវបានអនុវត្តទេ។ បច្ចុប្បន្ន គ្មានច្បាប់ដែលមានស្រាប់ណាមួយ
កំណត់គោលដៅទៅ 400 ទេ ដូច្នេះគ្មានអ្វីនៅក្នុង production ត្រូវបានប៉ះពាល់ឡើយ — ប៉ុន្តែ
ច្បាប់ 400 នាពេលអនាគត តម្រូវឱ្យកែផ្នែកនេះជាមុន ដែលជាការផ្លាស់ប្តូរធំជាងការបន្ថែមច្បាប់
(វាចាត់ថ្នាក់ 400 ឡើងវិញសម្រាប់ provider ទាំងអស់ដែលកំពុងពឹងផ្អែកលើឥរិយាបថរបស់
pattern array) ហើយវានៅក្រៅវិសាលភាពនៃការបន្ថែមច្បាប់សម្រាប់ provider តែមួយ។

### ការបន្ថែម gateway ថ្មីដែលបញ្ជាក់ quota ខុស

1. ចុះឈ្មោះ rule array មួយនៅក្នុង `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`)។ រក្សា `textMarkers`
   ឱ្យជាក់លាក់ចំពោះ provider; កុំប្រើឃ្លាភាសាអង់គ្លេសទូទៅឡើងវិញ ដែលអាចប៉ះទង្គិចជាមួយ
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`)។
2. ជាជម្រើស អាចចុះឈ្មោះច្បាប់ចាត់ថ្នាក់នៅក្នុង
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ដើម្បីជ្រើសរើស
   lock scope ត្រឹមត្រូវ (`connection` សម្រាប់ quota ទូទាំង account និង `model` សម្រាប់
   កំហុសតាម model នីមួយៗ)។ ជំហាននេះមានប្រសិទ្ធភាពនៅក្នុង production តែចំពោះ
   provider ដែលច្បាប់របស់វាត្រូវការអត្ថបទកំហុសពេញលេញ (body markers) ប៉ុណ្ណោះ៖ បន្ថែម
   provider id ទៅក្នុង `FULL_TEXT_RULE_PROVIDERS` នៅក្នុងឯកសារដូចគ្នា — បើមិនដូច្នោះទេ
   `checkFallbackError` នឹងប្រគល់ឱ្យច្បាប់ត្រឹមតែកំហុសដែលមានរចនាសម្ព័ន្ធ
   `{code, type}` ប៉ុណ្ណោះ ហើយច្បាប់ផ្អែកលើ body text នឹងមិនដែល match ជាមួយ traffic
   ពិតប្រាកដទេ។ ច្បាប់ដែល match ដោយផ្អែកតែទៅលើ `status`/`headers` (ដូចជា
   របស់ Opencode ឬ Minimax) មិនត្រូវការ opt-in នេះទេ។ ដោយឡែក ប្រសិនបើច្បាប់ប្រកាស
   `scope: "connection"` ហើយគោលបំណងគឺឱ្យមាន cooldown ទូទាំង connection ពិតប្រាកដ
   រួមទាំងការរំលង combo ក្នុង request ដូចគ្នា (មិនមែនគ្រាន់តែជា label សម្រាប់ផ្តល់ព័ត៌មានទេ)
   សូមបន្ថែម provider id ទៅក្នុង `HONORS_RULE_LOCK_SCOPE_PROVIDERS` នៅក្នុងឯកសារដូចគ្នា
   — វាជាអ្វីដែលគ្រប់គ្រងការប្រើប្រាស់បែប `isAgentrouterConnectionQuotaScope()` នៅក្នុង
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) និង
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); បើគ្មានវា `scope`
   នៅតែបន្តឆ្លងកាត់ `fallbackResult.ruleScope` ប៉ុន្តែគ្មានអ្វីអនុវត្តតាមវាទេ។
3. បន្ថែម unit test ដោយយកលំនាំតាម `tests/unit/upstream-status-restatement.test.ts`
   និង `tests/unit/agentrouter-error-rules.test.ts` (រួមទាំង guard
   not-permanent / not-creditsExhausted ហើយ — ប្រសិនបើ provider ត្រូវការ
   allowlist — ត្រូវមាន test ដែលបញ្ជាក់ថា `resolveRuleMatchBody()` return
   អត្ថបទពេញលេញសម្រាប់តែ provider នោះប៉ុណ្ណោះ)។

មិនចាំបាច់មានការផ្លាស់ប្តូរចំពោះ `chatCore.ts`, `classifyError` ឬ combo ទេ។

#### Lock ដែលចាត់ជាក្រុមតាម egress (#10880)

Provider នៅក្នុង `EGRESS_BUCKETED_LOCK_PROVIDERS` (ក្រុម opencode) ត្រូវបានចាត់ទុក
ជា upstream ដែលចាត់ជាក្រុមតាម IP (កម្រិត free tier របស់ opencode ត្រូវបានចាត់ជាក្រុមតាម IP
មិនមែនតាម account ទេ — សូមមើល #9611)៖ status-429 ដែលត្រូវបានចាត់ថ្នាក់ជា
`quota_exhausted` **ឬ** `rate_limit_exceeded` នឹងដាក់ connection ទាំងអស់ក្នុង
គ្រួសារដែលមានក្នុង allowlist ហើយមាន egress IP ដែលបានដឹងចុងក្រោយត្រូវគ្នានឹង
connection ដែលបរាជ័យ ឱ្យចូល cooldown មុនពេល rotation អាចសាកល្បងពួកវា
— ដើម្បីជៀសវាង upstream call ដែលធានាថានឹងបរាជ័យចំនួន N-1 ដង (មានទម្រង់ដូច
#10460/#10525)។ `rate_limit_exceeded` ត្រូវបានដាក់បញ្ចូលដោយចេតនា៖ នៅលើផ្លូវ
`markAccountUnavailable` ច្បាប់ជាក់លាក់របស់ opencode មិនដែល match ទេ
(គ្មាន headers/body ត្រូវបានប្រគល់ទៅឱ្យ `checkFallbackError` ហើយ opencode មិនមាននៅក្នុង
`FULL_TEXT_RULE_PROVIDERS`) ដូច្នេះ 429 ដែល body របស់វាមានអត្ថបទ subscription-quota
("monthly usage limit reached") ត្រូវបានចាត់ថ្នាក់ជា `quota_exhausted` ដោយ
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1h)
មុនពេលច្បាប់ `status_429` ត្រូវបានទៅដល់ — ខណៈដែល 429 ដែលគ្មាន quota text
(ការកំណត់ rate limit ធម្មតា) ត្រូវបានចាត់ថ្នាក់តាមរយៈច្បាប់ `status_429` ជា
`rate_limit_exceeded` ហើយនៅតែដាក់ក្រុម IP នោះឱ្យចូល cooldown។ សម្រាប់ provider
ដែលមានក្នុង allowlist ការកំណត់ rate limit ដែលចាត់ជាក្រុមតាម IP គឺជាសញ្ញាដូចគ្នានឹង
quota ដែលបានអស់។ ដែនកំណត់ជាក់ស្តែង៖

- **តាមលទ្ធភាពដែលអាចធ្វើបាន**៖ ការចាក់សោដោះស្រាយ `egress_ip` ដែលបានស្គាល់ចុងក្រោយរបស់ការតភ្ជាប់
  ពី `proxy_logs` (ចន្លោះពេល 24h, ធ្វើសមកាលកម្ម, គ្មាន cache)។ ក្នុងករណី cold cache (egress
  IP មិនធ្លាប់ត្រូវបានស្ទាបស្ទង់) ឬគ្មាន row → ការតភ្ជាប់ដែលបរាជ័យនៅតែត្រូវបានដាក់ឱ្យ cooldown ដោយ
  branch នេះ (កត់ត្រាដូចបច្ចុប្បន្ន) ប៉ុន្តែមិនមាន sibling ណាមួយត្រូវបានចាក់សោទេ។
- **មិនដែលជា terminal**៖ cooldown គឺជាចន្លោះ quota ដែលបន្តជាថ្មី
  (`testStatus: "unavailable"`); ស្ថានភាពអចិន្ត្រៃយ៍មិនត្រូវបានសន្និដ្ឋានពី
  signal កម្រិត IP ឡើយ។ ការតភ្ជាប់ `disableCooling` រំលង branch នេះទាំងស្រុង។
- **Granularity នៃការចាក់សោផ្លាស់ប្តូរសម្រាប់ family ដែលស្ថិតក្នុង allowlist**៖ នេះគឺជាការផ្លាស់ប្តូរ scope
  មិនមែនគ្រាន់តែជា optimization សម្រាប់ sibling ប៉ុណ្ណោះទេ។ opencode គឺជា provider មួយក្នុង `passthroughModels`
  ដូច្នេះមុន branch នេះ 429 មួយបង្កើតការចាក់សោកម្រិត MODEL; ឥឡូវនេះវា
  បង្កើត cooldown កម្រិតការតភ្ជាប់ — រួមទាំងសម្រាប់ operator ដែលកំពុងដំណើរការការតភ្ជាប់តែមួយ
  ដោយគ្មាន sibling សោះផងដែរ។ នេះគឺជា granularity ដែលតារាង rule របស់ opencode
  បានកំណត់រួចហើយថាត្រឹមត្រូវ (`scope: "connection"`,
  `providerErrorRules.ts`) ប៉ុន្តែមិនធ្លាប់ត្រូវបានអនុវត្តរហូតមកដល់ពេលនេះ ព្រោះ opencode មិនស្ថិតក្នុង
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`។ branch នេះសរសេរ cooldown +
  `backoffLevel` របស់ការតភ្ជាប់ដែលបរាជ័យដោយខ្លួនឯង ដោយឆ្លុះតាម
  branch agentrouter ដែលមាន scope កម្រិតការតភ្ជាប់ ហើយ return — block កម្រិត model និង
  path ទូទៅខាងក្រោមមិនត្រូវបានឈានដល់ឡើយ។
- **រួមបញ្ចូល Combo**៖ ដូច branch agentrouter ដែរ scope នេះចេតនា
  មិនអើពើនឹង downgrade របស់ `persistUnavailableState`/`isCombo` ដែល combo caller
  អនុវត្តចំពោះ 429។ ការចាក់សោកម្រិត model មិនមែនជាទម្រង់ដែលខ្សោយជាងរបស់ scope នេះទេ វា
  ជាឯកតាខុស៖ វាមិនបញ្ជាក់អ្វីអំពី IP ដែលបានអស់ quota ទេ ដូច្នេះ combo
  rotation នឹងបន្តចំណាយ call ដែលធានាថាបរាជ័យមួយសម្រាប់ sibling នីមួយៗ។
- **សុវត្ថិភាពរបស់ sibling**៖ sibling ដែលជា terminal រួចហើយ (banned/credits_exhausted)
  ឬស្ថិតក្នុង cooldown យូរជាងរួចហើយ មិនត្រូវបានសរសេរជាន់ពីលើឡើយ។
- **Allowlist ផ្តាច់មុខ**៖ ការពង្រីក `EGRESS_BUCKETED_LOCK_PROVIDERS` គឺជា
  ការសម្រេចចិត្តច្បាស់លាស់របស់ owner; គ្មាន wiring ទូទៅទេ (pattern #10334/#10419)។ query
  សម្រាប់ sibling ចងភ្ជាប់ទៅ allowlist ដដែលនោះ ជំនួសឱ្យការសរសេរវាម្តងទៀតជា SQL
  literal ដូច្នេះការពង្រីកវានៅតែជាការផ្លាស់ប្តូរតែមួយបន្ទាត់។
- **ការបង្វិល Egress IP ក្នុងទិសទាំងពីរ**៖ ចន្លោះពេល lookup (24h) ទូលំទូលាយជាង
  TTL របស់ egress-IP cache (5 min) ឆ្ងាយណាស់ ដូច្នេះ "IP ដែលបានស្គាល់ចុងក្រោយ" គឺជាប្រវត្តិ
  មិនមែនស្ថានភាពបច្ចុប្បន្នទេ។ ប្រសិនបើ proxy របស់ការតភ្ជាប់មួយបាន rotate នៅក្នុងចន្លោះពេលនោះ
  ការចាក់សោអាច **ខកខាន** IP ដែលពិតជាត្រូវបានប្រើរួមគ្នា (IP ដែលបានកត់ត្រាគឺជា IP ថ្មី
  ដែលមិនទាន់អស់ quota) — ហើយផ្ទុយទៅវិញ វាអាច **ដាក់ sibling មួយឱ្យ cooldown ទោះបីវាបាន
  rotate ចេញរួចហើយ** ពី IP ដែលបានអស់ quota ក៏ដោយ។ ករណីទីពីរធ្វើឱ្យ sibling នោះខាតបង់
  ចន្លោះ cooldown មួយ; ទាំងពីរត្រូវបានទទួលយកជាដែនកំណត់តាមលទ្ធភាពដែលអាចធ្វើបានរបស់
  lookup ដែលផ្អែកលើប្រវត្តិ។
- **ថ្លៃដើម**៖ bounded scan ចំនួនពីរលើ `proxy_logs` (filter តាមចន្លោះពេលតាមរយៈ
  `idx_pl_timestamp`) តែនៅប្រេកង់ 429 ប៉ុណ្ណោះ។ គ្មាន index ថ្មីទេ (migration 134
  YAGNI)។ បានវាស់លើច្បាប់ចម្លង DB ដែលមាន traffic ពិត និងទំហំមធ្យម;
  instance ដែលមាន throughput ខ្ពស់រក្សាទុក row ច្រើនជាងតាមសមាមាត្រក្នុងចន្លោះពេលដូចគ្នា។

---

## មុខងារធន់ទ្រាំផ្សេងទៀត

- **យុទ្ធសាស្ត្រកំណត់ផ្លូវចំនួន 19** (តាមអាទិភាព, តាមទម្ងន់, វិលជុំ, បញ្ជូនបន្តតាមបរិបទ, បំពេញមុន, p2c, ចៃដន្យ, ប្រើតិចបំផុត, បង្កើនប្រសិទ្ធភាពតាមតម្លៃ, គិតគូរពីការកំណត់ឡើងវិញ, ចន្លោះពេលកំណត់ឡើងវិញ, ទំហំបម្រុង, ចៃដន្យតឹងរ៉ឹង, ស្វ័យប្រវត្តិ, lkgp, បង្កើនប្រសិទ្ធភាពតាមបរិបទ, បង្កើនប្រសិទ្ធភាពតាមឃ្លាំងសម្ងាត់, បញ្ចូលគ្នា, ដំណាក់កាលជាបន្តបន្ទាប់) — សូមមើល [AUTO-COMBO.md](../routing/AUTO-COMBO.md)។
- **ការកំណត់ផ្លូវដែលគិតគូរពីការកំណត់ឡើងវិញ** (v3.8.0) — ផ្តល់អាទិភាពដល់ការតភ្ជាប់ដោយផ្អែកលើពេលវេលាកំណត់កូតាឡើងវិញ។
- **ការបន្ទាបមុខងាររបៀបផ្ទៃខាងក្រោយ** — Responses API `background: true` ត្រូវបានបន្ទាបទៅជារបៀបសមកាលកម្ម ព្រមជាមួយការព្រមាន។
- **ការរកឃើញដែនកំណត់ឧបករណ៍ដោយថាមវន្ត** — បន្ថយការប្រើអ្នកផ្តល់សេវា នៅពេលឈានដល់ដែនកំណត់ចំនួនឧបករណ៍។
- **ផ្លូវបម្រុងបន្ទាន់** — គ្រប់គ្រងដោយ `OMNIROUTE_EMERGENCY_FALLBACK`; ប្រតិបត្តិករអាចកំណត់ជំនួសវាពីទំព័រ Feature Flags ដោយមិនចាំបាច់ចាប់ផ្ដើមឡើងវិញ។

---

## ការបំបាត់កំហុស

- ចម្លើយពីការរួមបញ្ចូលគ្នាដែលមានទម្ងន់ `503 all_targets_cooling_down` (`Retry-After` ត្រូវបានកំណត់ ហើយ `diagnostics.excluded` រាយគោលដៅទាំងអស់ជាមួយ `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool ត្រូវបានកំណត់រចនាសម្ព័ន្ធ និងបានតភ្ជាប់រួច ប៉ុន្តែគោលដៅនីមួយៗគ្រាន់តែត្រូវបានដកចេញដោយកម្មវិធីកំណត់ពេលភាពធន់ប៉ុណ្ណោះ។ ការព្រមាន `[COMBO] Weighted selection: every target excluded before dispatch — …` បញ្ជាក់ពីមូលហេតុ និងចំនួនវិនាទីដែលនៅសល់។ `404 no_executable_targets` ពីការរួមបញ្ចូលគ្នាដូចគ្នា មានន័យថាមិនមានកម្មវិធីកំណត់ពេលភាពធន់ណាមួយពាក់ព័ន្ធទេ (គ្មានអ្វីត្រូវដំណើរការ ឬគណនីទាំងអស់មិនបានឆ្លងកាត់ការត្រួតពិនិត្យភាពអាចប្រើបាន)។ មុខងារនេះត្រូវបានបង្កើតនៅក្នុង `open-sse/services/combo/pinRecovery.ts` ដោយផ្អែកលើបញ្ជីការដកចេញដែលប្រមូលក្នុង `targetResolution.ts`។
- key ទាំងអស់សម្រាប់ provider មួយត្រូវបានរំលង → ពិនិត្យទាំងស្ថានភាព circuit breaker និង `rateLimitedUntil`/`testStatus` របស់ connection នីមួយៗ។
- Provider ត្រូវបានដកចេញជាអចិន្ត្រៃយ៍បន្ទាប់ពី reset window → កូដកំពុងអាន `state` ដោយផ្ទាល់ ជំនួសឱ្យ `getStatus()`/`canExecute()`។
- key មួយបរាជ័យ ប៉ុន្តែ key ផ្សេងទៀតគួរតែដំណើរការ → គួរប្រើ connection cooldown ជំនួស circuit breaker។
- មានតែ model មួយប៉ុណ្ណោះដែលបរាជ័យ → គួរប្រើ model lockout ជំនួស connection cooldown។
- ស្ថានភាពគួរតែស្ដារឡើងវិញដោយខ្លួនឯង ប៉ុន្តែមិនដូច្នោះទេ → ពិនិត្យរក timestamp នាពេលអនាគត និង read path ដែលធ្វើឱ្យស្ថានភាពផុតកំណត់ស្រស់ឡើងវិញ។ ស្ថានភាពអចិន្ត្រៃយ៍តម្រូវឱ្យមានការផ្លាស់ប្តូរដោយដៃ។

---

## ស្នាមម្រាមដៃ TLS និងការលាក់បាំង

ការលាក់បាំងជាក់លាក់តាមអ្នកផ្តល់សេវា (JA3/JA4, CCH, ការធ្វើឱ្យស្មុគស្មាញ) ត្រូវបានចងក្រងឯកសារដោយឡែក — សូមមើល `docs/security/STEALTH_GUIDE.md` (git; មិនត្រូវបានចងក្រងបញ្ចូលក្នុង `/docs`)។

---

## ការធ្វើតេស្តភាពធន់ទ្រាំ (ដំណាក់កាល 8 · ប្លុក C)

ក្រៅពីការធ្វើតេស្តឯកតាសម្រាប់តក្កវិជ្ជាភាពធន់ទ្រាំ មានការធ្វើតេស្តចំនួនបីដែលសាកល្បងពេលដំណើរការក្រោម
លក្ខខណ្ឌសម្ពាធ/បរាជ័យពិតប្រាកដ (ទាំងអស់ជាតេស្តសមាហរណកម្ម/ប្រចាំយប់ — គ្មានតេស្តណាមួយរារាំង PR ទេ)៖

| តេស្ត       | អ្វីដែលធ្វើ                                                                                                                                                                                                | របៀបដំណើរការ                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Chaos       | node ក្លែងក្លាយផ្នែកខាងលើបញ្ចូលភាពយឺតយ៉ាវ/ការកំណត់ឡើងវិញ/ការអស់ពេល/503 ពិតប្រាកដ; ផ្ទៀងផ្ទាត់ថា circuit breaker បើក/ស្ដារឡើងវិញ ហើយ `checkFallbackError` ចាត់ថ្នាក់ 503 ជាផ្លូវបម្រុងដែលអាចស្ដារឡើងវិញបាន។ | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-growth | ~500 streams ក្នុងមួយ `createSSEStream` ក្រោម `--expose-gc`; បរាជ័យប្រសិនបើ heap កើនលើសកម្រិតអតិបរមា (ការការពារ OOM #3069)។                                                                                | `npm run test:heap`                        |
| k6 soak     | បន្ទុកជាប់ជាបន្តបន្ទាប់លើ `/api/monitoring/health`; កម្រិតព្រំដែន p95/កំហុស។                                                                                                                               | `k6 run tests/load/k6-soak.js` (ប្រចាំយប់) |

សម្របសម្រួលដោយ `.github/workflows/nightly-resilience.yml` (cron + dispatch)។ នៅក្នុង
`test:integration` លំនាំដើម chaos និង heap រំលងដោយខ្លួនឯង (បើគ្មាន `RUN_CHAOS_INT`/`--expose-gc`)។

---

## សូមមើលផងដែរ

- [មគ្គុទ្ទេសក៍ស្ថាបត្យកម្ម](./ARCHITECTURE.md) — ស្ថាបត្យកម្មប្រព័ន្ធ និងរចនាសម្ព័ន្ធខាងក្នុង
- [មគ្គុទ្ទេសក៍អ្នកប្រើប្រាស់](../guides/USER_GUIDE.md) — អ្នកផ្តល់សេវា បន្សំ និងការរួមបញ្ចូល CLI
- [ម៉ាស៊ីនបន្សំស្វ័យប្រវត្តិ](../routing/AUTO-COMBO.md) — ការដាក់ពិន្ទុដោយផ្អែកលើ 16 កត្តា និងកញ្ចប់របៀប
