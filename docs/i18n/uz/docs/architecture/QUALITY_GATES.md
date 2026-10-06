# Quality Gates Reference (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ushbu hujjat OmniRouteʼdagi barcha CI sifat darvozalari uchun nufuzli maʼlumotnoma hisoblanadi.
Unda har bir darvoza, u nimalarni tekshirishi, qaysi CI topshirigʻida ishlashi, ratchet bazaviy
darajasidan yoki oʻtdi/oʻtmadi siyosatidan foydalanishi hamda tuzilishni bloklashi yoki tavsiyaviy
ekanligi bayon qilingan.

Qisqa xulosa va ruxsat etilganlar roʻyxati siyosati uchun `AGENTS.md` faylidagi
"Quality Gates & Ratchets" boʻlimiga qarang. Xuddi shu tizimning tanqidiy bahosi, yetuklik tasnifi
va vositalarga bogʻliq boʻlmagan takrorlash rejasi uchun
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md) hujjatiga qarang.

---

## Nazoratlar inventari va bajarish profillari

### Nomzodni qabul qilish

CI va Quality Gates ish jarayonlarining har biri barqaror hukm chiqaradi: `Gate / CI` va
`Gate / Quality`. Ularning versiyalangan qabul qilish siyosati har bir yuqori oqimdagi vazifani
majburiy yoki tavsiyaviy sifatida belgilaydi. Qoʻllanadigan majburiy vazifa muvaffaqiyatli
bajarilishi shart: mavjud boʻlmagan, bekor qilingan, oʻtkazib yuborilgan, kutilayotgan va nomaʼlum
natijalar PASS holatini tasdiqlay olmaydi. Faqat hujjatlarga yoki faqat katalogga tegishli haqiqiy
tasnif kod yoʻnalishini qoʻllanmaydigan qilishi mumkin; qoralama PR qabul qilinadigan nomzod emas.
`hotfix` yorligʻi dalil taqdim etish talabini bekor qilmaydi.

Har ikkala ish jarayoni PRlarni va main/release shoxlariga pushlarni, qoʻlda ishga tushirishni hamda
merge-group hodisalarini qamrab oladi. Push, qoʻlda ishga tushirish va merge-group toʻliq tanlovni
bajaradi. Forklar va merge-grouplar odatda self-hosted runnerlarni tanlaydigan vazifalar uchun
hosted runnerlardan foydalanadi; joriy etishdan oldin yetarli hosted sigʻimi tekshirilishi kerak.

Har bir JSON tasdiq yozuvi checkout qilingan SHA, ish jarayoni bajarilishi va urinishni aniqlaydi.
CLI checkout/event SHA nomuvofiqligini rad etadi. Ish jarayoni testlari siyosat aʼzoligini hukm
vazifasining `needs` roʻyxatiga bogʻlaydi, shunda yangi yoki olib tashlangan yoʻnalish sezdirmasdan
yoʻqolib qolmaydi. Tasdiq yozuvlari nashr qilish, joylashtirish yoki mavjud tavsiyaviy skanerning
ichki ishlashini emas, oʻz ish jarayonini qamrab oladi. Shox qoidalarida har ikkala tekshiruv nomini
faollashtirish alohida maʼmuriy oʻzgarishdir; bu vazifalarni qoʻshishning oʻzi shoxni himoyalamaydi.

### Statik skanerlash inventari

Versiyalangan npm aliaslari inventari va statik skanerlash aʼzoligi
`config/quality/gate-manifest.json` faylida joylashgan. Skript nomlari va aniq buyruqlarni
`package.json` bilan solishtirib tekshirish uchun `npm run check:gate-manifest` buyrugʻini bajaring;
qoʻshishlar, olib tashlashlar va buyruqlardagi ogʻishlar ham mahalliy hook, ham CI dagi
oʻzgarishlarni tasniflash vazifalarini muvaffaqiyatsiz qiladi. Alias ish jarayoni vazifasi, matritsa
nusxasi yoki test holati emas: bu miqdorlarni oʻzaro teng deb koʻrsatmaslik kerak.

Tanlangan aliaslarni bajarmasdan koʻrib chiqish uchun `npm run quality:scan -- --list` yoki
`npm run quality:scan:fast -- --list` buyrugʻidan foydalaning. Runner npm kirish nuqtasini
ishga tushiradi, shuning uchun uning bajarilish muhiti (jumladan, sozlangan joylarda Bun) saqlanadi.
Manifest ushbu profillardan tashqaridagi aliaslarni alohida ishga tushiriladigan sifatida qayd etadi
va faqat oʻqish uchun moʻljallangan skanerlash profillarida texnik xizmat buyruqlari taqiqlanadi.

Bu profillar faqat statik skanerlashni qamrab oladi. Ular mahsulot testlari, qamrov, paketlash,
tashqi tekshiruvlar yoki nomzodning relizga toʻliq qabul qilinishini tasdiqlamaydi. Ish jarayoniga
qabul qilish bogʻlangan `config/quality/admission-policy.json` va
`scripts/quality/admission-verdict.mjs` fayllaridan foydalanadi. Release-observer profillari alohida
qoladi; ularning qoʻllanadigan tekshiruvlari va tasdiq yozuvlarini mustaqil ravishda koʻrib chiqing.
Quyidagi matnli inventar maʼlumotnoma boʻlib, nazoratning amalda bajarilganiga dalil emas.

Skriptlar `scripts/check/` (siyosat nazoratlari) va `scripts/quality/` (ratchet mexanizmi) ostida
joylashgan. CI uchun asosiy haqiqat manbasi `.github/workflows/ci.yml` hisoblanadi.

### Reliz PR uchun tezkor yoʻl (`quality.yml`)

`.github/workflows/quality.yml` main/release PRlarida, himoyalangan shoxlarga pushlarda, qoʻlda
ishga tushirishda va merge-grouplarda CI imkoniyatlarini toʻldiradi. PRlar yoʻl boʻyicha
filtrlangan tezkor tekshiruvlardan foydalanadi. Doimiy ravishda oʻchirib qoʻyilgan takroriy build
olib tashlandi; haqiqiy build/package/boot tekshiruvlari CI da saqlanib qolgan.

| Vazifa                                           | Qamrov                                                                                                                                                                                                                           | Bloklovchi      |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | Hujjatlar/kod PRlari; API hujjatlari havolalari va barcha hujjatlar                                                                                                                                                              | Ha              |
| `Fast Quality Gates`                             | Kod PRlari; statik tekshiruvlar, typecheck, dashboard typecheck, taʼsirlangan unit testlar                                                                                                                                       | Ha              |
| `Forgotten sibling tests`                        | Kod PRlari; oʻzgartirilgan modullar statik isteʼmolchilar va nomzod sibling testlargacha kuzatiladi; barrel va dynamic-import yoʻllari allowlistdagi istisnolarga havolalar bilan tavsiyaviy diagnostika sifatida xabar qilinadi | **Tavsiyaviy**  |
| `Vitest (fast-path)`                             | Kod PRlari; tezkor vitest toʻplami                                                                                                                                                                                               | Ha              |
| `Unit Tests fast-path`                           | Kod PRlari; 4-shardli unit testlar toʻplami                                                                                                                                                                                      | Ha              |
| `No new ESLint warnings`                         | Kod PRlari; suppressions-aware lint nazorati                                                                                                                                                                                     | Ha, forklar ham |
| `Merge integrity (changelog + generated skills)` | Qoralama boʻlmagan PRlar; changelog va yaratilgan skilllar sinxronligi                                                                                                                                                           | Ha, forklar ham |

#### Unutilgan sibling testlar hisoboti

`npm run check:forgotten-sibling-tests` test taʼsiri xaritasi ortidagi import resolverdan qayta
foydalanadi. Har bir oʻzgartirilgan production moduli uchun, agar nomzod test pull-request diffida
boʻlmasa, u deterministik
`oʻzgartirilgan modul/simvol -> statik isteʼmolchi -> nomzod sibling test` zanjirlarini xabar qiladi.
Markdown xulosasi va JSON natijasi bloklovchi rejimni joriy etishdan oldin kalibrlash uchun
`forgotten-sibling-tests` ish jarayoni artefakti sifatida saqlanadi.

Barrel qayta eksportlari va dinamik importlar faqat aniqlik diagnostikasi hisoblanadi; ular hech qachon
bloklovchi topilma yaratmaydi. Koʻrib chiqilgan istisnolar
`config/quality/forgotten-sibling-allowlist.json` faylida saqlanadi. Har bir yozuv isteʼmolchi va nomzod
testni koʻrsatishi, aniq asos keltirishi hamda GitHub muammosi yoki pull request’iga havola berishi kerak. Notoʻgʻri tuzilgan yozuvlar
yopiq holatda xatoga uchraydi. Istisnolar oʻchirilgan nomzod testni yoki `.skip`/`.todo` qoʻshadigan diff’ni yashira olmaydi;
assertion’larni zaiflashtirish va boshqa niqoblash usullari mustaqil ravishda bloklovchi
`check:test-masking` nazoratiga tegishli boʻlib qoladi.

### Vazifa: `lint`

`main` uchun har bir PR’da ishga tushadi. Xatolik yuz bersa, birlashtirishni bloklaydi.

| Skript (`npm run ...`)            | Tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bloklovchi                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versiyasi qoʻllab-quvvatlanadigan diapazonda ekanini                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                         |
| `check:cycles`                    | Siklik importlar — barcha `src/` + `open-sse/` modullari                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:route-validation:t06`      | Zod sxemalari barcha route’larda mavjudligini (Tier 6 siyosati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` soni belgilangan limitdan oshmasligini (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `check:provider-consistency`      | `providers.ts` ichidagi har bir provayder `providerRegistry.ts` ichida mos yozuvga ega (va aksincha, ruxsat berilganlar roʻyxati doirasida)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:model-lifecycle`           | Qoʻlda yuritiladigan uchta marshrutlash jadvali repozitoriyga kiritilgan hayot sikli surati (#11503) bilan muvofiq qoladi: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` marshrutlay oladigan, foydalanishdan chiqarilgan hech bir id uchun ball bermaydi; har bir `BUILT_IN_ALIASES` maqsadi `REGISTRY` ichida mavjud va foydalanishdan chiqarilgan id lar suratida yoʻq; `REGISTRY` ichida hamon mavjud boʻlgan har bir foydalanishdan chiqarilgan id boshqa joyga yoʻnaltiriladi yoki `allowedRetiredInCatalog` ichida keltiriladi; shuningdek, `DEFAULT_DEGRADATION_MAP` dagi hech bir manba yoki maqsad ushbu suratda foydalanishdan chiqarilgan deb koʻrsatilmagan. Bu modelga ayni paytda faol yuqori oqim xizmati tomonidan xizmat koʻrsatilayotganini isbotlamaydi. Oflayn — `config/quality/model-lifecycle.json` bilan taqqoslaydi; u `npm run quality:refresh-model-lifecycle` yordamida qoʻlda yangilanadi (tarmoq talab etiladi; CI tizimiga ulanmagan). `allowedRetiredInCatalog` — bosqichma-bosqich qisqartirish mexanizmi: yozuvni faqat kuzatuv masalasi bilan birga qoʻshing. | Ha                                         |
| `check:fetch-targets`             | Mijoz tomonidagi `src/` ichidagi har bir `fetch("/api/...")` haqiqiy `route.ts` fayliga yechiladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `check:deps`                      | Repozitoriydagi har bir `package.json` boʻylab `npm install` orqali oʻrnatiladigan barcha bogʻliqliklar `dependency-allowlist.json` ichida mavjud; versiyasi mahkamlanmagan yoki slopsquattingga uchragan yangi paketlar belgilab qoʻyiladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `audit:deps`                      | `npm audit` (ildiz + electron) — yuqori/kritik darajadagi tavsiyalar yoʻq (osv `check:vuln-ratchet` bilan qisman takrorlanadi; Ratsionalizatsiya beklogiga qarang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `check:lockfile`                  | `package-lock.json` yaxlitligi — https reyestri, yaxlitlik xeshlari, xost almashtirishlari yoʻq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:licenses`                  | Ishlab chiqarish bogʻliqliklari uchun SPDX litsenziyalari ruxsat etilgan roʻyxati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `check:tracked-artifacts`         | Build artefaktlari / commit qilingan `node_modules` ramziy havolalari yoʻq (husky pre-commit jarayonida ham ishga tushadi; pre-push ataylab yengil — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:ai-attribution`            | PR commitlari, sarlavhasi yoki matnida AI/bot `Co-Authored-By` treyleri yoki AI tomonidan yaratilganlik futeri yoʻq — Qatʼiy qoida #16 (`quality.yml` faylidagi PR→`release/**` uchun fast-gates siklida — hodisa payloadini oʻqiydi, PRlardan tashqarida hech qanday amal bajarmaydi — hamda `ci.yml` faylidagi PR→`main` uchun lint jarayonining faqat PRga oid bosqichida; shuningdek, husky `commit-msg` hookida; inson hammualliflariga ruxsat beriladi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Har bir Vitest istisnosi kuzatuv issuesini koʻrsatadi va `config/quality/vitest-exclusions.json` faylida mavjud (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:file-size`                 | Hech bir manba fayli kengaytma boʻyicha belgilangan limitdan oshmaydi (ratchet: katta hajmli muzlatilgan fayllar `frozen` roʻyxatida)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ha                                         |
| `check:error-helper`              | Executorlar/handlerlardagi xato javoblari `buildErrorBody()` / `sanitizeErrorMessage()` dan foydalanadi (Qatʼiy qoida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                         |
| `check:migration-numbering`       | Migratsiya SQL fayllari ketma-ket raqamlangan, bo‘shliqlar yoki takrorlanishlar yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                         |
| `check:public-creds`              | `publicCreds.ts` faylidan tashqarida literal OAuth `client_id`/`client_secret` yoki Firebase Web kalitlari yo‘q (Qat’iy qoida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `check:db-rules`                  | `src/lib/db/` modullaridan tashqarida xom SQL yo‘q; `localDb.ts` faylidan barrel-importlar yo‘q (Qat’iy qoidalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                         |
| `check:known-symbols`             | Dispetcherlik jadvallarida ro‘yxatdan o‘tkazilgan provayder ijrochilari, marshrutlash strategiyalari va tarjimonlar diskdagi fayllarga mos keladi — yetim yoki e’lon qilinmagan simvollar yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                         |
| `check:route-guard-membership`    | Ichki jarayonni ishga tushiradigan har bir marshrut `isLocalOnlyPath()` tomonidan tasniflangan (Qat’iy qoidalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:test-discovery`            | Repodagi har bir `*.test.ts` / `*.spec.ts` fayli kamida bitta test ishga tushirgichi tomonidan aniqlanadi (xrapovik: `test-discovery-baseline.json` ichidagi yetimlar ro‘yxati faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                         |
| `check:agent-skills-sync`         | Yaratilgan agent-skills artefaktlari ularning manba katalogiga mos keladi (tafovut yoʻq)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Provayder logotiplari/aktivlari uchun qayd etilgan kelib chiqish yozuvi mavjud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON konfiguratsiya fayllari tahlildan muvaffaqiyatli oʻtadi va repo lint qoidalariga javob beradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | TypeScript xatolarsiz kompilyatsiya qilinadi (faqat tavsiyaviy ogohlantirishlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ha                                         |
| `typecheck:noimplicit:core`       | Qatʼiy `noImplicitAny` — kelajakka yoʻnaltirilgan; avvaldan mavjud koʻplab chaqiruv joylari hali ham annotatsiyalarni talab qiladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Tavsiyaviy** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` doirasidagi `tsc` (#7033) — `typecheck:core`ning saralangan 27 faylli ruxsat roʻyxati hech qanday dashboard TSX faylini oʻz ichiga olmaydi, `next build` esa uni umuman tur tekshiruvidan oʻtkazmaydi (`next.config.mjs` faylida `ignoreBuildErrors: true` oʻrnatilgan), shu sababli u yerdagi yetim identifikator regressiyalari (#6625/#6909) CI uchun koʻrinmas edi. Har bir fayl/TS kodi boʻyicha muzlatilgan xatolar soni bazaviy koʻrsatkichi (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` bilan bir xil eskirganlikni nazorat qilish andozasi) bilan farqlar tekshiriladi — faqat bazaviy sondan ortiq YANGI xatolar tekshiruvdan oʻtolmaslikka sabab boʻladi; avvaldan mavjud xato tuzatilganda `--update` bilan bazaviy koʻrsatkichni pasaytiring.                                                                                                                                                                                                                                                                                | Ha                                         |

### Vazifa: `quality-gate`

`test-coverage`dan keyin ishga tushadi. Muvaffaqiyatsizlik yuz bersa, birlashtirishni bloklaydi.

| Skript                       | Tekshiradi                                                                                                                                                                                                           | Bloklovchi            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `quality:collect`            | `quality-metrics.json` faylini yaratadi (ESLint ogohlantirishlari soni, birlashtirilgan shard hisobotidan qamrov)                                                                                                    | Ha (ratchetdan oldin) |
| `quality:ratchet`            | `quality-baseline.json` faylidagi har bir metrika yomonlashmagan (ESLint ogohlantirishlari ≤ bazaviy qiymat; qamrov ≥ bazaviy qiymat)                                                                                | Ha                    |
| `check:duplication`          | Kod takrorlanishi (jscpd@4) `quality-baseline.json` faylidagi bazaviy qiymatdan oshmaydi                                                                                                                             | Ha                    |
| `check:complexity`           | Fayl darajasidagi siklomatik murakkablik chegaradan oshmaydi (asosiy ESLint `complexity` + `max-lines-per-function`)                                                                                                 | Ha                    |
| `check:cognitive-complexity` | Kognitiv murakkablik ratcheti (`eslint-plugin-sonarjs`) — alohida ESLint tekshiruvi; CI ikkalasini yagona `check:complexity-ratchets` bosqichi sifatida birlashtirib ishga tushiradi                                 | Ha                    |
| `check:dead-code`            | Ishlatilmaydigan eksportlar / fayllar ratcheti (knip) bazaviy qiymatga nisbatan yomonlashmaydi                                                                                                                       | Ha                    |
| `check:compression-budget`   | Siqish benchmarki byudjeti — har bir engine uchun token tejashning quyi chegaralari yomonlashmasligi kerak                                                                                                           | Ha                    |
| `check:type-coverage`        | Tiplashtirilganlik foizi ratcheti (`type-coverage`) yomonlashmaydi; asosan `typecheck:noimplicit:core` o‘rnini bosadi                                                                                                | Ha                    |
| `check:codeql-ratchet`       | Ochiq CodeQL ogohlantirishlari soni yomonlashmaydi (`gh api` orqali o‘qiydi; token bo‘lmasa, xatosiz o‘tkazib yuboradi) — yangilash davriyligi va qo‘lda ishga tushirish: quyidagi "CodeQL ratchet" bo‘limiga qarang | Ha                    |

### Vazifa: `quality-extended`

Butun vazifa tavsiyaviy (`continue-on-error: true`). npm asosidagi ratchetlar amalda
ishga tushadi; tashqi skanerlar `gh release download` orqali o‘rnatiladi va binar fayl
hali ham mavjud bo‘lmasa, o‘zini o‘zi o‘tkazib yuboradi (exit 0).

| Skript                   | Tekshiradi                                                                                                                                                                                                                                                                      | Bloklovchi                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Siklik bog‘liqliklar yo‘q (dpdm)                                                                                                                                                                                                                                                | **Tavsiyaviy**                                      |
| `check:bundle-size`      | Bundle hajmi chegaradan oshmaydi                                                                                                                                                                                                                                                | **Tavsiyaviy**                                      |
| `check:secrets`          | Sirlarni skanerlash (gitleaks) — binar fayl bo‘lmasa, o‘tkazib yuboradi                                                                                                                                                                                                         | **Tavsiyaviy**                                      |
| `check:vuln-ratchet`     | Bog‘liqliklardagi zaifliklar (osv-scanner) yomonlashmaydi — binar fayl bo‘lmasa, o‘tkazib yuboradi                                                                                                                                                                              | **Tavsiyaviy**                                      |
| `check:workflows`        | Workflow lintingi (actionlint + zizmor); yo‘q yoki buzilgan skanerlar, yaroqsiz hisobotlar yoxud mavjud bo‘lmagan ratchet bazaviy qiymati tekshiruvni INCOMPLETE holatida muvaffaqiyatsiz qiladi. Haqiqiy topilmalar tanlangan qat’iy/tavsiyaviy/ratchet siyosatiga amal qiladi | Bajarilishi shart; zizmor ratcheti CI’da bloklovchi |
| `check:openapi-breaking` | Ommaviy API shartnomasidagi (`openapi.yaml`) asosiy branchga nisbatan moslikni buzuvchi o‘zgarishlar (oasdiff) — `openapiBreaking=N` chiqaradi; oasdiff mavjud bo‘lmasa yoki asosiy spetsifikatsiyani aniqlab bo‘lmasa, o‘tkazib yuboradi                                       | **Tavsiyaviy**                                      |

### Vazifa: `docs-sync-strict`

`main` branchiga yuborilgan har bir PR uchun ishga tushadi. Muvaffaqiyatsizlik yuz bersa, birlashtirishni bloklaydi.

| Skript                         | Tekshiradi                                                                                                                                                                                            | Bloklovchi                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Quyidagi 6 ta quyi tekshiruvni ketma-ket ishga tushiradigan meta-tekshiruv                                                                                                                            | Ha                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiyalarining muvofiqligi                                                                                                                                             | Ha                               |
| ↳ `check:docs-counts`          | Matndagi sonlar (provayderlar soni, migratsiyalar soni va hokazo) haqiqiy sonlarning ratchet oynasi doirasida ekanini                                                                                 | Ha                               |
| ↳ `check:env-doc-sync`         | `.env.example` ichidagi har bir muhit o‘zgaruvchisi hujjatlardagi jadvalda qayd etilgani va aksincha ekanini                                                                                          | Ha                               |
| ↳ `check:deprecated-versions`  | Hujjatlarda eskirgan versiya satrlari yo‘qligini                                                                                                                                                      | Ha                               |
| ↳ `check:doc-links`            | Hujjatlardagi ichki markdown havolalari haqiqiy fayllarga olib borishini (`[text]`/`(path)` shakli)                                                                                                   | Ha                               |
| ↳ `check:fabricated-docs`      | Hujjatlarda keltirilgan marshrutlar, muhit o‘zgaruvchilari, CLI buyruqlari, hook nomlari va fayl yo‘llari kod bazasida mavjudligini. `--strict` orqali qat’iy tekshiruv; bayroqsiz — yumshoq xatolik. | Ha (CI ichida `--strict` orqali) |
| `check:cli-i18n`               | CLI buyruq satrlari barcha i18n lokal fayllarida mavjudligini                                                                                                                                         | Ha                               |
| `check:openapi-coverage`       | OpenAPI spetsifikatsiyasi haqiqiy marshrutlarning kamida ratchet orqali belgilangan minimal miqdorini qamrab olishini                                                                                 | Ha                               |
| `check:openapi-security-tiers` | `openapi.yaml` ichidagi xavfsizlik darajasi annotatsiyalari `routeGuard.ts` tasniflariga mos kelishini                                                                                                | **Tavsiyaviy**                   |
| `check:openapi-routes`         | `openapi.yaml` ichidagi har bir yo‘l haqiqiy `route.ts` fayliga mos kelishini (gallyutsinatsiyaga qarshi)                                                                                             | Ha                               |
| `check:docs-symbols`           | `docs/**/*.md` ichidagi har bir `/api/...` havolasi haqiqiy `route.ts` fayliga mos kelishini (gallyutsinatsiyaga qarshi)                                                                              | Ha                               |
| `i18n translation drift`       | i18n lokal fayllaridagi tarjima qilinmagan kalitlar — faqat ogohlantirish                                                                                                                             | **Tavsiyaviy**                   |

### Vazifa: `i18n-ui-coverage`

| Skript                            | Tekshiradi                                                                                                                                                                                                                                            | Bloklovchi     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n kalitlarining qamrovi ≥ 65% ekanini                                                                                                                                                                                                           | Ha             |
| `check-ui-value-drift` (inline)   | Qayta yozilgan inglizcha **qiymat** ortida eskirgan tarjima qolmasligini                                                                                                                                                                              | Ha             |
| `check-new-key-coverage` (inline) | **Yangi** inglizcha kalit har bir lokalda tarjima qilinganini — `__MISSING__:` belgisi qabul qilinmaydi                                                                                                                                               | Ha             |
| `check-translation-ratio`         | Har bir lokal uchun haqiqiy tarjimalar nisbati (ruxsat etilganlar ro‘yxatidan tashqaridagi inglizcha bilan bir xil / o‘rinbosar / yetishmayotgan qismlar) `config/quality/i18n-translation-baseline.json` + ruxsat etilgan og‘ishdan oshmasligi kerak | **Tavsiyaviy** |

`fetch-depth: 0` talab qilinadi — qiymatlar o‘zgarishini tekshirish jarayoni `en.json` faylini birlashtirish bazasi bilan solishtiradi.

#### `check-ui-value-drift` — eskirgan tarjimalarni tekshirish

Boshqa tekshiruvlar tuzilmaviy jihatdan aniqlay olmaydigan i18n regressiyasini aniqlaydi: inglizcha qiymat
qayta yoziladi, ammo _avvalgi_ inglizcha matndan olingan tarjimalar o‘zgarishsiz qoladi, natijada
ingliz tilidan boshqa tildagi foydalanuvchilar ishonchli ohangda yozilgan, ammo endi noto‘g‘ri bo‘lgan matnni o‘qishda davom etadi.

Bu muammo amalda relizga chiqib ketgan. Antigravity tizimiga kirish yordamchisi qo‘shilganda (#5203)
`oauthModal.googleOAuthWarning` qayta yozilgan; **43 ta lokaldan 39 tasida** operatorlarga «to‘liq
URL manzilini nusxalab, quyidagi maydonga joylashtirish» kerakligini aytuvchi matn saqlanib qolgan —
bu provayder uchun bunday jarayonni yakunlab bo‘lmaydi. Muammo #8463 gacha aniqlanmagan, chunki:

- `sync-ui-keys` faqat **mavjud bo‘lmagan** kalitlarni avtomatik to‘ldiradi, **eskirganlarini** esa hech qachon yangilamaydi;
- `check-ui-keys-coverage` kalitning _mavjudligini_ hisoblaydi, shu sababli eskirgan tarjima qamrab olingan deb baholanadi;
- `check-translation-drift` `docs/i18n/<locale>/**.md` hujjat ko‘zgularini kuzatadi —
  u `src/i18n/messages/*.json` fayllarini hech qachon o‘qimaydi. 2026-09 qayta sinxronlashidan beri `docs-sync-strict` vazifasida bloklovchi: asosiy hujjatni tahrirlang → `npm run i18n:run -- --files=<doc>` (bo‘lim darajasida, tezkor).

**Diffni hisobga oladi, bazaviy holatga tayanmaydi.** U birlashtirish bazasidagi `en.json` faylini
ishchi daraxt bilan taqqoslaydi; inglizcha qiymati oʻzgargan har bir kalit uchun hali ham
oʻzgartirilmagan tarjimani saqlayotgan har qanday lokal eskirgan hisoblanadi. Bu ataylab
**avvaldan mavjud qarzdorlikni muzlatadi** — diff uzoq vaqtdan beri mavjud tarjima qaysi eski
inglizcha matndan kelib chiqqanini aniqlay olmaydi, shuning uchun tekshiruv faqat joriy
oʻzgarish taʼsir qilgan qismlarni baholaydi. Muqobil yechim (har bir kalit uchun xesh bazaviy
holati) ~600 KB hajmdagi generatsiya qilingan faylni talab qiladi, bu mavjud eng katta bazaviy
fayldan 3× katta boʻlib, har bir i18n PRda qayta-qayta oʻzgaradi.

Undan oʻtishning ikki yoʻli bor:

1. taʼsirlangan tarjimalarni yangilash yoki
2. ularni `__MISSING__:<new english>` qiymatiga oʻrnatish — shunda bajarilish muhiti tuzatilgan
   inglizcha matnni taqdim etadi (`src/i18n/request.ts::deepMergeFallback`, #7258) va kalit
   tarjima navbatiga qoʻshiladi.

Agar satrning **maʼnosi** oʻzgargan boʻlsa, **kalit nomini oʻzgartirishni** afzal koʻring:
yangi kalit eskirgan tarjimani meros qilib ololmaydi. #8463 aynan shu andozadan foydalangan.

```bash
npm run i18n:check-value-drift          # qatʼiy (CI ishga tushiradigan variant)
npm run i18n:check-value-drift:warn     # faqat hisobot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Bazaviy katalogni oʻqib boʻlmaganda (bazaviy refsiz sayoz klon) `SKIP reason=base-unresolved`
bilan 0 kodida yakunlanadi va `check-openapi-breaking` xatti-harakatini takrorlaydi.

### Vazifa: `i18n`

Toʻliq i18n tekshiruv matritsasi (har bir lokal uchun bittadan vazifa). Butun vazifa tavsiyaviy.

| Skript                          | Tekshiradi                             | Bloklash                                                  |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Har bir lokal tarjimasining toʻliqligi | **Tavsiyaviy** (butun vazifada `continue-on-error: true`) |

### Vazifa: `pr-test-policy`

Faqat pull requestlarda ishga tushadi.

| Skript                 | Tekshiradi                                                                                                                                                      | Bloklash |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` yoki `bin/` ichidagi ishlab chiqarish kodini oʻzgartiruvchi PRlar testlarni qoʻshishi yoki yangilashi shart (Qatʼiy qoida #8)  | Ha       |
| `check:test-masking`   | Oʻzgartirilgan test fayllari tasdiqlar sof sonini kamaytirmaydi yoki `assert.ok(true)` tavtologiyalarini qoʻshmaydi                                             | Ha       |
| `check:pr-evidence`    | PR tavsifida oʻzgarish uchun test/VPS dalillari keltirilgan (PR matnini grep orqali tekshirib, Qatʼiy qoida #18ni mexanizatsiyalaydi — moʻrt, Backlogga qarang) | Ha       |

### Vazifa: `test-vitest`

`build`dan keyin ishga tushadi. Xatolik yuz bersa, birlashtirishni bloklaydi.

| Toʻplam          | Tekshiradi                                                                | Bloklash                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 ta vosita), autoCombo, kesh — vitest ishga tushiruvchisi | Ha                                                                                                                                              |
| `test:vitest:ui` | UI komponent testlari — vitest ishga tushiruvchisi                        | **Bloklaydi** — avvaldan mavjud xatoliklar `vitest.config.ts`da aniq istisno qilingan; yangi xatoliklar vazifaning bajarilmasligiga olib keladi |

### Tungi ish jarayonlari (rejalashtirilgan, tavsiyaviy)

Ular cron jadvali boʻyicha (va `workflow_dispatch` orqali) ishga tushadi, PRlarda esa hech qachon
ishga tushmaydi. Ularning barchasi tavsiyaviy.

| Ish jarayoni           | Tekshiradi                                                                                                                                                                                                       | Bloklash       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | tasodifiy seed va koʻp sonli ishga tushirishlar bilan fast-check xususiyat testlari                                                                                                                              | **Tavsiyaviy** |
| `nightly-resilience`   | heap oʻsishi nazorati, tartibsizlik asosidagi xatolik kiritish, k6 yuklama/uzoq muddatli yuklama sinovi                                                                                                          | **Tavsiyaviy** |
| `nightly-llm-security` | promptfoo inʼeksiya himoyasi (bloklash rejimi) + garak zondlari (provayder siri boʻlmasa oʻtkazib yuboriladi)                                                                                                    | **Tavsiyaviy** |
| `nightly-schemathesis` | `docs/openapi.yaml` yordamida ishlayotgan OmniRoutega qarshi OpenAPI shartnomasini fuzzing qilish (schemathesis) — spetsifikatsiya buzilishlari / qayta ishlanmagan 500 xatolarini yuzaga chiqaradi (Fase 8 B.4) | **Tavsiyaviy** |
| `nightly-mutation`     | tezkor unit yoʻnalishidagi Stryker mutatsion testlash bali — omon qolgan mutantlar zaif tasdiqlarni yuzaga chiqaradi                                                                                             | **Tavsiyaviy** |
| `nightly-compat`       | qoʻllab-quvvatlanadigan `engines.node` diapazonlari boʻylab Node mexanizmi moslik matritsasi                                                                                                                     | **Tavsiyaviy** |

---

## Tezlik bosqichi (2026-08-30 → v4.0 LTS): barcha bazaviy chegaralar 20% yumshatildi

Mas’ul shaxs qarori (2026-08-30): v4.0 modullashtirilishigacha texnik qarzdorlik chegarasini saqlashdan ko‘ra
yetkazib berish tezligi muhimroq. Barcha **raqamli** ratchet bazaviy chegaralari audit qilinadigan yagona
o‘tishda 20% ga yumshatildi va bosqich `config/quality/quality-baseline.json` faylida e’lon qilindi:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Nima o‘zgardi                                                                                                                                                                                                                                              | Qayerda                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — kichikroq qiymat yaxshiroq bo‘lgan sonlar ×1.2, kattaroq qiymat yaxshiroq bo‘lgan foizlar ÷1.2 (qamrovning quyi chegarasi 60 bo‘lib qoldi, `eslintErrors` 0 bo‘lib qoldi, `eslintWarnings` 0 → muzlatilgan bostirishlar sonining 20%i) | `quality-baseline.json` (`_relax_velocity_2026_08_30` qaydida oldingi → keyingi qiymatlarning barchasi keltirilgan) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                             |
| `cap`, `testCap`, har bir `frozen[*]` / `testFrozen[*]` qator chegarasi ×1.2                                                                                                                                                                               | `file-size-baseline.json`                                                                                           |
| har bir fayl / har bir TS kodi bo‘yicha sonlar ×1.2                                                                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`              |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                                          |
| `_policy.requireTighten === false` bo‘lganda `--require-tighten` tavsiyaviy bo‘ladi                                                                                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                                         |
| tungi `bank-ratchet-shrinks` to‘xtatiladi (aks holda u o‘lchangan qisqarishni zaxiralab, bo‘sh chegarani bekor qilgan bo‘lardi)                                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                                       |

Ruxsat ro‘yxatlari (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) budjet **emas** va ularga tegilmadi. O‘tish/o‘tmaslik siyosati darvozalari (sirlar, SQL qoidalari,
hujjatlar/muhit shartnomasi, i18n muvofiqligi, birlik testlari) o‘zgarmadi — qizil test hamon qizil testdir.

**Asboblar**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — bir martalik
  yumshatish (`scripts/quality/relax-baselines.mjs`); ayni qayd bilan ikkinchi marta ishga tushishni
  rad etadi.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  har bir raqamli darvozani CI qanday o‘lchasa, xuddi shunday o‘lchaydi va har bir darvoza uchun qolgan
  zaxirani chiqaradi (`scripts/quality/baseline-headroom.mjs`). Tungi `baseline-headroom` vazifasi
  jadvalni doimiy yangilanadigan **📈 Bazaviy chegara zaxirasi (tezlik bosqichi)** muammosiga joylaydi va
  biror darvoza o‘z yuqori chegarasining 10% ichida bo‘lsa yoki undan allaqachon oshib ketgan bo‘lsa,
  `headroom-alert` yorlig‘ini qo‘shadi. Bu muammo erta ogohlantirish vazifasini bajaradi: bir necha kunda
  to‘lib qoladigan budjet yumshatishdan butun jamoa emas, bir nechta PR foydalanayotganini anglatadi —
  muammo yuzaga keltirgan darvozaning `_rebaseline_*` qaydlarini tekshiring.

**Yangi kod rejimi (Clean-as-You-Code) — 2026-08-30 dan boshlab, faqat PR tezkor yo‘li uchun**

`pull_request` hodisalarida `quality.yml` `check:file-size`,
`check:complexity-ratchets` va `check:dead-code` buyruqlariga `--base-ref <PR base SHA>` parametrini uzatadi.
Bu rejimda darvoza HEAD holatini merge-base bilan **faqat PR o‘zgartirgan fayllar doirasida**
taqqoslaydi (`scripts/check/newCodeMode.mjs`: merge-base bir martalik `git worktree` ichida yaratiladi,
ESLint/knip u yerda hamda HEAD holatida ishga tushiriladi va har bir fayl bo‘yicha sonlarning farqi olinadi):

- **bloklovchi** — PR o‘zi o‘zgartirgan fayllarga siklomatik/kognitiv murakkablik buzilishlari yoki
  o‘lik eksportlarni qo‘shgan (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`
  jurnalda);
- **tavsiyaviy** — umumiy jami qiymatning muzlatilgan bazaviy chegara bilan taqqoslanishi. Meros bo‘lib
  qolgan og‘ish aybsiz PRni hech qachon qizil holatga keltirmaydi; og‘ish relizni muvofiqlashtirishda
  qayta muzlatiladi va zaxira vazifasi tomonidan kuzatiladi.

`workflow_dispatch` ishga tushirishlari, release-green tekshiruvi va tungi zaxira vazifasida PR bazasi
yo‘q hamda ular mutlaq (umumiy) taqqoslashni saqlab qoladi. Qamrov, takrorlanish va tiplar qamrovi hozircha
umumiyligicha qoladi (ularning asboblari har bir fayl bo‘yicha farqni arzonga hisoblab bermaydi) — ularga
ham xuddi shunday yondashuvni qo‘llash mumkin.

**v4.0 da bosqichni yopish (LTS = avvalgidan qat’iyroq, shunchaki "normal holatga qaytish" emas)**

1. Sof `release/v4.0.0` uchida: qayd uchun `npm run quality:headroom --json`, so‘ng
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, har bir typecheck nazoratining
   `--update` buyrug‘ini ishga tushiring — har bir asosiy ko‘rsatkich o‘lchangan qiymatgacha pasayadi.
2. `quality-baseline.json` faylidan `_policy`ni o‘chiring (`--require-tighten` va tungi
   jamg‘arishni qayta faollashtiradi), `check-openapi-coverage.mjs` faylida `THRESHOLD = 36`ni (yoki undan yuqori qiymatni) tiklang.
3. Modullashtirish samara bergan joylarda o‘lchangan qiymatdan ham qat’iyroq chegaralarni belgilang: fayl hajmi `cap`ini yana 1000
   (yoki 800)ga tushiring, qamrovning minimal chegaralarini +5 ga oshiring, modullashtirilgan paketlar uchun foydalanilmaydigan eksportlar sonini 0 qiling.

## Ratchet bazaviy darajasi (`quality-baseline.json`)

Ratchet mexanizmi (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` faylini o‘qiydi
va uni yangi yig‘ilgan `quality-metrics.json` bilan taqqoslaydi. Epsilon qiymatidan ortiq
yomonlashgan har qanday metrika build jarayonining muvaffaqiyatsiz tugashiga sabab bo‘ladi.

Hozirda kuzatiladigan metrikalar:

| Metrika               | Yo‘nalish | Ma’nosi                                        |
| --------------------- | --------- | ---------------------------------------------- |
| `eslintWarnings`      | `down`    | ESLint ogohlantirishlari soni oshmasligi kerak |
| `coverage.statements` | `up`      | Ifodalar qamrovi pasaymasligi kerak            |
| `coverage.lines`      | `up`      | Satrlar qamrovi pasaymasligi kerak             |
| `coverage.functions`  | `up`      | Funksiyalar qamrovi pasaymasligi kerak         |
| `coverage.branches`   | `up`      | Tarmoqlar qamrovi pasaymasligi kerak           |

Haqiqiy yaxshilanishdan so‘ng bazaviy darajani yangilash uchun:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` bayrog‘i joriy o‘lchangan qiymatlarni `quality-baseline.json` fayliga yozadi.
Bu faylni metrikani yaxshilagan o‘zgarish bilan birga commit qiling. Metrikani yaxshilab,
bazaviy darajani yangilamagan PR `--require-tighten` orqali aniqlanadi (6A.5-bosqich,
amalga oshirilishi kutilmoqda).

### CodeQL ratcheti: yangilash davriyligi va qo‘lda ishga tushirish

`check:codeql-ratchet` **har bir PR uchun emas, jadval asosida yangilanadigan repo holatini** o‘qiydi.
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` buyrug‘i
`state: configured`, `schedule: weekly` deb xabar beradi: bu har bir push uchun
tahlil emas, GitHub’ning default-setup skanidir. Natijada: ogohlantirishlarni TUZATADIGAN PR
merge qilingandan so‘ng ratchet keyingi rejalashtirilgan skan ishga tushguniga qadar eski,
yuqoriroq sonni o‘qishda davom etadi — shu sababli skan yangilanmaguncha har bir ochiq PR’da,
jumladan tuzatuvchi PR’ning keyingi o‘zgarishlarida ham regressiya haqida xabar beradi.

**Qo‘lda yangilash**: `gh workflow run codeql.yml --ref release/vX.Y.Z` tahlilni qayta
ishga tushiradi va ogohlantirishlarni bir necha daqiqa ichida qayta e’lon qiladi. Avval
`.github/workflows/codeql.yml` faylini o‘qing — uning sarlavhasida bu faqat
`workflow_dispatch` orqali ishlashi **GitHub’ning "default setup" konfiguratsiyasi bilan
ziddiyatga kirishishi sababli** ekani tushuntirilgan (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` triggerlarini qayta tiklash uchun avval **egasi amal bajarishi kerak**:
Settings → Code security → CodeQL: Default → Advanced. Bu o‘zgartirishsiz `schedule:`
triggerini qo‘shmang — u faqat muvaffaqiyatsiz ishga tushirishlarni keltirib chiqaradi.

**Son kamaygandan keyin bazaviy darajani qat’iylashtiring** — `node scripts/check/check-codeql-ratchet.mjs
--update` yangi o‘lchangan sonni `quality-baseline.json` →
`metrics.codeqlAlerts.value` ichiga yozadi, shuning uchun ratchet eski yuqori chegaragacha
bo‘lgan regressiyaga yashirincha ruxsat bermaydi. Amaliy misol (2026-09-02/03): PR #12502
7 ta haqiqiy ogohlantirishni tuzatdi (o‘lchangan ochiq ogohlantirishlar 13 → 6); PR #12530
mos kelishi uchun muzlatilgan bazaviy darajani 11 → 6 ga qat’iylashtirdi; qolgan 6 tasi
keyin har bir ogohlantirish uchun asos keltirilgan holda yopildi va ochiq ogohlantirishlar
soni 0 ga tushirildi.

**Ogohlantirishlarni yopish operatorning qaroridir (Qat’iy qoida #14)** — yopish izohida
texnik asosni qayd etmasdan hech qachon CodeQL ogohlantirishini yopmang: yuqori oqim
protokoli talabi uchun `won't fix`, test fiksturasi uchun `used in tests`, CodeQL aniqlay
olmaydigan sanitizer uchun `false positive` (namuna: `docs/security/ERROR_SANITIZATION.md`).

---

## Testlarni qayta urinish siyosati (WS5.4, v3.8.49)

Qayta urinish har bir runner uchun alohida belgilanadi, hech qachon global tarzda qoʻllanmaydi — umumiy qayta urinish haqiqiy regressiyalarni
koʻrinmas beqarorliklarga aylantiradi:

| Runner           | Siyosat                                                                                                                                        | Sabab                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | Faqat CI muhitida `retries: 1`, `trace: on-first-retry` bilan                                                                                  | Brauzer/tarmoq vaqtlari haqiqatan ham deterministik emas; trace bilan bitta qayta urinish beqarorlikni tashxislash mumkin boʻlgan artefaktga aylantiradi |
| Vitest           | Global qayta urinish YOʻQ. Beqarorligi isbotlangan test har bir test uchun alohida qayta urinish oladi (diffʼda koʻrinadi, PRʼda tekshiriladi) | Karantin roʻyxatini repozitoriyda saqlaydi, u hech qachon noaniq boʻlmaydi                                                                               |
| node:test (unit) | Hech qachon qayta urinish YOʻQ                                                                                                                 | Beqaror unit-test — testdagi xato; uni tuzating, qayta ishga tushirish bilan omadni sinamang                                                             |

Beqarorlik telemetriyasi ishga tushgandan keyingi maqsadli SLOʼlar (WS5.2/5.3): har bir test uchun <1% beqarorlik darajasi
(“hozir tuzatish” chegarasi), har bir pipeline uchun ≥95% muvaffaqiyat darajasi. Sohadagi etalon qiymatlar —
oʻz oʻlchovlarimiz asosida qayta kalibrlanadi.

## Reliz darajasidagi ratchet ogʻishi (WS5.5, v3.8.49)

Ratchet (fayl hajmi, murakkablik, eslint ogohlantirishlari) SOF reliz
uchida regressiyaga uchraganda — yaʼni mergeʼlar KOMBINATSIYASI uni yomonlashtirgan boʻlsa va hech bir alohida PR
oʻz branchʼida regressiyani takrorlamasa — tuzatish **reliz kapitani zimmasida boʻlib, bir marta, reliz
branchʼida** bajariladi: ajratib olish/refaktoringni afzal koʻring; faqat hujjatlashtirilgan
asos yozuvi bilan qayta bazalang. Kombinatsion ogʻishni hech qachon hissa qoʻshuvchi PRʼiga yuklamang va hech qachon
har bir PR uchun qayta bazalamang (bu haqiqiy regressiyalarni yashiradi). Avval farqlang: PRʼingiz bunga sabab boʻldi deb taxmin qilishdan oldin,
probe worktreeʼda sof uchdagi qizil holatni takrorlang.

## Ratchet qisqarishlarini saqlab qoʻyish — pasayish yoʻnalishi (#8584)

Ratchet faqat yarmigacha avtomatik va avtomatik boʻlgan yarmi notoʻgʻri. Chegarani **oshirish** —
oʻn soniya oladigan qoʻlda bajariluvchi JSON tahriri va qizil PRʼni blokdan chiqarishning eng tezkor usuli.
Uni **pasaytirish** uchun kimdir `--update` buyrugʻini ishga tushirib, natijani commit qilishi kerak — va
`bank-ratchet-shrinks` jobʼi joriy etilguniga qadar hech bir workflow buni bajarmagan. Oʻlchangan natija
(2026-07-25): 18 ta muzlatilgan fayl allaqachon yangi fayllar uchun 800 qatorlik chegarada yoki undan pastda, eng yomon holat
132× (`src/shared/validation/schemas.ts`, 19 qator uchun 2,523 chegara); murakkablik chegarasi
taxminan 37 ta qayta bazalash qaydi davomida `1794 → 2169` ga koʻtarilgan, atigi bitta pasayish (−1) boʻlgan;
va “keyingi siklda `--update` orqali qatʼiylashtirish” 31 marta yozilib, bir marta bajarilgan. Uni yuzaga keltirgan koddan
uzoqroq yashaydigan chegara har bir yakunlangan dekompozitsiyani faylni keyingi tahrirlaydigan shaxs uchun yashirincha
oʻsish ruxsatiga aylantiradi.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** jobʼi bu siklni yopadi:

|            |                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| Ishlaydi   | `schedule` (kuniga 3×) + `workflow_dispatch` — ataylab `push` emas                                                      |
| Oʻlchaydi  | eng yuqori `release/vX.Y.Z`, `release-green` bilan bir xil aniqlash + injection himoyasi                                |
| Yozadi     | `check:file-size --update` va `check:complexity-ratchets --update` (ikkalasi ham tuzilishi boʻyicha faqat qisqartiradi) |
| Tekshiradi | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                |
| Yetkazadi  | reliz branchʼiga qarshi doim joriy boʻlgan bitta PR — majburan yangilanadi, hech qachon spam qilinmaydi                 |

Saqlash har bir push uchun emas, paketlab bajariladi, chunki uning kechikish talabi yoʻq (8 soat ichida saqlangan qisqarish
yetarli), har bir merge uchun ishga tushirish esa merge kampaniyalari davomida PR branchʼini qayta-qayta yigʻadi
va har safar toʻliq ESLint tekshiruvi uchun resurs sarflaydi. Aniqlash pushʼda qoladi
(`release-green`); faqat saqlash paketlab bajariladi.

### Xavfsizlik verifikatori

Job bazaviy qiymatlarga nazoratsiz yozadi, shuning uchun `verify-ratchet-bank.mjs` buni
maqbul qiladi. U `--update`dan keyingi daraxtni `HEAD` bilan diff qiladi va har bir oʻzgarish quyidagilardan biri boʻlmasa,
**hech qanday commit yaratilishidan oldin jobʼni toʻxtatadi** — hech qanday PR ochilmaydi:

- `frozen` / `testFrozen` raqamli yozuvi **pasaytirilgan** yoki **olib tashlangan**
- `complexity-baseline.json` → `count` **pasaytirilgan**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **pasaytirilgan**

Boshqa har qanday oʻzgarish xatoga olib keladi: raqamni oshirish, yozuv qoʻshish, `cap`/`testCap`ni oʻzgartirish yoki
`_rebaseline_*` qaydini oʻchirish/qayta yozish (bu qaydlar har bir chegara nega mavjudligi haqidagi audit izi boʻlib,
fayl yozuvlari bilan bir xil `frozen` obyekti ichida saqlanadi).
Chegarani oshira oladigan bot joriy holatdan mutlaqo yomonroq boʻlardi. Regressiya himoyasi:
`tests/unit/verify-ratchet-bank.test.ts`.

Job hech qachon `release/*`ga push qilmaydi — PRʼni inson merge qiladi, shuning uchun notoʻgʻri oʻlchov
tekshirilmasdan qabul qilinmaydi.

## Ruxsat etilganlar roʻyxati siyosati

Oldindan mavjud buzilishlar sababli muvaffaqiyatsiz tugashi mumkin boʻlmagan har bir tekshiruv muzlatilgan ruxsat etilganlar roʻyxatidan foydalanadi
(masalan, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Siyosat quyidagicha:

**Asosiy sababni tuzating; ruxsat etilganlar roʻyxatidan faqat buzilish oldindan mavjud boʻlsa va
uni ayni PR doirasida tuzatib boʻlmasa foydalaning.**

Ruxsat etilganlar roʻyxatiga yozuv qoʻshayotganda:

1. Asoslantirish berilgan izohni kiriting.
2. Kuzatuv muammosiga havola bering (masalan, `// #3498 — 2-bosqich funksiyasi, hali amalga oshirilmagan`).
3. Buzilishni tuzatadigan ayni PR doirasida yozuvni olib tashlang — faol buzilishni endi
   istisno qilmaydigan eskirgan yozuvning oʻzi nuqson hisoblanadi (amalga oshirilgach, 6A.3 eskirgan-qoidalarni-nazorat-qilish
   yetim qolgan ruxsat etilganlar roʻyxati yozuvi sababli tekshiruvni muvaffaqiyatsiz yakunlaydi).

Testlarni tezroq oʻtkazish uchun ruxsat etilganlar roʻyxatiga yozuvlar **qoʻshmang**. Kengayib borayotgan
ruxsat etilganlar roʻyxati bilan yashil tekshiruv sifat haqida soxta tasavvur beradi.

### PRʼingizda tekshiruv muvaffaqiyatsiz tugaganda

1. **Tekshiruv chiqishini diqqat bilan oʻqing** — unda qoidani aynan qaysi fayl yoki belgi buzganligi
   koʻrsatiladi.
2. **Buzilishni tuzating** — aksariyat tekshiruvlar deterministik fayl tizimi tekshiruvlari boʻlib, kod
   toʻgʻrilanishi bilan muvaffaqiyatli oʻtadi.
3. **Agar buzilish oldindan mavjud boʻlsa** (yaʼni uni siz kiritmagansiz, ammo tekshiruv endi uni
   qamrab olayotgan boʻlsa): asoslantiruvchi izoh va kuzatuv muammosi bilan ruxsat etilganlar roʻyxatiga yozuv qoʻshing.
4. **Agar tekshiruv ratchet turida boʻlsa** (qamrov, ESLint ogohlantirishlari, takrorlanish, murakkablik):
   oʻzgartirishingiz koʻrsatkichni yomonlashtirgan. Asosiy muammoni tuzating yoki (kamdan-kam hollarda), agar oʻzgartirish
   ataylab qilingan va koʻrsatkichning yomonlashuvi maqbul boʻlsa, `npm run quality:ratchet -- --update` buyrugʻini
   bajaring — ammo sababini PR tavsifida hujjatlashtiring.
5. **Tavsiyaviy tekshiruvlar** (`continue-on-error: true`) axborot uchun xizmat qiladi — ular birlashtirishni
   bloklamaydi, ammo CI xulosasida koʻrinadi. Shunga qaramay, ularni tuzating.

---

## Yangi tekshiruv qoʻshish

1. `scripts/check/check-<name>.mjs` (yoki `.ts`) faylini yarating. Siyosat tekshiruvlari 0/1 kodi bilan yakunlanadi.
   Ratchet uslubidagi tekshiruvlar `collect-metrics.mjs` orqali `quality-metrics.json` fayliga koʻrsatkich yozadi.
2. `package.json` fayliga `"check:<name>": "node scripts/check/check-<name>.mjs"` ni qoʻshing.
3. Uni `.github/workflows/ci.yml` faylida tegishli vazifaga ulang
   (siyosat → `lint` yoki `docs-sync-strict`; ratchet → `quality-gate`).
4. Agar unda ruxsat etilganlar roʻyxati boʻlsa, eskirgan yozuvlar avtomatik aniqlanishi uchun
   `scripts/check/lib/allowlist.mjs` faylidagi `reportStaleEntries()` ni qoʻllang.
5. `tests/unit/build/` ichida tekshiruvning aniqlash mantiqini qamrab oluvchi test yozing.
6. Ushbu hujjatni yangilang (tegishli vazifa jadvaliga qator qoʻshing).

---

## Agent vositalari: sikl ichidagi LSP (ixtiyoriy)

CI tekshiruvlaridan tashqari, OmniRoute **ixtiyoriy** `agent-lsp` asosini ham taqdim etadi
(loyiha darajasidagi `.mcp.json`, 7-bosqich, 15-vazifa). Kod yozuvchi agentlarga TypeScript til serverini taqdim etish uchun `.mcp.json`
yarating, shunda ular kod yozishdan **oldin** belgilarni aniqlaydi /
diagnostikani bajaradi — bu `typecheck:core` uchun daʼvo qilishdan oldin kompilyatsiya qiluvchi hamroh boʻlib,
“oʻylab topilgan belgi” xatolarini manbaning oʻzida kamaytiradi. U ataylab avtomatik yuklanmaydi
(MCP↔LSP koʻprigini siz tanlaysiz va tekshirasiz); buzilgan yozuv faqat ulanish xatosini qayd etadi va
hech qachon seanslarni buzmaydi.

---

## Ratsionalizatsiya uchun vazifalar roʻyxati (ROI tahlili — 9-bosqich, 3-toʻlqin)

Ushbu inventar 2026-06-17 kuni `ci.yml` bilan solishtirilib muvofiqlashtirildi (oldingi versiyada
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` keltirilmagan edi). Muvofiqlashtirilgan toʻplamning ROI tahlili
quyidagi ratsionalizatsiya nomzodlarini aniqladi. **Birlashtirishlar mexanik CI
oʻzgarishlaridir; yoqish/oʻchirish va olib tashlashlar esa operator vakolatidagi siyosiy qarorlardir.** Quyidagilarning hech biri
hali qoʻllanmagan.

**Yuqorida hujjatlashtirilmagan yana bir jihat** (tavsiyaviy, signal darajasi past): `docs-lint` vazifasi
(markdownlint + Vale, butun vazifa uchun `continue-on-error`) va alohida skaner ish jarayonlari
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json` ichida mavjud, ammo `ci.yml` dagi bloklovchi ratchet bilan bogʻlanmagan — metrika
hozirda yetim qolgan.

### Birlashtirish / takrorlanishni bartaraf etish (mexanik, xavfi pastroq)

Har bir nomzod 2026-06-17 kuni amaldagi gate holatiga nisbatan tekshirildi (ishon, ammo tekshir);
bir nechta «yaqqol» birlashtirishlar aslida yashirin qarzdorlikni oʻz ichiga olishi aniqlandi va ular **tayyor holda almashtirishga** yaramaydi.

- **`check:docs-sync` ikki marta ishga tushadi** — `lint` vazifasida alohida va yana `check:docs-all` (`docs-sync-strict`) hamda husky pre-commit hook ichida. ✅ **BAJARILDI** — `lint` ichidagi alohida chaqiruv olib tashlandi.
- **CVE skanerlash** — ❌ **Toza birlashtirish EMAS.** `audit:deps` har qanday yuqori/kritik CVE holatida qatʼiy xato bilan yakunlanadi; `check:vuln-ratchet` (osv) esa faqat boshlangʻich koʻrsatkichga nisbatan _regressiya_ yuz berganda xato beradi (hozirda 1 ta MODERATE). Semantikalari turlicha — `audit:deps` olib tashlansa, mutlaq yuqori/kritik darajadagi gate yoʻqoladi. Ikkalasi ham saqlansin.
- **Sikllarni aniqlash** — ❌ **Toza birlashtirish EMAS.** `check:circular-deps` (dpdm) **91 ta sikl** haqida xabar beradi (shu sababli u tavsiyaviy); avval ularni bartaraf etmasdan uni bloklovchi holatga oʻtkazib boʻlmaydi va uning qamrovi yashil holatdagi, saralangan `check:cycles` dan kengroq. `check:cycles` bloklovchi boʻlib qolsin; 91 ta dpdm siklini bartaraf etish alohida vazifalar roʻyxatidir.
- **Murakkablik** — ✅ **BAJARILDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bitta ESLint oʻtishi, cyclomatic+max-lines va cognitive boshlangʻich koʻrsatkichlari mustaqil qolishi uchun hisoblash `ruleId` boʻyicha amalga oshiriladi; alohida `check:complexity` / `check:cognitive-complexity` mahalliy `--update` uchun saqlanib qoladi.
- **`/api` anti-gallyutsinatsiyasi** — ✅ **BAJARILDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` uchun bitta FS inventarizatsiyasi, openapi-routes + docs-symbols hali ham mustaqil hisobot beradi; alohida tekshiruvlar mahalliy ishga tushirish uchun saqlanadi.
- **`check:node-runtime` 11 ta vazifada ishga tushadi** — ⚠️ **ROI past.** Har biri alohida runner va tekshiruv <1s davom etadi; jami tejash ~10s, evaziga esa har bir vazifa uchun arzon himoya yoʻqoladi. Bunday oʻzgarishga arzimaydi.
- **CI lint ichidagi `typecheck:noimplicit:core`** — ✅ **lint vazifasidan olib tashlandi** (avval tavsiyaviy `continue-on-error` edi); bloklovchi tip yuzasi — `typecheck:core` + `check:type-coverage`. Mahalliy skript saqlab qolindi.

### Yoqish/oʻchirish / qaror qilish (operator siyosati)

- `check:openapi-security-tiers` (tavsiyaviy) — ❌ **Toʻgʻridan-toʻgʻri bloklovchi qilib boʻlmaydi.** U 0 kodi bilan yakunlanadi, ammo `LOCAL_ONLY_API_PREFIXES` ostidagi bir nechta `traffic-inspector` marshrutlarida `x-loopback-only: true` annotatsiyasi yoʻqligi haqida ogohlantiradi. Uni majburiy qilish uchun avval ushbu annotatsiyalarni `openapi.yaml` fayliga qoʻshish kerak.
- `typecheck:noimplicit:core` (tavsiyaviy) — asosan bloklovchi `check:type-coverage` ratcheti bilan qamrab olingan. Uni ratchetga aylantiring yoki takroriy ikkinchi `tsc` oʻtishini olib tashlang.
- `test:vitest:ui` (hozir **bloklovchi**) — avvaldan mavjud xatolar `vitest.config.ts` ichida `// #8618` kuzatuv izohlari bilan aniq istisno qilingan; yangi xatolar vazifani muvaffaqiyatsiz yakunlaydi.
- `check:secrets` (gitleaks, hujjatlashtirilgan 3 ta yolgʻon musbat natijada qotirilgan bloklovchi ratchet) — 0 ga tushirish uchun ushbu 3 tasini ruxsat etilganlar roʻyxatiga kiriting yoki tavsiyaviy darajaga tushiring. GitHub’ning ichki secret-scanning funksiyasi + `check:public-creds` bilan ustma-ust tushadi.
- `check:pr-evidence` (bloklovchi, PR matnidagi nasrni grep orqali tekshiradi) — yolgʻon musbat natijalar xavfi yuqori; olib tashlansa, Hard Rule #18 ijrosi zaiflashadi, shuning uchun bu haqiqiy siyosiy qarordir.
- `semgrep` (alohida tavsiyaviy tekshiruv) — OWASP oilalari boʻyicha CodeQL bilan ustma-ust tushadi; uning boshlangʻich koʻrsatkichini ratchetga ulang yoki olib tashlang.

---

## Tegishli hujjatlar

- Taʼminot zanjiri (kelib chiqish maʼlumotlari, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kalitlar toʻplami tengligi darvozasi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` vazifasi).
Har bir `src/i18n/messages/<locale>.json` faylidagi oxirgi daraja kalitlari toʻplamini `en.json` bilan solishtiradi va kalit qachon qoʻshilganidan qatʼi nazar, biror kalit yoʻq yoki ortiqcha boʻlsa, tekshiruvni muvaffaqiyatsiz yakunlaydi. `__MISSING__:` toʻldirgichlari mavjud deb hisoblanadi (ularning tarkibi nisbat darvozasining vazifasidir). Bu farq va foizga asoslangan ikkita darvozaning mutlaq toʻldiruvchisidir: `check-ui-keys-coverage` har bir lokal uchun 80 % minimal chegarani taʼminlaydi (~13,000 kalitdan 43 tasi yoʻq boʻlsa ham, natija 99.7 % boʻlib koʻrinadi), `check-new-key-coverage` esa faqat PR `en.json` fayliga qoʻshgan kalitlarni baholaydi. Lokal paketi uning tarmogʻi ajratilgan kundagi `en.json` asosida yaratiladi va asosiy tarmoqqa kalitlar qoʻshilishda davom etayotgan paytda bir necha kun tarjima qilinadi; paket PRʼining oʻzi hech qanday kalit qoʻshmaydi, shu sababli 1-paket (#13044) toʻqqizta lokalda 43 ta kalit yetishmagan holda, 2-paket (#13660) esa sakkizta lokalda 10 ta kalit yetishmagan holda birlashtirilganda (2026-09-15), ikkala qarindosh darvoza ham jim qoldi. Qizil holatni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` bilan tuzating; `extra` oxirgi daraja kaliti manbadan olib tashlanganini anglatadi — uni lokaldan oʻchiring. `--warn` muvaffaqiyatsizlikka olib kelmasdan xabar beradi.
`--catalog=cli` xuddi shu taqqoslashni `bin/cli/locales` ustida bajaradi (`npm run i18n:check-keys:cli`);
ikkala qadam ham `i18n-ui-coverage` vazifasida joylashgan.

#### `check-new-key-coverage` — yangi kalitlar uchun i18n darvozasi

`check-ui-value-drift` darvozasining qarindoshi. U inglizcha qiymat **qayta yozilib**, tarjimalari esa yangilanmay qolgan holatlarni aniqlaydi; bu darvoza esa inglizcha kalit **qoʻshilib**, ayrim lokallarga umuman kiritilmagan holatlarni aniqlaydi.

`check-ui-keys-coverage` bu turdagi muammoni koʻra olmaydi: u har bir lokal uchun foizli minimal chegarani taʼminlaydi, ~13,000 ta oxirgi daraja kalitidan oʻn bittasi yoʻq boʻlsa ham, qamrov 99.9% boʻlib qoladi. Har bir til uchun foiz «bu funksiya tarjimasiz chiqarildi» degan holatni ifodalay olmaydi — butun bir funksiya yangi lokalga hech qanday matnsiz qoʻshilishi va koʻrsatkichni umuman oʻzgartirmasligi mumkin.

Bu tekshiruv kodlashtirgan hodisa: Orchestration Canvasʼning 3-bosqichi oʻzining oʻn bitta kalitini oʻsha paytda mavjud boʻlgan 42 ta lokalga tarjima qildi. Bir necha soatdan soʻng Yevropa Ittifoqi tillari paketi (#13044) repozitoriydagi lokallar sonini 51 taga yetkazdi, yangi qoʻshilgan toʻqqizta lokal (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) esa bu kalitlarni hech qachon olmadi. `deepMergeFallback` yoʻq kalit oʻrniga inglizcha matnni qoʻyadi, shuning uchun nosozlik boʻsh UI emas, tarjima qilinmagan UI koʻrinishida namoyon boʻldi — bu haqiqiy va tuzilishi sababli jim qoladigan muammo edi.

Qarindosh darvoza kabi, bu ham **farqdan xabardor**: u birlashtirish bazasidagi inglizcha matnni ishchi daraxt bilan solishtiradi, shu sababli avvaldan mavjud boʻlgan boʻshliqlar oʻzgarishsiz qoladi va darvozani yoqish uchun hech qanday migratsiya talab qilinmaydi.

**`__MISSING__:<english>` markeri bu talabni qanoatlantirmaydi (2026-09-17 dan boshlab).** Ilgari u hujjatlashtirilgan kechiktirish usuli edi — bajarilish vaqtida tizim toʻgʻri inglizcha matnga qaytadi — biroq 2026-09-16 kuni sakkizta funksiya PRʼi 61 ta kalit qoʻshib, ularni tarjima qilish oʻrniga barcha 65 ta lokalga marker qoʻydi: bu darvoza ularning barchasini qabul qildi, PRʼlarni hech narsa toʻxtatmadi, shundan keyin haqiqiy tarjimalar nisbatini bloklovchi darvoza relizning eng soʻnggi nuqtasida hamma uchun muvaffaqiyatsiz yakunlandi (pt-BR 3.2 % > 2.5 % + 0.5). Endi marker yoʻq tarjima sifatida baholanadi. Qizil holatni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` bilan yoki barcha lokallarni parallel ravishda `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ajratilgan holatda xavfsiz, `OMNIROUTE_TRANSLATION_*` muhit oʻzgaruvchilarisiz ishga tushishni rad etadi) bilan tuzating. Inglizcha qolishi shart boʻlgan kalit (qatʼiy belgilangan mahsulot, dvigatel yoki bayroq nomi) marker ortida emas, `scripts/i18n/untranslatable-keys.json` ichida boʻlishi kerak. `vi` markerlarni butunlay taqiqlaydi (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — chetga surilgan testlar darvozasi

`vitest.config.ts` faylining `exclude` roʻyxatidagi fayl ishga tushirilmaydigan testdir, ammo daraxtni oʻqigan kishiga u qamrovning bir qismidek koʻrinadi. Oltmish ikkita fayl
`// #8618 — pre-existing failure; remove this exclusion when fixed` izohi ortida toʻplanib qoldi. #8618 masalasi 2026-08-11 kuni yopildi, u kuzatib borgan roʻyxat esa 45 ta yozuvdan 62 tagacha oʻsdi va har bir yangi yozuv yopilgan masalaga ishora qiluvchi izohni meros qilib oldi. Roʻyxat nihoyat har bir fayl boʻyicha oʻlchanganda (#13204), **62 ta fayldan 51 tasi manba kodiga hech qanday oʻzgartirish kiritmasdan joriy daraxtda muvaffaqiyatli oʻtdi**.

Darvoza haqiqiy faylga mos keladigan har bir istisnodan (a) kuzatuv masalasini koʻrsatishni va (b) oʻlchangan holati bilan `config/quality/vitest-exclusions.json` faylida mavjud boʻlishni talab qiladi; shu tariqa yangi istisno qoʻshish 60 yozuvli massivga yana bir qator kiritish emas, balki maxsus fayldagi koʻrib chiqilishi mumkin boʻlgan farqqa aylanadi. U ataylab chiqarib tashlangan testlarni qayta ishga tushirmaydi — bu ~10 daqiqa vaqt oladi va davriy vazifaga tegishli; inventar har bir test oxirgi marta qachon oʻlchanganini qayd etadi.
