# 🗜️ Prompt Compression Guide — OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

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

`Dashboard → Context & Cache` bo‘limiga o‘ting:

- **Caveman** — rejimni tanlash, til paketlari, oldindan ko‘rish va global standart sozlamalar
- **RTK** — buyruq filtri natijasini oldindan ko‘rish, RTK xavfsizlik sozlamalari va filtrlar katalogi
- **Compression Combos** — marshrutlash kombinatsiyalariga biriktiriladigan nomlangan mexanizm konveyerlari
- **Auto-Trigger Threshold** — tokenlar soni chegaradan oshganda siqishni avtomatik ravishda ishga tushiradi

### Har bir kombinatsiya uchun alohida sozlama

`Dashboard → Context & Cache → Compression Combos` bo‘limida marshrutlash kombinatsiyasiga siqish kombinatsiyasini biriktiring:

```txt
Kombinatsiya: "free-tier-fallback"
  Siqish kombinatsiyasi: "coding-agent-stack"
  Konveyer: RTK -> Caveman
  Maqsadlar:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu pulli obunalarda yengil rejimni saqlagan holda bepul/dasturlash provayderlarida ketma-ket siqishdan foydalanish imkonini beradi.

Ushbu “Har bir kombinatsiya uchun alohida sozlama” biriktirishi **marshrutlash kombinatsiyasining siqish rejimi** (Default/Off/Lite/Standard/Aggressive/Ultra) ustuvor sozlamasidan farqli boshqaruv vositasidir — bu sozlama nomlangan siqish kombinatsiyasi konveyerini tanlamaydi; u faqat `resolveCompressionPlan` tomonidan tekshiriladigan `compressionMode` maydonini o‘rnatadi. Uni kombinatsiya kartasida (`Dashboard → Combos`) yoki #6760 versiyasidan boshlab, yuqorida hujjatlashtirilgan konveyerni biriktirish katakchasi yonidagi `Dashboard → Context & Cache → Compression Combos` bo‘limining “Assign to routing” ro‘yxatida har bir marshrutlash kombinatsiyasi uchun alohida o‘rnatish mumkin. Har ikkala interfeysdagi o‘zgarishlar bir xil `PUT /api/combos/{id}` oxirgi nuqtasi orqali saqlanadi.

### Har bir so‘rov uchun alohida sozlama

Bitta so‘rov uchun siqish rejasini almashtirish maqsadida `x-omniroute-compression` so‘rov sarlavhasini yuboring. U eng yuqori ustuvorlikka ega — marshrutlash kombinatsiyasi sozlamasi, faol profil, avtomatik ishga tushirish va paneldagi standart sozlamadan ustun turadi. Noma’lum qiymatlar e’tiborsiz qoldiriladi (so‘rov hech qachon rad etilmaydi), global asosiy kalit esa barcha holatlarni boshqarishda davom etadi: siqish global miqyosda o‘chirilgan bo‘lsa, sarlavha uni yoqa olmaydi. Qiymatlar:

| Qiymat        | Ta’siri                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Ushbu so‘rov uchun siqish qo‘llanmaydi.                                                                                             |
| `default`     | Paneldan olingan standart profil (faol profilni e’tiborsiz qoldiradi).                                                              |
| `engine:<id>` | Yoqilgan bo‘lsa, bitta mexanizm, masalan, `engine:rtk`.                                                                             |
| `<combo>`     | Avval nomi bo‘yicha (katta-kichik harflarni farqlamasdan), keyin identifikatori bo‘yicha moslashtiriladigan nomlangan kombinatsiya. |

Qo‘llangan reja `X-OmniRoute-Compression: <mode>; source=<source>` javob sarlavhasida qaytariladi, bunda `<source>` qiymati `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` yoki `off` qiymatlaridan biri bo‘ladi.

### API

```bash
# Siqish sozlamalarini olish
curl http://localhost:20128/api/settings/compression

# Siqish sozlamalarini yangilash
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Muayyan RTK/ketma-ket siqish foydali yuklamasini oldindan ko‘rish
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtr paketlarini ro‘yxatlash
curl http://localhost:20128/api/context/rtk/filters

# RTK’ni ixtiyoriy buyruq metama’lumotlari bilan bevosita sinash
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

## Bosqichlar rejasi

| Bosqich    | Rejimlar                                                                                                                                                                             | Holat          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| 1-bosqich  | Oʻchirilgan, Lite                                                                                                                                                                    | ✅ Chiqarilgan |
| 2-bosqich  | Standard, Aggressive, Ultra                                                                                                                                                          | ✅ Chiqarilgan |
| 3-bosqich  | RTK, Stacked, siqish kombinatsiyalari                                                                                                                                                | ✅ Chiqarilgan |
| 4-bosqich  | Chiqish uslublari, SLM darajasidagi Ultra, baholash vositalari                                                                                                                       | ✅ Chiqarilgan |
| 4C-bosqich | Moslashuvchan kontekst byudjeti ("regulyator") — hisoblash mexanizmi + API (`PUT /api/settings/compression` dagi `contextBudget`) + boshqaruv panelidagi rejim/siyosat boshqaruvlari | ✅ Chiqarilgan |

---

## Minnatdorchilik

Standard rejimidagi siqish qoidalari **[JuliusBrussee](https://github.com/JuliusBrussee)** tomonidan yaratilgan **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — ommalashgan „koʻp token ishlatishning nima keragi bor, kam token ishni bajarsa“ loyihasidan ilhomlangan. Caveman chiqish tokenlari `~75%` ga kamayishi, testlarda oʻrtacha `65%` chiqish tejalishi, chiqish natijalarida `22-87%` oraligʻi va `~46%` kirishni siqish vositasi haqida maʼlum qiladi.

RTK rejimi **[RTK AI](https://github.com/rtk-ai)** tomonidan yaratilgan **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — terminal, qurish, sinov, git va vosita chiqishlarini filtrlash uchun moʻljallangan yuqori unumli buyruq chiqishini siqish loyihasidan ilhomlangan. RTK `60-90%` tejash haqida maʼlum qiladi, uning README faylidagi namunaviy seans esa `~80%` tejalganini koʻrsatadi.

---

## Ilgʻor siqish tizimlari

7 ta standart rejimdan tashqari, OmniRoute kontekstga qarab avtomatik ishlaydigan
bir nechta ilgʻor siqish tizimlarini ham oʻz ichiga oladi.

### Keshni hisobga oluvchi siqish

Ayrim provayderlar (masalan, promptlarni keshlash funksiyasiga ega Anthropic) **promptlarni keshlashni**
qoʻllab-quvvatlaydi, bu ularga xarajatlar va kechikishni kamaytirish uchun prompt qismlarini keshlash imkonini beradi. Keshlash
yoqilganda, agressiv siqish unumdorlikka aslida **zarar yetkazishi** mumkin,
chunki u keshlangan tokenlarni oʻzgartirib, keshni yaroqsiz holga keltiradi.

`cachingAware.ts` moduli buni **keshlash kontekstini aniqlash** va
**siqish strategiyasini mos ravishda sozlash** orqali hal qiladi.

#### U qanday ishlaydi

1. **Keshlash kontekstini aniqlash** — Soʻrov tanasida `cache_control` markerlarini qidiradi
2. **Keshlash provayderlarini aniqlash** — Maqsadli provayder keshlashni qoʻllab-quvvatlashini tekshiradi
3. **Strategiyani sozlash** — Keshlash provayderlari uchun `aggressive`/`ultra` rejimini `standard` rejimiga pasaytiradi
4. **Tizim promptini oʻtkazib yuborish** — Tizim promptlari odatda keshlanadi, shuning uchun ularni siqmang
5. **Deterministik oʻzgartirishlardan foydalanish** — Faqat izchil chiqish hosil qiladigan oʻzgartirishlardan foydalanadi

#### Kod namunasi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Kesh markeri
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Qachon foydalanish kerak

Keshni hisobga oluvchi siqish **doimo yoqilgan** — hech qanday sozlash talab qilinmaydi. U faqat quyidagi hollarda
ishga tushadi:

- Soʻrovda `cache_control` markerlari mavjud boʻlsa
- Maqsadli provayder promptlarni keshlashni qoʻllab-quvvatlasa (Anthropic, OpenAI va boshqalar)

### Progressiv eskirish

Uzoq suhbatlarda koʻplab xabar almashinuvi toʻplanadi, ammo eski almashinuvlar
kamroq ahamiyatli boʻlib boradi. `progressiveAging.ts` moduli **xabarlarni almashinuv masofasiga qarab soddalashtiradi**:

- **Soʻnggi almashinuvlar (0-3)**: Soʻzma-soʻz saqlanadi (toʻliq tafsilotlar)
- **Oʻrtacha eski almashinuvlar (4-8)**: Lite siqish (boʻshliqlar va formatlashni tozalash)
- **Eski almashinuvlar (9+)**: Caveman siqishi (toʻldiruvchi soʻzlarni olib tashlash, umumlashtirish)
- **Juda eski almashinuvlar (20+)**: Kuchli umumlashtiriladi yoki olib tashlanadi

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
  verbatim: 3, // Dastlabki 3 ta almashinuv: soʻzma-soʻz
  light: 8, // 4-8-almashinuvlar: lite siqish
  moderate: 20, // 9-20-almashinuvlar: caveman siqishi
  // 21-almashinuvdan keyin: kuchli umumlashtirish
});

// saved = tejalgan tokenlar soni
```

#### Qachon foydalanish kerak

Progressiv eskirish `aggressive` va `ultra` rejimlari uchun **doimo yoqilgan**. U ayniqsa quyidagilar uchun samarali:

- Uzoq davom etadigan kod yozish seanslari
- Bir necha kunlik suhbatlar
- Koʻp vosita chaqiruvlariga ega agentli ish jarayonlari

### Caveman chiqish rejimi

`outputMode.ts` moduli modelning oʻzi siqilgan, qisqa chiqish matnini ("caveman" uslubida) yaratishi uchun **tizim prompti koʻrsatmalarini** kiritadi.

#### U qanday ishlaydi

Kirish maʼlumotini siqish oʻrniga, bu rejim quyidagiga oʻxshash tizim promptini qoʻshadi:

> "Minimal soʻzlar bilan javob bering. Xushmuomalalik iboralarini tashlab keting. Qisqa gaplardan foydalaning."

Bu ayniqsa quyidagilar uchun yaxshi ishlaydi:

- Kod generatsiyasi (qisqaroq chiqish = kamroq token)
- Tezkor savol-javob (batafsil tushuntirishlarga ehtiyoj yoʻq)
- Ommaviy qayta ishlash (oʻtkazuvchanlikni maksimal darajaga oshirish)

#### Qachon foydalanish kerak

Caveman chiqish rejimi **ixtiyoriy ravishda yoqiladi** — uni kombinatsiyalangan konfiguratsiya orqali sozlang:

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

Yuqoridagi Caveman chiqish rejimi — **eski yagona uslubli yoʻl**. Phase 4 uni birlashtiriladigan chiqish uslublari katalogiga umumlashtirdi: `open-sse/services/compression/outputStyles/catalog.ts` faylidagi `OUTPUT_STYLE_CATALOG`. Har bir uslub modelning oʻzi tejamkorroq chiqish yaratishini taʼminlaydigan tizim prompti koʻrsatmasidir; uslublarni birgalikda yoqish mumkin va ular katalog tartibida kiritiladi.

| Uslub                               | `id`          | Nima qiladi                                                                                                                                                                                                                                          | Koʻrsatma tillari                                                                |
| ----------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Qisqa bayon                         | `terse-prose` | Ortiqcha soʻzlar/artikllar/ikkilanishlarni olib tashlaydi; texnik mazmunni aniq saqlaydi. Eski caveman chiqish rejimi bilan bir xil matn (qayta yozilmaydi, unga havola qilinadi).                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Kamroq kod                          | `less-code`   | YAGNI pogʻonasi: ishlaydigan eng kichik oʻzgarish, soʻralmagan abstraksiyalarsiz.                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Ponytail (erinchoq katta dasturchi) | `ponytail`    | "Eng yaxshi kod — hech qachon yozilmagan kod": qayta foydalanish > qayta yozish, asosiy sabab > alomat, ishlaydigan eng qisqa diff.                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Menda ADHD bor (avval harakat)      | `i-have-adhd` | Avval harakat (bayondan oldin buyruq/yoʻl/parcha), raqamlangan va cheklangan qadamlar, BITTA aniq keyingi qadam, kirish/qayta xulosa/yakuniy iboralarsiz. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) asosida moslashtirilgan. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Qisqa CJK (文言)                    | `terse-cjk`   | Klassik xitoycha oʻta qisqa uslub.                                                                                                                                                                                                                   | zh (lokal bilan cheklangan: faqat aniqlangan til `zh` boʻlganda taklif qilinadi) |

Har bir uslub uchta intensivlik darajasida taqdim etiladi — `lite`, `full`, `ultra` — va har bir daraja kod bloklari, fayl yoʻllari, buyruqlar, xato satrlari, URL manzillari va identifikatorlarni aynan oʻz holicha saqlaydigan umumiy chegaralar bandi bilan tugaydi.

#### Kiritish qanday ishlaydi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) tanlovni katalog bilan muvofiqlashtiradi (nomaʼlum id lar va lokalga mos kelmaydigan uslublar olib tashlanadi, bu hech qachon xato hisoblanmaydi), tanlangan koʻrsatmalarni katalog tartibida birlashtiradi, chegaralar bandini **bir marta** qoʻshadi va natijani yagona idempotentlik belgisi (`[OmniRoute Output Styles]`) ortidan tizim promptining boshiga joylashtiradi — qayta qoʻllash hech qanday taʼsir koʻrsatmaydi. Aniqlangan soʻrov tili uchun tarjima mavjud boʻlsa, inglizcha koʻrsatma oʻrniga mahalliylashtirilgan koʻrsatma kiritiladi.

#### Qanday yoqiladi

Boshqaruv panelida: **Context → Settings → Compression** — har bir uslub uchun yoqish/oʻchirish tugmasi va daraja tanlagichi boʻlgan alohida qator. Dasturiy tarzda siqish konfiguratsiyasi tanlovni quyidagicha saqlaydi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Orqaga moslik: eski kombinatsiyalangan `outputMode: "caveman"` sozlamasi hamon ishlaydi va har bir eski tilda avvalgi kiritish bilan baytma-bayt bir xil boʻlgan `terse-prose` ga moslashtiriladi.

Til tanlash: `languageConfig.enabled` yoqilgan boʻlsa, `autoDetect` eng soʻnggi foydalanuvchi xabarining tilini tanlaydi (kirish mexanizmlaridagi detektor bilan bir xil); `autoDetect` ni oʻchirish `defaultLanguage` ni doimiy qiladi. Oʻchiq → Ingliz tili.

Uslub × til matritsasi `tests/unit/compression/output-styles-i18n-matrix.test.ts` orqali qatʼiy belgilanadi: yangi uslub kamida pt-BR tarjimasisiz (yoki aniq kuzatiladigan istisnosiz) chiqarilmaydi va mavjud uslub lokalni sezdirmasdan yoʻqota olmaydi. Uslub qoʻshish uchun [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) ga qarang.

### Vosita natijalarini siqish

`toolResultCompressor.ts` moduli vosita natijalari (funksiya chaqiruvlari, agent chiqishlari, qidiruv natijalari va boshqalar) uchun **5 ta ixtisoslashtirilgan siqish strategiyasini** taqdim etadi:

1. **Qidiruv natijalarini siqish** — Takroriy natijalarni olib tashlaydi, eng yaxshi N tasini saqlaydi
2. **Fayl oʻqishni siqish** — Katta fayllarni qisqartiradi, sarlavhalar/importlarni saqlaydi
3. **Kod bajarilishini siqish** — Faqat muhim stdout/stderr ni saqlaydi
4. **Maʼlumotlar bazasi soʻrovini siqish** — Qatorlarni cheklaydi, batafsil metamaʼlumotlarni olib tashlaydi
5. **API javobini siqish** — Null maydonlarni olib tashlaydi, massivlarni ixchamlashtiradi

#### Qachon foydalanish kerak

Vosita chaqiruvlari mavjud boʻlganda, vosita natijalarini siqish **doimo yoqilgan**. Hech qanday konfiguratsiya talab qilinmaydi.

### Ketma-ket konveyer

Ketma-ket rejim **bir nechta mexanizmni ketma-ket** ishga tushiradi — odatda avval RTK (vosita chiqishida 60-90% tejash), soʻngra Caveman (qolgan matnda qoʻshimcha 30% tejash). Bu **jami 78-95% tejash** imkonini beradi.

#### U qanday ishlaydi

```
Kirish (1000 token)
  → RTK (buyruqlarni hisobga oluvchi filtr) → 200 token
    → Caveman (ortiqcha soʻzlarni olib tashlash) → 140 token
  → Chiqish (140 token, 86% tejash)
```

#### Qachon foydalanish kerak

Ketma-ket rejimdan quyidagilar uchun foydalaning:

- Vositalarga boy ish jarayonlari (agentli kodlash, tadqiqot)
- Xarajatlarga sezgir ommaviy qayta ishlash
- Tokenlarni maksimal darajada tejash kerak boʻlganda

Kombinatsiyalangan konfiguratsiya orqali sozlang:

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
