# OpenCode Integration (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **स्थिति:** सामान्य रूपमा उपलब्ध।
> **लक्षित पाठक:** OpenCode लाई OmniRoute डिप्लोयमेन्टसँग जोड्ने अपरेटरहरू।
> **आधिकारिक स्रोत (कन्फिग स्किमा):** `src/shared/services/opencodeConfig.ts`
> **आधिकारिक स्रोत (npm प्याकेज):** `@omniroute/opencode-provider/` (प्रकाशनयोग्य वर्कस्पेस)

[OpenCode](https://opencode.ai) एउटा एजेन्टिक CLI/डेस्कटप AI क्लाइन्ट हो। यसले आफ्नो प्रोभाइडर क्याटलग `~/.config/opencode/opencode.json` (वा `opencode.jsonc`) बाट पढ्छ र `https://opencode.ai/config.json` मा भएको स्किमा पालना गर्छ। OmniRoute ले आफूलाई OpenCode मा ती प्रोभाइडरहरूमध्ये एकका रूपमा प्रस्तुत गर्छ — प्रत्येक अनुरोध OmniRoute को मानक OpenAI-सङ्गत `/v1` सतहबाट प्रवाहित हुन्छ, त्यसैले OpenCode ले Auto-Combo राउटिङ, सर्किट ब्रेकरहरू, की नीतिहरू, अब्जर्भेबिलिटी आदि सुविधाहरू स्वचालित रूपमा प्राप्त गर्छ।

त्यहाँ **दुई समर्थित इन्टिग्रेसन मार्गहरू** छन्। कुनै एउटा छान्नुहोस् — दुवैले एउटै कन्फिग उत्पन्न गर्छन्।

---

## मार्ग 1 — CLI जेनेरेटर (npm इन्स्टल आवश्यक छैन)

अन्तिम प्रयोगकर्ताहरूका लागि सिफारिस गरिएको। OmniRoute सँगै उपलब्ध हुन्छ। यसले `opencode.json` लाई सोही स्थानमा लेख्छ।

```bash
# OmniRoute इन्स्टल गरेपछि (npm i -g @omniroute/cli वा स्थानीय क्लोन)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

भित्री रूपमा CLI ले `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) कल गर्छ, त्यसैले विद्यमान `opencode.json` का अन्य प्रोभाइडरहरू र कमेन्टहरू यथावत् रहन्छन्। OmniRoute प्रविष्टि एटोमिक रूपमा थपिन्छ/प्रतिस्थापन गरिन्छ।

परिणामी फाइल (पूर्वनिर्धारित मोडेल क्याटलग):

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

## मार्ग 2 — npm प्याकेज `@omniroute/opencode-provider`

Node/TS बाट कन्फिग स्क्रिप्टमार्फत तयार गर्दा सिफारिस गरिएको (CI पाइपलाइनहरू, मोनोरेपोहरू, अनुकूलित इन्स्टलर प्रवाहहरू)।

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // वैकल्पिक: OpenCode मा प्रस्तुत गरिने मोडेल क्याटलग ओभरराइड गर्नुहोस्
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

विद्यमान फाइलसँग विनाशरहित मर्ज गर्न, `opencodeConfig.ts` बाट `mergeOpenCodeConfigText()` पुनः कार्यान्वयन गर्नुहोस् वा CLI जेनेरेटर कल गर्नुहोस्।

पूर्ण API का लागि [प्याकेज README](../../@omniroute/opencode-provider/README.md) हेर्नुहोस्।

---

## रनटाइमले वास्तवमा के गर्छ

दुवै मार्गले एउटै `provider.omniroute.npm: "@ai-sdk/openai-compatible"` उत्पन्न गर्छन्। रनटाइममा, OpenCode ले `@ai-sdk/openai-compatible` (जुन पहिले नै OpenCode को ट्रान्जिटिभ डिपेन्डेन्सी हो) लोड गर्छ र त्यसलाई `baseURL` + `apiKey` सँग कन्फिगर गर्छ। त्यसपछि:

```
OpenCode UI/एजेन्ट
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute को OpenAI सतह)
         → OmniRoute /v1/chat/completions ह्यान्डलर     (open-sse/handlers/chatCore.ts)
            → कम्बो राउटिङ / Auto-Combo / एक्जिक्युटर
               → अपस्ट्रिम प्रोभाइडर
```

प्लगइनले HTTP लाई कहिल्यै चलाउँदैन। यसले केवल कन्फिगरेसन उत्पन्न गर्छ।

---

## मोडेल क्याटलगका पूर्वनिर्धारित मानहरू

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

तपाईंले `models: [...]` मार्फत यसलाई ओभरराइड गर्न सक्नुहुन्छ। सिफारिस गरिएका थप विकल्पहरू:

- `"auto"` — OmniRoute को शून्य-कन्फिग राउटर [Auto-Combo](../routing/AUTO-COMBO.md) उपलब्ध गराउँछ। यसले तपाईंलाई क्याटलग हार्ड-कोड नगरी OpenCode लाई "उपलब्धमध्ये उत्कृष्ट मोडेल" रोज्न दिन्छ।
- `"<combo-name>"` — तपाईंले ड्यासबोर्डमा परिभाषित गर्नुभएको कुनै पनि कम्बो; OmniRoute ले यसलाई पारदर्शी रूपमा समाधान गर्छ।

---

## URL सामान्यीकरण

सहायकले दुवै स्वरूप स्वीकार गर्छ र ठ्याक्कै एउटा `/v1` उत्सर्जन गर्छ:

| इनपुट                          | आउटपुट (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

यो डिडुप्लिकेसन पुराना कन्फिगहरूमा देखिने **सबैभन्दा सामान्य समस्या** हो। यदि तपाईंसँग v3.8.0 अघिको `/v1/v1/...` तर्फ सङ्केत गर्ने `opencode.json` छ भने, जेनेरेटर पुनः चलाउनुहोस् वा `createOmniRouteProvider` लाई फेरि कल गर्नुहोस्।

---

## प्रमाणीकरण मोडहरू

| OmniRoute सेटिङ                                         | सिफारिस गरिएको `apiKey` मान                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| `REQUIRE_API_KEY=false` (स्थानीयका लागि पूर्वनिर्धारित) | `sk_omniroute` (शाब्दिक प्लेसहोल्डर)                                     |
| `REQUIRE_API_KEY=true`                                  | ड्यासबोर्ड → API Keys बाट प्राप्त वास्तविक प्रति-प्रयोगकर्ता API कुञ्जी। |

`x-api-key` + `anthropic-version` पठाउने Anthropic-शैलीका क्लाइन्टहरूका लागि, OmniRoute को `extractApiKey` ले `x-api-key` बाट प्राप्त कुञ्जीलाई पनि मान्यता दिन्छ। OpenCode ले OpenAI सतह प्रयोग गर्छ, त्यसैले यसले सधैँ `Authorization: Bearer ${apiKey}` पठाउनेछ — यहाँ Anthropic को विशेष अवस्था लागू हुँदैन।

---

## समस्या समाधान

| लक्षण                                                  | कारण                                                                    | समाधान                                                                                                                                    |
| ------------------------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `/v1/v1/` समावेश भएको URL सहित प्रत्येक अनुरोधमा `404` | `/v1` दुईपटक थप्ने v3.8 अघिको प्लगइनबाट आएको पुरानो कन्फिग।             | मार्ग 1 वा 2 मार्फत पुनः उत्पन्न गर्नुहोस्।                                                                                               |
| `401 Invalid API key`                                  | OmniRoute मा `REQUIRE_API_KEY=true` छ र कुञ्जी अज्ञात छ।                | ड्यासबोर्डमा कुञ्जी सिर्जना गर्नुहोस्, वा `REQUIRE_API_KEY=false` (स्थानीय प्रयोगका लागि मात्र) सेट गरेर `sk_omniroute` प्रयोग गर्नुहोस्। |
| OpenCode UI मा मोडेल सूची खाली छ                       | सबै 4 पूर्वनिर्धारित मोडेल OmniRoute को प्रदायक दृश्यतामा लुकाइएका छन्। | तपाईंले सक्षम गर्नुभएका मोडेलहरू देखाउन `models: ["auto", ...]` पास गर्नुहोस्।                                                            |
| `cannot read property 'models'` सहित OpenCode 500      | पुरानो OpenCode (< 0.1.x) ले इनलाइन `models` स्वीकार गर्दैनथ्यो।        | v1 स्किमा (`opencode.ai/config.json`) पालना गर्ने OpenCode संस्करणमा अपग्रेड गर्नुहोस्।                                                   |

---

## यो पनि हेर्नुहोस्

- [API सन्दर्भ](../reference/API_REFERENCE.md) — पूर्ण OmniRoute REST सतह
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` को अर्थ
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- स्रोत: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
