# Log export (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute chaqiruv jurnallarini tashqi tahlil omboriga uzluksiz, bosqichma-bosqich eksport qilish.

Logs boshqaruv paneli ichki oynasi soʻrovlar tarixini SQLite (`call_logs`) bazasida saqlaydi; uning hajmi
rotatsiya va saqlash muddati bilan cheklangan. Jurnallarni eksport qilish ayni yozuvlar toʻplamini jadval
asosida tashqi manzilga yuboradi, shunda ular mahalliy maʼlumotlar bazasidan uzoqroq saqlanishi va boshqa
maʼlumotlar bilan birlashtirilishi mumkin. BigQuery — birinchi manzil; konveyer reyestr sifatida qurilgan,
shu sababli boshqa manzillarni qoʻshish mumkin.

---

## 1. Ishlash tartibi

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ichki oynasidagi maydonlar toʻplami)
      → manzil client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Jadval** — `log_export` nomli bitta `JobRegistry` cron vazifasi; standart qiymati `0 * * * *` (har soatda,
  UTC). `src/lib/initCloudSync.ts` faylida roʻyxatdan oʻtkaziladi; `OMNIROUTE_LOG_EXPORT_CRON` orqali
  o‘zgartirilishi mumkin. Har bir ishga tushishda barcha **yoqilgan** manzillar ketma-ket boʻshatiladi.
- **Kursor** — SQLite tizimidagi yashirin `call_logs.rowid`; har bir manzil uchun
  `log_export_destinations.cursor_row_id` maydonida saqlanadi. `timestamp` ataylab kursor sifatida
  ishlatilmaydi: chaqiruvchilar oʻz qiymatini taqdim etishi mumkin, shuning uchun sekin soʻrov undan
  keyin boshlangan tezroq soʻrovdan keyin yozilishi mumkin va vaqt tamgʻasi kursori uni oʻtkazib
  yuborgan boʻlardi.
- **Paketlash** — har bir soʻrov uchun `batch_size` qator (standart qiymati 500), har bir ishga tushirish
  uchun `max_rows_per_run` qator (standart qiymati 10000); shu tariqa katta navbat bitta ishga
  tushirishni bloklash oʻrniga bir nechta ishga tushirish davomida boʻshatiladi.
- **Yetkazib berish** — kursor faqat `send()` muvaffaqiyatli yakunlangandan keyin oldinga siljiydi.
  Muvaffaqiyatsiz paket kursorni joyida qoldiradi, shuning uchun ayni qatorlar keyingi ishga tushirishda
  qayta yuboriladi. Kafolat haqiqiy faqat bir marta yetkazib berish emas, balki kamida bir marta yetkazib
  berish va manzil tomonida takroriy yozuvlarni olib tashlashdan iborat: BigQuery har bir qatorni chaqiruv
  jurnali identifikatori boʻyicha kalitlaydi va bunga oʻzining takrorlarni aniqlash oynasi ichida imkon
  qadar amal qiladi.
- **Ustma-ust ishlashdan himoya** — cron ishga tushishi va `POST .../run` bir vaqtda sodir boʻlishi mumkin.
  Allaqachon boʻshatilayotgan manzil ikkinchi marta boʻshatilish oʻrniga oʻtkazib yuboriladi (ishga tushirish
  natijasida `skipped: true`), shuning uchun parallel ishga tushirish paketni qayta yubora olmaydi yoki
  kursorni orqaga yoza olmaydi.
- **Tozalashdan keyingi tiklanish** — agar `cursor_row_id` qiymati `MAX(rowid)` dan yuqori boʻlib qolsa
  (butun jadval tozalangan va qator identifikatorlari qaytadan boshlangan boʻlsa), tizim butunlay
  maʼlumotlarni koʻrmay qolmasligi uchun bajaruvchi kursorni 0 ga qaytaradi.

### Foydali yuklar (promptlar va javoblar)

Standart holatda eksport faqat Logs **roʻyxatida** koʻrsatiladigan umumiy maydonlarni oʻz ichiga oladi.
**Promptlar va javoblarni eksport qilish** (`includeBodies`) yoqilganda, har bir chaqiruv uchun Logs
**tafsilotlar** panelida koʻrsatiladigan maʼlumotlar ham yuboriladi:

| Maydon                           | Undagi maʼlumot                                                       |
| -------------------------------- | --------------------------------------------------------------------- |
| `request_body` / `response_body` | Chaqiruv foydali yuklari, boshqaruv panelida koʻrsatilganidek         |
| `pipeline_route_decision`        | Router tanlagan nishon va model                                       |
| `pipeline_client_request`        | Mijoz yuborgan aynan xom soʻrov                                       |
| `pipeline_openai_request`        | Ichki OpenAI shakliga oʻgirilgandan keyingi holat                     |
| `pipeline_provider_request`      | Provayder lahjasida yuqori oqimga amalda yuborilgan holat             |
| `pipeline_provider_response`     | Xom yuqori oqim javobi                                                |
| `pipeline_client_response`       | Chaqiruvchiga qaytarilgan maʼlumot                                    |
| `pipeline_error`                 | Muvaffaqiyatsiz chaqiruv uchun konveyer darajasidagi xato tafsiloti   |
| `bodies_truncated`               | Yuqoridagi maydonlardan biri `maxBodyBytes` chegarasiga yetganda True |

Bu prompt mazmuni boʻlgani sababli u standart holatda **oʻchirilgan** va ataylab har bir manzil uchun
alohida tanlanadi. Yuboriladigan maʼlumot boshqaruv panelida koʻrsatiladigan maʼlumot bilan bir xil,
chunki har ikkisi ham `getCallLogById` orqali oʻqiladi: foydali yuklar yozilish vaqtidayoq PII
maʼlumotlaridan tozalangan va maxfiy qiymatlar yashirilgan boʻladi, `noLog` API kaliti bilan amalga
oshirilgan chaqiruv esa hech qanday foydali yukni saqlamaydi, shuning uchun eksport qilinadigan hech
narsa boʻlmaydi.

Foydali yuklar har bir qator uchun fayl tizimidagi artefaktdan oʻqiladi, shuning uchun toʻliq
maʼlumotlarni yuklash faqat buni soʻragan manzillar uchun bajariladi. Artefakti yoʻq yoki buzilgan
qator paketni muvaffaqiyatsiz qilib, kursorni toʻxtatib qoʻyish oʻrniga, null foydali yuklar bilan
umumiy maʼlumotlarini eksport qiladi.

`maxBodyBytes` (standart qiymati 262144) har bir maydon hajmini cheklaydi. Uzunroq foydali yuklar
**tashlab yuborilmaydi, balki qisqartiriladi** — kesilgan prompt ham “nima soʻralgan edi” degan savolga
javob beradi — va qator `bodies_truncated` bilan belgilanadi. Oqimda qismlarga boʻlib yuborilgan deltalar
eksport qilinmaydi; yigʻilgan javob allaqachon `pipeline_provider_response` va
`pipeline_client_response` ichida mavjud.

---

## 2. Fayllar

| Qism                             | Joylashuv                                    |
| -------------------------------- | -------------------------------------------- |
| Manzil kontrakti                 | `src/lib/logExport/types.ts`                 |
| Reyestr                          | `src/lib/logExport/registry.ts`              |
| Sirlarni boshqarish              | `src/lib/logExport/secrets.ts`               |
| Ishga tushiruvchi (kursor sikli) | `src/lib/logExport/runner.ts`                |
| API proyeksiyasi                 | `src/lib/logExport/presenter.ts`             |
| BigQuery manzili                 | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA autentifikatsiyasi     | `src/lib/logExport/googleServiceAccount.ts`  |
| Chaqiruv jurnali manbasi         | `src/lib/usage/callLogExportSource.ts`       |
| Doimiy saqlash                   | `src/lib/db/logExportDestinations.ts`        |
| Cron vazifasi                    | `src/lib/jobs/logExportJob.ts`               |
| REST qatlami                     | `src/app/api/log-export/`                    |
| Boshqaruv paneli sahifasi        | `src/app/(dashboard)/dashboard/log-export/`  |

Sxema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Barcha marshrutlar boshqaruv autentifikatsiyasidan o‘tadi (`requireManagementAuth`). Sirlar hech qachon qaytarilmaydi:
saqlangan sir literal `__stored__` ko‘rinishida qaytariladi va yangilash vaqtida shu qiymatni qayta yuborish
saqlangan hisob ma’lumotlarini o‘zgarishsiz qoldiradi.

Turi sir mavjudligini e’lon qiladigan manzilni yaratish yoki yangilash uchun **`STORAGE_ENCRYPTION_KEY`
talab qilinadi**. Usiz `encrypt()` hech qanday o‘zgartirishsiz uzatadi, shuning uchun hisob ma’lumotlarini
SQLite’ga ochiq matn ko‘rinishida yozish o‘rniga so‘rov 400 xatosi bilan rad etiladi (Telegram webhook’i
qo‘llaydigan himoya bilan bir xil).

| Metod    | Yo‘l                                     | Maqsad                                                                  |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Manzil turlari va ularning konfiguratsiya maydonlari ro‘yxati           |
| `GET`    | `/api/log-export/destinations`           | Manzillar ro‘yxati (sirlar yashirilgan)                                 |
| `POST`   | `/api/log-export/destinations`           | Manzil yaratish                                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | Bitta manzilni o‘qish                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | Nom / yoqilganlik / konfiguratsiya / paketlashni yangilash              |
| `DELETE` | `/api/log-export/destinations/{id}`      | O‘chirish                                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | Hisob ma’lumotlarini tekshirish, hech narsa yozmaslik                   |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Darhol bo‘shatish, rejalashtirilgan ishga tushirish bilan bir xil yo‘l  |
| `GET`    | `/api/log-export/status`                 | Cron holati, so‘nggi ishga tushirishlar, har bir maqsad bo‘yicha navbat |

`GET /api/log-export/types` UI’ni universal qiladi: boshqaruv panelidagi shakl
qaytarilgan maydon deskriptorlari asosida chiziladi, shuning uchun yangi manzil UI’da hech qanday o‘zgarishni talab qilmaydi.

---

## 4. BigQuery manzili

Konfiguratsiya kalitlari (`type: "bigquery"`):

| Kalit                | Izohlar                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `projectId`          | Dataset joylashgan GCP loyihasi                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                             |
| `location`           | Faqat dataset yaratilishi kerak bo‘lganda ishlatiladi (standart `EU`)       |
| `serviceAccountJson` | Xizmat hisobi kaliti. Sir: saqlashda shifrlanadi, hech qachon qaytarilmaydi |
| `autoCreate`         | Birinchi eksportda dataset va jadvalni yaratish (standart `true`)           |

Xizmat hisobiga maqsad jadvalda `bigquery.tables.updateData`, shuningdek `autoCreate` yoqilganida
`bigquery.datasets.create` / `bigquery.tables.create` ruxsatlari kerak.

Sozlangan paket HTTP birligi emas, **kursor** birligidir: `send()` uni ko‘pi bilan 500 qatordan iborat
insertAll chaqiruvlariga bo‘ladi, shu sababli katta `batch_size` BigQuery’ning 10 MB so‘rov cheklovini buzmaydi.
Vaqtinchalik holatlar (408/429/500/502/503/504) bir xil insertIds’dan foydalangan holda eksponensial
kechikish bilan uch martagacha qayta uriniladi; autentifikatsiya va sxema xatolari esa ishga tushirishni
behuda davom ettirmaslik uchun birinchi urinishdayoq istisno chiqaradi.

Bir necha lahza oldin yaratilgan jadval oqimli uzatish endpoint’iga hali ko‘rinmaydi va u bir necha soniya
davomida 404 javobini qaytaradi. Bu 404 qayta uriniladi, ammo **faqat jadval shu ishga tushirish vaqtida yaratilgan bo‘lsa** —
haqiqatan mavjud bo‘lmagan jadval uchun jarayon darhol xato bilan tugaydi. Yaqinda o‘chirilgan jadvalni ayni nom ostida
qayta yaratish BigQuery’ning bir necha daqiqa davomida oqimli kiritishlarni rad etishiga olib kelishini unutmang;
bu o‘chirish va qayta yaratish xususiyati, shuning uchun jadvalni o‘chirib, qayta qo‘shish o‘rniga yangi jadval
nomidan foydalaning.

**Qisman muvaffaqiyatsizlik bo‘sh bo‘lmagan `insertErrors[]` bilan HTTP 200 ko‘rinishida keladi.** Bu xato sifatida
qabul qilinadi va istisno chiqaradi; aynan shu holat kursorning BigQuery qabul qilmagan qatorlardan o‘tib ketishini
to‘xtatadi; `tests/unit/log-export-bigquery.test.ts` ushbu xatti-harakatni mustahkamlaydi.

Transport oddiy REST orqali amalga oshiriladi — o‘z-o‘zidan imzolangan RS256 tasdiqnomasi
`https://oauth2.googleapis.com/token` manzilida kirish tokeniga almashtiriladi, so‘ng qatorlar `tabledata.insertAll`’ga
yuboriladi. Hech qanday Google SDK qo‘shilmaydi. Kirish tokenlari har bir (xizmat hisobi, qamrov) juftligi uchun
jarayon ichida keshlanadi.

Yaratilgan jadval Logs sahifasidagi har bir maydon uchun bittadan ustun hamda `exported_at` ustunini o‘z ichiga oladi
va chaqiruv jurnallarining amalda qanday so‘ralishiga mos ravishda tuziladi:

- **`timestamp` bo‘yicha kunlik bo‘limlarga ajratilgan**, shuning uchun sana bilan chegaralangan so‘rov faqat o‘sha kunlarni skanerlaydi.
- **`api_key_name`, `provider`, `model`, `status` bo‘yicha klasterlangan** (shu tartibda), shuning uchun
  kim ishga tushirgani, qayerga yuborilgani yoki muvaffaqiyatsiz tugaganiga ko‘ra filtrlash har bir bo‘lim ichidagi
  bloklarni qisqartiradi. BigQuery ko‘pi bilan to‘rtta klasterlash ustuniga ruxsat beradi va tartib muhim:
  faqat `api_key_name` bo‘yicha filtr bloklarni qisqartiradi, faqat `status` bo‘yicha filtr esa qisqartirmaydi.
- **`partitionExpirationDays` orqali ixtiyoriy bo‘limlarni saqlash muddati** (`0` hammasini saqlaydi), jadval
  yaratilganda qo‘llanadi.

Har ikkala sozlama ham yaratish vaqtida qoʻllanadi. Mavjud jadval oʻzining joriy tuzilishini saqlab qoladi, shu sababli
ularni qoʻllamoqchi boʻlsangiz, manzil sifatida yangi jadval identifikatorini koʻrsating.

`tests/unit/log-export-bigquery.test.ts` mapper va jadval sxemasi doimo bir-biriga mos boʻlishini tekshiradi,
shuning uchun yangi chaqiruv jurnali ustuni eksport paytida sezdirmasdan tashlab yuborilmaydi.

Paketlar **ham** qatorlar soni, **ham** serializatsiya qilingan baytlar boʻyicha qismlarga ajratiladi. Foydali yuklar eksport
qilinganda faqat qatorlar sonining oʻzi yetarli emas: soʻrov matnlarini oʻz ichiga olgan 500 qator oʻnlab megabayt boʻlishi mumkin va insertAll
10 MB dan katta soʻrovni rad etadi. Qismlar 500 qatorga yoki 9 MB ga yetganda — qaysi biri avval sodir boʻlsa — yopiladi.

---

## 5. Manzil qoʻshish

1. `LogExportDestinationType` ni eksport qiladigan `src/lib/logExport/destinations/<name>.ts` faylini yarating:
   UI uchun Zod `configSchema`, `fields` deskriptorlari massivi, `secretFields` va
   `test()` / `prepare()` / `send(records)` ni qaytaradigan `createClient(config)`.
2. Uni `src/lib/logExport/registry.ts` faylidagi `DESTINATIONS` massiviga qoʻshing.
3. `tests/unit/` ichida testlar yozing.

Oʻzgartirishning barchasi shundan iborat: doimiy saqlash qatlami, cron vazifasi, REST qatlami, maxfiy maʼlumotlarni shifrlash va
boshqaruv paneli shakli — barchasi registrdan maʼlumot oladi.

Yangi manzil uchun ikkita qoida:

- Qisman xatolik yuz berganda `send()` **xatolik chiqarishi shart**. Muvaffaqiyatli yakunlanish “ushbu manzilda bu qatorlar mavjud” degan maʼnoni anglatadi
  va kursor ulardan doimiy ravishda oʻtib ketadi.
- Foydalanuvchi taqdim etgan URL manzilini qabul qiladigan manzil soʻrov yuborishdan oldin uni,
  xuddi vebhuklar kabi, `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) orqali tekshirishi shart.
  BigQuery uchun bu talab qilinmaydi: uning hostlari oʻzgarmas.

---

## 6. Uni boshqarish

- **Boshqaruv paneli**: Integratsiyalar → Jurnal eksporti. Manzil qoʻshing, qatorlarni yozmasdan hisob maʼlumotlarini tekshirish uchun **Sinov**ni ishga tushiring, soʻng uni yoqing.
- **Navbat**: har bir manzil kartasi kutilayotgan qatorlar va kursorni koʻrsatadi; `GET
/api/log-export/status` ayni koʻrsatkichlar bilan birga oxirgi 20 ta vazifa ishga tushirilishini qaytaradi.
- **Bitta manzilning xatoligi boshqalariga taʼsir qilmaydi** — ishga tushirish xulosasi har bir manzil holatini
  `last_status` / `last_error` da qayd etadi, vazifani ishga tushirish tarixi esa umumiy natijani saqlaydi.
- **Manzilni oʻchirish uning kursorini ham oʻchiradi.** Uni qayta qoʻshish eng eski saqlanib qolgan
  chaqiruv jurnalidan boshlanadi va manzilda allaqachon mavjud boʻlishi mumkin boʻlgan qatorlarni qayta yuboradi. BigQueryʼda har bir qator uchun
  `insertId` buni faqat BigQueryʼning oʻz deduplikatsiya oynasi ichida bartaraf etadi, shuning uchun manzilni oʻchirishdan
  koʻra uni oʻchirib qoʻyish afzal.
