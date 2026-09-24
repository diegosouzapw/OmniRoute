# Import providers from a CSV or JSON file (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **Fayldan import qilish** CSV yoki JSON roʻyxatidan API kalitli ulanishlarni yaratadi. Har bir qator boshqa provayderga moʻljallanishi mumkin. Qisman muvaffaqiyatsizlik — belgilangan xatti-harakat: ayrim qatorlarda xatolik yuz bersa ham, yaroqli qatorlar import qilinadi va modal oynada muvaffaqiyatsiz qatorlar nima sababdan rad etilgani koʻrsatiladi.

Bu import yangi OpenAI/Anthropic-mos endpoint tugunlarini yaratmaydi. Avval ularni yarating (Dashboard → Providers → Add OpenAI-Compatible yoki `omniroute nodes add`), soʻng `provider` ustunida ushbu tugunning id qiymati koʻrsatilgan qatorlarni import qiling. Har bir qatordagi `baseUrl` qiymati tugun URL manzilini baribir almashtirishi mumkin.

## CSV (pozitsion)

Ustun nomlari faqat koʻrinish uchun. Parser har bir qatorni qismlarga ajratadi va indeks boʻyicha destrukturizatsiya qiladi:

| Indeks | Maydon     | Majburiy | Izohlar                                                                                                                                                |
| ------ | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0      | `provider` | ha       | Mavjud boshqariladigan provayder id qiymati (`openai`, `anthropic`, …) **yoki** avval roʻyxatdan oʻtkazilgan OpenAI/Anthropic-mos **tugun** id qiymati |
| 1      | `name`     | ha       | Ulanishning koʻrsatiladigan nomi                                                                                                                       |
| 2      | `apiKey`   | ha       | API kaliti                                                                                                                                             |
| 3      | `baseUrl`  | yoʻq     | Har bir qator uchun URL manzilini almashtirish qiymati                                                                                                 |
| 4      | `priority` | yoʻq     | 1–100 oraligʻidagi butun son                                                                                                                           |

Birinchi ustuni aynan `provider` soʻzidan iborat boʻlgan birinchi qator (harf registridan qatʼi nazar) sarlavha sifatida oʻtkazib yuboriladi. Boʻsh qatorlar va `#` bilan boshlanuvchi izohlar ham oʻtkazib yuboriladi.

Boshlangʻich faylni import modal oynasidan yuklab oling (**CSV shablonini yuklab olish**). Misol:

```csv
# OmniRoute provayderlarini import qilish (pozitsion ustunlar)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` kabi oʻylab topilgan id tugun hisoblanmaydi. API ushbu qator uchun `Unknown or unsupported provider` javobini qaytaradi; modal oynada bu xabar qator nomi yonida koʻrsatiladi.

## JSON

Xuddi shu maydonlarga (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) ega obyektlarning JSON massivi. CSV formatidan farqli ravishda, JSON kalitlari nomlangan.

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
