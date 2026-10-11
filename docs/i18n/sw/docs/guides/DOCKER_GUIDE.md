# 🐳 Docker Guide — OmniRoute (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Marejeleo kamili ya usambazaji wa Docker. Kwa kuanza haraka, angalia [sehemu ya Docker katika README](../README.md#-docker).

## Yaliyomo

- [Uendeshaji wa Haraka](#quick-run)
- [Kwa Kutumia Faili ya Mazingira](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Wasifu Unaopatikana](#available-profiles)
- [Kusanidi zana za CLI za host wakati OmniRoute inaendeshwa kwenye Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose ya Uzalishaji](#production-compose)
- [Hatua za Dockerfile](#dockerfile-stages)
- [Vigeu Muhimu vya Mazingira](#critical-environment-variables)
- [Docker Compose yenye Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Tagi za Image](#image-tags)
- [Upatikanaji: SQLite chaguo-msingi hutumia replica moja](#availability-default-sqlite-is-single-replica)
- [Hitilafu za kikanda za Gemini ndani ya Docker](#gemini-regional-errors-inside-docker)
- [Vidokezo Muhimu](#important-notes)

---

## Uendeshaji wa Haraka

> **Unataka kujihosti kwa amri moja?** Angalia
> [Mwongozo wa Kujihosti](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image iliyochapishwa +
> Redis, loopback pekee, bila kuchagua wasifu). Uendeshaji wa Haraka hapa chini ni
> njia ya container moja kwa watumiaji ambao tayari wanaendesha Redis mahali pengine.

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

# Wasifu wa host (Linux kwanza; huambatisha binary za CLI za host katika hali ya kusoma pekee)
docker compose --profile host up -d

# Wasifu wa wavuti (Chromium/Playwright kwa watoa huduma wa vipindi vya wavuti)
docker compose --profile web up -d

# Unganisha CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Wasifu Unaopatikana

OmniRoute huja na wasifu wa Compose kwa miundo mikuu ya usambazaji. Chagua unaolingana na mazingira yako.

| Wasifu                 | Huduma           | Wakati wa kutumia                                                                                                                                                        | Amri                                         |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (chaguo-msingi) | `omniroute-base` | Seva isiyo na kiolesura / mazingira ya utekelezaji ya kiwango cha chini, bila CLI za watoa huduma zilizojumuishwa                                                        | `docker compose --profile base up -d`        |
| `cli`                  | `omniroute-cli`  | Mitiririko ya kazi ya kiwakala inayoita `omniroute providers/setup/doctor` na CLI zilizojumuishwa (Codex, Claude Code, Droid, OpenClaw)                                  | `docker compose --profile cli up -d`         |
| `host`                 | `omniroute-host` | Host za Linux zinazotaka ufikiaji unaofanana na `network_mode` kwa CLI za host kwa kuambatisha `~/.local/bin`, `~/.codex`, `~/.claude`, n.k. katika hali ya kusoma pekee | `docker compose --profile host up -d`        |
| `cliproxyapi`          | `cliproxyapi`    | Endesha [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar kwenye port `8317` kwa uelekezaji wa proksi ya CLI ya upstream                               | `docker compose --profile cliproxyapi up -d` |
| `web`                  | `omniroute-web`  | Watoa huduma wa vipindi vya wavuti wanaohitaji kivinjari: `gemini-web`, `claude-web`, `claude-turnstile` (hujenga `runner-web`, Chromium imejumuishwa)                   | `docker compose --profile web up -d`         |

> Wasifu kadhaa unaweza kuunganishwa: `docker compose --profile cli --profile cliproxyapi up -d`.

## Kusanidi zana za CLI za mfumo mwenyeji wakati OmniRoute inaendeshwa kwenye Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` na kitufe cha dashibodi cha
**Hifadhi usanidi** zote huandika faili kama `~/.codex/*.config.toml`. Njia hizo
zina maana tu kwenye mashine ambako CLI inaendeshwa. Ukiziendesha ndani ya
kontena, faili huandikwa kwenye saraka ya nyumbani ya kontena (`/home/node` —
taswira huendeshwa kwa `USER node`), ambako hakuna CLI ya mfumo mwenyeji itakayowahi
kuzisoma na ambako hutupiliwa mbali mara tu kontena linapoundwa upya.

OmniRoute hutambua hali hii na hukataa kuandika, huku ikitoa maagizo badala ya
kuripoti mafanikio ambayo huwezi kutumia: CLI hutoka kwa msimbo `2`, na API hujibu `422`
ikiwa na `containerEphemeralTarget: true`.

### Inapendekezwa: endesha CLI kwenye mfumo mwenyeji, OmniRoute kwenye Docker

Kontena hutoa API; CLI husanidi zana zako za mfumo mwenyeji.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # elekeza CLI kwenye kontena
omniroute setup-codex                      # huandika ~/.codex halisi kwenye mfumo wako mwenyeji
```

Hili ndilo chaguo sahihi wakati Codex, Claude Code, Cursor au zana zinazofanana
zinaendeshwa kwenye kompyuta yako mpakato — ambao ndio usanidi wa kawaida.

### Mbadala: unganisha saraka za usanidi za mfumo mwenyeji kwa bind mount (wasifu wa `host`)

Ikiwa unataka kontena lenyewe liandike usanidi wa mfumo wako mwenyeji, unganisha
saraka hizo na uelekeze `CLI_CONFIG_HOME` kwenye mzizi wa sehemu iliyounganishwa. Wasifu wa `host`
tayari hufanya hivi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ndiyo hufanya njia hiyo iaminike: OmniRoute husoma
`/proc/self/mountinfo` na huruhusu uandishi kwenye njia zilizounganishwa (na kwenye saraka
ambazo saraka zake za ndani ni sehemu zilizounganishwa, hali ambayo inalingana kabisa na muundo wa `/host-home` hapo juu), huku
bado ikikataa zile ambazo hazijaunganishwa.

### Njia ya dharura: sanidi CLI za kontena lenyewe (tumia kwa tahadhari)

Wakati CLI kwa hakika zipo ndani ya kontena (wasifu wa `cli`), uandishi huo
unafanywa kimakusudi. Tumia `--allow-container-write` kwa amri yoyote ya `setup-*`, au weka
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` kwa seva. Uandishi utaendelea
ukiwa na onyo kwamba hautadumu baada ya kontena kuondolewa.

> **Onyo la usalama — wasifu wa `cli` + uunganishaji wa `docker.sock`.**
> Wasifu wa `cli` huunganisha `/var/run/docker.sock` kwa bind mount ili kisasishaji
> cha kiotomatiki kilicho ndani ya kontena kiweze kuunda upya stack kupitia daemon ya mfumo mwenyeji
> (`src/lib/system/autoUpdate.ts` hukagua uwepo wa socket hiyo na kuruka
> njia ya Docker inapokosekana). Socket hiyo ni **mpaka wa uaminifu wa root wa
> mfumo mwenyeji**: chochote kinachoweza kuifikia hudhibiti daemon ya Docker ya mfumo mwenyeji kama
> root — kinaweza kuunda, kukagua, kusimamisha na kuondoa kontena lolote kwenye mfumo mwenyeji.
> Athari zake:
>
> 1. **Usiwahi kufichua port ya wasifu wa `cli` kwenye mtandao.** Ichapishe
>    kwenye `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — wasifu wa `cli` unaofikika kupitia LAN hubadilisha RCE yoyote ya kiwango cha
>    dashibodi kuwa udukuzi kamili wa mfumo mwenyeji.
> 2. **Usiunganishe saraka nyingine zozote za mfumo mwenyeji kwenye wasifu wa `cli`.**
>    Socket ya Docker pamoja na mount nyingine yoyote huipa kontena uwezo kamili wa
>    kusoma/kuandika mfumo wako wa faili na usanidi wa mfumo mwenyeji. Ikiwa unahitaji zana
>    kuona mradi, iendeshe ndani ya mfumo wako kwa kutumia faili tekelezi ya CLI — usiiunganishe
>    kwenye kontena la `cli`.
>
> Ikiwa huhitaji usasishaji wa kiotomatiki ndani ya kontena, usiwashe wasifu wa `cli`
> (`COMPOSE_PROFILES=core,redis` au mfupi zaidi). Wasifu mwingine hauunganishi
> socket ya Docker.
>
> Angalia `docs/security/MITM-TPROXY-DECRYPT.md` (git; haijakusanywa ndani ya `/docs`) kwa modeli ya vitisho inayohusiana
> na MITM, na `docs/security/SUPPLY_CHAIN.md` kwa
> mnyororo wa asili ya faili tekelezi za `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute hutegemea Redis kuendesha kikomo cha kasi kilichosambazwa na akiba inayoshirikiwa. Huduma ya `redis` **hufafanuliwa kila wakati** katika `docker-compose.yml` (haina kizuizi cha wasifu) na huanza pamoja na wasifu mwingine wowote.

| Maelezo                      | Thamani                                          |
| ---------------------------- | ------------------------------------------------ |
| Image                        | `redis:7-alpine`                                 |
| Jina la container            | `omniroute-redis`                                |
| Porti ya ndani               | `6379`                                           |
| Porti ya host (kubatilisha)  | `REDIS_PORT` (chaguo-msingi ni `6379`)           |
| Anwani ya host (kubatilisha) | `REDIS_BIND_HOST` (chaguo-msingi ni `127.0.0.1`) |
| Volume                       | `omniroute-redis-data` → `/data`                 |
| Ukaguzi wa afya              | `redis-cli ping` (kipindi cha sekunde 10)        |

Vigeu vya mazingira vinavyohusiana:

- `REDIS_URL` — mfuatano wa muunganisho unaoingizwa kwenye programu (`redis://redis:6379` kwa chaguo-msingi).
- `REDIS_PORT` — upangaji wa porti ya upande wa host kwa container ya Redis.
- `REDIS_BIND_HOST` — kiolesura cha host ambacho porti huchapishwa juu yake. Chaguo-msingi ni `127.0.0.1`.

> **Kwa nini loopback hutumika kwa chaguo-msingi:** sidecar huendeshwa bila `requirepass`, na container za programu
> huifikia kupitia mtandao wa compose (`redis:6379`) — porti iliyochapishwa ipo
> tu kwa ajili ya zana za upande wa host (`redis-cli`, `npm run dev` ya ndani). Kuchapisha kwenye
> `0.0.0.0` kungefanya Redis isiyo na uthibitishaji ipatikane kwa kila host kwenye LAN yako. Ukiweka
> `REDIS_BIND_HOST=0.0.0.0`, ongeza pia `--requirepass` kwenye `command:` ya huduma.

**Kuzima Redis** hakupendekezwi (kikomo cha kasi kitashuka hadi kutumia mbadala wa kumbukumbu ya ndani). Ikiwa ni lazima, ama ondoa/toa maoni kwenye sehemu ya huduma ya `redis:` katika `docker-compose.yml` au ipunguze hadi sifuri:

```bash
docker compose up -d --scale redis=0
```

## Compose ya Uzalishaji

Kwa snapshot iliyotengwa ya uzalishaji inayoendeshwa sambamba na mazingira ya ukuzaji, tumia `docker-compose.prod.yml`.

| Maelezo                          | Thamani                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| Faili                            | `docker-compose.prod.yml`                                                                 |
| Porti chaguo-msingi ya dashibodi | `PROD_DASHBOARD_PORT=20130` (imepangwa kwenda kwenye `${DASHBOARD_PORT:-20128}` ya ndani) |
| Porti chaguo-msingi ya API       | `PROD_API_PORT=20131`                                                                     |
| Image                            | `omniroute:prod` (imeundwa kutoka kwenye target ya `runner-cli`)                          |
| Container ya Redis               | `omniroute-redis-prod` (`redis:8.6.2`, volume mahususi ya `redis-prod-data`)              |
| Volume ya data                   | `omniroute-prod-data` (iliyopewa jina, huhifadhiwa baada ya uundaji upya)                 |
| Ukaguzi wa afya                  | `node healthcheck.mjs` + `redis-cli ping`, huku `depends_on` ikitegemea afya ya Redis     |

Jinsi ya kutumia:

```bash
# Unda na uanzishe stack ya uzalishaji
docker compose -f docker-compose.prod.yml up -d --build

# Tiririsha kumbukumbu
docker compose -f docker-compose.prod.yml logs -f

# Zima stack (hifadhi volume)
docker compose -f docker-compose.prod.yml down
```

Stack ya uzalishaji huendeshwa sambamba na compose ya ukuzaji (ikiwa na majina tofauti ya container, porti na volume), hivyo unaweza kuendelea kufanya maboresho ndani ya mazingira yako huku uzalishaji ukiendelea kufanya kazi.

## Hatua za Dockerfile

Hazina hii inakuja na Dockerfile ya hatua nyingi (`Dockerfile`). Hatua nne zinapatikana; chagua `target` inayofaa kwa matumizi yako.

| Hatua         | Taswira ya msingi     | Madhumuni                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Husakinisha vitegemezi (`npm ci --legacy-peer-deps`) na huendesha `npm run build` (Turbopack kwa chaguo-msingi — angalia Rasilimali za wakati wa uundaji hapa chini)                                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Mazingira ya uzalishaji yenye towe huru la Next.js. **Hakuna CLI za watoa huduma zilizojumuishwa.**                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | Huongeza `git`, `docker.io`, `docker-compose` na CLI za kimataifa: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Chagua hii kwa mitiririko ya kazi ya mawakala.**                                                                                                                    |
| `runner-web`  | `runner-base`         | Huongeza Playwright + kivinjari cha Chromium (`--with-deps`) kwa watoa huduma wa vipindi vya wavuti: `gemini-web`, `claude-web`, `claude-turnstile`. **Chagua hii unapotumia watoa huduma hao** — taswira ya kawaida hushindwa wakati wa ombi bila hiyo (angalia dokezo la `-web` chini ya Njia za Utoaji). |

Unda lengo mahususi mwenyewe:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Rasilimali za wakati wa uundaji

Hoja tatu za uundaji hudhibiti gharama ya hatua ya `builder`. Zinatumika wakati wa uundaji pekee —
`OMNIROUTE_MEMORY_MB` (hapa chini) ni kidhibiti tofauti cha wakati wa utekelezaji.

| Hoja ya uundaji             | Chaguo-msingi | Athari                                                                                                                   |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`           | `0` huunda kwa webpack: matumizi ya kilele ya kumbukumbu ni ya chini, lakini ni polepole zaidi. `1` huwezesha Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | Kikomo cha lundo la V8 (`--max-old-space-size`) kwa `next build` inayoanzishwa.                                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Hutoa thamani kwa `CIRCLE_NODE_TOTAL`; Next hukokotoa `workers = N - 1` kwa ukusanyaji wa data za kurasa.                |

`OMNIROUTE_BUILD_WORKERS` ndiyo ya kuongeza kwenye mazingira makubwa ya uundaji na ndiyo ya
kutilia shaka wakati uundaji wenye rasilimali finyu unapokufa **baada ya** `✓ Compiled successfully`. Kila
mchakato-kazi wa data za kurasa ni mchakato wake binafsi, kama ilivyo kwa mchakato mkuu wa `next build`;
jaribio halisi kwenye VPS (suala #7518) lilipima kilele cha RSS cha kila mchakato kuwa
~4.5 GB bila kutegemea alama ya lundo ya `NODE_OPTIONS` (Turbopack hukusanya katika
kumbukumbu asilia/Rust nje ya lundo la V8). Chaguo-msingi la `2` (→ mchakato-kazi 1, jumla ya
michakato 2) limekadiriwa kwa viendeshaji vinavyopangishwa na GitHub vyenye GB 16 / vCPU 4 ambavyo
mchakato wa uchapishaji hutumia. Ikiwa `8` (→ michakato-kazi 7), kiendeshaji hicho kilikosa kumbukumbu na
buildkit ikashindwa kutekeleza hatua kwa `ResourceExhausted: ... cannot allocate memory`;
`3` (→ michakato-kazi 2) bado haikutoshea baada ya RSS ya kila mchakato kupimwa
moja kwa moja badala ya kukadiriwa. `tests/unit/docker-build-memory-budget.test.ts`
hufanya hesabu kwa kutumia thamani iliyopimwa na hushindwa ikiwa kidhibiti chochote
kinazidi uwezo wa kiendeshaji.

Turbopack hukusanya katika kumbukumbu asilia ya Rust ambayo iko **nje** ya lundo la V8, kwa hivyo
`OMNIROUTE_BUILD_MEMORY_MB` haiwekei kikomo. Kwenye seva yenye kikomo cha kumbukumbu,
uundaji huuawa kwa SIGKILL na OOM killer bila maandishi yoyote ya hitilafu — husimama tu
katikati ya `Creating an optimized production build`, jambo linaloonekana kama kukwama badala
ya kuishiwa na kumbukumbu. Ndiyo maana `Dockerfile` hutumia webpack kwa chaguo-msingi
(`OMNIROUTE_USE_TURBOPACK=0`), tofauti na `npm run dev` / `npm run build`, ambapo
Turbopack ndiyo chaguo-msingi la msimbo: `docker build .` ya kawaida bila hoja za uundaji (ambayo
Railway na huduma nyingine za kubofya mara moja huendesha) haipaswi kufa kimya kwenye
mazingira ya uundaji yenye kikomo cha kumbukumbu. Taswira zilizochapishwa tayari hupitisha
`OMNIROUTE_USE_TURBOPACK=0` waziwazi katika `docker-publish.yml`. Kwenye mazingira ya uundaji yenye
RAM nyingi, wezesha Turbopack ili kuunda kwa haraka zaidi:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` imewezeshwa, kwa hivyo `next build` huendesha mchakato mkuu **na** mchakato-kazi,
na kila mmoja hutii `OMNIROUTE_BUILD_MEMORY_MB` kivyake. Weka kikomo cha kontena
juu ya takribani mara mbili ya thamani hiyo, si mara moja.

Vipimo kwenye mti huu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Kifungashaji | Kikomo cha kontena | Matokeo                                         |
| ------------ | ------------------ | ----------------------------------------------- |
| Turbopack    | 8 GiB / 16 GiB     | Iliuawa na OOM katika vyote viwili, kimya kimya |
| webpack      | 8 GiB              | mchakato-kazi wa uundaji uliuawa kwa SIGKILL    |
| webpack      | 12 GiB             | ilifaulu, kilele kilikuwa 11.1 GiB              |

### Chaguo-msingi za wakati wa utekelezaji

Chaguo-msingi zinazosafirishwa na `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Tabia ya kumbukumbu katika Docker:

- Image huweka `OMNIROUTE_MEMORY_MB=1024` na huzalisha `NODE_OPTIONS=--max-old-space-size=1024` kutokana nayo.
- Mchakato halisi wa seva huanzishwa na kizinduzi cha standalone, ambacho husoma `OMNIROUTE_MEMORY_MB` na kuongeza `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node hutumia thamani ya mwisho iliyorudiwa ya `--max-old-space-size`, kwa hivyo kuweka `OMNIROUTE_MEMORY_MB` hudhibiti kikomo halisi cha heap cha Docker.
- Kwa sababu image huiweka kila wakati, thamani mbadala ya kizinduzi iliyosawazishwa kulingana na RAM haitumiki kamwe chini ya Docker. Iongeze waziwazi kulingana na mzigo wa kazi (jedwali hapa chini). `2048` bado ni ndogo mno kwa `/v1/responses` za wakala wa uandishi wa msimbo.

### RAM ya wakati wa utekelezaji kwa mawakala wa uandishi wa msimbo

Chaguo-msingi la Docker la GiB 1 ni kiwango cha chini kwa dashibodi/mazungumzo mepesi, si ukubwa wa matumizi ya uzalishaji. Miili mirefu ya `POST /v1/responses` (mamia ya ujumbe, makumi ya zana) huhifadhi grafu nyingi kwenye kumbukumbu wakati wa mfinyazo. Maombi mawili yanayopishana ya takriban MiB 3 / tokeni 750k yamesababisha V8 kusitishwa ikiwa na old-space ya **GiB 12** (`FATAL ERROR: Reached heap limit`) na pia yakasababisha OOM ya cgroup ya GiB 16. Tazama [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Weka ukubwa wa **cgroup `--memory` juu ya heap** — bafa asilia, SQLite, na data za kati za mfinyazo hukaa nje ya V8.

| Mzigo wa kazi                                          | `OMNIROUTE_MEMORY_MB`                | Kontena / cgroup               | Maelezo                                                                                                                |
| ------------------------------------------------------ | ------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Dashibodi, mazungumzo moja mepesi                      | `1024` (chaguo-msingi la image)      | ≥2 GiB                         |                                                                                                                        |
| Wakala mmoja wa uandishi wa msimbo (Claude/Codex/Grok) | `8192`                               | ≥10 GiB                        | Kipindi kimoja cha kawaida cha `/v1/responses`                                                                         |
| `/v1/responses` mbili ndefu kwa wakati mmoja           | `10240`–`12288`                      | ≥12–16 GiB                     | Kusitishwa kwa V8 kulikopimwa kwenye heap ya takriban GiB 12                                                           |
| Miktadha mitatu au zaidi mirefu kwa wakati mmoja       | usifanye hivyo katika mchakato mmoja | panga kwa mfuatano / RAM zaidi | Chaguo-msingi la uingizaji wa kazi nzito ni ombi 1 linaloshughulikiwa; kuliongeza bila RAM husababisha kusitishwa tena |

`omniroute serve` kwenye bare metal husawazisha takriban 35% ya RAM (ikiwa imewekewa mipaka ya `[512, 4096]`) wakati `OMNIROUTE_MEMORY_MB` **haijawekwa**. Docker huweka `1024` kila wakati, kwa hivyo usawazishaji huo haufanyiki kamwe katika image rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Vigeu Muhimu vya Mazingira

Zaidi ya chaguomsingi yaliyoandikwa katika [ENVIRONMENT.md](../reference/ENVIRONMENT.md), vigeu vifuatavyo ni muhimu zaidi wakati wa kuendesha chini ya Docker:

| Kigeu                         | Madhumuni                                                                                                                                                                                                                                                                                               | Chaguomsingi                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Siri inayoshirikiwa kwa daraja la WebSocket. **Inahitajika katika mazingira ya uzalishaji** — iweke kuwa mfuatano thabiti wa nasibu.                                                                                                                                                                    | haijawekwa (lazima itolewe) |
| `REDIS_URL`                   | Mfuatano wa muunganisho wa kidhibiti cha kiwango / mfumo wa nyuma wa akiba                                                                                                                                                                                                                              | `redis://redis:6379`        |
| `REDIS_PORT`                  | Mlango wa upande wa seva mwenyeji kwa kontena la Redis lililojumuishwa                                                                                                                                                                                                                                  | `6379`                      |
| `REDIS_BIND_HOST`             | Kiolesura cha seva mwenyeji ambacho mlango wa Redis uliojumuishwa unachapishwa (loopback isipokuwa uongeze AUTH)                                                                                                                                                                                        | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Njia ya seva mwenyeji iliyopachikwa katika wasifu wa `cli` kwenye `/workspace/omniroute` kwa mtiririko wa kazi wa kujisasisha                                                                                                                                                                           | `.` (saraka ya sasa)        |
| `OMNIROUTE_MEMORY_MB`         | Kikomo cha heap ya Node wakati wa utekelezaji kwa seva ya Docker inayojitegemea; hubatilisha chaguomsingi la image lililo hapo juu. Mawakala wa kuandika msimbo: `8192`+ (angalia [RAM ya wakati wa utekelezaji](#runtime-ram-for-coding-agents)).                                                      | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Hubatilisha milango iliyofichuliwa ya dashibodi (20128) na API (20129)                                                                                                                                                                                                                                  | `20128` / `20129`           |
| `APP_BIND_HOST`               | Kiolesura cha seva mwenyeji ambacho docker-compose huchapisha milango ya dashibodi/API/live-WS. Ikiwa `REQUIRE_API_KEY=false` (chaguomsingi), `0.0.0.0` hufichua proksi ya `/v1` isiyohitaji uthibitishaji kwa LAN — panua ufikiaji tu ukiwa na `REQUIRE_API_KEY=true` au proksi ya kinyume mbele yake. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Kiolesura cha seva mwenyeji ambacho docker-compose huchapisha sidecar ya `cliproxyapi` — ujazo wake wa data huhifadhi vitambulisho vya watoa huduma.                                                                                                                                                    | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Saraka ambayo kichanganuzi cha programu-jalizi cha wakati wa utekelezaji husoma na kusakinisha programu-jalizi ndani yake. Iweke programu-jalizi zinapopachikwa kwa bind: chaguomsingi hufuata `HOME`, ambayo image si lazima i-export.                                                                 | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | Njia ndogo ya URL wakati programu inachapishwa nyuma ya proksi ya kinyume (kwa mfano `/omniroute`)                                                                                                                                                                                                      | _(tupu = mzizi)_            |
| `NEXT_PUBLIC_BASE_URL`        | Asili ya umma ya kivinjari ikijumuisha njia ndogo (kwa mfano `https://host/omniroute`)                                                                                                                                                                                                                  | haijawekwa                  |
| `PROD_DASHBOARD_PORT`         | Mlango wa dashibodi wa upande wa seva mwenyeji kwa `docker-compose.prod.yml`                                                                                                                                                                                                                            | `20130`                     |
| `CLIPROXYAPI_PORT`            | Mlango wa upande wa seva mwenyeji kwa sidecar ya `cliproxyapi`                                                                                                                                                                                                                                          | `8317`                      |

## Proksi ya Nyuma kwenye Njia Ndogo (Traefik / nginx)

`basePath` ya Next.js hukusanywa ndani ya kifurushi kinachojitegemea. OmniRoute hurekodi
thamani iliyopachikwa kwenye faili ya kiashiria katika mzizi wa programu (huandikwa wakati wa `npm run build`; husomwa na
`scripts/docker/ensure-docker-base-path.mjs`) na kuilinganisha na
`OMNIROUTE_BASE_PATH` kontena linapoanza. Zinapotofautiana na taswira
iliundwa kwa ajili ya mzizi wa kikoa, sehemu ya kuingilia huandika upya manifesti zinazojitegemea, thamani halisi za
`basePath`/`assetPrefix` zilizopachikwa (Next 16 huunda URL za rasilimali za SSR kutoka
`assetPrefix` pekee — kiraka huakisi njia ndogo ndani yake), URL za rasilimali za
`/_next/static` zilizopachikwa (manifesti za marejeleo ya mteja, uingizaji wa midia, kurasa za hitilafu
zilizoundwa mapema) na kibadala cha `process.env` cha mteja kabla ya `node dev/run-standalone.mjs`
kuendeshwa.

### Uundaji kwa Compose (unapendekezwa)

Weka vigeu vyote viwili katika `.env`, kisha unda upya ili taswira na mazingira ya utekelezaji vilingane:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` hupitisha `OMNIROUTE_BASE_PATH` kama hoja ya uundaji ya Docker na kama
kigeu cha mazingira cha wakati wa utekelezaji.

### Taswira ya mzizi iliyoundwa mapema + njia ndogo ya wakati wa utekelezaji

Taswira zilizochapishwa za `diegosouzapw/omniroute:*` zimeundwa kwa ajili ya mzizi wa kikoa. Bado unaweza
kuweka `OMNIROUTE_BASE_PATH` wakati wa utekelezaji; kontena huweka kiraka kwenye kifurushi mara moja wakati wa kuanza.
Iunganishe na asili inayolingana ya umma:

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
uchunguzi wa binadamu/dashibodi; ili kuelekeza HEALTHCHECK ya kontena tena kwake (kwa mfano
kwa utekelezaji wa ukaguzi wa kina wa afya), weka `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Njia hiyo ni ukaguzi **wa kina** (DB + muhtasari wa ufuatiliaji) — unafaa kwa
`HEALTHCHECK` isiyofanyika mara kwa mara ya Docker ukiamua kuitumia tena, lakini **haifai** kwa vipindi vya
`livenessProbe` vya Kubernetes.

Kwa vipangaji (Kubernetes, Nomad, n.k.):

| Uchunguzi       | Pendelea                                                                   | Epuka                                                                                   |
| --------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Uhai            | HTTP `GET /livez`, au TCP kwenye porti kuu (`PORT`, chaguo-msingi `20128`) | `/api/monitoring/health` kama ukaguzi wa uhai                                           |
| Utayari         | HTTP `GET /healthz`                                                        | Muda mfupi wa kuisha unaochukulia kitanzi cha matukio kilicho na shughuli kuwa kimekufa |
| Kina / blackbox | `/api/monitoring/health`                                                   | —                                                                                       |

`/healthz` huripoti mzunguko wa maisha wa mchakato (`ok` / `starting` / `stopping`). `/livez` ni
ya kuthibitisha tu kuwa mchakato uko hai (200 kila wakati kishughulikiaji kinapoweza kufanya kazi; haisubiri
utayari). Zote mbili bado huendeshwa kwenye kitanzi kilekile cha matukio cha Node kinachoshughulikia maombi, hivyo
kazi ya katalogi au ubanaji inayotumia sana CPU inaweza kuzichelewesha — kuwa na shughuli ≠ kufa. Pendelea ukaguzi wa uhai wa
TCP ikiwa muda wa ukaguzi wa HTTP unaisha. Mwongozo kamili wa uchunguzi:
[Mwongozo wa ufuatiliaji — mapendekezo ya uchunguzi wa Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose pamoja na Caddy (HTTPS Auto-TLS)

OmniRoute inaweza kuwekwa wazi kwa usalama kwa kutumia utoaji wa SSL wa kiotomatiki wa Caddy. Hakikisha rekodi ya DNS A ya kikoa chako inaelekezwa kwenye IP ya seva yako.

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
      # Chanzo kinachoonekana na kivinjari kwa miito ya kurejea ya OAuth, viungo vya dashibodi, na URL za umma zinazozalishwa.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ya ndani kati ya seva kwa kazi zilizoratibiwa / maombi yanayojielekeza yenyewe.
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
`NEXT_PUBLIC_BASE_URL` kama chanzo rasmi cha umma kwa miito ya kurejea ya OAuth na viungo vya umma
vinavyozalishwa; uandishi wa dashibodi uliothibitishwa hutumia maombi ya chanzo kilekile pamoja na ulinzi wa CSRF
uliofungamanishwa na kipindi. Washa `OMNIROUTE_TRUST_PROXY` pekee kwa usanidi wa hali ya juu ambapo kwa makusudi
unataka OmniRoute ibaini chanzo cha umma kutoka kwa vichwa vinavyoaminika vilivyosambazwa badala ya usanidi
ulioainishwa waziwazi.

## Handaki la Haraka la Cloudflare

Usaidizi wa dashibodi kwa usambazaji wa Docker unajumuisha **Cloudflare Quick Tunnel** ya mbofyo mmoja kwenye `Dashboard → Endpoints`. Uwashaji wa kwanza hupakua `cloudflared` pale tu inapohitajika, huanzisha handaki la muda kuelekea endpoint yako ya sasa ya `/v1`, na huonyesha URL iliyozalishwa ya `https://*.trycloudflare.com/v1` moja kwa moja chini ya URL yako ya kawaida ya umma.

Paneli za handaki za endpoint (Cloudflare, Tailscale, ngrok) zinaweza kuonyeshwa au kufichwa kutoka `Settings → Appearance` bila kubadilisha hali ya handaki linalotumika.

### Maelezo ya Handaki

- URL za Quick Tunnel ni za muda na hubadilika baada ya kila uanzishaji upya.
- Quick Tunnels hazirejeshwi kiotomatiki baada ya OmniRoute au kontena kuanzishwa upya. Ziwashe tena kutoka kwenye dashibodi inapohitajika.
- Usakinishaji unaodhibitiwa kwa sasa unaauni Linux, macOS, na Windows kwenye `x64` / `arm64`.
- Managed Quick Tunnels hutumia usafirishaji wa HTTP/2 kwa chaguo-msingi ili kuepuka maonyo mengi ya bafa ya QUIC UDP katika mazingira ya kontena yenye rasilimali finyu. Weka `CLOUDFLARED_PROTOCOL=quic` au `auto` ikiwa unataka usafirishaji tofauti.
- Picha za Docker hujumuisha vyeti vikuu vya CA vya mfumo na kuvikabidhi kwa `cloudflared` inayodhibitiwa, jambo linalozuia hitilafu za uaminifu wa TLS wakati handaki linapoanzishwa ndani ya kontena.
- Weka `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ikiwa unataka OmniRoute itumie faili tekelezi iliyopo badala ya kupakua nyingine.

## Lebo za Picha

| Picha                    | Lebo     | Ukubwa | Maelezo                                                        |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer thabiti ya juu zaidi **iliyochapishwa** (si git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Funga aina hii ya lebo kwa GitOps                              |

Manifesti ya majukwaa mengi: `linux/amd64` + `linux/arm64` asilia (Apple Silicon, AWS Graviton, Raspberry Pi). Docker huchagua usanifu unaolingana kiotomatiki; tumia `--platform linux/amd64` ikiwa unahitaji kulazimisha uigaji wa AMD64 kwenye seva mwenyeji za ARM.

### Vituo vya Matoleo

OmniRoute huchapisha vituo tofauti vya Docker kwa matoleo thabiti, majaribio ya tawi la toleo linalotumika, na miundo ya usanidi.

| Kituo                           | Chanzo                                         | Uwezo wa kubadilika                          | Matumizi yanayopendekezwa                                                                                                                 |
| ------------------------------- | ---------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Toleo lililosainiwa/lenye nambari              | Lisilobadilika                               | Usambazaji wa uzalishaji unaofunga toleo mahususi                                                                                         |
| `:latest` / `:latest-web`       | SemVer thabiti ya juu zaidi **iliyochapishwa** | Kiashiria thabiti kinachobadilika            | Hufuata matoleo thabiti **baada** ya kazi ya uchapishaji wa SemVer — **haifuatilii** `main` au commit ambazo hazijatolewa za `release/v*` |
| `:next` / `:next-web`           | Tawi chaguo-msingi la sasa la `release/v*`     | Kiashiria cha kabla ya toleo kinachobadilika | Kujaribu marekebisho yaliyowasili kwenye tawi la toleo linalotumika lakini bado hayajajumuishwa katika toleo thabiti                      |
| `:main` / `:main-web`           | Tawi la `main`                                 | Kiashiria cha usanidi kinachobadilika        | Kwa usanidi na majaribio ya ujumuishaji pekee                                                                                             |

#### Watoa huduma wa kipindi cha wavuti: picha za `-web`

Kila kituo kilicho hapo juu pia kina lebo ya `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), iliyoundwa kutoka hatua ya `runner-web` — picha ileile pamoja na Playwright na kivinjari cha Chromium. Picha ya kawaida hutolewa **bila** Chromium; `gemini-web`, `claude-web` na `claude-turnstile` zinaihitaji.

Hitilafu huahirishwa, haitokei wakati wa kuanzisha: watoa huduma hao huorodhesha modeli zao na kuonekana kuwa wameunganishwa kwenye dashibodi, na ni ombi la kwanza pekee linaloshindwa kwa ujumbe huu

```
[500]: Imeshindwa kupakia moduli ya nje playwright: Hitilafu: Moduli haipatikani
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ikiwa unatumia watoa huduma hao, pakua lebo ya `-web` ya kituo unachotumia tayari — hakuna kitu kingine kinachobadilika. Katika usakinishaji wa npm/CLI (bila picha ya Docker), sehemu inayokosekana inayolingana ni faili tekelezi ya kivinjari: endesha `npx playwright install chromium` kwenye seva mwenyeji.

#### Kutumia kituo cha kabla ya toleo

Kituo cha `next` huundwa upya kila msukumo unapofanywa kwenye tawi la sasa la chaguo-msingi la `release/v*` na huchapishwa kwa AMD64 na ARM64. Matawi ya zamani ya matengenezo hayawezi kukibatilisha. Kituo hiki hutoa taswira inayoweza kuvutwa kwa ajili ya marekebisho ambayo yameunganishwa kwenye tawi linalotumika la toleo kabla ya lebo thabiti inayofuata kuundwa.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Kwa Docker Compose, batilisha lebo ya taswira inayotumiwa na wasifu uliochaguliwa, kisha uvute na uunde upya huduma:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Usalama na urejeshaji wa toleo la awali

`next` ni kituo kinachoelea cha kabla ya toleo rasmi. Kinaweza kubadilika kwa kila msukumo kwenye tawi linalotumika la toleo na **hakikubaliwi kwa matumizi ya uzalishaji**. Bandika muhtasari wa taswira wakati wa kutathmini uundaji mahususi:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kabla ya kufanya majaribio, hifadhi nakala rudufu ya kiasi cha data cha OmniRoute au saraka ya data iliyopachikwa kwa bind. Ili kurejea kwenye toleo la awali, rejesha toleo thabiti au muhtasari uliotumiwa hapo awali na uunde upya kontena:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Uundaji wa tawi la toleo hauwezi kamwe kuhamisha `latest`; ni toleo thabiti la kisemantiki linalostahiki pekee linaloweza kusogeza kielekezi thabiti. Taswira za `next` hudumisha ukaguzi wa taswira ya toleo na kizuizi cha udhaifu wa kiwango cha CRITICAL.

**`latest` si hakikisho la kuwa git ni ya karibuni.** Marekebisho yaliyounganishwa kwenye `main` au kwenye tawi linalotumika la `release/v*` **hayapatikani** katika `:latest` hadi taswira thabiti ya SemVer ichapishwe na kazi ya uchapishaji iinue `:latest` (ikiwa na muhtasari sawa na SemVer hiyo). Ikiwa `latest` inaonekana kutobadilika huku GitHub tayari ikionyesha marekebisho, vuta `:next` ili kujaribu tawi la toleo au usubiri lebo ya SemVer.

| Unachotaka                                                                      | Tumia                                      |
| ------------------------------------------------------------------------------- | ------------------------------------------ |
| GitOps / uzalishaji ambao lazima usibadilike bila kudhibitiwa                   | Bandika `:X.Y.Z` (au muhtasari wa taswira) |
| Kufuata matoleo thabiti yaliyochapishwa na kukubali uundaji upya kwa kila toleo | `:latest`                                  |
| Kujaribu commit za `release/v*` ambazo bado hazijatolewa                        | `:next` (si kwa uzalishaji)                |
| Kujaribu `main`                                                                 | `:main` (si kwa uzalishaji)                |

## Upatikanaji: SQLite chaguomsingi ina replica moja

OmniRoute ya kawaida ya Docker / Kubernetes ni **mchakato mmoja wa Node + mwandishi mmoja wa SQLite**. Upatikanaji wa juu **hautumiki** kwenye topolojia hiyo.

| Kikwazo                                                  | Matokeo                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mwandishi mmoja                                          | **Usiendeshe** replica nyingi dhidi ya faili moja ya SQLite. Hilo huharibu DB.                                                                                                                                                                                                                                                                   |
| Kuunda upya / kuwasha upya / kusimamishwa na HEALTHCHECK | **Kukatika kabisa** kwa SSE zinazoendelea, vipindi vya dashibodi na hali iliyopo kwenye kumbukumbu. Kila mteja aliyeunganishwa hukatika. Maombi mapya wakati hakuna endpoint hupata **`502 Bad Gateway: Unknown error`** kutoka kwa reverse-proxy, si JSON ya OmniRoute — wateja hawawezi kutofautisha hili na hitilafu ya mtoa huduma (#11015). |
| Kitanzi kilekile cha matukio kama `/healthz`             | Usasishaji wa katalogi au mzunguko wa ukandamizaji wenye shughuli nyingi unaweza kuchelewesha uchunguzi; muda mfupi wa kusubiri kisha huanzisha upya replica **pekee**.                                                                                                                                                                          |

**Jedwali la uchunguzi** (tazama pia [mapendekezo ya uchunguzi wa Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Uchunguzi       | Lengo                                                              | Usitumie                                                                                             |
| --------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Uhai            | TCP kwenye `PORT` (chaguomsingi `20128`), au HTTP laini `/healthz` | `/api/monitoring/health`                                                                             |
| Utayari         | HTTP `GET /healthz`                                                | Vipindi vifupi vya kusubiri vinavyochukulia kitanzi cha matukio chenye shughuli nyingi kuwa kimekufa |
| Kina / binadamu | `/api/monitoring/health`                                           | Uchunguzi wa kiotomatiki wa uhai wa kubelet                                                          |

**Masasisho:** tarajia kila kipindi kukatika. Ondoa wateja taratibu ukiweza; hakuna usasishaji unaoendelea bila kusimamisha huduma kwenye SQLite chaguomsingi. Compose `restart: unless-stopped` pamoja na Docker `HEALTHCHECK` pia vitabadilisha mchakato pekee wakati kontena lina hali ya Unhealthy — eneo lilelile la athari.

Kipande cha usanidi wa Kubernetes kwa **replica moja** (Recreate inahitajika; usiongeze `replicas` dhidi ya faili moja ya SQLite):

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

Kulala kwa `preStop` huruhusu kube kuondoa endpoint za Service kabla ya SIGTERM ili trafiki **mpya** isiendelee kufikia mchakato unaokoma. SSE ya `/v1/responses` inayoendelea hupewa hadi `SHUTDOWN_TIMEOUT_MS` (chaguomsingi sekunde 30) kukamilika kupitia leseni nzito za uidhinishaji (#11015). Maombi mapya ambayo bado yanafikia mchakato hupata `503` + `Retry-After: 5`. Pengo la Recreate lisilo na endpoint hadi mchakato mbadala uwe Ready bado ni kukatika kabisa — hiyo ndiyo topolojia ya SQLite, si usanidi mbaya wa uchunguzi.

Postgres ya nje / HA yenye waandishi wengi **si** njia ya kawaida iliyorekodiwa. Ikiwa unahitaji HA, dumisha replica moja au endesha topolojia ambayo mradi umeijaribu na kuiandika kando. Kazi ya Postgres/MySQL ipo katika [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hadi hiyo itolewe, njia pekee inayotumika ya kuongeza uwezo wa `/v1/responses` **mikubwa** ni michakato N huru (sehemu inayofuata), si `replicas > 1` kwenye volume moja.

## Upanuzi wa mlalo: Michakato N huru

Mchakato mmoja wa Node ni **heap moja ya V8**. Maombi mawili yanayopishana ya wakala wa usimbaji yenye ukubwa wa ~3 MiB / ~tokeni 750k ya `POST /v1/responses` (RTK + Caveman) husitisha heap hiyo inapofikia ~12 Gi (`FATAL ERROR: Reached heap limit`) na yanaweza kusababisha OOM kwenye cgroup ya 16 Gi. Tazama [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Kipimo hicho ni onyo la **bajeti ya kumbukumbu**, si kikomo halisi cha bidhaa cha maombi mawili marefu ya `/v1/responses` yanayoendeshwa kwa wakati mmoja. Ruhusa ya kuingiza gumzo zito inadhibitiwa na bajeti ya baiti za uingizaji inayokokotolewa kiotomatiki (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) kulingana na kikomo hicho hicho cha V8/cgroup — kuongeza thamani hiyo mwenyewe (au kuweka kikomo cha zamani cha idadi ya maombi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) kwenye mchakato ambao tayari umepangiwa ukubwa hurejesha hitilafu ya kusitisha. Gumzo ndogo, `/healthz`, `/v1/models`, na MCP **hazijumuishwi** katika kikomo hicho.

### Mchakato mmoja: zaidi ya maombi mawili marefu ya `/v1/responses`

Mchakato **wenye afya** (heap iliyo chini ya `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, chaguo-msingi `0.75`) **unaweza** kuendesha zaidi ya maombi mawili marefu ya `POST /v1/responses` kwa wakati mmoja ikiwa bajeti ya baiti zinazoendelea katika mchakato mzima (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) bado ina nafasi. Miili yenye ukubwa unaolingana na au unaozidi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (chaguo-msingi 256 KiB) hutumia ukodishaji uleule wa mzigo mzito kama maombi yenye miundo mizito na hutumia njia ileile ya [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ya `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Makumi ya wateja wa SSE warefu wanaoendeshwa kwa wakati mmoja (waendeshaji mara nyingi huhitaji 40–50) ni suala la **bajeti ya kumbukumbu** — panga ukubwa wa heap + nafasi za msingi/nafasi ya ziada + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — si kikomo kisichobadilika cha bidhaa cha “upeo wa 2”. Heap iliyo chini ya shinikizo bado hupunguza mzigo kwa `503` inayoweza kujaribiwa tena ili #7849 isijirudie.

Ili **kuzidisha heap** (old-spaces huru za V8) **leo**:

| Fanya                                                                                                                                                                                                             | Usifanye                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Endesha **containers/pods N**, kila moja ikiwa na `DATA_DIR` / volume yake **binafsi**                                                                                                                            | Weka `replicas > 1` zikitumia faili moja ya SQLite                      |
| Panga ukubwa wa maombi mazito yanayoendelea + nafasi ya ziada wakati mfumo una afya kulingana na bajeti ya heap / baiti zinazoendelea; 1–2 ni chaguo-msingi la tahadhari la #7849, si upeo usiobadilika wa bidhaa | Upe mchakato mmoja RAM mara 8 na kikomo kisicho na ukomo cha idadi      |
| Hiari: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` kwa ajili ya **vihesabu vya pamoja vya mgao**                                                                                                         | Ichukulie Redis kama SQLite ya pamoja — sivyo ilivyo                    |
| Nakili siri za watoa huduma katika kila instance (au ukubali dashibodi zilizogawanywa)                                                                                                                            | Utarajie dashibodi moja / kumbukumbu moja ya miito katika instance zote |
| Weka mbele yake kisawazisha mzigo chochote; kunatisha kwa API key au session kunatosha                                                                                                                            | Kuhitaji middleware mahususi ya muuzaji inayozingatia ukubwa            |

Maunzi: idadi ya maombi marefu ya `/v1/responses` yanayoendeshwa kwa wakati mmoja kwa kila instance ni suala la **bajeti ya kumbukumbu** (heap + baiti zinazoendelea / #10110). `DATA_DIR` huru N bado huzidisha heap: RAM ya host lazima itoshe `N × cgroup`, si “pod moja ya 16 Gi yenye N=8.” Kamwe usitumie `replicas > 1` kwenye faili moja ya SQLite.

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

Msongamano ndani ya mchakato (mbanano nje ya HTTP isolate) unashughulikiwa katika [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster moja ya kimantiki inayotumia hali ya kudumu ya pamoja inashughulikiwa katika [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Hitilafu za kikanda za Gemini ndani ya Docker

Google AI Studio / Gemini API inaweza kurudisha HTTP 400 yenye FAILED_PRECONDITION na
`User location is not supported for the API use.` Ombi lililofanikiwa kwenye seva mwenyeji
halithibitishi kwamba kontena linatumia njia ileile ya kutoka. Mpangilio wa DNS,
muunganisho wa IPv4/IPv6, uelekezaji wa VPN na proksi zilizosanidiwa vinaweza kutofautiana. Angalia
[maeneo yanayotumika ya Google](https://ai.google.dev/gemini-api/docs/available-regions)
pamoja na njia halisi ya muunganisho; hitilafu hii pekee haimaanishi kuwa ufunguo wa API ni mbovu.

### Pendelea proksi mahususi kwa muunganisho

Tumia [usanidi wa proksi kwa kila muunganisho](../ops/PROXY_GUIDE.md#4-level-proxy-system)
wa OmniRoute kwa muunganisho wa Gemini ulioathiriwa, kisha urudie **Test Connection** na ombi dogo
ukitumia modeli ileile. Hii inaweka mabadiliko ya uelekezaji yakiwa yamewekewa mipaka kwenye muunganisho huo. Thibitisha
kwamba proksi inaweza kufikiwa kutoka kwenye kontena, na kwamba muunganisho kwa kweli unaichagua.
Kubadilisha njia hakuhakikishi kuwa masharti ya kikanda ya mtoa huduma wa juu yametimizwa.

### Linganisha mitandao ya seva mwenyeji na kontena

Weka ufunguo, modeli na ombi sawa unapolinganisha matokeo yaliyothibitishwa; kamwe
usibandike vitambulisho vya siri, nywila za proksi au vichwa kamili vya uidhinishaji kwenye suala.
Kwanza kagua familia za anwani ambazo kitatuzi cha OS kinatoa, ukitumia amri ileile
kwenye seva mwenyeji na ndani ya kontena:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Badilisha `omniroute` na huduma unayoendesha (kwa mfano, `omniroute-web`). Amri hizi
huchapisha familia za anwani bila vitambulisho vya siri au anwani za IP. Thamani `6` iliyorudishwa
inaonyesha tu matokeo ya DNS ya IPv6: **haithibitishi** kuwepo kwa njia ya IPv6 inayoweza kutumika au ufikiaji wa API.
Mahali ambapo `curl` imesakinishwa, linganisha `curl -4 -I https://generativelanguage.googleapis.com`
na `curl -6 -I https://generativelanguage.googleapis.com` katika mazingira yote mawili.
Jibu la HTTP linathibitisha muunganisho kwa jaribio hilo, hata kama ni hitilafu
isiyothibitishwa; ni ombi la modeli lililothibitishwa pekee linalojaribu ustahiki wa Gemini.

### Mbadala wa kiwango cha seva mwenyeji: IPv6 inayofanya kazi na sera ya kitatuzi

Mtoa taarifa wa [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) alirejesha
ufikiaji katika mazingira yake kwa kuwezesha IPv6 ya kontena na kubadilisha uteuzi wa anwani
wa glibc. Chukulia hii kama mbadala mahususi kwa mazingira. Thibitisha IPv6 inayofanya kazi ya seva
mwenyeji, utokaji/uelekezaji wa kontena na kanuni za ngome kabla ya kurekebisha mapendeleo ya kitatuzi.
Anwani binafsi ya ULA pekee haithibitishi muunganisho wa umma wa IPv6.

Kwa huduma ambazo tayari zimeunganishwa kwenye mtandao chaguomsingi wa Compose, kipande hiki huwezesha
IPv6 kwenye mtandao huo; hifadhi sehemu nyingine za huduma, poti, ujazo na usanidi wako:

```yaml
networks:
  default:
    enable_ipv6: true
```

Kwa mtandao wenye jina, iwezeshe kwenye mtandao ambao huduma imejiunga nao kwa kweli. Docker inaweza
kutenga subnet ya ULA; chagua subnet bainifu isiyopishana pale tu mtandao wako
unapoihitaji. Angalia [mitandao ya IPv6 ya Docker](https://docs.docker.com/engine/daemon/ipv6/)
na [chaguo za mtandao za Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Kwenye **taswira inayotegemea glibc**, `/etc/gai.conf` inaweza kubadilisha uteuzi wa anwani. Dockerfile ya sasa
ya hazina hutumia Debian; taswira maalum zinazotegemea musl hazitumii utaratibu huu.
Marekebisho yaliyoripotiwa hubadilisha lebo ya ULA kutoka `label fc00::/7 6` hadi
`label fc00::/7 1`. Anza na jedwali kamili la sera la taswira na uhifadhi maingizo yake mengine:
kuongeza ingizo la `label` au `precedence` hubadilisha jedwali hilo chaguomsingi, kwa hivyo faili
iliyo na mstari uliobadilishwa pekee haitoshi.
[Marejeleo ya usanidi wa glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
yanaeleza semantiki hizo. Pachika faili iliyokaguliwa kwa bind katika hali ya kusoma pekee kwenye `/etc/gai.conf`
na uunde upya huduma ili kuitumia.

Hii hubadilisha uteuzi wa anwani wa OS kwa **trafiki yote inayotoka kwenye kontena hilo**.
Hailazimishi kila programu kuchagua IPv6: mpangilio wa DNS wa Node na uteuzi wa
muunganisho pia ni muhimu. Hasa, `--dns-result-order=ipv4first` hupendelea IPv4 na
si suluhisho la hitilafu inayotokea kwenye IPv4 pekee. Angalia [mpangilio wa DNS wa Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Jaribu tena Gemini na watoa huduma wako wengine baada ya mabadiliko yoyote ya kiwango cha seva mwenyeji. Ili kurudisha
hali ya awali, ondoa upachikaji maalum wa `gai.conf`, rejesha usanidi wa awali wa mtandao na
uunde upya huduma/mtandao ulioathiriwa wakati wa kipindi cha matengenezo. Kuunda upya mtandao
kunaweza kukatiza kontena nyingine zilizounganishwa nao; usifute ujazo wa data ya kudumu.

## Vidokezo Muhimu

- **Hali ya SQLite WAL:** `docker stop` inapaswa kuruhusiwa ikamilike ili OmniRoute iweze kuhifadhi mabadiliko ya hivi karibuni kwenye `storage.sqlite`. Faili za Compose zilizojumuishwa tayari zimeweka kipindi cha neema cha kusimamisha cha sekunde 40. Ikiwa unaendesha image moja kwa moja, endelea kutumia `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Weka kuwa `true` ikiwa nakala rudufu za kawaida/kabla ya uandishi zinasimamiwa nje. Uhamishaji wa hifadhidata iliyopo bado unahitaji nakala yake endelevu ya usalama na ulinzi dhidi ya uhamishaji kwa wingi.
- **Udumishaji wa Data:** Daima ambatisha volume kwenye `/app/data` ili kuhifadhi hifadhidata, funguo na usanidi wako baada ya container kuwashwa upya.
- **Usanidi wa Porti:** Badilisha thamani ya kigezo cha mazingira `PORT` ili kubadilisha porti chaguomsingi ya `20128`.

## Tazama Pia

- [Mwongozo wa Usambazaji kwenye VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Usanidi wa VM + nginx + Cloudflare
- [Mwongozo wa Usambazaji kwenye Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Sambaza kwenye Fly.io
- [Usanidi wa Mazingira](../reference/ENVIRONMENT.md) — Marejeleo kamili ya `.env`
