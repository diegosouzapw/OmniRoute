# 🐳 Docker Guide — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Eksiksiz Docker dağıtım referansı. Hızlı başlangıç için [README Docker bölümüne](../README.md#-docker) bakın.

## İçindekiler

- [Hızlı Çalıştırma](#quick-run)
- [Ortam Dosyasıyla](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Kullanılabilir Profiller](#available-profiles)
- [OmniRoute Docker'da çalışırken ana makine CLI araçlarını yapılandırma](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Üretim Compose Yapılandırması](#production-compose)
- [Dockerfile Aşamaları](#dockerfile-stages)
- [Kritik Ortam Değişkenleri](#critical-environment-variables)
- [Caddy ile Docker Compose (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Hızlı Tüneli](#cloudflare-quick-tunnel)
- [İmaj Etiketleri](#image-tags)
- [Kullanılabilirlik: varsayılan SQLite tek replikalıdır](#availability-default-sqlite-is-single-replica)
- [Önemli Notlar](#important-notes)

---

## Hızlı Çalıştırma

> **Tek komutla kendi sunucunuzda barındırmak mı istiyorsunuz?** Şu belgeye bakın:
> [Kendi Sunucunuzda Barındırma Kılavuzu](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (yayımlanmış imaj +
> Redis, yalnızca geri döngü, profil seçimi yok). Aşağıdaki Hızlı Çalıştırma,
> Redis'i zaten başka bir yerde çalıştıran kullanıcılar için tek konteynerli yöntemdir.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Ortam Dosyasıyla

```bash
# Önce .env dosyasını kopyalayın ve düzenleyin
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Temel profil (CLI araçları yok)
docker compose --profile base up -d

# CLI profili (Claude Code, Codex, OpenClaw yerleşik)
docker compose --profile cli up -d

# Ana makine profili (öncelikle Linux; ana makinedeki CLI ikili dosyalarını salt okunur olarak bağlar)
docker compose --profile host up -d

# Web profili (web oturumu sağlayıcıları için Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI yan hizmetini birleştirin
docker compose --profile cli --profile cliproxyapi up -d
```

## Kullanılabilir Profiller

OmniRoute, ana dağıtım yapılandırmaları için Compose profilleriyle birlikte gelir. Ortamınıza uygun olanı seçin.

| Profil              | Hizmet           | Ne zaman kullanılmalı                                                                                                                                         | Komut                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (varsayılan) | `omniroute-base` | Başsız sunucu / minimum çalışma ortamı; sağlayıcı CLI'ları dahil değildir                                                                                     | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | `omniroute providers/setup/doctor` ve paketle birlikte gelen CLI'ları (Codex, Claude Code, Droid, OpenClaw) çağıran ajan tabanlı iş akışları                  | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` vb. dizinleri salt okunur bağlayarak ana makine CLI'larına `network_mode` benzeri erişim isteyen Linux ana makineleri | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Üst akış CLI proxy'lemesi için [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) yardımcı konteynerini `8317` portunda çalıştırmak                  | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Tarayıcı gerektiren web oturumu sağlayıcıları: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` derlenir, Chromium dahildir)                      | `docker compose --profile web up -d`         |

> Birden fazla profil birleştirilebilir: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker'da çalışırken ana makine CLI araçlarını yapılandırma

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ve kontrol panelindeki
**Yapılandırmayı kaydet** düğmesi, `~/.codex/*.config.toml` gibi dosyalara yazar. Bu yollar
yalnızca CLI'ın gerçekten çalıştığı makinede anlamlıdır. Bunları kapsayıcının içinde
çalıştırırsanız yazma işlemi, kapsayıcının kendi giriş dizininde (`/home/node` —
imaj `USER node` ile çalışır) gerçekleşir. Ana makinedeki hiçbir CLI burayı okumaz ve
kapsayıcı yeniden oluşturulduğu anda buradaki veriler silinir.

OmniRoute bunu algılar ve kullanamayacağınız bir başarı bildirmek yerine
talimatlarla birlikte yazma işlemini reddeder: CLI `2` koduyla sonlanır ve API,
`containerEphemeralTarget: true` ile birlikte `422` yanıtını verir.

### Önerilen: CLI'ı ana makinede, OmniRoute'u Docker'da çalıştırın

Kapsayıcı API'ı sunar; CLI ise ana makinenizdeki araçları yapılandırır.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI'ı kapsayıcıya yönlendirin
omniroute setup-codex                      # ana makinenizdeki gerçek ~/.codex dizinine yazar
```

Codex, Claude Code, Cursor veya benzeri araçlar dizüstü bilgisayarınızda
çalışıyorsa doğru tercih budur — yaygın kurulum da budur.

### Alternatif: ana makine yapılandırma dizinlerini bind mount ile bağlayın (`host` profili)

Kapsayıcının ana makine yapılandırmanıza doğrudan yazmasını istiyorsanız
dizinleri bağlayın ve `CLI_CONFIG_HOME` değişkenini bağlama köküne yönlendirin. `host` profili
bunu zaten yapar:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Yolu güvenilir kılan şey bind mount işlemidir: OmniRoute,
`/proc/self/mountinfo` dosyasını okur ve bağlı yollara (ayrıca alt dizinleri
bağlama noktası olan dizinlere; yukarıdaki `/host-home` yapısı tam olarak budur)
yazılmasına izin verirken bağlı olmayan yolları reddetmeye devam eder.

### Kaçış yolu: kapsayıcının kendi CLI'larını yapılandırın (ölçülü kullanın)

CLI'lar gerçekten kapsayıcının içinde bulunuyorsa (`cli` profili), yazma işlemi
kasıtlıdır. Herhangi bir `setup-*` komutuna `--allow-container-write` seçeneğini
iletin veya sunucu için `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` değerini
ayarlayın. Yazma işlemi, verilerin kapsayıcıdan sonra kalıcı olmayacağına ilişkin
bir uyarıyla devam eder.

> **Güvenlik uyarısı — `cli` profili + `docker.sock` bağlaması.**
> `cli` profili, kapsayıcı içi otomatik güncelleyicinin ana makine daemon'ı
> üzerinden yığını yeniden oluşturabilmesi için `/var/run/docker.sock` yolunu
> bind mount ile bağlar (`src/lib/system/autoUpdate.ts` bu soketi kontrol eder ve
> mevcut olmadığında Docker yolunu atlar). Bu soket **ana makinenin root yetkisine
> ilişkin bir güven sınırıdır**: sokete erişebilen herhangi bir şey, ana makinedeki
> Docker daemon'ını root olarak yönetir — ana makinedeki herhangi bir kapsayıcıyı
> oluşturabilir, inceleyebilir, durdurabilir ve kaldırabilir.
> Sonuçları:
>
> 1. **`cli` profilinin portunu asla ağa açmayın.** Portu
>    `127.0.0.1` üzerinde yayımlayın (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN üzerinden erişilebilen bir `cli` profili, kontrol paneli düzeyindeki herhangi
>    bir RCE açığını ana makinenin tamamen ele geçirilmesine dönüştürür.
> 2. **`cli` profiline başka hiçbir ana makine dizinini bağlamayın.**
>    Docker soketiyle birlikte eklenen herhangi bir bağlama, kapsayıcıya dosya
>    sisteminiz ve ana makine yapılandırmanız üzerinde tam okuma/yazma erişimi verir.
>    Bir aracın bir projeyi görmesi gerekiyorsa aracı CLI binary'siyle yerel olarak
>    çalıştırın — projeyi `cli` kapsayıcısına bağlamayın.
>
> Kapsayıcı içi otomatik güncellemeye ihtiyacınız yoksa `cli` profilini kapalı
> bırakın (`COMPOSE_PROFILES=core,redis` veya daha kısa bir değer kullanın). Diğer
> profiller Docker soketini bağlamaz.
>
> MITM ile ilgili tehdit modeli için `docs/security/MITM-TPROXY-DECRYPT.md`
> dosyasına (git içindedir; `/docs` içine derlenmez), `codex`/`claude-code`/`droid`/`openclaw`
> binary kaynak zinciri içinse `docs/security/SUPPLY_CHAIN.md` dosyasına bakın.

## Redis Sidecar'ı

OmniRoute, dağıtık hız sınırlayıcıyı ve paylaşılan önbelleği desteklemek için Redis'e ihtiyaç duyar. `redis` hizmeti `docker-compose.yml` içinde **her zaman tanımlıdır** (herhangi bir profil kısıtlaması yoktur) ve diğer tüm profillerle birlikte başlatılır.

| Ayrıntı                                    | Değer                                       |
| ------------------------------------------ | ------------------------------------------- |
| İmaj                                       | `redis:7-alpine`                            |
| Konteyner adı                              | `omniroute-redis`                           |
| Dahili port                                | `6379`                                      |
| Ana makine portu (geçersiz kılma)          | `REDIS_PORT` (varsayılan: `6379`)           |
| Ana makine bağlama adresi (geçersiz kılma) | `REDIS_BIND_HOST` (varsayılan: `127.0.0.1`) |
| Birim                                      | `omniroute-redis-data` → `/data`            |
| Sağlık denetimi                            | `redis-cli ping` (10 sn aralıkla)           |

İlgili ortam değişkenleri:

- `REDIS_URL` — uygulamaya aktarılan bağlantı dizesi (varsayılan olarak `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri için ana makine tarafındaki port eşlemesi.
- `REDIS_BIND_HOST` — portun yayımlandığı ana makine ağ arayüzü. Varsayılan değeri `127.0.0.1`'dir.

> **Neden varsayılan olarak geri döngü adresi kullanılır:** Sidecar, `requirepass` olmadan çalışır ve uygulama
> konteynerleri ona compose ağı (`redis:6379`) üzerinden erişir — yayımlanan port yalnızca
> ana makine tarafındaki araçlar (`redis-cli`, yerel bir `npm run dev`) içindir. Portu
> `0.0.0.0` üzerinde yayımlamak, kimlik doğrulaması olmayan bir Redis'i LAN'ınızdaki tüm ana makinelere açar. Eğer
> `REDIS_BIND_HOST=0.0.0.0` olarak ayarlarsanız, hizmetin `command:` alanına `--requirepass` seçeneğini de ekleyin.

**Redis'in devre dışı bırakılması** önerilmez (hız sınırlayıcı, bellek içi geri dönüş mekanizmasına geçerek daha düşük işlevsellikle çalışır). Bunu yapmak zorundaysanız `docker-compose.yml` içindeki `redis:` hizmet bloğunu kaldırın/yorum satırına dönüştürün veya hizmeti sıfıra ölçekleyin:

```bash
docker compose up -d --scale redis=0
```

## Üretim Compose Yapılandırması

Geliştirme ortamıyla birlikte çalışan yalıtılmış bir üretim anlık görüntüsü için `docker-compose.prod.yml` dosyasını kullanın.

| Ayrıntı               | Değer                                                                             |
| --------------------- | --------------------------------------------------------------------------------- |
| Dosya                 | `docker-compose.prod.yml`                                                         |
| Varsayılan pano portu | `PROD_DASHBOARD_PORT=20130` (dahili `${DASHBOARD_PORT:-20128}` portuna eşlenir)   |
| Varsayılan API portu  | `PROD_API_PORT=20131`                                                             |
| İmaj                  | `omniroute:prod` (`runner-cli` hedefinden oluşturulur)                            |
| Redis konteyneri      | `omniroute-redis-prod` (`redis:8.6.2`, ayrılmış `redis-prod-data` birimi)         |
| Veri birimi           | `omniroute-prod-data` (adlandırılmıştır, yeniden oluşturmalar arasında korunur)   |
| Sağlık denetimleri    | `node healthcheck.mjs` + `redis-cli ping`; `depends_on`, Redis sağlığına bağlıdır |

Kullanımı:

```bash
# Üretim yığınını oluşturun ve başlatın
docker compose -f docker-compose.prod.yml up -d --build

# Günlükleri akış halinde görüntüleyin
docker compose -f docker-compose.prod.yml logs -f

# Kapatın (birimleri koruyun)
docker compose -f docker-compose.prod.yml down
```

Üretim yığını, geliştirme compose yapılandırmasıyla paralel olarak çalışır (konteyner adları, portlar ve birimler farklıdır); böylece üretim çalışmaya devam ederken yerel olarak geliştirmeyi sürdürebilirsiniz.

## Dockerfile Aşamaları

Depo, çok aşamalı bir Dockerfile (`Dockerfile`) ile gelir. Dört aşama kullanıma sunulur; kullanım senaryonuz için doğru `target` değerini seçin.

| Aşama         | Temel imaj            | Amaç                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Bağımlılıkları yükler (`npm ci --legacy-peer-deps`) ve `npm run build` komutunu çalıştırır (varsayılan olarak Turbopack — aşağıdaki Derleme zamanı kaynakları bölümüne bakın)                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Next.js bağımsız çıktısını içeren üretim çalışma ortamı. **Sağlayıcı CLI'ları dahil değildir.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` ve global CLI'ları ekler: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Aracı tabanlı iş akışları için bunu seçin.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Web oturumu sağlayıcıları için Playwright ve bir Chromium tarayıcısı (`--with-deps`) ekler: `gemini-web`, `claude-web`, `claude-turnstile`. **Bu sağlayıcıları kullanıyorsanız bunu seçin** — düz imaj bunlar olmadan istek sırasında başarısız olur (Sürüm Kanalları altındaki `-web` notuna bakın). |

Belirli bir hedefi manuel olarak derleyin:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Derleme zamanı kaynakları

Üç derleme argümanı, `builder` aşamasının kaynak maliyetini kontrol eder. Bunlar yalnızca derleme zamanında geçerlidir —
`OMNIROUTE_MEMORY_MB` (aşağıda) ayrı bir çalışma zamanı ayarıdır.

| Derleme argümanı            | Varsayılan | Etki                                                                                                     |
| --------------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`        | `0`, bunun yerine webpack ile derler. En yüksek bellek kullanımı daha düşük, ancak daha yavaştır.        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Başlatılan `next build` için V8 yığın sınırı (`--max-old-space-size`).                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL` değerini sağlar; Next, sayfa verisi toplama için `workers = N - 1` değerini türetir. |

`OMNIROUTE_BUILD_WORKERS`, büyük bir derleme makinesinde artırılması gereken ve
kısıtlı kaynaklara sahip bir derleme **`✓ Compiled successfully` sonrasında** başarısız olduğunda
şüphelenilmesi gereken ayardır. Her sayfa verisi worker'ı ayrı bir süreçtir ve üst
`next build` sürecinin kendisi de öyledir; canlı bir VPS yeniden üretimi (issue #7518),
her sürecin en yüksek RSS değerini `NODE_OPTIONS` yığın bayrağından bağımsız olarak
~4.5 GB ölçmüştür (Turbopack, V8 yığınının dışındaki yerel/Rust belleğinde derleme yapar).
Varsayılan `2` değeri (→ 1 worker, toplam 2 süreç), yayımlama işlem hattının kullandığı
16 GB / 4 vCPU GitHub tarafından barındırılan runner'lar için boyutlandırılmıştır.
`8` değerinde (→ 7 worker) bu runner'ın belleği tükendi ve buildkit,
`ResourceExhausted: ... cannot allocate memory` hatasıyla adımı başarısız kıldı;
süreç başına RSS çıkarım yoluyla belirlenmek yerine doğrudan ölçüldüğünde `3`
(→ 2 worker) değeri de hâlâ belleğe sığmadı. `tests/unit/docker-build-memory-budget.test.ts`,
ölçülen değere göre hesaplama yapar ve ayarlardan biri runner'ın kapasitesini aşarsa
başarısız olur.

Turbopack, V8 yığınının **dışında** bulunan yerel Rust belleğinde derleme yaptığından
`OMNIROUTE_BUILD_MEMORY_MB` bu belleği sınırlamaz. Bellek sınırı olan bir ana makinede
derleme, hiçbir hata metni olmadan OOM killer tarafından SIGKILL ile sonlandırılır —
`Creating an optimized production build` sırasında öylece durur; bu durum, bellek
yetersizliğinden çok takılma gibi görünür. Derleme ana makinesinin kaynakları kısıtlıysa
paketleyiciyi değiştirin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` etkindir; dolayısıyla `next build`, bir üst süreç **ve** bir worker
süreci çalıştırır ve her biri `OMNIROUTE_BUILD_MEMORY_MB` değerini ayrı ayrı uygular.
Konteyner sınırını bu değerin bir katının değil, yaklaşık iki katının üzerinde belirleyin.

Bu kaynak ağacında ölçülen sonuçlar (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketleyici | Konteyner sınırı | Sonuç                                                |
| ----------- | ---------------- | ---------------------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB   | Her ikisinde de sessizce OOM nedeniyle sonlandırıldı |
| webpack     | 8 GiB            | Derleme worker'ı SIGKILL ile sonlandırıldı           |
| webpack     | 12 GiB           | Başarılı oldu, en yüksek kullanım 11.1 GiB           |

### Çalışma zamanı varsayılanları

`runner-base` tarafından dışa aktarılan varsayılanlar: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker'daki bellek davranışı:

- İmaj, `OMNIROUTE_MEMORY_MB=1024` değerini ayarlar ve bundan `NODE_OPTIONS=--max-old-space-size=1024` değerini türetir.
- Asıl sunucu süreci, `OMNIROUTE_MEMORY_MB` değerini okuyan ve `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` seçeneğini ekleyen bağımsız başlatıcı tarafından başlatılır.
- Node, yinelenen `--max-old-space-size` değerlerinden sonuncusunu kullanır; dolayısıyla `OMNIROUTE_MEMORY_MB` ayarı, etkin Docker heap sınırını kontrol eder.
- İmaj bu değeri her zaman ayarladığı için başlatıcının RAM'e göre kalibre edilen yedek değeri Docker altında hiçbir zaman uygulanmaz. İş yükü için bu değeri açıkça artırın (aşağıdaki tabloya bakın). `2048`, kodlama aracılarının `/v1/responses` istekleri için hâlâ çok küçüktür.

### Kodlama aracıları için çalışma zamanı RAM'i

1 GiB'lık varsayılan Docker değeri, üretim boyutu değil, pano/hafif sohbet için alt sınırdır. Uzun `POST /v1/responses` gövdeleri (yüzlerce mesaj, onlarca araç), sıkıştırma sırasında birden fazla bellek içi grafiği bellekte tutar. Çakışan yaklaşık 3 MiB / yaklaşık 750 bin token'lık iki istek, **12 GiB** old-space değerinde V8'i durdurmuş (`FATAL ERROR: Reached heap limit`) ve ayrıca 16 GiB'lık cgroup OOM sınırına ulaşmıştır. Bkz. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

**cgroup `--memory` değerini heap'in üzerinde** boyutlandırın — yerel tamponlar, SQLite ve sıkıştırma ara verileri V8'in dışında bulunur.

| İş yükü                                 | `OMNIROUTE_MEMORY_MB`     | Konteyner / cgroup           | Notlar                                                                                                                     |
| --------------------------------------- | ------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Pano, tek bir hafif sohbet              | `1024` (imaj varsayılanı) | ≥2 GiB                       |                                                                                                                            |
| Bir kodlama aracısı (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                      | Tipik tek oturumlu `/v1/responses`                                                                                         |
| Eşzamanlı iki uzun `/v1/responses`      | `10240`–`12288`           | ≥12–16 GiB                   | Yaklaşık 12 GiB heap değerinde ölçülen V8 durması                                                                          |
| Eşzamanlı üçten fazla uzun bağlam       | tek süreçte kullanmayın   | sıraya alın / daha fazla RAM | Varsayılan ağır iş kabulü, aynı anda yürütülen 1 işlemdir; RAM'i artırmadan bunu yükseltmek durmayı yeniden ortaya çıkarır |

`OMNIROUTE_MEMORY_MB` **ayarlanmamışsa**, bare metal üzerinde `omniroute serve` RAM'in yaklaşık %35'ine göre kalibrasyon yapar (`[512, 4096]` aralığıyla sınırlandırılır). Docker her zaman `1024` değerini ayarladığı için bu kalibrasyon resmî imajda hiçbir zaman çalışmaz.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritik Ortam Değişkenleri

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) belgesinde açıklanan varsayılanların yanı sıra, Docker altında çalıştırırken en önemli değişkenler şunlardır:

| Değişken                      | Amaç                                                                                                                                                                                                                                                                                    | Varsayılan                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket köprüsü için paylaşılan gizli anahtar. **Üretim ortamında zorunludur** — güçlü ve rastgele bir dize olarak ayarlayın.                                                                                                                                                         | ayarlanmamış (sağlanmalıdır) |
| `REDIS_URL`                   | Hız sınırlayıcı / önbellek arka ucu için bağlantı dizesi                                                                                                                                                                                                                                | `redis://redis:6379`         |
| `REDIS_PORT`                  | Birlikte sunulan Redis konteyneri için ana makine tarafındaki port                                                                                                                                                                                                                      | `6379`                       |
| `REDIS_BIND_HOST`             | Birlikte sunulan Redis portunun yayımlandığı ana makine arayüzü (AUTH eklemediğiniz sürece geri döngü)                                                                                                                                                                                  | `127.0.0.1`                  |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Kendi kendini güncelleme iş akışları için `cli` profilinde `/workspace/omniroute` konumuna bağlanan ana makine yolu                                                                                                                                                                     | `.` (geçerli dizin)          |
| `OMNIROUTE_MEMORY_MB`         | Bağımsız Docker sunucusu için çalışma zamanı Node yığın belleği üst sınırı; yukarıdaki imaj varsayılanını geçersiz kılar. Kodlama ajanları: `8192`+ ([çalışma zamanı RAM'i](#runtime-ram-for-coding-agents) bölümüne bakın).                                                            | `1024`                       |
| `DASHBOARD_PORT` / `API_PORT` | Kontrol paneli (20128) ve API (20129) için dışa açılan portları geçersiz kılar                                                                                                                                                                                                          | `20128` / `20129`            |
| `APP_BIND_HOST`               | docker-compose'un kontrol paneli/API/canlı WS portlarını yayımladığı ana makine arayüzü. `REQUIRE_API_KEY=false` (varsayılan) olduğunda, `0.0.0.0` anonim `/v1` proxy'sini LAN'a açar — kapsamı yalnızca `REQUIRE_API_KEY=true` ile veya önüne bir ters proxy yerleştirerek genişletin. | `127.0.0.1`                  |
| `CLIPROXY_BIND_HOST`          | docker-compose'un `cliproxyapi` yan konteynerini yayımladığı ana makine arayüzü — veri birimi sağlayıcı kimlik bilgilerini barındırır.                                                                                                                                                  | `127.0.0.1`                  |
| `OMNIROUTE_PLUGINS_DIR`       | Çalışma zamanı eklenti tarayıcısının okuduğu ve kurulum yaptığı dizin. Eklentiler bağlama yoluyla monte edildiğinde bunu ayarlayın: varsayılan değer, bir imajın dışa aktarması gerekmeyen `HOME` değişkenini izler.                                                                    | `~/.omniroute/plugins`       |
| `OMNIROUTE_BASE_PATH`         | Uygulama bir ters proxy arkasında yayımlandığında kullanılan URL alt yolu (ör. `/omniroute`)                                                                                                                                                                                            | _(boş = kök)_                |
| `NEXT_PUBLIC_BASE_URL`        | Alt yolu içeren herkese açık tarayıcı kaynağı (ör. `https://host/omniroute`)                                                                                                                                                                                                            | ayarlanmamış                 |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` için ana makine tarafındaki kontrol paneli portu                                                                                                                                                                                                              | `20130`                      |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yan konteyneri için ana makine tarafındaki port                                                                                                                                                                                                                           | `8317`                       |

## Alt Yolda Ters Proxy (Traefik / nginx)

Next.js `basePath`, bağımsız pakete derlenir. OmniRoute, derleme sırasında belirlenen
değeri uygulama kökündeki bir işaretçi dosyasına kaydeder (`npm run build` sırasında
yazılır; `scripts/docker/ensure-docker-base-path.mjs` tarafından okunur) ve konteyner
başlatıldığında bunu `OMNIROUTE_BASE_PATH` ile karşılaştırır. Değerler farklıysa ve imaj
etki alanı kökü için oluşturulmuşsa giriş noktası; bağımsız manifestleri, gömülü
`basePath`/`assetPrefix` sabit değerlerini (Next 16, SSR varlık URL'lerini yalnızca
`assetPrefix` üzerinden oluşturur — yama aracı alt yolu buna da yansıtır), derleme
sırasında belirlenen `/_next/static` varlık URL'lerini (istemci referansı manifestleri,
medya içe aktarımları, önceden oluşturulmuş hata sayfaları) ve istemci `process.env`
uyarlamasını `node dev/run-standalone.mjs` çalışmadan önce yeniden yazar.

### Compose ile derleme (önerilen)

İmaj ile çalışma zamanı ayarlarının eşleşmesi için `.env` içinde her iki değişkeni de
ayarlayın, ardından yeniden derleyin:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` değerini hem Docker derleme argümanı hem de
çalışma zamanı ortam değişkeni olarak iletir.

### Önceden oluşturulmuş kök imajı + çalışma zamanı alt yolu

Yayımlanmış `diegosouzapw/omniroute:*` imajları etki alanı kökü için oluşturulmuştur.
Yine de çalışma zamanında `OMNIROUTE_BASE_PATH` ayarlayabilirsiniz; konteyner, başlangıçta
paketi bir kez yamalar. Bunu eşleşen genel kaynak adresiyle birlikte kullanın:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ters proxy'yi **tam** harici yolu iletecek şekilde yapılandırın (öneki kaldırmayın).
Traefik, `PathPrefix(`/omniroute`)` yolunu `StripPrefix` olmadan konteynere yönlendirmelidir;
böylece Next.js `/omniroute/...` yolunu alır ve varlıkları
`/omniroute/_next/...` üzerinden sunar.

Docker sistem durumu denetimi, etkin `OMNIROUTE_BASE_PATH` ile ön eklenmiş hafif
`/healthz` yaşam döngüsü uç noktasını yoklar. `/api/monitoring/health`, insan/pano
tanılamaları için kullanılabilir olmaya devam eder; konteyner HEALTHCHECK denetimini
yeniden bu uç noktaya yönlendirmek için (örneğin kapsamlı sistem durumu denetimini
zorunlu kılmak amacıyla) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ayarlayın.
Bu yol **kapsamlı** bir denetimdir (veritabanı + izleme özeti) — yeniden etkinleştirmeyi
tercih ederseniz Docker'ın seyrek `HEALTHCHECK` denetimi için uygundur, ancak Kubernetes
`livenessProbe` aralıkları için **uygun değildir**.

Orkestratörler (Kubernetes, Nomad vb.) için:

| Yoklama           | Tercih Edin                                                                     | Kaçının                                                              |
| ----------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Canlılık          | HTTP `GET /livez` veya ana bağlantı noktasında TCP (`PORT`, varsayılan `20128`) | Canlılık denetimi olarak `/api/monitoring/health`                    |
| Hazır olma        | HTTP `GET /healthz`                                                             | Olay döngüsünün meşgul olmasını çalışmıyor sayan kısa zaman aşımları |
| Kapsamlı / dıştan | `/api/monitoring/health`                                                        | —                                                                    |

`/healthz`, süreç yaşam döngüsünü (`ok` / `starting` / `stopping`) bildirir. `/livez`
yalnızca sürecin çalıştığını belirtir (işleyici çalışabildiği sürece 200 döndürür;
hazır olmayı beklemez). Her ikisi de istek işleme ile aynı Node olay döngüsünde
çalıştığından CPU'ya bağlı katalog veya sıkıştırma işlemleri bunları geciktirebilir —
meşgul ≠ çalışmıyor. HTTP yoklamaları zaman aşımına uğrarsa TCP canlılık denetimini
tercih edin. Tüm yoklama yönergeleri:
[İzleme kılavuzu — Kubernetes yoklama önerileri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy ile Docker Compose (HTTPS Otomatik TLS)

OmniRoute, Caddy'nin otomatik SSL sağlama özelliği kullanılarak güvenli bir şekilde dışarı açılabilir. Alan adınızın DNS A kaydının sunucunuzun IP adresini gösterdiğinden emin olun.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # OAuth geri çağrıları, pano bağlantıları ve oluşturulan herkese açık URL'ler için tarayıcıya yönelik kaynak.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Zamanlanmış işler / kendi kendine yapılan istekler için dahili sunucudan sunucuya URL.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy, yukarı akış kapsayıcısı için standart yönlendirme başlıklarını ayarlar. OmniRoute, OAuth geri çağrıları ve oluşturulan herkese açık bağlantılar için `NEXT_PUBLIC_BASE_URL` değerini kanonik genel kaynak olarak kullanır; kimliği doğrulanmış pano yazma işlemleri, oturuma bağlı CSRF korumasıyla birlikte aynı kaynaklı istekleri kullanır. `OMNIROUTE_TRUST_PROXY` seçeneğini yalnızca OmniRoute'un genel kaynağı açık yapılandırma yerine güvenilir yönlendirilmiş başlıklardan türetmesini bilinçli olarak istediğiniz gelişmiş dağıtımlarda etkinleştirin.

## Cloudflare Hızlı Tüneli

Docker dağıtımlarına yönelik pano desteği, `Dashboard → Endpoints` konumunda tek tıklamalı bir **Cloudflare Hızlı Tüneli** içerir. İlk etkinleştirme, yalnızca gerektiğinde `cloudflared` dosyasını indirir, mevcut `/v1` uç noktanıza geçici bir tünel başlatır ve oluşturulan `https://*.trycloudflare.com/v1` URL'sini normal genel URL'nizin hemen altında gösterir.

Uç nokta tüneli panelleri (Cloudflare, Tailscale, ngrok), etkin tünel durumu değiştirilmeden `Settings → Appearance` konumundan gösterilebilir veya gizlenebilir.

### Tünel Notları

- Hızlı Tünel URL'leri geçicidir ve her yeniden başlatmadan sonra değişir.
- Hızlı Tüneller, OmniRoute veya kapsayıcı yeniden başlatıldıktan sonra otomatik olarak geri yüklenmez. Gerektiğinde bunları panodan yeniden etkinleştirin.
- Yönetilen kurulum şu anda `x64` / `arm64` üzerinde Linux, macOS ve Windows'u desteklemektedir.
- Yönetilen Hızlı Tüneller, kısıtlı kapsayıcı ortamlarındaki gürültülü QUIC UDP arabellek uyarılarını önlemek için varsayılan olarak HTTP/2 aktarımını kullanır. Farklı bir aktarım istiyorsanız `CLOUDFLARED_PROTOCOL=quic` veya `auto` olarak ayarlayın.
- Docker imajları, sistem CA köklerini içerir ve bunları yönetilen `cloudflared` sürecine iletir; bu sayede tünel kapsayıcı içinde başlatılırken TLS güven hataları önlenir.
- OmniRoute'un bir dosyayı indirmek yerine mevcut bir ikili dosyayı kullanmasını istiyorsanız `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` olarak ayarlayın.

## İmaj Etiketleri

| İmaj                     | Etiket   | Boyut  | Açıklama                                                    |
| ------------------------ | -------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | En yüksek **yayımlanmış** kararlı SemVer (git `main` değil) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps için bu etiket sınıfını sabitleyin                   |

Çok platformlu manifest: yerel `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker, eşleşen mimariyi otomatik olarak seçer; ARM ana makinelerinde AMD64 emülasyonunu zorunlu kılmanız gerekiyorsa `--platform linux/amd64` parametresini geçin.

### Sürüm Kanalları

OmniRoute; kararlı sürümler, etkin sürüm dalı testleri ve geliştirme derlemeleri için ayrı Docker kanalları yayımlar.

| Kanal                           | Kaynak                                   | Değiştirilebilirlik                    | Önerilen kullanım                                                                                                                          |
| ------------------------------- | ---------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | İmzalı/sürümlendirilmiş sürüm            | Değiştirilemez                         | Tam bir sürüme sabitlenen üretim dağıtımları                                                                                               |
| `:latest` / `:latest-web`       | En yüksek **yayımlanmış** kararlı SemVer | Değiştirilebilir kararlı işaretçi      | Bir SemVer yayımlama işinden **sonra** kararlı sürümleri takip eder — `main` veya yayımlanmamış `release/v*` commit'lerini takip **etmez** |
| `:next` / `:next-web`           | Geçerli varsayılan `release/v*` dalı     | Değiştirilebilir ön sürüm işaretçisi   | Etkin sürüm dalına eklenmiş ancak henüz kararlı bir sürümde bulunmayan düzeltmeleri test etme                                              |
| `:main` / `:main-web`           | `main` dalı                              | Değiştirilebilir geliştirme işaretçisi | Yalnızca geliştirme ve entegrasyon testleri                                                                                                |

#### Web oturumu sağlayıcıları: `-web` imajları

Yukarıdaki her kanal, `runner-web` aşamasından derlenen bir `-web` etiketi (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) olarak da sunulur — aynı imaja Playwright ve bir Chromium tarayıcısı eklenmiştir. Düz imaj Chromium **içermez**; `gemini-web`, `claude-web` ve `claude-turnstile` buna ihtiyaç duyar.

Hata başlangıçta değil, ertelenmiş olarak ortaya çıkar: bu sağlayıcılar modellerini listeler ve kontrol panelinde bağlı olarak görünür; yalnızca ilk istek aşağıdaki hatayla başarısız olur:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Bu sağlayıcıları kullanıyorsanız, zaten kullandığınız kanalın `-web` etiketini çekin — başka hiçbir şey değişmez. npm/CLI kurulumunda (Docker imajı olmadan) eksik olan eşdeğer bileşen tarayıcı ikili dosyasıdır: ana makinede `npx playwright install chromium` komutunu çalıştırın.

#### Ön sürüm kanalını kullanma

`next` kanalı, geçerli varsayılan `release/v*` dalına yapılan her push işleminde yeniden derlenir ve hem AMD64 hem de ARM64 için yayımlanır. Daha eski bakım dalları bunun üzerine yazamaz. Bu kanal, bir sonraki kararlı etiket oluşturulmadan önce etkin sürüm dalına birleştirilmiş düzeltmeler için çekilebilir bir imaj sağlar.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose için seçilen profilin kullandığı imaj etiketini geçersiz kılın, ardından hizmeti çekip yeniden oluşturun:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Güvenlik ve geri alma

`next`, değişken bir ön sürüm kanalıdır. Etkin sürüm dalına yapılan herhangi bir push işleminde değişebilir ve **üretim kullanımı için desteklenmez**. Belirli bir derlemeyi değerlendirirken imaj özetini sabitleyin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Testten önce OmniRoute veri birimini veya bağlama yoluyla eklenmiş veri dizinini yedekleyin. Geri almak için daha önce kullanılan kararlı sürümü veya özeti geri yükleyip kapsayıcıyı yeniden oluşturun:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Bir sürüm dalı derlemesi `latest` etiketini hiçbir zaman taşıyamaz; kararlı işaretçiyi yalnızca uygun bir kararlı semantik sürüm ilerletebilir. `next` imajları, sürüm imajı denetimini ve engelleyici CRITICAL güvenlik açığı kapısını korur.

**`latest`, git için bir güncellik garantisi değildir.** `main` veya etkin `release/v*` dalına birleştirilen düzeltmeler, kararlı bir SemVer imajı yayımlanana ve yayımlama işi `:latest` etiketini ilerletene kadar (ilgili SemVer ile aynı özet) `:latest` içinde **yer almaz**. GitHub düzeltmeyi zaten gösterirken `latest` donmuş görünüyorsa sürüm dalını test etmek için `:next` etiketini çekin veya SemVer etiketini bekleyin.

| İstediğiniz                                                                              | Kullanım                                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Sapma olmaması gereken GitOps / üretim                                                   | `:X.Y.Z` etiketini (veya imaj özetini) sabitleyin |
| Yayımlanmış kararlı sürümleri takip etmek ve her sürümde yeniden oluşturmayı kabul etmek | `:latest`                                         |
| Yayımlanmamış `release/v*` commit'lerini test etmek                                      | `:next` (üretim için değil)                       |
| `main` dalını test etmek                                                                 | `:main` (üretim için değil)                       |

## Kullanılabilirlik: varsayılan SQLite tek replikalıdır

Standart Docker / Kubernetes OmniRoute, **bir Node işlemi + bir SQLite yazıcısından** oluşur. Bu topolojide yüksek kullanılabilirlik **desteklenmez**.

| Kısıt                                                            | Sonuç                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tek yazıcı                                                       | Aynı SQLite dosyasına karşı birden fazla replika **çalıştırmayın**. Bu, veritabanını bozar.                                                                                                                                                                                                                                                                |
| Yeniden oluşturma / yeniden başlatma / HEALTHCHECK sonlandırması | Devam eden SSE bağlantıları, pano oturumları ve bellek içi durum için **tam kesinti** oluşur. Bağlı tüm istemcilerin bağlantısı kesilir. Uç noktanın bulunmadığı zaman aralığındaki yeni istekler, OmniRoute JSON'u yerine ters proxy kaynaklı **`502 Bad Gateway: Unknown error`** alır — istemciler bunu bir sağlayıcı hatasından ayırt edemez (#11015). |
| `/healthz` ile aynı olay döngüsü                                 | Yoğun bir katalog veya sıkıştırma çevrimi yoklamaları geciktirebilir; kısa bir zaman aşımı da **tek** replikayı yeniden başlatır.                                                                                                                                                                                                                          |

**Yoklama matrisi** (ayrıca bkz. [Kubernetes yoklama önerileri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Yoklama                       | Hedef                                                               | Kullanmayın                                                                                 |
| ----------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Canlılık                      | `PORT` üzerinde TCP (varsayılan `20128`) veya esnek HTTP `/healthz` | `/api/monitoring/health`                                                                    |
| Hazır olma                    | HTTP `GET /healthz`                                                 | Olay döngüsünün yoğunluğunu hizmetin çalışmadığı şeklinde değerlendiren kısa zaman aşımları |
| Derinlemesine / insanlar için | `/api/monitoring/health`                                            | Otomatik kubelet canlılık yoklaması                                                         |

**Yükseltmeler:** her oturumun kesilmesini bekleyin. Mümkünse istemci trafiğini tahliye edin; varsayılan SQLite üzerinde kesintisiz güncelleme yoktur. Compose `restart: unless-stopped` ile Docker `HEALTHCHECK` birleşimi de konteyner Sağlıksız olduğunda tek işlemi değiştirecektir — etki alanı aynıdır.

**Tek replika** için Kubernetes parçası (Recreate gereklidir; tek bir SQLite dosyasına karşı `replicas` değerini artırmayın):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` beklemesi, SIGTERM'den önce kube'un Service uç noktalarını kaldırmasına olanak tanır; böylece **yeni** trafik sonlandırılmakta olan işleme yönlendirilmez. Devam eden `/v1/responses` SSE bağlantıları, ağır kabul kiraları aracılığıyla `SHUTDOWN_TIMEOUT_MS` süresine (varsayılan 30 sn) kadar tahliye edilir (#11015). İşleme yine de ulaşan yeni istekler `503` + `Retry-After: 5` alır. Yeni işlem Ready olana kadar Recreate nedeniyle oluşan uç noktasız boşluk, tam bir kesinti olmaya devam eder — bu, bir yoklama yanlış yapılandırması değil, SQLite topolojisinin sonucudur.

Harici Postgres / çok yazıcılı HA, belgelenmiş standart bir yol **değildir**. HA'ya ihtiyacınız varsa tek bir replika kullanmaya devam edin veya projenin ayrıca test edip belgelendirdiği bir topolojiyi çalıştırın. Postgres/MySQL çalışmaları [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) kapsamında yürütülmektedir. Bu özellik yayımlanana kadar **büyük** `/v1/responses` kapasitesini artırmanın desteklenen tek yolu, tek bir birim üzerinde `replicas > 1` kullanmak değil, birbirinden bağımsız N işlem çalıştırmaktır (sonraki bölüm).

## Yatay ölçekleme: N bağımsız süreç

Bir Node süreci **tek bir V8 heap’idir**. Birbiriyle çakışan yaklaşık 3 MiB / yaklaşık 750 bin token’lık iki kodlama aracısı `POST /v1/responses` isteği (RTK + Caveman), yaklaşık 12 Gi değerinde bu heap’in sonlandırılmasına (`FATAL ERROR: Reached heap limit`) ve 16 Gi boyutundaki bir cgroup’un OOM yaşamasına neden olabilir. Bkz. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Bu ölçüm, eşzamanlı uzun `/v1/responses` istekleri için ürüne ait kesin bir üst sınır olan iki değerini değil, bir **bellek bütçesi** uyarısını ifade eder. Ağır sohbet kabulü, aynı V8/cgroup sınırından boyutlandırılan ve otomatik olarak türetilen bir alım bayt bütçesi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) tarafından kontrol edilir — zaten boyutlandırılmış bir süreçte bunu yukarı doğru geçersiz kılmak (veya eski `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` istek sayısı sınırını ayarlamak) sonlandırma sorununu yeniden ortaya çıkarır. Küçük sohbetler, `/healthz`, `/v1/models` ve MCP bu sınırın kapsamında **değildir**.

### Tek süreç: ikiden fazla uzun `/v1/responses`

**Sağlıklı** bir süreç (heap, varsayılan değeri `0.75` olan `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` değerinin altında olduğunda), süreç genelindeki işlemdeki bayt bütçesinde (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hâlâ yer varsa ikiden fazla eşzamanlı uzun `POST /v1/responses` isteği çalıştırabilir. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` değerine (varsayılan 256 KiB) eşit veya bundan büyük gövdeler, yapı bakımından ağır isteklerle aynı ağır iş yükü kiralamasını alır ve aynı [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` kaçışını (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) kullanır. Onlarca eşzamanlı uzun SSE istemcisi (operatörler genellikle 40–50 istemciye ihtiyaç duyar) bir **bellek bütçesi** meselesidir — heap + birincil/ek kapasite yuvaları + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` değerlerini uygun şekilde boyutlandırın — kesin bir “en fazla 2” ürün sınırı değildir. Baskı altındaki bir heap, #7849 sorununun geri dönmemesi için yeniden denenebilir `503` yanıtlarıyla yük atmaya devam eder.

**Heap sayısını artırmak** (bağımsız V8 old-space’leri) için **bugün**:

| Yapın                                                                                                                                                                   | Yapmayın                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Her biri **kendi** `DATA_DIR` / birimine sahip **N container/pod** çalıştırın                                                                                           | Tek bir SQLite dosyasına karşı `replicas > 1` ayarlamayın          |
| İşlemdeki ağır istekleri ve sağlıklı ek kapasiteyi heap / işlemdeki bayt bütçesine göre boyutlandırın; 1–2, kesin ürün üst sınırı değil, ihtiyatlı #7849 varsayılanıdır | Tek bir sürece 8 kat RAM ve sınırsız bir sayı sınırı vermeyin      |
| İsteğe bağlı: **paylaşılan kota sayaçları** için `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                   | Redis’i paylaşılan SQLite olarak değerlendirmeyin — öyle değildir  |
| Sağlayıcı gizli bilgilerini her örneğe çoğaltın (veya bölümlenmiş panoları kabul edin)                                                                                  | Örnekler genelinde tek bir pano / tek bir çağrı günlüğü beklemeyin |
| Önüne herhangi bir yük dengeleyici koyun; API anahtarına veya oturuma göre yapışkanlık yeterlidir                                                                       | Sağlayıcıya özgü, boyuta duyarlı bir ara yazılımı zorunlu tutmayın |

Donanım açısından, örnek başına eşzamanlı uzun `/v1/responses` sayısı bir **bellek bütçesi** meselesidir (heap + işlemdeki bayt / #10110). Bağımsız `N` adet `DATA_DIR` yine heap sayısını artırır: ana makine RAM’i “N=8 olan tek bir 16 Gi pod” yerine `N × cgroup` değerini karşılamalıdır. Tek bir SQLite dosyasında asla `replicas > 1` kullanmayın.

Compose taslağı (iki heap, iki birim — `deploy.replicas: 2` değil):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Süreç içi yoğunluk (HTTP isolate’ı dışında sıkıştırma) için bkz. [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Paylaşılan kalıcı durum üzerinde tek bir mantıksal küme için bkz. [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Önemli Notlar

- **SQLite WAL Modu:** OmniRoute'un en son değişiklikleri `storage.sqlite` dosyasına checkpoint edebilmesi için `docker stop` işleminin tamamlanmasına izin verilmelidir. Birlikte sunulan Compose dosyalarında 40 saniyelik durdurma ek süresi zaten ayarlanmıştır. İmajı doğrudan çalıştırıyorsanız `--stop-timeout 40` ayarını koruyun.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Rutin/yazma öncesi yedeklemeler harici olarak yönetiliyorsa `true` olarak ayarlayın. Mevcut veritabanı geçişleri yine de kendilerine ait kalıcı bir güvenlik anlık görüntüsü ve toplu geçiş koruması gerektirir.
- **Veri Kalıcılığı:** Veritabanınızı, anahtarlarınızı ve yapılandırmalarınızı konteyner yeniden başlatmaları arasında korumak için her zaman `/app/data` konumuna bir volume bağlayın.
- **Port Yapılandırması:** Varsayılan `20128` portunu değiştirmek için `PORT` ortam değişkenini geçersiz kılın.

## Ayrıca Bakınız

- [VM Dağıtım Kılavuzu](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare kurulumu
- [Fly.io Dağıtım Kılavuzu](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io'ya dağıtım
- [Ortam Yapılandırması](../reference/ENVIRONMENT.md) — Eksiksiz `.env` referansı
