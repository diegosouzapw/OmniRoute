# Contributing to OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configurazione dell'ambiente di sviluppo

### Prerequisiti

- **Node.js** `>=22.22.2 <23`, oppure `>=24.0.0 <27` (consigliato: 24 LTS)
- **npm** 10+

> **Utenti di npm v11+ (Node 24+):** dopo `npm install`, verifica che i moduli nativi siano stati installati:
> `node -e "require('better-sqlite3')"`. Se il comando non riesce e restituisce `MODULE_NOT_FOUND`,
> esegui `npm approve-scripts better-sqlite3 && npm install`. Consulta
> [Risoluzione dei problemi](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonazione e installazione

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variabili di ambiente

```bash
# Crea il tuo .env dal modello
cp .env.example .env

# Genera i segreti richiesti
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variabili principali per lo sviluppo:

| Variabile              | Valore predefinito di sviluppo | Descrizione                   |
| ---------------------- | ------------------------------ | ----------------------------- |
| `PORT`                 | `20128`                        | Porta del server              |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`       | URL di base per il frontend   |
| `JWT_SECRET`           | (generato sopra)               | Segreto per la firma dei JWT  |
| `INITIAL_PASSWORD`     | `CHANGEME`                     | Password per il primo accesso |
| `APP_LOG_LEVEL`        | `info`                         | Livello di verbosità dei log  |

### Impostazioni della dashboard

La dashboard fornisce opzioni nell'interfaccia per funzionalità che possono essere configurate anche tramite variabili di ambiente:

| Posizione dell'impostazione | Opzione                         | Descrizione                                     |
| --------------------------- | ------------------------------- | ----------------------------------------------- |
| Impostazioni → Avanzate     | Modalità di debug               | Abilita i log di debug delle richieste (UI)     |
| Impostazioni → Generali     | Visibilità della barra laterale | Mostra/nasconde le sezioni della barra laterale |

Queste impostazioni vengono archiviate nel database e persistono tra i riavvii, sovrascrivendo i valori predefiniti delle variabili di ambiente quando vengono configurate.

### Esecuzione in locale

```bash
# Modalità di sviluppo (ricaricamento automatico)
npm run dev

# Build di produzione
npm run build    # next build → .build/next/, quindi assembleStandalone → dist/
npm run start

# Compilazione rapida del solo backend/API per le modifiche dei contributori
npm run build:contributor

# Build di rilascio (ricompilazione pulita + sentinella HEAD — richiesta per il deployment)
npm run build:release   # rm -rf .build dist && build + scrive dist/BUILD_SHA

# Configurazione comune della porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

La build per i contributori esegue esclusivamente la convalida della compilazione: non assembla la
distribuzione standalone né genera le risorse native opzionali per il packaging. Usa la normale build
di produzione quando devi convalidare il bundle distribuibile.

### Struttura dell'output della build

| Directory | Contenuto                                                                          | Tracciata |
| --------- | ---------------------------------------------------------------------------------- | --------- |
| `src/`    | Codice sorgente dell'applicazione (TypeScript / TSX)                               | Sì        |
| `.build/` | File intermedi — output di `next build` (ignorato da git, `distDir = .build/next`) | No        |
| `dist/`   | Bundle distribuibile — assemblato da `assembleStandalone` (ignorato da git)        | No        |

La pipeline di build viene eseguita in un singolo passaggio:

```
npm run build
  └─ next build → .build/next/standalone  (output di Next.js)
  └─ assembleStandalone()                 (copia standalone + file statici + public + risorse native)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` pulisce inoltre entrambe le directory prima dell'esecuzione e scrive
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) come sentinella per l'integrità del deployment.

`npm run build:contributor` utilizza il profilo di build del solo backend. Durante la build sostituisce
temporaneamente i file dell'interfaccia della dashboard con stub, mantiene i gestori delle route API e
ripristina i file originali al termine della build. Usa `npm run build` per le modifiche che interessano
l'interfaccia della dashboard o per una convalida completa del rilascio; il profilo per i contributori
non sostituisce la build di rilascio.

> **Nota sul deployment su VPS:** la directory dell'immagine remota `/usr/lib/node_modules/omniroute/app/`
> rimane invariata. Le procedure di deployment sincronizzano tramite rsync il contenuto di `dist/` al suo interno.
> È cambiato soltanto il percorso dell'output della build nel repository (`app/` → `dist/`).

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

## Struttura del progetto

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # App Router di Next.js 16
│   ├── (dashboard)/        # Pagine della dashboard (23 sezioni)
│   ├── api/                # Route API (51 directory)
│   └── login/              # Pagine di autenticazione (.tsx)
├── domain/                 # Motore delle policy (policyEngine, comboResolver, costRules, ecc.)
├── lib/                    # Logica di business principale (.ts)
│   ├── a2a/                # Server del protocollo Agent-to-Agent v0.3
│   ├── acp/                # Registro dell'Agent Communication Protocol
│   ├── compliance/         # Motore delle policy di conformità
│   ├── db/                 # Moduli di dominio SQLite + 130 migrazioni
│   ├── memory/             # Memoria conversazionale persistente
│   ├── oauth/              # Provider, servizi e utilità OAuth
│   ├── skills/             # Framework estensibile per le skill
│   ├── usage/              # Monitoraggio dell'utilizzo e calcolo dei costi
│   └── localDb.ts          # Solo livello di riesportazione — non aggiungere mai logica qui
├── middleware/              # Middleware delle richieste (promptInjectionGuard)
├── mitm/                   # Proxy MITM (certificati, DNS, instradamento delle destinazioni)
├── shared/
│   ├── components/         # Componenti React (.tsx)
│   ├── constants/          # Definizioni dei provider (329), ambiti MCP, 21 strategie di instradamento
│   ├── utils/              # Circuit breaker, sanitizzatore, helper di autenticazione
│   └── validation/         # Schemi Zod v4
└── sse/                    # Pipeline del proxy SSE

open-sse/                   # Workspace @omniroute/open-sse
├── executors/              # 150 moduli executor (classi executor + helper specifici per provider)
├── handlers/               # 11 gestori delle richieste (chat, risposte, embedding, immagini, ecc.)
├── mcp-server/             # Server MCP (110 strumenti univoci, 3 trasporti, 33 ambiti)
├── services/               # 178 servizi di primo livello (combo, autoCombo, rateLimitManager, ecc.)
├── translator/             # Traduttori di formato (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Trasformatore dell'API Responses
└── utils/                  # 22 moduli di utilità (stream, TLS, proxy, logging)

electron/                   # Applicazione desktop Electron (multipiattaforma)

tests/
├── unit/                   # Test runner di Node.js (1.574 file di test)
├── integration/            # Test di integrazione
├── e2e/                    # Test Playwright
├── security/               # Test di sicurezza
├── translator/             # Test specifici del traduttore
└── load/                   # Test di carico

docs/
├── adr/                     # Registri delle decisioni architetturali
├── architecture/            # Architettura e resilienza del sistema
├── comparison/              # OmniRoute rispetto alle alternative
├── compression/             # Guide e regole per la compressione
├── dev/                     # Guide allo sviluppo
├── diagrams/                # Diagrammi dell'architettura
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Guida utente, Docker, configurazione, risoluzione dei problemi
├── i18n/                    # Traduzioni internazionalizzate del README
├── marketing/               # Materiali di marketing
├── ops/                     # Distribuzione, proxy, copertura, rilasci
├── providers/               # Documentazione specifica dei provider
├── reference/               # Riferimento API, variabili d'ambiente, strumenti CLI, piani gratuiti
├── releases/                # Note di rilascio
├── routing/                 # Motore di combinazione automatica, riproduzione del ragionamento
├── screenshots/             # Schermate della dashboard
├── security/                # Protezioni, conformità, modalità invisibile, token
└── specs/                   # Specifiche di progettazione
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

## Checklist della pull request

- [ ] I test vengono superati (`npm test`)
- [ ] Il linting viene superato (`npm run lint`)
- [ ] La build viene completata con successo (`npm run build`)
- [ ] Sono stati aggiunti i tipi TypeScript per le nuove funzioni e interfacce pubbliche
- [ ] Nessun segreto o valore di fallback codificato direttamente
- [ ] Le credenziali pubbliche upstream sono incorporate tramite `resolvePublicCred()` (vedere [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), mai come valori letterali
- [ ] Le risposte di errore vengono gestite tramite `buildErrorBody()` / `sanitizeErrorMessage()` — nessuna traccia dello stack non elaborata nei corpi delle risposte (vedere [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] I comandi shell (`exec` / `spawn`) passano i valori di runtime tramite `env`, non tramite interpolazione di stringhe
- [ ] Tutti gli input vengono convalidati con schemi Zod
- [ ] È stato aggiunto un **frammento** del changelog in `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` per le modifiche visibili agli utenti (vedere [`changelog.d/README.md`](./changelog.d/README.md)) — **non** modificare direttamente `CHANGELOG.md`; i frammenti vengono aggregati al momento del rilascio e non generano mai conflitti tra le PR
- [ ] La documentazione è stata aggiornata (se applicabile)
- [ ] Non sono stati generati nuovi avvisi CodeQL / Secret-Scanning oppure ciascuno è stato ignorato con una giustificazione tecnica che fa riferimento al documento pertinente in `docs/security/`
- [ ] Le route che generano processi figlio (`/api/mcp/`, `/api/cli-tools/runtime/`) sono classificate come `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts` — vedere la [Regola tassativa n. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nessun trailer `Co-authored-by` relativo ad AI/bot nei messaggi di commit (Regola tassativa n. 16) — i collaboratori umani il cui lavoro viene riutilizzato sono accreditati con trailer standard `Co-authored-by: Name <email>`

---

## Rilascio

I rilasci vengono gestiti tramite il workflow `/generate-release`. Quando viene creata una nuova release su GitHub, il pacchetto viene **pubblicato automaticamente su npm** tramite GitHub Actions.

Per i deployment su VPS, usa `npm run build:release` (non `npm run build`): esegue una
ricompilazione pulita, assembla il bundle in `dist/` e scrive il file sentinella `dist/BUILD_SHA`.
Quindi usa le skill `/deploy-vps-*-cc`, che sincronizzano `dist/` tramite rsync con la directory remota `app/`.

---

## Ottenere aiuto

- **Architettura**: Consulta [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Riferimento API**: Consulta [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentazione sulla sicurezza**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentazione operativa**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Segnalazioni**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
