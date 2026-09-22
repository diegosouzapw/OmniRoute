# RTK Compression (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK siqish — OmniRoute’ning terminal va vosita chiqishlari uchun buyruqlardan xabardor siqish mexanizmi. U
kontekstning asosiy o‘sishi test jurnallari, build chiqishi, paket menejeri shovqini, shell transkriptlari,
Docker chiqishi, git chiqishi va stack trace’lardan kelib chiqadigan kod yozuvchi agent seanslari uchun
mo‘ljallangan.

RTK bevosita `defaultMode: "rtk"` bilan yoki ketma-ket pipeline’ning birinchi bosqichi sifatida ishlashi mumkin, odatda:

```txt
rtk -> caveman
```

Bu tartib avval shovqinli mashina chiqishini siqadi, so‘ng Caveman’ga qolgan nasriy matnni ixchamlashtirish imkonini beradi.

Yuqori oqimdagi RTK buyruq chiqishida `60-90%` tejalish haqida xabar beradi. Uning README faylidagi namunaviy seans
`~118,000` ta standart tokendan `~23,900` ta RTK tokeniga tushadi, bu `79.7%` tejalish (`~80%`) demakdir. OmniRoute
Caveman kirish siqishi bilan ketma-ket qo‘llangandagi tejalishni hisoblash uchun yuqori oqimdagi shu o‘rtacha qiymatdan foydalanadi:

```txt
RTK o‘rtachasi:  80% tejaldi
Caveman kirishi: 46% tejaldi
Ketma-ket:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% tejaldi
Oraliq:          1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## U nimalarni siqadi

Ichki katalog hozirda quyidagi toifalar bo‘yicha 49 ta filtrni o‘z ichiga oladi:

| Toifa     | Misollar                                                            |
| --------- | ------------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                   |
| `test`    | Vitest, Jest, Pytest, Playwright, Go testlari, Cargo testlari       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx       |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler       |
| `shell`   | `ls`, `find`, `grep`, umumiy shell jurnallari                       |
| `docker`  | `docker ps`, Docker jurnallari                                      |
| `infra`   | Terraform, OpenTofu, `systemctl status`                             |
| `generic` | JSON chiqishi, stack trace’lar, umumiy chiqish uchun zaxira variant |

`open-sse/services/compression/engines/rtk/commandDetector.ts` ichidagi detektor filtr tanlashdan
oldin chiqishni tasniflaydi. Buyruq klassi yetarli bo‘lmaganda, filtrlar buyruq namunasi yoki chiqish regex’i
bo‘yicha ham mos kelishi mumkin.

## Filtrlarni aniqlash

RTK filtrlarni quyidagi tartibda yuklaydi:

1. `.rtk/filters.toml` va `.rtk/filters.json` fayllaridagi loyiha filtrlari, faqat ularga ishonch bildirilganda.
2. `DATA_DIR/rtk/filters.toml` va `DATA_DIR/rtk/filters.json` fayllaridagi global filtrlar.
3. `open-sse/services/compression/engines/rtk/filters/` ichidagi ichki filtrlar.

Bir xil qamrov doirasida RTK TOML schema v1 filtrlari OmniRoute JSON filtrlaridan ustun turadi. Import qilingan muayyan buyruqqa
xos filtr shu qamrovdagi kengroq filtrni almashtira olishi uchun TOML `match_command` ifodalari buyruq turi bo‘yicha
moslikdan oldin tekshiriladi. Fayl formatidan qat’i nazar, loyiha qamrovi hali ham global
qamrovdan ustun turadi.

Regex filtrlari vosita chiqishi agentlarga qanday ko‘rsatilishini o‘zgartirishi mumkinligi sababli, loyiha filtrlari ataylab
ishonch tekshiruvi bilan cheklangan. Quyidagilardan biri bajarilganda loyiha filtr fayli qabul qilinadi:

- `rtkConfig.trustProjectFilters` qiymati `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` o‘rnatilgan.
- `.rtk/trust.json` loyiha filtr fayliga mos keluvchi SHA-256 xeshini o‘z ichiga oladi.

Ishonch fayli namunasi:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Xeshlar alohida: `filtersSha256` `.rtk/filters.json` fayliga, `filtersTomlSha256` esa
`.rtk/filters.toml` fayliga ishonch bildiradi. Fayllardan birini tahrirlash faqat uning o‘z ishonch yozuvini bekor qiladi. Global fayllar
administrator tomonidan o‘rnatiladi va mavjud global filtrlar uchun ishonch mexanizmidan foydalanadi.

Maxsus filtrlar bitta filtr obyekti yoki filtr obyektlari massivi bo‘lishi mumkin. Yaroqsiz maxsus filtrlar
o‘tkazib yuboriladi va `/api/context/rtk/filters` diagnostikasi orqali xabar qilinadi. Yaroqsiz ichki filtrlar darhol xatolik bilan to‘xtaydi.

## RTK TOML sxemasi v1 bilan muvofiqlik

OmniRoute RTK TOML sxemasi v1 dan foydalangan holda deklarativ filtr fayllarini tahlil qilishi, tekshirishi, sinovdan oʻtkazishi va oʻrnatishi mumkin.
Qoʻllab-quvvatlanadigan maydonlar: `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` va `[[tests.<filter>]]` ichki testlari.
Nomaʼlum maydonlar, notoʻgʻri yoki xavfsiz boʻlmagan muntazam ifodalar, bir vaqtda qoʻllanadigan olib tashlash/saqlash qoidalari, hajmi
1 MiB dan ortiq fayllar hamda nomaʼlum filtrlarga havolalar rad etiladi. Ichki testlari muvaffaqiyatsiz tugagan faylni
koʻrib chiqish uchun tekshirish mumkin, ammo uni oʻrnatish yoki yuklash mumkin emas. Maxsus faylni yuklashdagi xatolar
ochiq ishlash tamoyiliga amal qiladi: yaroqsiz fayl oʻtkazib yuboriladi va qolgan filtrlar ishlashda davom etadi.

OmniRoute vosita chiqishini mijoz uni allaqachon yozib olganidan keyin qabul qiladi, shu sababli `filter_stderr = true`
jarayon chiqishini yozib olish usulini oʻzgartira olmaydi. Bu maydon hech qanday amal bajarmaydigan parametr sifatida qabul qilinadi va tekshiruv ogohlantirish qaytaradi.
Bu ataylab RTK bajariluvchi fayli, qobiq ilgaklari, Rust buyruq implementatsiyalari yoki uning ishonchli saqlash tuzilmasi bilan
toʻliq muvofiqlik emas, balki **RTK TOML sxemasi v1 bilan muvofiqlik** deb taʼriflanadi.

Boshqaruv panelining kengaytirilgan RTK koʻrinishi joylangan yoki yuklangan TOML faylini qabul qiladi. Tekshiruv faqat oʻqish uchun moʻljallangan.
Oʻrnatish `DATA_DIR/rtk/filters.toml` faylini cheklangan ruxsatlar bilan atomar tarzda yozadi va
ishlayotgan filtrlar katalogini qayta ishga tushirmasdan yangilaydi. Mavjud faylni almashtirish uchun aniq `overwrite`
tasdigʻi talab qilinadi va avval `DATA_DIR/rtk/filters.toml.bak` yaratiladi.

## Filtr DSL

Filtrlar [Siqish qoidalari formati](./COMPRESSION_RULES_FORMAT.md) da tavsiflangan JSON sxemasidan foydalanadi.
Bajarilish muhiti quyidagi bosqichlarni koʻrsatilgan tartibda qoʻllaydi:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> satrlarni olib tashlash/kiritish
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Muhim maydonlar:

| Maydon                       | Maqsad                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Moslashtirishdan oldin terminal rang/boshqaruv ketma-ketliklarini olib tashlash       |
| `rules.filterStderr`         | Moslashtirish/filtrlashdan oldin keng tarqalgan stderr prefikslarini meʼyorlashtirish |
| `rules.replace`              | Tartiblangan muntazam ifoda almashtirishlarini qoʻllash                               |
| `rules.matchOutput`          | Chiqish maʼlum holatga mos kelganda ixcham xulosani qaytarish                         |
| `rules.matchOutput[].unless` | Xato/nosozlik namunasi mavjud boʻlsa, qisqartirilgan natijani oʻtkazib yuborish       |
| `rules.dropPatterns`         | Ortiqcha shovqinli satrlarni olib tashlash                                            |
| `rules.includePatterns`      | Amaliy harakatga undovchi satrlarni afzal koʻrish                                     |
| `rules.collapsePatterns`     | Takroriy mos keluvchi satrlarni birlashtirish                                         |
| `rules.deduplicate`          | Har bir filtr uchun ixtiyoriy: ketma-ket takroriy satrlarni birlashtirish             |
| `rules.truncateLineAt`       | Har bir satrni Unicode uchun xavfsiz tarzda qisqartirish                              |
| `rules.onEmpty`              | Barcha satrlar filtrlanganda koʻrsatiladigan zaxira xabar                             |
| `tests[]`                    | Tekshiruv bosqichida ishlatiladigan ichki namunalar                                   |

Oʻrnatilgan filtrlar ichki `tests[]` namunalarini oʻz ichiga olishi kutiladi. Maxsus filtrlar ham,
ayniqsa ular loyihalar oʻrtasida ulashilganda, bunday namunalarni oʻz ichiga olishi kerak.

## Satrlarni deduplikatsiya qilish (ikki qatlam)

RTK takroriy satrlarni ikkita mustaqil qatlamda birlashtiradi:

1. **Har bir filtr uchun `deduplicate` (ixtiyoriy, standart qiymati `false`).** Filtr `rules.deduplicate: true`
   qiymatini o‘rnatib, qisqartirishdan oldin _shu filtrga mos kelgan chiqish ichidagi_ ketma-ket takroriy
   satrlarni birlashtirishi mumkin. Bu `lineFilter.ts` ichida bajariladi. Eski filtrlar uchun filtr
   `collapsePatterns` ni belgilagan bo‘lsa, u avtomatik ravishda yoqiladi. Sxema:
   `open-sse/services/compression/engines/rtk/filterSchema.ts` ichidagi
   `deduplicate: z.boolean().default(false)`.
2. **Butun mexanizm bo‘yicha `deduplicateThreshold` (standart qiymati `3`).** Barcha filtrlar
   bajarilgach, mexanizm butun natija bo‘ylab ketma-ket kelgan bir xil satrlarning
   `>= deduplicateThreshold` uzunlikdagi har qanday ketma-ketligini birlashtiradi
   (`deduplicateRepeatedLines`, `engines/rtk/index.ts` ichida qo‘llanadi). Normallashtirishda qiymat
   2–100 oralig‘i bilan cheklanadi.

Avval har bir filtr uchun jarayon (filtr ichida), so‘ng butun mexanizm bo‘yicha jarayon (birlashtirilgan
chiqish ustida) bajariladi, shu sababli ular ikki marta hisoblamasdan birgalikda ishlaydi.

## Satrlarni guruhlash (`enableGrouping`)

`rtkConfig.enableGrouping` qiymati `true` bo‘lganda (standart qiymati `false`), RTK deduplikatsiyadan
keyingi natija ustida qo‘shimcha `groupSimilarLines` jarayonini bajaradi. Bu jarayon baytlar bo‘yicha
aynan bir xil bo‘lmagan, ammo _deyarli teng_ ketma-ket satrlarni birlashtiradi.
`rtkConfig.groupingThreshold` (standart qiymati `3`) guruhlashni ishga tushiradigan minimal ketma-ketlik
uzunligidir. Bu `deduplicateThreshold` ning tuzilmaviy muqobilidir: deduplikatsiya aynan bir xil
takrorlarni, guruhlash esa «kichik farqlarga ega bir xil shakl»ni qayta ishlaydi. Har ikkala bayroq ham
`key_value` jadvalida saqlanadigan `rtkConfig` JSON tarkibiga kiradi (yuqoridagi Konfiguratsiya bo‘limiga
qarang), shu sababli sozlama qayta ishga tushirishlardan keyin ham saqlanib qoladi.

## Kod izohlarini olib tashlash (`stripCodeComments` / `preserveDocstrings`)

`rtkConfig.applyToCodeBlocks` yoqilganda, RTK chegaralangan kod bloklaridan izohlarni ham olib tashlashi
mumkin:

- `stripCodeComments` (standart qiymati `false`) — ixtiyoriy. Qiymati `true` bo‘lganda, RTK JavaScript
  va TypeScript chegaralangan bloklaridan izohlarni olib tashlaydi. Tarixan bu bayroq o‘qilgan, ammo
  amalda qo‘llanmagan, shu sababli ishlab chiqarish muhitida sezilmas o‘zgarishga yo‘l qo‘ymaslik uchun
  standart qiymat «saqlab qolish» holatida qoladi.
- `preserveDocstrings` (standart qiymati `true`) — izohlar olib tashlanayotganda JSDoc/`/** … */` blok
  izohlari saqlab qolinadi (ular egallagan baytlardan ko‘ra qimmatroq bo‘lgan API hujjatlarini o‘z
  ichiga oladi). Ularni ham olib tashlash uchun qiymatni `false` qilib belgilang.

Izohlarni olib tashlash `open-sse/services/compression/engines/rtk/codeStripper.ts` ichida amalga
oshirilgan. U satr, shablon va muntazam ifoda literallari hech qachon izoh deb noto‘g‘ri qabul
qilinmasligi uchun regex emas, balki **TypeScript parser**dan foydalanadi hamda JSX aniqlansa, jarayonni
butunlay bekor qiladi (shuning uchun JSX ifoda konteynerlaridagi izohlar hech qachon buzilmaydi).
Hozirda izohlarni olib tashlash **faqat JavaScript va TypeScript** uchun qo‘llanadi — olib tashlagichning
`CodeLanguage` to‘plamidagi boshqa tillarda (Python, Rust, Go, Ruby, Java) bo‘sh satrlar va bo‘sh joylar
birlashtiriladi, ammo izohlar olib tashlanmaydi. Izohlari olib tashlangan blok jarayoni `rulesApplied`
ichida `rtk:code-strip` tegi bilan belgilanadi.

> **Eslatma — GCF / jadval ko‘rinishidagi kodlash alohida mexanizmdir.** RTK «GCF»
> (Graph Compact Format) jadval/ustun ko‘rinishidagi JSON kodlagichini o‘z ichiga **olmaydi**. Eski
> `omni-tabular` kodlagichini almashtirgan ushbu kodlagich **headroom** mexanizmida joylashgan
> (`open-sse/services/compression/engines/headroom/`, yetkazib beriladigan kodek esa
> `headroom/gcf/` ichida). U bu yerda hujjatlashtirilgan RTK filtr konveyeriga aloqador emas.

## Konfiguratsiya

Global sozlamalardan `/api/settings/compression` orqali foydalanish mumkin. RTKʼga xos sozlamalardan ham
`/api/context/rtk/config` orqali foydalanish mumkin.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` va `disabledFilters` filtr identifikatorlaridan foydalanadi, masalan, `test-vitest` yoki `git-diff`.

`rtkConfig`ning toʻliq tuzilishi `open-sse/services/compression/types.ts` faylidagi
`RtkConfig` / `DEFAULT_RTK_CONFIG` orqali belgilanadi. Butun obyekt SQLiteʼdagi `key_value` jadvalida
`namespace = "compression"`, `key = "rtkConfig"` ostida yagona JSON qiymati sifatida saqlanadi
(`src/lib/db/compression.ts`) va oʻqish vaqtida `normalizeRtkConfig` orqali normallashtiriladi. Shu sababli quyidagi har bir
maydon — jumladan, `enableGrouping`, `groupingThreshold`, `stripCodeComments` va `preserveDocstrings` —
bir xil saqlash mexanizmi orqali toʻliq yoziladi va oʻqiladi hamda qayta ishga tushirilgandan keyin ham saqlanib qoladi.

| Kalit                  | Standart qiymat | Maqsad                                                                                                 |
| ---------------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `deduplicateThreshold` | `3`             | Butun mexanizm uchun: birlashtiriladigan ketma-ket bir xil satrlarning minimal soni (2–100 oraligʻida) |
| `enableGrouping`       | `false`         | Ixtiyoriy: deyarli teng boʻlgan ketma-ket satrlar guruhlarini birlashtirish                            |
| `groupingThreshold`    | `3`             | Guruhlashni ishga tushiradigan ketma-ket oʻxshash satrlar guruhining minimal soni                      |
| `stripCodeComments`    | `false`         | Ixtiyoriy: chegaralangan kod bloklaridan izohlarni olib tashlash (`applyToCodeBlocks` talab qilinadi)  |
| `preserveDocstrings`   | `true`          | Izohlarni olib tashlashda JSDoc/`/** … */` bloklarini saqlab qolish                                    |

## API

| Yoʻnalish                          | Metod | Maqsad                                                                |
| ---------------------------------- | ----- | --------------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET   | RTK konfiguratsiyasini oʻqish                                         |
| `/api/context/rtk/config`          | PUT   | RTK konfiguratsiyasini yangilash                                      |
| `/api/context/rtk/filters`         | GET   | Filtrlar katalogi va yuklash diagnostikasini koʻrsatish               |
| `/api/context/rtk/import`          | POST  | RTK TOML schema v1 fayllarini tekshirish yoki oʻrnatish               |
| `/api/context/rtk/test`            | POST  | Bitta matnli yuklama uchun RTK siqilishini oldindan koʻrish           |
| `/api/context/rtk/raw-output/[id]` | GET   | Saqlab qolingan, maxfiy maʼlumotlari yashirilgan xom chiqishni oʻqish |
| `/api/compression/preview`         | POST  | Istalgan siqish rejimini oldindan koʻrish                             |

RTK sinov yuklamasi:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Siqishni oldindan koʻrish yuklamasi:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Boshqaruv yoʻnalishlari boshqaruv panelining boshqaruv autentifikatsiyasini yoki mos API kaliti siyosatini talab qiladi.

RTK TOML tekshiruv yuklamasi:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Tekshirilgan faylni global miqyosda oʻrnatish uchun `"action": "install"` dan foydalaning. Mavjud global faylni
almashtirishni koʻrib chiqib, tasdiqlaganingizdan keyingina `"overwrite": true` ni qoʻshing.

## Xom chiqishni tiklash

RTK odatda faqat siqilgan matnni qaytaradi. Nosozliklarni tuzatish uchun `rawOutputRetention` tahrirlangan
xom chiqishni saqlab qolishi mumkin:

| Qiymat     | Xatti-harakat                                                    |
| ---------- | ---------------------------------------------------------------- |
| `never`    | Xom chiqishni saqlab qolmaslik                                   |
| `failures` | Faqat xatolik bo‘lishi ehtimoli yuqori bo‘lgan chiqishni saqlash |
| `always`   | Har bir siqilgan RTK xom chiqishini tahrirlashdan so‘ng saqlash  |

Saqlab qolingan fayllar quyidagi joyga yoziladi:

```txt
DATA_DIR/rtk/raw-output/
```

Saqlashdan oldin maxfiy ma’lumotlar tahrirlanadi, jumladan keng tarqalgan bearer tokenlari, API kalitlari, Slack tokenlari,
AWS kirish kalitlari va tayinlash uslubidagi `token=...`, `secret=...`, `password=...` qiymatlari. Tahlil tizimi
faqat ko‘rsatkich identifikatori, hajm va xesh metama’lumotlarini saqlaydi.

## Tekshiruv darvozasi

Yo‘naltirilgan tekshiruv darvozasi tashqi buyruqlarni ishga tushirmasdan, ichki inline filtr sinovlarini bajaradi:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Kengroq RTK darvozasi:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Relizdan oldin keng qamrovli siqish darvozasini ishga tushiring:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK imkoniyatlarini kengaytirish

1. Filtr JSON faylini qo‘shing yoki yangilang.
2. Muhim xatti-harakatni tasdiqlaydigan kamida bitta `tests[]` namunasini kiriting.
3. Yangi buyruqlar oilalari uchun `tests/unit/compression/fixtures/rtk/` ostiga fixture qo‘shing.
4. Yangi chiqish sinfini joriy etishda buyruqni aniqlash qamrovini qo‘shing.
5. Tekshiruv va kengroq RTK darvozalarini ishga tushiring.
6. Agar filtr loyihaga xos bo‘lsa, `.rtk/filters.json` faylini commit qiling va `.rtk/trust.json` faylini faqat ko‘rib chiqishdan keyin yangilang.

---

## Intensivlik darajalari (v3.8.16+)

RTK **siqish agressivligi** va **xavfsizlik** o‘rtasida muvozanat yaratadigan **3 ta intensivlik darajasini** qo‘llab-quvvatlaydi. Daraja dvigatel konfiguratsiyasidagi `config.intensity` orqali o‘rnatiladi.

### 3 ta daraja

| Daraja                | Qisqartirish chegarasi    | Token tejalishi | Xavf      | Eng mos holat                            |
| --------------------- | ------------------------- | --------------- | --------- | ---------------------------------------- |
| `minimal`             | Har bir bo‘limda 24 qator | ~20-40%         | Juda past | Muhim kontekstli ishlab chiqarish muhiti |
| `standard` (standart) | Har bir bo‘limda 24 qator | ~50-70%         | Past      | Kundalik kod yozish seanslari            |
| `aggressive`          | Har bir bo‘limda 16 qator | ~70-90%         | O‘rtacha  | Uzoq seanslar, maksimal tejash           |

### Qisqartirish qayerda amalga oshiriladi

Qisqartirish chegarasi `lineFilter.ts` fayliga ta’sir qiladi:

```ts
// open-sse/services/compression/engines/rtk/index.ts:329-330 dan
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Har bir bo‘limning **boshi** ham, **oxiri** ham saqlanadi; qisqartirish ishga tushganda o‘rtadagi kontent olib tashlanadi.

### Nimalar saqlanadi va nimalar qisqartiriladi

| Kontent                             | minimal         | standard           | aggressive         |
| ----------------------------------- | --------------- | ------------------ | ------------------ |
| Xatolar / stek treyslari            | ✅ saqlanadi    | ✅ saqlanadi       | ✅ saqlanadi       |
| Muvaffaqiyatsiz sinovlar            | ✅ saqlanadi    | ✅ saqlanadi       | ✅ saqlanadi       |
| Yig‘ish xatolari                    | ✅ saqlanadi    | ✅ saqlanadi       | ✅ saqlanadi       |
| Muvaffaqiyatli sinovlar (batafsil)  | ✅ saqlanadi    | 🟡 ixchamlanadi    | 🟡 ixchamlanadi    |
| Odatiy chiqish (axborot jurnallari) | 🟡 ixchamlanadi | 🟡 ixchamlanadi    | ❌ olib tashlanadi |
| Jarayon ko‘rsatkichlari             | 🟡 ixchamlanadi | ❌ olib tashlanadi | ❌ olib tashlanadi |
| Banner / ASCII tasviri              | 🟡 ixchamlanadi | ❌ olib tashlanadi | ❌ olib tashlanadi |

### To‘g‘ri intensivlikni tanlash

```
                  Kontekstni yo‘qotish halokatlimi?
                  │
      ┌───────────┼───────────┐
      │           │           │
     HA          YO‘Q      ISHONCHSIZ
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      O‘tkazuvchanlik  Avval `standard`ni sinang
      │      qanchalik muhim? (holatlarning 80% ida
      │           │          ishlaydi)
      │      ┌────┴────┐
      │      │         │
      │    PAST      YUQORI
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Intensivlikni sozlash

**Har bir combo uchun** (combo konfiguratsiyasida):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Dasturiy tarzda**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) — bu
`CompressionEngine` bo‘lib, unda `updateConfig` metodi yo‘q. Dvigatel konfiguratsiyasini
buning o‘rniga reyestr yordamchisi orqali yangilang:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Ta’sirni tekshirish

Filtringiz tanlangan intensivlikda xavfsiz ekanini tasdiqlash uchun **Tekshiruv darvozasi**dan (quyiga qarang) foydalaning:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtrlar agressiv intensivlikda muvaffaqiyatsiz yakunlandi");
}
```

---

## Maxsus filtr ishlab chiqish (v3.8.16+)

`engines/rtk/filters/` katalogida **49+ ta ichki filtr JSON fayli** mavjud. Standart filtrlar qamrab olmagan maxsus vositalar chiqishini siqish uchun o‘z filtringizni qo‘shishingiz mumkin.

### Filtr sxemasi (Zod)

```ts
{
  "id": "string",                      // Majburiy. Filtr identifikatori (kebab-case, masalan, "python-traceback")
  "label": "string",                   // Majburiy. Inson o‘qishi uchun qulay filtr nomi
  "description": "string",             // Ixtiyoriy (standart: ""). Filtr nima qilishining qisqa tavsifi
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Ixtiyoriy (0-100, standart: 50). Bajarilish tartibi (yuqoriroq = avval)
  "match": {
    "commands": ["string"],            // Moslashtiriladigan buyruq nomlari (masalan, "python", "pytest")
    "patterns": ["string"],            // Chiqishni moslashtirish uchun regex andozalari
    "outputTypes": ["string"]          // Aniqlangan chiqish sinflari (masalan, "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Ixtiyoriy (standart: false). ANSI rang kodlarini olib tashlash
    "replace": [                       // Qidirish va almashtirish qoidalari (standart: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Andoza mos kelganda qisqa yo‘l bilan yakunlash (standart: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Ushbu andoza mos kelsa, o‘tkazib yuborish
      }
    ],
    "includePatterns": ["string"],     // Saqlab qolinadigan satrlar (regex andozalari, standart: [])
    "dropPatterns": ["string"],        // Olib tashlanadigan satrlar (regex andozalari, standart: [])
    "collapsePatterns": ["string"],    // Bitta uchrashuvgacha yig‘iladigan satrlar (standart: [])
    "deduplicate": boolean,            // Ixtiyoriy (standart: false). Takroriy satrlarni olib tashlash
    "truncateLineAt": number,          // Ixtiyoriy (standart: 0). Satrlarni maksimal belgilar sonigacha qisqartirish
    "maxLines": number,                // Ixtiyoriy (standart: 0). Umumiy satrlar sonining qat’iy chegarasi
    "headLines": number,               // Ixtiyoriy (standart: 20). Mos kelgan chiqishning dastlabki N satrini saqlash
    "tailLines": number,               // Ixtiyoriy (standart: 20). Mos kelgan chiqishning oxirgi N satrini saqlash
    "onEmpty": "string",               // Ixtiyoriy (standart: ""). Barcha satrlar filtrlanganda zaxira xabar
    "filterStderr": boolean            // Ixtiyoriy (standart: false). stderr chiqishini ham filtrlash
  },
  "preserve": {
    "errorPatterns": ["string"],       // Har doim saqlanishi shart bo‘lgan andozalar (standart: [])
    "summaryPatterns": ["string"]      // Yakuniy xulosa satri uchun andozalar (standart: [])
  },
  "tests": [                           // Tekshirish uchun ichki testlar (standart: [])
    {
      "name": "string",               // Majburiy. Test nomi
      "input": "sample output",        // Majburiy. Namunaviy kirish matni
      "expected": "expected output",   // Majburiy. Kutilgan siqilgan chiqish
      "command": "optional command"    // Ixtiyoriy. Buyruq konteksti
    }
  ]
}
```

### Misol: Python Traceback filtri

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Maxsus filtrlarni yuklash

Faylni tan olinadigan joyga joylashtiring:

```
~/.omniroute/rtk/filters/my-filter.json     # Foydalanuvchi darajasida
<project>/.rtk/filters/my-filter.json      # Loyiha darajasida
```

Filtrlar ishga tushishda `open-sse/services/compression/engines/rtk/filterLoader.ts` ichidagi `loadRtkFilters()` orqali avtomatik ravishda yuklanadi. Yuklagich filtrlarni quyidagi joylardan topadi:

- Ichki katalog: `open-sse/services/compression/engines/rtk/filters/`
- Foydalanuvchi katalogi: `~/.omniroute/rtk/filters/`
- Loyiha katalogi: `<project>/.rtk/filters/`

Filtrlarni dasturiy ravishda yuklash uchun:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Parametrlar: customFiltersEnabled (foydalanuvchi/loyiha filtrlarini yuklash, standart bo‘yicha yoqilgan),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Tekshirish

Filtrlar yuklanish vaqtida Zod sxemasiga muvofiq tekshiriladi. Tuzilishi noto‘g‘ri bo‘lgan filtr yuklanmaydi va xato jurnalga yoziladi:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Barcha o‘rnatilgan filtrlarni tekshirish uchun `open-sse/services/compression/engines/rtk/verify.ts` faylidan eksport qilinadigan `runRtkFilterTests()` funksiyasini chaqiring.

### Eng yaxshi amaliyotlar

1. **Har doim `tests[]` ni kiriting** — ular filtringiz ishlashini isbotlaydi va regressiyalarning oldini oladi
2. **Qisqa tutashuvlar uchun `matchOutput` dan foydalaning** — agar bitta satr mazmunni toʻliq ifodalasa, butun blokni almashtiring
3. **`strip` oʻrniga `keep` ni afzal koʻring** — aniq «har doim saqlash» qoidalari «har doim olib tashlash» qoidalaridan xavfsizroq
4. **Barcha 3 ta intensivlik darajasida sinovdan oʻtkazing** — `minimal` hech qanday amal bajarmasligi, `aggressive` esa xatolarni baribir saqlab qolishi kerak
5. **`unless` maydonidan foydalaning** — qisqa tutashuvlarni «agar X mavjud boʻlsa, ishga tushirma» sharti bilan himoyalang

---

## Xom chiqishni tiklash va tekshiruv darvozasi

RTK chiqishni agressiv tarzda siqqanda, nosozliklarni tuzatish, audit yoki qayta ijro etish uchun **asl matnni tiklashingiz** mumkin.

### Xom chiqishni tiklash qanday ishlaydi

```
Asl chiqish (10K token)
        │
        ▼
RTK siqishi (rawOutput.enabled=true bilan)
        │
        ├─▶ Siqilgan chiqish (2K token)  ──▶ LLM'ga
        │
        └─▶ Asl chiqish (10K token)      ──▶ DB'da saqlanadi
                                                (request_id orqali bogʻlangan)
```

### Xom chiqishni saqlashni yoqish

**Har bir soʻrov uchun** (combo konfiguratsiyasida):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1MB cheklov
    }
  }
}
```

**Standart holat**: `rawOutput.enabled: false` (saqlash joyini tejaydi).

### Saqlash xarajati

| Har bir soʻrov uchun        | 1MB cheklov  | 10MB cheklov  |
| --------------------------- | ------------ | ------------- |
| Oʻrtacha siqilgan chiqish   | ~5KB         | ~5KB          |
| Saqlangan xom chiqish       | ~50-500KB    | ~500KB-5MB    |
| Kuniga 1000 ta soʻrov bilan | 50-500MB/kun | 500MB-5GB/kun |

> **Tavsiya**: Xom chiqishni doimiy ravishda emas, faqat **nosozliklarni tuzatish seanslari** yoki **tanlab olingan audit** uchun yoqing.

### Asl nusxani tiklash

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // compression stats'dan olingan pointerId
if (raw) {
  console.log("Original output:", raw);
}
```

Siqishdan soʻng `pointerId` qiymati `CompressionStats.rtkRawOutputPointers[]` ichida qaytariladi.
Funksiya signaturasi uchun `open-sse/services/compression/engines/rtk/rawOutput.ts:102` fayliga qarang.

### Tekshiruv darvozasi

**RTK filtrlarini tekshirish** (`open-sse/services/compression/engines/rtk/verify.ts`) barcha filtrlarni ularning `tests[]` toʻplamiga nisbatan tekshiradi va barcha 3 ta intensivlik darajasida ishlash toʻgʻriligini taʼminlaydi.

Tekshiruvni ishga tushirish uchun **`runRtkFilterTests()` funksiyasini chaqiring**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**U nimalarni tekshiradi**:

1. Har bir filtr yuklanadi va sxema tekshiruvidan oʻtadi
2. Har bir `tests[]` elementi kutilgan chiqishni hosil qiladi
3. `minimal` intensivlik hech qanday oʻzgartirish kiritmaydi (asl nusxani saqlaydi, faqat tuzilmaviy filtrlarni qoʻllaydi)
4. `aggressive` intensivlik xatolarni, muvaffaqiyatsiz testlarni va stek izlarini saqlab qoladi
5. Siqilgan chiqish hech qachon asl kirishdan kattaroq boʻlmaydi

- Manba: `open-sse/services/compression/engines/rtk/` (63 ta fayl, ~70KB)

- **Filtr oʻzgarishini birlashtirishdan oldin** — testlar muvaffaqiyatli oʻtganiga doim ishonch hosil qiling
- **RTK mexanizmini yangilagandan soʻng** — sxema oʻzgargan boʻlishi mumkin
- **Monitoring doirasida davriy ravishda** — test namunalaridagi ogʻishlardan himoya qiladi
- **Yangi vosita/buyruq oilasini qoʻshganda** — yangi filtr ishlashini tasdiqlaydi

---

## Shuningdek qarang

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Toʻliq siqish konveyeri sharhi
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Dvigatellar reyestri va ichki o‘rnatilgan dvigatellar
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Maxsus dvigatellar, til paketlari, ketma-ket konveyerlar
- Manba: `open-sse/services/compression/engines/rtk/` (63 ta fayl, ~70KB)
