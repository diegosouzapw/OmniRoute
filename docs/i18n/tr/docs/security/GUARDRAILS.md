# Guardrails (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Doğruluk kaynağı:** `src/lib/guardrails/`
> **Son güncelleme:** 2026-08-29 — v3.8.51 (Video Köprüsü transkript kaynağı arayan tarafından beyan edilir,
> henüz sunucu tarafından doğrulanmadı — #11661 uyarınca açıklığa kavuşturuldu)

Guardrail'ler, OmniRoute ile yukarı akış sağlayıcıları arasındaki sınırda güvenliği, politikayı ve içerik dönüşümlerini zorunlu kılar. Her guardrail, istek yüklerini (`preCall`) ve yukarı akış yanıtlarını (`postCall`) inceleyebilir (ve isteğe bağlı olarak reddedebilir, dönüştürebilir veya açıklama ekleyebilir).

Sistem **açıkta başarısız olur**: bir guardrail yürütülürken bir hata fırlatırsa, kayıt defteri hatayı kaydeder ve isteği başarısız kılmak yerine bir sonraki guardrail ile devam eder. Engelleme açık bir karardır (`block: true`), asla bir kaza değildir.

## Yerleşik Guardrail'ler

Kayıt defteri, içe aktarma sırasında altı guardrail'i öncelik sırasına göre otomatik olarak yükler
(bkz. `registry.ts` → `registerDefaultGuardrails()`):

| Öncelik | Adı                 | Aşama(lar)     | Dosya                 |
| ------- | ------------------- | -------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha düşük öncelik numaraları **önce** çalışır.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

**Görsel olmayan modellere** yönelik görüntü içeren istekleri yakalar ve ya tüm isteği görsel yetenekli bir modele yönlendirir ya da yukarı akış çağrısından önce görüntü kısımlarını yapılandırılabilir bir görsel model tarafından üretilen metin açıklamalarıyla değiştirir. Bu, yalnızca metin sağlayıcılarının çok modlu yükleri şeffaf bir şekilde işlemesini sağlar.

Akış:

1. Hedef model zaten görseli destekliyorsa atla (zorunlu köprü listesinde `isVisionBridgeForcedModel` görünmüyorsa).
2. `extractImageParts(messages)` (`visionBridgeHelpers.ts`) aracılığıyla görüntü kısımlarını çıkarın; bu, **birleşik medya dedektörü** `detectMediaParts()`'ı `open-sse/utils/mediaParts.ts` içinde delege eder — kombo uyumluluk filtresiyle paylaşılan tek doğruluk kaynağı. Çıkarma, `replaceImageParts`'ın geri ekleyebileceği şekillerin üst düzey kısımlarına izin verilir (çıkarma↔değiştirme sözleşmesi): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ve Responses API `input_image`. İç içe geçmiş isabetler ve yalnızca gösterge şekilleri kombo filtre malzemesidir ve asla çıkarılmaz. Hiçbiri bulunamazsa atla.
3. `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) aracılığıyla çalışma zamanı yapılandırmasını çözün: yeni `modalityBridge*` ayar anahtarları kazanır; eski `visionBridge*` anahtarları **tek döngülü bir geri dönüş** (geri alma penceresi) olarak kalır. Köprü devre dışı bırakıldığında herhangi bir medya geçişinden önce atla.
4. Mod seçici (`modalityBridgeVisionMode`, aşağıdaki tabloya bakın) yeniden yönlendirme veya açıklama arasında karar verir. Yeniden yönlendirme, yalnızca `model` değiştirilmiş `modifiedPayload` artı meta `{ rerouted, fromModel, toModel, imagesKept }` döndürür.
5. Açıklama yolu: görüntüleri `maxImages` ile sınırla, göreve duyarlı istemi oluştur, açıklama önbelleğine danış, görsel modeli **paralel olarak** çağır (`Promise.allSettled`) ve yerlerine `[Image N]: <açıklama>` metin kısımlarını enjekte et. Başarısız bir açıklama `null` döndürür ve orijinal görüntü kısmı **korunur** (#4012) — her açıklamanın başarısız olduğu kombo açıklama yolu hariç, burada onaylanmış görsel olmayan bir yukarı akış, bunun yerine `(kullanılamıyor — görsel yetenekli sağlayıcı bağlı değil)` taslağı alır (#8430).
6. `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) döndür.

#### Mod seçici (`modalityBridgeVisionMode`)

| Mod | Varsayılan | Davranış  
| `reroute` | | Zorunlu yeniden yönlendirme: kimlik bilgisi olan model koruması atlanır. Yeniden yönlendirme-**hedef** kimlik bilgisi koruması hala geçerlidir — kullanılabilir bir görsel hedef yoksa, istek açıklama yoluna düşer, böylece ham görüntüler asla yalnızca metin içeren bir arka uca ulaşmaz (#8430). |

Zorunlu modlar, otomatik buluşsal yöntem çalışmadan **önce** kısa devre yapar; `auto` davranışı, PR-1 öncesi guardrail ile bayt olarak aynıdır.

#### Göreve duyarlı açıklama istemi (`modalityBridgeVisionTaskAware`)

Varsayılan **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`), temel açıklama istemine **son kullanıcı mesajının** metnini (500 karakterle kesilmiş) ekler, açıklamayı kullanıcının gerçekten sorduğu şeye yönlendirir (codex-vision-proxy deseni) ve görsel modelden görünür metni yazıya dökmesini ister. Bayrak kapalıysa — veya kullanıcı metni yoksa — temel istem değişmeden kullanılır.

describe kendi döngüsünün OpenAI uyumlu isteği (`callVisionModelSingle()`
`visionBridgeHelpers.ts` içinde) her zaman `image_url.detail: "high"` talep eder —
koşulsuz olarak, her arayan/sağlayıcı için, hiçbir istemci sinyaline bağlı kalmadan.
Düşük detaylı örnekleme, bu istemin istediği metin-transkripsiyon görevi için OCR doğruluğunu düşürür,
bu nedenle describe çağrısı, orijinal gelen isteğin kullandığı detay seviyesinden bağımsız olarak her zaman yüksek detay ister.
Bu yalnızca dahili describe istek gövdesini etkiler; OmniRoute'un arayanın kendi `image_url.detail` değerini birincil istekte nasıl ilettiğini değiştirmez —
bu varsayılan, ayrı olarak ve yalnızca algılanan OpenCode istemcileri için `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) içinde uygulanır.
describe kendi döngüsünün Anthropic wire-format dalında `detail` alanı yoktur ve her iki varsayılandan da etkilenmez.

#### Açıklama Çıkış Sınırı (`modalityBridgeVisionMaxChars`)

| Anahtar                        | Varsayılan | Aralık             |
| ------------------------------ | ---------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`        | `0` veya 100–50000 |

`0` (varsayılan) **sınır yok** anlamına gelir — `callVisionModel()` tarafından döndürülen açıklama, mevcut davranışı koruyarak değiştirilmeden iletilir.
100–50000 aralığındaki herhangi bir değer, açıklama `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` `src/lib/guardrails/visionBridge.ts` içinde) olarak geri eklenmeden önce `…` sonekiyle kısaltır.
Aşağı akış modelinin tam transkripsiyona ihtiyaç duyduğu detay ağırlıklı OCR görevleri için bunu artırın; konuşkan vizyon modellerinde token kullanımını sınırlamak için bunu düşürün.
Kontrol paneli alanı, Vizyon sekmesinin Gelişmiş panelinde (`ModalityBridgeVisionTab.tsx` içinde `modality-bridge-max-chars`) yer alır ve 1 ile 99 arasındaki herhangi bir değeri 100 tabanına kadar sıkıştırırken, açık bir `0` değerini dokunulmadan bırakır — `0` kendi başına geçerli bir Zod değeridir (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), yalnızca "ayarlanmamış" varsayılan değildir.

#### Açıklama önbelleği (`modalityBridge/bridgeCache.ts`)

Describe çıktıları için bellek içi LRU + TTL önbelleği, süreç genelinde paylaşılır.
Anahtar = `sha256(imageRef + composedPrompt + configuredBridgeModel)`, uzunluk ön ekli çerçeveleme ile (alan sınırı çakışmaları yok).
Model bileşeni, aslında yanıt veren model değil, **yapılandırılmış** köprü modelidir —
`callVisionModel` dahili olarak geri dönebilir ve her deneme için anahtarlama önbelleği parçalayabilir.
Başarısız açıklamalar asla önbelleğe alınmaz. Ayarlar:

| Anahtar                         | Varsayılan | Aralık  |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Uzak görüntü normalizasyonu (kendi döngüsü describe/base64 getirme)

Köprü, **uzak** bir görüntüyü kendisi getirdiğinde — hem Anthropic describe kendi çağrısı hem de claude-wire-format base64 dönüşümü (`ensureBase64ImagesForClaudeWire`), her ikisi de `visionBridgeHelpers.ts` içindeki `fetchRemoteImageAsDataUri()` aracılığıyla — ortaya çıkan veri URI'si, vizyon modeli isteğine gömülmeden önce `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) aracılığıyla geçirilir.
Büyük boyutlu görüntüler, **2048 piksel uzun kenara** (OpenAI/Anthropic'in sunucu tarafında zaten uyguladığı yeniden boyutlandırma sınırına uygun olarak) küçültülür, bu da vizyon modelinin gördüklerini değiştirmeden yükleme baytlarını/gecikmesini azaltır.
Yeniden boyutlandırma, dinamik içe aktarma yoluyla yüklenen `sharp` kullanır: yerel ikili dosyasının yüklenemediği bir platformda, `normalizeDataUri()` **asla hata vermez** — orijinal baytların doğrudan geçişine geri döner, böylece describe/base64 dönüşüm yolu her zaman çalışmaya devam eder.
Görüntü olmayan baytlar (çözülebilir bir görüntü döndürmeyen bir getirme işlemi) da dokunulmadan geçirilir.
Bu normalizasyon, köprünün kendi çağrısı için getirdiği görüntülerle sınırlıdır — yalnızca kabul etme mutasyon ilkesiyle (Hard Rule #20) tutarlı olarak, arayanın ham doğrudan geçiş yüküne asla uygulanmaz.

#### Ayarlar şeması + geçiş

Yeni `modalityBridge*` anahtarları, `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) içinde Zod tarafından doğrulanır: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüsü ve Ses Köprüsü tarafından kullanılan `modalityBridgeAudio*` grubu.
Geçiş `141_modality_bridge_settings.sql`, mevcut eski `visionBridge*` değerlerini eşleşen yeni anahtarlara kopyalar (idempotent, operatör tarafından ayarlanmış bir `modalityBridge*` değerini asla üzerine yazmaz); eski anahtarlar, bir sürüm döngüsü boyunca okuma geri dönüşü olarak kabul edilmeye devam eder.

#### Şeffaflık başlığı + istatistikler

Describe ile dönüştürülmüş yanıtlar `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` taşır
(`modalityBridge/bridgeStats.ts` içindeki `buildModalityBridgeHeader()` tarafından oluşturulur, `src/sse/handlers/chatHelpers.ts` içindeki `withModalityBridgeHeader()` tarafından damgalanır).
Yeniden yönlendirilen istekler **hiçbir** başlık almaz — yük dokunulmamıştır ve model değişimi yanıt gövdesinin `model` alanında zaten görünürdür.

`GET /api/modality-bridge/stats` (yönetim kimlik doğrulaması, `GET /api/settings` ile aynı seviyede) bellek içi modalite başına sayaçları döndürür
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`
`vision`, `audio` ve `video` için.
`averageLatencyMs` payda olarak tüm denemeleri değil, `latencySamples` değerini kullanır; zamanlama olmayan bir işlem sıfır milisaniyelik bir örnek oluşturmaz.
`bridged`, başarılı dönüşümler için geriye dönük uyumlu takma ad olmaya devam eder; başarısız denemeler bunu artırmaz.
Sayaçlar, tasarım gereği (telemetri, muhasebe değil) süreç yeniden başlatıldığında sıfırlanır.

#### Kontrol paneli yapılandırması

Özel kontrol paneli sayfası
`/dashboard/settings/modality-bridge` şeklindedir. URL ile adreslenebilir `Vision`, `Audio` ve `Video` sekmeleri, `tab` değeri değiştirilirken sorgu parametrelerini korur.
Vision sekmesi etkinleştirmeyi, modu, model seçimini (otomatik varsayılan dahil), göreve duyarlı istemi, gelişmiş zaman aşımı/görüntü/açıklama uzunluğu/önbellek limitlerini, çalışma zamanı
sayaçlarını ve korumalı bir örnek isteği sunar. Audio sekmesi de canlıdır: etkinleştirmeyi, Otomatik özellikli yalnızca STT model seçiciyi, zaman aşımı/maksimum klip limitlerini, ses
sayaçlarını ve bir `input_audio` örnek testini sunar. Video sekmesi işlevseldir: FFmpeg/ffprobe çalışma zamanı durumunu rapor eder — dört açık UI durumundan biri (`unknown` prob devam ederken veya tamamlanamadığında, `restricted` probun istemci tarafında atlandığı döngüsel olmayan bir kontrol paneli ana bilgisayarında, `unavailable` prob yapıldıktan ve eksik olduğu doğrulandıktan sonra veya FFmpeg/ffprobe sürümleriyle `available`) — etkinleştirme/model/çerçeve/video/zaman aşımı limitlerini korur, model seçiciyi görüntü özellikli modellere göre filtreler ve video sayaçlarını sunar.

AI ayarları altındaki eski Vision Bridge kartı, yeni sayfaya bir uyumluluk bağlantısıdır; artık formun ikinci bir kopyasına sahip değildir. Medya Sağlayıcıları ayrıca Görüntüden Metne ve Konuşmadan Metne iş akışlarını, mevcut Konuşmadan Metne oyun alanını kaldırmadan ilgili Modality Bridge sekmelerine bağlar.

**Kendi kendine döngü kabul baypası:** açıklama çağrısı OmniRoute'un kendi `/v1` kendi kendine döngüsü (standart olmayan sağlayıcı modeli) üzerinden yönlendirildiğinde, alt istek `x-omniroute-admission-bypass: internal` gönderir ve çözümlenmiş kendi kendine döngü kimlik bilgisiyle kimlik doğrulaması yapılır — yerel modda yerel `sk_omniroute` gözcü veya operatör tarafından yapılandırılan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ortam anahtarı (#1350) böylece `REQUIRE_API_KEY=true` dağıtımları açıklama çağrısını hala çalıştırabilir. Baypas yalnızca bu belirli kimlik bilgileri için geçerlidir, bu nedenle harici istemciler kabulü atlamak için başlığı kullanamaz.

Eski varsayılanlar `src/shared/constants/visionBridgeDefaults.ts` içinde bulunur; yeni mod/görev duyarlı/önbellek varsayılanları ve ayarlar çözümleyici `src/shared/constants/modalityBridgeDefaults.ts` içinde bulunur. Koruyucu, testlerin sahte `getSettings` ve `callVisionModel` uygulamalarını enjekte edebilmesi için bir `deps` kurucu seçeneği sunar.

### Ses Köprüsü (`audioBridge.ts`) — Modality Bridge PR-3

Ses girişi kabul etmediği bilinen bir hedefe ulaşmadan önce ses taşıyan sohbet isteklerini yakalar. Sohbet isteğini asla yeniden yönlendirmez: ses parçaları mevcut OpenAI uyumlu çok parçalı uç nokta aracılığıyla yazıya dökülür ve seçilen sohbet modeli metin transkriptleriyle devam eder.

Akış:

1. `getResolvedModelCapabilities()` aracılığıyla `supportsAudio` öğesini çözün. Açık sağlayıcı kayıt defteri meta verileri kazanır, ardından statik model meta verileri, ardından senkronize `modalities_input`. `audio` içermeyen bir bildirilmiş giriş listesi `false` olur; yetenek kanıtı kalmazsa `null` olur. Hem `false` hem de `null` muhafazakar köprüyü etkinleştirirken, `true` onu atlar.
2. `modalityBridgeAudio*` ayarlarını çözün ve paylaşılan `detectMediaParts()` dedektörü aracılığıyla her mesajdan birleştirilebilir üst düzey ses parçalarını çıkarın. Desteklenen kablo şekilleri OpenAI `input_audio`, `audio_url` ve `source.media_type: "audio/*"` şeklindedir. İç içe ses, yönlendirme için algılanır ancak birleştirme yolu tarafından kaldırılmaz. İş `modalityBridgeAudioMaxClips` ile sınırlıdır; sonraki parçalar dokunulmadan kalır.
3. Yapılandırılmış bir `provider/model` öğesini onurlandırın veya `selectAudioBridgeModel()` öğesinin kararlı katalog sırasına göre `AUDIO_TRANSCRIPTION_PROVIDERS` öğesini dolaşmasına ve kullanılabilir etkin bir sağlayıcı kimlik bilgisine sahip ilk modeli seçmesine izin verin.
4. `callAudioTranscription()` base64/veri-URI sesini çok parçalı bir `file` öğesine dönüştürür veya uzak bir `audio_url` öğesini DNS sabitleme ve 25 MB sınırı ile yalnızca genel giden koruyucu aracılığıyla indirir. Ardından dosyayı ve seçilen modeli yerel `/v1/audio/transcriptions` kendi kendine döngüsüne `resolveSelfLoopBearer()` ile kimlik doğrulaması yaparak POST eder. Mevcut transkripsiyon rotası normal kimlik bilgisi araması, bekleme süresi/oran sınırlaması işleme ve sağlayıcı gönderme işlemlerini gerçekleştirir.
5. Başarılı çağrılar, parçalarını `[Audio N]: <transcript>` ile değiştirir. Çağrılar `Promise.allSettled` ile çalışır: bireysel bir hata, o orijinal ses parçasını korur (#4012 sözleşmesi). Her çağrı başarısız olursa ve hedef `supportsAudio === false` olarak kanıtlanırsa, parçalar `[Audio N]: (kullanılamıyor — STT sağlayıcısı bağlı değil)` olur (#8430 sözleşmesi). Bilinmeyen bir hedef (`null`) için, tüm başarısızlık sonucu dokunulmadan kalır. Kullanılabilir bir STT kimlik bilgisi olmayan kanıtlanmış yalnızca metin hedefi, bir ağ çağrısı yapmadan aynı açık saplamayı alır.

Başarılı transkriptler, süreç genelindeki Modality Bridge LRU/TTL önbelleğini kullanır. Anahtar, ses referansını, kararlı `audio-transcription` işlem etiketini ve seçilen STT modelini birleştirir; hatalar asla önbelleğe alınmaz. Ses denemeleri, paylaşılan `bridged`, `cacheHits`, `failures` ve `lastUsedAt` sayaçlarını günceller. Dönüştürülmüş yanıtlar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` taşır; dokunulmamış istekler bir Ses Köprüsü segmenti almaz.

Çalışma zamanı ayarları DB destekli ve Zod onaylıdır:

| Anahtar                       | Varsayılan | Aralık                    |
| ----------------------------- | ---------- | ------------------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                         |
| `modalityBridgeAudioModel`    | `""`       | Otomatik veya STT Kimliği |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000               |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10                      |

Paylaşılan önbellek, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` tarafından kontrol edilmeye devam eder.

### Video Köprüsü (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` ve Yanıtlar API `input` içindeki üst düzey video parçalarını, bilinen yerel video desteği olmayan bir hedef çağrılmadan önce yakalar. Desteklenen şekiller `input_video`, `video_url`, `video_source`, HTTPS URL'leri ve `data:video/*;base64,...` veri URI'leridir. Metindeki düz dosya adları video olarak kabul edilmez.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`), istek geçişini, yetenek/politika kontrolünü, istek başına toplama işlemini ve yanıt yükünü yönetir. Video başına çalışma — edinme, tüm sonuç önbelleği, bir kare dizisini tanımlama (çağıran tarafından bildirilen herhangi bir ses transkriptini birleştirir) ve deneme başına metrikler/iptal/temizleme — `preCall` döngüsü içindeki her video parçası için bir kez çağrılan `videoBridgePipeline.ts` içindeki `processVideoPart` arkasına gizlenmiştir. Bu modül ayrıca açık bağlantı noktası sınırlarını tanımlar: `VideoMediaBrokerPort` (baytları edinme ve örneklenmiş kareleri çıkarma), `VideoAudioTranscriptionPort` (çağıran tarafından bildirilen bir ses transkriptini örneklenmiş altyazılarla birleştirme) ve `VideoDrilldownPort` (kare detaylandırma kalıcılık sınırı; henüz `processVideoPart`'a bağlanmadı — bugün yalnızca ayrı `/api/modality-bridge/video/drilldown` rotası detaylandırma girişleri yazar).

Genel `/v1` istek yolu asla bir alt süreci içe aktarmaz veya çağırmaz. Uzak videolar 50 MiB sınırı altında indirilir; satır içi base64 videoları, model/mesajlar/çerçeveleme zarfının 50 MiB'lik genel JSON istek kabul limitinin içinde kalabilmesi için 36 MiB'lik muhafazakar bir çözülmüş video başına kapasiteye sahiptir. Satır içi uzunluk ve çözülmüş boyut tahminleri tahsisten önce kontrol edilir. İlk uzak URL'de ve her yönlendirmede HTTPS gereklidir, mevcut yalnızca genel giden koruma DNS sabitleme ile kullanılır. Baytlar daha sonra tam dahili `POST /api/modality-bridge/video/extract` aracı sınırını geçer. Bu rota hem `LOCAL_ONLY` hem de `SPAWN_CAPABLE`'dır, yalnızca işlem başına kimliği doğrulanmış, güvenilir geri döngü isteğini kabul eder ve asla bir URL, dosya sistemi yolu, yürütülebilir dosya veya argüman listesi kabul etmez. API gövde boyutu hattı ve işleyicinin artımlı gövde okuyucusu bağımsız olarak 50 MiB'lik bir aracı giriş sınırı uygular. Sınırlı kuyruğu aynı anda bir çıkarma çalıştırır, dört bekleyen işe izin verir ve bekleyen girişi 100 MiB ile sınırlar.

Aracı içinde, `ffprobe` özel bir yerel dosyayı okur; sabit biçim izin listesi çalma listesi ve manifest biçimlerini dışlar. İzin verilen MOV-ailesi kapsayıcıları için, harici MOV veri referansları varsayılan olarak devre dışı kalır ve sabit komut bunları tercih etmez. Hem `ffprobe` hem de `ffmpeg`, yalnızca `file` protokolü beyaz listesini, bir iş parçacığını, sabit argüman dizilerini, kabuksuz ve `PATH`'den çözümlenen yürütülebilir dosyaları kullanır. Ekli resim kapak akışları oynatılabilir adaylar değildir. Tüm oynatılabilir akışlar limitleri karşılamalıdır ve deterministik en düşük indeks geri dönüşünden önce açık bir varsayılan akış tercih edilir. Videolar 600 saniye, boyut başına 8.192 piksel ve 33.554.432 kaynak piksel ile sınırlıdır. FFmpeg, 1-16 orta nokta JPEG karesini örnekler, daha küçük girişleri büyütmeden uzun kenarı en fazla 1.024 piksele küçültür ve asla bir URL almaz. Örnekleme varsayılan olarak `uniform`'dur. İsteğe bağlı `scene_aware` ve deneysel `segment_aware` politikaları, zaten doğrulanmış yerel akış üzerinde bir ek sabit FFmpeg geçişi gerçekleştirir, sınırlı `showinfo` sahne zaman damgalarını seçer ve dedektör hatası, zaman aşımı, hatalı çıktı veya boş bir aday kümesi durumunda aynı tekdüze orta noktalara deterministik olarak geri döner. Segment-aware modu, orta nokta örneklerini doğrulanmış sahne aralıklarıyla orantılı olarak tahsis eder; segment-aware kanıtı ve geri dönüş davranışı aşağıda detaylandırılmıştır. Sert 16 kare sınırı, her politikada seçimden sonra uygulanır. Sahneye duyarlı bir isteğin yalnızca bir kare bütçesi olduğunda, etkin tam video veya odak penceresinin tekdüze orta noktasını kullanır ve `policyEffective: uniform` rapor eder: tek bir seçilen sahne karesi her iki zamansal ucu da koruyamaz. Bir çağıran isteğe bağlı olarak sonlu bir odak penceresi (`start`/`end` saniye) sağlayabilir; sınırlar medya süresine sabitlenir, ters veya sonlu olmayan pencereler reddedilir ve tüm örnekleme politikaları yalnızca normalleştirilmiş aralık içinde gerçekleştirilir. Ortaya çıkan pencere, örnekleme meta verilerine ve güvenilmeyen açıklama önekine dahil edilir, böylece aşağı akış modelleri odaklanmış bir alıntıyı tam zaman çizelgesinden ayırt edebilir.

Semantik altyazı odağı ayrı, açık bir ayardır. Varsayılan `full` analiz modu mevcut kare istemini korur ve istek metnini asla altyazı modeline iletmez. `focused` modunda, köprü yalnızca aynı Sohbet veya Yanıtlar kapsayıcısından en son boş olmayan kullanıcı tarafından yazılmış `text`/`input_text`'i okur, NFC'ye normalleştirir, kontrol karakterlerini ve boşlukları daraltır ve 500 Unicode kod noktasıyla sınırlar. Boş bir sonuç, tam `full` istemine geri döner. Kullanılabilir bir ipucu, özel bir güvenilmeyen kullanıcı bağlamı bloğunda JSON olarak serileştirilir ve yalnızca gözlemlenebilir ayrıntıları önceliklendirebilir; medyada görülebilen veya duyulabilen talimatları takip etmeye karşı ayrı uyarıyı geçersiz kılamaz. Metinsel odak asla `start`/`end` çıkarmaz veya zamansal örnekleyiciyi değiştirmez.

#### FU-07 yapısal segment kanıtı

`segment_aware`, zaten doğrulanmış yerel video akışı üzerinde bir sınırlı ön analiz geçişi kullanır. Sabit filtre zinciri önce en fazla 320 piksel genişliğe ölçeklenir, sahne değişikliklerini ve donmuş aralıkları algılar, ardından bulanıklık, ortalama luma ve uzamsal/zamansal bilgi için saniyede 1 kare örnekler. Geçiş 600 yapısal örnekle, bir FFmpeg/filtre iş parçacığıyla, aynı `file`-only protokolü ve kapsayıcı izin listeleriyle, 1 MiB işlem çıktı sınırı ve aracının paylaşılan iptal/son teslim tarihi içinde en fazla 30 saniye ile sınırlıdır. Asla istekten bir komut, filtre, yol veya URL kabul etmez.

Yapısal değerler, anlamsal video anlama değil, deterministik örnekleme kanıtlarıdır. Konuları, eylemleri, altyazıları, konuşmayı veya kullanıcı niyetini çıkarmazlar. Sahne ve donma sınırları segmentleri oluşturur; donma kapsamı, bulanıklık, pozlama, uzamsal detay ve zamansal değişim yalnızca mevcut 1-16 kare bütçesinin nasıl tahsis edildiğini etkiler. Tamamen donmuş bir segment bir kare ile sınırlıdır, donmamış segmentler ise kalan bütçe için rekabet eder. Sınırlar kare sayısından fazla olduğunda, tekdüze zaman çizelgesi kapsamı korunur, böylece hızlı erken kesimler uzun bir kuyruk segmentini gizleyemez. Bir donma sınırının 1 saniyelik analiz çözünürlüğü içindeki sahne sınırları birleştirilir.

Eksik filtreler, hatalı/boş kanıtlar, bir dedektör hatası veya sınırlı ön analiz zaman aşımı, tam tekdüze orta nokta politikasına açık kalır. Bir arayanın iptali veya aracı son tarihi açık kalmaz: devam eden alt süreci sonlandırır, daha sonraki kare çıkarımını engeller ve özel geçici ağaç `finally` içinde kaldırılır.

`scripts/perf/video-bridge-fu07-eval.ts`, deduplikasyon sonrası altyazı çağrısı tasarrufları, yoğun hareket bütçesi tahsisi, bulanıklık/pozlama/SI-TI kanıtı, uzun kuyruklu hızlı kesimler ve kademeli solma yanlış pozitifleri için deterministik gerçek FFmpeg fikstürleri üretir. Ön analiz duvar süresini ve `/usr/bin/time` mevcut olduğunda alt CPU ve en yüksek RSS'yi kaydeder. Kalite kontrolleri yalnızca yapısal oracle'lardır. Gerçek altyazı modeli kalitesi `HOLD` kalır çünkü bu donanımın yetkili bir uç noktası veya donmuş bir hakimi yoktur. `--caption-cost-per-call-usd` açık bir pozitif çağrı başına tahmin sağlamadıkça parasal tasarruflar da `HOLD` kalır; komut dosyası hiçbir zaman iki sonucu da uydurmaz.

Her kare 4 MiB ile, tüm ham kareler birlikte 23 MiB ile ve serileştirilmiş aracı yanıtı 32 MiB ile sınırlıdır. Özel bir geçici dizin `finally` içinde kaldırılır. OmniRoute FFmpeg'i paketlemez ve özel bir yürütülebilir yol kabul etmez. Altyazılamadan önce, köprü muhafazakar bir görsel deduplikasyon geçişi uygular: her JPEG 16×16 gri tonlamalı bir arabelleğe indirgenir ve yalnızca tutulan son kare ile karşılaştırılır. Bir kareden fazla istenen altyazı bütçesi için, çıkarım bu bütçenin iki katına kadar ve asla 16 kareden fazla olmayan sınırlı bir aday havuzu sağlar. İstenen üst sınır yalnızca deduplikasyondan sonra uygulanır, bütçe en az iki olduğunda ilk ve son seçilen adaylar son inceltme sırasında korunur. Sürümlü `grayscale-16x16-mean-cells-v2` politikası, ortalama luma delta'sının ve normalize deltası en az 0.05 olan küçük resim hücrelerinin oranının daha büyüğünü kullanır. Yinelenen eşik, çalışma zamanı ayarı olarak açığa çıkarılmak yerine öngörülebilirlik için seçilen sabit 0.04'tür. Bu ikincil yüksek kontrast sinyali, yalnızca ortalama bir karşılaştırmanın gizleyebileceği küçük hareketleri ve görünür metin değişikliklerini korur. Karşılaştırıcı veya kod çözücü hataları açık kalır ve kapsamı korur. Çıktı meta verileri, çıkarılan adayları, başarıyla kullanılan kareleri ve düşürülen görsel kopyaları ayırır.

Açıkça işaretlenmiş bir video bölümü, zaman damgalı bir iletişim sayfası isteyebilir. Köprü en fazla 4 sütunlu, 16 karelik bir JPEG ızgarası oluşturur. Her 512 piksellik hücre, kaynak zaman damgasını yüksek kontrastlı bir alt banda yakarken, aynı zaman damgaları aşağı akış ilişkilendirme ve denetim için metinsel meta verilerde kalır. Tam JPEG 32 MiB ile sınırlı kalır. `sharp` ızgarayı çözemez veya oluşturamazsa, köprü tek tek JPEG karelerine geri döner; bir istemci iptali yine de sayfa işlemi boyunca yayılır.

Promosyon kanıtı, sentetik kompozisyon mikro karşılaştırmasından kasıtlı olarak ayrıdır. `scripts/perf/video-bridge-contact-sheet-eval.ts`, gerçek OpenAI uyumlu görüntü modelleri için şema sürümlü bir A/B donanımı tanımlar. Sağlayıcı tarafından bildirilen jetonları, uçtan uca duvar gecikmesini (sayfa kompozisyonu dahil), model çağrı sayısını ve manifestte tanımlanan gerçek tutmayı ölçer. Ham model yanıtları rapora yazılmaz; yalnızca SHA-256 özetleri ve eşleşen gerçek kimlikleri tutulur. Donanım, `--execute-real` geçirilmedikçe ve `--model`, `OMNIROUTE_BASE_URL` ve `OMNIROUTE_API_KEY` yapılandırılmadıkça ağ veya ücretli model çağrısı yapmaz. Bu açık gerçek çalıştırma olmadan, makine tarafından okunabilir kararı `HOLD` kalır; yalnızca sentetik yük/çağrı sayısı ölçümleri promosyon kanıtı değildir.

Arayanlar, hizalanmış metne zaten sahip olduklarında desteklenen bir video bölümüne isteğe bağlı bir `transcript.cues` dizisi ekleyebilirler. Her ipucu `text`, araştırılan süre içinde sonlu bir `start`/`end` aralığı ve beyaz listeye alınmış bir `source` (`client`, `embedded` veya `audio-bridge`) taşımalıdır; `confidence` varsayılan olarak `1`'dir ve `0` ile `1` arasında kalmalıdır. Tam olarak yinelenen ipuçları birleştirilir. OmniRoute bu meta verilerden asla transkripsiyon başlatmaz: doğrulanmış ipuçları, kaynak, güven ve aralık ile açıklanan sonuca kopyalanır ve kare altyazılarının yanı sıra güvenilmeyen gözlemler olarak işlenir. Geçersiz, aralık dışı veya kökeni olmayan metin, altyazı akışına karıştırılmak yerine reddedilir. `source` alanı şu anda arayan tarafından beyan edilir, sunucu tarafından doğrulanmaz: OmniRoute, değerin izin verilen üç dizeden biri olmasını zorunlu kılar, ancak `embedded` veya `audio-bridge` etiketinin gerçekten sunucuya ait bir çıkarımdan geldiğini henüz kriptografik olarak doğrulamaz. Bu doğrulama gelene kadar `source`'u güvenilmeyen bir ipucu olarak ele alın; bunun üzerine yetkilendirme kararları oluşturmayın.

Gelişmiş bir arayan, aynı video için zaten yetkilendirilmiş bir `audioTranscript` parçası sağlayabilir. Füzyon dikişi, görsel ve işitsel gözlemleri tek bir son tarih ve iptal sinyali altında çalıştırır, bunları ortak bir zaman çizelgesinde sıralar, tam kopyaları birleştirir ve yalnızca bir taraf başarılı olduğunda kısmi bir sonuç bildirir. Geçersiz bir `audioTranscript`, tüm videoyu başarısız kılmak yerine bu kısmi sonuca düşer — görsel açıklama korunur ve ses dalı temizlenmiş bir hata kodu kaydeder. Dal başına kullanılabilirlik, kısmi bayrak ve temizlenmiş hata kodları, açıklanan sonuçta, koruma çubuğu meta verilerinde (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), sonuç önbelleği meta verilerinde ve köprü füzyon sayaçlarında korunur. Varsayılan Video Köprüsü yolu, konuşmadan metne dönüştürmeyi çağırmaz veya ikinci bir medya kopyası indirmez; bu açık parça olmadan, yalnızca video olarak kalır.

**Transkript saklama (#12150 P1).** Bu, Video Köprüsü (kendisi isteğe bağlı) bir transkript ipucunu işlediğinde otomatik olarak uygulanır — ayrı bir saklama bayrağı yoktur. Bir istek herhangi bir transkript ipucunu (arayan tarafından bildirilen bir `transcript` veya birleştirilmiş bir `audioTranscript`) işlediğinde, koruma çubuğu bunu `videoBridgeObserved` olarak işaretler ve video açıklamasının sansürlenmiş bir gölgesini üretir — her ipucunun serbest metin gövdesinin `[redacted-video-transcript]` ile değiştirildiği, dizenin birleştirilmeden önce yapılandırılmış ipucu alanının ikame edilmesiyle oluşturulan (asla düzleştirilmiş metni ayrıştırarak değil, bu nedenle hiçbir ipucu içeriği — düşmanca veya sıradan, `[inaudible]`/`[music]` gibi `]` içeren gövdeler dahil — hayatta kalamaz) aynı bir işleme. Kalıcı çağrı günlüğü istek gövdesi, her video kaynaklı metin parçasını, içerik eşitliğiyle eşleşen bu sansürlenmiş gölgeyle değiştirir; `fullText` çapası, bitmiş ön çağrı koruma çubuğu yükünden yeniden okunur, böylece eşleşme, daha sonraki zincir koruma çubukları (PII ve kimlik bilgisi maskeleri, öncelikler 10/95) açıklama metnini yerinde yeniden yazdıktan ve sistem istemi/devir/bellek enjeksiyonu mesaj dizisini yeniden şekillendirdikten sonra bile başarılı olur. Modele yukarı akışa gönderilen gövde değişmeden kalır. Gözlemlenen bir istek ayrıca kalıcı Bellek doldurmaz (hem istek hem de yanıt kaynaklı çıkarma atlanır), bu nedenle modelin kendi yanıtı transkript metnini Belleğe yansıtamaz.

Ek saklanan kopyalar aynı gözlemlenen istek sinyalini kullanır. Ham ön-koruma çubuğu istemci isteği anlık görüntüsü, bellekte bekleyen istek ve erken reddedilen istek günlüğü, video parçalarındaki transkript alanlarını yapısal olarak değiştirir; işlem hattı aşamaları tarafından sentezlenen dize istemleri ve bağlam devri, kalıcı istek gövdesi havuzunda sansürlenir. Kalıcı `video_content_removed` işareti, `previous_response_id` devamlılığının, kasıtlı olarak atılan metni yeniden oluşturmak yerine kapalı olarak başarısız olmasına neden olur. Gözlemlenen bir istek, günlüğe kaydedilmeden önce parça başına sansür gölgesini kaybederse veya daha sonraki istek mutasyonlarından sonra birkaç video gölgesinden biri eşleşmezse, saklanan istek gövdesi kısmen sansürlenmiş bir transkripti saklamak yerine tamamen atlanır.

Gözlemlenen bir istek için, bir model yanıtı, yapılandırılmış bir ipucu sınırı olmaksızın transkriptin herhangi bir bölümünü alıntılayabilir. Bu nedenle, kalıcı çağrı günlüğü `responseBody` bir atlama işaretiyle değiştirilir; ayrıntılı işlem hattı yapıtı (yukarı akış/istemci gövdeleri ve akış parçaları içerebilir) saklanmaz. Semantik, idempotency ve akıl yürütme tekrarı önbellekleri, bu istek için okuma ve yazmaları atlar. Sağlayıcı isteği ve istemciye görünür yanıt değişmeden kalır. Ayrıntılı yapıt atlandığında, geçici arabellekten erken keepalive baytları boşaltılır. Kiro'nun hatalı EventStream uyarısı yalnızca yük bayt sayısını bildirir, asla içeriğini veya JSON ayrıştırıcısının ham hatasını bildirmez.
Bu, her ilgisiz sağlayıcı/eklenti tanılama aracının denetlendiğini iddia etmez; daha geniş saklanan havuz taraması #11658'de takip edilmektedir.

Dahili `/api/modality-bridge/video/drilldown` yaşam döngüsü ayrı, geri döngü/jetonla kimlik doğrulanmış bir önbellek alt katmanıdır. Her işlem ayrıca kanonik opak bir ana kimlik gerektirir. Bir üretim arayanı etkinleştirilmeden önce, bu kimliği kimliği doğrulanmış kiracıdan türetmeli ve asla istemci tarafından seçilen bir değeri iletmemelidir. Önbellek anahtarları, bu ana kimliği kanonik oturum ve video referans kimliklerine bağlar, yalnızca SHA-256'dan türetilmiş anahtarlarını depolar ve hem okumaları hem de silmeyi aynı ana kimliğe sınırlar. Önbellek, giriş başına en fazla 16 türetilmiş JPEG çerçevesi depolar, bunları on dakika sonra sona erdirir ve sınırlı `start`/`end` okumalarını veya açık oturum silmeyi destekler.

Her ana kimlik 16 giriş ve 64 MiB kanonik JPEG verisi ile sınırlıdır. Bu sınırlar, genel 64 giriş/256 MiB tavanından bağımsızdır: ana kimlik kota baskısı, genel LRU tahliyesi dikkate alınmadan önce yalnızca o ana kimliğin en az kullanılan girişlerini tahliye eder. Süresi dolmuş girişler, önbellek etkinliğinde hem ana kimlik hem de genel muhasebeden silinir, iptal ve doğrulama hatası ise kısmi bir değiştirmeyi taahhüt etmez.

Önbellek, kanonik olmayan Base64'ü, fazla dolguyu, JPEG olmayan medyayı, hatalı veya kesilmiş JPEG'leri ve sınırlı tam görüntü `sharp` çözme sırasında uyarı veren JPEG'leri reddeder. Kabul edilen her görüntüyü kanonik bir JPEG olarak yeniden kodlar, genişlik ve yüksekliği arayan alanlarına güvenmek yerine çözülmüş baytlardan türetir ve kalan çok dilli baytları saklamak yerine atar. Yalnızca sınırlı kanonik sıkıştırılmış arabellek her iki kotaya da dahil edilir. JSON tel limiti, 32 MiB çözülmüş giriş tavanı için Base64 ek yükünü içerir. Her depolanan türetme, doğrulanmış JPEG formatını/çözünürlüğünü, örnekleme politikasını, türetme sürümünü, oluşturma zamanını, sunucu tarafından hesaplanan içerik karmasını ve karmalanmış üst referansını artı güvenilen arayanın üst içerik karmasını kaydeder. İptal, atomik önbellek taahhüdünden önce eşzamansız çözme/karma aşamaları arasında kontrol edilir.

Bu dilim henüz bir üretim üreticisini rotaya bağlamaz ve çok çözünürlüklü varyant seçimi sağlamaz. Bu nedenle, şeffaf Video Köprüsü istek yolu ek bir iş yükü getirmezken, kiracıya bağlı ana türetme ve tam FU-08 çok çözünürlüklü yaşam döngüsü, tamamlanmış davranış olarak belgelenmek yerine açık bir takip çalışması olarak kalır.

Kareler, yapılandırılmış Video modeliyle sırayla altyazılandırılır. Boş bir Video geçersiz kılma, Vision ayarını devralır; her ikisi de boşsa, Vision otomatik yönlendiricisi etkili görüş yeteneğine sahip modeli seçer. Başarılı altyazılar, orijinal bölümü, metni güvenilmeyen, medyadan türetilmiş bir gözlem olarak işaretleyen ve alt akış modellerine medyada bulunan talimatları takip etmemelerini söyleyen sabit bir `[Video description:` önekiyle değiştirir. Kare altyazı önbellek anahtarları JPEG baytlarını, istemi, zaman damgasını ve etkili modeli içerir; yalnızca başarılı altyazılar önbelleğe alınır. Önbellek girişleri, bir yedek model de dahil olmak üzere gerçek başarılı üretici modelini korur; köprü, farklı kareler farklı modeller tarafından üretildiğinde `mixed` olarak rapor verir. Bir önbellek isabeti, istenen yönlendirme planı olarak yeniden etiketlemek yerine o üretici kimliğini yeniden kullanır. Tüm video sonuç önbelleği, çıktıyı değiştiren her girişe göre anahtarlanır — istem, etkili model, örnekleme politikası, kare sayısı, anlamsal analiz modu, normalleştirilmiş odak ipucunun SHA-256 parmak izi, odak penceresi, `transcript`, `audioTranscript` ve iletişim sayfası bayrağı — bu nedenle bu boyutlardan herhangi birini değiştirmek bir önbellek ıskasıdır, asla eski bir yeniden kullanım değildir. Görsel tekilleştirme politikası sürümü, eşiği ve sınırlı aday kare sayısı da sonuç önbellek anahtarında ve meta verilerinde açıktır; bu nedenle bir politika değişikliği eski bir tüm video açıklamasını yeniden kullanamaz. Sonuç önbelleği v4 meta verileri modu ve parmak izini tutar, asla ham kullanıcı görevini tutmaz. Koruma kalkanı meta verileri hem istenen hem de etkili analiz modlarını rapor eder; kullanılabilir kullanıcı metni olmayan istenen `focused` modu etkili bir şekilde `full` olarak rapor edilir.

Koruma kalkanı desteklenen her video parçasını çıkarır ancak `modalityBridgeVideoMaxVideos` sayısından fazla video tanımlamaz. `supportsVideo === false` olduğu kanıtlanmış bir hedef için, başarısız ve limit üstü videolar açık güvenli metin işaretleyicileri haline gelir, böylece hiçbir ham video kalmaz. Yetenek bilinmediğinde, bu parçalar dokunulmadan kalır. `supportsVideo === true` olan hedefler köprüyü atlar. İstemci isteği iptal sinyali indirme, aracı kuyruğu, alt süreçler ve altyazı çağrıları boyunca yayılır; iptaller videolar arasında durur ve asla ham medyaya açık kalmaz.

Çalışma zamanı ayarları DB desteklidir ve Zod tarafından doğrulanır:

| Key                                 | Default     | Range / behavior                                                                                    |
| :---------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İsteğe bağlı çalışma zamanı, katılım gerektirir                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` genel altyazıları korur; `focused` sınırlı, güvenilmeyen en son kullanıcı bağlamını kullanır |
| `modalityBridgeVideoModel`          | `""`        | Vision Köprüsü modelini devralır                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` veya orantılı `segment_aware`; dedektör hatası `uniform`'a geri döner      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                      |

120 saniyenin üzerindeki eski kalıcı Video zaman aşımı değerleri aracı son teslim tarihine sabitlenir; bu limitin üzerindeki yeni ayar yazımları reddedilir. `GET /api/modality-bridge/video/runtime` kimlik doğrulama veya çalışma zamanı yoklamasından önce güvenilir damgalı geri döngü yerelliği gerektirir, ardından yönetim kimlik doğrulaması gerektirir. Yalnızca `available`, temizlenmiş FFmpeg/ffprobe sürümlerini ve çalışma zamanı kullanılamadığında sabit bir nedeni döndürür. Dahili çıkarma uç noktası herkese açık bir yükleme API'si değildir: kuyruk doygunluğu `503` artı `Retry-After` döndürür, arayanın bağlantısının kesilmesi `499` döndürür ve sabit aracı son teslim tarihi `504` döndürür. Dönüştürülen yanıtlar, Vision veya Ses segmentlerini kaldırmadan `video->text;model=<visionModel>;parts=<videos>` değerini merkezi `x-omniroute-modality-bridge` başlığına ekler.

### PII Masker (`piiMasker.ts`)

**Her iki** aşamada da çalışır.

- **`preCall`** yükü klonlar, `system`, `messages`, `input` ve `prompt` (düz dize öğeleri dahil) üzerinde gezinir ve dize `content`/`text` alanlarına `processPII()` (`@/shared/utils/inputSanitizer`'dan) uygular. `PII_REDACTION_ENABLED=true` olduğunda, tespit edilen PII giden yükte redakte edilir. Bu, `INPUT_SANITIZER_MODE`'dan (yalnızca istem enjeksiyon politikasını kontrol eder) bağımsızdır. Redaksiyon kapalı olduğunda, çağrı içeriği yeniden yazmadan tespit sayılarını kaydeder.
- **`postCall`** yanıtı derinlemesine klonlar, `sanitizePIIResponse()` artı Yanıtlar-API-şekil maskeleyicisini (`maskResponsesOutput` — `output_text` ve `output[].content[].text`'i kapsar) çalıştırır. Herhangi bir redaksiyon meydana gelirse, değiştirilmiş yanıt orijinalinin yerini alır.

Koruma kalkanı asla engellemez; yalnızca açıklama ekler (`meta.detections`, `meta.redacted`) veya yeniden yazar.

### Prompt Injection (`promptInjection.ts`)

Kullanıcı tarafından sağlanan içerikteki düşmanca yapıları tespit eder ve yapılandırılmış politikayı uygular. Davranış, ortam değişkenleri ve yapıcı seçenekleri tarafından yönlendirilir:

| Ayar            | Çevre Değişkeni                                                                                             | Varsayılan | Etki                                                                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Etkin           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`     | `false` olduğunda güvenlik katmanı kısa devre yapar (çalışmaz).                                                                                                                                                            |
| Mod             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`     | Enjeksiyon politikası: `block`, `warn` veya `log`. (`redact` geriye dönük uyumluluk için kabul edilir ancak enjeksiyon metnini **kaldırmaz**; talep PII yeniden yazımı `PII_REDACTION_ENABLED` tarafından kontrol edilir.) |
| Engelleme eşiği | `blockThreshold` seçeneği / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` takma adı) | `high`     | Engellemek için gereken minimum önem derecesi. Varsayılan olarak Medium yalnızca gözlem amaçlıdır.                                                                                                                         |

**Mod önceliği** (`getMode`): çağrılan `options.mode` →
`INJECTION_GUARD_MODE` **DB özellik bayrağı geçersiz kılma (feature-flag override)** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` çevre değ. → `INPUT_SANITIZER_MODE` çevre değ. →
`warn`. Bu nedenle bir pano (dashboard) geçersiz kılma ayarı çevre değişkenlerini geçersiz kılar, böylece Özellik Bayrakları (Feature Flags) arayüzü çalışan korumayı canlı olarak kontrol eder (yeniden başlatma gerekmez). Veritabanı okuması hata korumalıdır (fail-safe):
eğer hata verirse koruma, çevre değişkeni tabanlı davranışı uygular ve herhangi bir geçersiz kılma ayarlanmadığında davranış, yalnızca çevre değişkeni çözümlemesiyle aynıdır.

Algılama kaynakları:

1. `@/shared/utils/inputSanitizer` içinden `sanitizeRequest()` (işlem hattının başka bir yerinde kullanılan paylaşılan algılayıcı
   kümesi).
2. Yerleşik `DEFAULT_GUARD_PATTERNS` (şu anda `system_override_inline` ve
   `markdown_system_block`, her ikisi de `high` önem derecesine sahiptir).
3. Yapıcı (constructor) seçenekleri aracılığıyla iletilen isteğe bağlı `customPatterns` (dize, normal ifade veya
   `{ name, pattern, severity }` kayıtları).

`mode === "block"` **ve** en az bir algılama önem eşiğini karşıladığında, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` döndürür. `warn`/`log` modlarında güvenlik katmanı günlük kaydı tutar ancak çağrıya izin verir. Kayıt defterinden (registry) geçmeden istemleri değerlendirmesi gereken çağrıcılar için paylaşılan yardımcı `evaluatePromptInjection()` de dışarı aktarılır.

**Tarama sınırı (v3.8.20):** algılayıcı yalnızca birleştirilmiş istem metninin **ilk 16 KB**'ını inceler —
`src/shared/utils/inputSanitizer.ts` içinde `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Hem `detectInjection()` hem de
`evaluatePromptInjection()` desen döngüsünü çalıştırmadan önce `slice(0, MAX_INJECTION_SCAN_BYTES)` uygular. Enjeksiyon yönergeleri bir girdinin üst kısmına yakın yer alır, bu nedenle algılamayı zayıflatmadan yüzlerce KB'lık yüklerde regex CPU/GC tüketimini sınırlar (bkz. #3932, #4041).

### Kimlik Bilgisi Maskeleyici (`credentialMasker.ts`)

**Her iki** aşamada da çalışır, varsayılan zincirde son sıradadır (öncelik `95`). Giden yükten (mesaj içeriği, araç çağrısı argümanları, araç sonuçları) **ve** sağlayıcı yanıtından bilinen API anahtarı / gizli belirteç (secret-token) kalıplarını maskeler, böylece bir istemin içine yapıştırılmış (veya bir araç sonucu tarafından geri yansıtılmış) bir kimlik bilgisi üst düzey sağlayıcıya veya istemciye sızdırılmaz.

- PII maskeleme ile aynı kurala sahip, **yalnızca katılım (opt-in)** (Sert Kural #20 ile ilişkili):
  `settings.credentialRedactionEnabled === true` **veya**
  `CREDENTIAL_REDACTION_ENABLED=true` olmadığı sürece devre dışıdır. Kapalı olduğunda güvenlik katmanı hiçbir şey yapmaz (no-op) — asla engellemez ve asla yeniden yazmaz.
- `redactCredentials()` tam yük/yanıt ağacını dolaşır (`walkValue()`, prototip kirlenmesine karşı güvenli, `WeakSet` aracılığıyla döngüye karşı güvenli) ve eşleşmeleri bir `[REDACTED:<type>]` yer tutucusu ile değiştirir, yalnızca fiilen değişen dalları klonlar.
- `CREDENTIAL_PATTERNS`, LLM sağlayıcı anahtarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS belirteçlerini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ödeme anahtarlarını (Stripe, Square), bulut
  anahtarlarını (AWS erişim anahtarı, Twilio, SendGrid, Mailgun), özel anahtarları / JWT'leri, kimlik bilgisi içeren bağlantı dizelerini (`mongodb://user:pass@...`, vb.) ve genel bir `Authorization`/`x-api-key`/`api-key`/`apikey` başlık değeri kalıbını kapsar. Başlık biçimindeki anahtarlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`), genel metin regex'i yerine yapısal olarak (yalnızca değer, `Bearer `/`Basic ` gibi şema öneki korunarak) maskelenir.
- Güvenlik katmanı asla engellemez; yalnızca yeniden yazar (`modifiedPayload` /
  `modifiedResponse`) ve not düşer (`meta.credentialsRedacted`, `meta.count`).

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
  block?: boolean; // true, zinciri kısa devre yapar (short-circuit)
  message?: string; // engelleme durumunda gösterilir
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

Bir güvenlik koruması (guardrail), `void`, `{}` veya `{ block: false }` döndürerek "değişiklik yok" sinyali verir. Bir `modifiedPayload`/`modifiedResponse` döndürmek, sonraki güvenlik korumaları için zincir boyunca akan değerin yerini alır. `signal?: AbortSignal`, çağrıcı yaşam döngüsünü güvenlik korumalarına taşır. İstek iptali, kasıtlı bir hataya açık (fail-open) istisnadır: medya köprüleri, ham medyayı desteklemediği bilinen bir hedefe geri yüklemeden çalışmaları durdurur ve temizlik yapar.

## Kayıt Defteri (`registry.ts`)

Singleton `guardrailRegistry` şunları sunar:

- `register(guardrail)` — bir güvenlik koruması ekler (veya normalleştirilmiş ada göre değiştirir) ve artan `priority` değerine göre yeniden sıralar.
- `clear()` / `list()` — yönetimsel yardımcılar.
- `runPreCallHooks(payload, context)` — etkin güvenlik korumaları üzerinden yinelenir, yükü (`payload`) `modifiedPayload` aracılığıyla aktarır ve ilk `block: true` değerinde durur.
- `runPostCallHooks(response, context)` — yanıt tarafında aynı akış.
- `resetGuardrailsForTests({ registerDefaults })` — temiz test izolasyonu için durumu temizler ve isteğe bağlı olarak varsayılanları yeniden kaydeder.

Her iki çalıştırıcı da `results` alanının izleme için yararlı olan her güvenlik korumasına ait `blocked`, `skipped`, `modified`, `error` ve `meta` alanlarını içeren `GuardrailExecutionResult` kayıtlarından oluşan bir dizi olduğu `{ blocked, payload|response, results, guardrail?, message? }` nesnesini döndürür.

### İstek Başına Güvenlik Korumalarını Devre Dışı Bırakma

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })`, mevcut istek için atlanması gereken güvenlik koruması adlarının tekilleştirilmiş (de-duplicated) bir listesini toplar. Kaynaklar (tümü isteğe bağlı, tümü birleştirilir):

- `apiKeyInfo.disabledGuardrails`
- İstek gövdesi `disabledGuardrails` (en üst düzey)
- İstek gövdesi `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (veya eski adıyla `x-disabled-guardrails`)

Değerler dizi veya virgülle ayrılmış bir dize olabilir; adlar küçük harfli kebab-case formatına normalleştirilir (`pii_masker` → `pii-masker`). Sonuç, `context.disabledGuardrails` aracılığıyla, eşleşen güvenlik korumalarını (`results` içinde `skipped: true`) atlayan kayıt defterine iletilir.

## Yürütme Sırası

`src/sse/handlers/chat.ts` ve `open-sse/handlers/chatCore.ts` üzerinden geçen her istek için:

1.  `resolveDisabledGuardrails(...)` API anahtarı, gövde ve başlıklardan atlama listesini oluşturur.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` koruyucuları artan öncelik sırasına göre çalıştırır:
    - Devre dışı bırakılan koruyucular `skipped` olarak kaydedilir.
    - Her koruyucunun `preCall`'u, `modifiedPayload` aracılığıyla yükü yeniden yazabilir.
    - İlk `block: true` zinciri kısa devre yapar ve işleyici bir koruyucu reddetme yanıtı döndürür.
3.  (Potansiyel olarak yeniden yazılmış) yük, birleşik yönlendirme ve yukarı akış dağıtımına akar.
4.  Yanıt birleştirildikten sonra, `guardrailRegistry.runPostCallHooks(...)` aynı zinciri yanıt üzerinde çalıştırır. Buradaki `block: true` yukarı akış yanıtını düşürür.

Hata fırlatan koruyucular `error: <message>` ile kaydedilir ve `logger.warn` aracılığıyla günlüğe yazılır, ancak zincir devam eder — tasarım gereği açık kalır.

## Yapılandırma

Yerleşik koruyucular tarafından okunan ortam değişkenleri:

| Değişken                              | Kullanan                  | Etki                                                                                                                 |
| :------------------------------------ | :------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Algılamayı tamamen devre dışı bırakmak için `false` olarak ayarlayın.                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Enjeksiyon politikası: `warn`, `block` veya `log`. Eski `redact` değeri enjeksiyon metnini yeniden yazmaz.           |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Enjeksiyon koruyucusu için mod; ayrıca ortam değişkenlerini **geçersiz kılan** bir DB özellik bayrağıdır (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block`'un reddettiği minimum ciddiyet: `high` (varsayılan), `medium` veya `low`.                               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` için eski takma ad.                                                                |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` olduğunda, istek PII'si redakte edilir (enjeksiyon modundan bağımsız olarak).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Yanıt tarafı maskeleyici davranışını kontrol eder.                                                                   |

Modality Bridge koruyucuları, çalışma zamanı yapılandırmasını ortam değişkenlerinden değil, DB destekli ayarlar deposundan (`getSettings()`) okur. Vision'ın birincil anahtarları `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ve `modalityBridgeCacheMaxEntries` şeklindedir. Eski `visionBridge*` anahtarları yalnızca belgelenmiş tek döngülü okuma geri dönüşü olarak kabul edilir; kontrol paneli yazımları birincil anahtarları kullanır. Varsayılanlar ve geri dönüş çözümleyici `src/shared/constants/modalityBridgeDefaults.ts` içinde bulunur, eski sabitler ise `src/shared/constants/visionBridgeDefaults.ts` içinde korunur.

Ses, `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` ve `modalityBridgeAudioMaxClips` ile paylaşılan `modalityBridgeCache*` ayarlarını kullanır. Sesin eski anahtar geri dönüşü yoktur çünkü bu anahtarlar Modality Bridge şemasıyla birlikte tanıtılmıştır.

Video, `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` ve `modalityBridgeVideoTimeout` ile paylaşılan `modalityBridgeCache*` ayarlarını kullanır. Varsayılan olarak devre dışıdır çünkü FFmpeg/ffprobe isteğe bağlı operasyonel bağımlılıklardır ve kare altyazılandırma gecikme ve model maliyeti ekler.

## Özel Güvenlik Kalkanları (Custom Guardrails)

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

1. `BaseGuardrail` sınıfından türeyen `src/lib/guardrails/myGuardrail.ts` dosyasını oluşturun.
2. `preCall` ve/or `postCall` metodlarını implement edin.
3. Ya içe aktarma (import) zamanında kaydedin (`registerDefaultGuardrails` içinden çağırarak) ya da
   çalışma zamanında (runtime) `guardrailRegistry.register(...)` metodunu çağırın — kayıt defteri (registry), aynı normalize edilmiş isme sahip
   önceki tüm güvenlik kalkanlarının yerini alır.
4. `tests/unit/` altında testler ekleyin (mevcut örnekler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test Etme

Bilinen bir durumdan başlamak için testler arasında `resetGuardrailsForTests()` kullanın.
Boş bir kayıt defteriyle başlamak ve yalnızca test edilen güvenlik kalkanlarını kaydetmek için
`{ registerDefaults: false }` parametresini geçirin. Vision Bridge bağımlılık enjeksiyonunu
(`deps.getSettings`, `deps.callVisionModel`) kabul eder; Audio Bridge ise ayarlar, yetenekler, STT model seçimi, kimlik bilgisi kontrolleri ve transkripsiyon için
eşdeğer dikişleri (seam) sunar. Bu sayede testler, veritabanı veya ağ erişimine gerek kalmadan her iki akışı da çalıştırabilir.

## Ayrıca Bakınız

- `src/lib/guardrails/` — implementasyon
- `src/shared/utils/inputSanitizer.ts` — prompt-injection ve PII maskeleme özelliklerini sağlayan
  ortak detektör
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge varsayılanları ve
  zorunlu köprü (forced-bridge) model listesi
- `src/shared/constants/modalityBridgeDefaults.ts` — ortak Vision/Audio çalışma zamanı (runtime) varsayılanları
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonal katman (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — tam çevre değişkeni (env var) referansı

## Enjeksiyon Kalkanı Rota Kapsamı ve Kırmızı Takım (Red-Team) Testleri (Faz 8 · Blok D)

Enjeksiyon kalkanı (`createInjectionGuard` / `withInjectionGuard`), kullanıcı istemlerini (prompt) kabul eden tüm rotaları
kapsar. `INJECTION_GUARD_MODE` ayarına uyar (varsayılan `warn` = yalnızca loglar;
`block` = HTTP 400 `SECURITY_001` döndürür).

| Tür            | Rotalar                                                                                                                                              | Varsayılan mod |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Metin (mevcut) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Üretken        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Veri           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Metin çıkarma (`extractMessageContents`), `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarını kapsar.

**Kırmızı takım (gece çalışması, `nightly-llm-security.yml`):** promptfoo, her rotanın `INJECTION_GUARD_MODE=block` altında OWASP-LLM derlemini (corpus) engellediğini doğrular; garak taramalar çalıştırır (gizli anahtar yoksa atlanır).
`moderations` tutarlılık için dahil edilmiştir — blok modundaki operatörler `resolveDisabledGuardrails`
aracılığıyla bunu muaf tutabilir.

Gece iş akışı (`.github/workflows/nightly-llm-security.yml`, cron + manuel
tetikleme) iki işe sahiptir:

- **`promptfoo-guard` (engelleme)** — `INJECTION_GUARD_MODE=block` ile
  `promptfoo eval -c promptfooconfig.yaml` komutunu çalıştırır. Her düşmanca senaryo (ör. "önceki tüm
  talimatları yoksay…", DAN tarzı jailbreak'ler), yanıtın `error.code === "SECURITY_001"` taşıdığını, yani kalkanın isteği gerçekten reddettiğini iddia eder.
- **`garak` (tavsiye niteliğinde)** — yerel bir OmniRoute örneğine (`http://localhost:20128/v1`) karşı
  garak `--probes promptinject,dan,leakreplay` komutunu çalıştırır. Sağlayıcı gizli anahtarına (`PROMPTFOO_PROVIDER_KEY`) bağlıdır; sorunsuz bir şekilde atlanır ve sonuna `|| true` eklenmiştir, böylece CI'ı (sürekli entegrasyon) başarısız kılmadan raporlama yapar.

Kalkan yardımcısının (`createInjectionGuard` / `withInjectionGuard`) kapsamı,
istem içeren her `/v1` rotasını kapsar; istem metni, `src/shared/utils/inputSanitizer.ts` içindeki
`extractMessageContents()` tarafından `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` alanlarından çekilir.
