# Monitoring & Observability Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Özet**: OmniRoute; yerleşik sağlık izleme, sağlayıcı otomatik pilotu, kota takibi ve gözlemlenebilirlik kancalarıyla birlikte gelir. Bu kılavuz; kontrol panelini, uyarıları ve sorun gidermeyi kapsar.

**Kaynaklar:**

- `src/lib/monitoring/observability.ts` — gözlemlenebilirlik anlık görüntüsü
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinasyon sağlığı otomatik pilotu
- `src/lib/monitoring/providerHealthAutopilot.ts` — sağlayıcı otomatik pilotu
- `src/lib/monitoring/providerHealthMatrix.ts` — sağlayıcı sağlık matrisi
- `src/lib/localHealthCheck.ts` — yerel sağlık denetimi
- `src/lib/tokenHealthCheck.ts` — belirteç yenileme sağlığı
- `src/lib/proxyHealth.ts` — proxy sağlık önbelleği (PROXY_GUIDE.md içinde ele alınmıştır)

---

## Genel Bakış

OmniRoute, **3 izleme katmanına** sahiptir:

```
┌──────────────────────────────────────────────────────────────┐
│  Katman 1: Sistem Sağlığı (sunucu düzeyi)                     │
│  ├─ localHealthCheck.ts — DB, bağlantı noktaları, yerel bağımlılıklar │
│  ├─ db/healthCheck.ts — bütünlük, FK, sahipsiz yapıtlar        │
│  └─ Kontrol paneli: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  Katman 2: Sağlayıcı Sağlığı (sağlayıcı bazında dayanıklılık) │
│  ├─ providerHealthAutopilot.ts — devre kesici, bekleme süreleri │
│  ├─ providerHealthMatrix.ts — sağlayıcı/modele göre sağlık puanları │
│  └─ Kontrol paneli: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  Katman 3: Canlı Gözlemlenebilirlik (çalışma zamanı anlık görüntüleri) │
│  ├─ observability.ts — devre kesiciler, oturumlar, kota        │
│  ├─ tokenHealthCheck.ts — OAuth belirteci yenileme sağlığı     │
│  └─ MCP araçları: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Kontrol Paneli Sayfaları

### `/dashboard/health` (Sistem Sağlığı)

Üst düzey sağlık kontrol panelinde şunlar gösterilir:

| Bölüm                 | Gösterdikleri                                              |
| --------------------- | ---------------------------------------------------------- |
| **Sunucu durumu**     | Çalışma süresi, sürüm, bağlantı noktası, etkin bağlantılar |
| **Veritabanı**        | Bağlantı, bütünlük, WAL boyutu, son geçişler               |
| **Sağlayıcı özeti**   | Etkin sayısı, sağlıklı sayısı, açık devre kesici sayısı    |
| **Kota izleyicileri** | Etkin oturumlar, uyarı durumu, tükenenler                  |
| **Son hatalar**       | Yığın izleriyle birlikte son 10 hata                       |
| **Kaynak kullanımı**  | Bellek, CPU, yığın baskısı göstergesi                      |

### `/dashboard/providers` (Sağlayıcı Sağlığı)

Sağlayıcı bazında kontrol paneli:

| Sütun       | Açıklama                                           |
| ----------- | -------------------------------------------------- |
| Sağlayıcı   | Sağlayıcı kimliği + görünen ad                     |
| Sağlık      | Yeşil/sarı/kırmızı durum                           |
| Devre       | Açık/kapalı/yarı açık durum                        |
| Bağlantılar | Bağlantı sayısı, son yenileme                      |
| Modeller    | Kullanılabilir modeller, model bazında sağlık      |
| Maliyet     | Bugünkü maliyet, 7 günlük eğilim                   |
| Hatalar     | Son 24 saatteki hata sayısı, en yaygın hata sınıfı |

Ayrıntıları görmek için bir sağlayıcıya tıklayın:

- Gecikme dökümüyle birlikte son istekler
- Bağlantı bazında sağlık puanları
- Model bazında kilitlemeler
- Otomatik pilot önerileri

### `/dashboard/quota` (Kota Takibi)

Her API anahtarı için:

- Mevcut kullanım ve limit karşılaştırması (ilerleme çubuğu)
- Kota eğilimi (30 günlük grafik)
- Sonraki sıfırlanma zamanı
- Uyarı geçmişi

### `/dashboard/combos` (Kombinasyon Sağlığı)

Her kombinasyon için:

- Strateji + hedefler
- Hedef bazında sağlık
- Son geri dönüş olayları
- Başarı oranı (24 saat, 7 gün, 30 gün)

---

## Sağlık Kontrolü API'si

OmniRoute **iki** HTTP sağlık yüzeyi sunar. Bunlar orkestratörler için birbirinin yerine kullanılamaz.

| Yol                          | Amaç                                                                      | Yük                                | Kullanım amacı                                                             |
| ---------------------------- | ------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| `GET /healthz`               | Yaşam döngüsü canlılık/hazır olma durumu (`ok` / `starting` / `stopping`) | Çok düşük (yalnızca aşama bayrağı) | Kubernetes **hazır olma**; HTTP kullanmanız gerekiyorsa esnek **canlılık** |
| `GET /api/monitoring/health` | Derin sistem + sağlayıcı özeti (DB, heap, katalog sayıları, …)            | Ağır (senkron DB / izleme işi)     | Panolar, blackbox derin kontrolleri, Docker'ın yerleşik sağlık kontrolü    |

> **Not:** Sağlayıcı sağlık matrisleri, otomatik pilot sorunları, kota izleyicileri, token sağlığı ve `/api/monitoring/health` kapsamının ötesindeki gecikme ayrıntıları **MCP aracı** `observability_snapshot` veya **pano** sayfaları üzerinden kullanılabilir — bunlar için ayrılmış REST rotaları yoktur.

Her iki rota da istek işleme ile **aynı Node olay döngüsünde** çalışır. CPU'ya bağımlı bir yol (büyük `GET /v1/models` katalog işlemleri, uzun bağlam sıkıştırması / token sayımı), `/healthz` dahil **tüm** HTTP işleyicilerini geciktirebilir. Olay döngüsünün meşgul olması ≠ işlemin ölü olması. Öncelikle kaynak tüketen işlemi düzeltin; yoklama ayarları yalnızca hatalı sonlandırmaları azaltır.

### Hafif orkestratör yoklaması

```bash
GET /healthz
# veya HEAD /healthz
```

- Sunucunun yaşam döngüsü aşaması hazır olduğunda **200** + `ok` gövdesi
- Başlatma veya kapatma sırasında **503** + `starting` / `stopping`
- Uygulama: `src/app/healthz/route.ts` (DB ping'i yoktur)

### Sistem Sağlığı (derin)

```bash
GET /api/monitoring/health
```

Yanıt:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: yoklama önbelleği ile SQLite `test_status` karşılaştırması

`GET /api/monitoring/health` → `credentialHealth`, `provider_connections.test_status` verilerinin canlı bir dökümü değil, **bellek içi yoklama önbelleği
göstergesidir**. #12532 sonrasında istek yolu yalnızca
`getCachedCredentialHealthSummary()` değerini okur; arka plan yoklamaları
önbelleği olay döngüsünün dışında yeniler.

| Katman                       | Konum                                                                 | Anlamı                                                                                                                                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yoklama önbelleği göstergesi | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Süreç belleğinde hâlâ tutulan son kimlik bilgisi sağlığı yoklama sonuçları. `source` her zaman `probe-cache` değeridir.                                                                                                           |
| Başarısız bağlantı ayrıntısı | `credentialHealth.failedConnections`                                  | **Yalnızca `failed > 0` olduğunda** bulunur. `status=error` olan önbellek satırlarının sınırlı listesi (`connectionId`, `status`, temizlenmiş `lastError` / `lastErrorType`). Liste sınırlandırıldıysa `failedOmitted` ayarlanır. |
| SQLite kalıcı durumu         | `credentialHealth.staleDbNonOkCount`                                  | Kalıcı `test_status` değeri bilinen bir başarısız durum (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) olan **etkin** (`is_active=1`) bağlantı satırlarının sayısı.                            |

İki katman tasarım gereği birbiriyle uyuşmayabilir:

- Gösterge `failed=0` iken `staleDbNonOkCount>0` olabilir — SQLite'ta hâlâ,
  en son yoklama önbelleği anlık görüntüsünün `status=error` olarak saymadığı
  kalıcı bir `test_status` (örneğin `expired` veya `credits_exhausted`) vardır.
- Gösterge `failed>0` iken SQLite sağlıklı görünebilir — yakın tarihli bir yoklama
  başarısız olmuş ve önbelleğe alınmıştır; DB satırı güncellenmemiş veya daha sonra temizlenmiştir.

Bu uç noktadan veri toplarken yalnızca `provider_connections.test_status` değerine
dayalı uyarı vermeyin. Canlı yoklama hataları için `failed` + `failedConnections`,
kalıcı yapışkan durum sayısına ihtiyaç duyduğunuzda ise `staleDbNonOkCount` kullanın.

### Kubernetes yoklama önerileri

OmniRoute **tek bir Node işlemidir** (tek olay döngüsü). Standart Docker `HEALTHCHECK`, hafif `/healthz` uç noktasını hedefler. `/api/monitoring/health`, kubelet canlılık aralıkları için **fazla ağırdır**.

| Yoklama          | Önerilen hedef                                                                      | Notlar                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Başlangıç**    | Uzun bir `failureThreshold` (veya büyük bir `startPeriod`) ile HTTP `GET /healthz`  | Soğuk başlatma + SQLite migrasyonu birkaç saniyeyi aşabilir                                                                                                                                                                                                                                                                                                                                    |
| **Hazır olma**   | HTTP `GET /healthz`                                                                 | Yaşam döngüsü `ok` / `starting` / `stopping` (200 veya 503). Döngü CPU tarafından engellenirse yine dalgalanır. **Yanıtın birkaç saniyede 200 dönmesi sağlıklı değildir** (#10303) — bu, 3 baytlık işleyici çalışmadan önce olay döngüsünün kaynak yetersizliği yaşadığı anlamına gelir                                                                                                        |
| **Canlılık**     | HTTP `GET /livez` **veya** ana hizmet portunda (`PORT`, varsayılan `20128`) **TCP** | `/livez` yalnızca sürecin çalıştığını gösterir (işleyici çalışırsa her zaman 200). Yine de olay döngüsünü paylaşır — meşgul ≠ ölü — ve olay döngüsü kaynak yetersizliğini (#10303) TCP'den daha iyi algılamaz. HTTP yoklamaları katalog/sıkıştırma yükü altında zaman aşımına uğruyorsa **TCP**'yi tercih edin; her iki durumda da kısa olay döngüsü duraksamalarında pod'u **sonlandırmayın** |
| **Derin sağlık** | Harici bir denetleyiciden `GET /api/monitoring/health`                              | Kubelet `livenessProbe` / sık aralıklı `readinessProbe` için değildir                                                                                                                                                                                                                                                                                                                          |

Örnek yapı (eşikleri soğuk başlatma ve sıkıştırma yükünüze göre ayarlayın):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Olay döngüsü duraksadığında HTTP /livez yine de zaman aşımına uğrayabilir. TCP,
  # daha temkinli bir alternatiftir:
  # tcpSocket:
  #   port: http
```

Kubelet **canlılık** yoklamasını `/api/monitoring/health` yoluna **yönlendirmeyin**. Bu yol gerçek DB/izleme işleri gerçekleştirir ve yük altında yanlış pozitif sonuç verir.

İlgili: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (olay döngüsü meşgulken yoklamalar), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (katalog fiyatlandırmasının kaynakları tekeline alması), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (sıkıştırma token sayımının kaynakları tekeline alması).

### İsteğe bağlı istek yolu işlemleri (bellek, beceriler, token yenileme)

Bellek çıkarma, beceri ekleme ve OAuth token yenileme, `/healthz` ile **ana Node olay döngüsünü** paylaşır. Bunlar worker pool değil, pano üzerinden açılıp kapatılabilen özelliklerdir (`memoryEnabled`, `skillsEnabled`). Bkz. [Ortam — olay döngüsü maliyeti](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Sağlayıcı Sağlığı

> **REST uç noktası yoktur.** Sağlayıcı sağlık verilerine MCP aracı `observability_snapshot` veya panodaki `/dashboard/providers` sayfası üzerinden erişilebilir.

### Sağlayıcı Ayrıntıları

> **REST uç noktası yoktur.** Sağlayıcı bazındaki ayrıntılara panodaki `/dashboard/providers` sayfası üzerinden erişilebilir.

---

## Sağlayıcı Sağlığı Otomatik Pilotu

`providerHealthAutopilot.ts` modülü aşağıdakileri gerçekleştiren bir **kendi kendini iyileştiren sistemdir**:

1. Sağlayıcı sorunlarını algılar (devre açık, bekleme süreleri, kilitlenmeler, kota uyarıları)
2. Bunları çözmek için **önerilen eylemler** oluşturur
3. İsteğe bağlı olarak düşük riskli eylemleri **otomatik yürütür**

### Algılanan Sorun Türleri

| Sorun türü                   | Önem derecesi | Örnek koşul                                                |
| ---------------------------- | ------------- | ---------------------------------------------------------- |
| `provider_circuit_open`      | kritik        | 5 hatadan sonra devre kesicinin açılması                   |
| `provider_circuit_half_open` | uyarı         | Devrenin kurtarmayı test etmesi                            |
| `connection_cooldown`        | uyarı         | 429 sonrasında bağlantının bekleme süresinde olması        |
| `stale_connection_error`     | uyarı         | Son yenilemenin 30+ dakika önce başarısız olması           |
| `terminal_connection_error`  | kritik        | OAuth erişiminin iptal edilmesi, anahtarın geçersiz olması |
| `inactive_connection`        | bilgi         | Bağlantının ayarlarda devre dışı bırakılması               |
| `model_lockout`              | uyarı         | Belirli bir modelin karantinada olması                     |
| `quota_monitor_warning`      | uyarı         | Kota kullanımının %80 veya üzerinde olması                 |

### Oluşturulan Eylem Türleri

| Eylem                          | Risk   | Açıklama                                                 |
| ------------------------------ | ------ | -------------------------------------------------------- |
| `clear_provider_breaker`       | orta   | Devre kesiciyi kapalı durumuna sıfırla                   |
| `clear_connection_cooldown`    | düşük  | Bir bağlantının bekleme süresini kaldır                  |
| `clear_stale_connection_error` | düşük  | Eski hata işaretini temizle                              |
| `clear_model_lockout`          | düşük  | Karantinaya alınmış bir modeli yeniden etkinleştir       |
| `reactivate_connection`        | orta   | Devre dışı bırakılmış bir bağlantıyı yeniden etkinleştir |
| `deactivate_connection`        | yüksek | Sorunlu bir bağlantıyı devre dışı bırak                  |

### API

> **REST uç noktası yoktur.** Otomatik pilot sorunlarına MCP aracı `observability_snapshot` veya kontrol paneli üzerinden erişilebilir. Otomatik pilot dahili olarak çalışır; davranışı ortam değişkenleriyle değil, ayarlar veritabanı üzerinden (bağlantı başına `autopilotMode` alanı) yapılandırılır — otomatik pilot modu için bir ortam değişkenini arayan `grep -rn` komutu sıfır sonuç döndürür.

### Otomatik Pilot Modu

Otomatik pilot varsayılan olarak **manuel modda** çalışır — sorunları algılar ve önerilen eylemleri oluşturur ancak bunları otomatik olarak uygulamaz. Eylemler kontrol paneli üzerinden uygulanabilir.

---

## Kombinasyon Sağlığı Otomatik Pilotu

`comboHealthAutopilot.ts`, sağlayıcı otomatik pilotunun **kombinasyona özel** eşdeğeridir. Şunları gerçekleştirir:

- Sağlıksız kombinasyonları algılar
- Hedeflerin yeniden sıralanmasını önerir
- Bozuk hedeflerin devre dışı bırakılmasını önerir
- N hatadan sonra çalışmayan hedefleri otomatik olarak kaldırır

### Kombinasyon Sorunu Örnekleri

```
Kombinasyon "always-on" (öncelik stratejisi)
├─ Hedef 1: openai/gpt-5 (sağlıklı)
├─ Hedef 2: anthropic/claude-opus-4-6 (⚠️ saat 14:00'e kadar model kilitli)
└─ Hedef 3: kiro/claude-sonnet-4-5 (sağlıklı)

Önerilen eylem: Yeniden sırala — kilit sona erene kadar kiro'yu anthropic'in üzerine taşı
```

---

## Kota İzleyicileri

`observability.ts`, abonelik sağlayıcıları (Claude Code, Codex, GitHub Copilot) için **oturum başına kota izleyicileri** sunar:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Durumların Anlamları

| Durum       | Ne zaman                           | Kullanıcı arayüzü eylemi                     |
| ----------- | ---------------------------------- | -------------------------------------------- |
| `starting`  | İlk yoklama devam ederken          | Dönen yükleme göstergesi                     |
| `idle`      | Yakın zamanda etkinlik olmadığında | Kontrol panelinde gizlenir                   |
| `healthy`   | Kalan kota > %50 olduğunda         | Yeşil nokta                                  |
| `warning`   | Kalan kota < %50 olduğunda         | Sarı uyarı                                   |
| `exhausted` | Kota = %0 olduğunda                | Kırmızı engel, sonraki sağlayıcıya yönlendir |
| `error`     | Yoklama başarısız olduğunda        | Kırmızı nokta, kısa süre içinde yeniden dene |

### API

> **REST uç noktası yoktur.** Kota izleyicisi verilerine MCP aracı `observability_snapshot` veya kontrol paneli üzerinden erişilebilir.

---

## Gözlemlenebilirlik Anlık Görüntüsü

MCP aracı `observability_snapshot`, yapay zekâ ajanları için **eksiksiz bir sistem anlık görüntüsü** döndürür:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* yukarıya bakın */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Ajanlar bunu **yönlendirme kararları** vermek için kullanır — örneğin, "openai devresi açıksa önce anthropic'e yönlendir".

---

## Token Sağlığı Kontrolü

OAuth sağlayıcıları (Claude Code, GitHub Copilot, Cursor) **periyodik token yenileme** gerektirir. `src/lib/tokenHealthCheck.ts`, arka planda bir zamanlayıcı çalıştırır:

- **Tarama tetiklemesi**: her 60 saniyede bir (`src/lib/tokenHealthCheck.ts:30` konumunda `TICK_MS = 60 * 1000` olarak tarama)
- **Bağlantı başına sağlık kontrolü aralığı**: varsayılan olarak 60 dakika (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ayarlar veritabanı üzerinden yapılandırılabilir
- **401 durumunda önleyici yenileme**: bağlantı başına interceptor tarafından gerçekleştirilir

### Token Sağlığı Durumu

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Yapılandırma

Token sağlığı kontrolü yapılandırması, `tokenHealthCheck.ts` tarafından dahili olarak yönetilir.

### Token Sağlığı

> **REST uç noktası yoktur.** Token sağlığı verilerine kontrol paneli veya MCP aracı `observability_snapshot` üzerinden erişilebilir.

---

## Uyarılar

### Yerleşik Kanallar

OmniRoute, **3 uyarı kanalını** destekler:

| Kanal                   | Kurulum             | Kullanım alanı                        |
| ----------------------- | ------------------- | ------------------------------------- |
| Kontrol paneli banner'ı | Her zaman açık      | Uygulama içi bildirimler              |
| Webhook                 | URL'yi yapılandırın | Slack, Discord, PagerDuty             |
| Günlük                  | Varsayılan          | Harici günlük toplama sistemleri için |

### Webhook Yapılandırması

> **Not:** Webhook uyarı yapılandırması, kontrol panelindeki Ayarlar sayfası üzerinden yönetilir. Webhook URL'si, olay filtreleme ve yük özelleştirme seçenekleri için Ayarlar kullanıcı arayüzüne bakın.

### Uyarı Türleri

| Uyarı                        | Ne zaman                                               | Varsayılan önem derecesi |
| ---------------------------- | ------------------------------------------------------ | ------------------------ |
| `provider_circuit_open`      | Devre açıldığında                                      | kritik                   |
| `provider_circuit_half_open` | Devre kurtarma işlemini test ettiğinde                 | bilgi                    |
| `quota_warning`              | Kota %80 veya üzerindeyken                             | uyarı                    |
| `quota_exhausted`            | Kota %100'e ulaştığında                                | kritik                   |
| `token_refresh_failed`       | Art arda 3 veya daha fazla yenileme hatası olduğunda   | uyarı                    |
| `token_expired`              | Token'ın süresi dolduğunda                             | kritik                   |
| `combo_target_unhealthy`     | Combo hedefi 1 saatten uzun süre bekleme durumundayken | uyarı                    |
| `db_integrity_warning`       | FK ihlalleri 0'dan fazla olduğunda                     | uyarı                    |
| `heap_pressure`              | Heap kullanımı eşiğin %80'ini aştığında                | uyarı                    |

---

## Performans Metrikleri

### İzlenen Metrikler

| Metrik                  | Tür       | Kaynak                          |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | sayaç     | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | sayaç     | `services/usage.ts`             |
| `cost_usd`              | sayaç     | `services/usage.ts`             |
| `provider_errors`       | sayaç     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | sayaç     | `services/resilience.ts`        |
| `cache_hits`            | sayaç     | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gösterge  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gösterge  | `observability.ts`              |

### Gecikme Yüzdelikleri (p50/p95/p99)

> **REST uç noktası yoktur.** Gecikme yüzdeliği verilerine panodaki `/dashboard/health` sayfasından erişilebilir. Prometheus/OpenTelemetry dışa aktarımı v3.9 için planlanmaktadır.

### Prometheus / OpenTelemetry Dışa Aktarımı (Aşama 2)

v3.9 için planlanmaktadır: Prometheus, OpenTelemetry ve Datadog'a yerel dışa aktarım.

Şimdilik herhangi bir HTTP tabanlı izleme sistemiyle (Prometheus blackbox exporter, Datadog HTTP denetimi vb.) `/api/monitoring/health` uç noktasından veri çekin.

---

## Uyarı Tarifleri

### Slack

> **Not:** Webhook uyarıları, panodaki Ayarlar sayfası üzerinden yapılandırılır; özel webhook ortam değişkenleri yoktur (`grep -rn` sıfır sonuç döndürür). Webhook URL'si, olay filtreleme ve yük özelleştirme için Ayarlar kullanıcı arayüzüne bakın.

### Discord

> Webhook uyarıları, Slack ile aynı Ayarlar kullanıcı arayüzü akışını kullanır. Discord aynı JSON yük biçimini kabul eder.

### PagerDuty

> Webhook uyarıları aynı Ayarlar kullanıcı arayüzü akışını kullanır. PagerDuty Events API v2 yönlendirme anahtarları, Ayarlar kullanıcı arayüzünde yapılandırılır.

### Özel Webhook (JSON)

> JSON gövdesiyle POST kabul eden herhangi bir HTTP uç noktası çalışacaktır. URL'yi Ayarlar kullanıcı arayüzünde yapılandırın.

---

## Pano Yapılandırması

### Sistem Durumu Panosunu Özelleştirme

Bir `~/.omniroute/dashboard.json` dosyası oluşturun:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Bir Sağlayıcıyı En Üste Sabitleme

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Sorun Giderme

### "Sağlayıcı sağlıklı olduğunu söylüyor ancak istekler başarısız oluyor"

1. **Otomatik pilot sorunlarını** kontrol edin; bir model kilitlenmiş olabilir
2. Belirli hata sınıfı için **son hatalara** bakın
3. Sağlayıcı kartındaki **bağlantı testini** deneyin
4. Sağlayıcının **üst sistemde hız sınırlandırmasına tabi olup olmadığını** kontrol edin (yerel olarak görünmez)

### "Kota sağlıklı görünüyor ancak 429 hataları alıyorum"

- 429, sağlayıcının kotanızı tükettiğinizi bildirdiği anlamına gelir
- OmniRoute'un kota takibi **güncelliğini yitirmiş** olabilir; geçerli bilgi sağlayıcının üst sistemindedir
- Kota verileri, dahili kota izleyicisi aracılığıyla otomatik olarak yenilenir

### "Kombinasyon başarısız oluyor ancak tüm hedefler sağlıklı görünüyor"

- Hedef sıralama sorunları için **kombinasyon sistem durumu** panosunu kontrol edin
- **Geri dönüş olaylarına** bakın; kombinasyon seçenekleri çok hızlı tüketiyor olabilir
- **Stratejinin** kullanım durumunuzla eşleştiğini doğrulayın (öncelik, sıralı dönüş veya otomatik)

### "Veritabanı sistem durumu denetimi başarısız oluyor"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` komutunu çalıştırın
- Sonuç "ok" ise yanlış alarmdır; sistem durumu denetimi gereğinden katı davranıyordur
- Başka bir sonuç alırsanız **OmniRoute'u durdurun** ve [felaket kurtarma kılavuzunu](./DATABASE_GUIDE.md#disaster-recovery) izleyin

### "Bellek yığın baskısı kritik düzeyde"

```bash
# Mevcut yığını kontrol edin
node -e "console.log(process.memoryUsage())"

# Manuel GC'yi tetikleyin (--expose-gc kullanılıyorsa)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Eşzamanlı istek sayısını azaltın (bir ortam değişkeniyle değil, panodaki Ayarlar sayfasından ayarlanır)
# `MAX_CONCURRENT_REQUESTS` ortam değişkeni yoktur; bunu Ayarlar → Eşzamanlılık bölümünde yapılandırın.
```

---

## Ayrıca Bakınız

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — kullanım ve maliyet takibi
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — veritabanı şeması + sistem durumu
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy sistem durumu (ayrı önbellek)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sistem mimarisi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — devre kesici ayrıntıları
- Kaynak: `src/lib/monitoring/` (4 dosya, 2121 kod satırı)
