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

## Geytlar roʻyxati va bajarish profillari

### Nomzodni qabul qilish

CI va Quality Gates ish jarayonlarining har biri barqaror hukm chiqaradi: `Gate / CI` va
`Gate / Quality`. Ularning versiyalangan qabul qilish siyosati har bir yuqori oqimdagi vazifani
majburiy yoki tavsiyaviy sifatida belgilaydi. Qoʻllaniladigan majburiy vazifa muvaffaqiyatli
yakunlanishi kerak: mavjud boʻlmagan, bekor qilingan, oʻtkazib yuborilgan, kutilayotgan va nomaʼlum
natijalar PASS holatini tasdiqlay olmaydi. Faqat hujjatlarga yoki faqat katalogga tegishli haqiqiy
tasnif kod yoʻnalishini qoʻllanilmaydigan qilishi mumkin; qoralama PR qabul qilinadigan nomzod emas.
`hotfix` yorligʻi dalillarni taqdim etish talabini bekor qilmaydi.

Har ikkala ish jarayoni PRʼlarni va main/release shoxlariga push qilishni, qoʻlda ishga tushirishni
hamda merge-group hodisalarini qamrab oladi. Push, dispatch va merge-group toʻliq tanlovni ishga
tushiradi. Forklar va merge-grouplar aks holda self-hosted runnerlarni tanlaydigan vazifalar uchun
hosted runnerlardan foydalanadi; joriy etishdan oldin hosted runnerlarning yetarli sigʻimi
tekshirilishi kerak.

Har bir JSON kvitansiyasi checkout qilingan SHA, ish jarayoni ishga tushirilishi va urinishni
aniqlaydi. CLI checkout/event SHA nomuvofiqligini rad etadi. Ish jarayoni testlari siyosat
aʼzoligini hukm vazifasining `needs` roʻyxatiga bogʻlaydi, shuning uchun yangi yoki olib tashlangan
yoʻnalish sezdirmasdan yoʻqolib qololmaydi. Kvitansiyalar nashr qilish, joylashtirish yoki mavjud
tavsiyaviy skanerning ichki qismlarini emas, faqat oʻz ish jarayonini qamrab oladi. Shox
qoidalarida ikkala tekshiruv nomini faollashtirish alohida maʼmuriy oʻzgarishdir; bu vazifalarni
qoʻshishning oʻzi shoxni himoya qilmaydi.

### Statik skanerlash roʻyxati

Versiyalangan npm-alias roʻyxati va statik skanerlash aʼzoligi
`config/quality/gate-manifest.json` faylida joylashgan. Skript nomlari va aniq buyruqlarni
`package.json` bilan solishtirib tekshirish uchun `npm run check:gate-manifest` buyrugʻini bajaring;
qoʻshishlar, olib tashlashlar va buyruqlardagi chetlanishlar ham lokal hook, ham CIʼdagi
oʻzgarishlarni tasniflash vazifalarini muvaffaqiyatsiz yakunlaydi. Alias ish jarayoni vazifasi,
matritsa nusxasi yoki test holati emas: bu miqdorlarni oʻzaro almashtiriladigan tarzda koʻrsatish
mumkin emas.

Tanlangan aliaslarni bajarmasdan koʻrib chiqish uchun `npm run quality:scan -- --list` yoki
`npm run quality:scan:fast -- --list` buyrugʻidan foydalaning. Runner npm kirish nuqtasini
ishga tushiradi, shuning uchun uning bajarilish muhiti (jumladan, sozlangan joylarda Bun) saqlanadi.
Manifest ushbu profillardan tashqaridagi aliaslarni alohida ishga tushiriladigan sifatida qayd
etadi va faqat oʻqish uchun moʻljallangan skanerlash profillarida texnik xizmat buyruqlari
taqiqlanadi.

Bu profillar faqat statik skanerlashni qamrab oladi. Ular mahsulot testlari, qamrov, paketlash,
tashqi tekshiruvlar yoki nomzodning relizga toʻliq qabul qilinishini tasdiqlamaydi. Ish jarayoniga
qabul qilish bogʻlangan `config/quality/admission-policy.json` va
`scripts/quality/admission-verdict.mjs` fayllaridan foydalanadi. Release-observer profillari
alohida qoladi; ularning tegishli tekshiruvlari va kvitansiyalarini mustaqil ravishda koʻrib
chiqing. Quyidagi matnli roʻyxat maʼlumotnoma boʻlib, geyt haqiqatda ishga tushganining isboti
emas.

Skriptlar `scripts/check/` (siyosat geytlari) va `scripts/quality/` (ratchet mexanizmi) ostida
joylashgan. CI uchun haqiqat manbasi `.github/workflows/ci.yml` hisoblanadi.

### Reliz PRʼlari uchun tezkor yoʻl (`quality.yml`)

`.github/workflows/quality.yml` main/release PRʼlari, himoyalangan shoxlarga push qilish,
dispatch va merge-grouplarda CIʼni toʻldiradi. PRʼlar yoʻl boʻyicha filtrlangan tezkor
tekshiruvlardan foydalanadi. Doimiy ravishda oʻchirib qoʻyilgan takroriy build olib tashlangan;
haqiqiy build/package/boot tekshiruvlari CIʼda qoladi.

| Vazifa                                           | Qamrov                                                                                                                                                                                                                     | Bloklovchi             |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Hujjatlar/kod PRʼlari; API hujjatlari havolalari va barcha hujjatlar                                                                                                                                                       | Ha                     |
| `Fast Quality Gates`                             | Kod PRʼlari; statik tekshiruvlar, typecheck, dashboard typecheck, taʼsirlangan unit testlar                                                                                                                                | Ha                     |
| `Forgotten sibling tests`                        | Kod PRʼlari; oʻzgargan modullardan statik isteʼmolchilar va nomzod sibling testlargacha kuzatish; barrel va dynamic-import yoʻllari allowlistdagi tegishli istisnolar bilan tavsiyaviy diagnostika sifatida xabar qilinadi | **Tavsiyaviy**         |
| `Vitest (fast-path)`                             | Kod PRʼlari; tezkor vitest toʻplami                                                                                                                                                                                        | Ha                     |
| `Unit Tests fast-path`                           | Kod PRʼlari; 4-shardli unit testlar toʻplami                                                                                                                                                                               | Ha                     |
| `No new ESLint warnings`                         | Kod PRʼlari; suppressionlarni hisobga oluvchi lint himoyasi                                                                                                                                                                | Ha, forklar ham kiradi |
| `Merge integrity (changelog + generated skills)` | Qoralama boʻlmagan PRʼlar; changelog va yaratilgan skill sinxronizatsiyasi                                                                                                                                                 | Ha, forklar ham kiradi |

#### Unutilgan sibling testlar hisoboti

`npm run check:forgotten-sibling-tests` test taʼsiri xaritasi asosidagi import resolveridan qayta
foydalanadi. Har bir oʻzgartirilgan ishlab chiqarish moduli uchun nomzod test pull-request diffida
mavjud boʻlmaganda deterministik
`oʻzgartirilgan modul/belgi -> statik isteʼmolchi -> nomzod sibling test` zanjirlarini hisobotga
kiritadi. Markdown xulosasi va JSON natijasi har qanday bloklovchi joriy etishdan oldin kalibrlash
uchun `forgotten-sibling-tests` ish jarayoni artefakti sifatida saqlanadi.

Barrel qayta eksportlari va dinamik importlar faqat rezolyutsiya diagnostikasi hisoblanadi; ular hech qachon
bloklovchi topilma yaratmaydi. Koʻrib chiqilgan istisnolar
`config/quality/forgotten-sibling-allowlist.json` faylida saqlanadi. Har bir yozuv isteʼmolchi va nomzod
testni koʻrsatishi, aniq asos keltirishi hamda GitHub muammosi yoki pull request’ga havola berishi kerak. Notoʻgʻri shakllantirilgan yozuvlar
yopiq holatda xatolik bilan yakunlanadi. Istisnolar oʻchirilgan nomzod testni yoki `.skip`/`.todo` qoʻshadigan diff’ni yashira olmaydi;
assertion’larni zaiflashtirish va boshqa niqoblash holatlari mustaqil ravishda bloklovchi
`check:test-masking` darvozasi nazoratida qoladi.

### Vazifa: `lint`

`main` uchun har bir PR’da ishga tushadi. Xatolik yuz bersa, birlashtirishni bloklaydi.

| Skript (`npm run ...`)            | Tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bloklovchi                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versiyasi qoʻllab-quvvatlanadigan diapazonda ekanini                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                         |
| `check:cycles`                    | Butun `src/` + `open-sse/` boʻylab siklik importlarni (AST asosida, tsconfig `paths` rezolyutsiya qilingan). Oddiy ishga tushirish = tavsiyaviy, sikllarni roʻyxatlaydi. `check:cycles:ratchet` (CI ishga tushiradigan variant) sikllar soni `quality-baseline.json` faylidagi `metrics.cycles` chegarasidan oshganda bloklaydi — hozir 14, `direction: down`, shu sababli u faqat kamayishi mumkin (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha (ratchet)                               |
| `check:route-validation:t06`      | Barcha routelarda Zod sxemalari mavjudligini (Tier 6 siyosati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` soni budjetdan oshmasligini (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:provider-consistency`      | `providers.ts` ichidagi har bir provayder `providerRegistry.ts` ichida mos yozuvga ega (va aksincha, ruxsat etilgan roʻyxat doirasida)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                         |
| `check:model-lifecycle`           | Qoʻlda yuritiladigan uchta marshrutlash jadvali repozitoriyga kiritilgan hayotiy sikl surati (#11503) bilan muvofiq qoladi: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` marshrutlay oladigan, foydalanishdan chiqarilgan hech bir id uchun ball bermaydi; har bir `BUILT_IN_ALIASES` maqsadi `REGISTRY` ichida mavjud va foydalanishdan chiqarilgan id lar suratida yoʻq; `REGISTRY` ichida hamon mavjud boʻlgan har bir foydalanishdan chiqarilgan id boshqa manzilga yoʻnaltirilgan yoki `allowedRetiredInCatalog` ichida koʻrsatilgan; va `DEFAULT_DEGRADATION_MAP` ichidagi hech bir manba yoki maqsad ushbu suratda foydalanishdan chiqarilgan sifatida koʻrinmaydi. Bu modelga hozirda faol yuqori oqim tomonidan xizmat koʻrsatilayotganini isbotlamaydi. Oflayn — qoʻlda `npm run quality:refresh-model-lifecycle` (tarmoq; CI ga ulanmagan) orqali yangilanadigan `config/quality/model-lifecycle.json` bilan taqqoslaydi. `allowedRetiredInCatalog` — bosqichma-bosqich qisqartirish mexanizmi: yozuvni faqat kuzatuv muammosi bilan birga qoʻshing. | Ha                                         |
| `check:fetch-targets`             | Mijoz tomonidagi `src/` ichidagi har bir `fetch("/api/...")` haqiqiy `route.ts` fayliga mos keladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ha                                         |
| `check:deps`                      | Repozitoriydagi har bir `package.json` boʻylab `npm install` orqali oʻrnatiladigan barcha bogʻliqliklar `dependency-allowlist.json` ichida mavjud; yangi aniq versiyaga mahkamlanmagan yoki slopsquattingga uchragan paketlar belgilanadi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                         |
| `audit:deps`                      | `npm audit` (ildiz + electron) — yuqori/kritik darajadagi tavsiyalar yoʻq (osv `check:vuln-ratchet` bilan ustma-ust tushadi; Ratsionalizatsiya beklogiga qarang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `check:lockfile`                  | `package-lock.json` yaxlitligi — https reyestri, yaxlitlik xeshlari, xost almashtirishlari yoʻq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ha                                         |
| `check:licenses`                  | Ishlab chiqarish bogʻliqliklari uchun ruxsat etilgan SPDX litsenziyalari roʻyxati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `check:tracked-artifacts`         | Build artefaktlari / repozitoriyga commit qilingan `node_modules` ramziy havolalari mavjud emas (husky pre-commit jarayonida ham ishga tushadi; pre-push ataylab yengil qoldirilgan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                         |
| `check:ai-attribution`            | PR commitlari, sarlavhasi yoki matnida AI/bot `Co-Authored-By` treyleri yoki AI tomonidan yaratilganlik futeri mavjud emas — Qatʼiy qoida #16 (`quality.yml` faylidagi PR→`release/**` uchun fast-gates siklida — hodisa payloadini oʻqiydi, PR boʻlmaganda hech narsa qilmaydi — va `ci.yml` lint jarayonidagi PR→`main` uchun faqat PRga tegishli qadamda; shuningdek, husky `commit-msg` hukida; inson hammualliflariga ruxsat beriladi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Har bir Vitest istisnosi kuzatuv muammosini koʻrsatadi va `config/quality/vitest-exclusions.json` faylida mavjud (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                         |
| `check:file-size`                 | Hech bir manba fayli kengaytma uchun belgilangan limitdan oshmaydi (ratchet: katta fayllar `frozen` roʻyxatida muzlatilgan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                         |
| `check:error-helper`              | Ijrochi va ishlov beruvchilardagi xato javoblari `buildErrorBody()` / `sanitizeErrorMessage()` dan foydalanadi (Qatʼiy qoida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `check:migration-numbering`       | Migratsiya SQL fayllari bo‘shliqlar va takrorlanishlarsiz ketma-ket raqamlangan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ha                                         |
| `check:public-creds`              | `publicCreds.ts` faylidan tashqarida literal OAuth `client_id`/`client_secret` yoki Firebase Web kalitlari mavjud emas (Qat’iy qoida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                         |
| `check:db-rules`                  | `src/lib/db/` modullaridan tashqarida bevosita SQL mavjud emas; `localDb.ts` faylidan barrel-importlar mavjud emas (Qat’iy qoidalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:known-symbols`             | Dispetcher jadvallarida ro‘yxatdan o‘tkazilgan provayder ijrochilari, marshrutlash strategiyalari va tarjimonlar diskdagi fayllarga mos keladi — yetim yoki e’lon qilinmagan belgilar mavjud emas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `check:route-guard-membership`    | Ichki jarayonni ishga tushiradigan har bir marshrut `isLocalOnlyPath()` tomonidan tasniflanadi (Qat’iy qoidalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                         |
| `check:test-discovery`            | Repodagi har bir `*.test.ts` / `*.spec.ts` fayli kamida bitta test ishga tushiruvchisi tomonidan aniqlanadi (ratchet: `test-discovery-baseline.json` faylidagi yetimlar ro‘yxati faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                         |
| `check:agent-skills-sync`         | Yaratilgan agent-skills artefaktlari ularning manba katalogiga mos keladi (tafovut yoʻq)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Provayder logotiplari/aktivlari uchun qayd etilgan kelib chiqish yozuvi mavjud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | JSON konfiguratsiya fayllari muvaffaqiyatli tahlil qilinadi va repo lint qoidalariga mos keladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | TypeScript xatolarsiz kompilyatsiya qilinadi (faqat tavsiyaviy ogohlantirishlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `typecheck:noimplicit:core`       | Qatʼiy `noImplicitAny` — kelajakka yoʻnaltirilgan; avvaldan mavjud koʻplab chaqiruv joylari hali ham annotatsiyalarni talab qiladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Tavsiyaviy** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` doirasidagi `tsc` (#7033) — `typecheck:core`ning saralangan 27 faylli ruxsat roʻyxati hech qanday dashboard TSX faylini oʻz ichiga olmaydi, `next build` esa uni umuman tur tekshiruvidan oʻtkazmaydi (`next.config.mjs` faylida `ignoreBuildErrors: true` oʻrnatilgan), shu sababli u yerdagi yetim identifikator regressiyalari (#6625/#6909) CI uchun koʻrinmas edi. Har bir fayl va har bir TS kodi boʻyicha muzlatilgan xatolar soni bazaviy koʻrsatkichi (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` bilan bir xil eskirganlikni tekshirish andozasi) bilan farqlar solishtiriladi — faqat bazaviy koʻrsatkichdagi sondan ortiq YANGI xatolar tekshiruvni muvaffaqiyatsiz qiladi; avvaldan mavjud xato tuzatilganda `--update` orqali bazaviy koʻrsatkichni pasaytiring.                                                                                                                                                                                                                           | Ha                                         |

### Vazifa: `quality-gate`

`test-coverage`dan keyin ishga tushadi. Muvaffaqiyatsizlik yuz bersa, birlashtirishni bloklaydi.

| Skript                       | Tekshiradi                                                                                                                                                                                                            | Bloklovchi                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | `quality-metrics.json` faylini yaratadi (ESLint ogohlantirishlari soni, birlashtirilgan shard hisobotidan qamrov)                                                                                                     | Ha (ratchetdan oldingi bosqich) |
| `quality:ratchet`            | `quality-baseline.json` ichidagi har bir metrika yomonlashmagan (ESLint ogohlantirishlari ≤ bazaviy qiymat; qamrov ≥ bazaviy qiymat)                                                                                  | Ha                              |
| `check:duplication`          | Kod takrorlanishi (jscpd@4) `quality-baseline.json` ichidagi bazaviy qiymatdan oshmaydi                                                                                                                               | Ha                              |
| `check:complexity`           | Fayl darajasidagi siklomatik murakkablik chegaradan oshmaydi (asosiy ESLint `complexity` + `max-lines-per-function`)                                                                                                  | Ha                              |
| `check:cognitive-complexity` | Kognitiv murakkablik ratcheti (`eslint-plugin-sonarjs`) — alohida ESLint tekshiruvi; CI ikkalasini yagona `check:complexity-ratchets` bosqichi sifatida birlashtirib ishga tushiradi                                  | Ha                              |
| `check:dead-code`            | Ishlatilmaydigan eksportlar/fayllar ratcheti (knip) bazaviy qiymatga nisbatan yomonlashmaydi                                                                                                                          | Ha                              |
| `check:compression-budget`   | Siqish benchmarki byudjeti — har bir mexanizm uchun token tejashning minimal chegaralari yomonlashmasligi kerak                                                                                                       | Ha                              |
| `check:type-coverage`        | Tiplashtirilgan kod foizi ratcheti (`type-coverage`) yomonlashmaydi; asosan `typecheck:noimplicit:core` o‘rnini bosadi                                                                                                | Ha                              |
| `check:codeql-ratchet`       | Ochiq CodeQL ogohlantirishlari soni yomonlashmaydi (`gh api` orqali o‘qiydi; token bo‘lmasa, xatosiz o‘tkazib yuboradi) — yangilash davriyligi va qo‘lda ishga tushirish: quyidagi «CodeQL ratcheti» bo‘limiga qarang | Ha                              |

### Vazifa: `quality-extended`

Butun vazifa tavsiyaviy (`continue-on-error: true`). npm asosidagi ratchetlar amalda
ishga tushadi; tashqi skanerlar `gh release download` orqali o‘rnatiladi va binar fayl
hali ham mavjud bo‘lmasa, o‘zini o‘zi o‘tkazib yuboradi (0 kodi bilan chiqadi).

| Skript                   | Tekshiradi                                                                                                                                                                                                                                                                                                   | Bloklovchi                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `check:circular-deps`    | Siklik bog‘liqliklar yo‘q (dpdm)                                                                                                                                                                                                                                                                             | **Tavsiyaviy**                                     |
| `check:bundle-size`      | To‘plam hajmi chegaradan oshmaydi                                                                                                                                                                                                                                                                            | **Tavsiyaviy**                                     |
| `check:secrets`          | Sirlarni skanerlash (gitleaks) — binar fayl mavjud bo‘lmasa, o‘tkazib yuboradi                                                                                                                                                                                                                               | **Tavsiyaviy**                                     |
| `check:vuln-ratchet`     | Bog‘liqliklardagi zaifliklar (osv-scanner) yomonlashmaydi — binar fayl mavjud bo‘lmasa, o‘tkazib yuboradi                                                                                                                                                                                                    | **Tavsiyaviy**                                     |
| `check:workflows`        | Ish jarayonlarini lint tekshiruvidan o‘tkazish (actionlint + zizmor); mavjud bo‘lmagan/ishlamaydigan skanerlar, yaroqsiz hisobotlar yoki mavjud bo‘lmagan ratchet bazaviy qiymati INCOMPLETE sifatida muvaffaqiyatsiz tugaydi. Haqiqiy topilmalar tanlangan qat’iy/tavsiyaviy/ratchet siyosatiga amal qiladi | Bajarilishi shart; zizmor ratcheti CI’da bloklaydi |
| `check:openapi-breaking` | Ommaviy API shartnomasidagi (`openapi.yaml`) asosiy tarmoqqa nisbatan buzuvchi o‘zgarishlar (oasdiff) — `openapiBreaking=N` chiqaradi; oasdiff mavjud bo‘lmasa yoki asosiy spetsifikatsiyani aniqlab bo‘lmasa, o‘tkazib yuboradi                                                                             | **Tavsiyaviy**                                     |

### Vazifa: `docs-sync-strict`

`main` tarmog‘iga yuborilgan har bir PR uchun ishga tushadi. Muvaffaqiyatsizlikda birlashtirishni bloklaydi.

| Skript                         | Tekshiradi                                                                                                                                                                                     | Bloklovchi                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Quyidagi 6 ta quyi tekshiruvni ketma-ket ishga tushiradigan meta-tekshiruv                                                                                                                     | Ha                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiyalarining muvofiqligi                                                                                                                                      | Ha                               |
| ↳ `check:docs-counts`          | Matndagi sonlar (provayderlar soni, migratsiyalar soni va hokazo) haqiqiy sonlarning ratchet oraligʻida ekanligi                                                                               | Ha                               |
| ↳ `check:env-doc-sync`         | `.env.example` ichidagi har bir muhit oʻzgaruvchisi hujjatlardagi jadvalda qayd etilgani va aksincha                                                                                           | Ha                               |
| ↳ `check:deprecated-versions`  | Hujjatlarda eskirgan versiya satrlari yoʻqligi                                                                                                                                                 | Ha                               |
| ↳ `check:doc-links`            | Hujjatlardagi ichki markdown havolalari haqiqiy fayllarga olib borishi (`[matn]`/`(yoʻl)` shakli)                                                                                              | Ha                               |
| ↳ `check:fabricated-docs`      | Hujjatlarda keltirilgan marshrutlar, muhit oʻzgaruvchilari, CLI buyruqlari, hook nomlari va fayl yoʻllari kod bazasida mavjudligi. `--strict` orqali qatʼiy tekshiruv; bayroqsiz yumshoq xato. | Ha (CI ichida `--strict` orqali) |
| `check:cli-i18n`               | CLI buyruq satrlari barcha i18n lokal fayllarida mavjudligi                                                                                                                                    | Ha                               |
| `check:openapi-coverage`       | OpenAPI spetsifikatsiyasi haqiqiy marshrutlarning kamida ratchet orqali belgilangan minimal miqdorini qamrab olishi                                                                            | Ha                               |
| `check:openapi-security-tiers` | `openapi.yaml` ichidagi xavfsizlik darajasi annotatsiyalari `routeGuard.ts` tasniflariga mosligi                                                                                               | **Maslahat**                     |
| `check:openapi-routes`         | `openapi.yaml` ichidagi har bir yoʻl haqiqiy `route.ts` fayliga olib borishi (gallyutsinatsiyaga qarshi)                                                                                       | Ha                               |
| `check:docs-symbols`           | `docs/**/*.md` ichidagi har bir `/api/...` havolasi haqiqiy `route.ts` fayliga olib borishi (gallyutsinatsiyaga qarshi)                                                                        | Ha                               |
| `i18n translation drift`       | i18n lokal fayllaridagi tarjima qilinmagan kalitlar — faqat ogohlantirish                                                                                                                      | **Maslahat**                     |

### Vazifa: `i18n-ui-coverage`

| Skript                           | Tekshiradi                                                                                                                                                                                                                                                | Bloklovchi   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (ichki) | UI i18n kalitlari qamrovi ≥ 65%                                                                                                                                                                                                                           | Ha           |
| `check-ui-value-drift` (ichki)   | Qayta yozilgan inglizcha **qiymat** ortida eskirgan tarjima qolmasligi                                                                                                                                                                                    | Ha           |
| `check-new-key-coverage` (ichki) | **Yangi** inglizcha kalit har bir lokalda tarjima qilingan boʻlishi — `__MISSING__:` belgisi rad etiladi                                                                                                                                                  | Ha           |
| `check-translation-ratio`        | Har bir lokal uchun haqiqiy tarjimalar nisbati (ruxsat etilganlar roʻyxatidan tashqaridagi inglizcha bilan bir xil / toʻldiruvchi / yetishmayotgan qiymatlar) `config/quality/i18n-translation-baseline.json` + ruxsat etilgan ogʻishdan oshmasligi kerak | **Maslahat** |

`fetch-depth: 0` talab qilinadi — qiymat ogʻishi tekshiruvi `en.json` faylini birlashtirish bazasi bilan taqqoslaydi.

#### `check-ui-value-drift` — eskirgan tarjimalar tekshiruvi

Boshqa tekshiruvlar tuzilmaviy jihatdan aniqlay olmaydigan i18n regressiyasini aniqlaydi: inglizcha qiymat
qayta yoziladi, ammo _avvalgi_ inglizcha matn asosida yaratilgan tarjimalar oʻzgarishsiz qoladi, natijada
ingliz tilida soʻzlashmaydigan foydalanuvchilar ishonchli ohangda yozilgan, ammo endi notoʻgʻri matnni oʻqishda davom etadilar.

Bu holat amalda relizga chiqib ketgan. Antigravity tizimiga kirish yordamchisi qoʻshilganda (#5203)
`oauthModal.googleOAuthWarning` qayta yozilgan; **43 ta lokaldan 39 tasi** operatorlarga «toʻliq
URL manzilini nusxalab, uni quyiga joylashtirish» kerakligini aytuvchi matnni saqlab qolgan — bu provayder
uchun yakunlab boʻlmaydigan jarayon. Quyidagi sabablarga koʻra bu holat #8463 gacha
sezilmagan:

- `sync-ui-keys` faqat **mavjud boʻlmagan** kalitlarni toʻldiradi, **eskirganlarini** esa hech qachon yangilamaydi;
- `check-ui-keys-coverage` kalitning _mavjudligini_ hisoblaydi, shuning uchun eskirgan tarjima qamrab olingan deb hisoblanadi;
- `check-translation-drift` `docs/i18n/<locale>/**.md` hujjat nusxalarini kuzatadi —
  u hech qachon `src/i18n/messages/*.json` fayllarini oʻqimaydi. 2026-09 qayta sinxronlashdan beri
  `docs-sync-strict` vazifasida bloklovchi: asosiy hujjatni tahrirlang → `npm run i18n:run -- --files=<doc>` (boʻlim darajasida, kam xarajatli).

**Farqlarni hisobga oladi, boshlangʻich holatga tayanmaydi.** U birlashtirish bazasidagi `en.json` faylini
ishchi daraxt bilan taqqoslaydi; inglizcha qiymati oʻzgargan har bir kalit uchun hali ham
oʻzgartirilmagan tarjimani saqlayotgan har qanday lokalizatsiya eskirgan hisoblanadi. Bu ataylab
**avvaldan mavjud qarzdorlikni muzlatadi** — farq uzoq vaqtdan beri mavjud tarjima qaysi eski
inglizcha matndan kelib chiqqanini aniqlay olmaydi, shuning uchun toʻsiq faqat joriy oʻzgarish
tegadigan qismlarni baholaydi. Muqobil yechim (har bir kalit uchun xesh boshlangʻich holati)
taxminan 600 KB hajmdagi generatsiya qilingan faylni talab qilardi; bu mavjud eng katta
boshlangʻich holatdan 3 baravar katta va har bir i18n PRda oʻzgarib turardi.

Uni qanoatlantirishning ikki yoʻli bor:

1. taʼsirlangan tarjimalarni yangilash yoki
2. ularni `__MISSING__:<new english>` qiymatiga oʻrnatish — shunda bajarilish muhiti
   tuzatilgan inglizcha matnni taqdim etadi (`src/i18n/request.ts::deepMergeFallback`, #7258)
   va kalit tarjima navbatiga qoʻshiladi.

Agar satrning **maʼnosi** oʻzgargan boʻlsa, **kalit nomini oʻzgartirish** afzal: yangi kalit
eskirgan tarjimani meros qilib ololmaydi. #8463 aynan shu andozadan foydalangan.

```bash
npm run i18n:check-value-drift          # qatʼiy (CI ishga tushiradigan variant)
npm run i18n:check-value-drift:warn     # faqat hisobot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Bazaviy katalogni oʻqib boʻlmaganda (bazaviy refsiz sayoz klon) `SKIP reason=base-unresolved`
bilan 0 kodida yakunlanadi; bu `check-openapi-breaking` xatti-harakatiga mos keladi.

### Vazifa: `i18n`

Toʻliq i18n tekshiruv matritsasi (har bir lokalizatsiya uchun bittadan vazifa). Butun vazifa
tavsiyaviy hisoblanadi.

| Skript                          | Tekshiradi                                     | Bloklash                                                  |
| ------------------------------- | ---------------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Har bir lokalizatsiya tarjimasining toʻliqligi | **Tavsiyaviy** (butun vazifada `continue-on-error: true`) |

### Vazifa: `pr-test-policy`

Faqat pull requestlarda ishga tushadi.

| Skript                 | Tekshiradi                                                                                                                                                      | Bloklash |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` yoki `bin/` ichidagi ishlab chiqarish kodini oʻzgartiradigan PRlar testlarni qoʻshishi yoki yangilashi shart (Qatʼiy qoida #8) | Ha       |
| `check:test-masking`   | Oʻzgartirilgan test fayllari tasdiqlar umumiy sonini kamaytirmaydi yoki `assert.ok(true)` tavtologiyalarini qoʻshmaydi                                          | Ha       |
| `check:pr-evidence`    | PR matnida oʻzgarish uchun test/VPS dalillari keltirilgan (PR matnini grep qilish orqali Qatʼiy qoida #18ni avtomatlashtiradi — moʻrt, Backlogga qarang)        | Ha       |

### Vazifa: `test-vitest`

`build`dan keyin ishga tushadi. Xatolik yuz bersa, birlashtirishni bloklaydi.

| Toʻplam          | Tekshiradi                                                           | Bloklash                                                                                                                  |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 ta vosita), autoCombo, kesh — vitest test ijrochisi | Ha                                                                                                                        |
| `test:vitest:ui` | UI komponent testlari — vitest test ijrochisi                        | **Bloklaydi** — avvaldan mavjud xatoliklar `vitest.config.ts`da aniq istisno qilingan; yangi xatoliklar vazifani yiqitadi |

### Tungi ish jarayonlari (rejalashtirilgan, tavsiyaviy)

Ular cron jadvali boʻyicha (va `workflow_dispatch` orqali) ishga tushadi, PRlarda esa hech
qachon ishga tushmaydi. Ularning barchasi tavsiyaviy.

| Ish jarayoni           | Tekshiradi                                                                                                                                                                                                | Bloklash       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | tasodifiy boshlangʻich qiymat va koʻp sonli ishga tushirishlar bilan fast-check xususiyat testlari                                                                                                        | **Tavsiyaviy** |
| `nightly-resilience`   | heap oʻsishi toʻsigʻi, nosozliklarni xaotik kiritish, k6 yuklama/uzoq muddatli yuklama sinovlari                                                                                                          | **Tavsiyaviy** |
| `nightly-llm-security` | promptfoo inyeksiya himoyasi (bloklash rejimi) + garak tekshiruvlari (provayder siri boʻlmasa oʻtkazib yuboriladi)                                                                                        | **Tavsiyaviy** |
| `nightly-schemathesis` | `docs/openapi.yaml` yordamida ishlayotgan OmniRoutega qarshi OpenAPI shartnomasini fuzzing qilish (schemathesis) — spetsifikatsiya buzilishlari / qayta ishlanmagan 500 xatolarini aniqlaydi (Fase 8 B.4) | **Tavsiyaviy** |
| `nightly-mutation`     | tezkor modul testlari yoʻlagi boʻyicha Stryker mutatsion testlash bahosi — saqlanib qolgan mutantlar zaif tasdiqlarni koʻrsatadi                                                                          | **Tavsiyaviy** |
| `nightly-compat`       | qoʻllab-quvvatlanadigan `engines.node` diapazonlari boʻyicha Node dvigateli moslik matritsasi                                                                                                             | **Tavsiyaviy** |

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

## Ratsionalizatsiya uchun vazifalar roʻyxati (ROI koʻrib chiqishi — 9-bosqich, 3-toʻlqin)

Ushbu inventar 2026-06-17 sanasida `ci.yml` bilan solishtirib muvofiqlashtirildi (avvalgi versiyada
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` tushirib qoldirilgan edi). Muvofiqlashtirilgan toʻplamning ROI tahlili
quyidagi ratsionalizatsiya nomzodlarini aniqladi. **Birlashtirishlar mexanik CI
oʻzgarishlaridir; holatni almashtirish/oʻchirish esa operator ixtiyoridagi siyosiy qarorlardir.** Quyidagilarning hech biri
hali qoʻllanmagan.

**Yuqorida hujjatlashtirilmagan boshqa elementlar ham bor** (tavsiyaviy, signal darajasi past): `docs-lint` vazifasi
(markdownlint + Vale, butun vazifa uchun `continue-on-error`) va alohida skaner ish jarayonlari
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json` ichida mavjud, ammo `ci.yml` ichidagi bloklovchi ratchet’ga ulanmagan — metrika
hozirda yetim qolgan.

### Birlashtirish / takrorlarni yoʻqotish (mexanik, xavfi pastroq)

Har bir nomzod 2026-06-17 sanasidagi amaldagi gate holatiga nisbatan tekshirildi (ishoning, ammo tekshiring);
bir nechta «ravshan» birlashtirishlar aslida yashirin texnik qarzni berkitishi aniqlandi va ular **toʻgʻridan-toʻgʻri qoʻllashga** yaroqli emas.

- **`check:docs-sync` ikki marta ishga tushadi** — `lint` vazifasida alohida va yana `check:docs-all` (`docs-sync-strict`) ichida hamda husky pre-commit hook’ida. ✅ **BAJARILDI** — alohida `lint` chaqiruvi olib tashlandi.
- **CVE skanerlash** — ❌ **Toza birlashtirish EMAS.** `audit:deps` har qanday high/critical CVE’da qatʼiy xato bilan toʻxtaydi; `check:vuln-ratchet` (osv) esa faqat boshlangʻich koʻrsatkichga nisbatan _regressiya_ boʻlganda xato beradi (hozirda 1 MODERATE). Semantikasi turlicha — `audit:deps` olib tashlansa, mutlaq high/critical gate yoʻqoladi. Ikkalasini ham saqlang.
- **Sikllarni aniqlash** — ✅ **BAJARILDI** (#15159 G-01/G-02). Bu yerdagi eski matnda `check:cycles` «yashil, saralangan» gate deb atalgan va `check:circular-deps` (dpdm) 91 ta sikl haqida xabar bergani sababli uni bloklovchi sifatida saqlash asoslangan edi. Bu yashil holat **soxta yashil** edi: `check:cycles` 5 ta quyi katalogni (450 ta fayl) skanerlagan, faqat statik `import|export … from` bilan moslikni topgan va barcha `@/` hamda `@omniroute/open-sse/` spetsifikatorlarini tashlab yuborgan, shu sababli repozitoriyda ustun boʻlgan dinamik import + alias sikllarini koʻra olmagan. Tuzatildi: gate endi `src` + `open-sse` boʻylab yuradi (5023 ta fayl), spetsifikatorlarni TypeScript AST’dan yigʻadi (shuning uchun `import("…")` hisobga olinadi, tur pozitsiyasidagi `typeof import("…")` esa olinmaydi) va tsconfig `paths` qiymatlarini aniqlaydi. U 0 emas, **14** ta sikl topadi. Avvaldan mavjud 14 ta siklni gate PR ichida tuzatib boʻlmagani sababli `check:cycles` endi **ratchet** (`--ratchet`, `quality-baseline.json` ichida yuqori chegara `metrics.cycles.value = 14`, `direction: down`) — u har qanday _regressiya_ ni bloklaydi va son faqat kamayishi mumkin. CI `npm run check:cycles:ratchet` buyrugʻini ishga tushiradi. Bosqichma-bosqich kamaytirish **A-01** bilan birga olib boriladi. `check:circular-deps` (dpdm) kengroq ikkinchi xulosa sifatida tavsiyaviy holatda qoladi.
- **Murakkablik** — ✅ **BAJARILDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bitta ESLint oʻtishi, hisoblash ruleId boʻyicha amalga oshiriladi, shuning uchun cyclomatic+max-lines va cognitive boshlangʻich koʻrsatkichlari mustaqil qoladi; alohida `check:complexity` / `check:cognitive-complexity` lokal `--update` uchun saqlanadi.
- **`/api` anti-gallyutsinatsiyasi** — ✅ **BAJARILDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` uchun yagona FS inventari, openapi-routes + docs-symbols hamon mustaqil hisobot beradi; alohida tekshiruvlar lokal ishga tushirishlar uchun saqlanadi.
- **`check:node-runtime` 11 ta vazifada ishga tushadi** — ⚠️ **ROI past.** Har biri alohida runner va tekshiruv <1s davom etadi; umumiy tejash ~10s, buning evaziga har bir vazifa uchun arzon himoya yoʻqoladi. Bunday oʻzgartirishlar bilan bogʻliq ortiqcha tashvishga arzimaydi.
- **CI lint’dagi `typecheck:noimplicit:core`** — ✅ **lint vazifasidan olib tashlandi** (tavsiyaviy `continue-on-error` edi); bloklovchi tur yuzasi `typecheck:core` + `check:type-coverage` hisoblanadi. Lokal script saqlab qolindi.

### Holatni almashtirish / qaror qabul qilish (operator siyosati)

- `check:openapi-security-tiers` (tavsiyaviy) — ❌ **Toza tarzda almashtirib boʻlmaydi.** U 0 kodi bilan yakunlanadi, ammo `LOCAL_ONLY_API_PREFIXES` ostidagi bir nechta `traffic-inspector` marshrutlarida `x-loopback-only: true` annotatsiyasi yoʻqligi haqida ogohlantiradi. Uni majburiy qilish uchun avval ushbu annotatsiyalarni `openapi.yaml` fayliga qoʻshish kerak.
- `typecheck:noimplicit:core` (tavsiyaviy) — asosan bloklovchi `check:type-coverage` ratchet’i bilan qamrab olingan. Uni ratchet’ga aylantiring yoki takroriy ikkinchi `tsc` oʻtishini olib tashlang.
- `test:vitest:ui` (hozir **bloklovchi**) — avvaldan mavjud nosozliklar `vitest.config.ts` ichida `// #8618` kuzatuv izohlari bilan ochiq tarzda istisno qilingan; yangi nosozliklar vazifani muvaffaqiyatsiz yakunlaydi.
- `check:secrets` (gitleaks, hujjatlashtirilgan 3 ta yolgʻon ijobiy natijada muzlatilgan bloklovchi ratchet) — 0 ga yetkazish uchun ushbu 3 tasini ruxsat etilganlar roʻyxatiga kiriting yoki tavsiyaviy darajaga tushiring. GitHub’ning ichki secret-scanning funksiyasi + `check:public-creds` bilan ustma-ust tushadi.
- `check:pr-evidence` (bloklovchi, PR-body matnini grep orqali qidiradi) — yolgʻon ijobiy natija xavfi yuqori; olib tashlansa, Hard Rule #18 ijrosi zaiflashadi, shuning uchun bu haqiqiy siyosiy qarordir.
- `semgrep` (alohida tavsiyaviy) — OWASP oilalari boʻyicha CodeQL bilan ustma-ust tushadi; uning boshlangʻich koʻrsatkichini ratchet’ga ulang yoki olib tashlang.

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
