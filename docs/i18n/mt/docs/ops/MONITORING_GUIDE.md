# Monitoring & Observability Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Fil-qosor**: OmniRoute jiġi b’monitoraġġ tas-saħħa integrat, pilota awtomatiku għall-fornituri, traċċar tal-kwoti, u punti ta’ integrazzjoni għall-osservabbiltà. Din il-gwida tkopri l-pannell, it-twissijiet, u s-soluzzjoni tal-problemi.

**Sorsi:**

- `src/lib/monitoring/observability.ts` — stampa tal-osservabbiltà
- `src/lib/monitoring/comboHealthAutopilot.ts` — pilota awtomatiku għas-saħħa tal-combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — pilota awtomatiku għall-fornitur
- `src/lib/monitoring/providerHealthMatrix.ts` — matriċi tas-saħħa tal-fornituri
- `src/lib/localHealthCheck.ts` — kontroll lokali tas-saħħa
- `src/lib/tokenHealthCheck.ts` — saħħa tat-tiġdid tat-token
- `src/lib/proxyHealth.ts` — cache tas-saħħa tal-proxy (koperta fi PROXY_GUIDE.md)

---

## Ħarsa ġenerali

OmniRoute għandu **3 saffi ta’ monitoraġġ**:

```
┌──────────────────────────────────────────────────────────────┐
│  Saff 1: Saħħa tas-Sistema (fil-livell tas-server)            │
│  ├─ localHealthCheck.ts — DB, ports, dipendenzi nattivi       │
│  ├─ db/healthCheck.ts — integrità, FK, artefatti orfni        │
│  └─ Pannell: /dashboard/health                                │
├──────────────────────────────────────────────────────────────┤
│  Saff 2: Saħħa tal-Fornitur (reżiljenza għal kull fornitur)   │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — punteġġi skont fornitur/mudell  │
│  └─ Pannell: /dashboard/providers                             │
├──────────────────────────────────────────────────────────────┤
│  Saff 3: Osservabbiltà Diretta (stampi waqt l-eżekuzzjoni)    │
│  ├─ observability.ts — circuit breakers, sessjonijiet, kwota  │
│  ├─ tokenHealthCheck.ts — saħħa tat-tiġdid tat-token OAuth    │
│  └─ Għodod MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Paġni tal-Pannell

### `/dashboard/health` (Saħħa tas-Sistema)

Il-pannell ewlieni tas-saħħa juri:

| Taqsima                    | X’juri                                                        |
| -------------------------- | ------------------------------------------------------------- |
| **Status tas-server**      | Ħin ta’ tħaddim, verżjoni, port, konnessjonijiet attivi       |
| **Bażi tad-data**          | Konnessjoni, integrità, daqs tal-WAL, migrazzjonijiet reċenti |
| **Sommarju tal-fornituri** | Għadd attiv, għadd f’saħħtu, għadd ta’ breakers miftuħa       |
| **Monitors tal-kwota**     | Sessjonijiet attivi, twissijiet, kwota eżawrita               |
| **Żbalji reċenti**         | L-aħħar 10 żbalji bi traċċi tal-munzell                       |
| **Użu tar-riżorsi**        | Memorja, CPU, indikatur tal-pressjoni tal-heap                |

### `/dashboard/providers` (Saħħa tal-Fornituri)

Pannell għal kull fornitur:

| Kolonna         | Deskrizzjoni                                                         |
| --------------- | -------------------------------------------------------------------- |
| Fornitur        | ID tal-fornitur + isem muri                                          |
| Saħħa           | Status aħdar/isfar/aħmar                                             |
| Circuit         | Stat miftuħ/magħluq/nofs miftuħ                                      |
| Konnessjonijiet | Għadd ta’ konnessjonijiet, l-aħħar tiġdid                            |
| Mudelli         | Mudelli disponibbli, saħħa għal kull mudell                          |
| Spiża           | L-ispiża tal-lum, xejra ta’ 7 ijiem                                  |
| Żbalji          | Għadd ta’ żbalji fl-aħħar 24 siegħa, l-aktar klassi ta’ żball komuni |

Ikklikkja fuq fornitur biex tara:

- Talbiet reċenti b’analiżi dettaljata tal-latenza
- Punteġġi tas-saħħa għal kull konnessjoni
- Imblukkar għal kull mudell
- Rakkomandazzjonijiet tal-pilota awtomatiku

### `/dashboard/quota` (Traċċar tal-Kwota)

Għal kull API key:

- Użu attwali mqabbel mal-limitu (strixxa tal-progress)
- Xejra tal-kwota (grafika ta’ 30 jum)
- Ħin tar-reset li jmiss
- Storja tat-twissijiet

### `/dashboard/combos` (Saħħa tal-Combo)

Għal kull combo:

- Strateġija + miri
- Saħħa għal kull mira
- Avvenimenti reċenti ta’ fallback
- Rata ta’ suċċess (24 siegħa, 7 ijiem, 30 jum)

---

## API tal-Kontroll tas-Saħħa

OmniRoute jesponi **żewġ** endpoints HTTP tas-saħħa. Dawn ma jistgħux jintużaw minflok xulxin mill-orkestraturi.

| Mogħdija                     | Għan                                                                      | Piż                                          | Uża għal                                                                            |
| ---------------------------- | ------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /healthz`               | Vitalità/prontezza taċ-ċiklu tal-ħajja (`ok` / `starting` / `stopping`)   | Trivjali (il-bandiera tal-fażi biss)         | **readiness** ta’ Kubernetes; **liveness** mhux stretta jekk bilfors trid tuża HTTP |
| `GET /api/monitoring/health` | Sommarju profond tas-sistema + fornituri (DB, heap, għadd tal-katalgu, …) | Tqil (xogħol sinkroniku tad-DB / monitoraġġ) | Dashboards, kontrolli profondi blackbox, il-healthcheck integrat ta’ Docker         |

> **Nota:** Il-matriċi tas-saħħa tal-fornituri, il-problemi tal-autopilot, il-monitors tal-kwoti, is-saħħa tat-tokens, u d-dettalji tal-latenza lil hinn minn `/api/monitoring/health` huma disponibbli permezz tal-**għodda MCP** `observability_snapshot` jew il-paġni tad-**dashboard** — ma hemmx rotot REST dedikati għalihom.

Iż-żewġ rotot jaħdmu fuq l-**istess event loop ta’ Node** bħall-ipproċessar tat-talbiet. Mogħdija li tuża s-CPU b’mod intensiv (xogħol fuq katalgu kbir ta’ `GET /v1/models`, kompressjoni ta’ kuntest twil / għadd ta’ tokens) tista’ ddewwem **il-handlers HTTP kollha**, inkluż `/healthz`. Event loop okkupat ≠ proċess mejjet. Huwa preferibbli li tirranġa dak li qed jikkonsma r-riżorsi; l-irfinar tal-probe jnaqqas biss l-għeluq falz.

### Probe ħafif għall-orkestratur

```bash
GET /healthz
# jew HEAD /healthz
```

- **200** + il-body `ok` meta l-fażi taċ-ċiklu tal-ħajja tas-server tkun lesta
- **503** + `starting` / `stopping` waqt l-istartjar jew l-għeluq
- Implimentazzjoni: `src/app/healthz/route.ts` (mingħajr ping lid-DB)

### Saħħa tas-Sistema (profonda)

```bash
GET /api/monitoring/health
```

Rispons:

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

#### `credentialHealth`: cache tal-probe kontra `test_status` ta’ SQLite

`GET /api/monitoring/health` → `credentialHealth` huwa l-**gauge tal-cache tal-probe fil-memorja**,
mhux dump dirett ta’ `provider_connections.test_status`. Wara #12532, il-mogħdija
tat-talba taqra `getCachedCredentialHealthSummary()` biss; probes fl-isfond
jaġġornaw il-cache barra mill-event loop.

| Saff                             | Fejn                                                                  | Xi jfisser                                                                                                                                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gauge tal-cache tal-probe        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | L-aħħar riżultati tal-probe tas-saħħa tal-kredenzjali li għadhom miżmuma fil-memorja tal-proċess. `source` huwa dejjem `probe-cache`.                                                                                             |
| Dettalji ta’ konnessjoni falluta | `credentialHealth.failedConnections`                                  | Preżenti **biss meta `failed > 0`**. Lista limitata ta’ ringieli tal-cache b’`status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` sanitizzati). `failedOmitted` jiġi ssettjat meta l-lista tkun ġiet limitata. |
| Status persistenti ta’ SQLite    | `credentialHealth.staleDbNonOkCount`                                  | Għadd ta’ ringieli ta’ konnessjonijiet **attivi** (`is_active=1`) li l-`test_status` persistit tagħhom huwa valur magħruf mhux ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).              |

Iż-żewġ saffi jistgħu ma jaqblux apposta:

- Gauge `failed=0` waqt li `staleDbNonOkCount>0` — SQLite għad għandu
  `test_status` persistenti (pereżempju `expired` jew `credits_exhausted`) li
  l-aħħar snapshot tal-cache tal-probe ma jgħoddx bħala `status=error`.
- Gauge `failed>0` waqt li SQLite jidher f’saħħtu — probe riċenti falla u
  jinsab fil-cache; ir-ringiela tad-DB ma ġietx aġġornata, jew tneħħiet aktar tard.

Toħloqx twissija abbażi ta’ `provider_connections.test_status` biss meta tkun qed
tiġbor data minn dan l-endpoint. Uża `failed` + `failedConnections` għal fallimenti
attwali tal-probes, u `staleDbNonOkCount` meta jkollok bżonn l-għadd persistit
tal-istatus persistenti.

### Rakkomandazzjonijiet għall-probes ta’ Kubernetes

OmniRoute huwa **proċess Node wieħed** (event loop wieħed). Id-Docker `HEALTHCHECK` standard jimmira lejn `/healthz`, li huwa ħafif. `/api/monitoring/health` huwa **tqil wisq** għall-intervalli tal-liveness ta’ kubelet.

| Sonda              | Mira rakkomandata                                                                                 | Noti                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bidu**           | HTTP `GET /healthz` b’`failureThreshold` twil (jew `startPeriod` kbir)                            | Bidu kiesaħ + migrazzjoni ta’ SQLite jistgħu jieħdu aktar minn ftit sekondi                                                                                                                                                                                                                                                                                                     |
| **Prontezza**      | HTTP `GET /healthz`                                                                               | Iċ-ċiklu tal-ħajja `ok` / `starting` / `stopping` (200 kontra 503). Xorta jvarja jekk il-loop ikun imblukkat mis-CPU. **200 wara diversi sekondi mhuwiex stat tajjeb** (#10303) — ifisser li l-event loop kien imċaħħad mir-riżorsi qabel ma tħaddem il-handler ta’ 3 bytes                                                                                                     |
| **Vitalità**       | HTTP `GET /livez`, **jew TCP** fuq il-port tas-servizz ewlieni (`PORT`, valur predefinit `20128`) | `/livez` jindika biss li l-proċess għadu ħaj (dejjem 200 jekk il-handler jitħaddem). Xorta jaqsam l-event loop — okkupat ≠ mejjet, u ma jindividwax iċ-ċaħda tar-riżorsi tal-event loop (#10303) aħjar minn TCP. Ippreferi **TCP** jekk is-sondi HTTP jiskadu waqt tagħbija tal-katalgu/kompressjoni; **toqtolx** il-pod minħabba waqfiet qosra tal-event loop fi kwalunkwe każ |
| **Saħħa profonda** | `GET /api/monitoring/health` minn kontrollur estern                                               | Mhux għal `livenessProbe` tal-kubelet / `readinessProbe` bi frekwenza għolja                                                                                                                                                                                                                                                                                                    |

Eżempju tal-istruttura (aġġusta l-limiti skont it-tagħbija tal-bidu kiesaħ u tal-kompressjoni tiegħek):

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
  # Meta l-event loop jieqaf, HTTP /livez xorta jista’ jiskadi. TCP huwa
  # l-alternattiva konservattiva:
  # tcpSocket:
  #   port: http
```

**Tippuntax** il-**liveness** tal-kubelet lejn `/api/monitoring/health`. Dik il-mogħdija twettaq xogħol reali tad-DB/monitoraġġ u tagħti pożittivi foloz taħt tagħbija.

Relatat: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sondi waqt li l-event loop ikun okkupat), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (il-prezzijiet tal-katalgu jaħtfu r-riżorsi), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (l-għadd tat-tokens tal-kompressjoni jaħtaf ir-riżorsi).

### Xogħol fakultattiv fil-mogħdija tat-talba (memorja, ħiliet, tiġdid tat-token)

L-estrazzjoni tal-memorja, l-injezzjoni tal-ħiliet, u t-tiġdid tat-token OAuth jaqsmu l-**event loop ewlieni ta’ Node** ma’ `/healthz`. Dawn huma funzjonalitajiet li jistgħu jinxtegħlu jew jintfew mid-dashboard (`memoryEnabled`, `skillsEnabled`), mhux pool ta’ workers. Ara [Ambjent — spiża tal-event loop](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Saħħa tal-Fornitur

> **L-ebda endpoint REST.** Id-data dwar is-saħħa tal-fornituri hija disponibbli permezz tal-għodda MCP `observability_snapshot` jew il-paġna `/dashboard/providers` tad-dashboard.

### Dettalji tal-Fornitur

> **L-ebda endpoint REST.** Id-dettalji għal kull fornitur huma disponibbli permezz tal-paġna `/dashboard/providers` tad-dashboard.

---

## Awtopilota tas-Saħħa tal-Fornituri

Il-modulu `providerHealthAutopilot.ts` huwa **sistema li ssewwi lilha nnifisha** li:

1. Tidentifika problemi tal-fornituri (ċirkwit miftuħ, perjodi ta’ stennija, imblukkar, twissijiet dwar il-kwota)
2. Tiġġenera **azzjonijiet rakkomandati** biex issolvihom
3. B’mod fakultattiv **teżegwixxi awtomatikament** azzjonijiet b’riskju baxx

### Tipi ta’ Problemi Identifikati

| Tip ta’ problema             | Severità | Eżempju ta’ kundizzjoni                     |
| ---------------------------- | -------- | ------------------------------------------- |
| `provider_circuit_open`      | kritika  | Circuit breaker miftuħ wara 5 fallimenti    |
| `provider_circuit_half_open` | twissija | Iċ-ċirkwit qed jittestja l-irkupru          |
| `connection_cooldown`        | twissija | Konnessjoni f’perjodu ta’ stennija wara 429 |
| `stale_connection_error`     | twissija | L-aħħar aġġornament falla 30+ minuta ilu    |
| `terminal_connection_error`  | kritika  | OAuth revokat, ċavetta invalida             |
| `inactive_connection`        | tagħrif  | Konnessjoni diżattivata fis-settings        |
| `model_lockout`              | twissija | Mudell speċifiku fi kwarantina              |
| `quota_monitor_warning`      | twissija | Użu tal-kwota ta’ 80%+                      |

### Tipi ta’ Azzjonijiet Iġġenerati

| Azzjoni                        | Riskju | Deskrizzjoni                                  |
| ------------------------------ | ------ | --------------------------------------------- |
| `clear_provider_breaker`       | medju  | Irrisettja ċ-circuit breaker għal magħluq     |
| `clear_connection_cooldown`    | baxx   | Neħħi l-perjodu ta’ stennija minn konnessjoni |
| `clear_stale_connection_error` | baxx   | Neħħi l-indikatur ta’ żball skadut            |
| `clear_model_lockout`          | baxx   | Erġa’ attiva mudell fi kwarantina             |
| `reactivate_connection`        | medju  | Erġa’ attiva konnessjoni diżattivata          |
| `deactivate_connection`        | għoli  | Iddiżattiva konnessjoni problematika          |

### API

> **M’hemm l-ebda endpoint REST.** Il-problemi tal-awtopilota huma disponibbli permezz tal-għodda MCP `observability_snapshot` jew tad-dashboard. L-awtopilota jaħdem internament; l-imġiba tiegħu tiġi kkonfigurata permezz tad-DB tas-settings (il-field `autopilotMode` għal kull konnessjoni), mhux permezz ta’ varjabbli tal-ambjent — `grep -rn` għal varjabbli tal-ambjent tal-modalità tal-awtopilota ma jsib xejn.

### Modalità tal-Awtopilota

B’mod awtomatiku, l-awtopilota jaħdem fil-**modalità manwali** — jidentifika l-problemi u jiġġenera azzjonijiet rakkomandati, iżda ma japplikahomx awtomatikament. L-azzjonijiet jistgħu jiġu applikati permezz tad-dashboard.

---

## Awtopilota tas-Saħħa tal-Combo

`comboHealthAutopilot.ts` huwa l-ekwivalenti **speċifiku għall-combo** tal-awtopilota tal-fornituri. Huwa:

- Jidentifika combos mhux f’saħħithom
- Jirrakkomanda li l-miri jerġgħu jiġu ordnati
- Jissuġġerixxi li jiġu diżattivati miri bil-ħsara
- Ineħħi awtomatikament miri mejta wara N fallimenti

### Eżempji ta’ Problemi tal-Combo

```
Combo "always-on" (strateġija ta’ prijorità)
├─ Mira 1: openai/gpt-5 (f’saħħitha)
├─ Mira 2: anthropic/claude-opus-4-6 (⚠️ mudell imblukkat sal-14:00)
└─ Mira 3: kiro/claude-sonnet-4-5 (f’saħħitha)

Azzjoni rakkomandata: Ordna mill-ġdid — mexxi lil kiro ’l fuq minn anthropic sakemm jiskadi l-imblukkar
```

---

## Monitors tal-Kwota

`observability.ts` jesponi **monitors tal-kwota għal kull sessjoni** għall-fornituri b’abbonament (Claude Code, Codex, GitHub Copilot):

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

### Tifsiriet tal-Istatus

| Status      | Meta                           | Azzjoni tal-UI                                  |
| ----------- | ------------------------------ | ----------------------------------------------- |
| `starting`  | L-ewwel stħarriġ għaddej       | Indikatur tat-tagħbija                          |
| `idle`      | Ebda attività reċenti          | Moħbi mid-dashboard                             |
| `healthy`   | Fadal aktar minn 50% tal-kwota | Tikka ħadra                                     |
| `warning`   | Fadal inqas minn 50% tal-kwota | Twissija safra                                  |
| `exhausted` | Kwota = 0%                     | Blokka ħamra, irrotta lejn il-fornitur li jmiss |
| `error`     | L-istħarriġ falla              | Tikka ħamra, erġa’ pprova dalwaqt               |

### API

> **M’hemm l-ebda endpoint REST.** Id-data tal-monitor tal-kwota hija disponibbli permezz tal-għodda MCP `observability_snapshot` jew tad-dashboard.

---

## Stampa tal-Osservabbiltà

L-għodda MCP `observability_snapshot` tirritorna **stampa sħiħa tas-sistema** għall-aġenti tal-AI:

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
  "quotaMonitors": {/* ara hawn fuq */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

L-aġenti jużaw dan biex jieħdu **deċiżjonijiet dwar ir-routing** — pereżempju, "jekk iċ-ċirkwit ta' openai huwa miftuħ, ibgħat it-traffiku l-ewwel lejn anthropic".

---

## Kontroll tas-Saħħa tat-Token

Il-fornituri OAuth (Claude Code, GitHub Copilot, Cursor) jeħtieġu **aġġornament perjodiku tat-token**. `src/lib/tokenHealthCheck.ts` iħaddem skedatur fl-isfond:

- **Ċiklu ta' kontroll**: kull 60 sekonda (il-kontroll f'`TICK_MS = 60 * 1000` f'`src/lib/tokenHealthCheck.ts:30`)
- **Intervall tal-kontroll tas-saħħa għal kull konnessjoni**: il-valur predefinit huwa 60 minuta (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); jista' jiġi kkonfigurat permezz tad-DB tas-settings
- **Aġġornament preventiv meta jseħħ 401**: jiġi ġestit mill-interċettur għal kull konnessjoni

### Status tas-Saħħa tat-Token

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

### Konfigurazzjoni

Il-konfigurazzjoni tal-kontroll tas-saħħa tat-token tiġi ġestita internament minn `tokenHealthCheck.ts`.

### Saħħa tat-Token

> **M'hemm l-ebda endpoint REST.** Id-data dwar is-saħħa tat-token hija disponibbli permezz tad-dashboard jew tal-għodda MCP `observability_snapshot`.

---

## Twissijiet

### Kanali Integrati

OmniRoute jappoġġja **3 kanali ta' twissija**:

| Kanal                | Konfigurazzjoni   | Każ ta' użu                          |
| -------------------- | ----------------- | ------------------------------------ |
| Banner tad-dashboard | Dejjem attiv      | Notifiki fl-applikazzjoni            |
| Webhook              | Ikkonfigura l-URL | Slack, Discord, PagerDuty            |
| Log                  | Predefinit        | Għall-aggregazzjoni esterna tal-logs |

### Konfigurazzjoni tal-Webhook

> **Nota:** Il-konfigurazzjoni tat-twissijiet permezz tal-webhook tiġi ġestita mill-paġna Settings tad-dashboard. Ara l-UI ta' Settings għall-URL tal-webhook, l-iffiltrar tal-avvenimenti, u l-personalizzazzjoni tal-payload.

### Tipi ta' Twissijiet

| Twissija                     | Meta                                       | Severità predefinita |
| ---------------------------- | ------------------------------------------ | -------------------- |
| `provider_circuit_open`      | Iċ-ċirkwit jinfetaħ                        | kritika              |
| `provider_circuit_half_open` | Iċ-ċirkwit ikun qed jittestja l-irkupru    | informazzjoni        |
| `quota_warning`              | Il-kwota tkun 80%+                         | twissija             |
| `quota_exhausted`            | Il-kwota tkun 100%                         | kritika              |
| `token_refresh_failed`       | 3+ fallimenti konsekuttivi fl-aġġornament  | twissija             |
| `token_expired`              | It-token ikun skada                        | kritika              |
| `combo_target_unhealthy`     | Il-mira tal-combo tkun f'cooldown għal 1h+ | twissija             |
| `db_integrity_warning`       | Ksur tal-FK > 0                            | twissija             |
| `heap_pressure`              | L-użu tal-heap > 80% tal-limitu            | twissija             |

---

## Metriċi tal-Prestazzjoni

### Metriċi Traċċati

| Metrika                 | Tip       | Sors                            |
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

### Perċentili tal-Latenza (p50/p95/p99)

> **L-ebda endpoint REST.** Id-data tal-perċentili tal-latenza hija disponibbli permezz tal-paġna `/dashboard/health` tad-dashboard. L-esportazzjoni għal Prometheus/OpenTelemetry hija ppjanata għal v3.9.

### Esportazzjoni għal Prometheus / OpenTelemetry (Fażi 2)

Ippjanata għal v3.9: esportazzjoni nattiva għal Prometheus, OpenTelemetry, Datadog.

Għalissa, iġbor id-data minn `/api/monitoring/health` bi kwalunkwe sistema ta’ monitoraġġ ibbażata fuq HTTP (Prometheus blackbox exporter, Datadog HTTP check, eċċ.).

---

## Riċetti għat-Twissijiet

### Slack

> **Nota:** It-twissijiet permezz ta’ webhook jiġu kkonfigurati mill-paġna Settings tad-dashboard — ma hemm l-ebda varjabbli tal-ambjent iddedikata għall-webhooks (`grep -rn` jirritorna żero riżultati). Ara l-UI ta’ Settings għall-URL tal-webhook, l-iffiltrar tal-avvenimenti, u l-personalizzazzjoni tal-payload.

### Discord

> It-twissijiet permezz ta’ webhook jużaw l-istess fluss tal-UI ta’ Settings bħal Slack. Discord jaċċetta l-istess struttura tal-payload JSON.

### PagerDuty

> It-twissijiet permezz ta’ webhook jużaw l-istess fluss tal-UI ta’ Settings. Iċ-ċwievet tar-routing tal-PagerDuty Events API v2 jiġu kkonfigurati fl-UI ta’ Settings.

### Webhook Personalizzat (JSON)

> Kwalunkwe endpoint HTTP li jaċċetta POST b’korp JSON jaħdem. Ikkonfigura l-URL fl-UI ta’ Settings.

---

## Konfigurazzjoni tad-Dashboard

### Ippersonalizza d-Dashboard tas-Saħħa

Oħloq `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Waħħal Fornitur Fin-naħa ta’ Fuq

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Soluzzjoni tal-Problemi

### "Il-fornitur jgħid li huwa f’saħħtu iżda t-talbiet ifallu"

1. Iċċekkja l-**kwistjonijiet tal-autopilot** — jista’ jkun li mudell huwa mblukkat
2. Ara l-**iżbalji reċenti** għall-klassi speċifika tal-iżball
3. Ipprova t-**test tal-konnessjoni** fil-kard tal-fornitur
4. Iċċekkja jekk il-fornitur huwiex **soġġett għal limitazzjoni tar-rata upstream** (mhux viżibbli lokalment)

### "Il-kwota tidher f’saħħitha iżda qed nara 429s"

- 429 ifisser li l-fornitur qed jgħid li użajt il-kwota tiegħek
- It-traċċar tal-kwota ta’ OmniRoute jista’ jkun **skadut** — il-verità tal-fornitur tinsab upstream
- Id-data tal-kwota tiġi aġġornata awtomatikament permezz tal-moniter intern tal-kwota

### "Il-combo qed ifalli iżda l-miri kollha jidhru f’saħħithom"

- Iċċekkja d-dashboard tas-**saħħa tal-combo** għal problemi fl-ordni tal-miri
- Ara l-**avvenimenti ta’ fallback** — jista’ jkun li l-combo qed teżawrixxi l-għażliet malajr wisq
- Ivverifika li l-**istrateġija** taqbel mal-każ tal-użu tiegħek (prijorità vs round-robin vs awtomatika)

### "Il-verifika tas-saħħa tad-database qed tfalli"

- Ħaddem `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jekk tirritorna "ok" — huwa allarm falz, il-verifika tas-saħħa qed tkun stretta wisq
- Jekk tirritorna xi ħaġa oħra — **waqqaf OmniRoute** u segwi l-[gwida għall-irkupru minn diżastru](./DATABASE_GUIDE.md#disaster-recovery)

### "Il-pressjoni fuq il-heap tal-memorja hija kritika"

```bash
# Iċċekkja l-heap attwali
node -e "console.log(process.memoryUsage())"

# Attiva GC manwalment (jekk --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Naqqas it-talbiet konkorrenti (issettjah mid-dashboard fil-paġna Settings, mhux b’varjabbli tal-ambjent)
# Ma hemm l-ebda varjabbli tal-ambjent `MAX_CONCURRENT_REQUESTS` — ikkonfiguraha f’Settings → Concurrency.
```

---

## Ara Wkoll

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — monitoraġġ tal-użu u tal-ispejjeż
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — skema tad-DB + stat tas-saħħa
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — stat tas-saħħa tal-proxy (cache separata)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arkitettura tas-sistema
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — dettalji dwar is-circuit breaker
- Sors: `src/lib/monitoring/` (4 fajls, 2121 linja ta’ kodiċi)
