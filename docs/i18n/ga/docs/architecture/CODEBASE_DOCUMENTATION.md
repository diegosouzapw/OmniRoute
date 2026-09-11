# CODEBASE_DOCUMENTATION (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇬🇷 [el](../../../el/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇪 [et](../../../et/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇷 [hr](../../../hr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇹 [lt](../../../lt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇱🇻 [lv](../../../lv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇹 [mt](../../../mt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇮 [sl](../../../sl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇸 [sr](../../../sr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../../tr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

---

title: "Doiciméadú Cóid OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Doiciméadú Cóid OmniRoute

> **Leagan:** v3.8.51
> **Nuashonraithe deireanach:** 2026-06-28
> **Lucht féachana:** Innealtóirí a chuireann le OmniRoute nó a thógann comhtháthú air.
>
> Le haghaidh léaráidí ailtireachta ardleibhéil agus an réasúnaíocht taobh thiar de gach fochóras, léigh
> [ARCHITECTURE.md](./ARCHITECTURE.md). Le haghaidh tumthaí domhaine ar fhó-chórais aonair
> (Auto Combo, freastalaí MCP, freastalaí A2A, Scileanna, Cuimhne, Gníomhairí Néal, Athléimneacht,
> Comhbhrú, srl.) féach a gcomhaid thiomnaithe san eolaire `docs/` seo.

Déanann an comhad seo cur síos ar **a bhfuil sa stór inniu** ionas gur féidir le hinnealtóir nua
an crann a nascleanúint, an cisealú rite ama a thuiscint, agus fios a bheith aige cá háit le cód a chur leis
gan modúil nua a chumadh.

---

## 1. Cruach Teicneolaíochta

| Ábhar           | Rogha                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Creat Gréasáin  | **Next.js 16** (App Router, aschur neamhspleách, gan middleware domhanda)                                                        |
| Teanga          | **TypeScript 6.0+** — sprioc `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                            |
| Rith-am         | **Node.js** `>=22.22.2 <23` nó `>=24.0.0 <27` (forfheidhmithe trí `engines` + `SUPPORTED_NODE_RANGE`)                            |
| Bunachar Sonraí | **SQLite** trí `better-sqlite3` (singleton, dialann WAL)                                                                         |
| Deasc           | **Electron 41** + `electron-builder` 26.10 (spás oibre ar leith ag `electron/`)                                                  |
| Tástálacha      | **Ritheoir tástála dúchais Node** (aonaid/chomhtháthú), **Vitest** (MCP, autoCombo, cache), **Playwright** (e2e + protocols-e2e) |
| Tógáil          | Next.js neamhspleách trí `scripts/build/build-next-isolated.mjs`                                                                 |
| Lint/formáid    | Cumraíocht chomhréidh ESLint + Prettier (`lint-staged` trí Husky pre-commit)                                                     |
| Córas modúl     | ESM i ngach áit (`"type": "module"`)                                                                                             |
| Spásanna oibre  | Spás oibre npm — is é `open-sse` an t-aon fho-spás oibre                                                                         |

Ailiasanna cosáin (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Port HTTP réamhshocraithe: **`20128`** (roinneann API agus deais an próiseas céanna). Eolaire
sonraí is ea athróg timpeallachta `DATA_DIR`, agus is é `~/.omniroute/` an réamhshocrú.

---

## 2. Leagan Amach an Stóir

```
OmniRoute/
├── src/                  Feidhmchlár Next.js (App Router, leabharlanna, fearann, freastalaí, comhroinnte)
├── open-sse/             Inneall sruthaithe spás oibre (@omniroute/open-sse)
├── electron/             Timfhilleadh deisce (Electron 41 príomh + preload)
├── bin/                  Pointí iontrála CLI (omniroute, reset-password)
├── tests/                Aonaid, comhtháthú, e2e, protocols-e2e, aistritheoir, slándáil, daingneáin
├── scripts/              Scriptí cúnta tógála, sioncronaithe, seiceála, imirce, agus rite ama
├── docs/                 Doiciméadú poiblí (an t-eolaire seo)
├── public/               Sócmhainní statacha, manifest PWA, oibrí seirbhíse
├── config/               Samplaí cumraíochta rite ama
├── images/               Sócmhainní margaíochta/scáileánghabhála
├── _ideia/, _references/, _mono_repo/, _tasks/   Scríobáin inmheánacha / pleanáil (ní sheoltar iad)
├── CLAUDE.md             Rialacha stóir do Claude Code
├── AGENTS.md             Tagairt ailtireachta níos doimhne do ghníomhairí
├── package.json          v3.8.51, fréamh spás oibre
└── tsconfig.json         Ailiasanna cosáin + roghanna croí-chomhthiomsaitheora
```

---

## 3. `src/` — Feidhmchlár Next.js

```
src/
├── app/                  Leathanaigh Rótaire App + rótaireanna API
├── lib/                  Leabharlanna croí (Bunachar Sonraí, fíordheimhniú, OAuth, scileanna, cuimhne, …)
├── domain/               Ciseal an réimse ghlan (polasaí, athchúrsáil, costas, glasáil, …)
├── server/               Modúil a dhéanann an freastalaí amháin (authz, cors, fíordheimhniú)
├── shared/               Cineálanna, tionscnaimh, bailíochtú, conarthaí, uirlisí (sábháilte trasna teorann)
├── mitm/                 Cúntóirí seachadóra man-in-the-middle le haghaidh comhtháthú CLI
├── models/               Meiteashonraí/míriarthaí múnla áitiúla
├── sse/                  Seoltóirí SSE sean-nóiseacha atá fós faoi `src/` (ní `open-sse/`)
├── store/                Stóráil stáit taobh an chliaint
├── middleware/           Uirlisí feidhmiúcháin leibhéal rótaire (ní feidhmiúcháin Next.js domhanda)
├── scripts/              Scripteanna laistigh den chrann is féidir le cód an aip a iompórtáil
├── types/                Cineálanna TS timpeallachta agus roinnte
├── i18n/                 Pacáistí logchaighdeáin
├── instrumentation.ts    Cruach Hook instrumentation Next.js
├── instrumentation-node.ts
└── proxy.ts              Cúntóir túsaithe seachadóra ar an leibhéal is airde
```

### 3.1 `src/app/` — Rótaire App

Nochtann Rótaire App an UI deais agus an API HTTP poiblí/riaracháin araon.
Níl **aon fheidhmiúchán domhanda ann** — déantar idirghabháil de réir rótaire.

Suíomhanna ar an leibhéal is airde faoi `src/app/`:

| Conair                                                                        | Cuspóir                                              |
| ----------------------------------------------------------------------------- | ---------------------------------------------------- |
| `api/`                                                                        | Gach rótaire API HTTP (féach an mionbhriseadh thíos) |
| `a2a/`                                                                        | Crios deiridh A2A JSON-RPC 2.0 (`POST /a2a`)         |
| `.well-known/agent.json/`                                                     | Cáipéis faoimhscríbhinne A2A Agent Card              |
| `(dashboard)/`                                                                | UI Deais (grúpa rótaire, gan réimír URL)             |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Sreafaí fíordheimhnithe                              |
| `landing/`                                                                    | Leathanach margaíochta/landála                       |
| `docs/`                                                                       | Amharcóir doiciméadachta API comhtháite              |
| `status/`, `maintenance/`, `offline/`                                         | Leathanaigh oibríochtúla                             |
| `privacy/`, `terms/`                                                          | Leathanaigh dhlíthiúla                               |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Leathanaigh earráide statacha                        |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Teorainneacha earráide/lódála an chreat              |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Brat埋ial an fhréamhshamhail                         |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — Leathanaigh UI

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, chomh maith le `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx` fréamh.

#### 3.1.2 `src/app/api/` — Grúpaí API barr-leibhéal

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
├── services/   Bainistíocht seirbhíse comhtháite (9router, cliproxy) — LOCAL_ONLY
├── upstream-proxy/
├── usage/
├── v1/         API poiblí comhoiriúnach le OpenAI
├── v1beta/     Comhoiriúnacht stíl Gemini
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Seirbhíseanna Comhtháite

Rótaireanna le haghaidh suiteála, tosaithe, stopála, agus monatóireachta ar 9Router agus CLIProxyAPI.
Tá gach conair aicmithe **LOCAL_ONLY** (loopback amháin, riala deas #17) mar is féidir leo
`npm install` a thionscnamh agus próiseas clainne a bhreith.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             Cúntóir getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install trí execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install leagan níos nua
│   ├── rotate-key/route.ts POST — gineadh eochair API nua + atosú
│   ├── status/route.ts     GET  — stádas beo + bunachar + meiteashonraí leagain
│   └── auto-start/route.ts POST — scoránú brataí auto_start
├── cliproxy/
│   ├── _lib.ts             Cúntóir getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install leagan níos nua
│   ├── status/route.ts     GET  — stádas beo + bunachar + meiteashonraí leagain
│   └── auto-start/route.ts POST — scoránú brataí auto_start
└── [name]/
    └── logs/route.ts       GET  — tail loga SSE (roinnte ag gach seirbhís)
```

UI deais comhfhreagrach:
`src/app/(dashboard)/dashboard/providers/services/` — leathanach dhá chluaisín (CLIProxyAPI + 9Router).
Seachadóir comhthacsaithe don UI comhtháite 9Router:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts`

Taiscéaladh domhain: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — API poiblí comhoiriúnach le OpenAI

```
v1/
├── accounts/[id]/                       cuardach cuntais
├── agents/tasks/[id]/, agents/tasks/    rótaireanna tascanna stíl A2A
├── api/                                 cúntóirí API inmheánacha nochta faoi v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      OpenAI Batches API
├── chat/completions/                    Complachtanna Comhrá (an príomhchrios deiridh)
├── completions/                         Complachtanna téacs sean-nós
├── embeddings/                          Leabú
├── files/[id]/, files/                  API Comhaid
├── _helpers/                            Cúntóirí rótaire roinnte (gan URL poiblí)
├── images/{edits, generations}/         Gineadh + eagarthóireacht íomhá
├── issues/                              Cúntóirí treisiú
├── management/{proxies}/                Rótaireanna raon-bainistíochta laistigh de v1
├── messages/{count_tokens}/             Comhoiriúnachacht teachtaireachtaí stíl Anthropic
├── models/                              Liostáil múnlaí (`route.ts`, `catalog.ts`)
├── moderations/                         Measúnacht
├── music/                               Gineadh ceoil
├── providers/[provider]/                Oibríochtaí de réir soláthraí
├── quotas/{check}                       ceisteanna cuóta
├── registered-keys/                     riarachán eochair cláraithe
├── rerank/                              Atreangú
├── responses/[...path]/                 OpenAI Responses API (tapaigh-gach)
├── search/                              Cuardach gréasáin
├── videos/                              Gineadh físe
├── ws/                                  droichead WebSocket
└── route.ts                             láimhseálaí innéacs
```

Téann gach comhad rótaire i bhfeidhm an den chéanna:

```
Rótaire → réamhscídeadh CORS → bailíochtú Zod body → fíordheimhniú roghnach
      → cur i bhfeidhm polasaí eochair API → ionadaíocht láimhseálaí (open-sse)
```

Is é `v1beta/` an dromchla comhoiriúnachta stíl Gemini (seiraid tanaí a aistríonn
isteach sa phíobáin chéanna `open-sse/handlers/`).

### 3.2 `src/lib/` — Leabharlanna Croí

Bí ag iompórtáil sonraí, sioncrónú, OAuth, scileanna, cuimhne, srl. trí na modúil seo.
Táirgeann an tábla na hainmchláir iarbhír agus comhaid barr-leibhéal suntasacha.

| Modúl             | Cuspóir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | Freastalaí prótacail A2A: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 scileanna: anailís costais, tuairisc sláinte, aimsigh soláthraí, bainistíocht cuóta, ródáil chliste, liosta-cumas)                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `acp/`            | Agent-Control-Protocol: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `api/`            | Cúntóirí API inmheánacha: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `auth/`           | `managementPassword.ts` (athshocrú pasfhocal / haishing)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `batches/`        | Seirbhís OpenAI Batches API (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `catalog/`        | Sioncrónú catalóige OpenRouter (`openRouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `cloudAgent/`     | Clárlann gníomhaire scáileáin: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `combos/`         | Cúntóirí réitithe comhbhá idir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `compliance/`     | iniúchadh + iniúchadh soláthraí: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `config/`         | Greamán cumraíochta rith-am                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `db/`             | Modúil réimse SQLite (féach §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `display/`        | Cúntóirí taispeáint/UI úsáidte ag freagairtí API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `embeddings/`     | Clárlann seirbhíse leabúcháin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `env/`            | Lódáil + idirshnaimh timpeallachta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `evals/`          | Rith-am rátála                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `jobs/`           | Obair chúlra (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `memory/`         | Cuimhne buan: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `oauth/`          | Modúil soláthraí ionchurtha/athsholáthartha (22): `agy`, `antigravity`, `claude`, `cline`, `codebuddy-cn`, `codex`, `cursor`, `devin-desktop`, `ghe-copilot`, `github`, `gitlab-duo`, `grok-cli-oauth`, `grok-cli`, `kilocode`, `kimi-coding`, `kiro`, `openference`, `qoder`, `trae`, `xai-oauth`, `zed-hosted`, `zed`, chomh maith le `services/`, `utils/`, agus `constants/oauth.ts`                                                                                                                                                                                                                                                                                                              |
| `plugins/`        | Luchtóir breiseán (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `providerModels/` | Saolré múnla bainistithe: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `providers/`      | Cúntóirí soláthraí: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `resilience/`     | `settings.ts` — socruithe le haghaidh briseadh sreáidin, fuarú, glasála                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `runtime/`        | Brath gnéithe rith-am                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `services/`       | Creat seirbhíse comhtháite: `ServiceSupervisor.ts` (sárlán próiseas clainne le glas oibríochta, bufer fáinne, seiceálaí sláinte), `bootstrap.ts` (clárú leibhéal próisis agus tosú uathoibríoch), `registry.ts` (léarscáil uirlis → sárlán), `apiKey.ts` (stóras eochair AES-256-GCM), `modelSync.ts` (sioncrónú múnla tráthrialta), `ringBuffer.ts` (bufer loga ciorclach 5 MB), `healthCheck.ts` (fiosrú sláinte HTTP), `types.ts`, `embedWsProxy.ts` (seachadóir WebSocket), `installers/{ninerouter,cliproxy}.ts`. Féach `docs/frameworks/EMBEDDED-SERVICES.md`                                                                                                                                   |
| `agentSkills/`    | Catalóg + gineadh Scileanna Gníomhaire: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → scríobhann `skills/{id}/SKILL.md`), `openapiParser.ts` (ionsúilítear críocha REST ó shonraíochta OpenAPI), `cliRegistryParser.ts` (ionsúilítear fo-chiúnanna CLI ó bin/cli-registry), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Úsáidte ag rótaireanna REST (`/api/agent-skills/*`), uirlisí MCP (`omniroute_agent_skills_*`), agus liosta-cumas A2A skill. Féach [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Creat scileanna: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sandbox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, chomh maith le `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `spend/`          | `batchWriter.ts` (bufer scríofa-diaidh-ar-nós)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `sync/`           | `bundle.ts`, `tokens.ts` (Sioncrónú Scáileáin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `system/`         | Cúntóirí leibhéal an chórais                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `translator/`     | Greamán tionóilithe barr-leibhéal (ionadaithe isteach sa `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `usage/`          | Cuntasaíocht úsáide: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `versionManager/` | Uath-ionsí + manifeist leagain                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ws/`             | Droichead WebSocket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `zed-oauth/`      | Sreá fíordheimhnithe eagarthóra Zed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Comhaid barr-leibhéal i `src/lib/`:

- Baineamar an t-seanchomhla `localBroker.ts` — déanann tomhaltóirí iompórtáil go díreach ar `src/lib/db/*` modúil faoi leith.
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

Bunachar Sonraí Singleton SQLite (`getDbInstance()` i `core.ts`, lógáil WAL).
**Ná scríobh SQL amh i rótaireanna nó i láimhseálaithe riamh** — téigh trí na modúil seo.

![Forbhreathnú ar scéim bunachar sonraí (táblaí croí roghnaithe)](../diagrams/exported/db-schema-overview.svg)

> Foinse: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Modúil réimse (gach ceann acu ag seilbh ar thábla amháin nó níos mó): `apiKeys.ts`, `backup.ts`,
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

Tá 168 comhad `.sql` leagain sa `migrations/` (idempotent, tráchtáil) agus ritheann
`migrationRunner.ts` iad ag tús.

Táblaí cruthaithe trasna na n-imirce (123 iomlán):

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
`webhooks` (chomh maith le táblaí fíorúil FTS5 le haghaidh cuardach cuimhne).

### 3.3 `src/domain/` — Ciseal an Réimse

Gnóthachtáil ghlan, gan I/O. Iompórtáilte ag rótaireanna agus láimhseálaithe.

| Comhad                                     | Cuspóir                                                       |
| ------------------------------------------ | ------------------------------------------------------------- |
| `policyEngine.ts`                          | Résolú polasaí barr-leibhéal                                  |
| `fallbackPolicy.ts`                        | Crann cinnte athchúrsála                                      |
| `costRules.ts`                             | Rialaí ríomh costais                                          |
| `lockoutPolicy.ts`                         | Cinntí glasála múnla                                          |
| `tagRouter.ts`                             | Ródáil bunaithe ar chlib                                      |
| `comboResolver.ts`                         | Réiteach comhbhá idir an t-iarratas → an liosta spriocanna    |
| `connectionModelRules.ts`                  | Scagairí múnla de réir ceangal                                |
| `modelAvailability.ts`                     | Seiceáil infhaighteachta múnla                                |
| `degradation.ts`                           | Athruithe trasnáinse cothromaithe                             |
| `providerExpiration.ts`                    | Brath cuntas/eochracha atá imithe in éag                      |
| `quotaCache.ts`                            | Cinntí cuóta stóráilte                                        |
| `responses.ts`, `omnirouteResponseMeta.ts` | Cúntóirí cruth freagairtha                                    |
| `configAudit.ts`                           | Iniúchadh athruithe cumraíochta                               |
| `assessment/`                              | Measúnadh múnla (de réir RFC, curtha i bhfeidhm go páirteach) |
| `types.ts`                                 | Cineálanna réimse roinnte                                     |

### 3.4 `src/server/` — Freastalaí Amháin

Ní féidir iompórtáil ó chomhpháirteanna an chliaint.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Aicmíonn rótaireanna mar poiblí nó riarachán
│   ├── assertAuth.ts      Cúntóir dearbhaithe
│   ├── context.ts         Comhthéacs authz iarratais ar leith
│   ├── headers.ts
│   ├── pipeline.ts        Píobáin authz
│   ├── policies/          Polasaithe dearfa
│   └── types.ts
└── cors/origins.ts        Liosta ceadaithe ionada CORS
```

### 3.5 `src/shared/` — Sábháilte le Roinnt

Roinnte i bhfochomhlaigh dírithe:

- `constants/` — `providers.ts` (catalóg soláthraí bailíochta Zod), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts (diúltliosta), `mcpScopes.ts`,
`errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
`bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
`sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 scéim Zod), `compressionConfigSchemas.ts`,
  `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — conarthaí API poiblí seolta chuig npm.
- `types/` — cineálanna TS roinnte.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`, `cloud.ts`, `cn.ts`,
  `cors.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts`, chomh maith le croíreanna/comhpháirteanna deais faoi `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/`.

## 4. `open-sse/` — Spás oibre an innill srutha

Spás oibre npm deighlaithe a fhoilsítear mar `@omniroute/open-sse. Is é aige an phróiseáil iarratais, na forbróirí, na haistritheoirí, na seirbhísí, an t-iompóirteoir, agus an freastalaí MCP.

```
open-sse/
├── index.ts                Easpórtáil phoiblí
├── package.json            Lámhscríbhinn an spáis oibre
├── tsconfig.json
├── types.d.ts
├── config/                 Clárlanna soláthraithe, próifílí ceanntaigh, céannacht, …
├── handlers/               Iarratais láimhseála (comhrá, leabú, fuaim, íomhá, …)
├── executors/              108 forbróirí HTTanna ar son soláthraithe
├── translator/             Tiontú formáide (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Freagairt API ↔ Comhshuite Comhrá sruth-iompóirteoir
├── services/               80+ modúil seirbhíse (combaí, aisghníomhú, cíosanna, céannacht, …)
├── utils/                  Cuiditheoirí srutha, TLS cliant, AWS SigV4, ionadaíocht procsí, …
└── mcp-server/             Freastalaí MCP (3 iompairt, 33 scóip, 110 uirlisí)
```

### 4.1 `open-sse/handlers/`

| Lámhseálaí              | Cuspóir                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| `chatCore.ts`           | Príomhthreoir comhrá (cuimhne, teorann ráta, ródú comba, dáileadh forbróra) |
| `responsesHandler.ts`   | Iontráil OpenAI Freagairt API                                               |
| `embeddings.ts`         | Leabú                                                                       |
| `imageGeneration.ts`    | Giniúint íomhá                                                              |
| `audioSpeech.ts`        | Téacs-go-béal                                                               |
| `audioTranscription.ts` | Béal-go-téacs                                                               |
| `videoGeneration.ts`    | Giniúint físe                                                               |
| `musicGeneration.ts`    | Giniúint ceoil                                                              |
| `rerank.ts`             | Athrangu                                                                    |
| `moderations.ts`        | Módúchán                                                                    |
| `search.ts`             | Cuardach gréasáin                                                           |
| `sseParser.ts`          | Parsálaí imeachta SSE                                                       |
| `usageExtractor.ts`     | Tarraing comhaireamh comhartha as sruthaí upstream                          |
| `responseSanitizer.ts`  | Bain torann ar leithligh soláthraithe                                       |
| `responseTranslator.ts` | Greama idir freagairt soláthraithe agus ciseal aistriúcháin                 |

### 4.2 `open-sse/executors/`

108 forbróirí, gach ceann ag síneadh le `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `cliproxyapi`,
`chatgpt-web-codex`, `cloudflare-ai`, `codex`, `commandCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `qoder`, `vertex`, `devin-desktop`, móide `claudeIdentity.ts`
(cuiditheoir céannacht comhroinnte) agus `index.ts` (clárlann).

> Nóta: Ní chuirtear soláthraithe nach liostaithe anseo ar fáil ag `default.ts` ag úsáid an
> forbróra comhchoiteann comhoiriúnach le OpenAI. Tá an catalóig iomlán soláthraithe (355 soláthraí) i
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Aistriúchán lárnach-spoke (is hub é OpenAI).

- **9 aistritheoirí iarratais** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 aistritheoirí freagartha** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 cúntóirí** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, móide
  tástálacha cúntóra.
- **Cúntóirí íomhá** (`translator/image/sizeMapper.ts`).
- Bonnleibhéal: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — Ionadaíocht `TransformStream`-bhunaithe Freagairt API ↔ Comhshuite Comhrá
  tiompóra (úsáidtear ag an bealach freagartha `responses/`).

### 4.5 `open-sse/services/`

Gnéithe suntasacha (liost iomlán faoi `open-sse/services/`):

| Imní                 | Comhaid                                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ródú comba           | `combo.ts` (19 straitéis), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                              |
| Inneall Auto Combo   | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`      |
| Neartmhaireacht      | `accountFallback.ts` (fuarú + glasáil), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                                 |
| Cíosanna             | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                       |
| Taisceadh            | `reasoning.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                          |
| Intleacht ródaithe   | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                      |
| Láimhseáil samhail   | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                       |
| Comhbhrú             | `compression/` — sreangú innille comhbhrú iomlán                                                                                                                                                                                                  |
| Comhartha + seisiún  | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHandoff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Leibhéal / léarsráid | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                     |
| IP / líonra          | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                             |
| Batches              | `batchProcessor.ts`                                                                                                                                                                                                                               |
| Úsáid                | `usage.ts`                                                                                                                                                                                                                                        |

### 4.6 `open-sse/mcp-server/`

- **110 uirlisí uathúla** sreangaithe i `server.ts` (45 canonical i `schemas/tools.ts` +
  cuimhne, scileanna, scileanna-github, poll, cluichíocht, breiseán, Notion, Obsidian,
  corpas-áitiúil agus modúil comhbhrú — aonán áireamh ag `countUniqueMcpTools`).
- **3 iompairt**: stdio, HTTP Streamable, SSE.
- **33 scóip** curtha i bhfeidhm ag am rith — liost bunlíreach i `src/shared/constants/mcpScopes.ts`, is é an tacar iomlán ná an t-aonán de na scóip a dhéanann gach modúl uirlise.
- Tábla iniúchta: `mcp_tool_audit` ( líonadh ag `audit.ts`).
- Comhaid: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  móide tástálacha faoi `__tests__/`.
- Féach [MCP-SERVER.md](../frameworks/MCP-SERVER.md) le haghaidh an chatalóig uirlise iomlán.

### 4.7 `open-sse/config/`

Clárlanna soláthraithe (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), clárlanna samhlacha in aghaidh na formáide (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
cuiditheoirí céannachta (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
cuiditheoirí dentarachta (`credentialLoader.ts`, `codexClient.ts`), agus oiriúnóirí
scála (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Príomhshnáitheanna srutha agus cuiditheoirí soláthraithe: `stream.ts`, `streamHandler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHandler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Cumhdach deisce

```
electron/
├── main.js                  Príomhphróiseas Electron
├── preload.js               Droichead réamhlódála (contextIsolation cumasaithe)
├── types.d.ts
├── package.json             Cumraíocht electron-builder, leagan 3.8.51
├── README.md
├── assets/                  Acmhainní tógála (deilbhíní, teidlíochtaí, …)
├── node_modules/            node_modules tiomnaithe (better-sqlite3, electron-updater)
└── dist-electron/           Aschur tógála (gan tiomantas)
```

Cúig script npm ag fréamh an spás oibre: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Déantar nuashonrú uathoibríoch trí
`electron-updater` ag díriú ar fhotha scaoilte GitHub.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           Príomhiontráil CLI (Node ESM)
├── reset-password.mjs      Athshocraigh an pasfhocal bainistíochta ó CLI
├── mcp-server.mjs          Seoltóir freastalaí MCP (stdio)
├── nodeRuntimeSupport.mjs  Garda leagan Node
└── cli/
    ├── program.mjs         Tógálaí clár Commander
    ├── runtime.mjs         cúntóir withRuntime (freastalaí-ar dtús/db-fallback)
    ├── output.mjs          Formáideoirí aschuir (json/jsonl/table/csv)
    ├── i18n.mjs            cúntóir t() le logánna
    ├── api.mjs             cúntóir API fetch
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Clárú orduithe
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (comhad amháin in aghaidh ordaithe/grúpa)
```

Tá dhá dhénártha nochtaithe in `package.json` → `bin`:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Eolaire                                              | Cineál                                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `tests/unit/`                                        | Tástálacha aonaid trí reathaí tástála dúchais Node (1821 comhad, móide fofhóilte `api/`, `auth/`, `authz/`) |
| `tests/integration/`                                 | Tástálacha tras-mhodúil + staid DB                                                                          |
| `tests/e2e/`                                         | Tástálacha UI Playwright                                                                                    |
| `tests/e2e/protocol-clients.test.ts`                 | e2e prótacal MCP/A2A                                                                                        |
| `tests/translator/`                                  | Tástálacha sainiúla aistritheora                                                                            |
| `tests/security/`                                    | Cúlchéimnithe slándála                                                                                      |
| `tests/load/`                                        | Tástálacha ualaigh / struis                                                                                 |
| `tests/golden-set/`                                  | Aschuir thagartha do chúlchéimnithe aistritheora                                                            |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/` | Tacaíocht                                                                                                   |

Orduithe coitianta:

| Ordú                                                     | Cad a ritheann sé                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `npm run test:unit`                                      | Gach `tests/unit/*.test.ts` trí reathaí tástála dúchais Node (comhreathanna 10) |
| `npm run test:vitest`                                    | Sraith Vitest (MCP, autoCombo, cache)                                           |
| `npm run test:e2e`                                       | Sraith UI Playwright                                                            |
| `npm run test:protocols:e2e`                             | e2e prótacal MCP + A2A                                                          |
| `npm run test:coverage`                                  | Geata clúdaigh (≥60% línte/ráitis/feidhmeanna/brainsí)                          |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Rith comhaid aonair                                                             |

---

## 8. `scripts/`

Eagraithe i 6 fhofhillteán de réir cuspóra.

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

## 9. Píblíne Iarratais (Achoimre)

![Píblíne iarratais (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Foinse: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Iarratas cliaint
  → /v1/chat/completions (route.ts)
     Seiceáil réamh-eitilte CORS
     Bailíochtú Zod (chatCompletionsSchema in shared/validation/schemas.ts)
     Údarú (extractApiKey + isValidApiKey NÓ requireManagementAuth)
     Inneall beartais (src/server/authz/pipeline.ts)
     Gardaí ráillí (PII masker, instealladh pras, droichead fís)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Seiceáil taisce (seiminteach + léamh taisce)
     Teorainn ráta (rateLimitManager, accountSemaphore)
     Ródú comhcheangail (má réitíonn an tsamhail go comhcheangal)
       comboResolver → lúb in aghaidh an sprioc → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       faigh suas an sruth → retry/backoff trí accountFallback
     translateResponse() (open-sse/translator/response/*)
     Sruth SSE NÓ freagra JSON
     Má API Freagraí: TransformStream trí open-sse/transformer/responsesTransformer.ts
  → Iniúchadh comhlíonta (src/lib/compliance/)
  → Freagra don chliant
```

### Staid rite athléimneachta (trí mheicníocht)

| Meicníocht                  | Raon feidhme                  | Cá háit                                                                                                    |
| --------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Scoradán ciorcaid soláthraí | Soláthraí iomlán              | `src/shared/utils/circuitBreaker.ts`, coinnithe i `domain_circuit_breakers`                                |
| Fuarthréimhse ceangail      | Cuntas/eochair amháin         | `markAccountUnavailable()` in `src/sse/services/auth.ts`; ídithe ag `accountFallback.checkFallbackError()` |
| Glasáil samhail             | Soláthraí + ceangal + samhail | `open-sse/services/accountFallback.ts`, coinnithe i `domain_lockout_state`                                 |

Féach [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) agus an chuid thiomnaithe in
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Conas le Cur le Rannpháirtíocht

### Cuir soláthraí nua leis

1. Cláraigh i `src/shared/constants/providers.ts` (deimhnithe ag Zod ag lódáil).
2. Cuir feidhmitheoir leis in `open-sse/executors/` más gá loighic saincheaptha
   (faigh ar aghaidh `BaseExecutor`).
3. Cuir aistritheoir leis in `open-sse/translator/` mura labhraíonn sé formáid OpenAI.
4. Má tá sé bunaithe ar OAuth, cuir cumraíocht leis faoi `src/lib/oauth/providers/` agus
   `src/lib/oauth/services/`.
5. Cláraigh samhlacha in `open-sse/config/providerRegistry.ts` (nó an chlárúchán sonrach
   formáide faoi `open-sse/config/`).
6. Scríobh tástálacha faoi `tests/unit/`.

### Cuir róta nua API leis

1. Cruthaigh `src/app/api/your-route/route.ts`.
2. Lean an phatrún: CORS → dearbhú Zod an choirp → fíordheimhniú → dílseáil an láimhseálaí.
3. Más cruth nua iarratais: cuir an scéime Zod leis i `src/shared/validation/schemas.ts`.
4. Más róta bainistíochta amháin: cuir an conair leis i `src/shared/constants/publicApiRoutes.ts`
   (liosta dhiúltaithe don snáithe API poiblí).
5. Cuir tástálacha leis faoi `tests/unit/`.
6. Nuashonraigh `docs/reference/API_REFERENCE.md` agus `docs/openapi.yaml`.

### Cuir modúl nua bunachar sonraí leis

1. Cruthaigh `src/lib/db/yourModule.ts` agus iompórtáil `getDbInstance()` ó `./core.ts`.
2. Onnmhairigh feidhmeanna CRUD do do réimse.
3. Más táblaí nua: cuir imirbhe leis faoi `src/lib/db/migrations/`, uimhrithe go
   ordúil, idempotent, idirmhach.
4. Úsáideoirí iompórtála díreach ó `@/lib/db/yourModule` (gan stór — baineadh an sean-sraith
   ath-onnmhairithe `localDb.ts`).
5. Cuir tástálacha leis faoi `tests/unit/`.

### Cuir uirlis MCP nua leis

1. Cuir an sainmhíniú uirlise leis faoi `open-sse/mcp-server/tools/` (ná leathnaigh
   `open-sse/mcp-server/schemas/tools.ts`).
2. Sanatóir an scóip/icí is fearr i `src/shared/constants/mcpScopes.ts`.
3. Cláraigh an uirlis in `open-sse/mcp-server/server.ts`.
4. Cuir tástálacha leis faoi `open-sse/mcp-server/__tests__/`.
5. Nuashonraigh [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Cuir scil A2A nua leis

Féach [A2A-SERVER.md § Adding a New Skill](../frameworks/A2A-SERVER.md). Tá scileanna i
`src/lib/a2a/skills/` agus cláraítear iad trí bhainisteoir tascanna A2A.

---

## 11. Coinbhinsiúin

- **Stíl chód**: eallaigh 2-spás, dátheisteacha, leithead 100 carachtar, leathchomharthaí,
  `es5` camóga iarmhíreach — forfheidhmithe ag Prettier trí `lint-staged`.
- **Iompórtálacha**: seachtrach → inmheánach (`@/`, `@omniroute/open-sse`) → coibhneasta.
- **Ainmniúchán**: comhaid `camelCase` nó `kebab-case`, comhpháirteanna `PascalCase`,
  tairiscintí `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` i ngach áit;
  `no-explicit-any` = `warn` in `open-sse/` agus `tests/`, error in áiteanna eile.
- **TypeScript**: `strict: false` (stát seanbhunaithe). Is fearr cineálacha sainráite ná
  inferences do theorainneacha idir-mhodúl.
- **Bunachar sonraí**: ná scríobh SQL amh i rótaí nó láimhseálaithe — úsáid modúil
  `src/lib/db/` i gcónaí. Ná déan stór-iompórtáil — úsáid modúil shonracha `src/lib/db/*`
  go díreach.
- **Clóchur AEachtrach (#3512)**: ba cheart d'fheidhm a scríobhann nó a léann cruth
  róine tábla DB glacadh/teacht ar ailt TS ainmnithe a mhalartaíonn colúin an tábla sin
  1:1, ní `any` nó cineál gan ainm inlíne ag an suíomh glaonna. Leag an comhaid in aice
  na feidhme (m.sh. `export interface UsageEntry` in
  `src/lib/usage/usageHistory.ts` os cionn `saveRequestUsage`), coinnigh
  réimsí aonair roghnach/neamhfhiadhnach nuair a líonann scríobhairí éagsúla an róin
  inár bhfíor-am, agus is fearr `unknown` thar `any` do réimse a bhfuil a cruth
  éagsúil idir glaoirí (doiciméadaithe ar an réimse, m.sh. `UsageEntry.tokens`
  glacann le cruth soláthraí amh agus cruth normalaithe freisin). Nuair a shroicheann
  an líon `any` sa chomhad aon noll seo, cuir leis an liosta ceadaithe
  `check:any-budget:t11` (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`) ionas nach féidir dul ar ais. Is coinbhinsiún slicing é seo — an
  "glanadh gan ainm `any`" níos leithne tá sé idirghníomhach sa chuid eile den
  chód.
- **Earráidí**: try/catch le cineálacha earráide sonracha, logáil le comhthéacs pino. Ná
  slog earráidí i sreáim SSE i do thost; úsáid comharthaí bleid do ghlanadh.
- **Slándáil**: ná húsáid `eval()` / `new Function()` / eval i bhfíor-am. Deimhnigh
  gach ionchur le Zod. Criptigh ainmneacha comharthaí atá ar fáil (AES-256-GCM). Coinnigh
  an liosta dhiúltaithe i `src/shared/constants/upstreamHeaders.ts` ag teacht le
  an tsiúil/deimhniú.
- **Tiomsúcháin**: Conventional Commits — `feat(scope): subject`. Scóipí ceadaithe:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Brainseanna**: réamhfhocail `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Ná déan tiomsúcháin díreach i `main`.
- **Husky**: roimh thiomsúcháin rith `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; roimh bhrú rith `check:any-budget:t11` + `check:tracked-artifacts` (geataí tapa; eisiamh `test:unit`).

## 12. Rialacha Crua (ó CLAUDE.md)

1. Ná coinnigh rúin ná dintiúirí i dtiomantais riamh.
2. Ná húsáid allmhairí baraille — bain úsáid as modúil shonracha `src/lib/db/*` go díreach.
3. Ná húsáid `eval()` / `new Function()` / eval intuigthe riamh.
4. Ná déan tiomantas díreach chuig `main`.
5. Ná scríobh SQL amh i ródaí — téigh trí mhodúil `src/lib/db/` i gcónaí.
6. Ná slog earráidí go ciúin i sruthanna SSE riamh.
7. Bailíochtaigh ionchuir le scéimeanna Zod i gcónaí.
8. Cuir tástálacha san áireamh i gcónaí nuair a athraíonn tú cód táirgeachta.
9. Caithfidh clúdach fanacht ≥ 60% (ráitis, línte, feidhmeanna, brainsí).

---

## 13. Féach Freisin

- [ARCHITECTURE.md](./ARCHITECTURE.md) — ailtireacht ardleibhéil agus freagrachtaí modúl.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — tagairt API poiblí + bainistíochta.
- [FEATURES.md](../guides/FEATURES.md) — maitrís gnéithe agus buaicphointí leaganacha.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — tumléargas ar scoradán ciorcaid, fuarú, agus glasáil amach.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — scóráil agus straitéisí Auto Combo.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — catalóg iomlán uirlisí MCP + iompar.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — scileanna agus fionnachtain phrótacal A2A.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — comhbhrú RTK + Caveman.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — comhtháthú CLI.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (má tá sé i láthair), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — spriocanna imlonnaithe.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — saincheisteanna oibríochtúla coitianta.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — sreabhadh oibre rannpháirtithe.
- [CLAUDE.md](../../CLAUDE.md) — rialacha stór do Claude Code (an fhoinse fírinne do go leor de na coinbhinsiúin thuas).
- [AGENTS.md](../../AGENTS.md) — tagairt ailtireachta níos doimhne a úsáideann gníomhairí.
