# Monitoring & Observability Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute wordt geleverd met ingebouwde gezondheidsbewaking, een autopilot voor providers, quotumregistratie en observability-hooks. Deze handleiding behandelt het dashboard, waarschuwingen en probleemoplossing.

**Bronnen:**

- `src/lib/monitoring/observability.ts` — observability-snapshot
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot voor combinatiegezondheid
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot voor providers
- `src/lib/monitoring/providerHealthMatrix.ts` — gezondheidsmatrix voor providers
- `src/lib/localHealthCheck.ts` — lokale gezondheidscontrole
- `src/lib/tokenHealthCheck.ts` — gezondheid van tokenvernieuwing
- `src/lib/proxyHealth.ts` — cache voor proxygezondheid (behandeld in PROXY_GUIDE.md)

---

## Overzicht

OmniRoute heeft **3 bewakingslagen**:

```
┌──────────────────────────────────────────────────────────────┐
│  Laag 1: Systeemgezondheid (serverniveau)                     │
│  ├─ localHealthCheck.ts — DB, poorten, native afhankelijkheden│
│  ├─ db/healthCheck.ts — integriteit, FK, verweesde artefacten │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Laag 2: Providergezondheid (veerkracht per provider)         │
│  ├─ providerHealthAutopilot.ts — circuitbreaker, afkoelperiodes│
│  ├─ providerHealthMatrix.ts — gezondheidsscores per provider/model│
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Laag 3: Live observability (runtime-snapshots)               │
│  ├─ observability.ts — circuitbreakers, sessies, quotum       │
│  ├─ tokenHealthCheck.ts — gezondheid van OAuth-tokenvernieuwing│
│  └─ MCP-tools: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboardpagina's

### `/dashboard/health` (Systeemgezondheid)

Het algemene gezondheidsdashboard toont:

| Sectie                | Wat er wordt weergegeven                                    |
| --------------------- | ----------------------------------------------------------- |
| **Serverstatus**      | Uptime, versie, poort, actieve verbindingen                 |
| **Database**          | Verbinding, integriteit, WAL-grootte, recente migraties     |
| **Provideroverzicht** | Aantal actieve en gezonde providers en open circuitbreakers |
| **Quotummonitors**    | Actieve sessies, waarschuwingen, uitgeputte quota           |
| **Recente fouten**    | Laatste 10 fouten met stacktraces                           |
| **Resourcegebruik**   | Geheugen, CPU, indicator voor heapdruk                      |

### `/dashboard/providers` (Providergezondheid)

Dashboard per provider:

| Kolom        | Beschrijving                                                       |
| ------------ | ------------------------------------------------------------------ |
| Provider     | Provider-ID + weergavenaam                                         |
| Gezondheid   | Groene/gele/rode status                                            |
| Circuit      | Open/gesloten/halfopen status                                      |
| Verbindingen | Aantal verbindingen, laatste vernieuwing                           |
| Modellen     | Beschikbare modellen, gezondheid per model                         |
| Kosten       | Kosten van vandaag, trend over 7 dagen                             |
| Fouten       | Aantal fouten in de afgelopen 24 uur, meest voorkomende foutklasse |

Klik op een provider om het volgende te bekijken:

- Recente aanvragen met een uitsplitsing van de latentie
- Gezondheidsscores per verbinding
- Blokkeringen per model
- Aanbevelingen van de autopilot

### `/dashboard/quota` (Quotumregistratie)

Voor elke API-sleutel:

- Huidig gebruik ten opzichte van de limiet (voortgangsbalk)
- Quotumtrend (grafiek over 30 dagen)
- Tijdstip van de volgende reset
- Waarschuwingsgeschiedenis

### `/dashboard/combos` (Combinatiegezondheid)

Per combinatie:

- Strategie + doelen
- Gezondheid per doel
- Recente fallbackgebeurtenissen
- Succespercentage (24 uur, 7 dagen, 30 dagen)

---

## Health Check-API

OmniRoute biedt **twee** HTTP-endpoints voor statuscontroles. Ze zijn voor orchestrators niet onderling uitwisselbaar.

| Pad                          | Doel                                                                           | Belasting                             | Gebruiken voor                                                                |
| ---------------------------- | ------------------------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------- |
| `GET /healthz`               | Liveness/readiness van levenscyclus (`ok` / `starting` / `stopping`)           | Minimaal (alleen fasevlag)            | Kubernetes-**readiness**; lichte **liveness** als u HTTP moet gebruiken       |
| `GET /api/monitoring/health` | Uitgebreide systeem- en providersamenvatting (DB, heap, catalogusaantallen, …) | Zwaar (synchrone DB-/monitoringtaken) | Dashboards, uitgebreide black-boxcontroles, ingebouwde healthcheck van Docker |

> **Opmerking:** Statusmatrices van providers, autopilotproblemen, quotamonitors, tokenstatus en latentiedetails die verder gaan dan `/api/monitoring/health`, zijn beschikbaar via de **MCP-tool** `observability_snapshot` of de **dashboardpagina’s** — hiervoor bestaan geen afzonderlijke REST-routes.

Beide routes draaien in **dezelfde Node-eventloop** als de afhandeling van verzoeken. Een CPU-intensief pad (omvangrijke catalogusverwerking voor `GET /v1/models`, compressie van lange contexten/token telling) kan **alle** HTTP-handlers vertragen, inclusief `/healthz`. Een drukke eventloop ≠ een dood proces. Los bij voorkeur de belastende taak op; het afstellen van probes vermindert alleen het aantal onterechte beëindigingen.

### Lichtgewicht orchestratorprobe

```bash
GET /healthz
# of HEAD /healthz
```

- **200** + hoofdtekst `ok` wanneer de levenscyclusfase van de server gereed is
- **503** + `starting` / `stopping` tijdens het opstarten of afsluiten
- Implementatie: `src/app/healthz/route.ts` (geen DB-ping)

### Systeemstatus (uitgebreid)

```bash
GET /api/monitoring/health
```

Antwoord:

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

#### `credentialHealth`: probe-cache versus SQLite-`test_status`

`GET /api/monitoring/health` → `credentialHealth` is de **metriek uit de probe-cache in het geheugen**, niet een actuele dump van `provider_connections.test_status`. Na #12532 leest het verzoekpad uitsluitend `getCachedCredentialHealthSummary()`; achtergrondprobes vernieuwen de cache buiten de eventloop.

| Laag                              | Waar                                                                  | Betekenis                                                                                                                                                                                                                          |
| --------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-cachemetriek                | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | De laatste resultaten van statusprobes voor referenties die nog in het procesgeheugen staan. `source` is altijd `probe-cache`.                                                                                                     |
| Details van mislukte verbindingen | `credentialHealth.failedConnections`                                  | Alleen aanwezig **wanneer `failed > 0`**. Begrensde lijst met cacheregels met `status=error` (`connectionId`, `status`, opgeschoonde `lastError` / `lastErrorType`). `failedOmitted` wordt ingesteld wanneer de lijst is afgekapt. |
| Persistente SQLite-status         | `credentialHealth.staleDbNonOkCount`                                  | Aantal **actieve** (`is_active=1`) verbindingsregels waarvan de persistente `test_status` een bekende niet-ok-status heeft (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                      |

De twee lagen kunnen bewust van elkaar afwijken:

- Metriek `failed=0` terwijl `staleDbNonOkCount>0` — SQLite bevat nog steeds een persistente `test_status` (bijvoorbeeld `expired` of `credits_exhausted`) die door de meest recente momentopname van de probe-cache niet als `status=error` wordt geteld.
- Metriek `failed>0` terwijl SQLite een gezonde status toont — een recente probe is mislukt en is in de cache opgeslagen; de DB-regel is nog niet bijgewerkt of is later gewist.

Genereer bij het scrapen van dit endpoint niet uitsluitend waarschuwingen op basis van `provider_connections.test_status`. Gebruik `failed` + `failedConnections` voor actuele probefouten en `staleDbNonOkCount` wanneer u het aantal persistente statussen nodig hebt.

### Aanbevelingen voor Kubernetes-probes

OmniRoute is één **enkel Node-proces** (één eventloop). De standaard `HEALTHCHECK` van Docker gebruikt het lichtgewicht `/healthz`. `/api/monitoring/health` is **te zwaar** voor liveness-intervallen van kubelet.

| Probe                 | Aanbevolen doel                                                                   | Opmerkingen                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Opstart**           | HTTP `GET /healthz` met een lange `failureThreshold` (of grote `startPeriod`)     | Een koude start + SQLite-migratie kan langer dan enkele seconden duren                                                                                                                                                                                                                                                                                                                                                              |
| **Gereedheid**        | HTTP `GET /healthz`                                                               | Levenscyclus `ok` / `starting` / `stopping` (200 versus 503). Fluctueert nog steeds als de lus door de CPU wordt geblokkeerd. Een **200 die meerdere seconden op zich laat wachten, is niet gezond** (#10303) — dit betekent dat de eventloop geen verwerkingstijd kreeg voordat de handler van 3 bytes werd uitgevoerd                                                                                                             |
| **Levendigheid**      | HTTP `GET /livez`, **of TCP** op de hoofdservicepoort (`PORT`, standaard `20128`) | `/livez` controleert alleen of het proces actief is (altijd 200 als de handler wordt uitgevoerd). Het deelt nog steeds de eventloop — bezig ≠ dood, en het detecteert uithongering van de eventloop (#10303) niet beter dan TCP. Geef de voorkeur aan **TCP** als HTTP-probes een time-out krijgen tijdens catalogus-/compressiebelasting; beëindig de pod in geen van beide gevallen vanwege korte onderbrekingen van de eventloop |
| **Diepgaande status** | `GET /api/monitoring/health` vanuit een externe controle                          | Niet voor kubelet `livenessProbe` / strakke `readinessProbe`                                                                                                                                                                                                                                                                                                                                                                        |

Voorbeeldstructuur (pas de drempelwaarden aan op de belasting tijdens een koude start en compressie):

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
  # Wanneer de eventloop vastloopt, kan HTTP /livez nog steeds een time-out krijgen. TCP is het
  # conservatieve alternatief:
  # tcpSocket:
  #   port: http
```

Laat kubelet-**levendigheid** **niet** naar `/api/monitoring/health` verwijzen. Dat pad voert daadwerkelijk database-/monitoringwerk uit en zal onder belasting fout-positieve resultaten opleveren.

Gerelateerd: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (probes terwijl de eventloop bezig is), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (catalogusprijzen die de eventloop monopoliseren), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (compressietokentelling die de eventloop monopoliseert).

### Optioneel werk in het aanvraagpad (geheugen, vaardigheden, tokenvernieuwing)

Geheugenextractie, injectie van vaardigheden en vernieuwing van OAuth-tokens delen de **hoofd-eventloop van Node** met `/healthz`. Het zijn via het dashboard in- en uitschakelbare functies (`memoryEnabled`, `skillsEnabled`), geen workerpool. Zie [Omgeving — kosten voor de eventloop](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Providerstatus

> **Geen REST-endpoint.** Providerstatusgegevens zijn beschikbaar via de MCP-tool `observability_snapshot` of de dashboardpagina `/dashboard/providers`.

### Providerdetails

> **Geen REST-endpoint.** Details per provider zijn beschikbaar via de dashboardpagina `/dashboard/providers`.

---

## Autopilot voor providerstatus

De module `providerHealthAutopilot.ts` is een **zelfherstellend systeem** dat:

1. Problemen met providers detecteert (open circuit, afkoelperiodes, blokkeringen, quotawaarschuwingen)
2. **Aanbevolen acties** genereert om deze op te lossen
3. Optioneel acties met een laag risico **automatisch uitvoert**

### Gedetecteerde probleemtypen

| Probleemtype                 | Ernstig- heid | Voorbeeldconditie                               |
| ---------------------------- | ------------- | ----------------------------------------------- |
| `provider_circuit_open`      | kritiek       | Circuitonderbreker open na 5 fouten             |
| `provider_circuit_half_open` | waarschuwing  | Circuit test herstel                            |
| `connection_cooldown`        | waarschuwing  | Verbinding in afkoelperiode na 429              |
| `stale_connection_error`     | waarschuwing  | Laatste vernieuwing 30+ minuten geleden mislukt |
| `terminal_connection_error`  | kritiek       | OAuth ingetrokken, sleutel ongeldig             |
| `inactive_connection`        | info          | Verbinding uitgeschakeld in instellingen        |
| `model_lockout`              | waarschuwing  | Specifiek model in quarantaine                  |
| `quota_monitor_warning`      | waarschuwing  | Quotum voor 80%+ gebruikt                       |

### Gegenereerde actietypen

| Actie                          | Risico    | Beschrijving                                      |
| ------------------------------ | --------- | ------------------------------------------------- |
| `clear_provider_breaker`       | gemiddeld | Stel de circuitonderbreker opnieuw in op gesloten |
| `clear_connection_cooldown`    | laag      | Verwijder de afkoelperiode van een verbinding     |
| `clear_stale_connection_error` | laag      | Wis de verouderde foutmarkering                   |
| `clear_model_lockout`          | laag      | Schakel een model in quarantaine opnieuw in       |
| `reactivate_connection`        | gemiddeld | Schakel een gedeactiveerde verbinding opnieuw in  |
| `deactivate_connection`        | hoog      | Schakel een problematische verbinding uit         |

### API

> **Geen REST-endpoint.** Autopilot-problemen zijn beschikbaar via de MCP-tool `observability_snapshot` of het dashboard. De autopilot wordt intern uitgevoerd; het gedrag ervan wordt geconfigureerd via de instellingendatabase (het veld `autopilotMode` per verbinding), niet via omgevingsvariabelen — `grep -rn` voor een omgevingsvariabele voor de autopilotmodus levert geen resultaten op.

### Autopilotmodus

De autopilot werkt standaard in de **handmatige modus** — problemen worden gedetecteerd en aanbevolen acties worden gegenereerd, maar deze worden niet automatisch toegepast. Acties kunnen via het dashboard worden toegepast.

---

## Autopilot voor combostatus

`comboHealthAutopilot.ts` is het **combospecifieke** equivalent van de providerautopilot. Deze:

- Detecteert ongezonde combo's
- Beveelt een andere volgorde van doelen aan
- Stelt voor defecte doelen uit te schakelen
- Verwijdert niet-werkende doelen automatisch na N fouten

### Voorbeelden van comboproblemen

```
Combo "always-on" (prioriteitsstrategie)
├─ Doel 1: openai/gpt-5 (gezond)
├─ Doel 2: anthropic/claude-opus-4-6 (⚠️ modelblokkering tot 14:00)
└─ Doel 3: kiro/claude-sonnet-4-5 (gezond)

Aanbevolen actie: Volgorde wijzigen — plaats kiro boven anthropic totdat de blokkering verloopt
```

---

## Quotummonitors

`observability.ts` stelt **quotummonitors per sessie** beschikbaar voor abonnementsproviders (Claude Code, Codex, GitHub Copilot):

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

### Betekenis van statussen

| Status      | Wanneer                         | UI-actie                                           |
| ----------- | ------------------------------- | -------------------------------------------------- |
| `starting`  | Eerste peiling wordt uitgevoerd | Laadindicator                                      |
| `idle`      | Geen recente activiteit         | Verborgen op het dashboard                         |
| `healthy`   | Meer dan 50% quotum resterend   | Groene stip                                        |
| `warning`   | Minder dan 50% quotum resterend | Gele waarschuwing                                  |
| `exhausted` | Quotum = 0%                     | Rode blokkering, routeer naar de volgende provider |
| `error`     | Peiling mislukt                 | Rode stip, probeer het snel opnieuw                |

### API

> **Geen REST-endpoint.** Gegevens van quotummonitors zijn beschikbaar via de MCP-tool `observability_snapshot` of het dashboard.

---

## Observability-snapshot

De MCP-tool `observability_snapshot` retourneert een **volledige systeemsnapshot** voor AI-agents:

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
  "quotaMonitors": {/* zie hierboven */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agents gebruiken dit om **routeringsbeslissingen** te nemen — bijvoorbeeld: "als het circuit van openai open is, routeer dan eerst naar anthropic".

---

## Tokenstatuscontrole

OAuth-providers (Claude Code, GitHub Copilot, Cursor) vereisen **periodieke tokenvernieuwing**. `src/lib/tokenHealthCheck.ts` voert een achtergrondplanner uit:

- **Sweep-tick**: elke 60 seconden (sweep in `TICK_MS = 60 * 1000` op `src/lib/tokenHealthCheck.ts:30`)
- **Interval voor statuscontrole per verbinding**: standaard 60 minuten (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configureerbaar via de instellingendatabase
- **Preventieve vernieuwing bij 401**: afgehandeld door de interceptor per verbinding

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

### Configuratie

De configuratie van de tokenstatuscontrole wordt intern afgehandeld door `tokenHealthCheck.ts`.

### Tokenstatus

> **Geen REST-endpoint.** Tokenstatusgegevens zijn beschikbaar via het dashboard of de MCP-tool `observability_snapshot`.

---

## Waarschuwingen

### Ingebouwde kanalen

OmniRoute ondersteunt **3 waarschuwingskanalen**:

| Kanaal          | Configuratie     | Gebruiksscenario                      |
| --------------- | ---------------- | ------------------------------------- |
| Dashboardbanner | Altijd actief    | Meldingen in de app                   |
| Webhook         | URL configureren | Slack, Discord, PagerDuty             |
| Log             | Standaard        | Voor externe aggregatie van logboeken |

### Webhookconfiguratie

> **Opmerking:** De configuratie van webhookwaarschuwingen wordt afgehandeld via de pagina Instellingen van het dashboard. Raadpleeg de gebruikersinterface van Instellingen voor de webhook-URL, gebeurtenisfiltering en aanpassing van de payload.

### Waarschuwingstypen

| Waarschuwing                 | Wanneer                                     | Standaardernst |
| ---------------------------- | ------------------------------------------- | -------------- |
| `provider_circuit_open`      | Circuit wordt geopend                       | kritiek        |
| `provider_circuit_half_open` | Circuit test het herstel                    | info           |
| `quota_warning`              | Quotum op 80%+                              | waarschuwing   |
| `quota_exhausted`            | Quotum op 100%                              | kritiek        |
| `token_refresh_failed`       | 3+ opeenvolgende vernieuwingsfouten         | waarschuwing   |
| `token_expired`              | Token is verlopen                           | kritiek        |
| `combo_target_unhealthy`     | Combinatiedoel bevindt zich 1u+ in cooldown | waarschuwing   |
| `db_integrity_warning`       | FK-schendingen > 0                          | waarschuwing   |
| `heap_pressure`              | Heapgebruik > 80% van de drempelwaarde      | waarschuwing   |

---

## Prestatiestatistieken

### Bijgehouden statistieken

| Statistiek              | Type      | Bron                            |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | teller    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | teller    | `services/usage.ts`             |
| `cost_usd`              | teller    | `services/usage.ts`             |
| `provider_errors`       | teller    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | teller    | `services/resilience.ts`        |
| `cache_hits`            | teller    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | meter     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | meter     | `observability.ts`              |

### Latentiepercentielen (p50/p95/p99)

> **Geen REST-endpoint.** Gegevens over latentiepercentielen zijn beschikbaar via de dashboardpagina `/dashboard/health`. Export naar Prometheus/OpenTelemetry staat gepland voor v3.9.

### Export naar Prometheus / OpenTelemetry (fase 2)

Gepland voor v3.9: native export naar Prometheus, OpenTelemetry en Datadog.

Haal voorlopig gegevens op van `/api/monitoring/health` met een HTTP-gebaseerd monitoringsysteem (Prometheus blackbox exporter, Datadog HTTP check enz.).

---

## Recepten voor waarschuwingen

### Slack

> **Opmerking:** Webhookwaarschuwingen worden geconfigureerd via de pagina Instellingen van het dashboard — er zijn geen specifieke webhook-omgevingsvariabelen (`grep -rn` levert nul resultaten op). Raadpleeg de gebruikersinterface van Instellingen voor de webhook-URL, gebeurtenisfiltering en aanpassing van de payload.

### Discord

> Webhookwaarschuwingen gebruiken dezelfde configuratieprocedure in de gebruikersinterface van Instellingen als Slack. Discord accepteert dezelfde JSON-payloadstructuur.

### PagerDuty

> Webhookwaarschuwingen gebruiken dezelfde configuratieprocedure in de gebruikersinterface van Instellingen. Routingsleutels voor PagerDuty Events API v2 worden geconfigureerd in de gebruikersinterface van Instellingen.

### Aangepaste webhook (JSON)

> Elk HTTP-endpoint dat POST-verzoeken met een JSON-body accepteert, werkt. Configureer de URL in de gebruikersinterface van Instellingen.

---

## Dashboardconfiguratie

### Het statusdashboard aanpassen

Maak een `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Een provider bovenaan vastzetten

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Probleemoplossing

### "De provider meldt dat deze gezond is, maar verzoeken mislukken"

1. Controleer de **autopilot-problemen** — mogelijk is een model geblokkeerd
2. Bekijk de **recente fouten** voor de specifieke foutklasse
3. Probeer de **verbindingstest** op de providerkaart
4. Controleer of de provider **bovenstrooms een snelheidslimiet heeft bereikt** (lokaal niet zichtbaar)

### "Het quotum wordt als gezond weergegeven, maar ik zie 429-fouten"

- 429 betekent dat de provider aangeeft dat u uw quotum hebt opgebruikt
- De quotumregistratie van OmniRoute kan **verouderd** zijn — de gegevens van de bovenstroomse provider zijn leidend
- Quotumgegevens worden automatisch vernieuwd via de interne quotummonitor

### "De combinatie mislukt, maar alle doelen lijken gezond"

- Controleer het dashboard voor **combinatiestatus** op problemen met de volgorde van doelen
- Bekijk de **fallbackgebeurtenissen** — mogelijk raakt de combinatie te snel uitgeput
- Controleer of de **strategie** overeenkomt met uw gebruiksscenario (prioriteit versus round-robin versus automatisch)

### "De statuscontrole van de database mislukt"

- Voer `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` uit
- Als het resultaat "ok" is — vals alarm, de statuscontrole is te streng
- Bij elk ander resultaat — **stop OmniRoute** en volg de [handleiding voor noodherstel](./DATABASE_GUIDE.md#disaster-recovery)

### "De druk op het geheugengebied is kritiek"

```bash
# Controleer de huidige heap
node -e "console.log(process.memoryUsage())"

# Activeer handmatige garbagecollection (indien --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Verminder het aantal gelijktijdige verzoeken (stel dit in via de pagina Instellingen van het dashboard, niet via een omgevingsvariabele)
# Er is geen omgevingsvariabele `MAX_CONCURRENT_REQUESTS` — configureer dit via Instellingen → Gelijktijdigheid.
```

---

## Zie ook

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — gebruiks- en kostentracering
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — databaseschema en -status
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxystatus (afzonderlijke cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — systeemarchitectuur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — details over de circuitbreaker
- Bron: `src/lib/monitoring/` (4 bestanden, 2121 regels code)
