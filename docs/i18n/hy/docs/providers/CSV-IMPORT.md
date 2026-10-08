# Import providers from a CSV or JSON file (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Կառավարման վահանակ → Մատակարարներ → **Ներմուծել ֆայլից** գործառույթը CSV կամ JSON ցանկից ստեղծում է API բանալիով կապեր։ Յուրաքանչյուր տող կարող է նախատեսված լինել տարբեր մատակարարի համար։ Մասնակի ձախողումը նախատեսված վարքագիծ է․ վավեր տողերը ներմուծվում են նույնիսկ այն դեպքում, երբ մյուսները ձախողվում են, իսկ մոդալ պատուհանում նշվում է, թե ինչու են ձախողված տողերը մերժվել։

Այս ներմուծումը **չի** ստեղծում OpenAI/Anthropic-ի հետ համատեղելի վերջնակետի նոր հանգույցներ։ Նախ ստեղծեք դրանք (Կառավարման վահանակ → Մատակարարներ → Ավելացնել OpenAI-ի հետ համատեղելի մատակարար կամ `omniroute nodes add`), ապա ներմուծեք այն տողերը, որոնց `provider` սյունակը պարունակում է այդ հանգույցի id-ն։ Յուրաքանչյուր տողի `baseUrl`-ը, այնուամենայնիվ, կարող է վերագրել հանգույցի URL-ը։

## CSV (դիրքային)

Սյունակների անունները միայն ձևական նշանակություն ունեն։ Վերլուծիչը բաժանում է յուրաքանչյուր տողը և տարրալուծում այն ըստ ինդեքսի․

| Ինդեքս | Դաշտ       | Պարտադիր | Նշումներ                                                                                                                                         |
| ------ | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0      | `provider` | այո      | Գոյություն ունեցող կառավարվող մատակարարի id (`openai`, `anthropic`, …) **կամ** արդեն գրանցված OpenAI/Anthropic-ի հետ համատեղելի **հանգույցի** id |
| 1      | `name`     | այո      | Կապի ցուցադրվող անունը                                                                                                                           |
| 2      | `apiKey`   | այո      | API բանալին                                                                                                                                      |
| 3      | `baseUrl`  | ոչ       | Յուրաքանչյուր տողի URL-ի վերագրում                                                                                                               |
| 4      | `priority` | ոչ       | 1–100 ամբողջ թիվ                                                                                                                                 |

Եթե առաջին տողի առաջին սյունակը պարունակում է բառացի `provider` բառը (տառերի ցանկացած ռեգիստրով), այն բաց է թողնվում որպես վերնագիր։ Դատարկ տողերը և `#` մեկնաբանությունները բաց են թողնվում։

Ներմուծման մոդալ պատուհանից ներբեռնեք մեկնարկային ֆայլը (**Ներբեռնել CSV ձևանմուշը**)։ Օրինակ՝

```csv
# OmniRoute մատակարարների ներմուծում (դիրքային սյունակներ)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001`-ի նման հորինված id-ն հանգույց չէ։ API-ն այդ տողի համար վերադարձնում է `Անհայտ կամ չաջակցվող մատակարար`, իսկ մոդալ պատուհանում դա ցուցադրվում է տողի անվան կողքին։

## JSON

Նույն դաշտերով (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) օբյեկտների JSON զանգված։ Ի տարբերություն CSV-ի՝ JSON բանալիներն անվանված են։

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
