# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute, farklı kapsamlara sahip, süreç içinde yerel **iki** şerit sistemine sahiptir. Bunlar
birbirini tamamlar; operatörler hangisine baktıklarını bilmelidir.

## 1. Bayt düzeyinde süreç genelinde kabul (`chatBodyAdmission.ts`)

- **Kapsam:** `POST /v1/chat/completions`, `/v1/messages`,
  `/v1/responses` ve diğer sohbet biçimli rotalar için tamponlanan gövde/yığın
  yolu. Büyük kodlama ajanı gövdelerinden kaynaklanan yığın büyütmesine karşı
  koruma sağlar (#4380).
- **Anahtar başına hatlar değil, süreç genelinde tek bir denetleyici (#10110).**
  Her API anahtarı (karma değeri alınmış) veya `anonymous` oturumu **aynı**
  paylaşılan bütçeye göre kabul edilir — karma değeri alınmış oturum kimliği,
  kapasite bölümü olarak asla kullanılmadan YALNIZCA adil zamanlama anahtarı
  (bekleyenler arasında sıralı döngüyle dağıtım) olarak kullanılır. Bu belgenin
  önceki bir sürümü, bağımsız kapasiteye sahip anahtar başına hatları
  açıklıyordu; bu model, kimliği doğrulanmamış sahte kimlik bilgilerinin süreç
  genelindeki sınırı katlamasına izin verdiği için #10110 kapsamında kaldırıldı.
- **Geçit (#503-fanout): sabit bir istek sayısı değil, otomatik türetilen bir
  alım BAYT bütçesi.** Eski `CHAT_MAX_HEAVY_IN_FLIGHT` istek sayısı üst sınırı
  (bu düzeltmeden önce varsayılan `1`), kodlama ajanlarının dışa yayılımını
  (birden fazla alt ajan/CLI, gövdeler rutin olarak > 256 KB) yaklaşık `1`
  etkin eşzamanlılığa düşürüyor ve tamamen normal yük altında 503 hatalarına
  neden oluyordu. Artık yalnızca bir operatör açıkça
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ayarladığında bağlayıcıdır. Ayarlanmadığında
  kabul, bunun yerine `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` tarafından, yani
  sürecin gerçek bellek tavanından (`src/shared/middleware/admissionBudget.ts`)
  otomatik türetilen bir bütçe tarafından sınırlandırılır: V8 yığın sınırı ile
  herhangi bir cgroup/container sınırından daha düşük olanın %25'i, 8x geçici
  büyütme faktörüne bölünür ve 8 MiB ile 2 GiB arasında sınırlandırılır. Açık
  geçersiz kılmalar aynı sınırları kullanır. Bu, ortam değişkeni ayarı
  gerektirmeden 512 MB'lık bir container'dan 32 GB'lık bir masaüstüne kadar
  kendini ölçeklendirir. Etkin bütçeye sığamayan bir gövde hemen
  `413 body_exceeds_budget` ile başarısız olur; yalnızca tek tek işlenebilir
  gövdeler arasındaki çekişme, sınırlandırılmış adalet kuyruğuna girer. Canlı,
  çok sinyalli bir kaynak baskısı izleyicisi (V8 yığın oranı, cgroup, PSI, OOM
  olayları — `open-sse/utils/resourcePressurePolicy.ts`), `high` baskı altında
  sınırlandırılmış bekleme süresini kısaltır ve herhangi bir bayt alınmadan önce
  `critical` baskı altında yükü hemen `503 resource_pressure` ile reddeder. PSI,
  mevcut olduğunda bu birimin cgroup `memory.pressure` dosyasından okunur
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` sistem
  genelini kapsar ve yalnızca fiziksel makinede / cgroup v1'de geri dönüş
  seçeneğidir; böylece takas alanı kullanan bir ana makine, boşta olan bir
  container'ın 503 döndürmesine neden olamaz.
- **Ayarlama:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — otomatik türetilen bayt bütçesi için geçersiz kılma
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — eski istek sayısı üst sınırı, yalnızca isteğe bağlı
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503'ten önce kuyrukta bekleme süresi (varsayılan 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — kuyruktaki baytlar için yığın valfi (varsayılan 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110'dan beri kullanım dışı
    işlemsiz seçenekler (yapılandırma uyumluluğu için kabul edilir, yok sayılır)
- **Raporlar:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — #503-fanout
  eklemeleri `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` ve `countCapEnabled`
  dâhil (varsayılan bir dağıtımda false — gerçekte bağlayıcı olanın eski sayı
  üst sınırı değil, bayt bütçesi olduğunu doğrular).

## 2. Uyarlanabilir çalışma zamanı sanal şeritleri (`open-sse/services/admission`)

- **Kapsam:** sağlayıcı yönlendirmesi için kiracı anahtarı kabulü — kuyruk maliyeti, gecikme güdümlü
  sınır uyarlaması, şerit kuyruklama ve şerit metrikleri.
- **Etkinleştirme:** **isteğe bağlı.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` olmadığı sürece devre dışıdır. Bu olmadan,
  uyarlanabilir denetleyici paylaşılan kuyruk davranışını korur (#9654'ün 1. ölçütü yalnızca
  bir operatör şeritleri etkinleştirdiğinde karşılanır).
- **Yapılandırma:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + uyarlanabilir yapılandırma (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Raporlar:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (opak şerit kimlikleri, hiçbir zaman ham
  anahtarlar değil) ve `virtualLanes` — anlık görüntüdeki yetkili "şeritler açık" bayrağı.

## 3. Fan-out yoklamaları — combo/fusion için hedef başına kabul (#9654 Dalga 2)

Combo (öncelik / round-robin) ve fusion, tek bir üst istek altında N model hedefini
fan-out ile dağıtır. #9654 Dalga 2'den beri **her fan-out hedefi yönlendirmeden önce**
**üst isteğin** kiracı şeridine karşı hedef başına bir yoklama (`PerTargetAdmissionHook`,
`createPerTargetAdmissionHook` tarafından oluşturulur) ile denetlenir.

- **Kapsam:** combo, fusion ve chaos motoru tarafından yönlendirilen her fan-out hedefi.
  Sistem 1 (bayt düzeyi) bundan etkilenmez — fan-out hedeflerini hiçbir zaman yoklamaz.
- **Etkinleştirme:** **sistem 2 ile isteğe bağlı.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ayarlanmadığında işlem yapmaz — bu modda üst istek zaten paylaşılan kuyruk kirasını
  elinde tuttuğundan, yoklama çift sayım yapar ve combo hedeflerini reddederdi.
- **Anlam:**
  - **Kesinlikle bloklamaz — kuyruğa alma, atla.** `maxWaitMs 0`: dolu bir şerit
    hedefi atlar ve bunun yerine combo'nun geri dönüş mekanizması (veya fusion'ın
    hayatta kalanlar paneli) hizmet verir. Bu bilinçli bir tercihtir: fan-out hedefi
    gereksiz bir iştir ve onu kuyruğa almak, şeritlerin durdurmak için var olduğu
    sıkışıklığın üzerine daha fazla yük bindirir. Bu nedenle `defaultMaxWaitMs`
    **yalnızca üst istek** için geçerlidir; fan-out yoklamaları hiçbir zaman beklemez
    ve onları bekletecek bir **ayar bilinçli olarak yoktur** (sorun geçmişi, bekleme
    ayarlarının #9654'ün önlediği toplu 502/504 sınıfına yol açtığını gösteriyor —
    yalnızca bir operatör atlanan fan-out hedeflerinin yanıt kalitesine zarar verdiğini
    bildirirse yeniden değerlendirin).
  - **Kabulde serbest bırakma.** Kabul edilen bir yoklama kirasını hemen serbest bırakır:
    bu bir kapasite kapısıdır, kaynak tutma işlemi değildir. Üst isteğin kirası fan-out'u
    kapsar; N adet ek kira tutmak, paylaşılan etkin maliyeti şişirir ve diğer kiracıları
    reddederdi. Bu, bir rezervasyon değil, en iyi çaba yaklaşımıdır: şerit, yoklama ile
    yönlendirme arasında yeniden dolabilir; dolayısıyla yoğun çekişme altında kapı,
    hedef yönlendirilene kadar yeniden dolmuş bir şeride kabul verebilir.
  - **Gerçek fan-out gövdesine göre fiyatlandırılır.** Yoklama, maliyeti hedefin gerçek
    gövdesinden tahmin eder — tıpkı üst yol gibi, hedefin `stream` bayrağından türetilen
    istek sınıfı da buna dahildir — böylece fusion panel üyeleri (`stream: false`)
    gerçekten kullanacakları akışsız sınıfa, öncelik/RR hedefleri ise kullanıcının
    istediği sınıfa göre fiyatlandırılır.
- **Raporlar:** ilk hedeften sonraki bir yoklama atlaması, combo'nun istek başına
  `fallbackCount` değerini artırır (mevcut geri dönüş anlamını yansıtır; combo
  günlüklerinde görülebilir); tüm panel üyeleri atlandığında fusion 503 döndürür.
  Bugün anlık görüntüde **toplu sayaç yoktur** (ör. `virtualFanoutSkipped`) —
  bir operatör şerit kapısının fan-out hedeflerini ne sıklıkta atladığını belirleyemediğini
  bildirirse, bu bir sayaç eklemek için tetikleyici olur.

## Bir panoda hangisinin gösterildiği

- `adaptiveAdmission.laneCount` / `laneTenants` → **uyarlanabilir sanal şeritler** (sistem 2).
- `adaptiveAdmission.virtualLanes === true` → 3. bölümdeki fan-out probları da
  etkindir. `virtualLanes` alanı eksik veya `false` olan bir yük,
  `OMNIROUTE_CHAT_VIRTUAL_LANES` değişkeninin ayarlanmadığı anlamına gelir — bayt düzeyindeki şeritler (sistem 1)
  hâlâ etkindir, ancak bu özellik etkinleştirilene kadar `adaptiveAdmission` kapsamındaki hiçbir şey
  (ve hiçbir fan-out geçiş kontrolü) devrede değildir.

## Neden ikisi de var

Bayt düzeyindeki şeritler, yoğun bellek kullanan ayrıştırma/sıkıştırma yolunu sınırlar; uyarlanabilir şeritler ise
kiracı başına yönlendirme maliyetini sınırlar. #9654'ün 1. ölçütü ("bir oturumun ani yükü diğerinin
503 almasına neden olmaz"), sistem 1 tarafından koşulsuz olarak, sistem 2 tarafından ise isteğe bağlı özellik
etkinleştirildiğinde uygulanır.

## 4. Tek süreçte uzun `/v1/responses` (sağlıklı kapasite payı)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437), heap kullanımı
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` değerinin altındayken yapısal açıdan ağır ikinci bir isteğin
kabul edilmesi için `tryAcquireHealthyHeadroom` işlevini ekledi. `admitChatRequest` tarafından kullanılan BYTE
yolu (gövdeler ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
varsayılan 256 KiB; `POST /v1/responses` dâhil) **aynı** istisnayı kullanır.

Bu, ikiden fazla eşzamanlı uzun SSE `/v1/responses` için desteklenen **tek süreçli**
yöntemdir: birincil + sağlıklı kapasite payını yalnızca heap'in
ve süreç genelindeki devam eden isteklerin bayt bütçesinin (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) izin verdiği ölçüde artırın. Onlarca uzun SSE istemcisi (40–50), katı bir
“en fazla 2” ürün sınırı değil, bu bellek bütçesiyle ilgili bir konudur. Baskı altındaki bir heap, #7849'un
yeniden ortaya çıkmaması için yeniden denenebilir `503` yanıtlarıyla yük azaltmayı sürdürür.

**Heap sayısını artırmak** için N adet bağımsız `DATA_DIR` çalıştırın (#11024). Tek bir
SQLite dosyasında asla `replicas > 1` kullanmayın (#10350). Bu bölüm,
DATA_DIR ölçek genişletme yöntemini yeniden ele almamaktadır.
