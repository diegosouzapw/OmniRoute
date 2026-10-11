# 🐳 Docker Guide — OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker yerləşdirməsi üzrə tam istinad sənədi. Sürətli başlanğıc üçün [README sənədinin Docker bölməsinə](../README.md#-docker) baxın.

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
- [Docker daxilində Gemini regional xətaları](#gemini-regional-errors-inside-docker)
- [Vacib qeydlər](#important-notes)

---

## Sürətli işə salma

> **Bir əmrlə öz serverinizdə yerləşdirmək istəyirsiniz?**
> [Öz serverinizdə yerləşdirmə təlimatına](../getting-started/SELF_HOST_GUIDE.md) baxın —
> `docker compose -f docker-compose.selfhost.yml up -d` (dərc edilmiş imaj +
> Redis, yalnız loopback, profil seçimi olmadan). Aşağıdakı sürətli işə salma
> artıq Redis-i başqa yerdə işlədən istifadəçilər üçün tək konteynerli üsuldur.

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

# Host profili (ilk növbədə Linux üçün; host CLI binar fayllarını yalnız oxuma rejimində qoşur)
docker compose --profile host up -d

# Veb profili (veb sessiya provayderləri üçün Chromium/Playwright)
docker compose --profile web up -d

# CLI və CLIProxyAPI yan konteynerini birləşdirin
docker compose --profile cli --profile cliproxyapi up -d
```

## Mövcud profillər

OmniRoute əsas yerləşdirmə formaları üçün Compose profilləri ilə təqdim olunur. Mühitinizə uyğun olanı seçin.

| Profil            | Xidmət           | İstifadə məqsədi                                                                                                                                          | Əmr                                          |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standart) | `omniroute-base` | Başsız server / minimal icra mühiti; provayder CLI-ləri daxil deyil                                                                                       | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` və daxil edilmiş CLI-ləri (Codex, Claude Code, Droid, OpenClaw) çağıran agent əsaslı iş axınları                       | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` və s. qovluqları yalnız oxuma rejimində qoşaraq host CLI-lərinə `network_mode` tipli giriş istəyən Linux hostları | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Yuxarı axın CLI proksiləməsi üçün [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) yan konteynerini `8317` portunda işə salmaq                 | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Brauzer tələb edən veb sessiya provayderləri: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` qurulur, Chromium daxildir)                    | `docker compose --profile web up -d`         |

> Bir neçə profil birləşdirilə bilər: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker-də işləyərkən host CLI alətlərinin konfiqurasiyası

`omniroute setup-codex`, `setup-claude`, `config set <tool>` və idarəetmə panelindəki
**Konfiqurasiyanı yadda saxla** düyməsi `~/.codex/*.config.toml` kimi fayllar yazır. Bu yollar
yalnız CLI-ın faktiki işlədiyi maşında məna daşıyır. Onları konteyner daxilində
işlətdikdə fayl konteynerin öz ev qovluğuna (`/home/node` —
image `USER node` ilə işləyir) yazılır; hostdakı heç bir CLI həmin faylı oxumayacaq və konteyner
yenidən yaradılan kimi o silinəcək.

OmniRoute bunu aşkarlayır və istifadə edə bilməyəcəyiniz uğurlu əməliyyat bildirişi
vermək əvəzinə, təlimatlarla birlikdə yazma əməliyyatından imtina edir: CLI `2` kodu ilə çıxır,
API isə `containerEphemeralTarget: true` ilə `422` cavabı verir.

### Tövsiyə olunur: CLI-ı hostda, OmniRoute-u Docker-də işlədin

Konteyner API-ni təqdim edir; CLI isə host alətlərinizi konfiqurasiya edir.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-ı konteynerə yönəldin
omniroute setup-codex                      # hostunuzdakı həqiqi ~/.codex qovluğuna yazır
```

Codex, Claude Code, Cursor və ya oxşar alətlər noutbukunuzda işləyirsə, bu düzgün
seçimdir — adi quraşdırma da məhz belədir.

### Alternativ: host konfiqurasiya qovluqlarını bind-mount edin (`host` profili)

Konteynerin özünün host konfiqurasiyanıza yazmasını istəyirsinizsə, qovluqları
mount edin və `CLI_CONFIG_HOME` dəyişənini mount kökünə yönəldin. `host` profili
bunu artıq edir:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Yolu etibarlı edən məhz bind mount-dur: OmniRoute
`/proc/self/mountinfo` faylını oxuyur və mount edilmiş yollara (həmçinin alt qovluqları
mount nöqtələri olan qovluqlara — yuxarıdakı `/host-home` strukturu məhz belədir)
yazmağa icazə verir, mount edilməmiş yollara yazmaqdan isə imtina edir.

### Son çıxış yolu: konteynerin öz CLI-larını konfiqurasiya edin (ehtiyatla istifadə edin)

CLI-lar həqiqətən konteyner daxilində olduqda (`cli` profili), yazma əməliyyatı
məqsədyönlüdür. İstənilən `setup-*` əmrinə `--allow-container-write` ötürün və ya
server üçün `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` təyin edin. Yazma əməliyyatı,
məlumatın konteynerdən sonra saxlanmayacağı barədə xəbərdarlıqla davam edir.

> **Təhlükəsizlik xəbərdarlığı — `cli` profili + `docker.sock` mount-u.**
> Konteynerdaxili avtomatik yeniləyicinin host daemon-u vasitəsilə stack-i
> yenidən yarada bilməsi üçün `cli` profili `/var/run/docker.sock` faylını bind-mount edir
> (`src/lib/system/autoUpdate.ts` həmin socket-in mövcudluğunu yoxlayır və o olmadıqda
> Docker yolunu ötürür). Həmin socket **host root səlahiyyətləri üçün etibar
> sərhədidir**: ona çata bilən hər şey host Docker daemon-unu root kimi idarə edir
> — hostdakı istənilən konteyneri yarada, yoxlaya, dayandıra və silə bilər.
> Nəticələr:
>
> 1. **`cli` profilinin portunu heç vaxt şəbəkəyə açmayın.** Onu
>    `127.0.0.1` üzərində yayımlayın (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN üzərindən əlçatan `cli` profili idarəetmə paneli səviyyəsindəki istənilən RCE-ni
>    hostun tam ələ keçirilməsinə çevirir.
> 2. **`cli` profilinə əlavə host qovluqları bind etməyin.**
>    Docker socket-i ilə hər hansı əlavə mount-un birləşməsi konteynerə fayl sisteminizə
>    və host konfiqurasiyanıza tam oxuma/yazma imkanı verir. Alətin layihəni
>    görməsi lazımdırsa, onu CLI binar faylı ilə lokal olaraq işlədin — layihəni
>    `cli` konteynerinə mount etməyin.
>
> Konteynerdaxili avtomatik yeniləməyə ehtiyacınız yoxdursa, `cli` profilini söndürülmüş saxlayın
> (`COMPOSE_PROFILES=core,redis` və ya daha qısa variant). Digər profillər
> Docker socket-ini mount etmir.
>
> MITM ilə bağlı təhlükə modeli üçün `docs/security/MITM-TPROXY-DECRYPT.md` faylına (git-dədir; `/docs` daxilində yığılmır),
> `codex`/`claude-code`/`droid`/`openclaw` binar fayllarının mənşə zənciri üçün isə
> `docs/security/SUPPLY_CHAIN.md` faylına baxın.

## Redis Sidecar

OmniRoute paylanmış sürət məhdudlaşdırıcısını və ortaq keşi təmin etmək üçün Redis-dən istifadə edir. `redis` xidməti `docker-compose.yml` faylında **həmişə müəyyən edilir** (onun profil məhdudiyyəti yoxdur) və istənilən digər profillə birlikdə işə düşür.

| Təfərrüat              | Dəyər                                           |
| ---------------------- | ----------------------------------------------- |
| İmaj                   | `redis:7-alpine`                                |
| Konteyner adı          | `omniroute-redis`                               |
| Daxili port            | `6379`                                          |
| Host portu (əvəzləmə)  | `REDIS_PORT` (standart olaraq `6379`)           |
| Host ünvanı (əvəzləmə) | `REDIS_BIND_HOST` (standart olaraq `127.0.0.1`) |
| Həcm                   | `omniroute-redis-data` → `/data`                |
| Sağlamlıq yoxlaması    | `redis-cli ping` (10 saniyəlik interval)        |

Əlaqəli mühit dəyişənləri:

- `REDIS_URL` — tətbiqə daxil edilən bağlantı sətri (standart olaraq `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri üçün host tərəfindəki port xəritələndirməsi.
- `REDIS_BIND_HOST` — portun yayımlandığı host interfeysi. Standart olaraq `127.0.0.1`.

> **Niyə standart olaraq loopback:** sidecar `requirepass` olmadan işləyir və tətbiq
> konteynerləri ona compose şəbəkəsi (`redis:6379`) üzərindən qoşulur — yayımlanmış port
> yalnız host tərəfindəki alətlər (`redis-cli`, lokal `npm run dev`) üçündür. Portun
> `0.0.0.0` üzərində yayımlanması autentifikasiyasız Redis-i LAN şəbəkənizdəki bütün hostlara
> açıq edərdi. `REDIS_BIND_HOST=0.0.0.0` təyin etsəniz, xidmətin `command:` parametrinə
> `--requirepass` də əlavə edin.

**Redis-in deaktiv edilməsi** tövsiyə olunmur (sürət məhdudlaşdırıcısı yaddaşdaxili ehtiyat mexanizminə keçərək zəifləyəcək). Bunu etməlisinizsə, ya `docker-compose.yml` faylındakı `redis:` xidmət blokunu silin/şərhə çevirin, ya da onu sıfıra qədər miqyaslandırın:

```bash
docker compose up -d --scale redis=0
```

## İstehsal Compose-u

Dev mühiti ilə yanaşı işləyən təcrid olunmuş istehsal snapshot-u üçün `docker-compose.prod.yml` faylından istifadə edin.

| Təfərrüat                   | Dəyər                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| Fayl                        | `docker-compose.prod.yml`                                                                        |
| Standart idarə paneli portu | `PROD_DASHBOARD_PORT=20130` (daxili `${DASHBOARD_PORT:-20128}` portuna xəritələndirilir)         |
| Standart API portu          | `PROD_API_PORT=20131`                                                                            |
| İmaj                        | `omniroute:prod` (`runner-cli` hədəfindən qurulur)                                               |
| Redis konteyneri            | `omniroute-redis-prod` (`redis:8.6.2`, ayrıca `redis-prod-data` həcmi)                           |
| Məlumat həcmi               | `omniroute-prod-data` (adlandırılmış, yenidən qurulmalar arasında saxlanılır)                    |
| Sağlamlıq yoxlamaları       | `node healthcheck.mjs` + `redis-cli ping`; `depends_on` Redis-in sağlamlığı ilə məhdudlaşdırılır |

İstifadə qaydası:

```bash
# İstehsal stekini qurun və başladın
docker compose -f docker-compose.prod.yml up -d --build

# Loqları axın şəklində izləyin
docker compose -f docker-compose.prod.yml logs -f

# Dayandırın və silin (həcmləri saxlayın)
docker compose -f docker-compose.prod.yml down
```

İstehsal steki dev compose-u ilə paralel işləyir (konteyner adları, portlar və həcmlər fərqlidir), buna görə də istehsal mühiti işlək qalarkən lokal olaraq təkmilləşdirməyə davam edə bilərsiniz.

## Dockerfile mərhələləri

Repozitoriya çoxmərhələli Dockerfile (`Dockerfile`) ilə təqdim olunur. Dörd mərhələ əlçatandır; istifadə ssenariniz üçün uyğun `target` seçin.

| Mərhələ       | Baza obrazı           | Məqsəd                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Asılılıqları quraşdırır (`npm ci --legacy-peer-deps`) və `npm run build` işə salır (standart olaraq Turbopack — aşağıdakı Yığma zamanı resurslar bölməsinə baxın)                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Next.js-in müstəqil çıxışı ilə istehsal mühiti. **Heç bir provayder CLI-ı daxil edilməyib.**                                                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` və qlobal CLI-ları əlavə edir: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agent əsaslı iş axınları üçün bunu seçin.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Veb sessiya provayderləri üçün Playwright + Chromium brauzeri (`--with-deps`) əlavə edir: `gemini-web`, `claude-web`, `claude-turnstile`. **Bu provayderlərdən istifadə etdiyiniz zaman bunu seçin** — adi obraz onsuz sorğu zamanı uğursuz olur (Buraxılış kanalları bölməsindəki `-web` qeydinə baxın). |

Müəyyən bir hədəfi əl ilə yığın:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Yığma zamanı resurslar

Üç yığma arqumenti `builder` mərhələsinin resurs sərfiyyatını idarə edir. Onlar yalnız yığma zamanı üçündür —
`OMNIROUTE_MEMORY_MB` (aşağıda) ayrıca icra vaxtı parametridir.

| Yığma arqumenti             | Standart | Təsiri                                                                                                         |
| --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpack ilə yığır: daha az pik yaddaş, daha yavaş. `1` Turbopack-i aktivləşdirir.                          |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | İşə salınan `next build` üçün V8 heap həddi (`--max-old-space-size`).                                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` üçün dəyər verir; Next səhifə məlumatlarının toplanması üçün `workers = N - 1` hesablayır. |

`OMNIROUTE_BUILD_WORKERS` böyük yığma serverində artırılmalı, məhdud resurslu yığma
isə **`✓ Compiled successfully` mesajından sonra** dayanarsa şübhə edilməli olan
parametrdir. Hər bir səhifə məlumatı worker-i ayrıca prosesdir və əsas `next build`
prosesi də ayrıca prosesdir; real VPS-də aparılmış təkrar sınaqda (issue #7518)
hər prosesin pik RSS göstəricisinin `NODE_OPTIONS` heap parametrindən asılı olmayaraq
~4.5 GB olduğu ölçüldü (Turbopack V8 heap-dən kənarda, native/Rust yaddaşında
kompilyasiya edir). Standart `2` dəyəri (→ 1 worker, ümumilikdə 2 proses) dərc
pipeline-ının istifadə etdiyi 16 GB / 4 vCPU GitHub-hosted runner-lar üçün
hesablanıb. `8` dəyərində (→ 7 worker) həmin runner-in yaddaşı tükəndi və buildkit
addımı `ResourceExhausted: ... cannot allocate memory` xətası ilə uğursuz oldu;
hər proses üzrə RSS təxmin edilmək əvəzinə birbaşa ölçüldükdə `3` (→ 2 worker)
dəyəri də mövcud yaddaşa sığmadı. `tests/unit/docker-build-memory-budget.test.ts`
ölçülmüş göstəriciyə əsasən hesablamanı aparır və parametrlərdən hər hansı biri
runner-in imkanlarını aşarsa, uğursuz olur.

Turbopack V8 heap-dən **kənarda** yerləşən native Rust yaddaşında kompilyasiya
edir, buna görə `OMNIROUTE_BUILD_MEMORY_MB` onu məhdudlaşdırmır. Yaddaş həddi olan
host-da yığma OOM killer tərəfindən heç bir xəta mətni olmadan SIGKILL edilir —
proses sadəcə `Creating an optimized production build` zamanı yarıda dayanır və
bu, yaddaş çatışmazlığından daha çox donma kimi görünür. Məhz buna görə `Dockerfile`,
Turbopack-in kod üzrə standart seçim olduğu `npm run dev` / `npm run build`-dən
fərqli olaraq, standart şəkildə webpack-dən istifadə edir
(`OMNIROUTE_USE_TURBOPACK=0`): heç bir yığma arqumenti olmadan sadə `docker build .`
əmri (Railway və digər bir kliklə quraşdırma host-larının işlətdiyi əmr) yaddaşı
məhdudlaşdırılmış yığma serverində səssizcə dayanmamalıdır. Dərc edilmiş obrazlar
`docker-publish.yml` daxilində artıq `OMNIROUTE_USE_TURBOPACK=0` parametrini açıq
şəkildə ötürür. Kifayət qədər RAM-a malik yığma serverində daha sürətli yığma üçün
Turbopack-i aktivləşdirin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` aktivdir, buna görə `next build` həm əsas, həm də worker
prosesini işə salır və onların hər biri ayrıca `OMNIROUTE_BUILD_MEMORY_MB` dəyərinə
riayət edir. Konteyner həddini bu dəyərin təxminən bir qatından deyil, iki qatından
yuxarı təyin edin.

Bu kod ağacında ölçülüb (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Konteyner həddi | Nəticə                              |
| --------- | --------------- | ----------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | hər ikisində səssizcə OOM-kill oldu |
| webpack   | 8 GiB           | yığma worker-i SIGKILL edildi       |
| webpack   | 12 GiB          | uğurlu oldu, pik göstərici 11.1 GiB |

### İcra vaxtı standartları

`runner-base` tərəfindən ixrac edilən standart dəyərlər: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker-də yaddaş davranışı:

- İmaj `OMNIROUTE_MEMORY_MB=1024` təyin edir və bundan `NODE_OPTIONS=--max-old-space-size=1024` dəyərini əldə edir.
- Faktiki server prosesi `OMNIROUTE_MEMORY_MB` dəyərini oxuyan və `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` əlavə edən müstəqil işəsalıcı tərəfindən başladılır.
- Node təkrarlanan `--max-old-space-size` dəyərlərindən sonuncusunu istifadə edir, buna görə də `OMNIROUTE_MEMORY_MB` parametrinin təyin edilməsi Docker üçün effektiv yığın yaddaşı limitini idarə edir.
- İmaj onu həmişə təyin etdiyinə görə, işəsalıcının RAM əsasında kalibrlənən ehtiyat variantı Docker mühitində heç vaxt tətbiq edilmir. İş yükünə uyğun olaraq bu dəyəri açıq şəkildə artırın (aşağıdakı cədvələ baxın). `2048` kodlaşdırma agentinin `/v1/responses` sorğuları üçün yenə də çox azdır.

### Kodlaşdırma agentləri üçün icra zamanı RAM

Docker üçün standart 1 GiB istehsal ölçüsü deyil, idarəetmə paneli/yüngül söhbət üçün minimum həddir. Uzun `POST /v1/responses` gövdələri (yüzlərlə mesaj, onlarla alət) sıxılma zamanı yaddaşda bir neçə qraf saxlayır. Üst-üstə düşən təxminən 3 MiB / təxminən 750k tokenlik iki sorğu **12 GiB** köhnə nəsil sahəsində V8-in dayanmasına (`FATAL ERROR: Reached heap limit`) səbəb olub və həmçinin 16 GiB cgroup OOM həddinə çatıb. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) bölməsinə baxın.

**cgroup `--memory` ölçüsünü yığın yaddaşından yüksək təyin edin** — yerli buferlər, SQLite və sıxılmanın aralıq məlumatları V8-dən kənarda yerləşir.

| İş yükü                                    | `OMNIROUTE_MEMORY_MB`   | Konteyner / cgroup          | Qeydlər                                                                                                                  |
| ------------------------------------------ | ----------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| İdarəetmə paneli, bir yüngül söhbət        | `1024` (imaj standartı) | ≥2 GiB                      |                                                                                                                          |
| Bir kodlaşdırma agenti (Claude/Codex/Grok) | `8192`                  | ≥10 GiB                     | Tipik bir sessiyalı `/v1/responses`                                                                                      |
| İki paralel uzun `/v1/responses`           | `10240`–`12288`         | ≥12–16 GiB                  | Təxminən 12 GiB yığın yaddaşında ölçülmüş V8 dayanması                                                                   |
| Üç və ya daha çox paralel uzun kontekst    | bir prosesdə etməyin    | ardıcıl icra / daha çox RAM | Standart ağır iş qəbulu eyni anda icra edilən 1 sorğudur; RAM artırılmadan bunun yüksəldilməsi dayanmanı yenidən yaradır |

Fiziki sistemdə `omniroute serve`, `OMNIROUTE_MEMORY_MB` **təyin edilmədikdə**, RAM-ın təxminən 35%-ni (`[512, 4096]` aralığı ilə məhdudlaşdırılaraq) kalibrləyir. Docker həmişə `1024` təyin etdiyi üçün rəsmi imajda bu kalibrləmə heç vaxt işə düşmür.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritik Mühit Dəyişənləri

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) sənədində göstərilən standartlardan əlavə, Docker altında işləyərkən aşağıdakı dəyişənlər daha vacibdir:

| Dəyişən                       | Təyinat                                                                                                                                                                                                                                                                                            | Standart                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket körpüsü üçün paylaşılan məxfi açar. **İstehsal mühitində tələb olunur** — güclü təsadüfi sətir təyin edin.                                                                                                                                                                               | təyin edilməyib (verilməlidir) |
| `REDIS_URL`                   | Sorğu tezliyi məhdudlaşdırıcısı / keş arxa xidməti üçün bağlantı sətri                                                                                                                                                                                                                             | `redis://redis:6379`           |
| `REDIS_PORT`                  | Daxil edilmiş Redis konteyneri üçün host tərəfi portu                                                                                                                                                                                                                                              | `6379`                         |
| `REDIS_BIND_HOST`             | Daxil edilmiş Redis portunun yayımlandığı host interfeysi (AUTH əlavə etmədiyiniz halda geri döngə interfeysi)                                                                                                                                                                                     | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Özünü yeniləmə iş axınları üçün `cli` profilində `/workspace/omniroute` ünvanına qoşulan host yolu                                                                                                                                                                                                 | `.` (cari qovluq)              |
| `OMNIROUTE_MEMORY_MB`         | Docker müstəqil serveri üçün Node işləmə zamanı heap yaddaşının yuxarı həddi; yuxarıdakı obraz standartını əvəz edir. Kodlaşdırma agentləri: `8192`+ ([işləmə zamanı RAM](#runtime-ram-for-coding-agents) bölməsinə baxın).                                                                        | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | İdarəetmə paneli (20128) və API (20129) üçün açıq portları əvəz edir                                                                                                                                                                                                                               | `20128` / `20129`              |
| `APP_BIND_HOST`               | docker-compose-un idarəetmə paneli/API/canlı WS portlarını yayımladığı host interfeysi. `REQUIRE_API_KEY=false` olduqda (standart), `0.0.0.0` anonim `/v1` proksisini LAN üçün əlçatan edir — yalnız `REQUIRE_API_KEY=true` olduqda və ya qarşısında əks proksi yerləşdikdə əhatəni genişləndirin. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | docker-compose-un `cliproxyapi` yan konteynerini yayımladığı host interfeysi — onun məlumat cildi provayder giriş məlumatlarını saxlayır.                                                                                                                                                          | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | İşləmə zamanı plagin skanerinin oxuduğu və plaginləri quraşdırdığı qovluq. Plaginlər bind-mount vasitəsilə qoşulduqda bunu təyin edin: standart dəyər `HOME`-u izləyir, lakin obraz onu ixrac etməyə bilər.                                                                                        | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Tətbiq əks proksinin arxasında yayımlandıqda istifadə olunan URL alt yolu (məsələn, `/omniroute`)                                                                                                                                                                                                  | _(boş = kök)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Alt yol daxil olmaqla ictimai brauzer mənbəyi (məsələn, `https://host/omniroute`)                                                                                                                                                                                                                  | təyin edilməyib                |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` üçün host tərəfi idarəetmə paneli portu                                                                                                                                                                                                                                  | `20130`                        |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yan konteyneri üçün host tərəfi portu                                                                                                                                                                                                                                                | `8317`                         |

## Alt yol üzərində əks proksi (Traefik / nginx)

Next.js `basePath` dəyəri standalone paketinə kompilyasiya edilir. OmniRoute əvvəlcədən
daxil edilmiş dəyəri tətbiqin kökündəki xüsusi faylda qeyd edir (`npm run build` zamanı yazılır;
`scripts/docker/ensure-docker-base-path.mjs` tərəfindən oxunur) və konteyner başladıqda onu
`OMNIROUTE_BASE_PATH` ilə müqayisə edir. Dəyərlər fərqli olduqda və obraz domen kökü üçün
yığıldıqda, giriş nöqtəsi `node dev/run-standalone.mjs` işə düşməzdən əvvəl standalone
manifestlərini, daxil edilmiş `basePath`/`assetPrefix` literallarını (Next 16 SSR resurs
URL-lərini yalnız `assetPrefix` əsasında yaradır — düzəliş aləti alt yolu orada da əks
etdirir), əvvəlcədən daxil edilmiş `/_next/static` resurs URL-lərini (müştəri istinad
manifestləri, media idxalları, əvvəlcədən render edilmiş xəta səhifələri) və müştəri
`process.env` şimini yenidən yazır.

### Compose ilə yığma (tövsiyə olunur)

Hər iki dəyişəni `.env` daxilində təyin edin, sonra obraz və icra mühitinin uyğun olması
üçün yenidən yığın:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` dəyərini həm Docker yığma arqumenti, həm də
icra mühiti dəyişəni kimi ötürür.

### Əvvəlcədən yığılmış kök obrazı + icra zamanı alt yol

Dərc edilmiş `diegosouzapw/omniroute:*` obrazları domen kökü üçün yığılıb. Buna baxmayaraq,
icra zamanı `OMNIROUTE_BASE_PATH` təyin edə bilərsiniz; konteyner başlanğıcda paketi bir
dəfə düzəldir. Onu uyğun ictimai mənbə ünvanı ilə birlikdə təyin edin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Əks proksini **tam** xarici yolu ötürəcək şəkildə konfiqurasiya edin (prefiksi
silməyin). Traefik `PathPrefix(`/omniroute`)` yolunu `StripPrefix` olmadan konteynerə
yönləndirməlidir ki, Next.js `/omniroute/...` qəbul etsin və resursları
`/omniroute/_next/...` ünvanından təqdim etsin.

Docker sağlamlıq yoxlaması aktiv `OMNIROUTE_BASE_PATH` prefiksi əlavə edilmiş yüngül
`/healthz` həyat dövrü son nöqtəsini yoxlayır. `/api/monitoring/health` istifadəçi və
idarə paneli diaqnostikası üçün əlçatan qalır; konteynerin HEALTHCHECK yoxlamasını yenidən
ona yönəltmək üçün (məsələn, dərin sağlamlıq nəzarəti məqsədilə)
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` təyin edin. Bu yol **dərin**
yoxlamadır (DB + monitorinq xülasəsi) — yenidən aktivləşdirməyi seçsəniz, Docker-in
seyrək `HEALTHCHECK` yoxlaması üçün uyğundur, lakin Kubernetes `livenessProbe`
intervalları üçün **uyğun deyil**.

Orkestratorlar (Kubernetes, Nomad və s.) üçün:

| Yoxlama               | Üstünlük verin                                                     | Çəkinin                                                             |
| --------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| İşləkliyin yoxlanması | HTTP `GET /livez` və ya əsas portda TCP (`PORT`, standart `20128`) | İşləkliyin yoxlanması üçün `/api/monitoring/health`                 |
| Hazırlığın yoxlanması | HTTP `GET /healthz`                                                | Hadisə dövrəsinin məşğul olmasını dayanma sayan qısa vaxt limitləri |
| Dərin / qara qutu     | `/api/monitoring/health`                                           | —                                                                   |

`/healthz` prosesin həyat dövrü vəziyyətini (`ok` / `starting` / `stopping`) bildirir.
`/livez` yalnız prosesin işlək olub-olmadığını yoxlayır (işləyici icra oluna bildiyi
müddətdə 200 qaytarır; hazırlığı gözləmir). Hər ikisi yenə də sorğuların emalı ilə eyni
Node hadisə dövrəsində işləyir, buna görə CPU-tutumlu kataloq və ya sıxılma əməliyyatları
onları gecikdirə bilər — məşğul ≠ dayanmış. HTTP yoxlamalarının vaxtı bitirsə, TCP
işləklik yoxlamasına üstünlük verin. Yoxlamalar üzrə tam təlimat:
[Monitorinq təlimatı — Kubernetes yoxlamaları üzrə tövsiyələr](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy ilə Docker Compose (HTTPS Auto-TLS)

OmniRoute, Caddy-nin avtomatik SSL təminatı vasitəsilə təhlükəsiz şəkildə əlçatan edilə bilər. Domeninizin DNS A qeydinin serverinizin IP ünvanına yönəldiyinə əmin olun.

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
      # OAuth geri çağırışları, idarəetmə paneli keçidləri və yaradılan ictimai URL-lər üçün brauzerə təqdim olunan mənbə.
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

Caddy yuxarı axın konteyneri üçün standart yönləndirmə başlıqlarını təyin edir. OmniRoute OAuth geri çağırışları və yaradılan ictimai
keçidlər üçün `NEXT_PUBLIC_BASE_URL` dəyərindən kanonik ictimai mənbə kimi istifadə edir; autentifikasiya edilmiş idarəetmə paneli yazma əməliyyatları eyni mənbəli sorğulardan və sessiyaya bağlı CSRF
qorumasından istifadə edir. `OMNIROUTE_TRUST_PROXY` parametrini yalnız OmniRoute-un ictimai mənbəni açıq
konfiqurasiya əvəzinə etibarlı yönləndirmə başlıqlarından müəyyən etməsini qəsdən istədiyiniz qabaqcıl yerləşdirmələr üçün aktivləşdirin.

## Cloudflare Quick Tunnel

Docker yerləşdirmələri üçün idarəetmə paneli dəstəyi `Dashboard → Endpoints` bölməsində bir kliklə aktivləşdirilən **Cloudflare Quick Tunnel** funksiyasını əhatə edir. İlk aktivləşdirmə zamanı `cloudflared` yalnız ehtiyac olduqda endirilir, cari `/v1` son nöqtənizə müvəqqəti tunel başladılır və yaradılan `https://*.trycloudflare.com/v1` URL-i birbaşa adi ictimai URL-inizin altında göstərilir.

Son nöqtə tuneli panelləri (Cloudflare, Tailscale, ngrok) aktiv tunelin vəziyyətini dəyişmədən `Settings → Appearance` bölməsindən göstərilə və ya gizlədilə bilər.

### Tunel qeydləri

- Quick Tunnel URL-ləri müvəqqətidir və hər yenidən başlatmadan sonra dəyişir.
- Quick Tunnel-lər OmniRoute və ya konteyner yenidən başladıldıqdan sonra avtomatik bərpa edilmir. Ehtiyac olduqda onları idarəetmə panelindən yenidən aktivləşdirin.
- İdarə olunan quraşdırma hazırda `x64` / `arm64` üzərində Linux, macOS və Windows-u dəstəkləyir.
- İdarə olunan Quick Tunnel-lər məhdud konteyner mühitlərində səs-küylü QUIC UDP bufer xəbərdarlıqlarının qarşısını almaq üçün standart olaraq HTTP/2 nəqliyyatından istifadə edir. Fərqli nəqliyyat istəyirsinizsə, `CLOUDFLARED_PROTOCOL=quic` və ya `auto` təyin edin.
- Docker təsvirləri sistem CA kök sertifikatlarını ehtiva edir və onları idarə olunan `cloudflared` prosesinə ötürür; bu, tunel konteyner daxilində işə salınarkən TLS etibar xətalarının qarşısını alır.
- OmniRoute-un yeni binar fayl endirmək əvəzinə mövcud binar fayldan istifadə etməsini istəyirsinizsə, `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` təyin edin.

## Təsvir teqləri

| Təsvir                   | Teq      | Ölçü   | Təsvir                                                      |
| ------------------------ | -------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Ən yüksək **dərc edilmiş** stabil SemVer (git `main` deyil) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps üçün bu teq sinfini sabitləyin                       |

Çoxplatformalı manifest: yerli `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker uyğun arxitekturanı avtomatik seçir; ARM hostlarında AMD64 emulyasiyasını məcburi etmək lazımdırsa, `--platform linux/amd64` ötürün.

### Buraxılış kanalları

OmniRoute stabil buraxılışlar, aktiv buraxılış budağının sınağı və hazırlama yığımları üçün ayrı-ayrı Docker kanalları dərc edir.

| Kanal                           | Mənbə                                    | Dəyişkənlik                          | Tövsiyə olunan istifadə                                                                                                             |
| ------------------------------- | ---------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | İmzalanmış/versiyalaşdırılmış buraxılış  | Dəyişməz                             | Dəqiq buraxılışa sabitlənən istehsal yerləşdirmələri                                                                                |
| `:latest` / `:latest-web`       | Ən yüksək **dərc edilmiş** stabil SemVer | Dəyişkən stabil göstərici            | SemVer dərc tapşırığından **sonra** stabil buraxılışları izləyir — `main` və ya buraxılmamış `release/v*` commit-lərini **izləmir** |
| `:next` / `:next-web`           | Cari standart `release/v*` budağı        | Dəyişkən ilkin buraxılış göstəricisi | Aktiv buraxılış budağına daxil edilmiş, lakin hələ stabil buraxılışda olmayan düzəlişlərin sınağı                                   |
| `:main` / `:main-web`           | `main` budağı                            | Dəyişkən hazırlama göstəricisi       | Yalnız hazırlama və inteqrasiya sınaqları                                                                                           |

#### Veb sessiya provayderləri: `-web` təsvirləri

Yuxarıdakı hər kanal `runner-web` mərhələsindən yığılmış `-web` teqi (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) kimi də təqdim olunur — eyni təsvirə əlavə olaraq Playwright və Chromium brauzeri daxildir. Adi təsvir Chromium **olmadan** təqdim edilir; `gemini-web`, `claude-web` və `claude-turnstile` üçün o tələb olunur.

Xəta başlanğıc zamanı deyil, sonraya təxirə salınır: həmin provayderlər öz modellərini siyahıya alır və idarəetmə panelində qoşulmuş kimi görünür, yalnız ilk sorğu aşağıdakı xəta ilə uğursuz olur:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Bu provayderlərdən istifadə edirsinizsə, artıq istifadə etdiyiniz kanalın `-web` teqini çəkin — başqa heç nə dəyişmir. npm/CLI quraşdırmasında (Docker təsviri olmadan) çatışmayan ekvivalent hissə brauzer binar faylıdır: hostda `npx playwright install chromium` əmrini icra edin.

#### İlkin buraxılış kanalından istifadə

`next` kanalı cari standart `release/v*` budağına hər push zamanı yenidən qurulur və həm AMD64, həm də ARM64 üçün yayımlanır. Köhnə texniki xidmət budaqları onun üzərinə yaza bilməz. Bu kanal növbəti stabil teq yaradılmazdan əvvəl aktiv buraxılış budağına birləşdirilmiş düzəlişləri ehtiva edən, endirilə bilən bir obraz təqdim edir.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose üçün seçilmiş profilin istifadə etdiyi obraz teqini dəyişdirin, sonra xidməti endirib yenidən yaradın:

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

`next` dəyişkən ilkin buraxılış kanalıdır. Aktiv buraxılış budağına edilən istənilən push zamanı dəyişə bilər və **istehsalat mühitində istifadə üçün dəstəklənmir**. Müəyyən bir quruluşu qiymətləndirərkən obrazın daycestini sabitləyin:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sınaqdan əvvəl OmniRoute məlumat həcminin və ya bind-mount edilmiş məlumat qovluğunun ehtiyat nüsxəsini yaradın. Geri qaytarmaq üçün əvvəllər istifadə edilmiş stabil versiyanı və ya daycesti bərpa edib konteyneri yenidən yaradın:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Buraxılış budağından olan quruluş heç vaxt `latest` teqini dəyişə bilməz; stabil göstəricini yalnız uyğun stabil semantik versiya irəli çəkə bilər. `next` obrazlarında buraxılış obrazının yoxlanılması və CRITICAL zəifliklər üçün bloklayıcı keçid qorunub saxlanılır.

**`latest` git üçün aktuallıq zəmanəti deyil.** `main` və ya aktiv `release/v*` budağına birləşdirilmiş düzəlişlər stabil SemVer obrazı yayımlanana və yayımlama tapşırığı `:latest` teqini həmin versiyaya irəli çəkənədək (həmin SemVer ilə eyni daycest) `:latest` daxilində olmur. GitHub artıq düzəlişi göstərdiyi halda `latest` dəyişməz görünürsə, buraxılış budağını sınaqdan keçirmək üçün `:next` obrazını endirin və ya SemVer teqini gözləyin.

| İstəyiniz                                                                               | İstifadə edin                                       |
| --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Dəyişməməli olan GitOps / istehsalat mühiti                                             | `:X.Y.Z` teqini (və ya obraz daycestini) sabitləyin |
| Yayımlanmış stabil versiyaları izləmək və hər buraxılışda yenidən yaratmanı qəbul etmək | `:latest`                                           |
| Yayımlanmamış `release/v*` commit-lərini sınaqdan keçirmək                              | `:next` (istehsalat üçün deyil)                     |
| `main` budağını sınaqdan keçirmək                                                       | `:main` (istehsalat üçün deyil)                     |

## Əlçatanlıq: standart SQLite yalnız bir replikalıdır

Standart Docker / Kubernetes OmniRoute **bir Node prosesi + bir SQLite yazıcısından** ibarətdir. Bu topologiyada yüksək əlçatanlıq **dəstəklənmir**.

| Məhdudiyyət                                                              | Nəticə                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tək yazıcı                                                               | Eyni SQLite faylı ilə bir neçə replikanı **işə salmayın**. Bu, verilənlər bazasını korlayır.                                                                                                                                                                                                                                                                          |
| Yenidən yaratma / yenidən başlatma / HEALTHCHECK tərəfindən dayandırılma | İcrası davam edən SSE bağlantılarının, idarə paneli sessiyalarının və yaddaşdaxili vəziyyətin **tam dayanması**. Qoşulmuş bütün klientlərin bağlantısı kəsilir. Endpoint-in mövcud olmadığı müddətdə yeni sorğular OmniRoute JSON-u deyil, əks proksidən **`502 Bad Gateway: Unknown error`** alır — klientlər bunu provayder nasazlığından ayıra bilmirlər (#11015). |
| `/healthz` ilə eyni hadisə dövrəsi                                       | Məşğul kataloq və ya sıxılma dövrü yoxlamaları gecikdirə bilər; qısa timeout isə bundan sonra **yeganə** replikanı yenidən başladar.                                                                                                                                                                                                                                  |

**Yoxlama matrisi** (həmçinin [Kubernetes yoxlamaları üzrə tövsiyələrə](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) baxın):

| Yoxlama               | Hədəf                                                                | İstifadə etməyin                                                           |
| --------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Canlılıq              | `PORT` üzərindən TCP (standart `20128`) və ya yumşaq HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Hazırlıq              | HTTP `GET /healthz`                                                  | Hadisə dövrəsinin məşğul olmasını dayanma kimi qəbul edən sərt timeout-lar |
| Dərin / insanlar üçün | `/api/monitoring/health`                                             | Avtomatlaşdırılmış kubelet canlılıq yoxlaması                              |

**Yeniləmələr:** hər sessiyanın kəsiləcəyini nəzərə alın. Mümkündürsə, klient trafikinə tədricən son verin; standart SQLite ilə mərhələli yeniləmə yoxdur. Compose daxilində `restart: unless-stopped` və Docker `HEALTHCHECK` kombinasiyası da konteyner Unhealthy vəziyyətinə düşdükdə yeganə prosesi əvəz edəcək — təsir dairəsi eynidir.

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

`preStop` gecikməsi SIGTERM-dən əvvəl kube-un Service endpoint-lərini çıxarmasına imkan verir ki, **yeni** trafik dayanmaqda olan prosesə yönəlməsin. İcrası davam edən `/v1/responses` SSE bağlantılarının ağır qəbul icarələri vasitəsilə `SHUTDOWN_TIMEOUT_MS` müddətinədək (standart olaraq 30s) tamamlanması gözlənilir (#11015). Prosesə hələ də çatan yeni sorğular `503` + `Retry-After: 5` alır. Əvəzedici Ready vəziyyətinə gələnədək Recreate prosesində yaranan boş endpoint intervalı tam dayanma olaraq qalır — bu, yoxlamanın yanlış konfiqurasiyası deyil, SQLite topologiyasının xüsusiyyətidir.

Xarici Postgres / çoxyazıcılı HA **sənədləşdirilmiş standart istifadə variantı deyil**. HA lazımdırsa, tək replikanı saxlayın və ya layihənin ayrıca sınaqdan keçirib sənədləşdirdiyi topologiyadan istifadə edin. Postgres/MySQL işi [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) daxilində aparılır. Bu funksiya buraxılanadək **böyük** `/v1/responses` tutumunu artırmağın dəstəklənən yeganə yolu bir cilddə `replicas > 1` deyil, N sayda müstəqil prosesdir (növbəti bölmə).

## Üfüqi miqyaslama: N müstəqil proses

Bir Node prosesi **bir V8 yığınıdır**. Üst-üstə düşən iki ~3 MiB / ~750k-token kodlaşdırma agenti `POST /v1/responses` sorğusu (RTK + Caveman) təxminən 12 GiB-də həmin yığını dayandırır (`FATAL ERROR: Reached heap limit`) və 16 GiB-lıq cgroup-da OOM-a səbəb ola bilər. Baxın: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Bu ölçmə eyni vaxtda icra olunan uzun `/v1/responses` sorğuları üçün məhsulun iki sorğuluq sərt maksimumu deyil, **yaddaş büdcəsi** xəbərdarlığıdır. Ağır söhbət sorğularının qəbulu eyni V8/cgroup həddinə əsasən ölçüsü avtomatik müəyyən edilən daxilolma bayt büdcəsi (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ilə idarə olunur — ölçüsü artıq müəyyən edilmiş prosesdə bunu yuxarı istiqamətdə dəyişdirmək (və ya köhnə `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` sorğu-sayı limitini təyin etmək) prosesi yenidən qəza ilə dayandırır. Kiçik söhbətlər, `/healthz`, `/v1/models` və MCP bu limitə **daxil deyil**.

### Bir proses: ikidən çox uzun `/v1/responses`

**Sağlam** proses (yığın `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` dəyərindən aşağı olduqda, standart dəyər `0.75`) proses miqyaslı icradakı bayt büdcəsində (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hələ yer varsa, eyni vaxtda ikidən çox uzun `POST /v1/responses` sorğusu icra **edə bilər**. Ölçüsü `OMNIROUTE_CHAT_LARGE_BODY_BYTES` dəyərinə (standart olaraq 256 KiB) bərabər və ya ondan böyük olan gövdələr struktur baxımından ağır sorğularla eyni ağır çəkili icarəni götürür və eyni [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` çıxışından (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) istifadə edir. Eyni vaxtda onlarla uzun SSE klientinin işləməsi (operatorlara çox vaxt 40–50 lazımdır) **yaddaş büdcəsi** məsələsidir — yığını + əsas/ehtiyat slotlarını + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` dəyərini uyğun ölçüləndirin — bu, məhsulun sərt “maksimum 2” limiti deyil. Təzyiq altında olan yığın #7849 probleminin təkrarlanmaması üçün yenidən cəhd edilə bilən `503` cavabı ilə sorğuları yenə rədd edir.

Yığınları (müstəqil V8 köhnə nəsil yaddaş sahələrini) **çoxaltmaq** üçün **hazırda**:

| Edin                                                                                                                                                                                               | Etməyin                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Hər birinin **öz** `DATA_DIR` / volume-u olan **N konteyner/pod** işlədin                                                                                                                          | Bir SQLite faylına qarşı `replicas > 1` təyin etməyin                       |
| Eyni vaxtda icra olunan ağır sorğuların + sağlam ehtiyat sahəsinin ölçüsünü yığın / icradakı bayt büdcəsinə əsasən müəyyən edin; 1–2 mühafizəkar #7849 standartıdır, məhsulun sərt maksimumu deyil | Bir prosesə 8× RAM və limitsiz say limiti verməyin                          |
| İstəyə görə: **ortaq kvota sayğacları** üçün `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                                  | Redis-i ortaq SQLite kimi qəbul etməyin — o, belə deyil                     |
| Provayder məxfi məlumatlarını hər instansa köçürün (və ya ayrı-ayrı idarəetmə panellərini qəbul edin)                                                                                              | Bütün instanslar üzrə bir idarəetmə paneli / bir çağırış jurnalı gözləməyin |
| Qarşısına istənilən yük balanslaşdırıcısını yerləşdirin; API açarı və ya sessiya əsasında yapışqanlıq kifayətdir                                                                                   | Təchizatçıya xas, ölçüdən xəbərdar aralıq proqram tələb etməyin             |

Avadanlıq: hər instansda eyni vaxtda icra olunan uzun `/v1/responses` sorğularının sayı **yaddaş büdcəsi** məsələsidir (yığın + icradakı bayt büdcəsi / #10110). N müstəqil `DATA_DIR` yenə də yığınları çoxaldır: host RAM-ı “N=8 olan bir 16 GiB pod” deyil, `N × cgroup` həcmini qarşılamalıdır. Bir SQLite faylında heç vaxt `replicas > 1` istifadə etməyin.

Compose nümunəsi (iki yığın, iki volume — `deploy.replicas: 2` deyil):

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

Prosesdaxili sıxlıq (sıxışdırmanın HTTP izolyatından çıxarılması) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)-dədir. Ortaq dayanıqlı vəziyyətdən istifadə edən vahid məntiqi klaster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-dədir.

## Docker daxilində Gemini regional xətaları

Google AI Studio / Gemini API HTTP 400 statusu ilə FAILED_PRECONDITION və
`User location is not supported for the API use.` xətasını qaytara bilər. Hostda sorğunun
uğurlu olması konteynerin eyni çıxış marşrutundan istifadə etdiyini sübut etmir. DNS sıralaması,
IPv4/IPv6 bağlantısı, VPN marşrutlaşdırması və konfiqurasiya edilmiş proksilər fərqlənə bilər.
[Google-un dəstəklədiyi regionları](https://ai.google.dev/gemini-api/docs/available-regions),
həmçinin faktiki bağlantı marşrutunu yoxlayın; təkcə bu xəta API açarının yanlış olduğunu göstərmir.

### Bağlantıya xas proksiyə üstünlük verin

Təsirə məruz qalan Gemini bağlantısı üçün OmniRoute-un
[bağlantıya xas proksi konfiqurasiyasından](../ops/PROXY_GUIDE.md#4-level-proxy-system)
istifadə edin, sonra **Test Connection** əməliyyatını və eyni modellə kiçik bir sorğunu
təkrarlayın. Bu, marşrut dəyişikliyini həmin bağlantı ilə məhdudlaşdırır. Proksinin
konteynerdən əlçatan olduğunu və bağlantının həqiqətən onu seçdiyini yoxlayın.
Marşrutun dəyişdirilməsi yuxarı səviyyəli xidmətin regional uyğunluğuna zəmanət vermir.

### Host və konteyner şəbəkəsini müqayisə edin

Autentifikasiya edilmiş nəticələri müqayisə edərkən açarı, modeli və sorğunu eyni saxlayın;
etimadnamələri, proksi parollarını və ya tam avtorizasiya başlıqlarını heç vaxt problem
bildirişinə əlavə etməyin. Əvvəlcə hostda və konteyner daxilində eyni əmrdən istifadə edərək
əməliyyat sistemi rezolverinin hansı ünvan ailələrini təqdim etdiyini yoxlayın:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` dəyərini işlətdiyiniz xidmətlə əvəz edin (məsələn, `omniroute-web`). Bu
əmrlər etimadnamələri və ya IP ünvanlarını göstərmədən ünvan ailələrini çap edir.
Qaytarılan `6` yalnız IPv6 DNS nəticəsini göstərir: bu, istifadəyə yararlı IPv6
marşrutunu və ya API-yə çıxışı **sübut etmir**. `curl` quraşdırılıbsa, hər iki mühitdə
`curl -4 -I https://generativelanguage.googleapis.com` ilə
`curl -6 -I https://generativelanguage.googleapis.com` nəticələrini müqayisə edin.
HTTP cavabı, hətta autentifikasiya olunmamış xəta olsa belə, həmin yoxlama üçün bağlantının
mövcudluğunu sübut edir; Gemini uyğunluğunu yalnız autentifikasiya edilmiş model sorğusu yoxlayır.

### Host səviyyəsində alternativ: işlək IPv6 və rezolver siyasəti

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) problemini bildirən şəxs
öz mühitində konteyner IPv6 dəstəyini aktivləşdirərək və glibc ünvan seçimini dəyişdirərək
girişi bərpa edib. Buna mühitə xas alternativ kimi yanaşın. Rezolver seçimlərini
tənzimləməzdən əvvəl host IPv6 bağlantısının işlədiyini, konteynerin çıxışını/marşrutlaşdırmasını
və təhlükəsizlik divarı qaydalarını yoxlayın. Təkcə özəl ULA ünvanı ictimai IPv6 bağlantısının
mövcudluğunu göstərmir.

Compose-un standart şəbəkəsinə artıq qoşulmuş xidmətlər üçün bu fraqment həmin şəbəkədə
IPv6-nı aktivləşdirir; xidmətinizin qalan parametrlərini, portlarını, həcmlərini və
konfiqurasiyasını saxlayın:

```yaml
networks:
  default:
    enable_ipv6: true
```

Adlandırılmış şəbəkə üçün bunu xidmətin faktiki qoşulduğu şəbəkədə aktivləşdirin. Docker
ULA alt şəbəkəsi ayıra bilər; yalnız şəbəkəniz tələb etdikdə açıq şəkildə göstərilən,
üst-üstə düşməyən alt şəbəkə seçin. [Docker IPv6 şəbəkələşməsinə](https://docs.docker.com/engine/daemon/ipv6/)
və [Compose şəbəkə seçimlərinə](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)
baxın.

**glibc əsaslı təsvirdə** `/etc/gai.conf` ünvan seçimini dəyişə bilər. Repozitoriyanın
cari Dockerfile faylı Debian-dan istifadə edir; fərdi musl əsaslı təsvirlərdə bu mexanizm
yoxdur. Bildirilən tənzimləmə ULA etiketini `label fc00::/7 6` dəyərindən
`label fc00::/7 1` dəyərinə dəyişir. Təsvirin tam siyasət cədvəlindən başlayın və onun
digər qeydlərini qoruyun: `label` və ya `precedence` qeydinin əlavə edilməsi həmin standart
cədvəli əvəz edir, buna görə yalnız dəyişdirilmiş sətri ehtiva edən fayl kifayət deyil.
[glibc konfiqurasiya arayışı](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
bu semantikanı sənədləşdirir. Yoxlanılmış faylı `/etc/gai.conf` yoluna yalnız oxuma rejimində
bind-mount edin və tətbiq etmək üçün xidməti yenidən yaradın.

Bu, həmin konteynerdəki **bütün çıxış trafiki üçün** əməliyyat sisteminin ünvan seçimini
dəyişir. Bu, hər tətbiqi IPv6 seçməyə məcbur etmir: Node-un DNS sıralaması və bağlantı
seçimi də əhəmiyyətlidir. Xüsusilə, `--dns-result-order=ipv4first` IPv4-ə üstünlük verir
və yalnız IPv4 ilə bağlı nasazlığın həlli deyil. [Node DNS sıralamasına](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)
baxın.

Host səviyyəsində hər hansı dəyişiklikdən sonra Gemini-ni və digər provayderlərinizi
yenidən sınaqdan keçirin. Geri qaytarmaq üçün fərdi `gai.conf` mount-unu silin, əvvəlki
şəbəkə konfiqurasiyasını bərpa edin və texniki xidmət intervalında təsirə məruz qalmış
xidməti/şəbəkəni yenidən yaradın. Şəbəkənin yenidən yaradılması ona qoşulmuş digər
konteynerlərin işini dayandıra bilər; daimi məlumat həcmini silməyin.

## Vacib qeydlər

- **SQLite WAL rejimi:** OmniRoute-un ən son dəyişiklikləri yenidən `storage.sqlite` faylına nəzarət nöqtəsi kimi yazması üçün `docker stop` əməliyyatının tamamlanmasına imkan verilməlidir. Daxil edilmiş Compose fayllarında artıq 40 saniyəlik dayandırma güzəşt müddəti təyin edilib. İmicdən birbaşa istifadə edirsinizsə, `--stop-timeout 40` parametrini saxlayın.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Müntəzəm/yazmadan əvvəlki ehtiyat nüsxələr xaricdən idarə olunursa, bunu `true` olaraq təyin edin. Mövcud verilənlər bazasının miqrasiyaları üçün yenə də ayrıca davamlı təhlükəsizlik anlıq görüntüsü və kütləvi miqrasiya qoruyucusu tələb olunur.
- **Məlumatların davamlı saxlanması:** Konteyner yenidən başladıldıqda verilənlər bazanızı, açarlarınızı və konfiqurasiyalarınızı qorumaq üçün həmişə `/app/data` yoluna bir həcm qoşun.
- **Port konfiqurasiyası:** Standart `20128` portunu dəyişmək üçün `PORT` mühit dəyişənini yenidən təyin edin.

## Həmçinin baxın

- [VM yerləşdirmə təlimatı](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare quraşdırması
- [Fly.io yerləşdirmə təlimatı](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-da yerləşdirmə
- [Mühit konfiqurasiyası](../reference/ENVIRONMENT.md) — Tam `.env` arayışı
