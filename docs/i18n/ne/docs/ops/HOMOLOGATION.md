# Homologation Suite (`npm run homolog`) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

होमोलोगेसन VPS मा चलिरहेको OmniRoute डिप्लोयको वास्तविक-वातावरण E2E प्रमाणीकरण
(`HOMOLOG_BASE_URL`, उदाहरणका लागि `http://192.168.0.15:20128`)। एउटा कमाण्डले म्यानुअल
रिलिज STOP #2 चेकलिस्टलाई स्वचालित, प्रमाण-उत्पादन गर्ने रनद्वारा प्रतिस्थापन गर्छ।

## यसले के समेट्छ

| तह                           | यसले के जाँच गर्छ                                                                                                                                                                                      | कार्यान्वयन                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L0 — स्वास्थ्य/समानता        | `/api/monitoring/health` ले `status: "healthy"` र अपेक्षित संस्करणसहित `200` प्रतिक्रिया दिन्छ                                                                                                         | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — अस्थायी कुञ्जी         | एडमिन लगइन → `POST /api/keys` ले रनका लागि स्कोप गरिएको API कुञ्जी सिर्जना गर्छ, जुन परिणाम जेसुकै भए पनि `finally` ब्लकमा रद्द (`DELETE /api/keys/:id`) गरिन्छ                                        | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API सतह                | `/v1/models` क्याटलग, वास्तविक नन-स्ट्रिमिङ च्याट कम्प्लिसन (टियर-महत्त्वपूर्ण मोडेल, `max_tokens: 5`), अमान्य-कुञ्जी `401`, र सार्वजनिक `/api/monitoring/health`                                      | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE स्ट्रिमिङ          | वास्तविक स्ट्रिमिङ च्याट कम्प्लिसन; `text/event-stream`, कम्तीमा एउटा सामग्री डेल्टा, र `[DONE]` टर्मिनेटर भएको सुनिश्चित गर्छ                                                                         | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — वास्तविक प्रदायकहरू     | लाइभ `/v1/models` क्याटलगमा उपस्थित प्रत्येक महत्त्वपूर्ण प्रदायकका लागि एउटा न्यूनतम-लागत च्याट अनुरोध, जुन promptfoo मार्फत तत्काल उत्पन्न गरिन्छ                                                    | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI प्रमाणीकरण          | वास्तविक लगइन फारममार्फत एकपटक लगइन गर्छ र UI तहभरि सत्र (`storageState`) पुनः प्रयोग गर्छ                                                                                                             | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI रुटहरू              | `src/app/(dashboard)/dashboard` अन्तर्गतका प्रत्येक स्थिर `page.tsx` (फाइलसिस्टमबाट पत्ता लगाइएका, डाइनामिक `[param]` रुटहरू छाडिएका) HTTP त्रुटि, पृष्ठ त्रुटि वा Next.js त्रुटि सीमाविना लोड हुन्छन् | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI महत्त्वपूर्ण प्रवाह | ड्यासबोर्ड UI मार्फत API कुञ्जी सिर्जना गर्छ र त्यसलाई फेरि रद्द गर्छ (VPS मा कुनै अवशेष छाड्दैन)                                                                                                      | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — एकीकृत रिपोर्ट          | httpYac (`junit-to-ctrf` मार्फत), promptfoo→CTRF एडाप्टर, र Playwright CTRF रिपोर्टरलाई एउटा `homolog-ctrf.json` मा मर्ज गर्छ, साथै मानव-पठनीय `homolog-report/summary.md` पनि बनाउँछ                  | `scripts/homolog/run.mjs`                                                     |

रिप्ले स्वयंमा LLM को संलग्नता शून्य हुन्छ — यो निर्धारणात्मक रिग्रेसन परीक्षणहरूको समूह हो,
मूल्याङ्कन होइन। AI केवल भविष्यको मर्मतसम्भार कार्यमा समावेश हुन्छ (तलको रोडम्याप हेर्नुहोस्)।

## पूर्वापेक्षाहरू

1. `.env.homolog.example` लाई `.env.homolog` मा प्रतिलिपि गर्नुहोस् (gitignored — यसलाई कहिल्यै commit नगर्नुहोस्) र निम्न विवरण भर्नुहोस्:
   - `HOMOLOG_BASE_URL` — लक्षित deploy, उदाहरणका लागि `http://192.168.0.15:20128`।
   - `HOMOLOG_ADMIN_PASSWORD` — उक्त deploy का लागि dashboard व्यवस्थापन password।
   - `HOMOLOG_CRITICAL_PROVIDERS` — वास्तविक smoke chat request प्राप्त गर्ने comma-separated provider prefixes (उदाहरणका लागि `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`)।
   - `HOMOLOG_API_KEY` — सामान्य run मा खाली छोड्नुहोस्; suite ले आफ्नै अस्थायी key सिर्जना र revoke गर्छ। एउटै layer लाई अलग्गै debug गर्न मात्र यसलाई सेट गर्नुहोस्।
2. repo मा `npm install` चलाउनुहोस् (suite का dependencies — `httpyac`, `promptfoo`, `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — सामान्य devDependencies हुन्)।
3. browser binaries पहिले नै उपलब्ध छैनन् भने `npx playwright install` चलाउनुहोस्।

## कसरी चलाउने

```bash
npm run homolog
```

स्थानीय `package.json` सँग version नमिल्ने deploy विरुद्ध validate गर्न (उदाहरणका लागि, अझै अघिल्लो patch release मा रहेको homologation box), अपेक्षित version लाई स्पष्ट रूपमा override गर्नुहोस्:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

कुनै पनि layer असफल भएमा run non-zero सहित exit हुन्छ, र असफलताको अवस्थामा समेत यसले सिर्जना गरेको अस्थायी API key लाई सधैँ revoke गर्ने प्रयास गर्छ (`scripts/homolog/run.mjs` को `finally` block)।

## report पढ्ने तरिका

सबै output `homolog-report/` मा राखिन्छ (gitignored):

- `summary.md` — stdout मा print गरिएको उही table, प्रत्येक layer का लागि एउटा row (✅/❌ + विवरण)।
- `homolog-ctrf.json` — एकीकृत CTRF report (API/SSE, provider-smoke, र UI परिणामहरूको merge) — release STOP #2 checklist मा संलग्न गर्नुपर्ने artifact यही हो।
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — प्रत्येक layer का raw/intermediate reports।
- `promptfooconfig.yaml`, `provider-misses.json` — हालको run का लागि उत्पन्न गरिएको promptfoo config र live catalog मा नभेटिएका कुनै पनि critical providers।

L0 असफल भएमा प्रक्रिया तुरुन्त abort हुन्छ (अस्थायी key सिर्जना गरिँदैन), किनभने version/health mismatch हुनुको अर्थ त्यसपछिका सबै layer ले गलत deploy लाई validate गर्नेछन्।

## UI मा वैध परिवर्तन हुँदा baseline पुनः निर्धारण गर्ने

L4b (route smoke) र L4c (API-key UI flow) snapshots होइन, वास्तविक DOM locators द्वारा सञ्चालित हुन्छन्, त्यसैले अधिकांश वैध UI परिवर्तनहरूका लागि suite update आवश्यक पर्दैन। कुनै परिवर्तनले locator बिगारेमा (उदाहरणका लागि, button label को नाम परिवर्तन वा settings page सारिएको अवस्थामा):

1. हालको source विरुद्ध locator लाई पुनः पुष्टि गर्नुहोस् (प्रत्येक locator कुन file/line विरुद्ध पुष्टि गरिएको थियो भन्ने specs मा पहिले नै उल्लेख छ — त्यही ढाँचा अनुसरण गर्नुहोस्, अनुमान नगर्नुहोस्)।
2. `tests/homolog/ui/` मा रहेको spec update गर्नुहोस्।
3. सुधार पुष्टि गर्न VPS विरुद्ध `npm run homolog` (वा प्रभावित Playwright spec मात्र) पुनः चलाउनुहोस्, त्यसपछि commit गर्नुहोस्।

यस suite (F1) मा कुनै visual/pixel baseline छैन — त्यसका लागि Roadmap हेर्नुहोस्।

## Roadmap (F2 / F3)

डिजाइन र चरणबद्ध rollout आन्तरिक planning spec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` मा छ (link गरिएको छैन — आन्तरिक
`_tasks/` artifact, यस repo का tracked docs को भाग होइन)। सारांश:

- **F2** — पूर्ण walkthrough recording → Playwright Test Agents (`planner`/`generator`) ले यसलाई flow specs (combo सिर्जना गर्ने, provider परीक्षण गर्ने, settings edit गर्ने, MCP tools) + dynamic data (metrics, timestamps, logs) माथि masks सहितको visual regression baseline (Lost Pixel) + प्रत्येक release का लागि `healer` maintenance routine मा रूपान्तरण गर्छन्।
- **F3** — resilience/contract/wiring coverage: devbox मा toxiproxy + नक्कली OpenAI-compatible provider, र त्यसतर्फ निर्देशित VPS मा `homolog-resilience` combo (injected timeout → `/api/monitoring/health` मार्फत fallback + circuit breaker open/close assert गर्ने); `docs/openapi.yaml` विरुद्ध gated Schemathesis contract testing (कम `--max-examples`, निश्चित seeds, non-LLM endpoints मात्र); र `/generate-release` STOP #2 चरणमा `npm run homolog` + यसको `summary.md` wiring गर्ने।
