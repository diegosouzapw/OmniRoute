# 🐳 Docker Guide — OmniRoute (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Cikakken jagorar tura manhaja ta Docker. Don farawa cikin sauri, duba [sashen Docker na README](../README.md#-docker).

## Jadawalin Abubuwan Ciki

- [Gudanarwa Cikin Sauri](#quick-run)
- [Tare da Fayil ɗin Muhalli](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profiles da Ake Da Su](#available-profiles)
- [Saita kayan aikin CLI na host lokacin da OmniRoute ke gudana a Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose na Production](#production-compose)
- [Matakan Dockerfile](#dockerfile-stages)
- [Muhimman Environment Variables](#critical-environment-variables)
- [Docker Compose tare da Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tags](#image-tags)
- [Samuwar Sabis: SQLite na asali yana amfani da replica guda ɗaya](#availability-default-sqlite-is-single-replica)
- [Muhimman Bayanai](#important-notes)

---

## Gudanarwa Cikin Sauri

> **Kana son ka karɓi baƙuncin tsarin da kanka da umarni guda?** Duba
> [Jagorar Karɓar Baƙuncin Tsarin da Kanka](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (hoton da aka wallafa +
> Redis, loopback kawai, babu zaɓin profile). Gudanarwa Cikin Sauri da ke ƙasa ita ce
> hanyar container guda ɗaya ga masu amfani waɗanda tuni suke gudanar da Redis a wani wuri.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Tare da Fayil ɗin Muhalli

```bash
# Da farko, kwafi kuma gyara .env
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
# Profile na asali (babu kayan aikin CLI)
docker compose --profile base up -d

# Profile na CLI (Claude Code, Codex, OpenClaw a haɗe)
docker compose --profile cli up -d

# Profile na host (an fi tsara shi don Linux; yana mount binaries na CLI na host a matsayin read-only)
docker compose --profile host up -d

# Haɗa CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Profiles da Ake Da Su

OmniRoute yana zuwa da Compose profiles guda huɗu. Zaɓi wanda ya dace da muhallinka.

| Profile           | Sabis            | Lokacin amfani                                                                                                                                                           | Umurni                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (na asali) | `omniroute-base` | Sabar da ba ta da graphical interface / mafi ƙarancin runtime, ba a haɗa provider CLIs ba                                                                                | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentic workflows waɗanda ke kiran `omniroute providers/setup/doctor` da CLIs da aka haɗa (Codex, Claude Code, Droid, OpenClaw)                                          | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux hosts da ke son samun damar irin ta `network_mode` zuwa CLIs na host ta hanyar mount ɗin `~/.local/bin`, `~/.codex`, `~/.claude`, da sauransu a matsayin read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Gudanar da [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar a port `8317` don upstream CLI proxying                                                   | `docker compose --profile cliproxyapi up -d` |

> Ana iya haɗa profiles da yawa: `docker compose --profile cli --profile cliproxyapi up -d`.

## Daidaita kayan aikin CLI na na'urar mai masauki lokacin da OmniRoute ke gudana a Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` da maɓallin
**Ajiye saituna** na dashboard duk suna rubuta fayiloli kamar `~/.codex/*.config.toml`. Waɗannan hanyoyin
suna da ma'ana ne kawai a kan na'urar da CLI yake gudana a zahiri. Idan aka gudanar da su a cikin
container, rubutun zai shiga home na container ɗin (`/home/node` —
image ɗin yana gudana da `USER node`), inda babu wani CLI na na'urar mai masauki da zai taɓa karanta shi, kuma inda za a
share shi da zarar an sake ƙirƙirar container ɗin.

OmniRoute yana gano wannan kuma ya ƙi yin rubutun tare da umarnin abin da za a yi maimakon
bayar da rahoton nasarar da ba za ka iya amfani da ita ba: CLI yana fita da `2`, kuma API yana amsawa da `422`
tare da `containerEphemeralTarget: true`.

### Shawara: gudanar da CLI a kan na'urar mai masauki, OmniRoute kuma a Docker

Container ɗin yana samar da API; CLI kuma yana daidaita kayan aikin da ke kan na'urarka.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # haɗa CLI da container ɗin
omniroute setup-codex                      # yana rubuta ainihin ~/.codex a kan na'urarka
```

Wannan shi ne zaɓin da ya dace idan Codex, Claude Code, Cursor ko makamantansu suna gudana a kan
kwamfutar tafi-da-gidanka — wanda shi ne tsarin da aka fi amfani da shi.

### Madadin: yi bind-mount na kundin saitunan na'urar mai masauki (profile na `host`)

Idan kana son container ɗin da kansa ya rubuta saitunan na'urar mai masauki, shigar da
kundin ta hanyar mount sannan ka nuna `CLI_CONFIG_HOME` zuwa tushen mount ɗin. Profile na `host`
ya riga ya yi wannan:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ne ke sa hanyar ta zama abin amincewa: OmniRoute yana karanta
`/proc/self/mountinfo` kuma yana ba da damar rubutu zuwa hanyoyin da aka yi mount (da kuma kundin
da ƙananan kundinsu aka yi mount, wanda shi ne ainihin tsarin `/host-home` da ke sama), yayin da
har yanzu yake ƙin waɗanda ba a yi musu mount ba.

### Hanyar gaggawa: daidaita CLI na container ɗin kansa (yi amfani da hankali)

Lokacin da CLI ɗin suke a zahiri a cikin container (profile na `cli`), rubutun
da gangan ake yi. Wuce `--allow-container-write` ga kowane umarnin `setup-*`, ko saita
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` don server. Za a ci gaba da rubutun
tare da gargaɗin cewa ba zai dawwama bayan container ɗin ba.

> **Gargaɗin tsaro — profile na `cli` + mount na `docker.sock`.**
> Profile na `cli` yana yin bind-mount na `/var/run/docker.sock` domin mai sabuntawa ta atomatik
> da ke cikin container ya iya sake ƙirƙirar stack daga daemon na na'urar mai masauki
> (`src/lib/system/autoUpdate.ts` yana binciken wannan socket kuma yana tsallake
> hanyar Docker idan babu shi). Wannan socket ɗin **iyakacin amincewa ne na root na
> na'urar mai masauki**: duk wani abu da zai iya isa gare shi yana sarrafa Docker daemon na na'urar mai masauki a matsayin
> root — yana iya ƙirƙira, dubawa, dakatarwa da cire kowane container a kan na'urar.
> Abubuwan da wannan ke nufi:
>
> 1. **Kada ka taɓa buɗe port na profile na `cli` ga network.** Wallafa
>    shi a kan `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profile na `cli` da ake iya isa gare shi daga LAN yana mayar da duk wani RCE na matakin dashboard zuwa
>    cikakken kutse cikin na'urar mai masauki.
> 2. **Kada ka yi bind na wasu ƙarin kundin na'urar mai masauki zuwa profile na `cli`.**
>    Docker socket tare da kowane ƙarin mount yana ba container cikakken ikon
>    karantawa/rubutawa ga filesystem da saitunan na'urar mai masauki. Idan kana buƙatar wani kayan aiki ya
>    ga project, gudanar da shi a kan na'urarka ta amfani da binary na CLI — kada ka yi masa mount
>    zuwa cikin container na `cli`.
>
> Idan ba ka buƙatar sabuntawa ta atomatik daga cikin container, ka bar profile na `cli` a kashe
> (`COMPOSE_PROFILES=core,redis` ko mafi gajarta). Sauran profiles ba sa
> yin mount na Docker socket.
>
> Duba `docs/security/MITM-TPROXY-DECRYPT.md` (git; ba a haɗa shi cikin `/docs` ba) don samfurin barazana mai alaƙa
> da MITM, da kuma `docs/security/SUPPLY_CHAIN.md` don jerin asalin binary na
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute yana dogara da Redis don tallafa wa mai iyakance ƙimar buƙatu mai rarrabuwa da ma'ajiyar cache da ake rabawa. Ana **ayyana sabis ɗin `redis` a koyaushe** a cikin `docker-compose.yml` (ba shi da shingen profile), kuma yana farawa tare da kowane profile.

| Bayani                  | Ƙima                                         |
| ----------------------- | -------------------------------------------- |
| Image                   | `redis:7-alpine`                             |
| Sunan container         | `omniroute-redis`                            |
| Port na ciki            | `6379`                                       |
| Port na host (override) | `REDIS_PORT` (tsoho shi ne `6379`)           |
| Bind na host (override) | `REDIS_BIND_HOST` (tsoho shi ne `127.0.0.1`) |
| Volume                  | `omniroute-redis-data` → `/data`             |
| Binciken lafiya         | `redis-cli ping` (tazarar 10s)               |

Environment variables masu alaƙa:

- `REDIS_URL` — connection string da ake saka wa app (`redis://redis:6379` a matsayin tsoho).
- `REDIS_PORT` — taswirar port na ɓangaren host don container na Redis.
- `REDIS_BIND_HOST` — interface na host da ake wallafa port a kai. Tsohonsa shi ne `127.0.0.1`.

> **Dalilin amfani da loopback a matsayin tsoho:** sidecar yana aiki ba tare da `requirepass` ba, kuma
> containers na app suna isa gare shi ta hanyar compose network (`redis:6379`) — port da aka wallafa
> yana nan ne kawai don kayan aikin ɓangaren host (`redis-cli`, `npm run dev` na gida). Wallafawa a kan
> `0.0.0.0` zai fallasa Redis mara tantancewa ga kowane host a LAN ɗinka. Idan ka saita
> `REDIS_BIND_HOST=0.0.0.0`, ƙara `--requirepass` ga `command:` na sabis ɗin shi ma.

Ba a ba da shawarar **kashe Redis** ba (mai iyakance ƙimar buƙatu zai koma amfani da madadin cikin-memory mai ƙarancin inganci). Idan dole ne, ko dai ka cire/ka mayar da service block na `redis:` a cikin `docker-compose.yml` zuwa comment, ko ka rage scale ɗinsa zuwa sifili:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Don keɓantaccen hoton production da ke aiki tare da dev, yi amfani da `docker-compose.prod.yml`.

| Bayani                     | Ƙima                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| Fayil                      | `docker-compose.prod.yml`                                                                    |
| Port na dashboard na tsoho | `PROD_DASHBOARD_PORT=20130` (an haɗa shi da `${DASHBOARD_PORT:-20128}` na ciki)              |
| Port na API na tsoho       | `PROD_API_PORT=20131`                                                                        |
| Image                      | `omniroute:prod` (an gina daga target na `runner-cli`)                                       |
| Container na Redis         | `omniroute-redis-prod` (`redis:8.6.2`, keɓaɓɓen volume na `redis-prod-data`)                 |
| Volume na bayanai          | `omniroute-prod-data` (mai suna, ana adana shi a duk lokacin sake ginawa)                    |
| Binciken lafiya            | `node healthcheck.mjs` + `redis-cli ping`, tare da `depends_on` da lafiyar Redis ke shingewa |

Yadda ake amfani:

```bash
# Gina kuma fara stack na production
docker compose -f docker-compose.prod.yml up -d --build

# Nuna logs kai tsaye
docker compose -f docker-compose.prod.yml logs -f

# Dakatar da komai (a bar volumes)
docker compose -f docker-compose.prod.yml down
```

Stack na prod yana aiki a layi ɗaya da compose na dev (sunayen container, ports, da volumes sun bambanta), don haka za ka iya ci gaba da gyare-gyare a gida yayin da production yake ci gaba da aiki.

## Matakan Dockerfile

Ma'ajiyar tana zuwa da Dockerfile mai matakai da yawa (`Dockerfile`). An samar da matakai uku; zaɓi `target` da ya dace da amfaninka.

| Mataki        | Hoton tushe           | Manufa                                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Yana girka abubuwan dogaro (`npm ci --legacy-peer-deps`) sannan ya gudanar da `npm run build` (Turbopack ta tsohuwa — duba Albarkatun lokacin ginawa a ƙasa)                |
| `runner-base` | `node:26-trixie-slim` | Muhallin gudanarwar samarwa tare da fitowar Next.js mai cin gashin kanta. **Ba a haɗa CLI na masu samarwa ba.**                                                             |
| `runner-cli`  | `runner-base`         | Yana ƙara `git`, `docker.io`, `docker-compose` da CLI na gama-gari: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Zaɓi wannan don ayyukan wakilai.** |

Gina takamaiman target da hannu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Albarkatun lokacin ginawa

Build args guda uku ne ke sarrafa yawan albarkatun da matakin `builder` ke amfani da su. Na lokacin ginawa ne kawai —
`OMNIROUTE_MEMORY_MB` (a ƙasa) wani saitin lokacin gudanarwa ne daban.

| Build arg                   | Tsoho  | Tasiri                                                                                         |
| --------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0` yana ginawa da webpack a maimakon haka. Ƙarancin kololuwar ƙwaƙwalwa, amma a hankali.      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Iyakar heap ta V8 (`--max-old-space-size`) don `next build` da aka ƙaddamar.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Yana ciyar da `CIRCLE_NODE_TOTAL`; Next yana samo `workers = N - 1` don tattara bayanan shafi. |

`OMNIROUTE_BUILD_WORKERS` shi ne abin da za a ƙara a kan babban builder, kuma shi ne abin da ya kamata
a fara zargi idan gini mai ƙarancin albarkatu ya mutu **bayan** `✓ Compiled successfully`. Kowane
worker na bayanan shafi process ne mai zaman kansa, haka ma babban `next build` ɗin kansa;
gwajin maimaitawa a VPS na ainihi (issue #7518) ya auna kololuwar RSS ta kowane process a
~4.5 GB ba tare da dogaro da tutar heap ta `NODE_OPTIONS` ba (Turbopack yana yin tarawa a cikin
ƙwaƙwalwar asali/Rust da ke wajen heap ta V8). An tsara tsohon ƙimar `2` (→ worker 1, process
2 gaba ɗaya) don runners masu 16 GB / 4 vCPU da GitHub ke karɓar baƙuncinsu waɗanda
pipeline na wallafawa ke amfani da su. A `8` (→ workers 7), ƙwaƙwalwar wannan runner ta ƙare kuma
buildkit ya gaza matakin da `ResourceExhausted: ... cannot allocate memory`;
`3` (→ workers 2) ma bai samu isasshen wuri ba bayan an auna RSS ta kowane process
kai tsaye maimakon yin hasashe. `tests/unit/docker-build-memory-budget.test.ts`
yana yin lissafin bisa ƙimar da aka auna kuma yana gazawa idan ɗaya daga cikin saitunan biyu
ya zarce ƙarfin runner.

Turbopack yana yin tarawa a cikin ƙwaƙwalwar Rust ta asali wadda take **a wajen** heap ta V8, saboda haka
`OMNIROUTE_BUILD_MEMORY_MB` ba ya ƙayyade ta. A kan na'ura mai iyakar ƙwaƙwalwa,
OOM killer zai kashe ginin da SIGKILL ba tare da wani rubutun kuskure ba — kawai zai
tsaya a tsakiyar `Creating an optimized production build`, wanda zai yi kama da makalewa
maimakon ƙarewar ƙwaƙwalwa. Idan na'urar ginin tana da ƙarancin albarkatu, sauya bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

An kunna `webpackBuildWorker`, don haka `next build` yana gudanar da babban process **da** worker
process, kuma kowannensu yana mutunta `OMNIROUTE_BUILD_MEMORY_MB` daban. Saita iyakar container
zuwa sama da kusan ninkin wannan ƙimar biyu, ba sau ɗaya ba.

An auna a kan wannan bishiyar (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Iyakar container | Sakamako                                          |
| --------- | ---------------- | ------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | OOM ya kashe shi a duka biyun, ba tare da saƙo ba |
| webpack   | 8 GiB            | An kashe build worker da SIGKILL                  |
| webpack   | 12 GiB           | ya yi nasara, kololuwarsa ta kai 11.1 GiB         |

### Saitunan tsoho na lokacin gudanarwa

Saitunan tsoho da `runner-base` ke fitarwa: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Halayyar ƙwaƙwalwa a cikin Docker:

- Hoton yana saita `OMNIROUTE_MEMORY_MB=1024` kuma yana samo `NODE_OPTIONS=--max-old-space-size=1024` daga gare shi.
- Standalone launcher ne ke fara ainihin server process, wanda yake karanta `OMNIROUTE_MEMORY_MB` kuma ya haɗa `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node yana amfani da ƙima ta ƙarshe idan an maimaita `--max-old-space-size`, don haka saita `OMNIROUTE_MEMORY_MB` yana sarrafa ingantacciyar iyakar heap ta Docker.
- Saboda hoton koyaushe yana saita shi, tsarin madadin launcher da ke daidaitawa bisa RAM ba ya aiki a ƙarƙashin Docker. Ƙara shi a sarari gwargwadon nauyin aikin (teburin da ke ƙasa). `2048` har yanzu ya yi ƙanƙanta ga `/v1/responses` na coding-agent.

### RAM na lokacin gudanarwa don wakilan rubuta lamba

Tsohon saitin Docker na 1 GiB ƙaramar iyaka ce don dashboard/hira mai sauƙi, ba girman samarwa ba. Dogayen jikin `POST /v1/responses` (ɗaruruwan saƙonni, kayan aiki masu yawa) suna riƙe zane-zanen bayanai da yawa a ƙwaƙwalwa yayin matsawa. Buƙatu biyu masu cin karo da juna na kusan ~3 MiB / ~750k-token sun sa V8 ya dakata a tsohon sarari na **12 GiB** (`FATAL ERROR: Reached heap limit`) kuma sun kuma kai ga cgroup OOM na 16 GiB. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Saita **cgroup `--memory` sama da heap** — native buffers, SQLite, da bayanan wucin-gadi na matsawa suna wajen V8.

| Nauyin aiki                                                 | `OMNIROUTE_MEMORY_MB`        | Kwantena / cgroup  | Bayanan kula                                                                                                        |
| ----------------------------------------------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Dashboard, tattaunawa mai sauƙi guda                        | `1024` (tsohon saitin image) | ≥2 GiB             |                                                                                                                     |
| Wakilin coding guda (Claude/Codex/Grok)                     | `8192`                       | ≥10 GiB            | Zaman guda na `/v1/responses` da aka saba                                                                           |
| Dogayen `/v1/responses` guda biyu masu gudana a lokaci guda | `10240`–`12288`              | ≥12–16 GiB         | An auna katsewar V8 lokacin da heap ya kai kusan 12 GiB                                                             |
| Dogayen contexts guda uku ko fiye masu gudana a lokaci guda | kar a yi a process guda      | jera su / ƙara RAM | A tsohon saiti, izinin nauyin aiki mai nauyi guda 1 ne ke gudana; ƙara shi ba tare da RAM ba zai sake jawo katsewar |

`omniroute serve` a kan bare metal yana daidaitawa zuwa kusan 35% na RAM (an iyakance shi zuwa `[512, 4096]`) idan **ba a saita** `OMNIROUTE_MEMORY_MB` ba. Docker koyaushe yana saita `1024`, don haka wannan daidaitawar ba ta taɓa gudana a cikin official image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Muhimman Masu Sauyin Muhalli

Baya ga tsoffin saitunan da aka bayyana a [ENVIRONMENT.md](../reference/ENVIRONMENT.md), waɗannan masu sauyi ne suka fi muhimmanci yayin aiki a ƙarƙashin Docker:

| Mai Sauyi                     | Manufa                                                                                                                                                                                                                                                                     | Tsohon Saiti                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sirrin da ake rabawa don gadar WebSocket. **Ana buƙatarsa a yanayin samarwa** — saita shi zuwa ƙaƙƙarfan zaren bazuwar haruffa.                                                                                                                                            | ba a saita ba (dole a bayar) |
| `REDIS_URL`                   | Zaren haɗi don mai iyakance yawan buƙatu / tushen cache                                                                                                                                                                                                                    | `redis://redis:6379`         |
| `REDIS_PORT`                  | Tashar ɓangaren host don kwantenar Redis da aka haɗa                                                                                                                                                                                                                       | `6379`                       |
| `REDIS_BIND_HOST`             | Mahaɗin host da ake wallafa tashar Redis ɗin da aka haɗa a kai (loopback sai dai idan ka ƙara AUTH)                                                                                                                                                                        | `127.0.0.1`                  |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Path na host da ake ɗorawa cikin profile na `cli` a `/workspace/omniroute` don ayyukan sabunta kai                                                                                                                                                                         | `.` (directory na yanzu)     |
| `OMNIROUTE_MEMORY_MB`         | Matsakaicin heap na Node yayin aiki don sabar Docker mai zaman kanta; yana maye gurbin tsohon saitin image da ke sama. Wakilan coding: `8192`+ (duba [RAM na lokacin aiki](#runtime-ram-for-coding-agents)).                                                               | `1024`                       |
| `DASHBOARD_PORT` / `API_PORT` | Maye gurbin tashoshin da aka fallasa don dashboard (20128) da API (20129)                                                                                                                                                                                                  | `20128` / `20129`            |
| `APP_BIND_HOST`               | Mahaɗin host da docker-compose ke wallafa tashoshin dashboard/API/live-WS a kai. Tare da `REQUIRE_API_KEY=false` (tsohon saitin), `0.0.0.0` yana fallasa proxy na `/v1` marar tantancewa ga LAN — faɗaɗa shi kawai tare da `REQUIRE_API_KEY=true` ko reverse proxy a gaba. | `127.0.0.1`                  |
| `CLIPROXY_BIND_HOST`          | Mahaɗin host da docker-compose ke wallafa sidecar na `cliproxyapi` a kai — volume ɗin bayanansa yana riƙe bayanan shaidar masu samarwa.                                                                                                                                    | `127.0.0.1`                  |
| `OMNIROUTE_PLUGINS_DIR`       | Directory da na'urar binciken plugin ta lokacin aiki ke karantawa kuma take girka abubuwa a ciki. Saita shi lokacin da aka ɗora plugins ta bind-mount: tsohon saitin yana bin `HOME`, wanda image ba lallai ne ya fitar da shi ba.                                         | `~/.omniroute/plugins`       |
| `OMNIROUTE_BASE_PATH`         | Ƙaramin path na URL lokacin da aka wallafa manhajar a bayan reverse proxy (misali `/omniroute`)                                                                                                                                                                            | _(fanko = tushen)_           |
| `NEXT_PUBLIC_BASE_URL`        | Asalin adireshin browser na jama'a wanda ya haɗa da ƙaramin path (misali `https://host/omniroute`)                                                                                                                                                                         | ba a saita ba                |
| `PROD_DASHBOARD_PORT`         | Tashar dashboard ta ɓangaren host don `docker-compose.prod.yml`                                                                                                                                                                                                            | `20130`                      |
| `CLIPROXYAPI_PORT`            | Tashar ɓangaren host don sidecar na `cliproxyapi`                                                                                                                                                                                                                          | `8317`                       |

## Reverse Proxy a kan Ƙaramin Hanya (Traefik / nginx)

Ana haɗa `basePath` na Next.js cikin standalone bundle yayin ginawa. OmniRoute yana adana
ƙimar da aka haɗa a cikin sentinel file da ke tushen manhajar (ana rubuta shi yayin `npm run build`; ana karanta shi ta
`scripts/docker/ensure-docker-base-path.mjs`) sannan yana kwatanta shi da
`OMNIROUTE_BASE_PATH` lokacin da container ya fara aiki. Idan suka bambanta kuma an
gina image ɗin don tushen domain, entrypoint zai sake rubuta standalone manifests,
embedded `basePath`/`assetPrefix` literals (Next 16 yana samar da URLs na kadarorin SSR daga
`assetPrefix` kaɗai — patcher yana kwafin ƙaramin hanyar zuwa cikinsa), baked
`/_next/static` URLs na kadarori (client-reference manifests, media imports, prerendered
error pages) da kuma client `process.env` shim kafin `node dev/run-standalone.mjs`
ya fara aiki.

### Gina Compose (an ba da shawara)

Saita dukkan variables ɗin biyu a cikin `.env`, sannan a sake ginawa domin image da runtime su yi daidai:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` yana tura `OMNIROUTE_BASE_PATH` a matsayin Docker build-arg da kuma
runtime environment variable.

### Root image da aka riga aka gina + ƙaramin hanyar runtime

Ana gina images na `diegosouzapw/omniroute:*` da aka wallafa don tushen domain. Har yanzu za ka iya
saita `OMNIROUTE_BASE_PATH` a runtime; container zai yi wa bundle patch sau ɗaya lokacin farawa.
Haɗa shi da public origin mai dacewa:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Saita reverse proxy domin ya tura **cikakkiyar** external path (kada a cire
prefix). Ya kamata Traefik ya tura `PathPrefix(`/omniroute`)` zuwa container ba tare da
`StripPrefix` ba, domin Next.js ya karɓi `/omniroute/...` kuma ya gabatar da kadarori daga
`/omniroute/_next/...`.

Docker healthcheck yana bincika lightweight `/healthz` lifecycle endpoint wanda aka sa wa
active `OMNIROUTE_BASE_PATH` prefix. `/api/monitoring/health` zai ci gaba da kasancewa don
binciken matsaloli na mutum/dashboard; domin mayar da container HEALTHCHECK zuwa gare shi (misali
don tilasta deep health), saita `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Wannan path ɗin **deep** check ne (DB + taƙaitaccen bayani na monitoring) — ya dace da
Docker `HEALTHCHECK` da ba a yawan yi idan ka zaɓi komawa gare shi, amma **bai dace ba** da intervals na Kubernetes `livenessProbe`.

Ga orchestrators (Kubernetes, Nomad, da sauransu):

| Probe           | Abin da aka fi so                                                 | Abin da za a guje wa                                                 |
| --------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, ko TCP a kan main port (`PORT`, tsoho `20128`) | Amfani da `/api/monitoring/health` a matsayin liveness               |
| Readiness       | HTTP `GET /healthz`                                               | Gajerun timeouts da ke ɗaukar event-loop mai aiki a matsayin matacce |
| Deep / blackbox | `/api/monitoring/health`                                          | —                                                                    |

`/healthz` yana bayar da rahoton lifecycle na process (`ok` / `starting` / `stopping`). `/livez` yana
duba ko process yana raye ne kawai (200 duk lokacin da handler zai iya aiki; ba ya jiran
readiness). Dukansu har yanzu suna aiki a kan Node event loop ɗaya da request handling, saboda haka
catalog ko compression work mai cin CPU na iya jinkirta su — mai aiki ≠ matacce. Fi son TCP
liveness idan HTTP probes suna timeout. Cikakkiyar jagorar probes:
[Jagorar monitoring — shawarwarin Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose tare da Caddy (HTTPS Auto-TLS)

Ana iya fallasa OmniRoute cikin aminci ta amfani da samar da SSL ta atomatik na Caddy. Tabbatar cewa rikodin DNS A na yankinku yana nuna zuwa adireshin IP na sabarku.

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
      # Asalin da burauza ke gani don kiran-baya na OAuth, hanyoyin dashboard, da URL na jama'a da aka samar.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL na ciki daga saba zuwa saba don ayyukan da aka tsara / buƙatun kai-tsaye.
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

Caddy yana saita daidaitattun kanun turawa don kwantenar upstream. OmniRoute yana amfani da
`NEXT_PUBLIC_BASE_URL` a matsayin tabbataccen asalin jama'a don kiran-baya na OAuth da hanyoyin
jama'a da aka samar; rubuce-rubucen dashboard da aka tabbatar da izini suna amfani da buƙatun asali
ɗaya tare da kariyar CSRF da aka ɗaure da zaman. Kunna `OMNIROUTE_TRUST_PROXY` kawai don tsare-tsaren
tura manhaja na ci-gaba inda da gangan kuke son OmniRoute ya samo asalin jama'a daga amintattun
kanun da aka tura maimakon bayyanannen saiti.

## Cloudflare Quick Tunnel

Tallafin dashboard don tura manhaja ta Docker ya haɗa da **Cloudflare Quick Tunnel** mai dannawa sau ɗaya a `Dashboard → Endpoints`. Kunna shi a karon farko yana sauke `cloudflared` ne kawai lokacin da ake buƙata, yana fara ramin wucin gadi zuwa endpoint ɗinku na `/v1` na yanzu, sannan yana nuna URL ɗin `https://*.trycloudflare.com/v1` da aka samar kai tsaye a ƙarƙashin URL ɗinku na jama'a na yau da kullum.

Ana iya nuna ko ɓoye bangarorin ramin endpoint (Cloudflare, Tailscale, ngrok) daga `Settings → Appearance` ba tare da canza yanayin rami mai aiki ba.

### Bayanan Rami

- URL na Quick Tunnel na wucin gadi ne kuma suna canzawa bayan kowane sake farawa.
- Ba a maido da Quick Tunnels ta atomatik bayan sake farawa na OmniRoute ko kwantena. Sake kunna su daga dashboard idan ana buƙata.
- Shigarwar da ake sarrafawa a halin yanzu tana tallafawa Linux, macOS, da Windows a kan `x64` / `arm64`.
- Quick Tunnels da ake sarrafawa suna amfani da jigilar HTTP/2 ta tsohuwa don kauce wa gargaɗin buffer na QUIC UDP masu hayaniya a muhallan kwantena masu ƙuntatawa. Saita `CLOUDFLARED_PROTOCOL=quic` ko `auto` idan kuna son wata hanyar jigilar daban.
- Hotunan Docker sun ƙunshi tushen CA na tsarin kuma suna miƙa su ga `cloudflared` da ake sarrafawa, wanda ke hana gazawar amincewar TLS lokacin da ramin ke fara aiki a cikin kwantena.
- Saita `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` idan kuna son OmniRoute ya yi amfani da binary da ke akwai maimakon sauke wani.

## Tags na Hoto

| Hoto                     | Tag      | Girma  | Bayani                                                          |
| ------------------------ | -------- | ------ | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer tabbatacce mafi girma da aka **buga** (ba git `main` ba) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Ɗaure wannan nau'in tag don GitOps                              |

Manifest na dandamali da yawa: `linux/amd64` + `linux/arm64` na asali (Apple Silicon, AWS Graviton, Raspberry Pi). Docker yana zaɓar tsarin gine-ginen da ya dace ta atomatik; miƙa `--platform linux/amd64` idan kuna buƙatar tilasta kwaikwayon AMD64 a kan masaukin ARM.

### Tashoshin Fitarwa

OmniRoute yana wallafa tashoshin Docker daban-daban don fitowar tabbatacciya, gwajin reshen fitarwa mai aiki, da gine-ginen ci gaba.

| Tasha                           | Tushe                                        | Sauyawa                          | Amfanin da aka ba da shawara                                                                                                    |
| ------------------------------- | -------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Fitowa mai sa hannu/mai sigar                | Ba ya canzawa                    | Tura manhajar samarwa da ke ɗaure da takamaiman fitowa                                                                          |
| `:latest` / `:latest-web`       | SemVer tabbatacce mafi girma da aka **buga** | Manunin tabbatacce mai sauyawa   | Yana bin fitowar tabbatacciya **bayan** aikin wallafa SemVer — **ba ya** bin `main` ko commits na `release/v*` da ba a fitar ba |
| `:next` / `:next-web`           | Reshen `release/v*` na yanzu na tsohuwa      | Manunin kafin-fitowa mai sauyawa | Gwada gyare-gyaren da suka shiga reshen fitarwa mai aiki amma ba su shiga fitowa tabbatacciya ba tukuna                         |
| `:main` / `:main-web`           | Reshen `main`                                | Manunin ci gaba mai sauyawa      | Don gwajin ci gaba da haɗa tsarin kawai                                                                                         |

#### Amfani da tashar kafin-fitowa

Ana sake gina tashar `next` a duk lokacin da aka yi push zuwa reshen `release/v*` na yanzu na tsohuwa, kuma ana wallafa ta don AMD64 da ARM64. Tsofaffin rassan kulawa ba za su iya rubuta a kanta ba. Tashar tana samar da hoton da za a iya jawowa don gyare-gyaren da aka haɗa cikin reshen fitarwa mai aiki kafin a ƙirƙiri tag tabbatacce na gaba.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Don Docker Compose, sauya tag na hoton da profile ɗin da aka zaɓa yake amfani da shi, sannan a jawo kuma a sake ƙirƙirar sabis ɗin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Tsaro da komawa baya

`next` tasha ce ta kafin-fitowa mai shawagi. Tana iya canzawa a duk wani push zuwa reshen fitarwa mai aiki, kuma **ba a tallafa mata don amfani a samarwa ba**. Ɗaure digest na hoton yayin tantance takamaiman gini:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kafin gwaji, yi ajiyar madadin kundin bayanan OmniRoute ko kundin bayanan da aka haɗa ta bind-mount. Don komawa baya, maido da ingantacciyar siga ko digest da aka yi amfani da ita a baya sannan a sake ƙirƙirar container ɗin:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build na reshen release ba zai taɓa iya matsar da `latest` ba; ingantacciyar sigar semantic version da ta cancanta ce kawai za ta iya ɗaukaka stable pointer. Hotunan `next` suna ci gaba da binciken hoton release da shingen hana ci gaba idan akwai raunin tsaro mai matakin CRITICAL.

**`latest` ba tabbacin cewa ya yi daidai da git na yanzu ba ne.** Gyare-gyaren da aka haɗa a `main` ko a reshen `release/v*` mai aiki **ba sa** cikin `:latest` har sai an wallafa hoton stable SemVer kuma aikin wallafawa ya ɗaukaka `:latest` (digest iri ɗaya da na wannan SemVer). Idan `latest` yana kamar bai sabunta ba alhali GitHub ya riga ya nuna gyaran, jawo `:next` don gwada reshen release ko jira tag na SemVer.

| Abin da kake so                                                                      | Yi amfani da                             |
| ------------------------------------------------------------------------------------ | ---------------------------------------- |
| GitOps / production wanda ba dole ba ne ya karkata                                   | Kulle zuwa `:X.Y.Z` (ko digest na hoton) |
| Bi ingantattun sigogin da aka wallafa kuma amince da sake ƙirƙirawa a kowace release | `:latest`                                |
| Gwada commits na `release/v*` waɗanda ba a wallafa ba tukuna                         | `:next` (ba don production ba)           |
| Gwada `main`                                                                         | `:main` (ba don production ba)           |

## Samuwa: SQLite na asali kwafi guda ɗaya ne

Docker / Kubernetes OmniRoute na asali yana da **tsarin Node guda ɗaya + marubucin SQLite guda ɗaya**. **Ba a tallafa wa** babban matakin samuwa a wannan tsarin.

| Ƙuntatawa                                             | Sakamako                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marubuci guda ɗaya                                    | **Kada** a gudanar da kwafi da yawa suna amfani da fayil ɗin SQLite guda ɗaya. Hakan yana lalata DB.                                                                                                                                                                                                                                                                    |
| Sake ƙirƙirawa / sake farawa / kashewa ta HEALTHCHECK | **Cikakken katsewar sabis** ga SSE da ke gudana, zaman dashboard, da yanayin da ke cikin ƙwaƙwalwa. Duk abokan ciniki da ke haɗe za su yanke. Sabbin buƙatu a lokacin da babu endpoint za su sami **`502 Bad Gateway: Unknown error`** daga reverse-proxy, ba OmniRoute JSON ba — abokan ciniki ba za su iya bambanta wannan da gazawar mai samar da sabis ba (#11015). |
| Event loop ɗaya da `/healthz`                         | Aikin catalog ko compression mai nauyi na iya jinkirta probes; sannan ɗan gajeren timeout ya sake kunna kwafin da yake **shi kaɗai**.                                                                                                                                                                                                                                   |

**Jadawalin probe** (duba kuma [shawarwarin probe na Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe          | Manufa                                                               | Kada a yi amfani da                                                   |
| -------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Liveness       | TCP a kan `PORT` (na asali `20128`), ko HTTP `/healthz` mai sassauci | `/api/monitoring/health`                                              |
| Readiness      | HTTP `GET /healthz`                                                  | Matsattsun timeout da ke ɗaukar cunkoson event-loop a matsayin mutuwa |
| Zurfi / mutane | `/api/monitoring/health`                                             | Liveness na kubelet mai sarrafa kansa                                 |

**Sabuntawa:** a yi tsammanin kowane zaman zai yanke. A kwashe abokan ciniki idan zai yiwu; babu rolling update a SQLite na asali. Compose `restart: unless-stopped` tare da Docker `HEALTHCHECK` su ma za su maye gurbin tsarin da yake shi kaɗai idan container ya zama Unhealthy — tasirin lalacewar iri ɗaya ne.

Yankin tsarin Kubernetes don **kwafi guda ɗaya** (dole ne a yi amfani da Recreate; kada a ƙara `replicas` a kan fayil ɗin SQLite guda ɗaya):

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

Jinkirin `preStop` yana ba kube damar cire endpoints na Service kafin SIGTERM, domin **sabuwar** zirga-zirga ta daina isa ga tsarin da ke mutuwa. Ana ba SSE na `/v1/responses` da ke gudana damar ƙarewa har zuwa `SHUTDOWN_TIMEOUT_MS` (na asali 30s) ta hanyar heavyweight admission leases (#11015). Sabbin buƙatun da har yanzu suka isa ga tsarin za su sami `503` + `Retry-After: 5`. Tazarar da babu endpoint ta Recreate har sai maye gurbin ya zama Ready tana ci gaba da zama cikakken katsewar sabis — wannan shi ne tsarin SQLite, ba kuskuren saitin probe ba.

External Postgres / multi-writer HA **ba** ingantacciyar hanyar asali ce da aka rubuta takardunta ba. Idan kana buƙatar HA, ka ci gaba da amfani da kwafi guda ɗaya ko ka gudanar da tsarin da aikin ya gwada kuma ya rubuta takardunsa daban. Aikin Postgres/MySQL yana cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Har sai an fitar da wannan, hanya ɗaya tilo da ake tallafawa don ninka ƙarfin **manyan** `/v1/responses` ita ce matakai masu zaman kansu N (sashe na gaba), ba `replicas > 1` a kan volume guda ɗaya ba.

## Faɗaɗa a kwance: matakai N masu zaman kansu

Tsarin Node guda ɗaya yana da **tarin V8 guda ɗaya**. Buƙatun coding-agent guda biyu masu cin karo, masu kusan ~3 MiB / ~750k-token na `POST /v1/responses` (RTK + Caveman), suna katse wannan tarin a kusan ~12 Gi (`FATAL ERROR: Reached heap limit`) kuma za su iya jawo OOM a cgroup mai 16 Gi. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Wannan ma’aunin gargaɗin **kasafin ƙwaƙwalwa** ne, ba ƙayyadadden iyakar samfur na buƙatun `/v1/responses` dogaye guda biyu masu gudana lokaci guda ba. Ana sarrafa shigar tattaunawa masu nauyi ta hanyar kasafin bytes na shigarwa da ake ƙirƙira ta atomatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) wanda aka ƙayyade daga wannan iyakar V8/cgroup ɗin — ɗaga ƙimarsa fiye da haka (ko sa tsohuwar iyakar adadin buƙatu ta `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) a kan tsarin da aka riga aka ƙayyade girmansa zai sake haifar da katsewar. Ƙananan tattaunawa, `/healthz`, `/v1/models`, da MCP **ba sa** cikin wannan iyakar.

### Tsari guda ɗaya: fiye da `/v1/responses` dogaye guda biyu

Tsari mai **ƙoshin lafiya** (tarin da ke ƙasa da `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, tsohuwar ƙima `0.75`) **zai iya** gudanar da buƙatun `POST /v1/responses` dogaye fiye da biyu lokaci guda idan kasafin bytes na buƙatun da ke gudana a faɗin tsarin (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) har yanzu yana da sarari. Jikunan buƙata masu kaiwa ko wuce `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (tsohuwar ƙima 256 KiB) suna ɗaukar lasisin aiki mai nauyi iri ɗaya da buƙatu masu tsarin bayanai mai nauyi, kuma suna amfani da hanyar kaucewa ta [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Gudanar da abokan hulɗar SSE dogaye da dama lokaci guda (masu gudanarwa galibi suna buƙatar 40–50) tambayar **kasafin ƙwaƙwalwa** ce — a ƙayyade girman tarin + guraben farko/ƙarin sarari + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ba ƙaƙƙarfan iyakar samfur ta “mafi yawa 2” ba. Tarin da ke ƙarƙashin matsin lamba har yanzu yana rage kaya da `503` da za a iya sake gwadawa, don kada matsalar #7849 ta dawo.

Don **ninka taruka** (wuraren old-space na V8 masu zaman kansu) **a yau**:

| Yi                                                                                                                                                                                                     | Kada a yi                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Gudanar da **containers/pods guda N**, kowanne da **nasa** `DATA_DIR` / volume                                                                                                                         | Saita `replicas > 1` domin su yi amfani da fayil ɗin SQLite guda ɗaya |
| Ƙayyade ayyuka masu nauyi da ke gudana + ƙarin sarari na lafiya daga kasafin tarin / bytes na ayyukan da ke gudana; 1–2 ita ce tsohuwar ƙima mai taka-tsantsan ta #7849, ba ƙaƙƙarfan iyakar samfur ba | Ba tsari guda ɗaya RAM mai ninki 8 da iyakar adadi marar iyaka        |
| Na zaɓi: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` don **ƙididdigogin iyaka na bai ɗaya**                                                                                                   | Ɗauki Redis a matsayin SQLite na bai ɗaya — ba haka yake ba           |
| Kwafi sirrin masu samarwa zuwa kowane instance (ko a amince da dashboards da aka rarraba)                                                                                                              | Yi tsammanin dashboard guda ɗaya / call-log guda ɗaya a duk instances |
| Sanya kowane load balancer a gaba; manne wa API key ko session ya isa                                                                                                                                  | Buƙaci middleware mai la’akari da girma na takamaiman mai samarwa     |

Kayan aiki: adadin `/v1/responses` dogaye da ke gudana lokaci guda a kowane instance tambayar **kasafin ƙwaƙwalwa** ce (tarin + bytes na buƙatun da ke gudana / #10110). `DATA_DIR`s guda `N` masu zaman kansu har yanzu suna ninka taruka: dole ne RAM na host ya iya ɗaukar `N × cgroup`, ba “pod guda ɗaya mai 16 Gi tare da N=8” ba. Kada a taɓa amfani da `replicas > 1` a kan fayil ɗin SQLite guda ɗaya.

Misalin Compose (taruka biyu, volumes biyu — ba `deploy.replicas: 2` ba):

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

Yawaita a cikin tsari (tare da matsawa a wajen HTTP isolate) yana cikin [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster mai ma’ana guda ɗaya a kan ma’ajiya mai ɗorewa ta bai ɗaya yana cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Muhimman Bayanan Kula

- **Yanayin SQLite WAL:** Ya kamata a bari `docker stop` ya kammala aiki domin OmniRoute ya iya rubuta sabbin canje-canje na ƙarshe zuwa cikin `storage.sqlite`. Fayilolin Compose da aka haɗa sun riga sun saita lokacin jira na dakatarwa na 40s. Idan kana gudanar da image ɗin kai tsaye, ka ci gaba da amfani da `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Saita shi zuwa `true` idan ana sarrafa madadin bayanai na yau da kullum/kafin-rubutawa daga waje. Ƙaura ta bayanan da suke akwai har yanzu tana buƙatar nata ingantaccen kwafin kariya mai ɗorewa da kariyar ƙaura mai yawa.
- **Dawwamar Bayanai:** Koyaushe ka haɗa volume zuwa `/app/data` domin adana database, keys, da saitunanka a duk lokacin da aka sake kunna container.
- **Saitin Port:** Sauya environment variable na `PORT` domin canza port na asali na `20128`.

## Duba Kuma

- [Jagorar Ƙaddamarwa a VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Saitin VM + nginx + Cloudflare
- [Jagorar Ƙaddamarwa a Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Ƙaddamarwa zuwa Fly.io
- [Saitin Environment](../reference/ENVIRONMENT.md) — Cikakken bayani game da `.env`
