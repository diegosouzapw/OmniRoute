# Monitoring & Observability Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute တွင် အသင့်ပါ ကျန်းမာရေး စောင့်ကြည့်ခြင်း၊ provider autopilot၊ quota ခြေရာခံခြင်းနှင့် observability hooks များ ပါဝင်သည်။ ဤလမ်းညွှန်တွင် dashboard၊ သတိပေးချက်များနှင့် ပြဿနာဖြေရှင်းခြင်းတို့ကို ဖော်ပြထားသည်။

**အရင်းအမြစ်များ:**

- `src/lib/monitoring/observability.ts` — observability snapshot
- `src/lib/monitoring/comboHealthAutopilot.ts` — combo health autopilot
- `src/lib/monitoring/providerHealthAutopilot.ts` — provider autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — provider ကျန်းမာရေး matrix
- `src/lib/localHealthCheck.ts` — local health check
- `src/lib/tokenHealthCheck.ts` — token refresh ကျန်းမာရေး
- `src/lib/proxyHealth.ts` — proxy ကျန်းမာရေး cache (PROXY_GUIDE.md တွင် ဖော်ပြထားသည်)

---

## ခြုံငုံသုံးသပ်ချက်

OmniRoute တွင် **စောင့်ကြည့်ရေး အလွှာ 3 ခု** ရှိသည်-

```
┌──────────────────────────────────────────────────────────────┐
│  အလွှာ 1: စနစ်ကျန်းမာရေး (server အဆင့်)                        │
│  ├─ localHealthCheck.ts — DB၊ ports၊ native deps              │
│  ├─ db/healthCheck.ts — integrity၊ FK၊ ဆက်စပ်မှုမရှိသော artifacts │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  အလွှာ 2: Provider ကျန်းမာရေး (provider တစ်ခုချင်းစီ၏ ခံနိုင်ရည်) │
│  ├─ providerHealthAutopilot.ts — circuit breaker၊ cooldowns   │
│  ├─ providerHealthMatrix.ts — provider/model အလိုက် ကျန်းမာရေးရမှတ်များ │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  အလွှာ 3: တိုက်ရိုက် Observability (runtime snapshots)         │
│  ├─ observability.ts — circuit breakers၊ sessions၊ quota      │
│  ├─ tokenHealthCheck.ts — OAuth token refresh ကျန်းမာရေး      │
│  └─ MCP tools: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboard စာမျက်နှာများ

### `/dashboard/health` (စနစ်ကျန်းမာရေး)

ထိပ်တန်းအဆင့် ကျန်းမာရေး dashboard တွင် အောက်ပါတို့ကို ပြသသည်-

| ကဏ္ဍ                     | ပြသသည့်အရာများ                                                             |
| ------------------------ | -------------------------------------------------------------------------- |
| **Server အခြေအနေ**       | အလုပ်လုပ်နေသည့်ကြာချိန်၊ version၊ port၊ လက်ရှိချိတ်ဆက်မှုများ              |
| **Database**             | ချိတ်ဆက်မှု၊ integrity၊ WAL အရွယ်အစား၊ မကြာသေးမီ migrations                |
| **Provider အကျဉ်းချုပ်** | အသုံးပြုနေသည့်အရေအတွက်၊ ကျန်းမာသည့်အရေအတွက်၊ ဖွင့်ထားသည့် breaker အရေအတွက် |
| **Quota monitors**       | အသုံးပြုနေသည့် sessions၊ သတိပေးနေမှု၊ ကုန်ဆုံးသွားမှု                      |
| **မကြာသေးမီ အမှားများ**  | stack traces များနှင့်အတူ နောက်ဆုံးအမှား 10 ခု                             |
| **Resource အသုံးပြုမှု** | Memory၊ CPU၊ heap ဖိအားညွှန်ပြချက်                                         |

### `/dashboard/providers` (Provider ကျန်းမာရေး)

Provider တစ်ခုချင်းစီအလိုက် dashboard-

| ကော်လံ          | ဖော်ပြချက်                                                        |
| --------------- | ----------------------------------------------------------------- |
| Provider        | Provider ID + ပြသမည့်အမည်                                         |
| ကျန်းမာရေး      | အစိမ်း/အဝါ/အနီ အခြေအနေ                                            |
| Circuit         | ဖွင့်/ပိတ်/တစ်ဝက်ဖွင့် အခြေအနေ                                    |
| ချိတ်ဆက်မှုများ | ချိတ်ဆက်မှုအရေအတွက်၊ နောက်ဆုံး refresh                            |
| Models          | ရရှိနိုင်သည့် models၊ model တစ်ခုချင်းစီ၏ ကျန်းမာရေး              |
| ကုန်ကျစရိတ်     | ယနေ့ကုန်ကျစရိတ်၊ 7 ရက်စာ trend                                    |
| အမှားများ       | နောက်ဆုံး 24h အတွင်း အမှားအရေအတွက်၊ အများဆုံးဖြစ်သည့် error class |

Provider တစ်ခုကို နှိပ်၍ အောက်ပါတို့ကို ကြည့်ရှုနိုင်သည်-

- ကြာချိန်အသေးစိတ်ခွဲခြမ်းချက်နှင့်အတူ မကြာသေးမီ requests များ
- ချိတ်ဆက်မှုတစ်ခုချင်းစီ၏ ကျန်းမာရေးရမှတ်များ
- Model တစ်ခုချင်းစီ၏ lockouts
- Autopilot အကြံပြုချက်များ

### `/dashboard/quota` (Quota ခြေရာခံခြင်း)

API key တစ်ခုချင်းစီအတွက်-

- လက်ရှိအသုံးပြုမှုနှင့် ကန့်သတ်ချက် နှိုင်းယှဉ်မှု (progress bar)
- Quota လမ်းကြောင်း (30 ရက်စာ chart)
- နောက်တစ်ကြိမ် reset လုပ်မည့်အချိန်
- သတိပေးချက် မှတ်တမ်း

### `/dashboard/combos` (Combo ကျန်းမာရေး)

Combo တစ်ခုချင်းစီအတွက်-

- Strategy + targets
- Target တစ်ခုချင်းစီ၏ ကျန်းမာရေး
- မကြာသေးမီ fallback ဖြစ်ရပ်များ
- အောင်မြင်မှုနှုန်း (24h၊ 7d၊ 30d)

---

## ကျန်းမာရေး စစ်ဆေးမှု API

OmniRoute သည် HTTP ကျန်းမာရေး အခြေအနေပြ မျက်နှာပြင် **နှစ်ခု** ကို ဖော်ထုတ်ပေးထားသည်။ Orchestrator များအတွက် ၎င်းတို့ကို အပြန်အလှန် အစားထိုးအသုံးပြု၍ မရပါ။

| Path                         | ရည်ရွယ်ချက်                                                                    | ဝန်အား                                       | အသုံးပြုရန်                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------- |
| `GET /healthz`               | Lifecycle liveness/readiness (`ok` / `starting` / `stopping`)                  | အလွန်ပေါ့ပါးသည် (phase flag သာ)              | Kubernetes **readiness**; HTTP ကို မဖြစ်မနေသုံးရပါက ပျော့ပျောင်းသော **liveness** |
| `GET /api/monitoring/health` | နက်ရှိုင်းသော system + provider အနှစ်ချုပ် (DB၊ heap၊ catalog အရေအတွက်များ၊ …) | လေးလံသည် (sync DB / monitoring လုပ်ငန်းများ) | Dashboard များ၊ blackbox နက်ရှိုင်းစစ်ဆေးမှုများ၊ Docker ၏ built-in healthcheck  |

> **မှတ်ချက်:** Provider health matrix များ၊ autopilot ပြဿနာများ၊ quota monitor များ၊ token health နှင့် `/api/monitoring/health` ထက် ကျော်လွန်သော latency အသေးစိတ်များကို **MCP tool** `observability_snapshot` သို့မဟုတ် **dashboard** စာမျက်နှာများမှ ရရှိနိုင်သည် — ၎င်းတို့အတွက် သီးခြား REST route များ မရှိပါ။

Route နှစ်ခုစလုံးသည် request များကို ကိုင်တွယ်သည့် **တူညီသော Node event loop** ပေါ်တွင် အလုပ်လုပ်သည်။ CPU-bound path တစ်ခု (ကြီးမားသော `GET /v1/models` catalog လုပ်ဆောင်မှု၊ long-context compression / token counting) သည် `/healthz` အပါအဝင် HTTP handler **အားလုံး** ကို နှောင့်နှေးစေနိုင်သည်။ Event-loop အလုပ်များနေခြင်း ≠ process သေဆုံးနေခြင်း ဖြစ်သည်။ ဝန်ပိစေသည့် အကြောင်းရင်းကို ဦးစားပေးပြင်ဆင်ပါ။ Probe tuning သည် မှားယွင်းစွာ ရပ်တန့်သတ်ဖြတ်မှုများကိုသာ လျှော့ချပေးသည်။

### ပေါ့ပါးသော orchestrator probe

```bash
GET /healthz
# သို့မဟုတ် HEAD /healthz
```

- Server lifecycle phase သည် ready ဖြစ်နေချိန်တွင် **200** + body `ok`
- Boot သို့မဟုတ် shutdown လုပ်နေစဉ် **503** + `starting` / `stopping`
- အကောင်အထည်ဖော်ထားသည့်နေရာ: `src/app/healthz/route.ts` (DB ping မရှိ)

### System Health (နက်ရှိုင်းစစ်ဆေးမှု)

```bash
GET /api/monitoring/health
```

တုံ့ပြန်ချက်:

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

#### `credentialHealth`: probe-cache နှင့် SQLite `test_status` နှိုင်းယှဉ်ချက်

`GET /api/monitoring/health` → `credentialHealth` သည် `provider_connections.test_status` ၏ live dump မဟုတ်ဘဲ **in-memory probe-cache
gauge** ဖြစ်သည်။ #12532 နောက်ပိုင်းတွင် request path သည်
`getCachedCredentialHealthSummary()` ကိုသာ ဖတ်ရှုသည်။ နောက်ခံ probe များက event loop ပြင်ပတွင်
cache ကို refresh လုပ်သည်။

| Layer                             | တည်နေရာ                                                               | အဓိပ္ပာယ်                                                                                                                                                                                                                                                                |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Probe-cache gauge                 | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Process memory အတွင်း ဆက်လက်သိမ်းထားသော နောက်ဆုံး credential-health probe ရလဒ်များ။ `source` သည် အမြဲတမ်း `probe-cache` ဖြစ်သည်။                                                                                                                                         |
| မအောင်မြင်သော connection အသေးစိတ် | `credentialHealth.failedConnections`                                  | **`failed > 0` ဖြစ်သည့်အခါမှသာ** ပါဝင်သည်။ `status=error` ဖြစ်သော cache row များ၏ အရေအတွက်ကန့်သတ်ထားသည့် စာရင်း (`connectionId`, `status`, သန့်စင်ထားသော `lastError` / `lastErrorType`)။ စာရင်းကို အရေအတွက်ကန့်သတ်ဖြတ်တောက်ထားသည့်အခါ `failedOmitted` ကို သတ်မှတ်ထားသည်။ |
| SQLite sticky status              | `credentialHealth.staleDbNonOkCount`                                  | သိရှိထားသော non-ok `test_status` (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) ရှိသည့် **active** (`is_active=1`) connection row များ၏ အရေအတွက်။                                                                                     |

Layer နှစ်ခုသည် ရည်ရွယ်ချက်ရှိရှိ ကွဲလွဲနိုင်သည်-

- Gauge တွင် `failed=0` ဖြစ်ပြီး `staleDbNonOkCount>0` ဖြစ်ခြင်း — SQLite တွင် နောက်ဆုံး
  probe-cache snapshot က `status=error` အဖြစ် မရေတွက်သော sticky
  `test_status` (ဥပမာ `expired` သို့မဟုတ် `credits_exhausted`) ရှိနေဆဲဖြစ်သည်။
- Gauge တွင် `failed>0` ဖြစ်ပြီး SQLite က ကျန်းမာနေပုံရခြင်း — မကြာသေးမီ probe တစ်ခု မအောင်မြင်ဘဲ
  cache ထဲတွင် သိမ်းထားသည်။ DB row ကို update မလုပ်ရသေးခြင်း သို့မဟုတ် နောက်ပိုင်းတွင် ရှင်းလင်းထားခြင်း ဖြစ်နိုင်သည်။

ဤ endpoint ကို scrape လုပ်သည့်အခါ `provider_connections.test_status` တစ်ခုတည်းအပေါ် မူတည်၍
alert မလုပ်ပါနှင့်။ Live probe failure များအတွက် `failed` + `failedConnections` ကို အသုံးပြုပြီး
persist လုပ်ထားသော sticky-status အရေအတွက် လိုအပ်သည့်အခါ `staleDbNonOkCount` ကို အသုံးပြုပါ။

### Kubernetes probe အကြံပြုချက်များ

OmniRoute သည် **Node process တစ်ခုတည်း** (event loop တစ်ခု) ဖြစ်သည်။ ပုံမှန် Docker `HEALTHCHECK` သည် ပေါ့ပါးသော `/healthz` ကို ပစ်မှတ်ထားသည်။ `/api/monitoring/health` သည် kubelet liveness interval များအတွက် **အလွန်လေးလံသည်**။

| စမ်းသပ်ချက်                           | အကြံပြုထားသော ပစ်မှတ်                                                                                      | မှတ်ချက်များ                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **စတင်ခြင်း**                         | ရှည်လျားသော `failureThreshold` (သို့မဟုတ် ကြီးမားသော `startPeriod`) ပါသည့် HTTP `GET /healthz`             | Cold start + SQLite migration သည် စက္ကန့်အနည်းငယ်ထက် ပိုကြာနိုင်သည်                                                                                                                                                                                                                                                                                                                                                                                            |
| **အဆင်သင့်ဖြစ်မှု**                   | HTTP `GET /healthz`                                                                                        | Lifecycle `ok` / `starting` / `stopping` (200 နှင့် 503)။ loop ကို CPU က ပိတ်ဆို့ထားပါက မတည်ငြိမ်မှုများ ရှိနေဆဲဖြစ်သည်။ **စက္ကန့်များစွာကြာပြီးမှ ရရှိသော 200 သည် healthy မဟုတ်ပါ** (#10303) — ၎င်းသည် 3-byte handler မလည်ပတ်မီ event loop တွင် လုပ်ဆောင်ခွင့် မရခဲ့ကြောင်း ဆိုလိုသည်                                                                                                                                                                         |
| **အသက်ရှင်မှု**                       | HTTP `GET /livez`၊ **သို့မဟုတ် TCP** ကို ပင်မ service port (`PORT`၊ မူလတန်ဖိုး `20128`) တွင် အသုံးပြုခြင်း | `/livez` သည် process အသက်ရှင်နေခြင်းကိုသာ စစ်ဆေးသည် (handler လည်ပတ်ပါက အမြဲတမ်း 200)။ ၎င်းသည် event loop ကို မျှဝေအသုံးပြုနေဆဲဖြစ်သည် — အလုပ်များနေခြင်း ≠ သေဆုံးနေခြင်း၊ ထို့ပြင် event-loop လုပ်ဆောင်ခွင့်မရခြင်း (#10303) ကို TCP ထက် ပိုမိုကောင်းမွန်စွာ မစစ်ဆေးနိုင်ပါ။ catalog/compression load အောက်တွင် HTTP probes များ timeout ဖြစ်ပါက **TCP** ကို ဦးစားပေးပါ။ မည်သည့်နည်းလမ်းတွင်မဆို event-loop ခဏတာ ရပ်တန့်မှုများကြောင့် pod ကို **မသတ်ပါနှင့်** |
| **နက်ရှိုင်းသော ကျန်းမာရေးစစ်ဆေးမှု** | ပြင်ပ checker တစ်ခုမှ `GET /api/monitoring/health`                                                         | kubelet `livenessProbe` / ကြားကာလတိုသော `readinessProbe` အတွက် မဟုတ်ပါ                                                                                                                                                                                                                                                                                                                                                                                         |

နမူနာပုံစံ (သင့် cold-start နှင့် compression load တို့နှင့် ကိုက်ညီအောင် threshold များကို ချိန်ညှိပါ):

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
  # event-loop ရပ်တန့်မှုအောက်တွင် HTTP /livez သည် timeout ဖြစ်နိုင်သေးသည်။ TCP သည်
  # ပိုမိုသတိထားသော အစားထိုးနည်းလမ်းဖြစ်သည်:
  # tcpSocket:
  #   port: http
```

kubelet **liveness** ကို `/api/monitoring/health` သို့ **မညွှန်ပါနှင့်**။ ထို path သည် အမှန်တကယ် DB/monitoring အလုပ်များကို လုပ်ဆောင်သောကြောင့် load အောက်တွင် မှားယွင်းသော positive ရလဒ်များ ဖြစ်ပေါ်စေမည်။

ဆက်စပ်အကြောင်းအရာများ: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (event loop အလုပ်များနေစဉ် probes များ)၊ [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (catalog pricing က အရင်းအမြစ်များစွာ အသုံးပြုခြင်း)၊ [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (compression token-count က အရင်းအမြစ်များစွာ အသုံးပြုခြင်း)။

### ရွေးချယ်နိုင်သော request-path လုပ်ငန်းများ (memory၊ skills၊ token refresh)

Memory extraction၊ skills injection နှင့် OAuth token refresh တို့သည် `/healthz` နှင့်အတူ **ပင်မ Node event loop** ကို မျှဝေအသုံးပြုသည်။ ၎င်းတို့သည် dashboard-toggle လုပ်ဆောင်ချက်များ (`memoryEnabled`, `skillsEnabled`) ဖြစ်ပြီး worker pool မဟုတ်ပါ။ [Environment — event-loop ကုန်ကျစရိတ်](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ကို ကြည့်ပါ။

### Provider ၏ ကျန်းမာရေးအခြေအနေ

> **REST endpoint မရှိပါ။** Provider health data ကို MCP tool `observability_snapshot` သို့မဟုတ် dashboard `/dashboard/providers` စာမျက်နှာမှ ရရှိနိုင်သည်။

### Provider အသေးစိတ်

> **REST endpoint မရှိပါ။** Provider တစ်ခုချင်းစီ၏ အသေးစိတ်အချက်အလက်များကို dashboard `/dashboard/providers` စာမျက်နှာမှ ရရှိနိုင်သည်။

---

## ပံ့ပိုးသူ ကျန်းမာရေး အလိုအလျောက်စီမံစနစ်

`providerHealthAutopilot.ts` မော်ဂျူးသည် အောက်ပါတို့ကို လုပ်ဆောင်သည့် **မိမိကိုယ်ကို ပြန်လည်ပြုပြင်နိုင်သော စနစ်** ဖြစ်သည်-

1. ပံ့ပိုးသူဆိုင်ရာ ပြဿနာများကို ရှာဖွေသတ်မှတ်သည် (ဆားကစ်ဖွင့်နေခြင်း၊ cooldown များ၊ lockout များ၊ quota သတိပေးချက်များ)
2. ၎င်းတို့ကို ဖြေရှင်းရန် **အကြံပြုလုပ်ဆောင်ချက်များ** ကို ထုတ်ပေးသည်
3. အန္တရာယ်နည်းသော လုပ်ဆောင်ချက်များကို လိုအပ်ပါက **အလိုအလျောက် လုပ်ဆောင်သည်**

### ရှာဖွေတွေ့ရှိသည့် ပြဿနာအမျိုးအစားများ

| ပြဿနာအမျိုးအစား              | ပြင်းထန်မှု | နမူနာအခြေအနေ                                                              |
| ---------------------------- | ----------- | ------------------------------------------------------------------------- |
| `provider_circuit_open`      | အရေးကြီး    | ၅ ကြိမ် ကျရှုံးပြီးနောက် ဆားကစ်ဖြတ်တောက်ကိရိယာ ဖွင့်နေခြင်း               |
| `provider_circuit_half_open` | သတိပေးချက်  | ဆားကစ်၏ ပြန်လည်ကောင်းမွန်မှုကို စမ်းသပ်နေခြင်း                            |
| `connection_cooldown`        | သတိပေးချက်  | 429 ဖြစ်ပြီးနောက် ချိတ်ဆက်မှုသည် cooldown အခြေအနေတွင် ရှိနေခြင်း          |
| `stale_connection_error`     | သတိပေးချက်  | နောက်ဆုံး refresh လုပ်ခြင်းသည် လွန်ခဲ့သော မိနစ် ၃၀ ကျော်က ကျရှုံးခဲ့ခြင်း |
| `terminal_connection_error`  | အရေးကြီး    | OAuth ကို ရုပ်သိမ်းထားခြင်း၊ key မမှန်ကန်ခြင်း                            |
| `inactive_connection`        | အချက်အလက်   | ဆက်တင်များတွင် ချိတ်ဆက်မှုကို ပိတ်ထားခြင်း                                |
| `model_lockout`              | သတိပေးချက်  | သတ်မှတ်ထားသော မော်ဒယ်ကို သီးခြားခွဲထားခြင်း                               |
| `quota_monitor_warning`      | သတိပေးချက်  | Quota အသုံးပြုမှု ၈၀% နှင့်အထက် ရောက်ရှိနေခြင်း                           |

### ထုတ်ပေးသည့် လုပ်ဆောင်ချက်အမျိုးအစားများ

| လုပ်ဆောင်ချက်                  | အန္တရာယ် | ဖော်ပြချက်                                                        |
| ------------------------------ | -------- | ----------------------------------------------------------------- |
| `clear_provider_breaker`       | အလယ်အလတ် | ဆားကစ်ဖြတ်တောက်ကိရိယာကို ပိတ်ထားသည့် အခြေအနေသို့ ပြန်သတ်မှတ်ခြင်း |
| `clear_connection_cooldown`    | နည်း     | ချိတ်ဆက်မှုတစ်ခုမှ cooldown ကို ဖယ်ရှားခြင်း                      |
| `clear_stale_connection_error` | နည်း     | သက်တမ်းလွန် error အမှတ်အသားကို ရှင်းလင်းခြင်း                     |
| `clear_model_lockout`          | နည်း     | သီးခြားခွဲထားသော မော်ဒယ်ကို ပြန်လည်ဖွင့်ပေးခြင်း                  |
| `reactivate_connection`        | အလယ်အလတ် | ပိတ်ထားသော ချိတ်ဆက်မှုကို ပြန်လည်ဖွင့်ပေးခြင်း                    |
| `deactivate_connection`        | မြင့်    | ပြဿနာရှိသော ချိတ်ဆက်မှုကို ပိတ်ခြင်း                              |

### API

> **REST endpoint မရှိပါ။** အလိုအလျောက်စီမံစနစ်၏ ပြဿနာများကို MCP tool `observability_snapshot` သို့မဟုတ် dashboard မှတစ်ဆင့် ရယူနိုင်သည်။ အလိုအလျောက်စီမံစနစ်သည် စနစ်အတွင်းပိုင်း၌ အလုပ်လုပ်ပြီး ၎င်း၏ အပြုအမူကို environment variable များဖြင့်မဟုတ်ဘဲ settings DB (ချိတ်ဆက်မှုတစ်ခုချင်းစီ၏ `autopilotMode` field) မှတစ်ဆင့် စီစဉ်သတ်မှတ်သည် — အလိုအလျောက်စီမံမုဒ် env var တစ်ခုကို `grep -rn` ဖြင့် ရှာဖွေပါက ရလဒ်တစ်ခုမျှ မတွေ့ပါ။

### အလိုအလျောက်စီမံမုဒ်

အလိုအလျောက်စီမံစနစ်သည် ပုံမှန်အားဖြင့် **ကိုယ်တိုင်လုပ်ဆောင်ရသော မုဒ်** တွင် အလုပ်လုပ်သည် — ၎င်းသည် ပြဿနာများကို ရှာဖွေသတ်မှတ်ပြီး အကြံပြုလုပ်ဆောင်ချက်များကို ထုတ်ပေးသော်လည်း ၎င်းတို့ကို အလိုအလျောက် အသုံးမပြုပါ။ လုပ်ဆောင်ချက်များကို dashboard မှတစ်ဆင့် အသုံးပြုနိုင်သည်။

---

## Combo ကျန်းမာရေး အလိုအလျောက်စီမံစနစ်

`comboHealthAutopilot.ts` သည် ပံ့ပိုးသူ အလိုအလျောက်စီမံစနစ်၏ **combo သီးသန့်** အမျိုးအစားဖြစ်သည်။ ၎င်းသည်-

- ကျန်းမာမှုမရှိသော combo များကို ရှာဖွေသတ်မှတ်သည်
- ပစ်မှတ်များ၏ အစီအစဉ်ကို ပြန်စီရန် အကြံပြုသည်
- ပျက်နေသော ပစ်မှတ်များကို ပိတ်ရန် အကြံပြုသည်
- N ကြိမ် ကျရှုံးပြီးနောက် အသုံးမဝင်တော့သော ပစ်မှတ်များကို အလိုအလျောက် ဖယ်ရှားသည်

### Combo ပြဿနာ နမူနာများ

```
Combo "always-on" (ဦးစားပေး မဟာဗျူဟာ)
├─ ပစ်မှတ် 1: openai/gpt-5 (ကျန်းမာ)
├─ ပစ်မှတ် 2: anthropic/claude-opus-4-6 (⚠️ 14:00 အထိ မော်ဒယ် lockout ဖြစ်နေသည်)
└─ ပစ်မှတ် 3: kiro/claude-sonnet-4-5 (ကျန်းမာ)

အကြံပြုလုပ်ဆောင်ချက်: အစီအစဉ်ပြန်စီရန် — lockout မကုန်ဆုံးမချင်း kiro ကို anthropic ၏ အပေါ်သို့ ရွှေ့ပါ
```

---

## Quota စောင့်ကြည့်စနစ်များ

`observability.ts` သည် subscription ပံ့ပိုးသူများ (Claude Code၊ Codex၊ GitHub Copilot) အတွက် **session တစ်ခုချင်းစီအလိုက် quota စောင့်ကြည့်စနစ်များ** ကို ဖော်ထုတ်ပေးသည်-

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

### အခြေအနေများ၏ အဓိပ္ပာယ်များ

| အခြေအနေ     | ဖြစ်ပေါ်သည့်အချိန်            | UI လုပ်ဆောင်ချက်                                               |
| ----------- | ----------------------------- | -------------------------------------------------------------- |
| `starting`  | ကနဦး poll လုပ်ဆောင်နေသည်      | လည်ပတ်ပြသည့် အမှတ်အသား                                         |
| `idle`      | မကြာသေးမီက လှုပ်ရှားမှုမရှိပါ | Dashboard မှ ဖျောက်ထားသည်                                      |
| `healthy`   | ကျန်ရှိသော quota > 50%        | အစိမ်းရောင် အစက်                                               |
| `warning`   | ကျန်ရှိသော quota < 50%        | အဝါရောင် သတိပေးချက်                                            |
| `exhausted` | Quota = 0%                    | အနီရောင် ပိတ်ဆို့မှု၊ နောက်ပံ့ပိုးသူထံ လမ်းကြောင်းပြောင်းခြင်း |
| `error`     | Polling ကျရှုံးခဲ့သည်         | အနီရောင် အစက်၊ မကြာမီ ပြန်လည်ကြိုးစားခြင်း                     |

### API

> **REST endpoint မရှိပါ။** Quota စောင့်ကြည့်စနစ်၏ ဒေတာကို MCP tool `observability_snapshot` သို့မဟုတ် dashboard မှတစ်ဆင့် ရယူနိုင်သည်။

---

## စောင့်ကြည့်နိုင်မှု လျှပ်တစ်ပြက်မှတ်တမ်း

MCP tool `observability_snapshot` သည် AI agent များအတွက် **စနစ်တစ်ခုလုံး၏ လျှပ်တစ်ပြက်မှတ်တမ်း** ကို ပြန်ပေးသည်-

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
  "quotaMonitors": {/* အထက်တွင် ကြည့်ပါ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agent များသည် ၎င်းကို **လမ်းကြောင်းရွေးချယ်မှု ဆုံးဖြတ်ချက်များ** ချမှတ်ရန် အသုံးပြုကြသည် — ဥပမာ၊ "openai ၏ circuit ပွင့်နေပါက anthropic သို့ ဦးစွာ လမ်းကြောင်းပေးပါ"။

---

## Token အခြေအနေ စစ်ဆေးခြင်း

OAuth provider များ (Claude Code, GitHub Copilot, Cursor) သည် **token ကို အခါအားလျော်စွာ အသစ်ပြန်လည်ရယူရန်** လိုအပ်သည်။ `src/lib/tokenHealthCheck.ts` သည် နောက်ခံ scheduler တစ်ခုကို လုပ်ဆောင်သည်-

- **Sweep tick**: 60 စက္ကန့်တိုင်း (`src/lib/tokenHealthCheck.ts:30` ရှိ `TICK_MS = 60 * 1000` ဖြင့် sweep လုပ်သည်)
- **Connection တစ်ခုချင်းစီ၏ အခြေအနေစစ်ဆေးမှု ကြားကာလ**: မူလသတ်မှတ်ချက် 60 မိနစ် (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); settings DB မှတစ်ဆင့် ပြင်ဆင်သတ်မှတ်နိုင်သည်
- **401 ဖြစ်သည့်အခါ ကြိုတင် refresh လုပ်ခြင်း**: connection တစ်ခုချင်းစီ၏ interceptor က ကိုင်တွယ်သည်

### Token အခြေအနေ

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

### ပြင်ဆင်သတ်မှတ်မှု

Token အခြေအနေစစ်ဆေးမှု ပြင်ဆင်သတ်မှတ်ချက်ကို `tokenHealthCheck.ts` က အတွင်းပိုင်းတွင် ကိုင်တွယ်သည်။

### Token အခြေအနေ

> **REST endpoint မရှိပါ။** Token အခြေအနေဒေတာကို dashboard သို့မဟုတ် MCP tool `observability_snapshot` မှတစ်ဆင့် ရယူနိုင်သည်။

---

## သတိပေးချက်များ

### မူလပါဝင်သော Channel များ

OmniRoute သည် **သတိပေးချက် channel 3 ခု** ကို ပံ့ပိုးသည်-

| Channel          | စီစဉ်သတ်မှတ်မှု       | အသုံးပြုမှု               |
| ---------------- | --------------------- | ------------------------- |
| Dashboard banner | အမြဲဖွင့်ထားသည်       | App အတွင်း အသိပေးချက်များ |
| Webhook          | URL ပြင်ဆင်သတ်မှတ်ရန် | Slack, Discord, PagerDuty |
| Log              | မူလသတ်မှတ်ချက်        | ပြင်ပ log စုစည်းမှုအတွက်  |

### Webhook ပြင်ဆင်သတ်မှတ်မှု

> **မှတ်ချက်:** Webhook သတိပေးချက် ပြင်ဆင်သတ်မှတ်မှုကို dashboard ၏ Settings စာမျက်နှာမှတစ်ဆင့် ကိုင်တွယ်သည်။ Webhook URL၊ event filtering နှင့် payload customization တို့အတွက် Settings UI ကို ကြည့်ပါ။

### သတိပေးချက် အမျိုးအစားများ

| သတိပေးချက်                   | ဖြစ်ပေါ်သည့်အချိန်                                               | မူလ severity |
| ---------------------------- | ---------------------------------------------------------------- | ------------ |
| `provider_circuit_open`      | Circuit ပွင့်သည့်အခါ                                             | critical     |
| `provider_circuit_half_open` | Circuit ပြန်လည်ကောင်းမွန်မှုကို စမ်းသပ်သည့်အခါ                   | info         |
| `quota_warning`              | Quota 80%+ ရောက်သည့်အခါ                                          | warning      |
| `quota_exhausted`            | Quota 100% ရောက်သည့်အခါ                                          | critical     |
| `token_refresh_failed`       | ဆက်တိုက် refresh လုပ်ခြင်း 3 ကြိမ်နှင့်အထက် မအောင်မြင်သည့်အခါ    | warning      |
| `token_expired`              | Token သက်တမ်းကျော်လွန်သည့်အခါ                                    | critical     |
| `combo_target_unhealthy`     | Combo target သည် cooldown အခြေအနေတွင် 1 နာရီနှင့်အထက် ရှိသည့်အခါ | warning      |
| `db_integrity_warning`       | FK ချိုးဖောက်မှုများ > 0 ဖြစ်သည့်အခါ                             | warning      |
| `heap_pressure`              | Heap အသုံးပြုမှုသည် threshold ၏ 80% ထက်ကျော်သည့်အခါ              | warning      |

---

## စွမ်းဆောင်ရည် မက်ထရစ်များ

### ခြေရာခံထားသော မက်ထရစ်များ

| မက်ထရစ်                 | အမျိုးအစား  | ရင်းမြစ်                        |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | ကောင်တာ     | `services/usage.ts`             |
| `request_latency_ms`    | ဟစ်စတိုဂရမ် | `services/usage.ts`             |
| `tokens_consumed`       | ကောင်တာ     | `services/usage.ts`             |
| `cost_usd`              | ကောင်တာ     | `services/usage.ts`             |
| `provider_errors`       | ကောင်တာ     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ကောင်တာ     | `services/resilience.ts`        |
| `cache_hits`            | ကောင်တာ     | `services/signatureCache.ts`    |
| `compression_savings`   | ဟစ်စတိုဂရမ် | `services/compression/stats.ts` |
| `quota_used`            | ဂေ့ချ်      | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ဂေ့ချ်      | `observability.ts`              |

### တုံ့ပြန်ချိန် ရာခိုင်နှုန်းအဆင့်များ (p50/p95/p99)

> **REST endpoint မရှိပါ။** တုံ့ပြန်ချိန် ရာခိုင်နှုန်းအဆင့်ဒေတာကို dashboard ၏ `/dashboard/health` စာမျက်နှာမှ ရရှိနိုင်ပါသည်။ Prometheus/OpenTelemetry export ကို v3.9 အတွက် စီစဉ်ထားပါသည်။

### Prometheus / OpenTelemetry Export (အဆင့် ၂)

v3.9 အတွက် စီစဉ်ထားသည်မှာ Prometheus၊ OpenTelemetry နှင့် Datadog သို့ တိုက်ရိုက် export ပြုလုပ်နိုင်ခြင်းဖြစ်သည်။

လက်ရှိတွင် HTTP အခြေပြု စောင့်ကြည့်ရေးစနစ်တစ်ခုခု (Prometheus blackbox exporter၊ Datadog HTTP check စသည်) ဖြင့် `/api/monitoring/health` ကို scrape လုပ်ပါ။

---

## သတိပေးချက် စီစဉ်နည်းများ

### Slack

> **မှတ်ချက်:** Webhook သတိပေးချက်များကို dashboard Settings စာမျက်နှာမှ စီစဉ်သတ်မှတ်ရပါသည် — သီးခြား webhook env vars မရှိပါ (`grep -rn` သည် ရလဒ် သုညကို ပြန်ပေးသည်)။ Webhook URL၊ event စစ်ထုတ်ခြင်းနှင့် payload စိတ်ကြိုက်ပြင်ဆင်ခြင်းအတွက် Settings UI ကို ကြည့်ပါ။

### Discord

> Webhook သတိပေးချက်များသည် Slack နှင့် တူညီသော Settings UI လုပ်ငန်းစဉ်ကို အသုံးပြုပါသည်။ Discord သည် တူညီသော JSON payload ပုံစံကို လက်ခံပါသည်။

### PagerDuty

> Webhook သတိပေးချက်များသည် တူညီသော Settings UI လုပ်ငန်းစဉ်ကို အသုံးပြုပါသည်။ PagerDuty Events API v2 routing keys များကို Settings UI တွင် စီစဉ်သတ်မှတ်ရပါသည်။

### စိတ်ကြိုက် Webhook (JSON)

> JSON body ဖြင့် POST ကို လက်ခံသော မည်သည့် HTTP endpoint မဆို အလုပ်လုပ်ပါသည်။ URL ကို Settings UI တွင် စီစဉ်သတ်မှတ်ပါ။

---

## Dashboard ဖွဲ့စည်းသတ်မှတ်မှု

### Health Dashboard ကို စိတ်ကြိုက်ပြင်ဆင်ခြင်း

`~/.omniroute/dashboard.json` ဖိုင်တစ်ခု ဖန်တီးပါ။

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Provider တစ်ခုကို ထိပ်ဆုံးတွင် ပင်ထိုးထားခြင်း

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ပြဿနာဖြေရှင်းခြင်း

### "Provider က ကျန်းမာနေသည်ဟု ပြသသော်လည်း request များ မအောင်မြင်ပါ"

1. **autopilot issues** ကို စစ်ဆေးပါ — model တစ်ခု ပိတ်ပင်ခံထားရနိုင်သည်
2. သက်ဆိုင်ရာ error class အတွက် **recent errors** ကို ကြည့်ပါ
3. Provider card ရှိ **connection test** ကို စမ်းသပ်ပါ
4. Provider သည် **upstream တွင် rate limit ခံထားရခြင်း** ရှိ၊ မရှိ စစ်ဆေးပါ (စက်တွင်းမှ မမြင်နိုင်ပါ)

### "Quota က ကျန်းမာနေသည်ဟု ပြသသော်လည်း 429 များ တွေ့နေရပါသည်"

- 429 ဆိုသည်မှာ သင့် quota ကို သုံးစွဲပြီးဖြစ်ကြောင်း provider က ပြောနေခြင်းဖြစ်သည်
- OmniRoute ၏ quota ခြေရာခံမှုသည် **ဟောင်းနေနိုင်သည်** — provider ၏ အမှန်တကယ်အချက်အလက်သည် upstream တွင် ရှိသည်
- အတွင်းပိုင်း quota monitor မှတစ်ဆင့် quota ဒေတာကို အလိုအလျောက် refresh လုပ်ပါသည်

### "Target အားလုံး ကျန်းမာနေသော်လည်း combo မအောင်မြင်ပါ"

- Target အစီအစဉ်ပြဿနာများအတွက် **combo health** dashboard ကို စစ်ဆေးပါ
- **fallback events** ကို ကြည့်ပါ — combo သည် ရွေးချယ်စရာများကို မြန်လွန်းစွာ ကုန်ဆုံးနေနိုင်သည်
- **strategy** သည် သင့်အသုံးပြုမှုနှင့် ကိုက်ညီကြောင်း စစ်ဆေးပါ (priority နှင့် round-robin နှင့် auto)

### "Database health check မအောင်မြင်ပါ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ကို run ပါ
- "ok" ဖြစ်ပါက — မှားယွင်းသတိပေးချက်ဖြစ်ပြီး health check က တင်းကျပ်လွန်းနေခြင်းဖြစ်သည်
- အခြားတစ်ခုခုဖြစ်ပါက — **OmniRoute ကို ရပ်တန့်ပါ**၊ ထို့နောက် [ဘေးအန္တရာယ်မှ ပြန်လည်ရယူရေး လမ်းညွှန်](./DATABASE_GUIDE.md#disaster-recovery) ကို လိုက်နာပါ

### "Memory heap ဖိအားသည် အရေးကြီးအဆင့် ရောက်နေပါသည်"

```bash
# လက်ရှိ heap ကို စစ်ဆေးပါ
node -e "console.log(process.memoryUsage())"

# GC ကို ကိုယ်တိုင် လုပ်ဆောင်ပါ (--expose-gc ဖြစ်ပါက)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# တစ်ပြိုင်နက် request အရေအတွက်ကို လျှော့ချပါ (env var မဟုတ်ဘဲ dashboard Settings စာမျက်နှာမှ သတ်မှတ်ပါ)
# `MAX_CONCURRENT_REQUESTS` env var မရှိပါ — Settings → Concurrency တွင် စီစဉ်သတ်မှတ်ပါ။
```

---

## ထပ်မံကြည့်ရှုရန်

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — အသုံးပြုမှုနှင့် ကုန်ကျစရိတ် ခြေရာခံခြင်း
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB schema နှင့် ကျန်းမာရေးအခြေအနေ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy ကျန်းမာရေးအခြေအနေ (သီးခြား cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — စနစ်ဗိသုကာ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker အသေးစိတ်အချက်အလက်များ
- ရင်းမြစ်: `src/lib/monitoring/` (ဖိုင် 4 ခု၊ LOC 2121)
