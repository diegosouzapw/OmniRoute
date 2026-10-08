# Router Backends & Embedded Services — architecture contract (ADR) (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Holat:** Qabul qilingan · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Shartnoma:** `domain/routing/routerBackends.ts`
> (tiplashtirilgan reyestr — kod [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) bilan qoʻshiladi)

Ushbu ADR `ts` (mahalliy), `bifrost`, `cliproxy`, `9router` va
VibeProxy bilan mos keluvchi dvigatellarning oʻzaro munosabatini aniq belgilaydi, toki hissa qoʻshuvchilar
arxitektura jihatidan bir-biridan farq qiladigan ikki tushunchani chalkashtirmasin.
Unda router-backend-registry ishi doirasida joriy etilgan tiplashtirilgan
reyestr ushbu model uchun yagona ishonchli manba sifatida hujjatlashtiriladi.

## Asosiy farq — ikkita ortogonal oʻq

Dvigatelning roli reyestrdagi `RouterBackendDefinition` ichida birgalikda kodlangan
**ikkita mustaqil oʻq** bilan tavsiflanadi:

1. **Hayotiy sikl** (`RouterBackendLifecycle`) — _dvigatel qanday ishlaydi_:
   - `in-process` — OmniRoute Node jarayoni ichida ishlaydi (mahalliy TS konveyeri).
   - `supervised` — OmniRoute `ServiceSupervisor` orqali oʻrnatadigan/ishga tushiradigan/toʻxtatadigan/sogʻligʻini tekshiradigan,
     soʻng provayder ulanishi sifatida foydalanadigan mahalliy yordamchi jarayon.
   - `external` — OmniRoute soʻrovlarni yoʻnaltiradigan, ammo boshqarmaydigan
     HTTP endpointi (muhit oʻzgaruvchisidagi bazaviy URL orqali sozlanadi).
   - `disabled` — roʻyxatdan oʻtkazilgan, ammo tanlab boʻlmaydi.
2. **Tanlash oʻqi** (rele marshrutlash backendi) — _rele unga soʻrovlarni yoʻnaltiradimi_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` faylida.

Yoʻl qoʻymaslik kerak boʻlgan xato: «ichki xizmat» va «marshrutlash backendi»ni bitta
roʻyxat sifatida qabul qilish. Ular bir xil emas. `supervised` dvigatel (9router/cliproxy) —
muqobil rele yoʻnaltirish backendi emas, balki **mahalliy konveyer foydalanadigan
provayder ulanishi**. `bifrost` esa buning aksi — u (tarixan)
faqat `external` boʻlgan rele yoʻnaltirish backendi.

## Reyestr — yagona ishonchli manba

`domain/routing/routerBackends.ts` shartnomasi (kod
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) bilan qoʻshiladi) har bir dvigatelni uning
hayotiy sikli, imkoniyatlari, xizmat identifikatori, standart porti, sogʻliqni tekshirish konfiguratsiyasi va
telemetriya qoʻllab-quvvatlashi bilan bir marta eʼlon qiladi. Isteʼmolchilar har bir yordamchi jarayon uchun
alohida maxsus mantiq yozish oʻrniga dvigatellarni `getRouterBackend(id)`,
`listRouterBackends()` va `listRouterBackendsByCapability(cap)` orqali qidiradi.

| Backend     | Hayotiy sikl | Xizmat (A oʻqi) | Rele backendi (B oʻqi) | Sogʻliq       | Standart port |
| ----------- | ------------ | --------------- | ---------------------- | ------------- | ------------- |
| `ts`        | `in-process` | —               | `ts` (mahalliy)        | —             | —             |
| `bifrost`   | `external`¹  | —¹              | `bifrost` / `auto`     | `/health`     | —             |
| `cliproxy`  | `supervised` | `cliproxy`      | — (provayder)          | `/v1/models`  | 8317          |
| `9router`   | `supervised` | `9router`       | — (provayder)          | `/api/health` | 20130         |
| `vibeproxy` | `external`   | —               | — (provayder adapteri) | `/v1/models`  | —             |

¹ Bifrost’ni `supervised` ichki xizmatga (`/api/services/bifrost/` orqali
oʻrnatiladigan/ishga tushiriladigan) aylantirish
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) da kuzatilmoqda; u birlashtirilmaguncha
Bifrost faqat `external` boʻlib qoladi (unga faqat `BIFROST_BASE_URL` orqali kirish mumkin).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) chaqiruvchilarga
har bir identifikator uchun alohida shartli tarmoqlarni qattiq kodlash oʻrniga, dvigatel amalda nimalarni bajara olishiga qarab
filtrlash imkonini beradi.

## A o‘qi — ichki xizmatlar (nazorat qilinadigan jarayon tomoni)

- **Nazorat qilinadigan jarayonlar reyestri:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (hozirda: `9router`, `cliproxy`).
- **Hayotiy sikl egasi:** `src/lib/services/ServiceSupervisor.ts` — `start()` quyi
  jarayonni ishga tushiradi, `waitForHealthy()` orqali tayyorligini kutadi, stdout/stderr oqimlarini halqali buferga
  yozadi; `stop()` SIGTERM→SIGKILL; barchasi qulf ostida ketma-ket bajariladi.
- **Holatlar birlashmasi** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, shuningdek,
  ortogonal `HealthState = healthy | unhealthy | unknown`.
- **Nega alohida jarayon (jarayon ichidagi SDK emas)?** Jarayonlarni izolyatsiyalash har bir
  sidecar uchun o‘rnatish/ishga tushirish/to‘xtatish/salomatlik/jurnallarni mustaqil boshqarish imkonini beradi va
  loopback ishga tushirish himoyasini qo‘llashga imkon yaratadi. Jarayon ichidagi adapterni modellashtirish — kelajakdagi ish;
  bu `native-hot-path` imkoniyat bayrog‘i orqali ifodalanadi.

### Hayotiy sikl marshruti shartnomasi (`/api/services/<tool>/…`)

Holat kodlari **atayin holat/amal/marshrutga xos** — bu nomuvofiqlik emas,
balki shartnomaning o‘zidir:

| Chaqiruv                         | Shart                                 | Holat                                |
| -------------------------------- | ------------------------------------- | ------------------------------------ |
| `POST .../start`                 | xizmat `not_installed` holatida       | **409** (old shart)                  |
| `POST .../stop`                  | allaqachon to‘xtatilgan               | **200** (idempotent bo‘sh amal)      |
| `GET .../status`                 | OK                                    | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                 | ishga tushirish muvaffaqiyatsiz       | **503** (vaqtinchalik)               |
| `GET .../status`, `.../stop`     | tutilmagan xato                       | **500**                              |
| `GET /api/services/<x>/logs`     | noma’lum vosita `<x>`                 | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`      | `X-Reveal-Confirm: yes` yo‘q          | **403** (faqat 9router)              |
| **har qanday** `/api/services/*` | chaqiruvchi loopback/xususiy LAN emas | **403 LOCAL_ONLY**                   |

Barcha xato tanalari `createErrorResponse()` orqali quyidagi shaklga keltiriladi →
`{ error: { message, type }, requestId }`, bunda `type` holatdan kelib chiqadi
(`500→server_error`, `404→not_found`, `409→conflict`, aks holda `invalid_request`) va
mashina tomonidan qayta ishlanadigan farqlovchi hisoblanadi. Xabarlar oldindan sanitizatsiya qilinadi
(`sanitizeErrorMessage()`, 12-qat’iy qoida).

**Loopback himoyasi** `403` holatining eng keng tarqalgan sababidir: `/api/services/`
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) tarkibiga kiradi va
`src/server/authz/policies/management.ts` loopback yoki xususiy LAN orqali kelmagan har qanday
chaqiruvchini **autentifikatsiyadan oldin** rad etadi, chunki bu marshrutlar quyi jarayonlarni ishga
tushiradi (15- va 17-qat’iy qoidalar). Ularga ommaviy tunnel orqali murojaat qilish atayin `403`
qaytaradi.

## B o‘qi — relay marshrutlash backendi (jo‘natish tomoni)

Faqat `/api/v1/relay/chat/completions` relay proksi yo‘li jo‘natish
backendini tanlaydi; asosiy `/api/v1/chat/completions` interfeysi hech qachon
`routingBackend.ts` bilan maslahatlashmaydi.

- **Tanlash** (`resolveRelayRoutingBackend`): yagona global muhit o‘zgaruvchisi —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Agar o‘rnatilmagan bo‘lsa, Bifrost sozlangan va yoqilganida `auto`, aks holda `ts`.
- **Xatti-harakat:**
  - `bifrost` (majburiy): Bifrost xatosi → qat’iy `502`, zaxira variant yo‘q.
  - `auto`: Bifrost’ni sinab ko‘radi, xato/sovish davrida jimgina mahalliy variantga o‘tadi.
  - `ts` / zaxira variantga o‘tgandan so‘ng: mahalliy `open-sse` tarjimon/bajaruvchi konveyeri.
- **Sovish davri:** `bifrostCooldown.ts` ichida har bir `baseUrl` uchun xatodan keyingi sovish davri.

Bugungi kunda tanlash relay darajasida **hammasi yoki hech narsa** tamoyiliga asoslanadi —
`release/v3.8.43` versiyasida har bir provayder yoki har bir so‘rov bo‘yicha mexanizmni
almashtirish yo‘q. Har bir so‘rov uchun darvoza sidecar manifesti ishlari orqali qo‘shilmoqda
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
bu `auto` rejimiga faqat manifest talablariga mos provayderlarni Bifrost orqali marshrutlash imkonini beradi.

## Boshqaruv paneli integratsiyasi

Xizmatlar boshqaruv paneli har 5 soniyada
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` orqali
`GET /api/services/<tool>/status` soʻrovini yuboradi va `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` qiymatini qaytaradi. Umumiy foydalanish imkoniyati konteksti provayderi mavjud emas —
har bir komponent har bir vosita uchun hookʼni chaqiradi. `!res.ok` boʻlganda hook hozirda
faqat `HTTP <status>`ni koʻrsatadi; `error.type` maydonini foydalanuvchi uchun tushunarli izohga moslash
shartnoma oʻzgarishi emas, balki kuzatuvdagi UX yaxshilanishidir.

## Oqibatlar

- Yangi dvijoklar `ROUTER_BACKENDS`da bir marta roʻyxatdan oʻtkaziladi; isteʼmolchilar ularni yangi
  har bir identifikatorga xos tarmoqlanishlarsiz, imkoniyat soʻrovlari orqali oladi.
- «Bu xizmatmi yoki marshrutlash bekendimi?» savoliga identifikator qaysi roʻyxatda paydo boʻlishi bilan emas,
  `lifecycle` maydoni orqali javob beriladi.
- Bifrost nazorati (#5817) va nativ tezkor yoʻl migratsiyasi (#5670) har bir
  sidecarʼni alohida qayta ishlash oʻrniga ushbu umumiy shartnomaga asoslanadi.
