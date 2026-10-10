# 🐳 Docker Guide — OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Volledige referentie voor Docker-implementatie. Zie voor een snelle start de [Docker-sectie van de README](../README.md#-docker).

## Inhoudsopgave

- [Snel uitvoeren](#quick-run)
- [Met omgevingsbestand](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Beschikbare profielen](#available-profiles)
- [CLI-tools op de host configureren wanneer OmniRoute in Docker wordt uitgevoerd](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose voor productie](#production-compose)
- [Dockerfile-fasen](#dockerfile-stages)
- [Kritieke omgevingsvariabelen](#critical-environment-variables)
- [Docker Compose met Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Snelle Cloudflare-tunnel](#cloudflare-quick-tunnel)
- [Image-tags](#image-tags)
- [Beschikbaarheid: standaard-SQLite ondersteunt één replica](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-fouten binnen Docker](#gemini-regional-errors-inside-docker)
- [Belangrijke opmerkingen](#important-notes)

---

## Snel uitvoeren

> **Zelf hosten met één opdracht?** Zie de
> [handleiding voor zelf hosten](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (gepubliceerde image +
> Redis, alleen via loopback, geen profielkeuze). De onderstaande snelle uitvoering is bedoeld
> voor één container en voor gebruikers die Redis al elders uitvoeren.

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
# Basisprofiel (zonder CLI-tools)
docker compose --profile base up -d

# CLI-profiel (Claude Code, Codex en OpenClaw ingebouwd)
docker compose --profile cli up -d

# Hostprofiel (primair voor Linux; koppelt CLI-binaire bestanden van de host alleen-lezen)
docker compose --profile host up -d

# Webprofiel (Chromium/Playwright voor websessieproviders)
docker compose --profile web up -d

# Combineer CLI met de CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Beschikbare profielen

OmniRoute levert Compose-profielen voor de belangrijkste implementatievormen. Kies het profiel dat bij uw omgeving past.

| Profiel            | Service          | Wanneer te gebruiken                                                                                                                             | Opdracht                                     |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (standaard) | `omniroute-base` | Headless server/minimale runtime, zonder meegeleverde provider-CLI's                                                                             | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | Agentische workflows die `omniroute providers/setup/doctor` en meegeleverde CLI's (Codex, Claude Code, Droid, OpenClaw) aanroepen                | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | Linux-hosts die `network_mode`-achtige toegang tot host-CLI's willen door `~/.local/bin`, `~/.codex`, `~/.claude`, enz. alleen-lezen te koppelen | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | Voer de [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-sidecar uit op poort `8317` voor upstream CLI-proxying                       | `docker compose --profile cliproxyapi up -d` |
| `web`              | `omniroute-web`  | Websessieproviders die een browser nodig hebben: `gemini-web`, `claude-web`, `claude-turnstile` (bouwt `runner-web`, inclusief Chromium)         | `docker compose --profile web up -d`         |

> Meerdere profielen kunnen worden gecombineerd: `docker compose --profile cli --profile cliproxyapi up -d`.

## Host-CLI-tools configureren wanneer OmniRoute in Docker draait

`omniroute setup-codex`, `setup-claude`, `config set <tool>` en de knop
**Configuratie opslaan** op het dashboard schrijven allemaal bestanden zoals `~/.codex/*.config.toml`. Die paden
hebben alleen betekenis op de machine waarop de CLI daadwerkelijk draait. Voer je ze in
de container uit, dan wordt er geschreven naar de eigen homedirectory van de container (`/home/node` —
de image draait met `USER node`), waar geen enkele CLI op de host ze ooit zal lezen en waar ze
worden verwijderd zodra de container opnieuw wordt aangemaakt.

OmniRoute detecteert dit en weigert de schrijfactie met instructies, in plaats van
een succesmelding te geven waar je niets aan hebt: de CLI sluit af met `2` en de API antwoordt met `422`
en `containerEphemeralTarget: true`.

### Aanbevolen: voer de CLI uit op de host en OmniRoute in Docker

De container biedt de API aan; de CLI configureert je tools op de host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # richt de CLI op de container
omniroute setup-codex                      # schrijft naar de echte ~/.codex op je host
```

Dit is de juiste keuze wanneer Codex, Claude Code, Cursor of vergelijkbare tools op je
laptop draaien — wat de gebruikelijke configuratie is.

### Alternatief: koppel de configuratiemappen van de host als bind mounts (`host`-profiel)

Als je wilt dat de container zelf naar je hostconfiguratie schrijft, koppel je de
mappen aan en laat je `CLI_CONFIG_HOME` naar de hoofdmap van de mount verwijzen. Het `host`-profiel
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
`/proc/self/mountinfo` en staat schrijven naar gekoppelde paden toe (en naar mappen
waarvan de submappen mounts zijn, wat precies overeenkomt met de bovenstaande structuur van `/host-home`), terwijl
schrijfacties naar niet-gekoppelde paden nog steeds worden geweigerd.

### Noodoplossing: configureer de eigen CLI's van de container (spaarzaam gebruiken)

Wanneer de CLI's daadwerkelijk in de container staan (het `cli`-profiel), is de schrijfactie
bewust. Geef `--allow-container-write` door aan elke `setup-*`-opdracht, of stel
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` in voor de server. De schrijfactie wordt uitgevoerd
met een waarschuwing dat de gegevens niet behouden blijven wanneer de container opnieuw wordt aangemaakt.

> **Beveiligingswaarschuwing — `cli`-profiel + `docker.sock`-mount.**
> Het `cli`-profiel koppelt `/var/run/docker.sock` als bind mount, zodat de automatische updater
> in de container de stack opnieuw kan aanmaken via de daemon op de host
> (`src/lib/system/autoUpdate.ts` controleert op die socket en slaat het
> Docker-pad over wanneer deze ontbreekt). Die socket vormt **een vertrouwensgrens met roottoegang
> tot de host**: alles wat er toegang toe heeft, bestuurt de Docker-daemon op de host als
> root — en kan elke container op de host aanmaken, inspecteren, stoppen en verwijderen.
> Gevolgen:
>
> 1. **Stel de poort van het `cli`-profiel nooit open voor het netwerk.** Publiceer
>    deze op `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — een via het LAN bereikbaar `cli`-profiel verandert elke RCE op dashboardniveau in
>    een volledige compromittering van de host.
> 2. **Koppel geen extra hostmappen aan het `cli`-profiel.**
>    De Docker-socket in combinatie met elke aanvullende mount geeft de container volledige
>    lees- en schrijftoegang tot je bestandssysteem en hostconfiguratie. Als een tool
>    toegang tot een project nodig heeft, voer je deze lokaal uit met het CLI-programma — koppel het project niet
>    aan de `cli`-container.
>
> Als je geen automatische updates in de container nodig hebt, laat je het `cli`-profiel uitgeschakeld
> (`COMPOSE_PROFILES=core,redis` of korter). De andere profielen koppelen
> de Docker-socket niet.
>
> Zie `docs/security/MITM-TPROXY-DECRYPT.md` (git; niet gecompileerd naar `/docs`) voor het bijbehorende dreigingsmodel
> rond MITM, en `docs/security/SUPPLY_CHAIN.md` voor de herkomstketen van de binaire bestanden
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidecar

OmniRoute gebruikt Redis als backend voor de gedistribueerde rate limiter en gedeelde cache. De `redis`-service is **altijd gedefinieerd** in `docker-compose.yml` (deze heeft geen profielvoorwaarde) en wordt samen met elk ander profiel gestart.

| Detail                      | Waarde                                    |
| --------------------------- | ----------------------------------------- |
| Image                       | `redis:7-alpine`                          |
| Containernaam               | `omniroute-redis`                         |
| Interne poort               | `6379`                                    |
| Hostpoort (overschrijven)   | `REDIS_PORT` (standaard `6379`)           |
| Hostbinding (overschrijven) | `REDIS_BIND_HOST` (standaard `127.0.0.1`) |
| Volume                      | `omniroute-redis-data` → `/data`          |
| Healthcheck                 | `redis-cli ping` (interval van 10s)       |

Gerelateerde omgevingsvariabelen:

- `REDIS_URL` — verbindingsreeks die in de app wordt geïnjecteerd (standaard `redis://redis:6379`).
- `REDIS_PORT` — hostpoorttoewijzing voor de Redis-container.
- `REDIS_BIND_HOST` — hostinterface waarop de poort wordt gepubliceerd. Standaard `127.0.0.1`.

> **Waarom standaard loopback wordt gebruikt:** de sidecar draait zonder `requirepass` en de app-
> containers bereiken deze via het Compose-netwerk (`redis:6379`) — de gepubliceerde poort is
> alleen bedoeld voor tooling op de host (`redis-cli`, een lokale `npm run dev`). Publiceren op
> `0.0.0.0` zou een niet-geverifieerde Redis blootstellen aan elke host op je LAN. Als je
> `REDIS_BIND_HOST=0.0.0.0` instelt, voeg dan ook `--requirepass` toe aan de `command:` van de service.

**Redis uitschakelen** wordt niet aanbevolen (de rate limiter valt dan terug op een minder betrouwbare fallback in het geheugen). Als het toch nodig is, verwijder dan het `redis:`-serviceblok uit `docker-compose.yml` of zet het in commentaar, of schaal het terug naar nul:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Gebruik `docker-compose.prod.yml` voor een geïsoleerde productie-snapshot die naast de ontwikkelomgeving draait.

| Detail                   | Waarde                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------- |
| Bestand                  | `docker-compose.prod.yml`                                                             |
| Standaard dashboardpoort | `PROD_DASHBOARD_PORT=20130` (toegewezen aan intern `${DASHBOARD_PORT:-20128}`)        |
| Standaard API-poort      | `PROD_API_PORT=20131`                                                                 |
| Image                    | `omniroute:prod` (gebouwd vanuit het `runner-cli`-target)                             |
| Redis-container          | `omniroute-redis-prod` (`redis:8.6.2`, afzonderlijk `redis-prod-data`-volume)         |
| Datavolume               | `omniroute-prod-data` (benoemd, blijft behouden bij nieuwe builds)                    |
| Healthchecks             | `node healthcheck.mjs` + `redis-cli ping`, waarbij `depends_on` wacht op Redis-health |

Gebruik:

```bash
# Bouw en start de productiestack
docker compose -f docker-compose.prod.yml up -d --build

# Volg de logs
docker compose -f docker-compose.prod.yml logs -f

# Stop en verwijder de stack (behoud volumes)
docker compose -f docker-compose.prod.yml down
```

De productiestack draait parallel aan de ontwikkel-Compose-configuratie (met andere containernamen, poorten en volumes), zodat je lokaal kunt blijven itereren terwijl de productieomgeving actief blijft.

## Dockerfile-fasen

De repository bevat een Dockerfile met meerdere fasen (`Dockerfile`). Er zijn vier fasen beschikbaar; kies de juiste `target` voor jouw gebruikssituatie.

| Fase          | Basisimage            | Doel                                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installeert afhankelijkheden (`npm ci --legacy-peer-deps`) en voert `npm run build` uit (standaard met Turbopack — zie Buildresources hieronder)                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Productieruntime met de zelfstandige uitvoer van Next.js. **Bevat geen CLI's van providers.**                                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Voegt `git`, `docker.io`, `docker-compose` en globale CLI's toe: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Kies deze voor agentische workflows.**                                                                                                                                    |
| `runner-web`  | `runner-base`         | Voegt Playwright en een Chromium-browser (`--with-deps`) toe voor websessieproviders: `gemini-web`, `claude-web`, `claude-turnstile`. **Kies deze wanneer je die providers gebruikt** — zonder deze toevoeging mislukt de gewone image tijdens een verzoek (zie de opmerking over `-web` onder Releasekanalen). |

Bouw handmatig een specifieke target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Buildresources

Drie build-argumenten bepalen hoeveel resources de fase `builder` verbruikt. Ze gelden alleen tijdens het buildproces —
`OMNIROUTE_MEMORY_MB` (hieronder) is een afzonderlijke instelling voor de runtime.

| Build-argument              | Standaard | Effect                                                                                                  |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`       | `0` bouwt met webpack: lager piekgeheugengebruik, maar langzamer. `1` schakelt Turbopack in.            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | Bovengrens voor de V8-heap (`--max-old-space-size`) van het gestarte `next build`-proces.               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Levert `CIRCLE_NODE_TOTAL`; Next leidt hieruit `workers = N - 1` af voor het verzamelen van paginadata. |

`OMNIROUTE_BUILD_WORKERS` is de instelling die je op een krachtige builder moet verhogen en
die je moet verdenken wanneer een build met beperkte resources **na** `✓ Compiled successfully`
mislukt. Elke worker voor paginadata is een afzonderlijk proces, net als het bovenliggende
`next build`-proces zelf; bij een reproductie op een actieve VPS (issue #7518) werd voor elk
proces een piek-RSS van ~4,5 GB gemeten, onafhankelijk van de heapvlag van `NODE_OPTIONS`
(Turbopack compileert in native/Rust-geheugen buiten de V8-heap). De standaardwaarde `2`
(→ 1 worker, in totaal 2 processen) is afgestemd op de door GitHub gehoste runners met
16 GB / 4 vCPU's die door de publicatiepipeline worden gebruikt. Bij `8` (→ 7 workers)
raakte het geheugen van die runner uitgeput en mislukte de buildkit-stap met
`ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 workers) paste nog steeds niet
nadat de RSS per proces rechtstreeks werd gemeten in plaats van afgeleid.
`tests/unit/docker-build-memory-budget.test.ts` voert de berekening uit op basis van de
gemeten waarde en mislukt als een van beide instellingen de capaciteit van de runner
overschrijdt.

Turbopack compileert in native Rust-geheugen dat zich **buiten** de V8-heap bevindt, waardoor
`OMNIROUTE_BUILD_MEMORY_MB` dit niet begrenst. Op een host met een geheugenlimiet wordt het
buildproces vervolgens door de OOM-killer met SIGKILL beëindigd, zonder enige fouttekst — het
stopt simpelweg halverwege `Creating an optimized production build`, wat eerder op een
vastgelopen proces lijkt dan op een geheugentekort. Daarom gebruikt de `Dockerfile` standaard
webpack (`OMNIROUTE_USE_TURBOPACK=0`), in tegenstelling tot `npm run dev` / `npm run build`,
waar Turbopack standaard in de code is ingesteld: een kale `docker build .` zonder
build-argumenten (zoals uitgevoerd door Railway en andere one-click-hosts) mag niet stilzwijgend
mislukken op een builder met een geheugenlimiet. De gepubliceerde images geven
`OMNIROUTE_USE_TURBOPACK=0` al expliciet door in `docker-publish.yml`. Op een builder met
voldoende RAM kun je Turbopack inschakelen voor een snellere build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` is ingeschakeld, waardoor `next build` een bovenliggend proces **en** een
workerproces uitvoert en elk proces `OMNIROUTE_BUILD_MEMORY_MB` afzonderlijk respecteert. Stel
de containerlimiet in op iets meer dan ongeveer tweemaal die waarde, niet eenmaal.

Gemeten voor deze broncode (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Containerlimiet | Resultaat                                 |
| --------- | --------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | bij beide stilzwijgend beëindigd door OOM |
| webpack   | 8 GiB           | buildworker beëindigd met SIGKILL         |
| webpack   | 12 GiB          | geslaagd, piek van 11,1 GiB               |

### Standaardwaarden voor de runtime

Standaardwaarden die door `runner-base` worden geëxporteerd: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Geheugengedrag in Docker:

- De image stelt `OMNIROUTE_MEMORY_MB=1024` in en leidt daaruit `NODE_OPTIONS=--max-old-space-size=1024` af.
- Het daadwerkelijke serverproces wordt gestart door de standalone-launcher, die `OMNIROUTE_MEMORY_MB` leest en `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` toevoegt.
- Node gebruikt de laatste herhaalde waarde van `--max-old-space-size`, dus door `OMNIROUTE_MEMORY_MB` in te stellen, bepaalt u de effectieve Docker-heaplimiet.
- Omdat de image deze variabele altijd instelt, wordt de op het RAM-geheugen afgestemde fallback van de launcher onder Docker nooit toegepast. Verhoog de waarde expliciet voor de workload (zie onderstaande tabel). `2048` is nog steeds te klein voor `/v1/responses` van codeeragents.

### RAM-geheugen tijdens runtime voor codeeragents

De Docker-standaardwaarde van 1 GiB is een ondergrens voor het dashboard en lichte chats, geen waarde voor productiegebruik. Lange bodies van `POST /v1/responses` (honderden berichten, tientallen tools) houden tijdens compressie meerdere grafen in het geheugen vast. Twee overlappende requests van elk ~3 MiB / ~750k tokens hebben V8 laten afbreken bij een old-space van **12 GiB** (`FATAL ERROR: Reached heap limit`) en veroorzaakten ook een cgroup-OOM bij 16 GiB. Zie [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Stel **cgroup `--memory` hoger in dan de heap** — native buffers, SQLite en tijdelijke compressiegegevens bevinden zich buiten V8.

| Workload                                   | `OMNIROUTE_MEMORY_MB`   | Container / cgroup      | Opmerkingen                                                                                                     |
| ------------------------------------------ | ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| Dashboard, één lichte chat                 | `1024` (standaardimage) | ≥2 GiB                  |                                                                                                                 |
| Eén codeeragent (Claude/Codex/Grok)        | `8192`                  | ≥10 GiB                 | Typische `/v1/responses` met één sessie                                                                         |
| Twee gelijktijdige lange `/v1/responses`   | `10240`–`12288`         | ≥12–16 GiB              | Gemeten V8-afbreking bij een heap van ~12 GiB                                                                   |
| Drie of meer gelijktijdige lange contexten | niet in één proces      | serialiseren / meer RAM | Standaard wordt 1 zware request tegelijk toegelaten; verhogen zonder extra RAM veroorzaakt de afbreking opnieuw |

`omniroute serve` op bare metal stemt de waarde af op ~35% van het RAM-geheugen (begrensd op `[512, 4096]`) wanneer `OMNIROUTE_MEMORY_MB` **niet is ingesteld**. Docker stelt altijd `1024` in, waardoor die afstemming in de officiële image nooit wordt uitgevoerd.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritieke omgevingsvariabelen

Naast de standaardwaarden die zijn beschreven in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), zijn de volgende variabelen het belangrijkst bij uitvoering onder Docker:

| Variabele                     | Doel                                                                                                                                                                                                                                                                                     | Standaardwaarde                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Gedeeld geheim voor de WebSocket-bridge. **Vereist in productie** — stel dit in op een sterke willekeurige tekenreeks.                                                                                                                                                                   | niet ingesteld (moet worden opgegeven) |
| `REDIS_URL`                   | Verbindingsreeks voor de backend voor snelheidsbeperking/cache                                                                                                                                                                                                                           | `redis://redis:6379`                   |
| `REDIS_PORT`                  | Hostpoort voor de meegeleverde Redis-container                                                                                                                                                                                                                                           | `6379`                                 |
| `REDIS_BIND_HOST`             | Hostinterface waarop de meegeleverde Redis-poort wordt gepubliceerd (loopback tenzij u AUTH toevoegt)                                                                                                                                                                                    | `127.0.0.1`                            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hostpad dat in het `cli`-profiel wordt gekoppeld aan `/workspace/omniroute` voor zelfupdateworkflows                                                                                                                                                                                     | `.` (huidige map)                      |
| `OMNIROUTE_MEMORY_MB`         | Maximale Node-heapgrootte tijdens runtime voor de zelfstandige Docker-server; overschrijft de bovenstaande standaardwaarde van de image. Codeeragents: `8192`+ (zie [runtime-RAM](#runtime-ram-for-coding-agents)).                                                                      | `1024`                                 |
| `DASHBOARD_PORT` / `API_PORT` | Overschrijft de beschikbaar gestelde poorten voor het dashboard (20128) en de API (20129)                                                                                                                                                                                                | `20128` / `20129`                      |
| `APP_BIND_HOST`               | Hostinterface waarop docker-compose de dashboard-, API- en live-WS-poorten publiceert. Met `REQUIRE_API_KEY=false` (de standaardwaarde) stelt `0.0.0.0` de anonieme `/v1`-proxy beschikbaar aan het LAN — maak dit alleen breder met `REQUIRE_API_KEY=true` of een reverse proxy ervoor. | `127.0.0.1`                            |
| `CLIPROXY_BIND_HOST`          | Hostinterface waarop docker-compose de `cliproxyapi`-sidecar publiceert — het datavolume daarvan bevat providerreferenties.                                                                                                                                                              | `127.0.0.1`                            |
| `OMNIROUTE_PLUGINS_DIR`       | Map die door de runtime-plug-inscanner wordt gelezen en waarin deze installeert. Stel dit in wanneer plug-ins via bind mounts zijn gekoppeld: de standaardwaarde volgt `HOME`, dat niet per se door een image wordt geëxporteerd.                                                        | `~/.omniroute/plugins`                 |
| `OMNIROUTE_BASE_PATH`         | URL-subpad wanneer de app achter een reverse proxy wordt gepubliceerd (bijv. `/omniroute`)                                                                                                                                                                                               | _(leeg = hoofdpad)_                    |
| `NEXT_PUBLIC_BASE_URL`        | Openbare browserorigin inclusief het subpad (bijv. `https://host/omniroute`)                                                                                                                                                                                                             | niet ingesteld                         |
| `PROD_DASHBOARD_PORT`         | Dashboardpoort aan de hostzijde voor `docker-compose.prod.yml`                                                                                                                                                                                                                           | `20130`                                |
| `CLIPROXYAPI_PORT`            | Hostpoort voor de `cliproxyapi`-sidecar                                                                                                                                                                                                                                                  | `8317`                                 |

## Reverse proxy op een subpad (Traefik / nginx)

De `basePath` van Next.js wordt in de standalone-bundel gecompileerd. OmniRoute legt de ingebakken
waarde vast in een sentinelbestand in de hoofdmap van de app (geschreven tijdens `npm run build`; gelezen door
`scripts/docker/ensure-docker-base-path.mjs`) en vergelijkt deze met
`OMNIROUTE_BASE_PATH` wanneer de container wordt gestart. Wanneer deze verschillen en de image voor
de domeinhoofdmap is gebouwd, herschrijft het entrypoint de standalone-manifesten, de
ingesloten `basePath`/`assetPrefix`-literalen (Next 16 rendert SSR-asset-URL's uitsluitend vanuit
`assetPrefix` — de patcher neemt het subpad hierin over), de ingebakken
`/_next/static`-asset-URL's (client-reference-manifesten, media-imports, vooraf gerenderde
foutpagina's) en de `process.env`-shim van de client voordat `node dev/run-standalone.mjs`
wordt uitgevoerd.

### Compose-build (aanbevolen)

Stel beide variabelen in `.env` in en bouw vervolgens opnieuw, zodat de image en runtime overeenkomen:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` geeft `OMNIROUTE_BASE_PATH` door als Docker-buildargument en als
runtime-omgevingsvariabele.

### Vooraf gebouwde root-image + runtime-subpad

Gepubliceerde `diegosouzapw/omniroute:*`-images zijn gebouwd voor de domeinhoofdmap. U kunt
`OMNIROUTE_BASE_PATH` nog steeds tijdens runtime instellen; de container patcht de bundel eenmaal bij het opstarten.
Combineer deze met de bijbehorende openbare origin:

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

De Docker-healthcheck controleert het lichtgewicht lifecycle-endpoint `/healthz`, voorafgegaan
door de actieve `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` blijft beschikbaar voor
diagnostiek door mensen en dashboards; stel `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` in
om de HEALTHCHECK van de container er opnieuw naar te laten verwijzen (bijvoorbeeld
om uitgebreide statuscontrole af te dwingen).
Dat pad is een **uitgebreide** controle (database + monitoringsoverzicht) — geschikt voor Dockers
weinig frequente `HEALTHCHECK` als u deze opnieuw inschakelt, maar **niet** voor intervallen van
Kubernetes-`livenessProbe`.

Voor orchestrators (Kubernetes, Nomad enz.):

| Probe                 | Voorkeur                                                               | Vermijd                                                       |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| Liveness              | HTTP `GET /livez`, of TCP op de hoofdpoort (`PORT`, standaard `20128`) | `/api/monitoring/health` als liveness                         |
| Readiness             | HTTP `GET /healthz`                                                    | Korte time-outs die een drukke event-loop als dood beschouwen |
| Uitgebreid / blackbox | `/api/monitoring/health`                                               | —                                                             |

`/healthz` rapporteert de proceslevenscyclus (`ok` / `starting` / `stopping`). `/livez` is
uitsluitend een controle of het proces actief is (200 wanneer de handler kan worden uitgevoerd; het wacht niet op
readiness). Beide worden nog steeds uitgevoerd op dezelfde Node-event-loop als de verwerking van verzoeken, waardoor
CPU-intensief catalogus- of compressiewerk ze kan vertragen — bezig ≠ dood. Geef de voorkeur aan
TCP-liveness als HTTP-probes een time-out krijgen. Volledige richtlijnen voor probes:
[Monitoringhandleiding — aanbevelingen voor Kubernetes-probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose met Caddy (automatische TLS voor HTTPS)

OmniRoute kan veilig beschikbaar worden gesteld met de automatische SSL-provisioning van Caddy. Zorg ervoor dat het DNS A-record van je domein naar het IP-adres van je server verwijst.

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
      # Browsergerichte origin voor OAuth-callbacks, dashboardlinks en gegenereerde openbare URL's.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interne server-naar-server-URL voor geplande taken / verzoeken naar zichzelf.
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

Caddy stelt de standaard forwarding-headers in voor de upstreamcontainer. OmniRoute gebruikt
`NEXT_PUBLIC_BASE_URL` als de canonieke openbare origin voor OAuth-callbacks en gegenereerde openbare
links; geverifieerde schrijfbewerkingen in het dashboard gebruiken same-origin-verzoeken plus sessiegebonden CSRF-
beveiliging. Schakel `OMNIROUTE_TRUST_PROXY` alleen in voor geavanceerde implementaties waarbij je bewust
wilt dat OmniRoute de openbare origin afleidt uit vertrouwde doorgestuurde headers in plaats van expliciete
configuratie.

## Cloudflare Quick Tunnel

Dashboardondersteuning voor Docker-implementaties omvat een met één klik te activeren **Cloudflare Quick Tunnel** op `Dashboard → Endpoints`. Wanneer deze voor het eerst wordt ingeschakeld, wordt `cloudflared` alleen indien nodig gedownload, wordt een tijdelijke tunnel naar je huidige `/v1`-endpoint gestart en wordt de gegenereerde URL `https://*.trycloudflare.com/v1` direct onder je normale openbare URL weergegeven.

Tunnelpanelen voor endpoints (Cloudflare, Tailscale, ngrok) kunnen via `Settings → Appearance` worden weergegeven of verborgen zonder de status van actieve tunnels te wijzigen.

### Opmerkingen over tunnels

- URL's van Quick Tunnels zijn tijdelijk en veranderen na elke herstart.
- Quick Tunnels worden niet automatisch hersteld na een herstart van OmniRoute of de container. Schakel ze indien nodig opnieuw in via het dashboard.
- Beheerde installatie ondersteunt momenteel Linux, macOS en Windows op `x64` / `arm64`.
- Beheerde Quick Tunnels gebruiken standaard HTTP/2-transport om luidruchtige waarschuwingen over QUIC UDP-buffers in beperkte containeromgevingen te voorkomen. Stel `CLOUDFLARED_PROTOCOL=quic` of `auto` in als je een ander transport wilt.
- Docker-images bevatten de CA-basiscertificaten van het systeem en geven deze door aan de beheerde `cloudflared`, waardoor TLS-vertrouwensfouten worden voorkomen wanneer de tunnel in de container wordt opgestart.
- Stel `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` in als je wilt dat OmniRoute een bestaand binair bestand gebruikt in plaats van er een te downloaden.

## Imagetags

| Image                    | Tag      | Grootte | Beschrijving                                                |
| ------------------------ | -------- | ------- | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Hoogste **gepubliceerde** stabiele SemVer (niet git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Zet dit type tag vast voor GitOps                           |

Multiplatformmanifest: native `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selecteert automatisch de overeenkomende architectuur; geef `--platform linux/amd64` door als je AMD64-emulatie op ARM-hosts moet afdwingen.

### Releasekanalen

OmniRoute publiceert afzonderlijke Docker-kanalen voor stabiele releases, het testen van actieve releasebranches en ontwikkelbuilds.

| Kanaal                          | Bron                                      | Wijzigbaarheid                     | Aanbevolen gebruik                                                                                                                              |
| ------------------------------- | ----------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Ondertekende/geversioneerde release       | Onveranderlijk                     | Productie-implementaties die een exacte release vastzetten                                                                                      |
| `:latest` / `:latest-web`       | Hoogste **gepubliceerde** stabiele SemVer | Veranderlijke stabiele verwijzing  | Volgt stabiele releases **nadat** een SemVer-publicatietaak is uitgevoerd — volgt **niet** `main` of niet-uitgebrachte commits van `release/v*` |
| `:next` / `:next-web`           | Huidige standaardbranch `release/v*`      | Veranderlijke prereleaseverwijzing | Testen van oplossingen die in de actieve releasebranch zijn opgenomen, maar nog niet in een stabiele release                                    |
| `:main` / `:main-web`           | Branch `main`                             | Veranderlijke ontwikkelverwijzing  | Alleen voor ontwikkeling en integratietests                                                                                                     |

#### Websessieproviders: de `-web`-images

Elk bovenstaand kanaal is ook beschikbaar als een `-web`-tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), gebouwd vanuit de `runner-web`-stage — dezelfde image plus Playwright en een Chromium-browser. De gewone image wordt **zonder** Chromium geleverd; `gemini-web`, `claude-web` en `claude-turnstile` hebben dit nodig.

De fout wordt uitgesteld en treedt niet tijdens het opstarten op: deze providers vermelden hun modellen en worden als verbonden weergegeven in het dashboard, en alleen het eerste verzoek mislukt met

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Als je deze providers gebruikt, haal dan de `-web`-tag op van het kanaal dat je al gebruikt — verder verandert er niets. Bij een npm/CLI-installatie (zonder Docker-image) ontbreekt op vergelijkbare wijze het binaire browserbestand: voer `npx playwright install chromium` uit op de host.

#### Het prereleasekanaal gebruiken

Het `next`-kanaal wordt bij elke push naar de huidige standaardbranch `release/v*` opnieuw gebouwd en wordt gepubliceerd voor zowel AMD64 als ARM64. Oudere onderhoudsbranches kunnen het niet overschrijven. Het kanaal biedt een downloadbare image voor fixes die in de actieve releasebranch zijn gemerged voordat de volgende stabiele tag wordt aangemaakt.

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

`next` is een veranderlijk prereleasekanaal. Het kan bij elke push naar de actieve releasebranch veranderen en wordt **niet ondersteund voor productiegebruik**. Zet de image-digest vast bij het evalueren van een specifieke build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Maak vóór het testen een back-up van het OmniRoute-datavolume of de gekoppelde datamap. Om terug te draaien, herstelt u de eerder gebruikte stabiele versie of digest en maakt u de container opnieuw aan:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Een build van een releasebranch kan `latest` nooit wijzigen; alleen een in aanmerking komende stabiele semantische versie kan de stabiele verwijzing promoveren. De `next`-images behouden de inspectie van de release-image en de blokkerende controle op CRITICAL-kwetsbaarheden.

**`latest` is voor git geen garantie dat de inhoud actueel is.** Gemergede fixes op `main` of op de actieve branch `release/v*` zijn **niet** opgenomen in `:latest` totdat een stabiele SemVer-image is gepubliceerd en de publicatietaak `:latest` promoveert (dezelfde digest als die SemVer-versie). Als `latest` ongewijzigd lijkt terwijl GitHub de fix al toont, haalt u `:next` op om de releasebranch te testen of wacht u op de SemVer-tag.

| Wat u wilt                                                                            | Gebruik                                |
| ------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps/productie die niet mag afwijken                                                | Zet `:X.Y.Z` (of de image-digest) vast |
| Gepubliceerde stabiele versies volgen en bij elke release opnieuw aanmaken accepteren | `:latest`                              |
| Niet-uitgebrachte commits van `release/v*` testen                                     | `:next` (niet voor productie)          |
| `main` testen                                                                         | `:main` (niet voor productie)          |

## Beschikbaarheid: standaard is SQLite beperkt tot één replica

De standaard Docker-/Kubernetes-configuratie van OmniRoute bestaat uit **één Node-proces + één SQLite-writer**. Hoge beschikbaarheid wordt in deze topologie **niet ondersteund**.

| Beperking                                                 | Gevolg                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eén writer                                                | Voer **niet** meerdere replica's uit met hetzelfde SQLite-bestand. Hierdoor raakt de database beschadigd.                                                                                                                                                                                                                                                                         |
| Opnieuw maken / herstarten / beëindiging door HEALTHCHECK | **Volledige uitval** van actieve SSE-verbindingen, dashboardsessies en status in het geheugen. De verbinding van elke verbonden client wordt verbroken. Nieuwe aanvragen tijdens het venster zonder eindpunten ontvangen van de reverse proxy **`502 Bad Gateway: Unknown error`**, niet OmniRoute-JSON — clients kunnen dit niet onderscheiden van een providerstoring (#11015). |
| Dezelfde eventloop als `/healthz`                         | Een drukke catalogus- of compressiecyclus kan probes vertragen; een korte time-out zorgt er dan voor dat de **enige** replica opnieuw wordt gestart.                                                                                                                                                                                                                              |

**Probematrix** (zie ook [Aanbevelingen voor Kubernetes-probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                   | Doel                                                                       | Niet gebruiken                                                   |
| ----------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Liveness                | TCP op `PORT` (standaard `20128`), of een soepele HTTP-probe op `/healthz` | `/api/monitoring/health`                                         |
| Readiness               | HTTP `GET /healthz`                                                        | Strikte time-outs die een drukke eventloop als uitval beschouwen |
| Diepgaand / voor mensen | `/api/monitoring/health`                                                   | Geautomatiseerde kubelet-liveness                                |

**Upgrades:** houd er rekening mee dat elke sessie wordt verbroken. Laat clients indien mogelijk hun werk afronden; met standaard-SQLite is geen rolling update mogelijk. Compose `restart: unless-stopped` in combinatie met Docker `HEALTHCHECK` vervangt ook het enige proces wanneer de container de status Unhealthy heeft — met dezelfde impact.

Kubernetes-fragment voor **één replica** (Recreate is vereist; verhoog `replicas` niet voor één SQLite-bestand):

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

De wachttijd van `preStop` geeft kube de tijd om Service-eindpunten te verwijderen vóór SIGTERM, zodat **nieuw** verkeer niet meer bij het stoppende proces terechtkomt. Actieve `/v1/responses`-SSE wordt maximaal gedurende `SHUTDOWN_TIMEOUT_MS` (standaard 30 s) afgehandeld via heavyweight admission leases (#11015). Nieuwe aanvragen die het proces toch bereiken, ontvangen `503` + `Retry-After: 5`. De Recreate-periode zonder eindpunten totdat de vervanging Ready is, blijft een volledige uitval — dat is inherent aan de SQLite-topologie en geen verkeerde probeconfiguratie.

Externe Postgres / HA met meerdere writers is **geen** gedocumenteerd standaardscenario. Als u HA nodig hebt, behoud dan één replica of gebruik een topologie die het project afzonderlijk heeft getest en gedocumenteerd. Het werk aan Postgres/MySQL is te vinden in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Totdat dat beschikbaar is, is de enige ondersteunde manier om de capaciteit voor **grote** `/v1/responses` te vermenigvuldigen het gebruik van N onafhankelijke processen (volgende sectie), niet `replicas > 1` op één volume.

## Horizontaal schalen: N onafhankelijke processen

Eén Node-proces is **één V8-heap**. Twee overlappende coding-agent-aanvragen van ~3 MiB / ~750k tokens via `POST /v1/responses` (RTK + Caveman) laten die heap bij ~12 Gi crashen (`FATAL ERROR: Reached heap limit`) en kunnen in een cgroup van 16 Gi een OOM veroorzaken. Zie [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Die meting is een waarschuwing over het **geheugenbudget**, geen harde productlimiet van twee gelijktijdige langdurige `/v1/responses`. De toelating van zware chats wordt begrensd door een automatisch afgeleid budget voor ingest-bytes (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dat is gedimensioneerd op basis van diezelfde V8-/cgroup-limiet — dit naar boven bijstellen (of de verouderde limiet op het aantal aanvragen `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` instellen) voor een proces dat al is gedimensioneerd, introduceert de crash opnieuw. Kleine chats, `/healthz`, `/v1/models` en MCP vallen **niet** onder die limiet.

### Eén proces: meer dan twee langdurige `/v1/responses`

Een **gezond** proces (heap onder `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standaard `0.75`) **kan** meer dan twee gelijktijdige langdurige `POST /v1/responses` uitvoeren wanneer het procesbrede budget voor gelijktijdig verwerkte bytes (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) nog ruimte heeft. Bodies van `OMNIROUTE_CHAT_LARGE_BODY_BYTES` of groter (standaard 256 KiB) nemen dezelfde lease voor zware aanvragen als aanvragen met een zware structuur en gebruiken dezelfde [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom`-uitwijkmogelijkheid (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tientallen gelijktijdige langdurige SSE-clients (operators hebben er vaak 40–50 nodig) zijn een kwestie van het **geheugenbudget** — dimensioneer de heap + primaire/headroom-slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — en geen harde productlimiet van “maximaal 2”. Een onder druk staande heap blijft aanvragen afwijzen met een opnieuw te proberen `503`, zodat #7849 niet terugkeert.

Om **heaps te vermenigvuldigen** (onafhankelijke V8-old-spaces) **op dit moment**:

| Wel doen                                                                                                                                                                           | Niet doen                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Voer **N containers/pods** uit, elk met een **eigen** `DATA_DIR` / volume                                                                                                          | `replicas > 1` instellen voor één SQLite-bestand                  |
| Dimensioneer zwaar gelijktijdig verkeer + gezonde headroom op basis van het heap-/inflight-bytebudget; 1–2 is de conservatieve standaardwaarde uit #7849, geen harde productlimiet | Eén proces 8× zoveel RAM en een onbegrensde aantallimiet geven    |
| Optioneel: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` voor **gedeelde quotatellers**                                                                                     | Redis als gedeelde SQLite behandelen — dat is het niet            |
| Dupliceer providergeheimen naar elke instantie (of accepteer gepartitioneerde dashboards)                                                                                          | Eén dashboard / één oproeplogboek voor alle instanties verwachten |
| Plaats er een willekeurige load balancer voor; sticky routing op API-sleutel of sessie is voldoende                                                                                | Vendorspecifieke, groottebewuste middleware vereisen              |

Hardware: het aantal gelijktijdige langdurige `/v1/responses` per instantie is een kwestie van het **geheugenbudget** (heap + inflight-bytes / #10110). `N` onafhankelijke `DATA_DIR`s vermenigvuldigen nog steeds de heaps: het host-RAM moet `N × cgroup` aankunnen, niet “één pod van 16 Gi met N=8”. Gebruik nooit `replicas > 1` voor één SQLite-bestand.

Compose-schets (twee heaps, twee volumes — niet `deploy.replicas: 2`):

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

Dichtheid binnen één proces (compressie buiten de HTTP-isolate) is [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Eén logisch cluster op gedeelde duurzame state is [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionale Gemini-fouten binnen Docker

Google AI Studio / Gemini API kan HTTP 400 retourneren met FAILED_PRECONDITION en
`De locatie van de gebruiker wordt niet ondersteund voor het gebruik van de API.` Een geslaagd verzoek op de host
bewijst niet dat de container dezelfde uitgaande route gebruikt. DNS-volgorde,
IPv4-/IPv6-connectiviteit, VPN-routering en geconfigureerde proxy's kunnen verschillen. Controleer
[de door Google ondersteunde regio's](https://ai.google.dev/gemini-api/docs/available-regions)
en ook de daadwerkelijke verbindingsroute; deze fout alleen wijst niet op een ongeldige API-sleutel.

### Geef de voorkeur aan een verbindingsspecifieke proxy

Gebruik OmniRoute's [proxyconfiguratie per verbinding](../ops/PROXY_GUIDE.md#4-level-proxy-system)
voor de getroffen Gemini-verbinding en herhaal vervolgens **Verbinding testen** en een klein verzoek
met hetzelfde model. Zo blijft de routeringswijziging beperkt tot die verbinding. Controleer
of de proxy bereikbaar is vanuit de container en of de verbinding deze daadwerkelijk selecteert.
Het wijzigen van de route garandeert niet dat er aan de regionale voorwaarden van de upstreamdienst wordt voldaan.

### Netwerken van host en container vergelijken

Houd de sleutel, het model en het verzoek identiek wanneer u geauthenticeerde resultaten vergelijkt; plaats nooit
referenties, proxywachtwoorden of volledige autorisatieheaders in een issue.
Controleer eerst welke adresfamilies de OS-resolver aanbiedt door dezelfde opdracht
op de host en in de container uit te voeren:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Vervang `omniroute` door de service die u uitvoert (bijvoorbeeld `omniroute-web`). Deze
opdrachten tonen adresfamilies zonder referenties of IP-adressen. Een geretourneerde `6`
toont alleen een IPv6-DNS-resultaat: dit bewijst **niet** dat er een bruikbare IPv6-route of API-toegang is.
Waar `curl` is geïnstalleerd, vergelijkt u `curl -4 -I https://generativelanguage.googleapis.com`
met `curl -6 -I https://generativelanguage.googleapis.com` in beide omgevingen.
Een HTTP-respons bewijst connectiviteit voor die test, zelfs als het een niet-geauthenticeerde
fout is; alleen het geauthenticeerde modelverzoek test de geschiktheid voor Gemini.

### Alternatief op hostniveau: werkend IPv6 en resolverbeleid

De melder van [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) herstelde
de toegang in diens omgeving door IPv6 voor containers in te schakelen en de adresselectie
van glibc te wijzigen. Beschouw dit als een omgevingsspecifiek alternatief. Controleer een werkende
IPv6-verbinding op de host, uitgaand verkeer/routering van containers en firewallregels voordat u de resolvervoorkeuren aanpast.
Een privé-ULA-adres op zichzelf toont geen openbare IPv6-connectiviteit aan.

Voor services die al zijn gekoppeld aan het standaardnetwerk van Compose, schakelt dit fragment
IPv6 in op dat netwerk; behoud de rest van uw service, poorten, volumes en configuratie:

```yaml
networks:
  default:
    enable_ipv6: true
```

Schakel IPv6 voor een benoemd netwerk in op het netwerk waarmee de service daadwerkelijk verbinding maakt. Docker kan
een ULA-subnet toewijzen; selecteer alleen een expliciet, niet-overlappend subnet wanneer uw netwerk
dit vereist. Zie [Docker IPv6-netwerken](https://docs.docker.com/engine/daemon/ipv6/)
en [Compose-netwerkopties](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Op een **op glibc gebaseerde image** kan `/etc/gai.conf` de adresselectie wijzigen. De huidige
Dockerfile van de repository gebruikt Debian; aangepaste, op musl gebaseerde images ondersteunen dit mechanisme niet.
De gemelde aanpassing wijzigt het ULA-label van `label fc00::/7 6` in
`label fc00::/7 1`. Ga uit van de volledige beleidstabel van de image en behoud de overige
vermeldingen: het toevoegen van een `label`- of `precedence`-vermelding vervangt die standaardtabel, waardoor een bestand
met alleen de gewijzigde regel onvoldoende is. De
[glibc-configuratiereferentie](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenteert deze semantiek. Koppel het gecontroleerde bestand als alleen-lezen aan `/etc/gai.conf`
en maak de service opnieuw aan om de wijziging toe te passen.

Dit wijzigt de OS-adresselectie voor **al het uitgaande verkeer in die container**.
Het dwingt niet elke toepassing om IPv6 te kiezen: de DNS-volgorde en verbindingsselectie
van Node spelen ook een rol. Met name `--dns-result-order=ipv4first` geeft de voorkeur aan IPv4 en
is geen oplossing voor een fout die alleen bij IPv4 optreedt. Zie [Node DNS-volgorde](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Test Gemini en uw andere providers opnieuw na elke wijziging op hostniveau. Om de wijziging terug te draaien,
verwijdert u de aangepaste `gai.conf`-koppeling, herstelt u de vorige netwerkconfiguratie en
maakt u de getroffen service/het getroffen netwerk opnieuw aan tijdens een onderhoudsvenster. Het opnieuw aanmaken van een netwerk
kan andere daaraan gekoppelde containers onderbreken; verwijder het persistente gegevensvolume niet.

## Belangrijke opmerkingen

- **SQLite WAL-modus:** `docker stop` moet de tijd krijgen om te voltooien, zodat OmniRoute de nieuwste wijzigingen via een checkpoint kan terugschrijven naar `storage.sqlite`. De meegeleverde Compose-bestanden stellen al een respijtperiode van 40 seconden in voor het stoppen. Als je de image rechtstreeks uitvoert, behoud dan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Stel dit in op `true` als routinematige backups en backups vóór schrijfbewerkingen extern worden beheerd. Migraties van bestaande databases vereisen nog steeds een eigen duurzaam veiligheidsmomentopname en een beveiliging voor grootschalige migraties.
- **Gegevenspersistentie:** Koppel altijd een volume aan `/app/data` om je database, sleutels en configuraties te behouden wanneer containers opnieuw worden gestart.
- **Poortconfiguratie:** Overschrijf de omgevingsvariabele `PORT` om de standaardpoort `20128` te wijzigen.

## Zie ook

- [Implementatiehandleiding voor VM's](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuratie voor VM + nginx + Cloudflare
- [Implementatiehandleiding voor Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementeren op Fly.io
- [Omgevingsconfiguratie](../reference/ENVIRONMENT.md) — Volledige referentie voor `.env`
