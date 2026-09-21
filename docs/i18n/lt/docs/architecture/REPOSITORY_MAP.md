# Repository Map (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Kiekvieno katalogo ir šakninio failo vienos eilutės aprašymas.**
> Paskutinį kartą atnaujinta: 2026-06-28 — OmniRoute v3.8.40
>
> Naudokite šį žemėlapį, kad galėtumėte greitai naršyti kodo bazėje. Norėdami įsigilinti, sekite nuorodas į specializuotą dokumentaciją.

## Aukščiausio lygio medis

```
OmniRoute/
├── src/                  # Next.js 16 programa (NS + API maršrutai + bibliotekos + domenas + serveris)
├── open-sse/             # Srautinio perdavimo variklio darbo sritis (apdorojimo programos, vykdyklės, vertimo priemonė, MCP serveris)
├── electron/             # Darbalaukio apvalkalas (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI pradinis taškas ir komandų apdorojimo programos
├── scripts/              # Kompiliavimo, tikrinimo, sinchronizavimo ir vienkartiniai scenarijai
├── docs/                 # Viešoji dokumentacija (esate čia)
├── tests/                # Visi testų rinkiniai (vienetų, integraciniai, e2e, protokolų klientų)
├── public/               # Next.js statiniai ištekliai, PWA manifestas, tarnybinė programa, piktogramos
├── config/               # Statinė konfigūracija + kokybės vartų būsena (i18n, payloadRules, quality/)
├── images/               # Rinkodaros / README vaizdų ištekliai
├── @omniroute/           # Publikuojami papildomi paketai (opencode-plugin, opencode-provider)
├── skills/               # CLI / agentų įgūdžių paketai (cli-* + omni-* + config-codex-cli)
├── examples/             # Papildinių pavyzdžiai + omniroute-cmd-hello pradinis šablonas
├── contrib/              # Bendruomenės indėliai (podman/)
├── .source/              # Fumadocs šaltinio konfigūracija (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions darbo eigos + problemų šablonai + PR šablonas
├── .husky/               # Git kabliukai (pre-commit, pre-push)
├── .claude/              # Claude Code pasvirojo brūkšnio komandos (projekto apimties)
├── .agents/              # Codex / bendrosios agentų darbo eigos + įgūdžiai (.claude/ kopija)
├── .vscode/              # VS Code darbo srities nustatymai
├── _ideia/               # Planavimo pastabos (neformalios; nepristatoma)
├── _mono_repo/           # Istoriniai paprojekčiai (cloud, site, vscode-extension)
├── _references/          # Tik skaitomos susijusių OSS projektų etaloninės kopijos
├── _tasks/               # Atskirų leidimų užduočių stebėjimo failai (neformalūs)
├── .build/ .worktrees/ dist/   # vietinės kompiliavimo / git-worktree / kompiliavimo išvesties laikinosios sritys (gitignored)
├── .issues/              # Vietinė problemų podėlio kopija (gitignored)
├── .playwright-mcp/      # Playwright MCP testų artefaktai
├── coverage/             # c8 aprėpties išvestis (gitignored)
├── logs/                 # Vykdymo žurnalai (gitignored)
├── node_modules/         # Priklausomybės (gitignored)
├── package/              # npm pack parengimo sritis (kompiliavimo artefaktas)
├── .next/                # Next.js kompiliavimo išvestis (gitignored)
└── (šakniniai failai — žr. toliau)
```

---

## Šakniniai failai

| Failas                                      | Paskirtis                                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Rinkodaros pradinis puslapis + greitoji pradžia + funkcijų matrica (taip pat žr. `llm.txt`)                |
| **CHANGELOG.md**                            | Kiekvienos laidos pakeitimų žurnalas (automatiškai generuojamas naudojant `/version-bump-cc` įgūdį)        |
| **LICENSE**                                 | MIT licencijos tekstas                                                                                     |
| **CLAUDE.md**                               | Projekto taisyklės Claude Code agentams (griežtos taisyklės, susitarimai, scenarijai)                      |
| **AGENTS.md**                               | Tas pats kaip CLAUDE.md, bet ne Claude DI agentams (Codex, Cursor ir kt.)                                  |
| **GEMINI.md**                               | Glaustos taisyklės Gemini pagrindu veikiantiems agentams (CLAUDE.md poaibis)                               |
| **CONTRIBUTING.md**                         | Pagalbininkų vadovas: sąranka, sutartiniai commit pranešimai, testavimas, PR eiga                          |
| **SECURITY.md**                             | Pažeidžiamumų pranešimo politika, palaikomos versijos, grėsmių modelis                                     |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — bendruomenės elgesio lūkesčiai                                                      |
| **llm.txt**                                 | Paprastojo teksto pradinis puslapis, optimizuotas LLM tikrintuvams (SEO DI asistentams)                    |
| **package.json**                            | npm manifestas, scenarijai, priklausomybės, varikliai, c8 aprėpties slenkstis                              |
| **package-lock.json**                       | Užfiksuotas priklausomybių medis                                                                           |
| **tsconfig.json**                           | Šakninis TypeScript konfigūracijos failas                                                                  |
| **tsconfig.typecheck-core.json**            | `src/` branduolio tipų tikrinimo konfigūracija                                                             |
| **tsconfig.typecheck-noimplicit-core.json** | Griežtas (`noImplicitAny`) tipų tikrinimas                                                                 |
| **tsconfig.tsbuildinfo**                    | TS prieauginio komponavimo podėlis (neįtraukiamas į git)                                                   |
| **next.config.mjs**                         | Next.js 16 komponavimo konfigūracija (autonominė išvestis)                                                 |
| **next-env.d.ts**                           | Next.js automatiškai sugeneruoti aplinkos tipai                                                            |
| **eslint.config.mjs**                       | ESLint plokščioji konfigūracija (taisyklės pagal projekto sritį)                                           |
| **prettier.config.mjs**                     | Prettier formatavimo taisyklės                                                                             |
| **postcss.config.mjs**                      | PostCSS konfigūracija, skirta Tailwind/CSS konvejeriui                                                     |
| **playwright.config.ts**                    | Playwright E2E testų konfigūracija                                                                         |
| **vitest.config.ts**                        | Vitest konfigūracija (numatytasis testų rinkinys)                                                          |
| **vitest.mcp.config.ts**                    | Vitest konfigūracija, skirta MCP serverio / autoCombo / podėlio testų rinkiniams                           |
| **sonar-project.properties**                | SonarQube/SonarCloud konfigūracija (kodo kokybė)                                                           |
| **Dockerfile**                              | Daugiapakopis Docker komponavimas (builder → runner-base → runner-cli)                                     |
| **docker-compose.yml**                      | Kūrimo compose konfigūracija su 4 profiliais (base, cli, host, cliproxyapi) ir redis pagalbine tarnyba     |
| **docker-compose.prod.yml**                 | Produkcinė compose konfigūracija (prievadas 20130, redis, vardiniai tomai)                                 |
| **.dockerignore**                           | Failai, neįtraukiami į Docker kontekstą                                                                    |
| **fly.toml**                                | Fly.io diegimo konfigūracija (regionas `sin`, prievadas 20128, /data tomas)                                |
| **.env.example**                            | Aplinkos failo šablonas (pirmą kartą diegiant automatiškai nukopijuojamas į `.env`)                        |
| **.gitignore**                              | Git ignoravimo šablonai                                                                                    |
| **.npmignore**                              | npm publikavimo išimčių sąrašas                                                                            |
| **.npmrc**                                  | npm konfigūracija (registras, užrakinimo failo politika)                                                   |
| **.node-version**                           | Užfiksuota Node versija (naudojama su nvm suderinamų įrankių)                                              |
| **.nvmrc**                                  | Užfiksuota Node versija, skirta nvm                                                                        |
| **eslint.complexity.config.mjs**            | ESLint konfigūracija sudėtingumo kartelės mechanizmui (`scripts/check/check-complexity.mjs --config`)      |
| **eslint.sonarjs.config.mjs**               | ESLint konfigūracija SonarJS taisyklėms (kognityvinis sudėtingumas / dubliavimas)                          |
| **source.config.ts**                        | Fumadocs `defineDocs` šaltinio konfigūracija (teikia duomenis `.source/`)                                  |
| **knip.json**                               | Knip konfigūracija — nenaudojami failai / eksportai / priklausomybės (naudojama neaktyvaus kodo patikroje) |
| **stryker.conf.json**                       | Stryker mutacinio testavimo konfigūracija                                                                  |
| **.size-limit.json**                        | size-limit paketo dydžio biudžeto konfigūracija                                                            |
| **promptfooconfig.yaml**                    | promptfoo vertinimo konfigūracija                                                                          |
| **.gitleaks.toml**                          | gitleaks paslapčių nuskaitymo taisyklių rinkinys                                                           |
| **.zizmor.yml**                             | zizmor GitHub-Actions saugumo analizės konfigūracija                                                       |
| **socket.yml**                              | Socket.dev tiekimo grandinės konfigūracija                                                                 |
| **news.json**                               | Lokalizuotas v2 pranešimų srautas; Radar paleidimo elementas pateikiamas neaktyvus                         |
| **flake.nix** / **flake.lock**              | Nix kūrimo aplinkos apibrėžtis ir užrakto failas                                                           |
| **.env**                                    | Vietinės paslaptys (git ignoruojamas — sugeneruotas iš `.env.example`)                                     |

> **Pašalinta iš šakninio katalogo v3.8.26 versijoje (struktūrai supaprastinti):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` ir sugeneruotas `quality-metrics.json` (git ignoruojamas). Žr. [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js programa

```
src/
├── app/                 # App Router (puslapiai + API maršrutai + būsenos puslapiai + nukreipimo puslapis)
├── lib/                 # Pagrindinės bibliotekos / domeno moduliai (80 poaplankių + ~70 aukščiausio lygio failų)
├── domain/              # Grynoji domeno logika (taisyklių variklis, atsarginis mechanizmas, sąnaudos, blokavimas, comboResolver, vertinimas)
├── server/              # Tik serveriui skirti moduliai (autorizavimo konvejeris, cors, autentifikavimo tarpinė programinė įranga) — negalima importuoti iš kliento
├── shared/              # Kai saugu, bendrai naudojama serveryje ir kliente (konstantos, tipai, validavimas, kontraktai, pagalbinės funkcijos)
├── i18n/                # next-intl konfigūracija + kiekvienai lokalei skirti pranešimų JSON failai (42 lokalės)
├── middleware/          # Next.js tarpinė programinė įranga (užklausų papildymas, lokalės aptikimas)
├── mitm/                # MITM tarpinio serverio branduolys: sertifikatų generavimas / diegimas, tvarkytuvai, paskirties objektai, inspektorius, kaukės, tiesioginis perdavimas
│   ├── handlers/        # 9 IDE agentų tvarkytuvų klasės, išplečiančios MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Srauto fiksavimo sluoksnis: buferis (atmintyje esantis žiedinis buferis), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Modelių adapterių susiejimo kodas (senesnio suderinamumo tarpinis sluoksnis)
├── scripts/             # Projekte esantys priežiūros scenarijai (pvz., backfillAggregation)
├── sse/                 # Senesni SSE tvarkytuvai / paslaugos (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Senesnė atmintyje esanti saugykla (palaipsniui keičiama į src/lib/db)
├── types/               # Bendrinami TS tipų failai
├── instrumentation.ts   # Next.js telemetrijos mechanizmas (naršyklė + edge)
├── instrumentation-node.ts  # Tik Node skirta instrumentacija
└── proxy.ts             # HTTP tarpinio serverio pradinis suderinamumo sluoksnis
```

### `src/app/` — App Router (Next.js 16)

| Kelias                                                                       | Paskirtis                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Viešoji su OpenAI suderinama API (~25 antriniai maršrutai: pokalbiai, užbaigimai, įterpiniai, failai, paketai, garsas, vaizdai, vaizdo įrašai, muzika, perrikiavimas, moderavimas, paieška, ws, agentai, paskyros, teikėjai ir kt.)                                                                                              |
| `app/api/v1beta/`                                                            | Gemini stiliaus API galiniai taškai                                                                                                                                                                                                                                                                                              |
| `app/api/playground/`                                                        | „Playground Studio“ maršrutai: `improve-prompt/` (POST — LLM užklausos perrašymo priemonė), `presets/` (GET sąrašui gauti / POST sukurti), `presets/[id]/` (GET / PUT / DELETE) — žr. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                     |
| `app/api/` (ne v1)                                                           | Valdymo / administravimo maršrutai (~60 katalogų: teikėjai, deriniai, nustatymai, mcp, a2a, vertinimai, atmintis, įgūdžiai, saityno iškvietos, atitiktis, atsparumas, stebėsena, tuneliai, CLI įrankiai ir kt.)                                                                                                                  |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 maršrutų (serverio valdymas, agento būsena / DNS / susiejimai, apėjimas, sertifikatas, aukštesniojo lygmens CA). LOCAL_ONLY + SPAWN_CAPABLE. Žr. `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ maršrutų (užklausos, seansai, pagrindiniai kompiuteriai, fiksavimo režimai, eksportavimas, ws). LOCAL_ONLY + SPAWN_CAPABLE. Žr. `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                 |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 įvesties taškas (`POST /a2a`)                                                                                                                                                                                                                                                                                   |
| `app/.well-known/agent.json/`                                                | A2A agento kortelė (aptikimui)                                                                                                                                                                                                                                                                                                   |
| `app/(dashboard)/dashboard/`                                                 | Valdymo skydelio UI puslapiai (50+ skyrių, ~118 page.tsx failų: teikėjai, deriniai, nustatymai, atmintis, įgūdžiai, saityno iškvietos, vertinimai, auditas, paketai, podėlis, sąnaudos, būklė, sistema, veikla ir kt.)                                                                                                           |
| `app/(dashboard)/dashboard/search-tools/`                                    | „Search Tools Studio“ UI (3 skirtukai: paieška / duomenų išgavimas / palyginimas + SearchConceptCard + ProviderCatalog) — žr. `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                           |
| `app/(dashboard)/dashboard/memory/`                                          | „Memory Studio“ (21 planas): `page.tsx` (3 skirtukų apvalkalas), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge valdymo skydelio puslapis — serverio kortelė, 9 agentų kortelės, sąrankos vediklis, modelių susiejimas, apėjimo sąrašas. Internacionalizacija PT-BR + EN. Žr. `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                      |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector valdymo skydelio puslapis — padalytas „DevTools“ rodinys, 7 išsamios informacijos skirtukai, 4 fiksavimo režimų jungikliai, seansų įrašymo priemonė, kontekstinis spalvinimas. Internacionalizacija PT-BR + EN. Žr. `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                    |
| `app/(dashboard)/dashboard/activity/`                                        | Veiklos srauto puslapis (B grupė): `page.tsx` (serverio) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — žr. `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                    |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvotų bendrinimo puslapis (B grupė): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                 |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Teikėjo plano konfigūracijos puslapis (B grupė): `page.tsx` + `ProviderPlanConfigClient.tsx` — kiekvieno ryšio kvotų dimensijų perrašymas                                                                                                                                                                                        |
| `app/docs/`                                                                  | Integruota dokumentacijos peržiūros priemonė (atvaizduoja `docs/*.md`)                                                                                                                                                                                                                                                           |
| `app/landing/`                                                               | Rinkodaros nukreipimo puslapis                                                                                                                                                                                                                                                                                                   |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Su autentifikavimu susiję puslapiai                                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP klaidų puslapiai                                                                                                                                                                                                                                                                                                            |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statiniai / būsenos puslapiai                                                                                                                                                                                                                                                                                                    |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Šakninis išdėstymas, pradinis puslapis, PWA manifestas, visuotinis CSS                                                                                                                                                                                                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Klaidų ribos                                                                                                                                                                                                                                                                                                                     |

### `src/lib/` — Pagrindinės bibliotekos (~50 modulių)

| Modulis                                  | Paskirtis                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokolo užduočių tvarkytuvė, gebėjimai (5), srautinis perdavimas                                                                                                                                                                                                                                                      |
| `acp/`                                   | CLI agentų registras (vietinis CLI aptikimas — žr. `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                              |
| `api/`                                   | Bendrinami API pagalbiniai įrankiai (`requireManagementAuth`, validavimas)                                                                                                                                                                                                                                                  |
| `auth/`                                  | Seansai, slaptažodžių maiša, prieigos raktų validavimas                                                                                                                                                                                                                                                                     |
| `batches/`                               | OpenAI Batches API apdorojimo priemonės                                                                                                                                                                                                                                                                                     |
| `catalog/`                               | Teikėjų katalogo Zod validavimas ir galimybių nustatymas                                                                                                                                                                                                                                                                    |
| `cloudAgent/`                            | Debesijos agentai (Codex Cloud, Devin, Jules) — žr. `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                        |
| `combos/`                                | Derinių nustatymo ir pertvarkymo pagalbiniai įrankiai                                                                                                                                                                                                                                                                       |
| `audit/`                                 | Veiklos srauto pagalbiniai įrankiai: `highLevelActions.ts` (leidžiamųjų sąrašas ir `isHighLevelAction()`), `activityIcons.ts` (veiksmo → piktogramos / veiksmažodžio susiejimas), `timeline.ts` (groupByDay/relativeTime) — žr. `docs/architecture/MONITORING_SECTIONS.md`                                                  |
| `compliance/`                            | Audito žurnalas ir teikėjų auditas — žr. `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                      |
| `compression/`                           | Glaudinimo variklių integracinis sluoksnis (varikliai yra `open-sse/services/compression/`)                                                                                                                                                                                                                                 |
| `config/`                                | Vykdymo aplinkos konfigūracijos pagalbiniai įrankiai                                                                                                                                                                                                                                                                        |
| `db/`                                    | Daugiau nei 120 sričiai skirtų DB modulių ir 168 migracijos (darbui su SQLite visada naudokite šį modulį)                                                                                                                                                                                                                   |
| `quota/`                                 | Kvotų bendrinimo variklis: `dimensions.ts` (tipai / Zod), `types.ts` (QuotaStore sąsaja), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — žr. `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | „Radar“ nemokamų modelių katalogo klientas: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — žr. `docs/frameworks/RADAR.md`                                                                                                                                     |
| `display/`                               | Naudotojo sąsajos formatavimo pagalbinės priemonės (kaina, delsa ir kt.)                                                                                                                                                                                                                                                    |
| `embeddings/`                            | Įterpinių paslaugos pagalbinės priemonės                                                                                                                                                                                                                                                                                    |
| `env/`                                   | Aplinkos kintamųjų analizavimas ir tikrinimas                                                                                                                                                                                                                                                                               |
| `evals/`                                 | Vertinimo sistema (rinkiniai, vykdyklė, vykdymo aplinka) — žr. `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                   |
| `guardrails/`                            | Asmens duomenų maskavimas, raginimų injekcijos aptikimas, vaizdų tiltas — žr. `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                 |
| `jobs/`                                  | Foninės užduotys (panašios į cron)                                                                                                                                                                                                                                                                                          |
| `memory/`                                | Pokalbių atmintis (SQLite FTS5 + sqlite-vec hibridinis RRF + Qdrant 2 lygis) — žr. `docs/frameworks/MEMORY.md`                                                                                                                                                                                                              |
| `memory/embedding/`                      | Kelių šaltinių įterpinių sluoksnis: `index.ts` (sprendiklis), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (21 planas)                                                                                                                                                                    |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 apvalkalas — KNN pilnoji paieška + hibridinis RRF (FTS5 + vektorius, k=60). Atidėtoji inicijacija; kai sqlite-vec nepasiekiamas, funkcionalumas palaipsniui apribojamas. (21 planas)                                                                                                                      |
| `memory/reindex.ts`                      | `runReindexBatch()` — fone apdoroja atminties įrašus, kurių `needs_reindex=1`; iškviečiama per `POST /api/memory/reindex` ir atidėtojo retrospektyvaus užpildymo kelią. (21 planas)                                                                                                                                         |
| `monitoring/`                            | Būklės patikros, metrikų išvedimas                                                                                                                                                                                                                                                                                          |
| `oauth/`                                 | OAuth / importavimo srautai 22 teikėjų moduliams (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                |
| `plugins/`                               | Papildinių registras                                                                                                                                                                                                                                                                                                        |
| `promptCache/`                           | Anthropic stiliaus raginimų podėlio kontroliniai taškai                                                                                                                                                                                                                                                                     |
| `skills/`                                | Įgūdžių sistema (integruotieji + prekyvietės + SkillsSH) — žr. `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                            | Bendri „Playground Studio“ pagalbiniai moduliai: `codeExport.ts` (curl/Python/TS generatorius), `promptImprover.ts` (metaužklausų generatorius), `streamMetrics.ts` (grynieji TTFT/TPS), `types.ts` (kainodaros lentelė) — žr. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                       |
| `webhookDispatcher.ts`                   | HMAC žiniatinklio kablių pristatymas — žr. `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                    |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunelių valdikliai — žr. `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                        |
| `cloudSync.ts`, `initCloudSync.ts`       | Pasirinktinis būsenos sinchronizavimas su debesija                                                                                                                                                                                                                                                                          |
| `localDb.ts`                             | Pakartotinio eksportavimo pradinis modulis, skirtas db moduliams (be logikos — tik pakartotinis eksportavimas)                                                                                                                                                                                                              |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Užklausų podėliavimas + idempotentiškumas                                                                                                                                                                                                                                                                                   |
| (~30 more top-level files)               | Specializuoti pagalbiniai moduliai (logEnv, modelsDevSync, piiSanitizer ir kt.)                                                                                                                                                                                                                                             |

### `src/lib/db/` — Duomenų bazė (122 moduliai + 168 migracijos)

| Poaplankis                | Paskirtis                                                                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Vienetinis `getDbInstance()` egzempliorius su WAL žurnalavimu                                                                                                                                                       |
| `db/migrations/`          | Versijuojami SQL failai (idempotentiški, transakciniai). `073_memory_vec.sql` prideda `memory_vec_meta` + stulpelį `needs_reindex` (21 planas).                                                                     |
| `db/playgroundPresets.ts` | CRUD modulis, skirtas „Playground Studio“ išankstinėms parinktims (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                    |
| `db/memoryVec.ts`         | `memory_vec_meta` CRUD (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` ir kt. (21 planas)                                                          |
| `db/<domain>.ts`          | Po vieną modulį kiekvienai sričiai: teikėjai, deriniai, API raktai, naudotojai, sesijos, naudojimas, audit*log, žiniatinklio kabliai, įgūdžiai, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache ir kt. |

### `src/domain/`

| Modulis                | Paskirtis                                         |
| ---------------------- | ------------------------------------------------- |
| `policy.ts`            | Politikos variklis                                |
| `fallbackPolicy.ts`    | Atsarginio pasirinkimo sprendimų medis            |
| `costRules.ts`         | Išlaidų skaičiavimo taisyklės                     |
| `lockoutPolicy.ts`     | Modelio / ryšio blokavimo politika                |
| `tagRouter.ts`         | Žymomis pagrįstas maršruto parinkimas             |
| `comboResolver.ts`     | Derinių nustatymas (naudojamas derinių variklio)  |
| `modelAvailability.ts` | Kiekvieno modelio pasiekiamumo patikra            |
| `assessment/`          | Modelio vertinimas (RFC-AUTO-ASSESSMENT 1 etapas) |

### `src/server/`

| Modulis  | Paskirtis                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `authz/` | Autorizavimo konvejeris: `classify` → `policies` → `enforce` — žr. `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS konfigūracija                                                                                    |
| `auth/`  | Sesijos tarpinė programinė įranga                                                                     |

### `src/shared/`

| Modulis                          | Paskirtis                                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 teikėjai** su Zod validavimu (pagrindinis tiesos šaltinis)                              |
| `constants/cliTools.ts`          | Išorinių CLI įrankių registras                                                                |
| `constants/routingStrategies.ts` | **19 maršruto parinkimo strategijų** su prioritetais                                          |
| `constants/publicApiRoutes.ts`   | Maršrutai, kuriems reikalingas Bearer (o ne valdymo) autentifikavimas                         |
| `constants/upstreamHeaders.ts`   | Antrinių užklausų antraščių draudžiamų elementų sąrašas                                       |
| `validation/schemas.ts`          | ~80 Zod schemų (vienintelis API sutarčių tiesos šaltinis)                                     |
| `validation/helpers.ts`          | Zod validavimo pagalbinės funkcijos (`validateBody` ir kt.)                                   |
| `types/`                         | Bendrinami TS tipai                                                                           |
| `contracts/`                     | Viešosios API sutartys (naudojamos per `files:` faile `package.json`)                         |
| `utils/circuitBreaker.ts`        | Teikėjo grandinės pertraukiklis (žr. `docs/architecture/RESILIENCE_GUIDE.md`)                 |
| `utils/apiAuth.ts`               | API rakto validavimas, taikymo srities tikrinimas                                             |
| `utils/fetchTimeout.ts`          | Antrinių fetch užklausų skirtojo laiko / nutraukimo apgaubai                                  |
| `utils/releaseNotes.ts`          | Uždarytas v2 / senosios versijos pranešimų analizatorius, lokalizavimas ir atmetimas pagal ID |

---

## `open-sse/` — Srautinio apdorojimo variklio darbo sritis

Atskira npm darbo sritis (`@omniroute/open-sse`). Apdoroja užklausas ir vykdo teikėjų operacijas.

```
open-sse/
├── handlers/            # 16 failų (12 apdorojimo programų + 4 pagalbiniai moduliai): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search ir kt.
├── executors/           # 67 konkretiems teikėjams skirtos vykdymo programos (išplečia BaseExecutor)
├── translator/          # Formatų keitikliai (9 užklausų, 9 atsakymų, 9 pagalbiniai)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ paslaugų modulių (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM ir kt.)
├── mcp-server/          # MCP serveris (110 įrankių, 3 perdavimo būdai, 33 aprėptys)
├── config/              # Teikėjų / modelių registrai, antraščių konfigūracija, modelių alternatyvūs pavadinimai
├── utils/               # TLS klientas, proxy užklausų vykdymas / dispečeris, tinklo pagalbiniai moduliai
├── index.ts             # Darbo srities pradinis taškas
├── package.json         # Darbo srities manifestas
├── tsconfig.json        # Darbo srities TS konfigūracija
└── types.d.ts           # Darbo srities tipų deklaracijos
```

### `open-sse/mcp-server/`

| Kelias                      | Paskirtis                                                                 |
| --------------------------- | ------------------------------------------------------------------------- |
| `server.ts`                 | MCP serverio gyvavimo ciklas (stdio + HTTP perdavimo būdai)               |
| `httpTransport.ts`          | HTTP Streamable + SSE perdavimo būdai (`/api/mcp/sse`, `/api/mcp/stream`) |
| `audit.ts`                  | Audito įrašymas į `mcp_tool_audit` lentelę                                |
| `scopeEnforcement.ts`       | Kiekvieno įrankio aprėpties tikrinimas                                    |
| `runtimeHeartbeat.ts`       | Veikimo būklės signalas į `DATA_DIR/runtime/mcp-heartbeat.json`           |
| `descriptionCompressor.ts`  | Įrankių aprašų metaduomenų glaudinimas siekiant taupyti kontekstą         |
| `schemas/tools.ts`          | 36 bazinių įrankių apibrėžtys + aprėptys                                  |
| `tools/advancedTools.ts`    | Išplėstinių įrankių realizacijos                                          |
| `tools/memoryTools.ts`      | 3 atminties įrankiai (paieška / pridėjimas / išvalymas)                   |
| `tools/skillTools.ts`       | 4 įgūdžių įrankiai (sąrašas / įjungimas / vykdymas / vykdymai)            |
| `tools/compressionTools.ts` | 5 glaudinimo įrankiai                                                     |
| `README.md`                 | Vidinis MCP serverio README (susietas su `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Darbalaukio aplankas

| Failas           | Paskirtis                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Pagrindinis Electron procesas (BrowserWindow, įtaisytasis Next.js serveris, sistemos dėklas, automatinis naujinimas) |
| `preload.js`     | IPC tiltas (contextBridge → `window.omniroute`)                                                                      |
| `package.json`   | electron-builder konfigūracija + Electron 41 + electron-builder 26.10 priklausomybės                                 |
| `assets/`        | Programos piktogramos (Windows .ico, macOS .icns, Linux .png)                                                        |
| `dist-electron/` | Kompiliavimo išvestis (neįtraukiama į git)                                                                           |
| `types.d.ts`     | Atvaizdavimo proceso tilto tipų deklaracijos                                                                         |
| `README.md`      | Vidinis Electron README (taip pat žr. `docs/guides/ELECTRON_GUIDE.md`)                                               |

---

## `bin/` — CLI

| Failas                                                                                                      | Paskirtis                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | Pagrindinis CLI įėjimo taškas — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` ir kt. |
| `reset-password.mjs`                                                                                        | Atskira slaptažodžio nustatymo iš naujo CLI priemonė                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Interaktyvus ir neinteraktyvus sąrankos vediklis                                                                                           |
| `cli/commands/doctor.mjs`                                                                                   | Sistemos būklės diagnostika (8+ patikros)                                                                                                  |
| `cli/commands/providers.mjs`                                                                                | Teikėjų sąrašas / testavimas / tikrinimas                                                                                                  |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI pagalbiniai moduliai                                                                                                                   |
| `cli/tray/tray.ts`                                                                                          | Integracija su sistemos dėklu (keliose platformose: NotifyIcon sistemoje Windows, systray2 sistemose macOS/Linux)                          |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon posistemė (Windows, be naujų dvejetainių failų)                                                                      |
| `cli/tray/autostart.ts`                                                                                     | Kelių platformų automatinis paleidimas (LaunchAgent / .desktop / registras)                                                                |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 žingsnių SQLite tvarkyklės parinkimo grandinė (įtraukta → vykdymo aplinka → atidėtasis diegimas → node:sqlite → sql.js)                  |
| `cli/runtime/magicBytes.mjs`                                                                                | Dvejetainių failų magiškųjų baitų tikrinimas (ELF / Mach-O / Mach-O fat / PE)                                                              |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — iš anksto parenka tvarkykles vykdant postinstall / pirmą kartą paleidžiant                                            |
| `nodeRuntimeSupport.mjs`                                                                                    | Diegiant patikrina palaikomą Node.js versiją                                                                                               |

---

## `skills/` — Viešieji agentų įgūdžiai

| Failas                       | Paskirtis                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 įgūdžių aprašų išoriniams DI agentams (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Kompiliavimo ir tikrinimo scenarijai

| Scenarijus                          | Paskirtis                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Kūrimo / paleidimo vykdyklė su aplinkos kintamųjų užpildymu                                       |
| `build-next-isolated.mjs`           | Autonominis kompiliavimas (Next.js 16 autonominis režimas)                                        |
| `prepublish.ts`                     | Paketo paruošimas prieš `npm pack`                                                                |
| `postinstall.mjs`                   | Automatinis `.env` sukūrimas iš `.env.example` pirmojo diegimo metu                               |
| `sync-env.mjs`                      | Pakartotinis `.env` raktų sinchronizavimas su `.env.example`                                      |
| `check-cycles.mjs`                  | Ciklinių priklausomybių aptikimas                                                                 |
| `check-route-validation.mjs`        | Tikrinimas, ar visuose API maršrutuose naudojama Zod validacija                                   |
| `check-t11-any-budget.mjs`          | Aiškiai nurodyto `any` limito kiekviename faile užtikrinimas                                      |
| `check-docs-sync.mjs`               | Dokumentacijos versijų sinchronizavimo tikrinimas (esamas prieš patvirtinimą)                     |
| **`check-env-doc-sync.mjs`**        | NAUJA: aplinkos kintamųjų kode, `.env.example` ir `ENVIRONMENT.md` kryžminis tikrinimas           |
| **`check-docs-counts-sync.mjs`**    | NAUJA: tikrinimas, ar skaičiai (vykdyklių, strategijų, OAuth, A2A įgūdžių) atitinka dokumentaciją |
| **`check-deprecated-versions.mjs`** | NAUJA: pasenusių versijų / datų dokumentacijoje žymėjimas                                         |
| `check-supported-node-runtime.ts`   | Tikrinimas, ar dabartinė Node versija yra palaikoma                                               |
| `check-pr-test-policy.mjs`          | Taisyklės „gamybinio kodo pakeitimams būtini testai“ užtikrinimas                                 |
| **`gen-provider-reference.ts`**     | NAUJA: automatinis `docs/reference/PROVIDER_REFERENCE.md` generavimas iš katalogo                 |
| `i18n/generate-multilang.mjs`       | UI eilučių ir dokumentacijos vertimas naudojant Google Translate                                  |
| `i18n_autotranslate.py`             | LLM pagrįstas dokumentacijos vertimo konvejeris                                                   |
| `validate_translation.py`           | Kiekvienos lokalės vertimo validacija                                                             |
| `check_translations.py`             | Kodo i18n raktų tikrinimas                                                                        |
| `run-playwright-tests.mjs`          | Playwright E2E testų vykdyklė                                                                     |
| `run-protocol-clients-tests.mjs`    | MCP / A2A E2E testų vykdyklė                                                                      |
| `run-ecosystem-tests.mjs`           | Ekosistemos (teikėjų integracijos) testai                                                         |
| `test-report-summary.mjs`           | Aprėpties suvestinės generavimas Markdown formatu                                                 |
| `smoke-electron-packaged.mjs`       | Supakuotos Electron versijos bazinis patikrinimas                                                 |
| `native-binary-compat.mjs`          | Tikrinimas, ar vietinės priklausomybės (`better-sqlite3`) atitinka Electron naudojamą Node        |
| `validate-pack-artifact.ts`         | `npm pack` išvesties validacija                                                                   |
| `responses-ws-proxy.mjs`            | WebSocket tiltas, skirtas Codex Responses API                                                     |
| `v1-ws-bridge.mjs`                  | WebSocket tiltas, skirtas `/api/v1/ws` galiniam taškui                                            |
| `standalone-server-ws.mjs`          | Autonominio WS serverio vykdyklė                                                                  |
| `system-info.mjs`                   | Sistemos / vykdymo aplinkos informacijos išvedimas techninei pagalbai                             |
| `healthcheck.mjs`                   | Vienkartinis būklės patikrinimas (naudojamas Docker HEALTHCHECK)                                  |
| `uninstall.mjs`                     | Švaraus pašalinimo scenarijus                                                                     |

---

## `docs/` — Viešoji dokumentacija (7 šakniniai failai + 17 pakatalogių)

### Aukščiausio lygio vadovai

| Dokumentas                  | Paskirtis                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Aukšto lygio architektūra, posistemių žemėlapis, valdymo skydelio sąsaja                                     |
| `CODEBASE_DOCUMENTATION.md` | Inžinerinis žinynas: katalogai, moduliai, susitarimai                                                        |
| `FEATURES.md`               | Funkcijų matrica su svarbiausiais v3.8 pakeitimais                                                           |
| `USER_GUIDE.md`             | Galutinio naudotojo vadovas (sąranka, modeliai, deriniai, CLI, garsas ir kt.)                                |
| `API_REFERENCE.md`          | API galinių taškų žinynas su autentifikavimo modeliu                                                         |
| `openapi.yaml`              | OpenAPI 3.0 specifikacija (121 kelias)                                                                       |
| `SETUP_GUIDE.md`            | Diegimo būdai (npm, npx, Docker, Electron, Termux, iš šaltinio kodo)                                         |
| `ENVIRONMENT.md`            | Visi aplinkos kintamieji (~800 dokumentuotų, ~3 050 eilučių `.env.example`)                                  |
| `TROUBLESHOOTING.md`        | Dažnos klaidos + žinomos v3.8.0 problemos                                                                    |
| `RELEASE_CHECKLIST.md`      | Visa leidimo eiga (įgūdžiai, husky, sutartiniai įsipareigojimai, diegimas)                                   |
| `COVERAGE_PLAN.md`          | Aprėpties tikslai ir dabartinė būsena                                                                        |
| `FREE_TIERS.md`             | Atrinkti nemokamų planų teikėjai (48+ nemokami + 11 OAuth)                                                   |
| `CLI-TOOLS.md`              | Išorinės CLI integracijos + vidinė OmniRoute CLI                                                             |
| `I18N.md`                   | i18n architektūra, kalbos pridėjimas, 42 lokalės                                                             |
| `UNINSTALL.md`              | Švaraus pašalinimo veiksmai                                                                                  |
| `PROVIDER_REFERENCE.md`     | **Automatiškai sugeneruotas** 355 teikėjų katalogas (generavimas iš naujo: `npm run gen:provider-reference`) |

### Išsami posistemių apžvalga

| Dokumentas                                 | Paskirtis                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | MCP serveris: 110 įrankių, 3 transportai, 33 sritys, REST galiniai taškai                      |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 įgūdžiai, REST pagalbinės priemonės, agento kortelė                      |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Bendras vadovas: A2A ir ACP bei debesijos agentų palyginimas                                   |
| `CLOUD_AGENT.md`                           | Codex Cloud / Devin / Jules orkestravimas                                                      |
| `SKILLS.md`                                | Įgūdžių sistema (įtaisytieji + prekyvietė + SkillsSH + izoliuota aplinka)                      |
| `RADAR.md`                                 | Radar nemokamų modelių katalogo perdanga (`RADAR_ENABLED`, pagal numatytąją nuostatą išjungta) |
| `MEMORY.md`                                | Atminties sistema (SQLite FTS5 + Qdrant)                                                       |
| `EVALS.md`                                 | Vertinimo sistema (rinkiniai, vykdymai, vertinimo kriterijai)                                  |
| `GUARDRAILS.md`                            | PII maskavimas, raginimų injekcija, vaizdinės informacijos tiltas                              |
| `COMPLIANCE.md`                            | Audito žurnalas, saugojimas, `noLog` atsisakymo parinktis                                      |
| `WEBHOOKS.md`                              | HMAC pasirašytų webhook pristatymas                                                            |
| `REASONING_REPLAY.md`                      | Hibridinė atminties / SQLite podėlio sistema, skirta `reasoning_content`                       |
| `AUTHZ_GUIDE.md`                           | Autorizavimo konvejeris (`classify` → `policies` → `enforce`)                                  |
| `RESILIENCE_GUIDE.md`                      | Grandinės pertraukiklis + atvėsimo laikotarpis + modelio blokavimas                            |
| `docs/security/STEALTH_GUIDE.md` (tik git) | TLS kontrolinių atspaudų nustatymas (JA3/JA4), Claude Code CCH, MITM sertifikatas              |
| `AUTO-COMBO.md`                            | Auto Combo variklis (16 veiksnių vertinimas, 6 režimų paketai, virtuali gamykla)               |

### Glaudinimas

| Dokumentas                      | Paskirtis                                  |
| ------------------------------- | ------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Glaudinimo režimų apžvalga + gairės        |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK varikliai, registro sutartis |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman taisyklių paketo JSON schema       |
| `COMPRESSION_LANGUAGE_PACKS.md` | Atskirų kalbų taisyklių paketų sąrašas     |
| `RTK_COMPRESSION.md`            | RTK deklaratyvusis konvejeris (49 filtrai) |

### Diegimas

| Dokumentas                   | Paskirtis                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker komponavimas, profiliai (base/cli/host/cliproxyapi), Redis pagalbinis konteineris |
| `VM_DEPLOYMENT_GUIDE.md`     | Bendras VM/VPS diegimas (Ubuntu/Debian + nginx + systemd)                                |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io diegimas (šiuo metu tik kinų kalba)                                               |
| `TERMUX_GUIDE.md`            | Android veikimas be grafinės sąsajos naudojant Termux                                    |
| `PWA_GUIDE.md`               | Progresyviosios žiniatinklio programos diegimas + tarnybinė programa                     |
| `ELECTRON_GUIDE.md`          | Darbalaukio programos komponavimas + pasirašymas + platinimas                            |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                                   |
| `PROXY_GUIDE.md`             | 4 lygių išeinantysis tarpinis serveris + 1proxy prekyvietė                               |

### Pakatalogiai

| Pakatalogis           | Paskirtis                                                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizuoti dokumentacijos vertimai (41 lokalė)                                                                                                                                                                                  |
| `docs/screenshots/`   | Vadovams skirti vaizdų ištekliai                                                                                                                                                                                                 |
| `_tasks/superpowers/` | „superpowers“ planai / specifikacijos (`writing-plans` / `brainstorming`) ir tyrimai — izoliuota, atskirai versijuojama saugykla, kurią pagrindinis medis ignoruoja per „git“. Žr. CLAUDE.md → „Planavimo ir tyrimų artefaktai“. |

---

## `tests/` — Testų rinkiniai

| Pakatalogis                          | Tipas                                     | Vykdymo priemonė                                         |
| ------------------------------------ | ----------------------------------------- | -------------------------------------------------------- |
| `tests/unit/`                        | Modulių testai (~4 800 failų, greičiausi) | Integruota Node testų vykdymo priemonė                   |
| `tests/integration/`                 | Kelių modulių ir DB integraciniai testai  | Integruota Node testų vykdymo priemonė (lygiagretumas 1) |
| `tests/e2e/`                         | UI ir darbo eigos E2E testai              | Playwright                                               |
| `tests/e2e/protocol-clients.test.ts` | MCP ir A2A realių klientų E2E testai      | Specialiai sukurtos protokolų klientų priemonės          |
| `tests/e2e/ecosystem.test.ts`        | Teikėjų integracija (naudojanti tinklą)   | Integruota Node testų vykdymo priemonė                   |

---

## `public/` — Statiniai ištekliai

| Kelias              | Paskirtis                                                                             |
| ------------------- | ------------------------------------------------------------------------------------- |
| `public/` (šaknis)  | Svetainės piktogramos, robots.txt, manifestas, paslaugų vykdiklis, rinkodaros vaizdai |
| `public/providers/` | Teikėjų logotipai PNG/SVG formatu (naudojami valdymo skydelyje)                       |

---

## `config/` — Statinės konfigūracijos ir kokybės patikros būsena

Platinami konfigūracijos šablonai ir į saugyklą įtrauktos kokybės patikros bazinės reikšmės
(perkeltos čia iš saugyklos šaknies v3.8.26 versijoje, kad šaknis išliktų neperkrauta).

| Kelias                                        | Paskirtis                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Lokalių sąrašas ir metaduomenys (kanoninis 42 lokalių skaičiaus šaltinis)                        |
| `config/i18n-schema.json`                     | JSON schema, tikrinanti `i18n.json`                                                              |
| `config/payloadRules.json`                    | Iš aukštesnio lygmens gaunamų duomenų naudingosios apkrovos valymo taisyklės                     |
| `config/quality/quality-baseline.json`        | Kelių metrikų kartelės bazinė reikšmė (`scripts/quality/check-quality-ratchet.mjs`)              |
| `config/quality/complexity-baseline.json`     | Fiksuota ESLint sudėtingumo bazinė reikšmė (`check-complexity.mjs`)                              |
| `config/quality/duplication-baseline.json`    | Fiksuota jscpd dubliavimo bazinė reikšmė (`check-duplication.mjs`)                               |
| `config/quality/file-size-baseline.json`      | Fiksuota kiekvieno failo dydžio bazinė reikšmė (`check-file-size.mjs`)                           |
| `config/quality/test-discovery-baseline.json` | Fiksuota neaptiktų testų bazinė reikšmė (`check-test-discovery.mjs`)                             |
| `config/quality/dependency-allowlist.json`    | Patvirtintų priklausomybių leidžiamųjų sąrašas (`check-deps.mjs`)                                |
| `config/quality/.license-allowlist.json`      | SPDX licencijų leidžiamųjų sąrašas (`check-licenses.mjs`)                                        |
| `config/quality/quality-metrics.json`         | Laikinos surinktos metrikos (generuojamos naudojant `collect-metrics.mjs`; **git ignoruojamos**) |

---

## `.github/` — „GitHub“ integracija

| Kelias                             | Paskirtis                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `.github/workflows/`               | „GitHub Actions“ CI/CD darbo eigos (lint, testavimas, aprėptis, leidimas) |
| `.github/ISSUE_TEMPLATE/`          | Klaidų / funkcijų užklausų šablonai                                       |
| `.github/pull_request_template.md` | PR šablonas                                                               |
| `.github/dependabot.yml`           | Priklausomybių naujinimo konfigūracija                                    |

---

## `.husky/` — „Git“ kabliai

| Failas       | Paskirtis                                                                        |
| ------------ | -------------------------------------------------------------------------------- |
| `pre-commit` | Vykdo `lint-staged + check-docs-sync + check:any-budget:t11`                     |
| `pre-push`   | Šiuo metu išjungta (užkomentuota). Paleiskite `npm run test:unit` rankiniu būdu. |
| `_/`         | Vidiniai „Husky“ failai                                                          |

---

## `.claude/` — „Claude Code“ pasvirojo brūkšnio komandos

| Failas                                              | Paskirtis                                                                 |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — versijos pakėlimas ir automatinis pakeitimų žurnalas |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — visa leidimo darbo eiga                          |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Diegimas į VPS                                                            |
| `commands/capture-release-evidences-cc.md`          | Naujų funkcijų įrašymas naršyklėje WebP formatu                           |
| `commands/review-{prs,discussions}-cc.md`           | „GitHub“ PR ir diskusijų skirstymas                                       |
| `commands/{review-issues,implement-features}-cc.md` | Užklausų darbo eigos                                                      |
| `settings.local.json`                               | Konkretaus projekto „Claude Code“ nustatymai                              |

---

## `.agents/` — bendrosios agentų darbo eigos („Codex“ / „Cursor“ / kt.)

| Kelias                   | Paskirtis                                          |
| ------------------------ | -------------------------------------------------- |
| `workflows/*-ag.md`      | 11 darbo eigų aprašų (`.claude/commands/` kopijos) |
| `skills/<name>/SKILL.md` | 9 įgūdžių aprašai su „Codex“ vykdymo pastabomis    |

> **Pastaba:** Šiuo metu darbo eigos ir komandos yra identiškos baitas į baitą. Jei `.agents/` skirta kitai agento vykdymo aplinkai („Codex“), variantai turi prasmingai skirtis.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — už pagrindinio medžio ribų

Šiuose pabraukimo ženklu prasidedančiuose kataloguose laikomas į platinamą paketą neįtraukiamas turinys:

- **`_ideia/`** — projektavimo pastabos (defer / notfit / viable kategorijos)
- **`_mono_repo/`** — istoriniai antriniai projektai (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — tik skaitymui skirtos susijusių OSS projektų kopijos (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api ir kt.), naudojamos kryžminėms nuorodoms kūrimo metu
- **`_tasks/`** — kiekvieno leidimo užduočių stebėjimo failai (neformalūs)

Neįtraukiama į `npm pack` išvestį. Žr. `.npmignore`.

---

## Sugeneruota / ignoruojama Git

| Kelias                 | Paskirtis                              |
| ---------------------- | -------------------------------------- |
| `node_modules/`        | npm priklausomybės                     |
| `.next/`               | Next.js kompiliavimo išvestis          |
| `coverage/`            | c8 testų aprėpties ataskaitos          |
| `logs/`                | Vykdymo žurnalai                       |
| `package/`             | npm paketo paruošimo sritis            |
| `.playwright-mcp/`     | Playwright MCP testų artefaktai        |
| `.issues/`             | Vietinė problemų talpykla              |
| `tsconfig.tsbuildinfo` | TS inkrementinio kompiliavimo talpykla |

---

## Naršymo patarimai

- **Naujas projekto dalyvis?** Perskaitykite `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Pridedate teikėją?** Vadovaukitės `docs/architecture/ARCHITECTURE.md § Adding a New Provider` ir sutikrinkite su `docs/reference/PROVIDER_REFERENCE.md`.
- **Pridedate maršrutą?** Žr. `docs/architecture/ARCHITECTURE.md § Adding a New API Route` ir `src/shared/validation/schemas.ts`.
- **Pridedate MCP įrankį?** Žr. `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Pridedate A2A gebėjimą?** Žr. `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Paleidžiate vietoje?** Žr. `docs/guides/SETUP_GUIDE.md`.
- **Diegiate?** Žr. `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Išleidžiate versiją?** Žr. `docs/ops/RELEASE_CHECKLIST.md` (ir Claude Code gebėjimą `/generate-release-cc`).
