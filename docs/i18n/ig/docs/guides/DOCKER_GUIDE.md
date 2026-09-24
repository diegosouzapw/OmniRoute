# 🐳 Docker Guide — OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Ntụaka zuru ezu maka mbubata Docker. Maka ịmalite ngwa ngwa, lee [ngalaba Docker dị na README](../README.md#-docker).

## Ndepụta Ọdịnaya

- [Ịgba Ọsọ Ngwa Ngwa](#quick-run)
- [Iji Faịlụ Environment](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profailụ Ndị Dị](#available-profiles)
- [Ịhazigharị ngwaọrụ CLI nke host mgbe OmniRoute na-agba ọsọ na Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose Maka Production](#production-compose)
- [Nzọụkwụ Dockerfile](#dockerfile-stages)
- [Environment Variables Ndị Dị Mkpa](#critical-environment-variables)
- [Docker Compose na Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tags](#image-tags)
- [Nnweta: SQLite ndabara na-akwado naanị otu replica](#availability-default-sqlite-is-single-replica)
- [Ihe Ndị Dị Mkpa Ịmara](#important-notes)

---

## Mgbapụ Ngwa Ngwa

> **Ịchọrọ iji otu iwu kwado ya n'onwe gị?** Lee
> [Ntuziaka Nkwado Onwe](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image e bipụtara +
> Redis, naanị loopback, enweghị nhọrọ profaịlụ). Mgbapụ Ngwa Ngwa dị n'okpuru bụ
> ụzọ otu container maka ndị ọrụ na-agba Redis n'ebe ọzọ ugbua.

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

# Profaịlụ nnabata (Linux ka e bu ụzọ tụlee; na-ejikọta faịlụ CLI nke nnabata ka a na-agụ naanị)
docker compose --profile host up -d

# Profaịlụ webụ (Chromium/Playwright maka ndị na-eweta nnọkọ webụ)
docker compose --profile web up -d

# Jikọta CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Profaịlụ Ndị Dị

OmniRoute na-eweta profaịlụ Compose maka ụdị nrụnye ndị bụ isi. Họrọ nke dabara na gburugburu gị.

| Profaịlụ         | Ọrụ              | Mgbe a ga-eji ya                                                                                                                                           | Iwu                                          |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ndabara) | `omniroute-base` | Sava na-enweghị ihu njikwa / gburugburu ịrụ ọrụ pere mpe, na-enweghị CLI ndị na-eweta ọrụ agbakwunyere                                                     | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Usoro ọrụ ndị nnọchi anya nke na-akpọ `omniroute providers/setup/doctor` na CLI ndị agbakwunyere (Codex, Claude Code, Droid, OpenClaw)                     | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Host Linux chọrọ ohere yiri `network_mode` iji nweta CLI dị na host site n'ịwụnye `~/.local/bin`, `~/.codex`, `~/.claude`, wdg. dịka naanị ọgụgụ           | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Mee ka sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) rụọ ọrụ na port `8317` maka proxy CLI upstream                                  | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Ndị na-eweta ọrụ dabere na nnọkọ weebụ nke chọrọ ihe nchọgharị: `gemini-web`, `claude-web`, `claude-turnstile` (na-ewu `runner-web`, Chromium dị n'ime ya) | `docker compose --profile web up -d`         |

> Enwere ike ijikọ ọtụtụ profaịlụ: `docker compose --profile cli --profile cliproxyapi up -d`.

## Ịhazi ngwa CLI nke kọmputa nnabata mgbe OmniRoute na-agba n'ime Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` na bọtịnụ
**Chekwaa nhazi** nke dashboard niile na-ede faịlụ dịka `~/.codex/*.config.toml`. Ụzọ ndị ahụ
nwere ihe ha pụtara naanị na kọmputa ebe CLI ahụ na-agba n'ezie. Ọ bụrụ na ị mee ha n'ime
container, ihe e dere ga-abanye na home nke container ahụ (`/home/node` —
image ahụ na-agba dịka `USER node`), ebe CLI ọ bụla dị na kọmputa nnabata na-agaghị agụ ya ma
a ga-ehichapụkwa ya ozugbo e megharịrị container ahụ.

OmniRoute na-achọpụta nke a ma jụ ide ahụ, na-enye ntuziaka kama
ịkọ na ihe gara nke ọma mgbe ị na-enweghị ike iji ya: CLI na-eji `2` kwụsị, API ana-azakwa `422`
yana `containerEphemeralTarget: true`.

### Ihe akwadoro: mee ka CLI gbaa na kọmputa nnabata, OmniRoute n'ime Docker

Container ahụ na-enye API; CLI ahụ na-ahazi ngwa ndị dị na kọmputa nnabata gị.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # jikọta CLI ahụ na container
omniroute setup-codex                      # na-ede ezigbo ~/.codex na kọmputa nnabata gị
```

Nke a bụ nhọrọ ziri ezi mgbe Codex, Claude Code, Cursor ma ọ bụ ngwa yiri ha na-agba na
laptop gị — nke bụ nhazi a na-ahụkarị.

### Nhọrọ ọzọ: jiri bind-mount tinye dir nhazi nke kọmputa nnabata (`host` profile)

Ọ bụrụ na ịchọrọ ka container ahụ n'onwe ya dee nhazi kọmputa nnabata gị, tinye
directory ndị ahụ site na mount ma tụọ `CLI_CONFIG_HOME` aka na mgbọrọgwụ mount ahụ. `host` profile
emelarị nke a:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount bụ ihe na-eme ka ụzọ ahụ bụrụ nke a pụrụ ịtụkwasị obi: OmniRoute na-agụ
`/proc/self/mountinfo` ma na-ekwe ka e dee n'ụzọ ndị e tinyere site na mount (nakwa na directory
ndị ụmụ ha bụ mount, nke bụ kpọmkwem ụdị `/host-home` dị n'elu) ma
ka na-ajụ ndị a na-etinyeghị site na mount.

### Ụzọ mgbapụ: hazie CLI nke container ahụ n'onwe ya (jiri ya naanị mgbe ọ dị mkpa)

Mgbe CLI ndị ahụ bi n'ezie n'ime container (`cli` profile), ide ahụ
bụ nke e bu n'obi. Nyefee `--allow-container-write` nye iwu `setup-*` ọ bụla, ma ọ bụ tọọ
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` maka sava ahụ. Ide ahụ ga-aga n'ihu
yana ịdọ aka ná ntị na ọ gaghị adịgide mgbe container ahụ kwụsịrị ịdị.

> **Ịdọ aka ná ntị gbasara nchekwa — `cli` profile + `docker.sock` mount.**
> `cli` profile na-eji bind-mount tinye `/var/run/docker.sock` ka auto-updater dị n'ime
> container nwee ike iji daemon nke kọmputa nnabata megharịa stack ahụ
> (`src/lib/system/autoUpdate.ts` na-enyocha socket ahụ ma na-awụfe
> ụzọ Docker mgbe ọ na-adịghị). Socket ahụ bụ **ókè ntụkwasị obi nke host-root**:
> ihe ọ bụla nwere ike iru ya na-achịkwa Docker daemon nke kọmputa nnabata dịka
> root — ọ nwere ike ịmepụta, nyochaa, kwụsị ma wepụ container ọ bụla na kọmputa nnabata.
> Ihe nke a pụtara:
>
> 1. **Egosipụla port nke `cli` profile na netwọkụ ma ọlị.** Bipụta
>    ya na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — `cli` profile nke LAN nwere ike iru na-eme ka RCE ọ bụla n'ọkwa dashboard ghọọ
>    nnabata kọmputa ahụ n'ụzọ zuru ezu.
> 2. **Ejila bind tinye directory ndị ọzọ nke kọmputa nnabata n'ime `cli` profile.**
>    Docker socket tinyere mount ọzọ ọ bụla na-enye container ikike zuru ezu
>    ịgụ/dee na filesystem na nhazi kọmputa nnabata gị. Ọ bụrụ na ịchọrọ ka ngwa hụ
>    project, jiri binary CLI mee ya na kọmputa gị — etinyela ya site na mount
>    n'ime `cli` container.
>
> Ọ bụrụ na ịchọghị auto-update dị n'ime container, agbanyela `cli` profile
> (`COMPOSE_PROFILES=core,redis` ma ọ bụ nke dị mkpụmkpụ). Profile ndị ọzọ anaghị
> etinye Docker socket site na mount.
>
> Lee `docs/security/MITM-TPROXY-DECRYPT.md` (git; anaghị agbakọta ya n'ime `/docs`) maka threat model metụtara ya
> gbasara MITM, na `docs/security/SUPPLY_CHAIN.md` maka
> usoro mmalite binary `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute na-adabere na Redis iji kwado ihe na-amachi ọnụego ekesara na cache nkekọrịta. A na-akọwa ọrụ `redis` **mgbe niile** n'ime `docker-compose.yml` (ọ nweghị mgbochi profaịlụ), ọ na-amalitekwa yana profaịlụ ọ bụla ọzọ.

| Nkọwa                | Uru                                        |
| -------------------- | ------------------------------------------ |
| Image                | `redis:7-alpine`                           |
| Aha container        | `omniroute-redis`                          |
| Port ime             | `6379`                                     |
| Port host (mgbanwe)  | `REDIS_PORT` (ndabara bụ `6379`)           |
| Njikọ host (mgbanwe) | `REDIS_BIND_HOST` (ndabara bụ `127.0.0.1`) |
| Volume               | `omniroute-redis-data` → `/data`           |
| Nlele ahụike         | `redis-cli ping` (etiti oge sekọnd 10)     |

Environment variables ndị metụtara ya:

- `REDIS_URL` — eriri njikọ a na-etinye n'ime ngwa (`redis://redis:6379` na ndabara).
- `REDIS_PORT` — nhazi port dị n'akụkụ host maka container Redis.
- `REDIS_BIND_HOST` — interface host ebe a na-ebipụta port ahụ. Ndabara bụ `127.0.0.1`.

> **Ihe mere loopback ji bụrụ ndabara:** sidecar ahụ na-arụ ọrụ na-enweghị `requirepass`, ebe
> container ngwa na-enweta ya site na netwọkụ compose (`redis:6379`) — port e bipụtara dị
> naanị maka ngwaọrụ ndị dị n'akụkụ host (`redis-cli`, `npm run dev` nke mpaghara). Ime ka
> ọ pụta na `0.0.0.0` ga-ekpughere host niile dị na LAN gị Redis na-enweghị nkwenye njirimara. Ọ bụrụ na ịtọ
> `REDIS_BIND_HOST=0.0.0.0`, tinyekwa `--requirepass` na `command:` nke ọrụ ahụ.

A naghị atụ aro **ịgbanyụ Redis** (ihe na-amachi ọnụego ga-adalata gaa na fallback dị na ebe nchekwa). Ọ bụrụ na ị ga-emerịrị ya, wepụ/mee ka ngọngọ ọrụ `redis:` dị na `docker-compose.yml` bụrụ comment, ma ọ bụ belata ọnụ ọgụgụ ya ruo efu:

```bash
docker compose up -d --scale redis=0
```

## Compose Maka Production

Maka snapshot production e kewapụrụ iche nke na-arụ ọrụ n'akụkụ dev, jiri `docker-compose.prod.yml`.

| Nkọwa                  | Uru                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------- |
| Faịlụ                  | `docker-compose.prod.yml`                                                          |
| Port dashboard ndabara | `PROD_DASHBOARD_PORT=20130` (e jikọtara ya na `${DASHBOARD_PORT:-20128}` nke ime)  |
| Port API ndabara       | `PROD_API_PORT=20131`                                                              |
| Image                  | `omniroute:prod` (e wuru site na target `runner-cli`)                              |
| Container Redis        | `omniroute-redis-prod` (`redis:8.6.2`, volume `redis-prod-data` raara onwe ya nye) |
| Volume data            | `omniroute-prod-data` (nwere aha, na-adịgide n'agbanyeghị nrụgharị)                |
| Nlele ahụike           | `node healthcheck.mjs` + `redis-cli ping`, ebe `depends_on` dabere na ahụike Redis |

Otu esi eji ya:

```bash
# Wuo ma malite stack production
docker compose -f docker-compose.prod.yml up -d --build

# Gosipụta logs ka ha na-abata
docker compose -f docker-compose.prod.yml logs -f

# Kwatuo ya (hapụ volumes)
docker compose -f docker-compose.prod.yml down
```

Stack prod na-arụ ọrụ n'otu oge na compose dev (aha container, port, na volume ha dị iche), ya mere ị nwere ike ịga n'ihu na mmepe n'igwe mpaghara ebe production ka na-arụ ọrụ.

## Nkeji Dockerfile

Ebe nchekwa a na-ebunye Dockerfile nwere ọtụtụ nkeji (`Dockerfile`). E kpughere nkeji anọ; họrọ `target` kwesịrị ekwesị maka ojiji gị.

| Nkeji         | Onyonyo ntọala        | Ebumnuche                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Na-etinye ndabere (`npm ci --legacy-peer-deps`) ma na-agba `npm run build` (Turbopack na ndabara — lee Akụrụngwa oge owuwu n'okpuru)                                                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Gburugburụ oge ọrụ mmepụta nwere nsonaazụ Next.js kwụụrụ onwe ya. **Ọ dịghị CLI nke ndị na-eweta ọrụ agbakwunyere.**                                                                                                                                                                                                  |
| `runner-cli`  | `runner-base`         | Na-agbakwụnye `git`, `docker.io`, `docker-compose` na CLI zuru ụwa ọnụ: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Họrọ nke a maka usoro ọrụ ndị agent na-arụ.**                                                                                                                            |
| `runner-web`  | `runner-base`         | Na-agbakwụnye Playwright + ihe nchọgharị Chromium (`--with-deps`) maka ndị na-eweta nnọkọ webụ: `gemini-web`, `claude-web`, `claude-turnstile`. **Họrọ nke a mgbe ị na-eji ndị na-eweta ọrụ ndị ahụ** — onyonyo nkịtị ahụ na-ada n'oge arịrịọ ma ọ bụrụ na ọ naghị etinye ya (lee ndetu `-web` n'okpuru Ọwa Mwepụta). |

Jiri aka wuo otu target kpọmkwem:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Akụrụngwa oge owuwu

Arụmụka owuwu atọ na-achịkwa ihe nkeji `builder` na-eri. Ha bụ naanị maka oge owuwu —
`OMNIROUTE_MEMORY_MB` (n'okpuru) bụ njikwa dị iche maka oge ọrụ.

| Arụmụka owuwu               | Ndabara | Mmetụta                                                                                  |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`     | `0` na-eji webpack wuo kama. Oriri ebe nchekwa kacha elu dị ala, mana ọ na-eji nwayọọ.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Oke heap V8 (`--max-old-space-size`) maka `next build` ewepụtara.                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Na-enye `CIRCLE_NODE_TOTAL`; Next na-ewepụta `workers = N - 1` maka nchịkọta data peeji. |

`OMNIROUTE_BUILD_WORKERS` bụ nke a ga-ebuli na builder buru ibu, bụrụkwa nke a ga-enyo enyo
mgbe owuwu nwere oke akụrụngwa nwụrụ **mgbe** `✓ Compiled successfully` gasịrị. Worker
data peeji ọ bụla bụ process nke ya, otu ahụ ka process nne na nna `next build` n'onwe ya;
nnwale nrụpụtaghachi na VPS dị ndụ (okwu #7518) tụrụ RSS kacha elu nke process ọ bụla ka
~4.5 GB n'agbanyeghị ọkọlọtọ heap `NODE_OPTIONS` (Turbopack na-achịkọta na
ebe nchekwa native/Rust dị na mpụga heap V8). Ndabara nke `2` (→ 1 worker, process 2
n'ozuzu) ka ahaziri maka runner GitHub nwere 16 GB / 4 vCPU nke pipeline mbipụta
na-eji. Na `8` (→ 7 workers), ebe nchekwa gwụrụ na runner ahụ,
buildkit wee jiri `ResourceExhausted: ... cannot allocate memory` mee ka nzọụkwụ ahụ daa;
`3` (→ 2 workers) ka dabaghị mgbe a tụrụ RSS nke process ọ bụla
ozugbo kama ịkọpụta ya site n'ihe ndị ọzọ. `tests/unit/docker-build-memory-budget.test.ts`
na-eme mgbakọ ahụ site na ọnụ ọgụgụ a tụrụ ma na-ada ma ọ bụrụ na nke ọ bụla n'ime njikwa abụọ ahụ
eto karịa ikike runner.

Turbopack na-achịkọta na ebe nchekwa Rust native nke dị **na mpụga** heap V8, ya mere
`OMNIROUTE_BUILD_MEMORY_MB` anaghị etinye ya oke. N'elu host nwere oke ebe nchekwa,
OOM killer ga-eji SIGKILL kwụsị owuwu ahụ n'enweghị ederede njehie ọ bụla — ọ na-akwụsị
naanị n'etiti `Creating an optimized production build`, nke na-adị ka ọ kwụsịrị ịga n'ihu
kama ịbụ nsogbu ebe nchekwa gwụrụ. Ọ bụrụ na host owuwu nwere oke akụrụngwa, gbanwee bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

A gbanyere `webpackBuildWorker`, ya mere `next build` na-agba process nne na nna **na**
process worker, nke ọ bụla na-asọpụrụ `OMNIROUTE_BUILD_MEMORY_MB` n'ụzọ dị iche. Hazie oke
container ka ọ dị ihe dịka okpukpu abụọ nke uru ahụ, ọ bụghị naanị otu okpukpu.

Ihe a tụrụ n'osisi a (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Oke container  | Nsonaazụ                                    |
| --------- | -------------- | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | OOM gburu ya na ha abụọ, n'enweghị ozi      |
| webpack   | 8 GiB          | SIGKILL gburu worker owuwu ahụ              |
| webpack   | 12 GiB         | ọ gara nke ọma, ruru elu kacha nke 11.1 GiB |

### Ndabara oge ọrụ

Ndabara `runner-base` na-ebupụ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Omume ebe nchekwa n'ime Docker:

- Ihe oyiyi ahụ na-edobe `OMNIROUTE_MEMORY_MB=1024` ma na-ewepụta `NODE_OPTIONS=--max-old-space-size=1024` site na ya.
- Onye mbido standalone na-amalite usoro sava ahụ n’onwe ya; ọ na-agụ `OMNIROUTE_MEMORY_MB` ma tinye `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node na-eji uru ikpeazụ n’ime `--max-old-space-size` e kwughachiri, ya mere idobe `OMNIROUTE_MEMORY_MB` na-achịkwa oke heap Docker nke na-arụ ọrụ.
- Ebe ọ bụ na ihe oyiyi ahụ na-edobe ya mgbe niile, fallback nke onye mbido ahụ nke RAM haziri anaghị arụ ọrụ n’okpuru Docker. Bulie ya n'ụzọ doro anya maka ibu ọrụ ahụ (lee tebụl dị n’okpuru). `2048` ka dị obere maka coding-agent `/v1/responses`.

### RAM oge ọrụ maka ndị coding agent

Ntọala ndabara Docker nke 1 GiB bụ oke kacha nta maka dashboard/mkparịta ụka dị mfe, ọ bụghị nha maka production. Ahụ ogologo nke `POST /v1/responses` (ọtụtụ narị ozi, ọtụtụ iri ngwaọrụ) na-edowe ọtụtụ graph n'ime ebe nchekwa n'oge compression. Arịrịọ abụọ na-adakọ ibe ha, nke ọ bụla dị ihe dị ka ~3 MiB / ~750k-token, emeela ka V8 kwụsị na old-space nke **12 GiB** (`FATAL ERROR: Reached heap limit`) ma kpatakwa cgroup OOM nke 16 GiB. Lee [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Debe nha **cgroup `--memory` ka ọ dị elu karịa heap** — native buffers, SQLite, na compression intermediates dị n'èzí V8.

| Ibu ọrụ                                            | `OMNIROUTE_MEMORY_MB`      | Container / cgroup                         | Nkọwa                                                                                               |
| -------------------------------------------------- | -------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Dashboard, otu mkparịta ụka dị mfe                 | `1024` (ndabara ihe oyiyi) | ≥2 GiB                                     |                                                                                                     |
| Otu coding agent (Claude/Codex/Grok)               | `8192`                     | ≥10 GiB                                    | Otu session `/v1/responses` a na-ahụkarị                                                            |
| `/v1/responses` abụọ ogologo na-arụ n'otu oge      | `10240`–`12288`            | ≥12–16 GiB                                 | A tụrụ nkwụsị V8 na heap dị ihe dị ka ~12 GiB                                                       |
| Context ogologo atọ ma ọ bụ karịa na-arụ n'otu oge | emela ya n'otu process     | hazie ha ka ha soro ibe ha / tinyekwuo RAM | Nnabata heavyweight ndabara bụ 1 na-arụ ọrụ; ibuli ya n'etinyeghị RAM na-eme ka nkwụsị ahụ lọghachi |

`omniroute serve` na bare metal na-ahazi ihe dị ka ~35% nke RAM (e kpachiri ya na `[512, 4096]`) mgbe a **na-edobeghị** `OMNIROUTE_MEMORY_MB`. Docker na-edobe `1024` mgbe niile, ya mere nhazi ahụ anaghị arụ ọrụ n'ime ihe oyiyi gọọmentị.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Mgbanwe Gburugburuwu Dị Oke Mkpa

E wezụga ndabara ndị edepụtara na [ENVIRONMENT.md](../reference/ENVIRONMENT.md), mgbanwe ndị a bụ ndị kacha mkpa mgbe a na-agba ya n'okpuru Docker:

| Mgbanwe                       | Ebumnuche                                                                                                                                                                                                                                                                 | Ndabara                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Nzuzo a na-ekekọrịta maka njikọ WebSocket. **A chọrọ ya na mmepụta** — tọọ ya ka ọ bụrụ eriri mkpụrụedemede enweghị usoro siri ike.                                                                                                                                       | edoghị (a ga-enye ya)     |
| `REDIS_URL`                   | Eriri njikọ maka ihe na-amachi ọnụego / azụ nchekwa cache                                                                                                                                                                                                                 | `redis://redis:6379`      |
| `REDIS_PORT`                  | Ọdụ ụgbọ mmiri dị n'akụkụ host maka container Redis e jikọtara ọnụ                                                                                                                                                                                                        | `6379`                    |
| `REDIS_BIND_HOST`             | Interface host ebe a na-ebipụta ọdụ ụgbọ mmiri Redis e jikọtara ọnụ (loopback ma ọ bụrụ na ị tinyeghị AUTH)                                                                                                                                                               | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ụzọ host a na-etinye n'ime profaịlụ `cli` na `/workspace/omniroute` maka usoro ọrụ mmelite onwe                                                                                                                                                                           | `.` (directory dị ugbu a) |
| `OMNIROUTE_MEMORY_MB`         | Oke heap Node n'oge ọrụ maka sava Docker standalone; ọ na-anọchi ndabara image dị n'elu. Ndị nnọchi anya ide koodu: `8192`+ (lee [RAM oge ọrụ](#runtime-ram-for-coding-agents)).                                                                                          | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | Dochie ọdụ ụgbọ mmiri ekpughere maka dashboard (20128) na API (20129)                                                                                                                                                                                                     | `20128` / `20129`         |
| `APP_BIND_HOST`               | Interface host ebe docker-compose na-ebipụta ọdụ ụgbọ mmiri dashboard/API/live-WS. Mgbe `REQUIRE_API_KEY=false` (ndabara), `0.0.0.0` na-ekpughere LAN proxy `/v1` na-enweghị njirimara — gbasaa ya naanị mgbe `REQUIRE_API_KEY=true` ma ọ bụ mgbe reverse proxy dị n'ihu. | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | Interface host ebe docker-compose na-ebipụta sidecar `cliproxyapi` — volume data ya na-edobe nzere provider.                                                                                                                                                              | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | Directory ebe ihe nyocha plugin n'oge ọrụ na-agụ ma na-etinye plugin. Tọọ ya mgbe e jiri bind mount tinye plugin: ndabara na-eso `HOME`, nke image nwere ike ghara ibupụ.                                                                                                 | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | Ụzọ nta URL mgbe e bipụtara ngwa ahụ n'azụ reverse proxy (dịka `/omniroute`)                                                                                                                                                                                              | _(efu = mgbọrọgwụ)_       |
| `NEXT_PUBLIC_BASE_URL`        | Mmalite adreesị browser ọha gụnyere ụzọ nta ahụ (dịka `https://host/omniroute`)                                                                                                                                                                                           | edoghị                    |
| `PROD_DASHBOARD_PORT`         | Ọdụ ụgbọ mmiri dashboard dị n'akụkụ host maka `docker-compose.prod.yml`                                                                                                                                                                                                   | `20130`                   |
| `CLIPROXYAPI_PORT`            | Ọdụ ụgbọ mmiri dị n'akụkụ host maka sidecar `cliproxyapi`                                                                                                                                                                                                                 | `8317`                    |

## Reverse Proxy n’Ụzọ-Nta (Traefik / nginx)

A na-etinye Next.js `basePath` n’ime standalone bundle mgbe a na-arụ build. OmniRoute na-edekọ uru ahụ etinyere
n’ime faịlụ sentinel dị na mgbọrọgwụ ngwa ahụ (a na-ede ya mgbe `npm run build` na-arụ ọrụ; `scripts/docker/ensure-docker-base-path.mjs` na-agụ ya) ma jiri ya tụnyere
`OMNIROUTE_BASE_PATH` mgbe container malitere. Mgbe ha dị iche ma e wuru image ahụ
maka mgbọrọgwụ domain, entrypoint na-edegharị standalone manifests, mkpụrụokwu
`basePath`/`assetPrefix` agbakwunyere (Next 16 na-emepụta URL akụ SSR site naanị na
`assetPrefix` — patcher ahụ na-etinyekwa ụzọ-nta ahụ n’ime ya), URL akụ
`/_next/static` agbakwunyere (client-reference manifests, mbubata media, peeji njehie
e mepụtara tupu oge eruo) yana client `process.env` shim tupu `node dev/run-standalone.mjs`
arụ ọrụ.

### Compose build (akwadoro)

Tọọ variable abụọ ahụ na `.env`, wee wughachi ka image na runtime kwekọọ:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` na-ebufe `OMNIROUTE_BASE_PATH` dịka Docker build-arg nakwa dịka
runtime environment variable.

### Root image e wuru tupu oge eruo + ụzọ-nta runtime

A na-ewu image `diegosouzapw/omniroute:*` ndị e bipụtara maka mgbọrọgwụ domain. Ị ka nwere ike
ịtọ `OMNIROUTE_BASE_PATH` n’oge runtime; container ahụ na-eme patch na bundle ahụ otu ugboro mgbe ọ na-amalite.
Jikọta ya na public origin kwekọrọ ekwekọ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Hazie reverse proxy ka ọ zipụ **ụzọ mpụga zuru ezu** (ewepụla
prefix ahụ). Traefik kwesịrị iduga `PathPrefix(`/omniroute`)` gaa na container ahụ na-enweghị
`StripPrefix`, ka Next.js nwee ike ịnata `/omniroute/...` ma nye akụ site na
`/omniroute/_next/...`.

Docker healthcheck na-enyocha endpoint lifecycle `/healthz` dị mfe, nke e tinyere prefix
`OMNIROUTE_BASE_PATH` na-arụ ọrụ. `/api/monitoring/health` ka dị maka
nchọpụta nsogbu mmadụ/dashboard; iji tụgharịa container HEALTHCHECK laghachi na ya (dịka ọmụmaatụ,
maka mmanye nyocha ahụike miri emi), tọọ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ụzọ ahụ bụ nyocha **miri emi** (DB + nchịkọta monitoring) — ọ dabara maka
`HEALTHCHECK` Docker nke anaghị eme ugboro ugboro ma ọ bụrụ na ịhọrọ ịlaghachi na ya, mana ọ **daghị** maka interval
`livenessProbe` Kubernetes.

Maka orchestrator (Kubernetes, Nomad, wdg.):

| Nnyocha             | Họrọ karịa                                                              | Zere                                                                         |
| ------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Ịdị ndụ             | HTTP `GET /livez`, ma ọ bụ TCP na port bụ isi (`PORT`, ndabara `20128`) | Iji `/api/monitoring/health` dịka nyocha ịdị ndụ                             |
| Ịdị njikere         | HTTP `GET /healthz`                                                     | Timeout dị mkpụmkpụ nke na-ewere event-loop ji ọrụ n’aka dịka nke nwụrụ anwụ |
| Miri emi / blackbox | `/api/monitoring/health`                                                | —                                                                            |

`/healthz` na-akọ lifecycle process (`ok` / `starting` / `stopping`). `/livez` bụ
naanị maka igosi na process dị ndụ (200 mgbe ọ bụla handler nwere ike ịrụ ọrụ; ọ naghị echere
ịdị njikere). Ha abụọ ka na-arụ ọrụ n’otu Node event loop ahụ nke na-ahụ maka request, ya mere
ọrụ catalog ma ọ bụ compression nke CPU na-arụ nke ukwuu nwere ike ime ka ha gbuo oge — iji ọrụ n’aka ≠ ịnwụ anwụ. Họrọ TCP
liveness ma ọ bụrụ na HTTP probe agafe oge. Ntuziaka probe zuru ezu:
[Ntuziaka monitoring — ndụmọdụ probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose na Caddy (HTTPS Auto-TLS)

Enwere ike iji nhazi SSL akpaka nke Caddy kpughee OmniRoute n'ụzọ echekwara. Gbaa mbọ hụ na ndekọ DNS A nke ngalaba gị na-atụ aka na adreesị IP nke sava gị.

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
      # Isi mmalite nke ihe nchọgharị na-ahụ maka nlọghachi OAuth, njikọ dashboard, na URL ọhaneze ewepụtara.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL sava-gaa-sava nke ime maka ọrụ a haziri oge ha / arịrịọ onwe.
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

Caddy na-edobe nkụnye ndị ọkọlọtọ maka iziga arịrịọ gaa na container dị n'azụ. OmniRoute na-eji
`NEXT_PUBLIC_BASE_URL` dịka isi mmalite ọhaneze bụ isi maka nlọghachi OAuth na njikọ ọhaneze
ewepụtara; ide ihe na dashboard nke chọrọ nkwenye njirimara na-eji arịrịọ sitere n'otu isi mmalite yana nchedo CSRF
ejikọtara na session. Kwado naanị `OMNIROUTE_TRUST_PROXY` maka mbugharị dị elu ebe ị kpachaara anya
chọọ ka OmniRoute nweta isi mmalite ọhaneze site na nkụnye ezigara tụkwasịrị obi kama iji nhazi
doro anya.

## Cloudflare Quick Tunnel

Nkwado dashboard maka mbugharị Docker gụnyere **Cloudflare Quick Tunnel** nke otu ọpịpị na `Dashboard → Endpoints`. Mgbe e mere nkwado mbụ, ọ na-ebudata `cloudflared` naanị mgbe achọrọ ya, malite tunnel nwa oge gaa na endpoint `/v1` gị ugbu a, ma gosi URL `https://*.trycloudflare.com/v1` ewepụtara ozugbo n'okpuru URL ọhaneze nkịtị gị.

Enwere ike igosi ma ọ bụ zoo panel tunnel nke endpoint (Cloudflare, Tailscale, ngrok) site na `Settings → Appearance` n'agbanweghị ọnọdụ tunnel na-arụ ọrụ.

### Ihe Ndị Dị Mkpa Banyere Tunnel

- URL Quick Tunnel bụ nke nwa oge ma na-agbanwe mgbe ọ bụla e bidogharịrị ya.
- Anaghị eweghachi Quick Tunnels na-akpaghị aka mgbe OmniRoute ma ọ bụ container bidogharịrị. Kwado ha ọzọ site na dashboard mgbe achọrọ.
- Nwụnye a na-achịkwa na-akwado Linux, macOS, na Windows ugbu a na `x64` / `arm64`.
- Quick Tunnels a na-achịkwa na-eji njem HTTP/2 na ndabara iji zere ịdọ aka ná ntị mkpọtụ banyere buffer QUIC UDP n'ime gburugburu container nwere oke. Tọọ `CLOUDFLARED_PROTOCOL=quic` ma ọ bụ `auto` ma ọ bụrụ na ịchọrọ njem ọzọ.
- Image Docker na-agụnye mgbọrọgwụ CA nke sistemụ ma nyefee ha na `cloudflared` a na-achịkwa, nke na-egbochi ọdịda ntụkwasị obi TLS mgbe tunnel na-amalite n'ime container.
- Tọọ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ma ọ bụrụ na ịchọrọ ka OmniRoute jiri binary dị adị kama ibudata nke ọhụrụ.

## Mkpado Onyonyo

| Onyonyo                  | Mkpado   | Nha    | Nkọwa                                                             |
| ------------------------ | -------- | ------ | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer kwụsiri ike **ebipụtara** kachasị elu (ọ bụghị git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Tụgide ụdị mkpado a maka GitOps                                   |

Manifest nyiwe-ọtụtụ: `linux/amd64` + `linux/arm64` nke e wuru kpọmkwem (Apple Silicon, AWS Graviton, Raspberry Pi). Docker na-ahọrọ architecture dabara adaba na-akpaghị aka; nyefee `--platform linux/amd64` ma ọ bụrụ na ịchọrọ ịmanye nṅomi AMD64 na host ARM.

### Ọwa Mwepụta

OmniRoute na-ebipụta ọwa Docker dị iche iche maka mwepụta kwụsiri ike, nnwale release-branch nọ n'ọrụ, na build mmepe.

| Ọwa                             | Isi mmalite                                  | Mgbanwe                                | Ojiji akwadoro                                                                                                                   |
| ------------------------------- | -------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Mwepụta e binyere aka/nwere version          | Agaghị agbanwe                         | Nrụnye production ndị na-atụgide kpọmkwem otu mwepụta                                                                            |
| `:latest` / `:latest-web`       | SemVer kwụsiri ike **ebipụtara** kachasị elu | Pointer kwụsiri ike nwere ike ịgbanwe  | Na-eso mwepụta kwụsiri ike **mgbe** ọrụ mbipụta SemVer gasịrị — ọ naghị eso `main` ma ọ bụ commit `release/v*` a na-ewepụtabeghị |
| `:next` / `:next-web`           | Branch `release/v*` ndabara dị ugbu a        | Pointer tupu mwepụta nwere ike ịgbanwe | Ịnwale ndozi ndị batara na branch mwepụta nọ n'ọrụ mana ha abanyebeghị na mwepụta kwụsiri ike                                    |
| `:main` / `:main-web`           | Branch `main`                                | Pointer mmepe nwere ike ịgbanwe        | Maka mmepe na nnwale njikọta naanị                                                                                               |

#### Ndị na-eweta web-session: onyonyo `-web`

Ọwa ọ bụla dị n'elu nwekwara mkpado `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), nke e wuru site na stage `runner-web` — otu onyonyo ahụ tinyere Playwright na ihe nchọgharị Chromium. Onyonyo nkịtị na-abịa **na-enweghị** Chromium; `gemini-web`, `claude-web` na `claude-turnstile` chọrọ ya.

A na-eyigharị ọdịda ahụ; ọ naghị eme n'oge mmalite: ndị na-eweta ndị ahụ na-edepụta model ha ma gosipụta dị ka ndị ejikọrọ na dashboard, ma naanị arịrịọ mbụ ga-ada site na

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ọ bụrụ na ị na-eji ndị na-eweta ndị ahụ, dọpụta mkpado `-web` nke ọwa ị nọ na ya ugbu a — ọ dịghị ihe ọzọ na-agbanwe. Maka nrụnye npm/CLI (enweghị onyonyo Docker), ihe kwekọrọ na ya na-efu bụ binary ihe nchọgharị ahụ: mee `npx playwright install chromium` na host.

#### Iji ọwa tupu mwepụta

A na-ewughachi ọwa `next` na push ọ bụla gaa na branch `release/v*` ndabara dị ugbu a, a na-ebipụtakwa ya maka ma AMD64 ma ARM64. Branch mmezi ndị ochie enweghị ike idegharị ya. Ọwa ahụ na-enye onyonyo enwere ike ịdọpụta maka ndozi ndị ejikọtara n'ime branch mwepụta nọ n'ọrụ tupu e mepụta mkpado kwụsiri ike na-esote.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Maka Docker Compose, dochie mkpado onyonyo nke profile ahọrọ na-eji, wee dọpụta ma megharịa service ahụ:

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

`next` bụ ọwa tupu mwepụta na-agagharị agagharị. Ọ nwere ike ịgbanwe na push ọ bụla gaa na branch mwepụta nọ n'ọrụ ma **anaghị akwado ya maka ojiji production**. Tụgide digest onyonyo ahụ mgbe ị na-enyocha otu build kpọmkwem:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Tupu nnwale, mee nkwado ndabere nke volume data OmniRoute ma ọ bụ directory data e ji bind-mount. Iji laghachi azụ, weghachite version kwụsiri ike ma ọ bụ digest e ji mee ihe na mbụ, ma megharịa container ahụ:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build release-branch enweghị ike ibugharị `latest`; naanị semantic version kwụsiri ike tozuru etozu nwere ike ịkwalite pointer kwụsiri ike ahụ. Onyonyo `next` na-ejigide nyocha onyonyo mwepụta na mgbochi adịghị ike CRITICAL.

**`latest` abụghị nkwa na git bụ nke kachasị ọhụrụ.** Ndozi ejikọrọ na `main` ma ọ bụ na branch `release/v*` nọ n'ọrụ **anọghị** na `:latest` ruo mgbe e bipụtara onyonyo SemVer kwụsiri ike ma ọrụ mbipụta kwalite `:latest` (otu digest ahụ dịka SemVer ahụ). Ọ bụrụ na `latest` yiri ka ọ kwụsịrị ebe GitHub egosilarị ndozi ahụ, dọpụta `:next` iji nwalee branch mwepụta ahụ ma ọ bụ chere mkpado SemVer.

| Ihe ị chọrọ                                                                   | Jiri                                         |
| ----------------------------------------------------------------------------- | -------------------------------------------- |
| GitOps / production nke na-agaghị agbanwe n'onwe ya                           | Tụgide `:X.Y.Z` (ma ọ bụ digest onyonyo ahụ) |
| Soro mwepụta kwụsiri ike ebipụtara ma nabata mmegharị ọhụrụ na mwepụta ọ bụla | `:latest`                                    |
| Nwalee commit `release/v*` a na-ewepụtabeghị                                  | `:next` (ọ bụghị production)                 |
| Nwalee `main`                                                                 | `:main` (ọ bụghị production)                 |

## Nnweta: SQLite ndabara bụ otu replica

OmniRoute Docker / Kubernetes nkịtị bụ **otu process Node + otu onye na-ede SQLite**. A naghị akwado nnweta dị elu na topology ahụ.

| Mmachi                                | Nsonaazụ                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Otu onye na-ede                       | **Agbala** ọtụtụ replica megide otu faịlụ SQLite. Nke ahụ ga-emebi DB ahụ.                                                                                                                                                                                                                                                   |
| Recreate / restart / HEALTHCHECK kill | **Nkwụsị zuru ezu** nke SSE ndị na-aga n’ihu, session dashboard, na state dị na memory. Client niile ejikọrọ ga-akwụsị. Arịrịọ ọhụrụ n’oge endpoint na-adịghị ga-enweta **`502 Bad Gateway: Unknown error`** site na reverse-proxy, ọ bụghị JSON OmniRoute — client enweghị ike ịmata ọdịiche ya na ọdịda provider (#11015). |
| Otu event loop ahụ dị ka `/healthz`   | Catalog na-arụsi ọrụ ike ma ọ bụ compression tick nwere ike igbu oge probe; timeout dị mkpụmkpụ ga-amalitegharịa **naanị** replica ahụ.                                                                                                                                                                                      |

**Matriks probe** (leekwa [ndụmọdụ probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe         | Ebe e lekwasịrị anya                                            | Ejila                                                                     |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Liveness      | TCP na `PORT` (ndabara `20128`), ma ọ bụ HTTP `/healthz` dị nro | `/api/monitoring/health`                                                  |
| Readiness     | HTTP `GET /healthz`                                             | Timeout siri ike nke na-ewere event-loop ji ọrụ n’aka dịka nke nwụrụ anwụ |
| Omimi / mmadụ | `/api/monitoring/health`                                        | Liveness kubelet akpaghị aka                                              |

**Nkwalite:** tụrụ anya na session niile ga-akwụsị. Wepụ client nwayọọ nwayọọ ma ọ bụrụ na ị nwere ike; enweghị rolling update na SQLite ndabara. Compose `restart: unless-stopped` yana Docker `HEALTHCHECK` ga-edochikwa naanị process ahụ mgbe container ghọrọ Unhealthy — otu oke mmetụta ahụ.

Iberibe nhazi Kubernetes maka **otu replica** (Recreate dị mkpa; ebulila `replicas` megide otu faịlụ SQLite):

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

Ụra `preStop` na-enye kube ohere iwepụ endpoint Service tupu SIGTERM ka okporo ụzọ **ọhụrụ** kwụsị iru process na-anwụ anwụ. A na-enye SSE `/v1/responses` ndị na-aga n’ihu ohere ịkwụsị n’ime oge ruru `SHUTDOWN_TIMEOUT_MS` (ndabara 30s) site na heavyweight admission leases (#11015). Arịrịọ ọhụrụ ka rutere process ahụ ga-enweta `503` + `Retry-After: 5`. Oghere endpoint na-adịghị nke Recreate ruo mgbe nnọchi ahụ ghọrọ Ready ka bụ nkwụsị siri ike — nke ahụ bụ topology SQLite, ọ bụghị nhazi probe na-ezighi ezi.

Postgres mpụga / HA nwere ọtụtụ ndị na-ede abụghị ụzọ nkịtị e depụtara n’akwụkwọ. Ọ bụrụ na HA dị gị mkpa, debe otu replica ma ọ bụ jiri topology nke project ahụ nwalere ma depụta iche. Ọrụ Postgres/MySQL dị na [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Ruo mgbe ewepụtara nke ahụ, naanị ụzọ akwadoro iji mụbaa ikike `/v1/responses` **buru ibu** bụ process N nọọrọ onwe ha (ngalaba na-esote), ọ bụghị `replicas > 1` n’otu volume.

## Mgbasawanye: usoro N kwụụrụ onwe ha

Otu usoro Node bụ **otu V8 heap**. Arịrịọ coding-agent abụọ na-adakọta, nke ọ bụla dị ihe dịka ~3 MiB / ~750k-token, `POST /v1/responses` (RTK + Caveman), na-eme ka heap ahụ kwụsị na ihe dịka ~12 Gi (`FATAL ERROR: Reached heap limit`) ma nwee ike ime ka cgroup 16 Gi banye OOM. Lee [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ntụle ahụ bụ ịdọ aka ná ntị gbasara **oke ebe nchekwa**, ọ bụghị oke kachasị siri ike nke ngwaahịa maka naanị arịrịọ ogologo `/v1/responses` abụọ na-aga n'otu oge. A na-achịkwa nnabata chat dị arọ site na mmefu byte ingest a na-enweta na-akpaghị aka (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) nke a haziri site n'otu oke V8/cgroup ahụ — ịkwalite ya karịa (ma ọ bụ ịtọ oke ọnụọgụ arịrịọ ochie `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) n'usoro e hazirila nha ya ga-eme ka nkwụsị ahụ laghachi. Chat ndị pere mpe, `/healthz`, `/v1/models`, na MCP **anọghị** n'okpuru oke ahụ.

### Otu usoro: karịa arịrịọ ogologo `/v1/responses` abụọ

Usoro **dị mma** (heap dị n'okpuru `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ndabara `0.75`) **nwere ike** ịgba ihe karịrị arịrịọ ogologo `POST /v1/responses` abụọ n'otu oge mgbe mmefu byte arịrịọ na-aga n'ihu nke usoro ahụ dum (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ka nwere ohere. Body ndị ruru ma ọ bụ gafere `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ndabara 256 KiB) na-ewere otu heavyweight lease ahụ arịrịọ ndị nwere nhazi dị arọ na-ewere, ma na-ejikwa otu ụzọ mgbapụ `tryAcquireHealthyHeadroom` nke [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Ọtụtụ iri client SSE ogologo na-aga n'otu oge (ndị na-arụ ọrụ na-achọkarị 40–50) bụ ajụjụ gbasara **oke ebe nchekwa** — hazie nha heap + slot primary/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ọ bụghị oke ngwaahịa siri ike nke “kachasị 2”. Heap nọ n'okpuru nrụgide ka na-ajụ arịrịọ site na `503` nke enwere ike ịnwale ọzọ, ka #7849 ghara ịlaghachi.

Iji **mụbaa heap** (V8 old-space ndị kwụụrụ onwe ha) **ugbu a**:

| Mee                                                                                                                                                     | Emela                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Gbaa **container/pod N**, nke ọ bụla nwere `DATA_DIR` / volume nke **ya**                                                                               | Tọọ `replicas > 1` ka ha jiri otu faịlụ SQLite                   |
| Hazie nha heavy in-flight + healthy-headroom site na heap / mmefu inflight-byte; 1–2 bụ ndabara akpachapụ anya nke #7849, ọ bụghị oke ngwaahịa siri ike | Nye otu usoro RAM ji okpukpu 8 na oke ọnụọgụ na-enweghị njedebe  |
| Nhọrọ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` maka **counter quota ndị a na-ekekọrịta**                                                   | Were Redis dị ka SQLite a na-ekekọrịta — ọ bụghị ya              |
| Tinye otu provider secret ahụ n'ime instance nke ọ bụla (ma ọ bụ nabata dashboard kewara ekewa)                                                         | Tụkwasị anya n'otu dashboard / otu call-log n'ofe instance niile |
| Debe load balancer ọ bụla n'ihu; sticky dabere na API key ma ọ bụ session zuru ezu                                                                      | Chọọ middleware size-aware nke otu vendor kpọmkwem               |

Akụrụngwa: ọnụ ọgụgụ arịrịọ ogologo `/v1/responses` nwere ike ịga n'otu oge n'otu instance bụ ajụjụ gbasara **oke ebe nchekwa** (heap + inflight-byte / #10110). `DATA_DIR` N ndị kwụụrụ onwe ha ka na-amụba heap: RAM host ga-ezuru `N × cgroup`, ọ bụghị “otu pod 16 Gi nwere N=8.” Etinyela `replicas > 1` n'otu faịlụ SQLite ma ọlị.

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

Njupụta n'ime usoro (iwepụ compression na HTTP isolate) dị na [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Otu cluster ezi uche dị na ya nke dị n'elu durable state a na-ekekọrịta dị na [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Ihe Ndị Dị Mkpa

- **Ụdị SQLite WAL:** E kwesịrị ikwe ka `docker stop` mechaa ka OmniRoute nwee ike ideghachi mgbanwe kachasị ọhụrụ n'ime `storage.sqlite` site na checkpoint. Faịlụ Compose ndị esonyere edozilarị oge amara nkwụsị nke 40s. Ọ bụrụ na ị na-agba image ahụ ozugbo, hapụ `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Tọọ ya ka ọ bụrụ `true` ma ọ bụrụ na a na-ejikwa nkwado ndabere oge niile/tupu-ide ihe n'ụzọ mpụga. Mbugharị database dị adị ka chọrọ snapshot nchekwa na-adịgide adịgide nke ya na ihe mgbochi mbugharị buru ibu.
- **Ịchekwa Data:** Na-mount volume mgbe niile na `/app/data` iji chekwaa database, keys, na nhazi gị mgbe container malitegharịrị.
- **Nhazi Port:** Gbanwee environment variable `PORT` iji dochie port ndabara `20128`.

## Hụkwa

- [Ntuziaka Mbugharị na VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Nhazi VM + nginx + Cloudflare
- [Ntuziaka Mbugharị na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Bugharịa na Fly.io
- [Nhazi Environment](../reference/ENVIRONMENT.md) — Ntụaka `.env` zuru ezu
