# Router Backends & Embedded Services — architecture contract (ADR) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Stato:** Accettato · **Contesto:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contratto:** `domain/routing/routerBackends.ts`
> (registro tipizzato — il codice arriva con [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Questo ADR definisce in modo preciso come i motori `ts` (nativo), `bifrost`, `cliproxy`, `9router` e quelli compatibili con VibeProxy si relazionano tra loro, affinché i contributori smettano di confondere due aspetti architetturalmente distinti. Documenta il registro tipizzato introdotto dal lavoro sul registro dei backend del router come unica fonte autorevole per tale modello.

## La distinzione fondamentale — due assi ortogonali

Il ruolo di un motore è descritto da **due assi indipendenti**, codificati insieme nel `RouterBackendDefinition` del registro:

1. **Ciclo di vita** (`RouterBackendLifecycle`) — _come viene eseguito il motore_:
   - `in-process` — viene eseguito all'interno del processo Node di OmniRoute (la pipeline TS nativa).
   - `supervised` — un processo figlio locale che OmniRoute installa/avvia/arresta/controlla tramite `ServiceSupervisor`, per poi utilizzarlo come connessione a un provider.
   - `external` — un endpoint HTTP al quale OmniRoute inoltra le richieste, ma che **non** gestisce (configurato tramite un URL di base definito in una variabile di ambiente).
   - `disabled` — registrato ma non selezionabile.
2. **Asse di selezione** (backend di routing del relay) — _se il relay inoltra le richieste al motore_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` in
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

L'errore da evitare è considerare «servizio incorporato» e «backend di routing» come un unico elenco. Non lo sono. Un motore `supervised` (9router/cliproxy) è una **connessione a un provider utilizzata dalla pipeline nativa**, non un backend alternativo a cui il relay inoltra le richieste. `bifrost` è l'opposto: un backend a cui il relay inoltra le richieste che, storicamente, era disponibile solo come `external`.

## Il registro — unica fonte autorevole

Il contratto `domain/routing/routerBackends.ts` (il codice arriva con [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) dichiara ogni motore una sola volta, specificandone ciclo di vita, funzionalità, identità del servizio, porta predefinita, configurazione dei controlli di integrità e supporto alla telemetria. I consumer recuperano i motori tramite `getRouterBackend(id)`, `listRouterBackends()` e `listRouterBackendsByCapability(cap)`, anziché gestire ogni sidecar come caso speciale.

| Backend     | Ciclo di vita | Servizio (asse A) | Backend del relay (asse B) | Controllo di integrità | Porta predefinita |
| ----------- | ------------- | ----------------- | -------------------------- | ---------------------- | ----------------- |
| `ts`        | `in-process`  | —                 | `ts` (nativo)              | —                      | —                 |
| `bifrost`   | `external`¹   | —¹                | `bifrost` / `auto`         | `/health`              | —                 |
| `cliproxy`  | `supervised`  | `cliproxy`        | — (provider)               | `/v1/models`           | 8317              |
| `9router`   | `supervised`  | `9router`         | — (provider)               | `/api/health`          | 20130             |
| `vibeproxy` | `external`    | —                 | — (adattatore provider)    | `/v1/models`           | —                 |

¹ La promozione di Bifrost a servizio incorporato `supervised` (installabile/avviabile da `/api/services/bifrost/`) è monitorata in [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); fino alla relativa integrazione, Bifrost è disponibile solo come `external` (raggiungibile esclusivamente tramite `BIFROST_BASE_URL`).

Le `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) consentono ai chiamanti di filtrare in base a ciò che un motore può effettivamente fare, anziché codificare esplicitamente diramazioni specifiche per ciascun ID.

## Asse A — servizi incorporati (lato processi supervisionati)

- **Registro dei processi supervisionati:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (attualmente: `9router`, `cliproxy`).
- **Responsabile del ciclo di vita:** `src/lib/services/ServiceSupervisor.ts` — `start()` avvia il
  processo figlio, attende il superamento di `waitForHealthy()`, acquisisce stdout/stderr in un buffer circolare;
  `stop()` SIGTERM→SIGKILL; tutto viene serializzato mediante un lock.
- **Unione degli stati** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, più un
  `HealthState = healthy | unhealthy | unknown` ortogonale.
- **Perché un processo separato (anziché un SDK in-process)?** L'isolamento dei processi è ciò che rende
  installazione/avvio/arresto/stato/log controllabili in modo indipendente per ogni sidecar e consente
  l'applicazione della protezione per l'avvio da loopback. La modellazione di un adattatore in-process è un'attività futura: il
  flag di funzionalità `native-hot-path` è il punto in cui verrebbe espressa.

### Contratto delle route del ciclo di vita (`/api/services/<tool>/…`)

I codici di stato sono **specifici per stato/verbo/percorso per scelta progettuale**: questo è il contratto, non
un'incoerenza:

| Chiamata                        | Condizione                         | Stato                                |
| ------------------------------- | ---------------------------------- | ------------------------------------ |
| `POST .../start`                | servizio `not_installed`           | **409** (precondizione)              |
| `POST .../stop`                 | già arrestato                      | **200** (no-op idempotente)          |
| `GET .../status`                | OK                                 | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                | errore di avvio                    | **503** (transitorio)                |
| `GET .../status`, `.../stop`    | errore non intercettato            | **500**                              |
| `GET /api/services/<x>/logs`    | tool `<x>` sconosciuto             | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`     | `X-Reveal-Confirm: yes` mancante   | **403** (solo 9router)               |
| **qualsiasi** `/api/services/*` | chiamante non loopback/LAN privata | **403 LOCAL_ONLY**                   |

Tutti i corpi degli errori sono strutturati da `createErrorResponse()` →
`{ error: { message, type }, requestId }`, dove `type` deriva dallo stato
(`500→server_error`, `404→not_found`, `409→conflict`, altrimenti `invalid_request`) ed è
il discriminatore utilizzabile automaticamente. I messaggi vengono pre-sanificati
(`sanitizeErrorMessage()`, Regola rigida n. 12).

**La protezione loopback** è la causa più comune di un `403`: `/api/services/` è incluso in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) e
`src/server/authz/policies/management.ts` rifiuta qualsiasi chiamante non loopback / non appartenente a una LAN privata
**prima dell'autenticazione**, perché queste route avviano processi figli (Regole rigide 15
e 17). Accedervi attraverso un tunnel pubblico restituisce un `403` per scelta progettuale.

## Asse B — backend di instradamento relay (lato dispatch)

Solo il percorso del proxy relay `/api/v1/relay/chat/completions` seleziona un backend di
dispatch; l'endpoint principale `/api/v1/chat/completions` non consulta mai
`routingBackend.ts`.

- **Selezione** (`resolveRelayRoutingBackend`): un singolo parametro globale dell'ambiente —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Se non impostato, è `auto` quando Bifrost è configurato+abilitato, altrimenti `ts`.
- **Comportamento:**
  - `bifrost` (forzato): errore di Bifrost → `502` definitivo, nessun fallback.
  - `auto`: prova Bifrost; in caso di errore/cooldown passa silenziosamente all'implementazione nativa.
  - `ts` / dopo il fallback: la pipeline nativa di traduzione/esecuzione `open-sse`.
- **Cooldown:** cooldown per errore distinto per ogni `baseUrl` in `bifrostCooldown.ts`.

Attualmente la selezione è **tutto o niente a livello di relay**: in `release/v3.8.43` non esiste
alcun cambio di motore per provider o per richiesta. Il filtro per richiesta viene aggiunto
dal lavoro sul manifest dei sidecar
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
che consente ad `auto` di instradare tramite Bifrost solo i provider idonei secondo il manifest.

## Integrazione della dashboard

La dashboard dei servizi esegue il polling di `GET /api/services/<tool>/status` ogni 5 secondi tramite
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
restituendo `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Non esiste un provider condiviso del contesto di disponibilità:
ogni componente chiama l'hook per ciascuno strumento. In caso di `!res.ok`, attualmente l'hook mostra
un semplice `HTTP <status>`; associare il campo `error.type` a una spiegazione comprensibile
è un miglioramento dell'esperienza utente già pianificato, non una modifica del contratto.

## Conseguenze

- I nuovi motori vengono registrati una sola volta in `ROUTER_BACKENDS`; i consumer li acquisiscono tramite query
  sulle funzionalità senza nuovi rami specifici per ID.
- La domanda "È un servizio o un backend di routing?" trova risposta nel campo `lifecycle`, non
  nell'elenco in cui capita che compaia un ID.
- La supervisione di Bifrost (#5817) e la migrazione nativa del percorso critico (#5670) si basano su questo
  contratto condiviso, anziché gestire ogni sidecar come caso speciale.
