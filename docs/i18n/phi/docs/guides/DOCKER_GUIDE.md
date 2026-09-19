# 🐳 Docker Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kumpletong sanggunian para sa deployment gamit ang Docker. Para sa mabilisang pagsisimula, tingnan ang [seksyon ng Docker sa README](../README.md#-docker).

## Talaan ng mga Nilalaman

- [Mabilisang Pagpapatakbo](#quick-run)
- [Gamit ang Environment File](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Mga Available na Profile](#available-profiles)
- [Pag-configure ng mga host CLI tool kapag tumatakbo ang OmniRoute sa Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose para sa Production](#production-compose)
- [Mga Stage ng Dockerfile](#dockerfile-stages)
- [Mahahalagang Environment Variable](#critical-environment-variables)
- [Docker Compose gamit ang Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Mga Tag ng Image](#image-tags)
- [Availability: iisang replica lamang ang default na SQLite](#availability-default-sqlite-is-single-replica)
- [Mahahalagang Tala](#important-notes)

---

## Mabilisang Pagpapatakbo

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Gamit ang Environment File

```bash
# Kopyahin at i-edit muna ang .env
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
# Base profile (walang mga CLI tool)
docker compose --profile base up -d

# CLI profile (naka-built-in ang Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Host profile (pangunahing para sa Linux; mina-mount nang read-only ang mga host CLI binary)
docker compose --profile host up -d

# Pagsamahin ang CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Mga Available na Profile

May kasamang apat na Compose profile ang OmniRoute. Piliin ang tumutugma sa iyong environment.

| Profile          | Service          | Kailan gagamitin                                                                                                                                                                        | Command                                      |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (default) | `omniroute-base` | Headless server / minimal na runtime, walang kasamang provider CLI                                                                                                                      | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Mga agentic workflow na tumatawag sa `omniroute providers/setup/doctor` at mga kasamang CLI (Codex, Claude Code, Droid, OpenClaw)                                                       | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Mga Linux host na gustong magkaroon ng access na tulad ng `network_mode` sa mga host CLI sa pamamagitan ng pag-mount ng `~/.local/bin`, `~/.codex`, `~/.claude`, atbp. bilang read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Patakbuhin ang [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar sa port `8317` para sa upstream na pag-proxy ng CLI                                                  | `docker compose --profile cliproxyapi up -d` |

> Maaaring pagsamahin ang maraming profile: `docker compose --profile cli --profile cliproxyapi up -d`.

## Pag-configure ng mga host CLI tool kapag tumatakbo ang OmniRoute sa Docker

Ang `omniroute setup-codex`, `setup-claude`, `config set <tool>` at ang
button na **I-save ang config** ng dashboard ay nagsusulat ng mga file tulad ng `~/.codex/*.config.toml`. May
kahulugan lamang ang mga path na iyon sa machine kung saan aktuwal na tumatakbo ang CLI. Kapag pinatakbo
ang mga ito sa loob ng container, mapupunta ang pagsusulat sa sariling home ng container (`/home/node` —
tumatakbo ang image bilang `USER node`), kung saan hindi ito kailanman babasahin ng anumang host CLI at
mawawala ito sa sandaling muling gawin ang container.

Natutukoy ito ng OmniRoute at tinatanggihan ang pagsusulat habang nagbibigay ng mga tagubilin sa halip na
mag-ulat ng tagumpay na hindi mo naman magagamit: nag-e-exit ang CLI gamit ang `2`, at sumasagot ang API ng `422`
na may `containerEphemeralTarget: true`.

### Inirerekomenda: patakbuhin ang CLI sa host at ang OmniRoute sa Docker

Ang container ang nagsisilbi sa API; kino-configure ng CLI ang iyong mga host tool.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ituro ang CLI sa container
omniroute setup-codex                      # isinusulat ang tunay na ~/.codex sa iyong host
```

Ito ang tamang piliin kapag tumatakbo ang Codex, Claude Code, Cursor o katulad nito sa iyong
laptop — na siyang karaniwang setup.

### Alternatibo: i-bind-mount ang mga host config dir (`host` profile)

Kung gusto mong ang container mismo ang magsulat sa iyong host config, i-mount ang
mga directory at ituro ang `CLI_CONFIG_HOME` sa mount root. Ginagawa na ito ng `host` profile:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Ang bind mount ang dahilan kung bakit mapagkakatiwalaan ang path: binabasa ng OmniRoute ang
`/proc/self/mountinfo` at pinapayagan ang pagsusulat sa mga naka-mount na path (at sa mga directory
na may mga child na naka-mount, na eksaktong anyo ng `/host-home` sa itaas) habang
tinatanggihan pa rin ang mga hindi naka-mount.

### Paraan para makalusot: i-configure ang sariling mga CLI ng container (gamitin nang limitado)

Kapag tunay na nasa loob ng container ang mga CLI (ang `cli` profile), sinasadya ang pagsusulat.
Ipasa ang `--allow-container-write` sa anumang `setup-*` command, o itakda ang
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para sa server. Magpapatuloy ang pagsusulat
na may babalang hindi ito mananatili kapag nawala ang container.

> **Babala sa seguridad — `cli` profile + `docker.sock` mount.**
> Ibi-bind-mount ng `cli` profile ang `/var/run/docker.sock` upang magawang muling likhain ng
> auto-updater sa loob ng container ang stack mula sa host daemon
> (sinusuri ng `src/lib/system/autoUpdate.ts` ang socket na iyon at nilalaktawan ang
> Docker path kapag wala ito). Ang socket na iyon ay **isang hangganan ng pagtitiwala na katumbas ng host-root**:
> anumang makaka-access dito ay makokontrol ang host Docker daemon bilang
> root — maaari itong gumawa, magsiyasat, huminto at mag-alis ng anumang container sa host.
> Mga implikasyon:
>
> 1. **Huwag kailanman ilantad sa network ang port ng `cli` profile.** I-publish
>    ito sa `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — ang `cli` profile na naaabot mula sa LAN ay ginagawang ganap na
>    pagkompromiso sa host ang anumang dashboard-level RCE.
> 2. **Huwag mag-bind ng anumang karagdagang host directory sa `cli` profile.**
>    Ang Docker socket kasama ng anumang karagdagang mount ay nagbibigay sa container ng ganap na
>    read/write access sa iyong filesystem at host config. Kung kailangan ng isang tool na
>    makita ang isang project, patakbuhin ito nang lokal gamit ang CLI binary — huwag itong i-mount
>    sa `cli` container.
>
> Kung hindi mo kailangan ang auto-update sa loob ng container, huwag paganahin ang `cli` profile
> (`COMPOSE_PROFILES=core,redis` o mas maikli). Hindi mina-mount ng ibang mga profile ang
> Docker socket.
>
> Tingnan ang `docs/security/MITM-TPROXY-DECRYPT.md` (git; hindi kino-compile sa `/docs`) para sa kaugnay na threat model
> tungkol sa MITM, at ang `docs/security/SUPPLY_CHAIN.md` para sa
> binary provenance chain ng `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

Umaasa ang OmniRoute sa Redis para suportahan ang distributed rate limiter at nakabahaging cache. Ang serbisyong `redis` ay **palaging nakatukoy** sa `docker-compose.yml` (wala itong profile gate) at nagsisimula kasabay ng anumang ibang profile.

| Detalye               | Halaga                                     |
| --------------------- | ------------------------------------------ |
| Image                 | `redis:7-alpine`                           |
| Pangalan ng container | `omniroute-redis`                          |
| Internal na port      | `6379`                                     |
| Host port (override)  | `REDIS_PORT` (default ay `6379`)           |
| Host bind (override)  | `REDIS_BIND_HOST` (default ay `127.0.0.1`) |
| Volume                | `omniroute-redis-data` → `/data`           |
| Healthcheck           | `redis-cli ping` (10s na interval)         |

Mga kaugnay na environment variable:

- `REDIS_URL` — connection string na ini-inject sa app (`redis://redis:6379` bilang default).
- `REDIS_PORT` — host-side na port mapping para sa Redis container.
- `REDIS_BIND_HOST` — host interface kung saan inilalathala ang port. Ang default ay `127.0.0.1`.

> **Bakit loopback ang default:** tumatakbo ang sidecar nang walang `requirepass`, at naaabot
> ito ng mga app container sa pamamagitan ng compose network (`redis:6379`) — naroon lamang
> ang inilathalang port para sa host-side tooling (`redis-cli`, isang lokal na `npm run dev`).
> Kapag inilathala sa `0.0.0.0`, mailalantad ang Redis na walang authentication sa bawat host
> sa iyong LAN. Kung itatakda mo ang `REDIS_BIND_HOST=0.0.0.0`, idagdag din ang `--requirepass`
> sa `command:` ng serbisyo.

Hindi inirerekomenda ang **pag-disable sa Redis** (bababa ang rate limiter sa in-memory fallback). Kung kailangan talaga, alisin o i-comment ang `redis:` service block sa `docker-compose.yml`, o i-scale ito sa zero:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Para sa isang nakahiwalay na production snapshot na tumatakbo kasabay ng dev, gamitin ang `docker-compose.prod.yml`.

| Detalye                   | Halaga                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| File                      | `docker-compose.prod.yml`                                                                           |
| Default na dashboard port | `PROD_DASHBOARD_PORT=20130` (naka-map sa internal na `${DASHBOARD_PORT:-20128}`)                    |
| Default na API port       | `PROD_API_PORT=20131`                                                                               |
| Image                     | `omniroute:prod` (binuo mula sa `runner-cli` target)                                                |
| Redis container           | `omniroute-redis-prod` (`redis:8.6.2`, nakalaang `redis-prod-data` volume)                          |
| Data volume               | `omniroute-prod-data` (may pangalan, nananatili sa bawat rebuild)                                   |
| Mga healthcheck           | `node healthcheck.mjs` + `redis-cli ping`, na may `depends_on` na nakadepende sa kalusugan ng Redis |

Paraan ng paggamit:

```bash
# Buuin at simulan ang production stack
docker compose -f docker-compose.prod.yml up -d --build

# I-stream ang mga log
docker compose -f docker-compose.prod.yml logs -f

# Ihinto at alisin (panatilihin ang mga volume)
docker compose -f docker-compose.prod.yml down
```

Tumatakbo ang prod stack nang parallel sa dev compose (magkakaiba ang mga pangalan ng container, port, at volume), kaya maaari kang magpatuloy sa lokal na pag-develop habang nananatiling tumatakbo ang production.

## Mga Stage ng Dockerfile

Naglalaman ang repository ng multi-stage na Dockerfile (`Dockerfile`). Tatlong stage ang inilalantad; piliin ang tamang `target` para sa iyong use case.

| Stage         | Base image            | Layunin                                                                                                                                                                                 |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Ini-install ang mga dependency (`npm ci --legacy-peer-deps`) at pinapatakbo ang `npm run build` (Turbopack bilang default — tingnan ang Mga resource sa build-time sa ibaba)            |
| `runner-base` | `node:26-trixie-slim` | Production runtime na may standalone output ng Next.js. **Walang kasamang mga provider CLI.**                                                                                           |
| `runner-cli`  | `runner-base`         | Idinaragdag ang `git`, `docker.io`, `docker-compose` at mga global CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Piliin ito para sa mga agentic workflow.** |

Manu-manong bumuo ng partikular na target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Mga resource sa build-time

Tatlong build arg ang kumokontrol sa resource cost ng stage na `builder`. Para lamang ang mga ito sa build-time —
ang `OMNIROUTE_MEMORY_MB` (sa ibaba) ay hiwalay na setting para sa runtime.

| Build arg                   | Default | Epekto                                                                                                       |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `1`     | Gumagamit ng webpack sa pag-build kapag `0`. Mas mababang peak memory, ngunit mas mabagal.                   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Limitasyon ng V8 heap (`--max-old-space-size`) para sa inilulunsad na `next build`.                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Ipinapasa sa `CIRCLE_NODE_TOTAL`; kinukuha ng Next ang `workers = N - 1` para sa pangongolekta ng page data. |

Ang `OMNIROUTE_BUILD_WORKERS` ang dapat taasan sa isang malaking builder at ang
dapat paghinalaan kapag namatay ang isang build na limitado ang resource **pagkatapos** ng `✓ Compiled successfully`. Ang bawat
page-data worker ay sarili nitong process, at gayundin ang parent na `next build`;
sa isang live na reproduksiyon sa VPS (issue #7518), nasukat ang peak RSS ng bawat process sa
~4.5 GB anuman ang `NODE_OPTIONS` heap flag (nagko-compile ang Turbopack sa
native/Rust memory sa labas ng V8 heap). Ang default na `2` (→ 1 worker, 2
process sa kabuuan) ay itinakda para sa mga GitHub-hosted runner na may 16 GB / 4 vCPU na
ginagamit ng publish pipeline. Sa `8` (→ 7 worker), naubusan ng memory ang runner na iyon at
nabigo ang hakbang ng buildkit nang may `ResourceExhausted: ... cannot allocate memory`;
hindi pa rin nagkasya ang `3` (→ 2 worker) nang direktang masukat ang RSS ng bawat process
sa halip na tantiyahin. Isinasagawa ng `tests/unit/docker-build-memory-budget.test.ts`
ang pagkalkula batay sa nasukat na halaga at nabibigo ito kung lumampas ang alinmang setting
sa kapasidad ng runner.

Nagko-compile ang Turbopack sa native Rust memory na nasa **labas** ng V8 heap, kaya
hindi ito nililimitahan ng `OMNIROUTE_BUILD_MEMORY_MB`. Sa host na may limitasyon sa memory,
isi-SIGKILL ng OOM killer ang build nang walang anumang error text — basta na lamang itong
hihinto sa gitna ng `Creating an optimized production build`, na tila nag-hang sa halip
na naubusan ng memory. Kung limitado ang build host, lumipat ng bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

Naka-enable ang `webpackBuildWorker`, kaya nagpapatakbo ang `next build` ng parent **at** worker
process at magkahiwalay na sinusunod ng bawat isa ang `OMNIROUTE_BUILD_MEMORY_MB`. Itakda ang limitasyon
ng container nang humigit-kumulang na higit sa doble ng halagang iyon, hindi isang beses lamang.

Sinukat sa tree na ito (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limitasyon ng container | Resulta                                      |
| --------- | ----------------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB          | Parehong pinatay ng OOM, nang walang mensahe |
| webpack   | 8 GiB                   | Na-SIGKILL ang build worker                  |
| webpack   | 12 GiB                  | Nagtagumpay, umabot sa peak na 11.1 GiB      |

### Mga default sa runtime

Mga default na ine-export ng `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Pag-uugali ng memory sa Docker:

- Itinatakda ng image ang `OMNIROUTE_MEMORY_MB=1024` at kinukuha mula rito ang `NODE_OPTIONS=--max-old-space-size=1024`.
- Sinisimulan ng standalone launcher ang aktuwal na server process; binabasa nito ang `OMNIROUTE_MEMORY_MB` at idinaragdag ang `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Ginagamit ng Node ang huling naulit na halaga ng `--max-old-space-size`, kaya kinokontrol ng pagtatakda sa `OMNIROUTE_MEMORY_MB` ang epektibong limitasyon ng Docker heap.
- Dahil palaging itinatakda ito ng image, hindi kailanman ginagamit sa Docker ang sariling fallback ng launcher na nakakalibrate ayon sa RAM. Tahasang taasan ito para sa workload (talahanayan sa ibaba). Napakaliit pa rin ng `2048` para sa `/v1/responses` ng coding agent.

### Runtime RAM para sa mga coding agent

Ang 1 GiB na default ng Docker ay minimum para sa dashboard/light chat, hindi sukat para sa production. Ang mahahabang body ng `POST /v1/responses` (daan-daang mensahe, sampu-sampung tool) ay nagpapanatili ng maraming in-memory graph habang nagko-compress. Dalawang magkapatong na request na ~3 MiB / ~750k-token ang nagpa-abort sa V8 sa **12 GiB** na old-space (`FATAL ERROR: Reached heap limit`) at umabot din sa cgroup OOM na 16 GiB. Tingnan ang [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Itakda ang **cgroup `--memory` nang mas mataas kaysa sa heap** — nasa labas ng V8 ang mga native buffer, SQLite, at mga intermediate ng compression.

| Workload                                   | `OMNIROUTE_MEMORY_MB`     | Container / cgroup          | Mga Tala                                                                                                                  |
| ------------------------------------------ | ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, isang magaan na chat            | `1024` (default ng image) | ≥2 GiB                      |                                                                                                                           |
| Isang coding agent (Claude/Codex/Grok)     | `8192`                    | ≥10 GiB                     | Karaniwang single-session na `/v1/responses`                                                                              |
| Dalawang sabay na mahabang `/v1/responses` | `10240`–`12288`           | ≥12–16 GiB                  | Nasukat na pag-abort ng V8 sa ~12 GiB na heap                                                                             |
| Tatlo+ na sabay na mahahabang context      | huwag sa iisang process   | i-serialize / dagdagang RAM | Ang default na heavyweight admission ay 1 in-flight; ang pagtataas nito nang walang RAM ay muling nagdudulot ng pag-abort |

Kapag **hindi nakatakda** ang `OMNIROUTE_MEMORY_MB`, ang `omniroute serve` sa bare metal ay nagkakalibrate sa ~35% ng RAM (nililimitahan sa `[512, 4096]`). Palaging itinatakda ng Docker ang `1024`, kaya hindi kailanman tumatakbo ang calibration na iyon sa opisyal na image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Mga Kritikal na Environment Variable

Bukod sa mga default na nakadokumento sa [ENVIRONMENT.md](../reference/ENVIRONMENT.md), ang mga sumusunod na variable ang pinakamahalaga kapag pinapatakbo sa ilalim ng Docker:

| Variable                      | Layunin                                                                                                                                                                                                                                                                                         | Default                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Pinagsasaluhang lihim para sa WebSocket bridge. **Kinakailangan sa production** — itakda sa isang malakas na random na string.                                                                                                                                                                  | hindi nakatakda (kailangang ibigay) |
| `REDIS_URL`                   | Connection string para sa rate limiter / cache backend                                                                                                                                                                                                                                          | `redis://redis:6379`                |
| `REDIS_PORT`                  | Port sa panig ng host para sa kasamang Redis container                                                                                                                                                                                                                                          | `6379`                              |
| `REDIS_BIND_HOST`             | Host interface kung saan inilalathala ang kasamang Redis port (loopback maliban kung magdaragdag ka ng AUTH)                                                                                                                                                                                    | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Host path na naka-mount sa `cli` profile sa `/workspace/omniroute` para sa mga self-update workflow                                                                                                                                                                                             | `.` (kasalukuyang directory)        |
| `OMNIROUTE_MEMORY_MB`         | Pinakamataas na Node heap sa runtime para sa Docker standalone server; ino-override nito ang default ng image sa itaas. Mga coding agent: `8192`+ (tingnan ang [runtime RAM](#runtime-ram-for-coding-agents)).                                                                                  | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | I-override ang mga inilalantad na port para sa dashboard (20128) at API (20129)                                                                                                                                                                                                                 | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Host interface kung saan inilalathala ng docker-compose ang mga port ng dashboard/API/live-WS. Kapag `REQUIRE_API_KEY=false` (ang default), inilalantad ng `0.0.0.0` ang anonymous na `/v1` proxy sa LAN — palawakin lamang gamit ang `REQUIRE_API_KEY=true` o kung may reverse proxy sa harap. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Host interface kung saan inilalathala ng docker-compose ang `cliproxyapi` sidecar — naglalaman ang data volume nito ng mga credential ng provider.                                                                                                                                              | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Directory na binabasa at ini-install-an ng runtime plugin scanner. Itakda ito kapag bind-mounted ang mga plugin: sinusunod ng default ang `HOME`, na maaaring hindi i-export ng isang image.                                                                                                    | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | URL subpath kapag inilathala ang app sa likod ng reverse proxy (hal. `/omniroute`)                                                                                                                                                                                                              | _(walang laman = root)_             |
| `NEXT_PUBLIC_BASE_URL`        | Pampublikong browser origin kasama ang subpath (hal. `https://host/omniroute`)                                                                                                                                                                                                                  | hindi nakatakda                     |
| `PROD_DASHBOARD_PORT`         | Dashboard port sa panig ng host para sa `docker-compose.prod.yml`                                                                                                                                                                                                                               | `20130`                             |
| `CLIPROXYAPI_PORT`            | Port sa panig ng host para sa `cliproxyapi` sidecar                                                                                                                                                                                                                                             | `8317`                              |

## Reverse Proxy sa isang Subpath (Traefik / nginx)

Ang `basePath` ng Next.js ay kino-compile sa standalone bundle. Itinatala ng OmniRoute ang
naka-bake na value sa isang sentinel file sa app root (isinusulat habang isinasagawa ang `npm run build`; binabasa ng
`scripts/docker/ensure-docker-base-path.mjs`) at ikinukumpara ito sa
`OMNIROUTE_BASE_PATH` kapag nagsisimula ang container. Kapag magkaiba ang mga ito at ang image ay
binuo para sa domain root, muling isinusulat ng entrypoint ang mga standalone manifest, ang
mga naka-embed na literal na `basePath`/`assetPrefix` (ang Next 16 ay nagre-render ng mga SSR asset URL mula
lamang sa `assetPrefix` — itinutulad ito ng patcher sa subpath), ang mga naka-bake na
`/_next/static` asset URL (mga client-reference manifest, media import, at na-prerender na
error page), at ang client `process.env` shim bago patakbuhin ang `node dev/run-standalone.mjs`.

### Compose build (inirerekomenda)

Itakda ang parehong variable sa `.env`, pagkatapos ay muling buuin upang magtugma ang image at runtime:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Ipinapasa ng `docker-compose.yml` ang `OMNIROUTE_BASE_PATH` bilang Docker build-arg at bilang
runtime environment variable.

### Pre-built na root image + runtime subpath

Ang mga naka-publish na `diegosouzapw/omniroute:*` image ay binuo para sa domain root. Maaari mo pa ring
itakda ang `OMNIROUTE_BASE_PATH` sa runtime; isang beses ipa-patch ng container ang bundle sa pagsisimula.
Itambal ito sa katugmang pampublikong origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

I-configure ang reverse proxy upang i-forward ang **buong** external path (huwag alisin ang
prefix). Dapat i-route ng Traefik ang `PathPrefix(`/omniroute`)` patungo sa container nang walang
`StripPrefix`, upang matanggap ng Next.js ang `/omniroute/...` at maihatid ang mga asset mula sa
`/omniroute/_next/...`.

Sinusuri ng Docker healthcheck ang magaan na `/healthz` lifecycle endpoint na nilagyan ng prefix
na aktibong `OMNIROUTE_BASE_PATH`. Nananatiling available ang `/api/monitoring/health` para sa
mga diagnostic ng tao/dashboard; upang ibalik dito ang container HEALTHCHECK (halimbawa,
para sa malalim na pagpapatupad ng kalusugan), itakda ang `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ang path na iyon ay isang **malalim** na pagsusuri (DB + buod ng monitoring) — naaangkop para sa
hindi madalas na `HEALTHCHECK` ng Docker kung pipiliin mong gamitin itong muli, ngunit **hindi** para sa mga interval ng
`livenessProbe` ng Kubernetes.

Para sa mga orchestrator (Kubernetes, Nomad, atbp.):

| Probe           | Mas mainam                                                                | Iwasan                                                           |
| --------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, o TCP sa pangunahing port (`PORT`, default na `20128`) | `/api/monitoring/health` bilang liveness                         |
| Readiness       | HTTP `GET /healthz`                                                       | Maiikling timeout na itinuturing na patay ang abalang event loop |
| Deep / blackbox | `/api/monitoring/health`                                                  | —                                                                |

Iniuulat ng `/healthz` ang lifecycle ng proseso (`ok` / `starting` / `stopping`). Ang `/livez` ay
para lamang sa pagiging buhay ng proseso (200 tuwing maaaring tumakbo ang handler; hindi nito hinihintay ang
readiness). Pareho pa ring tumatakbo ang mga ito sa parehong Node event loop na humahawak sa mga request, kaya
maaaring maantala ang mga ito ng CPU-bound na catalog o compression work — abala ≠ patay. Mas mainam ang TCP
liveness kung nagti-timeout ang mga HTTP probe. Kumpletong gabay sa probe:
[Gabay sa monitoring — mga rekomendasyon sa Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose gamit ang Caddy (HTTPS Auto-TLS)

Maaaring ligtas na ilantad ang OmniRoute gamit ang awtomatikong paglalaan ng SSL ng Caddy. Tiyaking nakaturo ang DNS A record ng iyong domain sa IP ng iyong server.

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
      # Origin na nakikita ng browser para sa mga OAuth callback, link ng dashboard, at nabuong pampublikong URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Panloob na server-to-server URL para sa mga nakaiskedyul na job / self-fetch.
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

Itinatakda ng Caddy ang mga karaniwang forwarding header para sa upstream container. Ginagamit ng OmniRoute ang
`NEXT_PUBLIC_BASE_URL` bilang canonical na pampublikong origin para sa mga OAuth callback at nabuong pampublikong
link; gumagamit ang mga authenticated write sa dashboard ng mga same-origin request kasama ang session-bound na
proteksyon sa CSRF. Paganahin lamang ang `OMNIROUTE_TRUST_PROXY` para sa mga advanced na deployment kung saan sadya
mong nais na kunin ng OmniRoute ang pampublikong origin mula sa mga pinagkakatiwalaang forwarded header sa halip na sa tahasang
configuration.

## Cloudflare Quick Tunnel

Kasama sa suporta ng dashboard para sa mga Docker deployment ang isang one-click na **Cloudflare Quick Tunnel** sa `Dashboard → Endpoints`. Sa unang pagpapagana, ida-download lamang ang `cloudflared` kapag kinakailangan, magsisimula ng pansamantalang tunnel patungo sa kasalukuyan mong `/v1` endpoint, at ipapakita ang nabuong `https://*.trycloudflare.com/v1` URL sa mismong ibaba ng iyong karaniwang pampublikong URL.

Maaaring ipakita o itago ang mga endpoint tunnel panel (Cloudflare, Tailscale, ngrok) mula sa `Settings → Appearance` nang hindi binabago ang estado ng aktibong tunnel.

### Mga Tala sa Tunnel

- Pansamantala ang mga Quick Tunnel URL at nagbabago pagkatapos ng bawat restart.
- Hindi awtomatikong ibinabalik ang mga Quick Tunnel pagkatapos ng restart ng OmniRoute o container. Muling paganahin ang mga ito mula sa dashboard kapag kinakailangan.
- Kasalukuyang sinusuportahan ng managed install ang Linux, macOS, at Windows sa `x64` / `arm64`.
- Gumagamit ang mga managed Quick Tunnel ng HTTP/2 transport bilang default upang maiwasan ang maiingay na babala tungkol sa QUIC UDP buffer sa mga container environment na limitado ang resource. Itakda ang `CLOUDFLARED_PROTOCOL=quic` o `auto` kung nais mo ng ibang transport.
- Kasama sa mga Docker image ang mga system CA root at ipinapasa ang mga ito sa managed na `cloudflared`, na umiiwas sa mga TLS trust failure kapag nag-bootstrap ang tunnel sa loob ng container.
- Itakda ang `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` kung nais mong gumamit ang OmniRoute ng umiiral na binary sa halip na mag-download nito.

## Mga Image Tag

| Image                    | Tag      | Laki   | Paglalarawan                                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Pinakamataas na **na-publish** na stable SemVer (hindi ang git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | I-pin ang ganitong uri ng tag para sa GitOps                           |

Multi-platform manifest: native na `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Awtomatikong pinipili ng Docker ang katugmang architecture; ipasa ang `--platform linux/amd64` kung kailangan mong pilitin ang AMD64 emulation sa mga ARM host.

### Mga Release Channel

Nagpa-publish ang OmniRoute ng magkakahiwalay na Docker channel para sa mga stable release, aktibong release-branch testing, at mga development build.

| Channel                         | Pinagmulan                                      | Pagbabago                      | Inirerekomendang paggamit                                                                                                                                           |
| ------------------------------- | ----------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Nilagdaan/bersiyonadong release                 | Hindi nababago                 | Mga production deployment na naka-pin sa eksaktong release                                                                                                          |
| `:latest` / `:latest-web`       | Pinakamataas na **na-publish** na stable SemVer | Nababagong stable pointer      | Sinusundan ang mga stable release **pagkatapos** ng isang SemVer publish job — **hindi** sinusubaybayan ang `main` o mga hindi pa na-release na `release/v*` commit |
| `:next` / `:next-web`           | Kasalukuyang default na `release/v*` branch     | Nababagong pre-release pointer | Pagsubok sa mga pag-aayos na nasa aktibong release branch na ngunit wala pa sa isang stable release                                                                 |
| `:main` / `:main-web`           | `main` branch                                   | Nababagong development pointer | Para lamang sa development at integration testing                                                                                                                   |

#### Paggamit ng pre-release channel

Muling binubuo ang `next` channel sa bawat push sa kasalukuyang default na `release/v*` branch at inilalathala ito para sa AMD64 at ARM64. Hindi ito maaaring ma-overwrite ng mga mas lumang maintenance branch. Nagbibigay ang channel ng pullable na image para sa mga pag-aayos na na-merge na sa aktibong release branch bago gawin ang susunod na stable tag.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para sa Docker Compose, i-override ang image tag na ginagamit ng napiling profile, pagkatapos ay i-pull at muling likhain ang service:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Kaligtasan at rollback

Ang `next` ay isang floating pre-release channel. Maaari itong magbago sa anumang push sa aktibong release branch at **hindi sinusuportahan para sa paggamit sa production**. I-pin ang image digest habang sinusuri ang isang partikular na build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Bago magsubok, i-back up ang data volume ng OmniRoute o ang bind-mounted na direktoryo ng data. Upang mag-roll back, ibalik ang dating ginagamit na stable na bersyon o digest at muling likhain ang container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Hindi kailanman maaaring ilipat ng isang release-branch build ang `latest`; tanging isang kwalipikadong stable na semantic version ang maaaring mag-promote sa stable pointer. Pinananatili ng mga image na `next` ang inspeksyon sa release image at ang gate na humaharang kapag may CRITICAL na kahinaan.

**Ang `latest` ay hindi garantiya na napapanahon ito sa git.** Ang mga na-merge na pag-aayos sa `main` o sa aktibong branch na `release/v*` ay **hindi** mapapasama sa `:latest` hangga't hindi napa-publish ang isang stable na SemVer image at hindi pino-promote ng publish job ang `:latest` (kaparehong digest ng SemVer na iyon). Kung mukhang hindi nagbabago ang `latest` kahit ipinapakita na ng GitHub ang pag-aayos, i-pull ang `:next` upang subukan ang release branch o hintayin ang SemVer tag.

| Ang gusto mo                                                                          | Gamitin                                 |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / production na hindi dapat kusang magbago                                     | I-pin ang `:X.Y.Z` (o ang image digest) |
| Sundan ang mga na-publish na stable at tanggapin ang muling paglikha sa bawat release | `:latest`                               |
| Subukan ang mga hindi pa nailalabas na commit ng `release/v*`                         | `:next` (hindi para sa production)      |
| Subukan ang `main`                                                                    | `:main` (hindi para sa production)      |

## Availability: iisang replica ang default na SQLite

Ang karaniwang Docker / Kubernetes OmniRoute ay **isang proseso ng Node + isang SQLite writer**. **Hindi sinusuportahan** ang high availability sa topology na iyon.

| Limitasyon                                      | Bunga                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Iisang writer                                   | **Huwag** magpatakbo ng maraming replica laban sa iisang SQLite file. Masisira nito ang DB.                                                                                                                                                                                                                                                              |
| Muling paggawa / pag-restart / HEALTHCHECK kill | **Ganap na outage** ng mga kasalukuyang SSE, dashboard session, at in-memory state. Madidiskonekta ang bawat nakakonektang client. Ang mga bagong request habang walang endpoint ay makakatanggap ng reverse-proxy na **`502 Bad Gateway: Unknown error`**, hindi OmniRoute JSON — hindi ito makikilala ng mga client mula sa provider failure (#11015). |
| Kaparehong event loop ng `/healthz`             | Maaaring maantala ng abalang catalog o compression tick ang mga probe; ire-restart ng maikling timeout ang **nag-iisang** replica.                                                                                                                                                                                                                       |

**Matrix ng probe** (tingnan din ang [mga rekomendasyon sa Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                 | Target                                                           | Huwag gamitin                                                        |
| --------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| Liveness              | TCP sa `PORT` (default na `20128`), o maluwag na HTTP `/healthz` | `/api/monitoring/health`                                             |
| Readiness             | HTTP `GET /healthz`                                              | Mahihigpit na timeout na itinuturing na patay ang abalang event loop |
| Malalim / para sa tao | `/api/monitoring/health`                                         | Awtomatikong kubelet liveness                                        |

**Mga upgrade:** asahang madidiskonekta ang bawat session. I-drain ang mga client kung kaya; walang rolling update sa default na SQLite. Papalitan din ng Compose `restart: unless-stopped` kasama ng Docker `HEALTHCHECK` ang nag-iisang proseso kapag Unhealthy ang container — pareho ang lawak ng epekto.

Snippet ng Kubernetes para sa **iisang replica** (kinakailangan ang Recreate; huwag taasan ang `replicas` laban sa iisang SQLite file):

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

Binibigyan ng `preStop` sleep ang kube ng oras na alisin ang mga Service endpoint bago ang SIGTERM upang **huminto** ang bagong traffic sa pagpunta sa prosesong papatayin. Idi-drain ang kasalukuyang `/v1/responses` SSE hanggang sa `SHUTDOWN_TIMEOUT_MS` (default na 30s) sa pamamagitan ng heavyweight admission leases (#11015). Ang mga bagong request na nakakarating pa rin sa proseso ay makakatanggap ng `503` + `Retry-After: 5`. Nananatiling ganap na outage ang puwang na walang endpoint sa Recreate hanggang maging Ready ang kapalit — dulot iyon ng SQLite topology, hindi ng maling configuration ng probe.

Ang external Postgres / multi-writer HA ay **hindi** isang dokumentadong karaniwang paraan. Kung kailangan mo ng HA, panatilihin ang iisang replica o magpatakbo ng topology na hiwalay na nasubukan at nadokumento ng proyekto. Makikita ang gawain para sa Postgres/MySQL sa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hangga't hindi pa iyon nailalabas, ang tanging sinusuportahang paraan upang paramihin ang kapasidad para sa **malalaking** `/v1/responses` ay N magkakahiwalay na proseso (susunod na seksyon), hindi `replicas > 1` sa iisang volume.

## Scale-out: N independiyenteng proseso

Ang isang proseso ng Node ay **isang V8 heap**. Dalawang nagsasapawang ~3 MiB / ~750k-token coding-agent na `POST /v1/responses` (RTK + Caveman) ang nagpapa-abort sa heap na iyon sa ~12 Gi (`FATAL ERROR: Reached heap limit`) at maaaring magdulot ng OOM sa isang 16 Gi cgroup. Tingnan ang [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ang sukat na iyon ay isang babala tungkol sa **memory budget**, hindi isang permanenteng maximum ng produkto na dalawang sabay-sabay na mahabang `/v1/responses`. Ang pagtanggap ng heavyweight chat ay nililimitahan ng awtomatikong kinukuwentang ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) na ibinatay sa parehong limitasyon ng V8/cgroup — ang pag-override nito pataas (o pagtatakda ng legacy na request-count cap na `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) sa isang proseso na naitakda na ang laki ay muling magdudulot ng abort. Ang maliliit na chat, `/healthz`, `/v1/models`, at MCP ay **hindi** kasama sa cap na iyon.

### Isang proseso: higit sa dalawang mahabang `/v1/responses`

Ang isang **malusog** na proseso (heap na mas mababa sa `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default na `0.75`) ay **maaaring** magpatakbo ng higit sa dalawang sabay-sabay na mahabang `POST /v1/responses` kapag may natitira pang puwang sa process-wide inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Ang mga body na nasa o lampas sa `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default na 256 KiB) ay kumukuha ng parehong heavyweight lease gaya ng mga request na mabigat sa istruktura at gumagamit ng parehong [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) na `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Ang sampu-sampung sabay-sabay na mahabang SSE client (madalas kailangan ng mga operator ang 40–50) ay usapin ng **memory budget** — itakda ang laki ng heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — hindi ito permanenteng “max 2” na limitasyon ng produkto. Ang heap na nasa ilalim ng pressure ay patuloy na nagbabawas ng load gamit ang retryable na `503` upang hindi maulit ang #7849.

Upang **paramihin ang mga heap** (mga independiyenteng V8 old-space) **sa ngayon**:

| Gawin                                                                                                                                                                  | Huwag gawin                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Magpatakbo ng **N container/pod**, na bawat isa ay may **sarili nitong** `DATA_DIR` / volume                                                                           | Magtakda ng `replicas > 1` para sa iisang SQLite file                 |
| Itakda ang heavy in-flight + healthy-headroom batay sa heap / inflight-byte budget; ang 1–2 ay konserbatibong default ng #7849, hindi permanenteng maximum ng produkto | Bigyan ang isang proseso ng 8× RAM at walang limitasyong count cap    |
| Opsyonal: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para sa **mga shared quota counter**                                                                    | Ituring ang Redis bilang shared SQLite — hindi ito ganoon             |
| Kopyahin ang mga provider secret sa bawat instance (o tanggapin ang magkakahiwalay na dashboard)                                                                       | Umasa sa iisang dashboard / iisang call-log para sa lahat ng instance |
| Ilagay sa harap ang anumang load balancer; sapat na ang pagiging sticky ayon sa API key o session                                                                      | Mangailangan ng vendor-specific na size-aware middleware              |

Hardware: ang bilang ng sabay-sabay na mahabang `/v1/responses` sa bawat instance ay usapin ng **memory budget** (heap + inflight-byte / #10110). Pinararami pa rin ng `N` independiyenteng `DATA_DIR` ang mga heap: kailangang masuportahan ng host RAM ang `N × cgroup`, hindi “isang 16 Gi pod na may N=8.” Huwag kailanman gumamit ng `replicas > 1` sa iisang SQLite file.

Halimbawa ng Compose (dalawang heap, dalawang volume — hindi `deploy.replicas: 2`):

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

Ang in-process density (compression sa labas ng HTTP isolate) ay nasa [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ang isang lohikal na cluster sa shared durable state ay nasa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Mahahalagang Tala

- **SQLite WAL Mode:** Dapat hayaang matapos ang `docker stop` upang mai-checkpoint ng OmniRoute ang mga pinakabagong pagbabago pabalik sa `storage.sqlite`. Nakatakda na sa mga kasamang Compose file ang 40s na palugit sa paghinto. Kung direkta mong pinapatakbo ang image, panatilihin ang `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Itakda sa `true` kung pinamamahalaan sa labas ang mga regular/paunang backup bago magsulat. Nangangailangan pa rin ang mga migration ng umiiral na database ng sarili nitong matibay na snapshot para sa kaligtasan at proteksiyon laban sa malawakang migration.
- **Pagpapanatili ng Data:** Palaging mag-mount ng volume sa `/app/data` upang mapanatili ang iyong database, mga key, at mga configuration sa bawat pag-restart ng container.
- **Configuration ng Port:** I-override ang `PORT` environment variable upang baguhin ang default na port na `20128`.

## Tingnan Din

- [Gabay sa Pag-deploy sa VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Pag-setup ng VM + nginx + Cloudflare
- [Gabay sa Pag-deploy sa Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Mag-deploy sa Fly.io
- [Configuration ng Environment](../reference/ENVIRONMENT.md) — Kumpletong sanggunian ng `.env`
