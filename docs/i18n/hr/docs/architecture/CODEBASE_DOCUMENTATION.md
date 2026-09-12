# CODEBASE_DOCUMENTATION (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇪 [et](../../../et/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇪 [ga](../../../ga/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇹 [lt](../../../lt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇻 [lv](../../../lv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇹 [mt](../../../mt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇮 [sl](../../../sl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇸 [sr](../../../sr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "OmniRoute Codebase Documentation"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Dokumentacija Kodne Baze

> **Verzija:** v3.8.51
> **Zadnje ažuriranje:** 2026-06-28
> **Ciljana publika:** Inženjeri koji doprinose OmniRoute-u ili grade integracije na njemu.
>
> Za arhitekturne dijagrame visoke razine i obrazloženje svakog podsustava, pročitajte
> [ARCHITECTURE.md](./ARCHITECTURE.md). Za dubinska istraživanja pojedinih podsustava
> (Auto Combo, MCP server, A2A server, Skills, Memory, Cloud Agents, Resilience,
> Compression, itd.) pogledajte njihove namjenske datoteke u ovom direktoriju `docs/`.

Ova datoteka opisuje **što danas postoji u repozitoriju** kako bi novi inženjer
mogao navigirati strukturom, razumjeti slojevitost izvođenja i znati gdje dodati kod
bez izmišljanja novih modula.

---

## 1. Tehnološki Skup

| Područje      | Odabir                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Web framework | **Next.js 16** (App Router, samostalni izlaz, bez globalnog middlewarea)                                                        |
| Jezik         | **TypeScript 6.0+** — target `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                           |
| Runtime       | **Node.js** `>=22.22.2 <23` ili `>=24.0.0 <27` (nametnuto putem `engines` + `SUPPORTED_NODE_RANGE`)                             |
| Baza podataka | **SQLite** putem `better-sqlite3` (singleton, WAL journaling)                                                                   |
| Desktop       | **Electron 41** + `electron-builder` 26.10 (zasebni workspace na `electron/`)                                                   |
| Testovi       | **Node native test runner** (jedinični/integracijski), **Vitest** (MCP, autoCombo, cache), **Playwright** (e2e + protocols-e2e) |
| Izgradnja     | Next.js standalone putem `scripts/build/build-next-isolated.mjs`                                                                |
| Lint/format   | ESLint flat config + Prettier (`lint-staged` putem Husky pre-commit)                                                            |
| Sustav modula | ESM svugdje (`"type": "module"`)                                                                                                |
| Workspaces    | npm workspace — `open-sse` je jedini pod-workspace                                                                              |

Aliasi putanja (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Zadani HTTP port: **`20128`** (API i nadzorna ploča dijele isti proces). Direktorij
podataka je env varijabla `DATA_DIR`, a zadana vrijednost je `~/.omniroute/`.

---

## 2. Struktura Repozitorija

```
OmniRoute/
├── src/                  # Next.js aplikacija (App Router, libs, domain, server, shared)
├── open-sse/             # Workspace streaming enginea (@omniroute/open-sse)
├── electron/             # Desktop omotač (Electron 41 main + preload)
├── bin/                  # CLI ulazne točke (omniroute, reset-password)
├── tests/                # Jedinični, integracijski, e2e, protocols-e2e, translator, sigurnosni testovi i fixture datoteke
├── scripts/              # Skripte za izgradnju, sinkronizaciju, provjeru, migraciju i pomoćne skripte izvođenja
├── docs/                 # Javna dokumentacija (ovaj direktorij)
├── public/               # Statički resursi, PWA manifest, service worker
├── config/               # Uzorci konfiguracije izvođenja
├── images/               # Marketinški resursi/snimke zaslona
├── _ideia/, _references/, _mono_repo/, _tasks/   # Interne radne bilješke / planiranje (ne isporučuje se)
├── CLAUDE.md             # Pravila repozitorija za Claude Code
├── AGENTS.md             # Dublji arhitekturni referentni dokument za agente
├── package.json          # v3.8.51, korijen workspacea
└── tsconfig.json         # Aliasi putanja + osnovne opcije prevoditelja
```

---

## 3. `src/` — Next.js Aplikacija

```
src/
├── app/                  Stranice App Routera + API rute
├── lib/                  Osnovne biblioteke (DB, auth, OAuth, vještine, memorija, …)
├── domain/               Čisti domenski sloj (politika, rezervni plan, troškovi, zaključavanje, …)
├── server/               Moduli samo za poslužitelj (authz, cors, auth)
├── shared/               Tipovi, konstante, validacija, ugovori, utils (sigurno za međugranični prijenos)
├── mitm/                 Pomoćnici za Man-in-the-middle proxy za CLI integraciju
├── models/               Metapodaci lokalnog modela / aliasi
├── sse/                  Naslijeđeni SSE handleri koji još uvijek žive pod src/ (nije open-sse/)
├── store/                Pohrane stanja na strani klijenta
├── middleware/           Uslužni programi međuopreme na razini rute (nije globalna Next.js međuopreme)
├── scripts/              Skripte u stablu koje može uvesti kôd aplikacije
├── types/                Ambijentalni i dijeljeni TS tipovi
├── i18n/                 Paketi lokalizacije
├── instrumentation.ts    Next.js hook za instrumentaciju
├── instrumentation-node.ts
└── proxy.ts              Pomoćnik za pokretanje proxy-a na najvišoj razini
```

### 3.1 `src/app/` — App Router

App Router izlaže i korisničko sučelje nadzorne ploče i javni/upravljački HTTP API.
**Nema globalne međuopreme** — presretanje se vrši po ruti.

Segmenti najviše razine pod `src/app/`:

| Putanja                                                                       | Svrha                                                            |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `api/`                                                                        | Sve HTTP API rute (vidi razčlambu ispod)                         |
| `a2a/`                                                                        | A2A JSON-RPC 2.0 krajnja točka (`POST /a2a`)                     |
| `.well-known/agent.json/`                                                     | Dokument za otkrivanje A2A Agent Card-a                          |
| `(dashboard)/`                                                                | Korisničko sučelje nadzorne ploče (grupa ruta, bez URL prefiksa) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Tokovi autentifikacije                                           |
| `landing/`                                                                    | Marketinška/odredišna stranica                                   |
| `docs/`                                                                       | Ugrađeni preglednik API dokumentacije                            |
| `status/`, `maintenance/`, `offline/`                                         | Operativne stranice                                              |
| `privacy/`, `terms/`                                                          | Pravne stranice                                                  |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Statičke stranice pogrešaka                                      |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Granice za greške/učitavanje okvira                              |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Korjenska ljuska                                                 |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — Stranice korisničkog sučelja

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, plus korjenski `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — Grupe API-ja najviše razine

```
src/app/api/
├── a2a/{status, tasks}
├── acp/
├── admin/
├── analytics/
├── assess/
├── auth/
├── batches/
├── cache/
├── cli-tools/
├── cloud/{codex-responses-ws}
├── combos/
├── compliance/
├── compression/
├── context/
├── db/, db-backups/
├── evals/
├── fallback/
├── files/
├── health/
├── init/
├── internal/{concurrency}
├── keys/
├── logs/
├── mcp/{audit, sse, status, stream, tools}
├── memory/{health, [id]/, route.ts}
├── model-combo-mappings/
├── models/
├── monitoring/
├── oauth/
├── openapi/
├── policies/
├── pricing/
├── provider-metrics/, provider-models/, provider-nodes/
├── providers/
├── rate-limit/, rate-limits/
├── resilience/
├── restart/, shutdown/
├── search/
├── sessions/
├── settings/
├── skills/{executions, [id], install, marketplace, route.ts, skillssh}
├── storage/
├── sync/, synced-available-models/
├── system/
├── tags/
├── telemetry/
├── token-health/
├── translator/
├── tunnels/
├── services/   Upravljanje ugrađenim servisima (9router, cliproxy) — LOCAL_ONLY
├── upstream-proxy/
├── usage/
├── v1/         Javni API kompatibilan s OpenAI-em
├── v1beta/     Kompatibilnost u stilu Gemini
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Upravljanje ugrađenim servisima

Rute za instalaciju, pokretanje, zaustavljanje i praćenje 9Router-a i CLIProxyAPI-ja.
Sve putanje klasificirane su kao **LOCAL_ONLY** (samo povratna petlja, tvrdo pravilo #17) jer mogu
pokrenuti `npm install` i stvarati podređene procese.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             pomoćnik getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install putem execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install novije verzije
│   ├── rotate-key/route.ts POST — generira novi API ključ + restart
│   ├── status/route.ts     GET  — live + DB status + metapodaci verzije
│   └── auto-start/route.ts POST — uključivanje/isključivanje zastavice auto_start
├── cliproxy/
│   ├── _lib.ts             pomoćnik getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install novije verzije
│   ├── status/route.ts     GET  — live + DB status + metapodaci verzije
│   └── auto-start/route.ts POST — uključivanje/isključivanje zastavice auto_start
└── [name]/
    └── logs/route.ts       GET  — SSE praćenje zapisa (dijeljeno između svih servisa)
```

Odgovarajuće korisničko sučelje nadzorne ploče:
`src/app/(dashboard)/dashboard/providers/services/` — stranica s dvije kartice (CLIProxyAPI + 9Router).
Obrnuti proxy za ugrađeno korisničko sučelje 9Router-a:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Detaljni pregled: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — Javni API kompatibilan s OpenAI-em

```
v1/
├── accounts/[id]/                       pretraga računa
├── agents/tasks/[id]/, agents/tasks/    krajnje točke zadataka u A2A stilu
├── api/                                 interni API pomoćnici izloženi pod v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      OpenAI Batches API
├── chat/completions/                    Chat Completions (glavna krajnja točka)
├── completions/                         Naslijeđena tekstualna dovršavanja
├── embeddings/                          Ugradnje
├── files/[id]/, files/                  Files API
├── _helpers/                            Dijeljeni pomoćnici ruta (bez javnog URL-a)
├── images/{edits, generations}/         Generiranje + uređivanje slika
├── issues/                              Krajnje točke pomoćnika za trijažu
├── management/{proxies}/                Rute opsega upravljanja unutar v1
├── messages/{count_tokens}/             Compat s Anthropic-ovim stilom poruka
├── models/                              Popis modela (`route.ts`, `catalog.ts`)
├── moderations/                         Moderacija
├── music/                               Generiranje glazbe
├── providers/[provider]/                Operacije po davatelju usluge
├── quotas/{check}                       Provjere kvote
├── registered-keys/                     Administracija registriranih ključeva
├── rerank/                              Ponovni rang
├── responses/[...path]/                 OpenAI Responses API (catch-all)
├── search/                              Web pretraživanje
├── videos/                              Generiranje videa
├── ws/                                  WebSocket most
└── route.ts                             Indeksni handler
```

Svaka datoteka rute slijedi isti obrazac:

```
Ruta → CORS provjera letom → Zod validacija tijela → opcionalna autentifikacija
      → primjena politike API ključeva → delegacija handlera (open-sse)
```

`v1beta/` je površina kompatibilnosti u stilu Gemini (tanka omotnica koja prevodi u
isti cjevovod `open-sse/handlers/`).

### 3.2 `src/lib/` — Osnovne biblioteke

Uvijek uvozite podatke, sinkronizaciju, OAuth, vještine, memoriju itd. kroz ove module. Tablica
grupira stvarne direktorije i važne datoteke na najvišoj razini.

| Modul             | Svrha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | A2A protokolni poslužitelj: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 vještina: analiza troškova, izvještaj o zdravlju, otkrivanje davatelja usluge, upravljanje kvotom, pametno usmjeravanje, list-capabilities)                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `acp/`            | Agent-Control-Protocol: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `api/`            | Interni API pomoćnici: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `auth/`           | `managementPassword.ts` (resetiranje/hashiranje lozinke)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `batches/`        | Servis OpenAI Batches API (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `catalog/`        | Sinkronizacija OpenRouter kataloga (`openrouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `cloudAgent/`     | Registar cloud agenata: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `combos/`         | Pomoćnici za razrješavanje kombija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `compliance/`     | Revizija + revizija davatelja usluge: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `config/`         | Ljepilo konfiguracije izvođenja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `db/`             | SQLite domenski moduli (vidi §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `display/`        | Pomoćnici za prikaz korisničkog sučelja koje koriste API odgovori                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `embeddings/`     | Registar servisa ugradnji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `env/`            | Učitavanje env-a + introspekcija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `evals/`          | Izvođenje evaluacija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `jobs/`           | Pozadinski poslovi (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `memory/`         | Trajna memorija: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `oauth/`          | OAuth/uvoz modula davatelja usluge (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed`, plus `services/`, `utils/`, i `constants/oauth.ts`                                                                                                                                                                                                                                                                                                                     |
| `plugins/`        | Učitavač dodataka (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `providerModels/` | Upravljani životni ciklus modela: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `providers/`      | Pomoćnici davatelja usluge: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `resilience/`     | `settings.ts` — postavke za prekidač kruga, hlađenje, zaključavanje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `runtime/`        | Otkrivanje značajki izvođenja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `services/`       | Okvir ugrađenih servisa: `ServiceSupervisor.ts` (generički nadzornik podređenog procesa s bravom operacije, kružnim međuspremnikom, provjerom zdravlja), `bootstrap.ts` (registracija na razini procesa i automatsko pokretanje), `registry.ts` (mapa alata → nadzornik), `apiKey.ts` (pohrana ključeva AES-256-GCM), `modelSync.ts` (periodična sinkronizacija modela), `ringBuffer.ts` (kružni međuspremnik zapisa od 5 MB), `healthCheck.ts` (HTTP provjera zdravlja), `types.ts`, `embedWsProxy.ts` (WebSocket proxy), `installers/{ninerouter,cliproxy}.ts`. Vidi `docs/frameworks/EMBEDDED-SERVICES.md`                                                                          |
| `agentSkills/`    | Katalog i generator vještina agenta: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → zapisuje `skills/{id}/SKILL.md`), `openapiParser.ts` (izvlači REST krajnje točke iz OpenAPI specifikacije), `cliRegistryParser.ts` (izvlači CLI podkomande iz bin/cli-registry), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Koriste REST rute (`/api/agent-skills/*`), MCP alati (`omniroute_agent_skills_*`) i A2A vještina `list-capabilities`. Vidi [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Okvir vještina: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, plus `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `spend/`          | `batchWriter.ts` (međuspremnik pisanja s odgodom)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `sync/`           | `bundle.ts`, `tokens.ts` (Cloud Sync)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `system/`         | Pomoćnici na razini sustava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `translator/`     | Ljepilo prevoditelja na najvišoj razini (delegira u `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `usage/`          | Obračun korištenja: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `versionManager/` | Automatsko ažuriranje + manifest verzije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `ws/`             | WebSocket most                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `zed-oauth/`      | OAuth tok Zed urednika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Datoteke na najvišoj razini u `src/lib/`:

- Stari bačvi `localDb.ts` je uklonjen — potrošači izravno uvoze specifične module `src/lib/db/*`.
- `proxyHealth.ts`, `proxyLogger.ts`, `tokenHealthCheck.ts`, `localHealthCheck.ts`
- `apiBridgeServer.ts`, `cacheLayer.ts`, `semanticCache.ts`, `settingsCache.ts`
- `cloudSync.ts`, `initCloudSync.ts`
- `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts`
- `consoleInterceptor.ts`, `container.ts`, `gracefulShutdown.ts`, `idempotencyLayer.ts`
- `ipUtils.ts`, `logEnv.ts`, `logPayloads.ts`, `logRotation.ts`
- `modelAliasSeed.ts`, `modelCapabilities.ts`, `modelMetadataRegistry.ts`, `modelsDevSync.ts`
- `piiSanitizer.ts`, `pricingSync.ts`
- `apiKeyExposure.ts`, `cacheControlSettings.ts`, `dataPaths.ts`, `toolPolicy.ts`
- `translatorEvents.ts`, `usageDb.ts`, `usageAnalytics.ts`, `webhookDispatcher.ts`

#### 3.2.1 `src/lib/db/`

Jedinstven SQLite baza podataka (`getDbInstance()` u `core.ts`, WAL journaling).
**Nikada ne pišite sirovi SQL u rutama ili handlerima** — koristite ove module.

![Pregled sheme baze podataka (odabrane osnovne tablice)](../diagrams/exported/db-schema-overview.svg)

> Izvor: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Domenski moduli (svaki posjeduje jednu ili više tablica): `apiKeys.ts`, `backup.ts`,
`batches.ts`, `cleanup.ts`, `cliToolState.ts`, `combos.ts`,
`commandCodeAuth.ts`, `compression.ts`, `compressionAnalytics.ts`,
`compressionCacheStats.ts`, `compressionCombos.ts`, `compressionScheduler.ts`,
`contextHandoffs.ts`, `core.ts`, `creditBalance.ts`, `databaseSettings.ts`,
`detailedLogs.ts`, `domainState.ts`, `encryption.ts`, `evals.ts`, `files.ts`,
`healthCheck.ts`, `jsonMigration.ts`, `migrationRunner.ts`,
`modelComboMappings.ts`, `models.ts`, `oneproxy.ts`, `prompts.ts`,
`providers.ts`, `providerLimits.ts`, `proxies.ts`, `quotaSnapshots.ts`,
`readCache.ts`, `reasoningCache.ts`, `registeredKeys.ts`, `secrets.ts`,
`sessionAccountAffinity.ts`, `settings.ts`, `stateReset.ts`, `stats.ts`,
`syncTokens.ts`, `tierConfig.ts`, `upstreamProxy.ts`, `versionManager.ts`,
`webhooks.ts`.

`migrations/` sadrži 168 verzioniranih `.sql` datoteka (idempotentnih, transakcijskih) koje
izvršava `migrationRunner.ts` pri pokretanju.

Tablice stvorene kroz migracije (ukupno 123):

`a`, `account_key_limits`, `api_keys`, `batches`, `call_logs`,
`combo_adaptation_state`, `combos`, `command_code_auth_sessions`,
`compression_analytics`, `compression_cache_stats`,
`compression_combo_assignments`, `compression_combos`, `context_handoffs`,
`daily_usage_summary`, `db_meta`, `domain_budgets`, `domain_circuit_breakers`,
`domain_cost_history`, `domain_fallback_chains`, `domain_lockout_state`,
`eval_cases`, `eval_runs`, `eval_suites`, `files`, `hourly_usage_summary`,
`key_value`, `mcp_tool_audit`, `memories`, `model_combo_mappings`,
`provider_connections`, `provider_key_limits`, `provider_nodes`,
`proxy_assignments`, `proxy_logs`, `proxy_registry`, `quota_snapshots`,
`reasoning_cache`, `registered_keys`, `request_detail_logs`,
`routing_decisions`, `semantic_cache`, `session_account_affinity`,
`skill_executions`, `skills`, `sync_tokens`, `tier_assignments`,
`tier_config`, `upstream_proxy_config`, `usage_history`, `version_manager`,
`webhooks` (plus FTS5 virtualne tablice za pretraživanje memorije).

### 3.3 `src/domain/` — Domenski sloj

Čista poslovna logika, bez I/O. Uvozi se od strane ruta i handlera.

| Datoteka                                   | Svrha                                                    |
| ------------------------------------------ | -------------------------------------------------------- |
| `policyEngine.ts`                          | Razrješivač politika na najvišoj razini                  |
| `fallbackPolicy.ts`                        | Stablo odlučivanja za rezervni plan                      |
| `costRules.ts`                             | Pravila izračuna troškova                                |
| `lockoutPolicy.ts`                         | Odluke o zaključavanju modela                            |
| `tagRouter.ts`                             | Usmjeravanje temeljeno na oznakama                       |
| `comboResolver.ts`                         | Razrješavanje kombija iz zahtjeva → ciljana lista        |
| `connectionModelRules.ts`                  | Filtri modela po vezi                                    |
| `modelAvailability.ts`                     | Provjera dostupnosti modela                              |
| `degradation.ts`                           | Prijelazi u degradirani način rada                       |
| `providerExpiration.ts`                    | Otkrivanje isteklih računa/ključeva                      |
| `quotaCache.ts`                            | Predmemorirane odluke o kvoti                            |
| `responses.ts`, `omnirouteResponseMeta.ts` | Pomoćnici oblika odgovora                                |
| `configAudit.ts`                           | Revizija promjena konfiguracije                          |
| `assessment/`                              | Procjena modela (prema RFC-u, djelomično implementirano) |
| `types.ts`                                 | Dijeljeni domenski tipovi                                |

### 3.4 `src/server/` — Samo za poslužitelj

Ne može se uvoziti iz klijentskih komponenti.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Klasificira rute kao javne ili upravljačke
│   ├── assertAuth.ts      Pomoćnik za potvrdu
│   ├── context.ts         Authz kontekst po zahtjevu
│   ├── headers.ts
│   ├── pipeline.ts        Authz cjevovod
│   ├── policies/          Konkretne politike
│   └── types.ts
└── cors/origins.ts        Popis dopuštenih CORS izvora
```

### 3.5 `src/shared/` — Sigurno za dijeljenje

Podijeljeno u fokusirane poddirektorije:

- `constants/` — `providers.ts` (katalog davatelja usluge validiran Zod-om), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts` (popis zabrana), `mcpScopes.ts`,
  `errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
  `bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
  `sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 Zod shema), `compressionConfigSchemas.ts`,
  `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — javni API ugovori isporučeni na npm.
- `types/` — dijeljeni TS tipovi.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`, `cloud.ts`, `cn.ts`,
  `cors.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts`, plus hookovi/komponente nadzorne ploče pod `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/`.

---

## 4. `open-sse/` — Radni prostor streaming pogona

Zasebni npm radni prostor objavljen kao `@omniroute/open-sse`. Sadrži obradu
zahtjeva, izvršitelje, prevoditelje, servise, transformator i MCP poslužitelj.

```
open-sse/
├── index.ts                Javni izvozi
├── package.json            Manifest radnog prostora
├── tsconfig.json
├── types.d.ts
├── config/                 Registri pružatelja usluga, profili zaglavlja, identitet, …
├── handlers/               Upravljači zahtjevima (chat, ugrađivanja, audio, slika, …)
├── executors/              108 izvršitelja specifičnih za pružatelja usluga (HTTP)
├── translator/             Pretvorba formata (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Responses API ↔ transformator toka Chat Completions
├── services/               80+ servisnih modula (kombinacije, zamjena, kvote, identitet, …)
├── utils/                  Streaming pomoćnici, TLS klijent, AWS SigV4, proxy dohvat, …
└── mcp-server/             MCP poslužitelj (3 transporta, 33 opsega, 110 alata)
```

### 4.1 `open-sse/handlers/`

| Upravljač               | Svrha                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `chatCore.ts`           | Glavni chat cjevovod (predmemorija, ograničenje brzine, usmjeravanje kombinacija, otprema izvršitelja) |
| `responsesHandler.ts`   | Ulazna točka OpenAI Responses API-ja                                                                   |
| `embeddings.ts`         | Ugrađivanja                                                                                            |
| `imageGeneration.ts`    | Generiranje slika                                                                                      |
| `audioSpeech.ts`        | Pretvorba teksta u govor                                                                               |
| `audioTranscription.ts` | Pretvorba govora u tekst                                                                               |
| `videoGeneration.ts`    | Generiranje videa                                                                                      |
| `musicGeneration.ts`    | Generiranje glazbe                                                                                     |
| `rerank.ts`             | Ponovni poredak                                                                                        |
| `moderations.ts`        | Moderiranje                                                                                            |
| `search.ts`             | Pretraživanje weba                                                                                     |
| `sseParser.ts`          | Parser SSE događaja                                                                                    |
| `usageExtractor.ts`     | Izvlačenje broja tokena iz uzvodnih tokova                                                             |
| `responseSanitizer.ts`  | Uklanjanje šuma specifičnog za pružatelja usluga                                                       |
| `responseTranslator.ts` | Spona između odgovora pružatelja usluga i sloja prevoditelja                                           |

### 4.2 `open-sse/executors/`

108 izvršitelja pružatelja usluga, svaki proširuje `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop`, plus `claudeIdentity.ts`
(dijeljeni pomoćnik identiteta) i `index.ts` (registar).

> Napomena: pružatelji usluga koji nisu navedeni ovdje poslužuju se putem `default.ts` koristeći generički
> izvršitelj kompatibilan s OpenAI-jem. Potpuni katalog pružatelja usluga (355 pružatelja) nalazi se u
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Prevođenje tipa zvjezdišta i žbica (OpenAI je zvjezdište).

- **9 prevoditelja zahtjeva** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 prevoditelja odgovora** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 pomoćnika** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, plus
  testovi pomoćnika.
- **Pomoćnici za slike** (`translator/image/sizeMapper.ts`).
- Najviša razina: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — pretvarač Responses API ↔ Chat Completions temeljen na `TransformStream`
  (koristi ga catch-all ruta `responses/`).

### 4.5 `open-sse/services/`

Istaknuti primjeri (cijeli popis u `open-sse/services/`):

| Područje                   | Datoteke                                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Usmjeravanje kombinacija   | `combo.ts` (19 strategija), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                             |
| Pogon Auto Combo           | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Otpornost                  | `accountFallback.ts` (hlađenje + zaključavanje), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                        |
| Kvote                      | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Predmemoriranje            | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                     |
| Inteligencija usmjeravanja | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| Rukovanje modelima         | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Kompresija                 | `compression/` — potpuno ožičenje pogona kompresije                                                                                                                                                                                               |
| Token i sesija             | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Razina i manifest          | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP i mreža                 | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Grupna obrada              | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Korištenje                 | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 jedinstvenih alata** ožičenih u `server.ts` (45 kanonskih u `schemas/tools.ts` +
  moduli za memoriju, vještine, GitHub-vještine, pool, gamifikaciju, dodatke, Notion, Obsidian,
  lokalni korpus i kompresiju — unija prebrojana pomoću `countUniqueMcpTools`).
- **3 transporta**: stdio, HTTP Streamable, SSE.
- **33 opsega** provedenih pri izvođenju — osnovni popis u `src/shared/constants/mcpScopes.ts`, potpuni skup je unija opsega koje deklarira svaki modul alata.
- Revizijska tablica: `mcp_tool_audit` (popunjava `audit.ts`).
- Datoteke: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  plus testovi u `__tests__/`.
- Pogledajte [MCP-SERVER.md](../frameworks/MCP-SERVER.md) za potpuni katalog alata.

### 4.7 `open-sse/config/`

Registri pružatelja usluga (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), registri modela po formatu (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
pomoćnici identiteta (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
pomoćnici vjerodajnica (`credentialLoader.ts`, `codexClient.ts`) i cloud
adapteri (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Primitivi streaminga i pomoćnici pružatelja usluga: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Omotač za stolna računala

```
electron/
├── main.js                  # Electron glavni proces
├── preload.js               # Preload most (contextIsolation omogućen)
├── types.d.ts
├── package.json             # electron-builder konfiguracija, verzija 3.8.51
├── README.md
├── assets/                  # Resursi za izgradnju (ikone, ovlaštenja, …)
├── node_modules/            # Namjenski node_modules (better-sqlite3, electron-updater)
└── dist-electron/           # Izlaz izgradnje (nije pohranjen u repozitorij)
```

Pet npm skripti na razini radnog prostora: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Automatsko ažuriranje
putem `electron-updater` koji pokazuje na GitHub feed objava.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           # Glavna CLI ulazna točka (Node ESM)
├── reset-password.mjs      # Resetiranje lozinke za upravljanje putem CLI-a
├── mcp-server.mjs          # Pokretač MCP poslužitelja (stdio)
├── nodeRuntimeSupport.mjs  # Provjera verzije Nodea
└── cli/
    ├── program.mjs         # Graditelj Commander programa
    ├── runtime.mjs         # withRuntime pomoćnik (server-first/db-fallback)
    ├── output.mjs          # Formateri izlaza (json/jsonl/table/csv)
    ├── i18n.mjs            # t() pomoćnik s jezičnim postavkama
    ├── api.mjs             # API fetch pomoćnik
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    # Registracija naredbi
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             # (jedna datoteka po naredbi/grupi)
```

Dvije binarne datoteke izložene u `package.json` → `bin`:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Direktorij                                           | Vrsta                                                                                                            |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `tests/unit/`                                        | Jedinični testovi putem Node nativnog pokretača testova (1821 datoteka, plus podmappe `api/`, `auth/`, `authz/`) |
| `tests/integration/`                                 | Testovi međumodulne integracije i stanja baze podataka                                                           |
| `tests/e2e/`                                         | Playwright UI testovi                                                                                            |
| `tests/e2e/protocol-clients.test.ts`                 | MCP/A2A protokolni e2e testovi                                                                                   |
| `tests/translator/`                                  | Testovi specifični za prevoditelja                                                                               |
| `tests/security/`                                    | Sigurnosne regresije                                                                                             |
| `tests/load/`                                        | Testovi opterećenja i stresa                                                                                     |
| `tests/golden-set/`                                  | Referentni izlazi za regresije prevoditelja                                                                      |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Podrška                                                                                                          |

Uobičajene naredbe:

| Naredba                                                  | Što pokreće                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------ |
| `npm run test:unit`                                      | Svi `tests/unit/*.test.ts` putem Node pokretača testova (istodobnost 10) |
| `npm run test:vitest`                                    | Vitest skup testova (MCP, autoCombo, cache)                              |
| `npm run test:e2e`                                       | Playwright UI skup testova                                               |
| `npm run test:protocols:e2e`                             | MCP + A2A protokolni e2e testovi                                         |
| `npm run test:coverage`                                  | Provjera pokrivenosti (≥60% redaka/iskaza/funkcija/grana)                |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Pokretanje pojedinačne datoteke                                          |

---

## 8. `scripts/`

Organizirano u 6 podmapa prema namjeni.

- **`scripts/build/`** — `build-next-isolated.mjs`, `prepublish.ts`,
  `prepare-electron-standalone.mjs`, `pack-artifact-policy.ts`,
  `validate-pack-artifact.ts`, `postinstall.mjs`, `postinstallSupport.mjs`,
  `uninstall.mjs`, `bootstrap-env.mjs`, `runtime-env.mjs`,
  `native-binary-compat.mjs`.
- **`scripts/dev/`** — `run-next.mjs`, `run-next-playwright.mjs`,
  `run-standalone.mjs`, `standalone-server-ws.mjs`, `responses-ws-proxy.mjs`,
  `v1-ws-bridge.mjs`, `smoke-electron-packaged.mjs`,
  `run-playwright-tests.mjs`, `run-ecosystem-tests.mjs`,
  `run-protocol-clients-tests.mjs`, `sync-env.mjs`, `healthcheck.mjs`,
  `system-info.mjs`.
- **`scripts/check/`** — `check-cycles.mjs`, `check-docs-sync.mjs`,
  `check-docs-counts-sync.mjs`, `check-env-doc-sync.mjs`,
  `check-deprecated-versions.mjs`, `check-route-validation.mjs`,
  `check-t11-any-budget.mjs`, `check-pr-test-policy.mjs`,
  `check-supported-node-runtime.ts`, `test-report-summary.mjs`.
- **`scripts/docs/`** — `generate-docs-index.mjs`, `gen-provider-reference.ts`.
- **`scripts/i18n/`** — `generate-multilang.mjs`, `run-visual-qa.mjs`,
  `generate-qa-checklist.mjs`, `apply-priority-overrides.mjs`,
  `validate_translation.py`, `check_translations.py`, `i18n_autotranslate.py`,
  `untranslatable-keys.json`.
- **`scripts/ad-hoc/`** — `cursor-tap.cjs`, `sync-cursor-models.mjs`,
  `migrate-env.mjs`, `dbsetup.js`.

---

## 9. Cjevovod zahtjeva (sažetak)

![Cjevovod zahtjeva (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Izvor: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Klijentski zahtjev
  → /v1/chat/completions (route.ts)
     Provjera CORS preflight-a
     Zod validacija (chatCompletionsSchema u shared/validation/schemas.ts)
     Autentifikacija (extractApiKey + isValidApiKey ILI requireManagementAuth)
     Modul politike (src/server/authz/pipeline.ts)
     Zaštitne mjere (PII masker, injekcija upita, vision bridge)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Provjera predmemorije (semantička + predmemorija čitanja)
     Ograničenje brzine (rateLimitManager, accountSemaphore)
     Kombinirano usmjeravanje (ako se model razrješava u kombinaciju)
       comboResolver → petlja po cilju → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       dohvat uzvodnog izvora → ponovni pokušaj/backoff putem accountFallback
     translateResponse() (open-sse/translator/response/*)
     SSE tok ILI JSON odgovor
     Ako Responses API: TransformStream putem open-sse/transformer/responsesTransformer.ts
  → Revizija usklađenosti (src/lib/compliance/)
  → Odgovor klijentu
```

### Stanje otpornosti u izvođenju (tri mehanizma)

| Mehanizam                  | Opseg                    | Lokacija                                                                                                |
| -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| Prekidač sklopa pružatelja | Cijeli pružatelj usluge  | `src/shared/utils/circuitBreaker.ts`, pohranjeno u `domain_circuit_breakers`                            |
| Hlađenje veze              | Jedan račun/ključ        | `markAccountUnavailable()` u `src/sse/services/auth.ts`; koristi `accountFallback.checkFallbackError()` |
| Blokada modela             | Pružatelj + veza + model | `open-sse/services/accountFallback.ts`, pohranjeno u `domain_lockout_state`                             |

Pogledajte [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) i posvećeni odjeljak u
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Kako doprinijeti projektu

### Dodavanje novog pružatelja usluge

1. Registrirajte u `src/shared/constants/providers.ts` (Zod-validacija pri učitavanju).
2. Dodajte izvršitelj u `open-sse/executors/` ako je potrebna prilagođena logika
   (proširite `BaseExecutor`).
3. Dodajte prevoditelj u `open-sse/translator/` ako ne koristi OpenAI format.
4. Ako se temelji na OAuth-u, dodajte konfiguraciju u `src/lib/oauth/providers/` i
   `src/lib/oauth/services/`.
5. Registrirajte modele u `open-sse/config/providerRegistry.ts` (ili u registru specifičnom
   za format unutar `open-sse/config/`).
6. Napišite testove u `tests/unit/`.

### Dodavanje nove API rute

1. Kreirajte `src/app/api/your-route/route.ts`.
2. Slijedite obrazac: CORS → Zod validacija tijela zahtjeva → autentifikacija → delegacija rukovatelju.
3. Ako je oblik zahtjeva nov: dodajte Zod shemu u `src/shared/validation/schemas.ts`.
4. Ako je namijenjeno samo upravljanju: dodajte putanju u `src/shared/constants/publicApiRoutes.ts`
   (lista zabrana za javno API sučelje).
5. Dodajte testove u `tests/unit/`.
6. Ažurirajte `docs/reference/API_REFERENCE.md` i `docs/openapi.yaml`.

### Dodavanje novog DB modula

1. Kreirajte `src/lib/db/yourModule.ts` i uvezite `getDbInstance()` iz `./core.ts`.
2. Izvezite CRUD funkcije za svoju domenu.
3. Ako su potrebne nove tablice: dodajte migraciju u `src/lib/db/migrations/`, numeriranu
   sekvencijalno, idempotentnu i transakcijsku.
4. Uvoznici koriste izravne uvoze iz `@/lib/db/yourModule` (bez bačve — stari sloj ponovnog izvoza `localDb.ts` je uklonjen).
5. Dodajte testove u `tests/unit/`.

### Dodavanje novog MCP alata

1. Dodajte definiciju alata u `open-sse/mcp-server/tools/` (ili proširite
   `open-sse/mcp-server/schemas/tools.ts`).
2. Dodijelite odgovarajući opseg (ili više njih) u `src/shared/constants/mcpScopes.ts`.
3. Registrirajte alat u `open-sse/mcp-server/server.ts`.
4. Dodajte testove u `open-sse/mcp-server/__tests__/`.
5. Ažurirajte [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Dodavanje nove A2A vještine

Pogledajte [A2A-SERVER.md § Adding a New Skill](../frameworks/A2A-SERVER.md). Vještine se nalaze u
`src/lib/a2a/skills/` i registriraju se putem A2A upravitelja zadataka.

---

## 11. Konvencije

- **Stil koda**: uvlačenje 2 razmaka, dvostruki navodnici, širina 100 znakova, točka-zarezi,
  `es5` završni zarezi — primjenjuje Prettier putem `lint-staged`.
- **Uvozi**: vanjski → interni (`@/`, `@omniroute/open-sse`) → relativni.
- **Imenovanje**: datoteke `camelCase` ili `kebab-case`, komponente `PascalCase`,
  konstante `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` svugdje;
  `no-explicit-any` = `warn` u `open-sse/` i `tests/`, a `error` drugdje.
- **TypeScript**: `strict: false` (naslijeđeni pristup). Preferirajte eksplicitne tipove nad
  zaključivanjem za granice između modula.
- **Baza podataka**: nikada ne pišite sirovi SQL u rutama ili rukovateljima — uvijek koristite
  module iz `src/lib/db/`. Nikada ne koristite bačva-uvoz — koristite izravno specifične module `src/lib/db/*`.
- **Tipizacija DB entiteta (#3512)**: funkcija koja zapisuje ili čita oblik retka tablice baze podataka
  treba primati/vraćati imenovano TS sučelje koje zrcali stupce te tablice 1:1, a ne `any` ili
  anonimni inline tip na mjestu poziva. Smjestite sučelje uz funkciju (npr. `export interface UsageEntry` u
  `src/lib/usage/usageHistory.ts` iznad `saveRequestUsage`), zadržite pojedinačna polja kao
  optional/nullable kada različiti pisači popunjavaju redak postupno, i preferirajte `unknown` umjesto
  `any` za polje čiji oblik varira između pozivatelja (dokumentirano na polju, npr. `UsageEntry.tokens`
  prihvaća i sirovi oblik korištenja pružatelja usluge i normalizirani oblik). Čim broj pojava `any` u
  datoteci dostigne nulu na ovaj način, dodajte je u dopuštenu listu `check:any-budget:t11`
  (`scripts/check/check-t11-any-budget.mjs`, `maxAny: 0`) kako ne bi moglo doći do regresije. Ovo je
  konvencija prvog isječka — šire čišćenje "bez anonimnog `any`" je iterativno kroz ostatak baze koda.
- **Pogreške**: try/catch s određenim tipovima pogrešaka, zapisivanje u log s pino kontekstom. Nikada
  tiho ne gutajte pogreške u SSE tokovima; koristite abort signale za čišćenje.
- **Sigurnost**: nikada ne koristite `eval()` / `new Function()` / impliciranu eval. Validirajte
  sve ulaze s Zod-om. Šifrirajte vjerodajnice u mirovanju (AES-256-GCM). Održavajte listu zabrana
  `src/shared/constants/upstreamHeaders.ts` usklađenom sa slojem sanitizacije/validacije.
- **Kommiti**: Konvencionalni kommiti — `feat(scope): subject`. Dopušteni opsezi:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Grane**: prefiksi `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Nikada ne kommitajte izravno na `main`.
- **Husky**: pre-commit pokreće `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; pre-push pokreće `check:any-budget:t11` + `check:tracked-artifacts` (brza provjera; isključuje `test:unit`).

---

## 12. Stroga Pravila (iz CLAUDE.md)

1. Nikad ne commitat tajne podatke ili vjerodajnice.
2. Nikad ne koristiti barrel-import — koristiti specifične `src/lib/db/*` module izravno.
3. Nikad ne koristiti `eval()` / `new Function()` / implicitni eval.
4. Nikad ne commitat izravno na `main`.
5. Nikad ne pisati sirovi SQL u rutama — uvijek prolaziti kroz `src/lib/db/` module.
6. Nikad tiho gutati greške u SSE streamovima.
7. Uvijek validirati ulazne podatke Zod shemama.
8. Uvijek uključiti testove pri izmjeni produkcijskog koda.
9. Pokrivenost mora ostati ≥ 60% (naredbe, linije, funkcije, grane).

---

## 13. Vidi Također

- [ARCHITECTURE.md](./ARCHITECTURE.md) — arhitektura visoke razine i odgovornosti modula.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — referenca javnog i upravljačkog API-ja.
- [FEATURES.md](../guides/FEATURES.md) — matrica značajki i istaknute verzije.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — dubinska analiza circuit breakera, cooldowna i lockota.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — bodovanje i strategije Auto Combo-a.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — potpuni katalog MCP alata i transporti.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — vještine A2A protokola i otkrivanje.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — RTK + Caveman kompresija.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — CLI integracije.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (ako postoji), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — ciljane platforme za implementaciju.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — uobičajeni operativni problemi.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — tijek rada suradnika.
- [CLAUDE.md](../../CLAUDE.md) — pravila repozitorija za Claude Code (izvor istine
  za mnoge od gore navedenih konvencija).
- [AGENTS.md](../../AGENTS.md) — dublja arhitekturalna referenca koju koriste agenti.
