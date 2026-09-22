# Monitoring & Observability Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute include monitoraggio dello stato integrato, pilota automatico dei provider, tracciamento delle quote e hook di osservabilità. Questa guida illustra la dashboard, gli avvisi e la risoluzione dei problemi.

**Fonti:**

- `src/lib/monitoring/observability.ts` — snapshot di osservabilità
- `src/lib/monitoring/comboHealthAutopilot.ts` — pilota automatico dello stato delle combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — pilota automatico dei provider
- `src/lib/monitoring/providerHealthMatrix.ts` — matrice dello stato dei provider
- `src/lib/localHealthCheck.ts` — controllo dello stato locale
- `src/lib/tokenHealthCheck.ts` — stato dell'aggiornamento dei token
- `src/lib/proxyHealth.ts` — cache dello stato del proxy (descritta in PROXY_GUIDE.md)

---

## Panoramica

OmniRoute dispone di **3 livelli di monitoraggio**:

```
┌──────────────────────────────────────────────────────────────┐
│  Livello 1: Stato del sistema (a livello di server)          │
│  ├─ localHealthCheck.ts — DB, porte, dipendenze native       │
│  ├─ db/healthCheck.ts — integrità, FK, artefatti orfani      │
│  └─ Dashboard: /dashboard/health                             │
├──────────────────────────────────────────────────────────────┤
│  Livello 2: Stato dei provider (resilienza per provider)     │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldown   │
│  ├─ providerHealthMatrix.ts — punteggi per provider/modello  │
│  └─ Dashboard: /dashboard/providers                          │
├──────────────────────────────────────────────────────────────┤
│  Livello 3: Osservabilità in tempo reale (snapshot runtime)  │
│  ├─ observability.ts — circuit breaker, sessioni, quota      │
│  ├─ tokenHealthCheck.ts — stato aggiornamento token OAuth    │
│  └─ Strumenti MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Pagine della dashboard

### `/dashboard/health` (Stato del sistema)

La dashboard principale dello stato mostra:

| Sezione                 | Contenuto visualizzato                                      |
| ----------------------- | ----------------------------------------------------------- |
| **Stato del server**    | Tempo di attività, versione, porta, connessioni attive      |
| **Database**            | Connessione, integrità, dimensione WAL, migrazioni recenti  |
| **Riepilogo provider**  | Numero di provider attivi e integri, circuit breaker aperti |
| **Monitor delle quote** | Sessioni attive, avvisi, quote esaurite                     |
| **Errori recenti**      | Ultimi 10 errori con stack trace                            |
| **Utilizzo risorse**    | Memoria, CPU, indicatore della pressione sull'heap          |

### `/dashboard/providers` (Stato dei provider)

Dashboard per provider:

| Colonna     | Descrizione                                                       |
| ----------- | ----------------------------------------------------------------- |
| Provider    | ID del provider + nome visualizzato                               |
| Stato       | Stato verde/giallo/rosso                                          |
| Circuito    | Stato aperto/chiuso/semiaperto                                    |
| Connessioni | Numero di connessioni, ultimo aggiornamento                       |
| Modelli     | Modelli disponibili, stato per modello                            |
| Costo       | Costo odierno, andamento su 7 giorni                              |
| Errori      | Numero di errori nelle ultime 24 ore, classe di errore principale |

Fai clic su un provider per visualizzare:

- Richieste recenti con dettaglio della latenza
- Punteggi dello stato per connessione
- Blocchi per modello
- Raccomandazioni del pilota automatico

### `/dashboard/quota` (Tracciamento delle quote)

Per ogni chiave API:

- Utilizzo corrente rispetto al limite (barra di avanzamento)
- Andamento della quota (grafico degli ultimi 30 giorni)
- Ora del prossimo ripristino
- Cronologia degli avvisi

### `/dashboard/combos` (Stato delle combo)

Per ogni combo:

- Strategia + destinazioni
- Stato per destinazione
- Eventi di fallback recenti
- Tasso di successo (24 ore, 7 giorni, 30 giorni)

---

## API di controllo dello stato

OmniRoute espone **due** endpoint HTTP per il controllo dello stato. Non sono intercambiabili per gli orchestratori.

| Percorso                     | Scopo                                                                                  | Carico                                         | Utilizzo                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `GET /healthz`               | Stato di attività/idoneità del ciclo di vita (`ok` / `starting` / `stopping`)          | Minimo (solo indicatore della fase)            | **Readiness** di Kubernetes; **liveness** non rigorosa se è necessario usare HTTP |
| `GET /api/monitoring/health` | Riepilogo approfondito del sistema e dei provider (DB, heap, conteggi del catalogo, …) | Elevato (attività sincrone su DB/monitoraggio) | Dashboard, controlli black-box approfonditi, healthcheck integrato di Docker      |

> **Nota:** Le matrici sullo stato dei provider, i problemi dell'autopilot, i monitor delle quote, lo stato dei token e i dettagli sulla latenza oltre a `/api/monitoring/health` sono disponibili tramite lo **strumento MCP** `observability_snapshot` o le pagine della **dashboard** — non esistono route REST dedicate.

Entrambe le route vengono eseguite sullo **stesso event loop di Node** che gestisce le richieste. Un percorso con utilizzo intensivo della CPU (elaborazione di un catalogo di grandi dimensioni tramite `GET /v1/models`, compressione di contesti lunghi/conteggio dei token) può ritardare **tutti** i gestori HTTP, incluso `/healthz`. Event loop occupato ≠ processo inattivo. È preferibile correggere il processo che monopolizza le risorse; la regolazione dei probe riduce soltanto le terminazioni errate.

### Probe leggero per orchestratori

```bash
GET /healthz
# oppure HEAD /healthz
```

- **200** + corpo `ok` quando la fase del ciclo di vita del server è pronta
- **503** + `starting` / `stopping` durante l'avvio o l'arresto
- Implementazione: `src/app/healthz/route.ts` (nessun ping al DB)

### Stato del sistema (approfondito)

```bash
GET /api/monitoring/health
```

Risposta:

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

#### `credentialHealth`: cache dei probe rispetto a `test_status` di SQLite

`GET /api/monitoring/health` → `credentialHealth` è l'**indicatore della cache in memoria dei probe**, non un dump in tempo reale di `provider_connections.test_status`. Dopo #12532, il percorso della richiesta legge soltanto `getCachedCredentialHealthSummary()`; i probe in background aggiornano la cache al di fuori dell'event loop.

| Livello                                 | Posizione                                                             | Significato                                                                                                                                                                                                                             |
| --------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Indicatore della cache dei probe        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Risultati più recenti dei probe sullo stato delle credenziali ancora conservati nella memoria del processo. `source` è sempre `probe-cache`.                                                                                            |
| Dettagli delle connessioni non riuscite | `credentialHealth.failedConnections`                                  | Presente **solo quando `failed > 0`**. Elenco limitato di righe della cache con `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` sanitizzati). `failedOmitted` viene impostato quando l'elenco è stato troncato. |
| Stato persistente di SQLite             | `credentialHealth.staleDbNonOkCount`                                  | Numero di righe di connessioni **attive** (`is_active=1`) il cui `test_status` persistente è un valore non-ok noto (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                   |

I due livelli possono divergere intenzionalmente:

- Indicatore `failed=0` mentre `staleDbNonOkCount>0` — SQLite conserva ancora un
  `test_status` persistente (ad esempio `expired` o `credits_exhausted`) che
  l'istantanea più recente della cache dei probe non conteggia come `status=error`.
- Indicatore `failed>0` mentre SQLite appare integro — un probe recente non è
  riuscito ed è memorizzato nella cache; la riga del DB non è stata aggiornata oppure è stata cancellata successivamente.

Non generare avvisi esclusivamente in base a `provider_connections.test_status` durante lo scraping di questo
endpoint. Utilizzare `failed` + `failedConnections` per gli errori dei probe in tempo reale e
`staleDbNonOkCount` quando è necessario il conteggio persistente degli stati non-ok.

### Raccomandazioni per i probe Kubernetes

OmniRoute è un **singolo processo Node** (un solo event loop). Il `HEALTHCHECK` Docker predefinito utilizza l'endpoint leggero `/healthz`. `/api/monitoring/health` è **troppo pesante** per gli intervalli di liveness di kubelet.

| Sonda                                  | Destinazione consigliata                                                                                   | Note                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Avvio**                              | HTTP `GET /healthz` con un `failureThreshold` elevato (o uno `startPeriod` ampio)                          | L'avvio a freddo e la migrazione SQLite possono richiedere più di qualche secondo                                                                                                                                                                                                                                                                                                                                                            |
| **Disponibilità**                      | HTTP `GET /healthz`                                                                                        | Ciclo di vita `ok` / `starting` / `stopping` (200 rispetto a 503). Può comunque oscillare se il ciclo è bloccato dalla CPU. Una risposta **200 dopo diversi secondi non indica uno stato integro** (#10303): significa che il ciclo degli eventi era privo di risorse prima che venisse eseguito l'handler da 3 byte                                                                                                                         |
| **Vitalità**                           | HTTP `GET /livez`, **oppure TCP** sulla porta del servizio principale (`PORT`, valore predefinito `20128`) | `/livez` indica soltanto che il processo è attivo (restituisce sempre 200 se l'handler viene eseguito). Condivide comunque il ciclo degli eventi: occupato ≠ morto e non rileva l'esaurimento delle risorse del ciclo degli eventi (#10303) meglio di TCP. Preferire **TCP** se le sonde HTTP scadono sotto il carico del catalogo/della compressione; in entrambi i casi, **non** terminare il pod per brevi blocchi del ciclo degli eventi |
| **Controllo approfondito dello stato** | `GET /api/monitoring/health` da un sistema di controllo esterno                                            | Non adatto a `livenessProbe` di kubelet o a `readinessProbe` con intervalli ravvicinati                                                                                                                                                                                                                                                                                                                                                      |

Esempio di configurazione (adattare le soglie al carico dell'avvio a freddo e della compressione):

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
  # Durante un blocco del ciclo degli eventi, anche HTTP /livez può scadere. TCP è
  # l'alternativa più prudente:
  # tcpSocket:
  #   port: http
```

**Non** indirizzare il controllo di **vitalità** di kubelet a `/api/monitoring/health`. Quel percorso esegue operazioni reali sul database e sul monitoraggio e, sotto carico, produrrà falsi positivi.

Correlati: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sonde mentre il ciclo degli eventi è occupato), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (consumo eccessivo di risorse per il calcolo dei prezzi del catalogo), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (consumo eccessivo di risorse per il conteggio dei token durante la compressione).

### Operazioni facoltative nel percorso delle richieste (memoria, competenze, aggiornamento dei token)

L'estrazione della memoria, l'iniezione delle competenze e l'aggiornamento dei token OAuth condividono il **ciclo degli eventi principale di Node** con `/healthz`. Sono funzionalità attivabili dalla dashboard (`memoryEnabled`, `skillsEnabled`), non un pool di worker. Consultare [Ambiente — costo del ciclo degli eventi](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Stato dei provider

> **Nessun endpoint REST.** I dati sullo stato dei provider sono disponibili tramite lo strumento MCP `observability_snapshot` o la pagina `/dashboard/providers` della dashboard.

### Dettagli del provider

> **Nessun endpoint REST.** I dettagli di ciascun provider sono disponibili tramite la pagina `/dashboard/providers` della dashboard.

---

## Autopilota per lo stato dei provider

Il modulo `providerHealthAutopilot.ts` è un **sistema autoriparante** che:

1. Rileva i problemi dei provider (circuito aperto, periodi di attesa, blocchi, avvisi relativi alla quota)
2. Genera **azioni consigliate** per risolverli
3. Facoltativamente **esegue automaticamente** le azioni a basso rischio

### Tipi di problemi rilevati

| Tipo di problema             | Gravità | Esempio di condizione                                |
| ---------------------------- | ------- | ---------------------------------------------------- |
| `provider_circuit_open`      | critica | Circuit breaker aperto dopo 5 errori                 |
| `provider_circuit_half_open` | avviso  | Il circuito sta verificando il ripristino            |
| `connection_cooldown`        | avviso  | Connessione in attesa dopo un errore 429             |
| `stale_connection_error`     | avviso  | Ultimo aggiornamento non riuscito da oltre 30 minuti |
| `terminal_connection_error`  | critica | OAuth revocato, chiave non valida                    |
| `inactive_connection`        | info    | Connessione disabilitata nelle impostazioni          |
| `model_lockout`              | avviso  | Modello specifico in quarantena                      |
| `quota_monitor_warning`      | avviso  | Utilizzo della quota pari o superiore all'80%        |

### Tipi di azioni generate

| Azione                         | Rischio | Descrizione                                     |
| ------------------------------ | ------- | ----------------------------------------------- |
| `clear_provider_breaker`       | medio   | Reimposta il circuit breaker sullo stato chiuso |
| `clear_connection_cooldown`    | basso   | Rimuove il periodo di attesa da una connessione |
| `clear_stale_connection_error` | basso   | Cancella l'indicatore di errore obsoleto        |
| `clear_model_lockout`          | basso   | Riabilita un modello in quarantena              |
| `reactivate_connection`        | medio   | Riabilita una connessione disattivata           |
| `deactivate_connection`        | alto    | Disabilita una connessione problematica         |

### API

> **Nessun endpoint REST.** I problemi dell'autopilota sono disponibili tramite lo strumento MCP `observability_snapshot` o la dashboard. L'autopilota viene eseguito internamente; il suo comportamento viene configurato tramite il DB delle impostazioni (campo `autopilotMode` per ogni connessione), non tramite variabili di ambiente — `grep -rn` per una variabile di ambiente relativa alla modalità autopilota non restituisce alcun risultato.

### Modalità autopilota

Per impostazione predefinita, l'autopilota opera in **modalità manuale**: rileva i problemi e genera azioni consigliate, ma non le applica automaticamente. Le azioni possono essere applicate tramite la dashboard.

---

## Autopilota per lo stato delle combo

`comboHealthAutopilot.ts` è l'equivalente **specifico per le combo** dell'autopilota dei provider. Il modulo:

- Rileva le combo non integre
- Consiglia il riordinamento delle destinazioni
- Suggerisce di disabilitare le destinazioni non funzionanti
- Rimuove automaticamente le destinazioni non operative dopo N errori

### Esempi di problemi delle combo

```
Combo "always-on" (strategia basata sulla priorità)
├─ Destinazione 1: openai/gpt-5 (integra)
├─ Destinazione 2: anthropic/claude-opus-4-6 (⚠️ modello bloccato fino alle 14:00)
└─ Destinazione 3: kiro/claude-sonnet-4-5 (integra)

Azione consigliata: riordinare — spostare kiro sopra anthropic fino alla scadenza del blocco
```

---

## Monitor delle quote

`observability.ts` espone **monitor delle quote per sessione** per i provider basati su abbonamento (Claude Code, Codex, GitHub Copilot):

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

### Significato degli stati

| Stato       | Quando                      | Azione dell'interfaccia utente                     |
| ----------- | --------------------------- | -------------------------------------------------- |
| `starting`  | Sondaggio iniziale in corso | Indicatore di caricamento                          |
| `idle`      | Nessuna attività recente    | Nascosto dalla dashboard                           |
| `healthy`   | Quota residua > 50%         | Punto verde                                        |
| `warning`   | Quota residua < 50%         | Avviso giallo                                      |
| `exhausted` | Quota = 0%                  | Blocco rosso, instradamento al provider successivo |
| `error`     | Sondaggio non riuscito      | Punto rosso, nuovo tentativo a breve               |

### API

> **Nessun endpoint REST.** I dati dei monitor delle quote sono disponibili tramite lo strumento MCP `observability_snapshot` o la dashboard.

---

## Snapshot di osservabilità

Lo strumento MCP `observability_snapshot` restituisce uno **snapshot completo del sistema** per gli agenti IA:

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
  "quotaMonitors": {/* vedi sopra */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Gli agenti lo utilizzano per prendere **decisioni di instradamento** — ad esempio, "se il circuito di openai è aperto, instrada prima verso anthropic".

---

## Controllo dell'integrità dei token

I provider OAuth (Claude Code, GitHub Copilot, Cursor) richiedono un **aggiornamento periodico dei token**. `src/lib/tokenHealthCheck.ts` esegue uno scheduler in background:

- **Ciclo di scansione**: ogni 60 secondi (scansione in `TICK_MS = 60 * 1000` in `src/lib/tokenHealthCheck.ts:30`)
- **Intervallo di controllo dell'integrità per connessione**: valore predefinito di 60 minuti (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configurabile tramite il database delle impostazioni
- **Aggiornamento preventivo in caso di 401**: gestito dall'intercettore di ciascuna connessione

### Stato di integrità dei token

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

### Configurazione

La configurazione del controllo dell'integrità dei token è gestita internamente da `tokenHealthCheck.ts`.

### Integrità dei token

> **Nessun endpoint REST.** I dati sull'integrità dei token sono disponibili tramite la dashboard o lo strumento MCP `observability_snapshot`.

---

## Avvisi

### Canali integrati

OmniRoute supporta **3 canali di avviso**:

| Canale           | Configurazione | Caso d'uso                         |
| ---------------- | -------------- | ---------------------------------- |
| Banner dashboard | Sempre attivo  | Notifiche all'interno dell'app     |
| Webhook          | Configura URL  | Slack, Discord, PagerDuty          |
| Log              | Predefinito    | Per l'aggregazione esterna dei log |

### Configurazione del webhook

> **Nota:** la configurazione degli avvisi tramite webhook è gestita mediante la pagina Impostazioni della dashboard. Consulta l'interfaccia delle Impostazioni per l'URL del webhook, il filtraggio degli eventi e la personalizzazione del payload.

### Tipi di avviso

| Avviso                       | Quando                                       | Gravità predefinita |
| ---------------------------- | -------------------------------------------- | ------------------- |
| `provider_circuit_open`      | Il circuito si apre                          | critica             |
| `provider_circuit_half_open` | Il circuito verifica il ripristino           | informativa         |
| `quota_warning`              | Quota all'80% o più                          | avviso              |
| `quota_exhausted`            | Quota al 100%                                | critica             |
| `token_refresh_failed`       | 3 o più errori di aggiornamento consecutivi  | avviso              |
| `token_expired`              | Il token ha superato la scadenza             | critica             |
| `combo_target_unhealthy`     | Target combinato in cooldown da almeno 1 ora | avviso              |
| `db_integrity_warning`       | Violazioni FK > 0                            | avviso              |
| `heap_pressure`              | Utilizzo dell'heap > 80% della soglia        | avviso              |

---

## Metriche delle prestazioni

### Metriche monitorate

| Metrica                 | Tipo       | Origine                         |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | contatore  | `services/usage.ts`             |
| `request_latency_ms`    | istogramma | `services/usage.ts`             |
| `tokens_consumed`       | contatore  | `services/usage.ts`             |
| `cost_usd`              | contatore  | `services/usage.ts`             |
| `provider_errors`       | contatore  | `services/errorClassifier.ts`   |
| `circuit_state_changes` | contatore  | `services/resilience.ts`        |
| `cache_hits`            | contatore  | `services/signatureCache.ts`    |
| `compression_savings`   | istogramma | `services/compression/stats.ts` |
| `quota_used`            | indicatore | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | indicatore | `observability.ts`              |

### Percentili di latenza (p50/p95/p99)

> **Nessun endpoint REST.** I dati sui percentili di latenza sono disponibili nella pagina `/dashboard/health` della dashboard. L'esportazione Prometheus/OpenTelemetry è prevista per la v3.9.

### Esportazione Prometheus / OpenTelemetry (fase 2)

Prevista per la v3.9: esportazione nativa verso Prometheus, OpenTelemetry e Datadog.

Per ora, esegui lo scraping di `/api/monitoring/health` con qualsiasi sistema di monitoraggio basato su HTTP (Prometheus blackbox exporter, controllo HTTP di Datadog, ecc.).

---

## Ricette per gli avvisi

### Slack

> **Nota:** gli avvisi tramite webhook vengono configurati nella pagina Impostazioni della dashboard: non esistono variabili di ambiente dedicate ai webhook (`grep -rn` non restituisce alcun risultato). Consulta l'interfaccia delle Impostazioni per l'URL del webhook, il filtraggio degli eventi e la personalizzazione del payload.

### Discord

> Gli avvisi tramite webhook utilizzano lo stesso flusso dell'interfaccia Impostazioni di Slack. Discord accetta la stessa struttura del payload JSON.

### PagerDuty

> Gli avvisi tramite webhook utilizzano lo stesso flusso dell'interfaccia Impostazioni. Le chiavi di routing dell'API PagerDuty Events v2 vengono configurate nell'interfaccia Impostazioni.

### Webhook personalizzato (JSON)

> Qualsiasi endpoint HTTP che accetti richieste POST con un corpo JSON funzionerà. Configura l'URL nell'interfaccia Impostazioni.

---

## Configurazione della dashboard

### Personalizzare la dashboard dello stato di salute

Crea un file `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fissare un provider in alto

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Risoluzione dei problemi

### "Il provider risulta integro, ma le richieste non riescono"

1. Controlla i **problemi dell'autopilota**: un modello potrebbe essere bloccato
2. Esamina gli **errori recenti** per la classe di errore specifica
3. Prova il **test di connessione** nella scheda del provider
4. Controlla se il provider è **soggetto a limitazione della frequenza a monte** (non visibile localmente)

### "La quota risulta regolare, ma vedo errori 429"

- 429 indica che, secondo il provider, hai esaurito la quota
- Il monitoraggio della quota di OmniRoute potrebbe **non essere aggiornato**: i dati effettivi del provider sono a monte
- I dati della quota vengono aggiornati automaticamente tramite il monitor interno della quota

### "La combinazione non funziona, ma tutte le destinazioni sembrano integre"

- Controlla la dashboard dello **stato di salute della combinazione** per individuare problemi nell'ordine delle destinazioni
- Esamina gli **eventi di fallback**: la combinazione potrebbe esaurire le opzioni troppo rapidamente
- Verifica che la **strategia** sia adatta al tuo caso d'uso (priorità, round-robin o automatica)

### "Il controllo dello stato di salute del database non riesce"

- Esegui `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Se restituisce "ok", si tratta di un falso allarme: il controllo dello stato di salute è troppo restrittivo
- Se restituisce qualsiasi altro valore, **arresta OmniRoute** e segui la [guida al ripristino di emergenza](./DATABASE_GUIDE.md#disaster-recovery)

### "La pressione sulla memoria heap è critica"

```bash
# Controlla l'heap corrente
node -e "console.log(process.memoryUsage())"

# Attiva manualmente il GC (se --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Riduci le richieste simultanee (configurale tramite la pagina Impostazioni della dashboard, non mediante una variabile di ambiente)
# Non esiste alcuna variabile di ambiente `MAX_CONCURRENT_REQUESTS`: configurala in Impostazioni → Concorrenza.
```

---

## Vedi anche

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — monitoraggio dell'utilizzo e dei costi
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schema del DB + stato
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — stato del proxy (cache separata)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — architettura del sistema
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — dettagli sul circuit breaker
- Sorgente: `src/lib/monitoring/` (4 file, 2121 righe di codice)
