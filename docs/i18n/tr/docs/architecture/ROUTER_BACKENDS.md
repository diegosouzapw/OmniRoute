# Router Backends & Embedded Services — architecture contract (ADR) (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Durum:** Kabul Edildi · **Bağlam:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Sözleşme:** `domain/routing/routerBackends.ts`
> (tür güvenli kayıt defteri — kod [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ile ekleniyor)

Bu ADR, katkıda bulunanların mimari açıdan farklı iki kavramı birbirine karıştırmasını önlemek amacıyla `ts` (yerel), `bifrost`, `cliproxy`, `9router` ve VibeProxy uyumlu motorların birbiriyle nasıl ilişkili olduğunu kesinleştirir. Router-backend-registry çalışmasıyla sunulan tür güvenli kayıt defterini bu model için tek doğruluk kaynağı olarak belgeler.

## Temel ayrım — birbirinden bağımsız iki eksen

Bir motorun rolü, kayıt defterinin `RouterBackendDefinition` yapısında birlikte kodlanan **iki bağımsız eksenle** tanımlanır:

1. **Yaşam döngüsü** (`RouterBackendLifecycle`) — _motorun nasıl çalıştığı_:
   - `in-process` — OmniRoute Node işleminin içinde çalışır (yerel TS işlem hattı).
   - `supervised` — OmniRoute'un `ServiceSupervisor` aracılığıyla kurduğu/başlattığı/durdurduğu/sağlık kontrolünü yaptığı ve ardından sağlayıcı bağlantısı olarak kullandığı yerel bir alt işlemdir.
   - `external` — OmniRoute'un istek gönderdiği ancak **yönetmediği** bir HTTP uç noktasıdır
     (bir ortam değişkeni taban URL'siyle yapılandırılır).
   - `disabled` — kayıtlıdır ancak seçilemez.
2. **Seçim ekseni** (aktarıcı yönlendirme arka ucu) — _aktarıcının ona istek gönderip göndermediği_:
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` içindeki
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`.

Kaçınılması gereken hata: "gömülü hizmet" ile "yönlendirme arka ucunu" tek bir liste olarak değerlendirmektir. Bunlar aynı değildir. `supervised` bir motor (9router/cliproxy), alternatif bir aktarıcı istek gönderme arka ucu değil, **yerel işlem hattı tarafından kullanılan bir sağlayıcı bağlantısıdır**. `bifrost` ise bunun tersidir — (tarihsel olarak) yalnızca `external` olan bir aktarıcı istek gönderme arka ucudur.

## Kayıt defteri — tek doğruluk kaynağı

`domain/routing/routerBackends.ts` sözleşmesi (kod [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ile ekleniyor), her motoru yaşam döngüsü, yetenekleri, hizmet kimliği, varsayılan bağlantı noktası, sağlık yapılandırması ve telemetri desteğiyle birlikte bir kez tanımlar. Tüketiciler, her yardımcı işlemi ayrı ayrı özel durum olarak ele almak yerine motorları `getRouterBackend(id)`, `listRouterBackends()` ve `listRouterBackendsByCapability(cap)` aracılığıyla arar.

| Arka uç     | Yaşam döngüsü | Hizmet (eksen A) | Aktarıcı arka ucu (eksen B) | Sağlık        | Varsayılan bağlantı noktası |
| ----------- | ------------- | ---------------- | --------------------------- | ------------- | --------------------------- |
| `ts`        | `in-process`  | —                | `ts` (yerel)                | —             | —                           |
| `bifrost`   | `external`¹   | —¹               | `bifrost` / `auto`          | `/health`     | —                           |
| `cliproxy`  | `supervised`  | `cliproxy`       | — (sağlayıcı)               | `/v1/models`  | 8317                        |
| `9router`   | `supervised`  | `9router`        | — (sağlayıcı)               | `/api/health` | 20130                       |
| `vibeproxy` | `external`    | —                | — (sağlayıcı adaptörü)      | `/v1/models`  | —                           |

¹ Bifrost'un (`/api/services/bifrost/` üzerinden kurulabilen/başlatılabilen) `supervised` bir gömülü hizmete yükseltilmesi [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) kapsamında takip edilmektedir; bu değişiklik birleştirilene kadar Bifrost yalnızca `external` olarak kullanılabilir (yalnızca `BIFROST_BASE_URL` üzerinden erişilebilir).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`), çağrı yapanların kimlik başına dalları sabit kodlamak yerine motorları gerçekten yapabildikleri işlemlere göre filtrelemesine olanak tanır.

## Eksen A — gömülü hizmetler (denetlenen süreç tarafı)

- **Denetlenen süreçlerin kaydı:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (şu anda: `9router`, `cliproxy`).
- **Yaşam döngüsü sahibi:** `src/lib/services/ServiceSupervisor.ts` — `start()` alt
  süreci başlatır, `waitForHealthy()` sonucunu bekler, stdout/stderr akışını bir halka arabelleğe aktarır;
  `stop()` SIGTERM→SIGKILL uygular; tüm işlemler bir kilit altında sıralı olarak yürütülür.
- **Durum birleşimi** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`; ayrıca bundan
  bağımsız bir `HealthState = healthy | unhealthy | unknown` bulunur.
- **Neden süreç içi bir SDK yerine ayrı bir süreç?** Süreç yalıtımı, her bir yardımcı
  süreç için kurulum/başlatma/durdurma/sağlık/günlük işlemlerinin bağımsız olarak denetlenebilmesini
  ve geri döngü adresi başlatma korumasının uygulanabilmesini sağlar. Süreç içi bir bağdaştırıcının
  modellenmesi gelecekte yapılacak bir çalışmadır — bunun ifade edileceği yer
  `native-hot-path` yetenek bayrağıdır.

### Yaşam döngüsü rota sözleşmesi (`/api/services/<tool>/…`)

Durum kodları **tasarım gereği duruma/fiile/yola özeldir** — bu bir tutarsızlık değil,
sözleşmenin kendisidir:

| Çağrı                              | Koşul                                      | Durum                                |
| ---------------------------------- | ------------------------------------------ | ------------------------------------ |
| `POST .../start`                   | hizmet `not_installed`                     | **409** (ön koşul)                   |
| `POST .../stop`                    | zaten durdurulmuş                          | **200** (idempotent etkisiz işlem)   |
| `GET .../status`                   | Tamam                                      | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                   | süreç başlatma hatası                      | **503** (geçici)                     |
| `GET .../status`, `.../stop`       | yakalanmamış hata                          | **500**                              |
| `GET /api/services/<x>/logs`       | bilinmeyen araç `<x>`                      | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`        | `X-Reveal-Confirm: yes` eksik              | **403** (yalnızca 9router)           |
| **herhangi bir** `/api/services/*` | çağıran geri döngü/özel LAN üzerinde değil | **403 LOCAL_ONLY**                   |

Tüm hata gövdeleri `createErrorResponse()` tarafından şu biçimde oluşturulur:
`{ error: { message, type }, requestId }`; burada `type`, durum kodundan türetilir
(`500→server_error`, `404→not_found`, `409→conflict`, diğerleri `invalid_request`) ve
makine tarafından işlenebilir ayırt edicidir. Mesajlar önceden temizlenir
(`sanitizeErrorMessage()`, Kesin Kural #12).

**Geri döngü koruması**, bir `403` hatasının en yaygın nedenidir: `/api/services/`,
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) içindedir ve
`src/server/authz/policies/management.ts`, bu rotalar alt süreçler başlattığından
geri döngü / özel LAN dışındaki tüm çağıranları **kimlik doğrulamadan önce** reddeder
(Kesin Kurallar 15 ve 17). Bu rotalara genel bir tünel üzerinden erişildiğinde tasarım
gereği `403` döndürülür.

## Eksen B — aktarma yönlendirme arka ucu (dağıtım tarafı)

Yalnızca `/api/v1/relay/chat/completions` aktarma proxy yolu bir dağıtım arka ucu
seçer; ana `/api/v1/chat/completions` yüzeyi hiçbir zaman `routingBackend.ts`
dosyasına başvurmaz.

- **Seçim** (`resolveRelayRoutingBackend`): tek bir genel ortam değişkeni anahtarı —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ayarlanmamışsa, Bifrost yapılandırılmış+etkin olduğunda `auto`, aksi takdirde `ts`.
- **Davranış:**
  - `bifrost` (zorunlu): Bifrost hatası → kesin `502`, geri dönüş yok.
  - `auto`: Bifrost'u dener; hata/bekleme süresi durumunda sessizce yerel uygulamaya geçer.
  - `ts` / geri dönüş sonrası: yerel `open-sse` çevirici/yürütücü işlem hattı.
- **Bekleme süresi:** `bifrostCooldown.ts` içinde `baseUrl` başına hata bekleme süresi.

Seçim bugün **aktarma düzeyinde ya hep ya hiç şeklindedir** — `release/v3.8.43`
sürümünde sağlayıcı veya istek başına motor değişimi yoktur. İstek başına geçit,
yardımcı süreç manifesti çalışması kapsamında eklenmektedir
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`);
bu sayede `auto`, yalnızca manifest açısından uygun sağlayıcıları Bifrost üzerinden
yönlendirebilir.

## Dashboard entegrasyonu

Hizmetler dashboard'u, `src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
üzerinden her 5 saniyede bir `GET /api/services/<tool>/status` adresini yoklar ve
`{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` döndürür. Paylaşılan bir kullanılabilirlik bağlamı sağlayıcısı yoktur —
her bileşen, her araç için hook'u çağırır. `!res.ok` durumunda hook şu anda yalnızca
`HTTP <status>` gösterir; `error.type` alanının kullanıcıların anlayabileceği bir açıklamayla eşleştirilmesi,
sözleşme değişikliği değil, takip edilen bir UX iyileştirmesidir.

## Sonuçlar

- Yeni motorlar `ROUTER_BACKENDS` içinde bir kez kaydedilir; tüketiciler, kimlik başına
  yeni dallara gerek kalmadan yetenek sorguları aracılığıyla bunlara erişir.
- "Bu bir hizmet mi yoksa yönlendirme arka ucu mu?" sorusu, bir kimliğin hangi listede
  yer aldığına göre değil, `lifecycle` alanına göre yanıtlanır.
- Bifrost gözetimi (#5817) ve yerel kritik yol geçişi (#5670), her bir sidecar için
  özel durumlar oluşturmak yerine bu paylaşılan sözleşmeyi temel alır.
