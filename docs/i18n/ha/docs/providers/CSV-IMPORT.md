# Import providers from a CSV or JSON file (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **Shigo da shi daga fayil** yana ƙirƙirar haɗin API-key daga jerin CSV ko JSON. Kowane layi na iya nufar wani provider daban. Gazawar wani ɓangare ita ce ƙa'ida: ana ci gaba da shigo da ingantattun layuka ko da wasu sun gaza, sannan modal ɗin yana lissafa dalilan da suka sa aka ƙi layukan da suka gaza.

Wannan shigo da bayanai **ba ya** ƙirƙirar sabbin node na endpoint masu dacewa da OpenAI/Anthropic. Da farko, ƙirƙiri waɗannan (Dashboard → Providers → Add OpenAI-Compatible, ko `omniroute nodes add`), sannan ka shigo da layukan da ginshiƙin `provider` ɗinsu yake ɗauke da id na wannan node. `baseUrl` na kowane layi zai iya maye gurbin URL na node ɗin.

## CSV (bisa matsayi)

Sunayen ginshiƙai na ado ne kawai. Parser ɗin yana raba kowane layi sannan ya warware ƙimominsa bisa index:

| Index | Fili       | Ana buƙata | Bayani                                                                                                                                                           |
| ----- | ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | eh         | Id na provider da ake sarrafawa kuma yake akwai (`openai`, `anthropic`, …) **ko** id na **node** mai dacewa da OpenAI/Anthropic wanda aka riga aka yi wa rajista |
| 1     | `name`     | eh         | Sunan haɗin da za a nuna                                                                                                                                         |
| 2     | `apiKey`   | eh         | Maɓallin API                                                                                                                                                     |
| 3     | `baseUrl`  | a'a        | URL na musamman da zai maye gurbin na wannan layi                                                                                                                |
| 4     | `priority` | a'a        | Cikakkiyar lamba daga 1–100                                                                                                                                      |

Za a tsallake layin farko a matsayin kan jeri idan ginshiƙinsa na farko shi ne ainihin kalmar `provider` (ba tare da la'akari da manyan ko ƙananan haruffa ba). Ana tsallake layukan da babu komai da sharhin `#`.

Sauke fayil na farawa daga modal ɗin shigo da bayanai (**Sauke samfurin CSV**). Misali:

```csv
# Shigo da provider na OmniRoute (ginshiƙai bisa matsayi)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Ƙirƙirarren id kamar `openai-compatible-chat-001` ba node ba ne. API ɗin yana mayar da `Unknown or unsupported provider` ga wannan layin; modal ɗin yana nuna saƙon kusa da sunan layin.

## JSON

Tsarin JSON mai ɗauke da jerin objects waɗanda suke da filaye iri ɗaya (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Ba kamar CSV ba, ana ambaton JSON keys da sunayensu.

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
