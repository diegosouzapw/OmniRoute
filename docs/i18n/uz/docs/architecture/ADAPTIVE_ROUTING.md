# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Ushbu hujjat OmniRouteʼga qoʻshilgan, qayta aloqa asosida ishlaydigan adaptiv marshrutlash poydevorini tavsiflaydi. U ataylab ixcham qilingan: hujjat tiplashtirilgan marshrutlash natijalari kanalini, mavjud auto-combo baholagichiga uzatiladigan onlayn sifat signalini, ixtiyoriy OpenTelemetry eksportchisini va tushuntirish imkoniyatini taʼminlovchi endpointni taqdim etadi. U mavjud barqarorlik stekini (avariya uzgichi, ulanishni vaqtincha toʻxtatish, modelni bloklash, holat matritsasi, avtopilot) **almashtirmaydi** — balki uni toʻldiradi.

## 1. Arxitekturaviy kontekst

OmniRoute — **soʻrovlarning tezkor yoʻli** va **boshqaruv/intellekt tekisligi**ga ega maʼlumotlar tekisligidir. Tezkor yoʻl tez, xotiradan samarali foydalanuvchi, asinxron, barqaror va oldindan bashorat qilinadigan boʻlib qolishi kerak. Baholash, sifatni hisoblash, tajribalar va tarixiy tahlil boshqaruv tekisligiga tegishli.

```
AI agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   maʼlumotlar tekisligi (tezkor, sinxron, xotirada)
│  marshrutlash /     │
│  zaxiraga oʻtish    │
│  holat / himoya     │
│  keshlash / oqim    │
└──────────┬──────────┘
           │ RoutingEvent (yuborish va unutish, ~0.2µs)
           ▼
┌─────────────────────┐
│  Qayta aloqa        │   boshqaruv tekisligi (asinxron, imkon qadar)
│  qabul qiluvchilari │
│  sifat kuzatuvchisi │
│  OTel eksportchisi  │
│  izohlar ombori     │
└──────────┬──────────┘
           ▼  sifat bali
      auto-combo baholagichi
```

### Avvaldan mavjud boʻlgan qismlar (auditdan oʻtkazilgan, takrorlanmagan)

| Tushuncha                                       | Mavjud amalga oshirish                                                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Mavjudlik (trafik yubora olamizmi?)             | Avariya uzgichi (CLOSED/DEGRADED/OPEN/HALF_OPEN, DBʼda saqlanadi), ulanishni vaqtincha toʻxtatish, modelni bloklash |
| Holat hisobotlari                               | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                             |
| Soyali trafik                                   | `open-sse/services/combo/shadowRouting.ts`                                                                          |
| Himoya mexanizmlari                             | `src/lib/guardrails/` (oldingi/keyingi hookʼlar)                                                                    |
| Aniq kesh                                       | `src/lib/semanticCache.ts` (imzoga asoslangan)                                                                      |
| Baholagichlar / baholash asosidagi marshrutlash | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                |
| Combo qarorlarining tushuntirilishi             | `open-sse/services/combo/decisionTrace.ts`                                                                          |
| Boshqaruv panelining real vaqt hodisalari       | `src/lib/events/eventBus.ts` (UI bildirishnoma kanali, `unknown` foydali yuklar, 100 ta yozuv tarixi)               |

Marshrutlash hodisalari qatlami `eventBus`ning qayta amalga oshirilishi **emas**: bu shina boshqaruv panelining real vaqt bildirishnomalari kanali (tiplashtirilgan _hodisa nomlari_, noaniq foydali yuklar, UI isteʼmolchilari). `RoutingEvent` esa boshqaruv tekisligining qayta aloqa qabul qiluvchilari (sifat kuzatuvchisi, OTel eksportchisi, izohlar ombori) tomonidan isteʼmol qilinadigan tiplashtirilgan _natija_ tuzilmasidir (kechikish/tokenlar/xarajat/natija/yakunlanish sababi).

### Yetishmagan qismlar (bu yerda qoʻshildi)

1. **Tiplashtirilgan marshrutlash natijasi hodisasi + qabul qiluvchi abstraksiyasi** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` faqat combo doirasida ishlaydi va faqat xotirada saqlanadi;
   `comboMetrics` jamlanma hisoblagichlardir; `call_logs` esa asinxron saqlanadigan xom maʼlumotdir.
   Ularning hech biri sifat kuzatuvchisi, OTel eksportchisi yoki Future-AGI uslubidagi baholagich obuna boʻlishi mumkin boʻlgan, qabul qiluvchilarga asoslangan tiplashtirilgan natijalar kanali emas.
2. Chiqarilgan natija sifati uchun **onlayn sifat signali** (EWMA) — avval baholagich "sifat"ni faqat statik vazifa mosligi va ixtiyoriy baholashlardan oʻtish koʻrsatkichlari orqali bilvosita baholardi.
3. GenAI semantik kelishuvlaridan foydalanadigan **ixtiyoriy, bogʻliqliklarsiz OTel eksportchisi**.
4. Haqiqiy marshrutlash qarorlari va sifat holatini qaytaruvchi **tushuntirish imkoniyati endpointi**.

## 2. Marshrutlash hodisalari (fikr-mulohaza asosi)

Fayllar: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` faqat marshrutlash metama’lumotlarini tashiydi:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // ruxsat etilgan qiymatlar birlashmasi
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` TypeScript’dagi `Send+Sync` uslubidagi trait hisoblanadi:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) bo‘lishi shart, sinxron I/O yo‘q
}
```

Tezkor yo‘l har bir yakunlangan so‘rov uchun `emitRoutingEvent(event)` funksiyasini bir marta chaqiradi
(oqimli yakunlash callback’i, oqimsiz muvaffaqiyat yo‘li va
`handleChatCore` ichidagi noto‘g‘ri shakllangan 200 xatolik yo‘li). Tarqatish ro‘yxatdan
o‘tgan sink’larga sinxron tarzda uzatiladi, biroq har bir sink faqat navbatga qo‘shadi yoki
xotiradagi holatni yangilaydi. **Tezkor yo‘lda sinxron ma’lumotlar bazasi yozuvlari ham,
tarmoq I/O’si ham yo‘q.**

Standart sink’lar:

- `MemoryRoutingEventStore` — explain endpoint’i uchun chegaralangan (500)
  halqali bufer, eng yangilari birinchi.
- `QualityTracker` iste’molchisi — EWMA sifat bahosini yangilaydi.
- `OtlpHttpsEventSink` — ixtiyoriy, faqat `OMNIROUTE_OTEL_ENDPOINT`
  (yoki `OTEL_EXPORTER_OTLP_ENDPOINT`) o‘rnatilganda yoqiladi.

### O‘lchangan qo‘shimcha xarajat (xolis taqqoslash)

Ushbu ish stansiyasida `npm run bench:routing-events` (100 ming iteratsiya; sub-µs amallar
har bir amal uchun jamlangan µs/op sifatida o‘lchandi, chunki har bir amal bo‘yicha
persentillar `performance.now()` taymeri aniqligidan past):

| Ssenariy                                        | µs/op  | ops/s  |
| ----------------------------------------------- | ------ | ------ |
| asosiy daraja (faqat baholash)                  | ~0.045 | ~22 M  |
| asosiy daraja + RoutingEvent (2 ta sink)        | ~0.168 | ~5.9 M |
| asosiy daraja + hodisa + OTel navbatga qo‘shish | ~0.163 | ~6.1 M |
| parallel (8 ta navbatma-navbat burst)           | ~0.18  | —      |

Asosiy baholashga nisbatan hodisani tarqatish farqi ~0.12 µs/so‘rovni tashkil qiladi; OTel sink’i
faqat navbatga qo‘shadi (O(1) buferga kiritish) va o‘lchanadigan darajada hech qanday qo‘shimcha
xarajat keltirmaydi. Bu raqamlar muayyan mashinaga xos va nisbiydir — ular ishlab chiqarish muhiti
uchun kafolat emas. v1’dagi “~0.2 µs” ko‘rsatkichi jamlangan baho edi; bu metodologiya baholashning
asosiy darajasini hodisani tarqatish xarajatidan ajratadi.

## 3. Sifat signali (fikr-mulohazaga asoslangan provayder holati)

Fayllar: `open-sse/services/routing/quality.ts`

v2 **operatsion** sifatni **semantik** sifatdan ajratadi:

- **Operatsion** — marshrutlashning tezkor yo‘lidan olinadi (HTTP 4xx/5xx, ulanish
  xatoliklari, 429 javoblari, noto‘g‘ri shakllangan javoblar, oqim uzilishlari, `finish_reason=length`,
  chiqishsiz muvaffaqiyatlar, kechikish/TTFT EWMA). 200 javobi semantik sifat
  sifatida qabul QILINMAYDI.
- **Semantik** — yaratilgan chiqishning haqiqiy qiymati. FAQAT baholovchi tomonidan
  `setSemanticQuality()` orqali hosil qilinadi. Uni biror baholovchi taqdim etmaguncha u `null`
  bo‘lib qoladi va hech qachon operatsion bahoga aralashmaydi.

Har bir (provider, model) juftligi holati (EWMA + chegaralangan hisoblagichlar):

- `successEwma` — natija muvaffaqiyatining EWMA’si (α=0.2).
- `latencyEwma` / `ttftEwma` — kechikishning EWMA’si (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — model oxirgi marta qanchalik yaqinda kuzatilgani.

### Ishonchlilik / namunalar sonini hisobga olish

`confidence = clamp01(samples / 50)`, baholovchiga qaytariladigan baho esa
neytral o‘rta nuqta tomon aralashtiriladi:

```
score = 0.5 + confidence * (operational - 0.5)
```

Natijalar (testlar orqali tasdiqlangan):

- Yangi provayder (0 ta namuna) **0.5** baho oladi — nohaq jazolanmaydi, biroq
  minglab barqaror kuzatuvlarga ega provayderdan ustun kela olmaydi.
- 7 ta omadli muvaffaqiyatga ega provayder 0.5 tomon tortiladi (optimistik
  boshlang‘ich qiymat tufayli hech qachon ustunlik qilmaydi).
- 50 yoki undan ortiq namunaga ega provayder o‘zining haqiqiy operatsion bahosiga yaqinlashadi.
- Yomonlashish va tiklanish bosqichma-bosqich kechadi (EWMA), bitta alohida xatolik esa
  sog‘lom provayderni ishdan chiqarmaydi.

`ProviderQuality` quyidagilarni taqdim etadi: `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Bu auto-combo baholovchisiga `quality` baholash omili sifatida uzatiladi:

- `open-sse/services/autoCombo/scoring.ts` ichidagi `ScoringFactors.quality` /
  `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Yig‘indi 1.0 bo‘lib qoladi.
- `buildAutoCandidates` `candidate.quality` qiymatini tracker’dan to‘ldiradi; ma’lumoti
  bo‘lmagan nomzodlar uchun standart neytral qiymat **0.5** bo‘ladi (yangi nomzodning
  bahosi oshirilmaydi ham, pasaytirilmaydi ham).

Yopiq sikl:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo sifat omili
      ↑                                                    │
      └────── so‘rov natijasi (handleChatCore) ←────────────┘
```

### Qat’iy chiqarib tashlash va yumshoq jarima

Sifat signali faqat **yumshoq moslashuvchan afzallik** hisoblanadi. Qat’iy chiqarib tashlash
mavjud chidamlilik stekida qoladi: circuit breaker OPEN, kvota tugagan,
autentifikatsiya xatoligi, model bloklangan — bularning hech biriga sifat bahosi ta’sir qilmaydi.
Sifat bahosi vaqtincha pasaygan provayderning afzalligi kamaytiriladi, lekin u hech qachon
qat’iy ravishda o‘chirib qo‘yilmaydi.

## 3b. Kanonik oqim vaqt ko‘rsatkichlari (TTFT / ITL)

Fayllar: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` — oqimli uzatish yo‘li uchun yagona instrumentatsiya nuqtasi
bo‘lib, `createSSEStream` (`open-sse/utils/stream.ts`) bilan bog‘langan:

- `markByte()` — yuqori oqimdan birinchi bo‘lak qabul qilindi.
- `markForward()` — mijozga yuborilgan birinchi bo‘lak (TTFT uchun ishlatiladi).
- `markInterrupted()` — oqim toza yakunlanishidan oldin taym-aut/bekor qilish/xato yuz berdi.
- `ttft()` = birinchi yuborilgan SSE bo‘lagi kechikishi. **Bu token darajasidagi TTFT EMAS** —
  bitta SSE bo‘lagi nol/bitta/ko‘p tokenni o‘z ichiga olishi mumkin. Bu aniq hujjatlashtirilgan.
- `avgItlMs()` = bo‘laklar orasidagi o‘rtacha interval (ITL uchun bo‘lak kechikishi proksisi).

TTFT/ITL/uzilish holati `RoutingEvent` (`ttftMs`, `itlMs`) ichiga uzatiladi va
OTel qabul qiluvchisi tomonidan GenAI/OmniRoute span atributlari sifatida eksport qilinadi.

## 4. OpenTelemetry / GenAI kuzatuvchanligi

Fayllar: `open-sse/services/routing/otel.ts`

- Bog‘liqliklarsiz OTLP/HTTP JSON eksportchisi (global `fetch`dan foydalanadi,
  `@opentelemetry/*` SDK ishlatilmaydi).
- Spanlar GenAI semantik konvensiyalariga (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) hamda OmniRoute marshrutlash
  atributlariga (natija, holat, ttft, qayta urinishlar, zaxira variant) amal qiladi.
- `record()` faqat cheklangan bufer navbatiga qo‘shadi (O(1)); fon taymeri
  `POST {endpoint}/v1/traces` orqali asinxron yuboradi. Ortiqcha yuklama paytida
  eng eski hodisalar tashlab yuboriladi (`dropped` hisoblagichi) — ma’lumotlar
  qatlamiga hech qachon teskari bosim berilmaydi.
- **Sozlanmaguncha o‘chirilgan.** `OMNIROUTE_OTEL_ENDPOINT` (yoki
  `OTEL_EXPORTER_OTLP_ENDPOINT`) o‘rnatilishi shart; aks holda qabul qiluvchi
  ro‘yxatdan o‘tkazilmaydi va hech qanday OTel kodi ishlamaydi.

## 5. Tushuntiriluvchanlik

- `GET /v1/explain/routing` so‘nggi `RoutingEvent`larni (haqiqiy
  qarorlar, eng yangisi birinchi) hamda har bir provayder/model bo‘yicha sifat holatini qaytaradi.
- Autentifikatsiya `/v1/combos` bilan bir xil (Bearer API kaliti yoki boshqaruv
  paneli sessiyasi; `REQUIRE_API_KEY=false` bo‘lgan bir foydalanuvchili lokal
  o‘rnatishlarda anonim kirish mumkin).
- Har bir chaqiruv uchun kombinatsiya darajasidagi izlar mavjud
  `decisionTrace.ts` orqali foydalanishda qoladi (`X-OmniRoute-Combo-Trace` sarlavhasi).
- Xavfsizlik: hodisalar faqat marshrutlash metama’lumotlarini o‘z ichiga oladi,
  hech qachon promptlar/tanalar/hisob ma’lumotlarini emas.

## 6. Baholash qatlamini integratsiya qilish (Future AGI uchun tayyorgarlik)

OmniRoute Future AGI (yoki istalgan baholovchi)ni **bog‘liqlik emas, balki
potensial intellekt/baholash bekendi** sifatida ko‘radi. Integratsiya nuqtalari:

- `RoutingEventSink` hodisalarni baholovchiga asinxron yo‘naltirishi mumkin.
- `MemoryRoutingEventStore` + sifat holati baholovchiga qarorlarning xom
  oqimini taqdim etadi.
- Kelajakdagi `Evaluator` (deterministik, lokal hakam, HTTP, WASM)
  hodisalar/izlarni iste’mol qilib, ayni `getQualityScore`/sifat omili yo‘liga
  uzatiladigan `QualityScore`ni qaytaradi.
- Mavjud baholashga asoslangan marshrutlash (`open-sse/services/evalRouting.ts`)
  yoqilganda kombinatsiya nishonlarini `eval_runs` muvaffaqiyat ko‘rsatkichlari
  bo‘yicha allaqachon qayta tartiblaydi.

Hech qanday baholash so‘rov yo‘lida sinxron bajarilmaydi va shlyuz baholovchisiz
ham to‘liq ishlaydi.

## 7. Yakuniy arxitektura tahlili

1. **Sinxron tezkor yo‘lda nimalar qoladi?** Marshrutlash/baholash, himoya
   cheklovlarining dastlabki tekshiruvlari, keshdan qidirish va xotiradagi
   qabul qiluvchilarga bitta `emitRoutingEvent` tarqatilishi (bazaviy
   baholashdan ~0.12 µs ortiq).
2. **Nimalar asinxron qayta ishlashga o‘tkazildi?** OTel eksporti (taymer + fetch),
   `call_logs`/foydalanish ma’lumotlarini saqlash, semantik keshga yozish; sifat
   xotirada saqlanadi va O(1) murakkablikka ega (asinxronlik talab qilinmaydi).
3. **Marshrutlash natijasi qanday qilib fikr-mulohazaga aylanadi?** `handleChatCore`
   `RoutingEvent` chiqaradi → `QualityTracker` EWMA holatini yangilaydi →
   `getQualityScore` avtomatik kombinatsiyaning `quality` omiliga ma’lumot beradi.
4. **Sifat kelajakdagi marshrutlashga qanday ta’sir qiladi?** Past sifat
   ko‘rsatkichi `scoreAutoTargets` ichidagi tegishli provayder/modelning vaznli
   bahosini pasaytiradi, natijada sifati pasaygan modellarga ustuvorlik asta-sekin
   kamayadi va ularning EWMA ko‘rsatkichi yaxshilangan sari ular tiklanadi.
5. **Future AGI bog‘liqlikka aylanmasdan qanday integratsiya qilinishi mumkin?**
   `RoutingEventSink` interfeysi / kelajakdagi `Evaluator` adapteri orqali —
   qattiq kodlangan bog‘liqlik yo‘q.
6. **Baholovchi mavjud bo‘lmaganda nima sodir bo‘ladi?** Marshrutlashga ta’sir
   qilmaydi; kuzatilgan signalga ega bo‘lmagan modellar uchun sifat neytral
   qiymatga (1.0) qaytadi.
7. **Telemetriya mavjud bo‘lmaganda nima sodir bo‘ladi?** OTel qabul qiluvchisi
   shunchaki ro‘yxatdan o‘tkazilmaydi; marshrutlash qatlamining qolgan qismi
   o‘zgarishsiz ishlaydi.
8. **Ortiqcha yuklama paytida nima sodir bo‘ladi?** OTel buferi eng eski
   hodisalarni tashlab yuboradi; sifat va halqa buferi tuzilish jihatidan
   cheklangan; teskari bosim yo‘q.
9. **Provayder holati degradatsiyadan so‘ng qanday tiklanadi?** Muvaffaqiyatlar
   to‘planishi bilan EWMA qayta yaqinlashadi; qizdirish jarayoni sovuq modellarni
   neytral holatda saqlaydi; circuit breaker esa HALF_OPEN sinovlari orqali
   mustaqil ravishda tiklanadi.
10. **Taklif qilingan qaysi imkoniyatlar ataylab amalga oshirilmadi va nima uchun?**
    - Soyali trafik / tajribalar — allaqachon amalga oshirilgan
      (`combo/shadowRouting.ts`); qayta yaratilmagan.
    - Himoya cheklovlari — allaqachon amalga oshirilgan (`src/lib/guardrails/`);
      takrorlanmagan.
    - Semantik kesh — allaqachon amalga oshirilgan (`src/lib/semanticCache.ts`);
      takrorlanmagan.
    - To‘liq tajribalarni boshqarish platformasi, ma’lumotlar to‘plami vositalari,
      promptlarni optimallashtirish platformasi, vektorli MB yoki majburiy tashqi
      OTel infratuzilmasi — ixcham ma’lumotlar qatlami doirasidan tashqarida.
    - Rust tilidagi `RoutingEvent` strukturasi — ma’lumotlar qatlami TypeScriptda;
      TS turi unga moslashtirilgan ekvivalentdir.

## 8. Konfiguratsiya maʼlumotnomasi

| Oʻzgaruvchi                   | Standart qiymat | Taʼsiri                                                                                 |
| ----------------------------- | --------------- | --------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | belgilanmagan   | Belgilanganda OTLP/HTTP trace eksportchisini yoqadi (masalan, `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | belgilanmagan   | OTLP endpointi uchun zaxira taxallus.                                                   |
| `OTEL_SERVICE_NAME`           | `omniroute`     | `service.name` resurs atributi.                                                         |

## 9. Testlar

- `tests/unit/routing-events.test.ts` — hodisalarni normallashtirish, holatni
  tasniflash, chegaralangan halqa buferi, sinklarga tarqatish + izolyatsiya.
- `tests/unit/routing-quality.test.ts` — EWMA qizdirilishi, xato/muvaffaqiyatdan tiklanish,
  anomaliya jarimalari, 429 vaqtinchalik holatini qayta ishlash, oniy nusxa, qayta tiklash.
- `tests/unit/routing-scoring-quality.test.ts` — vaznlar yaxlitligi, neytral
  standart qiymat, sifat omili bo‘yicha reyting.
- `tests/unit/routing-otel.test.ts` — yoqishni cheklash, GenAI span foydali yuki, asinxron
  flush, ortiqcha yuklanishda tashlab yuborish.
- `tests/unit/routing-events-concurrency.test.ts` — minglab hodisalar, halqa
  buferining chegaralanganligi, istisno chiqaruvchi sinkni izolyatsiyalash, navbatma-navbat asinxron oqimlar,
  kiritishlar paytida qayta tiklash.
- `tests/unit/routing-adaptive-e2e.test.ts` — haqiqiy
  `scoreAutoTargets` baholagichi orqali deterministik boshidan oxirigacha sikl: sogʻlom → yomonlashish → tiklanish → qisqa uzilish, shuningdek,
  sovuq ishga tushish va omadli sovuq provayder ssenariylari.
- `tests/unit/stream-timing.test.ts` — TTFT (birinchi uzatilgan bo‘lak), ITL,
  birinchi bayt va birinchi uzatish, uzilish, notoʻgʻri shakllangan/boʻsh bo‘lak xavfsizligi.

## 10. Avvaldan mavjud muammolar holati (18-bosqich)

| Muammo                                                    | Holat                       | Izohlar                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` eksport nomuvofiqligi                         | **TUZATILDI (muhitga oid)** | `node_modules` `package-lock.json` bilan sinxron emas edi (oʻrnatilgani 1.3.1, qulflangani esa 1.4.0). `npm install omniglyph@1.4.0` buyrugʻini ishga tushirish qulflangan versiyani tikladi; tur xatolari 0 taga tushdi. Manifestlar oʻzgarmadi.                                                              |
| Eskirgan `getKnownContextOverflow` testlari               | **MAʼLUM — tuzatilmagan**   | `combo-context-overflow-compression-probe.test.ts` endi `open-sse/services/combo.ts` ichida mavjud boʻlmagan funksiyani import qiladi (unga faqat izohlarda murojaat qilingan). Tuzatish bu testlarni qayta amalga oshirish yoki qayta yozishni talab qiladi — bu bogʻliq boʻlmagan arxitektura oʻzgarishidir. |
| `combo-runtime-unit-concurrency.test.ts` DB izolyatsiyasi | **MAʼLUM — tuzatilmagan**   | Test vositasining SQLite izolyatsiyasi tasdigʻi bevosita ishga tushirilganda muvaffaqiyatsiz tugaydi; bazaviy branchda ham aynan shunday muvaffaqiyatsiz tugaydi.                                                                                                                                              |
| i18n `llm.txt` tafovuti                                   | **MAʼLUM — tuzatilmagan**   | `docs/i18n/*/llm.txt` fayllari ildizdagi fayldan farq qiladi; bu avvaldan mavjud boʻlib, hujjatlarni sinxronlashtirish uchun pre-commit tekshiruvini bloklaydi.                                                                                                                                                |

Muhitga oid va kodga oid muammolar alohida saqlanadi; hech qanday bogʻliq boʻlmagan xatolar
oʻzgartirilgan test filtrlari ortiga yashirilmaydi.
