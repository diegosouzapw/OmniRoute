# Repository Map (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Opis svakog direktorija i datoteke u korijenu u jednom retku.**
> Posljednje ažuriranje: 2026-06-28 — OmniRoute v3.8.40
>
> Upotrijebite ovu mapu za brzo snalaženje u bazi koda. Za detaljnije informacije slijedite poveznice na namjensku dokumentaciju.

## Stablo najviše razine

```
OmniRoute/
├── src/                  # Aplikacija Next.js 16 (korisničko sučelje + API rute + biblioteke + domena + poslužitelj)
├── open-sse/             # Radni prostor mehanizma za strujanje (rukovatelji, izvršitelji, prevoditelj, MCP poslužitelj)
├── electron/             # Omotač za stolna računala (Electron 41 + electron-builder 26.10)
├── bin/                  # Ulazna točka CLI-ja i rukovatelji naredbama
├── scripts/              # Skripte za izgradnju, provjeru, sinkronizaciju i jednokratne zadatke
├── docs/                 # Javna dokumentacija (ovdje se nalazite)
├── tests/                # Svi skupovi testova (jedinični, integracijski, e2e, klijenti protokola)
├── public/               # Statički resursi za Next.js, PWA manifest, service worker, ikone
├── config/               # Statička konfiguracija + stanje kontrole kvalitete (i18n, payloadRules, quality/)
├── images/               # Slike za marketing / README
├── @omniroute/           # Popratni paketi koji se mogu objaviti (opencode-plugin, opencode-provider)
├── skills/               # Paketi vještina za CLI/agente (cli-* + omni-* + config-codex-cli)
├── examples/             # Primjeri dodataka + početni projekt omniroute-cmd-hello
├── contrib/              # Doprinosi zajednice (podman/)
├── .source/              # Konfiguracija izvora za Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Radni tijekovi za GitHub Actions + predlošci problema + predložak PR-a
├── .husky/               # Git kuke (pre-commit, pre-push)
├── .claude/              # Naredbe s kosom crtom za Claude Code (na razini projekta)
├── .agents/              # Radni tijekovi + vještine za Codex / generičke agente (zrcalna kopija direktorija .claude/)
├── .vscode/              # Postavke radnog prostora za VS Code
├── _ideia/               # Bilješke za planiranje (neformalne; ne isporučuju se)
├── _mono_repo/           # Povijesni potprojekti (cloud, site, vscode-extension)
├── _references/          # Referentni klonovi povezanih OSS projekata samo za čitanje
├── _tasks/               # Datoteke za praćenje zadataka po izdanju (neformalne)
├── .build/ .worktrees/ dist/   # Privremeni lokalni podaci za izgradnju / git-worktree / izlaz izgradnje (gitignored)
├── .issues/              # Lokalna predmemorija problema (gitignored)
├── .playwright-mcp/      # Artefakti MCP testova za Playwright
├── coverage/             # Izlaz pokrivenosti alata c8 (gitignored)
├── logs/                 # Zapisnici tijekom izvođenja (gitignored)
├── node_modules/         # Ovisnosti (gitignored)
├── package/              # Pripremno područje za npm pack (artefakt izgradnje)
├── .next/                # Izlaz izgradnje za Next.js (gitignored)
└── (datoteke u korijenu — pogledajte u nastavku)
```

---

## Datoteke u korijenu

| Datoteka                                    | Svrha                                                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketinška odredišna stranica + brzi početak + matrica značajki (vidi i `llm.txt`)                       |
| **CHANGELOG.md**                            | Dnevnik promjena po izdanju (automatski generiran vještinom `/version-bump-cc`)                           |
| **LICENSE**                                 | Tekst MIT licence                                                                                         |
| **CLAUDE.md**                               | Pravila projekta za Claude Code agente (stroga pravila, konvencije, scenariji)                            |
| **AGENTS.md**                               | Isto kao CLAUDE.md, ali za AI agente koji nisu Claude (Codex, Cursor itd.)                                |
| **GEMINI.md**                               | Sažeta pravila za agente temeljene na Geminiju (podskup datoteke CLAUDE.md)                               |
| **CONTRIBUTING.md**                         | Vodič za doprinositelje: postavljanje, konvencionalni commitovi, testiranje, tijek PR-a                   |
| **SECURITY.md**                             | Pravila prijavljivanja ranjivosti, podržane verzije, model prijetnji                                      |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — očekivanja ponašanja u zajednici                                                   |
| **llm.txt**                                 | Odredišna stranica u običnom tekstu optimizirana za LLM indeksiranje (SEO za AI asistente)                |
| **package.json**                            | npm manifest, skripte, ovisnosti, pogonski sustavi, c8 prag pokrivenosti                                  |
| **package-lock.json**                       | Zaključano stablo ovisnosti                                                                               |
| **tsconfig.json**                           | Korijenska TypeScript konfiguracija                                                                       |
| **tsconfig.typecheck-core.json**            | Konfiguracija provjere tipova za jezgru `src/`                                                            |
| **tsconfig.typecheck-noimplicit-core.json** | Stroga (`noImplicitAny`) provjera tipova                                                                  |
| **tsconfig.tsbuildinfo**                    | Predmemorija inkrementalne TS izgradnje (ignorira je git)                                                 |
| **next.config.mjs**                         | Konfiguracija izgradnje za Next.js 16 (samostalni izlaz)                                                  |
| **next-env.d.ts**                           | Automatski generirani tipovi okruženja za Next.js                                                         |
| **eslint.config.mjs**                       | Ravna ESLint konfiguracija (pravila po područjima projekta)                                               |
| **prettier.config.mjs**                     | Pravila formatiranja za Prettier                                                                          |
| **postcss.config.mjs**                      | PostCSS konfiguracija za Tailwind/CSS lanac obrade                                                        |
| **playwright.config.ts**                    | Konfiguracija Playwright E2E testova                                                                      |
| **vitest.config.ts**                        | Vitest konfiguracija (zadani skup testova)                                                                |
| **vitest.mcp.config.ts**                    | Vitest konfiguracija za MCP poslužitelj / autoCombo / skupove predmemorije                                |
| **sonar-project.properties**                | SonarQube/SonarCloud konfiguracija (kvaliteta koda)                                                       |
| **Dockerfile**                              | Višefazna Docker izgradnja (builder → runner-base → runner-cli)                                           |
| **docker-compose.yml**                      | Razvojni compose s 4 profila (base, cli, host, cliproxyapi) + redis pomoćni servis                        |
| **docker-compose.prod.yml**                 | Produkcijski compose (port 20130, redis, imenovani volumeni)                                              |
| **.dockerignore**                           | Datoteke isključene iz Docker konteksta                                                                   |
| **fly.toml**                                | Konfiguracija implementacije za Fly.io (regija `sin`, port 20128, volumen /data)                          |
| **.env.example**                            | Predložak datoteke okruženja (automatski se kopira u `.env` pri prvoj instalaciji)                        |
| **.gitignore**                              | Obrasci koje git ignorira                                                                                 |
| **.npmignore**                              | Popis izuzimanja pri npm objavljivanju                                                                    |
| **.npmrc**                                  | npm konfiguracija (registar, pravila datoteke zaključavanja)                                              |
| **.node-version**                           | Fiksirana verzija Nodea (koriste je alati kompatibilni s nvm-om)                                          |
| **.nvmrc**                                  | Fiksirana verzija Nodea za nvm                                                                            |
| **eslint.complexity.config.mjs**            | ESLint konfiguracija za postupno ograničavanje složenosti (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint konfiguracija za SonarJS pravila (kognitivna složenost / dupliciranje)                             |
| **source.config.ts**                        | Fumadocs `defineDocs` konfiguracija izvora (puni `.source/`)                                              |
| **knip.json**                               | Knip konfiguracija — nekorištene datoteke/izvozi/ovisnosti (ulaz za provjeru mrtvog koda)                 |
| **stryker.conf.json**                       | Konfiguracija mutacijskog testiranja za Stryker                                                           |
| **.size-limit.json**                        | Konfiguracija proračuna veličine paketa za size-limit                                                     |
| **promptfooconfig.yaml**                    | Konfiguracija evaluacije za promptfoo                                                                     |
| **.gitleaks.toml**                          | Skup pravila za skeniranje tajni alatom gitleaks                                                          |
| **.zizmor.yml**                             | Konfiguracija sigurnosne provjere GitHub Actionsa alatom zizmor                                           |
| **socket.yml**                              | Konfiguracija lanca opskrbe za Socket.dev                                                                 |
| **news.json**                               | Lokalizirani sažetak obavijesti za v2; stavka o pokretanju Radara isporučuje se neaktivna                 |
| **flake.nix** / **flake.lock**              | Definicija razvojnog Nix shell okruženja + datoteka zaključavanja                                         |
| **.env**                                    | Lokalne tajne (zanemaruje ih git — generirano iz `.env.example`)                                          |

> **Premješteno iz korijenskog direktorija u v3.8.26 (raščlanjivanje):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` i generirani `quality-metrics.json` (zanemaruje ga git). Pogledajte [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js aplikacija

```
src/
├── app/                 # App Router (stranice + API rute + statusne stranice + odredišna stranica)
├── lib/                 # Temeljne biblioteke / domenski moduli (80 poddirektorija + ~70 datoteka najviše razine)
├── domain/              # Čista domenska logika (mehanizam pravila, pričuvni mehanizam, trošak, zaključavanje, comboResolver, procjena)
├── server/              # Moduli isključivo za poslužitelj (autorizacijski lanac, cors, autentikacijski međuverzijski softver) — nije ih moguće uvesti iz klijenta
├── shared/              # Sigurno dijeljeno između poslužitelja i klijenta (konstante, tipovi, provjera valjanosti, ugovori, pomoćni alati)
├── i18n/                # next-intl konfiguracija + JSON poruke po lokalizaciji (42 lokalizacije)
├── middleware/          # Next.js međuverzijski softver (obogaćivanje zahtjeva, otkrivanje lokalizacije)
├── mitm/                # Jezgra MITM proxyja: generiranje/instalacija certifikata, rukovatelji, ciljevi, inspektor, maske, izravno prosljeđivanje
│   ├── handlers/        # 9 klasa rukovatelja za IDE agente koje proširuju MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Sloj za bilježenje prometa: međuspremnik (kružni u memoriji), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Poveznica prilagodnika modela (naslijeđeni kompatibilni sloj)
├── scripts/             # Skripte za održavanje unutar izvornog stabla (npr. backfillAggregation)
├── sse/                 # Naslijeđeni SSE rukovatelji/servisi (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Naslijeđeno spremište u memoriji (postupno se zamjenjuje s src/lib/db)
├── types/               # Dijeljene datoteke TS tipova
├── instrumentation.ts   # Next.js kuka za telemetriju (preglednik + edge)
├── instrumentation-node.ts  # Instrumentacija samo za Node
└── proxy.ts             # Ulazni kompatibilni sloj za HTTP proxy
```

### `src/app/` — App Router (Next.js 16)

| Putanja                                                                      | Svrha                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Javni API kompatibilan s OpenAI-jem (~25 pod-ruta: chat, dovršavanja, ugradnje, datoteke, skupne obrade, zvuk, slike, videozapisi, glazba, ponovno rangiranje, moderiranje, pretraživanje, ws, agenti, računi, pružatelji itd.)                                                                                          |
| `app/api/v1beta/`                                                            | Krajnje točke API-ja u stilu Geminija                                                                                                                                                                                                                                                                                    |
| `app/api/playground/`                                                        | Rute Playground Studija: `improve-prompt/` (POST — LLM alat za preoblikovanje upita), `presets/` (GET popis / POST stvaranje), `presets/[id]/` (GET / PUT / DELETE) — pogledajte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                  |
| `app/api/` (izvan v1)                                                        | Rute za upravljanje/administraciju (~60 direktorija: pružatelji, kombinacije, postavke, mcp, a2a, evaluacije, memorija, vještine, webhookovi, usklađenost, otpornost, nadzor, tuneli, CLI alati itd.)                                                                                                                    |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 ruta (upravljanje poslužiteljem, stanje agenta/DNS/mapiranja, zaobilaženje, certifikat, nadređeni CA). LOCAL_ONLY + SPAWN_CAPABLE. Pogledajte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                             |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ ruta (zahtjevi, sesije, hostovi, načini snimanja, izvoz, ws). LOCAL_ONLY + SPAWN_CAPABLE. Pogledajte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                    |
| `app/a2a/`                                                                   | Ulazna točka za A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                           |
| `app/.well-known/agent.json/`                                                | Kartica A2A agenta (otkrivanje)                                                                                                                                                                                                                                                                                          |
| `app/(dashboard)/dashboard/`                                                 | Stranice korisničkog sučelja nadzorne ploče (50+ odjeljaka, ~118 datoteka page.tsx: pružatelji, kombinacije, postavke, memorija, vještine, webhookovi, evaluacije, revizija, skupna obrada, predmemorija, troškovi, stanje, sustav, aktivnost itd.)                                                                      |
| `app/(dashboard)/dashboard/search-tools/`                                    | Korisničko sučelje Search Tools Studija (3 kartice: Pretraživanje/Izvlačenje/Usporedba + SearchConceptCard + ProviderCatalog) — pogledajte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                      |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (okvir s 3 kartice), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Stranica nadzorne ploče AgentBridge — kartica poslužitelja, 9 kartica agenata, čarobnjak za postavljanje, mapiranje modela, popis zaobilaženja. i18n PT-BR + EN. Pogledajte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                            |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Stranica nadzorne ploče Traffic Inspector — podijeljeni prikaz DevTools, 7 kartica s pojedinostima, 4 prekidača načina snimanja, snimač sesije, označavanje konteksta bojama. i18n PT-BR + EN. Pogledajte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                        |
| `app/(dashboard)/dashboard/activity/`                                        | Stranica sa zapisom aktivnosti (Grupa B): `page.tsx` (poslužiteljska) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — pogledajte `docs/architecture/MONITORING_SECTIONS.md`                                                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Stranica za dijeljenje kvota (Grupa B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Stranica za konfiguraciju plana pružatelja (Grupa B): `page.tsx` + `ProviderPlanConfigClient.tsx` — nadjačavanje dimenzija kvote po vezi                                                                                                                                                                                 |
| `app/docs/`                                                                  | Ugrađeni preglednik dokumentacije (prikazuje `docs/*.md`)                                                                                                                                                                                                                                                                |
| `app/landing/`                                                               | Odredišna marketinška stranica                                                                                                                                                                                                                                                                                           |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Stranice povezane s autentifikacijom                                                                                                                                                                                                                                                                                     |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Stranice HTTP pogrešaka                                                                                                                                                                                                                                                                                                  |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statičke stranice i stranice statusa                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Korijenski raspored, početna stranica, PWA manifest, globalni CSS                                                                                                                                                                                                                                                        |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Granice pogrešaka                                                                                                                                                                                                                                                                                                        |

### `src/lib/` — Temeljne biblioteke (~50 modula)

| Modul                                    | Namjena                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Upravitelj zadataka A2A protokola, vještine (5), strujanje                                                                                                                                                                                                                                                                             |
| `acp/`                                   | CLI registar agenata (lokalno otkrivanje CLI-ja — pogledajte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                               |
| `api/`                                   | Zajednički API pomoćni alati (`requireManagementAuth`, provjera valjanosti)                                                                                                                                                                                                                                                            |
| `auth/`                                  | Sesija, sažimanje lozinki, provjera valjanosti tokena                                                                                                                                                                                                                                                                                  |
| `batches/`                               | Rukovatelji za OpenAI Batches API                                                                                                                                                                                                                                                                                                      |
| `catalog/`                               | Zod provjera valjanosti kataloga pružatelja + razrješavanje mogućnosti                                                                                                                                                                                                                                                                 |
| `cloudAgent/`                            | Agenti u oblaku (Codex Cloud, Devin, Jules) — pogledajte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                              |
| `combos/`                                | Razrješavanje kombinacija + pomoćni alati za promjenu redoslijeda                                                                                                                                                                                                                                                                      |
| `audit/`                                 | Pomoćni alati za sažetak aktivnosti: `highLevelActions.ts` (popis dopuštenih stavki + `isHighLevelAction()`), `activityIcons.ts` (mapiranje radnje → ikona/glagol), `timeline.ts` (groupByDay/relativeTime) — pogledajte `docs/architecture/MONITORING_SECTIONS.md`                                                                    |
| `compliance/`                            | Dnevnik revizije + revizija pružatelja — pogledajte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                      |
| `compression/`                           | Povezivanje mehanizma za kompresiju (mehanizmi se nalaze u `open-sse/services/compression/`)                                                                                                                                                                                                                                           |
| `config/`                                | Pomoćni alati za konfiguraciju tijekom izvođenja                                                                                                                                                                                                                                                                                       |
| `db/`                                    | Više od 120 domenskih DB modula + 168 migracija (za SQLite uvijek pristupajte putem ovog modula)                                                                                                                                                                                                                                       |
| `quota/`                                 | Mehanizam za dijeljenje kvota: `dimensions.ts` (tipovi/Zod), `types.ts` (sučelje QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — pogledajte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klijent kataloga besplatnih modela Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — pogledajte `docs/frameworks/RADAR.md`                                                                                                                                           |
| `display/`                               | Pomoćne funkcije za formatiranje korisničkog sučelja (trošak, latencija itd.)                                                                                                                                                                                                                                                          |
| `embeddings/`                            | Pomoćne funkcije usluge ugrađivanja                                                                                                                                                                                                                                                                                                    |
| `env/`                                   | Raščlanjivanje i provjera valjanosti varijabli okruženja                                                                                                                                                                                                                                                                               |
| `evals/`                                 | Okvir za evaluaciju (skupovi, pokretač, izvršno okruženje) — pogledajte `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                     |
| `guardrails/`                            | Maskiranje osobnih podataka, zaštita od ubacivanja uputa, most za obradu slike — pogledajte `docs/security/GUARDRAILS.md`                                                                                                                                                                                                              |
| `jobs/`                                  | Pozadinski zadaci (nalik cronu)                                                                                                                                                                                                                                                                                                        |
| `memory/`                                | Konverzacijska memorija (hibridni RRF sa SQLite FTS5 + sqlite-vec te Qdrant razina 2) — pogledajte `docs/frameworks/MEMORY.md`                                                                                                                                                                                                         |
| `memory/embedding/`                      | Višeizvorni sloj za ugrađivanje: `index.ts` (razrješivač), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                                    |
| `memory/vectorStore.ts`                  | Omotač za sqlite-vec v0.1.9 — KNN grubom silom + hibridni RRF (FTS5 + vektor, k=60). Lijena inicijalizacija, postupno smanjuje funkcionalnost kada sqlite-vec nije dostupan. (plan 21)                                                                                                                                                 |
| `memory/reindex.ts`                      | `runReindexBatch()` — u pozadini obrađuje memorije s `needs_reindex=1`; poziva ga `POST /api/memory/reindex` i putanja za lijenu naknadnu obradu. (plan 21)                                                                                                                                                                            |
| `monitoring/`                            | Provjere stanja, emitiranje metrika                                                                                                                                                                                                                                                                                                    |
| `oauth/`                                 | Tokovi za OAuth/uvoz za 22 modula pružatelja usluga (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                        |
| `plugins/`                               | Registar dodataka                                                                                                                                                                                                                                                                                                                      |
| `promptCache/`                           | Prijelomne točke predmemorije upita u stilu Anthropic                                                                                                                                                                                                                                                                                  |
| `skills/`                                | Okvir za vještine (ugrađene + tržište + SkillsSH) — pogledajte `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                             |
| `playground/`                            | Dijeljeni pomoćni moduli za Playground Studio: `codeExport.ts` (generator za curl/Python/TS), `promptImprover.ts` (alat za izradu meta-upita), `streamMetrics.ts` (čisti TTFT/TPS), `types.ts` (tablica cijena) — pogledajte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                    |
| `webhookDispatcher.ts`                   | Isporuka webhookova s HMAC-om — pogledajte `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Upravitelji tunela — pogledajte `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                            |
| `cloudSync.ts`, `initCloudSync.ts`       | Neobavezna sinkronizacija stanja s oblakom                                                                                                                                                                                                                                                                                             |
| `localDb.ts`                             | Objedinjujući modul za ponovni izvoz modula baze podataka (bez logike — samo ponovni izvozi)                                                                                                                                                                                                                                           |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Predmemoriranje zahtjeva + idempotentnost                                                                                                                                                                                                                                                                                              |
| (~30 dodatnih datoteka najviše razine)   | Specijalizirani pomoćni moduli (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                              |

### `src/lib/db/` — Baza podataka (122 modula + 168 migracija)

| Poddirektorij             | Namjena                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | Jedinstvena instanca `getDbInstance()` s WAL vođenjem dnevnika                                                                                                                                         |
| `db/migrations/`          | Verzionirane SQL datoteke (idempotentne, transakcijske). `073_memory_vec.sql` dodaje `memory_vec_meta` + stupac `needs_reindex` (plan 21).                                                             |
| `db/playgroundPresets.ts` | CRUD modul za unaprijed postavljene konfiguracije Playground Studija (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)    |
| `db/memoryVec.ts`         | CRUD za `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (plan 21)                                              |
| `db/<domain>.ts`          | Jedan modul po domeni: pružatelji usluga, kombinacije, API ključevi, korisnici, sesije, korištenje, audit*log, webhookovi, vještine, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache itd. |

### `src/domain/`

| Modul                  | Namjena                                                      |
| ---------------------- | ------------------------------------------------------------ |
| `policy.ts`            | Mehanizam pravila                                            |
| `fallbackPolicy.ts`    | Stablo odluka za pričuvnu opciju                             |
| `costRules.ts`         | Pravila izračuna troškova                                    |
| `lockoutPolicy.ts`     | Pravila zaključavanja modela/veze                            |
| `tagRouter.ts`         | Usmjeravanje na temelju oznaka                               |
| `comboResolver.ts`     | Razrješavanje kombinacija (koristi ga mehanizam kombinacija) |
| `modelAvailability.ts` | Provjera dostupnosti po modelu                               |
| `assessment/`          | Procjena modela (1. faza dokumenta RFC-AUTO-ASSESSMENT)      |

### `src/server/`

| Modul    | Namjena                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `authz/` | Tijek autorizacije: `classify` → `policies` → `enforce` — pogledajte `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfiguracija CORS-a                                                                                    |
| `auth/`  | Posrednički softver za sesije                                                                           |

### `src/shared/`

| Modul                            | Svrha                                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 pružatelja usluga** sa Zod validacijom (izvor istine)                                    |
| `constants/cliTools.ts`          | Registar vanjskih CLI alata                                                                    |
| `constants/routingStrategies.ts` | **19 strategija usmjeravanja** s prioritetima                                                  |
| `constants/publicApiRoutes.ts`   | Rute koje zahtijevaju Bearer autentifikaciju (umjesto upravljačke)                             |
| `constants/upstreamHeaders.ts`   | Popis zabranjenih zaglavlja za zahtjeve prema nadređenim servisima                             |
| `validation/schemas.ts`          | ~80 Zod shema (jedinstveni izvor istine za API ugovore)                                        |
| `validation/helpers.ts`          | Pomoćne funkcije za Zod validaciju (`validateBody` itd.)                                       |
| `types/`                         | Zajednički TS tipovi                                                                           |
| `contracts/`                     | Javni API ugovori (koristi ih `files:` u `package.json`)                                       |
| `utils/circuitBreaker.ts`        | Prekidač strujnog kruga pružatelja usluga (pogledajte `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Validacija API ključa, provjera opsega                                                         |
| `utils/fetchTimeout.ts`          | Omotači za vremensko ograničenje/prekid dohvaćanja s nadređenih servisa                        |
| `utils/releaseNotes.ts`          | Parser zatvorenih v2/zastarjelih objava, lokalizacija i odbacivanje prema ID-u                 |

---

## `open-sse/` — Radni prostor mehanizma za strujanje

Zaseban npm radni prostor (`@omniroute/open-sse`). Obrađuje zahtjeve i izvršavanje pružatelja usluga.

```
open-sse/
├── handlers/            # 16 datoteka (12 rukovatelja + 4 pomoćne datoteke): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search itd.
├── executors/           # 67 izvršitelja specifičnih za pružatelje usluga (proširuju BaseExecutor)
├── translator/          # Pretvarači formata (9 za zahtjeve, 9 za odgovore, 9 pomoćnih)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ servisnih modula (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM itd.)
├── mcp-server/          # MCP poslužitelj (110 alata, 3 transporta, 33 opsega)
├── config/              # Registri pružatelja usluga/modela, konfiguracija zaglavlja, pseudonimi modela
├── utils/               # TLS klijent, proxy dohvaćanje/dispečer, mrežni pomoćni alati
├── index.ts             # Ulazna točka radnog prostora
├── package.json         # Manifest radnog prostora
├── tsconfig.json        # TS konfiguracija radnog prostora
└── types.d.ts           # Deklaracije tipova radnog prostora
```

### `open-sse/mcp-server/`

| Putanja                     | Svrha                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------- |
| `server.ts`                 | Životni ciklus MCP poslužitelja (stdio + HTTP transporti)                             |
| `httpTransport.ts`          | HTTP Streamable + SSE transporti (`/api/mcp/sse`, `/api/mcp/stream`)                  |
| `audit.ts`                  | Zapisivanje revizijskog traga u tablicu `mcp_tool_audit`                              |
| `scopeEnforcement.ts`       | Provjera opsega za svaki alat                                                         |
| `runtimeHeartbeat.ts`       | Signal stanja u `DATA_DIR/runtime/mcp-heartbeat.json`                                 |
| `descriptionCompressor.ts`  | Sažimanje metapodataka opisa alata radi uštede konteksta                              |
| `schemas/tools.ts`          | 36 osnovnih definicija alata + opsezi                                                 |
| `tools/advancedTools.ts`    | Implementacije naprednih alata                                                        |
| `tools/memoryTools.ts`      | 3 memorijska alata (pretraživanje/dodavanje/brisanje)                                 |
| `tools/skillTools.ts`       | 4 alata za vještine (popis/omogućavanje/izvršavanje/izvršenja)                        |
| `tools/compressionTools.ts` | 5 alata za sažimanje                                                                  |
| `README.md`                 | Interni README MCP poslužitelja (unakrsno povezan iz `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Omotač za radnu površinu

| Datoteka         | Svrha                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Glavni proces Electrona (BrowserWindow, ugrađeni Next.js poslužitelj, sistemska traka, automatsko ažuriranje) |
| `preload.js`     | IPC most (contextBridge → `window.omniroute`)                                                                 |
| `package.json`   | Konfiguracija za electron-builder + Electron 41 + ovisnosti za electron-builder 26.10                         |
| `assets/`        | Ikone aplikacije (Windows .ico, macOS .icns, Linux .png)                                                      |
| `dist-electron/` | Izlaz kompilacije (ignorira ga git)                                                                           |
| `types.d.ts`     | Deklaracije tipova za most procesa za prikaz                                                                  |
| `README.md`      | Interni README za Electron (pogledajte i `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| Datoteka                                                                                                    | Namjena                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | Glavna ulazna točka CLI-ja — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` itd.      |
| `reset-password.mjs`                                                                                        | Samostalni CLI za ponovno postavljanje lozinke                                                                                             |
| `cli/commands/setup.mjs`                                                                                    | Interaktivni i neinteraktivni čarobnjak za postavljanje                                                                                    |
| `cli/commands/doctor.mjs`                                                                                   | Dijagnostika stanja sustava (više od 8 provjera)                                                                                           |
| `cli/commands/providers.mjs`                                                                                | Popis/testiranje/validacija pružatelja                                                                                                     |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Pomoćni moduli CLI-ja                                                                                                                      |
| `cli/tray/tray.ts`                                                                                          | Integracija sa sistemskom trakom (više platformi: NotifyIcon u sustavu Windows, systray2 u sustavima macOS/Linux)                          |
| `cli/tray/tray.ps1`                                                                                         | PowerShell pozadinski sustav NotifyIcon (Windows, bez novih binarnih datoteka)                                                             |
| `cli/tray/autostart.ts`                                                                                     | Automatsko pokretanje na više platformi (LaunchAgent / .desktop / registar)                                                                |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Lanac razrješavanja upravljačkog programa SQLite u 5 koraka (u paketu → okruženje izvođenja → naknadna instalacija → node:sqlite → sql.js) |
| `cli/runtime/magicBytes.mjs`                                                                                | Validacija magičnih bajtova binarne datoteke (ELF / Mach-O / Mach-O fat / PE)                                                              |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — unaprijed razrješava upravljačke programe tijekom postinstall / prvog pokretanja                                      |
| `nodeRuntimeSupport.mjs`                                                                                    | Validacija podržane verzije Node.js pri instalaciji                                                                                        |

---

## `skills/` — Javne vještine agenata

| Datoteka                     | Svrha                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifesta vještina za vanjske AI agente (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skripte za izgradnju i provjeru

| Skripta                             | Svrha                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Pokretač za razvoj/pokretanje s učitavanjem varijabli okruženja                                         |
| `build-next-isolated.mjs`           | Samostalna izgradnja (samostalni način rada u Next.js 16)                                               |
| `prepublish.ts`                     | Priprema paketa prije naredbe `npm pack`                                                                |
| `postinstall.mjs`                   | Automatska izrada datoteke `.env` iz `.env.example` pri prvoj instalaciji                               |
| `sync-env.mjs`                      | Ponovna sinkronizacija ključeva u `.env` s datotekom `.env.example`                                     |
| `check-cycles.mjs`                  | Otkrivanje kružnih ovisnosti                                                                            |
| `check-route-validation.mjs`        | Provjera imaju li sve API rute Zod validaciju                                                           |
| `check-t11-any-budget.mjs`          | Provedba izričitog ograničenja za `any` po datoteci                                                     |
| `check-docs-sync.mjs`               | Provjera sinkronizacije verzija dokumentacije (postojeća provjera prije commita)                        |
| **`check-env-doc-sync.mjs`**        | NOVO: unakrsna provjera varijabli okruženja u kodu, `.env.example` i `ENVIRONMENT.md`                   |
| **`check-docs-counts-sync.mjs`**    | NOVO: provjera podudaraju li se brojevi (izvršitelji, strategije, OAuth, A2A vještine) s dokumentacijom |
| **`check-deprecated-versions.mjs`** | NOVO: označavanje zastarjelih verzija/datuma u dokumentaciji                                            |
| `check-supported-node-runtime.ts`   | Provjera je li trenutačna verzija Nodea podržana                                                        |
| `check-pr-test-policy.mjs`          | Provedba pravila „testovi su obvezni” za promjene produkcijskog koda                                    |
| **`gen-provider-reference.ts`**     | NOVO: automatsko generiranje datoteke `docs/reference/PROVIDER_REFERENCE.md` iz kataloga                |
| `i18n/generate-multilang.mjs`       | Prijevod tekstova korisničkog sučelja i dokumentacije putem Google Translatea                           |
| `i18n_autotranslate.py`             | Proces prevođenja dokumentacije temeljen na LLM-u                                                       |
| `validate_translation.py`           | Provjera prijevoda za svaki lokalitet                                                                   |
| `check_translations.py`             | Provjera i18n ključeva na strani koda                                                                   |
| `run-playwright-tests.mjs`          | Pokretač Playwright E2E testova                                                                         |
| `run-protocol-clients-tests.mjs`    | Pokretač MCP/A2A E2E testova                                                                            |
| `run-ecosystem-tests.mjs`           | Testovi ekosustava (integracije pružatelja usluga)                                                      |
| `test-report-summary.mjs`           | Generiranje Markdown sažetka pokrivenosti                                                               |
| `smoke-electron-packaged.mjs`       | Osnovno testiranje zapakirane Electron izgradnje                                                        |
| `native-binary-compat.mjs`          | Provjera podudaraju li se izvorne ovisnosti (`better-sqlite3`) s Electronovim Nodeom                    |
| `validate-pack-artifact.ts`         | Provjera izlaznog rezultata naredbe npm pack                                                            |
| `responses-ws-proxy.mjs`            | WebSocket most za Codex Responses API                                                                   |
| `v1-ws-bridge.mjs`                  | WebSocket most za krajnju točku `/api/v1/ws`                                                            |
| `standalone-server-ws.mjs`          | Pokretač samostalnog WS poslužitelja                                                                    |
| `system-info.mjs`                   | Ispis informacija o sustavu/izvršnom okruženju za podršku                                               |
| `healthcheck.mjs`                   | Jednokratna provjera stanja (upotrebljava je Docker HEALTHCHECK)                                        |
| `uninstall.mjs`                     | Skripta za čistu deinstalaciju                                                                          |

---

## `docs/` — Javna dokumentacija (7 korijenskih datoteka + 17 poddirektorija)

### Vodiči najviše razine

| Dokument                    | Namjena                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arhitektura visoke razine, pregled podsustava, sučelje nadzorne ploče                                   |
| `CODEBASE_DOCUMENTATION.md` | Inženjerska referenca: direktoriji, moduli, konvencije                                                  |
| `FEATURES.md`               | Matrica značajki s istaknutim novostima u v3.8                                                          |
| `USER_GUIDE.md`             | Priručnik za krajnje korisnike (postavljanje, modeli, kombinacije, CLI-ji, zvuk itd.)                   |
| `API_REFERENCE.md`          | Referenca API krajnjih točaka s modelom autentifikacije                                                 |
| `openapi.yaml`              | Specifikacija OpenAPI 3.0 (121 putanja)                                                                 |
| `SETUP_GUIDE.md`            | Načini instalacije (npm, npx, Docker, Electron, Termux, izvorni kod)                                    |
| `ENVIRONMENT.md`            | Sve varijable okruženja (~800 dokumentiranih, ~3.050 redaka u `.env.example`)                           |
| `TROUBLESHOOTING.md`        | Česte pogreške + poznati problemi u v3.8.0                                                              |
| `RELEASE_CHECKLIST.md`      | Cjelovit postupak izdavanja (vještine, husky, konvencionalni commitovi, implementacija)                 |
| `COVERAGE_PLAN.md`          | Ciljevi pokrivenosti i trenutačno stanje                                                                |
| `FREE_TIERS.md`             | Odabrani pružatelji besplatnih paketa (48+ besplatnih + 11 OAuth)                                       |
| `CLI-TOOLS.md`              | Vanjske CLI integracije + interni OmniRoute CLI                                                         |
| `I18N.md`                   | Arhitektura i18n, dodavanje jezika, 42 lokalizacije                                                     |
| `UNINSTALL.md`              | Koraci za čistu deinstalaciju                                                                           |
| `PROVIDER_REFERENCE.md`     | **Automatski generiran** katalog 355 pružatelja (ponovno generiranje: `npm run gen:provider-reference`) |

### Detaljni pregledi podsustava

| Dokument                                    | Namjena                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCP poslužitelj: 110 alata, 3 prijenosa, 33 opsega, REST krajnje točke                        |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 vještina, REST pomoćne funkcije, kartica agenta                         |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Objedinjeni vodič: A2A naspram ACP-a naspram agenata u oblaku                                 |
| `CLOUD_AGENT.md`                            | Orkestracija Codex Cloud / Devin / Jules                                                      |
| `SKILLS.md`                                 | Okvir vještina (ugrađene + trgovina + SkillsSH + izolirano okruženje)                         |
| `RADAR.md`                                  | Sloj Radar kataloga besplatnih modela (`RADAR_ENABLED`, zadano isključen)                     |
| `MEMORY.md`                                 | Memorijski sustav (SQLite FTS5 + Qdrant)                                                      |
| `EVALS.md`                                  | Okvir za evaluaciju (paketi, izvođenja, kriteriji)                                            |
| `GUARDRAILS.md`                             | Maskiranje osobnih podataka, ubacivanje upita, most za vizualne podatke                       |
| `COMPLIANCE.md`                             | Zapisnik revizije, zadržavanje, isključivanje putem noLog                                     |
| `WEBHOOKS.md`                               | Isporuka webhookova potpisanih HMAC-om                                                        |
| `REASONING_REPLAY.md`                       | Hibridna predmemorija memorije/SQLitea za `reasoning_content`                                 |
| `AUTHZ_GUIDE.md`                            | Tijek autorizacije (`classify` → `policies` → `enforce`)                                      |
| `RESILIENCE_GUIDE.md`                       | Prekidač strujnog kruga + razdoblje mirovanja + zaključavanje modela                          |
| `docs/security/STEALTH_GUIDE.md` (samo git) | TLS identifikacija (JA3/JA4), Claude Code CCH, MITM certifikat                                |
| `AUTO-COMBO.md`                             | Mehanizam Auto Combo (bodovanje prema 16 čimbenika, 6 paketa načina rada, virtualna tvornica) |

### Kompresija

| Dokument                        | Namjena                                  |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Pregled načina kompresije + plan razvoja |
| `COMPRESSION_ENGINES.md`        | Mehanizmi Caveman + RTK, ugovor registra |
| `COMPRESSION_RULES_FORMAT.md`   | JSON shema paketa pravila Caveman        |
| `COMPRESSION_LANGUAGE_PACKS.md` | Popis paketa pravila po jeziku           |
| `RTK_COMPRESSION.md`            | Deklarativni RTK cjevovod (49 filtara)   |

### Implementacija

| Dokument                     | Namjena                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Izrada Docker slike, profili (base/cli/host/cliproxyapi), Redis pomoćni spremnik |
| `VM_DEPLOYMENT_GUIDE.md`     | Generička implementacija na VM/VPS (Ubuntu/Debian + nginx + systemd)             |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implementacija na Fly.io (trenutačno samo na kineskom)                           |
| `TERMUX_GUIDE.md`            | Android bez grafičkog sučelja putem Termuxa                                      |
| `PWA_GUIDE.md`               | Instalacija progresivne web-aplikacije + service worker                          |
| `ELECTRON_GUIDE.md`          | Izrada + potpisivanje + distribucija aplikacije za radnu površinu                |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                           |
| `PROXY_GUIDE.md`             | Izlazni proxy u 4 razine + trgovina 1proxy                                       |

### Poddirektoriji

| Poddirektorij         | Namjena                                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalizirani prijevodi dokumentacije (41 lokalizacija)                                                                                                                                                                                         |
| `docs/screenshots/`   | Slikovni resursi za vodiče                                                                                                                                                                                                                     |
| `_tasks/superpowers/` | Planovi/specifikacije iz superpowers (`writing-plans`/`brainstorming`) + istraživanje — izolirani repozitorij s odvojenim verzioniranjem koji glavno stablo ignorira putem gita. Pogledajte CLAUDE.md → "Artefakti planiranja i istraživanja". |

---

## `tests/` — Paketi testova

| Poddirektorij                        | Vrsta                                            | Izvršitelj testova                                   |
| ------------------------------------ | ------------------------------------------------ | ---------------------------------------------------- |
| `tests/unit/`                        | Jedinični testovi (~4.800 datoteka, najbrži)     | Ugrađeni Nodeov izvršitelj testova                   |
| `tests/integration/`                 | Integracijski testovi više modula i baze         | Ugrađeni Nodeov izvršitelj testova (konkurentnost 1) |
| `tests/e2e/`                         | E2E testovi korisničkog sučelja i tijeka rada    | Playwright                                           |
| `tests/e2e/protocol-clients.test.ts` | E2E testovi MCP-a i A2A-a sa stvarnim klijentima | Prilagođeni protokolarni klijenti                    |
| `tests/e2e/ecosystem.test.ts`        | Integracija pružatelja (pristupa mreži)          | Ugrađeni Nodeov izvršitelj testova                   |

---

## `public/` — Statički resursi

| Putanja             | Namjena                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `public/` (korijen) | Favikone, robots.txt, manifest, service worker, marketinške slike |
| `public/providers/` | PNG/SVG logotipi pružatelja (koriste se na nadzornoj ploči)       |

---

## `config/` — Statičke konfiguracije i stanje kontrola kvalitete

Isporučeni predlošci konfiguracije i pohranjene referentne vrijednosti kontrola kvalitete
(premješteni ovamo iz korijena repozitorija u verziji v3.8.26 kako bi korijen ostao pregledan).

| Putanja                                       | Namjena                                                                                              |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Popis lokalizacija i metapodaci (mjerodavni izvor za broj od 42 lokalizacije)                        |
| `config/i18n-schema.json`                     | JSON shema koja provjerava valjanost datoteke `i18n.json`                                            |
| `config/payloadRules.json`                    | Pravila za sanitizaciju dolaznog korisnog sadržaja                                                   |
| `config/quality/quality-baseline.json`        | Referentna vrijednost višemetričkog zapornog mehanizma (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Zamrznuta referentna vrijednost ESLint složenosti (`check-complexity.mjs`)                           |
| `config/quality/duplication-baseline.json`    | Zamrznuta referentna vrijednost jscpd dupliciranja (`check-duplication.mjs`)                         |
| `config/quality/file-size-baseline.json`      | Zamrznuta referentna veličina za svaku datoteku (`check-file-size.mjs`)                              |
| `config/quality/test-discovery-baseline.json` | Zamrznuta referentna vrijednost testova bez pripadnosti (`check-test-discovery.mjs`)                 |
| `config/quality/dependency-allowlist.json`    | Popis dopuštenih odobrenih ovisnosti (`check-deps.mjs`)                                              |
| `config/quality/.license-allowlist.json`      | Popis dopuštenih SPDX licenci (`check-licenses.mjs`)                                                 |
| `config/quality/quality-metrics.json`         | Privremeno prikupljene metrike (generira ih `collect-metrics.mjs`; **gitignored**)                   |

---

## `.github/` — Integracija s GitHubom

| Putanja                            | Svrha                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD tijekovi rada (lint, testiranje, pokrivenost, izdanje) |
| `.github/ISSUE_TEMPLATE/`          | Predlošci prijava pogrešaka i zahtjeva za funkcionalnosti                   |
| `.github/pull_request_template.md` | PR predložak                                                                |
| `.github/dependabot.yml`           | Konfiguracija ažuriranja ovisnosti                                          |

---

## `.husky/` — Git kuke

| Datoteka     | Svrha                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | Pokreće `lint-staged + check-docs-sync + check:any-budget:t11`               |
| `pre-push`   | Trenutačno onemogućeno (zakomentirano). Ručno pokrenite `npm run test:unit`. |
| `_/`         | Interne datoteke Huskyja                                                     |

---

## `.claude/` — Claude Code naredbe s kosom crtom

| Datoteka                                            | Svrha                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — povećanje verzije + automatski zapis promjena |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — potpuni tijek rada za izdavanje           |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementacija na VPS                                              |
| `commands/capture-release-evidences-cc.md`          | Snimanje novih funkcionalnosti u pregledniku kao WebP              |
| `commands/review-{prs,discussions}-cc.md`           | Trijaža GitHub PR-ova/rasprava                                     |
| `commands/{review-issues,implement-features}-cc.md` | Tijekovi rada za probleme                                          |
| `settings.local.json`                               | Claude Code postavke za pojedinačni projekt                        |

---

## `.agents/` — Generički tijekovi rada agenata (Codex / Cursor / itd.)

| Putanja                  | Svrha                                                      |
| ------------------------ | ---------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definicija tijekova rada (preslika `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definicija vještina s napomenama za izvršavanje u Codexu |

> **Napomena:** Tijekovi rada i naredbe trenutačno su identični bajt po bajt. Ako je `.agents/` namijenjen drugom okruženju za izvršavanje agenata (Codex), varijante se trebaju smisleno razlikovati.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Izvan stabla

Ovi direktoriji s prefiksom podvlake sadrže sadržaj koji se ne isporučuje:

- **`_ideia/`** — bilješke o dizajnu (kategorije defer / notfit / viable)
- **`_mono_repo/`** — povijesni potprojekti (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klonovi povezanih OSS projekata samo za čitanje (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api itd.) za usporednu provjeru tijekom razvoja
- **`_tasks/`** — datoteke za praćenje zadataka po izdanju (neformalno)

Nije uključeno u izlaz naredbe `npm pack`. Pogledajte `.npmignore`.

---

## Generirano / zanemareno u Gitu

| Putanja                | Svrha                                       |
| ---------------------- | ------------------------------------------- |
| `node_modules/`        | npm ovisnosti                               |
| `.next/`               | Izlaz izgradnje za Next.js                  |
| `coverage/`            | Izvješća o pokrivenosti alata c8            |
| `logs/`                | Zapisnici izvođenja                         |
| `package/`             | Pripremno područje za npm pack              |
| `.playwright-mcp/`     | Testni artefakti za Playwright MCP          |
| `.issues/`             | Lokalna predmemorija problema               |
| `tsconfig.tsbuildinfo` | Predmemorija inkrementalne kompilacije TS-a |

---

## Savjeti za snalaženje

- **Novi ste suradnik?** Pročitajte `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Dodajete pružatelja usluga?** Slijedite `docs/architecture/ARCHITECTURE.md § Adding a New Provider` i usporedite s `docs/reference/PROVIDER_REFERENCE.md`.
- **Dodajete rutu?** Pogledajte `docs/architecture/ARCHITECTURE.md § Adding a New API Route` i `src/shared/validation/schemas.ts`.
- **Dodajete MCP alat?** Pogledajte `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Dodajete A2A vještinu?** Pogledajte `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Pokrećete lokalno?** Pogledajte `docs/guides/SETUP_GUIDE.md`.
- **Implementirate?** Pogledajte `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Objavljujete izdanje?** Pogledajte `docs/ops/RELEASE_CHECKLIST.md` (i vještinu Claude Code `/generate-release-cc`).
