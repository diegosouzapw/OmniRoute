# Repository Map (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Enovrstični opis vsakega imenika in datoteke v korenskem imeniku.**
> Nazadnje posodobljeno: 2026-06-28 — OmniRoute v3.8.40
>
> Uporabite ta zemljevid za hitro krmarjenje po kodni zbirki. Za podrobnejši pregled sledite povezavam do namenske dokumentacije.

## Drevo najvišje ravni

```
OmniRoute/
├── src/                  # Aplikacija Next.js 16 (uporabniški vmesnik + poti API + knjižnice + domena + strežnik)
├── open-sse/             # Delovni prostor pretočnega mehanizma (upravljavci, izvajalniki, prevajalnik, strežnik MCP)
├── electron/             # Namizni ovoj (Electron 41 + electron-builder 26.10)
├── bin/                  # Vstopna točka CLI in upravljavci ukazov
├── scripts/              # Skripti za gradnjo, preverjanje, sinhronizacijo in enkratna opravila
├── docs/                 # Javna dokumentacija (trenutno ste tukaj)
├── tests/                # Vsi sklopi testov (enotski, integracijski, e2e, odjemalci protokolov)
├── public/               # Statična sredstva Next.js, manifest PWA, storitveni delavec, ikone
├── config/               # Statična konfiguracija + stanje vrat kakovosti (i18n, payloadRules, quality/)
├── images/               # Slikovna sredstva za trženje / README
├── @omniroute/           # Spremljevalni paketi za objavo (opencode-plugin, opencode-provider)
├── skills/               # Paketi veščin CLI/agentov (cli-* + omni-* + config-codex-cli)
├── examples/             # Vzorčni vtičniki + začetni projekt omniroute-cmd-hello
├── contrib/              # Prispevki skupnosti (podman/)
├── .source/              # Izvorna konfiguracija Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Delovni tokovi GitHub Actions + predloge za težave + predloga za PR
├── .husky/               # Kavlji Git (pre-commit, pre-push)
├── .claude/              # Poševni ukazi Claude Code (omejeni na projekt)
├── .agents/              # Delovni tokovi + veščine za Codex / splošne agente (zrcalna kopija .claude/)
├── .vscode/              # Nastavitve delovnega prostora VS Code
├── _ideia/               # Načrtovalni zapiski (neuradni; niso vključeni v izdajo)
├── _mono_repo/           # Zgodovinski podprojekti (cloud, site, vscode-extension)
├── _references/          # Referenčni kloni sorodnih odprtokodnih projektov, namenjeni samo za branje
├── _tasks/               # Datoteke za spremljanje opravil posameznih izdaj (neuradne)
├── .build/ .worktrees/ dist/   # Lokalni začasni podatki za gradnjo / delovna drevesa Git / izhod gradnje (gitignored)
├── .issues/              # Lokalni predpomnilnik težav (gitignored)
├── .playwright-mcp/      # Artefakti testov Playwright MCP
├── coverage/             # Izhod pokritosti c8 (gitignored)
├── logs/                 # Dnevniki izvajanja (gitignored)
├── node_modules/         # Odvisnosti (gitignored)
├── package/              # Pripravljalno območje za npm pack (artefakt gradnje)
├── .next/                # Izhod gradnje Next.js (gitignored)
└── (datoteke v korenskem imeniku — glejte spodaj)
```

---

## Datoteke v korenskem imeniku

| Datoteka                                    | Namen                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **README.md**                               | Predstavitvena stran + hitri začetek + matrika funkcij (glejte tudi `llm.txt`)                   |
| **CHANGELOG.md**                            | Dnevnik sprememb za vsako izdajo (samodejno ustvarjen z veščino `/version-bump-cc`)              |
| **LICENSE**                                 | Besedilo licence MIT                                                                             |
| **CLAUDE.md**                               | Projektna pravila za agente Claude Code (stroga pravila, dogovori, scenariji)                    |
| **AGENTS.md**                               | Enako kot CLAUDE.md, vendar za agente UI, ki niso Claude (Codex, Cursor itd.)                    |
| **GEMINI.md**                               | Jedrnata pravila za agente na osnovi Gemini (podmnožica CLAUDE.md)                               |
| **CONTRIBUTING.md**                         | Vodnik za sodelujoče: nastavitev, običajne potrditve, testiranje, potek PR                       |
| **SECURITY.md**                             | Pravilnik za poročanje o ranljivostih, podprte različice, model groženj                          |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — pričakovano vedenje skupnosti                                             |
| **llm.txt**                                 | Predstavitveno besedilo, optimizirano za pregledovalnike LLM (SEO za pomočnike UI)               |
| **package.json**                            | Manifest npm, skripti, odvisnosti, izvajalna okolja, prag pokritosti c8                          |
| **package-lock.json**                       | Zaklenjeno drevo odvisnosti                                                                      |
| **tsconfig.json**                           | Korenska konfiguracija TypeScript                                                                |
| **tsconfig.typecheck-core.json**            | Konfiguracija preverjanja tipov za jedro `src/`                                                  |
| **tsconfig.typecheck-noimplicit-core.json** | Strogo preverjanje tipov (`noImplicitAny`)                                                       |
| **tsconfig.tsbuildinfo**                    | Predpomnilnik postopne gradnje TS (prezrt v sistemu Git)                                         |
| **next.config.mjs**                         | Konfiguracija gradnje Next.js 16 (samostojni izhod)                                              |
| **next-env.d.ts**                           | Samodejno ustvarjeni tipi okolja Next.js                                                         |
| **eslint.config.mjs**                       | Enotna konfiguracija ESLint (pravila glede na področje projekta)                                 |
| **prettier.config.mjs**                     | Pravila oblikovanja Prettier                                                                     |
| **postcss.config.mjs**                      | Konfiguracija PostCSS za cevovod Tailwind/CSS                                                    |
| **playwright.config.ts**                    | Konfiguracija celovitih testov Playwright                                                        |
| **vitest.config.ts**                        | Konfiguracija Vitest (privzeti nabor)                                                            |
| **vitest.mcp.config.ts**                    | Konfiguracija Vitest za strežnik MCP / zbirke autoCombo / predpomnilnika                         |
| **sonar-project.properties**                | Konfiguracija SonarQube/SonarCloud (kakovost kode)                                               |
| **Dockerfile**                              | Večstopenjska gradnja Docker (builder → runner-base → runner-cli)                                |
| **docker-compose.yml**                      | Razvojni compose s 4 profili (base, cli, host, cliproxyapi) + stranski vsebnik redis             |
| **docker-compose.prod.yml**                 | Produkcijski compose (vrata 20130, redis, imenovani nosilci)                                     |
| **.dockerignore**                           | Datoteke, izključene iz konteksta Docker                                                         |
| **fly.toml**                                | Konfiguracija namestitve Fly.io (regija `sin`, vrata 20128, nosilec /data)                       |
| **.env.example**                            | Predloga okoljske datoteke (ob prvi namestitvi samodejno kopirana v `.env`)                      |
| **.gitignore**                              | Vzorci za prezrtje v sistemu Git                                                                 |
| **.npmignore**                              | Seznam izključitev pri objavi npm                                                                |
| **.npmrc**                                  | Konfiguracija npm (register, pravilnik zaklepne datoteke)                                        |
| **.node-version**                           | Pripeta različica Node (uporabljajo jo orodja, združljiva z nvm)                                 |
| **.nvmrc**                                  | Pripeta različica Node za nvm                                                                    |
| **eslint.complexity.config.mjs**            | Konfiguracija ESLint za omejevanje kompleksnosti (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Konfiguracija ESLint za pravila SonarJS (kognitivna kompleksnost / podvajanje)                   |
| **source.config.ts**                        | Izvorna konfiguracija Fumadocs `defineDocs` (zagotavlja podatke za `.source/`)                   |
| **knip.json**                               | Konfiguracija Knip — neuporabljene datoteke/izvozi/odvisnosti (za preverjanje mrtve kode)        |
| **stryker.conf.json**                       | Konfiguracija mutacijskega testiranja Stryker                                                    |
| **.size-limit.json**                        | Konfiguracija proračuna velikosti paketa size-limit                                              |
| **promptfooconfig.yaml**                    | Konfiguracija evalvacij promptfoo                                                                |
| **.gitleaks.toml**                          | Nabor pravil gitleaks za pregled skrivnosti                                                      |
| **.zizmor.yml**                             | Konfiguracija varnostnega preverjanja GitHub Actions z orodjem zizmor                            |
| **socket.yml**                              | Konfiguracija Socket.dev za dobavno verigo                                                       |
| **news.json**                               | Lokaliziran vir obvestil v2; objava Radar je dostavljena kot neaktivna                           |
| **flake.nix** / **flake.lock**              | Definicija razvojnega okolja Nix + zaklepna datoteka                                             |
| **.env**                                    | Lokalne skrivnosti (git jih prezre — ustvarjeno iz `.env.example`)                               |

> **Premaknjeno iz korenskega imenika v različici v3.8.26 (pospravljanje):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` in ustvarjena datoteka `quality-metrics.json` (git jo prezre). Glejte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplikacija Next.js

```
src/
├── app/                 # App Router (strani + poti API + strani stanja + ciljna stran)
├── lib/                 # Osrednje knjižnice / domenski moduli (80 podimenikov + ~70 datotek na vrhnji ravni)
├── domain/              # Čista domenska logika (mehanizem pravilnikov, nadomestni mehanizem, stroški, zaklepanje, comboResolver, ocenjevanje)
├── server/              # Moduli samo za strežnik (cevovod authz, cors, vmesna programska oprema za preverjanje pristnosti) — ni jih mogoče uvoziti iz odjemalca
├── shared/              # Varno deljeno med strežnikom in odjemalcem (konstante, tipi, preverjanje veljavnosti, pogodbe, pripomočki)
├── i18n/                # konfiguracija next-intl + JSON s sporočili za posamezne področne nastavitve (42 področnih nastavitev)
├── middleware/          # Vmesna programska oprema Next.js (obogatitev zahtev, zaznavanje področnih nastavitev)
├── mitm/                # Jedro posredniškega strežnika MITM: ustvarjanje/namestitev potrdil, obdelovalniki, cilji, pregledovalnik, maske, neposredno posredovanje
│   ├── handlers/        # 9 razredov obdelovalnikov agentov IDE, ki razširjajo MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Plast za zajem prometa: medpomnilnik (krožni medpomnilnik v pomnilniku), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Povezovalna koda za prilagojevalnike modelov (starejša združljivostna plast)
├── scripts/             # Vgrajeni vzdrževalni skripti (npr. backfillAggregation)
├── sse/                 # Starejši obdelovalniki/storitve SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Starejša shramba v pomnilniku (postopoma jo nadomešča src/lib/db)
├── types/               # Datoteke tipov TS v skupni rabi
├── instrumentation.ts   # Kavelj za telemetrijo Next.js (brskalnik + robno okolje)
├── instrumentation-node.ts  # Instrumentacija samo za Node
└── proxy.ts             # Vstopna združljivostna plast posredniškega strežnika HTTP
```

### `src/app/` — App Router (Next.js 16)

| Pot                                                                          | Namen                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Javni API, združljiv z OpenAI (~25 pod-poti: klepet, dokončevanja, vdelave, datoteke, paketne obdelave, zvok, slike, videoposnetki, glasba, ponovno razvrščanje, moderiranje, iskanje, ws, agenti, računi, ponudniki itd.)                                                                                                  |
| `app/api/v1beta/`                                                            | Končne točke API-ja v slogu Gemini                                                                                                                                                                                                                                                                                          |
| `app/api/playground/`                                                        | Poti Playground Studio: `improve-prompt/` (POST — preoblikovalnik pozivov LLM), `presets/` (GET seznam / POST ustvarjanje), `presets/[id]/` (GET / PUT / DELETE) — glejte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                            |
| `app/api/` (brez v1)                                                         | Poti za upravljanje/skrbništvo (~60 imenikov: ponudniki, kombinacije, nastavitve, mcp, a2a, evalvacije, pomnilnik, veščine, spletni kavlji, skladnost, odpornost, spremljanje, tuneli, orodja CLI itd.)                                                                                                                     |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 poti (nadzor strežnika, stanje agentov/DNS/preslikave, obhod, potrdilo, nadrejeni overitelj potrdil). LOCAL_ONLY + SPAWN_CAPABLE. Glejte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                     |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API Traffic Inspector — več kot 16 poti (zahteve, seje, gostitelji, načini zajema, izvoz, ws). LOCAL_ONLY + SPAWN_CAPABLE. Glejte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                      |
| `app/a2a/`                                                                   | Vstopna točka A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                |
| `app/.well-known/agent.json/`                                                | Kartica agenta A2A (odkrivanje)                                                                                                                                                                                                                                                                                             |
| `app/(dashboard)/dashboard/`                                                 | Strani uporabniškega vmesnika nadzorne plošče (več kot 50 razdelkov, ~118 datotek page.tsx: ponudniki, kombinacije, nastavitve, pomnilnik, veščine, spletni kavlji, evalvacije, revizija, paketne obdelave, predpomnilnik, stroški, stanje, sistem, dejavnost itd.)                                                         |
| `app/(dashboard)/dashboard/search-tools/`                                    | Uporabniški vmesnik Search Tools Studio (3 zavihki: Iskanje/Pridobivanje/Primerjava + SearchConceptCard + ProviderCatalog) — glejte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (načrt 21): `page.tsx` (ogrodje s 3 zavihki), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stran nadzorne plošče AgentBridge — kartica strežnika, 9 kartic agentov, čarovnik za nastavitev, preslikava modelov, seznam obhodov. i18n PT-BR + EN. Glejte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                              |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stran nadzorne plošče Traffic Inspector — razdeljen pogled DevTools, 7 zavihkov s podrobnostmi, 4 preklopniki načinov zajema, snemalnik sej, barvno označevanje konteksta. i18n PT-BR + EN. Glejte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                  |
| `app/(dashboard)/dashboard/activity/`                                        | Stran vira dejavnosti (skupina B): `page.tsx` (strežnik) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — glejte `docs/architecture/MONITORING_SECTIONS.md`                                                                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stran za skupno rabo kvot (skupina B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                          |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stran za konfiguracijo ponudnikovega paketa (skupina B): `page.tsx` + `ProviderPlanConfigClient.tsx` — preglasitev dimenzij kvot za posamezno povezavo                                                                                                                                                                      |
| `app/docs/`                                                                  | Vdelani pregledovalnik dokumentacije (izrisuje `docs/*.md`)                                                                                                                                                                                                                                                                 |
| `app/landing/`                                                               | Trženjska ciljna stran                                                                                                                                                                                                                                                                                                      |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Strani, povezane s preverjanjem pristnosti                                                                                                                                                                                                                                                                                  |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Strani z napakami HTTP                                                                                                                                                                                                                                                                                                      |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statične strani in strani stanja                                                                                                                                                                                                                                                                                            |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Korenska postavitev, domača stran, manifest PWA, globalni CSS                                                                                                                                                                                                                                                               |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Meje za obravnavo napak                                                                                                                                                                                                                                                                                                     |

### `src/lib/` — Osrednje knjižnice (~50 modulov)

| Modul                                    | Namen                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`                                   | Upravljalnik opravil protokola A2A, veščine (5), pretočno izvajanje                                                                                                                                                                                                                                                            |
| `acp/`                                   | Register agentov CLI (lokalno odkrivanje CLI-ja — glejte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                           |
| `api/`                                   | Skupni pomožni pripomočki za API (`requireManagementAuth`, preverjanje veljavnosti)                                                                                                                                                                                                                                            |
| `auth/`                                  | Seja, zgoščevanje gesel, preverjanje veljavnosti žetonov                                                                                                                                                                                                                                                                       |
| `batches/`                               | Obravnavalniki za OpenAI Batches API                                                                                                                                                                                                                                                                                           |
| `catalog/`                               | Preverjanje veljavnosti kataloga ponudnikov z Zod + razreševanje zmogljivosti                                                                                                                                                                                                                                                  |
| `cloudAgent/`                            | Agenti v oblaku (Codex Cloud, Devin, Jules) — glejte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                          |
| `combos/`                                | Razreševanje kombinacij + pomožni pripomočki za prerazporejanje                                                                                                                                                                                                                                                                |
| `audit/`                                 | Pomožni pripomočki za vir dejavnosti: `highLevelActions.ts` (seznam dovoljenih + `isHighLevelAction()`), `activityIcons.ts` (preslikava dejanja → ikona/glagol), `timeline.ts` (groupByDay/relativeTime) — glejte `docs/architecture/MONITORING_SECTIONS.md`                                                                   |
| `compliance/`                            | Dnevnik revizij + revizija ponudnikov — glejte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                   |
| `compression/`                           | Povezovalna plast mehanizma za stiskanje (mehanizmi so v `open-sse/services/compression/`)                                                                                                                                                                                                                                     |
| `config/`                                | Pomožni pripomočki za konfiguracijo med izvajanjem                                                                                                                                                                                                                                                                             |
| `db/`                                    | Več kot 120 domenskih modulov zbirke podatkov + 168 migracij (za SQLite vedno dostopajte prek njih)                                                                                                                                                                                                                            |
| `quota/`                                 | Mehanizem za souporabo kvot: `dimensions.ts` (tipi/Zod), `types.ts` (vmesnik QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — glejte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Odjemalec kataloga brezplačnih modelov Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — glejte `docs/frameworks/RADAR.md`                                                                                                                                   |
| `display/`                               | Pomožne funkcije za oblikovanje uporabniškega vmesnika (stroški, zakasnitev itd.)                                                                                                                                                                                                                                              |
| `embeddings/`                            | Pomožne funkcije storitve za vdelave                                                                                                                                                                                                                                                                                           |
| `env/`                                   | Razčlenjevanje in preverjanje spremenljivk okolja                                                                                                                                                                                                                                                                              |
| `evals/`                                 | Ogrodje za vrednotenje (zbirke, izvajalnik, izvajalno okolje) — glejte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                              |
| `guardrails/`                            | Prikrivanje osebno določljivih podatkov, zaščita pred vrivanjem pozivov, most za vid — glejte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                    |
| `jobs/`                                  | Opravila v ozadju (podobna cronu)                                                                                                                                                                                                                                                                                              |
| `memory/`                                | Pogovorni pomnilnik (hibridni RRF s SQLite FTS5 in sqlite-vec + Qdrant druge ravni) — glejte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                       |
| `memory/embedding/`                      | Večizvorna plast za vdelave: `index.ts` (razreševalnik), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (načrt 21)                                                                                                                                                                             |
| `memory/vectorStore.ts`                  | Ovojnica za sqlite-vec v0.1.9 — groba KNN-preiskava + hibridni RRF (FTS5 + vektor, k=60). Lena inicializacija in postopno zmanjšanje funkcionalnosti, ko sqlite-vec ni na voljo. (načrt 21)                                                                                                                                    |
| `memory/reindex.ts`                      | `runReindexBatch()` — v ozadju obdela spomine z `needs_reindex=1`; kličejo jo `POST /api/memory/reindex` in pot lenega naknadnega zapolnjevanja. (načrt 21)                                                                                                                                                                    |
| `monitoring/`                            | Preverjanja stanja, oddajanje metrik                                                                                                                                                                                                                                                                                           |
| `oauth/`                                 | Tokovi OAuth/uvoza za 22 modulov ponudnikov (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                        |
| `plugins/`                               | Register vtičnikov                                                                                                                                                                                                                                                                                                             |
| `promptCache/`                           | Prelomne točke predpomnilnika pozivov po vzoru Anthropic                                                                                                                                                                                                                                                                       |
| `skills/`                                | Ogrodje za veščine (vgrajene + tržnica + SkillsSH) — glejte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                        |
| `playground/`                            | Skupni pomožni moduli za Playground Studio: `codeExport.ts` (generator za curl/Python/TS), `promptImprover.ts` (ustvarjalnik metapozivov), `streamMetrics.ts` (čisti TTFT/TPS), `types.ts` (tabela cen) — glejte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                        |
| `webhookDispatcher.ts`                   | Dostava webhookov s HMAC — glejte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Upravljalniki tunelov — glejte `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                     |
| `cloudSync.ts`, `initCloudSync.ts`       | Izbirna sinhronizacija stanja z oblakom                                                                                                                                                                                                                                                                                        |
| `localDb.ts`                             | Zbirni modul za ponovni izvoz modulov podatkovne zbirke (brez logike — samo ponovni izvozi)                                                                                                                                                                                                                                    |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Predpomnjenje zahtev + idempotentnost                                                                                                                                                                                                                                                                                          |
| (~30 dodatnih datotek na najvišji ravni) | Specializirani pomožni moduli (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                       |

### `src/lib/db/` — Podatkovna zbirka (122 modulov + 168 migracij)

| Podimenik                 | Namen                                                                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Enojček `getDbInstance()` z beleženjem WAL                                                                                                                                         |
| `db/migrations/`          | Različicirane datoteke SQL (idempotentne, transakcijske). `073_memory_vec.sql` doda `memory_vec_meta` + stolpec `needs_reindex` (načrt 21).                                        |
| `db/playgroundPresets.ts` | Modul CRUD za prednastavitve Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)      |
| `db/memoryVec.ts`         | CRUD za `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (načrt 21)                         |
| `db/<domain>.ts`          | En modul na domeno: ponudniki, kombinacije, ključi API, uporabniki, seje, uporaba, audit*log, webhooki, veščine, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache itd. |

### `src/domain/`

| Modul                  | Namen                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `policy.ts`            | Mehanizem pravilnikov                                       |
| `fallbackPolicy.ts`    | Odločitveno drevo za nadomestno možnost                     |
| `costRules.ts`         | Pravila za izračun stroškov                                 |
| `lockoutPolicy.ts`     | Pravilnik zaklepanja modela/povezave                        |
| `tagRouter.ts`         | Usmerjanje na podlagi oznak                                 |
| `comboResolver.ts`     | Razreševanje kombinacij (uporablja ga mehanizem kombinacij) |
| `modelAvailability.ts` | Preverjanje razpoložljivosti za posamezen model             |
| `assessment/`          | Ocenjevanje modela (1. faza RFC-AUTO-ASSESSMENT )           |

### `src/server/`

| Modul    | Namen                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `authz/` | Cevovod za avtorizacijo: `classify` → `policies` → `enforce` — glejte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfiguracija CORS                                                                                       |
| `auth/`  | Vmesna programska oprema za seje                                                                         |

### `src/shared/`

| Modul                            | Namen                                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 ponudnikov** z validacijo Zod (vir resnice)                                              |
| `constants/cliTools.ts`          | Register zunanjih orodij CLI                                                                   |
| `constants/routingStrategies.ts` | **19 strategij usmerjanja** s prioritetami                                                     |
| `constants/publicApiRoutes.ts`   | Poti, ki zahtevajo overjanje Bearer (v primerjavi z upravljavskim)                             |
| `constants/upstreamHeaders.ts`   | Seznam prepovedanih glav za zahteve do nadrejenih strežnikov                                   |
| `validation/schemas.ts`          | ~80 shem Zod (enotni vir resnice za pogodbe API)                                               |
| `validation/helpers.ts`          | Pomožne funkcije za validacijo Zod (`validateBody` itd.)                                       |
| `types/`                         | Skupni tipi TS                                                                                 |
| `contracts/`                     | Javne pogodbe API (uporabljene prek `files:` v `package.json`)                                 |
| `utils/circuitBreaker.ts`        | Odklopnik ponudnika (glejte `docs/architecture/RESILIENCE_GUIDE.md`)                           |
| `utils/apiAuth.ts`               | Validacija ključa API in preverjanje obsega                                                    |
| `utils/fetchTimeout.ts`          | Ovojne funkcije za časovno omejitev/prekinitev nadrejenega pridobivanja                        |
| `utils/releaseNotes.ts`          | Razčlenjevalnik zaključenih obvestil v2/starejših različic, lokalizacija in opustitev po ID-ju |

---

## `open-sse/` — Delovni prostor pretočnega mehanizma

Ločen delovni prostor npm (`@omniroute/open-sse`). Obravnava obdelavo zahtev in izvajanje ponudnikov.

```
open-sse/
├── handlers/            # 16 datotek (12 obravnavalnikov + 4 pomožne datoteke): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search itd.
├── executors/           # 67 izvajalnikov, specifičnih za ponudnike (razširjajo BaseExecutor)
├── translator/          # Pretvorniki formatov (9 za zahteve, 9 za odgovore, 9 pomožnih)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ storitvenih modulov (combo, accountFallback, autoCombo, reasoningCache, prikriti način claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM itd.)
├── mcp-server/          # Strežnik MCP (110 orodij, 3 transporti, 33 obsegov)
├── config/              # Registri ponudnikov/modelov, konfiguracija glav, vzdevki modelov
├── utils/               # Odjemalec TLS, pridobivanje/razpošiljanje prek posredniškega strežnika, omrežne pomožne funkcije
├── index.ts             # Vstopna točka delovnega prostora
├── package.json         # Manifest delovnega prostora
├── tsconfig.json        # Konfiguracija TS delovnega prostora
└── types.d.ts           # Deklaracije tipov delovnega prostora
```

### `open-sse/mcp-server/`

| Pot                         | Namen                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `server.ts`                 | Življenjski cikel strežnika MCP (transporta stdio + HTTP)                            |
| `httpTransport.ts`          | Transporta HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                 |
| `audit.ts`                  | Beleženje revizijskih dogodkov v tabelo `mcp_tool_audit`                             |
| `scopeEnforcement.ts`       | Preverjanje obsega za posamezno orodje                                               |
| `runtimeHeartbeat.ts`       | Signal stanja delovanja v `DATA_DIR/runtime/mcp-heartbeat.json`                      |
| `descriptionCompressor.ts`  | Stiskanje metapodatkov opisov orodij za prihranek konteksta                          |
| `schemas/tools.ts`          | 36 osnovnih definicij orodij + obsegi                                                |
| `tools/advancedTools.ts`    | Implementacije naprednih orodij                                                      |
| `tools/memoryTools.ts`      | 3 pomnilniška orodja (iskanje/dodajanje/brisanje)                                    |
| `tools/skillTools.ts`       | 4 orodja za veščine (seznam/omogočanje/izvajanje/izvedbe)                            |
| `tools/compressionTools.ts` | 5 orodij za stiskanje                                                                |
| `README.md`                 | Interni README strežnika MCP (navzkrižno povezan iz `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Namizni ovoj

| Datoteka         | Namen                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `main.js`        | Glavni proces Electron (BrowserWindow, vdelani strežnik Next.js, sistemski pladenj, samodejno posodabljanje) |
| `preload.js`     | Most IPC (contextBridge → `window.omniroute`)                                                                |
| `package.json`   | Konfiguracija electron-builder + odvisnosti Electron 41 + electron-builder 26.10                             |
| `assets/`        | Ikone aplikacije (Windows .ico, macOS .icns, Linux .png)                                                     |
| `dist-electron/` | Izhod gradnje (gitignored)                                                                                   |
| `types.d.ts`     | Deklaracije tipov za most upodabljalnika                                                                     |
| `README.md`      | Interni README za Electron (glejte tudi `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| Datoteka                                                                                                    | Namen                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Glavna vstopna točka CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` itd. |
| `reset-password.mjs`                                                                                        | Samostojni CLI za ponastavitev gesla                                                                                                |
| `cli/commands/setup.mjs`                                                                                    | Interaktivni in neinteraktivni čarovnik za nastavitev                                                                               |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostika stanja sistema (več kot 8 preverjanj)                                                                                   |
| `cli/commands/providers.mjs`                                                                                | Prikaz/preizkus/preverjanje ponudnikov                                                                                              |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Pomožni moduli CLI                                                                                                                  |
| `cli/tray/tray.ts`                                                                                          | Integracija s sistemsko vrstico (medplatformsko: NotifyIcon v sistemu Windows, systray2 v sistemih macOS/Linux)                     |
| `cli/tray/tray.ps1`                                                                                         | Zaledje PowerShell NotifyIcon (Windows, brez novih binarnih datotek)                                                                |
| `cli/tray/autostart.ts`                                                                                     | Medplatformski samodejni zagon (LaunchAgent / .desktop / register)                                                                  |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-stopenjska veriga razreševanja gonilnika SQLite (vgrajeni → izvajalno okolje → odložena namestitev → node:sqlite → sql.js)        |
| `cli/runtime/magicBytes.mjs`                                                                                | Preverjanje magičnih bajtov binarnih datotek (ELF / Mach-O / Mach-O fat / PE)                                                       |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — vnaprej razreši gonilnike ob naknadni namestitvi / prvem zagonu                                                |
| `nodeRuntimeSupport.mjs`                                                                                    | Preverjanje podprte različice Node.js ob namestitvi                                                                                 |

---

## `skills/` — Javne veščine agentov

| Datoteka                     | Namen                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestov veščin za zunanje agente UI (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripti za gradnjo in preverjanje

| Skript                              | Namen                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Zaganjalnik za razvoj/zagon z nalaganjem spremenljivk okolja                                            |
| `build-next-isolated.mjs`           | Samostojna gradnja (samostojni način Next.js 16)                                                        |
| `prepublish.ts`                     | Priprava paketa pred `npm pack`                                                                         |
| `postinstall.mjs`                   | Samodejno ustvarjanje `.env` iz `.env.example` ob prvi namestitvi                                       |
| `sync-env.mjs`                      | Ponovna sinhronizacija ključev `.env` z `.env.example`                                                  |
| `check-cycles.mjs`                  | Zaznavanje krožnih odvisnosti                                                                           |
| `check-route-validation.mjs`        | Preverjanje, ali imajo vse poti API validacijo Zod                                                      |
| `check-t11-any-budget.mjs`          | Uveljavljanje izrecne omejitve za `any` na posamezno datoteko                                           |
| `check-docs-sync.mjs`               | Preverjanje sinhronizacije različic dokumentacije (obstoječe preverjanje pred potrditvijo)              |
| **`check-env-doc-sync.mjs`**        | NOVO: navzkrižno preverjanje spremenljivk okolja v kodi, `.env.example` in `ENVIRONMENT.md`             |
| **`check-docs-counts-sync.mjs`**    | NOVO: preverjanje, ali se števila (izvajalniki, strategije, OAuth, veščine A2A) ujemajo z dokumentacijo |
| **`check-deprecated-versions.mjs`** | NOVO: označevanje zastarelih različic/datumov v dokumentaciji                                           |
| `check-supported-node-runtime.ts`   | Preverjanje, ali je trenutna različica Node podprta                                                     |
| `check-pr-test-policy.mjs`          | Uveljavljanje pravila »testi so obvezni« pri spremembah produkcijske kode                               |
| **`gen-provider-reference.ts`**     | NOVO: samodejno ustvarjanje `docs/reference/PROVIDER_REFERENCE.md` iz kataloga                          |
| `i18n/generate-multilang.mjs`       | Prevajanje nizov uporabniškega vmesnika in dokumentacije prek Google Translate                          |
| `i18n_autotranslate.py`             | Postopek prevajanja dokumentacije na osnovi LLM                                                         |
| `validate_translation.py`           | Preverjanje prevodov za posamezne jezikovne različice                                                   |
| `check_translations.py`             | Preverjanje ključev i18n v kodi                                                                         |
| `run-playwright-tests.mjs`          | Zaganjalnik celovitih testov Playwright                                                                 |
| `run-protocol-clients-tests.mjs`    | Zaganjalnik celovitih testov MCP/A2A                                                                    |
| `run-ecosystem-tests.mjs`           | Testi ekosistema (integracije ponudnikov)                                                               |
| `test-report-summary.mjs`           | Ustvarjanje povzetka pokritosti v obliki Markdown                                                       |
| `smoke-electron-packaged.mjs`       | Osnovni preizkus zapakirane gradnje Electron                                                            |
| `native-binary-compat.mjs`          | Preverjanje, ali se izvorne odvisnosti (`better-sqlite3`) ujemajo z različico Node v Electron           |
| `validate-pack-artifact.ts`         | Preverjanje izhoda `npm pack`                                                                           |
| `responses-ws-proxy.mjs`            | Most WebSocket za Codex Responses API                                                                   |
| `v1-ws-bridge.mjs`                  | Most WebSocket za končno točko `/api/v1/ws`                                                             |
| `standalone-server-ws.mjs`          | Zaganjalnik samostojnega strežnika WS                                                                   |
| `system-info.mjs`                   | Izpis informacij o sistemu/izvajalnem okolju za podporo                                                 |
| `healthcheck.mjs`                   | Enkratno preverjanje stanja (uporablja ga Docker HEALTHCHECK)                                           |
| `uninstall.mjs`                     | Skript za čisto odstranitev                                                                             |

---

## `docs/` — Javna dokumentacija (7 korenskih datotek + 17 podimenikov)

### Vodniki na najvišji ravni

| Dokument                    | Namen                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Visokonivojska arhitektura, zemljevid podsistemov, površina nadzorne plošče                         |
| `CODEBASE_DOCUMENTATION.md` | Razvojna referenca: imeniki, moduli, konvencije                                                     |
| `FEATURES.md`               | Matrika funkcij s poudarki različice v3.8                                                           |
| `USER_GUIDE.md`             | Priročnik za končne uporabnike (nastavitev, modeli, kombinacije, CLI-ji, zvok itd.)                 |
| `API_REFERENCE.md`          | Referenca končnih točk API-ja z modelom preverjanja pristnosti                                      |
| `openapi.yaml`              | Specifikacija OpenAPI 3.0 (121 poti)                                                                |
| `SETUP_GUIDE.md`            | Načini namestitve (npm, npx, Docker, Electron, Termux, izvorna koda)                                |
| `ENVIRONMENT.md`            | Vse okoljske spremenljivke (~800 dokumentiranih, ~3.050 vrstic v `.env.example`)                    |
| `TROUBLESHOOTING.md`        | Pogoste napake + znane težave različice v3.8.0                                                      |
| `RELEASE_CHECKLIST.md`      | Celoten potek izdaje (veščine, husky, običajne objave, uvedba)                                      |
| `COVERAGE_PLAN.md`          | Cilji pokritosti in trenutno stanje                                                                 |
| `FREE_TIERS.md`             | Izbrani ponudniki brezplačnih paketov (48+ brezplačnih + 11 OAuth)                                  |
| `CLI-TOOLS.md`              | Zunanje integracije CLI + notranji CLI OmniRoute                                                    |
| `I18N.md`                   | Arhitektura i18n, dodajanje jezika, 42 krajevnih nastavitev                                         |
| `UNINSTALL.md`              | Koraki za čisto odstranitev                                                                         |
| `PROVIDER_REFERENCE.md`     | **Samodejno ustvarjen** katalog 355 ponudnikov (ponovna izdelava: `npm run gen:provider-reference`) |

### Poglobljeni pregledi podsistemov

| Dokument                                    | Namen                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `MCP-SERVER.md`                             | Strežnik MCP: 110 orodij, 3 transporti, 33 obsegov, končne točke REST                      |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 veščin, pomočniki REST, kartica agenta                               |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Enoten vodnik: A2A v primerjavi z ACP in Cloud Agents                                      |
| `CLOUD_AGENT.md`                            | Orkestracija Codex Cloud / Devin / Jules                                                   |
| `SKILLS.md`                                 | Ogrodje veščin (vgrajene + tržnica + SkillsSH + peskovnik)                                 |
| `RADAR.md`                                  | Prekrivna plast kataloga brezplačnih modelov Radar (`RADAR_ENABLED`, privzeto izklopljeno) |
| `MEMORY.md`                                 | Pomnilniški sistem (SQLite FTS5 + Qdrant)                                                  |
| `EVALS.md`                                  | Ogrodje za vrednotenje (zbirke, zagoni, merila)                                            |
| `GUARDRAILS.md`                             | Prikrivanje osebnih podatkov, vrivanje pozivov, most za vid                                |
| `COMPLIANCE.md`                             | Revizijski dnevnik, hramba, možnost izključitve noLog                                      |
| `WEBHOOKS.md`                               | Dostava webhookov, podpisanih s HMAC                                                       |
| `REASONING_REPLAY.md`                       | Hibridni pomnilnik/predpomnilnik SQLite za `reasoning_content`                             |
| `AUTHZ_GUIDE.md`                            | Potek avtorizacije (`classify` → `policies` → `enforce`)                                   |
| `RESILIENCE_GUIDE.md`                       | Odklopnik + obdobje mirovanja + zaklep modela                                              |
| `docs/security/STEALTH_GUIDE.md` (samo git) | Prstni odtisi TLS (JA3/JA4), Claude Code CCH, potrdilo MITM                                |
| `AUTO-COMBO.md`                             | Mehanizem Auto Combo (16-faktorsko točkovanje, 6 paketov načinov, virtualna tovarna)       |

### Stiskanje

| Dokument                        | Namen                                     |
| ------------------------------- | ----------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Pregled načinov stiskanja + načrt razvoja |
| `COMPRESSION_ENGINES.md`        | Mehanizma Caveman + RTK, pogodba registra |
| `COMPRESSION_RULES_FORMAT.md`   | Shema JSON za paket pravil Caveman        |
| `COMPRESSION_LANGUAGE_PACKS.md` | Popis paketov pravil po jezikih           |
| `RTK_COMPRESSION.md`            | Deklarativni cevovod RTK (49 filtrov)     |

### Uvedba

| Dokument                     | Namen                                                                       |
| ---------------------------- | --------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Gradnja Docker, profili (base/cli/host/cliproxyapi), stranski vsebnik Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Splošna uvedba VM/VPS (Ubuntu/Debian + nginx + systemd)                     |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Uvedba Fly.io (trenutno samo v kitajščini)                                  |
| `TERMUX_GUIDE.md`            | Android brez grafičnega vmesnika prek Termuxa                               |
| `PWA_GUIDE.md`               | Namestitev progresivne spletne aplikacije + storitveni delavec              |
| `ELECTRON_GUIDE.md`          | Gradnja + podpisovanje + distribucija namizne aplikacije                    |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                      |
| `PROXY_GUIDE.md`             | 4-stopenjski izhodni posredniški strežnik + tržnica 1proxy                  |

### Podimeniki

| Podimenik             | Namen                                                                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizirani prevodi dokumentacije (41 jezikovnih različic)                                                                                                                                                            |
| `docs/screenshots/`   | Slikovna sredstva za vodnike                                                                                                                                                                                           |
| `_tasks/superpowers/` | Načrti/specifikacije iz superpowers (`writing-plans`/`brainstorming`) + raziskave — izoliran repozitorij z ločenim različicami, ki ga glavno drevo Git prezre. Glejte CLAUDE.md → »Artefakti načrtovanja in raziskav«. |

---

## `tests/` — Testne zbirke

| Podimenik                            | Vrsta                                                | Izvajalnik                                   |
| ------------------------------------ | ---------------------------------------------------- | -------------------------------------------- |
| `tests/unit/`                        | Testi enot (~4.800 datotek, najhitrejši)             | Izvorni izvajalnik testov Node               |
| `tests/integration/`                 | Integracijski testi več modulov in zbirke podatkov   | Izvorni izvajalnik testov Node (sočasnost 1) |
| `tests/e2e/`                         | Celoviti testi uporabniškega vmesnika in poteka dela | Playwright                                   |
| `tests/e2e/protocol-clients.test.ts` | Celoviti testi MCP in A2A z dejanskimi odjemalci     | Odjemalci protokolov po meri                 |
| `tests/e2e/ecosystem.test.ts`        | Integracija ponudnikov (z dostopom do omrežja)       | Izvorni izvajalnik testov Node               |

---

## `public/` — Statična sredstva

| Pot                 | Namen                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| `public/` (koren)   | Ikone spletnega mesta, robots.txt, manifest, storitveni delavec, trženjske slike |
| `public/providers/` | Logotipi ponudnikov PNG/SVG (uporabljeni na nadzorni plošči)                     |

---

## `config/` — Statične konfiguracije in stanje preverjanj kakovosti

Predloge konfiguracij, vključene v distribucijo, ter potrjena izhodiščna stanja preverjanj kakovosti
(premeščena sem iz korena repozitorija v različici v3.8.26, da koren ostane pregleden).

| Pot                                           | Namen                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Seznam jezikovnih nastavitev in metapodatki (kanonični vir za število 42 jezikovnih nastavitev) |
| `config/i18n-schema.json`                     | Shema JSON za preverjanje datoteke `i18n.json`                                                  |
| `config/payloadRules.json`                    | Pravila za čiščenje koristnih vsebin iz izvornih sistemov                                       |
| `config/quality/quality-baseline.json`        | Izhodiščno stanje večmetričnega zategovanja (`scripts/quality/check-quality-ratchet.mjs`)       |
| `config/quality/complexity-baseline.json`     | Zamrznjeno izhodiščno stanje kompleksnosti ESLint (`check-complexity.mjs`)                      |
| `config/quality/duplication-baseline.json`    | Zamrznjeno izhodiščno stanje podvajanja jscpd (`check-duplication.mjs`)                         |
| `config/quality/file-size-baseline.json`      | Zamrznjeno izhodiščno stanje velikosti posameznih datotek (`check-file-size.mjs`)               |
| `config/quality/test-discovery-baseline.json` | Zamrznjeno izhodiščno stanje osirotelih testov (`check-test-discovery.mjs`)                     |
| `config/quality/dependency-allowlist.json`    | Seznam dovoljenih odobrenih odvisnosti (`check-deps.mjs`)                                       |
| `config/quality/.license-allowlist.json`      | Seznam dovoljenih licenc SPDX (`check-licenses.mjs`)                                            |
| `config/quality/quality-metrics.json`         | Začasno zbrane metrike (ustvari jih `collect-metrics.mjs`; **gitignored**)                      |

---

## `.github/` — Integracija z GitHubom

| Pot                                | Namen                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| `.github/workflows/`               | Delovni tokovi CI/CD za GitHub Actions (lint, testiranje, pokritost, izdaja) |
| `.github/ISSUE_TEMPLATE/`          | Predloge za prijavo napak in predloge funkcionalnosti                        |
| `.github/pull_request_template.md` | Predloga za PR                                                               |
| `.github/dependabot.yml`           | Konfiguracija posodabljanja odvisnosti                                       |

---

## `.husky/` — Git hooks

| Datoteka     | Namen                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| `pre-commit` | Zažene `lint-staged + check-docs-sync + check:any-budget:t11`             |
| `pre-push`   | Trenutno onemogočeno (zakomentirano). Ročno zaženite `npm run test:unit`. |
| `_/`         | Notranje datoteke Huskyja                                                 |

---

## `.claude/` — Poševni ukazi za Claude Code

| Datoteka                                            | Namen                                                                |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — zvišanje različice + samodejni dnevnik sprememb |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — celoten delovni tok izdaje                  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Namestitev na VPS                                                    |
| `commands/capture-release-evidences-cc.md`          | Snemanje novih funkcionalnosti v brskalniku kot WebP                 |
| `commands/review-{prs,discussions}-cc.md`           | Razvrščanje GitHubovih PR-jev/razprav                                |
| `commands/{review-issues,implement-features}-cc.md` | Delovni tokovi za težave                                             |
| `settings.local.json`                               | Nastavitve Claude Code za posamezen projekt                          |

---

## `.agents/` — Splošni delovni tokovi agentov (Codex / Cursor / itd.)

| Pot                      | Namen                                                    |
| ------------------------ | -------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definicij delovnih tokov (zrcalo `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definicij veščin z opombami o izvajanju v Codexu       |

> **Opomba:** Delovni tokovi in ukazi so trenutno identični bajt za bajtom. Če je `.agents/` namenjen drugemu izvajalnemu okolju agentov (Codex), se morajo različice smiselno razlikovati.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Zunaj drevesa

Ti imeniki s podčrtajem na začetku vsebujejo vsebino, ki ni vključena v distribucijo:

- **`_ideia/`** — opombe o zasnovi (kategorije defer / notfit / viable)
- **`_mono_repo/`** — zgodovinski podprojekti (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — kloni povezanih odprtokodnih projektov samo za branje (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api itd.) za navzkrižno preverjanje med razvojem
- **`_tasks/`** — datoteke za neformalno spremljanje opravil za posamezne izdaje

Ni vključeno v izhod `npm pack`. Glejte `.npmignore`.

---

## Ustvarjeno / prezrto v Gitu

| Pot                    | Namen                                       |
| ---------------------- | ------------------------------------------- |
| `node_modules/`        | Odvisnosti npm                              |
| `.next/`               | Izhod gradnje Next.js                       |
| `coverage/`            | Poročila o pokritosti c8                    |
| `logs/`                | Dnevniki izvajanja                          |
| `package/`             | Pripravljalno območje za npm pack           |
| `.playwright-mcp/`     | Preskusni artefakti Playwright MCP          |
| `.issues/`             | Lokalni predpomnilnik težav                 |
| `tsconfig.tsbuildinfo` | Predpomnilnik inkrementalnega prevajanja TS |

---

## Nasveti za navigacijo

- **Ste novi sodelavec?** Preberite `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Dodajate ponudnika?** Sledite razdelku `docs/architecture/ARCHITECTURE.md § Adding a New Provider` in navzkrižno preverite `docs/reference/PROVIDER_REFERENCE.md`.
- **Dodajate pot?** Oglejte si `docs/architecture/ARCHITECTURE.md § Adding a New API Route` in `src/shared/validation/schemas.ts`.
- **Dodajate orodje MCP?** Oglejte si `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Dodajate veščino A2A?** Oglejte si `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Zaganjate lokalno?** Oglejte si `docs/guides/SETUP_GUIDE.md`.
- **Uvajate?** Oglejte si `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Objavljate izdajo?** Oglejte si `docs/ops/RELEASE_CHECKLIST.md` (in veščino Claude Code `/generate-release-cc`).
