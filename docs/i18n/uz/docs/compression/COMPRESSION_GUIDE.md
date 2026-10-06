# 🗜️ Prompt Compression Guide — OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Mos keluvchi kontekstni avtomatik ravishda 15–95% tejang. Qisqacha tanishish uchun [README faylidagi Siqish bo‘limi](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)ga qarang.

## Umumiy ko‘rinish

OmniRoute so‘rovlar yuqori oqim provayderlariga yetib borishidan **oldin faol ravishda** ishga tushadigan modulli prompt siqish konveyerini amalga oshiradi. Bu tokenlaringiz shaffof tarzda tejalishini anglatadi — ish jarayoningizga hech qanday o‘zgartirish kiritish shart emas.

```
Mijoz so‘rovi
  → Siqish strategiyasini tanlash vositasi
    → Kombinatsiya ustuvor sozlamasi bormi? → Kombinatsiya sozlamasidan foydalanish
    → Avtomatik ishga tushirish chegarasiga yetildimi? → Avtomatik rejimdan foydalanish
    → Standart rejim bormi? → Global sozlamadan foydalanish
    → O‘chirilganmi? → Siqishni o‘tkazib yuborish
  → Tanlangan siqish rejimi
    → Off: Siqish yo‘q
    → Lite: Xavfsiz bo‘sh joy/formatlashni tozalash (~15%)
    → Standard: G‘or odami uslubida ortiqcha so‘zlarni olib tashlash (~30%)
    → Aggressive: Tarixni eskirtirish + umumlashtirish (~50%)
    → Ultra: Evristik qisqartirish + kod bloklarini siyraklashtirish (~75%)
    → RTK: Buyruqlardan xabardor terminal/vosita natijalarini filtrlash (yuqori oqimda 60–90% diapazon)
    → Stacked: Tartiblangan ko‘p dvigatelli konveyer, odatda avval RTK, so‘ng Caveman (mos kontentda 78–95% diapazon)
  → Siqilgan so‘rov → Provayder
```

---

## Siqish rejimlari

### Off

Hech qanday siqish qo‘llanmaydi. Barcha xabarlar o‘zgartirilmasdan uzatiladi.

### Lite rejimi (~15% tejamkorlik, <1ms kechikish)

Eng xavfsiz rejim — semantik o‘zgarishlar yo‘q, faqat formatlash tozalanadi:

| Usul                     | Tavsif                                                                 |
| ------------------------ | ---------------------------------------------------------------------- |
| `collapseWhitespace`     | Ketma-ket bo‘sh satrlar va satr oxiridagi bo‘sh joylarni birlashtiradi |
| `dedupSystemPrompt`      | Takroriy tizim xabarlarini olib tashlaydi                              |
| `compressToolResults`    | Batafsil vosita/funksiya natijalarini siqadi                           |
| `removeRedundantContent` | Takrorlangan ko‘rsatmalarni olib tashlaydi                             |
| `replaceImageUrls`       | Base64 rasm ma’lumotlari URI manzillarini qisqartiradi                 |

**Eng mos holatlar:** Doimiy foydalanish, xavfsizlik muhim bo‘lgan ish jarayonlari.

### Standard rejimi (~30% tejamkorlik)

[Caveman](https://github.com/JuliusBrussee/caveman)dan ilhomlangan — ma’noni saqlagan holda ortiqcha so‘zlar va cho‘zib ifodalangan jumlalarni olib tashlaydi:

- Ortiqcha so‘zlarni olib tashlaydi ("iltimos", "menimcha", "asosan", "aslida")
- Cho‘zib ifodalangan iboralarni ixchamlashtiradi ("... qilish maqsadida" → "... uchun", "... natijasida" → "... sababli")
- Muloyim ehtiyotkor iboralarni olib tashlaydi ("Qarshi bo‘lmasangiz...", "Agar iloji bo‘lsa...")
- Dasturlash promptlari uchun sozlangan 30 dan ortiq regex qoidalari

**Eng mos holatlar:** Kundalik dasturlash jarayonlari, xarajatlarni nazorat qiluvchi jamoalar.

### Aggressive rejimi (~50% tejamkorlik)

Uzoq seanslar uchun aqlli tarix boshqaruvi:

- **Xabarlarni eskirtirish** — eski xabarlar bosqichma-bosqich siqiladi
- **Vosita natijalarini umumlashtirish** — uzun vosita natijalari qisqacha mazmun bilan almashtiriladi
- **Strukturaviy yaxlitlik himoyasi** — `tool_use` + `tool_result` juftliklarining muvofiqligini ta’minlaydi
- **Kontekst oynasini hisobga olish** — har bir model uchun token cheklovlariga rioya qiladi

**Eng mos holatlar:** Uzoq davom etuvchi nosozliklarni tuzatish seanslari, katta kod bazalari.

### Ultra rejimi (~75% tejamkorlik)

Tokenlar juda muhim bo‘lgan holatlar uchun maksimal siqish:

- **Evristik qisqartirish** — dolzarblik chegarasidan past bo‘lgan xabarlarni olib tashlaydi
- **Kod bloklarini siyraklashtirish** — takroriy kod misollarini siqadi
- **Ikkilik qidiruv orqali kesish** — kontekst oynasi uchun optimal kesish nuqtasini topadi
- Aggressive rejimining barcha imkoniyatlari kiritilgan

**Eng mos holatlar:** Kontekst cheklovlariga qayta-qayta duch kelganingizda.

### RTK rejimi (yuqori oqimda 60–90% diapazon)

RTK rejimi dasturlash agenti seanslarida uchraydigan batafsil vosita natijalari uchun optimallashtirilgan:

- `git status`, `git diff`, `git log`, test bajaruvchilari,
  TypeScript/Vite/Webpack yig‘ishlari, ESLint/Biome/Prettier, npm audit/o‘rnatishlari, Docker jurnallari, infratuzilma
  natijalari va umumiy qobiq natijalari kabi buyruq/natija sinflarini aniqlaydi
- `open-sse/services/compression/engines/rtk/filters/` manzilidagi JSON filtr to‘plamlarini qo‘llaydi
- Loyiha yoki global `filters.toml` fayllaridan RTK TOML schema v1 filtrlarini import qiladi, bunda ichki test
  tekshiruvi va loyiha fayllari uchun ishonch nazorati qo‘llanadi
- Ichki tekshirish namunalari bilan 49 ta o‘rnatilgan filtrni taqdim etadi
- ANSI boshqaruv ketma-ketliklari, jarayon ko‘rsatkichlari, takroriy satrlar va amaliy ahamiyatga ega bo‘lmagan shovqinni olib tashlaydi
- Nosozliklar, xatolar, ogohlantirishlar, o‘zgartirilgan fayllar, xulosalar va uzun natijalarning oxirgi qismini saqlab qoladi
- Ishonch nazoratidan o‘tuvchi loyiha filtrlari, global filtrlar va ixtiyoriy tarzda tahrirlangan xom natijalarni tiklashni qo‘llab-quvvatlaydi

**Eng mos holatlar:** Qobiq, yig‘ish, test, git, grep va fayl natijalari transkriptlariga ega agent seanslari.

### Stacked rejimi (mos kontentda 78–95% diapazon)

Stacked rejimi bir nechta siqish dvigatellarini deterministik tartibda ishga tushiradi. Standart konveyer:

```txt
RTK -> Caveman
```

Bu tartib avval terminal/vosita natijalarini ixchamlaydi, so‘ng qolgan tabiiy tildagi promptga Caveman semantik ixchamlashtirishini qo‘llaydi.
Stacked konveyerlarini global miqyosda yoki marshrutlash kombinatsiyalariga tayinlangan
siqish kombinatsiyalari orqali sozlash mumkin.

**Eng mos holatlar:** Katta vosita jurnallari hamda inson ko‘rsatmalari yoki yordamchi xulosalaridan iborat aralash kontekst.

---

## Yuqori oqimdagi tejash hisob-kitobi

OmniRoute siqish orqali tejalishni ikki manba asosida hujjatlashtiradi: yuqori oqimdagi loyihalarning benchmarklari va
OmniRoute’ning o‘z dvigatellar kombinatsiyasi.

| Manba   | Bu yerda ishlatilgan yuqori oqim README raqami                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | chiqish tokenlari `~75%` kamroq, benchmark bo‘yicha o‘rtacha chiqish tejalishi `65%`, diapazon `22-87%` va kirishni `~46%` siquvchi vosita |
| RTK     | buyruq chiqishida `60-90%` tejalish; namunaviy sessiya `~118,000 -> ~23,900` token yoki `79.7%` tejalgan (`~80%`)                          |

Bir-birini qoplaydigan vosita/kontekst foydali yuklari uchun standart OmniRoute kombinatsiyasi dvigatellarni ketma-ket qo‘llaydi:

```txt
RTK -> Caveman
```

Birgalikdagi tejalish qo‘shiluvchi emas, balki ko‘paytiriluvchidir:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Bu `78-95%` ko‘rsatkichi RTK va Caveman bir xil kirish/kontekst foydali yukini kamaytira olganda amal qiladi.
Caveman javob chiqishi rejimi alohida: u yoqilganda Caveman’ning o‘z chiqish tejalishidan foydalaning (o‘rtacha `65%`,
asosiy ko‘rsatkich `~75%`, diapazon `22-87%`). Umumiy billing tejalishi prompt/chiqish nisbatiga bog‘liq.

### “Mos keluvchi” aslida nimani anglatadi

15-95% asosiy diapazoni haqiqiy, ammo u faqat **takroriy yoki ortiqcha batafsil** kontentga — takrorlangan
xato satrlariga, bir xil ogohlantirishni tinimsiz chiqaradigan build jurnaliga, haddan tashqari katta `grep`/fayl o‘qish chiqishiga nisbatan qo‘llanadi. Bu
har bir so‘rov shuncha tejaydi degani **emas**.

Empirik tarzda tasdiqlangan (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 ta bir xil
xato satrini o‘z ichiga olgan Anthropic shaklidagi `tool_result` blokiga nisbatan `stacked` (RTK + Caveman) ishga tushirilganda
**95.93% token tejalishi / 96.26% belgi tejalishi** kuzatildi — bu e’lon qilingan diapazonga to‘liq mos keladi.
Ammo xuddi shu pipeline oddiy, takrorlanmaydigan vosita chiqishiga (toza `grep` mosliklari ro‘yxati,
qisqa fayl o‘qilishi, oddiy suhbat matni) nisbatan ishga tushirilganda to‘g‘ri ravishda **deyarli nol tejalish** hosil qiladi, chunki
olib tashlash uchun takroriy kontent yo‘q va `validateCompression()` (`validation.ts`) kod bloklari, URL manzillari,
sarlavhalar, versiyalar yoki FAQAT-KATTA-HARFLI konstanta identifikatorlarini olib tashlaydigan yoxud o‘zgartiradigan qayta yozuvni yuborishni rad etadi.

Bu kutilgan xavfsiz xatti-harakatdir, xato emas: asosan toza fayllarni o‘qiydigan yoki `grep` orqali qidiradigan dasturlash sessiyasi
siqish to‘liq yoqilgan bo‘lsa ham umumiy tejalish kamtarona ekanini ko‘radi, muvaffaqiyatsiz
siklga yoki haddan tashqari ko‘p xabar chiqaradigan linterga duch kelgan sessiya esa o‘sha trafikda to‘liq 78-95% diapazonni ko‘radi. Bitta sessiyadagi
past umumiy tejalish foizini siqish noto‘g‘ri sozlanganining dalili sifatida ishlatmang — avval
asosiy vosita chiqishi haqiqatan ham takroriy bo‘lgan-bo‘lmaganini tekshiring.

---

## Token tejalishi vizualizatsiyasi

```
Siqishsiz:             LLM’ga 47K token yuborildi
Lite bilan:            40K token yuborildi          (15% tejandi — xavfsiz, doimo faol)
Standard bilan:        33K token yuborildi          (30% tejandi — caveman-uslubidagi qoidalar)
Aggressive bilan:      24K token yuborildi          (50% tejandi — eskirish + umumlashtirish)
Ultra bilan:           12K token yuborildi          (75% tejandi — evristik qisqartirish)
RTK bilan:             19K-5K token yuborildi       (buyruq/vosita chiqishida 60-90% tejandi)
Stacked bilan:         10K-2.5K token yuborildi     (mos keluvchi RTK+Caveman diapazonida 78-95%)
```

---

## Konfiguratsiya

### Boshqaruv paneli

`Dashboard → Context & Cache` ga oʻting:

- **Caveman** — rejim tanlash, til paketlari, oldindan koʻrish va global standartlar
- **RTK** — buyruq-filtrni oldindan koʻrish, RTK xavfsizlik sozlamalari va filtr katalogi
- **Compression Combos** — marshrutlash kombinatsiyalariga tayinlangan nomlangan dvigatel quvurlari
- **Auto-Trigger Threshold** — tokenlar soni chegaradan oshganda siqishni avtomatik ravishda ishga tushirish

### Har bir kombinatsiya uchun bekor qilish

`Dashboard → Context & Cache → Compression Combos` da marshrutlash kombinatsiyasiga siqish kombinatsiyasini tayinlang:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu sizga bepul/kodlash provayderlarida stacked siqishdan foydalanishga, pullik obunalarda esa lite rejimini saqlashga imkon beradi.

Bu "Har bir kombinatsiya uchun bekor qilish" tayinlovi **marshrutlash-kombinatsiyasi siqish rejimi**ni bekor qilishdan (Default/Off/Lite/Standard/Aggressive/Ultra) farqli nazoratdir — bu bekor qilish nomlangan siqish-kombinatsiyasi quvurini tanlamaydi; u faqat `resolveCompressionPlan` tomonidan koʻrib chiqiladigan `compressionMode` maydonini oʻrnatadi. Uni kombinatsiya kartasida (`Dashboard → Combos`) yoki, #6760 dan beri, `Dashboard → Context & Cache → Compression Combos` dagi "Assign to routing" roʻyxatida har bir marshrutlash kombinatsiyasi uchun, yuqorida hujjatlashtirilgan quvur-tayinlash katakchasining yonida oʻrnatish mumkin. Ikkala interfeys ham bir xil `PUT /api/combos/{id}` oxirgi nuqtasi orqali saqlanadi.

### Har bir soʻrov uchun bekor qilish

Yagona soʻrov uchun siqish rejasini bekor qilish uchun `x-omniroute-compression` soʻrov sarlavhasini yuboring. U eng yuqori ustuvorlikka ega — u marshrutlash-kombinatsiyasini bekor qilishni, faol profilni, avtomatik ishga tushirishni va panel Defaultni yengadi. Nomaʼlum qiymatlar eʼtiborga olinmaydi (soʻrov hech qachon rad etilmaydi) va global asosiy kalit hali ham hamma narsani boshqaradi: siqish global miqyosda oʻchirilgan boʻlsa, sarlavha uni yoqa olmaydi. Qiymatlar:

| Qiymat        | Effekt                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Bu soʻrov uchun siqish yoʻq.                                                                                                  |
| `default`     | Panel tomonidan olingan Default profil (faol profilni eʼtiborsiz qoldiradi). Lossy dvigatellar oʻchirilgan holda qoldiriladi. |
| `safe`        | Sarlavhani qoldirish bilan bir xil: faqat dedup va boʻsh joylarni yigʻish.                                                    |
| `allow-lossy` | Bu soʻrovning operator rejasini, shu jumladan xulosalar, tegishlilik filtrlari va uslubni qayta yozishni saqlab qolish.       |
| `engine:<id>` | Yoqilgan boʻlsa, bitta dvigatel, masalan, `engine:rtk`. Bu ushbu dvigatel uchun har bir soʻrov boʻyicha opt-in.               |
| `<combo>`     | Nomlangan kombinatsiya, avval nomi boʻyicha (katta/kichik harflarga sezgir emas), keyin esa ID boʻyicha mos keladi.           |

`allow-lossy`, `engine:<id>` yoki nomlangan kombinatsiyasiz, lossy dvigatellar qoʻllanilmaydi. Siqish yoqilgan boʻlsa, soʻrov hali ham sessiya dedup va boʻsh joylarni yigʻishni oladi.

Qoʻllanilgan reja `X-OmniRoute-Compression: <mode>; source=<source>` javob sarlavhasida aks ettiriladi, bu yerda `<source>` `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` yoki `off` dan biri boʻlishi mumkin.

### API

```bash
# Siqish sozlamalarini olish
curl http://localhost:20128/api/settings/compression

# Siqish sozlamalarini yangilash
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Muayyan RTK/stacked yuklamasini oldindan koʻrish
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtr paketlarini roʻyxatlash
curl http://localhost:20128/api/context/rtk/filters

# RTKni ixtiyoriy buyruq metamaʼlumotlari bilan toʻgʻridan-toʻgʻri sinash
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Nimalar himoyalanadi

Siqish mexanizmi **har doim quyidagilarni saqlab qoladi:**

- ✅ Kod bloklari (ajratilgan va satr ichidagi)
- ✅ URL manzillar va fayl yoʻllari
- ✅ JSON tuzilmalari va tuzilmaviy maʼlumotlar
- ✅ Identifikatorlar va himoyalangan texnik tokenlar
- ✅ Matematik ifodalar
- ✅ Vosita/funksiya chaqiruvi taʼriflari
- ✅ Tizim promptlari (lite rejimida)

RTK xom chiqishni tiklash funksiyasi biror narsa saqlanishidan oldin keng tarqalgan API kalitlari, bearer tokenlari, Slack tokenlari, AWS kirish kalitlari,
parollar, tokenlar va sirlarni yashiradi.

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

## Faza Yo'l xaritasi

| Faza    | Rejimlar                                                                                                                                                                 | Holat          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| 1-faza  | O'chirilgan, Yengil                                                                                                                                                      | ✅ Chiqarilgan |
| 2-faza  | Standart, Agressiv, Ultra                                                                                                                                                | ✅ Chiqarilgan |
| 3-faza  | RTK, Qatlamli, Siqish kombinatsiyalari                                                                                                                                   | ✅ Chiqarilgan |
| 4-faza  | Chiqish uslublari, SLM-darajali Ultra, baholash vositasi                                                                                                                 | ✅ Chiqarilgan |
| 4C-faza | Moslashuvchan kontekst-byudjet ("dial") — hisoblash dvigateli + API (`contextBudget` on `PUT /api/settings/compression`) + boshqaruv paneli rejimi/siyosat boshqaruvlari | ✅ Chiqarilgan |

---

## Minnatdorchilik

Standard rejimidagi siqish qoidalari **[JuliusBrussee](https://github.com/JuliusBrussee)** tomonidan yaratilgan **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — ommalashgan „koʻp token ishlatishning nima keragi bor, kam token ishni bajarsa“ loyihasidan ilhomlangan. Caveman chiqish tokenlari `~75%` ga kamayishi, testlarda oʻrtacha `65%` chiqish tejalishi, chiqish natijalarida `22-87%` oraligʻi va `~46%` kirishni siqish vositasi haqida maʼlum qiladi.

RTK rejimi **[RTK AI](https://github.com/rtk-ai)** tomonidan yaratilgan **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — terminal, qurish, sinov, git va vosita chiqishlarini filtrlash uchun moʻljallangan yuqori unumli buyruq chiqishini siqish loyihasidan ilhomlangan. RTK `60-90%` tejash haqida maʼlum qiladi, uning README faylidagi namunaviy seans esa `~80%` tejalganini koʻrsatadi.

---

## Kengaytirilgan siqish tizimlari

7 ta standart rejimdan tashqari, OmniRoute kontekstga qarab avtomatik ishlaydigan bir nechta kengaytirilgan siqish tizimlarini ham o‘z ichiga oladi.

### Keshni hisobga oluvchi siqish

Ba’zi provayderlar (masalan, promptlarni keshlash funksiyasiga ega Anthropic) **promptlarni keshlash**ni qo‘llab-quvvatlaydi. Bu ularga xarajatlar va kechikishni kamaytirish uchun promptning ayrim qismlarini keshlash imkonini beradi. Keshlash yoqilganida agressiv siqish amalda unumdorlikka **zarar yetkazishi** mumkin, chunki u keshlangan tokenlarni o‘zgartirib, keshni yaroqsiz holga keltiradi.

`cachingAware.ts` moduli bu muammoni **keshlash kontekstini aniqlash** va unga mos ravishda **siqish strategiyasini sozlash** orqali hal qiladi.

#### U qanday ishlaydi

1. **Keshlash kontekstini aniqlash** — So‘rov tanasida `cache_control` belgilarini qidiradi
2. **Keshlashni qo‘llab-quvvatlovchi provayderlarni aniqlash** — Maqsadli provayder keshlashni qo‘llab-quvvatlashini tekshiradi
3. **Strategiyani sozlash** — Keshlashni qo‘llab-quvvatlovchi provayderlar uchun `aggressive`/`ultra` rejimlarini `standard` rejimiga pasaytiradi
4. **Tizim promptini o‘tkazib yuborish** — Tizim promptlari odatda keshlanadi, shuning uchun ularni siqmang
5. **Deterministik o‘zgartirishlardan foydalanish** — Faqat izchil natija beradigan o‘zgartirishlardan foydalanadi

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Qachon foydalanish kerak

Keshni hisobga oluvchi siqish **doimo yoqilgan** — hech qanday konfiguratsiya talab qilinmaydi. U faqat quyidagi holatlarda ishga tushadi:

- So‘rovda `cache_control` belgilari mavjud bo‘lsa
- Maqsadli provayder promptlarni keshlashni qo‘llab-quvvatlasa (Anthropic, OpenAI va boshqalar)

### Progressiv eskirish

Uzoq suhbatlarda ko‘plab xabar almashinuvi to‘planadi, biroq eski almashinuvlar vaqt o‘tishi bilan ahamiyatini yo‘qotadi. `progressiveAging.ts` moduli **xabarlarni almashinuv masofasiga qarab soddalashtiradi**:

- **Yaqindagi almashinuvlar (0-3)**: O‘zgartirilmasdan saqlanadi (to‘liq tafsilotlar)
- **O‘rtacha eski almashinuvlar (4-8)**: Yengil siqish (bo‘sh joylar va formatlashni tozalash)
- **Eski almashinuvlar (9+)**: «G‘or odami» uslubida siqish (ortiqcha so‘zlarni olib tashlash, umumlashtirish)
- **Juda eski almashinuvlar (20+)**: Kuchli tarzda umumlashtiriladi yoki tashlab yuboriladi

#### Kod namunasi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... yana 50 ta almashinuv ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Dastlabki 3 ta almashinuv: o‘zgartirilmaydi
  light: 8, // 4-8-almashinuvlar: yengil siqish
  moderate: 20, // 9-20-almashinuvlar: «g‘or odami» uslubida siqish
  // 21-almashinuvdan keyin: kuchli umumlashtirish
});

// saved = tejalgan tokenlar soni
```

#### Qachon foydalanish kerak

Progressiv eskirish `aggressive` va `ultra` rejimlari uchun **doimo yoqilgan**. U ayniqsa quyidagi holatlarda samarali:

- Uzoq davom etadigan dasturlash seanslari
- Bir necha kunlik suhbatlar
- Ko‘p vosita chaqiruvlariga ega agentli ish jarayonlari

### «G‘or odami» chiqish rejimi

`outputMode.ts` moduli modelning o‘zi siqilgan, qisqa chiqish («g‘or odami» uslubi) yaratishi uchun **tizim prompti ko‘rsatmalarini** kiritadi.

#### U qanday ishlaydi

Bu rejim kirishni siqish o‘rniga quyidagiga o‘xshash tizim promptini qo‘shadi:

> "Minimal so‘zlar bilan javob bering. Xushmuomalalik iboralarini tashlab ket­ing. Qisqa gaplardan foydalaning."

Bu ayniqsa quyidagilar uchun yaxshi ishlaydi:

- Kod yaratish (qisqaroq chiqish = kamroq token)
- Tezkor savol-javob (batafsil tushuntirishlarga ehtiyoj yo‘q)
- Paketli qayta ishlash (o‘tkazuvchanlikni maksimal darajaga oshirish)

#### Qachon foydalanish kerak

«G‘or odami» chiqish rejimi **ixtiyoriy** — uni kombinatsiyalangan konfiguratsiya orqali o‘rnating:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Chiqish uslublari (katalog)

Yuqoridagi «g‘or odami» chiqish rejimi **eskirgan yagona uslub yo‘li** hisoblanadi. 4-bosqich uni birlashtiriladigan chiqish uslublari katalogiga umumlashtirdi: `open-sse/services/compression/outputStyles/catalog.ts` faylidagi `OUTPUT_STYLE_CATALOG`. Har bir uslub modelning o‘zi tejamkorroq chiqish yaratishiga yordam beradigan tizim prompti ko‘rsatmasidir; uslublarni birgalikda yoqish mumkin va ular katalogdagi tartibda kiritiladi.

| Uslub                             | `id`          | Nima qiladi                                                                                                                                                                                                                                               | Koʻrsatma tillari                                                                |
| --------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Qisqa bayon                       | `terse-prose` | Ortiqcha soʻzlar/artikllar/ikkilanishlarni olib tashlaydi; texnik mazmunni aniq saqlaydi. Eski gʻor odami chiqish rejimidagi matn bilan bir xil (havola qilinadi, qayta yozilmaydi).                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Kamroq kod                        | `less-code`   | YAGNI pogʻonasi: ishlaydigan eng kichik oʻzgarish, soʻralmagan abstraksiyalarsiz.                                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Ot dumi (dangasa katta dasturchi) | `ponytail`    | "Eng yaxshi kod — hech qachon yozilmagan kod": qayta foydalanish > qayta yozish, asosiy sabab > alomat, ishlaydigan eng qisqa diff.                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Menda ADHD bor (avval harakat)    | `i-have-adhd` | Avval harakat (bayondan oldin buyruq/yoʻl/parcha), raqamlangan va chegaralangan qadamlar, BITTA aniq keyingi qadam, kirish/qayta xulosa/yakunlovchi gaplarsiz. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) asosida moslashtirilgan. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Qisqa CJK (文言)                  | `terse-cjk`   | Klassik xitoy tilidagi oʻta qisqa uslub.                                                                                                                                                                                                                  | zh (lokal bilan cheklangan: faqat aniqlangan til `zh` boʻlganda taklif qilinadi) |

Har bir uslub uchta intensivlik darajasi — `lite`, `full`, `ultra` — bilan taqdim etiladi va har bir daraja
kod bloklari, fayl yoʻllari, buyruqlar, xato satrlari, URL manzillar va identifikatorlarni
aynan saqlaydigan umumiy chegaralar bandi bilan tugaydi.

#### Kiritish qanday ishlaydi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) tanlovni
katalog boʻyicha aniqlaydi (nomaʼlum id qiymatlari va lokalga mos kelmaydigan uslublar
olib tashlanadi, hech qachon xato yuz bermaydi), tanlangan koʻrsatmalarni katalog tartibida
birlashtiradi, chegaralar bandini **bir marta** qoʻshadi va blokni yagona idempotentlik
belgisi (`[OmniRoute Output Styles]`) bilan boshlaydi, shuning uchun qayta qoʻllash hech qanday
amal bajarmaydi. Aniqlangan til (quyidagi Til tanloviga qarang) tarjimaga ega boʻlsa,
inglizcha koʻrsatma oʻrniga mahalliylashtirilgan koʻrsatma kiritiladi.

`messages` mavjud boʻlgan tanada kontentni chetlab oʻtish (`shouldBypassCavemanOutputMode()`
`open-sse/services/compression/outputMode.ts` ichida) oxirgi uchta xabarni tekshiradi va
ular xavfsizlik, qaytarib boʻlmaydigan amal, aniqlashtirish yoki tartibga bogʻliq kalit
soʻzlarga mos kelsa, butun navbat uchun uslublarni oʻtkazib yuboradi. Chetlab oʻtish
boshqaruv panelidagi **Avtomatik aniqlik uchun chetlab oʻtish** almashtirgichi
(`cavemanOutputMode.autoClarity`) qanday sozlangan boʻlsa, shunga muvofiq ishlaydi.

Chetlab oʻtish navbatni davom ettirishga ruxsat berganda, `placeSystemInstruction()`
(xuddi shu faylda) hech qachon yangi `messages[0]` yaratmaydi va blokni quyidagilardan
birinchi topilganiga joylashtiradi:

1. Satrli kontentga ega boshlangʻich tizim xabari: blok uning matnidan keyin qoʻshiladi.
2. Yuqori darajadagi `system` maydoni: blok satr matnidan keyin qoʻshiladi yoki
   kontent bloklari massiviga yangi matn bloki sifatida kiritiladi.
3. Keyinroq keladigan, satrli kontentga ega birinchi tizim xabari: blok uning
   matnidan keyin qoʻshiladi.
4. Yuqoridagilarning hech biri boʻlmasa: blok `messages` oxiridagi yangi tizim xabariga joylanadi.

`messages` mavjud boʻlmagan tanada blok satrli `instructions` maydoniga qoʻshiladi
yoki tanada `input` (satr yoki massiv) mavjud boʻlsa, `instructions` qiymatiga aylanadi.
`instructions` ham, `input` ham mavjud boʻlmagan tana `no_messages` sifatida oʻtkazib yuboriladi.

#### Qanday yoqiladi

Boshqaruv panelida: **Kontekst → Sozlamalar → Siqish** — har bir uslub uchun
yoqish/oʻchirish almashtirgichi va daraja tanlagichi mavjud boʻlgan alohida qator. Dasturiy
tarzda siqish konfiguratsiyasi tanlovni quyidagicha saqlaydi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Orqaga muvofiqlik: eski `outputMode: "caveman"` kombinatsiyalangan sozlamasi hamon ishlaydi va
`terse-prose` bilan bogʻlanadi; u har bir eski tilda avvalgi kiritish bilan baytma-bayt bir xil.

Til tanlovi: `languageConfig.enabled` yoqilganida, `autoDetect` eng soʻnggi foydalanuvchi
xabarining tilini tanlaydi (kirish mexanizmlaridagi detektor bilan bir xil);
`autoDetect` oʻchirilsa, `defaultLanguage` belgilanadi. Oʻchirilgan → ingliz tili.

Uslub × til matritsasi
`tests/unit/compression/output-styles-i18n-matrix.test.ts` orqali qatʼiy belgilanadi: yangi uslub
kamida pt-BR tarjimasisiz (yoki aniq kuzatiladigan istisnosiz) chiqarila olmaydi va mavjud
uslub lokalni sezdirmasdan yoʻqota olmaydi. Uslub qoʻshish uchun
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) ga qarang.

### Vosita natijasini siqish

`toolResultCompressor.ts` moduli vosita natijalari (funksiya chaqiruvlari, agent
chiqishlari, qidiruv natijalari va boshqalar) uchun **5 ta maxsus siqish strategiyasini**
taqdim etadi:

1. **Qidiruv natijalarini siqish** — Takroriy natijalarni olib tashlaydi, eng yaxshi N tasini saqlaydi
2. **Fayl oʻqishni siqish** — Katta fayllarni qisqartiradi, sarlavhalar/importlarni saqlaydi
3. **Kod bajarilishini siqish** — Faqat zarur stdout/stderr ni saqlaydi
4. **Maʼlumotlar bazasi soʻrovini siqish** — Qatorlar sonini cheklaydi, batafsil metamaʼlumotlarni olib tashlaydi
5. **API javobini siqish** — null maydonlarni olib tashlaydi, massivlarni ixchamlaydi

#### Qachon foydalanish kerak

Vosita chaqiruvlari mavjud bo‘lganda, vosita natijalarini siqish **doimo yoqilgan** bo‘ladi. Hech qanday
sozlash talab qilinmaydi.

### Ketma-ket konveyer

Ketma-ket rejim **bir nechta mexanizmni ketma-ket** ishga tushiradi — odatda avval RTK
(vosita natijasida 60–90% tejash), so‘ng Caveman (qolgan matnda qo‘shimcha 30%
tejash). Bu **umumiy 78–95% tejash** imkonini beradi.

#### U qanday ishlaydi

```
Kirish (1000 token)
  → RTK (buyruqlarni hisobga oluvchi filtr) → 200 token
    → Caveman (ortiqcha matnni olib tashlash) → 140 token
  → Chiqish (140 token, 86% tejash)
```

#### Qachon foydalanish kerak

Ketma-ket rejimdan quyidagilar uchun foydalaning:

- Vositalardan ko‘p foydalaniladigan ish jarayonlari (agentli dasturlash, tadqiqot)
- Xarajatlarga sezgir paketli qayta ishlash
- Tokenlarni maksimal darajada tejash kerak bo‘lganda

Combo orqali sozlang:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Kombinatsiya uchun siqishni bekor qilish sozlamalari

Turli foydalanish holatlari uchun ishlash tartibini aniq sozlash maqsadida global siqish rejimini **har bir kombinatsiya uchun** alohida bekor qilishingiz mumkin:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Bu quyidagilar uchun foydali:

- **Kodlash kombinatsiyalari**: Uzoq seanslar uchun `aggressive` rejimidan foydalaning
- **Tezkor savol-javob kombinatsiyalari**: Tezkor javoblar uchun `lite` rejimidan foydalaning
- **Vositalar ko‘p ishlatiladigan kombinatsiyalar**: Maksimal tejash uchun `stacked` rejimidan foydalaning
- **Ishlab chiqarish kombinatsiyalari**: Keshlash provayderlari uchun `cache-aware` rejimidan foydalaning

---

## Shuningdek qarang

- [Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) — Siqish muhiti o‘zgaruvchilari
- [Arxitektura qo‘llanmasi](../architecture/ARCHITECTURE.md) — Siqish konveyerining ichki ishlash mexanizmlari
- [Foydalanuvchi qo‘llanmasi](../guides/USER_GUIDE.md) — Siqish bilan ishlashni boshlash
- [RTK siqishi](./RTK_COMPRESSION.md) — RTK filtrlari, ishonch modeli, tekshirish shlyuzi, xom natijani tiklash
- [Siqish mexanizmlari](./COMPRESSION_ENGINES.md) — Caveman, RTK, qatlamlangan rejim, APIlar, MCP, boshqaruv paneli
- [Siqish qoidalari formati](./COMPRESSION_RULES_FORMAT.md) — JSON qoidalar to‘plami formati
- [Siqish til paketlari](./COMPRESSION_LANGUAGE_PACKS.md) — Muayyan tillarga xos Caveman qoidalari
