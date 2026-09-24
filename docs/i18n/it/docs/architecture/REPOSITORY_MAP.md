# Repository Map (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descrizione in una riga per ogni directory e file nella radice.**
> Ultimo aggiornamento: 2026-06-28 — OmniRoute v3.8.40
>
> Usa questa mappa per navigare rapidamente nella codebase. Per approfondimenti, segui i link alla documentazione dedicata.

## Albero di primo livello

```
OmniRoute/
├── src/                  # Applicazione Next.js 16 (UI + route API + librerie + dominio + server)
├── open-sse/             # Workspace del motore di streaming (gestori, esecutori, traduttore, server MCP)
├── electron/             # Wrapper desktop (Electron 41 + electron-builder 26.10)
├── bin/                  # Punto di ingresso della CLI e gestori dei comandi
├── scripts/              # Script di build, verifica, sincronizzazione e ad hoc
├── docs/                 # Documentazione pubblica (sei qui)
├── tests/                # Tutte le suite di test (unitari, integrazione, e2e, client di protocollo)
├── public/               # Risorse statiche di Next.js, manifest PWA, service worker, icone
├── config/               # Configurazione statica + stato dei quality gate (i18n, payloadRules, quality/)
├── images/               # Risorse grafiche per il marketing e il README
├── @omniroute/           # Pacchetti complementari pubblicabili (opencode-plugin, opencode-provider)
├── skills/               # Pacchetti di skill per CLI/agenti (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugin di esempio + starter omniroute-cmd-hello
├── contrib/              # Contributi della community (podman/)
├── .source/              # Configurazione sorgente di Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflow di GitHub Actions + modelli per issue + modello per PR
├── .husky/               # Hook Git (pre-commit, pre-push)
├── .claude/              # Comandi slash di Claude Code (specifici del progetto)
├── .agents/              # Workflow e skill per Codex/agenti generici (mirror di .claude/)
├── .vscode/              # Impostazioni del workspace di VS Code
├── _ideia/               # Note di pianificazione (informali; non distribuite)
├── _mono_repo/           # Sottoprogetti storici (cloud, site, vscode-extension)
├── _references/          # Cloni di riferimento in sola lettura da progetti OSS correlati
├── _tasks/               # File di monitoraggio delle attività per ogni release (informali)
├── .build/ .worktrees/ dist/   # Area temporanea locale per build / git-worktree / output di build (ignorata da Git)
├── .issues/              # Cache locale delle issue (ignorata da Git)
├── .playwright-mcp/      # Artefatti dei test Playwright MCP
├── coverage/             # Output della copertura c8 (ignorato da Git)
├── logs/                 # Log di runtime (ignorati da Git)
├── node_modules/         # Dipendenze (ignorate da Git)
├── package/              # Area di staging per npm pack (artefatto di build)
├── .next/                # Output di build di Next.js (ignorato da Git)
└── (file nella radice — vedi sotto)
```

---

## File nella radice

| File                                        | Scopo                                                                                                          |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Pagina di destinazione promozionale + avvio rapido + matrice delle funzionalità (vedere anche `llm.txt`)       |
| **CHANGELOG.md**                            | Registro delle modifiche per ogni versione (generato automaticamente dalla skill `/version-bump-cc`)           |
| **LICENSE**                                 | Testo della licenza MIT                                                                                        |
| **CLAUDE.md**                               | Regole del progetto per gli agenti Claude Code (regole inderogabili, convenzioni, scenari)                     |
| **AGENTS.md**                               | Come CLAUDE.md, ma per agenti IA diversi da Claude (Codex, Cursor, ecc.)                                       |
| **GEMINI.md**                               | Regole concise per gli agenti basati su Gemini (sottoinsieme di CLAUDE.md)                                     |
| **CONTRIBUTING.md**                         | Guida per i collaboratori: configurazione, commit convenzionali, test, flusso delle PR                         |
| **SECURITY.md**                             | Politica di segnalazione delle vulnerabilità, versioni supportate, modello delle minacce                       |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — aspettative sul comportamento della comunità                                            |
| **llm.txt**                                 | Pagina di destinazione in testo semplice ottimizzata per i crawler LLM (SEO per assistenti IA)                 |
| **package.json**                            | Manifest npm, script, dipendenze, motori, soglia di copertura c8                                               |
| **package-lock.json**                       | Albero delle dipendenze bloccato                                                                               |
| **tsconfig.json**                           | Configurazione TypeScript radice                                                                               |
| **tsconfig.typecheck-core.json**            | Configurazione del controllo dei tipi per il core `src/`                                                       |
| **tsconfig.typecheck-noimplicit-core.json** | Controllo dei tipi rigoroso (`noImplicitAny`)                                                                  |
| **tsconfig.tsbuildinfo**                    | Cache della build incrementale TS (ignorata da Git)                                                            |
| **next.config.mjs**                         | Configurazione della build di Next.js 16 (output autonomo)                                                     |
| **next-env.d.ts**                           | Tipi delle variabili d'ambiente generati automaticamente da Next.js                                            |
| **eslint.config.mjs**                       | Configurazione flat di ESLint (regole per area del progetto)                                                   |
| **prettier.config.mjs**                     | Regole di formattazione di Prettier                                                                            |
| **postcss.config.mjs**                      | Configurazione PostCSS per la pipeline Tailwind/CSS                                                            |
| **playwright.config.ts**                    | Configurazione dei test E2E di Playwright                                                                      |
| **vitest.config.ts**                        | Configurazione di Vitest (suite predefinita)                                                                   |
| **vitest.mcp.config.ts**                    | Configurazione di Vitest per il server MCP e le suite autoCombo/cache                                          |
| **sonar-project.properties**                | Configurazione SonarQube/SonarCloud (qualità del codice)                                                       |
| **Dockerfile**                              | Build Docker multi-stage (builder → runner-base → runner-cli)                                                  |
| **docker-compose.yml**                      | Compose di sviluppo con 4 profili (base, cli, host, cliproxyapi) + sidecar Redis                               |
| **docker-compose.prod.yml**                 | Compose di produzione (porta 20130, Redis, volumi denominati)                                                  |
| **.dockerignore**                           | File esclusi dal contesto Docker                                                                               |
| **fly.toml**                                | Configurazione di distribuzione Fly.io (regione `sin`, porta 20128, volume /data)                              |
| **.env.example**                            | Modello del file delle variabili d'ambiente (copiato automaticamente in `.env` alla prima installazione)       |
| **.gitignore**                              | Pattern ignorati da Git                                                                                        |
| **.npmignore**                              | Elenco delle esclusioni dalla pubblicazione npm                                                                |
| **.npmrc**                                  | Configurazione npm (registro, politica del lockfile)                                                           |
| **.node-version**                           | Versione di Node fissata (utilizzata dagli strumenti compatibili con nvm)                                      |
| **.nvmrc**                                  | Versione di Node fissata per nvm                                                                               |
| **eslint.complexity.config.mjs**            | Configurazione ESLint per il limite progressivo di complessità (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configurazione ESLint per le regole SonarJS (complessità cognitiva/duplicazione)                               |
| **source.config.ts**                        | Configurazione sorgente `defineDocs` di Fumadocs (alimenta `.source/`)                                         |
| **knip.json**                               | Configurazione Knip — file/esportazioni/dipendenze inutilizzati (alimenta il controllo del codice morto)       |
| **stryker.conf.json**                       | Configurazione dei test mutazionali di Stryker                                                                 |
| **.size-limit.json**                        | Configurazione del budget del bundle di size-limit                                                             |
| **promptfooconfig.yaml**                    | Configurazione delle valutazioni di promptfoo                                                                  |
| **.gitleaks.toml**                          | Set di regole di gitleaks per la scansione dei segreti                                                         |
| **.zizmor.yml**                             | Configurazione di zizmor per il linting di sicurezza di GitHub Actions                                         |
| **socket.yml**                              | Configurazione di Socket.dev per la sicurezza della supply chain                                               |
| **news.json**                               | Feed localizzato degli annunci di v2; l'elemento sul lancio di Radar è distribuito inattivo                    |
| **flake.nix** / **flake.lock**              | Definizione della shell di sviluppo Nix + file di lock                                                         |
| **.env**                                    | Segreti locali (ignorati da Git — generati da `.env.example`)                                                  |

> **Spostati dalla directory radice nella v3.8.26 (riordino):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` e il file generato `quality-metrics.json` (ignorato da Git). Vedi [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Applicazione Next.js

```
src/
├── app/                 # App Router (pagine + route API + pagine di stato + landing page)
├── lib/                 # Librerie principali / moduli di dominio (80 sottodirectory + ~70 file di primo livello)
├── domain/              # Logica di dominio pura (motore delle policy, fallback, costo, blocco, comboResolver, valutazione)
├── server/              # Moduli esclusivamente server (pipeline di autorizzazione, CORS, middleware di autenticazione) — non possono essere importati dal client
├── shared/              # Condiviso tra server e client dove è sicuro (costanti, tipi, validazione, contratti, utilità)
├── i18n/                # Configurazione next-intl + messaggi JSON per ogni locale (42 locale)
├── middleware/          # Middleware Next.js (arricchimento delle richieste, rilevamento della lingua)
├── mitm/                # Componente principale del proxy MITM: generazione/installazione dei certificati, gestori, destinazioni, ispettore, maschere, passthrough
│   ├── handlers/        # 9 classi di gestori per agenti IDE che estendono MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Livello di acquisizione del traffico: buffer (ring buffer in memoria), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Codice di collegamento per gli adattatori dei modelli (shim legacy)
├── scripts/             # Script di manutenzione inclusi nell'albero dei sorgenti (ad es., backfillAggregation)
├── sse/                 # Gestori/servizi SSE legacy (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Archivio legacy in memoria (in fase di dismissione a favore di src/lib/db)
├── types/               # File di tipi TS condivisi
├── instrumentation.ts   # Hook di telemetria Next.js (browser + edge)
├── instrumentation-node.ts  # Strumentazione esclusiva per Node
└── proxy.ts             # Shim del punto di ingresso del proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Percorso                                                                     | Scopo                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API pubblica compatibile con OpenAI (~25 sottoroute: chat, completamenti, embedding, file, batch, audio, immagini, video, musica, reranking, moderazione, ricerca, ws, agenti, account, provider, ecc.)                                                                                                                      |
| `app/api/v1beta/`                                                            | Endpoint API in stile Gemini                                                                                                                                                                                                                                                                                                 |
| `app/api/playground/`                                                        | Route di Playground Studio: `improve-prompt/` (POST — riscrittura dei prompt tramite LLM), `presets/` (elenco GET / creazione POST), `presets/[id]/` (GET / PUT / DELETE) — vedere `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                    |
| `app/api/` (non-v1)                                                          | Route di gestione/amministrazione (~60 directory: provider, combinazioni, impostazioni, mcp, a2a, valutazioni, memoria, competenze, webhook, conformità, resilienza, monitoraggio, tunnel, strumenti CLI, ecc.)                                                                                                              |
| `app/api/tools/agent-bridge/`                                                | API REST AgentBridge — 12 route (controllo del server, stato/DNS/mappature degli agenti, bypass, certificato, CA upstream). LOCAL_ONLY + SPAWN_CAPABLE. Vedere `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                          |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS di Traffic Inspector — oltre 16 route (richieste, sessioni, host, modalità di acquisizione, esportazione, ws). LOCAL_ONLY + SPAWN_CAPABLE. Vedere `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                   |
| `app/a2a/`                                                                   | Punto di ingresso A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | Agent Card A2A (rilevamento)                                                                                                                                                                                                                                                                                                 |
| `app/(dashboard)/dashboard/`                                                 | Pagine dell'interfaccia della dashboard (oltre 50 sezioni, ~118 file page.tsx: provider, combinazioni, impostazioni, memoria, competenze, webhook, valutazioni, audit, batch, cache, costi, integrità, sistema, attività, ecc.)                                                                                              |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interfaccia di Search Tools Studio (3 schede: Ricerca/Scraping/Confronto + SearchConceptCard + ProviderCatalog) — vedere `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                            |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (piano 21): `page.tsx` (struttura a 3 schede), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Pagina della dashboard di AgentBridge — scheda del server, 9 schede degli agenti, procedura guidata di configurazione, mappatura dei modelli, elenco di bypass. i18n PT-BR + EN. Vedere `docs/frameworks/AGENTBRIDGE.md`.                                                                                                    |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Pagina della dashboard di Traffic Inspector — suddivisione in stile DevTools, 7 schede dei dettagli, 4 selettori delle modalità di acquisizione, registratore di sessione, colorazione del contesto. i18n PT-BR + EN. Vedere `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                         |
| `app/(dashboard)/dashboard/activity/`                                        | Pagina del feed attività (Gruppo B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — vedere `docs/architecture/MONITORING_SECTIONS.md`                                                                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Pagina di condivisione delle quote (Gruppo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                   |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pagina di configurazione dei piani del provider (Gruppo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — override delle dimensioni delle quote per connessione                                                                                                                                                              |
| `app/docs/`                                                                  | Visualizzatore della documentazione integrato (esegue il rendering di `docs/*.md`)                                                                                                                                                                                                                                           |
| `app/landing/`                                                               | Pagina di destinazione per il marketing                                                                                                                                                                                                                                                                                      |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Pagine relative all'autenticazione                                                                                                                                                                                                                                                                                           |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Pagine di errore HTTP                                                                                                                                                                                                                                                                                                        |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Pagine statiche/di stato                                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout radice, pagina iniziale, manifest PWA, CSS globale                                                                                                                                                                                                                                                                    |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limiti di gestione degli errori                                                                                                                                                                                                                                                                                              |

### `src/lib/` — Librerie principali (~50 moduli)

| Modulo                                   | Scopo                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Gestore delle attività del protocollo A2A, competenze (5), streaming                                                                                                                                                                                                                                                                      |
| `acp/`                                   | Registro degli agenti CLI (rilevamento delle CLI locali — vedere `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                              |
| `api/`                                   | Utilità API condivise (`requireManagementAuth`, validazione)                                                                                                                                                                                                                                                                              |
| `auth/`                                  | Sessione, hashing delle password, validazione dei token                                                                                                                                                                                                                                                                                   |
| `batches/`                               | Gestori dell'API OpenAI Batches                                                                                                                                                                                                                                                                                                           |
| `catalog/`                               | Validazione Zod del catalogo dei provider + risoluzione delle funzionalità                                                                                                                                                                                                                                                                |
| `cloudAgent/`                            | Agenti cloud (Codex Cloud, Devin, Jules) — vedere `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                        |
| `combos/`                                | Risoluzione delle combinazioni + utilità di riordinamento                                                                                                                                                                                                                                                                                 |
| `audit/`                                 | Utilità del feed delle attività: `highLevelActions.ts` (elenco consentito + `isHighLevelAction()`), `activityIcons.ts` (mappa azione → icona/verbo), `timeline.ts` (groupByDay/relativeTime) — vedere `docs/architecture/MONITORING_SECTIONS.md`                                                                                          |
| `compliance/`                            | Registro di audit + audit dei provider — vedere `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                             |
| `compression/`                           | Codice di collegamento del motore di compressione (i motori si trovano in `open-sse/services/compression/`)                                                                                                                                                                                                                               |
| `config/`                                | Utilità per la configurazione in fase di esecuzione                                                                                                                                                                                                                                                                                       |
| `db/`                                    | Oltre 120 moduli DB di dominio + 168 migrazioni (per SQLite, passare sempre da qui)                                                                                                                                                                                                                                                       |
| `quota/`                                 | Motore di condivisione delle quote: `dimensions.ts` (tipi/Zod), `types.ts` (interfaccia QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — vedere `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Client del catalogo dei modelli gratuiti Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — vedi `docs/frameworks/RADAR.md`                                                                                                                                              |
| `display/`                               | Funzioni di supporto per la formattazione dell'interfaccia utente (costo, latenza, ecc.)                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Funzioni di supporto per il servizio di embedding                                                                                                                                                                                                                                                                                         |
| `env/`                                   | Analisi e convalida delle variabili d'ambiente                                                                                                                                                                                                                                                                                            |
| `evals/`                                 | Framework di valutazione (suite, runner, runtime) — vedi `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                       |
| `guardrails/`                            | Mascheramento dei dati personali, protezione dalla prompt injection, bridge per la visione — vedi `docs/security/GUARDRAILS.md`                                                                                                                                                                                                           |
| `jobs/`                                  | Processi in background (simili a cron)                                                                                                                                                                                                                                                                                                    |
| `memory/`                                | Memoria conversazionale (RRF ibrido SQLite FTS5 + sqlite-vec + livello 2 Qdrant) — vedi `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                       |
| `memory/embedding/`                      | Livello di embedding multi-sorgente: `index.ts` (risolutore), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (piano 21)                                                                                                                                                                                   |
| `memory/vectorStore.ts`                  | Wrapper sqlite-vec v0.1.9 — KNN a forza bruta + RRF ibrido (FTS5 + vettore, k=60). Inizializzazione lazy, degrada in modo controllato quando sqlite-vec non è disponibile. (piano 21)                                                                                                                                                     |
| `memory/reindex.ts`                      | `runReindexBatch()` — elabora in background le memorie con `needs_reindex=1`; chiamato da `POST /api/memory/reindex` e dal percorso di lazy backfill. (piano 21)                                                                                                                                                                          |
| `monitoring/`                            | Controlli di integrità, emissione di metriche                                                                                                                                                                                                                                                                                             |
| `oauth/`                                 | Flussi OAuth/di importazione per 22 moduli provider (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                           |
| `plugins/`                               | Registro dei plugin                                                                                                                                                                                                                                                                                                                       |
| `promptCache/`                           | Punti di interruzione della cache dei prompt in stile Anthropic                                                                                                                                                                                                                                                                           |
| `skills/`                                | Framework delle skill (integrate + marketplace + SkillsSH) — vedi `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                             |
| `playground/`                            | Helper condivisi di Playground Studio: `codeExport.ts` (generatore curl/Python/TS), `promptImprover.ts` (generatore di meta-prompt), `streamMetrics.ts` (TTFT/TPS puri), `types.ts` (tabella dei prezzi) — vedere `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                  |
| `webhookDispatcher.ts`                   | Invio di webhook HMAC — vedere `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Gestori dei tunnel — vedere `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                   |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronizzazione cloud opzionale dello stato                                                                                                                                                                                                                                                                                              |
| `localDb.ts`                             | Modulo barrel di riesportazione per i moduli del database (nessuna logica — solo riesportazioni)                                                                                                                                                                                                                                          |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Cache delle richieste + idempotenza                                                                                                                                                                                                                                                                                                       |
| (~30 altri file di primo livello)        | Helper specializzati (logEnv, modelsDevSync, piiSanitizer, ecc.)                                                                                                                                                                                                                                                                          |

### `src/lib/db/` — Database (122 moduli + 168 migrazioni)

| Sottodirectory            | Scopo                                                                                                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` con journaling WAL                                                                                                                                                  |
| `db/migrations/`          | File SQL con controllo di versione (idempotenti, transazionali). `073_memory_vec.sql` aggiunge `memory_vec_meta` + la colonna `needs_reindex` (piano 21).                                       |
| `db/playgroundPresets.ts` | Modulo CRUD per i preset di Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                    |
| `db/memoryVec.ts`         | CRUD per `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, ecc. (piano 21)                                    |
| `db/<domain>.ts`          | Un modulo per dominio: provider, combinazioni, chiavi API, utenti, sessioni, utilizzo, audit*log, webhook, competenze, memory_entries, cloud_agent_tasks, valutazioni*\*, reasoning_cache, ecc. |

### `src/domain/`

| Modulo                 | Scopo                                                                     |
| ---------------------- | ------------------------------------------------------------------------- |
| `policy.ts`            | Motore delle policy                                                       |
| `fallbackPolicy.ts`    | Albero decisionale di fallback                                            |
| `costRules.ts`         | Regole di calcolo dei costi                                               |
| `lockoutPolicy.ts`     | Policy di blocco di modelli/connessioni                                   |
| `tagRouter.ts`         | Instradamento basato sui tag                                              |
| `comboResolver.ts`     | Risoluzione delle combinazioni (utilizzata dal motore delle combinazioni) |
| `modelAvailability.ts` | Controllo della disponibilità per modello                                 |
| `assessment/`          | Valutazione dei modelli (fase 1 di RFC-AUTO-ASSESSMENT)                   |

### `src/server/`

| Modulo   | Scopo                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline di autorizzazione: `classify` → `policies` → `enforce` — vedere `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configurazione CORS                                                                                         |
| `auth/`  | Middleware di sessione                                                                                      |

### `src/shared/`

| Modulo                           | Scopo                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 provider** con validazione Zod (fonte autorevole)                       |
| `constants/cliTools.ts`          | Registro degli strumenti CLI esterni                                          |
| `constants/routingStrategies.ts` | **19 strategie di routing** con priorità                                      |
| `constants/publicApiRoutes.ts`   | Route che richiedono l'autenticazione Bearer (anziché quella di gestione)     |
| `constants/upstreamHeaders.ts`   | Elenco di esclusione degli header per le richieste upstream                   |
| `validation/schemas.ts`          | ~80 schemi Zod (unica fonte autorevole per i contratti API)                   |
| `validation/helpers.ts`          | Funzioni di supporto per la validazione Zod (`validateBody`, ecc.)            |
| `types/`                         | Tipi TS condivisi                                                             |
| `contracts/`                     | Contratti API pubblici (utilizzati da `files:` in `package.json`)             |
| `utils/circuitBreaker.ts`        | Circuit breaker dei provider (vedere `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Validazione delle chiavi API e verifica degli ambiti                          |
| `utils/fetchTimeout.ts`          | Wrapper di timeout/interruzione per le richieste fetch upstream               |
| `utils/releaseNotes.ts`          | Parser degli annunci v2/legacy chiusi, localizzazione e rimozione tramite ID  |

---

## `open-sse/` — Workspace del motore di streaming

Workspace npm separato (`@omniroute/open-sse`). Gestisce l'elaborazione delle richieste e l'esecuzione dei provider.

```
open-sse/
├── handlers/            # 16 file (12 handler + 4 helper): chatCore, responsesHandler, embeddings, audio, immagini, video, musica, rerank, moderazioni, ricerca, ecc.
├── executors/           # 67 executor specifici per provider (estendono BaseExecutor)
├── translator/          # Convertitori di formato (9 per le richieste, 9 per le risposte, 9 helper)
├── transformer/         # API Responses ↔ Chat Completions (TransformStream)
├── services/            # ~80+ moduli di servizio (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, ecc.)
├── mcp-server/          # Server MCP (110 strumenti, 3 trasporti, 33 ambiti)
├── config/              # Registri di provider/modelli, configurazione degli header, alias dei modelli
├── utils/               # Client TLS, fetch/dispatcher proxy, helper di rete
├── index.ts             # Punto di ingresso del workspace
├── package.json         # Manifest del workspace
├── tsconfig.json        # Configurazione TS del workspace
└── types.d.ts           # Dichiarazioni dei tipi del workspace
```

### `open-sse/mcp-server/`

| Percorso                    | Scopo                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `server.ts`                 | Ciclo di vita del server MCP (trasporti stdio + HTTP)                                          |
| `httpTransport.ts`          | Trasporti HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                            |
| `audit.ts`                  | Registrazione degli audit nella tabella `mcp_tool_audit`                                       |
| `scopeEnforcement.ts`       | Validazione dell'ambito per ogni strumento                                                     |
| `runtimeHeartbeat.ts`       | Heartbeat di integrità in `DATA_DIR/runtime/mcp-heartbeat.json`                                |
| `descriptionCompressor.ts`  | Comprime i metadati delle descrizioni degli strumenti per risparmiare contesto                 |
| `schemas/tools.ts`          | 36 definizioni di strumenti di base + ambiti                                                   |
| `tools/advancedTools.ts`    | Implementazioni degli strumenti avanzati                                                       |
| `tools/memoryTools.ts`      | 3 strumenti di memoria (ricerca/aggiunta/cancellazione)                                        |
| `tools/skillTools.ts`       | 4 strumenti per le skill (elenco/abilitazione/esecuzione/esecuzioni)                           |
| `tools/compressionTools.ts` | 5 strumenti di compressione                                                                    |
| `README.md`                 | README interno del server MCP (con collegamento incrociato da `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Wrapper desktop

| File             | Scopo                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processo principale Electron (BrowserWindow, server Next.js incorporato, tray, aggiornamento automatico) |
| `preload.js`     | Bridge IPC (contextBridge → `window.omniroute`)                                                          |
| `package.json`   | Configurazione electron-builder + dipendenze Electron 41 + electron-builder 26.10                        |
| `assets/`        | Icone dell'app (Windows .ico, macOS .icns, Linux .png)                                                   |
| `dist-electron/` | Output della build (ignorato da git)                                                                     |
| `types.d.ts`     | Dichiarazioni dei tipi per il bridge del renderer                                                        |
| `README.md`      | README interno di Electron (vedere anche `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| File                                                                                                        | Scopo                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Punto di ingresso principale della CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, ecc. |
| `reset-password.mjs`                                                                                        | CLI autonoma per la reimpostazione della password                                                                                                  |
| `cli/commands/setup.mjs`                                                                                    | Procedura guidata di configurazione interattiva e non interattiva                                                                                  |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostica dello stato del sistema (oltre 8 controlli)                                                                                            |
| `cli/commands/providers.mjs`                                                                                | Elenco/test/convalida dei provider                                                                                                                 |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Moduli di supporto della CLI                                                                                                                       |
| `cli/tray/tray.ts`                                                                                          | Integrazione con l'area di notifica di sistema (multipiattaforma: NotifyIcon su Windows, systray2 su macOS/Linux)                                  |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, nessun nuovo file binario)                                                                                 |
| `cli/tray/autostart.ts`                                                                                     | Avvio automatico multipiattaforma (LaunchAgent / .desktop / registro di sistema)                                                                   |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Catena di risoluzione del driver SQLite in 5 passaggi (incluso → runtime → installazione differita → node:sqlite → sql.js)                         |
| `cli/runtime/magicBytes.mjs`                                                                                | Convalida dei magic byte dei file binari (ELF / Mach-O / Mach-O fat / PE)                                                                          |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pre-risolve i driver durante il postinstall / primo avvio                                                                     |
| `nodeRuntimeSupport.mjs`                                                                                    | Convalida la versione di Node.js supportata durante l'installazione                                                                                |

---

## `skills/` — Skill pubbliche per agenti

| File                         | Scopo                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `skills/omniroute*/SKILL.md` | 10 manifesti di skill per agenti IA esterni (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Script di build e verifica

| Script                              | Scopo                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Runner di sviluppo/avvio con caricamento delle variabili d'ambiente                                        |
| `build-next-isolated.mjs`           | Build autonoma (modalità standalone di Next.js 16)                                                         |
| `prepublish.ts`                     | Preparazione del pacchetto prima di `npm pack`                                                             |
| `postinstall.mjs`                   | Creazione automatica di `.env` da `.env.example` alla prima installazione                                  |
| `sync-env.mjs`                      | Risincronizzazione delle chiavi di `.env` con `.env.example`                                               |
| `check-cycles.mjs`                  | Rilevamento delle dipendenze circolari                                                                     |
| `check-route-validation.mjs`        | Verifica che tutte le route API dispongano della validazione Zod                                           |
| `check-t11-any-budget.mjs`          | Applicazione del limite esplicito di `any` per file                                                        |
| `check-docs-sync.mjs`               | Verifica della sincronizzazione delle versioni della documentazione (pre-commit esistente)                 |
| **`check-env-doc-sync.mjs`**        | NUOVO: controllo incrociato delle variabili d'ambiente nel codice, in `.env.example` e in `ENVIRONMENT.md` |
| **`check-docs-counts-sync.mjs`**    | NUOVO: verifica che i conteggi (esecutori, strategie, OAuth, skill A2A) corrispondano alla documentazione  |
| **`check-deprecated-versions.mjs`** | NUOVO: segnalazione di versioni/date obsolete nella documentazione                                         |
| `check-supported-node-runtime.ts`   | Verifica che la versione corrente di Node sia supportata                                                   |
| `check-pr-test-policy.mjs`          | Applicazione della regola "test obbligatori" per le modifiche al codice di produzione                      |
| **`gen-provider-reference.ts`**     | NUOVO: generazione automatica di `docs/reference/PROVIDER_REFERENCE.md` dal catalogo                       |
| `i18n/generate-multilang.mjs`       | Traduzione delle stringhe dell'interfaccia e della documentazione tramite Google Translate                 |
| `i18n_autotranslate.py`             | Pipeline di traduzione della documentazione basata su LLM                                                  |
| `validate_translation.py`           | Verifica della traduzione per ogni impostazione locale                                                     |
| `check_translations.py`             | Verifica delle chiavi i18n lato codice                                                                     |
| `run-playwright-tests.mjs`          | Runner E2E Playwright                                                                                      |
| `run-protocol-clients-tests.mjs`    | Runner E2E MCP/A2A                                                                                         |
| `run-ecosystem-tests.mjs`           | Test dell'ecosistema (integrazione dei provider)                                                           |
| `test-report-summary.mjs`           | Generazione del riepilogo della copertura in markdown                                                      |
| `smoke-electron-packaged.mjs`       | Smoke test della build Electron pacchettizzata                                                             |
| `native-binary-compat.mjs`          | Verifica che le dipendenze native (`better-sqlite3`) corrispondano alla versione Node di Electron          |
| `validate-pack-artifact.ts`         | Verifica dell'output del pacchetto npm                                                                     |
| `responses-ws-proxy.mjs`            | Bridge WebSocket per l'API Codex Responses                                                                 |
| `v1-ws-bridge.mjs`                  | Bridge WebSocket per l'endpoint `/api/v1/ws`                                                               |
| `standalone-server-ws.mjs`          | Runner del server WS standalone                                                                            |
| `system-info.mjs`                   | Stampa delle informazioni di sistema/runtime per l'assistenza                                              |
| `healthcheck.mjs`                   | Controllo di integrità singolo (utilizzato da Docker HEALTHCHECK)                                          |
| `uninstall.mjs`                     | Script di disinstallazione completa                                                                        |

---

## `docs/` — Documentazione pubblica (7 file radice + 17 sottodirectory)

### Guide principali

| Documento                   | Scopo                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architettura di alto livello, mappa dei sottosistemi, interfaccia della dashboard                        |
| `CODEBASE_DOCUMENTATION.md` | Riferimento tecnico: directory, moduli, convenzioni                                                      |
| `FEATURES.md`               | Matrice delle funzionalità con le novità principali della v3.8                                           |
| `USER_GUIDE.md`             | Manuale utente (configurazione, modelli, combinazioni, CLI, audio, ecc.)                                 |
| `API_REFERENCE.md`          | Riferimento degli endpoint API con modello di autenticazione                                             |
| `openapi.yaml`              | Specifica OpenAPI 3.0 (121 percorsi)                                                                     |
| `SETUP_GUIDE.md`            | Metodi di installazione (npm, npx, Docker, Electron, Termux, sorgente)                                   |
| `ENVIRONMENT.md`            | Tutte le variabili d'ambiente (~800 documentate, ~3.050 righe in `.env.example`)                         |
| `TROUBLESHOOTING.md`        | Errori comuni + problemi noti della v3.8.0                                                               |
| `RELEASE_CHECKLIST.md`      | Flusso di rilascio completo (skill, husky, commit convenzionali, distribuzione)                          |
| `COVERAGE_PLAN.md`          | Obiettivi di copertura e stato attuale                                                                   |
| `FREE_TIERS.md`             | Fornitori selezionati con piano gratuito (oltre 48 gratuiti + 11 OAuth)                                  |
| `CLI-TOOLS.md`              | Integrazioni CLI esterne + CLI interna OmniRoute                                                         |
| `I18N.md`                   | Architettura i18n, aggiunta di una lingua, 42 impostazioni locali                                        |
| `UNINSTALL.md`              | Passaggi per una disinstallazione completa                                                               |
| `PROVIDER_REFERENCE.md`     | Catalogo **generato automaticamente** di 355 fornitori (rigenerazione: `npm run gen:provider-reference`) |

### Approfondimenti sui sottosistemi

| Documento                                   | Scopo                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | Server MCP: 110 strumenti, 3 trasporti, 33 ambiti, endpoint REST                                            |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 skill, helper REST, scheda agente                                                     |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Guida unificata: A2A vs ACP vs agent cloud                                                                  |
| `CLOUD_AGENT.md`                            | Orchestrazione di Codex Cloud / Devin / Jules                                                               |
| `SKILLS.md`                                 | Framework delle skill (integrate + marketplace + SkillsSH + sandbox)                                        |
| `RADAR.md`                                  | Overlay del catalogo Radar per modelli gratuiti (`RADAR_ENABLED`, disattivato per impostazione predefinita) |
| `MEMORY.md`                                 | Sistema di memoria (SQLite FTS5 + Qdrant)                                                                   |
| `EVALS.md`                                  | Framework di valutazione (suite, esecuzioni, rubriche)                                                      |
| `GUARDRAILS.md`                             | Mascheramento PII, prompt injection, bridge per la visione                                                  |
| `COMPLIANCE.md`                             | Log di controllo, conservazione, rinuncia tramite noLog                                                     |
| `WEBHOOKS.md`                               | Recapito dei webhook con firma HMAC                                                                         |
| `REASONING_REPLAY.md`                       | Cache ibrida memoria/SQLite per `reasoning_content`                                                         |
| `AUTHZ_GUIDE.md`                            | Pipeline di autorizzazione (`classify` → `policies` → `enforce`)                                            |
| `RESILIENCE_GUIDE.md`                       | Circuit breaker + periodo di attesa + blocco del modello                                                    |
| `docs/security/STEALTH_GUIDE.md` (solo git) | Fingerprinting TLS (JA3/JA4), Claude Code CCH, certificato MITM                                             |
| `AUTO-COMBO.md`                             | Motore Auto Combo (punteggio a 16 fattori, 6 pacchetti di modalità, fabbrica virtuale)                      |

### Compressione

| Documento                       | Scopo                                               |
| ------------------------------- | --------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Panoramica delle modalità di compressione + roadmap |
| `COMPRESSION_ENGINES.md`        | Motori Caveman + RTK, contratto del registro        |
| `COMPRESSION_RULES_FORMAT.md`   | Schema JSON del pacchetto di regole Caveman         |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventario dei pacchetti di regole per lingua       |
| `RTK_COMPRESSION.md`            | Pipeline dichiarativa RTK (49 filtri)               |

### Distribuzione

| Documento                    | Scopo                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Build Docker, profili (base/cli/host/cliproxyapi), sidecar Redis   |
| `VM_DEPLOYMENT_GUIDE.md`     | Distribuzione generica su VM/VPS (Ubuntu/Debian + nginx + systemd) |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Distribuzione su Fly.io (attualmente solo in cinese)               |
| `TERMUX_GUIDE.md`            | Android headless tramite Termux                                    |
| `PWA_GUIDE.md`               | Installazione della Progressive Web App + service worker           |
| `ELECTRON_GUIDE.md`          | Build + firma + distribuzione dell'app desktop                     |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                             |
| `PROXY_GUIDE.md`             | Proxy in uscita a 4 livelli + marketplace 1proxy                   |

### Sottodirectory

| Sottodirectory        | Scopo                                                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | Traduzioni localizzate della documentazione (41 lingue)                                                                                                                                                                  |
| `docs/screenshots/`   | Risorse grafiche per le guide                                                                                                                                                                                            |
| `_tasks/superpowers/` | Piani/specifiche di superpowers (`writing-plans`/`brainstorming`) + ricerca — repository isolato con versionamento separato, ignorato da git nell'albero principale. Vedere CLAUDE.md → "Planning & Research Artifacts". |

---

## `tests/` — Suite di test

| Sottodirectory                       | Tipo                                            | Runner                                        |
| ------------------------------------ | ----------------------------------------------- | --------------------------------------------- |
| `tests/unit/`                        | Test unitari (~4.800 file, i più veloci)        | Runner di test nativo di Node                 |
| `tests/integration/`                 | Test di integrazione multi-modulo + DB          | Runner di test nativo di Node (concorrenza 1) |
| `tests/e2e/`                         | E2E di UI + flusso di lavoro                    | Playwright                                    |
| `tests/e2e/protocol-clients.test.ts` | E2E MCP + A2A con client reali                  | Client di protocollo personalizzati           |
| `tests/e2e/ecosystem.test.ts`        | Integrazione dei provider (con accesso in rete) | Runner di test nativo di Node                 |

---

## `public/` — Risorse statiche

| Percorso            | Scopo                                                                |
| ------------------- | -------------------------------------------------------------------- |
| `public/` (radice)  | Favicon, robots.txt, manifest, service worker, immagini di marketing |
| `public/providers/` | Logo dei provider in formato PNG/SVG (utilizzati nella dashboard)    |

---

## `config/` — Configurazioni statiche + stato dei controlli di qualità

Modelli di configurazione distribuiti insieme alle baseline dei controlli di qualità incluse nel repository
(spostate qui dalla radice del repository nella v3.8.26 per mantenerla snella).

| Percorso                                      | Scopo                                                                                         |
| --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Elenco delle impostazioni locali + metadati (fonte canonica per il conteggio delle 42 lingue) |
| `config/i18n-schema.json`                     | Schema JSON per la convalida di `i18n.json`                                                   |
| `config/payloadRules.json`                    | Regole di sanificazione dei payload upstream                                                  |
| `config/quality/quality-baseline.json`        | Baseline ratchet multi-metrica (`scripts/quality/check-quality-ratchet.mjs`)                  |
| `config/quality/complexity-baseline.json`     | Baseline congelata della complessità ESLint (`check-complexity.mjs`)                          |
| `config/quality/duplication-baseline.json`    | Baseline congelata della duplicazione jscpd (`check-duplication.mjs`)                         |
| `config/quality/file-size-baseline.json`      | Baseline congelata delle dimensioni per file (`check-file-size.mjs`)                          |
| `config/quality/test-discovery-baseline.json` | Baseline congelata dei test orfani (`check-test-discovery.mjs`)                               |
| `config/quality/dependency-allowlist.json`    | Lista consentita delle dipendenze approvate (`check-deps.mjs`)                                |
| `config/quality/.license-allowlist.json`      | Lista consentita delle licenze SPDX (`check-licenses.mjs`)                                    |
| `config/quality/quality-metrics.json`         | Metriche temporanee raccolte (generate da `collect-metrics.mjs`; **ignorate da git**)         |

---

## `.github/` — Integrazione con GitHub

| Percorso                           | Scopo                                                              |
| ---------------------------------- | ------------------------------------------------------------------ |
| `.github/workflows/`               | Workflow CI/CD di GitHub Actions (lint, test, copertura, rilascio) |
| `.github/ISSUE_TEMPLATE/`          | Modelli di issue per bug/funzionalità                              |
| `.github/pull_request_template.md` | Modello per le PR                                                  |
| `.github/dependabot.yml`           | Configurazione degli aggiornamenti delle dipendenze                |

---

## `.husky/` — Hook Git

| File         | Scopo                                                                            |
| ------------ | -------------------------------------------------------------------------------- |
| `pre-commit` | Esegue `lint-staged + check-docs-sync + check:any-budget:t11`                    |
| `pre-push`   | Attualmente disabilitato (commentato). Eseguire manualmente `npm run test:unit`. |
| `_/`         | Componenti interni di Husky                                                      |

---

## `.claude/` — Comandi slash di Claude Code

| File                                                | Scopo                                                                 |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incremento della versione + changelog automatico |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — workflow di rilascio completo                |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Distribuzione su VPS                                                  |
| `commands/capture-release-evidences-cc.md`          | Registra nel browser le nuove funzionalità come WebP                  |
| `commands/review-{prs,discussions}-cc.md`           | Triage di PR/discussioni GitHub                                       |
| `commands/{review-issues,implement-features}-cc.md` | Workflow per le issue                                                 |
| `settings.local.json`                               | Impostazioni di Claude Code specifiche per il progetto                |

---

## `.agents/` — Workflow generici per agenti (Codex / Cursor / ecc.)

| Percorso                 | Scopo                                                        |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 definizioni di workflow (replica di `.claude/commands/`)  |
| `skills/<name>/SKILL.md` | 9 definizioni di competenze con note di esecuzione per Codex |

> **Nota:** I workflow e i comandi sono attualmente identici byte per byte. Se `.agents/` è destinata a un runtime di agente diverso (Codex), le varianti devono differenziarsi in modo significativo.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Esterni all'albero principale

Queste directory con prefisso underscore contengono materiale non destinato alla distribuzione:

- **`_ideia/`** — note di progettazione (categorie defer / notfit / viable)
- **`_mono_repo/`** — sottoprogetti storici (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — cloni di sola lettura di progetti OSS correlati (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, ecc.) per riferimenti incrociati durante lo sviluppo
- **`_tasks/`** — file informali di tracciamento delle attività per ogni rilascio

Non incluse nell'output di `npm pack`. Vedere `.npmignore`.

---

## Generati / Ignorati da Git

| Percorso               | Scopo                               |
| ---------------------- | ----------------------------------- |
| `node_modules/`        | Dipendenze npm                      |
| `.next/`               | Output della build di Next.js       |
| `coverage/`            | Report di copertura c8              |
| `logs/`                | Log di runtime                      |
| `package/`             | Area di staging per npm pack        |
| `.playwright-mcp/`     | Artefatti di test di Playwright MCP |
| `.issues/`             | Cache locale delle issue            |
| `tsconfig.tsbuildinfo` | Cache incrementale di TS            |

---

## Suggerimenti per la navigazione

- **Nuovo collaboratore?** Leggi `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Stai aggiungendo un provider?** Segui `docs/architecture/ARCHITECTURE.md § Aggiunta di un nuovo provider` e verifica anche `docs/reference/PROVIDER_REFERENCE.md`.
- **Stai aggiungendo una route?** Consulta `docs/architecture/ARCHITECTURE.md § Aggiunta di una nuova route API` e `src/shared/validation/schemas.ts`.
- **Stai aggiungendo uno strumento MCP?** Consulta `docs/frameworks/MCP-SERVER.md § Aggiunta di uno strumento`.
- **Stai aggiungendo una skill A2A?** Consulta `docs/frameworks/A2A-SERVER.md § Aggiunta di una nuova skill`.
- **Vuoi eseguire il progetto localmente?** Consulta `docs/guides/SETUP_GUIDE.md`.
- **Vuoi eseguire il deployment?** Consulta `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vuoi pubblicare una release?** Consulta `docs/ops/RELEASE_CHECKLIST.md` (e la skill Claude Code `/generate-release-cc`).
