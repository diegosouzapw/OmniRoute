# Import providers from a CSV or JSON file (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

داشبورد → ارائهدهندگان → **درونریزی از فایل**، اتصالهای دارای کلید API را از یک فهرست CSV یا JSON ایجاد میکند. هر ردیف میتواند ارائهدهنده متفاوتی را هدف قرار دهد. شکست جزئی بخشی از قرارداد است: حتی اگر برخی ردیفها ناموفق باشند، ردیفهای معتبر همچنان درونریزی میشوند و پنجره مودال دلیل رد شدن ردیفهای ناموفق را نمایش میدهد.

این درونریزی، گرههای نقطه پایانی جدیدِ سازگار با OpenAI/Anthropic ایجاد **نمیکند**. ابتدا آنها را ایجاد کنید (داشبورد → ارائهدهندگان → افزودن مورد سازگار با OpenAI، یا `omniroute nodes add`)، سپس ردیفهایی را درونریزی کنید که ستون `provider` آنها شناسه آن گره باشد. مقدار `baseUrl` در هر ردیف همچنان میتواند URL گره را بازنویسی کند.

## CSV (موقعیتی)

نام ستونها صرفاً ظاهری هستند. تجزیهکننده هر ردیف را تقسیم میکند و مقادیر را بر اساس اندیس استخراج میکند:

| اندیس | فیلد       | الزامی | توضیحات                                                                                                                                 |
| ----- | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | بله    | شناسه یک ارائهدهنده مدیریتشده موجود (`openai`، `anthropic`، …) **یا** شناسه یک **گره** سازگار با OpenAI/Anthropic که از قبل ثبت شده است |
| 1     | `name`     | بله    | نام نمایشی اتصال                                                                                                                        |
| 2     | `apiKey`   | بله    | کلید API                                                                                                                                |
| 3     | `baseUrl`  | خیر    | بازنویسی URL برای هر ردیف                                                                                                               |
| 4     | `priority` | خیر    | عدد صحیح از 1 تا 100                                                                                                                    |

اگر ستون اولِ خط نخست دقیقاً کلمه `provider` باشد (بدون حساسیت به حروف بزرگ و کوچک)، آن خط بهعنوان سرآیند نادیده گرفته میشود. خطوط خالی و توضیحات `#` نیز نادیده گرفته میشوند.

یک فایل اولیه را از پنجره مودال درونریزی دانلود کنید (**دانلود الگوی CSV**). مثال:

```csv
# درونریزی ارائهدهنده OmniRoute (ستونهای موقعیتی)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

یک شناسه ساختگی مانند `openai-compatible-chat-001` گره محسوب نمیشود. API برای آن ردیف خطای `Unknown or unsupported provider` را برمیگرداند؛ پنجره مودال این خطا را در کنار نام ردیف نمایش میدهد.

## JSON

یک آرایه JSON از اشیایی با همان فیلدها (`provider`، `name`، `apiKey`، `baseUrl?`، `priority?`). برخلاف CSV، کلیدهای JSON نامگذاریشده هستند.

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
