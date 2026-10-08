# 🗜️ Prompt Compression Guide — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Uygun bağlamda otomatik olarak %15-95 tasarruf edin. Hızlı bir genel bakış için [README Sıkıştırma bölümüne](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) bakın.

## Genel Bakış

OmniRoute, istekler üst sağlayıcılara ulaşmadan önce **proaktif olarak** çalışan modüler bir istem sıkıştırma işlem hattı uygular. Bu, token tasarrufunun şeffaf biçimde gerçekleştiği anlamına gelir — iş akışınızda herhangi bir değişiklik yapmanız gerekmez.

```
İstemci İsteği
  → Sıkıştırma Stratejisi Seçici
    → Kombinasyon geçersiz kılması? → Kombinasyon ayarını kullan
    → Otomatik tetikleme eşiği? → Otomatik modu kullan
    → Varsayılan mod? → Genel ayarı kullan
    → Kapalı? → Sıkıştırmayı atla
  → Seçilen Sıkıştırma Modu
    → Kapalı: Sıkıştırma yok
    → Hafif: Güvenli boşluk/biçimlendirme temizliği (~%15)
    → Standart: Mağara adamı tarzında dolgu ifadelerini kaldırma (~%30)
    → Agresif: Geçmiş yaşlandırma + özetleme (~%50)
    → Ultra: Sezgisel budama + kod bloklarını inceltme (~%75)
    → RTK: Komutları dikkate alan terminal/araç çıktısı filtreleme (üst sağlayıcı tarafında %60-90 aralığı)
    → Yığın: Sıralı çok motorlu işlem hattı, genellikle RTK ve ardından Caveman (uygun içerikte %78-95 aralığı)
  → Sıkıştırılmış İstek → Sağlayıcı
```

---

## Sıkıştırma Modları

### Kapalı

Sıkıştırma uygulanmaz. Tüm mesajlar değiştirilmeden iletilir.

### Hafif Mod (~%15 tasarruf, <1ms gecikme)

En güvenli mod — anlamsal değişiklik yoktur, yalnızca biçimlendirme temizliği yapılır:

| Teknik                   | Açıklama                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `collapseWhitespace`     | Ardışık boş satırları ve satır sonu boşluklarını birleştirir |
| `dedupSystemPrompt`      | Yinelenen sistem mesajlarını kaldırır                        |
| `compressToolResults`    | Ayrıntılı araç/fonksiyon çıktılarını sıkıştırır              |
| `removeRedundantContent` | Yinelenen talimatları kaldırır                               |
| `replaceImageUrls`       | Base64 görüntü veri URI'lerini kısaltır                      |

**En uygun kullanım:** Sürekli kullanım, güvenliğin kritik olduğu iş akışları.

### Standart Mod (~%30 tasarruf)

[Caveman](https://github.com/JuliusBrussee/caveman)'den esinlenmiştir — anlamı korurken dolgu sözcüklerini ve gereksiz uzun ifadeleri kaldırır:

- Dolgu sözcüklerini kaldırır ("lütfen", "bence", "temelde", "aslında")
- Gereksiz uzun ifadeleri kısaltır ("yapmak amacıyla" → "yapmak için", "sonucunda" → "nedeniyle")
- Nezaket amaçlı ihtiyatlı ifadeleri kaldırır ("Sakıncası yoksa...", "Mümkünse...")
- Kodlama istemleri için ayarlanmış 30'dan fazla regex kuralı

**En uygun kullanım:** Günlük kodlama iş akışları, maliyet bilincine sahip ekipler.

### Agresif Mod (~%50 tasarruf)

Uzun oturumlar için akıllı geçmiş yönetimi:

- **Mesaj Yaşlandırma** — eski mesajlar giderek daha fazla sıkıştırılır
- **Araç Sonucu Sıkıştırma** — uzun araç çıktıları kısaltılır veya atlanır (ilk/son satırlar,
  eşleşen satırları filtreleme, JSON anahtarlarını sıkıştırma)
- **Yapısal Bütünlük Korumaları** — `tool_use` + `tool_result` çiftlerinin tutarlı kalmasını sağlar
- **Bağlam Penceresi Farkındalığı** — modele özgü token sınırlarına uyar

**En uygun kullanım:** Uzun hata ayıklama oturumları, büyük kod tabanları.

### Ultra Mod (~%75 tasarruf)

Token kullanımının kritik olduğu senaryolar için maksimum sıkıştırma:

- **Sezgisel Budama** — düzyazının puana dayalı olarak token düzeyinde budanması
- **Yapı Koruma** — çitli kod blokları, satır içi kod, URL'ler ve tanımlayıcılar
  yer tutucularla korunup sözcüğü sözcüğüne yeniden birleştirilir; hiçbir zaman budanmaz
- **İsteğe bağlı SLM katmanı** — yapılandırıldığında küçük bir yerel model budamayı iyileştirebilir
- Agresif moddan bağımsızdır: mesaj yaşlandırma, araç sonucu sıkıştırma
  veya yedek özetleyiciyi çalıştırmaz (yalnızca bir SLM katmanı hatası, yedek geçişi
  agresif mod üzerinden yönlendirebilir)

**En uygun kullanım:** Bağlam sınırlarına sürekli ulaştığınız durumlar.

### RTK Modu (üst sağlayıcı tarafında %60-90 aralığı)

RTK modu, kodlama aracısı oturumlarında görülen ayrıntılı araç çıktıları için optimize edilmiştir:

- `git status`, `git diff`, `git log`, test çalıştırıcıları,
  TypeScript/Vite/Webpack derlemeleri, ESLint/Biome/Prettier, npm denetimleri/kurulumları, Docker günlükleri, altyapı
  çıktıları ve genel kabuk çıktıları gibi komut/çıktı sınıflarını algılar
- `open-sse/services/compression/engines/rtk/filters/` konumundaki JSON filtre paketlerini uygular
- Proje veya genel `filters.toml` dosyalarından RTK TOML şema v1 filtrelerini; satır içi test
  doğrulaması ve proje dosyaları için güven denetimiyle içe aktarır
- Satır içi doğrulama örnekleriyle birlikte 55 yerleşik filtre sunar
- ANSI kontrol dizilerini, ilerleme çubuklarını, yinelenen satırları ve işlem gerektirmeyen gürültüyü kaldırır
- Başarısızlıkları, hataları, uyarıları, değiştirilen dosyaları, özetleri ve uzun çıktıların son kısmını korur
- Güven denetimli proje filtrelerini, genel filtreleri ve isteğe bağlı olarak redakte edilmiş ham çıktı kurtarmayı destekler

**En uygun kullanım:** Kabuk, derleme, test, git, grep ve dosya çıktısı dökümlerini içeren aracı oturumları.

### Yığın Modu (uygun içerikte %78-95 aralığı)

Yığın modu, birden fazla sıkıştırma motorunu belirlenmiş bir sırayla çalıştırır. Varsayılan işlem hattı şöyledir:

```txt
RTK -> Caveman
```

Bu sıra önce terminal/araç çıktısını kompakt tutar, ardından kalan doğal dil istemine Caveman anlamsal yoğunlaştırmasını uygular.
Yığın işlem hatları genel olarak veya yönlendirme kombinasyonlarına atanmış
sıkıştırma kombinasyonları aracılığıyla yapılandırılabilir.

**En uygun kullanım:** Büyük araç günlükleriyle birlikte insan talimatları veya asistan özetleri içeren karma bağlam.

---

## Upstream Tasarruf Hesaplaması

OmniRoute, sıkıştırma tasarruflarını iki kaynağa dayanarak belgeler: upstream proje kıyaslamaları ve
OmniRoute'un kendi motor bileşimi.

| Kaynak  | Burada kullanılan upstream README değeri                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` daha az çıktı token'ı, kıyaslamalarda ortalama `65%` çıktı tasarrufu, `22-87%` aralığı ve `~46%` girdi sıkıştırma aracı |
| RTK     | Komut çıktısında `60-90%` tasarruf; örnek oturumda `~118,000 -> ~23,900` token veya `79.7%` tasarruf (`~80%`)                  |

Çakışan araç/bağlam yükleri için varsayılan OmniRoute kombinasyonu motorları üst üste uygular:

```txt
RTK -> Caveman
```

Birleşik tasarruflar toplamsal değil, çarpımsaldır:

```txt
birleşik = 1 - (1 - RTK tasarrufu) * (1 - Caveman girdi tasarrufu)
ortalama = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
aralık   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Bu `78-95%` değeri, hem RTK hem de Caveman aynı girdi/bağlam yükünü azaltabildiğinde geçerlidir.
Caveman yanıt çıktısı modu ayrıdır: etkinleştirildiğinde Caveman'ın kendi çıktı tasarruflarını kullanın
(`65%` ortalama, `~75%` öne çıkan değer, `22-87%` aralığı). Toplam faturalandırma tasarrufları,
istem/çıktı dağılımınıza bağlıdır.

### "Uygun" aslında ne anlama gelir?

Öne çıkarılan %15-95 aralığı gerçektir, ancak yalnızca **gereksiz tekrarlı veya ayrıntılı** içerikler
için geçerlidir — yinelenen hata satırları, aynı uyarıyı tekrar tekrar yazdıran bir derleme günlüğü,
aşırı büyük bir `grep`/dosya okuma dökümü. Bu, her isteğin bu kadar tasarruf sağlayacağı anlamına
**gelmez**.

Deneysel olarak doğrulanmıştır (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`):
300 aynı hata satırı içeren Anthropic biçimindeki bir `tool_result` bloğu üzerinde gerçekleştirilen
bir `stacked` (RTK + Caveman) çalıştırması, **%95.93 token tasarrufu / %96.26 karakter tasarrufu**
sağladı — bu değer doğrudan belirtilen aralığın içindedir. Ancak aynı işlem hattı normal, tekrarsız
araç çıktısı (temiz bir `grep` eşleşme listesi, kısa bir dosya okuması, sıradan konuşma metni)
üzerinde çalıştırıldığında, kaldırılabilecek tekrarlı bir şey olmadığı ve `validateCompression()`
(`validation.ts`) kod bloklarını, URL'leri, başlıkları, sürümleri veya TAMAMI-BÜYÜK-HARF sabit
tanımlayıcılarını kaldıracak ya da değiştirecek bir yeniden yazımın gönderilmesine izin vermediği
için doğru şekilde **sıfıra yakın tasarruf** sağlar.

Bu bir hata değil; beklenen ve güvenli bir davranıştır: çoğunlukla temiz dosyaları okuyan/grep ile
arayan bir kodlama oturumu, sıkıştırma tamamen etkin olsa bile sınırlı toplam tasarruf görürken,
başarısız bir döngüyle veya çok fazla çıktı üreten bir linter ile karşılaşan bir oturum, bu trafikte
%78-95 aralığının tamamını görecektir. Tek bir oturumdaki düşük toplam tasarruf yüzdesini,
sıkıştırmanın yanlış yapılandırıldığına kanıt olarak kullanmayın — önce temel araç çıktısının
gerçekten tekrarlı olup olmadığını kontrol edin.

---

## Token Tasarrufu Görselleştirmesi

```
Sıkıştırma olmadan:  LLM'ye 47K token gönderilir
Lite ile:            40K token gönderilir          (%15 tasarruf — güvenli, her zaman etkin)
Standard ile:        33K token gönderilir          (%30 tasarruf — caveman-speak kuralları)
Aggressive ile:      24K token gönderilir          (%50 tasarruf — yaşlandırma + özetleme)
Ultra ile:           12K token gönderilir          (%75 tasarruf — sezgisel budama)
RTK ile:             19K-5K token gönderilir       (komut/araç çıktısında %60-90 tasarruf)
Stacked ile:         10K-2.5K token gönderilir     (uygun RTK+Caveman içeriğinde %78-95 aralığı)
```

---

## Yapılandırma

### Kontrol Paneli

`Dashboard → Context & Cache` bölümüne gidin:

- **Caveman** — mod seçimi, dil paketleri, önizleme ve genel varsayılanlar
- **RTK** — komut filtresi önizlemesi, RTK güvenlik ayarları ve filtre kataloğu
- **Compression Combos** — yönlendirme kombinasyonlarına atanan adlandırılmış motor işlem hatları
- **Auto-Trigger Threshold** — belirteç sayısı eşiği aştığında sıkıştırmayı otomatik olarak etkinleştirir

### Kombinasyon Başına Geçersiz Kılma

`Dashboard → Context & Cache → Compression Combos` bölümünde, bir yönlendirme kombinasyonuna bir
sıkıştırma kombinasyonu atayın:

```txt
Kombinasyon: "free-tier-fallback"
  Sıkıştırma Kombinasyonu: "coding-agent-stack"
  İşlem Hattı: RTK -> Caveman
  Hedefler:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu, ücretli aboneliklerde lite modunu korurken ücretsiz/kodlama sağlayıcılarında yığınlanmış
sıkıştırma kullanmanıza olanak tanır.

Bu "Kombinasyon Başına Geçersiz Kılma" ataması, **yönlendirme kombinasyonu sıkıştırma
modu** geçersiz kılmasından (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — alanın
şeması ayrıca `rtk`, `stacked` ve `omniglyph` değerlerini de kabul eder) farklı bir denetimdir — bu geçersiz
kılma, adlandırılmış bir sıkıştırma kombinasyonu işlem hattı seçmez; yalnızca
`resolveCompressionPlan` tarafından kullanılan `compressionMode` alanını ayarlar. Bu ayar, kombinasyon kartında
(`Dashboard → Combos`) veya #6760'tan bu yana
`Dashboard → Context & Cache → Compression Combos` bölümündeki "Assign to routing" listesinde, yukarıda
belgelenen işlem hattı atama onay kutusunun hemen yanında, yönlendirme kombinasyonu bazında yapılabilir.
Her iki arayüz de aynı `PUT /api/combos/{id}` uç noktası üzerinden kalıcı hâle getirilir.

### İstek başına geçersiz kılma

Tek bir isteğin sıkıştırma planını geçersiz kılmak için `x-omniroute-compression` istek üstbilgisini
gönderin. Bu, en yüksek önceliğe sahiptir — yönlendirme kombinasyonu geçersiz kılmasını, etkin profili,
otomatik tetiklemeyi ve paneldeki Default ayarını geçersiz kılar. Bilinmeyen değerler yok sayılır (istek hiçbir zaman reddedilmez) ve
genel ana anahtar yine de her şeyi denetler: sıkıştırma genel olarak kapalıyken üstbilgi bunu
açamaz. Değerler:

| Değer         | Etki                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `off`         | Bu istek için sıkıştırma uygulanmaz.                                                                          |
| `default`     | Panelden türetilen Default profili (etkin profili yok sayar). Kayıplı motorlar kapalı bırakılır.              |
| `safe`        | Üstbilginin belirtilmemesiyle aynıdır: yalnızca yinelenenleri kaldırma ve boşluk daraltma uygulanır.          |
| `allow-lossy` | Özetler, ilgi filtreleri ve stil yeniden yazımları dâhil olmak üzere bu isteğin operatör planını korur.       |
| `engine:<id>` | Etkinleştirilmişse tek bir motor, ör. `engine:rtk`. Bu, söz konusu motor için istek başına katılımdır.        |
| `<combo>`     | Önce ada göre (büyük/küçük harfe duyarsız), ardından kimliğe göre eşleştirilen adlandırılmış bir kombinasyon. |

`allow-lossy`, `engine:<id>` veya adlandırılmış bir kombinasyon olmadan kayıplı motorlar uygulanmaz.
Sıkıştırma açıkken isteğe yine de oturum yinelenenlerini kaldırma ve boşluk daraltma uygulanır.

Uygulanan plan, `X-OmniRoute-Compression: <mode>; source=<source>` yanıt
üstbilgisinde geri bildirilir; burada `<source>`, `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` veya `off` değerlerinden biridir.

### API

```bash
# Sıkıştırma ayarlarını al
curl http://localhost:20128/api/settings/compression

# Sıkıştırma ayarlarını güncelle
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Belirli bir RTK/stacked yükünü önizle
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtre paketlerini listele
curl http://localhost:20128/api/context/rtk/filters

# İsteğe bağlı komut meta verileriyle RTK'yı doğrudan test et
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Neler Korunur

Sıkıştırma motoru **her zaman şunları korur:**

- ✅ Kod blokları (çitle çevrili ve satır içi)
- ✅ URL'ler ve dosya yolları
- ✅ JSON yapıları ve yapılandırılmış veriler
- ✅ Tanımlayıcılar ve korunan teknik belirteçler
- ✅ Matematiksel ifadeler
- ✅ Araç/fonksiyon çağrısı tanımları
- ✅ Sistem istemleri (lite modunda)

RTK ham çıktı kurtarma özelliği; herhangi bir şey kalıcı olarak saklanmadan önce yaygın API anahtarlarını, bearer belirteçlerini, Slack belirteçlerini, AWS erişim anahtarlarını, parolaları, belirteçleri ve gizli bilgileri sansürler.

---

## Sıkıştırma İstatistikleri

Sıkıştırılan her istek, sunucu günlüklerinde istatistikler içerir:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Aşama Yol Haritası

| Aşama    | Modlar                                                                                                                                                                | Durum         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Aşama 1  | Kapalı, Lite                                                                                                                                                          | ✅ Yayınlandı |
| Aşama 2  | Standard, Aggressive, Ultra                                                                                                                                           | ✅ Yayınlandı |
| Aşama 3  | RTK, Stacked, Sıkıştırma Kombinasyonları                                                                                                                              | ✅ Yayınlandı |
| Aşama 4  | Çıktı Stilleri, SLM katmanlı Ultra, değerlendirme düzeneği                                                                                                            | ✅ Yayınlandı |
| Aşama 4C | Uyarlanabilir bağlam bütçesi ("kadran") — hesaplama motoru + API (`PUT /api/settings/compression` üzerinde `contextBudget`) + kontrol paneli mod/politika denetimleri | ✅ Yayınlandı |

---

## Teşekkürler

Standard modu sıkıştırma kuralları, **[JuliusBrussee](https://github.com/JuliusBrussee)** tarafından geliştirilen **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) projesinden esinlenmiştir — viral olan "az belirteç iş görüyorsa neden çok belirteç kullanılsın" projesi. Caveman; `~75%` daha az çıktı belirteci, kıyaslamalarda ortalama `65%` çıktı tasarrufu, `22-87%` çıktı aralığı ve `~46%` giriş sıkıştırma aracı bildirmektedir.

RTK modu, **[RTK AI](https://github.com/rtk-ai)** tarafından geliştirilen **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** projesinden esinlenmiştir — terminal, derleme, test, git ve araç çıktısı filtreleme için yüksek performanslı komut çıktısı sıkıştırma projesi. RTK, README örnek oturumunda `~80%` tasarruf göstererek `60-90%` tasarruf bildirmektedir.

---

## Gelişmiş Sıkıştırma Sistemleri

Yukarıda açıklanan 7 modun ötesinde (kaynak ayrıca bu kılavuzda ele alınmayan `codex-responses` ve `omniglyph` modlarını da kabul eder), aşağıdaki bölümler bu modların içinde veya yanında çalışan özellikleri ele alır: Araç Sonucu Sıkıştırma ve Aşamalı Eskitme, agresif motorun 1. ve 2. adımlarıdır (Aggressive modu ve yığınlı bir işlem hattının `aggressive` adımı); Yığınlı İşlem Hattı, Stacked modunun nasıl çalıştığını belirler; Önbellek Duyarlı Sıkıştırma, sıkıştırma açıkken önbellekleme sağlayıcıları için `aggressive` ve `ultra` modlarını `standard` moduna düşürür; Caveman Çıktı Modu ve Çıktı Stilleri ise varsayılan olarak kapalı olan ve isteği sıkıştırmak yerine modelin çıktısını şekillendiren, isteğe bağlı sistem istemi talimatlarıdır.

### Önbellek Duyarlı Sıkıştırma

Bazı sağlayıcılar (istem önbellekleme özelliğine sahip Anthropic gibi), maliyetleri ve gecikmeyi azaltmak amacıyla istemin bölümlerini önbelleğe almalarına olanak tanıyan **istem önbelleklemeyi** destekler. Önbellekleme etkinleştirildiğinde agresif sıkıştırma, önbelleğe alınan belirteçleri değiştirip önbelleği geçersiz kıldığı için performansa gerçekten **zarar verebilir**.

`cachingAware.ts` modülü, **önbellekleme bağlamını algılayarak** ve **sıkıştırma stratejisini buna göre ayarlayarak** bu sorunu çözer.

#### Nasıl çalışır

1. **Önbellekleme bağlamını algıla** — İstek gövdesini `cache_control` işaretçileri için tarar
2. **Önbellekleme sağlayıcılarını belirle** — Hedef sağlayıcının önbelleklemeyi destekleyip desteklemediğini denetler
3. **Stratejiyi ayarla** — Önbellekleme sağlayıcıları için `aggressive`/`ultra` modlarını `standard` moduna düşürür
4. **Sistem istemini atla** — Sistem istemleri genellikle önbelleğe alınır; bu nedenle bunları sıkıştırmaz

Strateji yardımcısı ayrıca bir `deterministicOnly` bayrağı döndürür, ancak plan oluşturucu yalnızca stratejiyi kullanır — bugün aşağı akışta hiçbir şey bu bayrağı okumaz.

#### Kod örneği

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Önbellek işaretçisi
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Ne zaman kullanılır

Önbellek duyarlı sıkıştırma **her zaman açıktır** — yapılandırma gerekmez. Sıkıştırma açık olduğunda ve hedef sağlayıcı istem önbelleklemeyi desteklediğinde (Anthropic, OpenAI vb.) devreye girer; açık `cache_control` işaretçileri gerekli değildir — önbellekleme sağlayıcısının varlığı tek başına mod düşürmeyi tetikler, işaretçiler ise bunu hiçbir zaman tek başına tetiklemez (işaretçi algılama, strateji kararını değil önbellek telemetrisini besler).

### Aşamalı Eskitme

Uzun konuşmalarda çok sayıda mesaj sırası birikir, ancak eski sıralar zamanla daha az ilgili hâle gelir. `progressiveAging.ts` modülü, **mesajları sıra uzaklığına göre kademeli olarak sadeleştirir** (uzaklık, konuşmanın sonundan itibaren ölçülür). Yayınlanan varsayılanlarla (`verbatim: 2, light: 2, moderate: 3`):

- **Son 2 tur (mesafe ≤ 2)**: Olduğu gibi korunur
- **Mesafe 3**: Mağara adamı sıkıştırması (dolgu ifadelerinin kaldırılması)
- **Mesafe 4+**: Asistan mesajları özetlenir; kullanıcı mesajları ilk
  satırlarına indirgenir ve 120 karakterle sınırlandırılır; diğer roller değiştirilmez. Sistem istemleri, daha önce eskitilmiş
  mesajlar ve en son kullanıcı mesajı, mesafeden bağımsız olarak her zaman olduğu gibi korunur.
  Hiçbir şey tamamen kaldırılmaz ve gönderilen varsayılanlarla `light`
  bandına ulaşılamaz (`light`, `verbatim` ile aynıdır).

#### Kod örneği

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "Yardımcı bir asistansın" },
  { role: "user", content: "2+2 kaçtır?" },
  { role: "assistant", content: "4" },
  // ... 50 tur daha ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // son 3 tur: olduğu gibi
  light: 8, // mesafe <= 8: hafif sıkıştırma
  moderate: 20, // mesafe <= 20: mağara adamı sıkıştırması
  fullSummary: 5, // tür tarafından zorunlu tutulur, bantlama kodu tarafından okunmaz
  // mesafe > 20: özetlenir (asistan) / ilk satır korunur (kullanıcı)
});

// saved = tasarruf edilen token sayısı
```

#### Ne zaman kullanılmalı

Aşamalı eskitme, `aggressive` modu için **her zaman açıktır** — `compressAggressive()` işlevinin 2. adımıdır. Ultra modu bunu çalıştırmaz. Özellikle şunlar için etkilidir:

- Uzun süreli kodlama oturumları
- Birden fazla güne yayılan konuşmalar
- Çok sayıda araç çağrısı içeren ajan tabanlı iş akışları

### Mağara Adamı Çıktı Modu

Mağara adamı çıktı modu, modelin kendisinden kısa ve öz çıktı isteyen **sistem istemi talimatları**
ekler — `lite` seviyesi tam cümleleri koruyan özlü yanıtlar ister, `full`
seviyesi modelden "akıllı mağara adamı gibi kısa yanıt vermesini" ister ve `ultra` seviyesi telgraf tarzında çıktı ister;
talimatlar yalnızca istekte bulunur, bunu garanti edemez. İstekler bu talimatları
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) aracılığıyla alır:
`open-sse/handlers/chatCore.ts` önce geriye dönük uyumluluk ara katmanıyla seçimi çözümler
(`open-sse/services/compression/outputStyles/backCompat.ts` içindeki
`resolveOutputStyleSelection()`); bu katman, `outputStyles`
boşken etkinleştirilmiş bir `cavemanOutputMode` değerini
`cavemanOutputMode.intensity` yoğunluğundaki `terse-prose` çıktı stiline eşler
(aşağıdaki Geriye dönük uyumluluk bölümüne bakın); boş olmayan bir `outputStyles`
seçimi olduğu gibi kullanılır ve bu durumda `cavemanOutputMode.enabled` ile `intensity` hiçbir
etkiye sahip olmazken `autoClarity` anahtarı uygulanmaya devam eder. `outputMode.ts`,
talimat metinlerini (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), içerik baypasını ve eklemenin kullandığı
yerleştirme yardımcısını barındırır; kendi `applyCavemanOutputMode()` enjektörünün
üretimde bir çağırıcısı yoktur.

#### Nasıl çalışır

Bu mod girdiyi sıkıştırmaz. Sistem istemine bir talimat bloğu ekler
(aşağıdaki Eklemenin nasıl çalıştığı bölümüne bakın) ve istek için seçilen herhangi bir girdi sıkıştırma modu,
artık bu bloğu taşıyan gövde üzerinde daha sonra çalışmaya devam eder. Her seviyenin sonunda bulunan ortak
sınırlar maddesinden önce, İngilizce `full` seviyesi şöyledir:

> "Akıllı mağara adamı gibi kısa yanıt ver. Tanımlıkları (a/an/the), dolgu ifadelerini (just/really/basically/actually/simply), nezaket ifadelerini ve ihtiyatlı ifadeleri çıkar. Eksik cümleler kullanılabilir. Kısa eş anlamlılar kullan (extensive yerine big, implement yerine fix). Tüm teknik içeriği, kodu, hataları, URL'leri ve tanımlayıcıları eksiksiz koru."

Bu, özellikle şunlar için iyi çalışır:

- Kod üretimi (daha özlü çıktı = daha az token)
- Hızlı soru-cevap (ayrıntılı açıklamalara gerek yoktur)
- Toplu işleme (iş hacmini en üst düzeye çıkarır)

#### Ne zaman kullanılmalı

Mağara adamı çıktı modu **isteğe bağlıdır**. Sıkıştırma açıkken (`enabled: true`, Sıkıştırma Ayarları
sayfasındaki ana anahtar), bunu `cavemanOutputMode.enabled` ile açın; `intensity`
değeri `lite`, `full` veya `ultra` seçeneklerinden birini belirler:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Bir sıkıştırma kombinasyonunun **Çıktı Modu** anahtarı (`outputMode`, seviye ise `outputModeIntensity`
içindedir), kombinasyonun uygulandığı istekler için aynı anahtarı ayarlar ve
`omniroute_set_compression_engine` MCP aracı bunu boolean `outputMode`
argümanı üzerinden yazar. Boş olmayan bir `outputStyles` seçimi bu anahtara göre önceliklidir. Kontrol
panelinde **Özlü düzyazı** çıktı stilinin etkinleştirilmesi aynı bloğu ekler (aşağıdaki Çıktı
Stilleri bölümüne bakın).

### Çıktı Stilleri (katalog)

Yukarıdaki mağara adamı çıktı modu, **eski tek stilli yoldur**. Aşama 4, bunu
birlikte kullanılabilir çıktı stilleri kataloğuna genelleştirmiştir:
`open-sse/services/compression/outputStyles/catalog.ts` içindeki `OUTPUT_STYLE_CATALOG`. Her stil,
modelin kendisinden daha düşük maliyetli çıktı isteyen bir sistem istemi talimatıdır; stiller birlikte
etkinleştirilebilir ve katalog sırasına göre eklenir.

| Stil                                    | `id`          | Ne yapar                                                                                                                                                                                                                            | Talimat dilleri                                      |
| --------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Kısa anlatım                            | `terse-prose` | Dolgu sözcüklerini/tanımlıkları/kaçamak ifadeleri çıkarır; teknik içeriği eksiksiz korur. Eski mağara adamı çıktı moduyla aynı metindir (atıfta bulunulur, yeniden yazılmaz).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| Daha az kod                             | `less-code`   | YAGNI basamakları: çalışan en küçük değişiklik, istenmeyen soyutlama yok.                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| At kuyruğu (tembel kıdemli geliştirici) | `ponytail`    | "En iyi kod, hiç yazılmamış koddur": yeniden yazmak yerine yeniden kullanma, belirti yerine kök neden, çalışan en kısa diff.                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| ADHD'yim (önce eylem)                   | `i-have-adhd` | Önce eylem (açıklamadan önce komut/yol/kod parçacığı), numaralı ve sınırlı adımlar, BİR somut sonraki adım; giriş/özet/kapanış yok. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) temel alınarak uyarlanmıştır. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi        |
| Kısa CJK (文言)                         | `terse-cjk`   | `full`/`ultra` yanıtı Klasik Çince (文言); `lite` yalnızca işlev sözcükleri, nezaket ifadeleri veya süslemeler içermeyen kısa yanıtlar ister.                                                                                       | zh (yerel ayarla sınırlandırılmıştır, aşağıya bakın) |

Her stil üç yoğunluk düzeyiyle sunulur — `lite`, `full`, `ultra` — ve her düzey,
kod bloklarını, dosya yollarını, komutları, hataları ve URL'leri olduğu gibi koruyan
ortak sınırlar maddesiyle (`outputMode.ts` içindeki `SHARED_BOUNDARIES`) sona erer.
`terse-prose` ve `terse-cjk` düzey metinleri bu listeye tanımlayıcıları da ekler.

`terse-cjk`, iki yerde `zh` yerel ayarıyla sınırlandırılmıştır. Sıkıştırma Ayarları sayfası,
bu satırı yalnızca gösterge paneli kullanıcı arabirimi dili Çince (`zh-CN` veya `zh-TW`)
olduğunda listeler ve `applyOutputStyles()` bunu yalnızca isteğin çözümlenmiş dili
(aşağıdaki Dil seçimi bölümüne bakın) `zh` olduğunda ekler. Satırın gizlenmesi, kaydedilmiş
bir `terse-cjk` seçimini temizlemez: ayarlar API'si herhangi bir stil id'sini kabul eder
ve sayfada diğer stilleri kaydetmek bu seçimi korur. İstek sırasında tek yerel ayar
geçidi, `applyOutputStyles()` dil denetimidir.

#### Ekleme nasıl çalışır?

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`), seçimi
katalogla karşılaştırarak çözümler (bilinmeyen id'ler ve yerel ayarla uyuşmayan stiller
çıkarılır, hiçbir zaman hata oluşmaz; hiçbir stile çözümlenmeyen seçim gövdeyi
değiştirmez ve `no_styles` olarak atlanır), seçilen talimatları katalog sırasına göre
birleştirir,
sınırlar maddesini **bir kez** ekler (ayrıca `less-code` veya `ponytail` seçildiğinde
güvenlik maddesini, `SAFETY_BOUNDARIES` ya da çevirisini ekler) ve bloğu tek bir
eşgüçlülük işaretçisiyle (`[OmniRoute Output Styles]`) başlatır; böylece yeniden uygulama
işlem yapmaz. Çözümlenmiş dilin (aşağıdaki Dil seçimi bölümüne bakın) çevirisi varsa,
İngilizce yerine yerelleştirilmiş talimat eklenir.

Boş olmayan bir `messages` dizisine sahip gövdede eşgüçlülük denetimi, içerik atlamasından
önce çalışır: `[OmniRoute Output Styles]` işaretçisi üst düzey `system` alanında (bir
dize veya içerik bloğu dizisi) ya da dize içerikli bir sistem mesajında zaten varsa,
gövde `already_applied` olarak değiştirilmeden bırakılır ve anahtar sözcük denetimi
çalışmaz. Aksi takdirde bir içerik atlaması (`open-sse/services/compression/outputMode.ts`
içindeki `shouldBypassCavemanOutputMode()`), rolleri ne olursa olsun son üç mesajın
metnini denetler ve bu metin güvenlik, geri döndürülemez eylem veya açıklama isteme
anahtar sözcükleriyle ya da sıraya duyarlı bir dizilimle eşleştiğinde stilleri tüm
etkileşim için atlar: `first`, `then`, `after that`, `before`, `rollback` veya
`backup` sözcüklerinden sonra 240 karakter içinde `delete`, `drop`, `migrate`, `deploy`
veya `release` gelmesi. Atlama, **Auto-Clarity Bypass** anahtarı
(`cavemanOutputMode.autoClarity`, varsayılan olarak açık) açıkken çalışır; anahtarı
kapatmak anahtar sözcük denetimini atlar.

Atlama, etkileşimin devam etmesine izin verdiğinde aynı dosyadaki
`placeSystemInstruction()`, hiçbir zaman yeni bir `messages[0]` oluşturmadan bloğu
bulduğu ilk uygun yere yerleştirir:

1. Başta bulunan, dize içerikli bir sistem mesajı: blok, metninin sonuna eklenir.
2. Üst düzey `system` alanı: blok bir dizenin metninin sonuna eklenir veya içerik bloğu
   dizisine yeni bir metin bloğu olarak eklenir.
3. Daha sonra gelen ilk dize içerikli sistem mesajı: blok, metninin sonuna eklenir.
4. Yukarıdakilerin hiçbiri: blok, `messages` dizisinin sonundaki yeni bir sistem mesajına
   yerleştirilir.

`messages` dizisi olmayan (veya boş bir diziye sahip) gövdede içerik atlaması çalışmaz
ve üst düzey `system` alanına bakılmaz. Blok, dize türündeki `instructions` alanının
metninin sonuna eklenir; ancak bu alan zaten `[OmniRoute Output Styles]` işaretçisini
içeriyorsa gövde `already_applied` olarak değiştirilmeden bırakılır. Gövdede dize
türünde bir `instructions` alanı yoksa ancak `input` (bir dize veya dizi) içeriyorsa,
blok `instructions` olur ve bu alanın taşıdığı dize olmayan herhangi bir değerin yerini
alır. Ne dize türünde bir `instructions` alanı ne de dize veya dizi türünde bir `input`
içeren gövde değiştirilmeden bırakılır ve `no_messages` olarak atlanır.

#### Nasıl etkinleştirilir?

Kontrol panelinde: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles bölümü: her stil için açma/kapama
anahtarı ve düzey seçici içeren bir satır. Sıkıştırmanın kendisi açıkken (sayfanın
ana anahtarı, `enabled`) stiller enjekte edilir. **Auto-Clarity Bypass** anahtarı,
**Caveman** sayfasındaki (`/dashboard/context/caveman`) **Output Mode** kartında bulunur.
Programatik olarak sıkıştırma yapılandırması seçimi şu şekilde kalıcılaştırır:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Geriye dönük uyumluluk: `outputStyles` boşken eski `cavemanOutputMode.enabled`
ayarı, `cavemanOutputMode.intensity` düzeyinde `terse-prose` ile eşlenir. Ardından blok,
eski `applyCavemanOutputMode()` enjektörünün `[OmniRoute Caveman Output Mode]` yazdığı
yerde `[OmniRoute Output Styles]` işaretçisiyle başlar. İşaretçinin altında metin; en,
pt-BR, es, de, fr, it, ru, id ve vi dillerinde eski enjeksiyonla aynıdır; ja ve zh
dillerinde ise sınırlar maddesinden önce fazladan bir boşluk bulunur. `terse-prose`;
pt-BR, es, de, fr, it, ru, zh, ja, id ve vi dillerine çevrilir; dolayısıyla çözümlenen
dili `hu` olan bir istek, eski enjektörün Macarca metnini kullandığı yerde İngilizce
metni alır.

Çıktı stili dili seçimi (`outputStyles/apply.ts` içindeki
`resolveOutputStyleLanguage()`): `languageConfig.enabled` açıkken `autoDetect`, isteğin
`messages` dizisinde metin içeren en son kullanıcı mesajını (dize içeriği veya içerik
parçalarının `text` alanı) örnekler ve bunun üzerinde Caveman motorunun algılayıcısını
(`detectCompressionLanguage()`) çalıştırır. Algılayıcı, kana içermeyen Han karakterli
metinler için `zh` döndürür; aksi takdirde `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`,
`hu` ve `id` arasından en çok ipucu eşleşmesine sahip olanı, hiçbir eşleşme olmadığında
ise `en` döndürür — sınıflandıramadığı metinler `defaultLanguage` yerine İngilizce
kullanır ve stiller `vi` metni içerse de `vi` hiçbir zaman algılanmaz. Bir Responses API
gövdesi ileti sıralarını örneklenmeyen `input` içinde tutar; bu nedenle önce
`defaultLanguage`, ardından İngilizce kullanır. `messages` içinde hiçbir kullanıcı
mesajı metin içermediğinde veya `autoDetect` kapalı olduğunda önce `defaultLanguage`,
ardından İngilizce uygulanır. `languageConfig.enabled` kapalıyken dil İngilizcedir —
isteğe bir sıkıştırma kombinasyonu uygulanmadığı sürece (isteğin yönlendirme
kombinasyonuna atanmış bir kombinasyon veya yerleşik yığınlı işlem hattı için chatCore'un
geri döndüğü varsayılan sıkıştırma kombinasyonu): bir kombinasyon uygulamak, o istek
için `languageConfig.enabled` ayarını açar ve `defaultLanguage` değerini kombinasyonun
dil paketlerinden ayarlar (kayıtlı değer kombinasyonun paketlerinden biriyse o değer,
değilse varsayılanı `en` olan kombinasyonun ilk paketi); kayıtlı `autoDetect` ayarı
(varsayılan olarak açık) ise uygulanmaya devam eder. Caveman girdi motoru kendi kural
paketi dilini farklı biçimde seçer — her metin parçası için ayrı olarak ve otomatik
algılama kapalıyken `enabledPacks` ile kısıtlanmış şekilde.

Stil × dil matrisi
`tests/unit/compression/output-styles-i18n-matrix.test.ts` tarafından sabitlenir: her
katalog stilinin testteki `BASELINE_LANGUAGES` içinde bir girdisi olmalıdır; yerel ayarla
kısıtlanmayan bir stil, hiçbir çevirisi bulunmayan stilleri içerebilen
`KNOWN_ENGLISH_ONLY` içinde listelenmediği sürece pt-BR çevirisi sunmalıdır (yerel ayarla
kısıtlanan `terse-cjk` bu kuraldan muaftır) — listelenmiş bir stilin herhangi bir
çevirisinin bulunması testin başarısız olmasına yol açar; ayrıca bir stil,
`BASELINE_LANGUAGES` girdisinde listelenen dillerden birini kaybettiğinde test başarısız
olur. Stil eklemek için
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) belgesine
bakın.

### Araç Sonucu Sıkıştırması

`open-sse/services/compression/toolResultCompressor.ts` içindeki `compressToolResult()`,
araç sonucu metnini **5 stratejiyle** sıkıştırır. Bunları aşağıdaki sırayla dener ve
denetimi içerikle eşleşen ilk etkin strateji sonucu belirler:

1. **`fileContent`**: Başındaki girinti yok sayıldığında en az bir satırı `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` veya `return ` (anahtar sözcük ve ardından bir boşluk) ile ya da ardından `(` veya ` (`
   gelen `if`, `for` veya `while` ile başlayan 3 veya daha fazla satırlık içerikte, ilk 20 ve son 5 satırı
   korur ve çıkarılan orta kısmı işaretler.
2. **`grepSearch`**: `<path>:<digits>:` biçiminde en az bir satır içeren ve ilk iki nokta üst üste
   işaretinden önceki metinde boşluk bulunmayan içerikte yalnızca bu satırları, en fazla 30 satır olacak şekilde
   korur; ardından varsa diğer eşleşmelerin sayısını ve eşleşen dosyaların listesini ekler;
   diğer tüm satırlar kaldırılır. Stratejiyi tetiklemek için böyle tek bir satır yeterlidir; dolayısıyla
   `12:30:45` gibi bir zaman damgasıyla başlayan günlük satırı da eşleşme sayılır.
3. **`shellOutput`**: Bir ANSI CSI dizisi (`ESC[` ve ardından renk kodlarında olduğu gibi
   rakamlar veya noktalı virgüller ve sonrasında bir harf) ya da metnin herhangi bir yerinde
   ardından boşluk gelen bir `$` içeren çıktıda bu dizileri kaldırır (örneğin `ESC[?25l` veya bir
   OSC pencere başlığı dizisi gibi diğer kaçış dizileri korunur), ardışık olarak yinelenen satırları
   tekilleştirir ve son 50 satırı korur. Bu denetim `json` ve `errorMessage` öncesinde çalıştığı için,
   bu tür bir `$` içeren JSON veya hata çıktısı `shellOutput` açıkken onlara hiçbir zaman ulaşmaz.
4. **`json`**: İsteğe bağlı boşluklardan sonra `{` veya `[` ile başlayan, ayrıştırılabilen ve
   2.000 karakterden uzun bir JSON yükü özetlenir: 7'den fazla öğesi olan bir dizinin ilk 5 ve
   son 2 öğesi ile toplam öğe sayısı korunur; bir nesnenin ise ilk 20 anahtarı korunur ve iç içe
   her nesne veya dizi değeri bir `{…N keys}` yer tutucusuyla değiştirilir (bir dizi için N,
   dizinin uzunluğudur); ilk 20'den sonra kaldırılan anahtarların sayısını belirten bir
   `_remaining_<N>_keys` işareti eklenir. Skaler değerler bütünüyle kopyalanır; bu nedenle,
   20 veya daha az anahtarı olan ve iç içe değer içermeyen bir nesne yalnızca yeniden girintilenir
   — küçültülmüş biçimdeyse karakter sayısı artar ve değişmeden kalır.
5. **`errorMessage`**: Herhangi bir yerinde ve büyük/küçük harf ayrımı olmaksızın `error:`,
   `error ` (`no error found` örneğindeki gibi sözcükten sonra bir boşluk), `[error]`,
   `exception:`, `exception `, `[exception]` veya `traceback` içeren çıktının ilk satırını,
   sonraki 10 satırını ve son 3 satırını korur; bunların arasındaki satırların yerine
   `… [N frames elided] …` işareti koyar. Bu işaret yalnızca ilk satırdan sonra 13'ten fazla
   satır olduğunda görünür; dolayısıyla 14 veya daha az satırlık hata çıktısı kısaltılmaz
   (12 veya 13 satırda son 3 satır, zaten korunan satırları tekrarlar).

Bir strateji eşleştikten sonra, hiçbir tasarruf sağlamasa bile sonraki stratejiler
denenmez. Eşleşen strateji tahmini olarak hiç token tasarrufu sağlamadığında (uzunluk ÷ 4,
yukarı yuvarlanmış) — örneğin 25 veya daha az satırlık kod benzeri bir dosyada ya da
2.000 karakterden uzun ve 7 veya daha az öğeli bir JSON dizisinde — agresif motor özgün
araç sonucunu korur: her iki çağıran da (`compressAggressive()` ve
`compressAnthropicToolResultBlock()`) `saved` değeri 0 veya daha düşük olduğunda özgün
sonucu korurken, `compressToolResult()` yine de ilgili stratejinin çıktısını döndürür.
Araç sonucu adımı son söz değildir: motorun yedek özetleyicisi, 8.192 karakterden
(`maxTokensPerMessage`, 2.048, çarpı 4) uzun bir `tool` veya `function` mesajını yine de
kısaltabilir.

#### Ne zaman kullanılmalı

Araç sonucu sıkıştırması, agresif motorun (`open-sse/services/compression/aggressive.ts`
içindeki `compressAggressive()`) 1. adımıdır; dolayısıyla Aggressive modunda ve yığılmış
bir işlem hattının `aggressive` adımında çalışır. OpenAI biçimindeki `tool` ve `function`
mesajlarını ve Anthropic `tool_result` blokları içindeki metni sıkıştırır. Her stratejinin
`aggressive.toolStrategies` altında kendi anahtarı bulunur ve tümü varsayılan olarak
açıktır. Kontrol panelinde anahtarlar, sıkıştırma açıkken ve varsayılan mod Aggressive
olduğunda Caveman sayfasının **Advanced** görünümündedir.

### Yığılmış İşlem Hattı

Yığılmış mod, **birden fazla motoru sırayla** çalıştırır — genellikle önce RTK
(araç çıktısında %60-90 tasarruf), ardından kalan metin üzerinde Caveman (girdide
yaklaşık %46 tasarruf). Birleştirildiğinde bu, **uygun içeriklerde %78-95 aralığı**
anlamına gelir (yukarıdaki Upstream Savings Math bölümüne bakın):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` ortalama ≈%89'dur.

#### Nasıl çalışır

```
Girdi (1000 token)
  → RTK (komuta duyarlı filtre) → 200 token
    → Caveman (dolgu kaldırma) → 108 token
  → Çıktı (108 token, yaklaşık %89 tasarruf)
```

#### Ne zaman kullanılmalı

Yığılmış modu şunlar için kullanın:

- Araç yoğunluklu iş akışları (aracılı kodlama, araştırma)
- Maliyet hassasiyetli toplu işleme
- Maksimum token tasarrufuna ihtiyaç duyduğunuz durumlar

Yığılmış işlem hatları, genel `stackedPipeline` sıkıştırma ayarı üzerinden veya bir
yönlendirme kombinasyonuna atanmış adlandırılmış bir sıkıştırma kombinasyonu üzerinden
yapılandırılır (yukarıdaki Per-Combo Override bölümüne bakın) — bir otomatik kombinasyonun
`modePack` alanı üzerinden değil (bu alan yalnızca otomatik kombinasyon model seçiminin
ağırlıklarını değiştirir ve `stacked` geçerli bir paket adı değildir).

---

## Kombo Bazında Sıkıştırma Geçersiz Kılmaları

Farklı kullanım senaryolarındaki davranışı hassas biçimde ayarlamak için genel sıkıştırma modunu **her kombo için ayrı ayrı** geçersiz kılabilirsiniz:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Bu özellik şu durumlarda kullanışlıdır:

- **Kodlama komboları**: Uzun oturumlar için `aggressive` modunu kullanın
- **Hızlı soru-cevap komboları**: Hızlı yanıtlar için `lite` modunu kullanın
- **Yoğun araç kullanılan kombolar**: En yüksek tasarruf için `stacked` modunu kullanın
- **Üretim komboları**: Önbelleğe alma sağlayıcıları için geçersiz kılmayı kapalı bırakın — her zaman etkin olan
  önbellek duyarlı ayarlama, `aggressive`/`ultra` modlarını otomatik olarak `standard` moduna düşürür
  (seçilebilir bir `cache-aware` modu yoktur)

---

## Ayrıca Bakınız

- [Ortam Yapılandırması](../reference/ENVIRONMENT.md) — Sıkıştırma ortam değişkenleri
- [Mimari Kılavuzu](../architecture/ARCHITECTURE.md) — Sıkıştırma işlem hattının iç işleyişi
- [Kullanıcı Kılavuzu](../guides/USER_GUIDE.md) — Sıkıştırmaya başlama
- [RTK Sıkıştırması](./RTK_COMPRESSION.md) — RTK filtreleri, güven modeli, doğrulama geçidi, ham çıktı kurtarma
- [Sıkıştırma Motorları](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API'ler, MCP, gösterge paneli
- [Sıkıştırma Kuralları Biçimi](./COMPRESSION_RULES_FORMAT.md) — JSON kural paketi biçimi
- [Sıkıştırma Dil Paketleri](./COMPRESSION_LANGUAGE_PACKS.md) — Dile özgü Caveman kuralları
