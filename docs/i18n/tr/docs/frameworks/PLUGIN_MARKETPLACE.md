# Plugin Marketplace (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Doğruluk kaynağı:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` ve
> `src/app/(dashboard)/dashboard/plugins/`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, WordPress tarzı bir eklenti sistemiyle birlikte gelir. Eklentiler;
her biri bir `plugin.json` manifesti ve bir giriş dosyası içeren, kendi kendine
yeterli dizinlerdir. İstek işlem hattına (`onRequest` / `onResponse` / `onError`)
ve yaşam döngüsü olaylarına (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`) bağlanırlar.

**Eklenti Pazarı**, bu sistemin üzerindeki keşif katmanıdır. Yüklenebilir
eklentilerden oluşan, göz atılabilir bir katalog sunar. Katalog varsayılan olarak
küçük, yerleşik bir başlangıç kayıt defteridir. Bir operatör, kataloğu özel bir
uzak kayıt defteri URL'sine yönlendirebilir; bu durumda getirme işlemi, DNS
çözümlemesi yapan bir SSRF korumasıyla güvence altına alınır (bkz.
[Güvenlik](#security)).

Tüm eklenti rotaları **yalnızca loopback üzerinden erişilebilir** (Katman 1 —
`LOCAL_ONLY`): Eklentiler alt süreçlerde kod yükleyip çalıştırdığından, kimlik
doğrulamadan bağımsız olarak loopback dışındaki kaynaklardan bu rotalara
erişilemez. Bkz.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Bileşenler Birlikte Nasıl Çalışır?

```
Kontrol Paneli (/dashboard/plugins)
  ├─ "Yüklü" sekmesi       → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (kaldırma)
  └─ "Pazar" sekmesi       → GET /api/plugins/marketplace
                               → listMarketplacePlugins()
                                 ├─ özel URL yok → yerleşik SEED_REGISTRY
                                 └─ özel URL → isSafeMarketplaceUrl() SSRF koruması
                                               → safeOutboundFetch(guard:"public-only")
```

- **Kayıt defteri katmanı** — `src/lib/plugins/marketplace.ts`: Kataloğu listeler
  / katalogda arama yapar ve herhangi bir hata durumunda başlangıç kayıt
  defterine geri döner.
- **Yaşam döngüsü katmanı** — `src/lib/plugins/manager.ts` (`pluginManager`
  singleton'ı): yükleme, yükseltme, etkinleştirme, devre dışı bırakma, kaldırma,
  tarama ve başlangıçta yükleme.
- **Manifest katmanı** — `src/lib/plugins/manifest.ts`: `plugin.json` için Zod
  şeması + varsayılanlar.
- **Tarayıcı** — `src/lib/plugins/scanner.ts`: Eklenti dizini altında diskteki
  eklentileri keşfeder.
- **Yükleyici** — `src/lib/plugins/loader.ts`: Her eklentiyi yalıtılmış bir alt
  süreçte başlatır ve IPC üzerinden hook çağrılarına aracılık eder.

## Pazar Kataloğu

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`), bir
`MarketplaceEntry` nesneleri listesi döndürür:

| Alan          | Tür      | Notlar                                                  |
| ------------- | -------- | ------------------------------------------------------- |
| `name`        | string   | kebab-case eklenti adı                                  |
| `version`     | string   | semver                                                  |
| `description` | string   | Kısa özet                                               |
| `author`      | string   | Yazar / kuruluş                                         |
| `license`     | string   | SPDX tarzı lisans kimliği                               |
| `downloadUrl` | string   | Kaynak indirme URL'si (boş olabilir)                    |
| `repository`  | string?  | İsteğe bağlı depo URL'si                                |
| `tags`        | string[] | Arama/filtreleme etiketleri                             |
| `downloads`   | number   | İndirme sayısı                                          |
| `rating`      | number   | 0–5                                                     |
| `verified`    | boolean  | Girdinin doğrulanmış olarak işaretlenip işaretlenmediği |
| `lastUpdated` | string   | ISO benzeri tarih dizesi                                |

Özel bir kayıt defteri URL'si yapılandırılmadığında katalog, yerleşik
`SEED_REGISTRY` olur (şu anda `request-logger`, `rate-limiter`, `cost-tracker` ve
`theme-manager`). Başlangıç kayıt defteri her zaman kullanılabilir durumdadır:
Yapılandırılmış bir uzak kayıt defterine erişilemezse, kayıt defteri `200`
dışında bir durum döndürürse veya tanınmayan bir gövde döndürürse
`listMarketplacePlugins()` bir uyarı kaydeder ve başlangıç listesine geri döner.

> Not: Pazar **kataloğu** (göz atma/arama) uçtan uca bağlanmıştır, ancak
> katalogdan tek tıklamayla **yükleme** henüz uygulanmamıştır. Kontrol panelindeki
> bir pazar girdisinin "Yükle" düğmesi şu anda "çok yakında" bildirimi gösterir.
> Günümüzde yükleme, yerel yol yükleme akışı (`POST /api/plugins`) ve disk
> üzerindeki keşif (`POST /api/plugins/scan`) üzerinden gerçekleştirilir.

## REST API

Tüm uç noktalar yönetim kimlik doğrulaması (`requireManagementAuth`) gerektirir
**ve** yalnızca geri döngü üzerinden erişilebilir — `/api/plugins` ve
`/api/plugins/`, `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`)
içinde listelenir.

| Uç Nokta                         | Yöntem | Açıklama                                                        |
| -------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Yüklü eklentileri listele (isteğe bağlı `?status=` filtresi)    |
| `/api/plugins`                   | POST   | Mutlak bir yerel yoldan eklenti yükle                           |
| `/api/plugins/scan`              | POST   | Eklenti dizinini tara ve yeni eklentileri kaydet                |
| `/api/plugins/marketplace`       | GET    | Pazar yeri kataloğu girdilerini listele                         |
| `/api/plugins/[name]`            | GET    | Yüklü eklentinin ayrıntılarını al                               |
| `/api/plugins/[name]`            | DELETE | Bir eklentiyi kaldır                                            |
| `/api/plugins/[name]/activate`   | POST   | Etkinleştir (yükle + kancaları kaydet)                          |
| `/api/plugins/[name]/deactivate` | POST   | Devre dışı bırak (`onDeactivate` çağır, kancaların kaydını sil) |
| `/api/plugins/[name]/config`     | GET    | Eklenti yapılandırmasını + yapılandırma şemasını al             |
| `/api/plugins/[name]/config`     | PUT    | Eklenti yapılandırmasını güncelle (şemaya göre doğrulanır)      |

`GET /api/plugins` uç noktasının `status` filtresi
`installed` / `active` / `inactive` / `error` değerlerinden birini kabul eder. Geçersiz bir değer `400` döndürür.

### Yüklü eklentileri listeleme

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Yerel bir yoldan yükleme

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` **mutlak** olmalı ve `..` geçiş segmentleri veya null baytları içermemelidir
(Zod tarafından zorunlu tutulur). Kaynak dizin geçerli bir `plugin.json` içermeli
(veya böyle bir dizinin üst dizini olmalıdır). Başarılı olduğunda yanıt, yüklenen
eklenti satırıyla birlikte `201` olur.

### Pazar yerine göz atma

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Eklenti yapılandırmasını güncelleme

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config`, sağlanan her değeri eklentinin `configSchema` şemasına göre
(bildirimde tanımlanır) doğrular: `number` alanları `min`/`max` sınırlarına uyar,
`select` alanları ise tanımlanan `enum` ile eşleşmelidir. Şemada bulunmayan
anahtarlara izin verilir.

## Yapılandırma

### Eklenti dizini

Eklentiler OmniRoute veri dizini altında bulunur:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (veya manifest.main her neyi işaret ediyorsa)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) bu dizini üç adımda
çözümler:

1. **`OMNIROUTE_PLUGINS_DIR`**, ayarlandığında — `HOME` ne söylerse söylesin aynen
   kullanılır. Bu, eklenti ağacının genellikle konteynerin ana diziniyle hiçbir
   ilgisi olmayan bir yola bağlandığı Docker/K8s için açık ayardır (#11827).
2. `<home>/.omniroute/plugins`; burada `<home>`, `HOME` / `USERPROFILE` ortam
   değişkenlerinden alınır.
3. Süreç hiçbir ana dizin dışa aktarmıyorsa `/tmp/.omniroute/plugins`.

Çözümlenen dizin, başlangıçta bir kez `scanner.dir_resolved` olarak günlüğe
kaydedilir ve hangi girdinin seçildiği (`OMNIROUTE_PLUGINS_DIR`, `home` veya
`no-home-fallback`) belirtilir — böylece sessizce 3. adıma düşen bir imaj, yalnızca
boş bir eklenti listesi bildirmek yerine bunu açıkça belirtir.
`POST /api/plugins/scan`, burada geçerli bir `plugin.json` barındıran tüm alt
dizinleri keşfeder ve kaydeder; aynı dizin, `pluginManager.install()` işlevinin
eklentileri kopyaladığı kök dizindir. Dolayısıyla geçersiz kılma, keşif ve yükleme
konumlarını birlikte taşır.

> **`OMNIROUTE_PLUGINS_DIR`, `OMNIROUTE_PLUGIN_PATH` değildir.** İkincisi yalnızca,
> `omniroute` alt komutlarını ekleyen `omniroute-cmd-*` npm paketlerini bulmak için CLI
> komut eklentisi yükleyicisi (`bin/cli/plugins.mjs`) tarafından okunur — burada
> açıklanan çalışma zamanı tarayıcısı üzerinde hiçbir etkisi yoktur. Bu konu için
> [PLUGINS.md](./PLUGINS.md) belgesine bakın.

### Özel pazar yeri kayıt defteri URL'si

Pazar yeri kataloğu kaynağı `pluginMarketplaceUrl` ayarından okunur
(`src/lib/plugins/marketplace.ts`, `settings.pluginMarketplaceUrl` değerini okur).
Bir `http(s)` URL'sine ayarlandığında `listMarketplacePlugins()` bu URL'yi getirir
ve üst düzey bir JSON girdi dizisini ya da `plugins` dizisi içeren bir nesneyi
kabul eder; dize türünde `name` değeri olmayan girdiler filtrelenir. Ayarlanmadığında
(veya getirme işlemi SSRF korumasında başarısız olduğunda / geçersiz bir yanıt
döndürdüğünde), yerleşik başlangıç kayıt defteri kullanılır.

Kontrol panelindeki "Pazar Yeri" sekmesi bu URL için bir alan sunar (değer
`GET /api/settings` üzerinden geri okunur).

> Uygulama notu: Kontrol panelindeki "Kaydet" eylemi, `pluginMarketplaceUrl`
> değerini `PATCH /api/settings` uç noktasına gönderir. Bu yazının hazırlandığı
> sırada bu anahtar `updateSettingsSchema` içinde tanımlanmamıştır
> (`src/shared/validation/settingsSchemas.ts`); bu nedenle buna güvenmeden önce
> kullandığınız sürümde kalıcılığı doğrulayın — **okuma** yolu (`getSettings()` →
> `listMarketplacePlugins()`), anahtar ayar deposunda bulunduğu andan itibaren
> anahtarı dikkate alır.

## Güvenlik

### Rota katmanı — yalnızca geri döngü

Eklentiler, oluşturulan alt süreçlerde kod çalıştırdığından `/api/plugins`
yüzeyinin tamamı `LOCAL_ONLY` (Katman 1) olarak sınıflandırılır. Geri döngü
zorlaması, herhangi bir kimlik doğrulama kontrolünden **önce** koşulsuz olarak
çalışır; böylece bir tünel üzerinden makineye ulaşan sızdırılmış bir yönetim
belirteci bile bir eklentiyi yükleyemez, etkinleştiremez veya kaldıramaz.
Bkz. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) ve
Kesin Kurallar #15 / #17.

### Pazar yeri kayıt defteri SSRF koruması

Özel bir kayıt defteri URL'si, saldırgan tarafından etkilenebilen bir
yapılandırmadır; bu nedenle `listMarketplacePlugins()`, URL'yi getirmeden önce
iki katmandan geçirir:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` olmayan her şeyi reddeder.
   - Değişmez özel/geri döngü/bağlantı-yerel/ULA ana makinelerini (IPv4 ile
     eşlenmiş olanlar dahil IPv4 **ve** IPv6), standart `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) aracılığıyla reddeder.
   - **Hem** `A` hem de `AAAA` kayıtlarını çözümler ve çözümlenen adreslerden
     **herhangi biri** özelse reddeder; böylece genel ana makine adı → özel IP
     atlatmasını engeller.
   - **Güvenli biçimde başarısız olur**: DNS çözümleme hatası URL'nin
     reddedilmesine neden olur.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): getirme sırasında yalnızca
   genel URL korumasını yeniden uygular ve **yönlendirmeleri engeller** (genel →
   özel `30x` geçişine izin vermez).

Herhangi bir katmanda başarısız olan bir URL, isteği iptal etmez; pazar yeri
sessizce yerleşik başlangıç kayıt defterine geri döner ve bir uyarı kaydeder.

> Bu koruma, özellikle A + AAAA kayıtlarını çözümlemek ve yalnızca IPv4
> denetimi yerine standart `isPrivateHost` işlevini kullanmak amacıyla PR #3774
> kapsamında güçlendirilmiştir.

### Eklenti yürütme yalıtımı

- **Süreç yalıtımı** — `loadPlugin()` (`src/lib/plugins/loader.ts`), her
  eklentiyi ayrı bir Node.js alt sürecinde başlatır ve IPC üzerinden iletişim
  kurar. Kanca çağrılarında `SIGTERM` → `SIGKILL` yükseltmeli bir zaman aşımı
  bulunur.
- **Ortam değişkeni izin listesi** — alt süreç yalnızca izin listesindeki ortam
  değişkenlerini alır; daha geniş kapsamlı küme yalnızca manifest `env` iznini
  istediğinde verilir.
- **Yol sınırlandırması** — yükleme/yükseltme/kaldırma işlemleri, herhangi bir
  kopyalama veya özyinelemeli silme işleminden önce eklenti dizininin ve
  `manifest.main` yolunun yönetilen eklenti kökü **içinde** çözümlendiğini
  doğrular (değiştirilmiş DB yollarına ve `manifest.main` içindeki `../`
  geçişlerine karşı koruma sağlar). Etkinleştirme, sembolik bağlantıları
  `realpath` aracılığıyla çözümler ve eklenti dizininin dışına çıkan bir giriş
  noktasını yüklemeyi reddeder.
- **İsteğe bağlı bütünlük sabitlemesi** — bir manifest, `integrity`
  (`sha256-<base64>`, SRI biçimi) alanı bildirebilir. Bu alan mevcut olduğunda
  yükleyici, yükleme sırasında giriş dosyasının özetini doğrular ve eşleşmeme
  durumunda etkinleştirmeyi reddeder. Bu, isteğe bağlı bir kurcalama algılama
  mekanizmasıdır; bir güvenlik sınırı **değildir**. Gerçek sınırlar, yalnızca
  geri döngü yönlendirmesi ve izin modelidir.

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) tarafından doğrulanır:

| Alan               | Tür       | Notlar                                                                |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | string    | Zorunlu; kebab-case (`^[a-z0-9-]+$`), 1–100 karakter                  |
| `version`          | string    | Zorunlu; semver (`MAJOR.MINOR.PATCH`)                                 |
| `description`      | string?   | ≤ 500 karakter                                                        |
| `author`           | string?   | ≤ 200 karakter                                                        |
| `license`          | string?   | Varsayılanı `MIT`                                                     |
| `main`             | string?   | Giriş dosyası; varsayılanı `index.js`                                 |
| `source`           | enum?     | `local` \| `marketplace` (varsayılanı `local`)                        |
| `tags`             | string[]? | Arama etiketleri                                                      |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | object?   | Eklentinin hangi kancaları uyguladığını bildiren Boolean değerleri    |
| `skills`           | object[]? | İsteğe bağlı beceri tanımları                                         |
| `enabledByDefault` | boolean?  | Yükleme sırasında otomatik olarak etkinleştir                         |
| `configSchema`     | object?   | Yapılandırma alanları eşlemesi (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | İsteğe bağlı `sha256-<base64>` giriş dosyası sabitlemesi              |

İzinler şu enum değerlerinden alınır:
`network` / `file-read` / `file-write` / `env` / `exec`.

## Yaşam Döngüsü Akışı

```
kurulum (POST /api/plugins, yol)
  → manifesti tara/doğrula → hazırlama alanına kopyala → ana dosyanın dizin içinde olduğunu doğrula
  → atomik olarak ~/.omniroute/plugins/<name> konumuna yeniden adlandır → DB satırı ekle
  → onInstall olayını tetikle → enabledByDefault ise: etkinleştir

etkinleştirme (POST /api/plugins/{name}/activate)
  → realpath kapsama denetimi → loadPlugin() (alt süreç başlat)
  → bildirilen hook'ları kaydet → status = "active" → onActivate olayını tetikle

devre dışı bırakma (POST /api/plugins/{name}/deactivate)
  → onDeactivate olayını tetikle (kaydı kaldırmadan ÖNCE) → hook kayıtlarını kaldır
  → alt süreci sonlandır → status = "inactive"

kaldırma (DELETE /api/plugins/{name})
  → etkinse devre dışı bırak → onUninstall olayını tetikle
  → eklenti dizinini kapsama denetimli olarak özyinelemeli sil → DB satırını sil
```

`install` komutunun, manifest sürümü kurulu sürümden **kesin olarak daha yeni**
olan bir dizine karşı yeniden çalıştırılması otomatik yükseltme gerçekleştirir
(temiz yeniden kurulum; yapılandırma varsayılan değerlere sıfırlanır). Aynı veya
daha eski bir sürüm reddedilir.

## Veritabanı

`plugins` tablosu (`076_create_plugins.sql` migrasyonu):

| Sütun           | Tür     | Notlar                                                 |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Benzersiz                                              |
| `version`       | TEXT    | semver; varsayılan `1.0.0`                             |
| `description`   | TEXT    | İsteğe bağlı                                           |
| `author`        | TEXT    | İsteğe bağlı                                           |
| `license`       | TEXT    | Varsayılan `MIT`                                       |
| `main`          | TEXT    | Giriş dosyası; varsayılan `index.js`                   |
| `source`        | TEXT    | Varsayılan `local`                                     |
| `tags`          | TEXT    | JSON dizisi; varsayılan `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; varsayılan 0                                      |
| `manifest`      | TEXT    | Tam manifest JSON'u                                    |
| `config`        | TEXT    | JSON; varsayılan `{}`                                  |
| `config_schema` | TEXT    | JSON; varsayılan `{}`                                  |
| `hooks`         | TEXT    | Bildirilen hook adlarının JSON dizisi; varsayılan `[]` |
| `permissions`   | TEXT    | JSON dizisi; varsayılan `[]`                           |
| `plugin_dir`    | TEXT    | Mutlak kurulum dizini                                  |
| `error_message` | TEXT    | `status = "error"` olduğunda ayarlanır                 |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Etkinleştirme sırasında ayarlanır                      |

Eklenti metrikleri/analizleri ek tablolarda izlenir
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Kontrol Paneli

`/dashboard/plugins` adresindeki kontrol paneli sayfası
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) iki sekme sunar:

- **Kurulu** — kurulu eklentileri bildirilen hook'larıyla birlikte listeler; bir
  etkinleştirme/devre dışı bırakma anahtarı, bir kaldırma düğmesi ve "Eklentileri
  tara" eylemi (`POST /api/plugins/scan`) sunar.
- **Pazar Yeri** — özel kayıt defteri URL'sini ayarlamak için bir alanla birlikte
  `GET /api/plugins/marketplace` üzerinden alınan kataloğu gösterir.

Eklenti başına yapılandırma sayfası `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`) konumundadır.

## Ayrıca Bakınız

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` uç noktasının neden yalnızca geri döngü erişimine açık olduğu (Katman 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — ilgili yetenekler çerçevesi
  (`src/lib/skills/`); eklentiler manifestlerinde yetenekler tanımlayabilir
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — olay odaklı giden
  entegrasyonlar
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  her eklenti rotasının hata yanıtları için kullandığı `buildErrorBody()` kalıbı
