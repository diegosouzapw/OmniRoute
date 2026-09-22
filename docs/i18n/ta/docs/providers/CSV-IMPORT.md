# Import providers from a CSV or JSON file (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **கோப்பிலிருந்து இறக்குமதி செய்** என்பது CSV அல்லது JSON பட்டியலிலிருந்து API-key இணைப்புகளை உருவாக்குகிறது. ஒவ்வொரு வரியும் வெவ்வேறு வழங்குநரைக் குறிக்கலாம். பகுதியளவு தோல்வியே இதன் ஒப்பந்தம்: சில வரிகள் தோல்வியடைந்தாலும் செல்லுபடியாகும் வரிகள் இறக்குமதி செய்யப்படும்; தோல்வியடைந்த வரிகள் நிராகரிக்கப்பட்டதற்கான காரணங்களை மாதிரி சாளரம் பட்டியலிடும்.

இந்த இறக்குமதி புதிய OpenAI/Anthropic-இணக்கமான endpoint node-களை உருவாக்காது. முதலில் அவற்றை உருவாக்கவும் (Dashboard → Providers → Add OpenAI-Compatible, அல்லது `omniroute nodes add`), பின்னர் `provider` நெடுவரிசையில் அந்த node-இன் id உள்ள வரிகளை இறக்குமதி செய்யவும். ஒவ்வொரு வரியிலும் உள்ள `baseUrl`, node-இன் URL-ஐ மேலெழுதலாம்.

## CSV (இடநிலை அடிப்படையிலானது)

நெடுவரிசைப் பெயர்கள் தோற்றத்திற்காக மட்டுமே உள்ளன. Parser ஒவ்வொரு வரியையும் பிரித்து, index அடிப்படையில் மதிப்புகளைப் பிரித்தெடுக்கிறது:

| Index | புலம்      | கட்டாயம் | குறிப்புகள்                                                                                                                                      |
| ----- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0     | `provider` | ஆம்      | ஏற்கெனவே உள்ள நிர்வகிக்கப்பட்ட provider id (`openai`, `anthropic`, …) **அல்லது** ஏற்கெனவே பதிவுசெய்யப்பட்ட OpenAI/Anthropic-இணக்கமான **node** id |
| 1     | `name`     | ஆம்      | இணைப்பின் காட்சிப் பெயர்                                                                                                                         |
| 2     | `apiKey`   | ஆம்      | API key                                                                                                                                          |
| 3     | `baseUrl`  | இல்லை    | ஒவ்வொரு வரிக்குமான URL மேலெழுதல்                                                                                                                 |
| 4     | `priority` | இல்லை    | 1–100 வரையிலான முழு எண்                                                                                                                          |

முதல் வரியின் முதல் நெடுவரிசையில் `provider` என்ற சொல் அப்படியே இருந்தால் (எழுத்து வகை எதுவாக இருந்தாலும்), அது தலைப்பாகக் கருதப்பட்டுத் தவிர்க்கப்படும். வெற்று வரிகளும் `#` கருத்துரைகளும் தவிர்க்கப்படும்.

இறக்குமதி மாதிரி சாளரத்திலிருந்து ஒரு தொடக்கக் கோப்பைப் பதிவிறக்கவும் (**CSV வார்ப்புருவைப் பதிவிறக்கு**). எடுத்துக்காட்டு:

```csv
# OmniRoute provider இறக்குமதி (இடநிலை நெடுவரிசைகள்)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` போன்ற கற்பனையான id ஒரு node அல்ல. அந்த வரிக்கு API `அறியப்படாத அல்லது ஆதரிக்கப்படாத provider` என்பதை வழங்கும்; மாதிரி சாளரம் அதை வரியின் பெயருக்கு அருகில் காட்டும்.

## JSON

அதே புலங்களைக் (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) கொண்ட object-களின் JSON array. CSV போலல்லாமல், JSON key-கள் பெயரிடப்பட்டவை.

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
