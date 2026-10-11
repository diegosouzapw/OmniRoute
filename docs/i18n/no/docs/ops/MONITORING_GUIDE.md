# Monitoring & Observability Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Kort fortalt**: OmniRoute leveres med innebygd tilstandsovervåking, autopilot for leverandører, kvotesporing og observerbarhetsintegrasjoner. Denne veiledningen dekker kontrollpanelet, varsler og feilsøking.

**Kilder:**

- `src/lib/monitoring/observability.ts` — øyeblikksbilde av observerbarhet
- `src/lib/monitoring/comboHealthAutopilot.ts` — tilstandsautopilot for kombinasjoner
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot for leverandører
- `src/lib/monitoring/providerHealthMatrix.ts` — tilstandsmatrise for leverandører
- `src/lib/localHealthCheck.ts` — lokal tilstandskontroll
- `src/lib/tokenHealthCheck.ts` — tilstand for tokenfornyelse
- `src/lib/proxyHealth.ts` — tilstandsbuffer for proxy (dekkes i PROXY_GUIDE.md)

---

## Oversikt

OmniRoute har **3 lag med overvåking**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lag 1: Systemtilstand (servernivå)                           │
│  ├─ localHealthCheck.ts — database, porter, systemavhengigheter│
│  ├─ db/healthCheck.ts — integritet, FK, foreldreløse artefakter│
│  └─ Kontrollpanel: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  Lag 2: Leverandørtilstand (robusthet per leverandør)         │
│  ├─ providerHealthAutopilot.ts — effektbryter, ventetider     │
│  ├─ providerHealthMatrix.ts — tilstandspoeng per leverandør/modell│
│  └─ Kontrollpanel: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  Lag 3: Sanntidsobserverbarhet (øyeblikksbilder under kjøring)│
│  ├─ observability.ts — effektbrytere, økter, kvote            │
│  ├─ tokenHealthCheck.ts — tilstand for OAuth-tokenfornyelse   │
│  └─ MCP-verktøy: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Kontrollpanelsider

### `/dashboard/health` (Systemtilstand)

Det overordnede tilstandskontrollpanelet viser:

| Del                      | Hva den viser                                             |
| ------------------------ | --------------------------------------------------------- |
| **Serverstatus**         | Oppetid, versjon, port, aktive tilkoblinger               |
| **Database**             | Tilkobling, integritet, WAL-størrelse, nylige migreringer |
| **Leverandørsammendrag** | Antall aktive, antall friske, antall åpne effektbrytere   |
| **Kvoteovervåkere**      | Aktive økter, varsler, oppbrukte kvoter                   |
| **Nylige feil**          | De siste 10 feilene med stakkspor                         |
| **Ressursbruk**          | Minne, prosessor, indikator for heap-belastning           |

### `/dashboard/providers` (Leverandørtilstand)

Kontrollpanel per leverandør:

| Kolonne      | Beskrivelse                                      |
| ------------ | ------------------------------------------------ |
| Leverandør   | Leverandør-ID + visningsnavn                     |
| Tilstand     | Grønn/gul/rød status                             |
| Effektbryter | Åpen/lukket/halvåpen tilstand                    |
| Tilkoblinger | Antall tilkoblinger, siste oppdatering           |
| Modeller     | Tilgjengelige modeller, tilstand per modell      |
| Kostnad      | Dagens kostnad, 7-dagers trend                   |
| Feil         | Antall feil siste 24 timer, vanligste feilklasse |

Klikk på en leverandør for å se:

- Nylige forespørsler med fordeling av forsinkelse
- Tilstandspoeng per tilkobling
- Sperringer per modell
- Anbefalinger fra autopiloten

### `/dashboard/quota` (Kvotesporing)

For hver API-nøkkel:

- Gjeldende bruk sammenlignet med grensen (fremdriftslinje)
- Kvotetrend (30-dagers diagram)
- Tidspunkt for neste nullstilling
- Varselhistorikk

### `/dashboard/combos` (Kombinasjonstilstand)

Per kombinasjon:

- Strategi + mål
- Tilstand per mål
- Nylige reservehendelser
- Suksessrate (24 t, 7 d, 30 d)

---

## API for helsesjekk

OmniRoute tilbyr **to** HTTP-endepunkter for helsesjekk. De kan ikke brukes om hverandre av orkestratorer.

| Bane                         | Formål                                                                   | Belastning                            | Brukes til                                                             |
| ---------------------------- | ------------------------------------------------------------------------ | ------------------------------------- | ---------------------------------------------------------------------- |
| `GET /healthz`               | Livssyklusstatus for liveness/readiness (`ok` / `starting` / `stopping`) | Minimal (kun faseflagg)               | Kubernetes-**readiness**; lettvekts-**liveness** hvis du må bruke HTTP |
| `GET /api/monitoring/health` | Detaljert system- og leverandørsammendrag (DB, heap, katalogantall, …)   | Tung (synkront DB-/overvåkingsarbeid) | Dashbord, detaljerte blackbox-sjekker, Dockers innebygde helsesjekk    |

> **Merk:** Helsestatusmatriser for leverandører, autopilotproblemer, kvoteovervåking, tokenhelse og latensdetaljer utover `/api/monitoring/health` er tilgjengelige via **MCP-verktøyet** `observability_snapshot` eller **dashbordsidene** — det finnes ingen dedikerte REST-ruter for disse.

Begge rutene kjører i den **samme Node-hendelsesløkken** som forespørselshåndteringen. En CPU-bundet kjøringsbane (omfattende katalogarbeid for `GET /v1/models`, komprimering av lang kontekst / tokenopptelling) kan forsinke **alle** HTTP-håndterere, inkludert `/healthz`. Opptatt hendelsesløkke ≠ død prosess. Prioriter å utbedre flaskehalsen; justering av sonder reduserer bare feilaktige termineringer.

### Lettvektssonde for orkestrator

```bash
GET /healthz
# eller HEAD /healthz
```

- **200** + innholdet `ok` når serverens livssyklusfase er klar
- **503** + `starting` / `stopping` under oppstart eller avslutning
- Implementasjon: `src/app/healthz/route.ts` (ingen DB-ping)

### Systemhelse (detaljert)

```bash
GET /api/monitoring/health
```

Respons:

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

#### `credentialHealth`: sondebuffer kontra SQLite-`test_status`

`GET /api/monitoring/health` → `credentialHealth` er **måleverdien fra sondebufferet i minnet**,
ikke en direkte dump av `provider_connections.test_status`. Etter #12532 leser
forespørselsbanen bare `getCachedCredentialHealthSummary()`; bakgrunnssonder
oppdaterer bufferet utenfor hendelsesløkken.

| Lag                              | Hvor                                                                  | Hva det betyr                                                                                                                                                                                                |
| -------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Måleverdi fra sondebuffer        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | De siste resultatene fra helsesonder for legitimasjon som fortsatt finnes i prosessminnet. `source` er alltid `probe-cache`.                                                                                 |
| Detaljer om mislykket tilkobling | `credentialHealth.failedConnections`                                  | Finnes **bare når `failed > 0`**. Begrenset liste over bufferrader med `status=error` (`connectionId`, `status`, renset `lastError` / `lastErrorType`). `failedOmitted` angis når listen er blitt begrenset. |
| Vedvarende SQLite-status         | `credentialHealth.staleDbNonOkCount`                                  | Antall **aktive** (`is_active=1`) tilkoblingsrader der den lagrede `test_status` har en kjent ikke-ok-verdi (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).               |

De to lagene kan med hensikt være uenige:

- Måleverdien er `failed=0` mens `staleDbNonOkCount>0` — SQLite har fortsatt en vedvarende
  `test_status` (for eksempel `expired` eller `credits_exhausted`) som det nyeste
  øyeblikksbildet i sondebufferet ikke teller som `status=error`.
- Måleverdien er `failed>0` mens SQLite ser frisk ut — en nylig sonde mislyktes og er
  bufret; DB-raden er ikke oppdatert eller ble senere nullstilt.

Ikke utløse varsler utelukkende basert på `provider_connections.test_status` når dette
endepunktet avleses. Bruk `failed` + `failedConnections` for aktuelle sondefeil og
`staleDbNonOkCount` når du trenger antallet vedvarende statusverdier som ikke er ok.

### Anbefalinger for Kubernetes-sonder

OmniRoute er en **enkeltstående Node-prosess** (én hendelsesløkke). Standardoppsettet for Docker `HEALTHCHECK` bruker det lettvektige endepunktet `/healthz`. `/api/monitoring/health` er **for tungt** for kubelets liveness-intervaller.

| Probe                  | Anbefalt mål                                                                        | Merknader                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Oppstart**           | HTTP `GET /healthz` med høy `failureThreshold` (eller lang `startPeriod`)           | Kaldstart + SQLite-migrering kan ta mer enn noen få sekunder                                                                                                                                                                                                                                                                                                               |
| **Beredskap**          | HTTP `GET /healthz`                                                                 | Livssyklus `ok` / `starting` / `stopping` (200 kontra 503). Kan fortsatt veksle hvis løkken blokkeres av CPU-belastning. En **200 som tar flere sekunder, er ikke et tegn på god helse** (#10303) — det betyr at hendelsesløkken ikke fikk kjøretid før behandleren på 3 byte ble kjørt                                                                                    |
| **Driftssjekk**        | HTTP `GET /livez`, **eller TCP** på hovedtjenestens port (`PORT`, standard `20128`) | `/livez` sjekker bare om prosessen kjører (alltid 200 hvis behandleren kjører). Den deler fortsatt hendelsesløkken — opptatt ≠ død, og den oppdager ikke blokkering av hendelsesløkken (#10303) bedre enn TCP. Foretrekk **TCP** hvis HTTP-prober får tidsavbrudd under katalog-/komprimeringsbelastning; **ikke** avslutt poden ved korte stopp i hendelsesløkken uansett |
| **Grundig helsesjekk** | `GET /api/monitoring/health` fra en ekstern kontrolltjeneste                        | Ikke for kubelets `livenessProbe` / hyppige `readinessProbe`                                                                                                                                                                                                                                                                                                               |

Eksempel på oppsett (tilpass tersklene etter belastningen ved kaldstart og komprimering):

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
  # Når hendelsesløkken stopper opp, kan HTTP /livez fortsatt få tidsavbrudd. TCP er det
  # konservative alternativet:
  # tcpSocket:
  #   port: http
```

**Ikke** rett kubelets **driftssjekk** mot `/api/monitoring/health`. Denne banen utfører reelt database-/overvåkingsarbeid og vil gi falske positiver under belastning.

Relatert: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (prober mens hendelsesløkken er opptatt), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (katalogprising beslaglegger ressurser), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (telling av komprimeringstokens beslaglegger ressurser).

### systemd-vakthund (fastlåst hendelsesløkke)

På en systemd-vert varsler OmniRoute tjenestebehandleren når den er klar, og fortsetter å sende signaler til den, slik at en server med en fastlåst hendelsesløkke blir avsluttet og startet på nytt i stedet for å fortsette å kjøre uten å svare. Signalene kommer fra serverens egen hendelsesløkke: Når den blokkeres, stopper signalene, og systemd starter tjenesten på nytt når `WatchdogSec` har gått uten et signal.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) oppretter allerede en brukerenhet med dette. En enhet du skriver selv (med standardverdien `Type=simple`), får ingen vakthund, så legg til disse linjene i enhetens `[Service]`-seksjon:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Den genererte enheten angir `Restart=on-failure`, så legg også til den linjen — uten den avslutter vakthunden bare den fastlåste tjenesten i stedet for å starte den på nytt.

- `Type=notify`: Tjenesten regnes som «startet» når serveren sender `READY=1`, ikke når prosessen forgrenes. `TimeoutStartSec` setter en grense for en treg oppstart.
- `NotifyAccess=all`: Signalene sendes av serverprosessen, som er en underprosess av `omniroute serve`-overvåkeren.
- `WatchdogSec`: Signaler sendes hvert 60. sekund, så bruk **120 eller mer**. Lavere verdier vil starte en frisk server på nytt.
- Kjør `omniroute serve` i forgrunnen. `--daemon` kobler serveren fra enhetens cgroup, og varslingshåndtrykket fullføres aldri.

Kontroller at den er aktiv etter en omstart:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` viser den konfigurerte forsinkelsen, og `WatchdogTimestamp` flyttes fremover hvert minutt. En omstart utløst av vakthunden registreres som `Result=watchdog`. Hvis du vil slå av signalene uten å endre enheten, angir du `OMNIROUTE_DISABLE_SD_NOTIFY=1`; uten en `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) sendes ingenting.

Vakthunden kontrollerer bare at hendelsesløkken fortsetter å kjøre. En server som er treg, men fortsatt gjør fremskritt, startes ikke på nytt.

### Valgfritt arbeid i forespørselsbanen (minne, ferdigheter, tokenoppdatering)

Minneuttrekking, ferdighetsinjisering og oppdatering av OAuth-token deler **Node-hovedhendelsessløyfen** med `/healthz`. Dette er funksjoner som kan slås av og på i dashbordet (`memoryEnabled`, `skillsEnabled`), ikke en arbeiderpool. Se [Miljø — kostnad for hendelsessløyfen](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Leverandørstatus

> **Ingen REST-endepunkt.** Statusdata for leverandører er tilgjengelig via MCP-verktøyet `observability_snapshot` eller dashbordsiden `/dashboard/providers`.

### Leverandørdetaljer

> **Ingen REST-endepunkt.** Detaljer per leverandør er tilgjengelige via dashbordsiden `/dashboard/providers`.

---

## Autopilot for leverandørhelse

Modulen `providerHealthAutopilot.ts` er et **selvhelbredende system** som:

1. Oppdager leverandørproblemer (åpen kretsbryter, nedkjølingsperioder, sperringer, kvotevarsler)
2. Genererer **anbefalte handlinger** for å løse dem
3. Kan **utføre handlinger med lav risiko automatisk**

### Oppdagede problemtyper

| Problemtype                  | Alvorlighetsgrad | Eksempel på tilstand                       |
| ---------------------------- | ---------------- | ------------------------------------------ |
| `provider_circuit_open`      | kritisk          | Kretsbryter åpen etter 5 feil              |
| `provider_circuit_half_open` | advarsel         | Kretsen tester gjenoppretting              |
| `connection_cooldown`        | advarsel         | Tilkobling i nedkjøling etter 429          |
| `stale_connection_error`     | advarsel         | Siste oppdatering feilet for 30+ min siden |
| `terminal_connection_error`  | kritisk          | OAuth tilbakekalt, ugyldig nøkkel          |
| `inactive_connection`        | info             | Tilkobling deaktivert i innstillingene     |
| `model_lockout`              | advarsel         | Bestemt modell i karantene                 |
| `quota_monitor_warning`      | advarsel         | Kvotebruk på 80 % eller mer                |

### Genererte handlingstyper

| Handling                       | Risiko  | Beskrivelse                              |
| ------------------------------ | ------- | ---------------------------------------- |
| `clear_provider_breaker`       | middels | Tilbakestill kretsbryteren til lukket    |
| `clear_connection_cooldown`    | lav     | Fjern nedkjølingen fra en tilkobling     |
| `clear_stale_connection_error` | lav     | Fjern flagget for foreldet feil          |
| `clear_model_lockout`          | lav     | Aktiver en modell i karantene på nytt    |
| `reactivate_connection`        | middels | Aktiver en deaktivert tilkobling på nytt |
| `deactivate_connection`        | høy     | Deaktiver en problematisk tilkobling     |

### API

> **Ingen REST-endepunkt.** Autopilot-problemer er tilgjengelige via MCP-verktøyet `observability_snapshot` eller kontrollpanelet. Autopiloten kjører internt. Virkemåten konfigureres via innstillingsdatabasen (`autopilotMode`-feltet per tilkobling), ikke miljøvariabler — `grep -rn` etter en miljøvariabel for autopilotmodus gir ingen treff.

### Autopilotmodus

Autopiloten kjører som standard i **manuell modus** — den oppdager problemer og genererer anbefalte handlinger, men bruker dem ikke automatisk. Handlinger kan utføres via kontrollpanelet.

---

## Autopilot for kombinasjonshelse

`comboHealthAutopilot.ts` er den **kombinasjonsspesifikke** motsvarigheten til leverandørautopiloten. Den:

- Oppdager kombinasjoner med dårlig helsetilstand
- Anbefaler ny rekkefølge for mål
- Foreslår å deaktivere defekte mål
- Fjerner utilgjengelige mål automatisk etter N feil

### Eksempler på kombinasjonsproblemer

```
Kombinasjon "always-on" (prioritetsstrategi)
├─ Mål 1: openai/gpt-5 (frisk)
├─ Mål 2: anthropic/claude-opus-4-6 (⚠️ modell sperret frem til 14:00)
└─ Mål 3: kiro/claude-sonnet-4-5 (frisk)

Anbefalt handling: Endre rekkefølgen — flytt kiro over anthropic frem til sperringen utløper
```

---

## Kvotemonitorer

`observability.ts` eksponerer **kvotemonitorer per økt** for abonnementsleverandører (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0–100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Betydning av statuser

| Status      | Når                                | Handling i brukergrensesnittet      |
| ----------- | ---------------------------------- | ----------------------------------- |
| `starting`  | Første kontroll pågår              | Lasteindikator                      |
| `idle`      | Ingen nylig aktivitet              | Skjult fra kontrollpanelet          |
| `healthy`   | Mer enn 50 % av kvoten gjenstår    | Grønn prikk                         |
| `warning`   | Mindre enn 50 % av kvoten gjenstår | Gult varsel                         |
| `exhausted` | Kvoten er 0 %                      | Rød blokk, rut til neste leverandør |
| `error`     | Kontroll mislyktes                 | Rød prikk, prøv igjen snart         |

### API

> **Ingen REST-endepunkt.** Data fra kvotemonitoren er tilgjengelige via MCP-verktøyet `observability_snapshot` eller kontrollpanelet.

---

## Observerbarhetsøyeblikksbilde

MCP-verktøyet `observability_snapshot` returnerer et **fullstendig systemøyeblikksbilde** for AI-agenter:

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

Agenter bruker dette til å ta **rutingsbeslutninger** – for eksempel «hvis kretsen til openai er åpen, rut først til anthropic».

---

## Kontroll av tokenhelse

OAuth-leverandører (Claude Code, GitHub Copilot, Cursor) trenger **periodisk tokenoppdatering**. `src/lib/tokenHealthCheck.ts` kjører en bakgrunnsplanlegger:

- **Kontrollsyklus**: hvert 60. sekund (kontroll i `TICK_MS = 60 * 1000` i `src/lib/tokenHealthCheck.ts:30`)
- **Intervall for helsekontroll per tilkobling**: standardverdien er 60 minutter (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); kan konfigureres via innstillingsdatabasen
- **Proaktiv oppdatering ved 401**: håndteres av interceptoren for hver tilkobling

### Status for tokenhelse

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

### Konfigurasjon

Konfigurasjonen av kontrollen for tokenhelse håndteres internt av `tokenHealthCheck.ts`.

### Tokenhelse

> **Ingen REST-endepunkt.** Data om tokenhelse er tilgjengelig via kontrollpanelet eller MCP-verktøyet `observability_snapshot`.

---

## Varsling

### Innebygde kanaler

OmniRoute støtter **3 varslingskanaler**:

| Kanal               | Oppsett         | Bruksområde                 |
| ------------------- | --------------- | --------------------------- |
| Kontrollpanelbanner | Alltid aktivert | Varsler i appen             |
| Webhook             | Konfigurer URL  | Slack, Discord, PagerDuty   |
| Logg                | Standard        | For ekstern loggaggregering |

### Webhook-konfigurasjon

> **Merk:** Konfigurasjon av webhook-varsling håndteres via Innstillinger-siden i kontrollpanelet. Se innstillingsgrensesnittet for webhook-URL, hendelsesfiltrering og tilpasning av nyttelast.

### Varseltyper

| Varsel                       | Når                                                     | Standard alvorlighetsgrad |
| ---------------------------- | ------------------------------------------------------- | ------------------------- |
| `provider_circuit_open`      | Kretsen åpnes                                           | kritisk                   |
| `provider_circuit_half_open` | Kretsen tester gjenoppretting                           | informasjon               |
| `quota_warning`              | Kvoten er på 80 % eller mer                             | advarsel                  |
| `quota_exhausted`            | Kvoten er på 100 %                                      | kritisk                   |
| `token_refresh_failed`       | 3 eller flere påfølgende oppdateringsfeil               | advarsel                  |
| `token_expired`              | Tokenet har utløpt                                      | kritisk                   |
| `combo_target_unhealthy`     | Kombinasjonsmålet har vært i nedkjøling i 1 t eller mer | advarsel                  |
| `db_integrity_warning`       | FK-brudd > 0                                            | advarsel                  |
| `heap_pressure`              | Heap-bruk > 80 % av terskelen                           | advarsel                  |

---

## Ytelsesmålinger

### Sporede målinger

| Måling                  | Type      | Kilde                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | teller    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | teller    | `services/usage.ts`             |
| `cost_usd`              | teller    | `services/usage.ts`             |
| `provider_errors`       | teller    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | teller    | `services/resilience.ts`        |
| `cache_hits`            | teller    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | måler     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | måler     | `observability.ts`              |

### Latenspersentiler (p50/p95/p99)

> **Ingen REST-endepunkt.** Data om latenspersentiler er tilgjengelig via dashboardsiden `/dashboard/health`. Eksport til Prometheus/OpenTelemetry er planlagt for v3.9.

### Prometheus-/OpenTelemetry-eksport (fase 2)

Planlagt for v3.9: innebygd eksport til Prometheus, OpenTelemetry og Datadog.

Foreløpig kan `/api/monitoring/health` hentes av et hvilket som helst HTTP-basert overvåkingssystem (Prometheus blackbox exporter, Datadog HTTP check osv.).

---

## Oppskrifter for varsling

### Slack

> **Merk:** Webhook-varsling konfigureres via Innstillinger-siden i dashboardet – det finnes ingen dedikerte webhook-miljøvariabler (`grep -rn` gir null treff). Se brukergrensesnittet for Innstillinger for webhook-URL, hendelsesfiltrering og tilpasning av nyttelast.

### Discord

> Webhook-varsling bruker samme konfigurasjonsflyt i brukergrensesnittet for Innstillinger som Slack. Discord godtar samme format på JSON-nyttelasten.

### PagerDuty

> Webhook-varsling bruker samme konfigurasjonsflyt i brukergrensesnittet for Innstillinger. Rutingsnøkler for PagerDuty Events API v2 konfigureres i brukergrensesnittet for Innstillinger.

### Egendefinert webhook (JSON)

> Alle HTTP-endepunkter som godtar POST med JSON i forespørselskroppen, vil fungere. Konfigurer URL-en i brukergrensesnittet for Innstillinger.

---

## Konfigurasjon av dashboardet

### Tilpass helsedashboardet

Opprett `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fest en leverandør øverst

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Feilsøking

### «Leverandøren sier at tilstanden er god, men forespørsler mislykkes»

1. Kontroller **autopilot-problemene** – kanskje en modell er sperret
2. Se på **nylige feil** for den spesifikke feilklassen
3. Prøv **tilkoblingstesten** i leverandørkortet
4. Kontroller om leverandøren er **hastighetsbegrenset oppstrøms** (ikke synlig lokalt)

### «Kvoten sier at tilstanden er god, men jeg ser 429-feil»

- 429 betyr at leverandøren sier at du har brukt opp kvoten din
- OmniRoutes kvotesporing kan være **utdatert** – leverandørens data oppstrøms er fasiten
- Kvotedata oppdateres automatisk via den interne kvotemonitoren

### «Kombinasjonen mislykkes, men alle målene ser ut til å ha god tilstand»

- Sjekk dashboardet for **kombinasjonstilstand** for problemer med målrekkefølgen
- Se på **reservehendelser** – kanskje kombinasjonen bruker opp alternativene for raskt
- Kontroller at **strategien** passer til bruksområdet ditt (prioritet kontra round-robin kontra automatisk)

### «Tilstandskontrollen for databasen mislykkes»

- Kjør `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Hvis resultatet er «ok» – falsk alarm; tilstandskontrollen er for streng
- Hvis resultatet er noe annet – **stopp OmniRoute** og følg [veiledningen for katastrofegjenoppretting](./DATABASE_GUIDE.md#disaster-recovery)

### «Minneheap-belastningen er kritisk»

```bash
# Kontroller gjeldende heap
node -e "console.log(process.memoryUsage())"

# Utløs manuell GC (hvis --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduser antallet samtidige forespørsler (angi dette via Innstillinger-siden i dashboardet, ikke en miljøvariabel)
# Det finnes ingen `MAX_CONCURRENT_REQUESTS`-miljøvariabel – konfigurer dette under Innstillinger → Samtidighet.
```

---

## Se også

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — sporing av bruk og kostnader
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — databaseskjema og -helse
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy-helse (separat hurtigbuffer)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — systemarkitektur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detaljer om kretsbryter
- Kilde: `src/lib/monitoring/` (4 filer, 2121 kodelinjer)
