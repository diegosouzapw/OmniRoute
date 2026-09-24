# Import providers from a CSV or JSON file (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **فائل سے درآمد کریں** CSV یا JSON فہرست سے API-key کنکشنز بناتا ہے۔ ہر قطار مختلف provider کو ہدف بنا سکتی ہے۔ جزوی ناکامی طے شدہ طرزِ عمل ہے: بعض قطاریں ناکام ہونے کے باوجود درست قطاریں درآمد ہو جاتی ہیں، اور modal میں بتایا جاتا ہے کہ ناکام قطاریں کیوں مسترد کی گئیں۔

یہ درآمد نئے OpenAI/Anthropic-compatible endpoint nodes **نہیں** بناتی۔ پہلے انہیں بنائیں (Dashboard → Providers → OpenAI-Compatible شامل کریں، یا `omniroute nodes add`)، پھر ایسی قطاریں درآمد کریں جن کا `provider` کالم اس node کی id ہو۔ ہر قطار کا `baseUrl` پھر بھی node کے URL کو override کر سکتا ہے۔

## CSV (ترتیبی)

کالم کے نام صرف ظاہری حیثیت رکھتے ہیں۔ parser ہر قطار کو تقسیم کرتا ہے اور index کے لحاظ سے destructure کرتا ہے:

| Index | فیلڈ       | درکار | نوٹس                                                                                                                   |
| ----- | ---------- | ----- | ---------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | ہاں   | موجودہ managed provider id (`openai`، `anthropic`، …) **یا** پہلے سے رجسٹر شدہ OpenAI/Anthropic-compatible **node** id |
| 1     | `name`     | ہاں   | کنکشن کا نمائشی نام                                                                                                    |
| 2     | `apiKey`   | ہاں   | API key                                                                                                                |
| 3     | `baseUrl`  | نہیں  | ہر قطار کے لیے URL override                                                                                            |
| 4     | `priority` | نہیں  | 1–100 کے درمیان عددِ صحیح                                                                                              |

اگر پہلی سطر کے پہلے کالم میں بعینہٖ لفظ `provider` ہو (حروف کی کسی بھی صورت میں)، تو اسے header سمجھ کر چھوڑ دیا جاتا ہے۔ خالی سطریں اور `#` comments بھی چھوڑ دیے جاتے ہیں۔

درآمدی modal سے ابتدائی فائل ڈاؤن لوڈ کریں (**CSV template ڈاؤن لوڈ کریں**)۔ مثال:

```csv
# OmniRoute provider درآمد (ترتیبی کالم)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` جیسی خود ساختہ id کوئی node نہیں ہے۔ API اس قطار کے لیے `نامعلوم یا غیر معاون provider` واپس کرتی ہے؛ modal اسے قطار کے نام کے ساتھ دکھاتا ہے۔

## JSON

انہی فیلڈز (`provider`، `name`، `apiKey`، `baseUrl?`، `priority?`) والے objects کی JSON array۔ CSV کے برعکس، JSON keys ناموں پر مبنی ہوتی ہیں۔

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
