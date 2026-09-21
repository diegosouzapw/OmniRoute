# CLI Machine-ID Token (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Umumiy ko‘rinish

OmniRoute CLI buyruqlari mahalliy boshqaruv API’sida so‘rov sarlavhasi orqali
yuboriladigan `HMAC-SHA256(machine-id, salt)` tokenidan foydalanib
`x-omniroute-cli-token` autentifikatsiyasidan o‘tadi.

Bu CLI quyi buyruqlariga (`omniroute status`, `omniroute providers` va boshqalar)
foydalanuvchidan har bir chaqiruvda JWT yoki parol taqdim etishini talab qilmasdan
boshqaruv endpointlariga murojaat qilish imkonini beradi.

## Ishlash tartibi

1. `getMachineTokenSync()` apparat qurilmasi identifikatorini `node-machine-id`
   orqali o‘qiydi (xatolik yuz bersa, bo‘sh satrga qaytadi va CLI
   autentifikatsiyasini o‘chiradi).
2. U `HMAC-SHA256(machine_id, salt)`ni hisoblaydi va to‘liq 64 belgili
   o‘n oltilik dayjestni qaytaradi — bu ushbu qurilmaga bog‘langan,
   deterministik va qaytarib bo‘lmaydigan tokendir.
3. CLI tokenni `x-omniroute-cli-token` sifatida faqat aniqlangan manzil aniq
   loopback URL (`localhost`, `127.0.0.0/8` yoki loopback IPv6) bo‘lgandagina
   yuboradi. Tokenni o‘z ichiga olgan so‘rovlar `redirect: error`dan foydalanadi,
   shu sababli mahalliy qayta yo‘naltirish uni boshqa manbaga uzata olmaydi.
   Masofaviy kontekstlarda esa cheklangan doiradagi kirish tokenlari ishlatiladi.
   Agar tokenni hosil qilish imkonsiz bo‘lsa, CLI sarlavhani yubormaydi va
   `omniroute doctor` bo‘sh tokenni yaroqli deb hisoblash o‘rniga xatolik haqida
   xabar beradi.
4. Server (`src/server/authz/policies/management.ts`) kutilgan tokenni ayni salt
   bilan qayta hisoblaydi va vaqtga asoslangan ajratib olishning oldini olish
   uchun `timingSafeEqual` orqali taqqoslaydi.

## Xavfsizlik xususiyatlari

| Xususiyat                                                  | Tafsilot                                                                                                                                                                                                                              |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Faqat loopback**                                         | Faqat serverning ishonchli tugun-lokallik belgisi (haqiqiy TCP tugun manzilidan hosil qilinadi) loopback ekanini ko‘rsatganda qabul qilinadi. Lokallikni aniqlashda mijoz boshqaradigan `Host` sarlavhasiga hech qachon ishonilmaydi. |
| **Doimiy vaqtda taqqoslash**                               | `crypto.timingSafeEqual` vaqt tahliliga asoslangan hujumlarning oldini oladi.                                                                                                                                                         |
| **Qaytarib bo‘lmaydi**                                     | HMAC chiqishidan machine-id’ni tiklab bo‘lmaydi.                                                                                                                                                                                      |
| **`always` bilan himoyalangan yo‘llarni chetlab o‘tmaydi** | `isAlwaysProtectedPath()` CLI tokeni tekshirilishidan oldin baholanadi. `/api/shutdown` va `/api/settings/database` har doim JWT talab qiladi.                                                                                        |
| **Eksport qilib bo‘lmaydi**                                | Token hech qachon diskka yozilmaydi yoki jurnallarga qayd etilmaydi.                                                                                                                                                                  |

## Standart salt (har bir o‘rnatish uchun tasodifiy)

`OMNIROUTE_CLI_SALT` o‘rnatilmagan bo‘lsa, salt bir marta yaratiladigan va
`<DATA_DIR>/cli-token-salt.json` manzilida (`0600` rejimida) saqlanadigan tasodifiy
64 belgili o‘n oltilik satr bo‘ladi — repozitoriyga kiritilgan
`omniroute-cli-auth-v1` literali emas. `src/lib/machineToken.ts` ichidagi
`getActiveSalt()` hamda uning `bin/cli/utils/cliToken.mjs` ichidagi nusxasi bir xil
faylni o‘qiydi, shu sababli server va ushbu o‘rnatishdagi har bir CLI chaqiruvi bir
xil qiymatdan foydalanadi; repozitoriyga kiritilgan literal faqat saqlangan yoki
muhit saltini hali aniqlab bo‘lmaydigan holatlarda so‘nggi zaxira sifatida
ishlatiladi (masalan, server hali biror marta ishga tushirilmagan, faqat CLI’dan
iborat yangi o‘rnatishda). Bu avvalgi o‘zgarmas literal standartining zaifligini
bartaraf etadi: `/etc/machine-id` odatda barcha foydalanuvchilar tomonidan
o‘qilishi mumkin, shuning uchun aks holda istalgan mahalliy foydalanuvchi
`OMNIROUTE_CLI_SALT` hech qachon o‘rnatilmagan har bir o‘rnatish uchun ayni tokenni
hosil qilishi mumkin edi.

## Saltni almashtirish

Hosil qilingan tokenni kodga o‘zgartirish kiritmasdan almashtirish uchun `OMNIROUTE_CLI_SALT` ni o‘rnating — u har doim har bir o‘rnatish uchun saqlangan saltdan ustun turadi. Almashtirilgandan so‘ng, ushbu kompyuterdagi barcha CLI jarayonlari yangi tokendan avtomatik ravishda foydalanadi. Bu jarayonlar ro‘yxatining sizib chiqishi natijasida avvalgi hosil qilingan qiymat oshkor bo‘lishi mumkin bo‘lgan holatlarda foydalidir.

```bash
# Doimiy almashtirish (shell profiliga qo‘shing)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Yangi token ishlatilayotganini tekshiring
omniroute status
```

## Eski format (SHA-256, 32 ta belgi) — hali ham qabul qilinadi

Yuqoridagi HMAC formatidan oldin CLI o‘z tokenini `bin/cli/utils/cliToken.mjs` faylida (`src/lib/machineToken.ts` faylidagi `getLegacyCliTokenSync`) `SHA-256(machineId + salt).hex[0..32]` (32 belgili prefiks) sifatida hosil qilgan.

Orqaga muvofiqlik uchun server **ikkala** formatni ham qabul qiladi: tekshiruvchi `expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ro‘yxatini tuzadi va kiruvchi sarlavhani `timingSafeEqual` yordamida har biri bilan solishtiradi (`src/server/authz/policies/management.ts` va `src/lib/middleware/cliTokenAuth.ts`). Shuning uchun token 64 belgili HMAC dayjestiga **yoki** 32 belgili eski SHA-256 prefiksiga mos kelsa, haqiqiy hisoblanadi.

**O‘chirib qo‘yish:** CLI token mexanizmini butunlay o‘chirib qo‘yish uchun `OMNIROUTE_DISABLE_CLI_TOKEN=true` qiymatini o‘rnating (muhitda yoki `.env` faylida); shundan so‘ng barcha kirishlar aniq ko‘rsatilgan API kalitini talab qiladi. Ko‘p foydalanuvchili xostlarda bu tavsiya etiladi, chunki `machine-id` har bir foydalanuvchi uchun emas, balki har bir qurilma uchun alohida bo‘ladi va ayni xostdagi boshqa foydalanuvchi ham xuddi shu tokenni hisoblab chiqishi mumkin.

## Fayllar

| Fayl                                      | Maqsad                                            |
| ----------------------------------------- | ------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Tokenni hosil qilish (`getMachineTokenSync`)      |
| `bin/cli/utils/cliToken.mjs`              | Xuddi shu hosil qilishning CLI tomonidagi nusxasi |
| `<DATA_DIR>/cli-token-salt.json`          | Har bir o‘rnatish uchun saqlangan tasodifiy salt  |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` konstantasi                    |
| `src/server/authz/policies/management.ts` | Server tomonidagi tekshiruv                       |
| `src/server/authz/routeGuard.ts`          | Loopback xostini tekshirish (`isLoopbackHost`)    |

## Shuningdek qarang

- `docs/security/ROUTE_GUARD_TIERS.md` — marshrutni himoyalash darajalari
- `docs/architecture/AUTHZ_GUIDE.md` — to‘liq avtorizatsiya konveyeri
