# Evaluations (Evals) (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Asosiy manba:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute marshrutlash konfiguratsiyalari, alohida provayderlar/modellar yoki toʻplamga kiritilgan “golden set” sinov majmualarini taqqoslab baholash uchun foydalanishingiz mumkin boʻlgan universal baholash freymvorki bilan taqdim etiladi. Undan marshrutlashdagi oʻzgarishlarni tekshirish, yangi provayderlarni sinovdan oʻtkazish va relizlarni ishlab chiqarish trafigiga chiqarishdan oldin nazoratdan oʻtkazish uchun foydalaning.

Freymvork quyidagicha amalga oshirilgan:

- Xotirada saqlanadigan ichki sinov majmualarini roʻyxatdan oʻtkazadigan, natijalarni kutilgan mezonlar asosida baholaydigan va baholash jadvallarini umumlashtiradigan mustaqil bajaruvchi (`src/lib/evals/evalRunner.ts`).
- Maxsus (foydalanuvchi belgilagan) sinov majmualari va SQLite ichidagi tarixiy ishga tushirishlar uchun saqlash qatlami (`src/lib/db/evals.ts`).
- Har bir holatni `POST /v1/chat/completions` manziliga haqiqiy soʻrovlar yuborish orqali bajaradigan, kechikish va natijalarni qayd etadigan hamda ishga tushirishni saqlaydigan boshqaruv qatlami (`src/lib/evals/runtime.ts`).
- `/api/evals/*` ostidagi REST soʻnggi nuqtalari (faqat boshqaruv autentifikatsiyasi bilan).
- `Dashboard → Usage → Evals` manzilidagi boshqaruv paneli interfeysi (`EvalsTab.tsx`).

## Tushunchalar

### Sinov majmuasi

Sinov majmuasi — `description` va bir yoki bir nechta holatga ega nomlangan test holatlari toʻplami. Sinov majmualari ikkita manbadan olinadi:

| Manba      | Qayerda aniqlanadi                                              | Ishlash vaqtida oʻzgartirish mumkinmi? |
| ---------- | --------------------------------------------------------------- | -------------------------------------- |
| `built-in` | Ishga tushishda `registerSuite()` orqali roʻyxatdan oʻtkaziladi | Yoʻq (kodda aniqlangan)                |
| `custom`   | SQLiteʼdagi `eval_suites` + `eval_cases` jadvallarida saqlanadi | Ha (API/UI orqali)                     |

Joriy ichki sinov majmualari (`src/lib/evals/evalRunner.ts` fayliga qarang):

- `golden-set` — salomlashish/matematika/tarjima/xavfsizlik boʻyicha 10 ta bazaviy holat
- `coding-proficiency` — Python/JS/SQL/TS/xatolarni aniqlash
- `reasoning-logic` — sillogizmlar, matnli masalalar, qonuniyatlarni aniqlash
- `multilingual` — tarjima va tilni aniqlash
- `safety-guardrails` — shaxsni aniqlovchi maʼlumotlar, cheklovlarni chetlab oʻtish, rad etish, tarafkashlikdan xabardorlik
- `instruction-following` — faqat JSON, raqamlangan roʻyxatlar, til cheklovlari
- `codex-comparison` — taqqoslash rejimi uchun moʻljallangan bevosita taqqoslanadigan dasturlash vazifalari

### Holat

Har bir holat quyidagilarni oʻz ichiga oladi:

| Maydon     | Tavsif                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| `id`       | Barqaror identifikator (natijalar va metrikalarni kalitlash uchun ishlatiladi) |
| `name`     | Inson oʻqishi uchun qulay yorliq                                               |
| `model`    | Ishga tushirish `suite-default` nishonidan foydalangandagi standart model      |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` manziliga yuboriladi      |
| `expected` | `{ strategy, value }` — baholash mezoni (quyiga qarang)                        |
| `tags`     | Ixtiyoriy yorliqlar (masalan, `safety`, `pii`, `jailbreak`)                    |

### Nishon

Bitta sinov majmuasini turli nishonlarga nisbatan ishga tushirish mumkin. Nishon sxemasi — `src/shared/validation/schemas.ts` ichidagi `evalTargetSchema`:

| Nishon turi     | `id`       | Xatti-harakat                                                                         |
| --------------- | ---------- | ------------------------------------------------------------------------------------- |
| `suite-default` | `null`     | Har bir holat oʻzining ichki `model` maydonidan foydalanadi                           |
| `model`         | model nomi | Har bir holatni bitta bevosita model orqali majburan oʻtkazadi (masalan, `gpt-4o`)    |
| `combo`         | combo nomi | Har bir holatni bitta combo orqali ishga tushiradi (marshrutlash mexanizmini sinaydi) |

`model` va `combo` uchun `id` maydoni majburiy (`superRefine` orqali Zod tomonidan nazorat qilinadi). `compareTarget` taqdim etilganda, ikkala nishon bir-biridan farq qilishi kerak — bajaruvchi A/B taqqoslash uchun ikkala ishga tushirishni bir xil `runGroupId` ostida saqlaydi.

## Baholash mezonlari

`evaluateCase()` (`evalRunner.ts`) ichida amalga oshirilgan:

| Strategiya | Qachon o‘tadi…                                                           |
| ---------- | ------------------------------------------------------------------------ |
| `exact`    | `actualOutput === expected.value`                                        |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`      |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` rost qiymat qaytarsa     |
| `custom`   | `expected.fn(actualOutput, evalCase)` rost qiymat qaytarsa (faqat ichki) |

**Eslatma:** Maxsus funksiya orqali baholash faqat kodda belgilangan (ichki)
to‘plamlar uchun mo‘ljallangan, chunki funksiyalarni API orqali serializatsiya
qilib bo‘lmaydi. `evalCaseBuilderSchema` foydalanuvchi yaratgan to‘plamlar uchun
faqat `contains | exact | regex` qiymatlarini qabul qiladi.

Hozirda LLM-as-judge yoki embedding asosidagi o‘xshashlik baholovchisi yo‘q —
buni `evaluateCase()` ichida bemalol kengaytirish mumkin.

## Ma’lumotlar bazasi sxemasi

Uchta jadval (`030_create_eval_runs.sql` va `031_create_eval_suites.sql`
migratsiyalari):

| Jadval        | Maqsad                                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Maxsus to‘plam metama’lumotlari (`id`, `name`, `description`)                                                                           |
| `eval_cases`  | Har bir to‘plamdagi holatlar — `input_json`, `expected_*`, `tags_json`                                                                  |
| `eval_runs`   | Tarixiy ishga tushirishlar — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Ichki to‘plamlar DB’da **saqlanmaydi**. Ular xotirada turadi va `evalRunner.ts`
har safar import qilinganida qayta ro‘yxatdan o‘tkaziladi.

## REST API

Barcha endpointlar boshqaruv autentifikatsiyasini (`requireManagementAuth`)
talab qiladi — ular ochiq proksi interfeysining bir qismi emas.

| Endpoint                      | Metod    | Tavsif                                                                                           |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`    | To‘plamlar + so‘nggi ishga tushirishlar + natijalar jadvali + maqsadlar + kalitlarni ro‘yxatlash |
| `/api/evals`                  | `POST`   | To‘plamni ishga tushirish (bitta yoki taqqoslash) — `evalRunSuiteSchema` sxemasi                 |
| `/api/evals/{suiteId}`        | `GET`    | Bitta to‘plamni olish (ichki yoki maxsus)                                                        |
| `/api/evals/suites`           | `POST`   | Maxsus to‘plam yaratish — `evalSuiteSaveSchema` sxemasi                                          |
| `/api/evals/suites/{suiteId}` | `GET`    | Maxsus to‘plamni olish                                                                           |
| `/api/evals/suites/{suiteId}` | `PUT`    | Maxsus to‘plamni almashtirish (holatlar qayta kiritiladi)                                        |
| `/api/evals/suites/{suiteId}` | `DELETE` | Maxsus to‘plam va uning holatlarini o‘chirish                                                    |

### To‘plamni ishga tushirish

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Ixtiyoriy maydonlar:

- `outputs` — oldindan hisoblangan natijalarning `Record<caseId, string>`
  ko‘rinishi. Taqdim etilganda, bajaruvchi **jo‘natishni o‘tkazib yuboradi** va
  faqat keshlangan natijalarni baholaydi (oflayn baholash uchun foydali).
- `compareTarget` — parallel ishga tushiriladigan ikkinchi maqsad; ikkala ishga
  tushirish ham yuzma-yuz ko‘rish uchun yaratilgan umumiy `runGroupId`dan
  foydalanadi.
- `apiKeyId` — jo‘natilgan `/v1/chat/completions` chaqiruvlarini
  autentifikatsiya qilish uchun ishlatiladigan ichki API kaliti.
  `REQUIRE_API_KEY` yoqilganda talab qilinadi.

### Maxsus to‘plam yaratish

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Joʻnatish konveyeri

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Toʻplamni (ichki yoki maxsus) aniqlaydi.
2. Har bir holat uchun `/v1/chat/completions` manziliga holatning
   `messages` qiymati, aniqlangan `model`, `stream: false` va `max_tokens: 512`
   (yoki holat uchun belgilangan qiymat) bilan `Request` yaratadi.
3. Chat ishlov beruvchisini bevosita chaqiradi (jarayon ichida — qoʻshimcha HTTP oʻtishi yoʻq).
4. Kechikishni qayd etadi va matnni `choices[0].message.content` yoki
   Responses API `output[]` foydali yukidan ajratib oladi.
5. Barcha chiqishlarni `runSuite()` orqali baholaydi, soʻng `saveEvalRun()` orqali saqlaydi.

Holatlar **ketma-ket** bajariladi. Hozirda parallellik bayrogʻi mavjud emas.

## Boshqaruv paneli

UI `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) manzilida joylashgan. U yerdan
quyidagilarni bajarishingiz mumkin:

- Ichki va maxsus toʻplamlarni holatlar boʻyicha oldindan koʻrish orqali koʻrib chiqish.
- Holat konstruktori yordamida maxsus toʻplamlarni yaratish/tahrirlash/oʻchirish.
- Maqsadni (toʻplam standartlari / model / kombinatsiya), ixtiyoriy ikkinchi
  `compareTarget` va ixtiyoriy API kalitini tanlash, soʻng talab boʻyicha ishga tushirish.
- Ishga tushirish tarixini, har bir holatning muvaffaqiyatli/muvaffaqiyatsiz natijasini, kechikishni va qayd etilgan chiqishlarni tekshirish.
- Har bir `(suite, target)` doirasidagi eng soʻnggi ishga tushirish asosida jamlangan
  oʻzgaruvchan natijalar jadvalini koʻrish.

## Auto-Assessment RFC bilan aloqasi

Alohida, torroq baholash quyi tizimi `src/domain/assessment/` manzilida joylashgan
(amaldagi baholash mexanizmi uchun [AUTO-COMBO.md](../routing/AUTO-COMBO.md) fayliga ham qarang).
Bu quyi tizim Auto Combo mexanizmiga moʻljallangan — yuqori oqim xizmatlari ishlamay qolganda
kombinatsiyalar oʻzini tiklay olishi uchun provayderlar va modellarni avtomatik ravishda baholaydi.
U oʻzining ishga tushirgichi, turkumlagichi va baholash mantiqidan foydalanadi.

Bu yerda hujjatlashtirilgan Evals freymvorki **kengroq, umumiy maqsadli
sinov muhiti** hisoblanadi. Ixtiyoriy regressiya toʻplamlari, A/B taqqoslashlari
va har bir reliz uchun tezkor sinovlarda undan foydalanishni afzal koʻring. Marshrutlash qarorlariga
real vaqt rejimidagi provayder holati taʼsir qilishi kerak boʻlsa, Auto-Assessment quyi tizimidan foydalaning.

## CI integratsiyasi

Hozirda maxsus `eval:ci` npm skripti mavjud emas. Relizlarni baholash natijalari
asosida cheklamoqchi boʻlsangiz, ikkita yoʻl mavjud:

- **HTTP yoʻli**: serverni ishga tushiring, maʼlum `suiteId` + `target` bilan
  `POST /api/evals` soʻrovini yuboring va javobdagi
  `runs[].summary.passRate >= N` ekanini tasdiqlang.
- **Jarayon ichidagi yoʻl**: skriptda `@/lib/evals/runtime` modulidan
  `runEvalSuiteAgainstTarget()` funksiyasini import qiling, sinov maʼlumotlar bazasiga nisbatan ishga tushiring va
  qaytarilgan `PersistedEvalRun.summary` qiymatini tekshiring.

Marshrut va tarixni qamrab oluvchi testlar
`tests/unit/evals-route.test.ts` va `tests/unit/evals-history.test.ts` fayllarida joylashgan.

## Kengaytirish nuqtalari

Keng tarqalgan oʻzgartirishlar va ularni qayerda amalga oshirish kerakligi:

- **Yangi baholash strategiyasi** — `evaluateCase()` (`evalRunner.ts`) ichidagi
  `switch (evalCase.expected.strategy)` blokini kengaytiring hamda
  `src/lib/db/evals.ts` ichidagi `EvalCaseStrategy` va `schemas.ts` ichidagi `evalCaseBuilderSchema`
  taʼriflarini kengaytiring.
- **Yangi ichki toʻplam** — toʻplam obyektini belgilang va
  `evalRunner.ts` faylining oxirida `registerSuite()` funksiyasini chaqiring. U `listSuites()` tomonidan avtomatik aniqlanadi.
- **Parallellik bilan ishga tushirish** — `runEvalSuiteAgainstTarget()` ichidagi ketma-ket `for` siklini
  cheklangan `Promise.all` bilan almashtiring (hozirda parallellikni
  boshqarish mavjud emas).
- **Oqim/asbob chaqiruvi holatlari** — hozirda ishga tushirgich majburiy ravishda `stream: false` qiymatini oʻrnatadi.
  Oqimli yoki asboblarni hisobga oluvchi baholash uchun `runtime.ts` faylini oʻzgartirish
  (baholashdan oldin SSE qismlarini qayd etish va birlashtirish) talab etiladi.

## Shuningdek qarang

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — mahsulot bo‘yicha umumiy qo‘llanma
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — so‘rovlarni qayta ishlash konveyeri bo‘yicha ma’lumotnoma
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo baholash mexanizmi (real vaqt ish muhiti)
- Manba: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
