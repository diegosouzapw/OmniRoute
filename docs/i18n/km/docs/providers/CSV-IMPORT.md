# Import providers from a CSV or JSON file (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → អ្នកផ្ដល់សេវា → **នាំចូលពីឯកសារ** បង្កើតការតភ្ជាប់ដោយប្រើ API key ពីបញ្ជី CSV ឬ JSON។ ជួរនីមួយៗអាចកំណត់គោលដៅទៅអ្នកផ្ដល់សេវាផ្សេងគ្នា។ ការបរាជ័យដោយផ្នែកគឺជាលក្ខខណ្ឌដែលបានកំណត់៖ ជួរដែលត្រឹមត្រូវនៅតែត្រូវបាននាំចូល ទោះបីជាជួរផ្សេងទៀតបរាជ័យក៏ដោយ ហើយ modal នឹងរាយមូលហេតុដែលជួរបរាជ័យត្រូវបានបដិសេធ។

ការនាំចូលនេះ **មិន** បង្កើត endpoint node ថ្មីដែលត្រូវគ្នាជាមួយ OpenAI/Anthropic ទេ។ សូមបង្កើត node ទាំងនោះជាមុនសិន (Dashboard → អ្នកផ្ដល់សេវា → បន្ថែម OpenAI-Compatible ឬ `omniroute nodes add`) បន្ទាប់មកនាំចូលជួរដែលជួរឈរ `provider` របស់វាជា id របស់ node នោះ។ `baseUrl` តាមជួរនីមួយៗនៅតែអាចជំនួស URL របស់ node បាន។

## CSV (តាមលំដាប់ទីតាំង)

ឈ្មោះជួរឈរគ្រាន់តែជាការតុបតែងប៉ុណ្ណោះ។ parser បំបែកជួរនីមួយៗ ហើយធ្វើ destructure តាម index៖

| Index | វាល        | ចាំបាច់ | កំណត់សម្គាល់                                                                                                                                                    |
| ----- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | បាទ/ចាស | id របស់អ្នកផ្ដល់សេវាដែលមានស្រាប់ និងត្រូវបានគ្រប់គ្រង (`openai`, `anthropic`, …) **ឬ** id របស់ **node** ដែលត្រូវគ្នាជាមួយ OpenAI/Anthropic និងបានចុះឈ្មោះរួចហើយ |
| 1     | `name`     | បាទ/ចាស | ឈ្មោះបង្ហាញរបស់ការតភ្ជាប់                                                                                                                                       |
| 2     | `apiKey`   | បាទ/ចាស | API key                                                                                                                                                         |
| 3     | `baseUrl`  | ទេ      | URL ជំនួសតាមជួរ                                                                                                                                                 |
| 4     | `priority` | ទេ      | ចំនួនគត់ពី 1–100                                                                                                                                                |

បន្ទាត់ទីមួយដែលជួរឈរទីមួយរបស់វាជាពាក្យត្រង់ៗ `provider` (មិនប្រកាន់អក្សរធំឬតូច) នឹងត្រូវបានរំលងជាបឋមកថា។ បន្ទាត់ទទេ និង comment `#` នឹងត្រូវបានរំលង។

ទាញយកឯកសារចាប់ផ្ដើមពី modal នាំចូល (**ទាញយកគំរូ CSV**)។ ឧទាហរណ៍៖

```csv
# ការនាំចូលអ្នកផ្ដល់សេវារបស់ OmniRoute (ជួរឈរតាមលំដាប់ទីតាំង)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

id ដែលបង្កើតឡើងដោយសន្មត ដូចជា `openai-compatible-chat-001` មិនមែនជា node ទេ។ API ត្រឡប់ `អ្នកផ្ដល់សេវាមិនស្គាល់ ឬមិនត្រូវបានគាំទ្រ` សម្រាប់ជួរនោះ ហើយ modal បង្ហាញសារនេះនៅក្បែរឈ្មោះជួរ។

## JSON

អារេ JSON នៃ object ដែលមានវាលដូចគ្នា (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`)។ ខុសពី CSV គឺ JSON keys មានឈ្មោះកំណត់។

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
