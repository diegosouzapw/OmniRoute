# Release Checklist (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Son güncelleme:** 2026-08-28 — v3.8.51
> Otomasyon için Claude Code becerilerinden yararlanan sadeleştirilmiş sürüm akışı.
>
> **Sürümler arasında kuyruğu/dalı yeşil tutun:** bkz. [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` ailesi + `npm run check:release-green` + `/babysit` + gecelik çalıştırma). Bunu düzenli aralıklarla — özellikle de bu kontrol listesinden **önce** — çalıştırmak, sürüm PR'ının yeşil başlamasını sağlar.

## Kısaca

```bash
# 1. Sürümü yükseltin + CHANGELOG oluşturun (beceri)
/version-bump-cc patch    # veya minor/major

# 2. Kalite kontrolünü yerel olarak çalıştırın
npm run check              # lint + testler
npm run test:coverage      # tam kapsam kontrolü (60/60/60/60)

# 3. Derleyin ve temel doğrulama testi yapın
npm run build
npm run test:e2e           # isteğe bağlıdır ancak önerilir

# 4. Sürümü oluşturun (beceri)
/generate-release-cc

# 5. Dağıtın (beceri)
/deploy-vps-both-cc        # veya akamai-cc / local-cc

# 6. Sürüm kanıtlarını yakalayın (beceri)
/capture-release-evidences-cc
```

## npm Trusted Publishing (v3.8.51'den beri varsayılan) — istek üzerine aşamalı, yedek seçenek olarak doğrudan

`npm-publish.yml`, varsayılan olarak **npm Trusted Publishing (OIDC)** üzerinden yayımlar:
`stage-npm` işi (GitHub tarafından barındırılır), GitHub'ın id-token'ını o çalıştırmaya özel
kısa ömürlü bir npm kimlik bilgisiyle değiştirir — depo gizli bilgilerinde uzun ömürlü npm
token'ı ve 2FA istemi yoktur; kaynak bilgisi eklenir.
Bu, 2FA'yı atlayan token'ların kullanımdan kaldırılmasıyla birlikte npm'in artık izin verdiği
atlatma yöntemidir; WS1.3 garantisini korurken projenin v3.8.48'e kadar sahip olduğu tamamen
otomatik akışı geri getirir (sızdırılmış bir token tek başına yayım yapamaz — çünkü token yoktur).

**Tek seferlik kurulum (sahip):** npmjs.com → `omniroute` paketi → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Bu yapılandırma mevcut olana kadar otomatik adım `ENEEDAUTH` ile başarısız
olur: `publish_mode=staged` (aşağıda) veya `direct` ile yeniden tetikleyin.

### Aşamalı yayımlama (istek üzerine — `publish_mode=staged`)

npm-publish iş akışı artık doğrudan yayımlamaz: paketlenmiş tarball'u başlatır
(`check:pack-boot`) ve ardından `npm stage publish` komutunu çalıştırır — birebir aynı baytlar
kayıt defterinde bekletilir ve sahip onaylayana kadar **kurulamaz**. İnsan tarafından uygulanan
2FA geçidi, kanıtlamadan önce değil SONRA olacak şekilde taşınmıştır.

**İş akışı yeşile döndükten sonra sahip tarafından izlenecek akış:**

1. `npm stage list omniroute` — aşama kimliğini bulun (iş akışı özetinde de yazdırılır).
2. Aşamalı baytları doğrulayın (önerilir): `npm stage download <id>`, ardından indirilen
   tarball'u geçici bir prefix içine kurup başlatın (`npm run check:pack-boot`, CI'da aynı
   paketle→kur→başlat sonucunu otomatikleştirir).
3. `npm stage approve <id>` — 2FA istemi yayımın KENDİSİDİR. `npm stage reject <id>` işlemi iptal eder.
4. Yayım sonrası güvenlik ağı: yayım sonrası doğrulayıcı (v3.8.49 planının WS1.4'ü), yayımlanan
   sürümü genel kayıt defterinden temiz bir container içine kurar ve başlatır.

**Acil durum yedek seçeneği:** `publish_mode=direct` ile `workflow_dispatch`, eski anında
`npm publish` davranışını geri getirir (yalnızca aşamalı yayımlamanın kendisi hatalı çalışırsa
kullanın; nedenini kaydedin).

**Tek seferlik sağlamlaştırma (sahip, npmjs.com):** `omniroute` için Trusted Publisher'ı
yalnızca aşamalı modda yapılandırın; böylece sızdırılmış uzun ömürlü bir token herhangi bir
yerden doğrudan `npm publish` çalıştıramaz — CI yalnızca aşamalandırabilir; yalnızca sahibin
2FA'sı yayıma izin verir.

**Bozuk yapıt çalışma planı (değişmedi):** varsayılan refleks olarak
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` kullanın (dakikalar içinde uygulanır,
geri alınabilir); `npm unpublish` komutunu yalnızca 72 saat/bağımlısı olmayanlar aralığında ve
asla ilk hamle olarak kullanmayın. Docker: bir sürüm etiketini asla yeniden yazmayın — geri alma,
`latest` etiketini son iyi digest'e yeniden yönlendirmektir.

**Docker Hub `latest` (her kararlı SemVer yayımında zorunludur):**
`docker-publish` iş akışı **hem** `X.Y.Z` etiketini **hem de**
`should-promote-latest.sh` bunun en yüksek kararlı SemVer olduğunu doğruladığında `:latest`
etiketini **aynı digest** ile etiketlemelidir. İşten sonra: Hub `latest` digest'i yeni
SemVer digest'ine eşit olmalı ve `last_updated` ilerlemiş olmalıdır. Sürüm notları yalnızca
git'te bulunan düzeltmelerden söz ederken `:latest` etiketini eski bir derlemede bırakmayın.
Compose hızlı başlangıçları `:latest` kullanır; GitOps ise `X.Y.Z` sabitlemesini sürdürmelidir.
Bkz. [Docker sürüm kanalları](../guides/DOCKER_GUIDE.md#release-channels) ve #10317.

## Hotfix Hızlı Hattı (`hotfix` etiketi)

`hotfix` etiketli bir PR, ağır CI matrisini (9 parçalı E2E, kapsam çıtası,
quality-gate, quality-extended) atlar ve hızlı, yüksek sinyalli kontrolleri korur: derleme,
birim testi parçaları, entegrasyon, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
ve tarball açılış duman testi (`check:pack-boot`). Hedef: ~33 dakika yerine ≤15 dakikada başarılı sonuç.

**Giriş politikası — dördü de zorunludur (Chromium/VS Code/Node acil durum hatları örnek alınmıştır):**

1. **Önem derecesi**: üretim bozuktur — yayımlanmış bir artifact açılışta çöker / bir
   güvenlik düzeltmesi gerekir / sürümün tüm kullanıcıları etkilenir. "Önemli", "bozuk" demek değildir.
2. **Yetki**: `hotfix` etiketini yalnızca depo sahibi uygular. Etiket ONAYIN
   KENDİSİDİR — bir kampanya PR'ında asla kişinin kendi başına kullanabileceği bir seçenek değildir.
3. **Kanıt**: PR gövdesi, önceki tamamen başarılı ağır çalıştırmaya (atlanmış işlerin
   yeniden doğrulayacağı paket) ve düzeltmenin önce başarısız, ardından başarılı olan kendi testine bağlantı verir.
4. **Kapsam**: yalnızca cherry-pick — minimum düzeltme; yeniden düzenleme ve beraberinde ek değişiklik yoktur.

Atlanan kapsam/çıta yüzeyi, release dalındaki bir sonraki tam çalıştırmayla
yeniden doğrulanır (sürekli başarılı release) — bu hat doğrulamayı değil, BEKLEMEYİ atlar.
Yalnızca test değişiklikleri (`tests/` altındaki tüm dosyalar, `tests/e2e/` altında hiçbir dosya olmaması)
herhangi bir etiket olmadan E2E matrisini otomatik olarak atlar.

## Ayrıntılı Kontrol Listesi

### Sürüm Öncesi

- [ ] Bu sürümü hedefleyen tüm PR'lar `release/vX.Y.0` dalına birleştirildi
- [ ] Bu sürümle ilgili tüm açık Linear/issue öğeleri kapatıldı veya sonraki kilometre taşına taşındı
- [ ] `release/vX.Y.0` dalında CI başarılı
- [ ] Kodda `TODO(release)` işaretleyicisi yok: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker temel imajı güncel (şu anda `node:24.15.0-trixie-slim`)

### Sürüm ve Değişiklik Günlüğü

- [ ] `/version-bump-cc <patch|minor|major>` komutunu çalıştırın (Claude Code becerisi)
  - `package.json`, `electron/package.json` sürümlerini artırır
  - Son etiketten bu yana yapılan git commit'lerinden `CHANGELOG.md` dosyasını yeniden oluşturur
  - README.md rozetlerini günceller
- [ ] CHANGELOG.md dosyasını elle inceleyin ve gerekirse commit mesajlarını düzenleyin
- [ ] `CHANGELOG.md` içindeki en son semver bölümünün `package.json` sürümüne eşit olduğundan emin olun
- [ ] Yaklaşan çalışmalar için `## [Unreleased]` bölümünü değişiklik günlüğünün ilk bölümü olarak tutun
- [ ] `docs/openapi.yaml` dosyasını güncelleyin → `info.version`, `package.json` sürümüne eşit olmalıdır

### Kod Kalitesi

- [ ] `npm run lint` — 0 hata (uyarılar önceden mevcuttur)
- [ ] `npm run typecheck:core` — temiz
- [ ] `npm run typecheck:noimplicit:core` — temiz (katı)
- [ ] `npm run check:cycles` — döngüsel bağımlılık yok
- [ ] `npm run check:any-budget:t11` — bütçe dahilinde
- [ ] `npm run check:route-validation:t06` — temiz
- [ ] `npm run check:node-runtime` — desteklenen minimum çalışma zamanı karşılanıyor (`>=22.22.2 <23`, `>=24.0.0 <27`; `src/shared/utils/nodeRuntimeSupport.ts` içindeki `SUPPORTED_NODE_RANGE` uyarınca; `package.json` içindeki `engines` ile uyumlu)

### Testler

- [ ] `npm run test:unit` — başarılı
- [ ] `npm run test:vitest` — başarılı (MCP sunucusu, autoCombo, önbellek)
- [ ] `npm run test:coverage` — 60/60/60/60 eşiği karşılanıyor (ifadeler/satırlar/fonksiyonlar/dallar)
- [ ] `npm run test:integration` — başarılı (değişiklikler DB / işleyicileri etkiliyorsa)
- [ ] `npm run test:combo:matrix` — başarılı (combo stratejisi matrisi: 19 genel yönlendirme stratejisinin tamamının seçim kararlarını deterministik olarak kanıtlar; combo yönlendirmesi, strateji çözümlemesi veya geri dönüş mantığı değiştirildiğinde çalıştırın)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **isteğe bağlı/manuel** (kapılı gerçek üst akış duman testi; VPS `root@192.168.0.15` üzerinden salt okunur bir DB anlık görüntüsü alır; gerçek sağlayıcılara istek gönderir, kredi tüketir; CI'da asla çalışmaz; kapı olmadan sorunsuz biçimde atlanır)
- [ ] `npm run test:combo:live:vps` — **isteğe bağlı/manuel** (3. Aşama VPS canlı duman testi: canlı `.15` sunucusuna düz Node ESM aracılığıyla gönderilen 7 HTTP senaryosu; `ssh root@192.168.0.15` gerektirir; yalnızca `__live_test__*` combo'larını oluşturur/siler; gerçek sağlayıcılara istek gönderir; CI'da asla çalışmaz)
- [ ] `npm run test:e2e` — başarılı (UI değişiklikleri)
- [ ] `npm run test:protocols:e2e` — başarılı (MCP/A2A değişiklikleri)
- [ ] `npm run test:ecosystem` — başarılı

### Hook'lar (Husky tarafından doğrulanır)

Husky hook'ları `.husky/` içinde bulunur ve git işlemleri sırasında otomatik olarak çalışır.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** hızlı deterministik kontroller — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (2026-06-13 tarihinde etkinleştirildi). `test:unit` kasıtlı olarak hariç tutulur (yavaş; CI `test-unit` işi tarafından kapsanır).
  - Release dallarını göndermeden önce `npm run test:unit` komutunu manuel olarak çalıştırın.

Bir hook başarısız olursa: temel sorunu düzeltin, `--no-verify` ile atlamayın.

### Conventional Commits

Release kapsamındaki tüm commit'ler `type(scope): subject` biçimini izlemelidir.

**Geçerli türler:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Geçerli kapsamlar:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Geriye dönük uyumsuz değişiklikler: `BREAKING CHANGE:` altbilgisi veya kapsamdan sonra `!` ekleyin (ör. `feat(api)!: drop /v0`).

### Dokümantasyon

- [ ] `npm run check:docs-sync` başarılı (pre-commit tarafından otomatik çalıştırılır)
- [ ] `npm run check:docs-all` başarılı (şemsiye komut: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` 0 koduyla sonlanıyor — kod ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` ortam değişkeni sözleşmesi bozulmamış
- [ ] `npm run check:doc-links` 0 koduyla sonlanıyor — yeniden yapılandırma sonrasında bozuk dahili markdown referansı yok
- [ ] `docs/architecture/ARCHITECTURE.md`, depolama/çalışma zamanı sapmaları açısından gözden geçirildi
- [ ] `docs/guides/TROUBLESHOOTING.md`, ortam değişkeni ve operasyonel sapmalar açısından gözden geçirildi
- [ ] `.env.example` değiştiyse: `docs/reference/ENVIRONMENT.md` güncellendi
- [ ] Yeni özelliğin bir kullanıcı arayüzü varsa: `docs/guides/USER_GUIDE.md` bu özellikten bahsediyor
- [ ] Yeni özelliğin bir API'si varsa: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` güncellendi
- [ ] Yeni özellik bir modülse: özel bir `docs/<MODULE>.md` mevcut
- [ ] Geriye dönük uyumsuz bir değişiklik varsa: `docs/guides/TROUBLESHOOTING.md` geçiş notu içeriyor

### i18n

- [ ] `npm run i18n:check` 0 koduyla sonlanıyor — çeviri durumu (`.i18n-state.json`) kaynak belgelerle senkronize (katı modda sapmış kaynak yok; son dakika belge rötuşları için uyarı modu tavsiyesi kabul edilebilir, ancak etiketlemeden önce 0 olmalıdır)
- [ ] `npm run i18n:check-ui-coverage` 0 koduyla sonlanıyor — her kullanıcı arayüzü yerel ayarı %80 kapsam alt sınırında veya üzerinde
- [ ] `npm run i18n:sync-ui:dry`, 42 yerel ayarın tamamında 0 eksik anahtar bildiriyor
- [ ] İngilizce kaynak belgeler değiştiyse etiketlemeden önce `npm run i18n:run` komutunu çalıştırın (`.env` içinde `OMNIROUTE_TRANSLATION_API_KEY` gerektirir)
- [ ] Küçük çaplıysa çeviri katkıları bir sonraki sürüme ertelenebilir (CHANGELOG içinde takip edin)

### Veritabanı Geçişleri

- [ ] `src/lib/db/migrations/` yeni dosyalar içeriyorsa:
  - [ ] Her geçiş idempotent (`CREATE TABLE IF NOT EXISTS` vb.)
  - [ ] Geçişler işlemler içine alınmış
  - [ ] Doğru numaralandırılmış (sıralamada boşluk yok)
- [ ] Temiz kurulumda test edin: `~/.omniroute/omniroute.db` dosyasını silin ve `npm run dev` komutunu çalıştırın
- [ ] Mevcut kurulumda test edin: Veritabanını yedekleyin, geçişi çalıştırın ve şemayı doğrulayın
- [ ] Geçiş tabloları yeniden yazıyorsa WAL dosyaları (`-wal`, `-shm`) doğru şekilde işlenmiş

### Sağlayıcı Kataloğu (Zod ile doğrulanmış)

- [ ] `src/shared/constants/providers.ts` Zod şeması yükleme sırasında geçerli
  - [ ] Tüm sağlayıcılar gerekli alanlara sahip (`id`, `label`, `kind` vb.)
  - [ ] Yeni ücretsiz sağlayıcılar için `freeNote` sağlanmış
  - [ ] OAuth sağlayıcılarının `oauthConfig` yapılandırması `src/lib/oauth/constants/oauth.ts` içinde kayıtlı
- [ ] Yeni sağlayıcı eklendiyse: `open-sse/executors/` içinde karşılık gelen yürütücü mevcut
- [ ] OpenAI dışı biçim kullanılıyorsa: `open-sse/translator/` içinde çevirici mevcut
- [ ] Modeller `open-sse/config/providerRegistry.ts` içinde kayıtlı
- [ ] `tests/unit/` içindeki birim testleri sağlayıcı sınıflandırmasını ve yönlendirmeyi kapsıyor

### Masaüstü (Electron)

`electron/` değiştiyse:

- [ ] `npm run electron:smoke:packaged` başarılı
- [ ] Derlemeler `:win`, `:mac`, `:linux` hedeflerinden en az biri için test edildi
- [ ] Kod imzalama sertifikalarının süresi dolmamış (imzalama yapılıyorsa)
- [ ] `electron/package.json` sürümü kök dizindeki `package.json` ile eşleşiyor
- [ ] `stable` kanalına sürüm yayımlanıyorsa otomatik güncelleme kanalı işaretçisi güncellendi

### Derleme Düzeni

Depo üç farklı çıktı dizini kullanır — bunları asla birbirine karıştırmayın:

| Dizin     | Amaç                                                           | İzleniyor mu?      |
| --------- | -------------------------------------------------------------- | ------------------ |
| `src/`    | Uygulama kaynağı (TypeScript / TSX)                            | Evet               |
| `.build/` | Derleme ara dosyaları — `next build` çıktısı (`distDir`)       | Hayır (gitignored) |
| `dist/`   | Dağıtılabilir npm paketi — `assembleStandalone` ile hazırlanır | Hayır (gitignored) |

> **Operatör notu:** uzak VPS görüntü dizini `/usr/lib/node_modules/omniroute/app/` olarak kalır.
> Yalnızca **depo içindeki** derleme çıktısı taşındı (`app/` → `dist/`). Dağıtım becerileri, `dist/`
> içeriğini uzaktaki `app/` dizinine rsync ile aktarır — VPS yollarında değişiklik gerekmez.

**Tek derlemeli akış:**

```
npm run build:release
  └─ rm -rf .build dist          (temizle)
  └─ next build → .build/next/   (ara dosyalar)
  └─ assembleStandalone          (standalone + static + public + natives içeriklerini → dist/ dizinine kopyalar)
  └─ dist/BUILD_SHA dosyasını yazar       (HEAD doğrulama işareti)
```

Dağıtım için `npm run build` ve ardından ayrı olarak `npm run build:cli` çalıştırMAYIN —
tek komutta temiz bir yeniden derleme + doğrulama işareti oluşturan `npm run build:release` komutunu kullanın.

### Artefakt Doğrulaması

- [ ] `npm run build:release` başarılı ve `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` temiz — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` veya başka yerel kalıntı yok
- [ ] Derlemeden sonra `dist/server.js` mevcut

### Etiketleme ve Sürüm Yayımlama

- [ ] `/generate-release-cc` komutunu çalıştırın (Claude Code becerisi):
  - `vX.Y.Z` etiketini oluşturur
  - Etiketi ve dalı gönderir
  - Değişiklik günlüğü içeriğiyle GitHub Release açar
  - Electron yükleyicilerini ekler (oluşturulduysa)
- [ ] Veya manuel olarak:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Dağıtım

Dağıtım becerileri hafif rsync akışını kullanır — `npm pack` veya `npm i -g` kullanılmaz:

- [ ] Hedefle eşleşen dağıtım becerisini kullanın:
  - `/deploy-vps-local-cc` — yerel VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — her ikisi
- [ ] Dağıtımdan önce `dist/BUILD_SHA` == `git rev-parse --short HEAD` olduğunu doğrulayın
- [ ] Derleme, `node_modules` dizininin gerçek olduğu bir yerde çalıştırılmalıdır (ana çalışma kopyası veya `npm ci` çalıştırılmış worktree — sembolik bağlantılı bir worktree DEĞİL)
- [ ] Dağıtılan örnekte hızlı doğrulama testi yapın:
  - `/dashboard/health` sayfasını açın → sürüm dizesinin sürümle eşleştiğini kontrol edin
  - Bilinen bir sağlayıcıya karşı `/v1/chat/completions` isteği çalıştırın
  - `/api/monitoring/health` yanıtının `CLOSED` devre kesiciler döndürdüğünü doğrulayın
  - MCP aktarımlarının yanıt verdiğini doğrulayın (`/mcp` HTTP, `/mcp-sse` SSE)

### Sürüm Sonrası

- [ ] `/capture-release-evidences-cc` komutunu çalıştırın (Claude Code becerisi)
  - Yeni özelliklerin WebP ekran görüntülerini/kayıtlarını alır
  - Sürüm notlarına / blog gönderisine ekler
- [ ] GitHub Discussions / Discord'u sürüm duyurusuyla güncelleyin
- [ ] Sonraki sürüm için kilometre taşı açın
- [ ] Kritikse: uygulama içi banner için tartışmayı sabitleyin veya `news.json` içinde yayımlayın

### Radar genel kullanıma sunma geçidi

Radar duyurusu kasıtlı olarak `active: false` ile commit edilmiştir. Etkinleştirme, aşağıdaki her maddeye ilişkin kanıt sunulduktan sonra yapılacak ayrı bir değişikliktir:

- [ ] Yığınlanmış tüm Radar PR'ları birleştirildi ve sürüm ucu CI durumu yeşil
- [ ] `RADAR_ENABLED` varsayılan olarak hâlâ kapalıyken açık kaynaklı Radar rotalarını dağıtın ve temel işlev testinden geçirin
- [ ] Belirtilen Radar ana makinesinde `GET /planos`, `/termos`, `/privacidade` ve `/reembolso` uç noktalarını temel işlev testinden geçirin
- [ ] Operatörün kimliğini/iletişim bilgilerini/adresini ve sahibi tarafından onaylanmış hukuki incelemeyi özel hizmete kaydedin
- [ ] Stripe Checkout'u ve imzalı webhook'u yalnızca test modunda sınayın
- [ ] Onaylı gönderen/alan adıyla şifrelenmiş bir işlemsel e-posta teslimatını sınayın
- [ ] Yedekten geri yüklemenin çalıştığını ve gözetimli, bütçesi sınırlandırılmış bir araştırma çalıştırmasını kanıtlayın
- [ ] Bağış kanıtını kabul etmeden önce BRL/PIX inceleme politikasını onaylayın
- [ ] Herkese açık Checkout'u yalnızca önceki geçitler tamamlandıktan sonra etkinleştirin, ardından yeni `news.json` kimliğini etkinleştirin
- [ ] Ana Sayfa banner'ının yerelleştirilmiş metin kullandığını ve eski bir kimlik kapatıldıktan sonra yeni bir kimliğin yeniden göründüğünü doğrulayın

## Gömülü Hizmetler duman testi (v3.8.4+)

Gömülü hizmet değişiklikleri içeren herhangi bir sürümü yayımlamadan önce şunları doğrulayın:

### Yeni veritabanıyla başlatma (geçiş çakışmalarını yakalar — v3.8.4 düzeltmesinden sonra eklendi)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — başlatma için 10 sn bekleyin
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'`, `"9router"` döndürür (404 DEĞİL, 500 DEĞİL). `071_services.sql` geçişinin uygulandığını ve satırın eklendiğini doğrular.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 3 satır döndürür.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 2 satır döndürür (`070_webhooks_kind_metadata.sql` geçişinin uygulandığını doğrular).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` başarılı olur — gelecekteki çakışmalara karşı koruma sağlar.

### 9Router

- [ ] `POST /api/services/9router/install`, 2 dakikadan kısa sürede `installedVersion` ile 200 döndürür
- [ ] `POST /api/services/9router/start`, 30 sn'den kısa sürede 200 ve `state: "running"` döndürür
- [ ] `GET /api/services/9router/status`, `health: "healthy"` bildirir
- [ ] `"model": "9router/auto/..."` ile `POST /v1/chat/completions`, 200 döndürür (9Router üzerinden uçtan uca yönlendirme)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard`, 9Router'ın yerel kullanıcı arayüzünü proxy içinde görüntüler (doğrudan `127.0.0.1:port` iframe'i kullanılmaz)
- [ ] `POST /api/services/9router/rotate-key`, `{ keyRotated: true }` döndürür ve hizmet sorunsuz şekilde yeniden başlatılır
- [ ] `POST /api/services/9router/stop`, 200 ve `state: "stopped"` döndürür
- [ ] `GET /api/services/9router/logs?tail=50`, son satırları içeren `snapshot` olayıyla bir SSE akışı döndürür
- [ ] PATH içinde `npm` bulunmayan bir ortamda kurulum, anlaşılır bir hata mesajıyla (yığın izleme olmadan) 500 döndürür

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install`, 2 dakikadan kısa sürede 200 döndürür
- [ ] `POST /api/services/cliproxy/start`, 30 sn'den kısa sürede 200 ve `state: "running"` döndürür
- [ ] `GET /api/services/cliproxy/status`, `health: "healthy"` bildirir
- [ ] `POST /api/services/cliproxy/stop`, 200 ve `state: "stopped"` döndürür
- [ ] `GET /api/services/cliproxy/logs?tail=50`, SSE akışı döndürür

### Güvenlik regresyonu

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start`, `403 LOCAL_ONLY` döndürür
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start`, `403 LOCAL_ONLY` döndürür
- [ ] `/api/services/*` kaynaklı hata yanıtları `err.stack` veya mutlak dosya yolları içermez

## v3.8.0+ kontrolleri

Herhangi bir v3.8.x sürümünü yayımlamadan önce şu ek öğeleri doğrulayın:

- [ ] `omniroute --tray`, macOS'te başlatılır (systray2, `~/.omniroute/runtime/` içine kurulmuş olmalıdır)
- [ ] `omniroute --tray`, Linux'ta başlatılır (DISPLAY gerektirir; ayarlanmamışsa düzgün bir hata verir)
- [ ] `omniroute --tray`, Windows'ta başlatılır (PowerShell NotifyIcon, ek ikili dosya yoktur)
- [ ] `omniroute config tray enable`, otomatik başlatma girdisi oluşturur; devre dışı bırakma işlemi girdiyi kaldırır
- [ ] `npm install -g omniroute@<this-version>`, kurulum sonrası işlemini ölümcül bir çıkış olmadan çalıştırır
- [ ] Güncelleme yolu isteğe bağlı bağımlılıkları korur: `omniroute update --apply` ve otomatik güncelleyici,
      `optionalDependencies` (better-sqlite3, keytar, tls-client ve llmlingua SLM yığını:
      `@atjsh/llmlingua-2@2.0.5`, `js-tiktoken`) güncellemeden sonra korunacak şekilde
      `npm install -g … --include=optional` çalıştırır. Ultra `modelPath` SLM katmanı ayrıca ilk
      kullanımda `${DATA_DIR}/models/llmlingua` konumuna otomatik olarak indirilen tinybert modeline
      ihtiyaç duyar. Kurulum sonrası işlem (`scripts/build/colocateOptionals.mjs`), ardından SLM'nin
      isteğe bağlı bağımlılık kümesini `dist/node_modules` içine birlikte yerleştirir; böylece worker,
      TEK bir `@huggingface/transformers` ^4.2.0 örneğini çözümler — bağımsız iz yalnızca transformers'ı
      paketler, dinamik olarak içe aktarılan isteğe bağlı bağımlılıkları paketlemez; dolayısıyla bu işlem
      olmadan worker, llmlingua-2'yi kökteki transformers ile yükler ve SLM katmanı sessizce açık geçiş yapar.
- [ ] `omniroute status`, `.env` olmadan çalışır (CLI belirteç yolu, yalnızca geri döngü)
- [ ] `curl http://localhost:20128/api/shutdown`, 401 döndürür (her zaman korunan rota)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse`, 401 döndürür (geri döngü koruması)
- [ ] SQLite çalışma zamanı ilk çalıştırmada `bundled` olarak çözümlenir (paketlenmiş ikili dosya platform için geçerlidir)
- [ ] `node_modules/better-sqlite3` silindiğinde SQLite çalışma zamanı `runtime` seçeneğine geri döner
- [ ] Akıllı MCP filtresi, gerçek `playwright-mcp browser_snapshot` çıktısını sıkıştırır (≥%50 azalma)
- [ ] 10 `skills/omniroute*/SKILL.md` dosyasının tümüne ham GitHub URL'si üzerinden herkese açık biçimde erişilebilir
- [ ] İlk kurulumda başlangıç sihirbazı "Nasıl Çalışır?" katman tanıtım adımını gösterir
- [ ] Ana pano katman kapsamı bileşeni, yapılandırılmış/etkin sayıları gösterir

---

## Geri Alma

Sürümde kritik bir sorun varsa:

1. `gh release edit vX.Y.Z --prerelease` (en son sürüm olarak işaretlenmesini kaldırır)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (yalnızca kullanıcılar tarafından henüz benimsenmediyse)
3. Veya: `release/vX.Y.0` üzerinde düzeltme → yama sürümü `vX.Y.(Z+1)`
4. GitHub Discussions ve Discord üzerinden derhal iletişim kurun

## Kesin Kurallar

- Asla doğrudan `main` dalına commit yapmayın
- `main` veya `release/*` dallarında asla `git push --force` kullanmayın
- Husky hook'larını asla atlamayın (`--no-verify`)
- Gizli bilgileri, kimlik bilgilerini veya `.env` dosyalarını asla commit etmeyin
- Kapsam ≥60/60/60/60 (ifadeler/satırlar/fonksiyonlar/dallar) seviyesinde kalmalıdır
- `src/`, `open-sse/`, `electron/` veya `bin/` içindeki üretim kodunu değiştirirken her zaman test ekleyin veya mevcut testleri güncelleyin

## Otomatik Senkronizasyon Kontrolü

Bir PR açmadan önce dokümantasyon senkronizasyon korumasını yerel olarak çalıştırın:

```bash
npm run check:docs-sync
```

CI da bu kontrolü `.github/workflows/ci.yml` içinde çalıştırır (lint işi).
