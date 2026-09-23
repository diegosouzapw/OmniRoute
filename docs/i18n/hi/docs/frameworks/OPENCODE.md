# OpenCode Integration (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **स्थिति:** सामान्य रूप से उपलब्ध।
> **लक्षित पाठक:** OmniRoute परिनियोजन से OpenCode को जोड़ने वाले ऑपरेटर।
> **प्रामाणिक स्रोत (कॉन्फ़िग स्कीमा):** `src/shared/services/opencodeConfig.ts`
> **प्रामाणिक स्रोत (npm पैकेज):** `@omniroute/opencode-provider/` (प्रकाशित किया जा सकने वाला वर्कस्पेस)

[OpenCode](https://opencode.ai) एक एजेंटिक CLI/डेस्कटॉप AI क्लाइंट है। यह अपनी प्रोवाइडर कैटलॉग को `~/.config/opencode/opencode.json` (या `opencode.jsonc`) से पढ़ता है और `https://opencode.ai/config.json` पर मौजूद स्कीमा का पालन करता है। OmniRoute स्वयं को OpenCode के सामने उन प्रोवाइडरों में से एक के रूप में प्रस्तुत करता है — प्रत्येक अनुरोध OmniRoute के मानक OpenAI-संगत `/v1` इंटरफ़ेस से होकर गुजरता है, इसलिए OpenCode को Auto-Combo रूटिंग, सर्किट ब्रेकर, कुंजी नीतियों, ऑब्ज़र्वेबिलिटी आदि का लाभ स्वतः मिलता है।

**दो समर्थित एकीकरण पथ** उपलब्ध हैं। इनमें से एक चुनें — दोनों समान कॉन्फ़िग उत्पन्न करते हैं।

---

## पथ 1 — CLI जनरेटर (npm इंस्टॉल की आवश्यकता नहीं)

अंतिम उपयोगकर्ताओं के लिए अनुशंसित। OmniRoute के साथ आता है। मौजूदा स्थान पर `opencode.json` लिखता है।

```bash
# OmniRoute इंस्टॉल करने के बाद (npm i -g @omniroute/cli या लोकल क्लोन)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

आंतरिक रूप से CLI, `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) को कॉल करता है, इसलिए मौजूदा `opencode.json` अपने अन्य प्रोवाइडरों और टिप्पणियों को बनाए रखता है। OmniRoute प्रविष्टि को परमाण्विक रूप से जोड़ा/बदला जाता है।

परिणामी फ़ाइल (डिफ़ॉल्ट मॉडल कैटलॉग):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## पथ 2 — npm पैकेज `@omniroute/opencode-provider`

जब आप Node/TS से कॉन्फ़िग स्क्रिप्ट कर रहे हों (CI पाइपलाइन, मोनोरेपो, कस्टम इंस्टॉलर फ़्लो), तब यह अनुशंसित है।

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // वैकल्पिक: OpenCode को उपलब्ध कराई गई मॉडल कैटलॉग को ओवरराइड करें
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

किसी मौजूदा फ़ाइल के साथ गैर-विनाशकारी मर्ज के लिए, `opencodeConfig.ts` से `mergeOpenCodeConfigText()` को दोहराएँ या CLI जनरेटर को कॉल करें।

संपूर्ण API के लिए [पैकेज README](../../@omniroute/opencode-provider/README.md) देखें।

---

## रनटाइम वास्तव में क्या करता है

दोनों पथ समान `provider.omniroute.npm: "@ai-sdk/openai-compatible"` उत्पन्न करते हैं। रनटाइम पर, OpenCode `@ai-sdk/openai-compatible` (जो पहले से ही OpenCode की एक ट्रांज़िटिव डिपेंडेंसी है) को लोड करता है और इसे `baseURL` + `apiKey` के साथ कॉन्फ़िगर करता है। वहाँ से:

```
OpenCode UI/एजेंट
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI इंटरफ़ेस)
         → OmniRoute /v1/chat/completions हैंडलर      (open-sse/handlers/chatCore.ts)
            → कॉम्बो रूटिंग / Auto-Combo / एक्ज़ीक्यूटर
               → अपस्ट्रीम प्रोवाइडर
```

प्लगइन कभी भी HTTP को स्पर्श नहीं करता। यह केवल कॉन्फ़िगरेशन उत्पन्न करता है।

---

## मॉडल कैटलॉग के डिफ़ॉल्ट

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

आप `models: [...]` के माध्यम से इन्हें ओवरराइड कर सकते हैं। अनुशंसित अतिरिक्त विकल्प:

- `"auto"` — OmniRoute के [Auto-Combo](../routing/AUTO-COMBO.md) शून्य-कॉन्फ़िगरेशन राउटर को उपलब्ध कराता है। इससे OpenCode कैटलॉग को हार्ड-कोड किए बिना "सर्वोत्तम उपलब्ध मॉडल" चुन सकता है।
- `"<combo-name>"` — डैशबोर्ड में आपके द्वारा परिभाषित कोई भी कॉम्बो; OmniRoute इसे पारदर्शी रूप से रिज़ॉल्व करता है।

---

## URL सामान्यीकरण

हेल्पर दोनों प्रारूप स्वीकार करता है और ठीक एक `/v1` उत्पन्न करता है:

| इनपुट                          | आउटपुट (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

यह डिडुप्लिकेशन पुराने कॉन्फ़िगरेशन में दिखाई देने वाली **सबसे आम खराबी** है। यदि आपके पास v3.8.0 से पहले का कोई `opencode.json` है जो `/v1/v1/...` की ओर संकेत करता है, तो जनरेटर को फिर से चलाएँ या `createOmniRouteProvider` को दोबारा कॉल करें।

---

## प्रमाणीकरण मोड

| OmniRoute सेटिंग                                  | अनुशंसित `apiKey` मान                                               |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (स्थानीय के लिए डिफ़ॉल्ट) | `sk_omniroute` (शाब्दिक प्लेसहोल्डर)                                |
| `REQUIRE_API_KEY=true`                            | डैशबोर्ड → API Keys से प्राप्त वास्तविक प्रति-उपयोगकर्ता API कुंजी। |

`x-api-key` + `anthropic-version` भेजने वाले Anthropic-शैली के क्लाइंट के लिए, OmniRoute का `extractApiKey`, `x-api-key` से मिली कुंजी को भी स्वीकार करता है। OpenCode, OpenAI इंटरफ़ेस का उपयोग करता है, इसलिए यह हमेशा `Authorization: Bearer ${apiKey}` भेजेगा — यहाँ Anthropic का कोई विशेष मामला लागू नहीं होता।

---

## समस्या निवारण

| लक्षण                                               | कारण                                                                                | समाधान                                                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/v1/v1/` वाले URL के प्रत्येक अनुरोध पर `404`      | v3.8 से पहले के प्लगइन का पुराना कॉन्फ़िगरेशन, जिसने `/v1` प्रत्यय दो बार जोड़ा था। | पथ 1 या 2 के माध्यम से पुनः जनरेट करें।                                                                       |
| `401 Invalid API key`                               | OmniRoute में `REQUIRE_API_KEY=true` है और कुंजी अज्ञात है।                         | डैशबोर्ड में कुंजी बनाएँ, या `REQUIRE_API_KEY=false` (केवल स्थानीय) सेट करें और `sk_omniroute` का उपयोग करें। |
| OpenCode UI में मॉडल सूची खाली है                   | सभी 4 डिफ़ॉल्ट मॉडल OmniRoute की प्रदाता दृश्यता में छिपे हुए हैं।                  | आपके द्वारा सक्षम किए गए मॉडल दिखाने के लिए `models: ["auto", ...]` पास करें।                                 |
| `cannot read property 'models'` के साथ OpenCode 500 | पुराने OpenCode (< 0.1.x) में इनलाइन `models` स्वीकार नहीं किए जाते थे।             | OpenCode को ऐसे संस्करण में अपग्रेड करें जो v1 स्कीमा (`opencode.ai/config.json`) का पालन करता हो।            |

---

## यह भी देखें

- [API संदर्भ](../reference/API_REFERENCE.md) — OmniRoute REST का संपूर्ण इंटरफ़ेस
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` का अर्थ
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- स्रोत: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
