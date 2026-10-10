# 🐳 Docker Guide — OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referenza kompluta għall-iskjerament b’Docker. Għal bidu malajr, ara t-[taqsima dwar Docker fir-README](../README.md#-docker).

## Werrej

- [Tħaddim Malajr](#quick-run)
- [B’Fajl tal-Varjabbli tal-Ambjent](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profili Disponibbli](#available-profiles)
- [Konfigurazzjoni tal-għodod CLI tal-host meta OmniRoute jitħaddem f’Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar ta’ Redis](#redis-sidecar)
- [Compose għall-Produzzjoni](#production-compose)
- [Stadji tad-Dockerfile](#dockerfile-stages)
- [Varjabbli Kritiċi tal-Ambjent](#critical-environment-variables)
- [Docker Compose b’Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Mina Rapida ta’ Cloudflare](#cloudflare-quick-tunnel)
- [Tags tal-Immaġni](#image-tags)
- [Disponibbiltà: SQLite predefinit jappoġġja replika waħda biss](#availability-default-sqlite-is-single-replica)
- [Żbalji reġjonali ta’ Gemini ġewwa Docker](#gemini-regional-errors-inside-docker)
- [Noti Importanti](#important-notes)

---

## Tħaddim Malajr

> **Trid tospita s-servizz int stess bi kmand wieħed?** Ara l-
> [Gwida għall-Awtoospitar](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (immaġni ppubblikata +
> Redis, aċċessibbli biss mil-loopback, mingħajr għażla ta’ profil). It-Tħaddim Malajr hawn taħt huwa
> l-metodu b’kontenitur wieħed għall-utenti li diġà jħaddmu Redis band’oħra.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## B’Fajl tal-Varjabbli tal-Ambjent

```bash
# L-ewwel ikkopja u editja .env
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
# Profil bażiku (mingħajr għodod CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw integrati)
docker compose --profile cli up -d

# Profil tal-host (primarjament għal Linux; jimmonta l-binarji CLI tal-host bħala għall-qari biss)
docker compose --profile host up -d

# Profil tal-web (Chromium/Playwright għall-fornituri ta’ sessjonijiet tal-web)
docker compose --profile web up -d

# Għaqqad CLI + sidecar ta’ CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profili Disponibbli

OmniRoute jinkludi profili ta’ Compose għall-konfigurazzjonijiet ewlenin tal-iskjerament. Agħżel dak li jaqbel mal-ambjent tiegħek.

| Profil              | Servizz          | Meta għandek tużah                                                                                                                                             | Kmand                                        |
| ------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinit) | `omniroute-base` | Server mingħajr interfaċċa grafika / runtime minimu, mingħajr CLIs tal-fornituri inklużi                                                                       | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Flussi tax-xogħol aġentiċi li jsejħu `omniroute providers/setup/doctor` u CLIs inklużi (Codex, Claude Code, Droid, OpenClaw)                                   | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Hosts Linux li jridu aċċess simili għal `network_mode` għall-CLIs tal-host billi jimmontaw `~/.local/bin`, `~/.codex`, `~/.claude`, eċċ. bħala għall-qari biss | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Ħaddem is-sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) fuq il-port `8317` għall-proxying lejn CLIs upstream                             | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Fornituri ta’ sessjonijiet tal-web li jeħtieġu browser: `gemini-web`, `claude-web`, `claude-turnstile` (jibni `runner-web`, bi Chromium inkluż)                | `docker compose --profile web up -d`         |

> Jistgħu jiġu kkombinati diversi profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurazzjoni tal-għodod CLI tal-host meta OmniRoute jaħdem f'Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` u l-buttuna
**Issejvja l-konfigurazzjoni** tad-dashboard kollha jiktbu fajls bħal `~/.codex/*.config.toml`. Dawk il-mogħdijiet
għandhom tifsira biss fuq il-magna fejn effettivament jaħdem is-CLI. Jekk tħaddimhom ġewwa
l-container, il-kitba tispiċċa fil-home tal-container stess (`/home/node` —
l-image taħdem bħala `USER node`), fejn l-ebda CLI tal-host qatt mhu se jaqraha u minn fejn
titħassar malli l-container jerġa' jinħoloq.

OmniRoute jinduna b'dan u jirrifjuta l-kitba filwaqt li jagħti istruzzjonijiet minflok
jirrapporta suċċess li ma tistax tuża: is-CLI jagħlaq bil-kodiċi `2`, u l-API twieġeb `422`
b'`containerEphemeralTarget: true`.

### Rakkomandat: ħaddem is-CLI fuq il-host, u OmniRoute f'Docker

Il-container jipprovdi l-API; is-CLI jikkonfigura l-għodod tal-host tiegħek.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # qabbad is-CLI mal-container
omniroute setup-codex                      # jikteb fil-~/.codex reali fuq il-host tiegħek
```

Din hija l-għażla t-tajba meta Codex, Claude Code, Cursor jew għodod simili jaħdmu fuq
il-laptop tiegħek — li hija l-konfigurazzjoni tas-soltu.

### Alternattiva: immonta b'bind id-direttorji tal-konfigurazzjoni tal-host (profil `host`)

Jekk trid li l-container innifsu jikteb il-konfigurazzjoni tal-host tiegħek, immonta
d-direttorji fih u ssettja `CLI_CONFIG_HOME` biex jipponta lejn l-għerq tal-mount. Il-profil `host`
diġà jagħmel dan:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount huwa dak li jagħmel il-mogħdija affidabbli: OmniRoute jaqra
`/proc/self/mountinfo` u jippermetti kitbiet f'mogħdijiet immuntati (u f'direttorji
li wliedhom huma mounts, li hija eżattament l-istruttura ta' `/host-home` hawn fuq), filwaqt li
xorta jirrifjuta dawk li mhumiex immuntati.

### Soluzzjoni ta' emerġenza: ikkonfigura s-CLIs tal-container stess (uża b'kawtela)

Meta s-CLIs ikunu verament jinsabu ġewwa l-container (il-profil `cli`), il-kitba
tkun intenzjonata. Għaddi `--allow-container-write` lil kwalunkwe kmand `setup-*`, jew issettja
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` għas-server. Il-kitba titwettaq
bi twissija li mhix se tibqa' teżisti wara l-container.

> **Twissija tas-sigurtà — profil `cli` + mount ta' `docker.sock`.**
> Il-profil `cli` jagħmel bind mount ta' `/var/run/docker.sock` sabiex l-aġġornatur awtomatiku
> ġewwa l-container ikun jista' jerġa' joħloq l-istack mid-daemon tal-host
> (`src/lib/system/autoUpdate.ts` jiċċekkja għal dak is-socket u jaqbeż il-mogħdija
> ta' Docker meta ma jkunx preżenti). Dak is-socket huwa **konfini ta' fiduċja b'livell root
> fuq il-host**: kull ħaġa li tista' taċċessah tikkontrolla d-daemon Docker tal-host bħala
> root — tista' toħloq, tispezzjona, twaqqaf u tneħħi kwalunkwe container fuq il-host.
> Implikazzjonijiet:
>
> 1. **Qatt tesponi l-port tal-profil `cli` għan-network.** Ippubblikah
>    fuq `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` aċċessibbli mil-LAN ibiddel kwalunkwe RCE fil-livell tad-dashboard
>    f'kompromess sħiħ tal-host.
> 2. **Tagħmilx bind ta' direttorji addizzjonali tal-host fil-profil `cli`.**
>    Is-socket ta' Docker flimkien ma' kwalunkwe mount ieħor jagħti lill-container aċċess sħiħ
>    ta' qari/kitba għas-sistema tal-fajls u l-konfigurazzjoni tal-host tiegħek. Jekk teħtieġ li għodda
>    tara proġett, ħaddimha lokalment bil-binarju tas-CLI — timmontahiex
>    fil-container `cli`.
>
> Jekk m'għandekx bżonn aġġornament awtomatiku minn ġewwa l-container, tixgħelx il-profil `cli`
> (`COMPOSE_PROFILES=core,redis` jew iqsar). Il-profili l-oħra ma
> jimmontawx is-socket ta' Docker.
>
> Ara `docs/security/MITM-TPROXY-DECRYPT.md` (git; mhux ikkompilat f'`/docs`) għall-mudell tat-theddid relatat
> mal-MITM, u `docs/security/SUPPLY_CHAIN.md` għall-katina tal-provenjenza
> tal-binarji `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar ta’ Redis

OmniRoute jiddependi fuq Redis biex jappoġġja l-limitatur distribwit tar-rata u l-cache kondiviża. Is-servizz `redis` huwa **dejjem definit** f’`docker-compose.yml` (m’għandu ebda restrizzjoni ta’ profil) u jibda flimkien ma’ kwalunkwe profil ieħor.

| Dettall                  | Valur                                            |
| ------------------------ | ------------------------------------------------ |
| Immaġni                  | `redis:7-alpine`                                 |
| Isem tal-container       | `omniroute-redis`                                |
| Port intern              | `6379`                                           |
| Port tal-host (override) | `REDIS_PORT` (b’mod awtomatiku `6379`)           |
| Bind tal-host (override) | `REDIS_BIND_HOST` (b’mod awtomatiku `127.0.0.1`) |
| Volum                    | `omniroute-redis-data` → `/data`                 |
| Kontroll tas-saħħa       | `redis-cli ping` (intervall ta’ 10s)             |

Varjabbli tal-ambjent relatati:

- `REDIS_URL` — string tal-konnessjoni injettata fl-applikazzjoni (`redis://redis:6379` b’mod awtomatiku).
- `REDIS_PORT` — mapping tal-port fuq in-naħa tal-host għall-container ta’ Redis.
- `REDIS_BIND_HOST` — l-interfaċċa tal-host li fuqha jiġi ppubblikat il-port. B’mod awtomatiku hija `127.0.0.1`.

> **Għaliex loopback b’mod awtomatiku:** is-sidecar jaħdem mingħajr `requirepass`, u l-containers
> tal-applikazzjoni jaċċessawh permezz tan-network ta’ compose (`redis:6379`) — il-port ippubblikat
> qiegħed hemm biss għal għodod fuq in-naħa tal-host (`redis-cli`, `npm run dev` lokali). Il-pubblikazzjoni fuq
> `0.0.0.0` tesponi Redis mingħajr awtentikazzjoni għal kull host fuq il-LAN tiegħek. Jekk tissettja
> `REDIS_BIND_HOST=0.0.0.0`, żid ukoll `--requirepass` mal-`command:` tas-servizz.

**Id-diżattivazzjoni ta’ Redis** mhijiex irrakkomandata (il-limitatur tar-rata jaqleb għal fallback fil-memorja b’funzjonalità mnaqqsa). Jekk bilfors trid tagħmel dan, neħħi/ikkummenta l-blokka tas-servizz `redis:` f’`docker-compose.yml` jew naqqas l-iskala tiegħu għal żero:

```bash
docker compose up -d --scale redis=0
```

## Compose għall-Produzzjoni

Għal snapshot iżolat tal-produzzjoni li jaħdem flimkien mal-ambjent tal-iżvilupp, uża `docker-compose.prod.yml`.

| Dettall                       | Valur                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| Fajl                          | `docker-compose.prod.yml`                                                                  |
| Port awtomatiku tad-dashboard | `PROD_DASHBOARD_PORT=20130` (immappjat għall-port intern `${DASHBOARD_PORT:-20128}`)       |
| Port awtomatiku tal-API       | `PROD_API_PORT=20131`                                                                      |
| Immaġni                       | `omniroute:prod` (mibnija mit-target `runner-cli`)                                         |
| Container ta’ Redis           | `omniroute-redis-prod` (`redis:8.6.2`, volum dedikat `redis-prod-data`)                    |
| Volum tad-data                | `omniroute-prod-data` (b’isem, ippersistit bejn rebuilds)                                  |
| Kontrolli tas-saħħa           | `node healthcheck.mjs` + `redis-cli ping`, b’`depends_on` ikkontrollat mis-saħħa ta’ Redis |

Kif tużah:

```bash
# Ibni u ibda l-istack tal-produzzjoni
docker compose -f docker-compose.prod.yml up -d --build

# Uri l-logs kontinwament
docker compose -f docker-compose.prod.yml logs -f

# Waqqaf u neħħi l-istack (żomm il-volumi)
docker compose -f docker-compose.prod.yml down
```

L-istack tal-produzzjoni jaħdem b’mod parallel mal-compose tal-iżvilupp (b’ismijiet tal-containers, ports u volumi differenti), għalhekk tista’ tkompli taħdem u tittestja lokalment waqt li l-produzzjoni tibqa’ attiva.

## Stadji tad-Dockerfile

Ir-repożitorju jinkludi Dockerfile b’diversi stadji (`Dockerfile`). Erba’ stadji huma esposti; agħżel it-`target` it-tajjeb għall-każ ta’ użu tiegħek.

| Stadju        | Immaġni bażi          | Għan                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Jinstalla d-dipendenzi (`npm ci --legacy-peer-deps`) u jħaddem `npm run build` (Turbopack b’mod awtomatiku — ara r-Riżorsi waqt il-build hawn taħt)                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Ambjent ta’ eżekuzzjoni għall-produzzjoni bl-output standalone ta’ Next.js. **Ma jinkludi l-ebda CLI tal-fornituri.**                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | Iżid `git`, `docker.io`, `docker-compose` u CLIs globali: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agħżel dan għal flussi tax-xogħol aġentiċi.**                                                                                                                    |
| `runner-web`  | `runner-base`         | Iżid Playwright + browser Chromium (`--with-deps`) għall-fornituri tas-sessjonijiet tal-web: `gemini-web`, `claude-web`, `claude-turnstile`. **Agħżel dan meta tuża dawk il-fornituri** — l-immaġni sempliċi tfalli waqt it-talba mingħajru (ara n-nota dwar `-web` taħt il-Kanali tar-Rilaxx). |

Ibni target speċifiku manwalment:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Riżorsi waqt il-build

Tliet argumenti tal-build jikkontrollaw kemm jikkonsma riżorsi l-istadju `builder`. Dawn japplikaw biss waqt il-build —
`OMNIROUTE_MEMORY_MB` (hawn taħt) huwa kontroll separat waqt l-eżekuzzjoni.

| Argument tal-build          | Valur awtomatiku | Effett                                                                                         |
| --------------------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`              | `0` jibni b’webpack: inqas memorja massima, iżda aktar bil-mod. `1` jagħżel Turbopack.         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`           | Limitu tal-heap ta’ V8 (`--max-old-space-size`) għall-`next build` li jitnieda.                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`              | Jipprovdi `CIRCLE_NODE_TOTAL`; Next jidderiva `workers = N - 1` għall-ġbir tad-data tal-paġni. |

`OMNIROUTE_BUILD_WORKERS` huwa dak li għandek iżżid fuq builder kbir u dak li
għandek tissuspetta meta build b’riżorsi limitati jfalli **wara** `✓ Compiled successfully`. Kull
worker tad-data tal-paġni huwa proċess għalih, u l-istess jgħodd għall-proċess prinċipali `next build`;
riproduzzjoni diretta fuq VPS (kwistjoni #7518) kejlet l-ogħla RSS ta’ kull proċess għal
~4.5 GB indipendentement mill-flag tal-heap `NODE_OPTIONS` (Turbopack jikkompila f’memorja
nattiva/Rust barra mill-heap ta’ V8). Il-valur awtomatiku ta’ `2` (→ worker wieħed, 2
proċessi b’kollox) huwa adattat għar-runners ospitati minn GitHub b’16 GB / 4 vCPU li
juża l-pipeline tal-pubblikazzjoni. B’`8` (→ 7 workers), dak ir-runner spiċċalu l-memorja u
buildkit falla l-pass b’`ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) xorta ma kienx biżżejjed ladarba l-RSS għal kull proċess tkejjel
direttament minflok ġie dedott. `tests/unit/docker-build-memory-budget.test.ts`
jagħmel il-kalkoli abbażi taċ-ċifra mkejla u jfalli jekk xi wieħed miż-żewġ kontrolli
jaqbeż il-kapaċità tar-runner.

Turbopack jikkompila f’memorja Rust nattiva li tinsab **barra** mill-heap ta’ V8, għalhekk
`OMNIROUTE_BUILD_MEMORY_MB` ma jillimitahiex. Fuq host b’limitu tal-memorja, il-build
imbagħad jiġi terminat b’SIGKILL mill-OOM killer mingħajr ebda test ta’ żball — sempliċement
jieqaf f’nofs `Creating an optimized production build`, u dan jidher qisu weħel aktar
milli spiċċatlu l-memorja. Hu għalhekk li d-`Dockerfile` juża webpack b’mod awtomatiku
(`OMNIROUTE_USE_TURBOPACK=0`), għall-kuntrarju ta’ `npm run dev` / `npm run build`, fejn
Turbopack huwa l-valur awtomatiku fil-kodiċi: `docker build .` sempliċi mingħajr argumenti tal-build (kif
iħaddmu Railway u hosts oħrajn ta’ klikk waħda) ma jistax imut fis-skiet fuq
builder b’limitu tal-memorja. L-immaġnijiet ippubblikati diġà jgħaddu `OMNIROUTE_USE_TURBOPACK=0`
b’mod espliċitu f’`docker-publish.yml`. Fuq builder b’ħafna RAM, agħżel
Turbopack għal build aktar veloċi:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` huwa attivat, għalhekk `next build` iħaddem proċess prinċipali **u** proċess
worker, u kull wieħed jirrispetta `OMNIROUTE_BUILD_MEMORY_MB` separatament. Issettja l-limitu
tal-container għal bejn wieħed u ieħor aktar mid-doppju ta’ dak il-valur, mhux darba biss.

Imkejjel fuq din is-siġra (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limitu tal-container | Riżultat                                   |
| --------- | -------------------- | ------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB       | Terminat mill-OOM fit-tnejn, fis-skiet     |
| webpack   | 8 GiB                | Il-worker tal-build ġie terminat b’SIGKILL |
| webpack   | 12 GiB               | Irnexxa, b’quċċata ta’ 11.1 GiB            |

### Valuri awtomatiċi waqt l-eżekuzzjoni

Valuri awtomatiċi esportati minn `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Imġiba tal-memorja f’Docker:

- L-immaġni tissettja `OMNIROUTE_MEMORY_MB=1024` u minnha tidderiva `NODE_OPTIONS=--max-old-space-size=1024`.
- Il-proċess effettiv tas-server jinbeda mil-launcher standalone, li jaqra `OMNIROUTE_MEMORY_MB` u jżid `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node juża l-aħħar valur ripetut ta’ `--max-old-space-size`, għalhekk l-issettjar ta’ `OMNIROUTE_MEMORY_MB` jikkontrolla l-limitu effettiv tal-heap ta’ Docker.
- Minħabba li l-immaġni dejjem tissettjah, il-valur ta’ riżerva tal-launcher stess, ikkalibrat skont ir-RAM, qatt ma japplika taħt Docker. Għollih b’mod espliċitu skont it-tagħbija tax-xogħol (it-tabella hawn taħt). `2048` xorta għadu żgħir wisq għal `/v1/responses` ta’ aġent tal-kodifikazzjoni.

### RAM waqt l-eżekuzzjoni għall-aġenti tal-kodifikazzjoni

Il-valur predefinit ta’ 1 GiB f’Docker huwa l-minimu għal dashboard/chat ħafif, mhux daqs għall-produzzjoni. Bodies twal ta’ `POST /v1/responses` (mijiet ta’ messaġġi, għexieren ta’ għodod) iżommu diversi graffs fil-memorja waqt il-kompressjoni. Żewġ talbiet sovrapposti ta’ madwar 3 MiB / 750k token wasslu biex V8 jieqaf b’old-space ta’ **12 GiB** (`FATAL ERROR: Reached heap limit`) u laħqu wkoll OOM ta’ cgroup ta’ 16 GiB. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Issettja d-daqs ta’ **cgroup `--memory` ’il fuq mill-heap** — buffers nattivi, SQLite, u riżultati intermedji tal-kompressjoni jinsabu barra minn V8.

| Tagħbija tax-xogħol                                 | `OMNIROUTE_MEMORY_MB`                 | Kontenitur / cgroup      | Noti                                                                                                                           |
| --------------------------------------------------- | ------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Dashboard, chat ħafif wieħed                        | `1024` (valur predefinit tal-immaġni) | ≥2 GiB                   |                                                                                                                                |
| Aġent wieħed tal-kodifikazzjoni (Claude/Codex/Grok) | `8192`                                | ≥10 GiB                  | `/v1/responses` tipiku ta’ sessjoni waħda                                                                                      |
| Żewġ `/v1/responses` twal konkorrenti               | `10240`–`12288`                       | ≥12–16 GiB               | Ġie mkejjel waqfien ta’ V8 b’heap ta’ madwar 12 GiB                                                                            |
| Tliet kuntesti twal konkorrenti jew aktar           | tużax proċess wieħed                  | isserjalizza / aktar RAM | L-ammissjoni predefinita għal tagħbijiet tqal hija talba waħda għaddejja; jekk iżżidha mingħajr RAM, terġa’ tikkawża l-waqfien |

`omniroute serve` fuq bare metal jikkalibra għal madwar 35% tar-RAM (ristrett għal `[512, 4096]`) meta `OMNIROUTE_MEMORY_MB` **ma jkunx issettjat**. Docker dejjem jissettja `1024`, għalhekk dik il-kalibrazzjoni qatt ma titħaddem fl-immaġni uffiċjali.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Varjabbli Kritiċi tal-Ambjent

Lil hinn mill-valuri predefiniti ddokumentati f’[ENVIRONMENT.md](../reference/ENVIRONMENT.md), il-varjabbli li ġejjin huma l-aktar importanti meta jitħaddmu taħt Docker:

| Varjabbli                     | Għan                                                                                                                                                                                                                                                                       | Valur predefinit                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sigriet kondiviż għall-pont WebSocket. **Meħtieġ fil-produzzjoni** — issettjah bħala sekwenza każwali b’saħħitha.                                                                                                                                                          | mhux issettjat (irid jiġi pprovdut) |
| `REDIS_URL`                   | Sekwenza ta’ konnessjoni għall-backend tal-limitatur tar-rata / cache                                                                                                                                                                                                      | `redis://redis:6379`                |
| `REDIS_PORT`                  | Port fuq in-naħa tal-host għall-kontenitur Redis inkluż                                                                                                                                                                                                                    | `6379`                              |
| `REDIS_BIND_HOST`             | Interfaċċa tal-host li fuqha jiġi ppubblikat il-port Redis inkluż (loopback sakemm ma żżidx AUTH)                                                                                                                                                                          | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Mogħdija tal-host immuntata fil-profil `cli` f’`/workspace/omniroute` għall-flussi tax-xogħol ta’ awto-aġġornament                                                                                                                                                         | `.` (direttorju attwali)            |
| `OMNIROUTE_MEMORY_MB`         | Limitu massimu tal-heap ta’ Node waqt it-tħaddim għas-server awtonomu ta’ Docker; jegħleb il-valur predefinit tal-immaġni msemmi hawn fuq. Aġenti tal-kodifikazzjoni: `8192`+ (ara [RAM waqt it-tħaddim](#runtime-ram-for-coding-agents)).                                 | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Jissostitwixxu l-ports esposti għad-dashboard (20128) u għall-API (20129)                                                                                                                                                                                                  | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Interfaċċa tal-host li fuqha docker-compose jippubblika l-ports tad-dashboard/API/live-WS. B’`REQUIRE_API_KEY=false` (il-valur predefinit), `0.0.0.0` jesponi l-proxy anonimu `/v1` għal-LAN — wessa’ l-aċċess biss b’`REQUIRE_API_KEY=true` jew bi proxy invers quddiemu. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Interfaċċa tal-host li fuqha docker-compose jippubblika s-sidecar `cliproxyapi` — il-volum tad-data tiegħu jżomm il-kredenzjali tal-fornitur.                                                                                                                              | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Direttorju li l-iskaner tal-plugins waqt it-tħaddim jaqra minnu u jinstalla fih. Issettjah meta l-plugins ikunu mmuntati permezz ta’ bind mount: il-valur predefinit isegwi `HOME`, li immaġni mhux bilfors tesporta.                                                      | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Sottomogħdija tal-URL meta l-app tiġi ppubblikata wara proxy invers (eż. `/omniroute`)                                                                                                                                                                                     | _(vojt = għerq)_                    |
| `NEXT_PUBLIC_BASE_URL`        | Oriġini pubblika tal-browser inkluża s-sottomogħdija (eż. `https://host/omniroute`)                                                                                                                                                                                        | mhux issettjat                      |
| `PROD_DASHBOARD_PORT`         | Port tad-dashboard fuq in-naħa tal-host għal `docker-compose.prod.yml`                                                                                                                                                                                                     | `20130`                             |
| `CLIPROXYAPI_PORT`            | Port fuq in-naħa tal-host għas-sidecar `cliproxyapi`                                                                                                                                                                                                                       | `8317`                              |

## Proxy invers fuq sottomogħdija (Traefik / nginx)

Il-`basePath` ta’ Next.js jiġi kkompilat fil-bundle awtonomu. OmniRoute jirreġistra l-valur
inkorporat f’fajl sentinel fl-għerq tal-app (miktub matul `npm run build`; jinqara minn
`scripts/docker/ensure-docker-base-path.mjs`) u jqabblu ma’
`OMNIROUTE_BASE_PATH` meta jibda l-container. Meta jkunu differenti u l-image tkun
inbniet għall-għerq tad-domain, il-punt tad-dħul jerġa’ jikteb il-manifesti awtonomi, il-
literali inkorporati ta’ `basePath`/`assetPrefix` (Next 16 jirrendi l-URLs tal-assets SSR
minn `assetPrefix` biss — il-patcher jirrifletti s-sottomogħdija fih), l-URLs tal-assets
`/_next/static` inkorporati (manifesti tar-referenzi tal-klijent, importazzjonijiet tal-media,
paġni tal-iżbalji rrendjati minn qabel) u x-shim `process.env` tal-klijent qabel ma jitħaddem
`node dev/run-standalone.mjs`.

### Bini b’Compose (rakkomandat)

Issettja ż-żewġ varjabbli f’`.env`, imbagħad ibni mill-ġdid sabiex l-image u l-ambjent
waqt it-tħaddim jaqblu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` jgħaddi `OMNIROUTE_BASE_PATH` bħala argument tal-bini ta’ Docker
u bħala varjabbli tal-ambjent waqt it-tħaddim.

### Image tal-għerq mibnija minn qabel + sottomogħdija waqt it-tħaddim

L-images ippubblikati `diegosouzapw/omniroute:*` huma mibnija għall-għerq tad-domain.
Xorta tista’ tissettja `OMNIROUTE_BASE_PATH` waqt it-tħaddim; il-container japplika patch
għall-bundle darba waħda waqt l-istartjar. Użaha flimkien mal-oriġini pubblika
korrispondenti:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ikkonfigura l-proxy invers sabiex jgħaddi l-mogħdija esterna **sħiħa** (tneħħix il-
prefiss). Traefik għandu jidderieġi `PathPrefix(`/omniroute`)` lejn il-container mingħajr
`StripPrefix`, sabiex Next.js jirċievi `/omniroute/...` u jservi l-assets minn
`/omniroute/_next/...`.

Il-healthcheck ta’ Docker jittestja l-endpoint ħafif taċ-ċiklu tal-ħajja `/healthz`,
ippreċedut mill-`OMNIROUTE_BASE_PATH` attiv. `/api/monitoring/health` jibqa’ disponibbli
għal dijanjostika minn persuni jew dashboards; sabiex il-HEALTHCHECK tal-container
jerġa’ jipponta lejh (pereżempju biex jiġi infurzat kontroll profond tas-saħħa), issettja
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Dik il-mogħdija hija kontroll
**profond** (DB + sommarju tal-monitoraġġ) — adattat għall-`HEALTHCHECK` mhux frekwenti
ta’ Docker jekk tagħżel li terġa’ tużah, iżda **mhux** għall-intervalli tal-`livenessProbe`
ta’ Kubernetes.

Għall-orkestraturi (Kubernetes, Nomad, eċċ.):

| Sonda               | Ippreferi                                                                | Evita                                                     |
| ------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| Vitalità            | HTTP `GET /livez`, jew TCP fuq il-port ewlieni (`PORT`, default `20128`) | `/api/monitoring/health` bħala kontroll tal-vitalità      |
| Prontezza           | HTTP `GET /healthz`                                                      | Timeouts stretti li jqisu event loop okkupat bħala mejjet |
| Profonda / blackbox | `/api/monitoring/health`                                                 | —                                                         |

`/healthz` jirrapporta ċ-ċiklu tal-ħajja tal-proċess (`ok` / `starting` / `stopping`).
`/livez` jiċċekkja biss jekk il-proċess huwiex ħaj (200 kull meta l-handler ikun jista’
jitħaddem; ma jistenniex il-prontezza). It-tnejn xorta jitħaddmu fuq l-istess event loop
ta’ Node li jimmaniġġja t-talbiet, għalhekk xogħol marbut mas-CPU fuq il-katalgu jew
il-kompressjoni jista’ jdewwimhom — okkupat ≠ mejjet. Ippreferi kontroll tal-vitalità
b’TCP jekk is-sondi HTTP jilħqu t-timeout. Gwida sħiħa dwar is-sondi:
[Gwida tal-monitoraġġ — rakkomandazzjonijiet għas-sondi ta’ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ma’ Caddy (HTTPS Auto-TLS)

OmniRoute jista’ jiġi espost b’mod sigur permezz tal-forniment awtomatiku tal-SSL ta’ Caddy. Kun żgur li r-rekord DNS A tad-dominju tiegħek jipponta lejn l-indirizz IP tas-server tiegħek.

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
      # L-oriġini viżibbli mill-browser għall-callbacks ta’ OAuth, il-links tad-dashboard, u l-URLs pubbliċi ġġenerati.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL intern bejn server u ieħor għal kompiti skedati / talbiet lejh innifsu.
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

Caddy jistabbilixxi l-headers standard ta’ forwarding għall-container upstream. OmniRoute juża
`NEXT_PUBLIC_BASE_URL` bħala l-oriġini pubblika kanonika għall-callbacks ta’ OAuth u l-links pubbliċi
ġġenerati; l-operazzjonijiet ta’ kitba awtentikati tad-dashboard jużaw talbiet mill-istess oriġini flimkien ma’
protezzjoni CSRF marbuta mas-sessjoni. Ippermetti `OMNIROUTE_TRUST_PROXY` biss għal skjeramenti avvanzati fejn intenzjonalment
trid li OmniRoute jiddetermina l-oriġini pubblika minn headers ta’ forwarding fdati minflok minn
konfigurazzjoni espliċita.

## Cloudflare Quick Tunnel

L-appoġġ tad-dashboard għal skjeramenti Docker jinkludi **Cloudflare Quick Tunnel** b’klikk waħda minn `Dashboard → Punti ta’ tmiem`. L-ewwel attivazzjoni tniżżel `cloudflared` biss meta jkun meħtieġ, tibda tunnel temporanju lejn il-punt ta’ tmiem `/v1` attwali tiegħek, u turi l-URL iġġenerat `https://*.trycloudflare.com/v1` direttament taħt il-URL pubbliku normali tiegħek.

Il-pannelli tat-tunnels tal-punti ta’ tmiem (Cloudflare, Tailscale, ngrok) jistgħu jintwerew jew jinħbew minn `Settings → Dehra` mingħajr ma jinbidel l-istat attiv tat-tunnel.

### Noti dwar it-Tunnel

- L-URLs ta’ Quick Tunnel huma temporanji u jinbidlu wara kull startjar mill-ġdid.
- Quick Tunnels ma jiġux irrestawrati awtomatikament wara startjar mill-ġdid ta’ OmniRoute jew tal-container. Erġa’ attivahom mid-dashboard meta jkun meħtieġ.
- L-installazzjoni ġestita bħalissa tappoġġa Linux, macOS, u Windows fuq `x64` / `arm64`.
- Managed Quick Tunnels jużaw it-trasport HTTP/2 awtomatikament biex jevitaw twissijiet storbjużi dwar il-buffer UDP ta’ QUIC f’ambjenti ta’ containers b’riżorsi limitati. Issettja `CLOUDFLARED_PROTOCOL=quic` jew `auto` jekk trid trasport differenti.
- L-images ta’ Docker jinkludu ċ-ċertifikati CA ewlenin tas-sistema u jgħadduhom lil `cloudflared` ġestit, u dan jevita nuqqasijiet ta’ fiduċja TLS meta t-tunnel jinbeda minn ġewwa l-container.
- Issettja `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jekk trid li OmniRoute juża binary eżistenti minflok iniżżel wieħed.

## Tags tal-Image

| Image                    | Tag      | Daqs   | Deskrizzjoni                                                   |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | L-ogħla SemVer stabbli **ppubblikat** (mhux il-`main` ta’ git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Iffissa din il-klassi ta’ tag għal GitOps                      |

Manifest għal diversi pjattaformi: `linux/amd64` + `linux/arm64` nattivi (Apple Silicon, AWS Graviton, Raspberry Pi). Docker jagħżel awtomatikament l-arkitettura korrispondenti; għaddi `--platform linux/amd64` jekk ikollok bżonn tisforza l-emulazzjoni AMD64 fuq hosts ARM.

### Kanali tar-Rilaxx

OmniRoute jippubblika kanali Docker separati għal rilaxxi stabbli, ittestjar tal-fergħa tar-rilaxx attiva, u builds tal-iżvilupp.

| Kanal                           | Sors                                       | Mutabbiltà                            | Użu rakkomandat                                                                                                                         |
| ------------------------------- | ------------------------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Rilaxx iffirmat/b’verżjoni                 | Immutabbli                            | Skjeramenti tal-produzzjoni li jiffissaw rilaxx eżatt                                                                                   |
| `:latest` / `:latest-web`       | L-ogħla SemVer stabbli **ppubblikat**      | Puntatur stabbli mutabbli             | Isegwi r-rilaxxi stabbli **wara** kompitu ta’ pubblikazzjoni SemVer — **ma** jsegwix `main` jew commits mhux rilaxxati ta’ `release/v*` |
| `:next` / `:next-web`           | Il-fergħa predefinita attwali `release/v*` | Puntatur ta’ qabel ir-rilaxx mutabbli | Ittestjar ta’ soluzzjonijiet li ddaħħlu fil-fergħa tar-rilaxx attiva iżda għadhom mhumiex f’rilaxx stabbli                              |
| `:main` / `:main-web`           | Il-fergħa `main`                           | Puntatur tal-iżvilupp mutabbli        | Għall-iżvilupp u l-ittestjar tal-integrazzjoni biss                                                                                     |

#### Fornituri ta’ sessjonijiet web: l-images `-web`

Kull kanal hawn fuq għandu wkoll tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), mibni mill-istadju `runner-web` — l-istess image flimkien ma’ Playwright u browser Chromium. L-image ordinarja tiġi **mingħajr** Chromium; `gemini-web`, `claude-web` u `claude-turnstile` jeħtiġuh.

Il-falliment jiġi pospost u ma jseħħx waqt l-istartjar: dawk il-fornituri jelenkaw il-mudelli tagħhom u jidhru bħala konnessi fid-dashboard, u l-ewwel talba biss tfalli bi

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jekk tuża dawk il-fornituri, niżżel it-tag `-web` tal-kanal li diġà qed tuża — xejn aktar ma jinbidel. Fuq installazzjoni npm/CLI (mingħajr image Docker), il-parti nieqsa ekwivalenti hija l-binary tal-browser: ħaddem `npx playwright install chromium` fuq il-host.

#### Kif tuża l-kanal ta’ qabel ir-rilaxx

Il-kanal `next` jinbena mill-ġdid ma’ kull push lejn il-fergħa predefinita attwali `release/v*` u jiġi ppubblikat kemm għal AMD64 kif ukoll għal ARM64. Fergħat ta’ manutenzjoni eqdem ma jistgħux jissostitwuh. Il-kanal jipprovdi immaġni li tista’ tinġibed għal tiswijiet li jkunu ġew inkorporati fil-fergħa tar-rilaxx attiva qabel ma tinħoloq it-tikketta stabbli li jmiss.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Għal Docker Compose, issostitwixxi t-tikketta tal-immaġni użata mill-profil magħżul, imbagħad iġbed u oħloq mill-ġdid is-servizz:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sikurezza u ritorn lura

`next` huwa kanal varjabbli ta’ qabel ir-rilaxx. Jista’ jinbidel ma’ kwalunkwe push lejn il-fergħa tar-rilaxx attiva u **mhuwiex appoġġjat għall-użu fil-produzzjoni**. Waħħal id-diġest tal-immaġni waqt li tkun qed tevalwa build speċifika:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Qabel l-ittestjar, agħmel backup tal-volum tad-data ta’ OmniRoute jew tad-direttorju tad-data mmuntat b’bind. Biex tmur lura, irrestawra l-verżjoni stabbli jew id-diġest li ntuża qabel u oħloq mill-ġdid il-kontenitur:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build ta’ fergħa tar-rilaxx qatt ma jista’ jmexxi `latest`; verżjoni semantika stabbli eliġibbli biss tista’ tippromwovi l-indikatur stabbli. L-immaġnijiet `next` iżommu l-ispezzjoni tal-immaġni tar-rilaxx u l-kontroll li jimblokka vulnerabbiltajiet CRITICAL.

**`latest` mhuwiex garanzija li git huwa aġġornat.** Tiswijiet inkorporati f’`main` jew fil-fergħa attiva `release/v*` **ma jkunux** f’`:latest` sakemm tiġi ppubblikata immaġni SemVer stabbli u l-kompitu tal-pubblikazzjoni jippromwovi `:latest` (bl-istess diġest bħal dik is-SemVer). Jekk `latest` jidher wieqaf filwaqt li GitHub diġà juri t-tiswija, iġbed `:next` biex tittestja l-fergħa tar-rilaxx jew stenna t-tikketta SemVer.

| Dak li trid                                                                     | Uża                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------- |
| GitOps / produzzjoni li ma tridx li tinbidel                                    | Waħħal `:X.Y.Z` (jew id-diġest tal-immaġni) |
| Segwi r-rilaxxi stabbli ppubblikati u aċċetta ħolqien mill-ġdid ma’ kull rilaxx | `:latest`                                   |
| Ittestja commits mhux rilaxxati ta’ `release/v*`                                | `:next` (mhux għall-produzzjoni)            |
| Ittestja `main`                                                                 | `:main` (mhux għall-produzzjoni)            |

## Disponibbiltà: SQLite predefinit għandu replika waħda

OmniRoute standard fuq Docker / Kubernetes huwa **proċess Node wieħed + proċess wieħed li jikteb fuq SQLite**. Disponibbiltà għolja **mhijiex appoġġjata** fuq din it-topoloġija.

| Restrizzjoni                                                 | Konsegwenza                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proċess wieħed li jikteb                                     | **Tħaddimx** diversi repliki fuq l-istess fajl SQLite. Dan jikkorrompi d-DB.                                                                                                                                                                                                                                                                                            |
| Ħolqien mill-ġdid / restart / terminazzjoni minn HEALTHCHECK | **Qtugħ totali** tal-SSE kollha li jkunu għaddejjin, tas-sessjonijiet tad-dashboard, u tal-istat fil-memorja. Kull klijent konness jinqata'. Talbiet ġodda matul il-perjodu mingħajr endpoint jirċievu **`502 Bad Gateway: Unknown error`** mir-reverse proxy, mhux JSON ta' OmniRoute — il-klijenti ma jistgħux jiddistingwu dan minn falliment tal-fornitur (#11015). |
| L-istess event loop bħal `/healthz`                          | Ċiklu okkupat tal-katalgu jew tal-kompressjoni jista' jdewwem il-probes; timeout qasir imbagħad jerġa' jibda l-**unika** replika.                                                                                                                                                                                                                                       |

**Matriċi tal-probes** (ara wkoll [ir-rakkomandazzjonijiet għall-probes ta' Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                 | Mira                                                           | Tużax                                                     |
| --------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| Liveness              | TCP fuq `PORT` (predefinit `20128`), jew HTTP artab `/healthz` | `/api/monitoring/health`                                  |
| Readiness             | HTTP `GET /healthz`                                            | Timeouts stretti li jqisu event loop okkupat bħala mejjet |
| Approfondit / bnedmin | `/api/monitoring/health`                                       | Liveness awtomatizzat tal-kubelet                         |

**Aġġornamenti:** stenna li kull sessjoni tinqata'. Neħħi gradwalment il-klijenti jekk tista'; m'hemm ebda rolling update fuq SQLite predefinit. Compose `restart: unless-stopped` flimkien ma' Docker `HEALTHCHECK` se jissostitwixxu wkoll l-uniku proċess meta l-container ikun Unhealthy — bl-istess firxa ta' impatt.

Snippet ta' Kubernetes għal **replika waħda** (Recreate huwa meħtieġ; iżżidx `replicas` meta jintuża fajl SQLite wieħed):

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

L-istennija ta' `preStop` tippermetti lil kube ineħħi l-endpoints tas-Service qabel SIGTERM sabiex traffiku **ġdid** jieqaf jasal għand il-proċess li jkun qed jintemm. L-SSE ta' `/v1/responses` li tkun għaddejja tingħata sa `SHUTDOWN_TIMEOUT_MS` (30s b'mod predefinit) biex titlesta permezz ta' leases ta' ammissjoni heavyweight (#11015). Talbiet ġodda li xorta jilħqu l-proċess jirċievu `503` + `Retry-After: 5`. Il-perjodu ta' Recreate mingħajr endpoint sakemm is-sostitut ikun Ready jibqa' qtugħ sħiħ — dik hija t-topoloġija ta' SQLite, mhux konfigurazzjoni ħażina tal-probe.

Postgres estern / HA b'diversi proċessi li jiktbu **mhuwiex** metodu standard dokumentat. Jekk teħtieġ HA, żomm replika waħda jew ħaddem topoloġija li l-proġett ikun ittestja u ddokumenta separatament. Ix-xogħol fuq Postgres/MySQL jinsab f'[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Sakemm dan jiġi rilaxxat, l-uniku mod appoġġjat biex timmultiplika l-kapaċità għal talbiet **kbar** ta' `/v1/responses` huwa permezz ta' N proċessi indipendenti (it-taqsima li jmiss), mhux `replicas > 1` fuq volume wieħed.

## Skalabbiltà orizzontali: N proċessi indipendenti

Proċess Node wieħed huwa **heap V8 wieħed**. Żewġ talbiet tal-aġent tal-kodifikazzjoni `POST /v1/responses` (RTK + Caveman) li jikkoinċidu, ta’ ~3 MiB / ~750k token kull waħda, iwaqqfu dak il-heap f’madwar 12 Gi (`FATAL ERROR: Reached heap limit`) u jistgħu jikkawżaw OOM f’cgroup ta’ 16 Gi. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Dak il-kejl huwa twissija dwar il-**baġit tal-memorja**, mhux massimu assolut tal-prodott ta’ żewġ talbiet twal konkorrenti għal `/v1/responses`. L-ammissjoni ta’ chats tqal hija kkontrollata minn baġit tal-bytes tad-dħul derivat awtomatikament (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ikkalkulat mill-istess limitu ta’ V8/cgroup — jekk dan jiġi ssostitwit b’valur ogħla (jew jiġi ssettjat il-limitu l-antik tal-għadd ta’ talbiet `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) fuq proċess li diġà ġie dimensjonat, l-abort jerġa’ jseħħ. Chats żgħar, `/healthz`, `/v1/models`, u MCP **mhumiex** inklużi f’dak il-limitu.

### Proċess wieħed: aktar minn żewġ `/v1/responses` twal

Proċess **b’saħħtu** (heap taħt `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, b’valur predefinit ta’ `0.75`) **jista’** jħaddem aktar minn żewġ talbiet twal konkorrenti `POST /v1/responses` meta jkun għad hemm spazju fil-baġit tal-bytes waqt l-eżekuzzjoni għall-proċess kollu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Bodies ta’ daqs daqs jew akbar minn `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (b’valur predefinit ta’ 256 KiB) jieħdu l-istess lease tqil bħat-talbiet b’struttura tqila u jużaw l-istess mekkaniżmu ta’ ħruġ `tryAcquireHealthyHeadroom` ta’ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Għexieren ta’ klijenti SSE twal konkorrenti (l-operaturi spiss jeħtieġu 40–50) huma kwistjoni ta’ **baġit tal-memorja** — iddimensjona l-heap + is-slots primarji/ta’ headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — mhux limitu assolut tal-prodott ta’ “massimu ta’ 2”. Heap taħt pressjoni xorta jwarrab it-talbiet b’`503` li jista’ jerġa’ jiġi ppruvat, sabiex #7849 ma jerġax iseħħ.

Biex **timmultiplika l-heaps** (old-spaces V8 indipendenti) **illum**:

| Agħmel                                                                                                                                                                                           | Tagħmilx                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Ħaddem **N containers/pods**, kull wieħed bid-`DATA_DIR` / volume **tiegħu stess**                                                                                                               | Tissettjax `replicas > 1` fuq fajl SQLite wieħed                          |
| Iddimensjona l-in-flight tqil + il-healthy-headroom skont il-baġit tal-heap / tal-bytes waqt l-eżekuzzjoni; 1–2 huwa l-valur predefinit konservattiv ta’ #7849, mhux massimu assolut tal-prodott | Tagħtix lil proċess wieħed RAM 8× u limitu tal-għadd bla restrizzjonijiet |
| Fakultattiv: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` għal **counters tal-kwota kondiviżi**                                                                                          | Tittrattax Redis bħala SQLite kondiviż — mhuwiex                          |
| Idduplika s-sigrieti tal-fornituri f’kull istanza (jew aċċetta dashboards partizzjonati)                                                                                                         | Tistenniex dashboard wieħed / call-log wieħed bejn l-istanzi              |
| Poġġi kwalunkwe load balancer quddiemhom; sticky routing skont API key jew session huwa biżżejjed                                                                                                | Tirrikjedix middleware speċifiku għal fornitur u konxju mid-daqs          |

Hardware: l-għadd ta’ `/v1/responses` twal konkorrenti għal kull istanza huwa kwistjoni ta’ **baġit tal-memorja** (heap + inflight-byte / #10110). `N` `DATA_DIR`s indipendenti xorta jimmultiplikaw il-heaps: ir-RAM tal-host trid tkopri `N × cgroup`, mhux “pod wieħed ta’ 16 Gi b’N=8.” Qatt tuża `replicas > 1` fuq fajl SQLite wieħed.

Abbozz ta’ Compose (żewġ heaps, żewġ volumes — mhux `deploy.replicas: 2`):

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

Id-densità fi ħdan il-proċess (bil-kompressjoni barra mill-HTTP isolate) tinsab f’[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster loġiku wieħed fuq stat persistenti kondiviż jinsab f’[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Żbalji reġjonali ta’ Gemini ġewwa Docker

Google AI Studio / Gemini API jista’ jirritorna HTTP 400 b’FAILED_PRECONDITION u
`User location is not supported for the API use.` Talba li tirnexxi fuq il-host
ma tippruvax li l-container juża l-istess rotta tal-ħruġ. L-ordni tad-DNS,
il-konnettività IPv4/IPv6, ir-routing tal-VPN u l-proxies ikkonfigurati jistgħu jvarjaw. Iċċekkja
[r-reġjuni appoġġjati minn Google](https://ai.google.dev/gemini-api/docs/available-regions)
kif ukoll ir-rotta effettiva tal-konnessjoni; dan l-iżball waħdu ma jindikax API key ħażina.

### Ippreferi proxy speċifiku għall-konnessjoni

Uża l-[konfigurazzjoni tal-proxy għal kull konnessjoni](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ta’ OmniRoute għall-konnessjoni Gemini affettwata, imbagħad irrepeti **Test Connection** u talba żgħira
bl-istess mudell. Dan iżomm il-bidla fir-routing limitata għal dik il-konnessjoni. Ivverifika
li l-proxy jista’ jintlaħaq mill-container, u li l-konnessjoni tassew tagħżlu.
Il-bidla tar-rotta ma tiggarantix l-eliġibbiltà reġjonali min-naħa tas-servizz estern.

### Qabbel in-networking tal-host u tal-container

Żomm il-key, il-mudell u t-talba identiċi meta tqabbel riżultati awtentikati; qatt
twaħħal credentials, passwords tal-proxy jew headers sħaħ tal-awtorizzazzjoni f’issue.
L-ewwel spezzjona liema familji ta’ indirizzi joffri r-resolver tal-OS, billi tuża l-istess kmand
fuq il-host u ġewwa l-container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Issostitwixxi `omniroute` bis-servizz li tħaddem (pereżempju, `omniroute-web`). Dawn
il-kmandi jistampaw il-familji tal-indirizzi mingħajr credentials jew indirizzi IP. Valur `6`
irritornat juri biss riżultat DNS tal-IPv6: **ma** jippruvax li hemm rotta IPv6 li tista’ tintuża jew aċċess għall-API.
Fejn hemm `curl` installat, qabbel `curl -4 -I https://generativelanguage.googleapis.com`
ma’ `curl -6 -I https://generativelanguage.googleapis.com` fiż-żewġ ambjenti.
Rispons HTTP jipprova l-konnettività għal dak il-probe, anke jekk ikun żball mhux awtentikat;
it-talba awtentikata lill-mudell biss tittestja l-eliġibbiltà ta’ Gemini.

### Alternattiva fil-livell tal-host: IPv6 li jaħdem u politika tar-resolver

Min irrapporta [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) irrestawra
l-aċċess fl-ambjent tiegħu billi attiva l-IPv6 tal-container u biddel l-għażla tal-indirizzi
ta’ glibc. Ittratta dan bħala alternattiva speċifika għall-ambjent. Ikkonferma li l-IPv6 tal-host
qed jaħdem, kif ukoll l-egress/ir-routing tal-container u r-regoli tal-firewall, qabel taġġusta l-preferenzi tar-resolver.
Indirizz ULA privat waħdu ma jistabbilixxix konnettività IPv6 pubblika.

Għal servizzi li diġà huma mqabbda man-network default ta’ Compose, dan il-framment jattiva
l-IPv6 fuq dak in-network; żomm il-bqija tas-servizz, il-ports, il-volumes u l-konfigurazzjoni tiegħek:

```yaml
networks:
  default:
    enable_ipv6: true
```

Għal network b’isem, attivah fuq in-network li s-servizz effettivament jingħaqad miegħu. Docker jista’
jalloka subnet ULA; agħżel subnet espliċita u li ma tirkibx fuq oħrajn biss meta n-network tiegħek
ikun jeħtieġha. Ara [in-networking IPv6 ta’ Docker](https://docs.docker.com/engine/daemon/ipv6/)
u [l-għażliet tan-network ta’ Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Fuq **image ibbażata fuq glibc**, `/etc/gai.conf` jista’ jibdel l-għażla tal-indirizzi. Id-Dockerfile
attwali tar-repository juża Debian; images personalizzati bbażati fuq musl ma jużawx dan il-mekkaniżmu.
L-aġġustament irrappurtat jibdel it-tikketta ULA minn `label fc00::/7 6` għal
`label fc00::/7 1`. Ibda mit-tabella sħiħa tal-politika tal-image u żomm l-entrati l-oħra tagħha:
iż-żieda ta’ entrata `label` jew `precedence` tissostitwixxi dik it-tabella default, għalhekk file
li fih biss il-linja mibdula mhuwiex biżżejjed. Ir-
[referenza tal-konfigurazzjoni ta’ glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
tiddokumenta dik l-imġiba. Agħmel bind-mount tal-file rivedut bħala read-only f’`/etc/gai.conf`
u erġa’ oħloq is-servizz biex tapplikah.

Dan ibiddel l-għażla tal-indirizzi tal-OS għat-**traffiku kollu tal-ħruġ f’dak il-container**.
Ma jġiegħelx lil kull applikazzjoni tagħżel IPv6: l-ordni tad-DNS u l-għażla tal-konnessjoni
ta’ Node huma importanti wkoll. B’mod partikolari, `--dns-result-order=ipv4first` jippreferi IPv4 u
mhuwiex rimedju għal falliment li jseħħ biss bl-IPv4. Ara [l-ordni tad-DNS ta’ Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Erġa’ ttestja Gemini u l-providers l-oħra tiegħek wara kwalunkwe bidla fil-livell tal-host. Biex tmur lura,
neħħi l-mount personalizzat ta’ `gai.conf`, irrestawra l-konfigurazzjoni preċedenti tan-network u
erġa’ oħloq is-servizz/in-network affettwat waqt tieqa ta’ manutenzjoni. Il-ħolqien mill-ġdid ta’ network
jista’ jinterrompi containers oħra mqabbda miegħu; tħassarx il-volume tad-data persistenti.

## Noti Importanti

- **Modalità WAL ta’ SQLite:** `docker stop` għandu jitħalla jitlesta sabiex OmniRoute jkun jista’ jagħmel checkpoint tal-aħħar bidliet lura f’`storage.sqlite`. Il-fajls Compose inklużi diġà jistabbilixxu perjodu ta’ grazzja ta’ 40s għall-waqfien. Jekk tħaddem l-immaġni direttament, żomm `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Issettjah għal `true` jekk il-backups ta’ rutina/ta’ qabel il-kitba jiġu ġestiti esternament. Il-migrazzjonijiet ta’ databases eżistenti xorta jeħtieġu snapshot ta’ sikurezza durabbli tagħhom stess u protezzjoni għall-migrazzjoni tal-massa.
- **Persistenza tad-Data:** Dejjem immonta volum ma’ `/app/data` sabiex tippersisti d-database, iċ-ċwievet u l-konfigurazzjonijiet tiegħek bejn bidu mill-ġdid tal-container.
- **Konfigurazzjoni tal-Port:** Issostitwixxi l-varjabbli tal-ambjent `PORT` biex tibdel il-port predefinit `20128`.

## Ara Wkoll

- [Gwida għall-Użu fuq VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Konfigurazzjoni ta’ VM + nginx + Cloudflare
- [Gwida għall-Użu fuq Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Uża fuq Fly.io
- [Konfigurazzjoni tal-Ambjent](../reference/ENVIRONMENT.md) — Referenza kompluta ta’ `.env`
