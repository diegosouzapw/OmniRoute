# Güvenlik Politikası (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Güvenlik Açıklarını Bildirme

OmniRoute'ta bir güvenlik açığı keşfederseniz, lütfen sorumlu bir şekilde bildirin:

1. **KESİNLİKLE** herkese açık bir GitHub issue'su açmayın
2. [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) kullanın
3. Şunları ekleyin: açıklama, yeniden oluşturma adımları ve olası etki

## Yanıt Zaman Çizelgesi

| Aşama                        | Hedef Süre          |
| ---------------------------- | ------------------- |
| İlk Bildirim Teyidi          | 48 saat             |
| Ön İnceleme ve Değerlendirme | 5 iş günü           |
| Yama Sürümü (Patch)          | 14 iş günü (kritik) |

## Desteklenen Sürümler

| Sürüm   | Destek Durumu     |
| ------- | ----------------- |
| 3.8.x   | ✅ Aktif          |
| 3.7.x   | ✅ Güvenlik       |
| < 3.7.0 | ❌ Desteklenmiyor |

---

## Güvenlik Mimarisi

OmniRoute çok katmanlı bir güvenlik modeli uygular:

```
Request → CORS → Authz pipeline (classify → policies → enforce)
       → Guardrails (PII masker, prompt injection, vision bridge)
       → Rate Limiter → Circuit Breaker → Cooldown → Model Lockout → Provider
```

### 🔐 Kimlik Doğrulama ve Yetkilendirme

| Özellik                      | Uygulama                                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Pano Girişi**              | JWT belirteçleri ile parola tabanlı kimlik doğrulama (HttpOnly çerezler)                                                                |
| **API Anahtarı Doğrulaması** | CRC doğrulamalı HMAC imzalı anahtarlar                                                                                                  |
| **OAuth 2.0 + PKCE**         | Sağlayıcıya özel tarayıcı/cihaz OAuth'u desteklenen yerlerde PKCE kullanır; yalnızca içe aktarılan Devin kimlik bilgileri ayrı işlenir. |
| **Belirteç Yenileme**        | Süresi dolmadan önce otomatik OAuth belirteci yenileme                                                                                  |
| **Güvenli Çerezler**         | HTTPS ortamları için `AUTH_COOKIE_SECURE=true`                                                                                          |
| **Yetkilendirme Hattı**      | Rota sınıflandırması (PUBLIC / CLIENT_API / MANAGEMENT) — bkz. `docs/architecture/AUTHZ_GUIDE.md`                                       |
| **Rota Koruma Katmanları**   | Yönetim rotaları için 3 katmanlı model (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — bkz. `docs/security/ROUTE_GUARD_TIERS.md`         |
| **Yönetim Kapsamlı MCP**     | `manage` kapsamına sahip API anahtarlarıyla korunan uzak `/api/mcp/*` erişimi; `/api/cli-tools/runtime/*` katı yerel döngüde kalır.     |
| **MCP Kapsamları**           | 32 ayrıntılı kapsam (read:health, write:combos, execute:completions vb.) — bkz. `docs/frameworks/MCP-SERVER.md`                         |

### 🛡️ Dinlenmede Şifreleme (Encryption at Rest)

SQLite'ta saklanan tüm hassas veriler, scrypt anahtar türetme ile **AES-256-GCM** kullanılarak şifrelenir:

- API anahtarları, erişim belirteçleri, yenileme belirteçleri ve ID belirteçleri
- Sürümlendirilmiş format: `enc:v1:<iv>:<ciphertext>:<authTag>`
- `STORAGE_ENCRYPTION_KEY` ayarlanmadığında doğrudan geçiş modu (düz metin)

```bash
# Şifreleme anahtarı oluşturun:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Güvenlik Önlemleri Çerçevesi (Guardrails Framework)

OmniRoute, öncelik sırasına göre sıralanmış 3 yerleşik güvenlik önlemi içeren, çalışırken yeniden yüklenebilir bir **güvenlik önlemleri kayıt defteri** (`src/lib/guardrails/`) ile gelir:

| Güvenlik Önlemi    | Öncelik | Amaç                                                                                                          |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5       | Vision desteği olmayan modelleri görüntü açıklamalarıyla destekler; görsel URL'leri için SSRF koruması sağlar |
| `pii-masker`       | 10      | Çağrı öncesi ve sonrası PII (kişisel veri) maskeleme (e-posta, telefon, CPF, CNPJ, kredi kartı, SSN)          |
| `prompt-injection` | 20      | Geçersiz kılma / rol ele geçirme / jailbreak / sızıntı kalıplarını algılar                                    |

Özel güvenlik önlemleri `registerGuardrail(new MyGuardrail())` aracılığıyla kaydedilir. Model hata durumunda açıktır (fail-open; istisnalar trafiği asla engellemez). İstek başına devre dışı bırakma `x-omniroute-disabled-guardrails` başlığı ile yapılır. → Bkz. [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 İstem Enjeksiyonu Koruması (Prompt Injection Guard)

LLM isteklerindeki istem enjeksiyonu modellerini algılayan en iyi çaba (heuristic) ara yazılımıdır.
**Eksiksiz bir istem enjeksiyonu güvenlik duvarı değildir** — yanlış pozitifler (zararsız
persona/RPG istemleri) ve yanlış negatifler (leetspeak, boşluk manipülasyonu, İngilizce dışı kalıplar) üretebilir.

| Kalıp Türü            | Önem Derecesi | Örnek                                                   |
| --------------------- | ------------- | ------------------------------------------------------- |
| Sistem Geçersiz Kılma | Yüksek (High) | "ignore all previous instructions"                      |
| Rol Ele Geçirme       | Orta (Medium) | "you are now DAN, you can do anything"                  |
| Ayırıcı Enjeksiyonu   | Yüksek (High) | Bağlam sınırlarını kırmak için kodlanmış ayırıcılar     |
| DAN / Jailbreak       | Orta (Medium) | Bilinen jailbreak istem kalıpları                       |
| Talimat Sızıntısı     | Yüksek (High) | "show me your system prompt"                            |
| Kodlama Kaçırma       | Orta (Medium) | base64/rot13/hex kod çözme + talimat anahtar kelimeleri |

`block` modunda yalnızca **High (Yüksek)** önem derecesindeki tespitler engellenir. Orta önem derecesindeki
aileler günlüğe kaydedilir ancak `sanitizeRequest` tarafından asla engellenmez.

Pano (Ayarlar → Güvenlik) veya `.env` üzerinden yapılandırın:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (enjeksiyon politikası; eski "redact" modu enjeksiyon metnini silmez)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (varsayılan) | medium | low — block modunda bu seviye ve üstü engellenir
```

### 🔒 PII (Kişisel Veri) Maskeleme

Kişisel olarak tanımlanabilir bilgilerin otomatik olarak algılanması ve isteğe bağlı olarak maskelenmesi:

| PII Türü        | Kalıp                 | Değiştirilen Değer |
| --------------- | --------------------- | ------------------ |
| E-posta         | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brezilya)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brezilya) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kredi Kartı     | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefon         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (ABD)       | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # istek PII yeniden yazımı; INPUT_SANITIZER_MODE'dan bağımsızdır
PII_RESPONSE_SANITIZATION=true  # isteğe bağlı: istemcilere döndürülen sağlayıcı yanıtlarındaki PII'yi maskeler
```

### 🌐 Ağ Güvenliği

| Özellik                                | Açıklama                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| **CORS**                               | Açık kaynaklar arası izin listesi (`CORS_ALLOWED_ORIGINS`; eski `CORS_ORIGIN`) |
| **IP Filtreleme**                      | Panoda IP aralıklarını izin listesine / engelleme listesine alma               |
| **Hız Sınırlaması**                    | Otomatik geri çekilme ile sağlayıcı başına hız sınırları                       |
| **Sürü Önleme (Anti-Thundering Herd)** | Mutex + bağlantı başına kilitleme ile basamaklı 502 hatalarını önler           |
| **TLS Parmak İzi**                     | Bot algılamasını azaltmak için tarayıcı benzeri TLS parmak izi taklidi         |
| **CLI Parmak İzi**                     | Yerel CLI imzalarıyla eşleşmesi için sağlayıcı başına başlık/gövde sıralaması  |

### 🔌 Dayanıklılık ve Erişilebilirlik

| Özellik                            | Açıklama                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------- |
| **Devre Kesici (Circuit Breaker)** | Sağlayıcı başına 3 durumlu (Kapalı → Açık → Yarı Açık), SQLite ile kalıcı |
| **İstek Tekilleştirme**            | Yinelenen istekler için 5 saniyelik tekilleştirme penceresi               |
| **Üstel Geri Çekilme**             | Artan gecikmelerle otomatik yeniden deneme                                |
| **Sağlık Panosu**                  | Gerçek zamanlı sağlayıcı sağlığı izleme                                   |

### 📋 Uyumluluk (Compliance)

| Özellik                    | Açıklama                                                                |
| -------------------------- | ----------------------------------------------------------------------- |
| **Günlük Saklama**         | `CALL_LOG_RETENTION_DAYS` sonrasında otomatik temizleme                 |
| **Günlük Tutmama Tercihi** | API anahtarı başına `noLog` bayrağı istek kaydını devre dışı bırakır    |
| **Denetim Günlüğü**        | `audit_log` tablosunda izlenen yönetim eylemleri                        |
| **MCP Denetimi**           | Tüm MCP araç çağrıları için SQLite tabanlı denetim kaydı                |
| **Zod Doğrulaması**        | Modül yükleme sırasında Zod v4 şemalarıyla doğrulanan tüm API girdileri |

---

## Gerekli Ortam Değişkenleri

Sunucuyu başlatmadan önce tüm gizli anahtarlar ayarlanmalıdır. Eksik veya zayıf olmaları durumunda sunucu **hızlı bir şekilde hata vererek (fail fast)** durur.

```bash
# GEREKLİ — sunucu bunlar olmadan başlamaz:
JWT_SECRET=$(openssl rand -base64 48)     # min 32 karakter
API_KEY_SECRET=$(openssl rand -hex 32)    # min 16 karakter

# ÖNERİLEN — dinlenmede şifrelemeyi etkinleştirir:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Sunucu `changeme`, `secret` veya `password` gibi bilinen zayıf değerleri açıkça reddeder.

---

## Docker Güvenliği

- Üretimde root olmayan bir kullanıcı kullanın
- Gizli anahtarları salt okunur birimler (read-only volumes) olarak bağlayın
- `.env` dosyalarını asla Docker imajlarına kopyalamayın
- Hassas dosyaları hariç tutmak için `.dockerignore` kullanın
- HTTPS arkasındayken `AUTH_COOKIE_SECURE=true` ayarlayın

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Bağımlılıklar

- Düzenli olarak `npm audit` çalıştırın (`npm run audit:deps` ana projeyi + electron'u kapsar)
- Bağımlılıkları güncel tutun
- Proje, commit öncesi kontroller için `husky` + `lint-staged` kullanır (lint-staged + check-docs-sync + check:any-budget:t11)
- CI hattı her push işleminde ESLint güvenlik kurallarını çalıştırır (`no-eval`, `no-implied-eval`, `no-new-func` = hata)
- Sağlayıcı sabitleri modül yükleme sırasında Zod aracılığıyla doğrulanır (`src/shared/validation/schemas.ts`)
- Varsayılan olarak güvenli kütüphaneler kullanılır: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (parametreli sorgularla sıfır SQLi riski), `bcryptjs` (şifre karma)

## Katı Güvenlik Kuralları (Hard Security Rules)

Bu kurallar araçlar ve inceleyiciler tarafından zorunlu kılınmıştır:

1. **Sırları asla commit etmeyin** — `.env` gitignore edilmiştir; `.env.example` şablondur (sabit değerler yok, yalnızca yorumlar — bkz. PUBLIC_CREDS.md)
2. **Asla `eval()`, `new Function()` veya dolaylı eval kullanmayın** — ESLint tarafından zorunlu kılınır
3. **Husky kancalarını asla atlamayın** (`--no-verify`, `--no-gpg-sign`), açık operatör onayı olmadan
4. **Rotalarda asla ham SQL yazmayın** — her zaman `src/lib/db/` üzerinden geçin (parametrelendirilmiş)
5. **Girdileri her zaman Zod ile doğrulayın** — `src/shared/validation/schemas.ts`
6. **Yukarı akış başlıklarını her zaman temizleyin** — `src/shared/constants/upstreamHeaders.ts` içindeki engelleme listesi
7. **Kimlik bilgilerini dinlenmede şifreleyin** — `src/lib/db/encryption.ts` aracılığıyla AES-256-GCM
8. **Genel yukarı akış OAuth kimlikleri `resolvePublicCred()` aracılığıyla kullanılmalıdır** — kaynak koda asla `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` sabit değerlerini gömmeyin. Bkz. [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` üzerinden geçmelidir** — HTTP / SSE / executor / MCP yanıt gövdelerine asla ham `err.stack` / `err.message` koymayın. Bkz. [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **`exec()` / `spawn()` çalışma zamanı değerleri `env` seçeneği üzerinden iletilmelidir** — kabuk komutlarına harici yolları veya güvenilmeyen değerleri asla dize birleştirme ile eklemeyin. Referans: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Varsayılan olarak güvenli kütüphaneleri tercih edin** — bkz. [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Kendi çözümünüzü yazmadan önce bunlara başvurun.

## Tedarik Zinciri Tarayıcı Bulguları (Socket.dev / Snyk / Benzeri)

Yayımlanan `omniroute` npm paketi, Next.js `output: "standalone"` derlemesini paketler; bu da belgelenmiş ayrıcalıklı özellikler (MITM, Zed içe aktarma, Cloud Sync, gömülü servis süpervizörü) dahil her rota işleyicisinin `.next/server/*.js` küçültülmüş yığınlarında yer alması anlamına gelir. Sezgisel tedarik zinciri tarayıcıları bu yığınları sıklıkla kötü amaçlı yazılım imzalarıyla eşleştirebilir.

Her bulgu kategorisi için proje yöneticisi onay beyanı tutulmaktadır:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  bulgu başına harita: kaynak dosya ↔ işaretlenen yığın ↔ davranış ↔ v3.8.6'da uygulanan hafifletme.
- İşaretlenen her fonksiyondaki kaynak içi `SECURITY-AUDITOR-NOTE:` blokları aynı belgeye işaret eder.

Geliştirme hattında uyarıları esnetemeyen kullanıcılar için: `OMNIROUTE_BUILD_PROFILE=minimal npm run build` ile derleme yapın. Bu, dört hassas modülü çalışma zamanında HTTP 503 `feature-disabled` döndüren taslaklarla değiştirir; böylece ayrıcalıklı kod yolları pakette fiziksel olarak bulunmaz. Yayımlama tarifi için bkz. [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md).

## Referanslar

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — yetkilendirme hattı
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — güvenlik önlemleri çerçevesi
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — denetim günlüğü ve saklama
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — genel yukarı akış kimlik bilgileri için **zorunlu** model
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — hata yanıtları için **zorunlu** model
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — tedarik zinciri tarayıcı bulguları için onay beyanı
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — devre kesici + soğuma süresi + model kilitleme
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS parmak izi (yasal/etik bildirim)
- [`CLAUDE.md`](CLAUDE.md) — yapay zeka ajanları için katı kurallar
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — derlenmiş varsayılan olarak güvenli kütüphaneler
