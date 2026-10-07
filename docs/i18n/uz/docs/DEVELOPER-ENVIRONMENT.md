# Developer environment notes (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Ushbu sahifada loyihaning lokal `.env` fayli bilan bogʻliq xatti-harakati hamda OmniRouteʼni ishlab chiqishda muhit fayllari va maxfiy maʼlumotlardan qanday foydalanish tushuntiriladi.

## .env postinstall xatti-harakati

Loyiha dasturchilarga qulaylik yaratish maqsadida `npm install` / `postinstall` jarayonida lokal `.env` faylini yaratishi mumkin. Bu fayl faqat lokal ishlab chiqish va sinov uchun moʻljallangan hamda hech qachon versiyalarni boshqarish tizimiga yuborilmasligi kerak.

Asosiy jihatlar:

- Repozitoriyning `.gitignore` fayli allaqachon `.env*` fayllarini eʼtiborsiz qoldiradi (`.gitignore` yozuviga qarang). Muayyan namuna faylini ataylab repozitoriyga yubormoqchi boʻlmasangiz va buning uchun hujjatlashtirilgan jarayonga ega boʻlmasangiz, ushbu qoidani olib tashlamang yoki oʻzgartirmang.
- Agar haqiqiy maxfiy maʼlumot tasodifan repozitoriyga yuborilsa, hisob maʼlumotini darhol almashtiring/bekor qiling va uni repozitoriy tarixidan olib tashlang (masalan, `git filter-repo` yoki unga teng tiklash jarayonidan foydalanib). Yordam kerak boʻlsa, xavfsizlik boʻyicha masʼul shaxsga murojaat qiling.
- CI va ishlab chiqarish muhiti uchun maxfiy maʼlumotlarni fayllarga yuborish oʻrniga CI maxfiy maʼlumotlari yoki maxfiy maʼlumotlar boshqaruvchisidan (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault va hokazo) foydalaning.

## Tavsiya etiladigan lokal ish jarayoni

- `.env` faylini faqat lokal ish maydoningizda saqlang. Zarur oʻzgaruvchilar va maqbul namuna qiymatlarini hujjatlashtirish uchun `.env.example` faylidan (u allaqachon kuzatuvga olingan) foydalaning.
- Maxfiy maʼlumotlarga oʻxshash qiymatlarni talab qiladigan sinovlarni lokal ravishda ishga tushirganda, haqiqiy hisob maʼlumotlari oʻrniga sintetik toʻldiruvchi qiymatlar yoki bajarilish vaqtida yaratiladigan vaqtinchalik kalitlardan foydalanishni afzal koʻring.
- Tekshiruvchilar test maʼlumotlari sintetik ekanini tushunishlari uchun toʻldiruvchi qiymatlardan foydalanadigan sinovlarga qisqa izoh qoʻshing.

## Skaner boʻyicha eslatmalar

- Ayrim kompilyatsiya qilingan yoki ikkilik resurslar (masalan, ichiga joylashtirilgan base64 WASM bloblari) hisob maʼlumotlariga oʻxshaydigan ASCII qism-satrlarini oʻz ichiga olishi va matnga asoslangan maxfiy maʼlumotlar skanerlarini ishga tushirishi mumkin. Agar bu resurslar qonuniy boʻlsa, ularni skanerning ruxsat etilganlar roʻyxatiga kiriting yoki skaner konfiguratsiyasida tegishli kataloglarni tekshiruvdan chiqarib tashlang.

## Sizib chiqishni aniqlasangiz

1. Kalitni darhol almashtiring/bekor qiling.
2. Maxfiy maʼlumotni tarixdan olib tashlang va zarur boʻlsa, tozalangan tarmoqni majburan yuboring.
3. Qoʻllab-quvvatlovchilarga xabar bering va tashkilotingizning hodisalarga javob berish nazorat roʻyxatiga amal qiling.
