# CLAUDE.md (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Bu dosya, bu depoda kod çalıştırırken Claude Code (claude.ai/code) için rehberlik sağlar.

## Hızlı Başlangıç

```bash
npm install                    # Bağımlılıkları yükle (otomatik olarak .env.example'dan .env oluşturur)
npm run dev                    # Geliştirme sunucusu http://localhost:20128
npm run build                  # Üretim derlemesi (Next.js 16 bağımsız)
npm run lint                   # ESLint (0 hata bekleniyor; uyarılar önceden mevcut)
npm run typecheck:core         # TypeScript kontrolü (temiz olmalı)
npm run typecheck:noimplicit:core  # Sıkı kontrol (implicit any yok)
npm run test:coverage          # Birim testleri + kapsama kapısı (75/75/75/70 — ifadeler/hatlar/fonksiyonlar/dallar)
npm run check                  # lint + test birleştirilmiş
npm run check:cycles           # Dairesel bağımlılıkları tespit et
```

### Testleri Çalıştırma

```bash
# Tek test dosyası (Node.js yerel test koşucusu — çoğu test)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP sunucusu, autoCombo, önbellek)
npm run test:vitest

# Tüm test paketleri
npm run test:all
```

Tam test matrisini görmek için `CONTRIBUTING.md` → "Testleri Çalıştırma" kısmına bakın. Derin mimari için `AGENTS.md` dosyasına bakın.

---

## Projeye Genel Bakış

**OmniRoute** — birleşik AI proxy/yönlendirici. Tek uç nokta, 160'tan fazla LLM sağlayıcısı, otomatik geri dönüş.

| Katman        | Konum                   | Amaç                                                           |
| ------------- | ----------------------- | -------------------------------------------------------------- |
| API Yolları   | `src/app/api/v1/`       | Next.js Uygulama Yönlendiricisi — giriş noktaları              |
| İşleyiciler   | `open-sse/handlers/`    | İstek işleme (sohbet, gömme, vb.)                              |
| Yürütücüler   | `open-sse/executors/`   | Sağlayıcıya özel HTTP dağıtımı                                 |
| Çeviriciler   | `open-sse/translator/`  | Format dönüşümü (OpenAI↔Claude↔Gemini)                         |
| Dönüştürücü   | `open-sse/transformer/` | Yanıtlar API ↔ Sohbet Tamamlamaları                            |
| Hizmetler     | `open-sse/services/`    | Kombinasyon yönlendirme, hız sınırlamaları, önbellekleme, vb.  |
| Veritabanı    | `src/lib/db/`           | SQLite alan modülleri (45'ten fazla dosya, 55 göç)             |
| Alan/Politika | `src/domain/`           | Politika motoru, maliyet kuralları, geri dönüş mantığı         |
| MCP Sunucusu  | `open-sse/mcp-server/`  | 37 araç (30 temel + 3 bellek + 4 beceri), 3 taşıma, ~13 kapsam |
| A2A Sunucusu  | `src/lib/a2a/`          | JSON-RPC 2.0 ajan protokolü                                    |
| Beceriler     | `src/lib/skills/`       | Genişletilebilir beceri çerçevesi                              |
| Bellek        | `src/lib/memory/`       | Kalıcı konuşma belleği                                         |

Monorepo: `src/` (Next.js 16 uygulaması), `open-sse/` (akış motoru çalışma alanı), `electron/` (masaüstü uygulaması), `tests/`, `bin/` (CLI giriş noktası).

---

## İstek Boru Hattı

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod doğrulama → kimlik doğrulama? → politika kontrolü → istemci enjeksiyon koruması
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → önbellek kontrolü → oran sınırlaması → kombinasyon yönlendirmesi?
      → resolveComboTargets() → hedef başına handleSingleModel()
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() yukarı akış → geri çekilme ile yeniden deneme
    → yanıt çevirisi → SSE akışı veya JSON
    → Eğer Yanıtlar API'si: responsesTransformer.ts TransformStream
```

API yolları tutarlı bir desen izler: `Route → CORS ön uç → Zod gövde doğrulama → Opsiyonel kimlik doğrulama (extractApiKey/isValidApiKey) → API anahtarı politika uygulaması → İşleyici delegasyonu (open-sse)`. Global Next.js ara yazılımı yok — kesme işlemi yol spesifik.

**Kombinasyon yönlendirmesi** (`open-sse/services/combo.ts`): 14 strateji (öncelik, ağırlıklı, ilk doldur, dairesel, P2C, rastgele, en az kullanılan, maliyet optimize edilmiş, sıfırlama farkında, katı rastgele, otomatik, lkgp, bağlam optimize edilmiş, bağlam iletim). Her hedef `handleSingleModel()` çağrısı yapar ve bu, hedef başına hata işleme ve devre kesici kontrolleri ile `handleChatCore()`'u sarar. 9 faktörlü Auto-Combo puanlaması için `docs/routing/AUTO-COMBO.md` ve 3 dayanıklılık katmanı için `docs/architecture/RESILIENCE_GUIDE.md`'ye bakın.

---

## Dayanıklılık Çalışma Durumu

OmniRoute, üç ilgili ancak farklı geçici hata mekanizmasına sahiptir. Yönlendirme davranışını hata ayıklarken kapsamlarını ayrı tutun. Bir bakışta harita için [3 katmanlı dayanıklılık diyagramı](./docs/diagrams/exported/resilience-3layers.svg) (kaynak: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))'na bakın.

### Sağlayıcı Devre Kesici

**Kapsam**: tüm sağlayıcı, örneğin `glm`, `openai`, `anthropic`.

**Amaç**: yukarı akış/hizmet seviyesinde sürekli olarak başarısız olan bir sağlayıcıya trafik göndermeyi durdurmak, böylece bir sağlıksız sağlayıcı her isteği yavaşlatmaz.

**Uygulama**:

- Temel sınıf: `src/shared/utils/circuitBreaker.ts`
- Sohbet kapısı/uygulama kablolaması: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Çalışma durumu API'si: `src/app/api/monitoring/health/route.ts`
- Paylaşılan sarmalayıcılar: `open-sse/services/accountFallback.ts`
- Kalıcı durum tablosu: `domain_circuit_breakers`

**Durumlar**:

- `CLOSED`: normal trafik izin verilir.
- `OPEN`: sağlayıcı geçici olarak engellenmiştir; arayanlar bir sağlayıcı-devre-açık yanıtı alır veya kombinasyon yönlendirmesi başka bir hedefe atlar.
- `HALF_OPEN`: sıfırlama zaman aşımı dolmuştur; bir prob isteğine izin verilir. Başarı devre kesiciyi kapatır, başarısızlık tekrar açar.

**Varsayılanlar** (`open-sse/config/constants.ts`):

- OAuth sağlayıcıları: eşik `3`, sıfırlama zaman aşımı `60s`.
- API anahtarı sağlayıcıları: eşik `5`, sıfırlama zaman aşımı `30s`.
- Yerel sağlayıcılar: eşik `2`, sıfırlama zaman aşımı `15s`.

Sadece sağlayıcı düzeyindeki hata durumları sağlayıcı devre kesicisini tetiklemelidir:

```ts
(408, 500, 502, 503, 504);
```

Normal hesap/anahtar/model hataları gibi çoğu `401`, `403` veya `429` durumları için tüm sağlayıcı devre kesicisini tetiklemeyin. Bunlar genellikle bağlantı soğuma veya model kilitlenmesi ile ilgilidir. Genel bir API anahtarı sağlayıcı `403` kurtarılabilir olmalıdır, aksi takdirde terminal sağlayıcı/hesap hatası olarak sınıflandırılır.

Devre kesici tembel kurtarma kullanır, arka planda bir zamanlayıcı değil. `OPEN` süresi dolduğunda, `getStatus()`, `canExecute()` ve `getRetryAfterMs()` gibi okumalar durumu `HALF_OPEN` olarak yeniler, böylece paneller ve kombinasyon aday oluşturucuları süresi dolmuş bir sağlayıcıyı sonsuza kadar hariç tutmaz.

### Bağlantı Soğuma

**Kapsam**: bir sağlayıcı bağlantısı/hesap/anahtar.

**Amaç**: aynı sağlayıcı için diğer bağlantıların istekleri karşılamaya devam etmesine izin verirken, bir kötü anahtar/hesabı geçici olarak atlamak.

**Uygulama**:

- Yazma/güncelleme yolu: `src/sse/services/auth.ts::markAccountUnavailable()`
- Hesap seçimi/filtreleme: `src/sse/services/auth.ts::getProviderCredentials...`
- Soğuma hesaplaması: `open-sse/services/accountFallback.ts::checkFallbackError()`
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

Hesap seçimi sırasında, bir bağlantı atlanırken:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Soğumalar da tembel: `rateLimitedUntil` geçmişte olduğunda, bağlantı tekrar uygun hale gelir. Başarılı kullanımda, `clearAccountError()` `testStatus`, `rateLimitedUntil`, hata alanlarını ve `backoffLevel`'ı temizler.

Varsayılan bağlantı soğuma davranışı:

- OAuth temel soğuma: `5s`.
- API anahtarı temel soğuma: `3s`.
- API anahtarı `429`, mevcut olduğunda yukarı akış yeniden deneme ipuçlarını (`Retry-After`, sıfırlama başlıkları veya ayrıştırılabilir sıfırlama metni) tercih etmelidir.
- Tekrarlanan kurtarılabilir hatalar üstel geri çekilme kullanır:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd koruması, aynı bağlantıda eşzamanlı hataların soğumayı sürekli uzatmasını veya `backoffLevel`'ı iki katına çıkarmasını önler.

Terminal durumlar soğumalar değildir. `banned`, `expired` ve `credits_exhausted` kimlik bilgileri/ayarlar değişene kadar veya bir operatör bunları sıfırlayana kadar kullanılamaz durumda kalması amaçlanmıştır. Terminal durumları geçici soğuma durumu ile üzerine yazmayın.

### Model Kilitlenmesi

**Kapsam**: sağlayıcı + bağlantı + model.

**Amaç**: yalnızca bir modelin kullanılamaz veya kota sınırlı olduğu durumlarda tüm bağlantıyı devre dışı bırakmaktan kaçınmak.

Örnekler:

- Her model için kota sağlayıcıları `429` döndürüyor.
- Bir eksik model için `404` döndüren yerel sağlayıcılar.
- Seçilen Grok modları gibi sağlayıcıya özgü mod/model izin hataları.

Model kilitlenmesi `open-sse/services/accountFallback.ts` içinde yer alır ve aynı bağlantının diğer modelleri sunmaya devam etmesine izin verir.

### Hata Ayıklama Rehberi

- Bir sağlayıcı için tüm anahtarlar atlanıyorsa, hem sağlayıcı devre kesici durumunu hem de her bağlantının `rateLimitedUntil`/`testStatus`'ını kontrol edin.
- Bir sağlayıcı sıfırlama penceresinden sonra kalıcı olarak hariç tutuluyorsa, kodun `getStatus()`/`canExecute()` yerine ham `state` okuduğundan emin olun.
- Bir sağlayıcı anahtarı başarısız olursa ancak diğerleri çalışıyorsa, sağlayıcı devre kesicisi yerine bağlantı soğumasını tercih edin.
- Sadece bir model başarısız olursa, bağlantı soğuması yerine model kilitlenmesini tercih edin.
- Bir durum kendiliğinden kurtulmalıysa, gelecekteki bir zaman damgasına/sıfırlama zaman aşımına ve süresi dolmuş durumu yenileyen bir okuma yoluna sahip olmalıdır. Kalıcı durumlar manuel kimlik bilgisi veya yapılandırma değişiklikleri gerektirir.

## Anahtar Sözleşmeler

### Kod Stili

- **2 boşluk**, noktalı virgüller, çift tırnak, 100 karakter genişliği, es5 son virgüller (lint-staged tarafından Prettier ile zorunlu kılınır)
- **İthalatlar**: harici → dahili (`@/`, `@omniroute/open-sse`) → göreceli
- **İsimlendirme**: dosyalar=camelCase/kebab, bileşenler=PascalCase, sabitler=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = her yerde hata; `no-explicit-any` = `open-sse/` ve `tests/` içinde uyarı
- **TypeScript**: `strict: false`, hedef ES2022, modül esnext, çözümleyici paketleyici. Açık türleri tercih edin.

### Veritabanı

- **Her zaman** `src/lib/db/` alan modüllerinden geçin — **asla** rotalarda veya işleyicilerde ham SQL yazmayın
- **Asla** `src/lib/localDb.ts` içine mantık eklemeyin (sadece yeniden ihracat katmanı)
- **Asla** `localDb.ts`'den silindirik ithalat yapmayın — bunun yerine belirli `db/` modüllerini içe aktarın
- DB singleton: `getDbInstance()` `src/lib/db/core.ts`'den (WAL günlüğü)
- Göçler: `src/lib/db/migrations/` — sürümlü SQL dosyaları, idempotent, işlemler içinde çalıştırılır

### Hata Yönetimi

- belirli hata türleri ile try/catch, pino bağlamı ile günlüğe kaydet
- SSE akışlarında hataları yutmayın — temizlik için iptal sinyalleri kullanın
- Uygun HTTP durum kodlarını döndürün (4xx/5xx)

### Güvenlik

- **Asla** `eval()`, `new Function()`, veya dolaylı eval kullanmayın
- Tüm girdileri Zod şemaları ile doğrulayın
- Kimlik bilgilerini dinlenirken şifreleyin (AES-256-GCM)
- Yukarı akış başlıkları yasak listesi: `src/shared/constants/upstreamHeaders.ts` — düzenlerken temizleme, Zod şemaları ve birim testlerinin uyumlu kalmasını sağlayın
- **Halka açık yukarı akış kimlik bilgileri** (Gemini/Antigravity/Windsurf tarzı OAuth client_id/secret + halka açık CLI'lerden çıkarılan Firebase Web anahtarları): **MUTLAKA** `resolvePublicCred()` ile gömülmelidir `open-sse/utils/publicCreds.ts`'den — **asla** dize sabitleri olarak. Zorunlu desen için `docs/security/PUBLIC_CREDS.md`'ye bakın.
- **Hata yanıtları** (HTTP / SSE / yürütücü / MCP işleyici): **MUTLAKA** `buildErrorBody()` veya `sanitizeErrorMessage()` üzerinden yönlendirilmelidir `open-sse/utils/error.ts`'den — **asla** ham `err.stack` veya `err.message`'i bir yanıt gövdesine koymayın. `docs/security/ERROR_SANITIZATION.md`'ye bakın.
- **Değişkenlerden oluşturulan kabuk komutları**: `exec()`/`spawn()` ile çalışma zamanı değerlerine ihtiyaç duyan bir betik çağırırken, bunları `env` seçeneği aracılığıyla geçirin (otomatik olarak kabukta kaçış yapılır) — **asla** güvenilmeyen/dış yolları betik gövdesine dize ile birleştirmeyin. Referans: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Varsayılan olarak güvenli kütüphaneler** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): yeni güvenlik hassas yüzeyleri eklerken, özel uygulamalar yerine Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink'i tercih edin.

---

## Yaygın Değişiklik Senaryoları

### Yeni Bir Sağlayıcı Ekleme

1. `src/shared/constants/providers.ts` içinde kaydedin (yükleme sırasında Zod ile doğrulanır)
2. Özel mantık gerekiyorsa `open-sse/executors/` içinde yürütücü ekleyin ( `BaseExecutor`'ı genişletin)
3. OpenAI dışı bir format varsa `open-sse/translator/` içinde çevirmen ekleyin
4. OAuth tabanlı ise `src/lib/oauth/constants/oauth.ts` içinde OAuth yapılandırması ekleyin — yukarı akış CLI'si halka açık bir client_id/secret gönderiyorsa, `resolvePublicCred()` aracılığıyla gömün (bkz. `docs/security/PUBLIC_CREDS.md`), **asla** bir literal olarak
5. `open-sse/config/providerRegistry.ts` içinde modelleri kaydedin
6. `tests/unit/` içinde testler yazın (yeni bir gömülü varsayılan eklediyseniz publicCreds şekil doğrulamasını dahil edin)

### Yeni Bir API Rotası Ekleme

1. `src/app/api/v1/your-route/` altında dizin oluşturun
2. `GET`/`POST` işleyicileri ile `route.ts` oluşturun
3. Deseni takip edin: CORS → Zod gövde doğrulaması → isteğe bağlı kimlik doğrulama → işleyici delegasyonu
4. İşleyici `open-sse/handlers/` içinde yer alır (oradan içe aktarın, satır içinde değil)
5. Hata yanıtları `buildErrorBody()` / `errorResponse()` kullanır `open-sse/utils/error.ts`'den (otomatik olarak temizlenir — asla `err.stack` veya `err.message`'i ham olarak gövdeye koymayın). `docs/security/ERROR_SANITIZATION.md`'ye bakın.
6. Testler ekleyin — hata yanıtlarının yığın izlerini sızdırmadığını doğrulayan en az bir doğrulama dahil edin (`!body.error.message.includes("at /")`)

### Yeni Bir DB Modülü Ekleme

1. `src/lib/db/yourModule.ts` oluşturun — `./core.ts`'den `getDbInstance`'i içe aktarın
2. Alan tablonuz için CRUD işlevlerini dışa aktarın
3. Yeni tablolara ihtiyaç varsa `src/lib/db/migrations/` içinde göç ekleyin
4. `src/lib/localDb.ts`'den yeniden dışa aktarın (sadece yeniden dışa aktarma listesine ekleyin)
5. Testler yazın

### Yeni Bir MCP Aracı Ekleme

1. Zod girdi şeması + asenkron işleyici ile `open-sse/mcp-server/tools/` içinde araç tanımını ekleyin
2. Araç setinde kaydedin ( `createMcpServer()` ile bağlanır)
3. Uygun kapsam(lar)a atayın
4. Testler yazın (araç çağrısı `mcp_audit` tablosuna kaydedilir)

### Yeni Bir A2A Yeteneği Ekleme

1. `src/lib/a2a/skills/` içinde yetenek oluşturun (zaten 5 tane var: akıllı yönlendirme, kota yönetimi, sağlayıcı keşfi, maliyet analizi, sağlık raporu)
2. Yetenek görev bağlamını alır (mesajlar, meta veriler) → yapılandırılmış sonuç döndürür
3. `src/lib/a2a/taskExecution.ts` içinde `A2A_SKILL_HANDLERS`'da kaydedin
4. `src/app/.well-known/agent.json/route.ts` içinde açığa çıkarın (Agent Kartı)
5. `tests/unit/` içinde testler yazın
6. `docs/frameworks/A2A-SERVER.md` içinde yetenek tablosunu belgeleyin

### Yeni Bir Bulut Ajanı Ekleme

1. `src/lib/cloudAgent/agents/` içinde `CloudAgentBase`'i genişleten ajan sınıfı oluşturun (zaten 3 tane var: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`'ı uygulayın
3. `src/lib/cloudAgent/registry.ts` içinde kaydedin
4. Gerekirse OAuth/kimlik bilgileri yönetimini ekleyin (`src/lib/oauth/providers/`)
5. Testler + `docs/frameworks/CLOUD_AGENT.md` içinde belgeleyin

### Yeni Bir Guardrail / Eval / Yetenek / Webhook olayı Ekleme

- Guardrail: `src/lib/guardrails/` → belgeler: `docs/security/GUARDRAILS.md`
- Eval paketi: `src/lib/evals/` → belgeler: `docs/frameworks/EVALS.md`
- Yetenek (sandbox): `src/lib/skills/` → belgeler: `docs/frameworks/SKILLS.md`
- Webhook olayı: `src/lib/webhookDispatcher.ts` → belgeler: `docs/frameworks/WEBHOOKS.md`

## Referans Dokümantasyonu

Herhangi bir önemsiz değişiklik için, önce ilgili derinlemesine incelemeyi okuyun:

| Alan                                                     | Doküman                                                           |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| Repo navigasyonu                                         | `docs/architecture/REPOSITORY_MAP.md`                             |
| Mimari                                                   | `docs/architecture/ARCHITECTURE.md`                               |
| Mühendislik referansı                                    | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9 faktör puanlama, 14 strateji)              | `docs/routing/AUTO-COMBO.md`                                      |
| Dayanıklılık (3 mekanizma)                               | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Akıl yürütme tekrarları                                  | `docs/routing/REASONING_REPLAY.md`                                |
| Yetenekler çerçevesi                                     | `docs/frameworks/SKILLS.md`                                       |
| Bellek sistemi (FTS5 + Qdrant)                           | `docs/frameworks/MEMORY.md`                                       |
| Bulut ajanları                                           | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Koruma önlemleri (Kişisel Veriler / enjeksiyon / vizyon) | `docs/security/GUARDRAILS.md`                                     |
| Kamu üst akış kimlik bilgileri (Gemini/vb.)              | `docs/security/PUBLIC_CREDS.md`                                   |
| Hata mesajı temizleme                                    | `docs/security/ERROR_SANITIZATION.md`                             |
| Değerlendirmeler                                         | `docs/frameworks/EVALS.md`                                        |
| Uyum / denetim                                           | `docs/security/COMPLIANCE.md`                                     |
| Webhook'lar                                              | `docs/frameworks/WEBHOOKS.md`                                     |
| Yetkilendirme akışı                                      | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Gizlilik (TLS / parmak izi)                              | `docs/security/STEALTH_GUIDE.md`                                  |
| Ajan protokolleri (A2A / ACP / Bulut)                    | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP sunucusu                                             | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A sunucusu                                             | `docs/frameworks/A2A-SERVER.md`                                   |
| API referansı + OpenAPI                                  | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Sağlayıcı kataloğu (otomatik oluşturulmuş)               | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Sürüm akışı                                              | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Test Etme

| Ne                      | Komut                                                                         |
| ----------------------- | ----------------------------------------------------------------------------- |
| Birim testleri          | `npm run test:unit`                                                           |
| Tek dosya               | `node --import tsx/esm --test tests/unit/file.test.ts`                        |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                         |
| E2E (Playwright)        | `npm run test:e2e`                                                            |
| Protokol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                                  |
| Ekosistem               | `npm run test:ecosystem`                                                      |
| Kapsam kapısı           | `npm run test:coverage` (75/75/75/70 — ifadeler/hatlar/fonksiyonlar/kolonlar) |
| Kapsam raporu           | `npm run coverage:report`                                                     |

**PR kuralı**: Eğer `src/`, `open-sse/`, `electron/` veya `bin/` içindeki üretim kodunu değiştirirseniz, aynı PR içinde testleri eklemeli veya güncellemelisiniz.

**Test katmanı tercihi**: birim önce → entegrasyon (çok modüllü veya DB durumu) → e2e (sadece UI/iş akışı). Hata yeniden üretimlerini düzeltmeden önce veya yanında otomatik testler olarak kodlayın.

**Copilot kapsam politikası**: Bir PR üretim kodunu değiştiriyorsa ve kapsam %75'in (ifadeler/hatlar/fonksiyonlar) veya %70'in (kolonlar) altındaysa, sadece rapor etmekle kalmayın — test ekleyin veya güncelleyin, kapsam kapısını yeniden çalıştırın, ardından onay isteyin. Çalıştırılan komutları, değiştirilen test dosyalarını ve son kapsam sonucunu PR raporuna dahil edin.

---

## Git İş Akışı

```bash
# Asla doğrudan main'e commit yapmayın
git checkout -b feat/your-feature
git commit -m "feat: değişikliğinizi tanımlayın"
git push -u origin feat/your-feature
```

**Dal ön ekleri**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commit formatı** (Geleneksel Commits): `feat(db): devre kesici ekle` — kapsamlar: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky kancaları**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Ortam

- **Çalışma Zamanı**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modülleri
- **TypeScript**: 5.9+, hedef ES2022, modül esnext, çözümleyici paketleyici
- **Yol takma adları**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Varsayılan port**: 20128 (API + kontrol paneli aynı portta)
- **Veri dizini**: `DATA_DIR` env değişkeni, varsayılan olarak `~/.omniroute/`
- **Ana env değişkenleri**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Kurulum: `cp .env.example .env` ardından `JWT_SECRET` (`openssl rand -base64 48`) ve `API_KEY_SECRET` (`openssl rand -hex 32`) oluşturun

---

## Sert Kurallar

1. Asla gizli bilgileri veya kimlik bilgilerini commit etmeyin
2. Asla `localDb.ts` içine mantık eklemeyin
3. Asla `eval()` / `new Function()` / dolaylı eval kullanmayın
4. Asla doğrudan `main`'e commit yapmayın
5. Asla rotalarda ham SQL yazmayın — `src/lib/db/` modüllerini kullanın
6. Asla SSE akışlarında hataları sessizce yutmayın
7. Her zaman Zod şemaları ile girdileri doğrulayın
8. Üretim kodunu değiştirirken her zaman testleri dahil edin
9. Kapsam ≥%75 (ifadeler, hatlar, fonksiyonlar) / ≥%70 (kolonlar) olmalıdır. Mevcut ölçülen: ~%82.
10. Açık operatör onayı olmadan Husky kancalarını (`--no-verify`, `--no-gpg-sign`) asla atlamayın.
11. Asla kamuya açık yukarı akış OAuth client_id/secret veya Firebase Web anahtarlarını string literal olarak gömün — her zaman `resolvePublicCred()` üzerinden geçin (`open-sse/utils/publicCreds.ts`). `docs/security/PUBLIC_CREDS.md`'ye bakın.
12. Asla HTTP / SSE / yürütücü yanıtlarında ham `err.stack` / `err.message` döndürmeyin — her zaman `buildErrorBody()` veya `sanitizeErrorMessage()` üzerinden yönlendirin (`open-sse/utils/error.ts`). `docs/security/ERROR_SANITIZATION.md`'ye bakın.
13. Asla dış yolları veya çalışma zamanı değerlerini `exec()`/`spawn()`'a geçirilen shell betiklerine string-interpolate etmeyin — bunun yerine `env` seçeneği aracılığıyla geçirin. Referans: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Asla bir CodeQL / Secret-Scanning uyarısını (a) yukarıdaki desen belgelerini kontrol etmeden ve (b) reddetme yorumunda teknik gerekçeyi kaydetmeden geçiştirmeyin. Örnek: `js/stack-trace-exposure` hatası, zaten `sanitizeErrorMessage()` üzerinden yönlendirilmiş çağrı noktalarında ortaya çıkmaktadır ve bu bilinen bir CodeQL sınırlamasıdır (özel temizleyiciler tanınmaz) — `docs/security/ERROR_SANITIZATION.md`'ye atıfta bulunarak `false positive` olarak reddedin.
15. Asla çocuk süreçleri başlatan rotaları (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` içinde `isLocalOnlyPath()` sınıflandırması olmadan dahil etmeyin. Döngü geri uygulaması, herhangi bir kimlik doğrulama kontrolünden önce koşulsuz olarak gerçekleşir — tünel aracılığıyla sızdırılan JWT, süreç başlatmayı tetikleyemez. `docs/security/ROUTE_GUARD_TIERS.md`'ye bakın.
16. Asla commit mesajlarında `Co-Authored-By` ekleri dahil etmeyin. Commitler yalnızca depo sahibinin Git kimliği altında görünmelidir (`diegosouzapw`). `Co-Authored-By: Claude …` satırı, GitHub'ın commitleri `claude` Anthropic hesabına atfetmesine neden olur ve gerçek yazarı PR geçmişinde gizler.
