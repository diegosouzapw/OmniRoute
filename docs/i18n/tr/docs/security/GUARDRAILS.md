# Guardrails (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Doğruluk kaynağı:** `src/lib/guardrails/`
> **Son güncelleme:** 2026-08-29 — v3.8.51 (Video Bridge transkript kaynağı çağıran tarafından beyan edilir,
> henüz sunucu tarafından doğrulanmamaktadır — #11661 doğrultusunda netleştirildi)

Guardrail'ler, OmniRoute ile üst sağlayıcılar arasındaki sınırda güvenlik, politika ve içerik dönüşümlerini uygular. Her guardrail, istek yüklerini (`preCall`) ve üst sağlayıcı yanıtlarını (`postCall`) inceleyebilir (ve isteğe bağlı olarak reddedebilir, dönüştürebilir veya açıklama ekleyebilir).

Sistem **hata durumunda açık** çalışır: Bir guardrail yürütülürken hata oluşturursa kayıt defteri hatayı kaydeder ve isteği başarısız kılmak yerine sonraki guardrail ile devam eder. Engelleme açık bir karardır (`block: true`), asla kazara gerçekleşmez.

## Yerleşik Guardrail'ler

Kayıt defteri, içe aktarma sırasında öncelik sırasına göre altı guardrail'i otomatik olarak yükler
(bkz. `registry.ts` → `registerDefaultGuardrails()`):

| Öncelik | Ad                  | Aşama(lar)     | Dosya                 |
| ------- | ------------------- | -------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha düşük öncelik numaraları **önce** çalışır.

### Vision Bridge (`visionBridge.ts`) — Modalite Köprüsü PR-1

**Görüntü desteği olmayan modellere** yöneltilmiş, görüntü içeren istekleri yakalar ve üst sağlayıcı çağrısından önce isteğin tamamını görüntü destekli bir modele yeniden yönlendirir ya da görüntü bölümlerini yapılandırılabilir bir görüntü modeli tarafından üretilen metin açıklamalarıyla değiştirir. Bu, yalnızca metin destekleyen sağlayıcıların çok modlu yükleri şeffaf biçimde işlemesini sağlar.

Akış:

1. Hedef model görüntüyü zaten destekliyorsa atla (`isVisionBridgeForcedModel` zorunlu köprü listesinde yer almıyorsa).
2. Görüntü bölümlerini `extractImageParts(messages)` aracılığıyla çıkar
   (`visionBridgeHelpers.ts`); bu işlev, combo uyumluluk filtresiyle paylaşılan tek doğruluk kaynağı olan `open-sse/utils/mediaParts.ts` içindeki **birleşik medya algılayıcısı** `detectMediaParts()` işlevine devreder.
   Çıkarma işlemi, `replaceImageParts` işlevinin geri ekleyebileceği biçimlerin üst düzey bölümleriyle sınırlandırılmış izin listesine tabidir (çıkarma↔değiştirme sözleşmesi): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ve Responses API `input_image`. İç içe geçmiş eşleşmeler ve yalnızca gösterge niteliğindeki biçimler combo filtresi için kullanılır ve hiçbir zaman çıkarılmaz.
   Hiçbiri bulunmazsa atla.
3. Çalışma zamanı yapılandırmasını `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) aracılığıyla çözümle: yeni `modalityBridge*`
   ayar anahtarları önceliklidir; eski `visionBridge*` anahtarları **bir döngülük yedek**
   (geri alma aralığı) olarak kalır. Köprü devre dışıysa herhangi bir medya taraması yapmadan önce atla.
4. Mod seçici (`modalityBridgeVisionMode`, aşağıdaki tabloya bakın), yeniden yönlendirme ile açıklama arasında seçim yapar. Yeniden yönlendirme, yalnızca `model` değiştirilmiş bir `modifiedPayload` ile birlikte `{ rerouted, fromModel, toModel, imagesKept }` meta verisini döndürür.
5. Açıklama yolu: Görüntü sayısını `maxImages` ile sınırla, göreve duyarlı istemi oluştur, açıklama önbelleğine başvur, görüntü modelini **paralel olarak**
   (`Promise.allSettled`) çağır ve görüntülerin yerine `[Image N]: <description>` metin bölümlerini ekle. Başarısız bir açıklama `null` sonucunu verir ve özgün görüntü bölümü **korunur** (#4012) — combo açıklama yolunda tüm açıklamaların başarısız olduğu durum hariç; bu durumda, görüntü desteği olmadığı doğrulanmış üst sağlayıcıya bunun yerine
   `(unavailable — no vision-capable provider connected)` yer tutucusu gönderilir (#8430).
6. `modifiedPayload` ile birlikte meta veriyi (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) döndür.

#### Mod seçici (`modalityBridgeVisionMode`)

| Mod        | Varsayılan | Davranış                                                                                                                                                                                                                                                                                                                               |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Eski sezgisel yöntem değiştirilmemiştir (#6640/#7204): combo olmayan/`auto/` modeller, özgün model kullanılabilir kimlik bilgilerine sahip değilse en iyi görüntü modeline yeniden yönlendirilir (sahipse açıklama yapılır); combo hedeflerde her zaman açıklama yapılır.                                                              |
| `describe` |            | Her zaman açıkla — yeniden yönlendirme bloğu tamamen atlanır; her zaman kullanıcının seçtiği model yanıt verir.                                                                                                                                                                                                                        |
| `reroute`  |            | Yeniden yönlendirmeyi zorunlu kıl: Kimlik bilgilerine sahip modeli koruma denetimi atlanır. Yeniden yönlendirme **hedefi** için kimlik bilgisi denetimi uygulanmaya devam eder — kullanılabilir bir görüntü hedefi yoksa ham görüntülerin yalnızca metin destekleyen bir arka uca ulaşmaması için istek açıklama yoluna geçer (#8430). |

Zorunlu modlar, otomatik sezgisel yöntem çalışmadan **önce** kısa devre yapar; `auto` davranışı PR-1 öncesi guardrail ile bayt düzeyinde aynıdır.

#### Göreve duyarlı açıklama istemi (`modalityBridgeVisionTaskAware`)

Varsayılan değer **true**'dur. `composeVisionPrompt()` (`visionBridgeHelpers.ts`), temel açıklama istemine **son kullanıcı mesajının** metnini (500 karakterle sınırlandırılmış olarak) ekler; böylece açıklamayı kullanıcının gerçekten sorduğu şeye yönlendirir (codex-vision-proxy deseni) ve görüntü modelinden görünür metni yazıya dökmesini ister. Bayrak kapalıyken — veya kullanıcı metni yoksa — temel istem değiştirilmeden kullanılır.

Describe öz döngüsünün kendi OpenAI uyumlu isteği (`callVisionModelSingle()`
in `visionBridgeHelpers.ts`) her zaman `image_url.detail: "high"` ister —
her çağıran/sağlayıcı için koşulsuz olarak ve herhangi bir istemci sinyaline
bağlı olmadan. Düşük ayrıntılı örnekleme, tam olarak bu istemin istediği metin
transkripsiyonu görevinde OCR doğruluğunu düşürdüğünden, özgün gelen isteğin
kullandığı ayrıntı düzeyinden bağımsız olarak describe çağrısının kendisi her
zaman yüksek ayrıntı ister. Bu yalnızca dahili describe istek gövdesini etkiler;
OmniRoute'un çağıranın kendi `image_url.detail` değerini birincil istekte nasıl
ilettiğini değiştirmez — bu varsayılan ayrı olarak ve yalnızca algılanan OpenCode
istemcileri için `defaultImageDetail()` içinde uygulanır
(`open-sse/handlers/chatCore/upstreamBody.ts`). Describe öz döngüsünün Anthropic
kablo biçimi dalında `detail` alanı yoktur ve iki varsayılandan da etkilenmez.

#### Describe çıktı sınırı (`modalityBridgeVisionMaxChars`)

| Anahtar                        | Varsayılan | Aralık             |
| ------------------------------ | ---------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`        | `0` veya 100–50000 |

`0` (varsayılan), **sınır yok** anlamına gelir — `callVisionModel()` tarafından
döndürülen açıklama değiştirilmeden geçirilerek mevcut davranış korunur.
100–50000 aralığındaki herhangi bir değer, açıklamayı tekrar
`[Image N]: <description>` olarak eklenmeden önce `…` son ekiyle kısaltır
(`src/lib/guardrails/visionBridge.ts` içindeki
`VisionBridgeGuardrail.preCall()`). Alt akış modelinin tam transkripsiyona
ihtiyaç duyduğu, yoğun ayrıntı içeren OCR görevleri için bu değeri yükseltin;
fazla ayrıntılı yanıt veren görüntü modellerinde token kullanımını sınırlamak
için düşürün. Kontrol paneli alanı, Vision sekmesinin Advanced panelinde bulunur
(`ModalityBridgeVisionTab.tsx` içindeki `modality-bridge-max-chars`) ve açıkça
belirtilmiş `0` değerine dokunmadan 1 ile 99 arasındaki herhangi bir değeri
minimum 100'e yükseltir — `0`, yalnızca "ayarlanmamış" varsayılanı değil, kendi
başına geçerli bir Zod değeridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Describe önbelleği (`modalityBridge/bridgeCache.ts`)

Describe çıktıları için süreç genelinde paylaşılan bellek içi LRU + TTL
önbelleği. Anahtar =
`sha256(imageRef + composedPrompt + configuredBridgeModel)` ve uzunluk ön eki
çerçevelemesi kullanılır (alan sınırı çakışmaları yoktur). Model bileşeni,
gerçekte yanıt veren model değil, **yapılandırılmış** köprü modelidir —
`callVisionModel` dahili olarak yedek modele geçebilir ve anahtarın her denemeye
göre oluşturulması önbelleği parçalar. Başarısız describe işlemleri hiçbir zaman
önbelleğe alınmaz. Ayarlar:

| Anahtar                         | Varsayılan | Aralık  |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Uzak görüntü normalizasyonu (öz döngülü describe/base64 getirme)

Köprü bir **uzak** görüntüyü kendisi getirdiğinde — Anthropic describe öz çağrısı
ve claude kablo biçimli base64 dönüşümü (`ensureBase64ImagesForClaudeWire`);
ikisi de `visionBridgeHelpers.ts` içindeki `fetchRemoteImageAsDataUri()`
aracılığıyla yapılır — elde edilen veri URI'si, görüntü modeli isteğine
yerleştirilmeden önce `normalizeDataUri()` işlevinden geçirilir
(`open-sse/utils/imageNormalize.ts`). Aşırı büyük görüntüler, **2048px uzun
kenara** küçültülür (OpenAI/Anthropic'in zaten sunucu tarafında uyguladığı
yeniden boyutlandırma sınırıyla eşleşir); böylece görüntü modelinin gördüğü şey
değişmeden yükleme baytları/gecikmesi azalır. Yeniden boyutlandırma, dinamik
içe aktarmayla yüklenen `sharp` kullanır: yerel ikili dosyanın yüklenemediği bir
platformda `normalizeDataUri()` **hiçbir zaman hata fırlatmaz** — özgün baytları
değiştirmeden geçirmeye geri döner, böylece describe/base64 dönüştürme yolu her
zaman çalışmaya devam eder. Görüntü olmayan baytlar (kod çözülebilir bir görüntü
döndürmeyen bir getirme işlemi) da dokunulmadan geçirilir. Bu normalizasyon,
köprünün kendi öz çağrısı için getirdiği görüntülerle sınırlıdır — yalnızca
açıkça etkinleştirildiğinde değişiklik yapma ilkesiyle (Kesin Kural #20) tutarlı
olarak, çağıranın ham ve doğrudan geçirilen yüküne hiçbir zaman uygulanmaz.

#### Ayar şeması + geçiş

Yeni `modalityBridge*` anahtarları `updateSettingsSchema` içinde Zod ile
doğrulanır (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` üçlüsü ve Audio Bridge tarafından kullanılan
`modalityBridgeAudio*` grubu. `141_modality_bridge_settings.sql` geçişi, mevcut
eski `visionBridge*` değerlerini eşleşen yeni anahtarlara kopyalar (idempotenttir
ve operatör tarafından ayarlanmış bir `modalityBridge*` değerinin üzerine hiçbir
zaman yazmaz); eski anahtarlar bir sürüm döngüsü boyunca okuma için yedek olarak
kabul edilmeye devam eder.

#### Şeffaflık üstbilgisi + istatistikler

Describe ile dönüştürülmüş yanıtlar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
üstbilgisini taşır (`modalityBridge/bridgeStats.ts` içindeki
`buildModalityBridgeHeader()` tarafından oluşturulur ve
`src/sse/handlers/chatHelpers.ts` içindeki `withModalityBridgeHeader()`
tarafından eklenir). Yeniden yönlendirilen istekler **hiçbir** üstbilgi almaz —
yük değişmeden kalmıştır ve model değişimi zaten yanıt gövdesindeki `model`
alanında görünür.

`GET /api/modality-bridge/stats` (`GET /api/settings` ile aynı seviyede yönetim
kimlik doğrulaması), `vision`, `audio` ve `video` için bellek içindeki, modalite
başına sayaçları döndürür:
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`. `averageLatencyMs`, payda olarak
tüm denemeleri değil `latencySamples` değerini kullanır; zamanlaması olmayan bir
işlem, sıfır milisaniyelik sahte bir örnek oluşturmaz. `bridged`, başarılı
dönüşümler için geriye dönük uyumlu takma ad olarak kalır; başarısız denemeler
bu değeri artırmaz. Sayaçlar tasarım gereği süreç yeniden başlatıldığında
sıfırlanır (muhasebe değil, telemetri).

#### Kontrol paneli yapılandırması

Özel kontrol paneli sayfası
`/dashboard/settings/modality-bridge` adresindedir. URL ile adreslenebilen `Vision`, `Audio`
ve `Video` sekmeleri, `tab` değerini değiştirirken sorgu parametrelerini korur.
Vision sekmesi; etkinleştirme, mod, model seçimi (otomatik varsayılan dâhil),
göreve duyarlı istem oluşturma, gelişmiş zaman aşımı/görüntü/açıklama uzunluğu/önbellek
sınırları, çalışma zamanı
sayaçları ve korumalı bir örnek istek sunar. Audio sekmesi de etkin durumdadır:
etkinleştirme, Auto seçeneğine sahip yalnızca STT modellerini içeren bir model seçici,
zaman aşımı/maksimum klip sınırları, ses sayaçları ve bir `input_audio` örnek testi
sunar. Video sekmesi işlevseldir: dört açık kullanıcı arayüzü durumundan biriyle
FFmpeg/ffprobe çalışma zamanı durumunu bildirir (inceleme devam ederken veya
tamamlanamadığında `unknown`, incelemenin istemci tarafında atlandığı geri döngü
olmayan bir kontrol paneli ana makinesinde `restricted`, incelenip eksik olduğu
doğrulandığında `unavailable` veya FFmpeg/ffprobe sürümleriyle birlikte `available`);
etkinleştirme/model/kare/video/zaman aşımı sınırlarını kalıcı olarak saklar, model
seçiciyi görüntü işleme yeteneğine sahip modellerle sınırlar ve video sayaçlarını
sunar.

AI ayarları altındaki eski Vision Bridge kartı artık yeni sayfaya yönlendiren bir
uyumluluk bağlantısıdır; formun ikinci bir kopyasını artık barındırmaz. Media
Providers da mevcut Speech-to-Text deneme alanını kaldırmadan Image-to-Text ve
Speech-to-Text iş akışlarını ilgili Modality Bridge sekmelerine bağlar.

**Kendi döngüsü için kabul denetimi atlaması:** Açıklama çağrısı OmniRoute'un kendi
`/v1` geri döngüsü (standart olmayan sağlayıcı modeli) üzerinden yönlendirildiğinde
alt istek `x-omniroute-admission-bypass: internal` gönderir ve çözümlenen geri döngü
kimlik bilgisiyle doğrulanır: yerel modda yerel `sk_omniroute` sentinel değeri veya
operatör tarafından yapılandırılan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ortam
anahtarı (#1350). Böylece `REQUIRE_API_KEY=true` dağıtımları açıklama çağrısını
çalıştırmaya devam edebilir. Atlama yalnızca tam olarak bu kimlik bilgileri için
kabul edilir; dolayısıyla harici istemciler kabul denetimini atlamak için bu
üstbilgiyi kullanamaz.

Eski varsayılanlar `src/shared/constants/visionBridgeDefaults.ts` içinde bulunur;
yeni mod/göreve duyarlı/önbellek varsayılanları ve ayar çözümleyicisi
`src/shared/constants/modalityBridgeDefaults.ts` içinde bulunur. Koruma katmanı,
testlerin sahte `getSettings` ve `callVisionModel` uygulamaları enjekte edebilmesi
için bir `deps` oluşturucu seçeneği sunar.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ses girdisini kabul ettiği bilinmeyen bir hedefe ulaşmadan önce ses içeren sohbet
isteklerini yakalar. Sohbet isteğini hiçbir zaman yeniden yönlendirmez: ses
parçaları mevcut OpenAI uyumlu multipart uç noktası üzerinden yazıya dökülür ve
seçilen sohbet modeli metin transkriptleriyle devam eder.

Akış:

1. `supportsAudio` değerini `getResolvedModelCapabilities()` üzerinden çözümleyin.
   Önce açık sağlayıcı kayıt defteri meta verileri, ardından statik model meta
   verileri ve son olarak eşitlenmiş `modalities_input` öncelik kazanır. `audio`
   içermeyen bildirilmiş bir girdi listesi `false` olur; hiçbir yetenek kanıtı
   bulunmaması hâlinde değer `null` kalır. Hem `false` hem de `null` tutucu
   köprüyü etkinleştirirken `true` bunu atlar.
2. `modalityBridgeAudio*` ayarlarını çözümleyin ve paylaşılan `detectMediaParts()`
   algılayıcısı aracılığıyla her mesajdan birleştirilebilir üst düzey ses
   parçalarını çıkarın. Desteklenen aktarım biçimleri OpenAI `input_audio`,
   `audio_url` ve `source.media_type: "audio/*"` biçimleridir. İç içe geçmiş ses,
   yönlendirme için algılanır ancak birleştirme yolu tarafından kaldırılmaz.
   İş miktarı `modalityBridgeAudioMaxClips` ile sınırlandırılır; sonraki parçalar
   değiştirilmeden kalır.
3. Yapılandırılmış bir `provider/model` değerini kullanın veya
   `selectAudioBridgeModel()` işlevinin `AUDIO_TRANSCRIPTION_PROVIDERS` üzerinde
   kararlı katalog sırasıyla ilerleyip kullanılabilir etkin sağlayıcı kimlik
   bilgisine sahip ilk modeli seçmesine izin verin.
4. `callAudioTranscription()`, base64/data-URI sesini multipart bir `file`
   alanına dönüştürür veya uzak bir `audio_url` kaynağını DNS sabitlemeli ve
   25 MB sınırlı, yalnızca herkese açık çıkış koruması üzerinden indirir.
   Ardından dosyayı ve seçilen modeli, `resolveSelfLoopBearer()` ile doğrulanan
   yerel `/v1/audio/transcriptions` geri döngüsüne POST eder. Mevcut transkripsiyon
   rotası normal kimlik bilgisi aramasını, bekleme süresi/hız sınırı işlemeyi ve
   sağlayıcıya yönlendirmeyi gerçekleştirir.
5. Başarılı çağrılar kendi parçalarını `[Audio N]: <transcript>` ile değiştirir.
   Çağrılar `Promise.allSettled` ile çalışır: tekil bir hata ilgili özgün ses
   parçasını korur (#4012 sözleşmesi). Tüm çağrılar başarısız olursa ve hedefin
   `supportsAudio === false` olduğu kanıtlanmışsa parçalar
   `[Audio N]: (unavailable — no STT provider connected)` hâline gelir (#8430
   sözleşmesi). Bilinmeyen bir hedef (`null`) için tümü başarısız olan sonuç
   değiştirilmeden kalır. Kullanılabilir STT kimlik bilgisi bulunmayan, yalnızca
   metin desteklediği kanıtlanmış bir hedef, ağ çağrısı yapılmadan aynı açık
   yer tutucuyu alır.

Başarılı transkriptler, süreç genelindeki Modality Bridge LRU/TTL önbelleğini
kullanır. Anahtar; ses referansını, kararlı `audio-transcription` işlem etiketini
ve seçilen STT modelini birleştirir; hatalar hiçbir zaman önbelleğe alınmaz. Ses
denemeleri paylaşılan `bridged`, `cacheHits`, `failures` ve `lastUsedAt`
sayaçlarını günceller. Dönüştürülen yanıtlar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` üstbilgisini
taşır; değiştirilmemiş istekler bir Audio Bridge segmenti almaz.

Çalışma zamanı ayarları DB desteklidir ve Zod ile doğrulanır:

| Anahtar                       | Varsayılan | Aralık                |
| ----------------------------- | ---------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                     |
| `modalityBridgeAudioModel`    | `""`       | Auto veya STT kimliği |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10                  |

Paylaşılan önbellek `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` tarafından
denetlenmeye devam eder.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Bilinen yerel video desteği olmayan bir hedef çağrılmadan önce Chat Completions `messages` ve Responses API `input` içindeki üst düzey video parçalarını yakalar. Desteklenen biçimler `input_video`, `video_url`, `video_source`, HTTPS URL'leri ve `data:video/*;base64,...` veri URI'leridir. Metin içindeki yalın dosya adları video olarak değerlendirilmez.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`), istek dolaşımını, yetenek/politika denetimini, istek başına toplulaştırmayı ve yanıt yükünü yönetir. Video başına çalışma — edinme, tüm sonuç önbelleği, bir kare dizisinin açıklanması (çağrıyı yapanın bildirdiği herhangi bir ses transkriptini birleştirir) ve deneme başına metrikler/iptal/temizleme — `videoBridgePipeline.ts` içindeki `processVideoPart` arkasında gizlenir ve `preCall` döngüsü içinde her video parçası için bir kez çağrılır. Bu modül ayrıca açık port sınırları olan `VideoMediaBrokerPort` (baytların edinilmesi ve örneklenmiş karelerin çıkarılması), `VideoAudioTranscriptionPort` (çağrıyı yapanın bildirdiği bir ses transkriptinin örneklenmiş altyazılarla birleştirilmesi) ve `VideoDrilldownPort`'u (kare ayrıntılandırma kalıcılığı sınırı; henüz `processVideoPart` içine bağlanmamıştır — günümüzde ayrıntılandırma girdilerini yalnızca ayrı `/api/modality-bridge/video/drilldown` rotası yazar) tanımlar.

Genel `/v1` istek yolu hiçbir zaman bir alt süreci içe aktarmaz veya çağırmaz. Uzak videolar 50 MiB sınırı altında indirilir; satır içi base64 videoları, model/iletiler/çerçeveleme zarfının 50 MiB'lik genel JSON istek kabul sınırı içinde kalabilmesi için video başına kodu çözülmüş veri açısından ihtiyatlı bir 36 MiB sınırına sahiptir. Satır içi uzunluk ve kodu çözülmüş boyut tahminleri, bellek ayırmadan önce denetlenir. İlk uzak URL'de ve her yönlendirmede HTTPS zorunludur ve DNS sabitlemeli mevcut yalnızca genel adreslere izin veren giden trafik koruması kullanılır. Baytlar daha sonra tam olarak dahili `POST /api/modality-bridge/video/extract` aracı sınırından geçer. Bu rota hem `LOCAL_ONLY` hem de `SPAWN_CAPABLE` özelliğindedir; yalnızca süreç başına kimliği doğrulanmış, güvenilen geri döngü isteğini kabul eder ve hiçbir zaman URL, dosya sistemi yolu, çalıştırılabilir dosya veya bağımsız değişken listesi kabul etmez. API gövde boyutu işlem hattı ve işleyicinin artımlı gövde okuyucusu, 50 MiB'lik aracı giriş sınırını birbirinden bağımsız olarak uygular. Sınırlı kuyruğu aynı anda bir çıkarma işlemi çalıştırır, bekleyen dört işe izin verir ve bekleyen girdiyi 100 MiB ile sınırlar.

Aracı içinde `ffprobe`, özel bir yerel dosyayı okur; sabit biçim izin listesi, oynatma listesi ve bildirim biçimlerini hariç tutar. İzin verilen MOV ailesi kapsayıcılarında harici MOV veri başvuruları varsayılan olarak devre dışı kalır ve sabit komut bunları etkinleştirmez. Hem `ffprobe` hem de `ffmpeg`, yalnızca `file` protokolü izin listesini, tek iş parçacığını, sabit bağımsız değişken dizilerini ve kabuksuz çalıştırmayı kullanır; çalıştırılabilir dosyalar `PATH` üzerinden çözümlenir. Eklenmiş resim niteliğindeki kapak akışları oynatılabilir adaylar değildir. Tüm oynatılabilir akışlar sınırlara uymalıdır ve deterministik en düşük indeksli geri dönüşten önce açıkça belirtilmiş varsayılan akış tercih edilir. Videolar 600 saniye, boyut başına 8.192 piksel ve 33.554.432 kaynak piksel ile sınırlandırılmıştır. FFmpeg, orta noktalardan 1–16 JPEG kare örnekler, küçük girdileri büyütmeden uzun kenarı en fazla 1.024 piksele küçültür ve hiçbir zaman URL almaz. Örnekleme varsayılan olarak `uniform` değerindedir. İsteğe bağlı `scene_aware` ve deneysel `segment_aware` politikaları, önceden doğrulanmış yerel akış üzerinde ek bir sabit FFmpeg geçişi gerçekleştirir, sınırlı `showinfo` sahne zaman damgalarını seçer ve algılayıcı hatası, zaman aşımı, hatalı biçimlendirilmiş çıktı veya boş aday kümesi durumunda deterministik olarak aynı tekdüze orta noktalara geri döner. Segment duyarlı mod, orta nokta örneklerini doğrulanmış sahne aralıklarına orantılı biçimde tahsis eder; segment duyarlı kanıtlar ve geri dönüş davranışı aşağıda ayrıntılı olarak açıklanmıştır. Kesin 16 kare sınırı, her politikada seçimden sonra uygulanır. Sahne duyarlı bir isteğin yalnızca tek karelik bütçesi olduğunda, etkin tam video veya odak penceresinin tekdüze orta noktasını kullanır ve `policyEffective: uniform` bildirir: seçilen tek bir sahne karesi, zamansal aralığın her iki ucunu da koruyamaz. Çağrıyı yapan, isteğe bağlı olarak sonlu bir odak penceresi (`start`/`end` saniyeleri) sağlayabilir; sınırlar medya süresine göre kısıtlanır, ters çevrilmiş veya sonlu olmayan pencereler reddedilir ve tüm örnekleme politikaları yalnızca normalleştirilmiş aralık içinde gerçekleştirilir. Ortaya çıkan pencere, örnekleme meta verilerine ve güvenilmeyen açıklama önekine dahil edilir; böylece aşağı akış modelleri odaklanmış bir kesiti tam zaman çizelgesinden ayırt edebilir.

Anlamsal altyazı odağı, ayrı ve açık bir ayardır. Varsayılan `full` analiz modu, mevcut kare istemini korur ve istek metnini hiçbir zaman altyazı modeline iletmez. `focused` modunda köprü, aynı Chat veya Responses kapsayıcısından yalnızca kullanıcı tarafından yazılmış en son boş olmayan `text`/`input_text` değerini okur, bunu NFC biçimine normalleştirir, denetim karakterlerini ve boşlukları daraltır ve 500 Unicode kod noktasıyla sınırlar. Boş bir sonuç, tam olarak `full` istemine geri döner. Kullanılabilir bir ipucu, ayrılmış bir güvenilmeyen kullanıcı bağlamı bloğu içinde JSON olarak serileştirilir ve yalnızca gözlemlenebilir ayrıntıklara öncelik verebilir; medyada görünen veya duyulan talimatlara uymamaya yönelik ayrı uyarıyı geçersiz kılamaz. Metinsel odak hiçbir zaman `start`/`end` çıkarımı yapmaz veya zamansal örnekleyiciyi değiştirmez.

#### FU-07 yapısal segment kanıtı

`segment_aware`, önceden doğrulanmış yerel video akışı üzerinde tek bir sınırlı ön analiz geçişi kullanır. Sabit filtre zinciri önce genişliği en fazla 320 piksele ölçekler, sahne değişikliklerini ve donmuş aralıkları algılar, ardından bulanıklık, ortalama luma ve uzamsal/zamansal bilgiler için saniyede 1 kare örnekler. Geçiş; 600 yapısal örnekle, tek bir FFmpeg/filtre iş parçacığıyla, aynı yalnızca `file` protokolü ve kapsayıcı izin listeleriyle, 1 MiB'lik süreç çıktısı sınırıyla ve aracının paylaşılan iptal/son tarih süresi içinde en fazla 30 saniyeyle sınırlandırılmıştır. İstekten hiçbir zaman komut, filtre, yol veya URL kabul etmez.

Yapısal değerler, anlamsal video anlayışı değil, deterministik örnekleme kanıtlarıdır. Özneler, eylemler, altyazılar, konuşmalar veya kullanıcı amacı hakkında çıkarım yapmazlar. Sahne ve donma sınırları segmentleri oluşturur; donma kapsamı, bulanıklık, pozlama, uzamsal ayrıntı ve zamansal değişim yalnızca mevcut 1–16 karelik bütçenin nasıl tahsis edileceğini etkiler. Tamamen donmuş bir segment en fazla bir kareyle sınırlandırılırken donmamış segmentler kalan bütçe için yarışır. Sınırların sayısı karelerin sayısını aştığında, hızlı erken kesmelerin uzun bir son segmenti gizleyememesi için zaman çizelgesinin tekdüze kapsamı korunur. Bir donma sınırının 1 saniyelik analiz çözünürlüğü içinde kalan sahne sınırları birleştirilir.

Eksik filtreler, hatalı biçimlendirilmiş/boş kanıtlar, bir algılayıcı hatası veya sınırlandırılmış ön analiz zaman aşımı, tam olarak tekdüze orta nokta politikasına açık geçiş yapar. Çağıranın iptali veya aracının son tarihi açık geçiş yapmaz: devam eden alt süreci sonlandırır, daha sonra kare çıkarılmasını önler ve özel geçici ağaç `finally` içinde kaldırılır.

`scripts/perf/video-bridge-fu07-eval.ts`; yinelenenler kaldırıldıktan sonraki altyazı çağrısı tasarrufları, yoğun hareket bütçesi tahsisi, bulanıklık/pozlama/SI-TI kanıtları, uzun bir kuyruğa sahip hızlı kesmeler ve kademeli kararma kaynaklı yanlış pozitifler için deterministik, gerçek FFmpeg fikstürleri üretir. Ön analiz duvar saati süresini ve `/usr/bin/time` kullanılabilir olduğunda alt süreç CPU kullanımını ve en yüksek RSS değerini kaydeder. Kalite kontrolleri yalnızca yapısal doğrulama ölçütleridir. Bu test düzeneğinin yetkili bir uç noktası veya sabitlenmiş bir değerlendiricisi olmadığından gerçek altyazı modeli kalitesi `HOLD` durumunda kalır. `--caption-cost-per-call-usd` açıkça pozitif bir çağrı başına maliyet tahmini sağlamadığı sürece parasal tasarruflar da `HOLD` durumunda kalır; betik hiçbir sonucu uydurmaz.

Her kare 4 MiB ile, tüm ham kareler birlikte 23 MiB ile ve serileştirilmiş aracı yanıtı 32 MiB ile sınırlandırılmıştır. Özel geçici dizin `finally` içinde kaldırılır. OmniRoute, FFmpeg'i paketine dahil etmez ve özel bir yürütülebilir dosya yolu kabul etmez. Altyazı oluşturmadan önce köprü, ölçülü bir görsel yinelenenleri kaldırma geçişi uygular: her JPEG, 16×16 gri tonlamalı bir arabelleğe indirgenir ve yalnızca tutulan son kareyle karşılaştırılır. Bir kareden fazla istenen altyazı bütçesi için çıkarma işlemi, bu bütçenin en fazla iki katı ve hiçbir zaman 16 kareden fazla olmayan, sınırlandırılmış bir aday havuzu sağlar. İstenen üst sınır yalnızca yinelenenler kaldırıldıktan sonra uygulanır; bütçe en az iki olduğunda son seyreltme sırasında seçilen ilk ve son adaylar korunur. Sürümlendirilmiş `grayscale-16x16-mean-cells-v2` politikası, ortalama parlaklık farkı ile normalleştirilmiş farkı en az 0.05 olan küçük resim hücrelerinin oranından büyük olanı kullanır. Yinelenen eşiği, çalışma zamanı ayarı olarak sunulmak yerine öngörülebilirlik amacıyla seçilmiş 0.04 sabitidir. Bu ikincil yüksek kontrastlı sinyal, yalnızca ortalamaya dayalı bir karşılaştırmanın gizleyebileceği küçük hareketleri ve görünür metin değişikliklerini korur. Karşılaştırıcı veya kod çözücü hataları açık geçiş yaparak kapsamı korur. Çıktı meta verileri; çıkarılan adayları, başarıyla kullanılan kareleri ve atılan görsel yinelenenleri birbirinden ayırır.

Açıkça işaretlenmiş bir video parçası, zaman damgalı bir kontak sayfası isteyebilir. Köprü, en fazla 4 sütunlu ve 16 kareli bir JPEG ızgarası oluşturur. Her 512 piksellik hücre, kaynak zaman damgasını yüksek kontrastlı bir alt banda işlerken aynı zaman damgaları, sonraki aşamalarda ilişkilendirme ve denetim için metinsel meta verilerde de tutulur. Tam JPEG 32 MiB ile sınırlı kalır. `sharp` ızgaranın kodunu çözemez veya ızgarayı oluşturamazsa köprü ayrı JPEG karelerine geri döner; istemci iptali yine de sayfa işlemi boyunca iletilir.

Yükseltme kanıtları, sentetik birleştirme mikro karşılaştırmalı değerlendirmesinden bilinçli olarak ayrı tutulur. `scripts/perf/video-bridge-contact-sheet-eval.ts`, gerçek OpenAI uyumlu görüntü modelleri için şema sürümlü bir A/B test düzeneği tanımlar. Sağlayıcı tarafından bildirilen belirteçleri, uçtan uca duvar saati gecikmesini (sayfa oluşturma dahil), model çağrısı sayısını ve manifest tarafından tanımlanan olgu korunumunu ölçer. Ham model yanıtları rapora yazılmaz; yalnızca SHA-256 özetleri ve eşleşen olgu kimlikleri saklanır. `--execute-real` geçirilmedikçe ve `--model`, `OMNIROUTE_BASE_URL` ile `OMNIROUTE_API_KEY` yapılandırılmadıkça test düzeneği hiçbir ağ veya ücretli model çağrısı yapmaz. Bu açık gerçek çalıştırma olmadan, makine tarafından okunabilir kararı `HOLD` olarak kalır; sentetik yük/çağrı sayısı ölçümleri tek başına yükseltme kanıtı değildir.

Çağıranlar, hâlihazırda hizalanmış metne sahip olduklarında desteklenen bir video parçasına isteğe bağlı bir `transcript.cues` dizisi ekleyebilir. Her ipucu `text`, yoklanan süre içinde sonlu bir `start`/`end` aralığı ve izin verilenler listesindeki bir `source` (`client`, `embedded` veya `audio-bridge`) içermelidir; `confidence` varsayılan olarak `1` değerini alır ve `0` ile `1` arasında kalmalıdır. Tam olarak yinelenen ipuçları birleştirilir. OmniRoute bu meta verilerden hiçbir zaman transkripsiyon başlatmaz: doğrulanmış ipuçları kaynak, güven ve aralık bilgileriyle birlikte açıklanan sonuca kopyalanır ve kare altyazılarının yanında güvenilmeyen gözlemler olarak işlenir. Geçersiz, aralık dışı veya kaynağı belirtilmemiş metinler altyazı akışına karıştırılmak yerine reddedilir. `source` alanı şu anda sunucu tarafından doğrulanmış değil, çağıran tarafından beyan edilmiştir: OmniRoute, değerin izin verilen üç dizeden biri olmasını zorunlu kılar ancak bir `embedded` veya `audio-bridge` etiketinin gerçekten sunucunun sahip olduğu bir çıkarma işleminden geldiğini henüz kriptografik olarak doğrulamaz. Bu doğrulama uygulanana kadar `source` değerini güvenilmeyen bir ipucu olarak değerlendirin; yetkilendirme kararlarını buna dayandırmayın.

İleri düzey bir çağıran, aynı video için önceden yetkilendirilmiş bir `audioTranscript` izi sağlayabilir. Birleştirme katmanı, görsel ve sesli gözlemleri tek bir son tarih ve iptal sinyali altında çalıştırır, bunları ortak bir zaman çizelgesinde sıralar, tamamen aynı olanları birleştirir ve yalnızca bir taraf başarılı olduğunda kısmi bir sonuç bildirir. Geçersiz bir `audioTranscript`, videonun tamamının başarısız olmasına neden olmak yerine bu kısmi sonuca indirgenir — görsel açıklama korunur ve ses dalı temizlenmiş bir hata kodu kaydeder. Dal bazında kullanılabilirlik, kısmi bayrağı ve temizlenmiş hata kodları; açıklanan sonuçta, koruma önlemi meta verilerinde (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), sonuç önbelleği meta verilerinde ve köprü birleştirme sayaçlarında korunur. Varsayılan Video Bridge yolu konuşmayı metne dönüştürme işlemini çağırmaz veya ikinci bir medya kopyası indirmez; bu açık iz olmadan yalnızca video modunda kalır.

**Transkript saklama (#12150 P1).** Bu, Video Bridge (kendisi isteğe bağlıdır) bir transkript ipucu oluşturduğunda otomatik olarak uygulanır — ayrı bir saklama bayrağı yoktur. Bir istek herhangi bir transkript ipucu (çağıran tarafından bildirilmiş bir `transcript` veya birleştirilmiş bir `audioTranscript`) oluşturduğunda, koruma önlemi bunu `videoBridgeObserved` olarak işaretler ve video açıklamasının sansürlenmiş bir gölgesini üretir — her ipucunun serbest metin gövdesinin `[redacted-video-transcript]` ile değiştirildiği özdeş bir oluşturumdur; dize birleştirilmeden önce yapılandırılmış ipucu alanı değiştirilerek oluşturulur (düzleştirilmiş metin hiçbir zaman ayrıştırılmaz; böylece kötü amaçlı veya olağan hiçbir ipucu içeriği, `]` içeren `[inaudible]`/`[music]` gibi gövdeler dâhil, varlığını sürdüremez). Kalıcı çağrı günlüğü istek gövdesi, içerik eşitliğine göre eşleştirerek videodan türetilen her metin bölümünü bu sansürlenmiş gölgeyle değiştirir; `fullText` bağlantısı, tamamlanmış çağrı öncesi koruma önlemi yükünden yeniden okunur. Böylece daha sonraki zincir koruma önlemleri (10/95 öncelikli PII ve kimlik bilgisi maskeleyicileri) açıklama metnini yerinde yeniden yazdıktan ve sistem istemi/devir/bellek ekleme işlemleri mesaj dizisini yeniden şekillendirdikten sonra da eşleşme başarılı olur. Modele gönderilen gövde değişmeden kalır. Gözlemlenen bir istek ayrıca hiçbir kalıcı Memory verisi oluşturmaz (hem istekten hem de yanıttan türetilen çıkarma atlanır); dolayısıyla modelin kendi yanıtı transkript metnini Memory içine yansıtamaz.

Hâlâ açık olan ve sonraki çalışma için izlenen saklama yüzeyleri (**P2**, #12430): ayrıntılı günlük artefaktındaki koruma öncesi ham istemci isteği anlık görüntüsü; `previous_response_id` devam işleminin kapalı durumda başarısız olması; transkripti sentezlenmiş bir dize istemine gömen türetilmiş istem iç gönderimleri (işlem hattı aşamaları, bağlam devri); ve transkriptten alıntı yapan bir model yanıtının yanıt gövdesi / semantik önbellek kopyası. Bunlar, P1'in kalıcı istek gövdesi + Memory kapsamı dışında kalan ham/yanıt sınıfı veya isteğe bağlı yüzeylerdir.

Dâhilî `/api/modality-bridge/video/drilldown` yaşam döngüsü, ayrı bir geri döngü/token kimlik doğrulamalı önbellek altyapısıdır. Her işlem ayrıca kanonik, opak bir asıl kimlik gerektirir. Bir üretim çağıranı etkinleştirilmeden önce bu kimliği, kimliği doğrulanmış kiracıdan türetmeli ve istemci tarafından seçilmiş bir değeri hiçbir zaman iletmemelidir. Önbellek anahtarları bu asıl kimliği kanonik oturum ve video referansı kimliklerine bağlar, yalnızca bunların SHA-256 ile türetilmiş anahtarlarını saklar ve hem okumaları hem de silme işlemlerini aynı asıl kimlikle sınırlar. Önbellek, girdi başına en fazla 16 türetilmiş JPEG karesi saklar, bunların süresini on dakika sonra doldurur ve sınırlı `start`/`end` okumalarını veya açık oturum silmeyi destekler.

Her asıl kimlik 16 girdi ve 64 MiB kanonik JPEG verisiyle sınırlıdır. Bu sınırlar, genel 64 girdi/256 MiB üst sınırından bağımsızdır: asıl kimlik kotası baskısı, genel LRU çıkarma işlemi değerlendirilmeden önce yalnızca ilgili asıl kimliğin en uzun süredir kullanılmayan girdilerini çıkarır. Süresi dolmuş girdiler, önbellek etkinliği sırasında hem asıl kimlik hem de genel hesaplamadan temizlenirken iptal ve doğrulama hatası kısmi bir değişikliği kaydetmez.

Önbellek; kanonik olmayan Base64'ü, fazla dolguyu, JPEG olmayan medyayı, hatalı biçimlendirilmiş veya kesilmiş JPEG'leri ve sınırlı bir tam görüntü `sharp` kod çözme işlemi sırasında uyarı üreten JPEG'leri reddeder. Kabul edilen her görüntüyü kanonik JPEG olarak yeniden kodlar, çağıran alanlarına güvenmek yerine genişlik ve yüksekliği kodu çözülmüş baytlardan türetir ve sondaki çok biçimli baytları saklamak yerine atar. Her iki kotaya da yalnızca sınırlı kanonik sıkıştırılmış tampon dâhil edilir. JSON aktarım sınırı, 32 MiB'lik kodu çözülmüş girdi üst sınırı için Base64 ek yükünü içerir. Saklanan her türetim; doğrulanmış JPEG biçimini/çözünürlüğünü, örnekleme politikasını, türetim sürümünü, oluşturulma zamanını, sunucu tarafından hesaplanan içerik karmasını ve karması alınmış üst referans ile güvenilir çağıranın üst içerik karmasını kaydeder. İptal, atomik önbellek kaydından önce eşzamansız kod çözme/karma aşamaları arasında denetlenir.

Bu dilim henüz üretim amaçlı bir üreticiyi rotaya bağlamaz ve çok çözünürlüklü varyant seçimi sağlamaz. Bu nedenle şeffaf Video Bridge istek yolu ek bir iş yüküne yol açmaz; kiracıya bağlı asıl kimlik türetme ve tam FU-08 çok çözünürlüklü yaşam döngüsü ise tamamlanmış davranış olarak belgelenmek yerine açık takip çalışmaları olarak kalır.

Karelere, yapılandırılmış Video modeliyle sıralı olarak açıklama eklenir. Boş bir
Video geçersiz kılma ayarı, Vision ayarını devralır; her ikisi de boşsa Vision
otomatik yönlendiricisi, etkin görsel işleme yetenekli modeli seçer. Başarılı açıklamalar,
özgün parçayı sabit bir `[Video description:` önekiyle değiştirir; bu önek ayrıca
metni güvenilmeyen, medyadan türetilmiş bir gözlem olarak işaretler ve sonraki
modellere medyada bulunan talimatları izlememelerini söyler. Kare açıklaması önbellek
anahtarları JPEG baytlarını, istemi, zaman damgasını ve etkin modeli içerir; yalnızca
başarılı açıklamalar önbelleğe alınır. Önbellek girdileri, yedek model dâhil olmak üzere
gerçekte başarılı olan üretici modeli saklar; farklı kareler farklı modeller tarafından
üretildiğinde köprü `mixed` bildirir. Bir önbellek isabeti, üretici kimliğini istenen
yönlendirme planı olarak yeniden etiketlemek yerine yeniden kullanır. Tüm video sonucu
önbelleği, çıktıyı değiştiren her girdiye göre anahtarlanır — istem, etkin model,
örnekleme politikası, kare sayısı, anlamsal analiz modu, normalize edilmiş odaklanma
ipucunun SHA-256 parmak izi, odaklanma penceresi, `transcript`,
`audioTranscript` ve kontak sayfası bayrağı — dolayısıyla bu boyutlardan herhangi
birinin değiştirilmesi önbellek ıskalamasına yol açar; eski bir sonuç hiçbir zaman
yeniden kullanılmaz. Görsel tekilleştirme politikası sürümü, eşiği ve sınırlandırılmış
aday kare sayısı da sonuç önbelleği anahtarında ve meta verilerinde açıkça yer alır;
bu nedenle bir politika değişikliği, eski bir tüm-video açıklamasını yeniden kullanamaz.
Sonuç önbelleği v4 meta verileri modu ve parmak izini saklar, ham kullanıcı görevini
asla saklamaz. Koruma katmanı meta verileri hem istenen hem de etkin analiz modlarını
bildirir; kullanılabilir kullanıcı metni olmadan istenen `focused` modu, etkin olarak
`full` şeklinde bildirilir.

Koruma katmanı, desteklenen her video parçasını çıkarır ancak en fazla
`modalityBridgeVideoMaxVideos` kadarını açıklar. `supportsVideo === false`
olduğu kanıtlanmış bir hedef için başarısız olan ve sınırı aşan videolar, ham videonun
kalmaması amacıyla açık ve güvenli metin işaretlerine dönüştürülür. Yetenek bilinmiyorsa
bu parçalara dokunulmaz. `supportsVideo === true` değerine sahip hedefler köprüyü
atlar. İstemci isteğinin iptal sinyali indirme, broker kuyruğu, alt süreçler ve açıklama
çağrıları boyunca yayılır; iptaller videolar arasında işlemi durdurur ve ham medyaya
izin verecek şekilde açık kalmaz.

Çalışma zamanı ayarları DB desteklidir ve Zod ile doğrulanır:

| Anahtar                             | Varsayılan  | Aralık / davranış                                                                                                |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İsteğe bağlı çalışma zamanı, açıkça etkinleştirme gerektirir                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` genel açıklamaları korur; `focused`, sınırlandırılmış ve güvenilmeyen en son kullanıcı bağlamını kullanır |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini devralır                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` veya orantılı `segment_aware`; algılayıcı hatasında `uniform` seçeneğine geri dönülür   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                   |

Kalıcı hâle getirilmiş eski Video zaman aşımı değerleri 120 saniyeyi aşıyorsa broker
son tarihine sınırlandırılır; bu sınırın üzerindeki yeni ayar yazımları reddedilir.
`GET /api/modality-bridge/video/runtime`, kimlik doğrulama veya çalışma zamanı
yoklamasından önce güvenilir biçimde damgalanmış geri döngü yerelliği gerektirir ve
ardından yönetim kimlik doğrulaması ister. Yalnızca `available`, temizlenmiş
FFmpeg/ffprobe sürümlerini ve çalışma zamanı kullanılamadığında sabit bir nedeni
döndürür. Dahili çıkarma uç noktası herkese açık bir yükleme API'si değildir: kuyruk
doygunluğu `503` ile birlikte `Retry-After` döndürür, arayanın bağlantıyı kesmesi
`499` döndürür ve sabit broker son tarihi `504` döndürür. Dönüştürülen yanıtlar,
Vision veya Audio segmentlerini kaldırmadan merkezi `x-omniroute-modality-bridge`
başlığına `video->text;model=<visionModel>;parts=<videos>` ekler.

### PII Maskeleyici (`piiMasker.ts`)

**Her iki** aşamada da çalışır.

- **`preCall`**, yükün kopyasını oluşturur; `system`, `messages`, `input` ve
  `prompt` alanlarını (düz dize öğeleri dâhil) dolaşır ve dize türündeki
  `content`/`text` alanlarına (`@/shared/utils/inputSanitizer` içindeki)
  `processPII()` işlevini uygular. `PII_REDACTION_ENABLED=true` olduğunda
  algılanan PII, giden yükte sansürlenir. Bu, yalnızca istem enjeksiyonu
  politikasını kontrol eden `INPUT_SANITIZER_MODE` ayarından bağımsızdır.
  Sansürleme kapalı olduğunda çağrı, içeriği yeniden yazmadan algılama sayılarını
  kaydeder.
- **`postCall`**, yanıtın derin kopyasını oluşturur ve `sanitizePIIResponse()` ile
  Responses-API-şekli maskeleyicisini (`maskResponsesOutput` —
  `output_text` ve `output[].content[].text` alanlarını kapsar) çalıştırır.
  Herhangi bir sansürleme gerçekleşirse değiştirilmiş yanıt, özgün yanıtın yerini
  alır.

Koruma katmanı hiçbir zaman engelleme yapmaz; yalnızca açıklama ekler
(`meta.detections`, `meta.redacted`) veya içeriği yeniden yazar.

### İstem Enjeksiyonu (`promptInjection.ts`)

Kullanıcı tarafından sağlanan içerikteki saldırgan yapıları algılar ve yapılandırılmış
politikayı uygular. Davranış, ortam değişkenleri ve oluşturucu seçenekleri tarafından
belirlenir:

| Ayar            | Ortam değişkeni                                                                                             | Varsayılan | Etki                                                                                                                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Etkin           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`     | `false` olduğunda koruma mekanizması kısa devre yapar.                                                                                                                                                                      |
| Mod             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`     | Enjeksiyon politikası: `block`, `warn` veya `log`. (`redact`, geriye dönük uyumluluk için kabul edilir ancak enjeksiyon metnini **kaldırmaz**; isteklerdeki PII yeniden yazımı `PII_REDACTION_ENABLED` ile kontrol edilir.) |
| Engelleme eşiği | `blockThreshold` seçeneği / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` diğer adı) | `high`     | Engelleme için gereken minimum önem derecesi. Varsayılan ayarda orta derece yalnızca gözlemlenir.                                                                                                                           |

**Mod önceliği** (`getMode`): çağıranın `options.mode` değeri →
`INJECTION_GUARD_MODE` **DB özellik bayrağı geçersiz kılma değeri** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` ortam değişkeni → `INPUT_SANITIZER_MODE` ortam değişkeni →
`warn`. Bu nedenle bir pano geçersiz kılma değeri, ortam değişkenlerine göre önceliklidir; dolayısıyla Feature
Flags kullanıcı arayüzü çalışan koruma mekanizmasını canlı olarak kontrol eder (yeniden başlatma gerekmez). DB okuması hata durumunda güvenlidir:
hata oluşursa koruma mekanizması ortam değişkenlerine dayalı davranışa geri döner ve herhangi bir
geçersiz kılma değeri ayarlanmadığında davranış, yalnızca ortam değişkeniyle yapılan çözümlemeyle aynıdır.

Algılama kaynakları:

1. `@/shared/utils/inputSanitizer` içindeki `sanitizeRequest()` (işlem hattının
   başka yerlerinde de kullanılan paylaşılan algılayıcı kümesi).
2. Yerleşik `DEFAULT_GUARD_PATTERNS` (şu anda `system_override_inline` ve
   `markdown_system_block`; her ikisinin önem derecesi de `high`).
3. Oluşturucu seçenekleri aracılığıyla iletilen isteğe bağlı `customPatterns` (dizeler, düzenli ifadeler
   veya `{ name, pattern, severity }` kayıtları).

`mode === "block"` olduğunda **ve** en az bir algılama önem derecesi
eşiğini karşıladığında, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` döndürür. `warn`/`log` modlarında koruma mekanizması günlük kaydı oluşturur ancak
çağrıya izin verir. Paylaşılan `evaluatePromptInjection()` yardımcısı da istemleri kayıt defteri üzerinden geçmeden
değerlendirmesi gereken çağıranlar için dışa aktarılır.

**Tarama sınırı (v3.8.20):** algılayıcı, birleştirilmiş istem metninin yalnızca **ilk 16 KB** bölümünü
inceler — `src/shared/utils/inputSanitizer.ts` içindeki
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Hem `detectInjection()` hem de
`evaluatePromptInjection()`, desen döngüsünü çalıştırmadan önce
`slice(0, MAX_INJECTION_SCAN_BYTES)` uygular. Enjeksiyon yönergeleri girdinin üst kısmına yakın bulunur; dolayısıyla bu,
algılamayı zayıflatmadan yüzlerce KB boyutundaki yüklerde regex CPU/GC kullanımını sınırlar (bkz.
#3932, #4041).

### Kimlik Bilgisi Maskeleyici (`credentialMasker.ts`)

**Her iki** aşamada da, varsayılan zincirin sonunda (öncelik `95`) çalışır. İyi bilinen
API anahtarı / gizli belirteç desenlerini giden yükten (ileti
içeriği, araç çağrısı bağımsız değişkenleri, araç sonuçları) **ve** sağlayıcı yanıtından sansürler; böylece
bir isteme yapıştırılan (veya bir araç sonucu tarafından geri yansıtılan) kimlik bilgileri
yukarı akış sağlayıcısına ya da istemciye geri sızdırılmaz.

- **Yalnızca açıkça etkinleştirilir**, PII sansürlemeyle aynı kural geçerlidir (Katı Kural #20 ile ilişkili):
  `settings.credentialRedactionEnabled === true` **veya**
  `CREDENTIAL_REDACTION_ENABLED=true` olmadığı sürece devre dışıdır. Kapalıyken koruma mekanizması hiçbir işlem yapmaz —
  asla engellemez ve asla yeniden yazmaz.
- `redactCredentials()`, tüm yük/yanıt ağacını dolaşır (`walkValue()`,
  prototip kirlenmesine karşı güvenli, `WeakSet` aracılığıyla döngülere karşı güvenli) ve eşleşmeleri
  `[REDACTED:<type>]` yer tutucusuyla değiştirir; yalnızca gerçekten
  değişen dalları klonlar.
- `CREDENTIAL_PATTERNS`; LLM sağlayıcı anahtarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS belirteçlerini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ödeme anahtarlarını (Stripe, Square), bulut
  anahtarlarını (AWS erişim anahtarı, Twilio, SendGrid, Mailgun), özel anahtarları / JWT'leri,
  kimlik bilgileri içeren bağlantı dizelerini (`mongodb://user:pass@...` vb.) ve
  genel bir `Authorization`/`x-api-key`/`api-key`/`apikey` üst bilgi değeri
  desenini kapsar. Üst bilgi biçimli anahtarlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`), genel metin regex'i aracılığıyla değil, yapısal olarak sansürlenir (yalnızca değer;
  `Bearer `/`Basic ` gibi şema önekleri korunur).
- Koruma mekanizması asla engellemez; yalnızca yeniden yazar (`modifiedPayload` /
  `modifiedResponse`) ve açıklama ekler (`meta.credentialsRedacted`, `meta.count`).

Regresyon koruması: `tests/unit/credential-masker-guardrail.test.ts`.

## Temel Sözleşme (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true, zinciri kısa devre yapar
  message?: string; // engelleme sırasında gösterilir
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // isteği yeniden yazmak için preCall tarafından döndürülür
  modifiedResponse?: TValue; // yanıtı yeniden yazmak için postCall tarafından döndürülür
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Bir koruma mekanizması `void`, `{}` veya `{ block: false }` döndürerek "değişiklik yok" sinyali verir. Bir `modifiedPayload`/`modifiedResponse` döndürülmesi, zincirde aşağı yöndeki koruma mekanizmalarına aktarılan değeri değiştirir.
`signal?: AbortSignal`, çağıranın yaşam döngüsünü koruma mekanizmalarına taşır. İsteğin iptal edilmesi, kasıtlı bir açık kalma istisnasıdır: medya köprüleri çalışmayı durdurur ve ham medyayı desteklemediği bilinen bir hedefe geri yüklemeden temizlik işlemlerini gerçekleştirir.

## Kayıt Defteri (`registry.ts`)

Tekil `guardrailRegistry` şunları sunar:

- `register(guardrail)` — bir koruma mekanizması ekler (veya normalleştirilmiş ada göre mevcut olanı değiştirir) ve artan `priority` değerine göre yeniden sıralar.
- `clear()` / `list()` — yönetim yardımcılarıdır.
- `runPreCallHooks(payload, context)` — etkin koruma mekanizmaları üzerinde yinelenir, payload'ı `modifiedPayload` üzerinden aktarır ve ilk `block: true` değerinde durur.
- `runPostCallHooks(response, context)` — yanıt tarafında aynı akışı uygular.
- `resetGuardrailsForTests({ registerDefaults })` — durumu temizler ve isteğe bağlı olarak temiz test yalıtımı için varsayılanları yeniden kaydeder.

Her iki çalıştırıcı da `{ blocked, payload|response, results, guardrail?, message? }` döndürür; burada `results`, koruma mekanizması başına `blocked`, `skipped`, `modified`, `error` ve `meta` alanlarını içeren ve izleme için yararlı olan `GuardrailExecutionResult` kayıtlarından oluşan bir dizidir.

### Koruma Mekanizmalarını İstek Bazında Devre Dışı Bırakma

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })`, geçerli istek için atlanması gereken koruma mekanizması adlarından oluşan, yinelenen öğeleri kaldırılmış bir listeyi bir araya getirir. Kaynaklar (tümü isteğe bağlıdır ve tümü birleştirilir):

- `apiKeyInfo.disabledGuardrails`
- İstek gövdesindeki `disabledGuardrails` (üst düzey)
- İstek gövdesindeki `metadata.disabledGuardrails`
- `x-omniroute-disabled-guardrails` başlığı (veya eski `x-disabled-guardrails`)

Değerler, string dizileri veya virgülle ayrılmış bir string olabilir; adlar küçük harfli kebab-case biçimine normalleştirilir (`pii_masker` → `pii-masker`). Sonuç, `context.disabledGuardrails` aracılığıyla kayıt defterine aktarılır ve kayıt defteri eşleşen koruma mekanizmalarını atlar (`results` içinde `skipped: true`).

## Yürütme Sırası

`src/sse/handlers/chat.ts` ve `open-sse/handlers/chatCore.ts` üzerinden geçen her istek için:

1. `resolveDisabledGuardrails(...)`, API anahtarı, gövde ve üstbilgilerden atlama listesini oluşturur.
2. `guardrailRegistry.runPreCallHooks(body, ctx)`, koruma mekanizmalarını artan öncelik sırasına göre çalıştırır:
   - Devre dışı bırakılmış koruma mekanizmaları `skipped` olarak kaydedilir.
   - Her koruma mekanizmasının `preCall` işlevi, `modifiedPayload` aracılığıyla yükü yeniden yazabilir.
   - İlk `block: true`, zinciri kısa devre eder ve işleyici bir koruma mekanizması ret yanıtı döndürür.
3. (Muhtemelen yeniden yazılmış) yük, birleşik yönlendirmeye ve yukarı akış gönderimine aktarılır.
4. Yanıt oluşturulduktan sonra `guardrailRegistry.runPostCallHooks(...)`, aynı zinciri yanıt üzerinde çalıştırır. Buradaki `block: true`, yukarı akış yanıtını iptal eder.

Hata fırlatan koruma mekanizmaları `error: <message>` ile kaydedilir ve `logger.warn` aracılığıyla günlüğe yazılır; ancak zincir çalışmaya devam eder — bu, tasarım gereği hata durumunda açık kalma davranışıdır.

## Yapılandırma

Yerleşik koruma mekanizmaları tarafından okunan ortam değişkenleri:

| Değişken                              | Kullanan                  | Etkisi                                                                                                            |
| ------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Algılamayı tamamen devre dışı bırakmak için `false` olarak ayarlayın.                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Enjeksiyon ilkesi: `warn`, `block` veya `log`. Eski `redact` değeri enjeksiyon metnini yeniden yazmaz.            |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Enjeksiyon korumasının modu; ayrıca ortam değişkenlerini **geçersiz kılan** bir DB özellik bayrağıdır (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` tarafından reddedilen en düşük önem düzeyi: `high` (varsayılan), `medium` veya `low`.                |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` için eski ad.                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` olduğunda isteklerdeki PII sansürlenir (enjeksiyon modundan bağımsızdır).                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (aşağı akış) | Yanıt tarafındaki maskeleyici davranışını kontrol eder.                                                           |

Modality Bridge koruma mekanizmaları, ortam değişkenleri yerine DB destekli ayarlar deposundaki çalışma zamanı yapılandırmasını (`getSettings()`) okur. Vision'ın birincil anahtarları `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` şeklindedir. Eski `visionBridge*` anahtarları yalnızca belgelenmiş tek döngülük okuma geri dönüşü olarak kabul edilir; dashboard yazma işlemleri birincil anahtarları kullanır. Varsayılanlar ve geri dönüş çözümleyicisi `src/shared/constants/modalityBridgeDefaults.ts` içinde yer alırken eski sabitler `src/shared/constants/visionBridgeDefaults.ts` içinde tutulur.

Audio, paylaşılan `modalityBridgeCache*` ayarlarına ek olarak `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` ve `modalityBridgeAudioMaxClips` anahtarlarını kullanır. Bu anahtarlar Modality Bridge şemasıyla birlikte kullanıma sunulduğundan Audio için eski anahtar geri dönüşü yoktur.

Video, paylaşılan `modalityBridgeCache*` ayarlarına ek olarak `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` ve `modalityBridgeVideoTimeout` anahtarlarını kullanır. FFmpeg/ffprobe isteğe bağlı operasyonel bağımlılıklar olduğundan ve karelere altyazı eklemek gecikme ile model maliyetini artırdığından varsayılan olarak devre dışıdır.

## Özel Koruma Mekanizmaları

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Adımlar:

1. `BaseGuardrail` sınıfını genişleten `src/lib/guardrails/myGuardrail.ts` dosyasını oluşturun.
2. `preCall` ve/veya `postCall` metodunu uygulayın.
3. İçe aktarma sırasında kaydedin (`registerDefaultGuardrails` içinden ekleyin) veya
   çalışma zamanında `guardrailRegistry.register(...)` çağrısını yapın — kayıt defteri,
   normalleştirilmiş adı aynı olan önceki koruma mekanizmasının yerini alır.
4. `tests/unit/` altında testler ekleyin (mevcut örnekler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test Etme

Bilinen bir durumdan başlamak için testler arasında `resetGuardrailsForTests()` kullanın.
Boş bir kayıt defteriyle başlamak ve yalnızca test edilen koruma mekanizmalarını
kaydetmek için `{ registerDefaults: false }` iletin. Vision Bridge, bağımlılık
enjeksiyonunu (`deps.getSettings`, `deps.callVisionModel`) kabul eder; Audio Bridge ise
ayarlar, yetenekler, STT modeli seçimi, kimlik bilgisi kontrolleri ve transkripsiyon için
eşdeğer bağlantı noktalarını kullanıma sunar. Böylece testler, veritabanı veya ağ erişimi
olmadan her iki akışı da çalıştırabilir.

## Ayrıca Bakınız

- `src/lib/guardrails/` — uygulama
- `src/shared/utils/inputSanitizer.ts` — istem enjeksiyonu ve PII maskelemesini
  destekleyen ortak algılayıcı
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge varsayılanları ve
  zorunlu köprü model listesi
- `src/shared/constants/modalityBridgeDefaults.ts` — ortak Vision/Audio çalışma zamanı varsayılanları
- `docs/architecture/RESILIENCE_GUIDE.md` — bağımsız katman (devre kesici, bekleme süreleri)
- `docs/reference/ENVIRONMENT.md` — eksiksiz ortam değişkeni referansı

## Enjeksiyon koruması rota kapsamı ve red-team (Aşama 8 · Blok D)

Enjeksiyon koruması (`createInjectionGuard` / `withInjectionGuard`), kullanıcı istemlerini
kabul eden tüm rotaları kapsar. `INJECTION_GUARD_MODE` ayarına uyar (varsayılan `warn` = yalnızca günlük kaydı;
`block` = HTTP 400 `SECURITY_001` döndürür).

| Tür            | Rotalar                                                                                                                                              | Varsayılan mod |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Metin (mevcut) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Üretken        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Veri           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Metin çıkarma (`extractMessageContents`), `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarını kapsar.

**Red-team (her gece, `nightly-llm-security.yml`):** promptfoo, her rotanın
`INJECTION_GUARD_MODE=block` modunda OWASP-LLM külliyatını engellediğini doğrular; garak probları çalıştırır (gizli anahtar yoksa atlar).
`moderations`, tutarlılık amacıyla dahil edilmiştir — `block` modundaki operatörler bunu
`resolveDisabledGuardrails` aracılığıyla muaf tutabilir.

Her gece çalışan iş akışında (`.github/workflows/nightly-llm-security.yml`, cron + manuel
tetikleme) iki iş bulunur:

- **`promptfoo-guard` (engelleyici)** — `INJECTION_GUARD_MODE=block` ile
  `promptfoo eval -c promptfooconfig.yaml` çalıştırır. Her saldırgan test durumu
  (ör. "önceki tüm talimatları yok say…", DAN tarzı jailbreak'ler), yanıtın
  `error.code === "SECURITY_001"` içerdiğini, yani korumanın isteği gerçekten
  reddettiğini doğrular.
- **`garak` (bilgilendirici)** — yerel bir OmniRoute örneğine
  (`http://localhost:20128/v1`) karşı garak'ı `--probes promptinject,dan,leakreplay`
  ile çalıştırır. Bir sağlayıcı gizli anahtarına (`PROMPTFOO_PROVIDER_KEY`) bağlıdır;
  bu anahtar yoksa sorunsuzca atlar ve sonuna `|| true` eklendiğinden CI'ın başarısız
  olmasına neden olmadan rapor verir.

Koruma yardımcısının (`createInjectionGuard` / `withInjectionGuard`) kapsamı,
istem taşıyan her `/v1` rotasını içerir; istem metni,
`src/shared/utils/inputSanitizer.ts` içindeki `extractMessageContents()` tarafından
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarından alınır.
