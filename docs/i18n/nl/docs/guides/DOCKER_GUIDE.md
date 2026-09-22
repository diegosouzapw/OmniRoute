# 🐳 Docker Guide — OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Volledige referentie voor Docker-implementatie. Zie voor een snelle start de [Docker-sectie van de README](../README.md#-docker).

## Inhoudsopgave

- [Snel uitvoeren](#quick-run)
- [Met omgevingsbestand](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Beschikbare profielen](#available-profiles)
- [CLI-hulpprogramma's op de host configureren wanneer OmniRoute in Docker draait](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose voor productie](#production-compose)
- [Dockerfile-fasen](#dockerfile-stages)
- [Kritieke omgevingsvariabelen](#critical-environment-variables)
- [Docker Compose met Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Snelle Cloudflare-tunnel](#cloudflare-quick-tunnel)
- [Image-tags](#image-tags)
- [Beschikbaarheid: standaard-SQLite ondersteunt één replica](#availability-default-sqlite-is-single-replica)
- [Belangrijke opmerkingen](#important-notes)

---

## Snel starten

> **Zelf hosten met één opdracht?** Raadpleeg de
> [handleiding voor zelf hosten](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (gepubliceerde image +
> Redis, alleen loopback, geen profielkeuze). Snel starten hieronder is het
> pad met één container voor gebruikers die Redis al elders uitvoeren.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Met omgevingsbestand

```bash
# Kopieer en bewerk eerst .env
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
# Basisprofiel (geen CLI-hulpprogramma's)
docker compose --profile base up -d

# CLI-profiel (Claude Code, Codex en OpenClaw ingebouwd)
docker compose --profile cli up -d

# Hostprofiel (primair voor Linux; koppelt CLI-binaire bestanden van de host alleen-lezen)
docker compose --profile host up -d

# Combineer CLI met de CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Beschikbare profielen

OmniRoute wordt geleverd met vier Compose-profielen. Kies het profiel dat bij uw omgeving past.

| Profiel            | Service          | Wanneer te gebruiken                                                                                                                                 | Opdracht                                     |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standaard) | `omniroute-base` | Headless server/minimale runtime, zonder meegeleverde provider-CLI's                                                                                 | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | Agentische workflows die `omniroute providers/setup/doctor` en meegeleverde CLI's (Codex, Claude Code, Droid, OpenClaw) aanroepen                    | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | Linux-hosts die `network_mode`-achtige toegang tot host-CLI's willen door `~/.local/bin`, `~/.codex`, `~/.claude` enzovoort alleen-lezen te koppelen | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | Voer de [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-sidecar uit op poort `8317` voor upstream CLI-proxying                           | `docker compose --profile cliproxyapi up -d` |

> Meerdere profielen kunnen worden gecombineerd: `docker compose --profile cli --profile cliproxyapi up -d`.

## Host-CLI-tools configureren wanneer OmniRoute in Docker draait

`omniroute setup-codex`, `setup-claude`, `config set <tool>` en de knop
**Configuratie opslaan** van het dashboard schrijven allemaal bestanden zoals `~/.codex/*.config.toml`. Die paden
hebben alleen betekenis op de machine waarop de CLI daadwerkelijk draait. Voer je ze in
de container uit, dan wordt er geschreven naar de eigen thuismap van de container (`/home/node` —
de image draait met `USER node`), waar geen enkele host-CLI ze ooit zal lezen en waar ze
worden verwijderd zodra de container opnieuw wordt aangemaakt.

OmniRoute detecteert dit en weigert te schrijven, waarbij instructies worden gegeven in plaats van
een succesmelding waar je niets aan hebt: de CLI sluit af met `2` en de API antwoordt met `422`
en `containerEphemeralTarget: true`.

### Aanbevolen: voer de CLI uit op de host en OmniRoute in Docker

De container verzorgt de API; de CLI configureert je host-tools.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # laat de CLI naar de container verwijzen
omniroute setup-codex                      # schrijft naar de echte ~/.codex op je host
```

Dit is de juiste keuze wanneer Codex, Claude Code, Cursor of vergelijkbare tools op je
laptop draaien — wat de gebruikelijke configuratie is.

### Alternatief: koppel de host-configuratiemappen via bind mounts (`host`-profiel)

Als je wilt dat de container zelf naar je hostconfiguratie schrijft, mount je de
mappen en laat je `CLI_CONFIG_HOME` naar de root van de mount verwijzen. Het `host`-profiel
doet dit al:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Een bind mount maakt het pad betrouwbaar: OmniRoute leest
`/proc/self/mountinfo` en staat schrijfbewerkingen toe naar gemounte paden (en naar mappen
waarvan de submappen mounts zijn, wat precies overeenkomt met de bovenstaande structuur van `/host-home`), terwijl
schrijfbewerkingen naar niet-gemounte paden nog steeds worden geweigerd.

### Uitweg: configureer de eigen CLI's van de container (spaarzaam gebruiken)

Wanneer de CLI's daadwerkelijk in de container staan (het `cli`-profiel), is de schrijfbewerking
bedoeld. Geef `--allow-container-write` door aan een `setup-*`-opdracht of stel
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` in voor de server. De schrijfbewerking wordt uitgevoerd
met een waarschuwing dat deze niet behouden blijft nadat de container is verwijderd.

> **Beveiligingswaarschuwing — `cli`-profiel + `docker.sock`-mount.**
> Het `cli`-profiel koppelt `/var/run/docker.sock` als bind mount, zodat de automatische updater
> in de container de stack opnieuw kan aanmaken via de hostdaemon
> (`src/lib/system/autoUpdate.ts` controleert op die socket en slaat het
> Docker-pad over wanneer deze ontbreekt). Die socket vormt **een vertrouwensgrens met roottoegang
> tot de host**: alles wat de socket kan bereiken, bestuurt de Docker-daemon van de host als
> root — en kan elke container op de host aanmaken, inspecteren, stoppen en verwijderen.
> Gevolgen:
>
> 1. **Stel de poort van het `cli`-profiel nooit beschikbaar aan het netwerk.** Publiceer
>    deze op `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — een via het LAN bereikbaar `cli`-profiel verandert elke RCE op dashboardniveau in
>    een volledige compromittering van de host.
> 2. **Koppel geen extra hostmappen aan het `cli`-profiel.**
>    De Docker-socket in combinatie met elke aanvullende mount geeft de container volledige
>    lees- en schrijftoegang tot je bestandssysteem en hostconfiguratie. Als een tool
>    toegang tot een project nodig heeft, voer je deze lokaal uit met de CLI-binary — mount het project niet
>    in de `cli`-container.
>
> Als je geen automatische updates in de container nodig hebt, schakel je het `cli`-profiel niet in
> (`COMPOSE_PROFILES=core,redis` of korter). De andere profielen mounten
> de Docker-socket niet.
>
> Zie `docs/security/MITM-TPROXY-DECRYPT.md` (git; niet gecompileerd naar `/docs`) voor het bijbehorende dreigingsmodel
> rond MITM en `docs/security/SUPPLY_CHAIN.md` voor de herkomstketen van de
> `codex`/`claude-code`/`droid`/`openclaw`-binaries.

## Redis-sidecar

OmniRoute gebruikt Redis als basis voor de gedistribueerde snelheidsbegrenzer en gedeelde cache. De `redis`-service is **altijd gedefinieerd** in `docker-compose.yml` (deze heeft geen profielbeperking) en wordt samen met elk ander profiel gestart.

| Detail                   | Waarde                                      |
| ------------------------ | ------------------------------------------- |
| Image                    | `redis:7-alpine`                            |
| Containernaam            | `omniroute-redis`                           |
| Interne poort            | `6379`                                      |
| Hostpoort (aanpasbaar)   | `REDIS_PORT` (standaard `6379`)             |
| Hostbinding (aanpasbaar) | `REDIS_BIND_HOST` (standaard `127.0.0.1`)   |
| Volume                   | `omniroute-redis-data` → `/data`            |
| Statuscontrole           | `redis-cli ping` (interval van 10 seconden) |

Gerelateerde omgevingsvariabelen:

- `REDIS_URL` — verbindingsreeks die in de app wordt geïnjecteerd (standaard `redis://redis:6379`).
- `REDIS_PORT` — hostpoorttoewijzing voor de Redis-container.
- `REDIS_BIND_HOST` — hostinterface waarop de poort wordt gepubliceerd. Standaard `127.0.0.1`.

> **Waarom standaard de loopbackinterface wordt gebruikt:** de sidecar draait zonder `requirepass` en de
> appcontainers bereiken deze via het Compose-netwerk (`redis:6379`) — de gepubliceerde poort is
> alleen bedoeld voor hulpprogramma's op de host (`redis-cli`, een lokale `npm run dev`). Publiceren op
> `0.0.0.0` zou een Redis-instantie zonder authenticatie blootstellen aan elke host in uw LAN. Als u
> `REDIS_BIND_HOST=0.0.0.0` instelt, voeg dan ook `--requirepass` toe aan de `command:` van de service.

**Redis uitschakelen** wordt niet aanbevolen (de snelheidsbegrenzer valt dan terug op een minder robuuste in-memoryimplementatie). Als het toch noodzakelijk is, verwijdert u het `redis:`-serviceblok uit `docker-compose.yml` of zet u het in commentaar, of schaalt u het terug naar nul:

```bash
docker compose up -d --scale redis=0
```

## Compose voor productie

Gebruik `docker-compose.prod.yml` voor een geïsoleerde productiesnapshot die naast de ontwikkelomgeving draait.

| Detail                   | Waarde                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| Bestand                  | `docker-compose.prod.yml`                                                                   |
| Standaard dashboardpoort | `PROD_DASHBOARD_PORT=20130` (toegewezen aan interne `${DASHBOARD_PORT:-20128}`)             |
| Standaard API-poort      | `PROD_API_PORT=20131`                                                                       |
| Image                    | `omniroute:prod` (gebouwd vanuit het `runner-cli`-doel)                                     |
| Redis-container          | `omniroute-redis-prod` (`redis:8.6.2`, afzonderlijk `redis-prod-data`-volume)               |
| Gegevensvolume           | `omniroute-prod-data` (benoemd, blijft behouden tussen nieuwe builds)                       |
| Statuscontroles          | `node healthcheck.mjs` + `redis-cli ping`, waarbij `depends_on` afhangt van de Redis-status |

Gebruik:

```bash
# Bouw en start de productie-stack
docker compose -f docker-compose.prod.yml up -d --build

# Stream de logs
docker compose -f docker-compose.prod.yml logs -f

# Stop de stack en verwijder deze (behoud volumes)
docker compose -f docker-compose.prod.yml down
```

De productie-stack draait parallel aan de ontwikkel-Compose-configuratie (met verschillende containernamen, poorten en volumes), zodat u lokaal kunt blijven doorontwikkelen terwijl de productieomgeving actief blijft.

## Dockerfile-fasen

De repository bevat een Dockerfile met meerdere fasen (`Dockerfile`). Er zijn drie fasen beschikbaar; kies de juiste `target` voor je gebruiksscenario.

| Fase          | Basisimage            | Doel                                                                                                                                                                  |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installeert afhankelijkheden (`npm ci --legacy-peer-deps`) en voert `npm run build` uit (standaard met Turbopack — zie Buildresources hieronder)                      |
| `runner-base` | `node:26-trixie-slim` | Productieruntime met de zelfstandige uitvoer van Next.js. **Bevat geen CLI's van providers.**                                                                         |
| `runner-cli`  | `runner-base`         | Voegt `git`, `docker.io`, `docker-compose` en globale CLI's toe: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Kies dit voor agentworkflows.** |

Bouw handmatig een specifieke target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Buildresources

Drie buildargs bepalen hoeveel resources de `builder`-fase verbruikt. Ze gelden alleen tijdens het bouwen —
`OMNIROUTE_MEMORY_MB` (hieronder) is een afzonderlijke runtime-instelling.

| Buildarg                    | Standaard | Effect                                                                                              |
| --------------------------- | --------- | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`       | Met `0` wordt in plaats daarvan met webpack gebouwd. Lager piekgeheugen, langzamer.                 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | Limiet voor de V8-heap (`--max-old-space-size`) voor het gestarte `next build`.                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Levert `CIRCLE_NODE_TOTAL`; Next leidt `workers = N - 1` af voor het verzamelen van paginagegevens. |

`OMNIROUTE_BUILD_WORKERS` is de waarde die je moet verhogen op een krachtige builder en die je
moet verdenken wanneer een beperkte build **na** `✓ Compiled successfully` vastloopt. Elke
worker voor paginagegevens is een afzonderlijk proces, net als het bovenliggende `next build`
zelf; bij een live reproductie op een VPS (issue #7518) werd voor elk proces een piek-RSS van
~4,5 GB gemeten, onafhankelijk van de heapvlag `NODE_OPTIONS` (Turbopack compileert in
native/Rust-geheugen buiten de V8-heap). De standaardwaarde `2` (→ 1 worker, in totaal 2
processen) is afgestemd op de door GitHub gehoste runners met 16 GB / 4 vCPU's die de
publicatiepipeline gebruikt. Bij `8` (→ 7 workers) raakte die runner door zijn geheugen heen en
mislukte de stap in buildkit met `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) paste nog steeds niet nadat de RSS per proces rechtstreeks was gemeten
in plaats van afgeleid. `tests/unit/docker-build-memory-budget.test.ts`
voert de berekening uit op basis van de gemeten waarde en mislukt als een van beide instellingen
de capaciteit van de runner overschrijdt.

Turbopack compileert in native Rust-geheugen dat **buiten** de V8-heap valt, waardoor
`OMNIROUTE_BUILD_MEMORY_MB` dit niet begrenst. Op een host met een geheugenlimiet wordt de
build vervolgens zonder enige foutmelding door de OOM-killer met SIGKILL beëindigd — de build
stopt simpelweg halverwege `Creating an optimized production build`, wat meer op vastlopen lijkt
dan op een geheugentekort. Schakel van bundler als de buildhost beperkte resources heeft:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` is ingeschakeld, waardoor `next build` een bovenliggend proces **en** een
workerproces uitvoert en elk proces `OMNIROUTE_BUILD_MEMORY_MB` afzonderlijk respecteert. Stel
de limiet van de container in op meer dan ongeveer tweemaal die waarde, niet eenmaal.

Gemeten voor deze tree (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Containerlimiet | Resultaat                                |
| --------- | --------------- | ---------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | bij beide beëindigd door OOM, geruisloos |
| webpack   | 8 GiB           | buildworker beëindigd met SIGKILL        |
| webpack   | 12 GiB          | geslaagd, met een piek van 11,1 GiB      |

### Runtime-standaardwaarden

Door `runner-base` geëxporteerde standaardwaarden: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Geheugengedrag in Docker:

- De image stelt `OMNIROUTE_MEMORY_MB=1024` in en leidt daaruit `NODE_OPTIONS=--max-old-space-size=1024` af.
- Het daadwerkelijke serverproces wordt gestart door de zelfstandige launcher, die `OMNIROUTE_MEMORY_MB` leest en `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` toevoegt.
- Node gebruikt de laatste herhaalde waarde van `--max-old-space-size`, waardoor het instellen van `OMNIROUTE_MEMORY_MB` de effectieve Docker-heaplimiet bepaalt.
- Omdat de image deze waarde altijd instelt, wordt de eigen op RAM afgestemde fallback van de launcher onder Docker nooit toegepast. Verhoog de waarde expliciet voor de workload (zie onderstaande tabel). `2048` is nog steeds te klein voor `/v1/responses` van programmeeragents.

### Runtime-RAM voor programmeeragents

De Docker-standaardwaarde van 1 GiB is een ondergrens voor een dashboard of lichte chat, geen productiecapaciteit. Lange bodies van `POST /v1/responses` (honderden berichten, tientallen tools) houden tijdens compressie meerdere grafen in het geheugen vast. Twee overlappende requests van ~3 MiB / ~750k tokens hebben V8 afgebroken bij een old-space van **12 GiB** (`FATAL ERROR: Reached heap limit`) en veroorzaakten ook een cgroup-OOM bij 16 GiB. Zie [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Stel **cgroup `--memory` hoger in dan de heap** — native buffers, SQLite en tussenresultaten van compressie bevinden zich buiten V8.

| Werkbelasting                              | `OMNIROUTE_MEMORY_MB`   | Container / cgroup      | Opmerkingen                                                                                         |
| ------------------------------------------ | ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| Dashboard, één lichte chat                 | `1024` (standaardimage) | ≥2 GiB                  |                                                                                                     |
| Eén codeeragent (Claude/Codex/Grok)        | `8192`                  | ≥10 GiB                 | Typische `/v1/responses` met één sessie                                                             |
| Twee gelijktijdige lange `/v1/responses`   | `10240`–`12288`         | ≥12–16 GiB              | Gemeten V8-afbreking bij een heap van ~12 GiB                                                       |
| Drie of meer gelijktijdige lange contexten | niet in één proces      | serialiseren / meer RAM | Standaard is er 1 zware aanvraag actief; verhogen zonder extra RAM veroorzaakt opnieuw de afbreking |

`omniroute serve` op bare metal kalibreert ~35% van het RAM (begrensd op `[512, 4096]`) wanneer `OMNIROUTE_MEMORY_MB` **niet is ingesteld**. Docker stelt altijd `1024` in, waardoor deze kalibratie nooit wordt uitgevoerd in de officiële image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritieke omgevingsvariabelen

Naast de standaardwaarden die in [ENVIRONMENT.md](../reference/ENVIRONMENT.md) zijn gedocumenteerd, zijn de volgende variabelen het belangrijkst bij uitvoering onder Docker:

| Variabele                     | Doel                                                                                                                                                                                                                                                                             | Standaardwaarde                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Gedeeld geheim voor de WebSocket-bridge. **Vereist in productie** — stel dit in op een sterke willekeurige tekenreeks.                                                                                                                                                           | niet ingesteld (moet worden opgegeven) |
| `REDIS_URL`                   | Verbindingsreeks voor de backend van de rate limiter/cache                                                                                                                                                                                                                       | `redis://redis:6379`                   |
| `REDIS_PORT`                  | Hostpoort voor de meegeleverde Redis-container                                                                                                                                                                                                                                   | `6379`                                 |
| `REDIS_BIND_HOST`             | Hostinterface waarop de meegeleverde Redis-poort wordt gepubliceerd (loopback tenzij u AUTH toevoegt)                                                                                                                                                                            | `127.0.0.1`                            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hostpad dat in het `cli`-profiel op `/workspace/omniroute` wordt gekoppeld voor workflows voor zelfupdates                                                                                                                                                                       | `.` (huidige map)                      |
| `OMNIROUTE_MEMORY_MB`         | Maximale Node-heapgrootte tijdens runtime voor de zelfstandige Docker-server; overschrijft de bovenstaande standaardwaarde van de image. Programmeeragents: `8192`+ (zie [runtime-RAM](#runtime-ram-for-coding-agents)).                                                         | `1024`                                 |
| `DASHBOARD_PORT` / `API_PORT` | Overschrijft de vrijgegeven poorten voor het dashboard (20128) en de API (20129)                                                                                                                                                                                                 | `20128` / `20129`                      |
| `APP_BIND_HOST`               | Hostinterface waarop docker-compose de dashboard-/API-/live-WS-poorten publiceert. Met `REQUIRE_API_KEY=false` (de standaardwaarde) stelt `0.0.0.0` de anonieme `/v1`-proxy beschikbaar aan het LAN — verruim dit alleen met `REQUIRE_API_KEY=true` of een reverse proxy ervoor. | `127.0.0.1`                            |
| `CLIPROXY_BIND_HOST`          | Hostinterface waarop docker-compose de `cliproxyapi`-sidecar publiceert — het datavolume ervan bevat providerreferenties.                                                                                                                                                        | `127.0.0.1`                            |
| `OMNIROUTE_PLUGINS_DIR`       | Map die door de runtime-plug-inscanner wordt gelezen en waarin deze installeert. Stel deze in wanneer plug-ins via bind mounts worden gekoppeld: de standaardwaarde volgt `HOME`, die een image niet noodzakelijk exporteert.                                                    | `~/.omniroute/plugins`                 |
| `OMNIROUTE_BASE_PATH`         | URL-subpad wanneer de app achter een reverse proxy wordt gepubliceerd (bijv. `/omniroute`)                                                                                                                                                                                       | _(leeg = root)_                        |
| `NEXT_PUBLIC_BASE_URL`        | Openbare browser-origin inclusief het subpad (bijv. `https://host/omniroute`)                                                                                                                                                                                                    | niet ingesteld                         |
| `PROD_DASHBOARD_PORT`         | Hostpoort voor het dashboard voor `docker-compose.prod.yml`                                                                                                                                                                                                                      | `20130`                                |
| `CLIPROXYAPI_PORT`            | Hostpoort voor de `cliproxyapi`-sidecar                                                                                                                                                                                                                                          | `8317`                                 |

## Reverse proxy op een subpad (Traefik / nginx)

De `basePath` van Next.js wordt in de zelfstandige bundel gecompileerd. OmniRoute legt de ingebakken
waarde vast in een markerbestand in de hoofdmap van de app (geschreven tijdens `npm run build`; gelezen door
`scripts/docker/ensure-docker-base-path.mjs`) en vergelijkt deze met
`OMNIROUTE_BASE_PATH` wanneer de container wordt gestart. Wanneer deze waarden verschillen en de image voor
de domeinroot is gebouwd, herschrijft het entrypoint de zelfstandige manifesten, de
ingesloten `basePath`-/`assetPrefix`-literalen (Next 16 genereert SSR-asset-URL's uitsluitend op basis van
`assetPrefix` — de patcher neemt het subpad hierin over), de ingebakken
`/_next/static`-asset-URL's (client-reference-manifesten, media-imports, vooraf gerenderde
foutpagina's) en de `process.env`-shim van de client voordat `node dev/run-standalone.mjs`
wordt uitgevoerd.

### Bouwen met Compose (aanbevolen)

Stel beide variabelen in `.env` in en bouw vervolgens opnieuw, zodat de image en runtime overeenkomen:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` geeft `OMNIROUTE_BASE_PATH` door als een Docker-buildargument en als een
runtime-omgevingsvariabele.

### Vooraf gebouwde root-image + runtime-subpad

Gepubliceerde `diegosouzapw/omniroute:*`-images zijn gebouwd voor de domeinroot. U kunt
`OMNIROUTE_BASE_PATH` desondanks tijdens runtime instellen; de container patcht de bundel eenmaal bij het opstarten.
Combineer dit met de overeenkomende openbare origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configureer de reverse proxy om het **volledige** externe pad door te sturen (verwijder het
voorvoegsel niet). Traefik moet `PathPrefix(`/omniroute`)` naar de container routeren zonder
`StripPrefix`, zodat Next.js `/omniroute/...` ontvangt en assets vanuit
`/omniroute/_next/...` aanbiedt.

De Docker-healthcheck controleert het lichtgewicht lifecycle-eindpunt `/healthz`, voorafgegaan
door het actieve `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` blijft beschikbaar voor
diagnostiek door mensen en dashboards; stel `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` in
om de HEALTHCHECK van de container er opnieuw naar te laten verwijzen (bijvoorbeeld
voor uitgebreide statuscontrole).
Dat pad is een **uitgebreide** controle (database + monitoringsoverzicht) — geschikt voor de
weinig frequente `HEALTHCHECK` van Docker als u deze optie opnieuw inschakelt, maar **niet** voor intervallen van
Kubernetes-`livenessProbe`.

Voor orchestrators (Kubernetes, Nomad enzovoort):

| Probe                 | Bij voorkeur                                                           | Vermijd                                                       |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| Liveness              | HTTP `GET /livez`, of TCP op de hoofdpoort (`PORT`, standaard `20128`) | `/api/monitoring/health` als liveness-controle                |
| Readiness             | HTTP `GET /healthz`                                                    | Korte time-outs die een drukke event-loop als dood beschouwen |
| Uitgebreid / blackbox | `/api/monitoring/health`                                               | —                                                             |

`/healthz` rapporteert de proceslevenscyclus (`ok` / `starting` / `stopping`). `/livez` geeft
alleen aan of het proces actief is (200 wanneer de handler kan worden uitgevoerd; het wacht niet op
readiness). Beide worden nog steeds uitgevoerd op dezelfde Node-event-loop als de verwerking van aanvragen, waardoor
CPU-intensief catalogus- of compressiewerk ze kan vertragen — druk ≠ dood. Geef de voorkeur aan TCP-
liveness als HTTP-probes een time-out krijgen. Volledige richtlijnen voor probes:
[Monitoringhandleiding — aanbevelingen voor Kubernetes-probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose met Caddy (automatische HTTPS/TLS)

OmniRoute kan veilig toegankelijk worden gemaakt met de automatische SSL-configuratie van Caddy. Zorg ervoor dat het DNS A-record van je domein naar het IP-adres van je server verwijst.

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
      # Oorsprong voor de browser voor OAuth-callbacks, dashboardlinks en gegenereerde openbare URL's.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interne server-naar-server-URL voor geplande taken / interne fetches.
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

Caddy stelt de standaard forwarding-headers in voor de upstream-container. OmniRoute gebruikt
`NEXT_PUBLIC_BASE_URL` als de canonieke openbare oorsprong voor OAuth-callbacks en gegenereerde openbare
links; geauthenticeerde schrijfbewerkingen vanuit het dashboard gebruiken same-origin-verzoeken plus sessiegebonden CSRF-
beveiliging. Schakel `OMNIROUTE_TRUST_PROXY` alleen in voor geavanceerde implementaties waarbij je bewust
wilt dat OmniRoute de openbare oorsprong afleidt uit vertrouwde doorgestuurde headers in plaats van uit expliciete
configuratie.

## Cloudflare Quick Tunnel

Dashboardondersteuning voor Docker-implementaties omvat een **Cloudflare Quick Tunnel** die je met één klik kunt activeren via `Dashboard → Endpoints`. Bij de eerste activering wordt `cloudflared` alleen gedownload wanneer dat nodig is, wordt een tijdelijke tunnel naar je huidige `/v1`-endpoint gestart en wordt de gegenereerde `https://*.trycloudflare.com/v1`-URL direct onder je normale openbare URL weergegeven.

Tunnelpanelen voor endpoints (Cloudflare, Tailscale, ngrok) kunnen via `Settings → Appearance` worden weergegeven of verborgen zonder de status van actieve tunnels te wijzigen.

### Opmerkingen over tunnels

- Quick Tunnel-URL's zijn tijdelijk en veranderen na elke herstart.
- Quick Tunnels worden niet automatisch hersteld nadat OmniRoute of de container opnieuw is gestart. Activeer ze indien nodig opnieuw vanuit het dashboard.
- Beheerde installatie ondersteunt momenteel Linux, macOS en Windows op `x64` / `arm64`.
- Beheerde Quick Tunnels gebruiken standaard HTTP/2-transport om storende QUIC-waarschuwingen over UDP-buffers in beperkte containeromgevingen te voorkomen. Stel `CLOUDFLARED_PROTOCOL=quic` of `auto` in als je een ander transport wilt gebruiken.
- Docker-images bevatten systeem-CA-rootcertificaten en geven deze door aan het beheerde `cloudflared`, waardoor TLS-vertrouwensfouten worden voorkomen wanneer de tunnel in de container wordt opgestart.
- Stel `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` in als je wilt dat OmniRoute een bestaand binair bestand gebruikt in plaats van er een te downloaden.

## Imagetags

| Image                    | Tag      | Grootte | Beschrijving                                                |
| ------------------------ | -------- | ------- | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Hoogste **gepubliceerde** stabiele SemVer (niet git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Zet dit type tag vast voor GitOps                           |

Multiplatformmanifest: native `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selecteert automatisch de overeenkomende architectuur; geef `--platform linux/amd64` door als je AMD64-emulatie op ARM-hosts wilt afdwingen.

### Releasekanalen

OmniRoute publiceert afzonderlijke Docker-kanalen voor stabiele releases, tests van de actieve releasebranch en ontwikkelbuilds.

| Kanaal                          | Bron                                      | Wijzigbaarheid                  | Aanbevolen gebruik                                                                                                                          |
| ------------------------------- | ----------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Ondertekende/geversioneerde release       | Onveranderlijk                  | Productie-implementaties die een exacte release vastzetten                                                                                  |
| `:latest` / `:latest-web`       | Hoogste **gepubliceerde** stabiele SemVer | Wijzigbare stabiele verwijzing  | Volgt stabiele releases **nadat** een SemVer-publicatietaak is uitgevoerd — volgt **niet** `main` of niet-uitgebrachte `release/v*`-commits |
| `:next` / `:next-web`           | Huidige standaardbranch `release/v*`      | Wijzigbare prereleaseverwijzing | Testen van correcties die in de actieve releasebranch zijn opgenomen, maar nog niet in een stabiele release zitten                          |
| `:main` / `:main-web`           | Branch `main`                             | Wijzigbare ontwikkelverwijzing  | Alleen voor ontwikkel- en integratietests                                                                                                   |

#### Het prereleasekanaal gebruiken

Het kanaal `next` wordt bij elke push naar de huidige standaardbranch `release/v*` opnieuw gebouwd en wordt voor zowel AMD64 als ARM64 gepubliceerd. Oudere onderhoudsbranches kunnen dit kanaal niet overschrijven. Het kanaal biedt een downloadbare image voor correcties die vóór het maken van de volgende stabiele tag in de actieve releasebranch zijn samengevoegd.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Overschrijf voor Docker Compose de imagetag die door het geselecteerde profiel wordt gebruikt en haal vervolgens de image op en maak de service opnieuw aan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Veiligheid en terugdraaien

`next` is een dynamisch prereleasekanaal. Het kan bij elke push naar de actieve releasebranch veranderen en wordt **niet ondersteund voor productiegebruik**. Zet de image-digest vast terwijl je een specifieke build evalueert:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Maak vóór het testen een back-up van het OmniRoute-datavolume of de als bind mount gekoppelde gegevensmap. Herstel voor een rollback de eerder gebruikte stabiele versie of digest en maak de container opnieuw aan:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Een build van een releasebranch kan `latest` nooit verplaatsen; alleen een geschikte stabiele semantische versie mag de stabiele verwijzing bijwerken. De `next`-images behouden de inspectie van de release-image en de blokkerende controle op CRITICAL-kwetsbaarheden.

**`latest` is geen garantie dat de versie actueel is ten opzichte van git.** Samengevoegde fixes op `main` of op de actieve `release/v*`-branch zijn **niet** opgenomen in `:latest` totdat een stabiele SemVer-image is gepubliceerd en de publicatietaak `:latest` bijwerkt (dezelfde digest als die SemVer). Als `latest` onveranderd lijkt terwijl GitHub de fix al toont, haal dan `:next` op om de releasebranch te testen of wacht op de SemVer-tag.

| Wat u wilt                                                                            | Gebruik                                   |
| ------------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps/productie die niet mag afwijken                                                | Zet vast op `:X.Y.Z` (of de image-digest) |
| Gepubliceerde stabiele versies volgen en bij elke release opnieuw aanmaken accepteren | `:latest`                                 |
| Niet-uitgebrachte commits van `release/v*` testen                                     | `:next` (niet voor productie)             |
| `main` testen                                                                         | `:main` (niet voor productie)             |

## Beschikbaarheid: standaard is SQLite beperkt tot één replica

Een standaard Docker-/Kubernetes-installatie van OmniRoute bestaat uit **één Node-proces + één SQLite-writer**. Hoge beschikbaarheid wordt in deze topologie **niet ondersteund**.

| Beperking                                                    | Gevolg                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eén writer                                                   | Voer **niet** meerdere replica's uit tegen hetzelfde SQLite-bestand. Hierdoor raakt de database beschadigd.                                                                                                                                                                                                                                                                  |
| Opnieuw aanmaken / herstarten / beëindiging door HEALTHCHECK | **Volledige uitval** van actieve SSE-verbindingen, dashboardsessies en status in het geheugen. De verbinding van elke verbonden client wordt verbroken. Nieuwe aanvragen tijdens de periode zonder endpoint krijgen van de reverse proxy **`502 Bad Gateway: Unknown error`**, geen OmniRoute-JSON — clients kunnen dit niet onderscheiden van een providerstoring (#11015). |
| Dezelfde eventloop als `/healthz`                            | Een drukke catalogus- of compressiecyclus kan probes vertragen; bij een korte timeout wordt vervolgens de **enige** replica opnieuw gestart.                                                                                                                                                                                                                                 |

**Probematrix** (zie ook [aanbevelingen voor Kubernetes-probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe              | Doel                                                                  | Niet gebruiken                                                |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| Liveness           | TCP op `PORT` (standaard `20128`), of zachte HTTP-probe op `/healthz` | `/api/monitoring/health`                                      |
| Readiness          | HTTP `GET /healthz`                                                   | Korte timeouts die een drukke eventloop als defect beschouwen |
| Diepgaand / mensen | `/api/monitoring/health`                                              | Geautomatiseerde kubelet-liveness                             |

**Upgrades:** houd er rekening mee dat elke sessie wordt verbroken. Laat clients indien mogelijk gecontroleerd afsluiten; met standaard-SQLite is geen rolling update mogelijk. Compose `restart: unless-stopped` in combinatie met Docker `HEALTHCHECK` vervangt ook het enige proces wanneer de container Unhealthy is — met dezelfde impact.

Kubernetes-fragment voor **één replica** (Recreate is vereist; verhoog `replicas` niet wanneer één SQLite-bestand wordt gebruikt):

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

De wachttijd van `preStop` geeft kube de tijd om Service-endpoints te verwijderen vóór SIGTERM, zodat **nieuw** verkeer niet meer bij het afsluitende proces terechtkomt. Actieve `/v1/responses`-SSE-verbindingen krijgen maximaal `SHUTDOWN_TIMEOUT_MS` (standaard 30 s) de tijd om af te handelen via zwaarwegende admission leases (#11015). Nieuwe aanvragen die het proces toch nog bereiken, krijgen `503` + `Retry-After: 5`. De Recreate-periode zonder endpoint totdat de vervanging Ready is, blijft een volledige uitval — dat is inherent aan de SQLite-topologie en geen verkeerde probeconfiguratie.

Externe Postgres / HA met meerdere writers is **geen** gedocumenteerd standaardpad. Als u HA nodig hebt, behoud dan één replica of gebruik een topologie die het project afzonderlijk heeft getest en gedocumenteerd. Het werk aan Postgres/MySQL vindt plaats in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Totdat dat beschikbaar is, is de enige ondersteunde manier om de capaciteit voor **grote** `/v1/responses` te vermenigvuldigen het gebruik van N onafhankelijke processen (volgende sectie), niet `replicas > 1` op één volume.

## Horizontaal schalen: N onafhankelijke processen

Eén Node-proces is **één V8-heap**. Twee overlappende coding-agentverzoeken van ~3 MiB / ~750k tokens naar `POST /v1/responses` (RTK + Caveman) laten die heap bij ~12 Gi afbreken (`FATAL ERROR: Reached heap limit`) en kunnen een cgroup van 16 Gi door een OOM laten stoppen. Zie [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Die meting is een waarschuwing over het **geheugenbudget**, geen absolute productlimiet van twee gelijktijdige langdurige `/v1/responses`. De toelating van zware chatverzoeken wordt begrensd door een automatisch afgeleid bytebudget voor binnenkomende verzoeken (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), afgestemd op diezelfde V8-/cgrouplimiet — als dit naar boven wordt bijgesteld (of als de verouderde limiet `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` voor het aantal verzoeken wordt ingesteld) op een proces dat al passend is gedimensioneerd, wordt het afbreken opnieuw geïntroduceerd. Kleine chats, `/healthz`, `/v1/models` en MCP vallen **niet** onder die limiet.

### Eén proces: meer dan twee langdurige `/v1/responses`

Een **gezond** proces (heap onder `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standaard `0.75`) **kan** meer dan twee gelijktijdige langdurige verzoeken naar `POST /v1/responses` uitvoeren wanneer het procesbrede bytebudget voor actieve verzoeken (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) nog ruimte heeft. Bodies van minimaal `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standaard 256 KiB) nemen dezelfde lease voor zware verzoeken als structuurzware verzoeken en gebruiken dezelfde `tryAcquireHealthyHeadroom`-uitwijkmogelijkheid uit [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tientallen gelijktijdige langdurige SSE-clients (operators hebben er vaak 40–50 nodig) zijn een kwestie van het **geheugenbudget** — dimensioneer de heap, primaire/headroom-slots en `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — en geen harde productlimiet van “maximaal 2”. Een heap die onder druk staat, wijst nog steeds verzoeken af met een opnieuw te proberen `503`, zodat #7849 niet terugkeert.

Om **heaps te vermenigvuldigen** (onafhankelijke V8 old-spaces) **op dit moment**:

| Wel doen                                                                                                                                                                                     | Niet doen                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Voer **N containers/pods** uit, elk met een **eigen** `DATA_DIR` / volume                                                                                                                    | `replicas > 1` instellen voor één SQLite-bestand                  |
| Dimensioneer zware actieve verzoeken + gezonde headroom op basis van de heap / het bytebudget voor actieve verzoeken; 1–2 is de conservatieve standaard voor #7849, geen harde productlimiet | Eén proces 8× RAM en een onbeperkte aantallimiet geven            |
| Optioneel: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` voor **gedeelde quotatellers**                                                                                               | Redis als gedeelde SQLite behandelen — dat is het niet            |
| Dupliceer providergeheimen naar elke instantie (of accepteer gescheiden dashboards)                                                                                                          | Eén dashboard / één oproeplogboek voor alle instanties verwachten |
| Plaats er een willekeurige load balancer voor; sticky routing op API-sleutel of sessie is voldoende                                                                                          | Vendorspecifieke groottebewuste middleware vereisen               |

Hardware: het aantal gelijktijdige langdurige `/v1/responses` per instantie is een kwestie van het **geheugenbudget** (heap + bytes van actieve verzoeken / #10110). `N` onafhankelijke `DATA_DIR`s vermenigvuldigen nog steeds de heaps: het RAM-geheugen van de host moet ruimte bieden voor `N × cgroup`, niet voor “één pod van 16 Gi met N=8”. Gebruik nooit `replicas > 1` voor één SQLite-bestand.

Compose-voorbeeld (twee heaps, twee volumes — niet `deploy.replicas: 2`):

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

Dichtheid binnen één proces (compressie buiten de HTTP-isolate) wordt behandeld in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Eén logisch cluster op gedeelde duurzame opslag wordt behandeld in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Belangrijke opmerkingen

- **SQLite WAL-modus:** `docker stop` moet de tijd krijgen om te voltooien, zodat OmniRoute de nieuwste wijzigingen via een checkpoint kan terugschrijven naar `storage.sqlite`. De meegeleverde Compose-bestanden stellen al een respijtperiode van 40 seconden voor het stoppen in. Als u de image rechtstreeks uitvoert, behoud dan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Stel dit in op `true` als reguliere backups/backups vóór schrijfbewerkingen extern worden beheerd. Migraties van bestaande databases vereisen nog steeds een eigen duurzame veiligheidskopie en een beveiliging tegen massamigratie.
- **Gegevenspersistentie:** Koppel altijd een volume aan `/app/data` om uw database, sleutels en configuraties te behouden wanneer containers opnieuw worden gestart.
- **Poortconfiguratie:** Overschrijf de omgevingsvariabele `PORT` om de standaardpoort `20128` te wijzigen.

## Zie ook

- [Handleiding voor VM-implementatie](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuratie van VM + nginx + Cloudflare
- [Handleiding voor implementatie op Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementeren op Fly.io
- [Omgevingsconfiguratie](../reference/ENVIRONMENT.md) — Volledig `.env`-overzicht
