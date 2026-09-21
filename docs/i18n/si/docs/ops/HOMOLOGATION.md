# Homologation Suite (`npm run homolog`) (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

හෝමොලොගේෂන් VPS මත ක්රියාත්මක වන OmniRoute deploy එකේ සැබෑ-පරිසර E2E වලංගුකරණය
(`HOMOLOG_BASE_URL`, උදා. `http://192.168.0.15:20128`). එක් විධානයක් මඟින් අතින් සිදු කරන
release STOP #2 පිරික්සුම් ලැයිස්තුව ස්වයංක්රීය, සාක්ෂි නිපදවන ධාවනයකින් ප්රතිස්ථාපනය කරයි.

## මෙය ආවරණය කරන දෑ

| ස්තරය                      | එය පරීක්ෂා කරන දෑ                                                                                                                                                                                                 | ක්රියාත්මක කිරීම                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — සෞඛ්යය/සමානතාව        | `/api/monitoring/health` අපේක්ෂිත අනුවාදය සහ `status: "healthy"` සමඟ `200` ප්රතිචාරයක් ලබා දෙයි                                                                                                                   | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — තාවකාලික යතුර        | පරිපාලක පිවිසුම → `POST /api/keys` ධාවනය සඳහා විෂය පථගත API යතුරක් සාදයි; ප්රතිඵලය කුමක් වුවත් `finally` කොටසක් තුළ එය අවලංගු කරයි (`DELETE /api/keys/:id`)                                                       | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API පෘෂ්ඨය           | `/v1/models` නාමාවලිය, සැබෑ ප්රවාහනය නොවන chat completion එකක් (ස්තරයට තීරණාත්මක model එක, `max_tokens: 5`), වලංගු නොවන යතුරක් සඳහා `401`, සහ පොදු `/api/monitoring/health`                                       | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE ප්රවාහනය         | සැබෑ ප්රවාහගත chat completion එකක්; `text/event-stream`, අවම වශයෙන් එක් අන්තර්ගත delta එකක් සහ `[DONE]` අවසන්කාරකයක් ඇති බව තහවුරු කරයි                                                                           | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — සැබෑ සැපයුම්කරුවන්    | සජීවී `/v1/models` නාමාවලියේ පවතින සෑම තීරණාත්මක සැපයුම්කරුවෙකු සඳහාම එක් අවම-පිරිවැය chat ඉල්ලීමක්, promptfoo හරහා අවස්ථාවේදීම ජනනය කරයි                                                                         | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI සත්යාපනය          | සැබෑ පිවිසුම් පෝරමය හරහා එක් වරක් පිවිසී UI ස්තරය පුරා session එක (`storageState`) නැවත භාවිත කරයි                                                                                                                | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI මාර්ග             | `src/app/(dashboard)/dashboard` යටතේ ඇති සෑම ස්ථිතික `page.tsx` එකක්ම (ගොනු පද්ධතියෙන් සොයාගනු ලැබේ; ගතික `[param]` මාර්ග මඟ හරිනු ලැබේ) HTTP දෝෂයක්, පිටු දෝෂයක් හෝ Next.js error boundary එකක් නොමැතිව පූරණය වේ | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI තීරණාත්මක ප්රවාහය | dashboard UI හරහා API යතුරක් සාදා එය නැවත අවලංගු කරයි (VPS මත කිසිදු අවශේෂයක් ඉතිරි නොකරයි)                                                                                                                       | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — ඒකාබද්ධ වාර්තාව       | httpYac (`junit-to-ctrf` හරහා), promptfoo→CTRF adapter එක සහ Playwright CTRF reporter එක එක් `homolog-ctrf.json` ගොනුවකට ඒකාබද්ධ කරයි; ඊට අමතරව මිනිසුන්ට කියවිය හැකි `homolog-report/summary.md` එකක් නිපදවයි    | `scripts/homolog/run.mjs`                                                     |

replay එක තුළ LLM සම්බන්ධතාව ශූන්යයි — මෙය deterministic regression battery එකක් මිස
eval එකක් නොවේ. AI ඇතුළත් වන්නේ අනාගත නඩත්තු කාර්යයන්හිදී පමණි (පහත Roadmap බලන්න).

## පූර්ව අවශ්යතා

1. `.env.homolog.example`, `.env.homolog` වෙත පිටපත් කර (මෙය git විසින් නොසලකා හරිනු ලැබේ — කිසි විටෙක commit නොකරන්න) පහත අගයන් පුරවන්න:
   - `HOMOLOG_BASE_URL` — ඉලක්ක deploy එක, උදා. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — එම deploy එක සඳහා dashboard කළමනාකරණ මුරපදය.
   - `HOMOLOG_CRITICAL_PROVIDERS` — සැබෑ smoke chat ඉල්ලීමක් ලැබෙන, කොමා මඟින් වෙන් කළ provider prefixes (උදා. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — සාමාන්ය ධාවනයන්හිදී හිස්ව තබන්න; suite එක තමන්ගේම තාවකාලික key එකක් සාදා පසුව අවලංගු කරයි. තනි layer එකක් වෙන්ව debug කිරීමට පමණක් මෙය සකසන්න.
2. repo එක තුළ `npm install` ධාවනය කරන්න (suite එකේ dependencies — `httpyac`, `promptfoo`, `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — සාමාන්ය devDependencies වේ).
3. browser binaries දැනටමත් නොමැති නම් `npx playwright install` ධාවනය කරන්න.

## ධාවනය කරන ආකාරය

```bash
npm run homolog
```

දේශීය `package.json` හි version එකට නොගැළපෙන version එකක් ඇති deploy එකකට එරෙහිව වලංගු කිරීමට (උදා. තවමත් පෙර patch release එකක පවතින homologation box එකක්), අපේක්ෂිත version එක පැහැදිලිව override කරන්න:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

කිසියම් layer එකක් අසාර්ථක වුවහොත් ධාවනය non-zero අගයකින් අවසන් වන අතර, අසාර්ථක වීමකදී පවා එය සෑදූ තාවකාලික API key එක අවලංගු කිරීමට සෑම විටම උත්සාහ කරයි (`scripts/homolog/run.mjs` හි `finally` block එක).

## වාර්තාව කියවන ආකාරය

සියලු output, `homolog-report/` තුළ තැන්පත් වේ (git විසින් නොසලකා හරිනු ලැබේ):

- `summary.md` — stdout වෙත මුද්රණය වන එම වගුවම වන අතර, එක් layer එකකට එක් පේළියක් ඇත (✅/❌ + විස්තරය).
- `homolog-ctrf.json` — ඒකාබද්ධ CTRF වාර්තාව (API/SSE, provider-smoke සහ UI ප්රතිඵලවල merge එක) — release STOP #2 checklist එකකට ඇමිණිය යුතු artifact එක මෙයයි.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — එක් එක් layer එක සඳහා raw/intermediate වාර්තා.
- `promptfooconfig.yaml`, `provider-misses.json` — වත්මන් ධාවනය සඳහා ජනනය කළ promptfoo config එක සහ සජීවී catalog එකේ නොතිබූ ඕනෑම critical providers.

L0 අසාර්ථක වුවහොත් ධාවනය වහාම නවතී (තාවකාලික key එකක් සාදනු නොලැබේ), මන්ද version/health නොගැළපීමක් යනු පසුව ඇති සෑම layer එකක්ම වැරදි deploy එක වලංගු කරන බවයි.

## UI එක නීත්යනුකූලව වෙනස් වූ විට baseline එක නැවත සැකසීම

L4b (route smoke) සහ L4c (API-key UI flow) ක්රියාත්මක වන්නේ snapshots මඟින් නොව සැබෑ DOM locators මඟිනි. එබැවින් බොහෝ නීත්යනුකූල UI වෙනස්කම් සඳහා suite update එකක් අවශ්ය නොවේ. වෙනසක් නිසා locator එකක් බිඳී ගිය විට (උදා. button label එකක් නැවත නම් කිරීම හෝ settings page එකක් වෙනත් ස්ථානයකට ගෙන යාම):

1. වත්මන් source එකට එරෙහිව locator එක නැවත තහවුරු කරන්න (එක් එක් locator එක තහවුරු කළ file/line එක specs තුළ දැනටමත් ලේඛනගත කර ඇත — එම රටාවම අනුගමනය කරන්න, අනුමාන නොකරන්න).
2. `tests/homolog/ui/` තුළ ඇති spec එක update කරන්න.
3. නිවැරදි කිරීම තහවුරු කිරීමට VPS එකට එරෙහිව `npm run homolog` (හෝ බලපෑමට ලක් වූ Playwright spec එක පමණක්) නැවත ධාවනය කර, පසුව commit කරන්න.

මෙම suite එක තුළ visual/pixel baseline එකක් නොමැත (F1) — ඒ සඳහා Roadmap බලන්න.

## මාර්ග සිතියම (F2 / F3)

සැලසුම සහ අදියර වශයෙන් rollout කිරීම අභ්යන්තර planning spec එක වන
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` තුළ ඇත (link කර නොමැත — මෙය අභ්යන්තර
`_tasks/` artifact එකක් වන අතර, මෙම repo එකේ track කරන docsවල කොටසක් නොවේ). සාරාංශය:

- **F2** — සම්පූර්ණ walkthrough recording → Playwright Test Agents (`planner`/`generator`)
  එය flow specs බවට පත් කරයි (combo එකක් සෑදීම, provider එක පරීක්ෂා කිරීම, settings සංස්කරණය කිරීම, MCP tools) +
  dynamic data (metrics, timestamps, logs) මත masks සහිත visual regression baseline එකක් (Lost Pixel) + එක් එක් release එක සඳහා `healer` maintenance routine එකක්.
- **F3** — resilience/contract/wiring ආවරණය: devbox එක මත toxiproxy + ව්යාජ OpenAI-compatible
  provider එකක්, එය වෙත යොමු කළ VPS එකේ `homolog-resilience` combo එකක්
  (injected timeout → `/api/monitoring/health` හරහා fallback + circuit breaker open/close බව assert කිරීම); `docs/openapi.yaml` ට එරෙහිව gated Schemathesis contract testing
  (අඩු `--max-examples`, ස්ථාවර seeds, non-LLM endpoints පමණි); සහ
  `npm run homolog` + එහි `summary.md`, `/generate-release` STOP #2 අදියරට සම්බන්ධ කිරීම.
