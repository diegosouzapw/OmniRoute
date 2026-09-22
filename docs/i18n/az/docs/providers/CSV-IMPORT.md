# Import providers from a CSV or JSON file (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **Import from file** CSV və ya JSON siyahısından API açarı bağlantıları yaradır. Hər sətir fərqli provayderi hədəfləyə bilər. Qismən uğursuzluq nəzərdə tutulan davranışdır: bəzi sətirlər uğursuz olduqda belə etibarlı sətirlər idxal edilir və modal pəncərədə uğursuz sətirlərin niyə rədd edildiyi göstərilir.

Bu idxal yeni OpenAI/Anthropic-uyğun son nöqtə qovşaqları yaratmır. Əvvəlcə onları yaradın (Dashboard → Providers → Add OpenAI-Compatible və ya `omniroute nodes add`), sonra `provider` sütununda həmin qovşağın id-si olan sətirləri idxal edin. Hər sətir üçün `baseUrl` yenə də qovşağın URL-sini əvəz edə bilər.

## CSV (mövqeyə əsaslanan)

Sütun adları yalnız görüntü üçündür. Parser hər sətri bölür və indeksə əsasən destrukturizasiya edir:

| İndeks | Sahə       | Məcburidir | Qeydlər                                                                                                                                        |
| ------ | ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | `provider` | bəli       | Mövcud idarə olunan provayder id-si (`openai`, `anthropic`, …) **və ya** artıq qeydiyyatdan keçirilmiş OpenAI/Anthropic-uyğun **qovşaq** id-si |
| 1      | `name`     | bəli       | Bağlantının görünən adı                                                                                                                        |
| 2      | `apiKey`   | bəli       | API açarı                                                                                                                                      |
| 3      | `baseUrl`  | xeyr       | Hər sətir üçün URL əvəzləməsi                                                                                                                  |
| 4      | `priority` | xeyr       | 1–100 aralığında tam ədəd                                                                                                                      |

Birinci sütununda hərfi olaraq `provider` sözü (registrdən asılı olmayaraq) olan ilk sətir başlıq kimi ötürülür. Boş sətirlər və `#` şərhləri ötürülür.

İdxal modal pəncərəsindən başlanğıc faylını endirin (**Download CSV template**). Nümunə:

```csv
# OmniRoute provayder idxalı (mövqeyə əsaslanan sütunlar)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` kimi uydurma id qovşaq deyil. API həmin sətir üçün `Unknown or unsupported provider` cavabını qaytarır; modal pəncərə bunu sətir adının yanında göstərir.

## JSON

Eyni sahələrə (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) malik obyektlərdən ibarət JSON massivi. CSV-dən fərqli olaraq, JSON açarları adlandırılıb.

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
