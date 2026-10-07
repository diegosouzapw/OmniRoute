# Chaos Mode (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **डैशबोर्ड:** **Chaos Mode** (साइडबार) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (डैशबोर्ड सत्र) · `POST /api/skills/collect/chaos` (API कुंजी)  
> **स्रोत:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **एक कार्य को एक साथ कई प्रदाताओं को भेजता है** — भाग लेने वाला प्रत्येक प्रदाता
एक मॉडल इंस्टेंस का योगदान देता है, और आपको सभी उत्तर साथ-साथ (या शृंखलाबद्ध) मिलते हैं। यह
एक मल्टी-मॉडल निष्पादन सतह है, रूटिंग रणनीति नहीं: आपका सामान्य `/v1/chat/completions`
ट्रैफ़िक इससे कभी प्रभावित नहीं होता।

**स्पष्टीकरण — "chaos" नाम वाली तीन अलग-अलग चीज़ें उपलब्ध हैं:**

| चीज़                      | यह क्या है                                                                                                                                                   | दस्तावेज़ कहाँ उपलब्ध हैं                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**            | यहाँ वर्णित डैशबोर्ड पेज + API: एक कार्य को कई प्रदाताओं तक फैलाएँ (समानांतर या सहयोगात्मक रूप से)।                                                          | यह मार्गदर्शिका                              |
| `auto/chaos`              | Auto-Combo मॉडल id: समानांतर फ़ैन-आउट, प्रति प्रदाता एक मॉडल, प्रत्येक के लिए एक अपस्ट्रीम कॉल। फ़ॉल्ट इंजेक्शन नहीं ([विवरण](#autochaos-parallel-fan-out))। | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos कॉम्बो कॉन्फ़िगरेशन | `config.chaos.enabled` वाला एक स्थायी कॉम्बो इसी तरह फ़ैन-आउट करता है (केवल API); `judgeModel` केवल अंतिम उत्तर चुनता है, कोई संश्लेषण कॉल नहीं होती।        | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: समानांतर फ़ैन-आउट

`auto/chaos` फ़ॉल्ट-इंजेक्शन या रेज़िलिएंस-परीक्षण नियंत्रण **नहीं** है।
`/v1/chat/completions` पर `model: "auto/chaos"` का अनुरोध करना:

1. **प्रति प्रदाता एक मॉडल** का पैनल बनाता है: प्रत्येक कनेक्टेड प्रदाता का
   पहला उम्मीदवार, उम्मीदवार-पूल क्रम में, अधिकतम 5 सदस्यों तक
   (`OMNIROUTE_CHAOS_MAX_PANEL`, जिसकी अधिकतम सीमा 10 है)
   (`open-sse/services/autoCombo/virtualFactory.ts`)। `chaos-mode` वेट
   पैक केवल प्रत्येक सदस्य का `weight` सेट करता है; फ़ैन-आउट इसे नहीं पढ़ता।
2. प्रत्येक पैनल सदस्य को समान अनुरोध **समानांतर रूप से** भेजता है, इसलिए एक अनुरोध
   के लिए प्रति पैनल सदस्य एक अपस्ट्रीम कॉल का खर्च आता है
   (`open-sse/services/autoCombo/chaosEngine.ts`, जिसे
   `open-sse/services/combo.ts` से डिस्पैच किया जाता है)।
3. प्रत्येक पैनल सदस्य के परिणाम आते ही उसके लिए एक स्थिति पंक्ति स्ट्रीम करता है: डिफ़ॉल्ट
   रूप से एक SSE टिप्पणी (`: chaos <index> ok|fail <model>`), साथ ही जब अनुरोध
   `stream_options.include_chaos_parts: true` सेट करता है, तब एक `omni-chaos-part`
   इवेंट (`model`, `index`, `ok`, `error`)। इनमें उत्तर का कोई टेक्स्ट नहीं होता।
4. अंतिम OpenAI-शैली चंक के रूप में पैनल का **एक** उत्तर भेजता है: पहला पैनल
   सदस्य (`auto/chaos` इसे `judgeModel` के रूप में सेट करता है), यदि वह सफल होता है; अन्यथा
   अंतिम सफल सदस्य का उत्तर। पैनल के अन्य उत्तर वापस नहीं किए जाते, इसलिए
   आप N कॉल के लिए भुगतान करते हैं और एक पूर्णता प्राप्त करते हैं।

## सेटअप

1. **डैशबोर्ड → Chaos Mode** (`/dashboard/chaos`) खोलें।
2. इसे **चालू** करें — Chaos Mode डिफ़ॉल्ट रूप से **अक्षम** होता है (`enabled: false`
   `src/lib/chaos/chaosConfig.ts` में)। अक्षम होने पर, `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` उत्तर देता है।
3. प्रतिभागियों और डिफ़ॉल्ट को चुनें (सेटिंग्स स्टोर के माध्यम से प्रत्येक इंस्टेंस के लिए स्थायी रूप से सहेजे जाते हैं):

   | फ़ील्ड              | अर्थ                                                                 | डिफ़ॉल्ट / सीमाएँ                          |
   | ------------------- | -------------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | मुख्य स्विच                                                          | `false`                                    |
   | `defaultMode`       | `parallel` या `collaborative` (नीचे देखें)                           | `parallel`                                 |
   | `providerOverrides` | प्रति-प्रदाता भागीदारी (`providerId`, वैकल्पिक `modelId`, `enabled`) | खाली = प्रत्येक सक्रिय प्रदाता, अधिकतम 200 |
   | `systemPrompt`      | अंतर्निहित Chaos सिस्टम प्रॉम्प्ट के लिए ओवरराइड                     | वैकल्पिक, अधिकतम 10 000 वर्ण               |
   | `timeoutMs`         | प्रत्येक मॉडल कॉल का अधिकतम समय                                      | `120000` (5 000–600 000)                   |
   | `maxTokens`         | प्रत्येक मॉडल कॉल के लिए `max_tokens`                                | `4096` (256–128 000)                       |

4. **पृष्ठ से ही परीक्षण चलाएँ** — परिणाम पैनल प्रत्येक प्रदाता का उत्तर,
   स्थिति और अवधि दिखाता है।

## निष्पादन मोड

- **`parallel`** — प्रत्येक मॉडल को एक ही कार्य एक साथ मिलता है; आपको सभी उत्तर
  स्वतंत्र रूप से प्राप्त होते हैं।
- **`collaborative`** — मॉडल **एक श्रृंखला में** चलते हैं: प्रत्येक मॉडल पिछले मॉडल का आउटपुट देखता है और
  उसे परिष्कृत या विस्तृत करने, उसकी समीक्षा करने या कोई विकल्प देने के लिए कहा जाता है। प्रतिक्रिया का `summary` फ़ील्ड
  सफल आउटपुट को श्रृंखला क्रम में जोड़ता है (`parallel` रन में कोई `summary` नहीं होता)।

## API

### `POST /api/chaos/run` — डैशबोर्ड सत्र

कुकी-प्रमाणीकृत (प्रबंधन सत्र — देखें
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); डैशबोर्ड पृष्ठ द्वारा उपयोग किया जाता है।

```jsonc
// अनुरोध का मुख्य भाग
{
  "task": "Compare approaches to X", // आवश्यक
  "providers": ["glm", "kimi"], // वैकल्पिक फ़िल्टर
  "mode": "parallel", // वैकल्पिक — defaultMode को ओवरराइड करता है
  "systemPrompt": "…", // वैकल्पिक ओवरराइड
  "maxTokens": 4096, // वैकल्पिक ओवरराइड
}
```

### `POST /api/skills/collect/chaos` — API कुंजी

बाहरी कॉलर के लिए Bearer-token वेरिएंट। कुंजी में **Chaos Mode अनुमति**
(`chaosModeEnabled`) होनी चाहिए, जो **डिफ़ॉल्ट रूप से बंद** होती है — इसे प्रत्येक कुंजी के लिए
**डैशबोर्ड → API Manager → कुंजी संपादित करें → अनुमतियाँ → Chaos Mode** में सक्षम करें। अनुरोध का मुख्य भाग ऊपर जैसा ही है।

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

दोनों एंडपॉइंट समान संरचना लौटाते हैं:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // केवल collaborative मोड
}
```

## समस्या निवारण

- **`400 Chaos Mode is not enabled`** — ऊपर चरण 2 देखें: वैश्विक स्विच बंद है।
- **`/api/skills/collect/chaos` पर API कुंजी अस्वीकार हो जाती है** — कुंजी में प्रति-कुंजी
  `chaosModeEnabled` अनुमति नहीं है (यह डिफ़ॉल्ट रूप से बंद होती है; यह एक सेटिंग है, त्रुटि नहीं)।
- **अपेक्षित प्रदाता परिणामों में अनुपस्थित है** — Chaos Mode पृष्ठ पर `providerOverrides`
  जाँचें (अक्षम ओवरराइड उसे बाहर रखता है) और यह भी जाँचें कि प्रदाता कनेक्शन सक्रिय है या नहीं।
