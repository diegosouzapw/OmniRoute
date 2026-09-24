# Import providers from a CSV or JSON file (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **फ़ाइल से आयात करें** CSV या JSON सूची से API-कुंजी कनेक्शन बनाता है। प्रत्येक पंक्ति किसी अलग प्रदाता को लक्षित कर सकती है। आंशिक विफलता इस प्रक्रिया का निर्धारित व्यवहार है: कुछ पंक्तियाँ विफल होने पर भी मान्य पंक्तियाँ आयात हो जाती हैं, और मोडल बताता है कि विफल पंक्तियों को क्यों अस्वीकार किया गया।

यह आयात नए OpenAI/Anthropic-संगत एंडपॉइंट नोड **नहीं** बनाता। पहले उन्हें बनाएँ (Dashboard → Providers → OpenAI-संगत जोड़ें, या `omniroute nodes add`), फिर ऐसी पंक्तियाँ आयात करें जिनका `provider` कॉलम उस नोड की id हो। प्रत्येक पंक्ति का `baseUrl` फिर भी नोड के URL को ओवरराइड कर सकता है।

## CSV (स्थितिगत)

कॉलम नाम केवल दिखावटी हैं। पार्सर प्रत्येक पंक्ति को विभाजित करता है और इंडेक्स के अनुसार उसका डिस्ट्रक्चरिंग करता है:

| इंडेक्स | फ़ील्ड     | आवश्यक | टिप्पणियाँ                                                                                                    |
| ------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| 0       | `provider` | हाँ    | मौजूदा प्रबंधित प्रदाता id (`openai`, `anthropic`, …) **या** पहले से पंजीकृत OpenAI/Anthropic-संगत **नोड** id |
| 1       | `name`     | हाँ    | कनेक्शन का प्रदर्शन नाम                                                                                       |
| 2       | `apiKey`   | हाँ    | API कुंजी                                                                                                     |
| 3       | `baseUrl`  | नहीं   | प्रत्येक पंक्ति के लिए URL ओवरराइड                                                                            |
| 4       | `priority` | नहीं   | 1–100 के बीच पूर्णांक                                                                                         |

जिस पहली पंक्ति के पहले कॉलम में शाब्दिक शब्द `provider` (किसी भी केस में) हो, उसे हेडर मानकर छोड़ दिया जाता है। खाली पंक्तियाँ और `#` टिप्पणियाँ भी छोड़ दी जाती हैं।

आयात मोडल से एक आरंभिक फ़ाइल डाउनलोड करें (**CSV टेम्पलेट डाउनलोड करें**)। उदाहरण:

```csv
# OmniRoute प्रदाता आयात (स्थितिगत कॉलम)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` जैसी मनगढ़ंत id कोई नोड नहीं है। API उस पंक्ति के लिए `अज्ञात या असमर्थित प्रदाता` लौटाता है; मोडल इसे पंक्ति के नाम के आगे दिखाता है।

## JSON

समान फ़ील्ड (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) वाले ऑब्जेक्ट की JSON सरणी। CSV के विपरीत, JSON कुंजियाँ नामित होती हैं।

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
