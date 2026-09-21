# 🐳 Docker Guide — OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referenza kompleta għall-iskjerament b’Docker. Għal bidu rapidu, ara t-[taqsima dwar Docker fir-README](../README.md#-docker).

## Werrej

- [Tħaddim Rapidu](#quick-run)
- [B’Fajl tal-Ambjent](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profili Disponibbli](#available-profiles)
- [Konfigurazzjoni tal-għodod CLI tal-host meta OmniRoute jaħdem f’Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar ta’ Redis](#redis-sidecar)
- [Compose għall-Produzzjoni](#production-compose)
- [Stadji tad-Dockerfile](#dockerfile-stages)
- [Varjabbli Kritiċi tal-Ambjent](#critical-environment-variables)
- [Docker Compose b’Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Mina Rapida ta’ Cloudflare](#cloudflare-quick-tunnel)
- [Tikketti tal-Immaġni](#image-tags)
- [Disponibbiltà: SQLite predefinit għandu replika waħda](#availability-default-sqlite-is-single-replica)
- [Noti Importanti](#important-notes)

---

## Tħaddim Rapidu

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## B’Fajl tal-Ambjent

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
# Profil bażi (mingħajr għodod CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw integrati)
docker compose --profile cli up -d

# Profil tal-host (primarjament għal Linux; jimmonta l-binarji CLI tal-host għall-qari biss)
docker compose --profile host up -d

# Għaqqad CLI + sidecar ta’ CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profili Disponibbli

OmniRoute jiġi b’erba’ profili ta’ Compose. Agħżel dak li jaqbel mal-ambjent tiegħek.

| Profil              | Servizz          | Meta għandek tużah                                                                                                                                       | Kmand                                        |
| ------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinit) | `omniroute-base` | Server mingħajr interfaċċa grafika / runtime minimu, mingħajr CLIs tal-fornituri inklużi                                                                 | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Flussi tax-xogħol aġentiċi li jsejħu `omniroute providers/setup/doctor` u CLIs inklużi (Codex, Claude Code, Droid, OpenClaw)                             | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Hosts Linux li jridu aċċess simili għal `network_mode` għall-CLIs tal-host billi jimmontaw `~/.local/bin`, `~/.codex`, `~/.claude`, eċċ. għall-qari biss | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Ħaddem is-sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) fuq il-port `8317` għall-proxying ta’ CLI upstream                         | `docker compose --profile cliproxyapi up -d` |

> Jistgħu jingħaqdu diversi profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurazzjoni tal-għodod CLI tal-host meta OmniRoute jaħdem f'Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` u l-buttuna
**Issejvja l-konfigurazzjoni** tad-dashboard kollha jiktbu fajls bħal `~/.codex/*.config.toml`. Dawk il-mogħdijiet
ikollhom tifsira biss fuq il-magna fejn fil-fatt ikun qed jaħdem is-CLI. Jekk tħaddimhom
ġewwa l-container, il-kitba tispiċċa fid-direttorju home tal-container stess (`/home/node` —
l-image taħdem bħala `USER node`), fejn l-ebda CLI tal-host qatt mhu se jaqraha u fejn din
tintrema malli l-container jerġa' jinħoloq.

OmniRoute jinduna b'dan u jirrifjuta l-kitba filwaqt li jagħti istruzzjonijiet minflok
jirrapporta suċċess li ma tistax tuża: is-CLI joħroġ b'`2`, u l-API twieġeb `422`
b'`containerEphemeralTarget: true`.

### Rakkomandat: ħaddem is-CLI fuq il-host, u OmniRoute f'Docker

Il-container jipprovdi l-API; is-CLI jikkonfigura l-għodod tal-host tiegħek.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ipponta s-CLI lejn il-container
omniroute setup-codex                      # jikteb fil-~/.codex reali fuq il-host tiegħek
```

Din hija l-għażla t-tajba meta Codex, Claude Code, Cursor jew għodod simili jaħdmu fuq
il-laptop tiegħek — li hija l-konfigurazzjoni tas-soltu.

### Alternattiva: immonta d-direttorji tal-konfigurazzjoni tal-host b'bind mount (profil `host`)

Jekk trid li l-container innifsu jikteb il-konfigurazzjoni tal-host tiegħek, immonta
d-direttorji fih u pponta `CLI_CONFIG_HOME` lejn l-għerq tal-mount. Il-profil `host`
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
`/proc/self/mountinfo` u jippermetti l-kitba f'mogħdijiet immuntati (u f'direttorji
li wliedhom huma mounts, li hija eżattament l-istruttura ta' `/host-home` hawn fuq), filwaqt li
xorta jirrifjuta dawk mhux immuntati.

### Soluzzjoni ta' emerġenza: ikkonfigura s-CLIs tal-container stess (użaha b'kawtela)

Meta s-CLIs ikunu ġenwinament ġewwa l-container (il-profil `cli`), il-kitba
tkun intenzjonata. Għaddi `--allow-container-write` lil kwalunkwe kmand `setup-*`, jew issettja
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` għas-server. Il-kitba tipproċedi
bi twissija li mhix se tibqa' teżisti wara l-container.

> **Twissija ta' sigurtà — profil `cli` + mount ta' `docker.sock`.**
> Il-profil `cli` jagħmel bind mount ta' `/var/run/docker.sock` sabiex l-aġġornatur
> awtomatiku ġewwa l-container ikun jista' jerġa' joħloq l-istack mid-daemon tal-host
> (`src/lib/system/autoUpdate.ts` jiċċekkja għal dak is-socket u jaqbeż il-mogħdija
> ta' Docker meta ma jkunx hemm). Dak is-socket huwa **konfini ta' fiduċja b'aċċess root
> għall-host**: kull ħaġa li tista' taċċessah tikkontrolla d-daemon ta' Docker tal-host bħala
> root — tista' toħloq, tispezzjona, twaqqaf u tneħħi kwalunkwe container fuq il-host.
> Implikazzjonijiet:
>
> 1. **Qatt tesponi l-port tal-profil `cli` għan-network.** Ippubblikah
>    fuq `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` aċċessibbli mil-LAN jibdel kwalunkwe RCE fil-livell tad-dashboard
>    f'kompromess sħiħ tal-host.
> 2. **Tagħmilx bind mount ta' direttorji addizzjonali tal-host fil-profil `cli`.**
>    Is-socket ta' Docker flimkien ma' kwalunkwe mount ieħor jagħti lill-container aċċess sħiħ
>    ta' qari/kitba għas-sistema tal-fajls u l-konfigurazzjoni tal-host tiegħek. Jekk teħtieġ li għodda
>    tara proġett, ħaddimha lokalment bil-binarju tas-CLI — timmontahiex
>    fil-container `cli`.
>
> Jekk m'għandekx bżonn aġġornament awtomatiku ġewwa l-container, ħalli l-profil `cli` mitfi
> (`COMPOSE_PROFILES=core,redis` jew iqsar). Il-profili l-oħra ma
> jimmontawx is-socket ta' Docker.
>
> Ara `docs/security/MITM-TPROXY-DECRYPT.md` (git; mhux ikkompilat f'`/docs`) għall-mudell ta' theddid relatat
> mal-MITM, u `docs/security/SUPPLY_CHAIN.md` għall-katina tal-provenjenza tal-binarji
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar ta’ Redis

OmniRoute jiddependi fuq Redis biex jappoġġja l-limitatur distribwit tar-rata u l-cache kondiviża. Is-servizz `redis` huwa **dejjem definit** f’`docker-compose.yml` (m’għandu ebda restrizzjoni tal-profil) u jinbeda flimkien ma’ kwalunkwe profil ieħor.

| Dettall                       | Valur                                                    |
| ----------------------------- | -------------------------------------------------------- |
| Immaġni                       | `redis:7-alpine`                                         |
| Isem tal-kontejner            | `omniroute-redis`                                        |
| Port intern                   | `6379`                                                   |
| Port tal-host (sostituzzjoni) | `REDIS_PORT` (il-valur predefinit huwa `6379`)           |
| Bind tal-host (sostituzzjoni) | `REDIS_BIND_HOST` (il-valur predefinit huwa `127.0.0.1`) |
| Volum                         | `omniroute-redis-data` → `/data`                         |
| Kontroll tas-saħħa            | `redis-cli ping` (intervall ta’ 10s)                     |

Varjabbli tal-ambjent relatati:

- `REDIS_URL` — string tal-konnessjoni injettata fl-applikazzjoni (`redis://redis:6379` b’mod predefinit).
- `REDIS_PORT` — immappjar tal-port fuq in-naħa tal-host għall-kontejner Redis.
- `REDIS_BIND_HOST` — l-interfaċċa tal-host li fuqha jiġi ppubblikat il-port. Il-valur predefinit huwa `127.0.0.1`.

> **Għaliex loopback b’mod predefinit:** is-sidecar jaħdem mingħajr `requirepass`, u l-kontejners
> tal-applikazzjoni jaċċessawh permezz tan-network ta’ compose (`redis:6379`) — il-port ippubblikat
> qiegħed hemm biss għal għodod fuq in-naħa tal-host (`redis-cli`, `npm run dev` lokali). Il-pubblikazzjoni fuq
> `0.0.0.0` tesponi Redis mingħajr awtentikazzjoni għal kull host fuq il-LAN tiegħek. Jekk tissettja
> `REDIS_BIND_HOST=0.0.0.0`, żid ukoll `--requirepass` ma’ `command:` tas-servizz.

**Mhux rakkomandat li Redis jiġi diżattivat** (il-limitatur tar-rata se jiddegrada għal fallback fil-memorja). Jekk ikun meħtieġ, jew neħħi/ikkummenta l-blokka tas-servizz `redis:` f’`docker-compose.yml`, jew skalah għal żero:

```bash
docker compose up -d --scale redis=0
```

## Compose għall-Produzzjoni

Għal snapshot iżolat tal-produzzjoni li jaħdem flimkien mal-iżvilupp, uża `docker-compose.prod.yml`.

| Dettall                       | Valur                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| Fajl                          | `docker-compose.prod.yml`                                                                   |
| Port predefinit tad-dashboard | `PROD_DASHBOARD_PORT=20130` (immappjat għall-port intern `${DASHBOARD_PORT:-20128}`)        |
| Port predefinit tal-API       | `PROD_API_PORT=20131`                                                                       |
| Immaġni                       | `omniroute:prod` (mibnija mit-target `runner-cli`)                                          |
| Kontejner Redis               | `omniroute-redis-prod` (`redis:8.6.2`, volum dedikat `redis-prod-data`)                     |
| Volum tad-data                | `omniroute-prod-data` (imsemmi, jinżamm bejn build mill-ġdid u ieħor)                       |
| Kontrolli tas-saħħa           | `node healthcheck.mjs` + `redis-cli ping`, b’`depends_on` jiddependi fuq is-saħħa ta’ Redis |

Kif tużah:

```bash
# Ibni u niedi l-istack tal-produzzjoni
docker compose -f docker-compose.prod.yml up -d --build

# Uri l-logs kontinwament
docker compose -f docker-compose.prod.yml logs -f

# Waqqaf u neħħi l-istack (żomm il-volumi)
docker compose -f docker-compose.prod.yml down
```

L-istack tal-produzzjoni jaħdem b’mod parallel ma’ compose tal-iżvilupp (ismijiet tal-kontejners, ports u volumi differenti), għalhekk tista’ tkompli tagħmel bidliet lokalment waqt li l-produzzjoni tibqa’ taħdem.

## Stadji tad-Dockerfile

Ir-repożitorju jinkludi Dockerfile b’diversi stadji (`Dockerfile`). Hemm tliet stadji disponibbli; agħżel it-`target` it-tajjeb għall-każ tal-użu tiegħek.

| Stadju        | Immaġni bażi          | Għan                                                                                                                                                                         |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Jinstalla d-dipendenzi (`npm ci --legacy-peer-deps`) u jħaddem `npm run build` (Turbopack b’mod awtomatiku — ara r-Riżorsi waqt il-build hawn taħt)                          |
| `runner-base` | `node:26-trixie-slim` | Ambjent ta’ eżekuzzjoni tal-produzzjoni bl-output standalone ta’ Next.js. **Ma jinkludi l-ebda CLI tal-fornituri.**                                                          |
| `runner-cli`  | `runner-base`         | Iżid `git`, `docker.io`, `docker-compose` u CLIs globali: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agħżel dan għal flussi tax-xogħol aġentiċi.** |

Ibni `target` speċifiku manwalment:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Riżorsi waqt il-build

Tliet argumenti tal-build jikkontrollaw kemm jiswa l-istadju `builder`. Dawn japplikaw biss waqt il-build —
`OMNIROUTE_MEMORY_MB` (hawn taħt) huwa kontroll separat għall-ħin tal-eżekuzzjoni.

| Argument tal-build          | Valur awtomatiku | Effett                                                                                          |
| --------------------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`              | `0` jibni b’webpack minflok. Użu massimu tal-memorja aktar baxx, iżda aktar bil-mod.            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`           | Limitu tal-heap ta’ V8 (`--max-old-space-size`) għall-`next build` imniedi.                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`              | Jipprovdi `CIRCLE_NODE_TOTAL`; Next jikkalkula `workers = N - 1` għall-ġbir tad-data tal-paġni. |

`OMNIROUTE_BUILD_WORKERS` huwa dak li għandek iżżid fuq builder kbir u dak li
għandek tissuspetta meta build b’riżorsi limitati jieqaf **wara** `✓ Compiled successfully`. Kull
worker tad-data tal-paġni huwa proċess għalih, u l-istess japplika għall-proċess prinċipali
`next build`; riproduzzjoni diretta fuq VPS (issue #7518) kejlet il-massimu tal-RSS ta’
kull proċess għal ~4.5 GB indipendentement mill-flag tal-heap `NODE_OPTIONS` (Turbopack
jikkompila f’memorja nattiva/Rust barra mill-heap ta’ V8). Il-valur awtomatiku ta’ `2`
(→ worker wieħed, 2 proċessi b’kollox) huwa adattat għar-runners ospitati minn GitHub
b’16 GB / 4 vCPU li juża l-pipeline tal-pubblikazzjoni. B’`8` (→ 7 workers), dak ir-runner
spiċċalu l-memorja u buildkit falla l-pass b’`ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) xorta ma kienx biżżejjed ladarba l-RSS għal kull proċess tkejjel
direttament minflok ġie inferit. `tests/unit/docker-build-memory-budget.test.ts`
jagħmel il-kalkoli abbażi tal-valur imkejjel u jfalli jekk xi wieħed mill-kontrolli
jaqbeż il-kapaċità tar-runner.

Turbopack jikkompila f’memorja Rust nattiva li tinsab **barra** mill-heap ta’ V8, għalhekk
`OMNIROUTE_BUILD_MEMORY_MB` ma jillimitahiex. Fuq host b’limitu tal-memorja, il-build
imbagħad jiġi tterminat b’SIGKILL mill-OOM killer mingħajr ebda test ta’ żball — sempliċement
jieqaf f’nofs `Creating an optimized production build`, u għalhekk jidher li weħel aktar
milli spiċċatlu l-memorja. Jekk il-host tal-build għandu riżorsi limitati, ibdel il-bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` huwa attivat, għalhekk `next build` iħaddem proċess prinċipali **u**
proċess worker, u kull wieħed jirrispetta `OMNIROUTE_BUILD_MEMORY_MB` separatament. Issettja
l-limitu tal-container għal bejn wieħed u ieħor aktar mid-doppju ta’ dak il-valur, mhux darba biss.

Imkejjel fuq din is-siġra (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limitu tal-container | Riżultat                                 |
| --------- | -------------------- | ---------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | Itterminat mill-OOM fit-tnejn, fis-skiet |
| webpack   | 8 GiB                | Il-build worker ġie tterminat b’SIGKILL  |
| webpack   | 12 GiB               | Irnexxa, b’massimu ta’ 11.1 GiB          |

### Valuri awtomatiċi waqt l-eżekuzzjoni

Valuri awtomatiċi esportati minn `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Imġiba tal-memorja f’Docker:

- L-immaġni tissettja `OMNIROUTE_MEMORY_MB=1024` u minnha tikkalkula `NODE_OPTIONS=--max-old-space-size=1024`.
- Il-proċess proprju tas-server jinbeda mil-launcher standalone, li jaqra `OMNIROUTE_MEMORY_MB` u jżid `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node juża l-aħħar valur ripetut ta’ `--max-old-space-size`, għalhekk l-issettjar ta’ `OMNIROUTE_MEMORY_MB` jikkontrolla l-limitu effettiv tal-heap ta’ Docker.
- Minħabba li l-immaġni dejjem tissettjah, il-valur alternattiv tal-launcher, ikkalibrat skont ir-RAM, qatt ma japplika taħt Docker. Żidu espliċitament skont it-tagħbija tax-xogħol (it-tabella hawn taħt). `2048` xorta huwa żgħir wisq għal `/v1/responses` ta’ aġenti tal-ipprogrammar.

### RAM waqt l-eżekuzzjoni għal aġenti tal-ipprogrammar

Il-valur awtomatiku ta’ 1 GiB f’Docker huwa minimu għal dashboard/chat ħafif, mhux daqs għall-produzzjoni. Bodies twal ta’ `POST /v1/responses` (mijiet ta’ messaġġi, għexieren ta’ għodod) iżommu diversi graffs fil-memorja waqt il-kompressjoni. Żewġ talbiet sovrapposti ta’ ~3 MiB / ~750k token waqqfu V8 b’old-space ta’ **12 GiB** (`FATAL ERROR: Reached heap limit`) u laħqu wkoll OOM ta’ cgroup ta’ 16 GiB. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Issettja **cgroup `--memory` ogħla mill-heap** — buffers nattivi, SQLite, u riżultati intermedji tal-kompressjoni jinsabu barra minn V8.

| Tagħbija tax-xogħol                                 | `OMNIROUTE_MEMORY_MB`          | Kontenitur / cgroup        | Noti                                                                                                                         |
| --------------------------------------------------- | ------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, chat ħafif wieħed                        | `1024` (default tal-immaġni)   | ≥2 GiB                     |                                                                                                                              |
| Aġent wieħed tal-kodifikazzjoni (Claude/Codex/Grok) | `8192`                         | ≥10 GiB                    | Sessjoni waħda tipika ta’ `/v1/responses`                                                                                    |
| Żewġ `/v1/responses` twal simultanji                | `10240`–`12288`                | ≥12–16 GiB                 | Ġie mkejjel abort ta’ V8 b’heap ta’ madwar 12 GiB                                                                            |
| Tliet kuntesti twal simultanji jew aktar            | tagħmilx dan fi proċess wieħed | issekwenzjahom / aktar RAM | L-ammissjoni awtomatika għal tagħbijiet tqal hija talba waħda għaddejja; jekk iżżidha mingħajr RAM terġa’ tintroduċi l-abort |

`omniroute serve` fuq bare metal jikkalibra għal madwar 35% tar-RAM (limitat għal `[512, 4096]`) meta `OMNIROUTE_MEMORY_MB` **ma jkunx issettjat**. Docker dejjem jissettjah għal `1024`, għalhekk dik il-kalibrazzjoni qatt ma titħaddem fl-immaġni uffiċjali.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Varjabbli Kritiċi tal-Ambjent

Lil hinn mill-valuri awtomatiċi ddokumentati f’[ENVIRONMENT.md](../reference/ENVIRONMENT.md), il-varjabbli li ġejjin huma l-aktar importanti meta jitħaddmu taħt Docker:

| Varjabbli                     | Għan                                                                                                                                                                                                                                                                        | Valur awtomatiku               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sigriet kondiviż għall-bridge WebSocket. **Meħtieġ fil-produzzjoni** — issettjah għal string każwali b’saħħitha.                                                                                                                                                            | mhux issettjat (irid jingħata) |
| `REDIS_URL`                   | String tal-konnessjoni għall-backend tal-limitatur tar-rata / cache                                                                                                                                                                                                         | `redis://redis:6379`           |
| `REDIS_PORT`                  | Port fuq in-naħa tal-host għall-container Redis inkluż                                                                                                                                                                                                                      | `6379`                         |
| `REDIS_BIND_HOST`             | Interfaċċa tal-host li fuqha jiġi ppubblikat il-port Redis inkluż (loopback sakemm ma żżidx AUTH)                                                                                                                                                                           | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Path tal-host immuntat fil-profil `cli` f’`/workspace/omniroute` għall-flussi tax-xogħol ta’ awtoaġġornament                                                                                                                                                                | `.` (direttorju attwali)       |
| `OMNIROUTE_MEMORY_MB`         | Limitu massimu tal-heap ta’ Node waqt l-eżekuzzjoni għas-server awtonomu Docker; jieħu post il-valur awtomatiku tal-image msemmi hawn fuq. Aġenti tal-kodifikazzjoni: `8192`+ (ara [RAM waqt l-eżekuzzjoni](#runtime-ram-for-coding-agents)).                               | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Jissostitwixxi l-ports esposti għad-dashboard (20128) u l-API (20129)                                                                                                                                                                                                       | `20128` / `20129`              |
| `APP_BIND_HOST`               | Interfaċċa tal-host li fuqha docker-compose jippubblika l-ports tad-dashboard/API/live-WS. B’`REQUIRE_API_KEY=false` (il-valur awtomatiku), `0.0.0.0` jesponi l-proxy anonimu `/v1` għal-LAN — wessa’ l-aċċess biss b’`REQUIRE_API_KEY=true` jew bi reverse proxy quddiemu. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Interfaċċa tal-host li fuqha docker-compose jippubblika s-sidecar `cliproxyapi` — il-volum tad-data tiegħu jżomm il-kredenzjali tal-fornitur.                                                                                                                               | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Direttorju li l-iskaner tal-plugins waqt l-eżekuzzjoni jaqra minnu u jinstalla fih. Issettjah meta l-plugins ikunu bind-mounted: il-valur awtomatiku jsegwi `HOME`, li image mhux bilfors tesporta.                                                                         | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Subpath tal-URL meta l-app tiġi ppubblikata wara reverse proxy (eż. `/omniroute`)                                                                                                                                                                                           | _(vojt = root)_                |
| `NEXT_PUBLIC_BASE_URL`        | Oriġini pubblika tal-browser inkluż is-subpath (eż. `https://host/omniroute`)                                                                                                                                                                                               | mhux issettjat                 |
| `PROD_DASHBOARD_PORT`         | Port tad-dashboard fuq in-naħa tal-host għal `docker-compose.prod.yml`                                                                                                                                                                                                      | `20130`                        |
| `CLIPROXYAPI_PORT`            | Port fuq in-naħa tal-host għas-sidecar `cliproxyapi`                                                                                                                                                                                                                        | `8317`                         |

## Reverse Proxy fuq Sottomogħdija (Traefik / nginx)

Il-`basePath` ta’ Next.js jiġi kkompilat fil-bundle standalone. OmniRoute jirreġistra l-valur
inkorporat f’fajl sentinel fl-għerq tal-app (miktub waqt `npm run build`; jinqara minn
`scripts/docker/ensure-docker-base-path.mjs`) u jqabblu ma’
`OMNIROUTE_BASE_PATH` meta jibda l-container. Meta jkunu differenti u l-image tkun
inbniet għall-għerq tad-dominju, l-entrypoint jerġa’ jikteb il-manifesti standalone, il-
letterali inkorporati ta’ `basePath`/`assetPrefix` (Next 16 jirrendi l-URLs tal-assets SSR
minn `assetPrefix` biss — il-patcher jirrifletti s-sottomogħdija fih), l-URLs inkorporati
tal-assets `/_next/static` (manifesti ta’ referenza tal-client, imports tal-media, paġni
tal-iżbalji prerenderjati) u x-shim `process.env` tal-client qabel ma jitħaddem
`node dev/run-standalone.mjs`.

### Build b’Compose (rakkomandat)

Issettja ż-żewġ varjabbli f’`.env`, imbagħad erġa’ ibni sabiex l-image u l-ambjent
runtime jaqblu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` jgħaddi `OMNIROUTE_BASE_PATH` bħala argument tal-build ta’ Docker
u bħala varjabbli tal-ambjent runtime.

### Image tal-għerq mibnija minn qabel + sottomogħdija runtime

L-images ippubblikati `diegosouzapw/omniroute:*` huma mibnija għall-għerq tad-dominju.
Xorta tista’ tissettja `OMNIROUTE_BASE_PATH` waqt ir-runtime; il-container japplika
patch lill-bundle darba meta jibda. Użaha flimkien mal-oriġini pubblika korrispondenti:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ikkonfigura r-reverse proxy biex jgħaddi l-mogħdija esterna **sħiħa** (tneħħix il-
prefiss). Traefik għandu jidderieġi `PathPrefix(`/omniroute`)` lejn il-container mingħajr
`StripPrefix`, sabiex Next.js jirċievi `/omniroute/...` u jservi l-assets minn
`/omniroute/_next/...`.

Il-healthcheck ta’ Docker jittestja l-endpoint ħafif taċ-ċiklu tal-ħajja `/healthz`,
ipprefissat bl-`OMNIROUTE_BASE_PATH` attiv. `/api/monitoring/health` jibqa’ disponibbli
għal dijanjostika minn persuni jew dashboards; biex terġa’ tidderieġi l-HEALTHCHECK
tal-container lejh (pereżempju għal infurzar profond tal-istat tas-saħħa), issettja
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Dik il-mogħdija hija kontroll
**profond** (DB + sommarju tal-monitoraġġ) — adattat għall-`HEALTHCHECK` mhux frekwenti
ta’ Docker jekk tagħżel li terġa’ tattivah, iżda **mhux** għall-intervalli tal-
`livenessProbe` ta’ Kubernetes.

Għall-orkestraturi (Kubernetes, Nomad, eċċ.):

| Sonda               | Ippreferi                                                                | Evita                                                     |
| ------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| Vitalità            | HTTP `GET /livez`, jew TCP fuq il-port ewlieni (`PORT`, default `20128`) | `/api/monitoring/health` bħala kontroll tal-vitalità      |
| Prontezza           | HTTP `GET /healthz`                                                      | Timeouts stretti li jqisu event-loop okkupat bħala mejjet |
| Profonda / blackbox | `/api/monitoring/health`                                                 | —                                                         |

`/healthz` jirrapporta ċ-ċiklu tal-ħajja tal-proċess (`ok` / `starting` / `stopping`).
`/livez` jiċċekkja biss jekk il-proċess huwiex ħaj (200 kull meta l-handler ikun jista’
jitħaddem; ma jistenniex il-prontezza). It-tnejn xorta jitħaddmu fuq l-istess event loop
ta’ Node bħall-ipproċessar tat-talbiet, għalhekk xogħol fuq il-katalgu jew il-kompressjoni
li juża ħafna CPU jista’ jdewwimhom — okkupat ≠ mejjet. Ippreferi kontroll tal-vitalità
permezz ta’ TCP jekk is-sondi HTTP jaqbżu l-limitu ta’ żmien. Gwida sħiħa dwar is-sondi:
[Gwida għall-monitoraġġ — rakkomandazzjonijiet għas-sondi ta’ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ma’ Caddy (HTTPS Auto-TLS)

OmniRoute jista’ jiġi espost b’mod sigur bl-użu tal-forniment awtomatiku tal-SSL ta’ Caddy. Kun żgur li r-rekord DNS A tad-dominju tiegħek jipponta lejn l-IP tas-server tiegħek.

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
      # L-oriġini li jara l-brawżer għall-callbacks ta’ OAuth, il-links tad-dashboard, u l-URLs pubbliċi ġġenerati.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL intern minn server għal server għal kompiti skedati / awto-talbiet.
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

Caddy jistabbilixxi l-headers standard tat-trażmissjoni għall-container upstream. OmniRoute juża
`NEXT_PUBLIC_BASE_URL` bħala l-oriġini pubblika kanonika għall-callbacks ta’ OAuth u l-links pubbliċi
ġġenerati; l-operazzjonijiet ta’ kitba awtentikati tad-dashboard jużaw talbiet mill-istess oriġini flimkien ma’ protezzjoni CSRF
marbuta mas-sessjoni. Attiva `OMNIROUTE_TRUST_PROXY` biss għal skjeramenti avvanzati fejn intenzjonalment
trid li OmniRoute jidderiva l-oriġini pubblika minn headers ta’ trażmissjoni fdati minflok minn konfigurazzjoni
espliċita.

## Cloudflare Quick Tunnel

L-appoġġ tad-dashboard għall-iskjeramenti Docker jinkludi **Cloudflare Quick Tunnel** b’klikk waħda fuq `Dashboard → Endpoints`. L-ewwel attivazzjoni tniżżel `cloudflared` biss meta jkun meħtieġ, tibda mina temporanja lejn l-endpoint `/v1` attwali tiegħek, u turi l-URL iġġenerat `https://*.trycloudflare.com/v1` direttament taħt il-URL pubbliku normali tiegħek.

Il-pannelli tal-mini tal-endpoints (Cloudflare, Tailscale, ngrok) jistgħu jintwerew jew jinħbew minn `Settings → Appearance` mingħajr ma jinbidel l-istat attiv tal-mina.

### Noti dwar il-Mini

- L-URLs ta’ Quick Tunnel huma temporanji u jinbidlu wara kull startjar mill-ġdid.
- Quick Tunnels ma jiġux irrestawrati awtomatikament wara startjar mill-ġdid ta’ OmniRoute jew tal-container. Erġa’ attivahom mid-dashboard meta jkun meħtieġ.
- L-installazzjoni ġestita bħalissa tappoġġja Linux, macOS, u Windows fuq `x64` / `arm64`.
- B’mod awtomatiku, Managed Quick Tunnels jużaw it-trasport HTTP/2 biex jevitaw twissijiet storbjużi dwar il-buffer UDP ta’ QUIC f’ambjenti ta’ containers b’riżorsi limitati. Issettja `CLOUDFLARED_PROTOCOL=quic` jew `auto` jekk trid trasport differenti.
- L-immaġnijiet Docker jinkludu l-għeruq CA tas-sistema u jgħadduhom lil `cloudflared` ġestit, u b’hekk jiġu evitati fallimenti ta’ fiduċja TLS meta l-mina tinbeda minn ġewwa l-container.
- Issettja `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jekk trid li OmniRoute juża binarju eżistenti minflok iniżżel wieħed.

## Tags tal-Immaġnijiet

| Immaġni                  | Tag      | Daqs   | Deskrizzjoni                                            |
| ------------------------ | -------- | ------ | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | L-ogħla SemVer stabbli **ppubblikat** (mhux git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Iffissa din il-klassi ta’ tag għal GitOps               |

Manifest għal diversi pjattaformi: `linux/amd64` + `linux/arm64` nattivi (Apple Silicon, AWS Graviton, Raspberry Pi). Docker jagħżel l-arkitettura korrispondenti awtomatikament; għaddi `--platform linux/amd64` jekk ikollok bżonn tisforza l-emulazzjoni AMD64 fuq hosts ARM.

### Kanali tar-Rilaxx

OmniRoute jippubblika kanali Docker separati għal rilaxxi stabbli, ittestjar attiv tal-fergħa tar-rilaxx, u builds tal-iżvilupp.

| Kanal                           | Sors                                       | Mutabbiltà                            | Użu rakkomandat                                                                                                                       |
| ------------------------------- | ------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Rilaxx iffirmat/b’verżjoni                 | Immutabbli                            | Skjeramenti ta’ produzzjoni li jiffissaw rilaxx eżatt                                                                                 |
| `:latest` / `:latest-web`       | L-ogħla SemVer stabbli **ppubblikat**      | Puntatur stabbli mutabbli             | Isegwi rilaxxi stabbli **wara** kompitu ta’ pubblikazzjoni SemVer — **ma** jsegwix `main` jew commits mhux rilaxxati ta’ `release/v*` |
| `:next` / `:next-web`           | Il-fergħa predefinita attwali `release/v*` | Puntatur ta’ qabel ir-rilaxx mutabbli | Ittestjar ta’ soluzzjonijiet li waslu fil-fergħa tar-rilaxx attiva iżda għadhom mhumiex f’rilaxx stabbli                              |
| `:main` / `:main-web`           | Il-fergħa `main`                           | Puntatur tal-iżvilupp mutabbli        | Għall-iżvilupp u l-ittestjar tal-integrazzjoni biss                                                                                   |

#### L-użu tal-kanal ta’ qabel ir-rilaxx

Il-kanal `next` jerġa’ jinbena ma’ kull push lejn il-fergħa predefinita attwali `release/v*` u jiġi ppubblikat kemm għal AMD64 kif ukoll għal ARM64. Fergħat ta’ manutenzjoni eqdem ma jistgħux jiktbu fuqu. Il-kanal jipprovdi immaġni li tista’ tinġibed għal soluzzjonijiet li ġew amalgamati fil-fergħa tar-rilaxx attiva qabel ma jinħoloq it-tag stabbli li jmiss.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Għal Docker Compose, issostitwixxi t-tag tal-immaġni użat mill-profil magħżul, imbagħad iġbed u erġa’ oħloq is-servizz:

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

`next` huwa kanal varjabbli ta’ qabel ir-rilaxx. Jista’ jinbidel ma’ kwalunkwe push lejn il-fergħa tar-rilaxx attiva u **mhuwiex appoġġjat għall-użu fil-produzzjoni**. Iffissa d-digest tal-immaġni waqt li tkun qed tevalwa build speċifika:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Qabel l-ittestjar, agħmel kopja ta’ riżerva tal-volum tad-data ta’ OmniRoute jew tad-direttorju tad-data mmuntat b’bind mount. Biex tmur lura, irrestawra l-verżjoni stabbli jew id-digest użati qabel u erġa’ oħloq il-container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build minn branch ta’ release qatt ma jista’ jmexxi `latest`; verżjoni semantika stabbli eliġibbli biss tista’ tippromwovi l-pointer stabbli. L-images `next` iżommu l-ispezzjoni tal-image tar-release u l-gate li jimblokka vulnerabbiltajiet CRITICAL.

**`latest` mhijiex garanzija ta’ aġġornament għal git.** Fixes magħquda f’`main` jew fil-branch attiv `release/v*` **ma jkunux** f’`:latest` sakemm tiġi ppubblikata image SemVer stabbli u l-job tal-pubblikazzjoni jippromwovi `:latest` (bl-istess digest bħal dik is-SemVer). Jekk `latest` tidher wieqfa waqt li GitHub diġà juri l-fix, niżżel `:next` biex tittestja l-branch tar-release jew stenna t-tag SemVer.

| Dak li trid                                                                           | Uża                                       |
| ------------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / produzzjoni li ma tistax tiddevja                                            | Waħħal `:X.Y.Z` (jew id-digest tal-image) |
| Segwi l-verżjonijiet stabbli ppubblikati u aċċetta ħolqien mill-ġdid ma’ kull release | `:latest`                                 |
| Ittestja commits mhux rilaxxati ta’ `release/v*`                                      | `:next` (mhux għall-produzzjoni)          |
| Ittestja `main`                                                                       | `:main` (mhux għall-produzzjoni)          |

## Disponibbiltà: SQLite predefinit għandu replika waħda

OmniRoute standard fuq Docker / Kubernetes huwa **proċess Node wieħed + proċess wieħed li jikteb fuq SQLite**. Disponibbiltà għolja **mhijiex appoġġjata** b’din it-topoloġija.

| Restrizzjoni                                                    | Konsegwenza                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proċess wieħed li jikteb                                        | **Tħaddimx** diversi repliki mal-istess fajl SQLite. Dan jikkorrompi d-DB.                                                                                                                                                                                                                                                                        |
| Ħolqien mill-ġdid / ristartjar / terminazzjoni minn HEALTHCHECK | **Qtugħ sħiħ** ta’ SSE li jkunu għaddejjin, sessjonijiet tad-dashboard, u stat fil-memorja. Kull klijent konness jinqata’. Talbiet ġodda matul il-perjodu mingħajr endpoint jirċievu **`502 Bad Gateway: Unknown error`** mir-reverse proxy, mhux JSON ta’ OmniRoute — il-klijenti ma jistgħux jiddistingwu dan minn ħsara tal-fornitur (#11015). |
| L-istess event loop bħal `/healthz`                             | Ċiklu okkupat tal-katalgu jew tal-kompressjoni jista’ jdewwem il-probes; timeout qasir imbagħad jirristartja l-**unika** replika.                                                                                                                                                                                                                 |

**Matriċi tal-probes** (ara wkoll [ir-rakkomandazzjonijiet għall-probes ta’ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                 | Mira                                                                 | Tużax                                                     |
| --------------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| Liveness              | TCP fuq `PORT` (predefinit `20128`), jew HTTP mhux strett `/healthz` | `/api/monitoring/health`                                  |
| Readiness             | HTTP `GET /healthz`                                                  | Timeouts stretti li jqisu event loop okkupat bħala mejjet |
| Approfondit / bnedmin | `/api/monitoring/health`                                             | Liveness awtomatizzat tal-kubelet                         |

**Aġġornamenti:** stenna li kull sessjoni tinqata’. Neħħi gradwalment il-klijenti jekk tista’; m’hemm ebda rolling update bis-SQLite predefinit. Compose `restart: unless-stopped` flimkien ma’ Docker `HEALTHCHECK` se jissostitwixxu wkoll l-uniku proċess meta l-container ikun Unhealthy — bl-istess firxa ta’ impatt.

Snippet ta’ Kubernetes għal **replika waħda** (Recreate huwa meħtieġ; iżżidx `replicas` għal fajl SQLite wieħed):

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

Il-pawża `preStop` tippermetti lil kube jneħħi l-endpoints tas-Service qabel SIGTERM sabiex traffiku **ġdid** ma jibqax jasal għand il-proċess li qed jingħalaq. SSE ta’ `/v1/responses` li jkunu għaddejjin jingħataw sa `SHUTDOWN_TIMEOUT_MS` (30s b’mod predefinit) biex jitlestew permezz ta’ leases robusti għall-ammissjoni (#11015). Talbiet ġodda li xorta jaslu għand il-proċess jirċievu `503` + `Retry-After: 5`. Il-perjodu mingħajr endpoint ta’ Recreate sakemm is-sostitut ikun Ready jibqa’ qtugħ komplet — din hija t-topoloġija ta’ SQLite, mhux konfigurazzjoni ħażina tal-probe.

Postgres estern / HA b’diversi proċessi li jiktbu **mhuwiex** metodu standard dokumentat. Jekk teħtieġ HA, żomm replika waħda jew ħaddem topoloġija li l-proġett ikun ittestja u ddokumenta separatament. Ix-xogħol fuq Postgres/MySQL jinsab f’[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Sakemm dan jiġi rilaxxat, l-uniku mod appoġġjat biex timmultiplika l-kapaċità għal `/v1/responses` **kbar** huwa permezz ta’ N proċessi indipendenti (it-taqsima li jmiss), mhux `replicas > 1` fuq volum wieħed.

## Skalabbiltà orizzontali: N proċessi indipendenti

Proċess wieħed ta’ Node huwa **heap wieħed ta’ V8**. Żewġ talbiet konkorrenti tal-aġent tal-kodifikazzjoni `POST /v1/responses` (RTK + Caveman) ta’ ~3 MiB / ~750k token iwaqqfu dak il-heap f’madwar 12 Gi (`FATAL ERROR: Reached heap limit`) u jistgħu jikkawżaw OOM f’cgroup ta’ 16 Gi. Ara [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Dak il-kejl huwa twissija dwar il-**baġit tal-memorja**, mhux massimu assolut tal-prodott ta’ żewġ talbiet twal konkorrenti għal `/v1/responses`. L-ammissjoni għal chats intensivi hija kkontrollata minn baġit ta’ bytes tad-dħul derivat awtomatikament (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) u kkalkulat skont dak l-istess limitu ta’ V8/cgroup — jekk tissostitwih b’valur ogħla (jew tissettja l-limitu l-antik ibbażat fuq l-għadd ta’ talbiet `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) fuq proċess li diġà ġie d-dimensjonat, terġa’ tintroduċi l-waqfien. Chats żgħar, `/healthz`, `/v1/models`, u MCP **mhumiex** inklużi f’dak il-limitu.

### Proċess wieħed: aktar minn żewġ `/v1/responses` twal

Proċess **b’saħħtu** (heap taħt `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, b’valur predefinit ta’ `0.75`) **jista’** jħaddem aktar minn żewġ talbiet twal konkorrenti `POST /v1/responses` meta jkun għad hemm spazju fil-baġit ta’ bytes waqt l-ipproċessar għall-proċess kollu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Bodies daqs jew akbar minn `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (b’valur predefinit ta’ 256 KiB) jieħdu l-istess lease intensiv bħal talbiet b’ħafna struttura u jużaw l-istess mekkaniżmu ta’ ħruġ `tryAcquireHealthyHeadroom` ta’ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Għexieren ta’ klijenti SSE twal konkorrenti (l-operaturi spiss ikollhom bżonn 40–50) huma kwistjoni ta’ **baġit tal-memorja** — iddimensjona l-heap + is-slots primarji/ta’ headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — mhux limitu assolut tal-prodott ta’ “massimu ta’ 2”. Heap taħt pressjoni xorta jwarrab it-talbiet bi `503` li jista’ jerġa’ jiġi ppruvat, sabiex #7849 ma jerġax iseħħ.

Biex **timmultiplika l-heaps** (old-spaces indipendenti ta’ V8) **illum**:

| Agħmel                                                                                                                                                                                           | Tagħmilx                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Ħaddem **N containers/pods**, kull wieħed bid-`DATA_DIR` / volume **tiegħu stess**                                                                                                               | Tissettja `replicas > 1` fuq fajl SQLite wieħed                       |
| Iddimensjona l-heavy in-flight + il-healthy-headroom skont il-heap / il-baġit tal-bytes waqt l-ipproċessar; 1–2 huwa l-valur predefinit konservattiv ta’ #7849, mhux massimu assolut tal-prodott | Tagħti proċess wieħed 8× RAM u limitu tal-għadd mingħajr restrizzjoni |
| Fakultattiv: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` għal **counters tal-kwota kondiviżi**                                                                                          | Tittratta Redis bħala SQLite kondiviż — mhuwiex hekk                  |
| Idduplika s-sigrieti tal-fornitur f’kull istanza (jew aċċetta dashboards maqsumin)                                                                                                               | Tistenna dashboard wieħed / call-log wieħed bejn l-istanzi            |
| Poġġi kwalunkwe load balancer quddiemhom; sticky routing skont API key jew sessjoni huwa biżżejjed                                                                                               | Teħtieġ middleware ta’ fornitur speċifiku li jqis id-daqs             |

Ħardwer: it-talbiet twal konkorrenti għal `/v1/responses` għal kull istanza huma kwistjoni ta’ **baġit tal-memorja** (heap + bytes waqt l-ipproċessar / #10110). `N` `DATA_DIR`s indipendenti xorta jimmultiplikaw il-heaps: ir-RAM tal-host trid tkopri `N × cgroup`, mhux “pod wieħed ta’ 16 Gi b’N=8.” Qatt tissettja `replicas > 1` fuq fajl SQLite wieħed.

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

Id-densità fl-istess proċess (bil-kompressjoni barra mill-iżolat HTTP) tinsab f’[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster loġiku wieħed fuq stat persistenti kondiviż jinsab f’[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Noti Importanti

- **Modalità WAL ta’ SQLite:** `docker stop` għandu jitħalla jintemm sabiex OmniRoute jkun jista’ jagħmel checkpoint tal-aħħar bidliet lura f’`storage.sqlite`. Il-fajls Compose inklużi diġà jistabbilixxu perjodu ta’ grazzja ta’ 40s għall-waqfien. Jekk tħaddem l-immaġni direttament, żomm `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Issettjah għal `true` jekk il-backups ta’ rutina jew ta’ qabel il-kitba jiġu ġestiti esternament. Il-migrazzjonijiet ta’ databases eżistenti xorta jeħtieġu snapshot ta’ sikurezza durabbli tagħhom stess u protezzjoni kontra migrazzjoni tal-massa.
- **Persistenza tad-Data:** Dejjem immonta volum fuq `/app/data` biex tippersisti d-database, iċ-ċwievet u l-konfigurazzjonijiet tiegħek bejn ristartjar u ieħor tal-container.
- **Konfigurazzjoni tal-Port:** Ibdel il-varjabbli tal-ambjent `PORT` biex tibdel il-port predefinit `20128`.

## Ara Wkoll

- [Gwida għall-Installazzjoni fuq VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Konfigurazzjoni ta’ VM + nginx + Cloudflare
- [Gwida għall-Installazzjoni fuq Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Installa fuq Fly.io
- [Konfigurazzjoni tal-Ambjent](../reference/ENVIRONMENT.md) — Referenza sħiħa għal `.env`
