# Import providers from a CSV or JSON file (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **फाइलमधून आयात करा** हे CSV किंवा JSON सूचीमधून API-key कनेक्शन्स तयार करते. प्रत्येक पंक्ती वेगळ्या provider ला लक्ष्य करू शकते. अंशतः अपयश हा अपेक्षित व्यवहार आहे: काही पंक्ती अयशस्वी झाल्या तरी वैध पंक्ती आयात केल्या जातात आणि अयशस्वी पंक्ती का नाकारल्या गेल्या, हे modal मध्ये सूचीबद्ध केले जाते.

हे आयात कार्य नवीन OpenAI/Anthropic-सुसंगत endpoint nodes तयार करत **नाही**. प्रथम ते तयार करा (Dashboard → Providers → Add OpenAI-Compatible किंवा `omniroute nodes add`), त्यानंतर ज्यांचा `provider` स्तंभ त्या node चा id आहे अशा पंक्ती आयात करा. प्रत्येक पंक्तीतील `baseUrl` तरीही node चा URL अधिलिखित करू शकतो.

## CSV (स्थानाधारित)

स्तंभांची नावे केवळ दर्शविण्यासाठी आहेत. parser प्रत्येक पंक्ती विभाजित करतो आणि index नुसार तिचे destructuring करतो:

| Index | फील्ड      | आवश्यक | नोंदी                                                                                                                    |
| ----- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| 0     | `provider` | होय    | विद्यमान व्यवस्थापित provider id (`openai`, `anthropic`, …) **किंवा** आधीच नोंदणीकृत OpenAI/Anthropic-सुसंगत **node** id |
| 1     | `name`     | होय    | कनेक्शनचे दर्शनीय नाव                                                                                                    |
| 2     | `apiKey`   | होय    | API key                                                                                                                  |
| 3     | `baseUrl`  | नाही   | प्रत्येक पंक्तीसाठी URL अधिलिखन                                                                                          |
| 4     | `priority` | नाही   | 1–100 मधील पूर्णांक                                                                                                      |

ज्या पहिल्या ओळीच्या पहिल्या स्तंभात तंतोतंत `provider` हा शब्द आहे (अक्षरांचे आकारमान कोणतेही असले तरी), ती header म्हणून वगळली जाते. रिकाम्या ओळी आणि `#` टिप्पण्या वगळल्या जातात.

आयात modal मधून प्रारंभिक फाइल डाउनलोड करा (**CSV template डाउनलोड करा**). उदाहरण:

```csv
# OmniRoute provider आयात (स्थानाधारित स्तंभ)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` सारखा काल्पनिक id हा node नाही. त्या पंक्तीसाठी API `अज्ञात किंवा असमर्थित provider` परत करते; modal मध्ये ते पंक्तीच्या नावाशेजारी दाखवले जाते.

## JSON

समान फील्ड (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) असलेल्या objects ची JSON array. CSV च्या विपरीत, JSON keys नावानुसार ओळखल्या जातात.

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
