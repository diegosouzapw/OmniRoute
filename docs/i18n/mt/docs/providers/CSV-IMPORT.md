# Import providers from a CSV or JSON file (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **Importa minn fajl** joħloq konnessjonijiet b’ċavetta tal-API minn lista CSV jew JSON. Kull ringiela tista’ tispeċifika fornitur differenti. Falliment parzjali huwa parti mill-kuntratt: ringieli validi xorta jiġu importati meta oħrajn ifallu, u t-tieqa modali turi għaliex ir-ringieli li fallew ġew irrifjutati.

Dan l-importazzjoni **ma** toħloqx nodi ġodda ta’ endpoints kompatibbli ma’ OpenAI/Anthropic. Oħloqhom l-ewwel (Dashboard → Providers → Add OpenAI-Compatible, jew `omniroute nodes add`), imbagħad importa ringieli li l-kolonna `provider` tagħhom tkun l-id ta’ dak in-nodu. `baseUrl` għal kull ringiela xorta jista’ jieħu post il-URL tan-nodu.

## CSV (pożizzjonali)

L-ismijiet tal-kolonni huma biss kożmetiċi. Il-parser jaqsam kull ringiela u jiddestruttura skont l-indiċi:

| Indiċi | Kamp       | Meħtieġ | Noti                                                                                                                                         |
| ------ | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | `provider` | iva     | Id ta’ fornitur eżistenti ġestit (`openai`, `anthropic`, …) **jew** id ta’ **nodu** kompatibbli ma’ OpenAI/Anthropic li jkun diġà rreġistrat |
| 1      | `name`     | iva     | Isem muri tal-konnessjoni                                                                                                                    |
| 2      | `apiKey`   | iva     | Ċavetta tal-API                                                                                                                              |
| 3      | `baseUrl`  | le      | URL alternattiv għal kull ringiela                                                                                                           |
| 4      | `priority` | le      | Numru sħiħ minn 1 sa 100                                                                                                                     |

L-ewwel linja li l-ewwel kolonna tagħha tkun il-kelma litterali `provider` (bi kwalunkwe kombinazzjoni ta’ ittri kbar u żgħar) tinqabeż bħala intestatura. Linji vojta u kummenti `#` jinqabżu.

Niżżel fajl inizjali mit-tieqa modali tal-importazzjoni (**Niżżel il-mudell CSV**). Eżempju:

```csv
# Importazzjoni tal-fornituri ta’ OmniRoute (kolonni pożizzjonali)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Id ivvintat bħal `openai-compatible-chat-001` mhuwiex nodu. L-API tirritorna `Fornitur mhux magħruf jew mhux appoġġjat` għal dik ir-ringiela; it-tieqa modali turih ħdejn l-isem tar-ringiela.

## JSON

Array JSON ta’ oġġetti bl-istess kampijiet (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Għall-kuntrarju tas-CSV, il-keys tal-JSON għandhom ismijiet.

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
