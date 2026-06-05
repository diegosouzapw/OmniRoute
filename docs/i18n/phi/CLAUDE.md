# CLAUDE.md (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

This file ay nagbibigay ng gabay sa Claude Code (claude.ai/code) kapag nagtatrabaho sa code sa repository na ito.

## Mabilis na Pagsisimula

```bash
npm install                    # Mag-install ng deps (auto-generates .env mula sa .env.example)
npm run dev                    # Dev server sa http://localhost:20128
npm run build                  # Production build (Next.js 16 standalone)
npm run lint                   # ESLint (0 errors ang inaasahan; warnings ay pre-existing)
npm run typecheck:core         # TypeScript check (dapat ay malinis)
npm run typecheck:noimplicit:core  # Mahigpit na check (walang implicit any)
npm run test:coverage          # Unit tests + coverage gate (75/75/75/70 — statements/lines/functions/branches)
npm run check                  # lint + test na pinagsama
npm run check:cycles           # Tukuyin ang circular dependencies
```

### Pagsasagawa ng Mga Pagsubok

```bash
# Isang test file (Node.js native test runner — karamihan sa mga pagsubok)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Lahat ng suites
npm run test:all
```

Para sa buong test matrix, tingnan ang `CONTRIBUTING.md` → "Pagsasagawa ng Mga Pagsubok". Para sa malalim na arkitektura, tingnan ang `AGENTS.md`.

---

## Proyekto sa Isang Sulyap

**OmniRoute** — pinagsamang AI proxy/router. Isang endpoint, 160+ LLM providers, auto-fallback.

| Layer         | Lokasyon                | Layunin                                                            |
| ------------- | ----------------------- | ------------------------------------------------------------------ |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — mga entry point                               |
| Handlers      | `open-sse/handlers/`    | Pagproseso ng request (chat, embeddings, atbp)                     |
| Executors     | `open-sse/executors/`   | Provider-specific HTTP dispatch                                    |
| Translators   | `open-sse/translator/`  | Format conversion (OpenAI↔Claude↔Gemini)                           |
| Transformer   | `open-sse/transformer/` | Responses API ↔ Chat Completions                                   |
| Services      | `open-sse/services/`    | Combo routing, rate limits, caching, atbp                          |
| Database      | `src/lib/db/`           | SQLite domain modules (45+ files, 55 migrations)                   |
| Domain/Policy | `src/domain/`           | Policy engine, cost rules, fallback logic                          |
| MCP Server    | `open-sse/mcp-server/`  | 37 tools (30 base + 3 memory + 4 skills), 3 transports, ~13 scopes |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protocol                                        |
| Skills        | `src/lib/skills/`       | Extensible skill framework                                         |
| Memory        | `src/lib/memory/`       | Persistent conversational memory                                   |

Monorepo: `src/` (Next.js 16 app), `open-sse/` (streaming engine workspace), `electron/` (desktop app), `tests/`, `bin/` (CLI entry point).

---

## Request Pipeline

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod validation → auth? → policy check → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache check → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → response translation → SSE stream or JSON
    → If Responses API: responsesTransformer.ts TransformStream
```

Ang mga API route ay sumusunod sa isang pare-parehong pattern: `Route → CORS preflight → Zod body validation → Opsyonal na auth (extractApiKey/isValidApiKey) → pagpapatupad ng patakaran sa API key → Delegasyon ng Handler (open-sse)`. Walang global na Next.js middleware — ang interception ay tiyak sa ruta.

**Combo routing** (`open-sse/services/combo.ts`): 14 na estratehiya (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, reset-aware, strict-random, auto, lkgp, context-optimized, context-relay). Bawat target ay tumatawag sa `handleSingleModel()` na nagbabalot sa `handleChatCore()` na may per-target na error handling at circuit breaker checks. Tingnan ang `docs/routing/AUTO-COMBO.md` para sa 9-factor Auto-Combo scoring at `docs/architecture/RESILIENCE_GUIDE.md` para sa 3 resilience layers.

---

## Resilience Runtime State

Ang OmniRoute ay may tatlong kaugnay ngunit magkakaibang mekanismo ng pansamantalang pagkabigo. Panatilihing hiwalay ang kanilang saklaw kapag nag-debug ng pag-uugali ng routing. Tingnan ang
[3-layer resilience diagram](./docs/diagrams/exported/resilience-3layers.svg)
(source: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
para sa isang mabilis na mapa.

### Provider Circuit Breaker

**Saklaw**: buong provider, e.g. `glm`, `openai`, `anthropic`.

**Layunin**: itigil ang pagpapadala ng trapiko sa isang provider na paulit-ulit na bumabagsak sa
upstream/service level, upang ang isang hindi malusog na provider ay hindi nagpapabagal sa bawat request.

**Implementasyon**:

- Core class: `src/shared/utils/circuitBreaker.ts`
- Chat gate/execution wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Shared wrappers: `open-sse/services/accountFallback.ts`
- Persisted state table: `domain_circuit_breakers`

**Mga Estado**:

- `CLOSED`: pinapayagan ang normal na trapiko.
- `OPEN`: pansamantalang naka-block ang provider; ang mga tumatawag ay nakakakuha ng provider-circuit-open na tugon
  o ang combo routing ay lumilipat sa ibang target.
- `HALF_OPEN`: ang reset timeout ay lumipas na; payagan ang isang probe request. Ang tagumpay ay nagsasara sa
  breaker, ang pagkabigo ay muling nagbubukas dito.

**Mga Default** (`open-sse/config/constants.ts`):

- OAuth providers: threshold `3`, reset timeout `60s`.
- API-key providers: threshold `5`, reset timeout `30s`.
- Local providers: threshold `2`, reset timeout `15s`.

Tanging mga status ng pagkabigo sa antas ng provider ang dapat mag-trigger sa provider breaker:

```ts
(408, 500, 502, 503, 504);
```

Huwag i-trigger ang buong-provider breaker para sa normal na account/key/model errors tulad ng karamihan
`401`, `403`, o `429` na mga kaso. Karaniwan silang nabibilang sa connection cooldown o model
lockout. Ang isang generic na API-key provider `403` ay dapat na ma-recover maliban kung ito ay nakategorya
bilang isang terminal provider/account error.

Ang breaker ay gumagamit ng lazy recovery, hindi isang background timer. Kapag ang `OPEN` ay nag-expire, ang mga pagbabasa tulad ng `getStatus()`, `canExecute()`, at `getRetryAfterMs()` ay nag-refresh ng estado sa
`HALF_OPEN`, upang ang mga dashboard at combo candidate builders ay hindi patuloy na nag-eexclude ng isang
nag-expire na provider magpakailanman.

### Connection Cooldown

**Saklaw**: isang provider connection/account/key.

**Layunin**: pansamantalang laktawan ang isang masamang key/account habang pinapayagan ang iba pang mga koneksyon para sa
parehong provider na ipagpatuloy ang pagseserbisyo ng mga request.

**Implementasyon**:

- Write/update path: `src/sse/services/auth.ts::markAccountUnavailable()`
- Account selection/filtering: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown calculation: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Settings: `src/lib/resilience/settings.ts`

Mahalagang mga field sa provider connections:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Sa panahon ng pagpili ng account, isang koneksyon ang nilaktawan habang:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Ang mga cooldown ay lazy din: kapag ang `rateLimitedUntil` ay nasa nakaraan, ang koneksyon ay nagiging
eligible muli. Sa matagumpay na paggamit, `clearAccountError()` ay naglilinis ng `testStatus`,
`rateLimitedUntil`, mga field ng error, at `backoffLevel`.

Default na pag-uugali ng connection cooldown:

- OAuth base cooldown: `5s`.
- API-key base cooldown: `3s`.
- API-key `429` ay dapat mas gustuhin ang upstream retry hints (`Retry-After`, reset headers, o
  parseable reset text) kapag available.
- Ang mga paulit-ulit na ma-recover na pagkabigo ay gumagamit ng exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ang anti-thundering-herd guard ay pumipigil sa sabay-sabay na pagkabigo sa parehong koneksyon mula sa
paulit-ulit na pagpapahaba ng cooldown o double-incrementing `backoffLevel`.

Ang mga terminal states ay hindi mga cooldown. Ang `banned`, `expired`, at `credits_exhausted` ay
nakatakdang manatiling unavailable hanggang sa magbago ang mga kredensyal/settings o i-reset ito ng isang operator. Huwag i-overwrite ang mga terminal states gamit ang pansamantalang cooldown state.

### Model Lockout

**Saklaw**: provider + connection + model.

**Layunin**: iwasan ang pag-disable ng isang buong koneksyon kapag isa lamang na modelo ang hindi available o
quota-limited para sa koneksyong iyon.

Mga halimbawa:

- Per-model quota providers na nagbabalik ng `429`.
- Local providers na nagbabalik ng `404` para sa isang nawawalang modelo.
- Mga pagkabigo sa pahintulot ng mode/model na tiyak sa provider tulad ng napiling Grok modes.

Ang model lockout ay nasa `open-sse/services/accountFallback.ts` at nagpapahintulot sa parehong
koneksyon na ipagpatuloy ang pagseserbisyo ng iba pang mga modelo.

### Debugging Guidance

- Kung lahat ng keys para sa isang provider ay nilaktawan, suriin ang parehong estado ng provider breaker at bawat
  koneksyon `rateLimitedUntil`/`testStatus`.
- Kung ang isang provider ay tila permanenteng na-exclude pagkatapos ng reset window, suriin kung ang code
  ay nagbabasa ng raw `state` sa halip na gumagamit ng `getStatus()`/`canExecute()`.
- Kung ang isang provider key ay nabigo ngunit ang iba ay dapat gumana, mas gustuhin ang connection cooldown kaysa
  provider breaker.
- Kung isa lamang na modelo ang nabigo, mas gustuhin ang model lockout kaysa sa connection cooldown.
- Kung ang isang estado ay dapat na self-recover, dapat itong magkaroon ng hinaharap na timestamp/reset timeout at isang
  read path na nag-refresh ng expired state. Ang mga permanenteng status ay nangangailangan ng manu-manong pagbabago ng kredensyal
  o config.

## Mga Pangunahing K convention

### Estilo ng Code

- **2 spaces**, semicolons, double quotes, 100 char width, es5 trailing commas (ipinapatupad ng lint-staged sa pamamagitan ng Prettier)
- **Imports**: external → internal (`@/`, `@omniroute/open-sse`) → relative
- **Pangalan**: files=camelCase/kebab, components=PascalCase, constants=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = error sa lahat ng dako; `no-explicit-any` = warn sa `open-sse/` at `tests/`
- **TypeScript**: `strict: false`, target ES2022, module esnext, resolution bundler. Mas gusto ang mga explicit types.

### Database

- **Laging** dumaan sa `src/lib/db/` domain modules — **huwag** magsulat ng raw SQL sa routes o handlers
- **Huwag** magdagdag ng logic sa `src/lib/localDb.ts` (re-export layer lamang)
- **Huwag** barrel-import mula sa `localDb.ts` — mag-import ng tiyak na `db/` modules sa halip
- DB singleton: `getDbInstance()` mula sa `src/lib/db/core.ts` (WAL journaling)
- Migrations: `src/lib/db/migrations/` — versioned SQL files, idempotent, tumakbo sa transactions

### Pag-handle ng Error

- try/catch na may tiyak na uri ng error, log gamit ang pino context
- Huwag isubo ang mga error sa SSE streams — gumamit ng abort signals para sa cleanup
- Ibalik ang wastong HTTP status codes (4xx/5xx)

### Seguridad

- **Huwag** gumamit ng `eval()`, `new Function()`, o implied eval
- I-validate ang lahat ng inputs gamit ang Zod schemas
- I-encrypt ang mga kredensyal sa rest (AES-256-GCM)
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — panatilihing sanitize, Zod schemas, at unit tests na naka-align kapag nag-edit
- **Public upstream credentials** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + Firebase Web keys na nakuha mula sa public CLIs): **DAPAT** na i-embed sa pamamagitan ng `resolvePublicCred()` mula sa `open-sse/utils/publicCreds.ts` — **huwag** bilang string literals. Tingnan ang `docs/security/PUBLIC_CREDS.md` para sa mandatory pattern.
- **Error responses** (HTTP / SSE / executor / MCP handler): **DAPAT** dumaan sa `buildErrorBody()` o `sanitizeErrorMessage()` mula sa `open-sse/utils/error.ts` — **huwag** ilagay ang raw `err.stack` o `err.message` sa isang response body. Tingnan ang `docs/security/ERROR_SANITIZATION.md`.
- **Shell commands na binuo mula sa mga variable**: kapag tinatawag ang `exec()`/`spawn()` gamit ang isang script na nangangailangan ng runtime values, ipasa ang mga ito sa pamamagitan ng `env` option (automatically shell-escaped) — **huwag** string-interpolate ang hindi mapagkakatiwalaan/external paths sa script body. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Secure-by-default libraries** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): mas gusto ang Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink sa mga custom implementations sa tuwing nagdadagdag ng bagong security-sensitive surfaces.

---

## Karaniwang Senaryo ng Pagbabago

### Pagdaragdag ng Bagong Provider

1. Irehistro sa `src/shared/constants/providers.ts` (Zod-validated sa load)
2. Magdagdag ng executor sa `open-sse/executors/` kung kinakailangan ng custom logic (palawakin ang `BaseExecutor`)
3. Magdagdag ng translator sa `open-sse/translator/` kung hindi OpenAI format
4. Magdagdag ng OAuth config sa `src/lib/oauth/constants/oauth.ts` kung batay sa OAuth — kung ang upstream CLI ay naglalabas ng public client_id/secret, i-embed sa pamamagitan ng `resolvePublicCred()` (tingnan ang `docs/security/PUBLIC_CREDS.md`), **huwag** bilang literal
5. Irehistro ang mga modelo sa `open-sse/config/providerRegistry.ts`
6. Sumulat ng mga tests sa `tests/unit/` (isama ang publicCreds shape assertion kung nagdagdag ka ng bagong embedded default)

### Pagdaragdag ng Bagong API Route

1. Lumikha ng directory sa ilalim ng `src/app/api/v1/your-route/`
2. Lumikha ng `route.ts` na may `GET`/`POST` handlers
3. Sundin ang pattern: CORS → Zod body validation → optional auth → handler delegation
4. Ang handler ay pupunta sa `open-sse/handlers/` (mag-import mula doon, hindi inline)
5. Ang mga error responses ay gumagamit ng `buildErrorBody()` / `errorResponse()` mula sa `open-sse/utils/error.ts` (auto-sanitized — huwag ilagay ang `err.stack` o `err.message` raw sa body). Tingnan ang `docs/security/ERROR_SANITIZATION.md`.
6. Magdagdag ng mga tests — kabilang ang hindi bababa sa isang assertion na ang mga error responses ay hindi nag-leak ng stack traces (`!body.error.message.includes("at /")`)

### Pagdaragdag ng Bagong DB Module

1. Lumikha ng `src/lib/db/yourModule.ts` — mag-import ng `getDbInstance` mula sa `./core.ts`
2. I-export ang mga CRUD functions para sa iyong domain table(s)
3. Magdagdag ng migration sa `src/lib/db/migrations/` kung kinakailangan ng mga bagong tables
4. I-re-export mula sa `src/lib/localDb.ts` (magdagdag sa re-export list lamang)
5. Sumulat ng mga tests

### Pagdaragdag ng Bagong MCP Tool

1. Magdagdag ng tool definition sa `open-sse/mcp-server/tools/` na may Zod input schema + async handler
2. Irehistro sa tool set (wired ng `createMcpServer()`)
3. I-assign sa naaangkop na scope(s)
4. Sumulat ng mga tests (tool invocation na na-log sa `mcp_audit` table)

### Pagdaragdag ng Bagong A2A Skill

1. Lumikha ng skill sa `src/lib/a2a/skills/` (5 na umiiral na: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Ang skill ay tumatanggap ng task context (mga mensahe, metadata) → nagbabalik ng structured result
3. Irehistro sa `A2A_SKILL_HANDLERS` sa `src/lib/a2a/taskExecution.ts`
4. I-expose sa `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Sumulat ng mga tests sa `tests/unit/`
6. I-document sa `docs/frameworks/A2A-SERVER.md` skill table

### Pagdaragdag ng Bagong Cloud Agent

1. Lumikha ng agent class sa `src/lib/cloudAgent/agents/` na nagpapalawak ng `CloudAgentBase` (3 na umiiral na: codex-cloud, devin, jules)
2. I-implement ang `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Irehistro sa `src/lib/cloudAgent/registry.ts`
4. Magdagdag ng OAuth/credentials handling kung kinakailangan (`src/lib/oauth/providers/`)
5. Mga tests + i-document sa `docs/frameworks/CLOUD_AGENT.md`

### Pagdaragdag ng Bagong Guardrail / Eval / Skill / Webhook event

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook event: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Dokumentasyon ng Sanggunian

Para sa anumang hindi simpleng pagbabago, basahin muna ang kaukulang malalim na pagsusuri:

| Lugar                                           | Dokumento                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| Nabigasyon ng Repo                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arkitektura                                     | `docs/architecture/ARCHITECTURE.md`                               |
| Sanggunian sa engineering                       | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-factor scoring, 14 estratehiya)   | `docs/routing/AUTO-COMBO.md`                                      |
| Resilience (3 mekanismo)                        | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Reasoning replay                                | `docs/routing/REASONING_REPLAY.md`                                |
| Balangkas ng kasanayan                          | `docs/frameworks/SKILLS.md`                                       |
| Sistema ng memorya (FTS5 + Qdrant)              | `docs/frameworks/MEMORY.md`                                       |
| Mga ahente ng ulap                              | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Mga guardrails (PII / injection / vision)       | `docs/security/GUARDRAILS.md`                                     |
| Pampublikong upstream credentials (Gemini/etc.) | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitization ng mensahe ng error                | `docs/security/ERROR_SANITIZATION.md`                             |
| Evals                                           | `docs/frameworks/EVALS.md`                                        |
| Pagsunod / audit                                | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                        | `docs/frameworks/WEBHOOKS.md`                                     |
| Pipeline ng awtorisasyon                        | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / fingerprint)                     | `docs/security/STEALTH_GUIDE.md`                                  |
| Mga protocol ng ahente (A2A / ACP / Cloud)      | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP server                                      | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A server                                      | `docs/frameworks/A2A-SERVER.md`                                   |
| Sanggunian ng API + OpenAPI                     | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Katalogo ng provider (auto-generated)           | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Daloy ng release                                | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Pagsubok

| Ano                     | Utos                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| Unit tests              | `npm run test:unit`                                                  |
| Isang file              | `node --import tsx/esm --test tests/unit/file.test.ts`               |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                |
| E2E (Playwright)        | `npm run test:e2e`                                                   |
| Protocol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                         |
| Ecosystem               | `npm run test:ecosystem`                                             |
| Coverage gate           | `npm run test:coverage` (75/75/75/70 — pahayag/linya/fuctions/sanga) |
| Coverage report         | `npm run coverage:report`                                            |

**PR patakaran**: Kung babaguhin mo ang production code sa `src/`, `open-sse/`, `electron/`, o `bin/`, kailangan mong isama o i-update ang mga pagsubok sa parehong PR.

**Pabor sa test layer**: unit muna → integration (multi-module o estado ng DB) → e2e (UI/workflow lamang). I-encode ang mga bug reproductions bilang automated tests bago o kasabay ng pag-aayos.

**Copilot coverage policy**: Kapag ang isang PR ay nagbabago ng production code at ang coverage ay mas mababa sa 75% (pahayag/linya/fuctions) o 70% (sanga), huwag lamang i-report — magdagdag o mag-update ng mga pagsubok, muling patakbuhin ang coverage gate, pagkatapos ay humingi ng kumpirmasyon. Isama ang mga utos na pinatakbo, mga nabagong test files, at huling resulta ng coverage sa PR report.

---

## Git Workflow

```bash
# Huwag kailanman mag-commit nang direkta sa main
git checkout -b feat/your-feature
git commit -m "feat: ilarawan ang iyong pagbabago"
git push -u origin feat/your-feature
```

**Branch prefixes**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format ng commit** (Conventional Commits): `feat(db): add circuit breaker` — scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Kapaligiran

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, target ES2022, module esnext, resolution bundler
- **Path aliases**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Default port**: 20128 (API + dashboard sa parehong port)
- **Data directory**: `DATA_DIR` env var, default sa `~/.omniroute/`
- **Key env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` pagkatapos ay bumuo ng `JWT_SECRET` (`openssl rand -base64 48`) at `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Mahigpit na Mga Patakaran

1. Huwag kailanman mag-commit ng mga lihim o kredensyal
2. Huwag kailanman magdagdag ng lohika sa `localDb.ts`
3. Huwag kailanman gumamit ng `eval()` / `new Function()` / implied eval
4. Huwag kailanman mag-commit nang direkta sa `main`
5. Huwag kailanman magsulat ng raw SQL sa mga ruta — gumamit ng `src/lib/db/` modules
6. Huwag kailanman tahimik na lunukin ang mga error sa SSE streams
7. Palaging i-validate ang mga input gamit ang Zod schemas
8. Palaging isama ang mga pagsubok kapag binabago ang production code
9. Ang coverage ay dapat manatili ≥75% (pahayag, linya, functions) / ≥70% (sanga). Kasalukuyang nasusukat: ~82%.
10. Huwag kailanman balewalain ang mga Husky hooks (`--no-verify`, `--no-gpg-sign`) nang walang tahasang pag-apruba ng operator.
11. Huwag kailanman isama ang pampublikong upstream OAuth client_id/secret o Firebase Web keys bilang string literals — palaging dumaan sa `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Tingnan ang `docs/security/PUBLIC_CREDS.md`.
12. Huwag kailanman ibalik ang raw `err.stack` / `err.message` sa HTTP / SSE / executor responses — palaging dumaan sa `buildErrorBody()` o `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Tingnan ang `docs/security/ERROR_SANITIZATION.md`.
13. Huwag kailanman mag-string-interpolate ng mga panlabas na landas o runtime values sa mga shell scripts na ipinasa sa `exec()`/`spawn()` — ipasa sa pamamagitan ng `env` option sa halip. Sanggunian: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Huwag kailanman balewalain ang isang CodeQL / Secret-Scanning alert nang walang (a) unang pag-check sa pattern docs sa itaas upang makita kung ang helper ay naaangkop, at (b) pag-record ng teknikal na dahilan sa dismissal comment. Precedent: `js/stack-trace-exposure` na itinaas sa callsites na dumaan na sa `sanitizeErrorMessage()` ay isang kilalang limitasyon ng CodeQL (hindi kinikilala ang mga custom sanitizers) — balewalain bilang `false positive` na tumutukoy sa `docs/security/ERROR_SANITIZATION.md`.
15. Huwag kailanman ilantad ang mga ruta na nagbubukas ng mga child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) nang walang `isLocalOnlyPath()` classification sa `src/server/authz/routeGuard.ts`. Ang enforcement ng loopback ay nangyayari nang walang kondisyon bago ang anumang auth check — ang na-leak na JWT sa pamamagitan ng tunnel ay hindi maaaring mag-trigger ng process spawning. Tingnan ang `docs/security/ROUTE_GUARD_TIERS.md`.
16. Huwag kailanman isama ang `Co-Authored-By` trailers na nagbibigay ng kredito sa AI assistant, LLM, o automation account (hal. mga pangalan na naglalaman ng "Claude", "GPT", "Copilot", "Bot"; mga email sa `anthropic.com` / `openai.com` / `noreply.github.com` addresses na pag-aari ng bots). Ang ganitong trailers ay nagru-route ng commit attribution sa bot account sa GitHub, na nagtatago sa tunay na may-akda (`diegosouzapw`) sa PR history. Ang mga taong kolaborator — kabilang ang mga upstream PR authors at issue reporters na ini-port sa OmniRoute — ay MAAARI at DAPAT bigyan ng kredito gamit ang standard `Co-authored-by: Name <email>` trailers; umaasa rito ang upstream-port workflows (`/port-upstream-features`, `/port-upstream-issues`).
