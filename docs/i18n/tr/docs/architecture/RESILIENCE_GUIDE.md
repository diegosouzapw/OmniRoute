# Resilience Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute'un birbiriyle ilişkili ancak farklı üç dayanıklılık mekanizması vardır. Her birinin kapsamı ve amacı farklıdır. Yönlendirme davranışında hata ayıklarken bunları birbirinden ayrı tutun.

![3 katmanlı dayanıklılık modeli](../diagrams/exported/resilience-3layers.svg)

> Kaynak: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Sağlayıcı Devre Kesici (Provider Circuit Breaker)

**Kapsam:** sağlayıcının tamamı (ör. `glm`, `openai`, `anthropic`).

**Amaç:** yukarı akış/servis düzeyinde tekrar tekrar başarısız olan bir sağlayıcıya trafik göndermeyi durdurmak.

**Uygulama:**

- Çekirdek sınıf: `src/shared/utils/circuitBreaker.ts`
- Bağlantılar: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Durum API'si: `GET /api/monitoring/health`
- Sıfırlama API'si: `POST /api/resilience/reset`
- Sarmalayıcılar: `open-sse/services/accountFallback.ts`
- DB tablosu: `domain_circuit_breakers`

**Durumlar:**

- `CLOSED` — normal trafiğe izin verilir
- `DEGRADED` — trafiğe hâlâ izin verilir, ancak artan sağlayıcı hataları izlenir; yeterli sayıda başarı durumunda, geçerli bir bağlantı testinde veya son hata türü için en uzun `OPEN` bekleme süresi (o türün `cooldownByKind` değeri, yoksa `resetTimeout`, × `maxBackoffMultiplier`, en az bir cooldown) boyunca yeni bir hata oluşmadan geçmesi durumunda `CLOSED` durumuna döner
- `OPEN` — sağlayıcı geçici olarak engellenir; combo yönlendirme onu atlar
- `HALF_OPEN` — sıfırlama zaman aşımı doldu; deneme isteğine izin verilir

**Yapılandırılabilir varsayılanlar (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience altında sunulur):**

| Sınıf   | Degraded eşiği | Açılma eşiği | Sıfırlama zaman aşımı |
| ------- | -------------- | ------------ | --------------------- |
| OAuth   | 5 hata         | 8 hata       | 60sn                  |
| API-key | 7 hata         | 12 hata      | 30sn                  |
| Local   | türetilmiş     | 2 hata       | 15sn                  |

`degradationThreshold`, sağlayıcının ne zaman `DEGRADED` durumuna gireceğini; `failureThreshold` ise ne zaman açılacağını ve atlanacağını kontrol eder. Yerel (Local) sağlayıcı profilleri henüz Resilience ayarları sayfasında sunulmamaktadır.

**Tetikleme kodları:** yalnızca sağlayıcı düzeyindeki durumlar `[408, 500, 502, 503, 504]`. Hesap düzeyindeki hatalar için tetikleme YAPMAYIN (çoğu 401/403/429 — bunlar cooldown veya lockout kapsamına girer).

**Tembel kurtarma (lazy recovery):** `OPEN` süresi dolduğunda `getStatus()`, `canExecute()`, `getRetryAfterMs()` durumu `HALF_OPEN` olarak yeniler. Aynı okumalar (ve bir sonraki hata), bayatlamış bir `DEGRADED` durumunu `CLOSED` durumuna geri düşürür. Arka plan zamanlayıcısı gerekmez.

---

### İsteğe bağlı genel Sağlayıcı Cooldown'u (pencere kapısı)

Dördüncü, **isteğe bağlı** bir katman (`PROVIDER_COOLDOWN_ENABLED`, varsayılan **kapalı**),
başarısız olan sağlayıcıların istekler arası hafızasını
`open-sse/services/providerCooldownTracker.ts` içinde tutar; combo hedef
çözümlemesi tarafından kullanılarak, art arda gelen combo isteklerinin az önce
başarısız olmuş bir sağlayıcıyı tekrar tekrar denemesi engellenir. Sağlayıcı düzeyindeki
kayıtlar, `PROVIDER_PROFILES` pencere kapısına uyar:

| Profil  | tetikleme eşiği (`providerFailureThreshold`) | pencere (`providerFailureWindowMs`) | cooldown süresi (`providerCooldownMs`) |
| ------- | -------------------------------------------: | ----------------------------------: | -------------------------------------: |
| OAuth   |                                         `10` |                             `15min` |                                 `5min` |
| API key |                                         `15` |                             `30min` |                                `10min` |

Eşiğin altında sağlayıcı cooldown'da **sayılmaz**; bir başarı pencereyi temizler.
Bağlantı düzeyindeki kayıtlar (`provider:connectionId`) bunun yerine üstel
`minRetryCooldownMs → maxRetryCooldownMs` geri çekilmesini kullanmaya devam eder. Geçersiz kılmalar:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresyon koruması: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Bağlantı Bekleme Süresi (Connection Cooldown)

**Kapsam:** tek bir sağlayıcı bağlantısı/hesabı/anahtarı.

**Amaç:** aynı sağlayıcı için diğer bağlantılar hizmet vermeye devam ederken hatalı bir anahtarı atlamak.

**Uygulama:**

- Kullanılamaz olarak işaretleme: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: aynı dosyadaki `getProviderCredentials*`
- Bekleme süresi hesabı: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ayarlar: `src/lib/resilience/settings.ts`

**Bağlantı başına alanlar:**

- `rateLimitedUntil` — bekleme süresinin biteceği zaman damgası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — üstel geri çekilme sayacı

**Varsayılan bekleme süreleri:**

- OAuth tabanı: 5sn
- API anahtarı tabanı: 3sn
- API anahtarı 429: yukarı akış `Retry-After`/sıfırlama başlıklarını/ayrıştırılabilir sıfırlama metnini tercih eder
- Geri çekilme: `baseCooldownMs * 2 ** failureIndex`

**Sürü baskını (thundering herd) koruması:** eşzamanlı hataların bekleme süresini aşırı uzatmasını veya `backoffLevel`'ı çift artırmasını engeller.

**Eşzamanlılık sınırı 429'ları geri çekilme basamaklarını tırmanmaz.** Gövdesi eşzamanlılık sınırı bildiren bir `429` ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) hesabın sağlıklı ancak meşgul olduğu anlamına gelir.
`checkFallbackError()` `concurrency_limited` nedenini döndürür: hemen bir sonraki bağlantıya yük devret, bu bağlantıyı sabit bir `CONCURRENCY_LIMIT_COOLDOWN_MS` (1sn) veya yukarı akışın yeniden deneme ipucu kadar beklet, `backoffLevel`'ı değiştirme ve `skipProviderBreaker`'ı ayarla.
Açık bir kota gövdesi yine de önceliklidir; dolayısıyla bir kota kalıbıyla da eşleşen bir gövde kota kararı olarak kalır.
Tespit: `src/shared/utils/classify429.ts` içindeki `looksLikeConcurrencyLimit()`; karar: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (kesicinin `FailureKind`'ı) değişmeden kalır ve bu gövdeler için hâlâ `rate_limit` döndürür.

**Akış içerik duraklamaları hesabı bekletmez.** İçerik duraklaması bekçisi (`open-sse/utils/streamHandler.ts`) zamanında model çıktısı göndermeyen bir akıştan vazgeçtiğinde, `markAccountUnavailable()` hatayı bağlantıya kaydeder ancak bekleme süresi ayarlamaz: duraklama o isteğe aittir ve çoğunlukla henüz çıktı üretmemiş uzun bir akıl yürütme turudur. Operatörler `resilienceSettings.streamStallCooldown.enabled` ile bu davranışı yeniden etkinleştirebilir (varsayılan `false`).

**Akıl yürütme kareleri içerik duraklaması bütçesini yeniden başlatır.** Bir akıl yürütme modeli, görünür ilk token'ından önce dakikalarca düşünebilir: Claude, düşünme metni boş olabilen `thinking_delta` kareleri akıtır ve Responses API arka arkaya akıl yürütme öğeleri akıtır. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) bu kareleri tanır ve bekçi, turu iptal etmek yerine her birinde bütçesini yeniden başlatır. Bunlar hâlâ model çıktısı değildir; bu nedenle yalnızca akıl yürütmeyle biten bir tur yine boş olarak raporlanır ve akıl yürütmeyi bırakıp yalnızca heartbeat gönderen bir tur yine bekçiyi tetikler.

Kiro'nun boş olmayan imzaya sahip ikili `reasoningContentEvent` kareleri, bu akıl yürütme etkinliğini executor üzerinden boş bir `reasoning_content` deltası olarak korur. İmza iletilmez. Meta veriler, eksik kareler ve boş imzalar içerik bütçesini yeniden başlatmaz; bağımsız aktif akış zaman aşımı ve istemci iptali hâlâ geçerlidir (`open-sse/executors/kiro/reasoning.ts`).

**Nihai durumlar (bekleme süresi DEĞİLDİR):**

- `banned` — yasaklı anahtar kelime / hesap yasağı tespiti tarafından ayarlanır (bkz. [BAN_DETECTION](../security/BAN_DETECTION.md)) ve art arda üç yukarı akış istek reddi tarafından (`request_rejected`, örn. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); tek bir ret yalnızca bağlantıyı bekletir
- `expired` (sınırlı yeniden denemelerden sonra nihai duruma geçer — üstel geri çekilmeli `EXPIRED_RETRY_MAX = 3` — böylece geçici OAuth hataları, hesap kalıcı olarak devre dışı bırakılmadan önce kendini onarabilir)
- `credits_exhausted`

Bunlar, kimlik bilgileri değişene veya bir operatör sıfırlayana kadar kalır. Nihai durumları geçici bekleme süresi durumuyla ezmeyin.

**Tembel kurtarma (lazy recovery):** `rateLimitedUntil` geçtiğinde bağlantı yeniden uygun hale gelir. Başarılı kullanımda `clearAccountError()` tüm hata alanlarını temizler.

### Claude OAuth kullanım duvarı: düşük öncelikli şerit + oturum sınırı sıfırlama

**Kapsam:** bir Claude aboneliği (OAuth) bağlantısı. Her iki özellik de **bağlantı başına etkinleştirilir** (Bağlantıyı düzenle → Claude bölümü → `providerSpecificData` içinde `lowPriorityMode` / `autoLimitReset`, ikisi de varsayılan olarak kapalı) ve Claude Code'un `/low-priority` ve `/limit-reset` komutlarını yansıtır (protokol sözleşmesi Claude Code 2.1.263'ten alınmıştır).

**Uygulama:**

- Durum makinesi + yanıt sınıflandırması: `open-sse/services/claudeLowPriority.ts`
- Sıfırlama durumu/talep istemcisi: `open-sse/services/claudeLimitReset.ts`
- Executor kancası (başlık enjeksiyonu + aynı hesapla yeniden deneme): `open-sse/executors/base.ts::execute()`
- Etkinleştirme kalıcılığı: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tetikleyici:** 5 saatlik kullanım duvarı — başlıklarında `anthropic-ratelimit-unified-status: rejected` ve hesap uygun olduğunda `anthropic-ratelimit-unified-slow-offer: treatment` taşıyan bir `429`. Bu ilk duvar 429'undan önce hiçbir şey gönderilmez; birleşik başlıklar olmadan gelen bir yoğun istek 429'u normal bekleme süresi yolundan geçer.

**Düşük öncelikli şerit** (`lowPriorityMode`):

- Duvar 429'unda yürütücü teklifi kabul eder ve `anthropic-usage-limit: slow` ile **aynı** hesabı hemen yeniden dener; şerit, duyurulan `anthropic-ratelimit-unified-reset` anına kadar (+60 sn hoşgörü payı) aktif kalır ve bu penceredeki her istek başlığı taşır. Yakalanan 429 asla `handleChatCore`'a ulaşmaz; bu nedenle bağlantı soğumaya alınmaz ve rotasyonla uzaklaştırılmaz.
- Sonraki yanıtlardaki `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` şeridi korur; `slot_busy` (429) veya bir `529`, sunucunun `anthropic-ratelimit-unified-slow-retry-after` değerini (varsayılan 20 sn, sınır 5–600 sn, ±%30 jitter) bekleyip yeniden dener; bu bekleme `anthropic-ratelimit-unified-slow-max-wait` ile sınırlıdır (varsayılan 20 dk, sınır 1 dk–6 sa) — bunun ötesinde şerit sona erer ve 10 dakikalık bir soğuma yeniden kabulü engeller. Bekleme ayrıca, isteğin kendi yukarı akış başlangıç zaman aşımından (`resolveFetchStartTimeout`, varsayılan 10 dk) kalan süre eksi 5 sn'lik bir pay ile de sınırlanır: bu sınır olmasaydı 20 dakikalık varsayılan maksimum bekleme isteğin ömrünü aşar ve uyku bekleme ortasında iptal edilir; zarif `max_wait` sonu + soğuma yerine bir `TimeoutError` ortaya çıkardı.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 saatlik pencere devri veya `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ücretli aşım artık duvarı karşıladığı için herhangi bir durumda şeridi `extra_usage` olarak sonlandırır) şeridi bitirir; yanıt ardından normal soğuma yoluna akar. `budget_exhausted`, duyurulan bütçe sıfırlanmasına kadar (≤ 8 gün) hatırlanır.
- Duvar denetimi, yürütücünün kendi 400 kaynaklı deneme-içi yeniden denemelerinden (bağlam düzenleme, thinking/effort kısıtlamaları, parametre otomatik öğrenimi) sonra çalışır; bu nedenle yalnızca bu yeniden denemelerden birinde ortaya çıkan bir duvar 429'u, soğuma yoluna ulaşmak yerine yine de yakalanır.
- Durum, bağlantı başına bellek içindedir (yeniden başlatma, yeniden kabul için bir ek duvar 429'una mal olur).

**Oturum sınırı sıfırlama** (`autoLimitReset`, ikisi de açıkken şeritten önce denenir):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` bloğu; `arm: "reset"` ve `available: true` olduğunda, `{ "program": "juniper_tide" }` gövdesiyle `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` (organizasyon UUID'si `providerSpecificData.organizationUUID`'den, bootstrap yedeğiyle).
- `result: reset|not_limited` → istek tam hızda yeniden denenir (slow başlığı olmadan). `already_used` / `not_offered`, `next_available_at` değerini memoize eder (varsayılan bir hafta); herhangi bir hata 15 dakikalık geri çekilmeye yol açar. Sıfırlama haftada bir kezdir ve yine de haftalık sınıra dahil edilir.

Regresyon koruyucuları: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Oturum yakınlığı (#7274)

**Kapsam:** bir istemci oturumunun (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı) **herhangi bir** sağlayıcı için tek bir bağlantıya sabitlenmesi.

**Amaç:** çok turlu bir aracıyı (Claude Code, aider, özel aracılar) istekler boyunca aynı hesapta tutmak; hesaplar arası bağlam kaybını ve hesap başına oturum durumu tutan sağlayıcılarda tekrarlanan soğuk başlangıç 429'larını azaltmak.

**Uygulama:**

- TTL çözümlemesi: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin seçimi/oluşturma: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlık çıkarımı (genel, herhangi bir sağlayıcı): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Kalıcı pin tablosu: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ayar: `sessionAffinityTtlMs` (ms cinsinden genel TTL, `0` devre dışı bırakır) — `src/lib/db/settings.ts`. `124_generic_session_affinity_ttl.sql` geçişiyle yalnızca Codex'e özgü `codexSessionAffinityTtlMs` adından yeniden adlandırıldı; bu geçiş, önceden yapılandırılmış herhangi bir Codex TTL değerini yeni varsayılan olarak devralır.

#7274 öncesinde, `resolveSessionAffinityTtlMs()` `codex` dışındaki her sağlayıcı için kesin olarak `0` döndürüyordu; bu nedenle sabitleme mekanizması ve başlık çıkarımı zaten sağlayıcıdan bağımsız olmasına rağmen TTL ayarının (ve oturum başlıklarının) başka hiçbir yerde etkisi olmuyordu. Düzeltme bu erken dönüşü kaldırdı; TTL artık genel olarak `0`'ın üzerinde ayarlandığında her sağlayıcıya eşit şekilde uygulanır.

Üç oturum yakınlığı başlığı asla yukarı akışa iletilmez — yürütücüler istemci başlıklarını geçirmek yerine kendi yukarı akış başlıklarını sıfırdan oluşturur; dolayısıyla bu yalnızca dahili bir ilişkilendirme kimliği olarak kalır.

### Özel yönetilen oturum bağlantı kiralamaları

**Kapsam:** bir etkin yönetilen HTTP istemcisi/oturumu, uygun bir OmniRoute bağlantısına sahip olur.

**Amaç:** istekler arasında katı bir yönlendirme çitine ihtiyaç duyan istemciler için kalıcı, özel bağlantı sahipliği sağlamak. Bu, yumuşak bir süreklilik tercihi olan oturum yakınlığından farklıdır: özel bir kiralama yaşam döngüsü durumunu SQLite'ta saklar, genel etkin-sahip ve etkin-bağlantı tekilliğini zorunlu kılar ve sağlayıcı gönderiminden önce bayat bir nesli reddeder.

Özellik, API anahtarı başına isteğe bağlıdır. Yönetilen bir anahtarın `lease:exclusive` kapsamına ve açıkça belirtilmiş, boş olmayan bir `allowedConnections` listesine sahip olması gerekir. Herhangi bir HTTP istemcisi yaşam döngüsü uç noktasını kullanabilir; istemci adı, user-agent, sağlayıcı, OAuth yöntemi veya model gerekmez. Kiralama bir modele değil bir bağlantıya sahiptir; bu nedenle bağlantı normal şekilde uygun kaldığı sürece model değişikliği bağlamayı korur. Normal model, kota, sağlık, soğuma ve izin listesi kuralları yetkili olmaya devam eder ve aynı nesli başka bir boş uygun bağlantıya taşıyabilir.

Yaşam döngüsü, `acquire`, `renew` ve `release` JSON eylemleriyle `POST /api/v1/session-leases` üzerinden işler. Yönetilen çıkarım istekleri, opak `X-OmniRoute-Lease-Owner` değerini ve tam `X-OmniRoute-Lease-Generation` değerini sunar. Sahip değeri, `vlo_` öneki ve ardından gelen 43 base64url karakterinden oluşur; yalnızca SHA-256 özeti saklanır. Her nihai gönderim bariyeri ayrıca kimliği doğrulanmış API anahtarı kimliğini ve etkin bağlantı kimliğini de bağlar. Kira kontrol başlıkları; günlüklerden, saklanan istek anlık görüntülerinden ve yukarı akış yürütücü başlıklarından kaldırılır.

Sıradan yönlendirmede uygun yönetilen adaylar bulunuyor ancak boştaki her aday yabancı bir etkin kira tarafından tutuluyorsa, OmniRoute HTTP `429`, kira kapasitesinin kullanılamadığını belirten bir kod, kapasite bekleme durumu ve ilgili en erken sona erme zamanından türetilen sınırlı bir `Retry-After` değeri döndürür. Sıradan boş uygunluk kira çekişmesi değildir ve mevcut yönlendirme hatası anlambilimini korur.

İlgili mekanizmalar ayrı kalır:

- OAuth oturum doluluğu, OAuth hesapları için işlem-yerel yumuşak dağıtımdır.
- Hesap semaforları istek eşzamanlılığı izinleri verir ve bir istek tamamlandığında sona erer.
- Özel yönetilen oturum kiraları, nesil bariyeri içeren kalıcı yaşam döngüsü sahipliğidir.

---

## 3. Model Kilitleme

**Kapsam:** sağlayıcı + bağlantı + model üçlüsü.

**Durum koduna göre anahtar kapsamı:** başarısız olan durum kodu, bir kilidin hangi anahtara yazılacağına karar verir (`open-sse/services/accountFallback/exactModelLock.ts` içindeki `resolveLockoutScope()`):

- `429` / `403` / `402` — bir kota veya yetkilendirme sinyali — **kota ailesini** kilitle:
  codex için tüm `codex` / `spark` kapsamı (bağlantının her `gpt-5*` modeli),
  diğer sağlayıcılar için `getQuotaScopedModelForProvider()`.
- `404` yalnızca modelin kendisini kilitler (`getModelLockKey()`, `not_found` durumunu daraltır).
- Diğer tüm durumlar — `5xx` taşıma/sunucu hataları ve OmniRoute'un kalite doğrulamasından kendisinin ürettiği `502` — yalnızca **tam** sağlayıcı/bağlantı/model üçlüsünü kilitler. Tek bir modeldeki bozuk bir akış, hesabın kotası hakkında kanıt değildir; bu kuraldan önce `codex/gpt-5.6-luna` üzerindeki tek bir boş yanıt, kotaya hiç dokunulmamışken o bağlantının tüm `gpt-5*` modellerini 2–30 dakika (kademeli artarak) yönlendirme dışına çıkarıyordu.
- Çağıranın açık `scope` seçeneği her zaman önceliklidir (Antigravity `"exact"` gönderir).

**Amaç:** yalnızca tek bir model kullanılamaz veya kota sınırlı durumdayken tüm bağlantıyı devre dışı bırakmaktan kaçınmak.

**Örnekler:**

- Model başına kota uygulayıp 429 döndüren sağlayıcılar
- Eksik bir model için 404 döndüren yerel sağlayıcılar
- Sağlayıcıya özgü mod/model izin hataları (ör. Grok modları)

**Uygulama:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Bekleme Süreleri Panosu (v3.8.0)

Arayüz: Ayarlar → Model Bekleme Süreleri (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Etkin kilitleri şu bilgilerle listeler: provider, connection, model, reason, expiresAt. Operatörler kart üzerinden bir modeli elle yeniden etkinleştirebilir.

**REST API:**

- `GET /api/resilience/model-cooldowns` — etkin kilitleri listeler
- `DELETE /api/resilience/model-cooldowns` — elle yeniden etkinleştirme. Gövde: `{provider, connection, model}`. Kimlik doğrulama: management.

### Bekleme Süresi Yöneticisi

Arayüz: İzleme → Bekleme Süresi Yöneticisi (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Her sağlayıcı sayfasını tek tek açmak yerine, geçici bir nedenle yönlendirme dışında kalan her bağlantı için tek bir sayfadır. Bağlantı bekleme sürelerini, model kilitlerini ve nihai durumları listeler; bunları bağlantı başına, bir seçim için veya bir sağlayıcının tüm bağlantıları için temizler ve en sık ayarlanan bekleme süresi kurallarını düzenler: `streamStallCooldown.enabled` ile OAuth / API-key `connectionCooldown` temel bekleme süresi ve maksimum geri çekilme adımları (`PATCH /api/resilience` aracılığıyla kaydedilir). Nihai durumlar (`banned`, `expired`, `credits_exhausted`) listelenir ancak burada asla temizlenmez.

**REST API** (`src/lib/resilience/cooldownManager.ts`, kimlik doğrulama: management):

- `GET /api/resilience/cooldowns[?provider=]` — durum, kalan bekleme süresi, geri çekilme seviyesi, son hata türü ve model kilitleriyle birlikte bağlantılar (kimlik bilgileri olmadan)
- `POST /api/resilience/cooldowns` — gövde `{connectionIds: string[]}` veya `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` döndürür

### Kilitleme ayarları arayüzü + başarıyla azalan kurtarma (v3.8.23)

Model kilitleme, her zaman açık ve sabit kodlanmış bir davranıştan, kendi ayar kartına ve kendi kendini iyileştiren bir kurtarma yoluna sahip, tamamen yapılandırılabilir ve isteğe bağlı (opt-in) bir özelliğe dönüştü.

**Ayar kartı:** Ayarlar → Model Kilitleme
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu kart, yukarıdaki salt okunur `ModelCooldownsCard` bileşeninden **farklıdır** (o yalnızca etkin kilitleri _listeler_) — yeni kart _parametreleri yapılandırır_. Varsayılanlar `DEFAULT_MODEL_LOCKOUT_SETTINGS` içinde tanımlıdır
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ayar                    | Varsayılan                       | Anlam                                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Ana anahtar — model kilitleme **varsayılan olarak kapalıdır**.           |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model kapsamlı bir hata olarak sayılan yukarı akış durum kodları.        |
| `baseCooldownMs`        | `120_000` (120 sn)               | İlk hata için başlangıç kilitleme süresi.                                |
| `maxCooldownMs`         | `1_800_000` (30 dk)              | Kademelendirilmiş bekleme süresinin üst sınırı.                          |
| `maxBackoffSteps`       | `10`                             | Maksimum üstel geri çekilme kademesi sayısı.                             |
| `useExponentialBackoff` | `true`                           | Yinelenen hataların bekleme süresini üstel olarak artırıp artırmayacağı. |

Ayarlar normal ayar deposu aracılığıyla kalıcı olur ve dayanıklılık ayarları şemasıyla doğrulanır; kart `baseCooldownMs`/`maxCooldownMs` değerlerini (`maxCooldownMs ≥ baseCooldownMs` olacak şekilde) ve `maxBackoffSteps` değerini sınırlar.

**Başarıyla azalan kurtarma:** kurtarma **yalnızca** zamanlayıcının dolması değildir. Sağlıklı bir yanıt, modelin hata sayısını geriye doğru azaltır; böylece pencerenin ortasında iyileşen bir model, zamanlayıcısı dolmadan önce kademe artışını durdurur (ve kilidi kalkar). Başarılı bir combo hedefinde `open-sse/services/combo.ts`, `decayModelFailureCount()` fonksiyonunu çağırır (`open-sse/services/accountFallback.ts`); bu fonksiyon saklanan `failureCount` değerini **yarıya indirir** (`Math.floor(failureCount / 2)`); değer `0`'a ulaştığında kilit kaydı tamamen silinir. Karşıt fonksiyon `recordModelLockoutFailure()` ise kademelendirme penceresi içindeki hatalarda sayacı artırır (ve bekleme süresini kademelendirir). Bu başarı-azalışı, düz zamanlayıcı dolmasına ek olarak çalışır — iki yol da bir modeli yeniden etkinleştirebilir.

**Durum:** kilitler **bellekte** tutulur (`provider:connectionId:model` anahtarlı `ModelLockoutEntry` içeren işlem başına `Map`ler; tam kapsamlı kilitler `provider:connectionId:exact:model` anahtarlı), veritabanına kalıcı olarak yazılmaz — yeniden başlatmada kaybolurlar. _Ayarlar_ kalıcıdır; etkin kilit _durumu_ geçicidir.

---

## 4. Kota-Paylaşımı Eşzamanlılık Kontrolü (v3.8.36)

Abonelik hesapları (GLM, MiniMax vb.) genellikle yalnızca ~1–3 eşzamanlı isteği kabul eder; bu sınırın aşılması 429 hatalarını ve bekleme sürelerini (cooldown) tetikler. Bu durum, birden fazla API anahtarının tek bir upstream hesabını paylaştığı **kota-paylaşımı** (`qtSd/…`) kombinasyonlarında özellikle kritiktir. Üç katman, paylaşılan bir hesabın isteklerle boğulmasını engeller.

### Bağlantı başına eşzamanlılık sınırı (`max_concurrent`)

Her sağlayıcı bağlantısı bir `max_concurrent` üst sınırı tanımlayabilir
(`provider_connections.max_concurrent`, bağlantı penceresi / API / veritabanı üzerinden ayarlanır).
Sınır olmaması için boş bırakın. Bu, aşağıdaki serileştirme katmanını yöneten tek
düğümdür — hesabın gerçek eşzamanlılık değerine ayarlayın (ör. GLM ~1, MiniMax ~2).

### Model başına eşzamanlılık sınırları (`modelConcurrency`)

Bir bağlantı, `rateLimitOverrides` haritası içinde ayrıca model bazında kesin
eşzamanlılık üst sınırları tanımlayabilir:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Bağlantı penceresinde (**Hız sınırı geçersiz kılmaları → Model başına
eşzamanlılık sınırları**, her satıra bir `model=cap`) veya aynı JSON yapısıyla
`PATCH /api/providers/[id]` üzerinden ayarlayın. Temel anlambilim:

- **Bağlantı genelinde ve modele özgü:** `maxConcurrent`, paylaşılan
  bağlantı genelindeki üst sınır olmaya devam eder. Her ikisi de geçerli olduğunda,
  her iki kapı da aynı bileşik kapıda atomik olarak edinilir
  (`global → provider → account → model`); geçerli davranış, uygulanabilir en katı
  sınırdır.
- **Tam model anahtarı eşleşmesi:** anahtar, yönlendirme çözümlemesinden sonra
  yürütücüye iletilen model dizesidir — normalde çıplak upstream model kimliğidir
  (`glm-5`), istemci tarafı bir `provider/model` takma adı değildir (`zai/glm-5`,
  `glm-5` ile eşleşmez). Değerler, pozitif tam sayı eşzamanlı istek üst
  sınırlarıdır.
- **Yerel kuyruklama, keşif yok:** fazla istekler, mevcut kuyruk/zaman aşımı
  anlambilimiyle yerel olarak kuyruğa alınır (tiplendirilmiş `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` kabul hataları). OmniRoute, upstream politikasını keşfetmez
  veya tahmin etmez — operatörün yapılandırdığı kesin üst sınırları uygular.
  Doymuş bir model kapısı sağlayıcıyı asla devre dışı bırakmaz ve kalıcı bir model
  kilidi oluşturmaz; upstream 429/cooldown/fallback davranışı hatalar için son
  savunma hattı olmaya devam eder.
- **Bağlantı başına, süreç başına kapsam:** sınırlar veritabanı bağlantısı
  başınadır ve bellek içinde tutulur; bu nedenle aynı upstream API anahtarını
  yeniden kullanan iki bağlantı birbirleriyle koordinasyon kurmaz.
- **Yapılandırılmamış olması değişiklik yok demektir:** haritanın atlanması (veya
  panel alanının boş bırakılması) model kapısı eklemez. Evrensel bir sağlayıcı
  sınırı dayatmayan örnek yapılandırma:

```text
glm-5=1
glm-4.7=3
```

### Kota-paylaşımı istek serileştirmesi

Bir kota-paylaşımı gönderimi, pozitif bir `max_concurrent` tanımlayan bir bağlantıyı
hedeflediğinde, o **hesaba** yapılan eşzamanlı istekler bağlantı başına bir semafor
(anahtar `qsconn:<connectionId>`) aracılığıyla serileştirilir: fazla istekler hesabı
boğmak yerine **kuyrukta bekler**. **Fail-open**'dır — doymuş bir kuyruk veya zaman
aşımı, gönderilebilir bir isteği asla reddetmek yerine slot olmadan devam eder.
**Ayarlar → Dayanıklılık → Kota-paylaşımı bağlantı başına eşzamanlılık** altından
açılıp kapatılabilir (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
varsayılan açık). `max_concurrent` sınırı olmadan davranış değişmez.

> Kota-paylaşımı yönlendirme kapısı (`selectQuotaShareTarget`, DRR + P2C) kendisi de
> fail-open'dır ve sınırına ulaşmış bir bağlantıyı yalnızca _önceliksizleştirir_ —
> tek bağlantılı bir havuzda katı sınırlama yapamaz; bu nedenle taşkını gerçekten
> dizginleyen bu semafordur.

### Cooldown farkındalıklı kombo yeniden denemesi

Her kombo stratejisi için (etkinleştirildiğinde), KISA bir geçici cooldown için 429
oluşturacak bir istek, 429'u döndürmek yerine sürenin dolmasını bekler ve yeniden
gönderir — bu, çok modelli kombinasyonlarda Gemini sınıfı TPM/RPM pencerelerini
(~60s retry-after) kapsar; örneğin 2 modelli bir kombonun her iki hedefinin de model
başına hız sınırına takılması. **Ayarlar → Dayanıklılık** altındaki
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ile
sınırlanır. `quota_exhausted` (gece yarısına kadar kilitli) veya kimlik
doğrulama/bulunamadı nedenleri için asla beklemez.

Aynı kapı, gönderim öncesi durumu da kapsar (#16319): bir kombonun her hedefi,
modeli kısa bir geçici kilitlemede olduğu için herhangi bir deneme yapılmadan
atlandığında, sıfır-denemeli yol, ipucu içermeyen `503 ALL_TARGETS_SKIPPED` yanıtı
vermek yerine aynı üst sınırlar altında kilidin dolmasını bekler ve yeniden
gönderir. Beklemeye izin verilmediğinde (üst sınır, deneme veya bütçe tükenmiş ya da
özellik kapalı), son yanıt, en erken geçici kilit bitişinden alınan `retry_after` /
`reset_at` değerlerini taşıyan `429 rate_limit_error` yanıtına yükseltilir; kota,
kimlik doğrulama ve bulunamadı kilitleri ipucu içermeyen 503'ü korur.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. İstek Kuyruğu Kabul Kontrolü (v3.8.49 · issue #6593)

**Kapsam**: sağlayıcı+bağlantı başına yerel hız sınırı kuyruğu (`open-sse/services/rateLimitManager.ts`,
Bottleneck tarafından desteklenir), yukarıdaki üç mekanizmanın bir katman altında.

**`maxWaitMs` kuyruk beklemesini sınırlar; `executionMaxWaitMs` yürütmeyi sınırlar.**
İkisi bilinçli olarak ayrıdır ve hiçbiri diğerini beslemez.

`resilienceSettings.requestQueue.maxWaitMs` **kuyruk-bekleme bütçesidir**: bir
sağlayıcı yuvasını beklemeyi ve ardından QUEUED durumunda oturmayı kapsar; iş
QUEUED durumundan çıkıp yürütülmeye başladığı anda zamanlayıcısı temizlenir
(`rateLimitManager.ts`, `wrappedFn`). Bunu aşan bir istek asla yukarı akışa
ulaşmaz. Varsayılan 30000ms olup `src/lib/resilience/settings.ts` içindeki
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` tarafından sağlanır ve
`tests/unit/ratelimit-admission-control-6593.test.ts` tarafından sabitlenir;
dolayısıyla burada yapılacak bir değişiklik, bu paragrafın sessizce güncelliğini
yitirmesi yerine o testi kırmızıya döndürür.

`resilienceSettings.requestQueue.executionMaxWaitMs`, Bottleneck'in iş `expiration`
değeri olarak aldığı şeydir; zamanlayıcısı yalnızca gönderimden sonra başlar.
Kendi yukarı akış zaman aşımı olmayan yürütücüler için bir güvencedir ve
yürütücünün kendi fetch-başlangıç zaman aşımı daha uzunsa o değere yükseltilir;
böylece sağlıklı, devam eden bir yanıtı kesemez. Varsayılan 600000ms (10 dk).

Kuyruk bütçesinin `expiration` değerine beslenmesi, artımlı olmayan ağ
geçitlerini eskiden uçuş ortasında öldüren şeydi — ilk baytlardan önce meşru
olarak dakikalarca çalışırlar — ve bir expiration'ın `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) olarak yüzeye çıkarılmasının, kuyruk
bütçesinin ise kuyruk-zaman-aşımı kodunu taşımasının nedeni budur. İkisinden
birini `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (ortam değişkeni) veya pano
(**Settings → Resilience**) üzerinden geçersiz kılabilirsiniz. İkisi de
normalleştirilirken 1ms–24 saat aralığına kırpılır.

**Her ikisi için öncelik:** ortam değişkeni yalnızca _varsayılanı_ sağlar.
`resilienceSettings.requestQueue` içinde kalıcılaştırılmış bir değer
(pano / API yaması, `key_value` içinde saklanır) onu yener ve bağlantı başına
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` da onu yener. Bu nedenle,
zaten kalıcı bir değere sahip bir dağıtımda ortam değişkenini ayarlamak hiçbir
şeyi değiştirmez — bunun yerine kalıcı ayarı temizleyin veya güncelleyin.

Kuyrukta kalış `maxWaitMs` ile sınırlıdır; aşağıdaki `maxQueueDepth` ise aynı
anda kaç çağıranın kuyruğa alınabileceğini sınırlar.

**Gövdede belirtilen yeniden denemeler: tempolama vs kilitleme.** Bir 429
gövdesi kendi bekleme süresini adlandırabilir (Gemini `RetryInfo.retryDelay`,
"retry after Ns" metni); bunu `updateFromResponseBody` okur. Bağlantının
`maxWaitMs` değerine sığan bir bekleme tempolamadır: sınırlayıcı rezervuarını
o süre boyunca boşaltır ve kuyruktaki çağrılar, rezervuar dolduğunda
gönderilir. `maxWaitMs` değerinden uzun bir bekleme, kuyruğun sonuna kadar
bekleyebileceği bir şey değildir — Gemini, tükenmiş bir günlük kotayı
`retryDelay: "86399s"` ile yanıtlar. Yeniden oluşturulan 429'daki (#16528)
aktarılan `Retry-After`, fallback motorunun modeli o pencere için kilitlemesini
zaten sağlar; ancak sınırlayıcıyı da bunun için duraklatmak, anahtara erken
ulaşan herhangi bir çağrıyı (örneğin bir dayanıklılık sıfırlamasından sonra)
yine de tüm `maxWaitMs` boyunca durdururdu. Böyle bir bekleme tiplendirilmiş
bir Google `RetryInfo` detayından (`google_rpc_retry_info` kökeni) geldiğinde
ve anahtarın sınırlayıcısı zaten model kapsamlıysa (bkz. `getLimiterKey`), 429
bunun yerine o bağlantıda bir model kilitlemesine dönüşür
(`open-sse/services/rateLimitManager/bodyRetryPause.ts` içindeki
`lockModelForLongBodyRetry`, 24 saat ile sınırlıdır) ve sınırlayıcı
duraklatılmadan bırakılır. Hesap seçimi bu kilidi `isModelLocked()` aracılığıyla
atlar; bağlantıya sabitlenmiş hedefler için combo gönderim-öncesi kapısı da
öyle yapar. Sınırlayıcısı kota ailesi başına olan antigravity'de kilit, diğer
kota kilitleri gibi tam model üzerindedir. Bir takma ad onu o modele çözdüğünde
istemcinin istediği ad da kilitlenir, çünkü bu denetimler istenen adı kullanır;
tam olarak kilitlenir (`lockExactModel`), böylece bir antigravity kota ailesini
veya bir codex kapsamını aşan bir takma ad asla kendininkini kilitlemez. Düz
metin bir ipucu, tiplendirilmemiş bir `retryDelay` veya tüm bağlantı tarafından
paylaşılan bir sınırlayıcı duraklatmayı korur. 429 yolunun az önce yeniden
oluşturduğu sınırlayıcı durakladığında, kalan kuyruk süresi duraklamadan önce
biten bir çağıran, o süreyi beklemek yerine anında kuyruk-zaman-aşımı koduyla
(`checkLimiterPause`) geri çevrilir; kaydedilen bitiş, sınırlayıcı
oluşturulmadan önce, Bottleneck'in yenileme saatini başlattığı noktaya
sabitlenir ve rezervuarda sonradan yapılan herhangi bir değişiklik bunu
unutur. `tests/unit/rate-limit-long-body-retry-lockout.test.ts` ve
`tests/unit/rate-limit-body-retry-pause.test.ts` tarafından kapsanır.

**`maxQueueDepth` — isteğe bağlı kabul sınırı (yeni).**
`resilienceSettings.requestQueue.maxQueueDepth`, tek bir sağlayıcı+bağlantı
için aynı anda kaç isteğin kuyrukta (henüz gönderilmemiş) bekleyebileceğini
sınırlar. Kuyruk zaten `maxQueueDepth` istek tuttuğunda, yeni bir istek daha
`limiter.schedule()` çağrısına **ulaşmadan** tiplendirilmiş bir
`code: "RATE_LIMIT_QUEUE_FULL"` hatasıyla hızlıca reddedilir — böylece
reddetme ucuzdur ve o istek için sonraki herhangi bir istem-sıkıştırma /
çeviri işleminden önce gerçekleşir. Varsayılan `0` = devre dışı; mevcut
sınırsız kuyruk davranışı korunur; 0–100000 aralığında sınırlıdır.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (ortam değişkeni) veya
`resilienceSettings.requestQueue.maxQueueDepth` (pano/API yaması) ile geçersiz
kılınabilir.

Kabul denetiminin kendisi saf bir fonksiyondur
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`);
böylece gerçek bir Bottleneck sınırlayıcısı olmadan birim testi yapılabilir.

> #6593'ü açan RFC ayrıca bir `bypassCompressionOnRateLimit`
> bayrağı da önermişti. Bu reponun `open-sse/services/compression/` hattı,
> giden LLM isteği üzerinde prompt/bağlam sıkıştırmasıdır (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` bloğu civarında) —
> sentezlenen 429 gövdeleri üzerinde HTTP yanıt sıkıştırması değildir —
> dolayısıyla literal bir bypass bayrağıyla eşleşen bir kod yolu yoktur. Bu
> prompt sıkıştırma adımı ayrıca şu anda istek hattında `withRateLimit()`'ten
> _önce_ çalışır; bu nedenle, kuyruk dolu reddinde onu atlamak üzere yeniden
> sıralamak, bu issue'nun kapsamından ayrı ve daha büyük bir değişikliktir;
> bilinçli olarak burada uygulanmamıştır ve CPU tasarrufu kazancı yeniden
> sıralama riskine değerse bir takip işi olarak bırakılmıştır.

### Hız Sınırı Otomatik Etkinleştirme Güvenlik Ağı ve Bağlantı Koruması (`rateLimitProtection`)

**Otomatik etkinleştirme güvenlik ağı** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, varsayılan `true`):
OmniRoute, varsayılan olarak tüm aktif API anahtarı sağlayıcı bağlantıları için hız sınırı kuyruk korumasını otomatik olarak etkinleştirir (`getProviderCategory(provider) === "apikey"`). Bu, hıza duyarlı yukarı akış API anahtarlarına gelen isteklerin, yukarı akış 429 hatalarına ani bir patlamayla çarpmak yerine Bottleneck üzerinden kuyruğa alınmasını ve kısıtlanmasını sağlar. Güvenlik ağı, `RATE_LIMIT_AUTO_ENABLE` ortam değişkeni (`false`/`0`/`off` devre dışı bırakır, `true`/`1`/`on` zorla açar) aracılığıyla geçersiz kılınabilir; bu değişken, kalıcı pano ayarının (**Ayarlar → Dayanıklılık** / `PATCH /api/resilience`) önüne geçer.

**Bağlantı başına `rateLimitProtection` anlambilimi:**
Bağlantı başına hız sınırı koruması, sağlayıcı bağlantılarındaki `rateLimitProtection` boolean alanı üzerinden izlenir (SQLite'ta `rate_limit_protection` olarak kalıcı hale getirilir):

- **Açık açık (`rateLimitProtection === true`)**: Sağlayıcı kategorisinden veya otomatik etkinleştirme güvenlik ağının açık olup olmadığından bağımsız olarak, bu bağlantı için hız sınırı koruması açıkça etkinleştirilir.
- **Açık kapalı (`rateLimitProtection === false`)**: Açık korumayı devre dışı bırakır, ancak aktif bir API anahtarı bağlantısını global otomatik etkinleştirme güvenlik ağının kapsamı **dışına çıkarmaz**. `reconcileEnabledConnections` içinde (`open-sse/services/rateLimitManager.ts`), `false` ve `undefined` eşdeğerdir: yalnızca `rateLimitProtection === true` açık bir geçersiz kılma olarak değerlendirilir. `rateLimitProtection` `false` (veya ayarlanmamış) ise, aktif bir API anahtarı bağlantısı yine de otomatik etkinleştirme koşuluyla eşleşir ve hız sınırı korumalı kalır.
- **Bağlantı başına vazgeçme yok**: Bir operatör, diğerleri için otomatik etkinleştirmeyi aktif tutarken "bu tek aktif API anahtarı bağlantısı hız sınırı kuyruk koruması olmadan çalışmalı" ifadesini şu anda tanımlayamaz. API anahtarı bağlantılarını hız sınırı kuyrukları olmadan tamamen çalıştırmak için, güvenlik ağının global olarak kapatılması gerekir (`RATE_LIMIT_AUTO_ENABLE=false` veya `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Desteklenen yazma yolları:**

- **`POST /api/rate-limits`**: Bir bağlantı için `rateLimitProtection`'ı açıp kapatmak üzere desteklenen yönetim yazma yolu (`{ connectionId: string, enabled: boolean }`). Bunu `enabled: true` ile çağırmak açık korumayı etkinleştirir; `enabled: false` ile çağırmak açık korumayı kaldırır (ancak otomatik etkinleştirme açıksa, aktif API anahtarı bağlantıları global güvenlik ağı kapsamında korunmaya devam eder).
- **`PUT /api/providers/[id]`**: Kasıtlı olarak `rateLimitProtection`'ı kabul etmez ve değiştirmez (#11278). Sağlayıcı bağlantı meta verilerini `PUT /api/providers/[id]` üzerinden güncellemek, kalıcı hız sınırı koruma durumunu asla değiştirmeyecektir.

---

## 6. Yavaş akış throughput watchdog'u (#9709)

İsteğe bağlı `resilienceSettings.streamRecovery.throughputWatchdog` koruması, hâlâ
parça (chunk) göndermeye devam eden ancak yapılandırılan faydalı çıktı hızının altında
asistan çıktısı üreten bir upstream'i tespit eder. Bu mekanizma kasıtlı olarak boşta
kalma (idle) zaman aşımından ayrıdır: heartbeat'ler ve meta veriler bu zamanlayıcıların
hiçbirini sıfırlamaz ve ilerleme olarak sayılmaz. Ayrıca, çıktı kalitesinden bağımsız
olarak mutlak bir güvenlik tavanı olmaya devam eden kesin deneme süresi sınırından
(hard attempt deadline) (#9153) da farklıdır.

Watchdog, iptal (abort) edebilmek için önce bir ısınma (warm-up) süresi ve ardından
tam bir kayan pencere (rolling window) gerektirir. Chat Completions ve Responses API
çıktı olaylarından gelen metin deltalarını sayar (muhafazakâr bir UTF-8 bayt yaklaşımı),
yalnızca kullanım (usage) içeren ve boş olayları yok sayar ve tool-call ya da reasoning
olayları devam ederken değerlendirmeyi askıya alır. Varsayılan olarak devre dışıdır ve
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ile etkinleştirilebilir; pencere, ısınma
süresi, minimum hız ve minimum ölçülebilir çıktı değerleri, normal resilience-settings
normalizasyon katmanı tarafından sınırlandırılır.

Etkinleştirildiğinde, bir watchdog iptali yalnızca aktif upstream denemesine uygulanır.
İstemciye görünen herhangi bir bayttan önce, mevcut aynı-hesap erken kurtarma
(early-recovery) yolu denemeyi yeniden açabilir. Commit sonrasında akış asla körlemesine
yeniden oynatılmaz; yalnızca mevcut güvenli akış-ortası devam (mid-stream continuation)
sözleşmesi bir soneki birleştirebilir. Sonlandırma tek seferlik (single-shot) kalır,
böylece kullanım muhasebesi ve semafor serbest bırakma işlemi tekrarlanmaz.

---

## 7. Upstream Durum Yeniden İfadesi (yanlış bildirilen kota hataları)

**Kapsam:** geçici kota tükenmesini yanlış bir HTTP durumuyla bildiren tek bir upstream ağ geçidi.

**Amaç:** sınıflandırmadan ÖNCE yanıltıcı bir durumu düzeltmek; böylece aşağı akış tüketicileri (fallback motoru, combo agregasyonu, istemciye dönen yanıt) hatanın gerçek yeniden denenebilir niteliğini görür.

Bazı ağ geçitleri GEÇİCİ kota tükenmesini yeniden denenemez bir HTTP
durumuyla işaret eder. `agentrouter.org`, standart `429` yerine Çince bir
gövdeyle (`用户额度不足` / `额度不足`) `403` (bazen `400`) döndürür. Claude
Code gibi istemciler `403`'ü kalıcı olarak değerlendirip oturumu sonlandırır;
düzeltme yapılmazsa fallback motoru bunu bir kota olayı yerine `AUTH_ERROR`
olarak sınıflandırır.

**Uygulama:**

- Kayıt + eşleştirici: `open-sse/config/upstreamStatusRestatement.ts` —
  sağlayıcı başına bir kural listesi (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` aracılığıyla eşleştirilir.
- Çağrı noktası: `open-sse/handlers/chatCore.ts` içindeki `providerFailure:`
  bloğu (yaklaşık 3654. satır), `parseUpstreamError()` hata HTTP durumu
  taşıyan bir upstream yanıtını ayrıştırdıktan (`!providerResponse.ok`) hemen
  sonra ve herhangi bir sınıflandırma çalışmadan önce; böylece tüm aşağı akış
  tüketicileri düzeltilmiş durumu görür. Bir `200` SSE akışının içine gömülü
  hatalar, ayrı ve daha geç işleyen bir akış-ayrıştırma yolunu izler ve bugün
  bu hook tarafından **kapsanmaz** — bilinen bir sınırlamadır; agentrouter'ın
  yanlış durum bildirimi için (ki bu bir hata HTTP durumu olarak ortaya çıkar)
  henüz gerekli değildir.
- Yeniden deneme uygunluğu: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`
  içindedir (`open-sse/services/combo/unavailableRetryGate.ts`); bu nedenle
  yeniden ifade edilen bir hata, ölü bir `403` olarak görünmek yerine gerçek
  bir yeniden deneme penceresi taşır.
- Sentetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`),
  yalnızca yeniden ifade edilen yanıtın **istemciye** bildirdiği değerdir;
  bağlantının dahili cooldown/lockout süresinin kendisi değildir — bu süre,
  yeniden ifade edilen hatayı fiilen ele alan mekanizma tarafından ayrıca
  yönetilir (Connection Cooldown'un kademeli artan backoff'u, §2, API-key
  sağlayıcıları için taban `3s`; ya da agentrouter gibi model-başına-kota
  sağlayıcıları için Model Lockout, §3). Yönlendirici, istemciye duyurduğu
  60s penceresinden daha önce dahili olarak yeniden denemeye uygun hale
  gelebilir — bu kasıtlı bırakılmış bir paydır, hata değildir.

Kalıcı hatalar (agentrouter'ın `无权访问模型` hatası — bu modele erişim yok)
ASLA yeniden ifade edilmez: `textMarkers` eşleşse bile `excludeMarkers` kuralı
veto eder; böylece hata orijinal durumunu korur ve hiçbir şey onu sonsuza dek
yeniden denemez. Eşleşen sağlayıcı sınıflandırma kuralı
(`open-sse/config/providerErrorRules.ts` içindeki
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
bildirilmiş `6h` taban cooldown), `checkFallbackError`
(`open-sse/services/accountFallback.ts`) tarafından genel apikey kategorisindeki
`FORBIDDEN` erken dönüşünden _önce_, `honorsRuleLockScope(provider)` koşuluna
bağlı olarak değerlendirilir (#10334 — şu anda `providerErrorRules.ts`
içindeki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesi aracılığıyla yalnızca
agentrouter'a özeldir). Kuralın bildirilmiş 6h cooldown'u
`fallbackResult.baseCooldownMs` olarak akar, ancak yine de önceden var olan
model-başına-kota lockout yolunu besler (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`; cooldown kaynağı dışında #10334 ile
değişmemiştir): diğer tüm model lockout'ları gibi operatörün
`mlSettings.maxCooldownMs` değerine (varsayılan `1_800_000ms` / 30dk)
sınırlandırılır ve _persist edilen lockout nedeni_, kuralın `"auth_error"`
değeri değil, önceden var olan sabit kodlanmış `"forbidden"` değeri olarak
kalır — uçtan uca yalnızca cooldown süresi dikkate alınır, neden dizgisi
değil. Bağlantının kendisi aktif kalır; aynı bağlantıdaki kardeş modeller
etkilenmez.

Yeniden ifade edilen kota hataları (`额度不足`) üretimde bir sağlayıcı kuralına
ulaşır (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, kendine ait bildirilmiş bir cooldown'u yok — kalıcılık katmanının
ölçeklenen backoff varsayılanı uygulanır). #10334'ten bu yana,
`ProviderErrorRuleMatch` üzerindeki `scope` uçtan uca TÜKETİLMEKTEDİR, ancak
**yalnızca** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesindeki sağlayıcılar
için (`providerErrorRules.ts` — bugün yalnızca `"agentrouter"`,
`honorsRuleLockScope()` aracılığıyla koşula bağlıdır). Diğer tüm sağlayıcılar
için `scope`, tam olarak #10334 öncesindeki gibi bilgilendirici olarak kalır.
`checkFallbackError`, eşleşen kuralın scope'unu `fallbackResult.ruleScope`
olarak ortaya çıkarır; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`), bir `ruleScope`'un bağlantı genelinde, kendi
kendine iyileşen bir sinyal olarak dikkate alınmasının gerçekten güvenli
olduğunu doğrulayan paylaşılan koruyucudur (scope `"connection"`, reason
`quota_exhausted`, asla `permanent`, asla `creditsExhausted` — gelecekte scope
`"connection"`ı kalıcı bir hesap durumuyla eşleştirebilecek bir kurala karşı
bir savunma). Bunu iki tüketici çağırır:

- **Kalıcılık** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough sağlayıcının **model başına** kilitleme dalına düşmek yerine
  (agentrouter `passthroughModels: true` → `hasPerModelQuota()` `true`
  döndürür), **geçici bir bağlantı soğuma süresi** uygular —
  `testStatus: "unavailable"` + `rateLimitedUntil`, asla nihai bir durum değil
  (`credits_exhausted`/`banned`/`expired`) — böylece bağlantı, soğuma süresi
  dolduğunda manuel bir kimlik bilgisi sıfırlaması gerektirmek yerine kendini
  kurtarır. `disableCooling: true` olan bağlantılar için atlanır (#2997): bu
  vazgeçme (opt-out) bunun yerine model başına kilitlemeye düşer (belgelenmiş
  bir ödünleşim — dalın üzerindeki kod yorumuna bakın).
- **Aynı istek içi combo yönlendirmesi** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): aynı koruma, bağlantıyı
  bellek içi `exhaustedConnections` kümesine `${provider}:${connectionId}`
  anahtarıyla işaretler. Bu, yalnızca _kendi hedef nesnesinde bu tam
  `connectionId` değerini zaten taşıyan_ kalan bir AYNI-İSTEK hedefini atlar
  (`getExhaustedTargetSkipReason()`, `open-sse/services/combo/comboPredicates.ts`,
  `exhaustedConnections` aramasından önce `if (provider && connectionId)`) —
  kardeş hedeflerin kendilerine ait sabitlenmiş bir `connectionId` taşımadığı
  ve birinin yalnızca yanıtın `X-OmniRoute-Selected-Connection-Id` başlığından
  gönderim başına çözümlendiği düz bir model listesi combo'su, bu anahtar
  eşleşmesine asla takılmaz. Bu yaygın durum için, kalan bir ayağın az önce
  tükenmiş hesabı yeniden kullanmasına karşı gerçek koruma bu küme DEĞİLDİR —
  yukarıdaki kalıcılık katmanıdır (bağlantının `rateLimitedUntil` değeri artık
  gelecekte bir zamandadır) ve aynı korumanın bu hata için
  `transientRateLimitedProviders`'ı bastırmasıyla birleşir (bkz. "İki aşamalı
  tasarım" ve `targetExhaustion.ts` içindeki `isAgentrouterConnectionQuotaScope`
  dalındaki kod yorumu): bu küme işaretlenmemiş bırakıldığında, `combo.ts`'nin
  `allowRateLimitedConnection` zorla-izin-ver mekanizması
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) sağlayıcının kalan
  ayakları için devreye GİRMEZ, böylece kimlik bilgisi seçiminin
  `rateLimitedUntil` filtresi (`src/sse/services/auth.ts:1238`) normal şekilde
  uygulanır ve kalan bir ayak ya farklı, hâlâ uygun bir agentrouter bağlantısı
  seçer ya da kullanılabilir kimlik bilgisi olmadan başarısız olur — bu dalın
  az önce soğumaya aldığı bağlantıya kendini zorla geri sokmaz.

### İki aşamalı tasarım: durum yeniden ifadesi, ardından sınıflandırma

Durum yeniden ifadesi (`upstreamStatusRestatement.ts`) ve sağlayıcı
sınıflandırma kuralları (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`), her ikisi de sağlayıcı kimliği ve metin işaretçileri
üzerinden anahtarlanan ayrı kayıt defterleridir, ancak farklı yerlerde çalışır
ve farklı amaçlara hizmet eder: yeniden ifade, HTTP durumunu `chatCore.ts`
içinde erken bir aşamada yeniden yazar; sınıflandırma kuralları ise yedek
(fallback) `reason` değerini seçer ve `scope`'u (`model` / `provider` /
`connection`) `checkFallbackError()` (`open-sse/services/accountFallback.ts`)
içinde kilitler.

Sınıflandırma kuralları, tam hata **metnini** (`额度不足` gibi gövde
işaretçilerini eşleştirmek için gereklidir) yalnızca `providerErrorRules.ts`
içindeki `FULL_TEXT_RULE_PROVIDERS` izin listesinde yer alan sağlayıcılar için
görür — şu anda yalnızca `"agentrouter"`. Diğer her **yerleşik katalog**
sağlayıcısı için `checkFallbackError`, `getProviderErrorRuleMatch`'e yalnızca
yapılandırılmış hatayı (`{code, type}`) verir; bu, başlık/durum/kod tabanlı
kurallar için yeterlidir ancak gövde metni işaretçilerine karşı kördür.
`resolveRuleMatchBody()` yardımcısı bu seçimi gerçekleştirir: izin listesindeki
sağlayıcılar için tam hata metni, aksi hâlde yapılandırılmış hata.
`FULL_TEXT_RULE_PROVIDERS`'a **yerleşik** bir sağlayıcı eklemek, sağlayıcı
başına açık bir katılımdır (opt-in) — listede olmayan her sağlayıcının
varsayılan yolu bayt bayta değişmeden kalsın diye vardır.

Bir kuralın `scope`'u (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS`'dan ayrı bir katılımdır: `checkFallbackError` bunu
yalnızca `fallbackResult.ruleScope` olarak sunar ve aşağı akış tüketicileri de
bunu, aynı dosyadaki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesindeki
sağlayıcılar için, bilgilendirici bir etiketten öte bir şey olarak ancak
dikkate alır (`honorsRuleLockScope()` üzerinden denetlenir — bugün yalnızca
`"agentrouter"`). Bir sağlayıcı bu izin listesine girdiğinde bir
`scope: "connection"` eşleşmesinin gerçekte ne yaptığı için yukarıdaki
"Yeniden ifade edilen kota hataları" bölümüne bakın.

**#11104 — operatör tarafından bildirilen kurallar her iki izin listesini de
atlar.** Bir operatör, bu dosyayı düzenlemeden çalışma zamanında
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
aracılığıyla sağlayıcı başına bir kural bildirebilir. Bir operatör kuralını
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` arkasına
kapılamak — yerleşik katalog kurallarının **varsayılan** davranışını korumak
için tasarlanmış izin listeleri — kuralı bildirmenin zaten operatörün açık
katılımı olduğu göz önüne alındığında, ayarlar mekanizmasını zaten orada
listelenmiş olanlar dışındaki her sağlayıcı için etkisiz kılardı.
`resolveRuleMatchBody()` ve `honorsRuleLockScope()` ikisi de önce
`hasOperatorRuleForProvider()`'ı kontrol eder: bir operatör kuralına sahip
sağlayıcı, her iki izin listesinde de yer alıp almadığına bakılmaksızın ham
hata metnini alır ve bildirilen `scope`'u uygulanır.

**Bilinen eksik — HTTP 400 için `providerRuleRegistry`'ye asla
başvurulmaz.** `checkFallbackError`'ın `BAD_REQUEST` dalı, 400 durumunu
tamamen kendi desen dizileri (`accountFallback.ts` içindeki
`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` vb.) üzerinden
sınıflandırır ve üzerindeki `configuredRule`/`getProviderErrorRuleMatch`
dalına ulaşılmadan önce döner. `status: 400` içeren yerleşik bir katalog
kuralı (veya bir operatör kuralı) sözdizimsel olarak geçerlidir ancak asla
tetiklenmez. Bugün hiçbir mevcut kural 400'ü hedeflemiyor, dolayısıyla
üretimde hiçbir şey etkilenmiyor — ancak gelecekteki bir 400 kuralı önce bu
dalın elden geçirilmesini gerektirir; bu, bir kural eklemekten daha büyük bir
değişikliktir (desen dizisi davranışına zaten dayanan her sağlayıcı için
400'ü yeniden sınıflandırır) ve tek sağlayıcılı bir kural eklemesinin kapsamı
dışındadır.

### Kotayı yanlış bildiren yeni bir ağ geçidi ekleme

1. `statusRestatementRegistry` içine tek bir kural dizisi kaydedin
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   değerlerini sağlayıcıya özgü tutun; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) ile çakışan genel İngilizce
   ifadeleri asla yeniden kullanmayın.
2. İsteğe bağlı olarak, doğru kilit kapsamını seçmek için
   `open-sse/config/providerErrorRules.ts` içine (`providerRuleRegistry`)
   sınıflandırma kuralları kaydedin (hesap genelinde kota için `connection`,
   model bazlı hatalar için `model`). Bu adım, üretim ortamında yalnızca
   kuralları tam hata metnine (gövde işaretçileri) ihtiyaç duyan sağlayıcılar
   için etkili olur: sağlayıcı kimliğini aynı dosyadaki
   `FULL_TEXT_RULE_PROVIDERS` listesine ekleyin — aksi takdirde
   `checkFallbackError` kurala yalnızca yapılandırılmış `{code, type}`
   hatasını iletir ve gövde metnine dayalı bir kural canlı trafikte asla
   eşleşmez. Yalnızca `status`/`headers` üzerinden eşleşen kurallar
   (Opencode'un veya Minimax'in kuralları gibi) bu katılıma ihtiyaç duymaz.
   Bundan ayrı olarak, kural `scope: "connection"` bildiriyorsa ve amaç
   gerçek bir bağlantı genelinde bekleme süresi ile aynı istek içinde combo
   atlama ise (yalnızca bilgilendirici bir etiket değil), sağlayıcı kimliğini
   aynı dosyadaki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listesine ekleyin — bu,
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ve
   `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`)
   içindeki `isAgentrouterConnectionQuotaScope()` tarzı tüketimi denetleyen
   mekanizmadır; bu olmadan `scope` yine de `fallbackResult.ruleScope`
   üzerinden akar ancak hiçbir şey buna göre hareket etmez.
3. `tests/unit/upstream-status-restatement.test.ts` ve
   `tests/unit/agentrouter-error-rules.test.ts` dosyalarını örnek alan birim
   testleri ekleyin (not-permanent / not-creditsExhausted korumaları dahil
   ve — sağlayıcının izin listesine ihtiyacı varsa —
   `resolveRuleMatchBody()` fonksiyonunun tam metni yalnızca o sağlayıcı
   için döndürdüğünü doğrulayan bir test).

`chatCore.ts`, `classifyError` veya combo'da herhangi bir değişiklik gerekmez.

#### Egress gruplu kilit (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` içindeki sağlayıcılar (opencode ailesi),
IP gruplu upstream olarak ele alınır (opencode ücretsiz katmanı hesap gruplu
değil, IP grupludur — bkz. #9611): `quota_exhausted` **veya**
`rate_limit_exceeded` olarak sınıflandırılan bir status-429, rotasyon bunları
deneyemeden önce, son bilinen çıkış IP'si başarısız olan bağlantınınkiyle
eşleşen izin listesindeki aileye ait her bağlantıyı beklemeye alır
— böylece N-1 adet garantili başarısız upstream çağrısı önlenir
(#10460/#10525 ile aynı yapı).
`rate_limit_exceeded` kasıtlı olarak dahil edilmiştir:
`markAccountUnavailable` yolunda opencode'a özgü kurallar asla eşleşmez
(`checkFallbackError`'a hiçbir header/gövde verilmez, opencode
`FULL_TEXT_RULE_PROVIDERS` içinde değildir), dolayısıyla gövdesinde abonelik
kotası metnini ("monthly usage limit reached") taşıyan bir 429, `status_429`
kuralına hiç ulaşılmadan önce kota-metni geri dönüş mekanizması
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlik bekleme)
tarafından `quota_exhausted` olarak sınıflandırılır — buna karşılık kota
metni içermeyen bir 429 (düz hız sınırlama) `status_429` kuralı üzerinden
`rate_limit_exceeded` olarak sınıflandırılır ve yine de IP ailesini beklemeye
alır. İzin listesindeki bir sağlayıcı için IP gruplu bir hız sınırı, tükenmiş
bir kotayla aynı sinyaldir. Dürüst sınırlar:

- **Best-effort**: kilit, bağlantının bilinen son `egress_ip` değerini `proxy_logs`
  üzerinden çözümler (24 saatlik pencere, senkron, önbellek yok). Soğuk önbellek
  (egress IP hiç yoklanmamış) veya satır yok → başarısız olan bağlantı yine de dal
  tarafından soğutulur (bugünkü gibi kaydedilir), yalnızca hiçbir kardeş
  kilitlenmez.
- **Asla nihai değil**: soğuma, yenilenen bir kota penceresidir
  (`testStatus: "unavailable"`); IP düzeyindeki bir sinyalden asla kalıcı bir durum
  türetilmez. `disableCooling` bağlantıları dalı tamamen atlar.
- **İzin listesindeki aile için kilit granülaritesi değişiyor**: bu bir kapsam
  değişikliğidir, yalnızca bir kardeş optimizasyonu değil. opencode bir
  `passthroughModels` sağlayıcısıdır; dolayısıyla bu daldan önce bir 429, MODEL
  başına kilitlenme üretiyordu; artık bir bağlantı soğuması üretiyor — hiç kardeşi
  olmayan tek bir bağlantı çalıştıran bir operatör için bile. Bu, opencode kural
  tablosunun zaten doğru olarak bildirdiği granülaritedir (`scope: "connection"`,
  `providerErrorRules.ts`); ancak opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
  içinde olmadığı için şimdiye kadar hiç uygulanmadı. Dal, başarısız bağlantının
  soğumasını ve `backoffLevel` değerini kendisi yazar; bağlantı kapsamlı
  agentrouter dalını birebir yansıtır ve döner — model başına blok ile aşağıdaki
  genel yola asla ulaşılmaz.
- **Combo dahil**: agentrouter dalında olduğu gibi, kapsam, bir combo
  çağırıcısının 429'a uyguladığı `persistUnavailableState`/`isCombo` düşürmesini
  kasıtlı olarak yok sayar. Model başına kilitlenme bu kapsamın daha zayıf bir
  biçimi değildir, yanlış birimdir: tükenen IP hakkında hiçbir şey söylemez;
  dolayısıyla combo rotasyonu kardeş başına garantili başarısız bir çağrı yakmaya
  devam eder.
- **Kardeş güvenliği**: zaten nihai durumda (banned/credits_exhausted) veya zaten
  daha uzun bir soğumada bulunan bir kardeşin üzerine asla yazılmaz.
- **Özel izin listesi**: `EGRESS_BUCKETED_LOCK_PROVIDERS` listesini genişletmek
  açık bir sahip kararıdır; genel bir bağlantı yoktur (pattern #10334/#10419).
  Kardeş sorgusu, aynı izin listesini bir SQL sabiti olarak tekrarlamak yerine
  bağlar; böylece genişletme tek satırlık bir değişiklik olarak kalır.
- **Egress IP rotasyonu, her iki yönde**: arama penceresi (24 saat), egress-IP
  önbellek TTL'sinden (5 dk) çok daha geniştir; dolayısıyla "bilinen son IP"
  güncel durum değil, geçmiştir. Bir bağlantının vekil sunucusu pencere içinde
  değiştiyse kilit, gerçekten paylaşılan bir IP'yi **ıskalayabilir** (kaydedilen
  IP yeni, tükenmemiş olandır) — ve simetrik olarak, o zamandan beri tükenen
  IP'den **uzaklaşmış bir kardeşi soğutabilir**. İkinci durum, söz konusu kardeşe
  bir soğuma penceresine mal olur; her ikisi de geçmişe dayalı bir aramanın kabul
  edilmiş best-effort sınırlarıdır.
- **Maliyet**: `proxy_logs` üzerinde iki sınırlı tarama (`idx_pl_timestamp`
  aracılığıyla pencere filtreli), yalnızca 429 sıklığında. Yeni indeks yok
  (migration 134 YAGNI). Orta büyüklükte, gerçek trafikli bir DB kopyasında
  ölçüldü; yüksek işlem hacimli bir örnek, aynı pencerede orantılı olarak daha
  fazla satır tutar.

---

## Diğer Dayanıklılık Özellikleri

- **21 yönlendirme stratejisi** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — bkz. [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Sıfırlama-duyarlı yönlendirme** (v3.8.0) — bağlantıları kota sıfırlama zamanına göre önceliklendirir.
- **Arka plan modu düşürülmesi** — Responses API `background: true` uyarıyla birlikte senkron moda düşürülür.
- **Dinamik araç limiti algılama** — araç sayısı limitlerine ulaşıldığında sağlayıcılara geri çekilme uygular.
- **Acil durum yedeği** — `OMNIROUTE_EMERGENCY_FALLBACK` ile kontrol edilir; operatörler yeniden başlatma olmadan Feature Flags sayfasından geçersiz kılabilir.

---

## Hata Ayıklama

- Weighted combo `503 all_targets_cooling_down` yanıtı veriyor (`Retry-After` ayarlanmış, `diagnostics.excluded` her hedefi `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ile listeliyor) → havuz yapılandırılmış ve bağlı, her hedef yalnızca bir dayanıklılık zamanlayıcısı tarafından hariç tutulmuş demektir; `[COMBO] Weighted selection: every target excluded before dispatch — …` uyarısı nedenleri ve kalan saniyeleri belirtir. Aynı combo'dan gelen bir `404 no_executable_targets` ise hiçbir dayanıklılık zamanlayıcısının devrede olmadığı anlamına gelir (çalıştırılacak bir şey yok ya da her hesap kullanılabilirlik yoklamasından kalmıştır). `targetResolution.ts` içinde toplanan hariç tutmalardan `open-sse/services/combo/pinRecovery.ts` içinde oluşturulmuştur.
- Bir sağlayıcının tüm anahtarları atlanıyor → hem devre kesici durumunu HEM de her bağlantının `rateLimitedUntil`/`testStatus` değerini kontrol edin.
- Sıfırlama penceresinden sonra sağlayıcı kalıcı olarak hariç tutuluyor → `getStatus()`/`canExecute()` yerine ham `state` okuyan kod var demektir.
- Bir anahtar başarısız oluyor, diğerleri çalışmalı → devre kesici yerine bağlantı bekleme süresini (connection cooldown) tercih edin.
- Yalnızca bir model başarısız oluyor → bağlantı bekleme süresi yerine model kilidini (model lockout) tercih edin.
- Durumun kendiliğinden düzelmesi gerekirken düzelmiyor → gelecekteki bir zaman damgası + süresi dolmuş durumu yenileyen okuma yolu olup olmadığını kontrol edin. Kalıcı durumlar manuel değişiklik gerektirir.

---

## Çalışma zamanı durumu — ajan hızlı başvurusu

> Ajan kılavuzunun 40k bağlam bütçesinin altında kalması için `AGENTS.md` → "Resilience Runtime State"
> bölümünden olduğu gibi taşındı (PR #12743). Bu, yukarıdaki bölümlerin
> ajanlara yönelik yoğunlaştırılmış görünümüdür; numaralı bölümler tam referans
> olmaya devam eder.

OmniRoute'ta birbiriyle ilişkili ancak farklı üç geçici hata mekanizması vardır.
Yönlendirme davranışında hata ayıklarken kapsamlarını ayrı tutun. Bir bakışta
harita için
[3 katmanlı dayanıklılık diyagramına](../diagrams/exported/resilience-3layers.svg)
(kaynak: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
bakın.

### Sağlayıcı Devre Kesici

**Kapsam**: sağlayıcının tamamı, örn. `glm`, `openai`, `anthropic`.

**Amaç**: yukarı akış/hizmet düzeyinde tekrar tekrar başarısız olan bir sağlayıcıya
trafik göndermeyi durdurmak; böylece sağlıksız tek bir sağlayıcı her isteği
yavaşlatmaz.

**Uygulama**:

- Çekirdek sınıf: `src/shared/utils/circuitBreaker.ts`
- Sohbet kapısı/yürütme bağlantısı: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Çalışma zamanı durum API'si: `src/app/api/monitoring/health/route.ts`
- Paylaşılan sarmalayıcılar: `open-sse/services/accountFallback.ts`
- Kalıcı durum tablosu: `domain_circuit_breakers`

**Durumlar** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafiğe izin verilir.
- `DEGRADED`: erken uyarı bandı — hatalar düşürülme eşiğini aştı ancak henüz kesici
  eşiğini aşmadı; trafik akmaya devam eder, paneller uyarıyı gösterir. Geçerli bir bağlantı
  testi veya yeni hata olmayan sakin bir pencere, durumu `CLOSED`'a döndürür
  (pencere `docs/architecture/RESILIENCE_GUIDE.md` dosyasında açıklanmıştır).
- `OPEN`: sağlayıcı geçici olarak engellenmiştir; çağıranlar bir provider-circuit-open yanıtı
  alır ya da combo yönlendirme başka bir hedefe atlar.
- `HALF_OPEN`: sıfırlama zaman aşımı dolmuştur; bir yoklama isteğine izin verilir. Başarı
  kesiciyi kapatır, başarısızlık onu tekrar açar.

**Varsayılanlar** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`,
`src/lib/resilience/settings.ts` içindeki `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` üzerinden
tüketilir → `src/sse/handlers/chatHelpers.ts` içindeki `getCircuitBreaker(provider, …)`). Tüm sağlayıcı
kesicisi `circuitBreakerThreshold` / `circuitBreakerReset` üzerinde çalışır:

| Profil  | düşürülme eşiği | açılma eşiği (`circuitBreakerThreshold`) | sıfırlama (`circuitBreakerReset`) |
| ------- | --------------: | ---------------------------------------: | --------------------------------: |
| OAuth   |             `5` |                                      `8` |                             `60s` |
| API key |             `7` |                                     `12` |                             `30s` |
| Local   |    (türetilmiş) |                                      `2` |                             `15s` |

`PROVIDER_PROFILES` ayrıca `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 dk) ve `providerCooldownMs` (5/10/1 dk) tanımlar: bunlar,
**isteğe bağlı genel Provider Cooldown'un pencere kapısını** besler
(`PROVIDER_COOLDOWN_ENABLED`, varsayılan kapalı) — `open-sse/services/providerCooldownTracker.ts`
içindeki sağlayıcı düzeyindeki bir girdi, yalnızca `providerFailureWindowMs` içinde
`providerFailureThreshold` kadar hata sonrasında soğuma sayılır ve ardından
`providerCooldownMs` boyunca soğur. Bunlar canlı kesicinin eşikleri DEĞİLDİR — kesici
davranışı bekleyerek bunları ayarlamayın. Her varsayılan, `OMNIROUTE_PROVIDER_BREAKER_*` ve
`OMNIROUTE_CIRCUIT_BREAKER_*` ortam değişkenleri aracılığıyla geçersiz kılınabilir;
çalışma zamanına uygun referans tablosu `docs/architecture/RESILIENCE_GUIDE.md` dosyasında bulunur.

Sağlayıcı kesicisini yalnızca sağlayıcı düzeyindeki hata durumları tetiklemelidir:

```ts
(408, 500, 502, 503, 504);
```

Çoğu `401`, `403` veya `429` durumu gibi normal hesap/anahtar/model hataları için
tüm sağlayıcı kesicisini tetiklemeyin. Bunlar genellikle bağlantı bekleme süresine (connection
cooldown) veya model kilidine (model lockout) aittir. Genel bir API anahtarı sağlayıcısı
`403` hatası, nihai bir sağlayıcı/hesap hatası olarak sınıflandırılmadıkça kurtarılabilir
olmalıdır.

Kesici, arka plan zamanlayıcısı yerine tembel (lazy) kurtarma kullanır. `OPEN` süresi dolduğunda, `getStatus()`, `canExecute()` ve `getRetryAfterMs()` gibi okumalar durumu `HALF_OPEN` olarak yeniler; böylece panolar ve combo aday oluşturucuları, süresi dolmuş bir sağlayıcıyı sonsuza kadar hariç tutmaya devam etmez.

### Bağlantı Soğuma Süresi

**Kapsam**: tek bir sağlayıcı bağlantısı/hesabı/anahtarı.

**Amaç**: aynı sağlayıcının diğer bağlantılarının istekleri sunmaya devam etmesine izin verirken, hatalı tek bir anahtarı/hesabı geçici olarak atlamak.

**Uygulama**:

- Yazma/güncelleme yolu: `src/sse/services/auth.ts::markAccountUnavailable()`
- Hesap seçimi/filtreleme: `src/sse/services/auth.ts::getProviderCredentials...`
- Soğuma süresi hesaplama: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ayarlar: `src/lib/resilience/settings.ts`

Sağlayıcı bağlantılarındaki önemli alanlar:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Hesap seçimi sırasında, şu koşul sağlandığı sürece bir bağlantı atlanır:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Soğuma süreleri de tembeldir: `rateLimitedUntil` geçmişte kaldığında, bağlantı yeniden uygun hale gelir. Başarılı kullanımda `clearAccountError()`, `testStatus`, `rateLimitedUntil`, hata alanlarını ve `backoffLevel` değerini temizler.

Varsayılan bağlantı soğuma süresi davranışı:

- OAuth temel soğuma süresi: `5s`.
- API anahtarı temel soğuma süresi: `3s`.
- API anahtarı `429` durumunda, mevcut olduğunda yukarı akış (upstream) yeniden deneme ipuçları (`Retry-After`, sıfırlama başlıkları veya ayrıştırılabilir sıfırlama metni) tercih edilmelidir.
- Tekrarlanan kurtarılabilir hatalar üstel geri çekilme kullanır:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering-herd önleme koruması, aynı bağlantıdaki eşzamanlı hataların soğuma süresini tekrar tekrar uzatmasını veya `backoffLevel` değerini iki kez artırmasını engeller.

Nihai (terminal) durumlar soğuma süresi değildir. `banned`, `expired` (yalnızca `EXPIRED_RETRY_MAX` aracılığıyla N sınırlı yeniden denemeden sonra nihai hale gelir) ve `credits_exhausted` durumlarının, kimlik bilgileri/ayarlar değişene veya bir operatör bunları sıfırlayana kadar kullanılamaz kalması amaçlanmıştır. Nihai durumları geçici soğuma durumuyla geçersiz kılmayın.

### Model Kilitlenmesi

**Kapsam**: sağlayıcı + bağlantı + model.

**Amaç**: bir bağlantı için yalnızca tek bir model kullanılamaz veya kota sınırlı olduğunda, bağlantının tamamını devre dışı bırakmaktan kaçınmak.

Örnekler:

- Model başına kota uygulayıp `429` döndüren sağlayıcılar.
- Eksik bir model için `404` döndüren yerel sağlayıcılar.
- Seçili Grok modları gibi sağlayıcıya özgü mod/model izin hataları.

Model kilitlenmesi `open-sse/services/accountFallback.ts` içinde bulunur ve aynı bağlantının diğer modelleri sunmaya devam etmesini sağlar.

### Hata Ayıklama Kılavuzu

- Bir sağlayıcının tüm anahtarları atlanıyorsa, hem sağlayıcı kesici durumunu hem de her bağlantının `rateLimitedUntil`/`testStatus` değerlerini inceleyin.
- Sıfırlama penceresinden sonra bir sağlayıcı kalıcı olarak hariç tutuluyor görünüyorsa, kodun `getStatus()`/`canExecute()` kullanmak yerine ham `state` değerini okuyup okumadığını kontrol edin.
- Bir sağlayıcı anahtarı başarısız oluyor ancak diğerlerinin çalışması gerekiyorsa, sağlayıcı kesicisi yerine bağlantı soğuma süresini tercih edin.
- Yalnızca bir model başarısız oluyorsa, bağlantı soğuma süresi yerine model kilitlenmesini tercih edin.
- Bir durumun kendi kendine iyileşmesi gerekiyorsa, gelecekte bir zaman damgası/sıfırlama zaman aşımına ve süresi dolmuş durumu yenileyen bir okuma yoluna sahip olmalıdır. Kalıcı durumlar, manuel kimlik bilgisi veya yapılandırma değişiklikleri gerektirir.

---

## TLS Parmak İzi ve Stealth

Sağlayıcıya özel stealth (JA3/JA4, CCH, obfuscation) ayrı olarak belgelenmiştir — bkz. `docs/security/STEALTH_GUIDE.md` (git; `/docs` içine derlenmez).

---

## Dayanıklılık testleri (Faz 8 · Blok C)

Dayanıklılık mantığına yönelik birim testlerinin ötesinde, üç test çalışma zamanını
gerçek stres/hata koşulları altında zorlar (hepsi entegrasyon/gecelik — hiçbiri PR'ları engellemez):

| Test        | Ne                                                                                                                                                                                                         | Çalıştırma                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Sahte upstream düğümü gerçek gecikme/reset/zaman aşımı/503 enjekte eder; devre kesicinin açılıp toparlandığını ve `checkFallbackError`'un 503'ü kurtarılabilir fallback olarak sınıflandırdığını doğrular. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` altında `createSSEStream` başına ~500 akış; yığın (heap) tavanın ötesine büyürse başarısız olur (OOM koruması #3069).                                                                        | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` adresine sürekli yük; p95/hata eşikleri.                                                                                                                                          | `k6 run tests/load/k6-soak.js` (gecelik) |

`.github/workflows/nightly-resilience.yml` tarafından yönetilir (cron + dispatch).
Varsayılan `test:integration` içinde chaos ve heap testleri kendini atlar (`RUN_CHAOS_INT`/`--expose-gc` olmadan).

---

## Ayrıca Bkz.

- [Mimari Kılavuzu](./ARCHITECTURE.md) — Sistem mimarisi ve iç işleyiş
- [Kullanıcı Kılavuzu](../guides/USER_GUIDE.md) — Sağlayıcılar, kombinasyonlar, CLI entegrasyonu
- [Auto-Combo Motoru](../routing/AUTO-COMBO.md) — 16 faktörlü puanlama, mod paketleri
