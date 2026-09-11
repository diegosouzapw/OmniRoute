# CODEBASE_DOCUMENTATION (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇪 [ga](../../../ga/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇷 [hr](../../../hr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇹 [lt](../../../lt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇻 [lv](../../../lv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇹 [mt](../../../mt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇮 [sl](../../../sl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇸 [sr](../../../sr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "OmniRoute koodivaramu dokumentatsioon"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute koodivaramu dokumentatsioon

> **Versioon:** v3.8.51
> **Viimati uuendatud:** 2026-06-28
> **Sihtgrupp:** Insenerid, kes aitavad kaasa OmniRoute'le või ehitavad selle peale integratsioone.
>
> Ülevaatlike arhitektuuridiagrammide ja iga alamsüsteemi taga oleva põhjenduse kohta lugege
> [ARCHITECTURE.md](./ARCHITECTURE.md). Üksikasjalike sukeldumiste kohta üksikute alamsüsteemide
> (Auto Combo, MCP server, A2A server, Skills, Memory, Cloud Agents, Resilience,
> Compression jne) kohta vaadake nende pühendatud faile selles `docs/` kataloogis.

See kirjeldab **praegu hoidlas olevat**, et uus insener saaks
puu sirvida, käitamiskihte mõista ja teada, kuhu koodi lisada, ilma uusi mooduleid leiutamata.

---

## 1. Tehnoloogiate kogum

| Mure           | Valik                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Veebiraamistik | **Next.js 16** (App Router, eraldiseisev väljund, ilma globaalse vahetarkvarata)                                            |
| Keel           | **TypeScript 6.0+** — määrake `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                      |
| Käitusaeg      | **Node.js** `>=22.22.2 <23` või `>=24.0.0 <27` (sunditud `engines` + `SUPPORTED_NODE_RANGE` kaudu)                          |
| Andmebaas      | **SQLite** läbi `better-sqlite3` (singleton, WAL logimine)                                                                  |
| Töölaud        | **Electron 41** + `electron-builder` 26.10 (eraldiseisev tööruum `electron/` kataloogis)                                    |
| Testid         | **Node'i kohalik testija** (üksik/integreerimine), **Vitest** (MCP, autoCombo, cache), **Playwright** (e2e + protocols-e2e) |
| Ehitamine      | Next.js eraldiseisev läbi `scripts/build/build-next-isolated.mjs`                                                           |
| Lint/vormindus | ESLint lame konfiguratsioon + Prettier (`lint-staged` läbi Husky pre-commit)                                                |
| Moodulisüsteem | ESM kõikjal (`"type": "module"`)                                                                                            |
| Tööruumid      | npm tööruum — `open-sse` on ainus alam-tööruum                                                                              |

Tee aliased (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Vaikimisi HTTP port: **`20128`** (API ja armatuurlaud jagavad sama protsessi). Andmekataloog on `DATA_DIR` keskkonnamuutuja, vaikimisi `~/.omniroute/`.

---

## 2. Hoidla paigutus

```
OmniRoute/
├── src/                  Next.js rakendus (App Router, libs, domeen, server, jagatud)
├── open-sse/             Voogmootori tööruum (@omniroute/open-sse)
├── electron/             Töölaud mähis (Electron 41 peamine + preload)
├── bin/                  CLI sisenemispunktid (omniroute, reset-password)
├── tests/                Üksik, integreerimine, e2e, protocols-e2e, tõlkija, turvalisus, testandmed
├── scripts/              Ehituse, sünkroonimise, kontrolli, migratsiooni ja käitamise abiskriptid
├── docs/                 Avalik dokumentatsioon (see kataloog)
├── public/               Staatsed ressursid, PWA manifest, teenindustöötaja
├── config/               Käitamise konfiguratsiooni näidised
├── images/                Turundus/kuvatõmmised
├── _ideia/, _references/, _mono_repo/, _tasks/   Sisemised mustandid / planeerimine (pole tarnitud)
├── CLAUDE.md             Hoidla reeglid Claude Code'ile
├── AGENTS.md             Sügavam arhitektuuriviide agentidele
├── package.json          v3.8.51, tööruumi juur
└── tsconfig.json         Tee aliased + tuuma kompiileri valikud
```

---

## 3. `src/` — Next.js rakendus

```
src/
├── app/                  App Router lehed + API marsruudid
├── lib/                  Põhiraamatukogud (DB, autentimine, OAuth, oskused, mälu, …)
├── domain/               Puhas domeenikiht (poliitika, taganemiskulud, lukustamine, …)
├── server/               Ainult serveri moodulid (autentimisõigus, cors, autentimine)
├── shared/               Tüübid, konstandid, valideerimine, lepingud, tööriistad (piiriülesed ohutud)
├── mitm/                 Man-in-the-middle proksi abimehed CLI integreerimiseks
├── models/               Kohaliku mudeli metaandmed / aliased
├── sse/                  Vananenud SSE käsitlejad, mis asuvad veel src/ all (mitte open-sse/)
├── store/                Kliendi poole oleku hoidlad
├── middleware/           Marsruuditaseme vahelutiliidi abid (mitte Next.js globaalne vahelüli)
├── scripts/              Koodipuus skriptid, mida rakenduskood saab importida
├── types/                Ambientsed ja ühis TypeScript tüübid
├── i18n/                 Keelte pakid
├── instrumentation.ts    Next.js instrumenteerimise konks
├── instrumentation-node.ts
└── proxy.ts              Tasetaseme proksi käivitusabi
```

### 3.1 `src/app/` — App Router

App Router avab nii töölaudade kasutajaliidse kui ka avaliku/hooldus HTTP API.
**Puudub globaalne vahelüli** — interceptorid töötavad marsruudipõhiselt.

Tasetaseme segmendid `src/app/` all:

| Tee                                                                           | Otstarve                                                   |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `api/`                                                                        | Kõik HTTP API marsruudid (vaata allolevat üksikasja)       |
| `a2a/`                                                                        | A2A JSON-RPC 2.0 lõpp-punkt (`POST /a2a`)                  |
| `.well-known/agent.json/`                                                     | A2A Agent Card avastamisdokument                           |
| `(dashboard)/`                                                                | Töölaua kasutajaliides (marsruutide grupp, URL prefiksita) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Autentimise voolud                                         |
| `landing/`                                                                    | Turundusleht                                               |
| `docs/`                                                                       | Manustatud API dokumentatsiooni vaatur                     |
| `status/`, `maintenance/`, `offline/`                                         | Töölehelugev lehed                                         |
| `privacy/`, `terms/`                                                          | Õiguslikud lehed                                           |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Staatilised vealehed                                       |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Raamistiku vea/laadimise piirid                            |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Juurpraegune kest                                          |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — Kasutajaliide lehed

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, lisaks juur `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — Tasetaseme API grupid

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
├── services/   Manustatud teenuste haldus (9router, cliproxy) — AINULT KOHALEND
├── upstream-proxy/
├── usage/
├── v1/         OpenAI ühilduv avalik API
├── v1beta/     Gemini-stiilis ühilduvus
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Manustatud teenuste haldus

Marsruudid 9Routeri ja CLIProxyAPI installimiseks, käivitamiseks, peatamiseks ja jälgimiseks.
Kõik teed on klassifitseeritud **AINULT KOHALEND** (tagasiside ainult, range reegel #17), sest need
võivad kutsuda `npm install` ja käivitada tütarprotsesse.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             getOrInitSupervisor() abifunksioon
│   ├── install/route.ts    POST — npm install läbi execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install uuemat versiooni
│   ├── rotate-key/route.ts POST — genereeri uus API võti + taaskäivita
│   ├── status/route.ts     GET  — reaalajas + DB olek + versiooni metaandmed
│   └── auto-start/route.ts POST — lülitab auto_start lippu
├── cliproxy/
│   ├── _lib.ts             getOrInitSupervisor() abifunksioon
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install uuemat versiooni
│   ├── status/route.ts     GET  — reaalajas + DB olek + versiooni metaandmed
│   └── auto-start/route.ts POST — lülitab auto_start lippu
└── [name]/
    └── logs/route.ts       GET  — SSE logide jälgimine (jagatud kõigi teenustega)
```

Vastav töölaudade kasutajaliides:
`src/app/(dashboard)/dashboard/providers/services/` — kahe vahelehega leht (CLIProxyAPI + 9Router).
Pöördproksi 9Router manustatud kasutajaliidesele:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Süvauuring: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — OpenAI ühilduv avalik API

```
v1/
├── accounts/[id]/                       konto otsing
├── agents/tasks/[id]/, agents/tasks/    A2A-stiilis töö lõpp-punktid
├── api/                                 sisemised API abid v1/api all
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      OpenAI Batches API
├── chat/completions/                    Vestluse lõpuleviimised (peamine lõpp-punkt)
├── completions/                         Teksti lõpuleviimised
├── embeddings/                         Embeddings
├── files/[id]/, files/                  Failide API
├── _helpers/                            Jagatud marsruudi abid (avaliku URL-ita)
├── images/{edits, generations}/         Pildi genereerimine + muutmine
├── issues/                              Triaaž abi lõpp-punktid
├── management/{proxies}/                Haldusega seotud marsruudid v1 sees
├── messages/{count_tokens}/             Anthropic-stiilis sõnumite ühilduvus
├── models/                              Mudeli loetelu (`route.ts`, `catalog.ts`)
├── moderations/                         Moderatsioon
├── music/                               Muusika genereerimine
├── providers/[provider]/                Pakkuja kohta toimingud
├── quotas/{check}                       Kvootide katsed
├── registered-keys/                     Registreeritud võtmete haldus
├── rerank/                              Ümberjärjestamine
├── responses/[...path]/                 OpenAI Responses API (catch-all)
├── search/                              Veebiotsing
├── videos/                              Video genereerimine
├── ws/                                  WebSocket sild
└── route.ts                             Indeksikäsitseja
```

Iga marsruudifail järgib sama mustrit:

```
Marsruut → CORS eelkontroll → Zod keha valideerimine → valikuline autentimine
      → API võtme poliitika kehtestamine → käsitseja delegeerimine (open-sse)
```

`v1beta/` on Gemini-stiilis ühilduv pinna (õhuke mähis, mis tõlgib samasse
`open-sse/handlers/` torustikku).

### 3.2 `src/lib/` — Põhiraamatukogud

Impordi andmeid, sünkroonimist, OAuth, oskusi, mälu jne alati nende moodulite kaudu. Tabel
rühmitab tegelikud kataloogid ja märkimisväärsed tasetaseme failid.

| Moodul            | Otstarve                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | A2A protokolli server: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 oskust: kuluanalüüs, tervisearuanne, pakkujate avastamine, kvootide haldus, nutikas marsruutimine, oskuste loetelu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `acp/`            | Agent-Control-Protocol: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `api/`            | Sisemised API abid: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `auth/`           | `managementPassword.ts` (parooli lähtestamine / räsi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `batches/`        | OpenAI Batches API teenus (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `catalog/`        | OpenRouter kataloogi sünkroonimine (`openRouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `cloudAgent/`     | Pilveagentide register: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `combos/`         | Kombo lahendamise abid                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `compliance/`     | Auditi ja pakkuja audit: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `config/`         | Jookseva konfiguratsiooni liimikaine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `db/`             | SQLite domeenimoodulid (vaata §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `display/`        | Kasutajaliidese/kuvamise abid, mida kasutavad API vastused                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `embeddings/`     | Embedding teenuste register                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `env/`            | Keskkonna laadimine + introspektsioon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `evals/`          | Hindamise tööaeg                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `jobs/`           | Taustatööd (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `memory/`         | Püsiv mälu: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `oauth/`          | OAuth/import pakkujate moodulid (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed`, lisaks `services/`, `utils/` ja `constants/oauth.ts`                                                                                                                                                                                                                                                                                                                                    |
| `plugins/`        | Pistikprogrammide laadija (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `providerModels/` | Haldate mudeli elutsükli: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `providers/`      | Pakkujate abid: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `resilience/`     | `settings.ts` — seaded vooluringilülituse, jahtumise, lukustamise jaoks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `runtime/`        | Jooksva aja funktsioonide tuvastamine                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `services/`       | Manustatud teenuste raamistik: `ServiceSupervisor.ts` (üldine tütarprotsesside juht töö lukustusega, rõngaspuhveriga, tervisekontrolliga), `bootstrap.ts` (protsessitase register ja automaatne käivitamine), `registry.ts` (tööriist → juhi vaste), `apiKey.ts` (AES-256-GCM võtme hoidla), `modelSync.ts` (perioodiline mudelite sünkroonimine), `ringBuffer.ts` (5 MB rõngaslogi puhver), `healthCheck.ts` (HTTP tervisekatse), `types.ts`, `embedWsProxy.ts` (WebSocket proksi), `installers/{ninerouter,cliproxy}.ts`. Vaata `docs/frameworks/EMBEDDED-SERVICES.md`                                                                                                                             |
| `agentSkills/`    | Agentide oskuste kataloog + generaator: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → kirjutab `skills/{id}/SKILL.md`), `openapiParser.ts` (võtab REST lõpp-punktid OpenAPI spetsist välja), `cliRegistryParser.ts` (võtab CLI alamkäsud bin/cli-registry-st välja), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Kasutavad REST marsruudid (`/api/agent-skills/*`), MCP tööriistad (`omniroute_agent_skills_*`) ja A2A oskuse `list-capabilities`. Vaata [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Oskuste raamistik: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, lisaks `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `spend/`          | `batchWriter.ts` (mahakandmise puhver)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sync/`           | `bundle.ts`, `tokens.ts` (Pilve sünkroonimine)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `system/`         | Süsteemitaseme abid                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `translator/`     | Tasetaseme tõlgi liimikaine (delegeerib `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `usage/`          | Kasutuse arvestus: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `versionManager/` | Automaatne värskendamine + versiooni manifest                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ws/`             | WebSocket sild                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `zed-oauth/`      | Zed redaktori OAuth vool                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Tasetaseme failid `src/lib/` all:

- Vana `localDb.ts` barrel eemaldati — tarbijad impordivad konkreetseid `src/lib/db/*` mooduleid otse.
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

Üksik SQLite andmebaas (`getDbInstance()` `core.ts`–s, WAL päevikustamine).
**Kirjuta kunagi marsruutides ega käsitsejates tooret SQL** — kasuta neid mooduleid.

![Andmebaasi skeemi ülevaade (valitud põhitabelid)](../diagrams/exported/db-schema-overview.svg)

> Allikas: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Domeenimoodulid (iga omab ühte või mitut tabelit): `apiKeys.ts`, `backup.ts`,
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

`migrations/` sisaldab 168 versioneeritud `.sql` faili (idempotentne, tehinguline) ja käivitub
`migrationRunner.ts` poolt käivitamisel.

Migratsioonide kaudu loodud tabelid (kokku 123):

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
`webhooks` (lisaks FTS5 virtuaaltabelid mälu otsinguks).

### 3.3 `src/domain/` — Domeenikiht

Puhas äriloogika, ilma I/O-ta. Imporditakse marsruutide ja käsitsejate poolt.

| Fail                                       | Otstarve                                                   |
| ------------------------------------------ | ---------------------------------------------------------- |
| `policyEngine.ts`                          | Tasetaseme poliitika lahendaja                             |
| `fallbackPolicy.ts`                        | Taganemise otsustepuu                                      |
| `costRules.ts`                             | Kuluarvutuse reeglid                                       |
| `lockoutPolicy.ts`                         | Mudelite lukustamise otsused                               |
| `tagRouter.ts`                             | Siltidel põhinev marsruutimine                             |
| `comboResolver.ts`                         | Kombo lahendamine päringust → sihtmärgi nimekirja          |
| `connectionModelRules.ts`                  | Ühenduspõhised mudeli filtrid                              |
| `modelAvailability.ts`                     | Mudeli kättesaadavuse kontroll                             |
| `degradation.ts`                           | Halvenenud režiimi üleminekud                              |
| `providerExpiration.ts`                    | Aegunud konto/võtme tuvastamine                            |
| `quotaCache.ts`                            | Küpsised kvootide otsused                                  |
| `responses.ts`, `omnirouteResponseMeta.ts` | Vastuse kujundite abid                                     |
| `configAudit.ts`                           | Konfiguratsioonimuudatuste audit                           |
| `assessment/`                              | Mudelite hindamine (vastavalt RFC-le, osaliselt teostatud) |
| `types.ts`                                 | Jagatud domeenitüübid                                      |

### 3.4 `src/server/` — Ainult server

Ei saa importida klientide komponentidest.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Klassifitseerib marsruudid avalikuks vs halduseks
│   ├── assertAuth.ts      Kinnitusabi
│   ├── context.ts         Päringukeskne autentimisõiguse kontekst
│   ├── headers.ts
│   ├── pipeline.ts        Autentimisõiguste torustik
│   ├── policies/          Konkreetsed poliitikad
│   └── types.ts
└── cors/origins.ts        CORS päritolude lubatud nimekiri
```

### 3.5 `src/shared/` — Jagamiseks ohutu

Jaotatud keskendunud alamkataloogidesse:

- `constants/` — `providers.ts` (Zodiga valideeritud pakkujate kataloog), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts` (keelunimekiri), `mcpScopes.ts`,
  `errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
  `bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
  `sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 Zod skeemi), `compressionConfigSchemas.ts`,
  `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — avaliku API lepingud, mida tarnitakse npm-i.
- `types/` — jagatud TypeScript tüübid.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`, `cloud.ts`, `cn.ts`,
  `cors.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts`, lisaks töölaua konksud/komponendid `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/` all.

---

## 4. `open-sse/` — Voogude mootori tööruum

Eraldi npm tööruum, avaldatud kui `@omniroute/open-sse`. Vastutab
päringu töötlemise, käivitajate, tõlkijate, teenuste, teisendaja ja MCP serveri eest.

```
open-sse/
├── index.ts                Avalikud ekspordid
├── package.json            Tööruumi manifest
├── tsconfig.json
├── types.d.ts
├── config/                 Pakkuja registrid, päiseprofiilid, identiteet, …
├── handlers/               Päringu käsitlejad (chat, embeddings, audio, image, …)
├── executors/              108 pakkuja-spetsiifilist HTTP käivitajat
├── translator/             Vormingute teisendamine (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Responses API ↔ Chat Completions voo teisendaja
├── services/               80+ teenust moodulit (kombod, asenduskäsitlus, kvoodid, identiteet, …)
├── utils/                  Voo abivahendid, TLS klient, AWS SigV4, proksi fetch, …
└── mcp-server/             MCP server (3 transporti, 33 skooppi, 110 tööriista)
```

### 4.1 `open-sse/handlers/`

| Käsitleja               | Eesmärk                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `chatCore.ts`           | Põhiline vestlusring (vahemälu, kiirusepiirang, kombineeritud marsruutimine, käivitaja suunamine) |
| `responsesHandler.ts`   | OpenAI Responses API sisenemispunkt                                                               |
| `embeddings.ts`         | Poogid                                                                                            |
| `imageGeneration.ts`    | Pildi genereerimine                                                                               |
| `audioSpeech.ts`        | Tekstiks kõneks                                                                                   |
| `audioTranscription.ts` | Kõneks tekstiks                                                                                   |
| `videoGeneration.ts`    | Video genereerimine                                                                               |
| `musicGeneration.ts`    | Muusika genereerimine                                                                             |
| `rerank.ts`             | Ümberjärjestamine                                                                                 |
| `moderations.ts`        | Modereerimine                                                                                     |
| `search.ts`             | Veebiotsing                                                                                       |
| `sseParser.ts`          | SSE sündmuste parser                                                                              |
| `usageExtractor.ts`     | Tokkide arvude väljatõmbmine ülemvoolu voogudest                                                  |
| `responseSanitizer.ts`  | Pakkuja-spetsiifilise müra eemaldamine                                                            |
| `responseTranslator.ts` | Pakkuja vastuse ja tõlkija kihi liim                                                              |

### 4.2 `open-sse/executors/`

108 pakkuja käivitajat, igaüks laiendades `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop`, lisaks `claudeIdentity.ts`
(jagatud identiteedi abivahend) ja `index.ts` (register).

> Märkus: siin loetlemata pakkujaid teenindab `default.ts`, kasutades üldist
> OpenAI-ühilduvat käivitajat. Täielik pakkuja kataloog (355 pakkuja) asub
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Tigu ja kiire tõlge (OpenAI on keskne).

- **9 päringu tõlkijat** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 vastuse tõlkijat** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 abivahendit** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, lisaks
  abivahendite testid.
- **Pildi abivahendid** (`translator/image/sizeMapper.ts`).
- Ülemisel tasemel: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — `TransformStream`-il põhinev Responses API ↔ Chat
  Completions teisendaja (kasutatakse `responses/` marsruuti kõigihõive puhul).

### 4.5 `open-sse/services/`

Esiletõstud (täielik nimekiri asub `open-sse/services/`):

| Teema                           | Failud                                                                                                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kombineeritud marsruutimine     | `combo.ts` (19 strateegiat), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                            |
| Automaatne kombineeritud mootor | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Vastupidavus                    | `accountFallback.ts` (jahutus + lukustus), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                              |
| Kvoodid                         | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Vahemälu                        | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                     |
| Marsruutimise intelligents      | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| Mudelite käsitlus               | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Tihendamine                     | `compression/` — tihendamismootori täielik juhtmestik                                                                                                                                                                                             |
| Tokkid + seanss                 | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Liik / manifest                 | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP / võrk                       | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Partiid                         | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Kasutus                         | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 unikaalset tööriista** ühendatud `server.ts` (45 kanonilist `schemas/tools.ts` +
  mälu, oskused, GitHub-oskused, bassein, gamifitseerimine, pistikprogramm, Notion, Obsidian,
  kohalik korpus ja tihendamismoodulid — üheloend, mida loendab `countUniqueMcpTools`).
- **3 transporti**: stdio, HTTP voogedastatav, SSE.
- **33 skooppi** kehtestatakse jooksvalt — baasloend `src/shared/constants/mcpScopes.ts`, täielik komplekt on iga tööriistamooduli poolt deklareeritud skoopide üheloend.
- Auditi tabel: `mcp_tool_audit` (täidetud `audit.ts` poolt).
- Failid: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  lisaks testid `__tests__/` all.
- Vaata [MCP-SERVER.md](../frameworks/MCP-SERVER.md) täieliku tööriistade kataloogi jaoks.

### 4.7 `open-sse/config/`

Pakkuja registrid (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), vormingupõhised mudeliregistrid (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
identiteedi abivahendid (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
mandaadi abivahendid (`credentialLoader.ts`, `codexClient.ts`) ja pilve
adapterid (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Vooprimitiivid ja pakkuja abivahendid: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

## 5. `electron/` — Töölaua kate

```
electron/
├── main.js                  Electron peaprotsess
├── preload.js               Eellaadimise sild (contextIsolation lubatud)
├── types.d.ts
├── package.json             electron-builder konfiguratsioon, versioon 3.8.51
├── README.md
├── assets/                  Ehitusressursid (ikoonid, õigused, …)
├── node_modules/            Eraldi node_modules (better-sqlite3, electron-updater)
└── dist-electron/           Ehitusväljund (pole kommenteeritud)
```

Juurkaustas on viis npm-skripti: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Automaatne uuendus toimub
`electron-updater` abil, mis osutab GitHub'i väljalaskete voogu.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           Põhiline CLI sissepääs (Node ESM)
├── reset-password.mjs      Lähtestage haldusparool käsurealt
├── mcp-server.mjs          MCP serveri käivitaja (stdio)
├── nodeRuntimeSupport.mjs  Node versiooni valvur
└── cli/
    ├── program.mjs         Commander programmi koostaja
    ├── runtime.mjs         withRuntime abifunktsioon (server-esimene/db-varuvariant)
    ├── output.mjs          Vormindajad (json/jsonl/table/csv)
    ├── i18n.mjs            t() abifunktsioon keelelocustega
    ├── api.mjs             API päringu abifunktsioon
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Käskude registreerimine
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (üks fail käsu/grupi kohta)
```

`package.json` → `bin` esitatakse kaks binaarfaili:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Kataloog                                             | tüüp                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `tests/unit/`                                        | Ühiktestid Node'i pärandite testijooksjaga (1821 faili, pluss `api/`, `auth/`, `authz/` alamkataloogid) |
| `tests/integration/`                                 | Ristmooduli + DB-oleku testid                                                                           |
| `tests/e2e/`                                         | Playwright kasutajaliidese testid                                                                       |
| `tests/e2e/protocol-clients.test.ts`                 | MCP/A2A protokolli e2e                                                                                  |
| `tests/translator/`                                  | Tõlkija-spetsiifilised testid                                                                           |
| `tests/security/`                                    | Turvaregressioonid                                                                                      |
| `tests/load/`                                        | Koormus / stressitestid                                                                                 |
| `tests/golden-set/`                                  | Tõlkija regressioonide võrdlusväljundid                                                                 |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Toetavad ressursid                                                                                      |

Üldised käsud:

| Käsk                                                     | Mida see käivitab                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| `npm run test:unit`                                      | Kõik `tests/unit/*.test.ts` Node'i testijooksjaga (paralleelsus 10) |
| `npm run test:vitest`                                    | Vitest komplekt (MCP, autoCombo, cache)                             |
| `npm run test:e2e`                                       | Playwright kasutajaliidese komplekt                                 |
| `npm run test:protocols:e2e`                             | MCP + A2A protokolli e2e                                            |
| `npm run test:coverage`                                  | Katvuse värav (≥60% ridu/lauseid/funktsioone/harusid)               |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Üksiku faili käivitamine                                            |

---

## 8. `scripts/`

Organiseeritud 6 alamkataloogi järgi otstarvet.

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

## 9. Päringu toru (kokkuvõte)

![Päringu toru (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Allikas: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Kliendi päring
  → /v1/chat/completions (route.ts)
     CORS preflight kontroll
     Zod valideerimine (chatCompletionsSchema jagatud/validation/schemas.ts)
     Autentimine (extractApiKey + isValidApiKey VÕI requireManagementAuth)
     Poliitika mootor (src/server/authz/pipeline.ts)
     Kaitsepiirded (PII masker, prompt injection, vision bridge)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Puhvri kontroll (semantiline + lugemise puhver)
     Sageduse piirang (rateLimitManager, accountSemaphore)
     Combo suunamine (kui mudel lahendatakse combo'ks)
       comboResolver → tsükkel iga sihtmärgi kohta → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       päripäring ülesvoolu → korduskatse/taganemine accountFallbacki kaudu
     translateResponse() (open-sse/translator/response/*)
     SSE voog VÕI JSON vastus
     Kui Responses API: TransformStream open-sse/transformer/responsesTransformer.ts kaudu
  → Vastavuse audit (src/lib/compliance/)
  → Vastus kliendile
```

### Vastupidavuse jooksev olek (kolm mehhanismi)

| Mehhanism                     | Ulatus                    | Asukoht                                                                                                      |
| ----------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Tarnija vooluringi katkestaja | Terve tarnija             | `src/shared/utils/circuitBreaker.ts`, säilitatud `domain_circuit_breakers` tabelis                           |
| Ühenduse jahtumisaeg          | Üks konto/võti            | `markAccountUnavailable()` failis `src/sse/services/auth.ts`; kasutab `accountFallback.checkFallbackError()` |
| Mudeli blokeering             | Tarnija + ühendus + mudel | `open-sse/services/accountFallback.ts`, säilitatud `domain_lockout_state` tabelis                            |

Vaata [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) ja pühendatud jaotist
[CLAUDE.md](../../CLAUDE.md) failis.

---

## 10. Kuidas panustada

### Uue tarnija lisamine

1. Registreeri tarnija `src/shared/constants/providers.ts` (Zod-valideerimine laadimisel).
2. Lisa teostaja `open-sse/executors/`, kui on vaja kohandatud loogikat
   (laienda `BaseExecutor`).
3. Lisa tõlki `open-sse/translator/`, kui see ei räägi OpenAI formaati.
4. Kui põhineb OAuth-l, lisa konfiguratsioon `src/lib/oauth/providers/` alla ja
   `src/lib/oauth/services/`.
5. Registreeri mudelid `open-sse/config/providerRegistry.ts` (või vormispetsiifiline
   registri `open-sse/config/` all).
6. Kirjuta testid `tests/unit/` alla.

### Uue API marsruudi lisamine

1. Loo `src/app/api/your-route/route.ts`.
2. Järgi mustrit: CORS → Zod keha valideerimine → autentimine → käsitseja delegeerimine.
3. Kui uus päringu kuju: lisa Zod skeem `src/shared/validation/schemas.ts`.
4. Kui ainult halduslik: lisa tee `src/shared/constants/publicApiRoutes.ts`
   (keelunimekiri avaliku API pinna jaoks).
5. Lisa testid `tests/unit/` alla.
6. Uuenda `docs/reference/API_REFERENCE.md` ja `docs/openapi.yaml`.

### Uue DB mooduli lisamine

1. Loo `src/lib/db/yourModule.ts` ja impordi `getDbInstance()`Failist `./core.ts`.
2. Ekspordi CRUD funktsioonid oma domeenile.
3. Kui uued tabelid: lisa migratsioon `src/lib/db/migrations/`, järjestatult
   nummerdatud, idempotentne, transaktsiooniline.
4. Importijad kasutavad otseseid importe `@/lib/db/yourModule` (mitte barrel – vana `localDb.ts` re-ekspordikiht on eemaldatud).
5. Lisa testid `tests/unit/` alla.

### Uue MCP tööriista lisamine

1. Lisa tööriista määratlus `open-sse/mcp-server/tools/` alla (või laienda
   `open-sse/mcp-server/schemas/tools.ts`).
2. Määra vastav(at) ulatused `src/shared/constants/mcpScopes.ts`.
3. Registreeri tööriist `open-sse/mcp-server/server.ts`.
4. Lisa testid `open-sse/mcp-server/__tests__/` alla.
5. Uuenda [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Uue A2A oskuse lisamine

Vaata [A2A-SERVER.md § Uue oskuse lisamine](../frameworks/A2A-SERVER.md). Oskused asuvad
`src/lib/a2a/skills/` ja registreeritakse A2A ülesannete halduri kaudu.

---

## 11. Konventsioonid

- **Koodistiil**: 2-tühiku sisesed, topelt jutumärgid, 100 märgi laius, semikoolonid,
  `es5` järelolevad kriipsud – kehtestatud Prettieri poolt `lint-staged` kaudu.
- **Impordid**: välised → sisemised (`@/`, `@omniroute/open-sse`) → suhtelised.
- **Nimetusolemine**: failid `camelCase` või `kebab-case`, komponendid `PascalCase`,
  konstandid `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` kõikjal;
  `no-explicit-any` = `warn` `open-sse/` ja `tests/`, mujal error.
- **TypeScript**: `strict: false` (pärandatud positsioon). Eelista selgeid tüüpe
  inferentsile ristmooduli piiridel.
- **Andmebaas**: ei tohi kirjata toor SQL-i marsruutides ega käsitsejates – alati läbi
  `src/lib/db/` moodulite. Mitte kunagi barrel-import – kasuta konkreetseid `src/lib/db/*` mooduleid otse.
- **DB-üksuse tüüpimine (#3512)**: funktsioon, mis kirjutab või loeb DB tabeli
  rea kuju, peaks võtma/tagastama nimega TS liidese, mis peegeldab selle tabeli
  veerge 1:1, mitte `any` või kohalikku anonüümset tüüpi kutsel. Paiguta
  liide funktsiooni kõrvale (nt. `export interface UsageEntry`_failis
  `src/lib/usage/usageHistory.ts` enne `saveRequestUsage`), hoia üksikuid
  välju valikuliste/mittevigastatuna, kui erinevad kirjutajad täidavad rida
  järk-järgult, ja eelista `unknown` `any` asemel välja jaoks, mille kuju
  erineb kutsujate vahel (dokumenteeritud väljal, nt. `UsageEntry.tokens`
  aktsepteerib nii toor tarnija kujundust kui ka normaliseeritud kujundit). Kui
  faili `any` loenduri jõuab nulli, lisa see
  `check:any-budget:t11` lubatud nimekirja (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`), et see ei saaks tagasi areneda. See on esialgne konventsioon –
  laiem "anonüümse `any` mittekasutamine" puhtustamine on iteratiivne ülejäänud
  koodibaasi.
- **Vead**: try/catch konkreetsete veatüüpidega, logi pino kontekstiga. Mitte kunagi
  neelata vaikides vigu SSE vooludes; kasusta abort signaale puhastamiseks.
- **Turvalisus**: mitte kunagi kasuta `eval()` / `new Function()` / kaudset eval. Valideeri
  kõiki sisendeid Zodiga. Krüpteeri mandaadid puhkeseisundis (AES-256-GCM). Hoia
  `src/shared/constants/upstreamHeaders.ts` keelunimekiri ühilduvaks
  puhastus/valideerimiskihiga.
- **Kommid**: Conventional Commits – `feat(scope): teema`. Lubatud ulatused:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Harud**: prefiksid `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Mitte kunagi kommi otse `main`.
- **Husky**: pre-commit käivitab `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; pre-push käivitab `check:any-budget:t11` + `check:tracked-artifacts` (kiired väravad; välistab `test:unit`).

---

## 12. Ranged reeglid (CLAUDE.md-st)

1. Ära pühenda kunagi saladusi ega volikirju.
2. Ära tee kunagi barrel-importi – kasuta konkreetseid `src/lib/db/*` mooduleid otse.
3. Ära kasuta kunagi `eval()` / `new Function()` / kaudset eval-i.
4. Ära pühenda kunagi otse `main` haru.
5. Ära kirjuta kunagi otse SQL-i marsruutides – kasuta alati `src/lib/db/` mooduleid.
6. Ära neela kunagi vaikides vigu SSE voogudes.
7. Valideeri alati sisendid Zod skeemide abil.
8. Lisa alati testid tootekoodi muutmisel.
9. Katvus peab jääma ≥ 60% (lausete, ridade, funktsioonide, harude osas).

---

## 13. Vaata ka

- [ARCHITECTURE.md](./ARCHITECTURE.md) – üldehitus ja moodulite vastutus.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) – avalik + haldus API viide.
- [FEATURES.md](../guides/FEATURES.md) – funktsioonide maatriks ja versioonide esiletõstud.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) – vooluringi katkestaja, jahtumisaeg, lukustamise süvauuring.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) – Auto Combo skoorimine ja strateegiad.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) – täielik MCP tööriistade kataloog + transpordid.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) – A2A protokolli oskused ja avastamine.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) – RTK + Caveman tihendus.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) – CLI integratsioonid.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (kui olemas), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) – deployeerimise sihtkohad.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) – tavalised tööprobleemid.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) – toetaja töövoog.
- [CLAUDE.md](../../CLAUDE.md) – Claude Code’i reeglid (paljude ülalnimetatud tavade allikas).
- [AGENTS.md](../../AGENTS.md) – agentide kasutatav sügavam arhitektuuriviide.
