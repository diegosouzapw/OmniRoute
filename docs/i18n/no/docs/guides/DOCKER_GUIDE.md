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
- [Redis-sidevogn](#redis-sidecar)
- [Compose for produksjon](#production-compose)
- [Dockerfile-faser](#dockerfile-stages)
- [Kritiske miljøvariabler](#critical-environment-variables)
- [Docker Compose med Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Bildeetiketter](#image-tags)
- [Tilgjengelighet: Standarddatabasen SQLite støtter kun én replika](#availability-default-sqlite-is-single-replica)
- [Viktige merknader](#important-notes)

---

## Hurtigkjøring

> **Selvdrift med én kommando?** Se
> [veiledningen for selvdrift](../getting-started/SELF_HOST_GUIDE.md) —
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

# Kombiner CLI med CLIProxyAPI-sidevognen
docker compose --profile cli --profile cliproxyapi up -d
```

## Tilgjengelige profiler

OmniRoute leveres med fire Compose-profiler. Velg den som passer til miljøet ditt.

| Profil            | Tjeneste         | Når den bør brukes                                                                                                                                         | Kommando                                     |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standard) | `omniroute-base` | Hodeløs server / minimalt kjøremiljø uten medfølgende CLI-verktøy fra leverandører                                                                         | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentbaserte arbeidsflyter som kaller `omniroute providers/setup/doctor`, og medfølgende CLI-verktøy (Codex, Claude Code, Droid, OpenClaw)                 | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-verter som ønsker `network_mode`-lignende tilgang til vertens CLI-verktøy ved å montere `~/.local/bin`, `~/.codex`, `~/.claude` osv. skrivebeskyttet | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Kjør [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) som sidevogn på port `8317` for oppstrøms CLI-proxying                                    | `docker compose --profile cliproxyapi up -d` |

> Flere profiler kan kombineres: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurere CLI-verktøy på vertsmaskinen når OmniRoute kjører i Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` og knappen
**Lagre konfigurasjon** i kontrollpanelet skriver alle filer som `~/.codex/*.config.toml`. Disse banene
har bare betydning på maskinen der CLI-verktøyet faktisk kjører. Hvis du kjører dem inne i
containeren, blir filene skrevet til containerens egen hjemmekatalog (`/home/node` —
avbildningen kjører med `USER node`), der ingen CLI-verktøy på vertsmaskinen vil lese dem, og der de
forkastes i det øyeblikket containeren opprettes på nytt.

OmniRoute oppdager dette og avviser skrivingen med instruksjoner i stedet for å
rapportere en vellykket operasjon du ikke kan bruke: CLI-verktøyet avsluttes med `2`, og API-et svarer `422`
med `containerEphemeralTarget: true`.

### Anbefalt: Kjør CLI-verktøyet på vertsmaskinen og OmniRoute i Docker

Containeren leverer API-et, mens CLI-verktøyet konfigurerer verktøyene på vertsmaskinen.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # pek CLI-verktøyet mot containeren
omniroute setup-codex                      # skriver til den faktiske ~/.codex på vertsmaskinen
```

Dette er riktig valg når Codex, Claude Code, Cursor eller lignende kjører på den
bærbare datamaskinen din — som er det vanlige oppsettet.

### Alternativ: Bind-monter konfigurasjonskatalogene på vertsmaskinen (`host`-profilen)

Hvis du vil at selve containeren skal skrive konfigurasjonen på vertsmaskinen, monterer du
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

En bind-montering er det som gjør banen pålitelig: OmniRoute leser
`/proc/self/mountinfo` og tillater skriving til monterte baner (og til kataloger
der underkatalogene er monteringer, noe som er nøyaktig strukturen til `/host-home` ovenfor), samtidig som
skriving til umonterte baner fortsatt avvises.

### Nødløsning: Konfigurer containerens egne CLI-verktøy (bruk med forsiktighet)

Når CLI-verktøyene faktisk befinner seg inne i containeren (`cli`-profilen), er skrivingen
tilsiktet. Send `--allow-container-write` til en hvilken som helst `setup-*`-kommando, eller angi
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` for serveren. Skrivingen utføres
med en advarsel om at den ikke vil overleve containeren.

> **Sikkerhetsadvarsel — `cli`-profil + montering av `docker.sock`.**
> `cli`-profilen bind-monterer `/var/run/docker.sock` slik at den automatiske
> oppdateringsfunksjonen i containeren kan opprette stakken på nytt via vertsdemonen
> (`src/lib/system/autoUpdate.ts` ser etter denne socketen og hopper over
> Docker-flyten når den ikke finnes). Denne socketen er **en tillitsgrense mot
> root-tilgang på vertsmaskinen**: Alt som får tilgang til den, styrer Docker-demonen på vertsmaskinen som
> root — det kan opprette, inspisere, stoppe og fjerne enhver container på vertsmaskinen.
> Konsekvenser:
>
> 1. **Eksponer aldri porten til `cli`-profilen mot nettverket.** Publiser
>    den på `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — en `cli`-profil som er tilgjengelig fra lokalnettet, gjør enhver RCE på kontrollpanelnivå til
>    full kompromittering av vertsmaskinen.
> 2. **Ikke bind-monter flere kataloger fra vertsmaskinen i `cli`-profilen.**
>    Docker-socketen kombinert med enhver ytterligere montering gir containeren full
>    lese-/skrivetilgang til filsystemet og konfigurasjonen på vertsmaskinen. Hvis et verktøy trenger tilgang til
>    et prosjekt, kjører du det lokalt med CLI-binærfilen — ikke monter prosjektet
>    i `cli`-containeren.
>
> Hvis du ikke trenger automatisk oppdatering inne i containeren, lar du `cli`-profilen være deaktivert
> (`COMPOSE_PROFILES=core,redis` eller kortere). De andre profilene
> monterer ikke Docker-socketen.
>
> Se `docs/security/MITM-TPROXY-DECRYPT.md` (git; ikke kompilert inn i `/docs`) for den relaterte trusselmodellen
> rundt MITM, og `docs/security/SUPPLY_CHAIN.md` for
> provenienskjeden til binærfilene `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidecar

OmniRoute bruker Redis som grunnlag for den distribuerte hastighetsbegrenseren og den delte hurtigbufferen. `redis`-tjenesten er **alltid definert** i `docker-compose.yml` (den har ingen profilbegrensning) og starter sammen med alle andre profiler.

| Detalj                     | Verdi                                         |
| -------------------------- | --------------------------------------------- |
| Image                      | `redis:7-alpine`                              |
| Beholdernavn               | `omniroute-redis`                             |
| Intern port                | `6379`                                        |
| Vertsport (overstyring)    | `REDIS_PORT` (standardverdi `6379`)           |
| Vertsbinding (overstyring) | `REDIS_BIND_HOST` (standardverdi `127.0.0.1`) |
| Volum                      | `omniroute-redis-data` → `/data`              |
| Helsesjekk                 | `redis-cli ping` (10 sekunders intervall)     |

Relaterte miljøvariabler:

- `REDIS_URL` — tilkoblingsstreng som injiseres i appen (`redis://redis:6379` som standard).
- `REDIS_PORT` — porttilordning på vertssiden for Redis-beholderen.
- `REDIS_BIND_HOST` — vertsgrensesnittet som porten publiseres på. Standardverdien er `127.0.0.1`.

> **Hvorfor loopback brukes som standard:** Sidecar-beholderen kjører uten `requirepass`, og app-
> beholderne når den via Compose-nettverket (`redis:6379`) — den publiserte porten finnes
> bare for verktøy på vertssiden (`redis-cli`, en lokal `npm run dev`). Publisering på
> `0.0.0.0` vil eksponere en uautentisert Redis-instans for alle verter på lokalnettverket. Hvis du angir
> `REDIS_BIND_HOST=0.0.0.0`, må du også legge til `--requirepass` i tjenestens `command:`.

**Deaktivering av Redis** anbefales ikke (hastighetsbegrenseren vil gå over til en minnebasert reserveløsning). Hvis du må gjøre det, kan du enten fjerne/kommentere ut `redis:`-tjenesteblokken i `docker-compose.yml` eller skalere den ned til null:

```bash
docker compose up -d --scale redis=0
```

## Compose for produksjon

Bruk `docker-compose.prod.yml` for et isolert produksjonsøyeblikksbilde som kjører parallelt med utviklingsmiljøet.

| Detalj                         | Verdi                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| Fil                            | `docker-compose.prod.yml`                                                            |
| Standardport for kontrollpanel | `PROD_DASHBOARD_PORT=20130` (tilordnet intern `${DASHBOARD_PORT:-20128}`)            |
| Standard API-port              | `PROD_API_PORT=20131`                                                                |
| Image                          | `omniroute:prod` (bygget fra målet `runner-cli`)                                     |
| Redis-beholder                 | `omniroute-redis-prod` (`redis:8.6.2`, dedikert `redis-prod-data`-volum)             |
| Datavolum                      | `omniroute-prod-data` (navngitt, beholdes på tvers av nye bygg)                      |
| Helsesjekker                   | `node healthcheck.mjs` + `redis-cli ping`, med `depends_on` betinget av Redis-helsen |

Slik bruker du det:

```bash
# Bygg og start produksjonsstakken
docker compose -f docker-compose.prod.yml up -d --build

# Strøm logger
docker compose -f docker-compose.prod.yml logs -f

# Steng ned (behold volumer)
docker compose -f docker-compose.prod.yml down
```

Produksjonsstakken kjører parallelt med Compose-oppsettet for utvikling (ulike beholdernavn, porter og volumer), slik at du kan fortsette den lokale utviklingen mens produksjonsmiljøet forblir oppe.

## Dockerfile-stadier

Repositoriet leveres med en flertrinns-Dockerfile (`Dockerfile`). Tre stadier er tilgjengelige. Velg riktig `target` for ditt bruksområde.

| Stadium       | Basisimage            | Formål                                                                                                                                                                               |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Installerer avhengigheter (`npm ci --legacy-peer-deps`) og kjører `npm run build` (Turbopack som standard – se Byggeressurser nedenfor)                                              |
| `runner-base` | `node:26-trixie-slim` | Produksjonskjøremiljø med den frittstående utdataen fra Next.js. **Ingen leverandør-CLI-er er inkludert.**                                                                           |
| `runner-cli`  | `runner-base`         | Legger til `git`, `docker.io`, `docker-compose` og globale CLI-er: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Velg dette for agentbaserte arbeidsflyter.** |

Bygg et bestemt mål manuelt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Byggeressurser

Tre byggeargumenter styrer hvor mye `builder`-stadiet krever. De gjelder kun under bygging –
`OMNIROUTE_MEMORY_MB` (nedenfor) er en separat innstilling for kjøretid.

| Byggeargument               | Standardverdi | Effekt                                                                                |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`           | `0` bygger med webpack i stedet. Lavere maksimal minnebruk, men tregere.              |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | V8-grense for heap (`--max-old-space-size`) for den startede `next build`-prosessen.  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Angir `CIRCLE_NODE_TOTAL`; Next utleder `workers = N - 1` for innsamling av sidedata. |

`OMNIROUTE_BUILD_WORKERS` er innstillingen som bør økes på en kraftig byggemaskin, og den som
bør mistenkes når en ressursbegrenset bygging stopper **etter** `✓ Compiled successfully`. Hver
arbeider for sidedata er en egen prosess, og det samme gjelder den overordnede `next build`-prosessen;
en reproduksjon på en aktiv VPS (sak #7518) målte maksimal RSS for hver prosess til
~4,5 GB, uavhengig av heap-flagget i `NODE_OPTIONS` (Turbopack kompilerer i
nativt/Rust-minne utenfor V8-heapen). Standardverdien `2` (→ 1 arbeider, totalt 2
prosesser) er dimensjonert for de GitHub-driftede kjørerne med 16 GB / 4 vCPU som
publiseringsforløpet bruker. Med `8` (→ 7 arbeidere) gikk denne kjøreren tom for minne, og
buildkit mislyktes i trinnet med `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 arbeidere) fikk fortsatt ikke plass da RSS per prosess ble målt
direkte i stedet for å bli utledet. `tests/unit/docker-build-memory-budget.test.ts`
utfører beregningen mot den målte verdien og mislykkes hvis noen av innstillingene
blir for stor for kjøreren.

Turbopack kompilerer i nativt Rust-minne som ligger **utenfor** V8-heapen, så
`OMNIROUTE_BUILD_MEMORY_MB` begrenser det ikke. På en vert med en minnegrense blir
byggeprosessen da SIGKILL-avsluttet av OOM-mekanismen uten noen feilmelding – den
stopper ganske enkelt midt i `Creating an optimized production build`, noe som ser ut
som om den har hengt seg, snarere enn at den har gått tom for minne. Hvis byggeverten
har begrensede ressurser, bytter du pakkebygger:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` er aktivert, så `next build` kjører en overordnet prosess **og**
en arbeiderprosess, og begge følger `OMNIROUTE_BUILD_MEMORY_MB` separat. Sett
containergrensen til omtrent det dobbelte av denne verdien, ikke bare én gang verdien.

Målt på dette treet (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakkebygger | Containergrense | Resultat                                  |
| ----------- | --------------- | ----------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB  | OOM-avsluttet ved begge, uten feilmelding |
| webpack     | 8 GiB           | byggearbeideren ble SIGKILL-avsluttet     |
| webpack     | 12 GiB          | fullført, med en topp på 11,1 GiB         |

### Standardverdier for kjøretid

Standardverdier eksportert av `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Minneatferd i Docker:

- Imaget angir `OMNIROUTE_MEMORY_MB=1024` og utleder `NODE_OPTIONS=--max-old-space-size=1024` fra denne verdien.
- Selve serverprosessen startes av den frittstående oppstarteren, som leser `OMNIROUTE_MEMORY_MB` og legger til `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node bruker den siste gjentatte `--max-old-space-size`-verdien, så innstilling av `OMNIROUTE_MEMORY_MB` styrer den effektive Docker-grensen for heapen.
- Fordi imaget alltid angir denne verdien, brukes aldri oppstarterens eget RAM-kalibrerte reservevalg under Docker. Øk den eksplisitt for arbeidsbelastningen (se tabellen nedenfor). `2048` er fortsatt for lite for kodeagenters `/v1/responses`.

### Kjøretids-RAM for kodeagenter

Docker-standardverdien på 1 GiB er et minimum for kontrollpanel/enkel chat, ikke en produksjonsstørrelse. Lange `POST /v1/responses`-forespørselskropper (hundrevis av meldinger, titalls verktøy) beholder flere grafer i minnet under komprimering. To overlappende forespørsler på ~3 MiB / ~750k tokener har avbrutt V8 med **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) og også utløst en cgroup-OOM ved 16 GiB. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensjoner **cgroup `--memory` høyere enn heapen** – native buffere, SQLite og mellomresultater fra komprimering ligger utenfor V8.

| Arbeidsbelastning                  | `OMNIROUTE_MEMORY_MB`  | Container / cgroup   | Merknader                                                                                                   |
| ---------------------------------- | ---------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Kontrollpanel, én lett samtale     | `1024` (bildestandard) | ≥2 GiB               |                                                                                                             |
| Én kodeagent (Claude/Codex/Grok)   | `8192`                 | ≥10 GiB              | Typisk `/v1/responses` med én økt                                                                           |
| To samtidige lange `/v1/responses` | `10240`–`12288`        | ≥12–16 GiB           | Målt V8-avbrudd ved ~12 GiB heap                                                                            |
| Tre+ samtidige lange kontekster    | ikke i én prosess      | serialiser / mer RAM | Standardgrensen for tunge forespørsler er 1 under behandling; å øke den uten mer RAM gjeninnfører avbruddet |

`omniroute serve` på fysisk maskinvare kalibrerer ~35 % av RAM (begrenset til `[512, 4096]`) når `OMNIROUTE_MEMORY_MB` **ikke er angitt**. Docker angir alltid `1024`, så denne kalibreringen kjøres aldri i det offisielle imaget.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiske miljøvariabler

I tillegg til standardverdiene som er dokumentert i [ENVIRONMENT.md](../reference/ENVIRONMENT.md), er følgende variabler viktigst ved kjøring under Docker:

| Variabel                      | Formål                                                                                                                                                                                                                                                                                                  | Standardverdi           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Delt hemmelighet for WebSocket-broen. **Påkrevd i produksjon** — angi en sterk, tilfeldig streng.                                                                                                                                                                                                       | ikke angitt (må oppgis) |
| `REDIS_URL`                   | Tilkoblingsstreng for hastighetsbegrenseren / hurtigbufferens bakserver                                                                                                                                                                                                                                 | `redis://redis:6379`    |
| `REDIS_PORT`                  | Port på vertssiden for den medfølgende Redis-containeren                                                                                                                                                                                                                                                | `6379`                  |
| `REDIS_BIND_HOST`             | Vertsgrensesnittet som porten til den medfølgende Redis-containeren publiseres på (tilbakesløyfe med mindre du legger til AUTH)                                                                                                                                                                         | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Vertsbane som monteres i `cli`-profilen på `/workspace/omniroute` for arbeidsflyter med egenoppdatering                                                                                                                                                                                                 | `.` (gjeldende mappe)   |
| `OMNIROUTE_MEMORY_MB`         | Øvre grense for Node-heapen under kjøring for den frittstående Docker-serveren; overstyrer standardverdien for avbildningen ovenfor. Kodeagenter: `8192`+ (se [RAM under kjøring](#runtime-ram-for-coding-agents)).                                                                                     | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | Overstyr eksponerte porter for kontrollpanelet (20128) og API-et (20129)                                                                                                                                                                                                                                | `20128` / `20129`       |
| `APP_BIND_HOST`               | Vertsgrensesnittet som docker-compose publiserer portene for kontrollpanelet, API-et og direkte-WS på. Med `REQUIRE_API_KEY=false` (standardverdien) eksponerer `0.0.0.0` den anonyme `/v1`-proxyen for lokalnettverket — utvid bare tilgangen med `REQUIRE_API_KEY=true` eller en omvendt proxy foran. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | Vertsgrensesnittet som docker-compose publiserer `cliproxyapi`-sidevognen på — datavolumet inneholder leverandørlegitimasjon.                                                                                                                                                                           | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | Mappen som skanneren for programtillegg leser fra og installerer i under kjøring. Angi den når programtillegg bind-monteres: Standardverdien følger `HOME`, som en avbildning ikke nødvendigvis eksporterer.                                                                                            | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | URL-underbane når appen publiseres bak en omvendt proxy (f.eks. `/omniroute`)                                                                                                                                                                                                                           | _(tom = rot)_           |
| `NEXT_PUBLIC_BASE_URL`        | Offentlig nettleseropprinnelse inkludert underbanen (f.eks. `https://host/omniroute`)                                                                                                                                                                                                                   | ikke angitt             |
| `PROD_DASHBOARD_PORT`         | Kontrollpanelport på vertssiden for `docker-compose.prod.yml`                                                                                                                                                                                                                                           | `20130`                 |
| `CLIPROXYAPI_PORT`            | Port på vertssiden for `cliproxyapi`-sidevognen                                                                                                                                                                                                                                                         | `8317`                  |

## Omvendt proxy på en underbane (Traefik / nginx)

Next.js `basePath` kompileres inn i den frittstående pakken. OmniRoute registrerer den innbakte
verdien i en kontrollfil i appens rotmappe (skrevet under `npm run build`; lest av
`scripts/docker/ensure-docker-base-path.mjs`) og sammenligner den med
`OMNIROUTE_BASE_PATH` når containeren starter. Når de er forskjellige og avbildningen ble
bygget for domenets rot, omskriver startpunktet de frittstående manifestene, de
innebygde `basePath`-/`assetPrefix`-literalene (Next 16 gjengir SSR-ressurs-URL-er kun fra
`assetPrefix` — oppdateringsverktøyet speiler underbanen til denne), de innbakte
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

`docker-compose.yml` videresender `OMNIROUTE_BASE_PATH` som et Docker-byggeargument og som en
miljøvariabel for kjøretid.

### Forhåndsbygd rotavbildning + underbane ved kjøretid

Publiserte `diegosouzapw/omniroute:*`-avbildninger er bygget for domenets rot. Du kan fortsatt
angi `OMNIROUTE_BASE_PATH` ved kjøretid; containeren oppdaterer pakken én gang ved oppstart.
Bruk den sammen med det samsvarende offentlige opphavet:

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

Dockers helsesjekk sonderer det lette livssyklusendepunktet `/healthz`, prefikset
med den aktive `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` forblir tilgjengelig for
diagnostikk utført av mennesker eller instrumentpaneler. Hvis containerens HEALTHCHECK skal bruke det igjen (for eksempel
for grundig helsehåndheving), angir du `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Denne banen er en **grundig** sjekk (database + overvåkingssammendrag) — egnet for Dockers
sjeldne `HEALTHCHECK` hvis du velger å aktivere den igjen, men **ikke** for intervaller for
Kubernetes `livenessProbe`.

For orkestreringssystemer (Kubernetes, Nomad osv.):

| Sonde               | Foretrekk                                                              | Unngå                                                          |
| ------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| Livstegn            | HTTP `GET /livez`, eller TCP på hovedporten (`PORT`, standard `20128`) | `/api/monitoring/health` som livstegnsjekk                     |
| Beredskap           | HTTP `GET /healthz`                                                    | Korte tidsavbrudd som tolker en opptatt hendelsesløkke som død |
| Grundig / svartboks | `/api/monitoring/health`                                               | —                                                              |

`/healthz` rapporterer prosessens livssyklus (`ok` / `starting` / `stopping`). `/livez` kontrollerer
bare at prosessen lever (200 når behandleren kan kjøre; den venter ikke på
beredskap). Begge kjører fortsatt i den samme Node-hendelsesløkken som forespørselsbehandlingen, så
CPU-bundet katalog- eller komprimeringsarbeid kan forsinke dem — opptatt ≠ død. Foretrekk TCP-
livstegnssjekk hvis HTTP-sonder får tidsavbrudd. Fullstendig veiledning for sonder:
[Overvåkingsveiledning — anbefalinger for Kubernetes-sonder](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose med Caddy (automatisk HTTPS/TLS)

OmniRoute kan eksponeres sikkert ved hjelp av Caddys automatiske SSL-klargjøring. Sørg for at domenets DNS A-oppføring peker til serverens IP-adresse.

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
      # Opprinnelse som brukes av nettleseren for OAuth-tilbakekall, kontrollpanellenker og genererte offentlige URL-er.
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
`NEXT_PUBLIC_BASE_URL` som den kanoniske offentlige opprinnelsen for OAuth-tilbakekall og genererte offentlige
lenker. Autentiserte skriveoperasjoner i kontrollpanelet bruker forespørsler med samme opprinnelse samt øktbundet CSRF-
beskyttelse. Aktiver `OMNIROUTE_TRUST_PROXY` bare for avanserte distribusjoner der du med hensikt
vil at OmniRoute skal utlede den offentlige opprinnelsen fra klarerte videresendingshoder i stedet for eksplisitt
konfigurasjon.

## Cloudflare Quick Tunnel

Kontrollpanelstøtte for Docker-distribusjoner inkluderer en ettklikks **Cloudflare Quick Tunnel** under `Dashboard → Endpoints`. Ved første aktivering lastes `cloudflared` bare ned når det er nødvendig, en midlertidig tunnel til det gjeldende `/v1`-endepunktet startes, og den genererte URL-en `https://*.trycloudflare.com/v1` vises rett under den vanlige offentlige URL-en.

Tunnelpaneler for endepunkter (Cloudflare, Tailscale, ngrok) kan vises eller skjules fra `Settings → Appearance` uten å endre tilstanden til aktive tunneler.

### Merknader om tunneler

- URL-er for Quick Tunnel er midlertidige og endres etter hver omstart.
- Quick Tunnels gjenopprettes ikke automatisk etter omstart av OmniRoute eller beholderen. Aktiver dem på nytt fra kontrollpanelet ved behov.
- Administrert installasjon støtter for øyeblikket Linux, macOS og Windows på `x64` / `arm64`.
- Administrerte Quick Tunnels bruker HTTP/2-transport som standard for å unngå støyende advarsler om QUIC UDP-buffere i begrensede beholdermiljøer. Angi `CLOUDFLARED_PROTOCOL=quic` eller `auto` hvis du ønsker en annen transport.
- Docker-avbildninger inkluderer systemets CA-røtter og sender dem videre til administrert `cloudflared`, noe som unngår TLS-klareringsfeil når tunnelen initialiseres inne i beholderen.
- Angi `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` hvis du vil at OmniRoute skal bruke en eksisterende binærfil i stedet for å laste ned en.

## Avbildningstagger

| Avbildning               | Tagg     | Størrelse | Beskrivelse                                             |
| ------------------------ | -------- | --------- | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | Høyeste **publiserte** stabile SemVer (ikke git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB    | Fest denne taggtypen for GitOps                         |

Flerplattformmanifest: `linux/amd64` + `linux/arm64` opprinnelig (Apple Silicon, AWS Graviton, Raspberry Pi). Docker velger automatisk den samsvarende arkitekturen. Bruk `--platform linux/amd64` hvis du må fremtvinge AMD64-emulering på ARM-verter.

### Utgivelseskanaler

OmniRoute publiserer separate Docker-kanaler for stabile utgivelser, aktiv testing av utgivelsesgrener og utviklingsbygg.

| Kanal                           | Kilde                                 | Foranderlighet                 | Anbefalt bruk                                                                                                                    |
| ------------------------------- | ------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signert/versjonert utgivelse          | Uforanderlig                   | Produksjonsdistribusjoner som er festet til en bestemt utgivelse                                                                 |
| `:latest` / `:latest-web`       | Høyeste **publiserte** stabile SemVer | Foranderlig stabil peker       | Følger stabile utgivelser **etter** en SemVer-publiseringsjobb – følger **ikke** `main` eller upubliserte commits i `release/v*` |
| `:next` / `:next-web`           | Gjeldende standardgren `release/v*`   | Foranderlig førutgivelsespeker | Testing av rettelser som er lagt inn i den aktive utgivelsesgrenen, men ennå ikke er med i en stabil utgivelse                   |
| `:main` / `:main-web`           | `main`-grenen                         | Foranderlig utviklingspeker    | Kun utviklings- og integrasjonstesting                                                                                           |

#### Bruk av førutgivelseskanalen

`next`-kanalen bygges på nytt ved hver push til den gjeldende standardgrenen `release/v*` og publiseres for både AMD64 og ARM64. Eldre vedlikeholdsgrener kan ikke overskrive den. Kanalen tilbyr en avbildning som kan hentes, med rettelser som er slått sammen med den aktive utgivelsesgrenen før den neste stabile taggen opprettes.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose overstyrer du avbildningstaggen som brukes av den valgte profilen, og henter og oppretter deretter tjenesten på nytt:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sikkerhet og tilbakeføring

`next` er en flytende førutgivelseskanal. Den kan endres ved enhver push til den aktive utgivelsesgrenen og er **ikke støttet for produksjonsbruk**. Fest avbildningsdigesten mens du evaluerer et bestemt bygg:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Før testing må du sikkerhetskopiere OmniRoute-datavolumet eller den bind-monterte datakatalogen. For å rulle tilbake gjenoppretter du den tidligere brukte stabile versjonen eller digesten og oppretter containeren på nytt:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

En byggversjon fra en release-gren kan aldri flytte `latest`; bare en kvalifisert stabil semantisk versjon kan oppdatere pekeren til den stabile versjonen. `next`-imager beholder kontrollen av release-imaget og sperren som blokkerer ved CRITICAL-sårbarheter.

**`latest` er ingen garanti for at innholdet er oppdatert med git.** Sammenslåtte rettelser på `main` eller den aktive `release/v*`-grenen er **ikke** inkludert i `:latest` før et stabilt SemVer-image er publisert og publiseringsjobben oppdaterer `:latest` (samme digest som den aktuelle SemVer-versjonen). Hvis `latest` ser ut til å stå stille mens GitHub allerede viser rettelsen, kan du hente `:next` for å teste release-grenen eller vente på SemVer-taggen.

| Du ønsker                                                                   | Bruk                                     |
| --------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / produksjon som ikke må endres utilsiktet                           | Fest til `:X.Y.Z` (eller image-digesten) |
| Følge publiserte stabile versjoner og godta ny opprettelse ved hver release | `:latest`                                |
| Teste upubliserte commits fra `release/v*`                                  | `:next` (ikke for produksjon)            |
| Teste `main`                                                                | `:main` (ikke for produksjon)            |

## Tilgjengelighet: Standard SQLite støtter kun én replika

Standard Docker-/Kubernetes-oppsett for OmniRoute består av **én Node-prosess + én SQLite-skriver**. Høy tilgjengelighet støttes **ikke** med denne topologien.

| Begrensning                                     | Konsekvens                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Én skriver                                      | Kjør **ikke** flere replikaer mot den samme SQLite-filen. Det korrumperer databasen.                                                                                                                                                                                                                                                                      |
| Nyoppretting / omstart / HEALTHCHECK-avslutning | **Fullstendig driftsavbrudd** for aktive SSE-tilkoblinger, instrumentbordøkter og tilstand i minnet. Alle tilkoblede klienter kobles fra. Nye forespørsler mens ingen endepunkter er tilgjengelige, får en **`502 Bad Gateway: Unknown error`** fra reverse-proxyen, ikke OmniRoute-JSON — klienter kan ikke skille dette fra en leverandørfeil (#11015). |
| Samme hendelsesløkke som `/healthz`             | En travel katalog- eller komprimeringssyklus kan forsinke prober; et kort tidsavbrudd starter da den **eneste** replikaen på nytt.                                                                                                                                                                                                                        |

**Probematrise** (se også [anbefalinger for Kubernetes-prober](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe             | Mål                                                         | Ikke bruk                                                     |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| Livstegn          | TCP på `PORT` (standard `20128`), eller myk HTTP `/healthz` | `/api/monitoring/health`                                      |
| Klargjøring       | HTTP `GET /healthz`                                         | Korte tidsavbrudd som tolker en travel hendelsesløkke som død |
| Grundig / manuelt | `/api/monitoring/health`                                    | Automatisert kubelet-livstegnprobe                            |

**Oppgraderinger:** Forvent at alle økter brytes. Tøm klienttrafikken hvis du kan; rullerende oppdateringer er ikke tilgjengelige med standard SQLite. Compose `restart: unless-stopped` kombinert med Docker `HEALTHCHECK` erstatter også den eneste prosessen når beholderen er Unhealthy — med samme konsekvensomfang.

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

`preStop`-ventetiden lar kube fjerne Service-endepunkter før SIGTERM, slik at **ny** trafikk slutter å treffe prosessen som avsluttes. Aktive `/v1/responses`-SSE-tilkoblinger får opptil `SHUTDOWN_TIMEOUT_MS` (standard 30s) til å fullføres via tungvekts tilgangsleier (#11015). Nye forespørsler som likevel når prosessen, får `503` + `Retry-After: 5`. Recreate-perioden uten endepunkter frem til erstatningen er Ready, innebærer fortsatt et fullstendig driftsavbrudd — dette skyldes SQLite-topologien, ikke feilkonfigurerte prober.

Ekstern Postgres / HA med flere skrivere er **ikke** en dokumentert standardløsning. Hvis du trenger HA, bør du beholde én replika eller kjøre en topologi som prosjektet har testet og dokumentert separat. Arbeidet med Postgres/MySQL finnes i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Frem til dette leveres, er den eneste støttede måten å øke kapasiteten for **store** `/v1/responses` på, å bruke N uavhengige prosesser (neste avsnitt), ikke `replicas > 1` på ett volum.

## Horisontal skalering: N uavhengige prosesser

Én Node-prosess er **én V8-heap**. To overlappende kodeagentforespørsler på ~3 MiB / ~750k tokener til `POST /v1/responses` (RTK + Caveman) avbryter denne heapen ved ~12 Gi (`FATAL ERROR: Reached heap limit`) og kan føre til OOM i en cgroup på 16 Gi. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Denne målingen er en **minnebudsjettadvarsel**, ikke en absolutt produktgrense på to samtidige, langvarige `/v1/responses`. Tilgang for ressurskrevende chat styres av et automatisk utledet bytebudsjett for innkommende data (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimensjonert ut fra den samme V8-/cgroup-grensen — å overstyre det oppover (eller angi den eldre grensen `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` for antall forespørsler) i en prosess som allerede er dimensjonert, gjeninnfører avbruddet. Små chatter, `/healthz`, `/v1/models` og MCP er **ikke** omfattet av denne grensen.

### Én prosess: mer enn to langvarige `/v1/responses`

En **frisk** prosess (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standardverdi `0.75`) **kan** kjøre mer enn to samtidige, langvarige `POST /v1/responses` når det prosessomfattende bytebudsjettet for aktive forespørsler (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) fortsatt har kapasitet. Forespørselskropper på eller over `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standardverdi 256 KiB) bruker den samme ressurskrevende reservasjonen som strukturtunge forespørsler og den samme `tryAcquireHealthyHeadroom`-utveien fra [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Flere titalls samtidige, langvarige SSE-klienter (operatører trenger ofte 40–50) er et spørsmål om **minnebudsjett** — dimensjoner heap + primær-/ekstrakapasitetsplasser + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ikke en absolutt produktgrense på «maks. 2». En belastet heap avviser fortsatt forespørsler med en `503` som kan prøves på nytt, slik at #7849 ikke kommer tilbake.

Slik **multipliserer du antall heaper** (uavhengige, gamle V8-minneområder) **i dag**:

| Gjør                                                                                                                                                                                                 | Ikke gjør dette                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Kjør **N containere/poder**, hver med sin **egen** `DATA_DIR` / lagringsenhet                                                                                                                        | Angi `replicas > 1` mot én SQLite-fil                               |
| Dimensjoner tunge aktive forespørsler + frisk ekstrakapasitet ut fra heap-/bytebudsjettet for aktive forespørsler; 1–2 er den konservative standardverdien fra #7849, ikke en absolutt produktgrense | Gi én prosess 8× RAM og en ubegrenset antallsgrense                 |
| Valgfritt: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for **delte kvotetellere**                                                                                                           | Behandle Redis som delt SQLite — det er det ikke                    |
| Dupliser leverandørhemmeligheter til hver instans (eller godta partisjonerte instrumentpaneler)                                                                                                      | Forvent ett instrumentpanel / én anropslogg på tvers av instanser   |
| Plasser en valgfri lastbalanserer foran; øktaffinitet basert på API-nøkkel eller økt er tilstrekkelig                                                                                                | Krev en leverandørspesifikk mellomvare som tar hensyn til størrelse |

Maskinvare: Antallet samtidige, langvarige `/v1/responses` per instans er et spørsmål om **minnebudsjett** (heap + bytebudsjett for aktive forespørsler / #10110). `N` uavhengige `DATA_DIR`-er multipliserer fortsatt antall heaper: Vertens RAM må dekke `N × cgroup`, ikke «én 16 Gi-pod med N=8». Bruk aldri `replicas > 1` mot én SQLite-fil.

Compose-eksempel (to heaper, to lagringsenheter — ikke `deploy.replicas: 2`):

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

Tetthet i samme prosess (komprimering utenfor HTTP-isolatet) er [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Én logisk klynge med delt, varig tilstand er [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Viktige merknader

- **SQLite WAL-modus:** `docker stop` bør få fullføre, slik at OmniRoute kan skrive de nyeste endringene tilbake til `storage.sqlite` via et kontrollpunkt. De medfølgende Compose-filene har allerede en stopptoleranse på 40 sekunder. Hvis du kjører imaget direkte, behold `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Sett til `true` hvis rutinemessige sikkerhetskopier og sikkerhetskopier før skriving administreres eksternt. Migreringer av eksisterende databaser krever fortsatt et eget, varig sikkerhetsøyeblikksbilde og en beskyttelsesmekanisme for massemigrering.
- **Datapersistens:** Monter alltid et volum på `/app/data` for å bevare databasen, nøklene og konfigurasjonene dine på tvers av omstarter av containeren.
- **Portkonfigurasjon:** Overstyr miljøvariabelen `PORT` for å endre standardporten `20128`.

## Se også

- [Veiledning for VM-distribusjon](../ops/VM_DEPLOYMENT_GUIDE.md) — Oppsett med VM + nginx + Cloudflare
- [Veiledning for distribusjon til Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Distribuer til Fly.io
- [Miljøkonfigurasjon](../reference/ENVIRONMENT.md) — Fullstendig referanse for `.env`
