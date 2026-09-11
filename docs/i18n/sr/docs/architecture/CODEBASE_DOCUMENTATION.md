# CODEBASE_DOCUMENTATION (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇪 [et](../../../et/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇪 [ga](../../../ga/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇷 [hr](../../../hr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇹 [lt](../../../lt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇻 [lv](../../../lv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇹 [mt](../../../mt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇮 [sl](../../../sl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "OmniRoute Codebase Documentation"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Codebase Documentation

> **Verzija:** v3.8.51
> **Zadnje ažurirano:** 2026-06-28
> **Ciljna publika:** Inženjeri koji doprinose OmniRoute-u ili prave integracije na osnovu njega.
>
> Za dijagrame arhitekture na visokom nivou i razmišljanje koje stoji iza svakog podsistema, pročitajte
> [ARCHITECTURE.md](./ARCHITECTURE.md). Za detaljne uvide u pojedinačne podsisteme
> (Auto Combo, MCP server, A2A server, Skills, Memory, Cloud Agents, Resilience,
> Compression, itd.) pogledajte njihove namenske fajlove u ovom `docs/` direktorijumu.

Ovaj fajl opisuje **šta trenutno postoji u repozitorijumu** kako bi novi inženjer
mogao da se snađe u strukturi, razume slojevitost pri izvršavanju i zna gde da dodaje kod
bez izmišljanja novih modula.

---

## 1. Tehnološki stek

| Oblast           | Izbor                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Web framework    | **Next.js 16** (App Router, standalone izlaz, bez globalnog middleware-a)                                                |
| Jezik            | **TypeScript 6.0+** — cilj `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                      |
| Runtime          | **Node.js** `>=22.22.2 <23` ili `>=24.0.0 <27` (obezbeđeno kroz `engines` + `SUPPORTED_NODE_RANGE`)                      |
| Baza podataka    | **SQLite** preko `better-sqlite3` (singleton, WAL journaling)                                                            |
| Desktop          | **Electron 41** + `electron-builder` 26.10 (poseban workspace u `electron/`)                                             |
| Testovi          | **Node native test runner** (unit/integration), **Vitest** (MCP, autoCombo, cache), **Playwright** (e2e + protocols-e2e) |
| Build            | Next.js standalone preko `scripts/build/build-next-isolated.mjs`                                                         |
| Lint/format      | ESLint flat config + Prettier (`lint-staged` preko Husky pre-commit)                                                     |
| Modularni sistem | ESM svuda (`"type": "module"`)                                                                                           |
| Workspaces       | npm workspace — `open-sse` je jedini pod-workspace                                                                       |

Aliasi za putanje (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Podrazumevani HTTP port: **`20128`** (API i dashboard dele isti proces). Direktorijum
za podatke se navodi kroz `DATA_DIR` env varijablu, čija je podrazumevana vrednost `~/.omniroute/`.

---

## 2. Struktura repozitorijuma

```
OmniRoute/
├── src/                  Next.js aplikacija (App Router, biblioteke, domen, server, deljeno)
├── open-sse/             Workspace za streaming engine (@omniroute/open-sse)
├── electron/             Desktop wrapper (Electron 41 main + preload)
├── bin/                  CLI ulazne tačke (omniroute, reset-password)
├── tests/                Unit, integration, e2e, protocols-e2e, translator, security, fixtures
├── scripts/              Build, sync, check, migration i runtime helper skripte
├── docs/                 Javna dokumentacija (ovaj direktorijum)
├── public/               Statički resursi, PWA manifest, service worker
├── config/               Primeri runtime konfiguracije
├── images/               Marketing/screenshot resursi
├── _ideia/, _references/, _mono_repo/, _tasks/   Interne beleške / planiranje (ne isporučuje se)
├── CLAUDE.md             Pravila repozitorijuma za Claude Code
├── AGENTS.md             Dublja arhitekturna referenca za agente
├── package.json          v3.8.51, koren workspace-a
└── tsconfig.json         Aliasi za putanje + osnovne opcije kompajlera
```

---

## 3. `src/` — Next.js aplikacija

```
src/
├── app/                  App Router stranice + API rute
├── lib/                  Osnovne biblioteke (DB, auth, OAuth, skills, memory, …)
├── domain/               Čist domenski sloj (policy, fallback, cost, lockout, …)
├── server/               Moduli samo za server (authz, cors, auth)
├── shared/               Tipovi, konstante, validacija, ugovori, alati (bezbedno za deljenje između granica)
├── mitm/                 Man-in-the-middle proxy pomoćni alati za CLI integraciju
├── models/               Metapodaci/aliasi lokalnih modela
├── sse/                  Zastareli SSE handleri koji se još nalaze pod src/ (ne open-sse/)
├── store/                Skladišta stanja na klijentskoj strani
├── middleware/           Pomoćni alati za middleware na nivou ruta (ne globalni Next.js middleware)
├── scripts/              Skripte unutar stabla koje aplikacijski kod može importovati
├── types/                Ambijentalni i deljeni TS tipovi
├── i18n/                 Paketi lokalizacije
├── instrumentation.ts    Next.js instrumentation hook
├── instrumentation-node.ts
└── proxy.ts              Pomoćna funkcija za pokretanje proxy-ja na najvišem nivou
```

### 3.1 `src/app/` — App Router

App Router izlaže i UI dashboard-a i javni/upravljački HTTP API.
**Nema globalnog middleware-a** — presretanje se vrši po ruti.

Segmenti najvišeg nivoa pod `src/app/`:

| Putanja                                                                       | Namena                                         |
| ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `api/`                                                                        | Sve HTTP API rute (vidi detaljnu podelu ispod) |
| `a2a/`                                                                        | A2A JSON-RPC 2.0 endpoint (`POST /a2a`)        |
| `.well-known/agent.json/`                                                     | A2A dokument za otkrivanje Agent Card-a        |
| `(dashboard)/`                                                                | UI dashboard-a (route grupa, bez URL prefiksa) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Tokovi autentifikacije                         |
| `landing/`                                                                    | Marketing/landing stranica                     |
| `docs/`                                                                       | Ugrađeni pregledač API dokumentacije           |
| `status/`, `maintenance/`, `offline/`                                         | Operativne stranice                            |
| `privacy/`, `terms/`                                                          | Pravne stranice                                |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Statičke stranice za greške                    |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Okviri za greške/učitavanje iz framework-a     |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Korenska struktura (root shell)                |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — UI stranice

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, plus root `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — API grupe najvišeg nivoa

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
├── v1/         OpenAI-kompatibilni javni API
├── v1beta/     Gemini-stil kompatibilnosti
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Upravljanje ugrađenim servisima

Rute za instalaciju, pokretanje, gašenje i praćenje 9Router i CLIProxyAPI.
Sve putanje su klasifikovane kao **LOCAL_ONLY** (samo loopback, čvrsto pravilo #17) jer
mogu pokretati `npm install` i kreirati child procese.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             getOrInitSupervisor() pomoćna funkcija
│   ├── install/route.ts    POST — npm install putem execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install novije verzije
│   ├── rotate-key/route.ts POST — generisanje novog API ključa + restart
│   ├── status/route.ts     GET  — status uživo + iz baze + metapodaci o verziji
│   └── auto-start/route.ts POST — uključivanje/isključivanje auto_start opcije
├── cliproxy/
│   ├── _lib.ts             getOrInitSupervisor() pomoćna funkcija
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install novije verzije
│   ├── status/route.ts     GET  — status uživo + iz baze + metapodaci o verziji
│   └── auto-start/route.ts POST — uključivanje/isključivanje auto_start opcije
└── [name]/
    └── logs/route.ts       GET  — SSE praćenje logova (deljeno za sve servise)
```

Odgovarajući dashboard UI:
`src/app/(dashboard)/dashboard/providers/services/` — stranica sa dva taba (CLIProxyAPI + 9Router).
Reverse proxy za ugrađeni UI 9Router-a:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Detaljnije: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — OpenAI-kompatibilni javni API

```
v1/
├── accounts/[id]/                       pretraga naloga
├── agents/tasks/[id]/, agents/tasks/    A2A-stilizovani endpoint-i za zadatke
├── api/                                 interne API pomoćne funkcije izložene pod v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      OpenAI Batches API
├── chat/completions/                    Chat Completions (glavni endpoint)
├── completions/                         Zastareli text completions
├── embeddings/                          Embeddings
├── files/[id]/, files/                  Files API
├── _helpers/                            Deljene pomoćne funkcije za rute (nema javni URL)
├── images/{edits, generations}/         Generisanje i izmena slika
├── issues/                              Endpoint-i za pomoć u trijaži
├── management/{proxies}/                Upravljačke rute unutar v1
├── messages/{count_tokens}/             Anthropic-stil kompatibilnosti za messages
├── models/                              Listanje modela (`route.ts`, `catalog.ts`)
├── moderations/                         Moderacija
├── music/                               Generisanje muzike
├── providers/[provider]/                Operacije po provajderu
├── quotas/{check}                       Provere kvota
├── registered-keys/                     Administracija registrovanih ključeva
├── rerank/                              Rerangiranje
├── responses/[...path]/                 OpenAI Responses API (catch-all)
├── search/                              Pretraga weba
├── videos/                              Generisanje videa
├── ws/                                  WebSocket mostovi
└── route.ts                             Indeksni handler
```

Svaka rutna datoteka prati isti obrazac:

```
Ruta → CORS preflight → Zod validacija tela → opcionalna autentifikacija
      → primena politike API ključa → delegiranje handleru (open-sse)
```

`v1beta/` je Gemini-stil kompatibilna površina (tanak omotač koji prevodi u
isti `open-sse/handlers/` pipeline).

### 3.2 `src/lib/` — Osnovne biblioteke

Uvek uvozite podatke, sinhronizaciju, OAuth, veštine, memoriju itd. kroz ove module. Tabela
grupiše stvarne direktorijume i značajne datoteke najvišeg nivoa.

| Modul             | Namena                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | A2A protokol server: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 veština: analiza troškova, izveštaj o zdravlju, otkrivanje provajdera, upravljanje kvotama, pametno rutiranje, list-capabilities)                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `acp/`            | Agent-Control-Protocol: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `api/`            | Interne API pomoćne funkcije: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `auth/`           | `managementPassword.ts` (resetovanje lozinke / heširanje)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `batches/`        | OpenAI Batches API servis (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `catalog/`        | Sinhronizacija OpenRouter kataloga (`openrouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `cloudAgent/`     | Registar cloud agenata: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `combos/`         | Pomoćne funkcije za rešavanje kombinacija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `compliance/`     | Revizija + revizija provajdera: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `config/`         | Veza za konfiguraciju u toku rada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `db/`             | SQLite domenski moduli (vidi §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `display/`        | UI/prikazne pomoćne funkcije koje koriste API odgovori                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `embeddings/`     | Registar servisa za embedding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `env/`            | Učitavanje i pregled env varijabli                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `evals/`          | Runtime za evaluaciju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `jobs/`           | Poslovi u pozadini (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `memory/`         | Trajna memorija: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `oauth/`          | OAuth/import moduli provajdera (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed`, plus `services/`, `utils/`, i `constants/oauth.ts`                                                                                                                                                                                                                                                                                                                     |
| `plugins/`        | Učitavač plugin-ova (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `providerModels/` | Upravljani životni ciklus modela: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `providers/`      | Pomoćne funkcije za provajdere: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `resilience/`     | `settings.ts` — podešavanja za circuit breaker, cooldown, lockout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `runtime/`        | Detekcija runtime funkcionalnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `services/`       | Framework ugrađenih servisa: `ServiceSupervisor.ts` (generički supervizor child procesa sa zaključavanjem operacija, ring bufer-om, health checker-om), `bootstrap.ts` (registracija na nivou procesa i auto-start), `registry.ts` (mapa alat → supervizor), `apiKey.ts` (skladište ključeva AES-256-GCM), `modelSync.ts` (periodična sinhronizacija modela), `ringBuffer.ts` (5 MB kružni bafer za logove), `healthCheck.ts` (HTTP health probe), `types.ts`, `embedWsProxy.ts` (WebSocket proxy), `installers/{ninerouter,cliproxy}.ts`. Vidi `docs/frameworks/EMBEDDED-SERVICES.md`                                                                                             |
| `agentSkills/`    | Katalog Agent Skills + generator: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → upisuje `skills/{id}/SKILL.md`), `openapiParser.ts` (izvlači REST endpoint-e iz OpenAPI specifikacije), `cliRegistryParser.ts` (izvlači CLI podkomande iz bin/cli-registry), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Koriste ga REST rute (`/api/agent-skills/*`), MCP alati (`omniroute_agent_skills_*`), i A2A veština `list-capabilities`. Vidi [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Framework veština: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, plus `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `spend/`          | `batchWriter.ts` (write-behind bafer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `sync/`           | `bundle.ts`, `tokens.ts` (Cloud Sync)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `system/`         | Pomoćne funkcije na nivou sistema                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `translator/`     | Povezivanje prevodioca najvišeg nivoa (delegira u `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `usage/`          | Obračun korišćenja: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `versionManager/` | Automatsko ažuriranje + manifest verzije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ws/`             | WebSocket mostovi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `zed-oauth/`      | Tok OAuth za Zed editor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

Datoteke najvišeg nivoa u `src/lib/`:

- Stari `localDb.ts` barrel je uklonjen — potrošači sada uvoze konkretne `src/lib/db/*` module direktno.
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

Singleton SQLite baza podataka (`getDbInstance()` u `core.ts`, WAL journaling).
**Nikada nemojte pisati sirove SQL upite u rutama ili handlerima** — koristite ove module.

![Pregled šeme baze podataka (odabrane osnovne tabele)](../diagrams/exported/db-schema-overview.svg)

> Izvor: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Domenski moduli (svaki upravlja jednom ili više tabela): `apiKeys.ts`, `backup.ts`,
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

`migrations/` sadrži 168 verzionisanih `.sql` datoteka (idempotentnih, transakcionih) i
izvršava ih `migrationRunner.ts` prilikom pokretanja.

Tabele kreirane kroz migracije (ukupno 123):

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
`webhooks` (plus FTS5 virtuelne tabele za pretragu memorije).

### 3.3 `src/domain/` — Domenski sloj

Čista poslovna logika, bez I/O operacija. Uvoze ga rute i handleri.

| Datoteka                                   | Namena                                               |
| ------------------------------------------ | ---------------------------------------------------- |
| `policyEngine.ts`                          | Rešavač politika najvišeg nivoa                      |
| `fallbackPolicy.ts`                        | Stablo odlučivanja za fallback                       |
| `costRules.ts`                             | Pravila za obračun troškova                          |
| `lockoutPolicy.ts`                         | Odluke o blokiranju modela                           |
| `tagRouter.ts`                             | Rutiranje na osnovu tagova                           |
| `comboResolver.ts`                         | Rešavanje kombinacija iz zahteva → lista ciljeva     |
| `connectionModelRules.ts`                  | Filteri modela po konekciji                          |
| `modelAvailability.ts`                     | Provera dostupnosti modela                           |
| `degradation.ts`                           | Prelazi u degradirani režim                          |
| `providerExpiration.ts`                    | Otkrivanje isteklih naloga/ključeva                  |
| `quotaCache.ts`                            | Keširane odluke o kvotama                            |
| `responses.ts`, `omnirouteResponseMeta.ts` | Pomoćne funkcije za oblik odgovora                   |
| `configAudit.ts`                           | Revizija promena konfiguracije                       |
| `assessment/`                              | Procena modela (prema RFC, delimično implementirano) |
| `types.ts`                                 | Deljeni domenski tipovi                              |

### 3.4 `src/server/` — Samo za server

Ne može se uvoziti iz klijentskih komponenti.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Klasifikuje rute kao javne ili upravljačke
│   ├── assertAuth.ts      Pomoćna funkcija za tvrdnje
│   ├── context.ts         Kontekst autorizacije po zahtevu
│   ├── headers.ts
│   ├── pipeline.ts        Pipeline autorizacije
│   ├── policies/          Konkretne politike
│   └── types.ts
└── cors/origins.ts        Dozvoljene CORS izvorne adrese
```

### 3.5 `src/shared/` — Bezbedno za deljenje

Podeljeno u ciljane poddirektorijume:

- `constants/` — `providers.ts` (Zod-validirani katalog provajdera), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts` (denylist), `mcpScopes.ts`,
  `errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
  `bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
  `sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 Zod šema), `compressionConfigSchemas.ts`,
  `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — javni API ugovori isporučeni na npm.
- `types/` — deljeni TS tipovi.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`, `cloud.ts`, `cn.ts`,
  `cors.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts`, plus dashboard hook-ovi/komponente pod `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/`.

---

## 4. `open-sse/` — Radni prostor za streaming engine

Zaseban npm workspace objavljen kao `@omniroute/open-sse`. Sadrži obradu
zahteva, izvršavače (executors), prevodioce (translators), servise, transformer i MCP server.

```
open-sse/
├── index.ts                Javni exports
├── package.json            Manifest radnog prostora (workspace)
├── tsconfig.json
├── types.d.ts
├── config/                 Registri provajdera, profili zaglavlja, identitet, …
├── handlers/               Handleri zahteva (chat, embeddings, audio, image, …)
├── executors/              108 HTTP izvršavača specifičnih za provajdere
├── translator/             Konverzija formata (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Transformer streama Responses API ↔ Chat Completions
├── services/               80+ servisnih modula (combos, fallback, kvote, identitet, …)
├── utils/                  Pomoćni alati za streaming, TLS klijent, AWS SigV4, proxy fetch, …
└── mcp-server/             MCP server (3 transporta, 33 scope-a, 110 alata)
```

### 4.1 `open-sse/handlers/`

| Handler                 | Namena                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `chatCore.ts`           | Glavni chat pipeline (keš, ograničenje brzine, combo rutiranje, dispatch izvršavača) |
| `responsesHandler.ts`   | Ulazna tačka za OpenAI Responses API                                                 |
| `embeddings.ts`         | Embeddings                                                                           |
| `imageGeneration.ts`    | Generisanje slika                                                                    |
| `audioSpeech.ts`        | Pretvaranje teksta u govor                                                           |
| `audioTranscription.ts` | Pretvaranje govora u tekst                                                           |
| `videoGeneration.ts`    | Generisanje videa                                                                    |
| `musicGeneration.ts`    | Generisanje muzike                                                                   |
| `rerank.ts`             | Rerangiranje                                                                         |
| `moderations.ts`        | Moderacija                                                                           |
| `search.ts`             | Pretraga na webu                                                                     |
| `sseParser.ts`          | Parser SSE događaja                                                                  |
| `usageExtractor.ts`     | Izvlačenje broja tokena iz upstream streamova                                        |
| `responseSanitizer.ts`  | Uklanjanje šuma specifičnog za provajdera                                            |
| `responseTranslator.ts` | Poveznica između odgovora provajdera i sloja prevodioca (translator)                 |

### 4.2 `open-sse/executors/`

108 izvršavača provajdera, svaki nastavlja `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop`, plus `claudeIdentity.ts`
(zajednički pomoćnik za identitet) i `index.ts` (registar).

> Napomena: provajderi koji nisu navedeni ovde se opslužuju putem `default.ts` koristeći generički
> OpenAI-kompatibilan izvršavač. Kompletan katalog provajdera (355 provajdera) se nalazi u
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Prevođenje po principu hub-and-spoke (OpenAI je hub).

- **9 prevodilaca zahteva** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 prevodilaca odgovora** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 pomoćnika** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, plus
  testovi za pomoćnike.
- **Pomoćnici za slike** (`translator/image/sizeMapper.ts`).
- Na najvišem nivou: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — konverter zasnovan na `TransformStream` za Responses API ↔ Chat
  Completions (koristi ga catch-all ruta `responses/`).

### 4.5 `open-sse/services/`

Istaknuto (kompletna lista se nalazi u `open-sse/services/`):

| Oblast                  | Fajlovi                                                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Combo rutiranje         | `combo.ts` (19 strategija), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                             |
| Auto Combo engine       | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Otpornost               | `accountFallback.ts` (cooldown + lockout), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                              |
| Kvote                   | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Keširanje               | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                     |
| Inteligencija rutiranja | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| Rukovanje modelima      | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Kompresija              | `compression/` — kompletno povezivanje mehanizma za kompresiju                                                                                                                                                                                    |
| Token i sesija          | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Tier / manifest         | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP / mreža              | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Batches                 | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Korišćenje              | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 jedinstvenih alata** povezano u `server.ts` (45 kanonskih u `schemas/tools.ts` +
  memory, skills, GitHub-skills, pool, gamification, plugin, Notion, Obsidian,
  local-corpus i compression moduli — unija koju broji `countUniqueMcpTools`).
- **3 transporta**: stdio, HTTP Streamable, SSE.
- **33 scope-a** primenjena u runtime-u — osnovna lista u `src/shared/constants/mcpScopes.ts`, kompletan skup predstavlja uniju scope-ova deklarisanih u svakom modulu alata.
- Tabela audita: `mcp_tool_audit` (popunjava je `audit.ts`).
- Fajlovi: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  plus testovi u `__tests__/`.
- Pogledajte [MCP-SERVER.md](../frameworks/MCP-SERVER.md) za kompletan katalog alata.

### 4.7 `open-sse/config/`

Registri provajdera (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), registri modela po formatu (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
pomoćnici za identitet (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
pomoćnici za kredencijale (`credentialLoader.ts`, `codexClient.ts`), i cloud
adapteri (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Osnovni elementi za streaming i pomoćnici za provajdere: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Desktop omotač (wrapper)

```
electron/
├── main.js                  Electron glavni proces
├── preload.js               Preload mostić (contextIsolation omogućen)
├── types.d.ts
├── package.json             electron-builder konfiguracija, verzija 3.8.51
├── README.md
├── assets/                  Build resursi (ikonice, entitlements, …)
├── node_modules/            Dedicirani node_modules (better-sqlite3, electron-updater)
└── dist-electron/           Build izlaz (nije u commit-u)
```

Pet npm skripti u korenu workspace-a: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Automatsko ažuriranje ide preko
`electron-updater` koji upire na GitHub release feed.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           Glavna CLI tačka ulaska (Node ESM)
├── reset-password.mjs      Resetovanje lozinke za upravljanje iz CLI-ja
├── mcp-server.mjs          MCP server launcher (stdio)
├── nodeRuntimeSupport.mjs  Provera verzije Node-a
└── cli/
    ├── program.mjs         Commander program builder
    ├── runtime.mjs         withRuntime helper (server-first/db-fallback)
    ├── output.mjs          Formateri izlaza (json/jsonl/table/csv)
    ├── i18n.mjs            t() helper sa lokalizacijama
    ├── api.mjs             API fetch helper
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Registracija komandi
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (jedan fajl po komandi/grupi)
```

Dva binarna fajla su izložena u `package.json` → `bin`:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Direktorijum                                         | Tip                                                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `tests/unit/`                                        | Unit testovi preko Node native test runner-a (1821 fajlova, plus `api/`, `auth/`, `authz/` poddirektorijumi) |
| `tests/integration/`                                 | Cross-module + DB-state testovi                                                                              |
| `tests/e2e/`                                         | Playwright UI testovi                                                                                        |
| `tests/e2e/protocol-clients.test.ts`                 | MCP/A2A protokol e2e                                                                                         |
| `tests/translator/`                                  | Testovi specifični za prevodilac                                                                             |
| `tests/security/`                                    | Bezbednosne regresije                                                                                        |
| `tests/load/`                                        | Load / stress testovi                                                                                        |
| `tests/golden-set/`                                  | Referentni izlazi za regresije prevodilaca                                                                   |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Podrška                                                                                                      |

Uobičajene komande:

| Komanda                                                  | Šta pokreće                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| `npm run test:unit`                                      | Svi `tests/unit/*.test.ts` preko Node test runner-a (konkurencija 10) |
| `npm run test:vitest`                                    | Vitest paket testova (MCP, autoCombo, cache)                          |
| `npm run test:e2e`                                       | Playwright UI paket testova                                           |
| `npm run test:protocols:e2e`                             | MCP + A2A protokol e2e                                                |
| `npm run test:coverage`                                  | Provera pokrivenosti (≥60% linije/izjave/funkcije/grane)              |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Pokretanje jednog fajla                                               |

---

## 8. `scripts/`

Organizovano u 6 podfoldera po nameni.

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

## 9. Pipeline zahteva (rezime)

![Pipeline zahteva (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Izvor: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Zahtev klijenta
  → /v1/chat/completions (route.ts)
     Provera CORS preflight-a
     Zod validacija (chatCompletionsSchema u shared/validation/schemas.ts)
     Autentikacija (extractApiKey + isValidApiKey ILI requireManagementAuth)
     Mehanizam politika (src/server/authz/pipeline.ts)
     Guardrails (PII maskiranje, zaštita od prompt injection-a, vision bridge)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Provera keša (semantički + read keš)
     Ograničenje brzine (rateLimitManager, accountSemaphore)
     Combo rutiranje (ako se model razrešava u kombinaciju)
       comboResolver → petlja po cilju → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       fetch upstream → retry/backoff preko accountFallback
     translateResponse() (open-sse/translator/response/*)
     SSE stream ILI JSON odgovor
     Ako je Responses API: TransformStream preko open-sse/transformer/responsesTransformer.ts
  → Kontrola usklađenosti (compliance audit) (src/lib/compliance/)
  → Odgovor klijentu
```

### Stanje otpornosti tokom rada (tri mehanizma)

| Mehanizam                  | Obim                          | Gde                                                                                                        |
| -------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Circuit breaker provajdera | Ceo provajder                 | `src/shared/utils/circuitBreaker.ts`, sačuvano u `domain_circuit_breakers`                                 |
| Cooldown konekcije         | Jedan nalog/ključ             | `markAccountUnavailable()` u `src/sse/services/auth.ts`; koristi ga `accountFallback.checkFallbackError()` |
| Zaključavanje modela       | Provajder + konekcija + model | `open-sse/services/accountFallback.ts`, sačuvano u `domain_lockout_state`                                  |

Pogledajte [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) i posebni odeljak u
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Kako doprineti

### Dodavanje novog provajdera

1. Registrujte se u `src/shared/constants/providers.ts` (Zod-validirano pri učitavanju).
2. Dodajte executor u `open-sse/executors/` ako je potrebna prilagođena logika
   (proširite `BaseExecutor`).
3. Dodajte translator u `open-sse/translator/` ako ne govori OpenAI format.
4. Ako je zasnovan na OAuth-u, dodajte konfiguraciju pod `src/lib/oauth/providers/` i
   `src/lib/oauth/services/`.
5. Registrujte modele u `open-sse/config/providerRegistry.ts` (ili u registru specifičnom
   za format pod `open-sse/config/`).
6. Napišite testove pod `tests/unit/`.

### Dodavanje nove API rute

1. Kreirajte `src/app/api/your-route/route.ts`.
2. Pratite šablon: CORS → Zod validacija tela → autentikacija → delegacija handleru.
3. Ako je u pitanju novi oblik zahteva: dodajte Zod šemu u `src/shared/validation/schemas.ts`.
4. Ako je namenjeno samo upravljanju: dodajte putanju u `src/shared/constants/publicApiRoutes.ts`
   (denylist za javnu površinu API-ja).
5. Dodajte testove pod `tests/unit/`.
6. Ažurirajte `docs/reference/API_REFERENCE.md` i `docs/openapi.yaml`.

### Dodavanje novog DB modula

1. Kreirajte `src/lib/db/yourModule.ts` i uvezite `getDbInstance()` iz `./core.ts`.
2. Izvezite CRUD funkcije za svoj domen.
3. Ako su u pitanju nove tabele: dodajte migraciju pod `src/lib/db/migrations/`, numerisanu
   sekvencijalno, idempotentnu, transakcionu.
4. Uvoznici koriste direktne importe iz `@/lib/db/yourModule` (bez barrel fajla — stari sloj za re-eksport `localDb.ts` je uklonjen).
5. Dodajte testove pod `tests/unit/`.

### Dodavanje novog MCP alata

1. Dodajte definiciju alata pod `open-sse/mcp-server/tools/` (ili proširite
   `open-sse/mcp-server/schemas/tools.ts`).
2. Dodelite odgovarajući opseg (scope) u `src/shared/constants/mcpScopes.ts`.
3. Registrujte alat u `open-sse/mcp-server/server.ts`.
4. Dodajte testove pod `open-sse/mcp-server/__tests__/`.
5. Ažurirajte [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Dodavanje nove A2A veštine

Pogledajte [A2A-SERVER.md § Adding a New Skill](../frameworks/A2A-SERVER.md). Veštine se nalaze u
`src/lib/a2a/skills/` i registruju se putem A2A menadžera zadataka.

---

## 11. Konvencije

- **Stil koda**: uvlačenje od 2 razmaka, duplo navodnici, širina 100 karaktera, tačka-zapeta,
  `es5` zarezi na kraju — nameće se putem Prettier-a preko `lint-staged`.
- **Importi**: eksterni → interni (`@/`, `@omniroute/open-sse`) → relativni.
- **Nazivi**: fajlovi u `camelCase` ili `kebab-case`, komponente u `PascalCase`,
  konstante u `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` svuda;
  `no-explicit-any` = `warn` u `open-sse/` i `tests/`, greška svuda ostalo.
- **TypeScript**: `strict: false` (nasleđeni pristup). Preferirajte eksplicitne tipove u odnosu na
  inferenciju za granice između modula.
- **Baza podataka**: nikada nemojte pisati sirovi SQL u rutama ili handlerima — uvek idite kroz
  module `src/lib/db/`. Nikada nemojte koristiti barrel import — koristite direktno specifične `src/lib/db/*` module.
- **Tipizacija DB entiteta (#3512)**: funkcija koja upisuje ili čita oblik reda tabele baze podataka
  treba da prima/vraća imenovani TS interfejs koji 1:1 odražava kolone te tabele,
  a ne `any` ili anonimni inline tip na mestu poziva. Postavite
  interfejs pored funkcije (npr. `export interface UsageEntry` u
  `src/lib/usage/usageHistory.ts` iznad `saveRequestUsage`), zadržite pojedinačna
  polja opcionalnim/nullable kada različiti pisci popunjavaju red
  inkrementalno, i preferirajte `unknown` u odnosu na `any` za polje čiji oblik
  varira među pozivačima (dokumentovano na polju, npr. `UsageEntry.tokens`
  prihvata i sirov oblik podataka specifičan za provajdera i normalizovan oblik). Kada broj
  `any` u fajlu dosegne nulu na ovaj način, dodajte ga u
  allowlist `check:any-budget:t11` (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`) da ne bi mogao da regresira. Ovo je konvencija prve faze — šire
  čišćenje "bez anonimnog `any`" je iterativno kroz ostatak
  kodne baze.
- **Greške**: try/catch sa specifičnim tipovima grešaka, logovanje sa pino kontekstom. Nikada
  nemojte nemo progutati greške u SSE streamovima; koristite abort signale za čišćenje.
- **Bezbednost**: nikada ne koristite `eval()` / `new Function()` / implied eval. Validirajte
  sve unose sa Zod. Enkriptujte kredencijale u stanju mirovanja (AES-256-GCM). Održavajte
  `src/shared/constants/upstreamHeaders.ts` denylist usklađen sa
  slojem za sanitizaciju/validaciju.
- **Commit-ovi**: Conventional Commits — `feat(scope): subject`. Dozvoljeni scope-ovi:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Grane**: prefiksi `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Nikada nemojte direktno komitovati u `main`.
- **Husky**: pre-commit pokreće `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; pre-push pokreće `check:any-budget:t11` + `check:tracked-artifacts` (brze provere; isključuje `test:unit`).

---

## 12. Строга правила (из CLAUDE.md)

1. Никада не commit-ујте тајне (secrets) или креденцијале.
2. Никада не користите barrel-import — користите директно специфичне `src/lib/db/*` модуле.
3. Никада не користите `eval()` / `new Function()` / индиректни (implied) eval.
4. Никада не commit-ујте директно на `main`.
5. Никада не пишите сирови SQL у рутама — увек проследите кроз `src/lib/db/` модуле.
6. Никада не гутајте грешке ћутке (silently) у SSE streamovima.
7. Увек валидирајте улазе Zod шемама.
8. Увек укључите тестове када мењате продукциони код.
9. Покривеност (coverage) мора остати ≥ 60% (statements, lines, functions, branches).

---

## 13. Погледајте такође

- [ARCHITECTURE.md](./ARCHITECTURE.md) — архитектура на високом нивоу и одговорности
  модула.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — референца за public + management API.
- [FEATURES.md](../guides/FEATURES.md) — матрица функција и истицања верзија.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — дубока анализа circuit breaker-а, cooldown-а,
  lockout-а.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo скоровање и стратегије.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — потпуни каталог MCP алата + транспорти.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — A2A протокол вештине и откривање (discovery).
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — RTK + Caveman компресија.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — CLI интеграције.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (ако постоји), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — циљеви за deployment.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — уобичајени операциони проблеми.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — ток рада контрибутора.
- [CLAUDE.md](../../CLAUDE.md) — правила репозиторијума за Claude Code (извор истине
  за многе од горенаведених конвенција).
- [AGENTS.md](../../AGENTS.md) — дубља архитектонска референца коју користе агенти.
