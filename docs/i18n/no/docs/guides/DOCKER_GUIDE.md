# 🐳 Docker Guide — OmniRoute (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Fullstendig referanse for Docker-distribusjon. For en rask start, se [Docker-delen i README](../README.md#-docker).

## Innholdsfortegnelse

- [Hurtigkjøring](#quick-run)
- [Med miljøfil](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Tilgjengelige profiler](#available-profiles)
- [Konfigurere CLI-verktøy på verten når OmniRoute kjører i Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose for produksjon](#production-compose)
- [Dockerfile-stadier](#dockerfile-stages)
- [Kritiske miljøvariabler](#critical-environment-variables)
- [Docker Compose med Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image-tagger](#image-tags)
- [Tilgjengelighet: Standardoppsettet med SQLite støtter bare én replika](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-feil i Docker](#gemini-regional-errors-inside-docker)
- [Viktige merknader](#important-notes)

---

## Hurtigkjøring

> **Selvhosting med én kommando?** Se
> [veiledningen for selvhosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publisert image +
> Redis, kun loopback, uten profilvalg). Hurtigkjøringen nedenfor er
> alternativet med én container for brukere som allerede kjører Redis et annet sted.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Med miljøfil

```bash
# Kopier og rediger .env først
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
# Grunnprofil (ingen CLI-verktøy)
docker compose --profile base up -d

# CLI-profil (Claude Code, Codex og OpenClaw innebygd)
docker compose --profile cli up -d

# Vertsprofil (primært for Linux; monterer vertens CLI-binærfiler skrivebeskyttet)
docker compose --profile host up -d

# Nettprofil (Chromium/Playwright for nettøktleverandører)
docker compose --profile web up -d

# Kombiner CLI + CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Tilgjengelige profiler

OmniRoute leveres med Compose-profiler for de vanligste distribusjonsoppsettene. Velg den som passer miljøet ditt.

| Profil            | Tjeneste         | Når den bør brukes                                                                                                                                    | Kommando                                     |
| ----------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standard) | `omniroute-base` | Hodeløs server / minimal kjøretid, uten medfølgende CLI-er for leverandører                                                                           | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentbaserte arbeidsflyter som kaller `omniroute providers/setup/doctor`, og medfølgende CLI-er (Codex, Claude Code, Droid, OpenClaw)                 | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-verter som ønsker `network_mode`-lignende tilgang til vertens CLI-er ved å montere `~/.local/bin`, `~/.codex`, `~/.claude` osv. skrivebeskyttet | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Kjør [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) som sidecar på port `8317` for CLI-proxying oppstrøms                                | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Nettøktleverandører som krever en nettleser: `gemini-web`, `claude-web`, `claude-turnstile` (bygger `runner-web`, Chromium inkludert)                 | `docker compose --profile web up -d`         |

> Flere profiler kan kombineres: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurere CLI-verktøy på verten når OmniRoute kjører i Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` og kontrollpanelets
**Lagre konfigurasjon**-knapp skriver alle filer som `~/.codex/*.config.toml`. Disse banene
har bare betydning på maskinen der CLI-en faktisk kjører. Hvis du kjører dem inne i
beholderen, havner filene i beholderens egen hjemmekatalog (`/home/node` —
avbildningen kjører med `USER node`), der ingen CLI på verten noen gang vil lese dem, og der de
forkastes i det øyeblikket beholderen opprettes på nytt.

OmniRoute oppdager dette og nekter å skrive, samtidig som det gir instruksjoner, i stedet for å
rapportere en vellykket handling du ikke kan bruke: CLI-en avsluttes med `2`, og API-et svarer `422`
med `containerEphemeralTarget: true`.

### Anbefalt: Kjør CLI-en på verten og OmniRoute i Docker

Beholderen tilbyr API-et, mens CLI-en konfigurerer verktøyene på verten.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # pek CLI-en mot beholderen
omniroute setup-codex                      # skriver til den faktiske ~/.codex på verten
```

Dette er det riktige valget når Codex, Claude Code, Cursor eller lignende kjører på
den bærbare datamaskinen din — som er det vanlige oppsettet.

### Alternativ: Bind-monter vertens konfigurasjonskataloger (`host`-profilen)

Hvis du vil at beholderen selv skal skrive vertens konfigurasjon, monterer du
katalogene og peker `CLI_CONFIG_HOME` mot monteringsroten. `host`-profilen
gjør allerede dette:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

En bind-montering gjør banen pålitelig: OmniRoute leser
`/proc/self/mountinfo` og tillater skriving til monterte baner (og til kataloger
der underkatalogene er monteringspunkter, som er nøyaktig strukturen til `/host-home` ovenfor), samtidig som
skriving til umonterte baner fortsatt avvises.

### Nødutgang: Konfigurer beholderens egne CLI-er (brukes med varsomhet)

Når CLI-ene faktisk befinner seg inne i beholderen (`cli`-profilen), er skrivingen
tilsiktet. Send `--allow-container-write` til en hvilken som helst `setup-*`-kommando, eller angi
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` for serveren. Skrivingen utføres
med en advarsel om at den ikke vil overleve beholderen.

> **Sikkerhetsadvarsel — `cli`-profilen + montering av `docker.sock`.**
> `cli`-profilen bind-monterer `/var/run/docker.sock`, slik at den automatiske
> oppdateringsfunksjonen inne i beholderen kan opprette stakken på nytt via vertsdaemonen
> (`src/lib/system/autoUpdate.ts` ser etter denne socketen og hopper over
> Docker-banen når den ikke finnes). Denne socketen er **en tillitsgrense mot root på
> verten**: Alt som kan nå den, styrer vertens Docker-daemon som
> root — det kan opprette, inspisere, stoppe og fjerne enhver beholder på verten.
> Konsekvenser:
>
> 1. **Eksponer aldri porten til `cli`-profilen mot nettverket.** Publiser
>    den på `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — en `cli`-profil som kan nås fra lokalnettet, gjør enhver RCE på kontrollpanelnivå til
>    full kompromittering av verten.
> 2. **Ikke bind-monter flere vertskataloger i `cli`-profilen.**
>    Docker-socketen kombinert med enhver ytterligere montering gir beholderen full
>    lese-/skrivetilgang til filsystemet og vertskonfigurasjonen. Hvis et verktøy må
>    ha tilgang til et prosjekt, kjører du det lokalt med CLI-binærfilen — ikke monter prosjektet
>    i `cli`-beholderen.
>
> Hvis du ikke trenger automatisk oppdatering inne i beholderen, lar du `cli`-profilen være deaktivert
> (`COMPOSE_PROFILES=core,redis` eller kortere). De andre profilene
> monterer ikke Docker-socketen.
>
> Se `docs/security/MITM-TPROXY-DECRYPT.md` (git; ikke kompilert inn i `/docs`) for den relaterte trusselmodellen
> rundt MITM, og `docs/security/SUPPLY_CHAIN.md` for
> provenienskjeden til binærfilene `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidevogn

OmniRoute bruker Redis som grunnlag for den distribuerte hastighetsbegrenseren og den delte hurtigbufferen. Tjenesten `redis` er **alltid definert** i `docker-compose.yml` (den har ingen profilbetingelse) og starter sammen med alle andre profiler.

| Detalj                     | Verdi                                       |
| -------------------------- | ------------------------------------------- |
| Avbildning                 | `redis:7-alpine`                            |
| Beholdernavn               | `omniroute-redis`                           |
| Intern port                | `6379`                                      |
| Vertsport (overstyring)    | `REDIS_PORT` (standard er `6379`)           |
| Vertsbinding (overstyring) | `REDIS_BIND_HOST` (standard er `127.0.0.1`) |
| Volum                      | `omniroute-redis-data` → `/data`            |
| Helsesjekk                 | `redis-cli ping` (10 s intervall)           |

Relaterte miljøvariabler:

- `REDIS_URL` — tilkoblingsstreng som injiseres i appen (`redis://redis:6379` som standard).
- `REDIS_PORT` — porttilordning på vertssiden for Redis-beholderen.
- `REDIS_BIND_HOST` — vertsgrensesnittet som porten publiseres på. Standard er `127.0.0.1`.

> **Hvorfor loopback brukes som standard:** Sidevognen kjører uten `requirepass`, og
> appbeholderne når den via Compose-nettverket (`redis:6379`) — den publiserte porten er
> bare tilgjengelig for verktøy på vertssiden (`redis-cli`, en lokal `npm run dev`). Publisering på
> `0.0.0.0` vil eksponere en uautentisert Redis for alle verter på lokalnettverket. Hvis du angir
> `REDIS_BIND_HOST=0.0.0.0`, må du også legge til `--requirepass` i tjenestens `command:`.

**Deaktivering av Redis** anbefales ikke (hastighetsbegrenseren vil gå over til en reserveimplementasjon i minnet). Hvis du likevel må gjøre det, kan du enten fjerne/kommentere ut tjenesteblokken `redis:` i `docker-compose.yml` eller skalere den ned til null:

```bash
docker compose up -d --scale redis=0
```

## Compose for produksjon

Bruk `docker-compose.prod.yml` for et isolert produksjonsøyeblikksbilde som kjører parallelt med utviklingsmiljøet.

| Detalj                         | Verdi                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| Fil                            | `docker-compose.prod.yml`                                                            |
| Standardport for kontrollpanel | `PROD_DASHBOARD_PORT=20130` (tilordnet intern `${DASHBOARD_PORT:-20128}`)            |
| Standardport for API           | `PROD_API_PORT=20131`                                                                |
| Avbildning                     | `omniroute:prod` (bygget fra målet `runner-cli`)                                     |
| Redis-beholder                 | `omniroute-redis-prod` (`redis:8.6.2`, eget volum `redis-prod-data`)                 |
| Datavolum                      | `omniroute-prod-data` (navngitt, beholdes mellom ombygginger)                        |
| Helsesjekker                   | `node healthcheck.mjs` + `redis-cli ping`, med `depends_on` betinget av Redis-helsen |

Slik bruker du det:

```bash
# Bygg og start produksjonsstakken
docker compose -f docker-compose.prod.yml up -d --build

# Strøm logger
docker compose -f docker-compose.prod.yml logs -f

# Stopp stakken (behold volumene)
docker compose -f docker-compose.prod.yml down
```

Produksjonsstakken kjører parallelt med Compose-miljøet for utvikling (med forskjellige beholdernavn, porter og volumer), slik at du kan fortsette å utvikle lokalt mens produksjonsmiljøet forblir oppe.

## Dockerfile-stadier

Repositoriet leveres med en flertrinns-Dockerfile (`Dockerfile`). Fire stadier er tilgjengelige; velg riktig `target` for ditt bruksområde.

| Stadium       | Basisbilde            | Formål                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Installerer avhengigheter (`npm ci --legacy-peer-deps`) og kjører `npm run build` (Turbopack som standard — se Byggeressurser nedenfor)                                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Produksjonsmiljø med det frittstående resultatet fra Next.js. **Ingen CLI-er for leverandører er inkludert.**                                                                                                                                                                                                      |
| `runner-cli`  | `runner-base`         | Legger til `git`, `docker.io`, `docker-compose` og globale CLI-er: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Velg dette for agentbaserte arbeidsflyter.**                                                                                                                               |
| `runner-web`  | `runner-base`         | Legger til Playwright + en Chromium-nettleser (`--with-deps`) for leverandører av nettøkter: `gemini-web`, `claude-web`, `claude-turnstile`. **Velg dette når du bruker disse leverandørene** — det vanlige bildet feiler ved forespørselstidspunktet uten dette (se merknaden om `-web` under Utgivelseskanaler). |

Bygg et bestemt mål manuelt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Byggeressurser

Tre byggeargumenter styrer ressursbruken til `builder`-stadiet. De gjelder bare under bygging —
`OMNIROUTE_MEMORY_MB` (nedenfor) er en separat innstilling for kjøretid.

| Byggeargument               | Standard | Effekt                                                                                   |
| --------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` bygger med webpack: lavere maksimal minnebruk, men tregere. `1` aktiverer Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Øvre grense for V8-heapen (`--max-old-space-size`) for den startede `next build`.        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Angir `CIRCLE_NODE_TOTAL`; Next utleder `workers = N - 1` for innsamling av sidedata.    |

`OMNIROUTE_BUILD_WORKERS` er innstillingen som bør økes på en kraftig byggemaskin, og den
som bør mistenkes når en ressursbegrenset bygging dør **etter** `✓ Compiled successfully`. Hver
arbeider for sidedata er en egen prosess, og det samme gjelder den overordnede `next build`-prosessen;
en reproduksjon på en aktiv VPS (problem #7518) målte maksimal RSS for hver prosess til
~4,5 GB uavhengig av heap-flagget i `NODE_OPTIONS` (Turbopack kompilerer i
internt/Rust-minne utenfor V8-heapen). Standardverdien `2` (→ 1 arbeider, totalt 2
prosesser) er tilpasset GitHub-driftede kjørere med 16 GB / 4 vCPU-er som
publiseringspipelinen bruker. Med `8` (→ 7 arbeidere) gikk kjøreren tom for minne, og
buildkit feilet trinnet med `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 arbeidere) fikk fortsatt ikke plass da RSS per prosess ble målt
direkte i stedet for utledet. `tests/unit/docker-build-memory-budget.test.ts`
utfører beregningen mot den målte verdien og feiler hvis en av innstillingene
vokser utover kapasiteten til kjøreren.

Turbopack kompilerer i internt Rust-minne som ligger **utenfor** V8-heapen, så
`OMNIROUTE_BUILD_MEMORY_MB` begrenser det ikke. På en vert med en minnegrense blir
byggeprosessen da SIGKILLet av OOM-killeren uten noen feilmelding — den stopper ganske enkelt
midt i `Creating an optimized production build`, noe som ser ut som om prosessen har hengt seg,
i stedet for at den har gått tom for minne. Derfor bruker `Dockerfile` webpack som standard
(`OMNIROUTE_USE_TURBOPACK=0`), i motsetning til `npm run dev` / `npm run build`, der
Turbopack er standarden i koden: en enkel `docker build .` uten byggeargumenter (slik
Railway og andre ettklikksverter kjører) må ikke dø i stillhet på en
minnebegrenset byggemaskin. De publiserte bildene angir allerede `OMNIROUTE_USE_TURBOPACK=0`
eksplisitt i `docker-publish.yml`. På en byggemaskin med rikelig RAM kan du aktivere
Turbopack for en raskere byggeprosess:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` er aktivert, så `next build` kjører en overordnet prosess **og** en arbeiderprosess,
og hver av dem følger `OMNIROUTE_BUILD_MEMORY_MB` separat. Sett containergrensen
til omtrent det dobbelte av denne verdien, ikke én gang verdien.

Målt i dette treet (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakkeverktøy | Containergrense | Resultat                            |
| ------------ | --------------- | ----------------------------------- |
| Turbopack    | 8 GiB / 16 GiB  | OOM-drept ved begge, uten melding   |
| webpack      | 8 GiB           | byggearbeideren ble SIGKILLet       |
| webpack      | 12 GiB          | fullført, nådde en topp på 11,1 GiB |

### Standardverdier for kjøretid

Standardverdier eksportert av `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Minneatferd i Docker:

- Avbildningen setter `OMNIROUTE_MEMORY_MB=1024` og utleder `NODE_OPTIONS=--max-old-space-size=1024` fra denne.
- Den faktiske serverprosessen startes av den frittstående oppstarteren, som leser `OMNIROUTE_MEMORY_MB` og legger til `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node bruker den siste gjentatte `--max-old-space-size`-verdien, så `OMNIROUTE_MEMORY_MB` styrer den effektive heap-grensen i Docker.
- Fordi avbildningen alltid setter den, brukes aldri oppstarterens eget RAM-kalibrerte reservevalg under Docker. Øk den eksplisitt for arbeidsbelastningen (tabellen nedenfor). `2048` er fortsatt for lite for `/v1/responses` fra kodeagenter.

### Kjøretids-RAM for kodeagenter

Docker-standarden på 1 GiB er et minimum for kontrollpanelet og enkel chat, ikke en størrelse for produksjon. Lange `POST /v1/responses`-forespørselskropper (hundrevis av meldinger, titalls verktøy) beholder flere grafer i minnet under komprimering. To overlappende forespørsler på ~3 MiB / ~750k tokener har avbrutt V8 med **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) og også utløst cgroup-OOM ved 16 GiB. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensjoner **cgroup `--memory` høyere enn heap-størrelsen** — native buffere, SQLite og mellomresultater fra komprimering ligger utenfor V8.

| Arbeidsbelastning                          | `OMNIROUTE_MEMORY_MB`        | Container / cgroup   | Merknader                                                                                                                  |
| ------------------------------------------ | ---------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Kontrollpanel, én enkel chat               | `1024` (avbildningsstandard) | ≥2 GiB               |                                                                                                                            |
| Én kodeagent (Claude/Codex/Grok)           | `8192`                       | ≥10 GiB              | Typisk `/v1/responses` med én økt                                                                                          |
| To samtidige lange `/v1/responses`         | `10240`–`12288`              | ≥12–16 GiB           | Målt V8-avbrudd ved ~12 GiB heap                                                                                           |
| Tre eller flere samtidige lange kontekster | ikke i én prosess            | serialiser / mer RAM | Standardgrensen for tung belastning er 1 pågående forespørsel; å øke den uten mer RAM fører til at avbruddet oppstår igjen |

`omniroute serve` på fysisk maskinvare kalibrerer til ~35 % av RAM (begrenset til `[512, 4096]`) når `OMNIROUTE_MEMORY_MB` **ikke er angitt**. Docker setter alltid `1024`, så denne kalibreringen kjøres aldri i den offisielle avbildningen.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiske miljøvariabler

I tillegg til standardverdiene som er dokumentert i [ENVIRONMENT.md](../reference/ENVIRONMENT.md), er følgende variabler viktigst ved kjøring under Docker:

| Variabel                      | Formål                                                                                                                                                                                                                                                                                  | Standardverdi           |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Delt hemmelighet for WebSocket-broen. **Påkrevd i produksjon** — angi en sterk, tilfeldig streng.                                                                                                                                                                                       | ikke angitt (må oppgis) |
| `REDIS_URL`                   | Tilkoblingsstreng for backend-tjenesten for hastighetsbegrensning / hurtigbuffer                                                                                                                                                                                                        | `redis://redis:6379`    |
| `REDIS_PORT`                  | Vertsport for den medfølgende Redis-containeren                                                                                                                                                                                                                                         | `6379`                  |
| `REDIS_BIND_HOST`             | Vertsgrensesnittet som den medfølgende Redis-porten publiseres på (tilbakekoblingsgrensesnitt med mindre du legger til AUTH)                                                                                                                                                            | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Vertsbane som monteres i `cli`-profilen på `/workspace/omniroute` for arbeidsflyter med selvoppdatering                                                                                                                                                                                 | `.` (gjeldende katalog) |
| `OMNIROUTE_MEMORY_MB`         | Øvre grense for Node-heapen under kjøring for den frittstående Docker-serveren; overstyrer standardverdien for avbildningen ovenfor. Kodeagenter: `8192`+ (se [RAM under kjøring](#runtime-ram-for-coding-agents)).                                                                     | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | Overstyr eksponerte porter for kontrollpanelet (20128) og API-et (20129)                                                                                                                                                                                                                | `20128` / `20129`       |
| `APP_BIND_HOST`               | Vertsgrensesnittet som docker-compose publiserer portene for kontrollpanelet/API-et/direkte-WS på. Med `REQUIRE_API_KEY=false` (standardverdien) eksponerer `0.0.0.0` den anonyme `/v1`-proxyen til lokalnettverket — utvid bare med `REQUIRE_API_KEY=true` eller en reversproxy foran. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | Vertsgrensesnittet som docker-compose publiserer `cliproxyapi`-sidevognen på — datavolumet inneholder leverandørlegitimasjon.                                                                                                                                                           | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | Katalogen som programtilleggs-skanneren under kjøring leser fra og installerer i. Angi den når programtillegg bind-monteres: Standardverdien følger `HOME`, som en avbildning ikke nødvendigvis eksporterer.                                                                            | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | URL-underbane når appen publiseres bak en reversproxy (f.eks. `/omniroute`)                                                                                                                                                                                                             | _(tom = rot)_           |
| `NEXT_PUBLIC_BASE_URL`        | Offentlig nettleseropprinnelse inkludert underbanen (f.eks. `https://host/omniroute`)                                                                                                                                                                                                   | ikke angitt             |
| `PROD_DASHBOARD_PORT`         | Vertsport for kontrollpanelet for `docker-compose.prod.yml`                                                                                                                                                                                                                             | `20130`                 |
| `CLIPROXYAPI_PORT`            | Vertsport for `cliproxyapi`-sidevognen                                                                                                                                                                                                                                                  | `8317`                  |

## Omvendt proxy på en underbane (Traefik / nginx)

Next.js `basePath` kompileres inn i den frittstående pakken. OmniRoute registrerer den innebygde
verdien i en markørfil i appens rotkatalog (skrevet under `npm run build`; lest av
`scripts/docker/ensure-docker-base-path.mjs`) og sammenligner den med
`OMNIROUTE_BASE_PATH` når containeren starter. Når de er forskjellige og avbildningen ble
bygget for domenets rot, skriver startpunktet om de frittstående manifestene, de
innebygde `basePath`/`assetPrefix`-literalene (Next 16 gjengir SSR-ressurs-URL-er kun fra
`assetPrefix` — oppdateringsverktøyet speiler underbanen til den), de innebygde
`/_next/static`-ressurs-URL-ene (klientreferansemanifest, medieimporter, forhåndsgjengitte
feilsider) og klientens `process.env`-shim før `node dev/run-standalone.mjs`
kjøres.

### Bygging med Compose (anbefalt)

Angi begge variablene i `.env`, og bygg deretter på nytt slik at avbildningen og kjøremiljøet samsvarer:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` videresender `OMNIROUTE_BASE_PATH` som et Docker-byggargument og som en
miljøvariabel i kjøremiljøet.

### Forhåndsbygd rotavbildning + underbane ved kjøring

Publiserte `diegosouzapw/omniroute:*`-avbildninger er bygget for domenets rot. Du kan fortsatt
angi `OMNIROUTE_BASE_PATH` ved kjøring; containeren oppdaterer pakken én gang ved oppstart.
Kombiner den med det samsvarende offentlige opphavet:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurer den omvendte proxyen til å videresende den **fullstendige** eksterne banen (ikke fjern
prefikset). Traefik skal rute `PathPrefix(`/omniroute`)` til containeren uten
`StripPrefix`, slik at Next.js mottar `/omniroute/...` og leverer ressurser fra
`/omniroute/_next/...`.

Docker-helsesjekken sonderer det lettvektige livssyklusendepunktet `/healthz`, med prefiks
fra den aktive `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` er fortsatt tilgjengelig for
diagnostikk utført av mennesker eller kontrollpaneler. Hvis du vil rette containerens HEALTHCHECK
tilbake mot det (for eksempel for grundig helsehåndheving), angir du
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Denne banen er en **grundig** sjekk (database + overvåkingssammendrag) — egnet for Dockers
sjeldne `HEALTHCHECK` hvis du velger å aktivere den igjen, men **ikke** for intervallene til
Kubernetes `livenessProbe`.

For orkestreringsplattformer (Kubernetes, Nomad osv.):

| Sonde               | Foretrekk                                                              | Unngå                                                          |
| ------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| Livstegn            | HTTP `GET /livez`, eller TCP på hovedporten (`PORT`, standard `20128`) | `/api/monitoring/health` som livstegnssjekk                    |
| Beredskap           | HTTP `GET /healthz`                                                    | Korte tidsavbrudd som tolker en opptatt hendelsesløkke som død |
| Grundig / svartboks | `/api/monitoring/health`                                               | —                                                              |

`/healthz` rapporterer prosessens livssyklus (`ok` / `starting` / `stopping`). `/livez` er
kun en kontroll av om prosessen lever (200 når behandleren kan kjøre; den venter ikke på
beredskap). Begge kjører fortsatt på den samme Node-hendelsesløkken som forespørselsbehandlingen, så
CPU-bundet katalog- eller komprimeringsarbeid kan forsinke dem — opptatt ≠ død. Foretrekk TCP-
livstegnssjekk hvis HTTP-sonder får tidsavbrudd. Fullstendig veiledning for sonder:
[Overvåkingsveiledning — anbefalinger for Kubernetes-sonder](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose med Caddy (automatisk TLS for HTTPS)

OmniRoute kan eksponeres på en sikker måte ved hjelp av Caddys automatiske SSL-klargjøring. Kontroller at domenets DNS A-oppføring peker til serverens IP-adresse.

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
      # Nettleservendt opphav for OAuth-tilbakekall, kontrollpanellenker og genererte offentlige URL-er.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Intern server-til-server-URL for planlagte jobber / forespørsler til egen tjeneste.
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

Caddy angir standard videresendingshoder for oppstrømsbeholderen. OmniRoute bruker
`NEXT_PUBLIC_BASE_URL` som det kanoniske offentlige opphavet for OAuth-tilbakekall og genererte offentlige
lenker. Autentiserte skriveoperasjoner i kontrollpanelet bruker forespørsler med samme opphav samt øktbundet CSRF-
beskyttelse. Aktiver bare `OMNIROUTE_TRUST_PROXY` for avanserte distribusjoner der du med hensikt
vil at OmniRoute skal utlede det offentlige opphavet fra klarerte videresendingshoder i stedet for eksplisitt
konfigurasjon.

## Cloudflare Quick Tunnel

Kontrollpanelstøtte for Docker-distribusjoner inkluderer en ettklikks **Cloudflare Quick Tunnel** under `Dashboard → Endpoints`. Første aktivering laster bare ned `cloudflared` når det er nødvendig, starter en midlertidig tunnel til det gjeldende `/v1`-endepunktet og viser den genererte `https://*.trycloudflare.com/v1`-URL-en rett under den vanlige offentlige URL-en.

Tunnelpaneler for endepunkter (Cloudflare, Tailscale, ngrok) kan vises eller skjules fra `Settings → Appearance` uten å endre tilstanden til aktive tunneler.

### Merknader om tunneler

- Quick Tunnel-URL-er er midlertidige og endres etter hver omstart.
- Quick Tunnels gjenopprettes ikke automatisk etter omstart av OmniRoute eller beholderen. Aktiver dem på nytt fra kontrollpanelet ved behov.
- Administrert installasjon støtter for øyeblikket Linux, macOS og Windows på `x64` / `arm64`.
- Administrerte Quick Tunnels bruker HTTP/2-transport som standard for å unngå støyende advarsler om QUIC UDP-buffere i begrensede beholdermiljøer. Angi `CLOUDFLARED_PROTOCOL=quic` eller `auto` hvis du ønsker en annen transport.
- Docker-avbildninger inkluderer systemets CA-røtter og sender dem videre til administrert `cloudflared`, noe som unngår TLS-klareringsfeil når tunnelen klargjøres inne i beholderen.
- Angi `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` hvis du vil at OmniRoute skal bruke en eksisterende binærfil i stedet for å laste ned en.

## Avbildningstagger

| Avbildning               | Tagg     | Størrelse | Beskrivelse                                             |
| ------------------------ | -------- | --------- | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | Høyeste **publiserte** stabile SemVer (ikke git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB    | Fest denne taggtypen for GitOps                         |

Flerplattformmanifest: opprinnelig `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker velger automatisk riktig arkitektur. Bruk `--platform linux/amd64` hvis du må tvinge AMD64-emulering på ARM-verter.

### Utgivelseskanaler

OmniRoute publiserer separate Docker-kanaler for stabile utgivelser, aktiv testing av utgivelsesgrener og utviklingsbygg.

| Kanal                           | Kilde                                 | Endringsmulighet               | Anbefalt bruk                                                                                                               |
| ------------------------------- | ------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signert/versjonert utgivelse          | Uforanderlig                   | Produksjonsdistribusjoner som er festet til en nøyaktig utgivelse                                                           |
| `:latest` / `:latest-web`       | Høyeste **publiserte** stabile SemVer | Foranderlig stabil peker       | Følger stabile utgivelser **etter** en SemVer-publiseringsjobb — følger **ikke** `main` eller uutgitte `release/v*`-commits |
| `:next` / `:next-web`           | Gjeldende standardgren `release/v*`   | Foranderlig førutgivelsespeker | Testing av rettelser som er landet på den aktive utgivelsesgrenen, men som ennå ikke er med i en stabil utgivelse           |
| `:main` / `:main-web`           | `main`-grenen                         | Foranderlig utviklingspeker    | Kun utviklings- og integrasjonstesting                                                                                      |

#### Nettøktleverandører: `-web`-avbildningene

Hver kanal ovenfor finnes også som en `-web`-tagg (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), bygget fra `runner-web`-stadiet — den samme avbildningen pluss Playwright og en Chromium-nettleser. Den vanlige avbildningen leveres **uten** Chromium. `gemini-web`, `claude-web` og `claude-turnstile` trenger den.

Feilen utsettes og oppstår ikke ved oppstart: Disse leverandørene viser modellene sine og fremstår som tilkoblet i kontrollpanelet, og først den første forespørselen mislykkes med

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Hvis du bruker disse leverandørene, henter du `-web`-taggen for kanalen du allerede bruker — ingenting annet endres. Ved en npm/CLI-installasjon (uten Docker-avbildning) er den tilsvarende manglende komponenten nettleserens binærfil: Kjør `npx playwright install chromium` på verten.

#### Bruk av førutgivelseskanalen

`next`-kanalen bygges på nytt ved hver push til den gjeldende standardgrenen `release/v*` og publiseres for både AMD64 og ARM64. Eldre vedlikeholdsgrener kan ikke overskrive den. Kanalen tilbyr et nedlastbart image med rettelser som er slått sammen i den aktive utgivelsesgrenen før neste stabile tagg opprettes.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose overstyrer du image-taggen som brukes av den valgte profilen, og laster deretter ned og oppretter tjenesten på nytt:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sikkerhet og tilbakerulling

`next` er en flytende forhåndsutgivelseskanal. Den kan endres ved enhver push til den aktive utgivelsesgrenen og er **ikke støttet for bruk i produksjon**. Fest image-digesten mens du evaluerer en bestemt build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Før testing må du sikkerhetskopiere OmniRoute-datavolumet eller den bind-monterte datakatalogen. For å rulle tilbake gjenoppretter du den tidligere brukte stabile versjonen eller digesten og oppretter containeren på nytt:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

En build fra en utgivelsesgren kan aldri flytte `latest`; bare en kvalifisert stabil semantisk versjon kan oppdatere pekeren til den stabile versjonen. `next`-imagene beholder inspeksjonen av utgivelsesimaget og sperren for KRITISKE sårbarheter.

**`latest` er ingen garanti for at git-versjonen er oppdatert.** Sammenslåtte rettelser på `main` eller den aktive `release/v*`-grenen er **ikke** inkludert i `:latest` før et stabilt SemVer-image er publisert og publiseringsjobben oppdaterer `:latest` (samme digest som den aktuelle SemVer-versjonen). Hvis `latest` ser ut til å stå stille mens GitHub allerede viser rettelsen, kan du hente `:next` for å teste utgivelsesgrenen eller vente på SemVer-taggen.

| Du ønsker                                                                     | Bruk                                 |
| ----------------------------------------------------------------------------- | ------------------------------------ |
| GitOps / produksjon som ikke må endres utilsiktet                             | Fest `:X.Y.Z` (eller image-digesten) |
| Følge publiserte stabile versjoner og godta ny opprettelse ved hver utgivelse | `:latest`                            |
| Teste upubliserte commits i `release/v*`                                      | `:next` (ikke for produksjon)        |
| Teste `main`                                                                  | `:main` (ikke for produksjon)        |

## Tilgjengelighet: Standard SQLite har én replika

Standard Docker-/Kubernetes-oppsett for OmniRoute består av **én Node-prosess + én SQLite-skriver**. Høy tilgjengelighet er **ikke støttet** med denne topologien.

| Begrensning                                    | Konsekvens                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Én skriver                                     | Kjør **ikke** flere replikaer mot den samme SQLite-filen. Det ødelegger databasen.                                                                                                                                                                                                                                                            |
| Gjenskaping / omstart / HEALTHCHECK-avslutning | **Fullstendig avbrudd** for aktive SSE-tilkoblinger, kontrollpaneløkter og tilstand i minnet. Alle tilkoblede klienter kobles fra. Nye forespørsler mens ingen endepunkter er tilgjengelige, får **`502 Bad Gateway: Unknown error`** fra omvendt proxy, ikke OmniRoute-JSON — klienter kan ikke skille dette fra en leverandørfeil (#11015). |
| Samme hendelsesløkke som `/healthz`            | En travel katalog- eller komprimeringsjobb kan forsinke sonder; et kort tidsavbrudd starter da den **eneste** replikaen på nytt.                                                                                                                                                                                                              |

**Sondematrise** (se også [anbefalinger for Kubernetes-sonder](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonde               | Mål                                                         | Ikke bruk                                                     |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| Livstegn            | TCP på `PORT` (standard `20128`), eller myk HTTP `/healthz` | `/api/monitoring/health`                                      |
| Beredskap           | HTTP `GET /healthz`                                         | Korte tidsavbrudd som tolker en travel hendelsesløkke som død |
| Grundig / mennesker | `/api/monitoring/health`                                    | Automatisert kubelet-livstegnssonde                           |

**Oppgraderinger:** Forvent at alle økter blir brutt. Tøm klienttrafikken hvis du kan; rullerende oppdatering er ikke mulig med standard SQLite. Compose `restart: unless-stopped` kombinert med Docker `HEALTHCHECK` vil også erstatte den eneste prosessen når beholderen er Unhealthy — med samme konsekvensomfang.

Kubernetes-utdrag for **én replika** (Recreate er påkrevd; ikke øk `replicas` mot én SQLite-fil):

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

Ventetiden i `preStop` lar kube fjerne Service-endepunkter før SIGTERM, slik at **ny** trafikk ikke lenger sendes til prosessen som avsluttes. Aktive `/v1/responses`-SSE-er får opptil `SHUTDOWN_TIMEOUT_MS` (standard 30 s) til å fullføres via tungvekts tilgangsleier (#11015). Nye forespørsler som fortsatt når prosessen, får `503` + `Retry-After: 5`. Recreate-perioden uten endepunkter frem til erstatningen er Ready, forblir et fullstendig avbrudd — det skyldes SQLite-topologien, ikke feilkonfigurerte sonder.

Ekstern Postgres / HA med flere skrivere er **ikke** en dokumentert standardløsning. Hvis du trenger HA, bør du beholde én replika eller kjøre en topologi som prosjektet har testet og dokumentert separat. Arbeidet med Postgres/MySQL finnes i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Frem til dette lanseres, er den eneste støttede måten å mangedoble kapasiteten for **store** `/v1/responses` på å bruke N uavhengige prosesser (neste avsnitt), ikke `replicas > 1` på ett volum.

## Horisontal skalering: N uavhengige prosesser

Én Node-prosess er **én V8-heap**. To overlappende kodeagentkall på ~3 MiB / ~750k tokens med `POST /v1/responses` (RTK + Caveman) avbryter denne heapen ved ~12 Gi (`FATAL ERROR: Reached heap limit`) og kan føre til OOM i en cgroup på 16 Gi. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Denne målingen er en advarsel om **minnebudsjettet**, ikke en absolutt produktgrense på to samtidige, langvarige `/v1/responses`. Tilgang for ressurskrevende chat styres av et automatisk utledet bytebudsjett for innkommende forespørsler (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensjonert ut fra den samme V8-/cgroup-grensen — å overstyre det oppover (eller angi den eldre antallsgrensen `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` for forespørsler) i en allerede dimensjonert prosess gjeninnfører avbruddet. Små chatter, `/healthz`, `/v1/models` og MCP er **ikke** omfattet av denne grensen.

### Én prosess: mer enn to langvarige `/v1/responses`

En **frisk** prosess (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standardverdi `0.75`) **kan** kjøre mer enn to samtidige, langvarige `POST /v1/responses` når det fortsatt er plass i det prosessomfattende bytebudsjettet for pågående forespørsler (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Forespørselskropper på eller over `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standardverdi 256 KiB) bruker den samme ressurskrevende leien som strukturintensive forespørsler og den samme [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom`-unntaksmekanismen (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Flere titalls samtidige, langvarige SSE-klienter (operatører trenger ofte 40–50) er et spørsmål om **minnebudsjett** — dimensjoner heap + primær-/headroom-plasser + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ikke en absolutt produktgrense på «maks. 2». En belastet heap avviser fortsatt forespørsler med en `503` som kan prøves på nytt, slik at #7849 ikke kommer tilbake.

Slik **multipliserer du heaper** (uavhengige gamle V8-minneområder) **i dag**:

| Gjør                                                                                                                                                                                                                   | Ikke gjør dette                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Kjør **N containere/poder**, hver med sin **egen** `DATA_DIR` / sitt eget volum                                                                                                                                        | Angi `replicas > 1` mot én SQLite-fil                                    |
| Dimensjoner ressurskrevende pågående forespørsler + headroom ved god tilstand ut fra heap-/bytebudsjettet for pågående forespørsler; 1–2 er den konservative standardverdien fra #7849, ikke en absolutt produktgrense | Gi én prosess 8× RAM og en ubegrenset antallsgrense                      |
| Valgfritt: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for **delte kvotetellere**                                                                                                                             | Behandle Redis som delt SQLite — det er det ikke                         |
| Dupliser leverandørhemmeligheter til hver instans (eller godta oppdelte instrumentpaneler)                                                                                                                             | Forvent ett instrumentpanel / én felles anropslogg på tvers av instanser |
| Plasser en hvilken som helst lastbalanserer foran; affinitet etter API-nøkkel eller økt er tilstrekkelig                                                                                                               | Krev leverandørspesifikk mellomvare som tar hensyn til størrelse         |

Maskinvare: samtidige, langvarige `/v1/responses` per instans er et spørsmål om **minnebudsjett** (heap + bytebudsjett for pågående forespørsler / #10110). `N` uavhengige `DATA_DIR`-er multipliserer fortsatt antallet heaper: vertens RAM må dekke `N × cgroup`, ikke «én pod på 16 Gi med N=8». Bruk aldri `replicas > 1` mot én SQLite-fil.

Compose-skisse (to heaper, to volumer — ikke `deploy.replicas: 2`):

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

Tetthet i prosessen (komprimering utenfor HTTP-isolatet) dekkes av [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Én logisk klynge med delt, varig tilstand dekkes av [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionale Gemini-feil i Docker

Google AI Studio / Gemini API kan returnere HTTP 400 med FAILED_PRECONDITION og
`Brukerens plassering støttes ikke for bruk av API-et.` En vellykket forespørsel på verten
beviser ikke at containeren bruker samme utgående rute. DNS-rekkefølge,
IPv4/IPv6-tilkobling, VPN-ruting og konfigurerte proxyer kan være forskjellige. Kontroller
[Googles støttede regioner](https://ai.google.dev/gemini-api/docs/available-regions)
samt den faktiske tilkoblingsruten. Denne feilen alene betyr ikke at API-nøkkelen er ugyldig.

### Foretrekk en tilkoblingsspesifikk proxy

Bruk OmniRoutes [proxykonfigurasjon per tilkobling](../ops/PROXY_GUIDE.md#4-level-proxy-system)
for den berørte Gemini-tilkoblingen, og gjenta deretter **Test tilkobling** og en liten forespørsel
med samme modell. Dette begrenser rutingsendringen til den aktuelle tilkoblingen. Kontroller
at proxyen er tilgjengelig fra containeren, og at tilkoblingen faktisk velger
den. Endring av ruten garanterer ikke at oppstrømstjenesten godtar regionen.

### Sammenlign nettverket på verten og i containeren

Bruk samme nøkkel, modell og forespørsel når du sammenligner autentiserte resultater. Lim aldri
inn påloggingsinformasjon, proxypassord eller fullstendige autorisasjonshoder i en sak.
Undersøk først hvilke adressefamilier operativsystemets navneoppløser tilbyr, ved å bruke samme kommando
på verten og inne i containeren:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Erstatt `omniroute` med tjenesten du kjører (for eksempel `omniroute-web`). Disse
kommandoene skriver ut adressefamilier uten påloggingsinformasjon eller IP-adresser. En returnert `6`
viser bare et IPv6-DNS-resultat: det beviser **ikke** at det finnes en fungerende IPv6-rute eller API-tilgang.
Der `curl` er installert, sammenligner du `curl -4 -I https://generativelanguage.googleapis.com`
med `curl -6 -I https://generativelanguage.googleapis.com` i begge miljøene.
Et HTTP-svar beviser tilkobling for denne testen, selv om det er en uautentisert
feil. Bare den autentiserte modellforespørselen tester om Gemini er tilgjengelig.

### Alternativ på vertsnivå: fungerende IPv6 og policy for navneoppløsning

Innmelderen av [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) gjenopprettet
tilgangen i sitt miljø ved å aktivere IPv6 for containere og endre glibcs
adressevalg. Behandle dette som et miljøspesifikt alternativ. Bekreft at vertens
IPv6 fungerer, samt utgående trafikk/ruting for containeren og brannmurregler, før du justerer preferansene for navneoppløsning.
En privat ULA-adresse alene dokumenterer ikke offentlig IPv6-tilkobling.

For tjenester som allerede er koblet til Compose sitt standardnettverk, aktiverer dette fragmentet
IPv6 på nettverket. Behold resten av tjenestens porter, volumer og konfigurasjon:

```yaml
networks:
  default:
    enable_ipv6: true
```

For et navngitt nettverk aktiverer du det på nettverket tjenesten faktisk bruker. Docker kan
tildele et ULA-delnett. Velg bare et eksplisitt delnett uten overlapping når nettverket
krever det. Se [Docker-nettverk med IPv6](https://docs.docker.com/engine/daemon/ipv6/)
og [nettverksalternativer i Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

På et **glibc-basert image** kan `/etc/gai.conf` endre adressevalget. Dockerfilen i det nåværende
repositoriet bruker Debian. Tilpassede musl-baserte imager bruker ikke denne mekanismen.
Den rapporterte justeringen endrer ULA-etiketten fra `label fc00::/7 6` til
`label fc00::/7 1`. Ta utgangspunkt i imagets fullstendige policytabell, og bevar de andre
oppføringene. Hvis du legger til en `label`- eller `precedence`-oppføring, erstattes standardtabellen,
så en fil som bare inneholder den endrede linjen, er ikke tilstrekkelig.
[glibcs konfigurasjonsreferanse](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumenterer denne virkemåten. Bind-monter den gjennomgåtte filen skrivebeskyttet på `/etc/gai.conf`,
og opprett tjenesten på nytt for å ta den i bruk.

Dette endrer operativsystemets adressevalg for **all utgående trafikk i den containeren**.
Det tvinger ikke alle applikasjoner til å velge IPv6. Nodes DNS-rekkefølge og valg av
tilkobling har også betydning. Spesielt foretrekker `--dns-result-order=ipv4first` IPv4 og
er ikke en løsning på en feil som bare oppstår med IPv4. Se [DNS-rekkefølge i Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Test Gemini og de andre leverandørene dine på nytt etter enhver endring på vertsnivå. For å rulle tilbake
fjerner du den tilpassede `gai.conf`-monteringen, gjenoppretter den tidligere nettverkskonfigurasjonen og
oppretter den berørte tjenesten/det berørte nettverket på nytt i et vedlikeholdsvindu. Hvis et nettverk opprettes
på nytt, kan dette avbryte andre containere som er koblet til det. Ikke slett volumet med vedvarende data.

## Viktige merknader

- **SQLite WAL-modus:** `docker stop` bør få fullføre, slik at OmniRoute kan utføre et kontrollpunkt og skrive de nyeste endringene tilbake til `storage.sqlite`. De medfølgende Compose-filene har allerede en stopptidsfrist på 40 sekunder. Hvis du kjører avbildningen direkte, behold `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Sett til `true` hvis rutinemessige sikkerhetskopier og sikkerhetskopier før skriving håndteres eksternt. Migreringer av eksisterende databaser krever fortsatt et eget varig sikkerhetsøyeblikksbilde og beskyttelse mot massemigrering.
- **Datapersistens:** Monter alltid et volum på `/app/data` for å bevare databasen, nøklene og konfigurasjonene på tvers av omstarter av containeren.
- **Portkonfigurasjon:** Overstyr miljøvariabelen `PORT` for å endre standardporten `20128`.

## Se også

- [Veiledning for VM-distribusjon](../ops/VM_DEPLOYMENT_GUIDE.md) — Oppsett av VM + nginx + Cloudflare
- [Veiledning for Fly.io-distribusjon](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Distribuer til Fly.io
- [Miljøkonfigurasjon](../reference/ENVIRONMENT.md) — Fullstendig referanse for `.env`
