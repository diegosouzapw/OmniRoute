# ADR: Pluggable persistence boundary (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Holat:** Taklif qilingan — bajarilish muhiti bo‘yicha ishlar boshlanishidan oldin maintainer tasdig‘i talab etiladi
- **Kuzatuv muammosi:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Qamrov:** Faqat saqlash arxitekturasi; bu qaror tashqi ma’lumotlar bazasini qo‘shmaydi yoki tanlamaydi

## Kontekst

Hozirda OmniRoute `src/lib/db/` orqali domenga yo‘naltirilgan saqlash funksiyalarini taqdim etadi, ayni paytda
`src/lib/db/core.ts` qaytaradigan umumiy ulanish `src/lib/db/adapters/types.ts` ichidagi sinxron `SqliteAdapter`
shartnomasini amalga oshiradi. Ushbu adapter bir nechta SQLite bajarilish muhitini qo‘llab-quvvatlaydi, biroq uning
interfeysi SQLite shaklida qoladi: sinxron tayyorlangan so‘rovlar, `pragma`, kechiktirilgan va darhol bajariladigan
tranzaksiyalar, mahalliy/fayldan nusxa olish orqali zaxiralash, nazorat nuqtasi va mahalliy ma’lumotlar bazasi deskriptori.

Joriy ishga tushirish va tiklash jarayoni ham SQLite faylining hayot siklini boshqaradi. `src/lib/db/core.ts`
`storage.sqlite` manzilini aniqlaydi, jarayon miqyosidagi yagona adapterni boshqaradi, WAL uchun nazorat nuqtalarini yaratadi, tiklash
vaqtida tanlangan jadvallarni saqlab qoladi va ma’lumotlar bazasini qayta yaratishda SQLite yordamchi fayllarini o‘chiradi. Drayverni
`src/lib/db/adapters/driverFactory.ts` ichida tanlash qo‘llab-quvvatlanadigan SQLite bajarilish muhitlari orasida amalga oshiriladi; u
tashqi backend abstraksiyasi emas.

Sxema evolyutsiyasi ham xuddi shunday bog‘langan. `src/lib/db/migrationRunner.ts` raqamlangan SQL fayllarini qo‘llaydi,
`sqlite_master` va `PRAGMA table_info` ni tekshiradi, ixtiyoriy FTS5 qo‘llab-quvvatlashini aniqlaydi va migratsiya
ishlarini SQLite tranzaksiyalarida bajaradi. `src/lib/db/backup.ts` va
`src/lib/db/optimizationSettings.ts` kabi operatsion modullar zaxiralash, `PRAGMA`, WAL, sahifa o‘lchami,
avtomatik siqish va `VACUUM` semantikasidan bevosita foydalanadi.

Bular o‘rnatilgan SQLite joylashtiruvi uchun asosli xususiyatlardir. Ular PostgreSQL yoki MySQL’ni SQLite API’siga
taqlid qilishga majburlamagan holda mavjud bo‘lib qolishi kerak.

## Qaror

Portativ doimiy holat uchun ikki darajali saqlash chegarasi qabul qilinsin:

1. **Domen repozitoriylari shartnomalari** biznes va marshrutlash kodi uchun zarur bo‘lgan saqlash operatsiyalarini
   belgilaydi. Chaqiruvchilar SQL matni, tayyorlangan so‘rovlar, ma’lumotlar bazasi fayllari yoki dialekt obyektlariga
   emas, domen xatti-harakati va domen ma’lumotlariga bog‘liq bo‘ladi.
2. **Ichki asinxron backend shartnomasi** repozitoriy implementatsiyalarini tranzaksiya kontekstlari,
   holat/tayyorlik tekshiruvlari, migratsiyalarni muvofiqlashtirish, backend imkoniyatlari va tasniflangan xatolar bilan
   ta’minlaydi. Aniq TypeScript interfeysi birinchi implementatsiya PR’i bilan taklif qilinadi va muvofiqlik testlari
   orqali tasdiqlanadi; ushbu ADR ataylab taxminiy API’ni qat’iy belgilamaydi.

SQLite standart implementatsiya bo‘lib qoladi. Mavjud SQLite drayverlari kaskadi va sinxron
`SqliteAdapter` domenlar kichik vertikal bo‘laklarda migratsiya qilinayotganda SQLite repozitoriysi implementatsiyasi
ortida qoladi. Hech bir foydalanuvchidan tashqi xizmatni sozlash talab etilmaydi.

PostgreSQL repozitoriy chegarasi SQLite bilan ishlashda tasdiqlanganidan keyin taklif qilinadigan birinchi tashqi
implementatsiya bo‘ladi. MySQL biznes mantiqining ikkinchi tarmog‘i sifatida emas, balki ayni muvofiqlik testlari
to‘plamiga nisbatan teng huquqli implementatsiya sifatida keyinroq qo‘shiladi.

## Chegara qoidalari

### Portativ repozitoriy interfeysi

Portativ repozitoriy quyidagilarni taqdim etishi mumkin:

- domen ma’lumotlarini o‘qish va yozish;
- aniq atomar operatsiyalar va tranzaksiya doirasidagi repozitoriyga kirish;
- parallellik semantikasi domenning bir qismi bo‘lgan hollarda taqqoslash/yangilash yoki ijara operatsiyalari;
- backendga bog‘liq bo‘lmagan sahifalash, tartiblash va cheklov xatolari.

Backend holati, tayyorligi va migratsiyalarni muvofiqlashtirish alohida domen repozitoriylariga emas, ichki backend/operatsion
shartnomaga tegishli.

Portativ repozitoriy quyidagilarni taqdim etmasligi kerak:

- `prepare`, `get`, `all`, `run` yoki drayverning bevosita deskriptorlari;
- `PRAGMA`, WAL nazorat nuqtasi rejimlari, `VACUUM` yoki sahifa/kesh sozlamalari;
- SQLite fayl yo‘llari, yordamchi fayllar yoki fayldan nusxa olish orqali zaxiralash;
- backendlararo domen shartnomasi sifatida `lastInsertRowid`;
- FTS5 yoki `sqlite-vec` sintaksisi;
- odatiy biznes kodi foydalanadigan umumiy dialekt chetlab o‘tish mexanizmi.

### Backend imkoniyatlari interfeysi

Backendga xos xatti-harakatlar aniq va topish oson bo‘lib qoladi. Faqat SQLite’ga xos texnik xizmat uning
o‘z implementatsiyasi va operatsion interfeysi ortida qoladi, jumladan:

- bajarilish muhiti drayverini tanlash;
- WAL nazorat nuqtasi va SQLite’ni o‘chirish xatti-harakati;
- sahifa o‘lchami, kesh o‘lchami va avtomatik siqish sozlamalari;
- ma’lumotlar bazasi faylini zaxiralash, qayta tiklash va avariyadan tiklash;
- SQLite sxemasini introspeksiya qilish;
- FTS5 va `sqlite-vec` integratsiyasi.

Tashqi backenddan ushbu imkoniyatlarga taqlid qilish talab etilmaydi. Repozitoriylar portativ imkoniyatdan foydalanishi,
hujjatlashtirilgan xatti-harakatga ega backendga xos implementatsiyani taqdim etishi yoki imkoniyat mavjud emasligini
bildirishi kerak.

## Tranzaksiya va migratsiya modeli

Repository API’lari atomar biznes operatsiyasini belgilaydi; chaqiruvchilar SQL tranzaksiya rejimini tanlamaydi.
Har bir operatsiya kuzatiladigan parallellik kafolatlarini belgilashi kerak: himoyalangan invariantlar, ziddiyatlarni
aniqlash, qayta urinish tasnifi, idempotentlik talablari va tranzaksiya kontekstini uzatish.
Amalga oshirishlar turli tranzaksiya va izolyatsiya mexanizmlaridan faqat ushbu kuzatiladigan
kafolatlar ekvivalentligicha qolgan taqdirda foydalanishi mumkin. SQLite operatsiya shartnomasiga mos keladigan hollarda
joriy kechiktirilgan yoki darhol bajariladigan tranzaksiya xatti-harakatidan ichki tarzda foydalanishda davom etishi mumkin.

Bir nechta ilova replikalari bir xil sxema o‘zgarishini parallel ravishda bajarishga urinmasligi uchun tashqi backendlar
migratsiyaga egalikni aniq belgilashni talab qiladi. Backend migratsiya tarixlari umumiy mantiqiy bosqichlarni
bo‘lishishi mumkin, ammo SQLite SQL fayllari boshqa dialektga ko‘chirish yoki unda qayta ishlatish mumkin deb
hisoblanmaydi.

## Backendlararo muvofiqlik semantikasi

Muvofiqlik testlari nafaqat repository metodlarining signaturalarini, balki xatti-harakatni ham qamrab olishi kerak. Har bir migratsiya qilingan domen
quyidagilarni belgilashi va tekshirishi kerak:

- vaqt tamg‘asining vaqt zonasi, aniqligi va serializatsiyasi;
- `NULL` qiymatlarini tartiblash, kollatsiya va katta-kichik harflarga sezgirlik talablari;
- JSON ifodalanishi va taqqoslash xatti-harakati;
- butun sonlar, o‘nli sonlar va pul qiymatlarining aniqligi;
- sahifalash uchun barqaror tartiblash va deterministik tenglikni buzish mezonlari;
- SQLite satr ID’lariga tayanmasdan ID yaratish;
- yagonalik va tashqi kalit buzilishlarini tasniflash;
- hech qanday o‘zgarish kiritmaydigan, taqqoslash/yangilash va o‘chirish operatsiyalari uchun ta’sirlangan satrlar xatti-harakati;
- parallel yozuvlar natijalari, qayta urinish mumkin bo‘lgan ziddiyatlar va idempotent qayta urinishlar.

Agar domen ekvivalent kuzatiladigan semantikani belgilay olmasa, u hali ko‘chirishga tayyor emas va ushbu shartnoma
ishlab chiqilmaguncha backendga xos bo‘lib qolishi kerak.

## Moslik talablari

Ushbu ADR’ga amal qiladigan har qanday amalga oshirish quyidagi xususiyatlarni saqlab qolishi kerak:

- SQLite sozlashni talab qilmaydigan standart variant bo‘lib qoladi.
- Mavjud SQLite fayllari va migratsiya tarixi o‘qiladigan bo‘lib qoladi.
- npm, Electron, Docker va cheklangan bajarilish muhitlaridagi SQLite zaxira variantlari joriy ishga tushirish yo‘lini saqlab qoladi.
- Saqlangan provayder hisob ma’lumotlari mavjud ilova shifrlash mexanizmidan foydalanishda davom etadi.
- Repository migratsiyasi marshrutlash, kvota, API kaliti yoki audit semantikasini yashirincha o‘zgartirmaydi.
- Zaxiralash va tiklash xatti-harakati universal sifatida taqdim etilmaydi, balki har bir backend uchun alohida hujjatlashtiriladi.
- Faqat SQLite’dan foydalanadigan toza o‘rnatish tashqi ma’lumotlar bazasi drayverini yuklamaydi yoki talab qilmaydi.

## Yetkazib berish ketma-ketligi

1. Qayta yaratish mumkin bo‘lgan SQLite bog‘liqliklari inventarini alohida ko‘rib chiqish artefakti sifatida e’lon qiling.
2. Dastlabki domen repository shartnomalari va muvofiqlik testlarini joriy eting.
3. Standart sozlamalarni o‘zgartirmasdan mavjud SQLite amalga oshirishini ushbu shartnomalar ortiga moslashtiring.
4. Mas’ullarning tasdig‘i bilan, boshqaruv tekisligining bitta chegaralangan qismi uchun birinchi tashqi amalga oshirish sifatida PostgreSQL’ni
   qo‘shing.
5. Umumiy holatni faqat parallel yozuv va migratsiyaga egalik testlari mavjud bo‘lgandan keyin kengaytiring.
6. Ma’lumotlar bazasini almashtirish imkoniyatini e’lon qilishdan oldin SQLite’dan tashqi backendga oflayn, tekshirilgan migratsiya yo‘lini qo‘shing.
7. Tasdiqlangan repository va backend shartnomalari asosida MySQL’ni qo‘shing.

Bajarilish muhitiga oid har bir qadam alohida, ko‘rib chiqish mumkin bo‘lgan PR hisoblanadi. Keyingi qadamdan oldingi qadamdagi
tasdiqlanmagan abstraksiyani birlashtirishni oqlash uchun foydalanilmasligi kerak.

## Birinchi amalga oshirish qismi

Birinchi ish vaqti qismi bogʻliqliklar roʻyxati koʻrib chiqilgandan keyin tanlanishi kerak. Provayder
ulanishlari, API kalitlari, kombolar va marshrutlash konfiguratsiyasi nomzod hisoblanadi, chunki ularning asosiy jadvallari
`src/lib/db/core.ts` ichida koʻrinadi, ammo ushbu ADR jadvallar roʻyxatini yoki migratsiya PRini tasdiqlamaydi.
Bu qism quyidagilarni oʻz ichiga olishi kerak:

- SQLite xatti-harakatini saqlab qolish testlari;
- repozitoriy muvofiqlik testlari;
- aniq tranzaksiya chegaralari;
- saqlangan hisob maʼlumotlari uchun shifrlash va maxfiy maʼlumotlarni yashirishni tekshirish;
- standart ishga tushirish konfiguratsiyasiga hech qanday oʻzgartirish kiritmaslik.

## Koʻrib chiqilgan muqobil variantlar

### PostgreSQLni `SqliteAdapter` ostiga qoʻshish

Rad etildi. `SqliteAdapter` SQLite ish vaqti muhitlari uchun moslik qatlami boʻlib, SQLitega xos
operatsiyalarni taqdim etadi. Ushbu interfeysni emulyatsiya qilish sinxron va dialektga xos taxminlarning
yangi backendga sizib oʻtishiga olib keladi.

### Barcha domenlarga umumiy query/execute API taqdim etish

Asosiy chegara sifatida rad etildi. Bu ulanishlarni boshqarishni markazlashtiradi, ammo SQL dialekti,
tranzaksiya va jadvallarga bogʻliqlikni biznes modullarida qoldiradi. Quyi darajadagi backend primitivi
repozitoriy implementatsiyalari ichida mavjud boʻlishi mumkin, ammo ilova foydalanadigan saqlash APIi sifatida emas.

### Bitta qismni tekshirishdan oldin barcha saqlash qatlamini qayta yozish

Rad etildi. Joriy saqlash interfeysi keng boʻlib, fayllarning hayot sikli, tiklash, qidiruv
va operatsion sozlamalarni oʻz ichiga oladi. Vertikal qismlar koʻrib chiqish mumkin boʻlgan xatti-harakatlar va ortga qaytarish chegaralarini taʼminlaydi.

### Standart sifatida SQLiteni almashtirish

Rad etildi. Ichki oʻrnatilgan va ish stoli tizimlari joriy, tashqi xizmat talab qilmaydigan ishga tushirish modeliga bogʻliq.
Tashqi backend ixtiyoriy ravishda yoqiladi.

### Redisdan barqaror maʼlumotlar uchun asosiy manba sifatida foydalanish

Rad etildi. Redis aniq belgilangan vaqtinchalik muvofiqlashtirish, kesh yoki hisoblagichlarni qoʻllab-quvvatlashi mumkin,
ammo bu yerda tavsiflangan barqaror repozitoriy shartnomasini almashtirmaydi.

## Oqibatlar

### Ijobiy jihatlar

- Biznes kodi maʼlumotlar bazasi dialektidan mustaqil, barqaror saqlash chegarasiga ega boʻladi.
- Tashqi backend abstraksiyani belgilashidan oldin SQLite xatti-harakati sinovdan oʻtkaziladi.
- PostgreSQL va MySQL domen mantiqini takrorlash oʻrniga umumiy shartnomalar va testlardan foydalanadi.
- Faqat SQLitega xos imkoniyatlar sizib chiquvchi moslik vositalariga aylanmasdan, birinchi darajali boʻlib qoladi.
- Bir nechta replika uchun migratsiya va tranzaksiya xatti-harakati aniq loyihaviy masalaga aylanadi.

### Xarajatlar va xavflar

- Repozitoriylarni ajratib olish chaqiruv joylarini bosqichma-bosqich migratsiya qilishni talab qiladi.
- Asinxron chegaralar hozirda sinxron boʻlgan xizmat kodiga tarqalishi mumkin.
- Backendlararo semantika SQL sintaksisi mosligidan tashqari muvofiqlik testlarini talab qiladi.
- Zaxira nusxalash, qidiruv, vektorlarni saqlash va texnik xizmat koʻrsatish imkoniyatlarga xos boʻlib qoladi.
- Bittadan ortiq saqlash implementatsiyasini ishlatish CI va operatsion qoʻllab-quvvatlash xarajatlarini oshiradi.

## Maqsadga kirmaydigan jihatlar

Ushbu ADR quyidagilarni amalga oshirmaydi:

- maʼlumotlar bazasi bogʻliqligi, muhit oʻzgaruvchisi, sxema yoki migratsiyani qoʻshish;
- amaldagi SQLite singletonini yoki drayverlar kaskadini oʻzgartirish;
- muayyan relizda PostgreSQL yoki MySQL qoʻllab-quvvatlanishini vaʼda qilish;
- FTS5, `sqlite-vec`, zaxira fayllari yoki SQLite texnik xizmatini portativ qilish;
- umumiy holat va muvofiqlashtirish testlari mavjud boʻlishidan oldin active-active rejimiga tayyorlikni belgilash;
- `src/lib/db/`ni bir urinishda qayta yozishni tasdiqlash.

## Maintainer tasdigʻi uchun ochiq savollar

1. Repozitoriy va ichki asinxron backend chegarasi afzal yoʻnalishmi yoki
   tashqi doimiy saqlash alohida boshqaruv tekisligi xizmati ortida joylashishi kerakmi?
2. SQLite muvofiqligidan keyingi birinchi tashqi implementatsiya sifatida PostgreSQL maqbulmi?
3. Qaysi domen birinchi chegaralangan repozitoriy qismi boʻlishi kerak?
4. Birinchi koʻp replika bosqichi uchun qaysi holat umumiy boʻlishi, qaysi biri esa tugunga xos boʻlib qolishi kerak?
5. Uzilib qolgan yoki ortga qaytarilgan repozitoriy migratsiyasi uchun qanday muvofiqlik davri talab etiladi?

Bu savollar hal etilmaguncha, ushbu hujjat taklif hisoblanadi va bajarilish vaqtidagi hech qanday refaktoring nazarda tutilmaydi.
