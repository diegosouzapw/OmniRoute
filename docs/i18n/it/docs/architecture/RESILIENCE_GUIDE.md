# Resilience Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute dispone di tre meccanismi di resilienza distinti ma correlati. Ognuno ha un ambito e uno scopo diversi. Mantienili separati durante il debug del comportamento di routing.

![Modello di resilienza a 3 livelli](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**Ambito:** l'intero provider (ad es. `glm`, `openai`, `anthropic`).

**Scopo:** interrompere l'invio di traffico verso un provider che fallisce ripetutamente a livello upstream/di servizio.

**Implementazione:**

- Classe principale: `src/shared/utils/circuitBreaker.ts`
- Collegamento: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API di stato: `GET /api/monitoring/health`
- API di reset: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- Tabella DB: `domain_circuit_breakers`

**Stati:**

- `CLOSED` — traffico normale consentito
- `DEGRADED` — traffico ancora consentito, ma vengono monitorati fallimenti elevati del provider; torna a `CLOSED` dopo un numero sufficiente di successi, dopo un test di connessione valido, oppure dopo la più lunga attesa `OPEN` per l'ultimo tipo di fallimento (il suo valore `cooldownByKind`, altrimenti `resetTimeout`, × `maxBackoffMultiplier`, almeno un cooldown) senza un nuovo fallimento
- `OPEN` — provider temporaneamente bloccato; il routing delle combo lo salta
- `HALF_OPEN` — timeout di reset trascorso; richiesta di probe consentita

**Valori predefiniti configurabili (`open-sse/config/constants.ts`, esposti in Dashboard → Settings → Resilience):**

| Classe  | Degradato a  | Si apre a     | Timeout di reset |
| ------- | ------------ | ------------- | ---------------- |
| OAuth   | 5 fallimenti | 8 fallimenti  | 60s              |
| API-key | 7 fallimenti | 12 fallimenti | 30s              |
| Locale  | derivato     | 2 fallimenti  | 15s              |

`degradationThreshold` controlla quando un provider entra in `DEGRADED`; `failureThreshold` controlla quando si apre e viene saltato. I profili dei provider locali non sono ancora esposti nella pagina delle impostazioni Resilience.

**Codici di attivazione:** solo gli stati a livello di provider `[408, 500, 502, 503, 504]`. NON attivare per errori a livello di account (la maggior parte di 401/403/429 — quelli appartengono al cooldown o al lockout).

**Recupero lazy:** quando `OPEN` scade, `getStatus()`, `canExecute()`, `getRetryAfterMs()` aggiornano lo stato a `HALF_OPEN`. Le stesse letture (e il fallimento successivo) riportano un `DEGRADED` obsoleto a `CLOSED`. Nessun timer in background necessario.

---

### Provider Cooldown globale opt-in (window gate)

Un quarto livello **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, predefinito **off**) mantiene una memoria cross-request dei provider in errore in
`open-sse/services/providerCooldownTracker.ts`, consultata dalla risoluzione dei target delle combo, così che richieste combo consecutive smettano di ripercorrere un provider appena
fallito. Le voci a livello di provider rispettano il window gate di `PROVIDER_PROFILES`:

| Profilo | si attiva dopo (`providerFailureThreshold`) | entro (`providerFailureWindowMs`) | raffredda per (`providerCooldownMs`) |
| ------- | ------------------------------------------: | --------------------------------: | -----------------------------------: |
| OAuth   |                                        `10` |                           `15min` |                               `5min` |
| API key |                                        `15` |                           `30min` |                              `10min` |

Al di sotto della soglia il provider **non** è considerato in raffreddamento; un successo azzera
la finestra. Le voci a livello di connessione (`provider:connectionId`) mantengono invece il
backoff esponenziale `minRetryCooldownMs → maxRetryCooldownMs`. Override:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Guardia di regressione: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown della connessione

**Ambito:** singola connessione/account/chiave del provider.

**Scopo:** saltare una chiave problematica mentre le altre connessioni dello stesso provider continuano a servire.

**Implementazione:**

- Contrassegna come non disponibile: `src/sse/services/auth.ts::markAccountUnavailable()`
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
- Base chiave API: 3s
- 429 con chiave API: preferisce gli header upstream `Retry-After`/di reset o il testo di reset analizzabile
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Protezione anti-thundering-herd:** impedisce che fallimenti concorrenti estendano eccessivamente il cooldown o incrementino due volte `backoffLevel`.

**I 429 da limite di concorrenza non salgono la scala del backoff.** Un `429` il cui body segnala un
limite di concorrenza ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) significa che l'account è sano ma occupato.
`checkFallbackError()` restituisce la ragione `concurrency_limited`: esegue subito il failover
sulla connessione successiva, raffredda questa per un valore fisso
`CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) o per l'hint di retry upstream, mantiene `backoffLevel`
invariato e imposta `skipProviderBreaker`.
Un body di quota esplicito ha comunque la precedenza, quindi un body che corrisponde anche a un
pattern di quota resta un verdetto di quota. Rilevamento: `looksLikeConcurrencyLimit()` in
`src/shared/utils/classify429.ts`; verdetto: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (il `FailureKind` del breaker) è invariato e continua a leggere `rate_limit` per
questi body.

**Gli stalli del contenuto dello stream non raffreddano l'account.** Quando il watchdog degli
stalli di contenuto (`open-sse/utils/streamHandler.ts`) rinuncia a uno stream che non ha inviato
output del modello in tempo, `markAccountUnavailable()` registra l'errore sulla connessione ma
non imposta alcun cooldown: lo stallo appartiene a quella richiesta, il più delle volte un lungo
turno di ragionamento senza ancora alcun output. Gli operatori possono riattivare il
comportamento con `resilienceSettings.streamStallCooldown.enabled` (predefinito `false`).

**I frame di ragionamento riavviano il budget dello stallo di contenuto.** Un modello di
ragionamento può pensare per minuti prima del suo primo token visibile: Claude trasmette frame
`thinking_delta` il cui testo di pensiero può essere vuoto, e l'API Responses trasmette un
elemento di ragionamento dopo l'altro. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) riconosce questi frame e il watchdog riavvia il suo budget
a ognuno di essi invece di annullare il turno. Non sono comunque output del modello, quindi un
turno che termina solo con ragionamento viene comunque segnalato come vuoto, e un turno che
smette di ragionare e invia solo heartbeat fa comunque scattare il watchdog.

I frame binari `reasoningContentEvent` di Kiro con una firma non vuota preservano questa attività
di ragionamento attraverso l'executor come un delta `reasoning_content` vuoto. La firma non viene
inoltrata. Metadati, frame incompleti e firme vuote non riavviano il budget del contenuto; il
timeout indipendente dello stream attivo e la cancellazione del client restano comunque applicati
(`open-sse/executors/kiro/reasoning.ts`).

**Stati terminali (NON cooldown):**

- `banned` — impostato dal rilevamento di parole chiave bannate / ban dell'account (vedi [BAN_DETECTION](../security/BAN_DETECTION.md)) e da tre rifiuti upstream consecutivi per singola richiesta (`request_rejected`, ad es. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); un singolo rifiuto si limita a raffreddare la connessione
- `expired` (transita a terminale dopo tentativi limitati — `EXPIRED_RETRY_MAX = 3` con backoff esponenziale — così gli errori OAuth transitori possono risolversi da soli prima che l'account venga disattivato permanentemente)
- `credits_exhausted`

Questi persistono finché le credenziali non cambiano o un operatore non li reimposta. Non sovrascrivere gli stati terminali con lo stato transitorio del cooldown.

**Ripristino lazy:** quando `rateLimitedUntil` è nel passato, la connessione torna eleggibile. In caso di utilizzo riuscito, `clearAccountError()` cancella tutti i campi di errore.

### Muro di utilizzo OAuth di Claude: corsia a priorità ridotta + reset del limite di sessione

**Ambito:** una connessione con abbonamento Claude (OAuth). Entrambe le funzionalità sono
**opt-in per connessione** (Modifica connessione → sezione Claude → `lowPriorityMode` /
`autoLimitReset` in `providerSpecificData`, entrambe disattivate per impostazione predefinita) e
rispecchiano i comandi `/low-priority` e `/limit-reset` di Claude Code (contratto wire catturato
da Claude Code 2.1.263).

**Implementazione:**

- Macchina a stati + classificazione delle risposte: `open-sse/services/claudeLowPriority.ts`
- Client per stato/claim del reset: `open-sse/services/claudeLimitReset.ts`
- Hook dell'executor (iniezione di header + retry sullo stesso account): `open-sse/executors/base.ts::execute()`
- Persistenza dell'opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** il muro di utilizzo delle 5 ore — un `429` i cui header contengono
`anthropic-ratelimit-unified-status: rejected` e, quando l'account è idoneo,
`anthropic-ratelimit-unified-slow-offer: treatment`. Non viene inviato nulla prima di quel primo
429 da muro; un 429 da burst senza header unified segue il normale percorso di cooldown.

**Corsia a priorità ridotta** (`lowPriorityMode`):

- Al muro 429 l'executor accetta l'offerta e riprova immediatamente sullo **stesso**
  account con `anthropic-usage-limit: slow`; la corsia resta attiva fino al
  `anthropic-ratelimit-unified-reset` annunciato (+60s di margine) e ogni richiesta in
  quella finestra porta l'header. Il 429 intercettato non raggiunge mai `handleChatCore`,
  quindi la connessione **non** viene messa in cooldown e non viene ruotata via.
- `anthropic-ratelimit-unified-slow-status` sulle risposte successive: `active` /
  `not_needed` mantengono la corsia; `slot_busy` (429) o un `529` attendono il
  `anthropic-ratelimit-unified-slow-retry-after` del server (default 20s, clamp 5–600s,
  jitter ±30%) e riprovano, con limite dato da
  `anthropic-ratelimit-unified-slow-max-wait` (default 20 min, clamp 1 min–6 h) — oltre
  questo la corsia termina e un cool-off di 10 minuti blocca la ri-accettazione.
  L'attesa è inoltre limitata da ciò che resta del timeout di avvio upstream della
  richiesta stessa (`resolveFetchStartTimeout`, 10 min di default) meno un margine di 5 s:
  senza quel limite il max-wait predefinito di 20 minuti sopravviverebbe alla richiesta e
  la sleep verrebbe interrotta a metà attesa, facendo emergere un `TimeoutError` invece
  della terminazione graduale `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, un rollover della finestra
  di 5h, oppure `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (che la
  chiude come `extra_usage` con qualsiasi status, poiché l'overage a pagamento ora copre
  il muro) terminano la corsia; la risposta fluisce quindi nel normale percorso di
  cooldown. `budget_exhausted` viene ricordato fino al reset del budget annunciato
  (≤ 8 giorni).
- Il controllo del muro viene eseguito dopo i retry intra-tentativo guidati dai 400
  dell'executor stesso (context editing, clamp di thinking/effort, auto-learn dei
  parametri), quindi un 429 da muro che emerge solo in uno di quei retry viene comunque
  intercettato invece di raggiungere il percorso di cooldown.
- Lo stato è in memoria per connessione (un riavvio costa un 429 da muro extra per la
  ri-accettazione).

**Reset del limite di sessione** (`autoLimitReset`, tentato prima della corsia quando
entrambi sono attivi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blocco
  `juniper_tide`; quando `arm: "reset"` e `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` con
  `{ "program": "juniper_tide" }` (UUID dell'organizzazione da
  `providerSpecificData.organizationUUID`, con fallback al bootstrap).
- `result: reset|not_limited` → la richiesta viene ritentata a piena velocità (nessun
  header slow). `already_used` / `not_offered` memorizzano `next_available_at` (default
  una settimana); qualsiasi fallimento applica un backoff di 15 minuti. Il reset è una
  volta a settimana e conta comunque verso il limite settimanale.

Guardie di regressione: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinità di sessione (#7274)

**Ambito:** una sessione client (header `X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session`) vincolata a una connessione, per **qualsiasi** provider.

**Scopo:** mantenere un agente multi-turno (Claude Code, aider, agenti personalizzati)
sullo stesso account tra le richieste, riducendo la perdita di contesto tra account e i
ripetuti 429 a freddo sui provider con stato di sessione per account.

**Implementazione:**

- Risoluzione del TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selezione/creazione del pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Estrazione dell'header (generica, qualsiasi provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabella dei pin persistita: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Impostazione: `sessionAffinityTtlMs` (TTL globale in ms, `0` disabilita) —
  `src/lib/db/settings.ts`. Rinominata dal precedente `codexSessionAffinityTtlMs`
  (solo Codex) dalla migrazione `124_generic_session_affinity_ttl.sql`, che riporta
  qualsiasi TTL Codex precedentemente configurato come nuovo default.

Prima di #7274, `resolveSessionAffinityTtlMs()` restituiva forzatamente `0` per ogni
provider eccetto `codex`, quindi l'impostazione del TTL (e gli header di sessione) non
aveva alcun effetto altrove, anche se il meccanismo di pinning e l'estrazione degli header
erano già agnostici rispetto al provider. La correzione ha rimosso quel return anticipato;
il TTL ora si applica uniformemente a ogni provider una volta impostato globalmente sopra
`0`.

I tre header di affinità di sessione non vengono mai inoltrati upstream — gli executor
costruiscono da zero i propri header upstream invece di passare attraverso quelli del
client, quindi rimangono solo un id di correlazione interno.

### Lease esclusivi di connessione per sessioni gestite

**Ambito:** un client/sessione HTTP gestito attivo possiede una connessione OmniRoute
idonea.

**Scopo:** fornire una proprietà esclusiva e durevole della connessione per i client che
necessitano di un confine di routing rigido tra le richieste. Questo differisce
dall'affinità di sessione, che è una preferenza di continuità debole: un lease esclusivo
persiste lo stato del ciclo di vita in SQLite, impone l'unicità globale del proprietario
attivo e della connessione attiva, e rifiuta una generazione obsoleta prima del dispatch
al provider.

La funzionalità è opt-in per chiave API. Una chiave gestita deve avere lo scope
`lease:exclusive` e una lista `allowedConnections` esplicita e non vuota. Qualsiasi
client HTTP può usare l'endpoint del ciclo di vita; non è richiesto alcun nome client,
user-agent, provider, metodo OAuth o modello. Il lease possiede una connessione, non un
modello, quindi un cambio di modello mantiene il binding finché la connessione resta
ordinariamente idonea. Le normali regole di modello, quota, salute, cooldown e allowlist
restano autorevoli e possono trasferire la stessa generazione a un'altra connessione
idonea libera.

Il ciclo di vita è `POST /api/v1/session-leases` con le azioni JSON `acquire`, `renew` e `release`.
Le richieste di inferenza gestita presentano il valore opaco `X-OmniRoute-Lease-Owner` e il valore esatto
`X-OmniRoute-Lease-Generation`. Il proprietario utilizza `vlo_` seguito da 43 caratteri base64url; ne viene
memorizzato solo l'hash SHA-256. Ogni fence di dispatch finale vincola anche l'ID della chiave API autenticata
e l'ID della connessione attiva. Gli header di controllo dei lease vengono rimossi dai log, dagli snapshot
delle richieste conservati e dagli header degli esecutori upstream.

Se il routing ordinario presenta candidati gestiti idonei ma ogni candidato libero è occupato da un lease
attivo estraneo, OmniRoute restituisce HTTP `429`, un codice di capacità-lease-non-disponibile, uno stato
di attesa-della-capacità e un `Retry-After` limitato derivato dalla scadenza pertinente più imminente.
La normale assenza di idoneità non costituisce contesa di lease e mantiene la semantica di errore di routing
esistente.

I meccanismi correlati restano separati:

- L'occupazione delle sessioni OAuth è una distribuzione soft a livello di processo per gli account OAuth.
- I semafori degli account concedono permessi di concorrenza delle richieste e terminano al completamento di una richiesta.
- I lease esclusivi delle sessioni gestite rappresentano una proprietà durevole del ciclo di vita con un fence di generazione.

---

## 3. Blocco dei modelli (Model Lockout)

**Ambito:** tripletta provider + connection + model.

**Ambito della chiave in base allo stato:** lo stato di errore decide su quale chiave viene scritto un blocco
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — un segnale di quota o di entitlement — blocca la **famiglia di quota**:
  per codex l'intero ambito `codex` / `spark` (ogni modello `gpt-5*` della
  connessione), per gli altri provider `getQuotaScopedModelForProvider()`.
- `404` blocca il singolo modello (`getModelLockKey()` restringe il caso `not_found`).
- Qualsiasi altro stato — errori di trasporto/server `5xx` e il `502` sintetizzato
  da OmniRoute stesso in seguito alla validazione della qualità — blocca solo la tupla
  **esatta** provider/connection/model. Uno stream difettoso su un modello non è una prova
  riguardo alla quota dell'account; prima di questa regola una singola risposta vuota su
  `codex/gpt-5.6-luna` rimuoveva ogni modello `gpt-5*` di quella connessione dal
  routing per 2–30 min (in crescita) mentre la sua quota era intatta.
- Un'opzione `scope` esplicita del chiamante ha sempre la precedenza (Antigravity passa `"exact"`).

**Scopo:** evitare di disabilitare un'intera connessione quando un solo modello non è disponibile o è limitato dalla quota.

**Esempi:**

- Provider con quota per modello che restituiscono 429
- Provider locali che restituiscono 404 per un modello mancante
- Errori di permesso specifici del provider per modalità/modello (ad es. le modalità di Grok)

**Implementazione:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Pannello Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Elenca i blocchi attivi con: provider, connection, model, reason, expiresAt. Gli operatori possono riabilitare manualmente un modello dalla scheda.

**REST API:**

- `GET /api/resilience/model-cooldowns` — elenca i blocchi attivi
- `DELETE /api/resilience/model-cooldowns` — riabilitazione manuale. Corpo: `{provider, connection, model}`. Autenticazione: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Una pagina unica per ogni connessione esclusa dal routing per un motivo temporaneo, invece di
aprire la pagina di ciascun provider. Elenca i cooldown delle connessioni, i blocchi dei modelli e gli stati
terminali, li cancella per singola connessione, per una selezione o per tutte le connessioni di un provider,
e modifica le regole di cooldown più regolate: `streamStallCooldown.enabled` e il cooldown di base
e i passi massimi di backoff del `connectionCooldown` OAuth / API-key (salvati tramite
`PATCH /api/resilience`). Gli stati terminali (`banned`, `expired`, `credits_exhausted`)
sono elencati ma non vengono mai cancellati qui.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autenticazione: management):

- `GET /api/resilience/cooldowns[?provider=]` — connessioni con stato, cooldown rimanente,
  livello di backoff, tipo dell'ultimo errore e blocchi dei modelli (senza credenziali)
- `POST /api/resilience/cooldowns` — corpo `{connectionIds: string[]}` oppure
  `{all: true, provider?}`; restituisce `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI delle impostazioni di blocco + ripristino con decadimento dei fallimenti per successo (v3.8.23)

Il blocco dei modelli è passato da un comportamento sempre attivo e hardcoded a una funzionalità
completamente configurabile e opzionale (opt-in), con una propria scheda delle impostazioni e un percorso
di ripristino auto-riparante.

**Scheda delle impostazioni:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
È **distinta** dalla `ModelCooldownsCard` di sola lettura vista sopra (che si limita a
_elencare_ i blocchi attivi) — la nuova scheda _configura i parametri_. I valori predefiniti
si trovano in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Impostazione            | Predefinito                      | Significato                                                                                     |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interruttore principale — il blocco dei modelli è **disattivato per impostazione predefinita**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Codici di stato a monte che contano come un errore a livello di modello.                        |
| `baseCooldownMs`        | `120_000` (120 s)                | Durata iniziale del blocco per il primo errore.                                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite massimo del cooldown progressivo.                                                        |
| `maxBackoffSteps`       | `10`                             | Numero massimo di passi di escalation con backoff esponenziale.                                 |
| `useExponentialBackoff` | `true`                           | Se errori ripetuti fanno aumentare il cooldown in modo esponenziale.                            |

Le impostazioni vengono mantenute tramite il normale store delle impostazioni e validate tramite lo
schema delle impostazioni di resilienza; la scheda limita `baseCooldownMs`/`maxCooldownMs`
(con `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Ripristino con decadimento dei fallimenti per successo:** il ripristino **non** è puramente
basato sulla scadenza del timer. Una risposta sana riduce progressivamente il conteggio dei fallimenti
del modello, così un modello che si è ripristinato a metà finestra smette di aumentare (e viene
sbloccato) prima della scadenza del timer. Quando un target di combo ha successo,
`open-sse/services/combo.ts` chiama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), che **dimezza** il `failureCount` memorizzato
(`Math.floor(failureCount / 2)`); quando raggiunge `0` la voce di blocco
viene eliminata completamente. La controparte `recordModelLockoutFailure()`
incrementa il conteggio (e fa aumentare il cooldown) in caso di fallimenti entro la
finestra di escalation. Questo decadimento per successo si aggiunge alla semplice scadenza del timer —
entrambi i percorsi possono riabilitare un modello.

**Stato:** i blocchi sono mantenuti **in memoria** (`Map` per processo di
`ModelLockoutEntry` con chiave `provider:connectionId:model`, blocchi con ambito exact
con chiave `provider:connectionId:exact:model`), non persistiti nel
DB — vanno persi al riavvio. Le _impostazioni_ sono persistite; lo _stato_ dei blocchi
attivi è effimero.

---

## 4. Controllo della concorrenza Quota-Share (v3.8.36)

Gli account in abbonamento (GLM, MiniMax, ecc.) spesso accettano solo ~1–3 richieste
concorrenti; superare tale limite scatena errori 429 e cooldown. Il problema è particolarmente
acuto con le combo **quota-share** (`qtSd/…`), in cui diverse chiavi API condividono un
unico account upstream. Tre livelli impediscono che un account condiviso venga sommerso.

### Limite di concorrenza per connessione (`max_concurrent`)

Ogni connessione provider può dichiarare un tetto `max_concurrent`
(`provider_connections.max_concurrent`, impostato nel modale di connessione / API / DB).
Lasciarlo vuoto per nessun limite. Questa è la singola manopola che guida il livello di
serializzazione descritto sotto — impostarlo sulla concorrenza reale dell'account
(ad es. GLM ~1, MiniMax ~2).

### Limiti di concorrenza per modello (`modelConcurrency`)

Una connessione può inoltre dichiarare tetti di concorrenza esatti per modello
all'interno della sua mappa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Impostarlo nel modale di connessione (**Rate limit overrides → Limiti di concorrenza
per modello**, un `model=cap` per riga) o tramite
`PATCH /api/providers/[id]` con la stessa struttura JSON. Semantica delle chiavi:

- **A livello di connessione vs specifico per modello:** `maxConcurrent` rimane il
  tetto condiviso a livello di connessione. Quando entrambi si applicano, entrambi i
  gate vengono acquisiti atomicamente nello stesso gate composito
  (`global → provider → account → model`); il comportamento effettivo è quello del
  limite applicabile più restrittivo.
- **Corrispondenza esatta della chiave del modello:** la chiave è la stringa del
  modello passata all'executor dopo la risoluzione del routing — normalmente l'id
  del modello upstream puro (`glm-5`), non un alias lato client `provider/model`
  (`zai/glm-5` non corrisponde a `glm-5`). I valori sono tetti di richieste
  concorrenti espressi come interi positivi.
- **Accodamento locale, nessuna discovery:** le richieste in eccesso vengono accodate
  localmente con la semantica esistente di coda/timeout (errori di ammissione
  tipizzati `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute non rileva né
  deduce la policy upstream — applica esattamente i tetti configurati
  dall'operatore. Un gate di modello saturo non disabilita mai il provider e non crea
  mai un lockout permanente del modello; il comportamento upstream di
  429/cooldown/fallback rimane la rete di sicurezza per gli errori.
- **Ambito per connessione, per processo:** i tetti sono per connessione database e
  mantenuti in memoria, quindi due connessioni che riutilizzano la stessa chiave API
  upstream non si coordinano tra loro.
- **Non configurato significa invariato:** omettere la mappa (o lasciare vuoto il
  campo della dashboard) non aggiunge alcun gate di modello. Esempio di configurazione
  senza dichiarare alcun limite universale del provider:

```text
glm-5=1
glm-4.7=3
```

### Serializzazione delle richieste quota-share

Quando un dispatch quota-share punta a una connessione che dichiara un
`max_concurrent` positivo, le richieste concorrenti verso quell'**account** vengono
serializzate tramite un semaforo per connessione (chiave `qsconn:<connectionId>`): le
richieste in eccesso **attendono in coda** invece di sommergere l'account. È
**fail-open** — una coda satura o un timeout procede senza uno slot piuttosto che
rifiutare mai una richiesta dispatchabile. Attivabile in **Impostazioni → Resilienza →
Concorrenza per connessione quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, attivo per impostazione
predefinita). Senza un tetto `max_concurrent` il comportamento è invariato.

> Il gate di routing quota-share (`selectQuotaShareTarget`, DRR + P2C) è esso stesso
> fail-open e si limita a _deprioritizzare_ una connessione al limite — con un pool a
> connessione singola non può imporre un limite rigido, quindi è questo semaforo a
> contenere effettivamente il flusso.

### Retry consapevole del cooldown per le combo

Per ogni strategia combo (quando abilitata), una richiesta che produrrebbe un 429
per un cooldown transitorio BREVE ne attende la scadenza e riesegue il dispatch
invece di restituire il 429 — questo copre le finestre TPM/RPM di classe Gemini
(~60s di retry-after) sulle combo multi-modello, ad es. entrambi i target di una
combo a 2 modelli che colpiscono un rate limit per modello. Delimitato da
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) in
**Impostazioni → Resilienza**. Non attende mai su `quota_exhausted` (bloccato fino a
mezzanotte) né per motivi di autenticazione/non trovato.

Lo stesso gate copre il caso pre-dispatch (#16319): quando ogni target di una combo
viene saltato prima che venga effettuato qualsiasi tentativo perché il suo modello si
trova in un lockout transitorio breve, il percorso a zero tentativi attende la
scadenza del lock entro gli stessi tetti e riesegue il dispatch, invece di rispondere
con un `503 ALL_TARGETS_SKIPPED` privo di hint. Quando nessuna attesa è consentita
(tetto, tentativi o budget esauriti, oppure funzione disattivata), la risposta
terminale viene promossa a `429 rate_limit_error` con `retry_after` / `reset_at`
dalla scadenza del lock transitorio più vicina; i lock per quota, autenticazione e
non trovato mantengono il 503 privo di hint.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Controllo di ammissione della coda di richieste (v3.8.49 · issue #6593)

**Ambito**: la coda locale di rate-limit per provider+connessione (`open-sse/services/rateLimitManager.ts`,
supportata da Bottleneck), un livello al di sotto dei tre meccanismi precedenti.

**`maxWaitMs` delimita l'attesa in coda; `executionMaxWaitMs` delimita l'esecuzione.**
I due sono deliberatamente separati e nessuno dei due alimenta l'altro.

`resilienceSettings.requestQueue.maxWaitMs` è il **budget di attesa in coda**:
copre l'attesa di uno slot del provider e poi la permanenza nello stato QUEUED, e il suo timer viene
azzerato nel momento in cui il job lascia QUEUED e inizia l'esecuzione
(`rateLimitManager.ts`, `wrappedFn`). Una richiesta che lo supera non raggiunge mai
l'upstream. Valore predefinito 30000ms, fornito da `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` e fissato da
`tests/unit/ratelimit-admission-control-6593.test.ts`, quindi una modifica a tale valore fa
diventare rosso quel test invece di lasciare silenziosamente obsoleto questo paragrafo.

`resilienceSettings.requestQueue.executionMaxWaitMs` è ciò che Bottleneck
riceve come `expiration` del job, il cui timer parte solo dopo il dispatch. È
una rete di sicurezza per gli executor privi di un proprio timeout upstream, e viene
portato al timeout di avvio del fetch dell'executor quando quest'ultimo è più lungo, in modo che
non possa interrompere una risposta in volo sana. Valore predefinito 600000ms (10 min).

Alimentare il budget della coda in `expiration` è ciò che in passato uccideva i gateway
non incrementali a metà del volo — che legittimamente restano in esecuzione per minuti prima dei primi byte —
ed è il motivo per cui un'expiration viene esposta come `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) mentre il budget della coda porta il
codice di timeout della coda. Si può sovrascrivere l'uno o l'altro tramite `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) o la dashboard
(**Impostazioni → Resilienza**). Entrambi sono limitati all'intervallo 1ms–24h durante la normalizzazione.

**Precedenza, per entrambi:** la variabile d'ambiente fornisce solo il _valore predefinito_. Un valore
persistito in `resilienceSettings.requestQueue` (dashboard / patch API, memorizzato
in `key_value`) ha la precedenza su di esso, e un
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` per connessione ha la precedenza su tutto. Impostare
la variabile d'ambiente su un deployment che ha già un valore persistito non cambia
quindi nulla — cancellare o aggiornare invece l'impostazione persistita.

La permanenza in coda è delimitata da `maxWaitMs`; il `maxQueueDepth` qui sotto delimita quanti
chiamanti possono essere in coda contemporaneamente.

**Retry dichiarati nel body: pacing vs lockout.** Un body 429 può indicare la propria attesa
(Gemini `RetryInfo.retryDelay`, testo "retry after Ns"), che
`updateFromResponseBody` legge. Un'attesa che rientra nel `maxWaitMs`
della connessione è pacing: il limiter svuota il suo reservoir per quel periodo e le chiamate in coda
vengono inviate quando si riempie. Un'attesa più lunga di `maxWaitMs` non è qualcosa che la
coda possa aspettare — Gemini risponde a una quota giornaliera esaurita con
`retryDelay: "86399s"`. Il `Retry-After` ritrasmesso sul 429 ricostruito (#16528)
fa già sì che il motore di fallback blocchi il modello per quella finestra, ma mettere in pausa
anche il limiter per essa bloccherebbe comunque qualsiasi chiamata che raggiunga la chiave in anticipo
(dopo un reset di resilienza, ad esempio) per l'intero `maxWaitMs`. Quando tale attesa proviene da un
dettaglio tipizzato di Google `RetryInfo`
(la provenienza `google_rpc_retry_info`) e il limiter della chiave è
già limitato al modello (vedi `getLimiterKey`), il 429 diventa invece un lockout del modello
su quella connessione (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitato a 24h), e il
limiter viene lasciato non in pausa. La selezione dell'account salta in base a quel lock tramite
`isModelLocked()`, e lo stesso fa il gate pre-dispatch della combo per i target fissati
sulla connessione. Su antigravity, il cui limiter è per famiglia di quote, il lock è
sul modello esatto, come i suoi altri lock di quota. Anche il nome richiesto
dal cliente viene bloccato quando un alias lo ha risolto in quel modello, perché quei controlli usano
il nome richiesto; viene bloccato esattamente (`lockExactModel`), quindi un alias che
attraversa una famiglia di quote di antigravity o uno scope codex non blocca mai il proprio. Un
suggerimento in prosa, un `retryDelay` non tipizzato o un
limiter condiviso dall'intera connessione mantengono la pausa. Quando il limiter che il
percorso del 429 ha appena ricostruito va in pausa, un chiamante il cui tempo di coda rimanente termina
prima della pausa viene respinto immediatamente con il codice di timeout della coda
(`checkLimiterPause`) invece di attendere quel tempo; la fine registrata è
ancorata prima che il limiter venga costruito, dove Bottleneck avvia il suo orologio di
refresh, e qualsiasi modifica successiva al reservoir la dimentica. Coperto da
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` e
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limite di ammissione opt-in (novità).** `resilienceSettings.requestQueue.maxQueueDepth`
delimita quante richieste possono restare in coda (non ancora inviate) per un singolo
provider+connessione alla volta. Quando la coda contiene già `maxQueueDepth`
richieste, una nuova richiesta viene respinta rapidamente con un errore tipizzato
`code: "RATE_LIMIT_QUEUE_FULL"` **prima** che raggiunga mai `limiter.schedule()`
— quindi il rifiuto è economico e avviene prima di qualsiasi lavoro a valle di
compressione del prompt / traduzione per quella richiesta. Valore predefinito `0` =
disabilitato, preservando il comportamento esistente di coda illimitata; limitato a 0–100000.
Sovrascrivibile tramite `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) o
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch API).

Il controllo di ammissione stesso è una funzione pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) così
è testabile a livello di unità senza un limiter Bottleneck reale.

> La RFC che ha aperto #6593 proponeva anche un flag
> `bypassCompressionOnRateLimit`. La pipeline `open-sse/services/compression/`
> di questo repository riguarda la compressione del prompt/contesto sulla
> richiesta LLM in uscita (`chatCore.ts`, intorno al blocco
> `resolveCompressionSettings`/`selectCompressionStrategy`), non la
> compressione della risposta HTTP sui corpi 429 sintetizzati — non esiste
> alcun percorso di codice corrispondente per un flag di bypass letterale.
> Inoltre, quel passaggio di compressione del prompt viene attualmente
> eseguito _prima_ di `withRateLimit()` nella pipeline delle richieste, quindi
> riordinarlo per saltarlo in caso di rifiuto per coda piena è una modifica
> separata e più ampia rispetto all'ambito di questo issue; è stata
> intenzionalmente **non** implementata qui ed è lasciata come follow-up nel
> caso in cui il risparmio di CPU valga il rischio del riordino.

### Rete di sicurezza per l'attivazione automatica del rate-limit e protezione della connessione (`rateLimitProtection`)

**Rete di sicurezza per l'attivazione automatica** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, default `true`):
Per impostazione predefinita, OmniRoute abilita automaticamente la protezione della coda di rate-limit per tutte le connessioni provider attive basate su chiave API (`getProviderCategory(provider) === "apikey"`). Ciò garantisce che le richieste in arrivo verso chiavi API upstream sensibili al rate-limit vengano accodate e limitate tramite Bottleneck anziché trasformarsi in raffiche di errori 429 upstream. La rete di sicurezza può essere sovrascritta tramite la variabile d'ambiente `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` la disattiva, `true`/`1`/`on` forza l'attivazione), che ha la precedenza sull'impostazione persistente della dashboard (**Impostazioni → Resilienza** / `PATCH /api/resilience`).

**Semantica del campo `rateLimitProtection` per connessione:**
La protezione rate-limit per connessione è tracciata tramite il campo booleano `rateLimitProtection` sulle connessioni provider (persistito come `rate_limit_protection` in SQLite):

- **Attivazione esplicita (`rateLimitProtection === true`)**: la protezione rate-limit è esplicitamente abilitata per questa connessione, indipendentemente dalla categoria del provider o dal fatto che la rete di sicurezza di attivazione automatica sia attiva.
- **Disattivazione esplicita (`rateLimitProtection === false`)**: disabilita la protezione esplicita, ma **non** esclude una connessione con chiave API attiva dalla rete di sicurezza globale di attivazione automatica. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` e `undefined` sono equivalenti: solo `rateLimitProtection === true` viene trattato come un override esplicito. Se `rateLimitProtection` è `false` (o non impostato), una connessione con chiave API attiva soddisfa comunque la condizione di attivazione automatica e rimane protetta dal rate-limit.
- **Nessuna esclusione per singola connessione**: un operatore non può attualmente esprimere "questa singola connessione con chiave API attiva deve funzionare senza la protezione della coda di rate-limit" mantenendo l'attivazione automatica attiva per le altre. Per eseguire le connessioni con chiave API completamente senza code di rate-limit, la rete di sicurezza deve essere disattivata globalmente (`RATE_LIMIT_AUTO_ENABLE=false` oppure `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Percorsi di scrittura supportati:**

- **`POST /api/rate-limits`**: il percorso di scrittura di gestione supportato per attivare/disattivare `rateLimitProtection` per una connessione (`{ connectionId: string, enabled: boolean }`). Chiamarlo con `enabled: true` attiva la protezione esplicita; chiamarlo con `enabled: false` rimuove la protezione esplicita (sebbene le connessioni con chiave API attive rimangano coperte dalla rete di sicurezza globale se l'attivazione automatica è attiva).
- **`PUT /api/providers/[id]`**: deliberatamente **non** accetta né modifica `rateLimitProtection` (#11278). L'aggiornamento dei metadati della connessione provider tramite `PUT /api/providers/[id]` non modificherà mai lo stato persistente della protezione rate-limit.

---

## 6. Watchdog del throughput degli stream lenti (#9709)

La protezione opzionale `resilienceSettings.streamRecovery.throughputWatchdog` rileva
un upstream che sta ancora inviando chunk ma produce output dell'assistente al di sotto
della velocità di output utile configurata. È deliberatamente distinta dal timeout di
inattività: heartbeat e metadati non azzerano nessuno dei due timer e non contano come
progresso. È inoltre distinta dalla scadenza rigida del tentativo (#9153), che rimane
un limite di sicurezza assoluto indipendentemente dalla qualità dell'output.

Il watchdog richiede un periodo di riscaldamento seguito da una finestra mobile completa
prima di poter interrompere. Conta i delta di testo dagli eventi di output di Chat
Completions e Responses API (un proxy conservativo in byte UTF-8), ignora gli eventi
vuoti o di solo utilizzo e sospende la valutazione mentre sono in corso eventi di
chiamata di strumenti o di ragionamento. È disabilitato per impostazione predefinita e
può essere abilitato con `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; la finestra, il
riscaldamento, la velocità minima e l'output minimo misurabile sono limitati dal normale
livello di normalizzazione delle impostazioni di resilienza.

Quando è abilitato, un'interruzione del watchdog viene applicata solo al tentativo
upstream attivo. Prima di qualsiasi byte visibile al client, il percorso esistente di
ripristino anticipato sullo stesso account può riaprire il tentativo. Dopo il commit,
lo stream non viene mai rieseguito alla cieca; solo il contratto esistente di
continuazione sicura a metà stream può ricucire un suffisso. La finalizzazione rimane
a esecuzione singola, quindi la contabilizzazione dell'utilizzo e il rilascio del
semaforo non vengono duplicati.

---

## 7. Riformulazione dello stato upstream (errori di quota con stato errato)

**Ambito:** un gateway upstream che segnala un esaurimento temporaneo della quota con lo stato HTTP sbagliato.

**Scopo:** correggere uno stato fuorviante PRIMA della classificazione, in modo che i consumer a valle (motore di fallback, aggregazione combo, la risposta rivolta al client) vedano la vera natura ripetibile del fallimento.

Alcuni gateway segnalano un esaurimento TEMPORANEO della quota con uno stato
HTTP non ripetibile. `agentrouter.org` restituisce `403` (a volte `400`) con un
corpo in cinese (`用户额度不足` / `额度不足`) invece dello standard `429`. Client
come Claude Code trattano `403` come permanente e interrompono la sessione, e
senza correzione il motore di fallback lo classificherebbe come `AUTH_ERROR`
invece che come evento di quota.

**Implementazione:**

- Registro + matcher: `open-sse/config/upstreamStatusRestatement.ts` — un
  elenco di regole per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), confrontate tramite
  `applyStatusRestatement()`.
- Punto di chiamata: il blocco `providerFailure:` in
  `open-sse/handlers/chatCore.ts` (intorno alla riga 3654), subito dopo che
  `parseUpstreamError()` ha analizzato una risposta upstream con uno stato HTTP
  di errore (`!providerResponse.ok`), e prima che venga eseguita qualsiasi
  classificazione, così ogni consumer a valle vede lo stato corretto. Gli
  errori incorporati all'interno di uno stream SSE `200` seguono un percorso
  di parsing dello stream separato e successivo e **non** sono coperti da
  questo hook oggi — una limitazione nota, non ancora necessaria per lo stato
  errato di agentrouter (che emerge come stato HTTP di errore).
- Idoneità al retry: `429` è in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), quindi un errore
  riformulato porta con sé una vera finestra di retry invece di emergere come
  un `403` definitivo.
- Il `defaultRetryAfterMs` sintetico di `60s` (`upstreamStatusRestatement.ts`)
  è solo ciò che la risposta riformulata comunica al **client**; non è di per
  sé la durata interna di cooldown/lockout della connessione — questa è
  governata separatamente dal meccanismo che gestisce effettivamente l'errore
  riformulato (il backoff progressivo del Connection Cooldown, §2, base `3s`
  per i provider con API key; oppure il Model Lockout, §3, per i provider con
  quota per modello come agentrouter). Il router può diventare idoneo al retry
  internamente prima della finestra di 60s che pubblicizza al client — margine
  intenzionale, non un bug.

Gli errori permanenti (`无权访问模型` di agentrouter — nessun accesso a questo
modello) non vengono MAI riformulati: `excludeMarkers` pone il veto alla regola
anche quando `textMarkers` corrisponde, quindi l'errore mantiene il suo stato
originale e nulla lo ritenta all'infinito. La regola di classificazione del
provider corrispondente (`agentrouter-model-access-denied` in
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, un cooldown base dichiarato di `6h`) viene consultata da
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _prima_ del
return anticipato generico `FORBIDDEN` della categoria apikey, condizionata da
`honorsRuleLockScope(provider)` (#10334 — attualmente esclusiva di agentrouter
tramite la allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). Il cooldown di 6h dichiarato dalla regola fluisce
come `fallbackResult.baseCooldownMs`, ma alimenta comunque il percorso di
lockout per quota per modello preesistente (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, invariato da #10334 tranne per la sorgente del
cooldown): viene limitato al valore `mlSettings.maxCooldownMs` dell'operatore
(default `1_800_000ms` / 30min), come ogni altro model lockout, e la _causa di
lockout persistita_ resta quella hardcoded preesistente `"forbidden"`, non
`"auth_error"` della regola — solo la durata del cooldown viene onorata
end-to-end, non la stringa della causa. La connessione stessa resta attiva; i
modelli fratelli sulla stessa connessione non sono interessati.

Gli errori di quota riformulati (`额度不足`) raggiungono una regola del provider
in produzione (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, nessun cooldown dichiarato proprio — si applica il
default di backoff scalato del livello di persistenza). Da #10334, `scope` su
`ProviderErrorRuleMatch` VIENE consumato end-to-end, ma **solo** per i provider
nella allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
oggi solo `"agentrouter"`, condizionato tramite `honorsRuleLockScope()`). Per
ogni altro provider `scope` resta informativo, esattamente come prima di
#10334. `checkFallbackError` espone lo scope della regola corrispondente come
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) è la guardia condivisa che conferma che un
`ruleScope` è genuinamente sicuro da onorare come segnale a livello di
connessione e auto-ripristinante (scope `"connection"`, reason
`quota_exhausted`, mai `permanent`, mai `creditsExhausted` — una difesa contro
una futura regola che accoppi lo scope `"connection"` con uno stato account
permanente). Due consumer lo chiamano:

- **Persistenza** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  invece di ricadere nel ramo di blocco **per modello** del provider passthrough
  (agentrouter ha `passthroughModels: true` → `hasPerModelQuota()`
  restituisce `true`), applica un **periodo di sospensione temporaneo della connessione** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, mai uno stato terminale
  (`credits_exhausted`/`banned`/`expired`) — in modo che la connessione si ripristini
  autonomamente una volta terminato il periodo di sospensione, anziché richiedere un ripristino manuale delle credenziali.
  Questo comportamento viene ignorato per le connessioni con `disableCooling: true` (#2997): tale esclusione
  ricade invece nel blocco per modello (un compromesso documentato —
  vedere il commento nel codice sopra il ramo).
- **Instradamento combinato nella stessa richiesta** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): la stessa guardia contrassegna la
  connessione nell'insieme in memoria `exhaustedConnections`, indicizzato da
  `${provider}:${connectionId}`. Questo ignora soltanto una destinazione rimanente della STESSA RICHIESTA
  che _contiene già quello stesso `connectionId` esatto_ nel proprio
  oggetto di destinazione (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prima della ricerca in `exhaustedConnections`) — una normale
  combinazione basata su un elenco di modelli, in cui le destinazioni adiacenti non contengono un proprio `connectionId`
  fissato e ne viene risolto uno solo per ogni invio dall'header
  `X-OmniRoute-Selected-Connection-Id` della risposta, non produce mai una corrispondenza con tale chiave. In
  questo caso comune, la vera protezione contro il riutilizzo dell'account
  appena esaurito da parte di un ramo rimanente NON è questo Set, bensì il livello di persistenza descritto sopra
  (il valore `rateLimitedUntil` della connessione si trova ora nel futuro), insieme alla
  soppressione di `transientRateLimitedProviders` per l'errore da parte di
  questa stessa guardia (vedere "Progettazione in due fasi" e il commento nel codice sul
  ramo `isAgentrouterConnectionQuotaScope` in `targetExhaustion.ts`): poiché
  tale Set non viene contrassegnato, la forzatura di `allowRateLimitedConnection` in
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NON viene
  attivata per i rami rimanenti del provider, quindi il filtro `rateLimitedUntil`
  della selezione delle credenziali (`src/sse/services/auth.ts:1238`) viene rispettato normalmente e un
  ramo rimanente seleziona una connessione agentrouter diversa e ancora idonea
  oppure non riesce perché non sono disponibili credenziali — non forza il proprio
  riutilizzo della connessione che questo ramo ha appena messo in sospensione.

### Progettazione in due fasi: riformulazione dello stato, quindi classificazione

La riformulazione dello stato (`upstreamStatusRestatement.ts`) e le regole di
classificazione del provider (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sono registri distinti, entrambi basati sull'id del provider
e su indicatori testuali, ma vengono eseguiti in punti diversi e hanno
scopi diversi: la riformulazione riscrive anticipatamente lo stato HTTP in `chatCore.ts`;
le regole di classificazione determinano il `reason` di fallback e lo `scope`
del blocco (`model` / `provider` / `connection`) all'interno di `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Le regole di classificazione vedono il **testo** completo dell'errore (necessario per trovare corrispondenze con
indicatori nel corpo come `额度不足`) soltanto per i provider elencati nella allowlist
`FULL_TEXT_RULE_PROVIDERS` in `providerErrorRules.ts` — attualmente soltanto `"agentrouter"`. Per
ogni altro provider del **catalogo integrato**, `checkFallbackError` passa a
`getProviderErrorRuleMatch` soltanto l'errore strutturato (`{code, type}`), che
è sufficiente per le regole basate su header, stato o codice, ma non rileva gli indicatori testuali nel corpo.
La funzione helper `resolveRuleMatchBody()` esegue questa selezione: il testo completo dell'errore
per i provider presenti nell'allowlist, altrimenti l'errore strutturato. L'aggiunta di un
provider **integrato** a `FULL_TEXT_RULE_PROVIDERS` costituisce un'adesione esplicita specifica del provider
ed esiste affinché il percorso predefinito per ogni provider non presente
nell'elenco rimanga invariato byte per byte.

Lo `scope` di una regola (`model` / `provider` / `connection`) costituisce un'adesione separata
rispetto a `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` lo espone soltanto come
`fallbackResult.ruleScope`, mentre i componenti downstream lo considerano qualcosa
di diverso da un'etichetta informativa soltanto per i provider presenti nella
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dello stesso file (controllata tramite `honorsRuleLockScope()` — attualmente soltanto `"agentrouter"`). Vedere "Errori di quota
riformulati" sopra per comprendere che cosa fa effettivamente una corrispondenza con `scope: "connection"` quando un
provider è presente in tale allowlist.

**#11104 — le regole dichiarate dall'operatore ignorano entrambe le allowlist.** Un operatore può
dichiarare una regola per provider in fase di esecuzione tramite `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
senza modificare questo file. Subordinare una regola dell'operatore a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
concepite per proteggere il comportamento **predefinito** delle regole del catalogo integrato — renderebbe
il meccanismo delle impostazioni inefficace per ogni provider, ad eccezione di quelli già
elencati, poiché la dichiarazione della regola rappresenta già l'adesione esplicita dell'operatore.
`resolveRuleMatchBody()` e `honorsRuleLockScope()` verificano entrambi prima
`hasOperatorRuleForProvider()`: un provider con una regola dell'operatore riceve
il testo non elaborato dell'errore e il relativo `scope` dichiarato viene rispettato, indipendentemente dal
fatto che compaia anche in una delle allowlist.

**Limitazione nota — `providerRuleRegistry` non viene mai consultato per HTTP 400.**
Il ramo `BAD_REQUEST` di `checkFallbackError` classifica interamente lo stato 400
tramite i propri array di pattern (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` e così via in `accountFallback.ts`) e restituisce il risultato prima
che venga raggiunto il ramo `configuredRule`/`getProviderErrorRuleMatch` sovrastante.
Una regola del catalogo integrato (o una regola dell'operatore) con `status: 400` è
sintatticamente valida, ma non verrà mai attivata. Attualmente nessuna regola esistente riguarda 400,
quindi nulla in produzione ne risente; tuttavia, una futura regola per 400 richiederà prima
la modifica di questo ramo, un intervento più ampio rispetto all'aggiunta di una regola (poiché
riclassifica 400 per ogni provider che già dipende dal comportamento degli array di pattern)
e non rientra nell'ambito dell'aggiunta di una regola per un singolo provider.

### Aggiungere un nuovo gateway che riporta erroneamente la quota

1. Registrare un array di regole in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenere i `textMarkers`
   specifici per provider; non riutilizzare mai frasi generiche in inglese che
   collidono con `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Facoltativamente, registrare le regole di classificazione in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) per scegliere
   l'ambito di blocco corretto (`connection` per la quota a livello di account,
   `model` per gli errori specifici del modello). Questo passaggio ha effetto in
   produzione solo per i provider le cui regole richiedono il testo completo
   dell'errore (marker nel body): aggiungere l'id del provider a
   `FULL_TEXT_RULE_PROVIDERS` nello stesso file — altrimenti `checkFallbackError`
   passa alla regola sempre e solo l'errore strutturato `{code, type}` e una
   regola basata sul testo del body non corrisponderà mai al traffico reale.
   Le regole che corrispondono puramente su `status`/`headers` (come quelle di
   Opencode o di Minimax) non richiedono questo opt-in. Separatamente, se la
   regola dichiara `scope: "connection"` e l'intento è un cooldown effettivo a
   livello di connessione più il salto della combo nella stessa richiesta (non
   solo un'etichetta informativa), aggiungere l'id del provider a
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nello stesso file — è questo che abilita
   il consumo in stile `isAgentrouterConnectionQuotaScope()` in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); senza di esso, `scope`
   continua a fluire attraverso `fallbackResult.ruleScope` ma nulla agisce su
   di esso.
3. Aggiungere unit test che rispecchiano `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluse le guardie
   not-permanent / not-creditsExhausted e — se il provider necessita
   dell'allowlist — un test che verifica che `resolveRuleMatchBody()`
   restituisca il testo completo solo per quel provider).

Non sono necessarie modifiche a `chatCore.ts`, `classifyError` o alla combo.

#### Blocco per bucket di egress (#10880)

I provider in `EGRESS_BUCKETED_LOCK_PROVIDERS` (famiglia opencode) sono trattati
come upstream bucketizzati per IP (il free tier di opencode è bucketizzato per
IP, non per account — vedi #9611): uno status-429 classificato come
`quota_exhausted` **oppure** `rate_limit_exceeded` mette in cooldown ogni
connessione della famiglia in allowlist il cui ultimo IP di egress noto
corrisponde a quello della connessione fallita, prima che la rotazione possa
provarle — evitando N-1 chiamate upstream con fallimento garantito (stesso
schema di #10460/#10525). `rate_limit_exceeded` è incluso deliberatamente: nel
percorso `markAccountUnavailable` le regole specifiche di opencode non
corrispondono mai (nessun header/body passato a `checkFallbackError`, opencode
non è in `FULL_TEXT_RULE_PROVIDERS`), quindi un 429 il cui body contiene il
testo sulla quota dell'abbonamento ("monthly usage limit reached") viene
classificato come `quota_exhausted` dal fallback del testo-quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown di 1h) prima
che la regola `status_429` venga mai raggiunta — mentre un 429 privo di
testo-quota (puro rate limiting) viene classificato tramite la regola
`status_429` come `rate_limit_exceeded` e mette comunque in cooldown la
famiglia IP. Per un provider in allowlist, un rate limit bucketizzato per IP è
lo stesso segnale di una quota esaurita. Limiti, in tutta onestà:

- **Best-effort**: il lock risolve l'ultimo `egress_ip` noto della
  connessione da `proxy_logs` (finestra di 24 ore, sincrono, senza cache).
  Cache fredda (IP di egress mai rilevato) o nessuna riga → la connessione
  fallita viene comunque raffreddata dal ramo (registrata come oggi), solo che
  nessuna sorella viene bloccata.
- **Mai terminale**: il cooldown è una finestra di quota che si rinnova
  (`testStatus: "unavailable"`); uno stato permanente non viene mai derivato da
  un segnale a livello di IP. Le connessioni `disableCooling` saltano
  interamente il ramo.
- **La granularità del lock cambia per la famiglia in allowlist**: questo è un
  cambiamento di ambito, non solo un'ottimizzazione per le sorelle. opencode è
  un provider `passthroughModels`, quindi prima di questo ramo un 429 produceva
  un lockout per-MODELLO; ora produce un cooldown della connessione — anche per
  un operatore che esegue una singola connessione senza alcuna sorella. Questa
  è la granularità che la tabella delle regole di opencode dichiara già
  corretta (`scope: "connection"`, `providerErrorRules.ts`), mai onorata finora
  perché opencode non è in `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Il ramo scrive
  esso stesso il cooldown + `backoffLevel` della connessione fallita,
  rispecchiando il ramo agentrouter con ambito di connessione, e ritorna — il
  blocco per-modello e il percorso generico sottostante non vengono mai
  raggiunti.
- **Combo inclusa**: come il ramo agentrouter, l'ambito ignora deliberatamente
  il downgrade `persistUnavailableState`/`isCombo` che un chiamante combo
  applica a un 429. Un lockout per-modello non è una forma più debole di
  questo ambito, è l'unità sbagliata: non dice nulla sull'IP esausto, quindi la
  rotazione combo continuerebbe a bruciare una chiamata garantita-fallita per
  sorella.
- **Sicurezza delle sorelle**: una sorella già terminale
  (banned/credits_exhausted) o già in un cooldown più lungo non viene mai
  sovrascritta.
- **Allowlist esclusiva**: allargare `EGRESS_BUCKETED_LOCK_PROVIDERS` è una
  decisione esplicita del proprietario; nessun wiring generico (pattern
  #10334/#10419). La query delle sorelle usa quella stessa allowlist come
  parametro di binding invece di ripeterla come letterale SQL, quindi
  allargarla resta una modifica di una riga.
- **Rotazione dell'IP di egress, in entrambe le direzioni**: la finestra di
  ricerca (24 ore) è molto più ampia del TTL della cache dell'IP di egress
  (5 min), quindi "ultimo IP noto" è storia, non stato corrente. Se il proxy di
  una connessione ha ruotato all'interno della finestra, il lock può
  **mancare** un IP genuinamente condiviso (l'IP registrato è quello nuovo, non
  esausto) — e simmetricamente può **raffreddare una sorella che nel frattempo
  ha ruotato via** dall'IP esausto. Il secondo caso costa a quella sorella una
  finestra di cooldown; entrambi sono limiti best-effort accettati di una
  ricerca basata sulla storia.
- **Costo**: due scansioni limitate di `proxy_logs` (filtrate per finestra
  tramite `idx_pl_timestamp`), solo alla frequenza dei 429. Nessun nuovo indice
  (migrazione 134 YAGNI). Misurato su una copia di DB con traffico reale di
  dimensioni moderate; un'istanza ad alto throughput contiene
  proporzionalmente più righe nella stessa finestra.

---

## Altre funzionalità di resilienza

- **21 strategie di routing** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — vedi [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing sensibile al reset** (v3.8.0) — dà priorità alle connessioni in base all'orario di reset della quota.
- **Degradazione della modalità background** — la Responses API con `background: true` viene degradata a sincrona con un avviso.
- **Rilevamento dinamico dei limiti dei tool** — riduce la pressione sui provider quando vengono raggiunti i limiti sul numero di tool.
- **Fallback di emergenza** — controllato da `OMNIROUTE_EMERGENCY_FALLBACK`; gli operatori possono sovrascriverlo dalla pagina dei Feature Flags senza riavvio.

---

## Debug

- La combo weighted risponde con `503 all_targets_cooling_down` (`Retry-After` impostato, `diagnostics.excluded` elenca ogni target con `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → il pool è configurato e connesso, ogni target è semplicemente escluso da un timer di resilienza; l'avviso `[COMBO] Weighted selection: every target excluded before dispatch — …` indica le ragioni e i secondi rimanenti. Un `404 no_executable_targets` dalla stessa combo significa che nessun timer di resilienza era coinvolto (nulla da eseguire, oppure ogni account ha fallito il probe di disponibilità). Costruito in `open-sse/services/combo/pinRecovery.ts` dalle esclusioni raccolte in `targetResolution.ts`.
- Tutte le chiavi di un provider saltate → controlla sia lo stato del circuit breaker SIA il `rateLimitedUntil`/`testStatus` di ogni connessione.
- Provider escluso permanentemente dopo la finestra di reset → codice che legge lo `state` grezzo invece di `getStatus()`/`canExecute()`.
- Una chiave fallisce, le altre dovrebbero funzionare → preferisci il cooldown della connessione rispetto al circuit breaker.
- Fallisce un solo modello → preferisci il model lockout rispetto al cooldown della connessione.
- Lo stato dovrebbe auto-ripristinarsi ma non lo fa → verifica la presenza di un timestamp futuro + un percorso di lettura che aggiorni lo stato scaduto. Gli stati permanenti richiedono modifiche manuali.

---

## Stato di runtime — riferimento rapido per l'agente

> Spostato verbatim da `AGENTS.md` → "Resilience Runtime State" (PR #12743) affinché la
> guida per l'agente resti sotto il budget di contesto di 40k. È la vista condensata,
> rivolta all'agente, delle sezioni precedenti; le sezioni numerate restano il
> riferimento completo.

OmniRoute ha tre meccanismi di gestione dei fallimenti temporanei correlati ma
distinti. Mantieni separati i loro ambiti durante il debug del comportamento di
routing. Consulta il
[diagramma della resilienza a 3 livelli](../diagrams/exported/resilience-3layers.svg)
(sorgente: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
per una mappa a colpo d'occhio.

### Circuit breaker del provider

**Ambito**: intero provider, ad es. `glm`, `openai`, `anthropic`.

**Scopo**: interrompere l'invio di traffico verso un provider che fallisce
ripetutamente a livello upstream/di servizio, così che un singolo provider non
sano non rallenti ogni richiesta.

**Implementazione**:

- Classe principale: `src/shared/utils/circuitBreaker.ts`
- Integrazione del gate di chat e dell'esecuzione: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API di stato runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper condivisi: `open-sse/services/accountFallback.ts`
- Tabella di stato persistente: `domain_circuit_breakers`

**Stati** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: il traffico normale è consentito.
- `DEGRADED`: fascia di pre-allarme — i fallimenti hanno superato la soglia di
  degradazione ma non ancora quella del breaker; il traffico continua a scorrere,
  le dashboard mostrano l'avviso. Un test di connessione valido o una finestra di
  quiete senza nuovi fallimenti lo riporta a `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` indica la finestra).
- `OPEN`: il provider è temporaneamente bloccato; i chiamanti ricevono una risposta
  provider-circuit-open oppure il routing combo salta a un altro target.
- `HALF_OPEN`: il timeout di reset è trascorso; consente una richiesta di probe.
  Il successo chiude il breaker, il fallimento lo riapre.

**Valori predefiniti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
consumati tramite `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` in
`src/lib/resilience/settings.ts` → `getCircuitBreaker(provider, …)` in
`src/sse/handlers/chatHelpers.ts`). Il breaker a livello di intero provider opera su
`circuitBreakerThreshold` / `circuitBreakerReset`:

| Profilo    |  degrada a | si apre a (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ---------- | ---------: | ------------------------------------: | ----------------------------: |
| OAuth      |        `5` |                                   `8` |                         `60s` |
| Chiave API |        `7` |                                  `12` |                         `30s` |
| Locale     | (derivato) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` definisce anche `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) e `providerCooldownMs` (5/10/1 min): questi
alimentano il **gate a finestra del Provider Cooldown globale opzionale (opt-in)**
(`PROVIDER_COOLDOWN_ENABLED`, disattivato per impostazione predefinita) — una voce a
livello di provider in `open-sse/services/providerCooldownTracker.ts` conta come in
cooldown solo dopo `providerFailureThreshold` fallimenti all'interno di
`providerFailureWindowMs`, e poi resta in cooldown per `providerCooldownMs`. NON sono
le soglie del breaker attivo — non modificarle aspettandoti un comportamento del
breaker. Ogni valore predefinito è sovrascrivibile tramite le variabili d'ambiente
`OMNIROUTE_PROVIDER_BREAKER_*` e `OMNIROUTE_CIRCUIT_BREAKER_*`; la tabella di
riferimento aggiornata al runtime si trova in `docs/architecture/RESILIENCE_GUIDE.md`.

Solo gli stati di fallimento a livello di provider dovrebbero far scattare il breaker del provider:

```ts
(408, 500, 502, 503, 504);
```

Non far scattare il breaker dell'intero provider per normali errori di
account/chiave/modello come la maggior parte dei casi `401`, `403` o `429`. Di solito
appartengono al cooldown della connessione o al model lockout. Un `403` generico di
un provider con chiave API dovrebbe essere recuperabile, a meno che non sia
classificato come errore terminale del provider/account.

Il breaker usa un ripristino lazy, non un timer in background. Quando lo stato `OPEN`
scade, le letture come `getStatus()`, `canExecute()` e `getRetryAfterMs()` aggiornano
lo stato a `HALF_OPEN`, così le dashboard e i costruttori di candidati combo non
continuano a escludere all'infinito un provider scaduto.

### Cooldown della connessione

**Ambito**: una connessione/account/chiave del provider.

**Scopo**: saltare temporaneamente una chiave/account problematico consentendo alle
altre connessioni dello stesso provider di continuare a servire le richieste.

**Implementazione**:

- Percorso di scrittura/aggiornamento: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selezione/filtraggio degli account: `src/sse/services/auth.ts::getProviderCredentials...`
- Calcolo del cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Impostazioni: `src/lib/resilience/settings.ts`

Campi importanti sulle connessioni del provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante la selezione dell'account, una connessione viene saltata finché:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Anche i cooldown sono lazy: quando `rateLimitedUntil` è nel passato, la connessione
torna idonea. In caso di utilizzo riuscito, `clearAccountError()` azzera `testStatus`,
`rateLimitedUntil`, i campi di errore e `backoffLevel`.

Comportamento predefinito del cooldown della connessione:

- Cooldown base OAuth: `5s`.
- Cooldown base per chiave API: `3s`.
- Un `429` su chiave API dovrebbe preferire gli hint di retry upstream (`Retry-After`,
  header di reset o testo di reset analizzabile) quando disponibili.
- I fallimenti recuperabili ripetuti usano un backoff esponenziale:

```ts
baseCooldownMs * 2 ** failureIndex;
```

La protezione anti-thundering-herd impedisce che fallimenti concorrenti sulla stessa
connessione prolunghino ripetutamente il cooldown o incrementino due volte
`backoffLevel`.

Gli stati terminali non sono cooldown. `banned`, `expired` (che diventa terminale solo
dopo N tentativi limitati tramite `EXPIRED_RETRY_MAX`) e `credits_exhausted` devono
rimanere non disponibili finché le credenziali/impostazioni non cambiano o un operatore
non li reimposta. Non sovrascrivere gli stati terminali con stati di cooldown
transitori.

### Lockout del modello

**Ambito**: provider + connessione + modello.

**Scopo**: evitare di disabilitare un'intera connessione quando solo un modello è non
disponibile o limitato dalla quota per quella connessione.

Esempi:

- Provider con quota per modello che restituiscono `429`.
- Provider locali che restituiscono `404` per un modello mancante.
- Fallimenti di permessi su modalità/modello specifici del provider, come le modalità
  Grok selezionate.

Il lockout del modello si trova in `open-sse/services/accountFallback.ts` e consente
alla stessa connessione di continuare a servire altri modelli.

### Guida al debug

- Se tutte le chiavi di un provider vengono saltate, ispeziona sia lo stato del breaker
  del provider sia `rateLimitedUntil`/`testStatus` di ciascuna connessione.
- Se un provider sembra escluso permanentemente dopo la finestra di reset, verifica se
  il codice legge lo `state` grezzo invece di usare `getStatus()`/`canExecute()`.
- Se una chiave del provider fallisce ma le altre dovrebbero funzionare, preferisci il
  cooldown della connessione al breaker del provider.
- Se fallisce un solo modello, preferisci il lockout del modello al cooldown della
  connessione.
- Se uno stato dovrebbe auto-ripristinarsi, deve avere un timestamp/timeout di reset
  futuro e un percorso di lettura che aggiorna lo stato scaduto. Gli stati permanenti
  richiedono modifiche manuali alle credenziali o alla configurazione.

---

## Fingerprinting TLS e Stealth

Le tecniche stealth specifiche per provider (JA3/JA4, CCH, offuscamento) sono documentate separatamente — vedi `docs/security/STEALTH_GUIDE.md` (git; non compilato in `/docs`).

---

## Test di resilienza (Fase 8 · Blocco C)

Oltre agli unit test per la logica di resilienza, tre test esercitano il runtime in
condizioni reali di stress/guasto (tutti integration/nightly — nessuno blocca le PR):

| Test        | Cosa                                                                                                                                                                                       | Esecuzione                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Chaos       | Il nodo fake-upstream inietta latenza/reset/timeout/503 reali; convalida che il circuit breaker si apra/recuperi e che `checkFallbackError` classifichi il 503 come fallback recuperabile. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 stream per `createSSEStream` con `--expose-gc`; fallisce se l'heap cresce oltre il limite massimo (guardia OOM #3069).                                                                | `npm run test:heap`                      |
| k6 soak     | Carico sostenuto su `/api/monitoring/health`; soglie p95/errori.                                                                                                                           | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestrato da `.github/workflows/nightly-resilience.yml` (cron + dispatch). Nel
`test:integration` predefinito, chaos e heap si auto-saltano (senza `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vedi anche

- [Guida all'architettura](./ARCHITECTURE.md) — Architettura del sistema e componenti interni
- [Guida utente](../guides/USER_GUIDE.md) — Provider, combo, integrazione CLI
- [Motore Auto-Combo](../routing/AUTO-COMBO.md) — Punteggio a 16 fattori, pacchetti di modalità
