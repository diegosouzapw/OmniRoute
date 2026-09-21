# Import providers from a CSV or JSON file (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Irányítópult → Szolgáltatók → **Importálás fájlból** API-kulcsos kapcsolatokat hoz létre egy CSV- vagy JSON-listából. Minden sor eltérő szolgáltatót célozhat meg. A részleges sikertelenség a működés része: az érvényes sorok akkor is importálásra kerülnek, ha mások feldolgozása sikertelen, a modális ablak pedig felsorolja az elutasított sorok elutasításának okait.

Ez az importálás **nem** hoz létre új OpenAI-/Anthropic-kompatibilis végpontcsomópontokat. Először hozza létre ezeket (Irányítópult → Szolgáltatók → OpenAI-kompatibilis hozzáadása, vagy `omniroute nodes add`), majd importálja azokat a sorokat, amelyek `provider` oszlopa az adott csomópont azonosítóját tartalmazza. A soronkénti `baseUrl` továbbra is felülírhatja a csomópont URL-jét.

## CSV (pozícióalapú)

Az oszlopnevek csak megjelenítési célokat szolgálnak. Az elemző minden sort feloszt, majd index alapján bontja ki az értékeket:

| Index | Mező       | Kötelező | Megjegyzések                                                                                                                                            |
| ----- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | igen     | Meglévő kezelt szolgáltató azonosítója (`openai`, `anthropic`, …) **vagy** egy már regisztrált OpenAI-/Anthropic-kompatibilis **csomópont** azonosítója |
| 1     | `name`     | igen     | A kapcsolat megjelenítési neve                                                                                                                          |
| 2     | `apiKey`   | igen     | API-kulcs                                                                                                                                               |
| 3     | `baseUrl`  | nem      | Soronkénti URL-felülírás                                                                                                                                |
| 4     | `priority` | nem      | 1 és 100 közötti egész szám                                                                                                                             |

Ha az első sor első oszlopa a `provider` szó (kis- és nagybetűktől függetlenül), a rendszer fejlécnek tekinti és kihagyja. Az üres sorok és a `#` karakterrel kezdődő megjegyzések szintén kimaradnak.

Töltsön le egy kezdőfájlt az importálási modális ablakból (**CSV-sablon letöltése**). Példa:

```csv
# OmniRoute-szolgáltatók importálása (pozícióalapú oszlopok)
provider,name,apiKey,baseUrl,priority
openai,Éles OpenAI,sk-your-openai-key,,1
```

Egy kitalált azonosító, például az `openai-compatible-chat-001`, nem csomópont. Az API az `Ismeretlen vagy nem támogatott szolgáltató` választ adja vissza az adott sorhoz; a modális ablak ezt a sor neve mellett jeleníti meg.

## JSON

Azonos mezőket (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) tartalmazó objektumok JSON-tömbje. A CSV-vel ellentétben a JSON-ban a kulcsok névvel rendelkeznek.

```json
[
  {
    "provider": "openai",
    "name": "Éles OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
