# CODEBASE_DOCUMENTATION (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇪 [et](../../../et/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇪 [ga](../../../ga/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇷 [hr](../../../hr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇹 [lt](../../../lt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇻 [lv](../../../lv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇹 [mt](../../../mt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇸 [sr](../../../sr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "Dokumentacija kodne zbirke OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentacija kodne zbirke OmniRoute

> **Različica:** v3.8.51
> **Nazadnje posodobljeno:** 2026-06-28
> **Ciljna skupina:** Inženirji, ki prispevajo k OmniRoute ali na njem gradijo integracije.
>
> Za arhitekturne diagrame na visoki ravni in razloge za zasnovo posameznih podsistemov preberite
> [ARCHITECTURE.md](./ARCHITECTURE.md). Za podrobne predstavitve posameznih podsistemov
> (Auto Combo, strežnik MCP, strežnik A2A, Skills, Memory, Cloud Agents, Resilience,
> Compression itd.) si oglejte njihove namenske datoteke v tem imeniku `docs/`.

Ta datoteka opisuje, **kaj je trenutno v repozitoriju**, da se lahko novi inženir
znajde v drevesni strukturi, razume razslojenost izvajalnega okolja in ve, kam dodati kodo,
ne da bi ustvarjal nove module.

---

## 1. Tehnološki sklad

| Vidik              | Izbira                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Spletno ogrodje    | **Next.js 16** (App Router, samostojni izhod, brez globalne vmesne programske opreme)                                                        |
| Jezik              | **TypeScript 6.0+** — cilj `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                                          |
| Izvajalno okolje   | **Node.js** `>=22.22.2 <23` ali `>=24.0.0 <27` (uveljavljeno prek `engines` + `SUPPORTED_NODE_RANGE`)                                        |
| Podatkovna zbirka  | **SQLite** prek `better-sqlite3` (en primerek, beleženje WAL)                                                                                |
| Namizna aplikacija | **Electron 41** + `electron-builder` 26.10 (ločen delovni prostor v `electron/`)                                                             |
| Testi              | **Vgrajeni izvajalnik testov Node** (enotni/integracijski), **Vitest** (MCP, autoCombo, predpomnilnik), **Playwright** (e2e + protocols-e2e) |
| Gradnja            | Samostojni Next.js prek `scripts/build/build-next-isolated.mjs`                                                                              |
| Preverjanje/oblika | Ploska konfiguracija ESLint + Prettier (`lint-staged` prek Husky pred potrditvijo)                                                           |
| Sistem modulov     | ESM povsod (`"type": "module"`)                                                                                                              |
| Delovni prostori   | Delovni prostor npm — `open-sse` je edini podrejeni delovni prostor                                                                          |

Vzdevki poti (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Privzeta vrata HTTP: **`20128`** (API in nadzorna plošča si delita isti proces). Imenik
za podatke določa okoljska spremenljivka `DATA_DIR`, privzeto pa je `~/.omniroute/`.

---

## 2. Struktura repozitorija

```
OmniRoute/
├── src/                  Aplikacija Next.js (App Router, knjižnice, domena, strežnik, skupna koda)
├── open-sse/             Delovni prostor mehanizma za pretakanje (@omniroute/open-sse)
├── electron/             Namizni ovoj (glavni proces Electron 41 + preload)
├── bin/                  Vstopne točke CLI (omniroute, reset-password)
├── tests/                Enotni, integracijski, e2e, protocols-e2e, prevajalski in varnostni testi ter testni podatki
├── scripts/              Pomožni skripti za gradnjo, sinhronizacijo, preverjanje, migracije in izvajanje
├── docs/                 Javna dokumentacija (ta imenik)
├── public/               Statična sredstva, manifest PWA, storitveni delavec
├── config/               Primeri konfiguracije izvajalnega okolja
├── images/               Trženjska sredstva in posnetki zaslona
├── _ideia/, _references/, _mono_repo/, _tasks/   Interni osnutki/načrtovanje (ni vključeno v izdajo)
├── CLAUDE.md             Pravila repozitorija za Claude Code
├── AGENTS.md             Podrobnejša arhitekturna referenca za agente
├── package.json          v3.8.51, koren delovnega prostora
└── tsconfig.json         Vzdevki poti + osnovne možnosti prevajalnika
```

---

## 3. `src/` — Aplikacija Next.js

```
src/
├── app/                  Strani App Routerja + poti API
├── lib/                  Osrednje knjižnice (DB, overjanje, OAuth, veščine, pomnilnik, …)
├── domain/               Čista domenska plast (pravilniki, nadomestne možnosti, stroški, zaklepanje, …)
├── server/               Moduli samo za strežnik (authz, cors, overjanje)
├── shared/               Tipi, konstante, preverjanje veljavnosti, pogodbe, pripomočki (varni za uporabo prek meja)
├── mitm/                 Pripomočki posredniškega strežnika »človek v sredini« za integracijo s CLI
├── models/               Metapodatki lokalnih modelov / vzdevki
├── sse/                  Starejši obravnavalniki SSE, ki so še vedno v src/ (ne v open-sse/)
├── store/                Odjemalske shrambe stanja
├── middleware/           Pripomočki vmesne programske opreme na ravni poti (ne globalna vmesna programska oprema Next.js)
├── scripts/              Skripti znotraj drevesa, ki jih lahko uvozi koda aplikacije
├── types/                Okoljski in skupni tipi TS
├── i18n/                 Lokalizacijski paketi
├── instrumentation.ts    Priključek za instrumentacijo Next.js
├── instrumentation-node.ts
└── proxy.ts              Vrhnji zagonski pripomoček za posredniški strežnik
```

### 3.1 `src/app/` — App Router

App Router izpostavlja tako uporabniški vmesnik nadzorne plošče kot javni/upravljavski HTTP API.
**Globalne vmesne programske opreme ni** — prestrezanje se izvaja za vsako pot posebej.

Vrhnji segmenti pod `src/app/`:

| Pot                                                                           | Namen                                                                 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `api/`                                                                        | Vse poti HTTP API (glejte razčlenitev spodaj)                         |
| `a2a/`                                                                        | Končna točka A2A JSON-RPC 2.0 (`POST /a2a`)                           |
| `.well-known/agent.json/`                                                     | Dokument za odkrivanje kartice agenta A2A                             |
| `(dashboard)/`                                                                | Uporabniški vmesnik nadzorne plošče (skupina poti, brez predpone URL) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Tokovi overjanja                                                      |
| `landing/`                                                                    | Trženjska/vstopna stran                                               |
| `docs/`                                                                       | Vdelani pregledovalnik dokumentacije API                              |
| `status/`, `maintenance/`, `offline/`                                         | Operativne strani                                                     |
| `privacy/`, `terms/`                                                          | Pravne strani                                                         |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Statične strani z napakami                                            |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Meje ogrodja za napake/nalaganje                                      |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Korenska lupina                                                       |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — Strani uporabniškega vmesnika

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks` ter korenski `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — Vrhnje skupine API

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
├── services/   Upravljanje vdelanih storitev (9router, cliproxy) — LOCAL_ONLY
├── upstream-proxy/
├── usage/
├── v1/         Javni API, združljiv z OpenAI
├── v1beta/     Združljivost v slogu Gemini
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Upravljanje vdelanih storitev

Poti za namestitev, zagon, zaustavitev in spremljanje 9Router ter CLIProxyAPI.
Vse poti so razvrščene kot **LOCAL_ONLY** (samo povratna zanka, strogo pravilo št. 17), ker
lahko prikličejo `npm install` in ustvarjajo podrejene procese.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             Pripomoček getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install prek execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install novejše različice
│   ├── rotate-key/route.ts POST — ustvari nov ključ API + ponovni zagon
│   ├── status/route.ts     GET  — stanje v živo + stanje DB + metapodatki različice
│   └── auto-start/route.ts POST — preklopi zastavico auto_start
├── cliproxy/
│   ├── _lib.ts             Pripomoček getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install novejše različice
│   ├── status/route.ts     GET  — stanje v živo + stanje DB + metapodatki različice
│   └── auto-start/route.ts POST — preklopi zastavico auto_start
└── [name]/
    └── logs/route.ts       GET  — sprotno spremljanje dnevnika SSE (v skupni rabi vseh storitev)
```

Ustrezni uporabniški vmesnik nadzorne plošče:
`src/app/(dashboard)/dashboard/providers/services/` — stran z dvema zavihkoma (CLIProxyAPI + 9Router).
Povratni posredniški strežnik za vdelani uporabniški vmesnik 9Router:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Podroben pregled: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — Javni API, združljiv z OpenAI

```
v1/
├── accounts/[id]/                       iskanje računa
├── agents/tasks/[id]/, agents/tasks/    končne točke opravil v slogu A2A
├── api/                                 notranji pripomočki API, izpostavljeni pod v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      API OpenAI Batches
├── chat/completions/                    Chat Completions (glavna končna točka)
├── completions/                         starejše dokončevanje besedila
├── embeddings/                          vdelave
├── files/[id]/, files/                  API za datoteke
├── _helpers/                            skupni pripomočki poti (brez javnega URL-ja)
├── images/{edits, generations}/         ustvarjanje + urejanje slik
├── issues/                              pomožne končne točke za triažo
├── management/{proxies}/                upravljavske poti znotraj v1
├── messages/{count_tokens}/             združljivost sporočil v slogu Anthropic
├── models/                              seznam modelov (`route.ts`, `catalog.ts`)
├── moderations/                         moderiranje
├── music/                               ustvarjanje glasbe
├── providers/[provider]/                operacije posameznega ponudnika
├── quotas/{check}                       preverjanja kvot
├── registered-keys/                     skrbništvo registriranih ključev
├── rerank/                              ponovno razvrščanje
├── responses/[...path]/                 API OpenAI Responses (zajem vseh poti)
├── search/                              spletno iskanje
├── videos/                              ustvarjanje videoposnetkov
├── ws/                                  most WebSocket
└── route.ts                             obravnavalnik kazala
```

Vsaka datoteka poti sledi istemu vzorcu:

```
Pot → predhodna zahteva CORS → preverjanje veljavnosti telesa z Zod → izbirno overjanje
    → uveljavljanje pravilnika ključev API → posredovanje obravnavalniku (open-sse)
```

`v1beta/` je združljivostna površina v slogu Gemini (tanek ovoj, ki prevaja v
isti cevovod `open-sse/handlers/`).

### 3.2 `src/lib/` — Osrednje knjižnice

Podatke, sinhronizacijo, OAuth, veščine, pomnilnik itd. vedno uvažajte prek teh modulov.
Tabela združuje dejanske imenike in pomembne vrhnje datoteke.

| Modul             | Namen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | Strežnik protokola A2A: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 veščin: analiza stroškov, poročilo o stanju, odkrivanje ponudnikov, upravljanje kvot, pametno usmerjanje, navajanje zmogljivosti)                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `acp/`            | Agent-Control-Protocol: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `api/`            | Notranji pripomočki API: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `auth/`           | `managementPassword.ts` (ponastavitev gesla / zgoščevanje)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `batches/`        | Storitev API OpenAI Batches (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `catalog/`        | Sinhronizacija kataloga OpenRouter (`openrouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `cloudAgent/`     | Register agentov v oblaku: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `combos/`         | Pripomočki za razreševanje kombinacij                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `compliance/`     | Revizija + revizija ponudnikov: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `config/`         | Povezovalna koda za izvajalno konfiguracijo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `db/`             | Domenski moduli SQLite (glejte §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `display/`        | Pripomočki uporabniškega vmesnika/prikaza, uporabljeni v odzivih API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `embeddings/`     | Register storitev vdelav                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `env/`            | Nalaganje + pregled okolja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `evals/`          | Izvajalno okolje vrednotenj                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `jobs/`           | Opravila v ozadju (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `memory/`         | Trajni pomnilnik: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `oauth/`          | Moduli ponudnikov OAuth/uvoza (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed` ter `services/`, `utils/` in `constants/oauth.ts`                                                                                                                                                                                                                                                                                                                                  |
| `plugins/`        | Nalagalnik vtičnikov (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `providerModels/` | Upravljani življenjski cikel modelov: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `providers/`      | Pripomočki ponudnikov: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `resilience/`     | `settings.ts` — nastavitve za odklopnik, obdobje ohlajanja in zaklepanje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `runtime/`        | Zaznavanje funkcionalnosti izvajalnega okolja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `services/`       | Ogrodje vdelanih storitev: `ServiceSupervisor.ts` (generični nadzornik podrejenih procesov z zaklepom operacij, krožnim medpomnilnikom in preverjevalnikom stanja), `bootstrap.ts` (registracija na ravni procesa in samodejni zagon), `registry.ts` (preslikava orodje → nadzornik), `apiKey.ts` (shramba ključev AES-256-GCM), `modelSync.ts` (periodična sinhronizacija modelov), `ringBuffer.ts` (5 MB krožni medpomnilnik dnevnika), `healthCheck.ts` (preverjanje stanja HTTP), `types.ts`, `embedWsProxy.ts` (posredniški strežnik WebSocket), `installers/{ninerouter,cliproxy}.ts`. Glejte `docs/frameworks/EMBEDDED-SERVICES.md`                                                   |
| `agentSkills/`    | Katalog + generator veščin agentov: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → zapisuje `skills/{id}/SKILL.md`), `openapiParser.ts` (iz specifikacije OpenAPI izvleče končne točke REST), `cliRegistryParser.ts` (iz bin/cli-registry izvleče podukaze CLI), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Uporabljajo ga poti REST (`/api/agent-skills/*`), orodja MCP (`omniroute_agent_skills_*`) in veščina A2A `list-capabilities`. Glejte [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Ogrodje veščin: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts` ter `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `spend/`          | `batchWriter.ts` (medpomnilnik zakasnjenega zapisovanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `sync/`           | `bundle.ts`, `tokens.ts` (sinhronizacija z oblakom)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `system/`         | Pripomočki na ravni sistema                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `translator/`     | Vrhnja povezovalna koda prevajalnika (posreduje v `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `usage/`          | Obračunavanje uporabe: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `versionManager/` | Samodejno posodabljanje + manifest različic                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `ws/`             | Most WebSocket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `zed-oauth/`      | Tok OAuth urejevalnika Zed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Vrhnje datoteke v `src/lib/`:

- Stari zbirni modul `localDb.ts` je bil odstranjen — uporabniki neposredno uvažajo posamezne module `src/lib/db/*`.
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

Edini primerek zbirke podatkov SQLite (`getDbInstance()` v `core.ts`, beleženje WAL).
**V poteh ali obravnavalnikih nikoli ne pišite surovega SQL-a** — uporabite te module.

![Pregled sheme zbirke podatkov (izbrane osrednje tabele)](../diagrams/exported/db-schema-overview.svg)

> Vir: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Domenski moduli (vsak je lastnik ene ali več tabel): `apiKeys.ts`, `backup.ts`,
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

`migrations/` vsebuje 168 različic datotek `.sql` (idempotentnih, transakcijskih), ki jih
ob zagonu izvede `migrationRunner.ts`.

Tabele, ustvarjene v vseh migracijah (skupaj 123):

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
`webhooks` (ter navidezne tabele FTS5 za iskanje po pomnilniku).

### 3.3 `src/domain/` — Domenska plast

Čista poslovna logika brez V/I. Uvažajo jo poti in obravnavalniki.

| Datoteka                                   | Namen                                               |
| ------------------------------------------ | --------------------------------------------------- |
| `policyEngine.ts`                          | Vrhnji razreševalnik pravilnikov                    |
| `fallbackPolicy.ts`                        | Odločitveno drevo nadomestnih možnosti              |
| `costRules.ts`                             | Pravila izračuna stroškov                           |
| `lockoutPolicy.ts`                         | Odločitve o zaklepanju modelov                      |
| `tagRouter.ts`                             | Usmerjanje na podlagi oznak                         |
| `comboResolver.ts`                         | Razreševanje kombinacije iz zahteve → seznam ciljev |
| `connectionModelRules.ts`                  | Filtri modelov za posamezno povezavo                |
| `modelAvailability.ts`                     | Preverjanje razpoložljivosti modela                 |
| `degradation.ts`                           | Prehodi v okrnjeni način                            |
| `providerExpiration.ts`                    | Zaznavanje poteklih računov/ključev                 |
| `quotaCache.ts`                            | Predpomnjene odločitve o kvotah                     |
| `responses.ts`, `omnirouteResponseMeta.ts` | Pripomočki za obliko odziva                         |
| `configAudit.ts`                           | Revizija sprememb konfiguracije                     |
| `assessment/`                              | Ocenjevanje modelov (po RFC, delno izvedeno)        |
| `types.ts`                                 | Skupni domenski tipi                                |

### 3.4 `src/server/` — Samo za strežnik

Ni ga mogoče uvoziti iz odjemalskih komponent.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Razvršča poti kot javne ali upravljavske
│   ├── assertAuth.ts      Pripomoček za uveljavljanje trditev
│   ├── context.ts         Kontekst authz za posamezno zahtevo
│   ├── headers.ts
│   ├── pipeline.ts        Cevovod authz
│   ├── policies/          Konkretni pravilniki
│   └── types.ts
└── cors/origins.ts        Seznam dovoljenih izvorov CORS
```

### 3.5 `src/shared/` — Varno za skupno rabo

Razdeljeno na namensko osredotočene podimenike:

- `constants/` — `providers.ts` (katalog ponudnikov, preverjen z Zod), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts` (seznam prepovedanih), `mcpScopes.ts`,
  `errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
  `bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
  `sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 shem Zod), `compressionConfigSchemas.ts`,
  `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — javne pogodbe API, objavljene v npm.
- `types/` — skupni tipi TS.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`, `cloud.ts`, `cn.ts`,
  `cors.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts` ter priključki/komponente nadzorne plošče pod `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/`.

---

## 4. `open-sse/` — Delovni prostor pretočnega mehanizma

Ločen delovni prostor npm, objavljen kot `@omniroute/open-sse`. Vsebuje obdelavo
zahtev, izvajalnike, prevajalnike, storitve, transformator in strežnik MCP.

```
open-sse/
├── index.ts                Javni izvozi
├── package.json            Manifest delovnega prostora
├── tsconfig.json
├── types.d.ts
├── config/                 Registri ponudnikov, profili glav, identiteta, …
├── handlers/               Obdelovalniki zahtev (klepet, vdelave, zvok, slike, …)
├── executors/              108 izvajalnikov HTTP, specifičnih za ponudnike
├── translator/             Pretvorba formatov (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Transformator toka Responses API ↔ Chat Completions
├── services/               Več kot 80 storitvenih modulov (kombinacije, nadomestne poti, kvote, identiteta, …)
├── utils/                  Pripomočki za pretakanje, odjemalec TLS, AWS SigV4, posredniško pridobivanje, …
└── mcp-server/             Strežnik MCP (3 transporti, 33 obsegov, 110 orodij)
```

### 4.1 `open-sse/handlers/`

| Obdelovalnik            | Namen                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `chatCore.ts`           | Glavni cevovod klepeta (predpomnilnik, omejevanje hitrosti, kombinirano usmerjanje, razpošiljanje izvajalnikom) |
| `responsesHandler.ts`   | Vstopna točka OpenAI Responses API                                                                              |
| `embeddings.ts`         | Vdelave                                                                                                         |
| `imageGeneration.ts`    | Ustvarjanje slik                                                                                                |
| `audioSpeech.ts`        | Pretvorba besedila v govor                                                                                      |
| `audioTranscription.ts` | Pretvorba govora v besedilo                                                                                     |
| `videoGeneration.ts`    | Ustvarjanje videoposnetkov                                                                                      |
| `musicGeneration.ts`    | Ustvarjanje glasbe                                                                                              |
| `rerank.ts`             | Ponovno razvrščanje                                                                                             |
| `moderations.ts`        | Moderiranje                                                                                                     |
| `search.ts`             | Spletno iskanje                                                                                                 |
| `sseParser.ts`          | Razčlenjevalnik dogodkov SSE                                                                                    |
| `usageExtractor.ts`     | Pridobivanje števila žetonov iz tokov nadrejenih storitev                                                       |
| `responseSanitizer.ts`  | Odstranjevanje šuma, specifičnega za ponudnika                                                                  |
| `responseTranslator.ts` | Povezovalna plast med odzivom ponudnika in prevajalsko plastjo                                                  |

### 4.2 `open-sse/executors/`

108 izvajalnikov ponudnikov, od katerih vsak razširja `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop` ter `claudeIdentity.ts`
(skupni pripomoček za identiteto) in `index.ts` (register).

> Opomba: ponudnike, ki tukaj niso navedeni, oskrbuje `default.ts` z uporabo splošnega
> izvajalnika, združljivega z OpenAI. Celoten katalog ponudnikov (355 ponudnikov) je v
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Prevajanje po modelu vozlišča in krakov (OpenAI je vozlišče).

- **9 prevajalnikov zahtev** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 prevajalnikov odzivov** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 pripomočkov** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper` ter
  testi pripomočkov.
- **Pripomočki za slike** (`translator/image/sizeMapper.ts`).
- Na vrhnji ravni: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — pretvornik Responses API ↔ Chat
  Completions, ki temelji na `TransformStream` (uporablja ga vseobsegajoča pot `responses/`).

### 4.5 `open-sse/services/`

Poudarki (celoten seznam je v `open-sse/services/`):

| Področje                | Datoteke                                                                                                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kombinirano usmerjanje  | `combo.ts` (19 strategij), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                              |
| Mehanizem Auto Combo    | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Odpornost               | `accountFallback.ts` (čas ohlajanja + zaklep), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                          |
| Kvote                   | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Predpomnjenje           | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                     |
| Inteligentno usmerjanje | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| Obravnava modelov       | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Stiskanje               | `compression/` — celotno povezovanje mehanizma za stiskanje                                                                                                                                                                                       |
| Žetoni + seja           | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Raven / manifest        | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP / omrežje            | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Paketi                  | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Poraba                  | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 edinstvenih orodij**, povezanih v `server.ts` (45 kanoničnih v `schemas/tools.ts` +
  moduli za pomnilnik, veščine, veščine GitHub, sklad, igrifikacijo, vtičnike, Notion, Obsidian,
  lokalni korpus in stiskanje — unija, ki jo prešteje `countUniqueMcpTools`).
- **3 transporti**: stdio, HTTP Streamable, SSE.
- **33 obsegov**, uveljavljenih med izvajanjem — osnovni seznam je v `src/shared/constants/mcpScopes.ts`, celoten nabor pa je unija obsegov, ki jih deklarira vsak modul orodij.
- Revizijska tabela: `mcp_tool_audit` (polni jo `audit.ts`).
- Datoteke: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`
  ter testi v `__tests__/`.
- Celoten katalog orodij je na voljo v [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### 4.7 `open-sse/config/`

Registri ponudnikov (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), registri modelov po posameznih formatih (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
pripomočki za identiteto (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
pripomočki za poverilnice (`credentialLoader.ts`, `codexClient.ts`) in adapterji
za oblak (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Osnovni gradniki za pretakanje in pripomočki za ponudnike: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Namizni ovoj

```
electron/
├── main.js                  Glavni proces Electron
├── preload.js               Prednalagalni most (contextIsolation omogočen)
├── types.d.ts
├── package.json             Konfiguracija electron-builder, različica 3.8.51
├── README.md
├── assets/                  Viri za gradnjo (ikone, upravičenja, …)
├── node_modules/            Namenski node_modules (better-sqlite3, electron-updater)
└── dist-electron/           Rezultat gradnje (ni vključen v repozitorij)
```

Pet skript npm v korenu delovnega prostora: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Samodejno posodabljanje poteka prek
`electron-updater`, ki kaže na vir izdaj GitHub.

---

## 6. `bin/` — Vmesnik ukazne vrstice

```
bin/
├── omniroute.mjs           Glavna vstopna točka CLI (Node ESM)
├── reset-password.mjs      Ponastavitev skrbniškega gesla iz CLI
├── mcp-server.mjs          Zaganjalnik strežnika MCP (stdio)
├── nodeRuntimeSupport.mjs  Preverjanje različice Node
└── cli/
    ├── program.mjs         Graditelj programa Commander
    ├── runtime.mjs         Pomožna funkcija withRuntime (najprej strežnik, nato nadomestna zbirka podatkov)
    ├── output.mjs          Oblikovalniki izpisa (json/jsonl/table/csv)
    ├── i18n.mjs            Pomožna funkcija t() z lokalizacijami
    ├── api.mjs             Pomožna funkcija za pridobivanje podatkov API
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Registracija ukazov
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (ena datoteka na ukaz/skupino)
```

V `package.json` → `bin` sta izpostavljeni dve izvršni datoteki:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Imenik                                               | Vrsta                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `tests/unit/`                                        | Testi enot z izvornim izvajalnikom testov Node (1821 datotek ter podimeniki `api/`, `auth/`, `authz/`) |
| `tests/integration/`                                 | Testi med moduli in testi stanja zbirke podatkov                                                       |
| `tests/e2e/`                                         | Testi uporabniškega vmesnika Playwright                                                                |
| `tests/e2e/protocol-clients.test.ts`                 | Celoviti testi protokolov MCP/A2A                                                                      |
| `tests/translator/`                                  | Testi, specifični za prevajalnik                                                                       |
| `tests/security/`                                    | Varnostni regresijski testi                                                                            |
| `tests/load/`                                        | Obremenitveni/stresni testi                                                                            |
| `tests/golden-set/`                                  | Referenčni rezultati za regresijske teste prevajalnika                                                 |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Podpora                                                                                                |

Pogosti ukazi:

| Ukaz                                                     | Kaj izvede                                                           |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| `npm run test:unit`                                      | Vse `tests/unit/*.test.ts` z izvajalnikom testov Node (sočasnost 10) |
| `npm run test:vitest`                                    | Zbirko testov Vitest (MCP, autoCombo, cache)                         |
| `npm run test:e2e`                                       | Zbirko testov uporabniškega vmesnika Playwright                      |
| `npm run test:protocols:e2e`                             | Celovite teste protokolov MCP + A2A                                  |
| `npm run test:coverage`                                  | Prag pokritosti (≥60 % vrstic/stavkov/funkcij/vej)                   |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Zagon ene datoteke                                                   |

---

## 8. `scripts/`

Organizirano v 6 podmap glede na namen.

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

## 9. Cevovod zahtev (povzetek)

![Cevovod zahtev (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Vir: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Zahteva odjemalca
  → /v1/chat/completions (route.ts)
     Preverjanje predhodne zahteve CORS
     Preverjanje veljavnosti z Zod (chatCompletionsSchema v shared/validation/schemas.ts)
     Preverjanje pristnosti (extractApiKey + isValidApiKey ALI requireManagementAuth)
     Mehanizem pravilnikov (src/server/authz/pipeline.ts)
     Zaščitni ukrepi (prikrivanje PII, vrivanje pozivov, most za vizualne vsebine)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Preverjanje predpomnilnika (semantični predpomnilnik + predpomnilnik za branje)
     Omejitev hitrosti (rateLimitManager, accountSemaphore)
     Kombinirano usmerjanje (če se model razreši v kombinacijo)
       comboResolver → zanka za vsak cilj → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       pridobivanje podatkov od nadrejenega strežnika → ponovni poskus/eksponentni zamik prek accountFallback
     translateResponse() (open-sse/translator/response/*)
     Tok SSE ALI odgovor JSON
     Če gre za Responses API: TransformStream prek open-sse/transformer/responsesTransformer.ts
  → Revizija skladnosti (src/lib/compliance/)
  → Odgovor odjemalcu
```

### Stanje izvajalnega okolja za odpornost (trije mehanizmi)

| Mehanizem                  | Obseg                       | Kje                                                                                                          |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Odklopnik ponudnika        | Celoten ponudnik            | `src/shared/utils/circuitBreaker.ts`, shranjeno v `domain_circuit_breakers`                                  |
| Obdobje mirovanja povezave | En račun/ključ              | `markAccountUnavailable()` v `src/sse/services/auth.ts`; uporablja ga `accountFallback.checkFallbackError()` |
| Zaklep modela              | Ponudnik + povezava + model | `open-sse/services/accountFallback.ts`, shranjeno v `domain_lockout_state`                                   |

Glejte [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) in namenski razdelek v
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Kako prispevati

### Dodajanje novega ponudnika

1. Registrirajte ga v `src/shared/constants/providers.ts` (ob nalaganju se preveri z Zod).
2. Če je potrebna logika po meri, dodajte izvajalnik v `open-sse/executors/`
   (razširite `BaseExecutor`).
3. Če ne uporablja oblike OpenAI, dodajte prevajalnik v `open-sse/translator/`.
4. Če temelji na OAuth, dodajte konfiguracijo v `src/lib/oauth/providers/` in
   `src/lib/oauth/services/`.
5. Registrirajte modele v `open-sse/config/providerRegistry.ts` (ali v registru
   za določeno obliko v `open-sse/config/`).
6. Napišite teste v `tests/unit/`.

### Dodajanje nove API-poti

1. Ustvarite `src/app/api/your-route/route.ts`.
2. Upoštevajte vzorec: CORS → preverjanje telesa z Zod → avtentikacija → delegiranje obdelovalniku.
3. Če gre za novo obliko zahteve: dodajte shemo Zod v `src/shared/validation/schemas.ts`.
4. Če je namenjena samo upravljanju: dodajte pot v `src/shared/constants/publicApiRoutes.ts`
   (seznam zavrnjenih poti za javno površino API-ja).
5. Dodajte teste v `tests/unit/`.
6. Posodobite `docs/reference/API_REFERENCE.md` in `docs/openapi.yaml`.

### Dodajanje novega modula zbirke podatkov

1. Ustvarite `src/lib/db/yourModule.ts` in uvozite `getDbInstance()` iz `./core.ts`.
2. Izvozite funkcije CRUD za svojo domeno.
3. Če dodajate nove tabele: dodajte migracijo v `src/lib/db/migrations/`, oštevilčeno
   zaporedno, idempotentno in transakcijsko.
4. Uvozniki uporabljajo neposredne uvoze iz `@/lib/db/yourModule` (brez zbirnega izvoza — stara plast ponovnega izvoza `localDb.ts` je bila odstranjena).
5. Dodajte teste v `tests/unit/`.

### Dodajanje novega orodja MCP

1. Dodajte definicijo orodja v `open-sse/mcp-server/tools/` (ali razširite
   `open-sse/mcp-server/schemas/tools.ts`).
2. Dodelite ustrezne obsege v `src/shared/constants/mcpScopes.ts`.
3. Registrirajte orodje v `open-sse/mcp-server/server.ts`.
4. Dodajte teste v `open-sse/mcp-server/__tests__/`.
5. Posodobite [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Dodajanje nove veščine A2A

Glejte [A2A-SERVER.md § Dodajanje nove veščine](../frameworks/A2A-SERVER.md). Veščine se nahajajo v
`src/lib/a2a/skills/` in so registrirane prek upravljalnika opravil A2A.

---

## 11. Dogovori

- **Slog kode**: zamik z 2 presledkoma, dvojni narekovaji, širina 100 znakov, podpičja,
  končne vejice `es5` — Prettier jih uveljavlja prek `lint-staged`.
- **Uvozi**: zunanji → notranji (`@/`, `@omniroute/open-sse`) → relativni.
- **Poimenovanje**: datoteke `camelCase` ali `kebab-case`, komponente `PascalCase`,
  konstante `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` povsod;
  `no-explicit-any` = `warn` v `open-sse/` in `tests/`, drugje pa `error`.
- **TypeScript**: `strict: false` (podedovana nastavitev). Na mejah med moduli dajte prednost izrecnim tipom
  pred sklepanjem tipov.
- **Zbirka podatkov**: v poteh ali obdelovalnikih nikoli ne pišite surovega SQL-a — vedno uporabljajte
  module v `src/lib/db/`. Nikoli ne uporabljajte zbirnih uvozov — neposredno uporabite posamezne module `src/lib/db/*`.
- **Tipiziranje entitet zbirke podatkov (#3512)**: funkcija, ki zapisuje ali bere obliko
  vrstice tabele zbirke podatkov, mora sprejeti/vrniti poimenovani vmesnik TS, ki zrcali
  stolpce te tabele v razmerju 1:1, in ne `any` ali anonimnega tipa, določenega neposredno na mestu klica. Dodajte
  vmesnik poleg funkcije (npr. `export interface UsageEntry` v
  `src/lib/usage/usageHistory.ts` nad `saveRequestUsage`), posamezna polja pa naj bodo
  neobvezna oziroma naj dovoljujejo vrednost null, kadar različni zapisovalci vrstico izpolnjujejo
  postopoma. Za polje, katerega oblika se med klicatelji razlikuje, dajte prednost tipu `unknown`
  pred `any` (to dokumentirajte pri polju; npr. `UsageEntry.tokens`
  sprejema tako neobdelano uporabo v obliki ponudnika kot normalizirano obliko). Ko število pojavitev
  `any` v datoteki na ta način doseže nič, jo dodajte na seznam dovoljenih za
  `check:any-budget:t11` (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`), da se stanje ne more poslabšati. To je dogovor za prvi sklop — širše
  odstranjevanje »anonimnega `any`« se izvaja postopoma v preostalem delu
  kodne zbirke.
- **Napake**: uporabljajte try/catch z določenimi tipi napak in beležite s kontekstom pino. Napak
  v tokovih SSE nikoli ne prezrite brez opozorila; za čiščenje uporabite signale za prekinitev.
- **Varnost**: nikoli ne uporabljajte `eval()` / `new Function()` / posrednega eval. Vse
  vhode preverite z Zod. Poverilnice v mirovanju šifrirajte (AES-256-GCM). Seznam zavrnjenih
  v `src/shared/constants/upstreamHeaders.ts` naj bo usklajen s plastjo
  za sanitizacijo/preverjanje.
- **Objave**: Conventional Commits — `feat(scope): subject`. Dovoljeni obsegi:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Veje**: predpone `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Nikoli ne objavljajte sprememb neposredno v `main`.
- **Husky**: pred objavo se zaženejo `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; pred potiskom se zaženejo `check:any-budget:t11` + `check:tracked-artifacts` (hitra preverjanja; brez `test:unit`).

---

## 12. Stroga pravila (iz CLAUDE.md)

1. Nikoli ne objavljajte skrivnosti ali poverilnic.
2. Nikoli ne uporabljajte zbirnih uvozov — neposredno uporabljajte posamezne module `src/lib/db/*`.
3. Nikoli ne uporabljajte `eval()` / `new Function()` / posrednega evala.
4. Nikoli ne objavljajte sprememb neposredno v vejo `main`.
5. V poteh nikoli ne pišite surovega SQL-a — vedno uporabite module `src/lib/db/`.
6. Nikoli tiho ne prezrite napak v tokovih SSE.
7. Vhodne podatke vedno preverite s shemami Zod.
8. Ob spremembah produkcijske kode vedno vključite teste.
9. Pokritost mora ostati ≥ 60 % (stavki, vrstice, funkcije, veje).

---

## 13. Glejte tudi

- [ARCHITECTURE.md](./ARCHITECTURE.md) — arhitektura na visoki ravni in odgovornosti
  modulov.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — referenca javnega in upravljavskega API-ja.
- [FEATURES.md](../guides/FEATURES.md) — matrika funkcij in poudarki različic.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — podroben pregled odklopnika, obdobja ohlajanja
  in zaklepanja.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — točkovanje in strategije funkcije Auto Combo.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — celoten katalog orodij MCP in načini prenosa.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — zmožnosti in odkrivanje protokola A2A.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — stiskanje RTK in Caveman.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — integracije CLI.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (če je prisoten), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — ciljna okolja za uvedbo.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — pogoste operativne težave.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — potek dela za sodelujoče.
- [CLAUDE.md](../../CLAUDE.md) — pravila repozitorija za Claude Code (glavni vir
  za številne zgornje dogovore).
- [AGENTS.md](../../AGENTS.md) — podrobnejša referenca arhitekture, ki jo uporabljajo agenti.
