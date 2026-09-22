# ADR: Pluggable persistence boundary (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Durum:** Önerildi — çalışma zamanı çalışmalarına başlanmadan önce bakım sorumlusu onayı gerektirir
- **Takip kaydı:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Kapsam:** Yalnızca kalıcılık mimarisi; bu karar harici bir veritabanı eklemez veya seçmez

## Bağlam

OmniRoute şu anda etki alanı odaklı kalıcılık işlevlerini `src/lib/db/` üzerinden sunarken,
`src/lib/db/core.ts` tarafından döndürülen paylaşılan bağlantı, `src/lib/db/adapters/types.ts`
içindeki eşzamanlı `SqliteAdapter` sözleşmesini uygular. Bu adaptör çeşitli SQLite çalışma zamanı
ortamlarını destekler, ancak sunduğu arayüz SQLite biçiminde kalır: eşzamanlı hazırlanmış ifadeler,
`pragma`, ertelenmiş ve anında işlemler, yerel/dosya kopyalama tabanlı yedekleme, denetim noktası ve
yerel veritabanı tanıtıcısı.

Mevcut başlatma ve kurtarma yolu da SQLite dosyasının yaşam döngüsünü yönetir.
`src/lib/db/core.ts`, `storage.sqlite` yolunu çözümler, süreç genelinde tek bir adaptörü korur, WAL
için denetim noktası oluşturur, kurtarma sırasında seçili tabloları muhafaza eder ve bir veritabanını
yeniden oluştururken SQLite yardımcı dosyalarını kaldırır. `src/lib/db/adapters/driverFactory.ts`
içindeki sürücü seçimi, desteklenen SQLite çalışma zamanı ortamları arasından seçim yapar; bu, harici
arka uçlara yönelik bir soyutlama değildir.

Şema evrimi de benzer biçimde sıkı bağlıdır. `src/lib/db/migrationRunner.ts`, numaralandırılmış SQL
dosyalarını uygular, `sqlite_master` ve `PRAGMA table_info` üzerinde inceleme yapar, isteğe bağlı FTS5
desteğini algılar ve geçiş çalışmalarını SQLite işlemleri içinde yürütür. `src/lib/db/backup.ts` ve
`src/lib/db/optimizationSettings.ts` gibi operasyonel modüller; yedekleme, `PRAGMA`, WAL, sayfa
boyutu, otomatik vakum ve `VACUUM` semantiğini doğrudan kullanır.

Bunlar, gömülü SQLite dağıtımının geçerli özellikleridir. PostgreSQL veya MySQL'i bir SQLite API'sini
taklit etmeye zorlamadan kullanılabilir kalmalıdırlar.

## Karar

Taşınabilir ve kalıcı durum için iki seviyeli bir kalıcılık sınırı benimsenecektir:

1. **Etki alanı depo sözleşmeleri**, iş ve yönlendirme kodunun ihtiyaç duyduğu kalıcılık işlemlerini
   tanımlar. Çağıranlar SQL metnine, hazırlanmış ifadelere, veritabanı dosyalarına veya lehçe
   nesnelerine değil, etki alanı davranışına ve etki alanı verilerine bağımlı olur.
2. **Dahili eşzamansız arka uç sözleşmesi**, depo uygulamalarını işlem bağlamları, sağlık/hazır olma
   durumu, geçiş koordinasyonu, arka uç yetenekleri ve sınıflandırılmış hatalarla destekler. Kesin
   TypeScript arayüzü, ilk uygulama PR'ı ile önerilecek ve uyumluluk testleriyle kanıtlanacaktır; bu
   ADR, varsayımsal bir API'yi kasıtlı olarak sabitlemez.

SQLite varsayılan uygulama olarak kalır. Mevcut SQLite sürücü zinciri ve eşzamanlı `SqliteAdapter`,
etki alanları küçük dikey dilimler hâlinde taşınırken SQLite depo uygulamasının arkasında kalır.
Hiçbir kullanıcının harici bir hizmet yapılandırması gerekmez.

PostgreSQL, depo sınırı SQLite'a karşı kanıtlandıktan sonra önerilecek ilk harici uygulamadır. MySQL,
ikinci bir iş mantığı çatallanması olarak değil, aynı uyumluluk paketiyle doğrulanan eş düzey bir
uygulama olarak bunu izler.

## Sınır kuralları

### Taşınabilir depo arayüzü

Taşınabilir bir depo şunları sunabilir:

- etki alanı okuma ve yazma işlemleri;
- açık atomik işlemler ve işlem kapsamlı depo erişimi;
- eşzamanlılık semantiğinin etki alanının parçası olduğu durumlarda karşılaştırma/güncelleme veya
  kiralama işlemleri;
- arka uçtan bağımsız sayfalama, sıralama ve kısıt hataları.

Arka uç sağlığı, hazır olma durumu ve geçiş koordinasyonu, ayrı ayrı etki alanı depoları yerine
dahili arka uç/operasyonel sözleşmeye aittir.

Taşınabilir bir depo şunları sunmamalıdır:

- `prepare`, `get`, `all`, `run` veya ham sürücü tanıtıcıları;
- `PRAGMA`, WAL denetim noktası modları, `VACUUM` veya sayfa/önbellek ayarlama işlevleri;
- SQLite dosya yolları, yardımcı dosyaları veya dosya kopyalama tabanlı yedekleme;
- arka uçlar arası bir etki alanı sözleşmesi olarak `lastInsertRowid`;
- FTS5 veya `sqlite-vec` söz dizimi;
- normal iş kodu tarafından kullanılan genel amaçlı bir lehçe kaçış mekanizması.

### Arka uç yetenekleri arayüzü

Arka uca özgü davranış açık ve keşfedilebilir kalır. Yalnızca SQLite'a özgü bakım işlevleri, aşağıdakiler
dâhil olmak üzere kendi uygulamasının ve operasyonel arayüzünün arkasında kalır:

- çalışma zamanı sürücüsü seçimi;
- WAL denetim noktası ve SQLite kapatma davranışı;
- sayfa boyutu, önbellek boyutu ve otomatik vakum ayarları;
- veritabanı dosyası yedekleme, geri yükleme ve kurtarma;
- SQLite şema incelemesi;
- FTS5 ve `sqlite-vec` entegrasyonu.

Harici bir arka ucun bu özellikleri taklit etmesi gerekmez. Depolar; taşınabilir bir yetenek kullanmalı,
belgelenmiş davranışa sahip arka uca özgü bir uygulama sağlamalı veya bir yeteneğin kullanılamadığını
bildirmelidir.

## İşlem ve migrasyon modeli

Repository API'leri atomik iş operasyonunu tanımlar; çağıranlar bir SQL işlem modu seçmez.
Her operasyon, gözlemlenebilir eşzamanlılık garantilerini tanımlamalıdır: korunan değişmezler, çakışma
algılama, yeniden deneme sınıflandırması, idempotans beklentileri ve işlem bağlamının aktarılması.
Uygulamalar, yalnızca bu gözlemlenebilir garantiler eşdeğer kaldığında farklı işlem ve izolasyon
mekanizmaları kullanabilir. SQLite, operasyonun sözleşmesini karşıladığı durumlarda mevcut ertelenmiş
veya anında işlem davranışını dahili olarak kullanmaya devam edebilir.

Harici backend'ler, birden fazla uygulama replikasının aynı şema değişikliği için yarışmasını önlemek
üzere açık migrasyon sahipliği gerektirir. Backend migrasyon geçmişleri mantıksal kilometre taşlarını
paylaşabilir ancak SQLite SQL dosyalarının başka bir diyalekte taşınabilir veya yeniden kullanılabilir
olduğu varsayılmaz.

## Backend'ler arası uyumluluk semantiği

Uyumluluk testleri yalnızca repository metodu imzalarını değil, davranışı da kapsamalıdır. Taşınan her
domain aşağıdakileri tanımlamalı ve doğrulamalıdır:

- zaman damgası saat dilimi, hassasiyeti ve serileştirmesi;
- `NULL` sıralaması, karşılaştırma düzeni ve büyük/küçük harf duyarlılığı beklentileri;
- JSON gösterimi ve karşılaştırma davranışı;
- tamsayı, ondalık sayı ve parasal değer hassasiyeti;
- sayfalandırma için kararlı sıralama ve deterministik eşitlik bozucular;
- SQLite satır kimliklerine dayanmayan kimlik oluşturma;
- benzersizlik ve yabancı anahtar ihlali sınıflandırması;
- etkisiz, karşılaştırma/güncelleme ve silme operasyonları için etkilenen satır davranışı;
- eşzamanlı yazma sonuçları, yeniden denenebilir çakışmalar ve idempotent yeniden denemeler.

Bir domain eşdeğer gözlemlenebilir semantiği belirtemiyorsa henüz taşınabilir değildir ve bu sözleşme
tasarlanana kadar backend'e özgü kalmalıdır.

## Uyumluluk gereksinimleri

Bu ADR'yi izleyen her uygulama şu özellikleri korumalıdır:

- SQLite, sıfır yapılandırmalı varsayılan olmaya devam eder.
- Mevcut SQLite dosyaları ve migrasyon geçmişi okunabilir kalır.
- npm, Electron, Docker ve kısıtlı çalışma ortamlarına yönelik SQLite geri dönüşleri mevcut başlatma yollarını korur.
- Saklanan sağlayıcı kimlik bilgileri, mevcut uygulama şifreleme davranışını kullanmaya devam eder.
- Bir repository migrasyonu; yönlendirme, kota, API anahtarı veya denetim semantiğini sessizce değiştirmez.
- Yedekleme ve kurtarma davranışı, evrenselmiş gibi sunulmak yerine her backend için ayrı ayrı belgelenir.
- Yalnızca SQLite kullanan temiz bir kurulum, harici bir veritabanı sürücüsü yüklemez veya gerektirmez.

## Teslimat sırası

1. Yeniden üretilebilir bir SQLite bağımlılık envanterini ayrı bir inceleme çıktısı olarak yayımlayın.
2. İlk domain repository sözleşmelerini ve uyumluluk testlerini kullanıma sunun.
3. Varsayılanları değiştirmeden mevcut SQLite uygulamasını bu sözleşmelerin arkasına uyarlayın.
4. Bakım sorumlularının onayına tabi olarak, sınırlı bir kontrol düzlemi bölümü için ilk harici uygulama olarak PostgreSQL'i ekleyin.
5. Paylaşılan durumu yalnızca eşzamanlı yazma ve migrasyon sahipliği testleri mevcut olduktan sonra genişletin.
6. Veritabanları arasında geçiş özelliğini duyurmadan önce çevrimdışı, doğrulanmış bir SQLite'tan harici backend'e migrasyon yolu ekleyin.
7. Kanıtlanmış repository ve backend sözleşmelerine uygun olarak MySQL'i ekleyin.

Her çalışma zamanı adımı ayrı ve incelenebilir bir PR'dır. Daha sonraki bir adım, daha önceki bir
adımda kanıtlanmamış bir soyutlamanın birleştirilmesini gerekçelendirmek için kullanılmamalıdır.

## İlk uygulama dilimi

İlk çalışma zamanı dilimi, bağımlılık envanteri incelendikten sonra seçilmelidir. Sağlayıcı
bağlantıları, API anahtarları, kombolar ve yönlendirme yapılandırması, temel tabloları
`src/lib/db/core.ts` içinde görülebildiğinden adaydır; ancak bu ADR bir tablo listesini veya geçiş
PR'ını onaylamaz. Dilim şunları içermelidir:

- SQLite davranışını koruma testleri;
- repository uyumluluk testleri;
- açık işlem sınırları;
- saklanan kimlik bilgileri için şifreleme ve redaksiyon doğrulaması;
- varsayılan başlangıç yapılandırmasında hiçbir değişiklik yapılmaması.

## Değerlendirilen alternatifler

### `SqliteAdapter` altına PostgreSQL eklemek

Reddedildi. `SqliteAdapter`, SQLite çalışma zamanları için bir uyumluluk katmanıdır ve SQLite'a özgü
işlemleri kullanıma sunar. Bu arayüzün taklit edilmesi, eşzamanlı ve diyalekte özgü varsayımların
yeni bir arka uca sızmasına neden olur.

### Genel bir sorgulama/yürütme API'sini tüm alanlara sunmak

Birincil sınır olarak reddedildi. Bu yaklaşım bağlantı yönetimini merkezileştirir, ancak SQL
diyalekti, işlem ve tablo bağımlılıklarını iş modüllerinde bırakır. Düşük seviyeli bir arka uç
temel öğesi, uygulamaya yönelik kalıcılık API'si olarak değil, repository uygulamalarının içinde
bulunabilir.

### Tek bir dilimi doğrulamadan önce tüm kalıcılık katmanını yeniden yazmak

Reddedildi. Mevcut kalıcılık yüzeyi geniştir ve dosya yaşam döngüsünü, kurtarmayı, aramayı ve
operasyonel ayarları içerir. Dikey dilimler, incelenebilir davranış ve geri alma sınırları sağlar.

### Varsayılan olarak SQLite'ı değiştirmek

Reddedildi. Gömülü ve masaüstü dağıtımları, mevcut sıfır hizmetli başlangıç modeline bağlıdır.
Harici bir arka uç isteğe bağlıdır.

### Dayanıklı otorite olarak Redis kullanmak

Reddedildi. Redis, açıkça geçici koordinasyonu, önbelleği veya sayaçları destekleyebilir; ancak
burada açıklanan dayanıklı repository sözleşmesinin yerini almaz.

## Sonuçlar

### Olumlu

- İş kodu, veritabanı diyalektinden bağımsız, kararlı bir kalıcılık sınırı kazanır.
- Harici bir arka uç soyutlamayı tanımlamadan önce SQLite davranışı test edilir.
- PostgreSQL ve MySQL, alan mantığını çoğaltmak yerine sözleşmeleri ve testleri paylaşır.
- Yalnızca SQLite'a özgü yetenekler, sızıntılı uyumluluk katmanlarına dönüşmek yerine birinci sınıf
  olarak kalır.
- Çok replikalı geçiş ve işlem davranışı, açık bir tasarım konusu hâline gelir.

### Maliyetler ve riskler

- Repository'lerin ayrıştırılması, çağrı noktalarının aşamalı olarak taşınmasını gerektirir.
- Asenkron sınırlar, şu anda eşzamanlı olan hizmet koduna yayılabilir.
- Arka uçlar arası semantik, SQL söz dizimi uyumluluğunun ötesinde uyumluluk testleri gerektirir.
- Yedekleme, arama, vektör depolama ve bakım yeteneklere özgü kalmaya devam eder.
- Birden fazla kalıcılık uygulaması çalıştırmak, CI ve operasyonel destek maliyetini artırır.

## Hedef dışı konular

Bu ADR şunları yapmaz:

- bir veritabanı bağımlılığı, ortam değişkeni, şema veya geçiş eklemek;
- çalışan SQLite singleton'ını veya sürücü zincirini değiştirmek;
- belirli bir sürümde PostgreSQL veya MySQL desteği vadetmek;
- FTS5'i, `sqlite-vec`'i, yedekleme dosyalarını veya SQLite bakımını taşınabilir hâle getirmek;
- paylaşılan durum ve koordinasyon testleri mevcut olmadan active-active hazırlığını tanımlamak;
- `src/lib/db/` dizininin tek seferde yeniden yazılmasını onaylamak.

## Bakım sorumlusu onayı için açık sorular

1. Depo ile dahili asenkron arka uç sınırının birlikte kullanılması tercih edilen yaklaşım mı, yoksa
   harici kalıcılık ayrı bir kontrol düzlemi hizmetinin arkasında mı yer almalı?
2. SQLite uyumluluğu sağlandıktan sonraki ilk harici uygulama olarak PostgreSQL kabul edilebilir mi?
3. İlk sınırlandırılmış depo dilimi hangi etki alanı olmalı?
4. İlk çoklu replika aşaması için hangi durum paylaşılmalı, hangisi düğüme yerel kalmalı?
5. Kesintiye uğramış veya geri alınmış bir depo geçişi için hangi uyumluluk aralığı gereklidir?

Bu sorular çözülene kadar bu belge bir öneri niteliğindedir ve herhangi bir çalışma zamanı yeniden düzenlemesi öngörülmemektedir.
