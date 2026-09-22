# Import providers from a CSV or JSON file (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

ዳሽቦርድ → አቅራቢዎች → **ከፋይል አስመጣ** ከCSV ወይም JSON ዝርዝር API-key ግንኙነቶችን ይፈጥራል። እያንዳንዱ ረድፍ የተለየ አቅራቢን ሊያመለክት ይችላል። ከፊል ውድቀት የስርዓቱ የተጠበቀ ባህሪ ነው፦ አንዳንዶቹ ሳይሳኩ ሲቀሩ ትክክለኛ ረድፎች አሁንም ይመጣሉ፣ እና ሞዳሉ ያልተሳኩት ረድፎች ውድቅ የተደረጉበትን ምክንያት ይዘረዝራል።

ይህ ማስመጣት አዳዲስ ከOpenAI/Anthropic ጋር ተኳሃኝ የሆኑ የendpoint ኖዶችን **አይፈጥርም**። መጀመሪያ እነዚያን ይፍጠሩ (ዳሽቦርድ → አቅራቢዎች → OpenAI-Compatible አክል፣ ወይም `omniroute nodes add`)፣ ከዚያ `provider` ዓምዳቸው የዚያ ኖድ id የሆኑ ረድፎችን ያስመጡ። በየረድፉ ያለ `baseUrl` አሁንም የኖዱን URL ሊተካ ይችላል።

## CSV (በቦታ ቅደም ተከተል)

የዓምድ ስሞች ለመልክ ብቻ ናቸው። ፓርሰሩ እያንዳንዱን ረድፍ ከፋፍሎ በindex ይፈታዋል፦

| Index | መስክ        | አስፈላጊ | ማስታወሻዎች                                                                                                  |
| ----- | ---------- | ----- | -------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | አዎ    | ነባር የሚተዳደር አቅራቢ id (`openai`፣ `anthropic`፣ …) **ወይም** አስቀድሞ የተመዘገበ ከOpenAI/Anthropic ጋር ተኳሃኝ **node** id |
| 1     | `name`     | አዎ    | የግንኙነቱ ማሳያ ስም                                                                                            |
| 2     | `apiKey`   | አዎ    | API key                                                                                                  |
| 3     | `baseUrl`  | አይ    | በየረድፉ የURL መተኪያ                                                                                          |
| 4     | `priority` | አይ    | ኢንቲጀር 1–100                                                                                              |

የመጀመሪያው ዓምድ ቃል በቃል `provider` የሆነ (በማንኛውም የፊደል መጠን) የመጀመሪያ መስመር እንደ ራስጌ ተዘሎ ይታለፋል። ባዶ መስመሮች እና የ`#` አስተያየቶች ተዘለው ይታለፋሉ።

ከማስመጫው ሞዳል የመነሻ ፋይል ያውርዱ (**የCSV አብነት አውርድ**)። ምሳሌ፦

```csv
# የOmniRoute አቅራቢ ማስመጫ (በቦታ ቅደም ተከተል የተደረደሩ ዓምዶች)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

እንደ `openai-compatible-chat-001` ያለ የፈጠራ id ኖድ አይደለም። APIው ለዚያ ረድፍ `Unknown or unsupported provider` ይመልሳል፤ ሞዳሉም ከረድፉ ስም ቀጥሎ ያሳየዋል።

## JSON

ተመሳሳይ መስኮች (`provider`፣ `name`፣ `apiKey`፣ `baseUrl?`፣ `priority?`) ያሏቸው የኦብጀክቶች JSON ድርድር። ከCSV በተለየ፣ የJSON ቁልፎች ስም አላቸው።

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
