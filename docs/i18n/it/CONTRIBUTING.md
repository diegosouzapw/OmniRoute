# Contributing to OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configurazione dell'ambiente di sviluppo

### Prerequisiti

- **Node.js** `>=22.22.3 <23` oppure `>=24.0.0 <27` (versione consigliata: 24 LTS)
- **npm** 10+

> **Utenti di npm v11+ (Node 24+):** dopo `npm install`, verifica che i moduli nativi siano stati installati:
> `node -e "require('better-sqlite3')"`. Se il comando non riesce con `MODULE_NOT_FOUND`,
> esegui `npm approve-scripts better-sqlite3 && npm install`. Consulta
> [Risoluzione dei problemi](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonazione e installazione

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variabili d'ambiente

```bash
# Crea il file .env dal modello
cp .env.example .env

# Genera i segreti richiesti
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variabili principali per lo sviluppo:

| Variabile              | Valore predefinito di sviluppo | Descrizione                  |
| ---------------------- | ------------------------------ | ---------------------------- |
| `PORT`                 | `20128`                        | Porta del server             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`       | URL di base per il frontend  |
| `JWT_SECRET`           | (generato sopra)               | Segreto per la firma JWT     |
| `INITIAL_PASSWORD`     | `CHANGEME`                     | Password del primo accesso   |
| `APP_LOG_LEVEL`        | `info`                         | Livello di dettaglio dei log |

### Impostazioni della dashboard

La dashboard fornisce opzioni dell'interfaccia utente per funzionalità che possono essere configurate anche tramite variabili d'ambiente:

| Posizione dell'impostazione | Opzione                         | Descrizione                                          |
| --------------------------- | ------------------------------- | ---------------------------------------------------- |
| Impostazioni → Avanzate     | Modalità di debug               | Abilita i log di debug delle richieste (interfaccia) |
| Impostazioni → Generali     | Visibilità della barra laterale | Mostra/nasconde le sezioni della barra laterale      |

Queste impostazioni vengono memorizzate nel database e persistono dopo i riavvii, sostituendo i valori predefiniti delle variabili d'ambiente quando vengono impostate.

### Esecuzione in locale

```bash
# Modalità di sviluppo (ricaricamento automatico)
npm run dev

# Build di produzione
npm run build    # next build → .build/next/ quindi assembleStandalone → dist/
npm run start

# Compilazione rapida del solo backend/API per le modifiche dei collaboratori
npm run build:contributor

# Build di rilascio (ricompilazione pulita + sentinella HEAD — obbligatorio per il deploy)
npm run build:release   # rm -rf .build dist && build + scrive dist/BUILD_SHA

# Configurazione comune della porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

La build per i collaboratori esegue una convalida della sola compilazione: non assembla la
distribuzione autonoma né genera le risorse native opzionali per la creazione dei pacchetti. Usa la normale build di produzione quando
devi convalidare il pacchetto distribuibile.

### Struttura dell'output di build

| Directory | Contenuto                                                                          | Tracciata |
| --------- | ---------------------------------------------------------------------------------- | --------- |
| `src/`    | Codice sorgente dell'applicazione (TypeScript / TSX)                               | Sì        |
| `.build/` | File intermedi — output di `next build` (ignorato da Git, `distDir = .build/next`) | No        |
| `dist/`   | Pacchetto distribuibile — assemblato da `assembleStandalone` (ignorato da Git)     | No        |

La pipeline di build viene eseguita in un singolo passaggio:

```
npm run build
  └─ next build → .build/next/standalone  (output di Next.js)
  └─ assembleStandalone()                 (copia i file standalone + statici + pubblici + le risorse native)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` pulisce inoltre prima entrambe le directory e scrive
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) come sentinella dell'integrità del deploy.

`npm run build:contributor` utilizza il profilo di build per il solo backend. Durante la build sostituisce temporaneamente
i file dell'interfaccia della dashboard con stub, mantiene i gestori delle route API e ripristina i file originali
al termine della build. Usa `npm run build` per le modifiche che interessano l'interfaccia della dashboard o per la
convalida completa del rilascio; il profilo per i collaboratori non sostituisce la build di rilascio.

> **Nota sul deploy VPS:** la directory dell'immagine remota `/usr/lib/node_modules/omniroute/app/`
> rimane invariata. Le procedure di deploy sincronizzano tramite rsync il contenuto di `dist/` al suo interno.
> È cambiato solo il percorso dell'output di build all'interno del repository (`app/` → `dist/`).

URL predefiniti:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Flusso di lavoro Git

> ⚠️ **NON eseguire MAI commit direttamente su `main`.** Utilizzare sempre branch di funzionalità.
>
> **Base della PR:** utilizzare come destinazione il branch `release/vX.Y.Z` attivo (non `main`). Consultare
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) per il modello
> con una release per branch e tag al momento della pubblicazione.

```bash
# Crea un branch dalla punta della release attiva (esempio: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... apporta le modifiche ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Apri una Pull Request con base = release/v3.8.49
```

### Denominazione dei branch

| Prefisso    | Scopo                         |
| ----------- | ----------------------------- |
| `feat/`     | Nuove funzionalità            |
| `fix/`      | Correzioni di bug             |
| `refactor/` | Ristrutturazione del codice   |
| `docs/`     | Modifiche alla documentazione |
| `test/`     | Aggiunte/correzioni dei test  |
| `chore/`    | Strumenti, CI, dipendenze     |

### Messaggi di commit

Seguire [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Ambiti (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Esecuzione dei test

```bash
# Tutti i test (unitari + vitest + ecosistema + e2e)
npm run test:all

# Singolo file di test (runner di test nativo di Node.js — utilizzato dalla maggior parte dei test)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Solo i test unitari interessati dalla modifica (stesso selettore TIA del controllo CI, #8084)
npm run test:scoped            # modifiche nell'ultimo commit (o nell'albero di lavoro)
npm run test:scoped:staged     # solo modifiche nell'area di staging — si abbina bene a un'esecuzione pre-commit
npm run test:scoped:full       # prima ricostruisce la mappa del grafo delle importazioni (dopo aver aggiunto/spostato file)
# L'uscita 1 + "run the full suite" indica che un file centrale (tsconfig, package.json, …) o un
# file sorgente non mappato è cambiato — il selettore opera in sicurezza e non salta mai nulla silenziosamente.

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Test E2E (richiedono Playwright)
npm run test:e2e

# Test E2E dei client di protocollo (trasporti MCP, A2A)
npm run test:protocols:e2e

# Test di compatibilità dell'ecosistema
npm run test:ecosystem

# Soglia di copertura: 60% di istruzioni/righe/funzioni/rami
npm run test:coverage
npm run coverage:report

# Controllo lint + formattazione
npm run lint
npm run check

# Test rapido combinato, soggetto a controllo, con servizi upstream reali (richiede accesso VPS + crediti reali dei provider)
# Contatta provider REALI — ha un piccolo costo. Non viene MAI eseguito nella CI. Viene ignorato senza errori in assenza del controllo.
# Richiede: accesso ssh root@192.168.0.15 (acquisisce dalla VPS uno snapshot del DB in sola lettura).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Test rapido live VPS di fase 3 — semplici script Node ESM che contattano direttamente il server live .15.
# Richiede: accesso ssh root@192.168.0.15 (le combinazioni vengono create/eliminate tramite SSH sqlite).
# Contatta provider REALI (costo ridotto). Crea/elimina solo combinazioni __live_test__*. Non viene MAI eseguito nella CI.
# REQUIRE_API_KEY=false su .15, quindi non è necessaria alcuna chiave API, ma rispetta COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY se impostate.
npm run test:combo:live:vps              # 7 scenari HTTP (priorità/round-robin/ponderato/costo/fusione/automatico + integrità)
npm run test:combo:live:vps:failover     # aggiunge uno scenario reale di failover tra provider (8 in totale)
```

Note sulla copertura:

- `npm run test:coverage` misura la copertura del codice sorgente per la suite principale di test unitari, esclude `tests/**` e include `open-sse/**`
- Le pull request devono mantenere la soglia di copertura ad almeno il **60%** per istruzioni/righe/funzioni/rami
- Se una PR modifica il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/`, deve aggiungere o aggiornare i test automatizzati nella stessa PR
- `npm run coverage:report` mostra il rapporto dettagliato file per file dell'ultima esecuzione della copertura
- `npm run test:coverage:legacy` mantiene la metrica precedente per il confronto storico
- Consulta `docs/ops/COVERAGE_PLAN.md` per il piano graduale di miglioramento della copertura

### Requisiti delle pull request

Prima di aprire una PR, segui il
[percorso ideale per contribuire](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) per eseguire il ciclo mirato relativo
alle modifiche apportate. La suite completa di test unitari (4 shard CI), Vitest, la soglia di copertura
del **60%+** e la build di produzione sono responsabilità della CI — eseguirli localmente non fornisce
alcuna informazione aggiuntiva rispetto ai controlli già effettuati sulla PR e, sui computer meno potenti,
può saturare l'host (#8084):

- Esegui i file di test che coprono la modifica: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Esegui `npm run lint`
- Includi o aggiorna i test automatizzati nella stessa PR ogni volta che cambia il codice di produzione
- Includi nella descrizione della PR i file di test modificati o aggiunti quando cambia il codice di produzione
- Controlla il risultato di SonarQube sulla PR quando i secret del progetto sono configurati nella CI

Stato attuale dei test: **122 file di test unitari** che coprono:

- Traduttori dei provider e conversione dei formati
- Limitazione della frequenza, circuit breaker e resilienza
- Cache semantica, idempotenza e monitoraggio dell'avanzamento
- Operazioni sul database e schema (21 moduli DB)
- Flussi OAuth e autenticazione
- Convalida degli endpoint API (Zod v4)
- Strumenti del server MCP e applicazione degli ambiti
- Sistemi di memoria e competenze

---

## Stile del codice

- **ESLint** — Esegui `npm run lint` prima di effettuare il commit
- **Prettier** — Formattazione automatica tramite `lint-staged` al momento del commit (2 spazi, punti e virgola, virgolette doppie, larghezza di 100 caratteri, virgole finali es5)
- **TypeScript** — Tutto il codice in `src/` usa `.ts`/`.tsx`; `open-sse/` usa `.ts`/`.js`; documenta con TSDoc (`@param`, `@returns`, `@throws`)
- **Nessun `eval()`** — ESLint applica le regole `no-eval`, `no-implied-eval`, `no-new-func`
- **Validazione Zod** — Usa schemi Zod v4 per convalidare tutti gli input delle API
- **Convenzioni di denominazione**: file = camelCase/kebab-case, componenti = PascalCase, costanti = UPPER_SNAKE

### Gestione degli errori / blocchi catch vuoti

Non lasciare mai un `catch` senza spiegazione. Classificalo in una delle due categorie seguenti (rendendo operativa
la regola rigida «non ignorare mai silenziosamente gli errori nei flussi SSE»):

- **Intenzionale (operazioni interne di pulizia/telemetria best-effort)** — un errore in questo caso è previsto e
  innocuo; aggiungi un commento di una riga che ne spieghi il motivo, senza logging (questa convenzione evita il
  rumore causato dal logging a ogni richiesta).

  ```ts
  } catch {} // la chiusura di un controller già chiuso dopo la disconnessione del client è prevista
  ```

- **Da registrare nei log (codice esterno/fornito dal chiamante, oppure l'errore ignorato modifica il flusso di controllo)** — mantieni
  il catch (senza mai consentirgli di interrompere il flusso), ma emetti un `console.debug`/`warn` contestuale affinché
  l'errore sia individuabile.

  ```ts
  } catch (e) {
    console.debug("[STREAM] errore del callback onFailure:", e);
  }
  ```

Consulta `open-sse/utils/stream.ts` e `open-sse/utils/streamHandler.ts` per alcuni esempi applicati.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Aggiunta di un nuovo provider

### Passaggio 1: registrare le costanti del provider

Aggiungerle a `src/shared/constants/providers.ts` — con convalida Zod al caricamento del modulo.

### Passaggio 2: aggiungere un executor (se è necessaria una logica personalizzata)

Creare un executor in `open-sse/executors/your-provider.ts` estendendo l'executor di base.

### Passaggio 3: aggiungere un traduttore (se il formato non è OpenAI)

Creare i traduttori di richiesta/risposta in `open-sse/translator/`.

### Passaggio 4: aggiungere la configurazione OAuth (se basata su OAuth)

Aggiungere le credenziali OAuth in `src/lib/oauth/constants/oauth.ts` e il servizio in `src/lib/oauth/services/`.

Se il provider upstream distribuisce un client_id/secret OAuth pubblico o una chiave API Web Firebase all'interno della propria CLI pubblica o del proprio bundle per browser, **non** incorporarlo come stringa letterale. Utilizzare `resolvePublicCred()` da `open-sse/utils/publicCreds.ts` e aggiungere una voce di byte mascherata a `EMBEDDED_DEFAULTS`. Il flusso di lavoro completo e obbligatorio è documentato in [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

All'interno di handler/executor, i messaggi di errore inviati al client devono passare attraverso `buildErrorBody()` / `sanitizeErrorMessage()` da `open-sse/utils/error.ts` — non inserire mai `err.stack` o `err.message` non elaborati nel corpo di una Response. Consultare [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Passaggio 5: registrare i modelli

Aggiungere le definizioni dei modelli in `open-sse/config/providerRegistry.ts`.

### Passaggio 6: aggiungere i test

Scrivere test unitari in `tests/unit/` che coprano almeno:

- Registrazione del provider
- Traduzione di richieste/risposte
- Gestione degli errori

---

## Checklist della Pull Request

- [ ] I test vengono superati (`npm test`)
- [ ] Il linting viene superato (`npm run lint`)
- [ ] La build viene completata correttamente (`npm run build`)
- [ ] Sono stati aggiunti i tipi TypeScript per le nuove funzioni e interfacce pubbliche
- [ ] Nessun segreto o valore di fallback codificato direttamente
- [ ] Le credenziali upstream pubbliche sono incorporate tramite `resolvePublicCred()` (vedere [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), mai come valori letterali
- [ ] Le risposte di errore passano attraverso `buildErrorBody()` / `sanitizeErrorMessage()` — nessuna traccia dello stack non elaborata nei corpi delle risposte (vedere [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] I comandi shell (`exec` / `spawn`) passano i valori di runtime tramite `env`, non mediante interpolazione di stringhe
- [ ] Tutti gli input sono convalidati con schemi Zod
- [ ] È stato aggiunto un **frammento** del changelog in `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` per le modifiche visibili agli utenti (vedere [`changelog.d/README.md`](./changelog.d/README.md)) — **non** modificare direttamente `CHANGELOG.md`; i frammenti vengono aggregati al momento del rilascio e non generano mai conflitti tra le PR
- [ ] La documentazione è stata aggiornata (se applicabile)
- [ ] Nessun nuovo avviso CodeQL / Secret-Scanning aperto, oppure ciascun avviso è stato ignorato con una giustificazione tecnica che fa riferimento al documento pertinente in `docs/security/`
- [ ] Le route che generano processi figli (`/api/mcp/`, `/api/cli-tools/runtime/`) sono classificate come `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts` — vedere [Regola inderogabile n. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nessun trailer `Co-Authored-By` nei messaggi di commit — i commit devono risultare esclusivamente associati all'identità Git del proprietario del repository (Regola inderogabile n. 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Ottenere assistenza

- **Architettura**: Consulta [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Riferimento API**: Consulta [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentazione sulla sicurezza**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentazione operativa**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Segnalazioni**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: Consulta `docs/adr/` per i registri delle decisioni architetturali
