# Homologation Suite (`npm run homolog`) (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

በ homologation VPS ላይ የሚሰራውን OmniRoute deploy በእውነተኛ አካባቢ የሚያረጋግጥ E2E ማረጋገጫ
(`HOMOLOG_BASE_URL`፣ ለምሳሌ `http://192.168.0.15:20128`)። አንድ ትዕዛዝ የrelease STOP #2 በእጅ የሚከናወን የማረጋገጫ ዝርዝርን በራስ-ሰር በሚከናወንና ማስረጃ በሚያመነጭ ሂደት ይተካል።

## የሚሸፍነው

| ንብርብር                | የሚያረጋግጠው                                                                                                                                                                      | አተገባበር                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — ጤና/ተመሳሳይነት      | `/api/monitoring/health` በ`200`፣ በ`status: "healthy"` እና በሚጠበቀው version ምላሽ መስጠቱን                                                                                             | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — ጊዜያዊ key       | የAdmin login → `POST /api/keys` ለሂደቱ የተወሰነ scope ያለው API key ይፈጥራል፤ ውጤቱ ምንም ቢሆን በ`finally` block ውስጥ ይሻራል (`DELETE /api/keys/:id`)                                            | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — የAPI ወሰን       | የ`/v1/models` catalog፣ እውነተኛ non-streaming chat completion (tier-critical model፣ `max_tokens: 5`)፣ ልክ ላልሆነ key `401`፣ እና ይፋዊ `/api/monitoring/health`                         | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE streaming  | እውነተኛ streaming chat completion፤ `text/event-stream` መሆኑን፣ ቢያንስ አንድ content delta መኖሩን እና የ`[DONE]` ማብቂያ መኖሩን ያረጋግጣል                                                          | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — እውነተኛ providers | በቀጥታ ባለው `/v1/models` catalog ውስጥ ለሚገኝ ለእያንዳንዱ ወሳኝ provider አንድ ዝቅተኛ ወጪ ያለው chat request፣ በpromptfoo በሂደቱ ወቅት የሚመነጭ                                                           | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — የUI auth       | በእውነተኛው login form በኩል አንድ ጊዜ ይገባል፣ እና session-ን (`storageState`) በUI layer በሙሉ እንደገና ይጠቀማል                                                                                   | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — የUI routes     | በ`src/app/(dashboard)/dashboard` ስር ያለ እያንዳንዱ static `page.tsx` (ከfilesystem የሚገኝ፣ dynamic `[param]` routes የሚዘለሉ) ያለ HTTP error፣ page error ወይም የNext.js error boundary ይጫናል | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — ወሳኝ የUI ፍሰት    | በdashboard UI በኩል API key ይፈጥራል እና እንደገና ይሽረዋል (በVPS ላይ ምንም ቅሪት አይተውም)                                                                                                        | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — የተዋሃደ report    | httpYac (በ`junit-to-ctrf`)፣ promptfoo→CTRF adapter፣ እና Playwright CTRF reporter-ን ወደ አንድ `homolog-ctrf.json` ያዋህዳል፤ በተጨማሪም ለሰው ለማንበብ የሚመች `homolog-report/summary.md` ይፈጥራል   | `scripts/homolog/run.mjs`                                                     |

በreplay ራሱ ውስጥ የLLM ተሳትፎ ፈጽሞ የለም — ይህ የተወሰነ ውጤት ያለው regression battery እንጂ eval አይደለም። AI የሚገባው ወደፊት በሚደረግ የmaintenance ሥራ ውስጥ ብቻ ነው (ከታች Roadmapን ይመልከቱ)።

## ቅድመ ሁኔታዎች

1. `.env.homolog.example`ን ወደ `.env.homolog` ይቅዱ (በ git ችላ የሚባል — ፈጽሞ commit አያድርጉት) እና የሚከተሉትን ይሙሉ፦
   - `HOMOLOG_BASE_URL` — የታለመው deploy፣ ለምሳሌ `http://192.168.0.15:20128`።
   - `HOMOLOG_ADMIN_PASSWORD` — ለዚያ deploy የዳሽቦርድ አስተዳደር የይለፍ ቃል።
   - `HOMOLOG_CRITICAL_PROVIDERS` — እውነተኛ የ smoke chat ጥያቄ የሚደርሳቸው፣ በኮማ የተለያዩ የአቅራቢ ቅድመ ቅጥያዎች (ለምሳሌ `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`)።
   - `HOMOLOG_API_KEY` — በመደበኛ ሙከራዎች ባዶ ይተዉት፤ suiteው የራሱን ጊዜያዊ ቁልፍ ይፈጥራል እና ይሰርዛል። ይህን የሚያቀናብሩት አንድን layer ለብቻው debug ለማድረግ ብቻ ነው።
2. በrepoው ውስጥ `npm install`ን ያሂዱ (የsuiteው dependencies — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — መደበኛ devDependencies ናቸው)።
3. የbrowser binaries አስቀድመው ከሌሉ `npx playwright install`ን ያሂዱ።

## እንዴት እንደሚሄድ

```bash
npm run homolog
```

ስሪቱ ከአካባቢያዊው `package.json` ጋር የማይዛመድ deployን
ለማረጋገጥ (ለምሳሌ፣ አሁንም በቀደመው patch release ላይ ያለ homologation box)፣ የሚጠበቀውን
ስሪት በግልጽ override ያድርጉ፦

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

ማንኛውም layer ከወደቀ ሂደቱ ከዜሮ የተለየ የመውጫ ኮድ ይመልሳል፣ እና ቢወድቅም እንኳ ሁልጊዜ የፈጠረውን ጊዜያዊ
API key ለመሰረዝ ይሞክራል (`finally` block በ`scripts/homolog/run.mjs` ውስጥ)።

## ሪፖርቱን ማንበብ

ሁሉም ውጤቶች በ`homolog-report/` ውስጥ ይቀመጣሉ (በ git ችላ የሚባል)፦

- `summary.md` — ወደ stdout የሚታተመው ያው ሰንጠረዥ፣ ለእያንዳንዱ layer አንድ ረድፍ (✅/❌ + ዝርዝር)።
- `homolog-ctrf.json` — የተዋሃደው CTRF ሪፖርት (የAPI/SSE፣ provider-smoke እና
  UI ውጤቶች ውህደት) — ከrelease STOP #2 checklist ጋር መያያዝ ያለበት artifact ይህ ነው።
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — የእያንዳንዱ
  layer ጥሬ/መካከለኛ ሪፖርቶች።
- `promptfooconfig.yaml`, `provider-misses.json` — ለአሁኑ ሂደት የተፈጠረው promptfoo config እና
  ከቀጥታ catalog የጎደሉ ማናቸውም ወሳኝ አቅራቢዎች።

የወደቀ L0 ወዲያውኑ ሂደቱን ያቋርጣል (ምንም ጊዜያዊ ቁልፍ አይፈጠርም)፤ ምክንያቱም የስሪት/ጤና
አለመዛመድ ማለት ከዚያ በታች ያለው እያንዳንዱ layer የተሳሳተውን deploy እንደሚያረጋግጥ ማለት ነው።

## UIው በትክክል ሲለወጥ መነሻውን እንደገና ማዘጋጀት

L4b (route smoke) እና L4c (API-key UI flow) የሚመሩት በእውነተኛ DOM locators እንጂ
በsnapshots አይደለም፤ ስለዚህ አብዛኛዎቹ ትክክለኛ የUI ለውጦች የsuite ማሻሻያ አያስፈልጋቸውም። አንድ ለውጥ
locatorን ሲያበላሽ (ለምሳሌ፣ ስሙ የተቀየረ የአዝራር መለያ ወይም የተዛወረ settings page)፦

1. locatorን አሁን ካለው source ጋር እንደገና ያረጋግጡ (specsዎቹ እያንዳንዱ locator በየትኛው
   file/line እንደተረጋገጠ አስቀድመው ይመዘግባሉ — ያንኑ ንድፍ ይከተሉ፣ አይገምቱ)።
2. በ`tests/homolog/ui/` ውስጥ ያለውን spec ያዘምኑ።
3. ማስተካከያውን ለማረጋገጥ `npm run homolog`ን (ወይም የተጎዳውን Playwright spec ብቻ) በVPS ላይ
   እንደገና ያሂዱ፣ ከዚያ commit ያድርጉ።

በዚህ suite ውስጥ የvisual/pixel baseline የለም (F1) — ለዚያ Roadmapን ይመልከቱ።

## የወደፊት ዕቅድ (F2 / F3)

ዲዛይኑ እና ደረጃ በደረጃ ትግበራው በውስጣዊው የዕቅድ spec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` ውስጥ ይገኛሉ (አልተገናኘም — ውስጣዊ
`_tasks/` artifact ነው፣ የዚህ repo ክትትል ከሚደረግባቸው docs ክፍል አይደለም)። ማጠቃለያ፦

- **F2** — ሙሉ walkthrough recording → Playwright Test Agents (`planner`/`generator`)
  ወደ flow specs ይቀይሩታል (combo መፍጠር፣ providerን መፈተሽ፣ settingsን ማርትዕ፣ MCP tools) +
  ተለዋዋጭ dataን (metrics፣ timestamps፣ logs) የሚሸፍኑ masks ያሉት visual regression baseline (Lost Pixel) +
  ለእያንዳንዱ release የ`healer` የጥገና ሂደት።
- **F3** — የresilience/contract/wiring ሽፋን፦ toxiproxy + በdevbox ላይ ያለ አስመሳይ OpenAI-compatible
  provider፣ ወደ እሱ የተጠቆመ በVPS ላይ ያለ `homolog-resilience` combo
  (የተገባ timeout → fallbackን + circuit breaker open/closeን በ
  `/api/monitoring/health` በኩል ማረጋገጥ)፤ ከ
  `docs/openapi.yaml` ጋር gated Schemathesis contract testing (ዝቅተኛ `--max-examples`፣ ቋሚ seeds፣ LLM ያልሆኑ endpoints ብቻ)፤ እና
  `npm run homolog`ን + የእሱን `summary.md` ወደ `/generate-release` STOP #2 phase ማገናኘት።
