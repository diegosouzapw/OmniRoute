# 🐳 Docker Guide — OmniRoute (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Rejea kamili ya uwekaji kwa Docker. Kwa kuanza haraka, angalia [sehemu ya Docker katika README](../README.md#-docker).

## Yaliyomo

- [Uendeshaji wa Haraka](#quick-run)
- [Kwa Kutumia Faili ya Mazingira](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Wasifu Unaopatikana](#available-profiles)
- [Kusanidi zana za CLI za host wakati OmniRoute inaendeshwa katika Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose ya Uzalishaji](#production-compose)
- [Hatua za Dockerfile](#dockerfile-stages)
- [Vigezo Muhimu vya Mazingira](#critical-environment-variables)
- [Docker Compose yenye Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Lebo za Image](#image-tags)
- [Upatikanaji: SQLite chaguo-msingi ni nakala moja](#availability-default-sqlite-is-single-replica)
- [Vidokezo Muhimu](#important-notes)

---

## Uendeshaji wa Haraka

> **Unataka kujiendeshea kwa amri moja?** Tazama
> [Mwongozo wa Kujiendeshea](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image iliyochapishwa +
> Redis, loopback pekee, bila chaguo la wasifu). Uendeshaji wa Haraka hapa chini ni
> njia ya kontena moja kwa watumiaji ambao tayari wanaendesha Redis kwingine.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Kwa Kutumia Faili ya Mazingira

```bash
# Nakili na uhariri .env kwanza
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
# Wasifu wa msingi (bila zana za CLI)
docker compose --profile base up -d

# Wasifu wa CLI (Claude Code, Codex, OpenClaw zimejumuishwa)
docker compose --profile cli up -d

# Wasifu wa host (Linux kwanza; huweka binary za CLI za host katika hali ya kusoma pekee)
docker compose --profile host up -d

# Unganisha CLI + sidecar ya CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Wasifu Unaopatikana

OmniRoute huja na wasifu wanne wa Compose. Chagua unaolingana na mazingira yako.

| Wasifu                 | Huduma           | Wakati wa kutumia                                                                                                                                                   | Amri                                         |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (chaguo-msingi) | `omniroute-base` | Seva isiyo na kiolesura / mazingira ya chini kabisa ya utekelezaji, bila CLI za watoa huduma zilizojumuishwa                                                        | `docker compose --profile base up -d`        |
| `cli`                  | `omniroute-cli`  | Mitiririko ya kazi ya kiwakala inayotumia `omniroute providers/setup/doctor` na CLI zilizojumuishwa (Codex, Claude Code, Droid, OpenClaw)                           | `docker compose --profile cli up -d`         |
| `host`                 | `omniroute-host` | Host za Linux zinazotaka ufikiaji unaofanana na `network_mode` kwa CLI za host kwa kuweka `~/.local/bin`, `~/.codex`, `~/.claude`, n.k. katika hali ya kusoma pekee | `docker compose --profile host up -d`        |
| `cliproxyapi`          | `cliproxyapi`    | Endesha sidecar ya [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) kwenye porti `8317` kwa uwekaji proksi wa CLI ya upstream                            | `docker compose --profile cliproxyapi up -d` |

> Wasifu kadhaa unaweza kuunganishwa: `docker compose --profile cli --profile cliproxyapi up -d`.

## Kusanidi zana za CLI za mwenyeji wakati OmniRoute inaendeshwa kwenye Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` na kitufe cha dashibodi cha
**Hifadhi usanidi** zote huandika faili kama `~/.codex/*.config.toml`. Njia hizo
zina maana tu kwenye mashine ambako CLI inaendeshwa. Zikiendeshwa ndani ya
kontena, maandishi hayo huhifadhiwa kwenye saraka ya nyumbani ya kontena lenyewe (`/home/node` —
taswira inaendesha `USER node`), ambako hakuna CLI ya mwenyeji itakayoyasoma na ambako
hufutwa mara tu kontena linapoundwa upya.

OmniRoute hugundua hali hii na hukataa kuandika huku ikitoa maelekezo badala ya
kuripoti mafanikio ambayo huwezi kutumia: CLI hutoka kwa msimbo `2`, na API hujibu `422`
ikiwa na `containerEphemeralTarget: true`.

### Inapendekezwa: endesha CLI kwenye mwenyeji, na OmniRoute kwenye Docker

Kontena hutoa API; CLI husanidi zana zako za mwenyeji.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # elekeza CLI kwenye kontena
omniroute setup-codex                      # huandika ~/.codex halisi kwenye mwenyeji wako
```

Hili ndilo chaguo sahihi wakati Codex, Claude Code, Cursor au zana kama hizo zinaendeshwa kwenye
laptopu yako — ambao ndio usanidi wa kawaida.

### Njia mbadala: unganisha saraka za usanidi za mwenyeji kwa bind mount (wasifu wa `host`)

Ikiwa unataka kontena lenyewe liandike usanidi wa mwenyeji wako, unganisha
saraka hizo ndani na uelekeze `CLI_CONFIG_HOME` kwenye mzizi wa sehemu iliyounganishwa. Wasifu wa `host`
tayari hufanya hivi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ndiyo inayofanya njia hiyo iaminike: OmniRoute husoma
`/proc/self/mountinfo` na huruhusu uandishi kwenye njia zilizounganishwa (na kwenye saraka
ambazo saraka zake za ndani zimeunganishwa, hali ambayo ndiyo hasa muundo wa `/host-home` hapo juu), huku
ikiendelea kukataa njia ambazo hazijaunganishwa.

### Njia ya dharura: sanidi CLI za kontena lenyewe (tumia kwa tahadhari)

Wakati CLI kwa kweli zipo ndani ya kontena (wasifu wa `cli`), uandishi huo
umekusudiwa. Pitisha `--allow-container-write` kwa amri yoyote ya `setup-*`, au weka
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` kwa seva. Uandishi utaendelea
ukiwa na onyo kwamba hautadumu baada ya kontena kuondolewa.

> **Onyo la usalama — wasifu wa `cli` + mount ya `docker.sock`.**
> Wasifu wa `cli` huunganisha `/var/run/docker.sock` kwa bind mount ili kisasaishaji
> kiotomatiki kilicho ndani ya kontena kiweze kuunda upya stack kutoka kwa daemon ya mwenyeji
> (`src/lib/system/autoUpdate.ts` hukagua soketi hiyo na kuruka njia ya
> Docker ikiwa haipo). Soketi hiyo ni **mpaka wa uaminifu wa root wa
> mwenyeji**: chochote kinachoweza kuifikia hudhibiti daemon ya Docker ya mwenyeji kama
> root — kinaweza kuunda, kukagua, kusimamisha na kuondoa kontena lolote kwenye mwenyeji.
> Athari zake:
>
> 1. **Kamwe usiweke port ya wasifu wa `cli` wazi kwa mtandao.** Ichapishe
>    kwenye `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — wasifu wa `cli` unaofikika kupitia LAN hugeuza RCE yoyote ya kiwango cha dashibodi kuwa
>    uvamizi kamili wa mwenyeji.
> 2. **Usiunganishe saraka zozote za ziada za mwenyeji kwenye wasifu wa `cli`.**
>    Soketi ya Docker pamoja na mount yoyote ya ziada hulipa kontena uwezo kamili wa
>    kusoma/kuandika mfumo wako wa faili na usanidi wa mwenyeji. Ikiwa unahitaji zana
>    kufikia mradi, iendeshe moja kwa moja kwenye mwenyeji ukitumia programu ya CLI — usiiunganishe
>    ndani ya kontena la `cli`.
>
> Ikiwa huhitaji usasishaji wa kiotomatiki ndani ya kontena, usiwasha wasifu wa `cli`
> (`COMPOSE_PROFILES=core,redis` au kifupi zaidi). Wasifu mwingine hauunganishi
> soketi ya Docker.
>
> Tazama `docs/security/MITM-TPROXY-DECRYPT.md` (git; haijajumuishwa kwenye `/docs`) kwa modeli husika ya vitisho
> vinavyohusu MITM, na `docs/security/SUPPLY_CHAIN.md` kwa
> mnyororo wa asili ya programu za `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute hutegemea Redis kuendesha kikomo cha kasi kilichosambazwa na akiba inayoshirikiwa. Huduma ya `redis` **hufafanuliwa kila wakati** katika `docker-compose.yml` (haina kizuizi cha wasifu) na huanza pamoja na wasifu mwingine wowote.

| Maelezo                                    | Thamani                                          |
| ------------------------------------------ | ------------------------------------------------ |
| Taswira                                    | `redis:7-alpine`                                 |
| Jina la kontena                            | `omniroute-redis`                                |
| Mlango wa ndani                            | `6379`                                           |
| Mlango wa seva pangishi (ubatilishaji)     | `REDIS_PORT` (chaguo-msingi ni `6379`)           |
| Kiolesura cha seva pangishi (ubatilishaji) | `REDIS_BIND_HOST` (chaguo-msingi ni `127.0.0.1`) |
| Hifadhi                                    | `omniroute-redis-data` → `/data`                 |
| Ukaguzi wa afya                            | `redis-cli ping` (kipindi cha sekunde 10)        |

Vigezo vya mazingira vinavyohusiana:

- `REDIS_URL` — msururu wa muunganisho unaowekwa kwenye programu (`redis://redis:6379` kwa chaguo-msingi).
- `REDIS_PORT` — upangaji wa mlango wa upande wa seva pangishi kwa kontena la Redis.
- `REDIS_BIND_HOST` — kiolesura cha seva pangishi ambapo mlango unachapishwa. Chaguo-msingi ni `127.0.0.1`.

> **Kwa nini loopback hutumiwa kwa chaguo-msingi:** sidecar huendeshwa bila `requirepass`, na makontena ya programu
> huifikia kupitia mtandao wa compose (`redis:6379`) — mlango uliochapishwa
> upo tu kwa zana za upande wa seva pangishi (`redis-cli`, `npm run dev` ya ndani). Kuchapisha kwenye
> `0.0.0.0` kungefichua Redis isiyo na uthibitishaji kwa kila seva pangishi kwenye LAN yako. Ukiweka
> `REDIS_BIND_HOST=0.0.0.0`, ongeza pia `--requirepass` kwenye `command:` ya huduma.

**Kuzima Redis** hakupendekezwi (kikomo cha kasi kitashuka hadi kutumia mbadala wa kumbukumbu ya ndani). Iwapo ni lazima, ama ondoa/toa kama maoni kizuizi cha huduma cha `redis:` katika `docker-compose.yml` au kipunguze hadi sifuri:

```bash
docker compose up -d --scale redis=0
```

## Compose ya Uzalishaji

Kwa snapshot ya uzalishaji iliyotengwa inayoendeshwa sambamba na mazingira ya uundaji, tumia `docker-compose.prod.yml`.

| Maelezo                           | Thamani                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| Faili                             | `docker-compose.prod.yml`                                                                  |
| Mlango chaguo-msingi wa dashibodi | `PROD_DASHBOARD_PORT=20130` (umeunganishwa na mlango wa ndani `${DASHBOARD_PORT:-20128}`)  |
| Mlango chaguo-msingi wa API       | `PROD_API_PORT=20131`                                                                      |
| Taswira                           | `omniroute:prod` (imeundwa kutoka kwa lengo la `runner-cli`)                               |
| Kontena la Redis                  | `omniroute-redis-prod` (`redis:8.6.2`, hifadhi maalumu ya `redis-prod-data`)               |
| Hifadhi ya data                   | `omniroute-prod-data` (imepewa jina, hudumu katika uundaji upya)                           |
| Ukaguzi wa afya                   | `node healthcheck.mjs` + `redis-cli ping`, huku `depends_on` ikidhibitiwa na afya ya Redis |

Jinsi ya kutumia:

```bash
# Unda na uanzishe mfumo wa uzalishaji
docker compose -f docker-compose.prod.yml up -d --build

# Tiririsha kumbukumbu
docker compose -f docker-compose.prod.yml logs -f

# Simamisha mfumo (hifadhi volume)
docker compose -f docker-compose.prod.yml down
```

Mfumo wa uzalishaji huendeshwa sambamba na compose ya uundaji (majina ya kontena, milango na hifadhi ni tofauti), kwa hivyo unaweza kuendelea kufanya maboresho ndani ya mazingira yako ya ndani huku mfumo wa uzalishaji ukiendelea kufanya kazi.

## Hatua za Dockerfile

Hazina hii inajumuisha Dockerfile yenye hatua nyingi (`Dockerfile`). Hatua tatu zimewekwa wazi; chagua `target` inayofaa kwa matumizi yako.

| Hatua         | Taswira msingi        | Madhumuni                                                                                                                                                                                |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Husakinisha vitegemezi (`npm ci --legacy-peer-deps`) na kuendesha `npm run build` (Turbopack kwa chaguo-msingi — tazama Rasilimali za wakati wa ujenzi hapa chini)                       |
| `runner-base` | `node:26-trixie-slim` | Mazingira ya utekelezaji ya uzalishaji yenye towe huru la Next.js. **Hakuna CLI za watoa huduma zilizojumuishwa.**                                                                       |
| `runner-cli`  | `runner-base`         | Huongeza `git`, `docker.io`, `docker-compose` na CLI za kimataifa: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Chagua hii kwa mitiririko ya kazi ya mawakala.** |

Jenga target mahususi wewe mwenyewe:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Rasilimali za wakati wa ujenzi

Hoja tatu za ujenzi hudhibiti gharama ya hatua ya `builder`. Zinatumika wakati wa ujenzi pekee —
`OMNIROUTE_MEMORY_MB` (hapa chini) ni kidhibiti tofauti cha wakati wa utekelezaji.

| Hoja ya ujenzi              | Chaguo-msingi | Athari                                                                                                         |
| --------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`           | `0` hujenga kwa webpack badala yake. Kilele cha matumizi ya kumbukumbu ni cha chini, lakini ni polepole zaidi. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | Kikomo cha heap ya V8 (`--max-old-space-size`) kwa `next build` iliyoanzishwa.                                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Hutoa thamani kwa `CIRCLE_NODE_TOTAL`; Next hukokotoa `workers = N - 1` kwa ukusanyaji wa data za kurasa.      |

`OMNIROUTE_BUILD_WORKERS` ndiyo inayopaswa kuongezwa kwenye mfumo mkubwa wa ujenzi na ndiyo
inayopaswa kutiliwa shaka wakati ujenzi wenye rasilimali chache unapokoma **baada ya** `✓ Compiled successfully`. Kila
worker wa data za kurasa ni mchakato wake wenyewe, na mchakato mkuu wa `next build` pia ni
mchakato tofauti; jaribio la moja kwa moja kwenye VPS (suala #7518) lilipima kilele cha RSS cha kila mchakato kuwa
~4.5 GB bila kutegemea bendera ya heap ya `NODE_OPTIONS` (Turbopack hukusanya katika
kumbukumbu asilia/Rust nje ya heap ya V8). Chaguo-msingi la `2` (→ worker 1, jumla ya
michakato 2) limepangwa kwa runners zinazoendeshwa na GitHub zenye GB 16 / vCPU 4 ambazo
mchakato wa uchapishaji hutumia. Kwa `8` (→ workers 7), runner huyo aliishiwa na kumbukumbu na
buildkit ikashindwa kutekeleza hatua hiyo kwa `ResourceExhausted: ... cannot allocate memory`;
`3` (→ workers 2) bado haikutosha baada ya RSS ya kila mchakato kupimwa
moja kwa moja badala ya kukadiriwa. `tests/unit/docker-build-memory-budget.test.ts`
hufanya hesabu dhidi ya thamani iliyopimwa na hushindwa ikiwa kidhibiti chochote kati ya hivyo
kinazidi uwezo wa runner.

Turbopack hukusanya katika kumbukumbu asilia ya Rust iliyo **nje** ya heap ya V8, kwa hivyo
`OMNIROUTE_BUILD_MEMORY_MB` haiiwekei kikomo. Kwenye host yenye kikomo cha kumbukumbu,
ujenzi huuawa kwa SIGKILL na OOM killer bila maandishi yoyote ya hitilafu — husimama tu
katikati ya `Creating an optimized production build`, jambo linaloonekana kama kukwama badala
ya kuishiwa na kumbukumbu. Ikiwa host ya ujenzi ina rasilimali chache, badilisha bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` imewezeshwa, kwa hivyo `next build` huendesha mchakato mkuu **na** mchakato
wa worker, na kila mmoja huzingatia `OMNIROUTE_BUILD_MEMORY_MB` kivyake. Weka kikomo cha container
juu ya takriban mara mbili ya thamani hiyo, si mara moja.

Vipimo kwenye tree hii (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Kikomo cha container | Matokeo                                      |
| --------- | -------------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | Iliuawa na OOM kwa vyote viwili, bila ujumbe |
| webpack   | 8 GiB                | worker wa ujenzi aliuawa kwa SIGKILL         |
| webpack   | 12 GiB               | ilifanikiwa, kilele kilikuwa 11.1 GiB        |

### Chaguo-msingi za wakati wa utekelezaji

Chaguo-msingi zinazosafirishwa na `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Tabia ya kumbukumbu katika Docker:

- Taswira huweka `OMNIROUTE_MEMORY_MB=1024` na kupata `NODE_OPTIONS=--max-old-space-size=1024` kutoka kwayo.
- Mchakato halisi wa seva huanzishwa na kizinduzi huru, ambacho husoma `OMNIROUTE_MEMORY_MB` na kuambatisha `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node hutumia thamani ya mwisho iliyorudiwa ya `--max-old-space-size`, kwa hivyo kuweka `OMNIROUTE_MEMORY_MB` hudhibiti kikomo halisi cha heap ya Docker.
- Kwa sababu taswira huiweka kila wakati, thamani ya dharura ya kizinduzi inayorekebishwa kulingana na RAM haitumiki kamwe chini ya Docker. Iongeze waziwazi kulingana na mzigo wa kazi (jedwali hapa chini). `2048` bado ni ndogo mno kwa `/v1/responses` ya wakala wa uandishi wa msimbo.

### RAM ya wakati wa utekelezaji kwa mawakala wa uandishi wa msimbo

Chaguo-msingi la Docker la GiB 1 ni kiwango cha chini kwa dashibodi/mazungumzo mepesi, si ukubwa wa uzalishaji. Miili mirefu ya `POST /v1/responses` (mamia ya ujumbe, makumi ya zana) huhifadhi grafu nyingi katika kumbukumbu wakati wa ubanaji. Maombi mawili yanayopishana ya ~3 MiB / ~tokeni 750k yamesababisha V8 kukoma kwenye old-space ya **12 GiB** (`FATAL ERROR: Reached heap limit`) na pia kufikia OOM ya cgroup ya GiB 16. Tazama [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Weka ukubwa wa **cgroup `--memory` juu ya heap** — bafa asilia, SQLite, na data za kati za ubanaji ziko nje ya V8.

| Mzigo wa kazi                                                           | `OMNIROUTE_MEMORY_MB`          | Kontena / cgroup                   | Maelezo                                                                                                        |
| ----------------------------------------------------------------------- | ------------------------------ | ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Dashibodi, gumzo moja jepesi                                            | `1024` (chaguomsingi la image) | ≥2 GiB                             |                                                                                                                |
| Wakala mmoja wa usimbaji (Claude/Codex/Grok)                            | `8192`                         | ≥10 GiB                            | Ombi la kawaida la kipindi kimoja la `/v1/responses`                                                           |
| Maombi mawili marefu ya `/v1/responses` yanayoendeshwa kwa wakati mmoja | `10240`–`12288`                | ≥12–16 GiB                         | Kusitishwa kwa V8 kulipimwa kwenye heap ya takriban 12 GiB                                                     |
| Miktadha mitatu au zaidi mirefu inayoendeshwa kwa wakati mmoja          | usitumie mchakato mmoja        | pangilia kwa mfululizo / RAM zaidi | Chaguomsingi la kuingiza kazi nzito ni kazi 1 inayoendelea; kuliongeza bila RAM hurudisha tatizo la kusitishwa |

`omniroute serve` kwenye mashine halisi husawazisha takriban 35% ya RAM (ikiwa imewekewa mipaka ya `[512, 4096]`) wakati `OMNIROUTE_MEMORY_MB` **haijawekwa**. Docker huweka `1024` kila wakati, kwa hivyo usawazishaji huo hautekelezwi kamwe katika image rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Vigezo Muhimu vya Mazingira

Zaidi ya chaguo-msingi yaliyoelezwa katika [ENVIRONMENT.md](../reference/ENVIRONMENT.md), vigezo vifuatavyo vina umuhimu mkubwa zaidi wakati wa kuendesha chini ya Docker:

| Kigezo                        | Madhumuni                                                                                                                                                                                                                                                                                                  | Chaguo-msingi               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Siri inayoshirikiwa kwa daraja la WebSocket. **Inahitajika katika mazingira ya uzalishaji** — iweke kuwa mfuatano thabiti wa nasibu.                                                                                                                                                                       | haijawekwa (lazima itolewe) |
| `REDIS_URL`                   | Mfuatano wa muunganisho kwa kidhibiti cha kiwango / mfumo wa nyuma wa akiba                                                                                                                                                                                                                                | `redis://redis:6379`        |
| `REDIS_PORT`                  | Porti ya upande wa seva pangishi kwa kontena la Redis lililojumuishwa                                                                                                                                                                                                                                      | `6379`                      |
| `REDIS_BIND_HOST`             | Kiolesura cha seva pangishi ambacho porti ya Redis iliyojumuishwa inachapishwa juu yake (loopback isipokuwa uongeze AUTH)                                                                                                                                                                                  | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Njia ya seva pangishi iliyopachikwa kwenye wasifu wa `cli` katika `/workspace/omniroute` kwa michakato ya kujisasisha                                                                                                                                                                                      | `.` (saraka ya sasa)        |
| `OMNIROUTE_MEMORY_MB`         | Kikomo cha heap ya Node wakati wa utekelezaji kwa seva huru ya Docker; hubatilisha chaguo-msingi la image lililo hapo juu. Mawakala wa uandishi wa msimbo: `8192`+ (angalia [RAM ya wakati wa utekelezaji](#runtime-ram-for-coding-agents)).                                                               | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Hubatilisha porti zilizo wazi kwa dashibodi (20128) na API (20129)                                                                                                                                                                                                                                         | `20128` / `20129`           |
| `APP_BIND_HOST`               | Kiolesura cha seva pangishi ambacho docker-compose huchapisha porti za dashibodi/API/live-WS juu yake. Ikiwa `REQUIRE_API_KEY=false` (chaguo-msingi), `0.0.0.0` hufichua proksi ya `/v1` isiyohitaji utambulisho kwa LAN — panua ufikiaji tu ukiwa na `REQUIRE_API_KEY=true` au proksi elekezi mbele yake. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Kiolesura cha seva pangishi ambacho docker-compose huchapisha sidecar ya `cliproxyapi` juu yake — volume yake ya data huhifadhi vitambulisho vya watoa huduma.                                                                                                                                             | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Saraka ambayo kichanganuzi cha programu-jalizi cha wakati wa utekelezaji husoma na kusakinisha ndani yake. Ikiwe wakati programu-jalizi zimepachikwa kwa bind: chaguo-msingi hufuata `HOME`, ambayo si lazima image i-export.                                                                              | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | Njia ndogo ya URL wakati programu inachapishwa nyuma ya proksi elekezi (k.m. `/omniroute`)                                                                                                                                                                                                                 | _(tupu = mzizi)_            |
| `NEXT_PUBLIC_BASE_URL`        | Asili ya umma ya kivinjari ikijumuisha njia ndogo (k.m. `https://host/omniroute`)                                                                                                                                                                                                                          | haijawekwa                  |
| `PROD_DASHBOARD_PORT`         | Porti ya dashibodi ya upande wa seva pangishi kwa `docker-compose.prod.yml`                                                                                                                                                                                                                                | `20130`                     |
| `CLIPROXYAPI_PORT`            | Porti ya upande wa seva pangishi kwa sidecar ya `cliproxyapi`                                                                                                                                                                                                                                              | `8317`                      |

## Proksi ya Nyuma kwenye Njia Ndogo (Traefik / nginx)

`basePath` ya Next.js hujumuishwa kwenye kifurushi cha standalone wakati wa uundaji. OmniRoute huhifadhi thamani iliyojumuishwa
kwenye faili ya sentinel kwenye mzizi wa programu (huandikwa wakati wa `npm run build`; husomwa na
`scripts/docker/ensure-docker-base-path.mjs`) na kuilinganisha na
`OMNIROUTE_BASE_PATH` wakati kontena linapoanza. Zinapotofautiana na image iliundwa
kwa ajili ya mzizi wa domain, entrypoint huandika upya manifest za standalone,
thamani za moja kwa moja za `basePath`/`assetPrefix` zilizopachikwa (Next 16 huunda URL za rasilimali za SSR kutoka
`assetPrefix` pekee — patcher huakisi njia ndogo ndani yake), URL za rasilimali za
`/_next/static` zilizojumuishwa (manifest za marejeleo ya mteja, uingizaji wa media, kurasa za hitilafu
zilizorenderiwa mapema) na shim ya `process.env` ya mteja kabla ya `node dev/run-standalone.mjs`
kuendeshwa.

### Uundaji kwa Compose (unapendekezwa)

Weka vigezo vyote viwili katika `.env`, kisha unda upya ili image na mazingira ya utekelezaji yalingane:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` hupitisha `OMNIROUTE_BASE_PATH` kama build-arg ya Docker na kama
kigezo cha mazingira wakati wa utekelezaji.

### Image ya mzizi iliyoundwa mapema + njia ndogo wakati wa utekelezaji

Image zilizochapishwa za `diegosouzapw/omniroute:*` zimeundwa kwa ajili ya mzizi wa domain. Bado unaweza
kuweka `OMNIROUTE_BASE_PATH` wakati wa utekelezaji; kontena hurekebisha kifurushi mara moja linapoanza.
Iambatanishe na origin ya umma inayolingana:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Sanidi proksi ya nyuma ili ipitishe njia **kamili** ya nje (usiondoe
kiambishi awali). Traefik inapaswa kuelekeza `PathPrefix(`/omniroute`)` kwenye kontena bila
`StripPrefix`, ili Next.js ipokee `/omniroute/...` na itoe rasilimali kutoka
`/omniroute/_next/...`.

Ukaguzi wa afya wa Docker hukagua endpoint nyepesi ya mzunguko wa maisha ya `/healthz` iliyopewa kiambishi awali
cha `OMNIROUTE_BASE_PATH` inayotumika. `/api/monitoring/health` bado inapatikana kwa
uchunguzi wa kibinadamu/dashibodi; ili kuelekeza HEALTHCHECK ya kontena tena kwake (kwa mfano
kwa utekelezaji wa ukaguzi wa kina wa afya), weka `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Njia hiyo ni ukaguzi **wa kina** (DB + muhtasari wa ufuatiliaji) — unafaa kwa
`HEALTHCHECK` ya Docker isiyofanywa mara nyingi ikiwa utaamua kuitumia tena, lakini **haufai** kwa vipindi vya
`livenessProbe` vya Kubernetes.

Kwa vipangaji vya mifumo (Kubernetes, Nomad, n.k.):

| Ukaguzi         | Pendelea                                                                 | Epuka                                                                            |
| --------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Uhai            | HTTP `GET /livez`, au TCP kwenye port kuu (`PORT`, chaguomsingi `20128`) | `/api/monitoring/health` kama ukaguzi wa uhai                                    |
| Utayari         | HTTP `GET /healthz`                                                      | Muda mfupi sana wa kuisha unaochukulia event loop iliyo na shughuli kuwa imekufa |
| Kina / blackbox | `/api/monitoring/health`                                                 | —                                                                                |

`/healthz` huripoti mzunguko wa maisha wa mchakato (`ok` / `starting` / `stopping`). `/livez` ni
wa kuthibitisha tu kuwa mchakato uko hai (200 wakati wowote handler inapoweza kuendeshwa; haisubiri
utayari). Zote mbili bado huendeshwa kwenye event loop ileile ya Node inayoshughulikia maombi, kwa hivyo
kazi ya katalogi au ya kubana data inayotumia CPU sana inaweza kuzichelewesha — kuwa na shughuli ≠ kufa. Pendelea ukaguzi wa uhai
wa TCP ikiwa muda wa ukaguzi wa HTTP unaisha. Mwongozo kamili wa ukaguzi:
[Mwongozo wa ufuatiliaji — mapendekezo ya ukaguzi wa Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose pamoja na Caddy (HTTPS Auto-TLS)

OmniRoute inaweza kuwekwa wazi kwa usalama kwa kutumia utoaji wa SSL wa kiotomatiki wa Caddy. Hakikisha rekodi ya DNS A ya kikoa chako inaelekeza kwenye anwani ya IP ya seva yako.

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
      # Chanzo kinachoonekana na kivinjari kwa miito ya kurudi ya OAuth, viungo vya dashibodi, na URL za umma zinazozalishwa.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ya ndani kati ya seva kwa kazi zilizoratibiwa / maombi ya ndani.
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

Caddy huweka vichwa vya kawaida vya usambazaji kwa kontena la upstream. OmniRoute hutumia
`NEXT_PUBLIC_BASE_URL` kama chanzo rasmi cha umma kwa miito ya kurudi ya OAuth na viungo vya umma
vinavyozalishwa; shughuli za uandishi zilizothibitishwa kwenye dashibodi hutumia maombi ya same-origin pamoja na ulinzi wa CSRF
uliofungamanishwa na kipindi. Washa `OMNIROUTE_TRUST_PROXY` pekee kwa usanidi wa hali ya juu ambapo kwa makusudi
unataka OmniRoute ibaini chanzo cha umma kutoka kwenye vichwa vya usambazaji vinavyoaminika badala ya usanidi
ulioainishwa wazi.

## Cloudflare Quick Tunnel

Usaidizi wa dashibodi kwa usanidi wa Docker unajumuisha **Cloudflare Quick Tunnel** ya mbofyo mmoja kwenye `Dashboard → Endpoints`. Uwashaji wa kwanza hupakua `cloudflared` pale tu inapohitajika, huanzisha tunnel ya muda kwenda kwenye endpoint yako ya sasa ya `/v1`, na huonyesha URL ya `https://*.trycloudflare.com/v1` iliyozalishwa moja kwa moja chini ya URL yako ya kawaida ya umma.

Paneli za tunnel za endpoint (Cloudflare, Tailscale, ngrok) zinaweza kuonyeshwa au kufichwa kupitia `Settings → Appearance` bila kubadilisha hali ya tunnel inayotumika.

### Vidokezo vya Tunnel

- URL za Quick Tunnel ni za muda na hubadilika baada ya kila uanzishaji upya.
- Quick Tunnels hazirejeshwi kiotomatiki baada ya OmniRoute au kontena kuanzishwa upya. Ziwashe tena kupitia dashibodi zinapohitajika.
- Usakinishaji unaosimamiwa kwa sasa unaauni Linux, macOS, na Windows kwenye `x64` / `arm64`.
- Kwa chaguo-msingi, Quick Tunnels zinazosimamiwa hutumia usafirishaji wa HTTP/2 ili kuepuka maonyo mengi ya bafa ya QUIC UDP katika mazingira ya kontena yenye rasilimali chache. Weka `CLOUDFLARED_PROTOCOL=quic` au `auto` ikiwa unataka usafirishaji tofauti.
- Images za Docker hujumuisha mizizi ya CA ya mfumo na kuipitisha kwa `cloudflared` inayosimamiwa, jambo ambalo huepusha hitilafu za uaminifu wa TLS tunnel inapoanza ndani ya kontena.
- Weka `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ikiwa unataka OmniRoute itumie binary iliyopo badala ya kupakua mpya.

## Lebo za Image

| Image                    | Lebo     | Ukubwa | Maelezo                                                        |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer thabiti ya juu zaidi **iliyochapishwa** (si git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Bandika aina hii ya lebo kwa GitOps                            |

Manifest ya mifumo mingi: `linux/amd64` + `linux/arm64` asilia (Apple Silicon, AWS Graviton, Raspberry Pi). Docker huchagua usanifu unaolingana kiotomatiki; pitisha `--platform linux/amd64` ikiwa unahitaji kulazimisha uigaji wa AMD64 kwenye hosts za ARM.

### Channels za Toleo

OmniRoute huchapisha channels tofauti za Docker kwa matoleo thabiti, majaribio ya release-branch inayotumika, na builds za maendeleo.

| Channel                         | Chanzo                                         | Uwezo wa kubadilika                          | Matumizi yanayopendekezwa                                                                                                                |
| ------------------------------- | ---------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Toleo lililotiwa saini/lenye toleo             | Halibadiliki                                 | Usanidi wa uzalishaji unaobandika toleo mahususi                                                                                         |
| `:latest` / `:latest-web`       | SemVer thabiti ya juu zaidi **iliyochapishwa** | Kielekezi thabiti kinachobadilika            | Hufuata matoleo thabiti **baada** ya kazi ya kuchapisha SemVer — **haifuatilii** `main` wala commits za `release/v*` ambazo hazijatolewa |
| `:next` / `:next-web`           | Branch chaguo-msingi ya sasa ya `release/v*`   | Kielekezi cha kabla ya toleo kinachobadilika | Kujaribu marekebisho yaliyoingizwa kwenye branch ya toleo inayotumika lakini ambayo bado hayajajumuishwa katika toleo thabiti            |
| `:main` / `:main-web`           | Branch ya `main`                               | Kielekezi cha maendeleo kinachobadilika      | Kwa majaribio ya maendeleo na ujumuishaji pekee                                                                                          |

#### Kutumia channel ya kabla ya toleo

Channel ya `next` hujengwa upya kila msukumo unapofanywa kwenye branch chaguo-msingi ya sasa ya `release/v*`, na huchapishwa kwa AMD64 na ARM64. Branch za zamani za matengenezo haziwezi kuiandika upya. Channel hii hutoa image inayoweza kuvutwa kwa marekebisho ambayo yameunganishwa kwenye branch ya toleo inayotumika kabla ya lebo thabiti inayofuata kutolewa.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Kwa Docker Compose, badilisha lebo ya image inayotumiwa na profile iliyochaguliwa, kisha vuta na uunde upya huduma:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Usalama na urejeshaji

`next` ni channel inayobadilika ya kabla ya toleo. Inaweza kubadilika kwa kila msukumo kwenye branch ya toleo inayotumika na **haitumiki kwa matumizi ya uzalishaji**. Bandika digest ya image unapofanyia tathmini build mahususi:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kabla ya kufanya majaribio, hifadhi nakala rudufu ya volume ya data ya OmniRoute au saraka ya data iliyounganishwa kwa bind mount. Ili kurejesha toleo la awali, rejesha toleo thabiti au digest iliyotumika hapo awali na uunde upya kontena:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build ya tawi la toleo haiwezi kamwe kuhamisha `latest`; ni toleo thabiti linalostahiki la semantic version pekee linaloweza kuendeleza kielekezi thabiti. Image za `next` huhifadhi ukaguzi wa image ya toleo na kizuizi cha udhaifu wa kiwango cha CRITICAL.

**`latest` si hakikisho la usasishaji kwa git.** Marekebisho yaliyounganishwa kwenye `main` au kwenye tawi amilifu la `release/v*` **hayapo** katika `:latest` hadi image thabiti ya SemVer ichapishwe na job ya uchapishaji iendeleze `:latest` (digest sawa na SemVer hiyo). Ikiwa `latest` inaonekana kutobadilika huku GitHub tayari ikionyesha marekebisho, pull `:next` ili kujaribu tawi la toleo au subiri tag ya SemVer.

| Unachotaka                                                                     | Tumia                                 |
| ------------------------------------------------------------------------------ | ------------------------------------- |
| GitOps / uzalishaji ambao lazima usibadilike bila kudhibitiwa                  | Bandika `:X.Y.Z` (au digest ya image) |
| Fuata matoleo thabiti yaliyochapishwa na ukubali kuunda upya katika kila toleo | `:latest`                             |
| Jaribu commit ambazo hazijatolewa za `release/v*`                              | `:next` (si kwa uzalishaji)           |
| Jaribu `main`                                                                  | `:main` (si kwa uzalishaji)           |

## Upatikanaji: SQLite chaguomsingi ina nakala moja

OmniRoute ya kawaida ya Docker / Kubernetes ni **mchakato mmoja wa Node + mwandishi mmoja wa SQLite**. Upatikanaji wa juu **hautumiki** kwenye topolojia hiyo.

| Kizuizi                                                  | Matokeo                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mwandishi mmoja                                          | **Usiendeshe** nakala nyingi dhidi ya faili moja ya SQLite. Hilo huharibu DB.                                                                                                                                                                                                                                                                                    |
| Kuunda upya / kuwasha upya / kusimamishwa na HEALTHCHECK | **Huduma hukatika kabisa** kwa SSE zinazoendelea, vipindi vya dashibodi, na hali inayohifadhiwa kwenye kumbukumbu. Kila mteja aliyeunganishwa hukatika. Maombi mapya wakati hakuna endpoint hupokea **`502 Bad Gateway: Unknown error`** kutoka kwa reverse-proxy, si JSON ya OmniRoute — wateja hawawezi kutofautisha hili na hitilafu ya mtoa huduma (#11015). |
| Event loop sawa na `/healthz`                            | Mzunguko wa katalogi au ubanaji wenye shughuli nyingi unaweza kuchelewesha probe; muda mfupi wa kusubiri kisha huwasha upya nakala **pekee**.                                                                                                                                                                                                                    |

**Jedwali la probe** (tazama pia [mapendekezo ya probe za Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe           | Lengo                                                              | Usitumie                                                                        |
| --------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Liveness        | TCP kwenye `PORT` (chaguomsingi `20128`), au HTTP laini `/healthz` | `/api/monitoring/health`                                                        |
| Readiness       | HTTP `GET /healthz`                                                | Muda mfupi sana wa kusubiri unaochukulia event-loop yenye shughuli kuwa imekufa |
| Kina / binadamu | `/api/monitoring/health`                                           | Liveness ya kubelet iliyojiendesha                                              |

**Uboreshaji:** tarajia kila kipindi kukatika. Ondoa wateja taratibu ukiweza; hakuna rolling update kwenye SQLite chaguomsingi. Compose `restart: unless-stopped` pamoja na Docker `HEALTHCHECK` pia itabadilisha mchakato pekee wakati kontena likiwa Unhealthy — ikiwa na kiwango kilekile cha athari.

Kijisehemu cha Kubernetes kwa **nakala moja** (Recreate inahitajika; usiongeze `replicas` dhidi ya faili moja ya SQLite):

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

Kusubiri kwa `preStop` huipa kube muda wa kuondoa endpoint za Service kabla ya SIGTERM ili trafiki **mpya** isiendelee kufikia mchakato unaozimwa. SSE ya `/v1/responses` inayoendelea hupewa muda wa kukamilika hadi `SHUTDOWN_TIMEOUT_MS` (chaguomsingi sekunde 30) kupitia heavyweight admission leases (#11015). Maombi mapya ambayo bado yanafikia mchakato hupokea `503` + `Retry-After: 5`. Pengo la Recreate lisilo na endpoint hadi nakala mbadala iwe Ready bado ni kukatika kabisa kwa huduma — hiyo ni topolojia ya SQLite, si usanidi usio sahihi wa probe.

Postgres ya nje / HA ya waandishi wengi **si** njia ya kawaida iliyorekodiwa. Ikiwa unahitaji HA, tumia nakala moja au endesha topolojia ambayo mradi umeijaribu na kuiandika kando. Kazi ya Postgres/MySQL ipo katika [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hadi hiyo itolewe, njia pekee inayotumika ya kuongeza uwezo wa maombi **makubwa** ya `/v1/responses` ni michakato N inayojitegemea (sehemu inayofuata), si `replicas > 1` kwenye volume moja.

## Upanuzi mlalo: Michakato N inayojitegemea

Mchakato mmoja wa Node ni **heap moja ya V8**. Maombi mawili yanayopishana ya wakala wa uandishi wa msimbo ya takriban ~3 MiB / tokeni ~750k ya `POST /v1/responses` (RTK + Caveman) husimamisha heap hiyo inapofikia takriban ~12 Gi (`FATAL ERROR: Reached heap limit`) na yanaweza kusababisha OOM katika cgroup ya 16 Gi. Tazama [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Kipimo hicho ni onyo la **bajeti ya kumbukumbu**, si kikomo kamili cha bidhaa cha maombi mawili marefu ya `/v1/responses` yanayoendeshwa kwa wakati mmoja. Uidhinishaji wa maombi mazito ya gumzo unadhibitiwa na bajeti ya baiti za ingizo inayokokotolewa kiotomatiki (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) iliyowekwa kulingana na kikomo hicho hicho cha V8/cgroup — kuibadilisha iwe ya juu zaidi (au kuweka kikomo cha zamani cha idadi ya maombi cha `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) katika mchakato ambao tayari umepangiwa ukubwa hurejesha hitilafu hiyo. Gumzo ndogo, `/healthz`, `/v1/models`, na MCP **hazijumuishwi** katika kikomo hicho.

### Mchakato mmoja: zaidi ya maombi mawili marefu ya `/v1/responses`

Mchakato **wenye afya nzuri** (heap iliyo chini ya `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, chaguo-msingi `0.75`) **unaweza** kuendesha zaidi ya maombi mawili marefu ya `POST /v1/responses` kwa wakati mmoja ikiwa bajeti ya baiti za maombi yanayoendelea katika mchakato mzima (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) bado ina nafasi. Miili yenye ukubwa sawa na au zaidi ya `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (chaguo-msingi 256 KiB) hupata nafasi ileile ya mzigo mzito kama maombi yenye miundo mizito na hutumia njia ileile ya kuepuka kizuizi ya [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Makumi ya viteja vya muda mrefu vya SSE vinavyoendeshwa kwa wakati mmoja (waendeshaji mara nyingi huhitaji 40–50) ni suala la **bajeti ya kumbukumbu** — panga ukubwa wa heap + nafasi za msingi/akiba + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — si kikomo kamili cha bidhaa cha “upeo wa 2”. Heap iliyo chini ya shinikizo bado hupunguza mzigo kwa jibu la `503` linaloweza kujaribiwa tena ili tatizo la #7849 lisirudi.

Ili **kuzidisha heap** (nafasi za zamani za V8 zinazojitegemea) **leo**:

| Fanya                                                                                                                                                                                        | Usifanye                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Endesha **kontena/pod N**, kila moja ikiwa na `DATA_DIR` / volume yake **binafsi**                                                                                                           | Weka `replicas > 1` kwa faili moja ya SQLite                            |
| Panga ukubwa wa maombi mazito yanayoendelea + akiba ya hali nzuri kulingana na bajeti ya heap / baiti zinazoendelea; 1–2 ni chaguo-msingi la tahadhari la #7849, si kikomo kamili cha bidhaa | Kuupa mchakato mmoja RAM mara 8 na kikomo kisicho na ukomo cha idadi    |
| Hiari: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` kwa **vihesabu vya mgao vinavyoshirikiwa**                                                                                       | Kuchukulia Redis kama SQLite inayoshirikiwa — sivyo ilivyo              |
| Nakili siri za watoa huduma katika kila instansi (au ukubali dashibodi zilizogawanywa)                                                                                                       | Kutarajia dashibodi moja / kumbukumbu moja ya simu katika instansi zote |
| Weka kisawazisha mzigo chochote mbele; uelekezaji thabiti kwa ufunguo wa API au kipindi unatosha                                                                                             | Kuhitaji middleware maalumu ya mtoa huduma inayozingatia ukubwa         |

Maunzi: idadi ya maombi marefu ya `/v1/responses` yanayoendeshwa kwa wakati mmoja katika kila instansi ni suala la **bajeti ya kumbukumbu** (heap + baiti zinazoendelea / #10110). `DATA_DIR` N zinazojitegemea bado huzidisha heap: RAM ya host lazima itosheleze `N × cgroup`, si “pod moja ya 16 Gi yenye N=8.” Kamwe usitumie `replicas > 1` kwenye faili moja ya SQLite.

Mfano wa Compose (heap mbili, volume mbili — si `deploy.replicas: 2`):

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

Msongamano ndani ya mchakato (mgandamizo nje ya isolate ya HTTP) ni [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster moja ya kimantiki kwenye hali endelevu inayoshirikiwa ni [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Vidokezo Muhimu

- **Hali ya SQLite WAL:** `docker stop` inapaswa kuruhusiwa kukamilika ili OmniRoute iweze kuhifadhi mabadiliko ya hivi karibuni kutoka WAL kurudi kwenye `storage.sqlite`. Faili za Compose zilizojumuishwa tayari zimeweka muda wa kusubiri wa sekunde 40 kabla ya kusimamisha. Ikiwa unaendesha image moja kwa moja, tumia `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Weka kuwa `true` ikiwa nakala rudufu za kawaida/kabla ya uandishi zinadhibitiwa nje ya mfumo. Uhamishaji wa hifadhidata iliyopo bado unahitaji nakala yake endelevu ya usalama na ulinzi dhidi ya uhamishaji wa data kwa wingi.
- **Udumishaji wa Data:** Daima ambatisha volume kwenye `/app/data` ili kuhifadhi hifadhidata, funguo na usanidi wako baada ya kontena kuanzishwa upya.
- **Usanidi wa Porti:** Batilisha kigezo cha mazingira cha `PORT` ili kubadilisha porti chaguomsingi ya `20128`.

## Angalia Pia

- [Mwongozo wa Usambazaji kwenye VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Usanidi wa VM + nginx + Cloudflare
- [Mwongozo wa Usambazaji kwenye Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Sambaza kwenye Fly.io
- [Usanidi wa Mazingira](../reference/ENVIRONMENT.md) — Rejea kamili ya `.env`
