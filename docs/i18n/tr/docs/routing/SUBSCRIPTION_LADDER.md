# Subscription-first routing (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> İki yeni `auto/*` kimliği — `auto/subscription` ve `auto/thrifty`. Her ikisi de talep edilerek etkinleştirilir:
> çağıran taraf kimliği adıyla istemediği sürece hiçbir şey bunlar üzerinden yönlendirilmez ve
> mevcut hiçbir havuz, strateji veya varsayılan değişmez.

## Bunun var olma nedeni

OmniRoute hâlihazırda maliyetle ilgili iki soruyu yanıtlıyor ancak bunların hiçbiri çoğu operatörün sorduğu soru değil.

| Mevcut mekanizma                                         | Yanıtladığı soru                            |
| -------------------------------------------------------- | ------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "bu model katalogda ücretsiz mi?"           |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "bu bağlantı benden hiç ücret alabilir mi?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "bu bağlantı sınırına yakın mı?"            |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "harcamayı sınırla, en ucuza geç"           |

Yalnızca ücretsiz seçeneklere yönelik her mekanizma **güvenli biçimde başarısız olur** — tükenmiş bir ücretsiz havuz, ücretli bir seçeneğe geçiş değil, boş bir havuz anlamına gelir — ve ücretli taraftaki her mekanizma katmandan bağımsızdır. Hiçbiri şu soruyu yanıtlamaz:

> "Zaten ücretini ödediğim kotayı kullan. Kota tükendiğinde ya dur ya da en ucuz ücretli seçenekler
> üzerinden her seferinde bir basamak yüksel — ve kota sıfırlandığı anda geri dön."

## Faturalandırma modelin değil, bağlantının bir özelliğidir

`classifyTier()` (`open-sse/services/tierResolver.ts`), `(provider, model)` ikilisine göre anahtarlama yapar ve katalog fiyatlandırmasından `free | cheap | premium` değerini döndürür. Ancak bir isteğin ek maliyet doğurup doğurmadığı, **hangi bağlantının bu isteği karşıladığına** bağlıdır: aynı model, bir Claude Code OAuth bağlantısı üzerinden plana dâhilken API anahtarı bağlantısı üzerinden token başına faturalandırılır.

`provider_connections.auth_type` her iki yönde de güvenilir bir gösterge değildir — ölçümlü OAuth bağlantıları da plana dâhil API anahtarı bağlantıları da mevcuttur (bir Copilot kullanıcı lisansı token'ı, ölçümlü bir API anahtarı değildir). Bu nedenle faturalandırma sınıfı, her sağlayıcının yayımlanmış koşullarına göre elle ayarlanan **özenle düzenlenmiş bir katalogdan**, `open-sse/config/connectionBillingCatalog.ts`, gelir — bu, `FreeModelBudget.hardStopGuaranteed` tarafından ücretsiz modeller için zaten oluşturulmuş olan kalıbın aynısıdır.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Çözümleme sırası (`autoCombo/connectionBilling.ts`): sentetik kimlik doğrulamasız sentinel →
`keyless`; sağlayıcıyla **ve** `authType` ile eşleşen bir katalog girdisi; sağlayıcı genelindeki bir girdi;
aksi takdirde `unknown`. **Kataloglanmamış olan ücretsiz değildir** — `unknown` her yerde `metered`
olarak değerlendirilir; böylece yarın eklenen bir sağlayıcı abonelik basamağının dışında başlar ve
bilinçli olarak kataloğa eklenmesi gerekir.

## Basamak modeli

Yükseltme sırasına göre beş basamak. Bunlar yalnızca fiyat bakımından farklı değildir — her birinin **kendine özgü**
bir tükenme sinyali vardır; bu nedenle bu yalnızca bir sıralama değildir.

| #   | Basamak        | Üyelik                                           | Tükenme koşulu                       |
| --- | -------------- | ------------------------------------------------ | ------------------------------------ |
| 0   | `subscription` | özenle düzenlenmiş `billing: "subscription"`     | kota penceresi eşikte/eşiğin altında |
| 1   | `keyless`      | sentetik kimlik doğrulamasız yol                 | bağlantı bekleme süresi / kesici     |
| 2   | `free`         | ölçümlü bağlantı, `classifyTier() === "free"`    | ücretsiz kullanım hakkı tükendiğinde |
| 3   | `cheap`        | ölçümlü bağlantı, `classifyTier() === "cheap"`   | basamak başına bütçe tükendiğinde    |
| 4   | `premium`      | ölçümlü bağlantı, `classifyTier() === "premium"` | basamak başına bütçe tükendiğinde    |

0-2. basamaklar, gözlemlenebilen ve zaten izlenen **kota** üzerinden tükenir. 3-4. basamakların kotası yoktur — ücretli bir bağlantı süresiz olarak hizmet verir — dolayısıyla bunlar için tek makul tükenme sinyali, basamak başına bir **bütçedir**. Böyle bir bütçe olmadan, "ucuz seçenek tükendiğinde yükselt" davranışını tetikleyecek hiçbir şey yoktur.

## `auto/subscription` — kapalı başarısızlık

Havuz = yalnızca 0. basamak; kullanım aşımı belgelenmiş bir `hard-stop` olan ve her birinin kota payı bulunduğu canlı olarak doğrulanmış bağlantılarla sınırlıdır. Belirsiz olan her şey hariç tutulur: düzenlenmemiş bir sağlayıcı, doğrulanamayan bir kota okuması, güncelliğini yitirmiş bir okuma veya ücretli kullanıma sayaçlanan bir aşım.

Boş havuz bir kusur değil, **amaçlanan** sonuçtur — çağıranın mevcut boş havuz yolu, bunu sessiz ve ücretlendirilebilir bir geri dönüş yerine açık bir hataya dönüştürür. Bu kimliğin verdiği sözün tamamı budur.

`keyless` kasıtlı olarak **uygun sayılmaz**: bu gruplandırma "ödeme yaptığım plan" anlamına gelir; dolayısıyla kimlik doğrulamasız bir arka uç buraya ait değildir. Bunun için `auto/thrifty` (veya `auto/best-free`) kullanın.

### Bağlantı güvenliği

Bir aday her zaman tek bir bağlantıya bağlı değildir — mantıksal bir aday, `allowedConnectionIds` izin listesi taşır ve gerçekten kullanılacak hesap daha sonra gönderim sırasında `open-sse/services/combo/autoStrategy.ts` tarafından seçilir. Bu nedenle her iki gruplandırma da **her bağlantıyı ayrı ayrı** doğrular ve `allowedConnectionIds` değerini yalnızca uygun kalan alt kümeyi içerecek şekilde yeniden yazar — hiçbir zaman özgün listenin tamamını veya rastgele seçilmiş tek bir üyeyi kullanmaz. `autoStrategy.ts` bu diziyi zaten katı bir izin listesi olarak uyguladığından, dizinin burada yeniden yazılması "doğrulanmış" ve "gerçekte kullanılan" kümelerini yapısı gereği aynı hâle getirir. Bu, [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) ile aynı değişmez ve aynı gerekçedir.

## `auto/thrifty` — her seferinde bir basamak yükselme

Havuz = tüm basamaklar; basamak indeksine göre sıralanır ve kotası tükenmiş adaylar devre dışı bırakılır. `auto` motoru uygun kalan havuz **içinde** puanlama yapmaya devam eder: merdiven hangi basamakların devrede olduğunu, puanlama ise bunların içinde hangi adayın kazanacağını belirler. Bir basamak içindeki sıralama kararlıdır; dolayısıyla puanlayıcının kendi sıralaması bu katman tarafından hiçbir zaman yeniden düzenlenmez.

Bu, yeni bir gönderici değil, bir sıralama + geçitleme katmanıdır: `combo.ts` içindeki spekülatif döngü hedefleri zaten sırayla dolaşır ve başarısızlık durumunda sonrakine geçer; bu nedenle ön kontrolün yakalayamadığı bir çalışma zamanı tükenmesi, aynı istek içinde yine bir sonraki basamağa yükselir.

`auto/subscription` kapalı başarısızlık sergilerken `auto/thrifty` **açık** başarısızlık sergiler: kullanılabilir bir kota okuması bulunmayan, plana dâhil bir bağlantı yine de önce denenir. Bunu denemenin maliyeti yoktur ve bağlantının tükenmiş olduğu anlaşılırsa sonraki basamağa geçiş zaten gerçekleşir — oysa denemeyi reddetmek, telemetri eksik olduğunda isteği ücretli bir basamağa gönderirdi; bu da gruplandırmanın önlemek için var olduğu sonucun ta kendisidir.

## Sıfırlamadan sonra plana dönüş

Yönlendirmenin 0. basamağa dönmesinden önce birbirinden bağımsız üç şeyin süresinin dolması gerekir. Bunlardan yalnızca birini düzeltmek, plan yeniden dolduktan çok sonra bile merdivenin ücretli basamaklarda takılı kalmasına neden olur.

1. **Kota durumu önbelleği** — `freeAccessQuota.ts`, her `(provider, connection)` çifti için 180s TTL ile önbelleğe alma yapar. Kendi `resetAt` zamanı zaten geçmiş olan önbellek girdisi artık mevcut olmayan bir pencereyi tanımlar; bu nedenle yaşı ne olursa olsun artık güncelliğini yitirmiş kabul edilir ve yenileme zorlanır. Bu yapılmazsa gece yarısında yeniden dolan bir plan, TTL süresi dolana kadar tükenmiş olarak okunmaya devam eder.
2. **Merdivenin kendi durumu** — tasarım gereği böyle bir durum yoktur. Basamak uygunluğu, her havuz oluşturulduğunda canlı kota durumundan yeniden hesaplanır; sıfırlamadan daha uzun süre yaşayarak yönlendirmeyi kilitleyebilecek kalıcı bir "şu anda 3. basamakta" kaydı yoktur.
3. **Bağlantı bekleme süresi** — tükenmeye neden olan 429, `rateLimitedUntil` değerini üstel geri çekilmeye göre ayarlar; bu da bir plan bağlantısı için gerçek sıfırlama zamanını aşabilir. `clampCooldownToReset()` (`subscriptionLadder.ts`), bekleme süresini yukarı akışın kendi sıfırlama anına kadar kısaltır ve hiçbir zaman uzatamaz. **Uygulanmış ve test edilmiştir ancak henüz bağlanmamıştır**: kota önbelleği `src/sse/services/auth.ts` içinde herhangi bir bekleme süresi yazılmadan _önce_ geçersiz kılındığından, `resetAt` bu işlevde daha erken yakalanmalıdır — bu, dayanıklılığın kritik yolunda yer alan ve ayrı bir incelemeli PR kapsamında yapılması gereken bir değişikliktir. O zamana kadar yeniden giriş, bağlantı bekleme süresinin dolmasını bekler (sağlayıcı bunları gönderdiğinde yukarı akış `Retry-After` ipuçlarını zaten tercih eder).

### Salınım önleme

Yeni sıfırlanmış bir basamak yalnızca `reentryMinRemainingPercent` değerinin (varsayılan 5) üzerinde yeniden kabul edilirken, hâlihazırda devrede olan bir bağlantının yalnızca `exitCutoffPercent` değerinin (varsayılan 2; `quotaPreflight.defaultThresholdPercent` ile eşleşir) üzerinde kalması gerekir. Aradaki fark histerezis bandıdır — bu bant olmadan eşik civarında seyreden bir bağlantı, ardışık isteklerde basamaklar arasında gidip gelir.

## Yapılandırma

Yalnızca ince ayar içindir. Bilinçli olarak bir `enabled` bayrağı **yoktur**: bunları kapatabilen bir anahtar,
`auto/subscription` değerinin, ücretli modeller dâhil olmak üzere tüm havuzu, aksini vadeden bir
ad altında sessizce sunmasına neden olurdu.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0, bir basamağı tamamen devre dışı bırakır
  },
}
```

Harcama çözümleyicisi bağlanana kadar bütçe denetimi etkisizdir: muhasebe verisi mevcut olmadığında ücretli
bir basamak sıralamaya alınır ancak hiçbir zaman bütçe tarafından engellenmez. v3.8.51 itibarıyla `rungBudgetUsd` ayarı şema
tarafından kabul edilmekte ancak henüz UYGULANMAMAKTADIR — bunu etkin bir harcama sınırı olarak değil, ayrılmış bir yapılandırma olarak değerlendirin. Basamak sıralaması, kota tabanlı tükenme ve sıfırlama sonrası yeniden giriş özelliklerinin tümü
bu ayar olmadan çalışır.

## Bileşim

`subscription` ve `thrifty`, `AutoTier` değerleridir; dolayısıyla her kategoriyle birleştirilebilirler:
`auto/coding:thrifty`, `auto/reasoning:subscription` vb. İki düz kimlik
(`auto/subscription`, `auto/thrifty`), `/v1/models` içinde ve kontrol panelinde listelenir.

Her iki kimlik de ücretli katmana ait değildir; bu nedenle `isPaidTierAutoId()`, ikisi için de
`false` döndürür ve `auto/subscription`, `hidePaidModels` sonrasında görünür kalır.

## Kodun bulunduğu yerler

| İlgili konu                                 | Dosya                                               |
| ------------------------------------------- | --------------------------------------------------- |
| Düzenlenmiş faturalandırma bilgileri        | `open-sse/config/connectionBillingCatalog.ts`       |
| Sınıflandırıcı                              | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Basamaklar, her iki gruplama, yeniden giriş | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Aday havuzuna bağlama                       | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Sıfırlamayı dikkate alan önbellek bayatlığı | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Katman yüzeyi                               | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Listelenen kimlikler                        | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testler                                     | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
