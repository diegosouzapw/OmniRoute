# Public Credentials Handling (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Haqiqat manbasi:** `open-sse/utils/publicCreds.ts`
> **Testlar:** `tests/unit/publicCreds.test.ts`
> **Oxirgi yangilanish:** 2026-08-07 — v3.8.50
> **Auditoriya:** Ommaviy CLI vositalarida ochiq OAuth client_id / client_secret / Firebase Web API kalitlarini taqdim etadigan provayderlarni integratsiya qiluvchi muhandislar.
> **Holat:** Yuqori oqim identifikatorlarini joylashtiradigan barcha yangi kodlar uchun **MAJBURIY**.

## Bu nima uchun mavjud

- [Mahalliy ilovalar uchun OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — o‘rnatilgan ilovalar uchun OAuth client_id / client_secret ochiq hisoblanadi; haqiqiy xavfsizlikni PKCE taʼminlaydi.
- [Firebase API kalitlari](https://firebase.google.com/docs/projects/api-keys) — veb-mijoz identifikatorlari ataylab ochiq qilib yaratilgan.

OmniRoute bu qiymatlarni ichiga joylashtirishi kerak, shunda `.env` faylini sozlamagan foydalanuvchilar ham hech qanday qo‘shimcha sozlashsiz ishlaydigan OAuth oqimiga ega bo‘ladi. Ichki zaxira qiymatisiz Gemini / Antigravity provayderlari “shunchaki klonlash va ishga tushirish” yo‘lidan foydalanadigan har qanday foydalanuvchi uchun ishlamay qoladi.

Biroq, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` kabi literal qiymatlar **GitHub Secret Scanning**, **Semgrep** va shunga o‘xshash andoza skanerlari tomonidan aniqlanadi. Har bir reliz yolg‘on musbat natijalarning shovqinli oqimiga aylanadi, yuborish himoyasi qonuniy commitlarni bloklaydi va operatorlar ogohlantirishlar oqimiga ishonmay qo‘yadi.

`open-sse/utils/publicCreds.ts` yordamchisi ikkala cheklovni bir vaqtning o‘zida hal qiladi:

- Ochiq identifikatorni **XOR bilan niqoblangan baytlar ketma-ketligi** sifatida joylashtiradi (manba kodida skaner andozasi bo‘lmaydi).
- Ishlash vaqtida `decodePublicCred` / `resolvePublicCred` orqali dekodlaydi.
- Taniqli prefikslarga (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) mos keladigan xom qiymatlarni aniqlaydi va ularni o‘zgartirmasdan uzatadi, shu sababli mavjud `.env` fayllarida xom qiymatlardan foydalanadigan foydalanuvchilar **hech qanday migratsiyasiz** ishlashda davom etadi.

Bu **shifrlash emas, balki obfuskatsiyadir.** Manba kodini o‘qigan har kim qiymatni tiklay oladi — bu muammo emas, chunki qiymat ataylab ochiq qilingan. Yagona maqsad — skanerning muntazam ifoda andozalariga mos kelishdan qochish.

## Majburiy andoza

### 1. Yangi ochiq hisob maʼlumotini qo‘shish

Quyidagi shartlarga mos keladigan, yuqori oqim tomonidan taqdim etilgan yangi qiymatni joylashtirish kerak bo‘lganda:

- u ochiq CLI / ish stoli ilovasi / brauzer to‘plamidan keladi, **va**
- yuqori oqim provayderi uni ochiq mijoz identifikatori sifatida hujjatlashtiradi (yoki shunday deb hisoblaydi), **va**
- aks holda andoza skaneri uni aniqlaydi (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` va hokazo),

…quyidagi nazorat ro‘yxatiga amal qiling:

1. Niqoblangan baytlar ketma-ketligini yarating:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` ichidagi `EMBEDDED_DEFAULTS` ga **neytral kalit nomi** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` va hokazo) bilan yangi yozuv qo‘shing. Yordamchida `client_secret` yoki `api_key` kabi nomlardan **foydalanmang** — bu so‘zlar Semgrep umumiy maxfiy maʼlumot qoidalarini ishga tushiradi.

3. Ochiq tur birlashmasiga `keyof typeof EMBEDDED_DEFAULTS` qo‘shing (u avtomatik ravishda aniqlanadi).

4. Isteʼmolchi kodida qattiq kodlangan literalni quyidagiga almashtiring:

   ```ts
   // bitta muhit o‘zgaruvchisi orqali qayta belgilash
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // bir nechta muhit o‘zgaruvchisi taxalluslari (birinchi bo‘sh bo‘lmagan qiymat tanlanadi)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // muhit o‘zgaruvchisi orqali qayta belgilash yo‘q (har doim ichki standart qiymat)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Literalni `.env.example` faylidan olib tashlang (uni o‘quvchilarni shu yerga yo‘naltiradigan faqat izohdan iborat hujjat bilan almashtiring):

   ```dotenv
   # ── Provayder (Google / Firebase / va hokazo) ──
   # Ochiq OAuth hisob maʼlumotlari kodga
   # open-sse/utils/publicCreds.ts orqali joylashtirilgan. Bu o‘zgaruvchilarni faqat o‘zingiznikidan foydalanish uchun sozlang.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Yangi kalit uchun shakl tekshiruvini qo‘shish maqsadida `tests/unit/publicCreds.test.ts` faylini yangilang (literal qiymatni emas, formatni tekshiring — andoza uchun mavjud testlarga qarang).

7. Test fayllariga **hech qachon** `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literallarini qo‘shmang. `.join("")` fragmentlaridan tuzilgan `FAKE_*` konstantalaridan foydalaning (mavjud testlarga qarang).

### 2. Isteʼmolchilar

- **Faqat `resolvePublicCred()` / `resolvePublicCredMulti()` orqali o‘qing** — yordamchidan tashqarida hech qachon `decodePublicCredBytes()` ni to‘g‘ridan-to‘g‘ri chaqirmang.
- Yordamchi ataylab yengil (baytlar ustida chiziqli XOR) qilingan va uni modul yuklanish vaqtida chaqirish xavfsiz; standart qiymatlar bir marta hisoblanadi.
- Muhit o‘zgaruvchisi orqali qayta belgilash har doim ustun keladi. Agar foydalanuvchi `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` ni o‘rnatsa, yordamchi ushbu xom qiymatni o‘zgartirmasdan uzatadi.

### 3. Taqiqlangan andozalar

❌ Ishlab chiqarish kodida (`src/`, `open-sse/`, `electron/`, `bin/`) quyidagilardan birortasini **hech qachon** qilmang:

```ts
// YOMON: literal qiymat Secret Scanning + Semgrep ni ishga tushiradi
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// YOMON: literalning base64 ko‘rinishi — GitHub 2025-yil fevralidan beri buni ham aniqlaydi
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// YOMON: ishlash vaqtida andozani qayta yig‘adigan satrlarni birlashtirish
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// YOMON: hex/ROT13 kodlash — boshqa obfuskatsiya, aniqlanish xavfi bir xil
clientSecret: hexDecode("474f4353..."),
```

Bularning barchasi oxir-oqibat skanerni ishga tushiradi. `resolvePublicCred()` dan foydalaning.

❌ `.env.example` fayliga literal hisob maʼlumotlarini **hech qachon** qo‘shmang. Haqiqiy yuqori oqim qiymatlariga muhtoj foydalanuvchilar ularni ochiq CLI vositasidan mustaqil ravishda ajratib olishi yoki o‘z OAuth ro‘yxatdan o‘tkazishidan foydalanishi mumkin.

❌ Hisob maʼlumoti ushbu yordamchiga ko‘chirilishi kerakmi yoki yo‘qligini avval tekshirmasdan yangi maxfiy maʼlumotni skanerlash ogohlantirishini **hech qachon** rad etmang.

## Tegishli boshqaruv elementlari

- `publicCreds.ts` faylidagi `RAW_VALUE_PATTERN` toʻgʻridan-toʻgʻri uzatishni faollashtiradigan prefikslarni sanab oʻtadi (retrocompat). Uni faqat hujjatlashtirilgan ochiq hisob maʼlumotlari formatlari uchun kengaytiring, hech qachon mulkiy maxfiy maʼlumotlar uchun emas.
- `.env.example` CI tizimining `check-env-doc-sync` skriptida ishlatiladi — bu yerdan oʻzgaruvchini olib tashlaganingizda, hujjatlar ham mos kelishiga ishonch hosil qiling.
- `npm run test:vitest` va `node --import tsx/esm --test tests/unit/publicCreds.test.ts` test toʻplamlarining ikkalasi ham muvaffaqiyatli oʻtishi shart.

## Bu yordamchidan qachon foydalanmaslik kerak

Bu yordamchi **faqat** quyidagi hisob maʼlumotlari uchun moʻljallangan:

1. Yuqori oqim provayderi tomonidan ommaviy tarqatiladigan (CLI binar fayli, brauzer toʻplami, rasmiy hujjatlar).
2. Maxfiy emasligi hujjatlashtirilgan yoki aniq anglashiladigan (PKCE bilan himoyalangan, Firebase Web kaliti va shunga oʻxshash).

Qolgan barcha holatlarda — operator tomonidan berilgan tokenlar, har bir mijozga tegishli maxfiy maʼlumotlar, oʻzingizning OAuth ilovangiz `client_secret` qiymati, shifrlash kalitlari, JWT maxfiy kalitlari, maʼlumotlar bazasi parollari — **faqat muhit oʻzgaruvchilaridan** foydalaning (`process.env.FOO`, `||` orqali boʻsh qiymatga qaytish / aniq xatolik). Bular manba kodida emas, balki `.env` fayli va [shifrlangan hisob maʼlumotlari ombori](./COMPLIANCE.md)da saqlanishi kerak.

## Manbalar

- [Google: mahalliy ilovalar uchun OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: mijozni identifikatsiya qilish uchun API kalitlari](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning qoʻllab-quvvatlaydigan maxfiy maʼlumotlar](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: tokenlarni base64 formatida aniqlash (2025-yil fevral)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Ushbu yordamchini joriy qilgan commit: `1a39c31f` — _fix(security): ochiq yuqori oqim hisob maʼlumotlarini niqoblash va xatolarni xavfsizlashtirishni markazlashtirish_
