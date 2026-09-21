# OmniRoute Auto-Combo Engine (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Kullanıcılar İçin**: Hızlı bir başlangıç mı arıyorsunuz? Basit açıklamalar ve örnekler için [Auto-Combo Kullanıcı Kılavuzu](../getting-started/AUTO-COMBO-GUIDE.md) belgesine bakın.

> Uyarlanabilir puanlama + sıfır yapılandırmalı otomatik yönlendirme ile kendi kendini yöneten model zincirleri

## Sıfır Yapılandırmalı Otomatik Yönlendirme (`auto/` öneki)

> **YENİ:** Combo oluşturmanız gerekmez. Herhangi bir istemcide doğrudan `auto/` önekini kullanın.

### Hızlı Örnekler

| Model Kimliği  | Varyant | Davranış                                                                  |
| -------------- | ------- | ------------------------------------------------------------------------- |
| `auto`         | default | Bağlı tüm sağlayıcılar, LKGP stratejisi, dengeli ağırlıklar               |
| `auto/coding`  | coding  | Kalite öncelikli ağırlıklar, kod üretimi için uygun                       |
| `auto/fast`    | fast    | Düşük gecikme ağırlıklı seçim                                             |
| `auto/cheap`   | cheap   | Maliyet için optimize edilmiş yönlendirme (önce en düşük maliyet)         |
| `auto/offline` | offline | En yüksek kota kullanılabilirliğine sahip sağlayıcıları tercih eder       |
| `auto/smart`   | smart   | Daha iyi model keşfi için kalite önceliği + daha yüksek keşif oranı (%10) |
| `auto/lkgp`    | lkgp    | Açık LKGP (`auto` varsayılanıyla aynı)                                    |
| `auto/chaos`   | chaos   | Dayanıklılık testi için hata enjeksiyonu ağırlıkları (kaos mühendisliği)  |

### Kategori × Katman Bileşimi (`auto/<category>:<tier>`)

OpenRouter tarzı sonekler, **ne tür bir rota** istendiğini (kategori) **nasıl optimize edileceğinden** (katman) ayırır; böylece bunları serbestçe birleştirebilirsiniz (#4235 Aşama B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategoriler** (aday havuzunu yeteneğe göre filtreler): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal`, görüntü işleme yeteneğine sahip modelleri korur; `reasoning`, akıl yürütme/düşünme modellerini korur.
- **Katmanlar** (puanlama ağırlıklarını / havuz filtresini seçer): `fast` (hızlı teslimat) · `cheap` (`floor` diğer adıyla, maliyet tasarrufu) · `reliable` (devre kesici sağlığı + gecikme kararlılığı) · `free` / `pro` (`classifyTier` aracılığıyla havuzu model katmanına göre filtreler — ücretsiz katman ile premium karşılaştırması).

| Örnek                  | Çözümlendiği sonuç                                                               |
| ---------------------- | -------------------------------------------------------------------------------- |
| `auto/coding:fast`     | kodlama havuzu, düşük gecikme ağırlıkları                                        |
| `auto/coding:cheap`    | kodlama havuzu, maliyet için optimize edilmiş (`auto/coding:floor` diğer adıyla) |
| `auto/reasoning:pro`   | yalnızca akıl yürütme/düşünme modelleri, premium katman                          |
| `auto/vision`          | görüntü işleme yeteneğine sahip modeller (katman yok → dengeli ağırlıklar)       |
| `auto/multimodal:free` | çok modlu modeller, yalnızca ücretsiz katman                                     |

Geçerli tüm `auto/<category>[:<tier>]` değerleri istek üzerine çözümlenir; özenle seçilmiş bir alt küme `/v1/models` içinde ve kontrol panelinde duyurulur (`open-sse/services/autoCombo/builtinCatalog.ts` içindeki `AUTO_SUFFIX_VARIANTS`). Filtreleme **hata durumunda açık** çalışır — bir kısıtlama bağlı modellerden hiçbiriyle eşleşmezse yönlendirmenin hiçbir zaman bozulmaması için tam havuz kullanılır. Temel puanlayıcı (`combo.ts`) değişmeden kalır; kategori/katman filtresi `buildAutoCandidates` içinde uygulanır.

> **Canlı model zekâsı:** `ARENA_ELO_SYNC_ENABLED` bayrağı açık olduğunda otomatik yönlendirme uygunluğu, canlı **Arena ELO** sıralamaları + **models.dev** katman verileriyle belirlenir (aksi takdirde statik uygunluk haritasına geri döner).

**Nasıl kullanılır:**

```bash
# OpenAI biçimini destekleyen herhangi bir IDE veya CLI aracı
Temel URL: http://localhost:20128/v1
API Anahtarı:  <your-endpoint-key>

# Kodunuzda/yapılandırmanızda modeli şu şekilde ayarlayın:
model: "auto"                 # dengeli varsayılan
model: "auto/coding"          # kodlama görevleri için en iyisi
model: "auto/fast"            # kullanılabilir en hızlı seçenek
model: "auto/cheap"           # token başına en ucuz seçenek
```

**Gerçekleşen işlemler:**

1. OmniRoute, `src/sse/handlers/chat.ts` içinde `auto/` önekini algılar
2. Veritabanındaki tüm **etkin sağlayıcı bağlantılarını** sorgular
3. Geçerli kimlik bilgilerine (API anahtarı veya OAuth token'ı) sahip olanları filtreler
4. Bağlantı başına modeli belirler (`connection.defaultModel` veya sağlayıcının ilk modeli)
5. Bellekte bir **sanal combo** oluşturur (DB'de saklanmaz)
6. Seçilen varyantın ağırlık profili + LKGP stratejisini kullanarak yönlendirme yapar

**Temel özellikler:**

- ✅ **Her zaman açık:** Geçiş anahtarı, combo oluşturma veya yapılandırma gerekmez
- ✅ **Dinamik:** Mevcut bağlı sağlayıcıları otomatik olarak yansıtır
- ✅ **Oturum bağlılığı:** LKGP, son başarılı sağlayıcıya öncelik verilmesini sağlar
- ✅ **Çoklu hesap farkındalığı:** Her sağlayıcı bağlantısı ayrı bir aday hâline gelir
- ✅ **DB yazma işlemi yok:** Sanal combo yalnızca istek süresince var olur, kalıcılık ek yükü sıfırdır

### Anahtar başına aday denetimi (#7819, Seviye 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = `auto/` sonrasındaki sonek veya
temel kanal için `auto` sabit değeri), mevcut dayanıklılık okumalarını yeniden kullanarak
(ham devre kesici `state` değerini hiçbir zaman kullanmadan) bir `auto/*` kanalının,
canlı erişilebilirlik bilgileriyle zenginleştirilmiş mevcut aday havuzunu listeleyen
**salt okunur** bir uç noktadır:

- sağlayıcı devre kesicisi — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- bağlantı bekleme süresi — çözümlenen `provider_connections` satırındaki
  `rateLimitedUntil` / `testStatus`
- model kilitleme — `isModelLocked(provider, connectionId, model)`

Her aday ayrıca bu API anahtarının `excluded` bayrağını taşır. Hariç tutmalar
API anahtarı başına (`auto_candidate_overrides` tablosu, `128` geçişi) saklanır —
OmniRoute, `users` tablosu bulunmayan tek kiracılı bir sistem olduğundan `apiKeyId`,
çağrı yapan taraf için mevcut en yakın gerçek kimliktir — ve saf, birim testlerinden
geçmiş `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`)
aracılığıyla `open-sse/services/autoCombo/virtualFactory.ts` içindeki aday havuzu
darboğazında uygulanır. Filtre **hata durumunda açık** çalışır: ayarlanmamış bir
apiKeyId/kanal veya DB arama hatası, her iki durumda da havuzu filtrelemeden bırakır;
böylece hiçbir geçersiz kılma yapılandırmamış bir operatör, yönlendirmeyi bu özellikten
önceki hâliyle bayt düzeyinde aynı görür.

**Takip sorununa ertelendi:** aday bazlı ağırlıklar + açık sıralama (Seviye 3
— mevcut ağırlıklı/öncelikli strateji yollarını besler) ve her `auto/*` kanalı için
belirli bir `combo.ts` stratejisinin sabitlenmesi (Seviye 4). Tek kiracılı model göz önüne
alındığında geçersiz kılmaların API anahtarı bazında mı kalacağı yoksa global mi olacağına
ilişkin açık soru için #7819 planına bakın.

**Arka planda:**

```txt
İstek: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts öneki algılar
   ↓
createVirtualAutoCombo('coding') → etkin bağlantılardan candidatePool
   ↓
handleComboChat (kalıcı kombinasyonlarla aynı motor)
   ↓
Otomatik puanlama, her istek için en iyi sağlayıcıyı/modeli seçer
```

**Uygulama dosyaları:**

| Dosya                                                     | Amaç                                                     |
| --------------------------------------------------------- | -------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Önek ayrıştırıcı (`parseAutoPrefix`)                     |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Sanal `AutoComboConfig` nesneleri oluşturur              |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Sağlayıcı kayıt defterini taklit etmek için test kancası |
| `src/sse/handlers/chat.ts`                                | Entegrasyon: auto öneki için kısa devre                  |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` sistem girdisi                   |

## Gerçek Bir Model Kimliğiyle Eşleşen Combo Adları

`name` değeri çıplak bir model kimliğiyle aynı olan bir combo (ör. adı
`gpt-5.5` olan bir combo), hata değil, **kasıtlı ve desteklenen bir kalıptır**:
bu, [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) içinde belgelenen
model kimliği başına sağlayıcı yedekleme mekanizmasıdır. Combo çözümlemesi,
çıplak model kimliği çözümlemesinden önce kontrol edildiğinden
(`src/sse/services/model.ts` içindeki `getComboForModel()`), çıplak
`gpt-5.5` kimliği için yapılan bir istek doğrudan tek bir sağlayıcıya gitmek
yerine combo'nun hedefleri (ör.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) üzerinden yönlendirilir —
bu, [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) için
oluşturulan yeniden yazmadan önce combo önceliğini yeniden kullanır ve
`tests/unit/responses-combo-resolution-3227.test.ts` ile
`tests/unit/combo-name-codex-responses-rewrite.test.ts` tarafından regresyon
testine tabi tutulur.

Gerçek bir model kimliğini gölgeleyen bir adla combo oluşturmak veya bir
combo'yu böyle bir adla yeniden adlandırmak **asla reddedilmez** — bunu yapmak,
belgelenmiş bu iş akışını bozar. Bunun yerine (#8530),
`POST /api/combos` ve `PUT /api/combos/[id]`, (yeni) ad gerçek bir model
kimliğiyle çakıştığında yanıta engelleyici olmayan bir `warning` alanı ekler:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Başlatma sırasında `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) ayrıca bir model kimliğini gölgeleyen mevcut
her combo'yu sıralayan tek satırlık bir `[STARTUP]` uyarısı kaydeder; böylece
bunu kasıtlı olarak değil (#6940 uyarınca) yanlışlıkla yapan operatörlere bir
sinyal sağlanır. Algılama yardımcısı
`src/lib/combos/modelNameCollision.ts` içinde bulunur.

## Bir İstemciden Özel Combo Çağırma

Kalıcı combo'lar (Ayarlar → Combo'lar) yalnızca istemci, `model` alanında
combo'nun **tam adını** gönderdiğinde kullanılır — combo adı için yaklaşık veya
kısmi eşleştirme yoktur ve `auto/` öneki kullanılmaz. Çözümleme sırası
(`src/sse/services/model.ts` içindeki `getComboForModel()`):

1. tam combo adı eşleşmesi (`model: "my-combo"`),
2. `combo/<name>` öneki (`model: "combo/my-combo"`),
3. model→combo glob eşlemeleri (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Yaygın iki sorun:

- **`auto`, combo'larınızı kullanmaz.** `auto`/`auto/*`, kendi sıfır
  yapılandırmalı aday havuzunu oluşturur ve yalnızca bir combo'nun adı tam
  olarak `auto` ise kalıcı combo'lara başvurur (önerilmez). Bir combo üzerinden
  yönlendirme yapmak için `auto` değil, combo'nun tam adını gönderin.
- **`openrouter/auto`, gerçek ve ücretli bir OpenRouter ürünüdür** ("Auto Best
  Available"); bir OmniRoute takma adı değildir. OpenRouter kayıt defterinin
  (`open-sse/config/providers/registry/openrouter/index.ts`) tek statik model
  girdisidir ve ayrıca faturalandırılır. Bunu `auto` havuzlarından hariç tutmak
  için Ayarlar → Yönlendirme → Ücretli modelleri gizle seçeneğini kullanın.

Burada belgelenen ilk karışıklık için
[#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) ve
[#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) bölümlerine bakın.

## Nasıl Çalışır (Kalıcı Otomatik Kombolar)

Otomatik Kombo Motoru, **16 faktörlü bir puanlama işlevi** (`open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS` içinde tanımlanmıştır) kullanarak her istek için en iyi sağlayıcıyı/modeli dinamik olarak seçer. Varsayılan ağırlıkların toplamı `1.0` değerindedir; özel ağırlıklar `normalizeScoringWeights()` tarafından yeniden normalize edilir. On altı faktörden ikisi — `cacheAffinity` ve `resetWindowAffinity` — varsayılan olarak `0` ağırlığına sahiptir; `reliability`, `DEFAULT_WEIGHTS` içinde `0`, genel paketlerde ise `0.03` ve `reliability-first` paketinde `0.04` ağırlığına sahiptir; `quality` ise paketlerde `0.02` (`quality-first` paketinde `0.03`) ağırlığına sahiptir: bunlar yine de her aday için hesaplanır ve `cacheAffinity`, puanın dışında istem önbelleği tekilleştirmesini denetler; dolayısıyla varsayılan ağırlığı sıfır olan faktörler varsayılan olarak seçime katkıda bulunmazken paketlerde katkıda bulunur.

![Otomatik Kombo 16 faktörlü puanlama](../diagrams/exported/auto-combo-scoring.svg)

> Kaynak: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (`npm run docs:render-diagrams` aracılığıyla yeniden oluşturun). Dosya adı geçmişten kalmadır; kaynak ve oluşturulan diyagram, `DEFAULT_WEIGHTS` içinde bildirilen 16 faktörün tamamını gösterir.

| Faktör                | Varsayılan Ağırlık | Açıklama                                                                                                                                                                                                                                                |
| :-------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quota`               | 0.1429             | Kalan kota / hız sınırı boşluğu [0..1]                                                                                                                                                                                                                  |
| `health`              | 0.1605             | Devre kesiciden alınan sağlık puanı (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                               |
| `costInv`             | 0.1429             | Tersine çevrilmiş **harmanlanmış** maliyet (%60 girdi + %40 çıktı token fiyatı, normalize edilmiş) — daha ucuz = daha yüksek puan                                                                                                                       |
| `latencyInv`          | 0.1143             | Havuza göre normalize edilmiş tersine çevrilmiş p95 gecikme — daha hızlı = daha yüksek puan                                                                                                                                                             |
| `taskFit`             | 0.0762             | Görev türü uygunluğu (kodlama, inceleme, planlama, analiz, hata ayıklama, dokümantasyon)                                                                                                                                                                |
| `stability`           | 0.0476             | Gecikme standart sapmasına dayalı varyans tabanlı kararlılık — yanıt süresi dalgalanan bir aday daha düşük puan alır                                                                                                                                    |
| `tierPriority`        | 0.0476             | Hesap katmanı önceliği — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                   |
| `tierAffinity`        | 0.0476             | Adayın katmanı ile manifest tarafından önerilen katman arasındaki yakınlık                                                                                                                                                                              |
| `specificityMatch`    | 0.0476             | İstek özgüllüğü (manifest ipucu) ile model katmanı arasındaki eşleşme                                                                                                                                                                                   |
| `contextAffinity`     | 0.0476             | İsteğin bağlam penceresi gereksinimi ile modelin bağlam penceresi arasındaki yakınlık                                                                                                                                                                   |
| `sessionAvailability` | 0.0476             | Bu oturum için aday bağlantının OAuth oturumu kullanılabilirliği (`getOAuthSessionAvailability()`; OAuth dışı bağlantılar 1.0 puan alır)                                                                                                                |
| `connectionDensity`   | 0.0476             | Yükü aynı sağlayıcının bağlantıları arasında dağıtır (yoğunlaşma karşıtı)                                                                                                                                                                               |
| `cacheAffinity`       | 0.00               | Bu isteğin istem önbelleği önekini hâlihazırda barındırma olasılığı en yüksek bağlantıya yönelik buluşma karması yakınlığı (`open-sse/services/combo/promptCacheAffinity.ts`); varsayılan olarak devre dışıdır (#8008)                                  |
| `resetWindowAffinity` | 0.00               | Kota sıfırlama penceresi elverişli olan bağlantılara yönelik tercih (varsayılan olarak devre dışıdır)                                                                                                                                                   |
| `quality`             | 0.03               | Yönlendirme olayı kalite izleyicisinden alınan, geri bildirime dayalı çıktı kalitesi sinyali; gözlemi olmayan adaylar nötr 0.5 değeri alır                                                                                                              |
| `reliability`         | 0.00               | On örneklik alt sınırın ardındaki 24 saatlik kullanım geçmişinden (aksi hâlde gerçek zamanlı metriklerden) elde edilen gözlemlenmiş başarı payı, `1 - failureRate`; gözlemi olmayan adaylar 1.0 olarak değerlendirilir. Varsayılan olarak devre dışıdır |

**Toplam:** `DEFAULT_WEIGHTS` içinde bildirildiği üzere `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`; kullanıcı tarafından yapılandırılan ağırlıklar, puanlamadan önce `normalizeScoringWeights()` tarafından bir dağılım hâline gelecek şekilde yeniden normalize edilir.

## Mod Paketleri

`open-sse/services/autoCombo/modePacks.ts` içinde önceden tanımlanmış 6 ağırlık profili bulunur. Her paket, seçimi tek bir hedefe yönlendirmek için varsayılan ağırlıkların tamamen yerini alır. Her paketin toplamı zaten `1.0`'dır (dört ondalık basamakla yazdırıldığında `0.9999`), dolayısıyla bir paket etkinken `normalizeScoringWeights()` işlevinin anlamlı şekilde düzelteceği bir şey yoktur — aşağıdaki değerler, yuvarlama payı dışında, puanlayıcının uyguladığı değerlerdir.

| Faktör                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Notlar:

- **Paketler `quality` ve `reliability` değerlerini içerir** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) ve ağırlık haritasının tamamının yerini alır (`weights = pack`, birleştirme yapılmaz). `DEFAULT_WEIGHTS`, `quality 0.03 / reliability 0` değerlerini içerir; `balanced`/`default` seçildiğinde bu varsayılanlar korunur, bir paket seçildiğinde ise yukarıdaki paket değerleri kullanılır. Soğuk bir havuzda (henüz gözlem olmadığından `quality 0.5` ve `reliability 1`) bu iki faktör genel bir paket altında `+0.04` (`0.03 + 0.01`), `quality-first` altında `+0.045` ve `reliability-first` altında `+0.05` ekler.
- `tierAffinity`, `specificityMatch` ve `resetWindowAffinity`, her pakette açıkça `0` olarak ayarlanmıştır.
- Her paketin öne çıkan yönleri:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (düşük gecikmeli, sağlıklı bağlantılar)
  - **cost-saver** → costInv 0.3324 (en ucuz token'lar kazanır)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03; tüm paketler arasındaki en yüksek değer (görev için en iyi ve tutarlı model)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (hızdan/maliyetten bağımsız olarak maksimum kapasite payı)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04; tüm paketler arasındaki en yüksek değer (en az sürpriz)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (hata enjeksiyonu profili)

### İstek Başına Denetimler (üstbilgiler) — #6023 / #6024 / #6025 / #3470

Bir `auto` kombinasyonu, kombinasyonun kayıtlı yapılandırması değiştirilmeden üç üstbilgi aracılığıyla **istek başına** yönlendirilebilir. Bunlar yalnızca `auto` stratejisine ve yalnızca bu üstbilgileri taşıyan isteğe uygulanır; üstbilgi olmadığında kombinasyonun kaydedilmiş `modePack`/`budgetCap`/`budgetFallback` değerleri kullanılır.

| Üstbilgi                      | Kabul Edilen Değerler                                                                                                                                                                      | Etki                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-OmniRoute-Mode`            | ön ayar takma adı (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) veya ham paket adı (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Bu istek için puanlama ağırlıklarını geçersiz kılar. `balanced`/`default`, varsayılan ağırlıkları zorunlu kılar (paket yoktur). Bilinmeyen değerler yok sayılır (yapılandırma korunur).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `X-OmniRoute-Budget`          | pozitif bir sayı (istek başına maksimum USD)                                                                                                                                               | Kesin maliyet üst sınırı: tahmini maliyeti bu sınırı aşan adaylar seçimden önce filtrelenir. **Tüm** adaylar sınırı aştığında ne olacağı, aşağıdaki `X-OmniRoute-Budget-Fallback` tarafından belirlenir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (varsayılan, takma adlar: `cheapest-viable`, `soft`) veya `strict` (takma adlar: `block`, `hard`)                                                                               | `cheapest`: sınırı hâlâ aşıyor olsa bile genel olarak en ucuz adaya geri döner (eski davranış). `strict`: seçim yapmayı reddeder — istek, sessizce bütçeyi aşmak yerine `HTTP 402` ile hemen başarısız olur. Bilinmeyen değerler yok sayılır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `X-OmniRoute-Effort`          | `auto` (diğer değerler ayrılmıştır)                                                                                                                                                        | Uyarlanabilir düşünme bütçesi: istek herhangi bir biçimde **hiçbir** akıl yürütme alanı (`reasoning_effort`, `reasoning`, `thinking`) içermediğinde ağ geçidi, belirlenimci istek yapısı sinyallerini (son kullanıcı mesajının uzunluğu, son kullanıcı mesajına kadarki bağlam boyutu, önceki araç sonuçları, araç döngüsü derinliği) kullanarak `auto` değerini `low`/`medium`/`high` olarak çözümler. Sinyaller geçerli turla sınırlandırılır — son kullanıcı mesajından sonraki her şey yok sayılır — böylece araç döngüsündeki her istek aynı düzeye çözümlenir (tur başına durumsuz sabitleme, oturum durumu yoktur ve yukarı akış istem önbelleği öneklerini bozacak döngü içi yükseltme yapılmaz). İstemci tarafından açıkça belirtilen bir akıl yürütme alanı her zaman önceliklidir. Yukarı akış yönlendirmesi OpenAI Chat Completions biçimine çözümlenen isteklerle sınırlıdır (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort`, OpenAI biçimli bir alandır; bu nedenle üstbilginin Claude veya Gemini hedefli bir istek üzerinde etkisi yoktur (bkz. `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# En hızlı profili zorunlu kıl, bu isteği $0.05 ile sınırla ve bütçeyi aşmak yerine kesin olarak engelle
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Çözümleme saf bir fonksiyondur (`open-sse/services/autoCombo/requestControls.ts`); çözümlenen
değerler, motorun mevcut `config.modePack` / `config.budgetCap` /
`config.budgetFallback` girdilerine aktarılır. Bir kombinasyonun depolanan `config.budgetFallback` ("strict" |
"cheapest") değeri kalıcı politikayı belirler; üstbilgi, tek bir istek için bunu geçersiz kılar.

## Tüm Yönlendirme Stratejileri

OmniRoute'un combo motoru **19 yönlendirme stratejisini** destekler (`src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES` içinde tanımlanmıştır). Auto Combo motorunun kendisi `auto` stratejisi altında sunulur; diğerleri kalıcı combo'lar için kullanılabilir.

| Strateji            | Açıklama                                                                                                                                                                                                                     |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Açık önceliğe sahip, ilk hedefe öncelik veren sıralı liste                                                                                                                                                                   |
| `weighted`          | Hedef başına ağırlığa göre ağırlıklı rastgele seçim                                                                                                                                                                          |
| `round-robin`       | Hedefler arasında sırayla döngü                                                                                                                                                                                              |
| `context-relay`     | Bağlamı hedefler arasında aktarır (uzun konuşmalar)                                                                                                                                                                          |
| `fill-first`        | Bir sonraki hedefe geçmeden önce her hedefin kotasını doldurur                                                                                                                                                               |
| `p2c`               | İki seçenekten güçlü olanı kullanan rastgele yük dengeleme                                                                                                                                                                   |
| `random`            | Tekdüze rastgele seçim                                                                                                                                                                                                       |
| `least-used`        | Mevcut yükü en düşük olan hedefi seçer                                                                                                                                                                                       |
| `cost-optimized`    | Katalog fiyatlandırmasına göre istek başına maliyeti en aza indirir                                                                                                                                                          |
| `reset-aware` ⭐    | Kota sıfırlanma zamanına göre önceliklendirir — kısa sıfırlanma pencereleri daha üst sırada yer alır                                                                                                                         |
| `reset-window`      | Kota penceresi en erken sıfırlanacak hedefleri tercih eder                                                                                                                                                                   |
| `headroom`          | En fazla kalan kota marjına sahip hedefi seçer                                                                                                                                                                               |
| `strict-random`     | Tekrarları tekilleştirmeden rastgele seçim yapar                                                                                                                                                                             |
| `auto`              | Auto Combo puanlamasını (16 faktörlü) kullanır — **önerilir**                                                                                                                                                                |
| `lkgp`              | Son Bilinen İyi Yol (son başarılı sağlayıcıya sabitlenir, ardından kurallara geri döner)                                                                                                                                     |
| `context-optimized` | Mevcut bağlam boyutuna en uygun hedefi seçer                                                                                                                                                                                 |
| `cache-optimized`   | Hedefleri istem önbelleği yakınlığına göre yeniden sıralar — bu isteğin önbelleğe alınmış önekini hâlihazırda barındırma olasılığı en yüksek bağlantı önce denenir (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Paralel olarak bir model paneline istek gönderir, ardından bir hakem aracılığıyla tek bir yanıt sentezler (aşağıya bakın)                                                                                                    |
| `pipeline`          | Hedefleri sırayla çalıştırır ve her adımın çıktısını bir sonraki adımın girdisine aktarır; yalnızca nihai yanıt döndürülür (#6396)                                                                                           |

⭐ = v3.8.0 sürümünde yeni · 🧬 = v3.8.36 sürümünde yeni

### `weighted` semantiği

`weighted`, bir eşitleyici değil, **istek başına orantılı rastgele çekiliştir**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`):

- Her istek, `weight / totalWeight` olasılığıyla **bir** adım seçer; kalan adımlar,
  söz konusu istek için geri dönüş zinciri olarak azalan ağırlığa göre sıralanır.
- Ağırlığı `0` olan (veya ağırlığı belirtilmemiş) bir adım, diğer herhangi bir adımın
  ağırlığı > 0 olduğu sürece **asla seçilmez** — yalnızca seçilen adım başarısız olduktan sonra geri dönüş seçeneği olarak kullanılabilir. Seçim ancak **tüm**
  ağırlıklar 0 olduğunda tekdüze hâle gelir.
- Tüm hedefleri kullanılamaz durumda olan adımlar — sağlayıcı devre kesicisi `OPEN`, bağlantı
  bekleme süresi, model kilitlemesi — çekiliş gerçekleşmeden önce seçimden çıkarılır
  (`open-sse/services/combo/targetResolution.ts`); dolayısıyla sağlıklı tek bir adım geçici olarak
  her isteği kazanabilir.
- `stickyWeightedLimit` (combo yapılandırması, varsayılan `1` = kapalı), yeniden çekiliş yapmadan önce seçilen adımı belirtilen sayıda
  ardışık başarı boyunca sabitler.

Kesin dönüşümlü kullanım için `round-robin` kullanın; `weighted` üzerindeki eşit ağırlıklar kesin değil,
istatistiksel denge sağlar.

## Fusion Stratejisi

`fusion`, tek bir hedef seçmeyen **tek** stratejidir. İstemi **tüm panel modellerine paralel olarak** dağıtır, ardından yapılandırılabilir bir **hakem modeli** tüm panel yanıtlarından tek bir nihai yanıt sentezler. Üst kaynak `decolua/9router`'dan
(OpenRouter'ın Fusion tasarımı) taşınmıştır; uygulama `open-sse/services/fusion.ts` dosyasındadır.

Nasıl çalışır:

0. **Araç içeren istekleri atlama** — açıkça `"none"` olarak ayarlanmamış bir `tool_choice` ile
   boş olmayan bir `tools` dizisi taşıyan istek, paneli tamamen atlar: `tools`/`tool_choice`
   değiştirilmeden doğrudan tek bir modele (yapılandırılmış hakeme veya `panel[0]`'a)
   yönlendirilir. Panel üyelerinin araç erişimi yoktur ve hakemin sentez yönergesi
   araç çağrısı üretimini caydırır; böylece ajan tabanlı/araç çağıran istemciler,
   sentezlenmiş düzyazı yerine gerçek bir araç çağrısı kararı alır (#6771).
1. **Dağıtım** (yalnızca araç içermeyen istekler) — istem, araçlar kaldırılmış ve akışsız
   olmaya zorlanmış şekilde tüm panel modellerine aynı anda gönderilir (hakemin sentezleme
   yapabilmesi için eksiksiz düzyazıya ihtiyacı vardır).
2. **Çoğunluk toleranslı toplama** — `minPanel` kadar yanıt ulaşır ulaşmaz, geride kalanlar
   için kısa bir tolerans zamanlayıcısı başlatılır; ardından toplanabilen yanıtlarla fusion
   işlemine devam edilir. Bu, en yavaş modelin gerçek süre üzerindeki cezasını sınırlar;
   ayrıca kesin bir zaman aşımı uygulanır.
3. **Hakem sentezi** — panel yanıtları anonimleştirilir (`Source 1`, `Source 2`, … — böylece
   hakem model markasını değil içeriği değerlendirir) ve fikir birliğini / çelişkileri /
   kısmi kapsamı / benzersiz içgörüleri / kör noktaları analiz edip ardından **tek** ve
   güvenilir bir yanıt yazan hakeme teslim edilir. Hakem çağrısı, istemcinin özgün
   `stream` bayrağını ve araçlarını korur; böylece akış ve sonraki aşamalardaki araç
   kullanımı çalışmaya devam eder.
4. **Zarif bozulma** — 0 panel yanıtı → `503`; tam olarak 1 yanıt → bu yanıt doğrudan
   döndürülür (birleştirilecek bir şey yoktur); tek modelli bir panel doğrudan yanıt verir.

Bir panel üyesi, başka bir combo'ya referans veren bir `combo-ref` adımı
(`{kind: "combo-ref", comboName: "..."}`) da olabilir — referans verilen combo'ya tam özyinelemeli
bir gönderim olarak **tek bir kara kutu panel sesi** şeklinde çözümlenir (o combo'nun kendi
hedeflerine dağıtım yapılmaz) ve diğer tüm combo-ref kullanan stratejilerin zaten kullandığı
aynı derinlik/döngü korumasından yararlanır (#6764).

### Yapılandırma

Combo'nun `config` blob'unda yapılandırılır (şema geçişi yoktur — mevcut
`combos` tablosunu yeniden kullanır):

| Alan                                     | Tür      | Varsayılan       | Amaç                                                                                                               |
| :--------------------------------------- | :------- | :--------------- | :----------------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | ilk panel modeli | Nihai yanıtı sentezleyen model                                                                                     |
| `config.fusionTuning.minPanel`           | `number` | `2`              | Tolerans zamanlayıcısı başlamadan önce gereken başarılı yanıt sayısı (`[2, panelSize]` aralığıyla sınırlandırılır) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`           | Çoğunluğa ulaşıldıktan sonra geride kalanların ne kadar bekleneceği                                                |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`          | Takılı kalan tek bir modelin isteği durduramaması için mutlak sınır                                                |

Varsayılanlar `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`) içinde bulunur.

### Örnek

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Ardından bunu diğer combo'lar gibi çağırın: `{"model":"fusion-panel","messages":[...]}`.

## Sanal Auto-Combo Fabrikası

Auto Combo motoru, önceden tanımlanmış combo'lar gerektirmez. Bunun yerine `open-sse/services/autoCombo/virtualFactory.ts`, adayları anlık olarak oluşturur:

1. `getProviderConnections({ isActive: true })` çağrısıyla tüm etkin bağlantıları alır
2. Geçerli kimlik bilgilerine sahip olanları filtreler (`hasUsableOAuthToken()` aracılığıyla API anahtarı veya süresi dolmamış OAuth belirteci)
3. Model kullanılabilirliği ve fiyatlandırma için `getProviderRegistry()` ile çapraz referans oluşturur
4. Her `(provider, model, connection)` demeti için bir `VirtualAutoComboCandidate` oluşturur
5. Yönlendirme hedefi olarak `connection.defaultModel` değerini (veya registry'deki ilk modeli) seçer
6. Her adayı 16 faktörlü `scorePool()` ve varyantın ağırlık paketiyle puanlar
7. Elde edilen bellek içi `AutoComboConfig` değerini `handleComboChat()` için döndürür — asla DB'ye kalıcı olarak yazılmaz

Bu, **`auto/*` etkinleştirilmiş yeni bir provider eklemenin aday havuzunu otomatik olarak genişlettiği** anlamına gelir — manuel combo düzenlemesi gerekmez. Sanal combo her istek için yeniden oluşturulur; dolayısıyla yeni eklenen veya yeniden sağlıklı duruma gelen bağlantılar hemen kullanıma alınır.

## Kendi Kendini İyileştirme

- **Geçici hariç tutma**: Puan < 0.2 → 5 dk. boyunca hariç tutulur (kademeli geri çekilme, en fazla 30 dk.)
- **Devre kesici farkındalığı**: OPEN → otomatik olarak hariç tutulur; HALF_OPEN → deneme istekleri
- **Olay modu**: >%50 OPEN → keşfi devre dışı bırakır, kararlılığı en üst düzeye çıkarır
- **Bekleme süresi sonrası kurtarma**: Hariç tutma sona erdikten sonra ilk istek, azaltılmış zaman aşımına sahip bir "deneme" isteğidir

## Bandit Keşfi

İsteklerin %5'i (yapılandırılabilir) keşif amacıyla rastgele provider'lara yönlendirilir. Olay modunda devre dışı bırakılır.

## API

**Özel bir `POST /api/combos/auto` endpoint'i yoktur** — Auto-Combo iki şekilde kullanılır:

1. **Sıfır yapılandırma (önerilir):** `model: "auto"` veya `model: "auto/<variant>"` içeren herhangi bir sohbet tamamlama isteği gönderin. Sanal fabrika combo'yu her istek için oluşturur — kalıcılık veya API çağrısı gerekmez.

2. **`strategy: "auto"` içeren kalıcı combo:** `POST /api/combos` aracılığıyla normal bir combo oluşturun ve `strategy: "auto"` ile birlikte `config.auto.weights` / `config.auto.candidatePool` değerlerini ayarlayın. Aynı puanlama motoru kullanılır; combo `combos` içinde saklanır ve ID ile yeniden kullanılabilir.

Keşif amacıyla `GET /api/combos/auto`, her varyantı çözümlenmiş aday havuzuyla birlikte ve aday havuzunun pencereleri arasındaki MAKSİMUM değerler olan `context_length` / `max_output_tokens` bilgileriyle listeler. İstemciler (ör. opencode eklentisi) `0` yerine bu değerleri bildirmelidir: sıfır bağlam, opencode'un otomatik sıkıştırmasını tamamen devre dışı bırakarak oturumların gateway'in geçmiş temizleme işlemi bağlamı yok edene kadar büyümesine izin verir. MAKSİMUM değerin bildirilmesi güvenlidir; çünkü auto-combo bağlam ön filtresi, aşırı büyük istekleri geniş pencereli adaylara yönlendirir.

```bash
# Sıfır yapılandırmayla kullanım (combo oluşturulmaz)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Normal combos endpoint'i aracılığıyla kalıcı auto combo
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto router stratejileri

Kalıcı `strategy: "auto"` combo'ları, `config.routerStrategy` (veya eski
`config.auto.routerStrategy`) değerini aşağıdakilerden biri olarak ayarlayabilir:

- `rules` — varsayılan ağırlıklı puanlama
- `score` — yapılandırılmış en yüksek ağırlıklı puanı seçer. Tam eşitliklerde yapılandırılmış
  aday sırası korunur; mevcut `explorationRate`, tam sıralanmış havuzdan örnekleme yapar.
- `cost` / `eco` — en ucuz sağlıklı provider
- `latency` / `fast` — güvenilirlik cezasıyla birlikte en düşük p95 gecikmesi
- `sla-aware` / `sla` — p95 gecikmesi, hata oranı ve isteğe bağlı
  maliyet SLO'larını karşılayan adayları tercih eder
- `lkgp` — önce son bilinen iyi provider

### Router stratejilerinin ayrıntıları

Auto-combo motoru, `config.routerStrategy` (veya eski `config.auto.routerStrategy`)
aracılığıyla değiştirebileceğiniz, takılabilir 6 **RouterStrategy** uygulaması sunar.
Her strateji; bir `RoutingContext` (görev türü, araç/görüntü ipuçları, belirteç tahmini,
isteğe bağlı SLA politikası, isteğe bağlı son bilinen iyi provider) verildiğinde aday
havuzundan bir provider seçer.

#### 1. `rules` (varsayılan) — 16 faktörlü ağırlıklı puanlama

Mevcut puanlama motorunu sarmalar. `OPEN` durumundaki devre kesici
adaylarını filtreler, ardından geçerli görev türü ve `getTaskFitness()` ile `scorePool()`
çalıştırarak en yüksek puanlı provider'ı seçer.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Ne zaman kullanılmalı**: Varsayılan seçenektir. Tüm sinyaller arasında dengeli bir ödünleşim istediğinizde kullanın.

**Takma ad**: `rules` (takma adı yoktur)

---

#### 2. `cost` / `eco` — en ucuz sağlıklı provider

Aday havuzunu `costPer1MTokens` değerine göre (artan sırada) sıralar ve en ucuz olanı seçer.
Önce `OPEN` durumundaki adayları filtreler.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Ne zaman kullanılmalı**: Maliyete duyarlı iş yükleri, toplu işleme veya arka plan işleri için.

**Takma adlar**: `cost`, `eco`

---

#### 3. `latency` / `fast` — güvenilirlik cezasıyla birlikte en düşük p95 gecikmesi

`p95LatencyMs + (errorRate * 1000)` değerine göre sıralar. Hata oranı cezası, nominal gecikmeleri düşük olsa bile güvenilir olmayan sağlayıcıların daha alt sıralarda yer almasını sağlar.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Ne zaman kullanılmalı**: Gerçek zamanlı sohbet, otomatik tamamlama veya etkileşimli kodlama asistanları gibi gecikmeye duyarlı iş yüklerinde.

**Takma adlar**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — gecikme/hata/maliyet SLO uyumluluğu

Her adayı, yapılandırılmış SLO politikasını ne kadar iyi karşıladığına göre puanlar:

| Faktör           | Ağırlık | Formül                                                  |
| ---------------- | ------- | ------------------------------------------------------- |
| Gecikme puanı    | 35%     | `threshold / max(value, ε)`                             |
| Hata puanı       | 35%     | `threshold / max(value, ε)`                             |
| Sağlık puanı     | 15%     | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)       |
| Maliyet puanı    | 10%     | `threshold / max(value, ε)` veya ters normalize edilmiş |
| Kararlılık puanı | 5%      | ters normalize edilmiş gecikme standart sapması         |

`hardConstraints: true` olduğunda adaylar öncelikle **ihlal puanına** (herhangi bir SLO'yu ne kadar aştıklarına), ardından bileşik puana göre sıralanır. Aksi takdirde yalnızca bileşik puan kullanılır.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... her adayı şu politikaya göre puanlar: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA alanları** (birleşik yapılandırmada ayarlanır):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Ne zaman kullanılmalı**: Katı gecikme, hata oranı veya maliyet bütçelerine sahip üretim iş yüklerinde.

**Takma adlar**: `sla-aware`, `sla`

---

#### 5. `lkgp` — önce bilinen son iyi sağlayıcı

Önce **bilinen son iyi sağlayıcıyı** (ayarlanmışsa) dener, ardından `rules` stratejisine geri döner. Oturum kalıcılığı için kullanışlıdır — bir konuşmadaki takip isteklerini aynı sağlayıcı işler.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // rules stratejisine geri dön
    return getStrategy("rules").select(pool, context);
  }
}
```

**Ne zaman kullanılmalı**: Takip isteklerini aynı sağlayıcının işlemesini istediğiniz çok turlu konuşmalarda (ör. önbelleğe alma, bağlam sürekliliği veya fiyatlandırma tutarlılığı için).

**Takma ad**: `lkgp` (başka takma adı yoktur)

---

### Özel yönlendirici stratejileri

Genel API aracılığıyla kendi `RouterStrategy` uygulamanızı kaydedebilirsiniz:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Yönlendirme mantığınız buraya gelir
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Ardından bunu kullanın:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Yönlendirici stratejisi seçim kılavuzu

| Kullanım senaryosu       | Strateji    | Neden                                      |
| ------------------------ | ----------- | ------------------------------------------ |
| Dengeli iş yükü          | `rules`     | Varsayılan — tüm faktörleri dikkate alır   |
| Maliyeti en aza indirme  | `cost`      | Her zaman en ucuz olanı seçer              |
| Gecikmeyi en aza indirme | `latency`   | En hızlı güvenilir sağlayıcıyı seçer       |
| Katı SLO'lar             | `sla-aware` | p95/hata/maliyet eşiklerine göre filtreler |
| Çok turlu sohbet         | `lkgp`      | Oturum kalıcılığı                          |

SLA uyumlu alanlar:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Görev Uygunluğu

30'dan fazla model, 6 görev türünde (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`) puanlanmıştır. Joker karakter kalıplarını destekler (ör. `*-coder` → yüksek kodlama puanı).

## Otomatik Varyantların Özeti

Temel `auto` (varsayılan) ile `autoPrefix.ts` içinde bildirilen 6 `AutoVariant` değeri dahil olmak üzere **çağrılabilir 7 model kimliği** vardır:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` kendi başına 6 değeri listeler; 7. seçenek "varyant yok" seçeneğidir — temel `auto` — ve `parseAutoPrefix()` tarafından `variant: undefined` olarak işlenir.)

## Katmanların Auto-Combo'ya uyumu

16 faktörlü puanlama işlevi (`open-sse/services/autoCombo/scoring.ts`), katman
üyeliğini iki sinyal olarak değerlendirir: `tierPriority` (0.0476) ve `tierAffinity` (0.0476). Tam
`DEFAULT_WEIGHTS` kümesi için yukarıdaki standart [puanlama faktörleri tablosuna](#how-it-works-persisted-auto-combos) bakın — paket başına geçersiz kılmalar (ship-fast/cost-saver/quality-first/
offline-friendly), "Paket başına ağırlık profilleri" tablosunda listelenmiştir.

Katman tek başına Tier 1'in önce gelmesini **zorunlu kılmaz** — Tier 1 gecikme süresi kötüyse veya
maliyet-kalite dengesi ideal değilse Tier 2 kazanır. Katman sıralamasını zorunlu kılmak için combo
stratejisi olarak `priority` kullanın ve sağlayıcıları katmana göre sıralayın.

Tier 1'i (abonelik) güçlü biçimde tercih etmek için `tierPriority` ağırlığını artırın:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Katman tanımları ve sağlayıcı sınıflandırması için `docs/marketing/TIERS.md` dosyasına bakın.

## Test ve Kapsam

### Deterministik yönlendirme-karar matrisi (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts`, gerçek combo işlem hattı ve sahte bir üst hizmet
üzerinden 19 genel stratejinin tamamının uçtan uca yönlendirme **kararını** doğrular.
Kapsam şunları içerir:

- 19 `ROUTING_STRATEGY_VALUES` stratejisinin tamamı (ordered, weighted, cost, context, fusion, …).
- `quota-share` (dahili) uçtan uca: gerçek `selectQuotaShareTarget` bağlantı noktası üzerinden DRR adaleti + doygunluk durumunda önceliğin düşürülmesi (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Her hedef sayısı genelinde `context-relay` evrensel devir kapsamı.

Bu paket, deterministik olması ve canlı kimlik bilgileri gerektirmemesi için CI'da (`test:integration` işi)
`--test-concurrency=1` ve `--test-force-exit` ile çalıştırılır.

### Koşullu canlı smoke testi (CI'da DEĞİL — gerçek sağlayıcılar)

| Komut                                  | Ne yapar                                                                                                 |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | `RUN_COMBO_LIVE=1` ile işlem içi gerçek yönlendirme; canlı bir OmniRoute DB'sinin anlık görüntüsünü alır |
| `npm run test:combo:live:vps`          | Canlı bir OmniRoute sunucusuna HTTP çağrıları yapar (`COMBO_LIVE_BASE_URL` değerini ayarlayın)           |
| `npm run test:combo:live:vps:failover` | Aynı işlemi kasıtlı yük devretme senaryolarıyla gerçekleştirir                                           |

Bu smoke testleri gerçek bağlantı yolunu (combo → sağlayıcı → tamamlama) çalıştırır. Canlı kimlik
bilgileri ve VPS erişimi gerektirdikleri için kasıtlı olarak CI kapsamı dışında tutulurlar.

---

## Dosyalar

| Dosya                                                     | Amaç                                                                                                                         |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 faktörlü puanlama işlevi, `DEFAULT_WEIGHTS`, havuz normalizasyonu                                                         |
| `open-sse/services/autoCombo/taskFitness.ts`              | Model × görev uygunluğu araması                                                                                              |
| `open-sse/services/autoCombo/engine.ts`                   | Seçim mantığı, bandit, bütçe üst sınırı                                                                                      |
| `open-sse/services/autoCombo/selfHealing.ts`              | Hariç tutma, problar, olay modu                                                                                              |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 ağırlık profili (hızlı-gönderim, maliyet-tasarrufu, kalite-öncelikli, çevrimdışı-dostu, güvenilirlik-öncelikli, kaos-modu) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` ön ek ayrıştırıcısı + 6 varyant                                                                                      |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Canlı bağlantılardan bellek içi `AutoComboConfig` oluşturur                                                                  |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Sağlayıcı kayıt defterini taklit etmek için test kancası                                                                     |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strateji)                                                                                      |
| `src/sse/handlers/chat.ts`                                | Entegrasyon: auto-prefix kısa devresi                                                                                        |
