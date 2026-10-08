# Import providers from a CSV or JSON file (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **ফাইল থেকে ইমপোর্ট করুন** একটি CSV বা JSON তালিকা থেকে API-key সংযোগ তৈরি করে। প্রতিটি সারি ভিন্ন provider-কে লক্ষ্য করতে পারে। আংশিক ব্যর্থতাই এখানে প্রত্যাশিত আচরণ: কিছু সারি ব্যর্থ হলেও বৈধ সারিগুলো ইমপোর্ট হয় এবং প্রত্যাখ্যাত সারিগুলো কেন প্রত্যাখ্যান করা হয়েছে, modal-এ তা দেখানো হয়।

এই ইমপোর্ট নতুন OpenAI/Anthropic-compatible endpoint node তৈরি করে **না**। প্রথমে সেগুলো তৈরি করুন (Dashboard → Providers → Add OpenAI-Compatible অথবা `omniroute nodes add`), তারপর এমন সারি ইমপোর্ট করুন যেগুলোর `provider` কলামে ওই node-এর id রয়েছে। প্রতিটি সারির `baseUrl` দিয়েও node-এর URL ওভাররাইড করা যায়।

## CSV (অবস্থানভিত্তিক)

কলামের নামগুলো কেবল প্রদর্শনের জন্য। parser প্রতিটি সারি বিভক্ত করে এবং index অনুযায়ী destructure করে:

| Index | Field      | আবশ্যক | নোট                                                                                                                        |
| ----- | ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | হ্যাঁ  | বিদ্যমান managed provider id (`openai`, `anthropic`, …) **অথবা** ইতিমধ্যে নিবন্ধিত OpenAI/Anthropic-compatible **node** id |
| 1     | `name`     | হ্যাঁ  | সংযোগের প্রদর্শিত নাম                                                                                                      |
| 2     | `apiKey`   | হ্যাঁ  | API key                                                                                                                    |
| 3     | `baseUrl`  | না     | প্রতি-সারির URL ওভাররাইড                                                                                                   |
| 4     | `priority` | না     | 1–100-এর মধ্যে পূর্ণসংখ্যা                                                                                                 |

প্রথম লাইনের প্রথম কলামে হুবহু `provider` শব্দটি থাকলে (বড় বা ছোট হাতের যেকোনো অক্ষরে), সেটিকে header হিসেবে বাদ দেওয়া হয়। ফাঁকা লাইন এবং `#` comment-ও বাদ দেওয়া হয়।

ইমপোর্ট modal থেকে একটি প্রাথমিক ফাইল ডাউনলোড করুন (**CSV template ডাউনলোড করুন**)। উদাহরণ:

```csv
# OmniRoute provider ইমপোর্ট (অবস্থানভিত্তিক কলাম)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001`-এর মতো একটি কাল্পনিক id কোনো node নয়। ওই সারির জন্য API `অজানা বা অসমর্থিত provider` ফেরত দেয়; modal-এ সারিটির নামের পাশে এটি দেখানো হয়।

## JSON

একই field (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) সম্বলিত object-এর একটি JSON array। CSV-এর বিপরীতে, JSON key-গুলোর নির্দিষ্ট নাম থাকে।

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
