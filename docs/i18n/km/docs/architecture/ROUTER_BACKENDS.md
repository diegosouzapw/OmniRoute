# Router Backends & Embedded Services — architecture contract (ADR) (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **ស្ថានភាព:** បានទទួលយក · **បរិបទ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **កិច្ចសន្យា:** `domain/routing/routerBackends.ts`
> (បញ្ជីចុះឈ្មោះដែលមានប្រភេទ — កូដនឹងត្រូវបានបញ្ចូលជាមួយ [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR នេះកំណត់ឱ្យច្បាស់ពីរបៀបដែលម៉ាស៊ីន `ts` (ដើម), `bifrost`, `cliproxy`, `9router` និង
ម៉ាស៊ីនដែលឆបគ្នាជាមួយ VibeProxy ទាក់ទងគ្នា ដើម្បីឱ្យអ្នករួមចំណែកឈប់ច្រឡំរវាង
អ្វីពីរដែលមានភាពខុសគ្នាខាងស្ថាបត្យកម្ម។ វាកត់ត្រាបញ្ជីចុះឈ្មោះដែលមានប្រភេទ
ដែលត្រូវបានណែនាំដោយការងារ router-backend-registry ជាប្រភពតែមួយនៃ
ការពិតសម្រាប់ម៉ូដែលនោះ។

## ភាពខុសគ្នាស្នូល — អ័ក្សឯករាជ្យពីរ

តួនាទីរបស់ម៉ាស៊ីនមួយត្រូវបានពណ៌នាដោយ **អ័ក្សឯករាជ្យពីរ** ដែលត្រូវបានអ៊ិនកូដរួមគ្នានៅក្នុង
`RouterBackendDefinition` របស់បញ្ជីចុះឈ្មោះ៖

1. **វដ្តជីវិត** (`RouterBackendLifecycle`) — _របៀបដែលម៉ាស៊ីនដំណើរការ_៖
   - `in-process` — ដំណើរការនៅខាងក្នុងដំណើរការ Node របស់ OmniRoute (ខ្សែដំណើរការ TS ដើម)។
   - `supervised` — ដំណើរការរងមូលដ្ឋានដែល OmniRoute ដំឡើង/ចាប់ផ្ដើម/បញ្ឈប់/ពិនិត្យសុខភាព
     តាមរយៈ `ServiceSupervisor` បន្ទាប់មកប្រើប្រាស់វាជាការតភ្ជាប់អ្នកផ្ដល់សេវា។
   - `external` — ចំណុចបញ្ចប់ HTTP ដែល OmniRoute បញ្ជូនសំណើទៅ ប៉ុន្តែ **មិន** គ្រប់គ្រង
     (កំណត់រចនាសម្ព័ន្ធដោយ URL មូលដ្ឋានពី env)។
   - `disabled` — បានចុះឈ្មោះ ប៉ុន្តែមិនអាចជ្រើសរើសបាន។
2. **អ័ក្សជ្រើសរើស** (backend កំណត់ផ្លូវ relay) — _ថាតើ relay បញ្ជូនសំណើទៅវាឬអត់_៖
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` នៅក្នុង
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`។

កំហុសដែលត្រូវជៀសវាង៖ ចាត់ទុក «សេវាបង្កប់» និង «backend កំណត់ផ្លូវ» ជាបញ្ជីតែមួយ។
វាមិនមែនដូច្នោះទេ។ ម៉ាស៊ីន `supervised` (9router/cliproxy) គឺជា **ការតភ្ជាប់
អ្នកផ្ដល់សេវាដែលត្រូវបានប្រើប្រាស់ដោយខ្សែដំណើរការដើម** មិនមែនជា backend ជំនួសសម្រាប់ការបញ្ជូន relay
នោះទេ។ `bifrost` គឺផ្ទុយមកវិញ — ជា backend សម្រាប់ការបញ្ជូន relay ដែល (តាមប្រវត្តិ)
មានតែជា `external` ប៉ុណ្ណោះ។

## បញ្ជីចុះឈ្មោះ — ប្រភពតែមួយនៃការពិត

កិច្ចសន្យា `domain/routing/routerBackends.ts` (កូដនឹងត្រូវបានបញ្ចូលជាមួយ
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) ប្រកាសម៉ាស៊ីននីមួយៗម្ដងគត់ រួមជាមួយ
វដ្តជីវិត សមត្ថភាព អត្តសញ្ញាណសេវា ច្រកលំនាំដើម ការកំណត់រចនាសម្ព័ន្ធសុខភាព និង
ការគាំទ្រ telemetry របស់វា។ អ្នកប្រើប្រាស់ស្វែងរកម៉ាស៊ីនតាមរយៈ `getRouterBackend(id)`,
`listRouterBackends()` និង `listRouterBackendsByCapability(cap)` ជំនួសឱ្យ
ការដាក់លក្ខខណ្ឌពិសេសសម្រាប់ sidecar នីមួយៗ។

| Backend     | វដ្តជីវិត    | សេវា (អ័ក្ស A) | Backend របស់ relay (អ័ក្ស B) | សុខភាព        | ច្រកលំនាំដើម |
| ----------- | ------------ | -------------- | ---------------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —              | `ts` (ដើម)                   | —             | —            |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`           | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`     | — (អ្នកផ្ដល់សេវា)            | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`      | — (អ្នកផ្ដល់សេវា)            | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —              | — (អាដាប់ទ័រអ្នកផ្ដល់សេវា)   | `/v1/models`  | —            |

¹ ការដំឡើងឋានៈ Bifrost ទៅជាសេវាបង្កប់ `supervised` (អាចដំឡើង/ចាប់ផ្ដើមបាន
ពី `/api/services/bifrost/`) កំពុងត្រូវបានតាមដាននៅក្នុង
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); រហូតដល់វាត្រូវបានបញ្ចូល
Bifrost មានតែជា `external` ប៉ុណ្ណោះ (អាចចូលដំណើរការបានតែតាមរយៈ `BIFROST_BASE_URL`)។

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) អនុញ្ញាតឱ្យអ្នកហៅ
ត្រងតាមអ្វីដែលម៉ាស៊ីនអាចធ្វើបានពិតប្រាកដ ជំនួសឱ្យការសរសេរសាខាលក្ខខណ្ឌតាម id នីមួយៗ។

## អ័ក្ស A — សេវាបង្កប់ (ផ្នែក process ដែលត្រូវបានត្រួតពិនិត្យ)

- **បញ្ជីឈ្មោះ process ដែលត្រូវបានត្រួតពិនិត្យ:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (បច្ចុប្បន្ន៖ `9router`, `cliproxy`)។
- **ម្ចាស់ lifecycle:** `src/lib/services/ServiceSupervisor.ts` — `start()` បង្កើត
  child process, រារាំងរហូតដល់ `waitForHealthy()`, និងបញ្ជូន stdout/stderr ចូលក្នុង ring buffer;
  `stop()` SIGTERM→SIGKILL; ប្រតិបត្តិការទាំងអស់ត្រូវបានតម្រៀបជាលំដាប់ក្រោម lock មួយ។
- **State union** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error` រួមទាំង
  `HealthState = healthy | unhealthy | unknown` ដែលឯករាជ្យពី state ខាងលើ។
- **ហេតុអ្វីបានជាប្រើ process ដាច់ដោយឡែក (មិនមែន in-proc SDK)?** ការបំបែក process គឺជាអ្វីដែលធ្វើឱ្យ
  install/start/stop/health/logs អាចគ្រប់គ្រងដោយឯករាជ្យសម្រាប់ sidecar នីមួយៗ និងអនុញ្ញាតឱ្យ
  loopback spawn-guard អនុវត្តបាន។ ការបង្កើតម៉ូដែល in-proc adapter គឺជាកិច្ចការសម្រាប់ពេលអនាគត —
  capability flag `native-hot-path` គឺជាកន្លែងដែលវានឹងត្រូវបានបញ្ជាក់។

### កិច្ចសន្យា lifecycle route (`/api/services/<tool>/…`)

កូដស្ថានភាពគឺ **ជាក់លាក់តាម state/verb/path ដោយចេតនា** — នេះគឺជាកិច្ចសន្យា មិនមែនជា
ភាពមិនស៊ីសង្វាក់គ្នាទេ៖

| ការហៅ                        | លក្ខខណ្ឌ                            | ស្ថានភាព                             |
| ---------------------------- | ----------------------------------- | ------------------------------------ |
| `POST .../start`             | សេវា `not_installed`                | **409** (លក្ខខណ្ឌជាមុន)              |
| `POST .../stop`              | បានឈប់រួចហើយ                        | **200** (no-op ដែលមាន idempotent)    |
| `GET .../status`             | ប្រក្រតី                            | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | ការបង្កើត process បរាជ័យ            | **503** (បណ្ដោះអាសន្ន)               |
| `GET .../status`, `.../stop` | កំហុសដែលមិនបានចាប់                  | **500**                              |
| `GET /api/services/<x>/logs` | មិនស្គាល់ tool `<x>`                | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | ខ្វះ `X-Reveal-Confirm: yes`        | **403** (សម្រាប់តែ 9router)          |
| **ណាមួយ** `/api/services/*`  | អ្នកហៅមិនមែនជា loopback/private-LAN | **403 LOCAL_ONLY**                   |

error body ទាំងអស់ត្រូវបានរៀបចំទម្រង់ដោយ `createErrorResponse()` →
`{ error: { message, type }, requestId }` ដែល `type` ត្រូវបានកំណត់ពីស្ថានភាព
(`500→server_error`, `404→not_found`, `409→conflict`, ក្រៅពីនេះ `invalid_request`) ហើយជា
តម្លៃសម្គាល់ដែលម៉ាស៊ីនអាចយកទៅធ្វើសកម្មភាពបាន។ សារត្រូវបានសម្អាតជាមុន
(`sanitizeErrorMessage()`, Hard Rule #12)។

**loopback guard** គឺជាប្រភពទូទៅបំផុតនៃ `403`៖ `/api/services/` ស្ថិតក្នុង
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) ហើយ
`src/server/authz/policies/management.ts` បដិសេធអ្នកហៅដែលមិនមែនជា loopback / private-LAN
**មុន auth** ពីព្រោះ route ទាំងនេះបង្កើត child process (Hard Rules 15
និង 17)។ ការចូលប្រើពួកវាតាមរយៈ public tunnel ទទួលបាន `403` តាមការរចនា។

## អ័ក្ស B — relay routing backend (ផ្នែក dispatch)

មានតែ relay proxy path `/api/v1/relay/chat/completions` ប៉ុណ្ណោះដែលជ្រើសរើស dispatch
backend; interface ចម្បង `/api/v1/chat/completions` មិនដែលពិនិត្យ
`routingBackend.ts` ទេ។

- **ការជ្រើសរើស** (`resolveRelayRoutingBackend`)៖ global env toggle តែមួយ —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}។
  ប្រសិនបើមិនបានកំណត់ វានឹងជា `auto` នៅពេល Bifrost ត្រូវបានកំណត់រចនាសម្ព័ន្ធ+បើកប្រើ បើមិនដូច្នោះទេ វាជា `ts`។
- **ឥរិយាបថ៖**
  - `bifrost` (បង្ខំ)៖ Bifrost បរាជ័យ → `502` ដាច់ខាត ដោយគ្មាន fallback។
  - `auto`៖ សាកល្បង Bifrost ហើយនៅពេលបរាជ័យ/cooldown នឹងបន្តទៅ native ដោយស្ងៀមស្ងាត់។
  - `ts` / ក្រោយ fallback៖ native `open-sse` translator/executor pipeline។
- **Cooldown:** cooldown ពេលបរាជ័យសម្រាប់ `baseUrl` នីមួយៗនៅក្នុង `bifrostCooldown.ts`។

ការជ្រើសរើសគឺ **ទាំងអស់ឬគ្មានទាំងអស់នៅកម្រិត relay នាពេលបច្ចុប្បន្ន** — មិនមានការប្ដូរ engine តាម provider
ឬតាម request នៅលើ `release/v3.8.43` ទេ។ per-request gate កំពុងត្រូវបានបន្ថែម
ដោយ sidecar-manifest work
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`)
ដែលអនុញ្ញាតឱ្យ `auto` បញ្ជូនតែ provider ដែលមានសិទ្ធិតាម manifest ប៉ុណ្ណោះតាមរយៈ Bifrost។

## ការរួមបញ្ចូលជាមួយផ្ទាំងគ្រប់គ្រង

ផ្ទាំងគ្រប់គ្រងសេវាកម្មស្ទង់មើល `GET /api/services/<tool>/status` រៀងរាល់ 5 វិនាទី តាមរយៈ
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
ដោយត្រឡប់ `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`។ មិនមាន availability-context provider រួមទេ —
សមាសភាគនីមួយៗហៅ hook ដោយឡែកសម្រាប់ tool នីមួយៗ។ នៅពេល `!res.ok` បច្ចុប្បន្ន hook បង្ហាញតែ
`HTTP <status>` សុទ្ធៗ។ ការផ្គូផ្គងវាល `error.type` ទៅនឹងការពន្យល់ដែលមនុស្សអាចយល់បាន គឺជា
ការកែលម្អ UX ដែលកំពុងត្រូវបានតាមដាន មិនមែនជាការផ្លាស់ប្តូរ contract ទេ។

## ផលវិបាក

- engine ថ្មីៗចុះឈ្មោះតែម្តងនៅក្នុង `ROUTER_BACKENDS` ហើយ consumer អាចប្រើពួកវាបានតាមរយៈ capability
  query ដោយមិនចាំបាច់បន្ថែម branch ថ្មីសម្រាប់ id នីមួយៗ។
- សំណួរ "តើនេះជាសេវាកម្ម ឬ routing backend?" ត្រូវបានឆ្លើយដោយវាល `lifecycle` មិនមែន
  ដោយផ្អែកលើថា id មួយកើតមានក្នុងបញ្ជីណាមួយនោះទេ។
- ការគ្រប់គ្រងត្រួតពិនិត្យ Bifrost (#5817) និងការផ្លាស់ប្តូរ native hot-path (#5670) ត្រូវបានបង្កើតឡើងដោយផ្អែកលើ
  contract រួមនេះ ជំនួសឱ្យការដាក់ករណីពិសេសសម្រាប់ sidecar នីមួយៗ។
