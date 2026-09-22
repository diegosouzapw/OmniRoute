# Resilience Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute dispone di tre meccanismi di resilienza distinti ma correlati. Ognuno ha un ambito e uno scopo diversi. Mantienili separati durante il debug del comportamento di routing.

![Modello di resilienza a 3 livelli](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit breaker del provider

**Ambito:** intero provider (ad es. `glm`, `openai`, `anthropic`).

**Scopo:** interrompere l'invio di traffico a un provider che presenta ripetutamente errori a livello di servizio/upstream.

**Implementazione:**

- Classe principale: `src/shared/utils/circuitBreaker.ts`
- Integrazione: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API di stato: `GET /api/monitoring/health`
- API di reimpostazione: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- Tabella DB: `domain_circuit_breakers`

**Stati:**

- `CLOSED` — traffico normale consentito
- `DEGRADED` — il traffico è ancora consentito, ma vengono monitorati gli errori elevati del provider
- `OPEN` — provider temporaneamente bloccato; il routing combinato lo ignora
- `HALF_OPEN` — timeout di reimpostazione trascorso; richiesta di verifica consentita

**Valori predefiniti configurabili (`open-sse/config/constants.ts`, disponibili in Dashboard → Settings → Resilience):**

| Classe     | Degradato dopo | Si apre dopo | Timeout di reimpostazione |
| ---------- | -------------- | ------------ | ------------------------- |
| OAuth      | 5 errori       | 8 errori     | 60s                       |
| Chiave API | 7 errori       | 12 errori    | 30s                       |
| Locale     | derivato       | 2 errori     | 15s                       |

`degradationThreshold` determina quando un provider entra nello stato `DEGRADED`; `failureThreshold` determina quando si apre e viene ignorato. I profili dei provider locali non sono ancora disponibili nella pagina delle impostazioni di resilienza.

**Codici di attivazione:** solo gli stati a livello di provider `[408, 500, 502, 503, 504]`. NON attivare il circuit breaker per errori a livello di account (la maggior parte degli errori 401/403/429: questi sono gestiti dal cooldown o dal lockout).

**Ripristino differito:** alla scadenza dello stato `OPEN`, `getStatus()`, `canExecute()`, `getRetryAfterMs()` aggiornano lo stato a `HALF_OPEN`. Non è necessario alcun timer in background.

---

### Cooldown globale opzionale del provider (finestra di controllo)

Un quarto livello, **opzionale** (`PROVIDER_COOLDOWN_ENABLED`, disattivato per impostazione predefinita), conserva
una memoria tra richieste successive dei provider che presentano errori in
`open-sse/services/providerCooldownTracker.ts`; tale memoria viene consultata durante la risoluzione delle destinazioni combinate,
in modo che richieste combinate consecutive smettano di esaminare nuovamente un provider che ha appena
restituito un errore. Le voci a livello di provider rispettano la finestra di controllo `PROVIDER_PROFILES`:

| Profilo    | si attiva dopo (`providerFailureThreshold`) | entro (`providerFailureWindowMs`) | cooldown di (`providerCooldownMs`) |
| ---------- | ------------------------------------------: | --------------------------------: | ---------------------------------: |
| OAuth      |                                        `10` |                           `15min` |                             `5min` |
| Chiave API |                                        `15` |                           `30min` |                            `10min` |

Al di sotto della soglia, il provider **non** è considerato in cooldown; un'operazione riuscita azzera
la finestra. Le voci a livello di connessione (`provider:connectionId`) mantengono invece
il backoff esponenziale `minRetryCooldownMs → maxRetryCooldownMs`. Valori sostitutivi:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Test di regressione: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown della connessione

**Ambito:** singola connessione/account/chiave del provider.

**Scopo:** ignorare una chiave non funzionante mentre le altre connessioni dello stesso provider continuano a gestire le richieste.

**Implementazione:**

- Contrassegno come non disponibile: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selezione: `getProviderCredentials*` nello stesso file
- Calcolo del cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Impostazioni: `src/lib/resilience/settings.ts`

**Campi per connessione:**

- `rateLimitedUntil` — timestamp fino alla scadenza del cooldown
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contatore del backoff esponenziale

**Cooldown predefiniti:**

- Base OAuth: 5s
- Base per chiave API: 3s
- 429 per chiave API: preferisce `Retry-After`/header di reset del servizio upstream/testo di reset analizzabile
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Protezione anti-thundering-herd:** impedisce che errori simultanei prolunghino eccessivamente il cooldown o incrementino due volte `backoffLevel`.

**Stati terminali (NON cooldown):**

- `banned` — impostato dal rilevamento di parole chiave associate al ban o del ban dell'account (vedere [BAN_DETECTION](../security/BAN_DETECTION.md)) e da tre rifiuti consecutivi per richiesta da parte del servizio upstream (`request_rejected`, ad es. OAuth Anthropic 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); un singolo rifiuto si limita ad applicare il cooldown alla connessione
- `expired` (passa allo stato terminale dopo un numero limitato di tentativi — `EXPIRED_RETRY_MAX = 3` con backoff esponenziale — in modo che gli errori OAuth transitori possano risolversi autonomamente prima che l'account venga disattivato definitivamente)
- `credits_exhausted`

Questi stati persistono finché le credenziali non cambiano o un operatore non li reimposta. Non sovrascrivere gli stati terminali con uno stato di cooldown transitorio.

**Ripristino differito:** quando `rateLimitedUntil` è trascorso, la connessione torna a essere idonea. Dopo un utilizzo riuscito, `clearAccountError()` cancella tutti i campi di errore.

### Limite di utilizzo OAuth di Claude: corsia a priorità inferiore + reimpostazione del limite di sessione

**Ambito:** una connessione di abbonamento Claude (OAuth). Entrambe le funzionalità sono **attivabili separatamente per
ogni connessione** (Modifica connessione → sezione Claude → `lowPriorityMode` / `autoLimitReset` in
`providerSpecificData`, entrambe disattivate per impostazione predefinita) e replicano i comandi `/low-priority` e
`/limit-reset` di Claude Code (contratto wire acquisito da Claude Code 2.1.263).

**Implementazione:**

- Macchina a stati + classificazione delle risposte: `open-sse/services/claudeLowPriority.ts`
- Client per stato/richiesta di reset: `open-sse/services/claudeLimitReset.ts`
- Hook dell'esecutore (inserimento dell'header + nuovo tentativo con lo stesso account): `open-sse/executors/base.ts::execute()`
- Persistenza dell'attivazione: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Attivazione:** il limite di utilizzo di 5 ore — una risposta `429` i cui header contengono
`anthropic-ratelimit-unified-status: rejected` e, quando l'account è idoneo,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nulla viene inviato prima del primo errore
429 dovuto al limite; un 429 improvviso senza header unificati segue il normale percorso di cooldown.

**Corsia a priorità inferiore** (`lowPriorityMode`):

- Al verificarsi del 429 dovuto al limite, l'esecutore accetta l'offerta e riprova immediatamente con lo **stesso**
  account usando `anthropic-usage-limit: slow`; la corsia rimane attiva fino al valore annunciato da
  `anthropic-ratelimit-unified-reset` (+60s di tolleranza) e ogni richiesta effettuata durante tale intervallo include
  l'header. Il 429 intercettato non raggiunge mai `handleChatCore`, quindi alla connessione
  **non** viene applicato il cooldown e non viene sostituita con un'altra.
- `anthropic-ratelimit-unified-slow-status` nelle risposte successive: `active` / `not_needed`
  mantengono la corsia; `slot_busy` (429) o un `529` attendono il valore
  `anthropic-ratelimit-unified-slow-retry-after` del server (valore predefinito 20s, limitato a 5–600s, jitter ±30%)
  e riprovano, entro il limite di `anthropic-ratelimit-unified-slow-max-wait` (valore predefinito 20 min, limitato
  a 1 min–6 h) — superato tale limite, la corsia termina e un periodo di sospensione di 10 minuti ne impedisce la
  riaccettazione. L'attesa è inoltre limitata al tempo rimanente del timeout di avvio upstream della richiesta
  (`resolveFetchStartTimeout`, 10 min per impostazione predefinita), meno un margine di 5 s: senza tale limite,
  l'attesa massima predefinita di 20 minuti sopravviverebbe alla richiesta e la sospensione verrebbe interrotta
  durante l'attesa, producendo un `TimeoutError` anziché la normale conclusione `max_wait` + periodo di sospensione.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, l'inizio di una nuova finestra di 5 ore oppure
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (che la conclude come
  `extra_usage` con qualsiasi stato, poiché l'eccedenza a pagamento ora copre il limite) terminano la corsia; la
  risposta segue quindi il normale percorso di cooldown. `budget_exhausted` viene memorizzato fino
  al reset del budget annunciato (≤ 8 giorni).
- Il controllo del limite viene eseguito dopo i nuovi tentativi interni dello stesso esecutore attivati da un errore 400 (modifica
  del contesto, limiti di thinking/effort, apprendimento automatico dei parametri), quindi un 429 dovuto al limite che emerge solo
  durante uno di questi tentativi viene comunque intercettato anziché raggiungere il percorso di cooldown.
- Lo stato viene conservato in memoria per ciascuna connessione (dopo un riavvio è necessario un ulteriore 429 dovuto al limite per accettare nuovamente).

**Reimpostazione del limite di sessione** (`autoLimitReset`, tentata prima della corsia quando entrambe sono attive):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blocco `juniper_tide`;
  quando `arm: "reset"` e `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` con
  `{ "program": "juniper_tide" }` (UUID dell'organizzazione da
  `providerSpecificData.organizationUUID`, con fallback di bootstrap).
- `result: reset|not_limited` → la richiesta viene ritentata alla massima velocità (senza header slow).
  `already_used` / `not_offered` memorizzano `next_available_at` (valore predefinito: una settimana); qualsiasi
  errore applica un backoff di 15 minuti. Il reset è disponibile una volta alla settimana e viene comunque conteggiato nel
  limite settimanale.

Controlli di regressione: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità di sessione (#7274)

**Ambito:** una sessione client (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) associata a una sola connessione, per **qualsiasi** provider.

**Scopo:** mantenere un agente multi-turn (Claude Code, aider, agenti personalizzati) sullo stesso account tra le richieste, riducendo la perdita di contesto tra account e i ripetuti errori 429 di cold start sui provider con stato di sessione per account.

**Implementazione:**

- Risoluzione del TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selezione/creazione del pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazione dell'header (generica, per qualsiasi provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella dei pin persistenti: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Impostazione: `sessionAffinityTtlMs` (TTL globale in ms, `0` lo disabilita) — `src/lib/db/settings.ts`. Rinominata dall'impostazione specifica per Codex `codexSessionAffinityTtlMs` tramite la migrazione `124_generic_session_affinity_ttl.sql`, che trasferisce qualsiasi TTL Codex configurato in precedenza come nuovo valore predefinito.

Prima della #7274, `resolveSessionAffinityTtlMs()` restituiva immediatamente `0` per ogni provider eccetto `codex`, quindi l'impostazione del TTL (e gli header di sessione) non aveva effetto altrove, nonostante il meccanismo di pinning e l'estrazione degli header fossero già indipendenti dal provider. La correzione ha rimosso quel ritorno anticipato; ora il TTL si applica uniformemente a ogni provider dopo essere stato impostato globalmente su un valore superiore a `0`.

I tre header di affinità di sessione non vengono mai inoltrati a monte: gli executor costruiscono da zero i propri header per l'upstream anziché propagare quelli del client, quindi questi rimangono esclusivamente ID di correlazione interni.

### Lease esclusivi per le connessioni di sessione gestite

**Ambito:** un client/sessione HTTP gestito attivo possiede una connessione OmniRoute idonea.

**Scopo:** fornire la proprietà esclusiva e persistente di una connessione ai client che richiedono una rigida separazione dell'instradamento tra le richieste. Questo differisce dall'affinità di sessione, che rappresenta una preferenza debole di continuità: un lease esclusivo conserva lo stato del ciclo di vita in SQLite, impone l'unicità globale del proprietario attivo e della connessione attiva e rifiuta una generazione obsoleta prima dell'invio al provider.

La funzionalità è attivabile esplicitamente per ciascuna chiave API. Una chiave gestita deve avere lo scope `lease:exclusive` e un elenco `allowedConnections` esplicito e non vuoto. Qualsiasi client HTTP può utilizzare l'endpoint del ciclo di vita; non sono richiesti nome del client, user-agent, provider, metodo OAuth o modello. Il lease possiede una connessione, non un modello, quindi una modifica del modello mantiene il binding finché la connessione rimane normalmente idonea. Le normali regole relative a modello, quota, stato di integrità, cooldown e allowlist rimangono vincolanti e possono trasferire la stessa generazione a un'altra connessione libera e idonea.

Il ciclo di vita usa `POST /api/v1/session-leases` con le azioni JSON `acquire`, `renew` e `release`. Le richieste di inferenza gestite presentano il valore opaco `X-OmniRoute-Lease-Owner` e il valore esatto `X-OmniRoute-Lease-Generation`. Il proprietario usa `vlo_` seguito da 43 caratteri base64url; viene memorizzato soltanto il relativo hash SHA-256. Ogni controllo finale prima dell'invio associa inoltre l'ID della chiave API autenticata e l'ID della connessione attiva. Gli header di controllo del lease vengono rimossi dai log, dagli snapshot conservati delle richieste e dagli header degli executor per l'upstream.

Se il normale instradamento dispone di candidati gestiti idonei, ma ogni candidato libero è occupato da un lease attivo esterno, OmniRoute restituisce HTTP `429`, il codice lease-capacity-unavailable, uno stato waiting-for-capacity e un `Retry-After` limitato, derivato dalla prima scadenza pertinente. La normale assenza di connessioni idonee non costituisce contesa per un lease e mantiene la semantica di errore di instradamento esistente.

I meccanismi correlati rimangono separati:

- L'occupazione delle sessioni OAuth è una distribuzione debole, locale al processo, per gli account OAuth.
- I semafori degli account concedono permessi di concorrenza per le richieste e terminano al completamento di una richiesta.
- I lease esclusivi per le connessioni di sessione gestite costituiscono una proprietà persistente basata sul ciclo di vita, con controllo della generazione.

---

## 3. Blocco del modello

**Ambito:** tripla provider + connessione + modello.

**Ambito della chiave in base allo stato:** lo stato dell'errore determina su quale chiave viene scritto un blocco
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — un segnale relativo alla quota o all'abilitazione — bloccano la **famiglia di quota**:
  per codex, l'intero ambito `codex` / `spark` (ogni modello `gpt-5*` della
  connessione); per gli altri provider, `getQuotaScopedModelForProvider()`.
- `404` blocca il modello specifico (`getModelLockKey()` restringe `not_found`).
- Qualsiasi altro stato — errori di trasporto/server `5xx` e il `502`
  sintetizzato internamente da OmniRoute durante la convalida della qualità — blocca **esclusivamente**
  la tupla esatta provider/connessione/modello. Uno stream difettoso su un modello non costituisce una prova
  relativa alla quota dell'account; prima di questa regola, una singola risposta vuota su
  `codex/gpt-5.6-luna` rimuoveva dal routing ogni modello `gpt-5*` di quella
  connessione per 2–30 min (con durata crescente), mentre la relativa quota rimaneva invariata.
- L'opzione `scope` esplicita del chiamante ha sempre la precedenza (Antigravity passa `"exact"`).

**Scopo:** evitare di disabilitare un'intera connessione quando solo un modello non è disponibile o è soggetto a limitazioni di quota.

**Esempi:**

- Provider con quota per modello che restituiscono 429
- Provider locali che restituiscono 404 per un singolo modello mancante
- Errori di autorizzazione specifici del provider relativi a modalità/modelli (ad es., modalità Grok)

**Implementazione:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard dei periodi di sospensione dei modelli (v3.8.0)

Interfaccia: Impostazioni → Periodi di sospensione dei modelli (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Elenca i blocchi attivi con: provider, connessione, modello, motivo, expiresAt. Gli operatori possono riabilitare manualmente un modello dalla scheda.

**API REST:**

- `GET /api/resilience/model-cooldowns` — elenca i blocchi attivi
- `DELETE /api/resilience/model-cooldowns` — riabilitazione manuale. Corpo: `{provider, connection, model}`. Autenticazione: gestione.

### Interfaccia delle impostazioni di blocco + ripristino tramite decadimento in caso di successo (v3.8.23)

Il blocco dei modelli è passato da un comportamento codificato in modo fisso e sempre attivo a una funzionalità
completamente configurabile e facoltativa, dotata di una propria scheda delle impostazioni e di un percorso di ripristino autorigenerante.

**Scheda delle impostazioni:** Impostazioni → Blocco del modello
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Questa è **distinta** dalla scheda `ModelCooldownsCard` di sola lettura descritta sopra (che si limita a
_elencare_ i blocchi attivi): la nuova scheda _configura i parametri_. I valori predefiniti
si trovano in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Impostazione            | Valore predefinito               | Significato                                                                                    |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interruttore principale: il blocco dei modelli è **disattivato per impostazione predefinita**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stati upstream conteggiati come errori con ambito di modello.                                  |
| `baseCooldownMs`        | `120_000` (120 s)                | Durata iniziale del blocco per il primo errore.                                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite massimo del periodo di sospensione incrementato.                                        |
| `maxBackoffSteps`       | `10`                             | Numero massimo di passaggi di incremento del backoff esponenziale.                             |
| `useExponentialBackoff` | `true`                           | Indica se gli errori ripetuti incrementano esponenzialmente il periodo di sospensione.         |

Le impostazioni vengono salvate tramite il normale archivio delle impostazioni e convalidate mediante lo
schema delle impostazioni di resilienza; la scheda limita `baseCooldownMs`/`maxCooldownMs`
(con `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Ripristino tramite decadimento in caso di successo:** il ripristino **non** dipende esclusivamente dalla scadenza del timer. Una risposta
valida riduce progressivamente il conteggio degli errori del modello, così un modello che torna operativo
durante l'intervallo smette di incrementare la penalità (e il blocco viene rimosso) prima della scadenza del timer. Quando un
target combinato restituisce una risposta corretta, `open-sse/services/combo.ts` chiama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), che **dimezza** il valore
`failureCount` memorizzato (`Math.floor(failureCount / 2)`); quando raggiunge `0`, la voce di blocco
viene eliminata completamente. La funzione complementare `recordModelLockoutFailure()`
incrementa il conteggio (e aumenta il periodo di sospensione) per gli errori verificatisi entro la
finestra di incremento. Questo decadimento in caso di successo si aggiunge alla normale scadenza del timer:
entrambi i percorsi possono riabilitare un modello.

**Stato:** i blocchi vengono mantenuti **in memoria** (`Map` per processo di
`ModelLockoutEntry` indicizzate tramite `provider:connectionId:model`; i blocchi con ambito esatto tramite
`provider:connectionId:exact:model`) e non vengono salvati nel
DB: vengono persi al riavvio. Le _impostazioni_ vengono salvate; lo _stato_ dei
blocchi attivi è temporaneo.

---

## 4. Controllo della concorrenza Quota-Share (v3.8.36)

Gli account in abbonamento (GLM, MiniMax, ecc.) spesso accettano solo ~1–3 richieste
concorrenti; il superamento di questo limite causa errori 429 e periodi di cooldown. Il problema è particolarmente rilevante con le combinazioni
**quota-share** (`qtSd/…`), in cui più chiavi API condividono un unico account
upstream. Tre livelli impediscono che un account condiviso venga sovraccaricato.

### Limite di concorrenza per connessione (`max_concurrent`)

Ogni connessione del provider può dichiarare un limite `max_concurrent`
(`provider_connections.max_concurrent`, impostato nella finestra modale della connessione / API / DB).
Lasciarlo vuoto per non applicare alcun limite. Questa è l'unica impostazione che controlla il livello di serializzazione
descritto di seguito: impostarla sulla concorrenza effettiva dell'account (ad es. GLM ~1, MiniMax ~2).

### Serializzazione delle richieste quota-share

Quando un dispatch quota-share ha come destinazione una connessione che dichiara un valore
`max_concurrent` positivo, le richieste concorrenti verso tale **account** vengono serializzate tramite un
semaforo per connessione (chiave `qsconn:<connectionId>`): le richieste in eccesso **attendono nella
coda** anziché sovraccaricare l'account. Il comportamento è **fail-open**: se la
coda è satura o scade il timeout, la richiesta procede senza uno slot anziché rifiutare una richiesta
che può essere inoltrata. L'opzione è disponibile in **Impostazioni → Resilienza → Concorrenza per connessione
quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, attiva per
impostazione predefinita). Senza un limite `max_concurrent`, il comportamento rimane invariato.

> Il gate di routing quota-share (`selectQuotaShareTarget`, DRR + P2C) è anch'esso
> fail-open e si limita a _deprioritizzare_ una connessione che ha raggiunto il limite; con un
> pool a connessione singola non può imporre un limite rigido, quindi è questo semaforo a contenere
> effettivamente il sovraccarico.

### Nuovo tentativo sensibile al cooldown delle combinazioni

Per ogni strategia di combinazione (quando abilitata), una richiesta che renderebbe definitivo un errore 429
per un BREVE cooldown transitorio attende che termini ed esegue nuovamente il dispatch anziché
restituire il 429. Ciò copre le finestre TPM/RPM della classe Gemini (~60s di retry-after)
nelle combinazioni multi-modello, ad es. quando entrambe le destinazioni di una combinazione a 2 modelli raggiungono un limite di frequenza
per modello. Il comportamento è limitato da `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) in **Impostazioni → Resilienza**. Non attende mai per `quota_exhausted`
(bloccato fino a mezzanotte) o per motivi di autenticazione/risorsa non trovata.

---

## 5. Controllo dell'ammissione alla coda delle richieste (v3.8.49 · issue #6593)

**Ambito**: la coda locale di limitazione della frequenza per provider+connessione (`open-sse/services/rateLimitManager.ts`,
basata su Bottleneck), un livello sotto i tre meccanismi descritti sopra.

**`maxWaitMs` limita l'attesa in coda; `executionMaxWaitMs` limita l'esecuzione.**
I due limiti sono deliberatamente separati e nessuno dei due influisce sull'altro.

`resilienceSettings.requestQueue.maxWaitMs` è il **budget di attesa in coda**:
copre l'attesa di uno slot del provider e la successiva permanenza nello stato QUEUED, e il relativo timer viene
azzerato nel momento in cui il job lascia lo stato QUEUED e inizia l'esecuzione
(`rateLimitManager.ts`, `wrappedFn`). Una richiesta che lo supera non raggiunge mai
il servizio upstream. Il valore predefinito è 30000ms, fornito da `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` e verificato da
`tests/unit/ratelimit-admission-control-6593.test.ts`, così una sua modifica fa
fallire quel test anziché lasciare silenziosamente obsoleto questo paragrafo.

`resilienceSettings.requestQueue.executionMaxWaitMs` è ciò che Bottleneck
riceve come `expiration` del job, il cui timer viene avviato solo dopo il dispatch. Funge da
meccanismo di sicurezza per gli executor privi di un proprio timeout upstream e viene
aumentato fino al timeout di avvio del fetch dell'executor quando quest'ultimo è più lungo, così da
non poter interrompere una risposta in corso che sta procedendo normalmente. Il valore predefinito è 600000ms (10 min).

Usare il budget della coda come `expiration` era ciò che in passato interrompeva i gateway
non incrementali a metà elaborazione — che possono legittimamente restare in esecuzione per minuti prima di inviare i primi byte —
ed è per questo che una scadenza viene esposta come `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mentre il budget della coda usa il
codice di timeout della coda. È possibile sovrascrivere entrambi tramite `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (variabili d'ambiente) o dalla dashboard
(**Impostazioni → Resilienza**). Durante la normalizzazione, entrambi vengono limitati all'intervallo 1ms–24h.

**Precedenza, per entrambi:** la variabile d'ambiente fornisce solo il valore _predefinito_. Un valore
persistito in `resilienceSettings.requestQueue` (dashboard / patch API, memorizzato
in `key_value`) ha la precedenza su di essa, mentre un valore per singola connessione
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ha la precedenza su entrambi. Di conseguenza, impostare
la variabile d'ambiente in un deployment che dispone già di un valore persistito
non modifica nulla: occorre invece cancellare o aggiornare l'impostazione persistita.

La permanenza in coda è limitata da `maxWaitMs`; il valore `maxQueueDepth` descritto di seguito limita quante
chiamate possono trovarsi contemporaneamente in coda.

**`maxQueueDepth` — limite di ammissione opzionale (nuovo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita il numero di richieste che possono rimanere in coda (non ancora inviate) contemporaneamente per una
singola combinazione provider+connessione. Quando la coda contiene già `maxQueueDepth`
richieste, una nuova richiesta viene rifiutata immediatamente con un errore tipizzato
`code: "RATE_LIMIT_QUEUE_FULL"` **prima** di raggiungere `limiter.schedule()`
— pertanto il rifiuto è poco oneroso e avviene prima di qualsiasi operazione downstream di
compressione / traduzione del prompt per tale richiesta. Il valore predefinito `0` =
disabilitato, preservando l'attuale comportamento con coda illimitata; intervallo consentito 0–100000.
È possibile sovrascriverlo tramite `RATE_LIMIT_MAX_QUEUE_DEPTH` (variabile d'ambiente) o
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch API).

Il controllo di ammissione è una funzione pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), quindi
può essere sottoposto a unit test senza un limiter Bottleneck reale.

> L'RFC che ha aperto #6593 proponeva anche un flag `bypassCompressionOnRateLimit`.
> La pipeline `open-sse/services/compression/` di questo repository esegue la
> compressione del prompt/contesto sulla richiesta LLM in uscita (`chatCore.ts`,
> intorno al blocco `resolveCompressionSettings`/`selectCompressionStrategy`),
> non la compressione della risposta HTTP sui corpi 429 sintetizzati — non esiste
> un percorso del codice corrispondente per un flag di bypass letterale. Attualmente, tale passaggio di compressione del prompt
> viene inoltre eseguito _prima_ di `withRateLimit()` nella pipeline della richiesta, quindi
> riordinarlo per ignorarlo in caso di rifiuto dovuto a una coda piena costituisce una modifica separata e
> più ampia rispetto all'ambito di questa issue; **non** è stato implementato intenzionalmente
> qui ed è lasciato come intervento successivo qualora il risparmio di CPU giustifichi il
> rischio derivante dal riordino.

---

## 6. Watchdog del throughput per stream lenti (#9709)

La protezione opzionale `resilienceSettings.streamRecovery.throughputWatchdog` rileva
un upstream che continua a inviare chunk ma produce output dell'assistente a una
velocità utile inferiore a quella configurata. È intenzionalmente distinta dal timeout
di inattività: heartbeat e metadati non azzerano nessuno dei due timer e non vengono
considerati progressi. È inoltre distinta dalla scadenza rigida del tentativo (#9153),
che rimane un limite assoluto di sicurezza indipendentemente dalla qualità dell'output.

Il watchdog richiede un periodo di riscaldamento seguito da una finestra mobile completa
prima di poter interrompere il tentativo. Conta i delta di testo provenienti dagli eventi
di output delle API Chat Completions e Responses (un'approssimazione prudenziale in byte
UTF-8), ignora gli eventi vuoti o contenenti solo dati di utilizzo e sospende la
valutazione mentre sono in corso eventi di chiamata agli strumenti o di ragionamento. È
disabilitato per impostazione predefinita e può essere abilitato con
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; la finestra, il periodo di riscaldamento, la
velocità minima e l'output minimo misurabile sono vincolati dal normale livello di
normalizzazione delle impostazioni di resilienza.

Quando è abilitato, un'interruzione del watchdog viene applicata soltanto al tentativo
upstream attivo. Prima che qualsiasi byte sia visibile al client, il percorso esistente
di ripristino anticipato sullo stesso account può riaprire il tentativo. Dopo il commit,
lo stream non viene mai riprodotto nuovamente alla cieca; soltanto il contratto esistente
di continuazione sicura a metà stream può unire un suffisso. La finalizzazione rimane
eseguita una sola volta, pertanto la contabilizzazione dell'utilizzo e il rilascio del
semaforo non vengono duplicati.

---

## 7. Riformulazione dello stato upstream (errori di quota con stato errato)

**Ambito:** un gateway upstream che segnala un esaurimento temporaneo della quota con lo stato HTTP errato.

**Scopo:** correggere uno stato fuorviante PRIMA della classificazione, affinché i consumatori downstream (motore di fallback, aggregazione combo, risposta destinata al client) riconoscano la reale natura ritentabile dell'errore.

Alcuni gateway segnalano l'esaurimento TEMPORANEO della quota con uno stato HTTP
non ritentabile. `agentrouter.org` restituisce `403` (talvolta `400`) con un corpo
in cinese (`用户额度不足` / `额度不足`) anziché lo stato standard `429`. Client come Claude
Code considerano `403` permanente e interrompono la sessione; senza correzione,
il motore di fallback lo classificherebbe come `AUTH_ERROR` anziché come evento
di quota.

**Implementazione:**

- Registro + matcher: `open-sse/config/upstreamStatusRestatement.ts` — un
  elenco di regole per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), confrontate tramite `applyStatusRestatement()`.
- Punto di chiamata: il blocco `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (intorno alla riga 3654), subito dopo che `parseUpstreamError()` analizza una risposta
  upstream con uno stato HTTP di errore (`!providerResponse.ok`) e prima
  dell'esecuzione di qualsiasi classificazione, in modo che ogni consumatore
  downstream riceva lo stato corretto. Gli errori incorporati all'interno di uno
  stream SSE con stato `200` seguono un percorso separato e successivo di analisi
  dello stream e **non** sono attualmente coperti da questo hook: si tratta di una
  limitazione nota, non ancora rilevante per lo stato errato di agentrouter (che
  si presenta come uno stato HTTP di errore).
- Idoneità al nuovo tentativo: `429` è incluso in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pertanto un errore
  riformulato include una vera finestra per il nuovo tentativo anziché emergere
  come un `403` definitivo.
- Il valore sintetico `60s` di `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  indica soltanto ciò che la risposta riformulata comunica al **client**; non
  rappresenta di per sé la durata interna del cooldown/blocco della connessione,
  che è regolata separatamente dal meccanismo che gestisce effettivamente l'errore
  riformulato (il backoff crescente di Connection Cooldown, §2, con base `3s` per
  i provider basati su chiave API; oppure Model Lockout, §3, per provider con quota
  per modello come agentrouter). Il router può diventare internamente idoneo a un
  nuovo tentativo prima della finestra di 60 secondi comunicata al client: si tratta
  di un margine intenzionale, non di un bug.

Gli errori permanenti (`无权访问模型` di agentrouter — nessun accesso a questo modello) non
vengono MAI riformulati: `excludeMarkers` annulla la regola anche quando
`textMarkers` produce una corrispondenza, quindi l'errore mantiene il proprio stato
originale e non viene ritentato all'infinito. La regola di classificazione del provider
corrispondente
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown di base dichiarato di `6h`) viene
consultata da `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prima_ del ritorno anticipato generico `FORBIDDEN` per la categoria apikey, subordinatamente
a `honorsRuleLockScope(provider)` (#10334 — attualmente esclusivo di agentrouter tramite
l'allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). Il cooldown dichiarato di 6 ore dalla regola viene propagato
come `fallbackResult.baseCooldownMs`, ma alimenta comunque il percorso preesistente
di blocco della quota per modello (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, invariato da #10334 ad eccezione dell'origine del cooldown):
viene limitato superiormente al valore `mlSettings.maxCooldownMs` dell'operatore
(valore predefinito `1_800_000ms` / 30min), come ogni altro blocco del modello, e il
_motivo del blocco persistito_ rimane il valore preesistente codificato direttamente
`"forbidden"`, non il valore `"auth_error"` della regola: soltanto la durata del cooldown
viene rispettata end-to-end, non la stringa del motivo. La connessione stessa rimane
attiva; gli altri modelli sulla stessa connessione non subiscono alcun effetto.

Gli errori di quota riformulati (`额度不足`) raggiungono una regola del provider in produzione
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, senza un cooldown dichiarato autonomamente — si applica il
backoff predefinito scalato del livello di persistenza). A partire dalla #10334, `scope` su
`ProviderErrorRuleMatch` VIENE utilizzato end-to-end, ma **solo** per i provider inclusi
nell'allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
attualmente solo `"agentrouter"`, con controllo tramite `honorsRuleLockScope()`). Per ogni
altro provider, `scope` rimane informativo, esattamente come prima della #10334.
`checkFallbackError` espone lo scope della regola corrispondente come
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) è la guardia condivisa che conferma che un
`ruleScope` possa essere effettivamente considerato in modo sicuro come un segnale
esteso all'intera connessione e autoripristinante (scope `"connection"`, reason `quota_exhausted`, mai
`permanent`, mai `creditsExhausted` — una protezione contro una futura regola che associ lo scope
`"connection"` a uno stato permanente dell'account). Viene chiamata da due componenti:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  invece di ricadere nel ramo di blocco **per modello** del provider passthrough
  (agentrouter ha `passthroughModels: true` → `hasPerModelQuota()`
  restituisce `true`), applica un **cooldown temporaneo della connessione** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, mai uno stato terminale
  (`credits_exhausted`/`banned`/`expired`) — in modo che la connessione si ripristini
  automaticamente allo scadere del cooldown, anziché richiedere un ripristino manuale delle credenziali.
  Questo passaggio viene ignorato per le connessioni con `disableCooling: true` (#2997): tale opt-out
  ricade invece nel blocco per modello (un compromesso documentato —
  vedere il commento nel codice sopra il ramo).
- **Routing combinato nella stessa richiesta** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): la stessa guardia contrassegna la
  connessione nel Set in memoria `exhaustedConnections`, indicizzato tramite
  `${provider}:${connectionId}`. Questo salta soltanto un target rimanente DELLA STESSA RICHIESTA
  che _contenga già esattamente quel `connectionId`_ nel proprio
  oggetto target (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prima della ricerca in `exhaustedConnections`) — una semplice
  combinazione basata su un elenco di modelli, in cui i target fratelli non contengono un `connectionId`
  proprio preassegnato e questo viene risolto soltanto per ogni dispatch dall'header
  `X-OmniRoute-Selected-Connection-Id` della risposta, non trova mai una corrispondenza con tale chiave. In
  questo caso comune, la vera protezione contro il riutilizzo dell'account
  appena esaurito da parte di un passaggio rimanente NON è questo Set, bensì il livello di persistenza descritto sopra
  (il `rateLimitedUntil` della connessione è ora nel futuro), insieme
  alla stessa guardia che impedisce l'aggiunta del provider a `transientRateLimitedProviders` per
  l'errore (vedere "Progettazione in due fasi" e il commento nel codice relativo al
  ramo `isAgentrouterConnectionQuotaScope` in `targetExhaustion.ts`): poiché
  tale Set non viene contrassegnato, il force-allow `allowRateLimitedConnection` di `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NON si attiva per
  i passaggi rimanenti del provider, quindi il filtro `rateLimitedUntil`
  della selezione delle credenziali (`src/sse/services/auth.ts:1238`) viene rispettato normalmente e un
  passaggio rimanente seleziona una connessione agentrouter diversa e ancora idonea
  oppure fallisce perché non sono disponibili credenziali — non forza il
  riutilizzo della connessione che questo ramo ha appena messo in cooldown.

### Progettazione in due fasi: riformulazione dello stato, quindi classificazione

La riformulazione dello stato (`upstreamStatusRestatement.ts`) e le regole di
classificazione del provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sono registri separati che usano entrambi come chiave l'id del provider
e indicatori testuali, ma vengono eseguiti in punti diversi e hanno
scopi diversi: la riformulazione riscrive anticipatamente lo stato HTTP in `chatCore.ts`;
le regole di classificazione selezionano il `reason` di fallback e lo `scope` di blocco
(`model` / `provider` / `connection`) all'interno di `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Le regole di classificazione possono accedere al **testo** completo dell'errore (necessario per trovare
indicatori nel corpo come `额度不足`) soltanto per i provider elencati nell'allowlist
`FULL_TEXT_RULE_PROVIDERS` in `providerErrorRules.ts` — attualmente solo `"agentrouter"`. Per
ogni altro provider del **catalogo integrato**, `checkFallbackError` passa a
`getProviderErrorRuleMatch` soltanto l'errore strutturato (`{code, type}`), che
è sufficiente per le regole basate su header/stato/codice, ma non può rilevare gli indicatori testuali nel corpo.
L'helper `resolveRuleMatchBody()` effettua questa selezione: il testo completo dell'errore
per i provider nell'allowlist, altrimenti l'errore strutturato. L'aggiunta di un
provider **integrato** a `FULL_TEXT_RULE_PROVIDERS` è un opt-in esplicito per provider
— esiste affinché il percorso predefinito di ogni provider non presente
nell'elenco rimanga invariato byte per byte.

Lo `scope` di una regola (`model` / `provider` / `connection`) è un opt-in separato
da `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` si limita a esporlo come
`fallbackResult.ruleScope`, e i consumer downstream lo considerano qualcosa
di diverso da un'etichetta informativa soltanto per i provider inclusi nell'allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` nello stesso file (con controllo tramite
`honorsRuleLockScope()` — attualmente solo `"agentrouter"`). Vedere "Errori di quota
riformulati" sopra per conoscere il comportamento effettivo di una corrispondenza con `scope: "connection"` una volta che un
provider è incluso in tale allowlist.

**#11104 — le regole dichiarate dall'operatore ignorano entrambe le allowlist.** Un operatore può
dichiarare una regola per provider in fase di esecuzione tramite `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
senza modificare questo file. Subordinare una regola dell'operatore a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
pensate per proteggere il comportamento **predefinito** delle regole del catalogo integrate — renderebbe
il meccanismo delle impostazioni inerte per tutti i provider tranne quelli già
elencati, poiché la dichiarazione della regola costituisce già l'opt-in esplicito
dell'operatore. `resolveRuleMatchBody()` e `honorsRuleLockScope()` verificano entrambi
prima `hasOperatorRuleForProvider()`: un provider con una regola dell'operatore riceve
il testo non elaborato dell'errore e vede rispettato lo `scope` dichiarato, indipendentemente dal
fatto che compaia anche in una delle due allowlist.

**Lacuna nota — `providerRuleRegistry` non viene mai consultato per HTTP 400.**
Il ramo `BAD_REQUEST` di `checkFallbackError` classifica interamente lo stato 400
tramite i propri array di pattern (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` e così via in `accountFallback.ts`) e restituisce il risultato prima
che venga raggiunto il ramo `configuredRule`/`getProviderErrorRuleMatch`
precedente. Una regola del catalogo integrata (o una regola dell'operatore) con `status: 400` è
sintatticamente valida, ma non verrà mai applicata. Attualmente nessuna regola esistente riguarda il 400,
quindi nulla in produzione ne risente; tuttavia, una futura regola per il 400 richiede
prima la modifica di questo ramo, un intervento più ampio rispetto all'aggiunta di una regola (poiché
riclassifica il 400 per ogni provider che già dipende dal comportamento basato sugli array
di pattern) e non rientra nell'ambito dell'aggiunta di una regola per un singolo provider.

### Aggiunta di un nuovo gateway che rappresenta erroneamente la quota

1. Registra un array di regole in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantieni i `textMarkers`
   specifici del provider; non riutilizzare mai frasi inglesi generiche che entrano in conflitto con
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Facoltativamente, registra le regole di classificazione in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) per scegliere
   lo scope di blocco corretto (`connection` per la quota a livello di account, `model` per
   gli errori specifici del modello). Questo passaggio ha effetto in produzione solo per i
   provider le cui regole richiedono il testo completo dell'errore (marcatori nel corpo): aggiungi
   l'id del provider a `FULL_TEXT_RULE_PROVIDERS` nello stesso file; in caso contrario,
   `checkFallbackError` passa alla regola soltanto l'errore strutturato
   `{code, type}` e una regola basata sul testo del corpo non troverà mai corrispondenza nel traffico reale.
   Le regole che trovano corrispondenza esclusivamente in base a `status`/`headers` (come quelle di Opencode o
   Minimax) non richiedono questo opt-in. Separatamente, se la regola dichiara
   `scope: "connection"` e l'intento è un effettivo cooldown a livello di connessione,
   oltre a ignorare la combinazione nella stessa richiesta (non soltanto un'etichetta informativa), aggiungi
   l'id del provider a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nello stesso file: questo
   è ciò che abilita il consumo in stile `isAgentrouterConnectionQuotaScope()` in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); in caso contrario, `scope`
   continua a propagarsi tramite `fallbackResult.ruleScope`, ma nulla agisce su di esso.
3. Aggiungi unit test sul modello di `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluse le verifiche
   not-permanent / not-creditsExhausted e, se il provider richiede
   l'allowlist, un test che verifichi che `resolveRuleMatchBody()` restituisca il
   testo completo soltanto per quel provider).

Non sono necessarie modifiche a `chatCore.ts`, `classifyError` o combo.

#### Blocco raggruppato per egress (#10880)

I provider inclusi in `EGRESS_BUCKETED_LOCK_PROVIDERS` (famiglia opencode) vengono trattati
come upstream raggruppati per IP (il piano gratuito di opencode è raggruppato per IP, non
per account — vedi #9611): uno stato 429 classificato come `quota_exhausted`
**oppure** `rate_limit_exceeded` applica un cooldown a ogni connessione della famiglia inclusa nell'allowlist
il cui ultimo IP di egress noto corrisponde a quello della connessione che ha restituito l'errore, prima che
la rotazione possa provarle
— evitando N-1 chiamate upstream destinate sicuramente a fallire (stessa struttura di #10460/#10525).
`rate_limit_exceeded` è incluso deliberatamente: nel percorso `markAccountUnavailable`
le regole specifiche di opencode non trovano mai corrispondenza (nessun header/corpo viene passato a
`checkFallbackError`, opencode non è incluso in `FULL_TEXT_RULE_PROVIDERS`), quindi un 429
il cui corpo contiene il testo relativo alla quota dell'abbonamento ("monthly usage limit
reached") viene classificato come `quota_exhausted` dal fallback basato sul testo della quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown di 1 ora) prima
che venga mai raggiunta la regola `status_429`, mentre un 429 privo del testo relativo alla quota (semplice
limitazione della frequenza) viene classificato tramite la regola `status_429` come `rate_limit_exceeded`
e applica comunque il cooldown alla famiglia IP. Per un provider incluso nell'allowlist, un limite di frequenza
raggruppato per IP equivale al segnale di una quota esaurita. Limiti effettivi:

- **Best-effort**: il lock risolve l'ultimo `egress_ip` noto della connessione
  da `proxy_logs` (finestra di 24h, sincrono, senza cache). Cache vuota (IP di
  egress mai rilevato) o nessuna riga → la connessione che ha generato l'errore
  viene comunque messa in cooldown dal ramo (registrata come avviene oggi), ma
  nessuna connessione dello stesso gruppo viene bloccata.
- **Mai terminale**: il cooldown è una finestra di quota che si rinnova
  (`testStatus: "unavailable"`); uno stato permanente non viene mai derivato da
  un segnale a livello di IP. Le connessioni `disableCooling` saltano
  completamente il ramo.
- **La granularità del lock cambia per la famiglia nella allowlist**: si tratta
  di un cambiamento di ambito, non solo di un'ottimizzazione per le connessioni
  dello stesso gruppo. opencode è un provider `passthroughModels`, quindi prima
  di questo ramo un 429 produceva un lockout per MODELLO; ora produce un
  cooldown della connessione — anche per un operatore che esegue una singola
  connessione senza alcuna connessione dello stesso gruppo. Questa è la
  granularità che la tabella delle regole di opencode dichiara già corretta
  (`scope: "connection"`, `providerErrorRules.ts`), ma che finora non è mai
  stata rispettata perché opencode non è incluso in
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il ramo scrive autonomamente il cooldown
  - `backoffLevel` della connessione che ha generato l'errore, rispecchiando il
    ramo agentrouter con ambito di connessione, quindi restituisce — il blocco
    per modello e il percorso generico sottostante non vengono mai raggiunti.
- **Combo incluso**: come il ramo agentrouter, l'ambito ignora deliberatamente
  il downgrade `persistUnavailableState`/`isCombo` che un chiamante combo
  applica a un 429. Un lockout per modello non è una forma più debole di questo
  ambito, ma è l'unità sbagliata: non dice nulla sull'IP esaurito, quindi la
  rotazione combo continuerebbe a sprecare una chiamata dal fallimento
  garantito per ogni connessione dello stesso gruppo.
- **Sicurezza delle connessioni dello stesso gruppo**: una connessione dello
  stesso gruppo già terminale (banned/credits_exhausted) o già sottoposta a un
  cooldown più lungo non viene mai sovrascritta.
- **Allowlist esclusiva**: l'ampliamento di
  `EGRESS_BUCKETED_LOCK_PROVIDERS` è una decisione esplicita del proprietario;
  nessun collegamento generico (pattern #10334/#10419). La query delle
  connessioni dello stesso gruppo usa la stessa allowlist anziché ripeterla
  come valore letterale SQL, quindi ampliarla rimane una modifica di una sola
  riga.
- **Rotazione dell'IP di egress, in entrambe le direzioni**: la finestra di
  ricerca (24h) è molto più ampia del TTL della cache dell'IP di egress (5 min),
  quindi l'"ultimo IP noto" è storico, non lo stato corrente. Se il proxy di una
  connessione è stato ruotato all'interno della finestra, il lock potrebbe
  **non rilevare** un IP effettivamente condiviso (l'IP registrato è quello
  nuovo, non esaurito) — e, simmetricamente, potrebbe **mettere in cooldown una
  connessione dello stesso gruppo che nel frattempo è stata spostata** dall'IP
  esaurito. Il secondo caso costa a quella connessione una finestra di
  cooldown; entrambi sono limiti best-effort accettati di una ricerca basata
  sullo storico.
- **Costo**: due scansioni limitate di `proxy_logs` (filtrate per finestra
  tramite `idx_pl_timestamp`), solo con la frequenza degli errori 429. Nessun
  nuovo indice (migrazione 134 YAGNI). Misurato su una copia di dimensioni
  moderate di un DB con traffico reale; un'istanza con throughput elevato
  conserva proporzionalmente più righe nella stessa finestra.

---

## Altre funzionalità di resilienza

- **19 strategie di instradamento** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — consulta [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Instradamento sensibile al reset** (v3.8.0) — assegna la priorità alle connessioni in base al tempo di reset della quota.
- **Degradazione della modalità in background** — `background: true` dell'API Responses viene degradato alla modalità sincrona con un avviso.
- **Rilevamento dinamico del limite degli strumenti** — esclude temporaneamente i provider quando vengono raggiunti i limiti del numero di strumenti.
- **Fallback di emergenza** — controllato da `OMNIROUTE_EMERGENCY_FALLBACK`; gli operatori possono sovrascriverlo dalla pagina Feature Flags senza riavviare.

---

## Debug

- Le risposte della combo ponderata `503 all_targets_cooling_down` (`Retry-After` impostato, `diagnostics.excluded` elenca ogni destinazione con `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) indicano che il pool è configurato e connesso, ma ogni destinazione è esclusa da un timer di resilienza; l'avviso `[COMBO] Weighted selection: every target excluded before dispatch — …` specifica i motivi e i secondi rimanenti. Un errore `404 no_executable_targets` della stessa combo indica che non era coinvolto alcun timer di resilienza (non c'è nulla da eseguire oppure ogni account non ha superato il controllo di disponibilità). Integrato in `open-sse/services/combo/pinRecovery.ts` a partire dalle esclusioni raccolte in `targetResolution.ts`.
- Tutte le chiavi di un provider vengono ignorate → controllare sia lo stato del circuit breaker SIA `rateLimitedUntil`/`testStatus` di ogni connessione.
- Provider escluso definitivamente dopo la finestra di ripristino → il codice legge direttamente `state` anziché usare `getStatus()`/`canExecute()`.
- Una chiave non funziona, ma le altre dovrebbero funzionare → preferire il cooldown della connessione al circuit breaker.
- Non funziona un solo modello → preferire il blocco del modello al cooldown della connessione.
- Lo stato dovrebbe ripristinarsi automaticamente, ma non lo fa → verificare la presenza di un timestamp futuro e di un percorso di lettura che aggiorni lo stato scaduto. Gli stati permanenti richiedono modifiche manuali.

---

## Fingerprinting TLS e modalità stealth

La modalità stealth specifica per provider (JA3/JA4, CCH, offuscamento) è documentata separatamente — consulta `docs/security/STEALTH_GUIDE.md` (git; non compilato in `/docs`).

---

## Test di resilienza (Fase 8 · Blocco C)

Oltre agli unit test per la logica di resilienza, tre test verificano il runtime in
condizioni reali di stress/errore (tutti di integrazione/notturni — nessuno blocca le PR):

| Test               | Cosa verifica                                                                                                                                                                                     | Esecuzione                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Chaos              | Un nodo upstream simulato introduce latenza/reset/timeout/503 reali; verifica che il circuit breaker si apra/si ripristini e che `checkFallbackError` classifichi 503 come fallback recuperabile. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Crescita dell'heap | ~500 stream per `createSSEStream` con `--expose-gc`; non riesce se l'heap cresce oltre il limite massimo (protezione OOM #3069).                                                                  | `npm run test:heap`                       |
| Soak test k6       | Carico sostenuto su `/api/monitoring/health`; soglie p95/errori.                                                                                                                                  | `k6 run tests/load/k6-soak.js` (notturno) |

Orchestrati da `.github/workflows/nightly-resilience.yml` (cron + dispatch). Nel
comando predefinito `test:integration`, i test chaos e heap vengono ignorati automaticamente (senza `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vedi anche

- [Guida all'architettura](./ARCHITECTURE.md) — Architettura del sistema e meccanismi interni
- [Guida utente](../guides/USER_GUIDE.md) — Provider, combinazioni, integrazione con la CLI
- [Motore di combinazione automatica](../routing/AUTO-COMBO.md) — Valutazione a 16 fattori, pacchetti di modalità
