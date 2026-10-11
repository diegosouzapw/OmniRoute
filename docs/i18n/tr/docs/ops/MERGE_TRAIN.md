# Merge Queue & Manual Merge-Train Runbook (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49'dan (kalite/hız planının WS3.2/WS3.4'ü) bu yana incelenmiş PR'ların
`release/vX.Y.Z` dalına varsayılan birleştirme yolu **Mergify birleştirme kuyruğudur**
(`.mergify.yml`); aşağıda belgelenen **manuel birleştirme treni** ise YEDEK YÖNTEMDİR —
olaylar, sürüm dondurmaları sırasında veya Mergify Açık Kaynak planı değişirse kullanılır.

## Varsayılan yol: Mergify kuyruğu

1. PR, kampanyalar tarafından incelenir/yeşil duruma getirilir ve sahibin birleştirme öncesi ⭐
   geçidinde onaylanır (rapor + öğe bazında karar — bkz. `/merge-prs` Adım 0.75).
2. Sahip (veya sahibin kararına göre hareket eden oturum) **`queue`**
   etiketini uygular. Etiket, birleştirme onayının KENDİSİDİR; Mergify yalnızca bunu yürütür.
3. Mergify, kuyruğa alınmış PR'ları hızlı geçitlere göre **seri olarak** (teker teker)
   doğrular ve birleştirir (squash). Gruplama + otomatik ikiye bölme, ücretli bir Mergify
   katmanıdır (ücretsiz planda "Cannot use Merge Queue batch", #7220); bu nedenle `.mergify.yml`
   herhangi bir `batch_size` ayarlamaz; gruplama, aşağıdaki manuel birleştirme treninin görevi
   olmaya devam eder. Denetimleri `checks_timeout` sonrasında hâlâ beklemede olan bir PR
   (240 dk. = `quality.yml` için ölçülen p95'in 2 katı), kuyruğu durdurmak yerine kuyruktan çıkarılır.
4. Birleştirme sonrasında, sürekli sürüm yeşil durum iş akışı push sırasında yeni uç noktayı
   doğrular ve kombinasyon gerilemeye yol açtıysa bir ilişkilendirme kaydı açar (asla otomatik
   olarak geri almaz).

Korkuluklar (`CLAUDE.md` Katı Kurallar #21/#22 ile aynıdır):

- **Sürüm dondurması açık** → dondurulmuş dalı hedefleyen PR'ları etiketlemeyin; önce
  etkin `release/vX+1` dalını hedefleyecek şekilde değiştirin.
- **Başka bir oturumun devam eden PR'ı** → asla etiketlemeyin; yalnızca sahibi olan oturum
  kendi çalışmasını kuyruğa alır.
- Yalnızca test değişiklikleri içeren ve `hotfix` etiketli PR'lar zaten azaltılmış CI'ı çalıştırır
  (bkz. `RELEASE_CHECKLIST.md` → Düzeltme Hızlı Şeridi); kuyruk koşulları, gerçekte çalıştırılmış
  olan denetim kümesini kabul eder (`#check-failure=0` + `#check-pending=0`).

## Yedek yöntem: manuel birleştirme treni

Kuyruk kullanılamadığında kullanılır. Bu, v3.8.47 döngüsü sırasında bir günde 33 PR'ın
tamamlanmasını sağlayan uygulamayı standartlaştırır:

1. **Toplu grubu oluşturun** (yaklaşık 10–30 incelenmiş+onaylanmış PR). `linked:` çakışmalarını
   (aynı `tap.testFiles`, aynı CHANGELOG bölümleri) denetleyin ve bunları sıraya koyun.
2. **BİR KEZ doğrulayın**: sürüm ucundan oluşturulmuş yalıtılmış bir worktree içinde tüm toplu grup
   head'lerini yerel olarak birleştirin, ardından sürümle eşdeğer paketi çalıştırın
   (`npm run check:release-green`; sürümden önce `--with-build` ekleyin).
   `scripts/release/merge-train.sh <base> <PR#>…`, 1–2. adımları otomatikleştirir (çakışan
   PR'lar çıkarılır, tren devam eder). Tam mod, `npm run test:unit` komutunu çalıştırır —
   sistem için ayarlanmış çalıştırıcıyı (`--test-concurrency=20`), 16 çekirdekli bir sistemde
   baskın aşamanın kapasitenin yaklaşık %25'inde çalışmasına yol açan iki sıralı 4 çekirdekli CI
   parçasını **değil** (2026-07-18 tarihinde düzeltildi). `--fast` (gün içi mega tren
   tamamlamaları, sahip tarafından 2026-07-18 tarihinde onaylandı) tüm statik kapıları + vitest'i
   korur ancak yalnızca trene alınan PR'lar tarafından değiştirilmiş node:test dosyalarını çalıştırır;
   TAM paket, birikmiş uç üzerinde yine de günde en az bir kez çalıştırılmalıdır
   (`--fast` olmadan bir tren).
3. **Yeşil** → PR'ları sırayla birleştirin (her birinden önce `state,headRefOid` değerlerini
   yeniden denetleyin — head'i değişmiş bir PR yeniden incelemeye girer). Her birleştirmenin net
   farkının PR'ın kendi değişikliği olduğunu kanıtlayın (otomatik çözümlemeyle geri alma yok:
   kapsam dışı silmeler için `git diff --stat` çıktısını denetleyin).
4. **Kırmızı** → tek tek yeniden doğrulamak yerine toplu grubu yarılara bölün (her yarıyı doğrulayın);
   soruna neden olan PR'ı kanıtlarla birlikte inceleme kuyruğuna geri gönderin.
5. **Asla yapmayın**: dondurma sırasında dondurulmuş dala birleştirme; herhangi bir yerde
   `git stash`; kırmızı durumun kaybolmasını umarak CI'ı topluca yeniden çalıştırma
   (kural: kırmızı durum bilgidir).

## Katmanlandırma (kuyruğun yalnızca hızlı kapılarla neden güvenli olduğu)

- **PR başına** (quality.yml hızlı kapıları): TIA'dan etkilenen testler + 4 parçalı tam birim
  testi + vitest + lint paketi + typecheck + dokümantasyon/changelog bütünlüğü.
- **Toplu grup/uç başına** (sürekli release-green): sürüm dalına yapılan her push'ta `--quick`
  KESİN kapıları; günde 3 kez tam `--with-build --full-ci` taramaları.
- **Sürüm başına** (sürüm PR'ındaki ci.yml): E2E ×9, paket artefaktı + tarball boot-smoke,
  coverage/ratchets dâhil eksiksiz matris.

Hiçbir şey eskisinden daha az doğrulanmıyor — ağır yüzey artık PR başına değil, toplu grup/uç
başına çalışıyor; O(N) gidiş gelişleri ortadan kaldıran da budur.

## `merge-train.sh` için temiz checkout önkoşulları

Betik, bozuk bir kurulumun asla kırmızı bir tren gibi görünmemesi için kök checkout üzerinde
(herhangi bir worktree işleminden önce) ilk hatada duran bir **ön kontrol** çalıştırır:

1. `npm ci`, ardından npm'in engellediği `bun` postinstall işlemini çalıştırın:
   `(cd node_modules/bun && node install.js)` — aksi takdirde `check:provider-consistency`
   ve `check:known-symbols` (ikisi de `bun scripts/…`) hem trende HEM DE base üzerinde,
   herhangi bir ihlal satırı olmadan başarısız olur.
2. Gereksiz `node_modules/node_modules` bulunmamalıdır (yinelenen bir bağımlılık ağacı; React iki kez
   yüklenir ve UI vitest paketleri anında başarısız olur).
3. `node_modules/.bin/tsc` mevcut ve çalıştırılabilir olmalıdır (kısmi bir kurulumda bu eksiktir).

Tren, engelleyici `npm run check:cycles:ratchet` komutunu çalıştırır; yalın `npm run check:cycles`
tavsiye niteliğindedir (SCC'leri listeler ve sağlıklı bir base üzerinde bile sıfır olmayan kodla çıkar).
