# Monitoring & Observability Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: Ang OmniRoute ay may kasamang built-in na pagsubaybay sa kalusugan, provider autopilot, pagsubaybay sa quota, at mga observability hook. Tinatalakay ng gabay na ito ang dashboard, mga alerto, at pag-troubleshoot.

**Mga source:**

- `src/lib/monitoring/observability.ts` — snapshot ng observability
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot para sa kalusugan ng combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot ng provider
- `src/lib/monitoring/providerHealthMatrix.ts` — matrix ng kalusugan ng provider
- `src/lib/localHealthCheck.ts` — lokal na pagsusuri sa kalusugan
- `src/lib/tokenHealthCheck.ts` — kalusugan ng pag-refresh ng token
- `src/lib/proxyHealth.ts` — cache ng kalusugan ng proxy (tinalakay sa PROXY_GUIDE.md)

---

## Pangkalahatang-ideya

May **3 layer ng pagsubaybay** ang OmniRoute:

```
┌──────────────────────────────────────────────────────────────┐
│  Layer 1: Kalusugan ng System (antas ng server)               │
│  ├─ localHealthCheck.ts — DB, mga port, native dependency     │
│  ├─ db/healthCheck.ts — integridad, FK, naulilang artifact    │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Layer 2: Kalusugan ng Provider (resilience bawat provider)   │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldown    │
│  ├─ providerHealthMatrix.ts — mga health score ayon sa        │
│  │  provider/model                                            │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Layer 3: Live na Observability (mga runtime snapshot)         │
│  ├─ observability.ts — mga circuit breaker, session, quota    │
│  ├─ tokenHealthCheck.ts — kalusugan ng pag-refresh ng OAuth   │
│  │  token                                                     │
│  └─ Mga MCP tool: omniroute_get_health,                       │
│     omniroute_get_session_snapshot                            │
└──────────────────────────────────────────────────────────────┘
```

---

## Mga Page ng Dashboard

### `/dashboard/health` (Kalusugan ng System)

Ipinapakita ng pangunahing dashboard ng kalusugan ang:

| Seksyon                   | Ipinapakita nito                                              |
| ------------------------- | ------------------------------------------------------------- |
| **Status ng server**      | Uptime, bersyon, port, mga aktibong koneksyon                 |
| **Database**              | Koneksyon, integridad, laki ng WAL, mga kamakailang migration |
| **Buod ng provider**      | Bilang ng aktibo, malusog, at bukas na breaker                |
| **Mga quota monitor**     | Mga aktibong session, pag-alerto, naubos na quota             |
| **Mga kamakailang error** | Huling 10 error na may mga stack trace                        |
| **Paggamit ng resource**  | Memory, CPU, indicator ng pressure sa heap                    |

### `/dashboard/providers` (Kalusugan ng Provider)

Dashboard para sa bawat provider:

| Column        | Paglalarawan                                               |
| ------------- | ---------------------------------------------------------- |
| Provider      | Provider ID + display name                                 |
| Kalusugan     | Berde/dilaw/pulang status                                  |
| Circuit       | Bukas/sarado/half-open na estado                           |
| Mga koneksyon | Bilang ng mga koneksyon, huling pag-refresh                |
| Mga model     | Mga available na model, kalusugan bawat model              |
| Gastos        | Gastos ngayon, 7-araw na trend                             |
| Mga error     | Bilang ng error sa huling 24h, nangungunang klase ng error |

I-click ang isang provider upang makita ang:

- Mga kamakailang request na may breakdown ng latency
- Mga health score ng bawat koneksyon
- Mga lockout ng bawat model
- Mga rekomendasyon ng autopilot

### `/dashboard/quota` (Pagsubaybay sa Quota)

Para sa bawat API key:

- Kasalukuyang paggamit kumpara sa limitasyon (progress bar)
- Trend ng quota (30-araw na chart)
- Oras ng susunod na pag-reset
- Kasaysayan ng alerto

### `/dashboard/combos` (Kalusugan ng Combo)

Para sa bawat combo:

- Strategy + mga target
- Kalusugan ng bawat target
- Mga kamakailang fallback event
- Success rate (24h, 7d, 30d)

---

## Health Check API

Naglalantad ang OmniRoute ng **dalawang** HTTP health surface. Hindi maaaring pagpalitin ang mga ito para sa mga orchestrator.

| Path                         | Layunin                                                               | Bigat                                    | Gamitin para sa                                                                       |
| ---------------------------- | --------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET /healthz`               | Lifecycle liveness/readiness (`ok` / `starting` / `stopping`)         | Magaang (phase flag lamang)              | Kubernetes **readiness**; banayad na **liveness** kung kailangan mong gumamit ng HTTP |
| `GET /api/monitoring/health` | Malalim na buod ng system + provider (DB, heap, bilang sa catalog, …) | Mabigat (sync DB / monitoring na gawain) | Mga dashboard, malalalim na blackbox check, built-in na healthcheck ng Docker         |

> **Tandaan:** Ang mga provider health matrix, isyu sa autopilot, quota monitor, token health, at detalye ng latency na higit pa sa `/api/monitoring/health` ay makukuha sa pamamagitan ng **MCP tool** na `observability_snapshot` o ng mga pahina ng **dashboard** — walang mga nakalaang REST route para sa mga iyon.

Gumagana ang parehong route sa **iisang Node event loop** na ginagamit sa paghawak ng mga request. Maaaring maantala ng isang CPU-bound na path (malaking gawain sa catalog ng `GET /v1/models`, long-context compression / pagbibilang ng token) ang **lahat** ng HTTP handler, kabilang ang `/healthz`. Abalang event loop ≠ patay na proseso. Mas mainam na ayusin ang sanhi ng pagkaabala; binabawasan lamang ng pag-tune ng probe ang mga maling pagpatay sa proseso.

### Magaang na probe ng orchestrator

```bash
GET /healthz
# o HEAD /healthz
```

- **200** + body na `ok` kapag handa na ang lifecycle phase ng server
- **503** + `starting` / `stopping` habang nagbo-boot o nagsa-shutdown
- Implementasyon: `src/app/healthz/route.ts` (walang DB ping)

### Kalusugan ng System (malalim)

```bash
GET /api/monitoring/health
```

Tugon:

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

#### `credentialHealth`: probe-cache kumpara sa SQLite `test_status`

Ang `GET /api/monitoring/health` → `credentialHealth` ay ang **in-memory probe-cache
gauge**, hindi isang live dump ng `provider_connections.test_status`. Pagkatapos ng #12532,
ang request path ay nagbabasa lamang ng `getCachedCredentialHealthSummary()`; nire-refresh ng mga
background probe ang cache sa labas ng event loop.

| Layer                         | Saan                                                                  | Ano ang ibig sabihin nito                                                                                                                                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache gauge             | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Mga resulta ng pinakahuling credential-health probe na nasa memory pa rin ng proseso. Ang `source` ay palaging `probe-cache`.                                                                                                                             |
| Detalye ng nabigong koneksyon | `credentialHealth.failedConnections`                                  | Makikita **lamang kapag `failed > 0`**. May limitasyong listahan ng mga cache row na may `status=error` (`connectionId`, `status`, na-sanitize na `lastError` / `lastErrorType`). Itinatakda ang `failedOmitted` kapag umabot sa limitasyon ang listahan. |
| SQLite sticky status          | `credentialHealth.staleDbNonOkCount`                                  | Bilang ng mga **aktibong** (`is_active=1`) connection row na ang naka-persist na `test_status` ay kilalang hindi ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                                    |

Maaaring sadyang hindi magtugma ang dalawang layer:

- Gauge na `failed=0` habang `staleDbNonOkCount>0` — mayroon pa ring sticky
  `test_status` ang SQLite (halimbawa, `expired` o `credits_exhausted`) na hindi
  binibilang ng pinakabagong probe-cache snapshot bilang `status=error`.
- Gauge na `failed>0` habang mukhang healthy ang SQLite — nabigo ang isang kamakailang probe at
  naka-cache ito; hindi pa naa-update ang DB row, o na-clear ito kalaunan.

Huwag mag-alert batay lamang sa `provider_connections.test_status` kapag ini-scrape ang
endpoint na ito. Gamitin ang `failed` + `failedConnections` para sa mga live na pagkabigo ng probe, at
ang `staleDbNonOkCount` kapag kailangan mo ang bilang ng naka-persist na sticky-status.

### Mga rekomendasyon sa Kubernetes probe

Ang OmniRoute ay isang **iisang Node process** (isang event loop). Ang karaniwang Docker `HEALTHCHECK` ay nagta-target sa magaang na `/healthz`. **Masyadong mabigat** ang `/api/monitoring/health` para sa mga liveness interval ng kubelet.

| Probe           | Inirerekomendang target                                                            | Mga Tala                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Startup**     | HTTP `GET /healthz` na may mahabang `failureThreshold` (o malaking `startPeriod`)  | Maaaring lumampas nang ilang segundo ang cold start + SQLite migration                                                                                                                                                                                                                                                                                                                                                                            |
| **Readiness**   | HTTP `GET /healthz`                                                                | Lifecycle na `ok` / `starting` / `stopping` (200 vs 503). Pabago-bago pa rin ito kung nahaharangan ng CPU ang loop. Ang **200 na tumatagal nang ilang segundo ay hindi healthy** (#10303) — nangangahulugan itong nagutom sa resources ang event loop bago tumakbo ang 3-byte handler                                                                                                                                                             |
| **Liveness**    | HTTP `GET /livez`, **o TCP** sa pangunahing service port (`PORT`, default `20128`) | Ang `/livez` ay para lamang sa pagiging buhay ng process (palaging 200 kung tatakbo ang handler). Nakikibahagi pa rin ito sa event loop — ang busy ay ≠ patay, at hindi nito natutukoy ang event-loop starvation (#10303) nang mas mahusay kaysa sa TCP. Piliin ang **TCP** kung nagta-time out ang mga HTTP probe sa ilalim ng catalog/compression load; **huwag** patayin ang pod dahil sa maiikling paghinto ng event loop alinman ang gamitin |
| **Deep health** | `GET /api/monitoring/health` mula sa external checker                              | Hindi para sa kubelet `livenessProbe` / mahigpit na `readinessProbe`                                                                                                                                                                                                                                                                                                                                                                              |

Halimbawang anyo (i-adjust ang mga threshold ayon sa iyong cold-start at compression load):

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
  # Sa ilalim ng event-loop stall, maaari pa ring mag-time out ang HTTP /livez. Ang TCP ang
  # konserbatibong alternatibo:
  # tcpSocket:
  #   port: http
```

**Huwag** ituro ang kubelet **liveness** sa `/api/monitoring/health`. Gumagawa ang path na iyon ng aktuwal na DB/monitoring work at magbibigay ng false positive sa ilalim ng load.

Kaugnay: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (mga probe habang abala ang event loop), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (catalog pricing hog), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (compression token-count hog).

### Opsyonal na gawain sa request path (memory, skills, token refresh)

Ang memory extraction, skills injection, at OAuth token refresh ay nakikibahagi sa **pangunahing Node event loop** kasama ng `/healthz`. Mga feature na maaaring i-toggle sa dashboard ang mga ito (`memoryEnabled`, `skillsEnabled`), hindi isang worker pool. Tingnan ang [Environment — gastos sa event loop](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Kalagayan ng Provider

> **Walang REST endpoint.** Available ang provider health data sa pamamagitan ng MCP tool na `observability_snapshot` o sa dashboard page na `/dashboard/providers`.

### Mga Detalye ng Provider

> **Walang REST endpoint.** Available ang detalye ng bawat provider sa dashboard page na `/dashboard/providers`.

---

## Autopilot sa Kalagayan ng Provider

Ang module na `providerHealthAutopilot.ts` ay isang **sistemang kusang nag-aayos** na:

1. Tinutukoy ang mga problema sa provider (bukas na circuit, mga cooldown, mga lockout, mga babala sa quota)
2. Bumubuo ng **mga inirerekomendang aksyon** upang malutas ang mga ito
3. Opsyonal na **awtomatikong isinasagawa** ang mga aksyong mababa ang panganib

### Mga Natutukoy na Uri ng Problema

| Uri ng problema              | Kalubhaan   | Halimbawang kondisyon                                 |
| ---------------------------- | ----------- | ----------------------------------------------------- |
| `provider_circuit_open`      | kritikal    | Bukas ang circuit breaker matapos ang 5 kabiguan      |
| `provider_circuit_half_open` | babala      | Sinusubukan ng circuit ang pagbawi                    |
| `connection_cooldown`        | babala      | Nasa cooldown ang koneksyon pagkatapos ng 429         |
| `stale_connection_error`     | babala      | Nabigo ang huling refresh 30+ minuto na ang nakalipas |
| `terminal_connection_error`  | kritikal    | Binawi ang OAuth, hindi wasto ang key                 |
| `inactive_connection`        | impormasyon | Naka-disable ang koneksyon sa mga setting             |
| `model_lockout`              | babala      | Naka-quarantine ang partikular na model               |
| `quota_monitor_warning`      | babala      | Nasa 80%+ ang paggamit ng quota                       |

### Mga Uri ng Aksyong Binubuo

| Aksyon                         | Panganib   | Paglalarawan                                   |
| ------------------------------ | ---------- | ---------------------------------------------- |
| `clear_provider_breaker`       | katamtaman | I-reset ang circuit breaker sa saradong estado |
| `clear_connection_cooldown`    | mababa     | Alisin ang cooldown sa isang koneksyon         |
| `clear_stale_connection_error` | mababa     | Alisin ang stale error flag                    |
| `clear_model_lockout`          | mababa     | Muling i-enable ang naka-quarantine na model   |
| `reactivate_connection`        | katamtaman | Muling i-enable ang na-deactivate na koneksyon |
| `deactivate_connection`        | mataas     | I-disable ang problematikong koneksyon         |

### API

> **Walang REST endpoint.** Makukuha ang mga problema ng autopilot sa pamamagitan ng MCP tool na `observability_snapshot` o ng dashboard. Tumatakbo ang autopilot sa loob ng system; kino-configure ang gawi nito sa pamamagitan ng settings DB (`autopilotMode` field para sa bawat koneksyon), hindi ng mga environment variable — walang ibinabalik na resulta ang `grep -rn` para sa autopilot-mode env var.

### Mode ng Autopilot

Gumagana ang autopilot sa **manual mode** bilang default — tinutukoy nito ang mga problema at bumubuo ng mga inirerekomendang aksyon, ngunit hindi awtomatikong inilalapat ang mga ito. Maaaring ilapat ang mga aksyon sa pamamagitan ng dashboard.

---

## Autopilot sa Kalagayan ng Combo

Ang `comboHealthAutopilot.ts` ay ang katumbas na **partikular sa combo** ng provider autopilot. Ito ay:

- Tinutukoy ang mga hindi maayos na combo
- Nagrerekomenda ng muling pagsasaayos ng pagkakasunod-sunod ng mga target
- Nagmumungkahing i-disable ang mga sirang target
- Awtomatikong nag-aalis ng mga dead target pagkatapos ng N kabiguan

### Mga Halimbawa ng Problema sa Combo

```
Combo "always-on" (priority strategy)
├─ Target 1: openai/gpt-5 (maayos)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ naka-lockout ang model hanggang 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (maayos)

Inirerekomendang aksyon: Muling ayusin — ilipat ang kiro sa itaas ng anthropic hanggang matapos ang lockout
```

---

## Mga Monitor ng Quota

Inilalantad ng `observability.ts` ang **mga monitor ng quota para sa bawat session** para sa mga subscription provider (Claude Code, Codex, GitHub Copilot):

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

### Mga Kahulugan ng Status

| Status      | Kailan                                 | Aksyon ng UI                                            |
| ----------- | -------------------------------------- | ------------------------------------------------------- |
| `starting`  | Isinasagawa ang paunang poll           | Spinner                                                 |
| `idle`      | Walang kamakailang aktibidad           | Nakatago sa dashboard                                   |
| `healthy`   | Mahigit 50% ang natitirang quota       | Berdeng tuldok                                          |
| `warning`   | Mas mababa sa 50% ang natitirang quota | Dilaw na alerto                                         |
| `exhausted` | Quota = 0%                             | Pulang block, iruta sa susunod na provider              |
| `error`     | Nabigo ang polling                     | Pulang tuldok, subukang muli sa lalong madaling panahon |

### API

> **Walang REST endpoint.** Makukuha ang data ng quota monitor sa pamamagitan ng MCP tool na `observability_snapshot` o ng dashboard.

---

## Snapshot ng Observability

Ibinabalik ng MCP tool na `observability_snapshot` ang isang **kumpletong snapshot ng system** para sa mga AI agent:

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
  "quotaMonitors": {/* tingnan sa itaas */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Ginagamit ito ng mga agent upang gumawa ng **mga desisyon sa pagruruta** — halimbawa, "kung bukas ang circuit ng openai, iruta muna sa anthropic".

---

## Pagsusuri sa Kalagayan ng Token

Kailangan ng mga OAuth provider (Claude Code, GitHub Copilot, Cursor) ang **pana-panahong pag-refresh ng token**. Nagpapatakbo ang `src/lib/tokenHealthCheck.ts` ng scheduler sa background:

- **Sweep tick**: bawat 60 segundo (sweep sa `TICK_MS = 60 * 1000` sa `src/lib/tokenHealthCheck.ts:30`)
- **Agwat ng pagsusuri sa kalagayan ng bawat koneksyon**: default na 60 minuto (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); maaaring i-configure sa pamamagitan ng settings DB
- **Paunang pag-refresh kapag may 401**: pinangangasiwaan ng interceptor ng bawat koneksyon

### Katayuan ng Kalagayan ng Token

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

### Configuration

Panloob na pinangangasiwaan ng `tokenHealthCheck.ts` ang configuration ng pagsusuri sa kalagayan ng token.

### Kalagayan ng Token

> **Walang REST endpoint.** Makukuha ang data ng kalagayan ng token sa pamamagitan ng dashboard o ng MCP tool na `observability_snapshot`.

---

## Pag-aalerto

### Mga Built-in na Channel

Sinusuportahan ng OmniRoute ang **3 channel ng alerto**:

| Channel             | Pag-setup           | Gamit                            |
| ------------------- | ------------------- | -------------------------------- |
| Banner ng dashboard | Palaging naka-on    | Mga notification sa loob ng app  |
| Webhook             | I-configure ang URL | Slack, Discord, PagerDuty        |
| Log                 | Default             | Para sa external log aggregation |

### Configuration ng Webhook

> **Tandaan:** Pinangangasiwaan ang configuration ng pag-aalerto sa webhook sa pamamagitan ng pahina ng Settings sa dashboard. Tingnan ang Settings UI para sa URL ng webhook, pag-filter ng event, at pag-customize ng payload.

### Mga Uri ng Alerto

| Alerto                       | Kailan                                         | Default na severity |
| ---------------------------- | ---------------------------------------------- | ------------------- |
| `provider_circuit_open`      | Nagbubukas ang circuit                         | critical            |
| `provider_circuit_half_open` | Sinusubukan ng circuit ang pagbawi             | info                |
| `quota_warning`              | Nasa 80%+ ang quota                            | warning             |
| `quota_exhausted`            | Nasa 100% ang quota                            | critical            |
| `token_refresh_failed`       | 3+ magkakasunod na pagkabigo sa pag-refresh    | warning             |
| `token_expired`              | Lumampas na ang token sa expiration            | critical            |
| `combo_target_unhealthy`     | Nasa cooldown ang combo target nang 1h+        | warning             |
| `db_integrity_warning`       | Higit sa 0 ang mga paglabag sa FK              | warning             |
| `heap_pressure`              | Higit sa 80% ng threshold ang paggamit ng heap | warning             |

---

## Mga Sukatan ng Performance

### Mga Sinusubaybayang Sukatan

| Sukatan                 | Uri       | Pinagmulan                      |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | counter   | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | counter   | `services/usage.ts`             |
| `cost_usd`              | counter   | `services/usage.ts`             |
| `provider_errors`       | counter   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | counter   | `services/resilience.ts`        |
| `cache_hits`            | counter   | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gauge     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gauge     | `observability.ts`              |

### Mga Percentile ng Latency (p50/p95/p99)

> **Walang REST endpoint.** Available ang data ng percentile ng latency sa page na `/dashboard/health` ng dashboard. Nakaplano ang pag-export sa Prometheus/OpenTelemetry para sa v3.9.

### Pag-export sa Prometheus / OpenTelemetry (Yugto 2)

Nakaplano para sa v3.9: native na pag-export sa Prometheus, OpenTelemetry, Datadog.

Sa ngayon, i-scrape ang `/api/monitoring/health` gamit ang anumang HTTP-based na monitoring system (Prometheus blackbox exporter, Datadog HTTP check, atbp.).

---

## Mga Resipe sa Pag-alerto

### Slack

> **Tandaan:** Kino-configure ang webhook alerting sa pamamagitan ng page na Settings sa dashboard — walang nakalaang webhook env vars (`grep -rn` ay walang ibinabalik na resulta). Tingnan ang Settings UI para sa webhook URL, pag-filter ng event, at pag-customize ng payload.

### Discord

> Ginagamit ng webhook alerting ang kaparehong daloy sa Settings UI na ginagamit ng Slack. Tinatanggap ng Discord ang parehong anyo ng JSON payload.

### PagerDuty

> Ginagamit ng webhook alerting ang kaparehong daloy sa Settings UI. Kino-configure ang mga routing key ng PagerDuty Events API v2 sa Settings UI.

### Custom na Webhook (JSON)

> Gagana ang anumang HTTP endpoint na tumatanggap ng POST na may JSON body. I-configure ang URL sa Settings UI.

---

## Configuration ng Dashboard

### I-customize ang Health Dashboard

Gumawa ng `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### I-pin ang isang Provider sa Itaas

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Pag-troubleshoot

### "Sinasabi ng provider na healthy ito pero pumapalya ang mga request"

1. Tingnan ang **mga isyu sa autopilot** — baka naka-lock out ang isang model
2. Tingnan ang **mga kamakailang error** para sa partikular na error class
3. Subukan ang **connection test** sa provider card
4. Tingnan kung **naka-rate-limit sa upstream** ang provider (hindi nakikita nang lokal)

### "Sinasabi ng quota na healthy ito pero nakakakita ako ng mga 429"

- Ang 429 ay nangangahulugang sinasabi ng provider na nagamit mo na ang iyong quota
- Maaaring **lipas na** ang pagsubaybay ng OmniRoute sa quota — ang impormasyon ng provider sa upstream ang dapat sundin
- Awtomatikong nire-refresh ang data ng quota sa pamamagitan ng internal quota monitor

### "Pumapalya ang combo pero mukhang healthy ang lahat ng target"

- Tingnan ang dashboard ng **combo health** para sa mga isyu sa pagkakasunod-sunod ng target
- Tingnan ang **mga fallback event** — baka napakabilis maubos ng combo ang mga opsyon nito
- Tiyaking tumutugma ang **strategy** sa iyong use case (priority kumpara sa round-robin kumpara sa auto)

### "Pumapalya ang database health check"

- Patakbuhin ang `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Kung "ok" — maling alarma ito; masyadong mahigpit ang health check
- Kung anupaman — **ihinto ang OmniRoute** at sundin ang [gabay sa disaster recovery](./DATABASE_GUIDE.md#disaster-recovery)

### "Kritikal ang pressure sa memory heap"

```bash
# Tingnan ang kasalukuyang heap
node -e "console.log(process.memoryUsage())"

# Manu-manong i-trigger ang GC (kung may --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Bawasan ang magkakasabay na request (itakda sa page na Settings ng dashboard, hindi sa isang env var)
# Walang `MAX_CONCURRENT_REQUESTS` env var — i-configure ito sa Settings → Concurrency.
```

---

## Tingnan Din

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — pagsubaybay sa paggamit at gastos
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schema at kalagayan ng DB
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — kalagayan ng proxy (hiwalay na cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arkitektura ng system
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — mga detalye ng circuit breaker
- Source: `src/lib/monitoring/` (4 na file, 2121 LOC)
