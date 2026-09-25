# 🐳 Docker Guide — OmniRoute (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Cikakken jagorar tura Docker. Don farawa cikin sauri, duba [sashen Docker na README](../README.md#-docker).

## Jadawalin Abubuwan Ciki

- [Gudanarwa Cikin Sauri](#quick-run)
- [Tare da Fayil ɗin Muhalli](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profiles da Ake da Su](#available-profiles)
- [Saita kayan aikin CLI na host lokacin da OmniRoute ke gudana a Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose na Production](#production-compose)
- [Matakan Dockerfile](#dockerfile-stages)
- [Muhimman Masu Canjin Muhalli](#critical-environment-variables)
- [Docker Compose tare da Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Alamomin Image](#image-tags)
- [Samuwar sabis: SQLite na tsoho na amfani da replica guda ɗaya](#availability-default-sqlite-is-single-replica)
- [Muhimman Bayanan Kula](#important-notes)

---

## Gudanarwa Cikin Sauri

> **Kana son gudanar da shi da kanka da umarni guda ɗaya?** Duba
> [Jagorar Gudanarwa da Kai](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image da aka wallafa +
> Redis, loopback kawai, babu zaɓin profile). Gudanarwa Cikin Sauri da ke ƙasa ita ce
> hanyar container guda ɗaya ga masu amfani waɗanda suke riga suna gudanar da Redis a wani wuri.

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
# Bayanan martaba na asali (babu kayan aikin CLI)
docker compose --profile base up -d

# Bayanan martaba na CLI (an haɗa Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Bayanan martaba na na'ura mai masaukin baki (Linux ne kan gaba; yana ɗora fayilolin binary na CLI na na'urar a yanayin karantawa kawai)
docker compose --profile host up -d

# Bayanan martaba na yanar gizo (Chromium/Playwright don masu samar da zaman yanar gizo)
docker compose --profile web up -d

# Haɗa CLI + sabis na gefe na CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Bayanan Martaba da Ake da Su

OmniRoute yana samar da martabobin Compose don manyan nau'ikan turawa. Zaɓi wanda ya dace da mahallinka.

| Martaba        | Sabis            | Lokacin amfani                                                                                                                                                                | Umarni                                       |
| -------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (tsoho) | `omniroute-base` | Sabar marar mu'amalar gani / mafi ƙarancin yanayin aiki, ba a haɗa kayan CLI na masu samarwa ba                                                                               | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | Gudanawar aiki ta wakilai da ke kiran `omniroute providers/setup/doctor` da kayan CLI da aka haɗa (Codex, Claude Code, Droid, OpenClaw)                                       | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | Rundunan Linux da ke son dama irin ta `network_mode` zuwa kayan CLI na runduna ta hanyar ɗora `~/.local/bin`, `~/.codex`, `~/.claude`, da sauransu a matsayin karantawa kawai | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | Gudanar da [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) a matsayin sidecar a tashar `8317` don wakilcin CLI na sama                                            | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | Masu samar da zaman yanar gizo da ke buƙatar burauza: `gemini-web`, `claude-web`, `claude-turnstile` (yana gina `runner-web`, an haɗa Chromium)                               | `docker compose --profile web up -d`         |

> Ana iya haɗa martabobi da yawa: `docker compose --profile cli --profile cliproxyapi up -d`.

## Daidaita kayan aikin CLI na host lokacin da OmniRoute ke gudana a Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` da maɓallin
**Ajiye saituna** na dashboard duk suna rubuta fayiloli kamar `~/.codex/*.config.toml`. Waɗannan hanyoyin
suna da ma'ana ne kawai a kan na'urar da CLI ɗin ke gudana a zahiri. Idan aka gudanar da su a cikin
container, rubutun zai shiga home na container ɗin (`/home/node` —
image ɗin yana gudana da `USER node`), inda babu wani CLI na host da zai taɓa karanta shi, kuma inda za a
share shi da zarar an sake ƙirƙirar container ɗin.

OmniRoute yana gano wannan kuma ya ƙi yin rubutun tare da bayar da umarni maimakon
bayar da rahoton nasarar da ba za ka iya amfani da ita ba: CLI yana fita da `2`, kuma API yana amsawa da `422`
tare da `containerEphemeralTarget: true`.

### Shawarar da aka fi so: gudanar da CLI a kan host, OmniRoute kuma a Docker

Container ɗin yana samar da API; CLI kuma yana daidaita kayan aikin host ɗinka.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nuna wa CLI container ɗin
omniroute setup-codex                      # yana rubuta ainihin ~/.codex a kan host ɗinka
```

Wannan shi ne zaɓin da ya dace idan Codex, Claude Code, Cursor ko makamantansu suna gudana a kan
laptop ɗinka — wanda shi ne tsarin da aka fi amfani da shi.

### Madadin: yi bind-mount na kundin config na host (`host` profile)

Idan kana son container ɗin kansa ya rubuta config na host ɗinka, yi mount na
kundin a ciki sannan ka nuna `CLI_CONFIG_HOME` zuwa tushen mount ɗin. Tuni `host` profile
yana yin haka:

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
da 'ya'yansu mounts ne, wanda shi ne ainihin tsarin `/host-home` da ke sama), yayin da
har yanzu yake ƙin waɗanda ba a yi musu mount ba.

### Hanyar kaucewa: daidaita CLI na container ɗin kansa (a yi amfani da ita da taka-tsantsan)

Lokacin da CLI ɗin suke zaune a cikin container ɗin da gaske (`cli` profile), rubutun
na ganganci ne. Miƙa `--allow-container-write` ga kowane umarnin `setup-*`, ko saita
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ga server. Za a ci gaba da rubutun
tare da gargaɗin cewa ba zai wanzu bayan container ɗin ba.

> **Gargaɗin tsaro — `cli` profile + mount na `docker.sock`.**
> `cli` profile yana yin bind-mount na `/var/run/docker.sock` domin auto-updater da ke cikin container
> ya iya sake ƙirƙirar stack daga daemon na host
> (`src/lib/system/autoUpdate.ts` yana bincikar wannan socket kuma yana tsallake
> hanyar Docker idan babu shi). Wannan socket ɗin **iyakar amincewar root na
> host ce**: duk abin da zai iya isa gare shi yana sarrafa Docker daemon na host a matsayin
> root — yana iya ƙirƙira, dubawa, tsayarwa da cire kowane container a kan host.
> Abubuwan da wannan ke nufi:
>
> 1. **Kada ka taɓa buɗe port na `cli` profile ga network.** Sanya shi
>    a kan `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — `cli` profile da LAN zai iya isa gare shi yana mai da duk wani RCE na matakin dashboard zuwa
>    cikakken kutsawa cikin host.
> 2. **Kada ka yi bind na wasu ƙarin kundin host cikin `cli` profile.**
>    Docker socket tare da kowane ƙarin mount yana ba container ɗin cikakken ikon
>    karantawa/rubutawa ga filesystem da config na host ɗinka. Idan kana buƙatar wani kayan aiki ya
>    ga project, gudanar da shi a gida ta amfani da binary na CLI — kada ka yi masa mount
>    cikin `cli` container.
>
> Idan ba ka buƙatar auto-update a cikin container, kada ka kunna `cli` profile
> (`COMPOSE_PROFILES=core,redis` ko mafi gajarta). Sauran profiles ba sa
> yin mount na Docker socket.
>
> Duba `docs/security/MITM-TPROXY-DECRYPT.md` (git; ba a haɗa shi cikin `/docs` ba) domin threat model mai alaƙa
> da MITM, da kuma `docs/security/SUPPLY_CHAIN.md` domin
> jerin asalin binary na `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute yana dogara da Redis don tallafa wa mai iyakance ƙimar da aka rarraba da kuma ma'ajiyar cache ta bai ɗaya. Sabis ɗin `redis` ana **ayyana shi a koyaushe** a cikin `docker-compose.yml` (ba shi da shingen profile) kuma yana farawa tare da kowane profile.

| Bayani                 | Ƙima                                         |
| ---------------------- | -------------------------------------------- |
| Image                  | `redis:7-alpine`                             |
| Sunan container        | `omniroute-redis`                            |
| Port na ciki           | `6379`                                       |
| Port na host (sauyawa) | `REDIS_PORT` (tsoho shi ne `6379`)           |
| Bind na host (sauyawa) | `REDIS_BIND_HOST` (tsoho shi ne `127.0.0.1`) |
| Volume                 | `omniroute-redis-data` → `/data`             |
| Duba lafiya            | `redis-cli ping` (tazarar 10s)               |

Masu canjin muhalli masu alaƙa:

- `REDIS_URL` — igiyar haɗi da ake saka wa cikin manhajar (`redis://redis:6379` ta tsohuwa).
- `REDIS_PORT` — taswirar port ta gefen host don container na Redis.
- `REDIS_BIND_HOST` — hanyar sadarwar host da ake wallafa port ɗin a kai. Tsoho shi ne `127.0.0.1`.

> **Dalilin da ya sa loopback ne ta tsohuwa:** sidecar ɗin yana aiki ba tare da `requirepass` ba, kuma
> containers na manhajar suna isa gare shi ta hanyar compose network (`redis:6379`) — port ɗin da aka wallafa
> yana nan ne kawai don kayan aikin gefen host (`redis-cli`, ko `npm run dev` na cikin gida). Wallafawa a kan
> `0.0.0.0` zai fallasa Redis marar tantancewa ga kowane host a LAN ɗinka. Idan ka saita
> `REDIS_BIND_HOST=0.0.0.0`, ka ƙara `--requirepass` zuwa `command:` na sabis ɗin ma.

Ba a ba da shawarar **kashe Redis** ba (mai iyakance ƙimar zai koma amfani da madadin cikin-memory mai ƙarancin inganci). Idan dole ne, ko dai ka cire/mai da block ɗin sabis na `redis:` comment a cikin `docker-compose.yml`, ko ka rage ma'auninsa zuwa sifili:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Don snapshot na production da aka keɓe wanda ke aiki tare da dev, yi amfani da `docker-compose.prod.yml`.

| Bayani                   | Ƙima                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| Fayil                    | `docker-compose.prod.yml`                                                                     |
| Tsohon port na dashboard | `PROD_DASHBOARD_PORT=20130` (an daidaita shi zuwa na ciki `${DASHBOARD_PORT:-20128}`)         |
| Tsohon port na API       | `PROD_API_PORT=20131`                                                                         |
| Image                    | `omniroute:prod` (an gina daga target na `runner-cli`)                                        |
| Container na Redis       | `omniroute-redis-prod` (`redis:8.6.2`, keɓaɓɓen volume na `redis-prod-data`)                  |
| Volume na bayanai        | `omniroute-prod-data` (mai suna, ana adana shi duk da sake ginawa)                            |
| Duban lafiya             | `node healthcheck.mjs` + `redis-cli ping`, tare da `depends_on` da lafiyar Redis ke sarrafawa |

Yadda ake amfani:

```bash
# Gina kuma fara stack na production
docker compose -f docker-compose.prod.yml up -d --build

# Nuna logs kai tsaye
docker compose -f docker-compose.prod.yml logs -f

# Rushe stack ɗin (a bar volumes)
docker compose -f docker-compose.prod.yml down
```

Stack na prod yana aiki a lokaci guda da compose na dev (suna da sunayen containers, ports, da volumes daban-daban), don haka za ka iya ci gaba da yin gyare-gyare a cikin gida yayin da production yake ci gaba da aiki.

## Matakan Dockerfile

Ma'ajiyar tana zuwa da Dockerfile mai matakai da yawa (`Dockerfile`). Ana samar da matakai huɗu; zaɓi `target` da ya dace da yanayin amfaninka.

| Mataki        | Hoton tushe           | Manufa                                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Yana shigar da abubuwan dogaro (`npm ci --legacy-peer-deps`) sannan ya gudanar da `npm run build` (yana amfani da Turbopack ta tsohuwa — duba Albarkatun lokacin ginawa a ƙasa)                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Muhallin gudanarwar samarwa tare da fitowar Next.js mai cin gashin kanta. **Ba a haɗa CLI na masu samarwa ba.**                                                                                                                                                                                                             |
| `runner-cli`  | `runner-base`         | Yana ƙara `git`, `docker.io`, `docker-compose` da CLI na duniya: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Zaɓi wannan don ayyukan wakilai.**                                                                                                                                                    |
| `runner-web`  | `runner-base`         | Yana ƙara Playwright + burauzar Chromium (`--with-deps`) don masu samar da zaman yanar gizo: `gemini-web`, `claude-web`, `claude-turnstile`. **Zaɓi wannan idan kana amfani da waɗannan masu samarwa** — hoto na yau da kullum zai gaza a lokacin buƙata idan babu shi (duba bayanin `-web` a ƙarƙashin Tashoshin Fitarwa). |

Gina takamaiman manufa da hannu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Albarkatun lokacin ginawa

Muhawarar ginawa guda uku suna sarrafa adadin albarkatun da matakin `builder` ke amfani da su. Na lokacin ginawa ne kawai —
`OMNIROUTE_MEMORY_MB` (a ƙasa) wani saitin lokacin gudanarwa ne na daban.

| Muhawarar ginawa            | Tsoho  | Tasiri                                                                                             |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0` yana ginawa da webpack maimakon haka. Ƙarancin iyakar amfani da ƙwaƙwalwa, amma ya fi jinkiri. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Matsakaicin heap na V8 (`--max-old-space-size`) don `next build` da aka ƙaddamar.                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Yana ciyar da `CIRCLE_NODE_TOTAL`; Next yana samo `workers = N - 1` don tattara bayanan shafi.     |

`OMNIROUTE_BUILD_WORKERS` shi ne wanda za a ƙara a kan babban injin ginawa, kuma shi ne wanda
ya kamata a fara zargi idan ginawa mai ƙarancin albarkatu ya mutu **bayan** `✓ Compiled successfully`. Kowane
ma'aikacin bayanan shafi tsari ne mai zaman kansa, haka kuma babban `next build` kansa;
wani gwaji kai tsaye a kan VPS (matsala #7518) ya auna iyakar RSS na kowane tsari a
~4.5 GB ba tare da la'akari da tutar heap ta `NODE_OPTIONS` ba (Turbopack yana tarawa a cikin
ƙwaƙwalwar native/Rust da ke wajen heap na V8). An tsara tsohon ƙimar `2` (→ ma'aikaci 1, jimillar
tsaruka 2) don injinan GitHub masu 16 GB / 4 vCPU waɗanda tsarin
bugawa ke amfani da su. A `8` (→ ma'aikata 7), ƙwaƙwalwar wannan injin ta ƙare kuma
buildkit ya gaza matakin da `ResourceExhausted: ... cannot allocate memory`;
`3` (→ ma'aikata 2) ma bai samu isasshen wuri ba bayan an auna RSS na kowane tsari
kai tsaye maimakon ƙiyasta shi. `tests/unit/docker-build-memory-budget.test.ts`
yana yin lissafin bisa adadin da aka auna kuma yana gaza idan ɗaya daga cikin saitunan
ya zarce ƙarfin injin.

Turbopack yana tarawa a cikin ƙwaƙwalwar native Rust wadda take **a wajen** heap na V8, saboda haka
`OMNIROUTE_BUILD_MEMORY_MB` ba ya iyakance ta. A kan na'ura mai iyakar ƙwaƙwalwa,
mai kashe OOM zai kashe aikin ginawa da SIGKILL ba tare da kowane rubutun kuskure ba — kawai
yana tsayawa a tsakiyar `Creating an optimized production build`, wanda ke kama da ya makale
maimakon ƙarewar ƙwaƙwalwa. Idan albarkatun na'urar ginawa suna da iyaka, sauya mai haɗa kunshin:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

An kunna `webpackBuildWorker`, saboda haka `next build` yana gudanar da babban tsari **da kuma** tsarin
ma'aikaci, kuma kowannensu yana bin `OMNIROUTE_BUILD_MEMORY_MB` daban. Saita iyakar ƙwaƙwalwar kwantenar
sama da kusan ninki biyu na wannan ƙimar, ba sau ɗaya ba.

An auna a wannan bishiyar (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Mai haɗa kunshi | Iyakar kwantena | Sakamako                                          |
| --------------- | --------------- | ------------------------------------------------- |
| Turbopack       | 8 GiB / 16 GiB  | OOM ya kashe shi a duka biyun, ba tare da saƙo ba |
| webpack         | 8 GiB           | An kashe ma'aikacin ginawa da SIGKILL             |
| webpack         | 12 GiB          | ya yi nasara, ya kai iyakar 11.1 GiB              |

### Tsoffin saitunan lokacin gudanarwa

Tsoffin saitunan da `runner-base` ke fitarwa: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Halayen ƙwaƙwalwa a cikin Docker:

- Hoton yana saita `OMNIROUTE_MEMORY_MB=1024` kuma yana samo `NODE_OPTIONS=--max-old-space-size=1024` daga gare shi.
- Mai ƙaddamarwa na standalone ne ke fara ainihin tsarin uwar garken, wanda ke karanta `OMNIROUTE_MEMORY_MB` sannan ya ƙara `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node yana amfani da ƙimar `--max-old-space-size` ta ƙarshe idan an maimaita ta, don haka saita `OMNIROUTE_MEMORY_MB` yana sarrafa iyakar heap ta Docker da ake amfani da ita.
- Saboda hoton koyaushe yana saita shi, madadin da mai ƙaddamarwar yake daidaitawa bisa RAM ba ya taɓa aiki a ƙarƙashin Docker. Ƙara shi kai tsaye gwargwadon nauyin aikin (duba teburin da ke ƙasa). `2048` har yanzu ya yi ƙanƙanta ga `/v1/responses` na coding-agent.

### RAM na lokacin aiki don coding agents

Tsohuwar ƙimar Docker ta 1 GiB ita ce mafi ƙarancin abin da dashboard/hira mai sauƙi ke buƙata, ba girman da ya dace da yanayin samarwa ba. Dogayen jikin buƙatun `POST /v1/responses` (ɗaruruwan saƙonni, kayan aiki da yawa) suna riƙe da tsarin bayanai masu alaƙa da juna da dama a cikin ƙwaƙwalwa yayin matsawa. Buƙatu biyu masu cin karo da juna na kusan ~3 MiB / ~750k-token sun sa V8 ya dakata a old-space na **12 GiB** (`FATAL ERROR: Reached heap limit`) sannan kuma suka jawo cgroup OOM na 16 GiB. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Saita girman **cgroup `--memory` sama da heap** — native buffers, SQLite, da bayanan wucin-gadi na matsawa suna wajen V8.

| Nauyin aiki                                | `OMNIROUTE_MEMORY_MB`         | Container / cgroup  | Bayani                                                                                                                |
| ------------------------------------------ | ----------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Dashboard, hira mai sauƙi guda ɗaya        | `1024` (tsohuwar ƙimar hoton) | ≥2 GiB              |                                                                                                                       |
| Coding agent guda ɗaya (Claude/Codex/Grok) | `8192`                        | ≥10 GiB             | Zaman `/v1/responses` guda ɗaya na yau da kullum                                                                      |
| Dogayen `/v1/responses` biyu a lokaci guda | `10240`–`12288`               | ≥12–16 GiB          | An auna dakatarwar V8 a heap na kusan ~12 GiB                                                                         |
| Dogayen contexts uku ko fiye a lokaci guda | kada a yi a process guda ɗaya | jera su / ƙarin RAM | Tsohuwar iyakar karɓar nauyi mai yawa ita ce buƙata 1 mai gudana; ƙara ta ba tare da RAM ba yana sake jawo dakatarwar |

`omniroute serve` a kan bare metal yana daidaita kusan ~35% na RAM (an iyakance shi zuwa `[512, 4096]`) idan ba a saita `OMNIROUTE_MEMORY_MB` **ba**. Docker koyaushe yana saita `1024`, don haka wannan daidaitawar ba ta taɓa gudana a cikin hoton hukuma.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Muhimman Sauye-sauyen Muhalli

Baya ga tsoffin ƙimomin da aka rubuta a cikin [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sauye-sauye masu zuwa ne suka fi muhimmanci yayin gudanarwa a ƙarƙashin Docker:

| Sauyi                         | Manufa                                                                                                                                                                                                                                                                    | Tsohuwar ƙima                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sirrin da aka raba don gadar WebSocket. **Ana buƙatarsa a yanayin samarwa** — saita shi zuwa ƙaƙƙarfan zaren bazuwar.                                                                                                                                                     | ba a saita ba (dole a bayar)   |
| `REDIS_URL`                   | Zaren haɗi na mai iyakance yawan buƙatu / ma'ajiyar wucin gadi                                                                                                                                                                                                            | `redis://redis:6379`           |
| `REDIS_PORT`                  | Tashar ɓangaren host don kwantenar Redis da aka haɗa                                                                                                                                                                                                                      | `6379`                         |
| `REDIS_BIND_HOST`             | Mahaɗin host da ake wallafa tashar Redis ɗin da aka haɗa a kai (loopback sai dai idan ka ƙara AUTH)                                                                                                                                                                       | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hanyar host da ake ɗorawa cikin bayanin martabar `cli` a `/workspace/omniroute` don ayyukan sabunta-kai                                                                                                                                                                   | `.` (kundin adireshi na yanzu) |
| `OMNIROUTE_MEMORY_MB`         | Matsakaicin heap na Node yayin aiki don sabar Docker mai zaman kanta; yana maye gurbin tsohuwar ƙimar hoton da ke sama. Wakilan coding: `8192`+ (duba [RAM na lokacin aiki](#runtime-ram-for-coding-agents)).                                                             | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Maye gurbin tashoshin da aka fallasa na dashboard (20128) da API (20129)                                                                                                                                                                                                  | `20128` / `20129`              |
| `APP_BIND_HOST`               | Mahaɗin host da docker-compose ke wallafa tashoshin dashboard/API/live-WS a kai. Tare da `REQUIRE_API_KEY=false` (tsohuwar ƙima), `0.0.0.0` yana fallasa proxy na `/v1` mara tantancewa ga LAN — faɗaɗa shi kawai tare da `REQUIRE_API_KEY=true` ko reverse proxy a gaba. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Mahaɗin host da docker-compose ke wallafa sidecar na `cliproxyapi` a kai — kundin bayanansa yana riƙe bayanan shaidar masu samarwa.                                                                                                                                       | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Kundin adireshin da mai binciken plugin na lokacin aiki yake karantawa kuma yake girkawa a ciki. Saita shi lokacin da aka ɗaure plugins ta hanyar bind-mount: tsohuwar ƙimar tana bin `HOME`, wanda ba lallai hoto ya fitar ba.                                           | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Ƙaramar hanyar URL lokacin da aka wallafa manhajar a bayan reverse proxy (misali `/omniroute`)                                                                                                                                                                            | _(fanko = tushe)_              |
| `NEXT_PUBLIC_BASE_URL`        | Asalin adireshin burauzar jama'a wanda ya haɗa da ƙaramar hanyar (misali `https://host/omniroute`)                                                                                                                                                                        | ba a saita ba                  |
| `PROD_DASHBOARD_PORT`         | Tashar dashboard ta ɓangaren host don `docker-compose.prod.yml`                                                                                                                                                                                                           | `20130`                        |
| `CLIPROXYAPI_PORT`            | Tashar ɓangaren host don sidecar na `cliproxyapi`                                                                                                                                                                                                                         | `8317`                         |

## Reverse Proxy a kan Ƙaramin Hanya (Traefik / nginx)

Ana haɗa `basePath` na Next.js a cikin standalone bundle yayin ginawa. OmniRoute yana adana
ƙimar da aka haɗa a cikin sentinel file a tushen manhajar (ana rubuta shi yayin `npm run build`; ana karanta shi ta
`scripts/docker/ensure-docker-base-path.mjs`) sannan yana kwatanta shi da
`OMNIROUTE_BASE_PATH` lokacin da container ya fara aiki. Idan sun bambanta kuma an
gina image ɗin don tushen domain, entrypoint zai sake rubuta standalone manifests,
ƙimomin `basePath`/`assetPrefix` da aka saka a ciki (Next 16 yana samar da URL na kadarorin SSR daga
`assetPrefix` kaɗai — patcher yana kwafin ƙaramin hanyar zuwa cikinsa), URL na kadarorin
`/_next/static` da aka haɗa (client-reference manifests, media imports, shafukan kuskure da aka
riga aka render) da kuma shim na `process.env` na client kafin `node dev/run-standalone.mjs`
ya gudana.

### Ginawa da Compose (ana ba da shawara)

Saita duka variables ɗin a cikin `.env`, sannan ka sake ginawa domin image da runtime su yi daidai:

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

Images na `diegosouzapw/omniroute:*` da aka wallafa an gina su ne don tushen domain. Har yanzu za ka iya
saita `OMNIROUTE_BASE_PATH` a lokacin runtime; container zai yi wa bundle ɗin patch sau ɗaya lokacin farawa.
Haɗa shi da public origin da ya dace:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Saita reverse proxy domin ya tura **cikakkiyar** hanyar waje (kada a cire
prefix). Ya kamata Traefik ya tura `PathPrefix(`/omniroute`)` zuwa container ba tare da
`StripPrefix` ba, domin Next.js ya karɓi `/omniroute/...` kuma ya samar da kadarori daga
`/omniroute/_next/...`.

Docker healthcheck yana gwada lifecycle endpoint mai sauƙi na `/healthz` wanda aka sa masa prefix
na `OMNIROUTE_BASE_PATH` mai aiki. `/api/monitoring/health` yana nan har yanzu don
binciken matsala na mutum/dashboard; domin mayar da HEALTHCHECK na container zuwa gare shi (misali
don tilasta zurfin binciken lafiya), saita `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Wannan hanyar bincike ce mai **zurfi** (DB + taƙaitaccen monitoring) — ta dace da
`HEALTHCHECK` na Docker wanda ba ya yawan gudana idan ka zaɓi sake amfani da ita, amma **ba** ta dace da tazarar
`livenessProbe` ta Kubernetes ba.

Ga orchestrators (Kubernetes, Nomad, da sauransu):

| Probe           | Fi so                                                               | Guje wa                                                              |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, ko TCP a kan babban port (`PORT`, tsoho `20128`) | Amfani da `/api/monitoring/health` a matsayin liveness               |
| Readiness       | HTTP `GET /healthz`                                                 | Ƙanƙantar timeout da ke ɗaukar cunkoson event-loop a matsayin mutuwa |
| Deep / blackbox | `/api/monitoring/health`                                            | —                                                                    |

`/healthz` yana bayar da rahoton lifecycle na process (`ok` / `starting` / `stopping`). `/livez`
yana duba ko process yana aiki ne kawai (200 duk lokacin da handler zai iya gudana; ba ya jiran
readiness). Dukansu har yanzu suna gudana a kan Node event loop ɗaya da sarrafa requests, saboda haka
aikin catalog ko compression mai nauyin CPU na iya jinkirta su — cunkoso ≠ mutuwa. Fi son TCP
liveness idan HTTP probes suna ƙarewa saboda timeout. Cikakken jagorar probes:
[Jagorar monitoring — shawarwarin probes na Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose tare da Caddy (HTTPS Auto-TLS)

Ana iya fallasa OmniRoute cikin aminci ta amfani da samar da SSL ta atomatik na Caddy. Tabbatar rikodin DNS A na yankinku yana nuni zuwa IP na sabarku.

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
      # URL na cikin gida daga saba zuwa saba don ayyukan da aka tsara / buƙatun da tsarin ke yi wa kansa.
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

Caddy yana saita daidaitattun headers na turawa don kwantenan da ke sama. OmniRoute yana amfani da
`NEXT_PUBLIC_BASE_URL` a matsayin tabbataccen asalin jama'a don kiran-baya na OAuth da hanyoyin
jama'a da aka samar; rubuce-rubucen dashboard masu buƙatar tantancewa suna amfani da buƙatu daga
asali ɗaya tare da kariyar CSRF da aka ɗaura da zaman. Kunna `OMNIROUTE_TRUST_PROXY` kawai don
ingantattun tura tsarin inda da gangan kuke son OmniRoute ya samo asalin jama'a daga amintattun
headers da aka tura maimakon bayyanannen saiti.

## Cloudflare Quick Tunnel

Tallafin dashboard don tura tsarin Docker ya ƙunshi **Cloudflare Quick Tunnel** na dannawa sau ɗaya a `Dashboard → Endpoints`. A kunnawa na farko, ana sauke `cloudflared` ne kawai idan ana buƙatarsa, a fara ramin wucin gadi zuwa endpoint ɗinku na `/v1` na yanzu, sannan a nuna URL ɗin `https://*.trycloudflare.com/v1` da aka samar kai tsaye a ƙasan URL ɗinku na jama'a na yau da kullum.

Ana iya nuna ko ɓoye bangarorin ramin endpoint (Cloudflare, Tailscale, ngrok) daga `Settings → Appearance` ba tare da canza halin ramin da ke aiki ba.

### Bayanan Rami

- URL na Quick Tunnel na wucin gadi ne kuma suna canzawa bayan kowane sake farawa.
- Ba a maido da Quick Tunnels ta atomatik bayan sake farawa na OmniRoute ko kwantena. Sake kunna su daga dashboard idan ana buƙata.
- Shigarwa da ake sarrafawa a halin yanzu yana tallafawa Linux, macOS, da Windows a kan `x64` / `arm64`.
- Quick Tunnels da ake sarrafawa suna amfani da jigilar HTTP/2 ta tsohuwa don kauce wa gargaɗin cunkoson buffer na QUIC UDP a muhallin kwantena masu ƙarancin albarkatu. Saita `CLOUDFLARED_PROTOCOL=quic` ko `auto` idan kuna son wata hanyar jigilar daban.
- Hotunan Docker sun ƙunshi tushen CA na tsarin kuma suna mika su ga `cloudflared` da ake sarrafawa, wanda ke hana gazawar amincewar TLS lokacin da ramin yake fara aiki a cikin kwantena.
- Saita `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` idan kuna son OmniRoute ya yi amfani da binary da yake akwai maimakon sauke wani.

## Alamomin Hoto

| Hoto                     | Alama    | Girma  | Bayani                                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer tsayayye mafi girma da aka **wallafa** (ba git `main` ba) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Kulle wannan rukunin alama don GitOps                            |

Manifest na dandamali da yawa: `linux/amd64` + `linux/arm64` na asali (Apple Silicon, AWS Graviton, Raspberry Pi). Docker yana zaɓar gine-ginen da ya dace ta atomatik; miƙa `--platform linux/amd64` idan kana buƙatar tilasta kwaikwayon AMD64 a kan masaukan ARM.

### Tashoshin Fitarwa

OmniRoute yana wallafa tashoshin Docker daban-daban don fitowar tsayayyen siga, gwajin reshen fitarwa mai aiki, da ginannun sigogin ci gaba.

| Tasha                           | Tushe                                         | Sauyawa                             | Amfanin da aka ba da shawara                                                                                                       |
| ------------------------------- | --------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Fitowar da aka sa wa hannu/aka ba siga        | Ba ya canzawa                       | Aiwatarwar samarwa da ke kulle takamaiman fitowa                                                                                   |
| `:latest` / `:latest-web`       | SemVer tsayayye mafi girma da aka **wallafa** | Mai nuna tsayayyen siga mai sauyawa | Yana bin fitowar tsayayyun sigogi **bayan** aikin wallafa SemVer — **ba ya** bin `main` ko commit na `release/v*` da ba a fitar ba |
| `:next` / `:next-web`           | Reshen `release/v*` na yanzu da aka zaɓa      | Mai nuna kafin-fitowa mai sauyawa   | Gwajin gyare-gyaren da suka shiga reshen fitarwa mai aiki amma ba su shiga fitowar tsayayyen siga ba tukuna                        |
| `:main` / `:main-web`           | Reshen `main`                                 | Mai nuna ci gaba mai sauyawa        | Don gwajin ci gaba da haɗa-tsari kawai                                                                                             |

#### Masu samar da zaman yanar gizo: hotunan `-web`

Kowace tasha da ke sama tana kuma da alamar `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), waɗanda aka gina daga matakin `runner-web` — hoto iri ɗaya tare da Playwright da burauzar Chromium. Hoton yau da kullum yana zuwa **ba tare da** Chromium ba; `gemini-web`, `claude-web` da `claude-turnstile` suna buƙatarsa.

Ana jinkirta faruwar gazawar, ba ta faruwa a lokacin farawa: waɗannan masu samarwar suna jera samfuran su kuma suna bayyana a matsayin haɗaɗɗu a allon gudanarwa, sannan buƙata ta farko ce kawai ke gazawa da

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Idan kana amfani da waɗannan masu samarwar, sauke alamar `-web` ta tashar da kake kai a yanzu — babu wani abu da zai canza. A shigarwar npm/CLI (ba tare da hoton Docker ba), abin da ya yi daidai da wannan ɓangaren da ya ɓace shi ne fayil ɗin binary na burauza: gudanar da `npx playwright install chromium` a kan masaukin.

#### Amfani da tashar kafin-fitowa

Ana sake gina tashar `next` a duk lokacin da aka yi push zuwa reshen `release/v*` na yanzu da aka zaɓa, kuma ana wallafa ta don AMD64 da ARM64. Tsofaffin rassan kulawa ba za su iya sake rubuta ta ba. Tashar tana samar da hoto da za a iya saukewa don gyare-gyaren da aka haɗa cikin reshen fitarwa mai aiki kafin a ƙirƙiri alamar tsayayyen siga ta gaba.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Don Docker Compose, maye gurbin alamar hoton da profile ɗin da aka zaɓa yake amfani da ita, sannan sauke kuma sake ƙirƙirar sabis ɗin:

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

`next` tasha ce ta kafin-fitowa mai shawagi. Tana iya canzawa a duk wani push zuwa reshen fitarwa mai aiki kuma **ba a tallafa mata don amfanin samarwa ba**. Kulle digest na hoton yayin tantance takamaiman gini:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kafin gwaji, yi ajiyar madadin volume na bayanan OmniRoute ko kundin bayanan da aka ɗaura ta bind mount. Don komawa baya, dawo da tsayayyen siga ko digest da aka yi amfani da shi a baya sannan sake ƙirƙirar container ɗin:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ginin reshen fitarwa ba zai taɓa iya matsar da `latest` ba; tsayayyen semantic version da ya cancanta ne kawai zai iya ɗaukaka mai nuna tsayayyen siga. Hotunan `next` suna riƙe binciken hoton fitarwa da ƙofar toshe raunin tsaro na CRITICAL.

**`latest` ba tabbacin sabuntar git ba ne.** Gyare-gyaren da aka haɗa a `main` ko a reshen `release/v*` mai aiki **ba sa** cikin `:latest` har sai an wallafa hoton SemVer tsayayye kuma aikin wallafawa ya ɗaukaka `:latest` (digest iri ɗaya da na wannan SemVer). Idan `latest` yana kama da ya tsaya yayin da GitHub ya riga ya nuna gyaran, sauke `:next` don gwada reshen fitarwa ko jira alamar SemVer.

| Abin da kake so                                                              | Yi amfani da                        |
| ---------------------------------------------------------------------------- | ----------------------------------- |
| GitOps / samarwa wanda dole ne kada ya karkata                               | Kulle `:X.Y.Z` (ko digest na hoton) |
| Bin tsayayyun sigogi da aka wallafa da karɓar sake ƙirƙirawa a kowace fitowa | `:latest`                           |
| Gwada commit na `release/v*` da ba a fitar ba                                | `:next` (ba don samarwa ba)         |
| Gwada `main`                                                                 | `:main` (ba don samarwa ba)         |

## Samuwa: SQLite na asali na da kwafi guda ɗaya

OmniRoute na yau da kullum a Docker / Kubernetes yana da **tsarin Node guda ɗaya + mai rubuta SQLite guda ɗaya**. Ba a goyon bayan samuwa mai yawa a wannan tsarin.

| Ƙuntatawa                                           | Sakamako                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mai rubutu guda ɗaya                                | **Kada** a gudanar da kwafi masu yawa suna amfani da fayil ɗin SQLite guda ɗaya. Hakan yana lalata DB.                                                                                                                                                                                                                                                              |
| Sake ƙirƙira / sake farawa / kashewa ta HEALTHCHECK | **Katsewa gaba ɗaya** ga SSE da ke gudana, zaman dashboard, da yanayin da ke cikin ƙwaƙwalwa. Duk abokan hulɗa da aka haɗa za su katse. Sabbin buƙatu a lokacin da babu endpoint za su sami **`502 Bad Gateway: Unknown error`** daga reverse-proxy, ba JSON na OmniRoute ba — abokan hulɗa ba za su iya bambanta wannan da gazawar mai samar da sabis ba (#11015). |
| Event loop ɗaya da `/healthz`                       | Catalog mai aiki sosai ko zagayen compression na iya jinkirta probes; ɗan gajeren timeout zai sake kunna kwafin **guda ɗaya tilo**.                                                                                                                                                                                                                                 |

**Jadawalin probe** (duba kuma [shawarwarin probe na Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe          | Manufa                                                               | Kada a yi amfani da                                               |
| -------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Liveness       | TCP a kan `PORT` (na asali `20128`), ko HTTP `/healthz` mai sassauci | `/api/monitoring/health`                                          |
| Readiness      | HTTP `GET /healthz`                                                  | Gajerun timeout masu ɗaukar cunkoson event-loop a matsayin mutuwa |
| Zurfi / mutane | `/api/monitoring/health`                                             | Liveness na kubelet mai sarrafa kansa                             |

**Haɓakawa:** ku sa ran kowane zama zai katse. Ku dakatar da karɓar sababbin ayyuka daga abokan hulɗa idan zai yiwu; babu rolling update a SQLite na asali. Compose `restart: unless-stopped` tare da Docker `HEALTHCHECK` su ma za su maye gurbin tsari guda ɗaya tilo idan container ya zama Unhealthy — tasirin yaƙi iri ɗaya ne.

Guntun saitin Kubernetes don **kwafi guda ɗaya** (ana buƙatar Recreate; kada a ƙara `replicas` a kan fayil ɗin SQLite guda ɗaya):

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

Jiran `preStop` yana ba kube damar cire endpoints na Service kafin SIGTERM, domin zirga-zirgar **sabo** ta daina isa ga tsarin da ke mutuwa. Ana ba SSE na `/v1/responses` da ke gudana damar kammalawa har zuwa `SHUTDOWN_TIMEOUT_MS` (na asali 30s) ta hanyar manyan admission leases (#11015). Sabbin buƙatun da har yanzu suka isa tsarin za su sami `503` + `Retry-After: 5`. Tazarar Recreate da babu endpoint har sai madadin ya zama Ready har yanzu katsewa ce gaba ɗaya — wannan shi ne tsarin SQLite, ba kuskuren daidaita probe ba.

Postgres na waje / HA mai marubuta da yawa **ba** wata sananniyar hanyar da aka rubuta takardunta ta asali ba ce. Idan kuna buƙatar HA, ku ci gaba da amfani da kwafi guda ɗaya ko ku gudanar da tsarin da aikin ya gwada kuma ya rubuta takardunsa daban. Aikin Postgres/MySQL yana cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Har sai an fitar da wannan, hanya ɗaya tilo da ake goyon baya don ninka ƙarfin **manyan** `/v1/responses` ita ce tsare-tsare masu zaman kansu guda N (sashe na gaba), ba `replicas > 1` a kan volume guda ɗaya ba.

## Faɗaɗawa: matakai N masu zaman kansu

Tsarin Node guda ɗaya yana da **heap na V8 guda ɗaya**. Buƙatun wakilin rubuta lamba guda biyu masu cin karo, kowannensu kusan ~3 MiB / ~750k-token, na `POST /v1/responses` (RTK + Caveman), suna sa heap ɗin ya rushe a kusan ~12 Gi (`FATAL ERROR: Reached heap limit`) kuma suna iya haifar da OOM a cgroup mai 16 Gi. Duba [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Wannan ma'auni gargaɗi ne na **kasafin ƙwaƙwalwa**, ba ƙaƙƙarfan iyakar samfur na buƙatun `/v1/responses` masu tsawo guda biyu da ke gudana lokaci guda ba. Ana sarrafa karɓar manyan buƙatun chat ta hanyar kasafin bytes na shigarwa da ake ƙirƙira ta atomatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) wanda aka daidaita bisa wannan iyakar V8/cgroup ɗin — ƙara darajarsa sama da haka (ko sa tsohuwar iyakar ƙidayar buƙatu ta `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) a kan tsarin da aka riga aka daidaita girmansa zai sake haifar da rushewar. Ƙananan chats, `/healthz`, `/v1/models`, da MCP **ba sa** cikin wannan iyakar.

### Tsari guda ɗaya: fiye da buƙatun `/v1/responses` masu tsawo guda biyu

Tsari mai **ƙoshin lafiya** (heap yana ƙasa da `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, tsohuwar ƙima `0.75`) **na iya** gudanar da fiye da buƙatun `POST /v1/responses` masu tsawo guda biyu lokaci guda idan kasafin bytes na buƙatun da ke gudana a faɗin tsarin (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) har yanzu yana da sarari. Jikin buƙatu da ya kai ko ya wuce `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (tsohuwar ƙima 256 KiB) yana ɗaukar irin izinin manyan buƙatu da buƙatun masu sarƙaƙƙiyar tsari suke ɗauka, kuma yana amfani da hanyar kaucewa ta [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dubban goma na abokan cinikin SSE masu dogon haɗi da ke gudana lokaci guda (galibi masu gudanarwa suna buƙatar 40–50) batu ne na **kasafin ƙwaƙwalwa** — daidaita heap + guraben farko/ƙarin sarari + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ba ƙaƙƙarfan iyakar samfur ta “max 2” ba. Heap da ke ƙarƙashin matsin lamba har yanzu yana rage lodin ta hanyar `503` da za a iya sake gwadawa, domin kada matsalar #7849 ta dawo.

Don **ninka heaps** (tsofaffin sararin V8 masu zaman kansu) **a yau**:

| Yi                                                                                                                                                                                                  | Kada a yi                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Gudanar da **containers/pods guda N**, kowannensu da **nasa** `DATA_DIR` / volume                                                                                                                   | Saita `replicas > 1` a kan fayil ɗin SQLite guda ɗaya                      |
| Daidaita manyan buƙatun da ke gudana + ƙarin sarari na ƙoshin lafiya bisa kasafin heap / bytes na buƙatun da ke gudana; 1–2 ne tsohuwar ƙimar taka-tsantsan ta #7849, ba ƙaƙƙarfan iyakar samfur ba | Ba tsari guda ɗaya RAM mai ninki 8 da iyakar ƙidaya marar iyaka            |
| Na zaɓi: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` don **ma'aunin ƙayyadaddun amfani na bai ɗaya**                                                                                       | Ɗauki Redis a matsayin SQLite na bai ɗaya — ba haka yake ba                |
| Kwafi sirrin masu samarwa zuwa kowane instance (ko amince da dashboards da aka rarraba)                                                                                                             | Yi tsammanin dashboard guda ɗaya / rajistar kira guda ɗaya a duk instances |
| Sanya kowane load balancer a gaba; manne wa API key ko session ya isa                                                                                                                               | Buƙaci middleware mai la'akari da girma na takamaiman dillali              |

Kayan aiki: adadin buƙatun `/v1/responses` masu tsawo da za su iya gudana lokaci guda a kowane instance batu ne na **kasafin ƙwaƙwalwa** (heap + bytes na buƙatun da ke gudana / #10110). `DATA_DIR`s guda `N` masu zaman kansu har yanzu suna ninka heaps: dole ne RAM na host ya ɗauki `N × cgroup`, ba “pod guda mai 16 Gi tare da N=8” ba. Kada a taɓa sa `replicas > 1` a kan fayil ɗin SQLite guda ɗaya.

Misalin Compose (heaps guda biyu, volumes guda biyu — ba `deploy.replicas: 2` ba):

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

Yawan aiki a cikin tsari guda (tare da cire matsawa daga HTTP isolate) yana cikin [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Gungu na ma'ana guda ɗaya a kan durable state na bai ɗaya yana cikin [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Muhimman Bayanan Kula

- **Yanayin SQLite WAL:** Ya kamata a bar `docker stop` ya kammala domin OmniRoute ya iya rubuta sabbin sauye-sauye na ƙarshe daga checkpoint zuwa cikin `storage.sqlite`. Fayilolin Compose da aka haɗa sun riga sun saita lokacin jiran tsayawa na daƙiƙa 40. Idan kana gudanar da image ɗin kai tsaye, ka ci gaba da amfani da `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Saita shi zuwa `true` idan ana sarrafa madadin bayanai na yau da kullum/kafin rubutawa daga waje. Ƙaura ta bayanan bayanai da suke akwai har yanzu tana buƙatar nata tsayayyen snapshot na tsaro da kariyar ƙaura mai yawa.
- **Dawwamar Bayanai:** Koyaushe ka haɗa volume zuwa `/app/data` domin adana bayanan bayananka, maɓallai, da saituna duk lokacin da aka sake kunna container.
- **Saitin Port:** Sauya environment variable na `PORT` domin canza tsohon port na `20128`.

## Duba Kuma

- [Jagorar Turawa zuwa VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Saitin VM + nginx + Cloudflare
- [Jagorar Turawa zuwa Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Tura zuwa Fly.io
- [Saitin Environment](../reference/ENVIRONMENT.md) — Cikakken bayani game da `.env`
