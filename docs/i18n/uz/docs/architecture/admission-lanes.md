# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute turli qamrovga ega **ikkita** jarayon ichidagi yoʻlak tizimiga ega. Ular
bir-birini toʻldiradi; operatorlar qaysi birini kuzatayotganini bilishi kerak.

## 1. Bayt darajasidagi, butun jarayon miqyosidagi kirishni boshqarish (`chatBodyAdmission.ts`)

- **Qamrov:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses` va chat shaklidagi boshqa yoʻnalishlar uchun buferlangan tana/heap yoʻli. Katta hajmdagi kodlash agenti tanalari sababli heap kuchayishidan himoya qiladi (#4380).
- **Har bir kalit uchun alohida yoʻlaklar emas, balki butun jarayon uchun yagona global boshqaruvchi (#10110).** Har bir API kaliti (xesh qilingan) yoki `anonymous` sessiya **bir xil** umumiy budjet asosida qabul qilinadi — xesh qilingan sessiya identifikatori FAQAT adolatli rejalashtirish kaliti sifatida (kutuvchilarni round-robin usulida navbatdan chiqarish uchun) ishlatiladi, hech qachon sigʻim segmenti sifatida emas. Ushbu hujjatning oldingi versiyasida mustaqil sigʻimga ega har bir kalit uchun alohida yoʻlaklar tavsiflangan edi; bu model #10110 da olib tashlandi, chunki u autentifikatsiyadan oʻtmagan soxta hisob maʼlumotlari orqali butun jarayon miqyosidagi chegarani koʻpaytirishga imkon berardi.
- **Toʻsiq (#503-fanout): qatʼiy soʻrovlar soni emas, avtomatik aniqlanadigan qabul qilish BAYT budjeti.** Eski `CHAT_MAX_HEAVY_IN_FLIGHT` soʻrovlar soni cheklovi (bu tuzatishdan oldin standart qiymat `1`) kodlash agentlarining fan-out jarayonini (bir nechta subagent/CLI, tana hajmi odatda > 256 KB) amaldagi ~1 parallellikkacha tushirib yuborar, natijada mutlaqo odatiy yuklama ostida 503 xatolari yuz berardi. Endi u faqat operator `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ni aniq belgilaganida amal qiladi. Belgilanmagan holda, kirish `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` orqali boshqariladi — bu jarayonning haqiqiy xotira chegarasidan avtomatik aniqlanadigan budjetdir (`src/shared/middleware/admissionBudget.ts`): V8 heap chegarasi va har qanday cgroup/konteyner chegarasidan kichigining 25%i olinib, 8x vaqtinchalik kuchaytirish koeffitsiyentiga boʻlinadi va 8 MiB bilan 2 GiB oraligʻida cheklanadi. Aniq berilgan qiymatlar ham shu cheklovlardan foydalanadi. Bu hech qanday muhit sozlamalarisiz 512 MB konteynerdan 32 GB ish stoligacha oʻzini avtomatik moslashtiradi. Samarali budjetga sigʻmaydigan tana darhol `413 body_exceeds_budget` xatosi bilan rad etiladi; faqat har biri alohida xizmat koʻrsatish mumkin boʻlgan tanalar oʻrtasidagi raqobat cheklangan adolatli navbatga tushadi. Bir nechta real vaqt signallariga asoslangan resurs bosimi kuzatuvchisi (V8 heap nisbati, cgroup, PSI, OOM hodisalari — `open-sse/utils/resourcePressurePolicy.ts`) `high` bosim ostida cheklangan kutish muddatini qisqartiradi va `critical` bosim ostida, hatto birorta bayt qabul qilinishidan oldin, darhol `503 resource_pressure` bilan yukni tashlaydi. Mavjud boʻlsa, PSI ushbu birlikning cgroup `memory.pressure` faylidan oʻqiladi (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` butun xost miqyosida ishlaydi va faqat bare metal / cgroup v1 holatida zaxira variant hisoblanadi, shuning uchun swapping holatidagi xost boʻsh turgan konteynerga 503 xatosini keltirib chiqara olmaydi.
- **Sozlash:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — avtomatik aniqlanadigan bayt budjetini qayta belgilash
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — eski soʻrovlar soni cheklovi, faqat ixtiyoriy ravishda yoqiladi
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 xatosidan oldingi navbat kutish vaqti (standart qiymat 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — navbatdagi baytlar uchun heap klapani (standart qiymat 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 dan beri eskirgan
    va hech qanday amal bajarmaydi (konfiguratsiya mosligi uchun qabul qilinadi, ammo eʼtiborsiz qoldiriladi)
- **Hisobotlar:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — jumladan,
  #503-fanout qoʻshimchalari: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` va `countCapEnabled`
  (standart joylashtirishda false — amalda eski soʻrovlar soni cheklovi emas, bayt budjeti cheklovchi omil ekanini tasdiqlaydi).

## 2. Moslashuvchan bajarilish vaqtidagi virtual yoʻlaklar (`open-sse/services/admission`)

- **Qamrov:** provayderga yoʻnaltirish uchun tenant kaliti boʻyicha kirishni boshqarish — navbat
  qiymati, kechikishga asoslangan limitni moslashtirish, yoʻlak navbatlari va yoʻlak
  metrikalari.
- **Faollashtirish:** **ixtiyoriy.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` boʻlmasa,
  oʻchirilgan. Busiz moslashuvchan kontroller umumiy navbat xatti-harakatini saqlab
  qoladi (#9654 dagi 1-mezon faqat operator yoʻlaklarni yoqqanidan keyin bajariladi).
- **Sozlash:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + moslashuvchan konfiguratsiya
  (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Hisobotlar:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (xom kalitlar emas, faqat
  yashirin yoʻlak IDlari) va `virtualLanes` — suratdagi “yoʻlaklar yoqilgan”
  holatining nufuzli bayrogʻi.

## 3. Fan-out tekshiruvlari — combo/fusion uchun har bir nishon boʻyicha kirishni boshqarish (#9654 Wave 2)

Combo (ustuvorlik / navbatma-navbat) va fusion bitta ota-ona soʻrovi ostida N ta model
nishoniga fan-out qiladi. #9654 Wave 2 dan boshlab, **har bir fan-out nishoni joʻnatishdan
oldin tekshiriladi**: **ota-onaning** tenant yoʻlagiga nisbatan har bir nishon uchun
tekshiruv (`PerTargetAdmissionHook`, `createPerTargetAdmissionHook` tomonidan yaratiladi)
amalga oshiriladi.

- **Qamrov:** combo, fusion va chaos engine tomonidan joʻnatiladigan har bir fan-out
  nishoni. System 1 (bayt darajasidagi) bundan taʼsirlanmaydi — u fan-out nishonlarini
  hech qachon tekshirmaydi.
- **Faollashtirish:** **system 2 bilan ixtiyoriy.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  belgilanmaganida hech qanday amal bajarilmaydi — bu rejimda ota-ona soʻrovi umumiy
  navbat ijarasini allaqachon ushlab turadi, shuning uchun tekshirish ikki marta
  hisoblashga va combo nishonlarini rad etishga olib keladi.
- **Semantika:**
  - **Mutlaqo bloklamaydi — navbatga qoʻymaydi, faqat oʻtkazib yuboradi.** `maxWaitMs 0`:
    toʻlgan yoʻlak nishonni oʻtkazib yuboradi va uning oʻrniga combo’ning zaxira
    mexanizmi (yoki fusion’ning omon qolganlar paneli) xizmat koʻrsatadi. Bu ataylab
    shunday qilingan: fan-out nishoni takroriy ishdir va uni navbatga qoʻyish yoʻlaklar
    aynan toʻxtatish uchun yaratilgan tirbandlikka yanada koʻproq yuk qoʻshadi.
    Shu sababli `defaultMaxWaitMs` faqat **ota-ona soʻroviga** qoʻllanadi; fan-out
    tekshiruvlari hech qachon kutmaydi va ularni kutishga majburlovchi **hech qanday
    sozlama ataylab mavjud emas** (muammo tarixi kutish sozlamalari #9654 oldini
    oladigan ommaviy 502/504 turidagi xatolarni keltirib chiqarganini koʻrsatadi —
    bunga faqat operator oʻtkazib yuborilgan fan-out nishonlari javob sifatiga zarar
    yetkazayotganini bildirsa, qayta murojaat qiling).
  - **Qabul qilingach boʻshatish.** Qabul qilingan tekshiruv oʻz ijarasini darhol
    boʻshatadi: bu ushlab turish emas, balki sigʻim shlyuzidir. Ota-onaning ijarasi
    fan-out’ni qoplaydi; yana N ta ijarani ushlab turish umumiy faol qiymatni sunʼiy
    ravishda oshirib, boshqa tenantlarni rad etadi. Bu rezervatsiya emas, balki
    imkon qadar bajariladigan tekshiruvdir: tekshiruv va joʻnatish oraligʻida yoʻlak
    yana toʻlishi mumkin, shu sababli kuchli raqobat sharoitida shlyuz nishon
    joʻnatilguniga qadar yana toʻlib qolgan yoʻlakka kirishga ruxsat berishi mumkin.
  - **Haqiqiy fan-out tanasi asosida baholanadi.** Tekshiruv qiymatni nishonning
    haqiqiy tanasidan — jumladan, ota-ona yoʻlidagi kabi uning `stream` bayrogʻidan
    olingan soʻrov sinfidan — kelib chiqib hisoblaydi. Shu tariqa fusion paneli
    aʼzolari (`stream: false`) ular amalda egallaydigan oqimsiz sinf boʻyicha,
    priority/RR nishonlari esa foydalanuvchi soʻragan sinf boʻyicha baholanadi.
- **Hisobotlar:** birinchi nishondan keyingi tekshiruvning oʻtkazib yuborilishi
  combo’ning har bir soʻrovga tegishli `fallbackCount` qiymatini oshiradi (mavjud
  zaxira semantikasini takrorlaydi; combo jurnallarida koʻrinadi); barcha panel
  aʼzolari oʻtkazib yuborilsa, fusion 503 qaytaradi. Hozircha suratda **umumlashtirilgan
  hisoblagich** (masalan, `virtualFanoutSkipped`) **mavjud emas** — agar operator
  yoʻlak shlyuzi fan-out nishonlarini qanchalik tez-tez oʻtkazib yuborayotganini
  aniqlay olmasligini bildirsa, bu shunday hisoblagichni qoʻshish uchun asos boʻladi.

## Boshqaruv panelida qaysi biri ko‘rsatiladi

- `adaptiveAdmission.laneCount` / `laneTenants` → **moslashuvchan virtual yo‘laklar** (2-tizim).
- `adaptiveAdmission.virtualLanes === true` → 3-bo‘limdagi fan-out tekshiruvlari ham
  faol. `virtualLanes` mavjud bo‘lmagan yoki `false` bo‘lgan payload
  `OMNIROUTE_CHAT_VIRTUAL_LANES` o‘rnatilmaganini anglatadi — bayt darajasidagi yo‘laklar (1-tizim)
  hali ham faol, ammo u yoqilmaguncha `adaptiveAdmission` doirasidagi hech narsa
  (va hech qanday fan-out cheklovi) kuchga kirmaydi.

## Nima uchun ikkalasi ham mavjud

Bayt darajasidagi yo‘laklar ko‘p xotira talab qiladigan tahlil qilish/siqish yo‘lini cheklaydi;
moslashuvchan yo‘laklar esa har bir tenant uchun jo‘natish xarajatini cheklaydi. #9654 dagi
1-mezon («bitta sessiyadagi keskin yuklama boshqasiga 503 qaytarmaydi») 1-tizim tomonidan
so‘zsiz, 2-tizim tomonidan esa ixtiyoriy yoqish faollashtirilgach ta’minlanadi.

## 4. Bitta jarayondagi uzoq `/v1/responses` (sog‘lom zaxira)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) heap
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` dan past bo‘lganda tuzilma jihatidan og‘ir
ikkinchi so‘rovni qabul qilish uchun `tryAcquireHealthyHeadroom` funksiyasini qo‘shdi.
`admitChatRequest` ishlatadigan BYTE yo‘li (`OMNIROUTE_CHAT_LARGE_BODY_BYTES` dan
katta yoki unga teng body’lar, standart qiymati 256 KiB, jumladan `POST /v1/responses`)
**xuddi shu** istisnodan foydalanadi.

Bu ikkitadan ortiq parallel uzoq SSE `/v1/responses` uchun qo‘llab-quvvatlanadigan
**bitta jarayonli** usuldir: asosiy limit va sog‘lom zaxirani faqat heap hamda
butun jarayon bo‘yicha bajarilayotgan so‘rovlar baytlari budjeti
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) imkon beradigan darajagacha oshiring.
O‘nlab uzoq SSE mijozlari (40–50 ta) — bu qat’iy «maksimal 2 ta» mahsulot cheklovi
emas, balki xotira budjeti masalasidir. Bosim ostidagi heap hali ham qayta urinish
mumkin bo‘lgan `503` bilan so‘rovlarni rad etadi, shuning uchun #7849 qaytib kelmaydi.

Heap’lar sonini **ko‘paytirish** uchun N ta mustaqil `DATA_DIR` bilan ishga tushiring
(#11024). Bitta SQLite faylida hech qachon `replicas > 1` ishlatmang (#10350).
Ushbu bo‘lim DATA_DIR orqali masshtablash usulini qayta ko‘rib chiqmaydi.
