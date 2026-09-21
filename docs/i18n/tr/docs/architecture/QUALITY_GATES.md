# Quality Gates Reference (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Bu belge, OmniRoute'taki tüm CI kalite kapıları için yetkili referanstır.
Her kapıyı, neyi doğruladığını, hangi CI işinde çalıştığını, bir ratchet temel çizgisi mi
yoksa geçti/kaldı politikası mı kullandığını ve derlemeyi engelleyip engellemediğini ya da yalnızca danışman niteliğinde olup olmadığını açıklar.

Kısa bir özet ve izin listesi politikası için `AGENTS.md` içindeki
"Quality Gates & Ratchets" bölümüne bakın. Aynı sistemin kritik değerlendirmesi, olgunluk
sınıflandırması ve araçtan bağımsız çoğaltma planı için
[Kalite Kapısı Uygulama Kılavuzu](../ops/QUALITY_GATE_PLAYBOOK.md) belgesine bakın.

---

## Geçit Envanteri (~90 betik)

Betikler `scripts/check/` (ilke geçitleri) ve `scripts/quality/` (mandal motoru) altında bulunur.
CI için doğruluğun kaynağı `.github/workflows/ci.yml` dosyasıdır.

### Sürüm PR'ı hızlı yolu (`quality.yml`)

`.github/workflows/quality.yml`, `release/**` hedefli PR'larda çalışır. Katkıda bulunanların
dallarındaki ilerlemeyi, yol filtreli hızlı geçitlerin yanı sıra kod değişiklikleri için bir
danışma niteliğinde üretim derlemesi sinyaliyle sürdürür:

| İş                                               | Kapsam                                                                                                                                                                                                                                     | Engelleyici                                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Taslak olmayan kod PR'ları ve Mergify kuyruk dalları; Node 24, `npm-ci-retry`, `check:node-runtime`, `OMNIROUTE_USE_TURBOPACK=1` ile `npm run build`; bunu kullanan sonraki bir kalite işi olmadığından yapıt yüklenmez                    | **Danışma niteliğinde** (`continue-on-error: true`; bir haftalık kararlı sürüm PR'ı çalışmasından sonra kaldırın) |
| `Docs Gates (fast-path)`                         | Dokümantasyon/kod PR'ları; API doküman referansları ve docs-all                                                                                                                                                                            | Evet                                                                                                              |
| `Fast Quality Gates`                             | Kod PR'ları; statik denetimler, tür denetimi, pano tür denetimi, etkilenen birim testleri                                                                                                                                                  | Evet                                                                                                              |
| `Forgotten sibling tests`                        | Kod PR'ları; statik tüketicilere ve aday kardeş testlere kadar izlenen değiştirilmiş modüller; barrel ve dinamik içe aktarma yolları, referans verilen izin listesi istisnalarıyla birlikte danışma niteliğinde tanılama olarak raporlanır | **Danışma niteliğinde**                                                                                           |
| `Vitest (fast-path)`                             | Kod PR'ları; hızlı vitest paketi                                                                                                                                                                                                           | Evet                                                                                                              |
| `Unit Tests fast-path`                           | Kod PR'ları; 4 parçalı birim testi paketi                                                                                                                                                                                                  | Evet                                                                                                              |
| `No new ESLint warnings`                         | Kod PR'ları; bastırmaları dikkate alan lint koruması                                                                                                                                                                                       | Kendi kaynağından gelenler için evet, çatallardan gelenler için danışma niteliğinde                               |
| `Merge integrity (changelog + generated skills)` | Taslak olmayan PR'lar; değişiklik günlüğü ve oluşturulan becerilerin eşitlenmesi                                                                                                                                                           | Kendi kaynağından gelenler için evet, çatallardan gelenler için danışma niteliğinde                               |

#### Unutulan kardeş testler raporu

`npm run check:forgotten-sibling-tests`, test etki haritasının arkasındaki içe aktarma çözümleyicisini
yeniden kullanır. Değiştirilen her üretim modülü için, aday test pull request farkında bulunmadığında
belirlenimci `değiştirilen modül/sembol -> statik tüketici -> aday kardeş test` zincirlerini raporlar.
Markdown özeti ve JSON sonucu, engelleyici bir kullanıma geçilmeden önce kalibrasyon amacıyla
`forgotten-sibling-tests` iş akışı yapıtı olarak saklanır.

Barrel yeniden dışa aktarımları ve dinamik içe aktarmalar yalnızca çözümleme tanılamalarıdır; hiçbir
zaman engelleyici bir bulgu oluşturmazlar. İncelenmiş istisnalar
`config/quality/forgotten-sibling-allowlist.json` içinde bulunur. Her girdi tüketiciyi ve aday testi
belirtmeli, özel bir gerekçe sunmalı ve bir GitHub sorununa veya pull request'e bağlantı vermelidir.
Hatalı biçimlendirilmiş girdiler güvenli biçimde başarısız olur. İstisnalar, silinmiş bir aday testi
veya `.skip`/`.todo` ekleyen bir farkı bastıramaz; assertion zayıflatma ve diğer maskeleme işlemleri,
bağımsız olarak engelleyici olan `check:test-masking` geçidinin sorumluluğunda kalır.

### İş: `lint`

`main` dalına gönderilen her PR'da çalışır. Başarısız olması durumunda birleştirmeyi engeller.

| Betik (`npm run ...`)             | Doğruladığı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Engelleyici                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:node-runtime`              | Node.js sürümünün desteklenen aralıkta olması                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                                 |
| `check:cycles`                    | Döngüsel içe aktarmalar — tüm `src/` + `open-sse/` modülleri                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Evet                                                 |
| `check:route-validation:t06`      | Tüm rotalarda Zod şemalarının bulunması (Kademe 6 politikası)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                                 |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayısının bütçeyi aşmaması (Kademe 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                                 |
| `check:provider-consistency`      | `providers.ts` içindeki her sağlayıcının `providerRegistry.ts` içinde eşleşen bir girdisi vardır (ve izin verilenler listesi kapsamında bunun tersi de geçerlidir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Evet                                                 |
| `check:model-lifecycle`           | Elle sürdürülen üç yönlendirme tablosu, depoya kaydedilmiş yaşam döngüsü anlık görüntüsüyle (#11503) tutarlı kalır: `FITNESS_TABLE` (`taskFitness.ts`), `REGISTRY` tarafından yönlendirilebilen kullanımdan kaldırılmış hiçbir kimliği puanlamaz; her `BUILT_IN_ALIASES` hedefi `REGISTRY` içinde bulunur ve kullanımdan kaldırılmış kimliklerin anlık görüntüsünde bulunmaz; hâlâ `REGISTRY` içinde bulunan, kullanımdan kaldırılmış her kimlik yönlendirilir veya `allowedRetiredInCatalog` içinde listelenir; ayrıca hiçbir `DEFAULT_DEGRADATION_MAP` kaynağı veya hedefi bu anlık görüntüde kullanımdan kaldırılmış olarak görünmez. Bu, bir modelin şu anda etkin bir üst sağlayıcı tarafından sunulduğunu kanıtlamaz. Çevrimdışı — `config/quality/model-lifecycle.json` ile karşılaştırır; bu dosya `npm run quality:refresh-model-lifecycle` ile elle yenilenir (ağ gerektirir; CI'a bağlı değildir). `allowedRetiredInCatalog`, kademeli azaltma mandalıdır: yalnızca bir takip kaydıyla birlikte girdi ekleyin. | Evet                                                 |
| `check:fetch-targets`             | İstemci tarafındaki `src/` içinde bulunan her `fetch("/api/...")`, gerçek bir `route.ts` dosyasına çözümlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                                 |
| `check:deps`                      | Depodaki tüm `package.json` dosyalarında yer alan ve `npm install` ile kurulabilen tüm bağımlılıklar `dependency-allowlist.json` içindedir; yeni sabitlenmemiş veya slopsquatting riski taşıyan paketler işaretlenir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Evet                                                 |
| `audit:deps`                      | `npm audit` (kök + electron) — yüksek/kritik önem düzeyinde güvenlik bildirimi yoktur (osv `check:vuln-ratchet` ile örtüşür; Rasyonalizasyon İş Listesi'ne bakın)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Evet                                                 |
| `check:lockfile`                  | `package-lock.json` bütünlüğü — https kayıt defteri, bütünlük karmaları, ana makine geçersiz kılmaları yoktur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                                 |
| `check:licenses`                  | Üretim bağımlılıkları için SPDX lisans izin listesi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evet                                                 |
| `check:tracked-artifacts`         | Derleme çıktıları / commit'lenmiş `node_modules` sembolik bağlantıları yoktur (husky pre-commit sırasında da çalışır; pre-push kasıtlı olarak hafiftir — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Evet                                                 |
| `check:vitest-exclusions`         | Her Vitest hariç tutma kaydı bir takip sorununu belirtir ve `config/quality/vitest-exclusions.json` dosyasında yer alır (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Evet                                                 |
| `check:file-size`                 | Hiçbir kaynak dosya, uzantı başına belirlenen sınırı aşmaz (mandal: büyük dosyalar `frozen` listesinde dondurulmuştur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                                 |
| `check:error-helper`              | Yürütücülerdeki/işleyicilerdeki hata yanıtları `buildErrorBody()` / `sanitizeErrorMessage()` kullanır (Kesin Kural #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evet                                                 |
| `check:migration-numbering`       | Geçiş SQL dosyaları sıralı olarak numaralandırılmıştır; boşluk veya yinelenen numara yoktur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Evet                                                 |
| `check:public-creds`              | `publicCreds.ts` dışında değişmez OAuth `client_id`/`client_secret` veya Firebase Web anahtarı bulunmaz (Kesin Kural #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Evet                                                 |
| `check:db-rules`                  | `src/lib/db/` modülleri dışında ham SQL bulunmaz; `localDb.ts` üzerinden barrel import yapılmaz (Kesin Kurallar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Evet                                                 |
| `check:known-symbols`             | Dağıtım tablolarında kayıtlı sağlayıcı yürütücüleri, yönlendirme stratejileri ve dönüştürücüler diskteki dosyalarla eşleşir; sahipsiz veya bildirilmemiş sembol bulunmaz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Evet                                                 |
| `check:route-guard-membership`    | Alt süreç başlatan her rota `isLocalOnlyPath()` tarafından sınıflandırılır (Kesin Kurallar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evet                                                 |
| `check:test-discovery`            | Depodaki her `*.test.ts` / `*.spec.ts` dosyası en az bir test çalıştırıcısı tarafından toplanır (mandal: `test-discovery-baseline.json` içindeki sahipsiz dosya listesi yalnızca küçülebilir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Evet                                                 |
| `check:agent-skills-sync`         | Oluşturulan agent-skills yapıtları kaynak kataloglarıyla eşleşir (sapma yoktur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Sağlayıcı logoları/varlıkları için kayıtlı bir kaynak bilgisi girdisi bulunur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON yapılandırma dosyaları ayrıştırılır ve depo lint kurallarını karşılar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Hata olmadan TypeScript derlemesi (yalnızca bilgilendirme amaçlı uyarılar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evet                                                 |
| `typecheck:noimplicit:core`       | Katı `noImplicitAny` — geleceğe yönelik; önceden mevcut birçok çağrı noktası hâlâ ek açıklamalara ihtiyaç duyuyor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Bilgilendirme amaçlı** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` ile sınırlandırılmış `tsc` (#7033) — `typecheck:core` komutunun özenle seçilmiş 27 dosyalık izin listesi hiçbir dashboard TSX dosyasını içermiyor ve `next build` de bunlar için hiçbir zaman tür denetimi yapmıyor (`next.config.mjs`, `ignoreBuildErrors: true` olarak ayarlıyor); bu nedenle buradaki artık mevcut olmayan tanımlayıcı gerilemeleri (#6625/#6909) CI tarafından tespit edilemiyordu. Sabitlenmiş dosya başına/TS kodu başına sayı temeliyle (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ile aynı güncellik denetimi modeli) karşılaştırılır — yalnızca temel alınan sayının üzerindeki YENİ hatalar geçidin başarısız olmasına neden olur; önceden mevcut bir hata düzeltildiğinde `--update` ile eşiği düşürün.                                                                                                                                                                                                                               | Evet                                                 |

### İş: `quality-gate`

`test-coverage` sonrasında çalışır. Başarısız olduğunda birleştirmeyi engeller.

| Betik                        | Doğruladığı                                                                                                                                                                                         | Engelleyici                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `quality:collect`            | `quality-metrics.json` oluşturur (ESLint uyarı sayısı, birleştirilmiş parça raporundaki kapsam)                                                                                                     | Evet (eşik mekanizmasının ön koşulu) |
| `quality:ratchet`            | `quality-baseline.json` içindeki hiçbir metrik gerilememiştir (ESLint uyarıları ≤ temel değer; kapsam ≥ temel değer)                                                                                | Evet                                 |
| `check:duplication`          | Kod yineleme oranı (jscpd@4), `quality-baseline.json` içindeki temel değeri aşmaz                                                                                                                   | Evet                                 |
| `check:complexity`           | Dosya düzeyindeki döngüsel karmaşıklık üst sınırı aşmaz (temel ESLint `complexity` + `max-lines-per-function`)                                                                                      | Evet                                 |
| `check:cognitive-complexity` | Bilişsel karmaşıklık eşik mekanizması (`eslint-plugin-sonarjs`) — ayrı ESLint geçişi; CI, her ikisini tek bir `check:complexity-ratchets` adımı olarak birleştirip çalıştırır                       | Evet                                 |
| `check:dead-code`            | Kullanılmayan dışa aktarımlar / dosyalar eşik mekanizması (knip), temel değere kıyasla gerilemez                                                                                                    | Evet                                 |
| `check:compression-budget`   | Sıkıştırma karşılaştırma testi bütçesi — motor başına token tasarrufu alt sınırları gerilememelidir                                                                                                 | Evet                                 |
| `check:type-coverage`        | Türü belirlenmiş kod yüzdesi eşik mekanizması (`type-coverage`) gerilemez; büyük ölçüde `typecheck:noimplicit:core` kapsamını karşılar                                                              | Evet                                 |
| `check:codeql-ratchet`       | Açık CodeQL uyarılarının sayısı gerilemez (`gh api` aracılığıyla okur; token yoksa sorunsuzca atlar) — yenileme sıklığı ve manuel tetikleme için aşağıdaki "CodeQL eşik mekanizması" bölümüne bakın | Evet                                 |

### İş: `quality-extended`

İşin tamamı danışma niteliğindedir (`continue-on-error: true`). npm tabanlı ratchet kontrolleri
gerçekten çalıştırılır; harici tarayıcılar `gh release download` aracılığıyla yüklenir ve
bir ikili dosya hâlâ mevcut değilse kendiliğinden atlanır (çıkış kodu 0).

| Betik                    | Doğruladığı                                                                                                                                                                                          | Engelleyici        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check:circular-deps`    | Döngüsel bağımlılık yok (dpdm)                                                                                                                                                                       | **Danışma amaçlı** |
| `check:bundle-size`      | Paket boyutu üst sınırı aşmıyor                                                                                                                                                                      | **Danışma amaçlı** |
| `check:secrets`          | Gizli bilgi taraması (gitleaks) — ikili dosya yoksa atlanır                                                                                                                                          | **Danışma amaçlı** |
| `check:vuln-ratchet`     | Bağımlılık güvenlik açıkları (osv-scanner) gerilemiyor — ikili dosya yoksa atlanır                                                                                                                   | **Danışma amaçlı** |
| `check:workflows`        | İş akışı lint denetimi (actionlint + zizmor) — ikili dosyalar yoksa atlanır                                                                                                                          | **Danışma amaçlı** |
| `check:openapi-breaking` | Genel API sözleşmesinde (`openapi.yaml`) temel dala kıyasla geriye dönük uyumsuz değişiklikler — `openapiBreaking=N` çıktısı üretir; oasdiff yoksa veya temel spesifikasyon çözümlenemiyorsa atlanır | **Danışma amaçlı** |

### İş: `docs-sync-strict`

`main` dalına yönelik her PR'da çalışır. Hata durumunda birleştirmeyi engeller.

| Betik                          | Doğruladığı                                                                                                                                                                          | Engelleyici                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `check:docs-all`               | Aşağıdaki 6 alt geçidi sırayla çalıştıran üst geçit                                                                                                                                  | Evet                                 |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt sürüm tutarlılığı                                                                                                                                      | Evet                                 |
| ↳ `check:docs-counts`          | Metindeki sayılar (sağlayıcı sayısı, geçiş sayısı vb.) gerçek sayıların ratchet penceresi içindedir                                                                                  | Evet                                 |
| ↳ `check:env-doc-sync`         | `.env.example` içindeki her ortam değişkeni bir dokümantasyon tablosunda belgelenmiştir ve bunun tersi de geçerlidir                                                                 | Evet                                 |
| ↳ `check:deprecated-versions`  | Dokümantasyonda kullanımdan kaldırılmış sürüm dizeleri yoktur                                                                                                                        | Evet                                 |
| ↳ `check:doc-links`            | Dokümantasyondaki dahili markdown bağlantıları gerçek dosyalara çözümlenir (`[text]`/`(path)` biçimi)                                                                                | Evet                                 |
| ↳ `check:fabricated-docs`      | Dokümantasyonda belirtilen rotalar, ortam değişkenleri, CLI komutları, hook adları ve dosya yolları kod tabanında mevcuttur. `--strict` ile katı geçit; bayrak olmadan yumuşak hata. | Evet (CI'da `--strict` aracılığıyla) |
| `check:cli-i18n`               | CLI komut dizeleri tüm i18n yerel ayar dosyalarında mevcuttur                                                                                                                        | Evet                                 |
| `check:openapi-coverage`       | OpenAPI spesifikasyonu, gerçek rotalar için ratchet ile belirlenmiş asgari kapsam düzeyini karşılar                                                                                  | Evet                                 |
| `check:openapi-security-tiers` | `openapi.yaml` içindeki güvenlik katmanı ek açıklamaları, `routeGuard.ts` sınıflandırmalarıyla tutarlıdır                                                                            | **Danışma amaçlı**                   |
| `check:openapi-routes`         | `openapi.yaml` içindeki her yol gerçek bir `route.ts` dosyasına çözümlenir (halüsinasyon önleme)                                                                                     | Evet                                 |
| `check:docs-symbols`           | `docs/**/*.md` içindeki her `/api/...` referansı gerçek bir `route.ts` dosyasına çözümlenir (halüsinasyon önleme)                                                                    | Evet                                 |
| `i18n translation drift`       | i18n yerel ayar dosyalarındaki çevrilmemiş anahtarlar — yalnızca uyarı                                                                                                               | **Danışma amaçlı**                   |

### İş: `i18n-ui-coverage`

| Betik                                | Doğruladığı                                                                                                                                                                                         | Engelleyici             |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check-ui-keys-coverage` (satır içi) | UI i18n anahtar kapsamı ≥ %65                                                                                                                                                                       | Evet                    |
| `check-ui-value-drift` (satır içi)   | Yeniden yazılmış bir İngilizce **değer**, geride güncelliğini yitirmiş çeviri bırakmaz                                                                                                              | Evet                    |
| `check-new-key-coverage` (satır içi) | **Yeni** bir İngilizce anahtar her yerel ayarda çevrilmiştir — `__MISSING__:` işareti reddedilir                                                                                                    | Evet                    |
| `check-translation-ratio`            | Yerel ayar başına gerçek çeviri oranı (İngilizceyle aynı / yer tutucu / izin listesinin dışında eksik bırakılanlar) `config/quality/i18n-translation-baseline.json` + tolerans değerini aşmamalıdır | **Tavsiye niteliğinde** |

`fetch-depth: 0` gerektirir — değer sapması kapısı, `en.json` dosyasını birleştirme tabanıyla karşılaştırır.

#### `check-ui-value-drift` — güncelliğini yitirmiş çeviri kapısı

Diğer kapıların yapısal olarak göremediği tek i18n gerilemesini yakalar: İngilizce bir değer
yeniden yazılır ve _önceki_ İngilizceden türetilen çeviriler geride kalır; böylece
İngilizce dışındaki dilleri kullananlar kendinden emin ifadelerle yazılmış, ancak artık yanlış olan metni okumaya devam eder.

Bu gerçekten yayıma alındı. Antigravity oturum açma yardımcısı eklendiğinde (#5203)
`oauthModal.googleOAuthWarning` yeniden yazıldı; **43 yerel ayarın 39'u**, operatörlere "tam
URL'yi kopyalayıp aşağıya yapıştırmalarını" söyleyen metni korudu — bu sağlayıcı için
tamamlanması mümkün olmayan bir akış. Şu nedenlerle #8463'e kadar fark edilmedi:

- `sync-ui-keys` yalnızca **eksik** anahtarları geri doldurur, **güncelliğini yitirmiş** olanları asla doldurmaz;
- `check-ui-keys-coverage` anahtar _varlığını_ sayar, dolayısıyla güncelliğini yitirmiş bir çeviri kapsanmış olarak değerlendirilir;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` dokümantasyon yansımalarını izler —
  `src/i18n/messages/*.json` dosyalarını hiçbir zaman okumaz. 2026-09 yeniden eşitlemesinden beri `docs-sync-strict` işinde engelleyicidir: temel bir belgeyi düzenleyin → `npm run i18n:run -- --files=<doc>` (bölüm düzeyinde, düşük maliyetli).

**Fark duyarlı, taban çizgisi destekli değil.** Birleştirme tabanındaki `en.json` dosyasını
çalışma ağacıyla karşılaştırır; İngilizce değeri değişen her anahtar için dokunulmamış bir
çeviriyi hâlâ barındıran her yerel ayar güncelliğini yitirmiş sayılır. Bu, **önceden var olan
borcu kasıtlı olarak dondurur** — bir fark, uzun süredir var olan bir çevirinin hangi eski
İngilizce metinden geldiğini ortaya çıkaramaz; bu nedenle kapı yalnızca mevcut değişikliğin
dokunduğu öğeleri değerlendirir. Alternatif yöntem (anahtar başına karma taban çizgisi),
mevcut en büyük taban çizgisinin 3 katı olan yaklaşık 600 KB'lık oluşturulmuş bir dosya
gerektirir ve bu dosya her i18n PR'ında değişirdi.

Bunu sağlamanın iki yolu vardır:

1. etkilenen çevirileri güncelleyin veya
2. bunları `__MISSING__:<new english>` olarak ayarlayın — çalışma zamanı bu durumda düzeltilmiş İngilizce
   metni sunar (`src/i18n/request.ts::deepMergeFallback`, #7258) ve anahtar çeviri kuyruğuna alınır.

Dizenin **anlamı** değiştiyse **anahtarı yeniden adlandırmayı** tercih edin: yeni bir anahtar
güncelliğini yitirmiş bir çeviriyi devralamaz. #8463'te kullanılan kalıp budur.

```bash
npm run i18n:check-value-drift          # katı (CI'ın çalıştırdığı)
npm run i18n:check-value-drift:warn     # yalnızca raporla
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Taban katalog okunamadığında (taban ref'i olmayan sığ klon), `check-openapi-breaking`
davranışını yansıtacak şekilde `SKIP reason=base-unresolved` ile 0 koduyla çıkar.

### İş: `i18n`

Tam i18n doğrulama matrisi (yerel ayar başına bir iş). İşin tamamı tavsiye niteliğindedir.

| Betik                           | Doğruladığı                        | Engelleyici                                                  |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Yerel ayar başına çeviri bütünlüğü | **Tavsiye niteliğinde** (tüm işte `continue-on-error: true`) |

### İş: `pr-test-policy`

Yalnızca çekme isteklerinde çalışır.

| Betik                  | Doğruladığı                                                                                                                                                | Engelleyici |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` veya `bin/` içindeki üretim kodunu değiştiren PR'lar test eklemeli veya mevcut testleri güncellemelidir (Kesin Kural #8)  | Evet        |
| `check:test-masking`   | Değiştirilen test dosyaları net iddia sayısını azaltmaz veya `assert.ok(true)` totolojileri eklemez                                                        | Evet        |
| `check:pr-evidence`    | PR gövdesi, değişiklik için test/VPS kanıtına atıfta bulunur (PR metninde arama yaparak Kesin Kural #18'i otomatikleştirir — kırılgandır, bkz. İş Listesi) | Evet        |

### İş: `test-vitest`

`build` sonrasında çalışır. Başarısız olursa birleştirmeyi engeller.

| Paket            | Doğruladıkları                                                      | Engelleyici                                                                                                               |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP sunucusu (110 araç), autoCombo, önbellek — vitest çalıştırıcısı | Evet                                                                                                                      |
| `test:vitest:ui` | UI bileşen testleri — vitest çalıştırıcısı                          | **Engelleyici** — önceden mevcut hatalar `vitest.config.ts` içinde açıkça hariç tutulur; yeni hatalar işi başarısız kılar |

### Gecelik iş akışları (zamanlanmış, tavsiye niteliğinde)

Bunlar cron zamanlamasıyla (ve `workflow_dispatch` ile) çalışır, PR'larda hiçbir zaman çalışmaz. Tümü tavsiye niteliğindedir.

| İş akışı               | Doğruladıkları                                                                                                                                                                          | Engelleyici             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `nightly-property`     | rastgele seed ve yüksek çalıştırma sayısıyla fast-check özellik testleri                                                                                                                | **Tavsiye niteliğinde** |
| `nightly-resilience`   | heap büyüme eşiği, kaos hata enjeksiyonu, k6 yük/uzun süreli yük testi                                                                                                                  | **Tavsiye niteliğinde** |
| `nightly-llm-security` | promptfoo enjeksiyon koruması (engelleme modu) + garak sondaları (sağlayıcı secret'ı olmadan atlanır)                                                                                   | **Tavsiye niteliğinde** |
| `nightly-schemathesis` | `docs/openapi.yaml` kullanılarak canlı bir OmniRoute'a karşı OpenAPI sözleşmesi fuzz testi (schemathesis) — spesifikasyon ihlallerini / işlenmemiş 500'leri ortaya çıkarır (Fase 8 B.4) | **Tavsiye niteliğinde** |
| `nightly-mutation`     | hızlı birim hattında Stryker mutasyon testi puanı — hayatta kalan mutantlar zayıf assertion'ları ortaya çıkarır                                                                         | **Tavsiye niteliğinde** |
| `nightly-compat`       | desteklenen `engines.node` aralıkları genelinde Node motoru uyumluluk matrisi                                                                                                           | **Tavsiye niteliğinde** |

---

## Hız aşaması (2026-08-30 → v4.0 LTS): tüm taban değerleri %20 gevşetildi

Sahip kararı (2026-08-30): v4.0 modülerleştirmesine kadar sürüm çıkarma hızı, teknik borç sınırını korumaktan daha önemli. Tüm **sayısal** mandal taban değerleri, denetlenebilir tek bir geçişte %20 gevşetildi ve aşama `config/quality/quality-baseline.json` içinde tanımlandı:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Değişenler                                                                                                                                                                                                                              | Konum                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — düşük olması daha iyi olan sayılar ×1.2, yüksek olması daha iyi olan yüzdeler ÷1.2 (kapsam alt sınırı 60 olarak korundu, `eslintErrors` 0 olarak kaldı, `eslintWarnings` 0 → dondurulmuş bastırma sayısının %20'si) | `quality-baseline.json` (`_relax_velocity_2026_08_30` notu tüm önce → sonra değerlerini listeler)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, tüm `frozen[*]` / `testFrozen[*]` satır sınırları ×1.2                                                                                                                                                                | `file-size-baseline.json`                                                                              |
| dosya başına / TS kodu başına sayılar ×1.2                                                                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` iken `--require-tighten` bilgilendirme amaçlı hâle gelir                                                                                                                                             | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| gecelik `bank-ratchet-shrinks` duraklatıldı (ölçülen daralmayı kayda geçirerek ek kapasiteyi ortadan kaldırırdı)                                                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

İzin listeleri (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) bütçe **değildir** ve bunlara dokunulmadı. Başarılı/başarısız politika kapıları (gizli bilgiler, SQL kuralları,
doküman/ortam sözleşmesi, i18n eşliği, birim testleri) değişmedi — başarısız bir test hâlâ başarısız bir testtir.

**Araçlar**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — tek seferlik
  gevşetme (`scripts/quality/relax-baselines.mjs`); aynı notla ikinci kez çalışmayı reddeder.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  her sayısal kapıyı CI ile aynı şekilde ölçer ve kapı başına kalan ek kapasiteyi yazdırır
  (`scripts/quality/baseline-headroom.mjs`). Gecelik `baseline-headroom` işi, tabloyu yaşayan
  **📈 Baseline headroom (velocity phase)** kaydına gönderir ve herhangi bir kapı sınırının %10'una
  yaklaştığında veya sınırı zaten aştığında `headroom-alert` etiketini ekler. Bu kayıt erken uyarı
  işlevi görür: birkaç gün içinde dolan bir bütçe, gevşetmenin tüm ekip tarafından değil, birkaç PR
  tarafından tüketildiği anlamına gelir — sorunlu kapının `_rebaseline_*` notlarına bakın.

**Yeni kod modu (Clean-as-You-Code) — 2026-08-30'dan beri, yalnızca PR hızlı yolu**

`pull_request` olaylarında `quality.yml`, `check:file-size`, `check:complexity-ratchets` ve
`check:dead-code` komutlarına `--base-ref <PR base SHA>` iletir. Bu modda kapı, HEAD'i
merge-base ile **yalnızca PR'ın dokunduğu dosyalarla sınırlı olarak** karşılaştırır
(`scripts/check/newCodeMode.mjs`: merge-base, geçici bir `git worktree` içinde oluşturulur;
ESLint/knip burada ve HEAD üzerinde çalıştırılır, ardından dosya başına sayımların farkı alınır):

- **engelleyici** — PR, değiştirdiği dosyalara döngüsel/bilişsel karmaşıklık ihlalleri veya ölü dışa aktarımlar ekledi
  (günlükte `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **bilgilendirme amaçlı** — genel toplamın dondurulmuş taban değeriyle karşılaştırılması. Devralınan sapma,
  ilgisiz bir PR'ı hiçbir zaman başarısız kılmaz; sapma, sürüm uzlaştırması sırasında yeniden dondurulur ve
  ek kapasite işi tarafından izlenir.

`workflow_dispatch` çalıştırmaları, release-green taraması ve gecelik ek kapasite işinin PR tabanı
yoktur ve bunlar mutlak (genel) karşılaştırmayı sürdürür. Kapsam, çoğaltma ve tip kapsamı şimdilik
genel kalır (araçları, dosya başına farkı düşük maliyetle üretmez) — aynı işlem için adaydırlar.

**v4.0'da aşamanın kapatılması (LTS = öncekinden daha sıkı, "normale dönüş" değil)**

1. Saf `release/v4.0.0` dalının son commit'inde: kayıt için `npm run quality:headroom --json`, ardından
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, her typecheck geçidinin
   `--update` seçeneğini çalıştırın — tüm baseline değerleri ölçülen değere düşer.
2. `quality-baseline.json` dosyasından `_policy` öğesini silin (`--require-tighten` seçeneğini ve gecelik
   biriktirmeyi yeniden etkinleştirir), `check-openapi-coverage.mjs` içinde `THRESHOLD = 36` (veya daha yüksek) değerini geri yükleyin.
3. Modülerleştirmenin fayda sağladığı yerlerde ölçülen değerlerin ötesinde sıkılaştırın: dosya boyutu `cap` değerini yeniden 1000'e
   (veya 800'e), kapsam alt sınırlarını +5'e, modülerleştirilmiş paketlerde kullanılmayan dışa aktarımları 0'a ayarlayın.

## Ratchet Temel Değeri (`quality-baseline.json`)

Ratchet motoru (`scripts/quality/check-quality-ratchet.mjs`), `quality-baseline.json` dosyasını okur
ve yeni toplanan `quality-metrics.json` ile karşılaştırır. Epsilon değerinin ötesinde gerileyen
herhangi bir metrik derlemenin başarısız olmasına neden olur.

Şu anda izlenen metrikler:

| Metrik                | Yön    | Anlamı                                  |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLint uyarılarının sayısı artmamalıdır |
| `coverage.statements` | `up`   | İfade kapsamı düşmemelidir              |
| `coverage.lines`      | `up`   | Satır kapsamı düşmemelidir              |
| `coverage.functions`  | `up`   | Fonksiyon kapsamı düşmemelidir          |
| `coverage.branches`   | `up`   | Dal kapsamı düşmemelidir                |

Gerçek bir iyileştirmeden sonra temel değeri güncellemek için:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` bayrağı, geçerli ölçüm değerlerini `quality-baseline.json` dosyasına yazar.
Bu dosyayı metriği iyileştiren değişiklikle birlikte commit edin. Temel değeri güncellemeden
bir metriği iyileştiren PR, `--require-tighten` tarafından yakalanacaktır (Aşama 6A.5,
uygulama bekleniyor).

### CodeQL ratchet: yenileme sıklığı ve manuel tetikleme

`check:codeql-ratchet`, **her PR için değil, bir zamanlamaya göre yenilenen depo durumunu okur.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`, `state: configured`,
`schedule: weekly` bildirir: bu, gönderim başına analiz değil, GitHub'ın varsayılan kurulum
taramasıdır. Sonuç olarak: uyarıları DÜZELTEN bir PR birleştirildikten sonra ratchet, bir sonraki
zamanlanmış tarama çalışana kadar eski ve daha yüksek sayıyı okumaya devam eder; dolayısıyla tarama
güncel durumu yakalayana kadar, düzeltme PR'ının kendi devam PR'ları da dahil olmak üzere her açık
PR'da gerileme bildirir.

**Manuel yenileme**: `gh workflow run codeql.yml --ref release/vX.Y.Z`, analizi yeniden çalıştırır
ve uyarıları dakikalar içinde yeniden yayımlar. Önce `.github/workflows/codeql.yml` dosyasını okuyun;
başlığı, bunun yalnızca `workflow_dispatch` olmasının nedenini **GitHub'ın "default setup" özelliğiyle
çakışması** olarak açıklar (`CodeQL analyses from advanced configurations cannot be processed when
the default setup is enabled`). `push`/`pull_request`/`schedule` tetikleyicilerini geri yüklemek,
öncelikle bir **sahip eylemi** gerektirir: Settings → Code security → CodeQL: Default → Advanced.
Bu geçişi yapmadan bir `schedule:` tetikleyicisi eklemeyin; yalnızca başarısız çalıştırmalara neden
olur.

**Sayı düştükten sonra temel değeri sıkılaştırın** — `node scripts/check/check-codeql-ratchet.mjs
--update`, yeni ölçülen sayıyı `quality-baseline.json` → `metrics.codeqlAlerts.value` konumuna
yazar; böylece ratchet, eski üst sınıra geri dönüşü sessizce kabul etmez. Uygulamalı örnek
(2026-09-02/03): PR #12502, 7 gerçek uyarıyı düzeltti (ölçülen açık uyarı sayısı 13 → 6);
PR #12530, eşleşmesi için sabitlenmiş temel değeri 11 → 6 olarak sıkılaştırdı; kalan 6 uyarı
daha sonra uyarı başına gerekçe belirtilerek kapatıldı ve açık uyarı sayısı 0'a indirildi.

**Kapatma kararları operatöre aittir (Kesin Kural #14)** — kapatma yorumuna teknik gerekçeyi
kaydetmeden asla bir CodeQL uyarısını kapatmayın: üst sistem protokolü gereksinimi için `won't fix`,
bir test fixture'ı için `used in tests`, CodeQL'in göremediği bir sanitizer için `false positive`
(emsal: `docs/security/ERROR_SANITIZATION.md`).

---

## Test Yeniden Deneme Politikası (WS5.4, v3.8.49)

Yeniden deneme çalıştırıcı bazındadır, asla genel kapsamlı değildir — genel kapsamlı bir yeniden deneme, gerçek regresyonları
görünmez kararsızlıklara dönüştürür:

| Çalıştırıcı       | Politika                                                                                                                                  | Neden                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)  | Yalnızca CI'da `retries: 1`, ayrıca `trace: on-first-retry`                                                                               | Tarayıcı/ağ zamanlaması gerçekten belirlenimsizdir; iz içeren tek bir yeniden deneme, kararsızlığı teşhis edilebilir bir artefakta dönüştürür |
| Vitest            | Genel yeniden deneme YOK. Kararsızlığı kanıtlanmış bir test, test bazında açık bir yeniden deneme alır (diff'te görünür, PR'da incelenir) | Karantina listesini repoda ve her zaman şeffaf tutar                                                                                          |
| node:test (birim) | Asla yeniden deneme YOK                                                                                                                   | Kararsız bir birim testi, testteki bir hatadır — düzeltin, yeniden zar atmayın                                                                |

Kararsızlık telemetrisi devreye girdikten sonraki hedef SLO'lar (WS5.2/5.3): test başına <%1 kararsızlık oranı
("hemen düzelt" eşiği), işlem hattı başına ≥%95 geçme oranı. Sektör referans değerleridir —
kendi ölçümlerimize göre yeniden kalibre edilmelidir.

## Sürüm Düzeyinde Mandal Sapması (WS5.5, v3.8.49)

Bir mandal (dosya boyutu, karmaşıklık, eslint uyarıları) SAF sürüm
ucunda gerilediğinde — yani birleştirmelerin BİLEŞİMİ gerilemeye neden olduğunda ve hiçbir PR kendi
dalında bu gerilemeyi tek başına yeniden oluşturamadığında — düzeltme **bir kez, sürüm
dalında, sürüm sorumlusuna** aittir: ayırmayı/yeniden düzenlemeyi tercih edin; taban çizgisini yalnızca belgelenmiş
gerekçe girdisiyle yeniden belirleyin. Bileşim sapmasını asla katkıda bulunan birinin PR'ına yüklemeyin ve
taban çizgisini PR bazında asla yeniden belirlemeyin (bu, gerçek regresyonları gizler). Önce ayrım yapın: PR'ınızın buna neden olduğunu varsaymadan önce
kırmızı durumu saf uç üzerinde bir inceleme worktree'sinde yeniden oluşturun.

## Mandal Küçülmelerini Kaydetme — aşağı yön (#8584)

Mandal yalnızca yarı otomatiktir ve otomatik olan yanlış yarıdır. Bir üst sınırı **yükseltmek**,
on saniye süren manuel bir JSON düzenlemesidir ve kırmızı bir PR'ın engelini kaldırmanın en hızlı yoludur.
Bir üst sınırı **düşürmek** ise birinin `--update` çalıştırıp sonucu commit etmesini gerektirir — ve
`bank-ratchet-shrinks` işi devreye girene kadar hiçbir iş akışı bunu çalıştırmıyordu. Ölçülen sonuç
(2026-07-25): 800 satırlık yeni dosya üst sınırında veya altında bulunan hâlihazırda dondurulmuş 18 dosya; en kötü örnek
132× farkla (`src/shared/validation/schemas.ts`, 2.523 üst sınır taşıyan 19 satır);
karmaşıklık tavanı, tam olarak bir düşüşle (−1), yaklaşık 37 yeniden taban belirleme notu boyunca `1794 → 2169`
seviyesine çıktı; ayrıca "sonraki döngüde `--update` ile sıkılaştır" 31 kez yazıldı ve
bir kez uygulandı. Kendisini gerektiren koddan daha uzun yaşayan bir üst sınır, tamamlanan her
ayrıştırmayı sessizce dosyayı bir sonraki düzenleyen kişi için büyüme payına dönüştürür.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** işi bu döngüyü kapatır:

|          |                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| Çalışır  | `schedule` (günde 3×) + `workflow_dispatch` — kasıtlı olarak `push` üzerinde **değil**                        |
| Ölçer    | en yüksek `release/vX.Y.Z`; `release-green` ile aynı çözümleme + enjeksiyon koruması                          |
| Yazar    | `check:file-size --update` ve `check:complexity-ratchets --update` (ikisi de yapısı gereği yalnızca küçültür) |
| Doğrular | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                      |
| Sunar    | sürüm dalına karşı her zaman güncel tek bir PR — zorla güncellenir, asla istenmeyen PR yağmuruna neden olmaz  |

Kaydetme işlemi push başına değil toplu olarak yapılır; çünkü gecikme gereksinimi yoktur (bir küçülmenin
8 saat içinde kaydedilmesi yeterlidir), oysa birleştirme başına çalıştırma, birleştirme kampanyaları
sırasında PR dalını tekrar tekrar oluşturur ve her seferinde tam bir ESLint taramasının maliyetine katlanırdı. Algılama
push üzerinde kalır (`release-green`); yalnızca kaydetme işlemi toplu hâle getirilmiştir.

### Güvenlik doğrulayıcısı

İş, taban çizgilerine gözetimsiz olarak yazdığı için bunu kabul edilebilir kılan
`verify-ratchet-bank.mjs` dosyasıdır. `--update` sonrasındaki ağacı `HEAD` ile karşılaştırır ve her değişiklik
aşağıdakilerden biri olmadığı sürece **herhangi bir commit oluşmadan önce işi iptal eder** — hiçbir PR açılmaz:

- bir `frozen` / `testFrozen` sayısal girdisinin **düşürülmesi** veya **kaldırılması**
- `complexity-baseline.json` → `count` değerinin **düşürülmesi**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` değerinin **düşürülmesi**

Diğer her şey başarısız olur: bir sayıyı yükseltmek, girdi eklemek, `cap`/`testCap` değerini değiştirmek veya
bir `_rebaseline_*` notunu silmek/yeniden yazmak (bu notlar, her tavanın neden var olduğuna ilişkin denetim kaydıdır
ve dosya girdileriyle aynı `frozen` nesnesinin içinde saklanır).
Bir üst sınırı yükseltebilen bir bot, mevcut durumdan kesinlikle daha kötü olurdu. Regresyon
koruması: `tests/unit/verify-ratchet-bank.test.ts`.

İş hiçbir zaman `release/*` dallarına push yapmaz — PR'ı bir insan birleştirir; dolayısıyla hatalı bir ölçüm
incelenmeden sisteme giremez.

## İzin Listesi Politikası

Önceden mevcut ihlaller nedeniyle başarısız olmaması gereken her geçit, sabitlenmiş bir izin listesi
(ör. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) kullanır. Politika şöyledir:

**Temel nedeni düzeltin; izin listesini yalnızca ihlal önceden mevcutsa ve
aynı PR içinde düzeltilemiyorsa kullanın.**

Bir izin listesine girdi eklerken:

1. Gerekçeyi açıklayan bir yorum ekleyin.
2. Takip sorununa referans verin (ör. `// #3498 — Aşama 2 özelliği, henüz uygulanmadı`).
3. İhlali düzelten PR içinde girdiyi de kaldırın — artık etkin bir ihlali
   bastırmayan eski bir girdi başlı başına bir kusurdur (6A.3 eski-yaptırım denetimi,
   uygulandığında sahipsiz bir izin listesi girdisi nedeniyle geçidi başarısız kılacaktır).

Testlerin daha hızlı geçmesini sağlamak için izin listesine girdi **eklemeyin**. Büyüyen bir
izin listesine sahip yeşil bir geçit, sahte bir kalite algısı yaratır.

### PR'ınızda bir geçit başarısız olduğunda

1. **Geçit çıktısını dikkatlice okuyun** — çıktıda, kuralı tam olarak hangi dosyanın veya sembolün
   ihlal ettiği belirtilir.
2. **İhlali düzeltin** — çoğu geçit, kod doğru hâle gelir gelmez başarılı olan deterministik dosya sistemi denetimleridir.
3. **İhlal önceden mevcutsa** (yani ihlali siz oluşturmadıysanız ancak geçit artık
   bunu kapsıyorsa): gerekçe yorumu ve takip sorunuyla birlikte bir izin listesi girdisi ekleyin.
4. **Geçit bir mandallı ölçümse** (kapsam, ESLint uyarıları, tekrar, karmaşıklık):
   değişikliğiniz metriği kötüleştirmiştir. Temel sorunu düzeltin veya (nadiren) değişiklik
   kasıtlıysa ve metrikteki kötüleşme kabul edilebilirse
   `npm run quality:ratchet -- --update` komutunu çalıştırın — ancak nedenini PR açıklamasında belgeleyin.
5. **Tavsiye niteliğindeki geçitler** (`continue-on-error: true`) bilgilendirme amaçlıdır — birleştirmeyi
   engellemezler ancak CI özetinde görünürler. Yine de bunları düzeltin.

---

## Yeni Bir Geçit Ekleme

1. `scripts/check/check-<name>.mjs` (veya `.ts`) dosyasını oluşturun. Politika geçitleri 0/1 çıkış koduyla sonlanır.
   Mandallı ölçüm tarzındaki geçitler, `collect-metrics.mjs` aracılığıyla `quality-metrics.json` dosyasına bir metrik yazar.
2. `package.json` dosyasına `"check:<name>": "node scripts/check/check-<name>.mjs"` ekleyin.
3. Bunu `.github/workflows/ci.yml` içinde uygun işin altına bağlayın
   (politika → `lint` veya `docs-sync-strict`; mandallı ölçüm → `quality-gate`).
4. Bir izin listesi varsa eski girdilerin otomatik olarak algılanması için
   `scripts/check/lib/allowlist.mjs` içindeki `reportStaleEntries()` işlevini uygulayın.
5. `tests/unit/build/` içinde geçidin algılama mantığını kapsayan bir test yazın.
6. Bu belgeyi güncelleyin (ilgili iş tablosuna bir satır ekleyin).

---

## Ajan araçları: Döngü içinde LSP (isteğe bağlı)

CI geçitlerine ek olarak OmniRoute, **isteğe bağlı** bir `agent-lsp` iskeleti
(proje düzeyinde bir `.mcp.json`, Aşama 7 Görev 15) sunar. Kodlama ajanlarına bir TypeScript dil sunucusu
sağlamak için `.mcp.json` oluşturun; böylece ajanlar kod yazmadan **önce** sembolleri /
tanılamaları çözümler — bu, `typecheck:core` için derle-önce-iddia-et yaklaşımını destekleyen
ve "uydurulmuş sembol" hatalarını kaynağında azaltan bir yardımcıdır. Kasıtlı olarak
otomatik yüklenmez (MCP↔LSP köprüsünü siz seçip doğrularsınız); bozuk bir girdi yalnızca bir
bağlantı hatasını günlüğe kaydeder ve oturumları hiçbir zaman bozmaz.

---

## Rasyonalizasyon İş Listesi (ROI incelemesi — Aşama 9 Dalga 3)

Bu envanter, 2026-06-17 tarihinde `ci.yml` ile karşılaştırılarak mutabık hâle getirildi (önceki sürümde
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` yer almıyordu). Mutabık hâle getirilen kümenin ROI incelemesi,
aşağıdaki rasyonalizasyon adaylarını belirledi. **Birleştirmeler mekanik CI
değişiklikleridir; etkinleştirme/kaldırma kararları ise operatöre bırakılmış politika kararlarıdır.** Aşağıdakilerin hiçbiri
henüz uygulanmadı.

**Yukarıda ayrıca belgelenmemiş olanlar** (tavsiye niteliğinde, düşük sinyalli): `docs-lint` işi
(markdownlint + Vale, işin tamamında `continue-on-error`) ve bağımsız tarayıcı iş akışları
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`,
`quality-baseline.json` içinde yer alıyor ancak `ci.yml` içinde engelleyici bir mandala bağlı değil — metrik
şu anda sahipsiz.

### Birleştirme / tekilleştirme (mekanik, daha düşük risk)

Her aday, 2026-06-17 tarihinde canlı eşik durumuna göre doğrulandı (güven ama doğrula);
"bariz" görünen birkaç birleştirmenin aslında teknik borcu gizlediği ortaya çıktı ve bunlar **doğrudan uygulanabilecek temiz değişiklikler değildir**.

- **`check:docs-sync` iki kez çalışıyor** — `lint` işi içinde bağımsız olarak, ayrıca `check:docs-all` (`docs-sync-strict`) ve husky pre-commit kancası içinde tekrar çalışıyor. ✅ **TAMAMLANDI** — bağımsız `lint` çağrısı kaldırıldı.
- **CVE taraması** — ❌ **Temiz bir birleştirme DEĞİL.** `audit:deps`, herhangi bir yüksek/kritik CVE durumunda kesin olarak başarısız olur; `check:vuln-ratchet` (osv) ise yalnızca referans çizgisine kıyasla bir _gerileme_ olduğunda başarısız olur (şu anda 1 MODERATE). Anlamları farklıdır — `audit:deps` kaldırılırsa mutlak yüksek/kritik eşiği kaybedilir. Her ikisini de koruyun.
- **Döngü tespiti** — ❌ **Temiz bir birleştirme DEĞİL.** `check:circular-deps` (dpdm) **91 döngü** bildiriyor (tavsiye niteliğinde olmasının nedeni bu); bunlar önce çözülmeden engelleyici hâle getirilemez ve yeşil durumda olan, özenle seçilmiş `check:cycles` denetiminden daha geniş bir kapsama sahiptir. `check:cycles` engelleyici olarak kalsın; 91 dpdm döngüsünün çözülmesi ayrı bir iş listesidir.
- **Karmaşıklık** — ✅ **TAMAMLANDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): tek bir ESLint geçişi, ruleId bazında sayım yapar; böylece çevrimsel karmaşıklık+max-lines ve bilişsel referans çizgileri bağımsız kalır; ayrı `check:complexity` / `check:cognitive-complexity` komutları yerel `--update` kullanımı için korunur.
- **`/api` halüsinasyon önleme** — ✅ **TAMAMLANDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` için tek bir FS envanteri; openapi-routes + docs-symbols hâlâ bağımsız raporlama yapar; ayrı komutlar yerel çalıştırmalar için korunur.
- **`check:node-runtime` 11 işte çalışıyor** — ⚠️ **düşük ROI.** Her biri ayrı bir çalıştırıcıdır ve denetim <1 sn sürer; ucuz bir iş başına korumanın kaybedilmesine karşılık toplam tasarruf ~10 sn'dir. Değişiklik zahmetine değmez.
- **CI lint üzerindeki `typecheck:noimplicit:core`** — ✅ **lint işinden kaldırıldı** (tavsiye niteliğinde `continue-on-error` idi); engelleyici tür yüzeyi `typecheck:core` + `check:type-coverage` ile sağlanır. Yerel betik korundu.

### Etkinleştirme / karar verme (operatör politikası)

- `check:openapi-security-tiers` (tavsiye niteliğinde) — ❌ **Temiz şekilde etkinleştirilemez.** 0 ile çıkar ancak `LOCAL_ONLY_API_PREFIXES` altındaki birkaç `traffic-inspector` rotasında `x-loopback-only: true` ek açıklamasının bulunmadığı konusunda uyarır. Bunu zorunlu kılmak için önce bu ek açıklamaların `openapi.yaml` dosyasına eklenmesi gerekir.
- `typecheck:noimplicit:core` (tavsiye niteliğinde) — büyük ölçüde engelleyici `check:type-coverage` mandalı tarafından kapsanıyor. Bir mandala dönüştürün veya gereksiz ikinci `tsc` geçişini kaldırın.
- `test:vitest:ui` (artık **engelleyici**) — önceden var olan hatalar, `vitest.config.ts` içinde `// #8618` takip yorumlarıyla açıkça hariç tutulmuştur; yeni hatalar işin başarısız olmasına neden olur.
- `check:secrets` (gitleaks, belgelenmiş 3 yanlış pozitif değerinde dondurulmuş engelleyici mandal) — 0'a ulaşmak için bu 3 öğeyi izin verilenler listesine ekleyin veya denetimi tavsiye niteliğine indirin. GitHub'ın yerleşik gizli bilgi taraması + `check:public-creds` ile örtüşür.
- `check:pr-evidence` (engelleyici, PR gövdesindeki metni grep ile tarar) — yanlış pozitif riski yüksektir; kaldırılması Katı Kural #18'in uygulanmasını zayıflatır, dolayısıyla bu gerçek bir politika kararıdır.
- `semgrep` (tavsiye niteliğinde bağımsız iş akışı) — OWASP aileleri açısından CodeQL ile örtüşür; referans çizgisini bir mandala bağlayın veya kaldırın.

---

## İlgili Dokümantasyon

- Tedarik zinciri (kaynak doğrulama, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — anahtar kümesi eşitliği geçidi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, iş `i18n-ui-coverage`).
Her `src/i18n/messages/<locale>.json` dosyasındaki uç anahtar kümesini `en.json` ile karşılaştırır ve
anahtarın ne zaman eklendiğine bakmaksızın eksik veya fazladan herhangi bir uç anahtar olduğunda başarısız olur.
`__MISSING__:` yer tutucuları mevcut sayılır (bunların içeriği oran geçidinin konusudur). Bu geçit,
fark tabanlı/yüzdesel diğer iki geçidin mutlak tamamlayıcısıdır: `check-ui-keys-coverage`, yerel ayar
başına %80 alt sınırını zorunlu kılar (~13.000 anahtardan 43'ünün eksik olması yine %99,7 olarak görünür);
`check-new-key-coverage` ise yalnızca bir PR'ın `en.json` dosyasına eklediği anahtarları değerlendirir.
Bir yerel ayar toplu işi, dalının oluşturulduğu günkü `en.json` dosyasından üretilir ve taban dalına yeni
anahtarlar eklenmeye devam ederken günlerce çeviri yapar; toplu iş PR'ı kendisi hiçbir anahtar eklemediğinden,

1. toplu iş (#13044) dokuz yerel ayarda 43 anahtar eksik ve 2. toplu iş (#13660) sekiz yerel ayarda
   10 anahtar eksik olarak birleştirildiğinde iki kardeş geçit de sessiz kaldı (2026-09-15). Kırmızı durumu
   `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ile düzeltin; `extra` bir uç anahtar,
   kaynağın onu kaldırdığı anlamına gelir — yerel ayardan silin. `--warn`, başarısız olmadan raporlar.
   `--catalog=cli`, aynı karşılaştırmayı `bin/cli/locales` üzerinde çalıştırır (`npm run i18n:check-keys:cli`);
   her iki adım da `i18n-ui-coverage` işinde yer alır.

#### `check-new-key-coverage` — yeni anahtar i18n geçidi

`check-ui-value-drift` geçidinin kardeşidir. O geçit, çevirileri geride kalmış bir İngilizce değerin
**yeniden yazıldığını** yakalar; bu geçit ise bazı yerel ayarlara hiç eklenmemiş bir İngilizce anahtarın
**eklendiğini** yakalar.

`check-ui-keys-coverage` bu durumu göremez: yerel ayar başına yüzdesel bir alt sınırı zorunlu kılar ve
~13.000 uç anahtardan on birinin eksik olması kapsamı %99,9'da bırakır. Dil başına bir yüzde,
"bu özellik çevrilmeden yayımlandı" durumunu ifade edemez — yeni bir yerel ayara hiçbir metni olmadan
bütün bir özellik eklenebilir ve bu sayı hiç değişmeyebilir.

Kodladığı olay şudur: Orchestration Canvas'ın 3. Aşaması, on bir anahtarını o sırada mevcut olan 42 yerel
ayarın tamamına çevirdi. Saatler sonra AB dilleri toplu işi (#13044), depoyu 51 yerel ayara çıkardı ve
yeni gelen dokuz yerel ayar (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) bu anahtarları hiçbir
zaman almadı. `deepMergeFallback`, eksik bir anahtar yerine İngilizceyi koyduğundan hata modu boş bir
arayüz değil, çevrilmemiş bir arayüzdü — gerçek ve tasarım gereği sessiz.

Kardeşi gibi bu geçit de **fark bilincine sahiptir**; birleştirme tabanındaki İngilizceyi çalışma
ağacıyla karşılaştırır. Böylece önceden var olan boşluklar dondurulmuş kalır ve geçidin etkinleştirilmesi
için herhangi bir geçiş gerekmez.

**Bir `__MISSING__:<english>` işaretçisi bu geçidi karşılamaz (2026-09-17'den beri).** Önceden bu,
belgelenmiş erteleme yöntemiydi — çalışma zamanı doğru İngilizceye geri döner — ancak 2026-09-16'da sekiz
özellik PR'ı 61 anahtar ekledi ve çevirmek yerine işaretçiyi 65 yerel ayarın tamamına bastı: bu geçit
hepsini kabul etti, PR'ları hiçbir şey engellemedi ve gerçek çeviri oranını zorunlu kılan engelleyici geçit
daha sonra sürüm ucunda herkes için başarısız oldu (pt-BR %3,2 > %2,5 + %0,5). Bir işaretçi artık eksik
çeviri olarak değerlendirilir. Kırmızı durumu
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ile veya
`npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, bağlantıdan bağımsız çalışabilir,
`OMNIROUTE_TRANSLATION_*` ortam değişkenleri olmadan başlamayı reddeder) kullanarak tüm yerel ayarlarda
paralel biçimde düzeltin. İngilizce kalması gereken bir anahtar (sabitlenmiş ürün/motor/bayrak adı),
hiçbir zaman bir işaretçinin arkasında değil, `scripts/i18n/untranslatable-keys.json` içinde yer almalıdır.
`vi`, işaretçileri tamamen yasaklar (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — bekletilen test geçidi

`vitest.config.ts` dosyasının `exclude` listesindeki bir dosya, çalışmayan bir testtir ve ağacı okuyan
kişiye kapsam varmış gibi görünür. Altmış iki dosya,
`// #8618 — önceden var olan hata; düzeltildiğinde bu hariç tutmayı kaldırın` yorumunun arkasında birikti.
#8618 numaralı kayıt 2026-08-11'de kapatılırken, izlediği liste 45 girdiden 62 girdiye çıktı ve her yeni
girdi kapanmış bir kayda işaret eden yorumu devraldı. Liste sonunda dosya bazında ölçüldüğünde (#13204),
**62 dosyanın 51'i kaynakta hiçbir değişiklik yapılmadan mevcut ağaçta başarılı oldu**.

Geçit, gerçek bir dosyaya çözümlenen her hariç tutmanın (a) bir izleme kaydı belirtmesini ve
(b) ölçülen durumuyla birlikte `config/quality/vitest-exclusions.json` içinde görünmesini zorunlu kılar.
Böylece yeni bir hariç tutma eklemek, 60 girdili bir diziye bir satır daha eklemek yerine özel bir dosyada
incelenebilir bir fark oluşturur. Hariç tutulan testleri kasıtlı olarak yeniden çalıştırmaz — bu işlem
yaklaşık 10 dakika sürer ve periyodik bir işe aittir; envanter, her birinin en son ne zaman ölçüldüğünü
kaydeder.
