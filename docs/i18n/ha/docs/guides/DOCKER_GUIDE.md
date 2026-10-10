# 🐳 Docker Guide — OmniRoute (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Cikakken bayanin tura Docker. Don farawa cikin sauri, duba [sashen Docker na README](../README.md#-docker).

## Abubuwan da ke Ciki

- [Gudanarwa Cikin Sauri](#quick-run)
- [Tare da Fayil ɗin Muhalli](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profiles da Ake da Su](#available-profiles)
- [Saita kayan aikin CLI na host lokacin da OmniRoute ke gudana a Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose na Production](#production-compose)
- [Matakan Dockerfile](#dockerfile-stages)
- [Muhimman Environment Variables](#critical-environment-variables)
- [Docker Compose tare da Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Tags na Image](#image-tags)
- [Samuwar Sabis: SQLite na asali yana amfani da replica guda ɗaya](#availability-default-sqlite-is-single-replica)
- [Kurakuran yanki na Gemini a cikin Docker](#gemini-regional-errors-inside-docker)
- [Muhimman Bayanan Kula](#important-notes)

---

## Gudanarwa Cikin Sauri

> **Kana son ɗaukar nauyin sabis ɗin da kanka da umarni guda ɗaya?** Duba
> [Jagorar Self-Host](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image da aka wallafa +
> Redis, loopback kawai, babu zaɓin profile). Hanyar Gudanarwa Cikin Sauri da ke ƙasa ita ce
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
# Da farko, kwafi sannan ka gyara .env
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

# Profile na CLI (an haɗa Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Profile na host (an fi tsara shi don Linux; yana mount binaries na CLI na host a matsayin read-only)
docker compose --profile host up -d

# Profile na yanar gizo (Chromium/Playwright don providers na zaman yanar gizo)
docker compose --profile web up -d

# Haɗa CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Profiles da Ake da Su

OmniRoute yana zuwa da Compose profiles don manyan hanyoyin tura tsarin. Zaɓi wanda ya dace da muhallinka.

| Profile           | Sabis            | Lokacin amfani                                                                                                                                                          | Umarni                                       |
| ----------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (na asali) | `omniroute-base` | Server marar GUI / mafi ƙarancin runtime, ba a haɗa provider CLIs ba                                                                                                    | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentic workflows waɗanda ke kiran `omniroute providers/setup/doctor` da CLIs da aka haɗa (Codex, Claude Code, Droid, OpenClaw)                                         | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux hosts da ke son samun dama irin ta `network_mode` zuwa CLIs na host ta hanyar mount ɗin `~/.local/bin`, `~/.codex`, `~/.claude`, da sauransu a matsayin read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Gudanar da [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar a port `8317` don upstream CLI proxying                                                  | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Providers na zaman yanar gizo da ke buƙatar browser: `gemini-web`, `claude-web`, `claude-turnstile` (yana gina `runner-web`, an haɗa Chromium)                          | `docker compose --profile web up -d`         |

> Ana iya haɗa profiles da yawa: `docker compose --profile cli --profile cliproxyapi up -d`.

## Saita kayan aikin CLI na host lokacin da OmniRoute ke gudana a Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` da maɓallin
**Ajiye saiti** na dashboard duk suna rubuta fayiloli kamar `~/.codex/*.config.toml`. Waɗannan hanyoyin
suna da ma’ana ne kawai a na’urar da CLI ɗin yake gudana a kanta. Idan aka gudanar da su a cikin
container, rubutun zai sauka a home na container ɗin (`/home/node` —
image ɗin yana gudana da `USER node`), inda babu wani CLI na host da zai taɓa karanta shi kuma inda za a
share shi da zarar an sake ƙirƙirar container ɗin.

OmniRoute yana gano wannan kuma ya ƙi yin rubutun tare da umarni maimakon
bayar da rahoton nasarar da ba za ka iya amfani da ita ba: CLI yana fita da `2`, kuma API yana amsawa da `422`
tare da `containerEphemeralTarget: true`.

### Shawara: gudanar da CLI a host, OmniRoute kuma a Docker

Container ɗin yana samar da API; CLI kuma yana saita kayan aikin host ɗinka.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nuna wa CLI container ɗin
omniroute setup-codex                      # yana rubuta ainihin ~/.codex a host ɗinka
```

Wannan shi ne zaɓin da ya dace idan Codex, Claude Code, Cursor ko makamantansu suna gudana a
laptop ɗinka — wanda shi ne tsarin da aka fi amfani da shi.

### Madadin: yi bind-mount na kundin adireshin saitin host (`host` profile)

Idan kana son container ɗin da kansa ya rubuta saitin host ɗinka, yi mount na
kundin adireshin a ciki sannan ka nuna `CLI_CONFIG_HOME` zuwa tushen mount ɗin. `host` profile
ya riga ya yi wannan:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ne yake sa hanyar ta zama abin amincewa: OmniRoute yana karanta
`/proc/self/mountinfo` kuma yana ba da damar rubutu zuwa hanyoyin da aka yi wa mount (da kuma kundin adireshin
da ’ya’yansu mounts ne, wanda shi ne ainihin tsarin `/host-home` da ke sama), yayin da
har yanzu yake ƙin waɗanda ba a yi wa mount ba.

### Hanyar kaucewa: saita CLI na container ɗin kansa (yi amfani da taka-tsantsan)

Idan CLI ɗin suna zaune da gaske a cikin container (`cli` profile), rubutun
da gangan ne. Wuce `--allow-container-write` ga kowane umarnin `setup-*`, ko saita
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ga server. Za a ci gaba da rubutun
tare da gargaɗin cewa ba zai dawwama bayan container ɗin ba.

> **Gargaɗin tsaro — `cli` profile + mount na `docker.sock`.**
> `cli` profile yana yin bind-mount na `/var/run/docker.sock` domin auto-updater na cikin container
> ya iya sake ƙirƙirar stack daga daemon na host
> (`src/lib/system/autoUpdate.ts` yana bincika wanzuwar socket ɗin kuma ya tsallake hanyar
> Docker idan babu shi). Wannan socket ɗin **iyakar amincewar host-root ce**:
> duk abin da zai iya isa gare shi yana sarrafa Docker daemon na host a matsayin
> root — zai iya ƙirƙira, dubawa, tsayarwa da cire kowane container a host.
> Abubuwan da hakan ke nufi:
>
> 1. **Kada ka taɓa fallasa port na `cli` profile ga network.** Ka wallafa
>    shi a `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — `cli` profile da ake iya isa gare shi daga LAN yana mayar da duk wani RCE na matakin dashboard zuwa
>    cikakken kutse cikin host.
> 2. **Kada ka yi bind na wasu ƙarin kundin adireshin host zuwa `cli` profile.**
>    Docker socket tare da duk wani ƙarin mount yana bai wa container cikakken
>    ikon karantawa/rubutawa ga filesystem da saitin host ɗinka. Idan kana buƙatar wani kayan aiki ya
>    ga project, gudanar da shi a cikin gida da CLI binary — kada ka yi mount ɗinsa
>    zuwa `cli` container.
>
> Idan ba ka buƙatar auto-update na cikin container, ka bar `cli` profile a kashe
> (`COMPOSE_PROFILES=core,redis` ko mafi gajarta). Sauran profiles ba sa
> yin mount na Docker socket.
>
> Duba `docs/security/MITM-TPROXY-DECRYPT.md` (git; ba a haɗa shi cikin `/docs` ba) domin threat model mai alaƙa
> da MITM, da kuma `docs/security/SUPPLY_CHAIN.md` domin jerin asalin binary na
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute yana dogara da Redis don tallafa wa iyakance ƙimar da aka rarraba da kuma ma'ajiyar bayanai ta bai ɗaya. Ana **ayyana sabis ɗin `redis` koyaushe** a cikin `docker-compose.yml` (ba shi da shingen profile), kuma yana farawa tare da kowane profile.

| Bayani                 | Ƙima                                         |
| ---------------------- | -------------------------------------------- |
| Image                  | `redis:7-alpine`                             |
| Sunan container        | `omniroute-redis`                            |
| Port na ciki           | `6379`                                       |
| Port na host (sauyawa) | `REDIS_PORT` (tsoho shi ne `6379`)           |
| Bind na host (sauyawa) | `REDIS_BIND_HOST` (tsoho shi ne `127.0.0.1`) |
| Volume                 | `omniroute-redis-data` → `/data`             |
| Binciken lafiya        | `redis-cli ping` (tazarar 10s)               |

Masu sauyin muhalli masu alaƙa:

- `REDIS_URL` — zaren haɗin da ake shigarwa cikin manhajar (`redis://redis:6379` a matsayin tsoho).
- `REDIS_PORT` — taswirar port ta ɓangaren host don container na Redis.
- `REDIS_BIND_HOST` — interface na host da ake wallafa port ɗin a kai. Tsohon sa shi ne `127.0.0.1`.

> **Dalilin amfani da loopback a matsayin tsoho:** sidecar ɗin yana aiki ba tare da `requirepass` ba, kuma
> containers na manhajar suna isa gare shi ta hanyar compose network (`redis:6379`) — port ɗin da aka wallafa
> yana nan ne kawai don kayan aikin ɓangaren host (`redis-cli`, `npm run dev` na gida). Wallafawa a kan
> `0.0.0.0` zai fallasa Redis marar tantancewa ga kowane host da ke LAN ɗinku. Idan kun saita
> `REDIS_BIND_HOST=0.0.0.0`, ku ƙara `--requirepass` zuwa `command:` na sabis ɗin ma.

Ba a ba da shawarar **kashe Redis** ba (mai iyakance ƙima zai koma amfani da madadin cikin-memory mai ƙarancin inganci). Idan dole ne, ko dai ku cire/ku mayar da block ɗin sabis na `redis:` zuwa comment a cikin `docker-compose.yml`, ko ku rage shi zuwa sifili:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Don snapshot na production mai keɓancewa wanda ke aiki tare da dev, yi amfani da `docker-compose.prod.yml`.

| Bayani                     | Ƙima                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| Fayil                      | `docker-compose.prod.yml`                                                                     |
| Port na dashboard na tsoho | `PROD_DASHBOARD_PORT=20130` (an taswira zuwa na ciki `${DASHBOARD_PORT:-20128}`)              |
| Port na API na tsoho       | `PROD_API_PORT=20131`                                                                         |
| Image                      | `omniroute:prod` (an gina daga target na `runner-cli`)                                        |
| Container na Redis         | `omniroute-redis-prod` (`redis:8.6.2`, volume na musamman `redis-prod-data`)                  |
| Volume na bayanai          | `omniroute-prod-data` (mai suna, yana dawwama bayan sake ginawa)                              |
| Binciken lafiya            | `node healthcheck.mjs` + `redis-cli ping`, tare da `depends_on` da lafiyar Redis ke sarrafawa |

Yadda ake amfani:

```bash
# Gina kuma fara stack na production
docker compose -f docker-compose.prod.yml up -d --build

# Nuna logs kai tsaye
docker compose -f docker-compose.prod.yml logs -f

# Dakatar da stack (a bar volumes)
docker compose -f docker-compose.prod.yml down
```

Stack na prod yana aiki a layi ɗaya da compose na dev (sunayen container, ports, da volumes sun bambanta), don haka za ku iya ci gaba da yin gyare-gyare a gida yayin da production yake ci gaba da aiki.

## Matakan Dockerfile

Ma'ajiyar tana zuwa da Dockerfile mai matakai da yawa (`Dockerfile`). An samar da matakai huɗu; zaɓi `target` da ya dace da amfaninka.

| Mataki        | Hoton tushe           | Manufa                                                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Yana shigar da abubuwan dogaro (`npm ci --legacy-peer-deps`) sannan ya gudanar da `npm run build` (Turbopack ta tsohuwa — duba Albarkatun lokacin ginawa a ƙasa)                                                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Muhallin gudanarwar samarwa tare da fitowar Next.js mai zaman kanta. **Ba a haɗa CLI na masu samarwa ba.**                                                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | Yana ƙara `git`, `docker.io`, `docker-compose` da CLI na gama-gari: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Zaɓi wannan don hanyoyin aiki masu wakilai.**                                                                                                                                                |
| `runner-web`  | `runner-base`         | Yana ƙara Playwright + burauzar Chromium (`--with-deps`) don masu samar da zaman yanar gizo: `gemini-web`, `claude-web`, `claude-turnstile`. **Zaɓi wannan lokacin da kake amfani da waɗannan masu samarwa** — hoton da ba shi da ƙari zai gaza a lokacin buƙata ba tare da shi ba (duba bayanin `-web` ƙarƙashin Tashoshin Fitarwa). |

Gina takamaiman target da hannu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Albarkatun lokacin ginawa

Build args guda uku ne ke sarrafa yawan albarkatun da matakin `builder` ke amfani da su. Ana amfani da su ne kawai lokacin ginawa —
`OMNIROUTE_MEMORY_MB` (a ƙasa) wani saitin lokacin gudanarwa ne daban.

| Build arg                   | Tsoho  | Tasiri                                                                                                     |
| --------------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` yana ginawa da webpack: ƙarancin iyakar amfani da ƙwaƙwalwa, amma a hankali. `1` yana kunna Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Iyakar heap ta V8 (`--max-old-space-size`) don `next build` da aka ƙaddamar.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Yana ciyar da `CIRCLE_NODE_TOTAL`; Next yana samo `workers = N - 1` don tattara bayanan shafuka.           |

`OMNIROUTE_BUILD_WORKERS` shi ne abin da ya kamata a ƙara a kan babban builder, kuma shi ne
abin da ya kamata a fara zargi idan build mai ƙarancin albarkatu ya mutu **bayan** `✓ Compiled successfully`. Kowane
worker na bayanan shafi process ne mai zaman kansa, haka ma babban `next build` ɗin kansa;
gwajin da aka yi kai tsaye a VPS (matsala #7518) ya auna iyakar RSS na kowane process a
~4.5 GB ba tare da la'akari da tutar heap ta `NODE_OPTIONS` ba (Turbopack yana yin compilation a
ƙwaƙwalwar native/Rust da ke wajen heap ta V8). An tsara tsohon ƙimar `2` (→ worker 1, jimillar
processes 2) don GitHub-hosted runners masu 16 GB / 4 vCPU waɗanda
publish pipeline ke amfani da su. A `8` (→ workers 7), ƙwaƙwalwar wannan runner ta ƙare kuma
buildkit ya gaza matakin da `ResourceExhausted: ... cannot allocate memory`;
`3` (→ workers 2) ma bai isa ba bayan an auna RSS na kowane process
kai tsaye maimakon yin hasashe. `tests/unit/docker-build-memory-budget.test.ts`
yana yin lissafin bisa adadin da aka auna kuma yana gazawa idan ɗaya daga cikin saitunan
ya zarce ƙarfin runner.

Turbopack yana yin compilation a ƙwaƙwalwar native Rust da ke **wajen** heap ta V8, saboda haka
`OMNIROUTE_BUILD_MEMORY_MB` ba ya iyakance ta. A kan na'ura mai iyakar ƙwaƙwalwa,
OOM killer zai kashe build ɗin da SIGKILL ba tare da wani rubutun kuskure ba — kawai zai
tsaya a tsakiyar `Creating an optimized production build`, wanda zai yi kama da ya maƙale maimakon
ƙarewar ƙwaƙwalwa. Wannan ne dalilin da ya sa `Dockerfile` ke amfani da webpack a matsayin tsoho
(`OMNIROUTE_USE_TURBOPACK=0`), sabanin `npm run dev` / `npm run build`, inda
Turbopack yake tsohon zaɓin lamba: `docker build .` kai tsaye ba tare da build args ba (abin da
Railway da sauran masu masaukin dannawa-sau-ɗaya ke gudanarwa) kada ya mutu shiru a kan
builder mai iyakantacciyar ƙwaƙwalwa. Hotunan da aka wallafa tuni suna aika `OMNIROUTE_USE_TURBOPACK=0`
a sarari cikin `docker-publish.yml`. A kan builder mai wadatacciyar RAM, kunna
Turbopack don build mai sauri:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

An kunna `webpackBuildWorker`, saboda haka `next build` yana gudanar da babban process **da** worker
process, kuma kowannensu yana bin `OMNIROUTE_BUILD_MEMORY_MB` daban. Saita iyakar ƙwaƙwalwar container
sama da kusan ninki biyu na wannan ƙimar, ba sau ɗaya ba.

An auna a kan wannan bishiyar (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Iyakar container | Sakamako                                          |
| --------- | ---------------- | ------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | OOM ya kashe shi a duka biyun, ba tare da saƙo ba |
| webpack   | 8 GiB            | An kashe build worker da SIGKILL                  |
| webpack   | 12 GiB           | Ya yi nasara, ya kai iyakar 11.1 GiB              |

### Tsoffin saitunan lokacin gudanarwa

Tsoffin saitunan da `runner-base` ke fitarwa: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Halin ƙwaƙwalwa a cikin Docker:

- Image ɗin yana saita `OMNIROUTE_MEMORY_MB=1024` kuma yana samar da `NODE_OPTIONS=--max-old-space-size=1024` daga gare shi.
- Ana fara ainihin aikin sabar ta standalone launcher, wanda ke karanta `OMNIROUTE_MEMORY_MB` sannan ya ƙara `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node yana amfani da ƙimar `--max-old-space-size` ta ƙarshe idan an maimaita ta, don haka saita `OMNIROUTE_MEMORY_MB` ne ke sarrafa iyakar heap ta Docker da ake amfani da ita.
- Saboda image ɗin koyaushe yana saita shi, madadin launcher ɗin da yake daidaitawa bisa RAM ba ya taɓa aiki a ƙarƙashin Docker. Ƙara shi kai tsaye gwargwadon nauyin aikin (duba teburin da ke ƙasa). `2048` har yanzu bai isa ga `/v1/responses` na coding-agent ba.

### RAM na lokacin aiki don coding agents

Tsohuwar ƙimar Docker ta 1 GiB ita ce mafi ƙarancin RAM don dashboard/hira mai sauƙi, ba girman da ya dace da production ba. Dogayen bodies na `POST /v1/responses` (ɗaruruwan saƙonni, kayan aiki masu yawa) suna riƙe graphs da dama a ƙwaƙwalwar ajiya yayin compression. Buƙatu biyu masu cin karo da juna na kusan ~3 MiB / ~750k-token sun sa V8 ya tsaya a old-space na **12 GiB** (`FATAL ERROR: Reached heap limit`), sannan kuma suka kai ga OOM na cgroup mai 16 GiB. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Saita girman **cgroup `--memory` sama da heap** — native buffers, SQLite, da abubuwan wucin-gadi na compression suna wajen V8.

| Nauyin aiki                                | `OMNIROUTE_MEMORY_MB`         | Container / cgroup | Bayani                                                                                              |
| ------------------------------------------ | ----------------------------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| Dashboard, hira mai sauƙi guda ɗaya        | `1024` (tsohuwar ƙimar image) | ≥2 GiB             |                                                                                                     |
| Coding agent guda ɗaya (Claude/Codex/Grok) | `8192`                        | ≥10 GiB            | Zaman guda na `/v1/responses` da aka saba gani                                                      |
| Dogayen `/v1/responses` biyu a lokaci guda | `10240`–`12288`               | ≥12–16 GiB         | An auna tsayawar V8 a heap na kusan ~12 GiB                                                         |
| Dogayen contexts uku ko fiye a lokaci guda | kada a yi a process guda ɗaya | jera su / ƙara RAM | Tsohuwar heavyweight admission ita ce 1 in-flight; ƙara ta ba tare da RAM ba zai sake jawo tsayawar |

`omniroute serve` a kan bare metal yana daidaita kusan 35% na RAM (an iyakance shi zuwa `[512, 4096]`) idan ba a saita `OMNIROUTE_MEMORY_MB` **ba**. Docker koyaushe yana saita `1024`, don haka wannan daidaitawar ba ta taɓa gudana a official image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Muhimman Sauye-sauyen Muhalli

Baya ga tsoffin ƙimomin da aka rubuta a cikin [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sauye-sauye masu zuwa su ne mafi muhimmanci yayin aiki a ƙarƙashin Docker:

| Sauyi                         | Manufa                                                                                                                                                                                                                                                                       | Tsohon ƙima                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sirrin da ake rabawa don gadar WebSocket. **Ana buƙatarsa a yanayin samarwa** — saita shi zuwa ƙaƙƙarfan bazuwar kirtani.                                                                                                                                                    | ba a saita ba (dole a samar da shi) |
| `REDIS_URL`                   | Kirtanin haɗi don mai iyakance yawan buƙatu / ma'ajiyar wucin gadi                                                                                                                                                                                                           | `redis://redis:6379`                |
| `REDIS_PORT`                  | Tashar ɓangaren host don kwantenar Redis da aka haɗa                                                                                                                                                                                                                         | `6379`                              |
| `REDIS_BIND_HOST`             | Fuskar sadarwar host da ake wallafa tashar Redis da aka haɗa a kanta (loopback sai dai idan ka ƙara AUTH)                                                                                                                                                                    | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hanyar host da aka ɗora cikin bayanin martabar `cli` a `/workspace/omniroute` don tsarin sabunta kai                                                                                                                                                                         | `.` (kundin adireshi na yanzu)      |
| `OMNIROUTE_MEMORY_MB`         | Iyakar heap ta Node yayin aiki don sabar Docker mai zaman kanta; tana maye gurbin tsohon ƙimar hoton da ke sama. Wakilan coding: `8192`+ (duba [RAM na lokacin aiki](#runtime-ram-for-coding-agents)).                                                                       | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Maye gurbin tashoshin da aka fallasa don dashboard (20128) da API (20129)                                                                                                                                                                                                    | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Fuskar sadarwar host da docker-compose ke wallafa tashoshin dashboard/API/live-WS a kanta. Tare da `REQUIRE_API_KEY=false` (tsohon ƙima), `0.0.0.0` yana fallasa wakilin `/v1` marar tantancewa ga LAN — faɗaɗa shi kawai da `REQUIRE_API_KEY=true` ko reverse proxy a gaba. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Fuskar sadarwar host da docker-compose ke wallafa sidecar ɗin `cliproxyapi` a kanta — kundin bayanansa yana riƙe bayanan shaidar masu samarwa.                                                                                                                               | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Kundin adireshin da na'urar binciken plugin ta runtime ke karantawa kuma take girkawa a cikinsa. Saita shi lokacin da aka ɗora plugins ta bind mount: tsohon ƙimar yana bin `HOME`, wanda ba lallai hoto ya fitar da shi ba.                                                 | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Ƙaramin hanyar URL lokacin da aka wallafa manhajar a bayan reverse proxy (misali `/omniroute`)                                                                                                                                                                               | _(babu komai = tushen hanya)_       |
| `NEXT_PUBLIC_BASE_URL`        | Asalin adireshin burauzar jama'a wanda ya haɗa da ƙaramin hanyar (misali `https://host/omniroute`)                                                                                                                                                                           | ba a saita ba                       |
| `PROD_DASHBOARD_PORT`         | Tashar dashboard ta ɓangaren host don `docker-compose.prod.yml`                                                                                                                                                                                                              | `20130`                             |
| `CLIPROXYAPI_PORT`            | Tashar ɓangaren host don sidecar ɗin `cliproxyapi`                                                                                                                                                                                                                           | `8317`                              |

## Reverse Proxy a kan Ƙaramin Hanya (Traefik / nginx)

Ana haɗa `basePath` na Next.js a cikin standalone bundle yayin build. OmniRoute yana adana
ƙimar da aka haɗa a cikin sentinel file a tushen manhajar (ana rubuta shi yayin `npm run build`; ana karanta shi ta
`scripts/docker/ensure-docker-base-path.mjs`) sannan yana kwatanta shi da
`OMNIROUTE_BASE_PATH` lokacin da container ya fara aiki. Idan suka bambanta kuma an
gina image ɗin don tushen domain, entrypoint zai sake rubuta standalone manifests,
ƙimomin `basePath`/`assetPrefix` da aka saka a ciki (Next 16 yana samar da URL na kadarorin SSR daga
`assetPrefix` kaɗai — patcher yana kwafin ƙaramin hanyar zuwa cikinsa), URL na kadarorin
`/_next/static` da aka haɗa (client-reference manifests, media imports, shafukan kuskure
da aka riga aka render) da kuma shim na `process.env` na client kafin `node dev/run-standalone.mjs`
ya gudana.

### Build ta Compose (an ba da shawara)

Saita duka variables ɗin a cikin `.env`, sannan sake yin build domin image da runtime su dace:

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

Saita reverse proxy don ya tura **cikakkiyar** hanyar waje (kada a cire
prefix). Ya kamata Traefik ya tura `PathPrefix(`/omniroute`)` zuwa container ba tare da
`StripPrefix` ba, domin Next.js ya karɓi `/omniroute/...` kuma ya samar da kadarori daga
`/omniroute/_next/...`.

Docker healthcheck yana gwada endpoint na lifecycle mai sauƙi `/healthz` wanda aka sa masa prefix
na `OMNIROUTE_BASE_PATH` mai aiki. `/api/monitoring/health` yana ci gaba da kasancewa don
binciken ɗan Adam/dashboard; don mayar da HEALTHCHECK na container zuwa gare shi (misali
don tilasta cikakken duba lafiya), saita `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Wannan hanyar duba ce mai **zurfi** (DB + taƙaitaccen monitoring) — ta dace da
`HEALTHCHECK` na Docker da ba ya yawan gudana idan ka zaɓi komawa gare shi, amma **ba** ta dace da tazarar
`livenessProbe` na Kubernetes ba.

Ga orchestrators (Kubernetes, Nomad, da sauransu):

| Probe           | Abin da aka fi so                                                   | Abin da za a guje wa                                                |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, ko TCP a kan babban port (`PORT`, tsoho `20128`) | `/api/monitoring/health` a matsayin liveness                        |
| Readiness       | HTTP `GET /healthz`                                                 | Ƙanƙanin timeout da ke ɗaukar cunkoson event-loop a matsayin mutuwa |
| Deep / blackbox | `/api/monitoring/health`                                            | —                                                                   |

`/healthz` yana bayar da rahoton lifecycle na process (`ok` / `starting` / `stopping`). `/livez`
yana duba ko process yana raye ne kawai (200 a duk lokacin da handler zai iya gudana; ba ya jiran
readiness). Dukansu har yanzu suna gudana a kan Node event loop ɗaya da sarrafa request, don haka
aikin catalog ko compression da ya mamaye CPU zai iya jinkirta su — aiki da yawa ≠ mutuwa. Fi son TCP
liveness idan HTTP probes suna ƙare wa saboda timeout. Cikakkiyar jagorar probe:
[Jagorar monitoring — shawarwarin probe na Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose tare da Caddy (HTTPS Auto-TLS)

Ana iya fallasa OmniRoute cikin aminci ta amfani da samar da SSL ta atomatik na Caddy. Tabbatar cewa rikodin DNS A na yankinku yana nuna adireshin IP na sabarku.

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
      # Asalin da burauza ke gani don kiran-baya na OAuth, hanyoyin dashboard, da URL na jama'a da aka ƙirƙira.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL na ciki daga saba zuwa saba don ayyukan da aka tsara / buƙatun kansa.
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

Caddy yana saita daidaitattun taken turawa don kwantenan da ke sama. OmniRoute yana amfani da
`NEXT_PUBLIC_BASE_URL` a matsayin tabbataccen asalin jama'a don kiran-baya na OAuth da hanyoyin
jama'a da aka ƙirƙira; rubuce-rubucen dashboard da aka tabbatar da izini suna amfani da buƙatun
asali ɗaya tare da kariyar CSRF da aka ɗaure da zaman. Kunna `OMNIROUTE_TRUST_PROXY` kawai don
tura manhaja na ci-gaba inda da gangan kuke son OmniRoute ya samo asalin jama'a daga amintattun
taken da aka tura maimakon fayyacewar tsari kai tsaye.

## Cloudflare Quick Tunnel

Tallafin dashboard don tura manhaja ta Docker ya haɗa da **Cloudflare Quick Tunnel** mai dannawa sau ɗaya a `Dashboard → Endpoints`. Kunna shi na farko yana sauke `cloudflared` ne kawai lokacin da ake buƙata, yana fara rami na wucin gadi zuwa endpoint ɗinku na `/v1` na yanzu, sannan yana nuna URL ɗin `https://*.trycloudflare.com/v1` da aka ƙirƙira kai tsaye a ƙarƙashin URL ɗinku na jama'a na yau da kullum.

Ana iya nuna ko ɓoye bangarorin ramin endpoint (Cloudflare, Tailscale, ngrok) daga `Settings → Appearance` ba tare da canza yanayin ramin da ke aiki ba.

### Bayanan Rami

- URL na Quick Tunnel na wucin gadi ne kuma suna canzawa bayan kowane sake farawa.
- Ba a maido da Quick Tunnels ta atomatik bayan sake farawa na OmniRoute ko kwantena. Sake kunna su daga dashboard lokacin da ake buƙata.
- Shigarwa da ake sarrafawa a halin yanzu yana tallafawa Linux, macOS, da Windows a kan `x64` / `arm64`.
- Quick Tunnels da ake sarrafawa suna amfani da jigilar HTTP/2 ta tsohuwa don guje wa gargaɗin ma'ajiyar QUIC UDP masu hayaniya a cikin mahallin kwantena masu ƙuntatawa. Saita `CLOUDFLARED_PROTOCOL=quic` ko `auto` idan kuna son wata hanyar jigilar daban.
- Hotunan Docker suna ƙunshe da tushen CA na tsarin kuma suna miƙa su ga `cloudflared` da ake sarrafawa, wanda ke hana gazawar amincewar TLS lokacin da ramin yake fara aiki a cikin kwantena.
- Saita `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` idan kuna son OmniRoute ya yi amfani da binary da ke akwai maimakon sauke wani.

## Alamomin Hoto

| Hoto                     | Alama    | Girma  | Bayani                                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer tsayayye mafi girma da **aka wallafa** (ba git `main` ba) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Ɗaure wannan ajin alama don GitOps                               |

Manifest na dandamali da yawa: `linux/amd64` + `linux/arm64` na asali (Apple Silicon, AWS Graviton, Raspberry Pi). Docker yana zaɓar tsarin gine-ginen da ya dace ta atomatik; miƙa `--platform linux/amd64` idan kuna buƙatar tilasta kwaikwayon AMD64 a kan masaukin ARM.

### Tashoshin Fitarwa

OmniRoute yana wallafa tashoshin Docker daban-daban don fitowar tsayayye, gwajin reshen fitarwa mai aiki, da sigogin ci gaba.

| Tasha                           | Tushe                                         | Iya canzawa                        | Amfanin da aka ba da shawara                                                                                               |
| ------------------------------- | --------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Fitowar da aka sa wa hannu/mai siga           | Ba ya canzawa                      | Tura manhaja na samarwa da ke ɗaure da takamaiman fitarwa                                                                  |
| `:latest` / `:latest-web`       | SemVer tsayayye mafi girma da **aka wallafa** | Mai nuna tsayayye mai canzawa      | Yana bin fitowar tsayayye **bayan** aikin wallafa SemVer — **ba ya** bin `main` ko commit na `release/v*` da ba a fitar ba |
| `:next` / `:next-web`           | Reshen `release/v*` na tsohuwa na yanzu       | Mai nuna kafin fitarwa mai canzawa | Gwada gyare-gyaren da suka shiga reshen fitarwa mai aiki amma har yanzu ba su shiga fitowar tsayayye ba                    |
| `:main` / `:main-web`           | Reshen `main`                                 | Mai nuna ci gaba mai canzawa       | Don gwajin ci gaba da haɗa tsarin kawai                                                                                    |

#### Masu samar da zaman yanar gizo: hotunan `-web`

Kowace tasha da ke sama tana kuma da alamar `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), waɗanda aka gina daga matakin `runner-web` — hoto iri ɗaya tare da Playwright da burauzar Chromium. Hoton yau da kullum yana zuwa **ba tare da** Chromium ba; `gemini-web`, `claude-web` da `claude-turnstile` suna buƙatarsa.

Ana jinkirta gazawar, ba ta faruwa lokacin farawa: waɗannan masu samarwa suna jera samfuransu kuma suna bayyana a matsayin haɗe a dashboard, sai dai buƙata ta farko ce kawai ke gazawa da

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Idan kuna amfani da waɗannan masu samarwa, jawo alamar `-web` ta tashar da kuke kai — babu wani abu da zai canza. A shigarwar npm/CLI (ba tare da hoton Docker ba), makamancin ɓangaren da ya ɓace shi ne binary na burauza: gudanar da `npx playwright install chromium` a kan masaukin.

#### Amfani da tashar kafin fitarwa

Ana sake gina tashar `next` a duk lokacin da aka tura canji zuwa reshen tsoho na yanzu na `release/v*`, kuma ana wallafa ta don AMD64 da ARM64. Tsofaffin rassan kulawa ba za su iya maye gurbinta ba. Tashar tana samar da hoton da za a iya saukewa domin gyare-gyaren da aka haɗa cikin reshen fitarwa mai aiki kafin a ƙirƙiri alamar barga ta gaba.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Don Docker Compose, maye gurbin alamar hoton da bayanin martabar da aka zaɓa yake amfani da ita, sannan a sauke kuma a sake ƙirƙirar sabis ɗin:

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

`next` tasha ce ta gwaji kafin fitarwa mai sauyawa. Tana iya canzawa a duk lokacin da aka tura canji zuwa reshen fitarwa mai aiki, kuma **ba a tallafa wa amfani da ita a samarwa**. Ɗaure digest na hoton yayin kimanta takamaiman gini:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kafin gwaji, yi ajiyar madadin kundin bayanai na OmniRoute ko kundin bayanan da aka haɗa ta hanyar bind mount. Don komawa baya, dawo da sigar barga ko digest da aka yi amfani da shi a baya, sannan a sake ƙirƙirar kwantenar:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ginin reshen fitarwa ba zai taɓa iya matsar da `latest` ba; sigar semantik barga da ta cancanta kaɗai za ta iya ɗaukaka manunin barga. Hotunan `next` suna ci gaba da amfani da binciken hoton fitarwa da ƙofar toshe raunin tsaro na CRITICAL.

**`latest` ba tabbacin sabuntawar git ba ne.** Gyare-gyaren da aka haɗa a `main` ko a reshen `release/v*` mai aiki **ba sa** cikin `:latest` har sai an wallafa hoton SemVer barga kuma aikin wallafawa ya ɗaukaka `:latest` (digest iri ɗaya da na wannan SemVer). Idan `latest` yana kama da ya tsaya yayin da GitHub ya riga ya nuna gyaran, sauke `:next` don gwada reshen fitarwa ko jira alamar SemVer.

| Abin da kake so                                                          | Yi amfani da                        |
| ------------------------------------------------------------------------ | ----------------------------------- |
| GitOps / samarwa wanda dole ne kada ya kauce                             | Ɗaure `:X.Y.Z` (ko digest na hoton) |
| Bin bargar da aka wallafa da amincewa da sake ƙirƙirawa a kowace fitarwa | `:latest`                           |
| Gwada canje-canjen `release/v*` da ba a fitar ba                         | `:next` (ba don samarwa ba)         |
| Gwada `main`                                                             | `:main` (ba don samarwa ba)         |

## Samuwa: tsohon tsarin SQLite na asali yana da kwafi guda ɗaya

Daidaitaccen Docker / Kubernetes OmniRoute yana da **tsarin Node guda ɗaya + mai rubuta SQLite guda ɗaya**. Ba a tallafa wa samuwa mai ɗorewa ba a wannan tsarin.

| Ƙuntatawa                                           | Sakamako                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mai rubutu guda ɗaya                                | **Kada** a gudanar da kwafi da yawa kan fayil ɗin SQLite guda ɗaya. Hakan yana lalata DB.                                                                                                                                                                                                                                                                        |
| Sake ƙirƙirawa / sake farawa / kashewar HEALTHCHECK | **Katsewa gaba ɗaya** ga SSE da ke gudana, zaman dashboard, da bayanan da ke cikin ƙwaƙwalwa. Duk wani abokin ciniki da ke haɗe zai katse. Sabbin buƙatu yayin da babu endpoint za su samu **`502 Bad Gateway: Unknown error`** daga reverse-proxy, ba OmniRoute JSON ba — abokan ciniki ba za su iya bambance wannan da gazawar mai samar da sabis ba (#11015). |
| Event loop ɗaya da `/healthz`                       | Aikin catalog ko compression mai nauyi na iya jinkirta probes; sai ɗan gajeren timeout ya sake kunna **kwafi guda ɗaya tilo**.                                                                                                                                                                                                                                   |

**Jadawalin probe** (duba kuma [shawarwarin probe na Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe              | Manufa                                                               | Kada a yi amfani da                                                |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Liveness           | TCP a kan `PORT` (na asali `20128`), ko HTTP `/healthz` mai sassauci | `/api/monitoring/health`                                           |
| Readiness          | HTTP `GET /healthz`                                                  | Ƙananan timeout da ke ɗaukar cunkoson event-loop a matsayin mutuwa |
| Mai zurfi / mutane | `/api/monitoring/health`                                             | Liveness na kubelet mai sarrafa kansa                              |

**Sabuntawa:** yi tsammanin duk wani zaman aiki zai katse. Ku dakatar da karɓar sabbin haɗin abokan ciniki idan za ku iya; babu rolling update a kan SQLite na asali. Compose `restart: unless-stopped` tare da Docker `HEALTHCHECK` su ma za su maye gurbin tsari guda ɗaya tilo idan container ya zama Unhealthy — tasirin katsewar iri ɗaya ne.

Ƙaramin misalin Kubernetes don **kwafi guda ɗaya** (ana buƙatar Recreate; kada a ƙara `replicas` kan fayil ɗin SQLite guda ɗaya):

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

Jiran `preStop` yana ba kube damar cire Service endpoints kafin SIGTERM domin **sabuwar** zirga-zirga ta daina isa tsarin da ke mutuwa. Ana ba SSE na `/v1/responses` da ke gudana damar kammalawa har zuwa `SHUTDOWN_TIMEOUT_MS` (na asali 30s) ta hanyar heavyweight admission leases (#11015). Sabbin buƙatun da har yanzu suka isa tsarin za su samu `503` + `Retry-After: 5`. Tazarar rashin endpoint ta Recreate har sai wanda ya maye gurbin ya zama Ready za ta ci gaba da zama cikakkiyar katsewa — wannan tsarin SQLite ne, ba kuskuren saita probe ba.

External Postgres / multi-writer HA **ba** hanya ce ta daidaitaccen tsarin da aka rubuta takardunta ba. Idan kuna buƙatar HA, ku ci gaba da amfani da kwafi guda ɗaya ko ku gudanar da tsarin da aikin ya gwada kuma ya rubuta takardunsa daban. Aikin Postgres/MySQL yana cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Har sai an fitar da wannan, hanyar da ake tallafawa kaɗai don ninka ƙarfin **manyan** `/v1/responses` ita ce amfani da tsaruka masu zaman kansu guda N (sashe na gaba), ba `replicas > 1` a kan volume guda ɗaya ba.

## Faɗaɗawa: matakai N masu zaman kansu

Tsarin Node guda ɗaya yana da **heap na V8 guda ɗaya**. Buƙatun coding-agent guda biyu masu cin karo, kowanne kusan ~3 MiB / ~750k-token na `POST /v1/responses` (RTK + Caveman), suna sa wannan heap ɗin ya tsaya a kusan ~12 Gi (`FATAL ERROR: Reached heap limit`) kuma suna iya haifar da OOM a cgroup mai 16 Gi. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Wannan ma'aunin gargaɗi ne na **kasafin ƙwaƙwalwa**, ba iyakar samfur ta dindindin ta buƙatun dogayen `/v1/responses` guda biyu masu gudana lokaci guda ba. Ana sarrafa shigar manyan tattaunawa ta hanyar kasafin bytes na ingest da ake ƙirƙira ta atomatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) wanda aka ƙayyade daga wannan iyakar V8/cgroup ɗin — ɗaga wannan ƙimar sama da aka ƙayyade (ko sa iyakar ƙidayar buƙatu ta tsohon tsari `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) a kan tsari da aka riga aka ƙayyade girmansa zai sake jawo tsayawar. Ƙananan tattaunawa, `/healthz`, `/v1/models`, da MCP **ba sa** cikin wannan iyakar.

### Tsari guda: fiye da dogayen `/v1/responses` guda biyu

Tsari mai **lafiya** (heap ƙasa da `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, tsohuwar ƙima `0.75`) **na iya** gudanar da dogayen `POST /v1/responses` fiye da guda biyu lokaci guda idan har kasafin bytes na buƙatun da ke gudana a faɗin tsarin (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) yana da sauran sarari. Bodies da suka kai ko suka wuce `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (tsohuwar ƙima 256 KiB) suna ɗaukar heavyweight lease iri ɗaya da buƙatu masu nauyin tsari, kuma suna amfani da hanyar tserewa ta [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Yawan dogayen abokan cinikin SSE da ke gudana lokaci guda (sau da yawa masu gudanarwa na buƙatar 40–50) tambaya ce ta **kasafin ƙwaƙwalwa** — a ƙayyade girman heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ba ƙaƙƙarfan iyakar samfur ta “max 2” ba. Heap da ke ƙarƙashin matsin lamba har yanzu yana rage kaya da `503` mai yuwuwar sake gwadawa domin kada #7849 ya dawo.

Don **ninka heaps** (V8 old-spaces masu zaman kansu) **a yau**:

| Yi                                                                                                                                                                           | Kada a yi                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Gudanar da **containers/pods N**, kowanne da **nasa** `DATA_DIR` / volume                                                                                                    | Saita `replicas > 1` a kan fayil ɗin SQLite guda ɗaya                 |
| Ƙayyade manyan buƙatun da ke gudana + healthy-headroom daga kasafin heap / inflight-byte; 1–2 ita ce tsohuwar ƙima mai taka-tsantsan ta #7849, ba ƙaƙƙarfan iyakar samfur ba | Ba tsari guda RAM mai 8× da iyakar ƙidaya marar iyaka                 |
| Na zaɓi: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` don **shared quota counters**                                                                                  | Ɗauki Redis a matsayin shared SQLite — ba haka yake ba                |
| Kwafi sirrin masu samarwa zuwa kowace instance (ko amince da dashboards da aka raba)                                                                                         | Yi tsammanin dashboard guda ɗaya / call-log guda ɗaya a duk instances |
| Sanya kowane load balancer a gaba; sticky ta API key ko session ya isa                                                                                                       | Buƙaci middleware na musamman ga wani vendor mai lura da girma        |

Kayan aiki: yawan dogayen `/v1/responses` da ke gudana lokaci guda a kowace instance tambaya ce ta **kasafin ƙwaƙwalwa** (heap + inflight-byte / #10110). `DATA_DIR`s masu zaman kansu guda `N` har yanzu suna ninka heaps: dole RAM na host ya iya ɗaukar `N × cgroup`, ba “pod guda mai 16 Gi da N=8” ba. Kada a taɓa sa `replicas > 1` a kan fayil ɗin SQLite guda ɗaya.

Tsarin Compose na misali (heaps biyu, volumes biyu — ba `deploy.replicas: 2` ba):

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

Yawaitar aiki cikin tsari guda (compression a wajen HTTP isolate) tana cikin [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster na ma'ana guda ɗaya a kan shared durable state yana cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Kurakuran yanki na Gemini a cikin Docker

Google AI Studio / Gemini API na iya dawo da HTTP 400 tare da FAILED_PRECONDITION da
`User location is not supported for the API use.` Nasarar buƙata a kan na'urar masauki
ba ta tabbatar da cewa container yana amfani da hanyar fita iri ɗaya ba. Tsarin DNS,
haɗin IPv4/IPv6, hanyar VPN da proxies da aka saita na iya bambanta. Duba
[yankunan da Google ke tallafawa](https://ai.google.dev/gemini-api/docs/available-regions)
tare da ainihin hanyar haɗin; wannan kuskuren shi kaɗai ba ya nuna cewa API key ba shi da inganci.

### Fi son proxy na takamaiman haɗi

Yi amfani da [saitin proxy na kowane haɗi](../ops/PROXY_GUIDE.md#4-level-proxy-system)
na OmniRoute don haɗin Gemini da abin ya shafa, sannan ka sake yin **Gwada Haɗi** da ƙaramin buƙata
tare da model iri ɗaya. Wannan yana iyakance canjin hanyar zuwa wannan haɗin kawai. Tabbatar
cewa ana iya isa ga proxy daga container, kuma haɗin yana zaɓar sa da gaske.
Canza hanyar ba ya tabbatar da cancantar yanki a upstream.

### Kwatanta sadarwar na'urar masauki da ta container

Ka bar key, model da buƙatar yadda suke yayin kwatanta sakamakon da aka tabbatar da izini; kada
ka taɓa liƙa bayanan shaidarka, kalmomin sirrin proxy ko cikakkun authorization headers a cikin issue.
Da farko, bincika nau'ikan adiresoshin da OS resolver ke bayarwa, ta amfani da command iri ɗaya
a kan na'urar masauki da kuma cikin container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Sauya `omniroute` da service ɗin da kake gudanarwa (misali, `omniroute-web`). Waɗannan
commands suna fitar da nau'ikan adiresoshi ba tare da bayanan shaida ko IP addresses ba. Samun `6`
yana nuna sakamakon IPv6 DNS ne kawai: **ba ya** tabbatar da cewa akwai hanyar IPv6 mai aiki ko damar API.
Inda aka shigar da `curl`, kwatanta `curl -4 -I https://generativelanguage.googleapis.com`
da `curl -6 -I https://generativelanguage.googleapis.com` a dukkan muhallan biyu.
Amsar HTTP tana tabbatar da haɗuwa don wannan gwajin, ko da kuwa kuskure ne marar authentication;
buƙatar model da aka tabbatar da izini ce kawai ke gwada cancantar Gemini.

### Madadin matakin na'urar masauki: IPv6 mai aiki da manufofin resolver

Mai ba da rahoton [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ya dawo da
damar shiga a muhallinsa ta hanyar kunna IPv6 na container da canza zaɓin adireshin glibc.
Ɗauki wannan a matsayin madadin da ya keɓanta da muhalli. Tabbatar da cewa IPv6 na na'urar masauki
yana aiki, da egress/routing na container da dokokin firewall kafin daidaita fifikon resolver.
Adireshin ULA mai zaman kansa shi kaɗai ba ya tabbatar da haɗin IPv6 na jama'a.

Ga services da aka riga aka haɗa da default network na Compose, wannan ɓangaren yana kunna
IPv6 a kan wannan network; ka riƙe sauran service, ports, volumes da configuration ɗinka:

```yaml
networks:
  default:
    enable_ipv6: true
```

Don named network, kunna shi a network ɗin da service ɗin yake shiga a zahiri. Docker na iya
ware ULA subnet; zaɓi takamaiman subnet da ba ya karo da wani kawai idan network ɗinka
yana buƙatar hakan. Duba [sadarwar IPv6 ta Docker](https://docs.docker.com/engine/daemon/ipv6/)
da [zaɓuɓɓukan network na Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

A kan **image mai tushen glibc**, `/etc/gai.conf` na iya canza zaɓin adireshi. Dockerfile na
repository na yanzu yana amfani da Debian; custom images masu tushen musl ba sa amfani da wannan tsari.
Daidaitawar da aka ruwaito tana canza label na ULA daga `label fc00::/7 6` zuwa
`label fc00::/7 1`. Fara da cikakken policy table na image ɗin kuma ka adana sauran
entries ɗinsa: ƙara entry na `label` ko `precedence` yana maye gurbin wannan default table, don haka file
mai ɗauke da layin da aka canza kawai bai wadatar ba.
[Manazartar configuration ta glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ta bayyana waɗannan ƙa'idoji. Yi bind-mount na file ɗin da aka duba a yanayin read-only a `/etc/gai.conf`
kuma ka sake ƙirƙirar service ɗin don amfani da shi.

Wannan yana canza zaɓin adireshin OS ga **duk zirga-zirgar fita a wannan container**.
Ba ya tilasta wa kowane application zaɓar IPv6: tsarin DNS na Node da zaɓin
haɗi ma suna da tasiri. Musamman, `--dns-result-order=ipv4first` yana fifita IPv4 kuma
ba magani ba ne ga gazawar da ke faruwa a IPv4 kawai. Duba [tsarin DNS na Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Sake gwada Gemini da sauran providers ɗinka bayan kowane canji na matakin na'urar masauki. Don komawa baya,
cire custom mount na `gai.conf`, dawo da configuration na network na baya sannan
ka sake ƙirƙirar service/network da abin ya shafa a lokacin maintenance window. Sake ƙirƙirar network
na iya katse sauran containers da ke haɗe da shi; kada ka goge persistent data volume.

## Muhimman Bayanan Kula

- **Yanayin SQLite WAL:** Ya kamata a bar `docker stop` ya kammala domin OmniRoute ya iya rubuta sabbin sauye-sauye daga checkpoint zuwa cikin `storage.sqlite`. Fayilolin Compose da aka haɗa sun riga sun saita lokacin jinkirin tsayawa na daƙiƙa 40. Idan kuna gudanar da image ɗin kai tsaye, ku ci gaba da amfani da `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Saita shi zuwa `true` idan ana sarrafa madadin bayanai na yau da kullum/na kafin rubutawa daga waje. Ƙaura ga rumbun bayanai da ake da shi har yanzu tana buƙatar nata tabbataccen snapshot na tsaro da kariyar ƙaura mai yawa.
- **Dawwamar Bayanai:** Koyaushe ku haɗa volume zuwa `/app/data` domin adana rumbun bayananku, maɓallanku, da saitunanku bayan sake kunna kwantena.
- **Saitin Port:** Sauya environment variable na `PORT` domin canza tsohon port na `20128`.

## Duba Kuma

- [Jagorar Girka VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Saitin VM + nginx + Cloudflare
- [Jagorar Girka Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Girka zuwa Fly.io
- [Saitin Environment](../reference/ENVIRONMENT.md) — Cikakken bayani na `.env`
