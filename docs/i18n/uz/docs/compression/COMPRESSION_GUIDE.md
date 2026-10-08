# 🗜️ Prompt Compression Guide — OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Mos kontekstda avtomatik ravishda 15–95% tejang. Qisqacha umumiy maʼlumot uchun [README siqish bo‘limi](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)ga qarang.

## Umumiy ko‘rinish

OmniRoute so‘rovlar yuqori oqimdagi provayderlarga yetib borishidan **oldin** proaktiv tarzda ishlaydigan modulli prompt siqish konveyerini amalga oshiradi. Bu tokenlarni tejash jarayoni shaffof tarzda bajarilishini anglatadi — ish jarayoningizni o‘zgartirish shart emas.

```
Mijoz so‘rovi
  → Siqish strategiyasi selektori
    → Kombinatsiya ustuvor sozlamasi bormi? → Kombinatsiya sozlamasidan foydalanish
    → Avtomatik ishga tushirish chegarasimi? → Avtomatik rejimdan foydalanish
    → Standart rejimmi? → Global sozlamadan foydalanish
    → O‘chirilganmi? → Siqishni o‘tkazib yuborish
  → Tanlangan siqish rejimi
    → Off: Siqish yo‘q
    → Lite: Xavfsiz bo‘shliq/formatlashni tozalash (~15%)
    → Standard: Caveman uslubida ortiqcha so‘zlarni olib tashlash (~30%)
    → Aggressive: Tarixni eskirtirish + umumlashtirish (~50%)
    → Ultra: Evristik qisqartirish + kod bloklarini siyraklashtirish (~75%)
    → RTK: Buyruqlarni hisobga olgan terminal/vosita chiqishini filtrlash (yuqori oqimda 60–90% diapazon)
    → Stacked: Tartiblangan ko‘p mexanizmli konveyer, odatda RTK, so‘ng Caveman (mos kontekstda 78–95% diapazon)
  → Siqilgan so‘rov → Provayder
```

---

## Siqish rejimlari

### Off

Hech qanday siqish qo‘llanmaydi. Barcha xabarlar o‘zgartirilmasdan uzatiladi.

### Lite rejimi (~15% tejash, <1ms kechikish)

Eng xavfsiz rejim — semantik o‘zgarishsiz, faqat formatlashni tozalaydi:

| Usul                     | Tavsif                                                                |
| ------------------------ | --------------------------------------------------------------------- |
| `collapseWhitespace`     | Ketma-ket bo‘sh satrlar va satr oxiridagi bo‘shliqlarni birlashtiradi |
| `dedupSystemPrompt`      | Takroriy tizim xabarlarini olib tashlaydi                             |
| `compressToolResults`    | Batafsil vosita/funksiya chiqishlarini siqadi                         |
| `removeRedundantContent` | Takrorlangan ko‘rsatmalarni olib tashlaydi                            |
| `replaceImageUrls`       | Base64 rasm maʼlumotlari URI manzillarini qisqartiradi                |

**Eng mos holat:** Doimo yoqilgan foydalanish, xavfsizlik muhim bo‘lgan ish jarayonlari.

### Standard rejimi (~30% tejash)

[Caveman](https://github.com/JuliusBrussee/caveman) loyihasidan ilhomlangan — maʼnoni saqlagan holda ortiqcha so‘zlar va cho‘zib yozilgan iboralarni olib tashlaydi:

- Ortiqcha so‘zlarni olib tashlaydi ("iltimos", "menimcha", "asosan", "aslida")
- Cho‘zib yozilgan iboralarni ixchamlaydi ("... qilish maqsadida" → "... uchun", "... natijasida" → "... sababli")
- Muloyim ehtiyotkor iboralarni olib tashlaydi ("Qarshi emasmisiz...", "Agar imkoningiz bo‘lsa...")
- Dasturlash promptlari uchun sozlangan 30 dan ortiq regex qoidalari

**Eng mos holat:** Kundalik dasturlash ish jarayonlari, xarajatlarni hisobga oladigan jamoalar.

### Aggressive rejimi (~50% tejash)

Uzoq seanslar uchun aqlli tarix boshqaruvi:

- **Xabarlarni eskirtirish** — eski xabarlar bosqichma-bosqich ko‘proq siqiladi
- **Vosita natijalarini siqish** — uzun vosita chiqishlari qisqartiriladi yoki tushirib qoldiriladi (birinchi/oxirgi satrlar,
  mos keluvchi satrlarni filtrlash, JSON kalitlarini ixchamlash)
- **Strukturaviy yaxlitlik himoyasi** — `tool_use` + `tool_result` juftliklarining muvofiqligini taʼminlaydi
- **Kontekst oynasini hisobga olish** — har bir model uchun token cheklovlariga amal qiladi

**Eng mos holat:** Uzoq davom etadigan nosozliklarni tuzatish seanslari, katta kod bazalari.

### Ultra rejimi (~75% tejash)

Tokenlar juda muhim bo‘lgan holatlar uchun maksimal siqish:

- **Evristik qisqartirish** — matn tokenlarini ball asosida qisqartirish
- **Strukturani saqlash** — chegaralangan kod bloklari, satr ichidagi kod, URL manzillari va identifikatorlar
  vaqtinchalik belgilar bilan almashtirilib, keyin so‘zma-so‘z qayta tiklanadi va hech qachon qisqartirilmaydi
- **Ixtiyoriy SLM darajasi** — sozlangan bo‘lsa, kichik lokal model qisqartirishni takomillashtirishi mumkin
- Aggressive rejimidan mustaqil: u xabarlarni eskirtirish, vosita natijalarini siqish
  yoki zaxira umumlashtiruvchini ishga tushirmaydi (faqat SLM darajasidagi nosozlik zaxira o‘tishini
  aggressive orqali yo‘naltirishi mumkin)

**Eng mos holat:** Kontekst cheklovlariga qayta-qayta duch kelganingizda.

### RTK rejimi (yuqori oqimda 60–90% diapazon)

RTK rejimi dasturlash agenti seanslarida uchraydigan batafsil vosita chiqishlari uchun optimallashtirilgan:

- `git status`, `git diff`, `git log`, test ishga tushiruvchilari,
  TypeScript/Vite/Webpack yig‘ishlari, ESLint/Biome/Prettier, npm audit/o‘rnatishlar, Docker jurnallari, infratuzilma
  chiqishi va umumiy qobiq chiqishi kabi buyruq/chiqish sinflarini aniqlaydi
- `open-sse/services/compression/engines/rtk/filters/` ichidagi JSON filtr to‘plamlarini qo‘llaydi
- Loyiha yoki global `filters.toml` fayllaridan RTK TOML schema v1 filtrlarini import qiladi, bunda ichki test
  tekshiruvi va loyiha fayllari uchun ishonch nazorati qo‘llanadi
- Ichki tekshiruv namunalari bilan birga 55 ta o‘rnatilgan filtrni taqdim etadi
- ANSI boshqaruv ketma-ketliklari, jarayon indikatorlari, takroriy satrlar va foydasiz shovqinni olib tashlaydi
- Nosozliklar, xatolar, ogohlantirishlar, o‘zgartirilgan fayllar, xulosalar va uzun chiqishning oxirgi qismini saqlaydi
- Ishonch nazoratidagi loyiha filtrlari, global filtrlar va ixtiyoriy ravishda maxfiy maʼlumotlari yashirilgan xom chiqishni tiklashni qo‘llab-quvvatlaydi

**Eng mos holat:** Qobiq, yig‘ish, test, git, grep va fayl chiqishi transkriptlarini o‘z ichiga olgan agent seanslari.

### Stacked rejimi (mos kontekstda 78–95% diapazon)

Stacked rejimi bir nechta siqish mexanizmini deterministik tartibda ishga tushiradi. Standart konveyer:

```txt
RTK -> Caveman
```

Bu tartib avval terminal/vosita chiqishini ixchamlaydi, so‘ng qolgan tabiiy tildagi promptga Caveman semantik ixchamlashini qo‘llaydi. Stacked konveyerlarini global ravishda yoki marshrutlash kombinatsiyalariga biriktirilgan siqish kombinatsiyalari orqali sozlash mumkin.

**Eng mos holat:** Katta vosita jurnallari hamda inson ko‘rsatmalari yoki yordamchi xulosalarini o‘z ichiga olgan aralash kontekst.

---

## Yuqori oqimdagi tejash hisobi

OmniRoute siqish orqali tejash ko‘rsatkichlarini ikki manba asosida hujjatlashtiradi: yuqori oqimdagi loyiha benchmarklari va
OmniRoute’ning o‘z dvigatellar kompozitsiyasi.

| Manba   | Bu yerda ishlatilgan yuqori oqim README ko‘rsatkichi                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | chiqish tokenlari `~75%` kamroq, benchmark bo‘yicha o‘rtacha chiqish tejami `65%`, diapazon `22-87%` va kirishni `~46%` siquvchi vosita |
| RTK     | buyruq chiqishida `60-90%` tejash; namunaviy seansda `~118,000 -> ~23,900` token yoki `79.7%` tejash (`~80%`)                           |

Bir-birini qoplaydigan vosita/kontekst yuklamalari uchun standart OmniRoute kombinatsiyasi dvigatellarni ketma-ket qo‘llaydi:

```txt
RTK -> Caveman
```

Umumiy tejash qo‘shilmaydi, balki ko‘paytirish orqali hisoblanadi:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Bu `78-95%` ko‘rsatkichi RTK va Caveman bir xil kirish/kontekst yuklamasini qisqartira olgan hollarda amal qiladi.
Caveman javob chiqishi rejimi alohida: u yoqilganda Caveman’ning o‘z chiqish tejash ko‘rsatkichlaridan foydalaning (o‘rtacha `65%`,
asosiy ko‘rsatkich `~75%`, diapazon `22-87%`). Umumiy hisob-kitob tejami prompt va chiqish nisbatiga bog‘liq.

### “Mos keladigan” aslida nimani anglatadi

15-95% asosiy diapazoni haqiqiy, ammo u faqat **takroriy yoki ortiqcha batafsil** kontentga — takrorlangan
xato satrlari, bir xil ogohlantirishni qayta-qayta chiqaradigan build logi, haddan tashqari katta `grep`/faylni o‘qish natijasiga taalluqli.
Bu **har bir** so‘rov shuncha tejaydi degani emas.

Empirik tarzda tasdiqlangan (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 ta bir xil
xato satridan iborat Anthropic shaklidagi `tool_result` blokida `stacked` (RTK + Caveman) ishga tushirilganda
**tokenlar bo‘yicha 95.93% tejash / belgilar bo‘yicha 96.26% tejash** kuzatildi — bu e’lon qilingan
diapazonga to‘liq mos keladi. Ammo ayni konveyer odatiy, takroriy bo‘lmagan vosita chiqishida (toza `grep` mosliklari ro‘yxati,
qisqa fayl o‘qilishi, oddiy suhbat matni) to‘g‘ri ravishda **deyarli nol tejash** beradi, chunki
olib tashlash uchun takroriy hech narsa yo‘q va `validateCompression()` (`validation.ts`) kod bloklari, URL manzillari,
sarlavhalar, versiyalar yoki BARCHA-HARFLARI-KATTA konstanta identifikatorlarini tushirib qoldiradigan yoxud o‘zgartiradigan
qayta yozilgan natijani yuborishni rad etadi.

Bu kutilgan, xavfsiz xatti-harakatdir, xato emas: asosan toza fayllarni o‘qiydigan yoki `grep` orqali qidiradigan dasturlash seansi,
siqish to‘liq yoqilgan bo‘lsa ham, kamtarona umumiy tejashni ko‘radi; muvaffaqiyatsiz takroriy siklga yoki
sergap linterga duch kelgan seans esa bunday trafikda to‘liq 78-95% diapazonni ko‘radi. Bitta seansdagi
past umumiy tejash foizini siqish noto‘g‘ri sozlanganining dalili sifatida qabul qilmang — avval
asosiy vosita chiqishi haqiqatan ham takroriy bo‘lgan-bo‘lmaganini tekshiring.

---

## Token tejash vizualizatsiyasi

```
Siqishsiz:               LLM’ga 47K token yuboriladi
Lite bilan:              40K token yuboriladi          (15% tejash — xavfsiz, doimo yoqilgan)
Standard bilan:          33K token yuboriladi          (30% tejash — caveman-speak qoidalari)
Aggressive bilan:        24K token yuboriladi          (50% tejash — eskirish + umumlashtirish)
Ultra bilan:             12K token yuboriladi          (75% tejash — evristik saralash)
RTK bilan:               19K-5K token yuboriladi       (buyruq/vosita chiqishida 60-90% tejash)
Stacked bilan:           10K-2.5K token yuboriladi     (mos keladigan RTK+Caveman diapazoni 78-95%)
```

---

## Konfiguratsiya

### Boshqaruv paneli

`Dashboard → Context & Cache` bo‘limiga o‘ting:

- **Caveman** — rejim tanlash, til paketlari, oldindan ko‘rish va global standart sozlamalar
- **RTK** — buyruq filtri natijasini oldindan ko‘rish, RTK xavfsizlik sozlamalari va filtrlar katalogi
- **Compression Combos** — marshrutlash kombinatsiyalariga biriktirilgan, nomlangan mexanizm konveyerlari
- **Auto-Trigger Threshold** — tokenlar soni chegaradan oshganda siqishni avtomatik ravishda ishga tushiradi

### Har bir kombinatsiya uchun alohida sozlama

`Dashboard → Context & Cache → Compression Combos` bo‘limida marshrutlash kombinatsiyasiga siqish
kombinatsiyasini biriktiring:

```txt
Kombinatsiya: "free-tier-fallback"
  Siqish kombinatsiyasi: "coding-agent-stack"
  Konveyer: RTK -> Caveman
  Nishonlar:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu pulli obunalarda yengil rejimni saqlagan holda bepul/kodlash provayderlarida ketma-ket siqishdan
foydalanish imkonini beradi.

Ushbu "Har bir kombinatsiya uchun alohida sozlama" biriktiruvi **marshrutlash kombinatsiyasining siqish
rejimi** ustuvor sozlamasidan (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — maydon
sxemasi `rtk`, `stacked` va `omniglyph` qiymatlarini ham qabul qiladi) farqli boshqaruv elementidir —
bu ustuvor sozlama nomlangan siqish kombinatsiyasi konveyerini tanlamaydi; u faqat
`resolveCompressionPlan` tomonidan tekshiriladigan `compressionMode` maydonini o‘rnatadi. Uni
kombinatsiya kartasida (`Dashboard → Combos`) yoki #6760 dan boshlab,
`Dashboard → Context & Cache → Compression Combos` bo‘limidagi "Assign to routing" ro‘yxatida, yuqorida
hujjatlashtirilgan konveyerni biriktirish katakchasi yonida har bir marshrutlash kombinatsiyasi uchun
alohida o‘rnatish mumkin. Har ikki interfeys sozlamalarni bir xil `PUT /api/combos/{id}` endpointi
orqali saqlaydi.

### Har bir so‘rov uchun alohida sozlama

Bitta so‘rov uchun siqish rejasini almashtirish maqsadida `x-omniroute-compression` so‘rov sarlavhasini
yuboring. U eng yuqori ustuvorlikka ega — u marshrutlash kombinatsiyasi ustuvor sozlamasi, faol profil,
avtomatik ishga tushirish va paneldagi Default sozlamasidan ustun turadi. Noma’lum qiymatlar e’tiborsiz
qoldiriladi (so‘rov hech qachon rad etilmaydi), global asosiy kalit esa hamon barcha amallarni boshqaradi:
siqish global miqyosda o‘chirilgan bo‘lsa, sarlavha uni yoqa olmaydi. Qiymatlar:

| Qiymat        | Ta’siri                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Bu so‘rov uchun siqish qo‘llanmaydi.                                                                                        |
| `default`     | Panel asosida aniqlangan Default profil (faol profilni e’tiborsiz qoldiradi). Yo‘qotishli mexanizmlar o‘chiq qoladi.        |
| `safe`        | Sarlavhani kiritmaslik bilan bir xil: faqat takrorlarni olib tashlash va bo‘sh joylarni birlashtirish.                      |
| `allow-lossy` | Ushbu so‘rovning operator rejasini, jumladan xulosalar, dolzarblik filtrlari va uslubni qayta yozishni saqlab qoladi.       |
| `engine:<id>` | Yoqilgan bo‘lsa, bitta mexanizm, masalan, `engine:rtk`. Bu ushbu so‘rov uchun o‘sha mexanizmni ixtiyoriy yoqish usulidir.   |
| `<combo>`     | Avval nomi bo‘yicha (katta-kichik harflarni farqlamasdan), keyin esa id bo‘yicha moslashtiriladigan nomlangan kombinatsiya. |

`allow-lossy`, `engine:<id>` yoki nomlangan kombinatsiyasiz yo‘qotishli mexanizmlar qo‘llanmaydi.
Siqish yoqilgan bo‘lsa, so‘rovga seansdagi takrorlarni olib tashlash va bo‘sh joylarni birlashtirish
baribir qo‘llanadi.

Qo‘llangan reja javobdagi `X-OmniRoute-Compression: <mode>; source=<source>` sarlavhasida qaytariladi,
bunda `<source>` quyidagilardan biri bo‘ladi: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` yoki `off`.

### API

```bash
# Siqish sozlamalarini olish
curl http://localhost:20128/api/settings/compression

# Siqish sozlamalarini yangilash
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Muayyan RTK/stacked foydali yuklamasini oldindan ko‘rish
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtr paketlarini ro‘yxatlash
curl http://localhost:20128/api/context/rtk/filters

# Ixtiyoriy buyruq metama’lumotlari bilan RTK’ni bevosita sinash
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Nimalar himoyalanadi

Siqish mexanizmi **har doim quyidagilarni saqlab qoladi:**

- ✅ Kod bloklari (chegaralangan va qator ichidagi)
- ✅ URL manzillar va fayl yoʻllari
- ✅ JSON tuzilmalari va tuzilmaviy maʼlumotlar
- ✅ Identifikatorlar va himoyalangan texnik tokenlar
- ✅ Matematik ifodalar
- ✅ Vosita/funksiya chaqiruv taʼriflari
- ✅ Tizim promptlari (lite rejimida)

RTK xom chiqishni tiklash mexanizmi biror narsa saqlanishidan oldin keng tarqalgan API kalitlari, bearer tokenlari, Slack tokenlari, AWS kirish kalitlari,
parollar, tokenlar va maxfiy maʼlumotlarni tahrirlab yashiradi.

---

## Siqish statistikasi

Har bir siqilgan soʻrov server jurnallarida statistikani oʻz ichiga oladi:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Bosqichlar yoʻl xaritasi

| Bosqich    | Rejimlar                                                                                                                                                                            | Holat          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 1-bosqich  | Oʻchirilgan, Lite                                                                                                                                                                   | ✅ Chiqarilgan |
| 2-bosqich  | Standard, Aggressive, Ultra                                                                                                                                                         | ✅ Chiqarilgan |
| 3-bosqich  | RTK, Stacked, siqish kombinatsiyalari                                                                                                                                               | ✅ Chiqarilgan |
| 4-bosqich  | Chiqish uslublari, SLM darajasidagi Ultra, baholash infratuzilmasi                                                                                                                  | ✅ Chiqarilgan |
| 4C-bosqich | Moslashuvchan kontekst budjeti ("regulyator") — hisoblash mexanizmi + API (`PUT /api/settings/compression` dagi `contextBudget`) + boshqaruv panelidagi rejim/siyosat boshqaruvlari | ✅ Chiqarilgan |

---

## Minnatdorchilik

Standard rejimidagi siqish qoidalari **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) tomonidan yaratilgan **[Caveman](https://github.com/JuliusBrussee/caveman)** — ommalashgan "kam token ishni bajarsa, nega koʻp token ishlatish kerak" loyihasidan ilhomlangan. Caveman chiqish tokenlari `~75%` ga kamayishi, sinovlar boʻyicha chiqishdagi oʻrtacha `65%` tejamkorlik, chiqishdagi `22-87%` diapazon va kirishni siqish vositasi bilan `~46%` tejamkorlik haqida xabar beradi.

RTK rejimi **[RTK AI](https://github.com/rtk-ai)** tomonidan yaratilgan **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — terminal, yigʻish, sinov, git va vosita chiqishlarini filtrlash uchun moʻljallangan yuqori unumli buyruq chiqishini siqish loyihasidan ilhomlangan. RTK `60-90%` tejamkorlik haqida xabar beradi, uning README faylidagi namunaviy seans esa `~80%` tejalganini koʻrsatadi.

---

## Kengaytirilgan siqish tizimlari

Yuqorida tavsiflangan 7 rejimdan tashqari (manba `codex-responses` va
`omniglyph` rejimlarini ham qabul qiladi, biroq bu qoʻllanma ularni qamrab olmaydi), quyidagi boʻlimlarda
shu rejimlar ichida yoki ular bilan birga ishlaydigan imkoniyatlar yoritiladi: Vosita natijasini siqish va Progressiv eskirish
aggressive mexanizmining 1- va 2-qadamlaridir (Aggressive rejimi va
stacked konveyerining `aggressive` qadami), Stacked konveyeri Stacked rejimining qanday ishlashini belgilaydi, Keshni hisobga oluvchi siqish
siqish yoqilgan vaqtda keshlash provayderlari uchun `aggressive` va `ultra` rejimlarini `standard` darajasiga tushiradi,
Caveman chiqish rejimi va Chiqish uslublari esa standart holatda oʻchirilgan, soʻrovni siqish oʻrniga model chiqishini shakllantiradigan ixtiyoriy tizim prompti koʻrsatmalaridir.

### Keshni hisobga oluvchi siqish

Ayrim provayderlar (masalan, promptlarni keshlovchi Anthropic) **promptlarni keshlash** imkoniyatini qoʻllab-quvvatlaydi,
bu ularga xarajatlar va kechikishni kamaytirish uchun prompt qismlarini keshlash imkonini beradi. Keshlash
yoqilganida, agressiv siqish aslida unumdorlikka **zarar yetkazishi** mumkin,
chunki u keshlangan tokenlarni oʻzgartirib, keshni yaroqsiz holga keltiradi.

`cachingAware.ts` moduli buni **keshlash kontekstini aniqlash** va
**siqish strategiyasini mos ravishda sozlash** orqali hal qiladi.

#### U qanday ishlaydi

1. **Keshlash kontekstini aniqlash** — Soʻrov tanasida `cache_control` belgilarini qidiradi
2. **Keshlash provayderlarini aniqlash** — Moʻljaldagi provayder keshlashni qoʻllab-quvvatlashini tekshiradi
3. **Strategiyani sozlash** — Keshlash provayderlari uchun `aggressive`/`ultra` rejimlarini `standard` darajasiga tushiradi
4. **Tizim promptini oʻtkazib yuborish** — Tizim promptlari odatda keshlanadi, shuning uchun ularni siqmang

Strategiya yordamchisi `deterministicOnly` bayrogʻini ham qaytaradi, ammo reja tuzuvchisi
faqat strategiyadan foydalanadi — hozirda quyi oqimdagi hech narsa bu bayroqni oʻqimaydi.

#### Kod namunasi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Kesh belgisi
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Qachon foydalanish kerak

Keshni hisobga oluvchi siqish **har doim yoqilgan** — hech qanday sozlash talab qilinmaydi. U
siqish yoqilganida va moʻljaldagi provayder promptlarni keshlashni qoʻllab-quvvatlaganda (Anthropic, OpenAI
va boshqalar) ishga tushadi; aniq `cache_control` belgilari talab qilinmaydi — faqat keshlash provayderining oʻzi
darajani tushirishni faollashtiradi, faqat belgilarning oʻzi esa buni hech qachon amalga oshirmaydi (belgilarni aniqlash strategik qarorga emas,
kesh telemetriyasiga maʼlumot uzatadi).

### Progressiv eskirish

Uzoq suhbatlarda koʻplab xabar almashinuvi toʻplanadi, ammo eski almashinuvlar tobora kamroq
ahamiyatli boʻlib boradi. `progressiveAging.ts` moduli **xabarlarni almashinuv masofasiga qarab soddalashtiradi**
(masofa suhbat oxiridan boshlab oʻlchanadi). Taqdim etilgan standart qiymatlar
(`verbatim: 2, light: 2, moderate: 3`) bilan:

- **Oxirgi 2 ta navbat (masofa ≤ 2)**: Soʻzma-soʻz saqlanadi
- **Masofa 3**: Caveman siqishi (toʻldiruvchi soʻzlarni olib tashlash)
- **Masofa 4+**: Assistent xabarlari umumlashtiriladi; foydalanuvchi xabarlari birinchi
  qatorigacha qisqartirilib, 120 ta belgi bilan cheklanadi; boshqa rollar oʻzgartirilmaydi. Tizim promptlari, allaqachon eskirgan
  xabarlar va foydalanuvchining eng soʻnggi xabari masofadan qatʼi nazar har doim soʻzma-soʻz saqlanadi.
  Hech narsa butunlay olib tashlanmaydi va standart sozlamalarda `light`
  diapazoniga yetib boʻlmaydi (`light` qiymati `verbatim` qiymatiga teng).

#### Kod namunasi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... yana 50 ta navbat ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // oxirgi 3 ta navbat: soʻzma-soʻz
  light: 8, // masofa <= 8: yengil siqish
  moderate: 20, // masofa <= 20: caveman siqishi
  fullSummary: 5, // tur talab qiladi, diapazonlash kodi tomonidan oʻqilmaydi
  // masofa > 20: umumlashtiriladi (assistent) / birinchi qator saqlanadi (foydalanuvchi)
});

// saved = tejalgan tokenlar soni
```

#### Qachon foydalanish kerak

Progressiv eskirtirish `aggressive` rejimida **har doim yoqilgan** — u
`compressAggressive()` funksiyasining 2-bosqichidir. Ultra rejimi uni ishga tushirmaydi. U
quyidagilar uchun ayniqsa samarali:

- Uzoq davom etadigan dasturlash seanslari
- Bir necha kunlik suhbatlar
- Koʻp vosita chaqiruvlariga ega agentli ish jarayonlari

### Caveman chiqarish rejimi

Caveman chiqarish rejimi modelning oʻzidan
ixcham javob berishni soʻraydigan **tizim prompti koʻrsatmalarini** qoʻshadi — `lite` darajasi toʻliq gaplarni saqlagan holda qisqa javoblarni, `full`
darajasi undan «aqlli gʻor odamidek qisqa javob berishni», `ultra` esa telegrafik javobni soʻraydi;
koʻrsatmalar faqat soʻraydi, buni kafolatlay olmaydi. Soʻrovlar ularni
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) orqali oladi:
`open-sse/handlers/chatCore.ts` avval tanlovni ortga moslik shimi yordamida aniqlaydi
(`open-sse/services/compression/outputStyles/backCompat.ts` ichidagi
`resolveOutputStyleSelection()`), u `outputStyles`
boʻsh boʻlganda yoqilgan `cavemanOutputMode` qiymatini
`cavemanOutputMode.intensity` darajasidagi `terse-prose` chiqarish uslubiga moslaydi
(quyidagi Ortga moslik boʻlimiga qarang); boʻsh boʻlmagan `outputStyles`
tanlovi oʻz holicha ishlatiladi va shundan keyin `cavemanOutputMode.enabled` hamda `intensity` hech qanday
taʼsir koʻrsatmaydi, biroq uning `autoClarity` almashtirgichi ishlashda davom etadi. `outputMode.ts`
koʻrsatma matnlarini (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), kontentni chetlab oʻtish va
kiritishda ishlatiladigan joylashtirish yordamchisini saqlaydi; uning oʻzidagi `applyCavemanOutputMode()`
kirituvchisining production chaqiruvchisi yoʻq.

#### U qanday ishlaydi

Bu rejim kirishni siqmaydi. U tizim promptiga koʻrsatmalar blokini qoʻshadi
(quyidagi Kiritish qanday ishlaydi boʻlimiga qarang), soʻng soʻrov uchun tanlangan istalgan kirish siqish rejimi
blokni oʻz ichiga olgan tanada ishlashda davom etadi. Har bir daraja bilan yakunlanadigan umumiy
chegaralar bandidan oldin ingliz tilidagi `full` darajasi quyidagicha:

> «Aqlli gʻor odamidek qisqa javob ber. Artikllar (a/an/the), toʻldiruvchi soʻzlar (just/really/basically/actually/simply), xushmuomalalik iboralari va ikkilanishni tashlab ket. Gap boʻlaklari mumkin. Qisqa sinonimlardan foydalan (extensive emas big, implement emas fix). Barcha texnik mazmun, kod, xatolar, URL manzillar va identifikatorlarni aynan saqla.»

Bu quyidagilar uchun ayniqsa yaxshi ishlaydi:

- Kod yaratish (ixchamroq natija = kamroq token)
- Tezkor savol-javob (batafsil tushuntirishlarga ehtiyoj yoʻq)
- Ommaviy qayta ishlash (oʻtkazuvchanlikni maksimal darajaga oshirish)

#### Qachon foydalanish kerak

Caveman chiqarish rejimi **ixtiyoriy ravishda yoqiladi**. Siqish yoqilganida (`enabled: true`, Compression Settings sahifasidagi asosiy almashtirgich
yoqilgan), uni `cavemanOutputMode.enabled` orqali yoqing; `intensity`
`lite`, `full` yoki `ultra` qiymatini tanlaydi:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Siqish kombinatsiyasining **Output Mode** almashtirgichi (`outputMode`, darajasi `outputModeIntensity` ichida)
shu kombinatsiya qoʻllanadigan soʻrovlar uchun ayni almashtirgichni oʻrnatadi va
`omniroute_set_compression_engine` MCP vositasi uni oʻzining mantiqiy `outputMode`
argumenti orqali yozadi. Boʻsh boʻlmagan `outputStyles` tanlovi bu almashtirgichdan ustun turadi. Boshqaruv
panelida **Terse prose** chiqarish uslubini yoqish ayni blokni kiritadi (quyidagi Output
Styles boʻlimiga qarang).

### Chiqish uslublari (katalog)

Yuqoridagi Caveman chiqarish rejimi — **eski yagona uslub yoʻli**. 4-bosqich uni
birgalikda ishlatiladigan chiqish uslublari katalogiga umumlashtirdi:
`open-sse/services/compression/outputStyles/catalog.ts` ichidagi `OUTPUT_STYLE_CATALOG`. Har bir uslub modelning oʻzidan
arzonroq natija soʻraydigan tizim prompti koʻrsatmasidir; uslublarni birgalikda yoqish mumkin
va ular katalog tartibida kiritiladi.

| Uslub                               | `id`          | Nima qiladi                                                                                                                                                                                                                                     | Koʻrsatma tillari                             |
| ----------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Ixcham bayon                        | `terse-prose` | Ortiqcha soʻzlar/artikllar/ikkilanishlarni olib tashlaydi; texnik mazmunni aniq saqlaydi. Eski caveman chiqish rejimidagi matn bilan bir xil (havola qilinadi, qayta yozilmaydi).                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kamroq kod                          | `less-code`   | YAGNI zinapoyasi: ishlaydigan eng kichik oʻzgarish, soʻralmagan abstraksiyalarsiz.                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (dangasa senior dasturchi) | `ponytail`    | "Eng yaxshi kod — hech qachon yozilmagan kod": qayta foydalanish > qayta yozish, tub sabab > alomat, ishlaydigan eng qisqa diff.                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menda ADHD bor (avval amal)         | `i-have-adhd` | Avval amal (bayondan oldin buyruq/yoʻl/snippet), raqamlangan va chegaralangan qadamlar, BITTA aniq keyingi qadam, kirish/xulosa/yakuniy iboralarsiz. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) asosida moslashtirilgan. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ixcham CJK (文言)                   | `terse-cjk`   | `full`/`ultra` javob Klassik xitoy tilida (文言); `lite` faqat yordamchi soʻzlar, xushmuomalalik iboralari yoki bezaklarsiz qisqa javoblarni soʻraydi.                                                                                          | zh (lokal bilan cheklangan, quyiga qarang)    |

Har bir uslub uchta intensivlik darajasi — `lite`, `full`, `ultra` — bilan taqdim etiladi va har bir daraja
umumiy chegaralar bandi (`outputMode.ts` ichidagi `SHARED_BOUNDARIES`) bilan
yakunlanadi; bu band kod bloklari, fayl yoʻllari, buyruqlar, xatolar va URL manzillarni aynan saqlaydi. `terse-prose` va
`terse-cjk` daraja matnlari ushbu roʻyxatga identifikatorlarni ham qoʻshadi.

`terse-cjk` ikki joyda `zh` lokali bilan cheklangan. Compression Settings sahifasi
uning qatorini faqat boshqaruv paneli interfeysi tili xitoycha (`zh-CN` yoki `zh-TW`) boʻlganda koʻrsatadi va
`applyOutputStyles()` uni faqat soʻrovning aniqlangan tili (quyidagi Til
tanloviga qarang) `zh` boʻlganda kiritadi. Qatorni yashirish saqlangan `terse-cjk` tanlovini
tozalamaydi: sozlamalar APIʼsi istalgan uslub idʼsini qabul qiladi va sahifada boshqa uslublarni saqlash uni saqlab
qoladi. Soʻrov vaqtida `applyOutputStyles()` til tekshiruvi yagona lokal cheklovidir.

#### Kiritish qanday ishlaydi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) tanlovni
katalogga nisbatan aniqlaydi (nomaʼlum idʼlar va lokalga mos kelmaydigan uslublar
tashlab yuboriladi, bu hech qachon xato hisoblanmaydi; hech qanday uslubga mos kelmagan tanlov tanani
oʻzgartirmaydi va `no_styles` sifatida oʻtkazib yuboriladi), tanlangan koʻrsatmalarni katalog
tartibida birlashtiradi,
chegaralar bandini **bir marta** qoʻshadi (bundan tashqari, `less-code` yoki `ponytail` tanlanganida xavfsizlik bandi — `SAFETY_BOUNDARIES` yoki uning
tarjimasi — ham qoʻshiladi) va blokni
yagona idempotentlik belgisi (`[OmniRoute Output Styles]`) bilan boshlaydi, shuning uchun uni qayta
qoʻllash hech qanday oʻzgarish qilmaydi. Aniqlangan til (quyidagi Til tanloviga qarang) uchun tarjima mavjud boʻlsa, inglizcha
koʻrsatma oʻrniga mahalliylashtirilgan koʻrsatma kiritiladi.

Boʻsh boʻlmagan `messages` massiviga ega tanada idempotentlik tekshiruvi kontentni
chetlab oʻtishdan oldin bajariladi: `[OmniRoute Output Styles]` belgisi yuqori darajadagi
`system` maydonida (satr yoki kontent bloklari massivi) yoxud satrli
kontentga ega tizim xabarida allaqachon mavjud boʻlsa, tana `already_applied` sifatida oʻzgarishsiz qoldiriladi va kalit soʻzlar tekshiruvi bajarilmaydi.
Aks holda, kontentni chetlab oʻtish (`open-sse/services/compression/outputMode.ts` ichidagi
`shouldBypassCavemanOutputMode()`) rolidan qatʼi nazar, oxirgi uchta
xabar matnini tekshiradi va bu matn xavfsizlik, qaytarib boʻlmaydigan amal yoki aniqlashtirishga oid kalit soʻzlarga yoxud
tartibga bogʻliq ketma-ketlikka mos kelsa, butun soʻrov uchun uslublarni oʻtkazib yuboradi: `first`, `then`, `after that`, `before`, `rollback` yoki
`backup` soʻzidan keyin 240 belgi ichida `delete`, `drop`, `migrate`, `deploy` yoki
`release` kelishi. Chetlab oʻtish tekshiruvi **Auto-Clarity Bypass** tugmasi
(`cavemanOutputMode.autoClarity`, standart holatda yoqilgan) yoqilgan paytda ishlaydi; tugmani oʻchirish
kalit soʻzlar tekshiruvini oʻtkazib yuboradi.

Chetlab oʻtish tekshiruvi navbatdagi soʻrovni oʻtkazganda, hech qachon yangi `messages[0]` yaratmaydigan
`placeSystemInstruction()` (shu faylda) blokni quyidagilardan topilgan birinchisiga joylaydi:

1. Boshida kelgan, satrli kontentga ega tizim xabari: blok uning matnidan keyin qoʻshiladi.
2. Yuqori darajadagi `system` maydoni: blok satr matnidan keyin qoʻshiladi yoki
   kontent bloklari massiviga yangi matn bloki sifatida qoʻshiladi.
3. Keyinroq kelgan, satrli kontentga ega birinchi tizim xabari: blok uning
   matnidan keyin qoʻshiladi.
4. Yuqoridagilarning hech biri: blok `messages` oxiridagi yangi tizim xabariga joylanadi.

`messages` massivi boʻlmagan (yoki u boʻsh boʻlgan) tanada kontentni chetlab oʻtish tekshiruvi bajarilmaydi va
yuqori darajadagi `system` maydoni tekshirilmaydi. Blok satrli
`instructions` maydoni matnidan keyin qoʻshiladi, agar bu maydon allaqachon
`[OmniRoute Output Styles]` belgisini oʻz ichiga olmasa; shunday boʻlsa, tana
`already_applied` sifatida oʻzgarishsiz qoldiriladi. Tanada satrli `instructions` maydoni boʻlmasa, ammo `input`
(satr yoki massiv) mavjud boʻlsa, blok `instructions` qiymatiga aylanib, bu maydondagi istalgan satr boʻlmagan qiymatni
almashtiradi. Satrli `instructions` maydoni ham, satr yoki massiv koʻrinishidagi
`input` ham boʻlmagan tana oʻzgarishsiz qoldiriladi va `no_messages` sifatida oʻtkazib yuboriladi.

#### Qanday yoqiladi

Boshqaruv panelida: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles bo‘limida: har bir uslub uchun yoqish/o‘chirish
tugmasi va daraja tanlagichi mavjud bo‘lgan alohida qator bor. Siqishning o‘zi yoqilganida (sahifadagi
asosiy tugma, `enabled`) uslublar kiritiladi. **Auto-Clarity Bypass** tugmasi **Caveman**
sahifasidagi (`/dashboard/context/caveman`) **Output Mode** kartasida joylashgan. Dasturiy jihatdan,
siqish konfiguratsiyasi tanlovni quyidagicha saqlaydi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Orqaga moslik: `outputStyles` bo‘sh bo‘lsa, eski `cavemanOutputMode.enabled`
sozlamasi `cavemanOutputMode.intensity` darajasida `terse-prose`ga moslanadi. Shundan so‘ng blok
`[OmniRoute Output Styles]` belgisi bilan boshlanadi, eski `applyCavemanOutputMode()`
injektori esa `[OmniRoute Caveman Output Mode]`ni kiritgan. Belgi ostidagi matn en, pt-BR,
es, de, fr, it, ru, id va vi tillaridagi eski kiritmaga mos keladi; ja va zh tillarida esa
chegaralar haqidagi banddan oldin bitta qo‘shimcha bo‘sh joy bor. `terse-prose` pt-BR, es, de,
fr, it, ru, zh, ja, id va vi tillariga tarjima qilinadi, shuning uchun aniqlangan tili `hu`
bo‘lgan so‘rov eski injektor ishlatgan vengercha matn o‘rniga inglizcha matnni oladi.

Chiqish uslubi tilini tanlash (`outputStyles/apply.ts` ichidagi
`resolveOutputStyleLanguage()`): `languageConfig.enabled` yoqilganida, `autoDetect` so‘rovning
`messages` massividagi matnga ega eng so‘nggi foydalanuvchi xabaridan namuna oladi (satrli kontent
yoki uning kontent qismlaridagi `text`) va unda Caveman mexanizmining aniqlagichini
(`detectCompressionLanguage()`) ishga tushiradi. Matnda Han belgilar mavjud bo‘lib, kana bo‘lmasa,
aniqlagich `zh`ni qaytaradi; aks holda `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu`
va `id` orasidan ishoralari eng ko‘p mos kelganini, hech biri mos kelmasa esa `en`ni qaytaradi —
tasniflay olmaydigan matn uchun hech qachon `defaultLanguage` emas, ingliz tili ishlatiladi va
uslublar `vi` matni bilan taqdim etilsa-da, `vi` hech qachon aniqlanmaydi. Responses API tanasida
muloqot navbatlari `input` ichida saqlanadi va undan namuna olinmaydi, shu sababli avval
`defaultLanguage`, keyin esa ingliz tili ishlatiladi. `messages` ichidagi hech bir foydalanuvchi
xabarida matn bo‘lmasa yoki `autoDetect` o‘chirilgan bo‘lsa, avval `defaultLanguage`, so‘ng ingliz
tili qo‘llanadi. `languageConfig.enabled` o‘chirilganida, til inglizcha bo‘ladi — agar so‘rovga
siqish kombinatsiyasi qo‘llanmasa (so‘rovning marshrutlash kombinatsiyasiga biriktirilgan
kombinatsiya yoki o‘rnatilgan qatlamli konveyer uchun chatCore qaytadigan standart siqish
kombinatsiyasi): kombinatsiyani qo‘llash shu so‘rov uchun `languageConfig.enabled`ni yoqadi va
`defaultLanguage`ni kombinatsiyaning til paketlari asosida o‘rnatadi (agar saqlangan qiymat
kombinatsiya paketlaridan biri bo‘lsa, o‘sha qiymat; aks holda sukut bo‘yicha `en` bo‘lgan
kombinatsiyaning birinchi paketi), ayni paytda saqlangan `autoDetect` (sukut bo‘yicha yoqilgan)
amal qilishda davom etadi. Caveman kiritish mexanizmi qoida paketi tilini boshqacha tanlaydi —
har bir matn qismi uchun alohida va avtomatik aniqlash o‘chirilganida `enabledPacks` asosida
cheklangan holda.

Uslub × til matritsasi
`tests/unit/compression/output-styles-i18n-matrix.test.ts` orqali qat’iy belgilanadi: katalogdagi
har bir uslub testning `BASELINE_LANGUAGES` ro‘yxatida yozuvga ega bo‘lishi kerak; lokal bilan
cheklanmagan uslub pt-BR tarjimasi bilan taqdim etilishi kerak (lokal bilan cheklangan `terse-cjk`
bu qoidadan mustasno), faqat u `KNOWN_ENGLISH_ONLY` ro‘yxatiga kiritilgan bo‘lsa bundan mustasno;
bu ro‘yxat faqat umuman tarjimasi bo‘lmagan uslublarni o‘z ichiga olishi mumkin — ro‘yxatdagi
uslubda biror tarjima bo‘lsa, test muvaffaqiyatsiz tugaydi; shuningdek, uslub o‘zining
`BASELINE_LANGUAGES` yozuvida ko‘rsatilgan tillardan birini yo‘qotsa, test muvaffaqiyatsiz
tugaydi. Uslub qo‘shish uchun
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)ga qarang.

### Asbob natijasini siqish

`open-sse/services/compression/toolResultCompressor.ts` ichidagi `compressToolResult()`
asbob natijasi matnini **5 ta strategiya** yordamida siqadi. Ularni quyidagi tartibda sinab
ko‘radi va tekshiruvi kontentga mos kelgan birinchi yoqilgan strategiya natijani belgilaydi:

1. **`fileContent`**: 3 yoki undan ortiq qatordan iborat kontentda kamida bitta qator
   boshlangʻich chekinish eʼtiborga olinmaganda `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` yoki `return ` bilan (kalit soʻz va undan keyingi boʻshliq),
   yoxud `if`, `for` yoki `while` dan keyin `(` yoki ` (` bilan boshlansa, uning dastlabki
   20 ta va oxirgi 5 ta qatori saqlanadi, olib tashlangan oʻrta qism esa belgilanadi.
2. **`grepSearch`**: kamida bitta qatori `<path>:<digits>:` shaklida boʻlgan kontentda
   birinchi ikki nuqtadan oldingi matnda boʻshliq boʻlmasa, faqat shu qatorlar saqlanadi,
   koʻpi bilan 30 ta, soʻng qolgan mosliklar soni va mos kelgan fayllar roʻyxati beriladi;
   boshqa barcha qatorlar olib tashlanadi. Strategiyani ishga tushirish uchun shunday bitta
   qator kifoya, shu sababli `12:30:45` kabi vaqt belgisi bilan boshlanadigan jurnal qatori
   ham hisobga olinadi.
3. **`shellOutput`**: ANSI CSI ketma-ketligini (`ESC[` dan keyin raqamlar yoki nuqtali
   vergullar, soʻng harf, masalan, rang kodlarida) yoki matnning istalgan joyida boʻshliq
   belgisi keladigan `$` belgisini oʻz ichiga olgan chiqishdan shu ketma-ketliklar olib
   tashlanadi (boshqa boshqaruv ketma-ketliklari, masalan, `ESC[?25l` yoki OSC oyna
   sarlavhasi ketma-ketligi saqlanadi) va ketma-ket takrorlangan qatorlar birlashtirilib,
   oxirgi 50 ta qator saqlanadi. Bu tekshiruv `json` va `errorMessage` dan oldin
   bajarilgani sababli, shunday `$` belgisini oʻz ichiga olgan JSON yoki xato chiqishi
   `shellOutput` yoqilganida ulargacha yetib bormaydi.
4. **`json`**: ixtiyoriy boʻshliqdan soʻng `{` yoki `[` bilan boshlanadigan, tahlildan
   muvaffaqiyatli oʻtadigan va 2,000 belgidan uzun JSON foydali yuki qisqartirib bayon
   qilinadi: 7 tadan koʻp elementli massivning dastlabki 5 ta va oxirgi 2 ta elementi
   hamda umumiy elementlar soni saqlanadi; obyektning esa dastlabki 20 ta kaliti
   saqlanadi, har bir ichki obyekt yoki massiv qiymati `{…N keys}` toʻldiruvchisi bilan
   almashtiriladi (massiv uchun N — uning uzunligi) va dastlabki 20 tadan keyin tashlab
   yuborilgan kalitlar sonini koʻrsatuvchi `_remaining_<N>_keys` belgisi qoʻshiladi.
   Skalyar qiymatlar toʻliq koʻchiriladi, shu sababli 20 ta yoki undan kam kalitli va
   ichki qiymatlarsiz obyekt faqat qayta chekinish bilan formatlanadi — minifikatsiya
   qilingan obyektga belgilar qoʻshiladi va u oʻzgarmay qoladi.
5. **`errorMessage`**: istalgan joyida va harflarning istalgan registrida `error:`,
   `error ` (`no error found` dagidek soʻzdan keyingi boʻshliq), `[error]`,
   `exception:`, `exception `, `[exception]` yoki `traceback` mavjud boʻlgan chiqishning
   birinchi qatori, undan keyingi 10 ta qatori va oxirgi 3 ta qatori saqlanadi, ular
   orasidagi qatorlar oʻrniga `… [N frames elided] …` belgisi qoʻyiladi. Bu belgi faqat
   birinchi qatordan keyin 13 tadan ortiq qator boʻlganda paydo boʻladi, shu sababli
   14 yoki undan kam qatorli xato chiqishi qisqartirilmaydi (12 yoki 13 qator boʻlganda
   oxirgi 3 ta qator avval saqlangan qatorlarni takrorlaydi).

Strategiya mos kelgach, hatto u hech narsani tejamasada, keyingi strategiyalar
sinab koʻrilmaydi. Mos kelgan strategiya hisoblangan tokenlarni (uzunlik ÷ 4, yuqoriga
yaxlitlangan) tejamas ekan — masalan, 25 yoki undan kam qatorli kodga oʻxshash fayl
yoxud 2,000 belgidan uzun, ammo 7 yoki undan kam elementli JSON massivi — agressiv
mexanizm asl vosita natijasini saqlab qoladi: har ikkala chaqiruvchi
(`compressAggressive()` va `compressAnthropicToolResultBlock()`) `saved` qiymati 0 yoki
undan kichik boʻlsa, asl nusxani saqlaydi, `compressToolResult()` ning oʻzi esa baribir
shu strategiya chiqishini qaytaradi. Vosita natijasi bosqichi yakuniy qaror emas:
mexanizmning zaxira qisqartirib bayon qiluvchisi 8,192 belgidan uzun `tool` yoki
`function` xabarini (`maxTokensPerMessage`, 2,048, 4 ga koʻpaytirilgan) hamon
qisqartirishi mumkin.

#### Qachon foydalanish kerak

Vosita natijasini siqish agressiv mexanizmning 1-bosqichidir (`compressAggressive()`
`open-sse/services/compression/aggressive.ts` ichida), shu sababli u Aggressive rejimida
va qatlamlangan konveyerning `aggressive` bosqichida ishlaydi. U OpenAI shaklidagi
`tool` va `function` xabarlarini hamda Anthropic `tool_result` bloklari ichidagi matnni
siqadi. Har bir strategiyaning `aggressive.toolStrategies` ostida oʻz kaliti mavjud va
ularning barchasi sukut boʻyicha yoqilgan. Boshqaruv panelida siqish yoqilgan va standart
rejim Aggressive boʻlganida kalitlar Caveman sahifasining **Kengaytirilgan** koʻrinishida
joylashgan.

### Qatlamlangan konveyer

Qatlamlangan rejim **bir nechta mexanizmni ketma-ket** ishga tushiradi — odatda avval
RTK (vosita chiqishida 60-90% tejash), soʻng qolgan matnda Caveman (kiritishda ~46%
tejash). Birgalikda bu **78-95% mos diapazon**ni beradi (yuqoridagi Upstream Savings Math
boʻlimiga qarang): `1 - (1 - 0.60..0.90) × (1 - 0.46)` oʻrtacha ≈89%.

#### U qanday ishlaydi

```
Kirish (1000 token)
  → RTK (buyruqni hisobga oluvchi filtr) → 200 token
    → Caveman (ortiqcha matnni olib tashlash) → 108 token
  → Chiqish (108 token, ~89% tejash)
```

#### Qachon foydalanish kerak

Qatlamlangan rejimdan quyidagilar uchun foydalaning:

- Vositalar koʻp ishlatiladigan ish jarayonlari (agentli dasturlash, tadqiqot)
- Xarajatga sezgir paketli qayta ishlash
- Tokenlarni maksimal darajada tejash zarur boʻlganda

Qatlamlangan konveyerlar global `stackedPipeline` siqish sozlamasi orqali yoki
marshrutlash kombinatsiyasiga biriktirilgan nomlangan siqish kombinatsiyasi orqali
sozlanadi (yuqoridagi Per-Combo Override boʻlimiga qarang) — auto-combo `modePack`
orqali emas (bu maydon faqat auto-combo model tanlovining vaznlarini oʻzgartiradi va
`stacked` yaroqli paket nomi emas).

---

## Kompressiya kombinatsiyasi istisno sozlamalari

Turli foydalanish holatlari uchun xatti-harakatni aniq sozlash maqsadida global kompressiya rejimini **har bir kombinatsiya uchun** almashtirishingiz mumkin:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Bu quyidagilar uchun foydali:

- **Kodlash kombinatsiyalari**: Uzoq seanslar uchun `aggressive` rejimidan foydalaning
- **Tezkor savol-javob kombinatsiyalari**: Tezkor javoblar uchun `lite` rejimidan foydalaning
- **Koʻp vositali kombinatsiyalar**: Maksimal tejash uchun `stacked` rejimidan foydalaning
- **Ishlab chiqarish kombinatsiyalari**: Keshlovchi provayderlar uchun istisno sozlamasini oʻchirilgan holda qoldiring — doimo faol boʻlgan
  keshni hisobga oluvchi moslashtirish `aggressive`/`ultra` rejimini avtomatik ravishda `standard` rejimiga pasaytiradi
  (tanlash mumkin boʻlgan `cache-aware` rejimi mavjud emas)

---

## Shuningdek qarang

- [Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) — Kompressiya muhiti oʻzgaruvchilari
- [Arxitektura qoʻllanmasi](../architecture/ARCHITECTURE.md) — Kompressiya konveyerining ichki tuzilishi
- [Foydalanuvchi qoʻllanmasi](../guides/USER_GUIDE.md) — Kompressiya bilan ishlashni boshlash
- [RTK kompressiyasi](./RTK_COMPRESSION.md) — RTK filtrlari, ishonch modeli, tekshirish darvozasi, xom chiqishni tiklash
- [Kompressiya mexanizmlari](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-lar, MCP, boshqaruv paneli
- [Kompressiya qoidalari formati](./COMPRESSION_RULES_FORMAT.md) — JSON qoidalar toʻplami formati
- [Kompressiya til paketlari](./COMPRESSION_LANGUAGE_PACKS.md) — Tilga xos Caveman qoidalari
