# CODEBASE_DOCUMENTATION (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇪 [et](../../../et/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇪 [ga](../../../ga/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇷 [hr](../../../hr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇹 [lt](../../../lt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇻 [lv](../../../lv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇮 [sl](../../../sl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇸 [sr](../../../sr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "Dokumentazzjoni tal-Bażi tal-Kodiċi OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentazzjoni tal-Bażi tal-Kodiċi OmniRoute

> **Verżjoni:** v3.8.51
> **Aġġornat l-aħħar:** 2026-06-28
> **Adience:** Inġiniera li jikkontribwixxu għal OmniRoute jew jibnu integrazzjonijiet fuqu.
>
> Għal skemi ta' arkitettura ta' livell għoli u r-raġuni wara kull sottosistema, aqra
> [ARCHITECTURE.md](./ARCHITECTURE.md). Għal tagħtijiet fil-fond fuq sottosistemi individwali
> (Kumpju Awtomatiku, server MCP, server A2A, Ħiliet, Memorja, Aġenti tal-Nuvla, Reżiljenza,
> Kompressjoni, eċċ.) ara l-fajls dedikati tagħhom f'din il-folder `docs/`.

Dan il-fajl jiddeskrivi **dak li hemm fil-repositoriesllum** biex inġinier ġdid
jista' jinnaviga s-siġra, jifhem il-qaċċat tal-ħin reali, u jkun jaf fejn iżid il-kodiċi
bla ma joħloq moduli ġodda.

---

## 1. Ħafna Teknoloġija

| Konsenn            | Għażla                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Framework tal-Web  | **Next.js 16** (App Router, output awtonomu, ebda middleware ġenerali)                                                                |
| Lingwa             | **TypeScript 6.0+** — immirat `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                                |
| Ħin reali          | **Node.js** `>=22.22.2 <23` jew `>=24.0.0 <27` (infurzat permezz ta' `engines` + `SUPPORTED_NODE_RANGE`)                              |
| Database           | **SQLite** permezz ta' `better-sqlite3` (singletone, WAL journaling)                                                                  |
| Desktop            | **Electron 41** + `electron-builder` 26.10 (spazju tax-xogħol separata f'`electron/`)                                                 |
| Testijiet          | **Xejrier tat-test ta' Node nattiv** (unità/integrazzjoni), **Vitest** (MCP, awtokumpju, kejks), **Playwright** (e2e + protocols-e2e) |
| Ħafna tal-Bini     | Next.js awtonomu permezz ta' `scripts/build/build-next-isolated.mjs`                                                                  |
| Lindjar/Format     | Konfigurazzjoni ċatta ESLint + Prettier (`lint-staged` permezz ta' Husky pre-commit)                                                  |
| Sistema tal-Modulu | ESM kullimkien (`"type": "module"`)                                                                                                   |
| Spazji tax-Xogħol  | Spazju tax-xogħol npm — `open-sse` l-unika sotto-spazju tax-xogħol                                                                    |

Subistituzzjonijiet ta' mili (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Port HTTP Standard: **`20128`** (API u dashboard jaqsmu l-istess proċess). Il-folder
d tad-dejta huwa l-varjambli tal-ambjent `DATA_DIR`, b'defaults għal `~/.omniroute/`.

---

## 2. Tqassim tal-Repositories

````
OmniRoute/
├── src/                  Applikazzjoni Next.js (App Router, libs, dominju, server, komuni)
├── open-sse/             Xejrier tat-tixrid tax-xogħol (@omniroute/open-sse)
├── electron/             Warapper desktop (Electron 41 principali + preload)
├── bin/```
>Punti tad-dħul CLI (omniroute, reset-password)
├── tests/                Unità, integrazzjoni, e2e, protocols-e2e, traduttur, sigurtà, fixtures
├── scripts/              Skripts tal-bini, tissinkronizza, tivverifika, migrat, u għajnuna għal ħin reali
├── docs/                 Dokumentazzjoni pubblika (din il-folder)
├── public/               Assi staġnati, manifest PWA, servizzi tax-xogħol
├── config/               Kampjuni ta' konfigurazzjoni reali
├── images/               Assi ta' bejgħ/screenshot
├── _ideia/, _references/, _mono_repo/, _tasks/   Scratch intern / pianifikazzjoni (mhix mibgħuta)
├── CLAUDE.md             Regoli tal-repositories għal Claude Code
├── AGENTS.md             Referenza ta' arkitettura aktar profonda għall-aġenti
├── package.json          v3.8.51, rad tax-xogħol
└── tsconfig.json         Subistituzzjonijiet ta' mili + għażliet ċentrali tal-kompilatur
````

---

## 3. `src/` — Applikazzjoni Next.js

```
src/
├── app/                  Paġni tar-Router App + rotti tal-API
├── lib/                  Libreriji tal-Qalba (DB, awtentikazzjoni, OAuth, ħiliet, memorja, …)
├── domain/               Saff tal-dominju pur (politika, fallback, spejjeż, lockout, …)
├── server/               Moduli biss għas-Server (awtorizzazzjoni, CORS, awtentikazzjoni)
├── shared/               Tipi, costanti, validazzjoni, kuntratti, utilitajti (żeffiena minn naħa għall-oħra)
├── mitm/                 Għajnuniet proxy Man-in-the-middle għall-integrazzjoni CLI
├://models/               Metadata / alias ta' mudelli lokali
├── sse/                 Handlers SSE legacy li għadhom taħt src/ (mhux open-sse/)
├── store/               Ħwienet tal-istat fuq il-klijent
├── middleware/           Utilitajti middleware ta' livell ta' rotta (mhux Next.js global middleware)
├── scripts/             Skripts fl-in-tree importabbli mill-kodiċi tal-app
├── types/               Tipi TS ambientali u maqsumin
├── i18n/                Pacchetti tal-lingwa
├── instrumentation.ts   Hook tal-instrumentation Next.js
├── instrumentation-node.ts
└── proxy.ts             Għajnuna ewlenija għall-bootstrap tal-proxy
```

### 3.1 `src/app/` — Router App

Il-Router App juri kemm l-interface tal-dashboard kif ukoll l-API HTTP pubblika/ta' ġestjoni.
**Hemm l-ebda middleware globali** — l-interċezzjoni ssir rotta b'rotta.

Segimenti ta' livell ta' fuq taħt `src/app/`:

| Path                                                                          | Għan                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `api/`                                                                        | Rotot kollha tal-API HTTP (ara l-breakdown t'hawn taħt)       |
| `a2a/`                                                                        | Tpunkt tad-dħul A2A JSON-RPC 2.0 (`POST /a2a`)                |
| `.well-known/agent.json/`                                                     | Dokument tad-diskoverija tal-Kard tal-Aġent A2A               |
| `(dashboard)/`                                                                | Interface tal-dashboard (grupp ta' rotta, l-ebda prefiss URL) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Flussi tal-awtentikazzjoni                                    |
| `landing/`                                                                    | Paġna ta' marketing/landing                                   |
| `docs/`                                                                       | Viżitur tal-API docs integrat                                 |
| `status/`, `maintenance/`, `offline/`                                         | Paġni operattivi                                              |
| `privacy/`, `terms/`                                                          | Paġni leġiżlaturi                                             |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Paġni ta' żball statiku                                       |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Limiti ta' żball/tal-ħatt tal-frejmwok                        |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Shell ewlieni                                                 |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — Paġni tal-Interface

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, kif ukoll `page.tsx` tal-għeruq, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — Gruppi API ta' livell ta' fuq

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
├── services/   Ġestjoni tas-Servizz Integrat (9router, cliproxy) — BISS_LOKALI
├── upstream-proxy/
├── usage/
├── v1/         API pubblika kompatibbli mal-OpenAI
├── v1beta/     Kompatibbiltà ta' stil Gemini
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Ġestjoni tas-Servizzi Integrati

Rotot għall-installazzjoni, tnedija, waqfien, u monitoraġġ ta' 9Router u CLIProxyAPI.
Il-miftuħ kollha huma klassifikati **BISS_LOKALI** (loopback biss, regola iffriżata #17) minħabba li
jistgħu jistiednu `npm install` u jibdew proċessi wild.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             Għajnuna getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install permezz ta' execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install verzjoni aktar ġdida
│   ├── rotate-key/route.ts POST — ġenera API key ġdida + restart
│   ├── status/route.ts     GET  — status ħaj + DB + metadata tal-verżjoni
│   └── auto-start/route.ts POST — agħmel faċil jew ħassar il-bandiera auto_start
├── cliproxy/
│   ├── _lib.ts             Għajnuna getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install verżjoni aktar ġdida
│   ├── status/route.ts     GET  — status ħaj + DB + metadata tal-verżjoni
│   └── auto-start/route.ts POST — agħmel faċil jew ħassar il-bandiera auto_start
└── [name]/
    └── logs/route.ts       GET  — tail tal-log SSE (maqsum bejn is-servizzi kollha)
```

Interface tal-dashboard korrispondenti:
`src/app/(dashboard)/dashboard/providers/services/` — paġna b'żeffiena (CLIProxyAPI + 9Router).
Proxy revers għall-interface integrat ta' 9Router:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Dettalji: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — API pubblika kompatibbli mal-OpenAI

```
v1/
├── accounts/[id]/                       tiftix ta' kontijiet
├── agents/tasks/[id]/, agents/tasks/    punti ta' dħul tat-tasks ta' stil A2A
├── api/                                 għajnuniet API interni esposti taħt v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      Batches API tal-OpenAI
├── chat/completions/                    Chat Completions (il-punt ewlieni)
├── completions/                         Test completions legacy
├── embeddings/                          Embeddings
├── files/[id]/, files/                  Files API
├── _helpers/                            Għajnuniet rotta maqsumin (l-ebda URL pubbliku)
├── images/{edits, generations}/         Ġenerazzjoni + tibdil tal-istampi
├── issues/                              Punti ta' għajnuna għat-tiġrija
├── management/{proxies}/                Rotot fl-ambitu tal-ġestjoni ġewwa v1
├── messages/{count_tokens}/             Kompatibbiltà tal-messaġġi ta' stil Anthropic
├── models/                              Tlista tal-mudelli (`route.ts`, `catalog.ts`)
├── moderations/                         Moderazzjoni
├── music/                               Ġenerazzjoni tal-mużika
├── providers/[provider]/                Operazzjonijiet għal kull fornitur
├── quotas/{check}                       Indikaturi tal-kota
├── registered-keys/                     Ġestjoni tal-muftieħ reġistrat
├── rerank/                              Reranking
├── responses/[...path]/                 Responses API tal-OpenAI (take-all)
├── search/                              Tiftix tal-web
├── videos/                              Ġenerazzjoni tal-vidjo
├── ws/                                  Pont WebSocket
└── route.ts                             Handler tal-indiċi
```

Kull file ta' rotta jsegwi l-istess mudell:

```
Rotta → preflight CORS → validazzjoni tal-ħkata permezz ta' Zod → awtentikazzjoni fakultattiva
      → infurzar tal-politika tal-API key → deleġazzjoni tal-handler (open-sse)
```

`v1beta/` hija l-wiċċ tal-kompatibbiltà ta' stil Gemini (wrapper rqiqa li ttraduċi fl-istess
pipeline ta' `open-sse/handlers/`).

### 3.2 `src/lib/` — Libreriji tal-Qalba

Dejjem importa d-data, sinkronizzazzjoni, OAuth, ħiliet, memorja, eċċ. permezz ta' dawn il-modu.
It-tabella tgroupa d-direttoriji attwali u l-files ewlenin notevoli.

| Modulu            | Għan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | Server tal-protokoll A2A: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 ħiliet: analisi tal-ispejjeż, rapport tal-saħħa, skoperta tal-fornitur, ġestjoni tal-kota, rotting intelliġenti, lista-tħiliet)                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `acp/`            | Protokoll tal-Kontroll tal-Aġent: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `api/`            | Għajnuniet API interni: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `auth/`           | `managementPassword.ts` (reset / hashing tal-password)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `batches/`        | Servizz tal-Batches API tal-OpenAI (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `catalog/`        | Sinkronizzazzjoni tal-katalogu OpenRouter (`openrouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `cloudAgent/`     | Reġistru tal-aġenti tal-cloud: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `combos/`         | Għajnuniet għas-soluzzjoni tal-combos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `compliance/`     | Auditing + auditing tal-fornitur: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `config/`         | Colla tal-konfigurazzjoni runtime                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `db/`             | Moduli tal-dominju SQLite (ara §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `display/`        | Għajnuniet interface/turi li jintużaw b'responsijiet API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `embeddings/`     | Reġistru tas-servizz tal-embeddings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `env/`            | Tniżżil + introspezzjoni tal-ambjent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `evals/`          | Runtime tal-valutazzjoni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `jobs/`           | Xogħlijiet fil-fond (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `memory/`         | Memorja permanenti: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `oauth/`          | Moduli tal-fornituri tal-importazzjoni OAuth (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed`, kif ukoll `services/`, `utils/`, u `constants/oauth.ts`                                                                                                                                                                                                                                                                                                        |
| `plugins/`        | Tniżżil tal-plugins (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `providerModels/` | Ġestjoni tal-mudelli: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `providers/`      | Għajnuniet tal-fornitur: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `resilience/`     | `settings.go` — Settings għal circuit breaker, cooldown, lockout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `runtime/`        | Identifikazzjoni tal-funzjonalità runtime                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `services/`       | Frejmwok tas-servizzi integrati: `ServiceSupervisor.ts` (superviżur universali tal-proċessi wild b'blokk operazzjoni, ring buffer, verifika tal-saħħa), `bootstrap.ts` (reġistrazzjoni u tnedija awtomatika ta' livell tal-proċess), `registry.ts` (mappa ta' għodod → superviżur), `apiKey.ts` (ħażna tal-muftieħ AES-256-GCM), `modelSync.ts` (sinkronizzazzjoni periodika tal-mudelli), `ringBuffer.ts` (buffer log ta' 5 MB ċirkolari), `healthCheck.ts` (indikatur tal-saħħa HTTP), `types.ts`, `embedWsProxy.ts` (proxy WebSocket), `installers/{ninerouter,cliproxy}.ts`. Ara `docs/frameworks/EMBEDDED-SERVICES.md`                                                              |
| `agentSkills/`    | Katalogu + ġeneratur tal-Ħiliet tal-Aġent: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → jikteb `skills/{id}/SKILL.md`), `openapiParser.ts` (jestraħ endpoints REST minn speċi OpenAPI), `cliRegistryParser.ts` (jestraħ sottokmandi CLI minn bin/cli-registry), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Jingħad minn rotot REST (`/api/agent-skills/*`), għodod MCP (`omniroute_agent_skills_*`), u ħiliet A2A `list-capabilities`. Ara [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Frejmwok tal-ħiliet: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, kif ukoll `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `spend/`          | `batchWriter.ts` (buffer write-behind)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `sync/`           | `bundle.ts`, `tokens.ts` (Sincronizzazzjoni Cloud)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `system/`         | Għajnuniet ta' livell ta' sistema                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `translator/`     | Colla tal-traduttur ta' livell ta' fuq (jiddileġa għal `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `usage/`          | Kontabilità tal-użu: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `versionManager/` | Aġġornament awtomatiku + manifest tal-verżjoni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ws/`             | Pont WebSocket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `zed-oauth/`      | Fluss OAuth tal-editur Zed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Files ta' livell ta' fuq fi `src/lib/`:

- It-tbarrel qadim `localDb.ts` itneħħa — il-konsumaturi jimportaw moduli speċifiċi ta' `src/lib/db/*` direttament.
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

Database SQLite singleton (`getDbInstance()` fi `core.ts`, journaling WAL).
**Qatt tiktib SQL fergħa fil-rotot jew fil-handlers** — uża dawn il-modu.

![Ħarsa ġenerali tal-kuntratt tal-bażi tad-data (tabelli ewlenin magħżula)](../diagrams/exported/db-schema-overview.svg)

> Sors: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Moduli dominju (kull wieħed jippossjedi waħda jew aktar tabelli): `apiKeys.ts`, `backup.ts`,
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

`migrations/` jżomm 168 fajls `.sql` b'verżjonijiet (idempotenti, tranżazzjonali) u jekk
ejekutat minn `migrationRunner.ts` mal-bidu.

Tabelli maħluqa waqt il-migrazzjonijiet (123 kollha):

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
`webhooks` (flimkien mal-tabelli FTS5 virtwali għat-tiftix tal-memorja).

### 3.3 `src/domain/` — Saff tal-dominju

Loġika tan-negozju pur, l-ebda I/O. Jiġi importat minn rotot u handlers.

| File                                       | Għan                                                      |
| ------------------------------------------ | --------------------------------------------------------- |
| `policyEngine.ts`                          | Solvitur ewlieni tal-politika                             |
| `fallbackPolicy.ts`                        | Siġra tad-deċiżjonijiet fallback                          |
| `costRules.ts`                             | Regoli tal-kalkolu tal-ispejjeż                           |
| `lockoutPolicy.ts`                         | Deċiżjonijiet ta' lockout tal-mudelli                     |
| `tagRouter.ts`                             | Rotting ibbażat fuq it-tag                                |
| `comboResolver.ts`                         | Soluzzjoni tal-combo minn talba → lista fil-mira          |
| `connectionModelRules.ts`                  | Filtri tal-mudelli għal kull konnessjoni                  |
| `modelAvailability.ts`                     | Verifika tal-disponibbiltà tal-mudelli                    |
| `degradation.ts`                           | Tranżizzjonijiet għall-mudall inferjuri                   |
| `providerExpiration.ts`                    | Identifikazzjoni ta' kont/muftieħskad                     |
| `quotaCache.ts`                            | Deċiżjonijiet tal-kota ġewwa l-cache                      |
| `responses.ts`, `omnirouteResponseMeta.ts` | Għajnuniet tal-forma tal-petizzjoni                       |
| `configAudit.ts`                           | Auditing tal-bidliet fil-konfigurazzjoni                  |
| `assessment/`                              | Valutazzjoni tal-mudelli (skond RFC, miftuħa parzjalment) |
| `types.ts`                                 | Tipi dominju maqsumin                                     |

### 3.4 `src/server/` — Biss Server

Ma jistgħx jiġi importat minn komponenti tal-klijent.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Jikklassifika rotot bħala pubbliki jew ta' ġestjoni
│   ├── assertAuth.ts      Għajnuna għall-asserzzjoni
│   ├── context.ts         Kontekst ta' awtorizzazzjoni għal kull talba
│   ├── headers.ts
│   ├── pipeline.ts        Pipelin tal-awtorizzazzjoni
│   ├── policies/          Politiki konkreti
│   └── types.ts
└── cors/origins.ts        Lista tal-permessi tal-oriġini CORS
```

### 3.5 `src/shared/` — Safe to Share

Maqsum f'sotto-direttoriji ffukati:

- `constants/` — `providers.ts` (katalogu tal-fornitur vvalidat b'Zod), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts (deniedlist), `mcpScopes.ts`,
`errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
`bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
`sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 schemas Zod), `compressionConfigSchemas.ts`,
  `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — Kuntratti API pubbliki mibgħuta għan-npm.
- `types/` — Tipi TS maqsumin.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`, `cloud.ts`, `cn.ts`,
  `cors.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts`, kif ukoll hooks/komponenti tal-dashboard taħt `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/`.

---

## 4. `open-sse/` — Spazju tax-xogħol tal-magna ta' l-streaming

Workspace npm separat ippubblikat bħala `@omniroute/open-sse`. Jippossjedi l-ipproċessar tal-ħtiġijiet, l-esekuturi, it-tradutturi, is-servizzi, it-trasformatur, u s-servizz MCP.

```
open-sse/
├── index.ts                Esportazzjonijiet pubbliċi
├── package.json           .Manifest tal-workspace
├── tsconfig.json
├── types.d.ts
├── config/                 Reġistri tal-fornituri, profili tal-intestaturi, identità, …
├── handlers/               Trattaturi tal-ħtiġijiet (chat, embeddings, audio, stampa, …)
├── executors/              108 ese-kuturi HTTP speċifiċi għal fornituri
├── translator/             Konverżjoni tal-format (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Trasformatur ta' l-stream ta' l-API Responses ↔ Chat Completions
├── services/               80+ moduli tas-servizz (kombinazzjonijiet, fallback, kwoti, identità, …)
├── utils/                  Għajnuniet ta' l-streaming, klijent TLS, AWS SigV4, proxy fetch, …
└── mcp-server/             Servizz MCP (3 trasporti, 33 skop, 110 għodda)
```

### 4.1 `open-sse/handlers/`

| Handler                 | Għan                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `chatCore.ts`           | Pipeline prinċipali ta' chat (cache, limit ta' rata, rotta kombinata, dispaċċ tal-ese-kutur) |
| `responsesHandler.ts`   | Daħla tal-API Responses ta' OpenAI                                                           |
| `embeddings.ts`         | Embeddings                                                                                   |
| `imageGeneration.ts`    | Ġenerazzjoni ta' stampi                                                                      |
| `audioSpeech.ts`        | Text-to-speech                                                                               |
| `audioTranscription.ts` | Speech-to-text                                                                               |
| `videoGeneration.ts`    | Ġenerazzjoni tal-vidjo                                                                       |
| `musicGeneration.ts`    | Ġenerazzjoni tal-mużika                                                                      |
| `rerank.ts`             | Reranking                                                                                    |
| `moderations.ts`        | Moderation                                                                                   |
| `search.ts`             | Tiftix fuq il-web                                                                            |
| `sseParser.ts`          | Parsur tal-avvenimenti SSE                                                                   |
| `usageExtractor.ts`     | Tneħħi l-konturi tat-tokens minn streams upstream                                            |
| `responseSanitizer.ts`  | Neħħija tal-ħoss speċifiku għal fornitur                                                     |
| `responseTranslator.ts` | Qafk bejn ir-risposta tal-fornitur u s-saff tat-tarduktor                                    |

### 4.2 `open-sse/executors/`

108 ese-kutur ta' fornituri, kull wieħed jestendixxi `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop`, flimkien ma' `claudeIdentity.ts`
(għajnuna komuni tal-identità) u `index.ts` (reġistru).

> Nota: il-fornituri mhumiex elenkati hawnhekk jiġu servuti minn `default.ts` bl-ese-kutur ġeneriku kompatibbli mal-OpenAI. Il-katalogu sħiħ tal-fornituri (355 fornitur) jinsab f'`src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Traduzzjoni hub-and-spoke (OpenAI hija l-bażi).

- **9 tradutturi tal-ħtiġijiet** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 tradutturi tar-risposti** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 għajnuniet** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, flimkien ma'
  testijiet tal-għajnuniet.
- **Għajnuniet tal-istampi** (`translator/image/sizeMapper.ts`).
- Fil-livell ta' fuq: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — Konvertitur tal-API Responses ↔ Chat
  Completions bbażat fuq `TransformStream` (użat minn il-`responses/` route catch-all).

### 4.5 `open-sse/services/`

Enfasi (lista sħiħa taħt `open-sse/services/`):

| Serħan                 | Fajls                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rotta kombinata        | `combo.ts` (19 strateġija), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                             |
| Magna Auto Combo       | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Reżiljenza             | `accountFallback.ts` (cooldown + lockout), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                              |
| Kwoti                  | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Keħil                  | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                     |
| Intelliġenza tar-rotta | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| IMmaniġġjar tal-mudell | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Kompresjoni            | `compression/` — Twaħħil sħiħ tal-magna tal-kompresjoni                                                                                                                                                                                           |
| Token + sessioni       | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Saff / manifest        | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP / xibka             | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Lottijiet              | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Użu                    | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 għodda unika** konnessa f'`server.ts` (45 kanonika f'`schemas/tools.ts` +
  memorja, ħiliet, ħiliet-GitHub, pool, gamifikazzjoni, plugin, Notion, Obsidian,
  korpus lokali u moduli tal-kompresjoni — unjoni magħduda permezz ta' `countUniqueMcpTools`).
- **3 trasporti**: stdio, HTTP Streamable, SSE.
- **33 skop** infurzati fil-ħin reali — lista bażika f'`src/shared/constants/mcpScopes.ts`, is-set sħiħ huwa l-unjoni tal-iskopji dikjarati minn kull modulu tal-għodda.
- Tabella tal-verifika: `mcp_tool_audit` (mimlija minn `audit.ts`).
- Fajls: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  flimkien ma' testijiet taħt `__tests__/`.
- Ara [MCP-SERVER.md](../frameworks/MCP-SERVER.md) għall-katalogu sħiħ tal-għodda.

### 4.7 `open-sse/config/`

Reġistri tal-fornituri (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), reġistri tal-mudelli skont il-format (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
għajnuniet tal-identità (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
għajnuniet tal-kredenzjali (`credentialLoader.ts`, `codexClient.ts`), u adattaturi
tal-għabra (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Primitivi ta' l-streaming u għajnuniet tal-fornitur: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Wrapper tal-Desktop

```
electron/
├── main.js                  Proċess principali Electron
├── preload.js               Pont ta' preload (contextIsolation attivat)
├── types.d.ts
├── package.json             Konfigurazzjoni ta' electron-builder, verżjoni 3.8.51
├── README.md
├── assets/                  Risorsi tal-bini (ikoni, drittijiet, …)
├── node_modules/            node_modules dedikati (better-sqlite3, electron-updater)
└── dist-electron/           Output tal-bini (mhux impenjat)
```

Ħames scripts npm fir-reġjun tax-xogħol: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. L-ġdid awtomatiku huwa permezz ta'
`electron-updater` li jimmira lejn il-feed tal-ħruġ ta' GitHub.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           Daħla ewlenija tal-CLI (Node ESM)
├── reset-password.mjs      Irrisettja l-password tal-ġestjoni mill-CLI
├── mcp-server.mjs          Mudell tal-isservizz MCP (stdio)
├── nodeRuntimeSupport.mjs  Gwardja tal-verżjoni Node
└── cli/
    ├── program.mjs         Binarju tal-programm Commander
    ├── runtime.mjs         Għajnuna withRuntime (server-ewwel/db-fallback)
    ├── output.mjs          Formattaturi tal-output (json/jsonl/table/csv)
    ├── i18n.mjs            Għajnuna t() b'lokalitajiet
    ├── api.mjs             Għajnuna fetch għall-API
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Reġistrazzjoni tal-kmandi
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (waħda għal kull kmand/grupp)
```

Żewġ binarji huma esposti fil-`package.json` → `bin`:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Direttorju                                           | Tip                                                                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `tests/unit/`                                        | Testijiet unitarji permezz ta' runners nattivi ta' Node (1821 fajl, barra sottodirettorji `api/`, `auth/`, `authz/`) |
| `tests/integration/`                                 | Testijiet intermodul + tal-istat DB                                                                                  |
| `tests/e2e/`                                         | Testijiet UI Playwright                                                                                              |
| `tests/e2e/protocol-clients.test.ts`                 | E2E tal-protokoll MCP/A2A                                                                                            |
| `tests/translator/`                                  | Testijiet speċifiċi għat-traduttur                                                                                   |
| `tests/security/`                                    | Reżistri ta' sikurezza                                                                                               |
| `tests/load/`                                        | Testijiet ta' tagħbijiet / stress                                                                                    |
| `tests/golden-set/`                                  | Outputs referenzjarji għar-reżistri tat-traduttur                                                                    |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Appoġġ                                                                                                               |

Kmandi komuni:

| Kmand                                                    | Dak li jħaddem                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| `npm run test:unit`                                      | Kull `tests/unit/*.test.ts` permezz ta' Node test runner (konkorrenza 10) |
| `npm run test:vitest`                                    | Suita Vitest (MCP, autoCombo, cache)                                      |
| `npm run test:e2e`                                       | Suita UI Playwright                                                       |
| `npm run test:protocols:e2e`                             | E2E tal-protokoll MCP + A2A                                               |
| `npm run test:coverage`                                  | Bieb tal-kopertura (≥60% linji/dikjarazzjonijiet/funzjonijiet/frok)       |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Ħarġa waħda                                                               |

---

## 8. `scripts/`

Organizzat f'6 subfolders skont l-iskop.

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

## 9. Pipeline tat-Talbiet (Sommarju)

![Pipeline tat-talbiet (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Sors: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Talbiet tal-klijent
  → /v1/chat/completions (route.ts)
     Kontroll ta' qabel CORS
     Validazzjoni Zod (chatCompletionsSchema f'shared/validation/schemas.ts)
     Awtorizzazzjoni (extractApiKey + isValidApiKey JEW requireManagementAuth)
     Magna tal-politika (src/server/authz/pipeline.ts)
     Guardrails (PII masker, prompt injection, vision bridge)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Kontroll tal-cache (semantiku + cache tal-qari)
     Limitu tar-rata (rateLimitManager, accountSemaphore)
     Routing tal-combo (jekk il-mudell jirriżolvi għal combo)
       comboResolver → loop għal kull mira → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       fetch upstream → retry/backoff permezz ta' accountFallback
     translateResponse() (open-sse/translator/response/*)
     Stream SSE JEW rispons JSON
     Jekk Responses API: TransformStream permezz ta' open-sse/transformer/responsesTransformer.ts
  → Verifika ta' konformità (src/lib/compliance/)
  → Rispons lill-klijent
```

### Stat tar-runtime tar-reżiljenza (tliet mekkaniżmi)

| Mekkaniżmu                   | Ambitu                          | Fejn                                                                                                           |
| ---------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Circuit breaker tal-fornitur | Fornitur kollu                  | `src/shared/utils/circuitBreaker.ts`, persistut f'`domain_circuit_breakers`                                    |
| Cooldown tal-konnessjoni     | Kont/ċavetta waħda              | `markAccountUnavailable()` f'`src/sse/services/auth.ts`; ikkunsmat minn `accountFallback.checkFallbackError()` |
| Lockout tal-mudell           | Fornitur + konnessjoni + mudell | `open-sse/services/accountFallback.ts`, persistut f'`domain_lockout_state`                                     |

Ara [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) u t-taqsima ddedikata f'
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Kif Tikkontribwixx

### Żid fornitur ġdid

1. Irreġistra fi `src/shared/constants/providers.ts` (validat b'Zod meta jitniżżel).
2. Żid eżekutur fi `open-sse/executors/` jekk hemm bżonn loġika personalizzata
   (estendi `BaseExecutor`).
3. Żid traduttur fi `open-sse/translator/` jekk mhuwiex jitkellem il-format OpenAI.
4. Jekk huwa bbażat fuq OAuth, żid konfigurazzjoni taħt `src/lib/oauth/providers/` u
   `src/lib/oauth/services/`.
5. Irreġistra l-mudelli fi `open-sse/config/providerRegistry.ts` (jew ir-reġistru speċifiku
   għall-format taħt `open-sse/config/`).
6. Ikteb testijiet taħt `tests/unit/`.

### Żid rotta API ġdida

1. Oħloq `src/app/api/your-route/route.ts`.
2. Segwi l-mudell: CORS → validazzjoni tal-ġisem Zod → awtentikazzjoni → delegazzjoni tal-handlir.
3. Jekk hemm forma ta' talba ġdida: żid l-isema Zod fi `src/shared/validation/schemas.ts`.
4. Jekk huwa biss għat-tħaddim: żid il-viżta lejn `src/shared/constants/publicApiRoutes.ts`
   (黑名单 għall-wiċċ API pubbliku).
5. Żid testijiet taħt `tests/unit/`.
6. Aġġorna `docs/reference/API_REFERENCE.md` u `docs/openapi.yaml`.

### Żid modulu DB ġdid

1. Oħloq `src/lib/db/yourModule.ts` u importa `getDbInstance()` minn `./core.ts`.
2. Esporta funzjonijiet CRUD għall-oġġett tad-dominju tiegħek.
3. Jekk hemm tabelli ġodda: żid migrazzjoni taħt `src/lib/db/migrations/`, numurata
   sekwenzjalment, idempotenti, u trasazjonali.
4. L-importaturi jużaw importazzjonijiet diretti minn `@/lib/db/yourModule` (bla barrel — il-qatgħa tal-esportazzjoni l-qadima `localDb.ts` ġiet tneħħija).
5. Żid testijiet taħt `tests/unit/`.

### Żid għodda MCP ġdida

1. Żid id-definizzjoni tal-għodda taħt `open-sse/mcp-server/tools/` (jew estendi
   `open-sse/mcp-server/schemas/tools.ts`).
2. Agħti l-permessi xierqa fi `src/shared/constants/mcpScopes.ts`.
3. Irreġistra l-għodda fi `open-sse/mcp-server/server.ts`.
4. Żid testijiet taħt `open-sse/mcp-server/__tests__/`.
5. Aġġorna [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Żid ħiliet A2A ġdida

Ara [A2A-SERVER.md § Adding a New Skill](../frameworks/A2A-SERVER.md). Il-ħiliet jgħixu fi
`src/lib/a2a/skills/` u ġew irreġistrati permezz tal-manager tal-ħiliet A2A.

---

## 11. Konvenzjonijiet

- **Stil tal-kodice**: indentazzjoni ta' 2 spazji, virgoletti doppji, wisa' ta' 100 karattru, punti u virgoli,
  virgoli tat-tmiem `es5` — infurzati minn Prettier permezz ta' `lint-staged`.
- **Importazzjonijiet**: estern → intern (`@/`, `@omniroute/open-sse`) → relatati.
- **Tmexxija tal-fajls**: `camelCase` jew `kebab-case`, il-komponenti `PascalCase`,
  il-kostanti `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` kullimkien;
  `no-explicit-any` = `warn` fi `open-sse/` u `tests/`, error f'ħaġa oħra.
- **TypeScript**: `strict: false` (postura ta' wirt). Ibbaza aktar fuq tipi espliċiti minn
  inferment għal limiti bejn il-moduli.
- **Database**: qatt miktub SQL frott fi rotot jew handler — dejjem għaddi permezz
  tal-moduli ta' `src/lib/db/`. Qatt import bl-effett ta' barrel — juża moduli speċifiċi ta' `src/lib/db/*` direttament.
- **Tmexxija tal-entitajiet DB (#3512)**: funzjoni li tikteb jew taqra r-rabta tal-forma ta' linja ta' tabella DB
  għandha tieħu/irritorna interfaċċja TS b'isem li tirrifletti l-kolonni tal-tabella
  1:1, mhux `any` jew tip anonimu inline fil-post tat-sejħa. Waqqaf
  l-interfaċċja ħdejn il-funzjoni (pereż. `export interface UsageEntry` fi
  `src/lib/usage/usageHistory.ts` taħt `saveRequestUsage`), żomm il-qasam
  individwali opzjonali/nullable meta differenti mimlija l-linja
  b'mod inkrementali, u prefer `unknown` minn `any` għal qasam li l-forma tiegħu
  tvarja fost dawk li jsejħu (dokumentat fil-qasam, pereż. `UsageEntry.tokens`
  jilqa' kemm l-użu mhux ipproċessat tal-fornitur u r-rabta normalizzata). Ladarba
  il-kont tal-`any` fil-fajl jasal għal żero b'dan il-mod, żidha mal-
  lista tal-permessi `check:any-budget:t11` (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`) sabiex ma tista' tkunx terġa' lura. Dan huwa konvenzjoni ta'切片 tal-ewwel — it-tindif aktar wiesa' "bla `any` anonimu" huwa iterattiv madwar il-bqija tal-
  bażi tal-kodice.
- **Aniħar**: try/catch b'tipi speċifiċi ta' żbalji, log ma' kontest ta' pino. Qatt
  b'mod silenzjuż żbalji fil-korrenti SSE; uża sinjali ta' tħassir għat-tindif.
- **Sigurtà**: qatt juża `eval()` / `new Function()` / eval impliċit. Validazzjoni
  tal-inputs kollha b'Zod. Enkriptazzjoni tal-kredenzjali fil-post (AES-256-GCM). Żomm
  `src/shared/constants/upstreamHeaders.ts`黑名单 allinjata mal-
  saff tat-tindif/validazzjoni.
- **Kummiti**: Kummiti Konvenzjonali — `feat(scope): subject`. Scopes permessi:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Fergħat**: iċċaffer `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Qatt tagħmel kummit direttament lejn `main`.
- **Husky**: qabel il-kummit jingħata `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; qabel il-pixxina jingħata `check:any-budget:t11` + `check:tracked-artifacts` (porti mgħaġġla; jeskludi `test:unit`).

## 12. Regoli Stretti (minn CLAUDE.md)

1. Qatt tikkmanda sigrieti jew kredenzjali.
2. Qatt tagħmel import baril — uża b'mod speċifiku l-moduli `src/lib/db/*` direttament.
3. Qatt tuża `eval()` / `new Function()` / eval impliċit.
4. Qatt tagħmel kommit diretta għal `main`.
5. Qatt tikteb SQL fraw fil-rotot — dejjem għaddi permezz tal-moduli `src/lib/db/`.
6. Qatt ittina errori b'ssieqhom fil-korrenti SSE.
7. Dejjem validja d-dħul bis-schemas ta' Zod.
8. Dejlem inklużi test meta tbiddel il-kodiċi tal-produzzjoni.
9. Il-kopertura trid tibqa' ≥ 60% (dikjarazzjonijiet, linji, funzjonijetti, frontieri).

---

## 13. Ara wkoll

- [ARCHITECTURE.md](./ARCHITECTURE.md) — l-arkitettura ta' livell għoli u r-responsabbiltajiet tal-moduli.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — referenza għall-API pubblika + ta' ġestjoni.
- [FEATURES.md](../guides/FEATURES.md) - matriċi tal-karatteristiċi u highlights tal-verżjonijiet.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — dfin fil-fond ta' l-isaffar tal-ċirkuwit, il-ħin ta' mistrieħ, u l-blokk.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — skoring u strateġiji tal-Auto Combo.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — katalogu sħiħ ta' għodod MCP + trasporti.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — għarfien u għarfien tal-protokoll A2A.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — xogħol RTK + xogħol tal-Kavman.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — integrazzjonijiet CLI.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (jekk preżenti), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — miri ta' manipulazzjoni.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — problemi operazzjonali komuni.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — workflow tal-kontributur.
- [CLAUDE.md](../../CLAUDE.md) - regoli tal-repo għal Claude Code (is-sors tal-verità għal ħafna mill-konvenzjonijiet ta' hawn fuq).
- [AGENTS.md](../../AGENTS.md) - referenza tal-arkitettura aktar fil-fond magħmula mill-aġenti.
