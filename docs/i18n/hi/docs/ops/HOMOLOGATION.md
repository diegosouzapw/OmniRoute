# Homologation Suite (`npm run homolog`) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

होमोलोगेशन VPS पर चल रहे OmniRoute डिप्लॉय का वास्तविक-परिवेश E2E सत्यापन
(`HOMOLOG_BASE_URL`, उदाहरण के लिए `http://192.168.0.15:20128`)। एक कमांड मैन्युअल
रिलीज़ STOP #2 चेकलिस्ट को स्वचालित, साक्ष्य-उत्पादक रन से बदल देती है।

## इसमें क्या शामिल है

| परत                          | यह क्या जाँचती है                                                                                                                                                                                              | कार्यान्वयन                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — स्वास्थ्य/समानता        | `/api/monitoring/health` अपेक्षित संस्करण और `status: "healthy"` के साथ `200` प्रतिक्रिया देता है                                                                                                              | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — अल्पकालिक कुंजी        | एडमिन लॉगिन → `POST /api/keys` रन के लिए एक सीमित-स्कोप वाली API कुंजी बनाता है, जिसे परिणाम चाहे जो हो, `finally` ब्लॉक में निरस्त (`DELETE /api/keys/:id`) कर दिया जाता है                                   | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API सतह                | `/v1/models` कैटलॉग, एक वास्तविक गैर-स्ट्रीमिंग चैट पूर्णता (टियर-महत्त्वपूर्ण मॉडल, `max_tokens: 5`), अमान्य कुंजी के लिए `401`, और सार्वजनिक `/api/monitoring/health`                                        | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE स्ट्रीमिंग         | वास्तविक स्ट्रीमिंग चैट पूर्णता; `text/event-stream`, कम-से-कम एक कंटेंट डेल्टा और एक `[DONE]` टर्मिनेटर की पुष्टि करती है                                                                                     | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — वास्तविक प्रदाता        | लाइव `/v1/models` कैटलॉग में मौजूद प्रत्येक महत्त्वपूर्ण प्रदाता के लिए एक न्यूनतम-लागत चैट अनुरोध, जिसे promptfoo के माध्यम से रन के समय तैयार किया जाता है                                                   | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI प्रमाणीकरण          | वास्तविक लॉगिन फ़ॉर्म के माध्यम से एक बार लॉगिन करता है और पूरे UI स्तर पर सत्र (`storageState`) का पुनः उपयोग करता है                                                                                         | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI रूट                 | `src/app/(dashboard)/dashboard` के अंतर्गत प्रत्येक स्थिर `page.tsx` (फ़ाइल सिस्टम से खोजा गया, डायनेमिक `[param]` रूट छोड़ दिए जाते हैं) बिना HTTP त्रुटि, पृष्ठ त्रुटि या Next.js त्रुटि सीमा के लोड होता है | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI महत्त्वपूर्ण प्रवाह | डैशबोर्ड UI के माध्यम से एक API कुंजी बनाता है और उसे फिर से निरस्त करता है (VPS पर कोई अवशेष नहीं छोड़ता)                                                                                                     | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — एकीकृत रिपोर्ट          | httpYac (`junit-to-ctrf` के माध्यम से), promptfoo→CTRF अडैप्टर और Playwright CTRF रिपोर्टर को एक `homolog-ctrf.json` में मर्ज करता है, साथ ही मानव-पठनीय `homolog-report/summary.md` तैयार करता है             | `scripts/homolog/run.mjs`                                                     |

रीप्ले में LLM की कोई भागीदारी नहीं है — यह एक निर्धारक रिग्रेशन परीक्षण-समूह है,
मूल्यांकन नहीं। AI केवल भविष्य के रखरखाव कार्य में शामिल होगा (नीचे रोडमैप देखें)।

## पूर्वापेक्षाएँ

1. `.env.homolog.example` को `.env.homolog` में कॉपी करें (gitignored — इसे कभी commit न करें) और इसमें निम्न मान भरें:
   - `HOMOLOG_BASE_URL` — लक्षित deploy, जैसे `http://192.168.0.15:20128`।
   - `HOMOLOG_ADMIN_PASSWORD` — उस deploy के लिए dashboard प्रबंधन password।
   - `HOMOLOG_CRITICAL_PROVIDERS` — कॉमा से अलग किए गए provider prefixes, जिन्हें वास्तविक
     smoke chat request मिलती है (जैसे `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`)।
   - `HOMOLOG_API_KEY` — सामान्य runs में इसे खाली छोड़ें; suite अपनी स्वयं की अस्थायी key
     बनाती और निरस्त करती है। इसे केवल किसी एक layer को अलग से debug करने के लिए सेट करें।
2. repo में `npm install` चलाएँ (suite की dependencies — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — सामान्य devDependencies हैं)।
3. यदि browser binaries पहले से मौजूद नहीं हैं, तो `npx playwright install` चलाएँ।

## चलाने का तरीका

```bash
npm run homolog
```

ऐसे deploy के विरुद्ध validation करने के लिए, जिसका version स्थानीय `package.json` से मेल नहीं खाता
(जैसे कोई homologation box जो अभी भी पिछले patch release पर हो), अपेक्षित
version को स्पष्ट रूप से override करें:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

यदि कोई भी layer विफल होती है, तो run non-zero के साथ समाप्त होता है और विफलता की स्थिति में भी,
यह हमेशा अपनी बनाई हुई अस्थायी API key को निरस्त करने का प्रयास करता है
(`scripts/homolog/run.mjs` में `finally` block)।

## रिपोर्ट पढ़ना

सारा output `homolog-report/` (gitignored) में जाता है:

- `summary.md` — वही table जो stdout पर print होती है, प्रत्येक layer के लिए एक row (✅/❌ + विवरण)।
- `homolog-ctrf.json` — एकीकृत CTRF report (API/SSE, provider-smoke और
  UI results का merge) — release STOP #2 checklist के साथ संलग्न करने के लिए यही artifact है।
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — प्रत्येक
  layer की raw/intermediate reports।
- `promptfooconfig.yaml`, `provider-misses.json` — वर्तमान run के लिए generate किया गया promptfoo config
  और live catalog से गायब कोई भी critical providers।

L0 की विफलता पर प्रक्रिया तुरंत abort हो जाती है (कोई अस्थायी key नहीं बनाई जाती), क्योंकि version/health
mismatch का अर्थ है कि प्रत्येक downstream layer गलत deploy को validate करेगी।

## UI में वैध बदलाव होने पर baseline को फिर से निर्धारित करना

L4b (route smoke) और L4c (API-key UI flow) वास्तविक DOM locators द्वारा संचालित होते हैं,
snapshots द्वारा नहीं, इसलिए अधिकांश वैध UI बदलावों के लिए suite को update करने की आवश्यकता नहीं होती। जब कोई बदलाव
किसी locator को तोड़ देता है (जैसे बदला हुआ button label या स्थानांतरित settings page):

1. वर्तमान source के विरुद्ध locator की फिर से पुष्टि करें (specs में पहले से दर्ज है कि प्रत्येक
   locator की पुष्टि किस file/line के विरुद्ध की गई थी — उसी pattern का पालन करें, अनुमान न लगाएँ)।
2. `tests/homolog/ui/` में spec को update करें।
3. समाधान की पुष्टि करने के लिए VPS के विरुद्ध `npm run homolog` (या केवल प्रभावित Playwright spec)
   फिर से चलाएँ, उसके बाद commit करें।

इस suite (F1) में कोई visual/pixel baseline नहीं है — इसके लिए Roadmap देखें।

## रोडमैप (F2 / F3)

Design और चरणबद्ध rollout आंतरिक planning spec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` में उपलब्ध हैं (link नहीं किया गया — आंतरिक
`_tasks/` artifact, इस repo के tracked docs का हिस्सा नहीं)। सारांश:

- **F2** — पूर्ण walkthrough recording → Playwright Test Agents (`planner`/`generator`)
  इसे flow specs (combo बनाना, provider test करना, settings edit करना, MCP tools) +
  dynamic data (metrics, timestamps, logs) पर masks के साथ visual regression baseline
  (Lost Pixel) + प्रत्येक release के लिए एक `healer` maintenance routine में बदलते हैं।
- **F3** — resilience/contract/wiring coverage: devbox पर toxiproxy + एक नकली OpenAI-compatible
  provider, VPS पर उसकी ओर इंगित करता हुआ एक `homolog-resilience` combo
  (injected timeout → `/api/monitoring/health` के माध्यम से fallback + circuit breaker open/close
  assert करना); `docs/openapi.yaml` के विरुद्ध gated Schemathesis contract testing
  (कम `--max-examples`, fixed seeds, केवल non-LLM endpoints); और
  `/generate-release` STOP #2 phase में `npm run homolog` + उसकी `summary.md` को wire करना।
