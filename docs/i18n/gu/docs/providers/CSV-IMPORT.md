# Import providers from a CSV or JSON file (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

ડૅશબોર્ડ → પ્રદાતાઓ → **ફાઇલમાંથી આયાત કરો** CSV અથવા JSON સૂચિમાંથી API-કી કનેક્શનો બનાવે છે. દરેક પંક્તિ અલગ પ્રદાતાને લક્ષ્ય બનાવી શકે છે. આંશિક નિષ્ફળતા એ કરારનો ભાગ છે: કેટલીક પંક્તિઓ નિષ્ફળ જાય તો પણ માન્ય પંક્તિઓ આયાત થાય છે અને મોડલ નિષ્ફળ પંક્તિઓ શા માટે નકારવામાં આવી હતી તે દર્શાવે છે.

આ આયાત નવા OpenAI/Anthropic-સુસંગત એન્ડપૉઇન્ટ નોડ બનાવતી **નથી**. પહેલાં તે બનાવો (ડૅશબોર્ડ → પ્રદાતાઓ → OpenAI-સુસંગત ઉમેરો અથવા `omniroute nodes add`), પછી એવી પંક્તિઓ આયાત કરો કે જેમની `provider` કૉલમમાં તે નોડનું id હોય. દરેક પંક્તિનું `baseUrl` હજી પણ નોડના URLને ઓવરરાઇડ કરી શકે છે.

## CSV (સ્થાન-આધારિત)

કૉલમનાં નામ માત્ર દેખાવ માટે છે. પાર્સર દરેક પંક્તિને વિભાજિત કરે છે અને ઇન્ડેક્સ પ્રમાણે ડિસ્ટ્રક્ચર કરે છે:

| ઇન્ડેક્સ | ફીલ્ડ      | આવશ્યક | નોંધો                                                                                                                 |
| -------- | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| 0        | `provider` | હા     | હાલના સંચાલિત પ્રદાતાનું id (`openai`, `anthropic`, …) **અથવા** અગાઉથી નોંધાયેલ OpenAI/Anthropic-સુસંગત **નોડ**નું id |
| 1        | `name`     | હા     | કનેક્શનનું પ્રદર્શિત નામ                                                                                              |
| 2        | `apiKey`   | હા     | API કી                                                                                                                |
| 3        | `baseUrl`  | ના     | દરેક પંક્તિ માટે URL ઓવરરાઇડ                                                                                          |
| 4        | `priority` | ના     | 1–100 વચ્ચેનો પૂર્ણાંક                                                                                                |

જે પ્રથમ લાઇનની પ્રથમ કૉલમમાં શાબ્દિક શબ્દ `provider` (કોઈપણ અક્ષરકેસમાં) હોય, તેને હેડર તરીકે છોડી દેવામાં આવે છે. ખાલી લાઇનો અને `#` ટિપ્પણીઓને પણ છોડી દેવામાં આવે છે.

આયાત મોડલમાંથી પ્રારંભિક ફાઇલ ડાઉનલોડ કરો (**CSV ટેમ્પલેટ ડાઉનલોડ કરો**). ઉદાહરણ:

```csv
# OmniRoute પ્રદાતા આયાત (સ્થાન-આધારિત કૉલમ્સ)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` જેવું બનાવટી id નોડ નથી. API તે પંક્તિ માટે `Unknown or unsupported provider` પરત કરે છે; મોડલ તેને પંક્તિના નામની બાજુમાં દર્શાવે છે.

## JSON

સમાન ફીલ્ડ (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) ધરાવતા ઑબ્જેક્ટ્સની JSON ઍરે. CSVથી વિપરીત, JSON કીઝ નામિત હોય છે.

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
