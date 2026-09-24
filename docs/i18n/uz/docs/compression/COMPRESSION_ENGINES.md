# Compression Engines (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute siqish mexanizmi engine shartnomalari asosida qurilgan. Rejim bitta engine’ni bevosita
(`caveman` yoki `rtk`) yoxud bir nechta engine’ni belgilangan tartibda ishga tushiradigan deterministik ketma-ket pipeline’ni bajarishi mumkin.

## Rejimlar

| Rejim        | Dvigatel yo'li                                                                                   | Mo'ljallangan kirish                               |
| ------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `off`        | hech qanday                                                                                      | Aniq so'rovni saqlash                              |
| `lite`       | Caveman lite yordamchilari                                                                       | Har doim yoqilgan past xavfli tozalash             |
| `standard`   | Caveman                                                                                          | Tabiiy til so'rovini ixchamlash                    |
| `aggressive` | Caveman + tarix/asbob xulosachilari                                                              | Uzoq suhbat sessiyalari                            |
| `ultra`      | Caveman + kesish yordamchilari                                                                   | Kontekst chegarasini tiklash                       |
| `rtk`        | RTK                                                                                              | Terminal, shell, build, test va git chiqishi       |
| `omniglyph`  | OmniGlyph                                                                                        | Mahalliy provayder simida kontekstni rasm sifatida |
| `stacked`    | Pipeline. So'rovning sukut bo'yicha qiymati `session-dedup -> lite`. `rtk -> caveman` ixtiyoriy. | Aralash asbob jurnallari va nasr, maksimal tejash  |

### OmniGlyph siqish profillari

`omniglyph` dvigateli (`omniglyph` paketi, 1.4.0+) nomlangan semantik profilni qabul qiladi, u siqish sozlamalarida `omniglyph.profile` orqali global ravishda yoki yig'ilgan quvur liniyasining qadam konfiguratsiyasi orqali har bir qadam uchun o'rnatiladi:

| Profil        | Chegara                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Standart. Nashr etilgan kvitansiyalar o'lchagan siyosat — tasvirlar tizimi, asbob hujjatlari va zich tarix   |
| `balanced`    | Jonli holatni mahalliy saqlaydi, oxirgi 8 burilishni himoya qiladi, eski yopiq tarixni yig'adi               |
| `coding-safe` | Vakolatni, asbob sxemalarini va jonli asbob chiqishini mahalliy saqlaydi, oxirgi 12 burilishni himoya qiladi |
| `passthrough` | O'zgartirmasdan yo'naltiradi; dvigatel o'tkazib yuboriladi                                                   |

Profil **shift, pol emas**: paketdagi `mergeCompressionProfileOptions` chaqiruvchiga profil yopgan yo'qotishli yo'lni qayta ochishga ruxsat bermaydi, shuning uchun har bir qadam uchun `preserveSystemPrompt: false` `coding-safe` ostida tizim siqishni qayta yoqolmaydi.

Ushbu kod bazasida o'lchangan: `coding-safe` va `balanced` `minCompressChars` ni maksimal darajaga ko'taradi va tizim, asbob sxemalari va asbob natijalarini mahalliy saqlaydi, shuning uchun hali tarix to'plamagan sessiya `below_min_chars` da to'xtaydi va dvigatel hech narsani o'zgartirmaydi. Shuning uchun standart profil eng xavfsiz profil emas, balki `aggressive` hisoblanadi.

Paket o'zining model doirasini va profilini o'z muhit konfiguratsiyasidan hal qiladi. OmniRoute hech qachon qarorni delegatsiya qilmaydi: adapter model darvozasini paketning eng cheklovchi doirasiga bog'laydi, shuning uchun xost muhiti sozlamalari faqat ruxsat berilganlar ro'yxatini toraytirishi mumkin, OmniRoute o'lchagan kvitansiyalardan tashqariga kengaytira olmaydi.

## Dvigatellar reyestri

Reyestr `open-sse/services/compression/engines/registry.ts` faylida joylashgan. Dvigatellar umumiy
shartnomani taqdim etadi:

- `id`: `caveman` yoki `rtk` kabi barqaror dvigatel identifikatori
- `apply(text, config)`: ketma-ket quvurlar tomonidan ishlatiladigan eski bajarish yoʻli
- `compress(input, config)`: matn + statistikani qaytaruvchi asosiy bajarish yoʻli
- `getConfigSchema()`: yaroqli konfiguratsiyaning JSON-Schema-ga oʻxshash shaklini qaytaradi
- `validateConfig(config)`: `{ valid, errors[] }` ni qaytaradi

Roʻyxatdan oʻtkazishda `registerCompressionEngine(engine)` (yoki murakkab holatlar uchun `registerEngine`)
ishlatiladi; u qabul qilishdan oldin `assertValidEngine()` va `validateConfig(defaultConfig)` ni chaqiradi.
Dvigatelni bajarilish vaqtida olib tashlash uchun `unregisterCompressionEngine(id)` dan foydalaning.

`strategySelector.ts` siqish bajarilishidan oldin ichki dvigatellarni roʻyxatdan oʻtkazadi. Bu dastlabki koʻrish,
bajarilish vaqtidagi siqish, ketma-ket rejim, testlar va kelajakdagi dvigatellarga bir xil bajarish yoʻlidan foydalanish imkonini beradi.

### MCP tavsifini siqish (aloqador)

Alohida reyestr MCP vositalari tavsifi metamaʼlumotlarini reyestr darajasida siqadi — qarang:
`open-sse/mcp-server/descriptionCompressor.ts` va [MCP-SERVER.md](../frameworks/MCP-SERVER.md). U Caveman
qoidalarini qayta ishlatadi, ammo soʻrov foydali yuklari bilan emas, vosita metamaʼlumotlari bilan ishlaydi.

### Qoʻshimcha ichki dvigatellar

Caveman, RTK va LLMLingua-2 dan tashqari, reyestr bir nechta ixtisoslashgan yoʻqotishsiz /
tuzilmaviy dvigatellarni ham taqdim etadi (ular ketma-ket quvurlar, sinov maydonchasi va testlarda ishlatiladi):

| Dvigatel      | Id              | Nima qiladi                                                                                                                                                                                                |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): yirik uzluksiz matn bloklarini kontentga asoslangan havolalar bilan almashtiradi, natijada takroriy/yirik bloklar bir marta yuborilib, keyinchalik ularga havola qilinadi. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): bir xil tuzilishga ega JSON massiv foydali yuklarini ustunli `[N rows]` shakliga yoʻqotishsiz jadvalli ixchamlaydi.                                                                |
| ionizer       | `ionizer`       | Juda katta bir xil tuzilishga ega bloklardan bosh/oʻrta/oxir qatorlarni tanlab oladi va chiqarib tashlangan oʻrta qismni CCR kontentga asoslangan havolasi sifatida saqlaydi.                              |
| session-dedup | `session-dedup` | Seans davomida navbatlararo kontentga asoslangan takrorlarni olib tashlash (TokenMizer-dan ilhomlangan): ayni seansning oldingi navbatlarida allaqachon uchragan matnni chiqarib tashlaydi.                |

**CCR olish protokoli koʻrsatmasi (#8033):** CCR soʻrovdagi ≥1 blokni birinchi marta
almashtirganda, dvigatel marker → vosita shartnomasini chaqiruvchiga tushuntiruvchi yagona, idempotent
`system` xabarini (`[CCR protocol]` sentinelidan boshlanadigan) boshiga qoʻshadi:
`[CCR retrieve hash=<24hex> chars=N]` markeri nimani anglatishi, xesh aynan oʻz holicha
(barcha 24 ta oʻn oltilik belgi — notoʻgʻri koʻchirilgan xeshlar "blok topilmadi"
xatolarining ehtimoliy sababidir) koʻchirilishi shartligi va `[dedup:ref sha=...]` markeri
"vositani chaqirish" emas, balki "tarixga qaytib qarash" maʼnosini anglatishi tushuntiriladi.
Izoh **faqat chaqiruvchi eʼlon qilgan `tools[]` uning haqiqatan ham
`omniroute_ccr_retrieve` ga kira olishini tasdiqlaganda** (`callerSupportsCcrRetrieve()` funksiyasi
`open-sse/services/compression/engines/ccr/protocolInstruction.ts` ichida) kiritiladi — bu vositasiz oddiy
OpenAI-mos chaqiruvchi oʻzi kira olmaydigan narsani chaqirish koʻrsatmasini hech qachon olmaydi.
Idempotentlik kiritishdan oldin xabarlar tarixida sentinelni qidirish orqali taʼminlanadi,
shuning uchun koʻp navbatli soʻrovlarda (oldingi xabarlar qayta uzatiladi) izoh har bir navbatda
ustma-ust qoʻshilmaydi.

## Caveman

Caveman rejimi odatiy nasriy matnni semantik jihatdan ixchamlashtirishga qaratilgan:

- kod bloklari, URL manzillar, JSON, yoʻllar va tuzilmaviy maʼlumotlarni saqlab qoladi
- ortiqcha soʻzlar, noaniq ifodalar, takrorlangan kontekst va choʻziq bogʻlovchi iboralarni olib tashlaydi
- `open-sse/services/compression/rules/` ichidagi tilga mos fayl qoidalari toʻplamlarini qoʻllab-quvvatlaydi
- eski `standard`, `aggressive` va `ultra` rejimlari orqali ham foydalanish mumkin

Boshqaruv panelidagi joylashuvi: `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream hisobotlariga koʻra, chiqish tokenlari `~75%` ga kamayadi, benchmarklarda chiqish hajmi oʻrtacha `65%` ga tejaladi,
diapazon esa `22-87%` ni tashkil qiladi; kirishni siqish vositasi uchun bu koʻrsatkich `~46%`. OmniRoute ustma-ust qoʻllanilgan prompt/kontekst tejashlarini
hujjatlashtirishda Cavemanʼning kirish tomonidagi koʻrsatkichidan foydalanadi; Caveman chiqish rejimi esa alohida
javob xatti-harakati xususiyati boʻlib qoladi.

## RTK

RTK rejimi buyruq va vosita chiqishlariga qaratilgan:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go testlari, TypeScript/Vite/Webpack buildlari, ESLint, npm audit/oʻrnatishlari, Docker loglari,
  shell `find`/`grep`, stek izlari va umumiy loglar kabi chiqish sinflarini aniqlaydi
- `open-sse/services/compression/engines/rtk/filters/` ichidagi 49 ta JSON filtrini qoʻllaydi
- RTK uslubidagi deklarativ konveyerni qoʻllab-quvvatlaydi: ANSIʼni olib tashlash, almashtirish, chiqish mos kelganda qisqa tutashuv,
  satrlarni olib tashlash/saqlash, har bir satrni qisqartirish, bosh/oxir/maksimal satr boʻyicha qisqartirish va natija boʻsh boʻlgandagi zaxira variant
- `.rtk/filters.json` ichidagi ishonch bilan cheklangan loyiha filtrlarini va
  `DATA_DIR/rtk/filters.json` ichidagi global filtrlarni qoʻllab-quvvatlaydi
- ANSI ketma-ketliklari, jarayon shovqini, takroriy satrlar va foydasiz andozaviy matnlarni olib tashlaydi
- amaliy choralar koʻrish mumkin boʻlgan xatolar, ogohlantirishlar, xulosalar, oʻzgartirilgan fayllar va yakuniy kontekstni saqlab qoladi
- tiklash/nosozliklarni aniqlash uchun autentifikatsiyalangan boshqaruv
  marshrutlari orqali tahrirlangan xom chiqishni ixtiyoriy ravishda saqlab qolishi mumkin

Boshqaruv panelidagi joylashuvi: `Dashboard -> Context & Cache -> RTK`.

Maxsus filtrlar, ishonch, tekshirish va xom chiqishni tiklash boʻyicha operatsion tafsilotlar
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) ichida keltirilgan.

RTK upstream hisobotlariga koʻra, buyruq chiqishini siqishda `60-90%` tejaladi. Uning README misolida
30 daqiqalik Claude Code seansi `~118,000` tokendan `~23,900` tokengacha qisqargani, yaʼni `79.7%` tejalishi koʻrsatilgan.

## LLMLingua-2 (Semantik kesish)

LLMLingua-2 rejimi kichik ONNX token klassifikatoridan foydalanib, nasriy matnda **semantik tokenlarni kesish**ni
amalga oshiradi va qoidalarga asoslangan Caveman hamda RTK dvigatellarini toʻldiradi:

- faqat tizimga oid boʻlmagan xabarlardagi nasriy matnni siqadi; chegaralangan kod bloklari va boshqa saqlanadigan
  tuzilmalar hech qachon oʻzgartirilmaydi
- `@atjsh/llmlingua-2` backendini (ONNX `@huggingface/transformers` orqali) ishchi
  oqimda ishga tushiradi, shuning uchun model inferensi soʻrov hodisalari siklini hech qachon bloklamaydi
- **ustma-ust qoʻllanishi mumkin** (`stackPriority` 35): ustma-ust konveyerda u
  tuzilmaviy dvigatellardan (CCR, session-dedup, headroom, Caveman) keyin, ammo `ultra`dan oldin ishlaydi, chunki
  semantik kesish avvaldan tuzilmaviy tarzda siqilgan matnda eng samarali — masalan,
  `rtk -> caveman -> llmlingua`
- **har qanday xatoda ishni toʻxtatmaydi** (yetishmayotgan ixtiyoriy bogʻliqliklar, ishchi oqimni yaratish, modelni yuklash, inferens
  yoki vaqt tugashi) → xato oʻrniga asl matn oʻzgartirilmasdan qaytariladi

Dvigatel joylashuvi: `open-sse/services/compression/engines/llmlingua/`. Boshqaruv panelidagi joylashuvi:
`Dashboard -> Context & Cache -> LLMLingua`.

### Modellar

Standart model — **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
tezkor). Aniqligi yuqoriroq **BERT-base** modeli (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) dvigatel konfiguratsiyasidagi `model` maydoni orqali mavjud. Birinchi chaqiruvda (`modelStore.ts`)
`@huggingface/transformers` tanlangan modelni HuggingFace Hubʼdan
`${DATA_DIR}/models/llmlingua` ichiga kechiktirib yuklab oladi; `modelPath` konfiguratsiya
almashtirishi esa uni mahalliy nusxaga yoʻnaltiradi (oflayn / tarmoqdan ajratilgan oʻrnatishlar).

### Ixtiyoriy bogʻliqliklar va talab boʻyicha oʻrnatish

Kesilishi mumkin boʻlgan LLMLingua ish vaqti peer steki **ixtiyoriy**. Ikki paket
`package.json` ichida `optionalDependencies` sifatida eʼlon qilingan va ishlab chiqarish buildida
**tashqi** holatda saqlanadi (`scripts/build/prepublish.ts` ularni paketga qoʻshmaydi):

| Paket                | Versiya (qatʼiy) | Izohlar                                                |
| -------------------- | ---------------- | ------------------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`          | Kirish paketi; boshqalarini peer sifatida eʼlon qiladi |
| `js-tiktoken`        | `^1.0.20`        | Tokenizator                                            |

`@huggingface/transformers` `^4.2.0` versiyasiga mahkamlangan (mahalliy embedding yoʻli bilan umumiy ishlatiladi va
mustaqil paketga ham kiritiladi); `@atjsh/llmlingua-2@2.0.5` u bilan
`"^3.5.2 || ^4.0.0"` orqali peer bogʻliqlikka ega, shu sababli Transformers.js v3 va v4ʼning ikkalasi ham qoʻllab-quvvatlanadi. 2.0.4 versiyasidan boshlab,
`@atjsh/llmlingua-2` endi `@tensorflow/tfjs`ni talab qilmaydi, bu SLM stekidagi eng katta
alohida komponentni (TensorFlow.js) olib tashladi. Faqat yuqoridagi ikki paket kesilishi mumkin boʻlgan SLM
peer paketlaridir. Oddiy `npm install` (dev), agar ixtiyoriy bogʻliqliklar chiqarib tashlanmasa, ixtiyoriy
stekni avtomatik ravishda oʻrnatadi.

**Nima uchun talab boʻyicha:** npm orqali chop etilgan paket, mustaqil paket va Docker tasviri
ixcham qolishi uchun bu bogʻliqliklarsiz **tarqatiladi**. Ular mavjud boʻlmaganda, ishchi oqimning bogʻliqlik
tekshiruvi (`worker.ts` ichidagi `@atjsh/llmlingua-2` resolve tekshiruvi) muvaffaqiyatsiz tugaydi va dvigatel
**xatoni bildirmasdan ishni davom ettiradi** — LLMLinguaʼni tanlash hech qanday amal bajarmaydi (matn oʻzgartirilmasdan qaytariladi,
xato jurnalga yozilmaydi). Uni qisqartirilgan muhitda faollashtirish uchun ixtiyoriy stekni oʻrnating:

```bash
# package.json optionalDependencies ichida eʼlon qilingan versiyalarga mahkamlang
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs`ning olib tashlanishi (2.0.4+) avval ustun boʻlgan ~800 MB hajmdagi
komponentni yoʻq qiladi — qolgan hajm transformers.js + onnxruntime-node ish vaqtlaridan,
shuningdek, birinchi foydalanishda yuklab olinadigan (npm orqali emas) TinyBERT modelidan (~57 MB) iborat.

Har bir muhit uchun:

- **Dev / `npm install`** — agar `--omit=optional` (yoki `--no-optional`) parametrini
  bermagan boʻlsangiz, avtomatik ravishda oʻrnatiladi. Hech qanday amal talab qilinmaydi.
- **Global npm (`npm i -g omniroute`) / mustaqil** — yuqoridagi oʻrnatish buyrugʻini
  oʻrnatilgan paket katalogida ishga tushiring yoki ixtiyoriy bogʻliqliklarni chiqarib tashlamasdan qayta oʻrnating.
- **Docker** — oʻrnatish buyrugʻini hosilaviy tasvir qatlamiga qoʻshing; eʼlon qilingan tasvir
  ataylab ixcham qilib yetkaziladi.
- **VPS (PM2)** — ilovaning `node_modules` katalogiga oʻrnating, soʻng worker gateʼni
  qayta tekshirishi uchun jarayonni qayta ishga tushiring.
- **Raw Next mustaqil (`npm run build` → `.build/next/standalone/server.js`)** — mustaqil
  trace na workerʼni, na ixtiyoriy bogʻliqliklarni oʻz ichiga oladi, shu sababli engine indamasdan
  fail-open rejimiga oʻtadi. `scripts/build/colocate-standalone.mjs` ikkalasini ham qayta qoʻllaydi (worker esbuild +
  ixtiyoriy bogʻliqliklar closureʼini mustaqil daraxtga joylaydi); u har bir buildʼdan keyin
  `postbuild` npm hookʼi orqali avtomatik ishga tushadi. Idempotent, bogʻliqliklar mavjud boʻlmaganda fail-soft ishlaydi.

**Faolligini tekshirish:** LLMLingua tanlanganda, haqiqiy nasriy matn amalda qisqaradi (engine
fail-open rejimiga oʻtishni toʻxtatadi) va birinchi soʻrov modelni
`${DATA_DIR}/models/llmlingua` katalogiga yuklab olishni boshlaydi. Gate ataylab faqat `@atjsh/llmlingua-2` paketini tekshiradi —
boshqa peerʼlar faqat ESMʼga moʻljallangan va ular mavjud boʻlsa ham `require.resolve` xatolik chiqaradi — shu sababli
`import()` vaqtida biror peer haqiqatan mavjud boʻlmasa, worker baribir fail-open rejimiga oʻtadi.

## Ketma-ket ulangan konveyerlar

Ketma-ket ulangan rejim konveyer bosqichlarini tartib bilan bajaradi. Standart tartib:

```txt
rtk -> caveman
```

Bundan buyruq chiqishini inson yoki yordamchi matni bilan birlashtiradigan soʻrovli kodlash agenti seanslari uchun foydalaning. RTK avval shovqinli vosita jurnallarini kamaytiradi, soʻng Caveman qolgan tabiiy tilni siqadi.

Konveyer bosqichlari siqish sozlamalaridagi `stackedPipeline` orqali yoki siqish kombinatsiyalari orqali sozlanadi.

Har ikkala mexanizm bir xil mos yuklamani kamaytirganda, tejamkorlik birikadi:

```txt
combined = 1 - (1 - RTK tejamkorligi) * (1 - Caveman kirish tejamkorligi)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP maxsus imkoniyatlar daraxti filtri

MCP maxsus imkoniyatlar daraxtining aqlli filtri — bajarilishdan keyingi siqish qatlami boʻlib, soʻrovlar yoki kontekstda emas, MCP **vosita natijalari** ustida ishlaydi. U Playwright, computer-use va brauzerni avtomatlashtirish MCP serverlari kabi vositalar qaytaradigan batafsil maxsus imkoniyatlar daraxti hamda brauzer surati yuklamalariga moʻljallangan.

### U nima qiladi

1. **Shovqinni olib tashlash** — boʻsh umumiy/matn yozuvlarini (`- generic:`, `- text: ""`) olib tashlaydi
2. **Qoʻshni elementlarni yigʻish** — ketma-ket ≥ `collapseThreshold` (standart qiymati 30) qator tuzilmaviy takrorlardan iborat boʻlsa, ularni dastlabki `collapseKeepHead` (standart qiymati 10) qator + son boʻyicha xulosa + oxirgi `collapseKeepTail` (standart qiymati 5) qator koʻrinishida yigʻadi
3. **Havolalarni saqlash** — Playwright/computer-use uchun zarur boʻlgan `[ref=eXX]` tayanchlariga hech qachon tegilmaydi
4. **Qatʼiy qisqartirish** — agar yigʻishdan keyin matn hali ham `maxTextChars` (standart qiymati 50,000) chegarasidan oshsa, agent ishni davom ettira olishi uchun navigatsiya koʻrsatmasi bilan qisqartiriladi

### Mexanizm joylashuvi

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() kirish nuqtasi
  collapseRepeated.ts ← qoʻshni elementlarni yigʻish algoritmi
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Sozlash

Global sozlamalardagi `compression.mcpAccessibility` orqali boshqariladi (migratsiya 056). Standart konfiguratsiya:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filtr faqat `type` qiymati `"text"` boʻlgan va uzunligi `minLengthToProcess` qiymatidan oshadigan vosita natijasi yuklamalariga qoʻllanadi. U soʻrovlarni siqish yoki soʻrov yuklamalariga taʼsir qilmaydi.

### Kutiladigan tejamkorlik

Sahifa murakkabligiga qarab, brauzer surati vosita natijalarida 60–80%. Yigʻish algoritmi qatorlar soniga nisbatan O(n) murakkablikda ishlaydi va ahamiyatsiz darajada kechikish qoʻshadi.

### Ushbu filtr va yuqoridagi siqish mexanizmlari

| Jihat           | Caveman / RTK / Stacked | MCP maxsus imkoniyatlar filtri         |
| --------------- | ----------------------- | -------------------------------------- |
| Nishon          | Soʻrovlar / kontekst    | MCP vosita natijalari                  |
| Faollashuv      | Siqish rejimi sozlamasi | `compression.mcpAccessibility.enabled` |
| Qamrov          | Barcha SSE xabarlari    | Faqat vosita natijalari                |
| Ref tayanchlari | Qoʻllanilmaydi          | Shartsiz saqlanadi                     |

---

## Siqish kombinatsiyalari

Siqish kombinatsiyalari — marshrutlash kombinatsiyalariga tayinlanishi mumkin bo‘lgan nomlangan siqish profillari:

- `compression_combos`: rejim, konveyer, RTK konfiguratsiyasi, til konfiguratsiyasi va standart belgisini saqlaydi
- `compression_combo_assignments`: siqish kombinatsiyasini marshrutlash kombinatsiyasiga bog‘laydi
- bajarilish vaqtidagi integratsiya umumiy kombinatsiya almashtirishlaridan oldin tayinlangan siqish kombinatsiyasini aniqlaydi
- tahlillar `compression_combo_id` va `engine`ni o‘z ichiga oladi

Boshqaruv panelidagi joylashuvi: `Dashboard -> Context & Cache -> Compression Combos`.

## API interfeysi

| Marshrut                               | Maqsad                                                                             |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Global siqish sozlamalari (`mcpAccessibility` konfiguratsiyasini o‘z ichiga oladi) |
| `/api/compression/preview`             | Istalgan siqish rejimini oldindan ko‘rish                                          |
| `/api/compression/language-packs`      | Mavjud Caveman til paketlarini ro‘yxatlash                                         |
| `/api/context/caveman/config`          | Caveman sozlamalari uchun muqobil nom                                              |
| `/api/context/rtk/config`              | RTK standart qiymatlari va sozlamalari                                             |
| `/api/context/rtk/filters`             | RTK filtrlari katalogi                                                             |
| `/api/context/rtk/test`                | RTK oldindan ko‘rish/sinov endpointi                                               |
| `/api/context/rtk/raw-output/[id]`     | Autentifikatsiyalangan, maxfiy qismlari olib tashlangan xom natijani tiklash       |
| `/api/context/combos`                  | Siqish kombinatsiyalari uchun CRUD                                                 |
| `/api/context/combos/[id]/assignments` | Marshrutlash kombinatsiyasi tayinlovlari uchun CRUD                                |
| `/api/context/analytics`               | Siqish tahlillari uchun muqobil nom                                                |

Boshqaruv marshrutlari boshqaruv autentifikatsiyasi yoki API kaliti siyosati tekshiruvlarini talab qiladi.

## MCP vositalari

Siqish beshta MCP vositasini taqdim etadi:

| Vosita                              | Qamrov              | Maqsad                                    |
| ----------------------------------- | ------------------- | ----------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Sozlamalar, tahlillar, kesh statistikasi  |
| `omniroute_compression_configure`   | `write:compression` | Global sozlamalarni yangilash             |
| `omniroute_set_compression_engine`  | `write:compression` | Rejim va ixtiyoriy konveyerni belgilash   |
| `omniroute_list_compression_combos` | `read:compression`  | Siqish kombinatsiyalarini ro‘yxatlash     |
| `omniroute_compression_combo_stats` | `read:compression`  | Kombinatsiya/dvigatel tahlillarini o‘qish |

## Qamrov va istisnolar

**Embeddinglar hech qachon siqilmaydi.** `open-sse/handlers/embeddings.ts` hech qachon hech qanday
siqish dvigatelini chaqirmaydi — so‘rov/javob tanalari o‘zgartirilmagan holda to‘g‘ridan-to‘g‘ri ijrochiga uzatiladi.
Hozirda bu tuzilmaviy xususiyatdir (embeddinglar va chat yakunlashlari alohida ishlov beruvchilarga ega), bajarilish
vaqtidagi tekshiruv emas, ammo bu #8034 dagi vektor buzilishi bilan bog‘liq xavotirning embeddinglar yo‘lida
ta’sir yuzasi yo‘qligini anglatadi.

**Har bir model/endpoint uchun istisno filtri (#8034).** Chat yakunlashlari uchun operator
hech qachon siqilmasligi kerak bo‘lgan model idlari / `provider/model` maqsadlarini ko‘rsatishi mumkin — bu
keyinchalik siqish embeddinglarga yaqin yo‘lga ulansa foydali bo‘ladigan himoya chorasi bo‘lib, aniq baytma-bayt
prompti muhim bo‘lgan har qanday model uchun ham foydalidir (deterministik baholashlar, keshga sezgir
prefikslar va hokazo).

- Sozlamalar maydoni: global siqish konfiguratsiyasidagi `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`), mavjud `key_value` siqish nomlar fazosi orqali saqlanadi
  (`src/lib/db/compression.ts`) — yangi jadval yo‘q.
- Boshqaruv paneli varag‘i: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Andoza sintaksisi: `*` yagona joker belgidir. Andozadagi boshqa barcha regex meta-belgilari
  moslashtirishdan oldin ekranlanadi, shuning uchun `gpt-5.6` faqat aynan shu literal satrga mos keladi,
  `gpt-5x6`ga esa hech qachon mos kelmaydi (ReDoS xavfsiz, chegaralangan, ichma-ich kvantifikatorlarsiz).
  Andozalar registrni hisobga olmagan holda ham model idining o‘ziga, ham `provider/model`
  kompozitiga moslashtiriladi — `gpt-5-6`, `openai/gpt-5-6` va `openai/*`ning barchasi ishlaydi,
  `*`ning o‘zi esa barcha modellarni istisno qiladi.
- Moslashtirish: `open-sse/services/compression/exclusions.ts` ichidagi
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`. `chatCore.ts` siqish sozlamalarini
  aniqlagandan so‘ng, **biror dvigatel ishga tushishidan oldin**, istisno qilingan maqsadni tekshiradi
  va moslikni xuddi siqish global miqyosda o‘chirilgandek qayta ishlaydi — so‘rov tanasi isbotlanadigan
  darajada baytma-bayt aynan bir xil qoladi. O‘tkazib yuborish tahlillarda ko‘rinishi uchun
  `writeCompressionSkip(..., "excluded")` orqali qayd etiladi.
- Standart holat (bo‘sh/mavjud bo‘lmagan ro‘yxat): #8034 dan oldingi xatti-harakat bilan bir xil —
  hech narsa istisno qilinmaydi.

## Maʼlum cheklovlar

- **LLMLingua-2 (SLM) bir joyga joylashtirilgan ixtiyoriy bogʻliqliklarni talab qiladi.** Worker production buildda faqat `@atjsh/llmlingua-2` va uning peer bogʻliqliklari `dist/node_modules` ichiga bir joyga joylashtirilganida ishlaydi (`scripts/build/colocateOptionals.mjs`, #4286 ga qarang). Ularsiz engine xatoni chetlab oʻtadi (asl matnni qaytaradi). Worker rezolyutsiyasi endi `import.meta.url` ga bogʻliq emas (u mustaqil toʻplamda ishlamay qoladi) — u runtime `cwd` / `argv[1]` ga tayanadi.
- **Caveman til paketlari `de` / `fr` / `ja` qisman toʻliq.** Ular `context` + `filler` + `structural` qoidalari bilan taqdim etiladi, ammo `dedup` / `ultra` paketlari mavjud emas, shu sababli bu tillar uchun `ultra` intensivligi `full` dan kuchliroq emas (ular faqat oʻz qoidalaridan foydalanadi — xorijiy matnni buzishi mumkin boʻlgan inglizcha `dedup`/`ultra` qoidalariga yashirin qaytish mavjud emas). `en` / `es` / `id` / `pt-BR` toʻliq. Qisman toʻliq paketlar uchun `dedup.json` + `ultra.json` hissalari mamnuniyat bilan qabul qilinadi.
- **Ketma-ket telemetriya faqat siqishni amalga oshirgan enginelarni koʻrsatadi.** Engine ishga tushgan, ammo 0 % tejashni taʼminlagan ketma-ket pipeline bosqichi `stats:null` qaytaradi va shu sababli `engineBreakdown` ichida koʻrinmaydi — uni oʻtkazib yuborilgan bosqichdan ajratib boʻlmaydi. “Ishga tushdi, 0 %” holatini “oʻtkazib yuborildi” holatidan ajratish breakdown modelini oʻzgartirishni talab qiladi va keyinga qoldirilgan.

## Validatsiya

Ushbu soha uchun asosiy testlar quyidagilar:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
