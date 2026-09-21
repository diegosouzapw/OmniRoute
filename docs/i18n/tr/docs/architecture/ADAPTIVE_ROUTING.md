# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Bu belge, OmniRoute'a eklenen geri bildirim odaklı uyarlanabilir yönlendirme temelini
açıklamaktadır. Bilinçli olarak küçük tutulmuştur: tür belirtilmiş bir yönlendirme-sonucu
kanalı, mevcut auto-combo puanlayıcısını besleyen çevrimiçi bir kalite sinyali, isteğe
bağlı bir OpenTelemetry dışa aktarıcısı ve bir açıklanabilirlik uç noktası sunar. Mevcut
dayanıklılık yığınını (devre kesici, bağlantı bekleme süresi, model kilitleme, sağlık
matrisi, autopilot) **değiştirmez** — onu tamamlar.

## 1. Mimari bağlam

OmniRoute, bir **istek kritik yoluna** ve bir **kontrol/zeka düzlemine** sahip bir veri
düzlemidir. Kritik yol hızlı, bellek açısından verimli, asenkron, dayanıklı ve
öngörülebilir kalmalıdır. Değerlendirme, kalite puanlama, deneyler ve geçmişe dönük
analiz kontrol düzlemine aittir.

```
AI Aracısı / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   veri düzlemi (hızlı, senkron, bellek içi)
│ yönlendirme / yük   │
│ devretme            │
│ sağlık / koruma     │
│ önbellek / akış     │
└──────────┬──────────┘
           │ RoutingEvent (gönder ve unut, ~0.2µs)
           ▼
┌─────────────────────┐
│ Geri bildirim       │   kontrol düzlemi (asenkron, en iyi çaba)
│ havuzları            │
│ kalite izleyicisi   │
│ OTel dışa aktarıcısı│
│ açıklama deposu     │
└──────────┬──────────┘
           ▼  kalite puanı
      auto-combo puanlayıcısı
```

### Önceden mevcut olanlar (denetlendi, yinelenmedi)

| Kavram                                               | Mevcut uygulama                                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Kullanılabilirlik (trafik gönderebilir miyiz?)       | Devre kesici (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB'de kalıcı), bağlantı bekleme süresi, model kilitleme |
| Sağlık raporlaması                                   | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                               |
| Gölge trafik                                         | `open-sse/services/combo/shadowRouting.ts`                                                            |
| Korumalar                                            | `src/lib/guardrails/` (ön/son kancalar)                                                               |
| Tam eşleşmeli önbellek                               | `src/lib/semanticCache.ts` (imza tabanlı)                                                             |
| Değerlendiriciler / değerlendirme odaklı yönlendirme | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                  |
| Combo kararı açıklanabilirliği                       | `open-sse/services/combo/decisionTrace.ts`                                                            |
| Pano gerçek zamanlı olayları                         | `src/lib/events/eventBus.ts` (UI bildirim kanalı, `unknown` yükler, 100 girdilik geçmiş)              |

Yönlendirme olayı katmanı, `eventBus`'ın yeniden uygulanması **değildir**: bu veri
yolu, panonun gerçek zamanlı bildirim kanalıdır (tür belirtilmiş _olay adları_, opak
yükler, UI tüketicileri). `RoutingEvent` ise kontrol düzleminin geri bildirim havuzları
(kalite izleyicisi, OTel dışa aktarıcısı, açıklama deposu) tarafından tüketilen, türü
belirtilmiş bir _sonuç_ yapısıdır (gecikme/token/maliyet/sonuç/bitiş nedeni).

### Eksik olanlar (burada eklendi)

1. **Tür belirtilmiş bir yönlendirme-sonucu olayı + havuz soyutlaması** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace`, combo kapsamlıdır ve yalnızca bellek içindedir;
   `comboMetrics` kümülatif sayaçlardır; `call_logs` ise ham asenkron kalıcılıktır.
   Bunların hiçbiri bir kalite izleyicisinin, OTel dışa aktarıcısının veya
   Future-AGI tarzı bir değerlendiricinin abone olabileceği tür belirtilmiş, havuz
   tabanlı bir sonuç kanalı değildir.
2. Çıktı kalitesi için **çevrimiçi bir kalite sinyali** (EWMA) — puanlayıcı daha önce
   "kaliteyi" yalnızca statik görev uygunluğu ve isteğe bağlı değerlendirme geçme
   oranları üzerinden yaklaşık olarak belirliyordu.
3. GenAI semantik kurallarını kullanan **isteğe bağlı, bağımlılık gerektirmeyen bir
   OTel dışa aktarıcısı**.
4. Gerçek yönlendirme kararlarını ve kalite durumunu döndüren bir **açıklanabilirlik
   uç noktası**.

## 2. Yönlendirme Olayları (geri bildirim temeli)

Dosyalar: `open-sse/services/routing/events.ts`, `.../index.ts`

Bir `RoutingEvent` yalnızca yönlendirme meta verilerini taşır:

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
  outcome: RoutingOutcome; // izin verilen birleşim
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink`, TypeScript'te `Send+Sync` tarzında bir trait'tir:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) olmalı, senkron G/Ç olmamalı
}
```

Sıcak yol, tamamlanan her istek için bir kez `emitRoutingEvent(event)` çağırır
(`handleChatCore` içindeki akışlı tamamlama geri çağrısı, akışsız başarı yolu ve
hatalı biçimlendirilmiş 200 yanıtı hata yolu). Dağıtım, kayıtlı hedeflere senkron
olarak yayınlanır; ancak her hedef yalnızca kuyruğa ekleme yapar veya bellek içi
durumu günceller. **Sıcak yolda senkron veritabanı yazımı veya ağ G/Ç'si yoktur.**

Varsayılan hedefler:

- `MemoryRoutingEventStore` — açıklama uç noktası için sınırlı (500) döngüsel
  tampon; en yeniler önce gelir.
- `QualityTracker` tüketicisi — EWMA kalite tahminini günceller.
- `OtlpHttpsEventSink` — isteğe bağlıdır; yalnızca `OMNIROUTE_OTEL_ENDPOINT`
  (veya `OTEL_EXPORTER_OTLP_ENDPOINT`) ayarlandığında etkinleştirilir.

### Ölçülen ek yük (dürüst karşılaştırma)

Bu iş istasyonunda `npm run bench:routing-events` (100 bin yineleme; işlem başına
yüzdelik dilimler `performance.now()` zamanlayıcı çözünürlüğünün altında olduğundan
µs altındaki işlemler toplu µs/işlem olarak ölçülmüştür):

| Senaryo                                       | µs/işlem | işlem/sn |
| --------------------------------------------- | -------- | -------- |
| temel değer (yalnızca puanlama)               | ~0.045   | ~22 M    |
| temel değer + RoutingEvent (2 hedef)          | ~0.168   | ~5.9 M   |
| temel değer + olay + OTel kuyruğa ekleme      | ~0.163   | ~6.1 M   |
| eşzamanlı (iç içe geçmiş 8 yoğun işlem grubu) | ~0.18    | —        |

Temel puanlamaya kıyasla olay dağıtım farkı istek başına ~0.12 µs'dir; OTel hedefi
yalnızca kuyruğa ekleme yapar (O(1) tampon eklemesi) ve ölçülebilir bir ek yük
getirmez. Bu değerler makineye özgü ve görecelidir — üretim garantisi değildir.
v1'deki "~0.2 µs" değeri toplu bir tahmindi; bu metodoloji, puanlama temel değerini
olay dağıtım maliyetinden ayırır.

## 3. Kalite Sinyali (geri bildirim odaklı sağlayıcı durumu)

Dosyalar: `open-sse/services/routing/quality.ts`

v2, **operasyonel** kaliteyi **anlamsal** kaliteden ayırır:

- **Operasyonel** — yönlendirme sıcak yolundan türetilir (HTTP 4xx/5xx, bağlantı
  hataları, 429'lar, hatalı biçimlendirilmiş yanıtlar, akış kesintileri,
  `finish_reason=length`, sıfır çıktılı başarılar, gecikme/TTFT EWMA). Bir 200
  yanıtı anlamsal kalite olarak DEĞERLENDİRİLMEZ.
- **Anlamsal** — üretilen çıktının gerçek değeridir. YALNIZCA bir değerlendirici
  tarafından `setSemanticQuality()` aracılığıyla üretilir. Bir değerlendirici
  sağlayana kadar `null` değerindedir ve hiçbir zaman operasyonel puana sızmaz.

Her (sağlayıcı, model) çifti için durum (EWMA + sınırlı sayaçlar):

- `successEwma` — sonuç başarısının EWMA'sı (α=0.2).
- `latencyEwma` / `ttftEwma` — gecikmenin EWMA'sı (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — modelin en son ne kadar yakın zamanda gözlemlendiği.

### Güven / örneklem farkındalığı

`confidence = clamp01(samples / 50)` olur ve puanlayıcıya döndürülen puan,
tarafsız orta noktaya doğru harmanlanır:

```
score = 0.5 + confidence * (operational - 0.5)
```

Sonuçlar (testlerle doğrulanmıştır):

- Soğuk bir sağlayıcı (0 örnek) **0.5** puan alır — haksız yere cezalandırılmaz,
  ancak binlerce sağlam gözleme sahip bir sağlayıcıyı geride bırakamaz.
- 7 şanslı başarıya sahip bir sağlayıcı 0.5'e doğru çekilir (iyimser başlangıç
  nedeniyle hiçbir zaman baskın hâle gelmez).
- 50 veya daha fazla örneğe sahip bir sağlayıcı gerçek operasyonel puanına yakınsar.
- Bozulma ve iyileşme kademelidir (EWMA) ve tek bir münferit hata sağlıklı bir
  sağlayıcıyı mahvetmez.

`ProviderQuality`, `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` alanlarını sunar.

Bu, `quality` puanlama faktörü olarak otomatik kombinasyon puanlayıcısını besler:

- `open-sse/services/autoCombo/scoring.ts` içindeki `ScoringFactors.quality` /
  `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Toplam 1.0 olarak kalır.
- `buildAutoCandidates`, `candidate.quality` değerini izleyiciden doldurur; verisi
  olmayan adaylar varsayılan olarak tarafsız **0.5** değerini alır (soğuk bir aday
  ne desteklenir ne de cezalandırılır).

Kapalı döngü:

```
RoutingEvent → QualityTracker → getQualityScore → otomatik kombinasyon kalite faktörü
      ↑                                                    │
      └────── istek sonucu (handleChatCore) ←──────────────┘
```

### Kesin dışlama ile yumuşak ceza karşılaştırması

Kalite sinyali yalnızca **yumuşak, uyarlanabilir bir tercih** niteliğindedir.
Kesin dışlama mevcut dayanıklılık yığınıyla birlikte kalır: devre kesicinin OPEN
olması, kotanın tükenmesi, kimlik doğrulama hatası, model kilitleme — bunların
hiçbiri kalite puanından etkilenmez. Kalite puanı geçici olarak düşen bir
sağlayıcının tercih önceliği azaltılır, ancak hiçbir zaman kesin olarak devre
dışı bırakılmaz.

## 3b. Kanonik akış zamanlaması (TTFT / ITL)

Dosyalar: `open-sse/utils/streamTiming.ts`

`createStreamTiming()`, akış yolundaki tek enstrümantasyon noktasıdır ve `createSSEStream` içine bağlanmıştır (open-sse/utils/stream.ts):

- `markByte()` — ilk yukarı akış parçası alındı.
- `markForward()` — istemciye iletilen ilk parça (TTFT için kullanılır).
- `markInterrupted()` — temiz bir tamamlanmadan önce akış zaman aşımı/iptali/hatası.
- `ttft()` = ilk iletilen SSE parçasının gecikmesi. **Bu, token düzeyinde TTFT DEĞİLDİR** —
  tek bir SSE parçası sıfır/bir/birçok token taşıyabilir. Kesin biçimde belgelenmiştir.
- `avgItlMs()` = parçalar arası ortalama süre (ITL için parça gecikmesi vekil metriği).

TTFT/ITL/kesintiye uğrama bilgileri `RoutingEvent` içine (`ttftMs`, `itlMs`) aktarılır ve OTel sink'i tarafından GenAI/OmniRoute span öznitelikleri olarak dışa aktarılır.

## 4. OpenTelemetry / GenAI gözlemlenebilirliği

Dosyalar: `open-sse/services/routing/otel.ts`

- Bağımlılık içermeyen OTLP/HTTP JSON dışa aktarıcısı (global `fetch` kullanır, `@opentelemetry/*` SDK'sını kullanmaz).
- Span'ler, GenAI semantik kurallarına (`gen_ai.provider.name`, `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`, `gen_ai.completion.finish_reason`, `gen_ai.system`) ve OmniRoute yönlendirme özniteliklerine (sonuç, durum, ttft, yeniden denemeler, yedek seçeneğe geçiş) uyar.
- `record()` yalnızca sınırlı bir tampona ekleme yapar (O(1)); bir arka plan zamanlayıcısı, `POST {endpoint}/v1/traces` aracılığıyla eşzamansız olarak boşaltım yapar. Aşırı yük altında en eski olaylar düşürülür (`dropped` sayacı) — veri düzlemine hiçbir zaman geri basınç uygulanmaz.
- **Yapılandırılmadığı sürece devre dışıdır.** `OMNIROUTE_OTEL_ENDPOINT` (veya `OTEL_EXPORTER_OTLP_ENDPOINT`) ayarlanmalıdır; aksi hâlde sink kaydedilmez ve hiçbir OTel kodu çalışmaz.

## 5. Açıklanabilirlik

- `GET /v1/explain/routing`, son `RoutingEvent` olaylarını (gerçek kararlar, en yenisi önce) ve sağlayıcı/model başına kalite anlık görüntüsünü döndürür.
- Kimlik doğrulama `/v1/combos` ile aynıdır (Bearer API anahtarı veya pano oturumu; `REQUIRE_API_KEY=false` olan tek kullanıcılı yerel dağıtımlarda anonim erişim).
- Combo düzeyindeki çağrı başına izler, mevcut `decisionTrace.ts` (`X-OmniRoute-Combo-Trace` üstbilgisi) üzerinden kullanılabilir olmaya devam eder.
- Güvenlik: olaylar yalnızca yönlendirme meta verilerini taşır; istemleri/gövdeleri/kimlik bilgilerini asla taşımaz.

## 6. Değerlendirme düzlemi entegrasyonu (Future AGI hazırlığı)

OmniRoute, Future AGI'yi (veya herhangi bir değerlendiriciyi) **bir bağımlılık değil, potansiyel bir zekâ/değerlendirme arka ucu** olarak ele alır. Entegrasyon noktaları:

- Bir `RoutingEventSink`, olayları eşzamansız olarak bir değerlendiriciye iletebilir.
- `MemoryRoutingEventStore` ve kalite anlık görüntüsü, değerlendiriciye ham karar akışını sağlar.
- Gelecekteki bir `Evaluator` (deterministik, yerel hakem, HTTP, WASM), olayları/izleri tüketip aynı `getQualityScore`/kalite faktörü yolunu besleyen bir `QualityScore` döndürebilir.
- Mevcut değerlendirme odaklı yönlendirme (`open-sse/services/evalRouting.ts`), etkinleştirildiğinde combo hedeflerini `eval_runs` başarı oranlarına göre zaten yeniden sıralar.

Hiçbir değerlendirme, istek yolunda eşzamanlı olarak çalışmaz ve ağ geçidi, değerlendirici olmadan da tamamen çalışır.

## 7. Nihai mimari inceleme

1. **Eşzamanlı sıcak yolda neler kalır?** Yönlendirme/puanlama, güvenlik bariyeri ön kontrolleri, önbellek araması ve bellek içi sink'lere tek bir `emitRoutingEvent` fan-out işlemi (temel puanlamaya göre ~0.12 µs ek süre).
2. **Neler eşzamansız işlemeye taşındı?** OTel dışa aktarımı (zamanlayıcı + fetch), `call_logs`/kullanım kalıcılığı ve semantik önbellek yazımları; kalite işlemleri bellek içindedir ve O(1)'dir (eşzamansız işlem gerekmez).
3. **Bir yönlendirme sonucu nasıl geri bildirime dönüşür?** `handleChatCore` bir `RoutingEvent` yayınlar → `QualityTracker`, EWMA durumunu günceller → `getQualityScore`, otomatik combo'nun `quality` faktörünü besler.
4. **Kalite gelecekteki yönlendirmeyi nasıl etkiler?** Düşük bir kalite puanı, `scoreAutoTargets` içindeki ilgili sağlayıcı/modelin ağırlıklı puanını düşürür; böylece performansı bozulan modellerin tercihi kademeli olarak azaltılır ve EWMA'ları iyileştikçe tekrar toparlanırlar.
5. **Future AGI bir bağımlılığa dönüşmeden nasıl entegre olabilir?** `RoutingEventSink` arayüzü / gelecekteki bir `Evaluator` adaptörü aracılığıyla — sabit kodlanmış bağımlılık yoktur.
6. **Değerlendirici kullanılamadığında ne olur?** Yönlendirme etkilenmez; kalite, gözlemlenmiş sinyali olmayan modeller için nötr değere (1.0) geri döner.
7. **Telemetri kullanılamadığında ne olur?** OTel sink'i kaydedilmez; yönlendirme katmanının geri kalanı değişmeden çalışır.
8. **Aşırı yük altında ne olur?** OTel tamponu en eski olayları düşürür; kalite verileri ve halka tampon tasarım gereği sınırlıdır; geri basınç oluşmaz.
9. **Sağlayıcı durumu performans düşüşünden sonra nasıl toparlanır?** Başarılı sonuçlar biriktikçe EWMA yeniden yakınsar; ısınma süreci yeni modelleri nötr tutar; devre kesici ise HALF_OPEN yoklamaları aracılığıyla bağımsız olarak toparlanır.
10. **Önerilen hangi özellikler bilinçli olarak UYGULANMADI ve neden?**
    - Gölge trafik / deneyler — zaten uygulanmış durumda (`combo/shadowRouting.ts`); yeniden oluşturulmadı.
    - Güvenlik bariyerleri — zaten uygulanmış durumda (`src/lib/guardrails/`); yinelenmedi.
    - Semantik önbellek — zaten uygulanmış durumda (`src/lib/semanticCache.ts`); yinelenmedi.
    - Tam kapsamlı bir deney yönetimi platformu, veri kümesi araçları, istem optimizasyonu platformu, vektör DB veya zorunlu harici OTel altyapısı — yalın bir veri düzleminin kapsamı dışındadır.
    - Bir Rust `RoutingEvent` struct'ı — veri düzlemi TypeScript'tir; TS türü uyarlanmış eşdeğeridir.

## 8. Yapılandırma referansı

| Değişken                      | Varsayılan   | Etki                                                                                       |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | ayarlanmamış | Ayarlandığında OTLP/HTTP iz dışa aktarıcısını etkinleştirir (ör. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ayarlanmamış | OTLP uç noktası için yedek takma ad.                                                       |
| `OTEL_SERVICE_NAME`           | `omniroute`  | `service.name` kaynak özniteliği.                                                          |

## 9. Testler

- `tests/unit/routing-events.test.ts` — olay normalleştirme, durum
  sınıflandırması, sınırlı halka arabellek, alıcıya dağıtım + yalıtım.
- `tests/unit/routing-quality.test.ts` — EWMA ısınması, başarısızlık/başarı kurtarması,
  anomali cezaları, 429 geçici durum işleme, anlık görüntü, sıfırlama.
- `tests/unit/routing-scoring-quality.test.ts` — ağırlık bütünlüğü, nötr
  varsayılan değer, kalite faktörü sıralaması.
- `tests/unit/routing-otel.test.ts` — etkinleştirme denetimi, GenAI span yükü, asenkron
  boşaltma, aşırı yük altında atma.
- `tests/unit/routing-events-concurrency.test.ts` — binlerce olay, halka
  arabelleğin sınırlılığı, hata fırlatan alıcıların yalıtımı, iç içe geçmiş asenkron patlamalar,
  eklemeler sırasında sıfırlama.
- `tests/unit/routing-adaptive-e2e.test.ts` — gerçek
  `scoreAutoTargets` puanlayıcısı aracılığıyla deterministik uçtan uca döngü: sağlıklı → bozulma → kurtarma → kısa süreli aksama; ayrıca
  soğuk başlangıç ve şanslı soğuk sağlayıcı senaryoları.
- `tests/unit/stream-timing.test.ts` — TTFT (ilk iletilen parça), ITL,
  ilk bayt ile ilk iletim karşılaştırması, kesinti, hatalı/boş parça güvenliği.

## 10. Önceden mevcut sorunların durumu (Aşama 18)

| Sorun                                                    | Durum                        | Notlar                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` dışa aktarma uyuşmazlığı                     | **DÜZELTİLDİ (ortamsal)**    | `node_modules`, `package-lock.json` ile eşitlenmemişti (kurulu sürüm 1.3.1, kilitli sürüm 1.4.0). `npm install omniglyph@1.4.0` komutunun çalıştırılması kilitli sürümü geri yükledi; tür hataları 0'a düştü. Manifestolar değiştirilmedi.                                                                              |
| Güncelliğini yitirmiş `getKnownContextOverflow` testleri | **BİLİNİYOR — düzeltilmedi** | `combo-context-overflow-compression-probe.test.ts`, `open-sse/services/combo.ts` içinde artık bulunmayan bir işlevi içe aktarıyor (yalnızca yorumlarda buna atıfta bulunuluyor). Düzeltme, bu işlevin yeniden uygulanmasını veya söz konusu testlerin yeniden yazılmasını gerektiriyor — ilgisiz bir mimari değişiklik. |
| `combo-runtime-unit-concurrency.test.ts` DB yalıtımı     | **BİLİNİYOR — düzeltilmedi** | Test düzeneğinin SQLite yalıtım doğrulaması doğrudan çalıştırıldığında başarısız oluyor; temel dalda da aynı şekilde başarısız oluyor.                                                                                                                                                                                  |
| i18n `llm.txt` sapması                                   | **BİLİNİYOR — düzeltilmedi** | `docs/i18n/*/llm.txt` dosyaları kök dizindekinden farklı; bu önceden mevcut olan durum, doküman eşitleme ön-işleme denetimini engelliyor.                                                                                                                                                                               |

Ortamla ilgili sorunlar ile kod sorunları birbirinden ayrı tutulur; ilgisiz hiçbir başarısızlık,
değiştirilmiş test filtrelerinin arkasına gizlenmez.
