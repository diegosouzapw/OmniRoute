# Reasoning Routing (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Akıl yürütme yönlendirme kuralları, mevcut model ve combo yönlendirmesini genişletir. Etkin hiçbir kural eşleşmediğinde mevcut düşünme, son ek, bağlantı varsayılanı ve sağlayıcı çevirisi davranışı değişmeden kalır.

## Yönetim

Kural yönetimine **Ayarlar → Global Yönlendirme** altından erişilebilir. API anahtarı düzenleyicisi, seçilen anahtara göre filtrelenmiş aynı yönetim arayüzünü sunar.

Yönetim API'si şu rotalar üzerinden kullanıma sunulur:

- `/api/settings/reasoning-routing-rules` adresinde `GET` ve `POST`
- `/api/settings/reasoning-routing-rules/[id]` adresinde `GET`, `PATCH` ve `DELETE`
- `/api/settings/reasoning-routing-rules/simulate` adresinde `POST`

Tüm rotalar `requireManagementAuth` kullanır. Girdiler, `src/shared/validation/schemas/reasoningRouting.ts` içindeki şemalarla doğrulanır. Simülatör hiçbir zaman yukarı akış çağrısı yapmaz.

## Kural Çözümleme

Erken değerlendirme tam olarak bir kural seçer. Kapsamlar şu sırayla kontrol edilir:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Bir kapsam içinde önce daha yüksek `priority` değerine sahip olan kazanır; ardından glob kalıbına kıyasla tam model eşleşmesi, sonrasında ise kararlı `createdAt` ve `id` sıralaması dikkate alınır. `requestTags` yalnızca `metadata.tags` alanından okunur ve `any` ya da `all` eşleştirmesini destekler.

Bir `connection` kuralı, yalnızca hiçbir erken kural kazanmadığında ve somut bir sağlayıcı bağlantısı zaten seçilmiş olduğunda değerlendirilir. Yalnızca eforu ve bütçeyi değiştirebilir.

## Efor ve Bütçe

`sourceEffort`; `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` ve `ultra` değerlerini kabul eder. `missing`, isteğin ne ayrık bir efor ne de bir düşünme anahtarı veya düşünme bütçesi içerdiği anlamına gelir. Bu nedenle yalnızca bütçe sinyali, sadece `any` tarafından eşleştirilir.

`effortMode` üç varyanta sahiptir:

- `inherit`, modelin veya combo'nun değişmesine yine de izin verirken istemci eforunu korur.
- `default`, yalnızca açık bir akıl yürütme sinyali mevcut olmadığında `targetEffort` değerini ayarlar.
- `force`, ayrık eforu `targetEffort` ile değiştirir.

Bundan bağımsız olarak `budgetAction`; `preserve`, `remove` veya `set` olabilir. `none` ile birlikte kullanılan `force`, tanınan tüm efor ve bütçe alanlarını kaldırır. `none` ile `set` kombinasyonu geçersizdir.

Uyumsuz olduğu bilinen modelleri hedefleyen istekler, yukarı akış çağrısından önce reddedilir. Combo hedeflerinde uyumsuz girdiler kaldırılır; hiçbiri kalmazsa istek `400` durum koduyla sonuçlanır. Bilinmeyen yetenek verileri bir uyarı üretir ve kuralı etkin bırakır.

## Güvenlik ve Aktarımlar

Kaynak ve hedef model ya da kaynak ve hedef combo, mevcut API anahtarı politikasına tabi olmaya devam eder. Bir akıl yürütme kuralı model, combo veya kota izinlerini hiçbir zaman genişletmez.

Motor; Chat Completions, Responses, Anthropic Messages ve dahili Codex WebSocket yoluna entegre edilmiştir. WebSocket yolu yalnızca Codex hedef modellerini kabul eder; combo hedefleri burada yürütülemez. Kural kararı, gizli bilgiler olmadan mevcut rota izine kaydedilir.

## Kalıcılık

`src/lib/db/migrations/126_reasoning_routing_rules.sql` migrasyonu, `reasoning_routing_rules` tablosunu oluşturur. Kurallar; depolanan API anahtarlarına, combo'lara ve sağlayıcı bağlantılarına referans verir. Silme işlemleri ilişkili kuralları temizler. `src/lib/db/reasoningRoutingRules.ts` içindeki veritabanı erişim katmanı, istek yolu için geçersiz kılınabilir bir önbellek tutar.

Kurallar; SQLite yedeklerine, tam veritabanı dışa aktarımına ve yapılandırma eşitleme paketine dahil edilir. `reconcileReasoningRulesForSync`, eksik referanslara sahip içe aktarılmış kuralları devre dışı bırakır ve bu çakışmaları raporlar.
