# 🐳 Docker Guide — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Eksiksiz Docker dağıtım referansı. Hızlı başlangıç için [README Docker bölümüne](../README.md#-docker) bakın.

## İçindekiler

- [Hızlı Çalıştırma](#quick-run)
- [Ortam Dosyasıyla](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Kullanılabilir Profiller](#available-profiles)
- [OmniRoute Docker'da çalışırken ana makinedeki CLI araçlarını yapılandırma](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Üretim İçin Compose](#production-compose)
- [Dockerfile Aşamaları](#dockerfile-stages)
- [Kritik Ortam Değişkenleri](#critical-environment-variables)
- [Caddy ile Docker Compose (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Hızlı Tüneli](#cloudflare-quick-tunnel)
- [İmaj Etiketleri](#image-tags)
- [Kullanılabilirlik: Varsayılan SQLite tek replikalıdır](#availability-default-sqlite-is-single-replica)
- [Docker içindeki Gemini bölgesel hataları](#gemini-regional-errors-inside-docker)
- [Önemli Notlar](#important-notes)

---

## Hızlı Çalıştırma

> **Tek komutla kendi sunucunuzda barındırmak mı istiyorsunuz?**
> [Kendi Sunucunuzda Barındırma Kılavuzu'na](../getting-started/SELF_HOST_GUIDE.md) bakın —
> `docker compose -f docker-compose.selfhost.yml up -d` (yayımlanmış imaj +
> Redis, yalnızca geri döngü arayüzü, profil seçimi yok). Aşağıdaki Hızlı Çalıştırma,
> Redis'i hâlihazırda başka bir yerde çalıştıran kullanıcılar için tek konteynerli
> yöntemdir.

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
# Önce .env dosyasını kopyalayıp düzenleyin
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
# Temel profil (CLI aracı yok)
docker compose --profile base up -d

# CLI profili (Claude Code, Codex ve OpenClaw yerleşik olarak bulunur)
docker compose --profile cli up -d

# Ana makine profili (öncelikle Linux için; ana makinedeki CLI ikili dosyalarını salt okunur bağlar)
docker compose --profile host up -d

# Web profili (web oturumu sağlayıcıları için Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar'ını birleştirin
docker compose --profile cli --profile cliproxyapi up -d
```

## Kullanılabilir Profiller

OmniRoute, temel dağıtım biçimleri için Compose profilleriyle birlikte gelir. Ortamınıza uygun olanı seçin.

| Profil              | Hizmet           | Kullanım durumu                                                                                                                                                 | Komut                                        |
| ------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (varsayılan) | `omniroute-base` | Başsız sunucu / minimum çalışma zamanı; sağlayıcı CLI'ları dahil değildir                                                                                       | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | `omniroute providers/setup/doctor` ve paketlenmiş CLI'ları (Codex, Claude Code, Droid, OpenClaw) çağıran ajan tabanlı iş akışları                               | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` vb. dizinleri salt okunur bağlayarak ana makinedeki CLI'lara `network_mode` benzeri erişim isteyen Linux ana makineleri | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Üst kaynak CLI proxy işlemleri için [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar'ını `8317` portunda çalıştırın                          | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Tarayıcı gerektiren web oturumu sağlayıcıları: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` derlenir, Chromium dahildir)                        | `docker compose --profile web up -d`         |

> Birden fazla profil birleştirilebilir: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker'da çalışırken ana makine CLI araçlarını yapılandırma

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ve kontrol panelindeki
**Yapılandırmayı kaydet** düğmesi, `~/.codex/*.config.toml` gibi dosyalara yazma işlemi yapar. Bu yollar
yalnızca CLI'ın gerçekten çalıştığı makinede anlamlıdır. Bunları container'ın içinde
çalıştırırsanız yazma işlemi, container'ın kendi ana dizininde (`/home/node` —
imaj `USER node` ile çalışır) gerçekleşir; hiçbir ana makine CLI'ı buradaki dosyaları okumaz ve
container yeniden oluşturulduğu anda bu dosyalar silinir.

OmniRoute bunu algılar ve kullanamayacağınız bir başarı bildirmek yerine
yönergelerle birlikte yazma işlemini reddeder: CLI `2` koduyla çıkar ve API,
`containerEphemeralTarget: true` ile birlikte `422` yanıtını verir.

### Önerilen: CLI'ı ana makinede, OmniRoute'u Docker'da çalıştırın

Container API'ı sunar; CLI ise ana makinenizdeki araçları yapılandırır.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI'ı container'a yönlendirin
omniroute setup-codex                      # ana makinenizdeki gerçek ~/.codex dizinine yazar
```

Codex, Claude Code, Cursor veya benzeri araçlar dizüstü bilgisayarınızda çalışıyorsa
doğru seçim budur — olağan kurulum da budur.

### Alternatif: Ana makine yapılandırma dizinlerini bind mount ile bağlayın (`host` profili)

Container'ın ana makine yapılandırmanıza yazmasını istiyorsanız
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

Yolu güvenilir kılan şey bind mount'tur: OmniRoute,
`/proc/self/mountinfo` dosyasını okur ve bağlı yollara (ayrıca alt dizinleri bağlama noktası
olan dizinlere; yukarıdaki `/host-home` yapısı tam olarak böyledir) yazmaya izin verirken,
bağlı olmayan yollara yazmayı reddetmeye devam eder.

### Kaçış yolu: Container'ın kendi CLI'larını yapılandırın (ölçülü kullanın)

CLI'lar gerçekten container'ın içinde bulunduğunda (`cli` profili), yazma işlemi
kasıtlıdır. Herhangi bir `setup-*` komutuna `--allow-container-write` iletin veya sunucu için
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ayarını yapın. Yazma işlemi, container'dan
sonra kalıcı olmayacağına dair bir uyarıyla devam eder.

> **Güvenlik uyarısı — `cli` profili + `docker.sock` bağlaması.**
> `cli` profili, container içindeki otomatik güncelleyicinin ana makine daemon'ı üzerinden
> stack'i yeniden oluşturabilmesi için `/var/run/docker.sock` yolunu bind mount ile bağlar
> (`src/lib/system/autoUpdate.ts` bu socket'i kontrol eder ve mevcut olmadığında
> Docker yolunu atlar). Bu socket, **ana makinenin root yetkisine ilişkin bir güven
> sınırıdır**: socket'e erişebilen herhangi bir şey, ana makinenin Docker daemon'ını root
> olarak yönetir — ana makinedeki herhangi bir container'ı oluşturabilir, inceleyebilir,
> durdurabilir ve kaldırabilir. Bunun sonuçları:
>
> 1. **`cli` profilinin portunu asla ağa açmayın.** Portu
>    `127.0.0.1` üzerinde yayımlayın (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN üzerinden erişilebilen bir `cli` profili, kontrol paneli düzeyindeki herhangi bir RCE'yi
>    ana makinenin tamamen ele geçirilmesine dönüştürür.
> 2. **`cli` profiline başka hiçbir ana makine dizinini bağlamayın.**
>    Docker socket'iyle birlikte herhangi bir ek bağlama, container'a dosya sisteminiz ve
>    ana makine yapılandırmanız üzerinde tam okuma/yazma erişimi verir. Bir aracın bir
>    projeyi görmesi gerekiyorsa aracı CLI binary'siyle yerel olarak çalıştırın — projeyi
>    `cli` container'ına bağlamayın.
>
> Container içinde otomatik güncellemeye ihtiyacınız yoksa `cli` profilini kapalı tutun
> (`COMPOSE_PROFILES=core,redis` veya daha kısa bir değer). Diğer profiller
> Docker socket'ini bağlamaz.
>
> MITM ile ilgili tehdit modeli için `docs/security/MITM-TPROXY-DECRYPT.md` (git'te bulunur; `/docs` içine derlenmez)
> dosyasına, `codex`/`claude-code`/`droid`/`openclaw` binary'lerinin kaynak zinciri içinse
> `docs/security/SUPPLY_CHAIN.md` dosyasına bakın.

## Redis Sidecar'ı

OmniRoute, dağıtık hız sınırlayıcıyı ve paylaşılan önbelleği desteklemek için Redis'e dayanır. `redis` hizmeti `docker-compose.yml` içinde **her zaman tanımlıdır** (herhangi bir profil kısıtlaması yoktur) ve diğer tüm profillerle birlikte başlatılır.

| Ayrıntı                                    | Değer                                       |
| ------------------------------------------ | ------------------------------------------- |
| İmaj                                       | `redis:7-alpine`                            |
| Konteyner adı                              | `omniroute-redis`                           |
| Dahili port                                | `6379`                                      |
| Ana makine portu (geçersiz kılma)          | `REDIS_PORT` (varsayılan: `6379`)           |
| Ana makine bağlama adresi (geçersiz kılma) | `REDIS_BIND_HOST` (varsayılan: `127.0.0.1`) |
| Birim                                      | `omniroute-redis-data` → `/data`            |
| Sistem durumu denetimi                     | `redis-cli ping` (10 sn aralıkla)           |

İlgili ortam değişkenleri:

- `REDIS_URL` — uygulamaya aktarılan bağlantı dizesi (varsayılan olarak `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri için ana makine tarafındaki port eşlemesi.
- `REDIS_BIND_HOST` — portun yayımlandığı ana makine arayüzü. Varsayılan değeri `127.0.0.1`'dir.

> **Varsayılan olarak neden geri döngü adresi kullanılır:** sidecar, `requirepass` olmadan çalışır ve uygulama
> konteynerleri ona compose ağı (`redis:6379`) üzerinden erişir — yayımlanan port
> yalnızca ana makine tarafındaki araçlar (`redis-cli`, yerel bir `npm run dev`) içindir. Portu
> `0.0.0.0` üzerinde yayımlamak, kimlik doğrulaması olmayan bir Redis'i LAN'ınızdaki tüm ana makinelere açar. Eğer
> `REDIS_BIND_HOST=0.0.0.0` ayarını kullanırsanız hizmetin `command:` alanına `--requirepass` seçeneğini de ekleyin.

**Redis'i devre dışı bırakmak** önerilmez (hız sınırlayıcı, bellek içi yedek mekanizmasına geçerek daha düşük işlevsellikle çalışır). Mecbursanız `docker-compose.yml` içindeki `redis:` hizmet bloğunu kaldırın/yorum satırına dönüştürün veya ölçeğini sıfıra indirin:

```bash
docker compose up -d --scale redis=0
```

## Üretim Compose Yapılandırması

Geliştirme ortamıyla birlikte çalışan yalıtılmış bir üretim anlık görüntüsü için `docker-compose.prod.yml` dosyasını kullanın.

| Ayrıntı                   | Değer                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Dosya                     | `docker-compose.prod.yml`                                                                  |
| Varsayılan pano portu     | `PROD_DASHBOARD_PORT=20130` (dahili `${DASHBOARD_PORT:-20128}` portuna eşlenir)            |
| Varsayılan API portu      | `PROD_API_PORT=20131`                                                                      |
| İmaj                      | `omniroute:prod` (`runner-cli` hedefinden oluşturulur)                                     |
| Redis konteyneri          | `omniroute-redis-prod` (`redis:8.6.2`, ayrılmış `redis-prod-data` birimi)                  |
| Veri birimi               | `omniroute-prod-data` (adlandırılmıştır, yeniden oluşturmalar arasında korunur)            |
| Sistem durumu denetimleri | `node healthcheck.mjs` + `redis-cli ping`; `depends_on`, Redis'in sistem durumuna bağlıdır |

Kullanım:

```bash
# Üretim yığınını oluşturun ve başlatın
docker compose -f docker-compose.prod.yml up -d --build

# Günlükleri akış halinde izleyin
docker compose -f docker-compose.prod.yml logs -f

# Kapatın (birimleri koruyun)
docker compose -f docker-compose.prod.yml down
```

Üretim yığını, geliştirme compose yapılandırmasıyla paralel çalışır (konteyner adları, portlar ve birimler farklıdır); böylece üretim çalışmaya devam ederken yerel olarak yinelemeli geliştirme yapmayı sürdürebilirsiniz.

## Dockerfile Aşamaları

Depo, çok aşamalı bir Dockerfile (`Dockerfile`) ile birlikte gelir. Dört aşama kullanıma sunulur; kullanım senaryonuz için doğru `target` değerini seçin.

| Aşama         | Temel imaj            | Amaç                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Bağımlılıkları yükler (`npm ci --legacy-peer-deps`) ve `npm run build` komutunu çalıştırır (varsayılan olarak Turbopack — aşağıdaki Derleme zamanı kaynakları bölümüne bakın)                                                                                                                          |
| `runner-base` | `node:26-trixie-slim` | Next.js bağımsız çıktısını içeren üretim çalışma zamanı. **Hiçbir sağlayıcı CLI'ı dahil değildir.**                                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` ve global CLI'ları ekler: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Aracı tabanlı iş akışları için bunu seçin.**                                                                                                                       |
| `runner-web`  | `runner-base`         | Web oturumu sağlayıcıları için Playwright + bir Chromium tarayıcısı (`--with-deps`) ekler: `gemini-web`, `claude-web`, `claude-turnstile`. **Bu sağlayıcıları kullanırken bunu seçin** — sade imaj, bu bileşen olmadan istek sırasında başarısız olur (Sürüm Kanalları altındaki `-web` notuna bakın). |

Belirli bir hedefi manuel olarak derleyin:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Derleme zamanı kaynakları

Üç derleme argümanı, `builder` aşamasının kaynak maliyetini kontrol eder. Bunlar yalnızca derleme zamanında kullanılır —
`OMNIROUTE_MEMORY_MB` (aşağıda) ayrı bir çalışma zamanı ayarıdır.

| Derleme argümanı            | Varsayılan | Etki                                                                                                   |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0`, webpack ile derler: daha düşük tepe bellek kullanımı, daha yavaş. `1`, Turbopack'i etkinleştirir. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Başlatılan `next build` için V8 yığın üst sınırı (`--max-old-space-size`).                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL` değerini besler; Next, sayfa verisi toplama için `workers = N - 1` türetir.        |

`OMNIROUTE_BUILD_WORKERS`, güçlü bir derleme makinesinde artırılması gereken ve
kısıtlı bir derleme `✓ Compiled successfully` mesajından **sonra** sonlanırsa
şüphelenilmesi gereken ayardır. Her sayfa verisi çalışanı ayrı bir süreçtir ve
üst `next build` sürecinin kendisi de ayrıdır; canlı bir VPS yeniden üretimi
(issue #7518), `NODE_OPTIONS` yığın bayrağından bağımsız olarak her sürecin tepe
RSS değerini ~4.5 GB olarak ölçtü (Turbopack, V8 yığınının dışındaki yerel/Rust
belleğinde derleme yapar). Varsayılan `2` değeri (→ 1 çalışan, toplam 2 süreç),
yayınlama işlem hattının kullandığı 16 GB / 4 vCPU GitHub tarafından barındırılan
çalıştırıcılar için boyutlandırılmıştır. `8` değerinde (→ 7 çalışan) bu
çalıştırıcının belleği tükendi ve buildkit, adımı
`ResourceExhausted: ... cannot allocate memory` hatasıyla sonlandırdı; süreç
başına RSS tahmin edilmek yerine doğrudan ölçüldüğünde `3` (→ 2 çalışan) değeri
de hâlâ sınırlar içine sığmadı. `tests/unit/docker-build-memory-budget.test.ts`,
ölçülen değer üzerinden hesaplama yapar ve iki ayardan herhangi biri
çalıştırıcının kapasitesini aşarsa başarısız olur.

Turbopack, V8 yığınının **dışında** bulunan yerel Rust belleğinde derleme yapar;
bu nedenle `OMNIROUTE_BUILD_MEMORY_MB` bunu sınırlamaz. Bellek üst sınırı olan
bir ana makinede derleme, OOM sonlandırıcısı tarafından hiçbir hata metni olmadan
SIGKILL ile sonlandırılır — süreç `Creating an optimized production build`
aşamasının ortasında durur ve bu da bellek yetersizliğinden çok takılma gibi
görünür. Bu nedenle `Dockerfile`, Turbopack'in kod varsayılanı olduğu
`npm run dev` / `npm run build` komutlarının aksine varsayılan olarak webpack
(`OMNIROUTE_USE_TURBOPACK=0`) kullanır: herhangi bir derleme argümanı içermeyen
yalın bir `docker build .` komutu (Railway ve diğer tek tıklamalı barındırma
hizmetlerinin çalıştırdığı biçim), belleği sınırlı bir derleme makinesinde
sessizce sonlanmamalıdır. Yayımlanan imajlar, `docker-publish.yml` içinde zaten
açıkça `OMNIROUTE_USE_TURBOPACK=0` geçirir. Bol miktarda RAM'e sahip bir derleme
makinesinde daha hızlı bir derleme için Turbopack'i etkinleştirin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` etkindir; dolayısıyla `next build`, bir üst süreç **ve**
bir çalışan süreç çalıştırır ve her biri `OMNIROUTE_BUILD_MEMORY_MB` değerini
ayrı ayrı dikkate alır. Kapsayıcı üst sınırını bu değerin bir katının değil,
yaklaşık iki katının üzerinde ayarlayın.

Bu ağaç üzerinde ölçülmüştür (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketleyici | Kapsayıcı üst sınırı | Sonuç                                                |
| ----------- | -------------------- | ---------------------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB       | Her ikisinde de sessizce OOM nedeniyle sonlandırıldı |
| webpack     | 8 GiB                | Derleme çalışanı SIGKILL ile sonlandırıldı           |
| webpack     | 12 GiB               | Başarılı oldu, 11.1 GiB tepe değerine ulaştı         |

### Çalışma zamanı varsayılanları

`runner-base` tarafından dışa aktarılan varsayılanlar: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker'daki bellek davranışı:

- İmaj, `OMNIROUTE_MEMORY_MB=1024` değerini ayarlar ve bundan `NODE_OPTIONS=--max-old-space-size=1024` değerini türetir.
- Asıl sunucu süreci, `OMNIROUTE_MEMORY_MB` değerini okuyan ve `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` seçeneğini ekleyen bağımsız başlatıcı tarafından başlatılır.
- Node, tekrarlanan son `--max-old-space-size` değerini kullanır; dolayısıyla `OMNIROUTE_MEMORY_MB` ayarı, etkin Docker heap sınırını belirler.
- İmaj bu değeri her zaman ayarladığından, başlatıcının RAM'e göre kalibre edilen kendi yedek değeri Docker altında hiçbir zaman uygulanmaz. İş yükü için bu değeri açıkça artırın (aşağıdaki tablo). `2048`, kodlama ajanlarının `/v1/responses` istekleri için hâlâ çok küçüktür.

### Kodlama ajanları için çalışma zamanı RAM'i

1 GiB'lık Docker varsayılanı, üretim boyutu değil; pano/hafif sohbet için alt sınırdır. Uzun `POST /v1/responses` gövdeleri (yüzlerce mesaj, onlarca araç), sıkıştırma sırasında birden fazla bellek içi grafiği tutar. Çakışan iki ~3 MiB / ~750k-token isteği, **12 GiB** old-space değerinde V8'in durmasına (`FATAL ERROR: Reached heap limit`) ve ayrıca 16 GiB cgroup OOM sınırına ulaşılmasına neden olmuştur. Bkz. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

**cgroup `--memory` değerini heap'in üzerinde boyutlandırın** — yerel tamponlar, SQLite ve sıkıştırma ara verileri V8'in dışında bulunur.

| İş yükü                                   | `OMNIROUTE_MEMORY_MB`     | Konteyner / cgroup           | Notlar                                                                                                     |
| ----------------------------------------- | ------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Pano, tek bir hafif sohbet                | `1024` (imaj varsayılanı) | ≥2 GiB                       |                                                                                                            |
| Tek bir kodlama ajanı (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                      | Tipik tek oturumlu `/v1/responses`                                                                         |
| Eşzamanlı iki uzun `/v1/responses`        | `10240`–`12288`           | ≥12–16 GiB                   | ~12 GiB heap değerinde ölçülen V8 durması                                                                  |
| Eşzamanlı üçten fazla uzun bağlam         | tek süreçte kullanmayın   | sıraya alın / daha fazla RAM | Varsayılan ağır iş kabul sınırı, işlemde olan 1 istektir; RAM olmadan artırılması durmayı yeniden tetikler |

`OMNIROUTE_MEMORY_MB` **ayarlanmamışsa**, bare metal üzerinde `omniroute serve`, RAM'in yaklaşık %35'ine göre kalibrasyon yapar (`[512, 4096]` aralığıyla sınırlandırılır). Docker her zaman `1024` değerini ayarladığından, resmi imajda bu kalibrasyon hiçbir zaman çalışmaz.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritik Ortam Değişkenleri

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) içinde belgelenen varsayılanlara ek olarak, Docker altında çalıştırırken aşağıdaki değişkenler özellikle önemlidir:

| Değişken                      | Amaç                                                                                                                                                                                                                                                                              | Varsayılan                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket köprüsü için paylaşılan gizli anahtar. **Üretim ortamında zorunludur** — güçlü ve rastgele bir dize olarak ayarlayın.                                                                                                                                                   | ayarlanmamış (sağlanmalı) |
| `REDIS_URL`                   | Hız sınırlayıcı / önbellek arka ucu için bağlantı dizesi                                                                                                                                                                                                                          | `redis://redis:6379`      |
| `REDIS_PORT`                  | Paketle birlikte gelen Redis konteyneri için ana makine tarafındaki port                                                                                                                                                                                                          | `6379`                    |
| `REDIS_BIND_HOST`             | Paketle birlikte gelen Redis portunun yayımlandığı ana makine arayüzü (AUTH eklemediğiniz sürece geri döngü arayüzü)                                                                                                                                                              | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Kendi kendini güncelleme iş akışları için `cli` profilinde `/workspace/omniroute` konumuna bağlanan ana makine yolu                                                                                                                                                               | `.` (geçerli dizin)       |
| `OMNIROUTE_MEMORY_MB`         | Docker bağımsız sunucusu için çalışma zamanı Node yığın belleği üst sınırı; yukarıdaki imaj varsayılanını geçersiz kılar. Kodlama ajanları: `8192`+ (bkz. [çalışma zamanı RAM'i](#runtime-ram-for-coding-agents)).                                                                | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | Kontrol paneli (20128) ve API (20129) için dışa açılan portları geçersiz kılar                                                                                                                                                                                                    | `20128` / `20129`         |
| `APP_BIND_HOST`               | docker-compose'un kontrol paneli/API/canlı-WS portlarını yayımladığı ana makine arayüzü. `REQUIRE_API_KEY=false` (varsayılan) olduğunda, `0.0.0.0` anonim `/v1` proxy'sini LAN'a açar — yalnızca `REQUIRE_API_KEY=true` ile veya önünde bir ters proxy varken kapsamı genişletin. | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | docker-compose'un `cliproxyapi` yan konteynerini yayımladığı ana makine arayüzü — bu konteynerin veri birimi sağlayıcı kimlik bilgilerini barındırır.                                                                                                                             | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | Çalışma zamanı eklenti tarayıcısının okuduğu ve eklentileri yüklediği dizin. Eklentiler bağlama yoluyla bağlandığında bunu ayarlayın: varsayılan değer `HOME` değişkenini izler; bir imajın bunu dışa aktarması gerekmeyebilir.                                                   | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | Uygulama bir ters proxy arkasında yayımlandığında kullanılan URL alt yolu (ör. `/omniroute`)                                                                                                                                                                                      | _(boş = kök)_             |
| `NEXT_PUBLIC_BASE_URL`        | Alt yolu içeren genel tarayıcı kaynağı (ör. `https://host/omniroute`)                                                                                                                                                                                                             | ayarlanmamış              |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` için ana makine tarafındaki kontrol paneli portu                                                                                                                                                                                                        | `20130`                   |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yan konteyneri için ana makine tarafındaki port                                                                                                                                                                                                                     | `8317`                    |

## Alt Yolda Ters Proxy (Traefik / nginx)

Next.js `basePath`, bağımsız paketin içine derlenir. OmniRoute, uygulama kökündeki bir işaretçi dosyasına derlenmiş değeri kaydeder (`npm run build` sırasında yazılır; `scripts/docker/ensure-docker-base-path.mjs` tarafından okunur) ve konteyner başladığında bunu `OMNIROUTE_BASE_PATH` ile karşılaştırır. Değerler farklıysa ve imaj etki alanı kökü için oluşturulmuşsa giriş noktası; bağımsız manifestleri, gömülü `basePath`/`assetPrefix` sabit değerlerini (Next 16, SSR varlık URL'lerini yalnızca `assetPrefix` üzerinden oluşturur — yamalayıcı alt yolu buna da yansıtır), derlenmiş `/_next/static` varlık URL'lerini (istemci referans manifestleri, medya içe aktarımları, önceden oluşturulmuş hata sayfaları) ve `node dev/run-standalone.mjs` çalışmadan önce istemci `process.env` uyumluluk katmanını yeniden yazar.

### Compose ile derleme (önerilen)

Her iki değişkeni de `.env` içinde ayarlayın, ardından imaj ile çalışma zamanı yapılandırmasının eşleşmesi için yeniden derleyin:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` değerini hem Docker derleme argümanı hem de çalışma zamanı ortam değişkeni olarak iletir.

### Önceden oluşturulmuş kök imajı + çalışma zamanı alt yolu

Yayımlanan `diegosouzapw/omniroute:*` imajları etki alanı kökü için oluşturulur. Yine de çalışma zamanında `OMNIROUTE_BASE_PATH` ayarlayabilirsiniz; konteyner, başlangıçta paketi bir kez yamalar. Bunu eşleşen genel kaynak adresiyle birlikte kullanın:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ters proxy'yi **tam** harici yolu iletecek şekilde yapılandırın (öneki kaldırmayın). Traefik, `PathPrefix(`/omniroute`)` yolunu `StripPrefix` kullanmadan konteynere yönlendirmelidir; böylece Next.js `/omniroute/...` yolunu alır ve varlıkları `/omniroute/_next/...` üzerinden sunar.

Docker sistem durumu denetimi, etkin `OMNIROUTE_BASE_PATH` öneki eklenmiş hafif `/healthz` yaşam döngüsü uç noktasını yoklar. `/api/monitoring/health`, insan/pano tanılamaları için kullanılabilir olmaya devam eder; konteyner HEALTHCHECK işlevini tekrar bu uç noktaya yönlendirmek için (örneğin kapsamlı sistem durumu denetimini zorunlu kılmak amacıyla) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ayarını kullanın. Bu yol **kapsamlı** bir denetimdir (veritabanı + izleme özeti) — yeniden etkinleştirmeyi seçerseniz Docker'ın seyrek çalışan `HEALTHCHECK` işlevi için uygundur, ancak Kubernetes `livenessProbe` aralıkları için **uygun değildir**.

Orkestratörler (Kubernetes, Nomad vb.) için:

| Yoklama              | Tercih Edin                                                                     | Kaçının                                                                            |
| -------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Canlılık             | HTTP `GET /livez` veya ana bağlantı noktasında TCP (`PORT`, varsayılan `20128`) | Canlılık denetimi olarak `/api/monitoring/health`                                  |
| Hazır olma           | HTTP `GET /healthz`                                                             | Olay döngüsünün meşgul olmasını çalışmama olarak değerlendiren kısa zaman aşımları |
| Kapsamlı / kara kutu | `/api/monitoring/health`                                                        | —                                                                                  |

`/healthz`, işlem yaşam döngüsünü (`ok` / `starting` / `stopping`) bildirir. `/livez` yalnızca işlemin çalışıp çalışmadığını belirtir (işleyici çalışabildiği sürece 200 döndürür; hazır olmayı beklemez). Her ikisi de istek işleme ile aynı Node olay döngüsünde çalışır; bu nedenle CPU'ya bağımlı katalog veya sıkıştırma işleri bunları geciktirebilir — meşgul ≠ çalışmıyor. HTTP yoklamaları zaman aşımına uğruyorsa TCP canlılık yoklamasını tercih edin. Eksiksiz yoklama rehberi:
[İzleme rehberi — Kubernetes yoklama önerileri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy ile Docker Compose (HTTPS Auto-TLS)

OmniRoute, Caddy'nin otomatik SSL sağlama özelliği kullanılarak güvenli bir şekilde dışarıya açılabilir. Alan adınızın DNS A kaydının sunucunuzun IP adresine yönlendirildiğinden emin olun.

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
      # Zamanlanmış işler / kendi kendine istekler için dahili sunucudan sunucuya URL.
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

Caddy, yukarı akış kapsayıcısı için standart yönlendirme başlıklarını ayarlar. OmniRoute,
OAuth geri çağrıları ve oluşturulan herkese açık bağlantılar için `NEXT_PUBLIC_BASE_URL` değerini
kanonik herkese açık kaynak olarak kullanır; kimliği doğrulanmış pano yazma işlemleri, oturuma bağlı
CSRF korumasıyla birlikte aynı kaynaklı istekleri kullanır. `OMNIROUTE_TRUST_PROXY` seçeneğini yalnızca,
OmniRoute'un herkese açık kaynağı açık yapılandırma yerine güvenilir yönlendirme başlıklarından
türetmesini bilinçli olarak istediğiniz gelişmiş dağıtımlarda etkinleştirin.

## Cloudflare Hızlı Tüneli

Docker dağıtımlarına yönelik pano desteği, `Dashboard → Endpoints` bölümünde tek tıklamayla etkinleştirilebilen bir **Cloudflare Hızlı Tüneli** içerir. İlk etkinleştirmede `cloudflared` yalnızca gerektiğinde indirilir, mevcut `/v1` uç noktanıza geçici bir tünel başlatılır ve oluşturulan `https://*.trycloudflare.com/v1` URL'si normal herkese açık URL'nizin hemen altında gösterilir.

Uç nokta tünel panelleri (Cloudflare, Tailscale, ngrok), etkin tünel durumu değiştirilmeden `Settings → Appearance` bölümünden gösterilebilir veya gizlenebilir.

### Tünel Notları

- Hızlı Tünel URL'leri geçicidir ve her yeniden başlatmadan sonra değişir.
- Hızlı Tüneller, OmniRoute veya kapsayıcı yeniden başlatıldıktan sonra otomatik olarak geri yüklenmez. Gerektiğinde panodan yeniden etkinleştirin.
- Yönetilen kurulum şu anda `x64` / `arm64` üzerinde Linux, macOS ve Windows'u destekler.
- Yönetilen Hızlı Tüneller, kısıtlı kapsayıcı ortamlarında gürültülü QUIC UDP arabellek uyarılarını önlemek için varsayılan olarak HTTP/2 aktarımını kullanır. Farklı bir aktarım istiyorsanız `CLOUDFLARED_PROTOCOL=quic` veya `auto` olarak ayarlayın.
- Docker imajları, sistem CA köklerini içerir ve bunları yönetilen `cloudflared` sürecine aktarır; bu, tünel kapsayıcı içinde başlatılırken TLS güven hatalarını önler.
- OmniRoute'un bir dosya indirmek yerine mevcut bir ikili dosyayı kullanmasını istiyorsanız `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` olarak ayarlayın.

## İmaj Etiketleri

| İmaj                     | Etiket   | Boyut  | Açıklama                                                    |
| ------------------------ | -------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | En yüksek **yayımlanmış** kararlı SemVer (git `main` değil) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps için bu etiket sınıfını sabitleyin                   |

Çok platformlu manifest: yerel `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker, eşleşen mimariyi otomatik olarak seçer; ARM ana makinelerinde AMD64 öykünmesini zorlamanız gerekiyorsa `--platform linux/amd64` seçeneğini geçin.

### Sürüm Kanalları

OmniRoute; kararlı sürümler, etkin sürüm dalı testleri ve geliştirme derlemeleri için ayrı Docker kanalları yayımlar.

| Kanal                           | Kaynak                                   | Değiştirilebilirlik                    | Önerilen kullanım                                                                                                               |
| ------------------------------- | ---------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | İmzalı/sürümlendirilmiş sürüm            | Değiştirilemez                         | Tam bir sürüme sabitlenen üretim dağıtımları                                                                                    |
| `:latest` / `:latest-web`       | En yüksek **yayımlanmış** kararlı SemVer | Değiştirilebilir kararlı işaretçi      | Bir SemVer yayımlama işinden **sonra** kararlı sürümleri izler; `main` veya yayımlanmamış `release/v*` işlemelerini **izlemez** |
| `:next` / `:next-web`           | Geçerli varsayılan `release/v*` dalı     | Değiştirilebilir ön sürüm işaretçisi   | Etkin sürüm dalına eklenmiş ancak henüz kararlı bir sürümde bulunmayan düzeltmelerin test edilmesi                              |
| `:main` / `:main-web`           | `main` dalı                              | Değiştirilebilir geliştirme işaretçisi | Yalnızca geliştirme ve entegrasyon testleri                                                                                     |

#### Web oturumu sağlayıcıları: `-web` imajları

Yukarıdaki her kanal, `runner-web` aşamasından oluşturulan bir `-web` etiketi (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) olarak da sunulur; aynı imaja ek olarak Playwright ve bir Chromium tarayıcısı içerir. Standart imaj Chromium **içermez**; `gemini-web`, `claude-web` ve `claude-turnstile` buna ihtiyaç duyar.

Hata başlangıç sırasında değil, daha sonra oluşur: bu sağlayıcılar modellerini listeler ve panoda bağlı olarak görünür, yalnızca ilk istek aşağıdaki hatayla başarısız olur:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Bu sağlayıcıları kullanıyorsanız hâlihazırda kullandığınız kanalın `-web` etiketini çekin; bunun dışında hiçbir şey değişmez. Bir npm/CLI kurulumunda (Docker imajı olmadan) eksik olan eşdeğer bileşen tarayıcı ikili dosyasıdır: ana makinede `npx playwright install chromium` komutunu çalıştırın.

#### Ön sürüm kanalını kullanma

`next` kanalı, mevcut varsayılan `release/v*` dalına yapılan her gönderimde yeniden oluşturulur ve hem AMD64 hem de ARM64 için yayımlanır. Eski bakım dalları bu kanalın üzerine yazamaz. Kanal, bir sonraki kararlı etiket oluşturulmadan önce etkin sürüm dalıyla birleştirilmiş düzeltmeler için çekilebilir bir imaj sağlar.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose için seçilen profilin kullandığı imaj etiketini geçersiz kılın, ardından servisi çekip yeniden oluşturun:

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

`next`, değişken bir ön sürüm kanalıdır. Etkin sürüm dalına yapılan herhangi bir gönderimde değişebilir ve **üretim ortamında kullanım için desteklenmez**. Belirli bir derlemeyi değerlendirirken imaj özetini sabitleyin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Test etmeden önce OmniRoute veri birimini veya bağlama yoluyla monte edilmiş veri dizinini yedekleyin. Geri almak için daha önce kullanılan kararlı sürümü veya özeti geri yükleyin ve konteyneri yeniden oluşturun:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Bir sürüm dalı derlemesi hiçbir zaman `latest` etiketini taşıyamaz; kararlı işaretçiyi yalnızca uygun bir kararlı semantik sürüm ilerletebilir. `next` imajları, sürüm imajı incelemesini ve engelleyici CRITICAL güvenlik açığı denetimini korur.

**`latest`, git için güncellik garantisi değildir.** `main` veya etkin `release/v*` dalıyla birleştirilen düzeltmeler, kararlı bir SemVer imajı yayımlanana ve yayımlama işi `:latest` etiketini ilerletene kadar (ilgili SemVer ile aynı özet) `:latest` içinde yer almaz. GitHub düzeltmeyi zaten gösterirken `latest` değişmeden kalmış görünüyorsa sürüm dalını test etmek için `:next` imajını çekin veya SemVer etiketini bekleyin.

| İstediğiniz                                                                             | Kullanım                                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Sapma olmaması gereken GitOps / üretim ortamı                                           | `:X.Y.Z` etiketini (veya imaj özetini) sabitleyin |
| Yayımlanan kararlı sürümleri takip etmek ve her sürümde yeniden oluşturmayı kabul etmek | `:latest`                                         |
| Yayımlanmamış `release/v*` commit'lerini test etmek                                     | `:next` (üretim için değil)                       |
| `main` dalını test etmek                                                                | `:main` (üretim için değil)                       |

## Kullanılabilirlik: varsayılan SQLite tek replikalıdır

Standart Docker / Kubernetes OmniRoute kurulumu **bir Node işlemi + bir SQLite yazıcısından** oluşur. Bu topolojide yüksek kullanılabilirlik **desteklenmez**.

| Kısıtlama                                                        | Sonuç                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tek yazıcı                                                       | Aynı SQLite dosyasına karşı birden fazla replika **çalıştırmayın**. Bu, veritabanını bozar.                                                                                                                                                                                                                                                               |
| Yeniden oluşturma / yeniden başlatma / HEALTHCHECK sonlandırması | Devam eden SSE bağlantıları, pano oturumları ve bellek içi durum için **tam kesinti** yaşanır. Bağlı tüm istemcilerin bağlantısı kopar. Uç noktanın bulunmadığı zaman aralığındaki yeni istekler OmniRoute JSON yanıtı değil, ters proxy kaynaklı **`502 Bad Gateway: Unknown error`** alır — istemciler bunu sağlayıcı hatasından ayırt edemez (#11015). |
| `/healthz` ile aynı olay döngüsü                                 | Yoğun bir katalog veya sıkıştırma işlemi probları geciktirebilir; kısa bir zaman aşımı bu durumda **tek** replikayı yeniden başlatır.                                                                                                                                                                                                                     |

**Prob matrisi** (ayrıca bkz. [Kubernetes prob önerileri](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Prob                          | Hedef                                                                    | Kullanmayın                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Canlılık                      | `PORT` üzerinde TCP (varsayılan `20128`) veya toleranslı HTTP `/healthz` | `/api/monitoring/health`                                                                     |
| Hazır olma                    | HTTP `GET /healthz`                                                      | Olay döngüsünün yoğun olmasını hizmetin çalışmaması olarak değerlendiren kısa zaman aşımları |
| Derinlemesine / insanlar için | `/api/monitoring/health`                                                 | Otomatik kubelet canlılık kontrolü                                                           |

**Yükseltmeler:** tüm oturumların kopmasını bekleyin. Mümkünse istemci trafiğini tahliye edin; varsayılan SQLite üzerinde sıralı güncelleme yoktur. Compose `restart: unless-stopped` ile Docker `HEALTHCHECK` birlikte kullanıldığında da container Unhealthy durumuna geçtiğinde tek işlem değiştirilir — etki alanı aynıdır.

**Tek replika** için Kubernetes örneği (Recreate gereklidir; tek bir SQLite dosyası üzerinde `replicas` değerini artırmayın):

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

`preStop` beklemesi, SIGTERM öncesinde kube'un Service uç noktalarını kaldırmasına olanak tanır; böylece **yeni** trafik kapanmakta olan işleme gönderilmez. Devam eden `/v1/responses` SSE bağlantıları, ağır kaynaklı kabul kiraları aracılığıyla `SHUTDOWN_TIMEOUT_MS` süresine kadar (varsayılan 30 sn) tahliye edilir (#11015). Buna rağmen işleme ulaşan yeni istekler `503` + `Retry-After: 5` alır. Yeni işlem Ready olana kadar Recreate nedeniyle oluşan uç noktasız boşluk, tam bir kesinti olmaya devam eder — bu, bir prob yanlış yapılandırması değil, SQLite topolojisinin sonucudur.

Harici Postgres / çok yazıcılı HA, belgelenmiş standart bir kullanım yolu **değildir**. HA'ya ihtiyacınız varsa tek replika kullanın veya projenin ayrı olarak test edip belgelediği bir topolojiyi çalıştırın. Postgres/MySQL çalışmaları [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) kapsamında yürütülmektedir. Bu özellik yayımlanana kadar **büyük** `/v1/responses` kapasitesini artırmanın desteklenen tek yolu, tek bir volume üzerinde `replicas > 1` kullanmak değil, N bağımsız işlem çalıştırmaktır (sonraki bölüm).

## Yatay ölçeklendirme: N bağımsız süreç

Bir Node süreci **tek bir V8 heap'idir**. Birbiriyle çakışan, yaklaşık 3 MiB / yaklaşık 750 bin token içeren iki kodlama aracısı `POST /v1/responses` isteği (RTK + Caveman), yaklaşık 12 Gi seviyesinde bu heap'in çalışmasını durdurur (`FATAL ERROR: Reached heap limit`) ve 16 Gi'lik bir cgroup'da OOM'a neden olabilir. Bkz. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Bu ölçüm, eşzamanlı uzun `/v1/responses` istekleri için ürünün koyduğu kesin bir üst sınır değil, bir **bellek bütçesi** uyarısıdır. Ağır sohbet kabulü, aynı V8/cgroup sınırından otomatik olarak türetilen bir giriş bayt bütçesi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) tarafından denetlenir — önceden boyutlandırılmış bir süreçte bunu yukarı yönde geçersiz kılmak (veya eski `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` istek sayısı sınırını ayarlamak) işlemin durmasına yeniden yol açar. Küçük sohbetler, `/healthz`, `/v1/models` ve MCP bu sınıra **dahil değildir**.

### Tek süreç: ikiden fazla uzun `/v1/responses`

**Sağlıklı** bir süreç (heap, varsayılan değeri `0.75` olan `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` değerinin altındayken), süreç genelindeki işlemdeki bayt bütçesinde (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hâlâ yer varsa ikiden fazla eşzamanlı uzun `POST /v1/responses` isteği çalıştırabilir. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` değerine (varsayılan 256 KiB) eşit veya bundan büyük gövdeler, yapı açısından ağır isteklerle aynı ağır iş yükü kiralamasını alır ve aynı [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` kaçış mekanizmasını (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) kullanır. Onlarca eşzamanlı uzun SSE istemcisi (operatörler genellikle 40–50 istemciye ihtiyaç duyar) bir **bellek bütçesi** meselesidir — heap'i, birincil/ek kapasite yuvalarını ve `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` değerini buna göre boyutlandırın — bu, ürünün koyduğu kesin bir “en fazla 2” sınırı değildir. Baskı altındaki bir heap, #7849'un tekrarlanmaması için yeniden denenebilir `503` yanıtlarıyla yük atmaya devam eder.

**Heap'leri çoğaltmak** (bağımsız V8 old-space'leri) için **bugün**:

| Yapın                                                                                                                                                                           | Yapmayın                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Her biri **kendi** `DATA_DIR` / volume'una sahip **N container/pod** çalıştırın                                                                                                 | Tek bir SQLite dosyası için `replicas > 1` ayarlamayın                           |
| Ağır işlemdeki istekleri ve sağlıklı ek kapasiteyi heap / işlemdeki bayt bütçesine göre boyutlandırın; 1–2, kesin bir ürün üst sınırı değil, #7849 için ihtiyatlı varsayılandır | Tek bir sürece 8× RAM ve sınırsız bir sayı üst sınırı vermeyin                   |
| **Paylaşılan kota sayaçları** için isteğe bağlı olarak `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` kullanın                                                            | Redis'i paylaşılan SQLite olarak değerlendirmeyin — öyle değildir                |
| Sağlayıcı gizli bilgilerini her örneğe kopyalayın (veya bölümlenmiş panoları kabul edin)                                                                                        | Örnekler arasında tek bir pano / tek bir çağrı günlüğü beklemeyin                |
| Önüne herhangi bir yük dengeleyici koyun; API anahtarına veya oturuma göre yapışkanlık yeterlidir                                                                               | Sağlayıcıya özgü, boyut farkındalıklı bir ara katman yazılımını zorunlu tutmayın |

Donanım açısından örnek başına eşzamanlı uzun `/v1/responses` sayısı bir **bellek bütçesi** meselesidir (heap + işlemdeki bayt / #10110). `N` bağımsız `DATA_DIR` yine heap'leri çoğaltır: ana makine RAM'i, “N=8 olan tek bir 16 Gi pod”u değil, `N × cgroup` kapasitesini karşılamalıdır. Tek bir SQLite dosyasında asla `replicas > 1` kullanmayın.

Compose taslağı (iki heap, iki volume — `deploy.replicas: 2` değil):

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

Süreç içi yoğunluk (sıkıştırmanın HTTP isolate'ından çıkarılması) için bkz. [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Paylaşılan kalıcı durum üzerinde tek bir mantıksal küme için bkz. [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker içindeki Gemini bölgesel hataları

Google AI Studio / Gemini API, FAILED_PRECONDITION ile birlikte HTTP 400 ve
`Kullanıcı konumu API kullanımı için desteklenmiyor.` hatasını döndürebilir. Ana sistemde
başarılı olan bir istek, konteynerin aynı çıkış rotasını kullandığını kanıtlamaz. DNS sıralaması,
IPv4/IPv6 bağlantısı, VPN yönlendirmesi ve yapılandırılmış proxy'ler farklı olabilir. Gerçek
bağlantı rotasının yanı sıra
[Google'ın desteklediği bölgeleri](https://ai.google.dev/gemini-api/docs/available-regions)
de kontrol edin; bu hata tek başına API anahtarının hatalı olduğunu göstermez.

### Bağlantıya özel bir proxy'yi tercih edin

Etkilenen Gemini bağlantısı için OmniRoute'un
[bağlantı başına proxy yapılandırmasını](../ops/PROXY_GUIDE.md#4-level-proxy-system)
kullanın, ardından aynı modelle **Bağlantıyı Test Et** işlemini ve küçük bir isteği
tekrarlayın. Bu, yönlendirme değişikliğini söz konusu bağlantıyla sınırlar. Proxy'ye
konteynerden erişilebildiğini ve bağlantının gerçekten bu proxy'yi seçtiğini doğrulayın.
Rotanın değiştirilmesi, üst hizmetin bölgesel uygunluğunu garanti etmez.

### Ana sistem ve konteyner ağını karşılaştırın

Kimliği doğrulanmış sonuçları karşılaştırırken anahtarı, modeli ve isteği aynı tutun; kimlik
bilgilerini, proxy parolalarını veya eksiksiz yetkilendirme üstbilgilerini asla bir soruna
yapıştırmayın. Öncelikle işletim sistemi çözümleyicisinin hangi adres ailelerini sunduğunu,
ana sistemde ve konteyner içinde aynı komutu kullanarak inceleyin:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` değerini çalıştırdığınız hizmetle değiştirin (örneğin, `omniroute-web`). Bu
komutlar, kimlik bilgileri veya IP adresleri olmadan adres ailelerini yazdırır. Döndürülen `6`,
yalnızca bir IPv6 DNS sonucunu gösterir: kullanılabilir bir IPv6 rotasını veya API erişimini
**kanıtlamaz**. `curl` kuruluysa her iki ortamda da
`curl -4 -I https://generativelanguage.googleapis.com` ile
`curl -6 -I https://generativelanguage.googleapis.com` sonuçlarını karşılaştırın.
Kimliği doğrulanmamış bir hata olsa bile HTTP yanıtı, bu yoklama için bağlantının
bulunduğunu kanıtlar; Gemini uygunluğunu yalnızca kimliği doğrulanmış model isteği test eder.

### Ana sistem düzeyinde alternatif: çalışan IPv6 ve çözümleyici politikası

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) bildirimini yapan kişi,
konteyner IPv6 desteğini etkinleştirerek ve glibc adres seçimini değiştirerek kendi ortamında
erişimi yeniden sağladı. Bunu ortama özgü bir alternatif olarak değerlendirin. Çözümleyici
tercihlerini ayarlamadan önce ana sistem IPv6 bağlantısının çalıştığını, konteyner
çıkışını/yönlendirmesini ve güvenlik duvarı kurallarını doğrulayın. Özel bir ULA adresi,
tek başına genel IPv6 bağlantısının mevcut olduğunu göstermez.

Compose'un varsayılan ağına zaten bağlı olan hizmetler için bu parça, söz konusu ağda
IPv6'yı etkinleştirir; hizmetinizin, bağlantı noktalarınızın, birimlerinizin ve
yapılandırmanızın geri kalanını koruyun:

```yaml
networks:
  default:
    enable_ipv6: true
```

Adlandırılmış bir ağ için IPv6'yı, hizmetin gerçekten katıldığı ağda etkinleştirin. Docker
bir ULA alt ağı ayırabilir; açık ve çakışmayan bir alt ağı yalnızca ağınız gerektiriyorsa
seçin. Bkz. [Docker IPv6 ağı](https://docs.docker.com/engine/daemon/ipv6/)
ve [Compose ağ seçenekleri](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc tabanlı bir imajda** `/etc/gai.conf`, adres seçimini değiştirebilir. Mevcut
depo Dockerfile'ı Debian kullanır; özel musl tabanlı imajlar bu mekanizmayı paylaşmaz.
Bildirilen ayarlama, ULA etiketini `label fc00::/7 6` değerinden
`label fc00::/7 1` değerine değiştirir. İmajın eksiksiz politika tablosuyla başlayın ve
diğer girdilerini koruyun: bir `label` veya `precedence` girdisinin eklenmesi söz konusu
varsayılan tablonun yerini alır; bu nedenle yalnızca değiştirilen satırı içeren bir dosya
yeterli değildir.
[glibc yapılandırma referansı](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
bu davranışları belgeler. İncelenen dosyayı `/etc/gai.conf` konumuna salt okunur olarak
bağlayın ve uygulamak için hizmeti yeniden oluşturun.

Bu, söz konusu konteynerdeki **tüm giden trafik** için işletim sistemi adres seçimini
değiştirir. Her uygulamayı IPv6 seçmeye zorlamaz: Node'un DNS sıralaması ve bağlantı
seçimi de önemlidir. Özellikle `--dns-result-order=ipv4first`, IPv4'ü tercih eder ve
yalnızca IPv4'e özgü bir arıza için çözüm değildir. Bkz.
[Node DNS sıralaması](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Ana sistem düzeyindeki herhangi bir değişiklikten sonra Gemini'yi ve diğer sağlayıcılarınızı
yeniden test edin. Geri almak için özel `gai.conf` bağlamasını kaldırın, önceki ağ
yapılandırmasını geri yükleyin ve bir bakım aralığında etkilenen hizmeti/ağı yeniden
oluşturun. Bir ağın yeniden oluşturulması, ona bağlı diğer konteynerleri kesintiye
uğratabilir; kalıcı veri birimini silmeyin.

## Önemli Notlar

- **SQLite WAL Modu:** OmniRoute'un en son değişiklikleri `storage.sqlite` dosyasına checkpoint edebilmesi için `docker stop` işleminin tamamlanmasına izin verilmelidir. Birlikte sunulan Compose dosyalarında 40 saniyelik durdurma ek süresi zaten ayarlanmıştır. İmajı doğrudan çalıştırıyorsanız `--stop-timeout 40` ayarını koruyun.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Rutin/yazma öncesi yedeklemeler harici olarak yönetiliyorsa `true` olarak ayarlayın. Mevcut veritabanı geçişleri yine de kendilerine ait kalıcı bir güvenlik anlık görüntüsü ve toplu geçiş koruması gerektirir.
- **Veri Kalıcılığı:** Veritabanınızı, anahtarlarınızı ve yapılandırmalarınızı konteyner yeniden başlatmaları arasında kalıcı tutmak için her zaman `/app/data` konumuna bir birim bağlayın.
- **Port Yapılandırması:** Varsayılan `20128` portunu değiştirmek için `PORT` ortam değişkenini geçersiz kılın.

## Ayrıca Bakınız

- [VM Dağıtım Kılavuzu](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare kurulumu
- [Fly.io Dağıtım Kılavuzu](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io'ya dağıtım
- [Ortam Yapılandırması](../reference/ENVIRONMENT.md) — Eksiksiz `.env` referansı
