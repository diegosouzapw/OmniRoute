# 🐳 Docker Guide — OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Täielik Dockeriga juurutamise juhend. Kiireks alustamiseks vaadake [README Dockerit käsitlevat jaotist](../README.md#-docker).

## Sisukord

- [Kiirkäivitus](#quick-run)
- [Keskkonnafailiga](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Saadaolevad profiilid](#available-profiles)
- [Hosti CLI-tööriistade seadistamine, kui OmniRoute töötab Dockeris](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redise külgkonteiner](#redis-sidecar)
- [Tootmiskeskkonna Compose](#production-compose)
- [Dockerfile'i etapid](#dockerfile-stages)
- [Kriitilised keskkonnamuutujad](#critical-environment-variables)
- [Docker Compose koos Caddyga (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare'i kiirtunnel](#cloudflare-quick-tunnel)
- [Tõmmise sildid](#image-tags)
- [Käideldavus: vaikimisi SQLite toetab üht replikat](#availability-default-sqlite-is-single-replica)
- [Gemini piirkondlikud vead Dockeris](#gemini-regional-errors-inside-docker)
- [Olulised märkused](#important-notes)

---

## Kiirkäivitus

> **Isehostimine ühe käsuga?** Vaadake
> [isehostimise juhendit](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (avaldatud tõmmis +
> Redis, ainult tagasisideaadressil, profiili pole vaja valida). Allolev kiirkäivitus
> on ühe konteineri lahendus kasutajatele, kes juba käitavad Redist mujal.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Keskkonnafailiga

```bash
# Esmalt kopeerige ja muutke faili .env
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
# Põhiprofiil (ilma CLI-tööriistadeta)
docker compose --profile base up -d

# CLI-profiil (sisseehitatud Claude Code, Codex ja OpenClaw)
docker compose --profile cli up -d

# Hostiprofiil (eelkõige Linuxile; haagib hosti CLI-binaarfailid kirjutuskaitstult)
docker compose --profile host up -d

# Veebiprofiil (Chromium/Playwright veebiseansside pakkujate jaoks)
docker compose --profile web up -d

# CLI ja CLIProxyAPI külgkonteineri kombineerimine
docker compose --profile cli --profile cliproxyapi up -d
```

## Saadaolevad profiilid

OmniRoute sisaldab Compose'i profiile peamiste juurutusviiside jaoks. Valige oma keskkonnale sobiv profiil.

| Profiil            | Teenus           | Millal kasutada                                                                                                                                         | Käsk                                         |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (vaikimisi) | `omniroute-base` | Graafilise liideseta server / minimaalne käituskeskkond, pakkujate CLI-sid pole kaasas                                                                  | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | Agendipõhised töövood, mis kutsuvad käske `omniroute providers/setup/doctor`, ja kaasasolevad CLI-d (Codex, Claude Code, Droid, OpenClaw)               | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | Linuxi hostid, mis soovivad `network_mode`-iga sarnast ligipääsu hosti CLI-dele, haakides `~/.local/bin`, `~/.codex`, `~/.claude` jne kirjutuskaitstult | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) külgkonteineri käitamine pordil `8317` ülesvoolu CLI-puhverdamiseks                         | `docker compose --profile cliproxyapi up -d` |
| `web`              | `omniroute-web`  | Brauserit vajavad veebiseansside pakkujad: `gemini-web`, `claude-web`, `claude-turnstile` (koostab `runner-web`; Chromium on kaasas)                    | `docker compose --profile web up -d`         |

> Kombineerida saab mitut profiili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Hosti CLI-tööriistade seadistamine, kui OmniRoute töötab Dockeris

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ja juhtpaneeli nupp
**Salvesta konfiguratsioon** kirjutavad kõik faile, nagu `~/.codex/*.config.toml`. Neil teedel
on tähendus ainult masinas, kus CLI tegelikult töötab. Kui käivitate need
konteineris, kirjutatakse fail konteineri enda kodukataloogi (`/home/node` —
tõmmis töötab kasutajana `USER node`), kust ükski hosti CLI seda kunagi ei loe ja kus see
konteineri taasloomisel kohe kaob.

OmniRoute tuvastab selle ja keeldub kirjutamisest, andes juhised, selle asemel et
teatada edust, millest teil kasu pole: CLI lõpetab töö koodiga `2` ja API vastab koodiga `422`
ning väärtusega `containerEphemeralTarget: true`.

### Soovitus: käivitage CLI hostis ja OmniRoute Dockeris

Konteiner pakub API-t; CLI seadistab teie hosti tööriistu.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # suunake CLI konteinerile
omniroute setup-codex                      # kirjutab hostis tegelikku ~/.codex kataloogi
```

See on õige valik, kui Codex, Claude Code, Cursor või mõni sarnane tööriist töötab teie
sülearvutis — nagu tavaliselt.

### Alternatiiv: haakige hosti konfiguratsioonikataloogid bind-mount'idega (`host`-profiil)

Kui soovite, et konteiner ise kirjutaks teie hosti konfiguratsiooni, haakige
kataloogid konteinerisse ja määrake `CLI_CONFIG_HOME` haake juurkataloogile. `host`-profiil
teeb seda juba:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind-mount muudab tee usaldusväärseks: OmniRoute loeb faili
`/proc/self/mountinfo` ning lubab kirjutada haagitud teedele (ja kataloogidesse,
mille alamkataloogid on haagitud, mis vastab täpselt ülaltoodud `/host-home` struktuurile), keeldudes
endiselt kirjutamast haakimata teedele.

### Varuvõimalus: seadistage konteineri enda CLI-d (kasutage säästlikult)

Kui CLI-d asuvad tõepoolest konteineris (`cli`-profiil), on kirjutamine
taotluslik. Edastage mis tahes `setup-*` käsule `--allow-container-write` või määrake
serveri jaoks `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Kirjutamine jätkub
koos hoiatusega, et see ei säili pärast konteineri eemaldamist.

> **Turvahoiatus — `cli`-profiil + `docker.sock` haage.**
> `cli`-profiil haagib bind-mount'iga `/var/run/docker.sock`, et konteinerisisene
> automaatvärskendaja saaks hosti deemoni kaudu pinu uuesti luua
> (`src/lib/system/autoUpdate.ts` kontrollib selle sokli olemasolu ja jätab
> Dockeri tee vahele, kui sokkel puudub). See sokkel on **hosti juurkasutaja taseme usalduspiir**:
> kõik, millel on sellele juurdepääs, juhib hosti Dockeri deemonit
> juurkasutajana — see võib hostis luua, uurida, peatada ja eemaldada mis tahes konteineri.
> Järelmid:
>
> 1. **Ärge kunagi tehke `cli`-profiili porti võrgule kättesaadavaks.** Avaldage
>    see aadressil `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — kohtvõrgust ligipääsetav `cli`-profiil muudab mis tahes juhtpaneeli taseme RCE
>    hosti täielikuks ülevõtmiseks.
> 2. **Ärge haakige `cli`-profiili ühtegi täiendavat hosti kataloogi.**
>    Dockeri sokkel koos mis tahes täiendava haakega annab konteinerile täieliku
>    lugemis- ja kirjutusõiguse teie failisüsteemile ning hosti konfiguratsioonile. Kui tööriist peab
>    projektile ligi pääsema, käivitage see lokaalselt CLI-programmiga — ärge haakige projekti
>    `cli`-konteinerisse.
>
> Kui te ei vaja konteinerisisest automaatvärskendamist, jätke `cli`-profiil välja
> (`COMPOSE_PROFILES=core,redis` või lühem väärtus). Teised profiilid ei
> haagi Dockeri soklit.
>
> MITM-iga seotud ohumudelit vaadake failist `docs/security/MITM-TPROXY-DECRYPT.md` (git; ei kompileerita kataloogi `/docs`)
> ning binaarfailide `codex`/`claude-code`/`droid`/`openclaw` päritoluahelat failist
> `docs/security/SUPPLY_CHAIN.md`.

## Redise sidecar

OmniRoute kasutab Redist hajutatud päringusageduse piiraja ja jagatud vahemälu jaoks. Teenus `redis` on failis `docker-compose.yml` **alati määratletud** (sellel pole profiilipiirangut) ning see käivitub koos mis tahes muu profiiliga.

| Üksikasjad                   | Väärtus                                   |
| ---------------------------- | ----------------------------------------- |
| Tõmmis                       | `redis:7-alpine`                          |
| Konteineri nimi              | `omniroute-redis`                         |
| Sisemine port                | `6379`                                    |
| Hosti port (ülekirjutus)     | `REDIS_PORT` (vaikimisi `6379`)           |
| Hosti sidumine (ülekirjutus) | `REDIS_BIND_HOST` (vaikimisi `127.0.0.1`) |
| Köide                        | `omniroute-redis-data` → `/data`          |
| Tervisekontroll              | `redis-cli ping` (intervall 10 s)         |

Seotud keskkonnamuutujad:

- `REDIS_URL` — rakendusse sisestatav ühendusstring (vaikimisi `redis://redis:6379`).
- `REDIS_PORT` — Redise konteineri hostipoolse pordivastenduse port.
- `REDIS_BIND_HOST` — hosti liides, millel port avaldatakse. Vaikimisi `127.0.0.1`.

> **Miks kasutatakse vaikimisi loopback-liidest:** sidecar töötab ilma suvandita `requirepass` ja rakenduse
> konteinerid pääsevad sellele juurde compose'i võrgu kaudu (`redis:6379`) — avaldatud port on
> mõeldud ainult hostipoolsetele tööriistadele (`redis-cli`, kohalik `npm run dev`). Avaldamine aadressil
> `0.0.0.0` teeks autentimata Redise kättesaadavaks kõigile teie kohtvõrgu hostidele. Kui määrate
> `REDIS_BIND_HOST=0.0.0.0`, lisage teenuse väljale `command:` ka `--requirepass`.

**Redise keelamine** pole soovitatav (päringusageduse piiraja taandub mälupõhisele varuvariandile). Kui see on siiski vajalik, eemaldage või kommenteerige failis `docker-compose.yml` teenuseplokk `redis:` või skaleerige see nullini:

```bash
docker compose up -d --scale redis=0
```

## Tootmiskeskkonna Compose

Arenduskeskkonnaga paralleelselt töötava isoleeritud tootmiskeskkonna hetktõmmise jaoks kasutage faili `docker-compose.prod.yml`.

| Üksikasjad        | Väärtus                                                                             |
| ----------------- | ----------------------------------------------------------------------------------- |
| Fail              | `docker-compose.prod.yml`                                                           |
| Töölaua vaikeport | `PROD_DASHBOARD_PORT=20130` (vastendatud sisemisele `${DASHBOARD_PORT:-20128}`)     |
| API vaikeport     | `PROD_API_PORT=20131`                                                               |
| Tõmmis            | `omniroute:prod` (koostatud sihtmärgist `runner-cli`)                               |
| Redise konteiner  | `omniroute-redis-prod` (`redis:8.6.2`, eraldiseisev köide `redis-prod-data`)        |
| Andmeköide        | `omniroute-prod-data` (nimeline, säilib korduskoostamiste vahel)                    |
| Tervisekontrollid | `node healthcheck.mjs` + `redis-cli ping`, kus `depends_on` sõltub Redise tervisest |

Kasutamine:

```bash
# Koosta ja käivita tootmiskeskkonna pinu
docker compose -f docker-compose.prod.yml up -d --build

# Voogedasta logisid
docker compose -f docker-compose.prod.yml logs -f

# Peata ja eemalda pinu (säilita köited)
docker compose -f docker-compose.prod.yml down
```

Tootmiskeskkonna pinu töötab paralleelselt arenduskeskkonna compose'iga (konteinerite nimed, pordid ja köited on erinevad), seega saate jätkata kohalikku arendamist, samal ajal kui tootmiskeskkond jääb tööle.

## Dockerfile'i etapid

Hoidla sisaldab mitmeetapilist Dockerfile'i (`Dockerfile`). Saadaval on neli etappi; vali oma kasutusjuhu jaoks õige `target`.

| Etapp         | Baastõmmis            | Otstarve                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installib sõltuvused (`npm ci --legacy-peer-deps`) ja käivitab `npm run build` (vaikimisi Turbopack — vt allpool jaotist „Ehitusaegsed ressursid”)                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Tootmiskeskkonna käituskeskkond koos Next.js-i autonoomse väljundiga. **Teenusepakkujate CLI-sid ei kaasata.**                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | Lisab `git`, `docker.io`, `docker-compose` ja globaalsed CLI-d: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vali see agentpõhiste töövoogude jaoks.**                                                                                                                    |
| `runner-web`  | `runner-base`         | Lisab Playwrighti ja Chromiumi brauseri (`--with-deps`) veebiseansside teenusepakkujate jaoks: `gemini-web`, `claude-web`, `claude-turnstile`. **Vali see nende teenusepakkujate kasutamisel** — tavaline tõmmis nurjub ilma selleta päringu ajal (vt väljalaskekanalite jaotise märkust `-web`). |

Konkreetse sihtmärgi käsitsi ehitamine:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ehitusaegsed ressursid

Kolm ehitusargumenti määravad etapi `builder` ressursikulu. Need kehtivad ainult ehitamise ajal —
`OMNIROUTE_MEMORY_MB` (allpool) on eraldi käitusaja seadistus.

| Ehitusargument              | Vaikeväärtus | Mõju                                                                                                     |
| --------------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` kasutab ehitamiseks webpacki: väiksem mälu tippkasutus, kuid aeglasem. `1` lülitab Turbopacki sisse. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | Käivitatud protsessi `next build` V8 kuhjamälu ülempiir (`--max-old-space-size`).                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Määrab `CIRCLE_NODE_TOTAL`; Next tuletab leheandmete kogumiseks `workers = N - 1`.                       |

`OMNIROUTE_BUILD_WORKERS` on seadistus, mida suure võimsusega ehitusmasinas suurendada ja mida
kahtlustada, kui piiratud ressurssidega ehitus nurjub **pärast** teadet `✓ Compiled successfully`. Iga
leheandmete tööprotsess on eraldi protsess, nagu ka ülemprotsess `next build`;
reaalses VPS-is tehtud katses (probleem #7518) mõõdeti iga protsessi RSS-i
tippväärtuseks ~4,5 GB, sõltumata kuhja lipust `NODE_OPTIONS` (Turbopack kompileerib
V8 kuhjast väljaspool asuvas natiivses/Rusti mälus). Vaikeväärtus `2` (→ 1 tööprotsess, kokku 2
protsessi) on kohandatud avaldamiskonveieri kasutatavate GitHubi majutatud
16 GB / 4 vCPU täitjate jaoks. Väärtusega `8` (→ 7 tööprotsessi) sai täitjal mälu otsa ja
buildkit nurjas etapi veaga `ResourceExhausted: ... cannot allocate memory`;
ka `3` (→ 2 tööprotsessi) ei mahtunud mällu, kui protsessipõhist RSS-i mõõdeti
tuletamise asemel otse. `tests/unit/docker-build-memory-budget.test.ts`
teeb mõõdetud väärtuse põhjal arvutused ja nurjub, kui kumbki seadistus
ületab täitja võimalusi.

Turbopack kompileerib natiivses Rusti mälus, mis asub V8 kuhjast **väljaspool**, seega
`OMNIROUTE_BUILD_MEMORY_MB` seda ei piira. Mälupiiranguga hostis saadab
OOM-i lõpetaja ehitusprotsessile seejärel ilma igasuguse veatekstita SIGKILL-signaali — protsess lihtsalt
peatub etapi `Creating an optimized production build` keskel, mis näib pigem hangumise
kui mälu otsasaamisena. Seetõttu kasutab `Dockerfile` vaikimisi webpacki
(`OMNIROUTE_USE_TURBOPACK=0`), erinevalt käskudest `npm run dev` / `npm run build`, kus
Turbopack on koodi vaikeseade: ilma ehitusargumentideta käivitatav `docker build .` (mida
käitavad Railway ja teised ühe klõpsuga hostid) ei tohi mälupiiranguga
ehitusmasinas vaikselt nurjuda. Avaldatud tõmmised edastavad juba
`OMNIROUTE_USE_TURBOPACK=0` failis `docker-publish.yml` sõnaselgelt.
Piisava RAM-iga ehitusmasinas lülita Turbopack kiirema ehituse jaoks sisse:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` on lubatud, seega käivitab `next build` nii ülem- **kui ka** tööprotsessi
ning kumbki arvestab eraldi väärtust `OMNIROUTE_BUILD_MEMORY_MB`. Määra konteineri
ülempiir sellest väärtusest ligikaudu kaks korda suuremaks, mitte sellega võrdseks.

Selle lähtekoodipuu põhjal mõõdetud (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakendaja | Konteineri ülempiir | Tulemus                            |
| --------- | ------------------- | ---------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | OOM lõpetas mõlema juures vaikides |
| webpack   | 8 GiB               | tööprotsess sai SIGKILL-signaali   |
| webpack   | 12 GiB              | õnnestus, tippväärtus oli 11,1 GiB |

### Käitusaja vaikeväärtused

Etapi `runner-base` eksporditud vaikeväärtused: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Mälu käitumine Dockeris:

- Tõmmis määrab `OMNIROUTE_MEMORY_MB=1024` ja tuletab sellest `NODE_OPTIONS=--max-old-space-size=1024`.
- Tegeliku serveriprotsessi käivitab autonoomne käiviti, mis loeb muutujat `OMNIROUTE_MEMORY_MB` ja lisab `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node kasutab viimast korduvat `--max-old-space-size` väärtust, seega määrab `OMNIROUTE_MEMORY_MB` Dockeris tegelikult kehtiva kuhjamälu piirangu.
- Kuna tõmmis määrab selle alati, ei rakendu käiviti enda RAM-i järgi kalibreeritud varuväärtus Dockeris kunagi. Suurendage seda töökoormuse jaoks sõnaselgelt (vt allolevat tabelit). `2048` on programmeerimisagendi `/v1/responses` jaoks endiselt liiga väike.

### Käitusaegne RAM programmeerimisagentidele

Dockeri 1 GiB vaikeväärtus on juhtpaneeli ja kerge vestluse alampiir, mitte tootmiskeskkonna jaoks sobiv maht. Pikad `POST /v1/responses` päringukehad (sajad sõnumid, kümned tööriistad) hoiavad tihendamise ajal mälus mitut graafi. Kaks kattuvat, ligikaudu 3 MiB / 750k tokeniga päringut on põhjustanud V8 katkemise **12 GiB** old-space'i juures (`FATAL ERROR: Reached heap limit`) ning ka 16 GiB cgroupi OOM-i. Vt [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Määrake **cgroupi `--memory` kuhjamälust suuremaks** — omapuhvrid, SQLite ja tihendamise vahetulemused asuvad väljaspool V8-t.

| Töökoormus                                     | `OMNIROUTE_MEMORY_MB`         | Konteiner / cgroup       | Märkused                                                                                                                                  |
| ---------------------------------------------- | ----------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Juhtpaneel, üks kerge vestlus                  | `1024` (tõmmise vaikeväärtus) | ≥2 GiB                   |                                                                                                                                           |
| Üks programmeerimisagent (Claude/Codex/Grok)   | `8192`                        | ≥10 GiB                  | Tüüpiline ühe seansiga `/v1/responses`                                                                                                    |
| Kaks samaaegset pikka `/v1/responses` päringut | `10240`–`12288`               | ≥12–16 GiB               | Mõõdetud V8 katkemine ligikaudu 12 GiB kuhjamälu juures                                                                                   |
| Kolm või enam samaaegset pikka konteksti       | ärge kasutage ühes protsessis | jadastage / rohkem RAM-i | Vaikimisi lubatakse korraga 1 ressursimahukas pooleliolev päring; selle arvu suurendamine ilma täiendava RAM-ita põhjustab taas katkemise |

`omniroute serve` kalibreerib füüsilises keskkonnas ligikaudu 35% RAM-ist (piiratuna vahemikku `[512, 4096]`), kui `OMNIROUTE_MEMORY_MB` on **määramata**. Docker määrab alati väärtuse `1024`, mistõttu seda kalibreerimist ametlikus tõmmises kunagi ei tehta.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kriitilised keskkonnamuutujad

Lisaks failis [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumenteeritud vaikeväärtustele on Dockeri all käitamisel kõige olulisemad järgmised muutujad:

| Muutuja                       | Otstarve                                                                                                                                                                                                                                                                       | Vaikeväärtus              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocketi silla jagatud saladus. **Tootmiskeskkonnas kohustuslik** — määrake väärtuseks tugev juhuslik string.                                                                                                                                                                | määramata (tuleb määrata) |
| `REDIS_URL`                   | Kiirusepiiraja / vahemälu taustsüsteemi ühendusstring                                                                                                                                                                                                                          | `redis://redis:6379`      |
| `REDIS_PORT`                  | Komplekti kuuluva Redise konteineri hostipoolne port                                                                                                                                                                                                                           | `6379`                    |
| `REDIS_BIND_HOST`             | Hostiliides, millel komplekti kuuluva Redise port avaldatakse (tagasisideaadress, kui te ei lisa autentimist)                                                                                                                                                                  | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hosti tee, mis ühendatakse `cli` profiilis isevärskenduse töövoogude jaoks asukohta `/workspace/omniroute`                                                                                                                                                                     | `.` (praegune kataloog)   |
| `OMNIROUTE_MEMORY_MB`         | Käitusaegne Node'i kuhjamälu ülempiir Dockeri eraldiseisva serveri jaoks; alistab ülaltoodud tõmmise vaikeväärtuse. Programmeerimisagendid: `8192`+ (vt [käitusaegne RAM](#runtime-ram-for-coding-agents)).                                                                    | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | Juhtpaneeli (20128) ja API (20129) avaldatud portide alistamine                                                                                                                                                                                                                | `20128` / `20129`         |
| `APP_BIND_HOST`               | Hostiliides, millel docker-compose avaldab juhtpaneeli/API/live-WS-i pordid. Kui `REQUIRE_API_KEY=false` (vaikeväärtus), avaldab `0.0.0.0` anonüümse `/v1` puhverserveri kohtvõrku — laiendage ligipääsu ainult siis, kui `REQUIRE_API_KEY=true` või ees on pöördpuhverserver. | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | Hostiliides, millel docker-compose avaldab `cliproxyapi` külgkonteineri — selle andmeköide sisaldab teenusepakkuja identimisteavet.                                                                                                                                            | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | Kataloog, mida käituskeskkonna pistikprogrammide skanner loeb ja kuhu see pistikprogramme installib. Määrake see, kui pistikprogrammid on sidumishaagitud: vaikeväärtus järgib muutujat `HOME`, mida tõmmis ei pruugi eksportida.                                              | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | URL-i alamtee, kui rakendus avaldatakse pöördpuhverserveri taga (nt `/omniroute`)                                                                                                                                                                                              | _(tühi = juur)_           |
| `NEXT_PUBLIC_BASE_URL`        | Avalik brauseri lähtekoht koos alamteega (nt `https://host/omniroute`)                                                                                                                                                                                                         | määramata                 |
| `PROD_DASHBOARD_PORT`         | Hostipoolne juhtpaneeli port faili `docker-compose.prod.yml` jaoks                                                                                                                                                                                                             | `20130`                   |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` külgkonteineri hostipoolne port                                                                                                                                                                                                                                  | `8317`                    |

## Pöördproksi alamteel (Traefik / nginx)

Next.js-i `basePath` kompileeritakse eraldiseisvasse paketti. OmniRoute salvestab kompileeritud
väärtuse rakenduse juurkaustas asuvasse kontrollfaili (kirjutatakse käsu `npm run build` ajal; loetakse
faili `scripts/docker/ensure-docker-base-path.mjs` poolt) ja võrdleb seda konteineri
käivitamisel muutujaga `OMNIROUTE_BASE_PATH`. Kui need erinevad ja tõmmis loodi
domeeni juurtee jaoks, kirjutab käivituspunkt enne käsu `node dev/run-standalone.mjs`
käivitamist ümber eraldiseisva paketi manifestid, manustatud `basePath`/`assetPrefix` literaalid
(Next 16 renderdab SSR-i varade URL-id ainult `assetPrefix` alusel — paikaja
peegeldab alamtee ka sinna), kompileeritud `/_next/static` varade URL-id
(kliendiviidete manifestid, meediaimpordid, eelrenderdatud vealehed) ja kliendi
`process.env` vahekihi.

### Compose'i järg (soovitatav)

Määrake mõlemad muutujad failis `.env` ja looge tõmmis seejärel uuesti, et tõmmise ning käituskeskkonna
seadistused ühtiksid:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` edastab `OMNIROUTE_BASE_PATH` nii Dockeri järguargumendina kui ka
käituskeskkonna keskkonnamuutujana.

### Eelkoostatud juurtee tõmmis + käitusaegne alamtee

Avaldatud `diegosouzapw/omniroute:*` tõmmised on loodud domeeni juurtee jaoks. Saate siiski
määrata käitusajal `OMNIROUTE_BASE_PATH`; konteiner paikab paketi käivitamisel ühe korra.
Kasutage koos sellega vastavat avalikku päritolu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Seadistage pöördproksi edastama **täielikku** välist teed (ärge eemaldage
prefiksit). Traefik peaks suunama `PathPrefix(`/omniroute`)` konteinerisse ilma
`StripPrefix`-ita, et Next.js saaks tee `/omniroute/...` ja serveeriks varasid teelt
`/omniroute/_next/...`.

Dockeri tervisekontroll kontrollib kerget elutsükli lõpp-punkti `/healthz`, millele
lisatakse aktiivse `OMNIROUTE_BASE_PATH` prefiks. `/api/monitoring/health` jääb
inimestele ja juhtpaneelidele diagnostikaks kättesaadavaks; konteineri HEALTHCHECK-i
sellele tagasi suunamiseks (näiteks põhjaliku tervisekontrolli jõustamiseks) määrake
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
See tee teeb **põhjaliku** kontrolli (andmebaas + seire kokkuvõte) — see sobib Dockeri
harva käivitatava `HEALTHCHECK`-i jaoks, kui selle uuesti kasutusele võtate, kuid **mitte**
Kubernetese `livenessProbe`-i intervallide jaoks.

Orkestreerijate puhul (Kubernetes, Nomad jne):

| Kontroll          | Eelistage                                                        | Vältige                                                              |
| ----------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| Elusolek          | HTTP `GET /livez` või TCP põhipordil (`PORT`, vaikimisi `20128`) | `/api/monitoring/health` elusoleku kontrollina                       |
| Valmisolek        | HTTP `GET /healthz`                                              | Liiga lühikesi ajalõppe, mis peavad hõivatud sündmusetsüklit surnuks |
| Põhjalik / väline | `/api/monitoring/health`                                         | —                                                                    |

`/healthz` teatab protsessi elutsükli oleku (`ok` / `starting` / `stopping`). `/livez`
kontrollib ainult protsessi elusolekut (tagastab 200 alati, kui töötleja saab käivituda;
see ei oota valmisolekut). Mõlemad töötavad siiski samas Node'i sündmusetsüklis nagu
päringute töötlemine, mistõttu võivad protsessorimahukad kataloogi- või tihendustoimingud
neid viivitada — hõivatud ≠ surnud. Kui HTTP-kontrollid aeguvad, eelistage TCP-põhist
elusoleku kontrolli. Täielikud kontrollimisjuhised:
[Seirejuhend — Kubernetese kontrollide soovitused](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose koos Caddyga (automaatne HTTPS-i TLS)

OmniRoute'i saab turvaliselt avalikuks teha Caddy automaatse SSL-i seadistamise abil. Veenduge, et teie domeeni DNS-i A-kirje osutaks teie serveri IP-aadressile.

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
      # Brauserile suunatud päritolu OAuthi tagasikutsete, töölaua linkide ja genereeritud avalike URL-ide jaoks.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Serveritevaheline sisemine URL ajastatud tööde / isepäringute jaoks.
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

Caddy määrab ülesvoolu konteineri jaoks standardsed edastuspäised. OmniRoute kasutab
`NEXT_PUBLIC_BASE_URL`-i OAuthi tagasikutsete ja genereeritud avalike
linkide kanoonilise avaliku päritoluna; autenditud töölaua kirjutuspäringud kasutavad sama päritoluga päringuid koos seansiga seotud CSRF-kaitsega.
Lubage `OMNIROUTE_TRUST_PROXY` ainult keerukamate juurutuste puhul, kus soovite teadlikult,
et OmniRoute tuletaks avaliku päritolu usaldatud edastuspäistest, mitte sõnaselgest
konfiguratsioonist.

## Cloudflare Quick Tunnel

Dockeri juurutuste töölauatugi sisaldab ühe klõpsuga funktsiooni **Cloudflare Quick Tunnel** asukohas `Dashboard → Endpoints`. Esmakordsel lubamisel laaditakse `cloudflared` alla ainult vajaduse korral, käivitatakse ajutine tunnel teie praeguse `/v1` lõpp-punktini ja kuvatakse genereeritud `https://*.trycloudflare.com/v1` URL otse teie tavapärase avaliku URL-i all.

Lõpp-punktide tunnelipaneele (Cloudflare, Tailscale, ngrok) saab asukohas `Settings → Appearance` kuvada või peita ilma aktiivse tunneli olekut muutmata.

### Märkused tunnelite kohta

- Quick Tunneli URL-id on ajutised ja muutuvad pärast iga taaskäivitust.
- Quick Tunneleid ei taastata pärast OmniRoute'i või konteineri taaskäivitamist automaatselt. Vajaduse korral lubage need töölaualt uuesti.
- Hallatud installimine toetab praegu Linuxit, macOS-i ja Windowsit arhitektuuridel `x64` / `arm64`.
- Hallatud Quick Tunnelid kasutavad vaikimisi HTTP/2 transporti, et vältida piiratud konteinerikeskkondades QUIC-i UDP-puhvri rohkeid hoiatusi. Kui soovite teistsugust transporti, määrake `CLOUDFLARED_PROTOCOL=quic` või `auto`.
- Dockeri tõmmised sisaldavad süsteemi CA-juursertifikaate ja edastavad need hallatud `cloudflared`-ile, mis väldib TLS-i usaldusvigu tunneli konteineris käivitamisel.
- Kui soovite, et OmniRoute kasutaks allalaadimise asemel olemasolevat binaarfaili, määrake `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Tõmmise sildid

| Tõmmis                   | Silt     | Suurus | Kirjeldus                                                 |
| ------------------------ | -------- | ------ | --------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Kõrgeim **avaldatud** stabiilne SemVer (mitte git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOpsi jaoks kinnitage selle klassi silt                 |

Mitme platvormi manifest: loomulik `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker valib sobiva arhitektuuri automaatselt; kui peate ARM-hostides AMD64 emulatsiooni sundima, edastage `--platform linux/amd64`.

### Väljalaskekanalid

OmniRoute avaldab stabiilsete väljalasete, aktiivse väljalaskeharu testimise ja arendusjärkude jaoks eraldi Dockeri kanalid.

| Kanal                           | Allikas                                | Muudetavus                 | Soovitatav kasutus                                                                                                                |
| ------------------------------- | -------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Allkirjastatud/versioonitud väljalase  | Muutmatu                   | Tootmisjuurutused, mis on kinnitatud kindlale väljalaskele                                                                        |
| `:latest` / `:latest-web`       | Kõrgeim **avaldatud** stabiilne SemVer | Muudetav stabiilne viit    | Järgib stabiilseid väljalaskeid **pärast** SemVeri avaldamistööd — **ei** järgi `main`-i ega avaldamata `release/v*` sissekandeid |
| `:next` / `:next-web`           | Praegune vaikimisi `release/v*` haru   | Muudetav eelväljalaskeviit | Aktiivsesse väljalaskeharusse jõudnud, kuid veel stabiilsesse väljalaskesse lisamata paranduste testimine                         |
| `:main` / `:main-web`           | `main` haru                            | Muudetav arendusviit       | Ainult arendus- ja integratsioonitestimine                                                                                        |

#### Veebiseansi pakkujad: `-web` tõmmised

Kõik ülaltoodud kanalid on saadaval ka `-web` sildina (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), mis on loodud `runner-web` etapist — sama tõmmis koos Playwrighti ja Chromiumi brauseriga. Tavatõmmis tarnitakse **ilma** Chromiumita; `gemini-web`, `claude-web` ja `claude-turnstile` vajavad seda.

Tõrge ilmneb viivitusega, mitte käivitamisel: need pakkujad loetlevad oma mudelid ja kuvatakse töölaual ühendatuna ning alles esimene päring nurjub teatega

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Kui kasutate neid pakkujaid, tõmmake kasutatava kanali `-web` silt — midagi muud ei muutu. npm-i/CLI installi korral (ilma Dockeri tõmmiseta) on samaväärseks puuduvaks osaks brauseri binaarfail: käivitage hostis `npx playwright install chromium`.

#### Eelväljalaskekanali kasutamine

Kanal `next` ehitatakse uuesti iga tõuke korral praegusesse vaikimisi `release/v*` harusse ning avaldatakse nii AMD64 kui ka ARM64 jaoks. Vanemad hooldusharud ei saa seda üle kirjutada. Kanal pakub allalaaditavat tõmmist parandustega, mis on liidetud aktiivsesse väljalaskeharusse enne järgmise stabiilse sildi loomist.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose'i puhul kirjuta valitud profiili kasutatav tõmmisesilt üle ning seejärel laadi tõmmis alla ja loo teenus uuesti:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Ohutus ja tagasipööramine

`next` on muutuva sihtmärgiga eelväljalaskekanal. See võib muutuda iga aktiivsesse väljalaskeharusse tehtud tõuke korral ja selle kasutamist tootmises **ei toetata**. Konkreetse järgu hindamise ajal fikseeri tõmmise räsi:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Enne testimist varunda OmniRoute'i andmeköide või sidushaagitud andmekataloog. Tagasipööramiseks taasta varem kasutatud stabiilne versioon või räsi ja loo konteiner uuesti:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Väljalaskeharu järk ei saa kunagi muuta silti `latest`; stabiilse viida saab uuendada ainult sobiv stabiilne semantiline versioon. `next`-tõmmiste puhul säilivad väljalasketõmmise kontroll ja väljalaset blokeeriv CRITICAL-taseme turvanõrkuste kontroll.

**`latest` ei taga giti ajakohasust.** Harusse `main` või aktiivsesse `release/v*` harusse liidetud parandused **ei sisaldu** tõmmises `:latest` enne, kui stabiilne SemVer-tõmmis on avaldatud ja avaldamistöö uuendab silti `:latest` (sama räsi nagu sellel SemVer-versioonil). Kui `latest` näib olevat muutumatu, kuigi GitHubis on parandus juba nähtav, laadi väljalaskeharu testimiseks alla `:next` või oota SemVer-silti.

| Soov                                                                            | Kasuta                               |
| ------------------------------------------------------------------------------- | ------------------------------------ |
| GitOps/tootmine, kus kõrvalekalded pole lubatud                                 | Fikseeri `:X.Y.Z` (või tõmmise räsi) |
| Järgi avaldatud stabiilseid versioone ja loo teenus iga väljalaske järel uuesti | `:latest`                            |
| Testi avaldamata `release/v*` sissekandeid                                      | `:next` (mitte tootmises)            |
| Testi haru `main`                                                               | `:main` (mitte tootmises)            |

## Käideldavus: vaikimisi SQLite on ühe replikaga

Standardne Docker / Kubernetes OmniRoute on **üks Node'i protsess + üks SQLite'i kirjutaja**. Kõrge käideldavus **ei ole selle topoloogia puhul toetatud**.

| Piirang                                                  | Tagajärg                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Üks kirjutaja                                            | **Ärge** käitage sama SQLite'i faili suhtes mitut replikat. See rikub andmebaasi.                                                                                                                                                                                                                                                                              |
| Taasloomine / taaskäivitamine / HEALTHCHECK-i lõpetamine | Töös olevate SSE-ühenduste, töölaua seansside ja mälusisese oleku **täielik katkestus**. Kõigi ühendatud klientide ühendus katkeb. Tühja lõpp-punkti ajavahemiku jooksul saavad uued päringud pöördpuhverserverilt vastuseks **`502 Bad Gateway: Unknown error`**, mitte OmniRoute'i JSON-i — kliendid ei suuda seda teenusepakkuja tõrkest eristada (#11015). |
| Sama sündmusetsükkel nagu `/healthz`                     | Hõivatud kataloogi- või tihendustsükkel võib kontrollpäringuid viivitada; lühike ajalõpp taaskäivitab seejärel **ainsa** replika.                                                                                                                                                                                                                              |

**Kontrollmaatriks** (vt ka [Kubernetese kontrollide soovitusi](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Kontroll              | Sihtmärk                                                        | Ärge kasutage                                                             |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Elusolek              | TCP pordil `PORT` (vaikimisi `20128`) või leebe HTTP `/healthz` | `/api/monitoring/health`                                                  |
| Valmisolek            | HTTP `GET /healthz`                                             | Lühikesi ajalõppe, mis käsitlevad hõivatud sündmusetsüklit mittetöötavana |
| Põhjalik / inimestele | `/api/monitoring/health`                                        | Kubeleti automaatse elusoleku kontrollina                                 |

**Uuendused:** arvestage, et kõik seansid katkevad. Võimaluse korral suunake kliendid enne mujale; vaikimisi SQLite'iga pole järkjärguline uuendamine võimalik. Compose'i `restart: unless-stopped` koos Dockeri `HEALTHCHECK`-iga asendab konteineri ebatervisliku oleku korral samuti ainsa protsessi — mõju ulatus on sama.

Kubernetese näide **ühe replika** jaoks (Recreate on kohustuslik; ärge suurendage `replicas` väärtust ühe SQLite'i faili puhul):

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

`preStop`-i ooteaeg võimaldab kube'il eemaldada Service'i lõpp-punktid enne SIGTERM-i, et **uus** liiklus ei jõuaks enam lõpetatavasse protsessi. Töös olevat `/v1/responses` SSE-d tühjendatakse kuni `SHUTDOWN_TIMEOUT_MS`-i täitumiseni (vaikimisi 30 s), kasutades raskekaalulisi vastuvõtulubasid (#11015). Uued päringud, mis siiski protsessini jõuavad, saavad vastuseks `503` + `Retry-After: 5`. Recreate'i tühja lõpp-punkti periood kuni asendus on valmis, tähendab endiselt täielikku katkestust — see tuleneb SQLite'i topoloogiast, mitte kontrolli valest konfiguratsioonist.

Väline Postgres / mitme kirjutajaga HA **ei ole** dokumenteeritud standardlahendus. Kui vajate HA-d, kasutage üht replikat või topoloogiat, mida projekt on eraldi testinud ja dokumenteerinud. Postgres/MySQL-i arendus toimub teemas [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kuni see pole valminud, on ainus toetatud viis **suurte** `/v1/responses` päringute läbilaskevõime suurendamiseks N sõltumatut protsessi (järgmine jaotis), mitte `replicas > 1` ühel andmeköitel.

## Horisontaalne skaleerimine: N sõltumatut protsessi

Üks Node'i protsess on **üks V8 kuhi**. Kaks kattuvat ~3 MiB / ~750k-tokenilist kodeerimisagendi `POST /v1/responses` päringut (RTK + Caveman) katkestavad selle kuhja töö ~12 Gi juures (`FATAL ERROR: Reached heap limit`) ja võivad põhjustada 16 Gi cgroup'is OOM-i. Vaadake [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). See mõõtmine on **mälueelarve** hoiatus, mitte toote range ülempiir kahele samaaegsele pikale `/v1/responses` päringule. Mahukate vestluspäringute vastuvõttu piirab automaatselt tuletatud sisendi baitide eelarve (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), mille suurus põhineb samal V8/cgroup'i ülempiiril — selle suurendamine (või päringute arvul põhineva pärandpiirangu `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` määramine) juba sobivalt seadistatud protsessis põhjustab taas katkestuse. Väikesed vestluspäringud, `/healthz`, `/v1/models` ja MCP **ei kuulu** selle piirangu alla.

### Üks protsess: rohkem kui kaks pikka `/v1/responses` päringut

**Terve** protsess (kuhi alla `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, vaikimisi `0.75`) **võib** käitada rohkem kui kahte samaaegset pikka `POST /v1/responses` päringut, kui kogu protsessi lennus olevate baitide eelarves (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) on veel ruumi. Päringukehad, mille suurus on vähemalt `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (vaikimisi 256 KiB), võtavad sama raskekaalulise loa nagu struktuurimahukad päringud ja kasutavad sama [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` erandmehhanismi (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Kümned samaaegsed pikad SSE-kliendid (operaatorid vajavad sageli 40–50) on **mälueelarve** küsimus — seadistage kuhi + põhi-/varuruumi kohad + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — mitte toote range „max 2” piirang. Surve all olev kuhi tõrjub päringuid endiselt uuesti proovitava `503` vastusega, et #7849 ei korduks.

**Mitme kuhja** (sõltumatute V8 old-space'i alade) kasutamiseks **praegu**:

| Tehke                                                                                                                                                                                                  | Ärge tehke                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Käitage **N konteinerit/podi**, igaühel **oma** `DATA_DIR` / köide                                                                                                                                     | Ärge määrake `replicas > 1` ühe SQLite'i faili jaoks              |
| Dimensioneerige raskekaaluliste lennus olevate päringute + terve protsessi varuruum kuhja / lennus olevate baitide eelarve järgi; 1–2 on konservatiivne #7849 vaikeväärtus, mitte toote range ülempiir | Ärge andke ühele protsessile 8× RAM-i ja piiramatut arvupiirangut |
| Valikuline: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **jagatud kvoodiloendurite** jaoks                                                                                                    | Ärge käsitlege Redist jagatud SQLite'ina — see ei ole seda        |
| Kopeerige teenusepakkuja saladused igasse eksemplari (või leppige eraldatud töölaudadega)                                                                                                              | Ärge eeldage üht töölauda / üht kõnelogi kõigi eksemplaride jaoks |
| Kasutage ees mis tahes koormusjaoturit; API-võtme või seansi põhine kleepuvus on piisav                                                                                                                | Ärge nõudke teenusepakkujapõhist suurust arvestavat vahevara      |

Riistvara: ühe eksemplari samaaegsete pikkade `/v1/responses` päringute arv on **mälueelarve** küsimus (kuhi + lennus olevate baitide eelarve / #10110). `N` sõltumatut `DATA_DIR`-i mitmekordistavad endiselt kuhjade arvu: hosti RAM peab mahutama `N × cgroup`, mitte „üks 16 Gi pod, milles N=8”. Ärge kunagi kasutage `replicas > 1` ühe SQLite'i faili puhul.

Compose'i näidis (kaks kuhja, kaks köidet — mitte `deploy.replicas: 2`):

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

Protsessisisest tihedust (tihendamine väljaspool HTTP-isolaati) käsitleb [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Üht loogilist klastrit jagatud püsioleku peal käsitleb [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini piirkondlikud vead Dockeris

Google AI Studio / Gemini API võib tagastada HTTP 400 vea FAILED_PRECONDITION ja teate
`User location is not supported for the API use.` Edukas päring hostis ei tõenda,
et konteiner kasutaks sama väljuvat marsruuti. DNS-i järjestus, IPv4/IPv6 ühenduvus,
VPN-i marsruutimine ja seadistatud puhverserverid võivad erineda. Kontrollige nii
[Google'i toetatud piirkondi](https://ai.google.dev/gemini-api/docs/available-regions)
kui ka tegelikku ühendusmarsruuti; ainuüksi see viga ei viita vigasele API-võtmele.

### Eelistage ühendusepõhist puhverserverit

Kasutage mõjutatud Gemini ühenduse jaoks OmniRoute'i
[ühendusepõhist puhverserveri konfiguratsiooni](../ops/PROXY_GUIDE.md#4-level-proxy-system),
seejärel korrake toimingut **Testi ühendust** ja tehke sama mudeliga väike päring.
Nii piirdub marsruudimuudatus selle ühendusega. Veenduge, et puhverserver oleks
konteinerist kättesaadav ja ühendus seda ka tegelikult kasutaks. Marsruudi muutmine
ei taga, et ülesvooluteenus peab piirkonda sobivaks.

### Võrrelge hosti ja konteineri võrguühendust

Autenditud tulemuste võrdlemisel hoidke võti, mudel ja päring identsed; ärge kunagi
lisage probleemikirjeldusse mandaate, puhverserveri paroole ega täielikke autoriseerimispäiseid.
Esmalt kontrollige, milliseid aadressiperekondi operatsioonisüsteemi resolver pakub,
kasutades hostis ja konteineris sama käsku:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Asendage `omniroute` kasutatava teenuse nimega (näiteks `omniroute-web`). Need käsud
väljastavad aadressiperekonnad ilma mandaatide või IP-aadressideta. Tagastatud `6`
näitab ainult IPv6 DNS-i tulemust: see **ei** tõenda toimiva IPv6 marsruudi ega API-le
juurdepääsu olemasolu. Kui `curl` on installitud, võrrelge mõlemas keskkonnas käsku
`curl -4 -I https://generativelanguage.googleapis.com` käsuga
`curl -6 -I https://generativelanguage.googleapis.com`. HTTP-vastus tõendab selle
kontrollpäringu ühenduvust isegi juhul, kui vastuseks on autentimata päringu viga;
Gemini kasutusõigust kontrollib ainult autenditud mudelipäring.

### Hostitaseme alternatiiv: toimiv IPv6 ja resolveri poliitika

Probleemi [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) raporteerija
taastas oma keskkonnas juurdepääsu, lubades konteineri IPv6 ja muutes glibc aadressivalikut.
Käsitlege seda keskkonnaspetsiifilise alternatiivina. Enne resolveri eelistuste muutmist
veenduge, et hosti IPv6, konteineri väljuv ühendus ja marsruutimine ning tulemüürireeglid
toimiksid. Privaatne ULA-aadress üksi ei tõenda avaliku IPv6-ühenduse olemasolu.

Teenuste puhul, mis on juba ühendatud Compose'i vaikevõrku, lubab järgmine fragment
selles võrgus IPv6; säilitage ülejäänud teenuse-, pordi-, andmeköite- ja konfiguratsiooniseaded:

```yaml
networks:
  default:
    enable_ipv6: true
```

Nimega võrgu puhul lubage see võrgus, millega teenus tegelikult liitub. Docker võib
eraldada ULA-alamvõrgu; valige selgesõnaline ja mittekattuv alamvõrk ainult juhul,
kui teie võrk seda nõuab. Vaadake
[Dockeri IPv6-võrgunduse](https://docs.docker.com/engine/daemon/ipv6/) ja
[Compose'i võrguvalikute](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)
dokumentatsiooni.

**glibc-põhises tõmmises** saab `/etc/gai.conf` muuta aadressivalikut. Hoidla praegune
Dockerfile kasutab Debianit; kohandatud musl-põhised tõmmised seda mehhanismi ei kasuta.
Raporteeritud muudatus asendab ULA märgendi `label fc00::/7 6` märgendiga
`label fc00::/7 1`. Lähtuge tõmmise täielikust poliitikatabelist ja säilitage selle
muud kirjed: `label`- või `precedence`-kirje lisamine asendab vaikimisi tabeli, seega
ei piisa failist, mis sisaldab ainult muudetud rida.
[glibc konfiguratsiooni dokumentatsioon](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
kirjeldab neid semantikareegleid. Haakige ülevaadatud fail kirjutuskaitstult asukohta
`/etc/gai.conf` ja looge teenus muudatuse rakendamiseks uuesti.

See muudab operatsioonisüsteemi aadressivalikut **kogu selle konteineri väljuva liikluse jaoks**.
See ei sunni kõiki rakendusi IPv6 valima: olulised on ka Node'i DNS-i järjestus ja
ühenduse valik. Eelkõige eelistab `--dns-result-order=ipv4first` IPv4 ja see ei lahenda
ainult IPv4 kasutamisel tekkivat tõrget. Vaadake
[Node'i DNS-i järjestuse dokumentatsiooni](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Pärast iga hostitaseme muudatust testige uuesti Geminit ja teisi teenusepakkujaid.
Muudatuse tagasivõtmiseks eemaldage kohandatud `gai.conf`-i haakepunkt, taastage eelmine
võrgukonfiguratsioon ning looge mõjutatud teenus või võrk hooldusakna jooksul uuesti.
Võrgu uuesti loomine võib katkestada teiste sellega ühendatud konteinerite töö;
ärge kustutage püsivate andmete köidet.

## Olulised märkused

- **SQLite'i WAL-režiim:** Käsul `docker stop` tuleks lasta lõpule jõuda, et OmniRoute saaks viimased muudatused kontrollpunktina faili `storage.sqlite` tagasi kirjutada. Kaasasolevates Compose'i failides on peatamise ajapikenduseks juba määratud 40 sekundit. Kui käitate tõmmist otse, säilitage `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Määrake väärtuseks `true`, kui korralisi/kirjutamiseelseid varukoopiaid hallatakse väliselt. Olemasoleva andmebaasi migratsioonid vajavad siiski oma püsivat turvatõmmist ja massmigratsiooni kaitsemehhanismi.
- **Andmete püsivus:** Andmebaasi, võtmete ja konfiguratsioonide säilitamiseks konteineri taaskäivituste vahel ühendage alati andmeköide asukohta `/app/data`.
- **Pordi konfiguratsioon:** Vaikimisi kasutatava pordi `20128` muutmiseks alistage keskkonnamuutuja `PORT`.

## Vaadake ka

- [Virtuaalmasinas juurutamise juhend](../ops/VM_DEPLOYMENT_GUIDE.md) — Virtuaalmasina + nginxi + Cloudflare'i seadistus
- [Fly.io-s juurutamise juhend](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Juurutamine Fly.io-sse
- [Keskkonna konfiguratsioon](../reference/ENVIRONMENT.md) — Täielik `.env` viide
