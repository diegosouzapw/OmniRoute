# 🌐 OmniRoute Proxy Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Geografik bloklarni chetlab oʻting, shaxsingizni himoya qiling va AI trafigini istalgan proksi orqali yoʻnaltiring — sozlashdagi hech qanday murakkabliksiz.**

OmniRoute yuqori oqimdagi AI provayderlari trafigini HTTP, HTTPS yoki SOCKS5 proksilari orqali yoʻnaltirish imkonini beruvchi toʻliq funksiyali proksi boshqaruv tizimini oʻz ichiga oladi. Bloklangan hududda boʻlsangiz, IP rotatsiyasi kerak boʻlsa yoki yashirin fingerprintingdan foydalanmoqchi boʻlsangiz — ushbu qoʻllanmada hammasi yoritilgan.

---

## Mundarija

- [Nega proksilardan foydalanish kerak?](#why-use-proxies)
- [Arxitektura haqida umumiy maʼlumot](#architecture-overview)
- [4 darajali proksi tizimi](#4-level-proxy-system)
- [Proksi reyestri (CRUD)](#proxy-registry-crud)
- [1proxy bepul marketpleysi](#1proxy-free-proxy-marketplace)
- [Proksi rotatsiyasi](#proxy-rotation)
- [Aniqlanishdan himoya va yashirinlik](#anti-detection--stealth)
- [Yuqori oqim proksi rejimlari](#upstream-proxy-modes)
- [Boshqaruv paneli interfeysi](#dashboard-ui)
- [API maʼlumotnomasi](#api-reference)
- [Muhit oʻzgaruvchilari](#environment-variables)
- [Muammolarni bartaraf etish](#troubleshooting)

---

## Nega proksilardan foydalanish kerak?

Koʻplab AI provayderlari geografik hududga qarab kirishni cheklaydi. **Rossiya, Xitoy, Eron, Kuba, Turkiya** va boshqa mamlakatlardagi dasturchilar quyidagiga oʻxshash xatolarga duch keladi:

```
unsupported_country_region_territory
```

Proksilar bloklangan hududlardan tashqarida ham foydalidir:

| Foydalanish holati                     | Tavsif                                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| **Geografik cheklovni chetlab oʻtish** | Bloklangan mamlakatlardan OpenAI, Anthropic, Codex, Copilot xizmatlariga kirish        |
| **IP rotatsiyasi**                     | Tezlik cheklovlariga duch kelmaslik uchun soʻrovlarni bir nechta IP boʻylab taqsimlash |
| **Maxfiylik**                          | Haqiqiy IP manzilingizni yuqori oqim provayderlaridan yashirish                        |
| **Muvofiqlik**                         | Trafikni muayyan yurisdiksiyalar orqali yoʻnaltirish                                   |
| **Sinovdan oʻtkazish**                 | Turli hududlardan yuborilgan soʻrovlarni simulyatsiya qilish                           |

---

## Arxitektura haqida umumiy maʼlumot

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute serveri                       │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proksi      │    │ Proksi       │    │ Proksi           │  │
│  │ reyestri    │───▶│ dispetcheri  │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (keshlangan) │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy      │                        │ Yuqori oqim      │  │
│  │ sinxronlash │                        │ provayderi API'si│  │
│  │ (bepul pul) │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Asosiy komponentlar

| Komponent                     | Fayl                                         | Vazifasi                                                            |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------------- |
| **Proksi reyestri**           | `src/lib/db/proxies.ts`                      | Proksi yozuvlari va qamrov biriktirmalari uchun CRUD                |
| **Proksi dispetcheri**        | `open-sse/utils/proxyDispatcher.ts`          | Keshlash bilan `undici` ProxyAgent/SOCKS dispetcherlarini yaratadi  |
| **Proksi Fetch**              | `open-sse/utils/proxyFetch.ts`               | Proksi dispetcherini kiritish orqali `fetch()` funksiyasini oʻraydi |
| **Sozlamalar marshruti**      | `src/app/api/settings/proxy/route.ts`        | Eski proksi konfiguratsiyasi API'si (GET/PUT/DELETE)                |
| **Boshqaruv marshruti**       | `src/app/api/v1/management/proxies/route.ts` | Reyestr CRUD API'si (GET/POST/PATCH/DELETE)                         |
| **1proxy maʼlumotlar bazasi** | `src/lib/db/oneproxy.ts`                     | Bepul proksi marketpleysi maʼlumotlarini doimiy saqlash             |

---

## 4 darajali proksi tizimi

OmniRoute proksi konfiguratsiyasini ustuvorlik tartibida aniqlanadigan **toʻrtta mustaqil doirada** qoʻllab-quvvatlaydi:

```
Ustuvorlik boʻyicha aniqlash tartibi (eng yuqori → eng past):

  1. 🔵 Hisob/Ulanish proksisi  →  har bir API kaliti / OAuth ulanishi uchun
  2. 🟡 Provayder proksisi      →  har bir provayder uchun (masalan, barcha OpenAI trafigi)
  3. 🟠 Kombinatsiya proksisi   →  har bir kombinatsiya/marshrutlash konfiguratsiyasi uchun
  4. 🟢 Global proksi           →  barcha trafik, barcha provayderlar
```

### Aniqlash qanday ishlaydi

OmniRoute yuqori oqimdagi provayderga soʻrov yuborganda, har bir darajani tartib bilan tekshiradigan `resolveProxyForConnectionFromRegistry()` funksiyasini chaqiradi:

1. **Hisob darajasi** — Ushbu aniq ulanish ID identifikatoriga proksi biriktirilganmi?
2. **Provayder darajasi** — Ushbu provayderga (masalan, `openai`) proksi biriktirilganmi?
3. **Global daraja** — Global proksi sozlanganmi?
4. **Proksi yoʻq** — Provayderga toʻgʻridan-toʻgʻri ulanish.

Birinchi mos kelgan sozlama ishlatiladi. Bu global proksini zaxira variant sifatida belgilash, ammo uni muayyan provayderlar yoki ulanishlar uchun qayta belgilash imkonini beradi.

### Qaysi trafik proksilanadi

| Trafik turi             | Proksilanadimi? | Izohlar                                                    |
| ----------------------- | --------------- | ---------------------------------------------------------- |
| Chat toʻldirishlari     | ✅              | Barcha `/v1/chat/completions` soʻrovlari                   |
| Embeddinglar            | ✅              | `/v1/embeddings`                                           |
| Tasvir yaratish         | ✅              | `/v1/images/generations`                                   |
| Audio (TTS/STT)         | ✅              | `/v1/audio/*`                                              |
| OAuth token almashinuvi | ✅              | `unsupported_country_region_territory` xatosini hal qiladi |
| Ulanish sinovlari       | ✅              | "Ulanishni sinash" tugmasi proksidan foydalanadi           |
| Tokenni yangilash       | ✅              | Fon rejimida OAuth yangilanishi                            |
| Model sinxronizatsiyasi | ✅              | Modellarni roʻyxatlash va aniqlash                         |

---

## Proksi reyestri (CRUD)

Proksi reyestri barcha proksilaringizni saqlaydigan SQLite jadvalidir (`proxy_registry`). Har bir proksi quyidagilarga ega:

| Maydon     | Tur     | Tavsif                                                      |
| ---------- | ------- | ----------------------------------------------------------- |
| `id`       | UUID    | Noyob identifikator                                         |
| `name`     | String  | Inson oʻqishi uchun qulay yorliq                            |
| `type`     | String  | Protokol: `http`, `https`, `socks5`                         |
| `host`     | String  | Proksi xost nomi yoki IP manzili                            |
| `port`     | Integer | Port raqami                                                 |
| `username` | String  | Autentifikatsiya foydalanuvchi nomi (saqlashda shifrlangan) |
| `password` | String  | Autentifikatsiya paroli (saqlashda shifrlangan)             |
| `region`   | String  | Geografik hudud yorligʻi                                    |
| `notes`    | String  | Erkin matnli qaydlar                                        |
| `status`   | String  | `active` yoki `inactive`                                    |
| `source`   | String  | `manual` yoki `oneproxy`                                    |

### Proksi yaratish

**Boshqaruv paneli orqali:**

1. **Sozlamalar → Proksi** boʻlimiga oʻting
2. **Proksi qoʻshish** tugmasini bosing
3. Tur, xost, port va ixtiyoriy autentifikatsiya maʼlumotlarini kiriting
4. Saqlang

**API orqali:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Proksini yangilash

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Eslatma:** Agar boʻsh boʻlmagan yangi qiymatlarni ochiq yubormasangiz, hisob maʼlumotlari saqlanib qoladi. `username`/`password` uchun boʻsh satrlar yuborilsa, saqlangan qiymatlar oʻzgarmaydi.

### Proksini oʻchirish

```bash
# Proksi biror doiraga biriktirilgan boʻlsa, bajarilmaydi
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Majburan oʻchirish (biriktirishlarni ham olib tashlaydi)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Proksilarni roʻyxatlash

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Proksilarni doiralarga biriktirish

```bash
# Global doiraga biriktirish
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Muayyan provayderga biriktirish
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Muayyan ulanish/kalitga biriktirish
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Amaldagi proksini aniqlash

Berilgan ulanish uchun qaysi proksi ishlatilishini tekshiring:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Aniqlangan proksini uning darajasi (`account`, `provider` yoki `global`) va manbasi bilan qaytaradi.

### Ommaviy biriktirish

Bitta proksini bir vaqtning oʻzida bir nechta provayder yoki ulanishga biriktiring:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/Eksport

Proksilar **Zaxiralash/Tiklash** tizimiga kiritilgan. OmniRoute konfiguratsiyangizni eksport qilganingizda:

1. **Boshqaruv paneli → Sozlamalar → Zaxiralash** boʻlimiga oʻting
2. **Eksport** tugmasini bosing — proksi reyestri va biriktirishlar ham kiritiladi
3. Tiklash uchun **Import** tugmasini bosing va zaxira faylini yuklang

Proksi reyestri **host+port boʻyicha upsert** funksiyasini ham qoʻllab-quvvatlaydi — agar allaqachon mavjud boʻlgan proksini (xost va porti bir xil) import qilsangiz, dublikat yaratish oʻrniga u yangilanadi.

### Eski versiyadan migratsiya

Agar proksilarni eski versiyada (reyestrdan oldingi) sozlagan bo‘lsangiz, OmniRoute ularni avtomatik ravishda ko‘chiradi:

```
Eski key_value ombori → proxy_registry + proxy_assignments
```

Bu yangilangandan keyingi ilk ishga tushirishda bir marta amalga oshadi. Qayta ishga tushirish uchun `migrateLegacyProxyConfigToRegistry({ force: true })` dan foydalaning.

---

## 1proxy bepul proksi bozori

> 🆕 **[@oyi77](https://github.com/oyi77) tomonidan qoʻshilgan** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Muammo [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute butun dunyo boʻylab **yuzlab bepul, tekshirilgan proksilardan** foydalanish imkonini berish uchun **[1proxy](https://1proxy-api.aitradepulse.com)** hamjamiyat platformasi bilan integratsiyalashadi. Bu oʻz proksi infratuzilmasiga ega boʻlmagan foydalanuvchilar uchun juda mos keladi.

### Bu qanday ishlaydi

```
┌─────────────┐  Sinxronlash  ┌─────────────────┐  Almashtirish ┌──────────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provayder API │
│  (tashqi)   │  500 tagacha  │  source=oneproxy │  sifat boʻyicha│              │
└─────────────┘   proksi      └─────────────────┘               └──────────────┘
```

1. **Sinxronlash** — OmniRoute tekshirilgan proksilarni 1proxy API orqali oladi
2. **Saqlash** — Proksilar ayni `proxy_registry` jadvalida `source = 'oneproxy'` qiymati bilan saqlanadi
3. **Filtrlash** — Protokol, mamlakat va sifat bali boʻyicha filtrlang
4. **Almashtirish** — Sifat, tasodifiy yoki ketma-ket strategiyalar yordamida eng yaxshi proksini tanlang
5. **Avtomatik pasaytirish** — Ishlamagan proksilarning sifat bali kamaytiriladi; chegara qiymatidan past boʻlsa → nofaol deb belgilanadi

### Proksilarni sinxronlash

**Boshqaruv paneli orqali:**

1. **Sozlamalar → 1proxy** ichki oynasiga oʻting
2. **"Hozir sinxronlash"** tugmasini bosing
3. Statistikani koʻring: proksilarning umumiy soni, faol proksilar soni, oʻrtacha sifat va mamlakatlar boʻyicha taqsimot

**API orqali:**

```bash
# Sinxronlashni ishga tushirish
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Javob:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Proksilarni filtrlash

```bash
# Protokol boʻyicha filtrlash
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Mamlakat boʻyicha filtrlash
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Minimal sifat bali boʻyicha filtrlash
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Filtrlarni birlashtirish
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Proksi sifat ballari

Har bir 1proxy proksisi quyidagi metadata bilan taqdim etiladi:

| Maydon          | Tavsif                                              |
| --------------- | --------------------------------------------------- |
| `qualityScore`  | 1proxy tekshiruvi asosidagi 0-100 oraligʻidagi baho |
| `latencyMs`     | Oʻlchangan tarmoq kechikishi                        |
| `anonymity`     | `transparent`, `anonymous` yoki `elite`             |
| `googleAccess`  | Proksi Google xizmatlariga kira olishi              |
| `countryCode`   | Ikki harfli ISO mamlakat kodi                       |
| `lastValidated` | Oxirgi tekshiruv vaqt belgisi                       |

Sifat ballari dinamik ravishda oʻzgartiriladi:

- **Bajarilmagan soʻrovlar** ballni 10 punktga kamaytiradi
- **Ball ≤10 gacha tushsa** → proksi `inactive` deb belgilanadi
- Nofaol proksilar almashtirish jarayonidan chiqarib tashlanadi

### Almashtirish strategiyalari

```bash
# Sifat boʻyicha almashtirish (eng yaxshi proksi birinchi) — standart
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Tasodifiy almashtirish
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Ketma-ket (eng oldin tekshirilgan proksi birinchi)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Avtomatik uzgich

1proxy sinxronlashida ichki avtomatik uzgich mavjud:

- **Ketma-ket 5 ta sinxronlash xatosidan** keyin keyingi sinxronlash urinishlari bloklanadi
- `resetOneproxyCircuitBreaker()` yordamida qayta oʻrnating yoki serverni qayta ishga tushiring
- Sinxronlash holati `GET /api/settings/oneproxy?action=status` manzilida mavjud

### 1proxy proksilarini tozalash

```bash
# Bitta 1proxy proksisini oʻchirish
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# BARCHA 1proxy proksilarini tozalash (qoʻlda qoʻshilgan proksilarga tegilmaydi)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Aniqlashdan himoyalanish va yashirinlik

OmniRoute trafikni shunchaki proksi orqali yoʻnaltiribgina qolmay, uni haqiqiy trafikdek koʻrsatadi:

### TLS raqamli izini soxtalashtirish

Brauzerga oʻxshash TLS raqamli izlarini yaratish uchun `wreq-js`dan foydalanadi va brauzerga tegishli boʻlmagan TLS ulanishlarini belgilaydigan botlarni aniqlash tizimlarini chetlab oʻtadi.

### CLI raqamli iziga moslash

**CLI raqamli izi almashtirgichi** (`Sozlamalar → Xavfsizlik`) HTTP sarlavhalari va JSON tanasi maydonlarini mahalliy CLI ikkilik fayllarining (Claude Code, Codex va boshqalar) aniq signaturasiga mos ravishda qayta tartiblaydi. Bu proksi bilan **birgalikda** ishlaydi:

```
Sizning IP manzilingiz (bloklangan) → Proksi IP manzili (AQSH) → Provayder API
                                      + TLS soxtalashtirish
                                      + CLI raqamli izi
```

Shu tariqa bir vaqtning oʻzida ham **IP manzilni yashirish**, ham **soʻrovning haqiqiyligi** taʼminlanadi.

### Proksi IP manzilini saqlash

Boshqaruv panelidagi rang bilan kodlangan nishonlar qaysi proksi darajasi faol ekanini koʻrsatadi:

| Nishon | Daraja    | Maʼnosi                                          |
| ------ | --------- | ------------------------------------------------ |
| 🟢     | Global    | Barcha trafik ushbu proksi orqali oʻtadi         |
| 🟡     | Provayder | Faqat ushbu provayder trafiki proksilanadi       |
| 🔵     | Ulanish   | Ushbu aniq kalit/hisob shu proksidan foydalanadi |

Nishon tekshirish uchun aniqlangan proksi IP manzilini ham koʻrsatadi.

---

## Yuqori oqim proksi rejimlari

CLIProxyAPI andozasidan foydalanadigan provayderlar uchun OmniRoute yuqori oqim proksisining uchta rejimini qoʻllab-quvvatlaydi:

| Rejim         | Tavsif                                                         |
| ------------- | -------------------------------------------------------------- |
| `native`      | OmniRoute proksi yoʻnaltirishni bevosita boshqaradi (standart) |
| `cliproxyapi` | Tashqi CLIProxyAPI nusxasiga topshiradi                        |
| `fallback`    | Avval mahalliy usulni sinaydi, soʻng CLIProxyAPIga oʻtadi      |

Har bir provayder uchun sozlang:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Boshqaruv paneli interfeysi

### Sozlamalar → Proksi ichki oynasi

- **Global proksi** konfiguratsiyasi (barcha trafik uchun bir marta sozlanadi)
- **Har bir provayder uchun proksi** almashtirishlari
- **Har bir ulanish uchun proksi** biriktirishlari
- Sozlangan proksi orqali **ulanish sinovi**
- Faol proksi darajasini koʻrsatuvchi **rang bilan kodlangan nishonlar**

### Sozlamalar → 1proxy ichki oynasi

- Bepul proksilarni olish uchun **Hozir sinxronlash** tugmasi
- **Statistika kartalari**: Jami, Faol, Oʻrtacha sifat, Oxirgi sinxronlash
- **Filtrlar**: Protokol, Mamlakat kodi, Minimal sifat
- Xost, protokol, mamlakat, sifat bahosi, kechikish, anonimlik va Googleʼga kirish imkoniyati koʻrsatilgan **proksi jadvali**
- Muvaffaqiyat/muvaffaqiyatsizliklarni kuzatish va ketma-ket muvaffaqiyatsizliklar soni koʻrsatilgan **sinxronlash holati** paneli
- Barcha 1proxy yozuvlarini olib tashlash uchun **Barchasini tozalash**

---

## API maʼlumotnomasi

### Proksi sozlamalari API

| Metod    | Yakuniy nuqta                                  | Tavsif                                 |
| -------- | ---------------------------------------------- | -------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Toʻliq proksi konfiguratsiyasini olish |
| `GET`    | `/api/settings/proxy?level=global`             | Global proksini olish                  |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Provayder proksisini olish             |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Amaldagi proksini aniqlash             |
| `PUT`    | `/api/settings/proxy`                          | Proksi konfiguratsiyasini yangilash    |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Darajadagi proksini olib tashlash      |

### Proksi reyestri API

| Metod    | Yakuniy nuqta                                     | Tavsif                         |
| -------- | ------------------------------------------------- | ------------------------------ |
| `GET`    | `/api/v1/management/proxies`                      | Barcha proksilarni roʻyxatlash |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Proksini ID boʻyicha olish     |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Proksi biriktirishlarini olish |
| `POST`   | `/api/v1/management/proxies`                      | Proksi yaratish                |
| `PATCH`  | `/api/v1/management/proxies`                      | Proksini yangilash             |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Proksini oʻchirish             |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Majburan oʻchirish             |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Ommaviy biriktirish            |
| `GET`    | `/api/v1/management/proxies/assignments`          | Biriktirishlarni roʻyxatlash   |
| `GET`    | `/api/v1/management/proxies/health`               | Proksi holati statistikasi     |

### Tunnellar API

Chiquvchi trafikni proksi orqali yoʻnaltirish oʻrniga OmniRoute nusxangizni ommaviy internetga (Cloudflare/ngrok/Tailscale) ochish uchun [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) sahifasiga qarang. Tunnel REST API `/api/tunnels/{cloudflared,ngrok,tailscale}/*` ostida joylashgan va yuqorida hujjatlashtirilgan chiquvchi proksi zanjiridan mustaqil.

### 1proxy API

| Metod    | Yakuniy nuqta                          | Tavsif                                   |
| -------- | -------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy proksilarini roʻyxatlash          |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Statistika va sinxronlash holatini olish |
| `GET`    | `/api/settings/oneproxy?action=status` | Faqat sinxronlash holatini olish         |
| `POST`   | `/api/settings/oneproxy`               | Sinxronlashni ishga tushirish            |
| `POST`   | `/api/settings/oneproxy/rotate`        | Keyingi proksiga oʻtish                  |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Bittasini oʻchirish                      |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Barchasini tozalash                      |

### Yuqori oqim proksi API

| Metod    | Yakuniy nuqta                     | Tavsif                                              |
| -------- | --------------------------------- | --------------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Yuqori oqim proksi konfiguratsiyasini olish         |
| `PUT`    | `/api/upstream-proxy/:providerId` | Yuqori oqim proksi rejimini sozlash                 |
| `DELETE` | `/api/upstream-proxy/:providerId` | Yuqori oqim proksi konfiguratsiyasini olib tashlash |

---

## Muhit oʻzgaruvchilari

| Oʻzgaruvchi           | Standart qiymat | Tavsif                                                                               |
| --------------------- | --------------- | ------------------------------------------------------------------------------------ |
| `ENABLE_SOCKS5_PROXY` | `true`          | SOCKS5 proksi qoʻllab-quvvatlashini yoqish (`.env.example`da standart qiymat `true`) |

---

## Muammolarni bartaraf etish

### "SOCKS5 proksi oʻchirilgan"

`.env` faylingizda `ENABLE_SOCKS5_PROXY=true` qilib belgilang va qayta ishga tushiring.

### Proksi orqali "socket hang up" xatolari

Faol boʻlmagan ulanishlarni uzib qoʻyadigan arzon proksilarda bu odatiy holat. OmniRoute buni allaqachon quyidagicha boshqaradi:

- Proksi ulanishlarida keep-alive funksiyasini oʻchirish (`keepAliveTimeout: 1`)
- Pipelining funksiyasini oʻchirish (`pipelining: 0`)
- Takroriy ulanish kelishuvlarini oldini olish uchun dispatcherlarni keshlash

Agar muammo davom etsa, boshqa proksini sinab koʻring yoki 1proxy rotatsiya funksiyasidan foydalaning.

### OAuth paytida "unsupported_country_region_territory"

OAuth jarayonini boshlashdan **oldin** proksi sozlanganligiga ishonch hosil qiling. OmniRoute OAuth token almashinuvini sozlangan proksi orqali yoʻnaltiradi. Avval global yoki provayder darajasidagi proksini belgilang, soʻng ulaning.

### Proksi ishlatilmayapti

Aniqlash tartibini tekshiring:

1. `GET /api/settings/proxy?resolve=your-connection-id` orqali tekshiring
2. Proksi `status` qiymati `active` (`inactive` emas) ekanini tekshiring
3. Proksi tayinlash qamrovi ulanishingizga mos kelishiga ishonch hosil qiling

### 1proxy sinxronlashuvi bajarilmadi

Sinxronlash holatini tekshiring:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Agar `consecutiveFailures >= 5` boʻlsa, avtomatik uzgich ishga tushgan. Uni qayta tiklash uchun serverni qayta ishga tushiring yoki qoʻlda tiklanishini kuting.

---

## Maʼlumotlar bazasi sxemasi

### `proxy_registry` jadvali

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' yoki 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (faqat 1proxy)
  latency_ms INTEGER,                        -- millisekundlar (faqat 1proxy)
  anonymity TEXT,                            -- shaffof/anonim/yuqori darajali
  google_access INTEGER DEFAULT 0,           -- Googlega kira oladimi? (1proxy)
  last_validated TEXT,                       -- ISO vaqt belgisi (1proxy)
  country_code TEXT,                         -- ISO ikki harfli kod (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` jadvali

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- provayder IDsi, ulanish IDsi yoki kombinatsiya IDsi
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Proksi holatini tekshirish (v3.8.16+)

OmniRouteʼning **proksi tezkor xato aniqlash** mexanizmi (`src/lib/proxyHealth.ts`) tezkor TCP ulanish tekshiruvi orqali ishlamayotgan proksilarni <2s ichida aniqlaydi, soʻng har bir soʻrov uchun qoʻshimcha xarajatlarning oldini olish maqsadida **natijani keshlaydi**.

### Ishlash tartibi

```
Soʻrov ──▶ ProxyHealthCache.get(url)
             │
             ├─ Keshda bor + yangi?  ──▶ keshlangan holatni qaytarish
             │
             └─ Keshda yoʻq / eskirgan?  ──▶ host:portga TCP orqali ulanish
                                              (kutish vaqti: FAST_FAIL_TIMEOUT_MS)
                                              ──▶ HEALTH_CACHE_TTL_MS muddatiga keshlash
                                              ──▶ natijani qaytarish
```

Bu mexanizmsiz ishlamayotgan proksi har bir soʻrovni muvaffaqiyatsiz tugashidan oldin toʻliq `PROXY_TIMEOUT_MS` davomida (standart qiymat 30s) bloklab turadi.

### Sozlanadigan muhit oʻzgaruvchilari

| Oʻzgaruvchi                  | Standart qiymat | Maqsad                                                       |
| ---------------------------- | --------------- | ------------------------------------------------------------ |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`          | Har bir holat tekshiruvi uchun TCP ulanishining kutish vaqti |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`         | Holat natijasi keshlanadigan vaqt                            |

**Tavsiya etilgan qiymatlar:**

| Ssenariy                               | Tezkor xato aniqlash kutish vaqti | Kesh TTL | Asos                                                                                    |
| -------------------------------------- | --------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| Yuqori oʻtkazuvchanlikdagi API shlyuzi | 1500ms                            | 60000ms  | Tezkor xatoni agressiv aniqlash, tekshiruvlarni kamaytirish uchun uzoqroq kesh          |
| Geografik taqsimlangan tugunlar        | 3000ms                            | 15000ms  | Sekinroq tarmoqlarga koʻproq vaqt kerak; tezkor almashish uchun qisqaroq kesh           |
| Ishlab chiqish / sinov                 | 1000ms                            | 10000ms  | Mahalliy proksilarda tezkor iteratsiya                                                  |
| Yashirinlik / aniqlashdan himoyalanish | 2500ms                            | 45000ms  | Tezlik cheklovlarini ishga tushirishi mumkin boʻlgan tez-tez tekshirishlardan saqlanish |

### Proksi holatini koʻrish

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Muayyan proksini majburiy qayta tekshirish
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Kesh yozuvi `HEALTH_CACHE_TTL_MS` muddatidan oshib ketganda `stale` bayrogʻi `true` boʻladi va keyingi soʻrov yangi tekshiruvni ishga tushiradi.

### Proksi turi boʻyicha standart qiymatlar

Holat tekshiruvi URL sxemasiga asoslangan oqilona standart qiymatlardan foydalanadi:

| Sxema                      | Standart port |
| -------------------------- | ------------- |
| `http://`                  | 8080          |
| `https://`                 | 443           |
| `socks5://` / `socks5h://` | 1080          |

URL ichidagi maxsus portlar (`http://host:9999`) har doim sxemaning standart qiymatidan ustun turadi.

---

## Proksi tahlili va kuzatuvchanlik

OmniRoute operatorlarga marshrutlash naqshlari, kechikishdagi keskin oshishlar va takroriy nosozliklarni aniqlashda yordam berish uchun har bir proksi bo‘yicha foydalanish ma’lumotlarini kuzatadi.

### Nimalar kuzatiladi

Sozlangan proksi orqali o‘tgan har bir so‘rov uchun OmniRoute quyidagilarni qayd etadi:

| Ko‘rsatkich  | Tavsif                                                                                |
| ------------ | ------------------------------------------------------------------------------------- |
| `proxy_url`  | To‘liq proksi URL manzili (autentifikatsiya ma’lumotlari niqoblangan holda)           |
| `provider`   | Yuqori oqim provayderi ID si (openai, anthropic va boshqalar)                         |
| `latency_ms` | Proksi bilan ulanishni o‘rnatish vaqtini ham o‘z ichiga olgan jami borib-kelish vaqti |
| `connect_ms` | Faqat TCP ulanish vaqti                                                               |
| `status`     | Yuqori oqimdan olingan HTTP holat kodi                                                |
| `error`      | So‘rov muvaffaqiyatsiz tugagan bo‘lsa, xato sinfi                                     |
| `timestamp`  | ISO 8601 UTC                                                                          |

### Ma’lumotlarga kirish

```bash
# Oxirgi proksi hodisalari
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Haqiqiy endpoint — `/api/usage/proxy-logs` (`src/app/api/usage/proxy-logs/route.ts` ga qarang). Bu endpoint quyidagilarni qo‘llab-quvvatlaydi:

- `GET /api/usage/proxy-logs` — proksi jurnallarini olish
- `DELETE /api/usage/proxy-logs` — barcha proksi jurnallarini tozalash

Zarur bo‘lsa, jamlangan statistikani SQL orqali bevosita `proxy_logs` jadvalidan so‘rash mumkin. Boshqaruv paneli interfeysi jamlangan ko‘rinishlarni taklif qilishi mumkin.

### Keng tarqalgan usullar

**Beqaror proksini aniqlash** (muvaffaqiyat va muvaffaqiyatsizlik o‘rtasida almashinadi):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Sekin proksilarni topish** (p95 kechikishi > 2s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Rotatsiya strategiyasini tanlash daraxti

Bitta qamrovga bir nechta proksi biriktirilganda, OmniRoute har bir so‘rov uchun qaysi birini ishlatishni tanlash maqsadida **rotatsiya strategiyasi**dan foydalanadi. Strategiya qamrov darajasida sozlanadi (global, har bir provayder, har bir hisob, har bir kombinatsiya bo‘yicha).

### Mavjud strategiyalar

| Strategiya           | Qachon ishlatish kerak                                          | Murosa                                                                                      |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `quality` (standart) | Sifati turlicha bo‘lgan proksilar bilan ishlab chiqarish muhiti | Yuqori baholangan proksilarni afzal ko‘radi; past baholanganlari ishlatilmay qolishi mumkin |
| `random`             | Yuklamani taqsimlash, maxfiylik                                 | Bir tekis taqsimlash; sifat signallarini hisobga olmaydi                                    |
| `sequential`         | Nosozliklarni tuzatish, deterministik sinov                     | Proksilarni tartib bilan navbatma-navbat ishlatadi; tushunish oson                          |

### Qaror daraxti

```
                    Proksilaringiz uchun sifat ballari mavjudmi?
                    │
        ┌───────────┴───────────┐
        │                       │
       HA                      YO‘Q
        │                       │
   Barcha proksilar            │
   sifati taxminan                │
   tengmi?                      │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  HA       YO‘Q              Ishlating
   │         │              `random`
   │         │              (bir tekis
   │         │              taqsimlash vaqt
   │         │              o‘tishi bilan sifat
   │         │              ma’lumotini to‘playdi)
   │         │
   │    `quality`dan foydalaning
   │    (turli sifatlar
   │    uchun eng yaxshisi)
   │
`random`dan foydalaning
(yuklamani bir
tekis taqsimlang)
```

## Oʻz proksilaringiz uchun nosozliklarni avtomatik istisno qilish

1proxy marketpleys puli nosoz proksilarni allaqachon avtomatik ravishda pasaytiradi (qarang:
[Proksi sifati ballari](#proxy-quality-scores)). Reestrga **oʻzingiz** qoʻshgan
proksilar uchun fondagi holat tekshiruvi rejalashtiruvchisi
(`src/lib/proxyHealth/scheduler.ts`) hech narsani oʻchirmasdan, xuddi shunday
“ishlamayotgan aʼzoni zanjirdan avtomatik chiqarib tashlash” imkoniyatini taqdim etadi:

```bash
# .env — ketma-ket 3 ta muvaffaqiyatsiz tekshiruvdan keyin proksini vaqtincha oʻchiring,
# tekshiruvlarga yana javob bera boshlagach, uni avtomatik ravishda qayta yoqing.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Bu koʻp proksili zanjirda quyidagicha ishlaydi:

1. Rejalashtiruvchi har bir roʻyxatdan oʻtkazilgan proksini har
   `PROXY_HEALTH_INTERVAL_MS` oraligʻida tekshiradi (standart: 10 daqiqa; minimum: 1 daqiqa).
2. Ketma-ket `PROXY_AUTO_REMOVE_AFTER` ta **aniq** muvaffaqiyatsizlikdan soʻng (haqiqiy
   ulanish xatosi — taym-aut yoki tekshiruv nishonining oʻzidagi 5xx hech qachon hisobga
   olinmaydi, qarang: [Proksi holatini tekshirish](#proxy-health-checking-v3816)),
   proksining `status` qiymati `dead` etib belgilanadi.
3. `dead` — pul/rotatsiya aniqlash mexanizmi ishlatadigan faol holatlar filtri
   chiqarib tashlaydigan holatlardan biri. Shu sababli qamrov rotatsiyasi
   (navbatma-navbat / tasodifiy / biriktirilgan / kechikish boʻyicha — qarang:
   [Rotatsiya strategiyasini tanlash daraxti](#rotation-strategy-decision-tree))
   darhol ushbu proksini yangi soʻrovlarga berishni toʻxtatadi. Puldagi boshqa
   proksilarga taʼsir qilinmaydi va butun pul hech qachon bildirmasdan toʻgʻridan-toʻgʻri
   ulanishga qaytmaydi — [4 darajali proksi tizimi](#4-level-proxy-system) dagi
   xatolikda-yopish himoyasiga qarang.
4. Rejalashtiruvchi `dead` holatidagi proksilarni xuddi shu intervalda tekshirishda
   davom etadi. Keyingi muvaffaqiyatli tekshiruv `status` qiymatini yana `active`
   holatiga oʻzgartiradi va proksi rotatsiyaga qaytadi — uni qoʻlda qayta qoʻshish
   talab qilinmaydi.

Bu ataylab **ixtiyoriy va buzmaydigan** tarzda ishlab chiqilgan: standart holatda
rejalashtiruvchi faqat muvaffaqiyatsizliklarni hisoblaydi va jurnalga yozadi
(`decision.ts` faylidagi C siyosatiga qarang), `PROXY_AUTO_DISABLE` esa hech qachon
qatorni oʻchirmaydi — buning uchun alohida, yanada keskinroq `PROXY_AUTO_REMOVE`
bayrogʻi mavjud. Agar ikkalasi ham `true` etib belgilansa, `PROXY_AUTO_REMOVE`
ustunlik qiladi (oʻchirilish arafasidagi proksini oraliqda vaqtincha oʻchirishdan
foyda yoʻq). Oʻzgaruvchilarning toʻliq roʻyxati uchun
[Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) maʼlumotnomasiga qarang.

---

> 📖 **Tegishli hujjatlar:**
>
> - [Foydalanuvchi qoʻllanmasi](../guides/USER_GUIDE.md) — Umumiy sozlash va konfiguratsiya
> - [API maʼlumotnomasi](../reference/API_REFERENCE.md) — Toʻliq API hujjatlari
> - [Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) — Barcha muhit oʻzgaruvchilari
