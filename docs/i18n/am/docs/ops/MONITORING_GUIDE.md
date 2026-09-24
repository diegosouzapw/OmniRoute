# Monitoring & Observability Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute አብሮገነብ የጤና ክትትል፣ የአቅራቢ autopilot፣ የኮታ መከታተያ እና የታዛቢነት hooks ይዞ ይመጣል። ይህ መመሪያ dashboardን፣ ማንቂያዎችን እና መላ ፍለጋን ይሸፍናል።

**ምንጮች፦**

- `src/lib/monitoring/observability.ts` — የታዛቢነት snapshot
- `src/lib/monitoring/comboHealthAutopilot.ts` — የcombo ጤና autopilot
- `src/lib/monitoring/providerHealthAutopilot.ts` — የአቅራቢ autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — የአቅራቢ ጤና matrix
- `src/lib/localHealthCheck.ts` — የአካባቢ ጤና ምርመራ
- `src/lib/tokenHealthCheck.ts` — የtoken እድሳት ጤና
- `src/lib/proxyHealth.ts` — የproxy ጤና cache (በPROXY_GUIDE.md ውስጥ ተሸፍኗል)

---

## አጠቃላይ እይታ

OmniRoute **3 የክትትል ንብርብሮች** አሉት፦

```
┌──────────────────────────────────────────────────────────────┐
│  ንብርብር 1፦ የስርዓት ጤና (በserver ደረጃ)                    │
│  ├─ localHealthCheck.ts — DB፣ ports፣ native deps            │
│  ├─ db/healthCheck.ts — integrity፣ FK፣ orphaned artifacts   │
│  └─ Dashboard፦ /dashboard/health                             │
├──────────────────────────────────────────────────────────────┤
│  ንብርብር 2፦ የአቅራቢ ጤና (የእያንዳንዱ አቅራቢ ጽናት)          │
│  ├─ providerHealthAutopilot.ts — circuit breaker፣ cooldowns │
│  ├─ providerHealthMatrix.ts — በአቅራቢ/model የጤና ውጤቶች    │
│  └─ Dashboard፦ /dashboard/providers                          │
├──────────────────────────────────────────────────────────────┤
│  ንብርብር 3፦ ቀጥታ ታዛቢነት (የruntime snapshots)             │
│  ├─ observability.ts — circuit breakers፣ sessions፣ quota    │
│  ├─ tokenHealthCheck.ts — የOAuth token እድሳት ጤና           │
│  └─ MCP tools፦ omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## የDashboard ገጾች

### `/dashboard/health` (የስርዓት ጤና)

ከፍተኛ-ደረጃው የጤና dashboard የሚከተሉትን ያሳያል፦

| ክፍል               | የሚያሳየው                                              |
| ----------------- | --------------------------------------------------- |
| **የServer ሁኔታ**   | Uptime፣ version፣ port፣ ንቁ connections               |
| **Database**      | Connection፣ integrity፣ የWAL መጠን፣ የቅርብ ጊዜ migrations |
| **የአቅራቢ ማጠቃለያ**   | የንቁ፣ ጤናማ እና ክፍት breaker ብዛት                         |
| **የኮታ መከታተያዎች**   | ንቁ sessions፣ ማንቂያ መስጠት፣ ያለቀባቸው                      |
| **የቅርብ ጊዜ ስህተቶች** | የመጨረሻዎቹ 10 ስህተቶች ከstack traces ጋር                   |
| **የሀብት አጠቃቀም**    | Memory፣ CPU፣ የheap pressure አመልካች                   |

### `/dashboard/providers` (የአቅራቢ ጤና)

የእያንዳንዱ አቅራቢ dashboard፦

| ዓምድ         | መግለጫ                                     |
| ----------- | ---------------------------------------- |
| አቅራቢ        | የአቅራቢ ID + የማሳያ ስም                       |
| ጤና          | አረንጓዴ/ቢጫ/ቀይ ሁኔታ                          |
| Circuit     | ክፍት/ዝግ/በከፊል-ክፍት ሁኔታ                      |
| Connections | የconnections ብዛት፣ የመጨረሻ እድሳት             |
| Models      | የሚገኙ models፣ የእያንዳንዱ model ጤና            |
| ወጪ          | የዛሬ ወጪ፣ የ7-ቀን አዝማሚያ                      |
| ስህተቶች       | የመጨረሻዎቹ 24h የስህተት ብዛት፣ ከፍተኛው error class |

የሚከተሉትን ለማየት አቅራቢውን ጠቅ ያድርጉ፦

- የቅርብ ጊዜ requests ከlatency ዝርዝር ትንተና ጋር
- የእያንዳንዱ connection የጤና ውጤቶች
- የእያንዳንዱ model lockouts
- የAutopilot ምክረ ሐሳቦች

### `/dashboard/quota` (የኮታ ክትትል)

ለእያንዳንዱ API key፦

- የአሁኑ አጠቃቀም ከገደቡ ጋር (progress bar)
- የኮታ አዝማሚያ (የ30-ቀን chart)
- ቀጣዩ የreset ጊዜ
- የማንቂያ ታሪክ

### `/dashboard/combos` (የCombo ጤና)

ለእያንዳንዱ combo፦

- Strategy + targets
- የእያንዳንዱ target ጤና
- የቅርብ ጊዜ fallback events
- የስኬት መጠን (24h፣ 7d፣ 30d)

---

## የጤና ምርመራ API

OmniRoute **ሁለት** የHTTP ጤና መከታተያ መገናኛዎችን ያቀርባል። ለኦርኬስትሬተሮች እርስ በርሳቸው ተለዋዋጭ አይደሉም።

| ዱካ                           | ዓላማ                                                    | ክብደት                      | ለዚህ ይጠቀሙበት                                                   |
| ---------------------------- | ------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ |
| `GET /healthz`               | የሕይወት ዑደት ሕያውነት/ዝግጁነት (`ok` / `starting` / `stopping`) | ቀላል (የደረጃ ምልክት ብቻ)        | የKubernetes **readiness**፤ HTTP መጠቀም ካለብዎት ለስላሳ **liveness** |
| `GET /api/monitoring/health` | ጥልቅ የስርዓት + አቅራቢ ማጠቃለያ (DB፣ heap፣ የካታሎግ ብዛቶች፣ …)       | ከባድ (የተመሳሰለ DB / ክትትል ሥራ) | ዳሽቦርዶች፣ የblackbox ጥልቅ ምርመራዎች፣ የDocker አብሮገነብ healthcheck     |

> **ማስታወሻ፦** የአቅራቢ ጤና ማትሪክሶች፣ የautopilot ችግሮች፣ የquota መከታተያዎች፣ የtoken ጤና እና ከ`/api/monitoring/health` በላይ የሆነ የlatency ዝርዝር በ**MCP tool** `observability_snapshot` ወይም በ**dashboard** ገጾች በኩል ይገኛሉ — ለእነዚህ የተለዩ REST መስመሮች የሉም።

ሁለቱም መስመሮች ጥያቄዎችን ከሚያስተናግደው ጋር በ**ተመሳሳዩ የNode event loop** ላይ ይሰራሉ። CPUን አጥብቆ የሚጠቀም ዱካ (ትልቅ የ`GET /v1/models` ካታሎግ ሥራ፣ ረጅም-ዐውድ ማመቅ / token መቁጠር) `/healthz`ን ጨምሮ **ሁሉንም** HTTP handlers ሊያዘገይ ይችላል። event loop ሥራ በዝቶበታል ≠ process ሞቷል። ጫናውን የሚፈጥረውን ማስተካከል ይመረጣል፤ የprobe ማስተካከያ የተሳሳተ ማቋረጥን ብቻ ይቀንሳል።

### ቀላል የorchestrator probe

```bash
GET /healthz
# ወይም HEAD /healthz
```

- የserver lifecycle phase ዝግጁ ሲሆን **200** + body `ok`
- በመነሳት ወይም በመዘጋት ጊዜ **503** + `starting` / `stopping`
- አተገባበር፦ `src/app/healthz/route.ts` (የDB ping የለም)

### የስርዓት ጤና (ጥልቅ)

```bash
GET /api/monitoring/health
```

ምላሽ፦

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

#### `credentialHealth`፦ probe-cache ከSQLite `test_status` ጋር

`GET /api/monitoring/health` → `credentialHealth` **በማህደረ ትውስታ ውስጥ ያለው የprobe-cache
መለኪያ** እንጂ የ`provider_connections.test_status` የቀጥታ ውሂብ ማሳያ አይደለም። ከ#12532 በኋላ
የrequest path `getCachedCredentialHealthSummary()`ን ብቻ ያነባል፤ background probes
cacheን ከevent loop ውጪ ያድሳሉ።

| ንብርብር                | የት                                                                    | ትርጉሙ                                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| የProbe-cache መለኪያ    | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | በprocess memory ውስጥ አሁንም የተያዙ የመጨረሻዎቹ የcredential-health probe ውጤቶች። `source` ሁልጊዜ `probe-cache` ነው።                                                                             |
| የከሸፈ connection ዝርዝር | `credentialHealth.failedConnections`                                  | **`failed > 0` ሲሆን ብቻ** ይኖራል። `status=error` ያላቸው የcache rows የተገደበ ዝርዝር (`connectionId`፣ `status`፣ የተጣራ `lastError` / `lastErrorType`)። ዝርዝሩ ሲገደብ `failedOmitted` ይዘጋጃል።        |
| SQLite sticky status | `credentialHealth.staleDbNonOkCount`                                  | በpersisted `test_status` ውስጥ የሚታወቅ non-ok (`error`፣ `expired`፣ `credits_exhausted`፣ `banned`፣ `deactivated`፣ `unavailable`) ያላቸው **active** (`is_active=1`) connection rows ብዛት። |

ሁለቱ ንብርብሮች ሆን ብለው ሊለያዩ ይችላሉ፦

- መለኪያው `failed=0` ሆኖ `staleDbNonOkCount>0` ሲሆን — SQLite አሁንም የተጣበቀ
  `test_status` (ለምሳሌ `expired` ወይም `credits_exhausted`) አለው፤ የቅርብ ጊዜው
  የprobe-cache snapshot ግን እንደ `status=error` አይቆጥረውም።
- መለኪያው `failed>0` ሆኖ SQLite ጤናማ ሲመስል — የቅርብ ጊዜ probe ከሽፎ
  cache ውስጥ ተቀምጧል፤ DB row አልተዘመነም ወይም በኋላ ተጠርጓል።

ይህን endpoint በመሰብሰብ ጊዜ በ`provider_connections.test_status` ላይ ብቻ ተመስርተው ማንቂያ አያስነሱ።
ለቀጥታ የprobe ውድቀቶች `failed` + `failedConnections`ን፣ የተቀመጠውን
የsticky-status ብዛት ሲፈልጉ ደግሞ `staleDbNonOkCount`ን ይጠቀሙ።

### የKubernetes probe ምክሮች

OmniRoute **አንድ የNode process** (አንድ event loop) ነው። መደበኛው የDocker `HEALTHCHECK` ቀላሉን `/healthz` ዒላማ ያደርጋል። `/api/monitoring/health` ለkubelet liveness የጊዜ ክፍተቶች **በጣም ከባድ** ነው።

| ፕሮብ              | የሚመከር ዒላማ                                                              | ማስታወሻዎች                                                                                                                                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ማስጀመሪያ**       | HTTP `GET /healthz` ከረጅም `failureThreshold` (ወይም ትልቅ `startPeriod`) ጋር | ቀዝቃዛ ማስጀመር + SQLite ማዛወር ከጥቂት ሰከንዶች ሊበልጥ ይችላል                                                                                                                                                                                                         |
| **ዝግጁነት**        | HTTP `GET /healthz`                                                    | የሕይወት ዑደት `ok` / `starting` / `stopping` (200 ከ503 ጋር ሲነጻጸር)። ሉፑ በCPU ከታገደ አሁንም ይዋዥቃል። **200 ከበርካታ ሰከንዶች በኋላ መመለሱ ጤናማ አይደለም** (#10303) — ይህም ባለ3-ባይት ተቆጣጣሪው ከመስራቱ በፊት የክስተት ሉፑ የማስኬጃ ጊዜ እንዳላገኘ ያሳያል                                                   |
| **ሕያውነት**        | HTTP `GET /livez`፣ **ወይም TCP** በዋናው የአገልግሎት ወደብ (`PORT`፣ ነባሪ `20128`)  | `/livez` ሂደቱ ሕያው መሆኑን ብቻ ያረጋግጣል (ተቆጣጣሪው ከሰራ ሁልጊዜ 200)። አሁንም የክስተት ሉፑን ይጋራል — ሥራ የበዛበት ≠ የሞተ፣ እና የክስተት ሉፕ የማስኬጃ ጊዜ እጦትን (#10303) ከTCP በተሻለ አያገኝም። በካታሎግ/መጭመቅ ጫና ወቅት HTTP ፕሮቦች ጊዜያቸው ካለፈ **TCP**ን ይምረጡ፤ በሁለቱም ሁኔታ በአጭር የክስተት ሉፕ መቆም ምክንያት ፖዱን **አይግደሉ** |
| **ጥልቅ የጤና ምርመራ** | `GET /api/monitoring/health` ከውጫዊ ፈታሽ                                  | ለkubelet `livenessProbe` / ተደጋጋሚ `readinessProbe` አይደለም                                                                                                                                                                                               |

የምሳሌ ቅርጽ (ገደቦቹን ከቀዝቃዛ ማስጀመርዎ እና ከመጭመቅ ጫናዎ ጋር ያስተካክሉ)፦

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
  # የክስተት ሉፑ ሲቆም HTTP /livez አሁንም ጊዜው ሊያልፍ ይችላል። TCP
  # ጥንቃቄ የተሞላበት አማራጭ ነው፦
  # tcpSocket:
  #   port: http
```

የkubelet **ሕያውነት** ፕሮብን ወደ `/api/monitoring/health` **አታመልክቱ**። ይህ ዱካ እውነተኛ የDB/ክትትል ሥራ ያከናውናል፣ እና በጫና ወቅት በስህተት ችግር እንዳለ ያመለክታል።

ተዛማጅ፦ [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (የክስተት ሉፑ ሥራ ሲበዛበት የሚደረጉ ፕሮቦች)፣ [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (የካታሎግ ዋጋ አሰጣጥ ግብዓት መቆጣጠር)፣ [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (የመጭመቅ ቶከን-ቆጠራ ግብዓት መቆጣጠር)።

### አማራጭ የጥያቄ-ዱካ ሥራ (ማህደረ ትውስታ፣ ክህሎቶች፣ የቶከን ማደስ)

የማህደረ ትውስታ ማውጣት፣ ክህሎቶችን ማስገባት እና የOAuth ቶከን ማደስ **ዋናውን Node የክስተት ሉፕ** ከ`/healthz` ጋር ይጋራሉ። እነዚህ የዳሽቦርድ አብራ/አጥፋ ባህሪያት (`memoryEnabled`፣ `skillsEnabled`) እንጂ የሠራተኛ ፑል አይደሉም። [አካባቢ — የማህደረ ትውስታ፣ ክህሎቶች እና ቶከን ማደስ የክስተት-ሉፕ ወጪ](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)ን ይመልከቱ።

### የአቅራቢ ጤና

> **የREST መዳረሻ የለም።** የአቅራቢ ጤና ውሂብ በMCP መሣሪያ `observability_snapshot` ወይም በዳሽቦርድ `/dashboard/providers` ገጽ በኩል ይገኛል።

### የአቅራቢ ዝርዝር

> **የREST መዳረሻ የለም።** የእያንዳንዱ አቅራቢ ዝርዝር በዳሽቦርድ `/dashboard/providers` ገጽ በኩል ይገኛል።

---

## የአቅራቢ ጤና ራስ-ሰር አስተዳዳሪ

የ`providerHealthAutopilot.ts` ሞጁል፦

1. የአቅራቢ ችግሮችን የሚለይ (የወረዳ መቋረጫ መከፈት፣ የማቀዝቀዣ ጊዜዎች፣ መታገዶች፣ የኮታ ማስጠንቀቂያዎች)
2. ችግሮቹን ለመፍታት **የሚመከሩ እርምጃዎችን** የሚያመነጭ
3. በአማራጭነት ዝቅተኛ ስጋት ያላቸውን እርምጃዎች **በራስ-ሰር የሚያስፈጽም**

**ራሱን የሚጠግን ስርዓት** ነው።

### የሚለዩ የችግር ዓይነቶች

| የችግር ዓይነት                    | ክብደት    | የሁኔታ ምሳሌ                         |
| ---------------------------- | ------- | -------------------------------- |
| `provider_circuit_open`      | ወሳኝ     | ከ5 ውድቀቶች በኋላ የወረዳ መቋረጫው ተከፍቷል    |
| `provider_circuit_half_open` | ማስጠንቀቂያ | ወረዳው መልሶ ማገገምን እየፈተነ ነው          |
| `connection_cooldown`        | ማስጠንቀቂያ | ከ429 በኋላ ግንኙነቱ በማቀዝቀዣ ጊዜ ውስጥ ነው  |
| `stale_connection_error`     | ማስጠንቀቂያ | የመጨረሻው ማደስ ከ30+ ደቂቃዎች በፊት አልተሳካም |
| `terminal_connection_error`  | ወሳኝ     | OAuth ተሰርዟል፣ ቁልፉ ልክ አይደለም        |
| `inactive_connection`        | መረጃ     | ግንኙነቱ በቅንብሮች ውስጥ ተሰናክሏል          |
| `model_lockout`              | ማስጠንቀቂያ | የተወሰነው ሞዴል በለይቶ ማቆያ ውስጥ ነው       |
| `quota_monitor_warning`      | ማስጠንቀቂያ | የኮታ አጠቃቀም 80%+ ደርሷል              |

### የሚመነጩ የእርምጃ ዓይነቶች

| እርምጃ                           | ስጋት   | መግለጫ                            |
| ------------------------------ | ----- | ------------------------------- |
| `clear_provider_breaker`       | መካከለኛ | የወረዳ መቋረጫውን ወደ ዝግ ሁኔታ ዳግም ያስጀምሩ |
| `clear_connection_cooldown`    | ዝቅተኛ  | የግንኙነቱን የማቀዝቀዣ ጊዜ ያስወግዱ         |
| `clear_stale_connection_error` | ዝቅተኛ  | ጊዜ ያለፈበትን የስህተት ምልክት ያጽዱ        |
| `clear_model_lockout`          | ዝቅተኛ  | በለይቶ ማቆያ ውስጥ ያለውን ሞዴል ዳግም ያንቁ   |
| `reactivate_connection`        | መካከለኛ | የቦዘነውን ግንኙነት ዳግም ያንቁ            |
| `deactivate_connection`        | ከፍተኛ  | ችግር ያለበትን ግንኙነት ያሰናክሉ           |

### API

> **የREST መጨረሻ ነጥብ የለም።** የራስ-ሰር አስተዳዳሪ ችግሮች በMCP መሣሪያ `observability_snapshot` ወይም በዳሽቦርዱ በኩል ይገኛሉ። ራስ-ሰር አስተዳዳሪው በውስጥ ይሰራል፤ ባህሪው የሚዋቀረው በቅንብሮች DB (የእያንዳንዱ ግንኙነት `autopilotMode` መስክ) እንጂ በአካባቢ ተለዋዋጮች አይደለም — ለራስ-ሰር አስተዳዳሪ ሁነታ አካባቢ ተለዋዋጭ `grep -rn` ሲደረግ ምንም ውጤት አይገኝም።

### የራስ-ሰር አስተዳዳሪ ሁነታ

ራስ-ሰር አስተዳዳሪው በነባሪነት በ**በእጅ ሁነታ** ይሰራል — ችግሮችን ይለያል እና የሚመከሩ እርምጃዎችን ያመነጫል፣ ነገር ግን በራስ-ሰር አይተገብራቸውም። እርምጃዎቹ በዳሽቦርዱ በኩል ሊተገበሩ ይችላሉ።

---

## የጥምረት ጤና ራስ-ሰር አስተዳዳሪ

`comboHealthAutopilot.ts` የአቅራቢ ራስ-ሰር አስተዳዳሪው **ለጥምረት የተለየ** አቻ ነው። ይህ፦

- ጤናማ ያልሆኑ ጥምረቶችን ይለያል
- የዒላማዎችን ቅደም ተከተል እንደገና እንዲደራጅ ይመክራል
- የተበላሹ ዒላማዎች እንዲሰናከሉ ሐሳብ ያቀርባል
- ከN ውድቀቶች በኋላ የማይሰሩ ዒላማዎችን በራስ-ሰር ያስወግዳል

### የጥምረት ችግር ምሳሌዎች

```
ጥምረት "always-on" (የቅድሚያ ስልት)
├─ ዒላማ 1: openai/gpt-5 (ጤናማ)
├─ ዒላማ 2: anthropic/claude-opus-4-6 (⚠️ እስከ 14:00 ድረስ የሞዴል መታገድ)
└─ ዒላማ 3: kiro/claude-sonnet-4-5 (ጤናማ)

የሚመከር እርምጃ፦ ቅደም ተከተሉን እንደገና ያደራጁ — መታገዱ እስኪያበቃ ድረስ kiroን ከanthropic በላይ ያንቀሳቅሱ
```

---

## የኮታ መከታተያዎች

`observability.ts` ለደንበኝነት ምዝገባ አቅራቢዎች (Claude Code፣ Codex፣ GitHub Copilot) **በክፍለ ጊዜ የተከፋፈሉ የኮታ መከታተያዎችን** ያቀርባል፦

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

### የሁኔታዎች ትርጉም

| ሁኔታ         | መቼ                     | የUI እርምጃ                 |
| ----------- | ---------------------- | ------------------------ |
| `starting`  | የመጀመሪያ ምርመራ በሂደት ላይ ነው | የመጫን አመልካች               |
| `idle`      | የቅርብ ጊዜ እንቅስቃሴ የለም     | ከዳሽቦርዱ የተደበቀ             |
| `healthy`   | ከ50% በላይ ኮታ ቀርቷል       | አረንጓዴ ነጥብ                |
| `warning`   | ከ50% በታች ኮታ ቀርቷል       | ቢጫ ማንቂያ                  |
| `exhausted` | ኮታ = 0%                | ቀይ እገዳ፣ ወደ ቀጣዩ አቅራቢ ያዛውሩ |
| `error`     | ምርመራው አልተሳካም           | ቀይ ነጥብ፣ በቅርቡ እንደገና ይሞክሩ  |

### API

> **የREST መጨረሻ ነጥብ የለም።** የኮታ መከታተያ ውሂብ በMCP መሣሪያ `observability_snapshot` ወይም በዳሽቦርዱ በኩል ይገኛል።

---

## የታዛቢነት ቅጽበታዊ እይታ

የMCP መሣሪያው `observability_snapshot` ለAI ወኪሎች **የተሟላ የስርዓት ቅጽበታዊ እይታ** ይመልሳል፦

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
  "quotaMonitors": {/* ከላይ ይመልከቱ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ወኪሎች ይህን በመጠቀም **የማዞሪያ ውሳኔዎችን** ያደርጋሉ—ለምሳሌ፣ "የopenai ወረዳ ክፍት ከሆነ፣ መጀመሪያ ወደ anthropic አዙር"።

---

## የቶከን ጤንነት ምርመራ

የOAuth አቅራቢዎች (Claude Code፣ GitHub Copilot፣ Cursor) **ወቅታዊ የቶከን ማደስ** ያስፈልጋቸዋል። `src/lib/tokenHealthCheck.ts` የበስተጀርባ መርሐግብር አስኪያጅን ያስኬዳል፦

- **የማጣሪያ ዙር**፦ በየ60 ሰከንዱ (`TICK_MS = 60 * 1000` ያለው ማጣሪያ በ`src/lib/tokenHealthCheck.ts:30`)
- **የእያንዳንዱ ግንኙነት የጤንነት ምርመራ ክፍተት**፦ ነባሪው 60 ደቂቃ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`) ነው፤ በቅንብሮች DB በኩል ሊዋቀር ይችላል
- **401 ሲከሰት ቅድመ-ማደስ**፦ በእያንዳንዱ ግንኙነት interceptor ይከናወናል

### የቶከን ጤንነት ሁኔታ

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

### ውቅር

የቶከን ጤንነት ምርመራ ውቅር በውስጥ በ`tokenHealthCheck.ts` ይከናወናል።

### የቶከን ጤንነት

> **የREST መዳረሻ የለም።** የቶከን ጤንነት ውሂብ በዳሽቦርዱ ወይም በMCP መሣሪያ `observability_snapshot` በኩል ይገኛል።

---

## ማንቂያ

### አብረው የተካተቱ ቻናሎች

OmniRoute **3 የማንቂያ ቻናሎችን** ይደግፋል፦

| ቻናል         | ማዋቀር     | የአጠቃቀም ሁኔታ                |
| ----------- | -------- | ------------------------- |
| የዳሽቦርድ ሰንደቅ | ሁልጊዜ ክፍት | በመተግበሪያ ውስጥ ማሳወቂያዎች       |
| Webhook     | URL ያዋቅሩ | Slack፣ Discord፣ PagerDuty |
| ምዝግብ        | ነባሪ      | ለውጫዊ የምዝግብ ማሰባሰቢያ         |

### የWebhook ውቅር

> **ማስታወሻ፦** የWebhook ማንቂያ ውቅር በዳሽቦርዱ የቅንብሮች ገጽ በኩል ይከናወናል። ለWebhook URL፣ የክስተት ማጣሪያ እና የpayload ማበጀት የቅንብሮች UIን ይመልከቱ።

### የማንቂያ ዓይነቶች

| ማንቂያ                         | መቼ                                 | ነባሪ ክብደት |
| ---------------------------- | ---------------------------------- | -------- |
| `provider_circuit_open`      | ወረዳው ሲከፈት                          | ወሳኝ      |
| `provider_circuit_half_open` | ወረዳው መልሶ ማገገሙን ሲፈትሽ                | መረጃ      |
| `quota_warning`              | ኮታው 80%+ ሲደርስ                      | ማስጠንቀቂያ  |
| `quota_exhausted`            | ኮታው 100% ሲደርስ                      | ወሳኝ      |
| `token_refresh_failed`       | 3+ ተከታታይ የማደስ ውድቀቶች ሲኖሩ            | ማስጠንቀቂያ  |
| `token_expired`              | ቶከኑ የማብቂያ ጊዜውን ሲያልፍ                | ወሳኝ      |
| `combo_target_unhealthy`     | የCombo ዒላማው ለ1h+ በማቀዝቀዣ ጊዜ ውስጥ ሲቆይ | ማስጠንቀቂያ  |
| `db_integrity_warning`       | የFK ጥሰቶች > 0 ሲሆኑ                   | ማስጠንቀቂያ  |
| `heap_pressure`              | የHeap አጠቃቀም > 80% የገደቡ ሲሆን         | ማስጠንቀቂያ  |

---

## የአፈጻጸም መለኪያዎች

### ክትትል የሚደረግባቸው መለኪያዎች

| መለኪያ                    | ዓይነት   | ምንጭ                             |
| ----------------------- | ------ | ------------------------------- |
| `request_count`         | ቆጣሪ    | `services/usage.ts`             |
| `request_latency_ms`    | ሂስቶግራም | `services/usage.ts`             |
| `tokens_consumed`       | ቆጣሪ    | `services/usage.ts`             |
| `cost_usd`              | ቆጣሪ    | `services/usage.ts`             |
| `provider_errors`       | ቆጣሪ    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ቆጣሪ    | `services/resilience.ts`        |
| `cache_hits`            | ቆጣሪ    | `services/signatureCache.ts`    |
| `compression_savings`   | ሂስቶግራም | `services/compression/stats.ts` |
| `quota_used`            | ጌጅ     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ጌጅ     | `observability.ts`              |

### የመዘግየት ፐርሰንታይሎች (p50/p95/p99)

> **የREST መዳረሻ ነጥብ የለም።** የመዘግየት ፐርሰንታይል ውሂብ በዳሽቦርዱ `/dashboard/health` ገጽ በኩል ይገኛል። ወደ Prometheus/OpenTelemetry መላክ ለv3.9 ታቅዷል።

### ወደ Prometheus / OpenTelemetry መላክ (ደረጃ 2)

ለv3.9 የታቀደ፦ ወደ Prometheus፣ OpenTelemetry እና Datadog ቤተኛ መላክ።

ለአሁን፣ `/api/monitoring/health`ን በማንኛውም HTTP-ላይ የተመሠረተ የክትትል ሥርዓት (Prometheus blackbox exporter፣ Datadog HTTP check፣ ወዘተ) ይሰብስቡ።

---

## የማንቂያ አዘገጃጀቶች

### Slack

> **ማስታወሻ፦** የWebhook ማንቂያ በዳሽቦርዱ Settings ገጽ በኩል ይዋቀራል — ለዚህ የተለዩ የwebhook የአካባቢ ተለዋዋጮች የሉም (`grep -rn` ምንም ውጤት አይመልስም)። ለwebhook URL፣ ለክስተት ማጣሪያ እና ለpayload ማበጀት Settings UIን ይመልከቱ።

### Discord

> የWebhook ማንቂያ ከSlack ጋር ተመሳሳይ የSettings UI ሂደትን ይጠቀማል። Discord ተመሳሳይ የJSON payload ቅርጽን ይቀበላል።

### PagerDuty

> የWebhook ማንቂያ ተመሳሳይ የSettings UI ሂደትን ይጠቀማል። የPagerDuty Events API v2 routing keys በSettings UI ውስጥ ይዋቀራሉ።

### ብጁ Webhook (JSON)

> JSON body ያለውን POST የሚቀበል ማንኛውም HTTP መዳረሻ ነጥብ ይሠራል። URLን በSettings UI ውስጥ ያዋቅሩ።

---

## የዳሽቦርድ ውቅር

### የጤና ዳሽቦርዱን ያብጁ

`~/.omniroute/dashboard.json` ይፍጠሩ፦

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### አቅራቢን ከላይ ይሰኩ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ችግር መፍታት

### "አቅራቢው ጤናማ ነው ይላል፣ ግን ጥያቄዎች አይሳኩም"

1. **autopilot issues**ን ይፈትሹ — ምናልባት አንድ model ታግዶ ይሆናል
2. የተወሰነውን የስህተት ምድብ ለማየት **recent errors**ን ይመልከቱ
3. በአቅራቢው ካርድ ውስጥ ያለውን **connection test** ይሞክሩ
4. አቅራቢው **በupstream የrate limit ገደብ እንደተጣለበት** ይፈትሹ (በአካባቢው አይታይም)

### "Quota ጤናማ ነው ይላል፣ ግን 429ዎችን አያለሁ"

- 429 ማለት አቅራቢው quotaዎን እንደጨረሱ እየገለጸ ነው
- የOmniRoute quota ክትትል **ያልታደሰ** ሊሆን ይችላል — ትክክለኛው መረጃ በአቅራቢው upstream ላይ ነው
- የQuota ውሂብ በውስጣዊው quota monitor በኩል በራስ-ሰር ይታደሳል

### "Comboው እየከሸፈ ነው፣ ግን ሁሉም targets ጤናማ ይመስላሉ"

- የtarget ቅደም ተከተል ችግሮች ካሉ ለማየት **combo health** ዳሽቦርድን ይፈትሹ
- **fallback events**ን ይመልከቱ — ምናልባት comboው አማራጮቹን በጣም ፈጥኖ እየጨረሰ ይሆናል
- **strategy**ው ከአጠቃቀምዎ ጋር እንደሚዛመድ ያረጋግጡ (priority ከ round-robin ከ auto)

### "የውሂብ ጎታ ጤና ምርመራው እየከሸፈ ነው"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`ን ያስኪዱ
- "ok" ከሆነ — የሐሰት ማንቂያ ነው፤ የጤና ምርመራው ከልክ በላይ ጥብቅ እየሆነ ነው
- ሌላ ማንኛውም ውጤት ከሆነ — **OmniRouteን ያቁሙ** እና [የአደጋ ማገገሚያ መመሪያውን](./DATABASE_GUIDE.md#disaster-recovery) ይከተሉ

### "የMemory heap ጫናው አሳሳቢ ነው"

```bash
# የአሁኑን heap ይፈትሹ
node -e "console.log(process.memoryUsage())"

# በእጅ GCን ያስነሱ (--expose-gc ካለ)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# በአንድ ጊዜ የሚካሄዱ ጥያቄዎችን ይቀንሱ (በenv var ሳይሆን በዳሽቦርዱ Settings ገጽ በኩል ያዋቅሩ)
# `MAX_CONCURRENT_REQUESTS` env var የለም — በSettings → Concurrency ውስጥ ያዋቅሩት።
```

---

## በተጨማሪ ይመልከቱ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — የአጠቃቀም እና የወጪ ክትትል
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — የDB መዋቅር + ጤና
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — የproxy ጤና (የተለየ cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — የስርዓት አርክቴክቸር
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — የcircuit breaker ዝርዝሮች
- ምንጭ፦ `src/lib/monitoring/` (4 ፋይሎች፣ 2121 LOC)
