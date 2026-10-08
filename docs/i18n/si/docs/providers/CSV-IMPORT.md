# Import providers from a CSV or JSON file (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

උපකරණ පුවරුව → සපයන්නන් → **ගොනුවකින් ආයාත කරන්න** මඟින් CSV හෝ JSON ලැයිස්තුවකින් API-key සම්බන්ධතා සාදයි. සෑම පේළියකටම වෙනස් සපයන්නෙකු ඉලක්ක කළ හැක. අර්ධ වශයෙන් අසාර්ථක වීම මෙහි අපේක්ෂිත හැසිරීමයි: ඇතැම් පේළි අසාර්ථක වුවද වලංගු පේළි ආයාත කෙරෙන අතර, අසාර්ථක පේළි ප්රතික්ෂේප කළේ මන්දැයි මොඩලය තුළ ලැයිස්තුගත කරයි.

මෙම ආයාත කිරීම නව OpenAI/Anthropic-අනුකූල endpoint nodes සාදන්නේ **නැත**. පළමුව ඒවා සාදන්න (උපකරණ පුවරුව → සපයන්නන් → OpenAI-අනුකූල එකක් එක් කරන්න, හෝ `omniroute nodes add`), ඉන්පසු `provider` තීරුවේ එම node එකේ id එක ඇති පේළි ආයාත කරන්න. එක් එක් පේළියෙහි `baseUrl` එකකට තවමත් node එකේ URL එක අතික්රමණය කළ හැක.

## CSV (ස්ථානීය)

තීරු නාම පෙනුම සඳහා පමණි. parser එක සෑම පේළියක්ම වෙන් කර index අනුව destructure කරයි:

| Index | ක්ෂේත්රය   | අවශ්යයි | සටහන්                                                                                                                                    |
| ----- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | ඔව්     | පවතින කළමනාකරණය කළ provider id එකක් (`openai`, `anthropic`, …) **හෝ** දැනටමත් ලියාපදිංචි කර ඇති OpenAI/Anthropic-අනුකූල **node** id එකක් |
| 1     | `name`     | ඔව්     | සම්බන්ධතාවයේ ප්රදර්ශන නාමය                                                                                                               |
| 2     | `apiKey`   | ඔව්     | API key එක                                                                                                                               |
| 3     | `baseUrl`  | නැත     | එක් එක් පේළිය සඳහා URL අතික්රමණය                                                                                                         |
| 4     | `priority` | නැත     | 1–100 අතර පූර්ණ සංඛ්යාවක්                                                                                                                |

පළමු පේළියේ පළමු තීරුවේ `provider` යන වචනය එලෙසම තිබේ නම් (අකුරු ප්රමාණය නොසලකා), එය ශීර්ෂයක් ලෙස මඟ හරිනු ලැබේ. හිස් පේළි සහ `#` අදහස් මඟ හරිනු ලැබේ.

ආයාත මොඩලයෙන් ආරම්භක ගොනුවක් බාගන්න (**CSV අච්චුව බාගන්න**). උදාහරණය:

```csv
# OmniRoute සපයන්නන් ආයාත කිරීම (ස්ථානීය තීරු)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` වැනි නිර්මාණය කළ id එකක් node එකක් නොවේ. එම පේළිය සඳහා API එක `නොදන්නා හෝ සහාය නොදක්වන සපයන්නා` යන්න ආපසු ලබා දෙයි; මොඩලය එය පේළියේ නාමයට යාබදව පෙන්වයි.

## JSON

එම ක්ෂේත්රම (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) සහිත objects වල JSON array එකකි. CSV මෙන් නොව, JSON keys නාමකරණය කර ඇත.

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
