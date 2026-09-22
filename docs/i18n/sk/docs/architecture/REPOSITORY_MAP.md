# Repository Map (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Jednoriadkový opis každého adresára a súboru v koreňovom adresári.**
> Posledná aktualizácia: 2026-06-28 — OmniRoute v3.8.40
>
> Pomocou tejto mapy sa môžete rýchlo orientovať v kódovej základni. Podrobnejšie informácie nájdete v odkazoch na samostatnú dokumentáciu.

## Strom najvyššej úrovne

```
OmniRoute/
├── src/                  # Aplikácia Next.js 16 (UI + API trasy + knižnice + doména + server)
├── open-sse/             # Pracovný priestor streamovacieho jadra (obslužné moduly, vykonávacie moduly, prekladač, MCP server)
├── electron/             # Obal pre počítačovú aplikáciu (Electron 41 + electron-builder 26.10)
├── bin/                  # Vstupný bod CLI a obslužné moduly príkazov
├── scripts/              # Skripty na zostavenie, kontrolu, synchronizáciu a jednorazové úlohy
├── docs/                 # Verejná dokumentácia (nachádzate sa tu)
├── tests/                # Všetky testovacie súpravy (jednotkové, integračné, e2e, klienti protokolov)
├── public/               # Statické zdroje Next.js, manifest PWA, service worker, ikony
├── config/               # Statická konfigurácia + stav kontroly kvality (i18n, payloadRules, quality/)
├── images/               # Obrázkové zdroje pre marketing a README
├── @omniroute/           # Publikovateľné sprievodné balíky (opencode-plugin, opencode-provider)
├── skills/               # Balíky zručností pre CLI/agentov (cli-* + omni-* + config-codex-cli)
├── examples/             # Ukážkové pluginy + štartovacia šablóna omniroute-cmd-hello
├── contrib/              # Komunitné príspevky (podman/)
├── .source/              # Konfigurácia zdroja Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Pracovné postupy GitHub Actions + šablóny problémov + šablóna PR
├── .husky/               # Git hooky (pre-commit, pre-push)
├── .claude/              # Lomkové príkazy Claude Code (v rámci projektu)
├── .agents/              # Pracovné postupy a zručnosti pre Codex/všeobecných agentov (zrkadlo .claude/)
├── .vscode/              # Nastavenia pracovného priestoru VS Code
├── _ideia/               # Plánovacie poznámky (neformálne; nie sú súčasťou distribúcie)
├── _mono_repo/           # Historické podprojekty (cloud, site, vscode-extension)
├── _references/          # Klony súvisiacich OSS projektov určené iba na čítanie
├── _tasks/               # Súbory na sledovanie úloh pre jednotlivé vydania (neformálne)
├── .build/ .worktrees/ dist/   # lokálne pracovné priečinky zostavenia / git-worktree / výstupu zostavenia (ignorované systémom Git)
├── .issues/              # Lokálna vyrovnávacia pamäť problémov (ignorovaná systémom Git)
├── .playwright-mcp/      # Artefakty testov Playwright MCP
├── coverage/             # Výstup pokrytia c8 (ignorovaný systémom Git)
├── logs/                 # Prevádzkové protokoly (ignorované systémom Git)
├── node_modules/         # Závislosti (ignorované systémom Git)
├── package/              # Prípravná oblasť pre npm pack (artefakt zostavenia)
├── .next/                # Výstup zostavenia Next.js (ignorovaný systémom Git)
└── (koreňové súbory — pozrite nižšie)
```

---

## Koreňové súbory

| Súbor                                       | Účel                                                                                                     |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketingová vstupná stránka + rýchly štart + matica funkcií (pozri tiež `llm.txt`)                      |
| **CHANGELOG.md**                            | Zoznam zmien pre jednotlivé vydania (automaticky generovaný pomocou skillu `/version-bump-cc`)           |
| **LICENSE**                                 | Text licencie MIT                                                                                        |
| **CLAUDE.md**                               | Pravidlá projektu pre agentov Claude Code (pevné pravidlá, konvencie, scenáre)                           |
| **AGENTS.md**                               | To isté ako CLAUDE.md, ale pre AI agentov iných než Claude (Codex, Cursor atď.)                          |
| **GEMINI.md**                               | Stručné pravidlá pre agentov založených na Gemini (podmnožina CLAUDE.md)                                 |
| **CONTRIBUTING.md**                         | Príručka pre prispievateľov: nastavenie, konvenčné commity, testovanie, proces PR                        |
| **SECURITY.md**                             | Zásady nahlasovania zraniteľností, podporované verzie, model hrozieb                                     |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — očakávania týkajúce sa správania komunity                                         |
| **llm.txt**                                 | Vstupná stránka v čistom texte optimalizovaná pre crawlery LLM (SEO pre AI asistentov)                   |
| **package.json**                            | Manifest npm, skripty, závislosti, enginy, prah pokrytia c8                                              |
| **package-lock.json**                       | Uzamknutý strom závislostí                                                                               |
| **tsconfig.json**                           | Koreňová konfigurácia TypeScriptu                                                                        |
| **tsconfig.typecheck-core.json**            | Konfigurácia kontroly typov pre jadro `src/`                                                             |
| **tsconfig.typecheck-noimplicit-core.json** | Striktná (`noImplicitAny`) kontrola typov                                                                |
| **tsconfig.tsbuildinfo**                    | Cache inkrementálneho zostavenia TS (ignorovaná Gitom)                                                   |
| **next.config.mjs**                         | Konfigurácia zostavenia Next.js 16 (samostatný výstup)                                                   |
| **next-env.d.ts**                           | Automaticky generované typy prostredia Next.js                                                           |
| **eslint.config.mjs**                       | Plochá konfigurácia ESLint (pravidlá podľa oblasti projektu)                                             |
| **prettier.config.mjs**                     | Pravidlá formátovania Prettier                                                                           |
| **postcss.config.mjs**                      | Konfigurácia PostCSS pre pipeline Tailwind/CSS                                                           |
| **playwright.config.ts**                    | Konfigurácia E2E testov Playwright                                                                       |
| **vitest.config.ts**                        | Konfigurácia Vitest (predvolená sada)                                                                    |
| **vitest.mcp.config.ts**                    | Konfigurácia Vitest pre server MCP / sady autoCombo / cache                                              |
| **sonar-project.properties**                | Konfigurácia SonarQube/SonarCloud (kvalita kódu)                                                         |
| **Dockerfile**                              | Viacfázové zostavenie Docker (builder → runner-base → runner-cli)                                        |
| **docker-compose.yml**                      | Vývojová konfigurácia Compose so 4 profilmi (base, cli, host, cliproxyapi) + sprievodný kontajner redis  |
| **docker-compose.prod.yml**                 | Produkčná konfigurácia Compose (port 20130, redis, pomenované zväzky)                                    |
| **.dockerignore**                           | Súbory vylúčené z kontextu Docker                                                                        |
| **fly.toml**                                | Konfigurácia nasadenia Fly.io (región `sin`, port 20128, zväzok /data)                                   |
| **.env.example**                            | Šablóna súboru prostredia (pri prvej inštalácii sa automaticky skopíruje do `.env`)                      |
| **.gitignore**                              | Vzory ignorovania pre Git                                                                                |
| **.npmignore**                              | Zoznam vylúčení pri publikovaní do npm                                                                   |
| **.npmrc**                                  | Konfigurácia npm (register, zásady súboru lockfile)                                                      |
| **.node-version**                           | Pevne určená verzia Node (používaná nástrojmi kompatibilnými s nvm)                                      |
| **.nvmrc**                                  | Pevne určená verzia Node pre nvm                                                                         |
| **eslint.complexity.config.mjs**            | Konfigurácia ESLint pre postupné sprísňovanie zložitosti (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Konfigurácia ESLint pre pravidlá SonarJS (kognitívna zložitosť / duplicita)                              |
| **source.config.ts**                        | Zdrojová konfigurácia Fumadocs `defineDocs` (napĺňa `.source/`)                                          |
| **knip.json**                               | Konfigurácia Knip — nepoužité súbory/exporty/závislosti (vstup pre kontrolu mŕtveho kódu)                |
| **stryker.conf.json**                       | Konfigurácia mutačného testovania Stryker                                                                |
| **.size-limit.json**                        | Konfigurácia limitu veľkosti balíka size-limit                                                           |
| **promptfooconfig.yaml**                    | Konfigurácia vyhodnocovania promptfoo                                                                    |
| **.gitleaks.toml**                          | Súbor pravidiel kontroly tajomstiev nástrojom gitleaks                                                   |
| **.zizmor.yml**                             | Konfigurácia bezpečnostnej kontroly GitHub Actions nástrojom zizmor                                      |
| **socket.yml**                              | Konfigurácia dodávateľského reťazca Socket.dev                                                           |
| **news.json**                               | Lokalizovaný informačný kanál oznámení v2; položka o spustení Radaru sa dodáva neaktívna                 |
| **flake.nix** / **flake.lock**              | Definícia vývojového shellu Nix + zámok                                                                  |
| **.env**                                    | Lokálne tajomstvá (ignorované systémom git — generované z `.env.example`)                                |

> **Presunuté z koreňového adresára vo verzii v3.8.26 (sprehľadnenie):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` a generovaný súbor `quality-metrics.json` (ignorovaný systémom git). Pozrite si [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplikácia Next.js

```
src/
├── app/                 # App Router (stránky + API trasy + stavové stránky + vstupná stránka)
├── lib/                 # Základné knižnice / doménové moduly (80 podadresárov + ~70 súborov najvyššej úrovne)
├── domain/              # Čistá doménová logika (policy engine, fallback, náklady, lockout, comboResolver, assessment)
├── server/              # Moduly iba pre server (authz pipeline, cors, auth middleware) — nemožno ich importovať z klienta
├── shared/              # Bezpečne zdieľané medzi serverom a klientom (konštanty, typy, validácia, kontrakty, pomocné nástroje)
├── i18n/                # konfigurácia next-intl + JSON správ pre jednotlivé lokality (42 lokalít)
├── middleware/          # Middleware Next.js (obohatenie požiadaviek, detekcia lokality)
├── mitm/                # Jadro MITM proxy: generovanie/inštalácia certifikátov, obslužné rutiny, ciele, inšpektor, masky, passthrough
│   ├── handlers/        # 9 tried obslužných rutín agentov IDE rozširujúcich MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Vrstva zachytávania prevádzky: buffer (kruhový buffer v pamäti), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Prepojovacia vrstva adaptérov modelov (staršia kompatibilná vrstva)
├── scripts/             # Skripty údržby v rámci zdrojového stromu (napr. backfillAggregation)
├── sse/                 # Staršie obslužné rutiny/služby SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Staršie úložisko v pamäti (postupne nahrádzané src/lib/db)
├── types/               # Zdieľané súbory typov TS
├── instrumentation.ts   # Telemetrický hook Next.js (prehliadač + edge)
├── instrumentation-node.ts  # Inštrumentácia iba pre Node
└── proxy.ts             # Vstupná kompatibilná vrstva HTTP proxy
```

### `src/app/` — App Router (Next.js 16)

| Cesta                                                                        | Účel                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Verejné API kompatibilné s OpenAI (~25 podradených trás: chat, dokončenia, vnorenia, súbory, dávky, zvuk, obrázky, videá, hudba, prehodnocovanie poradia, moderovanie, vyhľadávanie, ws, agenti, účty, poskytovatelia atď.)                                                                                                   |
| `app/api/v1beta/`                                                            | Koncové body API v štýle Gemini                                                                                                                                                                                                                                                                                               |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — prepisovanie promptov pomocou LLM), `presets/` (GET zoznam / POST vytvorenie), `presets/[id]/` (GET / PUT / DELETE) — pozrite si `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                    |
| `app/api/` (mimo v1)                                                         | Trasy na správu/administráciu (~60 adresárov: poskytovatelia, kombinácie, nastavenia, mcp, a2a, vyhodnotenia, pamäť, zručnosti, webhooky, súlad, odolnosť, monitorovanie, tunely, nástroje CLI atď.)                                                                                                                          |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 trás (ovládanie servera, stav agenta/DNS/mapovania, obchádzanie, certifikát, nadradená CA). LOCAL_ONLY + SPAWN_CAPABLE. Pozrite si `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                             |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API Traffic Inspector — viac než 16 trás (požiadavky, relácie, hostitelia, režimy zachytávania, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Pozrite si `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                      |
| `app/a2a/`                                                                   | Vstupný bod A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                    |
| `app/.well-known/agent.json/`                                                | Karta agenta A2A (zisťovanie)                                                                                                                                                                                                                                                                                                 |
| `app/(dashboard)/dashboard/`                                                 | Stránky používateľského rozhrania riadiaceho panela (viac než 50 sekcií, ~118 súborov page.tsx: poskytovatelia, kombinácie, nastavenia, pamäť, zručnosti, webhooky, vyhodnotenia, audit, dávky, vyrovnávacia pamäť, náklady, stav, systém, aktivita atď.)                                                                     |
| `app/(dashboard)/dashboard/search-tools/`                                    | Používateľské rozhranie Search Tools Studio (3 karty: Vyhľadávanie/Získavanie/Porovnanie + SearchConceptCard + ProviderCatalog) — pozrite si `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                         |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plán 21): `page.tsx` (prostredie s 3 kartami), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stránka riadiaceho panela AgentBridge — karta servera, 9 kariet agentov, sprievodca nastavením, mapovanie modelov, zoznam obchádzania. i18n PT-BR + EN. Pozrite si `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                          |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stránka riadiaceho panela Traffic Inspector — rozdelené DevTools, 7 kariet podrobností, 4 prepínače režimov zachytávania, záznamník relácií, farebné rozlíšenie kontextu. i18n PT-BR + EN. Pozrite si `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                 |
| `app/(dashboard)/dashboard/activity/`                                        | Stránka kanála aktivity (skupina B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — pozri `docs/architecture/MONITORING_SECTIONS.md`                                                                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stránka zdieľania kvót (skupina B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stránka konfigurácie plánu poskytovateľa (skupina B): `page.tsx` + `ProviderPlanConfigClient.tsx` — prepísanie dimenzií kvót pre jednotlivé pripojenia                                                                                                                                                                        |
| `app/docs/`                                                                  | Integrovaný prehliadač dokumentácie (vykresľuje `docs/*.md`)                                                                                                                                                                                                                                                                  |
| `app/landing/`                                                               | Marketingová vstupná stránka                                                                                                                                                                                                                                                                                                  |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Stránky súvisiace s autentifikáciou                                                                                                                                                                                                                                                                                           |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Stránky chýb HTTP                                                                                                                                                                                                                                                                                                             |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statické/stavové stránky                                                                                                                                                                                                                                                                                                      |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Koreňové rozloženie, domovská stránka, manifest PWA, globálne CSS                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Hranice chýb                                                                                                                                                                                                                                                                                                                  |

### `src/lib/` — Základné knižnice (~50 modulov)

| Modul                                    | Účel                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Správca úloh protokolu A2A, zručnosti (5), streamovanie                                                                                                                                                                                                                                                                       |
| `acp/`                                   | Register agentov CLI (lokálne zisťovanie CLI — pozrite si `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                         |
| `api/`                                   | Zdieľané pomocné nástroje API (`requireManagementAuth`, validácia)                                                                                                                                                                                                                                                            |
| `auth/`                                  | Relácia, hašovanie hesiel, validácia tokenov                                                                                                                                                                                                                                                                                  |
| `batches/`                               | Obslužné moduly rozhrania OpenAI Batches API                                                                                                                                                                                                                                                                                  |
| `catalog/`                               | Validácia katalógu poskytovateľov pomocou Zod + určovanie schopností                                                                                                                                                                                                                                                          |
| `cloudAgent/`                            | Cloudoví agenti (Codex Cloud, Devin, Jules) — pozrite si `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                     |
| `combos/`                                | Určovanie kombinácií + pomocné nástroje na zmenu poradia                                                                                                                                                                                                                                                                      |
| `audit/`                                 | Pomocné nástroje kanála aktivít: `highLevelActions.ts` (zoznam povolených položiek + `isHighLevelAction()`), `activityIcons.ts` (mapovanie akcie → ikona/sloveso), `timeline.ts` (`groupByDay`/`relativeTime`) — pozrite si `docs/architecture/MONITORING_SECTIONS.md`                                                        |
| `compliance/`                            | Protokol auditu + audit poskytovateľa — pozrite si `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                              |
| `compression/`                           | Prepojovací kód kompresného jadra (jadrá sa nachádzajú v `open-sse/services/compression/`)                                                                                                                                                                                                                                    |
| `config/`                                | Pomocné nástroje konfigurácie za behu                                                                                                                                                                                                                                                                                         |
| `db/`                                    | Viac než 120 doménových modulov databázy + 168 migrácií (pre SQLite vždy pristupujte cez ne)                                                                                                                                                                                                                                  |
| `quota/`                                 | Jadro zdieľania kvót: `dimensions.ts` (typy/Zod), `types.ts` (rozhranie QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — pozrite si `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klient katalógu bezplatných modelov Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — pozri `docs/frameworks/RADAR.md`                                                                                                                                      |
| `display/`                               | Pomocné nástroje na formátovanie používateľského rozhrania (náklady, latencia atď.)                                                                                                                                                                                                                                           |
| `embeddings/`                            | Pomocné nástroje služby embeddings                                                                                                                                                                                                                                                                                            |
| `env/`                                   | Parsovanie a validácia premenných prostredia                                                                                                                                                                                                                                                                                  |
| `evals/`                                 | Framework na vyhodnocovanie (súpravy, spúšťač, runtime) — pozri `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                    |
| `guardrails/`                            | Maskovanie osobných údajov, ochrana pred prompt injection, most pre vizuálny obsah — pozri `docs/security/GUARDRAILS.md`                                                                                                                                                                                                      |
| `jobs/`                                  | Úlohy na pozadí (podobné cron úlohám)                                                                                                                                                                                                                                                                                         |
| `memory/`                                | Konverzačná pamäť (hybridné RRF so SQLite FTS5 + sqlite-vec a Qdrant ako druhá vrstva) — pozri `docs/frameworks/MEMORY.md`                                                                                                                                                                                                    |
| `memory/embedding/`                      | Vrstva embeddings s viacerými zdrojmi: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plán 21)                                                                                                                                                                        |
| `memory/vectorStore.ts`                  | Wrapper pre sqlite-vec v0.1.9 — KNN hrubou silou + hybridné RRF (FTS5 + vektor, k=60). Inicializuje sa len v prípade potreby a pri nedostupnosti sqlite-vec elegantne prejde do obmedzeného režimu. (plán 21)                                                                                                                 |
| `memory/reindex.ts`                      | `runReindexBatch()` — spracúva na pozadí záznamy pamäte s `needs_reindex=1`; volá sa prostredníctvom `POST /api/memory/reindex` a cesty lazy-backfill. (plán 21)                                                                                                                                                              |
| `monitoring/`                            | Kontroly stavu, emitovanie metrík                                                                                                                                                                                                                                                                                             |
| `oauth/`                                 | Toky OAuth/importu pre 22 modulov poskytovateľov (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                  |
| `plugins/`                               | Register pluginov                                                                                                                                                                                                                                                                                                             |
| `promptCache/`                           | Body prerušenia vyrovnávacej pamäte promptov v štýle Anthropic                                                                                                                                                                                                                                                                |
| `skills/`                                | Framework zručností (vstavané + marketplace + SkillsSH) — pozri `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                   |
| `playground/`                            | Zdieľané pomocné nástroje Playground Studio: `codeExport.ts` (generátor curl/Python/TS), `promptImprover.ts` (nástroj na tvorbu metapromptov), `streamMetrics.ts` (čisté TTFT/TPS), `types.ts` (cenová tabuľka) — pozrite si `docs/frameworks/PLAYGROUND_STUDIO.md`                                                           |
| `webhookDispatcher.ts`                   | Doručovanie webhookov pomocou HMAC — pozrite si `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                 |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Správcovia tunelov — pozrite si `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                   |
| `cloudSync.ts`, `initCloudSync.ts`       | Voliteľná cloudová synchronizácia stavu                                                                                                                                                                                                                                                                                       |
| `localDb.ts`                             | Súhrnný modul opätovných exportov pre databázové moduly (bez logiky — iba opätovné exporty)                                                                                                                                                                                                                                   |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Ukladanie požiadaviek do vyrovnávacej pamäte + idempotencia                                                                                                                                                                                                                                                                   |
| (~30 ďalších súborov najvyššej úrovne)   | Špecializované pomocné nástroje (logEnv, modelsDevSync, piiSanitizer atď.)                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Databáza (122 modulov + 168 migrácií)

| Podadresár                | Účel                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` so žurnálovaním WAL                                                                                                                                  |
| `db/migrations/`          | Verziované súbory SQL (idempotentné, transakčné). `073_memory_vec.sql` pridáva stĺpce `memory_vec_meta` + `needs_reindex` (plán 21).                                             |
| `db/playgroundPresets.ts` | Modul CRUD pre predvoľby Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)        |
| `db/memoryVec.ts`         | CRUD pre `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` atď. (plán 21)                       |
| `db/<domain>.ts`          | Jeden modul pre každú doménu: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache atď. |

### `src/domain/`

| Modul                  | Účel                                                     |
| ---------------------- | -------------------------------------------------------- |
| `policy.ts`            | Mechanizmus politík                                      |
| `fallbackPolicy.ts`    | Rozhodovací strom záložných možností                     |
| `costRules.ts`         | Pravidlá výpočtu nákladov                                |
| `lockoutPolicy.ts`     | Politika blokovania modelu/pripojenia                    |
| `tagRouter.ts`         | Smerovanie založené na značkách                          |
| `comboResolver.ts`     | Rozlíšenie kombinácií (používané mechanizmom kombinácií) |
| `modelAvailability.ts` | Kontrola dostupnosti jednotlivých modelov                |
| `assessment/`          | Posúdenie modelu (1. fáza RFC-AUTO-ASSESSMENT)           |

### `src/server/`

| Modul    | Účel                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `authz/` | Autorizačný reťazec: `classify` → `policies` → `enforce` — pozrite si `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfigurácia CORS                                                                                        |
| `auth/`  | Middleware relácie                                                                                       |

### `src/shared/`

| Modul                            | Účel                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 poskytovateľov** s validáciou Zod (zdroj pravdy)                                  |
| `constants/cliTools.ts`          | Register externých nástrojov CLI                                                        |
| `constants/routingStrategies.ts` | **19 stratégií smerovania** s prioritami                                                |
| `constants/publicApiRoutes.ts`   | Trasy, ktoré vyžadujú autentifikáciu Bearer (namiesto správcovskej)                     |
| `constants/upstreamHeaders.ts`   | Zoznam zakázaných hlavičiek pre upstreamové požiadavky                                  |
| `validation/schemas.ts`          | ~80 schém Zod (jediný zdroj pravdy pre kontrakty API)                                   |
| `validation/helpers.ts`          | Pomocné funkcie validácie Zod (`validateBody` atď.)                                     |
| `types/`                         | Zdieľané typy TS                                                                        |
| `contracts/`                     | Verejné kontrakty API (používané prostredníctvom `files:` v `package.json`)             |
| `utils/circuitBreaker.ts`        | Istič poskytovateľa (pozri `docs/architecture/RESILIENCE_GUIDE.md`)                     |
| `utils/apiAuth.ts`               | Overovanie kľúča API, kontrola rozsahu oprávnení                                        |
| `utils/fetchTimeout.ts`          | Obalové funkcie časového limitu/prerušenia pre upstreamové volania fetch                |
| `utils/releaseNotes.ts`          | Parser uzavretých oznámení v2/starších verzií, lokalizácia a zrušenie oznámení podľa ID |

---

## `open-sse/` — Pracovný priestor streamovacieho enginu

Samostatný pracovný priestor npm (`@omniroute/open-sse`). Spracúva požiadavky a vykonávanie poskytovateľov.

```
open-sse/
├── handlers/            # 16 súborov (12 obslužných modulov + 4 pomocné moduly): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search atď.
├── executors/           # 67 vykonávacích modulov špecifických pre poskytovateľov (rozširujú BaseExecutor)
├── translator/          # Konvertory formátov (9 pre požiadavky, 9 pre odpovede, 9 pomocných)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ modulov služieb (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM atď.)
├── mcp-server/          # Server MCP (110 nástrojov, 3 transporty, 33 rozsahov)
├── config/              # Registre poskytovateľov/modelov, konfigurácia hlavičiek, aliasy modelov
├── utils/               # Klient TLS, proxy fetch/dispatcher, sieťové pomocné moduly
├── index.ts             # Vstupný bod pracovného priestoru
├── package.json         # Manifest pracovného priestoru
├── tsconfig.json        # Konfigurácia TS pracovného priestoru
└── types.d.ts           # Deklarácie typov pracovného priestoru
```

### `open-sse/mcp-server/`

| Cesta                       | Účel                                                                           |
| --------------------------- | ------------------------------------------------------------------------------ |
| `server.ts`                 | Životný cyklus servera MCP (transporty stdio + HTTP)                           |
| `httpTransport.ts`          | Transporty HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)           |
| `audit.ts`                  | Zaznamenávanie auditu do tabuľky `mcp_tool_audit`                              |
| `scopeEnforcement.ts`       | Overovanie rozsahu pre jednotlivé nástroje                                     |
| `runtimeHeartbeat.ts`       | Signál stavu do `DATA_DIR/runtime/mcp-heartbeat.json`                          |
| `descriptionCompressor.ts`  | Komprimuje metadáta opisov nástrojov s cieľom šetriť kontext                   |
| `schemas/tools.ts`          | 36 definícií základných nástrojov + rozsahy                                    |
| `tools/advancedTools.ts`    | Implementácie pokročilých nástrojov                                            |
| `tools/memoryTools.ts`      | 3 pamäťové nástroje (vyhľadanie/pridanie/vymazanie)                            |
| `tools/skillTools.ts`       | 4 nástroje zručností (zoznam/povolenie/vykonanie/vykonania)                    |
| `tools/compressionTools.ts` | 5 kompresných nástrojov                                                        |
| `README.md`                 | Interný súbor README servera MCP (prepojený z `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Desktopový obal

| Súbor            | Účel                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`        | Hlavný proces Electronu (BrowserWindow, vstavaný server Next.js, systémová lišta, automatická aktualizácia) |
| `preload.js`     | Most IPC (contextBridge → `window.omniroute`)                                                               |
| `package.json`   | Konfigurácia electron-builder + závislosti Electron 41 + electron-builder 26.10                             |
| `assets/`        | Ikony aplikácie (Windows .ico, macOS .icns, Linux .png)                                                     |
| `dist-electron/` | Výstup zostavenia (ignorovaný systémom git)                                                                 |
| `types.d.ts`     | Deklarácie typov pre most vykresľovacieho procesu                                                           |
| `README.md`      | Interný súbor README Electronu (pozrite si aj `docs/guides/ELECTRON_GUIDE.md`)                              |

---

## `bin/` — CLI

| Súbor                                                                                                       | Účel                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Hlavný vstupný bod CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` atď. |
| `reset-password.mjs`                                                                                        | Samostatné CLI na obnovenie hesla                                                                                                 |
| `cli/commands/setup.mjs`                                                                                    | Interaktívny + neinteraktívny sprievodca nastavením                                                                               |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostika stavu systému (viac ako 8 kontrol)                                                                                    |
| `cli/commands/providers.mjs`                                                                                | Zobrazenie/otestovanie/overenie poskytovateľov                                                                                    |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Pomocné moduly CLI                                                                                                                |
| `cli/tray/tray.ts`                                                                                          | Integrácia do systémovej lišty (multiplatformová: NotifyIcon vo Windows, systray2 v macOS/Linux)                                  |
| `cli/tray/tray.ps1`                                                                                         | Backend NotifyIcon v prostredí PowerShell (Windows, bez nových binárnych súborov)                                                 |
| `cli/tray/autostart.ts`                                                                                     | Multiplatformové automatické spustenie (LaunchAgent / .desktop / register)                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-krokový reťazec vyhľadávania ovládača SQLite (zabalený → runtime → odložená inštalácia → node:sqlite → sql.js)                  |
| `cli/runtime/magicBytes.mjs`                                                                                | Overenie magických bajtov binárnych súborov (ELF / Mach-O / Mach-O fat / PE)                                                      |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — vopred vyhľadá ovládače počas postinstall / prvého spustenia                                                 |
| `nodeRuntimeSupport.mjs`                                                                                    | Overenie podporovanej verzie Node.js pri inštalácii                                                                               |

---

## `skills/` — Verejné zručnosti agentov

| Súbor                        | Účel                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestov zručností pre externých AI agentov (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripty zostavenia a kontroly

| Skript                              | Účel                                                                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Spúšťač pre vývoj/spustenie s načítaním premenných prostredia                                   |
| `build-next-isolated.mjs`           | Samostatné zostavenie (samostatný režim Next.js 16)                                             |
| `prepublish.ts`                     | Príprava balíka pred `npm pack`                                                                 |
| `postinstall.mjs`                   | Automatické vytvorenie `.env` z `.env.example` pri prvej inštalácii                             |
| `sync-env.mjs`                      | Opätovná synchronizácia kľúčov `.env` so súborom `.env.example`                                 |
| `check-cycles.mjs`                  | Detekcia cyklických závislostí                                                                  |
| `check-route-validation.mjs`        | Overenie, že všetky API trasy používajú validáciu Zod                                           |
| `check-t11-any-budget.mjs`          | Vynútenie explicitného limitu použitia `any` pre každý súbor                                    |
| `check-docs-sync.mjs`               | Overenie synchronizácie verzií dokumentácie (existujúca kontrola pred commitom)                 |
| **`check-env-doc-sync.mjs`**        | NOVÉ: krížová kontrola premenných prostredia v kóde, `.env.example` a `ENVIRONMENT.md`          |
| **`check-docs-counts-sync.mjs`**    | NOVÉ: overenie, že počty (vykonávače, stratégie, OAuth, zručnosti A2A) zodpovedajú dokumentácii |
| **`check-deprecated-versions.mjs`** | NOVÉ: označenie zastaraných verzií/dátumov v dokumentácii                                       |
| `check-supported-node-runtime.ts`   | Overenie, či je aktuálna verzia Node podporovaná                                                |
| `check-pr-test-policy.mjs`          | Vynútenie pravidla „testy sú povinné“ pri zmenách produkčného kódu                              |
| **`gen-provider-reference.ts`**     | NOVÉ: automatické generovanie `docs/reference/PROVIDER_REFERENCE.md` z katalógu                 |
| `i18n/generate-multilang.mjs`       | Preklad reťazcov používateľského rozhrania a dokumentácie cez Google Translate                  |
| `i18n_autotranslate.py`             | Proces prekladu dokumentácie založený na LLM                                                    |
| `validate_translation.py`           | Overenie prekladu pre jednotlivé lokality                                                       |
| `check_translations.py`             | Kontrola kľúčov i18n na strane kódu                                                             |
| `run-playwright-tests.mjs`          | Spúšťač E2E testov Playwright                                                                   |
| `run-protocol-clients-tests.mjs`    | Spúšťač E2E testov MCP/A2A                                                                      |
| `run-ecosystem-tests.mjs`           | Testy ekosystému (integrácie poskytovateľov)                                                    |
| `test-report-summary.mjs`           | Generovanie súhrnu pokrytia vo formáte Markdown                                                 |
| `smoke-electron-packaged.mjs`       | Základný test zabaleného zostavenia Electron                                                    |
| `native-binary-compat.mjs`          | Overenie, že natívne závislosti (`better-sqlite3`) zodpovedajú Node v Electron                  |
| `validate-pack-artifact.ts`         | Overenie výstupu balíka npm                                                                     |
| `responses-ws-proxy.mjs`            | Most WebSocket pre Codex Responses API                                                          |
| `v1-ws-bridge.mjs`                  | Most WebSocket pre koncový bod `/api/v1/ws`                                                     |
| `standalone-server-ws.mjs`          | Spúšťač samostatného servera WS                                                                 |
| `system-info.mjs`                   | Výpis informácií o systéme/behovom prostredí pre podporu                                        |
| `healthcheck.mjs`                   | Jednorazová kontrola stavu (používaná príkazom Docker HEALTHCHECK)                              |
| `uninstall.mjs`                     | Skript na čistú odinštaláciu                                                                    |

---

## `docs/` — Verejná dokumentácia (7 koreňových súborov + 17 podadresárov)

### Hlavné príručky

| Dokument                    | Účel                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architektúra na vysokej úrovni, mapa subsystémov, rozhranie dashboardu                                |
| `CODEBASE_DOCUMENTATION.md` | Technická referencia: adresáre, moduly, konvencie                                                     |
| `FEATURES.md`               | Matica funkcií s hlavnými novinkami verzie v3.8                                                       |
| `USER_GUIDE.md`             | Používateľská príručka (nastavenie, modely, kombinácie, CLI, zvuk atď.)                               |
| `API_REFERENCE.md`          | Referencia koncových bodov API s modelom autentifikácie                                               |
| `openapi.yaml`              | Špecifikácia OpenAPI 3.0 (121 ciest)                                                                  |
| `SETUP_GUIDE.md`            | Spôsoby inštalácie (npm, npx, Docker, Electron, Termux, zo zdrojového kódu)                           |
| `ENVIRONMENT.md`            | Všetky premenné prostredia (~800 zdokumentovaných, ~3 050 riadkov v `.env.example`)                   |
| `TROUBLESHOOTING.md`        | Bežné chyby + známe problémy verzie v3.8.0                                                            |
| `RELEASE_CHECKLIST.md`      | Kompletný proces vydania (skills, husky, conventional commits, nasadenie)                             |
| `COVERAGE_PLAN.md`          | Ciele pokrytia a aktuálny stav                                                                        |
| `FREE_TIERS.md`             | Spravovaný zoznam poskytovateľov bezplatných úrovní (48+ bezplatných + 11 OAuth)                      |
| `CLI-TOOLS.md`              | Externé integrácie CLI + interné CLI OmniRoute                                                        |
| `I18N.md`                   | Architektúra i18n, pridanie jazyka, 42 lokalizácií                                                    |
| `UNINSTALL.md`              | Postup čistej odinštalácie                                                                            |
| `PROVIDER_REFERENCE.md`     | **Automaticky generovaný** katalóg 355 poskytovateľov (regenerácia: `npm run gen:provider-reference`) |

### Podrobné opisy subsystémov

| Dokument                                   | Účel                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | Server MCP: 110 nástrojov, 3 prenosy, 33 rozsahov, koncové body REST                    |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 zručností, pomocné funkcie REST, karta agenta                     |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Zjednotená príručka: A2A verzus ACP verzus cloudoví agenti                              |
| `CLOUD_AGENT.md`                           | Orchestrácia Codex Cloud / Devin / Jules                                                |
| `SKILLS.md`                                | Framework zručností (vstavané + marketplace + SkillsSH + sandbox)                       |
| `RADAR.md`                                 | Prekrytie katalógu bezplatných modelov Radar (`RADAR_ENABLED`, predvolene vypnuté)      |
| `MEMORY.md`                                | Pamäťový systém (SQLite FTS5 + Qdrant)                                                  |
| `EVALS.md`                                 | Framework hodnotení (sady, spustenia, rubriky)                                          |
| `GUARDRAILS.md`                            | Maskovanie PII, vkladanie promptov, premostenie obrazu                                  |
| `COMPLIANCE.md`                            | Protokol auditu, uchovávanie, odhlásenie pomocou noLog                                  |
| `WEBHOOKS.md`                              | Doručovanie webhookov podpísaných pomocou HMAC                                          |
| `REASONING_REPLAY.md`                      | Hybridná pamäť/vyrovnávacia pamäť SQLite pre `reasoning_content`                        |
| `AUTHZ_GUIDE.md`                           | Autorizačný reťazec (`classify` → `policies` → `enforce`)                               |
| `RESILIENCE_GUIDE.md`                      | Istič + obdobie čakania + uzamknutie modelu                                             |
| `docs/security/STEALTH_GUIDE.md` (iba git) | Odtlačky TLS (JA3/JA4), Claude Code CCH, certifikát MITM                                |
| `AUTO-COMBO.md`                            | Nástroj Auto Combo (hodnotenie podľa 16 faktorov, 6 balíkov režimov, virtuálna továreň) |

### Kompresia

| Dokument                        | Účel                                             |
| ------------------------------- | ------------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Prehľad režimov kompresie + plán vývoja          |
| `COMPRESSION_ENGINES.md`        | Enginy Caveman + RTK, kontrakt registra          |
| `COMPRESSION_RULES_FORMAT.md`   | Schéma JSON balíka pravidiel Caveman             |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventár balíkov pravidiel pre jednotlivé jazyky |
| `RTK_COMPRESSION.md`            | Deklaratívny reťazec RTK (49 filtrov)            |

### Nasadenie

| Dokument                     | Účel                                                                  |
| ---------------------------- | --------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Zostavenie Docker, profily (base/cli/host/cliproxyapi), sidecar Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Všeobecné nasadenie na VM/VPS (Ubuntu/Debian + nginx + systemd)       |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Nasadenie na Fly.io (momentálne iba v čínštine)                       |
| `TERMUX_GUIDE.md`            | Android bez grafického rozhrania prostredníctvom Termux               |
| `PWA_GUIDE.md`               | Inštalácia progresívnej webovej aplikácie + service worker            |
| `ELECTRON_GUIDE.md`          | Zostavenie desktopovej aplikácie + podpisovanie + distribúcia         |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                |
| `PROXY_GUIDE.md`             | 4-úrovňový odchádzajúci proxy server + marketplace 1proxy             |

### Podadresáre

| Podadresár            | Účel                                                                                                                                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizované preklady dokumentácie (41 jazykových verzií)                                                                                                                                                               |
| `docs/screenshots/`   | Obrázkové podklady pre príručky                                                                                                                                                                                         |
| `_tasks/superpowers/` | Plány/špecifikácie zo superpowers (`writing-plans`/`brainstorming`) + výskum — izolovaný, samostatne verzovaný repozitár, ignorovaný cez git v hlavnom strome. Pozrite si CLAUDE.md → „Artefakty plánovania a výskumu“. |

---

## `tests/` — Testovacie sady

| Podadresár                           | Typ                                                 | Spúšťač                                      |
| ------------------------------------ | --------------------------------------------------- | -------------------------------------------- |
| `tests/unit/`                        | Jednotkové testy (~4 800 súborov, najrýchlejšie)    | Natívny testovací nástroj Node               |
| `tests/integration/`                 | Integračné testy viacerých modulov + DB             | Natívny testovací nástroj Node (súbežnosť 1) |
| `tests/e2e/`                         | E2E používateľského rozhrania + pracovných postupov | Playwright                                   |
| `tests/e2e/protocol-clients.test.ts` | E2E so skutočnými klientmi MCP + A2A                | Vlastné protokolové klienty                  |
| `tests/e2e/ecosystem.test.ts`        | Integrácia poskytovateľov (využíva sieť)            | Natívny testovací nástroj Node               |

---

## `public/` — Statické zdroje

| Cesta               | Účel                                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `public/` (koreň)   | Favikony, robots.txt, manifest, service worker, marketingové obrázky   |
| `public/providers/` | Logá poskytovateľov vo formáte PNG/SVG (používané na ovládacom paneli) |

---

## `config/` — Statické konfigurácie + stav kontrol kvality

Dodávané konfiguračné šablóny spolu s uloženými základnými hodnotami kontrol kvality
(presunuté sem z koreňa repozitára vo verzii v3.8.26, aby koreň zostal prehľadný).

| Cesta                                         | Účel                                                                                                |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Zoznam lokalizácií + metadáta (kanonický zdroj počtu 42 lokalizácií)                                |
| `config/i18n-schema.json`                     | Schéma JSON validujúca `i18n.json`                                                                  |
| `config/payloadRules.json`                    | Pravidlá sanitizácie dátovej časti z nadradeného zdroja                                             |
| `config/quality/quality-baseline.json`        | Základná hodnota viacmetrikovej západky (`scripts/quality/check-quality-ratchet.mjs`)               |
| `config/quality/complexity-baseline.json`     | Zafixovaná základná hodnota zložitosti ESLint (`check-complexity.mjs`)                              |
| `config/quality/duplication-baseline.json`    | Zafixovaná základná hodnota duplicity jscpd (`check-duplication.mjs`)                               |
| `config/quality/file-size-baseline.json`      | Zafixovaná základná hodnota veľkosti jednotlivých súborov (`check-file-size.mjs`)                   |
| `config/quality/test-discovery-baseline.json` | Zafixovaná základná hodnota osirelých testov (`check-test-discovery.mjs`)                           |
| `config/quality/dependency-allowlist.json`    | Zoznam povolených schválených závislostí (`check-deps.mjs`)                                         |
| `config/quality/.license-allowlist.json`      | Zoznam povolených licencií SPDX (`check-licenses.mjs`)                                              |
| `config/quality/quality-metrics.json`         | Dočasne zhromaždené metriky (generované pomocou `collect-metrics.mjs`; **ignorované systémom git**) |

---

## `.github/` — Integrácia s GitHubom

| Cesta                              | Účel                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `.github/workflows/`               | Pracovné postupy CI/CD služby GitHub Actions (lintovanie, testovanie, pokrytie, vydanie) |
| `.github/ISSUE_TEMPLATE/`          | Šablóny hlásení chýb a požiadaviek na funkcie                                            |
| `.github/pull_request_template.md` | Šablóna PR                                                                               |
| `.github/dependabot.yml`           | Konfigurácia aktualizácií závislostí                                                     |

---

## `.husky/` — Git hooky

| Súbor        | Účel                                                                        |
| ------------ | --------------------------------------------------------------------------- |
| `pre-commit` | Spúšťa `lint-staged + check-docs-sync + check:any-budget:t11`               |
| `pre-push`   | Momentálne zakázané (zakomentované). Spustite `npm run test:unit` manuálne. |
| `_/`         | Interné súčasti Husky                                                       |

---

## `.claude/` — Lomkové príkazy Claude Code

| Súbor                                               | Účel                                                            |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — zvýšenie verzie + automatický zoznam zmien |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — úplný pracovný postup vydania          |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Nasadenie na VPS                                                |
| `commands/capture-release-evidences-cc.md`          | Zaznamenanie nových funkcií v prehliadači vo formáte WebP       |
| `commands/review-{prs,discussions}-cc.md`           | Triedenie PR a diskusií na GitHube                              |
| `commands/{review-issues,implement-features}-cc.md` | Pracovné postupy pre hlásenia                                   |
| `settings.local.json`                               | Nastavenia Claude Code pre konkrétny projekt                    |

---

## `.agents/` — Všeobecné pracovné postupy agentov (Codex / Cursor / atď.)

| Cesta                    | Účel                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 definícií pracovných postupov (kópia `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definícií zručností s poznámkami k vykonávaniu v Codexe    |

> **Poznámka:** Pracovné postupy a príkazy sú momentálne identické bajt po bajte. Ak má `.agents/` cieliť na odlišné behové prostredie agenta (Codex), varianty sa musia zmysluplne líšiť.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Mimo stromu projektu

Tieto adresáre s podčiarkovníkom na začiatku obsahujú obsah, ktorý nie je súčasťou distribúcie:

- **`_ideia/`** — poznámky k návrhu (kategórie defer / notfit / viable)
- **`_mono_repo/`** — historické podprojekty (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klony súvisiacich projektov OSS určené iba na čítanie (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api atď.), slúžiace na porovnávanie počas vývoja
- **`_tasks/`** — neformálne súbory na sledovanie úloh pre jednotlivé vydania

Nie sú zahrnuté vo výstupe `npm pack`. Pozrite si `.npmignore`.

---

## Generované / ignorované systémom Git

| Cesta                  | Účel                                 |
| ---------------------- | ------------------------------------ |
| `node_modules/`        | Závislosti npm                       |
| `.next/`               | Výstup zostavenia Next.js            |
| `coverage/`            | Správy o pokrytí c8                  |
| `logs/`                | Prevádzkové protokoly                |
| `package/`             | Prípravná oblasť pre npm pack        |
| `.playwright-mcp/`     | Testovacie artefakty Playwright MCP  |
| `.issues/`             | Lokálna vyrovnávacia pamäť problémov |
| `tsconfig.tsbuildinfo` | Inkrementálna vyrovnávacia pamäť TS  |

---

## Tipy na orientáciu

- **Ste nový prispievateľ?** Prečítajte si `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Pridávate poskytovateľa?** Postupujte podľa `docs/architecture/ARCHITECTURE.md § Adding a New Provider` a overte informácie v `docs/reference/PROVIDER_REFERENCE.md`.
- **Pridávate trasu?** Pozrite si `docs/architecture/ARCHITECTURE.md § Adding a New API Route` a `src/shared/validation/schemas.ts`.
- **Pridávate nástroj MCP?** Pozrite si `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Pridávate zručnosť A2A?** Pozrite si `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Spúšťate lokálne?** Pozrite si `docs/guides/SETUP_GUIDE.md`.
- **Nasadzujete?** Pozrite si `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vydávate novú verziu?** Pozrite si `docs/ops/RELEASE_CHECKLIST.md` (a zručnosť Claude Code `/generate-release-cc`).
