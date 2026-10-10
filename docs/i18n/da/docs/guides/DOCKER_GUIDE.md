# 🐳 Docker Guide — OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Komplet reference til Docker-implementering. For en hurtig start, se [Docker-afsnittet i README](../README.md#-docker).

## Indholdsfortegnelse

- [Hurtig kørsel](#quick-run)
- [Med miljøfil](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Tilgængelige profiler](#available-profiles)
- [Konfiguration af CLI-værktøjer på værten, når OmniRoute kører i Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose til produktion](#production-compose)
- [Dockerfile-faser](#dockerfile-stages)
- [Kritiske miljøvariabler](#critical-environment-variables)
- [Docker Compose med Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image-tags](#image-tags)
- [Tilgængelighed: SQLite er som standard begrænset til én replika](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-fejl i Docker](#gemini-regional-errors-inside-docker)
- [Vigtige bemærkninger](#important-notes)

---

## Hurtig kørsel

> **Selvhost med én kommando?** Se
> [vejledningen til selvhosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (offentliggjort image +
> Redis, kun loopback, intet profilvalg). Hurtig kørsel nedenfor er
> løsningen med en enkelt container for brugere, der allerede kører Redis et andet sted.

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
# Kopiér og rediger først .env
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
# Basisprofil (ingen CLI-værktøjer)
docker compose --profile base up -d

# CLI-profil (Claude Code, Codex og OpenClaw indbygget)
docker compose --profile cli up -d

# Værtsprofil (primært til Linux; monterer værtens CLI-binærfiler skrivebeskyttet)
docker compose --profile host up -d

# Webprofil (Chromium/Playwright til websessionsudbydere)
docker compose --profile web up -d

# Kombiner CLI + CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Tilgængelige profiler

OmniRoute leveres med Compose-profiler til de vigtigste implementeringsformer. Vælg den, der passer til dit miljø.

| Profil            | Tjeneste         | Hvornår den skal bruges                                                                                                                                | Kommando                                     |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (standard) | `omniroute-base` | Headless-server/minimal kørsel uden medfølgende CLI'er til udbydere                                                                                    | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentbaserede arbejdsgange, der kalder `omniroute providers/setup/doctor`, og medfølgende CLI'er (Codex, Claude Code, Droid, OpenClaw)                 | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-værter, der ønsker `network_mode`-lignende adgang til værtens CLI'er ved at montere `~/.local/bin`, `~/.codex`, `~/.claude` osv. skrivebeskyttet | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Kør [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-sidecaren på port `8317` til upstream-CLI-proxying                                     | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Websessionsudbydere, der kræver en browser: `gemini-web`, `claude-web`, `claude-turnstile` (bygger `runner-web`, Chromium inkluderet)                  | `docker compose --profile web up -d`         |

> Flere profiler kan kombineres: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguration af CLI-værktøjer på værten, når OmniRoute kører i Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` og dashboardets
**Gem konfiguration**-knap skriver alle filer såsom `~/.codex/*.config.toml`. Disse stier
giver kun mening på den maskine, hvor CLI'en rent faktisk kører. Kører du dem inde
i containeren, ender skrivningen i containerens egen hjemmemappe (`/home/node` —
imaget kører med `USER node`), hvor ingen CLI på værten nogensinde vil læse den, og hvor den
slettes, så snart containeren genoprettes.

OmniRoute registrerer dette og afviser skrivningen med instruktioner i stedet for
at rapportere en succes, du ikke kan bruge: CLI'en afslutter med `2`, og API'et svarer `422`
med `containerEphemeralTarget: true`.

### Anbefalet: Kør CLI'en på værten og OmniRoute i Docker

Containeren leverer API'et; CLI'en konfigurerer dine værtsværktøjer.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # peg CLI'en mod containeren
omniroute setup-codex                      # skriver den rigtige ~/.codex på din vært
```

Dette er det rigtige valg, når Codex, Claude Code, Cursor eller lignende kører på din
bærbare computer — hvilket er den sædvanlige opsætning.

### Alternativ: Bind-mount værtens konfigurationsmapper (`host`-profil)

Hvis du ønsker, at containeren selv skal skrive din værtskonfiguration, skal du mounte
mapperne og pege `CLI_CONFIG_HOME` mod mount-roden. `host`-profilen
gør allerede dette:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Et bind-mount er det, der gør stien pålidelig: OmniRoute læser
`/proc/self/mountinfo` og tillader skrivninger til mountede stier (og til mapper,
hvis undermapper er mounts, hvilket netop svarer til `/host-home`-strukturen ovenfor), mens
ikke-mountede stier stadig afvises.

### Nødudgang: Konfigurer containerens egne CLI'er (brug med omtanke)

Når CLI'erne reelt befinder sig inde i containeren (`cli`-profilen), er skrivningen
tilsigtet. Angiv `--allow-container-write` til enhver `setup-*`-kommando, eller indstil
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` for serveren. Skrivningen gennemføres
med en advarsel om, at den ikke overlever containeren.

> **Sikkerhedsadvarsel — `cli`-profil + `docker.sock`-mount.**
> `cli`-profilen bind-mounter `/var/run/docker.sock`, så den automatiske opdateringsfunktion
> i containeren kan genoprette stacken via værtsdaemonen
> (`src/lib/system/autoUpdate.ts` kontrollerer, om denne socket findes, og springer
> Docker-stien over, når den ikke findes). Denne socket er **en tillidsgrænse med
> root-adgang til værten**: Alt, der kan tilgå den, styrer værtens Docker-daemon som
> root — det kan oprette, inspicere, stoppe og fjerne enhver container på værten.
> Konsekvenser:
>
> 1. **Eksponér aldrig `cli`-profilens port på netværket.** Udgiv
>    den på `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — en `cli`-profil, der kan nås fra LAN'et, gør enhver RCE på dashboardniveau til
>    en fuldstændig kompromittering af værten.
> 2. **Bind ikke yderligere værtsmapper ind i `cli`-profilen.**
>    Docker-socketen kombineret med ethvert yderligere mount giver containeren fuld
>    læse-/skriveadgang til dit filsystem og din værtskonfiguration. Hvis et værktøj skal
>    kunne se et projekt, skal du køre det lokalt med CLI-binærfilen — mount det ikke
>    ind i `cli`-containeren.
>
> Hvis du ikke har brug for automatisk opdatering i containeren, skal du undlade at aktivere `cli`-profilen
> (`COMPOSE_PROFILES=core,redis` eller kortere). De øvrige profiler
> mounter ikke Docker-socketen.
>
> Se `docs/security/MITM-TPROXY-DECRYPT.md` (git; ikke kompileret ind i `/docs`) for den relaterede trusselsmodel
> omkring MITM og `docs/security/SUPPLY_CHAIN.md` for
> provenienskæden for binærfilerne `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidecar

OmniRoute er afhængig af Redis som grundlag for den distribuerede hastighedsbegrænser og den delte cache. Tjenesten `redis` er **altid defineret** i `docker-compose.yml` (den har ingen profilbegrænsning) og starter sammen med enhver anden profil.

| Detalje                        | Værdi                                       |
| ------------------------------ | ------------------------------------------- |
| Image                          | `redis:7-alpine`                            |
| Containernavn                  | `omniroute-redis`                           |
| Intern port                    | `6379`                                      |
| Værtsport (tilsidesættelse)    | `REDIS_PORT` (standard er `6379`)           |
| Værtsbinding (tilsidesættelse) | `REDIS_BIND_HOST` (standard er `127.0.0.1`) |
| Diskenhed                      | `omniroute-redis-data` → `/data`            |
| Sundhedskontrol                | `redis-cli ping` (interval på 10 sek.)      |

Relaterede miljøvariabler:

- `REDIS_URL` — forbindelsesstreng, der injiceres i appen (`redis://redis:6379` som standard).
- `REDIS_PORT` — porttilknytning på værtssiden for Redis-containeren.
- `REDIS_BIND_HOST` — værtsgrænseflade, som porten publiceres på. Standard er `127.0.0.1`.

> **Hvorfor loopback bruges som standard:** Sidecaren kører uden `requirepass`, og appens
> containere tilgår den via Compose-netværket (`redis:6379`) — den publicerede port er
> kun beregnet til værktøjer på værtssiden (`redis-cli`, en lokal `npm run dev`). Publicering på
> `0.0.0.0` ville eksponere en Redis uden godkendelse for alle værter på dit LAN. Hvis du angiver
> `REDIS_BIND_HOST=0.0.0.0`, skal du også føje `--requirepass` til tjenestens `command:`.

**Deaktivering af Redis** anbefales ikke (hastighedsbegrænseren vil skifte til en mindre effektiv reservefunktion i hukommelsen). Hvis det er nødvendigt, kan du enten fjerne/udkommentere tjenesteblokken `redis:` i `docker-compose.yml` eller skalere den til nul:

```bash
docker compose up -d --scale redis=0
```

## Compose til produktion

Brug `docker-compose.prod.yml` til et isoleret produktionsøjebliksbillede, der kører parallelt med udviklingsmiljøet.

| Detalje                   | Værdi                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Fil                       | `docker-compose.prod.yml`                                                                  |
| Dashboardets standardport | `PROD_DASHBOARD_PORT=20130` (knyttet til den interne `${DASHBOARD_PORT:-20128}`)           |
| API'ets standardport      | `PROD_API_PORT=20131`                                                                      |
| Image                     | `omniroute:prod` (bygget fra målet `runner-cli`)                                           |
| Redis-container           | `omniroute-redis-prod` (`redis:8.6.2`, dedikeret diskenhed `redis-prod-data`)              |
| Datadiskenhed             | `omniroute-prod-data` (navngivet og bevaret på tværs af genopbygninger)                    |
| Sundhedskontroller        | `node healthcheck.mjs` + `redis-cli ping`, hvor `depends_on` er betinget af Redis' sundhed |

Sådan bruges den:

```bash
# Byg og start produktionsstakken
docker compose -f docker-compose.prod.yml up -d --build

# Følg logfiler løbende
docker compose -f docker-compose.prod.yml logs -f

# Luk ned (behold diskenheder)
docker compose -f docker-compose.prod.yml down
```

Produktionsstakken kører parallelt med Compose-miljøet til udvikling (med forskellige containernavne, porte og diskenheder), så du kan fortsætte med at udvikle lokalt, mens produktionsmiljøet forbliver aktivt.

## Dockerfile-faser

Repositoriet leveres med en Dockerfile i flere faser (`Dockerfile`). Fire faser er tilgængelige; vælg det rette `target` til dit anvendelsestilfælde.

| Fase          | Basisimage            | Formål                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installerer afhængigheder (`npm ci --legacy-peer-deps`) og kører `npm run build` (Turbopack som standard — se Ressourcer ved build nedenfor)                                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Produktionsmiljø med det selvstændige Next.js-output. **Ingen CLI'er fra udbydere er inkluderet.**                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Tilføjer `git`, `docker.io`, `docker-compose` og globale CLI'er: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vælg denne til agentbaserede arbejdsgange.**                                                                                                                        |
| `runner-web`  | `runner-base`         | Tilføjer Playwright + en Chromium-browser (`--with-deps`) til websessionsudbydere: `gemini-web`, `claude-web`, `claude-turnstile`. **Vælg denne, når du bruger disse udbydere** — det almindelige image fejler ved forespørgselstidspunktet uden den (se bemærkningen om `-web` under Udgivelseskanaler). |

Byg et bestemt target manuelt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ressourcer ved build

Tre build-argumenter styrer, hvor mange ressourcer `builder`-fasen bruger. De gælder kun ved build —
`OMNIROUTE_MEMORY_MB` (nedenfor) er en separat indstilling for kørselstid.

| Build-argument              | Standard | Effekt                                                                                    |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` bygger med webpack: lavere maksimal hukommelse, langsommere. `1` aktiverer Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | V8-heapgrænse (`--max-old-space-size`) for den startede `next build`.                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Leverer `CIRCLE_NODE_TOTAL`; Next udleder `workers = N - 1` til indsamling af sidedata.   |

`OMNIROUTE_BUILD_WORKERS` er den, der skal øges på en stor build-maskine, og den,
der bør mistænkes, når et ressourcebegrænset build fejler **efter** `✓ Compiled successfully`. Hver
worker til sidedata er sin egen proces, og det samme gælder den overordnede `next build`-proces;
en reproduktion på en aktiv VPS (issue #7518) målte hver proces' maksimale RSS til
~4.5 GB uafhængigt af heap-flaget `NODE_OPTIONS` (Turbopack kompilerer i
native/Rust-hukommelse uden for V8-heapen). Standardværdien `2` (→ 1 worker, i alt 2
processer) er dimensioneret til de GitHub-hostede runners med 16 GB / 4 vCPU, som
udgivelsespipelinen bruger. Ved `8` (→ 7 workers) løb denne runner tør for hukommelse, og
buildkit lod trinnet fejle med `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) kunne stadig ikke være der, efter at RSS pr. proces blev målt
direkte i stedet for udledt. `tests/unit/docker-build-memory-budget.test.ts`
udfører beregningen ud fra den målte værdi og fejler, hvis en af indstillingerne
vokser ud over runnerens kapacitet.

Turbopack kompilerer i native Rust-hukommelse, der befinder sig **uden for** V8-heapen, så
`OMNIROUTE_BUILD_MEMORY_MB` begrænser den ikke. På en host med en hukommelsesgrænse bliver
buildet derfor SIGKILL'et af OOM-killeren helt uden fejltekst — det stopper ganske enkelt
midt i `Creating an optimized production build`, hvilket ligner et fastlåst build snarere
end mangel på hukommelse. Derfor bruger `Dockerfile` webpack som standard
(`OMNIROUTE_USE_TURBOPACK=0`), i modsætning til `npm run dev` / `npm run build`, hvor
Turbopack er standarden i koden: et almindeligt `docker build .` uden build-argumenter (som
Railway og andre one-click-hosts kører) må ikke fejle lydløst på en build-maskine med
begrænset hukommelse. De udgivne images angiver allerede `OMNIROUTE_USE_TURBOPACK=0`
eksplicit i `docker-publish.yml`. På en build-maskine med rigeligt RAM kan du aktivere
Turbopack for at få et hurtigere build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` er aktiveret, så `next build` kører både en overordnet proces **og** en workerproces,
og hver af dem respekterer `OMNIROUTE_BUILD_MEMORY_MB` separat. Dimensionér containerens
grænse til mere end omtrent det dobbelte af denne værdi, ikke kun én gang værdien.

Målt på dette træ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Containergrænse | Resultat                         |
| --------- | --------------- | -------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | OOM-dræbt ved begge, uden besked |
| webpack   | 8 GiB           | build-worker SIGKILL'et          |
| webpack   | 12 GiB          | gennemført, toppede ved 11.1 GiB |

### Standardværdier ved kørselstid

Standardværdier eksporteret af `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Hukommelsesadfærd i Docker:

- Afbildningen angiver `OMNIROUTE_MEMORY_MB=1024` og udleder `NODE_OPTIONS=--max-old-space-size=1024` fra den.
- Den faktiske serverproces startes af den selvstændige launcher, som læser `OMNIROUTE_MEMORY_MB` og tilføjer `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node bruger den sidste gentagne `--max-old-space-size`-værdi, så indstilling af `OMNIROUTE_MEMORY_MB` styrer den effektive Docker-heapgrænse.
- Da afbildningen altid angiver den, anvendes launcherens eget RAM-kalibrerede fallback aldrig under Docker. Hæv den eksplicit til arbejdsbelastningen (se tabellen nedenfor). `2048` er stadig for lidt til coding-agent-`/v1/responses`.

### RAM under kørsel til coding agents

Docker-standarden på 1 GiB er et minimum til dashboard/let chat, ikke en størrelse til produktion. Lange `POST /v1/responses`-payloads (hundredvis af meddelelser, snesevis af værktøjer) bevarer flere grafer i hukommelsen under komprimering. To overlappende forespørgsler på ~3 MiB/~750k tokens har fået V8 til at afbryde ved et **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) og har også ramt en cgroup-OOM ved 16 GiB. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionér **cgroup-`--memory` højere end heapen** — native buffers, SQLite og mellemresultater fra komprimering ligger uden for V8.

| Arbejdsbelastning                          | `OMNIROUTE_MEMORY_MB`        | Container/cgroup    | Bemærkninger                                                                                              |
| ------------------------------------------ | ---------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| Dashboard, én let chat                     | `1024` (afbildningsstandard) | ≥2 GiB              |                                                                                                           |
| Én coding agent (Claude/Codex/Grok)        | `8192`                       | ≥10 GiB             | Typisk `POST /v1/responses` med én session                                                                |
| To samtidige lange `/v1/responses`         | `10240`–`12288`              | ≥12–16 GiB          | Målt V8-afbrydelse ved ~12 GiB heap                                                                       |
| Tre eller flere samtidige lange kontekster | gør det ikke i én proces     | serialisér/mere RAM | Standardgrænsen for tunge samtidige forespørgsler er 1; at hæve den uden mere RAM genindfører afbrydelsen |

`omniroute serve` på fysisk hardware kalibrerer til ~35 % af RAM (begrænset til `[512, 4096]`), når `OMNIROUTE_MEMORY_MB` **ikke er angivet**. Docker angiver altid `1024`, så denne kalibrering køres aldrig i den officielle afbildning.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiske miljøvariabler

Ud over standardværdierne, der er dokumenteret i [ENVIRONMENT.md](../reference/ENVIRONMENT.md), er følgende variabler de vigtigste ved kørsel under Docker:

| Variabel                      | Formål                                                                                                                                                                                                                                                         | Standardværdi               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Delt hemmelighed til WebSocket-broen. **Påkrævet i produktion** — angiv en stærk, tilfældig streng.                                                                                                                                                            | ikke angivet (skal angives) |
| `REDIS_URL`                   | Forbindelsesstreng til backend for hastighedsbegrænsning/cache                                                                                                                                                                                                 | `redis://redis:6379`        |
| `REDIS_PORT`                  | Port på værtssiden til den medfølgende Redis-container                                                                                                                                                                                                         | `6379`                      |
| `REDIS_BIND_HOST`             | Værtsgrænseflade, som den medfølgende Redis-port publiceres på (loopback, medmindre du tilføjer AUTH)                                                                                                                                                          | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Værtssti, der monteres i `cli`-profilen på `/workspace/omniroute` til arbejdsgange for selvopdatering                                                                                                                                                          | `.` (aktuel mappe)          |
| `OMNIROUTE_MEMORY_MB`         | Øvre grænse for Node-heap under kørsel for den selvstændige Docker-server; tilsidesætter standardværdien for imaget ovenfor. Kodningsagenter: `8192`+ (se [RAM under kørsel](#runtime-ram-for-coding-agents)).                                                 | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Tilsidesæt eksponerede porte for dashboardet (20128) og API'et (20129)                                                                                                                                                                                         | `20128` / `20129`           |
| `APP_BIND_HOST`               | Værtsgrænseflade, som docker-compose publicerer dashboard-/API-/live-WS-portene på. Med `REQUIRE_API_KEY=false` (standardværdien) eksponerer `0.0.0.0` den anonyme `/v1`-proxy for LAN'et — udvid kun med `REQUIRE_API_KEY=true` eller en reverse proxy foran. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Værtsgrænseflade, som docker-compose publicerer `cliproxyapi`-sidecar-containeren på — dens datadiskenhed indeholder legitimationsoplysninger til udbydere.                                                                                                    | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Mappe, som plugin-scanneren under kørsel læser fra og installerer i. Angiv den, når plugins bind-monteres: Standardværdien følger `HOME`, som et image ikke nødvendigvis eksporterer.                                                                          | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | URL-understi, når appen publiceres bag en reverse proxy (f.eks. `/omniroute`)                                                                                                                                                                                  | _(tom = rod)_               |
| `NEXT_PUBLIC_BASE_URL`        | Offentlig browseroprindelse inklusive understien (f.eks. `https://host/omniroute`)                                                                                                                                                                             | ikke angivet                |
| `PROD_DASHBOARD_PORT`         | Dashboardport på værtssiden til `docker-compose.prod.yml`                                                                                                                                                                                                      | `20130`                     |
| `CLIPROXYAPI_PORT`            | Port på værtssiden til `cliproxyapi`-sidecar-containeren                                                                                                                                                                                                       | `8317`                      |

## Reverse proxy på en understi (Traefik / nginx)

Next.js `basePath` kompileres ind i standalone-bundtet. OmniRoute registrerer den indbyggede
værdi i en sentinel-fil i appens rodmappe (skrevet under `npm run build`; læst af
`scripts/docker/ensure-docker-base-path.mjs`) og sammenligner den med
`OMNIROUTE_BASE_PATH`, når containeren starter. Når de er forskellige, og imaget blev
bygget til domænets rod, omskriver entrypointet standalone-manifesterne, de
indlejrede `basePath`/`assetPrefix`-literaler (Next 16 genererer SSR-aktiv-URL'er alene ud fra
`assetPrefix` — patcheren kopierer understien til den), de indbyggede
`/_next/static`-aktiv-URL'er (client-reference-manifester, medieimports, præ-renderede
fejlsider) og klientens `process.env`-shim, før `node dev/run-standalone.mjs`
kører.

### Compose-build (anbefalet)

Angiv begge variabler i `.env`, og byg derefter igen, så imaget og runtime-miljøet stemmer overens:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` videresender `OMNIROUTE_BASE_PATH` som et Docker-build-argument og som en
miljøvariabel ved runtime.

### Forudbygget rod-image + understi ved runtime

Publicerede `diegosouzapw/omniroute:*`-images er bygget til domænets rod. Du kan stadig
angive `OMNIROUTE_BASE_PATH` ved runtime; containeren patcher bundtet én gang ved opstart.
Kombinér den med den tilsvarende offentlige origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurer reverse proxyen til at videresende den **fulde** eksterne sti (fjern ikke
præfikset). Traefik skal route `PathPrefix(`/omniroute`)` til containeren uden
`StripPrefix`, så Next.js modtager `/omniroute/...` og leverer aktiver fra
`/omniroute/_next/...`.

Dockers healthcheck kontrollerer det lette `/healthz`-livscyklusendpoint med
den aktive `OMNIROUTE_BASE_PATH` som præfiks. `/api/monitoring/health` er fortsat tilgængeligt til
diagnostik for mennesker og dashboards. Hvis containerens HEALTHCHECK igen skal pege på det (f.eks.
for at håndhæve en dyb helbredskontrol), skal du angive `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Denne sti er en **dyb** kontrol (database + overvågningsoversigt) — velegnet til Dockers
sjældne `HEALTHCHECK`, hvis du tilvælger den igen, men **ikke** til Kubernetes-`livenessProbe`-
intervaller.

For orkestratorer (Kubernetes, Nomad osv.):

| Probe          | Foretræk                                                              | Undgå                                                  |
| -------------- | --------------------------------------------------------------------- | ------------------------------------------------------ |
| Liveness       | HTTP `GET /livez` eller TCP på hovedporten (`PORT`, standard `20128`) | `/api/monitoring/health` som liveness                  |
| Readiness      | HTTP `GET /healthz`                                                   | Korte timeouts, der tolker en travl event-loop som død |
| Dyb / blackbox | `/api/monitoring/health`                                              | —                                                      |

`/healthz` rapporterer processens livscyklus (`ok` / `starting` / `stopping`). `/livez` er
kun en kontrol af, om processen er i live (200, når handleren kan køre; den venter ikke på
readiness). Begge kører stadig på den samme Node-event-loop som requesthåndteringen, så
CPU-bundet katalog- eller komprimeringsarbejde kan forsinke dem — travl ≠ død. Foretræk TCP-
liveness, hvis HTTP-prober får timeout. Komplet vejledning om prober:
[Overvågningsvejledning — anbefalinger til Kubernetes-prober](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose med Caddy (automatisk HTTPS/TLS)

OmniRoute kan eksponeres sikkert ved hjælp af Caddys automatiske SSL-klargøring. Sørg for, at dit domænes DNS A-record peger på din servers IP-adresse.

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
      # Oprindelse, der vises i browseren, til OAuth-callbacks, dashboardlinks og genererede offentlige URL'er.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Intern server-til-server-URL til planlagte jobs / forespørgsler til sig selv.
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

Caddy angiver standardvideresendelsesheaderne for upstream-containeren. OmniRoute bruger
`NEXT_PUBLIC_BASE_URL` som den kanoniske offentlige oprindelse til OAuth-callbacks og genererede offentlige
links. Godkendte skrivehandlinger i dashboardet bruger forespørgsler fra samme oprindelse samt sessionsbundet CSRF-
beskyttelse. Aktivér kun `OMNIROUTE_TRUST_PROXY` til avancerede installationer, hvor du bevidst
ønsker, at OmniRoute skal udlede den offentlige oprindelse fra pålidelige videresendelsesheadere i stedet for eksplicit
konfiguration.

## Cloudflare Quick Tunnel

Dashboardunderstøttelse til Docker-installationer omfatter en **Cloudflare Quick Tunnel** med ét klik under `Dashboard → Endpoints`. Første aktivering downloader kun `cloudflared`, når det er nødvendigt, starter en midlertidig tunnel til dit aktuelle `/v1`-slutpunkt og viser den genererede `https://*.trycloudflare.com/v1`-URL direkte under din normale offentlige URL.

Slutpunktets tunnelpaneler (Cloudflare, Tailscale, ngrok) kan vises eller skjules under `Settings → Appearance` uden at ændre aktive tunneltilstande.

### Bemærkninger om tunneler

- Quick Tunnel-URL'er er midlertidige og ændres efter hver genstart.
- Quick Tunnels gendannes ikke automatisk efter en genstart af OmniRoute eller containeren. Genaktivér dem fra dashboardet efter behov.
- Administreret installation understøtter i øjeblikket Linux, macOS og Windows på `x64` / `arm64`.
- Administrerede Quick Tunnels bruger som standard HTTP/2-transport for at undgå støjende advarsler om QUIC UDP-buffere i begrænsede containermiljøer. Indstil `CLOUDFLARED_PROTOCOL=quic` eller `auto`, hvis du ønsker en anden transport.
- Docker-images indeholder systemets CA-rodcertifikater og videregiver dem til den administrerede `cloudflared`, hvilket undgår TLS-tillidsfejl, når tunnelen initialiseres inde i containeren.
- Indstil `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, hvis OmniRoute skal bruge en eksisterende binær fil i stedet for at downloade en.

## Image-tags

| Image                    | Tag      | Størrelse | Beskrivelse                                          |
| ------------------------ | -------- | --------- | ---------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | Højeste **udgivne** stabile SemVer (ikke git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB    | Fastlås denne type tag til GitOps                    |

Multiplatformmanifest: `linux/amd64` + `linux/arm64` som native platforme (Apple Silicon, AWS Graviton, Raspberry Pi). Docker vælger automatisk den matchende arkitektur. Angiv `--platform linux/amd64`, hvis du har brug for at gennemtvinge AMD64-emulering på ARM-værter.

### Udgivelseskanaler

OmniRoute udgiver separate Docker-kanaler til stabile udgivelser, aktiv test af udgivelsesgrenen og udviklingsbuilds.

| Kanal                           | Kilde                              | Foranderlighed                 | Anbefalet brug                                                                                                               |
| ------------------------------- | ---------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signeret/versioneret udgivelse     | Uforanderlig                   | Produktionsinstallationer, der fastlåser en bestemt udgivelse                                                                |
| `:latest` / `:latest-web`       | Højeste **udgivne** stabile SemVer | Foranderlig stabil pointer     | Følger stabile udgivelser **efter** et SemVer-udgivelsesjob — følger **ikke** `main` eller ikke-udgivne `release/v*`-commits |
| `:next` / `:next-web`           | Aktuel standardgren `release/v*`   | Foranderlig prerelease-pointer | Test af rettelser, der er landet på den aktive udgivelsesgren, men endnu ikke indgår i en stabil udgivelse                   |
| `:main` / `:main-web`           | `main`-grenen                      | Foranderlig udviklingspointer  | Kun til udviklings- og integrationstest                                                                                      |

#### Websessionsudbydere: `-web`-images

Hver kanal ovenfor findes også som et `-web`-tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), der er bygget fra `runner-web`-stadiet — det samme image plus Playwright og en Chromium-browser. Det almindelige image leveres **uden** Chromium. `gemini-web`, `claude-web` og `claude-turnstile` kræver den.

Fejlen udskydes og opstår ikke ved opstart: Disse udbydere viser deres modeller og vises som tilsluttede i dashboardet, og først den første forespørgsel mislykkes med

```
[500]: Kunne ikke indlæse det eksterne modul playwright: Fejl: Modulet blev ikke fundet
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Hvis du bruger disse udbydere, skal du hente `-web`-tagget for den kanal, du allerede bruger — intet andet ændres. Ved en npm/CLI-installation (uden Docker-image) er den tilsvarende manglende del browserens binære fil: Kør `npx playwright install chromium` på værten.

#### Brug af prerelease-kanalen

`next`-kanalen genopbygges ved hvert push til den aktuelle standardgren `release/v*` og udgives til både AMD64 og ARM64. Ældre vedligeholdelsesgrene kan ikke overskrive den. Kanalen leverer et image, der kan hentes, med rettelser, som er blevet flettet ind i den aktive udgivelsesgren, før det næste stabile tag oprettes.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose skal du tilsidesætte det image-tag, der bruges af den valgte profil, og derefter hente og genoprette tjenesten:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sikkerhed og tilbagerulning

`next` er en flydende kanal til forhåndsudgivelser. Den kan ændres ved ethvert push til den aktive udgivelsesgren og er **ikke understøttet til produktionsbrug**. Fastlås image-digesten, mens du evaluerer et bestemt build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Før test skal du sikkerhedskopiere OmniRoute-datavolumen eller den bind-monterede datamappe. For at rulle tilbage skal du gendanne den tidligere anvendte stabile version eller digest og genoprette containeren:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Et build fra en udgivelsesgren kan aldrig flytte `latest`; kun en kvalificeret stabil semantisk version må opdatere markøren for den stabile version. `next`-images bevarer kontrollen af udgivelsesimaget og den blokerende kontrol for CRITICAL-sårbarheder.

**`latest` er ikke en garanti for, at git-versionen er den nyeste.** Rettelser, der er flettet ind i `main` eller den aktive `release/v*`-gren, findes **ikke** i `:latest`, før et stabilt SemVer-image er udgivet, og udgivelsesjobbet opdaterer `:latest` (samme digest som den pågældende SemVer). Hvis `latest` ser ud til ikke at ændre sig, mens GitHub allerede viser rettelsen, skal du hente `:next` for at teste udgivelsesgrenen eller vente på SemVer-tagget.

| Du vil                                                                           | Brug                                    |
| -------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps/produktion, der ikke må ændre sig utilsigtet                              | Fastlås `:X.Y.Z` (eller image-digesten) |
| Følge udgivne stabile versioner og acceptere en genoprettelse ved hver udgivelse | `:latest`                               |
| Teste ikke-udgivne commits fra `release/v*`                                      | `:next` (ikke til produktion)           |
| Teste `main`                                                                     | `:main` (ikke til produktion)           |

## Tilgængelighed: SQLite er som standard begrænset til én replika

Standardopsætningen af OmniRoute med Docker/Kubernetes består af **én Node-proces + én SQLite-skriver**. Høj tilgængelighed er **ikke understøttet** med denne topologi.

| Begrænsning                             | Konsekvens                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Enkelt skriver                          | Kør **ikke** flere replikaer mod den samme SQLite-fil. Det beskadiger databasen.                                                                                                                                                                                                                                                                       |
| Genoprettelse/genstart/HEALTHCHECK-stop | **Fuld driftsafbrydelse** for igangværende SSE-forbindelser, dashboardsessioner og tilstand i hukommelsen. Alle tilsluttede klienter mister forbindelsen. Nye anmodninger i perioden uden endpoints får en reverse proxy-fejl, **`502 Bad Gateway: Unknown error`**, ikke OmniRoute-JSON — klienter kan ikke skelne dette fra en udbyderfejl (#11015). |
| Samme event loop som `/healthz`         | En travl katalog- eller komprimeringskørsel kan forsinke probes; en kort timeout genstarter derefter den **eneste** replika.                                                                                                                                                                                                                           |

**Probe-matrix** (se også [anbefalinger til Kubernetes-probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                 | Mål                                                         | Brug ikke                                                 |
| --------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| Liveness              | TCP på `PORT` (standard `20128`) eller blød HTTP `/healthz` | `/api/monitoring/health`                                  |
| Readiness             | HTTP `GET /healthz`                                         | Korte timeouts, der fortolker en travl event loop som død |
| Dybdegående/mennesker | `/api/monitoring/health`                                    | Automatiseret kubelet-liveness                            |

**Opgraderinger:** forvent, at alle sessioner afbrydes. Dræn klienterne, hvis du kan; der findes ingen rullende opdatering med standard-SQLite. Compose `restart: unless-stopped` kombineret med Docker `HEALTHCHECK` erstatter også den eneste proces, når containeren er Unhealthy — med samme konsekvensradius.

Kubernetes-udsnit for en **enkelt replika** (Recreate er påkrævet; øg ikke `replicas` mod én SQLite-fil):

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

`preStop`-pausen giver kube mulighed for at fjerne Service-endpoints før SIGTERM, så **ny** trafik ikke længere rammer den proces, der er ved at lukke ned. Igangværende `/v1/responses`-SSE drænes i op til `SHUTDOWN_TIMEOUT_MS` (standard 30 sek.) via tungvægts-adgangsleasinger (#11015). Nye anmodninger, der stadig når processen, får `503` + `Retry-After: 5`. Recreate-perioden uden endpoints, indtil erstatningen er Ready, er fortsat en fuldstændig driftsafbrydelse — det skyldes SQLite-topologien, ikke en forkert probe-konfiguration.

Ekstern Postgres/HA med flere skrivere er **ikke** en dokumenteret standardløsning. Hvis du har brug for HA, skal du beholde en enkelt replika eller køre en topologi, som projektet har testet og dokumenteret separat. Arbejdet med Postgres/MySQL findes i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Indtil det er udgivet, er den eneste understøttede måde at øge kapaciteten for **store** `/v1/responses` på at bruge N uafhængige processer (næste afsnit), ikke `replicas > 1` på én diskenhed.

## Horisontal skalering: N uafhængige processer

Én Node-proces er **én V8-heap**. To overlappende coding agent-forespørgsler på ~3 MiB / ~750k tokens via `POST /v1/responses` (RTK + Caveman) får denne heap til at afbryde ved ~12 Gi (`FATAL ERROR: Reached heap limit`) og kan forårsage OOM i en cgroup på 16 Gi. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Denne måling er en advarsel om **hukommelsesbudgettet**, ikke en fast produktgrænse på to samtidige lange `/v1/responses`. Adgang for ressourcekrævende chatforespørgsler styres af et automatisk afledt bytebudget for modtagelse (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), som dimensioneres ud fra den samme V8-/cgroup-grænse — hvis det tilsidesættes med en højere værdi (eller hvis den ældre antalsgrænse for forespørgsler, `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`, angives) i en proces, der allerede er dimensioneret, genindføres afbrydelsen. Små chats, `/healthz`, `/v1/models` og MCP er **ikke** omfattet af denne grænse.

### Én proces: mere end to lange `/v1/responses`

En **sund** proces (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standardværdien `0.75`) **kan** køre mere end to samtidige lange `POST /v1/responses`, når der stadig er plads i processens samlede bytebudget for igangværende forespørgsler (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Bodies på eller over `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standardværdien 256 KiB) optager den samme ressourcekrævende lease som strukturtunge forespørgsler og bruger den samme [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom`-undtagelse (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Snesevis af samtidige langvarige SSE-klienter (operatører har ofte brug for 40–50) er et spørgsmål om **hukommelsesbudgettet** — dimensionér heap + primære/headroom-pladser + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ikke en fast produktgrænse på ”maks. 2”. En belastet heap afviser stadig forespørgsler med en `503`, der kan forsøges igen, så #7849 ikke vender tilbage.

Sådan **mangedobles antallet af heaps** (uafhængige gamle V8-generationer) **i dag**:

| Gør                                                                                                                                                                                                             | Gør ikke                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Kør **N containere/pods**, hver med sin **egen** `DATA_DIR` / diskenhed                                                                                                                                         | Angiv `replicas > 1` mod én SQLite-fil                            |
| Dimensionér ressourcekrævende igangværende forespørgsler + sund headroom ud fra heap-/bytebudgettet for igangværende forespørgsler; 1–2 er den konservative standardværdi fra #7849, ikke en fast produktgrænse | Giv én proces 8× RAM og en ubegrænset antalsgrænse                |
| Valgfrit: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` til **delte kvotetællere**                                                                                                                       | Behandl Redis som delt SQLite — det er det ikke                   |
| Duplikér udbyderhemmeligheder i hver instans (eller acceptér opdelte dashboards)                                                                                                                                | Forvent ét dashboard / én opkaldslog på tværs af instanser        |
| Placér en vilkårlig belastningsfordeler foran; sticky sessions efter API-nøgle eller session er tilstrækkeligt                                                                                                  | Kræv leverandørspecifik middleware, der tager højde for størrelse |

Hardware: Antallet af samtidige lange `/v1/responses` pr. instans er et spørgsmål om **hukommelsesbudgettet** (heap + bytebudget for igangværende forespørgsler / #10110). `N` uafhængige `DATA_DIR`-mapper mangedobler stadig antallet af heaps: Værtens RAM skal kunne rumme `N × cgroup`, ikke ”én pod på 16 Gi med N=8”. Brug aldrig `replicas > 1` med én SQLite-fil.

Compose-eksempel (to heaps, to diskenheder — ikke `deploy.replicas: 2`):

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

Tæthed i processen (komprimering flyttet væk fra HTTP-isolatet) er [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Én logisk klynge på delt, permanent tilstand er [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionale Gemini-fejl i Docker

Google AI Studio / Gemini API kan returnere HTTP 400 med FAILED_PRECONDITION og
`User location is not supported for the API use.` En vellykket anmodning på værten
beviser ikke, at containeren bruger den samme udgående rute. DNS-rækkefølge,
IPv4/IPv6-forbindelse, VPN-routing og konfigurerede proxyer kan være forskellige. Kontrollér
[Googles understøttede regioner](https://ai.google.dev/gemini-api/docs/available-regions)
samt den faktiske forbindelsesrute. Denne fejl alene betyder ikke, at API-nøglen er ugyldig.

### Foretræk en forbindelsesspecifik proxy

Brug OmniRoutes [proxykonfiguration pr. forbindelse](../ops/PROXY_GUIDE.md#4-level-proxy-system)
til den berørte Gemini-forbindelse, og gentag derefter **Test Connection** samt en lille anmodning
med den samme model. Det begrænser routingændringen til den pågældende forbindelse. Kontrollér,
at proxyen kan nås fra containeren, og at forbindelsen rent faktisk vælger
den. En ændring af ruten garanterer ikke regional berettigelse hos upstream-tjenesten.

### Sammenlign netværket på værten og i containeren

Hold nøglen, modellen og anmodningen identiske, når du sammenligner godkendte resultater. Indsæt aldrig
legitimationsoplysninger, proxyadgangskoder eller komplette autorisationsheadere i et issue.
Undersøg først, hvilke adressefamilier operativsystemets resolver tilbyder, ved at bruge den samme kommando
på værten og inde i containeren:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Erstat `omniroute` med den tjeneste, du kører (for eksempel `omniroute-web`). Disse
kommandoer udskriver adressefamilier uden legitimationsoplysninger eller IP-adresser. En returneret `6`
viser kun et IPv6-DNS-resultat: Det beviser **ikke**, at der findes en brugbar IPv6-rute eller API-adgang.
Hvor `curl` er installeret, skal du sammenligne `curl -4 -I https://generativelanguage.googleapis.com`
med `curl -6 -I https://generativelanguage.googleapis.com` i begge miljøer.
Et HTTP-svar beviser forbindelse for den pågældende test, selv hvis det er en fejl
uden godkendelse. Kun den godkendte modelanmodning tester berettigelse til Gemini.

### Alternativ på værtsniveau: fungerende IPv6 og resolverpolitik

Indberetteren af [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) genetablerede
adgangen i sit miljø ved at aktivere IPv6 for containere og ændre glibcs adressevalg.
Betragt dette som et miljøspecifikt alternativ. Bekræft, at IPv6 fungerer på værten,
at containerens udgående trafik og routing fungerer, og at firewallreglerne er korrekte, før du justerer resolverens præferencer.
En privat ULA-adresse er ikke i sig selv bevis på offentlig IPv6-forbindelse.

For tjenester, der allerede er tilknyttet Composes standardnetværk, aktiverer dette fragment
IPv6 på det pågældende netværk. Bevar resten af din tjeneste-, port-, diskenheds- og konfigurationsopsætning:

```yaml
networks:
  default:
    enable_ipv6: true
```

For et navngivet netværk skal du aktivere det på det netværk, som tjenesten faktisk tilsluttes. Docker kan
tildele et ULA-undernet. Vælg kun et eksplicit undernet uden overlapning, når dit netværk
kræver det. Se [Docker IPv6-netværk](https://docs.docker.com/engine/daemon/ipv6/)
og [Compose-netværksindstillinger](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

På et **glibc-baseret image** kan `/etc/gai.conf` ændre adressevalget. Det aktuelle
Dockerfile i repositoriet bruger Debian. Brugerdefinerede musl-baserede images anvender ikke denne mekanisme.
Den rapporterede justering ændrer ULA-mærkaten fra `label fc00::/7 6` til
`label fc00::/7 1`. Tag udgangspunkt i imagets komplette politiktabel, og bevar de øvrige
poster: Tilføjelse af en `label`- eller `precedence`-post erstatter denne standardtabel, så en fil,
der kun indeholder den ændrede linje, er utilstrækkelig.
[glibc-konfigurationsreferencen](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumenterer denne adfærd. Bind-mount den gennemgåede fil som skrivebeskyttet på `/etc/gai.conf`,
og genopret tjenesten for at anvende den.

Dette ændrer operativsystemets adressevalg for **al udgående trafik i den pågældende container**.
Det tvinger ikke alle applikationer til at vælge IPv6: Nodes DNS-rækkefølge og forbindelsesvalg
har også betydning. `--dns-result-order=ipv4first` foretrækker specifikt IPv4 og
er ikke en løsning på en fejl, der kun opstår med IPv4. Se [Node DNS-rækkefølge](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Test Gemini og dine øvrige udbydere igen efter enhver ændring på værtsniveau. Hvis du vil rulle tilbage,
skal du fjerne det brugerdefinerede `gai.conf`-mount, gendanne den tidligere netværkskonfiguration og
genoprette den berørte tjeneste eller det berørte netværk i et vedligeholdelsesvindue. Genoprettelse af et netværk
kan afbryde andre containere, der er tilknyttet det. Slet ikke den permanente datadiskenhed.

## Vigtige bemærkninger

- **SQLite WAL-tilstand:** `docker stop` bør have lov til at køre færdig, så OmniRoute kan checkpoint'e de seneste ændringer tilbage til `storage.sqlite`. De medfølgende Compose-filer angiver allerede en respitperiode på 40 sekunder for stop. Hvis du kører imaget direkte, skal du beholde `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Indstil til `true`, hvis rutinemæssige sikkerhedskopier/sikkerhedskopier før skrivning administreres eksternt. Migreringer af eksisterende databaser kræver stadig deres eget holdbare sikkerhedssnapshot og en beskyttelse mod massemigrering.
- **Datapersistens:** Montér altid et volume på `/app/data` for at bevare din database, dine nøgler og konfigurationer på tværs af genstarter af containeren.
- **Portkonfiguration:** Tilsidesæt miljøvariablen `PORT` for at ændre standardporten `20128`.

## Se også

- [Vejledning til VM-implementering](../ops/VM_DEPLOYMENT_GUIDE.md) — Opsætning af VM + nginx + Cloudflare
- [Vejledning til implementering på Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementér på Fly.io
- [Miljøkonfiguration](../reference/ENVIRONMENT.md) — Komplet reference til `.env`
