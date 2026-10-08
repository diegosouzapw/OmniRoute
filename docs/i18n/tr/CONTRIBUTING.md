# Contributing to OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Katkıda bulunmaya gösterdiğiniz ilgi için teşekkür ederiz! Bu kılavuz, başlamak için ihtiyacınız olan her şeyi kapsar.

Her değişiklik için izlenecek resmi iş akışı konusunda
[Katkı Altın Yolu](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) ile başlayın. Bu belge; sağlayıcı, yönlendirme,
UI/UX, i18n, CLI, veritabanı ve derleme/dağıtım değişikliklerini bunların sözleşmeleri, odaklı testleri, CI
kapsamı ve uzlaştırma adımlarıyla eşleştirir.

---

## Geliştirme Kurulumu

### Ön Koşullar

- **Node.js** `>=22.22.3 <23` veya `>=24.0.0 <27` (önerilen: 24 LTS)
- **npm** 10+

> **npm v11+ kullanıcıları (Node 24+):** `npm install` sonrasında yerel modüllerin kurulduğunu doğrulayın:
> `node -e "require('better-sqlite3')"`. Komut `MODULE_NOT_FOUND` hatasıyla başarısız olursa
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
# Şablondan .env dosyanızı oluşturun
cp .env.example .env

# Gerekli gizli değerleri oluşturun
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Geliştirme için temel değişkenler:

| Değişken               | Geliştirme Varsayılanı   | Açıklama                  |
| ---------------------- | ------------------------ | ------------------------- |
| `PORT`                 | `20128`                  | Sunucu portu              |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Ön yüz için temel URL     |
| `JWT_SECRET`           | (yukarıda oluşturun)     | JWT imzalama gizli değeri |
| `INITIAL_PASSWORD`     | `CHANGEME`               | İlk oturum açma parolası  |
| `APP_LOG_LEVEL`        | `info`                   | Günlük ayrıntı düzeyi     |

### Pano Ayarları

Pano, ortam değişkenleri aracılığıyla da yapılandırılabilen özellikler için UI anahtarları sunar:

| Ayar Konumu        | Anahtar                  | Açıklama                                          |
| ------------------ | ------------------------ | ------------------------------------------------- |
| Ayarlar → Gelişmiş | Hata Ayıklama Modu       | Hata ayıklama istek günlüklerini etkinleştir (UI) |
| Ayarlar → Genel    | Kenar Çubuğu Görünürlüğü | Kenar çubuğu bölümlerini göster/gizle             |

Bu ayarlar veritabanında saklanır, yeniden başlatmalar arasında korunur ve ayarlandıklarında ortam değişkeni varsayılanlarını geçersiz kılar.

### Yerel Olarak Çalıştırma

```bash
# Geliştirme modu (anında yeniden yükleme)
npm run dev

# Üretim derlemesi
npm run build    # next build → .build/next/, ardından assembleStandalone → dist/
npm run start

# Katkıda bulunanların değişiklikleri için hızlı, yalnızca arka uç/API derlemesi
npm run build:contributor

# Sürüm derlemesi (temiz yeniden derleme + HEAD kontrol işareti — dağıtım için gereklidir)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA dosyasını yazar

# Yaygın port yapılandırması
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Katkıda bulunanlara yönelik derleme yalnızca derleme doğrulaması gerçekleştirir: bağımsız
dağıtımı oluşturmaz veya isteğe bağlı yerel paketleme varlıklarını derlemez. Dağıtılabilir paketi
doğrulamanız gerektiğinde normal üretim derlemesini kullanın.

### Derleme Çıktısı Düzeni

| Dizin     | İçerik                                                                                         | İzleniyor mu? |
| --------- | ---------------------------------------------------------------------------------------------- | ------------- |
| `src/`    | Uygulama kaynak kodu (TypeScript / TSX)                                                        | Evet          |
| `.build/` | Ara çıktılar — `next build` çıktısı (git tarafından yok sayılır, `distDir = .build/next`)      | Hayır         |
| `dist/`   | Dağıtılabilir paket — `assembleStandalone` tarafından oluşturulur (git tarafından yok sayılır) | Hayır         |

Derleme işlem hattı tek geçişten oluşur:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js çıktısı)
  └─ assembleStandalone()                 (bağımsız çıktıyı + statik dosyaları + public içeriğini + yerel varlıkları kopyalar)
       └─ çıktı: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` ayrıca önce her iki dizini de temizler ve dağıtım bütünlüğü kontrol işareti olarak
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) dosyasını yazar.

`npm run build:contributor`, yalnızca arka uca yönelik derleme profilini kullanır. Derleme sırasında
pano UI dosyalarını geçici olarak yer tutucularla değiştirir, API rota işleyicilerini korur ve derlemeden
sonra özgün dosyaları geri yükler. Pano UI'sini etkileyen değişikliklerde veya tam sürüm
doğrulaması için `npm run build` kullanın; katkıda bulunan profili, sürüm derlemesinin yerini tutmaz.

> **VPS dağıtım notu:** uzak görüntü dizini `/usr/lib/node_modules/omniroute/app/`
> değişmemiştir. Dağıtım becerileri, `dist/` içeriğini rsync ile bu dizine aktarır.
> Yalnızca depo içindeki derleme çıktı yolu değişmiştir (`app/` → `dist/`).

Varsayılan URL'ler:

- **Pano**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git İş Akışı

> ⚠️ **Doğrudan `main` dalına ASLA commit yapmayın.** Her zaman özellik dallarını kullanın.
>
> **PR tabanı:** aktif `release/vX.Y.Z` dalını hedefleyin (`main` değil). Dal başına sürüm +
> yayımlama sırasında etiket modeline ilişkin bilgi için
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) belgesine bakın.

```bash
# Aktif sürümün en son noktasından dal oluşturun (örnek: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... değişiklikleri yapın ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 olacak şekilde bir Pull Request açın
```

### Dal Adlandırma

| Önek        | Amaç                           |
| ----------- | ------------------------------ |
| `feat/`     | Yeni özellikler                |
| `fix/`      | Hata düzeltmeleri              |
| `refactor/` | Kodun yeniden yapılandırılması |
| `docs/`     | Dokümantasyon değişiklikleri   |
| `test/`     | Test eklemeleri/düzeltmeleri   |
| `chore/`    | Araçlar, CI, bağımlılıklar     |

### Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) standardını izleyin:

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
# Tüm testler (birim + vitest + ekosistem + e2e)
npm run test:all

# Tek test dosyası (Node.js yerel test çalıştırıcısı — testlerin çoğu bunu kullanır)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Yalnızca değişikliğinizden etkilenen birim testleri (CI geçidiyle aynı TIA seçicisi, #8084)
npm run test:scoped            # son commit'teki (veya çalışma ağacındaki) değişiklikler
npm run test:scoped:staged     # yalnızca hazırlama alanındaki değişiklikler — commit öncesi çalıştırmayla iyi eşleşir
npm run test:scoped:full       # önce içe aktarma grafiği eşlemesini yeniden oluşturur (dosya ekledikten/taşıdıktan sonra)
# Çıkış 1 + "run the full suite", bir merkez dosyanın (tsconfig, package.json, …) veya
# eşlenmemiş bir kaynağın değiştiği anlamına gelir — seçici güvenli biçimde başarısız olur, hiçbir zaman sessizce atlamaz.

# Vitest (MCP sunucusu, autoCombo, önbellek)
npm run test:vitest

# E2E testleri (Playwright gerektirir)
npm run test:e2e

# Protokol istemcileri E2E (MCP aktarımları, A2A)
npm run test:protocols:e2e

# Ekosistem uyumluluk testleri
npm run test:ecosystem

# Kapsam geçidi: ifadeler/satırlar/fonksiyonlar/dallar için %60
npm run test:coverage
npm run coverage:report

# Lint + biçim denetimi
npm run lint
npm run check

# Geçitli gerçek üst sağlayıcı kombinasyon smoke testi (VPS erişimi + gerçek sağlayıcı kredileri gerektirir)
# GERÇEK sağlayıcılara istek gönderir — düşük miktarda maliyet oluşturur. CI'da ASLA çalışmaz. Geçit olmadan sorunsuzca atlanır.
# Gereken: ssh root@192.168.0.15 erişimi (VPS'ten salt okunur bir DB anlık görüntüsü alır).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Aşama-3 VPS canlı smoke testi — düz Node ESM betikleri, doğrudan canlı .15 sunucusuna istek gönderir.
# Gereken: ssh root@192.168.0.15 erişimi (kombinasyonlar SSH sqlite aracılığıyla oluşturulur/kaldırılır).
# GERÇEK sağlayıcılara istek gönderir (düşük maliyet). Yalnızca __live_test__* kombinasyonlarını oluşturur/siler. CI'da ASLA çalışmaz.
# .15 üzerinde REQUIRE_API_KEY=false olduğundan API anahtarı gerekmez, ancak ayarlanmışsa COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY değerlerini kullanır.
npm run test:combo:live:vps              # 7 HTTP senaryosu (öncelik/round-robin/ağırlıklı/maliyet/birleştirme/otomatik + sağlık)
npm run test:combo:live:vps:failover     # gerçek bir sağlayıcılar arası yük devretme senaryosu ekler (toplam 8)
```

Kapsam notları:

- `npm run test:coverage`, ana birim testi paketi için kaynak kapsamını ölçer, `tests/**` öğesini hariç tutar ve `open-sse/**` öğesini dahil eder
- Pull request'ler; ifadeler/satırlar/fonksiyonlar/dallar için kapsam geçidini **%60+** seviyesinde tutmalıdır
- Bir PR, `src/`, `open-sse/` veya `bin/` içindeki üretim kodunu değiştiriyorsa aynı PR'da otomatik testler eklemeli veya mevcut testleri güncellemelidir
- `npm run coverage:report`, en son kapsam çalıştırmasından dosya bazında ayrıntılı raporu yazdırır
- `npm run test:coverage:legacy`, geçmiş karşılaştırmalar için eski metriği korur
- Aşamalı kapsam iyileştirme yol haritası için `docs/ops/COVERAGE_PLAN.md` belgesine bakın

### Pull Request Gereksinimleri

Bir PR açmadan önce, değiştirdiğiniz öğelere yönelik odaklı döngüyü çalıştırmak için
[Katkı İçin Altın Yol](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) belgesini kullanın. Tam birim testi paketi
(4 CI parçası), Vitest, **%60+** kapsam geçidi ve üretim derlemesi CI'ın sorumluluğundadır —
bunları yerel olarak çalıştırmak, PR kontrollerinin zaten sağlayacağı bilgilere katkıda bulunmaz ve
daha düşük kapasiteli makinelerde sistemi tamamen meşgul edebilir (#8084):

- Değişikliğinizi kapsayan test dosyalarını çalıştırın: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` komutunu çalıştırın
- Üretim kodu değiştiğinde aynı PR'a otomatik testler ekleyin veya mevcut testleri güncelleyin
- Üretim kodu değiştiğinde değiştirilen veya eklenen test dosyalarını PR açıklamasına dahil edin
- Proje gizli değerleri CI'da yapılandırılmışsa PR üzerindeki SonarQube sonucunu kontrol edin

Mevcut test durumu: Aşağıdakileri kapsayan **122 birim testi dosyası**:

- Sağlayıcı çeviricileri ve biçim dönüştürme
- Hız sınırlama, devre kesici ve dayanıklılık
- Semantik önbellek, idempotency ve ilerleme takibi
- Veritabanı işlemleri ve şema (21 DB modülü)
- OAuth akışları ve kimlik doğrulama
- API uç noktası doğrulaması (Zod v4)
- MCP sunucusu araçları ve kapsam zorlaması
- Memory ve Skills sistemleri

---

## Kod Stili

- **ESLint** — Commit etmeden önce `npm run lint` komutunu çalıştırın
- **Prettier** — Commit sırasında `lint-staged` aracılığıyla otomatik olarak biçimlendirilir (2 boşluk, noktalı virgüller, çift tırnaklar, 100 karakter genişliği, es5 son virgülleri)
- **TypeScript** — Tüm `src/` kodları `.ts`/`.tsx` kullanır; `open-sse/` ise `.ts`/`.js` kullanır; TSDoc (`@param`, `@returns`, `@throws`) ile belgelendirin
- **`eval()` kullanmayın** — ESLint, `no-eval`, `no-implied-eval`, `no-new-func` kurallarını uygular
- **Zod doğrulaması** — Tüm API girdi doğrulamaları için Zod v4 şemalarını kullanın
- **Adlandırma**: Dosyalar = camelCase/kebab-case, bileşenler = PascalCase, sabitler = UPPER_SNAKE

### Hata işleme / boş catch blokları

Bir `catch` bloğunu asla açıklamasız bırakmayın. Bunu iki kategoriden birine ayırın ("SSE akışlarındaki hataları asla sessizce yutmayın" katı kuralını uygulanabilir hâle getirir):

- **Kasıtlı (bize ait olan ve başarısı garanti edilmeyen temizleme/telemetri)** — buradaki bir hata beklenir ve zararsızdır; tek satırlık bir gerekçe yorumu ekleyin, günlük kaydı tutmayın (bu yaklaşımın amacı, her istekte günlük kaydı tutulmasından kaynaklanan gürültüyü önlemektir).

  ```ts
  } catch {} // istemcinin bağlantısı kesildikten sonra zaten kapalı bir controller'ı kapatmak beklenen bir durumdur
  ```

- **Günlüğe kaydedilmeli (harici/çağıran tarafından sağlanan kod veya hatanın yutulması kontrol akışını değiştiriyorsa)** — `catch` bloğunu koruyun (akışı bozmasına asla izin vermeyin), ancak hatanın bulunabilmesi için bağlamsal bir `console.debug`/`warn` mesajı yayınlayın.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Uygulanmış örnekler için `open-sse/utils/stream.ts` ve `open-sse/utils/streamHandler.ts` dosyalarına bakın.

---

## Proje Yapısı

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Pano sayfaları (23 bölüm)
│   ├── api/                # API rotaları (51 dizin)
│   └── login/              # Kimlik doğrulama sayfaları (.tsx)
├── domain/                 # İlke motoru (policyEngine, comboResolver, costRules vb.)
├── lib/                    # Temel iş mantığı (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokol sunucusu
│   ├── acp/                # Agent Communication Protocol kayıt defteri
│   ├── compliance/         # Uyumluluk ilke motoru
│   ├── db/                 # SQLite alan modülleri + 130 migrasyon
│   ├── memory/             # Kalıcı konuşma belleği
│   ├── oauth/              # OAuth sağlayıcıları, hizmetleri ve yardımcı araçları
│   ├── skills/             # Genişletilebilir beceri çerçevesi
│   ├── usage/              # Kullanım takibi ve maliyet hesaplama
│   └── localDb.ts          # Yalnızca yeniden dışa aktarma katmanı — buraya asla mantık eklemeyin
├── middleware/              # İstek ara yazılımı (promptInjectionGuard)
├── mitm/                   # MITM proxy'si (sertifika, DNS, hedef yönlendirme)
├── shared/
│   ├── components/         # React bileşenleri (.tsx)
│   ├── constants/          # Sağlayıcı tanımları (329), MCP kapsamları, 19 yönlendirme stratejisi
│   ├── utils/              # Devre kesici, temizleyici, kimlik doğrulama yardımcıları
│   └── validation/         # Zod v4 şemaları
└── sse/                    # SSE proxy işlem hattı

open-sse/                   # @omniroute/open-sse çalışma alanı
├── executors/              # 89 yürütücü uygulama modülü
├── handlers/               # 11 istek işleyicisi (sohbet, yanıtlar, gömmeler, görseller vb.)
├── mcp-server/             # MCP sunucusu (110 benzersiz araç, 3 taşıma yöntemi, 33 kapsam)
├── services/               # 178 üst düzey hizmet (combo, autoCombo, rateLimitManager vb.)
├── translator/             # Biçim dönüştürücüleri (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API dönüştürücüsü
└── utils/                  # 22 yardımcı modül (akış, TLS, proxy, günlük kaydı)


tests/
├── unit/                   # Node.js test çalıştırıcısı (1.574 test dosyası)
├── integration/            # Entegrasyon testleri
├── e2e/                    # Playwright testleri
├── security/               # Güvenlik testleri
├── translator/             # Dönüştürücüye özgü testler
└── load/                   # Yük testleri

docs/
├── adr/                     # Mimari Karar Kayıtları
├── architecture/            # Sistem mimarisi ve dayanıklılık
├── comparison/              # OmniRoute ve alternatiflerinin karşılaştırması
├── compression/             # Sıkıştırma kılavuzları ve kuralları
├── dev/                     # Geliştirme kılavuzları
├── diagrams/                # Mimari diyagramları
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Kullanıcı kılavuzu, Docker, kurulum, sorun giderme
├── i18n/                    # Uluslararasılaştırılmış README çevirileri
├── marketing/               # Pazarlama materyalleri
├── ops/                     # Dağıtım, proxy, kapsam, sürümler
├── providers/               # Sağlayıcıya özgü belgeler
├── reference/               # API referansı, ortam değişkenleri, CLI araçları, ücretsiz katmanlar
├── releases/                # Sürüm notları
├── routing/                 # Otomatik kombinasyon motoru, akıl yürütme yeniden oynatma
├── screenshots/             # Pano ekran görüntüleri
├── security/                # Koruyucu önlemler, uyumluluk, gizlilik, tokenlar
└── specs/                   # Tasarım özellikleri
```

---

## Yeni Bir Sağlayıcı Ekleme

### Adım 1: Sağlayıcı Sabitlerini Kaydedin

`src/shared/constants/providers.ts` dosyasına ekleyin — modül yüklenirken Zod ile doğrulanır.

### Adım 2: Yürütücü Ekleyin (özel mantık gerekiyorsa)

Temel yürütücüyü genişleten bir yürütücüyü `open-sse/executors/your-provider.ts` içinde oluşturun.

### Adım 3: Dönüştürücü Ekleyin (OpenAI dışı bir biçim kullanılıyorsa)

İstek/yanıt dönüştürücülerini `open-sse/translator/` içinde oluşturun.

### Adım 4: OAuth Yapılandırması Ekleyin (OAuth tabanlıysa)

OAuth kimlik bilgilerini `src/lib/oauth/constants/oauth.ts` dosyasına, servisi ise `src/lib/oauth/services/` dizinine ekleyin.

Üst sağlayıcı, herkese açık CLI / tarayıcı paketi içinde herkese açık bir OAuth client_id/secret veya Firebase Web API anahtarı dağıtıyorsa bunu **kesinlikle** bir dize sabiti olarak gömmeyin. `open-sse/utils/publicCreds.ts` içindeki `resolvePublicCred()` işlevini kullanın ve `EMBEDDED_DEFAULTS` içine maskelenmiş bir bayt girdisi ekleyin. Zorunlu iş akışının tamamı [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) belgesinde açıklanmıştır.

İşleyiciler/yürütücüler içinde istemciye ulaşan hata mesajları, `open-sse/utils/error.ts` içindeki `buildErrorBody()` / `sanitizeErrorMessage()` üzerinden geçmelidir — ham `err.stack` veya `err.message` değerlerini asla bir Response gövdesine koymayın. Bkz. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Adım 5: Modelleri Kaydedin

Model tanımlarını `open-sse/config/providerRegistry.ts` dosyasına ekleyin.

### Adım 6: Testleri Ekleyin

`tests/unit/` içinde en azından aşağıdakileri kapsayan birim testleri yazın:

- Sağlayıcı kaydı
- İstek/yanıt dönüştürme
- Hata işleme

---

## Pull Request Kontrol Listesi

- [ ] Testler geçiyor (`npm test`)
- [ ] Lint denetimi geçiyor (`npm run lint`)
- [ ] Derleme başarıyla tamamlanıyor (`npm run build`)
- [ ] Yeni genel kullanıma açık fonksiyonlar ve arayüzler için TypeScript türleri eklendi
- [ ] Sabit kodlanmış gizli bilgiler veya geri dönüş değerleri yok
- [ ] Genel kullanıma açık üst kaynak kimlik bilgileri değişmez değer olarak değil, `resolvePublicCred()` aracılığıyla gömüldü (bkz. [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md))
- [ ] Hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` üzerinden yönlendiriliyor — yanıt gövdelerinde işlenmemiş yığın izleri yok (bkz. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Kabuk komutları (`exec` / `spawn`), çalışma zamanı değerlerini dize interpolasyonu yoluyla değil `env` aracılığıyla iletiyor
- [ ] Tüm girdiler Zod şemalarıyla doğrulandı
- [ ] Kullanıcıya yönelik değişiklikler için `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` altında değişiklik günlüğü **parçası** eklendi (bkz. [`changelog.d/README.md`](./changelog.d/README.md)) — `CHANGELOG.md` dosyasını doğrudan düzenlemeyin; parçalar sürüm yayımlanırken birleştirilir ve PR'lar arasında hiçbir zaman çakışmaz
- [ ] Dokümantasyon güncellendi (uygunsa)
- [ ] Yeni CodeQL / Secret-Scanning uyarısı açılmadı veya her biri ilgili `docs/security/` belgesine atıfta bulunan teknik bir gerekçeyle reddedildi
- [ ] Alt süreç başlatan rotalar (`/api/mcp/`, `/api/cli-tools/runtime/`), `src/server/authz/routeGuard.ts` içindeki `isLocalOnlyPath()` kapsamında sınıflandırıldı — bkz. [Kesin Kural #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Commit mesajlarında AI/bot `Co-authored-by` son bilgileri yok (Kesin Kural #16) — çalışmalarından yararlanılan insan iş ortaklarına standart `Co-authored-by: Name <email>` son bilgileriyle atıfta bulunuldu

---

## Sürüm Yayınlama

Sürümler `/generate-release` iş akışı aracılığıyla yönetilir. Yeni bir GitHub Sürümü oluşturulduğunda paket, GitHub Actions aracılığıyla **otomatik olarak npm'de yayımlanır**.

VPS dağıtımları için `npm run build` yerine `npm run build:release` kullanın — bu komut temiz bir
yeniden derleme gerçekleştirir, paketi `dist/` içinde oluşturur ve `dist/BUILD_SHA` gözcü dosyasını yazar.
Ardından `dist/` dizinini uzak `app/` dizinine rsync ile aktaran `/deploy-vps-*-cc` becerilerini kullanın.

---

## Yardım Alma

- **Mimari**: Bkz. [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API Referansı**: Bkz. [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Güvenlik belgeleri**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Operasyon belgeleri**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Sorunlar**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
