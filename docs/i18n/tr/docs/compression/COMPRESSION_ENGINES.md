# Compression Engines (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute sıkıştırması, motor sözleşmeleri üzerine kuruludur. Bir mod, doğrudan tek bir motoru
(`caveman` veya `rtk`) ya da birden fazla motoru sırayla çalıştıran deterministik, yığınlanmış bir işlem hattını çalıştırabilir.

## Modlar

| Mod          | Motor yolu                               | Amaçlanan girdi                                   |
| ------------ | ---------------------------------------- | ------------------------------------------------- |
| `off`        | yok                                      | İstemin aynen korunması                           |
| `lite`       | Caveman lite yardımcıları                | Düşük riskli, her zaman etkin temizleme           |
| `standard`   | Caveman                                  | Doğal dil istemlerinin yoğunlaştırılması          |
| `aggressive` | Caveman + geçmiş/araç özetleyicileri     | Uzun sohbet oturumları                            |
| `ultra`      | Caveman + budama yardımcıları            | Bağlam sınırından kurtarma                        |
| `rtk`        | RTK                                      | Terminal, kabuk, derleme, test ve git çıktısı     |
| `omniglyph`  | OmniGlyph                                | Yerel sağlayıcı hattında görüntü olarak bağlam    |
| `stacked`    | İşlem hattı, varsayılan `rtk -> caveman` | Karma araç günlükleri ve düz yazı, azami tasarruf |

### OmniGlyph sıkıştırma profilleri

`omniglyph` motoru (`omniglyph` paketi, 1.4.0+), sıkıştırma ayarlarında `omniglyph.profile`
üzerinden global olarak veya yığınlanmış işlem hattının adım yapılandırması üzerinden adım
başına ayarlanan, adlandırılmış bir anlamsal profili kabul eder:

| Profil        | Sınır                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Varsayılan. Yayımlanan ölçümlerde değerlendirilen politika — sistemi, araç belgelerini ve yoğun geçmişi görselleştirir |
| `balanced`    | Canlı durumu yerel biçimde tutar, son 8 turu korur, daha eski kapanmış geçmişi daraltır                                |
| `coding-safe` | Yetkiyi, araç şemalarını ve canlı araç çıktısını yerel biçimde tutar, son 12 turu korur                                |
| `passthrough` | Dönüştürmeden yönlendirir; motor atlanır                                                                               |

Profil bir **tabandır değil, tavandır**: paketteki `mergeCompressionProfileOptions`,
çağıran tarafın yaptığı bir geçersiz kılmanın profilin kapattığı kayıplı bir kanalı yeniden
açmasına izin vermez; dolayısıyla adım başına `preserveSystemPrompt: false`, `coding-safe`
altında sistem sıkıştırmasını yeniden etkinleştiremez.

Bu kod tabanında yapılan ölçümlere göre: `coding-safe` ve `balanced`, `minCompressChars`
değerini azami seviyesine yükseltir ve sistemi, araç şemalarını ve araç sonuçlarını yerel
biçimde tutar; bu nedenle henüz geçmiş biriktirmemiş bir oturum `below_min_chars`
noktasında durur ve motor hiçbir şeyi dönüştürmez. Bu nedenle varsayılan profil, en güvenli
profil yerine `aggressive` olarak belirlenmiştir.

Paket, kendi model kapsamını ve profilini ortam yapılandırmasından çözümler. OmniRoute bu
kararı hiçbir zaman devretmez: bağdaştırıcı, model geçidini paketin en kısıtlayıcı kapsamına
sabitler; böylece ana makinenin ortam ayarları izin listesini yalnızca daraltabilir,
OmniRoute'un ölçülen sonuçlarının ötesine asla genişletemez.

## Motor Kayıt Defteri

Kayıt defteri `open-sse/services/compression/engines/registry.ts` içinde bulunur. Motorlar ortak bir
sözleşme sunar:

- `id`: `caveman` veya `rtk` gibi kararlı motor kimliği
- `apply(text, config)`: yığınlanmış işlem hatları tarafından kullanılan eski yürütme yolu
- `compress(input, config)`: metin + istatistik döndüren birincil yürütme yolu
- `getConfigSchema()`: geçerli yapılandırmanın JSON-Schema benzeri yapısını döndürür
- `validateConfig(config)`: `{ valid, errors[] }` döndürür

Kayıt işlemi, kabul etmeden önce `assertValidEngine()` ve `validateConfig(defaultConfig)` çağrılarını
yapan `registerCompressionEngine(engine)` (veya gelişmiş durumlar için `registerEngine`) kullanılarak gerçekleştirilir.
Çalışma zamanında bir motoru kaldırmak için `unregisterCompressionEngine(id)` kullanın.

`strategySelector.ts`, sıkıştırma çalıştırılmadan önce yerleşik motorları kaydeder. Bu sayede önizleme,
çalışma zamanı sıkıştırması, yığınlanmış mod, testler ve gelecekteki motorlar aynı yürütme yolunu kullanabilir.

### MCP açıklama sıkıştırması (ilgili)

Ayrı bir kayıt defteri, MCP araç açıklaması meta verilerini kayıt defteri düzeyinde sıkıştırır — bkz.
`open-sse/mcp-server/descriptionCompressor.ts` ve [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Caveman
kurallarını yeniden kullanır ancak istek yükleri üzerinde değil, araç meta verileri üzerinde çalışır.

### Ek yerleşik motorlar

Caveman, RTK ve LLMLingua-2'nin yanı sıra kayıt defteri, çeşitli özelleştirilmiş kayıpsız /
yapısal motorlarla birlikte gelir (yığınlanmış işlem hatları, deneme ortamı ve testler tarafından kullanılır):

| Motor         | Kimlik          | Yaptığı iş                                                                                                                                                                                              |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): büyük ve bitişik metin bloklarını içerik adresli referanslarla değiştirir; böylece tekrarlanan/büyük bloklar bir kez gönderilir ve sonrasında bunlara referans verilir. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): homojen JSON dizisi yüklerini sütun tabanlı bir `[N rows]` biçimine dönüştüren kayıpsız tablo sıkıştırması.                                                                     |
| ionizer       | `ionizer`       | Çok büyük homojen bloklar için baş/orta/son satır örneklemesi yapar ve çıkarılan orta bölümü CCR içerik adresli referansı olarak saklar.                                                                |
| session-dedup | `session-dedup` | İçerik adresli, konuşma turları arası tekilleştirme (TokenMizer'dan esinlenmiştir): aynı oturumun önceki turlarında zaten görülen metni çıkarır.                                                        |

**CCR alma protokolü talimatı (#8033):** CCR'nin bir istekte ilk kez ≥1 bloğu
değiştirdiği durumda motor, çağırana işaretçi → araç sözleşmesini öğreten, başında
`[CCR protocol]` gözcü değeri bulunan, tek ve idempotent bir `system` mesajı ekler: bir
`[CCR retrieve hash=<24hex> chars=N]` işaretçisinin ne anlama geldiğini, hash değerinin birebir
kopyalanması gerektiğini (24 onaltılık karakterin tamamı — hatalı kopyalanan hash değerleri,
"blok bulunamadı" hatalarının olası nedenidir) ve bir `[dedup:ref sha=...]` işaretçisinin
"aracı çağır" değil, "geçmişe bak" anlamına geldiğini açıklar. Not, **yalnızca çağıranın bildirdiği
`tools[]`, `omniroute_ccr_retrieve` aracına gerçekten erişebildiğini kanıtladığında** eklenir
(`open-sse/services/compression/engines/ccr/protocolInstruction.ts` içindeki
`callerSupportsCcrRetrieve()`) — bu araca sahip olmayan düz bir OpenAI uyumlu çağıran, erişemeyeceği
bir şeyi çağırma talimatı almaz. İdempotentlik, ekleme işleminden önce mesaj geçmişinde gözcü
değerin aranmasıyla sağlanır; böylece önceki mesajları yeniden oynatan çok turlu isteklerde not,
her turda yeniden eklenerek yığılmaz.

## Caveman

Caveman modu, normal düzyazının anlamsal olarak yoğunlaştırılmasına odaklanır:

- kod bloklarını, URL'leri, JSON'u, yolları ve yapılandırılmış verileri korur
- dolgu ifadelerini, ihtiyat belirten ifadeleri, tekrarlanan bağlamı ve gereksiz uzunluktaki bağlayıcı ifadeleri kaldırır
- `open-sse/services/compression/rules/` içindeki dile duyarlı dosya kural paketlerini destekler
- eski `standard`, `aggressive` ve `ultra` modları üzerinden kullanılmaya devam eder

Gösterge panelindeki konumu `Dashboard -> Context & Cache -> Caveman` şeklindedir.

Caveman upstream'i, kıyaslamalarda `~75%` daha az çıktı tokenı ve `22-87%` aralığında ortalama `65%` çıktı tasarrufunun yanı sıra `~46%` oranında bir girdi sıkıştırma aracı bildirir. OmniRoute, yığılmış istem/bağlam tasarruflarını belgelendirirken Caveman'ın girdi tarafındaki oranını kullanır; Caveman çıktı modu ise ayrı bir yanıt davranışı özelliği olmaya devam eder.

## RTK

RTK modu, komut ve araç çıktılarına odaklanır:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest, Cargo/Go testleri, TypeScript/Vite/Webpack derlemeleri, ESLint, npm denetimleri/kurulumları, Docker günlükleri, kabuk `find`/`grep` çıktıları, yığın izleri ve genel günlükler gibi çıktı sınıflarını algılar
- `open-sse/services/compression/engines/rtk/filters/` içindeki 49 JSON filtresini uygular
- RTK tarzı bildirimsel işlem hattını destekler: ANSI temizleme, değiştirme, match-output kısa devresi, satır kaldırma/tutma, satır başına kısaltma, baş/son/azami satır kısaltması ve boş sonuç durumunda geri dönüş
- `.rtk/filters.json` içindeki güven denetimli proje filtrelerini ve `DATA_DIR/rtk/filters.json` içindeki global filtreleri destekler
- ANSI dizilerini, ilerleme gürültüsünü, tekrarlanan satırları ve yararsız standart metinleri temizler
- işlem yapılabilir hataları, uyarıları, özetleri, değiştirilen dosyaları ve son bağlamı korur
- kimliği doğrulanmış yönetim yolları üzerinden kurtarma/hata ayıklama amacıyla redakte edilmiş ham çıktıyı isteğe bağlı olarak saklayabilir

Gösterge panelindeki konumu `Dashboard -> Context & Cache -> RTK` şeklindedir.

Özel filtreler, güven, doğrulama ve ham çıktı kurtarmayla ilgili operasyonel ayrıntılar [`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) içinde yer alır.

RTK upstream'i, komut çıktısı sıkıştırmasında `60-90%` tasarruf bildirir. README örneğinde, 30 dakikalık bir Claude Code oturumunun `~118,000` tokendan `~23,900` tokena düştüğü, yani `79.7%` tasarruf sağlandığı gösterilir.

## LLMLingua-2 (Anlamsal Budama)

LLMLingua-2 modu, kural tabanlı Caveman ve RTK motorlarını tamamlayacak şekilde küçük bir ONNX token sınıflandırıcısı kullanarak düzyazı üzerinde **anlamsal token budaması** gerçekleştirir:

- yalnızca sistem dışı mesajlardaki düzyazıyı sıkıştırır; çitle çevrili kod blokları ve korunan diğer yapılar hiçbir zaman değiştirilmez
- `@atjsh/llmlingua-2` arka ucunu (`@huggingface/transformers` üzerinden ONNX) bir worker iş parçacığında çalıştırır; böylece model çıkarımı hiçbir zaman istek olay döngüsünü engellemez
- **yığınlanabilir** (`stackPriority` 35): yığılmış bir işlem hattında yapısal motorlardan (CCR, session-dedup, headroom, Caveman) sonra, ancak `ultra`dan önce çalışır; çünkü anlamsal budama, önceden yapısal olarak sıkıştırılmış metinlerde en etkilidir — ör. `rtk -> caveman -> llmlingua`
- **herhangi bir hatada güvenli biçimde devre dışı kalır** (eksik isteğe bağlı bağımlılıklar, worker başlatma, model yükleme, çıkarım veya zaman aşımı) → hata yerine özgün metin değiştirilmeden döndürülür

Motorun konumu: `open-sse/services/compression/engines/llmlingua/`. Gösterge panelindeki konumu `Dashboard -> Context & Cache -> LLMLingua` şeklindedir.

### Modeller

Varsayılan model **TinyBERT**'tir (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB, hızlı). Daha yüksek doğruluk sağlayan **BERT-base** modeli (`Arcoldd/llmlingua4j-bert-base-onnx`, ~710 MB), motor yapılandırmasındaki `model` alanı üzerinden kullanılabilir. `@huggingface/transformers`, seçilen modeli ilk çağrıda (`modelStore.ts`) HuggingFace Hub'dan `${DATA_DIR}/models/llmlingua` konumuna tembel şekilde indirir; `modelPath` yapılandırma geçersiz kılması ise modeli bunun yerine yerel bir kopyaya yönlendirir (çevrimdışı / ağdan yalıtılmış kurulumlar).

### İsteğe bağlı bağımlılıklar ve isteğe bağlı kurulum

Budanabilir LLMLingua çalışma zamanı eş bağımlılık yığını **isteğe bağlıdır**. İki paket, `package.json` içinde `optionalDependencies` olarak tanımlanır ve üretim derlemesi tarafından **harici** tutulur (`scripts/build/prepublish.ts` bunları pakete dahil etmez):

| Paket                | Sürüm (sabit) | Notlar                                                  |
| -------------------- | ------------- | ------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | Giriş paketi; diğerlerini eş bağımlılık olarak tanımlar |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                               |

`@huggingface/transformers`, `^4.2.0` sürümüne sabitlenmiştir (yerel gömme yolu ile paylaşılır ve bağımsız pakete de izlenerek dahil edilir); `@atjsh/llmlingua-2@2.0.5`, bunu `"^3.5.2 || ^4.0.0"` ile eş bağımlılık olarak tanımlar; dolayısıyla hem Transformers.js v3 hem de v4 desteklenir. 2.0.4 sürümünden itibaren `@atjsh/llmlingua-2` artık `@tensorflow/tfjs` gerektirmez; böylece SLM yığınının tek başına en büyük bileşeni olan TensorFlow.js kaldırılmıştır. Yalnızca yukarıdaki iki paket budanabilir SLM eş bağımlılıklarıdır. Standart bir `npm install` (geliştirme), isteğe bağlı bağımlılıklar hariç tutulmadığı sürece isteğe bağlı yığını otomatik olarak kurar.

**Neden isteğe bağlı:** npm'de yayımlanan paket, bağımsız paket ve Docker imajı, küçük kalabilmek için bu bağımlılıklar **olmadan** sunulur. Bunlar bulunmadığında worker'ın bağımlılık geçidi (`worker.ts` içindeki bir `@atjsh/llmlingua-2` çözümleme yoklaması) başarısız olur ve motor **sessizce güvenli biçimde devre dışı kalır** — LLMLingua'yı seçmek etkisiz bir işlem hâline gelir (metin değiştirilmeden döndürülür, hata günlüğe kaydedilmez). Budanmış bir ortamda etkinleştirmek için isteğe bağlı yığını kurun:

```bash
# package.json optionalDependencies içinde belirtilen sürümlere sabitleyin
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` paketinin kaldırılması (2.0.4+), daha önce baskın olan ~800 MB'lık bileşeni ortadan kaldırır — geriye transformers.js + onnxruntime-node çalışma zamanlarının kapladığı alan ile ilk kullanımda indirilen (npm üzerinden değil) TinyBERT modeli (~57 MB) kalır.

Ortama göre:

- **Geliştirme / `npm install`** — `--omit=optional` (veya `--no-optional`)
  seçeneğini kullanmadıysanız otomatik olarak yüklenir. Herhangi bir işlem gerekmez.
- **Global npm (`npm i -g omniroute`) / bağımsız kurulum** — yukarıdaki yükleme komutunu
  kurulu paket dizininde çalıştırın veya isteğe bağlı bağımlılıkları hariç tutmadan yeniden yükleyin.
- **Docker** — yükleme komutunu türetilmiş bir imaj katmanına ekleyin; yayımlanan imaj
  tasarım gereği minimum boyuttadır.
- **VPS (PM2)** — uygulamanın `node_modules` dizinine yükleyin, ardından worker'ın geçidi
  yeniden denetlemesi için süreci yeniden başlatın.
- **Ham Next bağımsız kurulumu (`npm run build` → `.build/next/standalone/server.js`)** —
  bağımsız izleme çıktısı NE worker'ı NE DE isteğe bağlı bağımlılıkları içerir; bu nedenle motor
  sessizce açık kalacak şekilde başarısız olur. `scripts/build/colocate-standalone.mjs` her ikisini de
  yeniden uygular (worker esbuild + isteğe bağlı bağımlılıkların bağımsız dizin ağacına eklenmesi);
  her derlemeden sonra `postbuild` npm kancası aracılığıyla otomatik olarak çalışır.
  Aynı sonucu verecek şekilde tekrar çalıştırılabilir ve bağımlılıklar yoksa kontrollü biçimde başarısız olur.

**Etkin olduğunu doğrulayın:** LLMLingua seçiliyken gerçek düzyazı gerçekten küçülür (motor
artık açık kalacak şekilde başarısız olmaz) ve ilk istek, modelin
`${DATA_DIR}/models/llmlingua` dizinine indirilmesini tetikler. Geçit bilinçli olarak yalnızca
`@atjsh/llmlingua-2` paketini denetler — diğer eş bağımlılıklar yalnızca ESM'dir ve mevcut
olsalar bile `require.resolve` onlar için hata fırlatır — dolayısıyla herhangi bir eş bağımlılık
`import()` sırasında gerçekten eksikse worker yine açık kalacak şekilde başarısız olur.

## Yığılmış İşlem Hatları

Yığılmış mod, işlem hattı adımlarını sırayla çalıştırır. Varsayılan sıra şöyledir:

```txt
rtk -> caveman
```

Bir istemin komut çıktısını insan veya asistan metniyle birleştirdiği kodlama aracısı oturumlarında bunu kullanın. RTK önce gürültülü araç günlüklerini azaltır, ardından Caveman kalan doğal dili sıkıştırır.

İşlem hattı adımları, sıkıştırma ayarlarındaki `stackedPipeline` ile veya sıkıştırma kombinasyonları aracılığıyla yapılandırılır.

Her iki motor da aynı uygun veri yükünü azalttığında tasarruflar birleşir:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP Erişilebilirlik Ağacı Filtresi

MCP erişilebilirlik ağacı akıllı filtresi; istemler veya bağlam üzerinde değil, MCP **araç sonuçları** üzerinde çalışan, yürütme sonrası bir sıkıştırma katmanıdır. Playwright, computer-use ve tarayıcı otomasyonu MCP sunucuları gibi araçların döndürdüğü ayrıntılı erişilebilirlik ağacı ve tarayıcı anlık görüntüsü veri yüklerini hedefler.

### Yaptıkları

1. **Gürültü temizleme** — boş genel/metin girdilerini kaldırır (`- generic:`, `- text: ""`)
2. **Kardeş öğeleri daraltma** — ≥ `collapseThreshold` (varsayılan 30) ardışık satır yapısal tekrarlar içerdiğinde, bunları ilk `collapseKeepHead` (varsayılan 10) satır + bir adet sayı özeti + son `collapseKeepTail` (varsayılan 5) satır şeklinde daraltır
3. **Ref koruması** — Playwright/computer-use için gerekli olan `[ref=eXX]` bağlantı noktalarına hiçbir zaman dokunulmaz
4. **Kesin kırpma** — daraltma sonrasında metin hâlâ `maxTextChars` (varsayılan 50.000) değerini aşıyorsa aracının çalışmaya devam edebilmesi için bir gezinme ipucuyla birlikte kırpılır

### Motor konumu

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() giriş noktası
  collapseRepeated.ts ← kardeş öğeleri daraltma algoritması
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Yapılandırma

Genel ayarlardaki `compression.mcpAccessibility` tarafından kontrol edilir (geçiş 056). Varsayılan yapılandırma:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filtre yalnızca `type` değeri `"text"` olan ve uzunluğu `minLengthToProcess` değerini aşan araç sonucu veri yüklerine uygulanır. İstem sıkıştırmasını veya istek veri yüklerini etkilemez.

### Beklenen tasarruf

Sayfa karmaşıklığına bağlı olarak tarayıcı anlık görüntüsü araç sonuçlarında %60–80. Daraltma algoritması, satır sayısı açısından O(n) karmaşıklığındadır ve ihmal edilebilir düzeyde gecikme ekler.

### Bu filtre ile yukarıdaki sıkıştırma motorlarının karşılaştırması

| Özellik          | Caveman / RTK / Yığılmış | MCP erişilebilirlik filtresi           |
| ---------------- | ------------------------ | -------------------------------------- |
| Hedef            | İstek istemleri / bağlam | MCP araç sonuçları                     |
| Tetikleyici      | Sıkıştırma modu ayarı    | `compression.mcpAccessibility.enabled` |
| Kapsam           | Tüm SSE mesajları        | Yalnızca araç sonuçları                |
| Ref bağlantıları | Geçerli değil            | Koşulsuz olarak korunur                |

---

## Sıkıştırma Kombinasyonları

Sıkıştırma kombinasyonları, yönlendirme kombinasyonlarına atanabilen adlandırılmış sıkıştırma profilleridir:

- `compression_combos`: modu, işlem hattını, RTK yapılandırmasını, dil yapılandırmasını ve varsayılan işaretini depolar
- `compression_combo_assignments`: bir sıkıştırma kombinasyonunu bir yönlendirme kombinasyonuyla eşler
- çalışma zamanı entegrasyonu, genel kombinasyon geçersiz kılmalarından önce atanmış bir sıkıştırma kombinasyonunu çözümler
- analizler `compression_combo_id` ve `engine` alanlarını içerir

Pano konumu: `Pano -> Bağlam ve Önbellek -> Sıkıştırma Kombinasyonları`.

## API Yüzeyi

| Rota                                   | Amaç                                                                   |
| -------------------------------------- | ---------------------------------------------------------------------- |
| `/api/settings/compression`            | Genel sıkıştırma ayarları (`mcpAccessibility` yapılandırmasını içerir) |
| `/api/compression/preview`             | Herhangi bir sıkıştırma modunu önizleme                                |
| `/api/compression/language-packs`      | Kullanılabilir Caveman dil paketlerini listeleme                       |
| `/api/context/caveman/config`          | Caveman ayarları için takma ad                                         |
| `/api/context/rtk/config`              | RTK varsayılanları ve ayarları                                         |
| `/api/context/rtk/filters`             | RTK filtre kataloğu                                                    |
| `/api/context/rtk/test`                | RTK önizleme/test uç noktası                                           |
| `/api/context/rtk/raw-output/[id]`     | Kimliği doğrulanmış, hassas bilgileri gizlenmiş ham çıktı kurtarma     |
| `/api/context/combos`                  | Sıkıştırma kombinasyonu CRUD işlemleri                                 |
| `/api/context/combos/[id]/assignments` | Yönlendirme kombinasyonu ataması CRUD işlemleri                        |
| `/api/context/analytics`               | Sıkıştırma analizleri için takma ad                                    |

Yönetim rotaları, yönetim kimlik doğrulaması veya API anahtarı politikası denetimleri gerektirir.

## MCP Araçları

Sıkıştırma, beş MCP aracı sunar:

| Araç                                | Kapsam              | Amaç                                        |
| ----------------------------------- | ------------------- | ------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Ayarlar, analizler, önbellek istatistikleri |
| `omniroute_compression_configure`   | `write:compression` | Genel ayarları güncelleme                   |
| `omniroute_set_compression_engine`  | `write:compression` | Modu ve isteğe bağlı işlem hattını ayarlama |
| `omniroute_list_compression_combos` | `read:compression`  | Sıkıştırma kombinasyonlarını listeleme      |
| `omniroute_compression_combo_stats` | `read:compression`  | Kombinasyon/motor analizlerini okuma        |

## Kapsam ve hariç tutmalar

**Yerleştirmeler hiçbir zaman sıkıştırılmaz.** `open-sse/handlers/embeddings.ts` hiçbir
sıkıştırma motorunu çağırmaz — istek/yanıt gövdeleri değiştirilmeden doğrudan yürütücüye
iletilir. Bu, şu anda yapısaldır (yerleştirmeler ve sohbet tamamlamaları birbirinden ayrı
işleyicilerdir), çalışma zamanı denetimi değildir; ancak bu, #8034 kapsamındaki vektör bozulması
endişesinin yerleştirme yolunda herhangi bir etki alanı olmadığı anlamına gelir.

**Model/uç nokta başına hariç tutma filtresi (#8034).** Sohbet tamamlamaları için bir operatör,
hiçbir zaman sıkıştırılmaması gereken model kimliklerini / `provider/model` hedeflerini
belirtebilir — bu, sıkıştırmanın daha sonra yerleştirmelere komşu bir yola daha yakın biçimde
bağlanması durumunda yararlı bir koruma önlemidir ve tam bayt düzeyindeki istemi önemli olan
her model için genel olarak kullanışlıdır (deterministik değerlendirmeler, önbelleğe duyarlı
önekler vb.).

- Ayarlar alanı: genel sıkıştırma yapılandırmasında `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`); mevcut `key_value` sıkıştırma ad alanı
  (`src/lib/db/compression.ts`) aracılığıyla kalıcılaştırılır — yeni tablo gerekmez.
- Pano sekmesi: **Pano → Sıkıştırma → Hariç Tutmalar**
  (`/dashboard/compression/exclusions`).
- Desen sözdizimi: `*` tek joker karakterdir. Bir desendeki diğer tüm düzenli ifade meta
  karakterleri eşleştirmeden önce kaçışlı hâle getirilir; dolayısıyla `gpt-5.6` yalnızca
  değişmez dizeyle eşleşir, hiçbir zaman `gpt-5x6` ile eşleşmez (ReDoS açısından güvenli,
  sınırlandırılmış, iç içe niceleyici içermez). Desenler, hem çıplak model kimliğine hem de
  `provider/model` bileşik değerine karşı büyük/küçük harfe duyarsız biçimde eşleştirilir —
  `gpt-5-6`, `openai/gpt-5-6` ve `openai/*` seçeneklerinin tümü çalışır; tek başına `*` ise
  her modeli hariç tutar.
- Eşleştirme: `open-sse/services/compression/exclusions.ts` içindeki
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`. `chatCore.ts`, hariç tutulan
  hedefi sıkıştırma ayarlarını çözümledikten hemen sonra, **herhangi bir motor çalışmadan önce**
  denetler ve eşleşmeyi, sıkıştırmanın genel olarak devre dışı bırakılmasıyla tamamen aynı
  şekilde ele alır — istek gövdesinin bayt düzeyinde özdeş olduğu kanıtlanabilir. Atlama,
  analizlerde görünürlük sağlamak için `writeCompressionSkip(..., "excluded")` aracılığıyla
  kaydedilir.
- Varsayılan (boş/mevcut olmayan liste): #8034 öncesi davranışla aynıdır — hiçbir şey hariç tutulmaz.

## Bilinen sınırlamalar

- **LLMLingua-2 (SLM), isteğe bağlı bağımlılıkların aynı konumda bulunmasını gerektirir.** Worker, üretim derlemesinde yalnızca `@atjsh/llmlingua-2` ve eş bağımlılıkları `dist/node_modules` içine aynı konumda yerleştirildiğinde çalışır (bkz. `scripts/build/colocateOptionals.mjs`, #4286). Bunlar olmadan motor, hata durumunda açık davranır (özgün metni döndürür). Worker çözümlemesi artık `import.meta.url` öğesine bağlı değildir (bağımsız pakette çalışmaz) — çalışma zamanı cwd / `argv[1]` temel alınır.
- **Caveman `de` / `fr` / `ja` dil paketleri kısmidir.** Bu paketler `context` + `filler` + `structural` kurallarını içerir ancak `dedup` / `ultra` paketlerini içermez; bu nedenle söz konusu dillerde `ultra` yoğunluğu `full` yoğunluğundan daha güçlü değildir (yalnızca kendi kurallarını kullanırlar — yabancı metinleri bozabilecek İngilizce `dedup`/`ultra` kurallarına örtük geri dönüş yoktur). `en` / `es` / `id` / `pt-BR` paketleri eksiksizdir. Kısmi paketler için `dedup.json` + `ultra.json` katkıları memnuniyetle karşılanır.
- **Yığınlanmış telemetri yalnızca sıkıştırma gerçekleştiren motorları listeler.** Motoru çalışmış ancak %0 tasarruf sağlamış bir yığınlanmış işlem hattı adımı `stats:null` döndürür ve bu nedenle `engineBreakdown` içinde görünmez — atlanmış bir adımdan ayırt edilemez. “Çalıştı, %0” ile “atlandı” durumlarını birbirinden ayırmak, döküm modelinde değişiklik gerektireceğinden ertelenmiştir.

## Doğrulama

Bu alana yönelik odaklanmış kontroller şunlardır:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
