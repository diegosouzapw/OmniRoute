# Monitoring & Observability Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Kort fortalt**: OmniRoute leveres med indbygget helbredsovervågning, autopilot til udbydere, kvotesporing og hooks til observerbarhed. Denne vejledning dækker dashboardet, advarsler og fejlfinding.

**Kilder:**

- `src/lib/monitoring/observability.ts` — øjebliksbillede af observerbarhed
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot til kombinationshelbred
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot til udbydere
- `src/lib/monitoring/providerHealthMatrix.ts` — helbredsmatrix for udbydere
- `src/lib/localHealthCheck.ts` — lokalt helbredstjek
- `src/lib/tokenHealthCheck.ts` — helbred for tokenfornyelse
- `src/lib/proxyHealth.ts` — cache for proxyhelbred (beskrevet i PROXY_GUIDE.md)

---

## Overblik

OmniRoute har **3 lag af overvågning**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lag 1: Systemhelbred (serverniveau)                          │
│  ├─ localHealthCheck.ts — database, porte, native afhængigheder│
│  ├─ db/healthCheck.ts — integritet, FK, forældreløse artefakter│
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Lag 2: Udbyderhelbred (robusthed pr. udbyder)                │
│  ├─ providerHealthAutopilot.ts — circuit breaker, nedkøling   │
│  ├─ providerHealthMatrix.ts — helbredsscore pr. udbyder/model │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Lag 3: Live-observerbarhed (øjebliksbilleder under kørsel)   │
│  ├─ observability.ts — circuit breakers, sessioner, kvote     │
│  ├─ tokenHealthCheck.ts — helbred for OAuth-tokenfornyelse    │
│  └─ MCP-værktøjer: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboardsider

### `/dashboard/health` (Systemhelbred)

Det overordnede helbredsdashboard viser:

| Sektion              | Hvad den viser                                              |
| -------------------- | ----------------------------------------------------------- |
| **Serverstatus**     | Oppetid, version, port, aktive forbindelser                 |
| **Database**         | Forbindelse, integritet, WAL-størrelse, seneste migreringer |
| **Udbyderoversigt**  | Antal aktive, antal sunde, antal åbne breakers              |
| **Kvotemonitorer**   | Aktive sessioner, advarsler, opbrugte kvoter                |
| **Seneste fejl**     | De seneste 10 fejl med stack traces                         |
| **Ressourceforbrug** | Hukommelse, CPU, indikator for heap-belastning              |

### `/dashboard/providers` (Udbyderhelbred)

Dashboard pr. udbyder:

| Kolonne      | Beskrivelse                                          |
| ------------ | ---------------------------------------------------- |
| Udbyder      | Udbyder-id + vist navn                               |
| Helbred      | Grøn/gul/rød status                                  |
| Circuit      | Åben/lukket/halvåben tilstand                        |
| Forbindelser | Antal forbindelser, seneste opdatering               |
| Modeller     | Tilgængelige modeller, helbred pr. model             |
| Omkostning   | Dagens omkostning, 7-dages tendens                   |
| Fejl         | Antal fejl de seneste 24 timer, hyppigste fejlklasse |

Klik på en udbyder for at se:

- Seneste anmodninger med opdeling af latenstid
- Helbredsscore pr. forbindelse
- Blokeringer pr. model
- Anbefalinger fra autopilot

### `/dashboard/quota` (Kvotetracking)

For hver API-nøgle:

- Aktuelt forbrug i forhold til grænsen (statuslinje)
- Kvotetendens (30-dages diagram)
- Tidspunkt for næste nulstilling
- Advarselshistorik

### `/dashboard/combos` (Kombinationshelbred)

Pr. kombination:

- Strategi + mål
- Helbred pr. mål
- Seneste fallback-hændelser
- Succesrate (24 timer, 7 dage, 30 dage)

---

## API til sundhedstjek

OmniRoute eksponerer **to** HTTP-sundhedsflader. De kan ikke bruges i flæng af orkestratorer.

| Sti                          | Formål                                                                   | Belastning                             | Bruges til                                                               |
| ---------------------------- | ------------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------ |
| `GET /healthz`               | Livscyklusstatus for liveness/readiness (`ok` / `starting` / `stopping`) | Minimal (kun faseflag)                 | Kubernetes-**readiness**; lempelig **liveness**, hvis du skal bruge HTTP |
| `GET /api/monitoring/health` | Dybdegående oversigt over system + udbydere (DB, heap, katalogantal, …)  | Høj (synkront DB-/overvågningsarbejde) | Dashboards, dybdegående blackbox-tjek, Dockers indbyggede sundhedstjek   |

> **Bemærk:** Sundhedsmatricer for udbydere, autopilotproblemer, kvoteovervågning, tokensundhed og latensdetaljer ud over `/api/monitoring/health` er tilgængelige via **MCP-værktøjet** `observability_snapshot` eller **dashboardets** sider — der findes ingen dedikerede REST-ruter til disse.

Begge ruter kører på den **samme Node-hændelsesløkke** som håndteringen af anmodninger. En CPU-bundet sti (omfattende katalogarbejde for `GET /v1/models`, komprimering af lange kontekster/tokenoptælling) kan forsinke **alle** HTTP-handlere, inklusive `/healthz`. Optaget hændelsesløkke ≠ død proces. Prioritér at løse årsagen til belastningen; justering af prober reducerer kun fejlagtige genstarter.

### Letvægtsprobe til orkestratorer

```bash
GET /healthz
# eller HEAD /healthz
```

- **200** + brødteksten `ok`, når serverens livscyklusfase er klar
- **503** + `starting` / `stopping` under opstart eller nedlukning
- Implementering: `src/app/healthz/route.ts` (ingen DB-ping)

### Systemsundhed (dybdegående)

```bash
GET /api/monitoring/health
```

Svar:

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

#### `credentialHealth`: probe-cache kontra SQLite-`test_status`

`GET /api/monitoring/health` → `credentialHealth` er **måleren fra probe-cachen i
hukommelsen**, ikke et aktuelt udtræk af `provider_connections.test_status`. Efter #12532
læser anmodningsstien kun `getCachedCredentialHealthSummary()`; baggrundsprober
opdaterer cachen uden for hændelsesløkken.

| Lag                               | Hvor                                                                  | Hvad det betyder                                                                                                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cache-måler                 | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Seneste resultater fra sundhedsprober for legitimationsoplysninger, som stadig opbevares i proceshukommelsen. `source` er altid `probe-cache`.                                                                   |
| Detaljer om mislykket forbindelse | `credentialHealth.failedConnections`                                  | Findes **kun, når `failed > 0`**. Begrænset liste over cache-rækker med `status=error` (`connectionId`, `status`, renset `lastError` / `lastErrorType`). `failedOmitted` angives, når listen er blevet afkortet. |
| Permanent SQLite-status           | `credentialHealth.staleDbNonOkCount`                                  | Antal **aktive** (`is_active=1`) forbindelsesrækker, hvis gemte `test_status` er en kendt ikke-ok-status (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                      |

De to lag kan bevidst være uenige:

- Måleren viser `failed=0`, mens `staleDbNonOkCount>0` — SQLite har stadig en permanent
  `test_status` (for eksempel `expired` eller `credits_exhausted`), som det seneste
  øjebliksbillede i probe-cachen ikke medregner som `status=error`.
- Måleren viser `failed>0`, mens SQLite ser sund ud — en nylig probe mislykkedes og er
  cachelagret; DB-rækken er ikke blevet opdateret eller blev senere nulstillet.

Udløs ikke en alarm alene på baggrund af `provider_connections.test_status`, når dette
slutpunkt aflæses. Brug `failed` + `failedConnections` til aktuelle probefejl og
`staleDbNonOkCount`, når du har brug for antallet af gemte permanente statusser.

### Anbefalinger til Kubernetes-prober

OmniRoute er en **enkelt Node-proces** (én hændelsesløkke). Dockers standard-`HEALTHCHECK` bruger det lette `/healthz`. `/api/monitoring/health` er **for tungt** til kubelets liveness-intervaller.

| Kontrol                 | Anbefalet mål                                                                      | Bemærkninger                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Opstart**             | HTTP `GET /healthz` med en lang `failureThreshold` (eller stor `startPeriod`)      | Koldstart + SQLite-migrering kan tage mere end et par sekunder                                                                                                                                                                                                                                                                                                                          |
| **Klarhed**             | HTTP `GET /healthz`                                                                | Livscyklus `ok` / `starting` / `stopping` (200 kontra 503). Tilstanden skifter stadig ustabilt, hvis løkken blokeres af CPU-arbejde. Et **200-svar efter flere sekunder er ikke sundt** (#10303) — det betyder, at hændelsesløkken blev udsultet, før handleren på 3 byte blev kørt                                                                                                     |
| **Livstegn**            | HTTP `GET /livez` **eller TCP** på hovedtjenestens port (`PORT`, standard `20128`) | `/livez` angiver kun, om processen er i live (altid 200, hvis handleren kører). Den deler stadig hændelsesløkken — optaget ≠ død, og den registrerer ikke udsultning af hændelsesløkken (#10303) bedre end TCP. Foretræk **TCP**, hvis HTTP-kontroller får timeout under katalog-/komprimeringsbelastning; dræb **ikke** pod'en ved korte blokeringer af hændelsesløkken, uanset metode |
| **Dybdegående helbred** | `GET /api/monitoring/health` fra en ekstern kontrollør                             | Ikke til kubelets `livenessProbe` / stramme `readinessProbe`                                                                                                                                                                                                                                                                                                                            |

Eksempel på struktur (tilpas tærsklerne til din koldstart og komprimeringsbelastning):

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
  # Ved blokering af hændelsesløkken kan HTTP /livez stadig få timeout. TCP er det
  # konservative alternativ:
  # tcpSocket:
  #   port: http
```

Ret **ikke** kubelets **livstegnskontrol** mod `/api/monitoring/health`. Denne sti udfører reelt database-/overvågningsarbejde og vil give falske positiver under belastning.

Relateret: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (kontroller, mens hændelsesløkken er optaget), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (katalogprisberegning optager ressourcerne), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (optælling af komprimeringstokens optager ressourcerne).

### Valgfrit arbejde på anmodningsstien (hukommelse, færdigheder, tokenfornyelse)

Hukommelsesudtrækning, injektion af færdigheder og fornyelse af OAuth-tokens deler **Node-hændelsesløkken** med `/healthz`. De er funktioner, der kan slås til og fra i dashboardet (`memoryEnabled`, `skillsEnabled`), ikke en worker-pulje. Se [Miljø — omkostninger for hændelsesløkken](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Udbyderstatus

> **Intet REST-slutpunkt.** Data om udbyderstatus er tilgængelige via MCP-værktøjet `observability_snapshot` eller dashboardsiden `/dashboard/providers`.

### Udbyderdetaljer

> **Intet REST-slutpunkt.** Detaljer for hver udbyder er tilgængelige via dashboardsiden `/dashboard/providers`.

---

## Autopilot for udbydersundhed

Modulet `providerHealthAutopilot.ts` er et **selvhelende system**, der:

1. Registrerer problemer med udbydere (åbent kredsløb, nedkølingsperioder, spærringer og kvoteadvarsler)
2. Genererer **anbefalede handlinger** for at løse dem
3. Kan **udføre handlinger med lav risiko automatisk**

### Registrerede problemtyper

| Problemtype                  | Alvorlighed | Eksempel på betingelse                        |
| ---------------------------- | ----------- | --------------------------------------------- |
| `provider_circuit_open`      | kritisk     | Kredsløbsafbryder åben efter 5 fejl           |
| `provider_circuit_half_open` | advarsel    | Kredsløbet tester genoprettelse               |
| `connection_cooldown`        | advarsel    | Forbindelse i nedkøling efter 429             |
| `stale_connection_error`     | advarsel    | Seneste opdatering fejlede for 30+ min. siden |
| `terminal_connection_error`  | kritisk     | OAuth tilbagekaldt, nøgle ugyldig             |
| `inactive_connection`        | info        | Forbindelse deaktiveret i indstillingerne     |
| `model_lockout`              | advarsel    | Specifik model i karantæne                    |
| `quota_monitor_warning`      | advarsel    | Kvoteforbrug på 80 % eller mere               |

### Genererede handlingstyper

| Handling                       | Risiko | Beskrivelse                            |
| ------------------------------ | ------ | -------------------------------------- |
| `clear_provider_breaker`       | middel | Nulstil kredsløbsafbryderen til lukket |
| `clear_connection_cooldown`    | lav    | Fjern nedkøling fra en forbindelse     |
| `clear_stale_connection_error` | lav    | Ryd markeringen for en forældet fejl   |
| `clear_model_lockout`          | lav    | Genaktivér en model i karantæne        |
| `reactivate_connection`        | middel | Genaktivér en deaktiveret forbindelse  |
| `deactivate_connection`        | høj    | Deaktivér en problematisk forbindelse  |

### API

> **Intet REST-slutpunkt.** Autopilot-problemer er tilgængelige via MCP-værktøjet `observability_snapshot` eller kontrolpanelet. Autopiloten kører internt, og dens adfærd konfigureres via indstillingsdatabasen (feltet `autopilotMode` pr. forbindelse), ikke via miljøvariabler — `grep -rn` efter en miljøvariabel for autopilottilstand giver ingen resultater.

### Autopilottilstand

Autopiloten fungerer som standard i **manuel tilstand** — den registrerer problemer og genererer anbefalede handlinger, men anvender dem ikke automatisk. Handlinger kan anvendes via kontrolpanelet.

---

## Autopilot for kombinationssundhed

`comboHealthAutopilot.ts` er den **kombinationsspecifikke** pendant til udbyderautopiloten. Den:

- Registrerer usunde kombinationer
- Anbefaler omrokering af mål
- Foreslår deaktivering af defekte mål
- Fjerner automatisk døde mål efter N fejl

### Eksempler på kombinationsproblemer

```
Kombinationen "always-on" (prioritetsstrategi)
├─ Mål 1: openai/gpt-5 (sund)
├─ Mål 2: anthropic/claude-opus-4-6 (⚠️ modelspærring indtil kl. 14.00)
└─ Mål 3: kiro/claude-sonnet-4-5 (sund)

Anbefalet handling: Omroker — flyt kiro over anthropic, indtil spærringen udløber
```

---

## Kvotemonitorer

`observability.ts` eksponerer **kvotemonitorer pr. session** for abonnementsudbydere (Claude Code, Codex, GitHub Copilot):

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

### Statusbetydninger

| Status      | Hvornår                           | UI-handling                              |
| ----------- | --------------------------------- | ---------------------------------------- |
| `starting`  | Første forespørgsel er i gang     | Indlæsningsindikator                     |
| `idle`      | Ingen nylig aktivitet             | Skjult fra kontrolpanelet                |
| `healthy`   | Mere end 50 % af kvoten tilbage   | Grøn prik                                |
| `warning`   | Mindre end 50 % af kvoten tilbage | Gul advarsel                             |
| `exhausted` | Kvote = 0 %                       | Rød blokering, dirigér til næste udbyder |
| `error`     | Forespørgsel mislykkedes          | Rød prik, prøv snart igen                |

### API

> **Intet REST-slutpunkt.** Kvotemonitordata er tilgængelige via MCP-værktøjet `observability_snapshot` eller kontrolpanelet.

---

## Observabilitetsøjebliksbillede

MCP-værktøjet `observability_snapshot` returnerer et **komplet systemøjebliksbillede** til AI-agenter:

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
  "quotaMonitors": {/* se ovenfor */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenter bruger dette til at træffe **routingbeslutninger** — for eksempel: "Hvis openai-kredsløbet er åbent, skal der først routes til anthropic".

---

## Kontrol af tokenstatus

OAuth-udbydere (Claude Code, GitHub Copilot, Cursor) kræver **periodisk tokenfornyelse**. `src/lib/tokenHealthCheck.ts` kører en planlægger i baggrunden:

- **Gennemgangstik**: hvert 60. sekund (gennemgang i `TICK_MS = 60 * 1000` ved `src/lib/tokenHealthCheck.ts:30`)
- **Interval for statuskontrol pr. forbindelse**: som standard 60 minutter (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); kan konfigureres via indstillingsdatabasen
- **Forebyggende fornyelse ved 401**: håndteres af interceptoren for den enkelte forbindelse

### Tokenstatus

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

### Konfiguration

Konfigurationen af kontrol af tokenstatus håndteres internt af `tokenHealthCheck.ts`.

### Tokenstatus

> **Intet REST-slutpunkt.** Data om tokenstatus er tilgængelige via dashboardet eller MCP-værktøjet `observability_snapshot`.

---

## Alarmering

### Indbyggede kanaler

OmniRoute understøtter **3 alarmkanaler**:

| Kanal           | Opsætning       | Anvendelse                     |
| --------------- | --------------- | ------------------------------ |
| Dashboardbanner | Altid aktiveret | Notifikationer i applikationen |
| Webhook         | Konfigurer URL  | Slack, Discord, PagerDuty      |
| Log             | Standard        | Til ekstern logaggregering     |

### Webhook-konfiguration

> **Bemærk:** Konfiguration af webhook-alarmering håndteres via siden Indstillinger i dashboardet. Se brugergrænsefladen for Indstillinger for webhook-URL, hændelsesfiltrering og tilpasning af payload.

### Alarmtyper

| Alarm                        | Hvornår                                        | Standardalvorlighed |
| ---------------------------- | ---------------------------------------------- | ------------------- |
| `provider_circuit_open`      | Kredsløbet åbnes                               | kritisk             |
| `provider_circuit_half_open` | Kredsløbet tester genoprettelse                | info                |
| `quota_warning`              | Kvoten er på 80 % eller derover                | advarsel            |
| `quota_exhausted`            | Kvoten er på 100 %                             | kritisk             |
| `token_refresh_failed`       | 3+ fortløbende fornyelsesfejl                  | advarsel            |
| `token_expired`              | Tokenets udløbstid er overskredet              | kritisk             |
| `combo_target_unhealthy`     | Kombinationsmålet har været i nedkøling i 1 t+ | advarsel            |
| `db_integrity_warning`       | FK-overtrædelser > 0                           | advarsel            |
| `heap_pressure`              | Heap-forbrug > 80 % af tærsklen                | advarsel            |

---

## Ydelsesmålinger

### Sporede målinger

| Måling                  | Type      | Kilde                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | tæller    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | tæller    | `services/usage.ts`             |
| `cost_usd`              | tæller    | `services/usage.ts`             |
| `provider_errors`       | tæller    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | tæller    | `services/resilience.ts`        |
| `cache_hits`            | tæller    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | måler     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | måler     | `observability.ts`              |

### Latenspercentiler (p50/p95/p99)

> **Intet REST-slutpunkt.** Data om latenspercentiler er tilgængelige via dashboardsiden `/dashboard/health`. Eksport til Prometheus/OpenTelemetry er planlagt til v3.9.

### Eksport til Prometheus/OpenTelemetry (fase 2)

Planlagt til v3.9: indbygget eksport til Prometheus, OpenTelemetry og Datadog.

Indtil videre kan `/api/monitoring/health` hentes med ethvert HTTP-baseret overvågningssystem (Prometheus blackbox exporter, Datadog HTTP check osv.).

---

## Opskrifter til alarmering

### Slack

> **Bemærk:** Webhook-alarmering konfigureres via siden Settings i dashboardet — der findes ingen dedikerede webhook-miljøvariabler (`grep -rn` returnerer ingen resultater). Se brugergrænsefladen under Settings for webhook-URL, hændelsesfiltrering og tilpasning af payload.

### Discord

> Webhook-alarmering bruger samme arbejdsgang i brugergrænsefladen under Settings som Slack. Discord accepterer samme JSON-payloadformat.

### PagerDuty

> Webhook-alarmering bruger samme arbejdsgang i brugergrænsefladen under Settings. Routingnøgler til PagerDuty Events API v2 konfigureres i brugergrænsefladen under Settings.

### Brugerdefineret webhook (JSON)

> Ethvert HTTP-slutpunkt, der accepterer POST med en JSON-body, kan bruges. Konfigurer URL'en i brugergrænsefladen under Settings.

---

## Konfiguration af dashboardet

### Tilpas sundhedsdashboardet

Opret en `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fastgør en udbyder øverst

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Fejlfinding

### "Udbyderen angiver, at den er sund, men anmodninger mislykkes"

1. Kontrollér **autopilot-problemerne** — en model er måske blevet låst ude
2. Se under **seneste fejl** efter den specifikke fejlklasse
3. Prøv **forbindelsestesten** på udbyderkortet
4. Kontrollér, om udbyderen er **hastighedsbegrænset hos upstream-udbyderen** (ikke synligt lokalt)

### "Kvoten angives som sund, men jeg ser 429-fejl"

- 429 betyder, at udbyderen angiver, at du har opbrugt din kvote
- OmniRoutes kvotesporing kan være **forældet** — udbyderens oplysninger hos upstream-udbyderen er autoritative
- Kvotedata opdateres automatisk via den interne kvoteovervågning

### "Kombinationen fejler, men alle mål ser sunde ud"

- Kontrollér dashboardet for **kombinationssundhed** for problemer med målenes rækkefølge
- Se på **fallback-hændelser** — kombinationen opbruger måske sine muligheder for hurtigt
- Kontrollér, at **strategien** passer til dit anvendelsestilfælde (prioritet kontra round-robin kontra automatisk)

### "Databasens sundhedskontrol mislykkes"

- Kør `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Hvis resultatet er "ok" — falsk alarm; sundhedskontrollen er for streng
- Hvis resultatet er noget andet — **stop OmniRoute**, og følg [vejledningen til katastrofeberedskab](./DATABASE_GUIDE.md#disaster-recovery)

### "Presset på memory heap er kritisk"

```bash
# Kontrollér den aktuelle heap
node -e "console.log(process.memoryUsage())"

# Udløs manuel GC (hvis --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reducer antallet af samtidige anmodninger (indstil via siden Settings i dashboardet, ikke via en miljøvariabel)
# Der findes ingen `MAX_CONCURRENT_REQUESTS`-miljøvariabel — konfigurer det under Settings → Concurrency.
```

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — sporing af forbrug og omkostninger
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — databaseskema og sundhedstilstand
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxyens sundhedstilstand (separat cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — systemarkitektur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detaljer om circuit breaker
- Kilde: `src/lib/monitoring/` (4 filer, 2121 kodelinjer)
