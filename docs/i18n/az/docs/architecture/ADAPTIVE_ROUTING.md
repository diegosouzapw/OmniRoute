# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Bu sənəd OmniRoute-a əlavə edilmiş geribildirimlə idarə olunan adaptiv marşrutlaşdırma təməlini təsvir edir. O, bilərəkdən kiçik saxlanılıb: tipləşdirilmiş marşrutlaşdırma nəticəsi kanalı, mövcud avtomatik kombinasiya qiymətləndiricisini məlumatlandıran onlayn keyfiyyət siqnalı, istəyə bağlı OpenTelemetry ixracatçısı və izaholunma endpoint-i təqdim edir. O, mövcud dayanıqlılıq stekini (dövrə açarı, bağlantının soyuma müddəti, modelin bloklanması, sağlamlıq matrisi, avtopilot) **əvəz etmir** — onu tamamlayır.

## 1. Arxitektur kontekst

OmniRoute **sorğular üçün qaynar yola** və **idarəetmə/intellekt müstəvisinə** malik məlumat müstəvisidir. Qaynar yol sürətli, yaddaş baxımından səmərəli, asinxron, dayanıqlı və proqnozlaşdırıla bilən qalmalıdır. Qiymətləndirmə, keyfiyyətin hesablanması, eksperimentlər və tarixi təhlil idarəetmə müstəvisinə aiddir.

```
AI Agenti / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   məlumat müstəvisi (sürətli, sinxron, yaddaşdaxili)
│ marşrutlama / keçid │
│ sağlamlıq / qoruma  │
│ keş / axın          │
└──────────┬──────────┘
           │ RoutingEvent (göndər və unut, ~0.2µs)
           ▼
┌─────────────────────┐
│ Geribildirim qəbulediciləri │   idarəetmə müstəvisi (asinxron, ən yaxşı cəhd)
│ keyfiyyət izləyicisi │
│ OTel ixracatçısı    │
│ izah saxlancı       │
└──────────┬──────────┘
           ▼  keyfiyyət balı
 avtomatik kombinasiya qiymətləndiricisi
```

### Əvvəldən mövcud olanlar (audit edilib, təkrarlanmayıb)

| Konsepsiya                                                       | Mövcud reallaşdırma                                                                                             |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Əlçatanlıq (trafik göndərə bilərikmi?)                           | Dövrə açarı (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB-də saxlanılan), bağlantının soyuma müddəti, modelin bloklanması |
| Sağlamlıq hesabatı                                               | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                         |
| Kölgə trafik                                                     | `open-sse/services/combo/shadowRouting.ts`                                                                      |
| Qoruyucu mexanizmlər                                             | `src/lib/guardrails/` (əvvəl/sonra qarmaqları)                                                                  |
| Dəqiq keş                                                        | `src/lib/semanticCache.ts` (imza əsaslı)                                                                        |
| Qiymətləndiricilər / qiymətləndirmə ilə idarə olunan marşrutlama | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                            |
| Kombinasiya qərarlarının izaholunması                            | `open-sse/services/combo/decisionTrace.ts`                                                                      |
| İdarəetmə panelinin real vaxt hadisələri                         | `src/lib/events/eventBus.ts` (UI bildiriş kanalı, `unknown` faydalı yüklər, 100 qeyddən ibarət tarixçə)         |

Marşrutlaşdırma hadisəsi qatı `eventBus`-ın yenidən reallaşdırılması **deyil**: həmin şin idarəetmə panelinin real vaxt bildiriş kanalıdır (tipləşdirilmiş _hadisə adları_, qeyri-şəffaf faydalı yüklər, UI istehlakçıları). `RoutingEvent` idarəetmə müstəvisinin geribildirim qəbulediciləri (keyfiyyət izləyicisi, OTel ixracatçısı, izah saxlancı) tərəfindən istehlak olunan tipləşdirilmiş _nəticə_ strukturudur (gecikmə/tokenlər/xərc/nəticə/bitmə səbəbi).

### Çatışmayanlar (burada əlavə edilib)

1. **Tipləşdirilmiş marşrutlaşdırma nəticəsi hadisəsi + qəbuledici abstraksiyası** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` kombinasiya ilə məhdudlaşır və yalnız yaddaşdaxilidir;
   `comboMetrics` kumulyativ sayğaclardır; `call_logs` isə xam asinxron davamlı saxlamadır.
   Bunların heç biri keyfiyyət izləyicisinin, OTel ixracatçısının və ya Future-AGI tipli qiymətləndiricinin abunə ola biləcəyi tipləşdirilmiş, qəbuledici əsaslı nəticə kanalı deyil.
2. Çıxış keyfiyyəti üçün **onlayn keyfiyyət siqnalı** (EWMA) — qiymətləndirici əvvəllər “keyfiyyət”i yalnız statik tapşırıq uyğunluğu və istəyə bağlı qiymətləndirmələrin keçid göstəriciləri vasitəsilə dolayı şəkildə ölçürdü.
3. GenAI semantik konvensiyalarından istifadə edən **istəyə bağlı, asılılıqsız OTel ixracatçısı**.
4. Həqiqi marşrutlaşdırma qərarlarını və keyfiyyət vəziyyətini qaytaran **izaholunma endpoint-i**.

## 2. Marşrutlaşdırma hadisələri (əks əlaqənin təməli)

Fayllar: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` yalnız marşrutlaşdırma metadatasını daşıyır:

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
  outcome: RoutingOutcome; // icazə verilən dəyərlər birliyi
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink`, TypeScript-də `Send+Sync` üslublu bir trait-dir:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) olmalıdır, sinxron I/O olmamalıdır
}
```

Qaynar yol tamamlanmış hər sorğu üçün `emitRoutingEvent(event)` funksiyasını bir dəfə çağırır
(axınlı tamamlanma geri çağırışı, axınsız uğur yolu və `handleChatCore` daxilində
qüsurlu-200 xəta yolu). Paylama qeydiyyatdan keçmiş qəbul nöqtələrinə sinxron şəkildə
yayılır, lakin hər qəbul nöqtəsi yalnız növbəyə əlavə edir və ya yaddaşdaxili vəziyyəti
yeniləyir. **Qaynar yolda sinxron verilənlər bazası yazılışları və ya şəbəkə I/O-su
yoxdur.**

Defolt qəbul nöqtələri:

- `MemoryRoutingEventStore` — izah son nöqtəsi üçün məhdud ölçülü (500),
  ən yenilər əvvəldə olan halqa buferi.
- `QualityTracker` istehlakçısı — EWMA keyfiyyət təxminini yeniləyir.
- `OtlpHttpsEventSink` — istəyə bağlıdır, yalnız `OMNIROUTE_OTEL_ENDPOINT`
  (və ya `OTEL_EXPORTER_OTLP_ENDPOINT`) təyin edildikdə aktivləşdirilir.

### Ölçülmüş əlavə yük (dürüst müqayisə)

Bu iş stansiyasında `npm run bench:routing-events` (100k iterasiya; hər əməliyyat
üzrə percentillər `performance.now()` taymerinin ayırdetmə qabiliyyətindən aşağı
olduğuna görə sub-µs əməliyyatlar ümumi µs/op kimi ölçülüb):

| Ssenari                                  | µs/op  | ops/s  |
| ---------------------------------------- | ------ | ------ |
| baza səviyyəsi (yalnız ballama)          | ~0.045 | ~22 M  |
| baza + RoutingEvent (2 qəbul nöqtəsi)    | ~0.168 | ~5.9 M |
| baza + hadisə + OTel növbəyə əlavəetməsi | ~0.163 | ~6.1 M |
| paralel (bir-birinə keçirilmiş 8 paket)  | ~0.18  | —      |

Hadisə paylamasının baza ballamasına nisbətən fərqi təxminən
~0.12 µs/sorğudur; OTel qəbul nöqtəsi yalnız növbəyə əlavə edir (O(1) buferə
əlavəetmə) və ölçülə bilən heç bir əlavə yük yaratmır. Bu rəqəmlər konkret maşına
xas və nisbidir — istehsal mühiti üçün zəmanət deyil. v1-dəki "~0.2 µs" göstəricisi
ümumi təxmin idi; bu metodologiya baza ballamasını hadisə paylama xərcindən ayırır.

## 3. Keyfiyyət siqnalı (əks əlaqə ilə idarə olunan provayder vəziyyəti)

Fayllar: `open-sse/services/routing/quality.ts`

v2 **əməliyyat** keyfiyyətini **semantik** keyfiyyətdən ayırır:

- **Əməliyyat** — marşrutlaşdırmanın qaynar yolundan əldə edilir (HTTP 4xx/5xx,
  bağlantı xətaları, 429-lar, qüsurlu cavablar, axın kəsilmələri,
  `finish_reason=length`, sıfır çıxışlı uğurlar, gecikmə/TTFT EWMA). 200 cavabı
  semantik keyfiyyət kimi qəbul EDİLMİR.
- **Semantik** — yaradılmış çıxışın faktiki dəyəri. YALNIZ qiymətləndirici
  tərəfindən `setSemanticQuality()` vasitəsilə yaradılır. Qiymətləndirici onu
  təqdim edənədək `null` olaraq qalır və heç vaxt əməliyyat balına qarışmır.

Hər (provayder, model) üçün vəziyyət (EWMA + məhdud sayğaclar):

- `successEwma` — nəticə uğurunun EWMA-sı (α=0.2).
- `latencyEwma` / `ttftEwma` — gecikmənin EWMA-sı (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — modelin sonuncu dəfə nə qədər yaxın zamanda müşahidə edildiyi.

### Etibarlılıq / nümunə sayının nəzərə alınması

`confidence = clamp01(samples / 50)` və ballayıcıya qaytarılan bal neytral
orta nöqtəyə doğru qarışdırılır:

```
score = 0.5 + confidence * (operational - 0.5)
```

Nəticələr (testlərlə təsdiqlənib):

- Soyuq provayder (0 nümunə) **0.5** bal alır — ədalətsiz şəkildə cəzalandırılmır,
  lakin minlərlə sabit müşahidəsi olan provayderi üstələyə bilmir.
- 7 təsadüfi uğuru olan provayder 0.5-ə doğru çəkilir (optimist başlanğıc
  dəyərinə görə heç vaxt üstünlük qazanmır).
- 50+ nümunəsi olan provayder öz həqiqi əməliyyat balına yaxınlaşır.
- Pisləşmə və bərpa tədricən baş verir (EWMA) və tək bir təcrid olunmuş xəta
  sağlam provayderi sıradan çıxarmır.

`ProviderQuality`, `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` təqdim edir.

Bu, `quality` ballama amili kimi avtomatik kombinasiya ballayıcısına ötürülür:

- `open-sse/services/autoCombo/scoring.ts` daxilində
  `ScoringFactors.quality` / `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Cəm 1.0 olaraq qalır.
- `buildAutoCandidates`, `candidate.quality` dəyərini izləyicidən götürür;
  məlumatı olmayan namizədlər üçün defolt neytral dəyər **0.5**-dir (soyuq namizəd
  nə gücləndirilir, nə də cəzalandırılır).

Qapalı dövrə:

```
RoutingEvent → QualityTracker → getQualityScore → avtomatik kombinasiya keyfiyyət amili
      ↑                                                    │
      └────── sorğunun nəticəsi (handleChatCore) ←──────────┘
```

### Sərt istisna və yumşaq cəza

Keyfiyyət siqnalı yalnız **yumşaq adaptiv üstünlükdür**. Sərt istisna mövcud
dayanıqlılıq stekində qalır: dövrəqıranın OPEN vəziyyəti, tükənmiş kvota,
autentifikasiya xətası, modelin bloklanması — bunların heç birinə keyfiyyət balı
təsir etmir. Keyfiyyət balı müvəqqəti olaraq azalan provayderə daha aşağı üstünlük
verilir, lakin o, heç vaxt sərt şəkildə deaktiv edilmir.

## 3b. Kanonik axın zamanlaması (TTFT / ITL)

Fayllar: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` axın yolu üçün vahid instrumentasiya nöqtəsidir və `createSSEStream`-ə (`open-sse/utils/stream.ts`) qoşulub:

- `markByte()` — yuxarı axından ilk fraqment alındı.
- `markForward()` — ilk fraqment müştəriyə yönləndirildi (TTFT üçün istifadə olunur).
- `markInterrupted()` — axın təmiz şəkildə tamamlanmazdan əvvəl taym-aut/dayandırılma/xəta.
- `ttft()` = ilk yönləndirilmiş SSE fraqmentinin gecikməsi. **Bu, token səviyyəli TTFT DEYİL** —
  bir SSE fraqmenti sıfır/bir/çoxlu token daşıya bilər. Bu, dəqiq şəkildə sənədləşdirilib.
- `avgItlMs()` = fraqmentlərarası intervalın orta qiyməti (ITL üçün fraqment gecikməsi proksisi).

TTFT/ITL/dayandırılma məlumatları `RoutingEvent`-ə (`ttftMs`, `itlMs`) ötürülür və
OTel qəbuledicisi tərəfindən GenAI/OmniRoute span atributları kimi ixrac edilir.

## 4. OpenTelemetry / GenAI müşahidəolunması

Fayllar: `open-sse/services/routing/otel.ts`

- Asılılıqsız OTLP/HTTP JSON ixracatçısı (qlobal `fetch` istifadə edir,
  `@opentelemetry/*` SDK istifadə etmir).
- Span-lar GenAI semantik konvensiyalarına (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), həmçinin OmniRoute marşrutlaşdırma
  atributlarına (nəticə, status, ttft, təkrar cəhdlər, ehtiyat keçid) uyğundur.
- `record()` yalnız məhdud ölçülü buferə növbələyir (O(1)); fon taymeri
  asinxron şəkildə `POST {endpoint}/v1/traces` vasitəsilə göndəriş edir. Həddindən artıq yük zamanı
  ən köhnə hadisələr silinir (`dropped` sayğacı) — məlumat müstəvisinə heç vaxt
  əks təzyiq tətbiq edilmir.
- **Konfiqurasiya edilmədikdə deaktivdir.** `OMNIROUTE_OTEL_ENDPOINT` (və ya
  `OTEL_EXPORTER_OTLP_ENDPOINT`) təyin edilməlidir; əks halda qəbuledici
  qeydiyyata alınmır və heç bir OTel kodu işləmir.

## 5. İzaholunma

- `GET /v1/explain/routing` son `RoutingEvent`-ləri (real
  qərarlar, ən yenilər əvvəl olmaqla) və hər provayder/model üzrə keyfiyyət görüntüsünü qaytarır.
- Autentifikasiya `/v1/combos` ilə eynidir (Bearer API açarı və ya idarə paneli sessiyası;
  `REQUIRE_API_KEY=false` olan tək istifadəçili lokal yerləşdirmələrdə anonim giriş).
- Kombinasiya səviyyəli hər çağırış üzrə treyslər mövcud
  `decisionTrace.ts` vasitəsilə əlçatan olaraq qalır (`X-OmniRoute-Combo-Trace` başlığı).
- Təhlükəsizlik: hadisələr yalnız marşrutlaşdırma metadatasını daşıyır, heç vaxt promptları/sorğu gövdələrini/giriş məlumatlarını daşımır.

## 6. Qiymətləndirmə müstəvisi ilə inteqrasiya (Future AGI hazırlığı)

OmniRoute Future AGI-ni (və ya istənilən qiymətləndiricini) **potensial
intellekt/qiymətləndirmə bekendi kimi qəbul edir, asılılıq kimi yox**. İnteqrasiya nöqtələri:

- `RoutingEventSink` hadisələri qiymətləndiriciyə asinxron şəkildə yönləndirə bilər.
- `MemoryRoutingEventStore` + keyfiyyət görüntüsü qiymətləndiriciyə xam
  qərar axınını təqdim edir.
- Gələcək `Evaluator` (deterministik, lokal hakim, HTTP, WASM)
  hadisələri/treysləri qəbul edib eyni `getQualityScore`/keyfiyyət əmsalı yoluna ötürülən
  `QualityScore` qaytara bilər.
- Mövcud qiymətləndirməyə əsaslanan marşrutlaşdırma (`open-sse/services/evalRouting.ts`)
  aktiv olduqda kombinasiya hədəflərini `eval_runs` keçid nisbətlərinə əsasən artıq
  yenidən sıralayır.

Heç bir qiymətləndirmə sorğu yolunda sinxron şəkildə işləmir və şlüz
qiymətləndirici olmadan tam işləyir.

## 7. Yekun arxitektura icmalı

1. **Sinxron qaynar yolda nə qalır?** Marşrutlaşdırma/xalların hesablanması, qoruyucu qaydaların
   ilkin yoxlamaları, keş axtarışı və yaddaşdaxili qəbuledicilərə bir `emitRoutingEvent`
   paylanması (baza xal hesablanması ilə müqayisədə ~0.12 µs).
2. **Nələr asinxron emala keçirildi?** OTel ixracı (taymer + fetch),
   `call_logs`/istifadə məlumatlarının saxlanması, semantik keşə yazmalar; keyfiyyət yaddaşdaxilidir
   və O(1)-dir (asinxronluğa ehtiyac yoxdur).
3. **Marşrutlaşdırma nəticəsi necə əks əlaqəyə çevrilir?** `handleChatCore`
   bir `RoutingEvent` yaradır → `QualityTracker` EWMA vəziyyətini yeniləyir → `getQualityScore`
   avtomatik kombinasiyanın `quality` əmsalını təmin edir.
4. **Keyfiyyət gələcək marşrutlaşdırmaya necə təsir edir?** Aşağı keyfiyyət xalı
   `scoreAutoTargets` daxilində həmin provayder/modelin çəkili xalını azaldır; beləliklə, performansı zəifləmiş
   modellərə üstünlük tədricən azalır və onların EWMA göstəricisi yaxşılaşdıqca bərpa olunur.
5. **Future AGI asılılığa çevrilmədən necə inteqrasiya oluna bilər?**
   `RoutingEventSink` interfeysi / gələcək `Evaluator` adapteri vasitəsilə — sərt kodlaşdırılmış
   asılılıq yoxdur.
6. **Qiymətləndirici əlçatan olmadıqda nə baş verir?** Marşrutlaşdırmaya təsir etmir;
   müşahidə edilmiş siqnalı olmayan modellər üçün keyfiyyət neytral dəyərə (1.0) qayıdır.
7. **Telemetriya əlçatan olmadıqda nə baş verir?** OTel qəbuledicisi sadəcə
   qeydiyyata alınmır; marşrutlaşdırma qatının qalan hissəsi dəyişmədən işləyir.
8. **Həddindən artıq yük zamanı nə baş verir?** OTel buferi ən köhnə hadisələri silir; keyfiyyət
   və halqavari bufer konstruksiyaya görə məhduddur; əks təzyiq yoxdur.
9. **Provayder vəziyyəti zəifləmədən sonra necə bərpa olunur?** Uğurlu nəticələr
   toplandıqca EWMA yenidən yaxınlaşır; isinmə soyuq modelləri neytral saxlayır; dövrəqıran
   isə HALF_OPEN sınaqları vasitəsilə müstəqil şəkildə bərpa olunur.
10. **Təklif olunan hansı funksiyalar qəsdən tətbiq EDİLMƏDİ və niyə?**
    - Kölgə trafiki / eksperimentlər — artıq tətbiq edilib
      (`combo/shadowRouting.ts`); yenidən qurulmayıb.
    - Qoruyucu qaydalar — artıq tətbiq edilib (`src/lib/guardrails/`); təkrarlanmayıb.
    - Semantik keş — artıq tətbiq edilib (`src/lib/semanticCache.ts`);
      təkrarlanmayıb.
    - Tam eksperiment idarəetmə platforması, verilənlər toplusu alətləri, prompt optimallaşdırma
      platforması, vektor DB və ya məcburi xarici OTel infrastrukturu —
      yüngül məlumat müstəvisinin əhatə dairəsindən kənardır.
    - Rust `RoutingEvent` strukturu — məlumat müstəvisi TypeScript-dədir; TS tipi
      uyğunlaşdırılmış ekvivalentdir.

## 8. Konfiqurasiya arayışı

| Dəyişən                       | Standart dəyər  | Təsiri                                                                                    |
| ----------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | təyin edilməyib | Təyin edildikdə OTLP/HTTP iz ixracatçısını aktivləşdirir (məs., `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | təyin edilməyib | OTLP son nöqtəsi üçün ehtiyat alias.                                                      |
| `OTEL_SERVICE_NAME`           | `omniroute`     | `service.name` resurs atributu.                                                           |

## 9. Testlər

- `tests/unit/routing-events.test.ts` — hadisələrin normallaşdırılması, statusun
  təsnifatı, məhdud ölçülü halqavari bufer, qəbuledicilərə paylama + izolyasiya.
- `tests/unit/routing-quality.test.ts` — EWMA ilkin hazırlığı, uğursuzluq/uğurdan sonra bərpa,
  anomaliya cərimələri, 429 keçici halının emalı, ani görüntü, sıfırlama.
- `tests/unit/routing-scoring-quality.test.ts` — çəki bütövlüyü, neytral
  standart dəyər, keyfiyyət əmsalına görə sıralama.
- `tests/unit/routing-otel.test.ts` — aktivləşdirmə şərti, GenAI span faydalı yükü, asinxron
  boşaltma, həddindən artıq yük zamanı buraxılma.
- `tests/unit/routing-events-concurrency.test.ts` — minlərlə hadisə, halqavari
  buferin məhdudluğu, xəta atan qəbuledicinin izolyasiyası, növbələnən asinxron axınlar,
  daxiletmələr zamanı sıfırlama.
- `tests/unit/routing-adaptive-e2e.test.ts` — real
  `scoreAutoTargets` qiymətləndiricisi vasitəsilə deterministik başdan-sona dövr: sağlam → pisləşmə → bərpa → qısamüddətli nasazlıq, həmçinin
  soyuq başlanğıc və təsadüfən uğurlu soyuq provayder ssenariləri.
- `tests/unit/stream-timing.test.ts` — TTFT (ilk yönləndirilmiş fraqment), ITL,
  ilk bayt və ilk yönləndirmə, kəsilmə, səhv formatlı/boş fraqment təhlükəsizliyi.

## 10. Əvvəldən mövcud olan problemlərin vəziyyəti (Mərhələ 18)

| Problem                                                  | Vəziyyət                       | Qeydlər                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniglyph` ixrac uyğunsuzluğu                           | **DÜZƏLDİLİB (mühitlə bağlı)** | `node_modules`, `package-lock.json` ilə sinxron deyildi (quraşdırılmış 1.3.1, kilidlənmiş 1.4.0). `npm install omniglyph@1.4.0` əmri kilidlənmiş versiyanı bərpa etdi; tip xətalarının sayı 0-a endi. Manifestlər dəyişdirilmədi.                                                                                  |
| Köhnəlmiş `getKnownContextOverflow` testləri             | **MƏLUMDUR — düzəldilməyib**   | `combo-context-overflow-compression-probe.test.ts`, `open-sse/services/combo.ts` daxilində artıq mövcud olmayan funksiyanı idxal edir (ona yalnız şərhlərdə istinad olunur). Düzəliş həmin testlərin yenidən həyata keçirilməsini və ya yenidən yazılmasını tələb edir — bu isə əlaqəsiz arxitektur dəyişiklikdir. |
| `combo-runtime-unit-concurrency.test.ts` DB izolyasiyası | **MƏLUMDUR — düzəldilməyib**   | Test infrastrukturu birbaşa işə salındıqda SQLite izolyasiyası təsdiqi uğursuz olur; baza budağında da eyni şəkildə uğursuz olur.                                                                                                                                                                                  |
| i18n `llm.txt` yayınması                                 | **MƏLUMDUR — düzəldilməyib**   | `docs/i18n/*/llm.txt` kök fayldan fərqlənir; əvvəlcədən mövcuddur və sənədlərin sinxronlaşdırılması üçün pre-commit yoxlamasını bloklayır.                                                                                                                                                                         |

Mühitlə bağlı problemlər kod problemlərindən ayrı saxlanılır; əlaqəsiz uğursuzluqlar
dəyişdirilmiş test filtrlərinin arxasında gizlədilmir.
