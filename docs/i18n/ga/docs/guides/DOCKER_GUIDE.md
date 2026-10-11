# 🐳 Docker Guide — OmniRoute (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Tagairt iomlán d’imscaradh Docker. Chun tosú go tapa, féach ar [rannán Docker sa README](../README.md#-docker).

## Clár na nÁbhar

- [Rith Thapa](#quick-run)
- [Le Comhad Timpeallachta](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Próifílí atá ar Fáil](#available-profiles)
- [Uirlisí CLI an óstríomhaire a chumrú nuair a ritheann OmniRoute in Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Taobhcharr Redis](#redis-sidecar)
- [Compose Táirgthe](#production-compose)
- [Céimeanna Dockerfile](#dockerfile-stages)
- [Athróga Timpeallachta Ríthábhachtacha](#critical-environment-variables)
- [Docker Compose le Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tollán Tapa Cloudflare](#cloudflare-quick-tunnel)
- [Clibeanna Íomhá](#image-tags)
- [Infhaighteacht: is macasamhail aonair é SQLite réamhshocraithe](#availability-default-sqlite-is-single-replica)
- [Earráidí réigiúnacha Gemini laistigh de Docker](#gemini-regional-errors-inside-docker)
- [Nótaí Tábhachtacha](#important-notes)

---

## Rith Thapa

> **Féinóstáil le hordú amháin?** Féach ar an
> [Treoir Féinóstála](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (íomhá fhoilsithe +
> Redis, aiscchúrsáil amháin, gan rogha próifíle). Is é an Rith Thapa thíos an
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

# Próifíl CLI (Claude Code, Codex, OpenClaw ionsuite)
docker compose --profile cli up -d

# Próifíl óstríomhaire (Linux ar dtús; feistíonn sí dénárthaigh CLI an óstríomhaire mar inléite amháin)
docker compose --profile host up -d

# Próifíl gréasáin (Chromium/Playwright do sholáthraithe seisiúin gréasáin)
docker compose --profile web up -d

# Comhcheangail CLI + taobhcharr CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Próifílí atá ar Fáil

Tagann OmniRoute le próifílí Compose do na príomhleaganacha imscartha. Roghnaigh an ceann a oireann do do thimpeallacht.

| Próifíl                  | Seirbhís         | Cathain ba cheart í a úsáid                                                                                                                                                 | Ordú                                         |
| ------------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (réamhshocraithe) | `omniroute-base` | Freastalaí gan chomhéadan grafach / am rite íosta, gan CLIanna soláthraithe cuachta                                                                                         | `docker compose --profile base up -d`        |
| `cli`                    | `omniroute-cli`  | Sreafaí oibre gníomhaireacha a ghlaonn `omniroute providers/setup/doctor` agus CLIanna cuachta (Codex, Claude Code, Droid, OpenClaw)                                        | `docker compose --profile cli up -d`         |
| `host`                   | `omniroute-host` | Óstríomhairí Linux ar mian leo rochtain cosúil le `network_mode` ar CLIanna an óstríomhaire trí `~/.local/bin`, `~/.codex`, `~/.claude`, etc. a fheistiú mar inléite amháin | `docker compose --profile host up -d`        |
| `cliproxyapi`            | `cliproxyapi`    | Rith an taobhcharr [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) ar phort `8317` le haghaidh seachfhreastalaíochta CLI réamhtheachtaí                         | `docker compose --profile cliproxyapi up -d` |
| `web`                    | `omniroute-web`  | Soláthraithe seisiúin gréasáin a dteastaíonn brabhsálaí uathu: `gemini-web`, `claude-web`, `claude-turnstile` (tógann sé `runner-web`, Chromium san áireamh)                | `docker compose --profile web up -d`         |

> Is féidir próifílí iomadúla a chomhcheangal: `docker compose --profile cli --profile cliproxyapi up -d`.

## Uirlisí CLI an óstríomhaire a chumrú nuair a ritheann OmniRoute in Docker

Scríobhann `omniroute setup-codex`, `setup-claude`, `config set <tool>` agus cnaipe
**Sábháil cumraíocht** an deais comhaid amhail `~/.codex/*.config.toml`. Ní bhíonn
ciall leis na conairí sin ach ar an ríomhaire ar a ritheann an CLI féin. Má
ritheann tú laistigh den choimeádán iad, déantar an scríobh i gcomhadlann baile
an choimeádáin féin (`/home/node` — ritheann an íomhá mar `USER node`), áit nach
léifidh aon CLI óstríomhaire é choíche agus a gcaitear amach é a luaithe a
athchruthaítear an coimeádán.

Braithfidh OmniRoute é seo agus diúltóidh sé don scríobh, agus treoracha á
dtabhairt aige in ionad rath nach féidir leat a úsáid a thuairisciú: scoireann
an CLI le `2`, agus freagraíonn an API le `422` agus
`containerEphemeralTarget: true`.

### Molta: rith an CLI ar an óstríomhaire agus OmniRoute in Docker

Freastalaíonn an coimeádán ar an API; cumraíonn an CLI uirlisí d'óstríomhaire.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # dírigh an CLI ar an gcoimeádán
omniroute setup-codex                      # scríobhann sé an fíor-~/.codex ar d'óstríomhaire
```

Is é seo an rogha cheart nuair a ritheann Codex, Claude Code, Cursor nó a
leithéid ar do ríomhaire glúine — an gnáthshocrú.

### Rogha eile: feistigh comhadlanna cumraíochta an óstríomhaire le bind mount (próifíl `host`)

Más mian leat go scríobhfadh an coimeádán féin cumraíocht d'óstríomhaire, feistigh
na comhadlanna ann agus dírigh `CLI_CONFIG_HOME` ar fhréamh an fheistithe.
Déanann an phróifíl `host` é seo cheana féin:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Is é bind mount a dhéanann an chonair iontaofa: léann OmniRoute
`/proc/self/mountinfo` agus ceadaíonn sé scríobh chuig conairí feistithe (agus
chuig comhadlanna a bhfuil a mic-chomhadlanna feistithe, arb é sin go díreach
cruth `/host-home` thuas), agus é fós ag diúltú do chonairí neamhfheistithe.

### Bealach éalaithe: cumraigh CLIanna an choimeádáin féin (úsáid go spárálach)

Nuair atá na CLIanna laistigh den choimeádán i ndáiríre (an phróifíl `cli`), bíonn
an scríobh d'aon ghnó. Cuir `--allow-container-write` ar aghaidh chuig aon ordú
`setup-*`, nó socraigh `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` don
fhreastalaí. Leanann an scríobh ar aghaidh le rabhadh nach mairfidh sé tar éis
an coimeádán.

> **Rabhadh slándála — próifíl `cli` + feistiú `docker.sock`.**
> Feistíonn an phróifíl `cli` `/var/run/docker.sock` le bind mount ionas gur
> féidir leis an nuashonraitheoir uathoibríoch laistigh den choimeádán an chruach
> a athchruthú ó dheamhan an óstríomhaire
> (seiceálann `src/lib/system/autoUpdate.ts` an soicéad sin agus seachnaíonn sé
> conair Docker nuair nach bhfuil sé ann). Is **teorainn iontaoibhe
> fhréamhleibhéal an óstríomhaire** é an soicéad sin: rialaíonn aon rud a bhfuil
> rochtain aige air deamhan Docker an óstríomhaire mar root — is féidir leis aon
> choimeádán ar an óstríomhaire a chruthú, a iniúchadh, a stopadh agus a bhaint.
> Impleachtaí:
>
> 1. **Ná nochtaigh port na próifíle `cli` don líonra riamh.** Foilsigh
>    ar `127.0.0.1` é (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — má bhíonn próifíl `cli` insroichte ón LAN, déanfar sárú iomlán ar an
>    óstríomhaire de RCE ar leibhéal na deaise.
> 2. **Ná feistigh aon chomhadlanna breise ón óstríomhaire sa phróifíl `cli`.**
>    Tugann soicéad Docker, mar aon le haon fheistiú eile, rochtain iomlán
>    léite/scríofa don choimeádán ar do chóras comhad agus ar chumraíocht an
>    óstríomhaire. Más gá d'uirlis tionscadal a fheiceáil, rith go háitiúil í le
>    dénártha an CLI — ná feistigh sa choimeádán `cli` í.
>
> Mura bhfuil nuashonrú uathoibríoch laistigh den choimeádán de dhíth ort, ná
> cumasaigh an phróifíl `cli` (`COMPOSE_PROFILES=core,redis` nó níos giorra). Ní
> fheistíonn na próifílí eile soicéad Docker.
>
> Féach `docs/security/MITM-TPROXY-DECRYPT.md` (git; gan tiomsú isteach in `/docs`) don tsamhail bhagartha ghaolmhar
> maidir le MITM, agus `docs/security/SUPPLY_CHAIN.md` do shlabhra bunáitíochta
> dhénártha `codex`/`claude-code`/`droid`/`openclaw`.

## Taobh-choimeádán Redis

Braitheann OmniRoute ar Redis chun tacú leis an teorantóir ráta dáilte agus leis an taisce chomhroinnte. Sainmhínítear an tseirbhís `redis` **i gcónaí** in `docker-compose.yml` (níl aon gheata próifíle aici) agus tosaíonn sí in éineacht le próifíl ar bith eile.

| Sonra                  | Luach                                                   |
| ---------------------- | ------------------------------------------------------- |
| Íomhá                  | `redis:7-alpine`                                        |
| Ainm an choimeádáin    | `omniroute-redis`                                       |
| Port inmheánach        | `6379`                                                  |
| Port óstaigh (sárú)    | `REDIS_PORT` (`6379` de réir réamhshocraithe)           |
| Ceangal óstaigh (sárú) | `REDIS_BIND_HOST` (`127.0.0.1` de réir réamhshocraithe) |
| Imleabhar              | `omniroute-redis-data` → `/data`                        |
| Seiceáil sláinte       | `redis-cli ping` (eatramh 10s)                          |

Athróga timpeallachta gaolmhara:

- `REDIS_URL` — teaghrán ceangail a instealltar san fheidhmchlár (`redis://redis:6379` de réir réamhshocraithe).
- `REDIS_PORT` — mapáil poirt ar thaobh an óstaigh don choimeádán Redis.
- `REDIS_BIND_HOST` — comhéadan an óstaigh ar a bhfoilsítear an port. Is é `127.0.0.1` an réamhshocrú.

> **Cén fáth a n-úsáidtear loopback de réir réamhshocraithe:** ritheann an taobh-choimeádán gan `requirepass`, agus sroicheann
> na coimeádáin feidhmchláir é thar an líonra compose (`redis:6379`) — níl an port foilsithe ann
> ach amháin d'uirlisí ar thaobh an óstaigh (`redis-cli`, `npm run dev` áitiúil). Dá bhfoilseofaí ar
> `0.0.0.0` é, nochtfaí Redis gan fíordheimhniú do gach óstach ar do LAN. Má shocraíonn tú
> `REDIS_BIND_HOST=0.0.0.0`, cuir `--requirepass` leis an `command:` seirbhíse freisin.

Ní mholtar **Redis a dhíchumasú** (díghrádóidh an teorantóir ráta chuig cúltaca sa chuimhne). Más gá duit é sin a dhéanamh, bain/blocnótaigh an bloc seirbhíse `redis:` in `docker-compose.yml` nó scálaigh go nialas é:

```bash
docker compose up -d --scale redis=0
```

## Compose Táirgthe

Le haghaidh seat táirgthe leithlisithe a ritheann taobh le forbairt, úsáid `docker-compose.prod.yml`.

| Sonra                         | Luach                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Comhad                        | `docker-compose.prod.yml`                                                                |
| Port réamhshocraithe an deais | `PROD_DASHBOARD_PORT=20130` (mapáilte chuig `${DASHBOARD_PORT:-20128}` inmheánach)       |
| Port réamhshocraithe API      | `PROD_API_PORT=20131`                                                                    |
| Íomhá                         | `omniroute:prod` (tógtha ón sprioc `runner-cli`)                                         |
| Coimeádán Redis               | `omniroute-redis-prod` (`redis:8.6.2`, imleabhar tiomnaithe `redis-prod-data`)           |
| Imleabhar sonraí              | `omniroute-prod-data` (ainmnithe, marthanach thar atógálacha)                            |
| Seiceálacha sláinte           | `node healthcheck.mjs` + `redis-cli ping`, agus `depends_on` geataithe ar shláinte Redis |

Conas é a úsáid:

```bash
# Tóg agus tosaigh an chruach táirgthe
docker compose -f docker-compose.prod.yml up -d --build

# Sruthaigh na logaí
docker compose -f docker-compose.prod.yml logs -f

# Leag síos í (coinnigh na himleabhair)
docker compose -f docker-compose.prod.yml down
```

Ritheann an chruach táirgthe i gcomhthreo leis an compose forbartha (ainmneacha coimeádán, poirt agus imleabhair éagsúla), mar sin is féidir leat leanúint den atriall go háitiúil agus an córas táirgthe fós ar bun.

## Céimeanna Dockerfile

Tagann Dockerfile ilchéime (`Dockerfile`) leis an stór. Tá ceithre chéim ar fáil; roghnaigh an `target` ceart do do chás úsáide.

| Céim          | Buníomhá              | Cuspóir                                                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Suiteálann sé spleáchais (`npm ci --legacy-peer-deps`) agus ritheann sé `npm run build` (Turbopack de réir réamhshocraithe — féach Acmhainní ag am tógála thíos)                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Timpeallacht rite táirgthe le haschur neamhspleách Next.js. **Níl aon CLI soláthraí cuachta inti.**                                                                                                                                                                                                                             |
| `runner-cli`  | `runner-base`         | Cuireann sé `git`, `docker.io`, `docker-compose` agus CLIanna domhanda leis: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Roghnaigh é seo le haghaidh sreafaí oibre gníomhairíocha.**                                                                                                                   |
| `runner-web`  | `runner-base`         | Cuireann sé Playwright + brabhsálaí Chromium (`--with-deps`) leis le haghaidh soláthraithe seisiúin ghréasáin: `gemini-web`, `claude-web`, `claude-turnstile`. **Roghnaigh é seo nuair a úsáideann tú na soláthraithe sin** — teipeann ar an ngnáthíomhá tráth an iarratais gan é (féach an nóta `-web` faoi Chainéil Eisiúna). |

Tóg sprioc shonrach de láimh:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Acmhainní ag am tógála

Rialaíonn trí argóint tógála costas na céime `builder`. Ní bhaineann siad ach le ham tógála —
is rialtán rite ar leith é `OMNIROUTE_MEMORY_MB` (thíos).

| Argóint tógála              | Réamhshocrú | Éifeacht                                                                                                   |
| --------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | Tógann `0` le webpack: buaicúsáid chuimhne níos ísle, ach níos moille. Roghnaíonn `1` Turbopack.           |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | Uasteorainn charn V8 (`--max-old-space-size`) don `next build` a sheoltar.                                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Soláthraíonn sé `CIRCLE_NODE_TOTAL`; díorthaíonn Next `workers = N - 1` chun sonraí leathanaigh a bhailiú. |

Is é `OMNIROUTE_BUILD_WORKERS` an ceann ba cheart a ardú ar thógálaí mór agus an
ceann ba cheart a scrúdú nuair a theipeann ar thógáil shrianta **tar éis**
`✓ Compiled successfully`. Is próiseas ar leith é gach oibrí sonraí leathanaigh,
agus is próiseas ar leith é an máthairphróiseas `next build` féin freisin;
thomhais atáirgeadh ar VPS beo (fadhb #7518) buaic-RSS gach próisis ag
~4.5 GB, neamhspleách ar bhratach charn `NODE_OPTIONS` (tiomsaíonn Turbopack i
gcuimhne dhúchasach/Rust lasmuigh de charn V8). Tá an réamhshocrú `2` (→ 1 oibrí,
2 phróiseas san iomlán) tomhaiste do na riteoirí 16 GB / 4 vCPU arna n-óstáil ag
GitHub a úsáideann an phíblíne foilsithe. Ag `8` (→ 7 n-oibrí), d’éirigh an riteoir
sin as cuimhne agus theip ar buildkit an chéim le
`ResourceExhausted: ... cannot allocate memory`; níor leor `3` (→ 2 oibrí) fós
nuair a tomhaiseadh RSS gach próisis go díreach seachas é a thuiscint ó
fhianaise indíreach. Déanann `tests/unit/docker-build-memory-budget.test.ts`
an uimhríocht i gcoinne an fhigiúir thomhaiste agus teipeann sé má sháraíonn
ceachtar rialtán acmhainn an riteora.

Tiomsaíonn Turbopack i gcuimhne dhúchasach Rust atá **lasmuigh** de charn V8, mar
sin ní chuireann `OMNIROUTE_BUILD_MEMORY_MB` teorainn léi. Ar óstach a bhfuil
uasteorainn chuimhne aige, maraíonn an marfóir OOM an tógáil ansin le SIGKILL gan
téacs earráide ar bith — ní dhéanann sí ach stopadh i lár
`Creating an optimized production build`, rud a fhágann cuma reochta uirthi
seachas teip de bharr easpa cuimhne. Sin é an fáth a n-úsáideann an `Dockerfile`
webpack de réir réamhshocraithe (`OMNIROUTE_USE_TURBOPACK=0`), murab ionann agus
`npm run dev` / `npm run build`, áit arb é Turbopack réamhshocrú an chóid: ní mór
nach bhfaigheadh `docker build .` lom gan argóintí tógála (an t-ordú a ritheann
Railway agus óstaigh aonchliceála eile) bás go tostach ar thógálaí a bhfuil
teorainn chuimhne air. Tugann na híomhánna foilsithe
`OMNIROUTE_USE_TURBOPACK=0` go sainráite cheana féin in `docker-publish.yml`.
Ar thógálaí a bhfuil neart RAM aige, roghnaigh Turbopack le haghaidh tógáil níos
tapúla:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Tá `webpackBuildWorker` cumasaithe, mar sin ritheann `next build`
máthairphróiseas **agus** próiseas oibrí agus cloíonn gach ceann acu le
`OMNIROUTE_BUILD_MEMORY_MB` ar leithligh. Socraigh uasteorainn an choimeádáin
os cionn thart ar dhá oiread an luacha sin, ní aon oiread amháin.

Tomhaiste ar an gcrann seo (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Cuachtaire | Uasteorainn coimeádáin | Toradh                                     |
| ---------- | ---------------------- | ------------------------------------------ |
| Turbopack  | 8 GiB / 16 GiB         | Mharaigh OOM é ag an dá cheann, go tostach |
| webpack    | 8 GiB                  | Maraíodh an t-oibrí tógála le SIGKILL      |
| webpack    | 12 GiB                 | d’éirigh leis, buaic ag 11.1 GiB           |

### Réamhshocruithe rite

Réamhshocruithe arna n-easpórtáil ag `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Iompar cuimhne in Docker:

- Socraíonn an íomhá `OMNIROUTE_MEMORY_MB=1024` agus díorthaíonn sí `NODE_OPTIONS=--max-old-space-size=1024` uaidh.
- Tosaíonn an lainseálaí neamhspleách próiseas iarbhír an fhreastalaí; léann sé `OMNIROUTE_MEMORY_MB` agus iarcheanglaíonn sé `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Úsáideann Node an luach deireanach athfhillteach de `--max-old-space-size`, mar sin rialaíonn socrú `OMNIROUTE_MEMORY_MB` teorainn éifeachtach charn Docker.
- Toisc go socraíonn an íomhá é i gcónaí, ní chuirtear cúltaca calabraithe de réir RAM an lainseálaí féin i bhfeidhm riamh faoi Docker. Méadaigh go sainráite é don ualach oibre (an tábla thíos). Tá `2048` fós róbheag do `/v1/responses` gníomhaire códúcháin.

### RAM rite d’fheidhmeanna gníomhairí códúcháin

Is íosleibhéal do dheais/comhrá éadrom é réamhshocrú Docker de 1 GiB, ní méid táirgeachta. Coinníonn coirp fhada `POST /v1/responses` (na céadta teachtaireachtaí, na deicheanna uirlisí) graif iolracha sa chuimhne le linn comhbhrúite. Chuir dhá iarratas fhorluiteacha de thart ar 3 MiB / 750k comhartha faoi deara do V8 scor ag sean-spás **12 GiB** (`FATAL ERROR: Reached heap limit`) agus bhuail siad OOM cgroup 16 GiB freisin. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Socraigh méid **cgroup `--memory` os cionn an chairn** — tá maoláin dhúchasacha, SQLite, agus torthaí idirmheánacha comhbhrúite lasmuigh de V8.

| Ualach oibre                                     | `OMNIROUTE_MEMORY_MB`       | Coimeádán / cgroup        | Nótaí                                                                                                        |
| ------------------------------------------------ | --------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Deais, comhrá éadrom amháin                      | `1024` (réamhshocrú íomhá)  | ≥2 GiB                    |                                                                                                              |
| Gníomhaire códúcháin amháin (Claude/Codex/Grok)  | `8192`                      | ≥10 GiB                   | Seisiún aonair tipiciúil `/v1/responses`                                                                     |
| Dhá `/v1/responses` fhada chomhthráthacha        | `10240`–`12288`             | ≥12–16 GiB                | Tomhaiseadh scor V8 ag carn de thart ar 12 GiB                                                               |
| Trí chomhthéacs fhada chomhthráthacha nó níos mó | ná déan ar phróiseas amháin | srathaigh / tuilleadh RAM | Is é 1 iarratas ar siúl an réamhshocrú iontrála tromualach; má mhéadaítear é gan RAM, tarlaíonn an scor arís |

Calabraíonn `omniroute serve` ar mhiotal lom thart ar 35% den RAM (teoranta do `[512, 4096]`) nuair atá `OMNIROUTE_MEMORY_MB` **gan socrú**. Socraíonn Docker `1024` i gcónaí, mar sin ní ritheann an calabrú sin riamh san íomhá oifigiúil.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Athróga Criticiúla Timpeallachta

Lasmuigh de na réamhshocruithe atá doiciméadaithe in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), is iad na hathróga seo a leanas is tábhachtaí agus Docker á rith:

| Athróg                        | Cuspóir                                                                                                                                                                                                                                                                                            | Réamhshocrú                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rún comhroinnte don droichead WebSocket. **Riachtanach sa táirgeadh** — socraigh é mar theaghrán randamach láidir.                                                                                                                                                                                 | gan socrú (ní mór é a sholáthar) |
| `REDIS_URL`                   | Teaghrán ceangail don teorantóir ráta / inneall taca taisce                                                                                                                                                                                                                                        | `redis://redis:6379`             |
| `REDIS_PORT`                  | Port ar thaobh an óstaigh don choimeádán Redis cuachta                                                                                                                                                                                                                                             | `6379`                           |
| `REDIS_BIND_HOST`             | Comhéadan óstaigh ar a bhfoilsítear an port Redis cuachta (aislúbadh mura gcuireann tú AUTH leis)                                                                                                                                                                                                  | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Conair óstaigh atá gléasta sa phróifíl `cli` ag `/workspace/omniroute` le haghaidh sreafaí oibre féinnuashonraithe                                                                                                                                                                                 | `.` (an chomhadlann reatha)      |
| `OMNIROUTE_MEMORY_MB`         | Uasteorainn charn Node ag am rite don fhreastalaí neamhspleách Docker; sáraíonn sé réamhshocrú na híomhá thuas. Gníomhairí códaithe: `8192`+ (féach [RAM ag am rite](#runtime-ram-for-coding-agents)).                                                                                             | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | Sáraigh na poirt nochta don phainéal (20128) agus don API (20129)                                                                                                                                                                                                                                  | `20128` / `20129`                |
| `APP_BIND_HOST`               | Comhéadan óstaigh ar a bhfoilsíonn docker-compose poirt an phainéil/API/live-WS. Le `REQUIRE_API_KEY=false` (an réamhshocrú), nochtann `0.0.0.0` an seachfhreastalaí anaithnid `/v1` don LAN — ná leathnaigh é ach le `REQUIRE_API_KEY=true` nó le seachfhreastalaí droim ar ais chun tosaigh air. | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | Comhéadan óstaigh ar a bhfoilsíonn docker-compose an taobhchoimeádán `cliproxyapi` — coinnítear dintiúir soláthraithe ina imleabhar sonraí.                                                                                                                                                        | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | Comhadlann a léann scanóir breiseán an ama rite agus ina suiteálann sé breiseáin. Socraigh í nuair a ghléastar breiseáin trí cheangal: leanann an réamhshocrú `HOME`, ach ní gá d’íomhá é sin a easpórtáil.                                                                                        | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | Fochonair URL nuair a fhoilsítear an aip taobh thiar de sheachfhreastalaí droim ar ais (m.sh. `/omniroute`)                                                                                                                                                                                        | _(folamh = fréamh)_              |
| `NEXT_PUBLIC_BASE_URL`        | Bunús poiblí an bhrabhsálaí, an fhochonair san áireamh (m.sh. `https://host/omniroute`)                                                                                                                                                                                                            | gan socrú                        |
| `PROD_DASHBOARD_PORT`         | Port painéil ar thaobh an óstaigh do `docker-compose.prod.yml`                                                                                                                                                                                                                                     | `20130`                          |
| `CLIPROXYAPI_PORT`            | Port ar thaobh an óstaigh don taobhchoimeádán `cliproxyapi`                                                                                                                                                                                                                                        | `8317`                           |

## Seachfhreastalaí ar Fhochonair (Traefik / nginx)

Tiomsaítear `basePath` Next.js isteach sa bheart neamhspleách. Taifeadann OmniRoute an luach
leabaithe i gcomhad faire ag fréamh na haipe (scríofa le linn `npm run build`; léite ag
`scripts/docker/ensure-docker-base-path.mjs`) agus cuireann sé i gcomparáid é le
`OMNIROUTE_BASE_PATH` nuair a thosaíonn an coimeádán. Nuair nach ionann iad agus nuair a
tógadh an íomhá do fhréamh an fhearainn, athscríobhann an pointe iontrála na forléirithe
neamhspleácha, na litearáil leabaithe `basePath`/`assetPrefix` (rindreálann Next 16 URLanna
sócmhainní SSR ó `assetPrefix` amháin — déanann an paisteálaí an fhochonair a mhacasamhlú
ann), URLanna leabaithe na sócmhainní `/_next/static` (forléirithe tagartha cliaint,
iompórtálacha meán, leathanaigh earráide réamh-rindreáilte) agus an t-ionsamhail
`process.env` ar thaobh an chliaint sula ritheann `node dev/run-standalone.mjs`.

### Tógáil Compose (molta)

Socraigh an dá athróg in `.env`, ansin atóg ionas go mbeidh an íomhá agus an timpeallacht
ama rite ar aon dul:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Cuireann `docker-compose.yml` `OMNIROUTE_BASE_PATH` ar aghaidh mar argóint tógála Docker
agus mar athróg timpeallachta ama rite.

### Íomhá fréimhe réamhthógtha + fochonair ama rite

Tógtar íomhánna foilsithe `diegosouzapw/omniroute:*` do fhréamh an fhearainn. Is féidir
`OMNIROUTE_BASE_PATH` a shocrú ag am rite fós; paisteálann an coimeádán an beart uair
amháin agus é ag tosú. Úsáid é leis an mbunús poiblí comhfhreagrach:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Cumraigh an seachfhreastalaí chun an chonair sheachtrach **iomlán** a chur ar aghaidh
(ná bain an réimír). Ba cheart do Traefik `PathPrefix(`/omniroute`)` a ródú chuig an
gcoimeádán gan `StripPrefix`, ionas go bhfaighidh Next.js `/omniroute/...` agus go
bhfreastalóidh sé sócmhainní ó `/omniroute/_next/...`.

Déanann seiceáil sláinte Docker iniúchadh ar an gcríochphointe saolré éadrom `/healthz`,
agus an `OMNIROUTE_BASE_PATH` gníomhach curtha mar réimír leis. Tá
`/api/monitoring/health` fós ar fáil do dhiagnóisic dhaonna/deaise; chun HEALTHCHECK an
choimeádáin a dhíriú ar ais air (mar shampla, chun seiceáil dhomhain sláinte a
fhorfheidhmiú), socraigh `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Is seiceáil
**dhomhain** í an chonair sin (DB + achoimre mhonatóireachta) — oiriúnach do
`HEALTHCHECK` neamh-mhinic Docker má roghnaíonn tú é a athchumasú, ach **níl** sí
oiriúnach d'eatraimh `livenessProbe` Kubernetes.

D'ardáin cheolfhoirnithe (Kubernetes, Nomad, srl.):

| Taiscéalaí           | Moltar                                                                     | Seachain                                                                  |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Beocht               | HTTP `GET /livez`, nó TCP ar an bpríomhphort (`PORT`, réamhshocrú `20128`) | `/api/monitoring/health` mar thástáil bheocht                             |
| Ullmhacht            | HTTP `GET /healthz`                                                        | Teorainneacha ama dochta a mheasann lúb theagmhas gnóthach a bheith marbh |
| Domhain / bosca dubh | `/api/monitoring/health`                                                   | —                                                                         |

Tuairiscíonn `/healthz` saolré an phróisis (`ok` / `starting` / `stopping`). Ní
sheiceálann `/livez` ach an bhfuil an próiseas beo (200 aon uair is féidir leis an
láimhseálaí rith; ní fhanann sé le hullmhacht). Ritheann an dá cheann fós ar an lúb
theagmhas Node chéanna le láimhseáil iarratas, mar sin is féidir le hobair catalóige nó
comhbhrúite atá faoi cheangal LAP moill a chur orthu — gnóthach ≠ marbh. Moltar beocht
TCP má théann taiscéalaithe HTTP thar am. Treoir iomlán maidir le taiscéalaithe:
[Treoir mhonatóireachta — moltaí maidir le taiscéalaithe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose le Caddy (HTTPS Auto-TLS)

Is féidir OmniRoute a nochtadh go slán trí sholáthar uathoibríoch SSL Caddy a úsáid. Cinntigh go bhfuil taifead DNS A d'fhearainn dírithe ar sheoladh IP do fhreastalaí.

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
      # Bunús atá os comhair an bhrabhsálaí le haghaidh aisghlaonna OAuth, naisc deais, agus URLanna poiblí ginte.
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

Socraíonn Caddy na ceanntásca caighdeánacha curtha ar aghaidh don choimeádán réamhtheachtach. Úsáideann OmniRoute
`NEXT_PUBLIC_BASE_URL` mar an bunús poiblí canónach le haghaidh aisghlaonna OAuth agus naisc phoiblí
ghinte; úsáideann scríbhinní fíordheimhnithe na deaise iarrataí den bhunús céanna mar aon le cosaint
CSRF atá ceangailte leis an seisiún. Ná cumasaigh `OMNIROUTE_TRUST_PROXY` ach amháin le haghaidh imscaradh
ardleibhéil ina dteastaíonn uait d'aon ghnó go ndéanfadh OmniRoute an bunús poiblí a dhíorthú ó cheanntásca
iontaofa curtha ar aghaidh in ionad cumraíochta sainráite.

## Tollán Tapa Cloudflare

Áirítear le tacaíocht deaise d'imscaradh Docker **Tollán Tapa Cloudflare** aonchliceáil ar `Dashboard → Endpoints`. Leis an gcéad chumasú, íoslódáiltear `cloudflared` nuair is gá amháin, cuirtear tús le tollán sealadach chuig do chríochphointe reatha `/v1`, agus taispeántar an URL ginte `https://*.trycloudflare.com/v1` díreach faoi do ghnáth-URL poiblí.

Is féidir painéil tolláin críochphointe (Cloudflare, Tailscale, ngrok) a thaispeáint nó a chur i bhfolach ó `Settings → Appearance` gan staid ghníomhach an tolláin a athrú.

### Nótaí faoin Tollán

- Is URLanna sealadacha iad URLanna Tolláin Thapa agus athraíonn siad tar éis gach atosaithe.
- Ní athchóirítear Tolláin Thapa go huathoibríoch tar éis OmniRoute nó coimeádán a atosú. Cumasaigh arís iad ón deais nuair is gá.
- Tacaíonn an tsuiteáil bhainistithe faoi láthair le Linux, macOS, agus Windows ar `x64` / `arm64`.
- Úsáideann Tolláin Thapa bhainistithe iompar HTTP/2 de réir réamhshocraithe chun rabhaidh ghlórmhara maidir le maoláin QUIC UDP a sheachaint i dtimpeallachtaí coimeádáin srianta. Socraigh `CLOUDFLARED_PROTOCOL=quic` nó `auto` má theastaíonn iompar eile uait.
- Cuimsíonn íomhánna Docker fréamhacha CA an chórais agus cuireann siad ar aghaidh iad chuig `cloudflared` bainistithe, rud a sheachnaíonn teipeanna iontaoibhe TLS nuair a thosaíonn an tollán taobh istigh den choimeádán.
- Socraigh `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` más mian leat go n-úsáidfeadh OmniRoute dénártha atá ann cheana in ionad ceann a íoslódáil.

## Clibeanna Íomhá

| Íomhá                    | Clib     | Méid   | Cur síos                                                 |
| ------------------------ | -------- | ------ | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | An SemVer cobhsaí **foilsithe** is airde (ní git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Pionnáil an aicme clibe seo le haghaidh GitOps           |

Léiriú ilardáin: `linux/amd64` + `linux/arm64` dúchasach (Apple Silicon, AWS Graviton, Raspberry Pi). Roghnaíonn Docker an ailtireacht chomhoiriúnach go huathoibríoch; tabhair `--platform linux/amd64` más gá duit aithris AMD64 a fhorchur ar óstaigh ARM.

### Cainéil Eisiúna

Foilsíonn OmniRoute cainéil Docker ar leith le haghaidh eisiúintí cobhsaí, tástáil ghníomhach ar bhrainse eisiúna, agus leaganacha forbartha.

| Cainéal                         | Foinse                                         | Inathraitheacht                    | Úsáid mholta                                                                                                                   |
| ------------------------------- | ---------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Eisiúint shínithe/leaganaithe                  | Do-athraithe                       | Imscaradh táirgeachta a phionnálann eisiúint bheacht                                                                           |
| `:latest` / `:latest-web`       | An SemVer cobhsaí **foilsithe** is airde       | Pointeoir cobhsaí inathraithe      | Leanann sé eisiúintí cobhsaí **tar éis** jab foilsithe SemVer — ní rianaíonn sé `main` ná tiomantais `release/v*` neamheisithe |
| `:next` / `:next-web`           | An brainse réamhshocraithe reatha `release/v*` | Pointeoir réamheisiúna inathraithe | Ceartúcháin a thástáil atá tagtha i dtír ar an mbrainse eisiúna gníomhach ach nach bhfuil in eisiúint chobhsaí fós             |
| `:main` / `:main-web`           | Brainse `main`                                 | Pointeoir forbartha inathraithe    | Forbairt agus tástáil chomhtháthaithe amháin                                                                                   |

#### Soláthraithe seisiúin ghréasáin: na híomhánna `-web`

Tá clib `-web` ag gach cainéal thuas freisin (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), tógtha ón gcéim `runner-web` — an íomhá chéanna móide Playwright agus brabhsálaí Chromium. Seoltar an ghnáthíomhá **gan** Chromium; teastaíonn sé ó `gemini-web`, `claude-web` agus `claude-turnstile`.

Cuirtear an teip siar, ní tharlaíonn sí ag am tosaithe: liostaíonn na soláthraithe sin a samhlacha agus taispeántar mar cheangailte iad sa deais, agus ní theipeann ach ar an gcéad iarratas leis seo

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Má úsáideann tú na soláthraithe sin, tarraing clib `-web` an chainéil ar a bhfuil tú cheana féin — ní athraíonn aon rud eile. Ar shuiteáil npm/CLI (gan íomhá Docker), is é dénártha an bhrabhsálaí an píosa comhfhreagrach atá in easnamh: rith `npx playwright install chromium` ar an óstach.

#### An cainéal réamheisiúna a úsáid

Déantar an cainéal `next` a atógáil le gach brú chuig an mbrainse réamhshocraithe reatha `release/v*` agus foilsítear é do AMD64 agus ARM64 araon. Ní féidir le brainsí cothabhála níos sine é a fhorscríobh. Soláthraíonn an cainéal íomhá is féidir a tharraingt le haghaidh ceartúchán a cumascadh isteach sa bhrainse eisiúna gníomhach sula gcruthaítear an chéad chlib chobhsaí eile.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Le haghaidh Docker Compose, sáraigh an chlib íomhá a úsáideann an phróifíl roghnaithe, ansin tarraing agus athchruthaigh an tseirbhís:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sábháilteacht agus filleadh ar an leagan roimhe seo

Is cainéal réamheisiúna athraitheach é `next`. Féadfaidh sé athrú le haon bhrú chuig an mbrainse eisiúna gníomhach agus **ní thacaítear leis le haghaidh úsáide táirgthe**. Greamaigh díleá na híomhá agus leagan sonrach á mheas agat:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sula ndéanann tú tástáil, déan cúltaca d’imleabhar sonraí OmniRoute nó den chomhadlann sonraí atá gléasta trí cheangal. Chun filleadh ar an leagan roimhe seo, athchóirigh an leagan cobhsaí nó an díleá a úsáideadh roimhe seo agus athchruthaigh an coimeádán:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ní féidir le tógáil ó bhrainse eisiúna `latest` a bhogadh choíche; ní fhéadfaidh ach leagan séimeantach cobhsaí incháilithe an pointeoir cobhsaí a chur chun cinn. Coinníonn na híomhánna `next` iniúchadh na híomhá eisiúna agus an tairseach blocála le haghaidh leochaileachtaí CRITICAL.

**Ní ráthaíocht úire do git é `latest`.** Ní bhíonn ceartúcháin a cumascadh isteach in `main` nó sa bhrainse gníomhach `release/v*` in `:latest` go dtí go bhfoilsítear íomhá SemVer chobhsaí agus go gcuireann an jab foilsithe `:latest` chun cinn (an díleá céanna leis an SemVer sin). Más cosúil go bhfuil `latest` reoite agus an ceartúchán le feiceáil ar GitHub cheana féin, tarraing `:next` chun an brainse eisiúna a thástáil nó fan leis an gclib SemVer.

| An rud atá uait                                                                     | Úsáid                                   |
| ----------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / táirgeadh nach mór dó fanacht gan athrú                                    | Greamaigh `:X.Y.Z` (nó díleá na híomhá) |
| Eisiúintí cobhsaí foilsithe a leanúint agus glacadh le hathchruthú le gach eisiúint | `:latest`                               |
| Tiomantais `release/v*` neamheisithe a thástáil                                     | `:next` (ní le haghaidh táirgthe)       |
| `main` a thástáil                                                                   | `:main` (ní le haghaidh táirgthe)       |

## Infhaighteacht: is macasamhail aonair é SQLite réamhshocraithe

Is éard atá in OmniRoute caighdeánach ar Docker / Kubernetes ná **próiseas Node amháin + scríbhneoir SQLite amháin**. **Ní thacaítear le hinfhaighteacht ard** ar an toipeolaíocht sin.

| Srian                                  | Iarmhairt                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scríbhneoir aonair                     | **Ná** rith macasamhla iolracha in aghaidh an chomhaid SQLite chéanna. Truaillíonn sé sin an DB.                                                                                                                                                                                                                                                                                                |
| Athchruthú / atosú / marú HEALTHCHECK  | **Briseadh iomlán** ar SSE atá ar bun, ar sheisiúin an deais, agus ar staid sa chuimhne. Dícheanglaítear gach cliant nasctha. Faigheann iarratais nua le linn na fuinneoige nuair nach bhfuil críochphointe ar bith ann **`502 Bad Gateway: Unknown error`** ón seachfhreastalaí droim ar ais, seachas JSON OmniRoute — ní féidir le cliaint é seo a idirdhealú ó chliseadh soláthraí (#11015). |
| An lúb imeachtaí chéanna le `/healthz` | Is féidir le catalóg ghnóthach nó timthriall comhbhrúite moill a chur ar thóireadóirí; atosaíonn teorainn ama ghearr an **t-aon** mhacasamhail ansin.                                                                                                                                                                                                                                           |

**Maitrís tóireadóirí** (féach freisin [moltaí maidir le tóireadóirí Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Tóireadóir       | Sprioc                                                                  | Ná húsáid                                                                  |
| ---------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Beogacht         | TCP ar `PORT` (`20128` de réir réamhshocraithe), nó HTTP bog `/healthz` | `/api/monitoring/health`                                                   |
| Ullmhacht        | HTTP `GET /healthz`                                                     | Teorainneacha ama dochta a mheasann lúb imeachtaí ghnóthach a bheith marbh |
| Domhain / daoine | `/api/monitoring/health`                                                | Beogacht uathoibrithe kubelet                                              |

**Uasghráduithe:** bí ag súil go ndícheanglófar gach seisiún. Lig do chliaint a gcuid oibre a chríochnú más féidir; níl aon nuashonrú céimneach ann le SQLite réamhshocraithe. Cuirfidh `restart: unless-stopped` in Compose mar aon le `HEALTHCHECK` Docker an t-aon phróiseas in ionad freisin nuair atá an coimeádán Unhealthy — an raon tionchair céanna.

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

Ligeann fanacht `preStop` do kube críochphointí Service a bhaint sula seoltar SIGTERM, ionas nach mbuaileann trácht **nua** an próiseas atá ag dúnadh. Ligtear do SSE `/v1/responses` atá ar bun críochnú ar feadh suas le `SHUTDOWN_TIMEOUT_MS` (30s de réir réamhshocraithe) trí léasanna iontrála troma (#11015). Faigheann iarratais nua a shroicheann an próiseas fós `503` + `Retry-After: 5`. Is briseadh crua fós í an bhearna gan chríochphointe a chruthaíonn Recreate go dtí go mbíonn an t-ionadaí Ready — is gné í sin de thoipeolaíocht SQLite, ní míchumrú tóireadóra.

**Ní** cosán caighdeánach doiciméadaithe é Postgres seachtrach / HA ilscríbhneora. Má theastaíonn HA uait, coinnigh macasamhail aonair nó rith toipeolaíocht a ndearna an tionscadal tástáil uirthi agus a dhoiciméadaigh sé ar leithligh. Tá an obair Postgres/MySQL in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Go dtí go seolfar é sin, is é N próiseas neamhspleácha (an chéad rannán eile) an t-aon bhealach tacaithe chun acmhainn `/v1/responses` **mhór** a iolrú, seachas `replicas > 1` ar imleabhar amháin.

## Scálú amach: N próiseas neamhspleácha

Is ionann próiseas Node amháin agus **carn V8 amháin**. Cuireann dhá iarratas forluiteacha `POST /v1/responses` ó ghníomhairí códaithe ~3 MiB / ~750k comhartha (RTK + Caveman) deireadh leis an gcarn sin ag ~12 Gi (`FATAL ERROR: Reached heap limit`) agus féadfaidh siad cgroup 16 Gi a chur as cuimhne. Féach [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Is rabhadh faoi **bhuiséad cuimhne** é an tomhas sin, ní uasteorainn dhocht táirge de dhá `/v1/responses` fhada chomhthráthacha. Déantar iontráil comhráite troma a rialú le buiséad beart ionchuir a dhíorthaítear go huathoibríoch (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) agus a mhéidítear ón uasteorainn chéanna V8/cgroup — má sháraítear an luach sin suas (nó má shocraítear an tseanuasteorainn líon iarratas `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) ar phróiseas atá méidithe cheana féin, tabharfar an foirceannadh ar ais. Níl comhráite beaga, `/healthz`, `/v1/models`, ná MCP **san áireamh** san uasteorainn sin.

### Próiseas amháin: níos mó ná dhá `/v1/responses` fhada

Féadfaidh próiseas **sláintiúil** (carn faoi bhun `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, réamhshocrú `0.75`) níos mó ná dhá `POST /v1/responses` fhada chomhthráthacha a rith nuair atá spás fós i mbuiséad beartanna atá ar eitilt ar fud an phróisis (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Glacann coirp atá ag `OMNIROUTE_CHAT_LARGE_BODY_BYTES` nó os a chionn (réamhshocrú 256 KiB) an léas trom céanna le hiarratais atá trom ó thaobh struchtúir de agus úsáideann siad an bealach éalaithe `tryAcquireHealthyHeadroom` céanna ó [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Is ceist **bhuiséid cuimhne** iad na deicheanna de chliaint fhada SSE chomhthráthacha (is minic a bhíonn 40–50 ag teastáil ó oibreoirí) — méadaigh an carn + na sliotáin phríomhúla/spáis bhreise + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ní teorainn dhocht táirge “uasmhéid 2”. Leanann carn faoi bhrú de lucht a laghdú le `503` in-atrialta ionas nach bhfillfidh #7849.

Chun **líon na gcarn a iolrú** (seanspásanna neamhspleácha V8) **inniu**:

| Déan                                                                                                                                                                                   | Ná déan                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Rith **N coimeádán/pod**, agus a **`DATA_DIR` féin** / imleabhar féin ag gach ceann                                                                                                    | Socraigh `replicas > 1` i gcoinne aon chomhad SQLite amháin                   |
| Méadaigh an líon trom atá ar eitilt + an spás breise sláintiúil de réir an chairn / bhuiséad na mbeart atá ar eitilt; is réamhshocrú coimeádach #7849 é 1–2, ní uasmhéid dhocht táirge | Tabhair 8× RAM do phróiseas amháin agus uasteorainn neamhtheoranta comhairimh |
| Roghnach: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` le haghaidh **áiritheoirí cuóta comhroinnte**                                                                           | Caith le Redis mar SQLite comhroinnte — ní hionann iad                        |
| Cóipeáil rúin soláthraithe isteach i ngach ásc (nó glac le deaiseanna deighilte)                                                                                                       | Bí ag súil le deais amháin / loga glaonna amháin thar na háscanna             |
| Cuir cothromóir lóid ar a aghaidh; is leor greamaitheacht de réir eochair API nó seisiúin                                                                                              | Éiligh meánearra a bhaineann go sonrach le díoltóir agus atá feasach ar mhéid |

Crua-earraí: is ceist **bhuiséid cuimhne** é líon na `/v1/responses` fada chomhthráthacha in aghaidh an áisc (carn + bearta ar eitilt / #10110). Iolraíonn `N` `DATA_DIR` neamhspleácha líon na gcarn fós: ní mór do RAM an óstaigh `N × cgroup` a chlúdach, ní “pod amháin 16 Gi le N=8.” Ná húsáid `replicas > 1` riamh ar aon chomhad SQLite amháin.

Sceitse Compose (dhá charn, dhá imleabhar — ní `deploy.replicas: 2`):

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

Tá dlús laistigh den phróiseas (comhbhrú lasmuigh den aonraitheoir HTTP) in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Tá cnuasach loighciúil amháin ar staid mharthanach chomhroinnte in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Earráidí réigiúnacha Gemini laistigh de Docker

Is féidir le Google AI Studio / Gemini API HTTP 400 a thabhairt ar ais le FAILED_PRECONDITION agus
`User location is not supported for the API use.` Ní chruthaíonn iarratas rathúil ar an óstach
go n-úsáideann an coimeádán an bealach amach céanna. D’fhéadfadh ord DNS,
nascacht IPv4/IPv6, ródú VPN agus seachfhreastalaithe cumraithe a bheith éagsúil. Seiceáil
[réigiúin a dtacaíonn Google leo](https://ai.google.dev/gemini-api/docs/available-regions)
chomh maith leis an mbealach ceangail iarbhír; ní thugann an earráid seo inti féin le fios go bhfuil an eochair API mícheart.

### Tabhair tosaíocht do sheachfhreastalaí a bhaineann go sonrach leis an gceangal

Úsáid [cumraíocht seachfhreastalaí de réir ceangail](../ops/PROXY_GUIDE.md#4-level-proxy-system)
OmniRoute don cheangal Gemini lena mbaineann, ansin déan **Test Connection** agus iarratas beag
arís leis an tsamhail chéanna. Coinníonn sé seo an t-athrú ródaithe teoranta don cheangal sin. Deimhnigh
gur féidir an seachfhreastalaí a shroicheadh ón gcoimeádán, agus go roghnaíonn an ceangal
é i ndáiríre. Ní ráthaíonn athrú an bhealaigh incháilitheacht réigiúnach ag an tseirbhís réamhtheachtach.

### Déan comparáid idir líonrú an óstaigh agus an choimeádáin

Coinnigh an eochair, an tsamhail agus an t-iarratas mar an gcéanna agus torthaí fíordheimhnithe á gcur i gcomparáid; ná
greamaigh dintiúir, pasfhocail seachfhreastalaí ná ceanntásca údaraithe iomlána in eagrán riamh.
Ar dtús, scrúdaigh na teaghlaigh seoltaí a thairgeann réiteoir an OS, agus an t-ordú céanna á úsáid
ar an óstach agus laistigh den choimeádán:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Cuir an tseirbhís a ritheann tú in ionad `omniroute` (mar shampla, `omniroute-web`). Priontálann na
horduithe seo teaghlaigh seoltaí gan dintiúir ná seoltaí IP. Ní léiríonn `6` a thugtar ar ais
ach toradh DNS IPv6: ní chruthaíonn sé bealach IPv6 inúsáidte ná rochtain API.
Nuair atá `curl` suiteáilte, cuir `curl -4 -I https://generativelanguage.googleapis.com`
i gcomparáid le `curl -6 -I https://generativelanguage.googleapis.com` sa dá thimpeallacht.
Cruthaíonn freagra HTTP nascacht don tóireadóir sin, fiú más earráid neamhfhíordheimhnithe
é; ní dhéanann ach an t-iarratas fíordheimhnithe ar an tsamhail incháilitheacht Gemini a thástáil.

### Rogha eile ar leibhéal an óstaigh: IPv6 oibríoch agus polasaí réiteora

D’athbhunaigh tuairisceoir [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)
rochtain ina thimpeallacht trí IPv6 coimeádáin a chumasú agus roghnú seoltaí glibc
a athrú. Caith leis seo mar rogha eile a bhaineann go sonrach leis an timpeallacht. Deimhnigh go bhfuil IPv6 an óstaigh
ag obair, mar aon le héalú/ródú an choimeádáin agus rialacha an bhalla dóiteáin, sula n-athraítear sainroghanna an réiteora.
Ní bhunaíonn seoladh príobháideach ULA ann féin nascacht phoiblí IPv6.

I gcás seirbhísí atá ceangailte cheana féin le líonra réamhshocraithe Compose, cumasaíonn an blúire seo
IPv6 ar an líonra sin; coinnigh an chuid eile de do sheirbhís, do phoirt, d’imleabhair agus de do chumraíocht:

```yaml
networks:
  default:
    enable_ipv6: true
```

I gcás líonra ainmnithe, cumasaigh é ar an líonra a dtéann an tseirbhís isteach ann i ndáiríre. Is féidir le Docker
folíon ULA a leithdháileadh; ná roghnaigh folíon sainráite nach bhfuil forluiteach ann ach amháin nuair a éilíonn do líonra
é. Féach [líonrú IPv6 Docker](https://docs.docker.com/engine/daemon/ipv6/)
agus [roghanna líonra Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Ar **íomhá bunaithe ar glibc**, is féidir le `/etc/gai.conf` roghnú seoltaí a athrú. Úsáideann Dockerfile reatha
na stórtha Debian; ní úsáideann íomhánna saincheaptha bunaithe ar musl an mheicníocht seo.
Athraíonn an coigeartú a tuairiscíodh lipéad ULA ó `label fc00::/7 6` go
`label fc00::/7 1`. Tosaigh ó thábla iomlán polasaí na híomhá agus caomhnaigh na hiontrálacha eile atá ann:
tagann iontráil `label` nó `precedence` in ionad an tábla réamhshocraithe sin, mar sin ní leor comhad
nach bhfuil ann ach an líne athraithe. Déantar na séimeantaicí sin a dhoiciméadú sa
[tagairt chumraíochta glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf).
Feistigh an comhad athbhreithnithe le ceangal mar chomhad inléite amháin ag `/etc/gai.conf`
agus athchruthaigh an tseirbhís chun é a chur i bhfeidhm.

Athraíonn sé seo roghnú seoltaí an OS do **gach trácht amach sa choimeádán sin**.
Ní chuireann sé iallach ar gach feidhmchlár IPv6 a roghnú: tá ord DNS agus roghnú ceangail
Node tábhachtach freisin. Go háirithe, tugann `--dns-result-order=ipv4first` tosaíocht do IPv4 agus
ní réiteach é ar chliseadh IPv4 amháin. Féach [ordú DNS Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Déan Gemini agus do sholáthraithe eile a thástáil arís tar éis aon athrú ar leibhéal an óstaigh. Chun filleadh ar an gcumraíocht roimhe seo,
bain an feistiú saincheaptha `gai.conf`, athchóirigh an chumraíocht líonra roimhe seo agus
athchruthaigh an tseirbhís/an líonra lena mbaineann le linn tréimhse cothabhála. D’fhéadfadh athchruthú líonra
cur isteach ar choimeádáin eile atá ceangailte leis; ná scrios an t-imleabhar sonraí seasmhach.

## Nótaí Tábhachtacha

- **Mód WAL SQLite:** Ba cheart ligean do `docker stop` críochnú ionas gur féidir le OmniRoute seicphointe a dhéanamh ar na hathruithe is déanaí ar ais isteach i `storage.sqlite`. Tá tréimhse chairde 40s le haghaidh stoptha socraithe cheana féin sna comhaid Compose atá sa bheart. Má ritheann tú an íomhá go díreach, coinnigh `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Socraigh mar `true` é má bhainistítear gnáthchúltacaí/cúltacaí réamhscríofa go seachtrach. Teastaíonn a léargas sábháilteachta marthanach féin agus cosaint ar ollaistriú fós le haghaidh aistrithe bunachar sonraí atá ann cheana.
- **Marthanacht Sonraí:** Feistigh imleabhar ar `/app/data` i gcónaí chun do bhunachar sonraí, d'eochracha agus do chumraíochtaí a chaomhnú idir atosuithe coimeádáin.
- **Cumraíocht Poirt:** Sáraigh an athróg timpeallachta `PORT` chun an port réamhshocraithe `20128` a athrú.

## Féach Freisin

- [Treoir Imlonnaithe VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Socrú VM + nginx + Cloudflare
- [Treoir Imlonnaithe Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Imlonnaigh ar Fly.io
- [Cumraíocht Timpeallachta](../reference/ENVIRONMENT.md) — Tagairt iomlán `.env`
