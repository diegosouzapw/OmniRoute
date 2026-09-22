# 🐳 Docker Guide — OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker yerləşdirilməsi üzrə tam istinad sənədi. Sürətli başlanğıc üçün [README sənədinin Docker bölməsinə](../README.md#-docker) baxın.

## Mündəricat

- [Sürətli işə salma](#quick-run)
- [Mühit faylı ilə](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Mövcud profillər](#available-profiles)
- [OmniRoute Docker-də işləyərkən host CLI alətlərinin konfiqurasiyası](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis yan konteyneri](#redis-sidecar)
- [İstehsal mühiti üçün Compose](#production-compose)
- [Dockerfile mərhələləri](#dockerfile-stages)
- [Kritik mühit dəyişənləri](#critical-environment-variables)
- [Caddy (HTTPS) ilə Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare sürətli tuneli](#cloudflare-quick-tunnel)
- [İmaj teqləri](#image-tags)
- [Əlçatanlıq: standart SQLite yalnız bir replikanı dəstəkləyir](#availability-default-sqlite-is-single-replica)
- [Vacib qeydlər](#important-notes)

---

## Sürətli işə salma

> **Bir əmrlə öz serverinizdə yerləşdirmək istəyirsiniz?** Baxın:
> [Öz serverinizdə yerləşdirmə təlimatı](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (dərc edilmiş image +
> Redis, yalnız loopback, profil seçimi olmadan). Aşağıdakı sürətli işə salma
> bölməsi Redis-i artıq başqa yerdə işlədən istifadəçilər üçün tək konteynerli üsuldur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Mühit faylı ilə

```bash
# Əvvəlcə .env faylını kopyalayın və redaktə edin
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
# Əsas profil (CLI alətləri olmadan)
docker compose --profile base up -d

# CLI profili (Claude Code, Codex və OpenClaw daxildir)
docker compose --profile cli up -d

# Host profili (əsasən Linux üçün; host CLI binar fayllarını yalnız oxuma rejimində qoşur)
docker compose --profile host up -d

# CLI + CLIProxyAPI yan konteynerini birləşdirin
docker compose --profile cli --profile cliproxyapi up -d
```

## Mövcud profillər

OmniRoute dörd Compose profili ilə təqdim olunur. Mühitinizə uyğun olanı seçin.

| Profil            | Xidmət           | Nə zaman istifadə edilməlidir                                                                                                                             | Əmr                                          |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standart) | `omniroute-base` | İnterfeyssiz server / minimal icra mühiti; provayder CLI-ləri daxil deyil                                                                                 | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` və daxili CLI-ləri (Codex, Claude Code, Droid, OpenClaw) çağıran agent əsaslı iş axınları                              | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` və s. qovluqları yalnız oxuma rejimində qoşaraq host CLI-lərinə `network_mode` tipli giriş istəyən Linux hostları | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Yuxarı axın CLI proksiləməsi üçün [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) yan konteynerini `8317` portunda işə salmaq                 | `docker compose --profile cliproxyapi up -d` |

> Bir neçə profil birləşdirilə bilər: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker-də işləyərkən host CLI alətlərinin konfiqurasiyası

`omniroute setup-codex`, `setup-claude`, `config set <tool>` və idarə panelindəki
**Konfiqurasiyanı yadda saxla** düyməsi `~/.codex/*.config.toml` kimi fayllara yazır. Bu yollar
yalnız CLI-nin faktiki işlədiyi maşında məna daşıyır. Onları konteyner daxilində
işə salsanız, yazma əməliyyatı konteynerin öz ev qovluğunda (`/home/node` —
obraz `USER node` ilə işləyir) baş verəcək; hostdakı heç bir CLI bu faylları oxumayacaq və konteyner
yenidən yaradılan kimi onlar silinəcək.

OmniRoute bunu aşkarlayır və istifadə edə bilməyəcəyiniz uğurlu nəticə bildirmək əvəzinə
təlimatlarla birlikdə yazma əməliyyatını rədd edir: CLI `2` kodu ilə çıxır, API isə
`containerEphemeralTarget: true` ilə `422` cavabı verir.

### Tövsiyə olunur: CLI-ni hostda, OmniRoute-u Docker-də işə salın

Konteyner API-ni təqdim edir; CLI isə host alətlərinizi konfiqurasiya edir.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-ni konteynerə yönəldin
omniroute setup-codex                      # hostunuzdakı həqiqi ~/.codex qovluğuna yazır
```

Codex, Claude Code, Cursor və ya oxşar alətlər noutbukunuzda işləyirsə, bu düzgün seçimdir
— adətən istifadə olunan quraşdırma da məhz budur.

### Alternativ: host konfiqurasiya qovluqlarını bind-mount edin (`host` profili)

Konteynerin özünün host konfiqurasiyanıza yazmasını istəyirsinizsə,
qovluqları mount edin və `CLI_CONFIG_HOME` dəyişənini mount kökünə yönəldin. `host` profili
bunu artıq edir:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Yolu etibarlı edən bind mount-dur: OmniRoute
`/proc/self/mountinfo` faylını oxuyur və mount edilmiş yollara (həmçinin
alt qovluqları mount edilmiş qovluqlara — yuxarıdakı `/host-home` strukturu məhz belədir) yazmağa icazə verir,
eyni zamanda mount edilməmiş yollara yazmağı rədd edir.

### Ehtiyat çıxış yolu: konteynerin öz CLI-lərini konfiqurasiya edin (yalnız zəruri hallarda istifadə edin)

CLI-lər həqiqətən konteyner daxilində olduqda (`cli` profili), yazma əməliyyatı
məqsədlidir. İstənilən `setup-*` əmrinə `--allow-container-write` parametrini ötürün və ya server üçün
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` təyin edin. Yazma əməliyyatı
məlumatların konteynerdən sonra saxlanmayacağı barədə xəbərdarlıqla davam edir.

> **Təhlükəsizlik xəbərdarlığı — `cli` profili + `docker.sock` mount-u.**
> `cli` profili `/var/run/docker.sock` yolunu bind-mount edir ki, konteyner daxilindəki
> avtomatik yeniləyici host demonundan steki yenidən yarada bilsin
> (`src/lib/system/autoUpdate.ts` həmin soketin mövcudluğunu yoxlayır və
> o olmadıqda Docker yolunu ötürür). Həmin soket **host-root etibar
> sərhədidir**: ona çata bilən hər şey hostun Docker demonunu root səlahiyyətləri ilə
> idarə edir — hostdakı istənilən konteyneri yarada, yoxlaya, dayandıra və silə bilər.
> Nəticələr:
>
> 1. **`cli` profilinin portunu heç vaxt şəbəkəyə açmayın.** Onu
>    `127.0.0.1` ünvanında dərc edin (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN üzərindən əlçatan `cli` profili idarə paneli səviyyəsindəki istənilən RCE-ni
>    hostun tam ələ keçirilməsinə çevirir.
> 2. **`cli` profilinə heç bir əlavə host qovluğu bind etməyin.**
>    Docker soketi ilə birlikdə istənilən əlavə mount konteynerə fayl sisteminizə və host
>    konfiqurasiyanıza tam oxuma/yazma icazəsi verir. Alətin layihəni
>    görməsi lazımdırsa, onu CLI binar faylı ilə lokal olaraq işə salın — layihəni
>    `cli` konteynerinə mount etməyin.
>
> Konteyner daxilində avtomatik yeniləməyə ehtiyacınız yoxdursa, `cli` profilini söndürülmüş saxlayın
> (`COMPOSE_PROFILES=core,redis` və ya daha qısa variant). Digər profillər
> Docker soketini mount etmir.
>
> MITM ilə bağlı təhdid modeli üçün `docs/security/MITM-TPROXY-DECRYPT.md` sənədinə (git-dədir; `/docs` daxilinə kompilyasiya edilmir),
> `codex`/`claude-code`/`droid`/`openclaw` binar fayllarının mənşə zənciri üçün isə
> `docs/security/SUPPLY_CHAIN.md` sənədinə baxın.

## Redis Sidecar

OmniRoute paylanmış sürət məhdudlaşdırıcısını və ortaq keşi təmin etmək üçün Redis-dən istifadə edir. `redis` xidməti `docker-compose.yml` faylında **həmişə müəyyən edilir** (profil məhdudiyyəti yoxdur) və istənilən digər profillə birlikdə işə düşür.

| Təfərrüat                  | Dəyər                                           |
| -------------------------- | ----------------------------------------------- |
| Obraz                      | `redis:7-alpine`                                |
| Konteyner adı              | `omniroute-redis`                               |
| Daxili port                | `6379`                                          |
| Host portu (əvəzləmə)      | `REDIS_PORT` (standart olaraq `6379`)           |
| Host bağlantısı (əvəzləmə) | `REDIS_BIND_HOST` (standart olaraq `127.0.0.1`) |
| Tom                        | `omniroute-redis-data` → `/data`                |
| Sağlamlıq yoxlaması        | `redis-cli ping` (10s interval)                 |

Əlaqəli mühit dəyişənləri:

- `REDIS_URL` — tətbiqə ötürülən bağlantı sətri (standart olaraq `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri üçün host tərəfindəki port uyğunlaşdırması.
- `REDIS_BIND_HOST` — portun yayımlandığı host interfeysi. Standart olaraq `127.0.0.1`.

> **Niyə standart olaraq geri döngə interfeysi:** sidecar `requirepass` olmadan işləyir və tətbiq
> konteynerləri ona compose şəbəkəsi (`redis:6379`) üzərindən qoşulur — yayımlanan port
> yalnız host tərəfindəki alətlər (`redis-cli`, lokal `npm run dev`) üçündür. Portun
> `0.0.0.0` üzərində yayımlanması autentifikasiya olunmamış Redis-i LAN şəbəkənizdəki bütün hostlara açıq edər. Əgər
> `REDIS_BIND_HOST=0.0.0.0` təyin etsəniz, xidmətin `command:` parametrinə `--requirepass` də əlavə edin.

**Redis-in deaktiv edilməsi** tövsiyə olunmur (sürət məhdudlaşdırıcısı yaddaşdaxili ehtiyat mexanizminə keçərək zəifləyəcək). Bunu etməlisinizsə, `docker-compose.yml` faylındakı `redis:` xidmət blokunu silin/şərhə çevirin və ya onu sıfıra qədər miqyaslandırın:

```bash
docker compose up -d --scale redis=0
```

## İstehsal Compose-u

Dev mühiti ilə yanaşı işləyən təcrid olunmuş istehsal anlıq görüntüsü üçün `docker-compose.prod.yml` faylından istifadə edin.

| Təfərrüat                   | Dəyər                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| Fayl                        | `docker-compose.prod.yml`                                                                  |
| Standart idarə paneli portu | `PROD_DASHBOARD_PORT=20130` (daxili `${DASHBOARD_PORT:-20128}` portuna uyğunlaşdırılır)    |
| Standart API portu          | `PROD_API_PORT=20131`                                                                      |
| Obraz                       | `omniroute:prod` (`runner-cli` hədəfindən yaradılır)                                       |
| Redis konteyneri            | `omniroute-redis-prod` (`redis:8.6.2`, ayrıca `redis-prod-data` tomu)                      |
| Məlumat tomu                | `omniroute-prod-data` (adlandırılmış, yenidən qurmalar arasında saxlanılır)                |
| Sağlamlıq yoxlamaları       | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` isə Redis-in sağlamlığına bağlıdır |

İstifadə qaydası:

```bash
# İstehsal stekini yaradın və başladın
docker compose -f docker-compose.prod.yml up -d --build

# Jurnalları axın şəklində izləyin
docker compose -f docker-compose.prod.yml logs -f

# Dayandırın və silin (tomları saxlayın)
docker compose -f docker-compose.prod.yml down
```

İstehsal steki dev compose-u ilə paralel işləyir (konteyner adları, portları və tomları fərqlidir), buna görə istehsal mühiti işlək qalarkən lokal olaraq işləməyə davam edə bilərsiniz.

## Dockerfile mərhələləri

Repozitoriya çoxmərhələli Dockerfile (`Dockerfile`) ilə təqdim olunur. Üç mərhələ əlçatandır; istifadə ssenarinizə uyğun `target` seçin.

| Mərhələ       | Baza təsviri          | Məqsəd                                                                                                                                                                               |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Asılılıqları quraşdırır (`npm ci --legacy-peer-deps`) və `npm run build` işlədir (standart olaraq Turbopack — aşağıdakı Yığım zamanı resurslar bölməsinə baxın)                      |
| `runner-base` | `node:26-trixie-slim` | Next.js-in müstəqil çıxışı ilə istehsal mühiti. **Provayder CLI-ləri daxil edilməyib.**                                                                                              |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` və qlobal CLI-ləri əlavə edir: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agent əsaslı iş axınları üçün bunu seçin.** |

Konkret hədəfi əl ilə yığın:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Yığım zamanı resurslar

Üç yığım arqumenti `builder` mərhələsinin resurs sərfiyyatını idarə edir. Bunlar yalnız yığım zamanı üçündür —
`OMNIROUTE_MEMORY_MB` (aşağıda) ayrıca icra zamanı parametridir.

| Yığım arqumenti             | Standart | Təsir                                                                                                          |
| --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | `0` olduqda webpack ilə yığır. Maksimum yaddaş istifadəsi daha az, sürəti daha aşağıdır.                       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | İşə salınan `next build` üçün V8 heap həddi (`--max-old-space-size`).                                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` üçün dəyər verir; Next səhifə məlumatlarının toplanması üçün `workers = N - 1` hesablayır. |

`OMNIROUTE_BUILD_WORKERS` güclü yığım sistemində artırılmalı, məhdud resurslu
yığım **`✓ Compiled successfully` mesajından sonra** dayanarsa isə şübhə edilməli
olan parametrdir. Hər bir səhifə məlumatı worker-i ayrıca prosesdir və əsas
`next build` prosesinin özü də belədir; real VPS-də aparılmış təkrar sınaqda
(issue #7518) hər prosesin maksimum RSS göstəricisi `NODE_OPTIONS` heap
parametrindən asılı olmayaraq ~4.5 GB ölçülüb (Turbopack V8 heap-dən kənarda,
yerli/Rust yaddaşında kompilyasiya edir). Standart `2` dəyəri (→ 1 worker,
cəmi 2 proses) dərcetmə konveyerinin istifadə etdiyi 16 GB / 4 vCPU-lu GitHub
runner-ləri üçün hesablanıb. `8` dəyərində (→ 7 worker) həmin runner-in yaddaşı
tükənib və buildkit mərhələni `ResourceExhausted: ... cannot allocate memory`
xətası ilə dayandırıb; proses başına RSS dolayı yolla hesablanmaq əvəzinə
birbaşa ölçüldükdə `3` (→ 2 worker) dəyəri də mövcud yaddaşa sığmayıb.
`tests/unit/docker-build-memory-budget.test.ts` ölçülmüş göstərici əsasında
hesablamanı aparır və parametrlərdən hər hansı biri runner-in imkanlarını
aşarsa, test uğursuz olur.

Turbopack V8 heap-dən **kənarda** yerləşən yerli Rust yaddaşında kompilyasiya
edir, buna görə də `OMNIROUTE_BUILD_MEMORY_MB` onu məhdudlaşdırmır. Yaddaş
həddi olan hostda yığım OOM killer tərəfindən heç bir xəta mətni olmadan
SIGKILL ilə dayandırılır — proses sadəcə `Creating an optimized production build`
mərhələsinin ortasında dayanır və bu, yaddaş çatışmazlığından daha çox donma kimi
görünür. Yığım hostunun resursları məhduddursa, bundler-i dəyişin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` aktivdir, buna görə `next build` əsas prosesi **və** worker
prosesini işə salır və hər biri `OMNIROUTE_BUILD_MEMORY_MB` parametrinə ayrıca
riayət edir. Konteyner həddini bu dəyərin bir qatı deyil, təxminən iki qatından
yuxarı təyin edin.

Bu kod ağacında ölçülüb (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Konteyner həddi | Nəticə                                  |
| --------- | --------------- | --------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | hər iki həddə səssizcə OOM ilə dayandı  |
| webpack   | 8 GiB           | yığım worker-i SIGKILL ilə dayandırıldı |
| webpack   | 12 GiB          | uğurlu oldu, maksimum 11.1 GiB-a çatdı  |

### İcra zamanı standartları

`runner-base` tərəfindən ixrac edilən standart dəyərlər: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker-də yaddaş davranışı:

- Təsvir `OMNIROUTE_MEMORY_MB=1024` təyin edir və bundan `NODE_OPTIONS=--max-old-space-size=1024` dəyərini yaradır.
- Faktiki server prosesi `OMNIROUTE_MEMORY_MB` dəyərini oxuyan və `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` əlavə edən müstəqil işəsalıcı tərəfindən başladılır.
- Node təkrarlanan `--max-old-space-size` dəyərlərindən sonuncusunu istifadə edir, buna görə `OMNIROUTE_MEMORY_MB` parametrinin təyin edilməsi Docker-də effektiv heap həddini idarə edir.
- Təsvir bu dəyəri həmişə təyin etdiyindən, işəsalıcının RAM həcminə uyğunlaşdırılmış ehtiyat dəyəri Docker altında heç vaxt tətbiq edilmir. İş yükü üçün onu açıq şəkildə artırın (aşağıdakı cədvələ baxın). Kodlaşdırma agentlərinin `/v1/responses` sorğuları üçün `2048` hələ də çox azdır.

### Kodlaşdırma agentləri üçün icra zamanı RAM

Docker-in standart 1 GiB dəyəri istehsal mühiti üçün ölçü deyil, idarəetmə paneli/yüngül söhbət üçün minimum həddir. Uzun `POST /v1/responses` gövdələri (yüzlərlə mesaj, onlarla alət) sıxılma zamanı yaddaşda bir neçə qraf saxlayır. Üst-üstə düşən təxminən 3 MiB / 750k tokenlik iki sorğu **12 GiB** old-space həddində V8-i dayandırıb (`FATAL ERROR: Reached heap limit`) və həmçinin 16 GiB cgroup OOM həddinə çatıb. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) bölməsinə baxın.

**cgroup `--memory` dəyərini heap-dən yuxarı** təyin edin — yerli buferlər, SQLite və sıxılmanın aralıq məlumatları V8-dən kənarda yerləşir.

| İş yükü                                    | `OMNIROUTE_MEMORY_MB`         | Konteyner / cgroup          | Qeydlər                                                                                                                                                 |
| ------------------------------------------ | ----------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| İdarə paneli, bir yüngül söhbət            | `1024` (image standartı)      | ≥2 GiB                      |                                                                                                                                                         |
| Bir kodlaşdırma agenti (Claude/Codex/Grok) | `8192`                        | ≥10 GiB                     | Tipik tək sessiyalı `/v1/responses`                                                                                                                     |
| İki paralel uzun `/v1/responses`           | `10240`–`12288`               | ≥12–16 GiB                  | V8-in dayandırılması təxminən 12 GiB heap həcmində ölçülüb                                                                                              |
| Üç və ya daha çox paralel uzun kontekst    | bir prosesdə istifadə etməyin | ardıcıl icra / daha çox RAM | Standart ağır iş qəbulu eyni anda icra olunan 1 sorğu ilə məhdudlaşır; RAM artırılmadan bu həddin yüksəldilməsi dayandırılma problemini yenidən yaradır |

`OMNIROUTE_MEMORY_MB` **təyin edilmədikdə**, fiziki serverdə `omniroute serve` RAM-ın təxminən 35%-ni (`[512, 4096]` aralığı ilə məhdudlaşdırılaraq) kalibrləyir. Docker həmişə `1024` təyin etdiyinə görə rəsmi image-də bu kalibrləmə heç vaxt işə düşmür.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritik Mühit Dəyişənləri

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) sənədində qeyd olunan standart dəyərlərdən əlavə, Docker altında işləyərkən aşağıdakı dəyişənlər daha vacibdir:

| Dəyişən                       | Məqsəd                                                                                                                                                                                                                                                                                                     | Standart dəyər                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket körpüsü üçün ortaq məxfi açar. **İstehsal mühitində tələb olunur** — güclü təsadüfi sətir təyin edin.                                                                                                                                                                                            | təyin edilməyib (təqdim edilməlidir) |
| `REDIS_URL`                   | Sorğu tezliyi məhdudlaşdırıcısı / keş arxa tərəfi üçün bağlantı sətri                                                                                                                                                                                                                                      | `redis://redis:6379`                 |
| `REDIS_PORT`                  | Daxil edilmiş Redis konteyneri üçün host tərəfindəki port                                                                                                                                                                                                                                                  | `6379`                               |
| `REDIS_BIND_HOST`             | Daxil edilmiş Redis portunun yayımlandığı host interfeysi (AUTH əlavə etmədiyiniz halda geriyə döngə interfeysi)                                                                                                                                                                                           | `127.0.0.1`                          |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Özünü yeniləmə iş axınları üçün `cli` profilində `/workspace/omniroute` ünvanına qoşulan host yolu                                                                                                                                                                                                         | `.` (cari kataloq)                   |
| `OMNIROUTE_MEMORY_MB`         | Docker müstəqil serveri üçün Node icra mühitinin heap yaddaşı həddi; yuxarıdakı obrazın standart dəyərini əvəz edir. Kodlaşdırma agentləri: `8192`+ ([icra mühitinin RAM yaddaşı](#runtime-ram-for-coding-agents) bölməsinə baxın).                                                                        | `1024`                               |
| `DASHBOARD_PORT` / `API_PORT` | İdarəetmə paneli (20128) və API (20129) üçün açıq portları əvəz edir                                                                                                                                                                                                                                       | `20128` / `20129`                    |
| `APP_BIND_HOST`               | docker-compose-un idarəetmə paneli/API/canlı-WS portlarını yayımladığı host interfeysi. `REQUIRE_API_KEY=false` olduqda (standart), `0.0.0.0` anonim `/v1` proksisini LAN üçün əlçatan edir — yalnız `REQUIRE_API_KEY=true` olduqda və ya qarşısında əks proksi yerləşdikdə əhatə dairəsini genişləndirin. | `127.0.0.1`                          |
| `CLIPROXY_BIND_HOST`          | docker-compose-un `cliproxyapi` yan konteynerini yayımladığı host interfeysi — onun məlumat cildində provayder giriş məlumatları saxlanılır.                                                                                                                                                               | `127.0.0.1`                          |
| `OMNIROUTE_PLUGINS_DIR`       | İcra mühiti plagin skanerinin oxuduğu və quraşdırma apardığı kataloq. Plaginlər bind-mount vasitəsilə qoşulduqda bunu təyin edin: standart dəyər `HOME` dəyişənini izləyir, lakin obrazın onu ixrac etməsi məcburi deyil.                                                                                  | `~/.omniroute/plugins`               |
| `OMNIROUTE_BASE_PATH`         | Tətbiq əks proksinin arxasında dərc edildikdə istifadə olunan URL alt yolu (məsələn, `/omniroute`)                                                                                                                                                                                                         | _(boş = kök)_                        |
| `NEXT_PUBLIC_BASE_URL`        | Alt yol daxil olmaqla ictimai brauzer mənşəyi (məsələn, `https://host/omniroute`)                                                                                                                                                                                                                          | təyin edilməyib                      |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` üçün host tərəfindəki idarəetmə paneli portu                                                                                                                                                                                                                                     | `20130`                              |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yan konteyneri üçün host tərəfindəki port                                                                                                                                                                                                                                                    | `8317`                               |

## Alt yolda əks proksi (Traefik / nginx)

Next.js `basePath` dəyəri müstəqil paketə kompilyasiya edilir. OmniRoute əvvəlcədən daxil edilmiş
dəyəri tətbiqin kökündəki sentinel faylında qeyd edir (`npm run build` zamanı yazılır;
`scripts/docker/ensure-docker-base-path.mjs` tərəfindən oxunur) və konteyner başladıqda onu
`OMNIROUTE_BASE_PATH` ilə müqayisə edir. Dəyərlər fərqli olduqda və image domen kökü üçün
qurulduqda, giriş nöqtəsi `node dev/run-standalone.mjs` işə düşməzdən əvvəl müstəqil
manifestləri, daxil edilmiş `basePath`/`assetPrefix` literallarını (Next 16 SSR resurs
URL-lərini yalnız `assetPrefix` əsasında yaradır — yamaqlayıcı alt yolu ona da əks etdirir),
əvvəlcədən daxil edilmiş `/_next/static` resurs URL-lərini (müştəri istinad manifestləri,
media importları, əvvəlcədən render edilmiş xəta səhifələri) və müştəri `process.env`
şimini yenidən yazır.

### Compose ilə qurma (tövsiyə olunur)

Hər iki dəyişəni `.env` daxilində təyin edin, sonra image və icra mühitinin uyğun olması
üçün yenidən qurun:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` dəyişənini Docker qurma arqumenti və icra
mühiti dəyişəni kimi ötürür.

### Əvvəlcədən qurulmuş kök image-i + icra zamanı alt yol

Yayımlanmış `diegosouzapw/omniroute:*` image-ləri domen kökü üçün qurulub. Buna baxmayaraq,
icra zamanı `OMNIROUTE_BASE_PATH` təyin edə bilərsiniz; konteyner başlanğıcda paketi bir
dəfə yamayır. Onu uyğun ictimai mənbə ünvanı ilə birlikdə istifadə edin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Əks proksini **tam** xarici yolu ötürəcək şəkildə konfiqurasiya edin (prefiksi silməyin).
Traefik, `PathPrefix(`/omniroute`)` yolunu `StripPrefix` olmadan konteynerə
yönləndirməlidir ki, Next.js `/omniroute/...` qəbul etsin və resursları
`/omniroute/_next/...` yolundan təqdim etsin.

Docker sağlamlıq yoxlaması aktiv `OMNIROUTE_BASE_PATH` prefiksi əlavə edilmiş yüngül
`/healthz` həyat dövrü son nöqtəsini yoxlayır. İnsanlar və idarəetmə panelləri üçün
diaqnostika məqsədilə `/api/monitoring/health` əlçatan qalır; konteynerin HEALTHCHECK
yoxlamasını yenidən ona yönəltmək üçün (məsələn, dərin sağlamlıq nəzarəti məqsədilə)
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` təyin edin. Bu yol **dərin**
yoxlamadır (DB + monitorinq xülasəsi) — yenidən aktiv etməyi seçsəniz, Docker-in seyrək
`HEALTHCHECK` yoxlaması üçün uyğundur, lakin Kubernetes `livenessProbe` intervalları
üçün **uyğun deyil**.

Orkestratorlar (Kubernetes, Nomad və s.) üçün:

| Yoxlama          | Üstünlük verin                                                     | Çəkinin                                                          |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Canlılıq         | HTTP `GET /livez` və ya əsas portda TCP (`PORT`, standart `20128`) | Canlılıq yoxlaması kimi `/api/monitoring/health`                 |
| Hazırlıq         | HTTP `GET /healthz`                                                | Hadisə dövrəsinin məşğulluğunu dayanma sayan qısa vaxt limitləri |
| Dərin / blackbox | `/api/monitoring/health`                                           | —                                                                |

`/healthz` prosesin həyat dövrü vəziyyətini (`ok` / `starting` / `stopping`) bildirir.
`/livez` yalnız prosesin işlək olub-olmadığını yoxlayır (işləyici icra oluna bildiyi
müddətdə 200 qaytarır; hazırlığı gözləmir). Hər ikisi sorğuların emalı ilə eyni Node
hadisə dövrəsində işləyir, buna görə də CPU-yüklü kataloq və ya sıxılma əməliyyatları
onları gecikdirə bilər — məşğul ≠ dayanmış. HTTP yoxlamalarında vaxt limiti aşılırsa,
TCP canlılıq yoxlamasına üstünlük verin. Yoxlamalar üzrə tam təlimat:
[Monitorinq təlimatı — Kubernetes yoxlamaları üzrə tövsiyələr](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy ilə Docker Compose (HTTPS Auto-TLS)

OmniRoute, Caddy-nin avtomatik SSL təminatı vasitəsilə təhlükəsiz şəkildə əlçatan edilə bilər. Domeninizin DNS A qeydinin serverinizin IP ünvanını göstərdiyinə əmin olun.

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
      # OAuth geri çağırışları, idarəetmə paneli keçidləri və yaradılan ictimai URL-lər üçün brauzerə yönəlik mənbə.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Planlaşdırılmış tapşırıqlar / özünə sorğular üçün daxili serverlərarası URL.
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

Caddy yuxarı axın konteyneri üçün standart yönləndirmə başlıqlarını təyin edir. OmniRoute, OAuth geri çağırışları və yaradılan ictimai keçidlər üçün kanonik ictimai mənbə kimi
`NEXT_PUBLIC_BASE_URL` istifadə edir; autentifikasiya edilmiş idarəetmə paneli yazma əməliyyatları eyni mənbəli sorğulardan və sessiyaya bağlı CSRF
qorunmasından istifadə edir. `OMNIROUTE_TRUST_PROXY` parametrini yalnız OmniRoute-un ictimai mənbəni açıq
konfiqurasiya əvəzinə etibarlı yönləndirilmiş başlıqlardan müəyyən etməsini məqsədli şəkildə istədiyiniz qabaqcıl quraşdırmalarda aktivləşdirin.

## Cloudflare Quick Tunnel

Docker quraşdırmaları üçün idarəetmə paneli dəstəyinə `Dashboard → Endpoints` bölməsində bir kliklə aktivləşdirilən **Cloudflare Quick Tunnel** daxildir. İlk aktivləşdirmə zamanı `cloudflared` yalnız ehtiyac olduqda endirilir, cari `/v1` son nöqtənizə müvəqqəti tunel başladılır və yaradılmış `https://*.trycloudflare.com/v1` URL-i adi ictimai URL-inizin birbaşa altında göstərilir.

Son nöqtə tuneli panelləri (Cloudflare, Tailscale, ngrok) aktiv tunelin vəziyyətini dəyişdirmədən `Settings → Appearance` bölməsindən göstərilə və ya gizlədilə bilər.

### Tunel qeydləri

- Quick Tunnel URL-ləri müvəqqətidir və hər yenidən başlatmadan sonra dəyişir.
- Quick Tunnel-lər OmniRoute və ya konteyner yenidən başladıldıqdan sonra avtomatik bərpa edilmir. Ehtiyac olduqda onları idarəetmə panelindən yenidən aktivləşdirin.
- İdarə olunan quraşdırma hazırda `x64` / `arm64` üzərində Linux, macOS və Windows-u dəstəkləyir.
- Məhdud konteyner mühitlərində səs-küylü QUIC UDP bufer xəbərdarlıqlarının qarşısını almaq üçün idarə olunan Quick Tunnel-lər defolt olaraq HTTP/2 nəqliyyatından istifadə edir. Fərqli nəqliyyat protokolu istəyirsinizsə, `CLOUDFLARED_PROTOCOL=quic` və ya `auto` təyin edin.
- Docker obrazları sistem CA kök sertifikatlarını özündə birləşdirir və onları idarə olunan `cloudflared` prosesinə ötürür; bu, tunel konteyner daxilində başladılarkən TLS etibar xətalarının qarşısını alır.
- OmniRoute-un endirmək əvəzinə mövcud binar fayldan istifadə etməsini istəyirsinizsə, `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` təyin edin.

## Obraz teqləri

| Obraz                    | Teq      | Ölçü   | Təsvir                                                      |
| ------------------------ | -------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Ən yüksək **dərc edilmiş** stabil SemVer (git `main` deyil) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps üçün bu teq sinfini sabitləyin                       |

Çoxplatformalı manifest: yerli `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker uyğun arxitekturanı avtomatik seçir; ARM hostlarında AMD64 emulyasiyasını məcbur etmək lazımdırsa, `--platform linux/amd64` parametrini ötürün.

### Buraxılış kanalları

OmniRoute stabil buraxılışlar, aktiv buraxılış budağının sınaqları və inkişaf versiyaları üçün ayrı-ayrı Docker kanalları dərc edir.

| Kanal                           | Mənbə                                    | Dəyişkənlik                          | Tövsiyə olunan istifadə                                                                                                        |
| ------------------------------- | ---------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | İmzalanmış/versiyalaşdırılmış buraxılış  | Dəyişməz                             | Dəqiq buraxılışa sabitlənən istehsal quraşdırmaları                                                                            |
| `:latest` / `:latest-web`       | Ən yüksək **dərc edilmiş** stabil SemVer | Dəyişkən stabil göstərici            | SemVer dərc tapşırığından **sonra** stabil buraxılışları izləyir — `main` və ya buraxılmamış `release/v*` kommitlərini izləmir |
| `:next` / `:next-web`           | Cari defolt `release/v*` budağı          | Dəyişkən ilkin buraxılış göstəricisi | Aktiv buraxılış budağına daxil edilmiş, lakin hələ stabil buraxılışa daxil olmayan düzəlişlərin sınaqdan keçirilməsi           |
| `:main` / `:main-web`           | `main` budağı                            | Dəyişkən inkişaf göstəricisi         | Yalnız inkişaf və inteqrasiya sınaqları                                                                                        |

#### İlkin buraxılış kanalından istifadə

`next` kanalı cari defolt `release/v*` budağına edilən hər göndərişdə yenidən yığılır və həm AMD64, həm də ARM64 üçün dərc edilir. Köhnə texniki xidmət budaqları onun üzərinə yaza bilməz. Kanal növbəti stabil teq yaradılmazdan əvvəl aktiv buraxılış budağına birləşdirilmiş düzəlişlər üçün endirilə bilən obraz təqdim edir.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose üçün seçilmiş profilin istifadə etdiyi obraz teqini əvəzləyin, sonra xidməti endirib yenidən yaradın:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Təhlükəsizlik və geri qaytarma

`next` dəyişkən ilkin buraxılış kanalıdır. Aktiv buraxılış budağına edilən istənilən göndərişdə dəyişə bilər və **istehsalda istifadə üçün dəstəklənmir**. Konkret yığımı qiymətləndirərkən obraz daycestini sabitləyin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sınaqdan əvvəl OmniRoute məlumat həcminin və ya bind-mount edilmiş məlumat qovluğunun ehtiyat nüsxəsini yaradın. Əvvəlki vəziyyətə qayıtmaq üçün daha əvvəl istifadə edilmiş stabil versiyanı və ya digest-i bərpa edin və konteyneri yenidən yaradın:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Release branch-dən olan build heç vaxt `latest` teqini dəyişə bilməz; stabil göstəricini yalnız uyğun stabil semantik versiya irəli çəkə bilər. `next` image-ləri release image yoxlamasını və CRITICAL səviyyəli zəifliklər üçün bloklayıcı yoxlama mərhələsini saxlayır.

**`latest` git üçün aktuallıq zəmanəti deyil.** `main` və ya aktiv `release/v*` branch-ində birləşdirilmiş düzəlişlər stabil SemVer image-i dərc edilənə və dərcetmə job-u `:latest` teqini həmin versiyaya (o SemVer ilə eyni digest) yönəldənə qədər `:latest` daxilində **olmur**. GitHub-da düzəliş artıq göründüyü halda `latest` dəyişməz görünürsə, release branch-ini sınaqdan keçirmək üçün `:next` image-ini çəkin və ya SemVer teqini gözləyin.

| İstəyiniz                                                                                   | İstifadə edin                                   |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Dəyişməməli olan GitOps / production                                                        | `:X.Y.Z` teqini (və ya image digest-i) pinləyin |
| Dərc edilmiş stabil versiyaları izləmək və hər release zamanı yenidən yaratmanı qəbul etmək | `:latest`                                       |
| Dərc edilməmiş `release/v*` commit-lərini sınaqdan keçirmək                                 | `:next` (production üçün deyil)                 |
| `main` branch-ini sınaqdan keçirmək                                                         | `:main` (production üçün deyil)                 |

## Əlçatanlıq: standart SQLite tək replikalıdır

Standart Docker / Kubernetes OmniRoute topologiyası **bir Node prosesi + bir SQLite yazıcısından** ibarətdir. Bu topologiyada yüksək əlçatanlıq **dəstəklənmir**.

| Məhdudiyyət                                                              | Nəticə                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tək yazıcı                                                               | Eyni SQLite faylı ilə **bir neçə replika işlətməyin**. Bu, verilənlər bazasını korlayır.                                                                                                                                                                                                                                                                                     |
| Yenidən yaratma / yenidən başlatma / HEALTHCHECK tərəfindən dayandırılma | İcrası davam edən SSE bağlantılarının, idarə paneli sessiyalarının və yaddaşdaxili vəziyyətin **tam dayanması**. Bütün qoşulmuş klientlərin bağlantısı kəsilir. Endpoint-in olmadığı zaman pəncərəsində yeni sorğular OmniRoute JSON deyil, əks proksidən **`502 Bad Gateway: Unknown error`** alır — klientlər bunu provayder nasazlığından fərqləndirə bilmirlər (#11015). |
| `/healthz` ilə eyni hadisə dövrəsi                                       | Məşğul kataloq və ya sıxılma intervalı yoxlamaları gecikdirə bilər; qısa timeout isə **yeganə** replikanı yenidən başladar.                                                                                                                                                                                                                                                  |

**Yoxlama matrisi** (həmçinin [Kubernetes yoxlamaları üzrə tövsiyələrə](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) baxın):

| Yoxlama               | Hədəf                                                               | İstifadə etməyin                                                           |
| --------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Canlılıq              | `PORT` üzərində TCP (standart `20128`) və ya yumşaq HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Hazırlıq              | HTTP `GET /healthz`                                                 | Hadisə dövrəsinin məşğul olmasını dayanma kimi qəbul edən sərt timeout-lar |
| Dərin / insanlar üçün | `/api/monitoring/health`                                            | Avtomatlaşdırılmış kubelet canlılıq yoxlaması                              |

**Yeniləmələr:** bütün sessiyaların kəsiləcəyini nəzərə alın. Mümkündürsə, klientlərə xidməti dayandırmazdan əvvəl onların işini tamamlamasını gözləyin; standart SQLite ilə mərhələli yeniləmə yoxdur. Compose daxilindəki `restart: unless-stopped` və Docker `HEALTHCHECK` də konteyner Unhealthy vəziyyətinə düşdükdə yeganə prosesi əvəz edəcək — təsir dairəsi eynidir.

**Tək replika** üçün Kubernetes fraqmenti (Recreate tələb olunur; bir SQLite faylı ilə `replicas` sayını artırmayın):

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

`preStop` gecikməsi kube-a SIGTERM-dən əvvəl Service endpoint-lərini çıxarmaq imkanı verir ki, **yeni** trafik dayanmaqda olan prosesə yönəlməsin. İcrası davam edən `/v1/responses` SSE bağlantılarının tamamlanması üçün ağırçəkili qəbul icarələri vasitəsilə `SHUTDOWN_TIMEOUT_MS` müddətinədək (standart olaraq 30 saniyə) gözlənilir (#11015). Prosesə hələ də çatan yeni sorğular `503` + `Retry-After: 5` alır. Əvəzləyici Ready vəziyyətinə gələnədək davam edən Recreate boş endpoint intervalı tam dayanma olaraq qalır — bu, yanlış yoxlama konfiqurasiyası deyil, SQLite topologiyasının xüsusiyyətidir.

Xarici Postgres / çoxyazıcılı HA **sənədləşdirilmiş standart istifadə yolu deyil**. HA tələb olunursa, tək replikanı saxlayın və ya layihənin ayrıca sınaqdan keçirib sənədləşdirdiyi topologiyadan istifadə edin. Postgres/MySQL işi [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) daxilində aparılır. Bu funksiya buraxılanadək **böyük** `/v1/responses` tutumunu artırmağın dəstəklənən yeganə yolu bir volume üzərində `replicas > 1` deyil, N müstəqil prosesdir (növbəti bölmə).

## Üfüqi miqyaslama: N müstəqil proses

Bir Node prosesi **bir V8 heap-i** deməkdir. Üst-üstə düşən iki ~3 MiB / ~750k-tokenlik kodlaşdırma agenti `POST /v1/responses` sorğusu (RTK + Caveman) təxminən 12 Gi səviyyəsində həmin heap-i dayandırır (`FATAL ERROR: Reached heap limit`) və 16 Gi cgroup-da OOM-a səbəb ola bilər. Baxın: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Bu ölçmə paralel uzun `/v1/responses` sorğuları üçün məhsulun sərt maksimumunun iki olduğunu deyil, **yaddaş büdcəsi** ilə bağlı xəbərdarlığı göstərir. Ağır çat sorğularının qəbulu eyni V8/cgroup həddindən avtomatik hesablanan qəbul bayt büdcəsi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ilə məhdudlaşdırılır — ölçüsü artıq müəyyən edilmiş prosesdə bunu yuxarı istiqamətdə dəyişmək (və ya köhnə `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` sorğu sayı limitini təyin etmək) prosesi yenidən dayandırır. Kiçik çatlar, `/healthz`, `/v1/models` və MCP bu limitə **daxil deyil**.

### Bir proses: ikidən çox uzun `/v1/responses`

**Sağlam** proses (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` dəyərindən aşağıdır, standart olaraq `0.75`) proses miqyaslı emal olunan bayt büdcəsində (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hələ yer olduqda ikidən çox paralel uzun `POST /v1/responses` sorğusunu icra **edə bilər**. Ölçüsü `OMNIROUTE_CHAT_LARGE_BODY_BYTES` dəyərinə bərabər və ya ondan böyük olan sorğu gövdələri (standart olaraq 256 KiB) struktur baxımından ağır sorğularla eyni ağır iş icarəsini əldə edir və eyni [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` istisnasından (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) istifadə edir. Onlarla paralel uzun SSE müştərisi (operatorlara çox vaxt 40–50 lazımdır) məhsulun sərt “maksimum 2” limiti deyil, **yaddaş büdcəsi** məsələsidir — heap + əsas/ehtiyat slotlar + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ölçülərini uyğunlaşdırın. Təzyiq altındakı heap yenə də təkrar sınana bilən `503` cavabı ilə yükü azaldır ki, #7849 problemi geri qayıtmasın.

Heap-lərin sayını (müstəqil V8 old-space-ləri) **hazırda** artırmaq üçün:

| Edin                                                                                                                                                                       | Etməyin                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Hər birinin **öz** `DATA_DIR` / volume-u olan **N konteyner/pod** işə salın                                                                                                | Bir SQLite faylı üçün `replicas > 1` təyin etməyin                       |
| Ağır emaldakı sorğuların + sağlam ehtiyatın ölçüsünü heap / emaldakı bayt büdcəsinə əsasən müəyyən edin; 1–2 konservativ #7849 standartıdır, məhsulun sərt maksimumu deyil | Bir prosesə 8× RAM və limitsiz sorğu sayı limiti verməyin                |
| İstəyə bağlı: **ortaq kvota sayğacları** üçün `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                         | Redis-i ortaq SQLite hesab etməyin — belə deyil                          |
| Provayder məxfi məlumatlarını hər instansiyaya kopyalayın (və ya bölünmüş idarə panellərini qəbul edin)                                                                    | Instansiyalar üzrə vahid idarə paneli / vahid çağırış jurnalı gözləməyin |
| Qarşısına istənilən yük balanslaşdırıcısını yerləşdirin; API açarına və ya sessiyaya görə yapışqanlıq kifayətdir                                                           | Təchizatçıya xas ölçüdən xəbərdar middleware tələb etməyin               |

Avadanlıq: hər instansiyada paralel uzun `/v1/responses` sorğularının sayı **yaddaş büdcəsi** məsələsidir (heap + emaldakı bayt büdcəsi / #10110). Müstəqil `DATA_DIR`-lərə malik `N` instansiya yenə də heap-lərin sayını artırır: host RAM-ı “N=8 olan bir 16 Gi pod” deyil, `N × cgroup` həcmini qarşılamalıdır. Bir SQLite faylı üçün heç vaxt `replicas > 1` istifadə etməyin.

Compose nümunəsi (iki heap, iki volume — `deploy.replicas: 2` deyil):

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

Prosesdaxili sıxlıq (HTTP isolate-dan kənarda sıxılma) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) mövzusudur. Ortaq davamlı vəziyyət üzərində vahid məntiqi klaster isə [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) mövzusudur.

## Vacib qeydlər

- **SQLite WAL rejimi:** OmniRoute-un ən son dəyişiklikləri yenidən `storage.sqlite` faylına yoxlama nöqtəsi kimi yaza bilməsi üçün `docker stop` əməliyyatının tamamlanmasına imkan verilməlidir. Daxil edilmiş Compose fayllarında dayandırma üçün artıq 40 saniyəlik güzəşt müddəti təyin edilib. İmajı birbaşa işə salırsınızsa, `--stop-timeout 40` parametrini saxlayın.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Planlı/yazmadan əvvəl ehtiyat nüsxələmə xarici sistem tərəfindən idarə edilirsə, `true` olaraq təyin edin. Mövcud verilənlər bazasının miqrasiyaları üçün yenə də ayrıca davamlı təhlükəsizlik anlıq görüntüsü və kütləvi miqrasiya qoruyucusu tələb olunur.
- **Məlumatların davamlı saxlanması:** Konteyner yenidən başladıldıqda verilənlər bazanızı, açarlarınızı və konfiqurasiyalarınızı qorumaq üçün həmişə `/app/data` yoluna bir həcm qoşun.
- **Port konfiqurasiyası:** Standart `20128` portunu dəyişdirmək üçün `PORT` mühit dəyişənini yenidən təyin edin.

## Həmçinin baxın

- [VM-də yerləşdirmə təlimatı](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare quraşdırması
- [Fly.io-da yerləşdirmə təlimatı](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-da yerləşdirmə
- [Mühit konfiqurasiyası](../reference/ENVIRONMENT.md) — Tam `.env` istinad sənədi
