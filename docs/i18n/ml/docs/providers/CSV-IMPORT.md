# Import providers from a CSV or JSON file (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **ഫയലിൽ നിന്ന് ഇമ്പോർട്ട് ചെയ്യുക** എന്നത് ഒരു CSV അല്ലെങ്കിൽ JSON ലിസ്റ്റിൽ നിന്ന് API-key കണക്ഷനുകൾ സൃഷ്ടിക്കുന്നു. ഓരോ വരിയിലും വ്യത്യസ്ത provider നൽകാം. ഭാഗിക പരാജയമാണ് ഇതിന്റെ കരാർ: ചില വരികൾ പരാജയപ്പെട്ടാലും സാധുവായ വരികൾ ഇമ്പോർട്ട് ചെയ്യപ്പെടും; പരാജയപ്പെട്ട വരികൾ നിരസിക്കപ്പെട്ടതിന്റെ കാരണം മോഡലിൽ പ്രദർശിപ്പിക്കും.

ഈ ഇമ്പോർട്ട് പുതിയ OpenAI/Anthropic-compatible endpoint നോഡുകൾ സൃഷ്ടിക്കില്ല. ആദ്യം അവ സൃഷ്ടിക്കുക (Dashboard → Providers → Add OpenAI-Compatible, അല്ലെങ്കിൽ `omniroute nodes add`), തുടർന്ന് `provider` കോളത്തിൽ ആ നോഡിന്റെ id ഉള്ള വരികൾ ഇമ്പോർട്ട് ചെയ്യുക. ഓരോ വരിയിലുമുള്ള `baseUrl`-ന് നോഡിന്റെ URL അസാധുവാക്കി പകരം മറ്റൊന്ന് നൽകാനാകും.

## CSV (സ്ഥാനാധിഷ്ഠിതം)

കോളം പേരുകൾ പ്രദർശനത്തിന് മാത്രമുള്ളതാണ്. പാർസർ ഓരോ വരിയും വിഭജിച്ച് ഇൻഡക്സ് അനുസരിച്ച് മൂല്യങ്ങൾ വേർതിരിച്ചെടുക്കുന്നു:

| ഇൻഡക്സ് | ഫീൽഡ്      | നിർബന്ധമാണോ | കുറിപ്പുകൾ                                                                                                                                 |
| ------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 0       | `provider` | അതെ         | നിലവിലുള്ള നിയന്ത്രിത provider id (`openai`, `anthropic`, …) **അല്ലെങ്കിൽ** ഇതിനകം രജിസ്റ്റർ ചെയ്ത OpenAI/Anthropic-compatible **node** id |
| 1       | `name`     | അതെ         | കണക്ഷന്റെ പ്രദർശന നാമം                                                                                                                     |
| 2       | `apiKey`   | അതെ         | API key                                                                                                                                    |
| 3       | `baseUrl`  | അല്ല        | ഓരോ വരിയിലുമുള്ള URL അസാധുവാക്കൽ                                                                                                           |
| 4       | `priority` | അല്ല        | 1–100 വരെയുള്ള പൂർണ്ണസംഖ്യ                                                                                                                 |

ആദ്യ വരിയുടെ ആദ്യ കോളത്തിൽ `provider` എന്ന വാക്ക് അക്ഷരവ്യത്യാസം പരിഗണിക്കാതെ കൃത്യമായി ഉണ്ടെങ്കിൽ, അത് ഹെഡറായി കണക്കാക്കി ഒഴിവാക്കും. ശൂന്യമായ വരികളും `#` കമന്റുകളും ഒഴിവാക്കും.

ഇമ്പോർട്ട് മോഡലിൽ നിന്ന് ഒരു പ്രാരംഭ ഫയൽ ഡൗൺലോഡ് ചെയ്യുക (**CSV ടെംപ്ലേറ്റ് ഡൗൺലോഡ് ചെയ്യുക**). ഉദാഹരണം:

```csv
# OmniRoute provider ഇമ്പോർട്ട് (സ്ഥാനാധിഷ്ഠിത കോളങ്ങൾ)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` പോലുള്ള സാങ്കൽപ്പിക id ഒരു നോഡ് അല്ല. ആ വരിക്ക് API `Unknown or unsupported provider` തിരികെ നൽകും; വരിയുടെ പേരിന് അടുത്തായി മോഡൽ അത് പ്രദർശിപ്പിക്കും.

## JSON

സമാന ഫീൽഡുകളുള്ള (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) ഒബ്ജക്റ്റുകളുടെ ഒരു JSON അറേ. CSV-യിൽ നിന്ന് വ്യത്യസ്തമായി, JSON keys-ന് പേരുകളുണ്ട്.

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
