# Homologation Suite (`npm run homolog`) (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

ഹോമൊലോഗേഷൻ VPS-ൽ പ്രവർത്തിക്കുന്ന OmniRoute ഡിപ്ലോയ്മെന്റിന്റെ യഥാർത്ഥ-പരിസ്ഥിതി E2E സാധൂകരണം
(`HOMOLOG_BASE_URL`, ഉദാ. `http://192.168.0.15:20128`). മാനുവൽ റിലീസ്
STOP #2 ചെക്ക്ലിസ്റ്റിന് പകരമായി, ഒരൊറ്റ കമാൻഡ് സ്വയമേവ പ്രവർത്തിച്ച് തെളിവുകൾ സൃഷ്ടിക്കുന്നു.

## ഇത് ഉൾക്കൊള്ളുന്നവ

| ലെയർ                     | ഇത് പരിശോധിക്കുന്നത്                                                                                                                                                                                                                | നടപ്പാക്കൽ                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — ഹെൽത്ത്/പാരിറ്റി    | `/api/monitoring/health`, `status: "healthy"`-ഉം പ്രതീക്ഷിക്കുന്ന പതിപ്പും സഹിതം `200` പ്രതികരണം നൽകുന്നു                                                                                                                           | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — താൽക്കാലിക കീ      | അഡ്മിൻ ലോഗിൻ → `POST /api/keys`, റണ്ണിനായി പരിമിതമായ സ്കോപ്പുള്ള API കീ സൃഷ്ടിക്കുന്നു; ഫലം എന്തായാലും `finally` ബ്ലോക്കിൽ അത് പിൻവലിക്കുന്നു (`DELETE /api/keys/:id`)                                                              | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API ഉപരിതലം        | `/v1/models` കാറ്റലോഗ്, യഥാർത്ഥ നോൺ-സ്ട്രീമിംഗ് ചാറ്റ് കംപ്ലീഷൻ (ടയർ-നിർണായക മോഡൽ, `max_tokens: 5`), അസാധുവായ കീയ്ക്കുള്ള `401`, പൊതുവായ `/api/monitoring/health`                                                                   | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE സ്ട്രീമിംഗ്    | യഥാർത്ഥ സ്ട്രീമിംഗ് ചാറ്റ് കംപ്ലീഷൻ; `text/event-stream`, കുറഞ്ഞത് ഒരു ഉള്ളടക്ക ഡെൽറ്റ, ഒരു `[DONE]` ടെർമിനേറ്റർ എന്നിവ ഉറപ്പാക്കുന്നു                                                                                              | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — യഥാർത്ഥ പ്രൊവൈഡർമാർ | തത്സമയ `/v1/models` കാറ്റലോഗിലുള്ള ഓരോ നിർണായക പ്രൊവൈഡർക്കും കുറഞ്ഞ ചെലവിലുള്ള ഓരോ ചാറ്റ് അഭ്യർത്ഥന വീതം, promptfoo ഉപയോഗിച്ച് തത്സമയം സൃഷ്ടിക്കുന്നു                                                                               | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI ഓതന്റിക്കേഷൻ    | യഥാർത്ഥ ലോഗിൻ ഫോം വഴി ഒരിക്കൽ ലോഗിൻ ചെയ്യുകയും UI ലെയറിലുടനീളം സെഷൻ (`storageState`) വീണ്ടും ഉപയോഗിക്കുകയും ചെയ്യുന്നു                                                                                                              | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI റൂട്ടുകൾ        | `src/app/(dashboard)/dashboard`-ന് കീഴിലുള്ള ഓരോ സ്റ്റാറ്റിക് `page.tsx`-ഉം (ഫയൽസിസ്റ്റത്തിൽ നിന്ന് കണ്ടെത്തുന്നു; ഡൈനാമിക് `[param]` റൂട്ടുകൾ ഒഴിവാക്കുന്നു) HTTP പിശകോ, പേജ് പിശകോ, Next.js എറർ ബൗണ്ടറിയോ ഇല്ലാതെ ലോഡ് ചെയ്യുന്നു | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI നിർണായക ഫ്ലോ    | ഡാഷ്ബോർഡ് UI വഴി ഒരു API കീ സൃഷ്ടിക്കുകയും അത് വീണ്ടും പിൻവലിക്കുകയും ചെയ്യുന്നു (VPS-ൽ അവശിഷ്ടമൊന്നും വിടുന്നില്ല)                                                                                                                 | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — ഏകീകൃത റിപ്പോർട്ട്  | httpYac (`junit-to-ctrf` വഴി), promptfoo→CTRF അഡാപ്റ്റർ, Playwright CTRF റിപ്പോർട്ടർ എന്നിവയെ ഒരൊറ്റ `homolog-ctrf.json` ഫയലിലേക്കും മനുഷ്യർക്ക് വായിക്കാവുന്ന `homolog-report/summary.md` റിപ്പോർട്ടിലേക്കും ലയിപ്പിക്കുന്നു       | `scripts/homolog/run.mjs`                                                     |

റീപ്ലേയിൽ LLM ഇടപെടൽ ഒന്നുമില്ല — ഇത് നിർണായകമായി ആവർത്തിക്കാവുന്ന ഒരു റിഗ്രഷൻ പരിശോധനാസമുച്ചയമാണ്,
ഒരു eval അല്ല. ഭാവിയിലെ പരിപാലന പ്രവർത്തനങ്ങളിൽ മാത്രമാണ് AI ഉൾപ്പെടുന്നത് (താഴെയുള്ള റോഡ്മാപ്പ് കാണുക).

## മുൻവ്യവസ്ഥകൾ

1. `.env.homolog.example` എന്നത് `.env.homolog`-ലേക്ക് പകർത്തി (gitignored — ഇത് ഒരിക്കലും commit ചെയ്യരുത്) ഇനിപ്പറയുന്നവ പൂരിപ്പിക്കുക:
   - `HOMOLOG_BASE_URL` — ലക്ഷ്യ deploy, ഉദാ. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — ആ deploy-ന്റെ dashboard management password.
   - `HOMOLOG_CRITICAL_PROVIDERS` — യഥാർഥ smoke chat request ലഭിക്കേണ്ട, കോമ ഉപയോഗിച്ച് വേർതിരിച്ച provider prefix-കൾ (ഉദാ. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — സാധാരണ run-കളിൽ ഒഴിച്ചിടുക; suite സ്വന്തം താൽക്കാലിക key സൃഷ്ടിക്കുകയും revoke ചെയ്യുകയും ചെയ്യും. ഒറ്റ layer മാത്രമായി debug ചെയ്യാൻ ഇത് സജ്ജീകരിക്കുക.
2. repo-യിൽ `npm install` പ്രവർത്തിപ്പിക്കുക (suite-ന്റെ dependency-കൾ — `httpyac`, `promptfoo`, `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — സാധാരണ devDependencies ആണ്).
3. browser binary-കൾ ഇതിനകം ലഭ്യമല്ലെങ്കിൽ `npx playwright install` പ്രവർത്തിപ്പിക്കുക.

## പ്രവർത്തിപ്പിക്കേണ്ട വിധം

```bash
npm run homolog
```

പ്രാദേശിക `package.json`-മായി version പൊരുത്തപ്പെടാത്ത ഒരു deploy-നെതിരെ സാധൂകരിക്കാൻ
(ഉദാ. ഇപ്പോഴും മുമ്പത്തെ patch release-ലുള്ള ഒരു homologation box), പ്രതീക്ഷിക്കുന്ന
version വ്യക്തമായി override ചെയ്യുക:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

ഏതെങ്കിലും layer പരാജയപ്പെട്ടാൽ run non-zero നിലയിൽ അവസാനിക്കും; പരാജയം സംഭവിച്ചാലും,
അത് സൃഷ്ടിച്ച താൽക്കാലിക API key revoke ചെയ്യാൻ എപ്പോഴും ശ്രമിക്കും
(`scripts/homolog/run.mjs`-ലെ `finally` block).

## റിപ്പോർട്ട് വായിക്കുന്നത്

എല്ലാ output-ഉം `homolog-report/`-ൽ ലഭിക്കും (gitignored):

- `summary.md` — stdout-ൽ print ചെയ്യുന്ന അതേ table, ഓരോ layer-നും ഓരോ row (✅/❌ + വിശദാംശം).
- `homolog-ctrf.json` — ഏകീകൃത CTRF report (API/SSE, provider-smoke, UI result-ുകളുടെ merge) — release STOP #2 checklist-നൊപ്പം attach ചെയ്യേണ്ട artifact ഇതാണ്.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — ഓരോ layer-ന്റെയും അസംസ്കൃത/intermediate report-കൾ.
- `promptfooconfig.yaml`, `provider-misses.json` — നിലവിലെ run-നായി സൃഷ്ടിച്ച promptfoo config-ഉം live catalog-ൽ ഇല്ലാതിരുന്ന ഏതെങ്കിലും critical provider-കളും.

L0 പരാജയപ്പെട്ടാൽ ഉടൻതന്നെ നിർത്തും (താൽക്കാലിക key സൃഷ്ടിക്കില്ല), കാരണം version/health
പൊരുത്തക്കേട് എന്നത് തുടർന്നുള്ള എല്ലാ layer-കളും തെറ്റായ deploy-നെ സാധൂകരിക്കും എന്നാണ്.

## UI-യിൽ സാധുവായ മാറ്റങ്ങൾ വരുമ്പോൾ baseline പുനഃക്രമീകരിക്കുന്നത്

L4b (route smoke), L4c (API-key UI flow) എന്നിവ snapshot-ുകൾക്കു പകരം യഥാർഥ DOM locator-ുകളാണ് ഉപയോഗിക്കുന്നത്; അതിനാൽ സാധുവായ മിക്ക UI മാറ്റങ്ങൾക്കും suite update ആവശ്യമില്ല. ഒരു മാറ്റം locator-നെ തകരാറിലാക്കുമ്പോൾ (ഉദാ. പുനർനാമകരണം ചെയ്ത button label അല്ലെങ്കിൽ മറ്റൊരിടത്തേക്ക് മാറ്റിയ settings page):

1. നിലവിലെ source-നെതിരെ locator വീണ്ടും സ്ഥിരീകരിക്കുക (ഓരോ locator-വും ഏത് file/line-നെതിരെ സ്ഥിരീകരിച്ചതാണെന്ന് spec-ുകളിൽ ഇതിനകം രേഖപ്പെടുത്തിയിട്ടുണ്ട് — അതേ രീതി പിന്തുടരുക, ഊഹിക്കരുത്).
2. `tests/homolog/ui/`-ലെ spec update ചെയ്യുക.
3. പരിഹാരം സ്ഥിരീകരിക്കാൻ VPS-നെതിരെ `npm run homolog` (അല്ലെങ്കിൽ ബാധിച്ച Playwright spec മാത്രം) വീണ്ടും പ്രവർത്തിപ്പിക്കുക, തുടർന്ന് commit ചെയ്യുക.

ഈ suite-ൽ visual/pixel baseline ഇല്ല (F1) — അതിനായി Roadmap കാണുക.

## Roadmap (F2 / F3)

രൂപകൽപ്പനയും ഘട്ടംഘട്ടമായ rollout-ഉം internal planning spec ആയ
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md`-ലുണ്ട് (link ചെയ്തിട്ടില്ല — internal
`_tasks/` artifact ആണ്, ഈ repo-യുടെ tracked docs-ന്റെ ഭാഗമല്ല). സംഗ്രഹം:

- **F2** — പൂർണ്ണ walkthrough recording → Playwright Test Agents (`planner`/`generator`) അതിനെ flow spec-ുകളാക്കി മാറ്റുന്നു (combo സൃഷ്ടിക്കുക, provider test ചെയ്യുക, settings edit ചെയ്യുക, MCP tool-ുകൾ) + dynamic data-യുടെ (metric-ുകൾ, timestamp-ുകൾ, log-ുകൾ) മുകളിൽ mask-ുകളുള്ള visual regression baseline (Lost Pixel) + ഓരോ release-നും ഒരു `healer` maintenance routine.
- **F3** — resilience/contract/wiring coverage: devbox-ൽ toxiproxy + ഒരു വ്യാജ OpenAI-compatible provider, അതിലേക്ക് ചൂണ്ടുന്ന VPS-ലെ ഒരു `homolog-resilience` combo (injected timeout → `/api/monitoring/health` വഴി fallback + circuit breaker open/close സ്ഥിരീകരിക്കുക); `docs/openapi.yaml`-നെതിരെയുള്ള gated Schemathesis contract testing (കുറഞ്ഞ `--max-examples`, സ്ഥിരമായ seed-ുകൾ, non-LLM endpoint-ുകൾ മാത്രം); കൂടാതെ `npm run homolog` + അതിന്റെ `summary.md` എന്നിവ `/generate-release` STOP #2 ഘട്ടത്തിലേക്ക് wire ചെയ്യുക.
