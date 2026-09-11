# CODEBASE_DOCUMENTATION (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇪 [et](../../../et/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇪 [ga](../../../ga/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇷 [hr](../../../hr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇻 [lv](../../../lv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇹 [mt](../../../mt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇮 [sl](../../../sl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇸 [sr](../../../sr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "OmniRoute programinio kodo bazės dokumentacija"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute programinio kodo bazės dokumentacija

> **Versija:** v3.8.51
> **Paskutinį kartą atnaujinta:** 2026-06-28
> **Auditorija:** inžinieriai, prisidedantys prie OmniRoute arba kuriantys juo pagrįstas integracijas.
>
> Aukšto lygio architektūros diagramas ir kiekvieno posistemio pagrindimą rasite
> [ARCHITECTURE.md](./ARCHITECTURE.md). Išsamią informaciją apie atskirus posistemius
> (Auto Combo, MCP serverį, A2A serverį, Skills, Memory, Cloud Agents, Resilience,
> Compression ir kt.) rasite jiems skirtuose šio `docs/` katalogo failuose.

Šiame faile aprašoma, **kas šiuo metu yra saugykloje**, kad naujas inžinierius
galėtų orientuotis jos medyje, suprasti vykdymo aplinkos sluoksnius ir žinoti, kur pridėti kodą
nekuriant naujų modulių.

---

## 1. Technologijų rinkinys

| Sritis                         | Pasirinkimas                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Žiniatinklio sistema           | **Next.js 16** (App Router, autonominė išvestis, nėra visuotinės tarpinės programinės įrangos)                                                   |
| Kalba                          | **TypeScript 6.0+** — tikslas `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                                           |
| Vykdymo aplinka                | **Node.js** `>=22.22.2 <23` arba `>=24.0.0 <27` (užtikrinama naudojant `engines` + `SUPPORTED_NODE_RANGE`)                                       |
| Duomenų bazė                   | **SQLite** per `better-sqlite3` (vienintelis egzempliorius, WAL žurnalizavimas)                                                                  |
| Darbalaukis                    | **Electron 41** + `electron-builder` 26.10 (atskira darbo sritis kataloge `electron/`)                                                           |
| Testai                         | **Node integruota testų vykdymo priemonė** (vienetų / integraciniai), **Vitest** (MCP, autoCombo, podėlis), **Playwright** (e2e + protocols-e2e) |
| Kūrimas                        | Autonominis Next.js kūrimas per `scripts/build/build-next-isolated.mjs`                                                                          |
| Kodo tikrinimas / formatavimas | ESLint plokščioji konfigūracija + Prettier (`lint-staged` per Husky prieš įrašant pakeitimą)                                                     |
| Modulių sistema                | Visur naudojama ESM (`"type": "module"`)                                                                                                         |
| Darbo sritys                   | npm darbo sritis — `open-sse` yra vienintelė papildoma darbo sritis                                                                              |

Kelių alternatyvieji vardai (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Numatytasis HTTP prievadas: **`20128`** (API ir valdymo skydelis naudoja tą patį procesą). Duomenų
katalogas nurodomas aplinkos kintamuoju `DATA_DIR`; numatytoji reikšmė yra `~/.omniroute/`.

---

## 2. Saugyklos struktūra

```
OmniRoute/
├── src/                  Next.js programa (App Router, bibliotekos, domenas, serveris, bendrasis kodas)
├── open-sse/             Srautinio perdavimo variklio darbo sritis (@omniroute/open-sse)
├── electron/             Darbalaukio apvalkalas (Electron 41 pagrindinis procesas + išankstinis įkėlimas)
├── bin/                  CLI įvesties taškai (omniroute, reset-password)
├── tests/                Vienetų, integraciniai, e2e, protocols-e2e, vertimo, saugumo testai ir fikstūros
├── scripts/              Kūrimo, sinchronizavimo, tikrinimo, migravimo ir vykdymo aplinkos pagalbiniai scenarijai
├── docs/                 Vieša dokumentacija (šis katalogas)
├── public/               Statiniai ištekliai, PWA manifestas, tarnybinė programa
├── config/               Vykdymo aplinkos konfigūracijos pavyzdžiai
├── images/               Rinkodaros / ekrano kopijų ištekliai
├── _ideia/, _references/, _mono_repo/, _tasks/   Vidiniai juodraščiai / planavimas (neplatinama)
├── CLAUDE.md             Saugyklos taisyklės, skirtos Claude Code
├── AGENTS.md             Išsamesnis architektūros žinynas agentams
├── package.json          v3.8.51, darbo srities šaknis
└── tsconfig.json         Kelių alternatyvieji vardai + pagrindinės kompiliatoriaus parinktys
```

---

## 3. `src/` — Next.js programa

```
src/
├── app/                  App Router puslapiai + API maršrutai
├── lib/                  Pagrindinės bibliotekos (DB, autentifikavimas, OAuth, įgūdžiai, atmintis, …)
├── domain/               Grynas domeno sluoksnis (politika, atsarginiai variantai, sąnaudos, blokavimas, …)
├── server/               Tik serveriui skirti moduliai (authz, cors, autentifikavimas)
├── shared/               Tipai, konstantos, tikrinimas, sutartys, pagalbinės priemonės (saugios naudoti tarp ribų)
├── mitm/                 Tarpinio tarpinio serverio pagalbinės priemonės CLI integracijai
├── models/               Vietinių modelių metaduomenys / alternatyvūs pavadinimai
├── sse/                  Senesnės SSE doroklės, vis dar esančios po src/ (ne open-sse/)
├── store/                Kliento būsenos saugyklos
├── middleware/           Maršruto lygmens tarpinės programinės įrangos priemonės (ne visuotinė Next.js tarpinė programinė įranga)
├── scripts/              Medyje esantys scenarijai, kuriuos gali importuoti programos kodas
├── types/                Aplinkos ir bendrinami TS tipai
├── i18n/                 Lokalės paketai
├── instrumentation.ts    Next.js instrumentavimo kablis
├── instrumentation-node.ts
└── proxy.ts              Aukščiausio lygmens tarpinio serverio paleidimo pagalbinė priemonė
```

### 3.1 `src/app/` — App Router

App Router pateikia ir valdymo skydelio UI, ir viešąją / valdymo HTTP API.
**Visuotinės tarpinės programinės įrangos nėra** — perėmimas atliekamas kiekvienam maršrutui atskirai.

Aukščiausio lygmens segmentai po `src/app/`:

| Kelias                                                                        | Paskirtis                                             |
| ----------------------------------------------------------------------------- | ----------------------------------------------------- |
| `api/`                                                                        | Visi HTTP API maršrutai (žr. skaidymą toliau)         |
| `a2a/`                                                                        | A2A JSON-RPC 2.0 galinis taškas (`POST /a2a`)         |
| `.well-known/agent.json/`                                                     | A2A agento kortelės aptikimo dokumentas               |
| `(dashboard)/`                                                                | Valdymo skydelio UI (maršrutų grupė, be URL prefikso) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Autentifikavimo srautai                               |
| `landing/`                                                                    | Rinkodaros / pradžios puslapis                        |
| `docs/`                                                                       | Įterptoji API dokumentacijos peržiūros priemonė       |
| `status/`, `maintenance/`, `offline/`                                         | Eksploataciniai puslapiai                             |
| `privacy/`, `terms/`                                                          | Teisinės informacijos puslapiai                       |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Statiniai klaidų puslapiai                            |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Sistemos klaidų / įkėlimo ribos                       |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Šakninė struktūra                                     |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — UI puslapiai

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, taip pat šakniniai `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — Aukščiausio lygmens API grupės

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
├── services/   Įterptųjų paslaugų valdymas (9router, cliproxy) — LOCAL_ONLY
├── upstream-proxy/
├── usage/
├── v1/         Su OpenAI suderinama viešoji API
├── v1beta/     Gemini stiliaus suderinamumas
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Įterptųjų paslaugų valdymas

Maršrutai, skirti 9Router ir CLIProxyAPI įdiegti, paleisti, sustabdyti ir stebėti.
Visi keliai klasifikuojami kaip **LOCAL_ONLY** (tik grįžtamojo ryšio sąsaja, griežta taisyklė Nr. 17), nes jie
gali iškviesti `npm install` ir paleisti antrinius procesus.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             getOrInitSupervisor() pagalbinė priemonė
│   ├── install/route.ts    POST — npm install per execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install naujesnė versija
│   ├── rotate-key/route.ts POST — generuoti naują API raktą + paleisti iš naujo
│   ├── status/route.ts     GET  — tiesioginė + DB būsena + versijos metaduomenys
│   └── auto-start/route.ts POST — perjungti auto_start vėliavėlę
├── cliproxy/
│   ├── _lib.ts             getOrInitSupervisor() pagalbinė priemonė
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install naujesnė versija
│   ├── status/route.ts     GET  — tiesioginė + DB būsena + versijos metaduomenys
│   └── auto-start/route.ts POST — perjungti auto_start vėliavėlę
└── [name]/
    └── logs/route.ts       GET  — SSE žurnalo pabaiga (bendrinama visų paslaugų)
```

Atitinkamas valdymo skydelio UI:
`src/app/(dashboard)/dashboard/providers/services/` — dviejų skirtukų puslapis (CLIProxyAPI + 9Router).
Atvirkštinis tarpinis serveris, skirtas 9Router įterptajam UI:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Išsamiau: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — Su OpenAI suderinama viešoji API

```
v1/
├── accounts/[id]/                       paskyros paieška
├── agents/tasks/[id]/, agents/tasks/    A2A stiliaus užduočių galiniai taškai
├── api/                                 vidinės API pagalbinės priemonės, pateikiamos po v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      OpenAI Batches API
├── chat/completions/                    Chat Completions (pagrindinis galinis taškas)
├── completions/                         Senesnis teksto užbaigimas
├── embeddings/                          Vektoriniai įterpiniai
├── files/[id]/, files/                  Files API
├── _helpers/                            Bendrinamos maršrutų pagalbinės priemonės (be viešojo URL)
├── images/{edits, generations}/         Vaizdų generavimas + redagavimas
├── issues/                              Pirminio įvertinimo pagalbiniai galiniai taškai
├── management/{proxies}/                Valdymo apimties maršrutai v1 viduje
├── messages/{count_tokens}/             Anthropic stiliaus pranešimų suderinamumas
├── models/                              Modelių sąrašas (`route.ts`, `catalog.ts`)
├── moderations/                         Moderavimas
├── music/                               Muzikos generavimas
├── providers/[provider]/                Kiekvieno teikėjo operacijos
├── quotas/{check}                       Kvotų patikros
├── registered-keys/                     Registruotų raktų administravimas
├── rerank/                              Pakartotinis reitingavimas
├── responses/[...path]/                 OpenAI Responses API (viską apimantis maršrutas)
├── search/                              Žiniatinklio paieška
├── videos/                              Vaizdo įrašų generavimas
├── ws/                                  WebSocket tiltas
└── route.ts                             Indekso doroklė
```

Kiekvienas maršruto failas laikosi to paties šablono:

```
Maršrutas → CORS išankstinė užklausa → Zod turinio tikrinimas → pasirinktinis autentifikavimas
          → API rakto politikos taikymas → perdavimas doroklei (open-sse)
```

`v1beta/` yra Gemini stiliaus suderinamumo paviršius (plonas apvalkalas, kuris transformuoja į
tą patį `open-sse/handlers/` konvejerį).

### 3.2 `src/lib/` — Pagrindinės bibliotekos

Duomenis, sinchronizavimą, OAuth, įgūdžius, atmintį ir kt. visada importuokite per šiuos modulius.
Lentelėje sugrupuoti tikrieji katalogai ir svarbūs aukščiausio lygmens failai.

| Modulis           | Paskirtis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | A2A protokolo serveris: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 įgūdžiai: sąnaudų analizė, būklės ataskaita, teikėjų aptikimas, kvotų valdymas, išmanusis maršruto parinkimas, galimybių sąrašo pateikimas)                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `acp/`            | Agento valdymo protokolas: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `api/`            | Vidinės API pagalbinės priemonės: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `auth/`           | `managementPassword.ts` (slaptažodžio nustatymas iš naujo / maišos skaičiavimas)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `batches/`        | OpenAI Batches API paslauga (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `catalog/`        | OpenRouter katalogo sinchronizavimas (`openrouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `cloudAgent/`     | Debesijos agentų registras: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `combos/`         | Derinių nustatymo pagalbinės priemonės                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `compliance/`     | Auditas + teikėjų auditas: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `config/`         | Vykdymo aplinkos konfigūracijos susiejimas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `db/`             | SQLite domeno moduliai (žr. §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `display/`        | API atsakymuose naudojamos UI / rodymo pagalbinės priemonės                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `embeddings/`     | Vektorinių įterpinių paslaugų registras                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `env/`            | Aplinkos įkėlimas + analizė                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `evals/`          | Vertinimų vykdymo aplinka                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `jobs/`           | Foninės užduotys (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `memory/`         | Nuolatinė atmintis: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `oauth/`          | OAuth / importavimo teikėjų moduliai (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed`, taip pat `services/`, `utils/` ir `constants/oauth.ts`                                                                                                                                                                                                                                                                                                                                      |
| `plugins/`        | Papildinių įkėlimo priemonė (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `providerModels/` | Valdomas modelių gyvavimo ciklas: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `providers/`      | Teikėjų pagalbinės priemonės: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `resilience/`     | `settings.ts` — grandinės pertraukiklio, atvėsimo ir blokavimo nuostatos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `runtime/`        | Vykdymo aplinkos funkcijų aptikimas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `services/`       | Įterptųjų paslaugų sistema: `ServiceSupervisor.ts` (bendroji antrinių procesų priežiūros priemonė su operacijų užraktu, žiediniu buferiu ir būklės tikrintuvu), `bootstrap.ts` (proceso lygmens registravimas ir automatinis paleidimas), `registry.ts` (įrankio → priežiūros priemonės žemėlapis), `apiKey.ts` (AES-256-GCM raktų saugykla), `modelSync.ts` (periodinis modelių sinchronizavimas), `ringBuffer.ts` (5 MB žiedinis žurnalo buferis), `healthCheck.ts` (HTTP būklės patikra), `types.ts`, `embedWsProxy.ts` (WebSocket tarpinis serveris), `installers/{ninerouter,cliproxy}.ts`. Žr. `docs/frameworks/EMBEDDED-SERVICES.md`                                                                   |
| `agentSkills/`    | Agentų įgūdžių katalogas + generatorius: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → įrašo `skills/{id}/SKILL.md`), `openapiParser.ts` (ištraukia REST galinius taškus iš OpenAPI specifikacijos), `cliRegistryParser.ts` (ištraukia CLI antrines komandas iš bin/cli-registry), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Naudojamas REST maršrutų (`/api/agent-skills/*`), MCP įrankių (`omniroute_agent_skills_*`) ir A2A įgūdžio `list-capabilities`. Žr. [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Įgūdžių sistema: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, taip pat `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `spend/`          | `batchWriter.ts` (atidėto įrašymo buferis)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `sync/`           | `bundle.ts`, `tokens.ts` (debesijos sinchronizavimas)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `system/`         | Sistemos lygmens pagalbinės priemonės                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `translator/`     | Aukščiausio lygmens vertimo susiejimas (perduoda į `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `usage/`          | Naudojimo apskaita: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `versionManager/` | Automatinis naujinimas + versijų manifestas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ws/`             | WebSocket tiltas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `zed-oauth/`      | Zed redaktoriaus OAuth srautas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

Aukščiausio lygmens failai `src/lib/`:

- Senasis `localDb.ts` suvestinis modulis pašalintas — naudotojai konkrečius `src/lib/db/*` modulius importuoja tiesiogiai.
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

Vienetinis SQLite duomenų bazės egzempliorius (`getDbInstance()` faile `core.ts`, WAL žurnalų vedimas).
**Niekada nerašykite neapdoroto SQL maršrutuose ar doroklėse** — naudokite šiuos modulius.

![Duomenų bazės schemos apžvalga (pasirinktos pagrindinės lentelės)](../diagrams/exported/db-schema-overview.svg)

> Šaltinis: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Domeno moduliai (kiekvienam priklauso viena ar daugiau lentelių): `apiKeys.ts`, `backup.ts`,
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

`migrations/` kataloge yra 168 versijuoti `.sql` failai (idempotentiški, transakciniai), kuriuos
paleidimo metu vykdo `migrationRunner.ts`.

Visose migracijose sukurtos lentelės (iš viso 123):

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
`webhooks` (taip pat FTS5 virtualiosios lentelės atminties paieškai).

### 3.3 `src/domain/` — Domeno sluoksnis

Gryna verslo logika, be įvesties / išvesties. Importuojama maršrutų ir doroklių.

| Failas                                     | Paskirtis                                              |
| ------------------------------------------ | ------------------------------------------------------ |
| `policyEngine.ts`                          | Aukščiausio lygmens politikos sprendiklis              |
| `fallbackPolicy.ts`                        | Atsarginio varianto sprendimų medis                    |
| `costRules.ts`                             | Sąnaudų skaičiavimo taisyklės                          |
| `lockoutPolicy.ts`                         | Modelio blokavimo sprendimai                           |
| `tagRouter.ts`                             | Žymomis pagrįstas maršruto parinkimas                  |
| `comboResolver.ts`                         | Derinio nustatymas iš užklausos → paskirties sąrašas   |
| `connectionModelRules.ts`                  | Kiekvieno ryšio modelių filtrai                        |
| `modelAvailability.ts`                     | Modelio prieinamumo patikra                            |
| `degradation.ts`                           | Perėjimai į riboto veikimo režimą                      |
| `providerExpiration.ts`                    | Nebegaliojančios paskyros / rakto aptikimas            |
| `quotaCache.ts`                            | Podėliuoti kvotų sprendimai                            |
| `responses.ts`, `omnirouteResponseMeta.ts` | Atsakymo formos pagalbinės priemonės                   |
| `configAudit.ts`                           | Konfigūracijos pakeitimų auditas                       |
| `assessment/`                              | Modelio vertinimas (pagal RFC, įgyvendintas iš dalies) |
| `types.ts`                                 | Bendrinami domeno tipai                                |

### 3.4 `src/server/` — Tik serveriui

Negali būti importuojama iš kliento komponentų.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Klasifikuoja maršrutus kaip viešuosius arba valdymo
│   ├── assertAuth.ts      Teiginio pagalbinė priemonė
│   ├── context.ts         Kiekvienos užklausos authz kontekstas
│   ├── headers.ts
│   ├── pipeline.ts        Authz konvejeris
│   ├── policies/          Konkrečios politikos
│   └── types.ts
└── cors/origins.ts        Leidžiamų CORS šaltinių sąrašas
```

### 3.5 `src/shared/` — Saugu bendrinti

Padalyta į konkrečios paskirties pakatalogius:

- `constants/` — `providers.ts` (Zod patikrintas teikėjų katalogas), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts` (draudžiamų elementų sąrašas), `mcpScopes.ts`,
  `errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
  `bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
  `sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 Zod schemų), `compressionConfigSchemas.ts`,
  `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — viešosios API sutartys, platinamos per npm.
- `types/` — bendrinami TS tipai.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`, `cloud.ts`, `cn.ts`,
  `cors.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts`, taip pat valdymo skydelio kabliai / komponentai po `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/`.

---

## 4. `open-sse/` — Srautinio perdavimo variklio darbo sritis

Atskira npm darbo sritis, publikuojama kaip `@omniroute/open-sse`. Ji apima užklausų
apdorojimą, vykdykles, vertimo komponentus, paslaugas, transformavimo komponentą ir MCP serverį.

```
open-sse/
├── index.ts                Viešai eksportuojami elementai
├── package.json            Darbo srities manifestas
├── tsconfig.json
├── types.d.ts
├── config/                 Teikėjų registrai, antraščių profiliai, tapatybė, …
├── handlers/               Užklausų apdorojimo komponentai (pokalbiai, įterpiniai, garsas, vaizdai, …)
├── executors/              108 konkretiems teikėjams skirtos HTTP vykdyklės
├── translator/             Formatų konvertavimas (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Responses API ↔ Chat Completions srauto transformavimo komponentas
├── services/               Daugiau nei 80 paslaugų modulių (deriniai, atsarginiai variantai, kvotos, tapatybė, …)
├── utils/                  Srautinio perdavimo pagalbinės priemonės, TLS klientas, AWS SigV4, tarpinio serverio užklausos, …
└── mcp-server/             MCP serveris (3 transportai, 33 aprėptys, 110 įrankių)
```

### 4.1 `open-sse/handlers/`

| Apdorojimo komponentas  | Paskirtis                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `chatCore.ts`           | Pagrindinis pokalbių konvejeris (podėlis, spartos ribojimas, derinių maršruto parinkimas, vykdyklių iškvietimas) |
| `responsesHandler.ts`   | OpenAI Responses API įvesties taškas                                                                             |
| `embeddings.ts`         | Įterpiniai                                                                                                       |
| `imageGeneration.ts`    | Vaizdų generavimas                                                                                               |
| `audioSpeech.ts`        | Teksto vertimas į kalbą                                                                                          |
| `audioTranscription.ts` | Kalbos vertimas į tekstą                                                                                         |
| `videoGeneration.ts`    | Vaizdo įrašų generavimas                                                                                         |
| `musicGeneration.ts`    | Muzikos generavimas                                                                                              |
| `rerank.ts`             | Pakartotinis reitingavimas                                                                                       |
| `moderations.ts`        | Moderavimas                                                                                                      |
| `search.ts`             | Paieška žiniatinklyje                                                                                            |
| `sseParser.ts`          | SSE įvykių analizatorius                                                                                         |
| `usageExtractor.ts`     | Žetonų kiekių išgavimas iš aukštesniojo lygio srautų                                                             |
| `responseSanitizer.ts`  | Teikėjui būdingo triukšmo pašalinimas                                                                            |
| `responseTranslator.ts` | Jungiamasis sluoksnis tarp teikėjo atsako ir vertimo sluoksnio                                                   |

### 4.2 `open-sse/executors/`

108 teikėjų vykdyklės, kurių kiekviena išplečia `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop`, taip pat `claudeIdentity.ts`
(bendrinamas tapatybės pagalbinis komponentas) ir `index.ts` (registras).

> Pastaba: čia nenurodytus teikėjus aptarnauja `default.ts`, naudodamas bendrąją
> su OpenAI suderinamą vykdyklę. Visas teikėjų katalogas (355 teikėjai) yra
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Centrinio mazgo ir stipinų principu veikiantis vertimas (OpenAI yra centrinis mazgas).

- **9 užklausų vertimo komponentai** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 atsakymų vertimo komponentai** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 pagalbiniai komponentai** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, taip pat
  pagalbinių komponentų testai.
- **Vaizdų pagalbiniai komponentai** (`translator/image/sizeMapper.ts`).
- Aukščiausiasis lygis: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — `TransformStream` pagrįstas Responses API ↔ Chat
  Completions konverteris (naudojamas kaip universalusis `responses/` maršruto apdorojimo komponentas).

### 4.5 `open-sse/services/`

Svarbiausi komponentai (visas sąrašas pateiktas `open-sse/services/`):

| Sritis                        | Failai                                                                                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Derinių maršruto parinkimas   | `combo.ts` (19 strategijų), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                             |
| Auto Combo variklis           | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Atsparumas                    | `accountFallback.ts` (atvėsimo laikotarpis ir blokavimas), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                              |
| Kvotos                        | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Kaupimas podėlyje             | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                     |
| Išmanusis maršruto parinkimas | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| Modelių apdorojimas           | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Glaudinimas                   | `compression/` — visa glaudinimo variklio integracija                                                                                                                                                                                             |
| Žetonai ir seansai            | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Lygis / manifestas            | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP / tinklas                  | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Paketai                       | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Naudojimas                    | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 unikalių įrankių**, susietų faile `server.ts` (45 kanoniniai įrankiai faile `schemas/tools.ts` +
  atminties, įgūdžių, GitHub-skills, telkinio, žaidybinimo, papildinių, Notion, Obsidian,
  vietinio tekstyno ir glaudinimo moduliai — sąjunga apskaičiuojama naudojant `countUniqueMcpTools`).
- **3 transportai**: stdio, srautinis HTTP, SSE.
- **33 aprėptys**, užtikrinamos vykdymo metu — bazinis sąrašas yra faile `src/shared/constants/mcpScopes.ts`, o visas rinkinys yra kiekvieno įrankių modulio deklaruotų aprėpčių sąjunga.
- Audito lentelė: `mcp_tool_audit` (užpildoma naudojant `audit.ts`).
- Failai: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  taip pat testai kataloge `__tests__/`.
- Visą įrankių katalogą žr. [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### 4.7 `open-sse/config/`

Teikėjų registrai (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), kiekvienam formatui skirti modelių registrai (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
tapatybės pagalbiniai komponentai (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
prisijungimo duomenų pagalbiniai komponentai (`credentialLoader.ts`, `codexClient.ts`) ir debesijos
adapteriai (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Srautinio perdavimo primityvai ir teikėjų pagalbiniai komponentai: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Darbalaukio programos apvalkalas

```
electron/
├── main.js                  Pagrindinis Electron procesas
├── preload.js               Išankstinio įkėlimo sąsaja (contextIsolation įjungta)
├── types.d.ts
├── package.json             electron-builder konfigūracija, versija 3.8.51
├── README.md
├── assets/                  Komponavimo ištekliai (piktogramos, teisės, …)
├── node_modules/            Atskiras node_modules (better-sqlite3, electron-updater)
└── dist-electron/           Komponavimo išvestis (neįtraukiama į repozitoriją)
```

Darbo srities šaknyje yra penki npm scenarijai: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Automatinis naujinimas vykdomas per
`electron-updater`, nukreiptą į GitHub leidimų kanalą.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           Pagrindinis CLI įvesties taškas (Node ESM)
├── reset-password.mjs      Valdymo slaptažodžio nustatymas iš naujo per CLI
├── mcp-server.mjs          MCP serverio paleidiklis (stdio)
├── nodeRuntimeSupport.mjs  Node versijos patikra
└── cli/
    ├── program.mjs         Commander programos kūrimo priemonė
    ├── runtime.mjs         withRuntime pagalbinė priemonė (pirmiausia serveris / atsarginis DB variantas)
    ├── output.mjs          Išvesties formatuokliai (json/jsonl/table/csv)
    ├── i18n.mjs            t() pagalbinė priemonė su lokalėmis
    ├── api.mjs             API užklausų pagalbinė priemonė
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Komandų registravimas
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (po vieną failą kiekvienai komandai / grupei)
```

`package.json` → `bin` pateikiami du vykdomieji failai:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Katalogas                                            | Tipas                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `tests/unit/`                                        | Vienetų testai, vykdomi naudojant integruotą Node testų vykdyklę (1821 failas ir `api/`, `auth/`, `authz/` pakatalogiai) |
| `tests/integration/`                                 | Kelių modulių ir DB būsenos testai                                                                                       |
| `tests/e2e/`                                         | Playwright naudotojo sąsajos testai                                                                                      |
| `tests/e2e/protocol-clients.test.ts`                 | MCP/A2A protokolų e2e testai                                                                                             |
| `tests/translator/`                                  | Vertėjui skirti testai                                                                                                   |
| `tests/security/`                                    | Saugumo regresijos                                                                                                       |
| `tests/load/`                                        | Apkrovos / streso testai                                                                                                 |
| `tests/golden-set/`                                  | Etaloninės vertėjo regresijų išvestys                                                                                    |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Pagalbiniai failai                                                                                                       |

Dažniausiai naudojamos komandos:

| Komanda                                                  | Ką ji paleidžia                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------- |
| `npm run test:unit`                                      | Visus `tests/unit/*.test.ts` per Node testų vykdyklę (lygiagretumas 10) |
| `npm run test:vitest`                                    | Vitest testų rinkinį (MCP, autoCombo, podėlis)                          |
| `npm run test:e2e`                                       | Playwright naudotojo sąsajos testų rinkinį                              |
| `npm run test:protocols:e2e`                             | MCP ir A2A protokolų e2e testus                                         |
| `npm run test:coverage`                                  | Aprėpties slenkstį (≥60 % eilučių / sakinių / funkcijų / šakų)          |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Vieno failo paleidimą                                                   |

---

## 8. `scripts/`

Pagal paskirtį suskirstyta į 6 poaplankius.

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

## 9. Užklausų apdorojimo seka (santrauka)

![Užklausų apdorojimo seka (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Šaltinis: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Kliento užklausa
  → /v1/chat/completions (route.ts)
     CORS išankstinės užklausos patikra
     Zod validavimas (chatCompletionsSchema faile shared/validation/schemas.ts)
     Autentifikavimas (extractApiKey + isValidApiKey ARBA requireManagementAuth)
     Politikos modulis (src/server/authz/pipeline.ts)
     Apsaugos priemonės (PII maskavimas, komandų įterpimo aptikimas, vaizdų tiltas)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Podėlio patikra (semantinis + skaitymo podėlis)
     Užklausų dažnio ribojimas (rateLimitManager, accountSemaphore)
     Kombinuotas nukreipimas (jei modelis susiejamas su deriniu)
       comboResolver → ciklas kiekvienam tikslui → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       užklausa aukštesnio lygio paslaugai → pakartotiniai bandymai / delsos didinimas per accountFallback
     translateResponse() (open-sse/translator/response/*)
     SSE srautas ARBA JSON atsakas
     Jei naudojama Responses API: TransformStream per open-sse/transformer/responsesTransformer.ts
  → Atitikties auditas (src/lib/compliance/)
  → Atsakas klientui
```

### Atsparumo vykdymo būsena (trys mechanizmai)

| Mechanizmas                   | Aprėptis                   | Kur                                                                                                         |
| ----------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Teikėjo grandinės išjungiklis | Visas teikėjas             | `src/shared/utils/circuitBreaker.ts`, išsaugoma `domain_circuit_breakers`                                   |
| Ryšio atvėsimo laikotarpis    | Viena paskyra / raktas     | `markAccountUnavailable()` faile `src/sse/services/auth.ts`; naudoja `accountFallback.checkFallbackError()` |
| Modelio blokavimas            | Teikėjas + ryšys + modelis | `open-sse/services/accountFallback.ts`, išsaugoma `domain_lockout_state`                                    |

Žr. [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) ir tam skirtą skyrių faile
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Kaip prisidėti

### Pridėti naują tiekėją

1. Užregistruokite `src/shared/constants/providers.ts` (įkeliant tikrinama naudojant „Zod“).
2. Jei reikalinga pasirinktinė logika, pridėkite vykdytoją kataloge `open-sse/executors/`
   (išplėskite `BaseExecutor`).
3. Jei tiekėjas nenaudoja „OpenAI“ formato, pridėkite vertiklį kataloge `open-sse/translator/`.
4. Jei naudojamas „OAuth“, pridėkite konfigūraciją kataloguose `src/lib/oauth/providers/` ir
   `src/lib/oauth/services/`.
5. Užregistruokite modelius faile `open-sse/config/providerRegistry.ts` (arba konkrečiam formatui
   skirtame registre kataloge `open-sse/config/`).
6. Parašykite testus kataloge `tests/unit/`.

### Pridėti naują API maršrutą

1. Sukurkite `src/app/api/your-route/route.ts`.
2. Laikykitės šablono: CORS → užklausos turinio tikrinimas naudojant „Zod“ → autentifikavimas → perdavimas apdorojimo funkcijai.
3. Jei naudojama nauja užklausos struktūra, pridėkite „Zod“ schemą faile `src/shared/validation/schemas.ts`.
4. Jei maršrutas skirtas tik valdymui, pridėkite kelią prie `src/shared/constants/publicApiRoutes.ts`
   (viešosios API sąsajos blokavimo sąrašas).
5. Pridėkite testus kataloge `tests/unit/`.
6. Atnaujinkite `docs/reference/API_REFERENCE.md` ir `docs/openapi.yaml`.

### Pridėti naują DB modulį

1. Sukurkite `src/lib/db/yourModule.ts` ir importuokite `getDbInstance()` iš `./core.ts`.
2. Eksportuokite savo sričiai skirtas CRUD funkcijas.
3. Jei pridedamos naujos lentelės, pridėkite migraciją kataloge `src/lib/db/migrations/`, sunumeruotą
   nuosekliai, idempotentišką ir transakcinę.
4. Importuojantieji naudoja tiesioginius importus iš `@/lib/db/yourModule` (be agreguojančio modulio — senasis `localDb.ts` pakartotinio eksportavimo sluoksnis pašalintas).
5. Pridėkite testus kataloge `tests/unit/`.

### Pridėti naują MCP įrankį

1. Pridėkite įrankio apibrėžimą kataloge `open-sse/mcp-server/tools/` (arba išplėskite
   `open-sse/mcp-server/schemas/tools.ts`).
2. Priskirkite tinkamą (-as) aprėptį (-is) faile `src/shared/constants/mcpScopes.ts`.
3. Užregistruokite įrankį faile `open-sse/mcp-server/server.ts`.
4. Pridėkite testus kataloge `open-sse/mcp-server/__tests__/`.
5. Atnaujinkite [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Pridėti naują A2A įgūdį

Žr. [A2A-SERVER.md § Naujo įgūdžio pridėjimas](../frameworks/A2A-SERVER.md). Įgūdžiai laikomi
`src/lib/a2a/skills/` ir registruojami per A2A užduočių tvarkytuvę.

---

## 11. Susitarimai

- **Kodo stilius**: 2 tarpų įtrauka, dvigubos kabutės, 100 simbolių eilutės plotis, kabliataškiai,
  `es5` baigiamieji kableliai — tai užtikrina „Prettier“ per `lint-staged`.
- **Importai**: išoriniai → vidiniai (`@/`, `@omniroute/open-sse`) → santykiniai.
- **Pavadinimai**: failams naudojamas `camelCase` arba `kebab-case`, komponentams `PascalCase`,
  konstantoms `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` visur;
  `no-explicit-any` = `warn` kataloguose `open-sse/` ir `tests/`, kitur — klaida.
- **TypeScript**: `strict: false` (paveldėta nuostata). Tarpmodulinėse ribose pirmenybę
  teikite aiškiai nurodytiems tipams, o ne jų išvedimui.
- **Duomenų bazė**: niekada nerašykite neapdoroto SQL maršrutuose ar apdorojimo funkcijose — visada naudokite
  `src/lib/db/` modulius. Niekada nenaudokite agreguotų importų — konkrečius `src/lib/db/*` modulius importuokite tiesiogiai.
- **DB objektų tipizavimas (#3512)**: funkcija, kuri įrašo arba skaito DB lentelės
  eilutės struktūrą, turi priimti / grąžinti vardinę TS sąsają, 1:1 atitinkančią tos lentelės
  stulpelius, o ne `any` ar kvietimo vietoje apibrėžtą anoniminį tipą. Sąsają
  pateikite šalia funkcijos (pvz., `export interface UsageEntry` faile
  `src/lib/usage/usageHistory.ts` virš `saveRequestUsage`), palikite atskirus
  laukus pasirinktinius / galinčius būti `null`, kai skirtingos įrašymo funkcijos eilutę pildo
  palaipsniui, ir laukui, kurio struktūra skiriasi priklausomai nuo kvietėjo,
  teikite pirmenybę `unknown`, o ne `any` (tai dokumentuokite prie lauko, pvz., `UsageEntry.tokens`
  priima tiek neapdorotus tiekėjo formato naudojimo duomenis, tiek normalizuotą struktūrą). Kai
  tokiu būdu `any` skaičius faile pasiekia nulį, pridėkite jį prie
  `check:any-budget:t11` leidžiamųjų sąrašo (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`), kad neatsirastų regresija. Tai yra pirmojo etapo susitarimas — platesnis
  anoniminių `any` šalinimas likusioje kodo bazėje vykdomas iteratyviai.
- **Klaidos**: naudokite try/catch su konkrečiais klaidų tipais, registruokite žurnale su „pino“ kontekstu. Niekada
  tyliai nenutylėkite klaidų SSE srautuose; išvalymui naudokite nutraukimo signalus.
- **Saugumas**: niekada nenaudokite `eval()` / `new Function()` / numanomo „eval“. Visus
  įvesties duomenis tikrinkite naudodami „Zod“. Neaktyvius prisijungimo duomenis šifruokite (AES-256-GCM). Užtikrinkite,
  kad `src/shared/constants/upstreamHeaders.ts` blokavimo sąrašas būtų suderintas su
  valymo / tikrinimo sluoksniu.
- **Įsipareigojimai**: „Conventional Commits“ — `feat(scope): subject`. Leidžiamos aprėptys:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Šakos**: priešdėliai `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Niekada neįsipareigokite tiesiogiai į `main`.
- **Husky**: prieš įsipareigojimą vykdomi `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; prieš išsiuntimą vykdomi `check:any-budget:t11` + `check:tracked-artifacts` (greitosios patikros; neįtraukiamas `test:unit`).

---

## 12. Griežtos taisyklės (iš CLAUDE.md)

1. Niekada neįtraukite paslapčių ar prisijungimo duomenų į įrašą.
2. Niekada nenaudokite bendrųjų importų — tiesiogiai naudokite konkrečius `src/lib/db/*` modulius.
3. Niekada nenaudokite `eval()` / `new Function()` / numanomojo `eval`.
4. Niekada neįrašykite pakeitimų tiesiogiai į `main`.
5. Niekada nerašykite neapdoroto SQL maršrutuose — visada naudokite `src/lib/db/` modulius.
6. Niekada tyliai nenuslopinkite klaidų SSE srautuose.
7. Visada tikrinkite įvestis naudodami Zod schemas.
8. Keisdami produkcinį kodą visada įtraukite testus.
9. Testų aprėptis turi išlikti ≥ 60 % (sakiniai, eilutės, funkcijos, šakos).

---

## 13. Taip pat žr.

- [ARCHITECTURE.md](./ARCHITECTURE.md) — aukšto lygio architektūra ir modulių
  atsakomybės.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — viešosios ir valdymo API žinynas.
- [FEATURES.md](../guides/FEATURES.md) — funkcijų matrica ir svarbiausi versijų pakeitimai.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — išsami grandinės pertraukiklio, atvėsimo laikotarpio ir
  blokavimo analizė.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo vertinimas ir strategijos.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — visas MCP įrankių katalogas ir perdavimo būdai.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — A2A protokolo gebėjimai ir aptikimas.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — RTK ir Caveman glaudinimas.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — CLI integracijos.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (jei yra), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — diegimo tikslinės aplinkos.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dažnos eksploatavimo problemos.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — bendradarbių darbo eiga.
- [CLAUDE.md](../../CLAUDE.md) — Claude Code saugyklos taisyklės (pagrindinis daugelio pirmiau pateiktų
  susitarimų šaltinis).
- [AGENTS.md](../../AGENTS.md) — išsamesnis agentų naudojamas architektūros žinynas.
