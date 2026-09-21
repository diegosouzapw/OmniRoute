# Repository Map (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descriere într-un singur rând pentru fiecare director și fișier rădăcină.**
> Ultima actualizare: 2026-06-28 — OmniRoute v3.8.40
>
> Folosiți această hartă pentru a naviga rapid prin baza de cod. Pentru informații detaliate, urmați linkurile către documentația dedicată.

## Arborele de nivel superior

```
OmniRoute/
├── src/                  # Aplicație Next.js 16 (interfață + rute API + biblioteci + domeniu + server)
├── open-sse/             # Spațiu de lucru pentru motorul de streaming (gestionari, executori, translator, server MCP)
├── electron/             # Înveliș desktop (Electron 41 + electron-builder 26.10)
├── bin/                  # Punct de intrare CLI și gestionari de comenzi
├── scripts/              # Scripturi pentru compilare, verificare, sincronizare și operațiuni punctuale
├── docs/                 # Documentație publică (vă aflați aici)
├── tests/                # Toate suitele de teste (unitare, de integrare, e2e, clienți de protocol)
├── public/               # Resurse statice Next.js, manifest PWA, service worker, pictograme
├── config/               # Configurație statică + starea pragurilor de calitate (i18n, payloadRules, quality/)
├── images/               # Resurse grafice pentru marketing / README
├── @omniroute/           # Pachete complementare publicabile (opencode-plugin, opencode-provider)
├── skills/               # Pachete de abilități pentru CLI/agenți (cli-* + omni-* + config-codex-cli)
├── examples/             # Pluginuri demonstrative + proiect inițial omniroute-cmd-hello
├── contrib/              # Contribuții ale comunității (podman/)
├── .source/              # Configurație sursă Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Fluxuri de lucru GitHub Actions + șabloane pentru probleme + șablon PR
├── .husky/               # Hook-uri Git (pre-commit, pre-push)
├── .claude/              # Comenzi slash Claude Code (specifice proiectului)
├── .agents/              # Fluxuri de lucru + abilități pentru Codex / agenți generici (oglindă a .claude/)
├── .vscode/              # Setări pentru spațiul de lucru VS Code
├── _ideia/               # Note de planificare (informale; nelivrate)
├── _mono_repo/           # Subproiecte istorice (cloud, site, vscode-extension)
├── _references/          # Clone de referință doar în citire din proiecte OSS asociate
├── _tasks/               # Fișiere de urmărire a sarcinilor pentru fiecare versiune (informale)
├── .build/ .worktrees/ dist/   # Zone temporare locale pentru compilare / git-worktree / rezultate de compilare (ignorate de Git)
├── .issues/              # Cache local pentru probleme (ignorat de Git)
├── .playwright-mcp/      # Artefacte de testare Playwright MCP
├── coverage/             # Rezultate de acoperire c8 (ignorate de Git)
├── logs/                 # Jurnale de execuție (ignorate de Git)
├── node_modules/         # Dependențe (ignorate de Git)
├── package/              # Zonă intermediară pentru npm pack (artefact de compilare)
├── .next/                # Rezultatele compilării Next.js (ignorate de Git)
└── (fișiere rădăcină — vedeți mai jos)
```

---

## Fișiere rădăcină

| Fișier                                      | Scop                                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Pagină de prezentare pentru marketing + pornire rapidă + matrice de funcționalități (consultați și `llm.txt`)             |
| **CHANGELOG.md**                            | Jurnal de modificări pentru fiecare versiune (generat automat de skill-ul `/version-bump-cc`)                             |
| **LICENSE**                                 | Textul licenței MIT                                                                                                       |
| **CLAUDE.md**                               | Reguli de proiect pentru agenții Claude Code (reguli stricte, convenții, scenarii)                                        |
| **AGENTS.md**                               | Același conținut ca CLAUDE.md, dar pentru agenții AI non-Claude (Codex, Cursor etc.)                                      |
| **GEMINI.md**                               | Reguli concise pentru agenții bazați pe Gemini (subset al CLAUDE.md)                                                      |
| **CONTRIBUTING.md**                         | Ghid pentru contribuitori: configurare, commituri convenționale, testare, fluxul PR                                       |
| **SECURITY.md**                             | Politica de raportare a vulnerabilităților, versiunile acceptate, modelul de amenințări                                   |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — așteptări privind comportamentul în comunitate                                                     |
| **llm.txt**                                 | Pagină de prezentare în text simplu, optimizată pentru crawlere LLM (SEO pentru asistenți AI)                             |
| **package.json**                            | Manifest npm, scripturi, dependențe, motoare, prag de acoperire c8                                                        |
| **package-lock.json**                       | Arbore de dependențe blocat                                                                                               |
| **tsconfig.json**                           | Configurația TypeScript rădăcină                                                                                          |
| **tsconfig.typecheck-core.json**            | Configurație de verificare a tipurilor pentru nucleul `src/`                                                              |
| **tsconfig.typecheck-noimplicit-core.json** | Verificare strictă a tipurilor (`noImplicitAny`)                                                                          |
| **tsconfig.tsbuildinfo**                    | Cache pentru compilarea incrementală TS (ignorat de git)                                                                  |
| **next.config.mjs**                         | Configurație de compilare Next.js 16 (ieșire autonomă)                                                                    |
| **next-env.d.ts**                           | Tipuri de mediu generate automat de Next.js                                                                               |
| **eslint.config.mjs**                       | Configurație ESLint de tip flat (reguli pentru fiecare zonă a proiectului)                                                |
| **prettier.config.mjs**                     | Reguli de formatare Prettier                                                                                              |
| **postcss.config.mjs**                      | Configurație PostCSS pentru fluxul Tailwind/CSS                                                                           |
| **playwright.config.ts**                    | Configurație pentru testele E2E Playwright                                                                                |
| **vitest.config.ts**                        | Configurație Vitest (suita implicită)                                                                                     |
| **vitest.mcp.config.ts**                    | Configurație Vitest pentru suitele serverului MCP / autoCombo / cache                                                     |
| **sonar-project.properties**                | Configurație SonarQube/SonarCloud (calitatea codului)                                                                     |
| **Dockerfile**                              | Compilare Docker în mai multe etape (builder → runner-base → runner-cli)                                                  |
| **docker-compose.yml**                      | Compose pentru dezvoltare cu 4 profiluri (base, cli, host, cliproxyapi) + serviciu auxiliar redis                         |
| **docker-compose.prod.yml**                 | Compose pentru producție (portul 20130, redis, volume denumite)                                                           |
| **.dockerignore**                           | Fișiere excluse din contextul Docker                                                                                      |
| **fly.toml**                                | Configurație de implementare Fly.io (regiunea `sin`, portul 20128, volumul /data)                                         |
| **.env.example**                            | Șablon de fișier de mediu (copiat automat în `.env` la prima instalare)                                                   |
| **.gitignore**                              | Modele de ignorare Git                                                                                                    |
| **.npmignore**                              | Listă de excluderi pentru publicarea npm                                                                                  |
| **.npmrc**                                  | Configurație npm (registru, politica fișierului de blocare)                                                               |
| **.node-version**                           | Versiune Node fixată (utilizată de instrumentele compatibile cu nvm)                                                      |
| **.nvmrc**                                  | Versiune Node fixată pentru nvm                                                                                           |
| **eslint.complexity.config.mjs**            | Configurație ESLint pentru mecanismul gradual de limitare a complexității (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configurație ESLint pentru regulile SonarJS (complexitate cognitivă / duplicare)                                          |
| **source.config.ts**                        | Configurație sursă Fumadocs `defineDocs` (furnizează date către `.source/`)                                               |
| **knip.json**                               | Configurație Knip — fișiere/exporturi/dependențe neutilizate (alimentează pragul pentru cod nefolosit)                    |
| **stryker.conf.json**                       | Configurație Stryker pentru testarea prin mutații                                                                         |
| **.size-limit.json**                        | Configurația bugetului pentru dimensiunea bundle-ului, utilizată de size-limit                                            |
| **promptfooconfig.yaml**                    | Configurația evaluărilor promptfoo                                                                                        |
| **.gitleaks.toml**                          | Setul de reguli gitleaks pentru scanarea secretelor                                                                       |
| **.zizmor.yml**                             | Configurația zizmor pentru analiza de securitate a GitHub Actions                                                         |
| **socket.yml**                              | Configurația Socket.dev pentru lanțul de aprovizionare                                                                    |
| **news.json**                               | Flux localizat de anunțuri v2; elementul de lansare Radar este livrat inactiv                                             |
| **flake.nix** / **flake.lock**              | Definiția shell-ului de dezvoltare Nix + fișierul de blocare                                                              |
| **.env**                                    | Secrete locale (ignorate de git — generate din `.env.example`)                                                            |

> **Mutate din rădăcină în v3.8.26 (pentru simplificare):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` și fișierul generat `quality-metrics.json` (ignorat de git). Consultați [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Aplicație Next.js

```
src/
├── app/                 # App Router (pagini + rute API + pagini de stare + pagină de prezentare)
├── lib/                 # Biblioteci de bază / module de domeniu (80 de subdirectoare + ~70 de fișiere la nivel superior)
├── domain/              # Logică pură de domeniu (motor de politici, rezervă, cost, blocare, comboResolver, evaluare)
├── server/              # Module exclusiv pentru server (flux de autorizare, CORS, middleware de autentificare) — nu pot fi importate din client
├── shared/              # Partajate între server și client acolo unde este sigur (constante, tipuri, validare, contracte, utilitare)
├── i18n/                # Configurație next-intl + mesaje JSON pentru fiecare localizare (42 de localizări)
├── middleware/          # Middleware Next.js (îmbogățirea cererilor, detectarea localizării)
├── mitm/                # Nucleul proxy-ului MITM: generarea/instalarea certificatelor, gestionare, ținte, inspecție, măști, redirecționare directă
│   ├── handlers/        # 9 clase de gestionare pentru agenți IDE care extind MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Strat de captare a traficului: buffer (inel în memorie), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Cod de integrare pentru adaptoarele de modele (strat de compatibilitate vechi)
├── scripts/             # Scripturi de mentenanță incluse în arbore (de ex., backfillAggregation)
├── sse/                 # Gestionare/servicii SSE vechi (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Stocare veche în memorie (în curs de eliminare în favoarea src/lib/db)
├── types/               # Fișiere de tipuri TS partajate
├── instrumentation.ts   # Cârlig de telemetrie Next.js (browser + edge)
├── instrumentation-node.ts  # Instrumentare exclusiv pentru Node
└── proxy.ts             # Strat de compatibilitate pentru punctul de intrare al proxy-ului HTTP
```

### `src/app/` — App Router (Next.js 16)

| Cale                                                                         | Scop                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API public compatibil cu OpenAI (~25 de subrute: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers etc.)                                                                                                                             |
| `app/api/v1beta/`                                                            | Endpointuri API în stil Gemini                                                                                                                                                                                                                                                                                               |
| `app/api/playground/`                                                        | Rute Playground Studio: `improve-prompt/` (POST — rescriere a prompturilor cu LLM), `presets/` (GET pentru listare / POST pentru creare), `presets/[id]/` (GET / PUT / DELETE) — consultați `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                           |
| `app/api/` (non-v1)                                                          | Rute de gestionare/administrare (~60 de directoare: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools etc.)                                                                                                                                     |
| `app/api/tools/agent-bridge/`                                                | API REST AgentBridge — 12 rute (controlul serverului, starea/DNS/mapările agentului, ocolire, certificat, CA din amonte). LOCAL_ONLY + SPAWN_CAPABLE. Consultați `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                        |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS Traffic Inspector — peste 16 rute (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Consultați `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                    |
| `app/a2a/`                                                                   | Punct de intrare A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                              |
| `app/.well-known/agent.json/`                                                | Card de agent A2A (descoperire)                                                                                                                                                                                                                                                                                              |
| `app/(dashboard)/dashboard/`                                                 | Pagini ale interfeței tabloului de bord (peste 50 de secțiuni, ~118 fișiere page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity etc.)                                                                                                               |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interfața Search Tools Studio (3 file: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — consultați `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                    |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (planul 21): `page.tsx` (structură cu 3 file), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Pagina de tablou de bord AgentBridge — card pentru server, 9 carduri pentru agenți, expert de configurare, maparea modelelor, listă de ocolire. i18n PT-BR + EN. Consultați `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Pagina de tablou de bord Traffic Inspector — dispunere divizată DevTools, 7 file cu detalii, 4 comutatoare pentru modul de capturare, înregistrator de sesiuni, colorizare contextuală. i18n PT-BR + EN. Consultați `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                  |
| `app/(dashboard)/dashboard/activity/`                                        | Pagina fluxului de activitate (Grupul B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — consultați `docs/architecture/MONITORING_SECTIONS.md`                                                                                                    |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Pagina de partajare a cotelor (Grupul B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pagina de configurare a planului furnizorului (Grupul B): `page.tsx` + `ProviderPlanConfigClient.tsx` — suprascrierea dimensiunilor cotelor pentru fiecare conexiune                                                                                                                                                         |
| `app/docs/`                                                                  | Vizualizator de documentație încorporat (redă `docs/*.md`)                                                                                                                                                                                                                                                                   |
| `app/landing/`                                                               | Pagină de destinație pentru marketing                                                                                                                                                                                                                                                                                        |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Pagini asociate autentificării                                                                                                                                                                                                                                                                                               |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Pagini de eroare HTTP                                                                                                                                                                                                                                                                                                        |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Pagini statice/de stare                                                                                                                                                                                                                                                                                                      |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Aspect rădăcină, pagina principală, manifest PWA, CSS global                                                                                                                                                                                                                                                                 |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limite de eroare                                                                                                                                                                                                                                                                                                             |

### `src/lib/` — Biblioteci de bază (~50 de module)

| Modul                                    | Scop                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Manager de sarcini pentru protocolul A2A, abilități (5), streaming                                                                                                                                                                                                                                                                      |
| `acp/`                                   | Registru de agenți CLI (descoperire CLI locală — consultați `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                 |
| `api/`                                   | Utilitare API comune (`requireManagementAuth`, validare)                                                                                                                                                                                                                                                                                |
| `auth/`                                  | Sesiuni, hashing al parolelor, validarea tokenurilor                                                                                                                                                                                                                                                                                    |
| `batches/`                               | Handlere pentru API-ul OpenAI Batches                                                                                                                                                                                                                                                                                                   |
| `catalog/`                               | Validare Zod pentru catalogul de furnizori + rezolvarea capabilităților                                                                                                                                                                                                                                                                 |
| `cloudAgent/`                            | Agenți cloud (Codex Cloud, Devin, Jules) — consultați `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                  |
| `combos/`                                | Utilitare pentru rezolvarea și reordonarea combinațiilor                                                                                                                                                                                                                                                                                |
| `audit/`                                 | Utilitare pentru fluxul de activitate: `highLevelActions.ts` (listă de permisiuni + `isHighLevelAction()`), `activityIcons.ts` (mapare acțiune → pictogramă/verb), `timeline.ts` (groupByDay/relativeTime) — consultați `docs/architecture/MONITORING_SECTIONS.md`                                                                      |
| `compliance/`                            | Jurnal de audit + auditarea furnizorilor — consultați `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                     |
| `compression/`                           | Cod de integrare pentru motorul de compresie (motoarele se află în `open-sse/services/compression/`)                                                                                                                                                                                                                                    |
| `config/`                                | Utilitare pentru configurarea la momentul execuției                                                                                                                                                                                                                                                                                     |
| `db/`                                    | Peste 120 de module DB de domeniu + 168 de migrări (pentru SQLite, operați întotdeauna prin acestea)                                                                                                                                                                                                                                    |
| `quota/`                                 | Motor de partajare a cotelor: `dimensions.ts` (tipuri/Zod), `types.ts` (interfața QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — consultați `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Client pentru catalogul de modele gratuite Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consultați `docs/frameworks/RADAR.md`                                                                                                                                    |
| `display/`                               | Funcții auxiliare pentru formatarea interfeței cu utilizatorul (cost, latență etc.)                                                                                                                                                                                                                                                     |
| `embeddings/`                            | Funcții auxiliare pentru serviciul de înglobări                                                                                                                                                                                                                                                                                         |
| `env/`                                   | Parsarea și validarea variabilelor de mediu                                                                                                                                                                                                                                                                                             |
| `evals/`                                 | Cadru de evaluare (suite, executor, mediu de execuție) — consultați `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                          |
| `guardrails/`                            | Mascare PII, protecție împotriva injectării de prompturi, punte pentru procesarea imaginilor — consultați `docs/security/GUARDRAILS.md`                                                                                                                                                                                                 |
| `jobs/`                                  | Sarcini în fundal (similare cron)                                                                                                                                                                                                                                                                                                       |
| `memory/`                                | Memorie conversațională (RRF hibrid SQLite FTS5 + sqlite-vec și Qdrant de nivelul 2) — consultați `docs/frameworks/MEMORY.md`                                                                                                                                                                                                           |
| `memory/embedding/`                      | Strat de înglobare cu surse multiple: `index.ts` (rezolvitor), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (planul 21)                                                                                                                                                                               |
| `memory/vectorStore.ts`                  | Înveliș pentru sqlite-vec v0.1.9 — KNN prin forță brută + RRF hibrid (FTS5 + vector, k=60). Inițializare întârziată, cu degradare controlată când sqlite-vec nu este disponibil. (planul 21)                                                                                                                                            |
| `memory/reindex.ts`                      | `runReindexBatch()` — procesează în fundal memoriile cu `needs_reindex=1`; apelată de `POST /api/memory/reindex` și de calea de completare întârziată. (planul 21)                                                                                                                                                                      |
| `monitoring/`                            | Verificări de stare, emiterea metricilor                                                                                                                                                                                                                                                                                                |
| `oauth/`                                 | Fluxuri OAuth/de import pentru 22 de module de furnizori (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                    |
| `plugins/`                               | Registru de pluginuri                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Puncte de întrerupere ale cache-ului de prompturi în stil Anthropic                                                                                                                                                                                                                                                                     |
| `skills/`                                | Cadru pentru abilități (încorporate + marketplace + SkillsSH) — consultați `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                            | Utilitare partajate pentru Playground Studio: `codeExport.ts` (generator curl/Python/TS), `promptImprover.ts` (constructor de meta-prompturi), `streamMetrics.ts` (TTFT/TPS pur), `types.ts` (tabel de prețuri) — consultați `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                     |
| `webhookDispatcher.ts`                   | Livrare de webhook-uri cu HMAC — consultați `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Manageri de tuneluri — consultați `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                           |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronizare opțională a stării cu cloudul                                                                                                                                                                                                                                                                                              |
| `localDb.ts`                             | Modul central de reexportare pentru modulele bazei de date (fără logică — doar reexportări)                                                                                                                                                                                                                                             |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Memorarea în cache a solicitărilor + idempotentă                                                                                                                                                                                                                                                                                        |
| (~30 more top-level files)               | Utilitare specializate (logEnv, modelsDevSync, piiSanitizer etc.)                                                                                                                                                                                                                                                                       |

### `src/lib/db/` — Bază de date (122 de module + 168 de migrări)

| Subdir                    | Scop                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Instanță singleton `getDbInstance()` cu jurnalizare WAL                                                                                                                                  |
| `db/migrations/`          | Fișiere SQL versionate (idempotente, tranzacționale). `073_memory_vec.sql` adaugă coloanele `memory_vec_meta` + `needs_reindex` (planul 21).                                             |
| `db/playgroundPresets.ts` | Modul CRUD pentru presetările Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)           |
| `db/memoryVec.ts`         | CRUD pentru `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` etc. (planul 21)                          |
| `db/<domain>.ts`          | Câte un modul pentru fiecare domeniu: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache etc. |

### `src/domain/`

| Modul                  | Scop                                                          |
| ---------------------- | ------------------------------------------------------------- |
| `policy.ts`            | Motor de politici                                             |
| `fallbackPolicy.ts`    | Arbore decizional pentru soluții de rezervă                   |
| `costRules.ts`         | Reguli de calculare a costurilor                              |
| `lockoutPolicy.ts`     | Politică de blocare a modelelor/conexiunilor                  |
| `tagRouter.ts`         | Rutare bazată pe etichete                                     |
| `comboResolver.ts`     | Rezolvarea combinațiilor (utilizată de motorul de combinații) |
| `modelAvailability.ts` | Verificarea disponibilității pentru fiecare model             |
| `assessment/`          | Evaluarea modelelor (faza 1 din RFC-AUTO-ASSESSMENT)          |

### `src/server/`

| Modul    | Scop                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `authz/` | Flux de autorizare: `classify` → `policies` → `enforce` — consultați `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configurare CORS                                                                                        |
| `auth/`  | Middleware pentru sesiuni                                                                               |

### `src/shared/`

| Modul                            | Scop                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 de furnizori** cu validare Zod (sursa adevărului)                                       |
| `constants/cliTools.ts`          | Registrul instrumentelor CLI externe                                                          |
| `constants/routingStrategies.ts` | **19 strategii de rutare** cu priorități                                                      |
| `constants/publicApiRoutes.ts`   | Rute care necesită autentificare Bearer (în locul autentificării de administrare)             |
| `constants/upstreamHeaders.ts`   | Lista de antete interzise pentru cererile upstream                                            |
| `validation/schemas.ts`          | ~80 de scheme Zod (sursa unică a adevărului pentru contractele API)                           |
| `validation/helpers.ts`          | Funcții auxiliare pentru validarea Zod (`validateBody` etc.)                                  |
| `types/`                         | Tipuri TS partajate                                                                           |
| `contracts/`                     | Contracte API publice (utilizate de `files:` în `package.json`)                               |
| `utils/circuitBreaker.ts`        | Întrerupător de circuit pentru furnizori (consultați `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Validarea cheilor API și verificarea domeniilor de acces                                      |
| `utils/fetchTimeout.ts`          | Funcții wrapper pentru expirarea/anularea solicitărilor fetch upstream                        |
| `utils/releaseNotes.ts`          | Parser pentru anunțuri v2/legacy închise, localizare și închiderea după ID                    |

---

## `open-sse/` — Spațiul de lucru al motorului de streaming

Spațiu de lucru npm separat (`@omniroute/open-sse`). Gestionează procesarea cererilor și execuția furnizorilor.

```
open-sse/
├── handlers/            # 16 fișiere (12 gestionari + 4 funcții auxiliare): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search etc.
├── executors/           # 67 de executori specifici furnizorilor (extind BaseExecutor)
├── translator/          # Convertoare de format (9 pentru cereri, 9 pentru răspunsuri, 9 funcții auxiliare)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ module de servicii (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM etc.)
├── mcp-server/          # Server MCP (110 instrumente, 3 transporturi, 33 de domenii)
├── config/              # Registre de furnizori/modele, configurarea anteturilor, aliasuri de modele
├── utils/               # Client TLS, fetch/dispecer proxy, funcții auxiliare de rețea
├── index.ts             # Punct de intrare al spațiului de lucru
├── package.json         # Manifestul spațiului de lucru
├── tsconfig.json        # Configurația TS a spațiului de lucru
└── types.d.ts           # Declarațiile de tipuri ale spațiului de lucru
```

### `open-sse/mcp-server/`

| Cale                        | Scop                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `server.ts`                 | Ciclul de viață al serverului MCP (transporturi stdio + HTTP)                                  |
| `httpTransport.ts`          | Transporturi HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                         |
| `audit.ts`                  | Jurnalizare de audit în tabelul `mcp_tool_audit`                                               |
| `scopeEnforcement.ts`       | Validarea domeniului pentru fiecare instrument                                                 |
| `runtimeHeartbeat.ts`       | Semnal periodic de stare către `DATA_DIR/runtime/mcp-heartbeat.json`                           |
| `descriptionCompressor.ts`  | Comprimă metadatele descrierilor instrumentelor pentru a economisi context                     |
| `schemas/tools.ts`          | 36 de definiții de bază ale instrumentelor + domenii                                           |
| `tools/advancedTools.ts`    | Implementări avansate ale instrumentelor                                                       |
| `tools/memoryTools.ts`      | 3 instrumente de memorie (căutare/adăugare/ștergere)                                           |
| `tools/skillTools.ts`       | 4 instrumente pentru abilități (listare/activare/executare/execuții)                           |
| `tools/compressionTools.ts` | 5 instrumente de compresie                                                                     |
| `README.md`                 | README intern al serverului MCP (cu referință încrucișată din `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Wrapper pentru desktop

| Fișier           | Scop                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `main.js`        | Procesul principal Electron (BrowserWindow, server Next.js încorporat, tavă de sistem, actualizare automată) |
| `preload.js`     | Punte IPC (contextBridge → `window.omniroute`)                                                               |
| `package.json`   | Configurația electron-builder + dependențele Electron 41 + electron-builder 26.10                            |
| `assets/`        | Pictogramele aplicației (Windows .ico, macOS .icns, Linux .png)                                              |
| `dist-electron/` | Rezultatul compilării (ignorat de git)                                                                       |
| `types.d.ts`     | Declarații de tipuri pentru puntea rendererului                                                              |
| `README.md`      | README intern pentru Electron (consultați și `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| Fișier                                                                                                      | Scop                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Punctul principal de intrare CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` etc. |
| `reset-password.mjs`                                                                                        | CLI independent pentru resetarea parolei                                                                                                    |
| `cli/commands/setup.mjs`                                                                                    | Expert de configurare interactiv și neinteractiv                                                                                            |
| `cli/commands/doctor.mjs`                                                                                   | Diagnosticarea stării sistemului (peste 8 verificări)                                                                                       |
| `cli/commands/providers.mjs`                                                                                | Listarea/testarea/validarea furnizorilor                                                                                                    |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Module auxiliare CLI                                                                                                                        |
| `cli/tray/tray.ts`                                                                                          | Integrare în zona de notificare a sistemului (multiplatformă: NotifyIcon pe Windows, systray2 pe macOS/Linux)                               |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, fără binare noi)                                                                                    |
| `cli/tray/autostart.ts`                                                                                     | Pornire automată multiplatformă (LaunchAgent / .desktop / registry)                                                                         |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Lanț în 5 pași pentru rezolvarea driverului SQLite (inclus → runtime → instalare întârziată → node:sqlite → sql.js)                         |
| `cli/runtime/magicBytes.mjs`                                                                                | Validarea octeților magici ai fișierelor binare (ELF / Mach-O / Mach-O fat / PE)                                                            |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — rezolvă în prealabil driverele la postinstall / prima pornire                                                          |
| `nodeRuntimeSupport.mjs`                                                                                    | Validează versiunea Node.js acceptată la instalare                                                                                          |

---

## `skills/` — Abilități publice pentru agenți

| Fișier                       | Scop                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifeste de abilități pentru agenți AI externi (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripturi de compilare și verificare

| Script                              | Scop                                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Rulare pentru dezvoltare/pornire cu încărcarea variabilelor de mediu                               |
| `build-next-isolated.mjs`           | Compilare autonomă (modul autonom Next.js 16)                                                      |
| `prepublish.ts`                     | Pregătirea pachetului înainte de `npm pack`                                                        |
| `postinstall.mjs`                   | Creează automat `.env` din `.env.example` la prima instalare                                       |
| `sync-env.mjs`                      | Resincronizează cheile din `.env` cu `.env.example`                                                |
| `check-cycles.mjs`                  | Detectează dependențele circulare                                                                  |
| `check-route-validation.mjs`        | Validează că toate rutele API folosesc validarea Zod                                               |
| `check-t11-any-budget.mjs`          | Impune o limită explicită pentru `any` per fișier                                                  |
| `check-docs-sync.mjs`               | Validează sincronizarea versiunilor din documentație (pre-commit existent)                         |
| **`check-env-doc-sync.mjs`**        | NOU: verifică încrucișat variabilele de mediu din cod, `.env.example` și `ENVIRONMENT.md`          |
| **`check-docs-counts-sync.mjs`**    | NOU: validează că numărul de executori, strategii, OAuth și abilități A2A corespunde documentației |
| **`check-deprecated-versions.mjs`** | NOU: semnalează versiunile/datele învechite din documentație                                       |
| `check-supported-node-runtime.ts`   | Validează că versiunea curentă de Node este acceptată                                              |
| `check-pr-test-policy.mjs`          | Impune regula „teste obligatorii” pentru modificările aduse codului de producție                   |
| **`gen-provider-reference.ts`**     | NOU: generează automat `docs/reference/PROVIDER_REFERENCE.md` din catalog                          |
| `i18n/generate-multilang.mjs`       | Traduce șirurile interfeței și documentația prin Google Translate                                  |
| `i18n_autotranslate.py`             | Flux de traducere a documentației bazat pe LLM                                                     |
| `validate_translation.py`           | Validarea traducerii pentru fiecare localizare                                                     |
| `check_translations.py`             | Verificarea cheilor i18n din cod                                                                   |
| `run-playwright-tests.mjs`          | Rulare a testelor E2E Playwright                                                                   |
| `run-protocol-clients-tests.mjs`    | Rulare a testelor E2E MCP/A2A                                                                      |
| `run-ecosystem-tests.mjs`           | Teste de ecosistem (integrarea furnizorilor)                                                       |
| `test-report-summary.mjs`           | Generează un rezumat Markdown al acoperirii                                                        |
| `smoke-electron-packaged.mjs`       | Test rapid al compilării Electron împachetate                                                      |
| `native-binary-compat.mjs`          | Validează că dependențele native (`better-sqlite3`) corespund versiunii Node din Electron          |
| `validate-pack-artifact.ts`         | Validează rezultatul împachetării npm                                                              |
| `responses-ws-proxy.mjs`            | Punte WebSocket pentru API-ul Codex Responses                                                      |
| `v1-ws-bridge.mjs`                  | Punte WebSocket pentru endpoint-ul `/api/v1/ws`                                                    |
| `standalone-server-ws.mjs`          | Rulare autonomă a serverului WS                                                                    |
| `system-info.mjs`                   | Afișează informații despre sistem/mediul de execuție pentru asistență                              |
| `healthcheck.mjs`                   | Verificare unică a stării de funcționare (utilizată de Docker HEALTHCHECK)                         |
| `uninstall.mjs`                     | Script de dezinstalare completă                                                                    |

---

## `docs/` — Documentație publică (7 fișiere rădăcină + 17 subdirectoare)

### Ghiduri principale

| Document                    | Scop                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arhitectură de nivel înalt, hartă a subsistemelor, suprafața panoului de control               |
| `CODEBASE_DOCUMENTATION.md` | Referință tehnică: directoare, module, convenții                                               |
| `FEATURES.md`               | Matrice de funcționalități cu noutățile v3.8                                                   |
| `USER_GUIDE.md`             | Manual pentru utilizatorii finali (configurare, modele, combinații, CLI-uri, audio etc.)       |
| `API_REFERENCE.md`          | Referință pentru endpoint-urile API, inclusiv modelul de autentificare                         |
| `openapi.yaml`              | Specificație OpenAPI 3.0 (121 de căi)                                                          |
| `SETUP_GUIDE.md`            | Metode de instalare (npm, npx, Docker, Electron, Termux, din sursă)                            |
| `ENVIRONMENT.md`            | Toate variabilele de mediu (~800 documentate, ~3.050 de linii în `.env.example`)               |
| `TROUBLESHOOTING.md`        | Erori frecvente + probleme cunoscute în v3.8.0                                                 |
| `RELEASE_CHECKLIST.md`      | Flux complet de lansare (abilități, husky, commituri convenționale, implementare)              |
| `COVERAGE_PLAN.md`          | Obiectivele privind acoperirea și starea actuală                                               |
| `FREE_TIERS.md`             | Furnizori selectați cu nivel gratuit (peste 48 gratuiți + 11 OAuth)                            |
| `CLI-TOOLS.md`              | Integrări CLI externe + CLI-ul intern OmniRoute                                                |
| `I18N.md`                   | Arhitectura i18n, adăugarea unei limbi, 42 de localizări                                       |
| `UNINSTALL.md`              | Pași pentru o dezinstalare completă                                                            |
| `PROVIDER_REFERENCE.md`     | Catalog **generat automat** cu 355 de furnizori (regenerare: `npm run gen:provider-reference`) |

### Analize detaliate ale subsistemelor

| Document                                    | Scop                                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | Server MCP: 110 instrumente, 3 transporturi, 33 de domenii, endpoint-uri REST                |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 abilități, utilitare REST, fișa agentului                              |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Ghid unificat: A2A vs. ACP vs. agenți cloud                                                  |
| `CLOUD_AGENT.md`                            | Orchestrarea Codex Cloud / Devin / Jules                                                     |
| `SKILLS.md`                                 | Cadru pentru abilități (încorporate + marketplace + SkillsSH + sandbox)                      |
| `RADAR.md`                                  | Suprapunere peste catalogul Radar de modele gratuite (`RADAR_ENABLED`, dezactivată implicit) |
| `MEMORY.md`                                 | Sistem de memorie (SQLite FTS5 + Qdrant)                                                     |
| `EVALS.md`                                  | Cadru de evaluare (suite, rulări, grile de evaluare)                                         |
| `GUARDRAILS.md`                             | Mascarea PII, injectarea de prompturi, punte pentru procesare vizuală                        |
| `COMPLIANCE.md`                             | Jurnal de audit, păstrare, dezactivare prin noLog                                            |
| `WEBHOOKS.md`                               | Livrarea webhook-urilor semnate cu HMAC                                                      |
| `REASONING_REPLAY.md`                       | Cache hibrid în memorie/SQLite pentru `reasoning_content`                                    |
| `AUTHZ_GUIDE.md`                            | Flux de autorizare (`classify` → `policies` → `enforce`)                                     |
| `RESILIENCE_GUIDE.md`                       | Întrerupător de circuit + perioadă de așteptare + blocarea modelului                         |
| `docs/security/STEALTH_GUIDE.md` (doar git) | Amprentare TLS (JA3/JA4), Claude Code CCH, certificat MITM                                   |
| `AUTO-COMBO.md`                             | Motorul Auto Combo (scor bazat pe 16 factori, 6 pachete de moduri, fabrică virtuală)         |

### Comprimare

| Document                        | Scop                                                             |
| ------------------------------- | ---------------------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Prezentare generală a modurilor de comprimare + foaie de parcurs |
| `COMPRESSION_ENGINES.md`        | Motoarele Caveman + RTK, contractul registrului                  |
| `COMPRESSION_RULES_FORMAT.md`   | Schema JSON a pachetului de reguli Caveman                       |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventarul pachetelor de reguli pentru fiecare limbă             |
| `RTK_COMPRESSION.md`            | Flux declarativ RTK (49 de filtre)                               |

### Implementare

| Document                     | Scop                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Compilare Docker, profiluri (base/cli/host/cliproxyapi), serviciu auxiliar Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Implementare generică pe VM/VPS (Ubuntu/Debian + nginx + systemd)                |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implementare pe Fly.io (momentan disponibilă doar în chineză)                    |
| `TERMUX_GUIDE.md`            | Android fără interfață grafică prin Termux                                       |
| `PWA_GUIDE.md`               | Instalarea aplicației web progresive + service worker                            |
| `ELECTRON_GUIDE.md`          | Compilarea + semnarea + distribuirea aplicației desktop                          |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                           |
| `PROXY_GUIDE.md`             | Proxy de ieșire pe 4 niveluri + marketplace-ul 1proxy                            |

### Subdirectoare

| Subdirector           | Scop                                                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | Traduceri localizate ale documentației (41 de limbi)                                                                                                                                                                                       |
| `docs/screenshots/`   | Resurse de imagine pentru ghiduri                                                                                                                                                                                                          |
| `_tasks/superpowers/` | Planuri/specificații din superpowers (`writing-plans`/`brainstorming`) + cercetare — depozit izolat, cu versiuni gestionate separat, ignorat de git în arborele principal. Consultați CLAUDE.md → „Artefacte de planificare și cercetare”. |

---

## `tests/` — Suite de teste

| Subdirector                          | Tip                                                | Executor                                      |
| ------------------------------------ | -------------------------------------------------- | --------------------------------------------- |
| `tests/unit/`                        | Teste unitare (~4.800 de fișiere, cele mai rapide) | Executorul nativ de teste Node                |
| `tests/integration/`                 | Teste de integrare cu module multiple + DB         | Executorul nativ de teste Node (concurență 1) |
| `tests/e2e/`                         | E2E pentru UI + fluxuri de lucru                   | Playwright                                    |
| `tests/e2e/protocol-clients.test.ts` | E2E cu clienți reali MCP + A2A                     | Clienți de protocol personalizați             |
| `tests/e2e/ecosystem.test.ts`        | Integrarea furnizorilor (cu acces la rețea)        | Executorul nativ de teste Node                |

---

## `public/` — Resurse statice

| Cale                 | Scop                                                                  |
| -------------------- | --------------------------------------------------------------------- |
| `public/` (rădăcină) | Favicoane, robots.txt, manifest, service worker, imagini de marketing |
| `public/providers/`  | Sigle PNG/SVG ale furnizorilor (utilizate în panoul de control)       |

---

## `config/` — Configurații statice + starea pragurilor de calitate

Șabloane de configurare distribuite, împreună cu valorile de referință salvate pentru pragurile de calitate
(mutate aici din rădăcina depozitului în v3.8.26 pentru a menține rădăcina aerisită).

| Cale                                          | Scop                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Lista limbilor regionale + metadate (sursa canonică pentru numărul de 42 de limbi regionale)           |
| `config/i18n-schema.json`                     | Schema JSON care validează `i18n.json`                                                                 |
| `config/payloadRules.json`                    | Reguli de igienizare a sarcinilor utile din amonte                                                     |
| `config/quality/quality-baseline.json`        | Valoare de referință progresivă pentru mai multe metrici (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Valoare de referință fixă pentru complexitatea ESLint (`check-complexity.mjs`)                         |
| `config/quality/duplication-baseline.json`    | Valoare de referință fixă pentru duplicarea jscpd (`check-duplication.mjs`)                            |
| `config/quality/file-size-baseline.json`      | Valoare de referință fixă pentru dimensiunea fiecărui fișier (`check-file-size.mjs`)                   |
| `config/quality/test-discovery-baseline.json` | Valoare de referință fixă pentru testele orfane (`check-test-discovery.mjs`)                           |
| `config/quality/dependency-allowlist.json`    | Lista dependențelor aprobate (`check-deps.mjs`)                                                        |
| `config/quality/.license-allowlist.json`      | Lista licențelor SPDX permise (`check-licenses.mjs`)                                                   |
| `config/quality/quality-metrics.json`         | Metrici efemere colectate (generate de `collect-metrics.mjs`; **ignorate de git**)                     |

---

## `.github/` — Integrare GitHub

| Cale                               | Scop                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| `.github/workflows/`               | Fluxuri de lucru GitHub Actions pentru CI/CD (lint, testare, acoperire, lansare) |
| `.github/ISSUE_TEMPLATE/`          | Șabloane de probleme pentru erori/funcționalități                                |
| `.github/pull_request_template.md` | Șablon pentru PR                                                                 |
| `.github/dependabot.yml`           | Configurația actualizării dependențelor                                          |

---

## `.husky/` — Hook-uri Git

| Fișier       | Scop                                                               |
| ------------ | ------------------------------------------------------------------ |
| `pre-commit` | Rulează `lint-staged + check-docs-sync + check:any-budget:t11`     |
| `pre-push`   | Dezactivat momentan (comentat). Rulați manual `npm run test:unit`. |
| `_/`         | Componente interne Husky                                           |

---

## `.claude/` — Comenzi slash Claude Code

| Fișier                                              | Scop                                                                        |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementarea versiunii + jurnal automat de modificări |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — flux complet de lansare                            |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementare pe VPS                                                         |
| `commands/capture-release-evidences-cc.md`          | Înregistrarea în browser a noilor funcționalități ca WebP                   |
| `commands/review-{prs,discussions}-cc.md`           | Trierea PR-urilor/discuțiilor GitHub                                        |
| `commands/{review-issues,implement-features}-cc.md` | Fluxuri de lucru pentru probleme                                            |
| `settings.local.json`                               | Setări Claude Code specifice proiectului                                    |

---

## `.agents/` — Fluxuri de lucru generice pentru agenți (Codex / Cursor / etc.)

| Cale                     | Scop                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definiții de fluxuri de lucru (oglindă a `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definiții de abilități cu note de execuție pentru Codex        |

> **Notă:** Fluxurile de lucru și comenzile sunt momentan identice octet cu octet. Dacă `.agents/` este destinat unui mediu de execuție diferit pentru agenți (Codex), variantele trebuie să difere în mod semnificativ.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — În afara arborelui

Aceste directoare cu prefix de subliniere conțin materiale care nu sunt distribuite:

- **`_ideia/`** — note de proiectare (categorii defer / notfit / viable)
- **`_mono_repo/`** — subproiecte istorice (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clone numai pentru citire ale proiectelor OSS conexe (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api etc.), pentru referințe încrucișate în timpul dezvoltării
- **`_tasks/`** — fișiere de urmărire a sarcinilor pentru fiecare lansare (informale)

Nu sunt incluse în rezultatul `npm pack`. Consultați `.npmignore`.

---

## Generate / Ignorate de Git

| Cale                   | Scop                             |
| ---------------------- | -------------------------------- |
| `node_modules/`        | Dependențe npm                   |
| `.next/`               | Rezultatul compilării Next.js    |
| `coverage/`            | Rapoarte de acoperire c8         |
| `logs/`                | Jurnale de execuție              |
| `package/`             | Pregătire pentru npm pack        |
| `.playwright-mcp/`     | Artefacte de test Playwright MCP |
| `.issues/`             | Cache local pentru probleme      |
| `tsconfig.tsbuildinfo` | Cache incremental TS             |

---

## Sfaturi de navigare

- **Contribuitor nou?** Citiți `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Adăugați un furnizor?** Urmați `docs/architecture/ARCHITECTURE.md § Adding a New Provider` și verificați informațiile în raport cu `docs/reference/PROVIDER_REFERENCE.md`.
- **Adăugați o rută?** Consultați `docs/architecture/ARCHITECTURE.md § Adding a New API Route` și `src/shared/validation/schemas.ts`.
- **Adăugați un instrument MCP?** Consultați `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Adăugați o abilitate A2A?** Consultați `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Rulați local?** Consultați `docs/guides/SETUP_GUIDE.md`.
- **Implementați?** Consultați `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Publicați o versiune?** Consultați `docs/ops/RELEASE_CHECKLIST.md` (și abilitatea Claude Code `/generate-release-cc`).
