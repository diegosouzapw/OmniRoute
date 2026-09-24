# 🐳 Docker Guide — OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Täielik Dockeriga juurutamise teatmik. Kiireks alustamiseks vaadake [README Docker-sektsiooni](../README.md#-docker).

## Sisukord

- [Kiirkäivitus](#quick-run)
- [Keskkonnafailiga](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Saadaolevad profiilid](#available-profiles)
- [Hosti CLI-tööriistade seadistamine, kui OmniRoute töötab Dockeris](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redise sidecar](#redis-sidecar)
- [Tootmiskeskkonna Compose](#production-compose)
- [Dockerfile'i etapid](#dockerfile-stages)
- [Kriitilised keskkonnamuutujad](#critical-environment-variables)
- [Docker Compose koos Caddyga (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare'i Quick Tunnel](#cloudflare-quick-tunnel)
- [Tõmmisesildid](#image-tags)
- [Kättesaadavus: vaikimisi SQLite toetab üht replikaati](#availability-default-sqlite-is-single-replica)
- [Olulised märkused](#important-notes)

---

## Kiirkäivitus

> **Isemajuta ühe käsuga?** Vaata
> [isemajutuse juhendit](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (avaldatud tõmmis +
> Redis, ainult loopback-liidesel, profiili pole vaja valida). Allolev kiirkäivitus on
> ühe konteineriga lahendus kasutajatele, kes käitavad Redist juba mujal.

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
# Baasprofiil (ilma CLI-tööriistadeta)
docker compose --profile base up -d

# CLI-profiil (sisseehitatud Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Hostiprofiil (eelkõige Linuxile; haagib hosti CLI-binaarfailid kirjutuskaitstult)
docker compose --profile host up -d

# Veebiprofiil (Chromium/Playwright veebiseansi pakkujate jaoks)
docker compose --profile web up -d

# CLI ja CLIProxyAPI külgkonteineri kombineerimine
docker compose --profile cli --profile cliproxyapi up -d
```

## Saadaolevad profiilid

OmniRoute sisaldab peamiste juurutusviiside jaoks Compose'i profiile. Valige oma keskkonnale sobiv profiil.

| Profiil            | Teenus           | Millal kasutada                                                                                                                                       | Käsk                                         |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (vaikimisi) | `omniroute-base` | Ilma graafilise liideseta server / minimaalne käituskeskkond, teenusepakkujate CLI-sid pole kaasas                                                    | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | Agenttöövood, mis kutsuvad käske `omniroute providers/setup/doctor` ja kaasasolevaid CLI-sid (Codex, Claude Code, Droid, OpenClaw)                    | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | Linuxi hostid, mis vajavad hosti CLI-dele `network_mode`-laadset juurdepääsu, ühendades kirjutuskaitstult `~/.local/bin`, `~/.codex`, `~/.claude` jne | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) külgkonteineri käitamine pordil `8317` ülesvoolu CLI-puhverdamiseks                       | `docker compose --profile cliproxyapi up -d` |
| `web`              | `omniroute-web`  | Brauserit vajavad veebiseansi pakkujad: `gemini-web`, `claude-web`, `claude-turnstile` (koostab `runner-web`-i, Chromium on kaasas)                   | `docker compose --profile web up -d`         |

> Kombineerida saab mitut profiili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Hosti CLI-tööriistade seadistamine, kui OmniRoute töötab Dockeris

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ja juhtpaneeli nupp
**Salvesta konfiguratsioon** kirjutavad kõik faile, näiteks `~/.codex/*.config.toml`. Need teed
omavad tähendust ainult masinas, kus CLI tegelikult töötab. Kui käivitate need
konteineris, kirjutatakse fail konteineri enda kodukataloogi (`/home/node` —
tõmmis töötab kasutajana `USER node`), kust ükski hosti CLI seda kunagi ei loe ja kus see
konteineri taasloomisel kohe kustutatakse.

OmniRoute tuvastab selle ja keeldub kirjutamisest, kuvades kasutamiskõlbmatu
eduteate asemel juhised: CLI lõpetab töö koodiga `2` ja API vastab koodiga `422`
ning väärtusega `containerEphemeralTarget: true`.

### Soovitus: käivitage CLI hostis ja OmniRoute Dockeris

Konteiner pakub API-t; CLI seadistab teie hosti tööriistu.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # suuna CLI konteinerile
omniroute setup-codex                      # kirjutab hostis tegelikku ~/.codex kataloogi
```

See on õige valik, kui Codex, Claude Code, Cursor või muu sarnane töötab teie
sülearvutis — see on tavapärane seadistus.

### Alternatiiv: ühendage hosti konfiguratsioonikataloogid bind-haakimisega (`host`-profiil)

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

Bind-haakimine muudab tee usaldusväärseks: OmniRoute loeb faili
`/proc/self/mountinfo` ja lubab kirjutada haagitud teedele (ning kataloogidesse,
mille alamkataloogid on haagitud, mis vastab täpselt ülaltoodud `/host-home` struktuurile), keeldudes
endiselt kirjutamast haakimata teedele.

### Varuväljapääs: konteineri enda CLI-de seadistamine (kasutage säästlikult)

Kui CLI-d asuvad tõepoolest konteineris (`cli`-profiil), on kirjutamine
taotluslik. Edastage mis tahes `setup-*` käsule `--allow-container-write` või määrake
serveri jaoks `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Kirjutamine jätkub
hoiatusega, et see ei säili pärast konteineri kadumist.

> **Turvahoiatus — `cli`-profiil + `docker.sock` haakimine.**
> `cli`-profiil haagib bind-haakimisega `/var/run/docker.sock`, et konteinerisisene
> automaatvärskendaja saaks hosti deemoni kaudu pinustiku uuesti luua
> (`src/lib/system/autoUpdate.ts` kontrollib selle sokli olemasolu ja jätab
> Dockeri tee selle puudumisel vahele). See sokkel on **hosti juurkasutaja taseme
> usalduspiir**: kõik, mis sellele ligi pääseb, juhib hosti Dockeri deemonit
> juurkasutajana — see saab hostis luua, kontrollida, peatada ja eemaldada mis tahes konteineri.
> Tagajärjed:
>
> 1. **Ärge kunagi avaldage `cli`-profiili porti võrku.** Avaldage
>    see aadressil `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — kohtvõrgust ligipääsetav `cli`-profiil muudab mis tahes juhtpaneeli taseme RCE
>    hosti täielikuks kompromiteerimiseks.
> 2. **Ärge bind-haakige `cli`-profiili täiendavaid hosti katalooge.**
>    Dockeri sokkel koos mis tahes täiendava haakega annab konteinerile täieliku
>    lugemis- ja kirjutamisõiguse teie failisüsteemile ning hosti konfiguratsioonile. Kui tööriist peab
>    projektile ligi pääsema, käivitage see lokaalselt CLI binaarfaili abil — ärge haakige projekti
>    `cli`-konteinerisse.
>
> Kui te ei vaja konteinerisisest automaatvärskendust, jätke `cli`-profiil välja
> (`COMPOSE_PROFILES=core,redis` või lühem variant). Teised profiilid ei
> haagi Dockeri soklit.
>
> Seotud MITM-i ohumudelit käsitleb `docs/security/MITM-TPROXY-DECRYPT.md` (git-is; seda ei kompileerita kataloogi `/docs`)
> ja `codex`/`claude-code`/`droid`/`openclaw` binaarfailide päritoluahelat
> kirjeldab `docs/security/SUPPLY_CHAIN.md`.

## Redis sidecar-konteiner

OmniRoute kasutab Redist hajutatud päringusageduse piiraja ja jagatud vahemälu jaoks. Teenus `redis` on failis `docker-compose.yml` **alati määratletud** (sellel puudub profiilipiirang) ning see käivitub koos mis tahes muu profiiliga.

| Üksikasjad                 | Väärtus                                   |
| -------------------------- | ----------------------------------------- |
| Tõmmis                     | `redis:7-alpine`                          |
| Konteineri nimi            | `omniroute-redis`                         |
| Sisemine port              | `6379`                                    |
| Hosti port (ülekirjutatav) | `REDIS_PORT` (vaikimisi `6379`)           |
| Hosti seos (ülekirjutatav) | `REDIS_BIND_HOST` (vaikimisi `127.0.0.1`) |
| Andmeköide                 | `omniroute-redis-data` → `/data`          |
| Tervisekontroll            | `redis-cli ping` (10 s intervall)         |

Seotud keskkonnamuutujad:

- `REDIS_URL` — rakendusse sisestatav ühendusstring (vaikimisi `redis://redis:6379`).
- `REDIS_PORT` — Redis-konteineri hostipoolse pordi vastendus.
- `REDIS_BIND_HOST` — hosti võrguliides, millel port avaldatakse. Vaikimisi `127.0.0.1`.

> **Miks kasutatakse vaikimisi tagasisideaadressi:** sidecar-konteiner töötab ilma suvandita `requirepass` ja rakenduse
> konteinerid pääsevad sellele juurde compose-võrgu kaudu (`redis:6379`) — avaldatud port on
> mõeldud ainult hostipoolsetele tööriistadele (`redis-cli`, kohalik `npm run dev`). Avaldamine aadressil
> `0.0.0.0` teeks autentimata Redise kättesaadavaks kõigile teie kohtvõrgu hostidele. Kui määrate
> `REDIS_BIND_HOST=0.0.0.0`, lisage teenuse väljale `command:` ka `--requirepass`.

**Redise keelamine** pole soovitatav (päringusageduse piiraja läheb üle vähem töökindlale mälupõhisele varulahendusele). Kui see on siiski vajalik, eemaldage või kommenteerige välja teenuseplokk `redis:` failis `docker-compose.yml` või skaleerige see nullini:

```bash
docker compose up -d --scale redis=0
```

## Tootmiskeskkonna Compose

Arenduskeskkonna kõrval töötava isoleeritud tootmistõmmise jaoks kasutage faili `docker-compose.prod.yml`.

| Üksikasjad            | Väärtus                                                                             |
| --------------------- | ----------------------------------------------------------------------------------- |
| Fail                  | `docker-compose.prod.yml`                                                           |
| Juhtpaneeli vaikeport | `PROD_DASHBOARD_PORT=20130` (vastendatud sisemisele `${DASHBOARD_PORT:-20128}`)     |
| API vaikeport         | `PROD_API_PORT=20131`                                                               |
| Tõmmis                | `omniroute:prod` (koostatud sihtmärgist `runner-cli`)                               |
| Redis-konteiner       | `omniroute-redis-prod` (`redis:8.6.2`, eraldiseisev andmeköide `redis-prod-data`)   |
| Andmeköide            | `omniroute-prod-data` (nimeline, säilib korduskoostamiste vahel)                    |
| Tervisekontrollid     | `node healthcheck.mjs` + `redis-cli ping`, kus `depends_on` sõltub Redise tervisest |

Kasutamine:

```bash
# Koosta ja käivita tootmiskeskkonna teenused
docker compose -f docker-compose.prod.yml up -d --build

# Voogedasta logisid
docker compose -f docker-compose.prod.yml logs -f

# Peata ja eemalda teenused (säilita andmeköited)
docker compose -f docker-compose.prod.yml down
```

Tootmiskeskkonna teenused töötavad paralleelselt arenduskeskkonna compose-teenustega (konteinerite nimed, pordid ja andmeköited on erinevad), mistõttu saate jätkata kohalikku arendust, samal ajal kui tootmiskeskkond töötab.

## Dockerfile’i etapid

Hoidla sisaldab mitmeetapilist Dockerfile’i (`Dockerfile`). Saadaval on neli etappi; vali oma kasutusjuhu jaoks õige `target`.

| Etapp         | Baastõmmis            | Otstarve                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installib sõltuvused (`npm ci --legacy-peer-deps`) ja käivitab käsu `npm run build` (vaikimisi Turbopack — vt allpool jaotist „Ehitusaegsed ressursid”)                                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | Tootmiskäituskeskkond koos Next.js-i autonoomse väljundiga. **Teenusepakkujate CLI-sid ei kaasata.**                                                                                                                                                                                          |
| `runner-cli`  | `runner-base`         | Lisab `git`, `docker.io`, `docker-compose` ja globaalsed CLI-d: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vali see agentpõhiste töövoogude jaoks.**                                                                                                                |
| `runner-web`  | `runner-base`         | Lisab Playwrighti ja Chromiumi brauseri (`--with-deps`) veebiseansside teenusepakkujate jaoks: `gemini-web`, `claude-web`, `claude-turnstile`. **Vali see nende teenusepakkujate kasutamisel** — ilma selleta nurjub tavaline tõmmis päringu ajal (vt väljalaskekanalite all märkust `-web`). |

Konkreetse sihtetapi käsitsi ehitamine:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ehitusaegsed ressursid

Kolm ehitusargumenti määravad `builder`-etapi ressursikulu. Need kehtivad ainult ehitamise ajal —
`OMNIROUTE_MEMORY_MB` (allpool) on eraldi käitusaegne seadistus.

| Ehitusargument              | Vaikeväärtus | Mõju                                                                                                       |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`          | Väärtus `0` kasutab ehitamiseks webpacki. Väiksem mälu tippkasutus, kuid aeglasem.                         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8 kuhjamälu ülempiir (`--max-old-space-size`) käivitatud protsessile `next build`.                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Edastatakse muutujale `CIRCLE_NODE_TOTAL`; Next tuletab leheandmete kogumiseks väärtuse `workers = N - 1`. |

`OMNIROUTE_BUILD_WORKERS` on parameeter, mida suure võimsusega ehituskeskkonnas suurendada
ja mida kahtlustada siis, kui piiratud ressurssidega ehitus nurjub **pärast** teadet
`✓ Compiled successfully`. Iga leheandmete töötlusprotsess on eraldi protsess ning
sama kehtib ka emaprotsessi `next build` kohta; töötavas VPS-is tehtud katse
(probleem #7518) mõõtis iga protsessi RSS-i tippväärtuseks ~4,5 GB, sõltumata
kuhjamälu lipust `NODE_OPTIONS` (Turbopack kompileerib väljaspool V8 kuhjamälu
asuvasse natiivsesse/Rusti mällu). Vaikeväärtus `2` (→ 1 töötlusprotsess, kokku
2 protsessi) on kohandatud avaldamiskonveieris kasutatavatele GitHubi hostitud
16 GB / 4 vCPU-ga käitajatele. Väärtusega `8` (→ 7 töötlusprotsessi) sai selle
käitaja mälu otsa ja buildkit nurjas etapi veaga
`ResourceExhausted: ... cannot allocate memory`; ka `3` (→ 2 töötlusprotsessi)
ei mahtunud pärast seda, kui protsessipõhist RSS-i mõõdeti järeldamise asemel
otse. `tests/unit/docker-build-memory-budget.test.ts` teeb arvutused mõõdetud
väärtuse põhjal ja nurjub, kui kumbki seadistus ületab käitaja võimalusi.

Turbopack kompileerib natiivsesse Rusti mällu, mis asub **väljaspool** V8 kuhjamälu,
seega `OMNIROUTE_BUILD_MEMORY_MB` seda ei piira. Mälu ülempiiriga hostis saadab OOM-i
tõrjeprogramm ehitusprotsessile seejärel SIGKILL-signaali ilma igasuguse veatekstita —
protsess lihtsalt peatub keset etappi `Creating an optimized production build`, mis
näib mälu lõppemise asemel hangumisena. Kui ehitushosti ressursid on piiratud,
vaheta pakkijat:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` on lubatud, seega käivitab `next build` emaprotsessi **ja**
töötlusprotsessi ning kumbki järgib eraldi väärtust `OMNIROUTE_BUILD_MEMORY_MB`.
Määra konteineri ülempiir sellest väärtusest ligikaudu kaks korda suuremaks, mitte
sellega võrdseks.

Selles lähtekoodipuus mõõdetud (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakkija   | Konteineri ülempiir | Tulemus                              |
| --------- | ------------------- | ------------------------------------ |
| Turbopack | 8 GiB / 16 GiB      | OOM lõpetas mõlemad ilma teateta     |
| webpack   | 8 GiB               | töötlusprotsess sai SIGKILL-signaali |
| webpack   | 12 GiB              | õnnestus, tippkasutus oli 11,1 GiB   |

### Käitusaja vaikeväärtused

`runner-base` eksporditud vaikeväärtused: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Mälu käitumine Dockeris:

- Tõmmis määrab `OMNIROUTE_MEMORY_MB=1024` ja tuletab sellest `NODE_OPTIONS=--max-old-space-size=1024`.
- Tegeliku serveriprotsessi käivitab eraldiseisev käiviti, mis loeb väärtust `OMNIROUTE_MEMORY_MB` ja lisab `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node kasutab viimast korduvat `--max-old-space-size` väärtust, seega juhib `OMNIROUTE_MEMORY_MB` Dockeris tegelikult rakenduvat kuhjamälu piirangut.
- Kuna tõmmis määrab selle alati, ei rakendu käiviti enda RAM-i põhjal kalibreeritud varuväärtus Dockeris kunagi. Suurendage seda töökoormuse jaoks selgesõnaliselt (vt allolevat tabelit). `2048` on programmeerimisagendi `/v1/responses` päringute jaoks endiselt liiga väike.

### Käitusaegne RAM programmeerimisagentidele

Dockeri 1 GiB vaikeväärtus on juhtpaneeli ja kerge vestluse miinimum, mitte tootmiskeskkonna jaoks sobiv maht. Pikad `POST /v1/responses` päringukehad (sajad sõnumid, kümned tööriistad) hoiavad tihendamise ajal mälus mitut graafi. Kaks kattuvat ~3 MiB / ~750k-tokenilist päringut on põhjustanud V8 katkestuse **12 GiB** old-space'i juures (`FATAL ERROR: Reached heap limit`) ning ka 16 GiB cgroup'i OOM-i. Vt [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Määrake **cgroup'i `--memory` kuhjamälust suuremaks** — natiivsed puhvrid, SQLite ja tihendamise vahetulemused paiknevad väljaspool V8-t.

| Töökoormus                                     | `OMNIROUTE_MEMORY_MB`         | Konteiner / cgroup       | Märkused                                                                                                                       |
| ---------------------------------------------- | ----------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Juhtpaneel, üks kerge vestlus                  | `1024` (tõmmise vaikeväärtus) | ≥2 GiB                   |                                                                                                                                |
| Üks programmeerimisagent (Claude/Codex/Grok)   | `8192`                        | ≥10 GiB                  | Tüüpiline ühe seansi `/v1/responses`                                                                                           |
| Kaks samaaegset pikka `/v1/responses` päringut | `10240`–`12288`               | ≥12–16 GiB               | Mõõdetud V8 katkestus ~12 GiB kuhjamälu juures                                                                                 |
| Kolm või enam samaaegset pikka konteksti       | ärge kasutage ühes protsessis | jadastage / rohkem RAM-i | Vaikimisi lubatakse korraga 1 suure koormusega päring; selle arvu suurendamine ilma RAM-i lisamata põhjustab katkestuse uuesti |

`omniroute serve` kalibreerib otse riistvaral ligikaudu 35% RAM-ist (piiratuna vahemikku `[512, 4096]`), kui `OMNIROUTE_MEMORY_MB` on **määramata**. Docker määrab alati väärtuse `1024`, mistõttu ei käivitata seda kalibreerimist ametlikus tõmmises kunagi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kriitilised keskkonnamuutujad

Lisaks failis [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumenteeritud vaikeväärtustele on Dockeri all käitamisel kõige olulisemad järgmised muutujad:

| Muutuja                       | Otstarve                                                                                                                                                                                                                                                                         | Vaikeväärtus            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocketi silla jagatud saladus. **Tootmiskeskkonnas nõutav** — määrake väärtuseks tugev juhuslik string.                                                                                                                                                                       | määramata (tuleb anda)  |
| `REDIS_URL`                   | Ühendusstring päringusageduse piiraja / vahemälu taustsüsteemi jaoks                                                                                                                                                                                                             | `redis://redis:6379`    |
| `REDIS_PORT`                  | Komplekti kuuluva Redise konteineri hostipoolne port                                                                                                                                                                                                                             | `6379`                  |
| `REDIS_BIND_HOST`             | Hostiliides, millel komplekti kuuluva Redise port avaldatakse (tagasisideahela liides, kui te ei lisa autentimist)                                                                                                                                                               | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hosti tee, mis haagitakse isevärskendamise töövoogude jaoks profiilis `cli` asukohta `/workspace/omniroute`                                                                                                                                                                      | `.` (praegune kataloog) |
| `OMNIROUTE_MEMORY_MB`         | Node'i kuhjamälu ülempiir Dockeri eraldiseisva serveri käitusajal; alistab ülal toodud tõmmise vaikeväärtuse. Kodeerimisagendid: `8192`+ (vt [käitusaja muutmälu](#runtime-ram-for-coding-agents)).                                                                              | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | Alistab töölaua (20128) ja API (20129) avaldatud pordid                                                                                                                                                                                                                          | `20128` / `20129`       |
| `APP_BIND_HOST`               | Hostiliides, millel docker-compose avaldab töölaua/API/live-WS-i pordid. Kui `REQUIRE_API_KEY=false` (vaikeväärtus), avaldab `0.0.0.0` anonüümse `/v1`-proksi kohtvõrgule — laiendage juurdepääsu ainult juhul, kui `REQUIRE_API_KEY=true`, või kasutage selle ees pöördproksit. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | Hostiliides, millel docker-compose avaldab `cliproxyapi` külgkonteineri — selle andmeköide sisaldab teenusepakkuja identimisteavet.                                                                                                                                              | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | Kataloog, mida käitusaegne pistikprogrammide skanner loeb ja kuhu see pistikprogramme installib. Määrake see, kui pistikprogrammid on sidushaagitud: vaikeväärtus järgib muutujat `HOME`, mida tõmmis ei pruugi eksportida.                                                      | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | URL-i alamtee, kui rakendus avaldatakse pöördproksi taga (nt `/omniroute`)                                                                                                                                                                                                       | _(tühi = juur)_         |
| `NEXT_PUBLIC_BASE_URL`        | Avalik brauseri päritolu koos alamteega (nt `https://host/omniroute`)                                                                                                                                                                                                            | määramata               |
| `PROD_DASHBOARD_PORT`         | Hostipoolne töölauaport faili `docker-compose.prod.yml` jaoks                                                                                                                                                                                                                    | `20130`                 |
| `CLIPROXYAPI_PORT`            | Külgkonteineri `cliproxyapi` hostipoolne port                                                                                                                                                                                                                                    | `8317`                  |

## Pöördproksi alamteel (Traefik / nginx)

Next.js-i `basePath` kompileeritakse autonoomsesse paketti. OmniRoute salvestab paketti
lisatud väärtuse rakenduse juurkataloogis olevasse tunnusfaili (see kirjutatakse käsu
`npm run build` ajal ja seda loeb `scripts/docker/ensure-docker-base-path.mjs`) ning
võrdleb seda konteineri käivitumisel muutujaga `OMNIROUTE_BASE_PATH`. Kui need erinevad
ja tõmmis loodi domeeni juurtee jaoks, kirjutab käivituspunkt enne käsu
`node dev/run-standalone.mjs` käivitamist ümber autonoomse paketi manifestid,
manustatud `basePath`/`assetPrefix` literaalid (Next 16 renderdab SSR-i varade URL-id
ainult `assetPrefix` põhjal — paikaja peegeldab alamtee ka sinna), paketti lisatud
`/_next/static` varade URL-id (kliendiviidete manifestid, meediumiimpordid,
eelrenderdatud vealehed) ja kliendi `process.env`-i asenduskihi.

### Koostamine Compose'iga (soovitatav)

Määrake mõlemad muutujad failis `.env` ja seejärel koostage tõmmis uuesti, et tõmmise
ning käituskeskkonna seaded ühtiksid:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` edastab `OMNIROUTE_BASE_PATH`-i nii Dockeri koosteargumendina kui
ka käituskeskkonna keskkonnamuutujana.

### Eelkoostatud juurtee tõmmis + käitusaegne alamtee

Avaldatud `diegosouzapw/omniroute:*` tõmmised on koostatud domeeni juurtee jaoks.
Sellegipoolest saate määrata `OMNIROUTE_BASE_PATH`-i käitusajal; konteiner paikab paketti
käivitumisel ühe korra. Kasutage koos sellega sobivat avalikku lähteaadressi:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Seadistage pöördproksi edastama **täielikku** välist teed (ärge eemaldage prefiksit).
Traefik peaks suunama `PathPrefix(`/omniroute`)` konteinerisse ilma `StripPrefix`-ita,
et Next.js saaks tee `/omniroute/...` ja serveeriks varasid teelt
`/omniroute/_next/...`.

Dockeri tervisekontroll kontrollib aktiivse `OMNIROUTE_BASE_PATH`-iga prefiksitud
kergekaalulist elutsükli lõpp-punkti `/healthz`. `/api/monitoring/health` jääb
inimestele ja juhtpaneelidele mõeldud diagnostikaks kättesaadavaks; konteineri
HEALTHCHECK-i uuesti sellele suunamiseks (näiteks põhjaliku tervisekontrolli
jõustamiseks) määrake `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. See tee
teeb **põhjaliku** kontrolli (andmebaas + seire kokkuvõte) — see sobib Dockeri harva
käivitatava `HEALTHCHECK`-i jaoks, kui otsustate selle uuesti kasutusele võtta, kuid
**mitte** Kubernetes `livenessProbe`-i intervallide jaoks.

Orkestreerimissüsteemide (Kubernetes, Nomad jne) puhul:

| Kontroll            | Eelistage                                                        | Vältige                                                            |
| ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| Elusolek            | HTTP `GET /livez` või TCP põhipordil (`PORT`, vaikimisi `20128`) | `/api/monitoring/health` elusoleku kontrollina                     |
| Valmisolek          | HTTP `GET /healthz`                                              | Lühikesi ajalõppe, mis käsitlevad hõivatud sündmusetsüklit surnuna |
| Põhjalik / blackbox | `/api/monitoring/health`                                         | —                                                                  |

`/healthz` teatab protsessi elutsükli oleku (`ok` / `starting` / `stopping`). `/livez`
kontrollib ainult seda, kas protsess töötab (200 alati, kui töötleja saab käivituda;
see ei oota valmisolekut). Mõlemad töötavad siiski päringute töötlemisega samas Node'i
sündmusetsüklis, mistõttu võivad protsessorimahukad kataloogi- või tihendustoimingud
neid viivitada — hõivatud ≠ surnud. Kui HTTP-kontrollid aeguvad, eelistage TCP-põhist
elusoleku kontrolli. Täielikud kontrollijuhised:
[Seirejuhend — Kubernetes kontrollide soovitused](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose koos Caddyga (automaatne HTTPS-i TLS)

OmniRoute'i saab turvaliselt avalikustada Caddy automaatse SSL-i seadistamise abil. Veenduge, et teie domeeni DNS-i A-kirje osutaks teie serveri IP-aadressile.

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
      # Brauserile nähtav lähtekoht OAuthi tagasikutsete, töölaua linkide ja genereeritud avalike URL-ide jaoks.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Sisemine serveritevaheline URL ajastatud tööde ja iseendale tehtavate päringute jaoks.
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
`NEXT_PUBLIC_BASE_URL`-i OAuthi tagasikutsete ja genereeritud avalike linkide kanoonilise avaliku
lähtekohana; autenditud töölauakirjutused kasutavad sama lähtekoha päringuid koos seansiga seotud CSRF-i
kaitsega. Lubage `OMNIROUTE_TRUST_PROXY` ainult keerukamate juurutuste puhul, kus soovite teadlikult,
et OmniRoute tuletaks avaliku lähtekoha selgesõnalise konfiguratsiooni asemel usaldusväärsetest
edastuspäistest.

## Cloudflare Quick Tunnel

Dockeri juurutuste töölauatugi sisaldab ühe klõpsuga kasutatavat **Cloudflare Quick Tunnelit** asukohas `Töölaud → Lõpp-punktid`. Esmakordsel lubamisel laaditakse `cloudflared` alla ainult vajaduse korral, käivitatakse ajutine tunnel teie praeguse `/v1` lõpp-punktini ning genereeritud `https://*.trycloudflare.com/v1` URL kuvatakse otse teie tavapärase avaliku URL-i all.

Lõpp-punktide tunnelipaneele (Cloudflare, Tailscale, ngrok) saab asukohas `Seaded → Välimus` kuvada või peita, ilma et aktiivse tunneli olek muutuks.

### Märkused tunneli kohta

- Quick Tunneli URL-id on ajutised ja muutuvad pärast iga taaskäivitust.
- Quick Tunneleid ei taastata pärast OmniRoute'i või konteineri taaskäivitamist automaatselt. Vajaduse korral lubage need töölaualt uuesti.
- Hallatud installimine toetab praegu Linuxit, macOS-i ja Windowsit arhitektuuridel `x64` / `arm64`.
- Hallatud Quick Tunnelid kasutavad vaikimisi HTTP/2 transporti, et vältida piiratud konteinerikeskkondades mürarikkaid QUIC-i UDP-puhvri hoiatusi. Kui soovite kasutada teistsugust transporti, määrake `CLOUDFLARED_PROTOCOL=quic` või `auto`.
- Dockeri tõmmised sisaldavad süsteemi CA-juursertifikaate ja edastavad need hallatud `cloudflared`-ile, mis väldib TLS-i usaldustõrkeid, kui tunnel konteineris käivitub.
- Kui soovite, et OmniRoute kasutaks allalaadimise asemel olemasolevat binaarfaili, määrake `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Pildisildid

| Pilt                     | Silt     | Suurus | Kirjeldus                                                  |
| ------------------------ | -------- | ------ | ---------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Kõrgeim **avaldatud** stabiilne SemVer (mitte giti `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOpsi jaoks kinnitage seda tüüpi silt                    |

Mitme platvormi manifest: natiivne `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker valib sobiva arhitektuuri automaatselt; edastage `--platform linux/amd64`, kui peate ARM-hostides sundima AMD64 emulatsiooni.

### Väljalaskekanalid

OmniRoute avaldab stabiilsete väljalasete, aktiivse väljalaskeharu testimise ja arendusjärkude jaoks eraldi Dockeri kanalid.

| Kanal                           | Allikas                                | Muudetavus                  | Soovitatav kasutus                                                                                                                   |
| ------------------------------- | -------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Allkirjastatud/versioonitud väljalase  | Muutmatu                    | Tootmiskeskkonna juurutused, mis on kinnitatud täpsele väljalaskele                                                                  |
| `:latest` / `:latest-web`       | Kõrgeim **avaldatud** stabiilne SemVer | Muudetav stabiilne viit     | Järgib stabiilseid väljalaskeid **pärast** SemVeri avaldamistööd — **ei** jälgi haru `main` ega avaldamata `release/v*` sissekandeid |
| `:next` / `:next-web`           | Praegune vaikimisi `release/v*` haru   | Muudetav eelväljalaske viit | Paranduste testimine, mis on jõudnud aktiivsesse väljalaskeharusse, kuid pole veel stabiilses väljalaskes                            |
| `:main` / `:main-web`           | `main` haru                            | Muudetav arendusviit        | Ainult arendus- ja integratsioonitestimiseks                                                                                         |

#### Veebiseansi pakkujad: `-web` pildid

Igal ülaltoodud kanalil on ka `-web` silt (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), mis on loodud etapist `runner-web` — sama pilt koos Playwrighti ja Chromiumi brauseriga. Tavapilt tarnitakse **ilma** Chromiumita; `gemini-web`, `claude-web` ja `claude-turnstile` vajavad seda.

Tõrge tekib viivitusega, mitte käivitamisel: need pakkujad loetlevad oma mudelid ja kuvatakse juhtpaneelil ühendatuna ning alles esimene päring nurjub teatega

```
[500]: Välise mooduli playwright laadimine nurjus: Tõrge: Moodulit ei leitud
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Kui kasutate neid pakkujaid, tõmmake juba kasutatava kanali `-web` silt — midagi muud ei muutu. npm-i/CLI installi korral (ilma Dockeri pildita) on samaväärseks puuduvaks osaks brauseri binaarfail: käivitage hostis `npx playwright install chromium`.

#### Eelväljalaskekanali kasutamine

Kanal `next` luuakse uuesti iga tõuke korral praegusesse vaikimisi `release/v*` harusse ning avaldatakse nii AMD64 kui ka ARM64 jaoks. Vanemad hooldusharud ei saa seda üle kirjutada. Kanal pakub tõmmatavat pilti paranduste jaoks, mis on enne järgmise stabiilse sildi loomist aktiivsesse väljalaskeharusse mestitud.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose'i puhul alistage valitud profiili kasutatav pildisilt ning seejärel tõmmake pilt ja looge teenus uuesti:

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

`next` on ujuv eelväljalaskekanal. See võib aktiivsesse väljalaskeharusse tehtava mis tahes tõuke korral muutuda ja selle kasutamist **tootmiskeskkonnas ei toetata**. Konkreetse järgu hindamise ajaks kinnitage pildi räsi:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Enne testimist varundage OmniRoute'i andmeköide või haagitud andmekataloog. Tagasipööramiseks taastage varem kasutatud stabiilne versioon või räsi ja looge konteiner uuesti:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Väljalaskeharu järk ei saa kunagi silti `latest` muuta; stabiilset viita võib edendada ainult sobiv stabiilne semantiline versioon. `next` pildid säilitavad väljalaskepildi kontrollimise ja blokeeriva CRITICAL-turvanõrkuste kontrollpunkti.

**`latest` ei garanteeri giti ajakohasust.** Harusse `main` või aktiivsesse `release/v*` harusse mestitud parandused **ei** sisaldu sildis `:latest` enne, kui stabiilne SemVeri pilt on avaldatud ja avaldamistöö on edendanud silti `:latest` (sama räsi nagu sellel SemVeril). Kui `latest` näib tardununa, kuigi GitHub juba näitab parandust, tõmmake väljalaskeharu testimiseks `:next` või oodake SemVeri silti.

| Soovitud tulemus                                                                                            | Kasutage                            |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| GitOps/tootmiskeskkond, mis ei tohi triivida                                                                | Kinnitage `:X.Y.Z` (või pildi räsi) |
| Avaldatud stabiilsete väljalasete järgimine ja teenuse uuesti loomise aktsepteerimine iga väljalaske korral | `:latest`                           |
| Avaldamata `release/v*` sissekannete testimine                                                              | `:next` (mitte tootmiskeskkonnas)   |
| Haru `main` testimine                                                                                       | `:main` (mitte tootmiskeskkonnas)   |

## Käideldavus: vaikimisi SQLite toetab ainult üht replikat

Standardne Docker / Kubernetes OmniRoute on **üks Node'i protsess + üks SQLite'i kirjutaja**. Kõrge käideldavus **ei ole selle topoloogia puhul toetatud**.

| Piirang                                                                 | Tagajärg                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Üks kirjutaja                                                           | **Ärge** käitage mitut replikat sama SQLite'i faili vastu. See rikub andmebaasi.                                                                                                                                                                                                                                                                         |
| Uuesti loomine / taaskäivitamine / HEALTHCHECK-i põhjustatud lõpetamine | Töösolevad SSE-ühendused, töölauaseansid ja mälus hoitav olek katkevad **täielikult**. Kõigi ühendatud klientide ühendus katkeb. Uued päringud saavad lõpp-punktideta ajavahemiku jooksul pöördpuhverserverilt vastuse **`502 Bad Gateway: Unknown error`**, mitte OmniRoute'i JSON-i — kliendid ei suuda seda teenusepakkuja tõrkest eristada (#11015). |
| Sama sündmusetsükkel mis `/healthz`-il                                  | Hõivatud kataloogi- või tihendustsükkel võib kontrollpäringuid viivitada; lühike ajalõpp taaskäivitab seejärel **ainsa** replika.                                                                                                                                                                                                                        |

**Kontrollide maatriks** (vt ka [Kubernetese kontrollide soovitusi](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Kontroll              | Sihtmärk                                                        | Ärge kasutage                                                      |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| Elusolekukontroll     | TCP pordil `PORT` (vaikimisi `20128`) või leebe HTTP `/healthz` | `/api/monitoring/health`                                           |
| Valmiduskontroll      | HTTP `GET /healthz`                                             | Lühikesi ajalõppe, mis käsitlevad hõivatud sündmusetsüklit tõrkena |
| Põhjalik / inimestele | `/api/monitoring/health`                                        | Automaatse kubelet'i elusolekukontrollina                          |

**Uuendused:** arvestage, et kõik seansid katkevad. Võimaluse korral suunake kliendid enne mujale; vaikimisi SQLite'iga ei saa jooksvat uuendamist teha. Compose'i `restart: unless-stopped` koos Dockeri `HEALTHCHECK`-iga asendab samuti ainsa protsessi, kui konteiner muutub olekusse Unhealthy — mõju ulatus on sama.

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

`preStop`-i ooteaeg võimaldab kube'il Service'i lõpp-punktid enne SIGTERM-i eemaldada, et **uus** liiklus ei jõuaks enam lõpetatava protsessini. Töösolevat `/v1/responses` SSE-d lastakse mahukate vastuvõtulubade kaudu töötada kuni `SHUTDOWN_TIMEOUT_MS`-is määratud ajani (vaikimisi 30 s) (#11015). Uued päringud, mis siiski protsessini jõuavad, saavad vastuseks `503` + `Retry-After: 5`. Recreate'i põhjustatud lõpp-punktideta ajavahemik kuni asendus on Ready-olekus tähendab endiselt täielikku katkestust — see tuleneb SQLite'i topoloogiast, mitte kontrollide valest seadistusest.

Väline Postgres / mitme kirjutajaga HA **ei ole** dokumenteeritud standardlahendus. Kui vajate HA-d, kasutage üht replikat või topoloogiat, mida projekt on eraldi testinud ja dokumenteerinud. Postgres/MySQL-i arendus toimub teemas [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kuni see pole välja antud, on ainus toetatud viis **mahukate** `/v1/responses` päringute läbilaskevõime suurendamiseks N sõltumatut protsessi (järgmine jaotis), mitte `replicas > 1` ühel andmeköitel.

## Horisontaalne skaleerimine: N sõltumatut protsessi

Üks Node'i protsess on **üks V8 kuhi**. Kaks kattuvat ~3 MiB / ~750k-sõne pikkust kodeerimisagendi päringut `POST /v1/responses` (RTK + Caveman) katkestavad selle kuhja ~12 GiB juures (`FATAL ERROR: Reached heap limit`) ja võivad põhjustada 16 GiB cgroup'is OOM-i. Vaadake [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). See mõõtmistulemus on **mälueelarve** hoiatus, mitte toote jäik maksimum, mis lubaks ainult kaht samaaegset pikka `/v1/responses` päringut. Raskekaaluliste vestluste vastuvõttu piirab automaatselt tuletatud sisendi baitide eelarve (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), mille suurus põhineb samal V8/cgroup'i ülempiiril — selle suurendamine (või päringute arvul põhineva pärandpiirangu `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` määramine) juba sobivalt seadistatud protsessis põhjustab taas katkestuse. Väikesed vestlused, `/healthz`, `/v1/models` ja MCP **ei kuulu** selle piirangu alla.

### Üks protsess: rohkem kui kaks pikka `/v1/responses` päringut

**Töökorras** protsess (kuhi on alla `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` väärtuse, vaikimisi `0.75`) **võib** käitada rohkem kui kaht samaaegset pikka `POST /v1/responses` päringut, kui kogu protsessi töötlemisel olevate baitide eelarves (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) on veel ruumi. Päringukehad, mille maht on vähemalt `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (vaikimisi 256 KiB), kasutavad sama raskekaalulist luba nagu keeruka struktuuriga päringud ning sama [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` erandteed (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Kümnete samaaegsete pikkade SSE-klientide (operaatoritel on sageli vaja 40–50) toetamine on **mälueelarve** küsimus — määrake sobiv kuhja, põhi-/varuruumi pesade ja `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` suurus —, mitte toote jäik „max 2” piirang. Surve all olev kuhi tõrjub päringuid endiselt uuesti proovitava vastusega `503`, et #7849 ei korduks.

Kuhjade **mitmekordistamiseks** (sõltumatud V8 old-space'id) **praegu**:

| Tehke                                                                                                                                                                                                                 | Ärge tehke                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Käitage **N konteinerit/podi**, millest igaühel on **oma** `DATA_DIR` / andmeköide                                                                                                                                    | Seadke `replicas > 1` ühe SQLite'i faili jaoks                       |
| Määrake raskekaaluliste töötlemisel olevate päringute ja töökorras protsessi varuruumi suurus kuhja / töötlemisel olevate baitide eelarve põhjal; 1–2 on konservatiivne #7849 vaikeväärtus, mitte toote jäik maksimum | Andke ühele protsessile 8× rohkem RAM-i ja piiramatu arvupiirang     |
| Valikuline: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **jagatud kvoodiloendurite** jaoks                                                                                                                   | Ärge käsitlege Redist jagatud SQLite'ina — see ei ole seda           |
| Kopeerige teenusepakkuja saladused igasse eksemplari (või leppige eraldatud töölaudadega)                                                                                                                             | Ärge eeldage üht töölauda / üht kõnelogi kõigi eksemplaride jaoks    |
| Kasutage ees mis tahes koormusjaoturit; API-võtme või seansi põhine püsiseanss on piisav                                                                                                                              | Ärge nõudke teenusepakkuja-spetsiifilist suurust arvestavat vahevara |

Riistvara: ühe eksemplari samaaegsete pikkade `/v1/responses` päringute arv on **mälueelarve** küsimus (kuhi + töötlemisel olevate baitide eelarve / #10110). `N` sõltumatut `DATA_DIR`-i mitmekordistavad endiselt kuhjade arvu: hosti RAM peab mahutama `N × cgroup`, mitte „üks 16 GiB pod väärtusega N=8”. Ärge kunagi kasutage `replicas > 1` ühe SQLite'i faili puhul.

Compose'i näidis (kaks kuhja, kaks andmeköidet — mitte `deploy.replicas: 2`):

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

Protsessisisene tihedus (tihendamine väljaspool HTTP-isolaati) on [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Üks loogiline klaster jagatud püsioleku peal on [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Olulised märkused

- **SQLite'i WAL-režiim:** Käsul `docker stop` tuleks lasta lõpuni töötada, et OmniRoute saaks viimased muudatused tagasi faili `storage.sqlite` kontrollpunktina salvestada. Kaasasolevates Compose'i failides on peatamise ajapikenduseks juba määratud 40 s. Kui käitate tõmmist otse, säilitage `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Määrake väärtuseks `true`, kui rutiinseid ja kirjutamiseelseid varukoopiaid hallatakse väliselt. Olemasoleva andmebaasi migratsioonid nõuavad endiselt eraldi püsivat turvatõmmist ja massmigratsiooni kaitsemehhanismi.
- **Andmete säilitamine:** Andmebaasi, võtmete ja konfiguratsioonide säilitamiseks konteineri taaskäivitamisel haakige alati köide asukohta `/app/data`.
- **Pordi konfiguratsioon:** Vaikimisi kasutatava pordi `20128` muutmiseks alistage keskkonnamuutuja `PORT`.

## Vaata ka

- [VM-i juurutamise juhend](../ops/VM_DEPLOYMENT_GUIDE.md) — VM-i, nginxi ja Cloudflare'i seadistamine
- [Fly.io juurutamise juhend](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Juurutamine platvormile Fly.io
- [Keskkonna konfiguratsioon](../reference/ENVIRONMENT.md) — Täielik `.env`-faili viide
