# Homologation Suite (`npm run homolog`) (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Homologatsiya VPS’ida ishlayotgan OmniRoute deploy’ini real muhitda E2E validatsiyadan oʻtkazish
(`HOMOLOG_BASE_URL`, masalan, `http://192.168.0.15:20128`). Bitta buyruq relizning
qoʻlda bajariladigan STOP #2 nazorat roʻyxatini avtomatlashtirilgan, dalillar yaratuvchi ishga tushirish bilan almashtiradi.

## Nimalarni qamrab oladi

| Qatlam                       | Nimalarni tekshiradi                                                                                                                                                                                                   | Amalga oshirish                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — holat/paritet           | `/api/monitoring/health` `status: "healthy"` va kutilgan versiya bilan `200` javobini qaytaradi                                                                                                                        | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — vaqtinchalik kalit     | Administrator tizimga kirishi → `POST /api/keys` ushbu ishga tushirish uchun cheklangan API kalitini yaratadi; natijadan qatʼi nazar, u `finally` blokida bekor qilinadi (`DELETE /api/keys/:id`)                      | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API yuzasi             | `/v1/models` katalogi, haqiqiy oqimsiz chat javobi (daraja uchun muhim model, `max_tokens: 5`), yaroqsiz kalit uchun `401` va ommaviy `/api/monitoring/health`                                                         | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE oqimi              | Haqiqiy oqimli chat javobi; `text/event-stream`, kamida bitta kontent deltasi va `[DONE]` yakunlovchisi mavjudligini tekshiradi                                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — haqiqiy provayderlar    | Jonli `/v1/models` katalogida mavjud har bir muhim provayder uchun minimal xarajatli bittadan chat soʻrovi; promptfoo orqali dinamik ravishda yaratiladi                                                               | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI autentifikatsiyasi  | Haqiqiy kirish formasi orqali bir marta tizimga kiradi va UI qatlami boʻylab sessiyani (`storageState`) qayta ishlatadi                                                                                                | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI marshrutlari        | `src/app/(dashboard)/dashboard` ichidagi har bir statik `page.tsx` (fayl tizimidan aniqlanadi, dinamik `[param]` marshrutlari oʻtkazib yuboriladi) HTTP xatosi, sahifa xatosi yoki Next.js xato chegarasisiz yuklanadi | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI’dagi muhim jarayon  | Boshqaruv paneli UI’i orqali API kalitini yaratadi va uni yana bekor qiladi (VPS’da hech qanday qoldiq qoldirmaydi)                                                                                                    | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — birlashtirilgan hisobot | httpYac (`junit-to-ctrf` orqali), promptfoo→CTRF adapteri va Playwright CTRF reporterini bitta `homolog-ctrf.json` fayliga, shuningdek, inson oʻqishi uchun qulay `homolog-report/summary.md` hisobotiga birlashtiradi | `scripts/homolog/run.mjs`                                                     |

Qayta ijro etishning oʻzida LLM umuman qatnashmaydi — bu eval emas, balki deterministik regressiya
testlari toʻplamidir. AI faqat kelajakdagi texnik xizmat ishlarida qoʻllanadi (quyidagi Yoʻl xaritasiga qarang).

## Dastlabki talablar

1. `.env.homolog.example` faylini `.env.homolog` nomi bilan nusxalang (git tomonidan e’tiborga olinmaydi — uni hech qachon commit qilmang) va quyidagilarni to‘ldiring:
   - `HOMOLOG_BASE_URL` — maqsadli joylashtirish manzili, masalan, `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — ushbu joylashtirish uchun boshqaruv paneli paroli.
   - `HOMOLOG_CRITICAL_PROVIDERS` — haqiqiy sinov chat so‘rovini oladigan, vergul bilan ajratilgan provayder prefikslari
     (masalan, `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — odatiy ishga tushirishlarda bo‘sh qoldiring; testlar to‘plami o‘zining
     vaqtinchalik kalitini yaratadi va bekor qiladi. Buni faqat bitta qatlamni alohida nosozliklardan tozalash uchun belgilang.
2. Repo ichida `npm install` buyrug‘ini bajaring (testlar to‘plami bog‘liqliklari — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — odatiy devDependencies hisoblanadi).
3. Agar brauzer ikkilik fayllari mavjud bo‘lmasa, `npx playwright install` buyrug‘ini bajaring.

## Ishga tushirish tartibi

```bash
npm run homolog
```

Versiyasi mahalliy `package.json` bilan mos kelmaydigan joylashtirishni tekshirish uchun
(masalan, homologatsiya muhiti hali oldingi tuzatish relizida bo‘lsa), kutilgan
versiyani aniq qayta belgilang:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Agar istalgan qatlam muvaffaqiyatsiz tugasa, jarayon noldan farqli kod bilan yakunlanadi va
hatto xatolik yuz berganda ham yaratilgan vaqtinchalik API kalitini bekor qilishga har doim urinadi
(`scripts/homolog/run.mjs` ichidagi `finally` bloki).

## Hisobotni o‘qish

Barcha natijalar `homolog-report/` ichiga yoziladi (git tomonidan e’tiborga olinmaydi):

- `summary.md` — stdout’ga chiqariladigan ayni jadval, har bir qatlam uchun bittadan qator (✅/❌ + tafsilot).
- `homolog-ctrf.json` — birlashtirilgan CTRF hisoboti (API/SSE, provayder sinovi va
  UI natijalari birikmasi) — bu relizning STOP #2 nazorat ro‘yxatiga biriktiriladigan artefaktdir.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — har bir
  qatlamning xom/oraliq hisobotlari.
- `promptfooconfig.yaml`, `provider-misses.json` — joriy ishga tushirish uchun yaratilgan promptfoo konfiguratsiyasi
  va jonli katalogda mavjud bo‘lmagan har qanday muhim provayderlar.

L0 muvaffaqiyatsiz tugasa, jarayon darhol to‘xtatiladi (vaqtinchalik kalit yaratilmaydi), chunki versiya yoki tizim holatining
nomuvofiqligi barcha keyingi qatlamlar noto‘g‘ri joylashtirishni tekshirishini anglatadi.

## UI qonuniy ravishda o‘zgarganda bazaviy holatni yangilash

L4b (marshrut sinovi) va L4c (API kaliti UI jarayoni) snapshot’lar emas, haqiqiy DOM lokatorlari orqali
boshqariladi, shu sababli aksariyat qonuniy UI o‘zgarishlari testlar to‘plamini yangilashni talab qilmaydi. Agar o‘zgarish
lokatorni buzsa (masalan, tugma yorlig‘i nomi o‘zgartirilsa yoki sozlamalar sahifasi ko‘chirilsa):

1. Lokatorni joriy manba kodi bilan qayta tasdiqlang (spetsifikatsiyalarda har bir lokator qaysi
   fayl/satrga nisbatan tasdiqlangani allaqachon hujjatlashtirilgan — ayni usulga amal qiling, taxmin qilmang).
2. `tests/homolog/ui/` ichidagi spetsifikatsiyani yangilang.
3. Tuzatishni tasdiqlash uchun VPS’ga qarshi `npm run homolog` buyrug‘ini (yoki faqat ta’sirlangan Playwright spetsifikatsiyasini)
   qayta ishga tushiring, so‘ng commit qiling.

Bu testlar to‘plamida vizual/piksel bazaviy holati mavjud emas (F1) — buning uchun Yo‘l xaritasiga qarang.

## Yo‘l xaritasi (F2 / F3)

Dizayn va bosqichma-bosqich joriy etish rejasi ichki rejalashtirish spetsifikatsiyasida joylashgan:
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (havola berilmagan — ichki
`_tasks/` artefakti, ushbu reponing kuzatiladigan hujjatlariga kirmaydi). Qisqacha:

- **F2** — to‘liq bosqichma-bosqich jarayonni yozib olish → Playwright Test Agents (`planner`/`generator`)
  uni jarayon spetsifikatsiyalariga aylantiradi (combo yaratish, provayderni sinash, sozlamalarni tahrirlash, MCP vositalari) +
  dinamik ma’lumotlar (metrikalar, vaqt belgilari, jurnallar) ustidan niqoblar qo‘llangan vizual regressiya bazaviy holati
  (Lost Pixel) + har bir reliz uchun `healer` texnik xizmat tartibi.
- **F3** — chidamlilik/shartnoma/ulanish qamrovi: toxiproxy + devbox’dagi soxta OpenAI-mos
  provayder, unga yo‘naltirilgan VPS’dagi `homolog-resilience` combo
  (kiritilgan kutish vaqti tugashi → `/api/monitoring/health` orqali zaxira mexanizmi hamda avtomatik uzgichning ochilishi/yopilishini tekshirish);
  `docs/openapi.yaml` asosidagi shartli Schemathesis kontrakt sinovi (past `--max-examples`,
  qat’iy belgilangan seed’lar, faqat LLM bo‘lmagan endpoint’lar); hamda `npm run homolog` va uning `summary.md` faylini
  `/generate-release` jarayonining STOP #2 bosqichiga ulash.
