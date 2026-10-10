# 🐳 Docker Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kumpletong sanggunian para sa pag-deploy gamit ang Docker. Para sa mabilisang pagsisimula, tingnan ang [seksiyong Docker ng README](../README.md#-docker).

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
- [Mga regional error ng Gemini sa loob ng Docker](#gemini-regional-errors-inside-docker)
- [Mahahalagang Tala](#important-notes)

---

## Mabilisang Pagpapatakbo

> **Mag-self-host gamit ang iisang command?** Tingnan ang
> [Gabay sa Self-Hosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (naka-publish na image +
> Redis, loopback-only, walang pagpili ng profile). Ang Mabilisang Pagpapatakbo sa ibaba ay ang
> paraang gumagamit ng iisang container para sa mga user na nagpapatakbo na ng Redis sa ibang lugar.

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

# CLI profile (built-in ang Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Host profile (pangunahing para sa Linux; mina-mount ang mga host CLI binary bilang read-only)
docker compose --profile host up -d

# Web profile (Chromium/Playwright para sa mga web-session provider)
docker compose --profile web up -d

# Pagsamahin ang CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Mga Available na Profile

Kasama sa OmniRoute ang mga Compose profile para sa mga pangunahing anyo ng deployment. Piliin ang naaangkop sa iyong environment.

| Profile          | Service          | Kailan gagamitin                                                                                                                                                                      | Command                                      |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (default) | `omniroute-base` | Headless server / minimal na runtime, walang kasamang provider CLI                                                                                                                    | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Mga agentic workflow na tumatawag sa `omniroute providers/setup/doctor` at mga kasamang CLI (Codex, Claude Code, Droid, OpenClaw)                                                     | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Mga Linux host na nangangailangan ng access na tulad ng `network_mode` sa mga host CLI sa pamamagitan ng pag-mount sa `~/.local/bin`, `~/.codex`, `~/.claude`, atbp. bilang read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Patakbuhin ang [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar sa port `8317` para sa upstream CLI proxying                                                       | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Mga web-session provider na nangangailangan ng browser: `gemini-web`, `claude-web`, `claude-turnstile` (bine-build ang `runner-web`, kasama ang Chromium)                             | `docker compose --profile web up -d`         |

> Maaaring pagsamahin ang maraming profile: `docker compose --profile cli --profile cliproxyapi up -d`.

## Pag-configure ng mga host CLI tool kapag tumatakbo ang OmniRoute sa Docker

Ang `omniroute setup-codex`, `setup-claude`, `config set <tool>`, at ang button na
**I-save ang config** ng dashboard ay nagsusulat ng mga file gaya ng `~/.codex/*.config.toml`. May
kahulugan lamang ang mga path na iyon sa machine kung saan aktuwal na tumatakbo ang CLI. Kapag
pinatakbo ang mga ito sa loob ng container, mapupunta ang isinusulat sa sariling home ng container (`/home/node` —
tumatakbo ang image bilang `USER node`), kung saan hindi ito kailanman babasahin ng anumang host CLI at kung saan
mawawala ito sa sandaling muling likhain ang container.

Nakikita ito ng OmniRoute at tinatanggihan ang pagsusulat habang nagbibigay ng mga tagubilin, sa halip na
mag-ulat ng tagumpay na hindi mo naman magagamit: lalabas ang CLI na may `2`, at tutugon ang API ng `422`
na may `containerEphemeralTarget: true`.

### Inirerekomenda: patakbuhin ang CLI sa host at ang OmniRoute sa Docker

Inihahatid ng container ang API; kino-configure ng CLI ang iyong mga host tool.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ituro ang CLI sa container
omniroute setup-codex                      # isinusulat ang tunay na ~/.codex sa iyong host
```

Ito ang tamang piliin kapag tumatakbo ang Codex, Claude Code, Cursor, o katulad nito sa iyong
laptop — na siyang karaniwang setup.

### Alternatibo: i-bind-mount ang mga host config dir (`host` profile)

Kung gusto mong ang container mismo ang magsulat sa iyong host config, i-mount ang mga
directory at ituro ang `CLI_CONFIG_HOME` sa mount root. Ginagawa na ito ng `host` profile:

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
na ang mga child ay mga mount, na eksaktong katulad ng `/host-home` na ayos sa itaas), habang
patuloy na tinatanggihan ang mga hindi naka-mount.

### Pang-emergency na opsyon: i-configure ang sariling mga CLI ng container (gamitin nang limitado)

Kapag talagang nasa loob ng container ang mga CLI (ang `cli` profile), sinasadya ang pagsusulat.
Ipasa ang `--allow-container-write` sa anumang `setup-*` command, o itakda ang
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para sa server. Magpapatuloy ang pagsusulat
na may babalang hindi ito mananatili kapag muling nilikha ang container.

> **Babala sa seguridad — `cli` profile + `docker.sock` mount.**
> Ibi-bind-mount ng `cli` profile ang `/var/run/docker.sock` upang magawang likhain muli ng
> auto-updater sa loob ng container ang stack gamit ang host daemon
> (sinusuri ng `src/lib/system/autoUpdate.ts` kung naroon ang socket na iyon at nilalampasan ang
> Docker path kapag wala ito). Ang socket na iyon ay **isang host-root trust
> boundary**: anumang makaka-access dito ay maaaring kontrolin ang host Docker daemon bilang
> root — maaari itong gumawa, sumuri, huminto, at mag-alis ng anumang container sa host.
> Mga implikasyon:
>
> 1. **Huwag kailanman ilantad sa network ang port ng `cli` profile.** I-publish
>    ito sa `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — dahil ang `cli` profile na maaabot mula sa LAN ay ginagawang ganap na
>    kompromiso sa host ang anumang RCE sa antas ng dashboard.
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

## Sidecar ng Redis

Umaasa ang OmniRoute sa Redis para suportahan ang distributed rate limiter at nakabahaging cache. Ang serbisyong `redis` ay **palaging nakatukoy** sa `docker-compose.yml` (wala itong profile gate) at sinisimulan kasabay ng alinmang ibang profile.

| Detalye               | Halaga                                     |
| --------------------- | ------------------------------------------ |
| Image                 | `redis:7-alpine`                           |
| Pangalan ng container | `omniroute-redis`                          |
| Panloob na port       | `6379`                                     |
| Host port (override)  | `REDIS_PORT` (default ay `6379`)           |
| Host bind (override)  | `REDIS_BIND_HOST` (default ay `127.0.0.1`) |
| Volume                | `omniroute-redis-data` → `/data`           |
| Healthcheck           | `redis-cli ping` (10s na pagitan)          |

Mga kaugnay na environment variable:

- `REDIS_URL` — connection string na ipinapasok sa app (`redis://redis:6379` bilang default).
- `REDIS_PORT` — host-side na port mapping para sa Redis container.
- `REDIS_BIND_HOST` — host interface kung saan inilalathala ang port. Ang default ay `127.0.0.1`.

> **Bakit loopback ang default:** tumatakbo ang sidecar nang walang `requirepass`, at naaabot
> ito ng mga app container sa pamamagitan ng compose network (`redis:6379`) — ang inilathalang port ay
> para lamang sa host-side tooling (`redis-cli`, isang lokal na `npm run dev`). Ang paglalathala sa
> `0.0.0.0` ay maglalantad ng Redis na walang authentication sa bawat host sa iyong LAN. Kung itatakda mo ang
> `REDIS_BIND_HOST=0.0.0.0`, idagdag din ang `--requirepass` sa `command:` ng serbisyo.

Hindi inirerekomenda ang **pag-disable sa Redis** (bababa ang rate limiter sa in-memory fallback). Kung kinakailangan, alisin/lagyan ng comment ang service block na `redis:` sa `docker-compose.yml` o i-scale ito sa zero:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Para sa isang nakahiwalay na production snapshot na tumatakbo kasabay ng dev, gamitin ang `docker-compose.prod.yml`.

| Detalye                   | Halaga                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| File                      | `docker-compose.prod.yml`                                                                         |
| Default na dashboard port | `PROD_DASHBOARD_PORT=20130` (naka-map sa panloob na `${DASHBOARD_PORT:-20128}`)                   |
| Default na API port       | `PROD_API_PORT=20131`                                                                             |
| Image                     | `omniroute:prod` (binuo mula sa target na `runner-cli`)                                           |
| Redis container           | `omniroute-redis-prod` (`redis:8.6.2`, nakalaang volume na `redis-prod-data`)                     |
| Data volume               | `omniroute-prod-data` (pinangalanan, nananatili sa mga rebuild)                                   |
| Mga healthcheck           | `node healthcheck.mjs` + `redis-cli ping`, na may `depends_on` na nakabatay sa kalusugan ng Redis |

Paano gamitin:

```bash
# Buuin at simulan ang production stack
docker compose -f docker-compose.prod.yml up -d --build

# I-stream ang mga log
docker compose -f docker-compose.prod.yml logs -f

# Ihinto at alisin (panatilihin ang mga volume)
docker compose -f docker-compose.prod.yml down
```

Tumatakbo ang prod stack nang kasabay ng dev compose (magkakaiba ang mga pangalan ng container, port, at volume), kaya maaari kang patuloy na mag-iterate nang lokal habang nananatiling gumagana ang production.

## Mga Stage ng Dockerfile

Naglalaman ang repository ng multi-stage na Dockerfile (`Dockerfile`). May apat na stage na magagamit; piliin ang tamang `target` para sa iyong use case.

| Stage         | Base image            | Layunin                                                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Ini-install ang mga dependency (`npm ci --legacy-peer-deps`) at pinapatakbo ang `npm run build` (Turbopack bilang default — tingnan ang Mga resource sa oras ng pag-build sa ibaba)                                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Production runtime na may standalone output ng Next.js. **Walang kasamang mga provider CLI.**                                                                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Idinaragdag ang `git`, `docker.io`, `docker-compose` at mga global CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Piliin ito para sa mga agentic workflow.**                                                                                                                                                             |
| `runner-web`  | `runner-base`         | Idinaragdag ang Playwright + isang Chromium browser (`--with-deps`) para sa mga web-session provider: `gemini-web`, `claude-web`, `claude-turnstile`. **Piliin ito kapag ginagamit mo ang mga provider na iyon** — mabibigo ang plain image sa oras ng request kung wala ito (tingnan ang tala tungkol sa `-web` sa ilalim ng Mga Release Channel). |

Manu-manong mag-build ng isang partikular na target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Mga resource sa oras ng pag-build

Tatlong build arg ang kumokontrol sa resource na ginagamit ng `builder` stage. Para lamang ang mga ito sa oras ng pag-build —
ang `OMNIROUTE_MEMORY_MB` (sa ibaba) ay hiwalay na runtime knob.

| Build arg                   | Default | Epekto                                                                                                                |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | Nagbu-build ang `0` gamit ang webpack: mas mababang peak memory, ngunit mas mabagal. Pinapagana ng `1` ang Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | V8 heap ceiling (`--max-old-space-size`) para sa inilulunsad na `next build`.                                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Ipinapasa sa `CIRCLE_NODE_TOTAL`; kinukuha ng Next ang `workers = N - 1` para sa pangongolekta ng page-data.          |

Ang `OMNIROUTE_BUILD_WORKERS` ang dapat taasan sa isang malaking builder at ang
dapat paghinalaan kapag namatay ang isang build na may limitadong resource **pagkatapos** ng `✓ Compiled successfully`. Ang bawat
page-data worker ay sarili nitong process, at gayundin ang parent na `next build`;
sa isang live na reproduksiyon sa VPS (issue #7518), nasukat ang peak RSS ng bawat process sa
~4.5 GB anuman ang `NODE_OPTIONS` heap flag (nagko-compile ang Turbopack sa
native/Rust memory sa labas ng V8 heap). Ang default na `2` (→ 1 worker, 2
process sa kabuuan) ay itinakda para sa 16 GB / 4 vCPU GitHub-hosted runner na
ginagamit ng publish pipeline. Sa `8` (→ 7 worker), naubusan ng memory ang runner na iyon at
nabigo ang buildkit sa hakbang na may `ResourceExhausted: ... cannot allocate memory`;
hindi pa rin sapat ang `3` (→ 2 worker) nang direktang masukat ang RSS ng bawat process
sa halip na tantiyahin. Ginagawa ng `tests/unit/docker-build-memory-budget.test.ts`
ang pagkalkula batay sa nasukat na halaga at mabibigo ito kapag lumampas ang alinmang knob
sa kapasidad ng runner.

Nagko-compile ang Turbopack sa native na Rust memory na nasa **labas** ng V8 heap, kaya
hindi ito nililimitahan ng `OMNIROUTE_BUILD_MEMORY_MB`. Sa isang host na may memory ceiling,
isi-SIGKILL ng OOM killer ang build nang walang anumang text ng error — hihinto lamang ito
sa kalagitnaan ng `Creating an optimized production build`, na mukhang pag-hang sa halip
na pagkaubos ng memory. Iyon ang dahilan kung bakit webpack ang default ng `Dockerfile`
(`OMNIROUTE_USE_TURBOPACK=0`), hindi tulad ng `npm run dev` / `npm run build`, kung saan
Turbopack ang default sa code: ang isang simpleng `docker build .` na walang mga build arg (na
pinapatakbo ng Railway at iba pang one-click host) ay hindi dapat tahimik na mamatay sa isang
builder na may limitadong memory. Tahasang ipinapasa na ng mga naka-publish na image ang
`OMNIROUTE_USE_TURBOPACK=0` sa `docker-publish.yml`. Sa isang builder na may maraming RAM,
paganahin ang Turbopack para sa mas mabilis na build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Naka-enable ang `webpackBuildWorker`, kaya nagpapatakbo ang `next build` ng parent **at** worker
process at magkahiwalay na sinusunod ng bawat isa ang `OMNIROUTE_BUILD_MEMORY_MB`. Itakda ang container
ceiling sa higit-kumulang doble ng halagang iyon, hindi isang beses lamang.

Sinukat sa tree na ito (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container ceiling | Resulta                                 |
| --------- | ----------------- | --------------------------------------- |
| Turbopack | 8 GiB / 16 GiB    | Parehong na-OOM-kill, nang tahimik      |
| webpack   | 8 GiB             | Na-SIGKILL ang build worker             |
| webpack   | 12 GiB            | nagtagumpay, umabot sa peak na 11.1 GiB |

### Mga runtime default

Mga default na ini-export ng `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Pag-uugali ng memory sa Docker:

- Itinatakda ng imahe ang `OMNIROUTE_MEMORY_MB=1024` at hinango rito ang `NODE_OPTIONS=--max-old-space-size=1024`.
- Sinisimulan ng standalone launcher ang aktuwal na proseso ng server, binabasa nito ang `OMNIROUTE_MEMORY_MB`, at idinaragdag ang `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Ginagamit ng Node ang huling nauulit na value ng `--max-old-space-size`, kaya kinokontrol ng pagtatakda sa `OMNIROUTE_MEMORY_MB` ang epektibong limitasyon ng Docker heap.
- Dahil palagi itong itinatakda ng imahe, hindi kailanman ginagamit sa Docker ang sariling fallback ng launcher na naka-calibrate ayon sa RAM. Tahasang taasan ito para sa workload (talahanayan sa ibaba). Masyadong maliit pa rin ang `2048` para sa `/v1/responses` ng coding agent.

### Runtime RAM para sa mga coding agent

Ang Docker default na 1 GiB ay minimum para sa dashboard/magaan na chat, hindi sukat para sa production. Ang mahahabang body ng `POST /v1/responses` (daan-daang mensahe, sampu-sampung tool) ay nagpapanatili ng maraming in-memory graph habang nagko-compress. Dalawang nag-o-overlap na request na ~3 MiB / ~750k-token ang nagpa-abort sa V8 sa **12 GiB** na old-space (`FATAL ERROR: Reached heap limit`) at umabot din sa cgroup OOM na 16 GiB. Tingnan ang [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Itakda ang laki ng **cgroup `--memory` nang mas mataas kaysa sa heap** — nasa labas ng V8 ang mga native buffer, SQLite, at mga intermediate ng compression.

| Workload                                       | `OMNIROUTE_MEMORY_MB`     | Container / cgroup            | Mga tala                                                                                                                                          |
| ---------------------------------------------- | ------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, isang magaan na chat                | `1024` (default ng imahe) | ≥2 GiB                        |                                                                                                                                                   |
| Isang coding agent (Claude/Codex/Grok)         | `8192`                    | ≥10 GiB                       | Karaniwang `/v1/responses` na may iisang session                                                                                                  |
| Dalawang sabay na mahabang `/v1/responses`     | `10240`–`12288`           | ≥12–16 GiB                    | Nasukat na pag-abort ng V8 sa ~12 GiB na heap                                                                                                     |
| Tatlo o higit pang sabay na mahahabang context | huwag sa iisang proseso   | isa-isahin / dagdagan ang RAM | Bilang default, 1 in-flight ang tinatanggap na heavyweight request; ang pagtataas nito nang walang sapat na RAM ay muling magdudulot ng pag-abort |

Kapag **hindi nakatakda** ang `OMNIROUTE_MEMORY_MB`, kino-calibrate ng `omniroute serve` sa bare metal ang ~35% ng RAM (nililimitahan sa `[512, 4096]`). Palaging itinatakda ng Docker ang `1024`, kaya hindi kailanman tumatakbo ang calibration na iyon sa opisyal na imahe.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Mga Kritikal na Variable ng Kapaligiran

Bukod sa mga default na nakadokumento sa [ENVIRONMENT.md](../reference/ENVIRONMENT.md), ang mga sumusunod na variable ang pinakamahalaga kapag pinapatakbo sa ilalim ng Docker:

| Variable                      | Layunin                                                                                                                                                                                                                                                                                         | Default                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Nakabahaging lihim para sa WebSocket bridge. **Kinakailangan sa production** — itakda sa isang matibay na random na string.                                                                                                                                                                     | hindi nakatakda (dapat ibigay) |
| `REDIS_URL`                   | String ng koneksyon para sa rate limiter / cache backend                                                                                                                                                                                                                                        | `redis://redis:6379`           |
| `REDIS_PORT`                  | Host-side na port para sa kasamang Redis container                                                                                                                                                                                                                                              | `6379`                         |
| `REDIS_BIND_HOST`             | Host interface kung saan inilalathala ang kasamang Redis port (loopback maliban kung magdaragdag ka ng AUTH)                                                                                                                                                                                    | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Host path na naka-mount sa `cli` profile sa `/workspace/omniroute` para sa mga workflow ng self-update                                                                                                                                                                                          | `.` (kasalukuyang directory)   |
| `OMNIROUTE_MEMORY_MB`         | Pinakamataas na runtime Node heap para sa Docker standalone server; ino-override nito ang default ng image sa itaas. Mga coding agent: `8192`+ (tingnan ang [runtime RAM](#runtime-ram-for-coding-agents)).                                                                                     | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | I-override ang mga inilantad na port para sa dashboard (20128) at API (20129)                                                                                                                                                                                                                   | `20128` / `20129`              |
| `APP_BIND_HOST`               | Host interface kung saan inilalathala ng docker-compose ang mga port ng dashboard/API/live-WS. Kapag `REQUIRE_API_KEY=false` (ang default), inilalantad ng `0.0.0.0` ang anonymous na `/v1` proxy sa LAN — palawakin lamang gamit ang `REQUIRE_API_KEY=true` o kung may reverse proxy sa harap. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Host interface kung saan inilalathala ng docker-compose ang `cliproxyapi` sidecar — naglalaman ang data volume nito ng mga kredensyal ng provider.                                                                                                                                              | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Directory na binabasa at ini-install-an ng runtime plugin scanner. Itakda ito kapag bind-mounted ang mga plugin: sinusunod ng default ang `HOME`, na hindi kailangang i-export ng isang image.                                                                                                  | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | URL subpath kapag inilalathala ang app sa likod ng reverse proxy (hal. `/omniroute`)                                                                                                                                                                                                            | _(walang laman = root)_        |
| `NEXT_PUBLIC_BASE_URL`        | Pampublikong browser origin kasama ang subpath (hal. `https://host/omniroute`)                                                                                                                                                                                                                  | hindi nakatakda                |
| `PROD_DASHBOARD_PORT`         | Host-side na dashboard port para sa `docker-compose.prod.yml`                                                                                                                                                                                                                                   | `20130`                        |
| `CLIPROXYAPI_PORT`            | Host-side na port para sa `cliproxyapi` sidecar                                                                                                                                                                                                                                                 | `8317`                         |

## Reverse Proxy sa isang Subpath (Traefik / nginx)

Ang `basePath` ng Next.js ay kino-compile sa standalone bundle. Itinatala ng OmniRoute ang naka-bake na
value sa isang sentinel file sa app root (isinusulat habang isinasagawa ang `npm run build`; binabasa ng
`scripts/docker/ensure-docker-base-path.mjs`) at inihahambing ito sa
`OMNIROUTE_BASE_PATH` kapag nagsisimula ang container. Kapag magkaiba ang mga ito at ang image ay
binuo para sa domain root, muling isinusulat ng entrypoint ang mga standalone manifest, ang
mga naka-embed na literal ng `basePath`/`assetPrefix` (nagre-render ang Next 16 ng mga URL ng SSR asset mula
lamang sa `assetPrefix` — kinokopya rito ng patcher ang subpath), ang mga naka-bake na
URL ng asset na `/_next/static` (mga client-reference manifest, media import, at na-prerender na
error page), at ang `process.env` shim ng client bago patakbuhin ang `node dev/run-standalone.mjs`.

### Compose build (inirerekomenda)

Itakda ang parehong variable sa `.env`, pagkatapos ay muling mag-build upang magkatugma ang image at runtime:

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

### Paunang binuong root image + runtime subpath

Ang mga naka-publish na image na `diegosouzapw/omniroute:*` ay binuo para sa domain root. Maaari mo pa ring
itakda ang `OMNIROUTE_BASE_PATH` sa runtime; isang beses ipa-patch ng container ang bundle sa startup.
Itugma ito sa kaukulang pampublikong origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

I-configure ang reverse proxy upang ipasa ang **buong** panlabas na path (huwag alisin ang
prefix). Dapat i-route ng Traefik ang `PathPrefix(`/omniroute`)` patungo sa container nang walang
`StripPrefix`, upang matanggap ng Next.js ang `/omniroute/...` at maihatid ang mga asset mula sa
`/omniroute/_next/...`.

Sinusuri ng Docker healthcheck ang magaang `/healthz` lifecycle endpoint na nilagyan
ng aktibong `OMNIROUTE_BASE_PATH` bilang prefix. Nananatiling available ang `/api/monitoring/health` para sa
diagnostics ng tao/dashboard; upang muling ituro rito ang HEALTHCHECK ng container (halimbawa,
para sa mahigpit na pagpapatupad ng health), itakda ang `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ang path na iyon ay isang **malalim** na pagsusuri (DB + buod ng monitoring) — angkop para sa
madalang na `HEALTHCHECK` ng Docker kung pipiliin mong muli itong gamitin, ngunit **hindi** para sa mga interval ng
`livenessProbe` ng Kubernetes.

Para sa mga orchestrator (Kubernetes, Nomad, atbp.):

| Probe           | Mas mainam                                                             | Iwasan                                                           |
| --------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, o TCP sa pangunahing port (`PORT`, default `20128`) | `/api/monitoring/health` bilang liveness                         |
| Readiness       | HTTP `GET /healthz`                                                    | Maiikling timeout na itinuturing na patay ang abalang event loop |
| Deep / blackbox | `/api/monitoring/health`                                               | —                                                                |

Iniuulat ng `/healthz` ang lifecycle ng proseso (`ok` / `starting` / `stopping`). Ang `/livez` ay
para lamang sa pagsusuri kung buhay ang proseso (200 sa tuwing maaaring tumakbo ang handler; hindi ito naghihintay ng
readiness). Parehong tumatakbo ang mga ito sa Node event loop na ginagamit sa pagproseso ng request, kaya
maaaring maantala ang mga ito ng CPU-bound na gawain sa catalog o compression — ang abala ay hindi nangangahulugang patay. Mas mainam ang TCP
liveness kung nagti-timeout ang mga HTTP probe. Kumpletong gabay sa mga probe:
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
`NEXT_PUBLIC_BASE_URL` bilang kanonikal na pampublikong origin para sa mga OAuth callback at nabuong pampublikong
link; gumagamit ang mga authenticated na pagsusulat sa dashboard ng mga same-origin request kasama ang session-bound na proteksyon sa CSRF.
I-enable lamang ang `OMNIROUTE_TRUST_PROXY` para sa mga advanced na deployment kung saan sinasadya mong
kunin ng OmniRoute ang pampublikong origin mula sa mga pinagkakatiwalaang forwarded header sa halip na mula sa tahasang
configuration.

## Cloudflare Quick Tunnel

Kasama sa suporta ng dashboard para sa mga Docker deployment ang isang-click na **Cloudflare Quick Tunnel** sa `Dashboard → Endpoints`. Sa unang pag-enable, ida-download lamang ang `cloudflared` kapag kailangan, magsisimula ng pansamantalang tunnel patungo sa iyong kasalukuyang `/v1` endpoint, at ipapakita ang nabuong `https://*.trycloudflare.com/v1` URL nang direkta sa ibaba ng iyong karaniwang pampublikong URL.

Maaaring ipakita o itago ang mga panel ng endpoint tunnel (Cloudflare, Tailscale, ngrok) mula sa `Settings → Appearance` nang hindi binabago ang aktibong estado ng tunnel.

### Mga Tala tungkol sa Tunnel

- Pansamantala ang mga Quick Tunnel URL at nagbabago pagkatapos ng bawat pag-restart.
- Hindi awtomatikong nire-restore ang mga Quick Tunnel pagkatapos ng pag-restart ng OmniRoute o container. Muling i-enable ang mga ito mula sa dashboard kapag kailangan.
- Kasalukuyang sinusuportahan ng pinamamahalaang pag-install ang Linux, macOS, at Windows sa `x64` / `arm64`.
- Gumagamit ang mga pinamamahalaang Quick Tunnel ng HTTP/2 transport bilang default upang maiwasan ang maiingay na babala tungkol sa QUIC UDP buffer sa mga container environment na limitado ang resource. Itakda ang `CLOUDFLARED_PROTOCOL=quic` o `auto` kung gusto mo ng ibang transport.
- Kasama sa mga Docker image ang mga system CA root at ipinapasa ang mga ito sa pinamamahalaang `cloudflared`, na umiiwas sa mga pagkabigo sa TLS trust kapag nag-bootstrap ang tunnel sa loob ng container.
- Itakda ang `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` kung gusto mong gumamit ang OmniRoute ng umiiral na binary sa halip na mag-download nito.

## Mga Image Tag

| Image                    | Tag      | Laki   | Paglalarawan                                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Pinakamataas na **na-publish** na stable SemVer (hindi ang git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | I-pin ang ganitong uri ng tag para sa GitOps                           |

Multi-platform manifest: native na `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Awtomatikong pinipili ng Docker ang tumutugmang architecture; ipasa ang `--platform linux/amd64` kung kailangan mong pilitin ang AMD64 emulation sa mga ARM host.

### Mga Release Channel

Nagpa-publish ang OmniRoute ng magkakahiwalay na Docker channel para sa mga stable release, aktibong pagsubok sa release branch, at mga development build.

| Channel                         | Pinagmulan                                      | Kakayahang mabago              | Inirerekomendang paggamit                                                                                                                                           |
| ------------------------------- | ----------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Nilagdaan/may bersyong release                  | Hindi nababago                 | Mga production deployment na nagpi-pin ng eksaktong release                                                                                                         |
| `:latest` / `:latest-web`       | Pinakamataas na **na-publish** na stable SemVer | Nababagong stable pointer      | Sinusundan ang mga stable release **pagkatapos** ng isang SemVer publish job — **hindi** sinusubaybayan ang `main` o mga hindi pa nailalabas na `release/v*` commit |
| `:next` / `:next-web`           | Kasalukuyang default na `release/v*` branch     | Nababagong pre-release pointer | Pagsubok sa mga pag-aayos na naisama na sa aktibong release branch ngunit wala pa sa isang stable release                                                           |
| `:main` / `:main-web`           | `main` branch                                   | Nababagong development pointer | Para lamang sa development at integration testing                                                                                                                   |

#### Mga web-session provider: ang mga `-web` image

Ang bawat channel sa itaas ay mayroon ding katumbas na `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), na bina-build mula sa `runner-web` stage — ang parehong image kasama ang Playwright at isang Chromium browser. Ipinapadala ang karaniwang image nang **walang** Chromium; kailangan ito ng `gemini-web`, `claude-web`, at `claude-turnstile`.

Ipinagpapaliban ang pagkabigo at hindi ito nangyayari sa pagsisimula: inililista ng mga provider na iyon ang kanilang mga modelo at ipinapakitang nakakonekta sa dashboard, at ang unang request lamang ang nabibigo nang may

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Kung ginagamit mo ang mga provider na iyon, i-pull ang `-web` tag ng channel na ginagamit mo na — walang ibang magbabago. Sa isang npm/CLI install (walang Docker image), ang katumbas na nawawalang bahagi ay ang browser binary: patakbuhin ang `npx playwright install chromium` sa host.

#### Paggamit sa pre-release channel

Ang channel na `next` ay muling bina-build sa bawat push sa kasalukuyang default na branch na `release/v*` at inilalathala para sa parehong AMD64 at ARM64. Hindi ito maaaring ma-overwrite ng mga mas lumang maintenance branch. Nagbibigay ang channel ng image na maaaring i-pull para sa mga pag-aayos na na-merge na sa aktibong release branch bago gawin ang susunod na stable tag.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para sa Docker Compose, i-override ang image tag na ginagamit ng napiling profile, pagkatapos ay i-pull at muling gawin ang service:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Kaligtasan at pag-rollback

Ang `next` ay isang floating na pre-release channel. Maaari itong magbago sa anumang push sa aktibong release branch at **hindi sinusuportahan para sa paggamit sa production**. I-pin ang image digest habang sinusuri ang isang partikular na build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Bago magsagawa ng pagsubok, i-back up ang data volume ng OmniRoute o ang bind-mounted na data directory. Para mag-rollback, ibalik ang dating ginamit na stable na bersyon o digest at muling gawin ang container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Hindi kailanman maililipat ng isang release-branch build ang `latest`; isang kwalipikadong stable na semantic version lamang ang maaaring mag-promote sa stable pointer. Pinananatili ng mga `next` image ang pagsusuri sa release image at ang gate na humaharang kapag may CRITICAL na kahinaan.

**Ang `latest` ay hindi garantiya ng pagiging napapanahon sa git.** Ang mga na-merge na pag-aayos sa `main` o sa aktibong branch na `release/v*` ay **wala** sa `:latest` hangga't hindi nailalathala ang isang stable na SemVer image at hindi pino-promote ng publish job ang `:latest` (kaparehong digest ng SemVer na iyon). Kung mukhang hindi nagbabago ang `latest` kahit ipinapakita na ng GitHub ang pag-aayos, i-pull ang `:next` upang subukan ang release branch o hintayin ang SemVer tag.

| Ang gusto mo                                                                            | Gamitin                                 |
| --------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / production na hindi dapat lumihis                                              | I-pin ang `:X.Y.Z` (o ang image digest) |
| Subaybayan ang mga nailathalang stable at tanggapin ang muling paggawa sa bawat release | `:latest`                               |
| Subukan ang mga hindi pa nailalathalang commit ng `release/v*`                          | `:next` (hindi para sa production)      |
| Subukan ang `main`                                                                      | `:main` (hindi para sa production)      |

## Availability: iisang replica ang default na SQLite

Ang karaniwang Docker / Kubernetes OmniRoute ay **isang proseso ng Node + isang SQLite writer**. **Hindi sinusuportahan** ang high availability sa topology na iyon.

| Limitasyon                            | Bunga                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Iisang writer                         | **Huwag** magpatakbo ng maraming replica laban sa iisang SQLite file. Masisira nito ang DB.                                                                                                                                                                                                                                                                                    |
| Recreate / restart / HEALTHCHECK kill | **Ganap na pagkaantala** ng mga kasalukuyang SSE, session sa dashboard, at state na nasa memory. Madidiskonekta ang bawat nakakonektang client. Ang mga bagong request habang walang endpoint ay makakatanggap mula sa reverse proxy ng **`502 Bad Gateway: Unknown error`**, hindi ng OmniRoute JSON — hindi ito maibubukod ng mga client sa isang provider failure (#11015). |
| Kaparehong event loop ng `/healthz`   | Maaaring maantala ng abalang catalog o compression tick ang mga probe; maaari namang i-restart ng maikling timeout ang **nag-iisang** replica.                                                                                                                                                                                                                                 |

**Matrix ng probe** (tingnan din ang [mga rekomendasyon sa Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe         | Target                                                     | Huwag gamitin                                                        |
| ------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Liveness      | TCP sa `PORT` (default na `20128`), o soft HTTP `/healthz` | `/api/monitoring/health`                                             |
| Readiness     | HTTP `GET /healthz`                                        | Mahihigpit na timeout na itinuturing na patay ang abalang event loop |
| Deep / humans | `/api/monitoring/health`                                   | Awtomatikong kubelet liveness                                        |

**Mga upgrade:** asahang madidiskonekta ang bawat session. I-drain ang mga client kung kaya; walang rolling update sa default na SQLite. Papalitan din ng Compose `restart: unless-stopped` kasama ang Docker `HEALTHCHECK` ang nag-iisang proseso kapag Unhealthy ang container — pareho ang lawak ng epekto.

Snippet ng Kubernetes para sa **iisang replica** (kinakailangan ang Recreate; huwag taasan ang `replicas` para sa iisang SQLite file):

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

Hinahayaan ng `preStop` sleep ang kube na alisin ang mga Service endpoint bago ang SIGTERM upang huminto ang **bagong** traffic sa pagpunta sa prosesong patigil na. Ang kasalukuyang `/v1/responses` SSE ay dina-drain nang hanggang `SHUTDOWN_TIMEOUT_MS` (default na 30s) sa pamamagitan ng heavyweight admission leases (#11015). Ang mga bagong request na umaabot pa rin sa proseso ay makakatanggap ng `503` + `Retry-After: 5`. Ang puwang na walang endpoint habang isinasagawa ang Recreate hanggang maging Ready ang kapalit ay nananatiling ganap na pagkaantala — likas ito sa SQLite topology, hindi maling configuration ng probe.

Ang external Postgres / multi-writer HA ay **hindi** isang dokumentadong karaniwang paraan. Kung kailangan mo ng HA, manatili sa iisang replica o magpatakbo ng topology na hiwalay na sinubukan at idinokumento ng proyekto. Ang gawain para sa Postgres/MySQL ay nasa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hangga't hindi pa iyon nailalabas, ang tanging sinusuportahang paraan upang paramihin ang kapasidad para sa **malalaking** `/v1/responses` ay N independiyenteng proseso (susunod na seksyon), hindi `replicas > 1` sa iisang volume.

## Scale-out: N independiyenteng proseso

Ang isang proseso ng Node ay **isang V8 heap**. Ang dalawang magkapatong na ~3 MiB / ~750k-token na coding-agent `POST /v1/responses` (RTK + Caveman) ay nagpapa-abort sa heap na iyon sa ~12 Gi (`FATAL ERROR: Reached heap limit`) at maaaring magdulot ng OOM sa isang 16 Gi cgroup. Tingnan ang [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ang sukat na iyon ay isang babala tungkol sa **badyet ng memory**, hindi isang mahigpit na maximum ng produkto na dalawang magkasabay na mahahabang `/v1/responses`. Ang pagtanggap ng heavyweight na chat ay kinokontrol ng awtomatikong hinangong ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) na itinakda ayon sa parehong V8/cgroup ceiling — ang pag-override nito pataas (o pagtatakda ng legacy na `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) sa isang proseso na nakatakda na ang laki ay muling magdudulot ng abort. Ang maliliit na chat, `/healthz`, `/v1/models`, at MCP ay **hindi** kasama sa cap na iyon.

### Isang proseso: higit sa dalawang mahabang `/v1/responses`

Ang isang **malusog** na proseso (heap na mas mababa sa `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default na `0.75`) ay **maaaring** magpatakbo ng higit sa dalawang magkasabay na mahabang `POST /v1/responses` kapag may natitira pang espasyo sa inflight-byte budget ng buong proseso (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Ang mga body na nasa o lampas sa `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default na 256 KiB) ay kumukuha ng parehong heavyweight lease gaya ng mga request na mabigat sa istruktura at gumagamit ng parehong [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Ang sampu-sampung magkasabay na mahahabang SSE client (madalas kailangan ng mga operator ang 40–50) ay isang usapin ng **badyet ng memory** — itakda ang laki ng heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — hindi isang mahigpit na limitasyon ng produkto na “max 2.” Ang heap na nasa ilalim ng pressure ay patuloy na nagbabawas ng load gamit ang retryable na `503` upang hindi na maulit ang #7849.

Upang **paramihin ang mga heap** (independiyenteng V8 old-spaces) **sa kasalukuyan**:

| Gawin                                                                                                                                                                              | Huwag gawin                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Magpatakbo ng **N container/pod**, bawat isa ay may **sarili nitong** `DATA_DIR` / volume                                                                                          | Magtakda ng `replicas > 1` para sa iisang SQLite file              |
| Itakda ang laki ng heavy in-flight + healthy-headroom ayon sa heap / inflight-byte budget; ang 1–2 ay konserbatibong default ng #7849, hindi isang mahigpit na maximum ng produkto | Bigyan ang isang proseso ng 8× RAM at walang limitasyong count cap |
| Opsyonal: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para sa **mga nakabahaging quota counter**                                                                          | Ituring ang Redis bilang nakabahaging SQLite — hindi ito ganoon    |
| Kopyahin ang mga provider secret sa bawat instance (o tanggapin ang magkakahiwalay na dashboard)                                                                                   | Asahan ang iisang dashboard / iisang call-log sa lahat ng instance |
| Ilagay sa harap ang anumang load balancer; sapat na ang sticky routing ayon sa API key o session                                                                                   | Mangailangan ng vendor-specific na size-aware middleware           |

Hardware: ang bilang ng magkakasabay na mahabang `/v1/responses` sa bawat instance ay isang usapin ng **badyet ng memory** (heap + inflight-byte / #10110). Ang `N` independiyenteng `DATA_DIR` ay nagpaparami pa rin ng mga heap: kailangang kayanin ng RAM ng host ang `N × cgroup`, hindi “isang 16 Gi pod na may N=8.” Huwag kailanman gumamit ng `replicas > 1` sa iisang SQLite file.

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

Ang in-process density (compression sa labas ng HTTP isolate) ay nasa [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ang isang lohikal na cluster sa nakabahaging durable state ay nasa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Mga panrehiyong error ng Gemini sa loob ng Docker

Maaaring magbalik ang Google AI Studio / Gemini API ng HTTP 400 na may FAILED_PRECONDITION at
`User location is not supported for the API use.` Ang matagumpay na request sa host
ay hindi nagpapatunay na ginagamit ng container ang parehong outbound route. Maaaring magkaiba ang
pagkakasunod-sunod ng DNS, konektibidad ng IPv4/IPv6, VPN routing, at mga naka-configure na proxy. Tingnan ang
[mga sinusuportahang rehiyon ng Google](https://ai.google.dev/gemini-api/docs/available-regions)
pati na rin ang aktuwal na ruta ng koneksyon; hindi matutukoy ng error na ito lamang kung hindi wasto ang API key.

### Mas piliin ang proxy na partikular sa koneksyon

Gamitin ang [per-connection proxy configuration](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ng OmniRoute para sa apektadong koneksyon ng Gemini, pagkatapos ay ulitin ang **Test Connection** at isang maliit na request
gamit ang parehong model. Sa ganitong paraan, mananatiling limitado sa koneksyong iyon ang pagbabago sa routing. Tiyaking
naaabot ang proxy mula sa container, at talagang pinipili ito ng koneksyon.
Hindi ginagarantiya ng pagpapalit ng ruta ang panrehiyong pagiging kuwalipikado sa upstream.

### Paghambingin ang networking ng host at container

Panatilihing magkapareho ang key, model, at request kapag naghahambing ng mga authenticated na resulta; huwag kailanman
mag-paste ng mga credential, password ng proxy, o kumpletong authorization header sa isang issue.
Suriin muna kung aling mga address family ang iniaalok ng OS resolver, gamit ang parehong command
sa host at sa loob ng container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Palitan ang `omniroute` ng service na pinapatakbo mo (halimbawa, `omniroute-web`). Ini-print ng mga
command na ito ang mga address family nang walang mga credential o IP address. Ang ibinalik na `6`
ay nagpapakita lamang ng resulta ng IPv6 DNS: **hindi** nito pinatutunayan na may nagagamit na IPv6 route o access sa API.
Kung naka-install ang `curl`, paghambingin ang `curl -4 -I https://generativelanguage.googleapis.com`
at `curl -6 -I https://generativelanguage.googleapis.com` sa parehong environment.
Pinatutunayan ng isang HTTP response ang konektibidad para sa probe na iyon, kahit isa itong unauthenticated na
error; ang authenticated na model request lamang ang sumusubok sa pagiging kuwalipikado para sa Gemini.

### Alternatibo sa antas ng host: gumaganang IPv6 at patakaran ng resolver

Naibalik ng nag-ulat ng [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ang
access sa kanilang environment sa pamamagitan ng pag-enable sa IPv6 ng container at pagbabago sa pagpili ng address
ng glibc. Ituring ito bilang alternatibong partikular sa environment. Kumpirmahin ang gumaganang IPv6 ng host,
egress/routing ng container, at mga panuntunan ng firewall bago isaayos ang mga kagustuhan ng resolver.
Ang isang pribadong ULA address lamang ay hindi nagpapatunay ng pampublikong konektibidad ng IPv6.

Para sa mga service na nakakabit na sa default network ng Compose, ine-enable ng fragment na ito ang
IPv6 sa network na iyon; panatilihin ang natitirang bahagi ng iyong service, mga port, volume, at configuration:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para sa isang pinangalanang network, i-enable ito sa network na aktuwal na sinasalihan ng service. Maaaring
maglaan ang Docker ng ULA subnet; pumili lamang ng tahasan at hindi nagsasapawang subnet kapag kinakailangan ito
ng iyong network. Tingnan ang [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
at [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Sa isang **image na nakabatay sa glibc**, maaaring baguhin ng `/etc/gai.conf` ang pagpili ng address. Gumagamit ng
Debian ang kasalukuyang Dockerfile ng repository; hindi ginagamit ng mga custom na image na nakabatay sa musl ang mekanismong ito.
Binabago ng naiulat na pagsasaayos ang ULA label mula `label fc00::/7 6` patungo sa
`label fc00::/7 1`. Magsimula sa kumpletong policy table ng image at panatilihin ang iba pa nitong
mga entry: pinapalitan ng pagdaragdag ng isang `label` o `precedence` entry ang default na table na iyon, kaya hindi sapat ang isang file
na naglalaman lamang ng binagong linya. Inilalarawan ng
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ang mga semantikang iyon. I-bind-mount ang nasuring file bilang read-only sa `/etc/gai.conf`
at muling likhain ang service upang ilapat ito.

Binabago nito ang pagpili ng address ng OS para sa **lahat ng outbound traffic sa container na iyon**.
Hindi nito pinipilit ang bawat application na piliin ang IPv6: mahalaga rin ang pagkakasunod-sunod ng DNS at pagpili ng
koneksyon ng Node. Sa partikular, binibigyang-priyoridad ng `--dns-result-order=ipv4first` ang IPv4 at
hindi ito solusyon para sa isang failure na nangyayari lamang sa IPv4. Tingnan ang [Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Subukang muli ang Gemini at ang iba mo pang provider pagkatapos ng anumang pagbabago sa antas ng host. Upang mag-roll back,
alisin ang custom na `gai.conf` mount, ibalik ang nakaraang network configuration, at
muling likhain ang apektadong service/network sa panahon ng maintenance window. Ang muling paglikha ng network
ay maaaring makaantala sa ibang mga container na nakakabit dito; huwag burahin ang persistent data volume.

## Mahahalagang Tala

- **SQLite WAL Mode:** Dapat hayaang matapos ang `docker stop` upang mai-checkpoint ng OmniRoute ang mga pinakabagong pagbabago pabalik sa `storage.sqlite`. Nakatakda na sa mga kasamang Compose file ang 40 segundong palugit sa paghinto. Kung direkta mong pinapatakbo ang image, panatilihin ang `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Itakda sa `true` kung ang mga regular/bago-magsulat na backup ay pinamamahalaan sa labas. Nangangailangan pa rin ang mga migration ng kasalukuyang database ng sarili nitong matibay na safety snapshot at proteksiyon laban sa maramihang migration.
- **Pagpapanatili ng Data:** Palaging mag-mount ng volume sa `/app/data` upang mapanatili ang iyong database, mga key, at mga configuration sa mga pag-restart ng container.
- **Configuration ng Port:** I-override ang `PORT` environment variable upang baguhin ang default na port na `20128`.

## Tingnan Din

- [Gabay sa Pag-deploy sa VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Pag-setup ng VM + nginx + Cloudflare
- [Gabay sa Pag-deploy sa Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Mag-deploy sa Fly.io
- [Configuration ng Environment](../reference/ENVIRONMENT.md) — Kumpletong sanggunian ng `.env`
