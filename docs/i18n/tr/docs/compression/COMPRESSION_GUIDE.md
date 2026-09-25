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

### Kontrol Paneli

`Kontrol Paneli → Bağlam ve Önbellek`'e gidin:

- **Caveman** — mod seçimi, dil paketleri, önizleme ve genel varsayılanlar
- **RTK** — komut-filtre önizlemesi, RTK güvenlik ayarları ve filtre kataloğu
- **Sıkıştırma Kombinasyonları** — yönlendirme kombinasyonlarına atanan adlandırılmış motor işlem hatları
- **Otomatik Tetikleme Eşiği** — belirteç sayısı eşiği aştığında sıkıştırmayı otomatik olarak devreye sokar

### Kombinasyon Başına Geçersiz Kılma

`Kontrol Paneli → Bağlam ve Önbellek → Sıkıştırma Kombinasyonları`'nda, bir sıkıştırma kombinasyonunu bir yönlendirme
kombinasyonuna atayın:

```txt
Kombinasyon: "free-tier-fallback"
  Sıkıştırma Kombinasyonu: "coding-agent-stack"
  İşlem Hattı: RTK -> Caveman
  Hedefler:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu, ücretsiz/kodlama sağlayıcılarında yığılmış sıkıştırma kullanmanıza olanak tanırken, ücretli
aboneliklerde lite modu korur.

Bu "Kombinasyon Başına Geçersiz Kılma" ataması, **yönlendirme-kombinasyonu sıkıştırma
modu** geçersiz kılmasından (Varsayılan/Kapalı/Lite/Standart/Agresif/Ultra) farklı bir kontroldür — bu geçersiz kılma
adlandırılmış bir sıkıştırma-kombinasyonu işlem hattı seçmez; sadece `resolveCompressionPlan` tarafından kullanılan
`compressionMode` alanını ayarlar. Bu, kombinasyon kartında (`Kontrol Paneli → Kombinasyonlar`) veya #6760'tan bu yana,
yukarıda belgelenen işlem hattı atama onay kutusunun hemen yanında, `Kontrol Paneli → Bağlam ve Önbellek → Sıkıştırma Kombinasyonları`'ndaki "Yönlendirmeye Ata" listesinde her yönlendirme kombinasyonu için ayarlanabilir. Her iki yüzey de aynı `PUT /api/combos/{id}` uç noktası aracılığıyla kalıcı hale getirilir.

### İstek Başına Geçersiz Kılma

Tek bir istek için sıkıştırma planını geçersiz kılmak üzere `x-omniroute-compression` istek başlığını gönderin.
En yüksek önceliğe sahiptir — yönlendirme-kombinasyonu geçersiz kılmasını, etkin profili, otomatik tetiklemeyi ve panel Varsayılanını yener. Bilinmeyen değerler yok sayılır (istek asla reddedilmez) ve genel ana anahtar her şeyi hala kontrol eder: sıkıştırma genel olarak kapalıyken, başlık onu açamaz. Değerler:

| Değer         | Etki                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `off`         | Bu istek için sıkıştırma yok.                                                                         |
| `default`     | Panelden türetilen Varsayılan profil (etkin profili yok sayar). Kayıplı motorlar kapalı kalır.        |
| `safe`        | Başlığı atlamakla aynı: yalnızca tekilleştirme ve boşluk katlama.                                     |
| `allow-lossy` | Bu isteğin operatör planını, özetler, alaka düzeyi filtreleri ve stil yeniden yazmaları dahil tut.    |
| `engine:<id>` | Etkinleştirildiğinde tek bir motor, örn. `engine:rtk`. Bu, o motor için istek başına katılım.         |
| `<combo>`     | Adlandırılmış bir kombinasyon, önce ada göre (büyük/küçük harf duyarsız), sonra kimliğe göre eşleşir. |

`allow-lossy`, `engine:<id>` veya adlandırılmış bir kombinasyon olmadan, kayıplı motorlar uygulanmaz.
Sıkıştırma açıkken istek yine de oturum tekilleştirme ve boşluk katlama alır.

Uygulanan plan, `X-OmniRoute-Compression: <mode>; source=<source>` yanıt başlığında geri yansıtılır; burada `<source>`, `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` veya `off` değerlerinden biridir.

### API

```bash
# Sıkıştırma ayarlarını al
curl http://localhost:20128/api/settings/compression

# Sıkıştırma ayarlarını güncelle
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Belirli bir RTK/yığılmış yükü önizle
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtre paketlerini listele
curl http://localhost:20128/api/context/rtk/filters

# RTK'yi isteğe bağlı komut meta verileriyle doğrudan test et
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

| Aşama    | Modlar                                                                                                                                                                 | Durum         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Aşama 1  | Kapalı, Lite                                                                                                                                                           | ✅ Gönderildi |
| Aşama 2  | Standart, Agresif, Ultra                                                                                                                                               | ✅ Gönderildi |
| Aşama 3  | RTK, Yığılmış, Sıkıştırma Kombinasyonları                                                                                                                              | ✅ Gönderildi |
| Aşama 4  | Çıktı Stilleri, SLM-katman Ultra, değerlendirme donanımı                                                                                                               | ✅ Gönderildi |
| Aşama 4C | Uyarlanabilir bağlam-bütçesi ("kadran") — hesaplama motoru + API (`contextBudget` üzerinde `PUT /api/settings/compression`) + kontrol paneli modu/politika kontrolleri | ✅ Gönderildi |

---

## Teşekkürler

Standard mod sıkıştırma kuralları, **[JuliusBrussee](https://github.com/JuliusBrussee)** tarafından geliştirilen **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) adlı viral "az token işe yarıyorsa neden çok token kullanasın" projesinden esinlenmiştir. Caveman, çıktı token'larında `~75%` azalma, kıyaslama testlerinde ortalama `65%` çıktı tasarrufu, `22-87%` çıktı aralığı ve `~46%` oranında bir girdi sıkıştırma aracı bildirmektedir.

RTK modu, **[RTK AI](https://github.com/rtk-ai)** tarafından geliştirilen **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** projesinden esinlenmiştir. Bu proje; terminal, derleme, test, git ve araç çıktısı filtreleme için yüksek performanslı bir komut çıktısı sıkıştırma projesidir. RTK, `60-90%` tasarruf bildirmekte ve README örnek oturumunda `~80%` tasarruf göstermektedir.

---

## Gelişmiş Sıkıştırma Sistemleri

7 standart modun ötesinde, OmniRoute bağlama göre otomatik olarak çalışan çeşitli
gelişmiş sıkıştırma sistemleri içerir.

### Önbellek Duyarlı Sıkıştırma

Bazı sağlayıcılar (Anthropic gibi, istem önbellekleme ile) **istem önbellekleme**
desteği sunar, bu da maliyetleri ve gecikmeyi azaltmak için istemin bazı kısımlarını
önbelleğe almalarını sağlar. Önbellekleme etkinleştirildiğinde, agresif sıkıştırma
aslında performansı **olumsuz etkileyebilir** çünkü önbelleğe alınmış belirteçleri
değiştirerek önbelleği geçersiz kılar.

`cachingAware.ts` modülü, **önbellekleme bağlamını algılayarak** ve sıkıştırma
stratejisini buna göre **ayarlayarak** bu sorunu çözer.

#### Nasıl çalışır

1. **Önbellekleme bağlamını algıla** — İstek gövdesini `cache_control` işaretleri için tarar
2. **Önbellekleme sağlayıcılarını belirle** — Hedef sağlayıcının önbelleklemeyi destekleyip desteklemediğini kontrol eder
3. **Stratejiyi ayarla** — Önbellekleme sağlayıcıları için `aggressive`/`ultra` modlarını `standard` moda düşürür
4. **Sistem istemini atla** — Sistem istemleri genellikle önbelleğe alınır, bu yüzden onları sıkıştırma
5. **Deterministik dönüşümler kullan** — Yalnızca tutarlı çıktı üreten dönüşümleri kullan

#### Kod örneği

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Önbellek işareti
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Ne zaman kullanılır

Önbellek duyarlı sıkıştırma **her zaman açıktır** — yapılandırmaya gerek yoktur.
Yalnızca şu durumlarda devreye girer:

- İstekte `cache_control` işaretleri varsa
- Hedef sağlayıcı istem önbelleklemeyi destekliyorsa (Anthropic, OpenAI vb.)

### Aşamalı Eskime

Uzun konuşmalar birçok mesaj dönüşü biriktirir, ancak eski dönüşler daha az
ilgili hale gelir. `progressiveAging.ts` modülü, **mesajları dönüş mesafesine
göre derecelendirir**:

- **Yakın dönüşler (0-3)**: Olduğu gibi korunur (tam detay)
- **Orta dönüşler (4-8)**: Hafif sıkıştırma (boşluk, biçimlendirme temizliği)
- **Eski dönüşler (9+)**: Mağara adamı sıkıştırması (doldurucu kaldırma, özetleme)
- **Çok eski dönüşler (20+)**: Yoğun bir şekilde özetlenir veya düşürülür

#### Kod örneği

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // İlk 3 dönüş: olduğu gibi
  light: 8, // 4-8. dönüşler: hafif sıkıştırma
  moderate: 20, // 9-20. dönüşler: mağara adamı sıkıştırması
  // 21+ dönüşler: yoğun özetleme
});

// saved = kaydedilen belirteç sayısı
```

#### Ne zaman kullanılır

Aşamalı eskime, `aggressive` ve `ultra` modları için **her zaman açıktır**.
Özellikle şunlar için etkilidir:

- Uzun süreli kodlama oturumları
- Çok günlük konuşmalar
- Birçok araç çağrısı içeren ajan tabanlı iş akışları

### Mağara Adamı Çıktı Modu

`outputMode.ts` modülü, modelin kendisinin sıkıştırılmış, kısa çıktı (bir "mağara
adamı" stili) üretmesini sağlamak için **sistem istemi talimatları** ekler.

#### Nasıl çalışır

Girdiyi sıkıştırmak yerine, bu mod şöyle bir sistem istemi ekler:

> "Minimal kelimelerle yanıt ver. Nezaketleri atla. Kısa cümleler kullan."

Bu özellikle şunlar için iyi çalışır:

- Kod üretimi (daha kısa çıktı = daha az belirteç)
- Hızlı Soru-Cevap (ayrıntılı açıklamalara gerek yok)
- Toplu işleme (verimi en üst düzeye çıkarın)

#### Ne zaman kullanılır

Mağara adamı çıktı modu **isteğe bağlıdır** — bunu birleşik yapılandırma aracılığıyla ayarlayın:

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

Yukarıdaki mağara adamı çıktı modu, **eski tek stil yoludur**. Aşama 4, bunu
birleştirilebilir çıktı stilleri kataloğuna genelleştirdi: `open-sse/services/compression/outputStyles/catalog.ts`
içindeki `OUTPUT_STYLE_CATALOG`. Her stil, modelin kendisinin daha ucuz çıktı
üretmesini sağlayan bir sistem istemi talimatıdır; stiller birlikte etkinleştirilebilir
ve katalog sırasına göre enjekte edilir.

| Stil                                    | `id`          | Ne işe yarar                                                                                                                                                                                                                       | Talimat dilleri                                                         |
| :-------------------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Kısa nesir                              | `terse-prose` | Dolgu/makale/kaçamak ifadeleri bırakır; teknik içeriği tam olarak korur. Eski caveman çıktı moduyla aynı metin (referans alınmış, yeniden yazılmamış).                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| Daha az kod                             | `less-code`   | YAGNI merdiveni: en küçük çalışan değişiklik, istenmeyen soyutlamalar yok.                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| At kuyruğu (tembel kıdemli geliştirici) | `ponytail`    | "En iyi kod, hiç yazılmayan koddur": yeniden kullanma > yeniden yazma, temel neden > semptom, en kısa çalışan fark.                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| DEHB'im var (önce eylem)                | `i-have-adhd` | Önce eylem (nesirden önce komut/yol/kod parçacığı), numaralandırılmış sınırlı adımlar, BİR somut sonraki adım, giriş/özet/kapanış yok. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) adresinden uyarlanmıştır. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                           |
| Kısa CJK (文言)                         | `terse-cjk`   | Klasik Çince ultra-kısa stil.                                                                                                                                                                                                      | zh (yerel ayar kısıtlı: yalnızca çözümlenen dil `zh` olduğunda sunulur) |

Her stil üç yoğunluk seviyesiyle birlikte gelir — `lite`, `full`, `ultra` — ve her seviye
paylaşılan sınırlar maddesiyle biter, bu da kod bloklarını, dosya yollarını, komutları,
hata dizelerini, URL'leri ve tanımlayıcıları olduğu gibi korur.

#### Enjeksiyon nasıl çalışır

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`),
seçimi kataloğa göre çözer (bilinmeyen kimlikler ve yerel ayar uyumsuz stiller
bırakılır, asla hata olmaz), seçilen talimatları katalog sırasına göre birleştirir,
sınırlar maddesini **bir kez** ekler ve sonucu tek bir idempontans işaretçisinin
(`[OmniRoute Output Styles]`) arkasındaki sistem istemine önceden yükler — yeniden
uygulama bir no-op'tur. Algılanan istek dilinin bir çevirisi olduğunda, İngilizce
yerine yerelleştirilmiş talimat enjekte edilir.

#### Nasıl etkinleştirilir

Kontrol panelinde: **Bağlam → Ayarlar → Sıkıştırma** — her stil için bir açma/kapama
düğmesi ve bir seviye seçici ile bir satır. Programatik olarak, sıkıştırma yapılandırması
seçimi şu şekilde kalıcı hale getirir:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Geriye dönük uyumluluk: eski `outputMode: "caveman"` kombinasyon ayarı hala çalışır ve
`terse-prose`'a eşlenir, her eski dilde eski enjeksiyonla bayt olarak aynıdır.

Dil seçimi: `languageConfig.enabled` açıkken, `autoDetect` en son kullanıcı mesajının
dilini seçer (giriş motorlarıyla aynı dedektör); `autoDetect`'i kapatmak
`defaultLanguage`'ı sabitler. Kapalı → İngilizce.

Stil × dil matrisi `tests/unit/compression/output-styles-i18n-matrix.test.ts`
tarafından sabitlenmiştir: yeni bir stil en az bir pt-BR çevirisi (veya açıkça
izlenen bir istisna) olmadan gönderilemez ve mevcut bir stil sessizce bir yerel
ayarı kaybedemez. Bir stil eklemek için bkz.
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Araç Sonucu Sıkıştırma

`toolResultCompressor.ts` modülü, araç sonuçları (fonksiyon çağrıları, aracı
çıktıları, arama sonuçları vb.) için **5 özel sıkıştırma stratejisi** sunar:

1. **Arama sonucu sıkıştırma** — Gereksiz sonuçları kaldırır, ilk N'yi tutar
2. **Dosya okuma sıkıştırma** — Büyük dosyaları keser, başlıkları/içe aktarmaları korur
3. **Kod yürütme sıkıştırma** — Yalnızca temel stdout/stderr'i tutar
4. **Veritabanı sorgu sıkıştırma** — Satırları sınırlar, ayrıntılı meta verileri kaldırır
5. **API yanıt sıkıştırma** — Boş alanları kaldırır, dizileri yoğunlaştırır

#### Ne zaman kullanılır

Araç çağrıları mevcut olduğunda araç sonucu sıkıştırma **her zaman açıktır**.
Yapılandırma gerekmez.

### Yığılmış İşlem Hattı

Yığılmış mod, **birden fazla motoru sırayla** çalıştırır — genellikle önce RTK
(araç çıktısında %60-90 tasarruf), ardından Caveman (kalan metinde %30 ek tasarruf).
Bu, **%78-95 toplam tasarruf** sağlar.

#### Nasıl çalışır

```
Giriş (1000 belirteç)
  → RTK (komut farkında filtre) → 200 belirteç
    → Caveman (dolgu kaldırma) → 140 belirteç
  → Çıktı (140 belirteç, %86 tasarruf)
```

#### Ne zaman kullanılır

Yığılmış modu şunlar için kullanın:

- Araç ağırlıklı iş akışları (ajanlı kodlama, araştırma)
- Maliyet duyarlı toplu işleme
- Maksimum belirteç tasarrufu gerektiğinde

Kombinasyon aracılığıyla yapılandırın:

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
