# Tunnels Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Doğruluk kaynağı:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, yerel sunucusunu (`http://localhost:20128`) üç tünel arka ucu
aracılığıyla genel internete açabilir. Bu özellik şu durumlarda kullanışlıdır:

- Herkese açık olarak erişilebilen bir yönlendirme URL'sine ihtiyaç duyan bulut
  sağlayıcılarından (Antigravity, Gemini, Cursor) gelen OAuth geri çağrıları.
- Bir VM dağıtmadan yerel örneğinizi ekip arkadaşlarınızla paylaşma.
- Mobil, uzaktan veya ağlar arası test.

Üç arka ucun tamamı süreç içinde yönetilir — OmniRoute, temel ikili dosyayı veya
SDK'yı kontrol panelinden ya da REST API üzerinden başlatır/durdurur. Ters proxy
veya systemd kurulumu gerekmez.

## Arka uçlara genel bakış

| Arka uç                     | Kalıcılık                                                    | Maliyet                        | Kurulum                                                  |
| --------------------------- | ------------------------------------------------------------ | ------------------------------ | -------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Geçici (URL her yeniden başlatmada değişir)                  | Ücretsiz                       | Yok — `cloudflared` otomatik olarak yüklenir             |
| **ngrok**                   | Ücretli plan veya sabit alan adı yapılandırıldığında kararlı | Ücretsiz katman + ücretli      | ngrok hesabı + authtoken gerektirir                      |
| **Tailscale Funnel**        | tailnet'iniz içindeki düğüm başına kararlı                   | Kişisel kullanım için ücretsiz | Tailscale kurulumu + oturum açma + Funnel ACL gerektirir |

Uygulamalar `src/lib/cloudflaredTunnel.ts`, `src/lib/ngrokTunnel.ts` ve
`src/lib/tailscaleTunnel.ts` dosyalarında bulunur. Üçü de `phase`, `running`,
`publicUrl`, `apiUrl`, `targetUrl` ve `lastError` alanlarını içeren ortak biçimli
bir `status` nesnesi döndürür; böylece kontrol paneli bunları aynı şekilde
görüntüleyebilir.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`, `cloudflared`'ı bir alt süreç olarak çalıştırır.
Adlandırılmış tünel yapılandırması sağlanıp sağlanmadığına göre seçilen iki modu
destekler:

- **Hızlı tünel (varsayılan).** `cloudflared tunnel --url
http://localhost:<apiPort>` komutunu çalıştırır ve atanan
  `*.trycloudflare.com` URL'sini standart çıktıdan ayrıştırır. URL'ler geçicidir ve
  her yeniden başlatmada değişir.
- **Adlandırılmış tünel (isteğe bağlı).** `CLOUDFLARED_CONFIG`, yerel olarak
  yönetilen bir cloudflared `config.yml` dosyasını gösterdiğinde OmniRoute,
  `cloudflared tunnel --no-autoupdate
--config <path> run` komutunu çalıştırarak size **kararlı, adlandırılmış bir ana
  makine adı** sağlar. Yapılandırma; tünel UUID'sini, `credentials-file` ve
  `ingress` yönlendirmesini sağladığından `--url` aktarılmaz ve Zero Trust
  kontrol paneli belirteci gerekmez. `run`, kimlik bilgilerini yapılandırmadaki
  mutlak `credentials-file` yolundan okur — `cert.pem` gerekmez (bu yalnızca
  tünel yaşam döngüsü yönetimi için kullanılır).

Temel davranışlar:

- **Otomatik yükleme.** İlk kullanımda OmniRoute, en son `cloudflared` ikili
  dosyasını resmî GitHub sürümlerinden indirir (yönetilen kurulum
  `DATA_DIR/cloudflared/` altında bulunur). İndirilen varlığın SHA256 değeri,
  çalıştırılmadan önce sürüm bildirimiyle karşılaştırılarak doğrulanır.
- **Süreç denetimi.** Kontrol panelinin sayfa yenilemeleri arasında durumu
  sürdürebilmesi için cloudflared PID'si ve çözümlenen URL,
  `quick-tunnel-state.json` dosyasında kalıcı olarak saklanır.

### Adlandırılmış tünel kurulumu (kararlı ana makine adı)

1. cloudflared CLI ile yerel olarak yönetilen bir tünel oluşturun (tek seferlik):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Ana makine adınızı OmniRoute'un yerel API bağlantı noktasına (varsayılan 20128) yönlendiren bir `~/.cloudflared/config.yml` dosyası yazın:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute'u yapılandırmaya yönlendirin ve tüneli (yeniden) başlatın:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # isteğe bağlı — OmniRoute'un bildirdiği ana makine adını geçersiz kılar; aksi
   # takdirde yapılandırmanın ilk ingress kuralından okunur:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Tüneli, hızlı tünelle aynı şekilde etkinleştirin (aşağıdaki REST / kontrol
   paneli / CLI). Adlandırılmış tünel, ayrıştırılacak herkese açık bir URL
   üretmediğinden hazır olma durumu cloudflared'ın kayıtlı uç bağlantısından
   algılanır ve `publicUrl`/`apiUrl`, `CLOUDFLARED_HOSTNAME` (veya
   yapılandırmanın ilk ingress ana makine adı) üzerinden bildirilir.

### REST üzerinden etkinleştirme / devre dışı bırakma

Uç nokta, ayrı `start`/`stop` yolları yerine `{action: "enable" | "disable"}`
gövdesini kullanır. Yönetim kimlik doğrulaması (yönetici oturumu veya yönetici
API anahtarı) gereklidir.

```bash
# Etkinleştir
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Durum
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Devre dışı bırak
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Alternatif olarak kontrol panelinden: **Ayarlar → Tüneller → Cloudflare**.

### İsteğe bağlı ortam değişkenleri

| Değişken                                             | Amaç                                                                                                                                                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | İkili dosya yolunu geçersiz kılar. Ayarlanmış ve geçerliyse OmniRoute, indirmek yerine bunu kullanır.                                                                                       |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Aktarım protokolü (varsayılan `http2`; ayrıca `quic`, `auto`).                                                                                                                              |
| `CLOUDFLARED_CONFIG`                                 | Yerel olarak yönetilen cloudflared `config.yml` dosyasının yolu. Ayarlandığında OmniRoute, hızlı tünel yerine **adlandırılmış/kalıcı** bir tünel (`tunnel --config <path> run`) çalıştırır. |
| `CLOUDFLARED_HOSTNAME`                               | Adlandırılmış tünelin bildirilen genel ana bilgisayar adını geçersiz kılar (ör. `ai.example.com`). Ayarlanmadığında yapılandırmadaki ilk `ingress` ana bilgisayar adından okunur.           |

## 2. ngrok

`src/lib/ngrokTunnel.ts`, **`@ngrok/ngrok` SDK'sını** kullanır (işlem içi çalışır, CLI alt süreci yoktur). Önceden derlenmiş ikili dosyaları bulunmayan platformların uygulamanın açılışını bozmaması için yerel modül, ilk başlatmada tembel olarak içe aktarılır.

### Ön koşullar

1. <https://ngrok.com> adresinden kaydolun.
2. Authtoken'ınızı ngrok kontrol panelinden kopyalayın.
3. Bunu aşağıdaki yöntemlerden biriyle sağlayın:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, veya
   - Kontrol paneli: **Settings → Tunnels → ngrok**, veya
   - REST gövdesi (tek kullanımlık): `{"action":"enable","authToken":"<token>"}`.

Hiçbiri yapılandırılmamışsa durum yanıtı `phase: "needs_auth"` döndürür.

### REST aracılığıyla etkinleştirme / devre dışı bırakma

```bash
# Etkinleştir (ortamdaki NGROK_AUTHTOKEN değerini kullanır)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Satır içi token ile etkinleştir
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Durum
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Devre dışı bırak
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Yanıt, atanan `publicUrl` değerini içerir (ör.
`https://abcd-1234.ngrok-free.app`). Özel alan adları, bölgeler ve politika kuralları ngrok kontrol panelinde yapılandırılmalıdır — OmniRoute yalnızca yerel hedef URL'yi SDK'ya iletir.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts`, yerel API portunu **Funnel** (Tailscale'in serve için genel internet çıkışı) aracılığıyla kullanıma açmak üzere sistemdeki `tailscale` CLI'ını yönetir. Kurulum, oturum açma, daemon başlatma, etkinleştirme ve devre dışı bırakma dahil olmak üzere yaşam döngüsünün tamamını destekler.

Uygulama, `tailscale funnel --bg <port>` komutunu (arka plan modu) çağırır. Genel URL, `https://<machine>.<tailnet>.ts.net/` biçimindedir.

### Ön koşullar

1. Tailscale'i kurun (veya bunu OmniRoute'a yaptırın — aşağıdaki `install` endpoint'ine bakın).
2. Oturum açın (`tailscale login` veya OmniRoute'un `login` endpoint'i aracılığıyla).
3. Tailscale yönetici konsolunda tailnet'iniz için Funnel'ı etkinleştirin:
   <https://login.tailscale.com/admin/settings/features>.

Linux ve macOS'te daemon'ın (`tailscaled`) denetlenmesi için `sudo` gerekir. POST endpoint'leri, isteğe bağlı bir `sudoPassword` alanını kabul eder; bu alan, çağrı süresince OmniRoute'un MITM parola önbelleğine (`getCachedPassword` / `setCachedPassword`) iletilir. Windows, `C:\Program Files\Tailscale\tailscale.exe` konumundaki varsayılan hizmet kurulumunu kullanır.

### REST endpoint'leri

Kurulum, oturum açma, daemon ve tünel ayrı işlemler olduğundan Tailscale, diğer backend'lerden daha kapsamlı bir arayüze sahiptir.

| Endpoint                              | Yöntem | Amaç                                                                        |
| ------------------------------------- | ------ | --------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Birleştirilmiş tünel durumu (`phase`, `tunnelUrl`, `apiUrl` vb.)            |
| `/api/tunnels/tailscale/check`        | `GET`  | Alt düzey denetim: kurulu mu? Oturum açık mı? Daemon çalışıyor mu?          |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale'i kur (SSE ile aktarılan ilerleme olayları) — Linux/macOS         |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS'te `tailscaled`'ı başlat                                        |
| `/api/tunnels/tailscale/login`        | `POST` | Oturum açma akışını başlat; tarayıcıda açılacak `authUrl` değerini döndürür |
| `/api/tunnels/tailscale/enable`       | `POST` | API portu için Funnel'ı başlat                                              |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel'ı durdur                                                             |

Tüm Tailscale endpoint'leri yönetim kimlik doğrulaması gerektirir (bkz. `routeUtils.ts ::
requireTailscaleAuth`).

Etkinleştirme örneği:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Funnel, yönetici konsolunda etkinleştirilmemişse yanıt, `funnelNotEnabled: true` değerinin yanı sıra tarayıcıda açılacak bir `enableUrl` içerir.

### İsteğe bağlı ortam değişkenleri

| Değişken        | Amaç                                          |
| --------------- | --------------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` ikili dosya yolunu geçersiz kılma |

## Uç nokta özeti

| Uç Nokta                              | Yöntem | Gövde                               | Kimlik Doğrulama |
| ------------------------------------- | ------ | ----------------------------------- | ---------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | yönetim          |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | yönetim          |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | yönetim          |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | yönetim          |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | yönetim          |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | yönetim          |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | yönetim          |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | yönetim          |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | yönetim          |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | yönetim          |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | yönetim          |

Merkezi bir `/api/settings/tunnels` uç noktası yoktur — her arka uç
bağımsızdır.

## OAuth geri çağrısıyla ilgili hususlar

OmniRoute'u bir tünel üzerinden kullanıma açtığınızda pano ve OAuth akışları,
geri çağrı URL'lerini `localhost` yerine **genel** ana bilgisayar adına göre
oluşturmalıdır. Aksi takdirde OAuth sağlayıcısı kullanıcıyı sunucularının
erişemeyeceği bir URL'ye yönlendirir ve el sıkışma başarısız olur.

Pano düzenlemeleri ve ayarları kaydetme işlemleri, tünel ana bilgisayar adının
`NEXT_PUBLIC_BASE_URL` içinde sabitlenmesini gerektirmez. Kimliği doğrulanmış
pano, aynı kaynağa yönelik güvenli olmayan istekleri oturuma bağlı bir CSRF
belirteciyle gönderir; bu nedenle geçici Cloudflare Quick Tunnel ana
bilgisayarları, oturum açıldıktan sonra normal kullanıcı arayüzü yönetimi için
kullanılmaya devam edebilir.

Şunu ayarlayın:

```bash
NEXT_PUBLIC_BASE_URL=https://<tünel-ana-bilgisayarınız>
```

ve OAuth'u başlatmadan önce OmniRoute'u yeniden başlatın. Geçici Cloudflare
Quick Tunnel'larda URL her yeniden başlatmadan sonra değişir; bu nedenle üretim
ortamındaki OAuth kullanımı için ayrılmış alan adına sahip ngrok'u veya
Tailscale Funnel'ı tercih edin.

## Sistem durumu ve izleme

Pano, tünel durumunu **Ayarlar → Tüneller** altında gösterir:

- Etkin arka uçlar ve mevcut `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Mevcut genel URL ve bundan türetilen API URL'si (`<publicUrl>/v1`).
- Tünelin yönlendirme yaptığı yerel hedef URL.
- Varsa son hata mesajı.

Program aracılığıyla izlemek için her arka uca ait `GET` uç noktalarını
düzenli olarak sorgulayın. Aynı anda birden fazla arka ucun çalıştırılmasına
izin verilir; OmniRoute her birini bağımsız olarak izler.

## Sorun giderme

### "cloudflared ikili dosyası bulunamadı"

OmniRoute ilk kullanımda otomatik kurulum yapmayı dener. Kurulum engellenirse
(kısıtlı ağ, GitHub erişiminin olmaması), `cloudflared` dosyasını
<https://github.com/cloudflare/cloudflared/releases> adresinden manuel olarak
indirin ve `CLOUDFLARED_BIN=/path/to/cloudflared` değerini ayarlayın.

### "ngrok: authtoken gerekli"

`phase: "needs_auth"`, hiçbir authtoken bulunamadığı anlamına gelir.
`.env` içinde `NGROK_AUTHTOKEN` değerini ayarlayın, pano üzerinden yapılandırın
veya etkinleştirme POST gövdesinde `authToken` iletin.

### "tailscale: funnel etkin değil"

Etkinleştirme yanıtı `funnelNotEnabled: true` içeriyorsa Funnel, tailnet'iniz
için devre dışıdır. Döndürülen `enableUrl` adresini (veya yönetici konsolundaki
özellik sayfasını) açın ve Funnel'ı etkinleştirin.

### Tünel URL'sindeki değişiklikler OAuth'u bozuyor

Ayrılmış alan adına sahip ngrok'u veya Tailscale Funnel'ı kullanın (her ikisi de
düğüm başına sabittir). Cloudflare Quick Tunnel'lar tasarım gereği geçicidir ve
uzun ömürlü OAuth geri çağrıları için önerilmez.

### Linux/macOS'ta Tailscale için izin reddedildi

`tailscaled` root yetkisi gerektirir. İlgili POST uç noktasına `sudoPassword`
sağlayın veya daemon'u kendiniz çalıştırın (`sudo systemctl start tailscaled`).

## Ayrıca bkz.

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — çıkış trafiği için giden proxy (1proxy, SOCKS5, HTTP).
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` dahil ortam değişkenlerinin tam listesi.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — kararlı genel barındırma için tünellemeye alternatifler.
- Kaynak: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
