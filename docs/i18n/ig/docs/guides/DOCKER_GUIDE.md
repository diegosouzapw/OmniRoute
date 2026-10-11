# 🐳 Docker Guide — OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Ntụaka zuru ezu maka ibunye Docker. Maka ịmalite ngwa ngwa, lee [ngalaba Docker dị na README](../README.md#-docker).

## Ndepụta Ọdịnaya

- [Ịgba Ọsọ Ngwa Ngwa](#quick-run)
- [Iji Faịlụ Environment](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profaịlụ Ndị Dị](#available-profiles)
- [Ịhazi ngwa CLI nke host mgbe OmniRoute na-agba n'ime Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose Maka Production](#production-compose)
- [Ọkwa Dockerfile](#dockerfile-stages)
- [Environment Variables Ndị Dị Mkpa](#critical-environment-variables)
- [Docker Compose na Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tags](#image-tags)
- [Nnweta: SQLite ndabara bụ otu replica](#availability-default-sqlite-is-single-replica)
- [Njehie mpaghara Gemini n'ime Docker](#gemini-regional-errors-inside-docker)
- [Ihe Ndị Dị Mkpa Ịmara](#important-notes)

---

## Ịgba Ọsọ Ngwa Ngwa

> **Ịchọrọ iji otu iwu mee self-host?** Lee
> [Ntuziaka Self-Host](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image e bipụtara +
> Redis, naanị loopback, enweghị ịhọrọ profaịlụ). Ịgba Ọsọ Ngwa Ngwa dị n'okpuru bụ
> ụzọ otu container maka ndị ọrụ na-agba Redis ebe ọzọ ugbua.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Iji Faịlụ Environment

```bash
# Buru ụzọ detuo ma dezie .env
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
# Profaịlụ ntọala (enweghị ngwa CLI)
docker compose --profile base up -d

# Profaịlụ CLI (Claude Code, Codex, OpenClaw arụnyere n'ime ya)
docker compose --profile cli up -d

# Profaịlụ host (Linux ka e bu ụzọ kwado; ọ na-mount binaries CLI nke host dị ka read-only)
docker compose --profile host up -d

# Profaịlụ web (Chromium/Playwright maka ndị na-eweta web-session)
docker compose --profile web up -d

# Jikọta CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Profaịlụ Ndị Dị

OmniRoute na-abịa na profaịlụ Compose maka ụdị nkenye ndị bụ isi. Họrọ nke dabara na gburugburu gị.

| Profaịlụ         | Service          | Mgbe a ga-eji ya                                                                                                                                  | Iwu                                          |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ndabara) | `omniroute-base` | Sava na-enweghị UI / runtime kacha nta, enweghị CLI nke provider etinyere n'ime ya                                                                | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Usoro ọrụ agentic ndị na-akpọ `omniroute providers/setup/doctor` na CLI ndị etinyere n'ime ya (Codex, Claude Code, Droid, OpenClaw)               | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Host Linux ndị chọrọ ohere yiri `network_mode` iji ruo CLI nke host site na ị-mount `~/.local/bin`, `~/.codex`, `~/.claude`, wdg. dị ka read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Gbaa [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar na port `8317` maka proxying CLI upstream                                | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Ndị na-eweta web-session chọrọ browser: `gemini-web`, `claude-web`, `claude-turnstile` (na-build `runner-web`, Chromium so na ya)                 | `docker compose --profile web up -d`         |

> Enwere ike ijikọta ọtụtụ profaịlụ: `docker compose --profile cli --profile cliproxyapi up -d`.

## Ịhazigharị ngwa CLI nke host mgbe OmniRoute na-agba n'ime Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` na bọtịnụ
**Chekwaa nhazi** nke dashboard na-ede faịlụ dịka `~/.codex/*.config.toml`. Ụzọ ndị ahụ
nwere ihe ha pụtara naanị na kọmputa ebe CLI ahụ na-agba n'ezie. Ọ bụrụ na ị gbaa ha n'ime
container ahụ, ihe e dere ga-abanye na home nke container ahụ (`/home/node` —
image ahụ na-agba `USER node`), ebe CLI ọ bụla dị na host na-agaghị agụ ya ma ebe a
ga-ehichapụ ya ozugbo e megharịrị container ahụ.

OmniRoute na-achọpụta nke a ma jụ ide ahụ, na-enye ntuziaka kama
ịkọ na ihe gara nke ọma nke ị na-enweghị ike iji: CLI na-apụ na koodu `2`, API na-azaghachi `422`
yana `containerEphemeralTarget: true`.

### A tụrụ aro: gbaa CLI na host, gbaa OmniRoute n'ime Docker

Container ahụ na-enye API; CLI na-ahazi ngwa ndị dị na host gị.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # mee ka CLI jikọọ na container ahụ
omniroute setup-codex                      # na-ede ezigbo ~/.codex na host gị
```

Nke a bụ nhọrọ ziri ezi mgbe Codex, Claude Code, Cursor ma ọ bụ ngwa yiri ha na-agba na
laptọọpụ gị — nke bụ nhazi a na-ahụkarị.

### Nhọrọ ọzọ: jiri bind mount jikọta dirs nhazi host (`host` profile)

Ọ bụrụ na ịchọrọ ka container ahụ n'onwe ya dee nhazi host gị, tinye
directories ndị ahụ site na mount ma mee ka `CLI_CONFIG_HOME` rụtụ aka na mgbọrọgwụ mount ahụ. `host` profile
emeela nke a:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount bụ ihe na-eme ka a nwee ntụkwasị obi n'ụzọ ahụ: OmniRoute na-agụ
`/proc/self/mountinfo` ma na-ekwe ka e dee n'ụzọ ndị e tinyere site na mount (yana directories
nke ụmụ ha bụ mounts, nke bụ kpọmkwem ụdị `/host-home` dị n'elu), ebe ọ ka
na-ajụ ndị a na-etinyeghị site na mount.

### Ụzọ mgbapụ: hazie CLI nke container ahụ n'onwe ya (jiri ya naanị mgbe ọ dị mkpa)

Mgbe CLI ndị ahụ nọ n'ime container n'ezie (`cli` profile), ide ahụ
bụ nke e bu n'obi. Nyefee `--allow-container-write` nye iwu `setup-*` ọ bụla, ma ọ bụ tọọ
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` maka server ahụ. Ide ahụ ga-aga n'ihu
yana ịdọ aka ná ntị na ọ gaghị adịgide mgbe container ahụ kwụsịrị ịdị.

> **Ịdọ aka ná ntị gbasara nchekwa — `cli` profile + mount `docker.sock`.**
> `cli` profile na-eji bind mount tinye `/var/run/docker.sock` ka auto-updater dị n'ime container
> nwee ike iji daemon nke host megharịa stack ahụ
> (`src/lib/system/autoUpdate.ts` na-enyocha socket ahụ ma na-awụli
> ụzọ Docker mgbe ọ na-anọghị). Socket ahụ bụ **oke ntụkwasị obi nke host-root**:
> ihe ọ bụla nwere ike iru ya na-achịkwa Docker daemon nke host dịka
> root — ọ nwere ike ịmepụta, nyochaa, kwụsị ma wepụ container ọ bụla dị na host.
> Ihe nke a pụtara:
>
> 1. **Ekwela ka port nke `cli` profile pụta na network.** Bipụta
>    ya na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — `cli` profile LAN nwere ike iru na-eme ka RCE ọ bụla n'ọkwa dashboard ghọọ
>    mwakpo zuru ezu megide host.
> 2. **Ejila bind tinye directory host ndị ọzọ n'ime `cli` profile.**
>    Docker socket tinyere mount ọzọ ọ bụla na-enye container ikike zuru ezu
>    ịgụ/ide filesystem na nhazi host gị. Ọ bụrụ na ịchọrọ ka ngwa hụ
>    project, jiri binary CLI gbaa ya na kọmputa gị — etinyela ya site na mount
>    n'ime `cli` container.
>
> Ọ bụrụ na ịchọghị auto-update dị n'ime container, agbanyela `cli` profile
> (`COMPOSE_PROFILES=core,redis` ma ọ bụ nke dị mkpụmkpụ). Profile ndị ọzọ anaghị
> etinye Docker socket site na mount.
>
> Hụ `docs/security/MITM-TPROXY-DECRYPT.md` (git; etinyeghị ya n'ime `/docs`) maka threat model metụtara
> MITM, yana `docs/security/SUPPLY_CHAIN.md` maka
> usoro provenance binary nke `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute na-adabere na Redis iji kwado ihe na-amachi ọnụego nke kesara ekesa na cache nkekọrịta. A na-akọwa ọrụ `redis` **mgbe niile** na `docker-compose.yml` (ọ nweghị mgbochi profaịlụ), ọ na-amalitekwa ya na profaịlụ ọ bụla ọzọ.

| Nkọwa                | Uru                                           |
| -------------------- | --------------------------------------------- |
| Image                | `redis:7-alpine`                              |
| Aha container        | `omniroute-redis`                             |
| Port dị n'ime        | `6379`                                        |
| Port host (mgbanwe)  | `REDIS_PORT` (ndabara ya bụ `6379`)           |
| Njikọ host (mgbanwe) | `REDIS_BIND_HOST` (ndabara ya bụ `127.0.0.1`) |
| Volume               | `omniroute-redis-data` → `/data`              |
| Nlele ahụike         | `redis-cli ping` (oge etiti 10s)              |

Environment variables ndị metụtara ya:

- `REDIS_URL` — eriri njikọ a na-etinye n'ime ngwa ahụ (`redis://redis:6379` na ndabara).
- `REDIS_PORT` — nhazi port n'akụkụ host maka container Redis.
- `REDIS_BIND_HOST` — interface host ebe a na-ebipụta port ahụ. Ndabara ya bụ `127.0.0.1`.

> **Ihe mere loopback ji bụrụ ndabara:** sidecar ahụ na-arụ ọrụ na-enweghị `requirepass`, container
> ngwa ndị ahụ na-esikwa na netwọkụ compose (`redis:6379`) rute ya — port e bipụtara dị
> naanị maka ngwaọrụ ndị dị n'akụkụ host (`redis-cli`, `npm run dev` mpaghara). Ibipụta ya na
> `0.0.0.0` ga-eme ka Redis na-enweghị nkwenye njirimara pụta ìhè nye host ọ bụla na LAN gị. Ọ bụrụ na ịtọ
> `REDIS_BIND_HOST=0.0.0.0`, tinyekwa `--requirepass` na `command:` nke ọrụ ahụ.

A naghị atụ aro **ịgbanyụ Redis** (ihe na-amachi ọnụego ga-alaghachi n'ọrụ nchekwa dị n'ime ebe nchekwa nke na-adịghị ike). Ọ bụrụ na ị ga-emerịrị ya, wepụ/tinye akara comment na ngọngọ ọrụ `redis:` dị na `docker-compose.yml`, ma ọ bụ belata nha ya ruo efu:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Maka snapshot production e kewapụrụ iche nke na-arụ ọrụ n'akụkụ dev, jiri `docker-compose.prod.yml`.

| Nkọwa                  | Uru                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------- |
| Faịlụ                  | `docker-compose.prod.yml`                                                          |
| Port dashboard ndabara | `PROD_DASHBOARD_PORT=20130` (e jikọtara ya na `${DASHBOARD_PORT:-20128}` dị n'ime) |
| Port API ndabara       | `PROD_API_PORT=20131`                                                              |
| Image                  | `omniroute:prod` (e wuru site na ebumnuche `runner-cli`)                           |
| Container Redis        | `omniroute-redis-prod` (`redis:8.6.2`, volume `redis-prod-data` pụrụ iche)         |
| Volume data            | `omniroute-prod-data` (nwere aha, na-adịgide n'agbanyeghị nrụgharị)                |
| Nlele ahụike           | `node healthcheck.mjs` + `redis-cli ping`, ebe `depends_on` dabere na ahụike Redis |

Otu esi eji ya:

```bash
# Wuo ma malite stack production
docker compose -f docker-compose.prod.yml up -d --build

# Gosipụta logs ka ha na-abata
docker compose -f docker-compose.prod.yml logs -f

# Kwatuo ya (debe volumes)
docker compose -f docker-compose.prod.yml down
```

Stack prod na-arụ ọrụ n'otu oge na compose dev (aha container, port, na volume ha dị iche), ya mere ị nwere ike ịga n'ihu na mmepe mpaghara mgbe production ka na-arụ ọrụ.

## Ọkwa Dockerfile

Ebe nchekwa a nwere Dockerfile nwere ọtụtụ ọkwa (`Dockerfile`). E mere ka ọkwa anọ dị; họrọ `target` kwesịrị ekwesị maka ojiji gị.

| Ọkwa          | Ihe oyiyi ntọala      | Ebumnuche                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Na-etinye ndabere (`npm ci --legacy-peer-deps`) ma na-agba `npm run build` (Turbopack na ndabara — lee Akụrụngwa oge mwube n'okpuru)                                                                                                                                                                           |
| `runner-base` | `node:26-trixie-slim` | Gbaa n'oge mmepụta site na nsonaazụ standalone nke Next.js. **Enweghị CLI ndị na-eweta ọrụ agbakwunyere.**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Na-agbakwunye `git`, `docker.io`, `docker-compose` na CLI zuru ụwa ọnụ: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Họrọ nke a maka usoro ọrụ ndị agent na-arụ.**                                                                                                                     |
| `runner-web`  | `runner-base`         | Na-agbakwunye Playwright + ihe nchọgharị Chromium (`--with-deps`) maka ndị na-eweta nnọkọ webụ: `gemini-web`, `claude-web`, `claude-turnstile`. **Họrọ nke a mgbe ị na-eji ndị na-eweta ọrụ ndị ahụ** — ihe oyiyi nkịtị ga-ada n'oge arịrịọ ma ọ bụrụ na nke a adịghị (lee ndetu `-web` n'okpuru Ọwa Mwepụta). |

Jiri aka wuo target a kapịrị ọnụ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Akụrụngwa oge mwube

Arg mwube atọ na-achịkwa ihe ọkwa `builder` na-eri. Ha bụ naanị maka oge mwube —
`OMNIROUTE_MEMORY_MB` (n'okpuru) bụ ntọala dị iche maka oge ịgba ọsọ.

| Arg mwube                   | Ndabara | Mmetụta                                                                                                    |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` na-eji webpack arụ mwube: ojiji ebe nchekwa kacha elu dị ala, mana ọ dị nwayọ. `1` na-ahọrọ Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Oke heap V8 (`--max-old-space-size`) maka `next build` e bidoro.                                           |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Na-enye `CIRCLE_NODE_TOTAL`; Next na-ewepụta `workers = N - 1` maka nchịkọta data peeji.                   |

`OMNIROUTE_BUILD_WORKERS` bụ nke ị ga-abawanye na builder buru ibu, ma bụrụkwa
nke ị ga-enyo enyo mgbe mwube nwere oke akụrụngwa nwụrụ **mgbe** `✓ Compiled successfully` gasịrị. Worker
data peeji ọ bụla bụ process nke ya, parent `next build` n'onwe ya bụkwa process;
nnwale e mere ozugbo na VPS (issue #7518) tụrụ RSS kacha elu nke process ọ bụla dịka
~4.5 GB n'agbanyeghị ọkọlọtọ heap `NODE_OPTIONS` (Turbopack na-achịkọta koodu n'ime
ebe nchekwa native/Rust dị n'èzí heap V8). A haziri ndabara `2` (→ worker 1, process 2
n'ozuzu) maka GitHub-hosted runners nwere 16 GB / 4 vCPU nke pipeline mbipụta
na-eji. Na `8` (→ worker 7), ebe nchekwa runner ahụ gwụrụ, buildkit wee jiri
`ResourceExhausted: ... cannot allocate memory` kwụsị nzọụkwụ ahụ;
`3` (→ worker 2) ka dabaghị mgbe a tụrụ RSS nke process ọ bụla
ozugbo kama ịkọpụta ya site na atụmatụ. `tests/unit/docker-build-memory-budget.test.ts`
na-eme mgbakọ ahụ site na ọnụọgụ a tụrụ ma daa ma ọ bụrụ na nke ọ bụla n'ime ntọala abụọ ahụ
gafee ikike runner ahụ.

Turbopack na-achịkọta koodu n'ime ebe nchekwa Rust native nke dị **n'èzí** heap V8, ya mere
`OMNIROUTE_BUILD_MEMORY_MB` anaghị akpa ya oke. N'elu host nwere oke ebe nchekwa,
OOM killer ga-eji SIGKILL kwụsị mwube ahụ n'enweghị ozi njehie ọ bụla — ọ na-akwụsị
naanị n'etiti `Creating an optimized production build`, nke na-adị ka ọ kwụsịrị ịga n'ihu
kama ịbụ na ebe nchekwa agwụla. Ọ bụ ya mere `Dockerfile` ji eji webpack na ndabara
(`OMNIROUTE_USE_TURBOPACK=0`), n'adịghị ka `npm run dev` / `npm run build`, ebe
Turbopack bụ ndabara nke koodu: `docker build .` nkịtị na-enweghị arg mwube (nke
Railway na host ndị ọzọ a na-eji otu ọpịpị arụ na-agba) agaghị anwụ nwayọọ n'enweghị ozi n'elu
builder nwere oke ebe nchekwa. Ihe oyiyi ndị e bipụtarala na-enyefe `OMNIROUTE_USE_TURBOPACK=0`
n'ụzọ doro anya n'ime `docker-publish.yml`. N'elu builder nwere RAM zuru ezu, họrọ
Turbopack maka mwube dị ọsọ karịa:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Agbanyere `webpackBuildWorker`, ya mere `next build` na-agba parent **na** process worker,
ma nke ọ bụla na-asọpụrụ `OMNIROUTE_BUILD_MEMORY_MB` iche iche. Tọọ oke container
ka ọ dị ihe dịka okpukpu abụọ nke uru ahụ ma ọ bụ karịa, ọ bụghị naanị otu ugboro.

Ihe a tụrụ n'osisi a (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Oke container  | Nsonaazụ                                    |
| --------- | -------------- | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | OOM gburu ya na ha abụọ, n'enweghị ozi      |
| webpack   | 8 GiB          | SIGKILL gburu worker mwube ahụ              |
| webpack   | 12 GiB         | gara nke ọma, ruru 11.1 GiB n'ogo kacha elu |

### Ndabara oge ịgba ọsọ

Ndabara ndị `runner-base` na-ebupụ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Omume ebe nchekwa n'ime Docker:

- Image ahụ na-etinye `OMNIROUTE_MEMORY_MB=1024` ma na-esi na ya nweta `NODE_OPTIONS=--max-old-space-size=1024`.
- Standalone launcher na-ebido usoro server ahụ n’ezie; ọ na-agụ `OMNIROUTE_MEMORY_MB` ma tinye `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` na njedebe.
- Node na-eji uru ikpeazụ n’ime uru `--max-old-space-size` e nyere ugboro ugboro, ya mere ịtọ `OMNIROUTE_MEMORY_MB` na-achịkwa oke heap Docker nke na-arụ ọrụ n’ezie.
- Ebe ọ bụ na image ahụ na-etinye ya mgbe niile, fallback nke launcher n’onwe ya nke a haziri dabere na RAM anaghị arụ ọrụ n’okpuru Docker. Welie ya kpọmkwem dịka workload si dị (lee tebụl dị n’okpuru). `2048` ka pere mpe maka coding-agent `/v1/responses`.

### RAM runtime maka coding agents

Docker default nke 1 GiB bụ naanị opekempe maka dashboard/light-chat, ọ bụghị nha kwesịrị ekwesị maka production. Body ogologo nke `POST /v1/responses` (ọtụtụ narị ozi, ọtụtụ iri tools) na-edobe ọtụtụ graph n’ime memory n’oge compression. Request abụọ na-eme n’otu oge, nke ọ bụla ruru ihe dịka ~3 MiB / ~750k-token, emewo ka V8 kwụsị na old-space nke **12 GiB** (`FATAL ERROR: Reached heap limit`) ma kpatakwa cgroup OOM nke 16 GiB. Lee [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tọọ nha **cgroup `--memory` ka ọ dị elu karịa heap** — native buffers, SQLite, na compression intermediates na-anọ n’èzí V8.

| Workload                                         | `OMNIROUTE_MEMORY_MB`  | Container / cgroup         | Nkọwa                                                                                              |
| ------------------------------------------------ | ---------------------- | -------------------------- | -------------------------------------------------------------------------------------------------- |
| Dashboard, otu light chat                        | `1024` (image default) | ≥2 GiB                     |                                                                                                    |
| Otu coding agent (Claude/Codex/Grok)             | `8192`                 | ≥10 GiB                    | `/v1/responses` nke otu session a na-ahụkarị                                                       |
| `/v1/responses` ogologo abụọ na-eme n’otu oge    | `10240`–`12288`        | ≥12–16 GiB                 | A tụrụ nkwụsị V8 na heap ruru ihe dịka ~12 GiB                                                     |
| Long contexts atọ ma ọ bụ karịa na-eme n’otu oge | emela ya n’otu process | mee ha n’usoro / RAM karịa | Heavyweight admission default bụ 1 in-flight; iweli ya n’enweghị RAM na-eme ka nkwụsị ahụ laghachi |

`omniroute serve` na bare metal na-ahazi ihe dịka 35% nke RAM (n’ime oke `[512, 4096]`) mgbe **atọpụtaghị** `OMNIROUTE_MEMORY_MB`. Docker na-etinye `1024` mgbe niile, ya mere nhazi ahụ anaghị arụ ọrụ na official image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Mgbanwe Gburugburuu Dị Oke Mkpa

E wezụga ndabara ndị e depụtara na [ENVIRONMENT.md](../reference/ENVIRONMENT.md), mgbanwe ndị a kacha mkpa mgbe a na-agba ya n'okpuru Docker:

| Mgbanwe                       | Ebumnuche                                                                                                                                                                                                                                                                | Ndabara                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Nzuzo a na-ekekọrịta maka njikọ WebSocket. **A chọrọ ya na mmepụta** — tọọ ya ka ọ bụrụ eriri mkpụrụedemede siri ike e mepụtara na-enweghị usoro.                                                                                                                        | edobeghị (a ga-enyerịrị ya) |
| `REDIS_URL`                   | Eriri njikọ maka ihe mmachi ọsọ / nchekwa nwa oge                                                                                                                                                                                                                        | `redis://redis:6379`        |
| `REDIS_PORT`                  | Ọdụ ụgbọ mmiri dị n'akụkụ host maka konteenà Redis e tinyere                                                                                                                                                                                                             | `6379`                      |
| `REDIS_BIND_HOST`             | Interface host ebe a na-ebipụta ọdụ ụgbọ mmiri Redis e tinyere (loopback belụsọ ma ị gbakwunye AUTH)                                                                                                                                                                     | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ụzọ host a na-etinye n'ime profaịlụ `cli` na `/workspace/omniroute` maka usoro ọrụ mmelite-onwe                                                                                                                                                                          | `.` (direktori dị ugbu a)   |
| `OMNIROUTE_MEMORY_MB`         | Oke heap Node n'oge ọrụ maka sava Docker kwụụrụ onwe ya; ọ na-anọchi ndabara image dị n'elu. Ndị nnọchi anya ide koodu: `8192`+ (lee [RAM n'oge ọrụ](#runtime-ram-for-coding-agents)).                                                                                   | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Dochie ọdụ ụgbọ mmiri ndị ekpughere maka dashboard (20128) na API (20129)                                                                                                                                                                                                | `20128` / `20129`           |
| `APP_BIND_HOST`               | Interface host ebe docker-compose na-ebipụta ọdụ ụgbọ mmiri dashboard/API/live-WS. Mgbe `REQUIRE_API_KEY=false` (ndabara), `0.0.0.0` na-ekpughe proxy `/v1` na-enweghị njirimara nye LAN — gbasaa ya naanị mgbe `REQUIRE_API_KEY=true` ma ọ bụ nwee reverse proxy n'ihu. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Interface host ebe docker-compose na-ebipụta sidecar `cliproxyapi` — volume data ya na-ejide ozi nzere nke ndị na-eweta ọrụ.                                                                                                                                             | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Direktori nke ihe nyocha plugin n'oge ọrụ na-agụ ma na-etinye plugin n'ime ya. Tọọ ya mgbe ejiri bind mount tinye plugin: ndabara na-eso `HOME`, nke image nwere ike ọ gaghị ebupụ.                                                                                      | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | Ụzọ nta URL mgbe e bipụtara ngwa ahụ n'azụ reverse proxy (dịka `/omniroute`)                                                                                                                                                                                             | _(efu = mgbọrọgwụ)_         |
| `NEXT_PUBLIC_BASE_URL`        | Ebe mmalite ọha nke ihe nchọgharị, gụnyere ụzọ nta ahụ (dịka `https://host/omniroute`)                                                                                                                                                                                   | edobeghị                    |
| `PROD_DASHBOARD_PORT`         | Ọdụ ụgbọ mmiri dashboard dị n'akụkụ host maka `docker-compose.prod.yml`                                                                                                                                                                                                  | `20130`                     |
| `CLIPROXYAPI_PORT`            | Ọdụ ụgbọ mmiri dị n'akụkụ host maka sidecar `cliproxyapi`                                                                                                                                                                                                                | `8317`                      |

## Reverse Proxy n’ụzọ nta (Traefik / nginx)

A na-etinye `basePath` nke Next.js n’ime standalone bundle mgbe a na-akpụ ya. OmniRoute na-edekọ uru e tinyere
n’ime faịlụ sentinel dị na mgbọrọgwụ ngwa ahụ (a na-ede ya n’oge `npm run build`; `scripts/docker/ensure-docker-base-path.mjs` na-agụ ya) ma jiri ya tụnyere
`OMNIROUTE_BASE_PATH` mgbe container malitere. Mgbe ha dị iche ma e wuru image ahụ
maka mgbọrọgwụ domain ahụ, entrypoint na-edegharị standalone manifests, literals
`basePath`/`assetPrefix` ndị e tinyere n’ime ya (Next 16 na-emepụta URL asset SSR site na
`assetPrefix` naanị — patcher na-etinyekwa subpath ahụ n’ime ya), URL asset
`/_next/static` ndị e tinyere mgbe a na-akpụ ya (client-reference manifests, media imports, ibe njehie ndị
e mepụtara tupu oge eruo) na client `process.env` shim tupu `node dev/run-standalone.mjs`
agbaa.

### Ịkpụ site na Compose (a na-atụ aro ya)

Tọọ variables abụọ ahụ na `.env`, wee wughachi ka image na runtime kwekọọ:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` na-ebufe `OMNIROUTE_BASE_PATH` dịka Docker build-arg yana dịka
runtime environment variable.

### Image mgbọrọgwụ e wurula + subpath runtime

A na-ewu images `diegosouzapw/omniroute:*` ndị e bipụtara maka mgbọrọgwụ domain. Ị ka nwere ike
ịtọ `OMNIROUTE_BASE_PATH` n’oge runtime; container ahụ ga-emetụgharị bundle ahụ otu ugboro mgbe ọ na-amalite.
Jikọta ya na public origin kwekọrọ ekwekọ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Hazie reverse proxy ka ọ ziga **ụzọ mpụga zuru ezu** (ewepụla
prefix ahụ). Traefik kwesịrị iziga `PathPrefix(`/omniroute`)` na container ahụ n’enweghị
`StripPrefix`, ka Next.js wee nata `/omniroute/...` ma nye assets site na
`/omniroute/_next/...`.

Docker healthcheck na-anwale endpoint lifecycle dị mfe `/healthz` nke e tinyere
`OMNIROUTE_BASE_PATH` na-arụ ọrụ n’ihu ya. `/api/monitoring/health` ka dị maka
nyocha mmadụ/dashboard; iji tụgharịa container HEALTHCHECK ka ọ laghachi na ya (dịka ọmụmaatụ,
maka mmanye nyocha ahụike miri emi), tọọ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ụzọ ahụ bụ nyocha **miri emi** (DB + nchịkọta monitoring) — ọ dabara maka
`HEALTHCHECK` Docker nke anaghị eme ugboro ugboro ma ọ bụrụ na ịhọrọ ịlaghachi na ya, mana ọ **dabaraghị** maka oge nke
Kubernetes `livenessProbe`.

Maka orchestrators (Kubernetes, Nomad, wdg.):

| Nnwale          | Họrọ nke a                                                              | Zere                                                                            |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, ma ọ bụ TCP na port bụ isi (`PORT`, ndabara `20128`) | Iji `/api/monitoring/health` dịka liveness                                      |
| Readiness       | HTTP `GET /healthz`                                                     | Oge nchere dị mkpụmkpụ nke na-ewere event-loop ji ọrụ n’aka dịka nke nwụrụ anwụ |
| Deep / blackbox | `/api/monitoring/health`                                                | —                                                                               |

`/healthz` na-akọ lifecycle nke process (`ok` / `starting` / `stopping`). `/livez` bụ naanị
nlele na process ka dị ndụ (200 mgbe ọ bụla handler nwere ike ịgba; ọ naghị echere
readiness). Ha abụọ ka na-agba n’otu Node event loop ahụ nke na-ahụ maka requests, ya mere
ọrụ catalog ma ọ bụ compression na-eji CPU nke ukwuu nwere ike ime ka ha gbuo oge — ịdị n’ọrụ ≠ ịnwụ anwụ. Họrọ TCP
liveness ma ọ bụrụ na HTTP probes agafe oge nchere ha. Ntuziaka probe zuru ezu:
[Ntuziaka monitoring — ndụmọdụ maka Kubernetes probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose na Caddy (HTTPS Auto-TLS)

Enwere ike iji nhazi SSL akpaaka nke Caddy kpughee OmniRoute n'ụzọ echekwara. Gbaa mbọ hụ na DNS A record nke ngalaba gị na-atụ aka na IP sava gị.

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
      # Isi mmalite nke ihe nchọgharị na-ahụ maka nzaghachi OAuth, njikọ dashboard, na URL ọhaneze emepụtara.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL dị n'ime maka njikọ sava-na-sava nke ọrụ ahaziri oge / arịrịọ onwe.
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

Caddy na-edobe nkụnye eji isi mee izipu ọkọlọtọ maka kọntena dị n'azụ. OmniRoute na-eji
`NEXT_PUBLIC_BASE_URL` dịka isi mmalite ọhaneze iwu kwadoro maka nzaghachi OAuth na njikọ ọhaneze
emepụtara; ide data dashboard nwere nyocha njirimara na-eji arịrịọ sitere n'otu isi mmalite tinyere nchedo CSRF
ejikọtara na nnọkọ. Kwado naanị `OMNIROUTE_TRUST_PROXY` maka nrụnye dị elu ebe ị kpachapụrụ anya
chọọ ka OmniRoute nweta isi mmalite ọhaneze site na nkụnye eji isi mee ezitere nke a tụkwasịrị obi kama iji nhazi
doro anya.

## Cloudflare Quick Tunnel

Nkwado dashboard maka nrụnye Docker gụnyere **Cloudflare Quick Tunnel** e ji otu ọpịpị arụ ọrụ na `Dashboard → Endpoints`. Mgbe mbụ a kwadoro ya, ọ na-ebudata `cloudflared` naanị mgbe achọrọ ya, na-amalite tunnel nwa oge gaa na endpoint `/v1` gị ugbu a, ma na-egosi URL `https://*.trycloudflare.com/v1` emepụtara ozugbo n'okpuru URL ọhaneze nkịtị gị.

Enwere ike igosi ma ọ bụ zoo panel tunnel endpoint (Cloudflare, Tailscale, ngrok) site na `Settings → Appearance` na-enweghị ịgbanwe ọnọdụ tunnel na-arụ ọrụ.

### Ihe Edeturu Banyere Tunnel

- URL Quick Tunnel bụ nke nwa oge ma na-agbanwe mgbe ọ bụla ebidoghachiri ya.
- A naghị eweghachi Quick Tunnel na-akpaghị aka mgbe ebidoghachiri OmniRoute ma ọ bụ kọntena. Kwado ha ọzọ site na dashboard mgbe achọrọ ha.
- Nrụnye a na-achịkwa na-akwado Linux, macOS, na Windows ugbu a na `x64` / `arm64`.
- Quick Tunnel a na-achịkwa na-eji mbufe HTTP/2 dịka ndabara iji zere ịdọ aka ná ntị QUIC UDP buffer na-eme mkpọtụ n'ime gburugburu kọntena nwere oke. Tọọ `CLOUDFLARED_PROTOCOL=quic` ma ọ bụ `auto` ma ọ bụrụ na ịchọrọ mbufe dị iche.
- Image Docker gụnyere mgbọrọgwụ CA nke sistemụ ma nyefee ha na `cloudflared` a na-achịkwa, nke na-egbochi ọdịda ntụkwasị obi TLS mgbe tunnel na-amalite n'ime kọntena.
- Tọọ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ma ọ bụrụ na ịchọrọ ka OmniRoute jiri binary dị adị kama ibudata nke ọhụrụ.

## Tag Image

| Image                    | Tag      | Nha    | Nkọwa                                                             |
| ------------------------ | -------- | ------ | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer kwụsiri ike kachasị elu **ebipụtara** (ọ bụghị git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Kpọchie ụdị tag a maka GitOps                                     |

Manifest ọtụtụ-ikpo okwu: `linux/amd64` + `linux/arm64` nke mbụ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker na-ahọrọ architecture dabara na-akpaghị aka; nyefee `--platform linux/amd64` ma ọ bụrụ na ịchọrọ ịmanye nṅomi AMD64 na host ARM.

### Ọwa Mwepụta

OmniRoute na-ebipụta ọwa Docker dị iche iche maka mwepụta kwụsiri ike, nnwale release-branch na-arụ ọrụ, na build mmepe.

| Ọwa                             | Isi mmalite                                  | Mgbanwe                             | Ojiji akwadoro                                                                                                                    |
| ------------------------------- | -------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Mwepụta e binyere aka/nwere ụdị              | Enweghị ike ịgbanwe                 | Nrụnye mmepụta nke kpọchiri otu mwepụta kpọmkwem                                                                                  |
| `:latest` / `:latest-web`       | SemVer kwụsiri ike kachasị elu **ebipụtara** | Pointer kwụsiri ike a pụrụ ịgbanwe  | Na-eso mwepụta kwụsiri ike **mgbe** ọrụ mbipụta SemVer gachara — ọ naghị eso `main` ma ọ bụ commit `release/v*` a na-ebipụtabeghị |
| `:next` / `:next-web`           | Branch `release/v*` ndabara ugbu a           | Pointer tupu-mwepụta a pụrụ ịgbanwe | Nnwale mmezi ndị rutere na branch mwepụta na-arụ ọrụ mana abanyebeghị na mwepụta kwụsiri ike                                      |
| `:main` / `:main-web`           | Branch `main`                                | Pointer mmepe a pụrụ ịgbanwe        | Naanị maka mmepe na nnwale njikọta                                                                                                |

#### Ndị na-eweta nnọkọ webụ: image `-web`

Ọwa ọ bụla dị n'elu nwekwara tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), nke e wuru site na ọkwa `runner-web` — otu image ahụ tinyere Playwright na ihe nchọgharị Chromium. Image nkịtị na-abịa **na-enweghị** Chromium; `gemini-web`, `claude-web` na `claude-turnstile` chọrọ ya.

A na-eyigharị ọdịda ahụ, ọ bụghị n'oge mmalite: ndị na-eweta ahụ na-edepụta model ha ma gosipụta dịka ndị ejikọrọ na dashboard, naanị arịrịọ mbụ ga-ada na

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ọ bụrụ na ị na-eji ndị na-eweta ahụ, dọpụta tag `-web` nke ọwa ị nọ na ya ugbu a — ọ dịghị ihe ọzọ na-agbanwe. Na nrụnye npm/CLI (enweghị image Docker), ihe kwekọrọ na ya na-efu bụ binary ihe nchọgharị: mee `npx playwright install chromium` na host.

#### Iji ọwa tupu-mwepụta

A na-ewughachi channel `next` na push ọ bụla gaa na branch ndabara `release/v*` dị ugbu a, a na-ebipụta ya maka AMD64 na ARM64. Branch mmezi ndị ochie enweghị ike idegharị ya. Channel a na-enye image a pụrụ ịdọta nke nwere ndozi ndị e jikọtara n'ime branch release na-arụ ọrụ tupu e mepụta tag stable na-esote.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Maka Docker Compose, dochie tag image nke profile ahọpụtara na-eji, wee dọta ma mepụtaghachi service ahụ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Nchekwa na nlọghachi azụ

`next` bụ channel pre-release na-agbanwe agbanwe. Ọ nwere ike ịgbanwe na push ọ bụla gaa na branch release na-arụ ọrụ, ma **anaghị akwado ya maka ojiji production**. Kpọgide image digest mgbe ị na-enyocha build a kapịrị ọnụ:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Tupu nnwale, mee ndabere data volume OmniRoute ma ọ bụ data directory e ji bind-mount jikọọ. Iji laghachi azụ, weghachite stable version ma ọ bụ digest e ji mee ihe na mbụ, ma mepụtaghachi container ahụ:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build sitere na release branch enweghị ike ibugharị `latest`; naanị stable semantic version tozuru oke nwere ike ịkwalite pointer stable ahụ. Image `next` ka na-edobe nyocha release image na ọnụ ụzọ mgbochi adịghị ike nchekwa ọkwa CRITICAL.

**`latest` abụghị nkwa na git bụ nke kacha ọhụrụ.** Ndozi ndị ejikọtara na `main` ma ọ bụ na branch `release/v*` na-arụ ọrụ **anọghị** na `:latest` ruo mgbe e bipụtara stable SemVer image, publish job ahụ akwalitekwa `:latest` (otu digest ahụ dị ka SemVer ahụ). Ọ bụrụ na `latest` yiri ka ọ kwụsịrị ịgbanwe ebe GitHub egosilarị ndozi ahụ, dọta `:next` iji nwalee release branch ahụ, ma ọ bụ chere tag SemVer.

| Ihe ị chọrọ                                                          | Jiri                                    |
| -------------------------------------------------------------------- | --------------------------------------- |
| GitOps / production nke na-ekwesịghị ịgbanwe n'onwe ya               | Kpọgide `:X.Y.Z` (ma ọ bụ image digest) |
| Soro stable ndị e bipụtara ma nabata mmepụtaghachi na release ọ bụla | `:latest`                               |
| Nwalee commit `release/v*` ndị a na-ebipụtabeghị                     | `:next` (ọ bụghị production)            |
| Nwalee `main`                                                        | `:main` (ọ bụghị production)            |

## Nnweta ọrụ: SQLite ndabara bụ otu replica

Stock Docker / Kubernetes OmniRoute bụ **otu Node process + otu SQLite writer**. A naghị akwado nnweta dị elu (**high availability**) na topology ahụ.

| Mmachi                                | Nsonaazụ                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Otu writer                            | **Agbanyela** ọtụtụ replica megide otu faịlụ SQLite ahụ. Nke ahụ na-emebi DB.                                                                                                                                                                                                                                                              |
| Recreate / restart / HEALTHCHECK kill | **Nkwụsị ọrụ zuru ezu** nke SSE ndị na-arụ ọrụ ugbu a, nnọkọ dashboard, na state dị na memory. Client ọ bụla ejikọrọ ga-akwụsị. Arịrịọ ọhụrụ n'oge windo endpoint efu ga-enweta reverse-proxy **`502 Bad Gateway: Unknown error`**, ọ bụghị OmniRoute JSON — client enweghị ike ịmata ọdịiche dị n'etiti nke a na ọdịda provider (#11015). |
| Otu event loop ahụ dị ka `/healthz`   | Catalog ji ọrụ n'aka ma ọ bụ compression tick nwere ike igbu oge probe; timeout dị mkpụmkpụ ga-amalitegharị **naanị** replica ahụ.                                                                                                                                                                                                         |

**Matriks probe** (leekwa [ndụmọdụ probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe        | Ebe a na-elekwasị anya                                        | Ejila                                                                      |
| ------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Liveness     | TCP na `PORT` (ndabara `20128`), ma ọ bụ soft HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Readiness    | HTTP `GET /healthz`                                           | Timeout siri ike nke na-ewere event-loop ji ọrụ n'aka dị ka nke nwụrụ anwụ |
| Deep / mmadụ | `/api/monitoring/health`                                      | Automated kubelet liveness                                                 |

**Nkwalite:** tụọ anya na nnọkọ ọ bụla ga-akwụsị. Wepụ client nwayọ ma ọ bụrụ na ị nwere ike; enweghị rolling update na SQLite ndabara. Compose `restart: unless-stopped` yana Docker `HEALTHCHECK` ga-anọchikwa naanị process ahụ mgbe container ahụ bụ Unhealthy — otu oke mmetụta ahụ.

Snippet Kubernetes maka **otu replica** (Recreate dị mkpa; emela ka `replicas` bawanye megide otu faịlụ SQLite):

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

Ụra `preStop` na-enye kube ohere iwepụ endpoint Service tupu SIGTERM ka okporo ụzọ **ọhụrụ** kwụsị iru process na-akwụsị. A na-enye SSE `/v1/responses` ndị na-arụ ọrụ ugbu a ruo `SHUTDOWN_TIMEOUT_MS` (ndabara 30s) ka ha mechie site na heavyweight admission leases (#11015). Arịrịọ ọhụrụ ndị ka rutere process ahụ ga-enweta `503` + `Retry-After: 5`. Oghere endpoint efu nke Recreate ruo mgbe nnọchi ahụ ghọrọ Ready ka bụ nkwụsị ọrụ zuru ezu — nke ahụ bụ topology SQLite, ọ bụghị nhazi probe na-ezighi ezi.

External Postgres / multi-writer HA abụghị ụzọ stock edekọtara n’akwụkwọ. Ọ bụrụ na ịchọrọ HA, debe otu replica ma ọ bụ jiri topology nke project ahụ nwalere ma dekọọ iche. Ọrụ Postgres/MySQL dị na [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Ruo mgbe ewepụtara nke ahụ, naanị ụzọ akwadoro iji mụbaa ikike `/v1/responses` **buru ibu** bụ N process ndị nọọrọ onwe ha (ngalaba na-esote), ọ bụghị `replicas > 1` n’elu otu volume.

## Mgbasawanye: proses N nọọrọ onwe ha

Otu proses Node bụ **otu V8 heap**. Arịrịọ coding-agent abụọ na-adakọta, nke ọ bụla dị ihe dịka ~3 MiB / ~750k-token, `POST /v1/responses` (RTK + Caveman), na-eme ka heap ahụ kwụsị na ihe dịka ~12 Gi (`FATAL ERROR: Reached heap limit`) ma nwee ike ime ka cgroup 16 Gi banye OOM. Lee [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ntụle ahụ bụ ịdọ aka ná ntị gbasara **oke ebe nchekwa**, ọ bụghị oke kachasị siri ike nke ngwaahịa nke na-ekwe naanị arịrịọ `/v1/responses` ogologo abụọ n'otu oge. A na-achịkwa nnabata chat dị arọ site na mmefu-byte ingest a na-ewepụta na-akpaghị aka (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) nke a haziri site n'otu oke V8/cgroup ahụ — ịbawanye ya karịa (ma ọ bụ ịtọ oke ọnụọgụ arịrịọ ochie `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) na proses e hazirila nha ya ga-eme ka nkwụsị ahụ laghachi. Chat nta, `/healthz`, `/v1/models`, na MCP **anọghị** n'okpuru oke ahụ.

### Otu proses: ihe karịrị `/v1/responses` ogologo abụọ

Proses **dị mma** (heap dị n'okpuru `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ndabara `0.75`) **nwere ike** ịgba ihe karịrị arịrịọ ogologo `POST /v1/responses` abụọ n'otu oge mgbe mmefu-byte inflight nke proses dum (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ka nwere ohere. Body ndị ruru ma ọ bụ karịa `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ndabara 256 KiB) na-ewere otu lease dị arọ ahụ dị ka arịrịọ nwere nhazi dị arọ ma jiri otu ụzọ mgbapụ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Inwe ọtụtụ iri ndị ahịa SSE ogologo n'otu oge (ndị na-arụ ọrụ na-achọkarị 40–50) bụ ajụjụ gbasara **oke ebe nchekwa** — hazie heap + oghere primary/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ọ bụghị oke ngwaahịa siri ike nke “karịrị 2 agaghị ekwe omume.” Heap nọ n'okpuru nrụgide ka ga-ajụ arịrịọ site na `503` enwere ike ịnwalegharị ka #7849 ghara ịlọghachi.

Iji **mụbaa heap ọtụtụ ugboro** (V8 old-space ndị nọọrọ onwe ha) **taa**:

| Mee                                                                                                                                      | Emela                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Gbaa **container/pod N**, nke ọ bụla nwere `DATA_DIR` / volume nke **ya onwe ya**                                                        | Tọọ `replicas > 1` ka ha jiri otu faịlụ SQLite                   |
| Hazie heavy in-flight + healthy-headroom site na heap / mmefu inflight-byte; 1–2 bụ ndabara nchekwa #7849, ọ bụghị oke ngwaahịa siri ike | Nye otu proses RAM ji okpukpu 8 na oke ọnụọgụ na-enweghị njedebe |
| Nhọrọ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` maka **counter quota ndị a na-ekekọrịta**                                    | Were Redis dị ka SQLite a na-ekekọrịta — ọ bụghị ya              |
| Detuo provider secret n'ime instance ọ bụla (ma ọ bụ nabata dashboard ndị e kewara ekewa)                                                | Tụ anya otu dashboard / otu call-log n'ofe instance niile        |
| Tinye load balancer ọ bụla n'ihu; sticky dabere na API key ma ọ bụ session ezuola                                                        | Chọọ middleware pụrụ iche nke otu vendor nke maara nha           |

Akụrụngwa: ọnụọgụ `/v1/responses` ogologo nke instance ọ bụla nwere ike ịgba n'otu oge bụ ajụjụ gbasara **oke ebe nchekwa** (heap + inflight-byte / #10110). `DATA_DIR` N nọọrọ onwe ha ka na-amụba heap: RAM host ga-ezuru `N × cgroup`, ọ bụghị “otu pod 16 Gi nwere N=8.” Etinyela `replicas > 1` n'otu faịlụ SQLite ma ọlị.

Ihe atụ Compose (heap abụọ, volume abụọ — ọ bụghị `deploy.replicas: 2`):

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

Njupụta n'ime proses (iwepụ compression na HTTP isolate) dị na [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Otu cluster ezi uche dị na ya nke nọ n'elu state na-adịgide adịgide a na-ekekọrịta dị na [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Njehie mpaghara Gemini n'ime Docker

Google AI Studio / Gemini API nwere ike iweghachi HTTP 400 nwere FAILED_PRECONDITION na
`User location is not supported for the API use.` Arịrịọ gara nke ọma na host
anaghị egosi na container na-eji otu ụzọ outbound ahụ. Nhazi DNS,
njikọ IPv4/IPv6, ụzọ VPN na proxy ndị ahaziri nwere ike ịdị iche. Lelee
[mpaghara Google na-akwado](https://ai.google.dev/gemini-api/docs/available-regions)
yana ụzọ njikọ a na-eji n'ezie; njehie a naanị ya anaghị egosi na API key adịghị mma.

### Ka mma iji proxy akọwapụtara maka otu njikọ

Jiri [nhazi proxy maka njikọ ọ bụla](../ops/PROXY_GUIDE.md#4-level-proxy-system) nke OmniRoute
maka njikọ Gemini nsogbu ahụ metụtara, wee mee **Nwalee Njikọ** ọzọ tinyere obere arịrịọ
na-eji otu model ahụ. Nke a na-eme ka mgbanwe ụzọ ahụ metụta naanị njikọ ahụ. Nyochaa
na container nwere ike iru proxy ahụ, nakwa na njikọ ahụ na-ahọrọ ya n'ezie.
Ịgbanwe ụzọ ahụ anaghị ekwe nkwa na upstream ga-anabata mpaghara ahụ.

### Tụnyere netwọkụ host na nke container

Debe key, model na arịrịọ ka ha bụrụ otu mgbe ị na-atụnyere nsonaazụ ndị e nyere ikike; etinyekwala
credentials, okwuntughe proxy ma ọ bụ authorization headers zuru ezu n'ime issue.
Buru ụzọ nyochaa address families ndị OS resolver na-enye, site n'iji otu command ahụ
na host nakwa n'ime container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Dochie `omniroute` na service ị na-agba (dịka ọmụmaatụ, `omniroute-web`). Command ndị a
na-ebipụta address families na-enweghị credentials ma ọ bụ IP addresses. `6` eweghachiri
na-egosi naanị nsonaazụ IPv6 DNS: ọ **dịghị** egosi na e nwere ụzọ IPv6 a pụrụ iji ma ọ bụ ohere API.
Ebe arụnyere `curl`, tụnyere `curl -4 -I https://generativelanguage.googleapis.com`
na `curl -6 -I https://generativelanguage.googleapis.com` n'ime environment abụọ ahụ.
Nzaghachi HTTP na-egosi na e nwere njikọ maka ule ahụ, ọbụlagodi ma ọ bụrụ na ọ bụ njehie
na-enweghị authentication; naanị arịrịọ model nwere authentication na-anwale ntozu Gemini.

### Nhọrọ n'ogo host: IPv6 na-arụ ọrụ na iwu resolver

Onye kọrọ [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) weghachiri
ohere n'ime environment ha site n'ịgbanye IPv6 nke container na ịgbanwe nhọpụta address
nke glibc. Were nke a dị ka nhọrọ pụrụ iche maka environment ahụ. Kwenye na IPv6 nke host
na-arụ ọrụ, na container nwere egress/routing, nakwa na firewall rules ziri ezi tupu ịgbanwe
mmasị resolver. ULA address nkeonwe naanị ya anaghị egosi na njikọ IPv6 ọha dị.

Maka services ejikọrọla na default network nke Compose, fragment a na-agbanye
IPv6 na network ahụ; hapụ service, ports, volumes na configuration ndị ọzọ ka ha dị:

```yaml
networks:
  default:
    enable_ipv6: true
```

Maka named network, gbanye ya na network nke service ahụ sonyere n'ezie. Docker nwere ike
ikesa ULA subnet; họrọ subnet akọwapụtara nke na-adịghị agafe ibe ya naanị mgbe network gị
chọrọ ya. Lee [netwọkụ IPv6 nke Docker](https://docs.docker.com/engine/daemon/ipv6/)
na [nhọrọ network nke Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

N'ime **image dabere na glibc**, `/etc/gai.conf` nwere ike ịgbanwe nhọpụta address. Dockerfile
nke repository dị ugbu a na-eji Debian; custom images dabere na musl anaghị eji usoro a.
Mgbanwe ahụ a kọrọ na-agbanwe label ULA site na `label fc00::/7 6` gaa na
`label fc00::/7 1`. Malite na policy table zuru ezu nke image ahụ ma debe entries ndị ọzọ:
ịtinye entry `label` ma ọ bụ `precedence` na-anọchi default table ahụ, ya mere file nwere
naanị ahịrị a gbanwere ezughị.
[ntụaka configuration nke glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
na-akọwa semantics ndị ahụ. Jiri bind-mount tinye file ahụ enyochala dị ka read-only na
`/etc/gai.conf`, wee megharịa service ahụ ka mgbanwe ahụ rụọ ọrụ.

Nke a na-agbanwe nhọpụta address nke OS maka **outbound traffic niile n'ime container ahụ**.
Ọ naghị amanye application niile ịhọrọ IPv6: usoro DNS nke Node na nhọpụta njikọ
dịkwa mkpa. Karịchaa, `--dns-result-order=ipv4first` na-ebute IPv4 ụzọ ma
ọ bụghị ihe ngwọta maka ọdịda metụtara naanị IPv4. Lee [usoro DNS nke Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Nwalee Gemini na providers ndị ọzọ ọzọ mgbe mgbanwe ọ bụla n'ogo host gasịrị. Iji laghachi azụ,
wepụ custom `gai.conf` mount, weghachite network configuration gara aga ma
megharịa service/network metụtara n'oge maintenance window. Imegharị network
nwere ike ịkwụsị containers ndị ọzọ ejikọrọ na ya; ehichapụla persistent data volume.

## Ihe Ndị Dị Mkpa Ị Rịba Ama

- **Ọnọdụ WAL nke SQLite:** E kwesịrị ikwe ka `docker stop` mechaa ka OmniRoute nwee ike ideghachi mgbanwe kachasị ọhụrụ n'ime `storage.sqlite` site na checkpoint. Faịlụ Compose ndị e jikọtara etinyelarị oge amara nke 40s tupu nkwụsị. Ọ bụrụ na ị na-agba image ahụ ozugbo, hapụ `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Tọọ ya ka ọ bụrụ `true` ma ọ bụrụ na a na-ejikwa nkwado ndabere oge niile/nke tupu ide ihe site na mpụga. Mbugharị nke database dị adị ka chọrọ snapshot nchekwa nke ya na-adịgide adịgide yana ihe nchebe megide mbugharị n'ọtụtụ.
- **Ịchekwa Data Ka Ọ Dịrịgide:** Na-etinye volume mgbe niile na `/app/data` iji chekwaa database, keys, na nhazi gị mgbe container malitegharịrị.
- **Nhazi Port:** Gbanwee environment variable `PORT` iji gbanwee port ndabara `20128`.

## Hụkwa

- [Ntuziaka Mbugote VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Nhazi VM + nginx + Cloudflare
- [Ntuziaka Mbugote Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Bugote na Fly.io
- [Nhazi Environment](../reference/ENVIRONMENT.md) — Ntụaka `.env` zuru ezu
