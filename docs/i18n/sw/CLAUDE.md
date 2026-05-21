# CLAUDE.md (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Hii faili inatoa mwongozo kwa Claude Code (claude.ai/code) unapofanya kazi na msimbo katika hifadhi hii.

## Mwanzo wa Haraka

```bash
npm install                    # Sakinisha deps (inasanifisha .env kutoka .env.example)
npm run dev                    # Seva ya maendeleo katika http://localhost:20128
npm run build                  # Ujenzi wa uzalishaji (Next.js 16 standalone)
npm run lint                   # ESLint (makosa 0 yanatarajiwa; onyo ni ya awali)
npm run typecheck:core         # Ukaguzi wa TypeScript (inapaswa kuwa safi)
npm run typecheck:noimplicit:core  # Ukaguzi mkali (hakuna implicit any)
npm run test:coverage          # Jaribio la kitengo + lango la kufunika (75/75/75/70 — taarifa/mstari/funzioni/matengo)
npm run check                  # lint + jaribio pamoja
npm run check:cycles           # Gundua utegemezi wa mzunguko
```

### Kuendesha Majaribio

```bash
# Faili moja la jaribio (mwanzo wa jaribio la asili la Node.js — majaribio mengi)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (seva ya MCP, autoCombo, cache)
npm run test:vitest

# Suite zote
npm run test:all
```

Kwa matrix kamili ya majaribio, angalia `CONTRIBUTING.md` → "Kuendesha Majaribio". Kwa usanifu wa kina, angalia `AGENTS.md`.

---

## Mradi kwa Muonekano

**OmniRoute** — proxy/router ya AI iliyounganishwa. Kipengele kimoja, watoa huduma 160+, auto-fallback.

| Tabaka        | Mahali                  | Kusudi                                                                   |
| ------------- | ----------------------- | ------------------------------------------------------------------------ |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — maeneo ya kuingia                                   |
| Handlers      | `open-sse/handlers/`    | Usindikaji wa maombi (chat, embeddings, nk)                              |
| Executors     | `open-sse/executors/`   | Usambazaji wa HTTP maalum kwa mtoa huduma                                |
| Translators   | `open-sse/translator/`  | Mabadiliko ya muundo (OpenAI↔Claude↔Gemini)                              |
| Transformer   | `open-sse/transformer/` | API za majibu ↔ Kukamilisha Chat                                         |
| Services      | `open-sse/services/`    | Uelekeo wa combo, mipaka ya viwango, caching, nk                         |
| Database      | `src/lib/db/`           | Moduli za eneo la SQLite (faili 45+, uhamasishaji 55)                    |
| Domain/Policy | `src/domain/`           | Injini ya sera, sheria za gharama, mantiki ya fallback                   |
| MCP Server    | `open-sse/mcp-server/`  | Zana 37 (30 msingi + 3 kumbukumbu + 4 ujuzi), usafirishaji 3, ~13 maeneo |
| A2A Server    | `src/lib/a2a/`          | Itifaki ya wakala ya JSON-RPC 2.0                                        |
| Skills        | `src/lib/skills/`       | Mfumo wa ujuzi unaoweza kupanuliwa                                       |
| Memory        | `src/lib/memory/`       | Kumbukumbu ya mazungumzo ya kudumu                                       |

Monorepo: `src/` (programu ya Next.js 16), `open-sse/` (nafasi ya injini ya utiririshaji), `electron/` (programu ya desktop), `tests/`, `bin/` (kiingilio cha CLI).

---

## Mchakato wa Ombi

```
Client → /v1/chat/completions (Njia ya Next.js)
  → CORS → Uthibitisho wa Zod → uthibitisho? → ukaguzi wa sera → ulinzi wa kuingiza maelekezo
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → ukaguzi wa cache → kikomo cha kiwango → mwelekeo wa combo?
      → resolveComboTargets() → handleSingleModel() kwa kila lengo
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → jaribu tena w/ backoff
    → tafsiri ya majibu → mkondo wa SSE au JSON
    → Ikiwa ni API za Majibu: responsesTransformer.ts TransformStream
```

Njia za API zinafuata muundo thabiti: `Njia → CORS preflight → Uthibitisho wa Zod → Uthibitisho wa hiari (extractApiKey/isValidApiKey) → Utekelezaji wa sera ya ufunguo wa API → Delegation ya Handler (open-sse)`. Hakuna middleware ya kimataifa ya Next.js — kukatiza ni maalum kwa njia.

**Mwelekeo wa combo** (`open-sse/services/combo.ts`): mikakati 14 (kipaumbele, uzito, kujaza-kwanza, mzunguko, P2C, nasibu, inayotumika kidogo, iliyoboreshwa kwa gharama, inayojua kurekebisha, nasibu kali, auto, lkgp, iliyoboreshwa kwa muktadha, relay ya muktadha). Kila lengo linaita `handleSingleModel()` ambayo inazunguka `handleChatCore()` na usimamizi wa makosa ya kila lengo na ukaguzi wa circuit breaker. Tazama `docs/routing/AUTO-COMBO.md` kwa alama za Auto-Combo za sababu 9 na `docs/architecture/RESILIENCE_GUIDE.md` kwa tabaka 3 za uhimilivu.

---

## Hali ya Uhimilivu wa Wakati

OmniRoute ina mitambo mitatu inayohusiana lakini tofauti ya kushindwa kwa muda. Hifadhi upeo wao tofauti unapofanya ufuatiliaji wa tabia ya mwelekeo. Tazama
[chati ya uhimilivu ya tabaka 3](./docs/diagrams/exported/resilience-3layers.svg)
(chanzo: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
kwa ramani ya haraka.

### Mzigo wa Circuit wa Mtoa

**Upeo**: mtoa mzima, mfano `glm`, `openai`, `anthropic`.

**Madhumuni**: kusitisha kutuma trafiki kwa mtoa ambaye anashindwa mara kwa mara katika
ngazi ya upstream/service, ili mtoa mmoja asiye na afya usichelewesha kila ombi.

**Utekelezaji**:

- Darasa kuu: `src/shared/utils/circuitBreaker.ts`
- Nyaya za lango la mazungumzo/utekelezaji: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ya hali ya wakati: `src/app/api/monitoring/health/route.ts`
- Vifungashio vya pamoja: `open-sse/services/accountFallback.ts`
- Jedwali la hali lililohifadhiwa: `domain_circuit_breakers`

**Hali**:

- `CLOSED`: trafiki ya kawaida inaruhusiwa.
- `OPEN`: mtoa amezuiwa kwa muda; wito hupata jibu la mtoa-circuit-open
  au mwelekeo wa combo unakosa lengo lingine.
- `HALF_OPEN`: muda wa kurekebisha umepita; ruhusu ombi la uchunguzi. Mafanikio yanakamilisha
  breaker, kushindwa kunafungua tena.

**Defaults** (`open-sse/config/constants.ts`):

- Watoa wa OAuth: kigezo `3`, muda wa kurekebisha `60s`.
- Watoa wa ufunguo wa API: kigezo `5`, muda wa kurekebisha `30s`.
- Watoa wa ndani: kigezo `2`, muda wa kurekebisha `15s`.

Ni lazima tu hali za kushindwa za kiwango cha mtoa zifanye kazi ya breaker ya mtoa:

```ts
(408, 500, 502, 503, 504);
```

Usiweke breaker ya mtoa mzima kwa makosa ya kawaida ya akaunti/ufunguo/model kama vile
mambo mengi ya `401`, `403`, au `429`. Hayo kwa kawaida yanahusiana na kupoa kwa muunganisho au kufungwa kwa mfano. Mtoa wa ufunguo wa API wa jumla `403` unapaswa kuwa na uwezo wa kupona isipokuwa ikitambulika
kama kosa la mwisho la mtoa/akaunti.

Breaker hutumia urejeleaji wa polepole, sio kipima muda cha nyuma. Wakati `OPEN` inakoma, kusoma kama
`getStatus()`, `canExecute()`, na `getRetryAfterMs()` kunarejesha hali kuwa
`HALF_OPEN`, ili dashibodi na wajenzi wa wagombea wa combo wasiendelee kuondoa mtoa aliyeisha muda milele.

### Kupoa kwa Muunganisho

**Upeo**: muunganisho mmoja wa mtoa/akaunti/ufunguo.

**Madhumuni**: kupita kwa muda ufunguo mmoja mbaya/akaunti huku ikiruhusu muunganisho mingine kwa
mtoa huyo kuendelea kutumikia maombi.

**Utekelezaji**:

- Njia ya kuandika/update: `src/sse/services/auth.ts::markAccountUnavailable()`
- Uchaguzi wa akaunti/kuchuja: `src/sse/services/auth.ts::getProviderCredentials...`
- Hesabu ya kupoa: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Mipangilio: `src/lib/resilience/settings.ts`

Sehemu muhimu kwenye muunganisho wa mtoa:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Wakati wa uchaguzi wa akaunti, muunganisho unakosa wakati:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Kupoa pia ni polepole: wakati `rateLimitedUntil` iko nyuma, muunganisho unakuwa
unaweza tena. Kwa matumizi ya mafanikio, `clearAccountError()` inafuta `testStatus`,
`rateLimitedUntil`, sehemu za makosa, na `backoffLevel`.

Tabia ya msingi ya kupoa muunganisho:

- Msingi wa kupoa wa OAuth: `5s`.
- Msingi wa kupoa wa ufunguo wa API: `3s`.
- Ufunguo wa API `429` unapaswa kupendelea vidokezo vya kujaribu tena vya upstream (`Retry-After`, vichwa vya kurekebisha, au
  maandiko ya kurekebisha yanayoweza kuchambuliwa) inapopatikana.
- Kushindwa kwa kurudi nyuma mara kwa mara hutumia urejeleaji wa kuongezeka:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Mlinzi wa kuzuia thundering-herd unazuia kushindwa kwa wakati mmoja kwenye muunganisho huo huo kutoka
kuongeza muda wa kupoa mara kwa mara au kuongezeka mara mbili kwa `backoffLevel`.

Hali za mwisho si kupoa. `banned`, `expired`, na `credits_exhausted` zinakusudiwa kubaki zisipatikane hadi
kuhifadhi au mipangilio kubadilika au opereta akizirekebisha. Usifute hali za mwisho kwa hali ya kupoa ya muda.

### Kufungwa kwa Mfano

**Upeo**: mtoa + muunganisho + mfano.

**Madhumuni**: kuepuka kuzima muunganisho mzima wakati mfano mmoja tu haupatikani au
umewekwa kikomo kwa muunganisho huo.

Mifano:

- Watoa wa quota kwa mfano wanaorejelea `429`.
- Watoa wa ndani wanaorejelea `404` kwa mfano mmoja uliokosekana.
- Kushindwa kwa ruhusa ya mfano/mode maalum wa mtoa kama vile modes za Grok zilizochaguliwa.

Kufungwa kwa mfano kunaishi katika `open-sse/services/accountFallback.ts` na inaruhusu muunganisho huo huo kuendelea kutumikia mifano mingine.

### Mwongozo wa Ufuatiliaji

- Ikiwa funguo zote za mtoa zimeachwa, angalia hali ya breaker ya mtoa na kila
  muunganisho wa `rateLimitedUntil`/`testStatus`.
- Ikiwa mtoa anaonekana kuondolewa milele baada ya dirisha la kurekebisha, angalia ikiwa msimbo
  unasoma `state` halisi badala ya kutumia `getStatus()`/`canExecute()`.
- Ikiwa funguo moja ya mtoa inashindwa lakini zingine zinapaswa kufanya kazi, pendelea kupoa kwa muunganisho badala ya breaker ya mtoa.
- Ikiwa mfano mmoja tu unashindwa, pendelea kufungwa kwa mfano badala ya kupoa kwa muunganisho.
- Ikiwa hali inapaswa kujiokoa yenyewe, inapaswa kuwa na alama ya wakati wa baadaye/muda wa kurekebisha na njia ya
  kusoma inayorejesha hali iliyokwisha muda. Hali za kudumu zinahitaji mabadiliko ya mikopo
  au mipangilio kwa mkono.

## Misingi Muhimu

### Mtindo wa Kanuni

- **Spaces 2**, semicolons, double quotes, upana wa herufi 100, es5 trailing commas (inasimamiwa na lint-staged kupitia Prettier)
- **Maaliko**: nje → ndani (`@/`, `@omniroute/open-sse`) → ya uhusiano
- **Majina**: faili=camelCase/kebab, vipengele=PascalCase, constants=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = kosa kila mahali; `no-explicit-any` = onyo katika `open-sse/` na `tests/`
- **TypeScript**: `strict: false`, lengo ES2022, moduli esnext, resolution bundler. Prefer explicit types.

### Hifadhidata

- **Daima** pitia moduli za eneo `src/lib/db/` — **kamwe** usiandike SQL safi katika njia au wakala
- **Kamwe** usiongeze mantiki katika `src/lib/localDb.ts` (safi ya re-export tu)
- **Kamwe** usi-import barrel kutoka `localDb.ts` — badala yake, import moduli maalum za `db/`
- DB singleton: `getDbInstance()` kutoka `src/lib/db/core.ts` (WAL journaling)
- Migrations: `src/lib/db/migrations/` — faili za SQL zenye toleo, idempotent, zitekelezwe katika muamala

### Kushughulikia Makosa

- jaribu/catch na aina maalum za makosa, log na muktadha wa pino
- Kamwe usifanye makosa katika SSE streams — tumia ishara za kukatisha kwa usafishaji
- Rudisha msimamo sahihi wa HTTP (4xx/5xx)

### Usalama

- **Kamwe** usitumie `eval()`, `new Function()`, au eval iliyodhaniwa
- Thibitisha kila ingizo kwa kutumia Zod schemas
- Ficha akidi wakati wa kupumzika (AES-256-GCM)
- Orodha ya vichwa vya juu ya denylist: `src/shared/constants/upstreamHeaders.ts` — panua sanitize, Zod schemas, na vipimo vya kitengo vinavyolingana unapohariri
- **Akidi za umma za juu** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + Firebase Web keys zilizochukuliwa kutoka kwa CLIs za umma): **LAZIMA** ziwe zimeingizwa kupitia `resolvePublicCred()` kutoka `open-sse/utils/publicCreds.ts` — **kamwe** kama maandiko ya herufi. Tazama `docs/security/PUBLIC_CREDS.md` kwa muundo wa lazima.
- **Majibu ya makosa** (HTTP / SSE / executor / MCP handler): **LAZIMA** ipitie `buildErrorBody()` au `sanitizeErrorMessage()` kutoka `open-sse/utils/error.ts` — **kamwe** usiweke `raw err.stack` au `raw err.message` katika mwili wa majibu. Tazama `docs/security/ERROR_SANITIZATION.md`.
- **Amri za shell zilizojengwa kutoka kwa mabadiliko**: unapoitisha `exec()`/`spawn()` na skripti inayohitaji thamani za wakati wa kukimbia, zipitisheni kupitia chaguo la `env` (imekimbizwa kiotomatiki) — **kamwe** usiingize mabadiliko yasiyoaminika/ya nje katika mwili wa skripti. Rejelea: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Maktaba salama kwa default** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): pendelea Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink kuliko utekelezaji wa kawaida kila wakati unapoongeza uso mpya wa usalama.

---

## Mifano ya Marekebisho ya Kawaida

### Kuongeza Mtoa Huduma Mpya

1. Jisajili katika `src/shared/constants/providers.ts` (Zod-validated wakati wa kupakia)
2. Ongeza mtendaji katika `open-sse/executors/` ikiwa mantiki maalum inahitajika (panua `BaseExecutor`)
3. Ongeza mtafsiri katika `open-sse/translator/` ikiwa si muundo wa OpenAI
4. Ongeza usanidi wa OAuth katika `src/lib/oauth/constants/oauth.ts` ikiwa ni msingi wa OAuth — ikiwa CLI ya juu inatoa client_id/secret ya umma, ingiza kupitia `resolvePublicCred()` (tazama `docs/security/PUBLIC_CREDS.md`), **kamwe** kama maandiko
5. Jisajili mifano katika `open-sse/config/providerRegistry.ts`
6. Andika vipimo katika `tests/unit/` (jumuisha uthibitisho wa umbo la publicCreds ikiwa umeongeza default mpya iliyounganishwa)

### Kuongeza Njia Mpya ya API

1. Unda directory chini ya `src/app/api/v1/your-route/`
2. Unda `route.ts` na wakala wa `GET`/`POST`
3. Fuata muundo: CORS → uthibitisho wa mwili wa Zod → uthibitisho wa hiari → ugawaji wa wakala
4. Wakala huenda katika `open-sse/handlers/` (import kutoka hapo, si inline)
5. Majibu ya makosa yanatumia `buildErrorBody()` / `errorResponse()` kutoka `open-sse/utils/error.ts` (imekimbizwa kiotomatiki — kamwe usiweke `raw err.stack` au `raw err.message` katika mwili). Tazama `docs/security/ERROR_SANITIZATION.md`.
6. Ongeza vipimo — ikiwa ni pamoja na angalau uthibitisho mmoja kwamba majibu ya makosa hayavuji nyaraka za stack (`!body.error.message.includes("at /")`)

### Kuongeza Moduli Mpya ya DB

1. Unda `src/lib/db/yourModule.ts` — import `getDbInstance` kutoka `./core.ts`
2. Export kazi za CRUD kwa ajili ya jedwali lako la eneo
3. Ongeza uhamasishaji katika `src/lib/db/migrations/` ikiwa jedwali mpya zinahitajika
4. Re-export kutoka `src/lib/localDb.ts` (ongeza kwenye orodha ya re-export tu)
5. Andika vipimo

### Kuongeza Zana Mpya ya MCP

1. Ongeza ufafanuzi wa zana katika `open-sse/mcp-server/tools/` na muundo wa ingizo la Zod + wakala wa async
2. Jisajili katika seti ya zana (imeunganishwa na `createMcpServer()`)
3. Teua kwa upeo unaofaa
4. Andika vipimo (kuitisha zana kunarekodiwa kwenye jedwali la `mcp_audit`)

### Kuongeza Ujuzi Mpya wa A2A

1. Unda ujuzi katika `src/lib/a2a/skills/` (5 tayari zipo: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Ujuzi unapata muktadha wa kazi (jumbe, metadata) → unarudisha matokeo yaliyoandaliwa
3. Jisajili katika `A2A_SKILL_HANDLERS` katika `src/lib/a2a/taskExecution.ts`
4. Funua katika `src/app/.well-known/agent.json/route.ts` (Kadi ya Wakala)
5. Andika vipimo katika `tests/unit/`
6. Andika katika `docs/frameworks/A2A-SERVER.md` jedwali la ujuzi

### Kuongeza Wakala Mpya wa Cloud

1. Unda darasa la wakala katika `src/lib/cloudAgent/agents/` ukipanua `CloudAgentBase` (3 tayari zipo: codex-cloud, devin, jules)
2. Tekeleza `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Jisajili katika `src/lib/cloudAgent/registry.ts`
4. Ongeza usimamizi wa OAuth/akidi ikiwa inahitajika (`src/lib/oauth/providers/`)
5. Vipimo + andika katika `docs/frameworks/CLOUD_AGENT.md`

### Kuongeza Guardrail Mpya / Eval / Ujuzi / Tukio la Webhook

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Ujuzi (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Tukio la Webhook: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Hati ya Marejeleo

Kwa mabadiliko yoyote yasiyo ya kawaida, soma uchambuzi unaofanana kwanza:

| Eneo                                             | Hati                                                              |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| Usafiri wa repo                                  | `docs/architecture/REPOSITORY_MAP.md`                             |
| Muktadha                                         | `docs/architecture/ARCHITECTURE.md`                               |
| Marejeleo ya uhandisi                            | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (alama 9, mikakati 14)                | `docs/routing/AUTO-COMBO.md`                                      |
| Ustahimilivu (mekaniki 3)                        | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Kurudi kwa mantiki                               | `docs/routing/REASONING_REPLAY.md`                                |
| Mfumo wa ujuzi                                   | `docs/frameworks/SKILLS.md`                                       |
| Mfumo wa kumbukumbu (FTS5 + Qdrant)              | `docs/frameworks/MEMORY.md`                                       |
| Wakala wa wingu                                  | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Miongozo (PII / sindikizo / maono)               | `docs/security/GUARDRAILS.md`                                     |
| Akreditivu za umma za juu (Gemini/n.k.)          | `docs/security/PUBLIC_CREDS.md`                                   |
| Usafi wa ujumbe wa makosa                        | `docs/security/ERROR_SANITIZATION.md`                             |
| Tathmini                                         | `docs/frameworks/EVALS.md`                                        |
| Uzingatiaji / ukaguzi                            | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                         | `docs/frameworks/WEBHOOKS.md`                                     |
| Mchakato waidhinisha                             | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Usiri (TLS / alama ya vidole)                    | `docs/security/STEALTH_GUIDE.md`                                  |
| Itifaki za wakala (A2A / ACP / Wingu)            | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Seva ya MCP                                      | `docs/frameworks/MCP-SERVER.md`                                   |
| Seva ya A2A                                      | `docs/frameworks/A2A-SERVER.md`                                   |
| Marejeleo ya API + OpenAPI                       | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Katalogi ya wasambazaji (iliyoundwa kiotomatiki) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Mchakato wa kutolewa                             | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Kupima

| Nini                    | Amri                                                                    |
| ----------------------- | ----------------------------------------------------------------------- |
| Vipimo vya kitengo      | `npm run test:unit`                                                     |
| Faili moja              | `node --import tsx/esm --test tests/unit/file.test.ts`                  |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                   |
| E2E (Playwright)        | `npm run test:e2e`                                                      |
| Protokali E2E (MCP+A2A) | `npm run test:protocols:e2e`                                            |
| Mfumo                   | `npm run test:ecosystem`                                                |
| Lango la kufunika       | `npm run test:coverage` (75/75/75/70 — taarifa/mstari/funzo/mat branch) |
| Ripoti ya kufunika      | `npm run coverage:report`                                               |

**Kanuni ya PR**: Ikiwa unabadilisha msimbo wa uzalishaji katika `src/`, `open-sse/`, `electron/`, au `bin/`, lazima uweke au uboreshe vipimo katika PR hiyo hiyo.

**Upendeleo wa tabaka la mtihani**: kitengo kwanza → uunganisho (moduli nyingi au hali ya DB) → e2e (UI/mchakato tu). Fanya urekebishaji wa bug kama vipimo vya kiotomatiki kabla au pamoja na suluhisho.

**Sera ya kufunika ya Copilot**: Wakati PR inabadilisha msimbo wa uzalishaji na kufunika iko chini ya 75% (taarifa/mstari/funzo) au 70% (mata branch), usiweke tu ripoti — ongeza au boresha vipimo, rudisha lango la kufunika, kisha omba uthibitisho. Jumuisha amri zilizotekelezwa, faili za mtihani zilizobadilishwa, na matokeo ya mwisho ya kufunika katika ripoti ya PR.

---

## Mchakato wa Git

```bash
# Kamwe usiweke moja kwa moja kwenye main
git checkout -b feat/your-feature
git commit -m "feat: eleza mabadiliko yako"
git push -u origin feat/your-feature
```

**Viambatisho vya tawi**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Muundo wa commit** (Conventional Commits): `feat(db): ongeza circuit breaker` — maeneo: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Mazingira

- **Muda wa kukimbia**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, Moduli za ES
- **TypeScript**: 5.9+, lengo ES2022, moduli esnext, ufumbuzi wa bundler
- **Majina ya njia**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Bandari ya kawaida**: 20128 (API + dashibodi kwenye bandari moja)
- **Direktori ya data**: `DATA_DIR` env var, inarudiwa kwa `~/.omniroute/`
- **Vigezo muhimu vya env**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Mipangilio: `cp .env.example .env` kisha tengeneza `JWT_SECRET` (`openssl rand -base64 48`) na `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Kanuni Ngumu

1. Kamwe usiweke siri au akidi
2. Kamwe usiongeze mantiki kwenye `localDb.ts`
3. Kamwe usitumie `eval()` / `new Function()` / eval iliyodhaniwa
4. Kamwe usiweke moja kwa moja kwenye `main`
5. Kamwe usiandike SQL safi katika njia — tumia moduli za `src/lib/db/`
6. Kamwe usinyamaze makosa kwa kimya katika SSE streams
7. Daima thibitisha ingizo kwa kutumia Zod schemas
8. Daima jumuisha vipimo unapobadilisha msimbo wa uzalishaji
9. Kufunika lazima kubaki ≥75% (taarifa, mistari, funzo) / ≥70% (mata branch). Kiwango cha sasa kilichopimwa: ~82%.
10. Kamwe usipite Husky hooks (`--no-verify`, `--no-gpg-sign`) bila idhini ya wazi ya opereta.
11. Kamwe usiweke funguo za umma za OAuth client_id/secret au funguo za Firebase Web kama maandiko ya maandiko — daima pitia `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Tazama `docs/security/PUBLIC_CREDS.md`.
12. Kamwe usirudishe `raw err.stack` / `err.message` katika HTTP / SSE / majibu ya mtendaji — daima pitia kupitia `buildErrorBody()` au `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Tazama `docs/security/ERROR_SANITIZATION.md`.
13. Kamwe usiingize njia za nje au thamani za kukimbia katika scripts za shell zinazopitishwa kwa `exec()`/`spawn()` — pitisha kupitia chaguo la `env` badala yake. Kumbuka: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Kamwe usikatae arifa za CodeQL / Secret-Scanning bila (a) kwanza kuangalia hati za muundo hapo juu kuona kama msaidizi anatumika, na (b) kurekodi sababu ya kiufundi katika maoni ya kukataa. Kiwango: `js/stack-trace-exposure` kilichoinuliwa kwenye maeneo ya wito ambayo tayari yanapitia `sanitizeErrorMessage()` ni ukomo unaojulikana wa CodeQL (wasafishaji wa kawaida hawatambuliwi) — kataa kama `false positive` ukirejelea `docs/security/ERROR_SANITIZATION.md`.
15. Kamwe usifichue njia zinazozalisha michakato ya watoto (`/api/mcp/`, `/api/cli-tools/runtime/`) bila uainishaji wa `isLocalOnlyPath()` katika `src/server/authz/routeGuard.ts`. Utekelezaji wa loopback unafanyika bila masharti kabla ya ukaguzi wowote wa uthibitisho — JWT iliyovuja kupitia tunnel haiwezi kuanzisha uzalishaji wa mchakato. Tazama `docs/security/ROUTE_GUARD_TIERS.md`.
16. Kamwe usijumuisha vichwa vya `Co-Authored-By` katika ujumbe wa commit. Commit lazima ionekane pekee chini ya kitambulisho cha Git cha mmiliki wa hazina (`diegosouzapw`). Mstari wa `Co-Authored-By: Claude …` unasababisha GitHub kuhusisha commits na akaunti ya `claude` ya Anthropic, ikificha mwandishi halisi katika historia ya PR.
