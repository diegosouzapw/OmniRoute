# 🐳 Docker Guide — OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Fullständig referens för Docker-distribution. För en snabbstart, se [Docker-avsnittet i README](../README.md#-docker).

## Innehållsförteckning

- [Snabbkörning](#quick-run)
- [Med miljöfil](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Tillgängliga profiler](#available-profiles)
- [Konfigurera CLI-verktyg på värden när OmniRoute körs i Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidotjänst](#redis-sidecar)
- [Compose för produktion](#production-compose)
- [Dockerfile-steg](#dockerfile-stages)
- [Kritiska miljövariabler](#critical-environment-variables)
- [Docker Compose med Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Snabb Cloudflare-tunnel](#cloudflare-quick-tunnel)
- [Avbildningstaggar](#image-tags)
- [Tillgänglighet: SQLite-standarden stöder en enda replik](#availability-default-sqlite-is-single-replica)
- [Viktiga anmärkningar](#important-notes)

---

## Snabbstart

> **Drifta själv med ett enda kommando?** Se
> [guiden för egen drift](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publicerad avbildning +
> Redis, endast loopback, inget profilval). Snabbstarten nedan är
> alternativet med en enda container för användare som redan kör Redis på annat håll.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Med miljöfil

```bash
# Kopiera och redigera .env först
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
# Basprofil (inga CLI-verktyg)
docker compose --profile base up -d

# CLI-profil (Claude Code, Codex och OpenClaw inbyggda)
docker compose --profile cli up -d

# Värdprofil (främst för Linux; monterar värdens CLI-binärfiler skrivskyddat)
docker compose --profile host up -d

# Kombinera CLI med sidotjänsten CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Tillgängliga profiler

OmniRoute levereras med fyra Compose-profiler. Välj den som passar din miljö.

| Profil            | Tjänst           | När den ska användas                                                                                                                                          | Kommando                                     |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standard) | `omniroute-base` | Headless-server/minimal körmiljö, utan medföljande CLI-verktyg från leverantörer                                                                              | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentbaserade arbetsflöden som anropar `omniroute providers/setup/doctor` och medföljande CLI-verktyg (Codex, Claude Code, Droid, OpenClaw)                   | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-värdar som vill ha `network_mode`-liknande åtkomst till värdens CLI-verktyg genom att montera `~/.local/bin`, `~/.codex`, `~/.claude` osv. skrivskyddat | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Kör sidotjänsten [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) på port `8317` för proxyhantering av uppströms CLI-trafik                        | `docker compose --profile cliproxyapi up -d` |

> Flera profiler kan kombineras: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurera CLI-verktyg på värden när OmniRoute körs i Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` och knappen
**Spara konfiguration** på kontrollpanelen skriver alla filer som `~/.codex/*.config.toml`. Dessa sökvägar
har bara någon betydelse på den maskin där CLI-verktyget faktiskt körs. Kör du dem inuti
containern hamnar skrivningen i containerns egen hemkatalog (`/home/node` —
avbildningen kör `USER node`), där inget CLI-verktyg på värden någonsin kommer att läsa den och där den
försvinner så snart containern återskapas.

OmniRoute upptäcker detta och vägrar skriva, med instruktioner i stället för att
rapportera en lyckad åtgärd som du inte kan använda: CLI-verktyget avslutas med `2` och API:t svarar `422`
med `containerEphemeralTarget: true`.

### Rekommenderat: kör CLI-verktyget på värden och OmniRoute i Docker

Containern tillhandahåller API:t; CLI-verktyget konfigurerar dina verktyg på värden.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # rikta CLI-verktyget mot containern
omniroute setup-codex                      # skriver till den verkliga ~/.codex på din värd
```

Detta är rätt val när Codex, Claude Code, Cursor eller liknande körs på din
bärbara dator — vilket är den vanliga konfigurationen.

### Alternativ: bind-montera värdens konfigurationskataloger (`host`-profilen)

Om du vill att containern själv ska skriva din värdkonfiguration monterar du
in katalogerna och låter `CLI_CONFIG_HOME` peka på monteringens rot. `host`-profilen
gör redan detta:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

En bind-montering är det som gör sökvägen tillförlitlig: OmniRoute läser
`/proc/self/mountinfo` och tillåter skrivningar till monterade sökvägar (och till kataloger
vars underkataloger är monteringar, vilket exakt motsvarar strukturen för `/host-home` ovan), samtidigt som
skrivningar till omonterade sökvägar fortfarande nekas.

### Nödlösning: konfigurera containerns egna CLI-verktyg (använd sparsamt)

När CLI-verktygen faktiskt finns inuti containern (`cli`-profilen) är skrivningen
avsiktlig. Skicka `--allow-container-write` till valfritt `setup-*`-kommando eller ange
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` för servern. Skrivningen genomförs
med en varning om att den inte kommer att finnas kvar efter containern.

> **Säkerhetsvarning — `cli`-profilen + montering av `docker.sock`.**
> `cli`-profilen bind-monterar `/var/run/docker.sock` så att den automatiska
> uppdateraren i containern kan återskapa stacken via värdens daemon
> (`src/lib/system/autoUpdate.ts` söker efter denna socket och hoppar över
> Docker-sökvägen när den saknas). Denna socket är **en förtroendegräns mot
> root-behörighet på värden**: allt som kan nå den styr värdens Docker-daemon som
> root — det kan skapa, inspektera, stoppa och ta bort valfri container på värden.
> Konsekvenser:
>
> 1. **Exponera aldrig `cli`-profilens port mot nätverket.** Publicera
>    den på `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — en `cli`-profil som kan nås från LAN gör att valfri RCE på kontrollpanelsnivå leder till
>    fullständig kompromettering av värden.
> 2. **Bind-montera inga ytterligare värdkataloger i `cli`-profilen.**
>    Docker-socketen tillsammans med ytterligare en montering ger containern fullständig
>    läs- och skrivåtkomst till ditt filsystem och värdens konfiguration. Om ett verktyg behöver
>    komma åt ett projekt ska du köra det lokalt med CLI-binären — montera inte in det
>    i `cli`-containern.
>
> Om du inte behöver automatisk uppdatering inifrån containern ska du lämna `cli`-profilen avstängd
> (`COMPOSE_PROFILES=core,redis` eller kortare). De andra profilerna
> monterar inte Docker-socketen.
>
> Se `docs/security/MITM-TPROXY-DECRYPT.md` (git; kompileras inte till `/docs`) för den relaterade hotmodellen
> kring MITM och `docs/security/SUPPLY_CHAIN.md` för provenienskedjan för
> binärfilerna `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidecar

OmniRoute använder Redis som stöd för den distribuerade hastighetsbegränsaren och den delade cachen. Tjänsten `redis` är **alltid definierad** i `docker-compose.yml` (den har ingen profilstyrning) och startar tillsammans med alla andra profiler.

| Detalj                       | Värde                                         |
| ---------------------------- | --------------------------------------------- |
| Avbild                       | `redis:7-alpine`                              |
| Behållarnamn                 | `omniroute-redis`                             |
| Intern port                  | `6379`                                        |
| Värdport (åsidosättning)     | `REDIS_PORT` (standardvärde `6379`)           |
| Värdbindning (åsidosättning) | `REDIS_BIND_HOST` (standardvärde `127.0.0.1`) |
| Volym                        | `omniroute-redis-data` → `/data`              |
| Hälsokontroll                | `redis-cli ping` (10 s intervall)             |

Relaterade miljövariabler:

- `REDIS_URL` — anslutningssträng som injiceras i appen (`redis://redis:6379` som standard).
- `REDIS_PORT` — portmappning på värdsidan för Redis-behållaren.
- `REDIS_BIND_HOST` — värdgränssnittet som porten publiceras på. Standardvärdet är `127.0.0.1`.

> **Varför loopback används som standard:** sidecar-behållaren körs utan `requirepass`, och appens
> behållare når den via compose-nätverket (`redis:6379`) — den publicerade porten finns
> endast för verktyg på värdsidan (`redis-cli`, en lokal `npm run dev`). Publicering på
> `0.0.0.0` skulle exponera en oautentiserad Redis-instans för alla värdar i ditt lokala nätverk. Om du anger
> `REDIS_BIND_HOST=0.0.0.0`, lägg även till `--requirepass` i tjänstens `command:`.

**Att inaktivera Redis** rekommenderas inte (hastighetsbegränsaren övergår till en reservlösning i minnet med försämrad funktion). Om du måste göra det kan du antingen ta bort eller kommentera ut tjänstblocket `redis:` i `docker-compose.yml` eller skala ned det till noll:

```bash
docker compose up -d --scale redis=0
```

## Compose för produktion

Använd `docker-compose.prod.yml` för en isolerad produktionsögonblicksbild som körs parallellt med utvecklingsmiljön.

| Detalj                           | Värde                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| Fil                              | `docker-compose.prod.yml`                                                            |
| Standardport för kontrollpanelen | `PROD_DASHBOARD_PORT=20130` (mappad till interna `${DASHBOARD_PORT:-20128}`)         |
| Standardport för API             | `PROD_API_PORT=20131`                                                                |
| Avbild                           | `omniroute:prod` (byggd från målet `runner-cli`)                                     |
| Redis-behållare                  | `omniroute-redis-prod` (`redis:8.6.2`, dedikerad volym `redis-prod-data`)            |
| Datavolym                        | `omniroute-prod-data` (namngiven, bevaras mellan ombyggnader)                        |
| Hälsokontroller                  | `node healthcheck.mjs` + `redis-cli ping`, med `depends_on` villkorat av Redis hälsa |

Så här använder du den:

```bash
# Bygg och starta produktionsstacken
docker compose -f docker-compose.prod.yml up -d --build

# Strömma loggar
docker compose -f docker-compose.prod.yml logs -f

# Stoppa och ta bort stacken (behåll volymer)
docker compose -f docker-compose.prod.yml down
```

Produktionsstacken körs parallellt med compose-miljön för utveckling (med olika behållarnamn, portar och volymer), så att du kan fortsätta utveckla lokalt medan produktionsmiljön är igång.

## Dockerfile-steg

Datakatalogen innehåller en Dockerfile med flera steg (`Dockerfile`). Tre steg exponeras; välj rätt `target` för ditt användningsfall.

| Steg          | Basavbildning         | Syfte                                                                                                                                                                                  |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installerar beroenden (`npm ci --legacy-peer-deps`) och kör `npm run build` (Turbopack som standard – se Byggresurser nedan)                                                           |
| `runner-base` | `node:26-trixie-slim` | Produktionskörmiljö med Next.js fristående utdata. **Inga leverantörs-CLI:er ingår.**                                                                                                  |
| `runner-cli`  | `runner-base`         | Lägger till `git`, `docker.io`, `docker-compose` och globala CLI:er: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Välj detta för agentbaserade arbetsflöden.** |

Bygg ett specifikt mål manuellt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Byggresurser

Tre byggargument styr hur resurskrävande `builder`-steget är. De gäller endast vid byggtid –
`OMNIROUTE_MEMORY_MB` (nedan) är en separat inställning för körning.

| Byggargument                | Standardvärde | Effekt                                                                               |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `1`           | `0` bygger med webpack i stället. Lägre maximal minnesanvändning, men långsammare.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | V8:s heapgräns (`--max-old-space-size`) för den startade `next build`-processen.     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Matar `CIRCLE_NODE_TOTAL`; Next härleder `workers = N - 1` för insamling av siddata. |

`OMNIROUTE_BUILD_WORKERS` är den inställning som ska höjas på en kraftfull byggserver och den som bör
misstänkas när ett resursbegränsat bygge avbryts **efter** `✓ Compiled successfully`. Varje
siddata-worker är en egen process, och det är även den överordnade `next build`-processen;
en reproduktion på en aktiv VPS (ärende #7518) mätte varje process maximala RSS till
~4,5 GB oberoende av heapflaggan `NODE_OPTIONS` (Turbopack kompilerar i
inbyggt/Rust-minne utanför V8-heapen). Standardvärdet `2` (→ 1 worker, totalt 2
processer) är anpassat för de GitHub-hostade exekverarna med 16 GB/4 vCPU som
publiceringspipelinen använder. Med `8` (→ 7 workers) tog minnet slut på den exekveraren och
buildkit misslyckades med steget med `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) fick fortfarande inte plats när RSS per process mättes
direkt i stället för att uppskattas. `tests/unit/docker-build-memory-budget.test.ts`
utför beräkningen utifrån det uppmätta värdet och misslyckas om någon av inställningarna
överskrider exekverarens kapacitet.

Turbopack kompilerar i inbyggt Rust-minne som finns **utanför** V8-heapen, så
`OMNIROUTE_BUILD_MEMORY_MB` begränsar det inte. På en värd med en minnesgräns
SIGKILL-avslutas bygget då av OOM-hanteraren utan någon feltext alls – det
stannar helt enkelt mitt under `Creating an optimized production build`, vilket ser ut som att processen har hängt sig
snarare än att minnet har tagit slut. Om byggvärdens resurser är begränsade, byt paketerare:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` är aktiverad, så `next build` kör en överordnad process **och** en worker-
process, och båda följer `OMNIROUTE_BUILD_MEMORY_MB` separat. Sätt behållarens
gräns till något över ungefär två gånger detta värde, inte en gång.

Uppmätt för detta träd (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketerare | Behållargräns | Resultat                               |
| ---------- | ------------- | -------------------------------------- |
| Turbopack  | 8 GiB/16 GiB  | OOM-avslutad vid båda, utan meddelande |
| webpack    | 8 GiB         | bygg-worker SIGKILL-avslutades         |
| webpack    | 12 GiB        | lyckades, nådde maximalt 11,1 GiB      |

### Standardvärden vid körning

Standardvärden som exporteras av `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Minnesbeteende i Docker:

- Avbildningen anger `OMNIROUTE_MEMORY_MB=1024` och härleder `NODE_OPTIONS=--max-old-space-size=1024` från det.
- Den faktiska serverprocessen startas av den fristående startaren, som läser `OMNIROUTE_MEMORY_MB` och lägger till `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node använder det sista upprepade värdet för `--max-old-space-size`, så genom att ange `OMNIROUTE_MEMORY_MB` styrs den effektiva heapgränsen i Docker.
- Eftersom avbildningen alltid anger det används aldrig startarens egen RAM-kalibrerade reservlösning under Docker. Höj det uttryckligen för arbetsbelastningen (tabellen nedan). `2048` är fortfarande för lite för kodningsagenters `/v1/responses`.

### RAM vid körning för kodningsagenter

Dockers standardvärde på 1 GiB är en lägstanivå för en instrumentpanel/lätt chatt, inte en storlek för produktion. Långa `POST /v1/responses`-kroppar (hundratals meddelanden, tiotals verktyg) behåller flera grafer i minnet under komprimering. Två överlappande begäranden på ~3 MiB/~750 000 token har avbrutit V8 vid ett **12 GiB** stort old-space (`FATAL ERROR: Reached heap limit`) och även utlöst cgroup-OOM vid 16 GiB. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Sätt **cgroups `--memory` över heapstorleken** – inbyggda buffertar, SQLite och mellanresultat från komprimering ligger utanför V8.

| Arbetsbelastning                         | `OMNIROUTE_MEMORY_MB`      | Container/cgroup    | Kommentarer                                                                                                  |
| ---------------------------------------- | -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Kontrollpanel, en lätt chatt             | `1024` (bildstandard)      | ≥2 GiB              |                                                                                                              |
| En kodningsagent (Claude/Codex/Grok)     | `8192`                     | ≥10 GiB             | Typisk `/v1/responses` med en enda session                                                                   |
| Två samtidiga långa `/v1/responses`      | `10240`–`12288`            | ≥12–16 GiB          | Uppmätt V8-avbrott vid en heap på ~12 GiB                                                                    |
| Tre eller fler samtidiga långa kontexter | kör inte i en enda process | serialisera/mer RAM | Standardgränsen för tunga arbetsbelastningar är 1 pågående; att höja den utan mer RAM orsakar avbrottet igen |

`omniroute serve` på fysisk hårdvara kalibrerar till ~35 % av RAM-minnet (begränsat till `[512, 4096]`) när `OMNIROUTE_MEMORY_MB` **inte är angiven**. Docker anger alltid `1024`, så den kalibreringen körs aldrig i den officiella avbildningen.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiska miljövariabler

Utöver standardvärdena som dokumenteras i [ENVIRONMENT.md](../reference/ENVIRONMENT.md) är följande variabler viktigast vid körning under Docker:

| Variabel                      | Syfte                                                                                                                                                                                                                                                                                               | Standardvärde              |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Delad hemlighet för WebSocket-bryggan. **Krävs i produktion** — ange en stark slumpmässig sträng.                                                                                                                                                                                                   | inte angiven (måste anges) |
| `REDIS_URL`                   | Anslutningssträng för backend-systemet för hastighetsbegränsning/cache                                                                                                                                                                                                                              | `redis://redis:6379`       |
| `REDIS_PORT`                  | Port på värdsidan för den medföljande Redis-containern                                                                                                                                                                                                                                              | `6379`                     |
| `REDIS_BIND_HOST`             | Värdgränssnitt som den medföljande Redis-porten publiceras på (loopback om du inte lägger till AUTH)                                                                                                                                                                                                | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Värdsökväg som monteras i profilen `cli` vid `/workspace/omniroute` för arbetsflöden för självuppdatering                                                                                                                                                                                           | `.` (aktuell katalog)      |
| `OMNIROUTE_MEMORY_MB`         | Övre gräns för Nodes heapminne vid körning för den fristående Docker-servern; åsidosätter avbildningens standardvärde ovan. Kodningsagenter: `8192`+ (se [RAM vid körning](#runtime-ram-for-coding-agents)).                                                                                        | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | Åsidosätter exponerade portar för instrumentpanelen (20128) och API:t (20129)                                                                                                                                                                                                                       | `20128` / `20129`          |
| `APP_BIND_HOST`               | Värdgränssnitt som docker-compose publicerar portarna för instrumentpanelen/API:t/live-WS på. Med `REQUIRE_API_KEY=false` (standardvärdet) exponerar `0.0.0.0` den anonyma proxyn `/v1` för det lokala nätverket — utöka endast åtkomsten med `REQUIRE_API_KEY=true` eller en omvänd proxy framför. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | Värdgränssnitt som docker-compose publicerar sidocontainern `cliproxyapi` på — dess datavolym innehåller autentiseringsuppgifter för leverantörer.                                                                                                                                                  | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | Katalogen som plugin-skannern vid körning läser från och installerar i. Ange den när plugins bind-monteras: standardvärdet följer `HOME`, som en avbildning inte nödvändigtvis exporterar.                                                                                                          | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | URL-undersökväg när appen publiceras bakom en omvänd proxy (t.ex. `/omniroute`)                                                                                                                                                                                                                     | _(tom = rot)_              |
| `NEXT_PUBLIC_BASE_URL`        | Offentligt webbläsarursprung inklusive undersökvägen (t.ex. `https://host/omniroute`)                                                                                                                                                                                                               | inte angiven               |
| `PROD_DASHBOARD_PORT`         | Port på värdsidan för instrumentpanelen för `docker-compose.prod.yml`                                                                                                                                                                                                                               | `20130`                    |
| `CLIPROXYAPI_PORT`            | Port på värdsidan för sidocontainern `cliproxyapi`                                                                                                                                                                                                                                                  | `8317`                     |

## Omvänd proxy på en undersökväg (Traefik / nginx)

Next.js `basePath` kompileras in i det fristående paketet. OmniRoute registrerar det
inbakade värdet i en markörfil i appens rotkatalog (skrivs under `npm run build`; läses av
`scripts/docker/ensure-docker-base-path.mjs`) och jämför det med
`OMNIROUTE_BASE_PATH` när containern startar. När de skiljer sig åt och avbildningen
byggdes för domänroten skriver startpunkten om de fristående manifesten, de
inbäddade literalerna för `basePath`/`assetPrefix` (Next 16 renderar SSR-resurs-URL:er
enbart från `assetPrefix` — korrigeraren speglar undersökvägen till det), de inbakade
resurs-URL:erna för `/_next/static` (klientreferensmanifest, medieimporter, förrenderade
felsidor) och klientens `process.env`-shim innan `node dev/run-standalone.mjs`
körs.

### Compose-bygge (rekommenderas)

Ange båda variablerna i `.env` och bygg sedan om så att avbildningen och körningsmiljön
överensstämmer:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` vidarebefordrar `OMNIROUTE_BASE_PATH` både som ett Docker-byggargument
och som en miljövariabel vid körning.

### Förbyggd rotavbildning + undersökväg vid körning

Publicerade `diegosouzapw/omniroute:*`-avbildningar är byggda för domänroten. Du kan ändå
ange `OMNIROUTE_BASE_PATH` vid körning; containern korrigerar paketet en gång vid start.
Kombinera det med motsvarande publika ursprung:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurera den omvända proxyn så att den vidarebefordrar den **fullständiga** externa
sökvägen (ta inte bort prefixet). Traefik ska dirigera `PathPrefix(`/omniroute`)` till
containern utan `StripPrefix`, så att Next.js tar emot `/omniroute/...` och levererar
resurser från `/omniroute/_next/...`.

Dockers hälsokontroll anropar den resurssnåla livscykelslutpunkten `/healthz` med den
aktiva `OMNIROUTE_BASE_PATH` som prefix. `/api/monitoring/health` är fortfarande
tillgänglig för diagnostik avsedd för människor och kontrollpaneler; för att låta
containerns HEALTHCHECK använda den igen (exempelvis för djup hälsokontroll) anger du
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Den sökvägen utför en **djup**
kontroll (databas + övervakningssammanfattning) — lämplig för Dockers sällan körda
`HEALTHCHECK` om du väljer att återaktivera den, men **inte** för intervall i Kubernetes
`livenessProbe`.

För orkestrerare (Kubernetes, Nomad osv.):

| Kontroll                | Föredra                                                               | Undvik                                                        |
| ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| Funktionsduglighet      | HTTP `GET /livez` eller TCP på huvudporten (`PORT`, standard `20128`) | `/api/monitoring/health` som funktionsduglighetskontroll      |
| Beredskap               | HTTP `GET /healthz`                                                   | Korta tidsgränser som tolkar en upptagen händelseloop som död |
| Djup kontroll/svartlåda | `/api/monitoring/health`                                              | —                                                             |

`/healthz` rapporterar processens livscykel (`ok` / `starting` / `stopping`). `/livez`
kontrollerar endast att processen lever (200 när hanteraren kan köras; den väntar inte
på beredskap). Båda körs fortfarande i samma Node-händelseloop som hanteringen av
förfrågningar, så CPU-bundet katalog- eller komprimeringsarbete kan fördröja dem —
upptagen ≠ död. Föredra TCP-baserad funktionsduglighetskontroll om HTTP-kontroller får
tidsgränsöverskridanden. Fullständig vägledning om kontroller:
[Övervakningsguide — rekommendationer för Kubernetes-kontroller](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose med Caddy (automatisk TLS för HTTPS)

OmniRoute kan exponeras säkert med Caddys automatiska SSL-etablering. Se till att domänens DNS A-post pekar på serverns IP-adress.

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
      # Ursprung som används av webbläsaren för OAuth-återanrop, länkar i kontrollpanelen och genererade publika URL:er.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Intern URL mellan servrar för schemalagda jobb och anrop till den egna tjänsten.
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

Caddy ställer in standardrubrikerna för vidarebefordran till den överordnade containern. OmniRoute använder
`NEXT_PUBLIC_BASE_URL` som det kanoniska publika ursprunget för OAuth-återanrop och genererade publika
länkar. Autentiserade skrivningar i kontrollpanelen använder förfrågningar med samma ursprung samt sessionsbunden CSRF-
skydd. Aktivera endast `OMNIROUTE_TRUST_PROXY` för avancerade driftsättningar där du avsiktligt
vill att OmniRoute ska härleda det publika ursprunget från betrodda vidarebefordringsrubriker i stället för explicit
konfiguration.

## Cloudflare Quick Tunnel

Stöd för kontrollpanelen i Docker-driftsättningar omfattar en **Cloudflare Quick Tunnel** med ett klick under `Dashboard → Endpoints`. Vid den första aktiveringen hämtas `cloudflared` endast när det behövs, en tillfällig tunnel startas till din aktuella `/v1`-slutpunkt och den genererade URL:en `https://*.trycloudflare.com/v1` visas direkt under din vanliga publika URL.

Tunnelpaneler för slutpunkter (Cloudflare, Tailscale, ngrok) kan visas eller döljas via `Settings → Appearance` utan att tillståndet för aktiva tunnlar ändras.

### Information om tunnlar

- URL:er för Quick Tunnel är tillfälliga och ändras efter varje omstart.
- Quick Tunnels återställs inte automatiskt efter att OmniRoute eller containern har startats om. Aktivera dem igen via kontrollpanelen när det behövs.
- Den hanterade installationen stöder för närvarande Linux, macOS och Windows på `x64` / `arm64`.
- Hanterade Quick Tunnels använder som standard HTTP/2-transport för att undvika störande varningar om QUIC UDP-buffertar i begränsade containermiljöer. Ställ in `CLOUDFLARED_PROTOCOL=quic` eller `auto` om du vill använda en annan transport.
- Docker-avbildningarna innehåller systemets CA-rotcertifikat och skickar dem till den hanterade `cloudflared`, vilket undviker TLS-förtroendefel när tunneln initieras inuti containern.
- Ställ in `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` om du vill att OmniRoute ska använda en befintlig binärfil i stället för att hämta en.

## Avbildningstaggar

| Avbildning               | Tagg     | Storlek | Beskrivning                                             |
| ------------------------ | -------- | ------- | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Högsta **publicerade** stabila SemVer (inte git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Fäst denna typ av tagg för GitOps                       |

Flerplattformsmanifest: inbyggt stöd för `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker väljer automatiskt den matchande arkitekturen. Ange `--platform linux/amd64` om du behöver framtvinga AMD64-emulering på ARM-värdar.

### Utgivningskanaler

OmniRoute publicerar separata Docker-kanaler för stabila utgåvor, testning av den aktiva utgivningsgrenen och utvecklingsversioner.

| Kanal                           | Källa                                 | Föränderlighet                       | Rekommenderad användning                                                                                                              |
| ------------------------------- | ------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signerad/versionerad utgåva           | Oföränderlig                         | Produktionsdriftsättningar som fäster en exakt utgåva                                                                                 |
| `:latest` / `:latest-web`       | Högsta **publicerade** stabila SemVer | Föränderlig stabil pekare            | Följer stabila utgåvor **efter** ett SemVer-publiceringsjobb — följer **inte** `main` eller opublicerade incheckningar i `release/v*` |
| `:next` / `:next-web`           | Aktuell standardgren `release/v*`     | Föränderlig förhandsutgivningspekare | Testning av korrigeringar som har lagts till i den aktiva utgivningsgrenen men ännu inte ingår i en stabil utgåva                     |
| `:main` / `:main-web`           | Grenen `main`                         | Föränderlig utvecklingspekare        | Endast utvecklings- och integrationstestning                                                                                          |

#### Använda förhandsutgivningskanalen

Kanalen `next` byggs om vid varje push till den aktuella standardgrenen `release/v*` och publiceras för både AMD64 och ARM64. Äldre underhållsgrenar kan inte skriva över den. Kanalen tillhandahåller en hämtningsbar avbildning med korrigeringar som har slagits samman med den aktiva utgivningsgrenen innan nästa stabila tagg skapas.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

För Docker Compose åsidosätter du avbildningstaggen som används av den valda profilen och hämtar och återskapar sedan tjänsten:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Säkerhet och återställning

`next` är en flytande förhandsutgivningskanal. Den kan ändras vid varje push till den aktiva utgivningsgrenen och **stöds inte för produktionsanvändning**. Fäst avbildningens digest medan du utvärderar en specifik version:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Säkerhetskopiera OmniRoutes datavolym eller bind-monterade datakatalog före testning. För att återställa går du tillbaka till den tidigare använda stabila versionen eller digesten och återskapar containern:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

En build från en release-gren kan aldrig flytta `latest`; endast en kvalificerad stabil semantisk version får uppdatera den stabila pekaren. `next`-avbildningarna behåller inspektionen av release-avbildningen och den blockerande kontrollen för KRITISKA sårbarheter.

**`latest` är ingen garanti för aktuell status i git.** Sammanslagna korrigeringar på `main` eller den aktiva grenen `release/v*` ingår **inte** i `:latest` förrän en stabil SemVer-avbildning har publicerats och publiceringsjobbet uppdaterar `:latest` (samma digest som den SemVer-versionen). Om `latest` verkar ha stannat medan GitHub redan visar korrigeringen kan du hämta `:next` för att testa release-grenen eller vänta på SemVer-taggen.

| Du vill                                                                                       | Använd                                          |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| GitOps/produktion som inte får avvika                                                         | Fäst till `:X.Y.Z` (eller avbildningens digest) |
| Följa publicerade stabila versioner och acceptera att containern återskapas vid varje release | `:latest`                                       |
| Testa ej utgivna commits från `release/v*`                                                    | `:next` (inte för produktion)                   |
| Testa `main`                                                                                  | `:main` (inte för produktion)                   |

## Tillgänglighet: SQLite-standarden har en enda replik

Standardkonfigurationen för OmniRoute med Docker/Kubernetes är **en Node-process + en SQLite-skrivare**. Hög tillgänglighet stöds **inte** med den topologin.

| Begränsning                           | Konsekvens                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| En enda skrivare                      | Kör **inte** flera repliker mot samma SQLite-fil. Det skadar databasen.                                                                                                                                                                                                                                                       |
| Återskapande/omstart/HEALTHCHECK-kill | **Fullständigt avbrott** för pågående SSE, dashboardsessioner och tillstånd i minnet. Alla anslutna klienter kopplas från. Nya begäranden under perioden utan slutpunkter får omvänd proxy-felet **`502 Bad Gateway: Unknown error`**, inte OmniRoute-JSON — klienter kan inte skilja detta från ett leverantörsfel (#11015). |
| Samma händelseloop som `/healthz`     | En upptagen katalog- eller komprimeringscykel kan fördröja prober; en kort tidsgräns startar då om den **enda** repliken.                                                                                                                                                                                                     |

**Probmatris** (se även [rekommendationer för Kubernetes-prober](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Prob                   | Mål                                                              | Använd inte                                                   |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| Livsstatus             | TCP på `PORT` (standardvärde `20128`) eller mjuk HTTP `/healthz` | `/api/monitoring/health`                                      |
| Beredskap              | HTTP `GET /healthz`                                              | Snäva tidsgränser som tolkar en upptagen händelseloop som död |
| Djupkontroll/människor | `/api/monitoring/health`                                         | Automatisk kubelet-livsstatus                                 |

**Uppgraderingar:** räkna med att alla sessioner kopplas från. Dränera klienter om möjligt; löpande uppdatering är inte tillgänglig med SQLite-standarden. Compose `restart: unless-stopped` tillsammans med Docker `HEALTHCHECK` ersätter också den enda processen när containern är Unhealthy — med samma konsekvenser.

Kubernetes-exempel för **en enda replik** (Recreate krävs; öka inte `replicas` mot en enda SQLite-fil):

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

Väntetiden i `preStop` gör att kube kan ta bort Service-slutpunkterna före SIGTERM, så att **ny** trafik inte längre skickas till processen som håller på att avslutas. Pågående `/v1/responses`-SSE dräneras i upp till `SHUTDOWN_TIMEOUT_MS` (standardvärde 30 s) via tungviktiga antagningslås (#11015). Nya begäranden som fortfarande når processen får `503` + `Retry-After: 5`. Recreate-perioden utan slutpunkter, fram tills ersättaren är Ready, innebär fortfarande ett fullständigt avbrott — det beror på SQLite-topologin, inte på en felkonfigurerad prob.

Extern Postgres/HA med flera skrivare är **inte** en dokumenterad standardlösning. Om du behöver HA bör du behålla en enda replik eller köra en topologi som projektet har testat och dokumenterat separat. Arbetet med Postgres/MySQL finns i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Fram tills detta lanseras är det enda stödda sättet att multiplicera kapaciteten för **stora** `/v1/responses` att använda N oberoende processer (nästa avsnitt), inte `replicas > 1` på en enda volym.

## Utskalning: N oberoende processer

En Node-process är **en V8-heap**. Två överlappande kodningsagentanrop på ~3 MiB/~750k token till `POST /v1/responses` (RTK + Caveman) avbryter denna heap vid ~12 Gi (`FATAL ERROR: Reached heap limit`) och kan orsaka OOM i en cgroup på 16 Gi. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Den mätningen är en varning om **minnesbudget**, inte en absolut produktgräns på två samtidiga långvariga `/v1/responses`. Insläpp av resurskrävande chattar styrs av en automatiskt härledd bytebudget för inmatning (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) som dimensioneras utifrån samma V8-/cgroup-tak — att åsidosätta den med ett högre värde (eller ange det äldre taket `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` för antal begäranden) i en redan dimensionerad process återinför avbrottet. Små chattar, `/healthz`, `/v1/models` och MCP omfattas **inte** av det taket.

### En process: fler än två långvariga `/v1/responses`

En **välmående** process (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standardvärde `0.75`) **kan** köra fler än två samtidiga långvariga `POST /v1/responses` när det fortfarande finns utrymme i processens gemensamma bytebudget för pågående begäranden (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Begärandetexter som är lika stora som eller större än `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standardvärde 256 KiB) använder samma resurskrävande plats som strukturtunga begäranden och samma `tryAcquireHealthyHeadroom`-undantag från [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tiotals samtidiga långvariga SSE-klienter (driftansvariga behöver ofta 40–50) är en fråga om **minnesbudget** — dimensionera heap + primära platser/marginalplatser + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — inte en absolut produktgräns på ”max 2”. En hårt belastad heap avvisar fortfarande begäranden med ett återförsöksbart `503` så att problemet i #7849 inte återkommer.

För att **multiplicera antalet heapar** (oberoende V8-old-spaces) **i dag**:

| Gör                                                                                                                                                                                                     | Gör inte                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Kör **N containrar/poddar**, var och en med en **egen** `DATA_DIR`/volym                                                                                                                                | Ange `replicas > 1` mot en och samma SQLite-fil                      |
| Dimensionera resurskrävande pågående begäranden + välmåendemarginal utifrån heap-/bytebudgeten för pågående begäranden; 1–2 är det konservativa standardvärdet från #7849, inte en absolut produktgräns | Ge en process 8× RAM och ett obegränsat antalsbaserat tak            |
| Valfritt: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` för **delade kvoträknare**                                                                                                               | Behandla Redis som delad SQLite — det är det inte                    |
| Duplicera leverantörshemligheter till varje instans (eller acceptera uppdelade kontrollpaneler)                                                                                                         | Förvänta dig en gemensam kontrollpanel/anropslogg för alla instanser |
| Placera valfri lastbalanserare framför instanserna; sessionsaffinitet via API-nyckel eller session räcker                                                                                               | Kräv en leverantörsspecifik storleksmedveten mellanprogramvara       |

Maskinvara: antalet samtidiga långvariga `/v1/responses` per instans är en fråga om **minnesbudget** (heap + bytebudget för pågående begäranden/#10110). `N` oberoende `DATA_DIR`:er multiplicerar fortfarande antalet heapar: värddatorns RAM måste räcka till `N × cgroup`, inte ”en podd på 16 Gi med N=8”. Använd aldrig `replicas > 1` för en och samma SQLite-fil.

Compose-exempel (två heapar, två volymer — inte `deploy.replicas: 2`):

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

Processtäthet (komprimering utanför HTTP-isolatet) behandlas i [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ett logiskt kluster med delat beständigt tillstånd behandlas i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Viktiga anmärkningar

- **SQLite WAL-läge:** `docker stop` bör tillåtas slutföras så att OmniRoute kan skriva tillbaka de senaste ändringarna till `storage.sqlite` via en kontrollpunkt. De medföljande Compose-filerna anger redan en stopptid på 40 sekunder. Om du kör avbildningen direkt ska du behålla `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ange `true` om rutinmässiga säkerhetskopior och säkerhetskopior före skrivning hanteras externt. Migreringar av befintliga databaser kräver fortfarande en egen beständig säkerhetsögonblicksbild och ett skydd mot massmigrering.
- **Datapersistens:** Montera alltid en volym på `/app/data` för att bevara databasen, nycklarna och konfigurationerna mellan omstarter av containern.
- **Portkonfiguration:** Åsidosätt miljövariabeln `PORT` för att ändra standardporten `20128`.

## Se även

- [Guide för VM-distribution](../ops/VM_DEPLOYMENT_GUIDE.md) — Konfiguration av VM + nginx + Cloudflare
- [Distributionsguide för Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Distribuera till Fly.io
- [Miljökonfiguration](../reference/ENVIRONMENT.md) — Fullständig referens för `.env`
