# Import providers from a CSV or JSON file (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **Import from file** ले CSV वा JSON सूचीबाट API-key जडानहरू सिर्जना गर्छ। प्रत्येक पङ्क्तिले फरक प्रदायकलाई लक्षित गर्न सक्छ। आंशिक असफलता यसको सम्झौता हो: केही पङ्क्तिहरू असफल हुँदा पनि मान्य पङ्क्तिहरू आयात हुन्छन्, र मोडलले असफल पङ्क्तिहरू किन अस्वीकार भए भन्ने कारणहरू सूचीबद्ध गर्छ।

यो आयातले नयाँ OpenAI/Anthropic-संगत endpoint नोडहरू सिर्जना **गर्दैन**। पहिले ती सिर्जना गर्नुहोस् (Dashboard → Providers → Add OpenAI-Compatible, वा `omniroute nodes add`), त्यसपछि `provider` स्तम्भमा उक्त नोडको id भएका पङ्क्तिहरू आयात गर्नुहोस्। प्रत्येक पङ्क्तिको `baseUrl` ले अझै पनि नोडको URL लाई अधिलेखन गर्न सक्छ।

## CSV (स्थानगत)

स्तम्भका नामहरू केवल देखावटी हुन्। पार्सरले प्रत्येक पङ्क्तिलाई विभाजन गर्छ र अनुक्रमणिकाअनुसार डिस्ट्रक्चर गर्छ:

| अनुक्रमणिका | फिल्ड      | आवश्यक | टिप्पणीहरू                                                                                                             |
| ----------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| 0           | `provider` | हो     | विद्यमान व्यवस्थित प्रदायक id (`openai`, `anthropic`, …) **वा** पहिले नै दर्ता गरिएको OpenAI/Anthropic-संगत **नोड** id |
| 1           | `name`     | हो     | जडानको प्रदर्शन नाम                                                                                                    |
| 2           | `apiKey`   | हो     | API key                                                                                                                |
| 3           | `baseUrl`  | होइन   | प्रत्येक पङ्क्तिका लागि URL अधिलेखन                                                                                    |
| 4           | `priority` | होइन   | पूर्णाङ्क 1–100                                                                                                        |

पहिलो स्तम्भमा ठ्याक्कै `provider` शब्द (ठूला वा साना अक्षरमा) भएको पहिलो पङ्क्तिलाई हेडरका रूपमा छोडिन्छ। खाली पङ्क्तिहरू र `#` टिप्पणीहरू पनि छोडिन्छन्।

आयात मोडलबाट सुरुआती फाइल डाउनलोड गर्नुहोस् (**Download CSV template**)। उदाहरण:

```csv
# OmniRoute प्रदायक आयात (स्थानगत स्तम्भहरू)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` जस्तो बनावटी id नोड होइन। त्यस पङ्क्तिका लागि API ले `Unknown or unsupported provider` फर्काउँछ; मोडलले यसलाई पङ्क्तिको नामसँगै देखाउँछ।

## JSON

उही फिल्डहरू (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) भएका वस्तुहरूको JSON array। CSV भन्दा फरक, JSON keys नामित हुन्छन्।

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
