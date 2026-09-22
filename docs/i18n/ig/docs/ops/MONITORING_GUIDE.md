# Monitoring & Observability Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Nchịkọta dị mkpirikpi**: OmniRoute nwere nlekọta ahụike arụnyere n'ime ya, autopilot nke ndị na-enye ọrụ, nsuso oke ojiji, na hooks maka nlele usoro. Ntuziaka a na-akọwa dashboard, ọkwa ịdọ aka ná ntị, na idozi nsogbu.

**Isi mmalite:**

- `src/lib/monitoring/observability.ts` — snapshot nke nlele usoro
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot ahụike combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot nke onye na-enye ọrụ
- `src/lib/monitoring/providerHealthMatrix.ts` — matriks ahụike nke ndị na-enye ọrụ
- `src/lib/localHealthCheck.ts` — nyocha ahụike mpaghara
- `src/lib/tokenHealthCheck.ts` — ahụike mmegharị token
- `src/lib/proxyHealth.ts` — cache ahụike proxy (akọwara na PROXY_GUIDE.md)

---

## Nchịkọta

OmniRoute nwere **ọkwa nlekọta 3**:

```
┌──────────────────────────────────────────────────────────────┐
│  Ọkwa 1: Ahụike Sistemụ (ọkwa sava)                           │
│  ├─ localHealthCheck.ts — DB, ọdụ ụgbọ mmiri, native deps     │
│  ├─ db/healthCheck.ts — iguzosi ike, FK, artifacts na-enweghị njikọ │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Ọkwa 2: Ahụike Onye Na-enye Ọrụ (nkwụsi ike nke onye ọ bụla) │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — akara ahụike dịka onye na-enye ọrụ/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Ọkwa 3: Nlele Ozugbo (snapshots n'oge arụmọrụ)                │
│  ├─ observability.ts — circuit breakers, sessions, quota      │
│  ├─ tokenHealthCheck.ts — ahụike mmegharị OAuth token         │
│  └─ Ngwa MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Ibe Dashboard

### `/dashboard/health` (Ahụike Sistemụ)

Dashboard ahụike nke ọkwa kachasị elu na-egosi:

| Ngalaba                         | Ihe ọ na-egosi                                                   |
| ------------------------------- | ---------------------------------------------------------------- |
| **Ọnọdụ sava**                  | Oge ọ nọ n'ọrụ, ụdị, ọdụ ụgbọ mmiri, njikọ ndị na-arụ ọrụ        |
| **Ebe nchekwa data**            | Njikọ, iguzosi ike, nha WAL, migrations ndị na-adịbeghị anya     |
| **Nchịkọta ndị na-enye ọrụ**    | Ọnụọgụ ndị na-arụ ọrụ, ọnụọgụ ndị dị mma, ọnụọgụ breaker meghere |
| **Ndị nlekọta quota**           | Sessions ndị na-arụ ọrụ, ịdọ aka ná ntị, ndị gwụchara            |
| **Njehie ndị na-adịbeghị anya** | Njehie 10 ikpeazụ na stack traces ha                             |
| **Ojiji akụ sistemụ**           | Ebe nchekwa, CPU, akara nrụgide heap                             |

### `/dashboard/providers` (Ahụike Ndị Na-enye Ọrụ)

Dashboard nke onye na-enye ọrụ ọ bụla:

| Kọlụm            | Nkọwa                                                    |
| ---------------- | -------------------------------------------------------- |
| Onye na-enye ọrụ | ID onye na-enye ọrụ + aha ngosi                          |
| Ahụike           | Ọnọdụ akwụkwọ ndụ/edo/ọbara ọbara                        |
| Circuit          | Ọnọdụ mepere emepe/mechiri emechi/meghere ọkara          |
| Njikọ            | Ọnụọgụ njikọ, mmegharị ikpeazụ                           |
| Models           | Models ndị dị, ahụike nke model ọ bụla                   |
| Ọnụ ahịa         | Ọnụ ahịa taa, usoro ụbọchị 7                             |
| Njehie           | Ọnụọgụ njehie n'ime awa 24 gara aga, klas njehie kachasị |

Pịa onye na-enye ọrụ ka ịhụ:

- Arịrịọ ndị na-adịbeghị anya na nkọwa nkewa latency
- Akara ahụike nke njikọ ọ bụla
- Mkpọchi nke model ọ bụla
- Nkwado autopilot

### `/dashboard/quota` (Nsuso Quota)

Maka API key ọ bụla:

- Ojiji ugbu a ma e jiri ya tụnyere oke (progress bar)
- Usoro quota (chaatị ụbọchị 30)
- Oge nrụgharị ọzọ
- Akụkọ ọkwa ịdọ aka ná ntị

### `/dashboard/combos` (Ahụike Combo)

Maka combo ọ bụla:

- Atụmatụ + targets
- Ahụike nke target ọ bụla
- Ihe omume fallback ndị na-adịbeghị anya
- Ọnụọgụ ihe ịga nke ọma (awa 24, ụbọchị 7, ụbọchị 30)

---

## API Nlele Ahụike

OmniRoute na-ewepụta **ụzọ abụọ** HTTP maka nlele ahụike. A pụghị iji otu dochie ibe ya maka ndị nhazi ọrụ.

| Ụzọ                          | Ebumnuche                                                                    | Ibu                            | Jiri maka                                                             |
| ---------------------------- | ---------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------- |
| `GET /healthz`               | Ịdị ndụ/njikere okirikiri ndụ (`ok` / `starting` / `stopping`)               | Dị mfe (ọkọlọtọ ọnọdụ naanị)   | **Njikere** Kubernetes; **ịdị ndụ** dị nro ma ọ bụrụ na ị ga-eji HTTP |
| `GET /api/monitoring/health` | Nchịkọta miri emi nke sistemụ + onye na-eweta (DB, heap, ọnụọgụ katalọgụ, …) | Dị arọ (ọrụ DB / nlekota sync) | Dashboard, nlele miri emi blackbox, healthcheck arụnyere n'ime Docker |

> **Mara:** Matriks ahụike ndị na-eweta, nsogbu autopilot, ndị nlekota oke ojiji, ahụike token, na nkọwa latency gafere `/api/monitoring/health` dị site na **ngwa MCP** `observability_snapshot` ma ọ bụ ibe **dashboard** — enweghị ụzọ REST pụrụ iche maka ha.

Ụzọ abụọ ahụ na-arụ n'otu **Node event loop** ahụ nke na-ahazi arịrịọ. Ụzọ na-ejide CPU (ọrụ katalọgụ `GET /v1/models` buru ibu, mkpakọ long-context / ịgụta token) nwere ike igbu oge ndị na-ahụ maka HTTP **niile**, gụnyere `/healthz`. Event-loop ji ọrụ n'aka ≠ process anwụọla. Họrọ idozi ihe na-ejide akụrụngwa; ịhazigharị probe na-ebelata naanị igbu process n'ụzọ na-ezighi ezi.

### Probe dị mfe maka onye nhazi ọrụ

```bash
GET /healthz
# ma ọ bụ HEAD /healthz
```

- **200** + body `ok` mgbe ọnọdụ okirikiri ndụ server dị njikere
- **503** + `starting` / `stopping` n'oge mbido ma ọ bụ mmechi
- Mmejuputa: `src/app/healthz/route.ts` (enweghị ping DB)

### Ahụike Sistemụ (miri emi)

```bash
GET /api/monitoring/health
```

Nzaghachi:

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

#### `credentialHealth`: probe-cache megide SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` bụ **ihe nlele probe-cache dị na ebe nchekwa**, ọ bụghị mbipụta ozugbo nke `provider_connections.test_status`. Mgbe #12532 gasịrị, ụzọ arịrịọ ahụ na-agụ naanị `getCachedCredentialHealthSummary()`; probe ndabere na-eme ka cache dị ọhụrụ n'èzí event loop.

| Oyi akwa                | Ebe                                                                   | Ihe ọ pụtara                                                                                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ihe nlele probe-cache   | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Nsonaazụ probe ahụike credential ikpeazụ ka echekwara na ebe nchekwa process. `source` na-abụ `probe-cache` mgbe niile.                                                                                                                            |
| Nkọwa njikọ dara ada    | `credentialHealth.failedConnections`                                  | Ọ dị **naanị mgbe `failed > 0`**. Ndepụta nwere oke nke ahịrị cache nwere `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` e mere ka ọ ghara ịnwe ozi nzuzo). A na-ahazi `failedOmitted` mgbe e tinyere oke na ndepụta ahụ. |
| Ọnọdụ SQLite na-adịgide | `credentialHealth.staleDbNonOkCount`                                  | Ọnụọgụ ahịrị njikọ **na-arụ ọrụ** (`is_active=1`) nke `test_status` echekwara ha bụ non-ok a maara (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                                              |

Oyi akwa abụọ ahụ nwere ike ghara ikwekọ n'ebumnuche:

- Ihe nlele `failed=0` mgbe `staleDbNonOkCount>0` — SQLite ka nwere
  `test_status` na-adịgide (dịka ọmụmaatụ `expired` ma ọ bụ `credits_exhausted`) nke snapshot
  probe-cache kachasị ọhụrụ anaghị agụta dịka `status=error`.
- Ihe nlele `failed>0` mgbe SQLite yiri ka ọ dị mma — probe mere n'oge na-adịbeghị anya dara ma
  echekwara ya na cache; emelitebeghị ahịrị DB ahụ, ma ọ bụ e mechara kpochapụ ya.

Ezipụla alert dabere naanị na `provider_connections.test_status` mgbe ị na-anakọta data site na
endpoint a. Jiri `failed` + `failedConnections` maka ọdịda probe ozugbo, ma jiri
`staleDbNonOkCount` mgbe ịchọrọ ọnụọgụ sticky-status echekwara.

### Ndụmọdụ probe Kubernetes

OmniRoute bụ **otu Node process** (otu event loop). Docker `HEALTHCHECK` ndabara na-elekwasị anya na `/healthz` dị mfe. `/api/monitoring/health` **dị oke arọ** maka nkeji oge nlele ịdị ndụ nke kubelet.

| Nnwale                      | Ebumnuche akwadoro                                                                       | Nkọwa                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mmalite**                 | HTTP `GET /healthz` nwere `failureThreshold` dị ogologo (ma ọ bụ `startPeriod` buru ibu) | Mmalite oyi + mbugharị SQLite nwere ike ịgafe sekọnd ole na ole                                                                                                                                                                                                                                                                                                                                                                |
| **Njikere**                 | HTTP `GET /healthz`                                                                      | Ọnọdụ ndụ `ok` / `starting` / `stopping` (200 megide 503). Ọ ka nwere ike ịgbanwe ugboro ugboro ma ọ bụrụ na CPU na-egbochi loop ahụ. **200 nke na-ewe ọtụtụ sekọnd apụtaghị na ọ dị mma** (#10303) — ọ pụtara na event loop ahụ enweghị ohere tupu handler nke byte 3 amalite ịrụ ọrụ                                                                                                                                         |
| **Ịdị ndụ**                 | HTTP `GET /livez`, **ma ọ bụ TCP** na port isi ọrụ (`PORT`, ndabara `20128`)             | `/livez` na-egosi naanị na process ahụ ka na-arụ ọrụ (ọ na-enye 200 mgbe niile ma ọ bụrụ na handler ahụ arụ ọrụ). Ọ ka na-eji otu event loop ahụ — ịnọ n'ọrụ ≠ ịnwụ anwụ, ọ naghịkwa achọpụta enweghị ohere nke event loop (#10303) karịa ka TCP si eme. Họrọ **TCP** ma ọ bụrụ na HTTP probes na-agafe oge n'okpuru ibu catalog/compression; **egbula** pod ahụ n'ihi nkwụsị event loop dị mkpụmkpụ, n'agbanyeghị nke ị họọrọ |
| **Nnyocha ahụike miri emi** | `GET /api/monitoring/health` sitere na ihe nyocha mpụga                                  | Ọ bụghị maka kubelet `livenessProbe` / `readinessProbe` nwere oge siri ike                                                                                                                                                                                                                                                                                                                                                     |

Ọmụmaatụ nhazi (gbanwee thresholds ka ha kwekọọ na ibu mmalite oyi na compression gị):

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
  # N'okpuru nkwụsị event loop, HTTP /livez ka nwere ike ịgafe oge. TCP bụ
  # nhọrọ ọzọ dị nchebe:
  # tcpSocket:
  #   port: http
```

**Atụla** kubelet **liveness** aka na `/api/monitoring/health`. Path ahụ na-arụ ezigbo ọrụ DB/monitoring, ọ ga-enyekwa nsonaazụ ụgha n'okpuru ibu.

Ihe ndị metụtara ya: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (probes mgbe event loop nọ n'ọrụ), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (ọrụ ịnye ọnụahịa catalog na-ejide akụrụngwa), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (ọrụ ịgụ token compression na-ejide akụrụngwa).

### Ọrụ nhọrọ n'ụzọ request (memory, skills, mmegharị token)

Iwepụta memory, itinye skills, na mmegharị OAuth token na-eji otu **isi Node event loop** ahụ `/healthz` na-eji. Ha bụ atụmatụ dashboard a na-agbanye ma gbanyụọ (`memoryEnabled`, `skillsEnabled`), ọ bụghị worker pool. Lee [Environment — ọnụ ahịa event loop nke memory, skills, na mmegharị token](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Ahụike Provider

> **Enweghị REST endpoint.** A na-enweta data ahụike provider site na MCP tool `observability_snapshot` ma ọ bụ ibe dashboard `/dashboard/providers`.

### Nkọwa Provider

> **Enweghị REST endpoint.** A na-enweta nkọwa provider ọ bụla site na ibe dashboard `/dashboard/providers`.

---

## Autopilot Ahụike Provider

Modul `providerHealthAutopilot.ts` bụ **sistemụ na-agwọ onwe ya** nke:

1. Na-achọpụta nsogbu provider (circuit mepere emepe, cooldown, lockout, ịdọ aka ná ntị quota)
2. Na-emepụta **omume ndị a tụrụ aro** iji dozie ha
3. Ọ bụrụ na ahaziri ya otu ahụ, ọ na-**eme omume ndị ihe ize ndụ ha dị ala na-akpaghị aka**

### Ụdị Nsogbu A Na-achọpụta

| Ụdị nsogbu                   | Ogo ịdị njọ    | Ọnọdụ atụ                                  |
| ---------------------------- | -------------- | ------------------------------------------ |
| `provider_circuit_open`      | dị oke njọ     | Circuit breaker mepere mgbe ọdịda 5 gasịrị |
| `provider_circuit_half_open` | ịdọ aka ná ntị | Circuit na-anwale mgbake                   |
| `connection_cooldown`        | ịdọ aka ná ntị | Njikọ nọ na cooldown mgbe 429 gasịrị       |
| `stale_connection_error`     | ịdọ aka ná ntị | Refresh ikpeazụ dara nkeji 30+ gara aga    |
| `terminal_connection_error`  | dị oke njọ     | A kagbuola OAuth, key abaghị uru           |
| `inactive_connection`        | ozi            | Agbanyụrụ njikọ na settings                |
| `model_lockout`              | ịdọ aka ná ntị | Model a kapịrị ọnụ nọ na quarantine        |
| `quota_monitor_warning`      | ịdọ aka ná ntị | Ojiji quota eruola 80%+                    |

### Ụdị Omume A Na-emepụta

| Omume                          | Ihe ize ndụ | Nkọwa                                     |
| ------------------------------ | ----------- | ----------------------------------------- |
| `clear_provider_breaker`       | etiti       | Tọgharịa circuit breaker ka ọ mechie      |
| `clear_connection_cooldown`    | ala         | Wepụ cooldown na njikọ                    |
| `clear_stale_connection_error` | ala         | Hichapụ akara stale error                 |
| `clear_model_lockout`          | ala         | Mee ka model nọ na quarantine rụọ ọrụ ọzọ |
| `reactivate_connection`        | etiti       | Mee ka njikọ agbanyụrụ rụọ ọrụ ọzọ        |
| `deactivate_connection`        | elu         | Gbanyụọ njikọ nwere nsogbu                |

### API

> **Enweghị REST endpoint.** Enwere ike inweta nsogbu autopilot site na ngwa MCP `observability_snapshot` ma ọ bụ dashboard. Autopilot na-arụ ọrụ n'ime sistemụ; a na-ahazi omume ya site na settings DB (field `autopilotMode` nke njikọ ọ bụla), ọ bụghị site na environment variables — iji `grep -rn` chọọ env var nke autopilot mode agaghị ewepụta ihe ọ bụla.

### Ọnọdụ Autopilot

Autopilot na-arụ ọrụ na **manual mode** na ndabara — ọ na-achọpụta nsogbu ma na-emepụta omume ndị a tụrụ aro, mana ọ naghị etinye ha n'ọrụ na-akpaghị aka. Enwere ike itinye omume ndị ahụ n'ọrụ site na dashboard.

---

## Autopilot Ahụike Combo

`comboHealthAutopilot.ts` bụ ụdị autopilot provider nke e mere **kpọmkwem maka combo**. Ọ:

- Na-achọpụta combo ndị na-adịghị mma
- Na-atụ aro ka e degharịa usoro target
- Na-atụ aro ka agbanyụọ target ndị mebiri emebi
- Na-ewepụ target ndị nwụrụ anwụ na-akpaghị aka mgbe ha dara ugboro N

### Ihe Atụ nke Nsogbu Combo

```
Combo "always-on" (usoro priority)
├─ Target 1: openai/gpt-5 (dị mma)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model lockout ruo 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (dị mma)

Omume a tụrụ aro: Hazigharịa — bugoo kiro n'elu anthropic ruo mgbe lockout ga-agwụ
```

---

## Ndị Nlekota Quota

`observability.ts` na-enye **ndị nlekota quota maka session ọ bụla** maka subscription providers (Claude Code, Codex, GitHub Copilot):

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

### Ihe Status Pụtara

| Status      | Mgbe                                    | Omume UI                                  |
| ----------- | --------------------------------------- | ----------------------------------------- |
| `starting`  | Poll mbụ na-aga n'ihu                   | Spinner                                   |
| `idle`      | Enweghị ọrụ mere n'oge na-adịbeghị anya | Zoro ya na dashboard                      |
| `healthy`   | Quota fọdụrụ karịrị 50%                 | Ntụpọ ndụ ndụ                             |
| `warning`   | Quota fọdụrụ erughị 50%                 | Ịdọ aka ná ntị edo edo                    |
| `exhausted` | Quota = 0%                              | Mgbochi uhie, zigara provider na-esote    |
| `error`     | Polling dara                            | Ntụpọ uhie, nwaa ọzọ n'oge na-adịghị anya |

### API

> **Enweghị REST endpoint.** Enwere ike inweta data quota monitor site na ngwa MCP `observability_snapshot` ma ọ bụ dashboard.

---

## Nchịkọta Nleba Anya

Ngwaọrụ MCP `observability_snapshot` na-eweghachite **nchịkọta zuru ezu nke sistemụ** maka ndị nnọchiteanya AI:

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
  "quotaMonitors": {/* lee ihe dị n'elu */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Ndị nnọchiteanya na-eji nke a eme **mkpebi ntụgharị ụzọ** — dịka ọmụmaatụ, "ọ bụrụ na sekit openai mepere emepe, buru ụzọ zigara anthropic".

---

## Nnyocha Ọnọdụ Token

Ndị na-eweta OAuth (Claude Code, GitHub Copilot, Cursor) chọrọ **mmelite token kwa oge**. `src/lib/tokenHealthCheck.ts` na-arụ onye nhazi ọrụ n'azụ:

- **Oge nyocha okirikiri**: sekọnd 60 ọ bụla (nnyocha okirikiri dị na `TICK_MS = 60 * 1000` na `src/lib/tokenHealthCheck.ts:30`)
- **Ogologo oge n'etiti nyocha ọnọdụ njikọ ọ bụla**: ndabara bụ nkeji 60 (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); enwere ike ịhazi ya site na DB ntọala
- **Mmelite tupu oge eruo mgbe 401 mere**: interceptor nke njikọ ọ bụla na-ahụ maka nke a

### Ọnọdụ Token

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

### Nhazi

`tokenHealthCheck.ts` na-ahụ maka nhazi nyocha ọnọdụ token n'ime sistemụ.

### Ọnọdụ Token

> **Enweghị REST endpoint.** Data ọnọdụ token dị site na dashboard ma ọ bụ ngwaọrụ MCP `observability_snapshot`.

---

## Ịdọ Aka Ná Ntị

### Ọwa Ndị E Wuru N'ime Sistemụ

OmniRoute na-akwado **ọwa ịdọ aka ná ntị 3**:

| Ọwa              | Ntọlite               | Ihe eji ya eme            |
| ---------------- | --------------------- | ------------------------- |
| Banner dashboard | Na-arụ ọrụ mgbe niile | Ọkwa n'ime ngwa           |
| Webhook          | Hazie URL             | Slack, Discord, PagerDuty |
| Log              | Ndabara               | Maka mkpokọta log mpụga   |

### Nhazi Webhook

> **Rịba ama:** A na-ahazi ịdọ aka ná ntị webhook site na peeji Settings nke dashboard. Lee UI Settings maka URL webhook, nzacha mmemme, na nhazi payload.

### Ụdị Ịdọ Aka Ná Ntị

| Ịdọ aka ná ntị               | Mgbe                                        | Ogo ndabara    |
| ---------------------------- | ------------------------------------------- | -------------- |
| `provider_circuit_open`      | Mgbe sekit mepere emepe                     | dị oke njọ     |
| `provider_circuit_half_open` | Mgbe sekit na-anwale mgbake                 | ozi            |
| `quota_warning`              | Mgbe oke dị na 80%+                         | ịdọ aka ná ntị |
| `quota_exhausted`            | Mgbe oke ruru 100%                          | dị oke njọ     |
| `token_refresh_failed`       | Mgbe mmelite dara ugboro 3+ n'usoro         | ịdọ aka ná ntị |
| `token_expired`              | Mgbe token gafere oge njedebe ya            | dị oke njọ     |
| `combo_target_unhealthy`     | Mgbe ebumnuche combo nọ na cooldown ruo 1h+ | ịdọ aka ná ntị |
| `db_integrity_warning`       | Mgbe mmebi FK > 0                           | ịdọ aka ná ntị |
| `heap_pressure`              | Mgbe ojiji heap > 80% nke oke               | ịdọ aka ná ntị |

---

## Metrik Arụmọrụ

### Metrik A Na-enyocha

| Metrik                  | Ụdị       | Ebe O Si Pụta                   |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | ngụkọta   | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | ngụkọta   | `services/usage.ts`             |
| `cost_usd`              | ngụkọta   | `services/usage.ts`             |
| `provider_errors`       | ngụkọta   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ngụkọta   | `services/resilience.ts`        |
| `cache_hits`            | ngụkọta   | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gauge     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gauge     | `observability.ts`              |

### Pasentail Oge Ọ Na-ewe (p50/p95/p99)

> **Enweghị endpoint REST.** Data pasentail oge ọ na-ewe dị site na peeji dashboard `/dashboard/health`. A na-eme atụmatụ mbupụ Prometheus/OpenTelemetry maka v3.9.

### Mbupụ Prometheus / OpenTelemetry (Nkeji nke Abụọ)

E mere atụmatụ maka v3.9: mbupụ ozugbo gaa Prometheus, OpenTelemetry, Datadog.

Ka ọ dị ugbu a, jiri sistemụ nlekota ọ bụla dabere na HTTP (Prometheus blackbox exporter, Datadog HTTP check, wdg.) see data na `/api/monitoring/health`.

---

## Usoro Ịtọ Mkpu

### Slack

> **Rịba ama:** A na-ahazi mkpu webhook site na peeji Settings nke dashboard — enweghị env vars webhook pụrụ iche (`grep -rn` anaghị eweghachi ihe ọ bụla). Lee UI Settings maka URL webhook, nzacha event, na nhazi payload.

### Discord

> Mkpu webhook na-eji otu usoro UI Settings ahụ Slack na-eji. Discord na-anabata otu nhazi payload JSON ahụ.

### PagerDuty

> Mkpu webhook na-eji otu usoro UI Settings ahụ. A na-ahazi routing keys nke PagerDuty Events API v2 n'ime UI Settings.

### Webhook Ahaziri Ahazi (JSON)

> Endpoint HTTP ọ bụla nke na-anabata POST nwere body JSON ga-arụ ọrụ. Hazie URL ahụ n'ime UI Settings.

---

## Nhazi Dashboard

### Hazie Dashboard Ahụike

Mepụta `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Tụgide Provider n'Elu

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Nchọpụta na Ndozi Nsogbu

### "Provider na-ekwu na ọ dị mma mana request anaghị aga nke ọma"

1. Lelee **nsogbu autopilot** — ikekwe akpọchiela otu model
2. Lelee **error ndị mere n'oge na-adịbeghị anya** maka klas error ahụ kpọmkwem
3. Nwaa **ule njikọ** dị na kaadị provider
4. Lelee ma provider ahụ nwere **mmachi rate n'akụkụ upstream** (anaghị ahụ nke a n'ebe a)

### "Quota na-ekwu na ọ dị mma mana ana m ahụ 429s"

- 429 pụtara na provider na-ekwu na i jirila quota gị niile
- Nsochi quota nke OmniRoute nwere ike ịbụ **ihe ochie** — eziokwu nke provider dị na upstream
- A na-eme ka data quota dị ọhụrụ na-akpaghị aka site na quota monitor dị n'ime sistemụ

### "Combo anaghị arụ ọrụ mana target niile yiri ka ha dị mma"

- Lelee dashboard **ahụike combo** maka nsogbu n'usoro target
- Lelee **event fallback** — ikekwe combo ahụ na-agwụ nhọrọ ngwa ngwa karịa ka o kwesịrị
- Nyochaa na **strategy** ahụ dabara n'ojiji gị (priority megide round-robin megide auto)

### "Nnyocha ahụike database anaghị aga nke ọma"

- Gbaa `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Ọ bụrụ na ọ bụ "ok" — ọ bụ mkpu ụgha, nnyocha ahụike ahụ siri ike karịa ka o kwesịrị
- Ọ bụrụ na ọ bụ ihe ọ bụla ọzọ — **kwụsị OmniRoute** ma soro [ntuziaka mgbake mgbe ọdachi gasịrị](./DATABASE_GUIDE.md#disaster-recovery)

### "Nrụgide memory heap dị n'ogo dị oke egwu"

```bash
# Lelee heap dị ugbu a
node -e "console.log(process.memoryUsage())"

# Kpalite GC n'aka (ọ bụrụ na e ji --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Belata request ndị na-aga n'otu oge (tọ ya site na peeji Settings nke dashboard, ọ bụghị env var)
# Enweghị env var `MAX_CONCURRENT_REQUESTS` — hazie ya na Settings → Concurrency.
```

---

## Hụkwa

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — nsuso ojiji & mmefu
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — nhazi DB + ọnọdụ arụmọrụ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ọnọdụ arụmọrụ proxy (cache dị iche)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ụkpụrụ nhazi sistemụ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — nkọwa circuit breaker
- Isi mmalite: `src/lib/monitoring/` (faịlụ 4, ahịrị koodu 2121)
