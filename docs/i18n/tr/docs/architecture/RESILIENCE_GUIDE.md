# Resilience Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute, birbirinden farklı ancak ilişkili üç dayanıklılık mekanizmasına sahiptir. Her birinin kapsamı ve amacı farklıdır. Yönlendirme davranışındaki hataları ayıklarken bunları birbirinden ayrı tutun.

![3 katmanlı dayanıklılık modeli](../diagrams/exported/resilience-3layers.svg)

> Kaynak: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Sağlayıcı Devre Kesici

**Kapsam:** sağlayıcının tamamı (ör. `glm`, `openai`, `anthropic`).

**Amaç:** yukarı akış/hizmet düzeyinde sürekli başarısız olan bir sağlayıcıya trafik göndermeyi durdurmak.

**Uygulama:**

- Temel sınıf: `src/shared/utils/circuitBreaker.ts`
- Bağlantı: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Durum API'si: `GET /api/monitoring/health`
- Sıfırlama API'si: `POST /api/resilience/reset`
- Sarmalayıcılar: `open-sse/services/accountFallback.ts`
- Veritabanı tablosu: `domain_circuit_breakers`

**Durumlar:**

- `CLOSED` — normal trafiğe izin verilir
- `DEGRADED` — trafiğe hâlâ izin verilir ancak artan sağlayıcı hataları izlenir
- `OPEN` — sağlayıcı geçici olarak engellenir; birleşik yönlendirme bu sağlayıcıyı atlar
- `HALF_OPEN` — sıfırlama zaman aşımı dolmuştur; yoklama isteğine izin verilir

**Yapılandırılabilir varsayılanlar (`open-sse/config/constants.ts`, Gösterge Paneli → Ayarlar → Dayanıklılık bölümünde sunulur):**

| Sınıf        | Bozulma eşiği | Açılma eşiği | Sıfırlama zaman aşımı |
| ------------ | ------------- | ------------ | --------------------- |
| OAuth        | 5 hata        | 8 hata       | 60s                   |
| API anahtarı | 7 hata        | 12 hata      | 30s                   |
| Yerel        | türetilmiş    | 2 hata       | 15s                   |

`degradationThreshold`, bir sağlayıcının ne zaman `DEGRADED` durumuna geçeceğini; `failureThreshold` ise ne zaman açılıp atlanacağını belirler. Yerel sağlayıcı profilleri henüz Dayanıklılık ayarları sayfasında sunulmamaktadır.

**Tetikleme kodları:** yalnızca sağlayıcı düzeyindeki `[408, 500, 502, 503, 504]` durumları. Hesap düzeyindeki hatalar için tetiklemeyin (çoğu 401/403/429 — bunlar bekleme süresine veya kilitlemeye aittir).

**Tembel kurtarma:** `OPEN` süresi dolduğunda `getStatus()`, `canExecute()`, `getRetryAfterMs()` durumu `HALF_OPEN` olarak yeniler. Arka plan zamanlayıcısı gerekmez.

---

### İsteğe bağlı genel Sağlayıcı Bekleme Süresi (pencere kapısı)

Dördüncü ve **isteğe bağlı** bir katman (`PROVIDER_COOLDOWN_ENABLED`, varsayılan olarak **kapalı**), başarısız sağlayıcıların istekler arası belleğini `open-sse/services/providerCooldownTracker.ts` içinde tutar ve birleşik hedef çözümleme tarafından kullanılır; böylece ardışık birleşik istekler, kısa süre önce başarısız olmuş bir sağlayıcıyı tekrar tekrar dolaşmaz. Sağlayıcı düzeyindeki girdiler `PROVIDER_PROFILES` pencere kapısını dikkate alır:

| Profil       | şu sayıdan sonra tetiklenir (`providerFailureThreshold`) | şu süre içinde (`providerFailureWindowMs`) | şu süre boyunca bekler (`providerCooldownMs`) |
| ------------ | -------------------------------------------------------: | -----------------------------------------: | --------------------------------------------: |
| OAuth        |                                                     `10` |                                    `15min` |                                        `5min` |
| API anahtarı |                                                     `15` |                                    `30min` |                                       `10min` |

Eşiğin altında sağlayıcı **bekleme durumunda** kabul edilmez; başarılı bir sonuç pencereyi temizler. Bağlantı düzeyindeki girdiler (`provider:connectionId`) bunun yerine üstel `minRetryCooldownMs → maxRetryCooldownMs` geri çekilmesini korur. Geçersiz kılmalar:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresyon koruması: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Bağlantı Bekleme Süresi

**Kapsam:** tek bir sağlayıcı bağlantısı/hesabı/anahtarı.

**Amaç:** aynı sağlayıcıya ait diğer bağlantılar hizmet vermeye devam ederken sorunlu bir anahtarı atlamak.

**Uygulama:**

- Kullanılamaz olarak işaretleme: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: aynı dosyadaki `getProviderCredentials*`
- Bekleme süresi hesaplaması: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ayarlar: `src/lib/resilience/settings.ts`

**Bağlantı başına alanlar:**

- `rateLimitedUntil` — bekleme süresinin sona ereceği zaman damgası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — üstel geri çekilme sayacı

**Varsayılan bekleme süreleri:**

- OAuth tabanı: 5 sn
- API anahtarı tabanı: 3 sn
- API anahtarı 429: tercihen üst kaynaktan gelen `Retry-After`/sıfırlama başlıklarını/ayrıştırılabilir sıfırlama metnini kullanır
- Geri çekilme: `baseCooldownMs * 2 ** failureIndex`

**Ani yüklenme önleme koruması:** eşzamanlı hataların bekleme süresini gereğinden fazla uzatmasını veya `backoffLevel` değerini iki kez artırmasını önler.

**Terminal durumlar (bekleme süreleri DEĞİLDİR):**

- `banned` — yasaklı anahtar sözcük / hesap yasağı algılamasıyla (bkz. [BAN_DETECTION](../security/BAN_DETECTION.md)) ve istek başına üst kaynak tarafından art arda üç ret verilmesiyle (`request_rejected`, ör. Anthropic OAuth 403 "İsteğe izin verilmiyor" — `open-sse/services/requestRejectedStreak.ts`) ayarlanır; tek bir ret yalnızca bağlantıyı beklemeye alır
- `expired` (sınırlı sayıda yeniden denemeden sonra terminal duruma geçer — üstel geri çekilmeyle `EXPIRED_RETRY_MAX = 3` — böylece geçici OAuth hataları, hesap kalıcı olarak devre dışı bırakılmadan önce kendiliğinden düzelebilir)
- `credits_exhausted`

Bunlar, kimlik bilgileri değişene veya bir operatör tarafından sıfırlanana kadar kalıcıdır. Terminal durumların üzerine geçici bekleme durumu yazmayın.

**Tembel kurtarma:** `rateLimitedUntil` geçmişte kaldığında bağlantı yeniden uygun hâle gelir. Başarılı kullanımda `clearAccountError()` tüm hata alanlarını temizler.

### Oturum yakınlığı (#7274)

**Kapsam:** **herhangi bir** sağlayıcı için tek bir bağlantıya sabitlenmiş bir istemci oturumu (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı).

**Amaç:** çok turlu bir aracıyı (Claude Code, aider, özel aracılar) istekler arasında aynı hesapta tutarak hesaplar arası bağlam kaybını ve hesap başına oturum durumu tutan sağlayıcılarda tekrarlanan soğuk başlangıç 429'larını azaltmak.

**Uygulama:**

- TTL çözümleme: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Sabitleme seçimi/oluşturma: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlık ayıklama (genel, tüm sağlayıcılar): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Kalıcı sabitleme tablosu: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ayar: `sessionAffinityTtlMs` (ms cinsinden genel TTL, `0` devre dışı bırakır) — `src/lib/db/settings.ts`. Yalnızca Codex'e özgü `codexSessionAffinityTtlMs` adından, daha önce yapılandırılmış Codex TTL değerini yeni varsayılan değer olarak devralan `124_generic_session_affinity_ttl.sql` geçişiyle yeniden adlandırılmıştır.

#7274 öncesinde `resolveSessionAffinityTtlMs()`, `codex` dışındaki her sağlayıcı için doğrudan `0` döndürüyordu; dolayısıyla sabitleme mekanizması ve başlık ayıklama zaten sağlayıcıdan bağımsız olmasına rağmen TTL ayarı (ve oturum başlıkları) başka hiçbir yerde etkili değildi. Düzeltme bu erken dönüşü kaldırdı; TTL artık genel olarak `0` değerinin üzerinde ayarlandığında tüm sağlayıcılara eşit biçimde uygulanır.

Üç oturum yakınlığı başlığı hiçbir zaman üst kaynağa iletilmez — yürütücüler, istemci başlıklarını aktarmak yerine kendi üst kaynak başlıklarını sıfırdan oluşturur; dolayısıyla bu yalnızca dahili bir korelasyon kimliği olarak kalır.

### Özel yönetilen oturum bağlantısı kiralamaları

**Kapsam:** etkin bir yönetilen HTTP istemcisi/oturumu, uygun bir OmniRoute bağlantısının sahibi olur.

**Amaç:** istekler arasında katı bir yönlendirme sınırına ihtiyaç duyan istemciler için dayanıklı ve özel bağlantı sahipliği sağlamak. Bu, yumuşak bir süreklilik tercihi olan oturum yakınlığından farklıdır: özel bir kiralama, yaşam döngüsü durumunu SQLite'ta kalıcı hâle getirir, genel etkin sahip ve etkin bağlantı benzersizliğini zorunlu kılar ve sağlayıcıya gönderimden önce eski bir nesli reddeder.

Bu özellik API anahtarı başına isteğe bağlıdır. Yönetilen bir anahtar `lease:exclusive` kapsamına ve açıkça belirtilmiş, boş olmayan bir `allowedConnections` listesine sahip olmalıdır. Herhangi bir HTTP istemcisi yaşam döngüsü uç noktasını kullanabilir; istemci adı, user-agent, sağlayıcı, OAuth yöntemi veya model gerekli değildir. Kiralama bir modelin değil, bir bağlantının sahibi olur; dolayısıyla bağlantı olağan şekilde uygun kaldığı sürece model değişikliği bağlamayı korur. Normal model, kota, sağlık, bekleme süresi ve izin listesi kuralları belirleyici olmaya devam eder ve aynı nesli başka bir boş ve uygun bağlantıya geçirebilir.

Yaşam döngüsü, `acquire`, `renew` ve `release` JSON eylemleriyle `POST /api/v1/session-leases` şeklindedir. Yönetilen çıkarım istekleri, opak `X-OmniRoute-Lease-Owner` değerini ve tam `X-OmniRoute-Lease-Generation` değerini sunar. Sahip değeri, `vlo_` ve ardından gelen 43 base64url karakterinden oluşur; yalnızca SHA-256 karması saklanır. Her nihai gönderim sınırı ayrıca kimliği doğrulanmış API anahtarı kimliğini ve etkin bağlantı kimliğini bağlar. Kiralama denetim başlıkları günlüklerden, saklanan istek anlık görüntülerinden ve üst kaynak yürütücü başlıklarından kaldırılır.

Olağan yönlendirmede uygun yönetilen adaylar bulunmasına rağmen tüm boş adaylar yabancı etkin kiralamalar tarafından kullanılıyorsa OmniRoute; HTTP `429`, kiralama kapasitesinin kullanılamadığını belirten bir kod, kapasite bekleme durumu ve ilgili en erken sona erme zamanından türetilen sınırlı bir `Retry-After` döndürür. Olağan uygunluk kümesinin boş olması kiralama çekişmesi değildir ve mevcut yönlendirme hatası anlamını korur.

İlgili mekanizmalar birbirinden ayrı kalır:

- OAuth oturum doluluğu, OAuth hesapları için süreç içi yumuşak dağıtımdır.
- Hesap semaforları, istek eşzamanlılığı izinleri verir ve bir istek tamamlandığında sona erer.
- Özel yönetilen oturum kiralamaları, nesil sınırıyla dayanıklı yaşam döngüsü sahipliği sağlar.

---

## 3. Model Kilitleme

**Kapsam:** sağlayıcı + bağlantı + model üçlüsü.

**Duruma göre anahtar kapsamı:** başarısızlık durumu, kilitlemenin hangi anahtara
yazılacağını belirler (`open-sse/services/accountFallback/exactModelLock.ts`
içindeki `resolveLockoutScope()`):

- `429` / `403` / `402` — kota veya yetkilendirme sinyali — **kota ailesini** kilitler:
  codex için bağlantının tüm `codex` / `spark` kapsamı (bağlantıdaki her
  `gpt-5*` modeli), diğer sağlayıcılar için `getQuotaScopedModelForProvider()`.
- `404`, yalın modeli kilitler (`getModelLockKey()`, `not_found` kapsamını daraltır).
- Diğer tüm durumlar — `5xx` aktarım/sunucu hataları ve OmniRoute'un kalite
  doğrulamasından kaynaklanan, kendi oluşturduğu `502` — yalnızca **tam**
  sağlayıcı/bağlantı/model üçlüsünü kilitler. Bir modeldeki bozuk akış, hesabın
  kotası hakkında kanıt değildir; bu kuraldan önce `codex/gpt-5.6-luna`
  üzerindeki tek bir boş yanıt, kotasına dokunulmamış olmasına rağmen o
  bağlantının tüm `gpt-5*` modellerini 2–30 dakikalığına (giderek artacak şekilde)
  yönlendirmeden çıkarıyordu.
- Çağıranın açık `scope` seçeneği her zaman önceliklidir (Antigravity `"exact"`
  iletir).

**Amaç:** yalnızca tek bir model kullanılamadığında veya kota sınırına takıldığında bağlantının tamamını devre dışı bırakmaktan kaçınmak.

**Örnekler:**

- Model başına kota uygulayan sağlayıcıların 429 döndürmesi
- Yerel sağlayıcıların eksik bir model için 404 döndürmesi
- Sağlayıcıya özgü mod/model izin hataları (ör. Grok modları)

**Uygulama:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Bekleme Süreleri Panosu (v3.8.0)

Kullanıcı arayüzü: Ayarlar → Model Bekleme Süreleri (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Etkin kilitlemeleri şu bilgilerle listeler: sağlayıcı, bağlantı, model, neden, expiresAt. Operatörler kart üzerinden bir modeli manuel olarak yeniden etkinleştirebilir.

**REST API:**

- `GET /api/resilience/model-cooldowns` — etkin kilitlemeleri listeler
- `DELETE /api/resilience/model-cooldowns` — manuel olarak yeniden etkinleştirir. Gövde: `{provider, connection, model}`. Kimlik doğrulama: yönetim.

### Kilitleme ayarları kullanıcı arayüzü + başarıyla azalan kurtarma (v3.8.23)

Model kilitleme, her zaman etkin olan sabit kodlanmış bir davranıştan, kendi
ayar kartına ve kendi kendini iyileştiren kurtarma yoluna sahip, tamamen
yapılandırılabilir ve isteğe bağlı bir özelliğe dönüştü.

**Ayarlar kartı:** Ayarlar → Model Kilitleme
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu kart, yukarıdaki salt okunur `ModelCooldownsCard` kartından (yalnızca etkin
kilitlemeleri _listeler_) **farklıdır** — yeni kart _parametreleri yapılandırır_.
Varsayılanlar `DEFAULT_MODEL_LOCKOUT_SETTINGS` içinde bulunur
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ayar                    | Varsayılan                       | Anlamı                                                                     |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Ana anahtar — model kilitleme **varsayılan olarak kapalıdır**.             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model kapsamlı hata sayılan üst akış durumları.                            |
| `baseCooldownMs`        | `120_000` (120 sn)               | İlk hata için başlangıç kilitleme süresi.                                  |
| `maxCooldownMs`         | `1_800_000` (30 dk)              | Artırılmış bekleme süresinin üst sınırı.                                   |
| `maxBackoffSteps`       | `10`                             | Azami üstel geri çekilme artış adımı sayısı.                               |
| `useExponentialBackoff` | `true`                           | Tekrarlanan hataların bekleme süresini üstel olarak artırıp artırmayacağı. |

Ayarlar normal ayar deposu aracılığıyla kalıcı hale getirilir ve dayanıklılık
ayarları şeması üzerinden doğrulanır; kart `baseCooldownMs`/`maxCooldownMs`
değerlerini (`maxCooldownMs ≥ baseCooldownMs` olacak şekilde) ve
`maxBackoffSteps` değerini sınırlar.

**Başarıyla azalan kurtarma:** kurtarma **yalnızca** zamanlayıcının süresinin
dolmasına bağlı değildir. Sağlıklı bir yanıt, modelin hata sayısını azaltır;
böylece pencerenin ortasında kurtarılan modelin artışı durur (ve kilitleme
kaldırılır), bu işlem zamanlayıcının süresi dolmadan gerçekleşir. Başarılı bir
birleşik hedefte `open-sse/services/combo.ts`, `decayModelFailureCount()`
fonksiyonunu (`open-sse/services/accountFallback.ts`) çağırır; bu fonksiyon,
depolanan `failureCount` değerini **yarıya indirir**
(`Math.floor(failureCount / 2)`); değer `0` olduğunda kilitleme girdisi tamamen
silinir. Karşılık gelen `recordModelLockoutFailure()`, artış penceresi içindeki
hatalarda sayacı artırır (ve bekleme süresini yükseltir). Bu başarıyla azalma,
normal zamanlayıcı süresinin dolmasına ek olarak işler — her iki yol da modeli
yeniden etkinleştirebilir.

**Durum:** kilitlemeler DB'de kalıcı hale getirilmez; **bellekte**
(`provider:connectionId:model` anahtarlı süreç başına `ModelLockoutEntry`
`Map`leri, `provider:connectionId:exact:model` anahtarlı tam kapsamlı kilitler)
tutulur — yeniden başlatıldığında kaybolurlar. _Ayarlar_ kalıcıdır; etkin
kilitleme _durumu_ geçicidir.

---

## 4. Kota Paylaşımı Eşzamanlılık Kontrolü (v3.8.36)

Abonelik hesapları (GLM, MiniMax vb.) genellikle yalnızca ~1–3 eşzamanlı
isteği kabul eder; bu sınırın aşılması 429 yanıtlarını ve bekleme sürelerini tetikler. Bu durum,
birden fazla API anahtarının tek bir üst sağlayıcı hesabını paylaştığı
**kota paylaşımı** (`qtSd/…`) kombinasyonlarında özellikle belirgindir. Üç katman, paylaşılan bir hesabın
istek akınına uğramasını önler.

### Bağlantı başına eşzamanlılık sınırı (`max_concurrent`)

Her sağlayıcı bağlantısı bir `max_concurrent` üst sınırı tanımlayabilir
(`provider_connections.max_concurrent`, bağlantı penceresi / API / DB üzerinden ayarlanır).
Sınırsız olması için boş bırakın. Bu, aşağıdaki serileştirme katmanını yöneten
tek ayardır; bunu hesabın gerçek eşzamanlılık değerine ayarlayın (ör. GLM ~1, MiniMax ~2).

### Kota paylaşımı istek serileştirmesi

Bir kota paylaşımı yönlendirmesi, pozitif bir `max_concurrent` değeri tanımlayan
bir bağlantıyı hedeflediğinde, o **hesaba** yönelik eşzamanlı istekler bağlantı başına
bir semafor (`qsconn:<connectionId>` anahtarı) üzerinden serileştirilir: fazla istekler
hesabı istek akınına uğratmak yerine **kuyrukta bekler**. Bu mekanizma **hata durumunda açık**
çalışır; dolu bir kuyruk veya zaman aşımı, yönlendirilebilir bir isteği reddetmek yerine
slot olmadan devam eder. **Ayarlar → Dayanıklılık → Kota paylaşımı bağlantı başına
eşzamanlılık** bölümünden açıp kapatabilirsiniz
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, varsayılan olarak
açıktır). `max_concurrent` sınırı olmadığında davranış değişmez.

> Kota paylaşımı yönlendirme geçidi (`selectQuotaShareTarget`, DRR + P2C) de
> hata durumunda açık çalışır ve sınırına ulaşmış bir bağlantının yalnızca _önceliğini düşürür_;
> tek bağlantılı bir havuzda katı bir sınır uygulayamaz, dolayısıyla istek akınını gerçekten
> kontrol altında tutan mekanizma bu semafordur.

### Kombinasyon bekleme süresini dikkate alan yeniden deneme

Her kombinasyon stratejisinde (etkinleştirildiğinde), KISA süreli geçici bir bekleme
nedeniyle kesinleşmiş bir 429 yanıtına yol açacak istek, 429 döndürmek yerine
bekleme süresinin dolmasını bekler ve yeniden yönlendirilir; bu, çok modelli
kombinasyonlardaki Gemini sınıfı TPM/RPM pencerelerini (~60 sn. retry-after) kapsar;
örneğin 2 modelli bir kombinasyonun her iki hedefi de model başına hız sınırına
ulaştığında. **Ayarlar → Dayanıklılık** bölümündeki `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ile sınırlandırılır.
`quota_exhausted` (gece yarısına kadar kilitli) veya kimlik doğrulama/bulunamadı
nedenlerinde hiçbir zaman beklemez.

---

## 5. İstek Kuyruğu Kabul Kontrolü (v3.8.49 · issue #6593)

**Kapsam**: Yukarıdaki üç mekanizmanın bir katman altında bulunan, sağlayıcı+bağlantı
başına yerel hız sınırı kuyruğu (`open-sse/services/rateLimitManager.ts`,
Bottleneck desteklidir).

**`maxWaitMs`, yürütme süresinin dolması için kalıcılaştırılmış eski bir addır.**
`resilienceSettings.requestQueue.maxWaitMs`, Bottleneck'e bir iş
`expiration` değeri olarak aktarılır ve bunun zamanlayıcısı yalnızca yönlendirmeden sonra başlar.
Bu nedenle yerel kuyrukta geçirilen süreyi değil, sınırlayıcı tarafından yönetilen
yürütmeyi sınırlar. Süre dolumu, güvenilir yerel
`code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) olarak sunulur;
eski kuyruk zaman aşımı kod adı yalnızca güvenilir dahili geriye dönük
uyumluluk için kabul edilir. Varsayılan değer 15000ms'dir; bunu
`RATE_LIMIT_MAX_WAIT_MS` (ortam değişkeni) veya kontrol paneli
(**Ayarlar → Dayanıklılık**, 1–30000ms kullanıcı arayüzü üst sınırı) üzerinden
geçersiz kılabilirsiniz. Kuyrukta kalma süresi için bir zaman sınırı yoktur;
kuyruktaki çağrıları sınırlandırmak için aşağıdaki `maxQueueDepth` ayarını kullanın.

**`maxQueueDepth` — isteğe bağlı kabul sınırı (yeni).** `resilienceSettings.requestQueue.maxQueueDepth`,
tek bir sağlayıcı+bağlantı için aynı anda kaç isteğin kuyrukta (henüz
yönlendirilmemiş olarak) bekleyebileceğini sınırlar. Kuyruk zaten `maxQueueDepth`
istek içeriyorsa yeni bir istek, `limiter.schedule()` aşamasına hiç ulaşmadan
türlü bir `code: "RATE_LIMIT_QUEUE_FULL"` hatasıyla hızlıca reddedilir;
böylece reddetme düşük maliyetlidir ve söz konusu istek için sonraki
istem sıkıştırma / çeviri işlemlerinden önce gerçekleşir. Varsayılan `0` =
devre dışı; mevcut sınırsız kuyruk davranışını korur. İzin verilen aralık 0–100000'dir.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (ortam değişkeni) veya
`resilienceSettings.requestQueue.maxQueueDepth` (kontrol paneli/API yaması)
üzerinden geçersiz kılabilirsiniz.

Kabul denetiminin kendisi saf bir fonksiyondur
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), böylece
gerçek bir Bottleneck sınırlayıcısı olmadan birim testine tabi tutulabilir.

> #6593'ü başlatan RFC ayrıca bir `bypassCompressionOnRateLimit`
> bayrağı önermişti. Bu deponun `open-sse/services/compression/` işlem hattı,
> sentezlenmiş 429 gövdelerindeki HTTP yanıt sıkıştırması değil, giden LLM isteğindeki
> istem/bağlam sıkıştırmasıdır (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy`
> bloğunun çevresi); doğrudan bir atlama bayrağıyla eşleşen bir kod yolu yoktur.
> Bu istem sıkıştırma adımı ayrıca şu anda istek işlem hattında `withRateLimit()` çağrısından
> _önce_ çalışır; dolayısıyla kuyruk dolu reddinde bu adımı atlamak için sıralamayı
> değiştirmek, bu issue kapsamından ayrı ve daha büyük bir değişikliktir. Burada bilinçli
> olarak **uygulanmamıştır** ve CPU tasarrufu yeniden sıralama riskine değecekse
> sonraki bir çalışma olarak bırakılmıştır.

---

## 6. Yavaş akış aktarım hızı gözetmeni (#9709)

İsteğe bağlı `resilienceSettings.streamRecovery.throughputWatchdog` koruması,
hâlâ parçalar gönderen ancak yapılandırılmış yararlı çıktı hızının altında asistan
çıktısı üreten bir yukarı akışı algılar. Bu koruma, boşta kalma zaman aşımından bilinçli
olarak ayrıdır: sinyaller ve meta veriler iki zamanlayıcıyı da sıfırlamaz ve ilerleme
olarak sayılmaz. Ayrıca çıktı kalitesinden bağımsız olarak mutlak bir güvenlik üst
sınırı olmaya devam eden kesin deneme son tarihinden (#9153) de farklıdır.

Gözetmenin iptal işlemi yapabilmesi için bir ısınma döneminin ve ardından eksiksiz
bir kayan pencerenin tamamlanması gerekir. Chat Completions ve Responses API çıktı
olaylarındaki metin deltalarını sayar (ölçülü bir UTF-8 bayt vekili), yalnızca kullanım
bilgisi içeren ve boş olayları yok sayar ve araç çağrısı veya akıl yürütme olayları
devam ederken değerlendirmeyi askıya alır. Varsayılan olarak devre dışıdır ve
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ile etkinleştirilebilir; pencere, ısınma
süresi, minimum hız ve ölçülebilir minimum çıktı, normal dayanıklılık ayarları
normalleştirme katmanı tarafından sınırlandırılır.

Etkinleştirildiğinde, gözetmen kaynaklı iptal yalnızca etkin yukarı akış denemesine
uygulanır. İstemci tarafından görülebilen herhangi bir bayt gönderilmeden önce,
mevcut aynı hesaplı erken kurtarma yolu denemeyi yeniden açabilir. Commit işleminden
sonra akış hiçbir zaman körü körüne yeniden oynatılmaz; yalnızca mevcut güvenli akış
ortası devam sözleşmesi bir son eki birleştirebilir. Sonlandırma tek seferlik olmaya
devam eder; böylece kullanım muhasebesi ve semafor serbest bırakma işlemi yinelenmez.

---

## 7. Yukarı Akış Durumunun Yeniden İfade Edilmesi (yanlış bildirilen kota hataları)

**Kapsam:** geçici kota tükenmesini yanlış HTTP durumuyla bildiren tek bir yukarı akış ağ geçidi.

**Amaç:** yanıltıcı bir durumu sınıflandırmadan ÖNCE düzeltmek; böylece aşağı akış tüketicileri (yedek motoru, birleşik toplama, istemciye yönelik yanıt) hatanın gerçek ve yeniden denenebilir niteliğini görür.

Bazı ağ geçitleri GEÇİCİ kota tükenmesini yeniden denenemez bir HTTP
durumuyla bildirir. `agentrouter.org`, standart `429` yerine Çince bir gövdeyle
(`用户额度不足` / `额度不足`) `403` (bazen `400`) döndürür. Claude
Code gibi istemciler `403` durumunu kalıcı olarak değerlendirip oturumu iptal eder
ve düzeltme yapılmadığında yedek motoru bunu bir kota olayı yerine `AUTH_ERROR`
olarak sınıflandırır.

**Uygulama:**

- Kayıt defteri + eşleştirici: `open-sse/config/upstreamStatusRestatement.ts` —
  sağlayıcı başına bir kural listesi (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`); eşleştirme `applyStatusRestatement()`
  aracılığıyla yapılır.
- Çağrı noktası: `open-sse/handlers/chatCore.ts` içindeki `providerFailure:`
  bloğu (yaklaşık 3654. satır); `parseUpstreamError()` hata HTTP durumuna
  (`!providerResponse.ok`) sahip bir yukarı akış yanıtını ayrıştırdıktan hemen
  sonra ve herhangi bir sınıflandırma çalışmadan önce yer alır; böylece tüm
  aşağı akış tüketicileri düzeltilmiş durumu görür. Bir `200` SSE akışına
  gömülü hatalar ayrı ve daha sonraki bir akış ayrıştırma yolunu izler ve
  bugün bu kanca tarafından **kapsanmaz** — bu, henüz agentrouter'ın yanlış
  durumu için gerekli olmayan bilinen bir sınırlamadır (çünkü bu durum bir
  hata HTTP durumu olarak ortaya çıkar).
- Yeniden deneme uygunluğu: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) içindedir; dolayısıyla
  yeniden ifade edilen bir hata, işlevsiz bir `403` olarak ortaya çıkmak
  yerine gerçek bir yeniden deneme penceresi taşır.
- Yapay `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`), yalnızca
  yeniden ifade edilen yanıtın **istemciye** bildirdiği süredir; bağlantının
  kendi dahili bekleme/kilitleme süresi değildir. Bu süre, yeniden ifade
  edilen hatayı fiilen işleyen mekanizma tarafından ayrıca yönetilir
  (Bağlantı Bekleme Süresinin artan geri çekilmesi, §2, API anahtarı
  sağlayıcıları için temel `3s`; veya agentrouter gibi model başına kota
  sağlayıcıları için Model Kilitleme, §3). Yönlendirici, istemciye bildirdiği
  60s penceresinden daha erken dahili olarak yeniden denemeye uygun hâle
  gelebilir — bu kasıtlı bir paydır, hata değildir.

Kalıcı hatalar (agentrouter'ın `无权访问模型` hatası — bu modele erişim yok)
ASLA yeniden ifade edilmez: `textMarkers` eşleşse bile `excludeMarkers` kuralı
geçersiz kılar; böylece hata özgün durumunu korur ve hiçbir şey onu sonsuza
dek yeniden denemez. Eşleşen sağlayıcı sınıflandırma kuralına
(`open-sse/config/providerErrorRules.ts` içindeki
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
bildirilmiş `6h` temel bekleme süresi), genel apikey kategorisindeki
`FORBIDDEN` erken dönüşünden _önce_ `checkFallbackError`
(`open-sse/services/accountFallback.ts`) tarafından başvurulur ve bu işlem
`honorsRuleLockScope(provider)` ile sınırlandırılır (#10334 — şu anda
`providerErrorRules.ts` içindeki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin
listesi aracılığıyla yalnızca agentrouter'a özeldir). Kuralın bildirilmiş 6h
bekleme süresi `fallbackResult.baseCooldownMs` olarak aktarılır, ancak yine de
önceden mevcut olan model başına kota kilitleme yolunu besler
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`; bekleme süresi
kaynağı dışında #10334 tarafından değiştirilmemiştir): diğer tüm model
kilitlemelerinde olduğu gibi, operatörün `mlSettings.maxCooldownMs` değerine
(varsayılan `1_800_000ms` / 30min) düşürülerek sınırlandırılır ve
_kalıcılaştırılan kilitleme nedeni_, kuralın `"auth_error"` değeri değil,
önceden mevcut sabit kodlanmış `"forbidden"` değeri olarak kalır — uçtan uca
yalnızca bekleme süresine uyulur, neden dizesine değil. Bağlantının kendisi
etkin kalır; aynı bağlantıdaki kardeş modeller bundan etkilenmez.

Yeniden ifade edilen kota hataları (`额度不足`) üretimde bir sağlayıcı kuralıyla eşleşir
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, kendisine ait tanımlanmış bir bekleme süresi yoktur — kalıcılık katmanının
ölçeklendirilmiş geri çekilme varsayılanı uygulanır). #10334'ten bu yana,
`ProviderErrorRuleMatch` üzerindeki `scope` uçtan uca kullanılmaktadır, ancak
**yalnızca** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesindeki sağlayıcılar
için (`providerErrorRules.ts` — bugün yalnızca `"agentrouter"`,
`honorsRuleLockScope()` aracılığıyla denetlenir). Diğer tüm sağlayıcılarda
`scope`, aynen #10334 öncesinde olduğu gibi yalnızca bilgilendirme amaçlıdır.
`checkFallbackError`, eşleşen kuralın kapsamını
`fallbackResult.ruleScope` olarak sunar; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`), bir `ruleScope` değerinin gerçekten bağlantı
genelinde, kendiliğinden düzelen bir sinyal olarak güvenle dikkate
alınabileceğini doğrulayan ortak korumadır (`scope` `"connection"`, neden
`quota_exhausted`, hiçbir zaman `permanent` değil, hiçbir zaman
`creditsExhausted` değil — gelecekte `scope` `"connection"` değerini kalıcı
bir hesap durumuyla eşleştiren bir kurala karşı savunma). İki tüketici bunu
çağırır:

- **Kalıcılık** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  geçişli sağlayıcının **model başına** kilitleme dalına düşmek yerine
  (agentrouter, `passthroughModels: true` kullanır →
  `hasPerModelQuota()` değeri `true` döndürür), **geçici bir bağlantı bekleme
  süresi** uygular — `testStatus: "unavailable"` + `rateLimitedUntil`, hiçbir
  zaman nihai bir durum (`credits_exhausted`/`banned`/`expired`) uygulamaz —
  böylece bağlantı, manuel kimlik bilgisi sıfırlaması gerektirmek yerine
  bekleme süresi sona erdiğinde kendiliğinden düzelir. `disableCooling: true`
  olan bağlantılarda atlanır (#2997): bu vazgeçme seçeneği bunun yerine model
  başına kilitlemeye geçer (belgelenmiş bir ödünleşimdir — dalın üzerindeki
  kod yorumuna bakın).
- **Aynı istek içindeki birleşik yönlendirme** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): aynı koruma, bağlantıyı
  `${provider}:${connectionId}` anahtarıyla bellek içi
  `exhaustedConnections` kümesinde işaretler. Bu, yalnızca kendi hedef
  nesnesinde aynı `connectionId` değerini zaten taşıyan kalan bir AYNI İSTEK
  hedefini atlar (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  aramasından önce `if (provider && connectionId)`) — kardeş hedeflerin
  kendilerine sabitlenmiş bir `connectionId` taşımadığı ve bağlantının yalnızca
  yanıtın `X-OmniRoute-Selected-Connection-Id` üstbilgisinden her gönderim
  başına çözümlendiği düz bir model listesi birleşimi, bu anahtar eşleşmesine
  hiçbir zaman ulaşmaz. Bu yaygın durumda, kalan bir ayağın az önce kotası
  tükenen hesabı yeniden kullanmasına karşı gerçek koruma bu Set DEĞİLDİR —
  yukarıdaki kalıcılık katmanının (bağlantının `rateLimitedUntil` değeri artık
  gelecektedir), aynı korumanın söz konusu hata için
  `transientRateLimitedProviders` değerini engellemesiyle birleşimidir
  ("İki aşamalı tasarım" bölümüne ve `targetExhaustion.ts` içindeki
  `isAgentrouterConnectionQuotaScope` dalına ilişkin kod yorumuna bakın):
  söz konusu Set işaretlenmeden bırakıldığında, `combo.ts` içindeki
  `allowRateLimitedConnection` zorla izin verme mekanizması
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`), sağlayıcının kalan
  ayakları için devreye GİRMEZ; dolayısıyla kimlik bilgisi seçiminin
  `rateLimitedUntil` filtresi (`src/sse/services/auth.ts:1238`) normal şekilde
  uygulanır ve kalan bir ayak ya farklı, hâlâ uygun bir agentrouter bağlantısı
  seçer ya da kullanılabilir kimlik bilgisi bulunmadığı için başarısız olur —
  bu dalın az önce beklemeye aldığı bağlantıya zorla geri dönmez.

### İki aşamalı tasarım: durumun yeniden ifade edilmesi, ardından sınıflandırma

Durumun yeniden ifade edilmesi (`upstreamStatusRestatement.ts`) ve sağlayıcı
sınıflandırma kuralları (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`), her ikisi de sağlayıcı kimliği ve metin işaretçilerine
göre anahtarlanan ayrı kayıtlardır; ancak farklı yerlerde çalışır ve farklı
amaçlara hizmet ederler: yeniden ifade etme, `chatCore.ts` içinde HTTP
durumunu erkenden yeniden yazar; sınıflandırma kuralları ise
`checkFallbackError()` (`open-sse/services/accountFallback.ts`) içinde geri
dönüş `reason` değerini ve kilit `scope` değerini (`model` / `provider` /
`connection`) seçer.

Sınıflandırma kuralları, hata **metninin** tamamını (`额度不足` gibi gövde
işaretçilerini eşleştirmek için gereklidir) yalnızca
`providerErrorRules.ts` içindeki `FULL_TEXT_RULE_PROVIDERS` izin listesinde
bulunan sağlayıcılar için görür — şu anda yalnızca `"agentrouter"`. Diğer
tüm **yerleşik katalog** sağlayıcılarında `checkFallbackError`,
`getProviderErrorRuleMatch` işlevine yalnızca yapılandırılmış hatayı
(`{code, type}`) iletir; bu, üstbilgi/durum/kod tabanlı kurallar için
yeterlidir ancak gövde metni işaretçilerini göremez.
`resolveRuleMatchBody()` yardımcısı bu seçimi gerçekleştirir: izin listesindeki
sağlayıcılar için hata metninin tamamını, diğerleri için yapılandırılmış hatayı
kullanır. Bir **yerleşik** sağlayıcıyı `FULL_TEXT_RULE_PROVIDERS` listesine
eklemek, sağlayıcı başına açık bir katılımdır — bu mekanizma, listede olmayan
her sağlayıcının varsayılan yolunun bayt bayt değişmeden kalması için vardır.

Bir kuralın `scope` değeri (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS` seçeneğinden ayrı bir katılımdır:
`checkFallbackError` bunu yalnızca `fallbackResult.ruleScope` olarak sunar ve
aşağı akış tüketicileri, aynı dosyadaki
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listesinde bulunan sağlayıcılar için
bunu bilgilendirici bir etiketten başka bir şey olarak dikkate alır
(`honorsRuleLockScope()` aracılığıyla denetlenir — bugün yalnızca
`"agentrouter"`). Bir sağlayıcı bu izin listesine alındıktan sonra
`scope: "connection"` eşleşmesinin gerçekte ne yaptığını öğrenmek için
yukarıdaki "Yeniden ifade edilen kota hataları" bölümüne bakın.

**#11104 — operatör tarafından tanımlanan kurallar her iki izin listesini de atlar.** Bir operatör,
bu dosyayı düzenlemeden çalışma zamanında `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
aracılığıyla sağlayıcı başına bir kural tanımlayabilir. Bir operatör kuralını,
yerleşik katalog kurallarının **varsayılan** davranışını korumayı amaçlayan
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` izin listelerinin
arkasına koymak, kuralı tanımlamak zaten operatörün açıkça katılım tercihi
olduğundan, ayarlar mekanizmasını bu listelerde zaten yer alanlar dışındaki
tüm sağlayıcılar için işlevsiz hâle getirirdi. `resolveRuleMatchBody()` ve
`honorsRuleLockScope()` önce `hasOperatorRuleForProvider()` kontrolünü yapar:
operatör kuralına sahip bir sağlayıcı, iki izin listesinden herhangi birinde
yer alıp almadığına bakılmaksızın ham hata metnini alır ve tanımlanan
`scope` değerine uyulur.

**Bilinen eksiklik — HTTP 400 için `providerRuleRegistry` hiçbir zaman dikkate alınmaz.**
`checkFallbackError` içindeki `BAD_REQUEST` dalı, durum 400'ü tamamen kendi
kalıp dizileri (`accountFallback.ts` içindeki
`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` vb.) üzerinden
sınıflandırır ve üstündeki `configuredRule`/`getProviderErrorRuleMatch`
dalına ulaşılmadan önce döner. `status: 400` içeren yerleşik bir katalog
kuralı (veya operatör kuralı) sözdizimsel olarak geçerlidir ancak hiçbir
zaman tetiklenmez. Bugün mevcut kuralların hiçbiri 400'ü hedeflemediğinden
üretimde hiçbir şey etkilenmez; ancak gelecekteki bir 400 kuralı için önce
bu dala müdahale edilmesi gerekir. Bu, yalnızca bir kural eklemekten daha
kapsamlı bir değişikliktir (kalıp dizisi davranışına hâlihazırda güvenen her
sağlayıcı için 400'ü yeniden sınıflandırır) ve tek sağlayıcılı bir kural
eklemesinin kapsamı dışındadır.

### Kotayı yanlış ifade eden yeni bir ağ geçidi ekleme

1. `statusRestatementRegistry` içine bir kural dizisi kaydedin
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   değerlerini sağlayıcıya özgü tutun; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) ile çakışan genel İngilizce
   ifadeleri asla yeniden kullanmayın.
2. Doğru kilit kapsamını seçmek için isteğe bağlı olarak
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) içinde
   sınıflandırma kuralları kaydedin (hesap genelindeki kota için `connection`,
   model başına hatalar için `model`). Bu adım, yalnızca kuralları tam hata
   metnine (gövde işaretleyicilerine) ihtiyaç duyan sağlayıcılarda üretimde
   etkili olur: sağlayıcı kimliğini aynı dosyadaki
   `FULL_TEXT_RULE_PROVIDERS` listesine ekleyin; aksi takdirde
   `checkFallbackError`, kurala yalnızca yapılandırılmış `{code, type}`
   hatasını iletir ve gövde metni kuralı canlı trafikte hiçbir zaman
   eşleşmez. Yalnızca `status`/`headers` üzerinden eşleşen kurallar
   (Opencode veya Minimax kuralları gibi) bu katılım tercihini gerektirmez.
   Ayrıca, kural `scope: "connection"` tanımlıyorsa ve amaç yalnızca
   bilgilendirici bir etiket değil, gerçekten bağlantı genelinde bir bekleme
   süresi ve aynı istek içinde kombinasyonun atlanmasıysa, sağlayıcı
   kimliğini aynı dosyadaki `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listesine
   ekleyin. `markAccountUnavailable()` (`src/sse/services/auth.ts`) ve
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) içinde
   `isAgentrouterConnectionQuotaScope()` tarzı tüketimi kontrol eden budur;
   bu olmadan `scope`, `fallbackResult.ruleScope` üzerinden aktarılmaya
   devam eder ancak hiçbir şey buna göre işlem yapmaz.
3. `tests/unit/upstream-status-restatement.test.ts` ve
   `tests/unit/agentrouter-error-rules.test.ts` testlerini yansıtan birim
   testleri ekleyin (`not-permanent` / `not-creditsExhausted` korumaları
   dâhil; ayrıca sağlayıcının izin listesine ihtiyacı varsa
   `resolveRuleMatchBody()` işlevinin tam metni yalnızca o sağlayıcı için
   döndürdüğünü doğrulayan bir test ekleyin).

`chatCore.ts`, `classifyError` veya kombinasyon tarafında herhangi bir değişiklik gerekmez.

#### Çıkışa göre gruplandırılmış kilit (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` içindeki sağlayıcılar (opencode ailesi),
IP'ye göre gruplandırılmış üst sistemler olarak değerlendirilir (opencode
ücretsiz katmanı hesap bazında değil, IP bazında gruplandırılır — bkz.
#9611): `quota_exhausted` **veya** `rate_limit_exceeded` olarak
sınıflandırılan bir durum-429, rotasyon bunları deneyemeden önce son bilinen
çıkış IP'si başarısız bağlantınınkiyle eşleşen izin verilmiş ailedeki tüm
bağlantıları beklemeye alır
— böylece başarısız olacağı garanti edilen N-1 üst sistem çağrısı önlenir
(#10460/#10525 ile aynı yapı). `rate_limit_exceeded` kasıtlı olarak dâhil
edilmiştir: `markAccountUnavailable` yolunda opencode'a özgü kurallar hiçbir
zaman eşleşmez (`checkFallbackError` işlevine başlıklar/gövde iletilmez,
opencode `FULL_TEXT_RULE_PROVIDERS` içinde değildir); dolayısıyla gövdesinde
abonelik kotası metni ("monthly usage limit reached") bulunan bir 429,
`status_429` kuralına ulaşılmadan önce kota metni geri dönüşü
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlik bekleme
süresi) tarafından `quota_exhausted` olarak sınıflandırılır. Kota metni
içermeyen bir 429 (yalın hız sınırlaması) ise `status_429` kuralı üzerinden
`rate_limit_exceeded` olarak sınıflandırılır ve yine de IP ailesini beklemeye
alır. İzin listesindeki bir sağlayıcı için IP bazında gruplandırılmış bir hız
sınırı, tükenmiş kota ile aynı sinyaldir. Gerçek sınırlar:

- **En iyi çaba**: kilit, bağlantının bilinen son `egress_ip` değerini
  `proxy_logs` üzerinden çözümler (24 saatlik pencere, eşzamanlı, önbelleksiz). Soğuk önbellek (çıkış
  IP'si hiç yoklanmamışsa) veya satır bulunmaması → başarısız olan bağlantı yine bu
  dal tarafından beklemeye alınır (bugünkü gibi kaydedilir), yalnızca hiçbir kardeş bağlantı kilitlenmez.
- **Asla terminal değil**: bekleme süresi, yenilenen bir kota penceresidir
  (`testStatus: "unavailable"`); IP düzeyindeki bir sinyalden hiçbir zaman kalıcı bir
  durum türetilmez. `disableCooling` bağlantıları bu dalı tamamen atlar.
- **İzin verilen sağlayıcı ailesi için kilit ayrıntı düzeyi değişiyor**: bu yalnızca
  bir kardeş bağlantı optimizasyonu değil, kapsam değişikliğidir. opencode bir `passthroughModels`
  sağlayıcısıdır; dolayısıyla bu daldan önce bir 429, MODEL başına kilitlemeye yol açıyordu; artık
  bağlantı bekleme süresine yol açıyor — buna hiçbir kardeş bağlantısı olmadan tek bir
  bağlantı çalıştıran bir operatör de dahildir. Bu, opencode kural
  tablosunun zaten doğru olarak bildirdiği ayrıntı düzeyidir (`scope: "connection"`,
  `providerErrorRules.ts`); ancak opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` içinde olmadığından şimdiye kadar hiç uygulanmamıştır. Bu dal,
  bağlantı kapsamlı agentrouter dalını yansıtacak şekilde başarısız
  bağlantının bekleme süresini + `backoffLevel` değerini kendisi yazar ve döner — aşağıdaki model başına
  engelleme ve genel yol hiçbir zaman çalıştırılmaz.
- **Combo dahil**: agentrouter dalında olduğu gibi kapsam, bir combo çağıranın
  429'a uyguladığı `persistUnavailableState`/`isCombo` seviye düşürmesini bilinçli olarak
  yok sayar. Model başına kilitleme bu kapsamın daha zayıf bir biçimi değildir;
  yanlış birimdir: tükenmiş IP hakkında hiçbir şey söylemez, dolayısıyla combo
  rotasyonu, kardeş bağlantı başına başarısız olacağı kesin olan bir çağrıyı harcamaya devam eder.
- **Kardeş bağlantı güvenliği**: zaten terminal durumda olan (banned/credits_exhausted)
  veya hâlihazırda daha uzun bir bekleme süresinde bulunan kardeş bağlantının üzerine asla yazılmaz.
- **Özel izin listesi**: `EGRESS_BUCKETED_LOCK_PROVIDERS` listesini genişletmek
  açık bir sahip kararıdır; genel amaçlı bağlantılama yoktur (örüntü #10334/#10419).
  Kardeş bağlantı sorgusu, aynı izin listesini SQL
  sabiti olarak yinelemek yerine ona bağlanır; böylece listeyi genişletmek tek satırlık bir değişiklik olarak kalır.
- **Her iki yönde çıkış IP'si rotasyonu**: arama penceresi (24 saat),
  çıkış IP'si önbellek TTL'sinden (5 dk.) çok daha geniştir; dolayısıyla "bilinen son IP" güncel
  durum değil, geçmiş bilgisidir. Bir bağlantının proxy'si bu pencere içinde değiştiyse
  kilit, gerçekten paylaşılan bir IP'yi **kaçırabilir** (kaydedilen IP yeni ve
  tükenmemiş olandır) — ve simetrik olarak, o zamandan beri tükenmiş IP'den
  ayrılmış bir kardeş bağlantıyı **beklemeye alabilir**. İkinci durum, söz konusu kardeş bağlantıya bir
  bekleme penceresine mal olur; her ikisi de geçmişe dayalı
  aramanın kabul edilen en iyi çaba sınırlarıdır.
- **Maliyet**: yalnızca 429 sıklığında, `proxy_logs` üzerinde iki sınırlı tarama
  (pencere filtresi `idx_pl_timestamp` üzerinden uygulanır). Yeni indeks yok (migration 134
  YAGNI). Orta büyüklükte, gerçek trafik içeren bir veritabanı kopyasında ölçülmüştür;
  yüksek iş hacimli bir örnek aynı pencere içinde orantılı olarak daha fazla satır tutar.

---

## Diğer Dayanıklılık Özellikleri

- **19 yönlendirme stratejisi** (öncelik, ağırlıklı, round-robin, bağlam aktarma, önce doldurma, p2c, rastgele, en az kullanılan, maliyet odaklı, sıfırlama duyarlı, sıfırlama penceresi, boşluk payı, katı rastgele, otomatik, lkgp, bağlam odaklı, önbellek odaklı, füzyon, işlem hattı) — bkz. [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Sıfırlama duyarlı yönlendirme** (v3.8.0) — bağlantıları kota sıfırlama zamanına göre önceliklendirir.
- **Arka plan modu indirgemesi** — Responses API `background: true`, bir uyarıyla senkron moda indirgenir.
- **Dinamik araç sınırı algılama** — araç sayısı sınırlarına ulaşıldığında sağlayıcıları geri çeker.
- **Acil durum yedeği** — `OMNIROUTE_EMERGENCY_FALLBACK` tarafından kontrol edilir; operatörler yeniden başlatma gerekmeksizin Özellik Bayrakları sayfasından bunu geçersiz kılabilir.

---

## Hata Ayıklama

- Ağırlıklı kombinasyon yanıtı `503 all_targets_cooling_down` (`Retry-After` ayarlanmış, `diagnostics.excluded` her hedefi `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ile listeliyor) → havuz yapılandırılmış ve bağlıdır; yalnızca her hedef bir dayanıklılık zamanlayıcısı tarafından hariç tutulmuştur. `[COMBO] Weighted selection: every target excluded before dispatch — …` uyarısı, nedenleri ve kalan saniyeleri belirtir. Aynı kombinasyondan gelen bir `404 no_executable_targets`, hiçbir dayanıklılık zamanlayıcısının devreye girmediği anlamına gelir (çalıştırılacak hiçbir şey yoktur veya her hesap kullanılabilirlik yoklamasında başarısız olmuştur). `targetResolution.ts` içinde toplanan hariç tutmalardan `open-sse/services/combo/pinRecovery.ts` içinde oluşturulur.
- Bir sağlayıcıya ait tüm anahtarlar atlanıyorsa → hem devre kesici durumunu HEM DE her bağlantının `rateLimitedUntil`/`testStatus` değerini kontrol edin.
- Sağlayıcı sıfırlama penceresinden sonra kalıcı olarak hariç tutuluyorsa → kod, `getStatus()`/`canExecute()` yerine ham `state` değerini okuyordur.
- Bir anahtar başarısız olurken diğerlerinin çalışması gerekiyorsa → devre kesici yerine bağlantı bekleme süresini tercih edin.
- Yalnızca bir model başarısız oluyorsa → bağlantı bekleme süresi yerine model kilitlemesini tercih edin.
- Durumun kendiliğinden düzelmesi gerekiyor ancak düzelmiyorsa → gelecekteki bir zaman damgası ile süresi dolmuş durumu yenileyen okuma yolunu kontrol edin. Kalıcı durumlar manuel değişiklikler gerektirir.

---

## TLS Parmak İzi & Gizlilik

Sağlayıcıya özgü gizlilik (JA3/JA4, CCH, gizleme) ayrı olarak belgelenmiştir — bkz. `docs/security/STEALTH_GUIDE.md` (git; `/docs` içine derlenmez).

---

## Dayanıklılık testleri (Aşama 8 · Blok C)

Dayanıklılık mantığına yönelik birim testlerinin ötesinde, üç test çalışma zamanını
gerçek stres/arıza koşulları altında sınar (tümü entegrasyon/gecelik testlerdir — hiçbiri PR'ları engellemez):

| Test                  | Kapsam                                                                                                                                                                                                                      | Çalıştırma                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Kaos                  | Sahte upstream düğümü gerçek gecikme/sıfırlama/zaman aşımı/503 enjekte eder; devre kesicinin açılıp toparlandığını ve `checkFallbackError` işlevinin 503'ü kurtarılabilir bir yedek hata olarak sınıflandırdığını doğrular. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap büyümesi         | `--expose-gc` altında `createSSEStream` başına ~500 akış; heap üst sınırı aşarsa başarısız olur (OOM koruması #3069).                                                                                                       | `npm run test:heap`                      |
| k6 dayanıklılık testi | `/api/monitoring/health` uç noktasına sürekli yük; p95/hata eşikleri.                                                                                                                                                       | `k6 run tests/load/k6-soak.js` (gecelik) |

`.github/workflows/nightly-resilience.yml` tarafından düzenlenir (cron + dispatch). Varsayılan
`test:integration` içinde kaos ve heap testleri, `RUN_CHAOS_INT`/`--expose-gc` olmadan kendilerini atlar.

---

## Ayrıca Bakınız

- [Mimari Kılavuzu](./ARCHITECTURE.md) — Sistem mimarisi ve iç yapılar
- [Kullanıcı Kılavuzu](../guides/USER_GUIDE.md) — Sağlayıcılar, kombinasyonlar, CLI entegrasyonu
- [Otomatik Kombinasyon Motoru](../routing/AUTO-COMBO.md) — 16 faktörlü puanlama, mod paketleri
