# Monitoring & Observability Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **សរុបខ្លីៗ**: OmniRoute ភ្ជាប់មកជាមួយការត្រួតពិនិត្យសុខភាពដែលមានស្រាប់, provider autopilot, ការតាមដានកូតា និង observability hooks។ មគ្គុទ្ទេសក៍នេះគ្របដណ្តប់លើ dashboard, ការជូនដំណឹង និងការដោះស្រាយបញ្ហា។

**ប្រភព៖**

- `src/lib/monitoring/observability.ts` — snapshot នៃ observability
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot សុខភាពរបស់ combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot របស់ provider
- `src/lib/monitoring/providerHealthMatrix.ts` — ម៉ាទ្រីសសុខភាពរបស់ provider
- `src/lib/localHealthCheck.ts` — ការត្រួតពិនិត្យសុខភាពក្នុងមូលដ្ឋាន
- `src/lib/tokenHealthCheck.ts` — សុខភាពនៃការធ្វើឱ្យ token ស្រស់ឡើងវិញ
- `src/lib/proxyHealth.ts` — cache សុខភាពរបស់ proxy (បានរៀបរាប់ក្នុង PROXY_GUIDE.md)

---

## ទិដ្ឋភាពទូទៅ

OmniRoute មាន **ការត្រួតពិនិត្យ 3 ស្រទាប់**៖

```
┌──────────────────────────────────────────────────────────────┐
│  ស្រទាប់ទី 1៖ សុខភាពប្រព័ន្ធ (កម្រិត server)                    │
│  ├─ localHealthCheck.ts — DB, ports, native deps              │
│  ├─ db/healthCheck.ts — integrity, FK, orphaned artifacts     │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  ស្រទាប់ទី 2៖ សុខភាព Provider (ភាពធន់តាម provider នីមួយៗ)       │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — ពិន្ទុសុខភាពតាម provider/model    │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  ស្រទាប់ទី 3៖ Observability ផ្ទាល់ (runtime snapshots)          │
│  ├─ observability.ts — circuit breakers, sessions, quota       │
│  ├─ tokenHealthCheck.ts — សុខភាពនៃការធ្វើឱ្យ OAuth token ស្រស់ឡើងវិញ │
│  └─ ឧបករណ៍ MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ទំព័រ Dashboard

### `/dashboard/health` (សុខភាពប្រព័ន្ធ)

Dashboard សុខភាពកម្រិតកំពូលបង្ហាញ៖

| ផ្នែក                      | អ្វីដែលវាបង្ហាញ                                        |
| -------------------------- | ------------------------------------------------------ |
| **ស្ថានភាព Server**        | រយៈពេលដំណើរការ, version, port, ការតភ្ជាប់សកម្ម         |
| **Database**               | ការតភ្ជាប់, integrity, ទំហំ WAL, migrations ថ្មីៗ      |
| **សេចក្តីសង្ខេប Provider** | ចំនួនសកម្ម, ចំនួនដែលមានសុខភាពល្អ, ចំនួន breaker ដែលបើក |
| **ឧបករណ៍ត្រួតពិនិត្យកូតា** | sessions សកម្ម, ការជូនដំណឹង, កូតាដែលបានប្រើអស់         |
| **កំហុសថ្មីៗ**             | កំហុស 10 ចុងក្រោយជាមួយ stack traces                    |
| **ការប្រើប្រាស់ធនធាន**     | Memory, CPU, សូចនាករសម្ពាធ heap                        |

### `/dashboard/providers` (សុខភាព Provider)

Dashboard សម្រាប់ provider នីមួយៗ៖

| ជួរឈរ      | សេចក្តីពិពណ៌នា                                 |
| ---------- | ---------------------------------------------- |
| Provider   | Provider ID + ឈ្មោះបង្ហាញ                      |
| សុខភាព     | ស្ថានភាពពណ៌បៃតង/លឿង/ក្រហម                      |
| Circuit    | ស្ថានភាពបើក/បិទ/បើកពាក់កណ្តាល                  |
| ការតភ្ជាប់ | ចំនួនការតភ្ជាប់, ការធ្វើឱ្យស្រស់ចុងក្រោយ       |
| Models     | models ដែលអាចប្រើបាន, សុខភាពតាម model          |
| ថ្លៃចំណាយ  | ថ្លៃចំណាយថ្ងៃនេះ, និន្នាការ 7 ថ្ងៃ             |
| កំហុស      | ចំនួនកំហុសក្នុង 24h ចុងក្រោយ, ប្រភេទកំហុសចម្បង |

ចុចលើ provider ដើម្បីមើល៖

- សំណើថ្មីៗជាមួយការបែងចែក latency
- ពិន្ទុសុខភាពតាមការតភ្ជាប់នីមួយៗ
- ការចាក់សោតាម model នីមួយៗ
- អនុសាសន៍ពី Autopilot

### `/dashboard/quota` (ការតាមដានកូតា)

សម្រាប់ API key នីមួយៗ៖

- ការប្រើប្រាស់បច្ចុប្បន្នធៀបនឹងដែនកំណត់ (របារវឌ្ឍនភាព)
- និន្នាការកូតា (គំនូសតាង 30 ថ្ងៃ)
- ពេលវេលាកំណត់ឡើងវិញបន្ទាប់
- ប្រវត្តិការជូនដំណឹង

### `/dashboard/combos` (សុខភាព Combo)

សម្រាប់ combo នីមួយៗ៖

- យុទ្ធសាស្ត្រ + គោលដៅ
- សុខភាពតាមគោលដៅនីមួយៗ
- ព្រឹត្តិការណ៍ fallback ថ្មីៗ
- អត្រាជោគជ័យ (24h, 7d, 30d)

---

## API សម្រាប់ពិនិត្យសុខភាព

OmniRoute ផ្តល់ចំណុចប្រទាក់សុខភាព HTTP ចំនួន **ពីរ**។ ចំណុចប្រទាក់ទាំងនេះមិនអាចប្រើជំនួសគ្នាសម្រាប់កម្មវិធីរៀបចំដំណើរការបានទេ។

| ផ្លូវ                        | គោលបំណង                                                                       | បន្ទុក                                        | ប្រើសម្រាប់                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET /healthz`               | ភាពនៅរស់/ភាពត្រៀមរួចនៃវដ្តជីវិត (`ok` / `starting` / `stopping`)              | ស្រាលបំផុត (តែទង់ដំណាក់កាលប៉ុណ្ណោះ)           | **readiness** របស់ Kubernetes; **liveness** កម្រិតស្រាល ប្រសិនបើអ្នកត្រូវតែប្រើ HTTP |
| `GET /api/monitoring/health` | សេចក្តីសង្ខេបស៊ីជម្រៅអំពីប្រព័ន្ធ + អ្នកផ្តល់សេវា (DB, heap, ចំនួនកាតាឡុក, …) | ធ្ងន់ (ការងារ DB សមកាលកម្ម / ការត្រួតពិនិត្យ) | ផ្ទាំងព័ត៌មាន, ការពិនិត្យស៊ីជម្រៅបែប blackbox, healthcheck ដែលភ្ជាប់មកជាមួយ Docker   |

> **ចំណាំ៖** ម៉ាទ្រីសសុខភាពរបស់អ្នកផ្តល់សេវា, បញ្ហា autopilot, កម្មវិធីត្រួតពិនិត្យកូតា, សុខភាពថូខឹន និងព័ត៌មានលម្អិតអំពី latency ដែលលើសពី `/api/monitoring/health` អាចរកបានតាមរយៈ **ឧបករណ៍ MCP** `observability_snapshot` ឬទំព័រ **ផ្ទាំងព័ត៌មាន** — មិនមានផ្លូវ REST ជាក់លាក់សម្រាប់ទិន្នន័យទាំងនោះទេ។

ផ្លូវទាំងពីរដំណើរការលើ **event loop របស់ Node តែមួយ** ដូចនឹងការដោះស្រាយសំណើដែរ។ ផ្លូវដែលប្រើ CPU ខ្លាំង (ការងារកាតាឡុក `GET /v1/models` ទំហំធំ, ការបង្ហាប់បរិបទវែង / ការរាប់ថូខឹន) អាចពន្យារពេលកម្មវិធីដោះស្រាយ HTTP **ទាំងអស់** រួមទាំង `/healthz`។ event loop រវល់ ≠ ដំណើរការបានស្លាប់។ គួរដោះស្រាយការងារដែលប្រើធនធានខ្លាំងជាមុន; ការកែសម្រួល probe គ្រាន់តែកាត់បន្ថយការបញ្ឈប់ដោយខុសប៉ុណ្ណោះ។

### Probe ស្រាលសម្រាប់កម្មវិធីរៀបចំដំណើរការ

```bash
GET /healthz
# ឬ HEAD /healthz
```

- **200** + តួខ្លឹមសារ `ok` នៅពេលដំណាក់កាលវដ្តជីវិតរបស់ម៉ាស៊ីនមេត្រៀមរួច
- **503** + `starting` / `stopping` ក្នុងអំឡុងពេលចាប់ផ្តើម ឬបិទ
- ការអនុវត្ត៖ `src/app/healthz/route.ts` (គ្មានការផ្ញើ ping ទៅ DB)

### សុខភាពប្រព័ន្ធ (ស៊ីជម្រៅ)

```bash
GET /api/monitoring/health
```

ការឆ្លើយតប៖

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`៖ probe-cache ទល់នឹង `test_status` របស់ SQLite

`GET /api/monitoring/health` → `credentialHealth` គឺជា **រង្វាស់ probe-cache ក្នុងអង្គចងចាំ**
មិនមែនជាការទាញយកទិន្នន័យផ្ទាល់ពី `provider_connections.test_status` ទេ។ បន្ទាប់ពី #12532 ផ្លូវ
សំណើអានតែ `getCachedCredentialHealthSummary()` ប៉ុណ្ណោះ; probe ផ្ទៃខាងក្រោយ
ធ្វើបច្ចុប្បន្នភាព cache នៅក្រៅ event loop។

| ស្រទាប់                              | ទីតាំង                                                                | អត្ថន័យ                                                                                                                                                                                                                              |
| ------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| រង្វាស់ probe-cache                  | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | លទ្ធផល probe សុខភាពព័ត៌មានសម្ងាត់ចុងក្រោយដែលនៅតែរក្សាទុកក្នុងអង្គចងចាំរបស់ដំណើរការ។ `source` តែងតែជា `probe-cache`។                                                                                                                  |
| ព័ត៌មានលម្អិតអំពីការតភ្ជាប់ដែលបរាជ័យ | `credentialHealth.failedConnections`                                  | មានវត្តមាន **តែនៅពេល `failed > 0`**។ បញ្ជីមានកំណត់នៃជួរដេក cache ដែលមាន `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` ដែលបានសម្អាត)។ `failedOmitted` ត្រូវបានកំណត់ នៅពេលបញ្ជីត្រូវបានកាត់ត្រឹមកម្រិតកំណត់។ |
| ស្ថានភាពជាប់រក្សាទុករបស់ SQLite      | `credentialHealth.staleDbNonOkCount`                                  | ចំនួនជួរដេកនៃការតភ្ជាប់ **សកម្ម** (`is_active=1`) ដែល `test_status` រក្សាទុករបស់វាជាស្ថានភាព non-ok ដែលស្គាល់ (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)។                                     |

ស្រទាប់ទាំងពីរអាចខុសគ្នាដោយចេតនា៖

- រង្វាស់ `failed=0` ខណៈដែល `staleDbNonOkCount>0` — SQLite នៅតែមាន
  `test_status` ដែលជាប់រក្សាទុក (ឧទាហរណ៍ `expired` ឬ `credits_exhausted`) ដែល snapshot
  probe-cache ចុងក្រោយមិនរាប់ជា `status=error`។
- រង្វាស់ `failed>0` ខណៈដែល SQLite មើលទៅមានសុខភាពល្អ — probe ថ្មីៗនេះបានបរាជ័យ និងត្រូវបាន
  រក្សាទុកក្នុង cache; ជួរដេក DB មិនទាន់ត្រូវបានធ្វើបច្ចុប្បន្នភាព ឬត្រូវបានសម្អាតនៅពេលក្រោយ។

កុំបង្កើតការជូនដំណឹងដោយផ្អែកតែលើ `provider_connections.test_status` នៅពេលប្រមូលទិន្នន័យពី
endpoint នេះ។ ប្រើ `failed` + `failedConnections` សម្រាប់ការបរាជ័យនៃ probe ផ្ទាល់ និង
`staleDbNonOkCount` នៅពេលអ្នកត្រូវការចំនួនស្ថានភាពជាប់រក្សាទុក។

### អនុសាសន៍អំពី probe របស់ Kubernetes

OmniRoute គឺជា **ដំណើរការ Node តែមួយ** (event loop មួយ)។ `HEALTHCHECK` ស្តង់ដាររបស់ Docker កំណត់គោលដៅទៅកាន់ `/healthz` ដែលស្រាល។ `/api/monitoring/health` គឺ **ធ្ងន់ពេក** សម្រាប់ចន្លោះពេល liveness របស់ kubelet។

| Probe              | គោលដៅដែលបានណែនាំ                                                          | កំណត់ចំណាំ                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ការចាប់ផ្ដើម**   | HTTP `GET /healthz` ជាមួយ `failureThreshold` វែង (ឬ `startPeriod` ធំ)     | ការចាប់ផ្ដើមដំបូង + ការផ្ទេរទិន្នន័យ SQLite អាចចំណាយពេលលើសពីពីរបីវិនាទី                                                                                                                                                                                                                                                                                              |
| **ភាពរួចរាល់**     | HTTP `GET /healthz`                                                       | វដ្តជីវិត `ok` / `starting` / `stopping` (200 ទល់នឹង 503)។ វានៅតែប្រែប្រួល ប្រសិនបើរង្វិលជុំត្រូវបានរាំងខ្ទប់ដោយ CPU។ **ការទទួលបាន 200 ក្នុងរយៈពេលច្រើនវិនាទី មិនមែនមានសុខភាពល្អទេ** (#10303) — វាមានន័យថា event loop ត្រូវបានអត់ឃ្លាន មុនពេល handler ទំហំ 3-byte ដំណើរការ                                                                                           |
| **ភាពនៅរស់**       | HTTP `GET /livez`, **ឬ TCP** នៅលើច្រកសេវាចម្បង (`PORT`, លំនាំដើម `20128`) | `/livez` ពិនិត្យតែថា process នៅរស់ប៉ុណ្ណោះ (តែងតែជា 200 ប្រសិនបើ handler ដំណើរការ)។ វានៅតែប្រើ event loop រួមគ្នា — រវល់ ≠ ស្លាប់ ហើយវាមិនអាចរកឃើញការអត់ឃ្លានរបស់ event loop (#10303) បានល្អជាង TCP ទេ។ គួរប្រើ **TCP** ប្រសិនបើ HTTP probes អស់ពេលរង់ចាំក្រោមបន្ទុកកាតាឡុក/ការបង្ហាប់; ទោះយ៉ាងណាក៏ដោយ **កុំ** បញ្ឈប់ pod ដោយសារការជាប់គាំងរយៈពេលខ្លីរបស់ event loop |
| **សុខភាពស៊ីជម្រៅ** | `GET /api/monitoring/health` ពីកម្មវិធីត្រួតពិនិត្យខាងក្រៅ                | មិនមែនសម្រាប់ `livenessProbe` របស់ kubelet / `readinessProbe` ដែលមានចន្លោះតឹងទេ                                                                                                                                                                                                                                                                                      |

ទម្រង់ឧទាហរណ៍ (កែសម្រួលកម្រិតកំណត់ទៅតាមបន្ទុកនៃការចាប់ផ្ដើមដំបូង និងការបង្ហាប់របស់អ្នក):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # នៅពេល event loop ជាប់គាំង HTTP /livez នៅតែអាចអស់ពេលរង់ចាំ។ TCP គឺជា
  # ជម្រើសបែបអភិរក្ស:
  # tcpSocket:
  #   port: http
```

**កុំ** កំណត់ **liveness** របស់ kubelet ទៅកាន់ `/api/monitoring/health`។ ផ្លូវនោះអនុវត្តការងារ DB/ការត្រួតពិនិត្យពិតប្រាកដ ហើយនឹងផ្ដល់លទ្ធផលវិជ្ជមានក្លែងក្លាយក្រោមបន្ទុក។

ពាក់ព័ន្ធ៖ [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (probes ខណៈដែល event loop កំពុងរវល់), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (ការកំណត់តម្លៃកាតាឡុកប្រើធនធានច្រើន), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (ការរាប់ token សម្រាប់ការបង្ហាប់ប្រើធនធានច្រើន)។

### systemd watchdog (event loop ដែលជាប់គាំង)

នៅលើ host ដែលប្រើ systemd OmniRoute ជូនដំណឹងដល់កម្មវិធីគ្រប់គ្រងសេវា នៅពេលវារួចរាល់ ហើយបន្តផ្ញើ ping ទៅវា ដូច្នេះ server ដែល event loop របស់វាជាប់គាំង នឹងត្រូវបានបញ្ឈប់ និងចាប់ផ្ដើមឡើងវិញ ជំនួសឱ្យការបន្តដំណើរការដោយស្ងាត់ស្ងៀម។ ping ទាំងនេះចេញពី event loop ផ្ទាល់របស់ server៖ នៅពេលវាត្រូវបានរាំងខ្ទប់ ping នឹងឈប់ ហើយ systemd ចាប់ផ្ដើមសេវាឡើងវិញ នៅពេល `WatchdogSec` កន្លងផុតដោយមិនទទួលបាន ping ណាមួយ។

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) សរសេរ user unit ដែលមានមុខងារនេះរួចហើយ។ unit ដែលអ្នកសរសេរដោយខ្លួនឯង (`Type=simple` តាមលំនាំដើម) មិនមាន watchdog ទេ ដូច្នេះសូមបន្ថែមបន្ទាត់ទាំងនេះទៅផ្នែក `[Service]` របស់វា៖

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

unit ដែលបានបង្កើតកំណត់ `Restart=on-failure` ដូច្នេះសូមបន្ថែមបន្ទាត់នោះផងដែរ — បើគ្មានវា watchdog នឹងគ្រាន់តែបញ្ឈប់សេវាដែលជាប់គាំង ជំនួសឱ្យការចាប់ផ្ដើមវាឡើងវិញ។

- `Type=notify`: សេវាត្រូវបានចាត់ទុកថា "បានចាប់ផ្ដើម" នៅពេល server ផ្ញើ `READY=1` មិនមែននៅពេល process បង្កើត fork ទេ។ `TimeoutStartSec` កំណត់ព្រំដែនសម្រាប់ការចាប់ផ្ដើមយឺត។
- `NotifyAccess=all`: ping ត្រូវបានផ្ញើដោយ server process ដែលជា child របស់ supervisor `omniroute serve`។
- `WatchdogSec`: ping ត្រូវបានផ្ញើរៀងរាល់ 60 វិនាទី ដូច្នេះត្រូវប្រើ **120 ឬច្រើនជាងនេះ**។ តម្លៃតូចជាងនេះនឹងចាប់ផ្ដើម server ដែលមានសុខភាពល្អឡើងវិញ។
- ដំណើរការ `omniroute serve` នៅ foreground។ `--daemon` ផ្ដាច់ server ចេញពី cgroup របស់ unit ហើយការចាប់ដៃ notify នឹងមិនដែលបញ្ចប់ទេ។

ពិនិត្យថាវាសកម្មបន្ទាប់ពីការចាប់ផ្ដើមឡើងវិញ៖

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` បង្ហាញរយៈពេលពន្យារដែលបានកំណត់ ហើយ `WatchdogTimestamp` រំកិលទៅមុខរៀងរាល់នាទី។ ការចាប់ផ្ដើមឡើងវិញដែលបង្កឡើងដោយ watchdog ត្រូវបានកត់ត្រាជា `Result=watchdog`។ ដើម្បីបិទ ping ខណៈរក្សា unit ឱ្យនៅដដែល សូមកំណត់ `OMNIROUTE_DISABLE_SD_NOTIFY=1`; បើគ្មាន `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) គ្មានអ្វីត្រូវបានផ្ញើទេ។

watchdog ពិនិត្យតែថា event loop នៅតែបន្តដំណើរការ។ server ដែលយឺត ប៉ុន្តែនៅតែដំណើរការ នឹងមិនត្រូវបានចាប់ផ្ដើមឡើងវិញទេ។

### ការងារផ្លូវសំណើជាជម្រើស (អង្គចងចាំ ជំនាញ ការធ្វើឱ្យ token ថ្មីឡើងវិញ)

ការស្រង់ memory, ការបញ្ចូល skills និងការធ្វើឱ្យ OAuth token ស្រស់ឡើងវិញ ប្រើប្រាស់ **main Node event loop** រួមគ្នាជាមួយ `/healthz`។ ពួកវាជាមុខងារដែលអាចបិទបើកបាននៅលើ dashboard (`memoryEnabled`, `skillsEnabled`) មិនមែនជា worker pool ទេ។ សូមមើល [Environment — ការចំណាយលើ event loop](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)។

### ស្ថានភាព Provider

> **មិនមាន REST endpoint ទេ។** ទិន្នន័យស្ថានភាពរបស់ provider អាចរកបានតាមរយៈ MCP tool `observability_snapshot` ឬទំព័រ `/dashboard/providers` របស់ dashboard។

### ព័ត៌មានលម្អិតអំពី Provider

> **មិនមាន REST endpoint ទេ។** ព័ត៌មានលម្អិតតាម provider នីមួយៗអាចរកបានតាមរយៈទំព័រ `/dashboard/providers` របស់ dashboard។

---

## អូតូពីឡុតសុខភាពរបស់អ្នកផ្តល់សេវា

ម៉ូឌុល `providerHealthAutopilot.ts` គឺជា **ប្រព័ន្ធស្វ័យស្ដារឡើងវិញ** ដែល៖

1. រកឃើញបញ្ហារបស់អ្នកផ្តល់សេវា (សៀគ្វីបើក រយៈពេលរង់ចាំ ការចាក់សោ និងការព្រមានអំពីកូតា)
2. បង្កើត **សកម្មភាពដែលបានណែនាំ** ដើម្បីដោះស្រាយបញ្ហាទាំងនោះ
3. អាច **អនុវត្តដោយស្វ័យប្រវត្តិ** នូវសកម្មភាពដែលមានហានិភ័យទាប

### ប្រភេទបញ្ហាដែលបានរកឃើញ

| ប្រភេទបញ្ហា                  | កម្រិតធ្ងន់ធ្ងរ | លក្ខខណ្ឌឧទាហរណ៍                                             |
| ---------------------------- | --------------- | ----------------------------------------------------------- |
| `provider_circuit_open`      | ធ្ងន់ធ្ងរ       | សៀគ្វីកាត់ផ្ដាច់បើក បន្ទាប់ពីបរាជ័យ 5 ដង                    |
| `provider_circuit_half_open` | ព្រមាន          | សៀគ្វីកំពុងសាកល្បងការស្ដារឡើងវិញ                            |
| `connection_cooldown`        | ព្រមាន          | ការតភ្ជាប់ស្ថិតក្នុងរយៈពេលរង់ចាំ បន្ទាប់ពីទទួល 429          |
| `stale_connection_error`     | ព្រមាន          | ការធ្វើឱ្យស្រស់ចុងក្រោយបានបរាជ័យកាលពី 30 នាទីមុន ឬយូរជាងនេះ |
| `terminal_connection_error`  | ធ្ងន់ធ្ងរ       | OAuth ត្រូវបានដកហូត ឬកូនសោមិនត្រឹមត្រូវ                     |
| `inactive_connection`        | ព័ត៌មាន         | ការតភ្ជាប់ត្រូវបានបិទនៅក្នុងការកំណត់                        |
| `model_lockout`              | ព្រមាន          | ម៉ូដែលជាក់លាក់ស្ថិតក្នុងការដាក់ឱ្យនៅដាច់ដោយឡែក              |
| `quota_monitor_warning`      | ព្រមាន          | ការប្រើប្រាស់កូតាឈានដល់ 80% ឬច្រើនជាងនេះ                    |

### ប្រភេទសកម្មភាពដែលបានបង្កើត

| សកម្មភាព                       | ហានិភ័យ | ការពិពណ៌នា                                            |
| ------------------------------ | ------- | ----------------------------------------------------- |
| `clear_provider_breaker`       | មធ្យម   | កំណត់សៀគ្វីកាត់ផ្ដាច់ឡើងវិញទៅជាស្ថានភាពបិទ            |
| `clear_connection_cooldown`    | ទាប     | ដករយៈពេលរង់ចាំចេញពីការតភ្ជាប់                         |
| `clear_stale_connection_error` | ទាប     | សម្អាតសញ្ញាសម្គាល់កំហុសចាស់                           |
| `clear_model_lockout`          | ទាប     | បើកដំណើរការម៉ូដែលដែលត្រូវបានដាក់ឱ្យនៅដាច់ដោយឡែកឡើងវិញ |
| `reactivate_connection`        | មធ្យម   | បើកដំណើរការការតភ្ជាប់ដែលត្រូវបានបិទឡើងវិញ             |
| `deactivate_connection`        | ខ្ពស់   | បិទការតភ្ជាប់ដែលមានបញ្ហា                              |

### API

> **មិនមាន REST endpoint ទេ។** បញ្ហារបស់អូតូពីឡុតអាចរកបានតាមរយៈឧបករណ៍ MCP `observability_snapshot` ឬផ្ទាំងគ្រប់គ្រង។ អូតូពីឡុតដំណើរការនៅខាងក្នុង ហើយឥរិយាបថរបស់វាត្រូវបានកំណត់រចនាសម្ព័ន្ធតាមរយៈ DB ការកំណត់ (វាល `autopilotMode` សម្រាប់ការតភ្ជាប់នីមួយៗ) មិនមែនអថេរបរិស្ថានទេ — ការប្រើ `grep -rn` ដើម្បីស្វែងរកអថេរបរិស្ថានសម្រាប់មុខងារអូតូពីឡុតនឹងមិនឃើញលទ្ធផលទេ។

### របៀបអូតូពីឡុត

តាមលំនាំដើម អូតូពីឡុតដំណើរការក្នុង **របៀបដោយដៃ** — វារកឃើញបញ្ហា និងបង្កើតសកម្មភាពដែលបានណែនាំ ប៉ុន្តែមិនអនុវត្តសកម្មភាពទាំងនោះដោយស្វ័យប្រវត្តិទេ។ សកម្មភាពអាចត្រូវបានអនុវត្តតាមរយៈផ្ទាំងគ្រប់គ្រង។

---

## អូតូពីឡុតសុខភាព Combo

`comboHealthAutopilot.ts` គឺជាសមមូល **សម្រាប់ combo ជាក់លាក់** នៃអូតូពីឡុតរបស់អ្នកផ្តល់សេវា។ វា៖

- រកឃើញ combo ដែលមិនមានសុខភាពល្អ
- ណែនាំឱ្យរៀបចំលំដាប់គោលដៅឡើងវិញ
- ស្នើឱ្យបិទគោលដៅដែលខូច
- ដកគោលដៅដែលលែងដំណើរការចេញដោយស្វ័យប្រវត្តិ បន្ទាប់ពីបរាជ័យ N ដង

### ឧទាហរណ៍បញ្ហារបស់ Combo

```
Combo "always-on" (យុទ្ធសាស្ត្រអាទិភាព)
├─ គោលដៅ 1: openai/gpt-5 (មានសុខភាពល្អ)
├─ គោលដៅ 2: anthropic/claude-opus-4-6 (⚠️ ម៉ូដែលត្រូវបានចាក់សោរហូតដល់ម៉ោង 14:00)
└─ គោលដៅ 3: kiro/claude-sonnet-4-5 (មានសុខភាពល្អ)

សកម្មភាពដែលបានណែនាំ៖ រៀបចំលំដាប់ឡើងវិញ — ផ្លាស់ទី kiro ឱ្យនៅលើ anthropic រហូតដល់ការចាក់សោផុតកំណត់
```

---

## កម្មវិធីត្រួតពិនិត្យកូតា

`observability.ts` បង្ហាញ **កម្មវិធីត្រួតពិនិត្យកូតាតាមសម័យនីមួយៗ** សម្រាប់អ្នកផ្តល់សេវាដែលផ្អែកលើការជាវ (Claude Code, Codex, GitHub Copilot)៖

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### អត្ថន័យនៃស្ថានភាព

| ស្ថានភាព    | ពេល                           | សកម្មភាព UI                                |
| ----------- | ----------------------------- | ------------------------------------------ |
| `starting`  | ការស្ទង់មតិដំបូងកំពុងដំណើរការ | សញ្ញាវិលកំពុងដំណើរការ                      |
| `idle`      | គ្មានសកម្មភាពថ្មីៗ            | លាក់ពីផ្ទាំងគ្រប់គ្រង                      |
| `healthy`   | កូតានៅសល់ > 50%               | ចំណុចពណ៌បៃតង                               |
| `warning`   | កូតានៅសល់ < 50%               | ការជូនដំណឹងពណ៌លឿង                          |
| `exhausted` | កូតា = 0%                     | ប្លុកពណ៌ក្រហម បញ្ជូនទៅអ្នកផ្តល់សេវាបន្ទាប់ |
| `error`     | ការស្ទង់មតិបានបរាជ័យ          | ចំណុចពណ៌ក្រហម ព្យាយាមម្ដងទៀតក្នុងពេលឆាប់ៗ  |

### API

> **មិនមាន REST endpoint ទេ។** ទិន្នន័យកម្មវិធីត្រួតពិនិត្យកូតាអាចរកបានតាមរយៈឧបករណ៍ MCP `observability_snapshot` ឬផ្ទាំងគ្រប់គ្រង។

---

## រូបថតសង្ខេបនៃការសង្កេតប្រព័ន្ធ

ឧបករណ៍ MCP `observability_snapshot` ត្រឡប់ **រូបថតសង្ខេបពេញលេញនៃប្រព័ន្ធ** សម្រាប់ភ្នាក់ងារ AI៖

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* សូមមើលខាងលើ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ភ្នាក់ងារប្រើព័ត៌មាននេះដើម្បីធ្វើ **ការសម្រេចចិត្តកំណត់ផ្លូវ** — ឧទាហរណ៍ "ប្រសិនបើសៀគ្វីរបស់ openai បើក សូមកំណត់ផ្លូវទៅ anthropic ជាមុនសិន"។

---

## ការត្រួតពិនិត្យស្ថានភាពថូខឹន

អ្នកផ្តល់សេវា OAuth (Claude Code, GitHub Copilot, Cursor) ត្រូវការ **ការធ្វើឱ្យថូខឹនស្រស់ឡើងវិញតាមកាលកំណត់**។ `src/lib/tokenHealthCheck.ts` ដំណើរការកម្មវិធីកំណត់ពេលនៅផ្ទៃខាងក្រោយ៖

- **វដ្តពិនិត្យ**៖ រៀងរាល់ 60 វិនាទី (វដ្តពិនិត្យក្នុង `TICK_MS = 60 * 1000` នៅ `src/lib/tokenHealthCheck.ts:30`)
- **ចន្លោះពេលត្រួតពិនិត្យស្ថានភាពសម្រាប់ការតភ្ជាប់នីមួយៗ**៖ លំនាំដើម 60 នាទី (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); អាចកំណត់រចនាសម្ព័ន្ធបានតាមរយៈមូលដ្ឋានទិន្នន័យការកំណត់
- **ការធ្វើឱ្យស្រស់ជាមុនពេលមាន 401**៖ គ្រប់គ្រងដោយ interceptor សម្រាប់ការតភ្ជាប់នីមួយៗ

### ស្ថានភាពថូខឹន

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### ការកំណត់រចនាសម្ព័ន្ធ

ការកំណត់រចនាសម្ព័ន្ធនៃការត្រួតពិនិត្យស្ថានភាពថូខឹនត្រូវបានគ្រប់គ្រងនៅខាងក្នុងដោយ `tokenHealthCheck.ts`។

### ស្ថានភាពថូខឹន

> **គ្មាន REST endpoint ទេ។** ទិន្នន័យស្ថានភាពថូខឹនអាចរកបានតាមរយៈផ្ទាំងគ្រប់គ្រង ឬឧបករណ៍ MCP `observability_snapshot`។

---

## ការជូនដំណឹង

### បណ្ដាញជូនដំណឹងដែលមានស្រាប់

OmniRoute គាំទ្រ **បណ្ដាញជូនដំណឹង 3**៖

| បណ្ដាញ             | ការរៀបចំ              | ករណីប្រើប្រាស់                        |
| ------------------ | --------------------- | ------------------------------------- |
| បដាផ្ទាំងគ្រប់គ្រង | បើកជានិច្ច            | ការជូនដំណឹងក្នុងកម្មវិធី              |
| Webhook            | កំណត់រចនាសម្ព័ន្ធ URL | Slack, Discord, PagerDuty             |
| កំណត់ហេតុ          | លំនាំដើម              | សម្រាប់ការប្រមូលផ្តុំកំណត់ហេតុខាងក្រៅ |

### ការកំណត់រចនាសម្ព័ន្ធ Webhook

> **ចំណាំ៖** ការកំណត់រចនាសម្ព័ន្ធការជូនដំណឹង Webhook ត្រូវបានគ្រប់គ្រងតាមរយៈទំព័រ Settings នៃផ្ទាំងគ្រប់គ្រង។ សូមមើល UI របស់ Settings សម្រាប់ URL របស់ webhook ការត្រងព្រឹត្តិការណ៍ និងការកែសម្រួល payload។

### ប្រភេទការជូនដំណឹង

| ការជូនដំណឹង                  | ពេលកើតឡើង                                     | កម្រិតធ្ងន់ធ្ងរលំនាំដើម |
| ---------------------------- | --------------------------------------------- | ----------------------- |
| `provider_circuit_open`      | សៀគ្វីបើក                                     | សំខាន់ខ្លាំង            |
| `provider_circuit_half_open` | សៀគ្វីកំពុងសាកល្បងការស្ដារឡើងវិញ              | ព័ត៌មាន                 |
| `quota_warning`              | កូតាឈានដល់ 80%+                               | ព្រមាន                  |
| `quota_exhausted`            | កូតាឈានដល់ 100%                               | សំខាន់ខ្លាំង            |
| `token_refresh_failed`       | ការធ្វើឱ្យស្រស់បរាជ័យជាប់ៗគ្នា 3+ ដង          | ព្រមាន                  |
| `token_expired`              | ថូខឹនហួសកាលបរិច្ឆេទផុតកំណត់                   | សំខាន់ខ្លាំង            |
| `combo_target_unhealthy`     | គោលដៅបន្សំស្ថិតក្នុងរយៈពេលផ្អាករយៈពេល 1 ម៉ោង+ | ព្រមាន                  |
| `db_integrity_warning`       | ការបំពាន FK > 0                               | ព្រមាន                  |
| `heap_pressure`              | ការប្រើប្រាស់ heap > 80% នៃកម្រិតកំណត់        | ព្រមាន                  |

---

## ម៉ែត្រវាស់ប្រសិទ្ធភាព

### ម៉ែត្រដែលត្រូវបានតាមដាន

| ម៉ែត្រ                  | ប្រភេទ       | ប្រភព                           |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | កម្មវិធីរាប់ | `services/usage.ts`             |
| `request_latency_ms`    | អ៊ីស្តូក្រាម | `services/usage.ts`             |
| `tokens_consumed`       | កម្មវិធីរាប់ | `services/usage.ts`             |
| `cost_usd`              | កម្មវិធីរាប់ | `services/usage.ts`             |
| `provider_errors`       | កម្មវិធីរាប់ | `services/errorClassifier.ts`   |
| `circuit_state_changes` | កម្មវិធីរាប់ | `services/resilience.ts`        |
| `cache_hits`            | កម្មវិធីរាប់ | `services/signatureCache.ts`    |
| `compression_savings`   | អ៊ីស្តូក្រាម | `services/compression/stats.ts` |
| `quota_used`            | រង្វាស់      | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | រង្វាស់      | `observability.ts`              |

### ភាគរយទីនៃភាពយឺតយ៉ាវ (p50/p95/p99)

> **មិនមានចំណុចចុង REST ទេ។** ទិន្នន័យភាគរយទីនៃភាពយឺតយ៉ាវមាននៅតាមរយៈទំព័រផ្ទាំងគ្រប់គ្រង `/dashboard/health`។ ការនាំចេញ Prometheus/OpenTelemetry ត្រូវបានគ្រោងសម្រាប់ v3.9។

### ការនាំចេញ Prometheus / OpenTelemetry (ដំណាក់កាលទី 2)

បានគ្រោងសម្រាប់ v3.9៖ ការនាំចេញផ្ទាល់ទៅកាន់ Prometheus, OpenTelemetry, Datadog។

សម្រាប់ពេលនេះ ប្រមូលទិន្នន័យពី `/api/monitoring/health` ដោយប្រើប្រព័ន្ធត្រួតពិនិត្យដែលផ្អែកលើ HTTP ណាមួយ (Prometheus blackbox exporter, Datadog HTTP check ជាដើម)។

---

## រូបមន្តការជូនដំណឹង

### Slack

> **ចំណាំ៖** ការជូនដំណឹងតាម Webhook ត្រូវបានកំណត់រចនាសម្ព័ន្ធតាមរយៈទំព័រ Settings នៃផ្ទាំងគ្រប់គ្រង — មិនមានអថេរបរិស្ថានសម្រាប់ webhook ដាច់ដោយឡែកទេ (`grep -rn` ផ្តល់លទ្ធផលសូន្យ)។ សូមមើល UI របស់ Settings សម្រាប់ URL របស់ webhook ការច្រោះព្រឹត្តិការណ៍ និងការកែតម្រូវ payload។

### Discord

> ការជូនដំណឹងតាម Webhook ប្រើលំហូរ Settings UI ដូចគ្នានឹង Slack។ Discord ទទួលយកទម្រង់ JSON payload ដូចគ្នា។

### PagerDuty

> ការជូនដំណឹងតាម Webhook ប្រើលំហូរ Settings UI ដូចគ្នា។ routing keys របស់ PagerDuty Events API v2 ត្រូវបានកំណត់រចនាសម្ព័ន្ធនៅក្នុង Settings UI។

### Webhook ផ្ទាល់ខ្លួន (JSON)

> ចំណុចចុង HTTP ណាមួយដែលទទួលយក POST ជាមួយ body ជា JSON នឹងអាចដំណើរការបាន។ កំណត់រចនាសម្ព័ន្ធ URL នៅក្នុង Settings UI។

---

## ការកំណត់រចនាសម្ព័ន្ធផ្ទាំងគ្រប់គ្រង

### កែតម្រូវផ្ទាំងគ្រប់គ្រងសុខភាព

បង្កើត `~/.omniroute/dashboard.json`៖

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ខ្ទាស់អ្នកផ្តល់សេវាទៅខាងលើ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ការដោះស្រាយបញ្ហា

### "អ្នកផ្តល់សេវាបង្ហាញថាមានសុខភាពល្អ ប៉ុន្តែសំណើបរាជ័យ"

1. ពិនិត្យមើល **បញ្ហារបស់ autopilot** — ប្រហែលជាម៉ូដែលមួយត្រូវបានចាក់សោមិនឱ្យប្រើ
2. មើល **កំហុសថ្មីៗ** សម្រាប់ថ្នាក់កំហុសជាក់លាក់
3. សាកល្បង **ការធ្វើតេស្តការតភ្ជាប់** នៅក្នុងកាតរបស់អ្នកផ្តល់សេវា
4. ពិនិត្យថាតើអ្នកផ្តល់សេវាត្រូវបាន **កំណត់កម្រិតអត្រានៅប្រភពខាងលើ** ដែរឬទេ (មិនអាចមើលឃើញពីមូលដ្ឋានទេ)

### "កូតាបង្ហាញថាមានសុខភាពល្អ ប៉ុន្តែខ្ញុំឃើញ 429s"

- 429 មានន័យថា អ្នកផ្តល់សេវាបង្ហាញថាអ្នកបានប្រើកូតារបស់អ្នកអស់ហើយ
- ការតាមដានកូតារបស់ OmniRoute អាច **ហួសសម័យ** — ទិន្នន័យពិតរបស់អ្នកផ្តល់សេវាស្ថិតនៅប្រភពខាងលើ
- ទិន្នន័យកូតាត្រូវបានធ្វើឱ្យស្រស់ដោយស្វ័យប្រវត្តិតាមរយៈកម្មវិធីត្រួតពិនិត្យកូតាខាងក្នុង

### "Combo កំពុងបរាជ័យ ប៉ុន្តែគោលដៅទាំងអស់មើលទៅមានសុខភាពល្អ"

- ពិនិត្យផ្ទាំងគ្រប់គ្រង **សុខភាពរបស់ combo** សម្រាប់បញ្ហាលំដាប់គោលដៅ
- មើល **ព្រឹត្តិការណ៍ fallback** — ប្រហែលជា combo ប្រើជម្រើសទាំងអស់អស់លឿនពេក
- ផ្ទៀងផ្ទាត់ថា **យុទ្ធសាស្ត្រ** ត្រូវគ្នានឹងករណីប្រើប្រាស់របស់អ្នក (អាទិភាព ទល់នឹង round-robin ទល់នឹង ស្វ័យប្រវត្តិ)

### "ការត្រួតពិនិត្យសុខភាពមូលដ្ឋានទិន្នន័យកំពុងបរាជ័យ"

- ដំណើរការ `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- ប្រសិនបើ "ok" — ជាការប្រកាសអាសន្នខុស ការត្រួតពិនិត្យសុខភាពកំពុងតឹងរ៉ឹងពេក
- ប្រសិនបើជាអ្វីផ្សេង — **បញ្ឈប់ OmniRoute** ហើយអនុវត្តតាម [មគ្គុទ្ទេសក៍សង្គ្រោះពីគ្រោះមហន្តរាយ](./DATABASE_GUIDE.md#disaster-recovery)

### "សម្ពាធ heap របស់អង្គចងចាំស្ថិតក្នុងកម្រិតធ្ងន់ធ្ងរ"

```bash
# ពិនិត្យ heap បច្ចុប្បន្ន
node -e "console.log(process.memoryUsage())"

# កេះ GC ដោយដៃ (ប្រសិនបើ --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# កាត់បន្ថយសំណើព្រមគ្នា (កំណត់តាមរយៈទំព័រ Settings នៃផ្ទាំងគ្រប់គ្រង មិនមែនអថេរបរិស្ថានទេ)
# មិនមានអថេរបរិស្ថាន `MAX_CONCURRENT_REQUESTS` ទេ — កំណត់វានៅក្នុង Settings → Concurrency។
```

---

## សូមមើលផងដែរ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ការតាមដានការប្រើប្រាស់ និងថ្លៃចំណាយ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — គ្រោងការណ៍ DB + ស្ថានភាពដំណើរការ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ស្ថានភាពដំណើរការរបស់ proxy (cache ដាច់ដោយឡែក)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ស្ថាបត្យកម្មប្រព័ន្ធ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ព័ត៌មានលម្អិតអំពី circuit breaker
- ប្រភព៖ `src/lib/monitoring/` (4 ឯកសារ, 2121 បន្ទាត់កូដ)
