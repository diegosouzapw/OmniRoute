# 🐳 Docker Guide — OmniRoute (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Tagairt iomlán d’imscaradh Docker. Chun tosú go tapa, féach ar [rannán Docker sa README](../README.md#-docker).

## Clár na nÁbhar

- [Rith Thapa](#quick-run)
- [Le Comhad Timpeallachta](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Próifílí atá ar Fáil](#available-profiles)
- [Uirlisí CLI an óstaigh a chumrú nuair a ritheann OmniRoute in Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Taobhcharr Redis](#redis-sidecar)
- [Compose Táirgthe](#production-compose)
- [Céimeanna Dockerfile](#dockerfile-stages)
- [Athróga Timpeallachta Ríthábhachtacha](#critical-environment-variables)
- [Docker Compose le Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tollán Tapa Cloudflare](#cloudflare-quick-tunnel)
- [Clibeanna Íomhá](#image-tags)
- [Infhaighteacht: is macasamhail aonair é SQLite de réir réamhshocraithe](#availability-default-sqlite-is-single-replica)
- [Nótaí Tábhachtacha](#important-notes)

---

## Rith Thapa

> **Féinóstáil le hordú amháin?** Féach ar an
> [Treoir Féinóstála](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (íomhá fhoilsithe +
> Redis, aischúb amháin, gan rogha próifíle). Is é an Rith Thapa thíos an
> chonair aon-choimeádáin d’úsáideoirí a ritheann Redis in áit eile cheana féin.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Le Comhad Timpeallachta

```bash
# Cóipeáil agus cuir .env in eagar ar dtús
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
# Bunphróifíl (gan uirlisí CLI)
docker compose --profile base up -d

# Próifíl CLI (Claude Code, Codex agus OpenClaw ionsuite)
docker compose --profile cli up -d

# Próifíl óstaigh (Linux ar dtús; feistíonn sé dénártha CLI an óstaigh mar inléite amháin)
docker compose --profile host up -d

# Comhcheangail CLI + taobhcharr CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Próifílí atá ar Fáil

Tagann ceithre phróifíl Compose le OmniRoute. Roghnaigh an ceann a oireann do do thimpeallacht.

| Próifíl              | Seirbhís         | Cathain is ceart í a úsáid                                                                                                                                     | Ordú                                         |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (réamhshocrú) | `omniroute-base` | Freastalaí gan chomhéadan / am rite íosta, gan CLIanna soláthraithe san áireamh                                                                                | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Sreafaí oibre gníomhairíocha a ghlaonn `omniroute providers/setup/doctor` agus CLIanna ionsuite (Codex, Claude Code, Droid, OpenClaw)                          | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Óstaigh Linux ar mian leo rochtain ar nós `network_mode` ar CLIanna an óstaigh trí `~/.local/bin`, `~/.codex`, `~/.claude`, srl. a fheistiú mar inléite amháin | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Rith taobhcharr [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) ar phort `8317` le haghaidh seachfhreastalaíochta CLI réamhtheachtaí               | `docker compose --profile cliproxyapi up -d` |

> Is féidir próifílí iomadúla a chomhcheangal: `docker compose --profile cli --profile cliproxyapi up -d`.

## Uirlisí CLI an óstaigh a chumrú nuair a ritheann OmniRoute in Docker

Scríobhann `omniroute setup-codex`, `setup-claude`, `config set <tool>` agus cnaipe
**Sábháil an chumraíocht** an deais comhaid amhail `~/.codex/*.config.toml`. Ní bhíonn
ciall leis na conairí sin ach ar an ríomhaire ar a ritheann an CLI féin. Má ritheann
tú iad laistigh den choimeádán, scríobhtar iad i gcomhadlann bhaile an choimeádáin
féin (`/home/node` — ritheann an íomhá mar `USER node`), áit nach léifidh CLI ar bith
ar an óstach iad choíche agus ina scriosfar iad a luaithe a athchruthófar an coimeádán.

Aimsíonn OmniRoute é seo agus diúltaíonn sé don scríobh, agus tugann sé treoracha
ina ionad seachas rath nach féidir leat a úsáid a thuairisciú: scoireann an CLI le
`2`, agus freagraíonn an API le `422` agus `containerEphemeralTarget: true`.

### Molta: rith an CLI ar an óstach agus OmniRoute in Docker

Freastalaíonn an coimeádán ar an API; cumraíonn an CLI d’uirlisí óstaigh.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # dírigh an CLI ar an gcoimeádán
omniroute setup-codex                      # scríobhann sé an fíor-~/.codex ar d’óstach
```

Is é seo an rogha cheart nuair a ritheann Codex, Claude Code, Cursor nó a leithéid
ar do ríomhaire glúine — arb é sin an gnáthshocrú.

### Rogha eile: ceangail comhadlanna cumraíochta an óstaigh mar bind mount (próifíl `host`)

Más mian leat go scríobhfadh an coimeádán féin cumraíocht d’óstaigh, feistigh na
comhadlanna ann agus dírigh `CLI_CONFIG_HOME` ar fhréamh an fheistithe. Déanann an
phróifíl `host` é seo cheana:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Is é bind mount a fhágann go bhfuil an chonair iontaofa: léann OmniRoute
`/proc/self/mountinfo` agus ceadaíonn sé scríobh chuig conairí feistithe (agus chuig
comhadlanna ar feistithe iad a gcuid páistí, arb é sin go díreach struchtúr
`/host-home` thuas), agus leanann sé de dhiúltú do chonairí neamhfheistithe.

### Bealach éalaithe: cumraigh CLIanna an choimeádáin féin (úsáid go spárálach)

Nuair atá na CLIanna laistigh den choimeádán i ndáiríre (an phróifíl `cli`), bíonn
an scríobh d’aon ghnó. Cuir `--allow-container-write` chuig aon ordú `setup-*`, nó
socraigh `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` don fhreastalaí. Leanann an
scríobh ar aghaidh le rabhadh nach mairfidh sé tar éis an choimeádáin.

> **Rabhadh slándála — próifíl `cli` + feistiú `docker.sock`.**
> Feistíonn an phróifíl `cli` `/var/run/docker.sock` mar bind mount ionas gur féidir
> leis an uath-nuashonraitheoir laistigh den choimeádán an chruach a athchruthú ó
> dheamhan an óstaigh (`src/lib/system/autoUpdate.ts` a dhéanann seiceáil don
> tsoicéad sin agus a scipeálann conair Docker nuair nach mbíonn sé ann). Is
> **teorainn iontaoibhe le pribhléidí fréimhe ar an óstach** é an soicéad sin: is
> féidir le haon rud a bhfuil rochtain aige air deamhan Docker an óstaigh a rialú
> mar root — is féidir leis coimeádán ar bith ar an óstach a chruthú, a iniúchadh,
> a stopadh agus a bhaint. Na himpleachtaí:
>
> 1. **Ná nocht port na próifíle `cli` don líonra riamh.** Foilsigh
>    ar `127.0.0.1` é (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — má tá próifíl `cli` inrochtana ón LAN, is féidir le haon RCE ar leibhéal
>    na deaise an t-óstach iomlán a chur i mbaol.
> 2. **Ná ceangail aon chomhadlanna óstaigh breise leis an bpróifíl `cli`.**
>    Tugann soicéad Docker mar aon le haon fheistiú breise rochtain iomlán
>    léite/scríofa don choimeádán ar do chóras comhad agus ar chumraíocht an óstaigh.
>    Más gá d’uirlis tionscadal a fheiceáil, rith go háitiúil í leis an dénártha CLI
>    — ná feistigh isteach sa choimeádán `cli` í.
>
> Mura bhfuil uath-nuashonrú laistigh den choimeádán de dhíth ort, fág an phróifíl
> `cli` múchta (`COMPOSE_PROFILES=core,redis` nó luach níos giorra). Ní fheistíonn
> na próifílí eile soicéad Docker.
>
> Féach `docs/security/MITM-TPROXY-DECRYPT.md` (git; gan tiomsú isteach in `/docs`) don tsamhail bhagartha ghaolmhar
> maidir le MITM, agus `docs/security/SUPPLY_CHAIN.md` don slabhra
> bunáitíochta dénártha `codex`/`claude-code`/`droid`/`openclaw`.

## Taobhcharr Redis

Braitheann OmniRoute ar Redis chun tacú leis an teorantóir ráta dáilte agus leis an taisce chomhroinnte. Sainmhínítear an tseirbhís `redis` **i gcónaí** in `docker-compose.yml` (níl aon gheata próifíle aici) agus tosaíonn sí in éineacht le haon phróifíl eile.

| Sonra                       | Luach                                               |
| --------------------------- | --------------------------------------------------- |
| Íomhá                       | `redis:7-alpine`                                    |
| Ainm an choimeádáin         | `omniroute-redis`                                   |
| Port inmheánach             | `6379`                                              |
| Port an óstríomhaire (sárú) | `REDIS_PORT` (is é `6379` an réamhshocrú)           |
| Ceangal óstríomhaire (sárú) | `REDIS_BIND_HOST` (is é `127.0.0.1` an réamhshocrú) |
| Imleabhar                   | `omniroute-redis-data` → `/data`                    |
| Seiceáil sláinte            | `redis-cli ping` (eatramh 10s)                      |

Athróga timpeallachta gaolmhara:

- `REDIS_URL` — teaghrán ceangail a instealltar san aip (`redis://redis:6379` de réir réamhshocraithe).
- `REDIS_PORT` — mapáil poirt ar thaobh an óstríomhaire don choimeádán Redis.
- `REDIS_BIND_HOST` — comhéadan an óstríomhaire ar a bhfoilsítear an port. Is é `127.0.0.1` an réamhshocrú.

> **Cén fáth a n-úsáidtear an comhéadan lúbtha de réir réamhshocraithe:** ritheann an taobhcharr gan `requirepass`, agus sroicheann coimeádáin
> na haipe é thar líonra compose (`redis:6379`) — níl an port foilsithe ann ach amháin
> d’uirlisí ar thaobh an óstríomhaire (`redis-cli`, `npm run dev` áitiúil). Dá bhfoilseofaí ar
> `0.0.0.0` é, nochtfaí Redis gan fíordheimhniú do gach óstríomhaire ar do LAN. Má shocraíonn tú
> `REDIS_BIND_HOST=0.0.0.0`, cuir `--requirepass` le `command:` na seirbhíse freisin.

Ní mholtar **Redis a dhíchumasú** (titfidh an teorantóir ráta siar chuig rogha ionchuimhne nach bhfuil chomh héifeachtach céanna). Más gá duit é sin a dhéanamh, bain bloc seirbhíse `redis:` as `docker-compose.yml` nó cuir nóta tráchta air, nó scálaigh go nialas é:

```bash
docker compose up -d --scale redis=0
```

## Compose Táirgthe

Le haghaidh léargais táirgthe leithlisigh a ritheann taobh leis an timpeallacht forbartha, úsáid `docker-compose.prod.yml`.

| Sonra                         | Luach                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| Comhad                        | `docker-compose.prod.yml`                                                             |
| Port réamhshocraithe an deais | `PROD_DASHBOARD_PORT=20130` (mapáilte chuig `${DASHBOARD_PORT:-20128}` inmheánach)    |
| Port réamhshocraithe API      | `PROD_API_PORT=20131`                                                                 |
| Íomhá                         | `omniroute:prod` (tógtha ón sprioc `runner-cli`)                                      |
| Coimeádán Redis               | `omniroute-redis-prod` (`redis:8.6.2`, imleabhar tiomnaithe `redis-prod-data`)        |
| Imleabhar sonraí              | `omniroute-prod-data` (ainmnithe, coinnithe thar atógálacha)                          |
| Seiceálacha sláinte           | `node healthcheck.mjs` + `redis-cli ping`, agus `depends_on` faoi réir shláinte Redis |

Conas é a úsáid:

```bash
# Tóg agus tosaigh an chruach táirgthe
docker compose -f docker-compose.prod.yml up -d --build

# Sruthaigh na logaí
docker compose -f docker-compose.prod.yml logs -f

# Díchóimeáil (coinnigh na himleabhair)
docker compose -f docker-compose.prod.yml down
```

Ritheann an chruach táirgthe go comhthreomhar leis an compose forbartha (ainmneacha coimeádán, poirt agus imleabhair éagsúla), mar sin is féidir leat leanúint den atriall go háitiúil agus an córas táirgthe fós ar bun.

## Céimeanna Dockerfile

Tagann Dockerfile ilchéime (`Dockerfile`) leis an stór. Cuirtear trí chéim ar fáil; roghnaigh an `target` ceart do do chás úsáide.

| Céim          | Buníomhá              | Cuspóir                                                                                                                                                                                                       |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Suiteálann sé spleáchais (`npm ci --legacy-peer-deps`) agus ritheann sé `npm run build` (Turbopack de réir réamhshocraithe — féach Acmhainní ag am tiomsaithe thíos)                                          |
| `runner-base` | `node:26-trixie-slim` | Timpeallacht rite táirgthe le haschur neamhspleách Next.js. **Ní chuimsítear aon CLI soláthraí.**                                                                                                             |
| `runner-cli`  | `runner-base`         | Cuireann sé `git`, `docker.io`, `docker-compose` agus CLIanna domhanda leis: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Roghnaigh é seo le haghaidh sreafaí oibre gníomhairíocha.** |

Tiomsaigh sprioc ar leith de láimh:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Acmhainní ag am tiomsaithe

Rialaíonn trí argóint tiomsaithe costas na céime `builder`. Ní bhaineann siad ach le ham tiomsaithe —
is rialtán rite ar leith é `OMNIROUTE_MEMORY_MB` (thíos).

| Argóint tiomsaithe          | Réamhshocrú | Éifeacht                                                                                                   |
| --------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`         | Tiomsaíonn `0` le webpack ina ionad. Buaicúsáid chuimhne níos ísle, ach níos moille.                       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | Uasteorainn chairn V8 (`--max-old-space-size`) don `next build` a sheoltar.                                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Soláthraíonn sé `CIRCLE_NODE_TOTAL`; díorthaíonn Next `workers = N - 1` chun sonraí leathanaigh a bhailiú. |

Is é `OMNIROUTE_BUILD_WORKERS` an ceann is ceart a ardú ar chóras mór tiomsaithe agus an ceann
is ceart a bheith in amhras faoi nuair a theipeann ar thiomsú srianta **tar éis** `✓ Compiled successfully`. Is
próiseas ar leith é gach oibrí sonraí leathanaigh, agus is próiseas ar leith é an máthairphróiseas
`next build` féin freisin; i macasamhlú beo ar VPS (fadhb #7518), tomhaiseadh buaic-RSS gach próisis
ag ~4.5 GB, neamhspleách ar bhratach chairn `NODE_OPTIONS` (tiomsaíonn Turbopack i gcuimhne
dhúchasach/Rust lasmuigh de charn V8). Tá an réamhshocrú `2` (→ 1 oibrí, 2
phróiseas san iomlán) tomhaiste do na riteoirí 16 GB / 4 vCPU arna n-óstáil ag GitHub a úsáideann
an phíblíne foilsithe. Ag `8` (→ 7 n-oibrí), d'éirigh an riteoir sin as cuimhne agus
theip ar buildkit an chéim le `ResourceExhausted: ... cannot allocate memory`;
níor leor `3` (→ 2 oibrí) fós nuair a tomhaiseadh RSS gach próisis
go díreach seachas é a thuiscint go hindíreach. Déanann `tests/unit/docker-build-memory-budget.test.ts`
an uimhríocht bunaithe ar an bhfigiúr tomhaiste agus teipeann air má sháraíonn ceachtar rialtán
acmhainn an riteora.

Tiomsaíonn Turbopack i gcuimhne dhúchasach Rust atá **lasmuigh** de charn V8, mar sin
ní chuireann `OMNIROUTE_BUILD_MEMORY_MB` teorainn léi. Ar óstríomhaire a bhfuil uasteorainn chuimhne aige,
déanann an marfóir OOM an tiomsú a SIGKILL gan aon téacs earráide ar chor ar bith — stopann sé
go simplí i lár `Creating an optimized production build`, rud a fhágann cuma reo seachas
easpa cuimhne air. Má tá an t-óstríomhaire tiomsaithe srianta, athraigh an pacálaí:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

Tá `webpackBuildWorker` cumasaithe, mar sin ritheann `next build` máthairphróiseas **agus** próiseas
oibrí agus cloíonn gach ceann acu le `OMNIROUTE_BUILD_MEMORY_MB` ar leithligh. Socraigh uasteorainn an
choimeádáin os cionn tuairim is dhá oiread an luacha sin, ní aon oiread amháin.

Tomhaiste ar an gcrann seo (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pacálaí   | Uasteorainn an choimeádáin | Toradh                                      |
| --------- | -------------------------- | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB             | Mharfaigh OOM é ag an dá cheann, gan fhógra |
| webpack   | 8 GiB                      | Rinneadh SIGKILL ar an oibrí tiomsaithe     |
| webpack   | 12 GiB                     | d'éirigh leis, buaic ag 11.1 GiB            |

### Réamhshocruithe rite

Réamhshocruithe arna n-easpórtáil ag `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Iompar cuimhne in Docker:

- Socraíonn an íomhá `OMNIROUTE_MEMORY_MB=1024` agus díorthaíonn sí `NODE_OPTIONS=--max-old-space-size=1024` uaidh.
- Tosaíonn an lainseálaí neamhspleách an próiseas freastalaí féin; léann sé `OMNIROUTE_MEMORY_MB` agus iarcheanglaíonn sé `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Úsáideann Node an luach deireanach de `--max-old-space-size` a athdhéantar, mar sin rialaíonn socrú `OMNIROUTE_MEMORY_MB` teorainn éifeachtach chairn Docker.
- Toisc go socraíonn an íomhá é i gcónaí, ní chuirtear cúlréiteach an lainseálaí féin, atá calabraithe de réir RAM, i bhfeidhm faoi Docker choíche. Ardaigh go sainráite é don ualach oibre (an tábla thíos). Tá `2048` fós róbheag do `/v1/responses` gníomhaire códúcháin.

### RAM rite do ghníomhairí códúcháin

Is íosmhéid do dheais/comhrá éadrom é réamhshocrú Docker de 1 GiB, ní méid táirgthe. Coinníonn coirp fhada `POST /v1/responses` (na céadta teachtaireachtaí, na deicheanna uirlisí) iliomad graf sa chuimhne le linn comhbhrúite. Tá dhá iarratas forluiteacha ~3 MiB / ~750k comhartha tar éis V8 a thobscor ag spás seanré **12 GiB** (`FATAL ERROR: Reached heap limit`) agus tar éis OOM cgroup 16 GiB a bhaint amach freisin. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Socraigh **`--memory` cgroup os cionn an chairn** — tá maoláin dhúchasacha, SQLite agus ábhair idirmheánacha chomhbhrúite lasmuigh de V8.

| Ualach Oibre                                    | `OMNIROUTE_MEMORY_MB`          | Coimeádán / cgroup     | Nótaí                                                                                                                 |
| ----------------------------------------------- | ------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Painéal, comhrá éadrom amháin                   | `1024` (réamhshocrú na híomhá) | ≥2 GiB                 |                                                                                                                       |
| Gníomhaire códaithe amháin (Claude/Codex/Grok)  | `8192`                         | ≥10 GiB                | `/v1/responses` tipiciúil aon tseisiúin                                                                               |
| Dhá `/v1/responses` fhada chomhuaineacha        | `10240`–`12288`                | ≥12–16 GiB             | Tomhaiseadh tobscor V8 ag carn de ~12 GiB                                                                             |
| Trí chomhthéacs fhada chomhuaineacha nó níos mó | ná déan ar phróiseas amháin    | srathú / tuilleadh RAM | Is é 1 iarratas idir lámha an réamhshocrú iontrála d’ualaí troma; má mhéadaítear é gan RAM, tarlaíonn an tobscor arís |

Déanann `omniroute serve` ar mhiotal lom calabrú go ~35% den RAM (teorannaithe ag `[512, 4096]`) nuair nach bhfuil `OMNIROUTE_MEMORY_MB` **socraithe**. Socraíonn Docker `1024` i gcónaí, mar sin ní ritheann an calabrú sin choíche san íomhá oifigiúil.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Athróga Timpeallachta Ríthábhachtacha

Chomh maith leis na luachanna réamhshocraithe atá doiciméadaithe in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), is iad na hathróga seo a leanas is tábhachtaí agus Docker á rith:

| Athróg                        | Cuspóir                                                                                                                                                                                                                                                                                         | Réamhshocrú                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rún comhroinnte don droichead WebSocket. **Riachtanach i dtimpeallacht táirgeachta** — socraigh mar theaghrán láidir randamach é.                                                                                                                                                               | gan socrú (ní mór é a sholáthar) |
| `REDIS_URL`                   | Teaghrán ceangail don teorantóir ráta / inneall taisce                                                                                                                                                                                                                                          | `redis://redis:6379`             |
| `REDIS_PORT`                  | Port ar thaobh an óstaigh don choimeádán Redis ionsuite                                                                                                                                                                                                                                         | `6379`                           |
| `REDIS_BIND_HOST`             | Comhéadan óstaigh ar a bhfoilsítear port Redis ionsuite (aisfhilleadh mura gcuireann tú AUTH leis)                                                                                                                                                                                              | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Conair óstaigh atá feistithe i bpróifíl `cli` ag `/workspace/omniroute` le haghaidh sreafaí oibre féin-nuashonraithe                                                                                                                                                                            | `.` (an chomhadlann reatha)      |
| `OMNIROUTE_MEMORY_MB`         | Uasteorainn charn Node ag am rite do fhreastalaí neamhspleách Docker; sáraíonn sé réamhshocrú na híomhá thuas. Gníomhairí códúcháin: `8192`+ (féach [RAM ag am rite](#runtime-ram-for-coding-agents)).                                                                                          | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | Sáraigh na poirt nochta don phainéal (20128) agus don API (20129)                                                                                                                                                                                                                               | `20128` / `20129`                |
| `APP_BIND_HOST`               | Comhéadan óstaigh ar a bhfoilsíonn docker-compose poirt an phainéil/API/live-WS. Le `REQUIRE_API_KEY=false` (an réamhshocrú), nochtann `0.0.0.0` an seachfhreastalaí anaithnid `/v1` don LAN — ná leathnaigh é ach le `REQUIRE_API_KEY=true` nó le seachfhreastalaí droim ar ais os a chomhair. | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | Comhéadan óstaigh ar a bhfoilsíonn docker-compose an taobhcharr `cliproxyapi` — coinnítear dintiúir soláthraithe ina imleabhar sonraí.                                                                                                                                                          | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | Comhadlann a léann scanóir breiseán an ama rite agus ina suiteálann sé. Socraigh í nuair a bhíonn breiseáin feistithe le nascadh: leanann an réamhshocrú `HOME`, rud nach gá d’íomhá a easpórtáil.                                                                                              | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | Fochonair URL nuair a fhoilsítear an aip taobh thiar de sheachfhreastalaí droim ar ais (m.sh. `/omniroute`)                                                                                                                                                                                     | _(folamh = fréamh)_              |
| `NEXT_PUBLIC_BASE_URL`        | Bunús poiblí an bhrabhsálaí, an fhochonair san áireamh (m.sh. `https://host/omniroute`)                                                                                                                                                                                                         | gan socrú                        |
| `PROD_DASHBOARD_PORT`         | Port painéil ar thaobh an óstaigh do `docker-compose.prod.yml`                                                                                                                                                                                                                                  | `20130`                          |
| `CLIPROXYAPI_PORT`            | Port ar thaobh an óstaigh don taobhcharr `cliproxyapi`                                                                                                                                                                                                                                          | `8317`                           |

## Seachfhreastalaí aisiompaithe ar fhochonair (Traefik / nginx)

Tiomsaítear `basePath` Next.js isteach sa bheart neamhspleách. Taifeadann OmniRoute an luach
leabaithe i gcomhad faire ag fréamh na haipe (scríofa le linn `npm run build`; léite ag
`scripts/docker/ensure-docker-base-path.mjs`) agus cuireann sé i gcomparáid é le
`OMNIROUTE_BASE_PATH` nuair a thosaíonn an coimeádán. Nuair atá siad éagsúil agus nuair a
tógadh an íomhá d’fhréamh an fhearainn, athscríobhann an pointe iontrála na lastliostaí
neamhspleácha, na teaghráin liteartha leabaithe `basePath`/`assetPrefix` (rindreálann Next
16 URLanna sócmhainní SSR ó `assetPrefix` amháin — scáthánaíonn an paisteálaí an fhochonair
isteach ann), na URLanna leabaithe sócmhainní `/_next/static` (lastliostaí tagartha cliaint,
iompórtálacha meán, leathanaigh earráide réamhrindreáilte) agus sraith chomhoiriúnachta
`process.env` an chliaint sula ritear `node dev/run-standalone.mjs`.

### Tógáil Compose (molta)

Socraigh an dá athróg in `.env`, ansin atóg ionas go mbeidh an íomhá agus an timpeallacht
rite ar aon dul:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Cuireann `docker-compose.yml` `OMNIROUTE_BASE_PATH` ar aghaidh mar argóint tógála Docker
agus mar athróg timpeallachta rite.

### Íomhá fréimhe réamhthógtha + fochonair ag am rite

Tógtar na híomhánna foilsithe `diegosouzapw/omniroute:*` d’fhréamh an fhearainn. Is féidir
leat `OMNIROUTE_BASE_PATH` a shocrú fós ag am rite; paisteálann an coimeádán an beart uair
amháin ag am tosaithe. Úsáid é leis an mbunús poiblí comhfhreagrach:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Cumraigh an seachfhreastalaí aisiompaithe chun an chonair sheachtrach **iomlán** a chur ar
aghaidh (ná bain an réimír). Ba cheart do Traefik `PathPrefix(`/omniroute`)` a ródú chuig
an gcoimeádán gan `StripPrefix`, ionas go bhfaighidh Next.js `/omniroute/...` agus go
bhfreastalóidh sé sócmhainní ó `/omniroute/_next/...`.

Déanann seiceáil sláinte Docker fiosrú ar an gcríochphointe éadrom saolré `/healthz`, agus
an `OMNIROUTE_BASE_PATH` gníomhach mar réimír air. Tá `/api/monitoring/health` fós ar fáil
le haghaidh diagnóisic dhaonna/deaise; chun HEALTHCHECK an choimeádáin a dhíriú ar ais air
(mar shampla chun dianfhorfheidhmiú sláinte a dhéanamh), socraigh
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Is seiceáil **dhomhain** í an chonair
sin (DB + achoimre mhonatóireachta) — oiriúnach do `HEALTHCHECK` neamhchoitianta Docker má
roghnaíonn tú í a athchumasú, ach **níl** sí oiriúnach d’eatraimh `livenessProbe`
Kubernetes.

Le haghaidh córas ceolfhoirneoireachta (Kubernetes, Nomad, srl.):

| Tóraíocht            | Moltar                                                                     | Seachain                                                                  |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Beocht               | HTTP `GET /livez`, nó TCP ar an bpríomhphort (`PORT`, réamhshocrú `20128`) | `/api/monitoring/health` mar thóraíocht bheochta                          |
| Ullmhacht            | HTTP `GET /healthz`                                                        | Teorainneacha ama dochta a mheasann lúb theagmhas gnóthach a bheith marbh |
| Domhain / bosca dubh | `/api/monitoring/health`                                                   | —                                                                         |

Tuairiscíonn `/healthz` saolré an phróisis (`ok` / `starting` / `stopping`). Ní dhéanann
`/livez` ach a dheimhniú go bhfuil an próiseas beo (200 aon uair is féidir leis an
láimhseálaí rith; ní fhanann sé le hullmhacht). Ritheann an dá cheann fós ar an lúb
theagmhas Node chéanna le láimhseáil iarratas, mar sin d’fhéadfadh obair chatalóige nó
chomhbhrúite atá faoi cheangal ag an LAP moill a chur orthu — gnóthach ≠ marbh. Moltar
tóraíocht bheochta TCP má théann tóraíochtaí HTTP thar am. Treoir iomlán maidir le
tóraíochtaí:
[Treoir mhonatóireachta — moltaí maidir le tóraíochtaí Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose le Caddy (HTTPS Auto-TLS)

Is féidir OmniRoute a nochtadh go slán trí sholáthar uathoibríoch SSL Caddy a úsáid. Cinntigh go bhfuil taifead DNS A d’fhearainn dírithe ar sheoladh IP do fhreastalaí.

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
      # Bunús atá os comhair an bhrabhsálaí le haghaidh aisghlaonna OAuth, naisc deaise, agus URLanna poiblí ginte.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL inmheánach freastalaí-go-freastalaí le haghaidh jabanna sceidealaithe / féin-iarrataí.
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

Socraíonn Caddy na ceanntásca caighdeánacha seolta ar aghaidh don choimeádán réamhtheachtach. Úsáideann OmniRoute
`NEXT_PUBLIC_BASE_URL` mar an mbunús poiblí canónach le haghaidh aisghlaonna OAuth agus naisc phoiblí
ghinte; úsáideann scríbhinní fíordheimhnithe na deaise iarrataí den bhunús céanna chomh maith le cosaint CSRF
atá ceangailte leis an seisiún. Ná cumasaigh `OMNIROUTE_TRUST_PROXY` ach amháin le haghaidh imscaradh ardleibhéil ina bhfuil sé d’aon ghnó agat
go ndíorthódh OmniRoute an bunús poiblí ó cheanntásca seolta ar aghaidh iontaofa in ionad cumraíocht
fhollasach.

## Tollán Tapa Cloudflare

Áirítear le tacaíocht deaise d’imscaradh Docker **Tollán Tapa Cloudflare** aonchliceáil ar `Dashboard → Endpoints`. Leis an gcéad chumasú, íoslódáiltear `cloudflared` nuair is gá amháin, cuirtear tús le tollán sealadach chuig do chríochphointe `/v1` reatha, agus taispeántar an URL ginte `https://*.trycloudflare.com/v1` díreach faoi do ghnáth-URL poiblí.

Is féidir painéil tolláin críochphointe (Cloudflare, Tailscale, ngrok) a thaispeáint nó a chur i bhfolach ó `Settings → Appearance` gan staid an tolláin ghníomhaigh a athrú.

### Nótaí Tolláin

- Is URLanna sealadacha iad URLanna Tolláin Thapa agus athraíonn siad tar éis gach atosaithe.
- Ní athchóirítear Tolláin Thapa go huathoibríoch tar éis OmniRoute nó coimeádán a atosú. Cumasaigh arís iad ón deais nuair is gá.
- Tacaíonn an tsuiteáil bhainistithe faoi láthair le Linux, macOS, agus Windows ar `x64` / `arm64`.
- Úsáideann Tolláin Thapa bhainistithe iompar HTTP/2 de réir réamhshocraithe chun rabhaidh fhothanacha maidir le maolán UDP QUIC a sheachaint i dtimpeallachtaí srianta coimeádáin. Socraigh `CLOUDFLARED_PROTOCOL=quic` nó `auto` más mian leat iompar eile.
- Cuimsíonn íomhánna Docker fréamhacha CA an chórais agus cuireann siad ar aghaidh iad chuig `cloudflared` bainistithe, rud a sheachnaíonn teipeanna iontaoibhe TLS nuair a thosaíonn an tollán taobh istigh den choimeádán.
- Socraigh `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` más mian leat go n-úsáidfeadh OmniRoute dénártha atá ann cheana féin in ionad ceann a íoslódáil.

## Clibeanna Íomhá

| Íomhá                    | Clib     | Méid   | Cur síos                                                 |
| ------------------------ | -------- | ------ | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | An SemVer cobhsaí **foilsithe** is airde (ní git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Pionnáil an aicme clibe seo le haghaidh GitOps           |

Léiriú il-ardáin: `linux/amd64` + `linux/arm64` dúchasach (Apple Silicon, AWS Graviton, Raspberry Pi). Roghnaíonn Docker an ailtireacht chomhoiriúnach go huathoibríoch; úsáid `--platform linux/amd64` más gá duit aithris AMD64 a fhórsáil ar óstaigh ARM.

### Cainéil Eisiúna

Foilsíonn OmniRoute cainéil Docker ar leith le haghaidh eisiúintí cobhsaí, tástáil ghníomhach ar bhrainse eisiúna, agus leaganacha forbartha.

| Cainéal                         | Foinse                                      | Inathraitheacht                    | Úsáid mholta                                                                                                                       |
| ------------------------------- | ------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Eisiúint shínithe/leaganaithe               | Do-athraithe                       | Imscarthaí táirgthe a phionnálann eisiúint bheacht                                                                                 |
| `:latest` / `:latest-web`       | An SemVer cobhsaí **foilsithe** is airde    | Pointeoir cobhsaí inathraithe      | Leanann sé eisiúintí cobhsaí **tar éis** jab foilsithe SemVer — **ní** rianaíonn sé `main` ná tiomantais `release/v*` neamheisithe |
| `:next` / `:next-web`           | Brainse réamhshocraithe reatha `release/v*` | Pointeoir réamheisiúna inathraithe | Ceartúcháin tástála atá curtha ar an mbrainse eisiúna gníomhach ach nach bhfuil fós in eisiúint chobhsaí                           |
| `:main` / `:main-web`           | Brainse `main`                              | Pointeoir forbartha inathraithe    | Tástáil forbartha agus chomhtháthaithe amháin                                                                                      |

#### An cainéal réamheisiúna a úsáid

Atógtar an cainéal `next` le gach brú chuig an mbrainse réamhshocraithe reatha `release/v*` agus foilsítear é le haghaidh AMD64 agus ARM64 araon. Ní féidir le brainsí cothabhála níos sine scríobh anuas air. Soláthraíonn an cainéal íomhá in-íoslódáilte do cheartúcháin atá cumaiscthe isteach sa bhrainse eisiúna gníomhach sula gcruthaítear an chéad chlib chobhsaí eile.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Le haghaidh Docker Compose, sáraigh an chlib íomhá a úsáideann an phróifíl roghnaithe, ansin íoslódáil agus athchruthaigh an tseirbhís:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sábháilteacht agus rolladh siar

Is cainéal réamheisiúna ar snámh é `next`. D’fhéadfadh sé athrú le brú ar bith chuig an mbrainse eisiúna gníomhach agus **ní thacaítear leis le haghaidh úsáid táirgthe**. Pionnáil díolaim na híomhá agus leagan sonrach á mheas agat:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sula ndéanann tú tástáil, déan cúltaca d’imleabhar sonraí OmniRoute nó den eolaire sonraí atá gléasta le bind mount. Chun dul siar, athchóirigh an leagan cobhsaí nó an achoimre a úsáideadh roimhe seo agus athchruthaigh an coimeádán:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ní féidir le leagan tógála ó bhrainse eisiúna `latest` a bhogadh riamh; ní fhéadfaidh ach leagan séimeantach cobhsaí incháilithe an pointeoir cobhsaí a chur chun cinn. Coinníonn na híomhánna `next` cigireacht íomhá na heisiúna agus an geata blocála le haghaidh leochaileachtaí CRITICAL.

**Ní ráthaíocht úrnuachta do git é `latest`.** Ní bheidh ceartúcháin atá cumaiscthe ar `main` nó ar an mbrainse gníomhach `release/v*` **i** `:latest` go dtí go bhfoilseofar íomhá chobhsaí SemVer agus go gcuirfidh an jab foilsithe `:latest` chun cinn (an achoimre chéanna leis an SemVer sin). Má dhealraíonn sé go bhfuil `latest` reoite cé go dtaispeánann GitHub an ceartúchán cheana féin, tarraing `:next` chun an brainse eisiúna a thástáil nó fan leis an gclib SemVer.

| An rud atá uait                                                                     | Úsáid                                    |
| ----------------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / táirgeadh nach mór dó gan imeacht ón leagan sonraithe                      | Pinnáil `:X.Y.Z` (nó achoimre na híomhá) |
| Eisiúintí cobhsaí foilsithe a leanúint agus glacadh le hathchruthú le gach eisiúint | `:latest`                                |
| Tiomantais `release/v*` neamheisithe a thástáil                                     | `:next` (ní le haghaidh táirgthe)        |
| `main` a thástáil                                                                   | `:main` (ní le haghaidh táirgthe)        |

## Infhaighteacht: is macasamhail aonair é SQLite réamhshocraithe

Is éard atá in OmniRoute caighdeánach ar Docker / Kubernetes ná **próiseas Node amháin + scríbhneoir SQLite amháin**. **Ní thacaítear le hinfhaighteacht ard** sa topolaíocht sin.

| Srian                                 | Iarmhairt                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scríbhneoir aonair                    | **Ná** rith macasamhlacha iolracha in aghaidh an chomhaid SQLite chéanna. Déanann sé sin an DB a thruailliú.                                                                                                                                                                                                                                                                    |
| Athchruthú / atosú / marú HEALTHCHECK | **Briseadh iomlán** ar SSE atá ar siúl, ar sheisiúin an deais, agus ar staid sa chuimhne. Dícheanglaítear gach cliant nasctha. Faigheann iarratais nua le linn na tréimhse nach bhfuil críochphointe ar bith ann **`502 Bad Gateway: Unknown error`** ón seachfhreastalaí droim ar ais, ní OmniRoute JSON — ní féidir le cliaint é seo a idirdhealú ó theip soláthraí (#11015). |
| An lúb teagmhas céanna le `/healthz`  | Is féidir le catalóg ghnóthach nó timthriall comhbhrúite moill a chur ar thóireadóirí; atosaíonn teorainn ama ghearr an **t-aon** mhacasamhail ansin.                                                                                                                                                                                                                           |

**Maitrís tóireadóirí** (féach freisin [moltaí maidir le tóireadóirí Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Tóireadóir       | Sprioc                                                                  | Ná húsáid                                                                  |
| ---------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Beocht           | TCP ar `PORT` (`20128` de réir réamhshocraithe), nó HTTP bog `/healthz` | `/api/monitoring/health`                                                   |
| Ullmhacht        | HTTP `GET /healthz`                                                     | Teorainneacha ama dochta a mheasann go bhfuil lúb teagmhas ghnóthach marbh |
| Domhain / daoine | `/api/monitoring/health`                                                | Beocht uathoibrithe kubelet                                                |

**Uasghráduithe:** bí ag súil go ndícheanglófar gach seisiún. Taosc cliaint más féidir leat; níl aon nuashonrú rollach ar SQLite réamhshocraithe. Déanfaidh Compose `restart: unless-stopped` mar aon le Docker `HEALTHCHECK` an t-aon phróiseas a athsholáthar freisin nuair atá an coimeádán Unhealthy — an raon tionchair céanna.

Blúire Kubernetes le haghaidh **macasamhail aonair** (tá Recreate riachtanach; ná méadaigh `replicas` in aghaidh comhad SQLite amháin):

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

Ligeann codladh `preStop` do kube críochphointí Service a bhaint sula seoltar SIGTERM, ionas nach mbuaileann trácht **nua** an próiseas atá ag múchadh. Déantar SSE `/v1/responses` atá ar siúl a thaoscadh suas go `SHUTDOWN_TIMEOUT_MS` (30s de réir réamhshocraithe) trí léasanna trom-mheáchain iontrála (#11015). Faigheann iarratais nua a shroicheann an próiseas fós `503` + `Retry-After: 5`. Fanann an bhearna Recreate gan chríochphointe go dtí go mbíonn an t-athsholáthar Ready ina briseadh crua — is í sin topolaíocht SQLite, ní míchumraíocht tóireadóra.

**Ní** conair chaighdeánach dhoiciméadaithe é Postgres seachtrach / HA ilscríbhneora. Má theastaíonn HA uait, coinnigh macasamhail aonair nó rith topolaíocht atá tástáilte agus doiciméadaithe ar leithligh ag an tionscadal. Tá an obair Postgres/MySQL in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Go dtí go seolfar é sin, is é an t-aon bhealach a dtacaítear leis chun acmhainn **mhór** `/v1/responses` a iolrú ná N próiseas neamhspleácha (an chéad rannán eile), ní `replicas > 1` ar imleabhar amháin.

## Scálú amach: N próiseas neamhspleácha

Is ionann próiseas Node amháin agus **carn V8 amháin**. Má bhíonn dhá iarratas forluiteacha códghníomhaire `POST /v1/responses` de ~3 MiB / ~750k comhartha (RTK + Caveman) ann, ginmhilleann siad an carn sin ag ~12 Gi (`FATAL ERROR: Reached heap limit`) agus féadfaidh siad OOM a spreagadh i gcgroup 16 Gi. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Is rabhadh maidir le **buiséad cuimhne** é an tomhas sin, ní uasmhéid docht táirge de dhá `/v1/responses` fhada chomhthráthacha. Rialaítear cead isteach do chomhráite troma le buiséad beart ionghabhála a dhíorthaítear go huathoibríoch (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), arna mhéidsiú ón uasteorainn chéanna V8/cgroup — má sháraítear é le luach níos airde (nó má shocraítear an tseanuasteorainn de réir líon na n-iarratas `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) ar phróiseas atá méidithe cheana féin, tabharfar an ginmhilleadh ar ais. **Níl** comhráite beaga, `/healthz`, `/v1/models`, ná MCP san áireamh san uasteorainn sin.

### Próiseas amháin: níos mó ná dhá `/v1/responses` fhada

Féadfaidh próiseas **sláintiúil** (carn faoi bhun `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, réamhshocrú `0.75`) níos mó ná dhá `POST /v1/responses` fhada chomhthráthacha a rith nuair atá spás fós sa bhuiséad beart ar eitilt ar fud an phróisis (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Glacann coirp atá cothrom le `OMNIROUTE_CHAT_LARGE_BODY_BYTES` nó os a chionn (réamhshocrú 256 KiB) an léas trom céanna le hiarratais atá trom ó thaobh struchtúir de agus úsáideann siad an bealach éalaithe `tryAcquireHealthyHeadroom` céanna ó [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Is ceist **bhuiséid cuimhne** iad na deicheanna cliant fada SSE atá comhthráthach (is minic a bhíonn 40–50 de dhíth ar oibreoirí) — méidigh an carn + na sliotáin phríomhúla/spáis chinn + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — agus ní uasteorainn tháirge dhocht “2 ar a mhéad” atá ann. Diúltaíonn carn faoi bhrú d'iarratais fós le `503` in-atrialach ionas nach dtarlóidh #7849 arís.

Chun **cairn a iolrú** (old-spaces neamhspleácha V8) **inniu**:

| Déan                                                                                                                                                                           | Ná déan                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Rith **N coimeádán/pod**, agus a **`DATA_DIR` / imleabhar féin** ag gach ceann acu                                                                                             | Socraigh `replicas > 1` in aghaidh aon chomhad SQLite amháin               |
| Méidigh na hiarratais throma ar eitilt + an spás cinn sláintiúil ón gcarn / ón mbuiséad beart ar eitilt; is é 1–2 an réamhshocrú coimeádach do #7849, ní uasmhéid docht táirge | Tabhair 8× RAM do phróiseas amháin agus uasteorainn líon neamhtheoranta dó |
| Roghnach: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` le haghaidh **áiritheoirí cuóta comhroinnte**                                                                   | Caith le Redis amhail is gur SQLite comhroinnte é — ní hea                 |
| Cóipeáil rúin soláthraithe isteach i ngach ásc (nó glac le deaiseanna deighilte)                                                                                               | Bí ag súil le deais amháin / loga glaonna amháin thar gach ásc             |
| Cuir aon chothromóir ualaigh chun tosaigh; is leor greamaitheacht de réir eochair API nó seisiúin                                                                              | Éiligh meánearraí atá sainiúil do dhíoltóir agus feasach ar mhéid          |

Crua-earraí: is ceist **bhuiséid cuimhne** í líon na `/v1/responses` fada chomhthráthacha in aghaidh an áisc (carn + bearta ar eitilt / #10110). Iolraíonn `N` `DATA_DIR` neamhspleácha na cairn fós: ní mór do RAM an óstríomhaire `N × cgroup` a chumhdach, seachas “pod amháin 16 Gi le N=8.” Ná socraigh `replicas > 1` riamh ar aon chomhad SQLite amháin.

Dréacht Compose (dhá charn, dhá imleabhar — ní `deploy.replicas: 2`):

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

Tá dlús laistigh den phróiseas (comhbhrú lasmuigh den aonraitheoir HTTP) in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Tá braisle loighciúil amháin ar staid bhuan chomhroinnte in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Nótaí Tábhachtacha

- **Mód WAL SQLite:** Ba cheart ligean do `docker stop` críochnú ionas gur féidir le OmniRoute seicphointe a dhéanamh agus na hathruithe is déanaí a scríobh ar ais chuig `storage.sqlite`. Tá tréimhse cairde 40 soicind le haghaidh stoptha socraithe cheana féin sna comhaid Compose atá san áireamh. Má ritheann tú an íomhá go díreach, coinnigh `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Socraigh go `true` é má dhéantar gnáthchúltacaí/cúltacaí réamhscríofa a bhainistiú go seachtrach. Teastaíonn ó aistrithe bunachair sonraí atá ann cheana a ngrianghraf sábháilteachta buan féin agus cosaint in aghaidh ollaistrithe fós.
- **Marthanacht Sonraí:** Feistigh imleabhar ar `/app/data` i gcónaí chun do bhunachar sonraí, eochracha agus cumraíochtaí a chaomhnú idir atosuithe coimeádáin.
- **Cumraíocht Poirt:** Sáraigh an athróg timpeallachta `PORT` chun an port réamhshocraithe `20128` a athrú.

## Féach Chomh Maith

- [Treoir Imscartha VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Socrú VM + nginx + Cloudflare
- [Treoir Imscartha Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Imscaradh chuig Fly.io
- [Cumraíocht Timpeallachta](../reference/ENVIRONMENT.md) — Tagairt iomlán `.env`
