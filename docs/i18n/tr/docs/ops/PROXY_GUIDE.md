# 🌐 OmniRoute Proxy Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Coğrafi engelleri aşın, kimliğinizi koruyun ve AI trafiğini herhangi bir proxy üzerinden yönlendirin — üstelik hiçbir yapılandırma karmaşası olmadan.**

OmniRoute; üst sağlayıcı AI trafiğini HTTP, HTTPS veya SOCKS5 proxy'leri üzerinden yönlendirmenize olanak tanıyan, tüm özelliklere sahip bir proxy yönetim sistemi içerir. İster engellenmiş bir bölgede olun, ister IP rotasyonuna ihtiyaç duyun ya da gizli parmak izi oluşturmak isteyin — bu kılavuz ihtiyacınız olan her şeyi kapsar.

---

## İçindekiler

- [Neden Proxy Kullanılmalı?](#neden-proxy-kullanılmalı)
- [Mimariye Genel Bakış](#mimariye-genel-bakış)
- [4 Seviyeli Proxy Sistemi](#4-seviyeli-proxy-sistemi)
- [Proxy Kayıt Defteri (CRUD)](#proxy-kayıt-defteri-crud)
- [1proxy Ücretsiz Pazarı](#1proxy-ücretsiz-proxy-pazarı)
- [Proxy Rotasyonu](#proxy-rotasyonu)
- [Algılama Önleme ve Gizlilik](#algılama-önleme--gizlilik)
- [Üst Proxy Modları](#üst-proxy-modları)
- [Kontrol Paneli Arayüzü](#kontrol-paneli-arayüzü)
- [API Referansı](#api-referansı)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Sorun Giderme](#sorun-giderme)

---

## Neden Proxy Kullanılmalı?

Birçok AI sağlayıcısı erişimi coğrafi bölgeye göre kısıtlar. **Rusya, Çin, İran, Küba, Türkiye** ve diğer ülkelerdeki geliştiriciler aşağıdakine benzer hatalarla karşılaşır:

```
unsupported_country_region_territory
```

Proxy'ler, engellenmiş bölgelerin dışında da şu amaçlarla kullanılabilir:

| Kullanım Alanı         | Açıklama                                                               |
| ---------------------- | ---------------------------------------------------------------------- |
| **Coğrafi engel aşma** | Engellenmiş ülkelerden OpenAI, Anthropic, Codex ve Copilot'a erişme    |
| **IP rotasyonu**       | Hız sınırlamasından kaçınmak için istekleri birden fazla IP'ye dağıtma |
| **Gizlilik**           | Gerçek IP adresinizi üst sağlayıcılardan gizleme                       |
| **Uyumluluk**          | Trafiği belirli yargı bölgeleri üzerinden yönlendirme                  |
| **Test**               | Farklı bölgelerden gelen istekleri simüle etme                         |

---

## Mimariye Genel Bakış

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute Sunucusu                      │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy       │    │ Proxy        │    │ Proxy            │  │
│  │ Kayıt       │───▶│ Dağıtıcı     │───▶│ Fetch (undici)   │  │
│  │ Defteri     │    │ (önbellekli) │    │                  │  │
│  │ (SQLite)    │    │              │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy      │                        │ Üst Sağlayıcı    │  │
│  │ Senkroniz.  │                        │ API'si           │  │
│  │ (ücr. havuz)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Temel Bileşenler

| Bileşen                 | Dosya                                        | Rol                                                                         |
| ----------------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| **Proxy Kayıt Defteri** | `src/lib/db/proxies.ts`                      | Proxy girdileri ve kapsam atamaları için CRUD işlemleri                     |
| **Proxy Dağıtıcısı**    | `open-sse/utils/proxyDispatcher.ts`          | Önbelleğe alma özelliğiyle `undici` ProxyAgent/SOCKS dağıtıcıları oluşturur |
| **Proxy Fetch**         | `open-sse/utils/proxyFetch.ts`               | Proxy dağıtıcısı ekleyerek `fetch()` işlevini sarmalar                      |
| **Ayarlar Rotası**      | `src/app/api/settings/proxy/route.ts`        | Eski proxy yapılandırma API'si (GET/PUT/DELETE)                             |
| **Yönetim Rotası**      | `src/app/api/v1/management/proxies/route.ts` | Kayıt defteri CRUD API'si (GET/POST/PATCH/DELETE)                           |
| **1proxy Veritabanı**   | `src/lib/db/oneproxy.ts`                     | Ücretsiz proxy pazarı kalıcılığı                                            |

---

## 4 Seviyeli Proxy Sistēmi

OmniRoute, öncelik sırasına göre çözümlenen **dört bağımsız kapsamda** proxy yapılandırmasını destekler:

```
Öncelik Çözümleme Sırası (en yüksek → en düşük):

  1. 🔵 Hesap/Bağlantı Proxy'si  →  API anahtarı / OAuth bağlantısı başına
  2. 🟡 Sağlayıcı Proxy'si       →  sağlayıcı başına (ör. tüm OpenAI trafiği)
  3. 🟠 Kombinasyon Proxy'si     →  kombinasyon/yönlendirme yapılandırması başına
  4. 🟢 Global Proxy             →  tüm trafik, tüm sağlayıcılar
```

### Çözümleme Nasıl Çalışır?

OmniRoute, üst sağlayıcıya bir istek gönderdiğinde her seviyeyi sırayla kontrol eden `resolveProxyForConnectionFromRegistry()` fonksiyonunu çağırır:

1. **Hesap seviyesi** — Bu belirli bağlantı kimliğine atanmış bir proxy var mı?
2. **Sağlayıcı seviyesi** — Bu sağlayıcıya (ör. `openai`) atanmış bir proxy var mı?
3. **Global seviye** — Yapılandırılmış bir global proxy var mı?
4. **Proxy yok** — Sağlayıcıya doğrudan bağlantı.

İlk eşleşme kullanılır. Bu, global bir proxy'yi yedek seçenek olarak ayarlayabileceğiniz ancak belirli sağlayıcılar veya bağlantılar için bunu geçersiz kılabileceğiniz anlamına gelir.

### Proxy Üzerinden Yönlendirilenler

| Trafik Türü              | Proxy Kullanılıyor mu? | Notlar                                                |
| ------------------------ | ---------------------- | ----------------------------------------------------- |
| Sohbet tamamlamaları     | ✅                     | Tüm `/v1/chat/completions` istekleri                  |
| Embedding'ler            | ✅                     | `/v1/embeddings`                                      |
| Görsel oluşturma         | ✅                     | `/v1/images/generations`                              |
| Ses (TTS/STT)            | ✅                     | `/v1/audio/*`                                         |
| OAuth belirteci değişimi | ✅                     | `unsupported_country_region_territory` sorununu çözer |
| Bağlantı testleri        | ✅                     | "Bağlantıyı Test Et" düğmesi proxy kullanır           |
| Belirteç yenileme        | ✅                     | Arka planda OAuth yenilemesi                          |
| Model senkronizasyonu    | ✅                     | Model listeleme ve keşfetme                           |

---

## Proxy Kayıt Defteri (CRUD)

Proxy kayıt defteri, tüm proxy'lerinizi depolayan bir SQLite tablosudur (`proxy_registry`). Her proxy aşağıdaki alanlara sahiptir:

| Alan       | Tür     | Açıklama                                               |
| ---------- | ------- | ------------------------------------------------------ |
| `id`       | UUID    | Benzersiz tanımlayıcı                                  |
| `name`     | String  | İnsan tarafından okunabilir etiket                     |
| `type`     | String  | Protokol: `http`, `https`, `socks5`                    |
| `host`     | String  | Proxy ana bilgisayar adı veya IP adresi                |
| `port`     | Integer | Bağlantı noktası numarası                              |
| `username` | String  | Kimlik doğrulama kullanıcı adı (beklemede şifrelenmiş) |
| `password` | String  | Kimlik doğrulama parolası (beklemede şifrelenmiş)      |
| `region`   | String  | Coğrafi bölge etiketi                                  |
| `notes`    | String  | Serbest metin notları                                  |
| `status`   | String  | `active` veya `inactive`                               |
| `source`   | String  | `manual` veya `oneproxy`                               |

### Proxy Oluşturma

**Kontrol Paneli Üzerinden:**

1. **Ayarlar → Proxy** bölümüne gidin
2. **Proxy Ekle** seçeneğine tıklayın
3. Tür, ana bilgisayar, bağlantı noktası ve isteğe bağlı kimlik doğrulama bilgilerini doldurun
4. Kaydedin

**API Üzerinden:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Proxy Güncelleme

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Not:** Açıkça boş olmayan yeni değerler göndermediğiniz sürece kimlik bilgileri korunur. `username`/`password` için boş dizeler gönderildiğinde depolanan değerler korunur.

### Proxy Silme

```bash
# Proxy herhangi bir kapsama atanmışsa başarısız olur
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Zorla silme (atamaları da kaldırır)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Proxy'leri Listeleme

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Proxy'leri Kapsamlara Atama

```bash
# Global kapsama ata
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Belirli bir sağlayıcıya ata
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Belirli bir bağlantıya/anahtara ata
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Etkin Proxy'yi Çözümleme

Belirli bir bağlantı için hangi proxy'nin kullanılacağını kontrol edin:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Çözümlenen proxy'yi seviyesi (`account`, `provider` veya `global`) ve kaynağıyla birlikte döndürür.

### Toplu Atama

Tek bir proxy'yi aynı anda birden fazla sağlayıcıya veya bağlantıya atayın:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### İçe/Dışa Aktarma

Proxy'ler **Yedekleme/Geri Yükleme** sistemine dahildir. OmniRoute yapılandırmanızı dışa aktardığınızda:

1. **Kontrol Paneli → Ayarlar → Yedekleme** bölümüne gidin
2. **Dışa Aktar** seçeneğine tıklayın — proxy kayıt defteri ve atamalar dahil edilir
3. Geri yüklemek için **İçe Aktar** seçeneğine tıklayın ve yedekleme dosyasını yükleyin

Proxy kayıt defteri ayrıca **host+port değerlerine göre upsert** işlemini destekler — zaten mevcut olan bir proxy'yi (aynı ana bilgisayar ve bağlantı noktasıyla) içe aktarırsanız kopya oluşturmak yerine mevcut proxy'yi günceller.

### Eski Sistemden Geçiş

Proxy'leri daha eski bir sürümde (registry öncesi) yapılandırdıysanız OmniRoute bunları otomatik olarak taşır:

```
Eski key_value deposu → proxy_registry + proxy_assignments
```

Bu işlem, yükseltmeden sonraki ilk başlatmada bir kez gerçekleşir. Yeniden çalıştırmak için `migrateLegacyProxyConfigToRegistry({ force: true })` kullanın.

---

## 1proxy Ücretsiz Proxy Pazarı

> 🆕 **[@oyi77](https://github.com/oyi77) tarafından katkıda bulunulmuştur** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Sorun [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute, dünyanın dört bir yanından **yüzlerce ücretsiz, doğrulanmış proxy'ye** erişim sağlamak için **[1proxy](https://1proxy-api.aitradepulse.com)** topluluk platformuyla entegre olur. Bu, kendi proxy altyapısına sahip olmayan kullanıcılar için idealdir.

### Nasıl Çalışır?

```
┌─────────────┐   Senkronize Et   ┌─────────────────┐    Döndür     ┌───────────┐
│  1proxy API │ ─────────────────▶ │  proxy_registry  │ ────────────▶ │ Sağlayıcı │
│   (harici)  │  500 proxy'ye kadar│  source=oneproxy │ kaliteye göre │    API     │
└─────────────┘                    └─────────────────┘                └───────────┘
```

1. **Senkronize et** — OmniRoute, doğrulanmış proxy'leri 1proxy API'sinden alır
2. **Sakla** — Proxy'ler aynı `proxy_registry` tablosuna `source = 'oneproxy'` ile kaydedilir
3. **Filtrele** — Protokole, ülkeye ve kalite puanına göre filtreleyin
4. **Döndür** — Kalite, rastgele veya sıralı stratejileri kullanarak en iyi proxy'yi seçin
5. **Otomatik düşürme** — Başarısız proxy'lerin kalite puanı düşürülür; eşik değerin altına düşenler → etkin değil olarak işaretlenir

### Proxy'leri Senkronize Etme

**Kontrol Paneli Üzerinden:**

1. **Ayarlar → 1proxy** sekmesine gidin
2. **"Şimdi Senkronize Et"** düğmesine tıklayın
3. İstatistikleri görüntüleyin: toplam proxy sayısı, etkin proxy sayısı, ortalama kalite ve ülkelere göre dağılım

**API Üzerinden:**

```bash
# Senkronizasyonu tetikle
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Yanıt:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Proxy'leri Filtreleme

```bash
# Protokole göre filtrele
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Ülkeye göre filtrele
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Minimum kalite puanına göre filtrele
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Filtreleri birleştir
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Proxy Kalite Puanları

Her 1proxy proxy'si meta verilerle birlikte gelir:

| Alan            | Açıklama                                         |
| --------------- | ------------------------------------------------ |
| `qualityScore`  | 1proxy doğrulamasından alınan 0-100 arası puan   |
| `latencyMs`     | Ölçülen ağ gecikmesi                             |
| `anonymity`     | `transparent`, `anonymous` veya `elite`          |
| `googleAccess`  | Proxy'nin Google hizmetlerine erişip erişemediği |
| `countryCode`   | İki harfli ISO ülke kodu                         |
| `lastValidated` | Son doğrulamanın zaman damgası                   |

Kalite puanları dinamik olarak ayarlanır:

- **Başarısız istekler** puanı 10 azaltır
- **Puan ≤10'a düşerse** → proxy `inactive` olarak işaretlenir
- Etkin olmayan proxy'ler döndürme işlemine dahil edilmez

### Döndürme Stratejileri

```bash
# Kaliteye göre döndür (önce en iyi proxy) — varsayılan
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Rastgele döndürme
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sıralı (önce en uzun süredir doğrulanmamış olan)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Devre Kesici

1proxy senkronizasyonunda yerleşik bir devre kesici bulunur:

- **Art arda 5 senkronizasyon hatasından** sonra diğer senkronizasyon girişimleri engellenir
- Şununla sıfırlayın: `resetOneproxyCircuitBreaker()` veya sunucuyu yeniden başlatın
- Senkronizasyon durumu `GET /api/settings/oneproxy?action=status` adresinden alınabilir

### 1proxy Proxy'lerini Temizleme

```bash
# Tek bir 1proxy proxy'sini sil
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# TÜM 1proxy proxy'lerini temizle (manuel proxy'lere dokunulmaz)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Algılama Önleme ve Gizlilik

OmniRoute, trafiği yalnızca bir proxy üzerinden yönlendirmekle kalmaz — trafiğin meşru görünmesini de sağlar:

### TLS Parmak İzi Sahteciliği

Tarayıcı benzeri TLS parmak izleri oluşturmak için `wreq-js` kullanarak tarayıcı dışı TLS el sıkışmalarını işaretleyen bot algılama sistemlerini atlatır.

### CLI Parmak İzi Eşleştirme

**CLI Parmak İzi Anahtarı** (`Ayarlar → Güvenlik`), HTTP başlıklarını ve JSON gövde alanlarını yerel CLI ikili dosyalarının (Claude Code, Codex vb.) imzasıyla tam olarak eşleşecek şekilde yeniden sıralar. Bu özellik, proxy'nin **üzerine ek olarak** çalışır:

```
IP adresiniz (engellenmiş) → Proxy IP'si (ABD) → Sağlayıcı API'si
                              + TLS sahteciliği
                              + CLI parmak izi
```

Aynı anda hem **IP maskeleme** hem de **istek özgünlüğü** elde edersiniz.

### Proxy IP'sini Koruma

Kontrol panelindeki renk kodlu rozetler, hangi proxy düzeyinin etkin olduğunu gösterir:

| Rozet | Düzey     | Anlamı                                           |
| ----- | --------- | ------------------------------------------------ |
| 🟢    | Genel     | Tüm trafik bu proxy üzerinden geçer              |
| 🟡    | Sağlayıcı | Yalnızca bu sağlayıcının trafiği proxy'den geçer |
| 🔵    | Bağlantı  | Bu belirli anahtar/hesap bu proxy'yi kullanır    |

Rozet ayrıca doğrulama için çözümlenen proxy IP'sini de gösterir.

---

## Yukarı Akış Proxy Modları

CLIProxyAPI kalıbını kullanan sağlayıcılar için OmniRoute üç yukarı akış proxy modunu destekler:

| Mod           | Açıklama                                                       |
| ------------- | -------------------------------------------------------------- |
| `native`      | OmniRoute, proxy yönlendirmesini doğrudan yönetir (varsayılan) |
| `cliproxyapi` | Harici bir CLIProxyAPI örneğine devreder                       |
| `fallback`    | Önce yerel modu dener, başarısız olursa CLIProxyAPI'ye geçer   |

Her sağlayıcı için ayrı ayrı yapılandırın:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Kontrol Paneli Kullanıcı Arayüzü

### Ayarlar → Proxy Sekmesi

- **Genel proxy** yapılandırması (tüm trafik için bir kez ayarlanır)
- **Sağlayıcı başına proxy** geçersiz kılmaları
- **Bağlantı başına proxy** atamaları
- Yapılandırılmış proxy üzerinden **bağlantı testi**
- Etkin proxy düzeyini gösteren **renk kodlu rozetler**

### Ayarlar → 1proxy Sekmesi

- Ücretsiz proxy'leri almak için **Şimdi Senkronize Et** düğmesi
- **İstatistik kartları**: Toplam, Etkin, Ort. Kalite, Son Senkronizasyon
- **Filtreler**: Protokol, Ülke Kodu, Min. Kalite
- Ana makine, protokol, ülke, kalite puanı, gecikme, anonimlik ve Google erişimini içeren **proxy tablosu**
- Başarı/başarısızlık takibi ve ardışık başarısızlık sayısını içeren **senkronizasyon durumu** paneli
- Tüm 1proxy girdilerini kaldırmak için **Tümünü Temizle**

---

## API Referansı

### Proxy Ayarları API'si

| Yöntem   | Uç Nokta                                       | Açıklama                           |
| -------- | ---------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Tam proxy yapılandırmasını getirir |
| `GET`    | `/api/settings/proxy?level=global`             | Genel proxy'yi getirir             |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Sağlayıcı proxy'sini getirir       |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Etkin proxy'yi çözümler            |
| `PUT`    | `/api/settings/proxy`                          | Proxy yapılandırmasını günceller   |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | İlgili düzeydeki proxy'yi kaldırır |

### Proxy Kayıt API'si

| Yöntem   | Uç Nokta                                          | Açıklama                        |
| -------- | ------------------------------------------------- | ------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Tüm proxy'leri listeler         |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Proxy'yi kimliğine göre getirir |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Proxy atamalarını getirir       |
| `POST`   | `/api/v1/management/proxies`                      | Proxy oluşturur                 |
| `PATCH`  | `/api/v1/management/proxies`                      | Proxy'yi günceller              |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Proxy'yi siler                  |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Zorla siler                     |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Toplu atama yapar               |
| `GET`    | `/api/v1/management/proxies/assignments`          | Atamaları listeler              |
| `GET`    | `/api/v1/management/proxies/health`               | Proxy sağlık istatistikleri     |

### Tüneller API'si

OmniRoute örneğinizi, giden trafiği bir proxy üzerinden yönlendirmek yerine herkese açık internete açmak (Cloudflare/ngrok/Tailscale) için [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) belgesine bakın. Tünel REST API'si `/api/tunnels/{cloudflared,ngrok,tailscale}/*` altında bulunur ve yukarıda belgelenen giden proxy zincirinden bağımsızdır.

### 1proxy API'si

| Yöntem   | Uç Nokta                               | Açıklama                                          |
| -------- | -------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy proxy'lerini listeler                      |
| `GET`    | `/api/settings/oneproxy?action=stats`  | İstatistikleri ve senkronizasyon durumunu getirir |
| `GET`    | `/api/settings/oneproxy?action=status` | Yalnızca senkronizasyon durumunu getirir          |
| `POST`   | `/api/settings/oneproxy`               | Senkronizasyonu tetikler                          |
| `POST`   | `/api/settings/oneproxy/rotate`        | Sonraki proxy'ye geçer                            |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Birini siler                                      |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Tümünü temizler                                   |

### Yukarı Akış Proxy API'si

| Yöntem   | Uç Nokta                          | Açıklama                                    |
| -------- | --------------------------------- | ------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Yukarı akış proxy yapılandırmasını getirir  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Yukarı akış proxy modunu ayarlar            |
| `DELETE` | `/api/upstream-proxy/:providerId` | Yukarı akış proxy yapılandırmasını kaldırır |

---

## Ortam Değişkenleri

| Değişken              | Varsayılan | Açıklama                                                                             |
| --------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `ENABLE_SOCKS5_PROXY` | `true`     | SOCKS5 proxy desteğini etkinleştirir (`.env.example` içinde varsayılan değer `true`) |

---

## Sorun Giderme

### "SOCKS5 proxy devre dışı"

`.env` dosyanızda `ENABLE_SOCKS5_PROXY=true` olarak ayarlayın ve yeniden başlatın.

### Proxy üzerinden "socket hang up" hataları

Bu, boşta kalan bağlantıları sonlandıran ucuz proxy'lerde normaldir. OmniRoute bunu zaten şu yöntemlerle ele alır:

- Proxy bağlantılarında keep-alive özelliğini devre dışı bırakarak (`keepAliveTimeout: 1`)
- Pipelining özelliğini devre dışı bırakarak (`pipelining: 0`)
- Tekrarlanan el sıkışmalarını önlemek için dispatcher'ları önbelleğe alarak

Sorun devam ederse farklı bir proxy deneyin veya 1proxy rotasyon özelliğini kullanın.

### OAuth sırasında "unsupported_country_region_territory"

OAuth akışını başlatmadan **önce** proxy'nin yapılandırıldığından emin olun. OmniRoute, OAuth token alışverişini yapılandırılmış proxy üzerinden yönlendirir. Önce global veya sağlayıcı düzeyinde bir proxy ayarlayın, ardından bağlanın.

### Proxy kullanılmıyor

Çözümleme sırasını kontrol edin:

1. `GET /api/settings/proxy?resolve=your-connection-id` ile doğrulayın
2. Proxy `status` değerinin `active` (`inactive` değil) olup olmadığını kontrol edin
3. Proxy atama kapsamının bağlantınızla eşleştiğinden emin olun

### 1proxy senkronizasyonu başarısız oluyor

Senkronizasyon durumunu kontrol edin:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

`consecutiveFailures >= 5` ise devre kesici tetiklenmiştir. Sıfırlamak için sunucuyu yeniden başlatın veya manuel olarak sıfırlanmasını bekleyin.

---

## Veritabanı Şeması

### `proxy_registry` Tablosu

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' veya 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (yalnızca 1proxy)
  latency_ms INTEGER,                        -- milisaniye (yalnızca 1proxy)
  anonymity TEXT,                            -- şeffaf/anonim/elit
  google_access INTEGER DEFAULT 0,           -- Google'a erişebilir mi? (1proxy)
  last_validated TEXT,                       -- ISO zaman damgası (1proxy)
  country_code TEXT,                         -- ISO 2 harfli kod (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` Tablosu

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account' veya 'combo'
  scope_id TEXT,              -- sağlayıcı kimliği, bağlantı kimliği veya combo kimliği
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Proxy Sağlık Kontrolü (v3.8.16+)

OmniRoute'un **proxy hızlı hata verme** mekanizması (`src/lib/proxyHealth.ts`), hızlı bir TCP bağlantı kontrolüyle çalışmayan proxy'leri <2 saniye içinde algılar ve ardından istek başına ek yükü önlemek için **sonucu önbelleğe alır**.

### Nasıl Çalışır?

```
İstek ──▶ ProxyHealthCache.get(url)
          │
          ├─ Önbellek isabeti + güncel?  ──▶ önbelleğe alınmış durumu döndür
          │
          └─ Önbellekte yok / eski?       ──▶ host:port adresine TCP bağlantısı kur
                                              (zaman aşımı: FAST_FAIL_TIMEOUT_MS)
                                              ──▶ HEALTH_CACHE_TTL_MS süresince önbelleğe al
                                              ──▶ sonucu döndür
```

Bu olmadan çalışmayan bir proxy, başarısız olmadan önce her isteği `PROXY_TIMEOUT_MS` süresinin tamamı boyunca (varsayılan 30 saniye) engellerdi.

### Ayarlanabilir Ortam Değişkenleri

| Değişken                     | Varsayılan | Amaç                                            |
| ---------------------------- | ---------- | ----------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`     | Sağlık kontrolü başına TCP bağlantı zaman aşımı |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`    | Sağlık sonucunun önbellekte tutulma süresi      |

**Önerilen değerler:**

| Senaryo                            | Hızlı hata verme zaman aşımı | Önbellek TTL'si | Gerekçe                                                                                   |
| ---------------------------------- | ---------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| Yüksek işlem hacimli API ağ geçidi | 1500ms                       | 60000ms         | Agresif hızlı hata verme, kontrolleri azaltmak için daha uzun önbellek                    |
| Coğrafi olarak dağıtılmış düğümler | 3000ms                       | 15000ms         | Daha yavaş ağlar daha fazla zamana ihtiyaç duyar; hızlı yük devri için daha kısa önbellek |
| Geliştirme / test                  | 1000ms                       | 10000ms         | Yerel proxy'lerde hızlı yineleme                                                          |
| Gizlilik / algılama önleme         | 2500ms                       | 45000ms         | Hız sınırlarını tetikleyebilecek hızlı yoklamalardan kaçınma                              |

### Proxy Sağlığını İnceleme

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Belirli bir proxy'yi yeniden kontrol etmeye zorla
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Önbellek girdisi `HEALTH_CACHE_TTL_MS` süresini aştığında `stale` bayrağı `true` olur ve sonraki istek yeni bir kontrolü tetikler.

### Proxy Türüne Göre Varsayılanlar

Sağlık kontrolü, URL şemasına göre uygun varsayılan değerleri kullanır:

| Şema                       | Varsayılan port |
| -------------------------- | --------------- |
| `http://`                  | 8080            |
| `https://`                 | 443             |
| `socks5://` / `socks5h://` | 1080            |

URL'deki özel portlar (`http://host:9999`) her zaman şema varsayılanına göre önceliklidir.

---

## Proxy Analitiği ve Gözlemlenebilirlik

OmniRoute, operatörlerin yönlendirme kalıplarını, gecikme artışlarını ve yinelenen hataları teşhis etmesine yardımcı olmak için proxy başına kullanımı izler.

### İzlenen Veriler

OmniRoute, yapılandırılmış bir proxy üzerinden geçen her istek için şunları kaydeder:

| Metrik       | Açıklama                                              |
| ------------ | ----------------------------------------------------- |
| `proxy_url`  | Tam proxy URL'si (kimlik doğrulama bilgileri maskeli) |
| `provider`   | Üst sağlayıcı kimliği (openai, anthropic vb.)         |
| `latency_ms` | Proxy el sıkışması dahil toplam gidiş-dönüş süresi    |
| `connect_ms` | Yalnızca TCP bağlantı süresi                          |
| `status`     | Üst sistemden gelen HTTP durum kodu                   |
| `error`      | İstek başarısız olduysa hata sınıfı                   |
| `timestamp`  | ISO 8601 UTC                                          |

### Verilere Erişme

```bash
# Son proxy olayları
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Asıl uç nokta `/api/usage/proxy-logs`'dur (bkz. `src/app/api/usage/proxy-logs/route.ts`). Bu uç nokta şunları destekler:

- `GET /api/usage/proxy-logs` — proxy günlüklerini getirir
- `DELETE /api/usage/proxy-logs` — tüm proxy günlüklerini temizler

Gerekirse toplu istatistikler, SQL aracılığıyla doğrudan `proxy_logs` tablosundan sorgulanabilir. Kontrol paneli arayüzü toplu görünümler sunabilir.

### Yaygın Kalıplar

**Kararsız bir proxy'yi tespit etme** (başarı ve başarısızlık arasında gidip gelir):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Yavaş proxy'leri bulma** (p95 gecikmesi > 2 sn.):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Döndürme Stratejisi Karar Ağacı

Bir kapsama birden fazla proxy atandığında OmniRoute, her istek için hangisinin kullanılacağını seçmek üzere bir **döndürme stratejisi** kullanır. Strateji kapsam düzeyinde yapılandırılır (genel, sağlayıcı başına, hesap başına, kombinasyon başına).

### Kullanılabilir Stratejiler

| Strateji               | Kullanım durumu                           | Ödünleşim                                                           |
| ---------------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| `quality` (varsayılan) | Farklı kalitede proxy'lerle üretim ortamı | Yüksek puanlı proxy'leri tercih eder; düşük puanlıları dışlayabilir |
| `random`               | Yük dağıtımı, gizlilik                    | Eşit dağıtım sağlar; kalite sinyallerini yok sayar                  |
| `sequential`           | Hata ayıklama, deterministik test         | Proxy'ler arasında sırayla döner; anlaşılması kolaydır              |

### Karar Ağacı

```
                    Proxy'leriniz için kalite puanlarınız var mı?
                    │
        ┌───────────┴───────────┐
        │                       │
      EVET                    HAYIR
        │                       │
   Tüm proxy'lerin             │
   kalitesi yaklaşık           │
   olarak eşit mi?             │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
 EVET      HAYIR              `random`
   │         │                kullanın
   │         │              (eşit dağılım,
   │         │               zaman içinde
   │         │               kalite verisi
   │         │               oluşturur)
   │         │
   │    `quality` kullanın
   │    (farklı kalite
   │    düzeyleri için
   │    en iyisi)
   │
`random` kullanın
(yükü eşit
dağıtın)
```

## Kendi Proxy’leriniz İçin Otomatik Hata Sonrası Devre Dışı Bırakma

1proxy pazar yeri havuzu, başarısız proxy’lerin derecesini zaten otomatik olarak düşürür (bkz.
[Proxy Kalite Puanları](#proxy-quality-scores)). Kayıt defterine **sizin**
eklediğiniz proxy’ler için arka plan sağlık zamanlayıcısı
(`src/lib/proxyHealth/scheduler.ts`), hiçbir şeyi silmeden aynı “çalışmayan bir üyeyi
zincirden otomatik olarak çıkarma” davranışını sağlar:

```bash
# .env — art arda 3 başarısız yoklamadan sonra bir proxy'yi geçici olarak devre dışı bırakın;
# yoklamalara yeniden yanıt vermeye başladığında otomatik olarak tekrar etkinleştirin.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Çoklu proxy zincirine nasıl uyduğu:

1. Zamanlayıcı, kayıtlı her proxy’yi her `PROXY_HEALTH_INTERVAL_MS`
   aralığında yoklar (varsayılan 10 dk.; minimum 1 dk.).
2. Art arda `PROXY_AUTO_REMOVE_AFTER` adet **kesin** başarısızlıktan sonra (gerçek
   bir bağlantı hatasıdır; zaman aşımı veya yoklama hedefinin kendi 5xx yanıtı hiçbir zaman
   sayılmaz, bkz. [Proxy Sağlık Denetimi](#proxy-health-checking-v3816)), proxy’nin `status`
   değeri `dead` olarak ayarlanır.
3. `dead`, havuz/döndürme çözümlemesinin kullandığı etkin durum filtresinin
   hariç tuttuğu durumlardan biridir; bu nedenle kapsamın döndürme mekanizması (sıralı / rastgele / yapışkan /
   gecikme — bkz. [Döndürme Stratejisi Karar Ağacı](#rotation-strategy-decision-tree))
   söz konusu proxy’yi yeni isteklere vermeyi hemen durdurur. Havuzdaki diğer proxy’ler
   bundan etkilenmez ve havuzun tamamı hiçbir zaman sessizce doğrudan bağlantıya
   geri dönmez — hatada kapalı koruma mekanizması için bkz.
   [4 Seviyeli Proxy Sistemi](#4-level-proxy-system).
4. Zamanlayıcı, `dead` proxy’leri aynı aralıkta yoklamaya devam eder. Bir sonraki
   başarılı yoklama, `status` değerini tekrar `active` olarak değiştirir ve proxy yeniden döndürmeye dahil olur —
   manuel olarak yeniden eklemek gerekmez.

Bu davranış bilinçli olarak **isteğe bağlı ve tahribatsızdır**: zamanlayıcı varsayılan olarak yalnızca
başarısızlıkları sayar ve günlüğe kaydeder (`decision.ts` içindeki C politikasına bakın);
`PROXY_AUTO_DISABLE` hiçbir zaman bir satırı silmez — ayrı ve daha agresif olan
`PROXY_AUTO_REMOVE` bayrağı bunun içindir. Her ikisi de `true` olarak ayarlanırsa
`PROXY_AUTO_REMOVE` öncelikli olur (silinmek üzere olan bir proxy’yi arada geçici olarak
devre dışı bırakmanın bir faydası yoktur). Değişkenlerin tam listesi için
[Ortam Yapılandırması](../reference/ENVIRONMENT.md) başvuru belgesine bakın.

---

> 📖 **İlgili belgeler:**
>
> - [Kullanıcı Kılavuzu](../guides/USER_GUIDE.md) — Genel kurulum ve yapılandırma
> - [API Başvurusu](../reference/API_REFERENCE.md) — Eksiksiz API belgeleri
> - [Ortam Yapılandırması](../reference/ENVIRONMENT.md) — Tüm ortam değişkenleri
