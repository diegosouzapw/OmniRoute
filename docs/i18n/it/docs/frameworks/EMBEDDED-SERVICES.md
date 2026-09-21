# Embedded Services (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versione:** v3.8.44
> **Ultimo aggiornamento:** 2026-07-03
> **Destinatari:** Ingegneri che aggiungono, mantengono o eseguono il debug di servizi integrati (9Router, CLIProxyAPI, Mux, Bifrost).

I servizi integrati sono strumenti sidecar di processo installati localmente che OmniRoute installa, supervisiona ed
espone come destinazioni di routing di prima classe. A differenza dei provider esterni (raggiunti tramite Internet
mediante chiavi API), i servizi integrati vengono eseguiti sulla stessa macchina di OmniRoute e comunicano tramite loopback.

---

## Indice

1. [Panoramica](#1-overview)
2. [Architettura — 4 livelli](#2-architecture--4-layers)
3. [Macchina a stati del ciclo di vita](#3-lifecycle-state-machine)
4. [Riferimento API](#4-api-reference)
5. [Sicurezza](#5-security)
6. [Aggiunta di un nuovo servizio integrato](#6-adding-a-new-embedded-service)
7. [Risoluzione dei problemi](#7-troubleshooting)
8. [Domande frequenti](#8-faq)

---

## 1. Panoramica

### Perché i servizi integrati?

Sono integrati cinque servizi:

| Servizio        | Pacchetto npm                             | Porta predefinita | Scopo                                                                                                                                                                                                                  |
| --------------- | ----------------------------------------- | :---------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                 |       20130       | Router IA che OmniRoute può utilizzare come provider secondario. Modelli esposti come `9router/{sub}/{model}`                                                                                                          |
| **CLIProxyAPI** | Binario della release GitHub (`cliproxy`) |       8317        | Adattatore proxy locale per i flussi di autenticazione della CLI Anthropic. Fornisce un routing di fallback quando i token OAuth scadono                                                                               |
| **Mux**         | `mux` (`mux server` headless)             |       8322        | Demone locale per l'orchestrazione degli agenti (coder/mux). Sottoposto esclusivamente alla gestione del ciclo di vita — non è una destinazione di routing (nessun proxy LLM).                                         |
| **Bifrost**     | `@maximhq/bifrost`                        |       8080        | Backend di inoltro per gateway IA in Go. Quando è in esecuzione, viene selezionato automaticamente dalla rotta di inoltro (`/v1/relay/`)                                                                               |
| **Dario**       | `@askalf/dario`                           |       3456        | Proxy per l'abbonamento Claude — alternativa/failover a CLIProxyAPI per il traffico nel formato Claude Code; la chiave inserita diventa `DARIO_ADMIN_TOKEN` e protegge il relativo piano di controllo OAuth `/admin/*` |

Tutti e cinque seguono lo stesso modello di supervisione:

- OmniRoute li installa in `DATA_DIR/services/{name}/` (isolati dal `package.json` di OmniRoute)
- OmniRoute li avvia e li monitora come processi figlio
- OmniRoute inserisce una chiave API effimera nell'ambiente del processo figlio e la ruota senza tempi di inattività (ove applicabile)
- Tutte le route di gestione (`/api/services/*`) sono **LOCAL_ONLY** — accessibili esclusivamente dal loopback (regola rigida n. 17)

### Decisioni principali (dal piano di progettazione)

| Decisione                                                        | Valore                                                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Accesso dalla dashboard all'interfaccia utente nativa di 9Router | Proxy inverso in `/dashboard/providers/services/9router/embed/*`                                       |
| Meccanismo di installazione                                      | `npm install {package}` tramite `execFile` (senza interpolazione della shell)                          |
| Modalità di utilizzo                                             | Provider registrato come `9router/{sub}/{model}` nel motore di routing                                 |
| Gestione delle chiavi API                                        | OmniRoute le genera, le crittografa a riposo (AES-256-GCM) e le inserisce tramite variabili d'ambiente |
| Posizione nella dashboard                                        | `/dashboard/providers/services` (tre schede)                                                           |
| Avvio automatico                                                 | Opzione configurabile per ogni servizio, disattivata per impostazione predefinita                      |

---

## 2. Architettura — 4 livelli

```
┌────────────────────────────────────────────────────────────────────┐
│  Livello 1 — UI                                                    │
│  /dashboard/providers/services  (schede: CLIProxyAPI | 9Router | Mux)│
│  Log in tempo reale (SSE), Avvia/Arresta/Riavvia/Aggiorna, Impostazioni, Installa│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Contenitore + instradamento schede tramite ?tab=│
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (fetch di Next.js)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Livello 2 — API (LOCAL_ONLY — solo loopback)                      │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (proxy HTTP inverso + WebSocket → upstream 9Router)             │
│                                                                    │
│  Controllo: LOCAL_ONLY_API_PREFIXES include "/api/services/" e     │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ chiamate interne al processo
┌──────────────────────▼─────────────────────────────────────────────┐
│  Livello 3 — ServiceSupervisor (src/lib/services/)                 │
│                                                                    │
│  ServiceSupervisor.ts   Supervisore generico (child_process.spawn) │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── porta:      20130 per 9Router (configurabile)               │
│    ├── log:        buffer circolare stdio da 5 MB → eventi SSE     │
│    ├── stato:      HTTP GET /health ogni 2–5 s, ripristino differito│
│    └── ciclo di vita: SIGTERM 15 s → SIGKILL                       │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Inizializza tutti i SERVICES[] all'avvio del processo│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       GET /v1/models periodico → tabella service_models│
│  ringBuffer.ts      Buffer circolare dei log (5 MB per servizio)   │
│  healthCheck.ts     Verifica periodica dello stato tramite HTTP    │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (adattatori di installazione)                 │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP compatibile con OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Livello 4 — Provider / Instradamento                              │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Recupera nuovamente porta e chiave API per ogni richiesta (senza cache).│
│    Rimuove il prefisso "9router/" dall'ID del modello prima dell'inoltro.│
│    Restituisce 503 service_not_running se il supervisore non è nello stato "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Voce per "9router": isEmbeddedService: true                     │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modelli memorizzati come "9router/{sub}/{model}" (con prefisso).│
│    Sincronizzati ogni 5 min da modelSync.ts.                       │
│                                                                    │
│  Mux è gestito SOLO a livello di ciclo di vita (Livelli 1-3): è un │
│  daemon di orchestrazione degli agenti, non un proxy LLM, quindi   │
│  non dispone di un executor/provider di Livello 4 e non è mai una  │
│  destinazione di instradamento.                                    │
└────────────────────────────────────────────────────────────────────┘
```

### File sorgente principali

| File                                        | Ruolo                                                                |
| ------------------------------------------- | -------------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Classe principale: ciclo di vita, lock, stato, ring buffer           |
| `src/lib/services/bootstrap.ts`             | Registrazione a livello di processo e avvio automatico               |
| `src/lib/services/registry.ts`              | Mappa singleton `strumento → supervisore`                            |
| `src/lib/services/apiKey.ts`                | Generazione delle chiavi, crittografia AES-256-GCM dei dati inattivi |
| `src/lib/services/modelSync.ts`             | Sincronizzazione periodica dei modelli (5 min) + su richiesta        |
| `src/lib/services/ringBuffer.ts`            | Buffer circolare dei log da 5 MB con sottoscrizione SSE              |
| `src/lib/services/healthCheck.ts`           | Sonda di integrità HTTP (intervallo configurabile)                   |
| `src/lib/services/installers/ninerouter.ts` | Installazione/aggiornamento/disinstallazione npm per 9Router         |
| `src/lib/services/installers/cliproxy.ts`   | Installazione/aggiornamento/disinstallazione npm per CLIProxyAPI     |
| `src/lib/services/installers/mux.ts`        | Installazione/aggiornamento/disinstallazione npm per Mux             |
| `src/app/api/services/9router/_lib.ts`      | Funzione di supporto `getOrInitSupervisor()`                         |
| `src/app/api/services/[name]/logs/route.ts` | Endpoint condiviso per i log SSE                                     |
| `open-sse/executors/ninerouter.ts`          | Esecutore del provider (livello 4)                                   |

---

## 3. Macchina a stati del ciclo di vita

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
              probe di integrità ok │         arresto anomalo / SIGTERM
                               ┌────▼─────┐  (uscita entro 5 s) │
                               │ running  │─ arresto anomalo ──►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Gli stati vengono archiviati nella tabella DB `version_manager` (colonna `status`) e replicati
nello stato in memoria di `ServiceSupervisor`. Lo stato in memoria è autorevole per
un processo in esecuzione; lo stato del DB è il fallback persistente all'avvio.

### Transizioni di stato

| Da              | Evento                                       | A                                |
| --------------- | -------------------------------------------- | -------------------------------- |
| `not_installed` | `install()` riesce                           | `stopped`                        |
| `stopped`       | viene chiamato `start()`                     | `starting`                       |
| `starting`      | il probe di integrità restituisce 200        | `running`                        |
| `starting`      | il processo termina prima di essere integro  | `error`                          |
| `running`       | viene chiamato `stop()`                      | `stopping` → `stopped`           |
| `running`       | il processo termina inaspettatamente (< 5 s) | `error` (arresto anomalo rapido) |
| `running`       | il processo termina inaspettatamente (> 5 s) | `error`                          |
| `error`         | viene chiamato `start()`                     | `starting`                       |
| qualsiasi       | `stop()` durante `stopping`                  | nessuna operazione               |

### Blocco delle operazioni

`ServiceSupervisor` serializza le operazioni del ciclo di vita mediante un blocco asincrono
delle operazioni (`withLock()`). Le chiamate simultanee a `start()` sullo stesso supervisore
determinano esattamente un solo avvio del processo; il secondo chiamante attende e restituisce
lo stato esistente. Ciò evita condizioni di competizione quando, ad esempio, l'avvio automatico
e un pulsante dell'interfaccia utente vengono attivati contemporaneamente.

---

## 4. Riferimento API

Tutte le route sotto `/api/services/` sono **LOCAL_ONLY** (solo loopback, regola rigida n. 17).
Le richieste non provenienti dal loopback ricevono `403 LOCAL_ONLY` indipendentemente dal token di autenticazione.

### 4.1 Endpoint di 9Router (11 route)

#### `POST /api/services/9router/install`

Installa 9Router da npm. Crea `DATA_DIR/services/9router/` con i propri
`package.json` e `node_modules/`. Non entra in conflitto con le dipendenze di OmniRoute.

**Corpo della richiesta** (tutti i campi sono facoltativi):

```json
{ "version": "latest" }
```

| Campo     | Tipo     | Valore predefinito | Descrizione                                |
| --------- | -------- | ------------------ | ------------------------------------------ |
| `version` | `string` | `"latest"`         | Tag di versione npm o semver da installare |

**Risposte:**

| Stato | Descrizione                                                                 |
| ----- | --------------------------------------------------------------------------- |
| `200` | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                      |
| `400` | Corpo della richiesta non valido (validazione Zod fallita)                  |
| `409` | Installazione già in corso (blocco acquisito)                               |
| `500` | Installazione npm fallita — vedere `message` per un messaggio comprensibile |

**Note:** utilizza `execFile('npm', [...])` — nessuna shell, nessuna interpolazione (regola rigida n. 13).
Gli errori EACCES vengono presentati come messaggi comprensibili.

---

#### `POST /api/services/9router/start`

Avvia 9Router. Registra un supervisore se non è già registrato, quindi chiama
`supervisor.start()`. È idempotente se il servizio è già in esecuzione.

**Corpo della richiesta:** nessuno

**Risposte:**

| Stato | Descrizione                                              |
| ----- | -------------------------------------------------------- |
| `200` | Oggetto `ServiceStatus` (vedere lo schema seguente)      |
| `409` | 9Router non è installato (`status: "not_installed"`)     |
| `503` | Avvio fallito (errore del processo — vedere `lastError`) |

**Schema ServiceStatus:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Arresta 9Router in modo controllato. Invia SIGTERM, attende 15 s, quindi invia SIGKILL se il processo è ancora attivo.
È idempotente se il servizio è già arrestato.

**Corpo della richiesta:** nessuno

**Risposte:**

| Stato | Descrizione                        |
| ----- | ---------------------------------- |
| `200` | `ServiceStatus` (stato: "stopped") |
| `503` | Arresto fallito in modo imprevisto |

---

#### `POST /api/services/9router/restart`

Equivale a `stop()` seguito da `start()` all'interno del blocco delle operazioni.

**Corpo della richiesta:** nessuno

**Risposte:** uguali a `start` (restituisce il `ServiceStatus` finale).

---

#### `POST /api/services/9router/update`

Aggiorna 9Router a una versione npm più recente. Se il servizio è in esecuzione, viene prima
arrestato, viene eseguita l'installazione npm (installando la versione più recente sul posto)
e infine il servizio viene riavviato.

**Corpo della richiesta** (tutti i campi sono facoltativi):

```json
{ "version": "latest" }
```

**Risposte:**

| Stato | Descrizione                                                     |
| ----- | --------------------------------------------------------------- |
| `200` | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400` | Corpo non valido                                                |
| `500` | Aggiornamento npm fallito                                       |

---

#### `POST /api/services/9router/rotate-key`

Genera una nuova chiave API per 9Router, la crittografa a riposo e riavvia il servizio
(se in esecuzione) affinché acquisisca la nuova chiave dal proprio ambiente. La vecchia chiave viene
invalidata immediatamente.

**Corpo della richiesta:** nessuno

**Risposte:**

| Stato | Descrizione                                |
| ----- | ------------------------------------------ |
| `200` | `{ keyRotated: true, restarted: boolean }` |
| `500` | Rotazione non riuscita                     |

**Sicurezza:** la nuova chiave non viene mai restituita nella risposta (nessuna fuga di credenziali).
Viene archiviata in forma crittografata (AES-256-GCM) nella tabella `version_manager`.

---

#### `GET /api/services/9router/status`

Restituisce lo stato combinato in tempo reale e dal DB, inclusi i metadati della versione e l'anteprima della chiave API.

**Risposte:**

| Stato | Descrizione                      |
| ----- | -------------------------------- |
| `200` | Vedere lo schema seguente        |
| `500` | Lettura dello stato non riuscita |

**Schema della risposta:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Attiva o disattiva l'avvio automatico. Quando `enabled: true`, il servizio si avvia automaticamente
al successivo avvio di OmniRoute (se il servizio è installato).

**Corpo della richiesta:**

```json
{ "enabled": true }
```

**Risposte:**

| Stato | Descrizione           |
| ----- | --------------------- |
| `200` | `{ autoStart: true }` |
| `400` | Corpo non valido      |

---

#### `GET /api/services/9router/logs`

Flusso SSE dei log in tempo reale dal buffer circolare stdout/stderr di 9Router.

**Parametri di query:**

| Parametro | Tipo      | Predefinito | Descrizione                                                                                            |
| --------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `tail`    | `integer` | 200         | Numero di righe storiche da inviare inizialmente (massimo 1000)                                        |
| `filter`  | `string`  | nessuno     | Filtro per sottostringa senza distinzione tra maiuscole e minuscole (senza regex — resistente a ReDoS) |

**Eventi SSE:**

| Evento      | Dati        | Descrizione                |
| ----------- | ----------- | -------------------------- |
| `snapshot`  | `LogLine[]` | Coda storica iniziale      |
| `log`       | `LogLine`   | Riga di log in tempo reale |
| `heartbeat` | `{}`        | Keep-alive ogni 15 s       |

**Schema LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Risposte:**

| Stato | Descrizione                                       |
| ----- | ------------------------------------------------- |
| `200` | `text/event-stream`                               |
| `400` | Parametro `filter` troppo lungo (> 200 caratteri) |
| `404` | Servizio non trovato (supervisore non registrato) |

---

### 4.2 Endpoint CLIProxyAPI (10 route)

CLIProxyAPI presenta la stessa struttura degli endpoint di 9Router, escluso `rotate-key`, più
`accounts`, `provider-expose` e `auto-restart-adopted`. Ora riceve una chiave API
dedicata per il piano dati, inserita all'avvio (`needsApiKey: true` in
`bootstrap.ts`, utilizzata per la sincronizzazione dei modelli); `status` include meno campi.

| Metodo | Percorso                            | Descrizione                                      |
| ------ | ----------------------------------- | ------------------------------------------------ |
| `POST` | `/api/services/cliproxy/install`    | Installa CLIProxyAPI da npm                      |
| `POST` | `/api/services/cliproxy/start`      | Avvia CLIProxyAPI                                |
| `POST` | `/api/services/cliproxy/stop`       | Arresta CLIProxyAPI                              |
| `POST` | `/api/services/cliproxy/restart`    | Riavvia CLIProxyAPI                              |
| `POST` | `/api/services/cliproxy/update`     | Aggiorna a una versione più recente              |
| `GET`  | `/api/services/cliproxy/status`     | Stato in tempo reale + DB (senza `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Attiva o disattiva l'avvio automatico            |

L'endpoint condiviso `GET /api/services/{name}/logs` (vedere §4.1) funziona per tutti
e quattro i servizi utilizzando il segmento dinamico `[name]`.

---

### 4.3 Endpoint Mux (8 route)

Mux presenta la stessa struttura degli endpoint di CLIProxyAPI: nessuna route `rotate-key` nella
superficie API (il bearer token viene generato allo stesso modo di quello di 9Router tramite
`getOrCreateApiKey("mux")` e inserito tramite la variabile di ambiente `MUX_SERVER_AUTH_TOKEN`, ma
non è ancora disponibile un endpoint dedicato alla rotazione). Mux è soggetto esclusivamente alla gestione del ciclo di vita: a differenza
di 9Router, non dispone di un esecutore Layer 4 e non viene mai registrato come provider di routing.

| Metodo | Percorso                       | Descrizione                             |
| ------ | ------------------------------ | --------------------------------------- |
| `POST` | `/api/services/mux/install`    | Installa Mux da npm (`npm i mux`)       |
| `POST` | `/api/services/mux/start`      | Avvia Mux (`mux server`)                |
| `POST` | `/api/services/mux/stop`       | Arresta Mux                             |
| `POST` | `/api/services/mux/restart`    | Riavvia Mux                             |
| `POST` | `/api/services/mux/update`     | Aggiorna a una versione npm più recente |
| `GET`  | `/api/services/mux/status`     | Stato in tempo reale + DB               |
| `POST` | `/api/services/mux/auto-start` | Attiva o disattiva l'avvio automatico   |

---

### 4.4 Endpoint Bifrost (8 route)

Bifrost è un backend relay gateway AI in Go (`@maximhq/bifrost`). Utilizza la stessa
struttura degli endpoint di CLIProxyAPI (senza `rotate-key`: Bifrost gestisce autonomamente le chiavi
dei provider in `config.json` all'interno della propria directory `-app-dir`).

| Metodo | Percorso                           | Descrizione                                                          |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Installa Bifrost da npm (`@maximhq/bifrost`)                         |
| `POST` | `/api/services/bifrost/start`      | Avvia Bifrost sulla porta 8080 (predefinita)                         |
| `POST` | `/api/services/bifrost/stop`       | Arresta Bifrost                                                      |
| `POST` | `/api/services/bifrost/restart`    | Riavvia Bifrost                                                      |
| `POST` | `/api/services/bifrost/update`     | Aggiorna a una versione più recente                                  |
| `GET`  | `/api/services/bifrost/status`     | Stato in tempo reale + DB                                            |
| `POST` | `/api/services/bifrost/auto-start` | Attiva/disattiva l'avvio automatico                                  |
| `GET`  | `/api/services/bifrost/logs`       | Coda dei log SSE (tramite la route dinamica condivisa `[name]/logs`) |

**Configurazione del routing:** quando `BIFROST_BASE_URL` non è impostata e l'istanza
Bifrost supervisionata è in esecuzione, `getBifrostRoutingConfig()` (in `routingBackend.ts`) usa
automaticamente `http://127.0.0.1:{port}` come URL di base del relay. La variabile di ambiente
`BIFROST_BASE_URL`, se impostata esplicitamente, ha sempre la precedenza.

---

### 4.5 Endpoint di Dario (12 route)

Stessa struttura del ciclo di vita degli altri servizi (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`), oltre a un piano di controllo OAuth
protetto da token sotto `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (tutti protetti da `DARIO_ADMIN_TOKEN`).

### 4.6 Reverse proxy (incorporamento della dashboard di 9Router)

La dashboard incorpora l'interfaccia web di 9Router in un iframe tramite un reverse
proxy interno disponibile all'indirizzo:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Questo proxy:

- Inoltra la richiesta a `http://127.0.0.1:{port}/{path}` (solo loopback)
- Rimuove gli header `cookie` e `authorization` in ingresso (nessuna fuoriuscita della sessione OmniRoute)
- Inserisce `Authorization: Bearer {apiKey}` per l'autenticazione di 9Router
- Rimuove `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` dalla risposta
- Riscrive le risposte HTML per inserire `<base href>` e normalizzare i percorsi assoluti (`/foo` → `/dashboard/.../embed/foo`)

Gli upgrade WebSocket per la dashboard incorporata sono gestiti da un server complementare su una
porta dedicata (vedere `src/lib/services/embedWsProxy.ts`).

**Sicurezza:** le route del proxy di incorporamento sono classificate sotto `LOCAL_ONLY_API_PREFIXES`
e sono accessibili solo dal loopback. Un attaccante che ottiene un JWT tramite un
tunnel Cloudflare/Ngrok non può usare il proxy per accedere ai servizi incorporati.

---

## 5. Sicurezza

### Applicazione di LOCAL_ONLY (regola rigida n. 17)

Tutte le route sotto `/api/services/` e `/dashboard/providers/services/*/embed/` sono
classificate come LOCAL_ONLY in `src/server/authz/routeGuard.ts`. Il controllo del
loopback viene eseguito incondizionatamente prima di qualsiasi ramo di autenticazione:

```
arriva la richiesta
  → isLocalOnlyPath(path)?
      → non-loopback → 403 LOCAL_ONLY (sempre, prima del controllo di autenticazione)
      → loopback     → prosegue con l'autenticazione normale
```

Questo impedisce che un JWT trapelato (ad esempio tramite un tunnel) possa avviare
`npm install` o generare processi. Consultare `docs/security/ROUTE_GUARD_TIERS.md`
per la matrice completa dei livelli.

### Inserimento della chiave API

9Router e Mux richiedono una chiave API/un token bearer per i propri endpoint HTTP.
OmniRoute:

1. Genera una chiave tramite `crypto.randomBytes(32).toString("base64url")` con un
   prefisso specifico del servizio (`nr_` per 9Router, `mx_` per Mux).
2. La cifra quando è archiviata usando AES-256-GCM (lo stesso cifrario utilizzato per le credenziali dei provider).
3. La decifra e la inserisce come variabile d'ambiente al momento dell'avvio del processo —
   `NINEROUTER_API_KEY` per 9Router, `MUX_SERVER_AUTH_TOKEN` per Mux (mai come flag della
   CLI, affinché il token non compaia mai in `ps`/negli elenchi dei processi).
4. Non restituisce mai la chiave in chiaro in alcuna risposta HTTP.

CLIProxyAPI riceve una chiave dedicata per il piano dati, inserita all'avvio del processo
(`needsApiKey: true` — utilizzata per la sincronizzazione dei modelli con l'adattatore).

### Difesa da SSRF

Il reverse proxy HTTP (`/dashboard/.../embed/[...path]`) è configurato rigidamente per
inoltrare le richieste esclusivamente a `http://127.0.0.1:{port}`. Non segue mai
reindirizzamenti verso destinazioni non loopback. La libreria `ssrf-req-filter` viene
utilizzata per rifiutare qualsiasi URL upstream che si risolva al di fuori dell'intervallo
loopback.

### Sicurezza della shell (regola rigida n. 13)

`npm install` viene invocato tramite `execFile('npm', ['install', pkg, '--prefix', dir])` —
senza template literal, senza shell e senza interpolazione di percorsi esterni nella stringa
del comando. I valori di runtime (porte, chiavi API) vengono passati tramite l'oggetto `env`
del processo figlio.

### Sanitizzazione degli errori (regola rigida n. 12)

Tutte le risposte di errore provenienti da `/api/services/*` passano attraverso
`buildErrorBody()` o `sanitizeErrorMessage()`. I valori grezzi di `err.stack` e
`err.message` non vengono mai restituiti testualmente al chiamante.

---

## 6. Aggiunta di un nuovo servizio incorporato

Seguire questi 8 passaggi. Consultare le implementazioni esistenti in
`src/lib/services/installers/` e `src/app/api/services/` come riferimento canonico.

### Passaggio 1 — Creare l'installer

Creare `src/lib/services/installers/{name}.ts` sul modello di `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // scegliere una porta libera

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Utilizzare `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` da `installers/utils.ts`
— mai `execSync` o l'interpolazione tramite shell.

### Passaggio 2 — Registrare nel bootstrap

Aggiungere un `ServiceEntry` all'array `SERVICES` in `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false se non è necessaria alcuna chiave API
}
```

Estendere `buildSpawnArgsFactory()` affinché gestisca `cfg.tool === "myservice"`.

#### Contratto del plugin del provider collegabile (Fase 1, n. 7333)

`src/lib/services/providerPlugins/` introduce un contratto `ServiceProviderPlugin` che
raggruppa in un unico oggetto i campi `ServiceEntry` di `bootstrap.ts` e i campi del
modello di manifest di `serviceBackends.ts` di un backend, invece di rappresentare la
struttura dello stesso backend separatamente in due file non correlati. Al momento della
stesura di questo documento, **solo `9router` è stato migrato** — `bootstrap.ts` deriva la
propria voce `SERVICES[]` da `getServiceProviderPlugin("9router")`
(`src/lib/services/providerPlugins/registry.ts`), generando un errore di avvio qualora il
plugin risultasse mancante. `cliproxy`, `mux` e `bifrost` continuano a utilizzare, senza
modifiche, i literal inline preesistenti di `SERVICES[]`.

`open-sse/config/providerPluginManifest.ts` ha inoltre ricevuto un helper aggiuntivo
`createServiceBackendManifestEntry(pluginId, template)` che crea un
`ProviderPluginManifestEntry` ben formato a partire da una voce
`SERVICE_BACKEND_MANIFEST_TEMPLATE` — **non** è ancora collegato ad alcun percorso di
richiesta attivo (né `generateProviderPluginManifestFromRegistry()` né
`/v1/providers/[provider]/models`); ciò rimane un'attività successiva, una volta che il
contratto sarà stato convalidato per un secondo backend.

Rinviati a PR successive e tracciati nell'issue n. 7333: la migrazione di `cliproxyapi`
attraverso lo stesso registro, la generalizzazione di `mux`/`bifrost` nell'unione
`ServiceBackendPluginId`, l'integrazione nel contratto del plugin dei casi speciali relativi
all'instradamento degli executor (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) e il collegamento di
`createServiceBackendManifestEntry()` a un percorso attivo del codice per manifest/modelli.

### Passaggio 3 — Aggiungere la migrazione e il seed del database

Assicurarsi che il servizio disponga di una riga in `version_manager` tramite una migrazione
in `src/lib/db/migrations/`. La riga deve contenere:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Passaggio 4 — Creare i 7 endpoint API

Sotto `src/app/api/services/{name}/`:

```
_lib.ts            helper getOrInitSupervisor()
install/route.ts   POST — chiama installer.install()
start/route.ts     POST — chiama supervisor.start()
stop/route.ts      POST — chiama supervisor.stop()
restart/route.ts   POST — chiama supervisor.restart()
update/route.ts    POST — chiama installer.update()
status/route.ts    GET  — combina lo stato live con quello del database
auto-start/route.ts POST — attiva/disattiva il flag auto_start
```

La route condivisa `GET /api/services/[name]/logs` è già configurata — non sono
necessarie modifiche.

Delega tutte le risposte di errore tramite `createErrorResponse()` / `buildErrorBody()`.

### Passaggio 5 — Aggiungi a LOCAL_ONLY_API_PREFIXES

In `src/server/authz/routeGuard.ts`, verifica che `/api/services/` sia già presente
nell'elenco. Se introduci un nuovo prefisso (ad esempio, `/api/tools/`), aggiungilo sia
a `LOCAL_ONLY_API_PREFIXES` sia, se avvia processi, a `SPAWN_CAPABLE_PREFIXES`.
Aggiungi un test in `tests/unit/authz/routeGuard.test.ts`.

### Passaggio 6 — Aggiungi la scheda dell'interfaccia utente

Crea `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Riutilizza i componenti condivisi:

- `ServiceStatusCard` — stato in tempo reale + badge di integrità
- `ServiceLifecycleButtons` — Avvia / Arresta / Riavvia / Aggiorna
- `ServiceLogsPanel` — coda dei log SSE (si connette a `/api/services/{name}/logs`)
- `ApiKeyCard` — visualizzazione + rotazione della chiave (se `needsApiKey: true`)

Registra la scheda in `ServicesPageShell.tsx`.

### Passaggio 7 — Aggiungi la voce del provider (se il servizio è una destinazione di routing)

Se il servizio incorporato espone un endpoint `/v1/chat/completions` compatibile con OpenAI:

1. Aggiungi una voce del provider in `src/shared/constants/providers.ts` con `isEmbeddedService: true`.
2. Crea `open-sse/executors/{name}.ts` estendendo `BaseExecutor`. Recupera nuovamente la porta e
   la chiave API per ogni richiesta (non memorizzarle mai nella cache del costruttore). Restituisci una
   risposta `503 service_not_running` quando lo stato del supervisore non è `"running"`.
3. Registra i modelli in `open-sse/config/providerRegistry.ts` con il prefisso del servizio
   (ad esempio, `myservice/sub/model`). `modelSync.ts` li manterrà aggiornati.

### Passaggio 8 — Documenta ed esegui i test

1. Aggiorna `docs/frameworks/EMBEDDED-SERVICES.md` (questo file) — aggiungi il servizio alla
   tabella nella §1 e gli eventuali nuovi endpoint nella §4.
2. Aggiungi test unitari in `tests/unit/services/` (ciclo di vita, programma di installazione, struttura dell'API).
3. Aggiungi un test di integrazione in `tests/integration/services/` (subordinato a `RUN_SERVICES_INT=1`).
4. Aggiorna `docs/openapi.yaml` con i nuovi endpoint.

---

## 7. Risoluzione dei problemi

### Il servizio non si avvia

**Sintomi:** Il pulsante di avvio restituisce 503, lo stato rimane `"error"` o `"starting"`.

**Lista di controllo:**

1. Controllare `GET /api/services/{name}/logs` (oppure il pannello Logs nella dashboard). Cercare
   righe come `Error: ENOENT`, `address already in use` o `Cannot find module`.
2. Verificare che `npm` sia nel PATH: eseguire `which npm` dallo stesso account utente che esegue OmniRoute.
3. Verificare che il servizio sia installato: controllare `GET /api/services/{name}/status` per
   `installedVersion`. Se è `null`, eseguire prima l'installazione.
4. Verificare che `DATA_DIR/services/{name}/node_modules/` esista e non sia vuota.
5. Controllare il campo `lastError` nella risposta di stato per il motivo di uscita sanificato.

---

### L'avvio a freddo è lento (> 10 s per raggiungere lo stato `running`)

**Sintomi:** Lo stato rimane `"starting"` a lungo prima di passare a `"running"` o `"error"`.

**Spiegazione:** L'avvio a freddo di 9Router include l'importazione di alberi di dipendenze di grandi dimensioni (DNS,
tunnel, moduli MITM). L'intervallo predefinito dei controlli di integrità è di 2 s, con 3 tentativi prima che il
supervisore dichiari un timeout (continuando comunque a eseguire i controlli).

**Soluzione:** L'intervallo `healthIntervalMs` e il timeout di `waitForHealthy`
(`healthIntervalMs * 3`) sono configurabili in `bootstrap.ts`. Per i servizi con tempi
di avvio più lunghi, aumentare `healthIntervalMs` a 5000 e `stopTimeoutMs` a 30 000.

---

### Conflitto della porta (`EADDRINUSE`)

**Sintomi:** I log mostrano `address already in use :::20130`.

**Cause:**

- Un altro processo sta già utilizzando la porta 20130.
- Un precedente processo 9Router non è stato arrestato completamente (PID zombie).

**Soluzione:**

1. Modificare la porta predefinita tramite la variabile d'ambiente `NINEROUTER_PORT` in `.env`.
2. Individuare e terminare il processo in conflitto: `lsof -ti :20130 | xargs kill -9`.
3. La porta è configurabile per ogni servizio in `bootstrap.ts` tramite il campo `port`.

**Nota:** 9Router utilizza per impostazione predefinita la porta 20130 proprio per evitare conflitti con
la porta predefinita 20128 di OmniRoute.

---

### Autorizzazione negata (EACCES) durante l'installazione

**Sintomi:** L'installazione restituisce 500, i log mostrano `EACCES` o `permission denied`.

**Cause:**

- `DATA_DIR` o la relativa directory padre non è scrivibile dal processo OmniRoute.
- L'esecuzione avviene all'interno di Docker in modalità rootless, senza accesso in scrittura al volume mappato.

**Soluzione:**

1. Controllare `DATA_DIR` (valore predefinito: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Assicurarsi che l'utente del processo OmniRoute sia proprietario della directory: `chown -R $USER ~/.omniroute/`
3. In Docker, assicurarsi che il volume montato disponga delle autorizzazioni corrette per l'utente del container.

---

### L'aggiornamento non riesce (timeout di `npm install` o errore di rete)

**Sintomi:** L'aggiornamento restituisce 500 con `InstallError`, i log mostrano un timeout di rete.

**Lista di controllo:**

1. Verificare che il registro npm sia raggiungibile: `npm ping`.
2. Verificare la presenza di un proxy aziendale: `npm config get proxy`, `npm config get https-proxy`.
3. Provare a eseguire manualmente l'installazione: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. In presenza di un ambiente air-gap, scaricare preventivamente il tarball e utilizzare `npm install /path/to/tarball.tgz`.

---

### Il servizio mostra lo stato `"error"` subito dopo l'avvio (arresto anomalo rapido)

**Sintomi:** Lo stato passa da `"starting"` a `"error"` in meno di 5 secondi.
`lastError` mostra `"Fast crash (exited with code 1)"`.

**Lista di controllo:**

1. Leggere la parte finale completa del log: `GET /api/services/{name}/logs?tail=500`.
2. Causa comune: variabili d'ambiente richieste dal servizio mancanti.
3. Per 9Router: verificare che `NINEROUTER_DISABLE_MITM=true` e
   `NINEROUTER_DISABLE_TUNNEL=true` siano presenti nell'ambiente passato alla creazione del processo (vedere
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Domande frequenti

**D: Posso esporre gli endpoint dei servizi integrati a client non loopback?**

No. Il livello LOCAL_ONLY è intenzionale (regola rigida n. 17). Le route che possono invocare
`npm install` o avviare processi `node` non devono essere raggiungibili da traffico non loopback,
perché un JWT divulgato tramite un tunnel (Cloudflare, Ngrok, Tailscale) consentirebbe
altrimenti l'avvio arbitrario di processi. Non è prevista alcuna deroga per
`/api/services/`: a differenza di `/api/mcp/`, è escluso dall'elenco di bypass
dell'ambito manage. Consultare `docs/security/ROUTE_GUARD_TIERS.md`.

---

**D: 9Router e CLIProxyAPI saranno disponibili nelle distribuzioni di produzione/cloud?**

Sì. Entrambi i servizi seguono lo stesso modello local-first di OmniRoute. Vengono eseguiti
sulla stessa macchina e comunicano tramite loopback. In questo caso, "produzione" indica il VPS
o il server locale in cui è distribuito OmniRoute, non un provider cloud remoto.

---

**D: Come posso eseguire il debug del supervisore?**

1. Seguire il flusso di log SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Controllare i log strutturati nell'output pino di OmniRoute, filtrati in base al namespace
   `service:supervisor`.
3. Esaminare la riga del DB: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Usare `GET /api/services/9router/status` per visualizzare con un'unica chiamata lo stato in tempo reale corrente, il PID, l'integrità
   e `lastError`.

---

**D: Il supervisore mostra `health: "degraded"` o `health: "unknown"`, ma lo stato è `"running"`. È un problema?**

`"degraded"` significa che il controllo di integrità ha restituito una risposta diversa da 200. `"unknown"` significa che non
è stato ancora completato alcun controllo (condizione di gara con il primo polling). Entrambe le condizioni sono transitorie durante l'avvio.
Se l'integrità rimane `"degraded"` per più di `healthIntervalMs * 3` ms dopo
`"running"`, il servizio integrato è in esecuzione, ma la sua API HTTP non risponde. Verificare
se la porta indicata nella risposta di stato è corretta e se il servizio è effettivamente
in ascolto su tale porta.

---

**D: Posso modificare la chiave API di 9Router senza un riavvio completo?**

No. La chiave API viene passata a 9Router tramite una variabile di ambiente al momento dell'avvio del processo.
Le variabili di ambiente non possono essere modificate in un processo in esecuzione. `POST .../rotate-key`
arresta e riavvia automaticamente il servizio per applicare la nuova chiave. La rotazione della chiave
diventa effettiva entro il valore `stopTimeoutMs` del servizio (valore predefinito: 15 s), più il tempo
di avvio.

---

**D: Qual è il limite del buffer circolare e cosa accade quando è pieno?**

Ogni servizio dispone di un buffer circolare dedicato da 5 MB. Quando il buffer è pieno, le righe
di log meno recenti vengono rimosse per fare spazio a quelle nuove. L'evento SSE `snapshot` restituisce
le righe più recenti entro il limite `tail`. I log non vengono salvati su disco, a meno che
`logsBufferPath` non sia impostato nella riga del DB.

---

## Vedere anche

- `docs/security/ROUTE_GUARD_TIERS.md` — dettagli sul livello LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 Mappatura del modulo dei servizi integrati
- `docs/architecture/ARCHITECTURE.md` — contesto a livello di sistema
- `docs/openapi.yaml` — definizioni degli endpoint leggibili dalla macchina
- `CLAUDE.md` §"Adding a New Embedded Service" — checklist di riferimento rapido
