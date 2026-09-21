# Management Authentication (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute boshqaruv marshrutlarini avtorizatsiya qila oladigan **toʻrtta hisob maʼlumotlari oilasiga** ega.
Ular oʻzaro almashtirilmaydi. Inferens API kalitlari (`sk-…`), agar ularga aniq ravishda
`manage` yoki `admin` doirasi berilmagan boʻlsa, serverni **boshqarmaydi**.

Kanonik implementatsiya: `src/lib/api/requireManagementAuth.ts`.

| Hisob maʼlumoti                  | Odatdagi shakli                           | Qayerda yaratiladi                                           | Moʻljallangan foydalanish         | Boshqaruv imkoniyati                                                                                       |
| -------------------------------- | ----------------------------------------- | ------------------------------------------------------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Dashboard JWT seansi             | `auth_token` cookie fayli                 | Dashboard orqali kirish                                      | Brauzer interfeysi                | CSRF, lokallik va doimo himoyalangan marshrut qoidalariga amal qilgan holda dashboardʼni toʻliq boshqarish |
| CLI machine-id tokeni            | ichki / lokal                             | CLI boshlangʻich sozlamasi (xuddi shu mashinada `omniroute`) | Lokal CLI                         | Faqat lokal boshqaruv                                                                                      |
| Doirasi belgilangan Access Token | `oma_live_…`                              | **Settings → Access Tokens** yoki `omniroute connect`        | Masofaviy CLI va boshqaruv APIʼsi | Marshrut talab qiladigan `read`, `write` yoki `admin` doirasiga mos kelishi kerak                          |
| Inferens API kaliti              | `sk-…` (va boshqa API kaliti prefikslari) | **API Manager / API Keys**                                   | `/v1/*` inferensi                 | Kalit metamaʼlumotlarida `manage` yoki `admin` boʻlmasa, **hech qanday**                                   |

`oma_` hisob maʼlumotlari boshqaruv/CLI hisob maʼlumotlaridir. Ular inferens API kalitlari **emas**.

Agar server uchun kirish/API kaliti orqali autentifikatsiya oʻchirilgan boʻlsa, ayrim boshqaruv marshrutlari
autentifikatsiyasiz chaqiruvlarni qabul qilishi mumkin. Faqat lokal va doimo himoyalangan marshrutlarda
baribir oʻz qoidalari amal qiladi. Shu sababli, bu hisob maʼlumotlaridan birini taqdim etish barcha holatlarda
majburiy emas va kerakli doira hamda marshrut lokalligisiz unga egalik qilish ham barcha holatlarda yetarli emas.

Tegishli: [Masofaviy rejim](./REMOTE-MODE.md) (`oma_live_…` masofaviy CLI uchun qanday yaratilishi).

---

## Doiralar matritsalari

Bu ikki doira lugʻati **bir-biridan farq qiladi**. Ularni aralashtirmang.

### Access Token doiralari (`oma_live_…`)

| Doira   | Odatdagi amallar                                                                            |
| ------- | ------------------------------------------------------------------------------------------- |
| `read`  | Token koʻrishiga ruxsat berilgan roʻyxat/holat GET soʻrovlari                               |
| `write` | Admin darajasidan pastdagi oʻzgartirishlar (yaratish/yangilash/oʻchirish)                   |
| `admin` | Toʻliq masofaviy CLI / ulanish tokeni (parol orqali boshlangʻich sozlashda standart qiymat) |

`read` doirasiga ega token `write` marshrutini chaqira olmaydi. Ish vaqtidagi xabar shakli:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API kalitining boshqaruv doiralari

| Doira    | Maʼnosi                                                                                |
| -------- | -------------------------------------------------------------------------------------- |
| (yoʻq)   | Faqat inferens. Boshqaruv marshrutlari 403 qaytaradi.                                  |
| `manage` | Boshqaruv APIʼsi (`requireManagementAuth` API kaliti tarmogʻi bilan bir xil tekshiruv) |
| `admin`  | `hasManageScope` talabini ham qondiradi (boshqaruv imkoniyatiga ega deb qaraladi)      |

Kalit uchun API Keys / API Manager interfeysida `manage`ni yoqing. Agar bu doirani ataylab
bermagan boʻlsangiz, avtomatlashtirish uchun chat mijozi kalitidan qayta foydalanmang.

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

## Joriy ish vaqti xatolari (sirlarni aks ettirmang)

| Vaziyat                                           | Odatdagi holat | Xabar (maxfiy maʼlumotlardan tozalangan)                                      |
| ------------------------------------------------- | -------------- | ----------------------------------------------------------------------------- |
| Hisob maʼlumoti yoʻq                              | 401            | `Autentifikatsiya talab qilinadi`                                             |
| Yaroqsiz/muddati tugagan `oma_live_…`             | 401            | `Yaroqsiz yoki muddati tugagan kirish tokeni`                                 |
| `manage`/`admin` huquqisiz yaroqli API kaliti     | 403            | `API kalitida 'manage' doirasi yoʻq. Uni API Keys boshqaruv panelida yoqing.` |
| Boshqaruv marshrutidagi yaroqsiz oddiy API kaliti | 403            | `Yaroqsiz boshqaruv tokeni`                                                   |
| Access Token doirasi yetarli emas                 | 403            | `Kirish tokenining '<have>' doirasi yetarli emas; '<need>' talab qilinadi.`   |

"Yaroqsiz boshqaruv tokeni" degani bearer boshqaruv hisob maʼlumoti sifatida **qabul qilinmaganini** anglatadi. Bu qaysi turdagi hisob maʼlumotini yaratish kerakligini **bildirmaydi**. Yuqoridagi jadvaldan foydalaning:
inferensiya kalitlariga `manage` doirasi kerak; masofaviy CLI uchun `oma_live_…` kerak; boshqaruv paneli esa seans cookie’sidan foydalanadi.

---

## Tavsiya etilgan minimal imtiyozli tanlov

| Chaqiruvchi                                                | Foydalaniladigan vosita                                           |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| Brauzer                                                    | Boshqaruv paneli seansi                                           |
| Server xostidagi CLI                                       | Mashina tokeni                                                    |
| Masofaviy server bilan aloqa qiluvchi noutbukdagi CLI      | `omniroute connect` orqali olingan `oma_live_…`                   |
| CI / skriptlar (faqat boshqaruv)                           | Ishlaydigan eng kichik doiraga ega `oma_live_…`                   |
| Ham `/v1`, ham `/api`’ga murojaat qilishi kerak boʻlgan CI | `manage` doirasiga ega API kaliti **yoki** ikkita hisob maʼlumoti |
