# CLAUDE.md (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Questo file fornisce indicazioni a Claude Code (claude.ai/code) quando si lavora con il codice in questo repository.

## Avvio Veloce

```bash
npm install                    # Installa le dipendenze (genera automaticamente .env da .env.example)
npm run dev                    # Server di sviluppo su http://localhost:20128
npm run build                  # Build di produzione (Next.js 16 standalone)
npm run lint                   # ESLint (0 errori previsti; avvisi già esistenti)
npm run typecheck:core         # Controllo TypeScript (dovrebbe essere pulito)
npm run typecheck:noimplicit:core  # Controllo rigoroso (nessun implicit any)
npm run test:coverage          # Test unitari + gate di copertura (75/75/75/70 — dichiarazioni/righe/funzioni/rami)
npm run check                  # lint + test combinati
npm run check:cycles           # Rileva dipendenze circolari
```

### Esecuzione dei Test

```bash
# Singolo file di test (runner di test nativo di Node.js — la maggior parte dei test)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Tutti i suite
npm run test:all
```

Per la matrice completa dei test, vedere `CONTRIBUTING.md` → "Esecuzione dei Test". Per un'architettura approfondita, vedere `AGENTS.md`.

---

## Progetto a Colpo d'Occhio

**OmniRoute** — proxy/router AI unificato. Un endpoint, oltre 160 fornitori di LLM, fallback automatico.

| Livello       | Posizione               | Scopo                                                                   |
| ------------- | ----------------------- | ----------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — punti di ingresso                                  |
| Handlers      | `open-sse/handlers/`    | Elaborazione delle richieste (chat, embeddings, ecc.)                   |
| Executors     | `open-sse/executors/`   | Dispatch HTTP specifico per fornitore                                   |
| Translators   | `open-sse/translator/`  | Conversione di formato (OpenAI↔Claude↔Gemini)                           |
| Transformer   | `open-sse/transformer/` | API delle risposte ↔ Completamenti Chat                                 |
| Services      | `open-sse/services/`    | Routing combinato, limiti di velocità, caching, ecc.                    |
| Database      | `src/lib/db/`           | Moduli di dominio SQLite (oltre 45 file, 55 migrazioni)                 |
| Domain/Policy | `src/domain/`           | Motore di policy, regole di costo, logica di fallback                   |
| MCP Server    | `open-sse/mcp-server/`  | 37 strumenti (30 base + 3 memoria + 4 abilità), 3 trasporti, ~13 ambiti |
| A2A Server    | `src/lib/a2a/`          | Protocollo agente JSON-RPC 2.0                                          |
| Skills        | `src/lib/skills/`       | Framework di abilità estensibile                                        |
| Memory        | `src/lib/memory/`       | Memoria conversazionale persistente                                     |

Monorepo: `src/` (app Next.js 16), `open-sse/` (workspace del motore di streaming), `electron/` (app desktop), `tests/`, `bin/` (punto di ingresso CLI).

---

## Pipeline di Richiesta

```
Client → /v1/chat/completions (rotta Next.js)
  → CORS → validazione Zod → auth? → controllo della policy → guardia contro l'iniezione del prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → controllo cache → limite di frequenza → routing combo?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → traduzione della risposta → stream SSE o JSON
    → Se Responses API: responsesTransformer.ts TransformStream
```

Le rotte API seguono uno schema coerente: `Roatta → preflight CORS → validazione del corpo Zod → Auth opzionale (extractApiKey/isValidApiKey) → applicazione della policy della chiave API → delega del gestore (open-sse)`. Nessun middleware globale di Next.js — l'intercettazione è specifica per rotta.

**Routing combo** (`open-sse/services/combo.ts`): 14 strategie (priorità, ponderato, riempi-primo, round-robin, P2C, casuale, meno-utilizzato, ottimizzato per costo, consapevole del reset, rigorosamente-casuale, auto, lkgp, ottimizzato per contesto, relay di contesto). Ogni target chiama `handleSingleModel()` che avvolge `handleChatCore()` con gestione degli errori per target e controlli del circuito. Vedi `docs/routing/AUTO-COMBO.md` per il punteggio Auto-Combo a 9 fattori e `docs/architecture/RESILIENCE_GUIDE.md` per i 3 livelli di resilienza.

---

## Stato di Esecuzione della Resilienza

OmniRoute ha tre meccanismi di guasto temporaneo correlati ma distinti. Mantieni il loro
ambito separato durante il debug del comportamento di routing. Vedi il
[diagramma di resilienza a 3 livelli](./docs/diagrams/exported/resilience-3layers.svg)
(fonte: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
per una mappa a colpo d'occhio.

### Interruttore di Circuito del Fornitore

**Ambito**: intero fornitore, ad esempio `glm`, `openai`, `anthropic`.

**Scopo**: fermare l'invio di traffico a un fornitore che sta ripetutamente fallendo a livello
upstream/servizio, in modo che un fornitore non sano non rallenti ogni richiesta.

**Implementazione**:

- Classe principale: `src/shared/utils/circuitBreaker.ts`
- Cablaggio di gate/esecuzione chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API di stato di esecuzione: `src/app/api/monitoring/health/route.ts`
- Wrapper condivisi: `open-sse/services/accountFallback.ts`
- Tabella di stato persistente: `domain_circuit_breakers`

**Stati**:

- `CLOSED`: il traffico normale è consentito.
- `OPEN`: il fornitore è temporaneamente bloccato; i chiamanti ricevono una risposta di circuito-fornitore-aperto
  oppure il routing combo salta a un altro target.
- `HALF_OPEN`: il timeout di reset è scaduto; consenti una richiesta di probe. Il successo chiude il
  circuito, il fallimento lo riapre.

**Predefiniti** (`open-sse/config/constants.ts`):

- Fornitori OAuth: soglia `3`, timeout di reset `60s`.
- Fornitori di chiavi API: soglia `5`, timeout di reset `30s`.
- Fornitori locali: soglia `2`, timeout di reset `15s`.

Solo gli stati di fallimento a livello di fornitore dovrebbero attivare l'interruttore del fornitore:

```ts
(408, 500, 502, 503, 504);
```

Non attivare l'interruttore dell'intero fornitore per errori normali di account/chiave/modello come la maggior parte
dei casi `401`, `403`, o `429`. Questi di solito appartengono a cooldown di connessione o lockout del modello. Un generico errore `403` del fornitore di chiavi API dovrebbe essere recuperabile a meno che non sia classificato
come errore terminale di fornitore/account.

L'interruttore utilizza un recupero pigro, non un timer in background. Quando `OPEN` scade, letture come
`getStatus()`, `canExecute()`, e `getRetryAfterMs()` aggiornano lo stato a
`HALF_OPEN`, in modo che i dashboard e i costruttori di candidati combo non continuino a escludere un
fornitore scaduto per sempre.

### Cooldown di Connessione

**Ambito**: una connessione/account/chiave del fornitore.

**Scopo**: saltare temporaneamente una chiave/account difettosa consentendo ad altre connessioni per
lo stesso fornitore di continuare a servire richieste.

**Implementazione**:

- Percorso di scrittura/aggiornamento: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selezione/filtraggio dell'account: `src/sse/services/auth.ts::getProviderCredentials...`
- Calcolo del cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Impostazioni: `src/lib/resilience/settings.ts`

Campi importanti sulle connessioni del fornitore:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante la selezione dell'account, una connessione viene saltata mentre:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

I cooldown sono anche pigri: quando `rateLimitedUntil` è nel passato, la connessione diventa
nuovamente idonea. All'uso riuscito, `clearAccountError()` cancella `testStatus`,
`rateLimitedUntil`, campi di errore e `backoffLevel`.

Comportamento predefinito del cooldown di connessione:

- Cooldown base OAuth: `5s`.
- Cooldown base per chiavi API: `3s`.
- `429` per chiavi API dovrebbe preferire suggerimenti di retry upstream (`Retry-After`, intestazioni di reset, o
  testo di reset analizzabile) quando disponibili.
- Fallimenti recuperabili ripetuti utilizzano un backoff esponenziale:

```ts
baseCooldownMs * 2 ** failureIndex;
```

La guardia anti-thundering-herd previene fallimenti concorrenti sulla stessa connessione da
estendere ripetutamente il cooldown o incrementare doppiamente `backoffLevel`.

Gli stati terminali non sono cooldown. `banned`, `expired`, e `credits_exhausted` sono
destinati a rimanere non disponibili fino a quando le credenziali/impostazioni non cambiano o un operatore le ripristina.
Non sovrascrivere stati terminali con stati di cooldown transitori.

### Lockout del Modello

**Ambito**: fornitore + connessione + modello.

**Scopo**: evitare di disabilitare un'intera connessione quando solo un modello è non disponibile o
limitato per quota per quella connessione.

Esempi:

- Fornitori per quota per modello che restituiscono `429`.
- Fornitori locali che restituiscono `404` per un modello mancante.
- Fallimenti di permesso di modalità/modello specifici del fornitore come le modalità Grok selezionate.

Il lockout del modello vive in `open-sse/services/accountFallback.ts` e consente alla stessa
connessione di continuare a servire altri modelli.

### Guida al Debugging

- Se tutte le chiavi per un fornitore vengono saltate, ispeziona sia lo stato dell'interruttore del fornitore che `rateLimitedUntil`/`testStatus` di ciascuna connessione.
- Se un fornitore appare permanentemente escluso dopo la finestra di reset, controlla se il codice
  sta leggendo lo stato grezzo invece di utilizzare `getStatus()`/`canExecute()`.
- Se una chiave di fornitore fallisce ma altre dovrebbero funzionare, preferisci il cooldown di connessione rispetto
  all'interruttore del fornitore.
- Se solo un modello fallisce, preferisci il lockout del modello rispetto al cooldown di connessione.
- Se uno stato dovrebbe auto-recuperarsi, dovrebbe avere un timestamp futuro/timeout di reset e un
  percorso di lettura che aggiorna lo stato scaduto. Gli stati permanenti richiedono modifiche manuali alle credenziali
  o alla configurazione.

## Convenzioni Chiave

### Stile di Codice

- **2 spazi**, punti e virgola, virgolette doppie, larghezza 100 caratteri, virgole finali es5 (imposte da lint-staged tramite Prettier)
- **Importazioni**: esterne → interne (`@/`, `@omniroute/open-sse`) → relative
- **Nomenclatura**: file=camelCase/kebab, componenti=PascalCase, costanti=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = errore ovunque; `no-explicit-any` = avviso in `open-sse/` e `tests/`
- **TypeScript**: `strict: false`, target ES2022, modulo esnext, risoluzione bundler. Preferire tipi espliciti.

### Database

- **Sempre** passare attraverso i moduli di dominio `src/lib/db/` — **mai** scrivere SQL raw in rotte o gestori
- **Mai** aggiungere logica a `src/lib/localDb.ts` (solo livello di re-export)
- **Mai** importare a barre da `localDb.ts` — importare invece moduli specifici `db/`
- Singleton DB: `getDbInstance()` da `src/lib/db/core.ts` (journaling WAL)
- Migrazioni: `src/lib/db/migrations/` — file SQL versionati, idempotenti, eseguiti in transazioni

### Gestione degli Errori

- try/catch con tipi di errore specifici, log con contesto pino
- Non nascondere errori nei flussi SSE — utilizzare segnali di abort per la pulizia
- Restituire codici di stato HTTP appropriati (4xx/5xx)

### Sicurezza

- **Mai** usare `eval()`, `new Function()`, o eval implicito
- Validare tutti gli input con schemi Zod
- Crittografare le credenziali a riposo (AES-256-GCM)
- Denylist degli header upstream: `src/shared/constants/upstreamHeaders.ts` — mantenere sanitizzazione, schemi Zod e test unitari allineati durante la modifica
- **Credenziali pubbliche upstream** (client_id/secret OAuth stile Gemini/Antigravity/Windsurf + chiavi Web Firebase estratte da CLI pubblici): **DEVONO** essere incorporate tramite `resolvePublicCred()` da `open-sse/utils/publicCreds.ts` — **mai** come stringhe letterali. Vedi `docs/security/PUBLIC_CREDS.md` per il modello obbligatorio.
- **Risposte di errore** (HTTP / SSE / gestore executor / gestore MCP): **DEVONO** passare attraverso `buildErrorBody()` o `sanitizeErrorMessage()` da `open-sse/utils/error.ts` — **mai** mettere `err.stack` o `err.message` raw nel corpo della risposta. Vedi `docs/security/ERROR_SANITIZATION.md`.
- **Comandi shell costruiti da variabili**: quando si chiama `exec()`/`spawn()` con uno script che necessita di valori di runtime, passarli tramite l'opzione `env` (automaticamente shell-escaped) — **mai** interpolare stringhe percorsi non fidati/esterni nel corpo dello script. Riferimento: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Librerie sicure per impostazione predefinita** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): preferire Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink rispetto a implementazioni personalizzate ogni volta che si aggiungono nuove superfici sensibili alla sicurezza.

---

## Scenari Comuni di Modifica

### Aggiungere un Nuovo Fornitore

1. Registrare in `src/shared/constants/providers.ts` (validato da Zod al caricamento)
2. Aggiungere executor in `open-sse/executors/` se necessaria logica personalizzata (estendere `BaseExecutor`)
3. Aggiungere traduttore in `open-sse/translator/` se formato non OpenAI
4. Aggiungere configurazione OAuth in `src/lib/oauth/constants/oauth.ts` se basato su OAuth — se il CLI upstream fornisce un client_id/secret pubblico, incorporare tramite `resolvePublicCred()` (vedi `docs/security/PUBLIC_CREDS.md`), **mai** come letterale
5. Registrare modelli in `open-sse/config/providerRegistry.ts`
6. Scrivere test in `tests/unit/` (includere l'asserzione della forma publicCreds se hai aggiunto un nuovo default incorporato)

### Aggiungere una Nuova Rotta API

1. Creare directory sotto `src/app/api/v1/your-route/`
2. Creare `route.ts` con gestori `GET`/`POST`
3. Seguire il modello: CORS → validazione del corpo Zod → auth opzionale → delega del gestore
4. Il gestore va in `open-sse/handlers/` (importare da lì, non inline)
5. Le risposte di errore utilizzano `buildErrorBody()` / `errorResponse()` da `open-sse/utils/error.ts` (auto-sanitizzate — non mettere `err.stack` o `err.message` raw nel corpo). Vedi `docs/security/ERROR_SANITIZATION.md`.
6. Aggiungere test — includendo almeno un'asserzione che le risposte di errore non rivelino tracce di stack (`!body.error.message.includes("at /")`)

### Aggiungere un Nuovo Modulo DB

1. Creare `src/lib/db/yourModule.ts` — importare `getDbInstance` da `./core.ts`
2. Esportare funzioni CRUD per la tua tabella di dominio
3. Aggiungere migrazione in `src/lib/db/migrations/` se necessarie nuove tabelle
4. Re-esportare da `src/lib/localDb.ts` (aggiungere solo all'elenco di re-export)
5. Scrivere test

### Aggiungere un Nuovo Strumento MCP

1. Aggiungere definizione dello strumento in `open-sse/mcp-server/tools/` con schema di input Zod + gestore async
2. Registrare nel set di strumenti (collegato da `createMcpServer()`)
3. Assegnare agli ambiti appropriati
4. Scrivere test (invocazione dello strumento registrata nella tabella `mcp_audit`)

### Aggiungere una Nuova Abilità A2A

1. Creare abilità in `src/lib/a2a/skills/` (5 già esistenti: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. L'abilità riceve il contesto del compito (messaggi, metadati) → restituisce un risultato strutturato
3. Registrare in `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`
4. Esporre in `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Scrivere test in `tests/unit/`
6. Documentare nella tabella delle abilità in `docs/frameworks/A2A-SERVER.md`

### Aggiungere un Nuovo Agente Cloud

1. Creare classe agente in `src/lib/cloudAgent/agents/` estendendo `CloudAgentBase` (3 già esistenti: codex-cloud, devin, jules)
2. Implementare `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrare in `src/lib/cloudAgent/registry.ts`
4. Aggiungere gestione OAuth/credenziali se necessario (`src/lib/oauth/providers/`)
5. Test + documentare in `docs/frameworks/CLOUD_AGENT.md`

### Aggiungere un Nuovo Guardrail / Eval / Abilità / Evento Webhook

- Guardrail: `src/lib/guardrails/` → documenti: `docs/security/GUARDRAILS.md`
- Suite Eval: `src/lib/evals/` → documenti: `docs/frameworks/EVALS.md`
- Abilità (sandbox): `src/lib/skills/` → documenti: `docs/frameworks/SKILLS.md`
- Evento Webhook: `src/lib/webhookDispatcher.ts` → documenti: `docs/frameworks/WEBHOOKS.md`

## Documentazione di Riferimento

Per qualsiasi modifica non banale, leggi prima il documento di approfondimento corrispondente:

| Area                                              | Documento                                                         |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| Navigazione del repository                        | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architettura                                      | `docs/architecture/ARCHITECTURE.md`                               |
| Riferimento ingegneristico                        | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (scoring a 9 fattori, 14 strategie)    | `docs/routing/AUTO-COMBO.md`                                      |
| Resilienza (3 meccanismi)                         | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Riproduzione del ragionamento                     | `docs/routing/REASONING_REPLAY.md`                                |
| Framework delle competenze                        | `docs/frameworks/SKILLS.md`                                       |
| Sistema di memoria (FTS5 + Qdrant)                | `docs/frameworks/MEMORY.md`                                       |
| Agenti cloud                                      | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Guardrail (PII / injection / visione)             | `docs/security/GUARDRAILS.md`                                     |
| Credenziali pubbliche upstream (Gemini/ecc.)      | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitizzazione dei messaggi di errore             | `docs/security/ERROR_SANITIZATION.md`                             |
| Valutazioni                                       | `docs/frameworks/EVALS.md`                                        |
| Conformità / audit                                | `docs/security/COMPLIANCE.md`                                     |
| Webhook                                           | `docs/frameworks/WEBHOOKS.md`                                     |
| Pipeline di autorizzazione                        | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / impronta digitale)                 | `docs/security/STEALTH_GUIDE.md`                                  |
| Protocolli degli agenti (A2A / ACP / Cloud)       | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Server MCP                                        | `docs/frameworks/MCP-SERVER.md`                                   |
| Server A2A                                        | `docs/frameworks/A2A-SERVER.md`                                   |
| Riferimento API + OpenAPI                         | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Catalogo dei fornitori (generato automaticamente) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Flusso di rilascio                                | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Test

| Cosa                    | Comando                                                                   |
| ----------------------- | ------------------------------------------------------------------------- |
| Test unitari            | `npm run test:unit`                                                       |
| Singolo file            | `node --import tsx/esm --test tests/unit/file.test.ts`                    |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                     |
| E2E (Playwright)        | `npm run test:e2e`                                                        |
| Protocol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                              |
| Ecosistema              | `npm run test:ecosystem`                                                  |
| Porta di copertura      | `npm run test:coverage` (75/75/75/70 — dichiarazioni/righe/funzioni/rami) |
| Rapporto di copertura   | `npm run coverage:report`                                                 |

**Regola PR**: Se modifichi il codice di produzione in `src/`, `open-sse/`, `electron/`, o `bin/`, devi includere o aggiornare i test nella stessa PR.

**Preferenza per il livello di test**: unità prima → integrazione (multi-modulo o stato DB) → e2e (solo UI/flusso di lavoro). Codifica le riproduzioni di bug come test automatizzati prima o insieme alla correzione.

**Politica di copertura di Copilot**: Quando una PR modifica il codice di produzione e la copertura è inferiore al 75% (dichiarazioni/righe/funzioni) o al 70% (rami), non limitarti a segnalare — aggiungi o aggiorna i test, riesegui la porta di copertura, poi chiedi conferma. Includi i comandi eseguiti, i file di test modificati e il risultato finale della copertura nel rapporto PR.

---

## Flusso di lavoro Git

```bash
# Non impegnarti mai direttamente su main
git checkout -b feat/your-feature
git commit -m "feat: descrivi la tua modifica"
git push -u origin feat/your-feature
```

**Prefissi dei branch**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Formato del commit** (Conventional Commits): `feat(db): aggiungi circuit breaker` — scope: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Hook di Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Ambiente

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, target ES2022, module esnext, risoluzione bundler
- **Alias di percorso**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Porta predefinita**: 20128 (API + dashboard sulla stessa porta)
- **Directory dei dati**: variabile d'ambiente `DATA_DIR`, predefinita a `~/.omniroute/`
- **Variabili d'ambiente chiave**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Configurazione: `cp .env.example .env` poi genera `JWT_SECRET` (`openssl rand -base64 48`) e `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Regole Rigide

1. Non impegnare mai segreti o credenziali
2. Non aggiungere mai logica a `localDb.ts`
3. Non usare mai `eval()` / `new Function()` / eval implicito
4. Non impegnarsi mai direttamente su `main`
5. Non scrivere mai SQL raw nelle route — usa i moduli in `src/lib/db/`
6. Non ignorare mai silenziosamente gli errori nei flussi SSE
7. Validare sempre gli input con gli schemi Zod
8. Includere sempre test quando si modifica il codice di produzione
9. La copertura deve rimanere ≥75% (dichiarazioni, righe, funzioni) / ≥70% (rami). Misurato attualmente: ~82%.
10. Non bypassare mai gli hook di Husky (`--no-verify`, `--no-gpg-sign`) senza esplicita approvazione dell'operatore.
11. Non incorporare mai client_id/secret OAuth pubblici upstream o chiavi Web Firebase come stringhe letterali — passare sempre attraverso `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Vedi `docs/security/PUBLIC_CREDS.md`.
12. Non restituire mai `err.stack` / `err.message` raw nelle risposte HTTP / SSE / executor — instradare sempre attraverso `buildErrorBody()` o `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Vedi `docs/security/ERROR_SANITIZATION.md`.
13. Non interpolare mai stringhe percorsi esterni o valori di runtime in script shell passati a `exec()`/`spawn()` — passare invece tramite l'opzione `env`. Riferimento: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Non ignorare mai un avviso CodeQL / Secret-Scanning senza (a) controllare prima la documentazione del pattern sopra per vedere se l'aiuto si applica, e (b) registrare la giustificazione tecnica nel commento di dismissione. Precedente: `js/stack-trace-exposure` sollevato su callsites che già instradano attraverso `sanitizeErrorMessage()` è una limitazione nota di CodeQL (sanitizzatori personalizzati non riconosciuti) — dismettere come `false positive` facendo riferimento a `docs/security/ERROR_SANITIZATION.md`.
15. Non esporre mai route che generano processi figlio (`/api/mcp/`, `/api/cli-tools/runtime/`) senza classificazione `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts`. L'applicazione del loopback avviene incondizionatamente prima di qualsiasi controllo di autenticazione — un JWT trapelato tramite tunnel non può attivare la generazione di processi. Vedi `docs/security/ROUTE_GUARD_TIERS.md`.
16. Non includere mai trailer `Co-Authored-By` che accreditano un assistente AI, LLM o account di automazione (es. nomi contenenti "Claude", "GPT", "Copilot", "Bot"; email su `anthropic.com` / `openai.com` / indirizzi `noreply.github.com` di proprietà di bot). Tali trailer indirizzano l'attribuzione del commit all'account del bot su GitHub, nascondendo l'autore reale (`diegosouzapw`) nella cronologia della PR. I collaboratori umani — inclusi gli autori di PR upstream e i segnalatori di issue portati in OmniRoute — POSSONO e DEVONO essere accreditati con trailer standard `Co-authored-by: Name <email>`; i workflow di port upstream (`/port-upstream-features`, `/port-upstream-issues`) ne dipendono.
