# CODEBASE_DOCUMENTATION (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇪 [et](../../../et/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇪 [ga](../../../ga/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇷 [hr](../../../hr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇹 [lt](../../../lt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇹 [mt](../../../mt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇮 [sl](../../../sl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇸 [sr](../../../sr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "OmniRoute koda bāzes dokumentācija"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute koda bāzes dokumentācija

> **Versija:** v3.8.51
> **Pēdējoreiz atjaunināts:** 2026-06-28
> **Mērķauditorija:** Inženieri, kas sniedz ieguldījumu OmniRoute izstrādē vai veido uz tā balstītas integrācijas.
>
> Augsta līmeņa arhitektūras diagrammas un katras apakšsistēmas pamatojumu skatiet
> [ARCHITECTURE.md](./ARCHITECTURE.md). Lai padziļināti izpētītu atsevišķas apakšsistēmas
> (Auto Combo, MCP serveri, A2A serveri, Skills, Memory, Cloud Agents, Resilience,
> Compression u. c.), skatiet to īpašos failus šajā `docs/` direktorijā.

Šajā failā aprakstīts **tas, kas pašlaik atrodas repozitorijā**, lai jauns inženieris
varētu orientēties koka struktūrā, izprast izpildlaika slāņojumu un zināt, kur pievienot kodu,
neizgudrojot jaunus moduļus.

---

## 1. Tehnoloģiju steks

| Joma                  | Izvēle                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Tīmekļa ietvars       | **Next.js 16** (App Router, standalone izvade, bez globālas starpprogrammatūras)                                             |
| Valoda                | **TypeScript 6.0+** — mērķis `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                        |
| Izpildlaiks           | **Node.js** `>=22.22.2 <23` vai `>=24.0.0 <27` (tiek nodrošināts, izmantojot `engines` + `SUPPORTED_NODE_RANGE`)             |
| Datu bāze             | **SQLite**, izmantojot `better-sqlite3` (singleton, WAL žurnalēšana)                                                         |
| Darbvirsma            | **Electron 41** + `electron-builder` 26.10 (atsevišķa darbvieta `electron/`)                                                 |
| Testi                 | **Node native test runner** (vienību/integrācijas), **Vitest** (MCP, autoCombo, cache), **Playwright** (e2e + protocols-e2e) |
| Būvēšana              | Next.js standalone, izmantojot `scripts/build/build-next-isolated.mjs`                                                       |
| Lintēšana/formatēšana | ESLint flat config + Prettier (`lint-staged`, izmantojot Husky pre-commit)                                                   |
| Moduļu sistēma        | ESM visur (`"type": "module"`)                                                                                               |
| Darbvietas            | npm workspace — `open-sse` ir vienīgā apakšdarbvieta                                                                         |

Ceļu aizstājvārdi (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Noklusējuma HTTP ports: **`20128`** (API un informācijas panelis izmanto vienu un to pašu procesu). Datu
direktoriju nosaka `DATA_DIR` vides mainīgais; pēc noklusējuma tā ir `~/.omniroute/`.

---

## 2. Repozitorija izkārtojums

```
OmniRoute/
├── src/                  Next.js lietotne (App Router, bibliotēkas, domēns, serveris, koplietojamie resursi)
├── open-sse/             Straumēšanas dzinēja darbvieta (@omniroute/open-sse)
├── electron/             Darbvirsmas ietvars (Electron 41 galvenais process + preload)
├── bin/                  CLI ieejas punkti (omniroute, reset-password)
├── tests/                Vienību, integrācijas, e2e, protocols-e2e, translator, drošības testi un armatūra
├── scripts/              Būvēšanas, sinhronizācijas, pārbaudes, migrācijas un izpildlaika palīgskripti
├── docs/                 Publiskā dokumentācija (šis direktorijs)
├── public/               Statiskie resursi, PWA manifests, servisa darbinieks
├── config/               Izpildlaika konfigurācijas paraugi
├── images/               Mārketinga un ekrānuzņēmumu resursi
├── _ideia/, _references/, _mono_repo/, _tasks/   Iekšējie pagaidu faili / plānošana (netiek piegādāti)
├── CLAUDE.md             Repozitorija noteikumi Claude Code
├── AGENTS.md             Padziļināta arhitektūras atsauce aģentiem
├── package.json          v3.8.51, darbvietas sakne
└── tsconfig.json         Ceļu aizstājvārdi + kompilatora pamatopcijas
```

---

## 3. `src/` — Next.js lietotne

```
src/
├── app/                  App Router lapas + API maršruti
├── lib/                  Pamatbibliotēkas (DB, autentifikācija, OAuth, prasmes, atmiņa, …)
├── domain/               Tīrs domēna slānis (politika, atkāpšanās, izmaksas, bloķēšana, …)
├── server/               Tikai servera moduļi (authz, cors, auth)
├── shared/               Tipi, konstantes, validācija, līgumi, utilītas (droši starp robežām)
├── mitm/                 Starpnieka “man-in-the-middle” palīgmoduļi CLI integrācijai
├── models/               Lokālo modeļu metadati / aizstājvārdi
├── sse/                  Mantotie SSE apstrādātāji, kas joprojām atrodas `src/` (nevis open-sse/)
├── store/                Klienta stāvokļa krātuves
├── middleware/           Maršrutu līmeņa starpprogrammatūras utilītas (nevis Next.js globālā starpprogrammatūra)
├── scripts/              Koka iekšējie skripti, ko var importēt lietotnes kods
├── types/                Ambientie un koplietojamie TS tipi
├── i18n/                 Lokalizāciju pakotnes
├── instrumentation.ts    Next.js instrumentācijas āķis
├── instrumentation-node.ts
└── proxy.ts              Augšējā līmeņa starpnieka sāknēšanas palīgmodulis
```

### 3.1 `src/app/` — App Router

App Router nodrošina gan informācijas paneļa saskarni, gan publisko/pārvaldības HTTP API.
**Nav globālas starpprogrammatūras** — pārtveršana tiek veikta katram maršrutam atsevišķi.

Augšējā līmeņa segmenti zem `src/app/`:

| Ceļš                                                                          | Nolūks                                                         |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `api/`                                                                        | Visi HTTP API maršruti (skatiet sadalījumu tālāk)              |
| `a2a/`                                                                        | A2A JSON-RPC 2.0 galapunkts (`POST /a2a`)                      |
| `.well-known/agent.json/`                                                     | A2A aģenta kartītes atklāšanas dokuments                       |
| `(dashboard)/`                                                                | Informācijas paneļa saskarne (maršrutu grupa bez URL prefiksa) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Autentifikācijas plūsmas                                       |
| `landing/`                                                                    | Mārketinga/galvenā lapa                                        |
| `docs/`                                                                       | Iegults API dokumentācijas skatītājs                           |
| `status/`, `maintenance/`, `offline/`                                         | Darbības lapas                                                 |
| `privacy/`, `terms/`                                                          | Juridiskās lapas                                               |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Statiskas kļūdu lapas                                          |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Ietvara kļūdu/ielādes robežas                                  |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Saknes ietvars                                                 |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — Saskarnes lapas

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, kā arī saknes `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — Augšējā līmeņa API grupas

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
├── services/   Iegulto pakalpojumu pārvaldība (9router, cliproxy) — LOCAL_ONLY
├── upstream-proxy/
├── usage/
├── v1/         Ar OpenAI saderīgs publiskais API
├── v1beta/     Ar Gemini stilu saderīgs API
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Iegulto pakalpojumu pārvaldība

Maršruti 9Router un CLIProxyAPI instalēšanai, palaišanai, apturēšanai un uzraudzībai.
Visi ceļi ir klasificēti kā **LOCAL_ONLY** (tikai loopback, stingrais noteikums Nr. 17), jo tie
var izsaukt `npm install` un palaist bērnprocesus.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             getOrInitSupervisor() palīgmodulis
│   ├── install/route.ts    POST — npm install, izmantojot execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install jaunākai versijai
│   ├── rotate-key/route.ts POST — ģenerēt jaunu API atslēgu + restartēt
│   ├── status/route.ts     GET  — aktuālais + DB statuss + versijas metadati
│   └── auto-start/route.ts POST — pārslēgt auto_start karodziņu
├── cliproxy/
│   ├── _lib.ts             getOrInitSupervisor() palīgmodulis
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install jaunākai versijai
│   ├── status/route.ts     GET  — aktuālais + DB statuss + versijas metadati
│   └── auto-start/route.ts POST — pārslēgt auto_start karodziņu
└── [name]/
    └── logs/route.ts       GET  — SSE žurnāla beigu daļa (koplietojama visiem pakalpojumiem)
```

Atbilstošā informācijas paneļa saskarne:
`src/app/(dashboard)/dashboard/providers/services/` — lapa ar divām cilnēm (CLIProxyAPI + 9Router).
Apgrieztais starpnieks 9Router iegultajai saskarnei:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Padziļināts apraksts: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — Ar OpenAI saderīgs publiskais API

```
v1/
├── accounts/[id]/                       konta meklēšana
├── agents/tasks/[id]/, agents/tasks/    A2A stila uzdevumu galapunkti
├── api/                                 iekšējie API palīgmoduļi, kas atklāti zem v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      OpenAI Batches API
├── chat/completions/                    Chat Completions (galvenais galapunkts)
├── completions/                         Mantotie teksta pabeigšanas pieprasījumi
├── embeddings/                          Iegulšanas
├── files/[id]/, files/                  Files API
├── _helpers/                            Koplietojamie maršrutu palīgmoduļi (bez publiska URL)
├── images/{edits, generations}/         Attēlu ģenerēšana + rediģēšana
├── issues/                              Problēmu sākotnējās apstrādes palīgmoduļi
├── management/{proxies}/                Pārvaldības tvēruma maršruti v1 ietvaros
├── messages/{count_tokens}/             Ar Anthropic stilu saderīgi ziņojumi
├── models/                              Modeļu saraksts (`route.ts`, `catalog.ts`)
├── moderations/                         Moderācija
├── music/                               Mūzikas ģenerēšana
├── providers/[provider]/                Darbības konkrētam pakalpojumu sniedzējam
├── quotas/{check}                       Kvotas pārbaudes
├── registered-keys/                     Reģistrēto atslēgu administrēšana
├── rerank/                              Pārkārtošana
├── responses/[...path]/                 OpenAI Responses API (catch-all)
├── search/                              Meklēšana tīmeklī
├── videos/                              Video ģenerēšana
├── ws/                                  WebSocket tilts
└── route.ts                             Indeksa apstrādātājs
```

Katrs maršruta fails izmanto vienādu shēmu:

```
Maršruts → CORS priekšpārbaude → Zod pamatteksta validācija → neobligāta autentifikācija
      → API atslēgas politikas piemērošana → apstrādes funkcijas deleģēšana (open-sse)
```

`v1beta/` ir ar Gemini stilu saderīga saskarne (plāns aptinums, kas pārveido pieprasījumus tajā pašā
`open-sse/handlers/` konveijera plūsmā).

### 3.2 `src/lib/` — Pamatbibliotēkas

Vienmēr importējiet datus, sinhronizāciju, OAuth, prasmes, atmiņu u. c. caur šiem moduļiem.
Tabulā sagrupētas faktiskās mapes un ievērojamie augšējā līmeņa faili.

| Modulis           | Nolūks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | A2A protokola serveris: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 prasmes: izmaksu analīze, veselības pārskats, pakalpojumu sniedzēju atklāšana, kvotu pārvaldība, viedā maršrutēšana, iespēju uzskaitījums)                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `acp/`            | Agent-Control-Protocol: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `api/`            | Iekšējie API palīgmoduļi: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `auth/`           | `managementPassword.ts` (paroles atiestatīšana / jaukšana)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `batches/`        | OpenAI Batches API pakalpojums (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `catalog/`        | OpenRouter kataloga sinhronizācija (`openrouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `cloudAgent/`     | Mākoņa aģentu reģistrs: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `combos/`         | Kombināciju atrisināšanas palīgmoduļi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `compliance/`     | Audits + pakalpojumu sniedzēju audits: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `config/`         | Darbināšanas konfigurācijas sasaistes modulis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `db/`             | SQLite domēna moduļi (skatiet §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `display/`        | API atbildēs izmantotās saskarnes attēlošanas palīgfunkcijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `embeddings/`     | Iegulšanas pakalpojumu reģistrs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `env/`            | Vides ielāde + introspekcija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `evals/`          | Novērtēšanas izpildvide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `jobs/`           | Fona darbi (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `memory/`         | Pastāvīgā atmiņa: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `oauth/`          | OAuth/importa pakalpojumu sniedzēju moduļi (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed`, kā arī `services/`, `utils/` un `constants/oauth.ts`                                                                                                                                                                                                                                                                                                                  |
| `plugins/`        | Spraudņu ielādētājs (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `providerModels/` | Pārvaldīts modeļu dzīves cikls: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `providers/`      | Pakalpojumu sniedzēju palīgmoduļi: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `resilience/`     | `settings.ts` — automātiskā slēdža, atdzišanas un bloķēšanas iestatījumi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `runtime/`        | Darbināšanas vides funkciju noteikšana                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `services/`       | Iegulto pakalpojumu ietvars: `ServiceSupervisor.ts` (vispārīgs bērnprocesu uzraugs ar darbību slēdzeni, gredzenveida buferi un veselības pārbaudītāju), `bootstrap.ts` (procesa līmeņa reģistrācija un automātiskā palaišana), `registry.ts` (rīka → uzrauga kartējums), `apiKey.ts` (AES-256-GCM atslēgu krātuve), `modelSync.ts` (periodiska modeļu sinhronizācija), `ringBuffer.ts` (5 MB cirkulārais žurnāla buferis), `healthCheck.ts` (HTTP veselības pārbaude), `types.ts`, `embedWsProxy.ts` (WebSocket starpnieks), `installers/{ninerouter,cliproxy}.ts`. Skatiet `docs/frameworks/EMBEDDED-SERVICES.md`                                                                            |
| `agentSkills/`    | Aģentu prasmju katalogs + ģenerators: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → raksta `skills/{id}/SKILL.md`), `openapiParser.ts` (izdala REST galapunktus no OpenAPI specifikācijas), `cliRegistryParser.ts` (izdala CLI apakškomandas no bin/cli-registry), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). To izmanto REST maršruti (`/api/agent-skills/*`), MCP rīki (`omniroute_agent_skills_*`) un A2A prasme `list-capabilities`. Skatiet [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Prasmju ietvars: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, kā arī `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `spend/`          | `batchWriter.ts` (atliktās rakstīšanas buferis)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sync/`           | `bundle.ts`, `tokens.ts` (Cloud Sync)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `system/`         | Sistēmas līmeņa palīgmoduļi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `translator/`     | Augšējā līmeņa tulkotāja sasaistes modulis (deleģē uz `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `usage/`          | Lietojuma uzskaite: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `versionManager/` | Automātiskā atjaunināšana + versijas manifests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ws/`             | WebSocket tilts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `zed-oauth/`      | Zed redaktora OAuth plūsma                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

Augšējā līmeņa faili mapē `src/lib/`:

- Vecais `localDb.ts` apkopošanas modulis tika noņemts — patērētāji tieši importē konkrētus `src/lib/db/*` moduļus.
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

Singletona SQLite datubāze (`getDbInstance()` failā `core.ts`, WAL žurnalēšana).
**Nekad nerakstiet neapstrādātu SQL maršrutos vai apstrādātājos** — izmantojiet šos moduļus.

![Datubāzes shēmas pārskats (atlasītas pamat­tabulas)](../diagrams/exported/db-schema-overview.svg)

> Avots: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Domēna moduļi (katrs pārvalda vienu vai vairākas tabulas): `apiKeys.ts`, `backup.ts`,
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

`migrations/` satur 168 versiju `.sql` failus (idempotentus, transakcionalus), un tos
sāknēšanas laikā izpilda `migrationRunner.ts`.

Migrācijās izveidotās tabulas (kopā 123):

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
`webhooks` (kā arī FTS5 virtuālās tabulas atmiņas meklēšanai).

### 3.3 `src/domain/` — Domēna slānis

Tīra biznesa loģika

## 4. `open-sse/` — Straumēšanas dziņa darbvieta

Atsevišķa npm darbvieta, kas tiek publicēta kā `@omniroute/open-sse`. Tā pārvalda pieprasījumu
apstrādi, izpildītājus, tulkotājus, pakalpojumus, transformatoru un MCP serveri.

```
open-sse/
├── index.ts                Publiskie eksporta elementi
├── package.json            Darbvietas manifests
├── tsconfig.json
├── types.d.ts
├── config/                 Nodrošinātāju reģistri, galveņu profili, identitāte, …
├── handlers/               Pieprasījumu apstrādātāji (chat, embeddings, audio, image, …)
├── executors/              108 nodrošinātājiem specifiski HTTP izpildītāji
├── translator/             Formātu konvertēšana (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Responses API ↔ Chat Completions straumes transformators
├── services/               Vairāk nekā 80 pakalpojumu moduļi (kombinācijas, rezerves risinājumi, kvotas, identitāte, …)
├── utils/                  Straumēšanas palīgfunkcijas, TLS klients, AWS SigV4, starpniekservera fetch, …
└── mcp-server/             MCP serveris (3 transporti, 33 tvērumi, 110 rīki)
```

### 4.1 `open-sse/handlers/`

| Apstrādātājs            | Nolūks                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `chatCore.ts`           | Galvenā tērzēšanas konveijera darbība (kešatmiņa, ātruma ierobežošana, kombināciju maršrutēšana, izpildītāja izsaukšana) |
| `responsesHandler.ts`   | OpenAI Responses API ieejas punkts                                                                                       |
| `embeddings.ts`         | Iegulšana                                                                                                                |
| `imageGeneration.ts`    | Attēlu ģenerēšana                                                                                                        |
| `audioSpeech.ts`        | Teksta pārvēršana runā                                                                                                   |
| `audioTranscription.ts` | Runas pārvēršana tekstā                                                                                                  |
| `videoGeneration.ts`    | Video ģenerēšana                                                                                                         |
| `musicGeneration.ts`    | Mūzikas ģenerēšana                                                                                                       |
| `rerank.ts`             | Pārkārtošana                                                                                                             |
| `moderations.ts`        | Moderācija                                                                                                               |
| `search.ts`             | Meklēšana tīmeklī                                                                                                        |
| `sseParser.ts`          | SSE notikumu parsētājs                                                                                                   |
| `usageExtractor.ts`     | Marķieru skaita iegūšana no augšupstraumēm                                                                               |
| `responseSanitizer.ts`  | Nodrošinātājiem specifisku lieko datu noņemšana                                                                          |
| `responseTranslator.ts` | Saikne starp nodrošinātāja atbildi un tulkotāju slāni                                                                    |

### 4.2 `open-sse/executors/`

108 nodrošinātāju izpildītāji, katrs paplašina `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop`, kā arī `claudeIdentity.ts`
(kopīgs identitātes palīgrīks) un `index.ts` (reģistrs).

> Piezīme: šeit nenorādītos nodrošinātājus apkalpo `default.ts`, izmantojot vispārīgu
> ar OpenAI saderīgu izpildītāju. Pilns nodrošinātāju katalogs (355 nodrošinātāji) atrodas
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Tulkošana pēc centrmezgla un spieķu principa (OpenAI ir centrmezgls).

- **9 pieprasījumu tulkotāji** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 atbilžu tulkotāji** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`, `openai-to-claude`.
- **9 palīgrīki** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, kā arī
  palīgrīku testi.
- **Attēlu palīgrīki** (`translator/image/sizeMapper.ts`).
- Augstākā līmeņa faili: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — uz `TransformStream` balstīts Responses API ↔ Chat
  Completions pārveidotājs (to izmanto `responses/` maršruta vispārīgais apstrādātājs).

### 4.5 `open-sse/services/`

Būtiskākie elementi (pilns saraksts atrodas sadaļā `open-sse/services/`):

| Joma                           | Faili                                                                                                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kombināciju maršrutēšana       | `combo.ts` (19 stratēģijas), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                            |
| Automātisko kombināciju dzinis | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Noturība                       | `accountFallback.ts` (atdzišana + bloķēšana), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                           |
| Kvotas                         | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Kešatmiņa                      | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                     |
| Maršrutēšanas inteliģence      | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| Darbs ar modeļiem              | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Saspiešana                     | `compression/` — pilnīgs saspiešanas dziņa savienojums                                                                                                                                                                                            |
| Marķieri + sesija              | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Līmenis / manifests            | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP / tīkls                     | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Partijas                       | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Lietojums                      | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 unikāli rīki**, kas savienoti `server.ts` (45 kanoniskie rīki `schemas/tools.ts` +
  atmiņas, prasmju, GitHub-prasmju, pūla, spēļošanas, spraudņu, Notion, Obsidian,
  lokālā korpusa un saspiešanas moduļos — apvienojums tiek skaitīts ar `countUniqueMcpTools`).
- **3 transporti**: stdio, HTTP Streamable, SSE.
- **33 tvērumi**, kas tiek piemēroti izpildlaikā — pamatsaraksts atrodas `src/shared/constants/mcpScopes.ts`, pilnais kopums ir
  tvērumu apvienojums, kurus deklarē katrs rīku modulis.
- Audita tabula: `mcp_tool_audit` (aizpilda `audit.ts`).
- Faili: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  kā arī testi sadaļā `__tests__/`.
- Pilnu rīku katalogu skatiet [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### 4.7 `open-sse/config/`

Nodrošinātāju reģistri (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), katram formātam paredzēti modeļu reģistri (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
identitātes palīgrīki (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
akreditācijas datu palīgrīki (`credentialLoader.ts`, `codexClient.ts`) un mākoņa
adapteri (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Straumēšanas primitīvi un nodrošinātāju palīgrīki: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Darbvirsmas ietvars

```
electron/
├── main.js                  Electron galvenais process
├── preload.js               Priekšielādes tilts (iespējots contextIsolation)
├── types.d.ts
├── package.json             electron-builder konfigurācija, versija 3.8.51
├── README.md
├── assets/                  Būvēšanas resursi (ikonas, entitlements, …)
├── node_modules/            Specializētais node_modules (better-sqlite3, electron-updater)
└── dist-electron/           Būvēšanas izvade (netiek iekļauta repozitorijā)
```

Darbvietas saknē ir pieci npm skripti: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Automātiskā
atjaunināšana tiek nodrošināta, izmantojot `electron-updater`, kas norāda uz
GitHub laidienu plūsmu.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           Galvenais CLI ievades punkts (Node ESM)
├── reset-password.mjs      Pārvaldības paroles atiestatīšana no CLI
├── mcp-server.mjs          MCP servera palaidējs (stdio)
├── nodeRuntimeSupport.mjs  Node versijas pārbaude
└── cli/
    ├── program.mjs         Commander programmas veidotājs
    ├── runtime.mjs         withRuntime palīgs (vispirms serveris / rezerves variants ar DB)
    ├── output.mjs          Izvades formatētāji (json/jsonl/table/csv)
    ├── i18n.mjs            t() palīgs ar lokalizācijām
    ├── api.mjs             API izgūšanas palīgs
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Komandu reģistrācija
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (viens fails katrai komandai/grupai)
```

`package.json` → `bin` tiek eksponēti divi binārie faili:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Direktorija                                          | Veids                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `tests/unit/`                                        | Vienību testi, izmantojot Node iebūvēto testu palaidēju (1821 fails, kā arī `api/`, `auth/`, `authz/` apakšdirektorijas) |
| `tests/integration/`                                 | Starpmoduļu un DB stāvokļa testi                                                                                         |
| `tests/e2e/`                                         | Playwright lietotāja saskarnes testi                                                                                     |
| `tests/e2e/protocol-clients.test.ts`                 | MCP/A2A protokola e2e testi                                                                                              |
| `tests/translator/`                                  | Tulkotājam specifiski testi                                                                                              |
| `tests/security/`                                    | Drošības regresijas testi                                                                                                |
| `tests/load/`                                        | Slodzes / stresa testi                                                                                                   |
| `tests/golden-set/`                                  | Atsauces izvades tulkotāja regresiju pārbaudēm                                                                           |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Atbalsta faili                                                                                                           |

Biežāk izmantotās komandas:

| Komanda                                                  | Ko tā palaiž                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `npm run test:unit`                                      | Visus `tests/unit/*.test.ts`, izmantojot Node testu palaidēju (paralēlisms 10) |
| `npm run test:vitest`                                    | Vitest testu komplektu (MCP, autoCombo, kešatmiņa)                             |
| `npm run test:e2e`                                       | Playwright lietotāja saskarnes testu komplektu                                 |
| `npm run test:protocols:e2e`                             | MCP + A2A protokola e2e testus                                                 |
| `npm run test:coverage`                                  | Pārklājuma slieksni (≥60% rindu/paziņojumu/funkciju/zaru)                      |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Viena faila palaišanu                                                          |

---

## 8. `scripts/`

Organizētas 6 apakšmapēs pēc nolūka.

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

## 9. Pieprasījumu konveijers (kopsavilkums)

![Pieprasījumu konveijers (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Avots: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Klienta pieprasījums
  → /v1/chat/completions (route.ts)
     CORS priekšpārbaude
     Zod validācija (chatCompletionsSchema in shared/validation/schemas.ts)
     Autentifikācija (extractApiKey + isValidApiKey VAI requireManagementAuth)
     Politiku dzinis (src/server/authz/pipeline.ts)
     Aizsargmehānismi (PII maskētājs, uzvednes injekcija, redzes tilts)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Kešatmiņas pārbaude (semantiskā + lasīšanas kešatmiņa)
     Ātruma ierobežojums (rateLimitManager, accountSemaphore)
     Kombinētā maršrutēšana (ja modelis tiek atrisināts kā kombinācija)
       comboResolver → cilpa katram mērķim → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       augšupējā servera pieprasījums → atkārtots mēģinājums/atkāpe, izmantojot accountFallback
     translateResponse() (open-sse/translator/response/*)
     SSE straume VAI JSON atbilde
     Ja Responses API: TransformStream, izmantojot open-sse/transformer/responsesTransformer.ts
  → Atbilstības audits (src/lib/compliance/)
  → Atbilde klientam
```

### Noturības izpildlaika stāvoklis (trīs mehānismi)

| Mehānisms                      | Darbības joma                       | Atrašanās vieta                                                                                             |
| ------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Pakalpojuma ķēdes pārtraucējs  | Viss pakalpojums                    | `src/shared/utils/circuitBreaker.ts`, saglabāts `domain_circuit_breakers`                                   |
| Savienojuma atdzišanas periods | Viens konts/atslēga                 | `markAccountUnavailable()` failā `src/sse/services/auth.ts`; izmanto `accountFallback.checkFallbackError()` |
| Modeļa bloķēšana               | Pakalpojums + savienojums + modelis | `open-sse/services/accountFallback.ts`, saglabāts `domain_lockout_state`                                    |

Skatiet [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) un īpašo sadaļu failā
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Kā piedalīties

### Pievienot jaunu pakalpojumu sniedzēju

1. Reģistrējiet `src/shared/constants/providers.ts` (Zod validācija pie ielādes).
2. Pievienojiet izpildītāju `open-sse/executors/`, ja nepieciešama pielāgota loģika
   (paplašiniet `BaseExecutor`).
3. Pievienojiet tulku `open-sse/translator/`, ja tas nepārprot OpenAI formātu.
4. Ja OAuth balstīts, pievienojiet konfigurāciju zem `src/lib/oauth/providers/` un
   `src/lib/oauth/services/`.
5. Reģistrējiet modeļus `open-sse/config/providerRegistry.ts` (vai formātam specifiskajā
   reģistrā zem `open-sse/config/`).
6. Rakstiet testus zem `tests/unit/`.

### Pievienot jaunu API maršrutu

1. Izveidojiet `src/app/api/your-route/route.ts`.
2. Sekojiet paraugam: CORS → Zod pamatteksta validācija → autentifikācija → apstrādātāja deleģēšana.
3. Ja jauns pieprasījuma formāts: pievienojiet Zod shēmu `src/shared/validation/schemas.ts`.
4. Ja tikai pārvaldībai: pievienojiet ceļu `src/shared/constants/publicApiRoutes.ts`
   (noliegšanas saraksts publiskajai API virsmai).
5. Pievienojiet testus zem `tests/unit/`.
6. Atjauniniet `docs/reference/API_REFERENCE.md` un `docs/openapi.yaml`.

### Pievienot jaunu DB moduli

1. Izveidojiet `src/lib/db/yourModule.ts` un importējiet `getDbInstance()` no `./core.ts`.
2. Eksportējiet CRUD funkcijas savam domēnam.
3. Ja jaunas tabulas: pievienojiet migrāciju zem `src/lib/db/migrations/`, secīgi numurētu,
   idempotentu, transakcionālu.
4. Importētāji izmanto tiešos importus no `@/lib/db/yourModule` (nav mucu — vecais `localDb.ts` re-eksporta slānis tika noņemts).
5. Pievienojiet testus zem `tests/unit/`.

### Pievienot jaunu MCP rīku

1. Pievienojiet rīka definīciju zem `open-sse/mcp-server/tools/` (vai paplašiniet
   `open-sse/mcp-server/schemas/tools.ts`).
2. Piešķiriet atbilstošos tvērumus `src/shared/constants/mcpScopes.ts`.
3. Reģistrējiet rīku `open-sse/mcp-server/server.ts`.
4. Pievienojiet testus zem `open-sse/mcp-server/__tests__/`.
5. Atjauniniet [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Pievienot jaunu A2A prasmi

Skatīt [A2A-SERVER.md § Adding a New Skill](../frameworks/A2A-SERVER.md). Prasmes atrodas
`src/lib/a2a/skills/` un tiek reģistrētas caur A2A uzdevumu pārvaldnieku.

---

## 11. Konvencijas

- **Koda stils**: 2 atstarpju indents, dubultās pēdiņas, 100 simbolu platums, semikoli,
  `es5` komati pēc pēdējā elementa — uzlikts ar Prettier caur `lint-staged`.
- **Importi**: ārējie → iekšējie (`@/`, `@omniroute/open-sse`) → relatīvie.
- **Nosaukšana**: faili `camelCase` vai `kebab-case`, komponenti `PascalCase`,
  konstantes `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` visur;
  `no-explicit-any` = `warn` `open-sse/` un `tests/`, kļūda pārējās vietās.
- **TypeScript**: `strict: false` (mantojuma pozīcija). Dodiet priekšroku skaidriem tipiem
  pār secinājumiem šķērmoduļu robežām.
- **Datubāze**: nekad nerakstiet neapstrādātu SQL maršrutos vai apstrādātājos — vienmēr
  izmantojiet `src/lib/db/` moduļus. Nekad neimportējiet no mucas — izmantojiet specifiskus `src/lib/db/*` moduļus tieši.
- **DB-entitāju tipizācija (#3512)**: funkcija, kas raksta vai lasa DB tabulas
  rindas formu, vajadzētu pieņemt/atgriezt nosauktu TS interfeisu, kas atspoguļo šīs tabulas
  kolonnas 1:1, nevis `any` vai anonīmu tipu izsaukuma vietā. Novietojiet interfeisu blakus
  funkcijai (piem., `export interface UsageEntry` iekš
  `src/lib/usage/usageHistory.ts` virs `saveRequestUsage`), atstājiet atsevišķus
  laukus neobligātus/nullējamus, kad dažādi rakstītāji aizpilda rindu
  inkrementāli, un dodiet priekšroku `unknown` pār `any` laukam, kura forma
  mainās starp izsaukumiem (dokumentēts pie lauka, piem., `UsageEntry.tokens`
  pieņem gan neapstrādātu pakalpojumu sniedzēja formas lietojumu, gan normalizēto formu). Kad
  faila `any` skaits sasniedzis nulli šādā veidā, pievienojiet to
  `check:any-budget:t11` atļauto sarakstam (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`), lai tas nevarētu regresēt. Šī ir pirmās šķēres konvencija — plašākā
  "nav anonīma `any`" tīrīšana ir iteratīva pārējā koda bāzē.
- **Kļūdas**: try/catch ar specifiskiem kļūdu tipiem, žurnalējiet ar pino kontekstu. Nekad
  neapklusiniet kļūdas SSE straumēs klusi; izmantojiet pārtraukšanas signālus tīrīšanai.
- **Drošība**: nekad neizmantojiet `eval()` / `new Function()` / netiešo eval. Validējiet
  visus ievades datus ar Zod. Šifrējiet akreditācijas datus miera stāvoklī (AES-256-GCM). Uzturējiet
  `src/shared/constants/upstreamHeaders.ts` noliegšanas sarakstu sinhronizētu ar
  sanitizācijas/validācijas slāni.
- **Kommiti**: Conventional Commits — `feat(scope): subject`. Atļautie tvērumi:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Zari**: prefiksi `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Nekad nekommitējiet tieši uz `main`.
- **Husky**: pirms-kommita izpilda `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; pirms-push izpilda `check:any-budget:t11` + `check:tracked-artifacts` (ātri vārti; izslēdz `test:unit`).

---

## 12. Stingrie noteikumi (no CLAUDE.md)

1. Nekad neizvietojiet slepenus datus vai akreditācijas datus.
2. Nekad neizmantojiet barrel-import — izmantojiet konkrētus `src/lib/db/*` moduļus tieši.
3. Nekad neizmantojiet `eval()` / `new Function()` / netiešu eval.
4. Nekad neveiciet tiešas izmaiņas `main` zarā.
5. Nekad nerakstiet neapstrādātu SQL maršrutos — vienmēr izmantojiet `src/lib/db/` moduļus.
6. Nekad klusi nenorijiet kļūdas SSE straumēs.
7. Vienmēr validējiet ievades datus ar Zod shēmām.
8. Veicot izmaiņas produkcijas kodā, vienmēr iekļaujiet testus.
9. Pārklājumam jāpaliek ≥ 60% (izteikumi, rindas, funkcijas, zari).

---

## 13. Skatiet arī

- [ARCHITECTURE.md](./ARCHITECTURE.md) — augsta līmeņa arhitektūra un moduļu
  atbildības jomas.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — publiskā + pārvaldības API atsauce.
- [FEATURES.md](../guides/FEATURES.md) — funkciju matrica un versiju izcēlumi.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — ķēdes pārtraucēja, atdzišanas un
  bloķēšanas padziļināts apskats.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo vērtēšana un stratēģijas.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — pilns MCP rīku katalogs + transporta mehānismi.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — A2A protokola prasmes un atklāšana.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — RTK + Caveman saspiešana.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — CLI integrācijas.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (ja ir pieejams), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — izvietošanas mērķi.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — bieži sastopamās operacionālās problēmas.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — līdzdalībnieku darba process.
- [CLAUDE.md](../../CLAUDE.md) — repozitorija noteikumi Claude Code (daudzu iepriekš
  minēto konvenciju patiesais avots).
- [AGENTS.md](../../AGENTS.md) — padziļināta arhitektūras atsauce, ko izmanto aģenti.
