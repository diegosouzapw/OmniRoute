# OmniRoute'a Katkıda Bulunma (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Katkıda bulunmak istediğiniz için teşekkür ederiz! Bu kılavuz başlamak için ihtiyacınız olan her şeyi kapsar.

Değişiklik başına resmi iş akışı için [Katkı Altın Yolu (Contribution Golden Path)](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) belgesiyle başlayın. Sağlayıcı, yönlendirme, UI/UX, i18n, CLI, veritabanı ve derleme/dağıtım değişikliklerini ilgili sözleşmelere, odaklanmış testlere, CI kapsamına ve mutabakat adımlarına eşler.

---

## Geliştirme Ortamı Kurulumu

### Ön Koşullar

- **Node.js** `>=22.22.3 <23` veya `>=24.0.0 <27` (önerilen: 24 LTS)
- **npm** 10+

> **npm v11+ kullanıcıları (Node 24+):** `npm install` sonrasında yerel modüllerin kurulduğunu doğrulayın:
> `node -e "require('better-sqlite3')"`. Eğer `MODULE_NOT_FOUND` hatası alırsanız,
> `npm approve-scripts better-sqlite3 && npm install` komutunu çalıştırın. Bkz.
> [Sorun Giderme](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonlama ve Kurulum

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Ortam Değişkenleri

```bash
# Şablondan kendi .env dosyanızı oluşturun
cp .env.example .env

# Gerekli gizli anahtarları oluşturun
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Geliştirme için temel değişkenler:

| Değişken               | Geliştirme Varsayılanı   | Açıklama              |
| ---------------------- | ------------------------ | --------------------- |
| `PORT`                 | `20128`                  | Sunucu portu          |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Ön uç için temel URL  |
| `JWT_SECRET`           | (yukarıda oluşturulur)   | JWT imzalama sırrı    |
| `INITIAL_PASSWORD`     | `CHANGEME`               | İlk giriş parolası    |
| `APP_LOG_LEVEL`        | `info`                   | Günlük ayrıntı düzeyi |

### Pano Ayarları

Pano, ortam değişkenleri aracılığıyla da yapılandırılabilen özellikler için arayüz anahtarları sunar:

| Ayar Konumu        | Anahtar                  | Açıklama                              |
| ------------------ | ------------------------ | ------------------------------------- |
| Ayarlar → Gelişmiş | Hata Ayıklama Modu       | İstek günlüklerini etkinleştirir (UI) |
| Ayarlar → Genel    | Kenar Çubuğu Görünürlüğü | Kenar çubuğu bölümlerini göster/gizle |

Bu ayarlar veritabanında saklanır ve yeniden başlatmalar arasında kalıcıdır; ayarlandıklarında ortam değişkeni varsayılanlarını geçersiz kılarlar.

### Yerel Olarak Çalıştırma

```bash
# Geliştirme modu (hot reload)
npm run dev

# Üretim derlemesi
npm run build    # next build → .build/next/ ardından assembleStandalone → dist/
npm run start

# Sürüm derlemesi (temiz yeniden derleme + HEAD nöbetçisi — dağıtım için gereklidir)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA yazar

# Yaygın port yapılandırması
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

### Derleme Çıktısı Düzeni

| Dizin     | İçerik                                                                      | Takip Ediliyor mu? |
| --------- | --------------------------------------------------------------------------- | ------------------ |
| `src/`    | Uygulama kaynak kodu (TypeScript / TSX)                                     | Evet               |
| `.build/` | Ara dosyalar — `next build` çıktısı (gitignored, `distDir = .build/next`)   | Hayır              |
| `dist/`   | Dağıtılabilir paket — `assembleStandalone` tarafından toplanır (gitignored) | Hayır              |

Derleme hattı tek geçişlidir:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js çıktısı)
  └─ assembleStandalone()                 (standalone + static + public + yerel varlıkları kopyalar)
       └─ çıktı: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` ek olarak önce her iki dizini de temizler ve dağıtım bütünlüğü nöbetçisi olarak
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) yazar.

> **VPS dağıtım notu:** uzak imaj dizini `/usr/lib/node_modules/omniroute/app/`
> değişmemiştir. Dağıtım yetenekleri `dist/` içeriğini rsync ile buraya aktarır.
> Yalnızca repo içi derleme çıktı yolu taşınmıştır (`app/` → `dist/`).

Varsayılan URL'ler:

- **Pano**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git İş Akışı

> ⚠️ **KESİNLİKLE doğrudan `main` dalına commit atmayın.** Her zaman özellik dalları (feature branch) kullanın.
>
> **PR hedefi:** aktif `release/vX.Y.Z` dalını hedefleyin (`main` değil). Dal başına sürüm + yayımlama anında etiket modeli için
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) belgesine bakın.

```bash
# Aktif sürüm ucundan dal oluşturun (örnek: release/v3.8.49)
git fetch origin
git checkout -b feat/ozellik-adiniz origin/release/v3.8.49
# ... değişiklikleri yapın ...
git commit -m "feat: degisikliginizi aciklayin"
git push -u origin feat/ozellik-adiniz
# Hedef dal = release/v3.8.49 olacak şekilde Pull Request açın
```

### Dal Adlandırma

| Önek        | Amaç                         |
| ----------- | ---------------------------- |
| `feat/`     | Yeni özellikler              |
| `fix/`      | Hata düzeltmeleri            |
| `refactor/` | Kod yeniden yapılandırması   |
| `docs/`     | Dokümantasyon değişiklikleri |
| `test/`     | Test ekleme/düzeltme         |
| `chore/`    | Araçlar, CI, bağımlılıklar   |

### Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) standartlarını izleyin:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Kapsamlar (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testleri Çalıştırma

```bash
# Tüm testler (unit + vitest + ecosystem + e2e)
npm run test:all

# Tek bir test dosyası (Node.js yerel test çalıştırıcısı — çoğu test bunu kullanır)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP sunucusu, autoCombo, önbellek)
npm run test:vitest

# E2E testleri (Playwright gerektirir)
npm run test:e2e

# Protokol istemcileri E2E (MCP taşımaları, A2A)
npm run test:protocols:e2e

# Ekosistem uyumluluk testleri
npm run test:ecosystem

# Kapsam kapısı: %60 statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint + biçimlendirme kontrolü
npm run lint
npm run check

# Gerçek yukarı akış kombo testi (VPS erişimi + gerçek sağlayıcı kredisi gerektirir)
# GERÇEK sağlayıcılara istek atar — küçük bir maliyeti vardır. CI'da ASLA çalışmaz.
RUN_COMBO_LIVE=1 npm run test:combo:live

# Aşama-3 VPS canlı testi — doğrudan canlı .15 sunucusuna istek atar.
npm run test:combo:live:vps              # 7 HTTP senaryosu (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # gerçek sağlayıcılar arası geçiş senaryosu ekler (toplam 8)
```

Test kapsamı notları:

- `npm run test:coverage` ana birim test paketi için kaynak kapsamını ölçer, `tests/**` dizinini hariç tutar ve `open-sse/**` dizinini dahil eder
- Pull Request'ler kapsam kapısını **%60+** (statements/lines/functions/branches) seviyesinde tutmalıdır
- Bir PR `src/`, `open-sse/`, `electron/` veya `bin/` altındaki üretim kodunu değiştiriyorsa, aynı PR'da otomatik testler eklemeli veya güncellemelidir
- `npm run coverage:report` en son test çalıştırmasından detaylı dosya bazlı raporu yazdırır
- Kademeli kapsam iyileştirme yol haritası için `docs/ops/COVERAGE_PLAN.md` dosyasına bakın

### Pull Request Gereksinimleri

Bir PR açmadan önce, değiştirdiğiniz alan için odaklanmış döngüyü çalıştırmak üzere [Katkı Altın Yolu](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) belgesini kullanın:

- Değişikliğinizi kapsayan test dosyalarını çalıştırın: `node --import tsx/esm --test tests/unit/<dosya>.test.ts`
- `npm run lint` çalıştırın
- Üretim kodu değiştiğinde her zaman aynı PR'a otomatik testler ekleyin veya güncelleyin
- Üretim kodu değiştiğinde PR açıklamasına değiştirilen veya eklenen test dosyalarını ekleyin
- CI'da proje sırları yapılandırıldığında PR üzerindeki SonarQube sonucunu kontrol edin

Mevcut test durumu: **122 birim test dosyası** şunları kapsar:

- Sağlayıcı çevirmenleri ve format dönüştürme
- Hız sınırlaması, devre kesici ve dayanıklılık
- Anlamsal önbellek, tekilleştirme, ilerleme takibi
- Veritabanı işlemleri ve şeması (21 DB modülü)
- OAuth akışları ve kimlik doğrulama
- API uç noktası doğrulaması (Zod v4)
- MCP sunucu araçları ve kapsam denetimi
- Bellek ve Yetenek (Skills) sistemleri

---

## Kod Stili

- **ESLint** — Commit öncesinde `npm run lint` çalıştırın
- **Prettier** — Commit sırasında `lint-staged` aracılığıyla otomatik biçimlendirilir (2 boşluk, noktalı virgül, çift tırnak, 100 karakter genişlik, es5 son virgüller)
- **TypeScript** — Tüm `src/` kodu `.ts`/`.tsx` kullanır; `open-sse/` `.ts`/`.js` kullanır; TSDoc (`@param`, `@returns`, `@throws`) ile belgeleyin
- **`eval()` Yasaktır** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` kurallarını zorunlu kılar
- **Zod doğrulaması** — Tüm API girdi doğrulamaları için Zod v4 şemalarını kullanın
- **Adlandırma**: Dosyalar = camelCase/kebab-case, bileşenler = PascalCase, sabitler = UPPER_SNAKE

### Hata Yönetimi / Boş Catch Blokları

Bir `catch` bloğunu asla açıklamasız bırakmayın. İki kategoriden birine ayırın:

- **Kasıtlı (kendi en iyi çaba temizliğimiz/telemetrimiz)** — burada bir hata beklenir ve zararsızdır; tek satırlık bir gerekçe yorumu ekleyin, günlük kaydı yapmayın:

  ```ts
  } catch {} // istemci bağlantısı kesildikten sonra zaten kapalı bir denetleyiciyi kapatmak beklenen bir durumdur
  ```

- **Günlüğe kaydedilmeli (harici kod veya akışı değiştiren durumlar)** — catch'i koruyun ancak hatanın keşfedilebilmesi için bağlamsal bir `console.debug`/`warn` yayınlayın:

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Uygulamalı örnekler için `open-sse/utils/stream.ts` ve `open-sse/utils/streamHandler.ts` dosyalarına bakın.

---

## Proje Yapısı

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Pano sayfaları (23 bölüm)
│   ├── api/                # API rotaları (51 dizin)
│   └── login/              # Kimlik doğrulama sayfaları (.tsx)
├── domain/                 # Politika motoru (policyEngine, comboResolver, costRules, vb.)
├── lib/                    # Çekirdek iş mantığı (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokol sunucusu
│   ├── acp/                # Ajan İletişim Protokolü kayıt defteri
│   ├── compliance/         # Uyumluluk politika motoru
│   ├── db/                 # SQLite alan modülleri + 130 migrasyon
│   ├── memory/             # Kalıcı konuşma belleği
│   ├── oauth/              # OAuth sağlayıcıları, servisleri ve yardımcıları
│   ├── skills/             # Genişletilebilir yetenek çerçevesi
│   ├── usage/              # Kullanım takibi ve maliyet hesaplama
│   └── localDb.ts          # Yalnızca yeniden dışa aktarma katmanı — buraya asla mantık eklemeyin
├── middleware/              # İstek ara yazılımı (promptInjectionGuard)
├── mitm/                   # MITM proxy (sertifika, DNS, hedef yönlendirme)
├── shared/
│   ├── components/         # React bileşenleri (.tsx)
│   ├── constants/          # Sağlayıcı tanımları (329), MCP kapsamları, 19 yönlendirme stratejisi
│   ├── utils/              # Devre kesici, temizleyici, kimlik doğrulama yardımcıları
│   └── validation/         # Zod v4 şemaları
└── sse/                    # SSE proxy hattı

open-sse/                   # @omniroute/open-sse çalışma alanı
├── executors/              # 89 yürütücü uygulama modülü
├── handlers/               # 11 istek işleyici (chat, responses, embeddings, images, vb.)
├── mcp-server/             # MCP sunucusu (107 benzersiz araç, 3 taşıma, 32 kapsam)
├── services/               # 178 üst düzey servis (combo, autoCombo, rateLimitManager, vb.)
├── translator/             # Format çevirmenleri (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API dönüştürücüsü
└── utils/                  # 22 yardımcı modül (stream, TLS, proxy, logging)

electron/                   # Electron masaüstü uygulaması (platformlar arası)

tests/
├── unit/                   # Node.js test çalıştırıcısı (1.574 test dosyası)
├── integration/            # Entegrasyon testleri
├── e2e/                    # Playwright testleri
├── security/               # Güvenlik testleri
├── translator/             # Çevirmene özel testler
└── load/                   # Yük testleri

docs/
├── adr/                     # Mimari Karar Kayıtları (ADR)
├── architecture/            # Sistem mimarisi ve dayanıklılık
├── comparison/              # OmniRoute ve alternatifler
├── compression/             # Sıkıştırma kılavuzları ve kuralları
├── dev/                     # Geliştirme kılavuzları
├── diagrams/                # Mimari diyagramları
├── frameworks/              # MCP, A2A, OpenCode, Bellek, Yetenekler
├── guides/                  # Kullanıcı kılavuzu, Docker, kurulum, sorun giderme
├── i18n/                    # Çok dilli README çevirileri
├── marketing/               # Pazarlama materyalleri
├── ops/                     # Dağıtım, proxy, test kapsamı, sürümler
├── providers/               # Sağlayıcıya özel belgeler
├── reference/               # API referansı, ortam değişkenleri, CLI araçları, ücretsiz katmanlar
├── releases/                # Sürüm notları
├── routing/                 # Auto-combo motoru, akıl yürütme tekrarı
├── screenshots/             # Pano ekran görüntüleri
├── security/                # Güvenlik önlemleri, uyumluluk, gizlilik, belirteçler
└── specs/                   # Tasarım özellikleri
```

---

## Yeni Bir Sağlayıcı Ekleme

### Adım 1: Sağlayıcı Sabitlerini Kaydedin

`src/shared/constants/providers.ts` dosyasına ekleyin — modül yükleme sırasında Zod ile doğrulanır.

### Adım 2: Yürütücü (Executor) Ekleyin (özel mantık gerekiyorsa)

`open-sse/executors/your-provider.ts` içinde temel yürütücüyü genişleten bir yürütücü oluşturun.

### Adım 3: Çevirmen (Translator) Ekleyin (OpenAI dışı format ise)

`open-sse/translator/` altında istek/yanıt çevirmenleri oluşturun.

### Adım 4: OAuth Yapılandırması Ekleyin (OAuth tabanlıysa)

`src/lib/oauth/constants/oauth.ts` içine OAuth kimlik bilgilerini ve `src/lib/oauth/services/` içine servisini ekleyin.

Yukarı akış sağlayıcısı genel bir OAuth client_id/secret veya Firebase Web API anahtarı dağıtıyorsa, bunu kaynak koda **dize sabiti olarak gömmeyin**. `open-sse/utils/publicCreds.ts` dosyasındaki `resolvePublicCred()` fonksiyonunu kullanın ve `EMBEDDED_DEFAULTS` içine maskelenmiş bayt girişi ekleyin. Zorunlu iş akışı [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) içinde belgelenmiştir.

İşleyiciler/yürütücüler içinde istemciye ulaşan hata mesajları `open-sse/utils/error.ts` içindeki `buildErrorBody()` / `sanitizeErrorMessage()` üzerinden geçmelidir — Response gövdesine asla ham `err.stack` veya `err.message` koymayın. Bkz. [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).

### Adım 5: Modelleri Kaydedin

`open-sse/config/providerRegistry.ts` dosyasına model tanımlarını ekleyin.

### Adım 6: Testleri Ekleyin

`tests/unit/` altında en az şunları kapsayan birim testleri yazın:

- Sağlayıcı kaydı
- İstek/yanıt çevirisi
- Hata yönetimi

---

## Pull Request Kontrol Listesi

- [ ] Testler geçiyor (`npm test`)
- [ ] Linting geçiyor (`npm run lint`)
- [ ] Derleme başarılı (`npm run build`)
- [ ] Yeni genel fonksiyonlar ve arayüzler için TypeScript tipleri eklendi
- [ ] Sabit kodlanmış sırlar veya geri dönüş değerleri yok
- [ ] Genel yukarı akış kimlik bilgileri `resolvePublicCred()` ile eklendi ([`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)), asla sabit dize olarak değil
- [ ] Hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` üzerinden geçiyor — yanıt gövdelerinde ham yığın izi (stack trace) yok ([`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md))
- [ ] Kabuk komutları (`exec` / `spawn`) çalışma zamanı değerlerini dize birleştirme ile değil `env` ile iletiyor
- [ ] Tüm girdiler Zod şemaları ile doğrulanıyor
- [ ] Kullanıcıya yönelik değişiklikler için `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` altında değişiklik günlüğü parçacığı (fragment) eklendi ([`changelog.d/README.md`](changelog.d/README.md)) — doğrudan `CHANGELOG.md` dosyasını düzenlemeyin
- [ ] Dokümantasyon güncellendi (varsa)
- [ ] Yeni CodeQL / Secret-Scanning uyarısı açılmadı veya her biri ilgili `docs/security/` belgesine atıfta bulunarak teknik gerekçeyle kapatıldı
- [ ] Alt süreçler başlatan rotalar (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` içinde `isLocalOnlyPath()` olarak sınıflandırıldı
- [ ] Commit mesajlarında `Co-Authored-By` bulunmuyor — commit'ler yalnızca depo sahibinin Git kimliği altında görünmelidir

---

## Sürüm Yayımlama

Sürümler `/generate-release` iş akışı aracılığıyla yönetilir. Yeni bir GitHub Sürümü oluşturulduğunda, paket GitHub Actions aracılığıyla **otomatik olarak npm'de yayımlanır**.

VPS dağıtımları için `npm run build:release` kullanın — temiz bir yeniden derleme gerçekleştirir, paketi `dist/` içine toplar ve `dist/BUILD_SHA` nöbetçisini yazar. Ardından `dist/` dizinini uzak `app/` dizinine rsync eden `/deploy-vps-*-cc` yeteneklerini kullanın.

---

## Yardım Alma

- **Mimari**: Bkz. [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API Referansı**: Bkz. [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Güvenlik belgeleri**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Operasyon belgeleri**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Sorun Bildirimi (Issues)**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Mimari Karar Kayıtları (ADR)**: Mimari karar kayıtları için `docs/adr/` dizinine bakın
