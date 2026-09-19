# 🗜️ Prompt Compression Guide — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Uygun bağlamda otomatik olarak %15-95 tasarruf edin. Hızlı bir genel bakış için [README Sıkıştırma bölümüne](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) bakın.

## Genel Bakış

OmniRoute, istekler üst sağlayıcılara ulaşmadan önce **proaktif olarak** çalışan modüler bir istem sıkıştırma işlem hattı uygular. Bu, token tasarrufunun şeffaf biçimde gerçekleştiği anlamına gelir — iş akışınızda herhangi bir değişiklik yapmanız gerekmez.

```
İstemci İsteği
  → Sıkıştırma Stratejisi Seçici
    → Combo geçersiz kılması? → Combo ayarını kullan
    → Otomatik tetikleme eşiği? → Otomatik modu kullan
    → Varsayılan mod? → Genel ayarı kullan
    → Kapalı? → Sıkıştırmayı atla
  → Seçilen Sıkıştırma Modu
    → Kapalı: Sıkıştırma yok
    → Hafif: Güvenli boşluk/biçimlendirme temizliği (~%15)
    → Standart: Mağara adamı tarzı dolgu ifadelerini kaldırma (~%30)
    → Agresif: Geçmişi yaşlandırma + özetleme (~%50)
    → Ultra: Sezgisel budama + kod bloklarını inceltme (~%75)
    → RTK: Komut duyarlı terminal/araç çıktısı filtreleme (üst sağlayıcı tarafında %60-90 aralığı)
    → Yığınlanmış: Sıralı çok motorlu işlem hattı; genellikle önce RTK, ardından Caveman (uygun içerikte %78-95 aralığı)
  → Sıkıştırılmış İstek → Sağlayıcı
```

---

## Sıkıştırma Modları

### Kapalı

Sıkıştırma uygulanmaz. Tüm mesajlar değiştirilmeden iletilir.

### Hafif Mod (~%15 tasarruf, <1ms gecikme)

En güvenli mod — anlamsal değişiklik sıfırdır, yalnızca biçimlendirme temizliği yapılır:

| Teknik                   | Açıklama                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `collapseWhitespace`     | Ardışık boş satırları ve satır sonu boşluklarını birleştirir |
| `dedupSystemPrompt`      | Yinelenen sistem mesajlarını kaldırır                        |
| `compressToolResults`    | Ayrıntılı araç/fonksiyon çıktılarını sıkıştırır              |
| `removeRedundantContent` | Yinelenen talimatları kaldırır                               |
| `replaceImageUrls`       | Base64 görüntü veri URI'lerini kısaltır                      |

**En uygun kullanım:** Her zaman açık kullanım, güvenliğin kritik olduğu iş akışları.

### Standart Mod (~%30 tasarruf)

[Caveman](https://github.com/JuliusBrussee/caveman) yaklaşımından esinlenmiştir — anlamı korurken dolgu sözcüklerini ve gereksiz uzun ifadeleri kaldırır:

- Dolgu sözcüklerini kaldırır ("lütfen", "bence", "temelde", "aslında")
- Gereksiz uzun ifadeleri kısaltır ("yapmak amacıyla" → "yapmak için", "sonucunda" → "nedeniyle")
- Nezaket amaçlı ihtiyatlı ifadeleri kaldırır ("Sakıncası yoksa...", "Mümkünse...")
- Kodlama istemleri için ayarlanmış 30'dan fazla regex kuralı

**En uygun kullanım:** Günlük kodlama iş akışları, maliyet bilincine sahip ekipler.

### Agresif Mod (~%50 tasarruf)

Uzun oturumlar için akıllı geçmiş yönetimi:

- **Mesaj Yaşlandırma** — eski mesajlar aşamalı olarak daha fazla sıkıştırılır
- **Araç Sonucu Özetleme** — uzun araç çıktıları özetlerle değiştirilir
- **Yapısal Bütünlük Korumaları** — `tool_use` + `tool_result` çiftlerinin tutarlı kalmasını sağlar
- **Bağlam Penceresi Farkındalığı** — modele özgü token sınırlarına uyar

**En uygun kullanım:** Uzun hata ayıklama oturumları, büyük kod tabanları.

### Ultra Mod (~%75 tasarruf)

Token açısından kritik senaryolar için maksimum sıkıştırma:

- **Sezgisel Budama** — alaka eşiğinin altındaki mesajları kaldırır
- **Kod Bloğu İnceltme** — tekrarlayan kod örneklerini sıkıştırır
- **İkili Arama ile Kesme** — bağlam penceresi için en uygun kesme noktasını bulur
- Agresif modun tüm özellikleri dahildir

**En uygun kullanım:** Bağlam sınırlarına sürekli ulaştığınız durumlar.

### RTK Modu (üst sağlayıcı tarafında %60-90 aralığı)

RTK modu, kodlama aracısı oturumlarında görülen ayrıntılı araç çıktıları için optimize edilmiştir:

- `git status`, `git diff`, `git log`, test çalıştırıcıları, TypeScript/Vite/Webpack derlemeleri, ESLint/Biome/Prettier, npm denetimleri/kurulumları, Docker günlükleri, altyapı çıktıları ve genel kabuk çıktısı gibi komut/çıktı sınıflarını algılar
- `open-sse/services/compression/engines/rtk/filters/` konumundaki JSON filtre paketlerini uygular
- RTK TOML şema v1 filtrelerini proje veya genel `filters.toml` dosyalarından; satır içi test doğrulaması ve proje dosyaları için güvenlik denetimiyle içe aktarır
- Satır içi doğrulama örnekleri içeren 49 yerleşik filtreyle birlikte gelir
- ANSI kontrol dizilerini, ilerleme çubuklarını, yinelenen satırları ve işlem gerektirmeyen gürültüyü kaldırır
- Başarısızlıkları, hataları, uyarıları, değiştirilen dosyaları, özetleri ve uzun çıktıların son kısmını korur
- Güvenlik denetimli proje filtrelerini, genel filtreleri ve isteğe bağlı olarak redakte edilmiş ham çıktı kurtarmayı destekler

**En uygun kullanım:** Kabuk, derleme, test, git, grep ve dosya çıktısı dökümleri içeren aracı oturumları.

### Yığınlanmış Mod (uygun içerikte %78-95 aralığı)

Yığınlanmış mod, birden fazla sıkıştırma motorunu belirli bir sırayla çalıştırır. Varsayılan işlem hattı şöyledir:

```txt
RTK -> Caveman
```

Bu sıra, önce terminal/araç çıktısını kompakt hâle getirir, ardından kalan doğal dil istemine Caveman anlamsal yoğunlaştırmasını uygular. Yığınlanmış işlem hatları genel olarak veya yönlendirme combo'larına atanan sıkıştırma combo'ları aracılığıyla yapılandırılabilir.

**En uygun kullanım:** Büyük araç günlükleriyle birlikte insan talimatları veya asistan özetleri içeren karma bağlamlar.

---

## Yukarı Akış Tasarruf Hesaplaması

OmniRoute, sıkıştırma tasarruflarını iki kaynağa dayanarak belgeler: yukarı akış proje karşılaştırmaları ve
OmniRoute'un kendi motor bileşimi.

| Kaynak  | Burada kullanılan yukarı akış README değeri                                                                                       |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` daha az çıktı tokenı, karşılaştırmalarda ortalama `65%` çıktı tasarrufu, `22-87%` aralığı ve `~46%` giriş sıkıştırma aracı |
| RTK     | Komut çıktısında `60-90%` tasarruf; örnek oturumda `~118,000 -> ~23,900` token veya `79.7%` tasarruf (`~80%`)                     |

Çakışan araç/bağlam yükleri için varsayılan OmniRoute kombinasyonu motorları üst üste uygular:

```txt
RTK -> Caveman
```

Birleşik tasarruflar toplamsal değil, çarpımsaldır:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Bu `78-95%` değeri, hem RTK hem de Caveman aynı giriş/bağlam yükünü azaltabildiğinde geçerlidir.
Caveman yanıt çıktı modu ayrıdır: etkinleştirildiğinde Caveman'in kendi çıktı tasarruflarını kullanın (ortalama `65%`,
öne çıkan değer `~75%`, aralık `22-87%`). Toplam faturalandırma tasarrufu, istem/çıktı dağılımınıza bağlıdır.

### "Uygun" gerçekte ne anlama gelir?

Öne çıkan %15-95 aralığı gerçektir, ancak yalnızca **gereksiz tekrar içeren veya ayrıntılı** içerik için geçerlidir — tekrarlanan
hata satırları, aynı uyarıyı durmadan yazdıran bir derleme günlüğü, aşırı büyük bir `grep`/dosya okuma dökümü. Bu,
her istekte bu kadar tasarruf sağlanacağı anlamına **gelmez**.

Deneysel olarak doğrulanmıştır (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 özdeş
hata satırı içeren Anthropic biçimindeki bir `tool_result` bloğuna karşı yapılan `stacked` (RTK + Caveman) çalıştırması,
**%95,93 token tasarrufu / %96,26 karakter tasarrufu** sağlamıştır — bu değer doğrudan belirtilen
aralığın içindedir. Ancak aynı işlem hattı normal, gereksiz tekrar içermeyen araç çıktısına (temiz bir `grep` eşleşme listesi,
kısa bir dosya okuması, sıradan konuşma metni) uygulandığında haklı olarak **sıfıra yakın tasarruf** sağlar; çünkü
kaldırılacak tekrarlı bir içerik yoktur ve `validateCompression()` (`validation.ts`), kod bloklarını, URL'leri,
başlıkları, sürümleri veya TAMAMI BÜYÜK HARFLİ sabit tanımlayıcılarını kaldıracak ya da değiştirecek bir yeniden yazımı
göndermeyi reddeder.

Bu beklenen, güvenli bir davranıştır; hata değildir: çoğunlukla temiz dosyaları okuyan/grep ile arayan bir kodlama oturumu,
sıkıştırma tamamen etkin olsa bile mütevazı bir toplam tasarruf görürken, başarısız bir döngüyle veya fazla çıktı üreten
bir linter ile karşılaşan oturum, bu trafik üzerinde tam %78-95 aralığını görecektir. Tek bir oturumdaki
düşük toplam tasarruf yüzdesini sıkıştırmanın yanlış yapılandırıldığına dair kanıt olarak kullanmayın — önce
temeldeki araç çıktısının gerçekten gereksiz tekrar içerip içermediğini kontrol edin.

---

## Token Tasarrufu Görselleştirmesi

```
Sıkıştırma olmadan:  LLM'ye gönderilen 47K token
Lite ile:            Gönderilen 40K token          (%15 tasarruf — güvenli, her zaman açık)
Standard ile:        Gönderilen 33K token          (%30 tasarruf — caveman-speak kuralları)
Aggressive ile:      Gönderilen 24K token          (%50 tasarruf — yaşlandırma + özetleme)
Ultra ile:           Gönderilen 12K token          (%75 tasarruf — sezgisel budama)
RTK ile:             Gönderilen 19K-5K token       (komut/araç çıktısında %60-90 tasarruf)
Stacked ile:         Gönderilen 10K-2.5K token     (uygun RTK+Caveman içeriğinde %78-95 aralığı)
```

---

## Yapılandırma

### Gösterge Paneli

`Gösterge Paneli → Bağlam ve Önbellek` bölümüne gidin:

- **Caveman** — mod seçimi, dil paketleri, önizleme ve genel varsayılanlar
- **RTK** — komut filtresi önizlemesi, RTK güvenlik ayarları ve filtre kataloğu
- **Sıkıştırma Komboları** — yönlendirme kombinasyonlarına atanmış adlandırılmış motor işlem hatları
- **Otomatik Tetikleme Eşiği** — belirteç sayısı eşiği aştığında sıkıştırmayı otomatik olarak devreye alır

### Kombo Bazında Geçersiz Kılma

`Gösterge Paneli → Bağlam ve Önbellek → Sıkıştırma Komboları` bölümünde bir yönlendirme kombosuna sıkıştırma kombosu atayın:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu, ücretli aboneliklerde lite modunu korurken ücretsiz/kodlama sağlayıcılarında yığınlanmış sıkıştırma kullanmanıza olanak tanır.

Bu "Kombo Bazında Geçersiz Kılma" ataması, **yönlendirme kombosu sıkıştırma modu** geçersiz kılmasından (Default/Off/Lite/Standard/Aggressive/Ultra) farklı bir denetimdir — bu geçersiz kılma, adlandırılmış bir sıkıştırma kombosu işlem hattı seçmez; yalnızca `resolveCompressionPlan` tarafından kullanılan `compressionMode` alanını ayarlar. Bu ayar, kombo kartından (`Gösterge Paneli → Kombolar`) veya #6760'tan itibaren `Gösterge Paneli → Bağlam ve Önbellek → Sıkıştırma Komboları` bölümündeki "Yönlendirmeye ata" listesinde, yukarıda açıklanan işlem hattı atama onay kutusunun hemen yanında her yönlendirme kombosu için ayrı ayrı yapılabilir. Her iki arayüzdeki ayarlar da aynı `PUT /api/combos/{id}` uç noktası üzerinden kalıcı hâle getirilir.

### İstek bazında geçersiz kılma

Tek bir isteğin sıkıştırma planını geçersiz kılmak için `x-omniroute-compression` istek başlığını gönderin. Bu, en yüksek önceliğe sahiptir — yönlendirme kombosu geçersiz kılmasını, etkin profili, otomatik tetiklemeyi ve paneldeki Default ayarını geçersiz kılar. Bilinmeyen değerler yok sayılır (istek hiçbir zaman reddedilmez) ve genel ana anahtar her şeyi denetlemeye devam eder: sıkıştırma genel olarak kapalı olduğunda başlık bunu açamaz. Değerler:

| Değer         | Etki                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `off`         | Bu istek için sıkıştırma uygulanmaz.                                                                   |
| `default`     | Panelden türetilen Default profili (etkin profili yok sayar).                                          |
| `engine:<id>` | Etkinleştirilmişse tek bir motor; ör. `engine:rtk`.                                                    |
| `<combo>`     | Önce ada göre (büyük/küçük harf duyarsız), ardından kimliğe göre eşleştirilen adlandırılmış bir kombo. |

Uygulanan plan, `X-OmniRoute-Compression: <mode>; source=<source>` yanıt başlığında geri bildirilir; burada `<source>`, `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` veya `off` değerlerinden biridir.

### API

```bash
# Sıkıştırma ayarlarını al
curl http://localhost:20128/api/settings/compression

# Sıkıştırma ayarlarını güncelle
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Belirli bir RTK/yığınlanmış yükün önizlemesini yap
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtre paketlerini listele
curl http://localhost:20128/api/context/rtk/filters

# İsteğe bağlı komut meta verileriyle RTK'yi doğrudan test et
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

RTK ham çıktı kurtarma özelliği; herhangi bir veri kalıcı hâle getirilmeden önce yaygın API anahtarlarını, bearer belirteçlerini, Slack belirteçlerini, AWS erişim anahtarlarını, parolaları, belirteçleri ve gizli bilgileri sansürler.

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

| Aşama    | Modlar                                                                                                                                                     | Durum         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Aşama 1  | Kapalı, Lite                                                                                                                                               | ✅ Yayınlandı |
| Aşama 2  | Standard, Aggressive, Ultra                                                                                                                                | ✅ Yayınlandı |
| Aşama 3  | RTK, Stacked, Sıkıştırma Kombinasyonları                                                                                                                   | ✅ Yayınlandı |
| Aşama 4  | Çıktı Stilleri, SLM katmanlı Ultra, değerlendirme düzeneği                                                                                                 | ✅ Yayınlandı |
| Aşama 4C | Uyarlanabilir bağlam bütçesi ("kadran") — hesaplama motoru + API (`PUT /api/settings/compression` üzerindeki `contextBudget`) + pano modu/ilke denetimleri | ✅ Yayınlandı |

---

## Teşekkürler

Standard mod sıkıştırma kuralları, **[JuliusBrussee](https://github.com/JuliusBrussee)** tarafından geliştirilen **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) adlı viral "az token işe yarıyorsa neden çok token kullanasın" projesinden esinlenmiştir. Caveman, çıktı token'larında `~75%` azalma, kıyaslama testlerinde ortalama `65%` çıktı tasarrufu, `22-87%` çıktı aralığı ve `~46%` oranında bir girdi sıkıştırma aracı bildirmektedir.

RTK modu, **[RTK AI](https://github.com/rtk-ai)** tarafından geliştirilen **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** projesinden esinlenmiştir. Bu proje; terminal, derleme, test, git ve araç çıktısı filtreleme için yüksek performanslı bir komut çıktısı sıkıştırma projesidir. RTK, `60-90%` tasarruf bildirmekte ve README örnek oturumunda `~80%` tasarruf göstermektedir.

---

## Gelişmiş Sıkıştırma Sistemleri

OmniRoute, 7 standart modun ötesinde, bağlama göre otomatik olarak çalışan çeşitli gelişmiş sıkıştırma sistemleri içerir.

### Önbellek Duyarlı Sıkıştırma

Bazı sağlayıcılar (istem önbelleğe alma özelliğine sahip Anthropic gibi), maliyetleri ve gecikmeyi azaltmak için istemin bazı bölümlerini önbelleğe almalarına olanak tanıyan **istem önbelleğe alma** özelliğini destekler. Önbelleğe alma etkinken agresif sıkıştırma, önbelleğe alınan token'ları değiştirerek önbelleği geçersiz kıldığı için performansa gerçekte **zarar verebilir**.

`cachingAware.ts` modülü, **önbelleğe alma bağlamını algılayarak** ve **sıkıştırma stratejisini** buna göre ayarlayarak bu sorunu çözer.

#### Nasıl çalışır?

1. **Önbelleğe alma bağlamını algılama** — İstek gövdesini `cache_control` işaretçileri için tarar
2. **Önbelleğe alma sağlayıcılarını belirleme** — Hedef sağlayıcının önbelleğe almayı destekleyip desteklemediğini kontrol eder
3. **Stratejiyi ayarlama** — Önbelleğe alma sağlayıcıları için `aggressive`/`ultra` modunu `standard` moduna düşürür
4. **Sistem istemini atlama** — Sistem istemleri genellikle önbelleğe alınır, bu nedenle bunları sıkıştırmaz
5. **Belirlenimci dönüşümler kullanma** — Yalnızca tutarlı çıktı üreten dönüşümleri kullanır

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Ne zaman kullanılmalı?

Önbellek duyarlı sıkıştırma **her zaman açıktır** — herhangi bir yapılandırma gerekmez. Yalnızca şu durumlarda devreye girer:

- İstekte `cache_control` işaretçileri bulunduğunda
- Hedef sağlayıcı istem önbelleğe almayı desteklediğinde (Anthropic, OpenAI vb.)

### Aşamalı Eskitme

Uzun konuşmalarda çok sayıda mesaj sırası birikir, ancak eski sıralar zamanla daha az alakalı hâle gelir. `progressiveAging.ts` modülü, **mesajları sıra uzaklığına göre sadeleştirir**:

- **Son sıralar (0-3)**: Olduğu gibi korunur (tüm ayrıntılar)
- **Orta uzaklıktaki sıralar (4-8)**: Lite sıkıştırma (boşluk ve biçimlendirme temizliği)
- **Eski sıralar (9+)**: Caveman sıkıştırması (dolgu ifadelerinin kaldırılması, özetleme)
- **Çok eski sıralar (20+)**: Yoğun biçimde özetlenir veya kaldırılır

#### Kod örneği

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 sıra daha ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // İlk 3 sıra: olduğu gibi
  light: 8, // 4-8. sıralar: lite sıkıştırma
  moderate: 20, // 9-20. sıralar: caveman sıkıştırması
  // 21. ve sonraki sıralar: yoğun özetleme
});

// saved = tasarruf edilen token sayısı
```

#### Ne zaman kullanılmalı?

Aşamalı yaşlandırma, `aggressive` ve `ultra` modlarında **her zaman etkindir**. Özellikle şu durumlarda etkilidir:

- Uzun süren kodlama oturumları
- Birkaç güne yayılan konuşmalar
- Çok sayıda araç çağrısı içeren ajan tabanlı iş akışları

### Caveman Çıktı Modu

`outputMode.ts` modülü, modelin kendisinin sıkıştırılmış ve kısa bir çıktı ("caveman" tarzı) üretmesini sağlamak için **sistem istemi talimatları** ekler.

#### Nasıl çalışır?

Bu mod, girdiyi sıkıştırmak yerine aşağıdakine benzer bir sistem istemi ekler:

> "Asgari sayıda kelimeyle yanıt ver. Nezaket ifadelerini atla. Kısa cümleler kullan."

Bu yöntem özellikle şu durumlarda iyi çalışır:

- Kod üretimi (daha kısa çıktı = daha az token)
- Hızlı soru-cevap (ayrıntılı açıklamalara gerek yoktur)
- Toplu işleme (iş hacmini en üst düzeye çıkarır)

#### Ne zaman kullanılmalı?

Caveman çıktı modu **isteğe bağlıdır** — combo yapılandırması aracılığıyla ayarlayın:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Çıktı Stilleri (katalog)

Yukarıdaki Caveman çıktı modu, **eski tek stilli yoldur**. Phase 4, bunu birleştirilebilir çıktı stillerinden oluşan bir katalog hâline getirdi: `open-sse/services/compression/outputStyles/catalog.ts` içindeki `OUTPUT_STYLE_CATALOG`. Her stil, modelin kendisinin daha düşük maliyetli çıktı üretmesini sağlayan bir sistem istemi talimatıdır; stiller birlikte etkinleştirilebilir ve katalog sırasına göre eklenir.

| Stil                                  | `id`          | Ne yapar?                                                                                                                                                                                                                                         | Talimat dilleri                                                            |
| ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Kısa düzyazı                          | `terse-prose` | Dolgu ifadelerini, tanımlıkları ve kaçamak ifadeleri kaldırır; teknik içeriği aynen korur. Eski Caveman çıktı moduyla aynı metindir (yeniden yazılmaz, referans verilir).                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Daha az kod                           | `less-code`   | YAGNI basamakları: çalışan en küçük değişiklik, istenmeyen soyutlamalar yok.                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Ponytail (tembel kıdemli geliştirici) | `ponytail`    | "En iyi kod, hiç yazılmamış koddur": yeniden yazmak yerine yeniden kullanma, belirti yerine kök neden, çalışan en kısa diff.                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| ADHD'im var (önce eylem)              | `i-have-adhd` | Önce eylem (düzyazıdan önce komut/yol/kod parçacığı), numaralandırılmış ve sınırlı adımlar, TEK somut sonraki adım; giriş, özet veya kapanış yok. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) temel alınarak uyarlanmıştır. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Kısa CJK (文言)                       | `terse-cjk`   | Klasik Çince, son derece kısa stil.                                                                                                                                                                                                               | zh (yerel ayar kısıtlıdır: yalnızca çözümlenen dil `zh` olduğunda sunulur) |

Her stil üç yoğunluk düzeyiyle sunulur — `lite`, `full`, `ultra` — ve her düzey, kod bloklarını, dosya yollarını, komutları, hata dizelerini, URL'leri ve tanımlayıcıları aynen koruyan ortak sınırlar maddesiyle sona erer.

#### Ekleme nasıl çalışır?

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`), seçimi kataloğa göre çözümler (bilinmeyen id'ler ve yerel ayarla eşleşmeyen stiller kaldırılır, hiçbir zaman hata oluşmaz), seçilen talimatları katalog sırasına göre birleştirir, sınırlar maddesini **bir kez** ekler ve sonucu tek bir yinelenebilirlik işaretçisinin (`[OmniRoute Output Styles]`) ardından sistem isteminin başına yerleştirir — yeniden uygulanması hiçbir işlem yapmaz. Algılanan istek dili için bir çeviri mevcutsa İngilizce yerine yerelleştirilmiş talimat eklenir.

#### Nasıl etkinleştirilir?

Kontrol panelinde: **Context → Settings → Compression** — her stil için açma/kapatma düğmesi ve düzey seçici içeren bir satır bulunur. Program aracılığıyla sıkıştırma yapılandırması seçimi şu şekilde saklar:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Geriye dönük uyumluluk: Eski `outputMode: "caveman"` combo ayarı çalışmaya devam eder ve tüm eski dillerde önceki eklemeyle bayt düzeyinde aynı olan `terse-prose` stiline eşlenir.

Dil seçimi: `languageConfig.enabled` açıkken `autoDetect`, en son kullanıcı mesajının dilini seçer (girdi motorlarıyla aynı algılayıcı); `autoDetect` seçeneğinin kapatılması dili `defaultLanguage` değerine sabitler. Kapalı → İngilizce.

Stil × dil matrisi `tests/unit/compression/output-styles-i18n-matrix.test.ts` tarafından sabitlenir: Yeni bir stil, en azından pt-BR çevirisi (veya açıkça izlenen bir istisna) olmadan yayımlanamaz ve mevcut bir stil herhangi bir yerel ayarı sessizce kaybedemez. Bir stil eklemek için [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) belgesine bakın.

### Araç Sonucu Sıkıştırma

`toolResultCompressor.ts` modülü, araç sonuçları (fonksiyon çağrıları, ajan çıktıları, arama sonuçları vb.) için **5 özel sıkıştırma stratejisi** sağlar:

1. **Arama sonucu sıkıştırma** — Gereksiz yinelenen sonuçları kaldırır, en iyi N sonucu tutar
2. **Dosya okuma sıkıştırması** — Büyük dosyaları kısaltır, başlıkları/içe aktarımları korur
3. **Kod yürütme sıkıştırması** — Yalnızca temel stdout/stderr içeriğini tutar
4. **Veritabanı sorgusu sıkıştırması** — Satır sayısını sınırlar, ayrıntılı meta verileri kaldırır
5. **API yanıtı sıkıştırması** — Null alanları kaldırır, dizileri yoğunlaştırır

#### Ne zaman kullanılmalı?

Araç çağrıları mevcut olduğunda araç sonucu sıkıştırma **her zaman etkindir**. Yapılandırma gerekmez.

### Yığılmış İşlem Hattı

Yığılmış mod, **birden fazla motoru sırayla** çalıştırır — genellikle önce RTK (araç çıktısında %60-90 tasarruf), ardından Caveman (kalan metinde ek %30 tasarruf). Bu, **toplamda %78-95 tasarruf** sağlar.

#### Nasıl çalışır?

```
Girdi (1000 token)
  → RTK (komut duyarlı filtre) → 200 token
    → Caveman (dolgu ifadelerini kaldırma) → 140 token
  → Çıktı (140 token, %86 tasarruf)
```

#### Ne zaman kullanılmalı?

Yığılmış modu şu durumlarda kullanın:

- Araç ağırlıklı iş akışları (ajan tabanlı kodlama, araştırma)
- Maliyete duyarlı toplu işleme
- En yüksek token tasarrufuna ihtiyaç duyduğunuzda

Combo aracılığıyla yapılandırın:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Kombinasyon Bazında Sıkıştırma Geçersiz Kılmaları

Farklı kullanım durumlarında davranışı hassas biçimde ayarlamak için genel sıkıştırma modunu **her kombinasyon için ayrı ayrı** geçersiz kılabilirsiniz:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Bu, aşağıdaki durumlarda kullanışlıdır:

- **Kodlama kombinasyonları**: Uzun oturumlar için `aggressive` modunu kullanın
- **Hızlı soru-cevap kombinasyonları**: Hızlı yanıtlar için `lite` modunu kullanın
- **Yoğun araç kullanan kombinasyonlar**: En yüksek tasarruf için `stacked` modunu kullanın
- **Üretim kombinasyonları**: Önbelleğe alma sağlayıcıları için `cache-aware` modunu kullanın

---

## Ayrıca Bakınız

- [Ortam Yapılandırması](../reference/ENVIRONMENT.md) — Sıkıştırma ortam değişkenleri
- [Mimari Kılavuzu](../architecture/ARCHITECTURE.md) — Sıkıştırma işlem hattının iç işleyişi
- [Kullanıcı Kılavuzu](../guides/USER_GUIDE.md) — Sıkıştırmaya başlama
- [RTK Sıkıştırması](./RTK_COMPRESSION.md) — RTK filtreleri, güven modeli, doğrulama geçidi ve ham çıktı kurtarma
- [Sıkıştırma Motorları](./COMPRESSION_ENGINES.md) — Caveman, RTK, yığınlama, API'ler, MCP ve kontrol paneli
- [Sıkıştırma Kuralları Biçimi](./COMPRESSION_RULES_FORMAT.md) — JSON kural paketi biçimi
- [Sıkıştırma Dil Paketleri](./COMPRESSION_LANGUAGE_PACKS.md) — Dile özgü Caveman kuralları
