# Repository Map (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

# Mapa repozitorija

> **Opis u jednoj liniji za svaki direktorij i korijensku datoteku.**
> Posljednje ažurirano: 2026-06-28 — OmniRoute v3.8.40
>
> Koristite ovu mapu za brzo snalaženje u bazi koda. Za detaljnije informacije, pratite linkove do namjenske dokumentacije.

## Stablo najvišeg nivoa

```
OmniRoute/
├── src/                  # Next.js 16 aplikacija (UI + API rute + biblioteke + domen + server)
├── open-sse/             # Radni prostor mehanizma za strimovanje (handler-i, izvršioci, prevodilac, MCP server)
├── electron/             # Desktop wrapper (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI ulazna tačka i handler-i komandi
├── scripts/              # Skripte za build, provjeru, sinhronizaciju i jednokratne zadatke
├── docs/                 # Javna dokumentacija (nalazite se ovdje)
├── tests/                # Svi testni paketi (jedinični, integracijski, e2e, klijenti protokola)
├── public/               # Next.js statički resursi, PWA manifest, service worker, ikone
├── config/               # Statička konfiguracija + stanje quality-gate-a (i18n, payloadRules, quality/)
├── images/               # Marketinški / README slikovni resursi
├── @omniroute/           # Prateći paketi koji se mogu objaviti (opencode-plugin, opencode-provider)
├── skills/               # CLI/agent paketi vještina (cli-* + omni-* + config-codex-cli)
├── examples/             # Primjeri dodataka + omniroute-cmd-hello starter
├── contrib/              # Doprinosi zajednice (podman/)
├── .source/              # Fumadocs izvorna konfiguracija (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions radni tokovi + šabloni za issue-e + šablon za PR
├── .husky/               # Git hook-ovi (pre-commit, pre-push)
├── .claude/              # Claude Code slash komande (u okviru projekta)
├── .agents/              # Codex / generički radni tokovi agenata + vještine (zrcalna kopija .claude/)
├── .vscode/              # Postavke VS Code radnog prostora
├── _ideia/               # Bilješke o planiranju (neformalno; ne isporučuje se)
├── _mono_repo/           # Historijski podprojekti (cloud, site, vscode-extension)
├── _references/          # Reference klonovi samo za čitanje iz povezanih OSS projekata
├── _tasks/               # Datoteke za praćenje zadataka po izdanju (neformalno)
├── .build/ .worktrees/ dist/   # lokalni build / git-worktree / build-output scratch (gitignored)
├── .issues/              # Lokalni keš issue-a (gitignored)
├── .playwright-mcp/      # Playwright MCP test artefakti
├── coverage/             # c8 izlaz pokrivenosti (gitignored)
├── logs/                 # Runtime logovi (gitignored)
├── node_modules/         # Zavisnosti (gitignored)
├── package/              # npm pack staging područje (build artefakt)
├── .next/                # Next.js build izlaz (gitignored)
└── (korijenske datoteke — vidi ispod)
```

---

## Korijenske datoteke

| Datoteka                                    | Namjena                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketing odredišna stranica + brzi početak + matrica funkcija (pogledajte i `llm.txt`)      |
| **CHANGELOG.md**                            | Dnevnik promjena po izdanju (automatski generisan pomoću `/version-bump-cc` vještine)        |
| **LICENSE**                                 | Tekst MIT licence                                                                            |
| **CLAUDE.md**                               | Projektna pravila za Claude Code agente (stroga pravila, konvencije, scenariji)              |
| **AGENTS.md**                               | Isto kao CLAUDE.md, ali za AI agente koji nisu Claude (Codex, Cursor, itd.)                  |
| **GEMINI.md**                               | Sažeta pravila za agente zasnovane na Gemini-u (podskup CLAUDE.md)                           |
| **CONTRIBUTING.md**                         | Vodič za saradnike: podešavanje, konvencionalni commit-ovi, testiranje, PR tok               |
| **SECURITY.md**                             | Politika prijavljivanja ranjivosti, podržane verzije, model prijetnji                        |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — očekivanja ponašanja u zajednici                                      |
| **llm.txt**                                 | Obična tekstualna odredišna stranica optimizovana za LLM pretraživače (SEO za AI asistente)  |
| **package.json**                            | npm manifest, skripte, zavisnosti, mašine (engines), c8 prag pokrivenosti                    |
| **package-lock.json**                       | Zaključano stablo zavisnosti                                                                 |
| **tsconfig.json**                           | Korijenska TypeScript konfiguracija                                                          |
| **tsconfig.typecheck-core.json**            | Konfiguracija provjere tipova za `src/` jezgro                                               |
| **tsconfig.typecheck-noimplicit-core.json** | Stroga (`noImplicitAny`) provjera tipova                                                     |
| **tsconfig.tsbuildinfo**                    | TS keš inkrementalne izgradnje (gitignored)                                                  |
| **next.config.mjs**                         | Next.js 16 konfiguracija izgradnje (samostalni izlaz)                                        |
| **next-env.d.ts**                           | Next.js automatski generisani env tipovi                                                     |
| **eslint.config.mjs**                       | ESLint flat konfiguracija (pravila po području projekta)                                     |
| **prettier.config.mjs**                     | Prettier pravila formatiranja                                                                |
| **postcss.config.mjs**                      | PostCSS konfiguracija za Tailwind/CSS cjevovod                                               |
| **playwright.config.ts**                    | Playwright E2E konfiguracija testova                                                         |
| **vitest.config.ts**                        | Vitest konfiguracija (podrazumijevani paket)                                                 |
| **vitest.mcp.config.ts**                    | Vitest konfiguracija za MCP server / autoCombo / keš pakete                                  |
| **sonar-project.properties**                | SonarQube/SonarCloud konfiguracija (kvalitet koda)                                           |
| **Dockerfile**                              | Višestepena Docker izgradnja (builder → runner-base → runner-cli)                            |
| **docker-compose.yml**                      | Dev compose sa 4 profila (base, cli, host, cliproxyapi) + redis sidecar                      |
| **docker-compose.prod.yml**                 | Produkcijski compose (port 20130, redis, imenovani volumeni)                                 |
| **.dockerignore**                           | Datoteke isključene iz Docker konteksta                                                      |
| **fly.toml**                                | Fly.io konfiguracija raspoređivanja (region `sin`, port 20128, `/data` volumen)              |
| **.env.example**                            | Šablon env datoteke (automatski se kopira u `.env` pri prvoj instalaciji)                    |
| **.gitignore**                              | Git ignore obrasci                                                                           |
| **.npmignore**                              | npm publish lista isključenja                                                                |
| **.npmrc**                                  | npm konfiguracija (registar, politika lockfile-a)                                            |
| **.node-version**                           | Fiksirana verzija Node-a (koriste je alati kompatibilni sa nvm)                              |
| **.nvmrc**                                  | Fiksirana verzija Node-a za nvm                                                              |
| **eslint.complexity.config.mjs**            | ESLint konfiguracija za mehanizam složenosti (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint konfiguracija za SonarJS pravila (kognitivna složenost / duplikacija)                 |
| **source.config.ts**                        | Fumadocs `defineDocs` izvorna konfiguracija (napaja `.source/`)                              |
| **knip.json**                               | Knip konfiguracija — neiskorištene datoteke/export-i/zavisnosti (napaja kapiju za mrtvi kod) |
| **stryker.conf.json**                       | Stryker konfiguracija za mutaciono testiranje                                                |
| **.size-limit.json**                        | size-limit konfiguracija budžeta paketa                                                      |
| **promptfooconfig.yaml**                    | promptfoo konfiguracija evaluacije                                                           |
| **.gitleaks.toml**                          | gitleaks skup pravila za skeniranje tajni                                                    |
| **.zizmor.yml**                             | zizmor GitHub-Actions konfiguracija za sigurnosno lintiranje                                 |
| **socket.yml**                              | Socket.dev konfiguracija lanca snabdijevanja                                                 |
| **news.json**                               | Lokalizovani feed obavještenja v2; stavka za pokretanje Radar-a se isporučuje neaktivna      |
| **flake.nix** / **flake.lock**              | Nix dev-shell definicija + lock                                                              |
| **.env**                                    | Lokalne tajne (gitignored — generisano iz `.env.example`)                                    |

> **Premješteno iz korijenskog direktorija u v3.8.26 (radi preglednosti):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json`, i generisani `quality-metrics.json` (ignorisano u git-u). Pogledajte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js aplikacija

```
src/
├── app/                 # App Router (stranice + API rute + statusne stranice + odredišna stranica)
├── lib/                 # Osnovne biblioteke / domenski moduli (80 poddirektorija + ~70 datoteka na najvišem nivou)
├── domain/              # Čista domenska logika (mehanizam politika, fallback, trošak, zaključavanje, comboResolver, procjena)
├── server/              # Moduli samo za server (authz pipeline, cors, auth middleware) — ne mogu se uvoziti iz klijenta
├── shared/              # Dijeljeno između servera i klijenta gdje je sigurno (konstante, tipovi, validacija, ugovori, utils)
├── i18n/                # next-intl konfiguracija + JSON poruke po lokalitetu (42 lokaliteta)
├── middleware/          # Next.js middleware (obogaćivanje zahtjeva, detekcija lokaliteta)
├── mitm/                # MITM proxy jezgro: generisanje/instalacija certifikata, rukovaoci, ciljevi, inspektor, maske, passthrough
│   ├── handlers/        # 9 klasa rukovaoca IDE-agentima koje proširuju MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Sloj za hvatanje saobraćaja: bafer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Ljepilo za adapter modela (legacy shim)
├── scripts/             # Skripte za održavanje unutar stabla (npr. backfillAggregation)
├── sse/                 # Naslijeđeni SSE rukovaoci/servisi (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Naslijeđeno in-memory skladište (postepeno se ukida u korist src/lib/db)
├── types/               # Dijeljene TS datoteke tipova
├── instrumentation.ts   # Next.js telemetrijski hook (browser + edge)
├── instrumentation-node.ts  # Instrumentacija samo za Node
└── proxy.ts             # HTTP-proxy ulazni shim
```

### `src/app/` — App Router (Next.js 16)

| Putanja                                                                      | Namjena                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Javni OpenAI-kompatibilni API (~25 pod-ruta: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers, itd.)                                                                                                                              |
| `app/api/v1beta/`                                                            | API krajnje tačke u Gemini stilu                                                                                                                                                                                                                                                                                           |
| `app/api/playground/`                                                        | Rute Playground Studija: `improve-prompt/` (POST — prepisivač LLM upita), `presets/` (GET lista / POST kreiranje), `presets/[id]/` (GET / PUT / DELETE) — pogledajte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                |
| `app/api/` (non-v1)                                                          | Rute za upravljanje/administraciju (~60 direktorija: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools, itd.)                                                                                                                                 |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 ruta (kontrola servera, stanje agenta/DNS/mapiranja, zaobilaženje, certifikat, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Pogledajte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                         |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ ruta (zahtjevi, sesije, hostovi, načini snimanja, izvoz, ws). LOCAL_ONLY + SPAWN_CAPABLE. Pogledajte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                      |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 ulazna tačka (`POST /a2a`)                                                                                                                                                                                                                                                                                |
| `app/.well-known/agent.json/`                                                | A2A kartica agenta (otkrivanje)                                                                                                                                                                                                                                                                                            |
| `app/(dashboard)/dashboard/`                                                 | Stranice korisničkog interfejsa kontrolne table (50+ sekcija, ~118 page.tsx datoteka: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity, itd.)                                                                                                            |
| `app/(dashboard)/dashboard/search-tools/`                                    | UI Search Tools Studija (3 kartice: Pretraga/Struganje/Poređenje + SearchConceptCard + ProviderCatalog) — pogledajte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                              |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (ljuska sa 3 kartice), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stranica kontrolne table AgentBridge — kartica servera, 9 kartica agenata, čarobnjak za podešavanje, mapiranje modela, lista za zaobilaženje. i18n PT-BR + EN. Pogledajte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stranica kontrolne table Traffic Inspector — DevTools podjela, 7 kartica sa detaljima, 4 prekidača načina snimanja, snimač sesija, kontekstualno bojenje. i18n PT-BR + EN. Pogledajte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                              |
| `app/(dashboard)/dashboard/activity/`                                        | Stranica feeda aktivnosti (Grupa B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — pogledajte `docs/architecture/MONITORING_SECTIONS.md`                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stranica dijeljenja kvota (Grupa B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                           |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stranica konfiguracije plana provajdera (Grupa B): `page.tsx` + `ProviderPlanConfigClient.tsx` — dimenzije kvota po nadjačavanju konekcije                                                                                                                                                                                 |
| `app/docs/`                                                                  | Preglednik ugrađene dokumentacije (renderuje `docs/*.md`)                                                                                                                                                                                                                                                                  |
| `app/landing/`                                                               | Marketing odredišna stranica                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Stranice povezane sa autentifikacijom                                                                                                                                                                                                                                                                                      |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Stranice HTTP grešaka                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statičke/statusne stranice                                                                                                                                                                                                                                                                                                 |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Korijenski layout, početna stranica, PWA manifest, globalni CSS                                                                                                                                                                                                                                                            |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Granice grešaka (Error boundaries)                                                                                                                                                                                                                                                                                         |

### `src/lib/` — Osnovne biblioteke (~50 modula)

| Modul                                    | Svrha                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokol upravitelj zadataka, vještine (5), streaming                                                                                                                                                                                                                                                                                |
| `acp/`                                   | CLI registar agenata (lokalno CLI otkrivanje — pogledajte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                    |
| `api/`                                   | Dijeljeni API pomoćnici (`requireManagementAuth`, validacija)                                                                                                                                                                                                                                                                            |
| `auth/`                                  | Sesija, heširanje lozinki, validacija tokena                                                                                                                                                                                                                                                                                             |
| `batches/`                               | OpenAI Batches API rukovaoci                                                                                                                                                                                                                                                                                                             |
| `catalog/`                               | Zod validacija kataloga provajdera + razrješenje mogućnosti                                                                                                                                                                                                                                                                              |
| `cloudAgent/`                            | Cloud agenti (Codex Cloud, Devin, Jules) — pogledajte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                   |
| `combos/`                                | Razrješenje kombinacija + pomoćnici za promjenu redoslijeda                                                                                                                                                                                                                                                                              |
| `audit/`                                 | Pomoćnici za feed aktivnosti: `highLevelActions.ts` (lista dozvoljenih + `isHighLevelAction()`), `activityIcons.ts` (mapa akcija → ikona/glagol), `timeline.ts` (groupByDay/relativeTime) — pogledajte `docs/architecture/MONITORING_SECTIONS.md`                                                                                        |
| `compliance/`                            | Revizijski zapis + revizija provajdera — pogledajte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                        |
| `compression/`                           | Poveznica mehanizma za kompresiju (mehanizmi se nalaze u `open-sse/services/compression/`)                                                                                                                                                                                                                                               |
| `config/`                                | Pomoćnici za konfiguraciju tokom izvršavanja                                                                                                                                                                                                                                                                                             |
| `db/`                                    | 120+ domenskih DB modula + 168 migracija (uvijek prolazite ovuda za SQLite)                                                                                                                                                                                                                                                              |
| `quota/`                                 | Mehanizam za dijeljenje kvota: `dimensions.ts` (tipovi/Zod), `types.ts` (QuotaStore interfejs), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — pogledajte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klijent kataloga besplatnih modela Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — pogledajte `docs/frameworks/RADAR.md`                                                                                                                                             |
| `display/`                               | Pomoćnici za formatiranje korisničkog interfejsa (trošak, latencija, itd.)                                                                                                                                                                                                                                                               |
| `embeddings/`                            | Pomoćnici servisa za ugradnje (embeddings)                                                                                                                                                                                                                                                                                               |
| `env/`                                   | Parsiranje + validacija varijabli okruženja                                                                                                                                                                                                                                                                                              |
| `evals/`                                 | Okvir za evaluaciju (paketi, pokretač, runtime) — pogledajte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                  |
| `guardrails/`                            | PII maskiranje, prompt injekcija, vision bridge — pogledajte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                               |
| `jobs/`                                  | Pozadinski poslovi (slični cron-u)                                                                                                                                                                                                                                                                                                       |
| `memory/`                                | Konverzacijska memorija (SQLite FTS5 + sqlite-vec hibridni RRF + Qdrant nivo 2) — pogledajte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                 |
| `memory/embedding/`                      | Sloj ugradnji iz više izvora: `index.ts` (razrješivač), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                                         |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 omotač — KNN brute-force + hibridni RRF (FTS5 + vektor, k=60). Lazy-init, graciozno degradira kada sqlite-vec nije dostupan. (plan 21)                                                                                                                                                                                 |
| `memory/reindex.ts`                      | `runReindexBatch()` — obrađuje memorije sa `needs_reindex=1` u pozadini; poziva se putem `POST /api/memory/reindex` i putanje za lazy-backfill. (plan 21)                                                                                                                                                                                |
| `monitoring/`                            | Provjere zdravlja, emitovanje metrika                                                                                                                                                                                                                                                                                                    |
| `oauth/`                                 | OAuth/import tokovi za 22 modula provajdera (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                                  |
| `plugins/`                               | Registar dodataka                                                                                                                                                                                                                                                                                                                        |
| `promptCache/`                           | Tačke prekida prompt keša u Anthropic stilu                                                                                                                                                                                                                                                                                              |
| `skills/`                                | Okvir za vještine (ugrađene + marketplace + SkillsSH) — pogledajte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                           |
| `playground/`                            | Playground Studio dijeljeni pomoćnici: `codeExport.ts` (curl/Python/TS generator), `promptImprover.ts` (meta-prompt graditelj), `streamMetrics.ts` (čisti TTFT/TPS), `types.ts` (tabela cijena) — pogledajte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                      |
| `webhookDispatcher.ts`                   | HMAC isporuka webhook-a — pogledajte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                       |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Upravitelji tunela — pogledajte `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                              |
| `cloudSync.ts`, `initCloudSync.ts`       | Opcionalna cloud sinhronizacija stanja                                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                             | Re-export barrel za db module (bez logike — samo re-exporti)                                                                                                                                                                                                                                                                             |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Keširanje zahtjeva + idempotencija                                                                                                                                                                                                                                                                                                       |
| `(~30 more top-level files)`             | Specijalizovani pomoćnici (logEnv, modelsDevSync, piiSanitizer, itd.)                                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Baza podataka (122 modula + 168 migracija)

| Poddirektorij             | Namjena                                                                                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton sa WAL žurnaliranjem                                                                                                                           |
| `db/migrations/`          | Verzije SQL datoteka (idempotentne, transakcijske). `073_memory_vec.sql` dodaje `memory_vec_meta` + `needs_reindex` kolonu (plan 21).                                      |
| `db/playgroundPresets.ts` | CRUD modul za Playground Studio presete (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)     |
| `db/memoryVec.ts`         | CRUD za `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, itd. (plan 21)                 |
| `db/<domain>.ts`          | Jedan modul po domenu: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, itd. |

### `src/domain/`

| Modul                  | Namjena                                             |
| ---------------------- | --------------------------------------------------- |
| `policy.ts`            | Mehanizam politika                                  |
| `fallbackPolicy.ts`    | Stablo odluka za rezervne opcije                    |
| `costRules.ts`         | Pravila za izračun troškova                         |
| `lockoutPolicy.ts`     | Politika zaključavanja modela/konekcije             |
| `tagRouter.ts`         | Rutiranje zasnovano na tagovima                     |
| `comboResolver.ts`     | Razrješavanje kombinacija (koristi ga combo engine) |
| `modelAvailability.ts` | Provjera dostupnosti po modelu                      |
| `assessment/`          | Procjena modela (Faza 1 RFC-AUTO-ASSESSMENT )       |

### `src/server/`

| Modul    | Namjena                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline autorizacije: `classify` → `policies` → `enforce` — pogledajte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS konfiguracija                                                                                         |
| `auth/`  | Middleware za sesije                                                                                       |

### `src/shared/`

| Modul                            | Namjena                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 provajdera** sa Zod validacijom (izvor istine)                               |
| `constants/cliTools.ts`          | Registar eksternih CLI alata                                                       |
| `constants/routingStrategies.ts` | **19 strategija rutiranja** sa prioritetima                                        |
| `constants/publicApiRoutes.ts`   | Rute koje zahtijevaju Bearer (naspram management) autorizaciju                     |
| `constants/upstreamHeaders.ts`   | Denylist zaglavlja za upstream zahtjeve                                            |
| `validation/schemas.ts`          | ~80 Zod šema (jedinstveni izvor istine za API ugovore)                             |
| `validation/helpers.ts`          | Pomoćni alati za Zod validaciju (`validateBody`, itd.)                             |
| `types/`                         | Dijeljeni TS tipovi                                                                |
| `contracts/`                     | Javni API ugovori (konzumirani od strane `files:` u `package.json`)                |
| `utils/circuitBreaker.ts`        | Circuit breaker za provajdere (pogledajte `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Validacija API ključa, provjera opsega (scope)                                     |
| `utils/fetchTimeout.ts`          | Timeout/abort wrapperi za upstream fetch                                           |
| `utils/releaseNotes.ts`          | Parser za najave zatvorene v2/legacy verzije, lokalizacija i odbacivanje ID-a      |

---

## `open-sse/` — Radni prostor mehanizma za strimovanje

Zaseban npm radni prostor (`@omniroute/open-sse`). Upravlja obradom zahtjeva + izvršavanjem provajdera.

```
open-sse/
├── handlers/            # 16 datoteka (12 rukovaoca + 4 pomoćnika): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, itd.
├── executors/           # 67 izvršilaca specifičnih za provajdera (proširuju BaseExecutor)
├── translator/          # Konvertori formata (9 zahtjeva, 9 odgovora, 9 pomoćnika)
├── transformer/         # API odgovori ↔ Chat Completions (TransformStream)
├── services/            # ~80+ servisnih modula (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, itd.)
├── mcp-server/          # MCP server (110 alata, 3 transporta, 33 opsega)
├── config/              # Registri provajdera/modela, konfiguracija zaglavlja, aliasi modela
├── utils/               # TLS klijent, proxy fetch/dispatcher, mrežni pomoćnici
├── index.ts             # Ulazna tačka radnog prostora
├── package.json         # Manifest radnog prostora
├── tsconfig.json        # TS konfiguracija radnog prostora
└── types.d.ts           # Deklaracije tipova radnog prostora
```

### `open-sse/mcp-server/`

| Putanja                     | Svrha                                                                  |
| --------------------------- | ---------------------------------------------------------------------- |
| `server.ts`                 | Životni ciklus MCP servera (stdio + HTTP transporti)                   |
| `httpTransport.ts`          | HTTP Streamable + SSE transporti (`/api/mcp/sse`, `/api/mcp/stream`)   |
| `audit.ts`                  | Revizijsko evidentiranje u `mcp_tool_audit` tabelu                     |
| `scopeEnforcement.ts`       | Validacija opsega po alatu                                             |
| `runtimeHeartbeat.ts`       | Heartbeat zdravlja ka `DATA_DIR/runtime/mcp-heartbeat.json`            |
| `descriptionCompressor.ts`  | Kompresija metapodataka opisa alata radi uštede konteksta              |
| `schemas/tools.ts`          | 36 definicija osnovnih alata + opsezi                                  |
| `tools/advancedTools.ts`    | Implementacije naprednih alata                                         |
| `tools/memoryTools.ts`      | 3 memorijska alata (pretraga/dodavanje/brisanje)                       |
| `tools/skillTools.ts`       | 4 alata za vještine (listanje/omogućavanje/izvršavanje/izvršenja)      |
| `tools/compressionTools.ts` | 5 alata za kompresiju                                                  |
| `README.md`                 | Interni MCP server README (povezan sa `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Desktop omotač

| Datoteka         | Svrha                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `main.js`        | Glavni proces Electrona (BrowserWindow, ugrađeni Next.js server, tray, automatsko ažuriranje) |
| `preload.js`     | IPC most (contextBridge → `window.omniroute`)                                                 |
| `package.json`   | konfiguracija electron-builder + Electron 41 + zavisnosti electron-builder 26.10              |
| `assets/`        | Ikone aplikacije (Windows .ico, macOS .icns, Linux .png)                                      |
| `dist-electron/` | Izlaz gradnje (gitignored)                                                                    |
| `types.d.ts`     | Deklaracije tipova za renderer most                                                           |
| `README.md`      | Interni Electron README (pogledajte i `docs/guides/ELECTRON_GUIDE.md`)                        |

---

## `bin/` — CLI

| Datoteka                                                                                                    | Namjena                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Glavni CLI ulaz — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, itd. |
| `reset-password.mjs`                                                                                        | Samostalni CLI za resetovanje lozinke                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Interaktivni + neinteraktivni čarobnjak za podešavanje                                                                      |
| `cli/commands/doctor.mjs`                                                                                   | Dijagnostika zdravlja sistema (8+ provjera)                                                                                 |
| `cli/commands/providers.mjs`                                                                                | Lista/testiranje/validacija provajdera                                                                                      |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Pomoćni CLI moduli                                                                                                          |
| `cli/tray/tray.ts`                                                                                          | Integracija sa sistemskom paletom (cross-platform: NotifyIcon na Windows-u, systray2 na macOS/Linux-u)                      |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon pozadinski proces (Windows, bez novih binarnih datoteka)                                              |
| `cli/tray/autostart.ts`                                                                                     | Cross-platform automatsko pokretanje (LaunchAgent / .desktop / registar)                                                    |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Lanac rezolucije SQLite drajvera u 5 koraka (bundled → runtime → lazy-install → node:sqlite → sql.js)                       |
| `cli/runtime/magicBytes.mjs`                                                                                | Validacija binarnih magic-byte potpisa (ELF / Mach-O / Mach-O fat / PE)                                                     |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — unaprijed rješava drajvere pri postinstall-u / prvom pokretanju                                        |
| `nodeRuntimeSupport.mjs`                                                                                    | Validacija podržane Node.js verzije pri instalaciji                                                                         |

---

## `skills/` — Javne agentske vještine

| Datoteka                     | Namjena                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifesta vještina za vanjske AI agente (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripte za izgradnju i provjeru

| Skripta                             | Namjena                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Dev/start pokretač s hidratacijom okruženja                                                       |
| `build-next-isolated.mjs`           | Samostalna izgradnja (Next.js 16 standalone)                                                      |
| `prepublish.ts`                     | Priprema paketa prije `npm pack`                                                                  |
| `postinstall.mjs`                   | Automatsko kreiranje `.env` iz `.env.example` pri prvoj instalaciji                               |
| `sync-env.mjs`                      | Ponovna sinkronizacija `.env` ključeva s `.env.example`                                           |
| `check-cycles.mjs`                  | Otkrivanje kružnih ovisnosti                                                                      |
| `check-route-validation.mjs`        | Provjera imaju li sve API rute Zod validaciju                                                     |
| `check-t11-any-budget.mjs`          | Provedba eksplicitnog `any` budžeta po datoteci                                                   |
| `check-docs-sync.mjs`               | Provjera sinkronizacije verzija dokumentacije (postojeći pre-commit)                              |
| **`check-env-doc-sync.mjs`**        | NOVO: unakrsna provjera env varijabli u kodu naspram `.env.example` naspram `ENVIRONMENT.md`      |
| **`check-docs-counts-sync.mjs`**    | NOVO: provjera odgovaraju li brojevi (izvršitelji, strategije, OAuth, A2A vještine) dokumentaciji |
| **`check-deprecated-versions.mjs`** | NOVO: označavanje zastarjelih verzija/datuma u dokumentaciji                                      |
| `check-supported-node-runtime.ts`   | Provjera je li trenutna Node verzija podržana                                                     |
| `check-pr-test-policy.mjs`          | Provedba pravila "testovi obavezni" za promjene u produkcijskom kodu                              |
| **`gen-provider-reference.ts`**     | NOVO: automatsko generiranje `docs/reference/PROVIDER_REFERENCE.md` iz kataloga                   |
| `i18n/generate-multilang.mjs`       | Prevođenje UI stringova + dokumentacije putem Google Translatea                                   |
| `i18n_autotranslate.py`             | Pipeline za prevođenje dokumentacije temeljen na LLM-u                                            |
| `validate_translation.py`           | Validacija prijevoda po lokalu                                                                    |
| `check_translations.py`             | Provjera i18n ključeva na strani koda                                                             |
| `run-playwright-tests.mjs`          | Playwright E2E pokretač                                                                           |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E pokretač                                                                              |
| `run-ecosystem-tests.mjs`           | Testovi ekosustava (integracija pružatelja usluga)                                                |
| `test-report-summary.mjs`           | Generiranje markdown sažetka pokrivenosti                                                         |
| `smoke-electron-packaged.mjs`       | Smoke-test za zapakiranu Electron verziju                                                         |
| `native-binary-compat.mjs`          | Provjera odgovaraju li nativne ovisnosti (`better-sqlite3`) Electronovom Node-u                   |
| `validate-pack-artifact.ts`         | Validacija `npm pack` izlaza                                                                      |
| `responses-ws-proxy.mjs`            | WebSocket most za Codex Responses API                                                             |
| `v1-ws-bridge.mjs`                  | WebSocket most za `/api/v1/ws` krajnju točku                                                      |
| `standalone-server-ws.mjs`          | Pokretač samostalnog WS poslužitelja                                                              |
| `system-info.mjs`                   | Ispis informacija o sustavu/runtime-u za podršku                                                  |
| `healthcheck.mjs`                   | Jednokratna provjera ispravnosti (koristi se za Docker HEALTHCHECK)                               |
| `uninstall.mjs`                     | Skripta za čistu deinstalaciju                                                                    |

---

## `docs/` — Javna dokumentacija (7 korijenskih datoteka + 17 poddirektorija)

### Glavni vodiči

| Dokument                    | Svrha                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arhitektura visokog nivoa, mapa podsistema, interfejs kontrolne ploče                                      |
| `CODEBASE_DOCUMENTATION.md` | Inženjerska referenca: direktoriji, moduli, konvencije                                                     |
| `FEATURES.md`               | Matrica funkcija sa istaknutim novostima v3.8                                                              |
| `USER_GUIDE.md`             | Priručnik za krajnjeg korisnika (postavljanje, modeli, kombinacije, CLI-jevi, audio, itd.)                 |
| `API_REFERENCE.md`          | Referenca API krajnjih tačaka sa modelom autentifikacije                                                   |
| `openapi.yaml`              | OpenAPI 3.0 specifikacija (121 putanja)                                                                    |
| `SETUP_GUIDE.md`            | Metode instalacije (npm, npx, Docker, Electron, Termux, source)                                            |
| `ENVIRONMENT.md`            | Sve varijable okruženja (~800 dokumentovanih, ~3.050 linija .env.example)                                  |
| `TROUBLESHOOTING.md`        | Uobičajene greške + poznati problemi v3.8.0                                                                |
| `RELEASE_CHECKLIST.md`      | Potpuni tok izdavanja (vještine, husky, konvencionalni commit-ovi, raspoređivanje)                         |
| `COVERAGE_PLAN.md`          | Ciljevi pokrivenosti i trenutno stanje                                                                     |
| `FREE_TIERS.md`             | Odabrani provajderi sa besplatnim nivoima (48+ besplatnih + 11 OAuth)                                      |
| `CLI-TOOLS.md`              | Eksterne CLI integracije + interni OmniRoute CLI                                                           |
| `I18N.md`                   | i18n arhitektura, dodavanje jezika, 42 lokala                                                              |
| `UNINSTALL.md`              | Koraci za čistu deinstalaciju                                                                              |
| `PROVIDER_REFERENCE.md`     | **Automatski generisan** katalog od 355 provajdera (ponovno generisanje: `npm run gen:provider-reference`) |

### Detaljna analiza podsistema

| Dokument                                    | Svrha                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCP server: 110 alata, 3 transporta, 33 opsega, REST krajnje tačke                    |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 vještina, REST pomoćnici, agentska kartica                      |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Jedinstveni vodič: A2A vs ACP vs Cloud Agents                                         |
| `CLOUD_AGENT.md`                            | Codex Cloud / Devin / Jules orkestracija                                              |
| `SKILLS.md`                                 | Okvir vještina (ugrađeno + tržište + SkillsSH + sandbox)                              |
| `RADAR.md`                                  | Radar preklopnik kataloga besplatnih modela (`RADAR_ENABLED`, isključeno po defaultu) |
| `MEMORY.md`                                 | Sistem memorije (SQLite FTS5 + Qdrant)                                                |
| `EVALS.md`                                  | Okvir za evaluaciju (paketi, pokretanja, rubrike)                                     |
| `GUARDRAILS.md`                             | Maskiranje PII podataka, prompt injekcija, vision most                                |
| `COMPLIANCE.md`                             | Revizijski dnevnik, zadržavanje, isključivanje logovanja                              |
| `WEBHOOKS.md`                               | Dostava webhook-ova potpisanih HMAC-om                                                |
| `REASONING_REPLAY.md`                       | Hibridni memorijski/SQLite keš za `reasoning_content`                                 |
| `AUTHZ_GUIDE.md`                            | Cjevovod autorizacije (`classify` → `policies` → `enforce`)                           |
| `RESILIENCE_GUIDE.md`                       | Prekidač strujnog kola (circuit breaker) + hlađenje + zaključavanje modela            |
| `docs/security/STEALTH_GUIDE.md` (git only) | TLS otisak (JA3/JA4), Claude Code CCH, MITM cert                                      |
| `AUTO-COMBO.md`                             | Auto Combo mašina (bodovanje sa 16 faktora, 6 paketa modova, virtuelna fabrika)       |

### Kompresija

| Dokument                        | Svrha                                  |
| ------------------------------- | -------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Pregled modova kompresije + mapa puta  |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK mašine, ugovor registra  |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman JSON šema paketa pravila       |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventar paketa pravila po jeziku      |
| `RTK_COMPRESSION.md`            | RTK deklarativni cjevovod (49 filtera) |

### Raspoređivanje

| Dokument                     | Svrha                                                             |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker build, profili (base/cli/host/cliproxyapi), Redis sidecar  |
| `VM_DEPLOYMENT_GUIDE.md`     | Generičko VM/VPS raspoređivanje (Ubuntu/Debian + nginx + systemd) |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io raspoređivanje (trenutno samo na kineskom)                 |
| `TERMUX_GUIDE.md`            | Android headless putem Termux-a                                   |
| `PWA_GUIDE.md`               | Instalacija progresivne web aplikacije + service worker           |
| `ELECTRON_GUIDE.md`          | Build, potpisivanje i distribucija desktop aplikacije             |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | 4-nivoa odlaznog proxy-ja + 1proxy tržište                        |

### Poddirektoriji

| Poddirektorij         | Namjena                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizovani prevodi dokumentacije (41 lokalitet)                                                                                                                                                                               |
| `docs/screenshots/`   | Slikovni resursi za vodiče                                                                                                                                                                                                      |
| `_tasks/superpowers/` | Planovi/specifikacije od superpowers (`writing-plans`/`brainstorming`) + istraživanje — izolovan, zasebno verzionisan repozitorij, gitignored od strane glavnog stabla. Pogledajte CLAUDE.md → "Planning & Research Artifacts". |

---

## `tests/` — Test paketi

| Poddirektorij                        | Tip                                                  | Izvršilac                                     |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------------- |
| `tests/unit/`                        | Jedinični testovi (~4.800 datoteka, najbrži)         | Node izvorni test izvršilac                   |
| `tests/integration/`                 | Integracijski testovi za više modula + baza podataka | Node izvorni test izvršilac (konkurentnost 1) |
| `tests/e2e/`                         | UI + workflow E2E                                    | Playwright                                    |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A E2E za stvarne klijente                    | Prilagođeni klijenti protokola                |
| `tests/e2e/ecosystem.test.ts`        | Integracija provajdera (pristup mreži)               | Node izvorni test izvršilac                   |

---

## `public/` — Statički resursi

| Putanja             | Namjena                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `public/` (korijen) | Favikone, robots.txt, manifest, service worker, marketinške slike |
| `public/providers/` | PNG/SVG logotip provajdera (koristi se na kontrolnoj tabli)       |

---

## `config/` — Statičke konfiguracije + Stanje kapije kvaliteta (Quality-Gate)

Isporučeni konfiguracijski šabloni plus uvrštene osnovne vrijednosti (baselines) kapije kvaliteta (premješteno ovdje iz korijena repozitorija u v3.8.26 radi održavanja čistoće korijena).

| Putanja                                       | Namjena                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista lokala + metapodaci (kanonički izvor za broj od 42 lokala)                            |
| `config/i18n-schema.json`                     | JSON šema koja validira `i18n.json`                                                         |
| `config/payloadRules.json`                    | Pravila za sanitizaciju uzvodnog (upstream) payload-a                                       |
| `config/quality/quality-baseline.json`        | Osnovna vrijednost (baseline) za više metrika (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Zamrznuta osnovna vrijednost ESLint složenosti (`check-complexity.mjs`)                     |
| `config/quality/duplication-baseline.json`    | Zamrznuta osnovna vrijednost duplikacije jscpd (`check-duplication.mjs`)                    |
| `config/quality/file-size-baseline.json`      | Zamrznuta osnovna vrijednost veličine po datoteci (`check-file-size.mjs`)                   |
| `config/quality/test-discovery-baseline.json` | Zamrznuta osnovna vrijednost za testove bez vlasnika (`check-test-discovery.mjs`)           |
| `config/quality/dependency-allowlist.json`    | Lista dozvoljenih odobrenih zavisnosti (`check-deps.mjs`)                                   |
| `config/quality/.license-allowlist.json`      | SPDX lista dozvoljenih licenci (`check-licenses.mjs`)                                       |
| `config/quality/quality-metrics.json`         | Prolazne prikupljene metrike (generisane pomoću `collect-metrics.mjs`; **gitignored**)      |

---

## `.github/` — GitHub integracija

| Putanja                            | Namjena                                                              |
| ---------------------------------- | -------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD radni tokovi (lint, test, pokrivenost, izdanje) |
| `.github/ISSUE_TEMPLATE/`          | Predlošci za bugove/funkcionalnosti                                  |
| `.github/pull_request_template.md` | PR predložak                                                         |
| `.github/dependabot.yml`           | Konfiguracija ažuriranja zavisnosti                                  |

---

## `.husky/` — Git kuke (Hooks)

| Datoteka     | Namjena                                                                      |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | Pokreće `lint-staged + check-docs-sync + check:any-budget:t11`               |
| `pre-push`   | Trenutno onemogućeno (zakomentarisano). Pokrenite `npm run test:unit` ručno. |
| `_/`         | Husky interne datoteke                                                       |

---

## `.claude/` — Claude Code Slash komande

| Datoteka                                            | Namjena                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — povećanje verzije + automatski dnevnik promjena |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — potpuni radni tok izdanja                   |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Raspoređivanje (deploy) na VPS                                       |
| `commands/capture-release-evidences-cc.md`          | Snimanje novih funkcionalnosti u pregledniku kao WebP                |
| `commands/review-{prs,discussions}-cc.md`           | Triaža GitHub PR-ova/diskusija                                       |
| `commands/{review-issues,implement-features}-cc.md` | Radni tokovi za probleme (issues)                                    |
| `settings.local.json`                               | Claude Code postavke po projektu                                     |

---

## `.agents/` — Generički radni tokovi agenata (Codex / Cursor / itd.)

| Putanja                  | Namjena                                                         |
| ------------------------ | --------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definicija radnih tokova (zrcalna slika `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definicija vještina sa Codex bilješkama o izvršavanju         |

> **Napomena:** Radni tokovi i komande su trenutno identični bajt po bajt. Ako `.agents/` treba da cilja drugačije izvršno okruženje agenta (Codex), varijante se moraju značajno razlikovati.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Izvan stabla (Out-of-tree)

Ovi direktoriji sa prefiksom donje crte sadrže sadržaj koji se ne isporučuje:

- **`_ideia/`** — dizajnerske bilješke (kategorije: odgoditi / ne odgovara / izvodljivo)
- **`_mono_repo/`** — historijski podprojekti (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klonovi srodnih OSS projekata samo za čitanje (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, itd.) za unakrsnu referencu tokom razvoja
- **`_tasks/`** — datoteke za praćenje zadataka po izdanju (neformalno)

Nije uključeno u izlaz `npm pack`. Pogledajte `.npmignore`.

---

## Generisano / Ignorisano u Gitu

| Putanja                | Namjena                       |
| ---------------------- | ----------------------------- |
| `node_modules/`        | npm zavisnosti                |
| `.next/`               | Next.js izlaz izgradnje       |
| `coverage/`            | c8 izvještaji o pokrivenosti  |
| `logs/`                | Logovi izvršavanja            |
| `package/`             | npm pack staging              |
| `.playwright-mcp/`     | Playwright MCP test artefakti |
| `.issues/`             | Lokalni keš za probleme       |
| `tsconfig.tsbuildinfo` | TS inkrementalni keš          |

---

## Savjeti za navigaciju

- **Novi saradnik?** Pročitajte `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Dodajete provajdera?** Pratite `docs/architecture/ARCHITECTURE.md § Adding a New Provider` + provjerite `docs/reference/PROVIDER_REFERENCE.md`.
- **Dodajete rutu?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Dodajete MCP alat?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Dodajete A2A vještinu?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Pokrećete lokalno?** `docs/guides/SETUP_GUIDE.md`.
- **Deploy-ujete?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Objavljujete verziju?** `docs/ops/RELEASE_CHECKLIST.md` (i `/generate-release-cc` Claude Code vještina).
