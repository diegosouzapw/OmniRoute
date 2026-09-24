# Management Authentication (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute'da **to'rtta hisobga olish ma'lumotlari oilasi** mavjud bo'lib, ular boshqaruv marshrutlarini avtorizatsiya qila oladi.
Ular bir-birini almashtira olmaydi. Inference API kalitlari (`sk-…`) serverni boshqarmaydi,
agar ularga aniq `manage` yoki `admin` doirasi berilmagan bo'lsa.

Kanonik amalga oshirish: `src/lib/api/requireManagementAuth.ts`.

| Hisobga olish ma'lumotlari | Odatiy shakl                             | Qayerda yaratilgan                                         | Mo'ljallangan foydalanish      | Boshqaruv imkoniyati                                                                                  |
| :------------------------- | :--------------------------------------- | :--------------------------------------------------------- | :----------------------------- | :---------------------------------------------------------------------------------------------------- |
| Dashboard JWT sessiyasi    | `auth_token` cookie                      | Dashboardga kirish                                         | Brauzer interfeysi             | CSRF, joylashuv va doimiy himoyalangan marshrut qoidalariga bo'ysunadigan to'liq dashboard boshqaruvi |
| CLI machine-id tokeni      | ichki / mahalliy                         | CLI bootstrap (`omniroute` bir xil mashinada)              | Mahalliy CLI                   | Faqat mahalliy boshqaruv                                                                              |
| Doirali kirish tokeni      | `oma_live_…`                             | **Sozlamalar → Kirish Tokenlari** yoki `omniroute connect` | Masofaviy CLI va boshqaruv API | Marshrutning talab qilinadigan `read`, `write` yoki `admin` doirasiga mos kelishi kerak               |
| Inference API kaliti       | `sk-…` (va boshqa API-kalit prefikslari) | **API menejeri / API kalitlari**                           | `/v1/*` inference              | **Hech qanday** agar kalit metama'lumotlarida `manage` yoki `admin` bo'lmasa                          |

`oma_` hisobga olish ma'lumotlari boshqaruv/CLI hisobga olish ma'lumotlaridir. Ular inference API kalitlari **emas**.

Agar server uchun kirish/API-kalit autentifikatsiyasi o'chirilgan bo'lsa, ba'zi boshqaruv marshrutlari
autentifikatsiyadan o'tmagan chaqiruvlarni qabul qilishi mumkin. Faqat mahalliy va doimiy himoyalangan marshrutlar
o'z qoidalarini qo'llashda davom etadi. Shuning uchun, ushbu hisobga olish ma'lumotlaridan birini taqdim etish universal
majburiy emas, va unga ega bo'lish talab qilingan doira va marshrut joylashuvisiz universal yetarli emas.

Bog'liq: [Masofaviy rejim](./REMOTE-MODE.md) (`oma_live_…` masofaviy CLI uchun qanday yaratilishi).

---

## Doiraviy matritsalar

API-kalit boshqaruvi doiralari va kirish tokeni doiralari turli xil lugʻatlardir.
MCP vositasi doiralari uchinchi lugʻat boʻlib, quyidagi jadvallardagi funksiyalardan koʻra
`scopeMatches` bilan tekshiriladi. Yonma-yon:
[Uchta doiraviy nom maydoni](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Kirish tokeni doiralari (`oma_live_…`)

| Doira   | Odatdagi operatsiyalar                                                    |
| ------- | ------------------------------------------------------------------------- |
| `read`  | Token koʻrishga ruxsat berilgan roʻyxat/holat GET soʻrovlari              |
| `write` | Admin ostidagi oʻzgarishlar (yaratish/yangilash/oʻchirish)                |
| `admin` | Toʻliq masofaviy CLI / ulanish tokeni (parol bootstrap bu yerda standart) |

`read` doirasiga ega token `write` yoʻnalishini chaqira olmaydi. Ishlash vaqtidagi xabar shakli:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-kalit boshqaruvi doiralari

| Doira    | Maʼnosi                                                                       |
| -------- | ----------------------------------------------------------------------------- |
| (none)   | Faqat xulosa. Boshqaruv yoʻnalishlari 403 qaytaradi.                          |
| `manage` | Boshqaruv API (xuddi `requireManagementAuth` API-kalit tarmogʻi kabi)         |
| `admin`  | Shuningdek, `hasManageScope` ni qondiradi (boshqaruvga qodir deb hisoblanadi) |

API Keys / API Manager UI da kalitda `manage` ni yoqing. Agar siz ushbu doirani ataylab bermagan boʻlsangiz, avtomatlashtirish uchun chat mijozining kalitini qayta ishlatmang.

---

## Qanday yaratish va bekor qilish

### Dashboard JWT seansi

1. `/login`ni oching va boshqaruv paroli bilan kiring (birinchi ishga tushirishda `INITIAL_PASSWORD`).
2. `auth_token` cookie fayli HttpOnly hisoblanadi. Brauzerdagi dashboard undan avtomatik foydalanadi.
3. `/api/auth/logout` orqali tizimdan chiqing. Nusxalash uchun uzoq muddatli maxfiy qiymat mavjud emas.

### CLI machine-id tokeni

1. `omniroute`ni server bilan **bir xil hostda** ishga tushiring (loopback).
2. CLI `~/.omniroute/` ichida machine-id tokenining boshlangʻich sozlamasini yaratadi (chmod 600).
3. Bu boshqa mashinadan **ishlamaydi**. Masofaviy CLI uchun Access Tokenʼdan foydalaning.

### Doirasi belgilangan Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → yaratish (nom + doira). **Maxfiy qiymat faqat bir marta koʻrsatiladi.**
2. Yoki CLI: `omniroute connect <host>` (parol → token). [Masofaviy rejim](./REMOTE-MODE.md)ga qarang.
3. Sarlavha: `Authorization: Bearer oma_live_…`
4. Xuddi shu Access Tokens sahifasida bekor qiling (yoki CLI kontekstini oʻchiring).
5. Server faqat xeshni saqlaydi. Ochiq matndagi qiymatga parol kabi munosabatda boʻling.

### `manage` doirasiga ega API kaliti

1. Dashboard: **API Manager / API Keys** → kalit yarating yoki tahrirlang → `manage`ni (yoki `admin`ni) yoqing.
2. Sarlavha: `Authorization: Bearer sk-…` (kalitning haqiqiy prefiksi).
3. Xuddi shu interfeysda kalitni bekor qiling yoki `manage` doirasini olib tashlang.
4. CLI boʻlmagan avtomatlashtirish uchun eng kam imtiyoz tamoyiliga amal qiling: faqat GET vazifalari uchun `read` Access Tokenʼni afzal koʻring; API kalitida `manage`dan faqat chaqiruvchi ham `/v1`, ham boshqaruv APIʼsi bilan ishlashi kerak boʻlganda foydalaning.

---

## Sarlavha formati

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Boshqaruv hisob maʼlumotlarini URL yoʻliga yoki soʻrovlar qatoriga joylashtirmang. Boshqaruv autentifikatsiyasi faqat sarlavha/cookie orqali amalga oshiriladi.

---

## Nusxalab ishlatish mumkin boʻlgan misollar

Faqat oʻqish (provayderlar roʻyxatini olish). `read` Access Token’dan foydalaning:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Oʻzgartirish (provayder ulanishini yaratish). `write`/`admin` Access Token yoki
`manage` doirasiga ega API kalitidan foydalaning:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferensiya (boshqaruv emas). Oddiy API kaliti, `manage` talab qilinmaydi:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Joriy ish vaqti xatolari (maxfiy ma'lumotlarni aks ettirmang)

| Vaziyat                                        | Odatiy holat | Xabar (tozalangan)                                                   |
| :--------------------------------------------- | :----------- | :------------------------------------------------------------------- |
| Hisobga olish ma'lumotlari yo'q                | 401          | `Authentication required`                                            |
| Yaroqsiz/muddati o'tgan `oma_live_…`           | 401          | `Invalid or expired access token`                                    |
| `manage`/`admin` ruxsatisiz haqiqiy API kaliti | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Boshqaruv yo'lida yaroqsiz oddiy API kaliti    | 403          | `Invalid management token`                                           |
| Kirish tokenining ruxsat doirasi juda past     | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" bu tashuvchi boshqaruv hisobga olish ma'lumotlari sifatida **qabul qilinmaganini** anglatadi. U sizga qaysi oilani yaratishni **aytmaydi**. Yuqoridagi jadvaldan foydalaning: xulosa kalitlari `manage` ruxsat doirasini talab qiladi; masofaviy CLI `oma_live_…` ni talab qiladi; boshqaruv paneli sessiya kukisidan foydalanadi.

---

## Tavsiya etilgan eng kam imtiyozli tanlov

| Chaquiruvchi                                   | Foydalanish                                               |
| :--------------------------------------------- | :-------------------------------------------------------- |
| Brauzer                                        | Boshqaruv paneli sessiyasi                                |
| Server xostidagi CLI                           | Mashina tokeni                                            |
| Noutbukdagi CLI uzoq server bilan gaplashadi   | `omniroute connect` dan `oma_live_…`                      |
| CI / skriptlar (faqat boshqaruv)               | Eng kichik ishlaydigan doiradagi `oma_live_…`             |
| `/v1` va `/api` ni chaqirishi kerak bo'lgan CI | `manage` **yoki** ikkita hisob ma'lumotiga ega API kaliti |
